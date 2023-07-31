package keeper

import (
	"context"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	gitopiaparams "github.com/gitopia/gitopia/v2/app/params"
	"github.com/gitopia/gitopia/v2/x/rewards/types"
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

	pool := k.getRewardPool(ctx, msg.Series)
	if pool == nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrLogic, "pool not found")
	}

	if !pool.StartTime.IsZero() && ctx.BlockTime().Before(pool.StartTime) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "reward pool not active")
	}

	if !pool.StartTime.IsZero() && ctx.BlockTime().After(pool.EndTime) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "reward pool expired")
	}

	if pool.ClaimedAmount.IsEqual(pool.TotalAmount) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "reward pool claimed")
	}

	availablePoolBal := pool.TotalAmount.Sub(pool.ClaimedAmount)
	amount := sdk.NormalizeCoin(msg.Amount)
	if availablePoolBal.IsLT(msg.Amount) {
		// reward whatever is left in the reward pool
		amount = availablePoolBal
	}

	// Check if the value already exists
	recipientRewards, isFound := k.GetReward(
		ctx,
		msg.Recipient,
	)

	recipientReward := types.RecipientReward{
		Series:                 msg.Series,
		Creator:                msg.Creator,
		Amount:                 amount,
		ClaimedAmount:          sdk.NewCoin(gitopiaparams.BaseCoinUnit, math.NewInt(0)),
		ClaimedAmountWithDecay: sdk.NewCoin(gitopiaparams.BaseCoinUnit, math.NewInt(0)),
	}
	if isFound {
		for _, r := range recipientRewards.Rewards {
			if r.Series == msg.Series {
				return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "reward already exists for recipient for this pool")
			}
		}
	}
	recipientRewards.Rewards = append(recipientRewards.Rewards, &recipientReward)

	k.SetReward(
		ctx,
		recipientRewards,
	)

	pool.ClaimedAmount = pool.ClaimedAmount.Add(amount)
	k.setRewardPool(ctx, params, pool)

	return &types.MsgCreateRewardResponse{
		Amount: amount,
	}, nil
}
