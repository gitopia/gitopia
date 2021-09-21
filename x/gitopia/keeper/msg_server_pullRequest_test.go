package keeper

import (
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/gitopia/gitopia/x/gitopia/types"
)

func TestPullRequestMsgServerCreate(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	creator := "A"
	for i := 0; i < 5; i++ {
		resp, err := srv.CreatePullRequest(ctx, &types.MsgCreatePullRequest{Creator: creator})
		require.NoError(t, err)
		assert.Equal(t, i, int(resp.Id))
	}
}

func TestPullRequestMsgServerUpdate(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgUpdatePullRequest
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgUpdatePullRequest{Creator: creator},
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgUpdatePullRequest{Creator: "B"},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgUpdatePullRequest{Creator: creator, Id: 10},
			err:     sdkerrors.ErrKeyNotFound,
		},
	} {
		tc := tc
		t.Run(tc.desc, func(t *testing.T) {
			srv, ctx := setupMsgServer(t)
			_, err := srv.CreatePullRequest(ctx, &types.MsgCreatePullRequest{Creator: creator})
			require.NoError(t, err)

			_, err = srv.UpdatePullRequest(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestPullRequestMsgServerDelete(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgDeletePullRequest
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgDeletePullRequest{Creator: creator},
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgDeletePullRequest{Creator: "B"},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "KeyNotFound",
			request: &types.MsgDeletePullRequest{Creator: creator, Id: 10},
			err:     sdkerrors.ErrKeyNotFound,
		},
	} {
		tc := tc
		t.Run(tc.desc, func(t *testing.T) {
			srv, ctx := setupMsgServer(t)

			_, err := srv.CreatePullRequest(ctx, &types.MsgCreatePullRequest{Creator: creator})
			require.NoError(t, err)
			_, err = srv.DeletePullRequest(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}
