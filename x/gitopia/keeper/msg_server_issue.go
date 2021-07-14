package keeper

import (
	"context"
	"fmt"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func assignIid(ctx sdk.Context, k msgServer, repo types.Repository, repoId uint64) (uint64, error) {
	if !k.HasRepository(ctx, repoId) {
		return 0, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("Repository Id %d doesn't exist", repoId))
	}
	var len = uint64(len(repo.Issues) + 1)
	return len, nil
}

func (k msgServer) CreateIssue(goCtx context.Context, msg *types.MsgCreateIssue) (*types.MsgCreateIssueResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	repo := k.GetRepository(ctx, msg.RepositoryId)

	iid, err := assignIid(ctx, k, repo, msg.RepositoryId)
	if err != nil {
		return nil, err
	}
	state := string("open")
	comments := []uint64{}
	pullRequests := []uint64{}
	createdAt := time.Now().Unix()
	updatedAt := createdAt
	closedAt := time.Time{}.Unix()
	extensions := string("")

	var issue = types.Issue{
		Creator:      msg.Creator,
		Iid:          iid,
		Title:        msg.Title,
		State:        state,
		Description:  msg.Description,
		Comments:     comments,
		PullRequests: pullRequests,
		RepositoryId: msg.RepositoryId,
		Labels:       msg.Labels,
		Weight:       msg.Weight,
		Assignees:    msg.Assignees,
		CreatedAt:    createdAt,
		UpdatedAt:    updatedAt,
		ClosedAt:     closedAt,
		Extensions:   extensions,
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
