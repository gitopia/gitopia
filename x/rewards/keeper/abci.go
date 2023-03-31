package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	disttypes "github.com/cosmos/cosmos-sdk/x/distribution/types"
	"github.com/gitopia/gitopia/x/rewards/types"
)

func (k Keeper) BeginBlocker(ctx sdk.Context) {
	params := k.GetParams(ctx)

	err := k.TransferRewardPoolBalance(ctx, params.RewardSeries.SeriesOne, types.RewardsSeriesOneAccount)
	if err != nil {
		panic(err)
	}

	err = k.TransferRewardPoolBalance(ctx, params.RewardSeries.SeriesTwo, types.RewardsSeriesTwoAccount)
	if err != nil {
		panic(err)
	}

	err = k.TransferRewardPoolBalance(ctx, params.RewardSeries.SeriesThree, types.RewardsSeriesThreeAccount)
	if err != nil {
		panic(err)
	}

	err = k.TransferRewardPoolBalance(ctx, params.RewardSeries.SeriesFour, types.RewardsSeriesFourAccount)
	if err != nil {
		panic(err)
	}

	err = k.TransferRewardPoolBalance(ctx, params.RewardSeries.SeriesFive, types.RewardsSeriesFiveAccount)
	if err != nil {
		panic(err)
	}

	err = k.TransferRewardPoolBalance(ctx, params.RewardSeries.SeriesSix, types.RewardsSeriesSixAccount)
	if err != nil {
		panic(err)
	}

	err = k.TransferRewardPoolBalance(ctx, params.RewardSeries.SeriesSeven, types.RewardsSeriesSevenAccount)
	if err != nil {
		panic(err)
	}
}

func (k Keeper) TransferRewardPoolBalance(ctx sdk.Context, rewardPool *types.RewardPool, moduleAcc string) error {
	if !rewardPool.Expiry.IsZero() && rewardPool.Expiry.Before(ctx.BlockTime()) {
		rewardsModuleAddress := k.accountKeeper.GetModuleAddress(moduleAcc)
		rewardsModuleBalance := k.bankKeeper.GetAllBalances(ctx, rewardsModuleAddress)

		if !rewardsModuleBalance.Empty() {
			err := k.bankKeeper.SendCoinsFromModuleToModule(ctx, moduleAcc, disttypes.ModuleName, rewardsModuleBalance)
			if err != nil {
				return err
			}
		}
	}
	return nil
}
