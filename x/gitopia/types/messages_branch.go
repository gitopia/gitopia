package types

import (
	"regexp"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const (
	TypeMsgSetBranch         = "set_branch"
	TypeMsgMultiSetBranch    = "multi_set_branch"
	TypeMsgSetDefaultBranch  = "set_default_branch"
	TypeMsgDeleteBranch      = "delete_branch"
	TypeMsgMultiDeleteBranch = "multi_delete_branch"
)

var _ sdk.Msg = &MsgSetBranch{}

func NewMsgSetBranch(creator string, repositoryId RepositoryId, branch MsgSetBranch_Branch, packfileCid string) *MsgSetBranch {
	return &MsgSetBranch{
		Creator:      creator,
		RepositoryId: repositoryId,
		Branch:       branch,
		PackfileCid:  packfileCid,
	}
}

func (msg *MsgSetBranch) Route() string {
	return RouterKey
}

func (msg *MsgSetBranch) Type() string {
	return TypeMsgSetBranch
}

func (msg *MsgSetBranch) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgSetBranch) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgSetBranch) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if err := ValidateRepositoryId(msg.RepositoryId); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	if err := ValidateBranchName(msg.Branch.Name); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	isShaValid, _ := regexp.MatchString("^([0-9a-f]{40}|[0-9a-f]{64})$", msg.Branch.Sha)
	if !isShaValid {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid sha")
	}

	return nil
}

var _ sdk.Msg = &MsgSetDefaultBranch{}

func NewMsgSetDefaultBranch(creator string, repositoryId RepositoryId, branch string) *MsgSetDefaultBranch {
	return &MsgSetDefaultBranch{
		Creator:      creator,
		RepositoryId: repositoryId,
		Branch:       branch,
	}
}

func (msg *MsgSetDefaultBranch) Route() string {
	return RouterKey
}

func (msg *MsgSetDefaultBranch) Type() string {
	return TypeMsgSetDefaultBranch
}

func (msg *MsgSetDefaultBranch) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgSetDefaultBranch) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgSetDefaultBranch) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if err := ValidateRepositoryId(msg.RepositoryId); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	if err := ValidateBranchName(msg.Branch); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	return nil
}

var _ sdk.Msg = &MsgMultiSetBranch{}

func NewMsgMultiSetBranch(creator string, repositoryId RepositoryId, branches []MsgMultiSetBranch_Branch, packfileCid string) *MsgMultiSetBranch {
	return &MsgMultiSetBranch{
		Creator:      creator,
		RepositoryId: repositoryId,
		Branches:     branches,
		PackfileCid:  packfileCid,
	}
}

func (msg *MsgMultiSetBranch) Route() string {
	return RouterKey
}

func (msg *MsgMultiSetBranch) Type() string {
	return TypeMsgMultiSetBranch
}

func (msg *MsgMultiSetBranch) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgMultiSetBranch) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgMultiSetBranch) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if err := ValidateRepositoryId(msg.RepositoryId); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	if len(msg.Branches) == 0 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "atleast one branch should be set")
	}

	for _, branch := range msg.Branches {
		if err := ValidateBranchName(branch.Name); err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
		}
		isShaValid, _ := regexp.MatchString("^([0-9a-f]{40}|[0-9a-f]{64})$", branch.Sha)
		if !isShaValid {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid sha")
		}
	}
	return nil
}

var _ sdk.Msg = &MsgDeleteBranch{}

func NewMsgDeleteBranch(creator string, repositoryId RepositoryId, branch string) *MsgDeleteBranch {
	return &MsgDeleteBranch{
		Creator:      creator,
		RepositoryId: repositoryId,
		Branch:       branch,
	}
}

func (msg *MsgDeleteBranch) Route() string {
	return RouterKey
}

func (msg *MsgDeleteBranch) Type() string {
	return TypeMsgDeleteBranch
}

func (msg *MsgDeleteBranch) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgDeleteBranch) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgDeleteBranch) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if err := ValidateRepositoryId(msg.RepositoryId); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	if err := ValidateBranchName(msg.Branch); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	return nil
}

var _ sdk.Msg = &MsgMultiDeleteBranch{}

func NewMsgMultiDeleteBranch(creator string, repositoryId RepositoryId, branches []string) *MsgMultiDeleteBranch {
	return &MsgMultiDeleteBranch{
		Creator:      creator,
		RepositoryId: repositoryId,
		Branches:     branches,
	}
}

func (msg *MsgMultiDeleteBranch) Route() string {
	return RouterKey
}

func (msg *MsgMultiDeleteBranch) Type() string {
	return TypeMsgMultiDeleteBranch
}

func (msg *MsgMultiDeleteBranch) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgMultiDeleteBranch) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgMultiDeleteBranch) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if err := ValidateRepositoryId(msg.RepositoryId); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	if len(msg.Branches) == 0 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "atleast one branch should be set")
	}

	for _, branch := range msg.Branches {
		if err := ValidateBranchName(branch); err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
		}
	}
	return nil
}

const TypeMsgToggleForcePush = "toggle_force_push"

var _ sdk.Msg = &MsgToggleForcePush{}

func NewMsgToggleForcePush(creator string, repositoryId RepositoryId, branchName string) *MsgToggleForcePush {
	return &MsgToggleForcePush{
		Creator:      creator,
		RepositoryId: repositoryId,
		BranchName:   branchName,
	}
}

func (msg *MsgToggleForcePush) Route() string {
	return RouterKey
}

func (msg *MsgToggleForcePush) Type() string {
	return TypeMsgToggleForcePush
}

func (msg *MsgToggleForcePush) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgToggleForcePush) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgToggleForcePush) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	err = ValidateRepositoryId(msg.RepositoryId)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "%v (%v)", err, msg.RepositoryId.Id)
	}

	err = ValidateBranchName(msg.BranchName)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "%v (%v)", err, msg.BranchName)
	}

	return nil
}
