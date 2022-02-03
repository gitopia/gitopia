package keeper_test

import (
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/require"

	"github.com/gitopia/gitopia/x/gitopia/types"
)

func TestPullRequestMsgServerCreate(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	creator := "A"

	_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator})
	require.NoError(t, err)
	_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "B"})
	require.NoError(t, err)
	_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository", OwnerId: creator, OwnerType: "USER"})
	require.NoError(t, err)
	_, err = srv.SetRepositoryBranch(ctx, &types.MsgSetRepositoryBranch{Id: 0, Creator: creator, Name: "branch"})
	require.NoError(t, err)
	_, err = srv.SetRepositoryBranch(ctx, &types.MsgSetRepositoryBranch{Id: 0, Creator: creator, Name: "branch-1"})
	require.NoError(t, err)
	_, err = srv.SetRepositoryBranch(ctx, &types.MsgSetRepositoryBranch{Id: 0, Creator: creator, Name: "branch-2"})
	require.NoError(t, err)
	_, err = srv.CreatePullRequest(ctx, &types.MsgCreatePullRequest{Creator: creator, HeadRepoId: 0, HeadBranch: "branch-1", BaseRepoId: 0, BaseBranch: "branch-2"})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgCreatePullRequest
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgCreatePullRequest{Creator: creator, HeadRepoId: 0, HeadBranch: "branch", BaseRepoId: 0, BaseBranch: "branch-1"},
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgCreatePullRequest{Creator: "C", HeadRepoId: 0, HeadBranch: "branch-1", BaseRepoId: 0, BaseBranch: "branch-2"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Head Repository Not Exists",
			request: &types.MsgCreatePullRequest{Creator: creator, HeadRepoId: 10, HeadBranch: "branch-1", BaseRepoId: 0, BaseBranch: "branch-2"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Base Repository Not Exists",
			request: &types.MsgCreatePullRequest{Creator: creator, HeadRepoId: 0, HeadBranch: "branch-1", BaseRepoId: 10, BaseBranch: "branch-2"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Head Branch Not Exists",
			request: &types.MsgCreatePullRequest{Creator: creator, HeadRepoId: 0, HeadBranch: "unknown-branch", BaseRepoId: 0, BaseBranch: "branch-2"},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Base Branch Not Exists",
			request: &types.MsgCreatePullRequest{Creator: creator, HeadRepoId: 0, HeadBranch: "branch-1", BaseRepoId: 0, BaseBranch: "unknown-branch"},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Same Head and Base Branch",
			request: &types.MsgCreatePullRequest{Creator: creator, HeadRepoId: 0, HeadBranch: "branch-1", BaseRepoId: 0, BaseBranch: "branch-1"},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Duplicate PullRequest",
			request: &types.MsgCreatePullRequest{Creator: creator, HeadRepoId: 0, HeadBranch: "branch-1", BaseRepoId: 0, BaseBranch: "branch-2"},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgCreatePullRequest{Creator: "B", HeadRepoId: 0, HeadBranch: "branch-1", BaseRepoId: 0, BaseBranch: "branch-2"},
			err:     sdkerrors.ErrUnauthorized,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.CreatePullRequest(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
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
			request: &types.MsgUpdatePullRequest{Id: 0, Creator: creator},
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgUpdatePullRequest{Id: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "PullRequest Not Exists",
			request: &types.MsgUpdatePullRequest{Id: 10, Creator: creator},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgUpdatePullRequest{Id: 0, Creator: "B"},
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
			_, err = srv.CreatePullRequest(ctx, &types.MsgCreatePullRequest{Creator: creator, HeadRepoId: 0, HeadBranch: "branch-1", BaseRepoId: 0, BaseBranch: "branch-2"})
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

func TestPullRequestMsgServerUpdateTitle(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgUpdatePullRequestTitle
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgUpdatePullRequestTitle{Id: 0, Creator: creator},
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgUpdatePullRequestTitle{Id: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "PullRequest Not Exists",
			request: &types.MsgUpdatePullRequestTitle{Id: 10, Creator: creator},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgUpdatePullRequestTitle{Id: 0, Creator: "B", Title: "title"},
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
			_, err = srv.CreatePullRequest(ctx, &types.MsgCreatePullRequest{Creator: creator, HeadRepoId: 0, HeadBranch: "branch-1", BaseRepoId: 0, BaseBranch: "branch-2"})
			require.NoError(t, err)

			_, err = srv.UpdatePullRequestTitle(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestPullRequestMsgServerUpdateDescription(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgUpdatePullRequestDescription
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgUpdatePullRequestDescription{Id: 0, Creator: creator},
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgUpdatePullRequestDescription{Id: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "PullRequest Not Exists",
			request: &types.MsgUpdatePullRequestDescription{Id: 10, Creator: creator},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgUpdatePullRequestDescription{Id: 0, Creator: "B", Description: "description"},
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
			_, err = srv.CreatePullRequest(ctx, &types.MsgCreatePullRequest{Creator: creator, HeadRepoId: 0, HeadBranch: "branch-1", BaseRepoId: 0, BaseBranch: "branch-2"})
			require.NoError(t, err)

			_, err = srv.UpdatePullRequestDescription(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestPullRequestMsgServerSetState(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgSetPullRequestState
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgSetPullRequestState{Id: 0, Creator: creator, State: "CLOSED"},
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgSetPullRequestState{Id: 0, Creator: "C", State: "CLOSED"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "PullRequest Not Exists",
			request: &types.MsgSetPullRequestState{Id: 10, Creator: creator, State: "CLOSED"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Invalid State",
			request: &types.MsgSetPullRequestState{Id: 0, Creator: creator, State: "INVALID"},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Invalid State Change",
			request: &types.MsgSetPullRequestState{Id: 0, Creator: creator, State: "OPEN"},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgSetPullRequestState{Id: 0, Creator: "B", State: "CLOSED"},
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
			_, err = srv.CreatePullRequest(ctx, &types.MsgCreatePullRequest{Creator: creator, HeadRepoId: 0, HeadBranch: "branch-1", BaseRepoId: 0, BaseBranch: "branch-2"})
			require.NoError(t, err)

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
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgAddPullRequestReviewers
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgAddPullRequestReviewers{Id: 0, Creator: creator},
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgAddPullRequestReviewers{Id: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "PullRequest Not Exists",
			request: &types.MsgAddPullRequestReviewers{Id: 10, Creator: creator},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Reviewer Not Exists",
			request: &types.MsgAddPullRequestReviewers{Id: 0, Creator: creator, Reviewers: []string{"C"}},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Reviewer Already Assigned",
			request: &types.MsgAddPullRequestReviewers{Id: 0, Creator: creator, Reviewers: []string{"B"}},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgAddPullRequestReviewers{Id: 0, Creator: "B"},
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
			_, err = srv.CreatePullRequest(ctx, &types.MsgCreatePullRequest{Creator: creator, HeadRepoId: 0, HeadBranch: "branch-1", BaseRepoId: 0, BaseBranch: "branch-2"})
			require.NoError(t, err)
			_, err = srv.AddPullRequestReviewers(ctx, &types.MsgAddPullRequestReviewers{Id: 0, Creator: creator, Reviewers: []string{"B"}})
			require.NoError(t, err)

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
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgRemovePullRequestReviewers
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgRemovePullRequestReviewers{Id: 0, Creator: creator},
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgRemovePullRequestReviewers{Id: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "PullRequest Not Exists",
			request: &types.MsgRemovePullRequestReviewers{Id: 10, Creator: creator},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Reviewer Not Assigned",
			request: &types.MsgRemovePullRequestReviewers{Id: 0, Creator: creator, Reviewers: []string{"C"}},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgRemovePullRequestReviewers{Id: 0, Creator: "B"},
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
			_, err = srv.CreatePullRequest(ctx, &types.MsgCreatePullRequest{Creator: creator, HeadRepoId: 0, HeadBranch: "branch-1", BaseRepoId: 0, BaseBranch: "branch-2"})
			require.NoError(t, err)
			_, err = srv.AddPullRequestReviewers(ctx, &types.MsgAddPullRequestReviewers{Id: 0, Creator: creator, Reviewers: []string{"B"}})
			require.NoError(t, err)

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
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgAddPullRequestAssignees
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgAddPullRequestAssignees{Id: 0, Creator: creator},
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgAddPullRequestAssignees{Id: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "PullRequest Not Exists",
			request: &types.MsgAddPullRequestAssignees{Id: 10, Creator: creator},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Assignee Not Exists",
			request: &types.MsgAddPullRequestAssignees{Id: 0, Creator: creator, Assignees: []string{"C"}},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Assignee Already Assigned",
			request: &types.MsgAddPullRequestAssignees{Id: 0, Creator: creator, Assignees: []string{"B"}},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgAddPullRequestAssignees{Id: 0, Creator: "B"},
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
			_, err = srv.CreatePullRequest(ctx, &types.MsgCreatePullRequest{Creator: creator, HeadRepoId: 0, HeadBranch: "branch-1", BaseRepoId: 0, BaseBranch: "branch-2"})
			require.NoError(t, err)
			_, err = srv.AddPullRequestAssignees(ctx, &types.MsgAddPullRequestAssignees{Id: 0, Creator: creator, Assignees: []string{"B"}})
			require.NoError(t, err)

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
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgRemovePullRequestAssignees
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgRemovePullRequestAssignees{Id: 0, Creator: creator},
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgRemovePullRequestAssignees{Id: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "PullRequest Not Exists",
			request: &types.MsgRemovePullRequestAssignees{Id: 10, Creator: creator},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Assignee Not Assigned",
			request: &types.MsgRemovePullRequestAssignees{Id: 0, Creator: creator, Assignees: []string{"C"}},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgRemovePullRequestAssignees{Id: 0, Creator: "B"},
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
			_, err = srv.CreatePullRequest(ctx, &types.MsgCreatePullRequest{Creator: creator, HeadRepoId: 0, HeadBranch: "branch-1", BaseRepoId: 0, BaseBranch: "branch-2"})
			require.NoError(t, err)
			_, err = srv.AddPullRequestAssignees(ctx, &types.MsgAddPullRequestAssignees{Id: 0, Creator: creator, Assignees: []string{"B"}})
			require.NoError(t, err)

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
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgAddPullRequestLabels
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgAddPullRequestLabels{PullRequestId: 0, Creator: creator},
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgAddPullRequestLabels{PullRequestId: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "PullRequest Not Exists",
			request: &types.MsgAddPullRequestLabels{PullRequestId: 10, Creator: creator},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "LabelId Not Exists",
			request: &types.MsgAddPullRequestLabels{PullRequestId: 0, Creator: creator, LabelIds: []uint64{3}},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "LabelId Already Assigned",
			request: &types.MsgAddPullRequestLabels{PullRequestId: 0, Creator: creator, LabelIds: []uint64{1}},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgAddPullRequestLabels{PullRequestId: 0, Creator: "B"},
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
			_, err = srv.CreatePullRequest(ctx, &types.MsgCreatePullRequest{Creator: creator, HeadRepoId: 0, HeadBranch: "branch-1", BaseRepoId: 0, BaseBranch: "branch-2"})
			require.NoError(t, err)
			_, err = srv.CreateRepositoryLabel(ctx, &types.MsgCreateRepositoryLabel{Id: 0, Creator: creator, Name: "label"})
			require.NoError(t, err)
			_, err = srv.AddPullRequestLabels(ctx, &types.MsgAddPullRequestLabels{PullRequestId: 0, Creator: creator, LabelIds: []uint64{1}})
			require.NoError(t, err)

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
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgRemovePullRequestLabels
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgRemovePullRequestLabels{PullRequestId: 0, Creator: creator},
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgRemovePullRequestLabels{PullRequestId: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "PullRequest Not Exists",
			request: &types.MsgRemovePullRequestLabels{PullRequestId: 10, Creator: creator},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "LabelId Not Exists",
			request: &types.MsgRemovePullRequestLabels{PullRequestId: 0, Creator: creator, LabelIds: []uint64{3}},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "LabelId Not Assigned",
			request: &types.MsgRemovePullRequestLabels{PullRequestId: 0, Creator: creator, LabelIds: []uint64{1}},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgRemovePullRequestLabels{PullRequestId: 0, Creator: "B"},
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
			_, err = srv.CreatePullRequest(ctx, &types.MsgCreatePullRequest{Creator: creator, HeadRepoId: 0, HeadBranch: "branch-1", BaseRepoId: 0, BaseBranch: "branch-2"})
			require.NoError(t, err)
			_, err = srv.CreateRepositoryLabel(ctx, &types.MsgCreateRepositoryLabel{Id: 0, Creator: creator, Name: "label"})
			require.NoError(t, err)

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
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgDeletePullRequest
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgDeletePullRequest{Creator: creator, Id: 0},
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgDeletePullRequest{Creator: "B", Id: 0},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "KeyNotFound",
			request: &types.MsgDeletePullRequest{Creator: creator, Id: 10},
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
			_, err = srv.CreatePullRequest(ctx, &types.MsgCreatePullRequest{Creator: creator, HeadRepoId: 0, HeadBranch: "branch-1", BaseRepoId: 0, BaseBranch: "branch-2"})
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
