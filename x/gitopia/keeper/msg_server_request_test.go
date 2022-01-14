package keeper_test

import (
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/require"

	"github.com/gitopia/gitopia/x/gitopia/types"
)

func TestRequestMsgServerUpdate(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgUpdateRequest
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgUpdateRequest{Id: 0, Creator: creator, Message: "{\"role\":\"TRIAGE\"}"},
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgUpdateRequest{Id: 0, Creator: "B"},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgUpdateRequest{Id: 10},
			err:     sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			srv, ctx := setupMsgServer(t)
			user, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator})
			require.NoError(t, err)
			_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository", OwnerId: user.Id, OwnerType: "USER"})
			require.NoError(t, err)
			_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "B"})
			require.NoError(t, err)
			_, err = srv.UpdateRepositoryCollaborator(ctx, &types.MsgUpdateRepositoryCollaborator{Id: 0, Creator: "A", User: "B", Role: "READ"})
			require.NoError(t, err)

			_, err = srv.UpdateRequest(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestRequestMsgServerDelete(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgDeleteRequest
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgDeleteRequest{Id: 0, Creator: creator},
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgDeleteRequest{Id: 0, Creator: "B"},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgDeleteRequest{Id: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "KeyNotFound",
			request: &types.MsgDeleteRequest{Id: 10},
			err:     sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			srv, ctx := setupMsgServer(t)
			user, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator})
			require.NoError(t, err)
			_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository", OwnerId: user.Id, OwnerType: "USER"})
			require.NoError(t, err)
			_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "B"})
			require.NoError(t, err)
			_, err = srv.UpdateRepositoryCollaborator(ctx, &types.MsgUpdateRepositoryCollaborator{Id: 0, Creator: "A", User: "B", Role: "READ"})
			require.NoError(t, err)

			_, err = srv.DeleteRequest(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}
