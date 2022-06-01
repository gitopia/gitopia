package types

import (
	cosmosTypes "github.com/cosmos/cosmos-sdk/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const (
	TypeMsgCreateBounty = "create_bounty"
	TypeMsgUpdateBounty = "update_bounty"
	TypeMsgCloseBounty  = "close_bounty"
	TypeMsgDeleteBounty = "delete_bounty"

	BountyChannelId = "transfer"
	BountyPortId    = "gitopia-bounty-1"
)

var _ sdk.Msg = &MsgCreateBounty{}

func NewMsgCreateBounty(creator string, amount []cosmosTypes.Coin, expiry int64, parentId uint64, parent BountyParent) *MsgCreateBounty {
	return &MsgCreateBounty{
		Creator:  creator,
		Amount:   amount,
		Expiry:   expiry,
		ParentId: parentId,
		Parent:   parent,
	}
}

func (msg *MsgCreateBounty) Route() string {
	return RouterKey
}

func (msg *MsgCreateBounty) Type() string {
	return TypeMsgCreateBounty
}

func (msg *MsgCreateBounty) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreateBounty) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateBounty) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	if err := msg.Amount.Validate(); err != nil {
		return err
	}
	if msg.Expiry < 0 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid expiry time")
	}
	return nil
}

var _ sdk.Msg = &MsgUpdateBountyExpiry{}

func NewMsgUpdateBountyExpiry(creator string, id uint64, expiry int64) *MsgUpdateBountyExpiry {
	return &MsgUpdateBountyExpiry{
		Creator: creator,
		Id:      id,
		Expiry:  expiry,
	}
}

func (msg *MsgUpdateBountyExpiry) Route() string {
	return RouterKey
}

func (msg *MsgUpdateBountyExpiry) Type() string {
	return TypeMsgUpdateBounty
}

func (msg *MsgUpdateBountyExpiry) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateBountyExpiry) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateBountyExpiry) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	if msg.Expiry < 0 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid expiry time")
	}
	return nil
}

var _ sdk.Msg = &MsgCloseBounty{}

func NewMsgCloseBounty(creator string, id uint64) *MsgCloseBounty {
	return &MsgCloseBounty{
		Id:      id,
		Creator: creator,
	}
}

func (msg *MsgCloseBounty) Route() string {
	return RouterKey
}

func (msg *MsgCloseBounty) Type() string {
	return TypeMsgCloseBounty
}

func (msg *MsgCloseBounty) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCloseBounty) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCloseBounty) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

var _ sdk.Msg = &MsgDeleteBounty{}

func NewMsgDeleteBounty(creator string, id uint64) *MsgDeleteBounty {
	return &MsgDeleteBounty{
		Id:      id,
		Creator: creator,
	}
}

func (msg *MsgDeleteBounty) Route() string {
	return RouterKey
}

func (msg *MsgDeleteBounty) Type() string {
	return TypeMsgDeleteBounty
}

func (msg *MsgDeleteBounty) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgDeleteBounty) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgDeleteBounty) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
