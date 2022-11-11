package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/gitopia/gitopia/x/rewards/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) RewardsAll(c context.Context, req *types.QueryAllRewardsRequest) (*types.QueryAllRewardsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var rewardss []types.Rewards
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	rewardsStore := prefix.NewStore(store, types.KeyPrefix(types.RewardsKeyPrefix))

	pageRes, err := query.Paginate(rewardsStore, req.Pagination, func(key []byte, value []byte) error {
		var rewards types.Rewards
		if err := k.cdc.Unmarshal(value, &rewards); err != nil {
			return err
		}

		rewardss = append(rewardss, rewards)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllRewardsResponse{Rewards: rewardss, Pagination: pageRes}, nil
}

func (k Keeper) Rewards(c context.Context, req *types.QueryGetRewardsRequest) (*types.QueryGetRewardsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	val, found := k.GetRewards(
	    ctx,
	    req.Recipient,
        )
	if !found {
	    return nil, status.Error(codes.NotFound, "not found")
	}

	return &types.QueryGetRewardsResponse{Rewards: val}, nil
}

func (k Keeper) RewardForCreator(c context.Context, req *types.QueryGetRewardForCreatorRequest) (*types.QueryGetRewardForCreatorResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	val, found := k.GetRewardForCreator(
	    ctx,
	    req.Recipient,
		req.Creator,
        )
	if !found {
	    return nil, status.Error(codes.NotFound, "not found")
	}

	return &types.QueryGetRewardForCreatorResponse{Reward: val}, nil
}