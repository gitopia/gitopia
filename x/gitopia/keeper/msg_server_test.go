package keeper_test

import (
	"context"
	"testing"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/gitopia/gitopia/testutil/keeper"
	"github.com/gitopia/gitopia/x/gitopia/keeper"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.GitopiaKeeper(t)
	c := sdk.UnwrapSDKContext(ctx)
	c = c.WithBlockTime(time.Now())
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(c)
}
