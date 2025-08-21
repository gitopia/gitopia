package keeper

import (
	"context"
	"fmt"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	merkletree "github.com/wealdtech/go-merkletree/v2"
	"github.com/wealdtech/go-merkletree/v2/sha3"

	appparams "github.com/gitopia/gitopia/v6/app/params"
	gitopiatypes "github.com/gitopia/gitopia/v6/x/gitopia/types"
	"github.com/gitopia/gitopia/v6/x/storage/types"
)

// Approximate upgrade time of the v6 upgrade which adds storage module
var UpgradeTime = time.Date(2025, time.July, 11, 12, 35, 0, 0, time.UTC)

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

	// Check if active provider count has reached the maximum limit
	activeProviders := k.GetActiveProviders(ctx)
	if len(activeProviders) >= int(k.GetParams(ctx).MaxProviders) {
		return nil, fmt.Errorf("active provider count has reached the maximum limit")
	}

	// Check if provider already exists
	_, found := k.GetProvider(ctx, msg.Creator)
	if found {
		return nil, fmt.Errorf("provider already registered")
	}

	// Stake amount must be greater than the minimum stake amount
	params := k.GetParams(ctx)
	if msg.Stake.Amount.Uint64() < params.MinStakeAmount {
		return nil, fmt.Errorf("stake amount must be greater than the minimum stake amount")
	}

	bondedPoolAcc := k.accountKeeper.GetModuleAccount(ctx, types.StorageBondedPoolName)
	if bondedPoolAcc == nil {
		panic(sdkerrors.Wrapf(sdkerrors.ErrUnknownAddress, "module account %s does not exist", types.StorageBondedPoolName))
	}

	// Transfer stake from provider to module account
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil, fmt.Errorf("invalid creator address: %v", err)
	}

	if err := k.bankKeeper.SendCoins(
		ctx,
		creator,
		bondedPoolAcc.GetAddress(),
		sdk.NewCoins(msg.Stake),
	); err != nil {
		return nil, fmt.Errorf("failed to transfer stake: %v", err)
	}

	k.SetProviderStake(ctx, creator, types.ProviderStake{
		Provider: msg.Creator,
		Stake:    sdk.NewCoins(msg.Stake),
	})

	provider := types.Provider{
		Creator:                  msg.Creator,
		ApiUrl:                   msg.ApiUrl,
		Moniker:                  msg.Moniker,
		JoinTime:                 ctx.BlockTime(),
		Status:                   types.Bonded,
		IpfsClusterPeerMultiaddr: msg.IpfsClusterPeerMultiaddr,
	}

	k.AppendProvider(ctx, provider)

	return &types.MsgRegisterProviderResponse{}, nil
}

func (k msgServer) UpdateProvider(goCtx context.Context, msg *types.MsgUpdateProvider) (*types.MsgUpdateProviderResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	provider, found := k.GetProvider(ctx, msg.Creator)
	if !found {
		return nil, fmt.Errorf("provider not found")
	}

	provider.ApiUrl = msg.ApiUrl
	provider.Moniker = msg.Moniker
	provider.IpfsClusterPeerMultiaddr = msg.IpfsClusterPeerMultiaddr

	k.SetProvider(ctx, provider)

	return &types.MsgUpdateProviderResponse{}, nil
}

// calculateStorageCharge calculates the charge for storage usage beyond free limit
func (k msgServer) calculateStorageCharge(ctx sdk.Context, currentUsage uint64, newUsage uint64) (sdk.Coin, error) {
	params := k.GetParams(ctx)
	freeStorageBytes := params.FreeStorageMb * 1024 * 1024 // Convert MB to bytes

	// If current usage is already above free limit, charge for the entire diff
	if currentUsage > freeStorageBytes {
		diff := newUsage - currentUsage
		if diff <= 0 {
			return sdk.NewCoin(params.StoragePricePerGb.Denom, sdk.ZeroInt()), nil
		}
		// Calculate charge in GB and multiply by price per GB
		diffGb := float64(diff) / (1024 * 1024 * 1024)
		chargeAmount := sdk.NewDec(int64(diffGb)).Mul(sdk.NewDecFromInt(params.StoragePricePerGb.Amount))
		return sdk.NewCoin(params.StoragePricePerGb.Denom, chargeAmount.TruncateInt()), nil
	}

	// If new usage is below free limit, no charge
	if newUsage <= freeStorageBytes {
		return sdk.NewCoin(params.StoragePricePerGb.Denom, sdk.ZeroInt()), nil
	}

	// Calculate charge for the portion that exceeds free limit
	excessBytes := newUsage - freeStorageBytes
	excessGb := float64(excessBytes) / (1024 * 1024 * 1024)
	chargeAmount := sdk.NewDec(int64(excessGb)).Mul(sdk.NewDecFromInt(params.StoragePricePerGb.Amount))
	return sdk.NewCoin(params.StoragePricePerGb.Denom, chargeAmount.TruncateInt()), nil
}

func (k msgServer) UpdateRepositoryPackfile(goCtx context.Context, msg *types.MsgUpdateRepositoryPackfile) (*types.MsgUpdateRepositoryPackfileResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Check if provider is active
	provider, found := k.GetProvider(ctx, msg.Creator)
	if !found || provider.Jailed || provider.Status != types.Bonded {
		return nil, fmt.Errorf("provider is not active")
	}

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

		// Optimistic concurrency control: check if the current CID matches the expected old_cid
		if msg.OldCid != "" && oldCid != msg.OldCid {
			return nil, fmt.Errorf("repository state has changed: expected CID %s, found %s", msg.OldCid, oldCid)
		}
		// Calculate the difference in size between the existing and new packfile
		existingSize := existingPackfile.Size_
		newSize := msg.Size_
		var diff int64
		if newSize >= existingSize {
			diff = int64(newSize - existingSize)
		} else {
			diff = -(int64(existingSize - newSize))
		}

		// Calculate storage charge
		if !k.GetParams(ctx).StoragePricePerGb.IsZero() && repository.UpdatedAt > UpgradeTime.Unix() {
			charge, err := k.calculateStorageCharge(ctx, userQuota.StorageUsed, userQuota.StorageUsed+uint64(diff))
			if err != nil {
				return nil, fmt.Errorf("failed to calculate storage charge: %v", err)
			}

			// If there's a charge, transfer coins from user to storage charge account
			if !charge.IsZero() {
				userAddr, err := sdk.AccAddressFromBech32(repository.Owner.Id)
				if err != nil {
					return nil, fmt.Errorf("invalid user address: %v", err)
				}

				if err := k.bankKeeper.SendCoinsFromAccountToModule(ctx, userAddr, types.StorageFeePoolName, sdk.NewCoins(charge)); err != nil {
					return nil, fmt.Errorf("failed to transfer storage charge: %v", err)
				}
			}
		}

		// Decrement or remove old cid reference count
		if oldCid != "" {
			k.DecreaseCidReferenceCount(ctx, oldCid)
			if count, found := k.GetCidReferenceCount(ctx, oldCid); found && count.Count == 0 {
				k.RemoveCidReferenceCount(ctx, oldCid)
			}
		}

		// Update existing packfile while preserving its ID
		existingPackfile.Creator = msg.Creator
		existingPackfile.Name = msg.Name
		existingPackfile.OldCid = existingPackfile.Cid
		existingPackfile.Cid = msg.Cid
		existingPackfile.RootHash = msg.RootHash
		existingPackfile.Size_ = msg.Size_
		existingPackfile.UpdatedAt = ctx.BlockTime()

		userQuota.StorageUsed += uint64(int64(userQuota.StorageUsed) + diff)
		k.gitopiaKeeper.SetUserQuota(ctx, userQuota)

		k.SetPackfile(ctx, existingPackfile)

		// Increase new cid reference count
		k.IncreaseCidReferenceCount(ctx, msg.Cid)

		storageStats := k.GetStorageStats(ctx)
		storageStats.TotalPackfileSize += uint64(diff)
		k.SetStorageStats(ctx, storageStats)
	} else {
		// Calculate storage charge for new packfile
		if !k.GetParams(ctx).StoragePricePerGb.IsZero() && repository.UpdatedAt > UpgradeTime.Unix() {
			charge, err := k.calculateStorageCharge(ctx, userQuota.StorageUsed, userQuota.StorageUsed+msg.Size_)
			if err != nil {
				return nil, fmt.Errorf("failed to calculate storage charge: %v", err)
			}

			// If there's a charge, transfer coins from user to storage charge account
			if !charge.IsZero() {
				userAddr, err := sdk.AccAddressFromBech32(repository.Owner.Id)
				if err != nil {
					return nil, fmt.Errorf("invalid user address: %v", err)
				}

				if err := k.bankKeeper.SendCoinsFromAccountToModule(ctx, userAddr, types.StorageFeePoolName, sdk.NewCoins(charge)); err != nil {
					return nil, fmt.Errorf("failed to transfer storage charge: %v", err)
				}
			}
		}

		// Create new packfile
		packfile := types.Packfile{
			Creator:      msg.Creator,
			RepositoryId: msg.RepositoryId,
			Name:         msg.Name,
			Cid:          msg.Cid,
			RootHash:     msg.RootHash,
			Size_:        msg.Size_,
			CreatedAt:    ctx.BlockTime(),
			UpdatedAt:    ctx.BlockTime(),
		}

		userQuota.StorageUsed += msg.Size_
		k.gitopiaKeeper.SetUserQuota(ctx, userQuota)

		k.AppendPackfile(ctx, packfile)

		// Increase new cid reference count
		k.IncreaseCidReferenceCount(ctx, msg.Cid)

		storageStats := k.GetStorageStats(ctx)
		storageStats.TotalPackfileSize += msg.Size_
		k.SetStorageStats(ctx, storageStats)
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

func (k msgServer) UpdateReleaseAssets(goCtx context.Context, msg *types.MsgUpdateReleaseAssets) (*types.MsgUpdateReleaseAssetsResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Check if provider is active
	provider, found := k.GetProvider(ctx, msg.Creator)
	if !found || provider.Jailed || provider.Status != types.Bonded {
		return nil, fmt.Errorf("provider is not active")
	}

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

	// Track changes for storage calculation and events
	var totalSizeDiff int64

	// First pass: validate all assets and check optimistic concurrency control
	for i, assetUpdate := range msg.Assets {
		existingAsset, found := k.GetReleaseAsset(ctx, msg.RepositoryId, msg.Tag, assetUpdate.Name)
		if assetUpdate.Delete {
			// For delete, asset must exist and match old_cid if provided
			if !found {
				return nil, fmt.Errorf("asset[%d] (%s) not found for delete", i, assetUpdate.Name)
			}
			if assetUpdate.OldCid != "" && existingAsset.Cid != assetUpdate.OldCid {
				return nil, fmt.Errorf("asset[%d] (%s) state has changed: expected CID %s, found %s", i, assetUpdate.Name, assetUpdate.OldCid, existingAsset.Cid)
			}

			totalSizeDiff -= int64(existingAsset.Size_)
			continue
		}

		if found {
			// Optimistic concurrency control: check if the current CID matches the expected old_cid
			if assetUpdate.OldCid != "" && existingAsset.Cid != assetUpdate.OldCid {
				return nil, fmt.Errorf("asset[%d] (%s) state has changed: expected CID %s, found %s", i, assetUpdate.Name, assetUpdate.OldCid, existingAsset.Cid)
			}

			// Calculate size difference
			existingSize := existingAsset.Size_
			newSize := assetUpdate.Size_
			if newSize >= existingSize {
				totalSizeDiff += int64(newSize - existingSize)
			} else {
				totalSizeDiff -= int64(existingSize - newSize)
			}
		} else {
			// New asset
			totalSizeDiff += int64(assetUpdate.Size_)
		}
	}

	// Calculate storage charge for the total size difference
	if !k.GetParams(ctx).StoragePricePerGb.IsZero() && repository.UpdatedAt > UpgradeTime.Unix() {
		var newStorageUsed uint64
		if totalSizeDiff >= 0 {
			newStorageUsed = userQuota.StorageUsed + uint64(totalSizeDiff)
		} else {
			if uint64(-totalSizeDiff) > userQuota.StorageUsed {
				newStorageUsed = 0
			} else {
				newStorageUsed = userQuota.StorageUsed - uint64(-totalSizeDiff)
			}
		}

		charge, err := k.calculateStorageCharge(ctx, userQuota.StorageUsed, newStorageUsed)
		if err != nil {
			return nil, fmt.Errorf("failed to calculate storage charge: %v", err)
		}

		// If there's a charge, transfer coins from user to storage charge account
		if !charge.IsZero() {
			userAddr, err := sdk.AccAddressFromBech32(repository.Owner.Id)
			if err != nil {
				return nil, fmt.Errorf("invalid user address: %v", err)
			}

			if err := k.bankKeeper.SendCoinsFromAccountToModule(ctx, userAddr, types.StorageFeePoolName, sdk.NewCoins(charge)); err != nil {
				return nil, fmt.Errorf("failed to transfer storage charge: %v", err)
			}
		}
	}

	// Second pass: perform all updates atomically
	for _, assetUpdate := range msg.Assets {
		existingAsset, found := k.GetReleaseAsset(ctx, msg.RepositoryId, msg.Tag, assetUpdate.Name)
		if assetUpdate.Delete {
			if found {
				// Decrease cid reference count for the asset being deleted
				if existingAsset.Cid != "" {
					k.DecreaseCidReferenceCount(ctx, existingAsset.Cid)
					if count, found := k.GetCidReferenceCount(ctx, existingAsset.Cid); found && count.Count == 0 {
						k.RemoveCidReferenceCount(ctx, existingAsset.Cid)
					}
				}

				// Remove asset (storage stats and quota will be updated by total diff logic below)
				k.RemoveReleaseAsset(ctx, msg.RepositoryId, msg.Tag, assetUpdate.Name)
			}
			continue
		}

		if found {
			// Decrement old CID reference count
			if existingAsset.Cid != "" {
				k.DecreaseCidReferenceCount(ctx, existingAsset.Cid)
				if count, found := k.GetCidReferenceCount(ctx, existingAsset.Cid); found && count.Count == 0 {
					k.RemoveCidReferenceCount(ctx, existingAsset.Cid)
				}
			}

			// Update existing asset
			existingAsset.Creator = msg.Creator
			existingAsset.Cid = assetUpdate.Cid
			existingAsset.RootHash = assetUpdate.RootHash
			existingAsset.Size_ = assetUpdate.Size_
			existingAsset.Sha256 = assetUpdate.Sha256
			existingAsset.UpdatedAt = ctx.BlockTime()

			k.SetReleaseAsset(ctx, existingAsset)
		} else {
			// Create new asset
			asset := types.ReleaseAsset{
				Creator:      msg.Creator,
				RepositoryId: msg.RepositoryId,
				Tag:          msg.Tag,
				Name:         assetUpdate.Name,
				Cid:          assetUpdate.Cid,
				RootHash:     assetUpdate.RootHash,
				Size_:        assetUpdate.Size_,
				Sha256:       assetUpdate.Sha256,
				CreatedAt:    ctx.BlockTime(),
				UpdatedAt:    ctx.BlockTime(),
			}

			k.AppendReleaseAsset(ctx, asset)
		}

		// Increase new CID reference count
		k.IncreaseCidReferenceCount(ctx, assetUpdate.Cid)
	}

	// Update user quota and storage stats
	if totalSizeDiff >= 0 {
		userQuota.StorageUsed += uint64(totalSizeDiff)
	} else {
		if uint64(-totalSizeDiff) > userQuota.StorageUsed {
			userQuota.StorageUsed = 0
		} else {
			userQuota.StorageUsed -= uint64(-totalSizeDiff)
		}
	}
	k.gitopiaKeeper.SetUserQuota(ctx, userQuota)

	storageStats := k.GetStorageStats(ctx)
	if totalSizeDiff >= 0 {
		storageStats.TotalReleaseAssetSize += uint64(totalSizeDiff)
	} else {
		if uint64(-totalSizeDiff) > storageStats.TotalReleaseAssetSize {
			storageStats.TotalReleaseAssetSize = 0
		} else {
			storageStats.TotalReleaseAssetSize -= uint64(-totalSizeDiff)
		}
	}
	k.SetStorageStats(ctx, storageStats)

	ctx.EventManager().EmitTypedEvent(&types.EventReleaseAssetsUpdated{
		RepositoryId: msg.RepositoryId,
		Tag:          msg.Tag,
		Assets:       msg.Assets,
	})

	return &types.MsgUpdateReleaseAssetsResponse{}, nil
}

func (k msgServer) SubmitChallengeResponse(goCtx context.Context, msg *types.MsgSubmitChallengeResponse) (*types.MsgSubmitChallengeResponseResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Get the challenge
	challenge, found := k.GetChallenge(ctx, msg.ChallengeId)
	if !found {
		return nil, fmt.Errorf("challenge not found")
	}

	provider, found := k.GetProvider(ctx, msg.Creator)
	if !found {
		return nil, fmt.Errorf("provider not found")
	}

	ctx.Logger().Info(fmt.Sprintf("provider %s submitted challenge response for challenge %d", msg.Creator, msg.ChallengeId))

	// Verify the provider is active
	if provider.Jailed || provider.Status != types.Bonded {
		return nil, fmt.Errorf("unauthorized: only active provider can submit response")
	}

	// Check challenge hasn't expired
	if ctx.BlockTime().After(challenge.Deadline) {
		return nil, fmt.Errorf("challenge deadline exceeded")
	}

	// Check challenge is still pending in case of assigned provider
	if provider.Creator == challenge.Provider && challenge.Status != types.ChallengeStatus_CHALLENGE_STATUS_PENDING {
		return nil, fmt.Errorf("challenge already completed")
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
		// Process challenge response for liveness tracking (invalid proof)
		err := k.ProcessChallengeResponseForLiveness(ctx, &challenge, provider.Creator, false)
		if err != nil {
			ctx.Logger().Error(fmt.Sprintf("failed to process liveness for invalid proof from %s: %v", provider.Creator, err))
		}

		// Update challenge status
		challenge.Status = types.ChallengeStatus_CHALLENGE_STATUS_FAILED
		k.SetChallenge(ctx, challenge)

		return nil, fmt.Errorf("invalid proof")
	}

	// Process challenge response for liveness tracking (valid proof)
	err = k.ProcessChallengeResponseForLiveness(ctx, &challenge, provider.Creator, true)
	if err != nil {
		ctx.Logger().Error(fmt.Sprintf("failed to process liveness for valid proof from %s: %v", provider.Creator, err))
	}

	// Reward only the assigned provider
	if provider.Creator == challenge.Provider {
		// Update challenge status
		challenge.Status = types.ChallengeStatus_CHALLENGE_STATUS_COMPLETED
		k.SetChallenge(ctx, challenge)

		activeProviders := k.GetActiveProviders(ctx)

		// Consider only providers that have been active for at least 24 hours
		minJoinTime := ctx.BlockTime().Add(-24 * time.Second)
		activeProviders = filterProvidersByJoinTime(activeProviders, minJoinTime)

		// Update provider rewards
		providerAcc, _ := sdk.AccAddressFromBech32(msg.Creator)
		currentRewards := k.GetProviderRewards(ctx, providerAcc)
		challengeReward := CalculateChallengeReward(params, int64(len(activeProviders)))
		currentRewards.Rewards = currentRewards.Rewards.Add(challengeReward)
		k.SetProviderRewards(ctx, providerAcc, currentRewards)

		ctx.Logger().Info(fmt.Sprintf("provider %s rewarded for challenge %d", provider.Creator, challenge.Id))
	}

	return &types.MsgSubmitChallengeResponseResponse{}, nil
}

func (k msgServer) WithdrawProviderRewards(goCtx context.Context, msg *types.MsgWithdrawProviderRewards) (*types.MsgWithdrawProviderRewardsResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetProvider(ctx, msg.Creator)
	if !found {
		return nil, fmt.Errorf("provider not found")
	}

	providerAcc, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil, err
	}
	amount, err := k.Keeper.WithdrawProviderRewards(ctx, providerAcc)
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
	provider.Status = types.Unbonding
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

	// Transfer stake back to provider
	providerAcc, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil, fmt.Errorf("invalid creator address: %v", err)
	}

	stake := k.GetProviderStake(ctx, providerAcc)

	if err := k.bankKeeper.SendCoinsFromModuleToAccount(
		ctx,
		types.StorageBondedPoolName,
		providerAcc,
		sdk.NewCoins(stake.Stake...),
	); err != nil {
		return nil, fmt.Errorf("failed to transfer stake: %v", err)
	}

	// Auto-withdraw any remaining rewards before removing provider to prevent loss
	remainingRewards, err := k.Keeper.WithdrawProviderRewards(ctx, providerAcc)
	if err != nil && err != types.ErrNoProviderRewards {
		return nil, fmt.Errorf("failed to withdraw remaining rewards: %v", err)
	}

	// Log if rewards were auto-withdrawn
	if !remainingRewards.IsZero() {
		ctx.Logger().Info(fmt.Sprintf("auto-withdrew remaining rewards %s for provider %s during unstake completion",
			remainingRewards, provider.Creator))
	}

	// Remove provider from store (completely remove inactive providers)
	k.RemoveProvider(ctx, provider.Creator)

	// Emit event
	ctx.EventManager().EmitTypedEvent(&types.EventProviderUnstakeCompleted{
		Address: provider.Creator,
		Amount:  stake.Stake,
	})

	return &types.MsgCompleteUnstakeResponse{
		Amount: stake.Stake,
	}, nil
}

func (k msgServer) UpdateParams(goCtx context.Context, msg *types.MsgUpdateParams) (*types.MsgUpdateParamsResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if k.authority != msg.Authority {
		return nil, fmt.Errorf("invalid authority; expected %s, got %s", k.authority, msg.Authority)
	}

	if err := k.SetParams(ctx, msg.Params); err != nil {
		return nil, err
	}

	return &types.MsgUpdateParamsResponse{}, nil
}

func (k msgServer) ClawbackProviderStake(goCtx context.Context, msg *types.MsgClawbackProviderStake) (*types.MsgClawbackProviderStakeResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Check authority
	if k.authority != msg.Authority {
		return nil, fmt.Errorf("invalid authority; expected %s, got %s", k.authority, msg.Authority)
	}

	// Get the provider
	provider, found := k.GetProvider(ctx, msg.Provider)
	if !found {
		return nil, fmt.Errorf("provider not found")
	}

	// Get provider's stake
	providerAcc, err := sdk.AccAddressFromBech32(msg.Provider)
	if err != nil {
		return nil, fmt.Errorf("invalid provider address: %v", err)
	}
	providerStake := k.GetProviderStake(ctx, providerAcc)

	// Validate clawback amount
	if msg.Amount.Amount.GT(providerStake.Stake.AmountOf(msg.Amount.Denom)) {
		return nil, fmt.Errorf("clawback amount %s exceeds provider's stake %s", msg.Amount, providerStake.Stake)
	}

	// Transfer funds from bonded pool to slash pool
	err = k.bankKeeper.SendCoinsFromModuleToModule(ctx, types.StorageBondedPoolName, types.ChallengeSlashPoolName, sdk.NewCoins(msg.Amount))
	if err != nil {
		return nil, err
	}

	// Update provider's stake in the state
	providerStake.Stake = providerStake.Stake.Sub(msg.Amount)
	k.SetProviderStake(ctx, providerAcc, providerStake)

	// Check if stake has fallen below minimum and jail provider if necessary
	params := k.GetParams(ctx)
	if providerStake.Stake.AmountOf(appparams.BaseCoinUnit).Uint64() < params.MinStakeAmount {
		if provider.Status == types.Bonded && !provider.Jailed {
			provider.Jailed = true
			k.SetProvider(ctx, provider)
			ctx.Logger().Info(fmt.Sprintf("provider %s jailed due to stake falling below minimum after clawback", provider.Creator))

			ctx.EventManager().EmitTypedEvent(&types.EventProviderStatusUpdated{
				Address: provider.Creator,
				Online:  false,
			})
		}
	}

	ctx.Logger().Info(fmt.Sprintf("governance clawed back %s from provider %s. New stake: %s", msg.Amount.String(), msg.Provider, providerStake.Stake.String()))

	return &types.MsgClawbackProviderStakeResponse{}, nil
}

func CalculateChallengeReward(params types.Params, numProviders int64) sdk.DecCoin {
	blocksPerDay := int64(53000) // Average block time 1.63s
	dec := sdk.NewDec(params.RewardPerDay.Amount.Int64()).Mul(sdk.NewDec(numProviders))
	reward := dec.Mul(sdk.NewDec(int64(params.ChallengeIntervalBlocks)).Quo(sdk.NewDec(blocksPerDay)))

	return sdk.NewDecCoinFromDec(params.RewardPerDay.Denom, reward)
}

// MsgUpdateLFSObject updates or creates an LFS object
func (k msgServer) UpdateLFSObject(goCtx context.Context, msg *types.MsgUpdateLFSObject) (*types.MsgUpdateLFSObjectResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Check if lfs object exists already
	_, found := k.GetLFSObject(ctx, msg.RepositoryId, msg.Oid)
	if found {
		return nil, fmt.Errorf("LFS object already exists")
	}

	// Check if provider is active
	provider, found := k.GetProvider(ctx, msg.Creator)
	if !found || provider.Jailed || provider.Status != types.Bonded {
		return nil, fmt.Errorf("provider is not active")
	}

	repo, found := k.gitopiaKeeper.GetRepositoryById(ctx, msg.RepositoryId)
	if !found {
		return nil, fmt.Errorf("repository not found")
	}

	userQuota, found := k.gitopiaKeeper.GetUserQuota(ctx, repo.Owner.Id)
	if !found {
		// Create new user quota
		userQuota = gitopiatypes.UserQuota{
			Address:     repo.Owner.Id,
			StorageUsed: 0,
		}
	}

	// Calculate storage charge for new LFS object
	if !k.GetParams(ctx).StoragePricePerGb.IsZero() && repo.UpdatedAt > UpgradeTime.Unix() {
		charge, err := k.calculateStorageCharge(ctx, userQuota.StorageUsed, userQuota.StorageUsed+msg.Size_)
		if err != nil {
			return nil, fmt.Errorf("failed to calculate storage charge: %v", err)
		}

		// If there's a charge, transfer coins from user to storage charge account
		if !charge.IsZero() {
			userAddr, err := sdk.AccAddressFromBech32(repo.Owner.Id)
			if err != nil {
				return nil, fmt.Errorf("invalid user address: %v", err)
			}

			if err := k.bankKeeper.SendCoinsFromAccountToModule(ctx, userAddr, types.StorageFeePoolName, sdk.NewCoins(charge)); err != nil {
				return nil, fmt.Errorf("failed to transfer storage charge: %v", err)
			}
		}
	}

	// Update LFS object
	lfsObj := types.LFSObject{
		Creator:      msg.Creator,
		RepositoryId: msg.RepositoryId,
		Oid:          msg.Oid,
		Size_:        msg.Size_,
		Cid:          msg.Cid,
		RootHash:     msg.RootHash,
		CreatedAt:    ctx.BlockTime(),
		UpdatedAt:    ctx.BlockTime(),
	}

	userQuota.StorageUsed += uint64(lfsObj.Size_)
	k.gitopiaKeeper.SetUserQuota(ctx, userQuota)

	k.AppendLFSObject(ctx, lfsObj)

	// Increase cid reference count
	k.IncreaseCidReferenceCount(ctx, lfsObj.Cid)

	storageStats := k.GetStorageStats(ctx)
	storageStats.TotalLfsObjectSize += uint64(lfsObj.Size_)
	k.SetStorageStats(ctx, storageStats)

	ctx.EventManager().EmitTypedEvent(
		&types.EventLFSObjectUpdated{
			RepositoryId: msg.RepositoryId,
			Oid:          msg.Oid,
			Cid:          msg.Cid,
		},
	)

	return &types.MsgUpdateLFSObjectResponse{}, nil
}

func (k msgServer) ProposeRepositoryPackfileUpdate(goCtx context.Context, msg *types.MsgProposeRepositoryPackfileUpdate) (*types.MsgProposeRepositoryPackfileUpdateResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Check if provider is active
	provider, found := k.GetProvider(ctx, msg.Creator)
	if !found || provider.Status != types.Bonded {
		return nil, fmt.Errorf("provider is not active")
	}

	// Get repository to verify it exists and get owner
	_, found = k.gitopiaKeeper.GetRepositoryById(ctx, msg.RepositoryId)
	if !found {
		return nil, fmt.Errorf("repository not found")
	}

	// Check if there's already a pending proposal for this repository
	pendingProposals := k.GetPendingProposalsForRepository(ctx, msg.RepositoryId)
	if len(pendingProposals) > 0 {
		return nil, fmt.Errorf("there is already a pending proposal for this repository")
	}

	// Verify old_cid matches current repository state if specified
	if msg.OldCid != "" {
		existingPackfile, found := k.GetPackfile(ctx, msg.RepositoryId)
		if found && existingPackfile.Cid != msg.OldCid {
			return nil, fmt.Errorf("repository state has changed: expected CID %s, found %s", msg.OldCid, existingPackfile.Cid)
		}
	}

	// For delete proposals, ensure the packfile exists
	if msg.Delete {
		if _, found := k.GetPackfile(ctx, msg.RepositoryId); !found {
			return nil, fmt.Errorf("packfile not found for delete proposal")
		}
	}

	// Create the proposal
	proposalId := k.CreatePackfileUpdateProposal(
		ctx,
		msg.Creator,
		msg.RepositoryId,
		msg.User,
		msg.Name,
		msg.Cid,
		msg.RootHash,
		msg.Size_,
		msg.OldCid,
		msg.MergeCommitSha,
		msg.Delete,
	)

	return &types.MsgProposeRepositoryPackfileUpdateResponse{
		ProposalId: proposalId,
	}, nil
}

func (k msgServer) ApproveRepositoryPackfileUpdate(goCtx context.Context, msg *types.MsgApproveRepositoryPackfileUpdate) (*types.MsgApproveRepositoryPackfileUpdateResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Get the proposal
	proposal, found := k.GetProposedPackfileUpdate(ctx, msg.ProposalId)
	if !found {
		return nil, fmt.Errorf("proposal not found")
	}

	// Verify proposal is still pending
	if proposal.Status != types.ProposalStatus_PROPOSAL_STATUS_PENDING {
		return nil, fmt.Errorf("proposal is not pending (status: %s)", proposal.Status.String())
	}

	// Check if proposal has expired
	if ctx.BlockTime().After(proposal.ExpiresAt) {
		k.RemoveProposedPackfileUpdate(ctx, proposal.Id)
		return nil, fmt.Errorf("proposal has expired")
	}

	// Verify that the approver is the user who initiated the proposal
	if proposal.User != msg.Creator {
		return nil, fmt.Errorf("only the user who initiated the proposal can approve it")
	}

	// Verify provider is still active
	provider, found := k.GetProvider(ctx, proposal.Provider)
	if !found || provider.Status != types.Bonded {
		k.RemoveProposedPackfileUpdate(ctx, proposal.Id)
		return nil, fmt.Errorf("provider is no longer active")
	}

	// Re-verify repository state hasn't changed since proposal was made
	if proposal.OldCid != "" {
		existingPackfile, found := k.GetPackfile(ctx, proposal.RepositoryId)
		if found && existingPackfile.Cid != proposal.OldCid {
			k.RemoveProposedPackfileUpdate(ctx, proposal.Id)
			return nil, fmt.Errorf("repository state has changed since proposal was made")
		}
	}

	// Execute the packfile update logic directly
	repository, found := k.gitopiaKeeper.GetRepositoryById(ctx, proposal.RepositoryId)
	if !found {
		k.RemoveProposedPackfileUpdate(ctx, proposal.Id)
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

	// If this is a delete proposal, perform deletion
	if proposal.Delete {
		// Get existing packfile
		packfile, found := k.GetPackfile(ctx, proposal.RepositoryId)
		if !found {
			k.RemoveProposedPackfileUpdate(ctx, proposal.Id)
			return nil, fmt.Errorf("packfile not found")
		}

		// Decrement or remove old cid reference count
		if packfile.Cid != "" {
			k.DecreaseCidReferenceCount(ctx, packfile.Cid)
			if count, found := k.GetCidReferenceCount(ctx, packfile.Cid); found && count.Count == 0 {
				ctx.EventManager().EmitTypedEvent(&types.EventDeleteStorageObject{
					RepositoryId: proposal.RepositoryId,
					Cids:         []string{packfile.Cid},
					Provider:     proposal.Provider,
				})

				k.RemoveCidReferenceCount(ctx, packfile.Cid)
			}
		}

		// Update quota and stats
		userQuota, found := k.gitopiaKeeper.GetUserQuota(ctx, repository.Owner.Id)
		if !found {
			userQuota = gitopiatypes.UserQuota{
				Address:     repository.Owner.Id,
				StorageUsed: 0,
			}
		}
		if userQuota.StorageUsed >= uint64(packfile.Size_) {
			userQuota.StorageUsed -= uint64(packfile.Size_)
		} else {
			userQuota.StorageUsed = 0
		}
		k.gitopiaKeeper.SetUserQuota(ctx, userQuota)

		storageStats := k.GetStorageStats(ctx)
		if storageStats.TotalPackfileSize >= uint64(packfile.Size_) {
			storageStats.TotalPackfileSize -= uint64(packfile.Size_)
		} else {
			storageStats.TotalPackfileSize = 0
		}
		k.SetStorageStats(ctx, storageStats)

		// Remove packfile
		k.RemovePackfile(ctx, proposal.RepositoryId)

		// Remove proposal
		k.RemoveProposedPackfileUpdate(ctx, proposal.Id)

		return &types.MsgApproveRepositoryPackfileUpdateResponse{}, nil
	}

	// Check if packfile already exists for this repository
	var oldCid, oldName string
	existingPackfile, found := k.GetPackfile(ctx, proposal.RepositoryId)
	if found {
		oldCid = existingPackfile.Cid
		oldName = existingPackfile.Name

		// Calculate the difference in size between the existing and new packfile
		existingSize := existingPackfile.Size_
		newSize := proposal.Size_
		var diff int64
		if newSize >= existingSize {
			diff = int64(newSize - existingSize)
		} else {
			diff = -(int64(existingSize - newSize))
		}

		// Calculate storage charge
		if !k.GetParams(ctx).StoragePricePerGb.IsZero() && repository.UpdatedAt > UpgradeTime.Unix() {
			charge, err := k.calculateStorageCharge(ctx, userQuota.StorageUsed, userQuota.StorageUsed+uint64(diff))
			if err != nil {
				k.RemoveProposedPackfileUpdate(ctx, proposal.Id)
				return nil, fmt.Errorf("failed to calculate storage charge: %v", err)
			}

			// If there's a charge, transfer coins from user to storage charge account
			if !charge.IsZero() {
				userAddr, err := sdk.AccAddressFromBech32(repository.Owner.Id)
				if err != nil {
					k.RemoveProposedPackfileUpdate(ctx, proposal.Id)
					return nil, fmt.Errorf("invalid user address: %v", err)
				}

				if err := k.bankKeeper.SendCoinsFromAccountToModule(ctx, userAddr, types.StorageFeePoolName, sdk.NewCoins(charge)); err != nil {
					k.RemoveProposedPackfileUpdate(ctx, proposal.Id)
					return nil, fmt.Errorf("failed to transfer storage charge: %v", err)
				}
			}
		}

		// Decrement or remove old cid reference count
		if oldCid != "" {
			k.DecreaseCidReferenceCount(ctx, oldCid)
			if count, found := k.GetCidReferenceCount(ctx, oldCid); found && count.Count == 0 {
				ctx.EventManager().EmitTypedEvent(&types.EventDeleteStorageObject{
					RepositoryId: proposal.RepositoryId,
					Cids:         []string{oldCid},
					Provider:     proposal.Provider,
				})

				k.RemoveCidReferenceCount(ctx, oldCid)
			}
		}

		// Update existing packfile while preserving its ID
		existingPackfile.Creator = proposal.Provider
		existingPackfile.Name = proposal.Name
		existingPackfile.OldCid = existingPackfile.Cid
		existingPackfile.Cid = proposal.Cid
		existingPackfile.RootHash = proposal.RootHash
		existingPackfile.Size_ = proposal.Size_
		existingPackfile.UpdatedAt = ctx.BlockTime()

		userQuota.StorageUsed += uint64(int64(userQuota.StorageUsed) + diff)
		k.gitopiaKeeper.SetUserQuota(ctx, userQuota)

		k.SetPackfile(ctx, existingPackfile)

		// Increase new cid reference count
		k.IncreaseCidReferenceCount(ctx, proposal.Cid)

		storageStats := k.GetStorageStats(ctx)
		storageStats.TotalPackfileSize += uint64(diff)
		k.SetStorageStats(ctx, storageStats)
	} else {
		// Calculate storage charge for new packfile
		if !k.GetParams(ctx).StoragePricePerGb.IsZero() && repository.UpdatedAt > UpgradeTime.Unix() {
			charge, err := k.calculateStorageCharge(ctx, userQuota.StorageUsed, userQuota.StorageUsed+proposal.Size_)
			if err != nil {
				k.RemoveProposedPackfileUpdate(ctx, proposal.Id)
				return nil, fmt.Errorf("failed to calculate storage charge: %v", err)
			}

			// If there's a charge, transfer coins from user to storage charge account
			if !charge.IsZero() {
				userAddr, err := sdk.AccAddressFromBech32(repository.Owner.Id)
				if err != nil {
					k.RemoveProposedPackfileUpdate(ctx, proposal.Id)
					return nil, fmt.Errorf("invalid user address: %v", err)
				}

				if err := k.bankKeeper.SendCoinsFromAccountToModule(ctx, userAddr, types.StorageFeePoolName, sdk.NewCoins(charge)); err != nil {
					k.RemoveProposedPackfileUpdate(ctx, proposal.Id)
					return nil, fmt.Errorf("failed to transfer storage charge: %v", err)
				}
			}
		}

		// Create new packfile
		packfile := types.Packfile{
			Creator:      proposal.Provider,
			RepositoryId: proposal.RepositoryId,
			Name:         proposal.Name,
			Cid:          proposal.Cid,
			RootHash:     proposal.RootHash,
			Size_:        proposal.Size_,
			CreatedAt:    ctx.BlockTime(),
			UpdatedAt:    ctx.BlockTime(),
		}

		userQuota.StorageUsed += proposal.Size_
		k.gitopiaKeeper.SetUserQuota(ctx, userQuota)

		k.AppendPackfile(ctx, packfile)

		// Increase new cid reference count
		k.IncreaseCidReferenceCount(ctx, proposal.Cid)

		storageStats := k.GetStorageStats(ctx)
		storageStats.TotalPackfileSize += proposal.Size_
		k.SetStorageStats(ctx, storageStats)
	}

	// Emit event
	ctx.EventManager().EmitTypedEvent(&types.EventPackfileUpdated{
		RepositoryId: proposal.RepositoryId,
		NewCid:       proposal.Cid,
		OldCid:       oldCid,
		NewName:      proposal.Name,
		OldName:      oldName,
		Provider:     proposal.Provider,
		Deleted:      proposal.Delete,
	})

	// Remove proposal
	k.RemoveProposedPackfileUpdate(ctx, proposal.Id)

	return &types.MsgApproveRepositoryPackfileUpdateResponse{}, nil
}

func (k msgServer) RejectRepositoryPackfileUpdate(goCtx context.Context, msg *types.MsgRejectRepositoryPackfileUpdate) (*types.MsgRejectRepositoryPackfileUpdateResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Get the proposal
	proposal, found := k.GetProposedPackfileUpdate(ctx, msg.ProposalId)
	if !found {
		return nil, fmt.Errorf("proposal not found")
	}

	// Verify proposal is still pending
	if proposal.Status != types.ProposalStatus_PROPOSAL_STATUS_PENDING {
		return nil, fmt.Errorf("proposal is not pending (status: %s)", proposal.Status.String())
	}

	// Verify that the rejector is the user who initiated the proposal
	if proposal.User != msg.Creator {
		return nil, fmt.Errorf("only the user who initiated the proposal can reject it")
	}

	k.RemoveProposedPackfileUpdate(ctx, proposal.Id)

	return &types.MsgRejectRepositoryPackfileUpdateResponse{}, nil
}

// Stake Management Handlers

func (k msgServer) IncreaseStake(goCtx context.Context, msg *types.MsgIncreaseStake) (*types.MsgIncreaseStakeResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Get the provider
	provider, found := k.GetProvider(ctx, msg.Creator)
	if !found {
		return nil, fmt.Errorf("provider not found")
	}

	// Check if provider is active or suspended.
	// A suspended provider needs to be able to increase stake to meet the minimum for reactivation.
	if provider.Status != types.Bonded {
		return nil, fmt.Errorf("can only increase stake for active or suspended providers, current status: %s", provider.Status)
	}

	// Transfer additional stake from provider to module account
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil, fmt.Errorf("invalid creator address: %v", err)
	}

	if err := k.bankKeeper.SendCoinsFromAccountToModule(
		ctx,
		creator,
		types.StorageBondedPoolName,
		sdk.NewCoins(msg.Amount),
	); err != nil {
		return nil, fmt.Errorf("failed to transfer stake: %v", err)
	}

	// Update provider stake
	providerStake := k.GetProviderStake(ctx, creator)
	providerStake.Stake = providerStake.Stake.Add(msg.Amount)
	k.SetProviderStake(ctx, creator, providerStake)

	// Emit event
	ctx.EventManager().EmitTypedEvent(&types.EventProviderStatusUpdated{
		Address: provider.Creator,
		Online:  true,
	})

	ctx.Logger().Info(fmt.Sprintf("provider %s increased stake by %s, new total: %s", provider.Creator, msg.Amount.String(), providerStake.Stake.String()))

	return &types.MsgIncreaseStakeResponse{}, nil
}

func (k msgServer) DecreaseStake(goCtx context.Context, msg *types.MsgDecreaseStake) (*types.MsgDecreaseStakeResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Get the provider
	provider, found := k.GetProvider(ctx, msg.Creator)
	if !found {
		return nil, fmt.Errorf("provider not found")
	}

	// Check if provider is active
	if provider.Status != types.Bonded {
		return nil, fmt.Errorf("can only decrease stake for active providers")
	}

	// Check if provider already has a pending decrease (separate from full unregistration)
	if provider.DecreaseCompletionTime != nil {
		return nil, fmt.Errorf("provider already has a pending stake decrease")
	}

	// Check if provider is not in the middle of unregistering
	if provider.UnstakeCompletionTime != nil {
		return nil, fmt.Errorf("cannot decrease stake while unregistering")
	}

	// Check minimum stake requirement
	params := k.GetParams(ctx)

	providerAcc, _ := sdk.AccAddressFromBech32(msg.Creator)
	providerStake := k.GetProviderStake(ctx, providerAcc)

	newStakeAmount := providerStake.Stake.Sub(msg.Amount)
	if newStakeAmount.AmountOf(appparams.BaseCoinUnit).Uint64() < params.MinStakeAmount {
		return nil, fmt.Errorf("resulting stake would be below minimum stake amount")
	}

	// Set cooldown period for stake decrease (separate from unregistration)
	completionTime := ctx.BlockTime().Add(time.Duration(params.UnstakeCooldownBlocks) * time.Second)
	provider.DecreaseCompletionTime = &completionTime
	provider.PendingDecreaseAmount = &msg.Amount

	k.SetProvider(ctx, provider)

	// Emit event
	ctx.EventManager().EmitTypedEvent(&types.EventProviderStatusUpdated{
		Address: provider.Creator,
		Online:  true,
	})

	ctx.Logger().Info(fmt.Sprintf("provider %s initiated stake decrease of %s, completion time: %s", provider.Creator, msg.Amount.String(), completionTime.String()))

	return &types.MsgDecreaseStakeResponse{
		CompletionTime: completionTime,
	}, nil
}

func (k msgServer) UnjailProvider(goCtx context.Context, msg *types.MsgUnjailProvider) (*types.MsgUnjailProviderResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Get the provider
	provider, found := k.GetProvider(ctx, msg.Creator)
	if !found {
		return nil, fmt.Errorf("provider not found")
	}

	// Check if provider is actually jailed
	if !provider.Jailed {
		return nil, fmt.Errorf("provider is not jailed")
	}

	// Check if jail time has expired
	if provider.JailUntil != nil && ctx.BlockTime().Before(*provider.JailUntil) {
		return nil, fmt.Errorf("jail time has not expired, jailed until: %s", provider.JailUntil.String())
	}

	// Check minimum stake requirement
	params := k.GetParams(ctx)
	providerAcc, _ := sdk.AccAddressFromBech32(msg.Creator)
	providerStake := k.GetProviderStake(ctx, providerAcc)
	if providerStake.Stake.AmountOf(appparams.BaseCoinUnit).Uint64() < params.MinStakeAmount {
		return nil, fmt.Errorf("minimum stake requirement not met")
	}

	// Check if active provider count has reached the maximum limit
	activeProviders := k.GetActiveProviders(ctx)
	if len(activeProviders) >= int(k.GetParams(ctx).MaxProviders) {
		return nil, fmt.Errorf("active provider count has reached the maximum limit")
	}

	// Unjail the provider
	provider.Jailed = false
	provider.JailUntil = nil
	k.SetProvider(ctx, provider)

	ctx.Logger().Info(fmt.Sprintf("provider %s has been unjailed", provider.Creator))

	// Emit unjail event
	ctx.EventManager().EmitTypedEvent(&types.EventProviderStatusUpdated{
		Address: provider.Creator,
		Online:  true,
	})

	return &types.MsgUnjailProviderResponse{}, nil
}

func (k msgServer) CompleteDecreaseStake(goCtx context.Context, msg *types.MsgCompleteDecreaseStake) (*types.MsgCompleteDecreaseStakeResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Get the provider
	provider, found := k.GetProvider(ctx, msg.Creator)
	if !found {
		return nil, fmt.Errorf("provider not found")
	}

	// Check if provider has a pending decrease
	if provider.DecreaseCompletionTime == nil {
		return nil, fmt.Errorf("provider has no pending stake decrease")
	}

	// Check if cooldown period has passed
	if ctx.BlockTime().Before(*provider.DecreaseCompletionTime) {
		return nil, fmt.Errorf("decrease cooldown period has not passed yet")
	}

	// Check if pending decrease amount exists
	if provider.PendingDecreaseAmount == nil {
		return nil, fmt.Errorf("no pending decrease amount found")
	}

	// Transfer decreased stake back to provider
	providerAcc, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil, fmt.Errorf("invalid creator address: %v", err)
	}

	if err := k.bankKeeper.SendCoinsFromModuleToAccount(
		ctx,
		types.StorageBondedPoolName,
		providerAcc,
		sdk.NewCoins(*provider.PendingDecreaseAmount),
	); err != nil {
		return nil, fmt.Errorf("failed to transfer decreased stake: %v", err)
	}

	// Update provider stake and clear pending decrease
	providerStake := k.GetProviderStake(ctx, providerAcc)
	providerStake.Stake = providerStake.Stake.Sub(*provider.PendingDecreaseAmount)
	k.SetProviderStake(ctx, providerAcc, providerStake)

	decreaseAmount := *provider.PendingDecreaseAmount
	provider.PendingDecreaseAmount = nil
	provider.DecreaseCompletionTime = nil

	k.SetProvider(ctx, provider)

	// Emit event
	ctx.EventManager().EmitTypedEvent(&types.EventProviderStatusUpdated{
		Address: provider.Creator,
		Online:  true,
	})

	ctx.Logger().Info(fmt.Sprintf("provider %s completed stake decrease of %s, new stake: %s", provider.Creator, decreaseAmount.String(), providerStake.Stake.String()))

	return &types.MsgCompleteDecreaseStakeResponse{
		Amount: decreaseAmount,
	}, nil
}

func (k msgServer) ProposeReleaseAssetsUpdate(goCtx context.Context, msg *types.MsgProposeReleaseAssetsUpdate) (*types.MsgProposeReleaseAssetsUpdateResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Check if provider is active
	provider, found := k.GetProvider(ctx, msg.Creator)
	if !found || provider.Status != types.Bonded {
		return nil, fmt.Errorf("provider is not active")
	}

	// Get repository to verify it exists and get owner
	_, found = k.gitopiaKeeper.GetRepositoryById(ctx, msg.RepositoryId)
	if !found {
		return nil, fmt.Errorf("repository not found")
	}

	// Check if there's already a pending proposal for this release
	pendingProposals := k.GetPendingReleaseAssetsProposalsForRepository(ctx, msg.RepositoryId)
	for _, proposal := range pendingProposals {
		if proposal.Tag == msg.Tag {
			return nil, fmt.Errorf("there is already a pending proposal for this release")
		}
	}

	// Create the proposal
	proposalId := k.CreateReleaseAssetsUpdateProposal(
		ctx,
		msg.Creator,
		msg.RepositoryId,
		msg.User,
		msg.Tag,
		msg.Assets,
	)

	return &types.MsgProposeReleaseAssetsUpdateResponse{
		ProposalId: proposalId,
	}, nil
}

func (k msgServer) ApproveReleaseAssetsUpdate(goCtx context.Context, msg *types.MsgApproveReleaseAssetsUpdate) (*types.MsgApproveReleaseAssetsUpdateResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Get the proposal
	proposal, found := k.GetProposedReleaseAssetsUpdate(ctx, msg.ProposalId)
	if !found {
		return nil, fmt.Errorf("proposal not found")
	}

	// Verify proposal is still pending
	if proposal.Status != types.ProposalStatus_PROPOSAL_STATUS_PENDING {
		return nil, fmt.Errorf("proposal is not pending (status: %s)", proposal.Status.String())
	}

	// Check if proposal has expired
	if ctx.BlockTime().After(proposal.ExpiresAt) {
		k.RemoveProposedReleaseAssetsUpdate(ctx, proposal.Id)
		return nil, fmt.Errorf("proposal has expired")
	}

	// Get repository information
	repository, found := k.gitopiaKeeper.GetRepositoryById(ctx, proposal.RepositoryId)
	if !found {
		return nil, fmt.Errorf("repository not found")
	}

	// Verify that the approver has permission to perform this operation
	if !k.gitopiaKeeper.HavePermission(ctx, msg.Creator, repository, gitopiatypes.PushBranchPermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	// Verify provider is still active
	provider, found := k.GetProvider(ctx, proposal.Provider)
	if !found || provider.Status != types.Bonded {
		k.RemoveProposedReleaseAssetsUpdate(ctx, proposal.Id)
		return nil, fmt.Errorf("provider is no longer active")
	}

	var userQuota gitopiatypes.UserQuota

	// Check if provider is active
	provider, found = k.GetProvider(ctx, proposal.Provider)
	if !found || provider.Jailed || provider.Status != types.Bonded {
		k.RemoveProposedReleaseAssetsUpdate(ctx, proposal.Id)
		return nil, fmt.Errorf("provider is not active")
	}

	repository, found = k.gitopiaKeeper.GetRepositoryById(ctx, proposal.RepositoryId)
	if !found {
		k.RemoveProposedReleaseAssetsUpdate(ctx, proposal.Id)
		return nil, fmt.Errorf("repository not found")
	}

	userQuota, found = k.gitopiaKeeper.GetUserQuota(ctx, repository.Owner.Id)
	if !found {
		// Create new user quota
		userQuota = gitopiatypes.UserQuota{
			Address:     repository.Owner.Id,
			StorageUsed: 0,
		}
	}

	// Track changes for storage calculation and events
	var totalSizeDiff int64

	// First pass: validate all assets and check optimistic concurrency control
	for i, assetUpdate := range proposal.Assets {
		existingAsset, found := k.GetReleaseAsset(ctx, proposal.RepositoryId, proposal.Tag, assetUpdate.Name)
		if assetUpdate.Delete {
			if !found {
				k.RemoveProposedReleaseAssetsUpdate(ctx, proposal.Id)
				return nil, fmt.Errorf("asset[%d] (%s) not found for delete", i, assetUpdate.Name)
			}
			if assetUpdate.OldCid != "" && existingAsset.Cid != assetUpdate.OldCid {
				k.RemoveProposedReleaseAssetsUpdate(ctx, proposal.Id)
				return nil, fmt.Errorf("asset[%d] (%s) state has changed: expected CID %s, found %s", i, assetUpdate.Name, assetUpdate.OldCid, existingAsset.Cid)
			}

			totalSizeDiff -= int64(existingAsset.Size_)
			continue
		}
		if found {
			// Optimistic concurrency control: check if the current CID matches the expected old_cid
			if assetUpdate.OldCid != "" && existingAsset.Cid != assetUpdate.OldCid {
				k.RemoveProposedReleaseAssetsUpdate(ctx, proposal.Id)
				return nil, fmt.Errorf("asset[%d] (%s) state has changed: expected CID %s, found %s", i, assetUpdate.Name, assetUpdate.OldCid, existingAsset.Cid)
			}

			// Calculate size difference
			existingSize := existingAsset.Size_
			newSize := assetUpdate.Size_
			if newSize >= existingSize {
				totalSizeDiff += int64(newSize - existingSize)
			} else {
				totalSizeDiff -= int64(existingSize - newSize)
			}
		} else {
			// New asset
			totalSizeDiff += int64(assetUpdate.Size_)
		}
	}

	// Calculate storage charge for the total size difference
	if !k.GetParams(ctx).StoragePricePerGb.IsZero() && repository.UpdatedAt > UpgradeTime.Unix() {
		var newStorageUsed uint64
		if totalSizeDiff >= 0 {
			newStorageUsed = userQuota.StorageUsed + uint64(totalSizeDiff)
		} else {
			if uint64(-totalSizeDiff) > userQuota.StorageUsed {
				newStorageUsed = 0
			} else {
				newStorageUsed = userQuota.StorageUsed - uint64(-totalSizeDiff)
			}
		}

		charge, err := k.calculateStorageCharge(ctx, userQuota.StorageUsed, newStorageUsed)
		if err != nil {
			k.RemoveProposedReleaseAssetsUpdate(ctx, proposal.Id)
			return nil, fmt.Errorf("failed to calculate storage charge: %v", err)
		}

		// If there's a charge, transfer coins from user to storage charge account
		if !charge.IsZero() {
			userAddr, err := sdk.AccAddressFromBech32(repository.Owner.Id)
			if err != nil {
				k.RemoveProposedReleaseAssetsUpdate(ctx, proposal.Id)
				return nil, fmt.Errorf("invalid user address: %v", err)
			}

			if err := k.bankKeeper.SendCoinsFromAccountToModule(ctx, userAddr, types.StorageFeePoolName, sdk.NewCoins(charge)); err != nil {
				k.RemoveProposedReleaseAssetsUpdate(ctx, proposal.Id)
				return nil, fmt.Errorf("failed to transfer storage charge: %v", err)
			}
		}
	}

	// Second pass: perform all updates atomically
	var cids []string
	for _, assetUpdate := range proposal.Assets {
		existingAsset, found := k.GetReleaseAsset(ctx, proposal.RepositoryId, proposal.Tag, assetUpdate.Name)
		if assetUpdate.Delete {
			if found {
				// Decrease cid reference count
				if existingAsset.Cid != "" {
					k.DecreaseCidReferenceCount(ctx, existingAsset.Cid)
					if count, found := k.GetCidReferenceCount(ctx, existingAsset.Cid); found && count.Count == 0 {
						cids = append(cids, existingAsset.Cid)
						k.RemoveCidReferenceCount(ctx, existingAsset.Cid)
					}
				}
				// Remove asset (storage stats and quota will be updated by total diff logic below)
				k.RemoveReleaseAsset(ctx, proposal.RepositoryId, proposal.Tag, assetUpdate.Name)
			}
			continue
		}

		if found {
			// Decrement old CID reference count
			if existingAsset.Cid != "" {
				k.DecreaseCidReferenceCount(ctx, existingAsset.Cid)
				if count, found := k.GetCidReferenceCount(ctx, existingAsset.Cid); found && count.Count == 0 {
					cids = append(cids, existingAsset.Cid)
					k.RemoveCidReferenceCount(ctx, existingAsset.Cid)
				}
			}

			// Update existing asset
			existingAsset.Creator = proposal.Provider
			existingAsset.Cid = assetUpdate.Cid
			existingAsset.RootHash = assetUpdate.RootHash
			existingAsset.Size_ = assetUpdate.Size_
			existingAsset.Sha256 = assetUpdate.Sha256
			existingAsset.UpdatedAt = ctx.BlockTime()

			k.SetReleaseAsset(ctx, existingAsset)
		} else {
			// Create new asset
			asset := types.ReleaseAsset{
				Creator:      proposal.Provider,
				RepositoryId: proposal.RepositoryId,
				Tag:          proposal.Tag,
				Name:         assetUpdate.Name,
				Cid:          assetUpdate.Cid,
				RootHash:     assetUpdate.RootHash,
				Size_:        assetUpdate.Size_,
				Sha256:       assetUpdate.Sha256,
				CreatedAt:    ctx.BlockTime(),
				UpdatedAt:    ctx.BlockTime(),
			}

			k.AppendReleaseAsset(ctx, asset)
		}

		// Increase new CID reference count
		k.IncreaseCidReferenceCount(ctx, assetUpdate.Cid)
	}

	// Update user quota and storage stats
	if totalSizeDiff >= 0 {
		userQuota.StorageUsed += uint64(totalSizeDiff)
	} else {
		if uint64(-totalSizeDiff) > userQuota.StorageUsed {
			userQuota.StorageUsed = 0
		} else {
			userQuota.StorageUsed -= uint64(-totalSizeDiff)
		}
	}
	k.gitopiaKeeper.SetUserQuota(ctx, userQuota)

	storageStats := k.GetStorageStats(ctx)
	if totalSizeDiff >= 0 {
		storageStats.TotalReleaseAssetSize += uint64(totalSizeDiff)
	} else {
		if uint64(-totalSizeDiff) > storageStats.TotalReleaseAssetSize {
			storageStats.TotalReleaseAssetSize = 0
		} else {
			storageStats.TotalReleaseAssetSize -= uint64(-totalSizeDiff)
		}
	}
	k.SetStorageStats(ctx, storageStats)

	// Remove proposal
	k.RemoveProposedReleaseAssetsUpdate(ctx, proposal.Id)

	ctx.EventManager().EmitTypedEvent(&types.EventReleaseAssetsUpdated{
		RepositoryId: proposal.RepositoryId,
		Tag:          proposal.Tag,
		Assets:       proposal.Assets,
		Provider:     proposal.Provider,
	})

	if len(cids) > 0 {
		ctx.EventManager().EmitTypedEvent(&types.EventDeleteStorageObject{
			Cids:         cids,
			RepositoryId: proposal.RepositoryId,
			Provider:     proposal.Provider,
		})
	}

	return &types.MsgApproveReleaseAssetsUpdateResponse{}, nil
}

func (k msgServer) RejectReleaseAssetsUpdate(goCtx context.Context, msg *types.MsgRejectReleaseAssetsUpdate) (*types.MsgRejectReleaseAssetsUpdateResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Get the proposal
	proposal, found := k.GetProposedReleaseAssetsUpdate(ctx, msg.ProposalId)
	if !found {
		return nil, fmt.Errorf("proposal not found")
	}

	// Verify proposal is still pending
	if proposal.Status != types.ProposalStatus_PROPOSAL_STATUS_PENDING {
		return nil, fmt.Errorf("proposal is not pending (status: %s)", proposal.Status.String())
	}

	// Verify that the rejector is the user who initiated the proposal
	if proposal.User != msg.Creator {
		return nil, fmt.Errorf("only repository owner can reject this proposal")
	}

	k.RemoveProposedReleaseAssetsUpdate(ctx, proposal.Id)

	return &types.MsgRejectReleaseAssetsUpdateResponse{}, nil
}

// LFS Object Proposal Handlers

func (k msgServer) ProposeLFSObjectUpdate(goCtx context.Context, msg *types.MsgProposeLFSObjectUpdate) (*types.MsgProposeLFSObjectUpdateResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Check if provider is active
	provider, found := k.GetProvider(ctx, msg.Creator)
	if !found || provider.Status != types.Bonded {
		return nil, fmt.Errorf("provider is not active")
	}

	// Get repository information
	_, found = k.gitopiaKeeper.GetRepositoryById(ctx, msg.RepositoryId)
	if !found {
		return nil, fmt.Errorf("repository not found")
	}

	// Check if LFS object exists for create vs delete
	_, found = k.GetLFSObject(ctx, msg.RepositoryId, msg.Oid)
	if msg.Delete {
		if !found {
			return nil, fmt.Errorf("LFS object not found for delete proposal")
		}
	} else {
		if found {
			return nil, fmt.Errorf("LFS object already exists")
		}
	}

	proposalId := k.CreateLFSObjectUpdateProposal(
		ctx,
		msg.Creator,
		msg.RepositoryId,
		msg.User,
		msg.Oid,
		msg.Size_,
		msg.Cid,
		msg.RootHash,
		msg.Delete,
	)

	return &types.MsgProposeLFSObjectUpdateResponse{
		ProposalId: proposalId,
	}, nil
}

func (k msgServer) ApproveLFSObjectUpdate(goCtx context.Context, msg *types.MsgApproveLFSObjectUpdate) (*types.MsgApproveLFSObjectUpdateResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Get the proposal
	proposal, found := k.GetProposedLFSObjectUpdate(ctx, msg.ProposalId)
	if !found {
		return nil, fmt.Errorf("proposal not found")
	}

	// Verify proposal is still pending
	if proposal.Status != types.ProposalStatus_PROPOSAL_STATUS_PENDING {
		return nil, fmt.Errorf("proposal is not pending (status: %s)", proposal.Status.String())
	}

	// Get repository information
	repository, found := k.gitopiaKeeper.GetRepositoryById(ctx, proposal.RepositoryId)
	if !found {
		return nil, fmt.Errorf("repository not found")
	}

	// Verify that the approver has permission to perform this operation
	if !k.gitopiaKeeper.HavePermission(ctx, msg.Creator, repository, gitopiatypes.PushBranchPermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	// Check if proposal has expired
	if ctx.BlockTime().After(proposal.ExpiresAt) {
		k.RemoveProposedLFSObjectUpdate(ctx, proposal.Id)
		return nil, fmt.Errorf("proposal has expired")
	}

	// If delete proposal, perform deletion
	if proposal.Delete {
		// Get the LFS object
		lfsObj, found := k.GetLFSObject(ctx, proposal.RepositoryId, proposal.Oid)
		if !found {
			return nil, fmt.Errorf("LFS object not found")
		}

		// Decrease cid reference count
		k.DecreaseCidReferenceCount(ctx, lfsObj.Cid)
		if count, found := k.GetCidReferenceCount(ctx, lfsObj.Cid); found && count.Count == 0 {
			ctx.EventManager().EmitTypedEvent(&types.EventDeleteStorageObject{
				RepositoryId: proposal.RepositoryId,
				Cids:         []string{lfsObj.Cid},
				Provider:     proposal.Provider,
			})

			k.RemoveCidReferenceCount(ctx, lfsObj.Cid)
		}

		// Update stats and quota
		storageStats := k.GetStorageStats(ctx)
		if storageStats.TotalLfsObjectSize >= uint64(lfsObj.Size_) {
			storageStats.TotalLfsObjectSize -= uint64(lfsObj.Size_)
		} else {
			storageStats.TotalLfsObjectSize = 0
		}
		k.SetStorageStats(ctx, storageStats)

		userQuota, found := k.gitopiaKeeper.GetUserQuota(ctx, repository.Owner.Id)
		if !found {
			userQuota = gitopiatypes.UserQuota{
				Address:     repository.Owner.Id,
				StorageUsed: 0,
			}
		}
		if userQuota.StorageUsed >= uint64(lfsObj.Size_) {
			userQuota.StorageUsed -= uint64(lfsObj.Size_)
		} else {
			userQuota.StorageUsed = 0
		}
		k.gitopiaKeeper.SetUserQuota(ctx, userQuota)

		// Remove LFS object
		k.RemoveLFSObject(ctx, proposal.RepositoryId, proposal.Oid)

		// Remove proposal
		k.RemoveProposedLFSObjectUpdate(ctx, proposal.Id)
		return &types.MsgApproveLFSObjectUpdateResponse{}, nil
	}

	// Check if lfs object exists already
	_, found = k.GetLFSObject(ctx, proposal.RepositoryId, proposal.Oid)
	if found {
		return nil, fmt.Errorf("LFS object already exists")
	}

	// Check if provider is active
	provider, found := k.GetProvider(ctx, proposal.Provider)
	if !found || provider.Status != types.Bonded {
		return nil, fmt.Errorf("provider is not active")
	}

	repo, found := k.gitopiaKeeper.GetRepositoryById(ctx, proposal.RepositoryId)
	if !found {
		return nil, fmt.Errorf("repository not found")
	}

	userQuota, found := k.gitopiaKeeper.GetUserQuota(ctx, repo.Owner.Id)
	if !found {
		// Create new user quota
		userQuota = gitopiatypes.UserQuota{
			Address:     repo.Owner.Id,
			StorageUsed: 0,
		}
	}

	// Calculate storage charge for new LFS object
	if !k.GetParams(ctx).StoragePricePerGb.IsZero() && repo.UpdatedAt > UpgradeTime.Unix() {
		charge, err := k.calculateStorageCharge(ctx, userQuota.StorageUsed, userQuota.StorageUsed+proposal.Size_)
		if err != nil {
			return nil, fmt.Errorf("failed to calculate storage charge: %v", err)
		}

		// If there's a charge, transfer coins from user to storage charge account
		if !charge.IsZero() {
			userAddr, err := sdk.AccAddressFromBech32(repo.Owner.Id)
			if err != nil {
				return nil, fmt.Errorf("invalid user address: %v", err)
			}

			if err := k.bankKeeper.SendCoinsFromAccountToModule(ctx, userAddr, types.StorageFeePoolName, sdk.NewCoins(charge)); err != nil {
				return nil, fmt.Errorf("failed to transfer storage charge: %v", err)
			}
		}
	}

	// Update LFS object
	lfsObj := types.LFSObject{
		Creator:      proposal.Provider,
		RepositoryId: proposal.RepositoryId,
		Oid:          proposal.Oid,
		Size_:        proposal.Size_,
		Cid:          proposal.Cid,
		RootHash:     proposal.RootHash,
		CreatedAt:    ctx.BlockTime(),
		UpdatedAt:    ctx.BlockTime(),
	}

	userQuota.StorageUsed += uint64(lfsObj.Size_)
	k.gitopiaKeeper.SetUserQuota(ctx, userQuota)

	k.AppendLFSObject(ctx, lfsObj)

	// Increase cid reference count
	k.IncreaseCidReferenceCount(ctx, lfsObj.Cid)

	storageStats := k.GetStorageStats(ctx)
	storageStats.TotalLfsObjectSize += uint64(lfsObj.Size_)
	k.SetStorageStats(ctx, storageStats)

	// Remove proposal
	k.RemoveProposedLFSObjectUpdate(ctx, proposal.Id)

	ctx.EventManager().EmitTypedEvent(&types.EventLFSObjectUpdated{
		RepositoryId: proposal.RepositoryId,
		Oid:          proposal.Oid,
		Cid:          proposal.Cid,
		Provider:     proposal.Provider,
		Deleted:      proposal.Delete,
	})

	return &types.MsgApproveLFSObjectUpdateResponse{}, nil
}

func (k msgServer) RejectLFSObjectUpdate(goCtx context.Context, msg *types.MsgRejectLFSObjectUpdate) (*types.MsgRejectLFSObjectUpdateResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Get the proposal
	proposal, found := k.GetProposedLFSObjectUpdate(ctx, msg.ProposalId)
	if !found {
		return nil, fmt.Errorf("proposal not found")
	}

	// Verify proposal is still pending
	if proposal.Status != types.ProposalStatus_PROPOSAL_STATUS_PENDING {
		return nil, fmt.Errorf("proposal is not pending (status: %s)", proposal.Status.String())
	}

	// Verify that the rejector is the user who initiated the proposal
	if proposal.User != msg.Creator {
		return nil, fmt.Errorf("only the user who initiated the proposal can reject it")
	}

	k.RemoveProposedLFSObjectUpdate(ctx, proposal.Id)

	return &types.MsgRejectLFSObjectUpdateResponse{}, nil
}

func (k msgServer) ProposeRepositoryDelete(goCtx context.Context, msg *types.MsgProposeRepositoryDelete) (*types.MsgProposeRepositoryDeleteResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Check if provider is active
	provider, found := k.GetProvider(ctx, msg.Creator)
	if !found || provider.Status != types.Bonded {
		return nil, fmt.Errorf("provider is not active")
	}

	// Get repository to verify it exists
	_, found = k.gitopiaKeeper.GetRepositoryById(ctx, msg.RepositoryId)
	if !found {
		return nil, fmt.Errorf("repository not found")
	}

	// Create the proposal
	proposalId := k.CreateRepositoryDeleteProposal(
		ctx,
		msg.Creator,
		msg.RepositoryId,
		msg.User,
	)

	return &types.MsgProposeRepositoryDeleteResponse{
		ProposalId: proposalId,
	}, nil
}

func (k msgServer) ApproveRepositoryDelete(goCtx context.Context, msg *types.MsgApproveRepositoryDelete) (*types.MsgApproveRepositoryDeleteResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Get the proposal
	proposal, found := k.GetProposedRepositoryDelete(ctx, msg.ProposalId)
	if !found {
		return nil, fmt.Errorf("proposal not found")
	}

	// Verify proposal is still pending
	if proposal.Status != types.ProposalStatus_PROPOSAL_STATUS_PENDING {
		return nil, fmt.Errorf("proposal is not pending (status: %s)", proposal.Status.String())
	}

	// Check if proposal has expired
	if ctx.BlockTime().After(proposal.ExpiresAt) {
		k.RemoveProposedRepositoryDelete(ctx, proposal.Id)
		return nil, fmt.Errorf("proposal has expired")
	}

	// Verify that the approver is the user who initiated the proposal
	if proposal.User != msg.Creator {
		return nil, fmt.Errorf("only the user who initiated the proposal can approve it")
	}

	// Verify provider is still active
	_, found = k.GetProvider(ctx, proposal.Provider)
	if !found {
		k.RemoveProposedRepositoryDelete(ctx, proposal.Id)
		return nil, fmt.Errorf("provider is no longer active")
	}

	repository, found := k.gitopiaKeeper.GetRepositoryById(ctx, proposal.RepositoryId)
	if !found {
		k.RemoveProposedRepositoryDelete(ctx, proposal.Id)
		return nil, fmt.Errorf("repository not found")
	}

	userQuota, found := k.gitopiaKeeper.GetUserQuota(ctx, repository.Owner.Id)
	if !found {
		userQuota = gitopiatypes.UserQuota{
			Address:     repository.Owner.Id,
			StorageUsed: 0,
		}
	}

	var cids []string
	deletedReleaseAssets := make([]*types.ReleaseAssetInfo, 0)
	deletedLfsObjects := make([]*types.LFSObjectInfo, 0)

	storageStats := k.GetStorageStats(ctx)

	// Delete packfile
	packfile, found := k.GetPackfile(ctx, proposal.RepositoryId)
	if found {
		if packfile.Cid != "" {
			k.DecreaseCidReferenceCount(ctx, packfile.Cid)
			if count, found := k.GetCidReferenceCount(ctx, packfile.Cid); found && count.Count == 0 {
				cids = append(cids, packfile.Cid)
				k.RemoveCidReferenceCount(ctx, packfile.Cid)
			}
		}

		if userQuota.StorageUsed >= uint64(packfile.Size_) {
			userQuota.StorageUsed -= uint64(packfile.Size_)
		} else {
			userQuota.StorageUsed = 0
		}

		if storageStats.TotalPackfileSize >= uint64(packfile.Size_) {
			storageStats.TotalPackfileSize -= uint64(packfile.Size_)
		} else {
			storageStats.TotalPackfileSize = 0
		}

		k.RemovePackfile(ctx, proposal.RepositoryId)
	}

	// Delete LFS objects
	lfsObjects := k.GetLFSObjectsByRepositoryId(ctx, proposal.RepositoryId)
	for _, lfsObject := range lfsObjects {
		k.DecreaseCidReferenceCount(ctx, lfsObject.Cid)
		if count, found := k.GetCidReferenceCount(ctx, lfsObject.Cid); found && count.Count == 0 {
			cids = append(cids, lfsObject.Cid)
			deletedLfsObjects = append(deletedLfsObjects, &types.LFSObjectInfo{
				Oid: lfsObject.Oid,
				Cid: lfsObject.Cid,
			})
			k.RemoveCidReferenceCount(ctx, lfsObject.Cid)
		}

		if userQuota.StorageUsed >= uint64(lfsObject.Size_) {
			userQuota.StorageUsed -= uint64(lfsObject.Size_)
		} else {
			userQuota.StorageUsed = 0
		}

		if storageStats.TotalLfsObjectSize >= uint64(lfsObject.Size_) {
			storageStats.TotalLfsObjectSize -= uint64(lfsObject.Size_)
		} else {
			storageStats.TotalLfsObjectSize = 0
		}

		k.RemoveLFSObject(ctx, proposal.RepositoryId, lfsObject.Oid)
	}

	// Delete release assets
	releaseAssets := k.GetReleaseAssetsByRepositoryId(ctx, proposal.RepositoryId)
	for _, releaseAsset := range releaseAssets {
		k.DecreaseCidReferenceCount(ctx, releaseAsset.Cid)
		if count, found := k.GetCidReferenceCount(ctx, releaseAsset.Cid); found && count.Count == 0 {
			cids = append(cids, releaseAsset.Cid)
			deletedReleaseAssets = append(deletedReleaseAssets, &types.ReleaseAssetInfo{
				Tag:    releaseAsset.Tag,
				Name:   releaseAsset.Name,
				Cid:    releaseAsset.Cid,
				Sha256: releaseAsset.Sha256,
			})
			k.RemoveCidReferenceCount(ctx, releaseAsset.Cid)
		}

		if userQuota.StorageUsed >= uint64(releaseAsset.Size_) {
			userQuota.StorageUsed -= uint64(releaseAsset.Size_)
		} else {
			userQuota.StorageUsed = 0
		}

		if storageStats.TotalReleaseAssetSize >= uint64(releaseAsset.Size_) {
			storageStats.TotalReleaseAssetSize -= uint64(releaseAsset.Size_)
		} else {
			storageStats.TotalReleaseAssetSize = 0
		}

		k.RemoveReleaseAsset(ctx, proposal.RepositoryId, releaseAsset.Tag, releaseAsset.Name)
	}

	k.gitopiaKeeper.SetUserQuota(ctx, userQuota)
	k.SetStorageStats(ctx, storageStats)

	// Remove proposal
	k.RemoveProposedRepositoryDelete(ctx, proposal.Id)

	// Purge the repository from gitopia module
	err := k.gitopiaKeeper.PurgeRepository(ctx, proposal.RepositoryId)
	if err != nil {
		return nil, err
	}

	if len(cids) > 0 {
		ctx.EventManager().EmitTypedEvent(&types.EventDeleteStorageObject{
			RepositoryId: proposal.RepositoryId,
			Cids:         cids,
			Provider:     proposal.Provider,
		})
	}

	ctx.EventManager().EmitTypedEvent(&types.EventRepositoryDeleted{
		RepositoryId:  proposal.RepositoryId,
		Provider:      proposal.Provider,
		PackfileCid:   packfile.Cid,
		PackfileName:  packfile.Name,
		LfsObjects:    deletedLfsObjects,
		ReleaseAssets: deletedReleaseAssets,
	})

	return &types.MsgApproveRepositoryDeleteResponse{}, nil
}
