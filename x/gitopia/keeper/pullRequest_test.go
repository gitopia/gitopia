package keeper

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/stretchr/testify/assert"
)

func createNPullRequest(keeper *Keeper, ctx sdk.Context, n int) []types.PullRequest {
	items := make([]types.PullRequest, n)
	for i := range items {
		items[i].Creator = "any"
		items[i].Id = keeper.AppendPullRequest(ctx, items[i])
	}
	return items
}

func TestPullRequestGet(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	items := createNPullRequest(keeper, ctx, 10)
	for _, item := range items {
		assert.Equal(t, item, keeper.GetPullRequest(ctx, item.Id))
	}
}

func TestPullRequestExist(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	items := createNPullRequest(keeper, ctx, 10)
	for _, item := range items {
		assert.True(t, keeper.HasPullRequest(ctx, item.Id))
	}
}

func TestPullRequestRemove(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	items := createNPullRequest(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemovePullRequest(ctx, item.Id)
		assert.False(t, keeper.HasPullRequest(ctx, item.Id))
	}
}

func TestPullRequestGetAll(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	items := createNPullRequest(keeper, ctx, 10)
	assert.Equal(t, items, keeper.GetAllPullRequest(ctx))
}

func TestPullRequestCount(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	items := createNPullRequest(keeper, ctx, 10)
	count := uint64(len(items))
	assert.Equal(t, count, keeper.GetPullRequestCount(ctx))
}
