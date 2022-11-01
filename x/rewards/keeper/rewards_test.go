package keeper_test

import (
	"strconv"
	"testing"

	"github.com/gitopia/gitopia/x/rewards/keeper"
	"github.com/gitopia/gitopia/x/rewards/types"
	keepertest "github.com/gitopia/gitopia/testutil/keeper"
	"github.com/gitopia/gitopia/testutil/nullify"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func createNRewards(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.Rewards {
	items := make([]types.Rewards, n)
	for i := range items {
		items[i].Recipient = strconv.Itoa(i)
        
		keeper.SetRewards(ctx, items[i])
	}
	return items
}

func TestRewardsGet(t *testing.T) {
	keeper, ctx := keepertest.RewardsKeeper(t)
	items := createNRewards(keeper, ctx, 10)
	for _, item := range items {
		rst, found := keeper.GetRewards(ctx,
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
	keeper, ctx := keepertest.RewardsKeeper(t)
	items := createNRewards(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveRewards(ctx,
		    item.Recipient,
            
		)
		_, found := keeper.GetRewards(ctx,
		    item.Recipient,
            
		)
		require.False(t, found)
	}
}

func TestRewardsGetAll(t *testing.T) {
	keeper, ctx := keepertest.RewardsKeeper(t)
	items := createNRewards(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllRewards(ctx)),
	)
}
