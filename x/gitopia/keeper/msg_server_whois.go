package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func (k msgServer) CreateWhois(goCtx context.Context, msg *types.MsgCreateWhois) (*types.MsgCreateWhoisResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	id := k.AppendWhois(
		ctx,
		msg.Creator,
		msg.Address,
	)

	return &types.MsgCreateWhoisResponse{
		Id: id,
	}, nil
}

func (k msgServer) UpdateWhois(goCtx context.Context, msg *types.MsgUpdateWhois) (*types.MsgUpdateWhoisResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var whois = types.Whois{
		Creator: msg.Creator,
		Id:      msg.Id,
		Address: msg.Address,
	}

	// Checks that the element exists
	if !k.HasWhois(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != k.GetWhoisOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.SetWhois(ctx, whois)

	return &types.MsgUpdateWhoisResponse{}, nil
}

func (k msgServer) DeleteWhois(goCtx context.Context, msg *types.MsgDeleteWhois) (*types.MsgDeleteWhoisResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasWhois(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}
	if msg.Creator != k.GetWhoisOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.RemoveWhois(ctx, msg.Id)

	return &types.MsgDeleteWhoisResponse{}, nil
}
