package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const (
	TypeMsgCreateStorageProvider            = "create_storage_provider"
	TypeMsgUpdateStorageProvider            = "update_storage_provider"
	TypeMsgDeleteStorageProvider            = "delete_storage_provider"
	TypeMsgAuthorizeStorageProvider         = "authorize_storage_provider"
	TypeMsgRevokeStorageProviderPermissions = "revoke_storage_provider_permissions"
)

var _ sdk.Msg = &MsgCreateStorageProvider{}

func NewMsgCreateStorageProvider(creator string, store Store) *MsgCreateStorageProvider {
	return &MsgCreateStorageProvider{
		Creator: creator,
		Store:   store,
	}
}

func (msg *MsgCreateStorageProvider) Route() string {
	return RouterKey
}

func (msg *MsgCreateStorageProvider) Type() string {
	return TypeMsgCreateStorageProvider
}

func (msg *MsgCreateStorageProvider) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreateStorageProvider) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateStorageProvider) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if msg.Store == Store_NONE {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid store (%d)", msg.Store)
	}
	return nil
}

var _ sdk.Msg = &MsgUpdateStorageProvider{}

func NewMsgUpdateStorageProvider(creator string, id uint64, store Store) *MsgUpdateStorageProvider {
	return &MsgUpdateStorageProvider{
		Id:      id,
		Creator: creator,
		Store:   store,
	}
}

func (msg *MsgUpdateStorageProvider) Route() string {
	return RouterKey
}

func (msg *MsgUpdateStorageProvider) Type() string {
	return TypeMsgUpdateStorageProvider
}

func (msg *MsgUpdateStorageProvider) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateStorageProvider) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateStorageProvider) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if msg.Store == Store_NONE {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid store (%d)", msg.Store)
	}

	return nil
}

var _ sdk.Msg = &MsgDeleteStorageProvider{}

func NewMsgDeleteStorageProvider(creator string, id uint64) *MsgDeleteStorageProvider {
	return &MsgDeleteStorageProvider{
		Id:      id,
		Creator: creator,
	}
}
func (msg *MsgDeleteStorageProvider) Route() string {
	return RouterKey
}

func (msg *MsgDeleteStorageProvider) Type() string {
	return TypeMsgDeleteStorageProvider
}

func (msg *MsgDeleteStorageProvider) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgDeleteStorageProvider) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgDeleteStorageProvider) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

var _ sdk.Msg = &MsgAuthorizeStorageProvider{}

func NewMsgAuthorizeStorageProvider(creator string, provider string) *MsgAuthorizeStorageProvider {
	return &MsgAuthorizeStorageProvider{
		Creator:  creator,
		Provider: provider,
	}
}
func (msg *MsgAuthorizeStorageProvider) Route() string {
	return RouterKey
}

func (msg *MsgAuthorizeStorageProvider) Type() string {
	return TypeMsgAuthorizeStorageProvider
}

func (msg *MsgAuthorizeStorageProvider) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgAuthorizeStorageProvider) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgAuthorizeStorageProvider) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	_, err = sdk.AccAddressFromBech32(msg.Provider)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid provider address (%s)", err)
	}
	return nil
}

var _ sdk.Msg = &MsgRevokeStorageProviderPermissions{}

func NewMsgRevokeStorageProviderPermissions(creator string, provider string) *MsgRevokeStorageProviderPermissions {
	return &MsgRevokeStorageProviderPermissions{
		Creator:  creator,
		Provider: provider,
	}
}
func (msg *MsgRevokeStorageProviderPermissions) Route() string {
	return RouterKey
}

func (msg *MsgRevokeStorageProviderPermissions) Type() string {
	return TypeMsgRevokeStorageProviderPermissions
}

func (msg *MsgRevokeStorageProviderPermissions) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgRevokeStorageProviderPermissions) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgRevokeStorageProviderPermissions) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	_, err = sdk.AccAddressFromBech32(msg.Provider)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid provider address (%s)", err)
	}
	return nil
}
