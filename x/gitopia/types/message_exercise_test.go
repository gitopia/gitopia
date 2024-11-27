package types

import (
	"testing"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/v5/app/params"
	"github.com/gitopia/gitopia/v5/testutil/sample"
	"github.com/stretchr/testify/require"
)

func TestMsgExercise_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgExercise
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgExercise{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "invalid amount",
			msg: MsgExercise{
				Creator: sample.AccAddress(),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "bad amount denom",
			msg: MsgExercise{
				Creator: sample.AccAddress(),
				Amount:  sdk.Coin{"1lore", math.NewInt(10)},
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "negative amount ",
			msg: MsgExercise{
				Creator: sample.AccAddress(),
				Amount:  sdk.Coin{params.BaseCoinUnit, math.NewInt(-10)},
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "invalid amount denom ",
			msg: MsgExercise{
				Creator: sample.AccAddress(),
				Amount:  sdk.Coin{"hola", math.NewInt(10)},
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "invalid to address",
			msg: MsgExercise{
				Creator: sample.AccAddress(),
				Amount:  sdk.Coin{params.BaseCoinUnit, math.NewInt(10)},
				To:      "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid message",
			msg: MsgExercise{
				Creator: sample.AccAddress(),
				Amount:  sdk.Coin{params.BaseCoinUnit, math.NewInt(10)},
				To:      sample.AccAddress(),
			},
			err: nil,
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
