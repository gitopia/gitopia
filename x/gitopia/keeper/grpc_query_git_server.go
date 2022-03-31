package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) CheckGitServerAuthorization(c context.Context, req *types.QueryCheckGitServerAuthorizationRequest) (*types.QueryCheckGitServerAuthorizationResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(c)

	grantee, _ := sdk.AccAddressFromBech32(req.ProviderAddress)
	granter, _ := sdk.AccAddressFromBech32(req.UserAddress)

	authorization, _ := k.authzKeeper.GetCleanAuthorization(ctx, grantee, granter, sdk.MsgTypeURL(&types.MsgForkRepository{}))
	if authorization == nil {
		return &types.QueryCheckGitServerAuthorizationResponse{HaveAuthorization: false}, nil
	}

	authorization, _ = k.authzKeeper.GetCleanAuthorization(ctx, grantee, granter, sdk.MsgTypeURL(&types.MsgForkRepositorySuccess{}))
	if authorization == nil {
		return &types.QueryCheckGitServerAuthorizationResponse{HaveAuthorization: false}, nil
	}

	authorization, _ = k.authzKeeper.GetCleanAuthorization(ctx, grantee, granter, sdk.MsgTypeURL(&types.MsgSetPullRequestState{}))
	if authorization == nil {
		return &types.QueryCheckGitServerAuthorizationResponse{HaveAuthorization: false}, nil
	}

	authorization, _ = k.authzKeeper.GetCleanAuthorization(ctx, grantee, granter, sdk.MsgTypeURL(&types.MsgUpdateTask{}))
	if authorization == nil {
		return &types.QueryCheckGitServerAuthorizationResponse{HaveAuthorization: false}, nil
	}

	return &types.QueryCheckGitServerAuthorizationResponse{HaveAuthorization: true}, nil
}
