package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgGrant = "grant"

var _ sdk.Msg = &MsgGrant{}

func NewMsgGrant(creator string, coins string, to string) *MsgGrant {
  return &MsgGrant{
		Creator: creator,
    Coins: coins,
    To: to,
	}
}

func (msg *MsgGrant) Route() string {
  return RouterKey
}

func (msg *MsgGrant) Type() string {
  return TypeMsgGrant
}

func (msg *MsgGrant) GetSigners() []sdk.AccAddress {
  creator, err := sdk.AccAddressFromBech32(msg.Creator)
  if err != nil {
    panic(err)
  }
  return []sdk.AccAddress{creator}
}

func (msg *MsgGrant) GetSignBytes() []byte {
  bz := ModuleCdc.MustMarshalJSON(msg)
  return sdk.MustSortJSON(bz)
}

func (msg *MsgGrant) ValidateBasic() error {
  _, err := sdk.AccAddressFromBech32(msg.Creator)
  	if err != nil {
  		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
  	}
  return nil
}

