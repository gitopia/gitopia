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

	blockTime := ctx.BlockTime().Unix()

	var bounty = types.Bounty{
		Creator:   msg.Creator,
		Amount:    msg.Amount,
		State:     types.BountyStateSRCDEBITTED,
		ParentId:  msg.ParentId,
		Parent:    msg.Parent,
		ExpireAt:  msg.Expiry,
		CreatedAt: blockTime,
		UpdatedAt: blockTime,
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

	bounty, found := k.GetBounty(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("bounty with key %d doesn't exist", msg.Id))
	}

	if msg.Creator != bounty.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	bounty.Amount = msg.Amount
	bounty.ExpireAt = msg.Expiry
	bounty.UpdatedAt = ctx.BlockTime().Unix()

	k.SetBounty(ctx, bounty)

	return &types.MsgUpdateBountyResponse{}, nil
}

func (k msgServer) DeleteBounty(goCtx context.Context, msg *types.MsgDeleteBounty) (*types.MsgDeleteBountyResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Checks that the element exists
	bounty, found := k.GetBounty(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	// Checks if the msg creator is the same as the current owner
	if msg.Creator != bounty.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.RemoveBounty(ctx, msg.Id)

	return &types.MsgDeleteBountyResponse{}, nil
}
