package types

import (
	"strings"
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/testutil/sample"
	"github.com/stretchr/testify/require"
)

func TestMsgSetBranch_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgSetBranch
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgSetBranch{
				Creator: "invalid_address",
				Branch: &MsgSetBranch_Branch{
					Name: "branch",
					Sha:  "commit_sha",
				},
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgSetRepositoryBranch",
			msg: MsgSetBranch{
				Creator: sample.AccAddress(),
				Branch: &MsgSetBranch_Branch{
					Name: "branch",
					Sha:  "56e05fced214c44a37759efa2dfc25a65d8ae98d",
				},
			},
		}, {
			name: "empty branch name",
			msg: MsgSetBranch{
				Creator: sample.AccAddress(),
				Branch: &MsgSetBranch_Branch{
					Sha: "commit_sha",
				},
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "branch nameexceeds limit",
			msg: MsgSetBranch{
				Creator: sample.AccAddress(),
				Branch: &MsgSetBranch_Branch{
					Name: strings.Repeat("b", 256),
					Sha:  "commit_sha",
				},
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "empty commitSha",
			msg: MsgSetBranch{
				Creator: sample.AccAddress(),
				Branch: &MsgSetBranch_Branch{
					Name: "branch",
				},
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "invalid commitSha",
			msg: MsgSetBranch{
				Creator: sample.AccAddress(),
				Branch: &MsgSetBranch_Branch{
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

func TestMsgDeleteBranch_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgDeleteBranch
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgDeleteBranch{
				Creator: "invalid_address",
				Name:    "branch",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgDeleteBranch",
			msg: MsgDeleteBranch{
				Creator: sample.AccAddress(),
				Name:    "branch",
			},
		}, {
			name: "empty branch name",
			msg: MsgDeleteBranch{
				Creator: sample.AccAddress(),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "branch nameexceeds limit",
			msg: MsgDeleteBranch{
				Creator: sample.AccAddress(),
				Name:    strings.Repeat("b", 256),
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
