package keeper

import (
	"context"
	"fmt"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/gitopia/gitopia/v6/x/gitopia/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) DaoAll(c context.Context, req *types.QueryAllDaoRequest) (*types.QueryAllDaoResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var daos []*types.Dao
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	daoStore := prefix.NewStore(store, types.KeyPrefix(types.DaoKey))

	pageRes, err := query.Paginate(daoStore, req.Pagination, func(key []byte, value []byte) error {
		var dao types.Dao
		if err := k.cdc.Unmarshal(value, &dao); err != nil {
			return err
		}

		daos = append(daos, &dao)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllDaoResponse{Dao: daos, Pagination: pageRes}, nil
}

func (k Keeper) UserDaoAll(c context.Context, req *types.QueryAllUserDaoRequest) (*types.QueryAllUserDaoResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(c)

	address, err := k.ResolveAddress(ctx, req.UserId)
	if err != nil {
		return nil, status.Error(codes.NotFound, err.Error())
	}

	userDaos, err := k.GetAllUserDao(ctx, address.Address)
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	// Handle pagination
	page, limit, err := query.ParsePagination(req.Pagination)
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}

	start := (page - 1) * limit
	end := start + limit

	totalCount := uint64(len(userDaos))

	// Check if start index is out of bounds
	if start >= int(totalCount) {
		return &types.QueryAllUserDaoResponse{
			Dao: []*types.Dao{},
			Pagination: &query.PageResponse{
				Total: totalCount,
			},
		}, nil
	}

	// Adjust end index if it exceeds slice length
	if end > int(totalCount) {
		end = int(totalCount)
	}

	// Get the paginated subset of DAOs
	paginatedDaos := userDaos[start:end]

	var nextKey []byte
	if uint64(end) < totalCount {
		// If there are more results, set the next key
		// Since we're working with a slice, we can use the index as the key
		nextKey = []byte(fmt.Sprintf("%d", end))
	}

	return &types.QueryAllUserDaoResponse{
		Dao: paginatedDaos,
		Pagination: &query.PageResponse{
			NextKey: nextKey,
			Total:   totalCount,
		},
	}, nil
}

func (k Keeper) Dao(c context.Context, req *types.QueryGetDaoRequest) (*types.QueryGetDaoResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	address, err := k.ResolveAddress(ctx, req.Id)
	if err != nil {
		return nil, status.Error(codes.NotFound, err.Error())
	}

	dao, found := k.GetDao(ctx, address.Address)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	return &types.QueryGetDaoResponse{Dao: &dao}, nil
}
