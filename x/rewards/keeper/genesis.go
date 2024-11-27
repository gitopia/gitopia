package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/v5/x/rewards/types"
)

func (k Keeper) CreateRewardsModuleAccount(ctx sdk.Context, params types.Params) error {
	if params.RewardSeries == nil {
		return sdkerrors.Wrap(sdkerrors.ErrAppConfig, "reward series empty")
	}

	for _, pool := range params.RewardSeries {
		err := k.MintRewardsModuleAccount(ctx, pool, types.SeriesModuleAccount(pool.Series))
		if err != nil {
			return err
		}
	}

	return nil
}

func (k Keeper) MintRewardsModuleAccount(ctx sdk.Context, rp *types.RewardPool, accountName string) error {
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
