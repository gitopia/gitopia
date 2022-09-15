package keeper_test

/*

TODO: Needs Fix

Failing due to `dao.go: GetDaoAddress()`

import (
	"context"
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/stretchr/testify/require"
)

func TestMemberMsgServerAdd(t *testing.T) {
	srv, ctx := setupMsgServer(t)

	users, dao := setupPreMember(ctx, t, srv)

	for _, tc := range []struct {
		desc    string
		request *types.MsgAddMember
		err     error
	}{
		{
			desc:    "Unauthorized",
			request: &types.MsgAddMember{Creator: users[1], DaoId: dao, UserId: users[1]},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Dao Not Exists",
			request: &types.MsgAddMember{Creator: users[0], DaoId: "d", UserId: users[1]},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "User Not Exists",
			request: &types.MsgAddMember{Creator: users[0], DaoId: dao, UserId: "Z"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Completed",
			request: &types.MsgAddMember{Creator: users[0], DaoId: dao, UserId: users[1], Role: types.MemberRole_MEMBER},
		},
		{
			desc:    "User Already Member",
			request: &types.MsgAddMember{Creator: users[0], DaoId: dao, UserId: users[1]},
			err:     sdkerrors.ErrInvalidRequest,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err := srv.AddMember(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestMemberMsgServerUpdateRole(t *testing.T) {
	srv, ctx := setupMsgServer(t)

	users, dao := setupPreMember(ctx, t, srv)
	_, err := srv.AddMember(ctx, &types.MsgAddMember{Creator: users[0], DaoId: dao, UserId: users[1], Role: types.MemberRole_MEMBER})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgUpdateMemberRole
		err     error
	}{
		{
			desc:    "Unauthorized",
			request: &types.MsgUpdateMemberRole{Creator: users[1], DaoId: dao, UserId: users[1]},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Dao Not Exists",
			request: &types.MsgUpdateMemberRole{Creator: users[0], DaoId: "d", UserId: users[1]},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "User Not Exists",
			request: &types.MsgUpdateMemberRole{Creator: users[0], DaoId: dao, UserId: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Completed",
			request: &types.MsgUpdateMemberRole{Creator: users[0], DaoId: dao, UserId: users[1], Role: types.MemberRole_OWNER},
		},
		{
			desc:    "Verify New Member Permission",
			request: &types.MsgUpdateMemberRole{Creator: users[1], DaoId: dao, UserId: users[1], Role: types.MemberRole_MEMBER},
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.UpdateMemberRole(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestMemberMsgServerRemove(t *testing.T) {
	srv, ctx := setupMsgServer(t)

	users, dao := setupPreMember(ctx, t, srv)
	_, err := srv.AddMember(ctx, &types.MsgAddMember{Creator: users[0], DaoId: dao, UserId: users[1], Role: types.MemberRole_MEMBER})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgRemoveMember
		err     error
	}{
		{
			desc:    "Unauthorized",
			request: &types.MsgRemoveMember{Creator: users[1], DaoId: dao, UserId: users[1]},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Dao Not Exists",
			request: &types.MsgRemoveMember{Creator: users[0], DaoId: "d", UserId: users[1]},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "User Not Exists",
			request: &types.MsgRemoveMember{Creator: users[0], DaoId: dao, UserId: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Completed",
			request: &types.MsgRemoveMember{Creator: users[0], DaoId: dao, UserId: users[1]},
		},
		{
			desc:    "Dao Member Not Found",
			request: &types.MsgRemoveMember{Creator: users[0], DaoId: dao, UserId: users[1]},
			err:     sdkerrors.ErrInvalidRequest,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.RemoveMember(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func setupPreMember(ctx context.Context, t *testing.T, srv types.MsgServer) (users []string, dao string) {
	users = append(users, "A", "B")

	for _, user := range users {
		_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: user, Username: user})
		require.NoError(t, err)
	}

	d, err := srv.CreateDao(ctx, &types.MsgCreateDao{Creator: users[0], Name: "dao", Description: "description"})
	require.NoError(t, err)

	return users, d.Id
}

*/
