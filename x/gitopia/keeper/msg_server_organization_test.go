package keeper

import (
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/gitopia/gitopia/x/gitopia/types"
)

func TestOrganizationMsgServerCreate(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	creator := "A"
	for i := 0; i < 5; i++ {
		resp, err := srv.CreateOrganization(ctx, &types.MsgCreateOrganization{Creator: creator})
		require.NoError(t, err)
		assert.Equal(t, i, int(resp.Id))
	}
}

func TestOrganizationMsgServerUpdate(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgUpdateOrganization
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgUpdateOrganization{Creator: creator},
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgUpdateOrganization{Creator: "B"},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgUpdateOrganization{Creator: creator, Id: 10},
			err:     sdkerrors.ErrKeyNotFound,
		},
	} {
		tc := tc
		t.Run(tc.desc, func(t *testing.T) {
			srv, ctx := setupMsgServer(t)
			_, err := srv.CreateOrganization(ctx, &types.MsgCreateOrganization{Creator: creator})
			require.NoError(t, err)

			_, err = srv.UpdateOrganization(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestOrganizationMsgServerDelete(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgDeleteOrganization
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgDeleteOrganization{Creator: creator},
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgDeleteOrganization{Creator: "B"},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "KeyNotFound",
			request: &types.MsgDeleteOrganization{Creator: creator, Id: 10},
			err:     sdkerrors.ErrKeyNotFound,
		},
	} {
		tc := tc
		t.Run(tc.desc, func(t *testing.T) {
			srv, ctx := setupMsgServer(t)

			_, err := srv.CreateOrganization(ctx, &types.MsgCreateOrganization{Creator: creator})
			require.NoError(t, err)
			_, err = srv.DeleteOrganization(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}
