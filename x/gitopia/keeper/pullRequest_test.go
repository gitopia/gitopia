package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/gitopia/gitopia/v4/testutil/keeper"
	"github.com/gitopia/gitopia/v4/x/gitopia/keeper"
	"github.com/gitopia/gitopia/v4/x/gitopia/types"
	"github.com/stretchr/testify/require"
)

func createNPullRequest(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.PullRequest {
	items := make([]types.PullRequest, n)
	for i := range items {
		items[i].Base = &types.PullRequestBase{
			RepositoryId: 0,
		}
		items[i].Iid = uint64(i) + 1
		items[i].Id = keeper.AppendPullRequest(ctx, items[i])
	}
	return items
}

func TestPullRequestGet(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	items := createNPullRequest(keeper, ctx, 10)
	for _, item := range items {
		got, found := keeper.GetRepositoryPullRequest(ctx, item.Base.RepositoryId, item.Iid)
		require.True(t, found)
		require.Equal(t, item, got)
	}
}

func TestPullRequestRemove(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	items := createNPullRequest(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveRepositoryPullRequest(ctx, item.Base.RepositoryId, item.Iid)
		_, found := keeper.GetRepositoryPullRequest(ctx, item.Base.RepositoryId, item.Iid)
		require.False(t, found)
	}
}

func TestPullRequestGetAll(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	items := createNPullRequest(keeper, ctx, 10)
	require.ElementsMatch(t, items, keeper.GetAllPullRequest(ctx))
}

func TestPullRequestCount(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	items := createNPullRequest(keeper, ctx, 10)
	count := uint64(len(items))
	require.Equal(t, count, keeper.GetPullRequestCount(ctx))
}
