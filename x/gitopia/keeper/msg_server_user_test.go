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

	/* Test user create */
	for i := 0; i < 5; i++ {
		creator := fmt.Sprintf("creator-%d", i)
		resp, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator})
		require.NoError(t, err)
		require.Equal(t, creator, string(resp.Id))
	}

	/* Test user already exists */
	for i := 0; i < 2; i++ {
		creator := "A"
		_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator})
		if i == 1 {
			require.Error(t, err)
		}
	}
}

func TestUserMsgServerUpdate(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgUpdateUser
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgUpdateUser{Creator: creator},
		},
		{
			desc:    "KeyNotFound",
			request: &types.MsgUpdateUser{Creator: "B"},
			err:     sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			srv, ctx := setupMsgServer(t)
			_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator})
			require.NoError(t, err)

			_, err = srv.UpdateUser(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestUserMsgServerDelete(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgDeleteUser
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgDeleteUser{Id: creator, Creator: creator},
		},
		{
			desc:    "KeyNotFound",
			request: &types.MsgDeleteUser{Id: "B"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "IncorrectOwner",
			request: &types.MsgDeleteUser{Id: creator, Creator: "B"},
			err:     sdkerrors.ErrUnauthorized,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			srv, ctx := setupMsgServer(t)
			_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator})
			require.NoError(t, err)

			_, err = srv.DeleteUser(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}
