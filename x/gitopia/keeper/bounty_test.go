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

func createNBounty(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.Bounty {
	items := make([]types.Bounty, n)
	for i := range items {
		items[i].Id = keeper.AppendBounty(ctx, items[i])
	}
	return items
}

func TestBountyGet(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNBounty(keeper, ctx, 10)
	for _, item := range items {
		got, found := keeper.GetBounty(ctx, item.Id)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&got),
		)
	}
}

func TestBountyRemove(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNBounty(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveBounty(ctx, item.Id)
		_, found := keeper.GetBounty(ctx, item.Id)
		require.False(t, found)
	}
}

func TestBountyGetAll(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNBounty(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllBounty(ctx)),
	)
}

func TestBountyCount(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNBounty(keeper, ctx, 10)
	count := uint64(len(items))
	require.Equal(t, count, keeper.GetBountyCount(ctx))
}
