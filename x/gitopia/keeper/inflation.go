package keeper

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	minttypes "github.com/cosmos/cosmos-sdk/x/mint/types"
)

const (
	MAX_TOTAL_SUPPLY = 1711136433
)

func (k Keeper) InflationFn(ctx sdk.Context, minter minttypes.Minter, params minttypes.Params, bondedRatio sdk.Dec) sdk.Dec {
	gitopiaParams := k.GetParams(ctx)

	fmt.Println("heelo")
	if ctx.BlockTime().After(gitopiaParams.NextInflationTime) {
		minter.Inflation = minter.Inflation.Quo(sdk.NewDec(2))
		params.InflationMax = params.InflationMax.Quo(sdk.NewDec(2))
		params.InflationMin = params.InflationMin.Quo(sdk.NewDec(2))
		k.mintKeeper.SetParams(ctx, params)
		gitopiaParams.NextInflationTime = gitopiaParams.NextInflationTime.AddDate(2, 0, 0)
		k.SetParams(ctx, gitopiaParams)
	}

	// TODO: stop minting after max total supply is reached
	// if k.mintKeeper.StakingTokenSupply(ctx).GTE(math.NewInt(MAX_TOTAL_SUPPLY)) {
		
	// }
	return minter.NextInflationRate(params, bondedRatio) 
}
