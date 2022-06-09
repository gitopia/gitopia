package keeper_test

import (
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/require"

	"github.com/gitopia/gitopia/x/gitopia/types"
)

func TestStorageProviderMsgServerCreate(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	creator := "A"
	for i := 0; i < 5; i++ {
		resp, err := srv.CreateStorageProvider(ctx, &types.MsgCreateStorageProvider{Creator: creator})
		require.NoError(t, err)
		require.Equal(t, i, int(resp.Id))
	}
}

func TestStorageProviderMsgServerUpdate(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgUpdateStorageProvider
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgUpdateStorageProvider{Creator: creator},
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgUpdateStorageProvider{Creator: "B"},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgUpdateStorageProvider{Creator: creator, Id: 10},
			err:     sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			srv, ctx := setupMsgServer(t)
			_, err := srv.CreateStorageProvider(ctx, &types.MsgCreateStorageProvider{Creator: creator})
			require.NoError(t, err)

			_, err = srv.UpdateStorageProvider(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestStorageProviderMsgServerDelete(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgDeleteStorageProvider
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgDeleteStorageProvider{Creator: creator},
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgDeleteStorageProvider{Creator: "B"},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "KeyNotFound",
			request: &types.MsgDeleteStorageProvider{Creator: creator, Id: 10},
			err:     sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			srv, ctx := setupMsgServer(t)

			_, err := srv.CreateStorageProvider(ctx, &types.MsgCreateStorageProvider{Creator: creator})
			require.NoError(t, err)
			_, err = srv.DeleteStorageProvider(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}
