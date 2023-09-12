package keeper_test

import (
	"context"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/gitopia/gitopia/v3/testutil/keeper"
	"github.com/gitopia/gitopia/v3/x/rewards/keeper"
	"github.com/gitopia/gitopia/v3/x/rewards/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	keepers, ctx := keepertest.AppKeepers(t)
	return keeper.NewMsgServerImpl(keepers.RewardKeeper), sdk.WrapSDKContext(ctx)
}
