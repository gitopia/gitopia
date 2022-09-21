package types

import (
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/testutil/sample"
	"github.com/stretchr/testify/require"
)

func TestMsgAuthorizeStorageProvider_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgAuthorizeStorageProvider
		err  error
	}{
		{
			name: "invalid creator address",
			msg: MsgAuthorizeStorageProvider{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid creator address",
			msg: MsgAuthorizeStorageProvider{
				Creator:  sample.AccAddress(),
				Provider: sample.AccAddress(),
			},
		}, {
			name: "invalid provider address",
			msg: MsgAuthorizeStorageProvider{
				Creator:  sample.AccAddress(),
				Provider: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgAuthorizeStorageProvider{
				Creator:  sample.AccAddress(),
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

func TestMsgRevokeStorageProviderPermissions_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgRevokeStorageProviderPermissions
		err  error
	}{
		{
			name: "invalid creator address",
			msg: MsgRevokeStorageProviderPermissions{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid creator address",
			msg: MsgRevokeStorageProviderPermissions{
				Creator:  sample.AccAddress(),
				Provider: sample.AccAddress(),
			},
		}, {
			name: "invalid provider address",
			msg: MsgRevokeStorageProviderPermissions{
				Creator:  sample.AccAddress(),
				Provider: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid provider address",
			msg: MsgRevokeStorageProviderPermissions{
				Creator:  sample.AccAddress(),
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
