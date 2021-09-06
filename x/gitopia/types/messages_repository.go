package types

import (
	"strconv"
	"unicode"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

type Owner struct {
	Type string
	ID   string
}

func IsTitleChar(c rune) bool {
	return unicode.IsLetter(c) || unicode.IsDigit(c) || c == '.' || c == '_' || c == '-'
}

func IsRepositoryNameSanitized(msg string) bool {
	for _, c := range msg {
		if !IsTitleChar(c) {
			return false
		}
	}
	return true
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
	sanitized := IsRepositoryNameSanitized(msg.Name)
	if !sanitized {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "repository name is not sanitized")
	}
	if len(msg.Name) < 3 {
		return sdkerrors.Wrapf(sdkerrors.ErrUnknownRequest, "Repository name must be at least 3 characters long")
	}

	if msg.OwnerType == RepositoryOwner_USER.String() {
		_, err = sdk.AccAddressFromBech32(msg.OwnerId)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid owner address (%s)", err)
		}
	} else if msg.OwnerType == RepositoryOwner_ORGANIZATION.String() {
		_, err := strconv.ParseUint(msg.OwnerId, 10, 64)
		if err != nil {
			return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid organization Id")
		}
	} else {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid owner type (%v)", msg.OwnerType)
	}
	return nil
}

var _ sdk.Msg = &MsgForkRepository{}

func NewMsgForkRepository(creator string, repositoryId uint64, ownerId string, ownerType string) *MsgForkRepository {
	return &MsgForkRepository{
		Creator:      creator,
		RepositoryId: repositoryId,
		OwnerId:      ownerId,
		OwnerType:    ownerType,
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

	if msg.OwnerType == RepositoryOwner_USER.String() {
		_, err = sdk.AccAddressFromBech32(msg.OwnerId)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid owner address (%s)", err)
		}
	} else if msg.OwnerType == RepositoryOwner_ORGANIZATION.String() {
		_, err := strconv.ParseUint(msg.OwnerId, 10, 64)
		if err != nil {
			return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid organization Id")
		}
	} else {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid owner type (%v)", msg.OwnerType)
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

	if msg.OwnerType == RepositoryOwner_USER.String() {
		_, err = sdk.AccAddressFromBech32(msg.OwnerId)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid owner address (%s)", err)
		}
	} else if msg.OwnerType == RepositoryOwner_ORGANIZATION.String() {
		_, err := strconv.ParseUint(msg.OwnerId, 10, 64)
		if err != nil {
			return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid organization Id")
		}
	} else {
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

var _ sdk.Msg = &MsgCreateBranch{}

func NewMsgCreateBranch(creator string, id uint64, name string, commitSHA string) *MsgCreateBranch {
	return &MsgCreateBranch{
		Id:        id,
		Creator:   creator,
		Name:      name,
		CommitSHA: commitSHA,
	}
}

func (msg *MsgCreateBranch) Route() string {
	return RouterKey
}

func (msg *MsgCreateBranch) Type() string {
	return "CreateBranch"
}

func (msg *MsgCreateBranch) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreateBranch) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateBranch) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
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
	return "SetDefaultBranch"
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
		return sdkerrors.Wrapf(sdkerrors.ErrUnknownRequest, "Repository name must be at least 3 characters long")
	}
	sanitized := IsRepositoryNameSanitized(msg.Name)
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
	return nil
}

var _ sdk.Msg = &MsgCreateTag{}

func NewMsgCreateTag(creator string, id uint64, name string, sha string) *MsgCreateTag {
	return &MsgCreateTag{
		Id:      id,
		Creator: creator,
		Name:    name,
		Sha:     sha,
	}
}

func (msg *MsgCreateTag) Route() string {
	return RouterKey
}

func (msg *MsgCreateTag) Type() string {
	return "CreateTag"
}

func (msg *MsgCreateTag) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreateTag) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateTag) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
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
	return nil
}

var _ sdk.Msg = &MsgUpdateRepository{}

func NewMsgUpdateRepository(creator string, id uint64, name string, owner string, description string, labels string, license string, defaultBranch string) *MsgUpdateRepository {
	return &MsgUpdateRepository{
		Id:            id,
		Creator:       creator,
		Name:          name,
		Owner:         owner,
		Description:   description,
		Labels:        labels,
		License:       license,
		DefaultBranch: defaultBranch,
	}
}

func (msg *MsgUpdateRepository) Route() string {
	return RouterKey
}

func (msg *MsgUpdateRepository) Type() string {
	return "UpdateRepository"
}

func (msg *MsgUpdateRepository) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateRepository) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateRepository) ValidateBasic() error {
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
