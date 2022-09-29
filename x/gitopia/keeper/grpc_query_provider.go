package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
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

	authorizations, err := k.authzKeeper.GetAuthorizations(ctx, grantee, granter)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrLogic, "error querying authorizations")
	}

	for t := range gitServerTypeUrls {
		var found bool
		for _, a := range authorizations {
			if t == a.MsgTypeURL() {
				found = true
				break
			}
		}

		if !found {
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

	authorizations, err := k.authzKeeper.GetAuthorizations(ctx, grantee, granter)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrLogic, "error querying authorizations")
	}

	for t := range storageTypeUrls {
		var found bool
		for _, a := range authorizations {
			if t == a.MsgTypeURL() {
				found = true
				break
			}
		}

		if !found {
			return &types.QueryCheckStorageProviderAuthorizationResponse{HaveAuthorization: false}, nil
		}
	}

	return &types.QueryCheckStorageProviderAuthorizationResponse{HaveAuthorization: true}, nil
}
