package keeper_test

import (
	"context"
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/require"

	"github.com/gitopia/gitopia/v4/x/gitopia/types"
)

func TestCommentMsgServerCreate(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	users, _, _, _ := setupPreComment(ctx, t, srv)

	for _, tc := range []struct {
		desc    string
		request *types.MsgCreateComment
		err     error
	}{
		{
			desc:    "Creator Not Exists",
			request: &types.MsgCreateComment{Creator: "C", ParentIid: 1, Parent: types.CommentParentIssue},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Issue Not Exists",
			request: &types.MsgCreateComment{Creator: users[0], ParentIid: 10, Parent: types.CommentParentIssue},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "PullRequest Not Exists",
			request: &types.MsgCreateComment{Creator: users[0], ParentIid: 10, Parent: types.CommentParentPullRequest},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Issue Comment Completed",
			request: &types.MsgCreateComment{Creator: users[0], ParentIid: 1, Parent: types.CommentParentIssue},
		},
		{
			desc:    "Pull Request Comment Completed",
			request: &types.MsgCreateComment{Creator: users[0], ParentIid: 1, Parent: types.CommentParentPullRequest},
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err := srv.CreateComment(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestCommentMsgServerUpdate(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	users, _, _, _ := setupPreComment(ctx, t, srv)
	_, err := srv.CreateComment(ctx, &types.MsgCreateComment{Creator: users[0], ParentIid: 1, Parent: types.CommentParentIssue})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgUpdateComment
		err     error
	}{
		{
			desc:    "Creator Not Exists",
			request: &types.MsgUpdateComment{Creator: "C", ParentIid: 1, Parent: types.CommentParentIssue},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Comment Not Exists",
			request: &types.MsgUpdateComment{Creator: users[0], ParentIid: 1, Parent: types.CommentParentIssue, CommentIid: 0},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgUpdateComment{Creator: users[1], ParentIid: 1, Parent: types.CommentParentIssue, CommentIid: 1},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Completed",
			request: &types.MsgUpdateComment{Creator: users[0], ParentIid: 1, Parent: types.CommentParentIssue, CommentIid: 1},
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.UpdateComment(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestCommentMsgServerDelete(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	users, _, _, _ := setupPreComment(ctx, t, srv)
	_, err := srv.CreateComment(ctx, &types.MsgCreateComment{Creator: users[0], ParentIid: 1, Parent: types.CommentParentIssue})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgDeleteComment
		err     error
	}{
		{
			desc:    "Unauthorized",
			request: &types.MsgDeleteComment{Creator: users[1], ParentIid: 1, Parent: types.CommentParentIssue, CommentIid: 1},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Completed",
			request: &types.MsgDeleteComment{Creator: users[0], ParentIid: 1, Parent: types.CommentParentIssue, CommentIid: 1},
		},
		{
			desc:    "KeyNotFound",
			request: &types.MsgDeleteComment{Creator: users[0], ParentIid: 1, Parent: types.CommentParentIssue, CommentIid: 1},
			err:     sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.DeleteComment(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestCommentMsgServerResolved(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	users, _, _, _ := setupPreComment(ctx, t, srv)
	_, err := srv.CreateComment(ctx, &types.MsgCreateComment{Creator: users[0], ParentIid: 1, Parent: types.CommentParentPullRequest})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgToggleCommentResolved
		err     error
	}{
		{
			desc:    "Unauthorized",
			request: &types.MsgToggleCommentResolved{Creator: users[1], ParentIid: 1, Parent: types.CommentParentPullRequest, CommentIid: 1},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Completed",
			request: &types.MsgToggleCommentResolved{Creator: users[0], ParentIid: 1, Parent: types.CommentParentPullRequest, CommentIid: 1},
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.ToggleCommentResolved(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func setupPreComment(ctx context.Context, t *testing.T, srv types.MsgServer) (users []string, repositoryId types.RepositoryId, issueId uint64, pullRequestId uint64) {
	users = append(users, "A", "B")
	repositoryId = types.RepositoryId{
		Id:   users[0],
		Name: "repository",
	}
	branches := []string{"branch-X", "branch-Y"}

	for _, user := range users {
		_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: user, Username: user})
		require.NoError(t, err)

	}

	_, err := srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: users[0], Name: "repository", Owner: users[0]})
	require.NoError(t, err)

	for _, branch := range branches {
		_, err = srv.SetBranch(ctx, &types.MsgSetBranch{
			Creator:      users[0],
			RepositoryId: repositoryId,
			Branch: types.MsgSetBranch_Branch{
				Name: branch,
			},
		})
		require.NoError(t, err)
	}

	issue, err := srv.CreateIssue(ctx, &types.MsgCreateIssue{Creator: users[0], RepositoryId: repositoryId})
	require.NoError(t, err)

	pullRequest, err := srv.CreatePullRequest(ctx, &types.MsgCreatePullRequest{Creator: users[0], HeadRepositoryId: repositoryId, HeadBranch: branches[0], BaseRepositoryId: repositoryId, BaseBranch: branches[1]})
	require.NoError(t, err)

	return users, repositoryId, issue.Id, pullRequest.Id
}
