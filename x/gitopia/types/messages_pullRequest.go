package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgCreatePullRequest{}

func NewMsgCreatePullRequest(creator string, repositoryId uint64, title string, description string, head string, base string) *MsgCreatePullRequest {
	return &MsgCreatePullRequest{
		Creator:      creator,
		RepositoryId: repositoryId,
		Title:        title,
		Description:  description,
		Head:         head,
		Base:         base,
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
