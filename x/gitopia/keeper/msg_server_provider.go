package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/x/authz"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

var gitServerTypeUrls = map[string]struct{}{
	sdk.MsgTypeURL(&types.MsgForkRepository{}):        {},
	sdk.MsgTypeURL(&types.MsgForkRepositorySuccess{}): {},
	sdk.MsgTypeURL(&types.MsgSetPullRequestState{}):   {},
	sdk.MsgTypeURL(&types.MsgUpdateTask{}):            {},
}

var storageTypeUrls = map[string]struct{}{
	sdk.MsgTypeURL(&types.MsgAddRepositoryBackupRef{}):    {},
	sdk.MsgTypeURL(&types.MsgUpdateRepositoryBackupRef{}): {},
}

func (k msgServer) AuthorizeProvider(goCtx context.Context, msg *types.MsgAuthorizeProvider) (*types.MsgAuthorizeProviderResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.Creator))
	}

	now := ctx.BlockTime()
	expiration := now.AddDate(1, 0, 0)
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
		for t := range gitServerTypeUrls {
			authorization := authz.NewGenericAuthorization(t)
			err := k.authzKeeper.SaveGrant(ctx, grantee, granter, authorization, &expiration)
			if err != nil {
				return nil, sdkerrors.Wrap(sdkerrors.ErrLogic, "authz grant error")
			}
		}
	case types.ProviderPermission_STORAGE:
		for t := range storageTypeUrls {
			authorization := authz.NewGenericAuthorization(t)
			err := k.authzKeeper.SaveGrant(ctx, grantee, granter, authorization, &expiration)
			if err != nil {
				return nil, sdkerrors.Wrap(sdkerrors.ErrLogic, "authz grant error")
			}
		}
	default:
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("invalid permission (%v)", msg.Permission))
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
		authorizations, err := k.authzKeeper.GetAuthorizations(ctx, grantee, granter)
		if err != nil {
			return nil, sdkerrors.Wrap(sdkerrors.ErrLogic, "error querying authorizations")
		}
		for i := range authorizations {
			if _, found := gitServerTypeUrls[authorizations[i].MsgTypeURL()]; found {
				k.authzKeeper.DeleteGrant(ctx, grantee, granter, authorizations[i].MsgTypeURL())
			}
		}
	case types.ProviderPermission_STORAGE:
		authorizations, err := k.authzKeeper.GetAuthorizations(ctx, grantee, granter)
		if err != nil {
			return nil, sdkerrors.Wrap(sdkerrors.ErrLogic, "error querying authorizations")
		}
		for i := range authorizations {
			if _, found := storageTypeUrls[authorizations[i].MsgTypeURL()]; found {
				k.authzKeeper.DeleteGrant(ctx, grantee, granter, authorizations[i].MsgTypeURL())
			}
		}
	default:
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("invalid permission (%v)", msg.Permission))
	}

	return &types.MsgRevokeProviderPermissionResponse{}, nil
}
