package keeper_test

import (
	"testing"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	"github.com/gitopia/gitopia/app"
	"github.com/gitopia/gitopia/testutil/simapp"
	gitopiatypes "github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/stretchr/testify/assert"
	tmtypes "github.com/tendermint/tendermint/proto/tendermint/types"
)


func TestTokenDistributionSucess(t *testing.T){
	app := simapp.New(app.DefaultNodeHome)
	ctx := app.BaseApp.NewContext(false, tmtypes.Header{Height: 1, ChainID: "gitopia-1", Time: time.Now().UTC()})
	gParams := gitopiatypes.DefaultParams()
	minter := gitopiatypes.MinterAccountName
	feeCollector :=	authtypes.FeeCollectorName
	gitopiaKeeper := app.GitopiaKeeper
	bankKeeper := app.BankKeeper
	accountKeeper := app.AccountKeeper

	// setup
	bankKeeper.MintCoins(ctx, minter, sdk.NewCoins(sdk.NewCoin(sdk.DefaultBondDenom, sdk.NewInt(50))))
	gitopiaKeeper.SetParams(ctx, gParams)

	gitopiaKeeper.BeginBlocker(ctx)

	addr := accountKeeper.GetModuleAddress(feeCollector)
	assert.Equal(t, 10, bankKeeper.GetBalance(ctx, addr, "utlore"))
}