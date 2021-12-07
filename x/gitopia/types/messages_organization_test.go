package types

import (
	"strings"
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/testutil/sample"
	"github.com/stretchr/testify/require"
)

func TestMsgCreateOrganization_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgCreateOrganization
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgCreateOrganization{
				Creator: "invalid_address",
				Name:    "name",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgCreateOrganization{
				Creator: sample.AccAddress(),
				Name:    "name",
			},
		}, {
			name: "too short name",
			msg: MsgCreateOrganization{
				Creator: sample.AccAddress(),
				Name:    "n",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "name exceeds limit",
			msg: MsgCreateOrganization{
				Creator: sample.AccAddress(),
				Name:    strings.Repeat("n", 40),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "invalid name",
			msg: MsgCreateOrganization{
				Creator: sample.AccAddress(),
				Name:    "!nva1id",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "description exceeds limit",
			msg: MsgCreateOrganization{
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

func TestMsgRenameOrganization_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgRenameOrganization
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgRenameOrganization{
				Creator: "invalid_address",
				Name:    "name",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgRenameOrganization{
				Creator: sample.AccAddress(),
				Name:    "name",
			},
		}, {
			name: "too short name",
			msg: MsgRenameOrganization{
				Creator: sample.AccAddress(),
				Name:    "n",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "name exceeds limit",
			msg: MsgRenameOrganization{
				Creator: sample.AccAddress(),
				Name:    strings.Repeat("n", 40),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "invalid name",
			msg: MsgRenameOrganization{
				Creator: sample.AccAddress(),
				Name:    "!nva1id",
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

func TestMsgUpdateOrganizationMember_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgUpdateOrganizationMember
		err  error
	}{
		{
			name: "invalid id",
			msg: MsgUpdateOrganizationMember{
				Id:      "invalid_id",
				Creator: sample.AccAddress(),
				User:    sample.AccAddress(),
				Role:    "MEMBER",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "invalid creator address",
			msg: MsgUpdateOrganizationMember{
				Id:      sample.AccAddress(),
				Creator: "invalid_address",
				User:    sample.AccAddress(),
				Role:    "MEMBER",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgUpdateOrganizationMember",
			msg: MsgUpdateOrganizationMember{
				Id:      sample.AccAddress(),
				Creator: sample.AccAddress(),
				User:    sample.AccAddress(),
				Role:    "MEMBER",
			},
		}, {
			name: "invalid user address",
			msg: MsgUpdateOrganizationMember{
				Id:      sample.AccAddress(),
				Creator: sample.AccAddress(),
				User:    "invalid_user",
				Role:    "MEMBER",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "invalid role",
			msg: MsgUpdateOrganizationMember{
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

func TestMsgRemoveOrganizationMember_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgRemoveOrganizationMember
		err  error
	}{
		{
			name: "invalid id",
			msg: MsgRemoveOrganizationMember{
				Id:      "invalid_id",
				Creator: sample.AccAddress(),
				User:    sample.AccAddress(),
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "invalid creator address",
			msg: MsgRemoveOrganizationMember{
				Id:      sample.AccAddress(),
				Creator: "invalid_address",
				User:    sample.AccAddress(),
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgUpdateOrganizationMember",
			msg: MsgRemoveOrganizationMember{
				Id:      sample.AccAddress(),
				Creator: sample.AccAddress(),
				User:    sample.AccAddress(),
			},
		}, {
			name: "invalid user address",
			msg: MsgRemoveOrganizationMember{
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

func TestMsgUpdateOrganization_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgUpdateOrganization
		err  error
	}{
		{
			name: "invalid id",
			msg: MsgUpdateOrganization{
				Id:      "invalid_id",
				Creator: sample.AccAddress(),
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "invalid creator address",
			msg: MsgUpdateOrganization{
				Id:      sample.AccAddress(),
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgDeleteOrganization",
			msg: MsgUpdateOrganization{
				Id:      sample.AccAddress(),
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

func TestMsgDeleteOrganization_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgDeleteOrganization
		err  error
	}{
		{
			name: "invalid id",
			msg: MsgDeleteOrganization{
				Id:      "invalid_id",
				Creator: sample.AccAddress(),
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "invalid creator address",
			msg: MsgDeleteOrganization{
				Id:      sample.AccAddress(),
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgDeleteOrganization",
			msg: MsgDeleteOrganization{
				Id:      sample.AccAddress(),
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
