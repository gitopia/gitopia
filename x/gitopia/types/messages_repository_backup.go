package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const (
	TypeMsgAddArweaveBackupRef = "add_arweave_backup_ref"
	TypeMsgUpdateIpfsBackupRef = "update_ipfs_backup_ref"
)

var _ sdk.Msg = &MsgAddArweaveBackupRef{}

func NewMsgAddArweaveBackupRef(creator string, repositoryId RepositoryId, ref string) *MsgAddArweaveBackupRef {
	return &MsgAddArweaveBackupRef{
		Creator:      creator,
		RepositoryId: repositoryId,
		Ref:          ref,
	}
}

func (msg *MsgAddArweaveBackupRef) Route() string {
	return RouterKey
}

func (msg *MsgAddArweaveBackupRef) Type() string {
	return TypeMsgAddArweaveBackupRef
}

func (msg *MsgAddArweaveBackupRef) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgAddArweaveBackupRef) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgAddArweaveBackupRef) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	err = ValidateRepositoryId(msg.RepositoryId)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "%v (%v)", err, msg.RepositoryId.Id)
	}

	if err := ValidateArweaveTxId(msg.Ref); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	return nil
}

var _ sdk.Msg = &MsgUpdateIpfsBackupRef{}

func NewMsgUpdateIpfsBackupRef(creator string, repositoryId RepositoryId, ref string) *MsgUpdateIpfsBackupRef {
	return &MsgUpdateIpfsBackupRef{
		Creator:      creator,
		RepositoryId: repositoryId,
		Ref:          ref,
	}
}

func (msg *MsgUpdateIpfsBackupRef) Route() string {
	return RouterKey
}

func (msg *MsgUpdateIpfsBackupRef) Type() string {
	return TypeMsgUpdateIpfsBackupRef
}

func (msg *MsgUpdateIpfsBackupRef) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateIpfsBackupRef) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateIpfsBackupRef) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	err = ValidateRepositoryId(msg.RepositoryId)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "%v (%v)", err, msg.RepositoryId.Id)
	}

	if err := ValidateIpfsCid(msg.Ref); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	return nil
}
