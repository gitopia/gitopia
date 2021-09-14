package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgCreateRelease{}

func NewMsgCreateRelease(creator string, repositoryId uint64, tagName string, target string, name string, description string, attachments string, draft bool, preRelease bool, isTag bool) *MsgCreateRelease {
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
	if len(msg.TagName) > 63 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "tagName length exceeds limit: 63")
	} else if len(msg.TagName) < 1 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "tagName too short")
	}
	if len(msg.Target) > 63 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "target branch length exceeds limit: 63")
	} else if len(msg.Target) < 1 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "target branch too short")
	}
	if len(msg.Name) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "release name length exceeds limit: 255")
	} else if len(msg.Name) < 1 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "release name too short")
	}
	if len(msg.Description) > 20000 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "release description length exceeds limit: 20000")
	}
	if len(msg.Attachments) > 20 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "attachments exceeds limit: 20")
	}
	return nil
}

var _ sdk.Msg = &MsgUpdateRelease{}

func NewMsgUpdateRelease(creator string, id uint64, tagName string, target string, name string, description string, attachments string, draft bool, preRelease bool, isTag bool) *MsgUpdateRelease {
	return &MsgUpdateRelease{
		Id:          id,
		Creator:     creator,
		TagName:     tagName,
		Target:      target,
		Name:        name,
		Description: description,
		Attachments: attachments,
		Draft:       draft,
		PreRelease:  preRelease,
		IsTag:       isTag,
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
	if len(msg.TagName) > 63 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "tagName length exceeds limit: 63")
	} else if len(msg.TagName) < 1 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "tagName too short")
	}
	if len(msg.Target) > 63 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "target branch length exceeds limit: 63")
	} else if len(msg.Target) < 1 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "target branch too short")
	}
	if len(msg.Name) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "release name length exceeds limit: 255")
	} else if len(msg.Name) < 1 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "release name too short")
	}
	if len(msg.Description) > 20000 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "release description length exceeds limit: 20000")
	}
	if len(msg.Attachments) > 20 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "attachments exceeds limit: 20")
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
