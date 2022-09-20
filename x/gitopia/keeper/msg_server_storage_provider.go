package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/x/authz"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func (k msgServer) AuthorizeStorageProvider(goCtx context.Context, msg *types.MsgAuthorizeStorageProvider) (*types.MsgAuthorizeStorageProviderResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.Creator))
	}

	now := ctx.BlockTime()
	grantee, _ := sdk.AccAddressFromBech32(msg.Provider)
	granter, _ := sdk.AccAddressFromBech32(msg.Creator)

	updateRepositoryBackupRefAuthorization := authz.NewGenericAuthorization(sdk.MsgTypeURL(&types.MsgUpdateRepositoryBackupRef{}))
	err := k.authzKeeper.SaveGrant(ctx, grantee, granter, updateRepositoryBackupRefAuthorization, now.AddDate(1, 0, 0))
	if err != nil {
		return nil, err
	}

	addRepositoryBackupRefAuthorization := authz.NewGenericAuthorization(sdk.MsgTypeURL(&types.MsgAddRepositoryBackupRef{}))
	err = k.authzKeeper.SaveGrant(ctx, grantee, granter, addRepositoryBackupRefAuthorization, now.AddDate(1, 0, 0))
	if err != nil {
		return nil, err
	}

	return &types.MsgAuthorizeStorageProviderResponse{}, nil
}

func (k msgServer) RevokeStorageProviderPermissions(goCtx context.Context, msg *types.MsgRevokeStorageProviderPermissions) (*types.MsgRevokeStorageProviderPermissionsResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.Creator))
	}

	grantee, _ := sdk.AccAddressFromBech32(msg.Provider)
	granter, _ := sdk.AccAddressFromBech32(msg.Creator)

	typeUrls := map[string]struct{}{
		sdk.MsgTypeURL(&types.MsgAddRepositoryBackupRef{}):    {},
		sdk.MsgTypeURL(&types.MsgUpdateRepositoryBackupRef{}): {},
	}

	authorizations := k.authzKeeper.GetAuthorizations(ctx, grantee, granter)

	for i := range authorizations {
		if _, found := typeUrls[authorizations[i].MsgTypeURL()]; found {
			k.authzKeeper.DeleteGrant(ctx, grantee, granter, authorizations[i].MsgTypeURL())
		}
	}

	return &types.MsgRevokeStorageProviderPermissionsResponse{}, nil
}
