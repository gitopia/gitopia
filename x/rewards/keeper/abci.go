package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v3/x/rewards/types"
)

func (k Keeper) BeginBlocker(ctx sdk.Context) {
	params := k.GetParams(ctx)

	for _, pool := range params.RewardSeries {
		err := k.TransferRewardPoolBalance(ctx, pool, types.SeriesModuleAccount(pool.Series))
		if err != nil {
			panic(err)
		}
	}
}

func (k Keeper) TransferRewardPoolBalance(ctx sdk.Context, rewardPool *types.RewardPool, moduleAcc string) error {
	if !rewardPool.EndTime.IsZero() && rewardPool.EndTime.Before(ctx.BlockTime()) {
		rewardsModuleAddress := k.accountKeeper.GetModuleAddress(moduleAcc)
		rewardsModuleBalance := k.bankKeeper.GetAllBalances(ctx, rewardsModuleAddress)

		if !rewardsModuleBalance.Empty() {
			err := k.distrKeeper.FundCommunityPool(ctx, rewardsModuleBalance, rewardsModuleAddress)
			if err != nil {
				return err
			}
		}
	}
	return nil
}
