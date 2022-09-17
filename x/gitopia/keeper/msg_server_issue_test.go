package keeper_test

import (
	"context"
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/require"

	"github.com/gitopia/gitopia/x/gitopia/types"
)

func TestIssueMsgServerCreate(t *testing.T) {
	srv, ctx := setupMsgServer(t)

	users, repositoryId := setupPreIssue(ctx, t, srv)

	for _, tc := range []struct {
		desc    string
		request *types.MsgCreateIssue
		err     error
	}{
		{
			desc:    "Creator Not Exists",
			request: &types.MsgCreateIssue{Creator: "C", RepositoryId: repositoryId},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Repository Not Exists",
			request: &types.MsgCreateIssue{Creator: users[0], RepositoryId: types.RepositoryId{Id: users[0], Name: "name"}},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Completed",
			request: &types.MsgCreateIssue{Creator: users[0], RepositoryId: repositoryId},
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err := srv.CreateIssue(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestIssueMsgServerUpdateTitle(t *testing.T) {
	srv, ctx := setupMsgServer(t)

	users, repositoryId := setupPreIssue(ctx, t, srv)
	_, err := srv.CreateIssue(ctx, &types.MsgCreateIssue{Creator: users[0], RepositoryId: repositoryId})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgUpdateIssueTitle
		err     error
	}{
		{
			desc:    "Creator Not Exists",
			request: &types.MsgUpdateIssueTitle{Id: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Issue Not Exists",
			request: &types.MsgUpdateIssueTitle{Id: 10, Creator: users[0]},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgUpdateIssueTitle{Id: 0, Creator: users[1], Title: "title"},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Completed",
			request: &types.MsgUpdateIssueTitle{Id: 0, Creator: users[0], Title: "title"},
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
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
	srv, ctx := setupMsgServer(t)

	users, repositoryId := setupPreIssue(ctx, t, srv)
	_, err := srv.CreateIssue(ctx, &types.MsgCreateIssue{Creator: users[0], RepositoryId: repositoryId})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgUpdateIssueDescription
		err     error
	}{
		{
			desc:    "Creator Not Exists",
			request: &types.MsgUpdateIssueDescription{Id: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Issue Not Exists",
			request: &types.MsgUpdateIssueDescription{Id: 10, Creator: users[0]},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgUpdateIssueDescription{Id: 0, Creator: users[1], Description: "description"},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Completed",
			request: &types.MsgUpdateIssueDescription{Id: 0, Creator: users[0], Description: "description"},
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
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
	srv, ctx := setupMsgServer(t)

	users, repositoryId := setupPreIssue(ctx, t, srv)
	_, err := srv.CreateIssue(ctx, &types.MsgCreateIssue{Creator: users[0], RepositoryId: repositoryId})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgToggleIssueState
		err     error
	}{
		{
			desc:    "Creator Not Exists",
			request: &types.MsgToggleIssueState{Id: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Issue Not Exists",
			request: &types.MsgToggleIssueState{Id: 10, Creator: users[0]},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgToggleIssueState{Id: 0, Creator: users[1]},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Completed",
			request: &types.MsgToggleIssueState{Id: 0, Creator: users[0]},
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
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
	srv, ctx := setupMsgServer(t)

	users, repositoryId := setupPreIssue(ctx, t, srv)
	_, err := srv.CreateIssue(ctx, &types.MsgCreateIssue{Creator: users[0], RepositoryId: repositoryId})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgAddIssueAssignees
		err     error
	}{
		{
			desc:    "Creator Not Exists",
			request: &types.MsgAddIssueAssignees{Id: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Issue Not Exists",
			request: &types.MsgAddIssueAssignees{Id: 10, Creator: users[0]},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Assignee Not Exists",
			request: &types.MsgAddIssueAssignees{Id: 0, Creator: users[0], Assignees: []string{"C"}},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgAddIssueAssignees{Id: 0, Creator: users[1]},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Completed",
			request: &types.MsgAddIssueAssignees{Id: 0, Creator: users[0], Assignees: []string{users[1]}},
		},
		{
			desc:    "Assignee Already Assigned",
			request: &types.MsgAddIssueAssignees{Id: 0, Creator: users[0], Assignees: []string{users[1]}},
			err:     sdkerrors.ErrInvalidRequest,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
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
	srv, ctx := setupMsgServer(t)

	users, repositoryId := setupPreIssue(ctx, t, srv)
	_, err := srv.CreateIssue(ctx, &types.MsgCreateIssue{Creator: users[0], RepositoryId: repositoryId})
	require.NoError(t, err)
	_, err = srv.AddIssueAssignees(ctx, &types.MsgAddIssueAssignees{Id: 0, Creator: users[0], Assignees: []string{users[1]}})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgRemoveIssueAssignees
		err     error
	}{
		{
			desc:    "Creator Not Exists",
			request: &types.MsgRemoveIssueAssignees{Id: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Issue Not Exists",
			request: &types.MsgRemoveIssueAssignees{Id: 10, Creator: users[0]},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgRemoveIssueAssignees{Id: 0, Creator: users[1]},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Completed",
			request: &types.MsgRemoveIssueAssignees{Id: 0, Creator: users[0], Assignees: []string{users[1]}},
		},
		{
			desc:    "Assignee Not Assigned",
			request: &types.MsgRemoveIssueAssignees{Id: 0, Creator: users[0], Assignees: []string{users[1]}},
			err:     sdkerrors.ErrInvalidRequest,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
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
	srv, ctx := setupMsgServer(t)

	users, repositoryId := setupPreIssue(ctx, t, srv)
	_, err := srv.CreateRepositoryLabel(ctx, &types.MsgCreateRepositoryLabel{Creator: users[0], RepositoryId: repositoryId, Name: "label"})
	require.NoError(t, err)
	_, err = srv.CreateIssue(ctx, &types.MsgCreateIssue{Creator: users[0], RepositoryId: repositoryId})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgAddIssueLabels
		err     error
	}{
		{
			desc:    "Creator Not Exists",
			request: &types.MsgAddIssueLabels{IssueId: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Issue Not Exists",
			request: &types.MsgAddIssueLabels{IssueId: 10, Creator: users[0]},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "LabelId Not Exists",
			request: &types.MsgAddIssueLabels{IssueId: 0, Creator: users[0], LabelIds: []uint64{3}},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgAddIssueLabels{IssueId: 0, Creator: users[1]},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Completed",
			request: &types.MsgAddIssueLabels{IssueId: 0, Creator: users[0], LabelIds: []uint64{1}},
		},
		{
			desc:    "LabelId Already Assigned",
			request: &types.MsgAddIssueLabels{IssueId: 0, Creator: users[0], LabelIds: []uint64{1}},
			err:     sdkerrors.ErrInvalidRequest,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
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
	srv, ctx := setupMsgServer(t)

	users, repositoryId := setupPreIssue(ctx, t, srv)
	_, err := srv.CreateRepositoryLabel(ctx, &types.MsgCreateRepositoryLabel{Creator: users[0], RepositoryId: repositoryId, Name: "label"})
	require.NoError(t, err)
	_, err = srv.CreateIssue(ctx, &types.MsgCreateIssue{Creator: users[0], RepositoryId: repositoryId})
	require.NoError(t, err)
	_, err = srv.AddIssueLabels(ctx, &types.MsgAddIssueLabels{Creator: users[0], IssueId: 0, LabelIds: []uint64{1}})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgRemoveIssueLabels
		err     error
	}{
		{
			desc:    "Creator Not Exists",
			request: &types.MsgRemoveIssueLabels{IssueId: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Issue Not Exists",
			request: &types.MsgRemoveIssueLabels{IssueId: 10, Creator: users[0]},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "LabelId Not Exists",
			request: &types.MsgRemoveIssueLabels{IssueId: 0, Creator: users[0], LabelIds: []uint64{3}},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgRemoveIssueLabels{IssueId: 0, Creator: users[1]},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Completed",
			request: &types.MsgRemoveIssueLabels{IssueId: 0, Creator: users[0], LabelIds: []uint64{1}},
		},
		{
			desc:    "LabelId Not Assigned",
			request: &types.MsgRemoveIssueLabels{IssueId: 0, Creator: users[0], LabelIds: []uint64{1}},
			err:     sdkerrors.ErrInvalidRequest,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
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
	srv, ctx := setupMsgServer(t)

	users, repositoryId := setupPreIssue(ctx, t, srv)
	_, err := srv.CreateIssue(ctx, &types.MsgCreateIssue{Creator: users[0], RepositoryId: repositoryId})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgDeleteIssue
		err     error
	}{
		{
			desc:    "Unauthorized",
			request: &types.MsgDeleteIssue{Creator: users[1], Id: 0},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Completed",
			request: &types.MsgDeleteIssue{Creator: users[0], Id: 0},
		},
		{
			desc:    "KeyNotFound",
			request: &types.MsgDeleteIssue{Creator: users[0], Id: 0},
			err:     sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.DeleteIssue(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func setupPreIssue(ctx context.Context, t *testing.T, srv types.MsgServer) (users []string, repositoryId types.RepositoryId) {
	users = append(users, "A", "B")
	repositoryId = types.RepositoryId{
		Id:   users[0],
		Name: "repository",
	}

	for _, user := range users {
		_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: user, Username: user})
		require.NoError(t, err)

	}

	_, err := srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: users[0], Name: "repository", Owner: users[0]})
	require.NoError(t, err)

	return users, repositoryId
}
