package keeper

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v6/x/storage/types"
)

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

	if params.MinLivenessRatio > 100 {
		return fmt.Errorf("minimum liveness ratio must be less than 100")
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
