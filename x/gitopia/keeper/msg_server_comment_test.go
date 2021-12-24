package keeper_test

import (
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/require"

	"github.com/gitopia/gitopia/x/gitopia/types"
)

func TestCommentMsgServerCreate(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	creator := "A"

	_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator})
	require.NoError(t, err)
	_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "B"})
	require.NoError(t, err)
	_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository", OwnerId: creator, OwnerType: "USER"})
	require.NoError(t, err)
	_, err = srv.CreateIssue(ctx, &types.MsgCreateIssue{Creator: creator, RepositoryId: 0})
	require.NoError(t, err)

	/* Test multiple Comment create */
	for i := 0; i < 5; i++ {
		resp, err := srv.CreateComment(ctx, &types.MsgCreateComment{Creator: creator, ParentId: 0, CommentType: "ISSUE"})
		require.NoError(t, err)
		require.Equal(t, uint64(i), resp.Id)
	}

	for _, tc := range []struct {
		desc    string
		request *types.MsgCreateComment
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgCreateComment{Creator: creator, ParentId: 0, CommentType: "ISSUE"},
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgCreateComment{Creator: "C", ParentId: 0, CommentType: "ISSUE"},
			err:     sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.CreateComment(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestCommentMsgServerUpdate(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgUpdateComment
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgUpdateComment{Id: 0, Creator: creator},
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgUpdateComment{Id: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Comment Not Exists",
			request: &types.MsgUpdateComment{Id: 10, Creator: creator},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgUpdateComment{Id: 0, Creator: "B"},
			err:     sdkerrors.ErrUnauthorized,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			srv, ctx := setupMsgServer(t)
			_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator})
			require.NoError(t, err)
			_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "B"})
			require.NoError(t, err)
			_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository", OwnerId: creator, OwnerType: "USER"})
			require.NoError(t, err)
			_, err = srv.CreateIssue(ctx, &types.MsgCreateIssue{Creator: creator, RepositoryId: 0})
			require.NoError(t, err)
			_, err = srv.CreateComment(ctx, &types.MsgCreateComment{Creator: creator, ParentId: 0, CommentType: "ISSUE"})
			require.NoError(t, err)

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
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgDeleteComment
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgDeleteComment{Creator: creator, Id: 0},
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgDeleteComment{Creator: "B", Id: 0},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "KeyNotFound",
			request: &types.MsgDeleteComment{Creator: creator, Id: 10},
			err:     sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			srv, ctx := setupMsgServer(t)
			_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator})
			require.NoError(t, err)
			_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "B"})
			require.NoError(t, err)
			_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository", OwnerId: creator, OwnerType: "USER"})
			require.NoError(t, err)
			_, err = srv.CreateIssue(ctx, &types.MsgCreateIssue{Creator: creator, RepositoryId: 0})
			require.NoError(t, err)
			_, err = srv.CreateComment(ctx, &types.MsgCreateComment{Creator: creator, ParentId: 0, CommentType: "ISSUE"})
			require.NoError(t, err)

			_, err = srv.DeleteComment(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}
