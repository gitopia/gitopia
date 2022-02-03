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

	whois, found := k.GetWhois(ctx, msg.Name)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("whois (%v) doesn't exist", msg.Name))
	}

	if msg.Creator != whois.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	whois.Creator = msg.Creator
	whois.Name = msg.Name
	whois.Address = msg.Address

	k.Keeper.SetWhois(ctx, whois.Name, whois)

	return &types.MsgUpdateWhoisResponse{}, nil
}

func (k msgServer) DeleteWhois(goCtx context.Context, msg *types.MsgDeleteWhois) (*types.MsgDeleteWhoisResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	whois, found := k.GetWhois(ctx, msg.Name)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("whois (%v) doesn't exist", msg.Name))
	}

	if msg.Creator != whois.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.RemoveWhois(ctx, msg.Name)

	return &types.MsgDeleteWhoisResponse{}, nil
}
