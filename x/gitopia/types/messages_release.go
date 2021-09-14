package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgCreateRelease{}

func NewMsgCreateRelease(creator string, repositoryId string, tagName string, target string, name string, description string, attachments string, draft string, preRelease string, isTag string, createdAt string, updatedAt string, publishedAt string) *MsgCreateRelease {
	return &MsgCreateRelease{
		Creator:      creator,
		RepositoryId: repositoryId,
		TagName:      tagName,
		Target:       target,
		Name:         name,
		Description:  description,
		Attachments:  attachments,
		Draft:        draft,
		PreRelease:   preRelease,
		IsTag:        isTag,
		CreatedAt:    createdAt,
		UpdatedAt:    updatedAt,
		PublishedAt:  publishedAt,
	}
}

func (msg *MsgCreateRelease) Route() string {
	return RouterKey
}

func (msg *MsgCreateRelease) Type() string {
	return "CreateRelease"
}

func (msg *MsgCreateRelease) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreateRelease) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateRelease) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

var _ sdk.Msg = &MsgUpdateRelease{}

func NewMsgUpdateRelease(creator string, id uint64, repositoryId string, tagName string, target string, name string, description string, attachments string, draft string, preRelease string, isTag string, createdAt string, updatedAt string, publishedAt string) *MsgUpdateRelease {
	return &MsgUpdateRelease{
		Id:           id,
		Creator:      creator,
		RepositoryId: repositoryId,
		TagName:      tagName,
		Target:       target,
		Name:         name,
		Description:  description,
		Attachments:  attachments,
		Draft:        draft,
		PreRelease:   preRelease,
		IsTag:        isTag,
		CreatedAt:    createdAt,
		UpdatedAt:    updatedAt,
		PublishedAt:  publishedAt,
	}
}

func (msg *MsgUpdateRelease) Route() string {
	return RouterKey
}

func (msg *MsgUpdateRelease) Type() string {
	return "UpdateRelease"
}

func (msg *MsgUpdateRelease) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateRelease) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateRelease) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

var _ sdk.Msg = &MsgDeleteRelease{}

func NewMsgDeleteRelease(creator string, id uint64) *MsgDeleteRelease {
	return &MsgDeleteRelease{
		Id:      id,
		Creator: creator,
	}
}
func (msg *MsgDeleteRelease) Route() string {
	return RouterKey
}

func (msg *MsgDeleteRelease) Type() string {
	return "DeleteRelease"
}

func (msg *MsgDeleteRelease) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgDeleteRelease) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgDeleteRelease) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
