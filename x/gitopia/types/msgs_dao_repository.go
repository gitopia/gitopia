package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgUpdateDaoRepositoryCollaborator{}

// NewMsgUpdateDaoRepositoryCollaborator creates a new MsgUpdateDaoRepositoryCollaborator instance
func NewMsgUpdateDaoRepositoryCollaborator(admin string, repositoryId RepositoryId, user string, role string) *MsgUpdateDaoRepositoryCollaborator {
	return &MsgUpdateDaoRepositoryCollaborator{
		Admin:        admin,
		RepositoryId: repositoryId,
		User:         user,
		Role:         role,
	}
}

// Route implements the sdk.Msg interface.
func (msg *MsgUpdateDaoRepositoryCollaborator) Route() string {
	return RouterKey
}

// Type implements the sdk.Msg interface.
func (msg *MsgUpdateDaoRepositoryCollaborator) Type() string {
	return "UpdateDaoRepositoryCollaborator"
}

// GetSigners implements the sdk.Msg interface.
func (msg *MsgUpdateDaoRepositoryCollaborator) GetSigners() []sdk.AccAddress {
	admin, err := sdk.AccAddressFromBech32(msg.Admin)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{admin}
}

// GetSignBytes implements the sdk.Msg interface.
func (msg *MsgUpdateDaoRepositoryCollaborator) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

// ValidateBasic implements the sdk.Msg interface.
func (msg *MsgUpdateDaoRepositoryCollaborator) ValidateBasic() error {
	// Validate admin address
	_, err := sdk.AccAddressFromBech32(msg.Admin)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid admin address (%s)", err)
	}

	// Validate repository ID
	if err = ValidateRepositoryId(msg.RepositoryId); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	// Validate user (can be either an address or a username)
	if err := ValidateUserId(msg.User); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	// Validate role
	_, exists := RepositoryCollaborator_Permission_value[msg.Role]
	if !exists {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid role (%s)", msg.Role)
	}

	return nil
}

var _ sdk.Msg = &MsgRemoveDaoRepositoryCollaborator{}

// NewMsgRemoveDaoRepositoryCollaborator creates a new MsgRemoveDaoRepositoryCollaborator instance
func NewMsgRemoveDaoRepositoryCollaborator(admin string, repositoryId RepositoryId, user string) *MsgRemoveDaoRepositoryCollaborator {
	return &MsgRemoveDaoRepositoryCollaborator{
		Admin:        admin,
		RepositoryId: repositoryId,
		User:         user,
	}
}

// Route implements the sdk.Msg interface.
func (msg *MsgRemoveDaoRepositoryCollaborator) Route() string {
	return RouterKey
}

// Type implements the sdk.Msg interface.
func (msg *MsgRemoveDaoRepositoryCollaborator) Type() string {
	return "RemoveDaoRepositoryCollaborator"
}

// GetSigners implements the sdk.Msg interface.
func (msg *MsgRemoveDaoRepositoryCollaborator) GetSigners() []sdk.AccAddress {
	admin, err := sdk.AccAddressFromBech32(msg.Admin)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{admin}
}

// GetSignBytes implements the sdk.Msg interface.
func (msg *MsgRemoveDaoRepositoryCollaborator) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

// ValidateBasic implements the sdk.Msg interface.
func (msg *MsgRemoveDaoRepositoryCollaborator) ValidateBasic() error {
	// Validate admin address
	_, err := sdk.AccAddressFromBech32(msg.Admin)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid admin address (%s)", err)
	}

	// Validate repository ID
	if err := ValidateRepositoryId(msg.RepositoryId); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	// Validate user ID
	if err := ValidateUserId(msg.User); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	return nil
}
