package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const (
	TypeMsgAuthorizeProvider        = "authorize_provider"
	TypeMsgRevokeProviderPermission = "revoke_provider_permission"
)

var _ sdk.Msg = &MsgAuthorizeProvider{}

func NewMsgAuthorizeProvider(creator string, granter string, provider string, permission ProviderPermission) *MsgAuthorizeProvider {
	return &MsgAuthorizeProvider{
		Creator:    creator,
		Granter:    granter,
		Provider:   provider,
		Permission: permission,
	}
}
func (msg *MsgAuthorizeProvider) Route() string {
	return RouterKey
}

func (msg *MsgAuthorizeProvider) Type() string {
	return TypeMsgAuthorizeProvider
}

func (msg *MsgAuthorizeProvider) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgAuthorizeProvider) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgAuthorizeProvider) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	_, err = sdk.AccAddressFromBech32(msg.Granter)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid granter address (%s)", err)
	}

	_, err = sdk.AccAddressFromBech32(msg.Provider)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid provider address (%s)", err)
	}

	_, exists := ProviderPermission_value[msg.Permission.String()]
	if !exists {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid permission (%v)", msg.Permission)
	}

	return nil
}

var _ sdk.Msg = &MsgRevokeProviderPermission{}

func NewMsgRevokeProviderPermission(creator string, granter string, provider string, permission ProviderPermission) *MsgRevokeProviderPermission {
	return &MsgRevokeProviderPermission{
		Creator:    creator,
		Granter:    granter,
		Provider:   provider,
		Permission: permission,
	}
}
func (msg *MsgRevokeProviderPermission) Route() string {
	return RouterKey
}

func (msg *MsgRevokeProviderPermission) Type() string {
	return TypeMsgRevokeProviderPermission
}

func (msg *MsgRevokeProviderPermission) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgRevokeProviderPermission) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgRevokeProviderPermission) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	_, err = sdk.AccAddressFromBech32(msg.Granter)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid granter address (%s)", err)
	}

	_, err = sdk.AccAddressFromBech32(msg.Provider)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid provider address (%s)", err)
	}

	_, exists := ProviderPermission_value[msg.Permission.String()]
	if !exists {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid permission (%v)", msg.Permission)
	}

	return nil
}
