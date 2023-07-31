package keeper_test

import (
	"strconv"
	"testing"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"

	"github.com/gitopia/gitopia/v2/app/params"
	keepertest "github.com/gitopia/gitopia/v2/testutil/keeper"
	"github.com/gitopia/gitopia/v2/x/rewards/keeper"
	"github.com/gitopia/gitopia/v2/x/rewards/types"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func TestRewardsMsgServerCreate(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	srv := keeper.NewMsgServerImpl(keepers.RewardKeeper)
	wctx := sdk.WrapSDKContext(ctx)
	p := types.DefaultParams()
	keepers.RewardKeeper.SetParams(ctx, p)
	creator := p.EvaluatorAddress

	for i := 0; i < 5; i++ {
		expected := &types.MsgCreateReward{
			Creator:   creator,
			Recipient: strconv.Itoa(i),
			Amount:    sdk.NewCoin(params.BaseCoinUnit, math.NewInt(10)),
		}
		_, err := srv.CreateReward(wctx, expected)
		require.NoError(t, err)
		_, found := keepers.RewardKeeper.GetReward(ctx,
			expected.Recipient,
		)
		require.True(t, found)
	}
}
