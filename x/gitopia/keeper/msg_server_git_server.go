package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/x/authz"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func (k msgServer) AuthorizeGitServer(goCtx context.Context, msg *types.MsgAuthorizeGitServer) (*types.MsgAuthorizeGitServerResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.Creator))
	}

	now := ctx.BlockTime()
	grantee, _ := sdk.AccAddressFromBech32(msg.Provider)
	granter, _ := sdk.AccAddressFromBech32(msg.Creator)

	forkRepositoryAuthorization := authz.NewGenericAuthorization(sdk.MsgTypeURL(&types.MsgForkRepository{}))
	err := k.authzKeeper.SaveGrant(ctx, grantee, granter, forkRepositoryAuthorization, now.AddDate(1, 0, 0))
	if err != nil {
		return nil, err
	}

	forkRepositorySuccessAuthorization := authz.NewGenericAuthorization(sdk.MsgTypeURL(&types.MsgForkRepositorySuccess{}))
	err = k.authzKeeper.SaveGrant(ctx, grantee, granter, forkRepositorySuccessAuthorization, now.AddDate(1, 0, 0))
	if err != nil {
		return nil, err
	}

	setPullRequestStateAuthorization := authz.NewGenericAuthorization(sdk.MsgTypeURL(&types.MsgSetPullRequestState{}))
	err = k.authzKeeper.SaveGrant(ctx, grantee, granter, setPullRequestStateAuthorization, now.AddDate(1, 0, 0))
	if err != nil {
		return nil, err
	}

	updateTaskAuthorization := authz.NewGenericAuthorization(sdk.MsgTypeURL(&types.MsgUpdateTask{}))
	err = k.authzKeeper.SaveGrant(ctx, grantee, granter, updateTaskAuthorization, now.AddDate(1, 0, 0))
	if err != nil {
		return nil, err
	}

	return &types.MsgAuthorizeGitServerResponse{}, nil
}

func (k msgServer) RevokeGitServerPermissions(goCtx context.Context, msg *types.MsgRevokeGitServerPermissions) (*types.MsgRevokeGitServerPermissionsResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.Creator))
	}

	grantee, _ := sdk.AccAddressFromBech32(msg.Provider)
	granter, _ := sdk.AccAddressFromBech32(msg.Creator)

	typeUrls := map[string]struct{}{
		sdk.MsgTypeURL(&types.MsgForkRepository{}):        {},
		sdk.MsgTypeURL(&types.MsgForkRepositorySuccess{}): {},
		sdk.MsgTypeURL(&types.MsgSetPullRequestState{}):   {},
		sdk.MsgTypeURL(&types.MsgUpdateTask{}):            {},
	}

	authorizations := k.authzKeeper.GetAuthorizations(ctx, grantee, granter)

	for i := range authorizations {
		if _, found := typeUrls[authorizations[i].MsgTypeURL()]; found {
			k.authzKeeper.DeleteGrant(ctx, grantee, granter, authorizations[i].MsgTypeURL())
		}
	}

	return &types.MsgRevokeGitServerPermissionsResponse{}, nil
}
