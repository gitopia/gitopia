package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/gitopia/gitopia/testutil/keeper"
	"github.com/gitopia/gitopia/x/gitopia/keeper"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/stretchr/testify/require"
)

func createNComment(keeper *keeper.Keeper, ctx sdk.Context, parent types.CommentParent, n int) []types.Comment {
	items := make([]types.Comment, n)
	for i := range items {
		items[i].RepositoryId = 0
		items[i].ParentIid = 1
		items[i].Parent = parent
		items[i].CommentIid = uint64(i) + 1
		items[i].Id = keeper.AppendComment(ctx, items[i])
	}
	return items
}

func TestCommentGet(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	issueItems := createNComment(keeper, ctx, types.CommentParentIssue, 10)
	for _, item := range issueItems {
		got, found := keeper.GetIssueComment(ctx, 0, 1, item.CommentIid)
		require.True(t, found)
		require.Equal(t, item, got)
	}
	pullRequestItems := createNComment(keeper, ctx, types.CommentParentPullRequest, 10)
	for _, item := range pullRequestItems {
		got, found := keeper.GetPullRequestComment(ctx, 0, 1, item.CommentIid)
		require.True(t, found)
		require.Equal(t, item, got)
	}
}

func TestCommentRemove(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	issueItems := createNComment(keeper, ctx, types.CommentParentIssue, 10)
	for _, item := range issueItems {
		keeper.RemoveIssueComment(ctx, 0, 1, item.CommentIid)
		_, found := keeper.GetIssueComment(ctx, 0, 1, item.CommentIid)
		require.False(t, found)
	}
	pullRequestItems := createNComment(keeper, ctx, types.CommentParentPullRequest, 10)
	for _, item := range pullRequestItems {
		keeper.RemovePullRequestComment(ctx, 0, 1, item.CommentIid)
		_, found := keeper.GetPullRequestComment(ctx, 0, 1, item.CommentIid)
		require.False(t, found)
	}
}

func TestCommentGetAll(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	issueItems := createNComment(keeper, ctx, types.CommentParentIssue, 10)
	pullRequestItems := createNComment(keeper, ctx, types.CommentParentPullRequest, 10)
	items := append(issueItems, pullRequestItems...)
	require.ElementsMatch(t, issueItems, keeper.GetAllIssueComment(ctx, 0, 1))
	require.ElementsMatch(t, pullRequestItems, keeper.GetAllPullRequestComment(ctx, 0, 1))
	require.ElementsMatch(t, items, keeper.GetAllComment(ctx))
}

func TestCommentCount(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	issueItems := createNComment(keeper, ctx, types.CommentParentIssue, 10)
	pullRequestItems := createNComment(keeper, ctx, types.CommentParentPullRequest, 10)
	count := uint64(len(issueItems) + len(pullRequestItems))
	require.Equal(t, count, keeper.GetCommentCount(ctx))
}
