package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/gitopia/gitopia/x/gitopia/utils"
)

func (k msgServer) AddArweaveBackupRef(goCtx context.Context, msg *types.MsgAddArweaveBackupRef) (*types.MsgAddArweaveBackupRefResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	address, err := k.ResolveAddress(ctx, msg.RepositoryId.Id)
	if err != nil {
		return nil, err
	}

	repository, found := k.GetAddressRepository(ctx, address.address, msg.RepositoryId.Name)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository (%v/%v) doesn't exist", msg.RepositoryId.Id, msg.RepositoryId.Name))
	}

	if !k.HavePermission(ctx, msg.Creator, repository, types.RepositoryBackupPermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	var backup *types.RepositoryBackup
	i, found := utils.RepositoryBackupExists(repository.Backups, types.RepositoryBackup_ARWEAVE)
	if !found {
		backup = new(types.RepositoryBackup)
		backup.Store = types.RepositoryBackup_ARWEAVE
		repository.Backups = append(repository.Backups, backup)
	} else {
		backup = repository.Backups[i]
	}
	backup.Refs = append(backup.Refs, msg.Ref)

	repository.UpdatedAt = ctx.BlockTime().Unix()
	k.SetRepository(ctx, repository)

	return &types.MsgAddArweaveBackupRefResponse{}, nil
}

func (k msgServer) UpdateIpfsBackupRef(goCtx context.Context, msg *types.MsgUpdateIpfsBackupRef) (*types.MsgUpdateIpfsBackupRefResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	address, err := k.ResolveAddress(ctx, msg.RepositoryId.Id)
	if err != nil {
		return nil, err
	}

	repository, found := k.GetAddressRepository(ctx, address.address, msg.RepositoryId.Name)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository (%v/%v) doesn't exist", msg.RepositoryId.Id, msg.RepositoryId.Name))
	}

	if !k.HavePermission(ctx, msg.Creator, repository, types.RepositoryBackupPermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	var backup *types.RepositoryBackup
	i, found := utils.RepositoryBackupExists(repository.Backups, types.RepositoryBackup_IPFS)
	if !found {
		backup = new(types.RepositoryBackup)
		backup.Store = types.RepositoryBackup_IPFS
		repository.Backups = append(repository.Backups, backup)
	} else {
		backup = repository.Backups[i]
	}

	if len(backup.Refs) == 0 {
		backup.Refs = []string{msg.Ref}
	} else {
		backup.Refs[0] = msg.Ref
	}

	repository.UpdatedAt = ctx.BlockTime().Unix()
	k.SetRepository(ctx, repository)

	return &types.MsgUpdateIpfsBackupRefResponse{}, nil
}
