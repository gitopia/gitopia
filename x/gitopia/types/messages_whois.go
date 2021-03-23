package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgCreateWhois{}

func NewMsgCreateWhois(creator string, address string) *MsgCreateWhois {
	return &MsgCreateWhois{
		Creator: creator,
		Address: address,
	}
}

func (msg *MsgCreateWhois) Route() string {
	return RouterKey
}

func (msg *MsgCreateWhois) Type() string {
	return "CreateWhois"
}

func (msg *MsgCreateWhois) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreateWhois) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateWhois) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

var _ sdk.Msg = &MsgUpdateWhois{}

func NewMsgUpdateWhois(creator string, id uint64, address string) *MsgUpdateWhois {
	return &MsgUpdateWhois{
		Id:      id,
		Creator: creator,
		Address: address,
	}
}

func (msg *MsgUpdateWhois) Route() string {
	return RouterKey
}

func (msg *MsgUpdateWhois) Type() string {
	return "UpdateWhois"
}

func (msg *MsgUpdateWhois) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateWhois) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateWhois) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

var _ sdk.Msg = &MsgCreateWhois{}

func NewMsgDeleteWhois(creator string, id uint64) *MsgDeleteWhois {
	return &MsgDeleteWhois{
		Id:      id,
		Creator: creator,
	}
}
func (msg *MsgDeleteWhois) Route() string {
	return RouterKey
}

func (msg *MsgDeleteWhois) Type() string {
	return "DeleteWhois"
}

func (msg *MsgDeleteWhois) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgDeleteWhois) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgDeleteWhois) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
