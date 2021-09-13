package keeper

import (
	"context"
	"fmt"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/gitopia/gitopia/x/gitopia/utils"
)

func (k msgServer) CreateIssue(goCtx context.Context, msg *types.MsgCreateIssue) (*types.MsgCreateIssueResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasUser(ctx, msg.Creator) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.Creator))
	}

	if !k.HasRepository(ctx, msg.RepositoryId) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository Id %d doesn't exist", msg.RepositoryId))
	}

	repository := k.GetRepository(ctx, msg.RepositoryId)
	repository.IssuesCount += 1

	createdAt := ctx.BlockTime().Unix()
	closedAt := time.Time{}.Unix()

	for _, a := range msg.Assignees {
		if !k.HasUser(ctx, a) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("assignee (%v) doesn't exist", a))
		}
	}

	var issue = types.Issue{
		Creator:       msg.Creator,
		Iid:           repository.IssuesCount,
		Title:         msg.Title,
		State:         types.Issue_OPEN,
		Description:   msg.Description,
		CommentsCount: 0,
		RepositoryId:  msg.RepositoryId,
		Weight:        msg.Weight,
		Assignees:     msg.Assignees,
		CreatedAt:     createdAt,
		UpdatedAt:     createdAt,
		ClosedAt:      closedAt,
	}

	for _, l := range msg.Labels {
		if i, exists := utils.RepositoryLabelExists(repository.Labels, l); exists {
			issue.Labels = append(issue.Labels, repository.Labels[i].Id)
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("label (%v) doesn't exists in repository", l))
		}
	}

	id := k.AppendIssue(
		ctx,
		issue,
	)

	var repositoryIssue = types.RepositoryIssue{
		Iid: repository.IssuesCount,
		Id:  id,
	}

	repository.Issues = append(repository.Issues, &repositoryIssue)

	k.SetRepository(ctx, repository)

	return &types.MsgCreateIssueResponse{
		Id:  id,
		Iid: issue.Iid,
	}, nil
}

func (k msgServer) UpdateIssue(goCtx context.Context, msg *types.MsgUpdateIssue) (*types.MsgUpdateIssueResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var issue = k.GetIssue(ctx, msg.Id)

	issue.Title = msg.Title
	issue.Description = msg.Description
	issue.Weight = msg.Weight
	issue.UpdatedAt = ctx.BlockTime().Unix()
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

	if !k.HasUser(ctx, msg.Creator) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.Creator))
	}

	// Checks that the element exists
	if !k.HasIssue(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != k.GetIssueOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	var issue = k.GetIssue(ctx, msg.Id)

	oldTitle := issue.Title

	issue.Title = msg.Title
	issue.UpdatedAt = ctx.BlockTime().Unix()
	issue.CommentsCount += 1

	var comment = types.Comment{
		Creator:     "GITOPIA",
		ParentId:    msg.Id,
		CommentIid:  issue.CommentsCount,
		Body:        utils.IssueUpdateTitleCommentBody(msg.Creator, oldTitle, issue.Title),
		System:      true,
		CreatedAt:   issue.UpdatedAt,
		UpdatedAt:   issue.UpdatedAt,
		CommentType: types.Comment_ISSUE,
	}

	id := k.AppendComment(
		ctx,
		comment,
	)

	issue.Comments = append(issue.Comments, id)

	k.SetIssue(ctx, issue)

	return &types.MsgUpdateIssueTitleResponse{}, nil
}

func (k msgServer) UpdateIssueDescription(goCtx context.Context, msg *types.MsgUpdateIssueDescription) (*types.MsgUpdateIssueDescriptionResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasUser(ctx, msg.Creator) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.Creator))
	}

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
	issue.UpdatedAt = ctx.BlockTime().Unix()
	issue.CommentsCount += 1

	var comment = types.Comment{
		Creator:     "GITOPIA",
		ParentId:    msg.Id,
		CommentIid:  issue.CommentsCount,
		Body:        utils.IssueUpdateDescriptionCommentBody(msg.Creator),
		System:      true,
		CreatedAt:   issue.UpdatedAt,
		UpdatedAt:   issue.UpdatedAt,
		CommentType: types.Comment_ISSUE,
	}

	id := k.AppendComment(
		ctx,
		comment,
	)

	issue.Comments = append(issue.Comments, id)

	k.SetIssue(ctx, issue)

	return &types.MsgUpdateIssueDescriptionResponse{}, nil
}

func (k msgServer) ToggleIssueState(goCtx context.Context, msg *types.MsgToggleIssueState) (*types.MsgToggleIssueStateResponse, error) {
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

	if issue.State == types.Issue_OPEN {
		issue.State = types.Issue_CLOSED
		issue.ClosedBy = msg.Creator
		issue.ClosedAt = ctx.BlockTime().Unix()
	} else if issue.State == types.Issue_CLOSED {
		issue.State = types.Issue_OPEN
		issue.ClosedBy = string("")
		issue.ClosedAt = time.Time{}.Unix()
	} else {
		/* TODO: specify error */
		return nil, sdkerrors.Error{}
	}

	issue.CommentsCount += 1
	issue.UpdatedAt = ctx.BlockTime().Unix()

	var comment = types.Comment{
		Creator:     "GITOPIA",
		ParentId:    msg.Id,
		CommentIid:  issue.CommentsCount,
		Body:        utils.IssueToggleStateCommentBody(msg.Creator, issue.State),
		System:      true,
		CreatedAt:   issue.UpdatedAt,
		UpdatedAt:   issue.UpdatedAt,
		CommentType: types.Comment_ISSUE,
	}

	id := k.AppendComment(
		ctx,
		comment,
	)

	issue.Comments = append(issue.Comments, id)

	k.SetIssue(ctx, issue)

	return &types.MsgToggleIssueStateResponse{
		State: issue.State.String(),
	}, nil
}

func (k msgServer) AddIssueAssignees(goCtx context.Context, msg *types.MsgAddIssueAssignees) (*types.MsgAddIssueAssigneesResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasUser(ctx, msg.Creator) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.Creator))
	}

	// Checks that the element exists
	if !k.HasIssue(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != k.GetIssueOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	var issue = k.GetIssue(ctx, msg.Id)

	if len(issue.Assignees)+len(msg.Assignees) > 10 {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "issue can't have more than 10 assignees")
	}

	for _, a := range msg.Assignees {
		if _, exists := utils.IssueAssigneeExists(issue.Assignees, a); exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("assignee (%v) already assigned", a))
		}
		if !k.HasUser(ctx, a) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("assignee (%v) doesn't exist", a))
		}
		issue.Assignees = append(issue.Assignees, a)
	}

	issue.CommentsCount += 1
	issue.UpdatedAt = ctx.BlockTime().Unix()

	var comment = types.Comment{
		Creator:     "GITOPIA",
		ParentId:    msg.Id,
		CommentIid:  issue.CommentsCount,
		Body:        utils.IssueAddAssigneesCommentBody(msg.Creator, msg.Assignees),
		System:      true,
		CreatedAt:   issue.UpdatedAt,
		UpdatedAt:   issue.UpdatedAt,
		CommentType: types.Comment_ISSUE,
	}

	id := k.AppendComment(
		ctx,
		comment,
	)

	issue.Comments = append(issue.Comments, id)

	k.SetIssue(ctx, issue)

	return &types.MsgAddIssueAssigneesResponse{}, nil
}

func (k msgServer) RemoveIssueAssignees(goCtx context.Context, msg *types.MsgRemoveIssueAssignees) (*types.MsgRemoveIssueAssigneesResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasUser(ctx, msg.Creator) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.Creator))
	}

	// Checks that the element exists
	if !k.HasIssue(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != k.GetIssueOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	var issue = k.GetIssue(ctx, msg.Id)

	if len(issue.Assignees) < len(msg.Assignees) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "can't remove more than user assigned")
	}

	for _, a := range msg.Assignees {
		if i, exists := utils.IssueAssigneeExists(issue.Assignees, a); exists {
			issue.Assignees = append(issue.Assignees[:i], issue.Assignees[i+1:]...)
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("assignee (%v) aren't assigned", a))
		}
	}

	issue.CommentsCount += 1
	issue.UpdatedAt = ctx.BlockTime().Unix()

	var comment = types.Comment{
		Creator:     "GITOPIA",
		ParentId:    msg.Id,
		CommentIid:  issue.CommentsCount,
		Body:        utils.IssueRemoveAssigneesCommentBody(msg.Creator, msg.Assignees),
		System:      true,
		CreatedAt:   issue.UpdatedAt,
		UpdatedAt:   issue.UpdatedAt,
		CommentType: types.Comment_ISSUE,
	}

	id := k.AppendComment(
		ctx,
		comment,
	)

	issue.Comments = append(issue.Comments, id)

	k.SetIssue(ctx, issue)

	return &types.MsgRemoveIssueAssigneesResponse{}, nil
}

func (k msgServer) AddIssueLabels(goCtx context.Context, msg *types.MsgAddIssueLabels) (*types.MsgAddIssueLabelsResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasUser(ctx, msg.Creator) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.Creator))
	}

	// Checks that the element exists
	if !k.HasIssue(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != k.GetIssueOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	var issue = k.GetIssue(ctx, msg.Id)

	repository := k.GetRepository(ctx, issue.RepositoryId)

	if len(issue.Labels)+len(msg.Labels) > 50 {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "issue can't have more than 50 labels")
	}

	for _, l := range msg.Labels {
		if i, exists := utils.RepositoryLabelExists(repository.Labels, l); exists {
			if _, exists := utils.IssueLabelExists(issue.Labels, repository.Labels[i].Id); exists {
				return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("label (%v) already exists in issue", l))
			}
			issue.Labels = append(issue.Labels, repository.Labels[i].Id)
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("label (%v) doesn't exists in repository", l))
		}
	}

	issue.CommentsCount += 1
	issue.UpdatedAt = ctx.BlockTime().Unix()

	var comment = types.Comment{
		Creator:     "GITOPIA",
		ParentId:    msg.Id,
		CommentIid:  issue.CommentsCount,
		Body:        utils.IssueAddLabelsCommentBody(msg.Creator, msg.Labels),
		System:      true,
		CreatedAt:   issue.UpdatedAt,
		UpdatedAt:   issue.UpdatedAt,
		CommentType: types.Comment_ISSUE,
	}

	id := k.AppendComment(
		ctx,
		comment,
	)

	issue.Comments = append(issue.Comments, id)

	k.SetIssue(ctx, issue)

	return &types.MsgAddIssueLabelsResponse{}, nil
}

func (k msgServer) RemoveIssueLabels(goCtx context.Context, msg *types.MsgRemoveIssueLabels) (*types.MsgRemoveIssueLabelsResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasUser(ctx, msg.Creator) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.Creator))
	}

	// Checks that the element exists
	if !k.HasIssue(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != k.GetIssueOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	var issue = k.GetIssue(ctx, msg.Id)

	repository := k.GetRepository(ctx, issue.RepositoryId)

	if len(issue.Labels) < len(msg.Labels) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "can't remove more than existing labels")
	}

	for _, l := range msg.Labels {
		if i, exists := utils.RepositoryLabelExists(repository.Labels, l); exists {
			if j, exists := utils.IssueLabelExists(issue.Labels, repository.Labels[i].Id); exists {
				issue.Labels = append(issue.Labels[:j], issue.Labels[j+1:]...)
			} else {
				return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("label (%v) doesn't exists in issue", l))
			}
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("label (%v) doesn't exists in repository", l))
		}
	}

	issue.CommentsCount += 1
	issue.UpdatedAt = ctx.BlockTime().Unix()

	var comment = types.Comment{
		Creator:     "GITOPIA",
		ParentId:    msg.Id,
		CommentIid:  issue.CommentsCount,
		Body:        utils.IssueRemoveLabelsCommentBody(msg.Creator, msg.Labels),
		System:      true,
		CreatedAt:   issue.UpdatedAt,
		UpdatedAt:   issue.UpdatedAt,
		CommentType: types.Comment_ISSUE,
	}

	id := k.AppendComment(
		ctx,
		comment,
	)

	issue.Comments = append(issue.Comments, id)

	k.SetIssue(ctx, issue)

	return &types.MsgRemoveIssueLabelsResponse{}, nil
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
