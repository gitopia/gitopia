package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/gitopia/gitopia/v3/x/gitopia/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) ReleaseAll(c context.Context, req *types.QueryAllReleaseRequest) (*types.QueryAllReleaseResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var releases []*types.Release
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	releaseStore := prefix.NewStore(store, types.KeyPrefix(types.ReleaseKey))

	pageRes, err := query.Paginate(releaseStore, req.Pagination, func(key []byte, value []byte) error {
		var release types.Release
		if err := k.cdc.Unmarshal(value, &release); err != nil {
			return err
		}

		releases = append(releases, &release)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllReleaseResponse{Release: releases, Pagination: pageRes}, nil
}

func (k Keeper) Release(c context.Context, req *types.QueryGetReleaseRequest) (*types.QueryGetReleaseResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var release types.Release
	ctx := sdk.UnwrapSDKContext(c)

	release, found := k.GetRelease(ctx, req.Id)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	return &types.QueryGetReleaseResponse{Release: &release}, nil
}
