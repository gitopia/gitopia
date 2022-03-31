package types

import (
	"strings"
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/testutil/sample"
	"github.com/stretchr/testify/require"
)

func TestMsgCreateTask_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgCreateTask
		err  error
	}{
		{
			name: "invalid creator address",
			msg: MsgCreateTask{
				Creator:  "invalid_address",
				TaskType: TypeForkRepository,
				Provider: sample.AccAddress(),
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "invalid provider address",
			msg: MsgCreateTask{
				Creator:  sample.AccAddress(),
				TaskType: TypeForkRepository,
				Provider: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid",
			msg: MsgCreateTask{
				Creator:  sample.AccAddress(),
				TaskType: TypeForkRepository,
				Provider: sample.AccAddress(),
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

func TestMsgUpdateTask_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgUpdateTask
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgUpdateTask{
				Creator: "invalid_address",
				State:   StateSuccess,
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgUpdateTask{
				Creator: sample.AccAddress(),
				State:   StateSuccess,
			},
		}, {
			name: "invalid state",
			msg: MsgUpdateTask{
				Creator: sample.AccAddress(),
				State:   StatePending,
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "message exceeds limit",
			msg: MsgUpdateTask{
				Creator: sample.AccAddress(),
				State:   StatePending,
				Message: strings.Repeat("m", 256),
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

func TestMsgDeleteTask_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgDeleteTask
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgDeleteTask{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgDeleteTask{
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
