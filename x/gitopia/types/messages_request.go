package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgUpdateRequest{}

func NewMsgUpdateRequest(creator string, id uint64, message string) *MsgUpdateRequest {
	return &MsgUpdateRequest{
		Id:      id,
		Creator: creator,
		Message: message,
	}
}

func (msg *MsgUpdateRequest) Route() string {
	return RouterKey
}

func (msg *MsgUpdateRequest) Type() string {
	return "UpdateRequest"
}

func (msg *MsgUpdateRequest) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateRequest) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateRequest) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

var _ sdk.Msg = &MsgChangeRequestState{}

func NewMsgChangeRequestState(creator string, id uint64, state string) *MsgChangeRequestState {
	return &MsgChangeRequestState{
		Id:      id,
		Creator: creator,
		State:   state,
	}
}

func (msg *MsgChangeRequestState) Route() string {
	return RouterKey
}

func (msg *MsgChangeRequestState) Type() string {
	return "ChangeRequestState"
}

func (msg *MsgChangeRequestState) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgChangeRequestState) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgChangeRequestState) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

var _ sdk.Msg = &MsgDeleteRequest{}

func NewMsgDeleteRequest(creator string, id uint64) *MsgDeleteRequest {
	return &MsgDeleteRequest{
		Id:      id,
		Creator: creator,
	}
}
func (msg *MsgDeleteRequest) Route() string {
	return RouterKey
}

func (msg *MsgDeleteRequest) Type() string {
	return "DeleteRequest"
}

func (msg *MsgDeleteRequest) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgDeleteRequest) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgDeleteRequest) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
