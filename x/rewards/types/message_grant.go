package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgGrant = "grant"

var _ sdk.Msg = &MsgGrant{}

func NewMsgGrant(creator string, amount sdk.Coins, to string) *MsgGrant {
	return &MsgGrant{
		Creator: creator,
		Amount:  amount,
		To:      to,
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

	_, err = sdk.AccAddressFromBech32(msg.To)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid to address (%s)", err)
	}

  if len(msg.Amount) == 0 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "empty amount")
	}
  
	if err := msg.Amount.Validate(); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	return nil
}
