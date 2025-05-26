package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/gitopia/gitopia/v6/testutil/keeper"
	"github.com/gitopia/gitopia/v6/x/gitopia/keeper"
	"github.com/gitopia/gitopia/v6/x/gitopia/types"
	"github.com/stretchr/testify/require"
)

func createNRelease(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.Release {
	items := make([]types.Release, n)
	for i := range items {
		items[i].Id = keeper.AppendRelease(ctx, items[i])
	}
	return items
}

func TestReleaseGet(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	items := createNRelease(keeper, ctx, 10)
	for _, item := range items {
		got, found := keeper.GetRelease(ctx, item.Id)
		require.True(t, found)
		require.Equal(t, item, got)
	}
}

func TestReleaseRemove(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	items := createNRelease(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveRelease(ctx, item.Id)
		_, found := keeper.GetRelease(ctx, item.Id)
		require.False(t, found)
	}
}

func TestReleaseGetAll(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	items := createNRelease(keeper, ctx, 10)
	require.ElementsMatch(t, items, keeper.GetAllRelease(ctx))
}

func TestReleaseCount(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	items := createNRelease(keeper, ctx, 10)
	count := uint64(len(items))
	require.Equal(t, count, keeper.GetReleaseCount(ctx))
}
