package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgExercise = "exercise"

var _ sdk.Msg = &MsgExercise{}

func NewMsgExercise(creator string, coins string, to string) *MsgExercise {
  return &MsgExercise{
		Creator: creator,
    Coins: coins,
    To: to,
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
  return nil
}

