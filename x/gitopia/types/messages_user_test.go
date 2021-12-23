package types

import (
	"strings"
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/testutil/sample"
	"github.com/stretchr/testify/require"
)

func TestMsgCreateUser_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgCreateUser
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgCreateUser{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgCreateUser{
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

func TestMsgUpdateUser_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgUpdateUser
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgUpdateUser{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgUpdateUser{
				Creator: sample.AccAddress(),
			},
		}, {
			name: "name exceeds limit",
			msg: MsgUpdateUser{
				Creator: sample.AccAddress(),
				Name:    sample.String100,
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "github username exceeds limit",
			msg: MsgUpdateUser{
				Creator:        sample.AccAddress(),
				UsernameGithub: sample.String100,
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "avatarUrl exceeds limit",
			msg: MsgUpdateUser{
				Creator:   sample.AccAddress(),
				AvatarUrl: strings.Repeat(sample.String100, 25),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "bio exceeds limit",
			msg: MsgUpdateUser{
				Creator: sample.AccAddress(),
				Bio:     strings.Repeat(sample.String100, 3),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "email exceeds limit",
			msg: MsgUpdateUser{
				Creator: sample.AccAddress(),
				Email:   strings.Repeat(sample.String100, 3),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "invalid email",
			msg: MsgUpdateUser{
				Creator: sample.AccAddress(),
				Email:   "invalid email",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "valid email",
			msg: MsgUpdateUser{
				Creator: sample.AccAddress(),
				Email:   "valid@email.com",
			},
		}, {
			name: "invalid avatarUrl",
			msg: MsgUpdateUser{
				Creator:   sample.AccAddress(),
				AvatarUrl: "invalid URL",
			},
			err: sdkerrors.ErrInvalidRequest,
		},
		{
			name: "valid avatarUrl",
			msg: MsgUpdateUser{
				Creator:   sample.AccAddress(),
				AvatarUrl: "https://domain.com",
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

func TestMsgDeleteUser_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgDeleteUser
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgDeleteUser{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgDeleteUser{
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
