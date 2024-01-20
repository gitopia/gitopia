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

func NewMsgAddRepositoryBackupRef(creator string, repositoryId RepositoryId, store RepositoryBackup_Store, ref string, name string) *MsgAddRepositoryBackupRef {
	return &MsgAddRepositoryBackupRef{
		Creator:      creator,
		RepositoryId: repositoryId,
		Store:        store,
		Ref:          ref,
		Name:         name,
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

	if err := ValidateRepositoryId(msg.RepositoryId); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	switch msg.Store {
	case RepositoryBackup_ARWEAVE:
		if err := ValidateArweaveTxId(msg.Ref); err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
		}
	case RepositoryBackup_IPFS:
		if err := ValidateIpfsCid(msg.Ref); err != nil {
			return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, err.Error())
		}
	default:
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid store type")
	}

	// TODO
	// validate packfile name

	return nil
}

var _ sdk.Msg = &MsgUpdateRepositoryBackupRef{}

func NewMsgUpdateRepositoryBackupRef(creator string, repositoryId RepositoryId, store RepositoryBackup_Store, ref string) *MsgUpdateRepositoryBackupRef {
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

	if err := ValidateRepositoryId(msg.RepositoryId); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	switch msg.Store {
	case RepositoryBackup_ARWEAVE:
		if err := ValidateArweaveTxId(msg.Ref); err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
		}
	case RepositoryBackup_IPFS:
		if err := ValidateIpfsCid(msg.Ref); err != nil {
			return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, err.Error())
		}
	default:
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid store type")
	}

	return nil
}
