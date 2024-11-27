package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/gitopia/gitopia/v5/testutil/keeper"
	"github.com/gitopia/gitopia/v5/testutil/sample"
	"github.com/gitopia/gitopia/v5/x/gitopia/keeper"
	"github.com/gitopia/gitopia/v5/x/gitopia/types"
	"github.com/stretchr/testify/require"
)

func createNUser(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.User {
	items := make([]types.User, n)
	for i := range items {
		items[i].Creator = sample.AccAddress()
		items[i].Id = keeper.AppendUser(ctx, items[i])
	}
	return items
}

func TestUserGet(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	items := createNUser(keeper, ctx, 10)
	for _, item := range items {
		got, found := keeper.GetUser(ctx, item.Creator)
		require.True(t, found)
		require.Equal(t, item, got)
	}
}

func TestUserRemove(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	items := createNUser(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveUser(ctx, item.Creator)
		_, found := keeper.GetUser(ctx, item.Creator)
		require.False(t, found)
	}
}

func TestUserGetAll(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	items := createNUser(keeper, ctx, 10)
	require.ElementsMatch(t, items, keeper.GetAllUser(ctx))
}

func TestUserCount(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	items := createNUser(keeper, ctx, 10)
	count := uint64(len(items))
	require.Equal(t, count, keeper.GetUserCount(ctx))
}
