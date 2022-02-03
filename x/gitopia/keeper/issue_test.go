package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/gitopia/gitopia/testutil/keeper"
	"github.com/gitopia/gitopia/x/gitopia/keeper"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/stretchr/testify/require"
)

func createNIssue(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.Issue {
	items := make([]types.Issue, n)
	for i := range items {
		items[i].Id = keeper.AppendIssue(ctx, items[i])
	}
	return items
}

func TestIssueGet(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNIssue(keeper, ctx, 10)
	for _, item := range items {
		got, found := keeper.GetIssue(ctx, item.Id)
		require.True(t, found)
		require.Equal(t, item, got)
	}
}

func TestIssueRemove(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNIssue(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveIssue(ctx, item.Id)
		_, found := keeper.GetIssue(ctx, item.Id)
		require.False(t, found)
	}
}

func TestIssueGetAll(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNIssue(keeper, ctx, 10)
	require.ElementsMatch(t, items, keeper.GetAllIssue(ctx))
}

func TestIssueCount(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNIssue(keeper, ctx, 10)
	count := uint64(len(items))
	require.Equal(t, count, keeper.GetIssueCount(ctx))
}
