package keeper_test

import (
	"context"
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/require"

	"github.com/gitopia/gitopia/v3/x/gitopia/types"
)

func TestRepositoryMsgServerCreate(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	users := setupPreRepository(ctx, t, srv)

	for _, tc := range []struct {
		desc    string
		request *types.MsgCreateRepository
		err     error
	}{
		{
			desc:    "Owner and Creator Mismatched",
			request: &types.MsgCreateRepository{Creator: users[0], Name: "name", Owner: users[1]},
			err:     sdkerrors.ErrUnauthorized,
		},

		{
			desc:    "User Not Exists",
			request: &types.MsgCreateRepository{Creator: "X", Name: "name", Owner: "X"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Completed",
			request: &types.MsgCreateRepository{Creator: users[0], Name: "name", Owner: users[0]},
		},
		{
			desc:    "Duplicate Repository Name",
			request: &types.MsgCreateRepository{Creator: users[0], Name: "name", Owner: users[0]},
			err:     sdkerrors.ErrInvalidRequest,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err := srv.CreateRepository(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestRepositoryMsgServerChangeOwner(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	users := setupPreRepository(ctx, t, srv)
	repositoryId := types.RepositoryId{
		Id:   users[0],
		Name: "repository",
	}
	_, err := srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: repositoryId.Id, Name: repositoryId.Name, Owner: repositoryId.Id})
	require.NoError(t, err)
	_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: users[1], Name: "repository", Owner: users[1]})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgChangeOwner
		err     error
	}{
		{
			desc:    "Creator Not Exists",
			request: &types.MsgChangeOwner{Creator: "X", RepositoryId: repositoryId, Owner: users[0]},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Repository Not Exists",
			request: &types.MsgChangeOwner{Creator: users[0], RepositoryId: types.RepositoryId{Id: users[0], Name: "name"}, Owner: users[2]},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgChangeOwner{Creator: users[1], RepositoryId: repositoryId, Owner: users[2]},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Repository Already Exists",
			request: &types.MsgChangeOwner{Creator: users[0], RepositoryId: repositoryId, Owner: users[1]},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Completed",
			request: &types.MsgChangeOwner{Creator: users[0], RepositoryId: repositoryId, Owner: users[2]},
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.ChangeOwner(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestRepositoryMsgServerFork(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	users := setupPreRepository(ctx, t, srv)
	repositoryId := types.RepositoryId{
		Id:   users[0],
		Name: "repository",
	}
	_, err := srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: repositoryId.Id, Name: repositoryId.Name, Owner: repositoryId.Id})
	require.NoError(t, err)
	_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: users[1], Name: "repository", Owner: users[1]})
	require.NoError(t, err)
	_, err = srv.MultiSetBranch(ctx, &types.MsgMultiSetBranch{Creator: repositoryId.Id, RepositoryId: repositoryId, Branches: []types.MsgMultiSetBranch_Branch{
		{Name: "master", Sha: "e1976762da05b6b4896eda4ab0d5d1508b808327"},
		{Name: "dev", Sha: "e1976762da05b6b4896eda4ab0d5d1508b808327"},
	}})
	require.NoError(t, err)
	_, err = srv.ToggleRepositoryForking(ctx, &types.MsgToggleRepositoryForking{Creator: users[0], RepositoryId: repositoryId})
	require.NoError(t, err)
	_, err = srv.CreateTask(ctx, &types.MsgCreateTask{Creator: users[2], TaskType: types.TaskType(0), Provider: users[0]})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgForkRepository
		err     error
	}{
		{
			desc:    "Repository Not Exists",
			request: &types.MsgForkRepository{Creator: users[0], RepositoryId: types.RepositoryId{Id: users[0], Name: "name"}, ForkRepositoryName: "name", Owner: users[2], TaskId: 0},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Repository Already Exists",
			request: &types.MsgForkRepository{Creator: users[1], RepositoryId: repositoryId, ForkRepositoryName: repositoryId.Name, Owner: users[1], TaskId: 0},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Forking is not allowed",
			request: &types.MsgForkRepository{Creator: users[2], RepositoryId: types.RepositoryId{Id: users[1], Name: "repository"}, ForkRepositoryName: "repository", Owner: users[2], TaskId: 0},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Fork with all branches",
			request: &types.MsgForkRepository{Creator: users[2], RepositoryId: repositoryId, ForkRepositoryName: "fork1", Owner: users[2], TaskId: 0},
		},
		{
			desc:    "Fork only a particular branch",
			request: &types.MsgForkRepository{Creator: users[2], RepositoryId: repositoryId, ForkRepositoryName: "fork2", Branch: "dev", Owner: users[2], TaskId: 0},
		},
		{
			desc:    "Branch does not exist",
			request: &types.MsgForkRepository{Creator: users[2], RepositoryId: repositoryId, ForkRepositoryName: "fork", Branch: "test", Owner: users[2], TaskId: 0},
			err:     sdkerrors.ErrInvalidRequest,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.ForkRepository(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestRepositoryMsgServerRename(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	users := setupPreRepository(ctx, t, srv)
	repositoryId := types.RepositoryId{
		Id:   users[0],
		Name: "repository",
	}
	_, err := srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: repositoryId.Id, Name: repositoryId.Name, Owner: repositoryId.Id})
	require.NoError(t, err)
	_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: users[0], Name: "name", Owner: users[0]})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgRenameRepository
		err     error
	}{
		{
			desc:    "Creator Not Exists",
			request: &types.MsgRenameRepository{Creator: "X", RepositoryId: types.RepositoryId{Id: users[0], Name: "resopitory"}, Name: "rename"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Repository Not Exists",
			request: &types.MsgRenameRepository{Creator: users[0], RepositoryId: types.RepositoryId{Id: users[0], Name: "resopitory"}, Name: "rename"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Repository Already Exists",
			request: &types.MsgRenameRepository{Creator: users[0], RepositoryId: repositoryId, Name: "name"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Rename With Same Name",
			request: &types.MsgRenameRepository{Creator: users[0], RepositoryId: repositoryId, Name: "repository"},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgRenameRepository{Creator: users[1], RepositoryId: repositoryId, Name: "rename"},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Completed",
			request: &types.MsgRenameRepository{Creator: users[0], RepositoryId: repositoryId, Name: "rename"},
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.RenameRepository(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestRepositoryMsgServerUpdateCollaborator(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	users := setupPreRepository(ctx, t, srv)
	repositoryId := types.RepositoryId{
		Id:   users[0],
		Name: "repository",
	}
	_, err := srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: repositoryId.Id, Name: repositoryId.Name, Owner: repositoryId.Id})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgUpdateRepositoryCollaborator
		err     error
	}{
		{
			desc:    "Creator Not Exists",
			request: &types.MsgUpdateRepositoryCollaborator{Creator: "X", RepositoryId: repositoryId, User: users[1], Role: "READ"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Repository Not Exists",
			request: &types.MsgUpdateRepositoryCollaborator{Creator: users[0], RepositoryId: types.RepositoryId{Id: users[0], Name: "name"}, User: users[1], Role: "READ"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgUpdateRepositoryCollaborator{Creator: users[1], RepositoryId: repositoryId, User: users[2], Role: "READ"},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Unauthorized Self",
			request: &types.MsgUpdateRepositoryCollaborator{Creator: users[1], RepositoryId: repositoryId, User: users[1], Role: "READ"},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Completed",
			request: &types.MsgUpdateRepositoryCollaborator{Creator: users[0], RepositoryId: repositoryId, User: users[1], Role: "READ"},
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.UpdateRepositoryCollaborator(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestRepositoryMsgServerRemoveCollaborator(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	users := setupPreRepository(ctx, t, srv)
	repositoryId := types.RepositoryId{
		Id:   users[0],
		Name: "repository",
	}
	_, err := srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: repositoryId.Id, Name: repositoryId.Name, Owner: repositoryId.Id})
	require.NoError(t, err)
	_, err = srv.UpdateRepositoryCollaborator(ctx, &types.MsgUpdateRepositoryCollaborator{Creator: users[0], RepositoryId: repositoryId, User: users[1], Role: "READ"})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgRemoveRepositoryCollaborator
		err     error
	}{
		{
			desc:    "Creator Not Exists",
			request: &types.MsgRemoveRepositoryCollaborator{Creator: "X", RepositoryId: repositoryId, User: users[1]},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Repository Not Exists",
			request: &types.MsgRemoveRepositoryCollaborator{Creator: users[0], RepositoryId: types.RepositoryId{Id: users[0], Name: "name"}, User: users[1]},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Completed",
			request: &types.MsgRemoveRepositoryCollaborator{Creator: users[0], RepositoryId: repositoryId, User: users[1]},
		},
		{
			desc:    "Not Collaborator",
			request: &types.MsgRemoveRepositoryCollaborator{Creator: users[0], RepositoryId: repositoryId, User: users[1]},
			err:     sdkerrors.ErrInvalidRequest,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.RemoveRepositoryCollaborator(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestRepositoryMsgServerCreateLabel(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	users := setupPreRepository(ctx, t, srv)
	repositoryId := types.RepositoryId{
		Id:   users[0],
		Name: "repository",
	}
	_, err := srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: repositoryId.Id, Name: repositoryId.Name, Owner: repositoryId.Id})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgCreateRepositoryLabel
		err     error
	}{
		{
			desc:    "Creator Not Exists",
			request: &types.MsgCreateRepositoryLabel{Creator: "X", RepositoryId: repositoryId, Name: "label", Color: "color", Description: "description"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Repository Not Exists",
			request: &types.MsgCreateRepositoryLabel{Creator: users[0], RepositoryId: types.RepositoryId{Id: users[0], Name: "name"}, Name: "label", Color: "color", Description: "description"},
			err:     sdkerrors.ErrKeyNotFound,
		},

		{
			desc:    "Unauthorized",
			request: &types.MsgCreateRepositoryLabel{Creator: users[1], RepositoryId: repositoryId, Name: "label", Color: "color", Description: "description"},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Completed",
			request: &types.MsgCreateRepositoryLabel{Creator: "A", RepositoryId: repositoryId, Name: "label", Color: "color", Description: "description"},
		},
		{
			desc:    "Label Already Exists",
			request: &types.MsgCreateRepositoryLabel{Creator: "A", RepositoryId: repositoryId, Name: "label", Color: "color", Description: "description"},
			err:     sdkerrors.ErrInvalidRequest,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.CreateRepositoryLabel(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestRepositoryMsgServerUpdateLabel(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	users := setupPreRepository(ctx, t, srv)
	repositoryId := types.RepositoryId{
		Id:   users[0],
		Name: "repository",
	}
	_, err := srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: repositoryId.Id, Name: repositoryId.Name, Owner: repositoryId.Id})
	require.NoError(t, err)
	_, err = srv.CreateRepositoryLabel(ctx, &types.MsgCreateRepositoryLabel{Creator: "A", RepositoryId: repositoryId, Name: "label", Color: "color", Description: "description"})
	require.NoError(t, err)
	_, err = srv.CreateRepositoryLabel(ctx, &types.MsgCreateRepositoryLabel{Creator: "A", RepositoryId: repositoryId, Name: "labull", Color: "color", Description: "description"})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgUpdateRepositoryLabel
		err     error
	}{
		{
			desc:    "Creator Not Exists",
			request: &types.MsgUpdateRepositoryLabel{Creator: "X", RepositoryId: repositoryId, LabelId: 1, Name: "laebl", Color: "colour", Description: "desrciption"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Repository Not Exists",
			request: &types.MsgUpdateRepositoryLabel{Creator: users[0], RepositoryId: types.RepositoryId{Id: users[0], Name: "name"}, LabelId: 1, Name: "laebl", Color: "colour", Description: "desrciption"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgUpdateRepositoryLabel{Creator: users[1], RepositoryId: repositoryId, LabelId: 1, Name: "laebl", Color: "colour", Description: "desrciption"},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Label Not Exists",
			request: &types.MsgUpdateRepositoryLabel{Creator: users[0], RepositoryId: repositoryId, LabelId: 10, Name: "laebl", Color: "colour", Description: "desrciption"},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Completed",
			request: &types.MsgUpdateRepositoryLabel{Creator: users[0], RepositoryId: repositoryId, LabelId: 1, Name: "laebl", Color: "colour", Description: "desrciption"},
		},
		{
			desc:    "Label Already Exists",
			request: &types.MsgUpdateRepositoryLabel{Creator: users[0], RepositoryId: repositoryId, LabelId: 1, Name: "labull", Color: "colour", Description: "desrciption"},
			err:     sdkerrors.ErrInvalidRequest,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.UpdateRepositoryLabel(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestRepositoryMsgServerDeleteLabel(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	users := setupPreRepository(ctx, t, srv)
	repositoryId := types.RepositoryId{
		Id:   users[0],
		Name: "repository",
	}
	_, err := srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: repositoryId.Id, Name: repositoryId.Name, Owner: repositoryId.Id})
	require.NoError(t, err)
	_, err = srv.CreateRepositoryLabel(ctx, &types.MsgCreateRepositoryLabel{Creator: "A", RepositoryId: repositoryId, Name: "label", Color: "color", Description: "description"})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgDeleteRepositoryLabel
		err     error
	}{
		{
			desc:    "Creator Not Exists",
			request: &types.MsgDeleteRepositoryLabel{Creator: "X", RepositoryId: repositoryId, LabelId: 1},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Repository Not Exists",
			request: &types.MsgDeleteRepositoryLabel{Creator: users[0], RepositoryId: types.RepositoryId{Id: users[0], Name: "name"}, LabelId: 1},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgDeleteRepositoryLabel{Creator: users[1], RepositoryId: repositoryId, LabelId: 1},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Completed",
			request: &types.MsgDeleteRepositoryLabel{Creator: users[0], RepositoryId: repositoryId, LabelId: 1},
		},
		{
			desc:    "Label Not Exists",
			request: &types.MsgDeleteRepositoryLabel{Creator: users[0], RepositoryId: repositoryId, LabelId: 1},
			err:     sdkerrors.ErrInvalidRequest,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.DeleteRepositoryLabel(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestRepositoryMsgToggleRepositoryForking(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	users := setupPreRepository(ctx, t, srv)
	repositoryId := types.RepositoryId{
		Id:   users[0],
		Name: "repository",
	}
	_, err := srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: repositoryId.Id, Name: repositoryId.Name, Owner: repositoryId.Id})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgToggleRepositoryForking
		err     error
	}{
		{
			desc:    "Creator Not Exists",
			request: &types.MsgToggleRepositoryForking{Creator: "X", RepositoryId: repositoryId},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Repository Not Exists",
			request: &types.MsgToggleRepositoryForking{Creator: users[0], RepositoryId: types.RepositoryId{Id: users[0], Name: "name"}},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgToggleRepositoryForking{Creator: users[1], RepositoryId: repositoryId},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Completed",
			request: &types.MsgToggleRepositoryForking{Creator: users[0], RepositoryId: repositoryId},
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.ToggleRepositoryForking(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestRepositoryMsgServerDelete(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	users := setupPreRepository(ctx, t, srv)
	repositoryId := types.RepositoryId{
		Id:   users[0],
		Name: "repository",
	}
	_, err := srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: repositoryId.Id, Name: repositoryId.Name, Owner: repositoryId.Id})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgDeleteRepository
		err     error
	}{
		{
			desc:    "Unauthorized",
			request: &types.MsgDeleteRepository{Creator: users[1], RepositoryId: repositoryId},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Completed",
			request: &types.MsgDeleteRepository{Creator: users[0], RepositoryId: repositoryId},
		},
		{
			desc:    "KeyNotFound",
			request: &types.MsgDeleteRepository{Creator: users[0], RepositoryId: repositoryId},
			err:     sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.DeleteRepository(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestRepositoryMsgServerUpdateArchived(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	users := setupPreRepository(ctx, t, srv)
	repositoryId := types.RepositoryId{
		Id:   users[0],
		Name: "repository",
	}
	_, err := srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: repositoryId.Id, Name: repositoryId.Name, Owner: repositoryId.Id})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgToggleRepositoryArchived
		err     error
	}{
		{
			desc:    "Creator Not Exists",
			request: &types.MsgToggleRepositoryArchived{Creator: "X", RepositoryId: repositoryId},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Repository Not Exists",
			request: &types.MsgToggleRepositoryArchived{Creator: users[0], RepositoryId: types.RepositoryId{Id: users[0], Name: "name"}},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgToggleRepositoryArchived{Creator: users[1], RepositoryId: repositoryId},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Unauthorized Self",
			request: &types.MsgToggleRepositoryArchived{Creator: users[1], RepositoryId: repositoryId},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Completed",
			request: &types.MsgToggleRepositoryArchived{Creator: users[0], RepositoryId: repositoryId},
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.ToggleRepositoryArchived(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func setupPreRepository(ctx context.Context, t *testing.T, srv types.MsgServer) (users []string) {
	users = append(users, "A", "B", "C")

	for _, user := range users {
		_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: user, Username: user})
		require.NoError(t, err)

	}

	return users
}
