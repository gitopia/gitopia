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

func (k Keeper) MemberAll(c context.Context, req *types.QueryAllMemberRequest) (*types.QueryAllMemberResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var members []types.Member
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	memberStore := prefix.NewStore(store, types.KeyPrefix(types.MemberKey))

	pageRes, err := query.Paginate(memberStore, req.Pagination, func(key []byte, value []byte) error {
		var member types.Member
		if err := k.cdc.Unmarshal(value, &member); err != nil {
			return err
		}

		members = append(members, member)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllMemberResponse{Member: members, Pagination: pageRes}, nil
}

func (k Keeper) DaoMemberAll(c context.Context, req *types.QueryAllDaoMemberRequest) (*types.QueryAllDaoMemberResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var members []types.Member
	ctx := sdk.UnwrapSDKContext(c)

	daoAddress, err := k.ResolveAddress(ctx, req.DaoId)
	if err != nil {
		return nil, err
	}

	store := ctx.KVStore(k.storeKey)
	memberStore := prefix.NewStore(store, []byte(types.GetMemberKeyForDaoAddress(daoAddress.Address)))

	pageRes, err := query.Paginate(memberStore, req.Pagination, func(key []byte, value []byte) error {
		var member types.Member
		if err := k.cdc.Unmarshal(value, &member); err != nil {
			return err
		}

		members = append(members, member)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllDaoMemberResponse{Member: members, Pagination: pageRes}, nil
}

func (k Keeper) DaoMember(c context.Context, req *types.QueryGetDaoMemberRequest) (*types.QueryGetDaoMemberResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(c)

	daoAddress, err := k.ResolveAddress(ctx, req.DaoId)
	if err != nil {
		return nil, err
	}
	userAddress, err := k.ResolveAddress(ctx, req.UserId)
	if err != nil {
		return nil, err
	}

	member, found := k.GetDaoMember(ctx, daoAddress.Address, userAddress.Address)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	return &types.QueryGetDaoMemberResponse{Member: member}, nil
}
