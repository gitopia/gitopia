package keeper_test

import (
	"fmt"
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/require"

	"github.com/gitopia/gitopia/x/gitopia/types"
)

func TestUserMsgServerCreate(t *testing.T) {
	srv, ctx := setupMsgServer(t)

	// Test user create
	for i := 0; i < 5; i++ {
		creator := fmt.Sprintf("creator-%d", i)
		username := fmt.Sprintf("username-%d", i)
		resp, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator, Username: username})
		require.NoError(t, err)
		require.Equal(t, creator, string(resp.Id))
	}

	// Test user already exists
	_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "creator-0", Username: "A"})
	require.Error(t, err)

	// Test username already taken
	_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "A", Username: "username-0"})
	require.Error(t, err)

	// Test username already taken with different case
	_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "A", Username: "UsErNaMe-0"})
	require.Error(t, err)

	/* TODO: Test reserved names */
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

	// Test if old username is available to be taken
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
