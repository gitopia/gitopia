package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func (k msgServer) AddRepositoryBackupRef(goCtx context.Context, msg *types.MsgAddRepositoryBackupRef) (*types.MsgAddRepositoryBackupRefResponse, error) {
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

	provider, found := k.GetStorageProviderByKey(ctx, storageProviderPKey{
		creator: msg.Creator,
		store:   msg.Store,
	})

	if !found {
		return nil, sdkerrors.Wrapf(sdkerrors.ErrKeyNotFound, "provider (%d) doesn't exist", msg.Creator)
	}

	if !k.isAuthorized(ctx, repository.Creator, msg.Creator, msg) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	backup, found := k.FindBackupProvider(ctx, repository, provider.Id)
	if !found {
		backup = new(types.RepositoryBackup)
		backup.ProviderId = provider.Id
		repository.Backups = append(repository.Backups, backup)
	}
	backup.Refs = append(backup.Refs, msg.Ref)

	// backup is a pointer to member of backups in repository
	k.SetRepository(ctx, repository)

	return &types.MsgAddRepositoryBackupRefResponse{}, nil
}
