package keeper_test

import (
	"testing"

	keepertest "github.com/gitopia/gitopia/v4/testutil/keeper"
	"github.com/gitopia/gitopia/v4/x/gitopia/types"
	"github.com/stretchr/testify/require"
)

func TestRepositoryStorage(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	storage := SetupStorage(keeper, ctx, 1)
	resp, err := keeper.RepositoryStorage(ctx, &types.QueryGetRepositoryStorageRequest{
		RepositoryId: 1,
	})
	require.NoError(t, err)
	require.Equal(t, storage, *resp.Storage)
}

func TestRepositoryStorageAll(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	storages := make([]types.Storage, 2)
	storages[0] = SetupStorage(keeper, ctx, 1)
	storages[1] = SetupStorage(keeper, ctx, 2)

	resp, err := keeper.RepositoryStorageAll(ctx, &types.QueryGetAllRepositoryStorageRequest{})
	require.NoError(t, err)
	require.Equal(t, uint64(2), resp.Pagination.Total)
	require.Equal(t, storages[0], *resp.Storages[0])
	require.Equal(t, storages[1], *resp.Storages[1])
}
