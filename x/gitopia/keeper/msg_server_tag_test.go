package keeper_test

import (
	"fmt"
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/require"

	"github.com/gitopia/gitopia/v5/x/gitopia/types"
)

func TestTagMsgServerSet(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	creator := "A"

	_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator, Username: creator})
	require.NoError(t, err)
	_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "B", Username: "B"})
	require.NoError(t, err)
	_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository", Owner: creator})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgSetTag
		err     error
	}{
		{
			desc: "Completed",
			request: &types.MsgSetTag{
				Creator: creator,
				RepositoryId: types.RepositoryId{
					Id:   creator,
					Name: "repository",
				},
				Tag: types.MsgSetTag_Tag{
					Name: fmt.Sprintf("tag"),
				},
			},
		},
		{
			desc: "Unauthorized",
			request: &types.MsgSetTag{
				Creator: "B",
				RepositoryId: types.RepositoryId{
					Id:   creator,
					Name: "repository",
				},
			},
			err: sdkerrors.ErrUnauthorized,
		},
		{
			desc: "CreatorNotFound",
			request: &types.MsgSetTag{
				Creator: "Z",
			},
			err: sdkerrors.ErrKeyNotFound,
		},
		{
			desc: "RepositoryNotFound",
			request: &types.MsgSetTag{
				Creator: "A",
				RepositoryId: types.RepositoryId{
					Id:   creator,
					Name: "notexists",
				},
			},
			err: sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.SetTag(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestTagMsgServerMultiSet(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	creator := "A"

	_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator, Username: creator})
	require.NoError(t, err)
	_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "B", Username: "B"})
	require.NoError(t, err)
	_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository", Owner: creator})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgMultiSetTag
		err     error
	}{
		{
			desc: "Completed",
			request: &types.MsgMultiSetTag{
				Creator: creator,
				RepositoryId: types.RepositoryId{
					Id:   creator,
					Name: "repository",
				},
				Tags: []types.MsgMultiSetTag_Tag{{Name: "tag-1"}, {Name: "tag-2"}},
			},
		},
		{
			desc: "Unauthorized",
			request: &types.MsgMultiSetTag{
				Creator: "B",
				RepositoryId: types.RepositoryId{
					Id:   creator,
					Name: "repository",
				},
			},
			err: sdkerrors.ErrUnauthorized,
		},
		{
			desc: "CreatorNotFound",
			request: &types.MsgMultiSetTag{
				Creator: "Z",
			},
			err: sdkerrors.ErrKeyNotFound,
		},
		{
			desc: "RepositoryNotFound",
			request: &types.MsgMultiSetTag{
				Creator: "A",
				RepositoryId: types.RepositoryId{
					Id:   creator,
					Name: "notexists",
				},
			},
			err: sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.MultiSetTag(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestTagMsgServerDelete(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	creator := "A"

	_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator, Username: creator})
	require.NoError(t, err)
	_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "B", Username: "B"})
	require.NoError(t, err)
	_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository", Owner: creator})
	require.NoError(t, err)
	_, err = srv.SetTag(ctx, &types.MsgSetTag{
		Creator: creator,
		RepositoryId: types.RepositoryId{
			Id:   creator,
			Name: "repository",
		},
		Tag: types.MsgSetTag_Tag{
			Name: fmt.Sprintf("tag"),
		},
	})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgDeleteTag
		err     error
	}{
		{
			desc: "Completed",
			request: &types.MsgDeleteTag{
				Creator: creator,
				RepositoryId: types.RepositoryId{
					Id:   creator,
					Name: "repository",
				},
				Tag: "tag",
			},
		},
		{
			desc: "Unauthorized",
			request: &types.MsgDeleteTag{
				Creator: "B",
				RepositoryId: types.RepositoryId{
					Id:   creator,
					Name: "repository",
				},
			},
			err: sdkerrors.ErrUnauthorized,
		},
		{
			desc: "CreatorNotFound",
			request: &types.MsgDeleteTag{
				Creator: "Z",
			},
			err: sdkerrors.ErrKeyNotFound,
		},
		{
			desc: "RepositoryNotFound",
			request: &types.MsgDeleteTag{
				Creator: "A",
				RepositoryId: types.RepositoryId{
					Id:   creator,
					Name: "notexists",
				},
			},
			err: sdkerrors.ErrKeyNotFound,
		},
		{
			desc: "TagNotFound",
			request: &types.MsgDeleteTag{
				Creator: creator,
				RepositoryId: types.RepositoryId{
					Id:   creator,
					Name: "repository",
				},
				Tag: "tag",
			},
			err: sdkerrors.ErrInvalidRequest,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.DeleteTag(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestTagMsgServerMultiDelete(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	creator := "A"

	_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator, Username: creator})
	require.NoError(t, err)
	_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "B", Username: "B"})
	require.NoError(t, err)
	_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository", Owner: creator})
	require.NoError(t, err)
	_, err = srv.MultiSetTag(ctx, &types.MsgMultiSetTag{
		Creator: creator,
		RepositoryId: types.RepositoryId{
			Id:   creator,
			Name: "repository",
		},
		Tags: []types.MsgMultiSetTag_Tag{{Name: "tag-1"}, {Name: "tag-2"}},
	})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgMultiDeleteTag
		err     error
	}{
		{
			desc: "SomeTagsNotFound",
			request: &types.MsgMultiDeleteTag{
				Creator: creator,
				RepositoryId: types.RepositoryId{
					Id:   creator,
					Name: "repository",
				},
				Tags: []string{"tag", "tag-1", "tag-2"},
			},
			err: sdkerrors.ErrInvalidRequest,
		},
		{
			desc: "Completed",
			request: &types.MsgMultiDeleteTag{
				Creator: creator,
				RepositoryId: types.RepositoryId{
					Id:   creator,
					Name: "repository",
				},
				Tags: []string{"tag-1", "tag-2"},
			},
		},
		{
			desc: "Unauthorized",
			request: &types.MsgMultiDeleteTag{
				Creator: "B",
				RepositoryId: types.RepositoryId{
					Id:   creator,
					Name: "repository",
				},
			},
			err: sdkerrors.ErrUnauthorized,
		},
		{
			desc: "CreatorNotFound",
			request: &types.MsgMultiDeleteTag{
				Creator: "Z",
			},
			err: sdkerrors.ErrKeyNotFound,
		},
		{
			desc: "RepositoryNotFound",
			request: &types.MsgMultiDeleteTag{
				Creator: "A",
				RepositoryId: types.RepositoryId{
					Id:   creator,
					Name: "notexists",
				},
			},
			err: sdkerrors.ErrKeyNotFound,
		},
		{
			desc: "TagNotFound",
			request: &types.MsgMultiDeleteTag{
				Creator: creator,
				RepositoryId: types.RepositoryId{
					Id:   creator,
					Name: "repository",
				},
				Tags: []string{"tag"},
			},
			err: sdkerrors.ErrInvalidRequest,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.MultiDeleteTag(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}
