package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/v2/x/gitopia/types"
)

var GitServerTypeUrls = [4]string{
	sdk.MsgTypeURL(&types.MsgForkRepository{}),
	sdk.MsgTypeURL(&types.MsgForkRepositorySuccess{}),
	sdk.MsgTypeURL(&types.MsgSetPullRequestState{}),
	sdk.MsgTypeURL(&types.MsgUpdateTask{}),
}

var StorageTypeUrls = [2]string{
	sdk.MsgTypeURL(&types.MsgAddRepositoryBackupRef{}),
	sdk.MsgTypeURL(&types.MsgUpdateRepositoryBackupRef{}),
}

func (k msgServer) AuthorizeProvider(goCtx context.Context, msg *types.MsgAuthorizeProvider) (*types.MsgAuthorizeProviderResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.Creator))
	}

	if msg.Creator != msg.Granter { // DAO address
		_, found := k.GetDao(ctx, msg.Granter)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("dao (%v) doesn't exist", msg.Granter))
		}

		if m, found := k.GetDaoMember(ctx, msg.Granter, msg.Creator); found {
			if m.Role != types.MemberRole_OWNER {
				return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) does not have required permission", msg.Creator))
			}
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) is not a member of dao", msg.Creator))
		}
	}

	now := ctx.BlockTime()
	expiration := now.AddDate(1, 0, 0)
	err := k.Keeper.AuthorizeProvider(ctx, msg.Provider, msg.Granter, &expiration, msg.Permission)
	if err != nil {
		return nil, err
	}

	return &types.MsgAuthorizeProviderResponse{}, nil
}

func (k msgServer) RevokeProviderPermission(goCtx context.Context, msg *types.MsgRevokeProviderPermission) (*types.MsgRevokeProviderPermissionResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.Creator))
	}

	grantee, _ := sdk.AccAddressFromBech32(msg.Provider)
	granter, _ := sdk.AccAddressFromBech32(msg.Granter)

	if msg.Creator != msg.Granter { // DAO address
		_, found := k.GetDao(ctx, msg.Granter)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("dao (%v) doesn't exist", msg.Granter))
		}

		if m, found := k.GetDaoMember(ctx, msg.Granter, msg.Creator); found {
			if m.Role != types.MemberRole_OWNER {
				return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) does not have required permission", msg.Creator))
			}
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) is not a member of dao", msg.Creator))
		}
	}

	switch msg.Permission {
	case types.ProviderPermission_GIT_SERVER:
		for _, t := range GitServerTypeUrls {
			authorization, _ := k.authzKeeper.GetAuthorization(ctx, grantee, granter, t)
			if authorization != nil {
				k.authzKeeper.DeleteGrant(ctx, grantee, granter, t)
			}
		}
	case types.ProviderPermission_STORAGE:
		for _, t := range StorageTypeUrls {
			authorization, _ := k.authzKeeper.GetAuthorization(ctx, grantee, granter, t)
			if authorization != nil {
				k.authzKeeper.DeleteGrant(ctx, grantee, granter, t)
			}
		}
	default:
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("invalid permission (%v)", msg.Permission))
	}

	return &types.MsgRevokeProviderPermissionResponse{}, nil
}
