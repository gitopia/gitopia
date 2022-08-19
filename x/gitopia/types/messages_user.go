package types

import (
	"net/url"
	"regexp"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgCreateUser{}

func NewMsgCreateUser(creator string, username string, name string, avatarUrl string, bio string) *MsgCreateUser {
	return &MsgCreateUser{
		Creator:   creator,
		Username:  username,
		Name:      name,
		AvatarUrl: avatarUrl,
		Bio:       bio,
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

	if len(msg.Username) < 3 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "username must consist minimum 3 chars")
	} else if len(msg.Username) > 39 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "username limit exceed: 39")
	}
	if len(msg.Name) > 73 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "name exceeds limit: 73")
	}
	if len(msg.Bio) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Bio exceeds limit: 255")
	}

	if len(msg.AvatarUrl) > 2048 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "avatar url exceeds limit: 2048")
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

	valid, err := regexp.MatchString("^[a-zA-Z0-9]+(?:[-]?[a-zA-Z0-9])*$", msg.Username)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}
	if !valid {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid username")
	}

	return nil
}

var _ sdk.Msg = &MsgUpdateUserName{}

func NewMsgUpdateUserUsername(creator string, username string) *MsgUpdateUserUsername {
	return &MsgUpdateUserUsername{
		Creator:  creator,
		Username: username,
	}
}

func (msg *MsgUpdateUserUsername) Route() string {
	return RouterKey
}

func (msg *MsgUpdateUserUsername) Type() string {
	return "UpdateUserUsername"
}

func (msg *MsgUpdateUserUsername) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateUserUsername) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateUserUsername) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	if len(msg.Username) < 3 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "username must consist minimum 3 chars")
	} else if len(msg.Username) > 39 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "username limit exceed: 39")
	}
	valid, err := regexp.MatchString("^[a-zA-Z0-9]+(?:[-]?[a-zA-Z0-9])*$", msg.Username)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}
	if !valid {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid username")
	}
	return nil
}

var _ sdk.Msg = &MsgUpdateUserName{}

func NewMsgUpdateUserName(creator string, name string) *MsgUpdateUserName {
	return &MsgUpdateUserName{
		Creator: creator,
		Name:    name,
	}
}

func (msg *MsgUpdateUserName) Route() string {
	return RouterKey
}

func (msg *MsgUpdateUserName) Type() string {
	return "UpdateUserName"
}

func (msg *MsgUpdateUserName) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateUserName) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateUserName) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	if len(msg.Name) > 73 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Name exceeds limit: 73")
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
	if msg.Url != "" {
		url, err := url.ParseRequestURI(msg.Url)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid url (%s)", msg.Url)
		}
		if url.Scheme != "https" {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "only https URL scheme is allowed")
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

// var _ sdk.Msg = &MsgTransferUser{}

// func NewMsgTransferUser(creator string, address string) *MsgTransferUser {
// 	return &MsgTransferUser{
// 		Creator: creator,
// 		Address: address,
// 	}
// }
// func (msg *MsgTransferUser) Route() string {
// 	return RouterKey
// }

// func (msg *MsgTransferUser) Type() string {
// 	return "TransferUser"
// }

// func (msg *MsgTransferUser) GetSigners() []sdk.AccAddress {
// 	creator, err := sdk.AccAddressFromBech32(msg.Creator)
// 	if err != nil {
// 		panic(err)
// 	}
// 	return []sdk.AccAddress{creator}
// }

// func (msg *MsgTransferUser) GetSignBytes() []byte {
// 	bz := ModuleCdc.MustMarshalJSON(msg)
// 	return sdk.MustSortJSON(bz)
// }

// func (msg *MsgTransferUser) ValidateBasic() error {
// 	_, err := sdk.AccAddressFromBech32(msg.Creator)
// 	if err != nil {
// 		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
// 	}
// 	_, err = sdk.AccAddressFromBech32(msg.Address)
// 	if err != nil {
// 		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid transfer address (%s)", err)
// 	}
// 	return nil
// }
