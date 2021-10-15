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

func (k msgServer) CreatePullRequest(goCtx context.Context, msg *types.MsgCreatePullRequest) (*types.MsgCreatePullRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	headRepo, found := k.GetRepository(ctx, msg.HeadRepoId)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("headRepositoryId id (%d) doesn't exist", msg.HeadRepoId))
	}

	if _, exists := utils.RepositoryBranchExists(headRepo.Branches, msg.HeadBranch); !exists {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("headBranch (%v) doesn't exist", msg.HeadBranch))
	}

	baseRepo, found := k.GetRepository(ctx, msg.BaseRepoId)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("baseRepositoryId id (%d) doesn't exist", msg.BaseRepoId))
	}

	if _, exists := utils.RepositoryBranchExists(baseRepo.Branches, msg.BaseBranch); !exists {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("baseBranch (%v) doesn't exist", msg.BaseBranch))
	}

	if !((msg.HeadRepoId == msg.BaseRepoId) && (msg.HeadBranch != msg.BaseBranch)) &&
		!(headRepo.Fork && (headRepo.Parent == msg.BaseRepoId)) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "operation not permitted")
	}

	baseRepo.PullsCount += 1

	createdAt := ctx.BlockTime().Unix()
	zeroTime := time.Time{}.Unix()

	head := types.PullRequestHead{
		RepositoryId: msg.HeadRepoId,
		Branch:       msg.HeadBranch,
	}

	base := types.PullRequestBase{
		RepositoryId: msg.BaseRepoId,
		Branch:       msg.BaseBranch,
	}

	var pullRequest = types.PullRequest{
		Creator:             msg.Creator,
		Iid:                 baseRepo.PullsCount,
		Title:               msg.Title,
		State:               types.PullRequest_OPEN,
		Description:         msg.Description,
		CommentsCount:       0,
		Locked:              false,
		Draft:               false,
		CreatedAt:           createdAt,
		UpdatedAt:           createdAt,
		ClosedAt:            zeroTime,
		MergedAt:            zeroTime,
		MaintainerCanModify: false,
		Head:                &head,
		Base:                &base,
	}

	for _, r := range msg.Reviewers {
		_, found := k.GetUser(ctx, r)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("reviewer (%v) doesn't exist", r))
		}
		pullRequest.Reviewers = append(pullRequest.Reviewers, r)
	}

	for _, a := range msg.Assignees {
		_, found := k.GetUser(ctx, a)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("assignee (%v) doesn't exist", a))
		}
		pullRequest.Assignees = append(pullRequest.Assignees, a)
	}

	for _, labelId := range msg.LabelIds {
		if i, exists := utils.RepositoryLabelIdExists(baseRepo.Labels, labelId); exists {
			pullRequest.Labels = append(pullRequest.Labels, baseRepo.Labels[i].Id)
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("label id (%v) doesn't exists in repository", labelId))
		}
	}

	id := k.AppendPullRequest(
		ctx,
		pullRequest,
	)

	var repositoryPullRequest = types.RepositoryPullRequest{
		Iid: baseRepo.PullsCount,
		Id:  id,
	}
	baseRepo.PullRequests = append(baseRepo.PullRequests, &repositoryPullRequest)

	k.SetRepository(ctx, baseRepo)

	return &types.MsgCreatePullRequestResponse{
		Id:  id,
		Iid: pullRequest.Iid,
	}, nil
}

func (k msgServer) UpdatePullRequest(goCtx context.Context, msg *types.MsgUpdatePullRequest) (*types.MsgUpdatePullRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Checks that the element exists
	if !k.HasPullRequest(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != k.GetPullRequestOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	var pullRequest = k.GetPullRequest(ctx, msg.Id)

	pullRequest.Title = msg.Title
	pullRequest.Description = msg.Description

	k.SetPullRequest(ctx, pullRequest)

	return &types.MsgUpdatePullRequestResponse{}, nil
}

func (k msgServer) UpdatePullRequestTitle(goCtx context.Context, msg *types.MsgUpdatePullRequestTitle) (*types.MsgUpdatePullRequestTitleResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	// Checks that the element exists
	if !k.HasPullRequest(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != k.GetPullRequestOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	var pullrequest = k.GetPullRequest(ctx, msg.Id)

	pullrequest.Title = msg.Title
	pullrequest.UpdatedAt = ctx.BlockTime().Unix()

	k.SetPullRequest(ctx, pullrequest)

	return &types.MsgUpdatePullRequestTitleResponse{}, nil
}

func (k msgServer) UpdatePullRequestDescription(goCtx context.Context, msg *types.MsgUpdatePullRequestDescription) (*types.MsgUpdatePullRequestDescriptionResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	// Checks that the element exists
	if !k.HasPullRequest(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != k.GetPullRequestOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	var pullrequest = k.GetPullRequest(ctx, msg.Id)

	pullrequest.Description = msg.Description
	pullrequest.UpdatedAt = ctx.BlockTime().Unix()

	k.SetPullRequest(ctx, pullrequest)

	return &types.MsgUpdatePullRequestDescriptionResponse{}, nil
}

func (k msgServer) SetPullRequestState(goCtx context.Context, msg *types.MsgSetPullRequestState) (*types.MsgSetPullRequestStateResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	// Checks that the element exists
	if !k.HasPullRequest(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	var pullRequest = k.GetPullRequest(ctx, msg.Id)
	currentTime := ctx.BlockTime().Unix()

	repository, found := k.GetRepository(ctx, pullRequest.Base.RepositoryId)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", pullRequest.Base.RepositoryId))
	}
	var havePermission bool = false

	ownerType := repository.Owner.Type

	if ownerType == types.RepositoryOwner_USER {
		if ((msg.State == types.PullRequest_OPEN.String() || msg.State == types.PullRequest_CLOSED.String()) && msg.Creator == pullRequest.Creator) || msg.Creator == repository.Owner.Id {
			havePermission = true
		}
	} else if ownerType == types.RepositoryOwner_ORGANIZATION {
		if !k.HasOrganization(ctx, repository.Owner.Id) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", repository.Owner.Id))
		}

		organization := k.GetOrganization(ctx, repository.Owner.Id)

		if (msg.State == types.PullRequest_OPEN.String() || msg.State == types.PullRequest_CLOSED.String()) && msg.Creator == pullRequest.Creator {
			havePermission = true
		}
		if !havePermission {
			if i, exists := utils.OrganizationMemberExists(organization.Members, msg.Creator); exists {
				if organization.Members[i].Role == types.OrganizationMember_OWNER {
					havePermission = true
				}
			}
		}
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("can't fetch baseRepository owner"))
	}

	if !havePermission {
		if i, exists := utils.RepositoryCollaboratorExists(repository.Collaborators, msg.Creator); exists {
			if repository.Collaborators[i].Permission == types.RepositoryCollaborator_ADMIN {
				havePermission = true
			}
		}
	}

	if !havePermission {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	switch msg.State {
	case types.PullRequest_OPEN.String():
		if pullRequest.State == types.PullRequest_OPEN || pullRequest.State == types.PullRequest_MERGED {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("can't open (%v) pullRequest", pullRequest.State.String()))
		}
		pullRequest.ClosedAt = time.Time{}.Unix()
		pullRequest.ClosedBy = ""
	case types.PullRequest_CLOSED.String():
		if pullRequest.State == types.PullRequest_CLOSED || pullRequest.State == types.PullRequest_MERGED {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("can't close (%v) pullRequest", pullRequest.State.String()))
		}
		pullRequest.ClosedAt = currentTime
		pullRequest.ClosedBy = msg.Creator
	case types.PullRequest_MERGED.String():
		if pullRequest.State == types.PullRequest_MERGED || pullRequest.State == types.PullRequest_CLOSED {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("can't merge (%v) pullRequest", pullRequest.State.String()))
		}
		pullRequest.MergedAt = currentTime
		pullRequest.MergedBy = msg.Creator
		pullRequest.MergeCommitSha = msg.MergeCommitSha
	default:
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("invalid state (%v)", msg.State))
	}

	state, exists := types.PullRequest_State_value[msg.State]
	if !exists {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("invalid state (%v)", msg.State))
	}

	pullRequest.State = types.PullRequest_State(state)
	pullRequest.UpdatedAt = currentTime

	k.SetPullRequest(ctx, pullRequest)

	return &types.MsgSetPullRequestStateResponse{
		State: pullRequest.State.String(),
	}, nil
}

func (k msgServer) AddPullRequestReviewers(goCtx context.Context, msg *types.MsgAddPullRequestReviewers) (*types.MsgAddPullRequestReviewersResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	// Checks that the element exists
	if !k.HasPullRequest(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != k.GetPullRequestOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	var pullrequest = k.GetPullRequest(ctx, msg.Id)

	if len(pullrequest.Reviewers)+len(msg.Reviewers) > 10 {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "pullRequest can't have more than 10 reviewers")
	}

	for _, r := range msg.Reviewers {
		if _, exists := utils.ReviewerExists(pullrequest.Reviewers, r); exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("reviewer (%v) already assigned", r))
		}
		_, found := k.GetUser(ctx, r)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("reviewer (%v) doesn't exist", r))
		}
		pullrequest.Reviewers = append(pullrequest.Reviewers, r)
	}

	pullrequest.CommentsCount += 1
	pullrequest.UpdatedAt = ctx.BlockTime().Unix()

	var comment = types.Comment{
		Creator:     "GITOPIA",
		ParentId:    msg.Id,
		CommentIid:  pullrequest.CommentsCount,
		Body:        utils.AddReviewersCommentBody(msg.Creator, msg.Reviewers),
		System:      true,
		CreatedAt:   pullrequest.UpdatedAt,
		UpdatedAt:   pullrequest.UpdatedAt,
		CommentType: types.Comment_PULLREQUEST,
	}

	id := k.AppendComment(
		ctx,
		comment,
	)

	pullrequest.Comments = append(pullrequest.Comments, id)

	k.SetPullRequest(ctx, pullrequest)

	return &types.MsgAddPullRequestReviewersResponse{}, nil
}

func (k msgServer) RemovePullRequestReviewers(goCtx context.Context, msg *types.MsgRemovePullRequestReviewers) (*types.MsgRemovePullRequestReviewersResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	// Checks that the element exists
	if !k.HasPullRequest(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != k.GetPullRequestOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	var pullrequest = k.GetPullRequest(ctx, msg.Id)

	if len(pullrequest.Reviewers) < len(msg.Reviewers) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "can't remove more than user assigned")
	}

	for _, r := range msg.Reviewers {
		if i, exists := utils.AssigneeExists(pullrequest.Reviewers, r); exists {
			pullrequest.Reviewers = append(pullrequest.Reviewers[:i], pullrequest.Reviewers[i+1:]...)
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("reviewer (%v) aren't assigned", r))
		}
	}

	pullrequest.CommentsCount += 1
	pullrequest.UpdatedAt = ctx.BlockTime().Unix()

	var comment = types.Comment{
		Creator:     "GITOPIA",
		ParentId:    msg.Id,
		CommentIid:  pullrequest.CommentsCount,
		Body:        utils.RemoveReviewersCommentBody(msg.Creator, msg.Reviewers),
		System:      true,
		CreatedAt:   pullrequest.UpdatedAt,
		UpdatedAt:   pullrequest.UpdatedAt,
		CommentType: types.Comment_PULLREQUEST,
	}

	id := k.AppendComment(
		ctx,
		comment,
	)

	pullrequest.Comments = append(pullrequest.Comments, id)

	k.SetPullRequest(ctx, pullrequest)

	return &types.MsgRemovePullRequestReviewersResponse{}, nil
}

func (k msgServer) AddPullRequestAssignees(goCtx context.Context, msg *types.MsgAddPullRequestAssignees) (*types.MsgAddPullRequestAssigneesResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	// Checks that the element exists
	if !k.HasPullRequest(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != k.GetPullRequestOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	var pullrequest = k.GetPullRequest(ctx, msg.Id)

	if len(pullrequest.Assignees)+len(msg.Assignees) > 10 {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "pullRequest can't have more than 10 assignees")
	}

	for _, a := range msg.Assignees {
		if _, exists := utils.AssigneeExists(pullrequest.Assignees, a); exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("assignee (%v) already assigned", a))
		}
		_, found := k.GetUser(ctx, a)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("assignee (%v) doesn't exist", a))
		}
		pullrequest.Assignees = append(pullrequest.Assignees, a)
	}

	pullrequest.CommentsCount += 1
	pullrequest.UpdatedAt = ctx.BlockTime().Unix()

	var comment = types.Comment{
		Creator:     "GITOPIA",
		ParentId:    msg.Id,
		CommentIid:  pullrequest.CommentsCount,
		Body:        utils.AddAssigneesCommentBody(msg.Creator, msg.Assignees),
		System:      true,
		CreatedAt:   pullrequest.UpdatedAt,
		UpdatedAt:   pullrequest.UpdatedAt,
		CommentType: types.Comment_PULLREQUEST,
	}

	id := k.AppendComment(
		ctx,
		comment,
	)

	pullrequest.Comments = append(pullrequest.Comments, id)

	k.SetPullRequest(ctx, pullrequest)

	return &types.MsgAddPullRequestAssigneesResponse{}, nil
}

func (k msgServer) RemovePullRequestAssignees(goCtx context.Context, msg *types.MsgRemovePullRequestAssignees) (*types.MsgRemovePullRequestAssigneesResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	// Checks that the element exists
	if !k.HasPullRequest(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != k.GetPullRequestOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	var pullrequest = k.GetPullRequest(ctx, msg.Id)

	if len(pullrequest.Assignees) < len(msg.Assignees) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "can't remove more than user assigned")
	}

	for _, a := range msg.Assignees {
		if i, exists := utils.AssigneeExists(pullrequest.Assignees, a); exists {
			pullrequest.Assignees = append(pullrequest.Assignees[:i], pullrequest.Assignees[i+1:]...)
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("assignee (%v) aren't assigned", a))
		}
	}

	pullrequest.CommentsCount += 1
	pullrequest.UpdatedAt = ctx.BlockTime().Unix()

	var comment = types.Comment{
		Creator:     "GITOPIA",
		ParentId:    msg.Id,
		CommentIid:  pullrequest.CommentsCount,
		Body:        utils.RemoveAssigneesCommentBody(msg.Creator, msg.Assignees),
		System:      true,
		CreatedAt:   pullrequest.UpdatedAt,
		UpdatedAt:   pullrequest.UpdatedAt,
		CommentType: types.Comment_PULLREQUEST,
	}

	id := k.AppendComment(
		ctx,
		comment,
	)

	pullrequest.Comments = append(pullrequest.Comments, id)

	k.SetPullRequest(ctx, pullrequest)

	return &types.MsgRemovePullRequestAssigneesResponse{}, nil
}

func (k msgServer) AddPullRequestLabels(goCtx context.Context, msg *types.MsgAddPullRequestLabels) (*types.MsgAddPullRequestLabelsResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	// Checks that the element exists
	if !k.HasPullRequest(ctx, msg.PullRequestId) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.PullRequestId))
	}

	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != k.GetPullRequestOwner(ctx, msg.PullRequestId) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	var pullRequest = k.GetPullRequest(ctx, msg.PullRequestId)

	repository, found := k.GetRepository(ctx, pullRequest.Base.RepositoryId)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", pullRequest.Base.RepositoryId))
	}

	if len(pullRequest.Labels)+len(msg.LabelIds) > 50 {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "pullRequest can't have more than 50 labels")
	}

	var labelNames []string

	for _, l := range msg.LabelIds {
		if i, exists := utils.RepositoryLabelIdExists(repository.Labels, l); exists {
			if _, exists := utils.LabelIdExists(pullRequest.Labels, repository.Labels[i].Id); exists {
				return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("label id (%v) already exists in pullRequest", l))
			}
			labelNames = append(labelNames, repository.Labels[i].Name)

			pullRequest.Labels = append(pullRequest.Labels, repository.Labels[i].Id)
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("label id (%v) doesn't exists in repository", l))
		}
	}

	pullRequest.CommentsCount += 1
	pullRequest.UpdatedAt = ctx.BlockTime().Unix()

	var comment = types.Comment{
		Creator:     "GITOPIA",
		ParentId:    msg.PullRequestId,
		CommentIid:  pullRequest.CommentsCount,
		Body:        utils.AddLabelsCommentBody(msg.Creator, labelNames),
		System:      true,
		CreatedAt:   pullRequest.UpdatedAt,
		UpdatedAt:   pullRequest.UpdatedAt,
		CommentType: types.Comment_PULLREQUEST,
	}

	id := k.AppendComment(
		ctx,
		comment,
	)

	pullRequest.Comments = append(pullRequest.Comments, id)

	k.SetPullRequest(ctx, pullRequest)

	return &types.MsgAddPullRequestLabelsResponse{}, nil
}

func (k msgServer) RemovePullRequestLabels(goCtx context.Context, msg *types.MsgRemovePullRequestLabels) (*types.MsgRemovePullRequestLabelsResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	// Checks that the element exists
	if !k.HasPullRequest(ctx, msg.PullRequestId) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.PullRequestId))
	}

	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != k.GetPullRequestOwner(ctx, msg.PullRequestId) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	var pullRequest = k.GetPullRequest(ctx, msg.PullRequestId)

	repository, found := k.GetRepository(ctx, pullRequest.Base.RepositoryId)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", pullRequest.Base.RepositoryId))
	}

	if len(pullRequest.Labels) < len(msg.LabelIds) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "can't remove more than existing labels")
	}

	var labelNames []string

	for _, l := range msg.LabelIds {
		if i, exists := utils.RepositoryLabelIdExists(repository.Labels, l); exists {
			if j, exists := utils.LabelIdExists(pullRequest.Labels, repository.Labels[i].Id); exists {
				labelNames = append(labelNames, repository.Labels[i].Name)

				pullRequest.Labels = append(pullRequest.Labels[:j], pullRequest.Labels[j+1:]...)
			} else {
				return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("label id (%v) doesn't exists in pullRequest", l))
			}
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("label id (%v) doesn't exists in repository", l))
		}
	}

	pullRequest.CommentsCount += 1
	pullRequest.UpdatedAt = ctx.BlockTime().Unix()

	var comment = types.Comment{
		Creator:     "GITOPIA",
		ParentId:    msg.PullRequestId,
		CommentIid:  pullRequest.CommentsCount,
		Body:        utils.RemoveLabelsCommentBody(msg.Creator, labelNames),
		System:      true,
		CreatedAt:   pullRequest.UpdatedAt,
		UpdatedAt:   pullRequest.UpdatedAt,
		CommentType: types.Comment_PULLREQUEST,
	}

	id := k.AppendComment(
		ctx,
		comment,
	)

	pullRequest.Comments = append(pullRequest.Comments, id)

	k.SetPullRequest(ctx, pullRequest)

	return &types.MsgRemovePullRequestLabelsResponse{}, nil
}

func (k msgServer) DeletePullRequest(goCtx context.Context, msg *types.MsgDeletePullRequest) (*types.MsgDeletePullRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasPullRequest(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}
	if msg.Creator != k.GetPullRequestOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.RemovePullRequest(ctx, msg.Id)

	return &types.MsgDeletePullRequestResponse{}, nil
}
