package keeper

import (
	"fmt"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) BeginBlocker(ctx sdk.Context) {
	gitopiaParams := k.GetParams(ctx)
	minterAccount := k.accountKeeper.GetModuleAccount(ctx, k.minterAccountName)
	mintedCoins := k.bankKeeper.GetAllBalances(ctx, minterAccount.GetAddress())

	remainingMintedCoins := mintedCoins
	if gitopiaParams.DistributionProportions.EcosystemProportion.Proportion > 0 {
		ecosystemCoins := mintedCoins.MulInt(math.NewInt(gitopiaParams.DistributionProportions.EcosystemProportion.Proportion)).QuoInt(sdk.NewInt(100))
		addr, err := sdk.AccAddressFromBech32(gitopiaParams.DistributionProportions.EcosystemProportion.Address)
		if err != nil {
			ctx.Logger().Error(fmt.Sprintf("bad address %v", err))
			panic(err)
		}
		err = k.bankKeeper.SendCoinsFromModuleToAccount(ctx, k.minterAccountName, addr, ecosystemCoins)
		if err != nil {
			ctx.Logger().Error(fmt.Sprintf("error distributing ecosystem proportion %v", err))
			panic(err)
		}
		remainingMintedCoins = remainingMintedCoins.Sub(ecosystemCoins...)
	}

	if gitopiaParams.DistributionProportions.TeamProportion.Proportion > 0 {
		teamCoins := mintedCoins.MulInt(math.NewInt(gitopiaParams.DistributionProportions.TeamProportion.Proportion)).QuoInt(sdk.NewInt(100))
		addr, err := sdk.AccAddressFromBech32(gitopiaParams.DistributionProportions.TeamProportion.Address)
		if err != nil {
			ctx.Logger().Error(fmt.Sprintf("bad address %v", err))
			panic(err)
		}
		err = k.bankKeeper.SendCoinsFromModuleToAccount(ctx, k.minterAccountName, addr, teamCoins)
		if err != nil {
			ctx.Logger().Error(fmt.Sprintf("error distributing team proportion %v", err))
			panic(err)
		}
		remainingMintedCoins = remainingMintedCoins.Sub(teamCoins...)
	}

	err := k.bankKeeper.SendCoinsFromModuleToModule(ctx, k.minterAccountName, k.feeCollectorAccount, remainingMintedCoins)
	if err != nil {
		ctx.Logger().Error(fmt.Sprintf("error distributing team proportion %v", err))
		panic(err)
	}
}
