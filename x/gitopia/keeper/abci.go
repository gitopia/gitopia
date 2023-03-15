package keeper

import (
	"fmt"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) BeginBlocker(ctx sdk.Context) {
	gitopiaParams := k.GetParams(ctx)
	minterAddress := k.accountKeeper.GetModuleAddress(k.minterAccountName)
	mintedCoins := k.bankKeeper.GetAllBalances(ctx, minterAddress)

	remainingMintedCoins := mintedCoins
	for _, d := range gitopiaParams.DistributionProportions {
		coins := mintedCoins.MulInt(math.NewInt(d.Proportion)).QuoInt(sdk.NewInt(100))
		if coins.IsZero() {
			continue
		}
		addr, err := sdk.AccAddressFromBech32(d.Address)
		if err != nil {
			ctx.Logger().Error(fmt.Sprintf("bad address %v", err))
			panic(err)
		}
		err = k.bankKeeper.SendCoinsFromModuleToAccount(ctx, k.minterAccountName, addr, coins)
		if err != nil {
			ctx.Logger().Error(fmt.Sprintf("error distributing proportion %v", err))
			panic(err)
		}
		remainingMintedCoins = remainingMintedCoins.Sub(coins...)
	}

	// move validator and delegator incentives into fee collector account,
	// to be distributed by cosmos-sdk distribution module.
	if err := k.bankKeeper.SendCoinsFromModuleToModule(ctx, k.minterAccountName, k.feeCollectorAccount, remainingMintedCoins); err != nil {
		ctx.Logger().Error(fmt.Sprintf("error distributing team proportion %v", err))
		panic(err)
	}
}