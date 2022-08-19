package types

import (
	"net/url"
	"regexp"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgCreateDao{}

func NewMsgCreateDao(creator string, name string, description string) *MsgCreateDao {
	return &MsgCreateDao{
		Creator:     creator,
		Name:        name,
		Description: description,
	}
}

func (msg *MsgCreateDao) Route() string {
	return RouterKey
}

func (msg *MsgCreateDao) Type() string {
	return "CreateDao"
}

func (msg *MsgCreateDao) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreateDao) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateDao) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if len(msg.Name) < 3 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Dao name must be at least 3 characters long")
	} else if len(msg.Name) > 39 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Dao name exceeds limit: 39")
	}
	valid, err := regexp.MatchString("^[a-zA-Z0-9]+(?:[-]?[a-zA-Z0-9])*$", msg.Name)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}
	if !valid {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid dao name (%v)", msg.Name)
	}

	if len(msg.Description) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "description length exceeds limit: 255")
	}
	return nil
}

var _ sdk.Msg = &MsgRenameDao{}

func NewMsgRenameDao(creator string, id string, name string) *MsgRenameDao {
	return &MsgRenameDao{
		Id:      id,
		Creator: creator,
		Name:    name,
	}
}

func (msg *MsgRenameDao) Route() string {
	return RouterKey
}

func (msg *MsgRenameDao) Type() string {
	return "RenameDao"
}

func (msg *MsgRenameDao) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgRenameDao) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgRenameDao) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	_, err = sdk.AccAddressFromBech32(msg.Id)
	if err != nil {
		if len(msg.Id) < 3 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "dao name must consist minimum 3 chars")
		} else if len(msg.Id) > 39 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "dao name limit exceed: 39")
		}
		valid, err := regexp.MatchString("^[a-zA-Z0-9]+(?:[-]?[a-zA-Z0-9])*$", msg.Id)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
		}
		if !valid {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid dao name (%v)", msg.Id)
		}
	}
	if len(msg.Name) < 3 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Dao name must be at least 3 characters long")
	} else if len(msg.Name) > 39 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Dao name exceeds limit: 39")
	}
	valid, err := regexp.MatchString("^[a-zA-Z0-9]+(?:[-]?[a-zA-Z0-9])*$", msg.Name)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}
	if !valid {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid dao name (%v)", msg.Name)
	}
	return nil
}

var _ sdk.Msg = &MsgUpdateDaoDescription{}

func NewMsgUpdateDaoDescription(creator string, id string, description string) *MsgUpdateDaoDescription {
	return &MsgUpdateDaoDescription{
		Id:          id,
		Creator:     creator,
		Description: description,
	}
}

func (msg *MsgUpdateDaoDescription) Route() string {
	return RouterKey
}

func (msg *MsgUpdateDaoDescription) Type() string {
	return "UpdateDaoDescription"
}

func (msg *MsgUpdateDaoDescription) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateDaoDescription) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateDaoDescription) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	_, err = sdk.AccAddressFromBech32(msg.Id)
	if err != nil {
		if len(msg.Id) < 3 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "dao name must consist minimum 3 chars")
		} else if len(msg.Id) > 39 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "dao name limit exceed: 39")
		}
		valid, err := regexp.MatchString("^[a-zA-Z0-9]+(?:[-]?[a-zA-Z0-9])*$", msg.Id)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
		}
		if !valid {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid dao name (%v)", msg.Id)
		}
	}
	if len(msg.Description) < 3 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Minimum character required: 3")
	}
	if len(msg.Description) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Description exceeds limit: 255")
	}
	return nil
}

var _ sdk.Msg = &MsgUpdateDaoWebsite{}

func NewMsgUpdateDaoWebsite(creator string, id string, url string) *MsgUpdateDaoWebsite {
	return &MsgUpdateDaoWebsite{
		Id:      id,
		Creator: creator,
		Url:     url,
	}
}

func (msg *MsgUpdateDaoWebsite) Route() string {
	return RouterKey
}

func (msg *MsgUpdateDaoWebsite) Type() string {
	return "UpdateDaoWebsite"
}

func (msg *MsgUpdateDaoWebsite) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateDaoWebsite) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateDaoWebsite) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	_, err = sdk.AccAddressFromBech32(msg.Id)
	if err != nil {
		if len(msg.Id) < 3 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "dao name must consist minimum 3 chars")
		} else if len(msg.Id) > 39 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "dao name limit exceed: 39")
		}
		valid, err := regexp.MatchString("^[a-zA-Z0-9]+(?:[-]?[a-zA-Z0-9])*$", msg.Id)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
		}
		if !valid {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid dao name (%v)", msg.Id)
		}
	}
	if msg.Url != "" {
		url, err := url.ParseRequestURI(msg.Url)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid url (%s)", msg.Url)
		}
		if url.Scheme != "https" && url.Scheme != "http" {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "only https and http URL scheme is allowed in Website")
		}
	}
	return nil
}

var _ sdk.Msg = &MsgUpdateDaoLocation{}

func NewMsgUpdateDaoLocation(creator string, id string, location string) *MsgUpdateDaoLocation {
	return &MsgUpdateDaoLocation{
		Id:       id,
		Creator:  creator,
		Location: location,
	}
}

func (msg *MsgUpdateDaoLocation) Route() string {
	return RouterKey
}

func (msg *MsgUpdateDaoLocation) Type() string {
	return "UpdateDaoLocation"
}

func (msg *MsgUpdateDaoLocation) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateDaoLocation) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateDaoLocation) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	_, err = sdk.AccAddressFromBech32(msg.Id)
	if err != nil {
		if len(msg.Id) < 3 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "dao name must consist minimum 3 chars")
		} else if len(msg.Id) > 39 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "dao name limit exceed: 39")
		}
		valid, err := regexp.MatchString("^[a-zA-Z0-9]+(?:[-]?[a-zA-Z0-9])*$", msg.Id)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
		}
		if !valid {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid dao name (%v)", msg.Id)
		}
	}
	if len(msg.Location) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Location exceeds limit: 255")
	}
	return nil
}

var _ sdk.Msg = &MsgUpdateDaoAvatar{}

func NewMsgUpdateDaoAvatar(creator string, id string, url string) *MsgUpdateDaoAvatar {
	return &MsgUpdateDaoAvatar{
		Id:      id,
		Creator: creator,
		Url:     url,
	}
}

func (msg *MsgUpdateDaoAvatar) Route() string {
	return RouterKey
}

func (msg *MsgUpdateDaoAvatar) Type() string {
	return "UpdateDaoAvatar"
}

func (msg *MsgUpdateDaoAvatar) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateDaoAvatar) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateDaoAvatar) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	_, err = sdk.AccAddressFromBech32(msg.Id)
	if err != nil {
		if len(msg.Id) < 3 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "dao name must consist minimum 3 chars")
		} else if len(msg.Id) > 39 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "dao name limit exceed: 39")
		}
		valid, err := regexp.MatchString("^[a-zA-Z0-9]+(?:[-]?[a-zA-Z0-9])*$", msg.Id)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
		}
		if !valid {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid dao name (%v)", msg.Id)
		}
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

var _ sdk.Msg = &MsgDeleteDao{}

func NewMsgDeleteDao(creator string, id string) *MsgDeleteDao {
	return &MsgDeleteDao{
		Id:      id,
		Creator: creator,
	}
}
func (msg *MsgDeleteDao) Route() string {
	return RouterKey
}

func (msg *MsgDeleteDao) Type() string {
	return "DeleteDao"
}

func (msg *MsgDeleteDao) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgDeleteDao) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgDeleteDao) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	_, err = sdk.AccAddressFromBech32(msg.Id)
	if err != nil {
		if len(msg.Id) < 3 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "dao name must consist minimum 3 chars")
		} else if len(msg.Id) > 39 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "dao name limit exceed: 39")
		}
		valid, err := regexp.MatchString("^[a-zA-Z0-9]+(?:[-]?[a-zA-Z0-9])*$", msg.Id)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
		}
		if !valid {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid dao name (%v)", msg.Id)
		}
	}
	return nil
}
