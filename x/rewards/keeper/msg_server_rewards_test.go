package keeper_test

import (
    "strconv"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"

    keepertest "github.com/gitopia/gitopia/testutil/keeper"
    "github.com/gitopia/gitopia/x/rewards/keeper"
    "github.com/gitopia/gitopia/x/rewards/types"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func TestRewardMsgServerCreate(t *testing.T) {
	k, ctx := keepertest.RewardsKeeper(t)
	srv := keeper.NewMsgServerImpl(*k)
	wctx := sdk.WrapSDKContext(ctx)
	creator := "A"
	for i := 0; i < 5; i++ {
		expected := &types.MsgCreateReward{Creator: creator,
		    Recipient: strconv.Itoa(i),
            
		}
		_, err := srv.CreateReward(wctx, expected)
		require.NoError(t, err)
		rst, found := k.GetRewards(ctx,
		    expected.Recipient,
            
		)
		require.True(t, found)
		require.Equal(t, expected.Creator, rst.Creator)
	}
}
