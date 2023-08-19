package types

import (
	"testing"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/v3/app/params"
	"github.com/gitopia/gitopia/v3/testutil/sample"
	"github.com/stretchr/testify/require"
)

func TestMsgCreateRewards_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgCreateReward
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgCreateReward{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid",
			msg: MsgCreateReward{
				Creator:   sample.AccAddress(),
				Recipient: sample.AccAddress(),
				Amount:    sdk.NewCoin(params.BaseCoinUnit, math.NewInt(10)),
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
