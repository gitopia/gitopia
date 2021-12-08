package keeper_test

import (
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/require"

	"github.com/gitopia/gitopia/x/gitopia/types"
)

func TestIssueMsgServerCreate(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	creator := "A"

	_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator})
	require.NoError(t, err)
	_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "B"})
	require.NoError(t, err)
	_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository", OwnerId: creator, OwnerType: "USER"})
	require.NoError(t, err)
	_, err = srv.SetRepositoryBranch(ctx, &types.MsgSetRepositoryBranch{Id: 0, Creator: creator, Name: "branch-1"})
	require.NoError(t, err)
	_, err = srv.SetRepositoryBranch(ctx, &types.MsgSetRepositoryBranch{Id: 0, Creator: creator, Name: "branch-2"})
	require.NoError(t, err)

	/* Test multiple Issue create */
	for i := 0; i < 5; i++ {
		resp, err := srv.CreateIssue(ctx, &types.MsgCreateIssue{Creator: creator, RepositoryId: 0})
		require.NoError(t, err)
		require.Equal(t, uint64(i), resp.Id)
	}

	for _, tc := range []struct {
		desc    string
		request *types.MsgCreateIssue
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgCreateIssue{Creator: creator, RepositoryId: 0},
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgCreateIssue{Creator: "C", RepositoryId: 0},
			err:     sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.CreateIssue(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestIssueMsgServerUpdate(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgUpdateIssue
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgUpdateIssue{Id: 0, Creator: creator},
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgUpdateIssue{Id: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Issue Not Exists",
			request: &types.MsgUpdateIssue{Id: 10, Creator: creator},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgUpdateIssue{Id: 0, Creator: "B"},
			err:     sdkerrors.ErrUnauthorized,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			srv, ctx := setupMsgServer(t)
			_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator})
			require.NoError(t, err)
			_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "B"})
			require.NoError(t, err)
			_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository", OwnerId: creator, OwnerType: "USER"})
			require.NoError(t, err)
			_, err = srv.SetRepositoryBranch(ctx, &types.MsgSetRepositoryBranch{Id: 0, Creator: creator, Name: "branch-1"})
			require.NoError(t, err)
			_, err = srv.SetRepositoryBranch(ctx, &types.MsgSetRepositoryBranch{Id: 0, Creator: creator, Name: "branch-2"})
			require.NoError(t, err)
			_, err = srv.CreateIssue(ctx, &types.MsgCreateIssue{Creator: creator, RepositoryId: 0})
			require.NoError(t, err)

			_, err = srv.UpdateIssue(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestIssueMsgServerUpdateTitle(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgUpdateIssueTitle
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgUpdateIssueTitle{Id: 0, Creator: creator},
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgUpdateIssueTitle{Id: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Issue Not Exists",
			request: &types.MsgUpdateIssueTitle{Id: 10, Creator: creator},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgUpdateIssueTitle{Id: 0, Creator: "B"},
			err:     sdkerrors.ErrUnauthorized,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			srv, ctx := setupMsgServer(t)
			_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator})
			require.NoError(t, err)
			_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "B"})
			require.NoError(t, err)
			_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository", OwnerId: creator, OwnerType: "USER"})
			require.NoError(t, err)
			_, err = srv.SetRepositoryBranch(ctx, &types.MsgSetRepositoryBranch{Id: 0, Creator: creator, Name: "branch-1"})
			require.NoError(t, err)
			_, err = srv.SetRepositoryBranch(ctx, &types.MsgSetRepositoryBranch{Id: 0, Creator: creator, Name: "branch-2"})
			require.NoError(t, err)
			_, err = srv.CreateIssue(ctx, &types.MsgCreateIssue{Creator: creator, RepositoryId: 0})
			require.NoError(t, err)

			_, err = srv.UpdateIssueTitle(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestIssueMsgServerUpdateDescription(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgUpdateIssueDescription
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgUpdateIssueDescription{Id: 0, Creator: creator},
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgUpdateIssueDescription{Id: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Issue Not Exists",
			request: &types.MsgUpdateIssueDescription{Id: 10, Creator: creator},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgUpdateIssueDescription{Id: 0, Creator: "B"},
			err:     sdkerrors.ErrUnauthorized,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			srv, ctx := setupMsgServer(t)
			_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator})
			require.NoError(t, err)
			_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "B"})
			require.NoError(t, err)
			_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository", OwnerId: creator, OwnerType: "USER"})
			require.NoError(t, err)
			_, err = srv.SetRepositoryBranch(ctx, &types.MsgSetRepositoryBranch{Id: 0, Creator: creator, Name: "branch-1"})
			require.NoError(t, err)
			_, err = srv.SetRepositoryBranch(ctx, &types.MsgSetRepositoryBranch{Id: 0, Creator: creator, Name: "branch-2"})
			require.NoError(t, err)
			_, err = srv.CreateIssue(ctx, &types.MsgCreateIssue{Creator: creator, RepositoryId: 0})
			require.NoError(t, err)

			_, err = srv.UpdateIssueDescription(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestIssueMsgServerSetState(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgToggleIssueState
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgToggleIssueState{Id: 0, Creator: creator},
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgToggleIssueState{Id: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Issue Not Exists",
			request: &types.MsgToggleIssueState{Id: 10, Creator: creator},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgToggleIssueState{Id: 0, Creator: "B"},
			err:     sdkerrors.ErrUnauthorized,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			srv, ctx := setupMsgServer(t)
			_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator})
			require.NoError(t, err)
			_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "B"})
			require.NoError(t, err)
			_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository", OwnerId: creator, OwnerType: "USER"})
			require.NoError(t, err)
			_, err = srv.SetRepositoryBranch(ctx, &types.MsgSetRepositoryBranch{Id: 0, Creator: creator, Name: "branch-1"})
			require.NoError(t, err)
			_, err = srv.SetRepositoryBranch(ctx, &types.MsgSetRepositoryBranch{Id: 0, Creator: creator, Name: "branch-2"})
			require.NoError(t, err)
			_, err = srv.CreateIssue(ctx, &types.MsgCreateIssue{Creator: creator, RepositoryId: 0})
			require.NoError(t, err)

			_, err = srv.ToggleIssueState(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestIssueMsgServerAddAssignees(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgAddIssueAssignees
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgAddIssueAssignees{Id: 0, Creator: creator},
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgAddIssueAssignees{Id: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Issue Not Exists",
			request: &types.MsgAddIssueAssignees{Id: 10, Creator: creator},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Assignee Not Exists",
			request: &types.MsgAddIssueAssignees{Id: 0, Creator: creator, Assignees: []string{"C"}},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Assignee Already Assigned",
			request: &types.MsgAddIssueAssignees{Id: 0, Creator: creator, Assignees: []string{"B"}},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgAddIssueAssignees{Id: 0, Creator: "B"},
			err:     sdkerrors.ErrUnauthorized,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			srv, ctx := setupMsgServer(t)
			_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator})
			require.NoError(t, err)
			_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "B"})
			require.NoError(t, err)
			_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository", OwnerId: creator, OwnerType: "USER"})
			require.NoError(t, err)
			_, err = srv.SetRepositoryBranch(ctx, &types.MsgSetRepositoryBranch{Id: 0, Creator: creator, Name: "branch-1"})
			require.NoError(t, err)
			_, err = srv.SetRepositoryBranch(ctx, &types.MsgSetRepositoryBranch{Id: 0, Creator: creator, Name: "branch-2"})
			require.NoError(t, err)
			_, err = srv.CreateIssue(ctx, &types.MsgCreateIssue{Creator: creator, RepositoryId: 0})
			require.NoError(t, err)
			_, err = srv.AddIssueAssignees(ctx, &types.MsgAddIssueAssignees{Id: 0, Creator: creator, Assignees: []string{"B"}})
			require.NoError(t, err)

			_, err = srv.AddIssueAssignees(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestIssueMsgServerRemoveAssignees(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgRemoveIssueAssignees
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgRemoveIssueAssignees{Id: 0, Creator: creator},
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgRemoveIssueAssignees{Id: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Issue Not Exists",
			request: &types.MsgRemoveIssueAssignees{Id: 10, Creator: creator},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Assignee Not Assigned",
			request: &types.MsgRemoveIssueAssignees{Id: 0, Creator: creator, Assignees: []string{"C"}},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgRemoveIssueAssignees{Id: 0, Creator: "B"},
			err:     sdkerrors.ErrUnauthorized,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			srv, ctx := setupMsgServer(t)
			_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator})
			require.NoError(t, err)
			_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "B"})
			require.NoError(t, err)
			_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository", OwnerId: creator, OwnerType: "USER"})
			require.NoError(t, err)
			_, err = srv.SetRepositoryBranch(ctx, &types.MsgSetRepositoryBranch{Id: 0, Creator: creator, Name: "branch-1"})
			require.NoError(t, err)
			_, err = srv.SetRepositoryBranch(ctx, &types.MsgSetRepositoryBranch{Id: 0, Creator: creator, Name: "branch-2"})
			require.NoError(t, err)
			_, err = srv.CreateIssue(ctx, &types.MsgCreateIssue{Creator: creator, RepositoryId: 0})
			require.NoError(t, err)
			_, err = srv.AddIssueAssignees(ctx, &types.MsgAddIssueAssignees{Id: 0, Creator: creator, Assignees: []string{"B"}})
			require.NoError(t, err)

			_, err = srv.RemoveIssueAssignees(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestIssueMsgServerAddLabels(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgAddIssueLabels
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgAddIssueLabels{IssueId: 0, Creator: creator},
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgAddIssueLabels{IssueId: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Issue Not Exists",
			request: &types.MsgAddIssueLabels{IssueId: 10, Creator: creator},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "LabelId Not Exists",
			request: &types.MsgAddIssueLabels{IssueId: 0, Creator: creator, LabelIds: []uint64{3}},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "LabelId Already Assigned",
			request: &types.MsgAddIssueLabels{IssueId: 0, Creator: creator, LabelIds: []uint64{1}},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgAddIssueLabels{IssueId: 0, Creator: "B"},
			err:     sdkerrors.ErrUnauthorized,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			srv, ctx := setupMsgServer(t)
			_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator})
			require.NoError(t, err)
			_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "B"})
			require.NoError(t, err)
			_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository", OwnerId: creator, OwnerType: "USER"})
			require.NoError(t, err)
			_, err = srv.SetRepositoryBranch(ctx, &types.MsgSetRepositoryBranch{Id: 0, Creator: creator, Name: "branch-1"})
			require.NoError(t, err)
			_, err = srv.SetRepositoryBranch(ctx, &types.MsgSetRepositoryBranch{Id: 0, Creator: creator, Name: "branch-2"})
			require.NoError(t, err)
			_, err = srv.CreateIssue(ctx, &types.MsgCreateIssue{Creator: creator, RepositoryId: 0})
			require.NoError(t, err)
			_, err = srv.CreateRepositoryLabel(ctx, &types.MsgCreateRepositoryLabel{Id: 0, Creator: creator, Name: "label"})
			require.NoError(t, err)
			_, err = srv.AddIssueLabels(ctx, &types.MsgAddIssueLabels{IssueId: 0, Creator: creator, LabelIds: []uint64{1}})
			require.NoError(t, err)

			_, err = srv.AddIssueLabels(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestIssueMsgServerRemoveLabels(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgRemoveIssueLabels
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgRemoveIssueLabels{IssueId: 0, Creator: creator},
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgRemoveIssueLabels{IssueId: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Issue Not Exists",
			request: &types.MsgRemoveIssueLabels{IssueId: 10, Creator: creator},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "LabelId Not Exists",
			request: &types.MsgRemoveIssueLabels{IssueId: 0, Creator: creator, LabelIds: []uint64{3}},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "LabelId Not Assigned",
			request: &types.MsgRemoveIssueLabels{IssueId: 0, Creator: creator, LabelIds: []uint64{1}},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgRemoveIssueLabels{IssueId: 0, Creator: "B"},
			err:     sdkerrors.ErrUnauthorized,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			srv, ctx := setupMsgServer(t)
			_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator})
			require.NoError(t, err)
			_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "B"})
			require.NoError(t, err)
			_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository", OwnerId: creator, OwnerType: "USER"})
			require.NoError(t, err)
			_, err = srv.SetRepositoryBranch(ctx, &types.MsgSetRepositoryBranch{Id: 0, Creator: creator, Name: "branch-1"})
			require.NoError(t, err)
			_, err = srv.SetRepositoryBranch(ctx, &types.MsgSetRepositoryBranch{Id: 0, Creator: creator, Name: "branch-2"})
			require.NoError(t, err)
			_, err = srv.CreateIssue(ctx, &types.MsgCreateIssue{Creator: creator, RepositoryId: 0})
			require.NoError(t, err)
			_, err = srv.CreateRepositoryLabel(ctx, &types.MsgCreateRepositoryLabel{Id: 0, Creator: creator, Name: "label"})
			require.NoError(t, err)

			_, err = srv.RemoveIssueLabels(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestIssueMsgServerDelete(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgDeleteIssue
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgDeleteIssue{Creator: creator, Id: 0},
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgDeleteIssue{Creator: "B", Id: 0},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "KeyNotFound",
			request: &types.MsgDeleteIssue{Creator: creator, Id: 10},
			err:     sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			srv, ctx := setupMsgServer(t)
			_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator})
			require.NoError(t, err)
			_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "B"})
			require.NoError(t, err)
			_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository", OwnerId: creator, OwnerType: "USER"})
			require.NoError(t, err)
			_, err = srv.SetRepositoryBranch(ctx, &types.MsgSetRepositoryBranch{Id: 0, Creator: creator, Name: "branch-1"})
			require.NoError(t, err)
			_, err = srv.SetRepositoryBranch(ctx, &types.MsgSetRepositoryBranch{Id: 0, Creator: creator, Name: "branch-2"})
			require.NoError(t, err)
			_, err = srv.CreateIssue(ctx, &types.MsgCreateIssue{Creator: creator, RepositoryId: 0})
			require.NoError(t, err)

			_, err = srv.DeleteIssue(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}
