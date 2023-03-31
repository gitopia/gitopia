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
	rs := params.RewardSeries

	if rs.SeriesOne == nil {
		return sdkerrors.Wrap(sdkerrors.ErrAppConfig, "reward series 1 empty")
	}
	amount := rs.SeriesOne.TotalAmount

	if rs.SeriesTwo == nil {
		return sdkerrors.Wrap(sdkerrors.ErrAppConfig, "reward series 2 empty")
	}
	amount = amount.Add(rs.SeriesTwo.TotalAmount...)

	if rs.SeriesThree == nil {
		return sdkerrors.Wrap(sdkerrors.ErrAppConfig, "reward series 3 empty")
	}
	amount = amount.Add(rs.SeriesThree.TotalAmount...)

	if rs.SeriesFour == nil {
		return sdkerrors.Wrap(sdkerrors.ErrAppConfig, "reward series 4 empty")
	}
	amount = amount.Add(rs.SeriesFour.TotalAmount...)

	if rs.SeriesFive == nil {
		return sdkerrors.Wrap(sdkerrors.ErrAppConfig, "reward series 5 empty")
	}
	amount = amount.Add(rs.SeriesFive.TotalAmount...)

	if rs.SeriesSix == nil {
		return sdkerrors.Wrap(sdkerrors.ErrAppConfig, "reward series 6 empty")
	}
	amount = amount.Add(rs.SeriesSix.TotalAmount...)

	if rs.SeriesSeven == nil {
		return sdkerrors.Wrap(sdkerrors.ErrAppConfig, "reward series 7 empty")
	}
	amount = amount.Add(rs.SeriesSeven.TotalAmount...)

	if amount.IsZero(){
		return sdkerrors.Wrap(sdkerrors.ErrInvalidCoins, "reward amount cannot be zero")
	}

	err := k.bankKeeper.MintCoins(ctx, types.RewardsAccountName, amount)
	if err != nil {
		return err
	}
	return nil
}