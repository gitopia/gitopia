package types

import (
	"net/url"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgCreateOrganization{}

func NewMsgCreateOrganization(creator string, name string, description string) *MsgCreateOrganization {
	return &MsgCreateOrganization{
		Creator:     creator,
		Name:        name,
		Description: description,
	}
}

func (msg *MsgCreateOrganization) Route() string {
	return RouterKey
}

func (msg *MsgCreateOrganization) Type() string {
	return "CreateOrganization"
}

func (msg *MsgCreateOrganization) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreateOrganization) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateOrganization) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	sanitized := IsNameSanitized(msg.Name)
	if !sanitized {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "organization name is not sanitized")
	}
	if len(msg.Name) < 3 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Organization name must be at least 3 characters long")
	} else if len(msg.Name) > 39 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Organization name exceeds limit: 39")
	}
	if len(msg.Description) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "description length exceeds limit: 255")
	}
	return nil
}

var _ sdk.Msg = &MsgRenameOrganization{}

func NewMsgRenameOrganization(creator string, id string, name string) *MsgRenameOrganization {
	return &MsgRenameOrganization{
		Id:      id,
		Creator: creator,
		Name:    name,
	}
}

func (msg *MsgRenameOrganization) Route() string {
	return RouterKey
}

func (msg *MsgRenameOrganization) Type() string {
	return "RenameOrganization"
}

func (msg *MsgRenameOrganization) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgRenameOrganization) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgRenameOrganization) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	sanitized := IsNameSanitized(msg.Name)
	if !sanitized {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "organization name is not sanitized")
	}
	if len(msg.Name) < 3 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Organization name must be at least 3 characters long")
	} else if len(msg.Name) > 39 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Organization name exceeds limit: 39")
	}
	return nil
}

var _ sdk.Msg = &MsgUpdateOrganizationMember{}

func NewMsgUpdateOrganizationMember(creator string, id string, user string, role string) *MsgUpdateOrganizationMember {
	return &MsgUpdateOrganizationMember{
		Id:      id,
		Creator: creator,
		User:    user,
		Role:    role,
	}
}

func (msg *MsgUpdateOrganizationMember) Route() string {
	return RouterKey
}

func (msg *MsgUpdateOrganizationMember) Type() string {
	return "UpdateOrganizationMember"
}

func (msg *MsgUpdateOrganizationMember) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateOrganizationMember) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateOrganizationMember) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Id)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid organization address (%s)", err)
	}
	_, err = sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	_, err = sdk.AccAddressFromBech32(msg.User)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid user address (%s)", err)
	}
	_, exists := OrganizationMember_Role_value[msg.Role]
	if !exists {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid role (%s)", msg.Role)
	}
	return nil
}

var _ sdk.Msg = &MsgRemoveOrganizationMember{}

func NewMsgRemoveOrganizationMember(creator string, id string, user string) *MsgRemoveOrganizationMember {
	return &MsgRemoveOrganizationMember{
		Id:      id,
		Creator: creator,
		User:    user,
	}
}

func (msg *MsgRemoveOrganizationMember) Route() string {
	return RouterKey
}

func (msg *MsgRemoveOrganizationMember) Type() string {
	return "RemoveOrganizationMember"
}

func (msg *MsgRemoveOrganizationMember) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgRemoveOrganizationMember) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgRemoveOrganizationMember) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Id)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid organization address (%s)", err)
	}
	_, err = sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	_, err = sdk.AccAddressFromBech32(msg.User)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid user address (%s)", err)
	}
	return nil
}

var _ sdk.Msg = &MsgUpdateOrganization{}

func NewMsgUpdateOrganization(creator string, id string, name string, avatarUrl string, location string, website string, description string) *MsgUpdateOrganization {
	return &MsgUpdateOrganization{
		Id:          id,
		Creator:     creator,
		Name:        name,
		AvatarUrl:   avatarUrl,
		Location:    location,
		Website:     website,
		Description: description,
	}
}

func (msg *MsgUpdateOrganization) Route() string {
	return RouterKey
}

func (msg *MsgUpdateOrganization) Type() string {
	return "UpdateOrganization"
}

func (msg *MsgUpdateOrganization) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateOrganization) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateOrganization) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Id)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid organization address (%s)", err)
	}
	_, err = sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	if len(msg.Name) > 73 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Name exceeds limit: 73")
	}
	if len(msg.AvatarUrl) > 2048 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Avatar url exceeds limit: 2048")
	}
	if len(msg.Website) > 2048 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Website url exceeds limit: 2048")
	}
	if len(msg.Description) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Description exceeds limit: 255")
	}
	if len(msg.Location) > 30 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Location exceeds limit: 30")
	}
	if msg.Website != "" {
		url, err := url.ParseRequestURI(msg.Website)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid url (%s)", msg.Website)
		}
		if url.Scheme != "https" && url.Scheme != "http" {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "only https and http URL scheme is allowed in Website")
		}
	}
	if msg.AvatarUrl != "" {
		url, err := url.ParseRequestURI(msg.AvatarUrl)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid url (%s)", msg.AvatarUrl)
		}
		if url.Scheme != "https" {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "only https URL scheme is allowed in Avatar URL")
		}
	}
	return nil
}

var _ sdk.Msg = &MsgDeleteOrganization{}

func NewMsgDeleteOrganization(creator string, id string) *MsgDeleteOrganization {
	return &MsgDeleteOrganization{
		Id:      id,
		Creator: creator,
	}
}
func (msg *MsgDeleteOrganization) Route() string {
	return RouterKey
}

func (msg *MsgDeleteOrganization) Type() string {
	return "DeleteOrganization"
}

func (msg *MsgDeleteOrganization) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgDeleteOrganization) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgDeleteOrganization) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Id)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid organization address (%s)", err)
	}
	_, err = sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
