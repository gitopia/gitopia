package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgCreatePullRequest{}

func NewMsgCreatePullRequest(creator string, title string, description string, headBranch string, headRepoId uint64, baseBranch string, baseRepoId uint64) *MsgCreatePullRequest {
	return &MsgCreatePullRequest{
		Creator:     creator,
		Title:       title,
		Description: description,
		HeadBranch:  headBranch,
		HeadRepoId:  headRepoId,
		BaseBranch:  baseBranch,
		BaseRepoId:  baseRepoId,
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
	if len(msg.Title) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "title length exceeds limit: 255")
	}
	if len(msg.Description) > 20000 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "description length exceeds limit: 20000")
	}
	return nil
}

var _ sdk.Msg = &MsgUpdatePullRequest{}

func NewMsgUpdatePullRequest(creator string, id uint64, title string, description string) *MsgUpdatePullRequest {
	return &MsgUpdatePullRequest{
		Id:          id,
		Creator:     creator,
		Title:       title,
		Description: description,
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

var _ sdk.Msg = &MsgSetPullRequestState{}

func NewMsgSetPullRequestState(creator string, id uint64, state string, mergeCommitSha string) *MsgSetPullRequestState {
	return &MsgSetPullRequestState{
		Id:             id,
		Creator:        creator,
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
	if msg.State != "Open" && msg.State != "Closed" && msg.State != "Merged" {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid state (%s)", msg.State)
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
