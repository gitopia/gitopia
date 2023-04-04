package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgCreateComment{}

func NewMsgCreateComment(creator string, repositoryid uint64, parentIid uint64, parent CommentParent, body string, attachments []*Attachment, diffHunk string, path string, position uint64) *MsgCreateComment {
	return &MsgCreateComment{
		Creator:      creator,
		RepositoryId: repositoryid,
		ParentIid:    parentIid,
		Parent:       parent,
		Body:         body,
		Attachments:  attachments,
		DiffHunk:     diffHunk,
		Path:         path,
		Position:     position,
	}
}

func (msg *MsgCreateComment) Route() string {
	return RouterKey
}

func (msg *MsgCreateComment) Type() string {
	return "CreateComment"
}

func (msg *MsgCreateComment) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreateComment) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateComment) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	switch msg.Parent {
	case CommentParentIssue:
		if len(msg.Path) > 0 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Cannot provide Path with comment parent issue")
		}
		if len(msg.DiffHunk) > 0 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Cannot provide DiffHunk with comment parent issue")
		}
	case CommentParentPullRequest:
		if len(msg.Path) > 255 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Path exceeds limit: 255")
		}
		if len(msg.DiffHunk) > 255 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "DiffHunk exceeds limit: 255")
		}
	default:
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid parent (%s)", msg.Parent)
	}

	if err := ValidateCommentBody(msg.Body); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	if len(msg.Attachments) > 0 {
		if len(msg.Attachments) > 20 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "attachments exceeds limit: 20")
		}
		unique := make(map[string]bool, len(msg.Attachments))
		for _, attachment := range msg.Attachments {
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

	return nil
}

var _ sdk.Msg = &MsgUpdateComment{}

func NewMsgUpdateComment(creator string, repositoryid uint64, parentIid uint64, parent CommentParent, commentIid uint64, body string, attachments []*Attachment) *MsgUpdateComment {
	return &MsgUpdateComment{
		Creator:      creator,
		RepositoryId: repositoryid,
		ParentIid:    parentIid,
		Parent:       parent,
		CommentIid:   commentIid,
		Body:         body,
		Attachments:  attachments,
	}
}

func (msg *MsgUpdateComment) Route() string {
	return RouterKey
}

func (msg *MsgUpdateComment) Type() string {
	return "UpdateComment"
}

func (msg *MsgUpdateComment) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateComment) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateComment) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	switch msg.Parent {
	case CommentParentIssue:
	case CommentParentPullRequest:
	default:
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid parent (%s)", msg.Parent)
	}

	if err := ValidateCommentBody(msg.Body); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	if len(msg.Attachments) > 0 {
		if len(msg.Attachments) > 20 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "attachments exceeds limit: 20")
		}
		unique := make(map[string]bool, len(msg.Attachments))
		for _, attachment := range msg.Attachments {
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

	return nil
}

var _ sdk.Msg = &MsgDeleteComment{}

func NewMsgDeleteComment(creator string, repositoryid uint64, parentIid uint64, parent CommentParent, commentIid uint64) *MsgDeleteComment {
	return &MsgDeleteComment{
		Creator:      creator,
		RepositoryId: repositoryid,
		ParentIid:    parentIid,
		Parent:       parent,
		CommentIid:   commentIid,
	}
}
func (msg *MsgDeleteComment) Route() string {
	return RouterKey
}

func (msg *MsgDeleteComment) Type() string {
	return "DeleteComment"
}

func (msg *MsgDeleteComment) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgDeleteComment) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgDeleteComment) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	switch msg.Parent {
	case CommentParentIssue:
	case CommentParentPullRequest:
	default:
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid parent (%s)", msg.Parent)
	}
	return nil
}
