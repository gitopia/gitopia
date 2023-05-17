package keeper

import (
	"context"
	"fmt"
	"strconv"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/v2/x/gitopia/types"
)

func (k msgServer) CreateTask(goCtx context.Context, msg *types.MsgCreateTask) (*types.MsgCreateTaskResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var task = types.Task{
		Creator:  msg.Creator,
		Type:     msg.TaskType,
		Provider: msg.Provider,
		State:    types.StatePending,
	}

	id := k.AppendTask(
		ctx,
		task,
	)

	return &types.MsgCreateTaskResponse{
		Id: id,
	}, nil
}

func (k msgServer) UpdateTask(goCtx context.Context, msg *types.MsgUpdateTask) (*types.MsgUpdateTaskResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Checks that the element exists
	task, found := k.GetTask(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	if task.State != types.StatePending {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "only pending state can be updated")
	}

	// Checks if the msg creator is the same as the current owner
	if msg.Creator != task.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	task.State = msg.State
	task.Message = msg.Message

	k.SetTask(ctx, task)

	if task.State == types.StateFailure {
		switch task.Type {
		case types.TypeForkRepository:
			ctx.EventManager().EmitEvent(
				sdk.NewEvent(sdk.EventTypeMessage,
					sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
					sdk.NewAttribute(sdk.AttributeKeyAction, types.ForkRepositoryEventKey),
					sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
					sdk.NewAttribute(types.EventAttributeTaskIdKey, strconv.FormatUint(task.Id, 10)),
					sdk.NewAttribute(types.EventAttributeTaskStateKey, task.State.String()),
					sdk.NewAttribute(types.EventAttributeMessageKey, task.Message),
				),
			)
		case types.TypeSetPullRequestState:
			ctx.EventManager().EmitEvent(
				sdk.NewEvent(sdk.EventTypeMessage,
					sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
					sdk.NewAttribute(sdk.AttributeKeyAction, types.SetPullRequestStateEventKey),
					sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
					sdk.NewAttribute(types.EventAttributePullRequestIdKey, strconv.FormatUint(msg.Id, 10)),
					sdk.NewAttribute(types.EventAttributeTaskIdKey, strconv.FormatUint(task.Id, 10)),
					sdk.NewAttribute(types.EventAttributeTaskStateKey, task.State.String()),
					sdk.NewAttribute(types.EventAttributeMessageKey, task.Message),
				),
			)
		}
	}
	return &types.MsgUpdateTaskResponse{}, nil
}

func (k msgServer) DeleteTask(goCtx context.Context, msg *types.MsgDeleteTask) (*types.MsgDeleteTaskResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Checks that the element exists
	val, found := k.GetTask(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	// Checks if the msg creator is the same as the current owner
	if msg.Creator != val.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.RemoveTask(ctx, msg.Id)

	return &types.MsgDeleteTaskResponse{}, nil
}
