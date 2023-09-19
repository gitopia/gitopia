package keeper

import (
	"time"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/v3/x/rewards/types"
)

func (k Keeper) GetTotalClaimableAmount(ctx sdk.Context, addr string, totalReward sdk.Coin) (sdk.Coin, error) {
	tasks, err := k.getTasks(ctx, addr)
	if err != nil {
		return sdk.Coin{}, err
	}

	totalClaimablePercent := int64(0)
	for _, task := range tasks {
		if task.IsComplete {
			totalClaimablePercent += (int64)(task.Weight)
			if totalClaimablePercent > 100 {
				return sdk.Coin{}, sdkerrors.Wrap(sdkerrors.ErrLogic, "cannot reward more than 100 percent!")
			}
		}
	}

	totalClaimableAmount := sdk.Coin{
		Amount: totalReward.Amount.Mul(math.NewInt(totalClaimablePercent)).Quo(math.NewInt(100)),
		Denom:  totalReward.Denom,
	}
	// rounded
	return totalClaimableAmount, nil
}

func (k Keeper) GetDecayedRewardAmount(ctx sdk.Context, totalReward sdk.Coin, series types.Series) (sdk.Coin, error) {
	SERIES_ONE_REWARD_DECAY_PER_DAY := 0.01
	pool := k.getRewardPool(ctx, series)

	if pool == nil {
		return sdk.Coin{}, sdkerrors.Wrap(sdkerrors.ErrNotFound, "reward pool not found")
	}

	// no decay
	if pool.StartTime.IsZero() ||
		pool.EndTime.IsZero() {
		return totalReward, nil
	}

	if ctx.BlockTime().After(pool.EndTime) {
		return sdk.Coin{}, nil
	}
	duration := ctx.BlockTime().Sub(pool.StartTime)
	if duration < time.Duration(0) {
		duration = time.Duration(0)
	}
	decayedFactor := 1 - (SERIES_ONE_REWARD_DECAY_PER_DAY * (duration.Hours() / 24))
	totalReward.Amount = totalReward.Amount.Mul(math.NewInt((int64)(decayedFactor * 100))).Quo(math.NewInt(100))

	return totalReward, nil
}

func (k Keeper) getRewardPool(ctx sdk.Context, series types.Series) *types.RewardPool {
	params := k.GetParams(ctx)

	for _, p := range params.RewardSeries {
		if p.Series == series {
			return p
		}
	}
	return nil
}

func (k Keeper) setRewardPool(ctx sdk.Context, params types.Params, pool *types.RewardPool) {
	for i, _ := range params.RewardSeries {
		if params.RewardSeries[i].Series == pool.Series {
			params.RewardSeries[i] = pool
		}
	}

	k.SetParams(ctx, params)
}
