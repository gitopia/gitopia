package types

import (
	"bytes"
	"regexp"
	"unicode"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/v2/x/gitopia/utils/revision"
)

type Owner struct {
	Type string
	ID   string
}

func IsTitleChar(c rune) bool {
	return unicode.IsLetter(c) || unicode.IsDigit(c) || c == '.' || c == '_' || c == '-'
}

func IsNameSanitized(msg string) bool {
	for _, c := range msg {
		if !IsTitleChar(c) {
			return false
		}
	}
	return true
}

func IsValidRefname(refName string) (isValid bool, err error) {
	parser := revision.NewParser(bytes.NewBufferString(refName))
	_, err = parser.Parse()
	if err != nil {
		return false, err
	}
	return true, nil
}

var _ sdk.Msg = &MsgCreateRepository{}

func NewMsgCreateRepository(creator string, name string, owner string, description string) *MsgCreateRepository {
	return &MsgCreateRepository{
		Creator:     creator,
		Name:        name,
		Owner:       owner,
		Description: description,
	}
}

func (msg *MsgCreateRepository) Route() string {
	return RouterKey
}

func (msg *MsgCreateRepository) Type() string {
	return "CreateRepository"
}

func (msg *MsgCreateRepository) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreateRepository) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateRepository) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if err := ValidateRepositoryName(msg.Name); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	_, err = sdk.AccAddressFromBech32(msg.Owner)
	if err != nil {
		if len(msg.Owner) < 3 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "owner id must consist minimum 3 chars")
		} else if len(msg.Owner) > 39 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "owner id limit exceed: 39")
		}
		valid, err := regexp.MatchString("^[a-zA-Z0-9]+(?:[-]?[a-zA-Z0-9])*$", msg.Owner)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
		}
		if !valid {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid owner id (%v)", msg.Owner)
		}
	}

	if err := ValidateRepositoryDescription(msg.Description); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	return nil
}

var _ sdk.Msg = &MsgInvokeForkRepository{}

func NewMsgInvokeForkRepository(creator string, repositoryId RepositoryId, forkRepositoryName string, forkRepositoryDescription string, branch string, owner string, provider string) *MsgInvokeForkRepository {
	return &MsgInvokeForkRepository{
		Creator:                   creator,
		RepositoryId:              repositoryId,
		ForkRepositoryName:        forkRepositoryName,
		ForkRepositoryDescription: forkRepositoryDescription,
		Branch:                    branch,
		Owner:                     owner,
		Provider:                  provider,
	}
}

func (msg *MsgInvokeForkRepository) Route() string {
	return RouterKey
}

func (msg *MsgInvokeForkRepository) Type() string {
	return "InvokeForkRepository"
}

func (msg *MsgInvokeForkRepository) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgInvokeForkRepository) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgInvokeForkRepository) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if err = ValidateRepositoryId(msg.RepositoryId); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	if err := ValidateRepositoryName(msg.ForkRepositoryName); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	if err := ValidateRepositoryDescription(msg.ForkRepositoryDescription); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	if err := ValidateOptionalBranchName(msg.Branch); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	_, err = sdk.AccAddressFromBech32(msg.Owner)
	if err != nil {
		if len(msg.Owner) < 3 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "owner id must consist minimum 3 chars")
		} else if len(msg.Owner) > 39 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "owner id limit exceed: 39")
		}
		valid, err := regexp.MatchString("^[a-zA-Z0-9]+(?:[-]?[a-zA-Z0-9])*$", msg.Owner)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
		}
		if !valid {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid owner id (%v)", msg.Owner)
		}
	}

	_, err = sdk.AccAddressFromBech32(msg.Provider)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid provider address (%s)", err)
	}

	return nil
}

var _ sdk.Msg = &MsgForkRepository{}

func NewMsgForkRepository(creator string, repositoryId RepositoryId, forkRepositoryName string, forkRepositoryDescription string, branch string, owner string, taskId uint64) *MsgForkRepository {
	return &MsgForkRepository{
		Creator:                   creator,
		RepositoryId:              repositoryId,
		ForkRepositoryName:        forkRepositoryName,
		ForkRepositoryDescription: forkRepositoryDescription,
		Branch:                    branch,
		Owner:                     owner,
		TaskId:                    taskId,
	}
}

func (msg *MsgForkRepository) Route() string {
	return RouterKey
}

func (msg *MsgForkRepository) Type() string {
	return "ForkRepository"
}

func (msg *MsgForkRepository) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgForkRepository) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgForkRepository) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if err := ValidateRepositoryId(msg.RepositoryId); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	if err := ValidateRepositoryName(msg.ForkRepositoryName); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	if err := ValidateRepositoryDescription(msg.ForkRepositoryDescription); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	if err := ValidateOptionalBranchName(msg.Branch); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	_, err = sdk.AccAddressFromBech32(msg.Owner)
	if err != nil {
		if len(msg.Owner) < 3 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "owner id must consist minimum 3 chars")
		} else if len(msg.Owner) > 39 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "owner id limit exceed: 39")
		}
		valid, err := regexp.MatchString("^[a-zA-Z0-9]+(?:[-]?[a-zA-Z0-9])*$", msg.Owner)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
		}
		if !valid {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid owner id (%v)", msg.Owner)
		}
	}

	return nil
}

var _ sdk.Msg = &MsgForkRepositorySuccess{}

func NewMsgForkRepositorySuccess(creator string, repositoryId RepositoryId, taskId uint64) *MsgForkRepositorySuccess {
	return &MsgForkRepositorySuccess{
		Creator:      creator,
		RepositoryId: repositoryId,
		TaskId:       taskId,
	}
}

func (msg *MsgForkRepositorySuccess) Route() string {
	return RouterKey
}

func (msg *MsgForkRepositorySuccess) Type() string {
	return "ForkRepositorySuccess"
}

func (msg *MsgForkRepositorySuccess) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgForkRepositorySuccess) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgForkRepositorySuccess) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if err := ValidateRepositoryId(msg.RepositoryId); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	return nil
}

var _ sdk.Msg = &MsgChangeOwner{}

func NewMsgChangeOwner(creator string, repositoryId RepositoryId, owner string) *MsgChangeOwner {
	return &MsgChangeOwner{
		Creator:      creator,
		RepositoryId: repositoryId,
		Owner:        owner,
	}
}

func (msg *MsgChangeOwner) Route() string {
	return RouterKey
}

func (msg *MsgChangeOwner) Type() string {
	return "ChangeOwner"
}

func (msg *MsgChangeOwner) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgChangeOwner) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgChangeOwner) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if err := ValidateRepositoryId(msg.RepositoryId); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	_, err = sdk.AccAddressFromBech32(msg.Owner)
	if err != nil {
		if len(msg.Owner) < 3 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "owner id must consist minimum 3 chars")
		} else if len(msg.Owner) > 39 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "owner id limit exceed: 39")
		}
		valid, err := regexp.MatchString("^[a-zA-Z0-9]+(?:[-]?[a-zA-Z0-9])*$", msg.Owner)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
		}
		if !valid {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid owner id (%v)", msg.Owner)
		}
	}

	return nil
}

var _ sdk.Msg = &MsgUpdateRepositoryCollaborator{}

func NewMsgUpdateRepositoryCollaborator(creator string, repositoryId RepositoryId, user string, role string) *MsgUpdateRepositoryCollaborator {
	return &MsgUpdateRepositoryCollaborator{
		Creator:      creator,
		RepositoryId: repositoryId,
		User:         user,
		Role:         role,
	}
}

func (msg *MsgUpdateRepositoryCollaborator) Route() string {
	return RouterKey
}

func (msg *MsgUpdateRepositoryCollaborator) Type() string {
	return "UpdateRepositoryCollaborator"
}

func (msg *MsgUpdateRepositoryCollaborator) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateRepositoryCollaborator) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateRepositoryCollaborator) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if err = ValidateRepositoryId(msg.RepositoryId); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	_, err = sdk.AccAddressFromBech32(msg.User)
	if err != nil {
		if len(msg.User) < 3 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "id must consist minimum 3 chars")
		} else if len(msg.User) > 39 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "id limit exceed: 39")
		}
		valid, err := regexp.MatchString("^[a-zA-Z0-9]+(?:[-]?[a-zA-Z0-9])*$", msg.User)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
		}
		if !valid {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid id (%v)", msg.User)
		}
	}
	_, exists := RepositoryCollaborator_Permission_value[msg.Role]
	if !exists {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid role (%s)", msg.Role)
	}
	return nil
}

var _ sdk.Msg = &MsgRemoveRepositoryCollaborator{}

func NewMsgRemoveRepositoryCollaborator(creator string, repositoryId RepositoryId, user string) *MsgRemoveRepositoryCollaborator {
	return &MsgRemoveRepositoryCollaborator{
		RepositoryId: repositoryId,
		Creator:      creator,
		User:         user,
	}
}

func (msg *MsgRemoveRepositoryCollaborator) Route() string {
	return RouterKey
}

func (msg *MsgRemoveRepositoryCollaborator) Type() string {
	return "RemoveRepositoryCollaborator"
}

func (msg *MsgRemoveRepositoryCollaborator) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgRemoveRepositoryCollaborator) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgRemoveRepositoryCollaborator) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if err := ValidateRepositoryId(msg.RepositoryId); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	_, err = sdk.AccAddressFromBech32(msg.User)
	if err != nil {
		if len(msg.User) < 3 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "id must consist minimum 3 chars")
		} else if len(msg.User) > 39 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "id limit exceed: 39")
		}
		valid, err := regexp.MatchString("^[a-zA-Z0-9]+(?:[-]?[a-zA-Z0-9])*$", msg.User)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
		}
		if !valid {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid id (%v)", msg.User)
		}
	}
	return nil
}

var _ sdk.Msg = &MsgCreateRepositoryLabel{}

func NewMsgCreateRepositoryLabel(creator string, repositoryId RepositoryId, name string, color string, description string) *MsgCreateRepositoryLabel {
	return &MsgCreateRepositoryLabel{
		Creator:      creator,
		RepositoryId: repositoryId,
		Name:         name,
		Color:        color,
		Description:  description,
	}
}

func (msg *MsgCreateRepositoryLabel) Route() string {
	return RouterKey
}

func (msg *MsgCreateRepositoryLabel) Type() string {
	return "CreateRepositoryLabel"
}

func (msg *MsgCreateRepositoryLabel) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreateRepositoryLabel) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateRepositoryLabel) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if err := ValidateRepositoryId(msg.RepositoryId); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	if len(msg.Name) > 63 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "label length exceeds limit: 63")
	} else if len(msg.Name) < 3 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "label too short")
	}
	if len(msg.Color) > 10 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "color length exceeds limit: 10")
	} else if len(msg.Color) < 1 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "color length too short")
	}
	if len(msg.Description) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "description length exceeds limit: 255")
	}
	return nil
}

var _ sdk.Msg = &MsgUpdateRepositoryLabel{}

func NewMsgUpdateRepositoryLabel(creator string, repositoryId RepositoryId, labelId uint64, name string, color string, description string) *MsgUpdateRepositoryLabel {
	return &MsgUpdateRepositoryLabel{
		Creator:      creator,
		RepositoryId: repositoryId,
		LabelId:      labelId,
		Name:         name,
		Color:        color,
		Description:  description,
	}
}

func (msg *MsgUpdateRepositoryLabel) Route() string {
	return RouterKey
}

func (msg *MsgUpdateRepositoryLabel) Type() string {
	return "UpdateRepositoryLabel"
}

func (msg *MsgUpdateRepositoryLabel) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateRepositoryLabel) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateRepositoryLabel) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if err := ValidateRepositoryId(msg.RepositoryId); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	if msg.LabelId < 0 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "labelId can't be negative")
	}
	if len(msg.Name) > 63 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "label length exceeds limit: 63")
	} else if len(msg.Name) < 3 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "label too short")
	}
	if len(msg.Color) > 10 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "color length exceeds limit: 10")
	} else if len(msg.Color) < 1 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "color length too short")
	}
	if len(msg.Description) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "description length exceeds limit: 255")
	}
	return nil
}

var _ sdk.Msg = &MsgDeleteRepositoryLabel{}

func NewMsgDeleteRepositoryLabel(creator string, repositoryId RepositoryId, labelId uint64) *MsgDeleteRepositoryLabel {
	return &MsgDeleteRepositoryLabel{
		RepositoryId: repositoryId,
		Creator:      creator,
		LabelId:      labelId,
	}
}

func (msg *MsgDeleteRepositoryLabel) Route() string {
	return RouterKey
}

func (msg *MsgDeleteRepositoryLabel) Type() string {
	return "DeleteRepositoryLabel"
}

func (msg *MsgDeleteRepositoryLabel) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgDeleteRepositoryLabel) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgDeleteRepositoryLabel) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if err := ValidateRepositoryId(msg.RepositoryId); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	if msg.LabelId < 0 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid label id (%v)", msg.LabelId)
	}
	return nil
}

var _ sdk.Msg = &MsgRenameRepository{}

func NewMsgRenameRepository(creator string, repositoryId RepositoryId, name string) *MsgRenameRepository {
	return &MsgRenameRepository{
		Creator:      creator,
		RepositoryId: repositoryId,
		Name:         name,
	}
}

func (msg *MsgRenameRepository) Route() string {
	return RouterKey
}

func (msg *MsgRenameRepository) Type() string {
	return "RenameRepository"
}

func (msg *MsgRenameRepository) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgRenameRepository) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgRenameRepository) ValidateBasic() error {
	if _, err := sdk.AccAddressFromBech32(msg.Creator); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if err := ValidateRepositoryId(msg.RepositoryId); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	if err := ValidateRepositoryName(msg.Name); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	return nil
}

var _ sdk.Msg = &MsgUpdateRepositoryDescription{}

func NewMsgUpdateRepositoryDescription(creator string, repositoryId RepositoryId, description string) *MsgUpdateRepositoryDescription {
	return &MsgUpdateRepositoryDescription{
		Creator:      creator,
		RepositoryId: repositoryId,
		Description:  description,
	}
}

func (msg *MsgUpdateRepositoryDescription) Route() string {
	return RouterKey
}

func (msg *MsgUpdateRepositoryDescription) Type() string {
	return "UpdateRepositoryDescription"
}

func (msg *MsgUpdateRepositoryDescription) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateRepositoryDescription) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateRepositoryDescription) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if err := ValidateRepositoryId(msg.RepositoryId); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	if len(msg.Description) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "description length exceeds limit: 255")
	}
	return nil
}

var _ sdk.Msg = &MsgUpdateRepositoryArchived{}

func NewMsgUpdateRepositoryArchived(creator string, repositoryId RepositoryId, archived bool) *MsgUpdateRepositoryArchived {
	return &MsgUpdateRepositoryArchived{
		Creator:      creator,
		RepositoryId: repositoryId,
		Archived:     archived,
	}
}

func (msg *MsgUpdateRepositoryArchived) Route() string {
	return RouterKey
}

func (msg *MsgUpdateRepositoryArchived) Type() string {
	return "UpdateArchivedState"
}

func (msg *MsgUpdateRepositoryArchived) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateRepositoryArchived) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateRepositoryArchived) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if err := ValidateRepositoryId(msg.RepositoryId); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}
	return nil
}

var _ sdk.Msg = &MsgToggleRepositoryForking{}

func NewMsgToggleRepositoryForking(creator string, repositoryId RepositoryId) *MsgToggleRepositoryForking {
	return &MsgToggleRepositoryForking{
		Creator:      creator,
		RepositoryId: repositoryId,
	}
}

func (msg *MsgToggleRepositoryForking) Route() string {
	return RouterKey
}

func (msg *MsgToggleRepositoryForking) Type() string {
	return "ToggleRepositoryForking"
}

func (msg *MsgToggleRepositoryForking) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgToggleRepositoryForking) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgToggleRepositoryForking) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if err := ValidateRepositoryId(msg.RepositoryId); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	return nil
}

var _ sdk.Msg = &MsgToggleArweaveBackup{}

func NewMsgToggleArweaveBackup(creator string, repositoryId RepositoryId) *MsgToggleArweaveBackup {
	return &MsgToggleArweaveBackup{
		Creator:      creator,
		RepositoryId: repositoryId,
	}
}

func (msg *MsgToggleArweaveBackup) Route() string {
	return RouterKey
}

func (msg *MsgToggleArweaveBackup) Type() string {
	return "ToggleArweaveBackup"
}

func (msg *MsgToggleArweaveBackup) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgToggleArweaveBackup) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgToggleArweaveBackup) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if err := ValidateRepositoryId(msg.RepositoryId); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	return nil
}

var _ sdk.Msg = &MsgDeleteRepository{}

func NewMsgDeleteRepository(creator string, repositoryId RepositoryId) *MsgDeleteRepository {
	return &MsgDeleteRepository{
		Creator:      creator,
		RepositoryId: repositoryId,
	}
}
func (msg *MsgDeleteRepository) Route() string {
	return RouterKey
}

func (msg *MsgDeleteRepository) Type() string {
	return "DeleteRepository"
}

func (msg *MsgDeleteRepository) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgDeleteRepository) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgDeleteRepository) ValidateBasic() error {
	return sdkerrors.Wrapf(sdkerrors.ErrNotSupported, "tx WIP")
}
