package types

import (
	"strings"
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/v6/testutil/sample"
	"github.com/stretchr/testify/require"
)

func TestMsgCreateDao_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgCreateDao
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgCreateDao{
				Creator: "invalid_address",
				Name:    "name",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgCreateDao{
				Creator: sample.AccAddress(),
				Name:    "name",
			},
		}, {
			name: "too short name",
			msg: MsgCreateDao{
				Creator: sample.AccAddress(),
				Name:    "n",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "name exceeds limit",
			msg: MsgCreateDao{
				Creator: sample.AccAddress(),
				Name:    strings.Repeat("n", 40),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "invalid name",
			msg: MsgCreateDao{
				Creator: sample.AccAddress(),
				Name:    "!nva1id",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "description exceeds limit",
			msg: MsgCreateDao{
				Creator: sample.AccAddress(),
				Name:    strings.Repeat("d", 256),
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

func TestMsgRenameDao_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgRenameDao
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgRenameDao{
				Admin: "invalid_address",
				Id:    sample.AccAddress(),
				Name:  "name",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgRenameDao{
				Admin: sample.AccAddress(),
				Id:    sample.AccAddress(),
				Name:  "name",
			},
		}, {
			name: "too short name",
			msg: MsgRenameDao{
				Admin: sample.AccAddress(),
				Id:    sample.AccAddress(),
				Name:  "n",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "name exceeds limit",
			msg: MsgRenameDao{
				Admin: sample.AccAddress(),
				Id:    sample.AccAddress(),
				Name:  strings.Repeat("n", 40),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "invalid name",
			msg: MsgRenameDao{
				Admin: sample.AccAddress(),
				Id:    sample.AccAddress(),
				Name:  "!nva1id",
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

func TestMsgUpdateDaoDescription_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgUpdateDaoDescription
		err  error
	}{
		{
			name: "invalid id",
			msg: MsgUpdateDaoDescription{
				Id:    "invalid_id",
				Admin: sample.AccAddress(),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "invalid admin address",
			msg: MsgUpdateDaoDescription{
				Id:    sample.AccAddress(),
				Admin: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgUpdateDao",
			msg: MsgUpdateDaoDescription{
				Id:          sample.AccAddress(),
				Admin:       sample.AccAddress(),
				Description: "description",
			},
		}, {
			name: "description exceeds limit",
			msg: MsgUpdateDaoDescription{
				Id:          sample.AccAddress(),
				Admin:       sample.AccAddress(),
				Description: strings.Repeat("d", 256),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "description minimum length",
			msg: MsgUpdateDaoDescription{
				Id:          sample.AccAddress(),
				Admin:       sample.AccAddress(),
				Description: "d",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "empty description",
			msg: MsgUpdateDaoDescription{
				Id:    sample.AccAddress(),
				Admin: sample.AccAddress(),
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

func TestMsgUpdateDaoAvatar_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgUpdateDaoAvatar
		err  error
	}{
		{
			name: "invalid admin address",
			msg: MsgUpdateDaoAvatar{
				Admin: "invalid_address",
				Id:    sample.AccAddress(),
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "invalid dao address",
			msg: MsgUpdateDaoAvatar{
				Admin: sample.AccAddress(),
				Id:    "invalid_address",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "valid address",
			msg: MsgUpdateDaoAvatar{
				Admin: sample.AccAddress(),
				Id:    sample.AccAddress(),
				Url:   "https://avatar.url",
			},
		}, {
			name: "url exceeds limit",
			msg: MsgUpdateDaoAvatar{
				Admin: sample.AccAddress(),
				Id:    sample.AccAddress(),
				Url:   strings.Repeat("u", 2049),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "invalid url",
			msg: MsgUpdateDaoAvatar{
				Admin: sample.AccAddress(),
				Id:    sample.AccAddress(),
				Url:   "url",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "empty url",
			msg: MsgUpdateDaoAvatar{
				Admin: sample.AccAddress(),
				Id:    sample.AccAddress(),
			},
		}, {
			name: "non https url",
			msg: MsgUpdateDaoAvatar{
				Admin: sample.AccAddress(),
				Id:    sample.AccAddress(),
				Url:   "http://avatar.url",
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

func TestMsgUpdateDaoPinnedRepositories_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgUpdateDaoPinnedRepositories
		err  error
	}{
		{
			name: "invalid admin address",
			msg: MsgUpdateDaoPinnedRepositories{
				Admin: "invalid_address",
				Id:    sample.AccAddress(),
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "invalid dao address",
			msg: MsgUpdateDaoPinnedRepositories{
				Admin: sample.AccAddress(),
				Id:    "invalid_address",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "valid address",
			msg: MsgUpdateDaoPinnedRepositories{
				Admin:        sample.AccAddress(),
				Id:           sample.AccAddress(),
				RepositoryId: 123,
			},
		}, {
			name: "empty url",
			msg: MsgUpdateDaoPinnedRepositories{
				Admin: sample.AccAddress(),
				Id:    sample.AccAddress(),
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

func TestMsgDeleteDao_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgDeleteDao
		err  error
	}{
		{
			name: "WIP",
			msg: MsgDeleteDao{
				Admin: sample.AccAddress(),
				Id:    sample.AccAddress(),
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
