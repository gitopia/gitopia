package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgAddRepositoryBackupRef = "add_repository_backup_ref"

var _ sdk.Msg = &MsgAddRepositoryBackupRef{}

func NewMsgAddRepositoryBackupRef(creator string, repositoryId RepositoryId, store Store, ref string) *MsgAddRepositoryBackupRef {
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

	if msg.Store == Store_NONE {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid store (%d)", msg.Store)
	}

	return nil
}
