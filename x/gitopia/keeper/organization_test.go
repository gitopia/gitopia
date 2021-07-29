package keeper

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/stretchr/testify/assert"
)

func createNOrganization(keeper *Keeper, ctx sdk.Context, n int) []types.Organization {
	items := make([]types.Organization, n)
	for i := range items {
		items[i].Creator = "any"
		items[i].Id = keeper.AppendOrganization(ctx, items[i])
	}
	return items
}

func TestOrganizationGet(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	items := createNOrganization(keeper, ctx, 10)
	for _, item := range items {
		assert.Equal(t, item, keeper.GetOrganization(ctx, item.Id))
	}
}

func TestOrganizationExist(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	items := createNOrganization(keeper, ctx, 10)
	for _, item := range items {
		assert.True(t, keeper.HasOrganization(ctx, item.Id))
	}
}

func TestOrganizationRemove(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	items := createNOrganization(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveOrganization(ctx, item.Id)
		assert.False(t, keeper.HasOrganization(ctx, item.Id))
	}
}

func TestOrganizationGetAll(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	items := createNOrganization(keeper, ctx, 10)
	assert.Equal(t, items, keeper.GetAllOrganization(ctx))
}

func TestOrganizationCount(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	items := createNOrganization(keeper, ctx, 10)
	count := uint64(len(items))
	assert.Equal(t, count, keeper.GetOrganizationCount(ctx))
}
