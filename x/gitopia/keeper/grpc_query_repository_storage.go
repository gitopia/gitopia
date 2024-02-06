package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/gitopia/gitopia/v4/x/gitopia/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) RepositoryStorage(ctx context.Context, request *types.QueryGetRepositoryStorageRequest) (*types.QueryGetRepositoryStorageResponse, error) {
	if request == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)

	storage, found := k.GetRepositoryStorage(sdkCtx, request.RepositoryId)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	return &types.QueryGetRepositoryStorageResponse{Storage: &storage}, nil
}

func (k Keeper) RepositoryStorageAll(ctx context.Context, request *types.QueryGetAllRepositoryStorageRequest) (*types.QueryGetAllRepositoryStorageResponse, error) {
	if request == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)

	store := sdkCtx.KVStore(k.storeKey)
	storageStore := prefix.NewStore(store, types.KeyPrefix(types.StorageKey))

	var storages []*types.Storage
	pageRes, err := query.Paginate(storageStore, request.Pagination, func(key []byte, value []byte) error {
		var storage types.Storage
		if err := k.cdc.Unmarshal(value, &storage); err != nil {
			return status.Error(codes.Internal, err.Error())
		}

		storages = append(storages, &storage)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryGetAllRepositoryStorageResponse{
		Storages:   storages,
		Pagination: pageRes,
	}, nil
}
