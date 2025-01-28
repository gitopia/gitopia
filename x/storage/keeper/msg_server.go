package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	merkletree "github.com/wealdtech/go-merkletree/v2"

	"github.com/gitopia/gitopia/v5/x/storage/types"
)

type msgServer struct {
	Keeper
}

// NewMsgServerImpl returns an implementation of the MsgServer interface
// for the provided Keeper.
func NewMsgServerImpl(keeper Keeper) types.MsgServer {
	return &msgServer{Keeper: keeper}
}

var _ types.MsgServer = msgServer{}

func (k msgServer) RegisterProvider(goCtx context.Context, msg *types.MsgRegisterProvider) (*types.MsgRegisterProviderResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Check if provider already exists
	_, found := k.GetProvider(ctx, msg.Creator)
	if found {
		return nil, fmt.Errorf("provider already registered")
	}

	provider := types.Provider{
		Creator:              msg.Creator,
		Address:              msg.Address,
		PeerId:               msg.PeerId,
		Multiaddresses:       msg.Multiaddresses,
		Stake:                msg.Stake,
		TotalChallenges:      0,
		SuccessfulChallenges: 0,
		ConsecutiveFailures:  0,
		JoinTime:             ctx.BlockTime(),
	}

	k.AppendProvider(ctx, provider)

	return &types.MsgRegisterProviderResponse{}, nil
}

func (k msgServer) UpdateRepositoryPackfile(goCtx context.Context, msg *types.MsgUpdateRepositoryPackfile) (*types.MsgUpdateRepositoryPackfileResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Update repository packfile
	k.SetPackfile(ctx, types.Packfile{
		Creator:      msg.Creator,
		RepositoryId: msg.RepositoryId,
		Name:         msg.Name,
		Cid:          msg.Cid,
		RootHash:     msg.RootHash,
	})

	return &types.MsgUpdateRepositoryPackfileResponse{}, nil
}

func (k msgServer) SubmitChallengeResponse(goCtx context.Context, msg *types.MsgSubmitChallengeResponse) (*types.MsgSubmitChallengeResponseResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Get the challenge
	challenge, found := k.GetChallenge(ctx, msg.ChallengeId)
	if !found {
		return nil, fmt.Errorf("challenge not found")
	}

	// Verify the provider is the one being challenged
	if challenge.ProviderAddress != msg.Creator {
		return nil, fmt.Errorf("unauthorized: only challenged provider can submit response")
	}

	// Check challenge hasn't expired
	if ctx.BlockTime().After(challenge.Deadline) {
		return nil, fmt.Errorf("challenge deadline exceeded")
	}

	// Check challenge is still pending
	if challenge.Status != types.ChallengeStatus_CHALLENGE_STATUS_PENDING {
		return nil, fmt.Errorf("challenge already completed")
	}

	// Verify the Merkle proof
	verified, err := merkletree.VerifyProof(
		msg.Data,                             // The data being proved
		false,                                // Not using salting
		&merkletree.Proof{Hashes: msg.Proof}, // The Merkle proof
		[][]byte{[]byte(challenge.RootHash)}, // The Merkle root as a single-element pollard
	)
	if err != nil {
		return nil, fmt.Errorf("failed to verify proof: %v", err)
	}
	if !verified {
		// Update provider stats for failed challenge
		provider, _ := k.GetProvider(ctx, msg.Creator)
		provider.TotalChallenges++
		provider.ConsecutiveFailures++
		k.SetProvider(ctx, provider)

		challenge.Status = types.ChallengeStatus_CHALLENGE_STATUS_FAILED
		k.SetChallenge(ctx, challenge)

		return nil, fmt.Errorf("invalid proof")
	}

	// Update challenge status
	challenge.Status = types.ChallengeStatus_CHALLENGE_STATUS_COMPLETED
	k.SetChallenge(ctx, challenge)

	// Update provider stats
	provider, _ := k.GetProvider(ctx, msg.Creator)
	provider.TotalChallenges++
	provider.SuccessfulChallenges++
	provider.ConsecutiveFailures = 0
	k.SetProvider(ctx, provider)

	return &types.MsgSubmitChallengeResponseResponse{}, nil
}
