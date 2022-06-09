package types

import (
	"regexp"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

type PullRequestIidSlice []*PullRequestIid

func (r PullRequestIidSlice) Len() int           { return len(r) }
func (r PullRequestIidSlice) Less(i, j int) bool { return r[i].Iid < r[j].Iid }
func (r PullRequestIidSlice) Swap(i, j int)      { r[i], r[j] = r[j], r[i] }

var _ sdk.Msg = &MsgCreatePullRequest{}

func NewMsgCreatePullRequest(creator string, title string, description string, headBranch string, headRepositoryId RepositoryId, baseBranch string, baseRepositoryId RepositoryId, reviewers []string, assignees []string, labelIds []uint64) *MsgCreatePullRequest {
	return &MsgCreatePullRequest{
		Creator:          creator,
		Title:            title,
		Description:      description,
		HeadBranch:       headBranch,
		HeadRepositoryId: headRepositoryId,
		BaseBranch:       baseBranch,
		BaseRepositoryId: baseRepositoryId,
		Reviewers:        reviewers,
		Assignees:        assignees,
		LabelIds:         labelIds,
	}
}

func (msg *MsgCreatePullRequest) Route() string {
	return RouterKey
}

func (msg *MsgCreatePullRequest) Type() string {
	return "CreatePullRequest"
}

func (msg *MsgCreatePullRequest) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreatePullRequest) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreatePullRequest) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	_, err = sdk.AccAddressFromBech32(msg.HeadRepositoryId.Id)
	if err != nil {
		if len(msg.HeadRepositoryId.Id) < 3 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "head id must consist minimum 3 chars")
		} else if len(msg.HeadRepositoryId.Id) > 39 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "head id limit exceed: 39")
		}
		valid, err := regexp.MatchString("^[a-zA-Z0-9]+(?:[-]?[a-zA-Z0-9])*$", msg.HeadRepositoryId.Id)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
		}
		if !valid {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid head id (%v)", msg.HeadRepositoryId.Id)
		}
	}

	if len(msg.HeadRepositoryId.Name) < 3 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "head repository name must be at least 3 characters long")
	} else if len(msg.HeadRepositoryId.Name) > 100 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "head repository name exceeds limit: 100")
	}
	sanitized := IsNameSanitized(msg.HeadRepositoryId.Name)
	if !sanitized {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "head repository name is not sanitized")
	}

	_, err = sdk.AccAddressFromBech32(msg.BaseRepositoryId.Id)
	if err != nil {
		if len(msg.BaseRepositoryId.Id) < 3 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "base id must consist minimum 3 chars")
		} else if len(msg.BaseRepositoryId.Id) > 39 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "base id limit exceed: 39")
		}
		valid, err := regexp.MatchString("^[a-zA-Z0-9]+(?:[-]?[a-zA-Z0-9])*$", msg.BaseRepositoryId.Id)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
		}
		if !valid {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid base id (%v)", msg.BaseRepositoryId.Id)
		}
	}

	if len(msg.BaseRepositoryId.Name) < 3 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "base repository name must be at least 3 characters long")
	} else if len(msg.BaseRepositoryId.Name) > 100 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "base repository name exceeds limit: 100")
	}
	sanitized = IsNameSanitized(msg.BaseRepositoryId.Name)
	if !sanitized {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "base repository name is not sanitized")
	}

	if len(msg.Title) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "title length exceeds limit: 255")
	} else if len(msg.Title) < 1 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "title too short")
	}
	if len(msg.Description) > 20000 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "description length exceeds limit: 20000")
	}
	if len(msg.HeadBranch) > 63 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "head branch length exceeds limit: 63")
	} else if len(msg.HeadBranch) < 1 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "head branch too short")
	}
	if len(msg.BaseBranch) > 63 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "base branch length exceeds limit: 63")
	} else if len(msg.BaseBranch) < 1 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "base branch too short")
	}
	if len(msg.Reviewers) > 10 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "can't give more than 10 reviewers at a time")
	}
	if len(msg.Assignees) > 10 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "can't give more than 10 assignees at a time")
	}
	if len(msg.LabelIds) > 10 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "can't give more than 10 labels at a time")
	}
	if len(msg.Reviewers) > 0 {
		unique := make(map[string]bool, len(msg.Reviewers))
		for _, reviewer := range msg.Reviewers {
			_, err := sdk.AccAddressFromBech32(reviewer)
			if err != nil {
				return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid reviewer (%v)", reviewer)
			}
			if !unique[reviewer] {
				unique[reviewer] = true
			} else {
				return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "duplicate reviewer (%s)", reviewer)
			}
		}
	}
	if len(msg.Assignees) > 0 {
		unique := make(map[string]bool, len(msg.Assignees))
		for _, assignee := range msg.Assignees {
			_, err := sdk.AccAddressFromBech32(assignee)
			if err != nil {
				return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid assignee (%v)", assignee)
			}
			if !unique[assignee] {
				unique[assignee] = true
			} else {
				return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "duplicate assignee (%s)", assignee)
			}
		}
	}
	if len(msg.LabelIds) > 0 {
		unique := make(map[uint64]bool, len(msg.LabelIds))
		for _, labelId := range msg.LabelIds {
			if !unique[labelId] {
				unique[labelId] = true
			} else {
				return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "duplicate label (%v)", labelId)
			}
		}
	}
	return nil
}

var _ sdk.Msg = &MsgUpdatePullRequestTitle{}

func NewMsgUpdatePullRequestTitle(creator string, id uint64, title string) *MsgUpdatePullRequestTitle {
	return &MsgUpdatePullRequestTitle{
		Id:      id,
		Creator: creator,
		Title:   title,
	}
}

func (msg *MsgUpdatePullRequestTitle) Route() string {
	return RouterKey
}

func (msg *MsgUpdatePullRequestTitle) Type() string {
	return "UpdatePullRequestTitle"
}

func (msg *MsgUpdatePullRequestTitle) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdatePullRequestTitle) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdatePullRequestTitle) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	if len(msg.Title) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "title length exceeds limit: 255")
	} else if len(msg.Title) < 1 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "title too short")
	}
	return nil
}

var _ sdk.Msg = &MsgUpdatePullRequestDescription{}

func NewMsgUpdatePullRequestDescription(creator string, id uint64, description string) *MsgUpdatePullRequestDescription {
	return &MsgUpdatePullRequestDescription{
		Id:          id,
		Creator:     creator,
		Description: description,
	}
}

func (msg *MsgUpdatePullRequestDescription) Route() string {
	return RouterKey
}

func (msg *MsgUpdatePullRequestDescription) Type() string {
	return "UpdatePullRequestDescription"
}

func (msg *MsgUpdatePullRequestDescription) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdatePullRequestDescription) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdatePullRequestDescription) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	if len(msg.Description) > 20000 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "description length exceeds limit: 20000")
	}
	return nil
}

var _ sdk.Msg = &MsgInvokeMergePullRequest{}

func NewMsgInvokeMergePullRequest(creator string, id uint64, provider string) *MsgInvokeMergePullRequest {
	return &MsgInvokeMergePullRequest{
		Id:       id,
		Creator:  creator,
		Provider: provider,
	}
}

func (msg *MsgInvokeMergePullRequest) Route() string {
	return RouterKey
}

func (msg *MsgInvokeMergePullRequest) Type() string {
	return "InvokeMergePullRequest"
}

func (msg *MsgInvokeMergePullRequest) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgInvokeMergePullRequest) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgInvokeMergePullRequest) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	_, err = sdk.AccAddressFromBech32(msg.Provider)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid provider address (%s)", err)
	}
	return nil
}

var _ sdk.Msg = &MsgSetPullRequestState{}

func NewMsgSetPullRequestState(creator string, id uint64, state string, mergeCommitSha string) *MsgSetPullRequestState {
	return &MsgSetPullRequestState{
		Creator:        creator,
		Id:             id,
		State:          state,
		MergeCommitSha: mergeCommitSha,
	}
}

func (msg *MsgSetPullRequestState) Route() string {
	return RouterKey
}

func (msg *MsgSetPullRequestState) Type() string {
	return "SetPullRequestState"
}

func (msg *MsgSetPullRequestState) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgSetPullRequestState) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgSetPullRequestState) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	_, exists := PullRequest_State_value[msg.State]
	if !exists {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid state (%s)", msg.State)
	}
	return nil
}

var _ sdk.Msg = &MsgAddPullRequestReviewers{}

func NewMsgAddPullRequestReviewers(creator string, id uint64, reviewers []string) *MsgAddPullRequestReviewers {
	return &MsgAddPullRequestReviewers{
		Id:        id,
		Creator:   creator,
		Reviewers: reviewers,
	}
}

func (msg *MsgAddPullRequestReviewers) Route() string {
	return RouterKey
}

func (msg *MsgAddPullRequestReviewers) Type() string {
	return "AddPullRequestReviewers"
}

func (msg *MsgAddPullRequestReviewers) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgAddPullRequestReviewers) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgAddPullRequestReviewers) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if len(msg.Reviewers) < 1 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "empty reviewers list")
	} else if len(msg.Reviewers) > 10 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "can't give more than 10 reviewers at a time")
	}

	unique := make(map[string]bool, len(msg.Reviewers))
	for _, reviewer := range msg.Reviewers {
		_, err := sdk.AccAddressFromBech32(reviewer)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid reviewer address(%s)", err)
		}
		if !unique[reviewer] {
			unique[reviewer] = true
		} else {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "duplicate reviewer (%s)", reviewer)
		}
	}
	return nil
}

var _ sdk.Msg = &MsgRemovePullRequestAssignees{}

func NewMsgRemovePullRequestReviewers(creator string, id uint64, reviewers []string) *MsgRemovePullRequestReviewers {
	return &MsgRemovePullRequestReviewers{
		Id:        id,
		Creator:   creator,
		Reviewers: reviewers,
	}
}

func (msg *MsgRemovePullRequestReviewers) Route() string {
	return RouterKey
}

func (msg *MsgRemovePullRequestReviewers) Type() string {
	return "RemovePullRequestReviewers"
}

func (msg *MsgRemovePullRequestReviewers) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgRemovePullRequestReviewers) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgRemovePullRequestReviewers) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if len(msg.Reviewers) < 1 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "empty reviewers list")
	} else if len(msg.Reviewers) > 10 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "can't give more than 10 reviewers at a time")
	}

	unique := make(map[string]bool, len(msg.Reviewers))
	for _, reviewer := range msg.Reviewers {
		_, err := sdk.AccAddressFromBech32(reviewer)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid reviewer address(%s)", err)
		}
		if !unique[reviewer] {
			unique[reviewer] = true
		} else {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "duplicate reviewer (%s)", reviewer)
		}
	}
	return nil
}

var _ sdk.Msg = &MsgAddPullRequestAssignees{}

func NewMsgAddPullRequestAssignees(creator string, id uint64, assignees []string) *MsgAddPullRequestAssignees {
	return &MsgAddPullRequestAssignees{
		Id:        id,
		Creator:   creator,
		Assignees: assignees,
	}
}

func (msg *MsgAddPullRequestAssignees) Route() string {
	return RouterKey
}

func (msg *MsgAddPullRequestAssignees) Type() string {
	return "AddPullRequestAssignees"
}

func (msg *MsgAddPullRequestAssignees) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgAddPullRequestAssignees) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgAddPullRequestAssignees) ValidateBasic() error {
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

var _ sdk.Msg = &MsgRemovePullRequestAssignees{}

func NewMsgRemovePullRequestAssignees(creator string, id uint64, assignees []string) *MsgRemovePullRequestAssignees {
	return &MsgRemovePullRequestAssignees{
		Id:        id,
		Creator:   creator,
		Assignees: assignees,
	}
}

func (msg *MsgRemovePullRequestAssignees) Route() string {
	return RouterKey
}

func (msg *MsgRemovePullRequestAssignees) Type() string {
	return "RemovePullRequestAssignees"
}

func (msg *MsgRemovePullRequestAssignees) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgRemovePullRequestAssignees) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgRemovePullRequestAssignees) ValidateBasic() error {
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

var _ sdk.Msg = &MsgAddPullRequestLabels{}

func NewMsgAddPullRequestLabels(creator string, pullRequestId uint64, labelIds []uint64) *MsgAddPullRequestLabels {
	return &MsgAddPullRequestLabels{
		PullRequestId: pullRequestId,
		Creator:       creator,
		LabelIds:      labelIds,
	}
}

func (msg *MsgAddPullRequestLabels) Route() string {
	return RouterKey
}

func (msg *MsgAddPullRequestLabels) Type() string {
	return "AddPullRequestLabels"
}

func (msg *MsgAddPullRequestLabels) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgAddPullRequestLabels) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgAddPullRequestLabels) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if len(msg.LabelIds) < 1 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "empty labels list")
	} else if len(msg.LabelIds) > 10 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "can't give more than 10 labels at a time")
	}

	unique := make(map[uint64]bool, len(msg.LabelIds))
	for _, labelId := range msg.LabelIds {
		if !unique[labelId] {
			unique[labelId] = true
		} else {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "duplicate label id (%v)", labelId)
		}
	}
	return nil
}

var _ sdk.Msg = &MsgRemovePullRequestLabels{}

func NewMsgRemovePullRequestLabels(creator string, pullRequestId uint64, labelIds []uint64) *MsgRemovePullRequestLabels {
	return &MsgRemovePullRequestLabels{
		PullRequestId: pullRequestId,
		Creator:       creator,
		LabelIds:      labelIds,
	}
}

func (msg *MsgRemovePullRequestLabels) Route() string {
	return RouterKey
}

func (msg *MsgRemovePullRequestLabels) Type() string {
	return "AddPullRequestLabels"
}

func (msg *MsgRemovePullRequestLabels) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgRemovePullRequestLabels) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgRemovePullRequestLabels) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if len(msg.LabelIds) < 1 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "empty labels list")
	} else if len(msg.LabelIds) > 50 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "can't give more than 50 labels at a time")
	}

	unique := make(map[uint64]bool, len(msg.LabelIds))
	for _, labelId := range msg.LabelIds {
		if !unique[labelId] {
			unique[labelId] = true
		} else {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "duplicate label id (%v)", labelId)
		}
	}
	return nil
}

var _ sdk.Msg = &MsgDeletePullRequest{}

func NewMsgDeletePullRequest(creator string, id uint64) *MsgDeletePullRequest {
	return &MsgDeletePullRequest{
		Id:      id,
		Creator: creator,
	}
}
func (msg *MsgDeletePullRequest) Route() string {
	return RouterKey
}

func (msg *MsgDeletePullRequest) Type() string {
	return "DeletePullRequest"
}

func (msg *MsgDeletePullRequest) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgDeletePullRequest) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgDeletePullRequest) ValidateBasic() error {
	return sdkerrors.Wrapf(sdkerrors.ErrNotSupported, "tx WIP")
}
