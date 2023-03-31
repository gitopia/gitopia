package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgExercise = "exercise"

var _ sdk.Msg = &MsgExercise{}

func NewMsgExercise(creator string, amount sdk.Coin, to string) *MsgExercise {
	return &MsgExercise{
		Creator: creator,
		Amount:  amount,
		To:      to,
	}
}

func (msg *MsgExercise) Route() string {
	return RouterKey
}

func (msg *MsgExercise) Type() string {
	return TypeMsgExercise
}

func (msg *MsgExercise) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgExercise) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgExercise) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	coins := sdk.Coins{msg.Amount}
	if err := coins.Validate(); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}
	if coins.IsZero() {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "amount cannot be zero")
	}
	if _, valid := sdk.GetDenomUnit(coins[0].Denom); !valid {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid denom (%s)", coins[0].Denom)
	}
	_, err = sdk.AccAddressFromBech32(msg.To)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid to address (%s)", err)
	}
	return nil
}
