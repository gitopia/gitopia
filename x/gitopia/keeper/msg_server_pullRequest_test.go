package keeper_test

import (
	"context"
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/require"

	"github.com/gitopia/gitopia/v4/x/gitopia/types"
)

func TestPullRequestMsgServerCreate(t *testing.T) {
	srv, ctx := setupMsgServer(t)

	users, repositoryId, branches := setupPrePullRequest(ctx, t, srv)

	for _, tc := range []struct {
		desc    string
		request *types.MsgCreatePullRequest
		err     error
	}{
		{
			desc:    "Creator Not Exists",
			request: &types.MsgCreatePullRequest{Creator: "C", HeadRepositoryId: repositoryId, HeadBranch: branches[0], BaseRepositoryId: repositoryId, BaseBranch: branches[1]},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Head Repository Not Exists",
			request: &types.MsgCreatePullRequest{Creator: users[0], HeadRepositoryId: types.RepositoryId{Id: "id", Name: "name"}, HeadBranch: branches[0], BaseRepositoryId: repositoryId, BaseBranch: branches[1]},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Base Repository Not Exists",
			request: &types.MsgCreatePullRequest{Creator: users[0], HeadRepositoryId: repositoryId, HeadBranch: branches[0], BaseRepositoryId: types.RepositoryId{Id: "id", Name: "name"}, BaseBranch: branches[1]},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Head Branch Not Exists",
			request: &types.MsgCreatePullRequest{Creator: users[0], HeadRepositoryId: repositoryId, HeadBranch: "unknown-branch", BaseRepositoryId: repositoryId, BaseBranch: branches[1]},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Base Branch Not Exists",
			request: &types.MsgCreatePullRequest{Creator: users[0], HeadRepositoryId: repositoryId, HeadBranch: branches[0], BaseRepositoryId: repositoryId, BaseBranch: "unknown-branch"},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Same Head and Base Branch",
			request: &types.MsgCreatePullRequest{Creator: users[0], HeadRepositoryId: repositoryId, HeadBranch: branches[0], BaseRepositoryId: repositoryId, BaseBranch: branches[0]},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Completed",
			request: &types.MsgCreatePullRequest{Creator: users[0], HeadRepositoryId: repositoryId, HeadBranch: branches[0], BaseRepositoryId: repositoryId, BaseBranch: branches[1]},
		},
		{
			desc:    "Duplicate PullRequest",
			request: &types.MsgCreatePullRequest{Creator: users[0], HeadRepositoryId: repositoryId, HeadBranch: branches[0], BaseRepositoryId: repositoryId, BaseBranch: branches[1]},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc: "IssueIid does not exist",
			request: &types.MsgCreatePullRequest{Creator: users[0],
				HeadRepositoryId: repositoryId,
				HeadBranch:       branches[0],
				BaseRepositoryId: repositoryId,
				BaseBranch:       branches[2],
				IssueIids:        []uint64{2},
			},
			err: sdkerrors.ErrKeyNotFound,
		},
		{
			desc: "Link issue",
			request: &types.MsgCreatePullRequest{Creator: users[0],
				HeadRepositoryId: repositoryId,
				HeadBranch:       branches[0],
				BaseRepositoryId: repositoryId,
				BaseBranch:       branches[2],
				IssueIids:        []uint64{1},
			},
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err := srv.CreatePullRequest(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestPullRequestMsgServerUpdateTitle(t *testing.T) {
	srv, ctx := setupMsgServer(t)

	users, repositoryId, branches := setupPrePullRequest(ctx, t, srv)
	_, err := srv.CreatePullRequest(ctx, &types.MsgCreatePullRequest{Creator: users[0], HeadRepositoryId: repositoryId, HeadBranch: branches[0], BaseRepositoryId: repositoryId, BaseBranch: branches[1]})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgUpdatePullRequestTitle
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgUpdatePullRequestTitle{Creator: users[0], RepositoryId: 0, Iid: 1},
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgUpdatePullRequestTitle{Creator: "C", RepositoryId: 0, Iid: 1},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "PullRequest Not Exists",
			request: &types.MsgUpdatePullRequestTitle{Creator: users[0], RepositoryId: 0, Iid: 0},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgUpdatePullRequestTitle{Creator: users[1], RepositoryId: 0, Iid: 1, Title: "title"},
			err:     sdkerrors.ErrUnauthorized,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err := srv.UpdatePullRequestTitle(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestPullRequestMsgServerUpdateDescription(t *testing.T) {
	srv, ctx := setupMsgServer(t)

	users, repositoryId, branches := setupPrePullRequest(ctx, t, srv)
	_, err := srv.CreatePullRequest(ctx, &types.MsgCreatePullRequest{Creator: users[0], HeadRepositoryId: repositoryId, HeadBranch: branches[0], BaseRepositoryId: repositoryId, BaseBranch: branches[1]})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgUpdatePullRequestDescription
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgUpdatePullRequestDescription{Creator: users[0], RepositoryId: 0, Iid: 1},
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgUpdatePullRequestDescription{Creator: "C", RepositoryId: 0, Iid: 1},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "PullRequest Not Exists",
			request: &types.MsgUpdatePullRequestDescription{Creator: users[0], RepositoryId: 0, Iid: 0},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgUpdatePullRequestDescription{Creator: users[1], RepositoryId: 0, Iid: 1, Description: "description"},
			err:     sdkerrors.ErrUnauthorized,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err := srv.UpdatePullRequestDescription(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestPullRequestMsgServerSetState(t *testing.T) {
	srv, ctx := setupMsgServer(t)

	users, repositoryId, branches := setupPrePullRequest(ctx, t, srv)
	_, err := srv.CreatePullRequest(ctx, &types.MsgCreatePullRequest{Creator: users[0], HeadRepositoryId: repositoryId, HeadBranch: branches[0], BaseRepositoryId: repositoryId, BaseBranch: branches[1]})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgSetPullRequestState
		err     error
	}{
		{
			desc:    "Creator Not Exists",
			request: &types.MsgSetPullRequestState{Creator: "C", RepositoryId: 0, Iid: 1, State: "CLOSED"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "PullRequest Not Exists",
			request: &types.MsgSetPullRequestState{Creator: users[0], RepositoryId: 0, Iid: 0, State: "CLOSED"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Invalid State",
			request: &types.MsgSetPullRequestState{Creator: users[0], RepositoryId: 0, Iid: 1, State: "INVALID"},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Invalid State Change",
			request: &types.MsgSetPullRequestState{Creator: users[0], RepositoryId: 0, Iid: 1, State: "OPEN"},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgSetPullRequestState{Creator: users[1], RepositoryId: 0, Iid: 1, State: "CLOSED"},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Completed",
			request: &types.MsgSetPullRequestState{Creator: users[0], RepositoryId: 0, Iid: 1, State: "CLOSED"},
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.SetPullRequestState(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestPullRequestMsgServerAddReviewers(t *testing.T) {
	srv, ctx := setupMsgServer(t)

	users, repositoryId, branches := setupPrePullRequest(ctx, t, srv)
	_, err := srv.CreatePullRequest(ctx, &types.MsgCreatePullRequest{Creator: users[0], HeadRepositoryId: repositoryId, HeadBranch: branches[0], BaseRepositoryId: repositoryId, BaseBranch: branches[1]})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgAddPullRequestReviewers
		err     error
	}{
		{
			desc:    "Creator Not Exists",
			request: &types.MsgAddPullRequestReviewers{Creator: "C", RepositoryId: 0, Iid: 1},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "PullRequest Not Exists",
			request: &types.MsgAddPullRequestReviewers{Creator: users[0], RepositoryId: 0, Iid: 0},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Reviewer Not Exists",
			request: &types.MsgAddPullRequestReviewers{Creator: users[0], RepositoryId: 0, Iid: 1, Reviewers: []string{"C"}},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgAddPullRequestReviewers{Creator: users[1], RepositoryId: 0, Iid: 1},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Completed",
			request: &types.MsgAddPullRequestReviewers{Creator: users[0], RepositoryId: 0, Iid: 1, Reviewers: []string{users[1]}},
		},
		{
			desc:    "Reviewer Already Assigned",
			request: &types.MsgAddPullRequestReviewers{Creator: users[0], RepositoryId: 0, Iid: 1, Reviewers: []string{users[1]}},
			err:     sdkerrors.ErrInvalidRequest,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.AddPullRequestReviewers(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestPullRequestMsgServerRemoveReviewers(t *testing.T) {
	srv, ctx := setupMsgServer(t)

	users, repositoryId, branches := setupPrePullRequest(ctx, t, srv)
	_, err := srv.CreatePullRequest(ctx, &types.MsgCreatePullRequest{Creator: users[0], HeadRepositoryId: repositoryId, HeadBranch: branches[0], BaseRepositoryId: repositoryId, BaseBranch: branches[1]})
	require.NoError(t, err)
	_, err = srv.AddPullRequestReviewers(ctx, &types.MsgAddPullRequestReviewers{Creator: users[0], RepositoryId: 0, Iid: 1, Reviewers: []string{users[1]}})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgRemovePullRequestReviewers
		err     error
	}{
		{
			desc:    "Creator Not Exists",
			request: &types.MsgRemovePullRequestReviewers{Creator: "C", RepositoryId: 0, Iid: 1},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "PullRequest Not Exists",
			request: &types.MsgRemovePullRequestReviewers{Creator: users[0], RepositoryId: 0, Iid: 0},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgRemovePullRequestReviewers{Creator: users[1], RepositoryId: 0, Iid: 1},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Completed",
			request: &types.MsgRemovePullRequestReviewers{Creator: users[0], RepositoryId: 0, Iid: 1, Reviewers: []string{users[1]}},
		},
		{
			desc:    "Reviewer Not Assigned",
			request: &types.MsgRemovePullRequestReviewers{Creator: users[0], RepositoryId: 0, Iid: 1, Reviewers: []string{users[1]}},
			err:     sdkerrors.ErrInvalidRequest,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {

			_, err = srv.RemovePullRequestReviewers(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestPullRequestMsgServerAddAssignees(t *testing.T) {
	srv, ctx := setupMsgServer(t)

	users, repositoryId, branches := setupPrePullRequest(ctx, t, srv)
	_, err := srv.CreatePullRequest(ctx, &types.MsgCreatePullRequest{Creator: users[0], HeadRepositoryId: repositoryId, HeadBranch: branches[0], BaseRepositoryId: repositoryId, BaseBranch: branches[1]})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgAddPullRequestAssignees
		err     error
	}{
		{
			desc:    "Creator Not Exists",
			request: &types.MsgAddPullRequestAssignees{Creator: "C", RepositoryId: 0, Iid: 1},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "PullRequest Not Exists",
			request: &types.MsgAddPullRequestAssignees{Creator: users[0], RepositoryId: 0, Iid: 0},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Assignee Not Exists",
			request: &types.MsgAddPullRequestAssignees{Creator: users[0], RepositoryId: 0, Iid: 1, Assignees: []string{"C"}},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgAddPullRequestAssignees{Creator: users[1], RepositoryId: 0, Iid: 1},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Completed",
			request: &types.MsgAddPullRequestAssignees{Creator: users[0], RepositoryId: 0, Iid: 1, Assignees: []string{users[1]}},
		},
		{
			desc:    "Assignee Already Assigned",
			request: &types.MsgAddPullRequestAssignees{Creator: users[0], RepositoryId: 0, Iid: 1, Assignees: []string{users[1]}},
			err:     sdkerrors.ErrInvalidRequest,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.AddPullRequestAssignees(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestPullRequestMsgServerRemoveAssignees(t *testing.T) {
	srv, ctx := setupMsgServer(t)

	users, repositoryId, branches := setupPrePullRequest(ctx, t, srv)
	_, err := srv.CreatePullRequest(ctx, &types.MsgCreatePullRequest{Creator: users[0], HeadRepositoryId: repositoryId, HeadBranch: branches[0], BaseRepositoryId: repositoryId, BaseBranch: branches[1]})
	require.NoError(t, err)
	_, err = srv.AddPullRequestAssignees(ctx, &types.MsgAddPullRequestAssignees{Creator: users[0], RepositoryId: 0, Iid: 1, Assignees: []string{users[1]}})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgRemovePullRequestAssignees
		err     error
	}{

		{
			desc:    "Creator Not Exists",
			request: &types.MsgRemovePullRequestAssignees{Creator: "C", RepositoryId: 0, Iid: 1},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "PullRequest Not Exists",
			request: &types.MsgRemovePullRequestAssignees{Creator: users[0], RepositoryId: 0, Iid: 0},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgRemovePullRequestAssignees{Creator: users[1], RepositoryId: 0, Iid: 1},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Completed",
			request: &types.MsgRemovePullRequestAssignees{Creator: users[0], RepositoryId: 0, Iid: 1, Assignees: []string{users[1]}},
		},
		{
			desc:    "Assignee Not Assigned",
			request: &types.MsgRemovePullRequestAssignees{Creator: users[0], RepositoryId: 0, Iid: 1, Assignees: []string{users[1]}},
			err:     sdkerrors.ErrInvalidRequest,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.RemovePullRequestAssignees(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestPullRequestMsgServerAddLabels(t *testing.T) {
	srv, ctx := setupMsgServer(t)

	users, repositoryId, branches := setupPrePullRequest(ctx, t, srv)
	_, err := srv.CreatePullRequest(ctx, &types.MsgCreatePullRequest{Creator: users[0], HeadRepositoryId: repositoryId, HeadBranch: branches[0], BaseRepositoryId: repositoryId, BaseBranch: branches[1]})
	require.NoError(t, err)
	_, err = srv.CreateRepositoryLabel(ctx, &types.MsgCreateRepositoryLabel{Creator: users[0], RepositoryId: repositoryId, Name: "label"})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgAddPullRequestLabels
		err     error
	}{
		{
			desc:    "Creator Not Exists",
			request: &types.MsgAddPullRequestLabels{Creator: "C", RepositoryId: 0, Iid: 1},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "PullRequest Not Exists",
			request: &types.MsgAddPullRequestLabels{Creator: users[0], RepositoryId: 0, Iid: 0},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "LabelId Not Exists",
			request: &types.MsgAddPullRequestLabels{Creator: users[0], RepositoryId: 0, Iid: 1, LabelIds: []uint64{3}},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgAddPullRequestLabels{Creator: users[1], RepositoryId: 0, Iid: 1},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Completed",
			request: &types.MsgAddPullRequestLabels{Creator: users[0], RepositoryId: 0, Iid: 1, LabelIds: []uint64{1}},
		},
		{
			desc:    "LabelId Already Assigned",
			request: &types.MsgAddPullRequestLabels{Creator: users[0], RepositoryId: 0, Iid: 1, LabelIds: []uint64{1}},
			err:     sdkerrors.ErrInvalidRequest,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.AddPullRequestLabels(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestPullRequestMsgServerRemoveLabels(t *testing.T) {
	srv, ctx := setupMsgServer(t)

	users, repositoryId, branches := setupPrePullRequest(ctx, t, srv)
	_, err := srv.CreatePullRequest(ctx, &types.MsgCreatePullRequest{Creator: users[0], HeadRepositoryId: repositoryId, HeadBranch: branches[0], BaseRepositoryId: repositoryId, BaseBranch: branches[1]})
	require.NoError(t, err)
	_, err = srv.CreateRepositoryLabel(ctx, &types.MsgCreateRepositoryLabel{Creator: users[0], RepositoryId: repositoryId, Name: "label"})
	require.NoError(t, err)
	_, err = srv.AddPullRequestLabels(ctx, &types.MsgAddPullRequestLabels{Creator: users[0], RepositoryId: 0, Iid: 1, LabelIds: []uint64{1}})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgRemovePullRequestLabels
		err     error
	}{

		{
			desc:    "Creator Not Exists",
			request: &types.MsgRemovePullRequestLabels{Creator: "C", RepositoryId: 0, Iid: 1},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "PullRequest Not Exists",
			request: &types.MsgRemovePullRequestLabels{Creator: users[0], RepositoryId: 0, Iid: 0},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "LabelId Not Exists",
			request: &types.MsgRemovePullRequestLabels{Creator: users[0], RepositoryId: 0, Iid: 1, LabelIds: []uint64{3}},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgRemovePullRequestLabels{Creator: users[1], RepositoryId: 0, Iid: 1},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Completed",
			request: &types.MsgRemovePullRequestLabels{Creator: users[0], RepositoryId: 0, Iid: 1, LabelIds: []uint64{1}},
		},
		{
			desc:    "LabelId Not Assigned",
			request: &types.MsgRemovePullRequestLabels{Creator: users[0], RepositoryId: 0, Iid: 1, LabelIds: []uint64{1}},
			err:     sdkerrors.ErrInvalidRequest,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.RemovePullRequestLabels(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestPullRequestMsgServerDelete(t *testing.T) {
	srv, ctx := setupMsgServer(t)

	users, repositoryId, branches := setupPrePullRequest(ctx, t, srv)
	_, err := srv.CreatePullRequest(ctx, &types.MsgCreatePullRequest{Creator: users[0], HeadRepositoryId: repositoryId, HeadBranch: branches[0], BaseRepositoryId: repositoryId, BaseBranch: branches[1]})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgDeletePullRequest
		err     error
	}{
		{
			desc:    "Unauthorized",
			request: &types.MsgDeletePullRequest{Creator: users[1], RepositoryId: 0, Iid: 1},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Valid",
			request: &types.MsgDeletePullRequest{Creator: users[0], RepositoryId: 0, Iid: 1},
		},
		{
			desc:    "KeyNotFound",
			request: &types.MsgDeletePullRequest{Creator: users[0], RepositoryId: 0, Iid: 1},
			err:     sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.DeletePullRequest(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func setupPrePullRequest(ctx context.Context, t *testing.T, srv types.MsgServer) (users []string, repositoryId types.RepositoryId, branches []string) {
	users = append(users, "A", "B")
	repositoryId = types.RepositoryId{
		Id:   users[0],
		Name: "repository",
	}
	branches = append(branches, "branch-X", "branch-Y", "branch-Z")

	for _, user := range users {
		_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: user, Username: user})
		require.NoError(t, err)

	}

	_, err := srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: users[0], Name: "repository", Owner: users[0]})
	require.NoError(t, err)

	for _, branch := range branches {
		_, err = srv.SetBranch(ctx, &types.MsgSetBranch{
			Creator:      users[0],
			RepositoryId: repositoryId,
			Branch: types.MsgSetBranch_Branch{
				Name: branch,
			},
		})
		require.NoError(t, err)
	}

	_, err = srv.CreateIssue(ctx,
		&types.MsgCreateIssue{Creator: users[0],
			RepositoryId: repositoryId,
			Title:        "title",
			Description:  "description",
		})
	require.NoError(t, err)

	return users, repositoryId, branches
}
