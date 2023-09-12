package keeper

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v3/app/params"
	"github.com/gitopia/gitopia/v3/x/gitopia/types"
	"github.com/pkg/errors"
)

func (k Keeper) TransferProportion(
	ctx sdk.Context,
	totalCoin sdk.Coin,
	from string,
	to string,
	proportion sdk.Dec) (sdk.Coins, error) {
	dec := sdk.NewDec(totalCoin.Amount.Int64())
	amount := dec.Mul(proportion).Quo(sdk.NewDec(100)).TruncateInt()
	if amount.IsZero() {
		return nil, nil
	}

	coin := sdk.NewCoin(params.BaseCoinUnit, amount)
	coins := sdk.Coins{coin}

	err := k.bankKeeper.SendCoinsFromModuleToModule(ctx, from, to, coins)
	if err != nil {
		return nil, errors.Wrapf(err, "error distributing to %v", to)
	}
	return coins, nil
}

func (k Keeper) TokenDistribution(ctx sdk.Context) {
	gitopiaParams := k.GetParams(ctx)
	minterAddress := k.accountKeeper.GetModuleAddress(k.minterAccountName)
	mintedCoin := k.bankKeeper.GetBalance(ctx, minterAddress, params.BaseCoinUnit)
	remainingMintedCoins := sdk.Coins{mintedCoin}

	if gitopiaParams.PoolProportions.Ecosystem != nil {
		if gitopiaParams.PoolProportions.Ecosystem.Address != "" {
			err := errors.New("ecosystem incentives address not empty")
			ctx.Logger().Error(err.Error())
			panic(err)
		}
		coins, err := k.TransferProportion(ctx, mintedCoin, k.minterAccountName, types.EcosystemIncentivesAccountName,
			gitopiaParams.PoolProportions.Ecosystem.Proportion)
		if err != nil {
			ctx.Logger().Error(err.Error())
			panic(err)
		}
		remainingMintedCoins = remainingMintedCoins.Sub(coins...)
	}

	if gitopiaParams.PoolProportions.Team != nil {
		if gitopiaParams.PoolProportions.Team.Address != "" {
			err := errors.New("team address not empty")
			ctx.Logger().Error(err.Error())
			panic(err)
		}
		coins, err := k.TransferProportion(ctx, mintedCoin, k.minterAccountName, types.TeamAccountName, gitopiaParams.PoolProportions.Team.Proportion)
		if err != nil {
			ctx.Logger().Error(err.Error())
			panic(err)
		}
		remainingMintedCoins = remainingMintedCoins.Sub(coins...)
	}

	if gitopiaParams.PoolProportions.Platform != nil {
		if gitopiaParams.PoolProportions.Platform.Address != "" {
			err := errors.New("platform address not empty")
			ctx.Logger().Error(err.Error())
			panic(err)
		}
		coins, err := k.TransferProportion(ctx, mintedCoin, k.minterAccountName, types.PlatformAccountName, gitopiaParams.PoolProportions.Platform.Proportion)
		if err != nil {
			ctx.Logger().Error(err.Error())
			panic(err)
		}
		remainingMintedCoins = remainingMintedCoins.Sub(coins...)
	}

	// move community, validator and delegator incentives into fee collector account,
	// to be distributed by cosmos-sdk distribution module.
	if err := k.bankKeeper.SendCoinsFromModuleToModule(ctx, k.minterAccountName, k.feeCollectorAccount, remainingMintedCoins); err != nil {
		ctx.Logger().Error(fmt.Sprintf("error distributing community and staking proportion %v", err))
		panic(err)
	}
}
