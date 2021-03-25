package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func (k msgServer) SetWhois(goCtx context.Context, msg *types.MsgSetWhois) (*types.MsgSetWhoisResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var whois = types.Whois{
		Creator: msg.Creator,
		Name:    msg.Name,
		Address: msg.Address,
	}

	k.Keeper.SetWhois(
		ctx,
		msg.Name,
		whois,
	)

	return &types.MsgSetWhoisResponse{}, nil
}

func (k msgServer) UpdateWhois(goCtx context.Context, msg *types.MsgUpdateWhois) (*types.MsgUpdateWhoisResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var whois = types.Whois{
		Creator: msg.Creator,
		Name:    msg.Name,
		Address: msg.Address,
	}

	// Checks that the element exists
	if !k.HasWhois(ctx, msg.Name) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Name))
	}

	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != k.GetWhoisOwner(ctx, msg.Name) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.Keeper.SetWhois(ctx, whois.Name, whois)

	return &types.MsgUpdateWhoisResponse{}, nil
}

func (k msgServer) DeleteWhois(goCtx context.Context, msg *types.MsgDeleteWhois) (*types.MsgDeleteWhoisResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasWhois(ctx, msg.Name) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Name))
	}
	if msg.Creator != k.GetWhoisOwner(ctx, msg.Name) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.RemoveWhois(ctx, msg.Name)

	return &types.MsgDeleteWhoisResponse{}, nil
}
