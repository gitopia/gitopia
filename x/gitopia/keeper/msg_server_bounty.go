package keeper

import (
	"context"
	"fmt"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	ibcTypes "github.com/cosmos/ibc-go/v2/modules/apps/transfer/types"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func (k msgServer) CreateBounty(goCtx context.Context, msg *types.MsgCreateBounty) (*types.MsgCreateBountyResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	var issue types.Issue
	switch msg.Parent {
	case types.BountyParentIssue:
		issue, found = k.GetIssue(ctx, msg.ParentId)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("issue id (%d) doesn't exist", msg.ParentId))
		}
		if len(issue.Assignees) > 1 {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "issue with bounty can't have more then 1 assignee")
		}
	default:
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid bounty parent")
	}

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

	escrowAddress := ibcTypes.GetEscrowAddress(types.BountyPortId, types.BountyChannelId)

	if err := k.bankKeeper.SendCoins(
		ctx, sdk.AccAddress(msg.Creator), escrowAddress, msg.Amount,
	); err != nil {
		return nil, err
	}

	id := k.AppendBounty(
		ctx,
		bounty,
	)

	/* can never be default */
	switch msg.Parent {
	case types.BountyParentIssue:
		issue.Bounties = append(issue.Bounties, id)
		k.SetIssue(ctx, issue)
	default:
		return nil, sdkerrors.Wrap(sdkerrors.ErrLogic, "invalid bounty parent")
	}

	return &types.MsgCreateBountyResponse{
		Id: id,
	}, nil
}

func (k msgServer) UpdateBountyExpiry(goCtx context.Context, msg *types.MsgUpdateBountyExpiry) (*types.MsgUpdateBountyExpiryResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	bounty, found := k.GetBounty(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("bounty with key %d doesn't exist", msg.Id))
	}

	if msg.Creator != bounty.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	var issue types.Issue
	switch bounty.Parent {
	case types.BountyParentIssue:
		issue, found = k.GetIssue(ctx, bounty.ParentId)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("issue id (%d) doesn't exist", bounty.ParentId))
		}
	default:
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid bounty parent")
	}

	if len(issue.PullRequests) > 0 {
		if msg.Expiry < bounty.ExpireAt {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "contains open PR")
		}
	}

	bounty.ExpireAt = msg.Expiry
	bounty.UpdatedAt = ctx.BlockTime().Unix()

	k.SetBounty(ctx, bounty)

	return &types.MsgUpdateBountyExpiryResponse{}, nil
}

func (k msgServer) CloseBounty(goCtx context.Context, msg *types.MsgCloseBounty) (*types.MsgCloseBountyResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	bounty, found := k.GetBounty(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	if msg.Creator != bounty.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	if bounty.State != types.BountyStateSRCDEBITTED {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "bounty already closed")
	}

	var issue types.Issue
	switch bounty.Parent {
	case types.BountyParentIssue:
		issue, found = k.GetIssue(ctx, bounty.ParentId)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("issue id (%d) doesn't exist", bounty.ParentId))
		}
	default:
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid bounty parent")
	}

	if len(issue.PullRequests) > 0 {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "can't close bounty; contains open PR")
	}

	escrowAddress := ibcTypes.GetEscrowAddress(types.BountyPortId, types.BountyChannelId)

	if err := k.bankKeeper.SendCoins(
		ctx, escrowAddress, sdk.AccAddress(bounty.Creator), bounty.Amount,
	); err != nil {
		return nil, err
	}

	bounty.State = types.BountyStateREVERTEDBACK
	bounty.ExpireAt = time.Time{}.Unix()

	k.RemoveBounty(ctx, msg.Id)

	return &types.MsgCloseBountyResponse{}, nil
}

func (k msgServer) DeleteBounty(goCtx context.Context, msg *types.MsgDeleteBounty) (*types.MsgDeleteBountyResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	bounty, found := k.GetBounty(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	if msg.Creator != bounty.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	var issue types.Issue
	switch bounty.Parent {
	case types.BountyParentIssue:
		issue, found = k.GetIssue(ctx, bounty.ParentId)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("issue id (%d) doesn't exist", bounty.ParentId))
		}
	default:
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid bounty parent")
	}

	if len(issue.PullRequests) > 0 {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "can't delete bounty; contains open PR")
	}

	if bounty.State == types.BountyStateSRCDEBITTED {
		escrowAddress := ibcTypes.GetEscrowAddress(types.BountyPortId, types.BountyChannelId)

		if err := k.bankKeeper.SendCoins(
			ctx, escrowAddress, sdk.AccAddress(bounty.Creator), bounty.Amount,
		); err != nil {
			return nil, err
		}
	}

	k.RemoveBounty(ctx, msg.Id)

	return &types.MsgDeleteBountyResponse{}, nil
}
