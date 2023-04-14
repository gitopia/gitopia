package keeper_test

import (
	"context"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/app/keepers"
	keepertest "github.com/gitopia/gitopia/testutil/keeper"
	"github.com/gitopia/gitopia/x/gitopia/keeper"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	keepers, ctx := keepertest.AppKeepers(t)
	return keeper.NewMsgServerImpl(keepers.GitopiaKeeper), sdk.WrapSDKContext(ctx)
}

func setupMsgServerWithKeepers(t testing.TB) (types.MsgServer, context.Context, keepers.AppKeepers) {
	keepers, ctx := keepertest.AppKeepers(t)
	return keeper.NewMsgServerImpl(keepers.GitopiaKeeper), sdk.WrapSDKContext(ctx), keepers
}
