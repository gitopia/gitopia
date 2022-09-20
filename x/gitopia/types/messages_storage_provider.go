package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const (
	TypeMsgAuthorizeStorageProvider         = "authorize_storage_provider"
	TypeMsgRevokeStorageProviderPermissions = "revoke_storage_provider_permissions"
)

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
