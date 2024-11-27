package keeper_test

import (
	"context"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v5/app/keepers"
	keepertest "github.com/gitopia/gitopia/v5/testutil/keeper"
	"github.com/gitopia/gitopia/v5/x/gitopia/keeper"
	"github.com/gitopia/gitopia/v5/x/gitopia/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	keepers, ctx := keepertest.AppKeepers(t)
	return keeper.NewMsgServerImpl(keepers.GitopiaKeeper), sdk.WrapSDKContext(ctx)
}

func setupMsgServerWithKeepers(t testing.TB) (types.MsgServer, context.Context, keepers.AppKeepers) {
	keepers, ctx := keepertest.AppKeepers(t)
	return keeper.NewMsgServerImpl(keepers.GitopiaKeeper), sdk.WrapSDKContext(ctx), keepers
}
