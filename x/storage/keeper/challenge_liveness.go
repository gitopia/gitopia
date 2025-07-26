package keeper

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v6/x/storage/types"
)

// ProcessChallengeForLiveness handles liveness tracking when a challenge is created
// In Tendermint-style liveness, all active providers are expected to submit proofs
func (k Keeper) ProcessChallengeForLiveness(ctx sdk.Context, challenge *types.Challenge) error {
	// Get all active, non-jailed providers
	activeProviders := k.GetActiveNonJailedProviders(ctx)
	
	// Track that a challenge has been created - all providers should respond
	for _, provider := range activeProviders {
		// Initialize or update liveness tracking for this challenge period
		err := k.UpdateProviderLiveness(ctx, provider.Creator, false) // false = haven't submitted yet
		if err != nil {
			ctx.Logger().Error(fmt.Sprintf("failed to update liveness for provider %s: %v", provider.Creator, err))
		}
	}
	
	ctx.Logger().Info(fmt.Sprintf("challenge %d created, tracking liveness for %d active providers", challenge.Id, len(activeProviders)))
	return nil
}

// ProcessChallengeResponseForLiveness handles liveness tracking when a provider submits a challenge response
func (k Keeper) ProcessChallengeResponseForLiveness(ctx sdk.Context, challenge *types.Challenge, responderAddress string, validProof bool) error {
	// Update liveness for the responding provider
	err := k.UpdateProviderLiveness(ctx, responderAddress, true) // true = submitted proof
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
	activeProviders := k.GetActiveNonJailedProviders(ctx)
	
	// Check which providers failed to respond and apply liveness penalties
	for _, provider := range activeProviders {
		// Check if this provider submitted a response to this challenge
		hasSubmitted := k.HasProviderSubmittedChallenge(ctx, challenge.Id, provider.Creator)
		
		if !hasSubmitted {
			// Apply liveness fault penalty (lighter than proof fault)
			err := k.SlashProviderForLivenessFault(ctx, provider.Creator)
			if err != nil {
				ctx.Logger().Error(fmt.Sprintf("failed to slash provider %s for liveness fault: %v", provider.Creator, err))
				continue
			}
			
			// Check if provider now violates minimum liveness requirement
			violation, err := k.CheckProviderLivenessViolation(ctx, provider.Creator)
			if err != nil {
				ctx.Logger().Error(fmt.Sprintf("failed to check liveness violation for %s: %v", provider.Creator, err))
				continue
			}
			
			if violation {
				ctx.Logger().Info(fmt.Sprintf("provider %s violated minimum liveness requirement", provider.Creator))
			}
		}
	}
	
	// Special handling for the assigned provider who failed to respond
	if !k.HasProviderSubmittedChallenge(ctx, challenge.Id, challenge.Provider) {
		ctx.Logger().Info(fmt.Sprintf("assigned provider %s failed to respond to challenge %d", challenge.Provider, challenge.Id))
	}
	
	return nil
}

// GetActiveNonJailedProviders returns all active providers that are not currently jailed
func (k Keeper) GetActiveNonJailedProviders(ctx sdk.Context) []types.Provider {
	allProviders := k.GetActiveProviders(ctx)
	var activeNonJailed []types.Provider
	
	for _, provider := range allProviders {
		if !k.IsProviderJailed(ctx, provider.Creator) {
			activeNonJailed = append(activeNonJailed, provider)
		}
	}
	
	return activeNonJailed
}

// HasProviderSubmittedChallenge checks if a provider has submitted a response to a specific challenge
func (k Keeper) HasProviderSubmittedChallenge(ctx sdk.Context, challengeId uint64, providerAddr string) bool {
	// This would typically check a challenge response tracking store
	// For now, implement a simple check - in a full implementation, you'd want to track responses
	
	// Get the challenge to check its status
	challenge, found := k.GetChallenge(ctx, challengeId)
	if !found {
		return false
	}
	
	// If the challenge is completed and the provider is the one who was challenged, 
	// then they submitted (this is simplified logic)
	if challenge.Status == types.ChallengeStatus_CHALLENGE_STATUS_COMPLETED && challenge.Provider == providerAddr {
		return true
	}
	
	// In a full implementation, you'd maintain a separate tracking store for all responses
	// For now, return false for non-assigned providers (they didn't submit)
	return false
}

// StartLivenessTracking initializes liveness tracking for all active providers
func (k Keeper) StartLivenessTracking(ctx sdk.Context) error {
	activeProviders := k.GetActiveNonJailedProviders(ctx)
	currentBlock := uint64(ctx.BlockHeight())
	
	for _, provider := range activeProviders {
		// Initialize liveness info if it doesn't exist
		livenessInfo := k.GetProviderLivenessInfo(ctx, provider.Creator)
		if livenessInfo == nil {
			livenessInfo = &types.ProviderLivenessInfo{
				Provider:                    provider.Creator,
				CurrentWindowStart:         currentBlock,
				MissedSubmissionsInWindow:   0,
				TotalSubmissionsInWindow:    0,
				CurrentLivenessRatio:       100.0,
				LastSubmissionBlock:        0,
				RecentMissedBlocks:         []uint64{},
			}
			k.SetProviderLivenessInfo(ctx, livenessInfo)
		}
	}
	
	ctx.Logger().Info(fmt.Sprintf("initialized liveness tracking for %d providers at block %d", len(activeProviders), currentBlock))
	return nil
}

// PeriodicLivenessCheck performs periodic liveness checks and applies penalties
func (k Keeper) PeriodicLivenessCheck(ctx sdk.Context) error {
	activeProviders := k.GetActiveNonJailedProviders(ctx)
	
	for _, provider := range activeProviders {
		// Check liveness violation
		violation, err := k.CheckProviderLivenessViolation(ctx, provider.Creator)
		if err != nil {
			ctx.Logger().Error(fmt.Sprintf("failed to check liveness for provider %s: %v", provider.Creator, err))
			continue
		}
		
		if violation {
			// Apply liveness fault penalty
			err := k.SlashProviderForLivenessFault(ctx, provider.Creator)
			if err != nil {
				ctx.Logger().Error(fmt.Sprintf("failed to apply liveness penalty to %s: %v", provider.Creator, err))
			}
		}
		
		// Update liveness window for all providers
		err = k.UpdateProviderLiveness(ctx, provider.Creator, false) // false = just updating window
		if err != nil {
			ctx.Logger().Error(fmt.Sprintf("failed to update liveness window for %s: %v", provider.Creator, err))
		}
	}
	
	ctx.Logger().Info(fmt.Sprintf("completed periodic liveness check for %d providers", len(activeProviders)))
	return nil
}

// AutoUnjailExpiredProviders automatically unjails providers whose jail time has expired
func (k Keeper) AutoUnjailExpiredProviders(ctx sdk.Context) error {
	allProviders := k.GetAllProvider(ctx)
	unjailedCount := 0
	
	for _, provider := range allProviders {
		if provider.Jailed && provider.JailUntil != nil && ctx.BlockTime().After(*provider.JailUntil) {
			// Automatically unjail the provider
			provider.Jailed = false
			provider.JailUntil = nil
			k.SetProvider(ctx, provider)
			
			unjailedCount++
			ctx.Logger().Info(fmt.Sprintf("automatically unjailed provider %s", provider.Creator))
			
			// Emit unjail event
			ctx.EventManager().EmitTypedEvent(&types.EventProviderStatusUpdated{
				Address: provider.Creator,
				Online:  true,
			})
		}
	}
	
	if unjailedCount > 0 {
		ctx.Logger().Info(fmt.Sprintf("automatically unjailed %d providers", unjailedCount))
	}
	
	return nil
}
