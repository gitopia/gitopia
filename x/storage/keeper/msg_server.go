package keeper

import (
	"context"
	"fmt"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	merkletree "github.com/wealdtech/go-merkletree/v2"
	"github.com/wealdtech/go-merkletree/v2/sha3"

	"github.com/cosmos/cosmos-sdk/types/address"
	gitopiatypes "github.com/gitopia/gitopia/v6/x/gitopia/types"
	"github.com/gitopia/gitopia/v6/x/storage/types"
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

// ProviderModuleAddress creates a unique module account address for a provider
func ProviderModuleAddress(providerId uint64) sdk.AccAddress {
	key := append([]byte("provider"), sdk.Uint64ToBigEndian(providerId)...)
	return address.Module(types.ModuleName, key)
}

func (k msgServer) RegisterProvider(goCtx context.Context, msg *types.MsgRegisterProvider) (*types.MsgRegisterProviderResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Check if provider already exists
	_, found := k.GetProvider(ctx, msg.Creator)
	if found {
		return nil, fmt.Errorf("provider already registered")
	}

	// Create module account for the provider
	providerAcc := ProviderModuleAddress(k.GetProviderCount(ctx))

	// Transfer stake from provider to module account
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil, fmt.Errorf("invalid creator address: %v", err)
	}

	if err := k.bankKeeper.SendCoins(
		ctx,
		creator,
		providerAcc,
		sdk.NewCoins(msg.Stake),
	); err != nil {
		return nil, fmt.Errorf("failed to transfer stake: %v", err)
	}

	provider := types.Provider{
		Creator:              msg.Creator,
		Address:              msg.Address,
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

	repository, found := k.gitopiaKeeper.GetRepositoryById(ctx, msg.RepositoryId)
	if !found {
		return nil, fmt.Errorf("repository not found")
	}

	userQuota, found := k.gitopiaKeeper.GetUserQuota(ctx, repository.Owner.Id)
	if !found {
		// Create new user quota
		userQuota = gitopiatypes.UserQuota{
			Address:     repository.Owner.Id,
			StorageUsed: 0,
		}
	}

	// Check if packfile already exists for this repository
	var oldCid, oldName string
	existingPackfile, found := k.GetPackfile(ctx, msg.RepositoryId)
	if found {
		oldCid = existingPackfile.Cid
		oldName = existingPackfile.Name
		// Calculate the difference in size between the existing and new packfile
		existingSize := existingPackfile.Size_
		newSize := msg.Size_
		var diff int64
		if newSize >= existingSize {
			diff = int64(newSize - existingSize)
		} else {
			diff = -(int64(existingSize - newSize))
		}

		// Update existing packfile while preserving its ID
		existingPackfile.Creator = msg.Creator
		existingPackfile.Name = msg.Name
		existingPackfile.Cid = msg.Cid
		existingPackfile.RootHash = msg.RootHash
		existingPackfile.Size_ = msg.Size_

		userQuota.StorageUsed += uint64(int64(userQuota.StorageUsed) + diff)
		k.gitopiaKeeper.SetUserQuota(ctx, userQuota)

		k.SetPackfile(ctx, existingPackfile)
	} else {
		// Create new packfile
		packfile := types.Packfile{
			Creator:      msg.Creator,
			RepositoryId: msg.RepositoryId,
			Name:         msg.Name,
			Cid:          msg.Cid,
			RootHash:     msg.RootHash,
			Size_:        msg.Size_,
		}

		userQuota.StorageUsed += msg.Size_
		k.gitopiaKeeper.SetUserQuota(ctx, userQuota)

		k.AppendPackfile(ctx, packfile)
	}

	// Emit event
	ctx.EventManager().EmitTypedEvent(&types.EventPackfileUpdated{
		RepositoryId: msg.RepositoryId,
		NewCid:       msg.Cid,
		OldCid:       oldCid,
		NewName:      msg.Name,
		OldName:      oldName,
	})

	return &types.MsgUpdateRepositoryPackfileResponse{}, nil
}

func (k msgServer) UpdateReleaseAsset(goCtx context.Context, msg *types.MsgUpdateReleaseAsset) (*types.MsgUpdateReleaseAssetResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	repository, found := k.gitopiaKeeper.GetRepositoryById(ctx, msg.RepositoryId)
	if !found {
		return nil, fmt.Errorf("repository not found")
	}

	// Check if release asset already exists for this repository
	var oldCid, oldSha256 string
	existingAsset, found := k.GetReleaseAsset(ctx, msg.RepositoryId, msg.Tag, msg.Name)
	if found {
		oldCid = existingAsset.Cid
		oldSha256 = existingAsset.Sha256
		// Calculate the difference in size between the existing and new asset
		existingSize := existingAsset.Size_
		newSize := msg.Size_
		var diff int64
		if newSize >= existingSize {
			diff = int64(newSize - existingSize)
		} else {
			diff = -(int64(existingSize - newSize))
		}

		// Update existing asset while preserving its ID
		existingAsset.Creator = msg.Creator
		existingAsset.Name = msg.Name
		existingAsset.Cid = msg.Cid
		existingAsset.RootHash = msg.RootHash
		existingAsset.Size_ = msg.Size_

		userQuota, _ := k.gitopiaKeeper.GetUserQuota(ctx, repository.Owner.Id)

		userQuota.StorageUsed += uint64(int64(userQuota.StorageUsed) + diff)
		k.gitopiaKeeper.SetUserQuota(ctx, userQuota)

		k.SetReleaseAsset(ctx, existingAsset)
	} else {
		// Create new release asset
		asset := types.ReleaseAsset{
			Creator:      msg.Creator,
			RepositoryId: msg.RepositoryId,
			Tag:          msg.Tag,
			Name:         msg.Name,
			Cid:          msg.Cid,
			RootHash:     msg.RootHash,
			Size_:        msg.Size_,
		}

		userQuota, _ := k.gitopiaKeeper.GetUserQuota(ctx, repository.Owner.Id)

		userQuota.StorageUsed += msg.Size_
		k.gitopiaKeeper.SetUserQuota(ctx, userQuota)

		k.AppendReleaseAsset(ctx, asset)
	}

	// Emit event
	ctx.EventManager().EmitTypedEvent(&types.EventReleaseAssetUpdated{
		RepositoryId: msg.RepositoryId,
		Tag:          msg.Tag,
		Name:         msg.Name,
		NewCid:       msg.Cid,
		OldCid:       oldCid,
		NewSha256:    msg.Sha256,
		OldSha256:    oldSha256,
	})

	return &types.MsgUpdateReleaseAssetResponse{}, nil
}

func (k msgServer) SubmitChallengeResponse(goCtx context.Context, msg *types.MsgSubmitChallengeResponse) (*types.MsgSubmitChallengeResponseResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Get the challenge
	challenge, found := k.GetChallenge(ctx, msg.ChallengeId)
	if !found {
		return nil, fmt.Errorf("challenge not found")
	}

	ctx.Logger().Info(fmt.Sprintf("provider %s submitted challenge response for challenge %d", msg.Creator, msg.ChallengeId))

	// Verify the provider is the one being challenged
	if challenge.Provider != msg.Creator {
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

	provider, found := k.GetProvider(ctx, msg.Creator)
	if !found {
		return nil, fmt.Errorf("provider not found")
	}

	params := k.GetParams(ctx)

	// Verify the Merkle proof
	verified, err := merkletree.VerifyProofUsing(
		msg.Data, // The data being proved
		false,    // Not using salting
		&merkletree.Proof{
			Hashes: msg.Proof.Hashes,
			Index:  msg.Proof.Index,
		}, // The Merkle proof
		[][]byte{challenge.RootHash}, // The Merkle root as a single-element pollard
		sha3.New256(),
	)
	if err != nil {
		return nil, fmt.Errorf("failed to verify proof: %v", err)
	}
	if !verified {
		// Update provider stats for failed challenge
		provider.TotalChallenges++
		provider.ConsecutiveFailures++
		k.SetProvider(ctx, provider)

		// Slash provider
		k.bankKeeper.SendCoinsFromAccountToModule(ctx, ProviderModuleAddress(provider.Id), types.BurnAccountName, sdk.NewCoins(params.ChallengeSlashAmount))
		k.bankKeeper.BurnCoins(ctx, types.BurnAccountName, sdk.NewCoins(params.ChallengeSlashAmount))

		challenge.Status = types.ChallengeStatus_CHALLENGE_STATUS_FAILED
		k.SetChallenge(ctx, challenge)

		ctx.Logger().Info(fmt.Sprintf("provider %s slashed for challenge %d", provider.Creator, challenge.Id))

		return nil, fmt.Errorf("invalid proof")
	}

	// Update challenge status
	challenge.Status = types.ChallengeStatus_CHALLENGE_STATUS_COMPLETED
	k.SetChallenge(ctx, challenge)

	// Update provider rewards
	providerAcc, _ := sdk.AccAddressFromBech32(msg.Creator)
	currentRewards := k.GetProviderRewards(ctx, providerAcc)
	challengeReward := sdk.NewDecCoinFromCoin(params.ChallengeReward)
	currentRewards.Rewards = currentRewards.Rewards.Add(challengeReward)
	k.SetProviderRewards(ctx, providerAcc, currentRewards)

	// Update provider stats
	provider.TotalChallenges++
	provider.SuccessfulChallenges++
	provider.ConsecutiveFailures = 0
	k.SetProvider(ctx, provider)

	ctx.Logger().Info(fmt.Sprintf("provider %s rewarded for challenge %d", provider.Creator, challenge.Id))

	return &types.MsgSubmitChallengeResponseResponse{}, nil
}

func (k msgServer) WithdrawProviderRewards(goCtx context.Context, msg *types.MsgWithdrawProviderRewards) (*types.MsgWithdrawProviderRewardsResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	provider, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil, err
	}
	amount, err := k.Keeper.WithdrawProviderRewards(ctx, provider)
	if err != nil {
		return nil, err
	}

	return &types.MsgWithdrawProviderRewardsResponse{
		Amount: amount,
	}, nil
}

func (k msgServer) UnregisterProvider(goCtx context.Context, msg *types.MsgUnregisterProvider) (*types.MsgUnregisterProviderResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Get the provider
	provider, found := k.GetProvider(ctx, msg.Creator)
	if !found {
		return nil, fmt.Errorf("provider not found")
	}

	// Check if provider is already unregistering
	if provider.UnstakeCompletionTime != nil {
		return nil, fmt.Errorf("provider is already unregistering")
	}

	// Get params for cooldown period
	params := k.GetParams(ctx)
	unstakeCompletionTime := ctx.BlockTime().Add(time.Duration(params.UnstakeCooldownBlocks) * time.Second)

	// Update provider with unstake completion time
	provider.UnstakeCompletionTime = &unstakeCompletionTime
	k.SetProvider(ctx, provider)

	// Emit event
	ctx.EventManager().EmitTypedEvent(&types.EventProviderUnregistered{
		Address:               provider.Creator,
		UnstakeCompletionTime: unstakeCompletionTime,
	})

	return &types.MsgUnregisterProviderResponse{
		UnstakeCompletionTime: unstakeCompletionTime,
	}, nil
}

func (k msgServer) CompleteUnstake(goCtx context.Context, msg *types.MsgCompleteUnstake) (*types.MsgCompleteUnstakeResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Get the provider
	provider, found := k.GetProvider(ctx, msg.Creator)
	if !found {
		return nil, fmt.Errorf("provider not found")
	}

	// Check if provider is unregistering
	if provider.UnstakeCompletionTime == nil {
		return nil, fmt.Errorf("provider is not unregistering")
	}

	// Check if cooldown period has passed
	if ctx.BlockTime().Before(*provider.UnstakeCompletionTime) {
		return nil, fmt.Errorf("unstake cooldown period has not passed yet")
	}

	// Get provider's module account
	providerAcc := ProviderModuleAddress(provider.Id)

	// Transfer stake back to provider
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil, fmt.Errorf("invalid creator address: %v", err)
	}

	if err := k.bankKeeper.SendCoins(
		ctx,
		providerAcc,
		creator,
		sdk.NewCoins(provider.Stake),
	); err != nil {
		return nil, fmt.Errorf("failed to transfer stake: %v", err)
	}

	// Emit event
	ctx.EventManager().EmitTypedEvent(&types.EventProviderUnstakeCompleted{
		Address: provider.Creator,
		Amount:  provider.Stake,
	})

	// Remove provider from store
	k.RemoveProvider(ctx, provider.Creator)

	return &types.MsgCompleteUnstakeResponse{
		Amount: provider.Stake,
	}, nil
}
