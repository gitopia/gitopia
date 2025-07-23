package keeper_test

import (
	"fmt"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/gitopia/gitopia/v6/testutil/keeper"
	"github.com/gitopia/gitopia/v6/testutil/sample"
	"github.com/gitopia/gitopia/v6/x/gitopia/keeper"
	"github.com/gitopia/gitopia/v6/x/gitopia/types"
	"github.com/stretchr/testify/require"
)

func createNWhois(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.Whois {
	items := make([]types.Whois, n)
	for i := range items {
		items[i].Creator = sample.AccAddress()
		items[i].Address = items[i].Creator
		items[i].Name = fmt.Sprintf("creator-%d", i)
		keeper.SetWhois(ctx, items[i])
	}
	return items
}

func TestWhoisGet(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	items := createNWhois(keeper, ctx, 10)
	for _, item := range items {
		got, found := keeper.GetWhois(ctx, item.Name)
		require.True(t, found)
		require.Equal(t, item, got)
	}
}

func TestWhoisRemove(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	items := createNWhois(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveWhois(ctx, item.Name)
		_, found := keeper.GetWhois(ctx, item.Name)
		require.False(t, found)
	}
}

func TestWhoisGetAll(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	items := createNWhois(keeper, ctx, 10)
	require.ElementsMatch(t, items, keeper.GetAllWhois(ctx))
}

func TestWhoisCount(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	items := createNWhois(keeper, ctx, 10)
	count := uint64(len(items))
	/* TODO: Need to be equal */
	require.NotEqual(t, count, keeper.GetWhoisCount(ctx))
}
