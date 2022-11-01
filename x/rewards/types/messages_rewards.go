package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const (
	TypeMsgCreateReward = "create_reward"
)

var _ sdk.Msg = &MsgCreateReward{}

func NewMsgCreateReward(
    creator string,
    recipient string,
    reward string,
    
) *MsgCreateReward {
  return &MsgCreateReward{
		Creator : creator,
		Recipient: recipient,
		Reward: reward,
        
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
  return nil
}

