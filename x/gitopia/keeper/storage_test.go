package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/gitopia/gitopia/v4/testutil/keeper"
	"github.com/gitopia/gitopia/v4/x/gitopia/keeper"
	"github.com/gitopia/gitopia/v4/x/gitopia/types"
	"github.com/stretchr/testify/require"
)

func SetupStorage(keeper *keeper.Keeper, ctx sdk.Context, repositoryId uint64) types.Storage {
	storage := types.Storage{
		ParentId:        repositoryId,
		StorageType:     types.StorageTypeIpfs,
		StorageFileType: types.StorageFileTypePackfile,
	}
	storage.Id = keeper.AppendStorage(ctx, storage)

	return storage
}

func TestStorageGet(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	storage := SetupStorage(keeper, ctx, 1)
	got, found := keeper.GetRepositoryStorage(ctx, storage.ParentId)
	require.True(t, found)
	require.Equal(t, storage, got)
}

func TestRemoveRepositoryStorage(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	storage := SetupStorage(keeper, ctx, 1)
	// check storage exists before removing
	_, found := keeper.GetRepositoryStorage(ctx, storage.ParentId)
	require.True(t, found)

	// remove repository storage
	keeper.RemoveRepositoryStorage(ctx, storage.ParentId)

	// check repository storage is removed
	_, found = keeper.GetRepositoryStorage(ctx, storage.ParentId)
	require.False(t, found)
}

func TestGetAllStorage(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	storages := make([]types.Storage, 2)
	storages[0] = SetupStorage(keeper, ctx, 1)
	storages[1] = SetupStorage(keeper, ctx, 2)

	got := keeper.GetAllStorage(ctx)
	require.Equal(t, uint64(2), keeper.GetStorageCount(ctx))
	require.Equal(t, storages[0], got[0])
	require.Equal(t, storages[1], got[1])
}
