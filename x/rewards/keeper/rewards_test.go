package keeper_test

import (
	"strconv"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/gitopia/gitopia/testutil/keeper"
	"github.com/gitopia/gitopia/testutil/nullify"
	"github.com/gitopia/gitopia/testutil/sample"
	"github.com/gitopia/gitopia/x/rewards/keeper"
	"github.com/gitopia/gitopia/x/rewards/types"
	"github.com/stretchr/testify/require"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func createNRewards(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.Reward {
	items := make([]types.Reward, n)
	for i := range items {
		items[i].Recipient = sample.AccAddress()

		keeper.SetReward(ctx, items[i])
	}
	return items
}

func TestRewardsGet(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	items := createNRewards(&keepers.RewardKeeper, ctx, 10)
	for _, item := range items {
		rst, found := keepers.RewardKeeper.GetReward(ctx,
			item.Recipient,
		)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&rst),
		)
	}
}
func TestRewardsRemove(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	items := createNRewards(&keepers.RewardKeeper, ctx, 10)
	for _, item := range items {
		keepers.RewardKeeper.RemoveReward(ctx,
			item.Recipient,
		)
		_, found := keepers.RewardKeeper.GetReward(ctx,
			item.Recipient,
		)
		require.False(t, found)
	}
}

func TestRewardsGetAll(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	items := createNRewards(&keepers.RewardKeeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keepers.RewardKeeper.GetAllRewards(ctx)),
	)
}
