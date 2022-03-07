package keeper_test

import (
	"fmt"
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/require"

	"github.com/gitopia/gitopia/x/gitopia/types"
)

func TestRepositoryMsgServerCreate(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	creator := "A"

	/* Test multiple Repository create */
	for i := 0; i < 5; i++ {
		name := fmt.Sprintf("repository-%d", i)
		resp, err := srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: name})
		require.NoError(t, err)
		require.Equal(t, uint64(i), resp.Id)
	}

	for _, tc := range []struct {
		desc    string
		request *types.MsgCreateRepository
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgCreateRepository{Creator: creator},
		},
		{
			desc:    "Owner and Creator Mismatched",
			request: &types.MsgCreateRepository{Creator: "A", Name: "name", OwnerId: "B", OwnerType: "USER"},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Duplicate Repository Name",
			request: &types.MsgCreateRepository{Creator: creator, Name: "repository", OwnerId: creator, OwnerType: "USER"},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "User Not Exists",
			request: &types.MsgCreateRepository{Creator: "B", Name: "name", OwnerId: "B", OwnerType: "USER"},
			err:     sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			srv, ctx := setupMsgServer(t)
			user, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator})
			require.NoError(t, err)
			_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository", OwnerId: user.Id, OwnerType: "USER"})
			require.NoError(t, err)

			_, err = srv.CreateRepository(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestRepositoryMsgServerChangeOwner(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgChangeOwner
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgChangeOwner{RepositoryId: 0, Creator: creator, OwnerId: "C", OwnerType: "USER"},
		},
		{
			desc:    "Repository Not Exists",
			request: &types.MsgChangeOwner{RepositoryId: 10},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Repository Already Exists",
			request: &types.MsgChangeOwner{RepositoryId: 0, Creator: creator, OwnerId: "B", OwnerType: "USER"},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Owner Not Exists",
			request: &types.MsgChangeOwner{RepositoryId: 0, Creator: creator, OwnerId: "D", OwnerType: "USER"},
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
			_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: "B", Name: "repository", OwnerId: "B", OwnerType: "USER"})
			require.NoError(t, err)
			_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "C"})
			require.NoError(t, err)

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
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgForkRepository
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgForkRepository{RepositoryId: 0, Creator: "C", OwnerId: "C", OwnerType: "USER"},
		},
		{
			desc:    "Repository Not Exists",
			request: &types.MsgForkRepository{RepositoryId: 10},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Repository Already Exists",
			request: &types.MsgForkRepository{RepositoryId: 0, Creator: "B", OwnerId: "B", OwnerType: "USER"},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Owner Not Exists",
			request: &types.MsgForkRepository{RepositoryId: 0, Creator: "D", OwnerId: "D", OwnerType: "USER"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Forking is not allowed",
			request: &types.MsgForkRepository{RepositoryId: 1, Creator: "C", OwnerId: "C", OwnerType: "USER"},
			err:     sdkerrors.ErrInvalidRequest,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			srv, ctx := setupMsgServer(t)
			user, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator})
			require.NoError(t, err)
			_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository", OwnerId: user.Id, OwnerType: "USER"})
			require.NoError(t, err)
			_, err = srv.ToggleRepositoryForking(ctx, &types.MsgToggleRepositoryForking{Creator: creator, Id: 0})
			require.NoError(t, err)
			_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "B"})
			require.NoError(t, err)
			_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: "B", Name: "repository", OwnerId: "B", OwnerType: "USER"})
			require.NoError(t, err)
			_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "C"})
			require.NoError(t, err)

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
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgRenameRepository
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgRenameRepository{Id: 0, Creator: "A", Name: "renamed"},
		},
		{
			desc:    "Repository Not Exists",
			request: &types.MsgRenameRepository{Id: 10},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Repository Already Exists",
			request: &types.MsgRenameRepository{Id: 0, Creator: "A", Name: "repository-00"},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Rename With Same Name",
			request: &types.MsgRenameRepository{Id: 0, Creator: "A", Name: "repository"},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgRenameRepository{Id: 0, Creator: "B"},
			err:     sdkerrors.ErrUnauthorized,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			srv, ctx := setupMsgServer(t)
			user, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator})
			require.NoError(t, err)
			_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository", OwnerId: user.Id, OwnerType: "USER"})
			require.NoError(t, err)
			_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository-00", OwnerId: user.Id, OwnerType: "USER"})
			require.NoError(t, err)

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
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgUpdateRepositoryCollaborator
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgUpdateRepositoryCollaborator{Id: 0, Creator: "A", User: "B", Role: "READ"},
		},
		{
			desc:    "Repository Not Exists",
			request: &types.MsgUpdateRepositoryCollaborator{Id: 10},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgUpdateRepositoryCollaborator{Id: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "User Not Exists",
			request: &types.MsgUpdateRepositoryCollaborator{Id: 0, Creator: "A", User: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Unauthorized Self",
			request: &types.MsgUpdateRepositoryCollaborator{Id: 0, Creator: "A", User: "A", Role: "READ"},
			err:     sdkerrors.ErrUnauthorized,
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
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgRemoveRepositoryCollaborator
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgRemoveRepositoryCollaborator{Id: 0, Creator: "A", User: "B"},
		},
		{
			desc:    "Repository Not Exists",
			request: &types.MsgRemoveRepositoryCollaborator{Id: 10},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgRemoveRepositoryCollaborator{Id: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "User Not Exists",
			request: &types.MsgRemoveRepositoryCollaborator{Id: 0, Creator: "A", User: "C"},
			err:     sdkerrors.ErrInvalidRequest,
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
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgCreateRepositoryLabel
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgCreateRepositoryLabel{Id: 0, Creator: "A", Name: "new label"},
		},
		{
			desc:    "Repository Not Exists",
			request: &types.MsgCreateRepositoryLabel{Id: 10},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgCreateRepositoryLabel{Id: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Label Already Exists",
			request: &types.MsgCreateRepositoryLabel{Id: 0, Creator: "A", Name: "label"},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgCreateRepositoryLabel{Id: 0, Creator: "B", Name: "new label"},
			err:     sdkerrors.ErrUnauthorized,
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
			_, err = srv.CreateRepositoryLabel(ctx, &types.MsgCreateRepositoryLabel{Id: 0, Creator: creator, Name: "label"})
			require.NoError(t, err)

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
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgUpdateRepositoryLabel
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgUpdateRepositoryLabel{RepositoryId: 0, Creator: "A", LabelId: 1, Name: "renamed label"},
		},
		{
			desc:    "Repository Not Exists",
			request: &types.MsgUpdateRepositoryLabel{RepositoryId: 10},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgUpdateRepositoryLabel{RepositoryId: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Label Already Exists",
			request: &types.MsgUpdateRepositoryLabel{RepositoryId: 0, Creator: "A", LabelId: 1, Name: "label"},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Label Id Not Exists",
			request: &types.MsgUpdateRepositoryLabel{RepositoryId: 0, Creator: "A", LabelId: 0, Name: "label"},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgUpdateRepositoryLabel{RepositoryId: 0, Creator: "B", LabelId: 0, Name: "new label"},
			err:     sdkerrors.ErrUnauthorized,
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
			_, err = srv.CreateRepositoryLabel(ctx, &types.MsgCreateRepositoryLabel{Id: 0, Creator: creator, Name: "label"})
			require.NoError(t, err)

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
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgDeleteRepositoryLabel
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgDeleteRepositoryLabel{RepositoryId: 0, Creator: "A", LabelId: 1},
		},
		{
			desc:    "Repository Not Exists",
			request: &types.MsgDeleteRepositoryLabel{RepositoryId: 10},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgDeleteRepositoryLabel{RepositoryId: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Label Id Not Exists",
			request: &types.MsgDeleteRepositoryLabel{RepositoryId: 0, Creator: "A", LabelId: 0},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgDeleteRepositoryLabel{RepositoryId: 0, Creator: "B", LabelId: 0},
			err:     sdkerrors.ErrUnauthorized,
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
			_, err = srv.CreateRepositoryLabel(ctx, &types.MsgCreateRepositoryLabel{Id: 0, Creator: creator, Name: "label"})
			require.NoError(t, err)

			_, err = srv.DeleteRepositoryLabel(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestRepositoryMsgServerSetBranch(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgSetRepositoryBranch
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgSetRepositoryBranch{Id: 0, Creator: "A", Name: "new branch"},
		},
		{
			desc:    "Repository Not Exists",
			request: &types.MsgSetRepositoryBranch{Id: 10},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgSetRepositoryBranch{Id: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Set Existing branch",
			request: &types.MsgSetRepositoryBranch{Id: 0, Creator: "A", Name: "branch", CommitSHA: "updated-commit-sha"},
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgSetRepositoryBranch{Id: 0, Creator: "B", Name: "new branch"},
			err:     sdkerrors.ErrUnauthorized,
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
			_, err = srv.SetRepositoryBranch(ctx, &types.MsgSetRepositoryBranch{Id: 0, Creator: creator, Name: "branch"})
			require.NoError(t, err)

			_, err = srv.SetRepositoryBranch(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestRepositoryMsgServerSetDefaultBranch(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgSetDefaultBranch
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgSetDefaultBranch{Id: 0, Creator: "A", Name: "branch"},
		},
		{
			desc:    "Repository Not Exists",
			request: &types.MsgSetDefaultBranch{Id: 10},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgSetDefaultBranch{Id: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Branch Not Exists",
			request: &types.MsgSetDefaultBranch{Id: 0, Creator: "A", Name: "unknown-branch"},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgSetDefaultBranch{Id: 0, Creator: "B", Name: "branch"},
			err:     sdkerrors.ErrUnauthorized,
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
			_, err = srv.SetRepositoryBranch(ctx, &types.MsgSetRepositoryBranch{Id: 0, Creator: creator, Name: "branch"})
			require.NoError(t, err)

			_, err = srv.SetDefaultBranch(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestRepositoryMsgServerDeleteBranch(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgDeleteBranch
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgDeleteBranch{Id: 0, Creator: "A", Name: "branch"},
		},
		{
			desc:    "Repository Not Exists",
			request: &types.MsgDeleteBranch{Id: 10},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgDeleteBranch{Id: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Branch Not Exists",
			request: &types.MsgDeleteBranch{Id: 0, Creator: "A", Name: "unknown-branch"},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgDeleteBranch{Id: 0, Creator: "B", Name: "branch"},
			err:     sdkerrors.ErrUnauthorized,
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
			_, err = srv.SetRepositoryBranch(ctx, &types.MsgSetRepositoryBranch{Id: 0, Creator: creator, Name: "branch"})
			require.NoError(t, err)

			_, err = srv.DeleteBranch(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestRepositoryMsgServerSetTag(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgSetRepositoryTag
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgSetRepositoryTag{Id: 0, Creator: "A", Name: "new tag"},
		},
		{
			desc:    "Repository Not Exists",
			request: &types.MsgSetRepositoryTag{Id: 10},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgSetRepositoryTag{Id: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Set Existing Tag",
			request: &types.MsgSetRepositoryTag{Id: 0, Creator: "A", Name: "tag", Sha: "updated-sha"},
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgSetRepositoryTag{Id: 0, Creator: "B", Name: "new tag"},
			err:     sdkerrors.ErrUnauthorized,
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
			_, err = srv.SetRepositoryTag(ctx, &types.MsgSetRepositoryTag{Id: 0, Creator: creator, Name: "tag"})
			require.NoError(t, err)

			_, err = srv.SetRepositoryTag(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestRepositoryMsgServerDeleteTag(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgDeleteTag
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgDeleteTag{Id: 0, Creator: "A", Name: "tag"},
		},
		{
			desc:    "Repository Not Exists",
			request: &types.MsgDeleteTag{Id: 10},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgDeleteTag{Id: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Tag Not Exists",
			request: &types.MsgDeleteTag{Id: 0, Creator: "A", Name: "unknown-tag"},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgDeleteTag{Id: 0, Creator: "B", Name: "tag"},
			err:     sdkerrors.ErrUnauthorized,
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
			_, err = srv.SetRepositoryTag(ctx, &types.MsgSetRepositoryTag{Id: 0, Creator: creator, Name: "tag"})
			require.NoError(t, err)

			_, err = srv.DeleteTag(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestRepositoryMsgToggleRepositoryForking(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgToggleRepositoryForking
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgToggleRepositoryForking{Id: 0, Creator: "A"},
		},
		{
			desc:    "Repository Not Exists",
			request: &types.MsgToggleRepositoryForking{Id: 10},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgToggleRepositoryForking{Id: 0, Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgToggleRepositoryForking{Id: 0, Creator: "B"},
			err:     sdkerrors.ErrUnauthorized,
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
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgDeleteRepository
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgDeleteRepository{Creator: creator, Id: 0},
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgDeleteRepository{Creator: "B", Id: 0},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "KeyNotFound",
			request: &types.MsgDeleteRepository{Id: 10},
			err:     sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			srv, ctx := setupMsgServer(t)
			user, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator})
			require.NoError(t, err)
			_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository", OwnerId: user.Id, OwnerType: "USER"})
			require.NoError(t, err)

			_, err = srv.DeleteRepository(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}
