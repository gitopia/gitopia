package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgCreateIssue{}

func NewMsgCreateIssue(creator string, title string, description string, repositoryId uint64, labels []string, weight uint64, assigneesId []string) *MsgCreateIssue {
	return &MsgCreateIssue{
		Creator:      creator,
		Title:        title,
		Description:  description,
		RepositoryId: repositoryId,
		Labels:       labels,
		Weight:       weight,
		AssigneesId:  assigneesId,
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

	unique := make(map[string]bool, len(msg.AssigneesId))
	for _, asgId := range msg.AssigneesId {
		_, err := sdk.AccAddressFromBech32(asgId)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid assigneesId (%s)", err)
		}
		if !unique[asgId] {
			unique[asgId] = true
		} else {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "duplicate assigneesId (%s)", asgId)
		}
	}
	return nil
}

var _ sdk.Msg = &MsgUpdateIssue{}

func NewMsgUpdateIssue(creator string, id uint64, title string, description string, labels []string, weight uint64, assigneesId []string) *MsgUpdateIssue {
	return &MsgUpdateIssue{
		Id:          id,
		Creator:     creator,
		Title:       title,
		Description: description,
		Labels:      labels,
		Weight:      weight,
		AssigneesId: assigneesId,
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
	unique := make(map[string]bool, len(msg.AssigneesId))
	for _, asgId := range msg.AssigneesId {
		_, err := sdk.AccAddressFromBech32(asgId)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid assigneesId (%s)", err)
		}
		if !unique[asgId] {
			unique[asgId] = true
		} else {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "duplicate assigneesId (%s)", asgId)
		}
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
