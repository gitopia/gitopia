package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/authz"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func (k msgServer) AuthorizeGitServer(goCtx context.Context, msg *types.MsgAuthorizeGitServer) (*types.MsgAuthorizeGitServerResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	now := ctx.BlockTime()

	forkRepositoryAuthorization := authz.NewGenericAuthorization(sdk.MsgTypeURL(&types.MsgForkRepository{}))
	err := k.authzKeeper.SaveGrant(ctx, sdk.AccAddress(msg.Provider), sdk.AccAddress(msg.Creator), forkRepositoryAuthorization, now.AddDate(1, 0, 0))
	if err != nil {
		return nil, err
	}

	forkRepositorySuccessAuthorization := authz.NewGenericAuthorization(sdk.MsgTypeURL(&types.MsgForkRepositorySuccess{}))
	err = k.authzKeeper.SaveGrant(ctx, sdk.AccAddress(msg.Provider), sdk.AccAddress(msg.Creator), forkRepositorySuccessAuthorization, now.AddDate(1, 0, 0))
	if err != nil {
		return nil, err
	}

	setPullRequestStateAuthorization := authz.NewGenericAuthorization(sdk.MsgTypeURL(&types.MsgSetPullRequestState{}))
	err = k.authzKeeper.SaveGrant(ctx, sdk.AccAddress(msg.Provider), sdk.AccAddress(msg.Creator), setPullRequestStateAuthorization, now.AddDate(1, 0, 0))
	if err != nil {
		return nil, err
	}

	updateTaskAuthorization := authz.NewGenericAuthorization(sdk.MsgTypeURL(&types.MsgUpdateTask{}))
	err = k.authzKeeper.SaveGrant(ctx, sdk.AccAddress(msg.Provider), sdk.AccAddress(msg.Creator), updateTaskAuthorization, now.AddDate(1, 0, 0))
	if err != nil {
		return nil, err
	}

	return &types.MsgAuthorizeGitServerResponse{}, nil
}
