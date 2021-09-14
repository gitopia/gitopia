package keeper

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/stretchr/testify/assert"
)

func createNRelease(keeper *Keeper, ctx sdk.Context, n int) []types.Release {
	items := make([]types.Release, n)
	for i := range items {
		items[i].Creator = "any"
		items[i].Id = keeper.AppendRelease(ctx, items[i])
	}
	return items
}

func TestReleaseGet(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	items := createNRelease(keeper, ctx, 10)
	for _, item := range items {
		assert.Equal(t, item, keeper.GetRelease(ctx, item.Id))
	}
}

func TestReleaseExist(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	items := createNRelease(keeper, ctx, 10)
	for _, item := range items {
		assert.True(t, keeper.HasRelease(ctx, item.Id))
	}
}

func TestReleaseRemove(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	items := createNRelease(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveRelease(ctx, item.Id)
		assert.False(t, keeper.HasRelease(ctx, item.Id))
	}
}

func TestReleaseGetAll(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	items := createNRelease(keeper, ctx, 10)
	assert.Equal(t, items, keeper.GetAllRelease(ctx))
}

func TestReleaseCount(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	items := createNRelease(keeper, ctx, 10)
	count := uint64(len(items))
	assert.Equal(t, count, keeper.GetReleaseCount(ctx))
}
