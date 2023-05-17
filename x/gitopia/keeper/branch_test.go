package keeper_test

import (
	"fmt"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/gitopia/gitopia/v2/testutil/keeper"
	"github.com/gitopia/gitopia/v2/testutil/nullify"
	"github.com/gitopia/gitopia/v2/x/gitopia/keeper"
	"github.com/gitopia/gitopia/v2/x/gitopia/types"
	"github.com/stretchr/testify/require"
)

func createNBranch(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.Branch {
	items := make([]types.Branch, n)
	for i := range items {
		items[i].RepositoryId = 0
		items[i].Name = fmt.Sprintf("branch-%d", i)
		items[i].Id = keeper.AppendBranch(ctx, items[i])
	}
	return items
}

func TestBranchGet(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	items := createNBranch(keeper, ctx, 10)
	for _, item := range items {
		got, found := keeper.GetRepositoryBranch(ctx, item.RepositoryId, item.Name)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&got),
		)
	}
}

func TestBranchRemove(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	items := createNBranch(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveRepositoryBranch(ctx, item.RepositoryId, item.Name)
		_, found := keeper.GetRepositoryBranch(ctx, item.RepositoryId, item.Name)
		require.False(t, found)
	}
}

func TestBranchGetAll(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	items := createNBranch(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllBranch(ctx)),
	)
}

func TestRepositoryBranchGetAll(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	items := createNBranch(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllRepositoryBranch(ctx, 0)),
	)
}

func TestBranchCount(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	items := createNBranch(keeper, ctx, 10)
	count := uint64(len(items))
	require.Equal(t, count, keeper.GetBranchCount(ctx))
}
