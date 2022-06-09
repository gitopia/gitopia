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

	provider, found := k.GetStorageProviderByKey(ctx, storageProviderPKey{
		creator: msg.Creator,
		store:   msg.Store,
	})

	if !found {
		return nil, sdkerrors.Wrapf(sdkerrors.ErrKeyNotFound, "provider (%d) doesn't exist", msg.Creator)
	}

	repository, found := k.GetRepository(ctx, msg.RepositoryId)
	if !found {
		return nil, sdkerrors.Wrapf(sdkerrors.ErrKeyNotFound, "repository (%d) doesn't exist", msg.RepositoryId)
	}

	if !k.isAuthorized(ctx, repository.Creator, msg.Creator, msg){
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
