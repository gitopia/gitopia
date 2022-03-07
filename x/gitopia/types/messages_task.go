package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const (
	TypeMsgCreateTask = "create_task"
	TypeMsgUpdateTask = "update_task"
	TypeMsgDeleteTask = "delete_task"
)

var _ sdk.Msg = &MsgCreateTask{}

func NewMsgCreateTask(creator string, taskType TaskType, provider string) *MsgCreateTask {
	return &MsgCreateTask{
		Creator:  creator,
		TaskType: taskType,
		Provider: provider,
	}
}

func (msg *MsgCreateTask) Route() string {
	return RouterKey
}

func (msg *MsgCreateTask) Type() string {
	return TypeMsgCreateTask
}

func (msg *MsgCreateTask) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreateTask) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateTask) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

var _ sdk.Msg = &MsgUpdateTask{}

func NewMsgUpdateTask(creator string, id uint64, state TaskState, message string) *MsgUpdateTask {
	return &MsgUpdateTask{
		Id:      id,
		Creator: creator,
		State:   state,
		Message: message,
	}
}

func (msg *MsgUpdateTask) Route() string {
	return RouterKey
}

func (msg *MsgUpdateTask) Type() string {
	return TypeMsgUpdateTask
}

func (msg *MsgUpdateTask) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateTask) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateTask) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	_, exists := TaskState_value[msg.State.String()]
	if !exists {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid task state (%s)", msg.State.String())
	}
	return nil
}

var _ sdk.Msg = &MsgDeleteTask{}

func NewMsgDeleteTask(creator string, id uint64) *MsgDeleteTask {
	return &MsgDeleteTask{
		Id:      id,
		Creator: creator,
	}
}
func (msg *MsgDeleteTask) Route() string {
	return RouterKey
}

func (msg *MsgDeleteTask) Type() string {
	return TypeMsgDeleteTask
}

func (msg *MsgDeleteTask) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgDeleteTask) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgDeleteTask) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
