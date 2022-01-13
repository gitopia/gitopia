package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/gitopia/gitopia/testutil/keeper"
	"github.com/gitopia/gitopia/x/gitopia/keeper"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/stretchr/testify/require"
)

func createNRequest(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.Request {
	items := make([]types.Request, n)
	for i := range items {
		items[i].Id = keeper.AppendRequest(ctx, items[i])
	}
	return items
}

func TestRequestGet(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNRequest(keeper, ctx, 10)
	for _, item := range items {
		got, found := keeper.GetRequest(ctx, item.Id)
		require.True(t, found)
		require.Equal(t, item, got)
	}
}

func TestRequestRemove(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNRequest(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveRequest(ctx, item.Id)
		_, found := keeper.GetRequest(ctx, item.Id)
		require.False(t, found)
	}
}

func TestRequestGetAll(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNRequest(keeper, ctx, 10)
	require.ElementsMatch(t, items, keeper.GetAllRequest(ctx))
}

func TestRequestCount(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNRequest(keeper, ctx, 10)
	count := uint64(len(items))
	require.Equal(t, count, keeper.GetRequestCount(ctx))
}
