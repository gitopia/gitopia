package keeper

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v6/x/storage/types"
)

// UpdateProviderLiveness updates the liveness tracking for a provider based on challenge participation
func (k Keeper) UpdateProviderLiveness(ctx sdk.Context, providerAddr string, challengeId uint64, submitted bool) error {
	params := k.GetParams(ctx)

	// Get or create liveness info for provider
	livenessInfo := k.GetProviderLivenessInfo(ctx, providerAddr)
	if livenessInfo == nil {
		livenessInfo = &types.ProviderLivenessInfo{
			Provider:                    providerAddr,
			CurrentWindowStartChallenge: challengeId,
			MissedSubmissionsInWindow:   0,
			TotalSubmissionsInWindow:    0,
			CurrentLivenessRatio:        100.0,
			LastSubmissionChallenge:     0,
			RecentMissedChallenges:      []uint64{},
		}
	}

	// Check if we need to slide the window
	windowSize := params.LivenessWindowChallenges
	if challengeId >= livenessInfo.CurrentWindowStartChallenge+windowSize {
		// Slide the window forward
		k.slideLivenessWindowChallenges(ctx, livenessInfo, challengeId, windowSize)
	}

	// Update submission count
	livenessInfo.TotalSubmissionsInWindow++

	if !submitted {
		livenessInfo.MissedSubmissionsInWindow++
		livenessInfo.RecentMissedChallenges = append(livenessInfo.RecentMissedChallenges, challengeId)

		// Keep only recent missed challenges (last 100)
		if len(livenessInfo.RecentMissedChallenges) > 100 {
			livenessInfo.RecentMissedChallenges = livenessInfo.RecentMissedChallenges[1:]
		}
	} else {
		livenessInfo.LastSubmissionChallenge = challengeId
		blockTime := ctx.BlockTime()
		livenessInfo.LastLivenessCheck = &blockTime
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

// slideLivenessWindowChallenges adjusts the sliding window for challenge-based liveness tracking
func (k Keeper) slideLivenessWindowChallenges(ctx sdk.Context, livenessInfo *types.ProviderLivenessInfo, currentChallengeId, windowSize uint64) {
	// Calculate how many challenges to slide
	challengesToSlide := currentChallengeId - (livenessInfo.CurrentWindowStartChallenge + windowSize)
	newWindowStart := livenessInfo.CurrentWindowStartChallenge + challengesToSlide + 1

	// Remove missed challenges that are now outside the window
	var validMissedChallenges []uint64
	for _, missedChallenge := range livenessInfo.RecentMissedChallenges {
		if missedChallenge >= newWindowStart {
			validMissedChallenges = append(validMissedChallenges, missedChallenge)
		}
	}

	// Update window and recalculate counts based on challenges still in window
	livenessInfo.CurrentWindowStartChallenge = newWindowStart
	livenessInfo.RecentMissedChallenges = validMissedChallenges

	livenessInfo.TotalSubmissionsInWindow = windowSize
	livenessInfo.MissedSubmissionsInWindow = uint64(len(validMissedChallenges))
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
	jailUntil := ctx.BlockTime().Add(*params.LivenessJailTime)
	provider.JailUntil = &jailUntil

	ctx.Logger().Info(fmt.Sprintf("provider %s slashed %s for liveness fault and jailed until %s",
		provider.Creator, slashAmountCoins.String(), jailUntil.String()))

	k.SetProvider(ctx, provider)

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
	if provider.ConsecutiveProofFaults >= params.MaxProofFaults {
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
		jailUntil := ctx.BlockTime().Add(*params.ProofFaultJailTime)
		provider.JailUntil = &jailUntil

		provider.ConsecutiveProofFaults = 0 // Reset after suspension

		ctx.Logger().Info(fmt.Sprintf("provider %s suspended due to excessive proof faults", provider.Creator))
	}

	k.SetProvider(ctx, provider)

	return nil
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
