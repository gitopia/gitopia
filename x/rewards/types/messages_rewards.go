package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const (
	TypeMsgCreateReward = "create_rewards"
)

var _ sdk.Msg = &MsgCreateReward{}

func NewMsgCreateReward(
	creator string,
	recipient string,
	amount sdk.Coin,
	series Series,
) *MsgCreateReward {
	return &MsgCreateReward{
		Creator:   creator,
		Recipient: recipient,
		Amount:    amount,
		Series: series,
	}
}

func (msg *MsgCreateReward) Route() string {
	return RouterKey
}

func (msg *MsgCreateReward) Type() string {
	return TypeMsgCreateReward
}

func (msg *MsgCreateReward) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreateReward) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateReward) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	_, err = sdk.AccAddressFromBech32(msg.Recipient)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid recipient address (%s)", err)
	}

	if msg.Amount.Validate() != nil {
		return err
	}

	if msg.Amount.IsZero(){
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidCoins, "empty amount")
	}

	if _, found := sdk.GetDenomUnit(msg.Amount.Denom); !found {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidCoins, "invalid coin denom (%s)", msg.Amount.Denom)
	}

	return nil
}
