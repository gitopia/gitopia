package keeper

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	merkletree "github.com/wealdtech/go-merkletree/v2"
	"github.com/wealdtech/go-merkletree/v2/sha3"

	appparams "github.com/gitopia/gitopia/v6/app/params"
	"github.com/gitopia/gitopia/v6/utils"
	gitopiakeeper "github.com/gitopia/gitopia/v6/x/gitopia/keeper"
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

	k.SetProviderStake(ctx, creator, types.ProviderStake{Stake: sdk.NewCoins(msg.Stake)})

	provider := types.Provider{
		Creator:                  msg.Creator,
		ApiUrl:                   msg.ApiUrl,
		Moniker:                  msg.Moniker,
		TotalChallenges:          0,
		SuccessfulChallenges:     0,
		ConsecutiveFailures:      0,
		JoinTime:                 ctx.BlockTime(),
		Status:                   types.ProviderStatus_PROVIDER_STATUS_ACTIVE,
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
			return sdk.NewCoin(params.StoragePricePerMb.Denom, sdk.ZeroInt()), nil
		}
		// Calculate charge in MB and multiply by price per MB
		diffMb := float64(diff) / (1024 * 1024)
		chargeAmount := sdk.NewDec(int64(diffMb)).Mul(sdk.NewDecFromInt(params.StoragePricePerMb.Amount))
		return sdk.NewCoin(params.StoragePricePerMb.Denom, chargeAmount.TruncateInt()), nil
	}

	// If new usage is below free limit, no charge
	if newUsage <= freeStorageBytes {
		return sdk.NewCoin(params.StoragePricePerMb.Denom, sdk.ZeroInt()), nil
	}

	// Calculate charge for the portion that exceeds free limit
	excessBytes := newUsage - freeStorageBytes
	excessMb := float64(excessBytes) / (1024 * 1024)
	chargeAmount := sdk.NewDec(int64(excessMb)).Mul(sdk.NewDecFromInt(params.StoragePricePerMb.Amount))
	return sdk.NewCoin(params.StoragePricePerMb.Denom, chargeAmount.TruncateInt()), nil
}

func (k msgServer) UpdateRepositoryPackfile(goCtx context.Context, msg *types.MsgUpdateRepositoryPackfile) (*types.MsgUpdateRepositoryPackfileResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Check if provider is active
	provider, found := k.GetProvider(ctx, msg.Creator)
	if !found || provider.Status != types.ProviderStatus_PROVIDER_STATUS_ACTIVE {
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
		if !k.GetParams(ctx).StoragePricePerMb.IsZero() && repository.UpdatedAt > UpgradeTime.Unix() {
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
		if !k.GetParams(ctx).StoragePricePerMb.IsZero() && repository.UpdatedAt > UpgradeTime.Unix() {
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

func (k msgServer) DeleteRepositoryPackfile(goCtx context.Context, msg *types.MsgDeleteRepositoryPackfile) (*types.MsgDeleteRepositoryPackfileResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Check if provider is active
	provider, found := k.GetProvider(ctx, msg.Creator)
	if !found || provider.Status != types.ProviderStatus_PROVIDER_STATUS_ACTIVE {
		return nil, fmt.Errorf("provider is not active")
	}

	userQuota, found := k.gitopiaKeeper.GetUserQuota(ctx, msg.OwnerId)
	if !found {
		// Create new user quota
		userQuota = gitopiatypes.UserQuota{
			Address:     msg.OwnerId,
			StorageUsed: 0,
		}
	}

	// Check if packfile exists for this repository
	packfile, found := k.GetPackfile(ctx, msg.RepositoryId)
	if !found {
		return nil, fmt.Errorf("packfile not found")
	}

	// Decrement or remove old cid reference count
	if packfile.Cid != "" {
		k.DecreaseCidReferenceCount(ctx, packfile.Cid)
		if count, found := k.GetCidReferenceCount(ctx, packfile.Cid); found && count.Count == 0 {
			k.RemoveCidReferenceCount(ctx, packfile.Cid)
		}
	}

	userQuota.StorageUsed -= uint64(packfile.Size_)
	k.gitopiaKeeper.SetUserQuota(ctx, userQuota)

	// Remove existing packfile
	k.RemovePackfile(ctx, msg.RepositoryId)

	storageStats := k.GetStorageStats(ctx)
	storageStats.TotalPackfileSize -= uint64(packfile.Size_)
	k.SetStorageStats(ctx, storageStats)

	// Emit event
	ctx.EventManager().EmitTypedEvent(&types.EventPackfileDeleted{
		RepositoryId: msg.RepositoryId,
		Name:         packfile.Name,
		Cid:          packfile.Cid,
	})

	return &types.MsgDeleteRepositoryPackfileResponse{}, nil
}

func (k msgServer) UpdateReleaseAsset(goCtx context.Context, msg *types.MsgUpdateReleaseAsset) (*types.MsgUpdateReleaseAssetResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Check if provider is active
	provider, found := k.GetProvider(ctx, msg.Creator)
	if !found || provider.Status != types.ProviderStatus_PROVIDER_STATUS_ACTIVE {
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

		// Calculate storage charge
		if !k.GetParams(ctx).StoragePricePerMb.IsZero() && repository.UpdatedAt > UpgradeTime.Unix() {
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

		// Update existing asset while preserving its ID
		existingAsset.Creator = msg.Creator
		existingAsset.Name = msg.Name
		existingAsset.Cid = msg.Cid
		existingAsset.RootHash = msg.RootHash
		existingAsset.Size_ = msg.Size_
		existingAsset.Sha256 = msg.Sha256
		existingAsset.UpdatedAt = ctx.BlockTime()

		userQuota.StorageUsed += uint64(int64(userQuota.StorageUsed) + diff)
		k.gitopiaKeeper.SetUserQuota(ctx, userQuota)

		k.SetReleaseAsset(ctx, existingAsset)

		storageStats := k.GetStorageStats(ctx)
		storageStats.TotalReleaseAssetSize += uint64(int64(storageStats.TotalReleaseAssetSize) + diff)
		k.SetStorageStats(ctx, storageStats)
	} else {
		// Calculate storage charge for new asset
		if !k.GetParams(ctx).StoragePricePerMb.IsZero() && repository.UpdatedAt > UpgradeTime.Unix() {
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

		// Create new release asset
		asset := types.ReleaseAsset{
			Creator:      msg.Creator,
			RepositoryId: msg.RepositoryId,
			Tag:          msg.Tag,
			Name:         msg.Name,
			Cid:          msg.Cid,
			RootHash:     msg.RootHash,
			Size_:        msg.Size_,
			Sha256:       msg.Sha256,
			CreatedAt:    ctx.BlockTime(),
			UpdatedAt:    ctx.BlockTime(),
		}

		userQuota.StorageUsed += msg.Size_
		k.gitopiaKeeper.SetUserQuota(ctx, userQuota)

		k.AppendReleaseAsset(ctx, asset)

		// Increase new cid reference count
		k.IncreaseCidReferenceCount(ctx, msg.Cid)

		storageStats := k.GetStorageStats(ctx)
		storageStats.TotalReleaseAssetSize += msg.Size_
		k.SetStorageStats(ctx, storageStats)
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

func (k msgServer) DeleteReleaseAsset(goCtx context.Context, msg *types.MsgDeleteReleaseAsset) (*types.MsgDeleteReleaseAssetResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Check if provider is active
	provider, found := k.GetProvider(ctx, msg.Creator)
	if !found || provider.Status != types.ProviderStatus_PROVIDER_STATUS_ACTIVE {
		return nil, fmt.Errorf("provider is not active")
	}

	// Get the release asset
	asset, found := k.GetReleaseAsset(ctx, msg.RepositoryId, msg.Tag, msg.Name)
	if !found {
		return nil, fmt.Errorf("release asset not found")
	}

	// Decrease cid reference count
	k.DecreaseCidReferenceCount(ctx, asset.Cid)
	if count, found := k.GetCidReferenceCount(ctx, asset.Cid); found && count.Count == 0 {
		k.RemoveCidReferenceCount(ctx, asset.Cid)
	}

	storageStats := k.GetStorageStats(ctx)
	storageStats.TotalReleaseAssetSize -= asset.Size_
	k.SetStorageStats(ctx, storageStats)

	// Delete the release asset
	k.RemoveReleaseAsset(ctx, msg.RepositoryId, msg.Tag, msg.Name)

	// Update user quota
	userQuota, _ := k.gitopiaKeeper.GetUserQuota(ctx, msg.OwnerId)
	userQuota.StorageUsed -= asset.Size_
	k.gitopiaKeeper.SetUserQuota(ctx, userQuota)

	// Emit event
	ctx.EventManager().EmitTypedEvent(&types.EventReleaseAssetDeleted{
		RepositoryId: msg.RepositoryId,
		Tag:          msg.Tag,
		Name:         msg.Name,
		Cid:          asset.Cid,
		Sha256:       asset.Sha256,
	})

	return &types.MsgDeleteReleaseAssetResponse{}, nil
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

		// Check if provider should be suspended due to consecutive failures
		if provider.ConsecutiveFailures >= params.ConsecutiveFailsThreshold {
			// Suspend the provider
			provider.Status = types.ProviderStatus_PROVIDER_STATUS_SUSPENDED

			// Apply percentage-based slash for consecutive failures
			providerAcc, _ := sdk.AccAddressFromBech32(provider.Creator)
			stake := k.GetProviderStake(ctx, providerAcc)
			stakeAmount := stake.Stake.AmountOf(appparams.BaseCoinUnit)
			dec := sdk.NewDec(int64(stakeAmount.Int64()))
			slashAmount := dec.Mul(sdk.NewDec(int64(params.ConsecutiveFailsSlashPercentage))).Quo(sdk.NewDec(100))
			slashAmountCoins := sdk.NewCoins(sdk.NewCoin(appparams.BaseCoinUnit, slashAmount.TruncateInt()))

			// Transfer slashed amount to slash account
			storageBondedPoolAcc, _ := sdk.AccAddressFromBech32(types.StorageBondedPoolName)
			k.bankKeeper.SendCoinsFromAccountToModule(ctx, storageBondedPoolAcc, types.ChallengeSlashPoolName, slashAmountCoins)

			// Update provider stake
			k.SetProviderStake(ctx, providerAcc, types.ProviderStake{
				Stake: stake.Stake.Sub(slashAmountCoins[0]),
			})

			// Reset consecutive failures
			provider.ConsecutiveFailures = 0

			ctx.Logger().Info(fmt.Sprintf("provider %s suspended due to consecutive failures and slashed %s", provider.Creator, slashAmountCoins.String()))

			// Emit suspension event
			ctx.EventManager().EmitTypedEvent(&types.EventProviderStatusUpdated{
				Address: provider.Creator,
				Online:  false,
			})
		} else {
			// Apply regular challenge failure slash
			slashAmountCoins := sdk.NewCoins(params.ChallengeSlashAmount)
			storageBondedPoolAcc, _ := sdk.AccAddressFromBech32(types.StorageBondedPoolName)
			k.bankKeeper.SendCoinsFromAccountToModule(ctx, storageBondedPoolAcc, types.ChallengeSlashPoolName, slashAmountCoins)

			// Update provider stake
			providerAcc, _ := sdk.AccAddressFromBech32(provider.Creator)
			stake := k.GetProviderStake(ctx, providerAcc)
			k.SetProviderStake(ctx, providerAcc, types.ProviderStake{
				Stake: stake.Stake.Sub(slashAmountCoins[0]),
			})
		}

		k.SetProvider(ctx, provider)

		challenge.Status = types.ChallengeStatus_CHALLENGE_STATUS_FAILED
		k.SetChallenge(ctx, challenge)

		ctx.Logger().Info(fmt.Sprintf("provider %s slashed for challenge %d", provider.Creator, challenge.Id))

		return nil, fmt.Errorf("invalid proof")
	}

	// Update challenge status
	challenge.Status = types.ChallengeStatus_CHALLENGE_STATUS_COMPLETED
	k.SetChallenge(ctx, challenge)

	activeProviders := k.GetActiveProviders(ctx)

	// Consider only providers that have been active for at least 24 hours
	minJoinTime := ctx.BlockTime().Add(-24 * time.Hour)
	activeProviders = filterProvidersByJoinTime(activeProviders, minJoinTime)

	// Update provider rewards
	providerAcc, _ := sdk.AccAddressFromBech32(msg.Creator)
	currentRewards := k.GetProviderRewards(ctx, providerAcc)
	challengeReward := CalculateChallengeReward(params, int64(len(activeProviders)))
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
	provider.Status = types.ProviderStatus_PROVIDER_STATUS_UNREGISTERING
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
	storageBondedPoolAcc, _ := sdk.AccAddressFromBech32(types.StorageBondedPoolName)
	providerAcc, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil, fmt.Errorf("invalid creator address: %v", err)
	}

	stake := k.GetProviderStake(ctx, providerAcc)

	if err := k.bankKeeper.SendCoins(
		ctx,
		storageBondedPoolAcc,
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

func (k msgServer) MergePullRequest(goCtx context.Context, msg *types.MsgMergePullRequest) (*types.MsgMergePullRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Check if provider is active
	provider, found := k.GetProvider(ctx, msg.Creator)
	if !found || provider.Status != types.ProviderStatus_PROVIDER_STATUS_ACTIVE {
		return nil, fmt.Errorf("provider is not active")
	}

	// Get the pull request
	pullRequest, found := k.gitopiaKeeper.GetRepositoryPullRequest(ctx, msg.RepositoryId, msg.PullRequestIid)
	if !found {
		return nil, fmt.Errorf("pull request not found")
	}

	// Check if pull request can be merged
	if pullRequest.State == gitopiatypes.PullRequest_MERGED || pullRequest.State == gitopiatypes.PullRequest_CLOSED {
		return nil, fmt.Errorf("can't merge pull request in state %s", pullRequest.State.String())
	}

	// Get the base repository
	baseRepository, found := k.gitopiaKeeper.GetRepositoryById(ctx, pullRequest.Base.RepositoryId)
	if !found {
		return nil, fmt.Errorf("base repository not found")
	}

	// Get the base branch
	baseBranch, found := k.gitopiaKeeper.GetRepositoryBranch(ctx, baseRepository.Id, pullRequest.Base.Branch)
	if !found {
		return nil, fmt.Errorf("base branch not found")
	}

	// Get the head repository and branch
	headRepository, found := k.gitopiaKeeper.GetRepositoryById(ctx, pullRequest.Head.RepositoryId)
	if !found {
		return nil, fmt.Errorf("head repository not found")
	}

	headBranch, found := k.gitopiaKeeper.GetRepositoryBranch(ctx, headRepository.Id, pullRequest.Head.Branch)
	if !found {
		return nil, fmt.Errorf("head branch not found")
	}

	blockTime := ctx.BlockTime().Unix()

	// Update branch references
	pullRequest.Base.CommitSha = baseBranch.Sha
	baseBranch.Sha = msg.MergeCommitSha
	baseBranch.UpdatedAt = blockTime
	pullRequest.Head.CommitSha = headBranch.Sha

	// Update pull request state
	pullRequest.State = gitopiatypes.PullRequest_MERGED
	pullRequest.MergedAt = blockTime
	pullRequest.MergedBy = msg.Creator
	pullRequest.MergeCommitSha = msg.MergeCommitSha
	pullRequest.UpdatedAt = blockTime

	// Update task state
	task, found := k.gitopiaKeeper.GetTask(ctx, msg.TaskId)
	if !found {
		return nil, fmt.Errorf("task not found")
	}

	if msg.Creator != task.Provider {
		return nil, fmt.Errorf("unauthorized")
	}

	task.State = gitopiatypes.StateSuccess
	k.gitopiaKeeper.SetTask(ctx, task)

	// Update repository and branch
	k.gitopiaKeeper.SetRepositoryBranch(ctx, baseBranch)
	k.gitopiaKeeper.SetPullRequest(ctx, pullRequest)

	// Handle linked issues
	for _, issueIid := range pullRequest.Issues {
		issue, found := k.gitopiaKeeper.GetRepositoryIssue(ctx, baseRepository.Id, issueIid.Iid)
		if !found {
			continue
		}
		if issue.State != gitopiatypes.Issue_OPEN {
			continue
		}
		if len(issue.Assignees) != 1 || pullRequest.Creator != issue.Assignees[0] {
			continue
		}

		// Close issue
		issue.State = gitopiatypes.Issue_CLOSED
		issue.ClosedBy = msg.Creator
		issue.ClosedAt = blockTime
		issue.UpdatedAt = blockTime
		k.gitopiaKeeper.SetIssue(ctx, issue)

		// Handle bounties
		for _, bountyId := range issue.Bounties {
			bounty, found := k.gitopiaKeeper.GetBounty(ctx, bountyId)
			if !found {
				continue
			}
			if bounty.State != gitopiatypes.BountyStateSRCDEBITTED {
				continue
			}

			rewardAccAddress, err := sdk.AccAddressFromBech32(pullRequest.Creator)
			if err != nil {
				continue
			}

			if err := k.bankKeeper.IsSendEnabledCoins(ctx, bounty.Amount...); err != nil {
				continue
			}
			if k.bankKeeper.BlockedAddr(rewardAccAddress) {
				continue
			}

			bountyAddress := gitopiakeeper.GetBountyAddress(bounty.Id)
			if err := k.bankKeeper.SendCoins(
				ctx, bountyAddress, rewardAccAddress, bounty.Amount,
			); err != nil {
				continue
			}

			bounty.State = gitopiatypes.BountyStateDESTCREDITED
			bounty.RewardedTo = pullRequest.Creator
			bounty.ExpireAt = time.Time{}.Unix()
			bounty.UpdatedAt = blockTime

			k.gitopiaKeeper.SetBounty(ctx, bounty)
		}
	}

	// Add system comment
	pullRequest.CommentsCount += 1
	comment := gitopiatypes.Comment{
		Creator:      "GITOPIA",
		RepositoryId: pullRequest.Base.RepositoryId,
		ParentIid:    pullRequest.Iid,
		Parent:       gitopiatypes.CommentParentPullRequest,
		CommentIid:   pullRequest.CommentsCount,
		Body:         utils.PullRequestToggleStateCommentBody(msg.Creator, pullRequest.State),
		System:       true,
		CreatedAt:    blockTime,
		UpdatedAt:    blockTime,
		CommentType:  gitopiatypes.CommentTypePullRequestMerged,
	}

	k.gitopiaKeeper.AppendComment(ctx, comment)

	// Emit event
	headJson, _ := json.Marshal(pullRequest.Head)
	baseBranchJson, _ := json.Marshal(baseBranch)

	ctx.EventManager().EmitTypedEvent(&types.EventMergePullRequest{
		Creator:         msg.Creator,
		PullRequestId:   pullRequest.Id,
		PullRequestIid:  pullRequest.Iid,
		State:           pullRequest.State.String(),
		MergeCommitSha:  msg.MergeCommitSha,
		TaskId:          msg.TaskId,
		TaskState:       task.State.String(),
		RepoName:        baseRepository.Name,
		RepoId:          baseRepository.Id,
		RepoOwnerId:     baseRepository.Owner.Id,
		RepoOwnerType:   baseRepository.Owner.Type.String(),
		PullRequestHead: string(headJson),
		RepoBranch:      string(baseBranchJson),
		MergedBy:        pullRequest.MergedBy,
		UpdatedAt:       pullRequest.UpdatedAt,
		MergedAt:        pullRequest.MergedAt,
	})

	return &types.MsgMergePullRequestResponse{}, nil
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
	if !found || provider.Status != types.ProviderStatus_PROVIDER_STATUS_ACTIVE {
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
	if !k.GetParams(ctx).StoragePricePerMb.IsZero() && repo.UpdatedAt > UpgradeTime.Unix() {
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

// MsgDeleteLFSObject deletes an LFS object
func (k msgServer) DeleteLFSObject(goCtx context.Context, msg *types.MsgDeleteLFSObject) (*types.MsgDeleteLFSObjectResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Check if provider is active
	provider, found := k.GetProvider(ctx, msg.Creator)
	if !found || provider.Status != types.ProviderStatus_PROVIDER_STATUS_ACTIVE {
		return nil, fmt.Errorf("provider is not active")
	}

	// Get the LFS object
	lfsObj, found := k.GetLFSObject(ctx, msg.RepositoryId, msg.Oid)
	if !found {
		return nil, fmt.Errorf("LFS object not found")
	}

	// Decrease cid reference count
	k.DecreaseCidReferenceCount(ctx, lfsObj.Cid)
	if count, found := k.GetCidReferenceCount(ctx, lfsObj.Cid); found && count.Count == 0 {
		k.RemoveCidReferenceCount(ctx, lfsObj.Cid)
	}

	storageStats := k.GetStorageStats(ctx)
	storageStats.TotalLfsObjectSize -= uint64(lfsObj.Size_)
	k.SetStorageStats(ctx, storageStats)

	// Remove LFS object
	k.RemoveLFSObject(ctx, msg.RepositoryId, msg.Oid)

	// Update user quota
	userQuota, _ := k.gitopiaKeeper.GetUserQuota(ctx, msg.OwnerId)
	userQuota.StorageUsed -= uint64(lfsObj.Size_)
	k.gitopiaKeeper.SetUserQuota(ctx, userQuota)

	ctx.EventManager().EmitTypedEvent(
		&types.EventLFSObjectDeleted{
			RepositoryId: msg.RepositoryId,
			Oid:          msg.Oid,
			Cid:          lfsObj.Cid,
		},
	)

	return &types.MsgDeleteLFSObjectResponse{}, nil
}

// Stake Management Handlers

func (k msgServer) IncreaseStake(goCtx context.Context, msg *types.MsgIncreaseStake) (*types.MsgIncreaseStakeResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Get the provider
	provider, found := k.GetProvider(ctx, msg.Creator)
	if !found {
		return nil, fmt.Errorf("provider not found")
	}

	// Check if provider is active (can't increase stake if suspended or unregistering)
	if provider.Status != types.ProviderStatus_PROVIDER_STATUS_ACTIVE {
		return nil, fmt.Errorf("can only increase stake for active providers")
	}

	// Transfer additional stake from provider to module account
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil, fmt.Errorf("invalid creator address: %v", err)
	}

	storageBondedPoolAcc, _ := sdk.AccAddressFromBech32(types.StorageBondedPoolName)
	if err := k.bankKeeper.SendCoins(
		ctx,
		creator,
		storageBondedPoolAcc,
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
	if provider.Status != types.ProviderStatus_PROVIDER_STATUS_ACTIVE {
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

func (k msgServer) ReactivateProvider(goCtx context.Context, msg *types.MsgReactivateProvider) (*types.MsgReactivateProviderResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Get the provider
	provider, found := k.GetProvider(ctx, msg.Creator)
	if !found {
		return nil, fmt.Errorf("provider not found")
	}

	// Check if provider is suspended
	if provider.Status != types.ProviderStatus_PROVIDER_STATUS_SUSPENDED {
		return nil, fmt.Errorf("can only reactivate suspended providers")
	}

	// Check if provider still meets minimum stake requirement
	params := k.GetParams(ctx)
	providerAcc, _ := sdk.AccAddressFromBech32(msg.Creator)
	providerStake := k.GetProviderStake(ctx, providerAcc)
	if providerStake.Stake.AmountOf(appparams.BaseCoinUnit).Uint64() < params.MinStakeAmount {
		return nil, fmt.Errorf("provider stake is below minimum requirement, increase stake first")
	}

	// Check active provider limit
	activeProviders := k.GetActiveProviders(ctx)
	if len(activeProviders) >= int(params.MaxProviders) {
		return nil, fmt.Errorf("active provider count has reached the maximum limit")
	}

	// Reactivate the provider
	provider.Status = types.ProviderStatus_PROVIDER_STATUS_ACTIVE
	provider.ConsecutiveFailures = 0 // Reset failure count on reactivation
	k.SetProvider(ctx, provider)

	// Emit event
	ctx.EventManager().EmitTypedEvent(&types.EventProviderStatusUpdated{
		Address: provider.Creator,
		Online:  true,
	})

	ctx.Logger().Info(fmt.Sprintf("provider %s reactivated", provider.Creator))

	return &types.MsgReactivateProviderResponse{}, nil
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

	storageBondedPoolAcc, _ := sdk.AccAddressFromBech32(types.StorageBondedPoolName)

	// Transfer decreased stake back to provider
	providerAcc, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil, fmt.Errorf("invalid creator address: %v", err)
	}

	if err := k.bankKeeper.SendCoins(
		ctx,
		storageBondedPoolAcc,
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
