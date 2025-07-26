package keeper

import (
	"fmt"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v6/x/storage/types"
)

// UpdateProviderLiveness updates the liveness tracking for a provider
func (k Keeper) UpdateProviderLiveness(ctx sdk.Context, providerAddr string, submitted bool) error {
	params := k.GetParams(ctx)
	currentBlock := uint64(ctx.BlockHeight())

	// Get or create liveness info for provider
	livenessInfo := k.GetProviderLivenessInfo(ctx, providerAddr)
	if livenessInfo == nil {
		livenessInfo = &types.ProviderLivenessInfo{
			Provider:                  providerAddr,
			CurrentWindowStart:        currentBlock,
			MissedSubmissionsInWindow: 0,
			TotalSubmissionsInWindow:  0,
			CurrentLivenessRatio:      100.0,
			LastSubmissionBlock:       0,
			RecentMissedBlocks:        []uint64{},
		}
	}

	// Check if we need to slide the window
	windowSize := params.LivenessWindowBlocks
	if currentBlock >= livenessInfo.CurrentWindowStart+windowSize {
		// Slide the window forward
		k.slideLifenessWindow(ctx, livenessInfo, currentBlock, windowSize)
	}

	// Update submission count
	livenessInfo.TotalSubmissionsInWindow++

	if !submitted {
		livenessInfo.MissedSubmissionsInWindow++
		livenessInfo.RecentMissedBlocks = append(livenessInfo.RecentMissedBlocks, currentBlock)

		// Keep only recent missed blocks (last 100)
		if len(livenessInfo.RecentMissedBlocks) > 100 {
			livenessInfo.RecentMissedBlocks = livenessInfo.RecentMissedBlocks[1:]
		}
	} else {
		livenessInfo.LastSubmissionBlock = currentBlock
	}

	// Calculate current liveness ratio
	if livenessInfo.TotalSubmissionsInWindow > 0 {
		successfulSubmissions := livenessInfo.TotalSubmissionsInWindow - livenessInfo.MissedSubmissionsInWindow
		livenessInfo.CurrentLivenessRatio = float64(successfulSubmissions) / float64(livenessInfo.TotalSubmissionsInWindow) * 100.0
	}

	// Store updated liveness info
	k.SetProviderLivenessInfo(ctx, livenessInfo)

	return nil
}

// slideLifenessWindow adjusts the sliding window for liveness tracking
func (k Keeper) slideLifenessWindow(ctx sdk.Context, livenessInfo *types.ProviderLivenessInfo, currentBlock, windowSize uint64) {
	// Calculate how many blocks to slide
	blocksToSlide := currentBlock - (livenessInfo.CurrentWindowStart + windowSize)
	newWindowStart := livenessInfo.CurrentWindowStart + blocksToSlide + 1

	// Remove missed blocks that are now outside the window
	var validMissedBlocks []uint64
	for _, missedBlock := range livenessInfo.RecentMissedBlocks {
		if missedBlock >= newWindowStart {
			validMissedBlocks = append(validMissedBlocks, missedBlock)
		}
	}

	// Update window and recalculate counts based on blocks still in window
	livenessInfo.CurrentWindowStart = newWindowStart
	livenessInfo.RecentMissedBlocks = validMissedBlocks

	// Estimate submissions in new window (this is an approximation)
	// In practice, you might want to store more detailed history
	estimatedTotalSubmissions := livenessInfo.TotalSubmissionsInWindow
	if blocksToSlide > 0 {
		// Reduce counts proportionally
		remainingRatio := float64(windowSize-blocksToSlide) / float64(windowSize)
		estimatedTotalSubmissions = uint64(float64(livenessInfo.TotalSubmissionsInWindow) * remainingRatio)
	}

	livenessInfo.TotalSubmissionsInWindow = estimatedTotalSubmissions
	livenessInfo.MissedSubmissionsInWindow = uint64(len(validMissedBlocks))
}

// CheckProviderLivenessViolation checks if a provider has violated liveness requirements
func (k Keeper) CheckProviderLivenessViolation(ctx sdk.Context, providerAddr string) (bool, error) {
	params := k.GetParams(ctx)
	livenessInfo := k.GetProviderLivenessInfo(ctx, providerAddr)

	if livenessInfo == nil {
		return false, nil // No violation if no tracking info exists yet
	}

	// Check if liveness ratio is below minimum required
	minLivenessRatio := float64(params.MinLivenessRatio)
	if livenessInfo.CurrentLivenessRatio < minLivenessRatio {
		return true, nil
	}

	return false, nil
}

// SlashProviderForLivenessFault applies liveness-based slashing (lighter penalty)
func (k Keeper) SlashProviderForLivenessFault(ctx sdk.Context, providerAddr string) error {
	params := k.GetParams(ctx)

	// Get provider
	provider, found := k.GetProvider(ctx, providerAddr)
	if !found {
		return fmt.Errorf("provider %s not found", providerAddr)
	}

	// Increment consecutive liveness faults
	provider.ConsecutiveLivenessFaults++

	// Apply liveness slash amount (fixed amount, lighter than proof fault)
	providerAcc, err := sdk.AccAddressFromBech32(provider.Creator)
	if err != nil {
		return fmt.Errorf("invalid provider address: %v", err)
	}

	stake := k.GetProviderStake(ctx, providerAcc)
	slashAmountCoins := sdk.NewCoins(params.LivenessSlashAmount)

	// Also apply percentage-based slash if configured
	if params.LivenessSlashPercentage > 0 {
		stakeAmount := stake.Stake.AmountOf("ulore")                                                                 // assuming ulore is the base denom
		percentageSlash := stakeAmount.Mul(sdk.NewInt(int64(params.LivenessSlashPercentage))).Quo(sdk.NewInt(10000)) // basis points
		percentageSlashCoins := sdk.NewCoins(sdk.NewCoin("ulore", percentageSlash))
		slashAmountCoins = slashAmountCoins.Add(percentageSlashCoins...)
	}

	// Transfer slashed amount to slash pool
	err = k.bankKeeper.SendCoinsFromModuleToModule(ctx, types.StorageBondedPoolName, types.ChallengeSlashPoolName, slashAmountCoins)
	if err != nil {
		return fmt.Errorf("failed to slash provider: %v", err)
	}

	// Update provider stake
	newStake := stake.Stake.Sub(slashAmountCoins...)
	k.SetProviderStake(ctx, providerAcc, types.ProviderStake{
		Provider: provider.Creator,
		Stake:    newStake,
	})

	// Apply jail time for liveness fault
	provider.Jailed = true
	jailUntil := ctx.BlockTime().Add(time.Duration(params.LivenessJailBlocks) * time.Second * 3) // assuming ~3s block time
	provider.JailUntil = &jailUntil

	// Check if provider should be suspended for too many consecutive liveness faults
	if provider.ConsecutiveLivenessFaults >= params.MaxLivenessFaults {
		provider.Status = types.ProviderStatus_PROVIDER_STATUS_SUSPENDED
		provider.ConsecutiveLivenessFaults = 0 // Reset after suspension
		ctx.Logger().Info(fmt.Sprintf("provider %s suspended due to excessive liveness faults", provider.Creator))
	}

	k.SetProvider(ctx, provider)

	ctx.Logger().Info(fmt.Sprintf("provider %s slashed %s for liveness fault and jailed until %s",
		provider.Creator, slashAmountCoins.String(), jailUntil.String()))

	return nil
}

// SlashProviderForProofFault applies proof-based slashing (heavier penalty for assigned provider)
func (k Keeper) SlashProviderForProofFault(ctx sdk.Context, providerAddr string) error {
	params := k.GetParams(ctx)

	// Get provider
	provider, found := k.GetProvider(ctx, providerAddr)
	if !found {
		return fmt.Errorf("provider %s not found", providerAddr)
	}

	// Increment consecutive proof faults
	provider.ConsecutiveProofFaults++

	// Apply proof fault slash amount (heavier penalty)
	providerAcc, err := sdk.AccAddressFromBech32(provider.Creator)
	if err != nil {
		return fmt.Errorf("invalid provider address: %v", err)
	}

	stake := k.GetProviderStake(ctx, providerAcc)
	slashAmountCoins := sdk.NewCoins(params.ProofFaultSlashAmount)

	// Apply percentage-based slash (heavier than liveness)
	if params.ProofFaultSlashPercentage > 0 {
		stakeAmount := stake.Stake.AmountOf("ulore")
		percentageSlash := stakeAmount.Mul(sdk.NewInt(int64(params.ProofFaultSlashPercentage))).Quo(sdk.NewInt(10000))
		percentageSlashCoins := sdk.NewCoins(sdk.NewCoin("ulore", percentageSlash))
		slashAmountCoins = slashAmountCoins.Add(percentageSlashCoins...)
	}

	// Transfer slashed amount to slash pool
	err = k.bankKeeper.SendCoinsFromModuleToModule(ctx, types.StorageBondedPoolName, types.ChallengeSlashPoolName, slashAmountCoins)
	if err != nil {
		return fmt.Errorf("failed to slash provider: %v", err)
	}

	// Update provider stake
	newStake := stake.Stake.Sub(slashAmountCoins...)
	k.SetProviderStake(ctx, providerAcc, types.ProviderStake{
		Provider: provider.Creator,
		Stake:    newStake,
	})

	// Apply longer jail time for proof fault
	provider.Jailed = true
	jailUntil := ctx.BlockTime().Add(time.Duration(params.ProofFaultJailBlocks) * time.Second * 3)
	provider.JailUntil = &jailUntil

	// Check if provider should be suspended for too many consecutive proof faults
	if provider.ConsecutiveProofFaults >= params.MaxProofFaults {
		provider.Status = types.ProviderStatus_PROVIDER_STATUS_SUSPENDED
		provider.ConsecutiveProofFaults = 0 // Reset after suspension
		ctx.Logger().Info(fmt.Sprintf("provider %s suspended due to excessive proof faults", provider.Creator))
	}

	k.SetProvider(ctx, provider)

	ctx.Logger().Info(fmt.Sprintf("provider %s slashed %s for proof fault and jailed until %s",
		provider.Creator, slashAmountCoins.String(), jailUntil.String()))

	return nil
}

// IsProviderJailed checks if a provider is currently jailed
func (k Keeper) IsProviderJailed(ctx sdk.Context, providerAddr string) bool {
	provider, found := k.GetProvider(ctx, providerAddr)
	if !found {
		return false
	}

	if !provider.Jailed {
		return false
	}

	// Check if jail time has expired
	if provider.JailUntil != nil && ctx.BlockTime().After(*provider.JailUntil) {
		// Jail time expired, unjail the provider
		provider.Jailed = false
		provider.JailUntil = nil
		k.SetProvider(ctx, provider)
		return false
	}

	return provider.Jailed
}

// GetProviderLivenessInfo retrieves liveness tracking info for a provider
func (k Keeper) GetProviderLivenessInfo(ctx sdk.Context, providerAddr string) *types.ProviderLivenessInfo {
	store := ctx.KVStore(k.storeKey)
	key := ProviderLivenessInfoKey(providerAddr)

	bz := store.Get(key)
	if bz == nil {
		return nil
	}

	var livenessInfo types.ProviderLivenessInfo
	k.cdc.MustUnmarshal(bz, &livenessInfo)
	return &livenessInfo
}

// SetProviderLivenessInfo stores liveness tracking info for a provider
func (k Keeper) SetProviderLivenessInfo(ctx sdk.Context, livenessInfo *types.ProviderLivenessInfo) {
	store := ctx.KVStore(k.storeKey)
	key := ProviderLivenessInfoKey(livenessInfo.Provider)

	bz := k.cdc.MustMarshal(livenessInfo)
	store.Set(key, bz)
}
