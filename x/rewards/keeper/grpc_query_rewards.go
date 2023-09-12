package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/gitopia/gitopia/v3/x/rewards/types"
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

		for i, _ := range reward.Rewards {
			totalReward, err := k.GetDecayedRewardAmount(ctx, reward.Rewards[i].Amount, reward.Rewards[i].Series)
			if err != nil {
				return err
			}
			reward.Rewards[i].Amount = totalReward
		}

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

	responseRewards := []types.QueryGetRewardResponseReward{}
	allRewards, found := k.GetReward(
		ctx,
		req.Recipient,
	)
	if !found {
		return nil, status.Error(codes.NotFound, "reward not found")
	}

	for _, reward := range allRewards.Rewards {
		totalClaimableAmount, err := k.GetTotalClaimableAmount(ctx, req.Recipient, reward.Amount)
		if err != nil {
			return nil, err
		}

		claimableAmount := totalClaimableAmount.Sub(reward.ClaimedAmount)
		claimableAmountWithDecay, err := k.GetDecayedRewardAmount(ctx, claimableAmount, reward.Series)
		if err != nil {
			return nil, err
		}

		remainingClaimableAmountWithDecay, err := k.GetDecayedRewardAmount(ctx, reward.Amount.Sub(totalClaimableAmount), reward.Series)
		if err != nil {
			return nil, err
		}
		responseRewards = append(responseRewards, types.QueryGetRewardResponseReward{
			Series:                   reward.Series,
			Amount:                   reward.Amount,
			Creator:                  reward.Creator,
			ClaimedAmount:            reward.ClaimedAmountWithDecay,
			ClaimableAmount:          claimableAmountWithDecay,
			RemainingClaimableAmount: remainingClaimableAmountWithDecay,
		})
	}

	return &types.QueryGetRewardResponse{
		Recipient: req.Recipient,
		Rewards:   responseRewards,
	}, nil
}
