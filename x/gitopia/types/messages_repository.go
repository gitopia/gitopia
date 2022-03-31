package types

import (
	"bytes"
	"regexp"
	"unicode"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/gitopia/utils/revision"
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

func NewMsgCreateRepository(creator string, name string, ownerId string, ownerType string, description string) *MsgCreateRepository {
	return &MsgCreateRepository{
		Creator:     creator,
		Name:        name,
		OwnerId:     ownerId,
		OwnerType:   ownerType,
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
	sanitized := IsNameSanitized(msg.Name)
	if !sanitized {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "repository name is not sanitized")
	}
	if len(msg.Name) < 3 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Repository name must be at least 3 characters long")
	} else if len(msg.Name) > 100 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Repository name exceeds limit: 100")
	}
	_, err = sdk.AccAddressFromBech32(msg.OwnerId)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid owner address (%s)", err)
	}
	if msg.OwnerType != RepositoryOwner_USER.String() && msg.OwnerType != RepositoryOwner_ORGANIZATION.String() {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid owner type (%v)", msg.OwnerType)
	}

	return nil
}

var _ sdk.Msg = &MsgInvokeForkRepository{}

func NewMsgInvokeForkRepository(creator string, repositoryId uint64, ownerId string, ownerType string, provider string) *MsgInvokeForkRepository {
	return &MsgInvokeForkRepository{
		Creator:      creator,
		RepositoryId: repositoryId,
		OwnerId:      ownerId,
		OwnerType:    ownerType,
		Provider:     provider,
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
	_, err = sdk.AccAddressFromBech32(msg.OwnerId)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid owner address (%s)", err)
	}
	if msg.OwnerType != RepositoryOwner_USER.String() && msg.OwnerType != RepositoryOwner_ORGANIZATION.String() {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid owner type (%v)", msg.OwnerType)
	}
	_, err = sdk.AccAddressFromBech32(msg.Provider)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid provider address (%s)", err)
	}

	return nil
}

var _ sdk.Msg = &MsgForkRepository{}

func NewMsgForkRepository(creator string, repositoryId uint64, ownerId string, ownerType string, taskId uint64) *MsgForkRepository {
	return &MsgForkRepository{
		Creator:      creator,
		RepositoryId: repositoryId,
		OwnerId:      ownerId,
		OwnerType:    ownerType,
		TaskId:       taskId,
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
	_, err = sdk.AccAddressFromBech32(msg.OwnerId)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid owner address (%s)", err)
	}
	if msg.OwnerType != RepositoryOwner_USER.String() && msg.OwnerType != RepositoryOwner_ORGANIZATION.String() {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid owner type (%v)", msg.OwnerType)
	}

	return nil
}

var _ sdk.Msg = &MsgForkRepositorySuccess{}

func NewMsgForkRepositorySuccess(creator string, repositoryId uint64, taskId uint64) *MsgForkRepositorySuccess {
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

	return nil
}

var _ sdk.Msg = &MsgChangeOwner{}

func NewMsgChangeOwner(creator string, repositoryId uint64, ownerId string, ownerType string) *MsgChangeOwner {
	return &MsgChangeOwner{
		Creator:      creator,
		RepositoryId: repositoryId,
		OwnerId:      ownerId,
		OwnerType:    ownerType,
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
	_, err = sdk.AccAddressFromBech32(msg.OwnerId)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid owner address (%s)", err)
	}
	if msg.OwnerType != RepositoryOwner_USER.String() && msg.OwnerType != RepositoryOwner_ORGANIZATION.String() {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid owner type (%v)", msg.OwnerType)
	}

	return nil
}

var _ sdk.Msg = &MsgUpdateRepositoryCollaborator{}

func NewMsgUpdateRepositoryCollaborator(creator string, id uint64, user string, role string) *MsgUpdateRepositoryCollaborator {
	return &MsgUpdateRepositoryCollaborator{
		Id:      id,
		Creator: creator,
		User:    user,
		Role:    role,
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
	_, err = sdk.AccAddressFromBech32(msg.User)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid user address (%s)", err)
	}
	_, exists := RepositoryCollaborator_Permission_value[msg.Role]
	if !exists {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid role (%s)", msg.Role)
	}
	return nil
}

var _ sdk.Msg = &MsgRemoveRepositoryCollaborator{}

func NewMsgRemoveRepositoryCollaborator(creator string, id uint64, user string) *MsgRemoveRepositoryCollaborator {
	return &MsgRemoveRepositoryCollaborator{
		Id:      id,
		Creator: creator,
		User:    user,
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
	_, err = sdk.AccAddressFromBech32(msg.User)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid user address (%s)", err)
	}
	return nil
}

var _ sdk.Msg = &MsgCreateRepositoryLabel{}

func NewMsgCreateRepositoryLabel(creator string, id uint64, name string, color string, description string) *MsgCreateRepositoryLabel {
	return &MsgCreateRepositoryLabel{
		Id:          id,
		Creator:     creator,
		Name:        name,
		Color:       color,
		Description: description,
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

func NewMsgUpdateRepositoryLabel(creator string, repositoryId uint64, labelId uint64, name string, color string, description string) *MsgUpdateRepositoryLabel {
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
	if msg.RepositoryId < 0 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "repositoryId can't be negative")
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

func NewMsgDeleteRepositoryLabel(creator string, repositoryId uint64, labelId uint64) *MsgDeleteRepositoryLabel {
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
	if msg.LabelId < 0 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid label id (%v)", msg.LabelId)
	}
	return nil
}

var _ sdk.Msg = &MsgSetRepositoryBranch{}

func NewMsgSetRepositoryBranch(creator string, id uint64, name string, commitSHA string) *MsgSetRepositoryBranch {
	return &MsgSetRepositoryBranch{
		Id:        id,
		Creator:   creator,
		Name:      name,
		CommitSHA: commitSHA,
	}
}

func (msg *MsgSetRepositoryBranch) Route() string {
	return RouterKey
}

func (msg *MsgSetRepositoryBranch) Type() string {
	return "SetRepositoryBranch"
}

func (msg *MsgSetRepositoryBranch) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgSetRepositoryBranch) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgSetRepositoryBranch) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	if len(msg.Name) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "branch length exceeds limit: 255")
	} else if len(msg.Name) < 1 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "branch name can't be empty")
	}
	if valid, err := IsValidRefname(msg.Name); !valid {
		return err
	}
	isShaValid, _ := regexp.MatchString("^([0-9a-f]{40}|[0-9a-f]{64})$", msg.CommitSHA)
	if !isShaValid {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid sha")
	}
	return nil
}

var _ sdk.Msg = &MsgMultiSetRepositoryBranch{}

func NewMsgMultiSetRepositoryBranch(creator string, id uint64, branches []*MsgMultiSetRepositoryBranch_Branch) *MsgMultiSetRepositoryBranch {
	return &MsgMultiSetRepositoryBranch{
		Id:       id,
		Creator:  creator,
		Branches: branches,
	}
}

func (msg *MsgMultiSetRepositoryBranch) Route() string {
	return RouterKey
}

func (msg *MsgMultiSetRepositoryBranch) Type() string {
	return "MultiSetRepositoryBranch"
}

func (msg *MsgMultiSetRepositoryBranch) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgMultiSetRepositoryBranch) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgMultiSetRepositoryBranch) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	for _, branch := range msg.Branches {
		if len(branch.Name) > 255 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "branch length exceeds limit: 255")
		} else if len(branch.Name) < 1 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "branch name can't be empty")
		}
		if valid, err := IsValidRefname(branch.Name); !valid {
			return err
		}
		isShaValid, _ := regexp.MatchString("^([0-9a-f]{40}|[0-9a-f]{64})$", branch.CommitSHA)
		if !isShaValid {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid sha")
		}
	}
	return nil
}

var _ sdk.Msg = &MsgRenameRepository{}

func NewMsgRenameRepository(creator string, id uint64, name string) *MsgRenameRepository {
	return &MsgRenameRepository{
		Id:      id,
		Creator: creator,
		Name:    name,
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
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	if len(msg.Name) < 3 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Repository name must be at least 3 characters long")
	} else if len(msg.Name) > 100 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Repository name exceeds limit: 100")
	}
	sanitized := IsNameSanitized(msg.Name)
	if !sanitized {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "repository name is not sanitized")
	}
	return nil
}

var _ sdk.Msg = &MsgSetDefaultBranch{}

func NewMsgSetDefaultBranch(creator string, id uint64, name string) *MsgSetDefaultBranch {
	return &MsgSetDefaultBranch{
		Id:      id,
		Creator: creator,
		Name:    name,
	}
}

func (msg *MsgSetDefaultBranch) Route() string {
	return RouterKey
}

func (msg *MsgSetDefaultBranch) Type() string {
	return "SetDefaultBranch"
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
	if len(msg.Name) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "branch length exceeds limit: 255")
	} else if len(msg.Name) < 1 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "branch name can't be empty")
	}
	if valid, err := IsValidRefname(msg.Name); !valid {
		return err
	}
	return nil
}

var _ sdk.Msg = &MsgDeleteBranch{}

func NewMsgDeleteBranch(creator string, id uint64, name string) *MsgDeleteBranch {
	return &MsgDeleteBranch{
		Id:      id,
		Creator: creator,
		Name:    name,
	}
}

func (msg *MsgDeleteBranch) Route() string {
	return RouterKey
}

func (msg *MsgDeleteBranch) Type() string {
	return "DeleteBranch"
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
	if len(msg.Name) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "branch length exceeds limit: 255")
	} else if len(msg.Name) < 1 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "branch name can't be empty")
	}
	if valid, err := IsValidRefname(msg.Name); !valid {
		return err
	}
	return nil
}

var _ sdk.Msg = &MsgMultiDeleteBranch{}

func NewMsgMultiDeleteBranch(creator string, id uint64, branches []string) *MsgMultiDeleteBranch {
	return &MsgMultiDeleteBranch{
		Id:       id,
		Creator:  creator,
		Branches: branches,
	}
}

func (msg *MsgMultiDeleteBranch) Route() string {
	return RouterKey
}

func (msg *MsgMultiDeleteBranch) Type() string {
	return "MultiDeleteBranch"
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
	for _, branch := range msg.Branches {
		if len(branch) > 255 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "branch length exceeds limit: 255")
		} else if len(branch) < 1 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "branch name can't be empty")
		}
		if valid, err := IsValidRefname(branch); !valid {
			return err
		}
	}
	return nil
}

var _ sdk.Msg = &MsgSetRepositoryTag{}

func NewMsgSetRepositoryTag(creator string, id uint64, name string, sha string) *MsgSetRepositoryTag {
	return &MsgSetRepositoryTag{
		Id:      id,
		Creator: creator,
		Name:    name,
		Sha:     sha,
	}
}

func (msg *MsgSetRepositoryTag) Route() string {
	return RouterKey
}

func (msg *MsgSetRepositoryTag) Type() string {
	return "SetRepositoryTag"
}

func (msg *MsgSetRepositoryTag) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgSetRepositoryTag) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgSetRepositoryTag) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	if len(msg.Name) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "tag length exceeds limit: 255")
	} else if len(msg.Name) < 1 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "tag name can't be empty")
	}
	if valid, err := IsValidRefname(msg.Name); !valid {
		return err
	}
	isShaValid, _ := regexp.MatchString("^([0-9a-f]{40}|[0-9a-f]{64})$", msg.Sha)
	if !isShaValid {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid sha")
	}
	return nil
}

var _ sdk.Msg = &MsgMultiSetRepositoryTag{}

func NewMsgMultiSetRepositoryTag(creator string, id uint64, tags []*MsgMultiSetRepositoryTag_Tag) *MsgMultiSetRepositoryTag {
	return &MsgMultiSetRepositoryTag{
		Id:      id,
		Creator: creator,
		Tags:    tags,
	}
}

func (msg *MsgMultiSetRepositoryTag) Route() string {
	return RouterKey
}

func (msg *MsgMultiSetRepositoryTag) Type() string {
	return "MultiSetRepositoryTag"
}

func (msg *MsgMultiSetRepositoryTag) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgMultiSetRepositoryTag) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgMultiSetRepositoryTag) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	for _, tag := range msg.Tags {
		if len(tag.Name) > 255 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "tag length exceeds limit: 255")
		} else if len(tag.Name) < 1 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "tag name can't be empty")
		}
		if valid, err := IsValidRefname(tag.Name); !valid {
			return err
		}
		isShaValid, _ := regexp.MatchString("^([0-9a-f]{40}|[0-9a-f]{64})$", tag.CommitSHA)
		if !isShaValid {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid sha")
		}
	}
	return nil
}

var _ sdk.Msg = &MsgDeleteTag{}

func NewMsgDeleteTag(creator string, id uint64, name string) *MsgDeleteTag {
	return &MsgDeleteTag{
		Id:      id,
		Creator: creator,
		Name:    name,
	}
}

func (msg *MsgDeleteTag) Route() string {
	return RouterKey
}

func (msg *MsgDeleteTag) Type() string {
	return "DeleteTag"
}

func (msg *MsgDeleteTag) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgDeleteTag) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgDeleteTag) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	if len(msg.Name) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "tag length exceeds limit: 255")
	} else if len(msg.Name) < 1 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "tag name can't be empty")
	}
	if valid, err := IsValidRefname(msg.Name); !valid {
		return err
	}
	return nil
}

var _ sdk.Msg = &MsgMultiDeleteTag{}

func NewMsgMultiDeleteTag(creator string, id uint64, tags []string) *MsgMultiDeleteTag {
	return &MsgMultiDeleteTag{
		Id:      id,
		Creator: creator,
		Tags:    tags,
	}
}

func (msg *MsgMultiDeleteTag) Route() string {
	return RouterKey
}

func (msg *MsgMultiDeleteTag) Type() string {
	return "MultiDeleteTag"
}

func (msg *MsgMultiDeleteTag) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgMultiDeleteTag) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgMultiDeleteTag) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	for _, tag := range msg.Tags {
		if len(tag) > 255 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "tag length exceeds limit: 255")
		} else if len(tag) < 1 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "tag name can't be empty")
		}
		if valid, err := IsValidRefname(tag); !valid {
			return err
		}
	}
	return nil
}

var _ sdk.Msg = &MsgToggleRepositoryForking{}

func NewMsgToggleRepositoryForking(creator string, id uint64) *MsgToggleRepositoryForking {
	return &MsgToggleRepositoryForking{
		Id:      id,
		Creator: creator,
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
	return nil
}

var _ sdk.Msg = &MsgDeleteRepository{}

func NewMsgDeleteRepository(creator string, id uint64) *MsgDeleteRepository {
	return &MsgDeleteRepository{
		Id:      id,
		Creator: creator,
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
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
