package types

import (
	"strings"
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/v4/testutil/sample"
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
				Creator:  "invalid_address",
				Username: "user",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgCreateUser{
				Creator:  sample.AccAddress(),
				Username: "user",
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

func TestMsgUpdateUserBio_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgUpdateUserBio
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgUpdateUserBio{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgUpdateUserBio{
				Creator: sample.AccAddress(),
				Bio:     "bio",
			},
		}, {
			name: "bio exceeds limit",
			msg: MsgUpdateUserBio{
				Creator: sample.AccAddress(),
				Bio:     strings.Repeat("b", 256),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "empty bio",
			msg: MsgUpdateUserBio{
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

func TestMsgUpdateUserAvatar_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgUpdateUserAvatar
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgUpdateUserAvatar{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgUpdateUserAvatar{
				Creator: sample.AccAddress(),
				Url:     "https://avatar.url",
			},
		}, {
			name: "url exceeds limit",
			msg: MsgUpdateUserAvatar{
				Creator: sample.AccAddress(),
				Url:     strings.Repeat("u", 2049),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "invalid url",
			msg: MsgUpdateUserAvatar{
				Creator: sample.AccAddress(),
				Url:     "url",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "empty url",
			msg: MsgUpdateUserAvatar{
				Creator: sample.AccAddress(),
			},
		}, {
			name: "non https url",
			msg: MsgUpdateUserAvatar{
				Creator: sample.AccAddress(),
				Url:     "http://avatar.url",
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

func TestMsgUpdateUserPinnedRepositories_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgUpdateUserPinnedRepositories
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgUpdateUserPinnedRepositories{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgUpdateUserPinnedRepositories{
				Creator:      sample.AccAddress(),
				RepositoryId: 123,
			},
		}, {
			name: "empty repositoryID",
			msg: MsgUpdateUserPinnedRepositories{
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

func TestMsgDeleteUser_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgDeleteUser
		err  error
	}{
		{
			name: "WIP",
			msg: MsgDeleteUser{
				Creator: sample.AccAddress(),
			},
			err: sdkerrors.ErrNotSupported,
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
