package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgCreatePullRequest{}

func NewMsgCreatePullRequest(creator string, iid string, title string, state string, description string, locked string, comments string, issues string, repositoryId string, labels string, assignees string, reviewers string, draft string, createdAt string, updatedAt string, closedAt string, closedBy string, mergedAt string, mergedBy string, mergeCommitSha string, maintainerCanModify string, head string, base string, extensions string) *MsgCreatePullRequest {
	return &MsgCreatePullRequest{
		Creator:             creator,
		Iid:                 iid,
		Title:               title,
		State:               state,
		Description:         description,
		Locked:              locked,
		Comments:            comments,
		Issues:              issues,
		RepositoryId:        repositoryId,
		Labels:              labels,
		Assignees:           assignees,
		Reviewers:           reviewers,
		Draft:               draft,
		CreatedAt:           createdAt,
		UpdatedAt:           updatedAt,
		ClosedAt:            closedAt,
		ClosedBy:            closedBy,
		MergedAt:            mergedAt,
		MergedBy:            mergedBy,
		MergeCommitSha:      mergeCommitSha,
		MaintainerCanModify: maintainerCanModify,
		Head:                head,
		Base:                base,
		Extensions:          extensions,
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
	return nil
}

var _ sdk.Msg = &MsgUpdatePullRequest{}

func NewMsgUpdatePullRequest(creator string, id uint64, iid string, title string, state string, description string, locked string, comments string, issues string, repositoryId string, labels string, assignees string, reviewers string, draft string, createdAt string, updatedAt string, closedAt string, closedBy string, mergedAt string, mergedBy string, mergeCommitSha string, maintainerCanModify string, head string, base string, extensions string) *MsgUpdatePullRequest {
	return &MsgUpdatePullRequest{
		Id:                  id,
		Creator:             creator,
		Iid:                 iid,
		Title:               title,
		State:               state,
		Description:         description,
		Locked:              locked,
		Comments:            comments,
		Issues:              issues,
		RepositoryId:        repositoryId,
		Labels:              labels,
		Assignees:           assignees,
		Reviewers:           reviewers,
		Draft:               draft,
		CreatedAt:           createdAt,
		UpdatedAt:           updatedAt,
		ClosedAt:            closedAt,
		ClosedBy:            closedBy,
		MergedAt:            mergedAt,
		MergedBy:            mergedBy,
		MergeCommitSha:      mergeCommitSha,
		MaintainerCanModify: maintainerCanModify,
		Head:                head,
		Base:                base,
		Extensions:          extensions,
	}
}

func (msg *MsgUpdatePullRequest) Route() string {
	return RouterKey
}

func (msg *MsgUpdatePullRequest) Type() string {
	return "UpdatePullRequest"
}

func (msg *MsgUpdatePullRequest) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdatePullRequest) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdatePullRequest) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
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
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
