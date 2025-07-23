package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/suite"

	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"

	"github.com/gitopia/gitopia/v6/app/apptesting"
	"github.com/gitopia/gitopia/v6/app/params"
	"github.com/gitopia/gitopia/v6/x/gitopia/keeper"
	"github.com/gitopia/gitopia/v6/x/gitopia/types"
)

type KeeperTestSuite struct {
	apptesting.KeeperTestHelper

	queryClient   types.QueryClient
	msgServer     types.MsgServer
	bankMsgServer banktypes.MsgServer
}

func TestKeeperTestSuite(t *testing.T) {
	suite.Run(t, new(KeeperTestSuite))
}

func (suite *KeeperTestSuite) SetupTest() {
	suite.Setup()
	fundAccsAmount := sdk.NewCoins(sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(1000)))
	for _, acc := range suite.TestAccs {
		suite.FundAcc(acc, fundAccsAmount)
	}
	suite.queryClient = types.NewQueryClient(suite.QueryHelper)
	suite.msgServer = keeper.NewMsgServerImpl(suite.App.GitopiaKeeper)
	suite.bankMsgServer = bankkeeper.NewMsgServerImpl(suite.App.BankKeeper)
}
