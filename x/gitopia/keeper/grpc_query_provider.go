package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v2/x/gitopia/types"
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

	for _, t := range GitServerTypeUrls {
		authorization, _ := k.authzKeeper.GetAuthorization(ctx, grantee, granter, t)
		if authorization == nil {
			return &types.QueryCheckGitServerAuthorizationResponse{HaveAuthorization: false}, nil
		}
	}

	return &types.QueryCheckGitServerAuthorizationResponse{HaveAuthorization: true}, nil
}

func (k Keeper) CheckStorageProviderAuthorization(c context.Context, req *types.QueryCheckStorageProviderAuthorizationRequest) (*types.QueryCheckStorageProviderAuthorizationResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(c)

	grantee, _ := sdk.AccAddressFromBech32(req.ProviderAddress)
	granter, _ := sdk.AccAddressFromBech32(req.UserAddress)

	for _, t := range StorageTypeUrls {
		authorization, _ := k.authzKeeper.GetAuthorization(ctx, grantee, granter, t)
		if authorization == nil {
			return &types.QueryCheckStorageProviderAuthorizationResponse{HaveAuthorization: false}, nil
		}
	}

	return &types.QueryCheckStorageProviderAuthorizationResponse{HaveAuthorization: true}, nil
}
