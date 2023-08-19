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

func (k Keeper) BountyAll(c context.Context, req *types.QueryAllBountyRequest) (*types.QueryAllBountyResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var bountys []types.Bounty
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	bountyStore := prefix.NewStore(store, types.KeyPrefix(types.BountyKey))

	pageRes, err := query.Paginate(bountyStore, req.Pagination, func(key []byte, value []byte) error {
		var bounty types.Bounty
		if err := k.cdc.Unmarshal(value, &bounty); err != nil {
			return err
		}

		bountys = append(bountys, bounty)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllBountyResponse{Bounty: bountys, Pagination: pageRes}, nil
}

func (k Keeper) Bounty(c context.Context, req *types.QueryGetBountyRequest) (*types.QueryGetBountyResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(c)
	bounty, found := k.GetBounty(ctx, req.Id)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	return &types.QueryGetBountyResponse{Bounty: bounty}, nil
}
