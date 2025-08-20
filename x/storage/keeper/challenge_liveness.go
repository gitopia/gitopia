package keeper

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v6/x/storage/types"
)

// ProcessChallengeResponseForLiveness handles liveness tracking when a provider submits a challenge response
func (k Keeper) ProcessChallengeResponseForLiveness(ctx sdk.Context, challenge *types.Challenge, responderAddress string, validProof bool) error {
	// Update liveness for the responding provider
	err := k.UpdateProviderLiveness(ctx, responderAddress, challenge.Id, validProof)
	if err != nil {
		return fmt.Errorf("failed to update liveness for responder %s: %v", responderAddress, err)
	}

	// If this is the assigned provider with an invalid proof, apply proof fault slashing
	if challenge.Provider == responderAddress && !validProof {
		err := k.SlashProviderForProofFault(ctx, responderAddress)
		if err != nil {
			ctx.Logger().Error(fmt.Sprintf("failed to slash provider %s for proof fault: %v", responderAddress, err))
		}
	}

	ctx.Logger().Info(fmt.Sprintf("processed challenge response from %s for challenge %d", responderAddress, challenge.Id))
	return nil
}

// ProcessChallengeTimeout handles liveness violations when a challenge times out
func (k Keeper) ProcessChallengeTimeout(ctx sdk.Context, challenge *types.Challenge) error {
	// Get all active providers that should have responded
	activeProviders := k.GetActiveProviders(ctx)

	// Check which providers failed to respond and update liveness tracking
	for _, provider := range activeProviders {
		// Check if this provider submitted a response to this challenge
		hasSubmitted := k.HasProviderSubmittedChallenge(ctx, challenge.Id, provider.Creator)

		if !hasSubmitted {
			// Update liveness tracking for missed challenge
			err := k.UpdateProviderLiveness(ctx, provider.Creator, challenge.Id, false) // false = missed
			if err != nil {
				ctx.Logger().Error(fmt.Sprintf("failed to update liveness for provider %s: %v", provider.Creator, err))
				continue
			}

			// Check if provider now violates minimum liveness requirement
			violation, err := k.CheckProviderLivenessViolation(ctx, provider.Creator)
			if err != nil {
				ctx.Logger().Error(fmt.Sprintf("failed to check liveness violation for %s: %v", provider.Creator, err))
				continue
			}

			if violation {
				// Apply liveness fault penalty (lighter than proof fault)
				err = k.SlashProviderForLivenessFault(ctx, provider.Creator)
				if err != nil {
					ctx.Logger().Error(fmt.Sprintf("failed to slash provider %s for liveness fault: %v", provider.Creator, err))
					continue
				}
			}
		}
	}

	// Special handling for the assigned provider who failed to respond
	if !k.HasProviderSubmittedChallenge(ctx, challenge.Id, challenge.Provider) {
		ctx.Logger().Info(fmt.Sprintf("assigned provider %s failed to respond to challenge %d", challenge.Provider, challenge.Id))
		err := k.SlashProviderForProofFault(ctx, challenge.Provider)
		if err != nil {
			ctx.Logger().Error(fmt.Sprintf("failed to slash provider %s for proof fault: %v", challenge.Provider, err))
		}
		// Update challenge status to failed
		challenge.Status = types.ChallengeStatus_CHALLENGE_STATUS_FAILED
		k.SetChallenge(ctx, *challenge)
	}

	return nil
}

// HasProviderSubmittedChallenge checks if a provider has submitted a response to a specific challenge
func (k Keeper) HasProviderSubmittedChallenge(ctx sdk.Context, challengeId uint64, providerAddr string) bool {
	livenessInfo := k.GetProviderLivenessInfo(ctx, providerAddr)
	if livenessInfo == nil {
		return false
	}

	return livenessInfo.LastSubmissionChallenge == challengeId
}
