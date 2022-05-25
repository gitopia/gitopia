package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func (k msgServer) CreateBounty(goCtx context.Context, msg *types.MsgCreateBounty) (*types.MsgCreateBountyResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var bounty = types.Bounty{
		Creator:   msg.Creator,
		Amount:    msg.Amount,
		State:     msg.State,
		Deadline:  msg.Deadline,
		ParentId:  msg.ParentId,
		Parent:    msg.Parent,
		CreatedAt: msg.CreatedAt,
		UpdatedAt: msg.UpdatedAt,
	}

	id := k.AppendBounty(
		ctx,
		bounty,
	)

	return &types.MsgCreateBountyResponse{
		Id: id,
	}, nil
}

func (k msgServer) UpdateBounty(goCtx context.Context, msg *types.MsgUpdateBounty) (*types.MsgUpdateBountyResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var bounty = types.Bounty{
		Creator:   msg.Creator,
		Id:        msg.Id,
		Amount:    msg.Amount,
		State:     msg.State,
		Deadline:  msg.Deadline,
		ParentId:  msg.ParentId,
		Parent:    msg.Parent,
		CreatedAt: msg.CreatedAt,
		UpdatedAt: msg.UpdatedAt,
	}

	// Checks that the element exists
	val, found := k.GetBounty(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	// Checks if the msg creator is the same as the current owner
	if msg.Creator != val.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.SetBounty(ctx, bounty)

	return &types.MsgUpdateBountyResponse{}, nil
}

func (k msgServer) DeleteBounty(goCtx context.Context, msg *types.MsgDeleteBounty) (*types.MsgDeleteBountyResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Checks that the element exists
	val, found := k.GetBounty(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	// Checks if the msg creator is the same as the current owner
	if msg.Creator != val.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.RemoveBounty(ctx, msg.Id)

	return &types.MsgDeleteBountyResponse{}, nil
}
