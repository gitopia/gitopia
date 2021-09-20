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

	// Checks that the element exists
	if !k.HasUser(ctx, msg.Creator) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("User (%v) doesn't exist", msg.Creator))
	}

	if !k.HasRepository(ctx, msg.HeadRepoId) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("headRepositoryId %d doesn't exist", msg.HeadRepoId))
	}

	headRepo := k.GetRepository(ctx, msg.HeadRepoId)

	if _, exists := utils.RepositoryBranchExists(headRepo.Branches, msg.HeadBranch); !exists {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("headBranch (%v) doesn't exist", msg.HeadBranch))
	}

	if !k.HasRepository(ctx, msg.BaseRepoId) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("baseRepositoryId %d doesn't exist", msg.BaseRepoId))
	}

	baseRepo := k.GetRepository(ctx, msg.BaseRepoId)

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
		HeadBranch:          msg.HeadBranch,
		HeadRepoId:          msg.HeadRepoId,
		BaseBranch:          msg.BaseBranch,
		BaseRepoId:          msg.BaseRepoId,
	}

	for _, r := range msg.Reviewers {
		if !k.HasUser(ctx, r) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("reviewer (%v) doesn't exist", r))
		}
		pullRequest.Reviewers = append(pullRequest.Reviewers, r)
	}

	for _, a := range msg.Assignees {
		if !k.HasUser(ctx, a) {
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

	// Checks that the element exists
	if !k.HasUser(ctx, msg.Creator) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("User %v doesn't exist", msg.Creator))
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

	// Checks that the element exists
	if !k.HasUser(ctx, msg.Creator) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("User %v doesn't exist", msg.Creator))
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

	// Checks that the element exists
	if !k.HasUser(ctx, msg.Creator) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("User %v doesn't exist", msg.Creator))
	}

	// Checks that the element exists
	if !k.HasPullRequest(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	var pullRequest = k.GetPullRequest(ctx, msg.Id)
	currentTime := ctx.BlockTime().Unix()

	repository := k.GetRepository(ctx, pullRequest.BaseRepoId)
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
