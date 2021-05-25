package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgCreateIssue{}

func NewMsgCreateIssue(creator string, iid string, title string, state string, description string, authorId string, comments string, pullRequests string, repositoryId string, labels string, weight string, assigneesId string, createdAt string, updatedAt string, closedAt string, closedBy string, extensions string) *MsgCreateIssue {
	return &MsgCreateIssue{
		Creator:      creator,
		Iid:          iid,
		Title:        title,
		State:        state,
		Description:  description,
		AuthorId:     authorId,
		Comments:     comments,
		PullRequests: pullRequests,
		RepositoryId: repositoryId,
		Labels:       labels,
		Weight:       weight,
		AssigneesId:  assigneesId,
		CreatedAt:    createdAt,
		UpdatedAt:    updatedAt,
		ClosedAt:     closedAt,
		ClosedBy:     closedBy,
		Extensions:   extensions,
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
	return nil
}

var _ sdk.Msg = &MsgUpdateIssue{}

func NewMsgUpdateIssue(creator string, id uint64, iid string, title string, state string, description string, authorId string, comments string, pullRequests string, repositoryId string, labels string, weight string, assigneesId string, createdAt string, updatedAt string, closedAt string, closedBy string, extensions string) *MsgUpdateIssue {
	return &MsgUpdateIssue{
		Id:           id,
		Creator:      creator,
		Iid:          iid,
		Title:        title,
		State:        state,
		Description:  description,
		AuthorId:     authorId,
		Comments:     comments,
		PullRequests: pullRequests,
		RepositoryId: repositoryId,
		Labels:       labels,
		Weight:       weight,
		AssigneesId:  assigneesId,
		CreatedAt:    createdAt,
		UpdatedAt:    updatedAt,
		ClosedAt:     closedAt,
		ClosedBy:     closedBy,
		Extensions:   extensions,
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
	return nil
}

var _ sdk.Msg = &MsgCreateIssue{}

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
