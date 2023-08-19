package types

import (
	"strings"
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/v3/testutil/sample"
	"github.com/stretchr/testify/require"
)

func TestMsgSetBranch_ValidateBasic(t *testing.T) {
	repositoryId := RepositoryId{
		Id:   sample.AccAddress(),
		Name: "repository",
	}

	tests := []struct {
		name string
		msg  MsgSetBranch
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgSetBranch{
				Creator:      "invalid_address",
				RepositoryId: repositoryId,
				Branch: MsgSetBranch_Branch{
					Name: "branch",
					Sha:  "commit_sha",
				},
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgSetRepositoryBranch",
			msg: MsgSetBranch{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Branch: MsgSetBranch_Branch{
					Name: "branch",
					Sha:  "56e05fced214c44a37759efa2dfc25a65d8ae98d",
				},
			},
		}, {
			name: "empty branch name",
			msg: MsgSetBranch{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Branch: MsgSetBranch_Branch{
					Sha: "commit_sha",
				},
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "branch nameexceeds limit",
			msg: MsgSetBranch{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Branch: MsgSetBranch_Branch{
					Name: strings.Repeat("b", 256),
					Sha:  "commit_sha",
				},
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "empty commitSha",
			msg: MsgSetBranch{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Branch: MsgSetBranch_Branch{
					Name: "branch",
				},
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "invalid commitSha",
			msg: MsgSetBranch{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Branch: MsgSetBranch_Branch{
					Name: "branch",
					Sha:  "commit_sha",
				},
			},
			err: sdkerrors.ErrInvalidRequest,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := tt.msg.ValidateBasic()
			if tt.err != nil {
				require.ErrorIs(t, err, tt.err)
				return
			}
			require.NoError(t, err)
		})
	}
}

func TestMsgSetDefaultBranch_ValidateBasic(t *testing.T) {
	repositoryId := RepositoryId{
		Id:   sample.AccAddress(),
		Name: "repository",
	}

	tests := []struct {
		name string
		msg  MsgSetDefaultBranch
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgSetDefaultBranch{
				Creator:      "invalid_address",
				RepositoryId: repositoryId,
				Branch:       "branch",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgSetDefaultBranch",
			msg: MsgSetDefaultBranch{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Branch:       "branch",
			},
		}, {
			name: "empty branch name",
			msg: MsgSetDefaultBranch{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "branch nameexceeds limit",
			msg: MsgSetDefaultBranch{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Branch:       strings.Repeat("b", 256),
			},
			err: sdkerrors.ErrInvalidRequest,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := tt.msg.ValidateBasic()
			if tt.err != nil {
				require.ErrorIs(t, err, tt.err)
				return
			}
			require.NoError(t, err)
		})
	}
}

func TestMsgDeleteBranch_ValidateBasic(t *testing.T) {
	repositoryId := RepositoryId{
		Id:   sample.AccAddress(),
		Name: "repository",
	}

	tests := []struct {
		name string
		msg  MsgDeleteBranch
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgDeleteBranch{
				Creator:      "invalid_address",
				RepositoryId: repositoryId,
				Branch:       "branch",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgDeleteBranch",
			msg: MsgDeleteBranch{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Branch:       "branch",
			},
		}, {
			name: "empty branch name",
			msg: MsgDeleteBranch{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "branch nameexceeds limit",
			msg: MsgDeleteBranch{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Branch:       strings.Repeat("b", 256),
			},
			err: sdkerrors.ErrInvalidRequest,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := tt.msg.ValidateBasic()
			if tt.err != nil {
				require.ErrorIs(t, err, tt.err)
				return
			}
			require.NoError(t, err)
		})
	}
}

func TestMsgToggleForcePush_ValidateBasic(t *testing.T) {
	addr := sample.AccAddress()
	repositoryId := RepositoryId{
		Id:   addr,
		Name: "repository",
	}
	tests := []struct {
		name string
		msg  MsgToggleForcePush
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgToggleForcePush{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgToggleForcePush{
				Creator:      addr,
				RepositoryId: repositoryId,
				BranchName:   "branch",
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := tt.msg.ValidateBasic()
			if tt.err != nil {
				require.ErrorIs(t, err, tt.err)
				return
			}
			require.NoError(t, err)
		})
	}
}
