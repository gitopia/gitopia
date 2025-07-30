package keeper

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v6/x/storage/types"
)

// GetActiveProvidersForLiveness returns providers that should participate in liveness tracking
func (k Keeper) GetActiveProvidersForLiveness(ctx sdk.Context) []types.Provider {
	allProviders := k.GetActiveProviders(ctx)
	var livenessProviders []types.Provider

	for _, provider := range allProviders {
		// Only include providers that are not jailed and not suspended
		if !provider.Jailed && provider.Status == types.Bonded {
			livenessProviders = append(livenessProviders, provider)
		}
	}

	return livenessProviders
}

// ResetProviderConsecutiveFaults resets consecutive faults when a provider submits a valid proof
func (k Keeper) ResetProviderConsecutiveFaults(ctx sdk.Context, providerAddr string, faultType string) error {
	provider, found := k.GetProvider(ctx, providerAddr)
	if !found {
		return fmt.Errorf("provider not found: %s", providerAddr)
	}

	switch faultType {
	case "liveness":
		provider.ConsecutiveLivenessFaults = 0
	case "proof":
		provider.ConsecutiveProofFaults = 0
	case "both":
		provider.ConsecutiveLivenessFaults = 0
		provider.ConsecutiveProofFaults = 0
	}

	k.SetProvider(ctx, provider)
	return nil
}

// UpdateProviderLastSeen updates the last activity timestamp for a provider
func (k Keeper) UpdateProviderLastSeen(ctx sdk.Context, providerAddr string) error {
	provider, found := k.GetProvider(ctx, providerAddr)
	if !found {
		return fmt.Errorf("provider not found: %s", providerAddr)
	}

	blockTime := ctx.BlockTime()
	provider.LastLivenessCheck = &blockTime
	k.SetProvider(ctx, provider)

	return nil
}

// GetProviderLivenessStats returns liveness statistics for a provider (simplified)
func (k Keeper) GetProviderLivenessStats(ctx sdk.Context, providerAddr string) (map[string]interface{}, error) {
	provider, found := k.GetProvider(ctx, providerAddr)
	if !found {
		return nil, fmt.Errorf("provider not found: %s", providerAddr)
	}

	livenessInfo := k.GetProviderLivenessInfo(ctx, providerAddr)
	stats := map[string]interface{}{
		"provider":                    providerAddr,
		"current_liveness_ratio":      100.0,
		"consecutive_liveness_faults": provider.ConsecutiveLivenessFaults,
		"consecutive_proof_faults":    provider.ConsecutiveProofFaults,
		"is_jailed":                   provider.Jailed,
		"jail_until":                  provider.JailUntil,
	}

	if livenessInfo != nil {
		stats["current_liveness_ratio"] = livenessInfo.CurrentLivenessRatio
		stats["total_submissions"] = livenessInfo.TotalSubmissionsInWindow
		stats["missed_submissions"] = livenessInfo.MissedSubmissionsInWindow
	}

	return stats, nil
}

// CleanupExpiredLivenessData removes old liveness data to prevent storage bloat
// Updated for challenge-based liveness tracking
func (k Keeper) CleanupExpiredLivenessData(ctx sdk.Context) error {
	params := k.GetParams(ctx)

	// Get the latest challenge ID to determine what's "expired"
	latestChallengeId := k.GetChallengeCount(ctx)

	// Clean up liveness data older than 2x the window size
	expirationThreshold := uint64(0)
	if latestChallengeId > (2 * params.LivenessWindowChallenges) {
		expirationThreshold = latestChallengeId - (2 * params.LivenessWindowChallenges)
	}

	allProviders := k.GetAllProvider(ctx)
	cleanedCount := 0

	for _, provider := range allProviders {
		livenessInfo := k.GetProviderLivenessInfo(ctx, provider.Creator)
		if livenessInfo != nil && livenessInfo.CurrentWindowStartChallenge < expirationThreshold {
			// Reset liveness info for providers with very old data
			livenessInfo.CurrentWindowStartChallenge = latestChallengeId
			livenessInfo.MissedSubmissionsInWindow = 0
			livenessInfo.TotalSubmissionsInWindow = 0
			livenessInfo.CurrentLivenessRatio = 100.0
			livenessInfo.RecentMissedChallenges = []uint64{}

			k.SetProviderLivenessInfo(ctx, livenessInfo)
			cleanedCount++
		}
	}

	if cleanedCount > 0 {
		ctx.Logger().Info(fmt.Sprintf("cleaned up expired liveness data for %d providers", cleanedCount))
	}

	return nil
}

// ValidateProviderLivenessParams validates liveness-related parameters
func ValidateProviderLivenessParams(params types.Params) error {
	if params.LivenessWindowChallenges == 0 {
		return fmt.Errorf("liveness window challenges must be greater than 0")
	}

	if params.MinLivenessRatio < 0 || params.MinLivenessRatio > 100 {
		return fmt.Errorf("minimum liveness ratio must be between 0 and 100")
	}

	if params.LivenessJailBlocks == 0 {
		return fmt.Errorf("liveness jail blocks must be greater than 0")
	}

	if params.ProofFaultJailBlocks == 0 {
		return fmt.Errorf("proof fault jail blocks must be greater than 0")
	}

	if params.MaxLivenessFaults == 0 {
		return fmt.Errorf("max liveness faults must be greater than 0")
	}

	if params.MaxProofFaults == 0 {
		return fmt.Errorf("max proof faults must be greater than 0")
	}

	return nil
}
