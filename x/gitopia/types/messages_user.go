package types

import (
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

func NewMsgUpdateUser(creator string, name string, usernameGithub string, avatarUrl string, bio string) *MsgUpdateUser {
	return &MsgUpdateUser{
		Creator:        creator,
		Name:           name,
		UsernameGithub: usernameGithub,
		AvatarUrl:      avatarUrl,
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
	if msg.AvatarUrl != "" {
		url, err := url.ParseRequestURI(msg.AvatarUrl)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid url (%s)", msg.AvatarUrl)
		}
		if url.Scheme != "https" {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "only https URL scheme is allowed")
		}
	}
	return nil
}

var _ sdk.Msg = &MsgUpdateUserBio{}

func NewMsgUpdateUserBio(creator string, bio string) *MsgUpdateUserBio {
	return &MsgUpdateUserBio{
		Creator: creator,
		Bio:     bio,
	}
}

func (msg *MsgUpdateUserBio) Route() string {
	return RouterKey
}

func (msg *MsgUpdateUserBio) Type() string {
	return "UpdateUserBio"
}

func (msg *MsgUpdateUserBio) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateUserBio) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateUserBio) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	if len(msg.Bio) < 3 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Minimum character required: 3")
	}
	if len(msg.Bio) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Bio exceeds limit: 255")
	}
	return nil
}

var _ sdk.Msg = &MsgUpdateUserAvatar{}

func NewMsgUpdateUserAvatar(creator string, url string) *MsgUpdateUserAvatar {
	return &MsgUpdateUserAvatar{
		Creator: creator,
		Url:     url,
	}
}

func (msg *MsgUpdateUserAvatar) Route() string {
	return RouterKey
}

func (msg *MsgUpdateUserAvatar) Type() string {
	return "UpdateUserAvatar"
}

func (msg *MsgUpdateUserAvatar) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateUserAvatar) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateUserAvatar) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	if len(msg.Url) > 2048 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "avatar url exceeds limit: 2048")
	}
	url, err := url.ParseRequestURI(msg.Url)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid url (%s)", msg.Url)
	}
	if url.Scheme != "https" {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "only https URL scheme is allowed")
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

var _ sdk.Msg = &MsgTransferUser{}

func NewMsgTransferUser(creator string, address string) *MsgTransferUser {
	return &MsgTransferUser{
		Creator: creator,
		Address: address,
	}
}
func (msg *MsgTransferUser) Route() string {
	return RouterKey
}

func (msg *MsgTransferUser) Type() string {
	return "TransferUser"
}

func (msg *MsgTransferUser) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgTransferUser) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgTransferUser) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	_, err = sdk.AccAddressFromBech32(msg.Address)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid transfer address (%s)", err)
	}
	return nil
}
