package keeper_test

import (
	"fmt"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/gitopia/gitopia/testutil/keeper"
	"github.com/gitopia/gitopia/x/gitopia/keeper"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/stretchr/testify/require"
)

func createNRepository(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.Repository {
	items := make([]types.Repository, n)
	for i := range items {
		items[i].Name = fmt.Sprintf("repository-%d", i)
		items[i].Owner = &types.RepositoryOwner{
			Id:   "A",
			Type: types.OwnerType_USER,
		}
		items[i].Id = keeper.AppendRepository(ctx, items[i])
	}
	return items
}

func TestAddressRepositoryGet(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	items := createNRepository(keeper, ctx, 10)
	for _, item := range items {
		got, found := keeper.GetAddressRepository(ctx, item.Owner.Id, item.Name)
		require.True(t, found)
		require.Equal(t, item, got)
	}
	baseRepositoryKeyCount := len(keeper.GetAllBaseRepositoryKey(ctx))
	require.Equal(t, 10, baseRepositoryKeyCount)
}

func TestAddressRepositoryRemove(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	items := createNRepository(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveAddressRepository(ctx, item.Owner.Id, item.Name)
		_, found := keeper.GetAddressRepository(ctx, item.Owner.Id, item.Name)
		require.False(t, found)
	}
}

func TestRepositoryGetAll(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	items := createNRepository(keeper, ctx, 10)
	require.ElementsMatch(t, items, keeper.GetAllRepository(ctx))
}

func TestAddressRepositoryGetAll(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	items := createNRepository(keeper, ctx, 10)
	require.ElementsMatch(t, items, keeper.GetAllAddressRepository(ctx, items[0].Owner.Id))
}

func TestRepositoryCount(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	items := createNRepository(keeper, ctx, 10)
	count := uint64(len(items))
	require.Equal(t, count, keeper.GetRepositoryCount(ctx))
}
