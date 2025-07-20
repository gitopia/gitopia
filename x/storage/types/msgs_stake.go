package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// Stake Management Messages

var _ sdk.Msg = &MsgIncreaseStake{}

// NewMsgIncreaseStake creates a new MsgIncreaseStake instance
func NewMsgIncreaseStake(creator string, amount sdk.Coin) *MsgIncreaseStake {
	return &MsgIncreaseStake{
		Creator: creator,
		Amount:  amount,
	}
}

func (msg *MsgIncreaseStake) Route() string {
	return RouterKey
}

func (msg *MsgIncreaseStake) Type() string {
	return TypeMsgIncreaseStake
}

func (msg *MsgIncreaseStake) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgIncreaseStake) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgIncreaseStake) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if msg.Amount.IsZero() || msg.Amount.IsNegative() {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "amount must be greater than 0")
	}

	return nil
}

var _ sdk.Msg = &MsgDecreaseStake{}

// NewMsgDecreaseStake creates a new MsgDecreaseStake instance
func NewMsgDecreaseStake(creator string, amount sdk.Coin) *MsgDecreaseStake {
	return &MsgDecreaseStake{
		Creator: creator,
		Amount:  amount,
	}
}

func (msg *MsgDecreaseStake) Route() string {
	return RouterKey
}

func (msg *MsgDecreaseStake) Type() string {
	return TypeMsgDecreaseStake
}

func (msg *MsgDecreaseStake) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgDecreaseStake) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgDecreaseStake) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if msg.Amount.IsZero() || msg.Amount.IsNegative() {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "amount must be greater than 0")
	}

	return nil
}

var _ sdk.Msg = &MsgReactivateProvider{}

// NewMsgReactivateProvider creates a new MsgReactivateProvider instance
func NewMsgReactivateProvider(creator string) *MsgReactivateProvider {
	return &MsgReactivateProvider{
		Creator: creator,
	}
}

func (msg *MsgReactivateProvider) Route() string {
	return RouterKey
}

func (msg *MsgReactivateProvider) Type() string {
	return TypeMsgReactivateProvider
}

func (msg *MsgReactivateProvider) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgReactivateProvider) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgReactivateProvider) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
