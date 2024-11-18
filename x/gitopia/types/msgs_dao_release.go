package types

import (
	"encoding/json"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgDaoCreateRelease{}

// Route implements the sdk.Msg interface.
func (msg *MsgDaoCreateRelease) Route() string {
	return RouterKey
}

// Type implements the sdk.Msg interface.
func (msg *MsgDaoCreateRelease) Type() string {
	return "dao_create_release"
}

// GetSigners implements the sdk.Msg interface. It denotes who needs to sign the message.
func (msg *MsgDaoCreateRelease) GetSigners() []sdk.AccAddress {
	addr, err := sdk.AccAddressFromBech32(msg.Admin)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{addr}
}

// GetSignBytes implements the sdk.Msg interface.
func (msg *MsgDaoCreateRelease) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

// ValidateBasic implements the sdk.Msg interface.
func (msg *MsgDaoCreateRelease) ValidateBasic() error {
	// Validate admin address
	_, err := sdk.AccAddressFromBech32(msg.Admin)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid admin address (%s)", err)
	}

	if err := ValidateRepositoryId(msg.RepositoryId); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
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
	if msg.Attachments != "" {
		attachments := []*Attachment{}
		if err := json.Unmarshal([]byte(msg.Attachments), &attachments); err != nil {
			return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "unable to unmarshal attachments")
		}
		if len(attachments) > 20 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "attachments exceeds limit: 20")
		} else if len(attachments) > 0 {
			unique := make(map[string]bool, len(attachments))
			for _, attachment := range attachments {
				if attachment.Size_ == 0 {
					return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "attachment size can't be 0")
				}
				if attachment.Name == "" {
					return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "attachment name can't be empty")
				}
				if attachment.Sha == "" {
					return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "attachment sha can't be empty")
				}
				_, err := sdk.AccAddressFromBech32(attachment.Uploader)
				if err != nil {
					return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid uploader (%v)", attachment.Uploader)
				}
				if !unique[attachment.Name] {
					unique[attachment.Name] = true
				} else {
					return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "duplicate name (%s)", attachment.Name)
				}
			}
		}
	}

	return nil
}
