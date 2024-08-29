package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const (
	TypeMsgAddMember        = "add_member"
	TypeMsgUpdateMemberRole = "update_member_role"
	TypeMsgRemoveMember     = "remove_member"
)

var _ sdk.Msg = &MsgAddMember{}

func NewMsgAddMember(creator string, daoId string, userId string, role MemberRole) *MsgAddMember {
	return &MsgAddMember{
		Creator: creator,
		DaoId:   daoId,
		UserId:  userId,
		Role:    role,
	}
}

func (msg *MsgAddMember) Route() string {
	return RouterKey
}

func (msg *MsgAddMember) Type() string {
	return TypeMsgAddMember
}

func (msg *MsgAddMember) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgAddMember) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgAddMember) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.ErrInvalidAddress.Wrapf("invalid creator address (%s)", err)
	}

	if err := ValidateDaoId(msg.DaoId); err != nil {
		return sdkerrors.ErrInvalidRequest.Wrapf("invalid dao id (%v)", err)
	}

	if err := ValidateUserId(msg.UserId); err != nil {
		return sdkerrors.ErrInvalidRequest.Wrapf("invalid user id (%v)", err)
	}

	return nil
}

var _ sdk.Msg = &MsgUpdateMemberRole{}

func NewMsgUpdateMemberRole(creator string, daoId string, userId string, role MemberRole) *MsgUpdateMemberRole {
	return &MsgUpdateMemberRole{
		Creator: creator,
		DaoId:   daoId,
		UserId:  userId,
		Role:    role,
	}
}

func (msg *MsgUpdateMemberRole) Route() string {
	return RouterKey
}

func (msg *MsgUpdateMemberRole) Type() string {
	return TypeMsgUpdateMemberRole
}

func (msg *MsgUpdateMemberRole) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateMemberRole) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateMemberRole) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.ErrInvalidAddress.Wrapf("invalid creator address (%s)", err)
	}

	if err := ValidateDaoId(msg.DaoId); err != nil {
		return sdkerrors.ErrInvalidRequest.Wrapf("invalid dao id (%v)", err)
	}

	if err := ValidateUserId(msg.UserId); err != nil {
		return sdkerrors.ErrInvalidRequest.Wrapf("invalid user id (%v)", err)
	}

	return nil
}

var _ sdk.Msg = &MsgRemoveMember{}

func NewMsgRemoveMember(creator string, daoId string, userId string) *MsgRemoveMember {
	return &MsgRemoveMember{
		Creator: creator,
		DaoId:   daoId,
		UserId:  userId,
	}
}
func (msg *MsgRemoveMember) Route() string {
	return RouterKey
}

func (msg *MsgRemoveMember) Type() string {
	return TypeMsgRemoveMember
}

func (msg *MsgRemoveMember) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgRemoveMember) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgRemoveMember) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.ErrInvalidAddress.Wrapf("invalid creator address (%s)", err)
	}

	if err := ValidateDaoId(msg.DaoId); err != nil {
		return sdkerrors.ErrInvalidRequest.Wrapf("invalid dao id (%v)", err)
	}

	if err := ValidateUserId(msg.UserId); err != nil {
		return sdkerrors.ErrInvalidRequest.Wrapf("invalid user id (%v)", err)
	}

	return nil
}
