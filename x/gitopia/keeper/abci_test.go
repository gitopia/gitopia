package keeper_test

import (
	"testing"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	"github.com/cosmos/cosmos-sdk/x/bank/testutil"
	"github.com/gitopia/gitopia/app/params"
	"github.com/gitopia/gitopia/testutil/simapp"
	gitopiatypes "github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/stretchr/testify/assert"
	tmtypes "github.com/tendermint/tendermint/proto/tendermint/types"
)

func TestTokenDistributionSucessWithNoDistributionProportion(t *testing.T) {
	app := simapp.Setup(t)
	ctx := app.BaseApp.NewContext(false, tmtypes.Header{Height: 1, ChainID: "gitopia-1", Time: time.Now().UTC()})
	gParams := gitopiatypes.Params{
		DistributionProportions: []gitopiatypes.DistributionProportion{},
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

	gitopiaKeeper.BeginBlocker(ctx)

	assert.Equal(t, sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(50)), bankKeeper.GetBalance(ctx, accountKeeper.GetModuleAddress(feeCollector), params.BaseCoinUnit))
	assert.Equal(t, sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(0)), bankKeeper.GetBalance(ctx, accountKeeper.GetModuleAddress(minter), params.BaseCoinUnit))
}

func TestTokenDistributionSucess(t *testing.T) {
	app := simapp.Setup(t)
	ctx := app.BaseApp.NewContext(false, tmtypes.Header{Height: 1, ChainID: "gitopia-1", Time: time.Now().UTC()})
	gParams := gitopiatypes.Params{
		DistributionProportions: []gitopiatypes.DistributionProportion{
			{Address: "gitopia1rrad3vleav3svu7tutqp9sqqv9mh4gex62vjvm", Proportion: 40},
			{Address: "gitopia1njn3grh5ar4ccapyp4uehuq28wpk2sk5heu7ac", Proportion: 25},
			{Address: "gitopia1d5r0ql0pg5d8xfs5t0pmn7dl72m2zj2wchkfq3", Proportion: 5},
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

	gitopiaKeeper.BeginBlocker(ctx)

	assert.Equal(t, sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(16)), bankKeeper.GetBalance(ctx, accountKeeper.GetModuleAddress(feeCollector), params.BaseCoinUnit))
	assert.Equal(t, sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(0)), bankKeeper.GetBalance(ctx, accountKeeper.GetModuleAddress(minter), params.BaseCoinUnit))

	accAdrr, _ := sdk.AccAddressFromBech32("gitopia1rrad3vleav3svu7tutqp9sqqv9mh4gex62vjvm")
	assert.Equal(t, sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(20)), bankKeeper.GetBalance(ctx, accAdrr, params.BaseCoinUnit))
	accAdrr, _ = sdk.AccAddressFromBech32("gitopia1njn3grh5ar4ccapyp4uehuq28wpk2sk5heu7ac")
	// NOTE: 25% of 50 is 12.5
	assert.Equal(t, sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(12)), bankKeeper.GetBalance(ctx, accAdrr, params.BaseCoinUnit))
	accAdrr, _ = sdk.AccAddressFromBech32("gitopia1d5r0ql0pg5d8xfs5t0pmn7dl72m2zj2wchkfq3")
	// NOTE: 5% of 50 is 2.5
	assert.Equal(t, sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(2)), bankKeeper.GetBalance(ctx, accAdrr, params.BaseCoinUnit))
}

func TestTokenDistributionSucessWhenNoTokenMinted(t *testing.T) {
	app := simapp.Setup(t)
	ctx := app.BaseApp.NewContext(false, tmtypes.Header{Height: 1, ChainID: "gitopia-1", Time: time.Now().UTC()})
	gParams := gitopiatypes.Params{
		DistributionProportions: []gitopiatypes.DistributionProportion{
			{Address: "gitopia1rrad3vleav3svu7tutqp9sqqv9mh4gex62vjvm", Proportion: 40},
		},
	}
	minter := gitopiatypes.MinterAccountName
	feeCollector := authtypes.FeeCollectorName
	gitopiaKeeper := app.GitopiaKeeper
	bankKeeper := app.BankKeeper
	accountKeeper := app.AccountKeeper

	gitopiaKeeper.SetParams(ctx, gParams)

	gitopiaKeeper.BeginBlocker(ctx)

	assert.Equal(t, sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(0)), bankKeeper.GetBalance(ctx, accountKeeper.GetModuleAddress(feeCollector), params.BaseCoinUnit))
	assert.Equal(t, sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(0)), bankKeeper.GetBalance(ctx, accountKeeper.GetModuleAddress(minter), params.BaseCoinUnit))

	accAdrr, _ := sdk.AccAddressFromBech32("gitopia1rrad3vleav3svu7tutqp9sqqv9mh4gex62vjvm")
	assert.Equal(t, sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(0)), bankKeeper.GetBalance(ctx, accAdrr, params.BaseCoinUnit))
}
