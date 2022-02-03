package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/gitopia/gitopia/testutil/keeper"
	"github.com/gitopia/gitopia/x/gitopia/keeper"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/stretchr/testify/require"
)

func createNPullRequest(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.PullRequest {
	items := make([]types.PullRequest, n)
	for i := range items {
		items[i].Id = keeper.AppendPullRequest(ctx, items[i])
	}
	return items
}

func TestPullRequestGet(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNPullRequest(keeper, ctx, 10)
	for _, item := range items {
		got, found := keeper.GetPullRequest(ctx, item.Id)
		require.True(t, found)
		require.Equal(t, item, got)
	}
}

func TestPullRequestRemove(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNPullRequest(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemovePullRequest(ctx, item.Id)
		_, found := keeper.GetPullRequest(ctx, item.Id)
		require.False(t, found)
	}
}

func TestPullRequestGetAll(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNPullRequest(keeper, ctx, 10)
	require.ElementsMatch(t, items, keeper.GetAllPullRequest(ctx))
}

func TestPullRequestCount(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNPullRequest(keeper, ctx, 10)
	count := uint64(len(items))
	require.Equal(t, count, keeper.GetPullRequestCount(ctx))
}
