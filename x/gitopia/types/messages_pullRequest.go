package types

import (
	"regexp"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

type PullRequestList []*PullRequest

func (pr PullRequestList) Len() int           { return len(pr) }
func (pr PullRequestList) Less(i, j int) bool { return pr[i].Iid < pr[j].Iid }
func (pr PullRequestList) Swap(i, j int)      { pr[i], pr[j] = pr[j], pr[i] }

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

func NewMsgUpdatePullRequestTitle(creator string, repositoryId uint64, iid uint64, title string) *MsgUpdatePullRequestTitle {
	return &MsgUpdatePullRequestTitle{
		Creator:      creator,
		RepositoryId: repositoryId,
		Iid:          iid,
		Title:        title,
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

func NewMsgUpdatePullRequestDescription(creator string, repositoryId uint64, iid uint64, description string) *MsgUpdatePullRequestDescription {
	return &MsgUpdatePullRequestDescription{
		Creator:      creator,
		RepositoryId: repositoryId,
		Iid:          iid,
		Description:  description,
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

func NewMsgInvokeMergePullRequest(creator string, repositoryId uint64, iid uint64, provider string) *MsgInvokeMergePullRequest {
	return &MsgInvokeMergePullRequest{
		Creator:      creator,
		RepositoryId: repositoryId,
		Iid:          iid,
		Provider:     provider,
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

func NewMsgSetPullRequestState(creator string, repositoryId uint64, iid uint64, state string, mergeCommitSha string) *MsgSetPullRequestState {
	return &MsgSetPullRequestState{
		Creator:        creator,
		RepositoryId:   repositoryId,
		Iid:            iid,
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

func NewMsgAddPullRequestReviewers(creator string, repositoryId uint64, iid uint64, reviewers []string) *MsgAddPullRequestReviewers {
	return &MsgAddPullRequestReviewers{
		Creator:      creator,
		RepositoryId: repositoryId,
		Iid:          iid,
		Reviewers:    reviewers,
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

func NewMsgRemovePullRequestReviewers(creator string, repositoryId uint64, iid uint64, reviewers []string) *MsgRemovePullRequestReviewers {
	return &MsgRemovePullRequestReviewers{
		Creator:      creator,
		RepositoryId: repositoryId,
		Iid:          iid,
		Reviewers:    reviewers,
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

func NewMsgAddPullRequestAssignees(creator string, repositoryId uint64, iid uint64, assignees []string) *MsgAddPullRequestAssignees {
	return &MsgAddPullRequestAssignees{
		Creator:      creator,
		RepositoryId: repositoryId,
		Iid:          iid,
		Assignees:    assignees,
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

func NewMsgRemovePullRequestAssignees(creator string, repositoryId uint64, iid uint64, assignees []string) *MsgRemovePullRequestAssignees {
	return &MsgRemovePullRequestAssignees{
		Creator:      creator,
		RepositoryId: repositoryId,
		Iid:          iid,
		Assignees:    assignees,
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

var _ sdk.Msg = &MsgLinkPullRequestIssueByIid{}

func NewMsgLinkPullRequestIssueByIid(creator string, repositoryId uint64, pullRequestIid uint64, issueIid uint64) *MsgLinkPullRequestIssueByIid {
	return &MsgLinkPullRequestIssueByIid{
		Creator:        creator,
		RepositoryId:   repositoryId,
		PullRequestIid: pullRequestIid,
		IssueIid:       issueIid,
	}
}

func (msg *MsgLinkPullRequestIssueByIid) Route() string {
	return RouterKey
}

func (msg *MsgLinkPullRequestIssueByIid) Type() string {
	return "LinkPullRequestIssueByIid"
}

func (msg *MsgLinkPullRequestIssueByIid) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgLinkPullRequestIssueByIid) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgLinkPullRequestIssueByIid) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	return nil
}

var _ sdk.Msg = &MsgUnlinkPullRequestIssueByIid{}

func NewMsgUnlinkPullRequestIssueByIid(creator string, repositoryId uint64, pullRequestIid uint64, issueIid uint64) *MsgUnlinkPullRequestIssueByIid {
	return &MsgUnlinkPullRequestIssueByIid{
		Creator:        creator,
		RepositoryId:   repositoryId,
		PullRequestIid: pullRequestIid,
		IssueIid:       issueIid,
	}
}

func (msg *MsgUnlinkPullRequestIssueByIid) Route() string {
	return RouterKey
}

func (msg *MsgUnlinkPullRequestIssueByIid) Type() string {
	return "LinkPullRequestIssueByIid"
}

func (msg *MsgUnlinkPullRequestIssueByIid) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUnlinkPullRequestIssueByIid) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUnlinkPullRequestIssueByIid) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	return nil
}

var _ sdk.Msg = &MsgAddPullRequestLabels{}

func NewMsgAddPullRequestLabels(creator string, repositoryId uint64, iid uint64, labelIds []uint64) *MsgAddPullRequestLabels {
	return &MsgAddPullRequestLabels{
		Creator:      creator,
		RepositoryId: repositoryId,
		Iid:          iid,
		LabelIds:     labelIds,
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

func NewMsgRemovePullRequestLabels(creator string, repositoryId uint64, iid uint64, labelIds []uint64) *MsgRemovePullRequestLabels {
	return &MsgRemovePullRequestLabels{
		Creator:      creator,
		RepositoryId: repositoryId,
		Iid:          iid,
		LabelIds:     labelIds,
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

func NewMsgDeletePullRequest(creator string, repositoryId uint64, iid uint64) *MsgDeletePullRequest {
	return &MsgDeletePullRequest{
		Creator:      creator,
		RepositoryId: repositoryId,
		Iid:          iid,
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
