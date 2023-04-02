package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/rewards/types"
)

const (
	SERIES_ONE = 1
)

func (k msgServer) CreateReward(goCtx context.Context, msg *types.MsgCreateReward) (*types.MsgCreateRewardResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	params := k.GetParams(ctx)

	if params.EvaluatorAddress != msg.Creator {
		return nil, sdkerrors.Wrapf(sdkerrors.ErrUnauthorized, "user (%v) doesn't have permission to perform this operation", msg.Creator)
	}

	rewardpool := params.RewardSeries.SeriesOne
	if rewardpool.EndTime.Before(ctx.BlockTime()) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "series 1 reward pool expired")
	}

	if rewardpool.ClaimedAmount.IsEqual(rewardpool.TotalAmount) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "series 1 reward pool claimed")
	}

	availablePoolBal := rewardpool.TotalAmount.Sub(rewardpool.ClaimedAmount)
	amount := msg.Amount
	if availablePoolBal.IsLT(msg.Amount) {
		// reward whatever is left in the reward pool
		amount = availablePoolBal
	}

	// Check if the value already exists
	_, isFound := k.GetReward(
		ctx,
		msg.Recipient,
	)
	if isFound {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "index already set")
	}

	var reward = types.Reward{
		Creator:   msg.Creator,
		Recipient: msg.Recipient,
		Amount:    amount,
	}

	k.SetReward(
		ctx,
		reward,
	)

	rewardpool.ClaimedAmount = rewardpool.ClaimedAmount.Add(amount)
	params.RewardSeries.SeriesOne = rewardpool
	k.SetParams(ctx, params)

	return &types.MsgCreateRewardResponse{
		Amount: amount,
	}, nil
}