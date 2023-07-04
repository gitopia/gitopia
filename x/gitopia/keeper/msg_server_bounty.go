package keeper

import (
	"context"
	"encoding/json"
	"fmt"
	"strconv"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/v2/x/gitopia/types"
	"github.com/gitopia/gitopia/v2/x/gitopia/utils"
)

func (k msgServer) CreateBounty(goCtx context.Context, msg *types.MsgCreateBounty) (*types.MsgCreateBountyResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	blockTime := ctx.BlockTime().Unix()

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	if msg.Expiry < blockTime {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "expire time can't be less then current time")
	}

	var issue types.Issue
	switch msg.Parent {
	case types.BountyParentIssue:
		issue, found = k.GetRepositoryIssue(ctx, msg.RepositoryId, msg.ParentIid)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("issue (%d) doesn't exist", msg.ParentIid))
		}
		if len(issue.Assignees) > 1 {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "issue with bounty can't have more then 1 assignee")
		}
	default:
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid bounty parent")
	}

	var bounty = types.Bounty{
		Creator:      msg.Creator,
		Amount:       msg.Amount,
		State:        types.BountyStateSRCDEBITTED,
		RepositoryId: msg.RepositoryId,
		ParentIid:    msg.ParentIid,
		Parent:       msg.Parent,
		ExpireAt:     msg.Expiry,
		CreatedAt:    blockTime,
		UpdatedAt:    blockTime,
	}

	if err := k.bankKeeper.IsSendEnabledCoins(ctx, msg.Amount...); err != nil {
		return nil, err
	}

	creatorAccAddress, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil, err
	}
	bountyAddress := GetBountyAddress(k.GetBountyCount(ctx))
	err = k.bankKeeper.SendCoins(ctx, creatorAccAddress, bountyAddress, msg.Amount)
	if err != nil {
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
		issue.CommentsCount += 1
		issue.UpdatedAt = blockTime

		var comment = types.Comment{
			Creator:      "GITOPIA",
			RepositoryId: msg.RepositoryId,
			ParentIid:    msg.ParentIid,
			Parent:       types.CommentParentIssue,
			CommentIid:   issue.CommentsCount,
			Body:         utils.CreateBountyCommentBody(msg.Creator, msg.Amount),
			System:       true,
			CreatedAt:    blockTime,
			UpdatedAt:    blockTime,
			CommentType:  types.CommentTypeAddBounty,
		}

		k.AppendComment(
			ctx,
			comment,
		)
		k.SetIssue(ctx, issue)
	default:
		return nil, sdkerrors.Wrap(sdkerrors.ErrLogic, "invalid bounty parent")
	}

	bountyAmountJson, _ := json.Marshal(bounty.Amount)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.CreateBountyEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(issue.RepositoryId, 10)),
			sdk.NewAttribute(types.EventAttributeBountyIdKey, strconv.FormatUint(id, 10)),
			sdk.NewAttribute(types.EventAttributeBountyAmountKey, string(bountyAmountJson)),
			sdk.NewAttribute(types.EventAttributeBountyStateKey, bounty.State.String()),
			sdk.NewAttribute(types.EventAttributeBountyParentKey, bounty.Parent.String()),
			sdk.NewAttribute(types.EventAttributeBountyParentIdKey, strconv.FormatUint(issue.Id, 10)),
			sdk.NewAttribute(types.EventAttributeBountyParentIidKey, strconv.FormatUint(bounty.ParentIid, 10)),
			sdk.NewAttribute(types.EventAttributeBountyExpiry, strconv.FormatInt(bounty.ExpireAt, 10)),
			sdk.NewAttribute(types.EventAttributeCreatedAtKey, strconv.FormatInt(bounty.CreatedAt, 10)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(bounty.UpdatedAt, 10)),
		),
	)

	return &types.MsgCreateBountyResponse{
		Id: id,
	}, nil
}

func (k msgServer) UpdateBountyExpiry(goCtx context.Context, msg *types.MsgUpdateBountyExpiry) (*types.MsgUpdateBountyExpiryResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	blockTime := ctx.BlockTime().Unix()

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

	if msg.Expiry < blockTime {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "expire time can't be less then current time")
	}

	if bounty.State != types.BountyStateSRCDEBITTED {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "bounty already closed")
	}

	var issue types.Issue
	switch bounty.Parent {
	case types.BountyParentIssue:
		issue, found = k.GetRepositoryIssue(ctx, bounty.RepositoryId, bounty.ParentIid)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("issue (%d) doesn't exist", bounty.ParentIid))
		}
		if len(issue.PullRequests) > 0 {
			if msg.Expiry < bounty.ExpireAt {
				return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "contains open PR")
			}
		}
	default:
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid bounty parent")
	}

	bounty.ExpireAt = msg.Expiry
	bounty.UpdatedAt = blockTime

	k.SetBounty(ctx, bounty)

	/* can never be default */
	switch bounty.Parent {
	case types.BountyParentIssue:
		issue.CommentsCount += 1
		issue.UpdatedAt = blockTime

		var comment = types.Comment{
			Creator:      "GITOPIA",
			RepositoryId: bounty.RepositoryId,
			ParentIid:    bounty.ParentIid,
			Parent:       types.CommentParentIssue,
			CommentIid:   issue.CommentsCount,
			Body:         utils.UpdateBountyExpiryCommentBody(msg.Creator),
			System:       true,
			CreatedAt:    blockTime,
			UpdatedAt:    blockTime,
			CommentType:  types.CommentTypeModifiedBounty,
		}

		k.AppendComment(
			ctx,
			comment,
		)
		k.SetIssue(ctx, issue)
	default:
		return nil, sdkerrors.Wrap(sdkerrors.ErrLogic, "invalid bounty parent")
	}

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.UpdateBountyExpiryEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(issue.RepositoryId, 10)),
			sdk.NewAttribute(types.EventAttributeBountyIdKey, strconv.FormatUint(bounty.Id, 10)),
			sdk.NewAttribute(types.EventAttributeBountyParentKey, bounty.Parent.String()),
			sdk.NewAttribute(types.EventAttributeBountyParentIdKey, strconv.FormatUint(issue.Id, 10)),
			sdk.NewAttribute(types.EventAttributeBountyParentIidKey, strconv.FormatUint(bounty.ParentIid, 10)),
			sdk.NewAttribute(types.EventAttributeBountyExpiry, strconv.FormatInt(bounty.ExpireAt, 10)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(bounty.UpdatedAt, 10)),
		),
	)

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
		issue, found = k.GetRepositoryIssue(ctx, bounty.RepositoryId, bounty.ParentIid)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("issue id (%d) doesn't exist", bounty.ParentIid))
		}
		if len(issue.PullRequests) > 0 {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "can't close bounty; contains open PR")
		}
	default:
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid bounty parent")
	}

	creatorAccAddress, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil, err
	}

	if err := k.bankKeeper.IsSendEnabledCoins(ctx, bounty.Amount...); err != nil {
		return nil, err
	}
	if k.bankKeeper.BlockedAddr(creatorAccAddress) {
		return nil, sdkerrors.Wrapf(sdkerrors.ErrUnauthorized, "%s is not allowed to receive funds", msg.Creator)
	}

	bountyAddress := GetBountyAddress(bounty.Id)
	if err := k.bankKeeper.SendCoins(
		ctx, bountyAddress, creatorAccAddress, bounty.Amount,
	); err != nil {
		return nil, err
	}

	blockTime := ctx.BlockTime().Unix()
	bounty.State = types.BountyStateREVERTEDBACK
	bounty.ExpireAt = time.Time{}.Unix()
	bounty.UpdatedAt = blockTime

	k.SetBounty(ctx, bounty)

	/* can never be default */
	switch bounty.Parent {
	case types.BountyParentIssue:
		issue.CommentsCount += 1
		issue.UpdatedAt = blockTime

		var comment = types.Comment{
			Creator:      "GITOPIA",
			RepositoryId: bounty.RepositoryId,
			ParentIid:    bounty.ParentIid,
			Parent:       types.CommentParentIssue,
			CommentIid:   issue.CommentsCount,
			Body:         utils.CloseBountyCommentBody(msg.Creator),
			System:       true,
			CreatedAt:    blockTime,
			UpdatedAt:    blockTime,
			CommentType:  types.CommentTypeClosedBounty,
		}

		k.AppendComment(
			ctx,
			comment,
		)
		k.SetIssue(ctx, issue)
	default:
		return nil, sdkerrors.Wrap(sdkerrors.ErrLogic, "invalid bounty parent")
	}

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.CloseBountyEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(issue.RepositoryId, 10)),
			sdk.NewAttribute(types.EventAttributeBountyIdKey, strconv.FormatUint(bounty.Id, 10)),
			sdk.NewAttribute(types.EventAttributeBountyStateKey, bounty.State.String()),
			sdk.NewAttribute(types.EventAttributeBountyParentKey, bounty.Parent.String()),
			sdk.NewAttribute(types.EventAttributeBountyParentIdKey, strconv.FormatUint(issue.Id, 10)),
			sdk.NewAttribute(types.EventAttributeBountyParentIidKey, strconv.FormatUint(bounty.ParentIid, 10)),
			sdk.NewAttribute(types.EventAttributeBountyExpiry, strconv.FormatInt(bounty.ExpireAt, 10)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(bounty.UpdatedAt, 10)),
		),
	)

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
		issue, found = k.GetRepositoryIssue(ctx, bounty.RepositoryId, bounty.ParentIid)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("issue id (%d) doesn't exist", bounty.ParentIid))
		}

		if len(issue.PullRequests) > 0 {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "can't delete bounty; contains open PR")
		}

		if i, exists := utils.BountyIdExists(issue.Bounties, bounty.Id); exists {
			issue.Bounties = append(issue.Bounties[:i], issue.Bounties[i+1:]...)
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("can't find bountyId (%d) under issue (%d)", bounty.Id, bounty.ParentIid))
		}
	default:
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid bounty parent")
	}

	if bounty.State == types.BountyStateSRCDEBITTED {
		creatorAccAddress, err := sdk.AccAddressFromBech32(msg.Creator)
		if err != nil {
			return nil, err
		}

		if err := k.bankKeeper.IsSendEnabledCoins(ctx, bounty.Amount...); err != nil {
			return nil, err
		}
		if k.bankKeeper.BlockedAddr(creatorAccAddress) {
			return nil, sdkerrors.Wrapf(sdkerrors.ErrUnauthorized, "%s is not allowed to receive funds", msg.Creator)
		}

		bountyAddress := GetBountyAddress(bounty.Id)
		if err := k.bankKeeper.SendCoins(
			ctx, bountyAddress, creatorAccAddress, bounty.Amount,
		); err != nil {
			return nil, err
		}
	}

	k.RemoveBounty(ctx, msg.Id)

	blockTime := ctx.BlockTime().Unix()

	/* can never be default */
	switch bounty.Parent {
	case types.BountyParentIssue:
		issue.CommentsCount += 1
		issue.UpdatedAt = blockTime

		var comment = types.Comment{
			Creator:      "GITOPIA",
			RepositoryId: bounty.RepositoryId,
			ParentIid:    bounty.ParentIid,
			Parent:       types.CommentParentIssue,
			CommentIid:   issue.CommentsCount,
			Body:         utils.DeleteBountyCommentBody(msg.Creator),
			System:       true,
			CreatedAt:    blockTime,
			UpdatedAt:    blockTime,
			CommentType:  types.CommentTypeNone,
		}

		k.AppendComment(
			ctx,
			comment,
		)
		k.SetIssue(ctx, issue)
	default:
		return nil, sdkerrors.Wrap(sdkerrors.ErrLogic, "invalid bounty parent")
	}

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.DeleteBountyEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(issue.RepositoryId, 10)),
			sdk.NewAttribute(types.EventAttributeBountyIdKey, strconv.FormatUint(bounty.Id, 10)),
			sdk.NewAttribute(types.EventAttributeBountyParentKey, bounty.Parent.String()),
			sdk.NewAttribute(types.EventAttributeBountyParentIdKey, strconv.FormatUint(issue.Id, 10)),
			sdk.NewAttribute(types.EventAttributeBountyParentIidKey, strconv.FormatUint(bounty.ParentIid, 10)),
		),
	)

	return &types.MsgDeleteBountyResponse{}, nil
}
