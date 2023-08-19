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

	user, found := k.GetUser(ctx, address.Address)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	var daos []*types.Dao
	store := ctx.KVStore(k.storeKey)
	userDaoStore := prefix.NewStore(store, types.KeyPrefix(types.GetUserDaoKeyForUserAddress(user.Creator)))

	pageRes, err := query.Paginate(userDaoStore, req.Pagination, func(key []byte, value []byte) error {
		var userDao types.UserDao
		if err := k.cdc.Unmarshal(value, &userDao); err != nil {
			return err
		}
		if dao, _ := k.GetDao(ctx, userDao.DaoAddress); found {
			daos = append(daos, &dao)
		}
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllUserDaoResponse{Dao: daos, Pagination: pageRes}, nil
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
