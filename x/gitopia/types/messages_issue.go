package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgCreateIssue{}

func NewMsgCreateIssue(creator string, title string, description string, repositoryId uint64, labels []string, weight uint64, assignees []string) *MsgCreateIssue {
	return &MsgCreateIssue{
		Creator:      creator,
		Title:        title,
		Description:  description,
		RepositoryId: repositoryId,
		Labels:       labels,
		Weight:       weight,
		Assignees:    assignees,
	}
}

func (msg *MsgCreateIssue) Route() string {
	return RouterKey
}

func (msg *MsgCreateIssue) Type() string {
	return "CreateIssue"
}

func (msg *MsgCreateIssue) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreateIssue) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateIssue) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if len(msg.Title) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "title length exceeds limit: 255")
	} else if len(msg.Title) < 3 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "title too short")
	}
	if len(msg.Description) > 20000 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "description length exceeds limit: 20000")
	}
	if len(msg.Assignees) > 10 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "can't give more than 10 assignees at a time")
	}
	if len(msg.Labels) > 10 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "can't give more than 10 labels at a time")
	}

	if len(msg.Assignees) > 0 {
		unique := make(map[string]bool, len(msg.Assignees))
		for _, assignee := range msg.Assignees {
			_, err := sdk.AccAddressFromBech32(assignee)
			if err != nil {
				return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid assignee (%v)", msg.Assignees[0])
			}
			if !unique[assignee] {
				unique[assignee] = true
			} else {
				return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "duplicate assignee (%s)", assignee)
			}
		}
	}

	if len(msg.Labels) > 0 {
		unique := make(map[string]bool, len(msg.Labels))
		for _, label := range msg.Labels {
			if !unique[label] {
				unique[label] = true
			} else {
				return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "duplicate label (%v)", label)
			}
		}
	}

	return nil
}

var _ sdk.Msg = &MsgUpdateIssue{}

func NewMsgUpdateIssue(creator string, id uint64, title string, description string, weight uint64, assignees []string) *MsgUpdateIssue {
	return &MsgUpdateIssue{
		Id:          id,
		Creator:     creator,
		Title:       title,
		Description: description,
		Weight:      weight,
		Assignees:   assignees,
	}
}

func (msg *MsgUpdateIssue) Route() string {
	return RouterKey
}

func (msg *MsgUpdateIssue) Type() string {
	return "UpdateIssue"
}

func (msg *MsgUpdateIssue) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateIssue) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateIssue) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if len(msg.Title) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "title length exceeds limit: 255")
	} else if len(msg.Title) < 3 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "title too short")
	}

	unique := make(map[string]bool, len(msg.Assignees))
	for _, assignee := range msg.Assignees {
		_, err := sdk.AccAddressFromBech32(assignee)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid assignee (%s)", err)
		}
		if !unique[assignee] {
			unique[assignee] = true
		} else {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "duplicate assignee (%s)", assignee)
		}
	}
	return nil
}

var _ sdk.Msg = &MsgUpdateIssueTitle{}

func NewMsgUpdateIssueTitle(creator string, id uint64, title string) *MsgUpdateIssueTitle {
	return &MsgUpdateIssueTitle{
		Id:      id,
		Creator: creator,
		Title:   title,
	}
}

func (msg *MsgUpdateIssueTitle) Route() string {
	return RouterKey
}

func (msg *MsgUpdateIssueTitle) Type() string {
	return "UpdateIssueTitle"
}

func (msg *MsgUpdateIssueTitle) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateIssueTitle) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateIssueTitle) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	if len(msg.Title) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "title length exceeds limit: 255")
	} else if len(msg.Title) < 3 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "title too short")
	}
	return nil
}

var _ sdk.Msg = &MsgUpdateIssueDescription{}

func NewMsgUpdateIssueDescription(creator string, id uint64, description string) *MsgUpdateIssueDescription {
	return &MsgUpdateIssueDescription{
		Id:          id,
		Creator:     creator,
		Description: description,
	}
}

func (msg *MsgUpdateIssueDescription) Route() string {
	return RouterKey
}

func (msg *MsgUpdateIssueDescription) Type() string {
	return "UpdateIssueDescription"
}

func (msg *MsgUpdateIssueDescription) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateIssueDescription) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateIssueDescription) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	if len(msg.Description) > 20000 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "description length exceeds limit: 20000")
	}
	return nil
}

var _ sdk.Msg = &MsgToggleIssueState{}

func NewMsgToggleIssueState(creator string, id uint64) *MsgToggleIssueState {
	return &MsgToggleIssueState{
		Id:      id,
		Creator: creator,
	}
}

func (msg *MsgToggleIssueState) Route() string {
	return RouterKey
}

func (msg *MsgToggleIssueState) Type() string {
	return "ToggleIssueState"
}

func (msg *MsgToggleIssueState) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgToggleIssueState) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgToggleIssueState) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

var _ sdk.Msg = &MsgAddIssueAssignees{}

func NewMsgAddIssueAssignees(creator string, id uint64, assignees []string) *MsgAddIssueAssignees {
	return &MsgAddIssueAssignees{
		Id:        id,
		Creator:   creator,
		Assignees: assignees,
	}
}

func (msg *MsgAddIssueAssignees) Route() string {
	return RouterKey
}

func (msg *MsgAddIssueAssignees) Type() string {
	return "AddIssueAssignees"
}

func (msg *MsgAddIssueAssignees) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgAddIssueAssignees) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgAddIssueAssignees) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if len(msg.Assignees) < 1 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "empty assignees list")
	} else if len(msg.Assignees) > 10 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "can't give more than 10 assignees at a time")
	}

	unique := make(map[string]bool, len(msg.Assignees))
	for _, assignee := range msg.Assignees {
		_, err := sdk.AccAddressFromBech32(assignee)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid assignee address(%s)", err)
		}
		if !unique[assignee] {
			unique[assignee] = true
		} else {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "duplicate assignee (%s)", assignee)
		}
	}
	return nil
}

var _ sdk.Msg = &MsgRemoveIssueAssignees{}

func NewMsgRemoveIssueAssignees(creator string, id uint64, assignees []string) *MsgRemoveIssueAssignees {
	return &MsgRemoveIssueAssignees{
		Id:        id,
		Creator:   creator,
		Assignees: assignees,
	}
}

func (msg *MsgRemoveIssueAssignees) Route() string {
	return RouterKey
}

func (msg *MsgRemoveIssueAssignees) Type() string {
	return "RemoveIssueAssignees"
}

func (msg *MsgRemoveIssueAssignees) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgRemoveIssueAssignees) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgRemoveIssueAssignees) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if len(msg.Assignees) < 1 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "empty assignees list")
	} else if len(msg.Assignees) > 10 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "can't give more than 10 assignees at a time")
	}

	unique := make(map[string]bool, len(msg.Assignees))
	for _, assignee := range msg.Assignees {
		_, err := sdk.AccAddressFromBech32(assignee)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid assignee address(%s)", err)
		}
		if !unique[assignee] {
			unique[assignee] = true
		} else {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "duplicate assignee (%s)", assignee)
		}
	}
	return nil
}

var _ sdk.Msg = &MsgAddIssueLabels{}

func NewMsgAddIssueLabels(creator string, id uint64, labels []string) *MsgAddIssueLabels {
	return &MsgAddIssueLabels{
		Id:      id,
		Creator: creator,
		Labels:  labels,
	}
}

func (msg *MsgAddIssueLabels) Route() string {
	return RouterKey
}

func (msg *MsgAddIssueLabels) Type() string {
	return "AddIssueLabels"
}

func (msg *MsgAddIssueLabels) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgAddIssueLabels) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgAddIssueLabels) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if len(msg.Labels) < 1 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "empty labels list")
	} else if len(msg.Labels) > 10 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "can't give more than 10 labels at a time")
	}

	unique := make(map[string]bool, len(msg.Labels))
	for _, label := range msg.Labels {
		if !unique[label] {
			unique[label] = true
		} else {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "duplicate label (%v)", label)
		}
	}
	return nil
}

var _ sdk.Msg = &MsgRemoveIssueLabels{}

func NewMsgRemoveIssueLabels(creator string, id uint64, labels []string) *MsgRemoveIssueLabels {
	return &MsgRemoveIssueLabels{
		Id:      id,
		Creator: creator,
		Labels:  labels,
	}
}

func (msg *MsgRemoveIssueLabels) Route() string {
	return RouterKey
}

func (msg *MsgRemoveIssueLabels) Type() string {
	return "AddIssueLabels"
}

func (msg *MsgRemoveIssueLabels) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgRemoveIssueLabels) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgRemoveIssueLabels) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if len(msg.Labels) < 1 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "empty labels list")
	} else if len(msg.Labels) > 50 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "can't give more than 50 labels at a time")
	}

	unique := make(map[string]bool, len(msg.Labels))
	for _, label := range msg.Labels {
		if !unique[label] {
			unique[label] = true
		} else {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "duplicate label (%v)", label)
		}
	}
	return nil
}

var _ sdk.Msg = &MsgDeleteIssue{}

func NewMsgDeleteIssue(creator string, id uint64) *MsgDeleteIssue {
	return &MsgDeleteIssue{
		Id:      id,
		Creator: creator,
	}
}
func (msg *MsgDeleteIssue) Route() string {
	return RouterKey
}

func (msg *MsgDeleteIssue) Type() string {
	return "DeleteIssue"
}

func (msg *MsgDeleteIssue) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgDeleteIssue) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgDeleteIssue) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
