package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

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
	if len(msg.Name) < 3 {
		return sdkerrors.Wrapf(sdkerrors.ErrUnknownRequest, "Repository name must be at least 3 characters long")
	}
	return nil
}

var _ sdk.Msg = &MsgUpdateRepository{}

func NewMsgUpdateRepository(creator string, id uint64, name string, owner string, description string, forks string, branches string, tags string, subscribers string, commits string, issuesOpen string, issuesClosed string, pulls string, labels string, releases string, createdAt string, updatedAt string, pushedAt string, stargazers string, archived string, license string, defaultBranch string, extensions string) *MsgUpdateRepository {
	return &MsgUpdateRepository{
		Id:            id,
		Creator:       creator,
		Name:          name,
		Owner:         owner,
		Description:   description,
		Forks:         forks,
		Branches:      branches,
		Tags:          tags,
		Subscribers:   subscribers,
		Commits:       commits,
		IssuesOpen:    issuesOpen,
		IssuesClosed:  issuesClosed,
		Pulls:         pulls,
		Labels:        labels,
		Releases:      releases,
		CreatedAt:     createdAt,
		UpdatedAt:     updatedAt,
		PushedAt:      pushedAt,
		Stargazers:    stargazers,
		Archived:      archived,
		License:       license,
		DefaultBranch: defaultBranch,
		Extensions:    extensions,
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
