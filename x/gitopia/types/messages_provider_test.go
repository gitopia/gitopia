package types

import (
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/testutil/sample"
	"github.com/stretchr/testify/require"
)

func TestMsgAuthorizeProvider_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgAuthorizeProvider
		err  error
	}{
		{
			name: "invalid creator address",
			msg: MsgAuthorizeProvider{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid message",
			msg: MsgAuthorizeProvider{
				Creator:    sample.AccAddress(),
				Granter:    sample.AccAddress(),
				Provider:   sample.AccAddress(),
				Permission: ProviderPermission_GIT_SERVER,
			},
		}, {
			name: "invalid provider address",
			msg: MsgAuthorizeProvider{
				Creator:  sample.AccAddress(),
				Provider: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "invalid granter address",
			msg: MsgAuthorizeProvider{
				Creator:  sample.AccAddress(),
				Granter:  "invalid_address",
				Provider: sample.AccAddress(),
			},
		}, {
			name: "invalid permission",
			msg: MsgAuthorizeProvider{
				Creator:    sample.AccAddress(),
				Granter:    sample.AccAddress(),
				Provider:   sample.AccAddress(),
				Permission: 9,
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

func TestMsgRevokeProviderPermission_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgRevokeProviderPermission
		err  error
	}{
		{
			name: "invalid creator address",
			msg: MsgRevokeProviderPermission{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid message",
			msg: MsgRevokeProviderPermission{
				Creator:    sample.AccAddress(),
				Granter:    sample.AccAddress(),
				Provider:   sample.AccAddress(),
				Permission: ProviderPermission_GIT_SERVER,
			},
		}, {
			name: "invalid provider address",
			msg: MsgRevokeProviderPermission{
				Creator:  sample.AccAddress(),
				Provider: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "invalid granter address",
			msg: MsgRevokeProviderPermission{
				Creator:  sample.AccAddress(),
				Granter:  "invalid_address",
				Provider: sample.AccAddress(),
			},
		}, {
			name: "invalid permission",
			msg: MsgRevokeProviderPermission{
				Creator:    sample.AccAddress(),
				Granter:    sample.AccAddress(),
				Provider:   sample.AccAddress(),
				Permission: 9,
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
