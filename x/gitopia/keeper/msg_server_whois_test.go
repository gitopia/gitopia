package keeper_test

import (
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/require"

	"github.com/gitopia/gitopia/x/gitopia/types"
)

func TestWhoisMsgServerCreate(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	creator := "A"
	for i := 0; i < 5; i++ {
		_, err := srv.SetWhois(ctx, &types.MsgSetWhois{Creator: creator, Name: "name"})
		require.NoError(t, err)
	}
}

func TestWhoisMsgServerUpdate(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgUpdateWhois
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgUpdateWhois{Creator: creator},
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgUpdateWhois{Creator: "B"},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "KeyNotFound",
			request: &types.MsgUpdateWhois{Creator: creator, Name: "name"},
			err:     sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			srv, ctx := setupMsgServer(t)
			_, err := srv.SetWhois(ctx, &types.MsgSetWhois{Creator: creator})
			require.NoError(t, err)

			_, err = srv.UpdateWhois(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestWhoisMsgServerDelete(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgDeleteWhois
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgDeleteWhois{Creator: creator},
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgDeleteWhois{Creator: "B"},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "KeyNotFound",
			request: &types.MsgDeleteWhois{Creator: creator, Name: "name"},
			err:     sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			srv, ctx := setupMsgServer(t)

			_, err := srv.SetWhois(ctx, &types.MsgSetWhois{Creator: creator})
			require.NoError(t, err)
			_, err = srv.DeleteWhois(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}
