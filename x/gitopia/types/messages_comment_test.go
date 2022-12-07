package types

import (
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/testutil/sample"
	"github.com/stretchr/testify/require"
)

func TestMsgCreateComment_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgCreateComment
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgCreateComment{
				Creator: "invalid_address",
				Parent:  CommentParentIssue,
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgCreateComment{
				Creator: sample.AccAddress(),
				Parent:  CommentParentIssue,
				Body:    "comment",
			},
		}, {
			name: "invalid comment type",
			msg: MsgCreateComment{
				Creator: sample.AccAddress(),
				Parent:  9,
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

func TestMsgUpdateComment_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgUpdateComment
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgUpdateComment{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgUpdateComment{
				Creator: sample.AccAddress(),
				Body:    "comment",
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

func TestMsgDeleteComment_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgDeleteComment
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgDeleteComment{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgDeleteComment{
				Creator: sample.AccAddress(),
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
