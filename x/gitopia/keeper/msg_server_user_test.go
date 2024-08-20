package keeper_test

import (
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/require"

	"github.com/gitopia/gitopia/v4/x/gitopia/types"
)

func TestUserMsgServerCreate(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgCreateUser
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgCreateUser{Creator: creator, Username: "AaaA"},
		},
		{
			desc:    "Username Already Taken",
			request: &types.MsgCreateUser{Creator: "B", Username: "AaaA"},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Username Already Taken With Different Case",
			request: &types.MsgCreateUser{Creator: "B", Username: "aaaa"},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Username Is Reserved Name",
			request: &types.MsgCreateUser{Creator: creator, Username: "bank"},
			err:     sdkerrors.ErrInvalidRequest,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err := srv.CreateUser(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestUserMsgServerUpdateUsername(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	creator := "A"

	_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator, Username: creator})
	require.NoError(t, err)
	_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "Z", Username: "Z"})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgUpdateUserUsername
		err     error
	}{
		{
			desc:    "KeyNotFound",
			request: &types.MsgUpdateUserUsername{Creator: "B", Username: "B"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Completed",
			request: &types.MsgUpdateUserUsername{Creator: creator, Username: "B"},
		},
		{
			desc:    "Username Already Taken",
			request: &types.MsgUpdateUserUsername{Creator: creator, Username: "Z"},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Username Already Taken Different Case",
			request: &types.MsgUpdateUserUsername{Creator: creator, Username: "z"},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Username Is Reserved Name",
			request: &types.MsgUpdateUserUsername{Creator: creator, Username: "bank"},
			err:     sdkerrors.ErrInvalidRequest,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.UpdateUserUsername(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}

	/* Test if old username is available to be taken */
	_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "C", Username: creator})
	require.NoError(t, err)
}

func TestUserMsgServerUpdateBio(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgUpdateUserBio
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgUpdateUserBio{Creator: creator, Bio: "bio"},
		},
		{
			desc:    "KeyNotFound",
			request: &types.MsgUpdateUserBio{Creator: "B"},
			err:     sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			srv, ctx := setupMsgServer(t)
			_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator, Username: creator})
			require.NoError(t, err)

			_, err = srv.UpdateUserBio(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestUserMsgServerUpdateAvatar(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgUpdateUserAvatar
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgUpdateUserAvatar{Creator: creator, Url: "url"},
		},
		{
			desc:    "KeyNotFound",
			request: &types.MsgUpdateUserAvatar{Creator: "B"},
			err:     sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			srv, ctx := setupMsgServer(t)
			_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator, Username: creator})
			require.NoError(t, err)

			_, err = srv.UpdateUserAvatar(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestUserMsgServerUpdatePinnedRepositories(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgUpdateUserPinnedRepositories
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgUpdateUserPinnedRepositories{Creator: creator, RepositoryId: 0},
		},
		{
			desc:    "KeyNotFound",
			request: &types.MsgUpdateUserPinnedRepositories{Creator: "B"},
			err:     sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			srv, ctx := setupMsgServer(t)
			_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator, Username: creator})
			require.NoError(t, err)

			_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository", Owner: creator})
			require.NoError(t, err)

			_, err = srv.UpdateUserPinnedRepositories(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestUserMsgServerDelete(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	creator := "A"

	_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator, Username: creator})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgDeleteUser
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgDeleteUser{Creator: creator},
		},
		{
			desc:    "KeyNotFound",
			request: &types.MsgDeleteUser{Creator: creator},
			err:     sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.DeleteUser(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}

	// Test create user after delete
	_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator, Username: creator})
	require.NoError(t, err)
}
