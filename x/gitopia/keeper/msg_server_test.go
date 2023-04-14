package keeper_test

import (
	"context"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/gitopia/gitopia/testutil/keeper"
	"github.com/gitopia/gitopia/x/gitopia/keeper"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	keepers, ctx := keepertest.AppKeepers(t)
	return keeper.NewMsgServerImpl(keepers.GitopiaKeeper), sdk.WrapSDKContext(ctx)
}
