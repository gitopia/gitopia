package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/rewards/types"
)

func (k Keeper) CreateRewardsModuleAccount(ctx sdk.Context, params types.Params) error {
	amount := sdk.NewCoins()
	for _, series := range params.RewardSeries{
		amount = amount.Add(series.RewardPool...)
	}

	if amount.IsZero(){
		return sdkerrors.Wrap(sdkerrors.ErrInvalidCoins, "reward amount cannot be zero")
	}

	err := k.bankKeeper.MintCoins(ctx, types.RewardsAccountName, amount)
	if err != nil {
		return err
	}
	return nil
}