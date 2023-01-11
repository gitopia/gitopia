package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	minttypes "github.com/cosmos/cosmos-sdk/x/mint/types"
)

func (k Keeper) InflationFn(ctx sdk.Context, minter minttypes.Minter, params minttypes.Params, bondedRatio sdk.Dec) sdk.Dec {
	gitopiaParams := k.GetParams(ctx)

	if !gitopiaParams.NextInflationTime.IsZero() &&
		ctx.BlockTime().After(gitopiaParams.NextInflationTime) {
		minter.Inflation = minter.Inflation.Quo(sdk.NewDec(2))
		params.InflationMax = params.InflationMax.Quo(sdk.NewDec(2))
		params.InflationMin = params.InflationMin.Quo(sdk.NewDec(2))
		k.mintKeeper.SetParams(ctx, params)
		gitopiaParams.NextInflationTime = gitopiaParams.NextInflationTime.AddDate(2, 0, 0)
		k.SetParams(ctx, gitopiaParams)
	}

	return minter.NextInflationRate(params, bondedRatio)
}
