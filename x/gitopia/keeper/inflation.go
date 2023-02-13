package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	minttypes "github.com/cosmos/cosmos-sdk/x/mint/types"
	"github.com/gitopia/gitopia/app/params"
)

const MAX_SUPPLY = 1711136433

func (k Keeper) InflationFn(ctx sdk.Context, minter minttypes.Minter, mintParams minttypes.Params, bondedRatio sdk.Dec) sdk.Dec {
	gitopiaParams := k.GetParams(ctx)

	if !gitopiaParams.NextInflationTime.IsZero() &&
		ctx.BlockTime().After(gitopiaParams.NextInflationTime) {
		// update inflation params
		mintParams.InflationMax = mintParams.InflationMax.Quo(sdk.NewDec(2))
		mintParams.InflationMin = mintParams.InflationMin.Quo(sdk.NewDec(2))
		k.mintKeeper.SetParams(ctx, mintParams)

		gitopiaParams.NextInflationTime = gitopiaParams.NextInflationTime.AddDate(2, 0, 0)
		k.SetParams(ctx, gitopiaParams)

		minter.Inflation = minter.Inflation.Quo(sdk.NewDec(2))
	}

	// minting stops.
	amount := k.bankKeeper.GetSupply(ctx, params.DefaultBondDenom)
	if  amount.IsGTE(sdk.NewCoin(params.DefaultBondDenom, sdk.NewInt(MAX_SUPPLY))){
		return sdk.ZeroDec()
	}

	return minter.NextInflationRate(mintParams, bondedRatio)
}
