package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const (
	TypeMsgCreateBounty = "create_bounty"
	TypeMsgUpdateBounty = "update_bounty"
	TypeMsgDeleteBounty = "delete_bounty"
)

var _ sdk.Msg = &MsgCreateBounty{}

func NewMsgCreateBounty(creator string, amount string, state string, deadline string, parentId string, parent string, createdAt string, updatedAt string) *MsgCreateBounty {
	return &MsgCreateBounty{
		Creator:   creator,
		Amount:    amount,
		State:     state,
		Deadline:  deadline,
		ParentId:  parentId,
		Parent:    parent,
		CreatedAt: createdAt,
		UpdatedAt: updatedAt,
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
	return nil
}

var _ sdk.Msg = &MsgUpdateBounty{}

func NewMsgUpdateBounty(creator string, id uint64, amount string, state string, deadline string, parentId string, parent string, createdAt string, updatedAt string) *MsgUpdateBounty {
	return &MsgUpdateBounty{
		Id:        id,
		Creator:   creator,
		Amount:    amount,
		State:     state,
		Deadline:  deadline,
		ParentId:  parentId,
		Parent:    parent,
		CreatedAt: createdAt,
		UpdatedAt: updatedAt,
	}
}

func (msg *MsgUpdateBounty) Route() string {
	return RouterKey
}

func (msg *MsgUpdateBounty) Type() string {
	return TypeMsgUpdateBounty
}

func (msg *MsgUpdateBounty) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateBounty) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateBounty) ValidateBasic() error {
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
