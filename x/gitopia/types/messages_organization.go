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

var _ sdk.Msg = &MsgUpdateOrganizationDescription{}

func NewMsgUpdateOrganizationDescription(creator string, id string, description string) *MsgUpdateOrganizationDescription {
	return &MsgUpdateOrganizationDescription{
		Id:          id,
		Creator:     creator,
		Description: description,
	}
}

func (msg *MsgUpdateOrganizationDescription) Route() string {
	return RouterKey
}

func (msg *MsgUpdateOrganizationDescription) Type() string {
	return "UpdateOrganizationDescription"
}

func (msg *MsgUpdateOrganizationDescription) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateOrganizationDescription) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateOrganizationDescription) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	_, err = sdk.AccAddressFromBech32(msg.Id)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid organization address (%s)", err)
	}
	if len(msg.Description) < 3 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Minimum character required: 3")
	}
	if len(msg.Description) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Description exceeds limit: 255")
	}
	return nil
}

var _ sdk.Msg = &MsgUpdateOrganizationWebsite{}

func NewMsgUpdateOrganizationWebsite(creator string, id string, url string) *MsgUpdateOrganizationWebsite {
	return &MsgUpdateOrganizationWebsite{
		Id:      id,
		Creator: creator,
		Url:     url,
	}
}

func (msg *MsgUpdateOrganizationWebsite) Route() string {
	return RouterKey
}

func (msg *MsgUpdateOrganizationWebsite) Type() string {
	return "UpdateOrganizationWebsite"
}

func (msg *MsgUpdateOrganizationWebsite) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateOrganizationWebsite) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateOrganizationWebsite) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	_, err = sdk.AccAddressFromBech32(msg.Id)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid organization address (%s)", err)
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

var _ sdk.Msg = &MsgUpdateOrganizationLocation{}

func NewMsgUpdateOrganizationLocation(creator string, id string, location string) *MsgUpdateOrganizationLocation {
	return &MsgUpdateOrganizationLocation{
		Id:       id,
		Creator:  creator,
		Location: location,
	}
}

func (msg *MsgUpdateOrganizationLocation) Route() string {
	return RouterKey
}

func (msg *MsgUpdateOrganizationLocation) Type() string {
	return "UpdateOrganizationLocation"
}

func (msg *MsgUpdateOrganizationLocation) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateOrganizationLocation) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateOrganizationLocation) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	_, err = sdk.AccAddressFromBech32(msg.Id)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid organization address (%s)", err)
	}
	if len(msg.Location) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Location exceeds limit: 255")
	}
	return nil
}

var _ sdk.Msg = &MsgUpdateOrganizationAvatar{}

func NewMsgUpdateOrganizationAvatar(creator string, id string, url string) *MsgUpdateOrganizationAvatar {
	return &MsgUpdateOrganizationAvatar{
		Id:      id,
		Creator: creator,
		Url:     url,
	}
}

func (msg *MsgUpdateOrganizationAvatar) Route() string {
	return RouterKey
}

func (msg *MsgUpdateOrganizationAvatar) Type() string {
	return "UpdateOrganizationAvatar"
}

func (msg *MsgUpdateOrganizationAvatar) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateOrganizationAvatar) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateOrganizationAvatar) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	_, err = sdk.AccAddressFromBech32(msg.Id)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid organization address (%s)", err)
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
