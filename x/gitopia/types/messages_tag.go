package types

import (
	"regexp"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const (
	TypeMsgSetTag         = "set_tag"
	TypeMsgMultiSetTag    = "multi_set_tag"
	TypeMsgDeleteTag      = "delete_tag"
	TypeMsgMultiDeleteTag = "multi_delete_tag"
)

var _ sdk.Msg = &MsgSetTag{}

func NewMsgSetTag(creator string, repositoryId RepositoryId, tag MsgSetTag_Tag) *MsgSetTag {
	return &MsgSetTag{
		Creator:      creator,
		RepositoryId: repositoryId,
		Tag:          tag,
	}
}

func (msg *MsgSetTag) Route() string {
	return RouterKey
}

func (msg *MsgSetTag) Type() string {
	return TypeMsgSetTag
}

func (msg *MsgSetTag) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgSetTag) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgSetTag) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if err := ValidateRepositoryId(msg.RepositoryId); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	if len(msg.Tag.Name) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "tag length exceeds limit: 255")
	} else if len(msg.Tag.Name) < 1 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "tag name can't be empty")
	}
	if valid, err := IsValidRefname(msg.Tag.Name); !valid {
		return err
	}
	isShaValid, _ := regexp.MatchString("^([0-9a-f]{40}|[0-9a-f]{64})$", msg.Tag.Sha)
	if !isShaValid {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid sha")
	}
	return nil
}

var _ sdk.Msg = &MsgMultiSetTag{}

func NewMsgMultiSetTag(creator string, repositoryId RepositoryId, tags []MsgMultiSetTag_Tag) *MsgMultiSetTag {
	return &MsgMultiSetTag{
		Creator:      creator,
		RepositoryId: repositoryId,
		Tags:         tags,
	}
}

func (msg *MsgMultiSetTag) Route() string {
	return RouterKey
}

func (msg *MsgMultiSetTag) Type() string {
	return TypeMsgMultiSetTag
}

func (msg *MsgMultiSetTag) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgMultiSetTag) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgMultiSetTag) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if err := ValidateRepositoryId(msg.RepositoryId); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	if len(msg.Tags) == 0 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "atleast one tag should be set")
	}

	for _, tag := range msg.Tags {
		if len(tag.Name) > 255 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "tag length exceeds limit: 255")
		} else if len(tag.Name) < 1 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "tag name can't be empty")
		}
		if valid, err := IsValidRefname(tag.Name); !valid {
			return err
		}
		isShaValid, _ := regexp.MatchString("^([0-9a-f]{40}|[0-9a-f]{64})$", tag.Sha)
		if !isShaValid {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid sha")
		}
	}
	return nil
}

var _ sdk.Msg = &MsgDeleteTag{}

func NewMsgDeleteTag(creator string, repositoryId RepositoryId, tag string) *MsgDeleteTag {
	return &MsgDeleteTag{
		Creator:      creator,
		RepositoryId: repositoryId,
		Tag:          tag,
	}
}

func (msg *MsgDeleteTag) Route() string {
	return RouterKey
}

func (msg *MsgDeleteTag) Type() string {
	return TypeMsgDeleteTag
}

func (msg *MsgDeleteTag) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgDeleteTag) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgDeleteTag) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if err := ValidateRepositoryId(msg.RepositoryId); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	if len(msg.Tag) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "tag length exceeds limit: 255")
	} else if len(msg.Tag) < 1 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "tag name can't be empty")
	}
	if valid, err := IsValidRefname(msg.Tag); !valid {
		return err
	}
	return nil
}

var _ sdk.Msg = &MsgMultiDeleteTag{}

func NewMsgMultiDeleteTag(creator string, repositoryId RepositoryId, tags []string) *MsgMultiDeleteTag {
	return &MsgMultiDeleteTag{
		Creator:      creator,
		RepositoryId: repositoryId,
		Tags:         tags,
	}
}

func (msg *MsgMultiDeleteTag) Route() string {
	return RouterKey
}

func (msg *MsgMultiDeleteTag) Type() string {
	return TypeMsgMultiDeleteTag
}

func (msg *MsgMultiDeleteTag) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgMultiDeleteTag) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgMultiDeleteTag) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if err := ValidateRepositoryId(msg.RepositoryId); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	if len(msg.Tags) == 0 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "atleast one tag should be set")
	}

	for _, tag := range msg.Tags {
		if len(tag) > 255 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "tag length exceeds limit: 255")
		} else if len(tag) < 1 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "tag name can't be empty")
		}
		if valid, err := IsValidRefname(tag); !valid {
			return err
		}
	}
	return nil
}
