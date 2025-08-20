package keeper

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v6/x/storage/types"
)

// UpdateProviderLiveness updates the liveness tracking for a provider based on a true sliding window.
func (k Keeper) UpdateProviderLiveness(ctx sdk.Context, providerAddr string, challengeId uint64, submitted bool) error {
	params := k.GetParams(ctx)
	windowSize := params.LivenessWindowChallenges

	// Get or create liveness info for provider
	livenessInfo := k.GetProviderLivenessInfo(ctx, providerAddr)
	if livenessInfo == nil {
		livenessInfo = &types.ProviderLivenessInfo{
			Provider:                 providerAddr,
			TotalSubmissionsInWindow: windowSize, // Represents the constant size of the sliding window
			CurrentLivenessRatio:     100.0,
			RecentMissedChallenges:   []uint64{},
		}
	}

	// Evict old challenges that fall outside the new sliding window.
	// The window is defined as [challengeId - windowSize + 1, challengeId].
	if windowSize > 0 {
		minChallengeId := uint64(1) // Prevent underflow if challengeId < windowSize
		if challengeId >= windowSize {
			minChallengeId = challengeId - windowSize + 1
		}

		// Filter out missed challenges that are too old to be in the current window
		newMissedChallenges := []uint64{}
		for _, missedChallenge := range livenessInfo.RecentMissedChallenges {
			if missedChallenge >= minChallengeId {
				newMissedChallenges = append(newMissedChallenges, missedChallenge)
			}
		}
		livenessInfo.RecentMissedChallenges = newMissedChallenges
	}

	// Add the result of the current challenge
	if !submitted {
		livenessInfo.RecentMissedChallenges = append(livenessInfo.RecentMissedChallenges, challengeId)
	} else {
		livenessInfo.LastSubmissionChallenge = challengeId
		blockTime := ctx.BlockTime()
		livenessInfo.LastLivenessCheck = &blockTime
	}

	// Recalculate the liveness ratio based on the state of the sliding window
	livenessInfo.MissedSubmissionsInWindow = uint64(len(livenessInfo.RecentMissedChallenges))

	// The denominator for the ratio is the number of challenges that have occurred within the window's timeframe,
	// which can be less than the full windowSize at the beginning of the chain.
	numChallengesInWindow := challengeId + 1 // Assuming challengeId starts from 0
	if numChallengesInWindow > windowSize {
		numChallengesInWindow = windowSize
	}

	if numChallengesInWindow == 0 { // Avoid division by zero
		livenessInfo.CurrentLivenessRatio = 100.0
	} else {
		successfulSubmissions := numChallengesInWindow - livenessInfo.MissedSubmissionsInWindow
		livenessInfo.CurrentLivenessRatio = float64(successfulSubmissions) / float64(numChallengesInWindow) * 100.0
	}

	// Store updated liveness info
	k.SetProviderLivenessInfo(ctx, livenessInfo)

	return nil
}

// CheckProviderLivenessViolation checks if a provider has violated liveness requirements
func (k Keeper) CheckProviderLivenessViolation(ctx sdk.Context, providerAddr string) (bool, error) {
	params := k.GetParams(ctx)
	livenessInfo := k.GetProviderLivenessInfo(ctx, providerAddr)

	if livenessInfo == nil {
		return false, nil // No violation if no tracking info exists yet
	}

	// Check if liveness ratio is below minimum required
	minLivenessRatio, err := params.MinLivenessPerWindow.Float64()
	if err != nil {
		return false, err
	}

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
	if !params.LivenessSlashFraction.IsZero() {
		stakeAmount := stake.Stake.AmountOf("ulore")
		percentageSlash := params.LivenessSlashFraction.MulInt(stakeAmount)
		percentageSlashCoins := sdk.NewCoins(sdk.NewCoin("ulore", percentageSlash.RoundInt()))
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
	jailUntil := ctx.BlockTime().Add(params.LivenessJailTime)
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
		if !params.ProofFaultSlashFraction.IsZero() {
			stakeAmount := stake.Stake.AmountOf("ulore")
			percentageSlash := params.ProofFaultSlashFraction.MulInt(stakeAmount)
			percentageSlashCoins := sdk.NewCoins(sdk.NewCoin("ulore", percentageSlash.RoundInt()))
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
		jailUntil := ctx.BlockTime().Add(params.ProofFaultJailTime)
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
