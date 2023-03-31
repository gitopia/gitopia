package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	disttypes "github.com/cosmos/cosmos-sdk/x/distribution/types"
	"github.com/gitopia/gitopia/x/rewards/types"
)

func (k Keeper) BeginBlocker(ctx sdk.Context) {
	params := k.GetParams(ctx)

	if !params.RewardSeries.SeriesOne.Expiry.IsZero() &&
		params.RewardSeries.SeriesOne.Expiry.Before(ctx.BlockTime()) {
		rewardsModuleAddress := k.accountKeeper.GetModuleAddress(types.RewardsSeriesOneAccount)
		rewardsModuleBalance := k.bankKeeper.GetAllBalances(ctx, rewardsModuleAddress)

		if !rewardsModuleBalance.Empty() {
			k.bankKeeper.SendCoinsFromModuleToModule(ctx, types.RewardsSeriesOneAccount, disttypes.ModuleName, rewardsModuleBalance)
		}
	}

	if !params.RewardSeries.SeriesTwo.Expiry.IsZero() &&
		params.RewardSeries.SeriesTwo.Expiry.Before(ctx.BlockTime()) {
		rewardsModuleAddress := k.accountKeeper.GetModuleAddress(types.RewardsSeriesTwoAccount)
		rewardsModuleBalance := k.bankKeeper.GetAllBalances(ctx, rewardsModuleAddress)

		if !rewardsModuleBalance.Empty() {
			k.bankKeeper.SendCoinsFromModuleToModule(ctx, types.RewardsSeriesTwoAccount, disttypes.ModuleName, rewardsModuleBalance)
		}
	}

	if !params.RewardSeries.SeriesThree.Expiry.IsZero() &&
		params.RewardSeries.SeriesThree.Expiry.Before(ctx.BlockTime()) {
		rewardsModuleAddress := k.accountKeeper.GetModuleAddress(types.RewardsSeriesThreeAccount)
		rewardsModuleBalance := k.bankKeeper.GetAllBalances(ctx, rewardsModuleAddress)

		if !rewardsModuleBalance.Empty() {
			k.bankKeeper.SendCoinsFromModuleToModule(ctx, types.RewardsSeriesThreeAccount, disttypes.ModuleName, rewardsModuleBalance)
		}
	}

	if !params.RewardSeries.SeriesFour.Expiry.IsZero() &&
		params.RewardSeries.SeriesFour.Expiry.Before(ctx.BlockTime()) {
		rewardsModuleAddress := k.accountKeeper.GetModuleAddress(types.RewardsSeriesFourAccount)
		rewardsModuleBalance := k.bankKeeper.GetAllBalances(ctx, rewardsModuleAddress)

		if !rewardsModuleBalance.Empty() {
			k.bankKeeper.SendCoinsFromModuleToModule(ctx, types.RewardsSeriesFourAccount, disttypes.ModuleName, rewardsModuleBalance)
		}
	}

	if !params.RewardSeries.SeriesFive.Expiry.IsZero() &&
		params.RewardSeries.SeriesFive.Expiry.Before(ctx.BlockTime()) {
		rewardsModuleAddress := k.accountKeeper.GetModuleAddress(types.RewardsSeriesFiveAccount)
		rewardsModuleBalance := k.bankKeeper.GetAllBalances(ctx, rewardsModuleAddress)

		if !rewardsModuleBalance.Empty() {
			k.bankKeeper.SendCoinsFromModuleToModule(ctx, types.RewardsSeriesFiveAccount, disttypes.ModuleName, rewardsModuleBalance)
		}
	}

	if !params.RewardSeries.SeriesSix.Expiry.IsZero() &&
		params.RewardSeries.SeriesSix.Expiry.Before(ctx.BlockTime()) {
		rewardsModuleAddress := k.accountKeeper.GetModuleAddress(types.RewardsSeriesSixAccount)
		rewardsModuleBalance := k.bankKeeper.GetAllBalances(ctx, rewardsModuleAddress)

		if !rewardsModuleBalance.Empty() {
			k.bankKeeper.SendCoinsFromModuleToModule(ctx, types.RewardsSeriesSixAccount, disttypes.ModuleName, rewardsModuleBalance)
		}
	}

	if !params.RewardSeries.SeriesSeven.Expiry.IsZero() &&
		params.RewardSeries.SeriesSeven.Expiry.Before(ctx.BlockTime()) {
		rewardsModuleAddress := k.accountKeeper.GetModuleAddress(types.RewardsSeriesSevenAccount)
		rewardsModuleBalance := k.bankKeeper.GetAllBalances(ctx, rewardsModuleAddress)

		if !rewardsModuleBalance.Empty() {
			k.bankKeeper.SendCoinsFromModuleToModule(ctx, types.RewardsSeriesSevenAccount, disttypes.ModuleName, rewardsModuleBalance)
		}
	}

}
