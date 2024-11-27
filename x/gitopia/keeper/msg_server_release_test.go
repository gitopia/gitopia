package keeper_test

import (
	"fmt"
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/require"

	"github.com/gitopia/gitopia/v5/x/gitopia/types"
)

func TestReleaseMsgServerCreate(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	creator := "A"

	repositoryId := types.RepositoryId{
		Id:   creator,
		Name: "repository",
	}

	_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator, Username: creator})
	require.NoError(t, err)
	_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "B", Username: "B"})
	require.NoError(t, err)
	_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository", Owner: creator})
	require.NoError(t, err)

	_, err = srv.SetBranch(ctx, &types.MsgSetBranch{
		Creator:      creator,
		RepositoryId: repositoryId,
		Branch: types.MsgSetBranch_Branch{
			Name: fmt.Sprintf("branch"),
		},
	})
	require.NoError(t, err)

	_, err = srv.SetTag(ctx, &types.MsgSetTag{
		Creator:      creator,
		RepositoryId: repositoryId,
		Tag: types.MsgSetTag_Tag{
			Name: fmt.Sprintf("tag"),
		},
	})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgCreateRelease
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgCreateRelease{RepositoryId: repositoryId, Creator: creator, Name: "release", TagName: "tag", Target: "branch"},
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgCreateRelease{RepositoryId: repositoryId, Creator: "C", Name: "release"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Repository Not Exists",
			request: &types.MsgCreateRelease{RepositoryId: types.RepositoryId{Id: creator, Name: "repoooo"}, Creator: creator, Name: "release"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Tag Not Exists",
			request: &types.MsgCreateRelease{RepositoryId: repositoryId, Creator: creator, Name: "release", TagName: "unknown-tag", Target: "branch"},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Target Branch Not Exists",
			request: &types.MsgCreateRelease{RepositoryId: repositoryId, Creator: creator, Name: "release", TagName: "tag", Target: "unknown-branch"},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgCreateRelease{RepositoryId: repositoryId, Creator: "B", Name: "release", TagName: "tag", Target: "branch"},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Release Already Exists",
			request: &types.MsgCreateRelease{RepositoryId: repositoryId, Creator: creator, Name: "release", TagName: "tag", Target: "branch"},
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
	srv, ctx := setupMsgServer(t)

	repositoryId := types.RepositoryId{
		Id:   creator,
		Name: "repository",
	}

	_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator, Username: creator})
	require.NoError(t, err)
	_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "B", Username: "B"})
	require.NoError(t, err)
	_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository", Owner: creator})
	require.NoError(t, err)

	_, err = srv.SetBranch(ctx, &types.MsgSetBranch{
		Creator:      creator,
		RepositoryId: repositoryId,
		Branch: types.MsgSetBranch_Branch{
			Name: fmt.Sprintf("branch"),
		},
	})
	require.NoError(t, err)

	_, err = srv.SetTag(ctx, &types.MsgSetTag{
		Creator:      creator,
		RepositoryId: repositoryId,
		Tag: types.MsgSetTag_Tag{
			Name: fmt.Sprintf("tag"),
		},
	})
	require.NoError(t, err)

	_, err = srv.SetTag(ctx, &types.MsgSetTag{
		Creator:      creator,
		RepositoryId: repositoryId,
		Tag: types.MsgSetTag_Tag{
			Name: fmt.Sprintf("tag-0"),
		},
	})
	require.NoError(t, err)

	_, err = srv.CreateRelease(ctx, &types.MsgCreateRelease{RepositoryId: repositoryId, Creator: creator, Name: "release", TagName: "tag", Target: "branch"})
	require.NoError(t, err)
	_, err = srv.CreateRelease(ctx, &types.MsgCreateRelease{RepositoryId: repositoryId, Creator: creator, Name: "release-0", TagName: "tag-0", Target: "branch"})
	require.NoError(t, err)

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
	srv, ctx := setupMsgServer(t)

	repositoryId := types.RepositoryId{
		Id:   creator,
		Name: "repository",
	}

	_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator, Username: creator})
	require.NoError(t, err)
	_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "B", Username: "B"})
	require.NoError(t, err)
	_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository", Owner: creator})
	require.NoError(t, err)

	_, err = srv.SetBranch(ctx, &types.MsgSetBranch{
		Creator:      creator,
		RepositoryId: repositoryId,
		Branch: types.MsgSetBranch_Branch{
			Name: fmt.Sprintf("branch"),
		},
	})
	require.NoError(t, err)

	_, err = srv.SetTag(ctx, &types.MsgSetTag{
		Creator:      creator,
		RepositoryId: repositoryId,
		Tag: types.MsgSetTag_Tag{
			Name: fmt.Sprintf("tag"),
		},
	})
	require.NoError(t, err)

	_, err = srv.CreateRelease(ctx, &types.MsgCreateRelease{RepositoryId: repositoryId, Creator: creator, Name: "release", TagName: "tag", Target: "branch"})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgDeleteRelease
		err     error
	}{
		{
			desc:    "Unauthorized",
			request: &types.MsgDeleteRelease{Creator: "B", Id: 0},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Completed",
			request: &types.MsgDeleteRelease{Creator: creator, Id: 0},
		},
		{
			desc:    "KeyNotFound",
			request: &types.MsgDeleteRelease{Creator: creator, Id: 0},
			err:     sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.DeleteRelease(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}
