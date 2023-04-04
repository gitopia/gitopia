package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/rewards/types"
)

func (k Keeper) CreateRewardsModuleAccount(ctx sdk.Context, params types.Params) error {
	if params.RewardSeries == nil {
		return sdkerrors.Wrap(sdkerrors.ErrAppConfig, "reward series empty")
	}

	err := k.MintRewardsModuleAccount(ctx, params.RewardSeries.SeriesOne, types.RewardsSeriesOneAccount)
	if err != nil {
		return err
	}

	err = k.MintRewardsModuleAccount(ctx, params.RewardSeries.SeriesTwo, types.RewardsSeriesTwoAccount)
	if err != nil {
		return err
	}

	err = k.MintRewardsModuleAccount(ctx, params.RewardSeries.SeriesThree, types.RewardsSeriesThreeAccount)
	if err != nil {
		return err
	}

	err = k.MintRewardsModuleAccount(ctx, params.RewardSeries.SeriesFour, types.RewardsSeriesFourAccount)
	if err != nil {
		return err
	}

	err = k.MintRewardsModuleAccount(ctx, params.RewardSeries.SeriesFive, types.RewardsSeriesFiveAccount)
	if err != nil {
		return err
	}

	err = k.MintRewardsModuleAccount(ctx, params.RewardSeries.SeriesSix, types.RewardsSeriesSixAccount)
	if err != nil {
		return err
	}

	err = k.MintRewardsModuleAccount(ctx, params.RewardSeries.SeriesSeven, types.RewardsSeriesSevenAccount)
	if err != nil {
		return err
	}

	return nil
}

func (k Keeper) MintRewardsModuleAccount(ctx sdk.Context, rp *types.RewardPool, accountName string)error{
	if rp == nil {
		return sdkerrors.Wrap(sdkerrors.ErrAppConfig, "reward pool empty")
	}

	if rp.TotalAmount.IsZero() {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidCoins, "reward pool amount cannot be zero")
	}

	err := k.bankKeeper.MintCoins(ctx, accountName, sdk.Coins{rp.TotalAmount})
	if err != nil {
		return err
	}
	return nil
}