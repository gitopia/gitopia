package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/gitopia/gitopia/v2/x/rewards/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) RewardsAll(c context.Context, req *types.QueryAllRewardsRequest) (*types.QueryAllRewardsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var rewards []types.Reward
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	rewardsStore := prefix.NewStore(store, types.KeyPrefix(types.RewardsKeyPrefix))

	pageRes, err := query.Paginate(rewardsStore, req.Pagination, func(key []byte, value []byte) error {
		var reward types.Reward
		if err := k.cdc.Unmarshal(value, &reward); err != nil {
			return err
		}

		totalReward, err := k.GetDecayedRewardAmount(ctx, reward.Amount)
		if err != nil {
			return err
		}
		reward.Amount = totalReward
		rewards = append(rewards, reward)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllRewardsResponse{Rewards: rewards, Pagination: pageRes}, nil
}

func (k Keeper) Reward(c context.Context, req *types.QueryGetRewardRequest) (*types.QueryGetRewardResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	reward, found := k.GetReward(
		ctx,
		req.Recipient,
	)
	if !found {
		return nil, status.Error(codes.NotFound, "reward not found")
	}

	totalClaimableAmount, err := k.GetTotalClaimableAmount(ctx, req.Recipient, reward.Amount)
	if err != nil {
		return nil, err
	}

	claimableAmount := totalClaimableAmount.Sub(reward.ClaimedAmount)
	claimableAmountWithDecay, err := k.GetDecayedRewardAmount(ctx, claimableAmount)
	if err != nil {
		return nil, err
	}

	remainingClaimableAmountWithDecay, err := k.GetDecayedRewardAmount(ctx, reward.Amount.Sub(totalClaimableAmount))
	if err != nil {
		return nil, err
	}

	return &types.QueryGetRewardResponse{
		Reward: types.QueryGetRewardResponseReward{
			Recipient:                reward.Recipient,
			Amount:                   reward.Amount,
			Creator:                  reward.Creator,
			ClaimedAmount:            reward.ClaimedAmountWithDecay,
			ClaimableAmount:          claimableAmountWithDecay,
			RemainingClaimableAmount: remainingClaimableAmountWithDecay,
		},
	}, nil
}
