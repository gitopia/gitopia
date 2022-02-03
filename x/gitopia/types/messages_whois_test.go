package types

import (
	"strings"
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/testutil/sample"
	"github.com/stretchr/testify/require"
)

func TestMsgSetWhois_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgSetWhois
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgSetWhois{
				Creator: "invalid_address",
				Name:    "name",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgSetWhois{
				Creator: sample.AccAddress(),
				Name:    "name",
			},
		}, {
			name: "too short name",
			msg: MsgSetWhois{
				Creator: sample.AccAddress(),
				Name:    "n",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "name exceeds limit",
			msg: MsgSetWhois{
				Creator: sample.AccAddress(),
				Name:    strings.Repeat("#", 40),
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

func TestMsgUpdateWhois_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgUpdateWhois
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgUpdateWhois{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgUpdateWhois{
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

func TestMsgDeleteWhois_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgDeleteWhois
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgDeleteWhois{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgDeleteWhois{
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
