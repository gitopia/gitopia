package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/gitopia/gitopia/v2/testutil/keeper"
	"github.com/gitopia/gitopia/v2/x/gitopia/keeper"
	"github.com/gitopia/gitopia/v2/x/gitopia/types"
	"github.com/stretchr/testify/require"
)

func createNIssue(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.Issue {
	items := make([]types.Issue, n)
	for i := range items {
		items[i].RepositoryId = 0
		items[i].Iid = uint64(i) + 1
		items[i].Id = keeper.AppendIssue(ctx, items[i])
	}
	return items
}

func TestIssueGet(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	items := createNIssue(keeper, ctx, 10)
	for _, item := range items {
		got, found := keeper.GetRepositoryIssue(ctx, item.RepositoryId, item.Iid)
		require.True(t, found)
		require.Equal(t, item, got)
	}
}

func TestIssueRemove(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	items := createNIssue(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveRepositoryIssue(ctx, item.RepositoryId, item.Iid)
		_, found := keeper.GetRepositoryIssue(ctx, item.RepositoryId, item.Iid)
		require.False(t, found)
	}
}

func TestIssueGetAll(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	items := createNIssue(keeper, ctx, 10)
	require.ElementsMatch(t, items, keeper.GetAllIssue(ctx))
}

func TestIssueCount(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	items := createNIssue(keeper, ctx, 10)
	count := uint64(len(items))
	require.Equal(t, count, keeper.GetIssueCount(ctx))
}
