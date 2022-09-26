package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) CheckStorageProviderAuthorization(c context.Context, req *types.QueryCheckStorageProviderAuthorizationRequest) (*types.QueryCheckStorageProviderAuthorizationResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(c)

	grantee, _ := sdk.AccAddressFromBech32(req.ProviderAddress)
	granter, _ := sdk.AccAddressFromBech32(req.UserAddress)

	authorization, _ := k.authzKeeper.GetCleanAuthorization(ctx, grantee, granter, sdk.MsgTypeURL(&types.MsgUpdateRepositoryBackupRef{}))
	if authorization == nil {
		return &types.QueryCheckStorageProviderAuthorizationResponse{HaveAuthorization: false}, nil
	}

	authorization, _ = k.authzKeeper.GetCleanAuthorization(ctx, grantee, granter, sdk.MsgTypeURL(&types.MsgAddRepositoryBackupRef{}))
	if authorization == nil {
		return &types.QueryCheckStorageProviderAuthorizationResponse{HaveAuthorization: false}, nil
	}

	return &types.QueryCheckStorageProviderAuthorizationResponse{HaveAuthorization: true}, nil
}
