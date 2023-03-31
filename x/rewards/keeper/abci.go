package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	disttypes "github.com/cosmos/cosmos-sdk/x/distribution/types"
	"github.com/gitopia/gitopia/x/rewards/types"
)

func (k Keeper) BeginBlocker(ctx sdk.Context) {
	params := k.GetParams(ctx)
	rewardsModuleAddress := k.accountKeeper.GetModuleAddress(types.RewardsSeriesOneAccount)
	rewardsModuleBalance := k.bankKeeper.GetAllBalances(ctx, rewardsModuleAddress)

	if !params.RewardSeries.SeriesOne.Expiry.IsZero() &&
		params.RewardSeries.SeriesOne.Expiry.Before(ctx.BlockTime()) &&
		!rewardsModuleBalance.Empty() {
		k.bankKeeper.SendCoinsFromModuleToModule(ctx, types.RewardsSeriesOneAccount, disttypes.ModuleName, rewardsModuleBalance)
	}
}
