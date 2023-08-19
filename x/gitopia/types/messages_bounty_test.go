package types

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/v3/app/params"
	"github.com/gitopia/gitopia/v3/testutil/sample"
	"github.com/stretchr/testify/require"
)

func TestMsgCreateBounty_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgCreateBounty
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgCreateBounty{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		},
		{
			name: "valid address",
			msg: MsgCreateBounty{
				Creator: sample.AccAddress(),
				Amount: []sdk.Coin{
					{Denom: params.BaseCoinUnit, Amount: sdk.NewInt(1000)},
				},
			},
		},
		{
			name: "empty amount",
			msg: MsgCreateBounty{
				Creator: sample.AccAddress(),
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

func TestMsgUpdateBountyExpiry_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgUpdateBountyExpiry
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgUpdateBountyExpiry{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgUpdateBountyExpiry{
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

func TestMsgDeleteBounty_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgDeleteBounty
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgDeleteBounty{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgDeleteBounty{
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
