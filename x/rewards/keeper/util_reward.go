package keeper

import (
	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
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
		Denom: totalReward.Denom,
	}
	// rounded
	return totalClaimableAmount, nil
}


func (k Keeper) GetDecayedRewardAmount(ctx sdk.Context, totalReward sdk.Coin) (sdk.Coin, error) {
	SERIES_ONE_REWARD_DECAY_PER_HOUR := 0.001
	params := k.GetParams(ctx)	
	duration := ctx.BlockTime().Sub(params.RewardSeries.SeriesOne.StartTime)
	decayedFactor := duration.Hours() * (1 - SERIES_ONE_REWARD_DECAY_PER_HOUR)
	totalReward.Amount = totalReward.Amount.Mul(math.NewInt((int64)(decayedFactor*100))).Quo(math.NewInt(100))

	return totalReward, nil
}