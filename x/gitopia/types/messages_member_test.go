package types

import (
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/testutil/sample"
	"github.com/stretchr/testify/require"
)

func TestMsgAddMember_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgAddMember
		err  error
	}{
		{
			name: "invalid id",
			msg: MsgAddMember{
				Id:      "invalid_id",
				Creator: sample.AccAddress(),
				User:    sample.AccAddress(),
				Role:    "MEMBER",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "invalid creator address",
			msg: MsgAddMember{
				Id:      sample.AccAddress(),
				Creator: "invalid_address",
				User:    sample.AccAddress(),
				Role:    "MEMBER",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgAddMember",
			msg: MsgAddMember{
				Id:      sample.AccAddress(),
				Creator: sample.AccAddress(),
				User:    sample.AccAddress(),
				Role:    "MEMBER",
			},
		}, {
			name: "invalid user address",
			msg: MsgAddMember{
				Id:      sample.AccAddress(),
				Creator: sample.AccAddress(),
				User:    "invalid_user",
				Role:    "MEMBER",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "invalid role",
			msg: MsgAddMember{
				Id:      sample.AccAddress(),
				Creator: sample.AccAddress(),
				User:    sample.AccAddress(),
				Role:    "invalid_role",
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

func TestMsgUpdateMemberRole_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgUpdateMemberRole
		err  error
	}{
		{
			name: "invalid id",
			msg: MsgUpdateMemberRole{
				Id:      "invalid_id",
				Creator: sample.AccAddress(),
				User:    sample.AccAddress(),
				Role:    "MEMBER",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "invalid creator address",
			msg: MsgUpdateMemberRole{
				Id:      sample.AccAddress(),
				Creator: "invalid_address",
				User:    sample.AccAddress(),
				Role:    "MEMBER",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgAddMember",
			msg: MsgUpdateMemberRole{
				Id:      sample.AccAddress(),
				Creator: sample.AccAddress(),
				User:    sample.AccAddress(),
				Role:    "MEMBER",
			},
		}, {
			name: "invalid user address",
			msg: MsgUpdateMemberRole{
				Id:      sample.AccAddress(),
				Creator: sample.AccAddress(),
				User:    "invalid_user",
				Role:    "MEMBER",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "invalid role",
			msg: MsgUpdateMemberRole{
				Id:      sample.AccAddress(),
				Creator: sample.AccAddress(),
				User:    sample.AccAddress(),
				Role:    "invalid_role",
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

func TestMsgRemoveDaoMember_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgRemoveDaoMember
		err  error
	}{
		{
			name: "invalid id",
			msg: MsgRemoveDaoMember{
				Id:      "invalid_id",
				Creator: sample.AccAddress(),
				User:    sample.AccAddress(),
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "invalid creator address",
			msg: MsgRemoveDaoMember{
				Id:      sample.AccAddress(),
				Creator: "invalid_address",
				User:    sample.AccAddress(),
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgRemoveDaoMember",
			msg: MsgRemoveDaoMember{
				Id:      sample.AccAddress(),
				Creator: sample.AccAddress(),
				User:    sample.AccAddress(),
			},
		}, {
			name: "invalid user address",
			msg: MsgRemoveDaoMember{
				Id:      sample.AccAddress(),
				Creator: sample.AccAddress(),
				User:    "invalid_user",
			},
			err: sdkerrors.ErrInvalidAddress,
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
