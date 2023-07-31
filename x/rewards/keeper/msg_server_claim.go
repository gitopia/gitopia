package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/v2/x/rewards/types"
)

func (k msgServer) Claim(goCtx context.Context, msg *types.MsgClaim) (*types.MsgClaimResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	toAddr, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, "bad address "+msg.Creator)
	}

	rewards, found := k.GetReward(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "reward not found for address "+msg.Creator)
	}

	claimedRewards := []*types.ClaimResponseReward{}
	expiredRewards := []*types.ClaimResponseReward{}
	allClaimedRewards := []*types.ClaimResponseReward{}
	for i, _ := range rewards.Rewards {
		reward := rewards.Rewards[i]
		pool := k.getRewardPool(ctx, reward.Series)

		// pool expired but reward not claimed
		if !pool.EndTime.IsZero() &&
			pool.EndTime.Before(ctx.BlockTime()) && !reward.Amount.Equal(reward.ClaimedAmount){
				expiredRewards = append(expiredRewards, &types.ClaimResponseReward{
					Series: pool.Series,
					Amount: reward.Amount.Sub(reward.ClaimedAmount),
				})
			continue
		}

		if reward.Amount.IsZero() {
			continue
		}

		if reward.Amount.IsEqual(reward.ClaimedAmount) {
			allClaimedRewards = append(allClaimedRewards, &types.ClaimResponseReward{
				Series: pool.Series,
				Amount: reward.Amount.Sub(reward.ClaimedAmount),
			})
		}

		claimableAmount, err := k.GetTotalClaimableAmount(ctx, msg.Creator, reward.Amount)
		if err != nil {
			return nil, err
		}

		// claimedAmount cannot be greater than claimable amount
		// eligible reward already claimed. must complete more tasks
		if reward.ClaimedAmount.IsEqual(claimableAmount) {
			continue
		}

		balance := claimableAmount.Sub(reward.ClaimedAmount)
		balanceWithDecay, err := k.GetDecayedRewardAmount(ctx, balance, pool.Series)
		if err != nil {
			return nil, err
		}

		err = k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.SeriesModuleAccount(pool.Series), toAddr, sdk.Coins{balanceWithDecay})
		if err != nil {
			return nil, err
		}

		reward.ClaimedAmountWithDecay = reward.ClaimedAmount.Add(balanceWithDecay)
		reward.ClaimedAmount = claimableAmount

		allClaimedRewards = append(allClaimedRewards, &types.ClaimResponseReward{
			Series: pool.Series,
			Amount: balanceWithDecay,
		})

		claimedRewards = append(claimedRewards, &types.ClaimResponseReward{
			Series: pool.Series,
			Amount: balanceWithDecay,
		})
	}

	k.SetReward(ctx, rewards)

	return &types.MsgClaimResponse{
		ClaimedRewards: claimedRewards,
		ExpiredRewards: expiredRewards,
		AllClaimedRewards: allClaimedRewards,
	}, nil
}
