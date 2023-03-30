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

	if _, ok := params.RewardSeries[SERIES_ONE]; !ok {
		return nil, sdkerrors.Wrapf(sdkerrors.ErrLogic, "series %d reward pool not found", SERIES_ONE)
	}

	rewardpool := params.RewardSeries[SERIES_ONE]
	if rewardpool.ClaimedAmount.IsEqual(rewardpool.TotalAmount) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "series 1 reward pool claimed")
	}

	availablePoolBal := rewardpool.TotalAmount.Sub(rewardpool.ClaimedAmount...)
	amount := msg.Amount
	if availablePoolBal.IsAllLT(msg.Amount) {
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

	rewardpool.ClaimedAmount = rewardpool.ClaimedAmount.Add(amount...)
	params.RewardSeries[SERIES_ONE] = rewardpool
	k.SetParams(ctx, params)

	return &types.MsgCreateRewardResponse{
		Amount: amount,
	}, nil
}
