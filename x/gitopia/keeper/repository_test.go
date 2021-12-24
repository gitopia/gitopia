package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/gitopia/gitopia/testutil/keeper"
	"github.com/gitopia/gitopia/x/gitopia/keeper"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/stretchr/testify/require"
)

func createNRepository(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.Repository {
	items := make([]types.Repository, n)
	for i := range items {
		items[i].Id = keeper.AppendRepository(ctx, items[i])
	}
	return items
}

func TestRepositoryGet(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNRepository(keeper, ctx, 10)
	for _, item := range items {
		got, found := keeper.GetRepository(ctx, item.Id)
		require.True(t, found)
		require.Equal(t, item, got)
	}
}

func TestRepositoryRemove(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNRepository(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveRepository(ctx, item.Id)
		_, found := keeper.GetRepository(ctx, item.Id)
		require.False(t, found)
	}
}

func TestRepositoryGetAll(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNRepository(keeper, ctx, 10)
	require.ElementsMatch(t, items, keeper.GetAllRepository(ctx))
}

func TestRepositoryCount(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNRepository(keeper, ctx, 10)
	count := uint64(len(items))
	require.Equal(t, count, keeper.GetRepositoryCount(ctx))
}
