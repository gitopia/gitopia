package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgUpdateDaoMetadata{}

// NewMsgUpdateDaoMetadata creates a new MsgUpdateDaoMetadata instance
func NewMsgUpdateDaoMetadata(admin string, id string, name string, description string, avatarUrl string, location string, website string) *MsgUpdateDaoMetadata {
	return &MsgUpdateDaoMetadata{
		Admin:       admin,
		Id:          id,
		Name:        name,
		Description: description,
		AvatarUrl:   avatarUrl,
		Location:    location,
		Website:     website,
	}
}

// Route implements the sdk.Msg interface.
func (msg *MsgUpdateDaoMetadata) Route() string {
	return RouterKey
}

// Type implements the sdk.Msg interface.
func (msg *MsgUpdateDaoMetadata) Type() string {
	return "UpdateDaoMetadata"
}

// GetSigners implements the sdk.Msg interface.
func (msg *MsgUpdateDaoMetadata) GetSigners() []sdk.AccAddress {
	admin, err := sdk.AccAddressFromBech32(msg.Admin)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{admin}
}

// GetSignBytes implements the sdk.Msg interface.
func (msg *MsgUpdateDaoMetadata) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

// ValidateBasic implements the sdk.Msg interface.
func (msg *MsgUpdateDaoMetadata) ValidateBasic() error {
	// Validate admin address
	_, err := sdk.AccAddressFromBech32(msg.Admin)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid admin address (%s)", err)
	}

	if err := ValidateDaoId(msg.Id); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	if msg.Name != "" {
		if err := ValidateDaoName(msg.Name); err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
		}
	}

	if len(msg.Description) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Description exceeds limit: 255")
	}

	if msg.AvatarUrl != "" {
		if err := ValidateUrl(msg.AvatarUrl); err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
		}
	}

	if len(msg.Location) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "location exceeds limit: 255")
	}

	if msg.Website != "" {
		if err := ValidateUrl(msg.Website); err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
		}
	}

	return nil
}
