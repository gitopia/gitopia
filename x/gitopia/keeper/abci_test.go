package keeper_test

import (
	"testing"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	"github.com/cosmos/cosmos-sdk/x/bank/testutil"
	"github.com/gitopia/gitopia/app/params"
	"github.com/gitopia/gitopia/testutil/simapp"
	"github.com/gitopia/gitopia/x/gitopia/types"
	gitopiatypes "github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	tmtypes "github.com/tendermint/tendermint/proto/tendermint/types"
)

func TestTokenDistributionSucessNoDistribution(t *testing.T) {
	app := simapp.Setup(t)
	ctx := app.BaseApp.NewContext(false, tmtypes.Header{Height: 1, ChainID: "gitopia-1", Time: time.Now().UTC()})
	gParams := gitopiatypes.Params{}
	minter := gitopiatypes.MinterAccountName
	feeCollector := authtypes.FeeCollectorName
	gitopiaKeeper := app.GitopiaKeeper
	bankKeeper := app.BankKeeper
	accountKeeper := app.AccountKeeper

	// setup
	err := testutil.FundModuleAccount(bankKeeper, ctx, minter, sdk.NewCoins(sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(50))))
	assert.NoError(t, err)
	gitopiaKeeper.SetParams(ctx, gParams)

	gitopiaKeeper.TokenDistribution(ctx)

	assert.Equal(t, sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(50)), bankKeeper.GetBalance(ctx, accountKeeper.GetModuleAddress(feeCollector), "utlore"))
	assert.Equal(t, sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(0)), bankKeeper.GetBalance(ctx, accountKeeper.GetModuleAddress(minter), "utlore"))
}

func TestTokenDistributionSucessWithBadEcosystemAddress(t *testing.T) {
	app := simapp.Setup(t)
	ctx := app.BaseApp.NewContext(false, tmtypes.Header{Height: 1, ChainID: "gitopia-1", Time: time.Now().UTC()})
	gParams := gitopiatypes.Params{
		PoolProportions: types.PoolProportions{
			Ecosystem: &types.DistributionProportion{
				Address: "bad_addr",
			},
		},
	}
	gitopiaKeeper := app.GitopiaKeeper
	gitopiaKeeper.SetParams(ctx, gParams)

	require.Panics(t, func() {
		gitopiaKeeper.TokenDistribution(ctx)
	})
}

func TestTokenDistributionSucessWithNonEmptyTeamAddress(t *testing.T) {
	app := simapp.Setup(t)
	ctx := app.BaseApp.NewContext(false, tmtypes.Header{Height: 1, ChainID: "gitopia-1", Time: time.Now().UTC()})
	gParams := gitopiatypes.Params{
		PoolProportions: types.PoolProportions{
			Team: &types.DistributionProportion{
				Address: "addr",
			},
		},
	}
	gitopiaKeeper := app.GitopiaKeeper
	gitopiaKeeper.SetParams(ctx, gParams)

	require.Panics(t, func() {
		gitopiaKeeper.TokenDistribution(ctx)
	})
}

func TestTokenDistributionSucess(t *testing.T) {
	app := simapp.Setup(t)
	ctx := app.BaseApp.NewContext(false, tmtypes.Header{Height: 1, ChainID: "gitopia-1", Time: time.Now().UTC()})
	gParams := gitopiatypes.Params{
		PoolProportions: types.PoolProportions{
			Ecosystem: &types.DistributionProportion{
				Proportion: 40,
				Address:    "gitopia1rrad3vleav3svu7tutqp9sqqv9mh4gex62vjvm",
			},
			Team: &types.DistributionProportion{
				Proportion: 25,
			},
		},
	}
	minter := gitopiatypes.MinterAccountName
	feeCollector := authtypes.FeeCollectorName
	gitopiaKeeper := app.GitopiaKeeper
	bankKeeper := app.BankKeeper
	accountKeeper := app.AccountKeeper

	// setup
	err := testutil.FundModuleAccount(bankKeeper, ctx, minter, sdk.NewCoins(sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(50))))
	assert.NoError(t, err)
	gitopiaKeeper.SetParams(ctx, gParams)

	gitopiaKeeper.TokenDistribution(ctx)

	// NOTE: 65% of 100 is 32.5. 50-32 = 18
	assert.Equal(t, sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(18)), bankKeeper.GetBalance(ctx, accountKeeper.GetModuleAddress(feeCollector), "utlore"))
	assert.Equal(t, sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(0)), bankKeeper.GetBalance(ctx, accountKeeper.GetModuleAddress(minter), "utlore"))

	accAdrr, _ := sdk.AccAddressFromBech32("gitopia1rrad3vleav3svu7tutqp9sqqv9mh4gex62vjvm")
	assert.Equal(t, sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(20)), bankKeeper.GetBalance(ctx, accAdrr, "utlore"))
	accAdrr = accountKeeper.GetModuleAddress(types.TeamAccountName)
	// NOTE: 25% of 50 is 12.5
	assert.Equal(t, sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(12)), bankKeeper.GetBalance(ctx, accAdrr, "utlore"))
}

func TestTokenDistributionSucessWhenNoTokenMinted(t *testing.T) {
	app := simapp.Setup(t)
	ctx := app.BaseApp.NewContext(false, tmtypes.Header{Height: 1, ChainID: "gitopia-1", Time: time.Now().UTC()})
	gParams := gitopiatypes.Params{
		PoolProportions: types.PoolProportions{
			Ecosystem: &types.DistributionProportion{
				Proportion: 40,
				Address:    "gitopia1rrad3vleav3svu7tutqp9sqqv9mh4gex62vjvm",
			},
			Team: &types.DistributionProportion{
				Proportion: 25,
			},
		},
	}
	minter := gitopiatypes.MinterAccountName
	feeCollector := authtypes.FeeCollectorName
	gitopiaKeeper := app.GitopiaKeeper
	bankKeeper := app.BankKeeper
	accountKeeper := app.AccountKeeper

	gitopiaKeeper.SetParams(ctx, gParams)

	gitopiaKeeper.TokenDistribution(ctx)

	assert.Equal(t, sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(0)), bankKeeper.GetBalance(ctx, accountKeeper.GetModuleAddress(feeCollector), "utlore"))
	assert.Equal(t, sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(0)), bankKeeper.GetBalance(ctx, accountKeeper.GetModuleAddress(minter), "utlore"))

	accAdrr, _ := sdk.AccAddressFromBech32("gitopia1rrad3vleav3svu7tutqp9sqqv9mh4gex62vjvm")
	assert.Equal(t, sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(0)), bankKeeper.GetBalance(ctx, accAdrr, "utlore"))
}
