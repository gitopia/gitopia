package keeper_test

import (
	"fmt"
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/require"

	"github.com/gitopia/gitopia/v6/x/gitopia/types"
)

func TestBranchMsgServerSet(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	creator := "A"

	_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator, Username: creator})
	require.NoError(t, err)
	_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "B", Username: "B"})
	require.NoError(t, err)
	_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository", Owner: creator})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgSetBranch
		err     error
	}{
		{
			desc: "Completed",
			request: &types.MsgSetBranch{
				Creator: creator,
				RepositoryId: types.RepositoryId{
					Id:   creator,
					Name: "repository",
				},
				Branch: types.MsgSetBranch_Branch{
					Name: fmt.Sprintf("branch"),
				},
			},
		},
		{
			desc: "Unauthorized",
			request: &types.MsgSetBranch{
				Creator: "B",
				RepositoryId: types.RepositoryId{
					Id:   creator,
					Name: "repository",
				},
			},
			err: sdkerrors.ErrUnauthorized,
		},
		{
			desc: "CreatorNotFound",
			request: &types.MsgSetBranch{
				Creator: "Z",
			},
			err: sdkerrors.ErrKeyNotFound,
		},
		{
			desc: "RepositoryNotFound",
			request: &types.MsgSetBranch{
				Creator: "A",
				RepositoryId: types.RepositoryId{
					Id:   creator,
					Name: "notexists",
				},
			},
			err: sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.SetBranch(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestBranchMsgServerMultiSet(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	creator := "A"

	_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator, Username: creator})
	require.NoError(t, err)
	_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "B", Username: "B"})
	require.NoError(t, err)
	_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository", Owner: creator})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgMultiSetBranch
		err     error
	}{
		{
			desc: "Completed",
			request: &types.MsgMultiSetBranch{
				Creator: creator,
				RepositoryId: types.RepositoryId{
					Id:   creator,
					Name: "repository",
				},
				Branches: []types.MsgMultiSetBranch_Branch{{Name: "branch-1"}, {Name: "branch-2"}},
			},
		},
		{
			desc: "Unauthorized",
			request: &types.MsgMultiSetBranch{
				Creator: "B",
				RepositoryId: types.RepositoryId{
					Id:   creator,
					Name: "repository",
				},
			},
			err: sdkerrors.ErrUnauthorized,
		},
		{
			desc: "CreatorNotFound",
			request: &types.MsgMultiSetBranch{
				Creator: "Z",
			},
			err: sdkerrors.ErrKeyNotFound,
		},
		{
			desc: "RepositoryNotFound",
			request: &types.MsgMultiSetBranch{
				Creator: "A",
				RepositoryId: types.RepositoryId{
					Id:   creator,
					Name: "notexists",
				},
			},
			err: sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.MultiSetBranch(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestRepositoryMsgServerSetDefaultBranch(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	creator := "A"

	_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator, Username: creator})
	require.NoError(t, err)
	_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "B", Username: "B"})
	require.NoError(t, err)
	_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository", Owner: creator})
	require.NoError(t, err)
	_, err = srv.SetBranch(ctx, &types.MsgSetBranch{
		Creator: creator,
		RepositoryId: types.RepositoryId{
			Id:   creator,
			Name: "repository",
		},
		Branch: types.MsgSetBranch_Branch{
			Name: fmt.Sprintf("branch"),
		},
	})
	require.NoError(t, err)
	repositoryId := types.RepositoryId{
		Id:   creator,
		Name: "repository",
	}

	for _, tc := range []struct {
		desc    string
		request *types.MsgSetDefaultBranch
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgSetDefaultBranch{Creator: creator, RepositoryId: repositoryId, Branch: "branch"},
		},
		{
			desc:    "Repository Not Exists",
			request: &types.MsgSetDefaultBranch{Creator: creator, RepositoryId: types.RepositoryId{Id: "A", Name: "name"}},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Creator Not Exists",
			request: &types.MsgSetDefaultBranch{Creator: "C"},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc:    "Branch Not Exists",
			request: &types.MsgSetDefaultBranch{Creator: "A", RepositoryId: repositoryId, Branch: "unknown-branch"},
			err:     sdkerrors.ErrInvalidRequest,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgSetDefaultBranch{Creator: "B", RepositoryId: repositoryId, Branch: "branch"},
			err:     sdkerrors.ErrUnauthorized,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.SetDefaultBranch(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestBranchMsgServerDelete(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	creator := "A"

	_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator, Username: creator})
	require.NoError(t, err)
	_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "B", Username: "B"})
	require.NoError(t, err)
	_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository", Owner: creator})
	require.NoError(t, err)
	_, err = srv.SetBranch(ctx, &types.MsgSetBranch{
		Creator: creator,
		RepositoryId: types.RepositoryId{
			Id:   creator,
			Name: "repository",
		},
		Branch: types.MsgSetBranch_Branch{
			Name: fmt.Sprintf("branch"),
		},
	})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgDeleteBranch
		err     error
	}{
		{
			desc: "Completed",
			request: &types.MsgDeleteBranch{
				Creator: creator,
				RepositoryId: types.RepositoryId{
					Id:   creator,
					Name: "repository",
				},
				Branch: "branch",
			},
		},
		{
			desc: "Unauthorized",
			request: &types.MsgDeleteBranch{
				Creator: "B",
				RepositoryId: types.RepositoryId{
					Id:   creator,
					Name: "repository",
				},
			},
			err: sdkerrors.ErrUnauthorized,
		},
		{
			desc: "CreatorNotFound",
			request: &types.MsgDeleteBranch{
				Creator: "Z",
			},
			err: sdkerrors.ErrKeyNotFound,
		},
		{
			desc: "RepositoryNotFound",
			request: &types.MsgDeleteBranch{
				Creator: "A",
				RepositoryId: types.RepositoryId{
					Id:   creator,
					Name: "notexists",
				},
			},
			err: sdkerrors.ErrKeyNotFound,
		},
		{
			desc: "BranchNotFound",
			request: &types.MsgDeleteBranch{
				Creator: creator,
				RepositoryId: types.RepositoryId{
					Id:   creator,
					Name: "repository",
				},
				Branch: "branch",
			},
			err: sdkerrors.ErrInvalidRequest,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.DeleteBranch(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestBranchMsgServerMultiDelete(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	creator := "A"

	_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: creator, Username: creator})
	require.NoError(t, err)
	_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: "B", Username: "B"})
	require.NoError(t, err)
	_, err = srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: creator, Name: "repository", Owner: creator})
	require.NoError(t, err)
	_, err = srv.MultiSetBranch(ctx, &types.MsgMultiSetBranch{
		Creator: creator,
		RepositoryId: types.RepositoryId{
			Id:   creator,
			Name: "repository",
		},
		Branches: []types.MsgMultiSetBranch_Branch{{Name: "branch-1"}, {Name: "branch-2"}},
	})
	require.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgMultiDeleteBranch
		err     error
	}{
		{
			desc: "SomeBranchsNotFound",
			request: &types.MsgMultiDeleteBranch{
				Creator: creator,
				RepositoryId: types.RepositoryId{
					Id:   creator,
					Name: "repository",
				},
				Branches: []string{"branch", "branch-1", "branch-2"},
			},
			err: sdkerrors.ErrInvalidRequest,
		},
		{
			desc: "Completed",
			request: &types.MsgMultiDeleteBranch{
				Creator: creator,
				RepositoryId: types.RepositoryId{
					Id:   creator,
					Name: "repository",
				},
				Branches: []string{"branch-1", "branch-2"},
			},
		},
		{
			desc: "Unauthorized",
			request: &types.MsgMultiDeleteBranch{
				Creator: "B",
				RepositoryId: types.RepositoryId{
					Id:   creator,
					Name: "repository",
				},
			},
			err: sdkerrors.ErrUnauthorized,
		},
		{
			desc: "CreatorNotFound",
			request: &types.MsgMultiDeleteBranch{
				Creator: "Z",
			},
			err: sdkerrors.ErrKeyNotFound,
		},
		{
			desc: "RepositoryNotFound",
			request: &types.MsgMultiDeleteBranch{
				Creator: "A",
				RepositoryId: types.RepositoryId{
					Id:   creator,
					Name: "notexists",
				},
			},
			err: sdkerrors.ErrKeyNotFound,
		},
		{
			desc: "BranchNotFound",
			request: &types.MsgMultiDeleteBranch{
				Creator: creator,
				RepositoryId: types.RepositoryId{
					Id:   creator,
					Name: "repository",
				},
				Branches: []string{"branch"},
			},
			err: sdkerrors.ErrInvalidRequest,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.MultiDeleteBranch(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}
