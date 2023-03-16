package keeper

import (
	"fmt"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/pkg/errors"
)

func (k Keeper) TransferProportion(
	ctx sdk.Context,
	totalCoins sdk.Coins,
	from string,
	to sdk.AccAddress,
	proportion int64) (sdk.Coins, error) {
	coins := totalCoins.MulInt(math.NewInt(proportion)).QuoInt(sdk.NewInt(100))
	if coins.IsZero() {
		return nil, nil
	}

	err := k.bankKeeper.SendCoinsFromModuleToAccount(ctx, from, to, coins)
	if err != nil {
		return nil, errors.Wrapf(err, "error distributing to %v", to)
	}
	return coins, nil
}

func (k Keeper) PoolDistribution(ctx sdk.Context) {
	gitopiaParams := k.GetParams(ctx)
	minterAddress := k.accountKeeper.GetModuleAddress(k.minterAccountName)
	mintedCoins := k.bankKeeper.GetAllBalances(ctx, minterAddress)
	remainingMintedCoins := mintedCoins

	if gitopiaParams.PoolProportions.Ecosystem != nil {
		addr, err := sdk.AccAddressFromBech32(gitopiaParams.PoolProportions.Ecosystem.Address)
		if err != nil {
			ctx.Logger().Error(errors.Wrap(err, "bad address").Error())
			panic(err)
		}

		coins, err := k.TransferProportion(ctx, mintedCoins, k.minterAccountName, addr,
			gitopiaParams.PoolProportions.Ecosystem.Proportion)
		if err != nil {
			ctx.Logger().Error(err.Error())
		}
		remainingMintedCoins = remainingMintedCoins.Sub(coins...)
	}

	if gitopiaParams.PoolProportions.Team != nil {
		if gitopiaParams.PoolProportions.Team.Address != "" {
			err := errors.New("team address not empty")
			ctx.Logger().Error(err.Error())
			panic(err)
		}
		teamAddress := k.accountKeeper.GetModuleAddress(types.TeamAccountName)
		coins, err := k.TransferProportion(ctx, mintedCoins, k.minterAccountName, teamAddress, gitopiaParams.PoolProportions.Team.Proportion)
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

func (k Keeper) DeveloperDistribution(ctx sdk.Context) {

}

func (k Keeper) TokenDistribution(ctx sdk.Context) {
	k.PoolDistribution(ctx)
	k.DeveloperDistribution(ctx)
}
