package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/gitopia/gitopia/testutil/keeper"
	"github.com/gitopia/gitopia/testutil/nullify"
	"github.com/gitopia/gitopia/x/gitopia/keeper"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/stretchr/testify/require"
)

func createNBranch(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.Branch {
	items := make([]types.Branch, n)
	for i := range items {
		items[i].Id = keeper.AppendBranch(ctx, items[i])
	}
	return items
}

func TestRepositoryBranchGet(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNBranch(keeper, ctx, 10)
	for _, item := range items {
		got, found := keeper.GetRepositoryBranch(ctx, item.Id)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&got),
		)
	}
}

func TestBranchRemove(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNBranch(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveBranch(ctx, item.Id)
		_, found := keeper.GetBranch(ctx, item.Id)
		require.False(t, found)
	}
}

func TestBranchGetAll(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNBranch(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllBranch(ctx)),
	)
}

func TestBranchCount(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNBranch(keeper, ctx, 10)
	count := uint64(len(items))
	require.Equal(t, count, keeper.GetBranchCount(ctx))
}
