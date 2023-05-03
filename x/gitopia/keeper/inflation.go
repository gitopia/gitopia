package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	minttypes "github.com/cosmos/cosmos-sdk/x/mint/types"
	"github.com/gitopia/gitopia/app/params"
)

// https://github.com/cosmos/cosmos-sdk/issues/13308
// total max supply in ulore
const MAX_SUPPLY int64 = 1711136433 * 1000000

func (k Keeper) InflationFn(ctx sdk.Context, minter minttypes.Minter, mintParams minttypes.Params, bondedRatio sdk.Dec) sdk.Dec {
	gitopiaParams := k.GetParams(ctx)

	// skip inflation adjustment if minting has already stopped
	// same as when max supply has reached
	if minter.Inflation.IsZero() {
		return minter.Inflation
	}

	// minting stops.
	if k.bankKeeper.GetSupply(ctx, params.BaseCoinUnit).
		IsGTE(sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(MAX_SUPPLY))) {
		return sdk.ZeroDec()
	}

	if !gitopiaParams.NextInflationTime.IsZero() &&
		ctx.BlockTime().After(gitopiaParams.NextInflationTime) {
		// update inflation params
		mintParams.InflationMax = mintParams.InflationMax.Quo(sdk.NewDec(2))
		mintParams.InflationMin = mintParams.InflationMin.Quo(sdk.NewDec(2))
		k.mintKeeper.SetParams(ctx, mintParams)

		// probable next inflation time.
		// if max supply is already reached, inflation wont change at nextInflationTime
		gitopiaParams.NextInflationTime = gitopiaParams.NextInflationTime.AddDate(2, 0, 0)
		k.SetParams(ctx, gitopiaParams)

		minter.Inflation = minter.Inflation.Quo(sdk.NewDec(2))
	}

	return minter.NextInflationRate(mintParams, bondedRatio)
}
