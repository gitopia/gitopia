package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const (
	TypeMsgAddRepositoryBackupRef    = "add_repository_backup_ref"
	TypeMsgUpdateRepositoryBackupRef = "update_repository_backup_ref"
)

var _ sdk.Msg = &MsgAddRepositoryBackupRef{}

func NewMsgAddRepositoryBackupRef(creator string, repositoryId RepositoryId, store StorageProvider_Store, ref string) *MsgAddRepositoryBackupRef {
	return &MsgAddRepositoryBackupRef{
		Creator:      creator,
		RepositoryId: repositoryId,
		Store:        store,
		Ref:          ref,
	}
}

func (msg *MsgAddRepositoryBackupRef) Route() string {
	return RouterKey
}

func (msg *MsgAddRepositoryBackupRef) Type() string {
	return TypeMsgAddRepositoryBackupRef
}

func (msg *MsgAddRepositoryBackupRef) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgAddRepositoryBackupRef) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgAddRepositoryBackupRef) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	err = ValidateRepositoryId(msg.RepositoryId)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "%v (%v)", err, msg.RepositoryId.Id)
	}

	if msg.Store == StorageProvider_NONE {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid store (%d)", msg.Store)
	}

	return nil
}

var _ sdk.Msg = &MsgUpdateRepositoryBackupRef{}

func NewMsgUpdateRepositoryBackupRef(creator string, repositoryId RepositoryId, store StorageProvider_Store, ref string) *MsgUpdateRepositoryBackupRef {
	return &MsgUpdateRepositoryBackupRef{
		Creator:      creator,
		RepositoryId: repositoryId,
		Store:        store,
		Ref:          ref,
	}
}

func (msg *MsgUpdateRepositoryBackupRef) Route() string {
	return RouterKey
}

func (msg *MsgUpdateRepositoryBackupRef) Type() string {
	return TypeMsgUpdateRepositoryBackupRef
}

func (msg *MsgUpdateRepositoryBackupRef) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateRepositoryBackupRef) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateRepositoryBackupRef) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	err = ValidateRepositoryId(msg.RepositoryId)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "%v (%v)", err, msg.RepositoryId.Id)
	}

	if msg.Store == StorageProvider_NONE {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid store (%d)", msg.Store)
	}
	return nil
}
