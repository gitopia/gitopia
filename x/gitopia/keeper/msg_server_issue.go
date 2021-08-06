package keeper

import (
	"context"
	"fmt"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func (k msgServer) CreateIssue(goCtx context.Context, msg *types.MsgCreateIssue) (*types.MsgCreateIssueResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasRepository(ctx, msg.RepositoryId) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository Id %d doesn't exist", msg.RepositoryId))
	}

	repo := k.GetRepository(ctx, msg.RepositoryId)
	repo.IssuesCount += 1

	createdAt := time.Now().Unix()
	closedAt := time.Time{}.Unix()

	var issue = types.Issue{
		Creator:       msg.Creator,
		Iid:           repo.IssuesCount,
		Title:         msg.Title,
		State:         "Open",
		Description:   msg.Description,
		CommentsCount: 0,
		RepositoryId:  msg.RepositoryId,
		Labels:        msg.Labels,
		Weight:        msg.Weight,
		Assignees:     msg.Assignees,
		CreatedAt:     createdAt,
		UpdatedAt:     createdAt,
		ClosedAt:      closedAt,
	}

	id := k.AppendIssue(
		ctx,
		issue,
	)

	/* Append Issue in the respective Repository */
	repo.Issues = append(repo.Issues, id)
	k.SetRepository(ctx, repo)

	return &types.MsgCreateIssueResponse{
		Id: id,
	}, nil
}

func (k msgServer) UpdateIssue(goCtx context.Context, msg *types.MsgUpdateIssue) (*types.MsgUpdateIssueResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var issue = k.GetIssue(ctx, msg.Id)

	issue.Title = msg.Title
	issue.Description = msg.Description
	issue.Labels = msg.Labels
	issue.Weight = msg.Weight
	issue.UpdatedAt = time.Now().Unix()
	issue.Assignees = msg.Assignees

	// Checks that the element exists
	if !k.HasIssue(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != k.GetIssueOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.SetIssue(ctx, issue)

	return &types.MsgUpdateIssueResponse{}, nil
}

func (k msgServer) UpdateIssueTitle(goCtx context.Context, msg *types.MsgUpdateIssueTitle) (*types.MsgUpdateIssueTitleResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Checks that the element exists
	if !k.HasIssue(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != k.GetIssueOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	var issue = k.GetIssue(ctx, msg.Id)

	issue.Title = msg.Title
	issue.UpdatedAt = time.Now().Unix()

	k.SetIssue(ctx, issue)

	return &types.MsgUpdateIssueTitleResponse{}, nil
}

func (k msgServer) UpdateIssueDescription(goCtx context.Context, msg *types.MsgUpdateIssueDescription) (*types.MsgUpdateIssueDescriptionResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Checks that the element exists
	if !k.HasIssue(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != k.GetIssueOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	var issue = k.GetIssue(ctx, msg.Id)

	issue.Description = msg.Description
	issue.UpdatedAt = time.Now().Unix()

	k.SetIssue(ctx, issue)

	return &types.MsgUpdateIssueDescriptionResponse{}, nil
}

func (k msgServer) ToggleIssueState(goCtx context.Context, msg *types.MsgToggleIssueState) (*types.MsgToggleIssueStateResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var issue = k.GetIssue(ctx, msg.Id)

	if issue.State == "open" {
		issue.State = "closed"
		issue.ClosedBy = msg.Creator
		issue.ClosedAt = time.Now().Unix()
	} else if issue.State == "closed" {
		issue.State = "open"
		issue.ClosedBy = string("")
		issue.ClosedAt = time.Time{}.Unix()
	} else {
		/* TODO: specify error */
		return nil, sdkerrors.Error{}
	}

	// Checks that the element exists
	if !k.HasIssue(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != k.GetIssueOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.SetIssue(ctx, issue)

	return &types.MsgToggleIssueStateResponse{
		State: issue.State,
	}, nil
}

func (k msgServer) DeleteIssue(goCtx context.Context, msg *types.MsgDeleteIssue) (*types.MsgDeleteIssueResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasIssue(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}
	if msg.Creator != k.GetIssueOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.RemoveIssue(ctx, msg.Id)

	return &types.MsgDeleteIssueResponse{}, nil
}
