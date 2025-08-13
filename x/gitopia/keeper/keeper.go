package keeper

import (
	"fmt"
	"time"

	"github.com/cometbft/cometbft/libs/log"
	"github.com/cosmos/cosmos-sdk/codec"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	authkeeper "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	authzkeeper "github.com/cosmos/cosmos-sdk/x/authz/keeper"
	bankKeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	distrkeeper "github.com/cosmos/cosmos-sdk/x/distribution/keeper"
	groupkeeper "github.com/cosmos/cosmos-sdk/x/group/keeper"
	mintkeeper "github.com/cosmos/cosmos-sdk/x/mint/keeper"
	"github.com/gitopia/gitopia/v6/x/gitopia/types"
	"github.com/gitopia/gitopia/v6/x/gitopia/utils"
	storagetypes "github.com/gitopia/gitopia/v6/x/storage/types"
)

type (
	Keeper struct {
		cdc                 codec.BinaryCodec
		storeKey            storetypes.StoreKey
		memKey              storetypes.StoreKey
		minterAccountName   string
		feeCollectorAccount string

		accountKeeper authkeeper.AccountKeeper
		authzKeeper   *authzkeeper.Keeper
		bankKeeper    bankKeeper.Keeper
		mintKeeper    *mintkeeper.Keeper
		distrKeeper   *distrkeeper.Keeper
		groupKeeper   *groupkeeper.Keeper
		storageKeeper storagetypes.StorageKeeperI

		// the address capable of executing a MsgUpdateParams message. Typically, this
		// should be the x/gov module account.
		authority string
	}
)

func NewKeeper(
	cdc codec.BinaryCodec,
	storeKey,
	memKey storetypes.StoreKey,
	minterAccountName string,
	feeCollectorAccount string,
	ak authkeeper.AccountKeeper,
	authzKeeper *authzkeeper.Keeper,
	bankKeeper bankKeeper.Keeper,
	mintKeeper *mintkeeper.Keeper,
	distrKeeper *distrkeeper.Keeper,
	groupKeeper *groupkeeper.Keeper,
	storageKeeper storagetypes.StorageKeeperI,
	authority string,
) *Keeper {
	return &Keeper{
		cdc:                 cdc,
		storeKey:            storeKey,
		memKey:              memKey,
		minterAccountName:   minterAccountName,
		feeCollectorAccount: feeCollectorAccount,

		accountKeeper: ak,
		authzKeeper:   authzKeeper,
		bankKeeper:    bankKeeper,
		mintKeeper:    mintKeeper,
		distrKeeper:   distrKeeper,
		groupKeeper:   groupKeeper,
		storageKeeper: storageKeeper,
		authority:     authority,
	}
}

// GetAuthority returns the x/gitopia module's authority.
func (k Keeper) GetAuthority() string {
	return k.authority
}

// SetStorageKeeper sets the storage keeper after initialization to break circular dependency
func (k *Keeper) SetStorageKeeper(storageKeeper storagetypes.StorageKeeperI) {
	k.storageKeeper = storageKeeper
}

func (k *Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

func (k Keeper) PurgeRepository(ctx sdk.Context, repositoryId uint64) error {
	repository, found := k.GetRepositoryById(ctx, repositoryId)
	if !found {
		return sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository (%d) doesn't exist", repositoryId))
	}

	// Sanity check
	if !repository.Archived {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "repository not marked for deletion")
	}

	k.DoRemoveRepository(ctx, repository)

	// Remove the repository id -> owner address, repository name mapping
	k.RemoveBaseRepositoryKey(ctx, repository.Id)

	// If it's a forked repository, remove the link from parent repository
	if repository.Fork {
		parentRepository, found := k.GetRepositoryById(ctx, repository.Parent)
		if !found {
			return sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("parent repository (%d) doesn't exist", repository.Parent))
		}
		// Update parent repository forks
		for i, fork := range parentRepository.Forks {
			if fork == repository.Id {
				parentRepository.Forks = append(parentRepository.Forks[:i], parentRepository.Forks[i+1:]...)
				break
			}
		}
		k.SetRepository(ctx, parentRepository)
	}

	return nil
}

func (k Keeper) DoRemoveRepository(ctx sdk.Context, repository types.Repository) {
	repositoryIssues := k.GetAllRepositoryIssue(ctx, repository.Id)
	for _, i := range repositoryIssues {
		k.DoRemoveIssue(ctx, i, repository)
	}

	repositoryPullRequests := k.GetAllRepositoryPullRequest(ctx, repository.Id)
	for _, pr := range repositoryPullRequests {
		k.DoRemovePullRequest(ctx, pr, repository)
	}

	for _, r := range repository.Releases {
		release, _ := k.GetRelease(ctx, r.Id)
		k.DoRemoveRelease(ctx, release, repository)
	}

	k.RemoveAddressRepository(ctx, repository.Owner.Id, repository.Name)
}

func (k Keeper) DoRemoveIssue(ctx sdk.Context, issue types.Issue, repository types.Repository) {
	blockTime := ctx.BlockTime().Unix()

	comments := k.GetAllIssueComment(ctx, repository.Id, issue.Iid)
	for _, comment := range comments {
		k.RemoveIssueComment(ctx, repository.Id, issue.Iid, comment.CommentIid)
	}

	for _, pullRequestIid := range issue.PullRequests {
		pullRequest, found := k.GetRepositoryPullRequest(ctx, repository.Id, pullRequestIid.Iid)
		if !found {
			continue
		}
		if i, exists := utils.IssueIidExists(pullRequest.Issues, issue.Iid); exists {
			pullRequest.Issues = append(pullRequest.Issues[:i], pullRequest.Issues[i+1:]...)
		} else {
			continue
		}
		pullRequest.UpdatedAt = blockTime

		k.SetPullRequest(ctx, pullRequest)
	}

	for _, bountyId := range issue.Bounties {
		bounty, found := k.GetBounty(ctx, bountyId)
		if !found {
			continue
		}
		if bounty.State != types.BountyStateSRCDEBITTED {
			continue
		}
		creatorAccAddress, err := sdk.AccAddressFromBech32(bounty.Creator)
		if err != nil {
			continue
		}

		if err := k.bankKeeper.IsSendEnabledCoins(ctx, bounty.Amount...); err != nil {
			continue
		}
		if k.bankKeeper.BlockedAddr(creatorAccAddress) {
			continue
		}
		bountyAddress := GetBountyAddress(bounty.Id)
		if err := k.bankKeeper.SendCoins(
			ctx, bountyAddress, creatorAccAddress, bounty.Amount,
		); err != nil {
			continue
		}

		bounty.State = types.BountyStateREVERTEDBACK
		bounty.ExpireAt = time.Time{}.Unix()
		bounty.UpdatedAt = blockTime

		k.SetBounty(ctx, bounty)
	}

	k.RemoveRepositoryIssue(ctx, repository.Id, issue.Iid)
}

func (k Keeper) DoRemovePullRequest(ctx sdk.Context, pullRequest types.PullRequest, repository types.Repository) {
	comments := k.GetAllPullRequestComment(ctx, repository.Id, pullRequest.Iid)
	for _, comment := range comments {
		k.RemovePullRequestComment(ctx, repository.Id, pullRequest.Iid, comment.CommentIid)
	}

	k.RemoveRepositoryPullRequest(ctx, repository.Id, pullRequest.Iid)
}

func (k Keeper) DoRemoveRelease(ctx sdk.Context, release types.Release, repository types.Repository) {
	if i, exists := utils.RepositoryReleaseIdExists(repository.Releases, release.Id); exists {
		repository.Releases = append(repository.Releases[:i], repository.Releases[i+1:]...)
	}

	repository.UpdatedAt = ctx.BlockTime().Unix()

	k.SetRepository(ctx, repository)
	k.RemoveRelease(ctx, release.Id)
}

func (k Keeper) createModuleAccount(ctx sdk.Context, name string, amount sdk.Coin) error {
	if amount.IsNil() || amount.Amount.IsZero() {
		return sdkerrors.Wrap(sdkerrors.ErrLogic, "amount cannot be nil or zero")
	}

	moduleAcc := authtypes.NewEmptyModuleAccount(
		name, authtypes.Minter)
	k.accountKeeper.SetModuleAccount(ctx, moduleAcc)

	err := k.bankKeeper.MintCoins(ctx, name, sdk.NewCoins(amount))
	if err != nil {
		return err
	}
	return nil
}
