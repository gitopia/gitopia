package types

import (
	"net/mail"
	"net/url"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgCreateUser{}

func NewMsgCreateUser(creator string, username string) *MsgCreateUser {
	return &MsgCreateUser{
		Creator:  creator,
		Username: username,
	}
}

func (msg *MsgCreateUser) Route() string {
	return RouterKey
}

func (msg *MsgCreateUser) Type() string {
	return "CreateUser"
}

func (msg *MsgCreateUser) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreateUser) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateUser) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	/*
		if len(msg.Username) < 3 {
			return sdkerrors.Wrapf(sdkerrors.ErrUnknownRequest, "Name must be at least 3 characters long")
		}
	*/
	return nil
}

var _ sdk.Msg = &MsgUpdateUser{}

func NewMsgUpdateUser(creator string, name string, usernameGithub string, avatarUrl string, email string, bio string) *MsgUpdateUser {
	return &MsgUpdateUser{
		Creator:        creator,
		Name:           name,
		UsernameGithub: usernameGithub,
		AvatarUrl:      avatarUrl,
		Email:          email,
		Bio:            bio,
	}
}

func (msg *MsgUpdateUser) Route() string {
	return RouterKey
}

func (msg *MsgUpdateUser) Type() string {
	return "UpdateUser"
}

func (msg *MsgUpdateUser) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateUser) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateUser) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	if len(msg.Name) > 73 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Name exceeds limit: 73")
	}
	if len(msg.UsernameGithub) > 39 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "GitHub username exceeds limit: 39")
	}
	if len(msg.AvatarUrl) > 2048 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "User Avatar url exceeds limit: 2048")
	}
	if len(msg.Bio) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Bio exceeds limit: 255")
	}
	if len(msg.Email) > 254 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Email exceeds limit: 254")
	}
	if msg.Email != "" {
		_, err = mail.ParseAddress(msg.Email)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid email address (%s)", msg.Email)
		}
	}
	if msg.AvatarUrl != "" {
		_, err := url.ParseRequestURI(msg.AvatarUrl)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid url (%s)", msg.AvatarUrl)
		}
	}
	return nil
}

var _ sdk.Msg = &MsgDeleteUser{}

func NewMsgDeleteUser(creator string, id string) *MsgDeleteUser {
	return &MsgDeleteUser{
		Id:      id,
		Creator: creator,
	}
}
func (msg *MsgDeleteUser) Route() string {
	return RouterKey
}

func (msg *MsgDeleteUser) Type() string {
	return "DeleteUser"
}

func (msg *MsgDeleteUser) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgDeleteUser) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgDeleteUser) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
