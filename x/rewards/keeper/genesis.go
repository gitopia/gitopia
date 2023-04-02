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

	err := k.MintRewardsModuleAccount(ctx, params.RewardSeries.SeriesOne)
	if err != nil {
		return err
	}

	err = k.MintRewardsModuleAccount(ctx, params.RewardSeries.SeriesTwo)
	if err != nil {
		return err
	}

	err = k.MintRewardsModuleAccount(ctx, params.RewardSeries.SeriesThree)
	if err != nil {
		return err
	}

	err = k.MintRewardsModuleAccount(ctx, params.RewardSeries.SeriesFour)
	if err != nil {
		return err
	}

	err = k.MintRewardsModuleAccount(ctx, params.RewardSeries.SeriesFive)
	if err != nil {
		return err
	}

	err = k.MintRewardsModuleAccount(ctx, params.RewardSeries.SeriesSix)
	if err != nil {
		return err
	}

	err = k.MintRewardsModuleAccount(ctx, params.RewardSeries.SeriesSeven)
	if err != nil {
		return err
	}

	return nil
}

func (k Keeper) MintRewardsModuleAccount(ctx sdk.Context, rp *types.RewardPool)error{
	if rp == nil {
		return sdkerrors.Wrap(sdkerrors.ErrAppConfig, "reward pool empty")
	}

	if rp.TotalAmount.IsZero() {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidCoins, "reward pool amount cannot be zero")
	}

	err := k.bankKeeper.MintCoins(ctx, types.RewardsSeriesOneAccount, sdk.Coins{rp.TotalAmount})
	if err != nil {
		return err
	}
	return nil
}