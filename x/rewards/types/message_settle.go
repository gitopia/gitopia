package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgSettle = "settle"

var _ sdk.Msg = &MsgSettle{}

func NewMsgSettle(creator string, recipient string, amount string) *MsgSettle {
  return &MsgSettle{
		Creator: creator,
    Recipient: recipient,
    Amount: amount,
	}
}

func (msg *MsgSettle) Route() string {
  return RouterKey
}

func (msg *MsgSettle) Type() string {
  return TypeMsgSettle
}

func (msg *MsgSettle) GetSigners() []sdk.AccAddress {
  creator, err := sdk.AccAddressFromBech32(msg.Creator)
  if err != nil {
    panic(err)
  }
  return []sdk.AccAddress{creator}
}

func (msg *MsgSettle) GetSignBytes() []byte {
  bz := ModuleCdc.MustMarshalJSON(msg)
  return sdk.MustSortJSON(bz)
}

func (msg *MsgSettle) ValidateBasic() error {
  _, err := sdk.AccAddressFromBech32(msg.Creator)
  	if err != nil {
  		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
  	}
  return nil
}

