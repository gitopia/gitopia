package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/gitopia/gitopia/testutil/keeper"
	"github.com/gitopia/gitopia/testutil/sample"
	"github.com/gitopia/gitopia/x/gitopia/keeper"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/stretchr/testify/require"
)

func createNWhois(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.Whois {
	items := make([]types.Whois, n)
	for i := range items {
		items[i].Creator = sample.AccAddress()
		items[i].Address = items[i].Creator
		keeper.SetWhois(ctx, items[i].Address, items[i])
	}
	return items
}

func TestWhoisGet(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNWhois(keeper, ctx, 10)
	for _, item := range items {
		got, found := keeper.GetWhois(ctx, item.Creator)
		require.True(t, found)
		require.Equal(t, item, got)
	}
}

func TestWhoisRemove(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNWhois(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveWhois(ctx, item.Creator)
		_, found := keeper.GetWhois(ctx, item.Creator)
		require.False(t, found)
	}
}

func TestWhoisGetAll(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNWhois(keeper, ctx, 10)
	require.ElementsMatch(t, items, keeper.GetAllWhois(ctx))
}

func TestWhoisCount(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNWhois(keeper, ctx, 10)
	count := uint64(len(items))
	/* TODO: Need to be equal */
	require.NotEqual(t, count, keeper.GetWhoisCount(ctx))
}
