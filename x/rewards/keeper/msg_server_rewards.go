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

func getSeries(rss []*types.RewardSeries, series int32) (*types.RewardSeries, error) {
	for _, rs := range rss {
		if rs.Series == series {
			return rs, nil
		}
	}
	return nil, sdkerrors.Wrapf(sdkerrors.ErrLogic, "series %d reward pool not found", series)
}

func addSeries(rss []*types.RewardSeries, series int32, s *types.RewardSeries) ([]*types.RewardSeries, error) {
	for _, rs := range rss {
		if rs.Series == series {
			*rs = *s
			return rss, nil
		}
	}
	return nil, sdkerrors.Wrapf(sdkerrors.ErrLogic, "series %d reward pool not found", series)
}

func (k msgServer) CreateReward(goCtx context.Context, msg *types.MsgCreateReward) (*types.MsgCreateRewardResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	params := k.GetParams(ctx)

	if params.EvaluatorAddress != msg.Creator {
		return nil, sdkerrors.Wrapf(sdkerrors.ErrUnauthorized, "user (%v) doesn't have permission to perform this operation", msg.Creator)
	}

	rs, err := getSeries(params.RewardSeries, SERIES_ONE)
	if err != nil {
		return nil, err
	}

	if rs.RewardPoolClaimed.IsEqual(rs.RewardPool) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "series 1 reward pool claimed")
	}

	availablePoolBal := rs.RewardPool.Sub(rs.RewardPoolClaimed...)
	amount := msg.Amount
	if availablePoolBal.IsAllLT(msg.Amount) {
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

	rs.RewardPoolClaimed = rs.RewardPoolClaimed.Add(amount...)
	params.RewardSeries, err = addSeries(params.RewardSeries, SERIES_ONE, rs)
	if err != nil {
		return nil, err
	}
	k.SetParams(ctx, params)

	return &types.MsgCreateRewardResponse{
		Amount: amount,
	}, nil
}
