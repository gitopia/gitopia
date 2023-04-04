package keeper_test

import (
	"context"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
    "github.com/gitopia/gitopia/x/gitopia/types"
    "github.com/gitopia/gitopia/x/gitopia/keeper"
    keepertest "github.com/gitopia/gitopia/testutil/keeper"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.GitopiaKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
