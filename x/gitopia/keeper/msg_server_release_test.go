package keeper_test

import (
	"fmt"
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/require"

	"github.com/gitopia/gitopia/x/gitopia/types"
)

func TestReleaseMsgServerCreate(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	creator := "A"

	_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator})
	require.NoError(t, err)
	_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "B"})
	require.NoError(t, err)
	_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository", OwnerId: creator, OwnerType: "USER"})
	require.NoError(t, err)
	_, err = srv.SetRepositoryBranch(ctx, &types.MsgSetRepositoryBranch{Id: 0, Creator: creator, Name: "branch"})
	require.NoError(t, err)
	_, err = srv.SetRepositoryTag(ctx, &types.MsgSetRepositoryTag{Id: 0, Creator: creator, Name: "tag"})
	require.NoError(t, err)

	/* Test multiple Release create */
	for i := 0; i < 5; i++ {
		tag := fmt.Sprintf("tag-%d", i)
		_, err = srv.SetRepositoryTag(ctx, &types.MsgSetRepositoryTag{Id: 0, Creator: creator, Name: tag})
		require.NoError(t, err)
		resp, err := srv.CreateRelease(ctx, &types.MsgCreateRelease{RepositoryId: 0, Creator: creator, Name: "release", TagName: tag, Target: "branch"})
		require.NoError(t, err)
		require.Equal(t, uint64(i), resp.Id)
	}

	for _, tc := range []struct {
		desc    string
		request *types.MsgCreateRelease
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgCreateRelease{RepositoryId: 0, Creator: creator, Name: "release", TagName: "tag", Target: "branch"},
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgCreateRelease{RepositoryId: 0, Creator: "C", Name: "release"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Repository Not Exists",
			request: &types.MsgCreateRelease{RepositoryId: 10, Creator: creator, Name: "release"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Tag Not Exists",
			request: &types.MsgCreateRelease{RepositoryId: 0, Creator: creator, Name: "release", TagName: "unknown-tag", Target: "branch"},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Target Branch Not Exists",
			request: &types.MsgCreateRelease{RepositoryId: 0, Creator: creator, Name: "release", TagName: "tag", Target: "unknown-branch"},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgCreateRelease{RepositoryId: 0, Creator: "B", Name: "release", TagName: "tag", Target: "branch"},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Release Already Exists",
			request: &types.MsgCreateRelease{RepositoryId: 0, Creator: creator, Name: "release", TagName: "tag", Target: "branch"},
			err:     sdkerrors.ErrInvalidRequest,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.CreateRelease(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestReleaseMsgServerUpdate(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgUpdateRelease
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgUpdateRelease{Id: 0, Creator: creator, Name: "updated-release", TagName: "tag", Target: "branch"},
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgUpdateRelease{Id: 0, Creator: "C", Name: "release"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Repository Not Exists",
			request: &types.MsgUpdateRelease{Id: 10, Creator: creator, Name: "release"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Tag Not Exists",
			request: &types.MsgUpdateRelease{Id: 0, Creator: creator, Name: "release", TagName: "unknown-tag", Target: "branch"},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Target Branch Not Exists",
			request: &types.MsgUpdateRelease{Id: 0, Creator: creator, Name: "release", TagName: "tag", Target: "unknown-branch"},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgUpdateRelease{Id: 0, Creator: "B", Name: "release", TagName: "tag", Target: "branch"},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Release Already Exists",
			request: &types.MsgUpdateRelease{Id: 0, Creator: creator, Name: "release", TagName: "tag-0", Target: "branch"},
			err:     sdkerrors.ErrInvalidRequest,
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
			_, err = srv.SetRepositoryBranch(ctx, &types.MsgSetRepositoryBranch{Id: 0, Creator: creator, Name: "branch"})
			require.NoError(t, err)
			_, err = srv.SetRepositoryTag(ctx, &types.MsgSetRepositoryTag{Id: 0, Creator: creator, Name: "tag"})
			require.NoError(t, err)
			_, err = srv.SetRepositoryTag(ctx, &types.MsgSetRepositoryTag{Id: 0, Creator: creator, Name: "tag-0"})
			require.NoError(t, err)
			_, err = srv.CreateRelease(ctx, &types.MsgCreateRelease{RepositoryId: 0, Creator: creator, Name: "release", TagName: "tag", Target: "branch"})
			require.NoError(t, err)
			_, err = srv.CreateRelease(ctx, &types.MsgCreateRelease{RepositoryId: 0, Creator: creator, Name: "release-0", TagName: "tag-0", Target: "branch"})
			require.NoError(t, err)

			_, err = srv.UpdateRelease(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestReleaseMsgServerDelete(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgDeleteRelease
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgDeleteRelease{Creator: creator, Id: 0},
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgDeleteRelease{Creator: "B", Id: 0},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "KeyNotFound",
			request: &types.MsgDeleteRelease{Creator: creator, Id: 10},
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
			_, err = srv.SetRepositoryBranch(ctx, &types.MsgSetRepositoryBranch{Id: 0, Creator: creator, Name: "branch"})
			require.NoError(t, err)
			_, err = srv.SetRepositoryTag(ctx, &types.MsgSetRepositoryTag{Id: 0, Creator: creator, Name: "tag"})
			require.NoError(t, err)
			_, err = srv.CreateRelease(ctx, &types.MsgCreateRelease{RepositoryId: 0, Creator: creator, Name: "release", TagName: "tag", Target: "branch"})
			require.NoError(t, err)

			_, err = srv.DeleteRelease(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}
