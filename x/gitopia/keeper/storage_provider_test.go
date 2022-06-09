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

func createNStorageProvider(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.StorageProvider {
	items := make([]types.StorageProvider, n)
	for i := range items {
		items[i].Id = keeper.AppendStorageProvider(ctx, items[i])
	}
	return items
}

func TestStorageProviderGet(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNStorageProvider(keeper, ctx, 10)
	for _, item := range items {
		got, found := keeper.GetStorageProvider(ctx, item.Id)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&got),
		)
	}
}

func TestStorageProviderRemove(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNStorageProvider(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveStorageProvider(ctx, item.Id)
		_, found := keeper.GetStorageProvider(ctx, item.Id)
		require.False(t, found)
	}
}

func TestStorageProviderGetAll(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNStorageProvider(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllStorageProvider(ctx)),
	)
}

func TestStorageProviderCount(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNStorageProvider(keeper, ctx, 10)
	count := uint64(len(items))
	require.Equal(t, count, keeper.GetStorageProviderCount(ctx))
}
