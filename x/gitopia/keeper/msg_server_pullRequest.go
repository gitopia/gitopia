package keeper

import (
	"context"
	"encoding/json"
	"fmt"
	"strconv"
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

	headRepository, found := k.GetAddressRepository(ctx, msg.HeadRepositoryId.Id, msg.HeadRepositoryId.Name)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("head-repository (%v/%v) doesn't exist", msg.HeadRepositoryId.Id, msg.HeadRepositoryId.Name))
	}

	if !k.HavePermission(ctx, msg.Creator, headRepository, types.PullRequestCreatePermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	if _, found := k.GetRepositoryBranch(ctx, headRepository.Id, msg.HeadBranch); !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("head-branch (%v) doesn't exist", msg.HeadBranch))
	}

	baseRepository, found := k.GetAddressRepository(ctx, msg.BaseRepositoryId.Id, msg.BaseRepositoryId.Name)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("base-repository (%v/%v) doesn't exist", msg.BaseRepositoryId.Id, msg.BaseRepositoryId.Name))
	}

	if _, found := k.GetRepositoryBranch(ctx, baseRepository.Id, msg.BaseBranch); !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("base-branch (%v) doesn't exist", msg.BaseBranch))
	}

	if !((headRepository.Id == baseRepository.Id) && (msg.HeadBranch != msg.BaseBranch)) &&
		!(headRepository.Fork && (headRepository.Parent == baseRepository.Id)) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "operation not permitted")
	}

	for _, p := range baseRepository.PullRequests {
		pullRequest, _ := k.GetPullRequest(ctx, p.Id)
		if pullRequest.Head.RepositoryId == headRepository.Id &&
			pullRequest.State == types.PullRequest_OPEN &&
			pullRequest.Base.Branch == msg.BaseBranch &&
			pullRequest.Head.Branch == msg.HeadBranch {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "pullRequest already exists")
		}
	}

	baseRepository.PullsCount += 1

	createdAt := ctx.BlockTime().Unix()
	zeroTime := time.Time{}.Unix()

	head := types.PullRequestHead{
		RepositoryId: headRepository.Id,
		Branch:       msg.HeadBranch,
	}

	base := types.PullRequestBase{
		RepositoryId: baseRepository.Id,
		Branch:       msg.BaseBranch,
	}

	var pullRequest = types.PullRequest{
		Creator:             msg.Creator,
		Iid:                 baseRepository.PullsCount,
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
		if i, exists := utils.RepositoryLabelIdExists(baseRepository.Labels, labelId); exists {
			pullRequest.Labels = append(pullRequest.Labels, baseRepository.Labels[i].Id)
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("label id (%v) doesn't exists in repository", labelId))
		}
	}

	id := k.AppendPullRequest(
		ctx,
		pullRequest,
	)

	var repositoryPullRequest = types.RepositoryPullRequest{
		Iid: baseRepository.PullsCount,
		Id:  id,
	}
	baseRepository.PullRequests = append(baseRepository.PullRequests, &repositoryPullRequest)

	k.SetRepository(ctx, baseRepository)

	return &types.MsgCreatePullRequestResponse{
		Id:  id,
		Iid: pullRequest.Iid,
	}, nil
}

func (k msgServer) UpdatePullRequestTitle(goCtx context.Context, msg *types.MsgUpdatePullRequestTitle) (*types.MsgUpdatePullRequestTitleResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	pullRequest, found := k.GetPullRequest(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("pullRequest id (%d) doesn't exist", msg.Id))
	}

	if pullRequest.Title == msg.Title {
		return &types.MsgUpdatePullRequestTitleResponse{}, nil
	}

	if msg.Creator != pullRequest.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	oldTitle := pullRequest.Title

	pullRequest.Title = msg.Title
	pullRequest.UpdatedAt = ctx.BlockTime().Unix()
	pullRequest.CommentsCount += 1

	var comment = types.Comment{
		Creator:     "GITOPIA",
		ParentId:    msg.Id,
		CommentIid:  pullRequest.CommentsCount,
		Body:        utils.UpdateTitleCommentBody(msg.Creator, oldTitle, pullRequest.Title),
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

	return &types.MsgUpdatePullRequestTitleResponse{}, nil
}

func (k msgServer) UpdatePullRequestDescription(goCtx context.Context, msg *types.MsgUpdatePullRequestDescription) (*types.MsgUpdatePullRequestDescriptionResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	pullRequest, found := k.GetPullRequest(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("pullRequest id (%d) doesn't exist", msg.Id))
	}

	if pullRequest.Description == msg.Description {
		return &types.MsgUpdatePullRequestDescriptionResponse{}, nil
	}

	if msg.Creator != pullRequest.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	pullRequest.Description = msg.Description
	pullRequest.UpdatedAt = ctx.BlockTime().Unix()
	pullRequest.CommentsCount += 1

	var comment = types.Comment{
		Creator:     "GITOPIA",
		ParentId:    msg.Id,
		CommentIid:  pullRequest.CommentsCount,
		Body:        utils.UpdateDescriptionCommentBody(msg.Creator),
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

	return &types.MsgUpdatePullRequestDescriptionResponse{}, nil
}

func (k msgServer) InvokeMergePullRequest(goCtx context.Context, msg *types.MsgInvokeMergePullRequest) (*types.MsgInvokeMergePullRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	pullRequest, found := k.GetPullRequest(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("pullRequest id (%d) doesn't exist", msg.Id))
	}

	baseRepository, found := k.GetRepositoryById(ctx, pullRequest.Base.RepositoryId)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", pullRequest.Base.RepositoryId))
	}

	if !k.HavePermission(ctx, msg.Creator, baseRepository, types.RepositoryCollaborator_ADMIN) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	id := k.AppendTask(ctx, types.Task{
		Type:     types.TaskType(types.TypeSetPullRequestState),
		State:    types.TaskState(types.StatePending),
		Creator:  msg.Creator,
		Provider: msg.Provider,
	})

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.InvokeMergePullRequestEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributePullRequestIdKey, strconv.FormatUint(msg.Id, 10)),
			sdk.NewAttribute(types.EventAttributeTaskIdKey, strconv.FormatUint(id, 10)),
		),
	)
	return &types.MsgInvokeMergePullRequestResponse{}, nil
}

func (k msgServer) SetPullRequestState(goCtx context.Context, msg *types.MsgSetPullRequestState) (*types.MsgSetPullRequestStateResponse, error) {
	var task types.Task
	var found bool

	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found = k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	pullRequest, found := k.GetPullRequest(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("pullRequest id (%d) doesn't exist", msg.Id))
	}

	task, _ = k.GetTask(ctx, msg.TaskId)

	currentTime := ctx.BlockTime().Unix()

	baseRepository, found := k.GetRepositoryById(ctx, pullRequest.Base.RepositoryId)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", pullRequest.Base.RepositoryId))
	}

	var havePermission bool = false

	if baseRepository.Owner.Type == types.OwnerType_USER {
		if ((msg.State == types.PullRequest_OPEN.String() || msg.State == types.PullRequest_CLOSED.String()) && msg.Creator == pullRequest.Creator) || msg.Creator == baseRepository.Owner.Id {
			havePermission = true
		}
	} else if baseRepository.Owner.Type == types.OwnerType_DAO {
		if (msg.State == types.PullRequest_OPEN.String() || msg.State == types.PullRequest_CLOSED.String()) && msg.Creator == pullRequest.Creator {
			havePermission = true
		}
		if !havePermission {
			member, found := k.GetDaoMember(ctx, baseRepository.Owner.Id, msg.Creator)
			if found && member.Role == types.MemberRole_OWNER {
				havePermission = true
			}
		}
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "can't fetch baseRepository owner")
	}

	if !havePermission {
		if i, exists := utils.RepositoryCollaboratorExists(baseRepository.Collaborators, msg.Creator); exists {
			if baseRepository.Collaborators[i].Permission == types.RepositoryCollaborator_ADMIN {
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

		// Update the branch ref in the base repository
		baseBranch, found := k.GetRepositoryBranch(ctx, baseRepository.Id, pullRequest.Base.Branch)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("baseBranch (%v) doesn't exist", pullRequest.Base.Branch))

		}
		pullRequest.Head.CommitSha = baseBranch.Sha
		baseBranch.Sha = msg.MergeCommitSha
		baseBranch.UpdatedAt = currentTime

		headRepository, found := k.GetRepositoryById(ctx, pullRequest.Head.RepositoryId)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", pullRequest.Head.RepositoryId))
		}

		if branch, found := k.GetRepositoryBranch(ctx, headRepository.Id, pullRequest.Head.Branch); found {
			pullRequest.Head.CommitSha = branch.Sha
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("headBranch (%v) doesn't exist", pullRequest.Head.Branch))
		}

		pullRequest.MergedAt = currentTime
		pullRequest.MergedBy = msg.Creator
		pullRequest.MergeCommitSha = msg.MergeCommitSha

		// Update task state
		if task.Creator != msg.Creator {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "unauthorized")
		}

		task.State = types.StateSuccess
		k.SetTask(ctx, task)
		k.SetRepositoryBranch(ctx, baseBranch)
	default:
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("invalid state (%v)", msg.State))
	}

	pullRequest.State = types.PullRequest_State(types.PullRequest_State_value[msg.State])
	pullRequest.UpdatedAt = currentTime
	pullRequest.CommentsCount += 1

	var comment = types.Comment{
		Creator:     "GITOPIA",
		ParentId:    msg.Id,
		CommentIid:  pullRequest.CommentsCount,
		Body:        utils.PullRequestToggleStateCommentBody(msg.Creator, pullRequest.State),
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

	k.SetRepository(ctx, baseRepository)
	k.SetPullRequest(ctx, pullRequest)

	isGitRefUpdated := false
	if pullRequest.State == types.PullRequest_MERGED {
		isGitRefUpdated = true
	}

	repoId := types.RepositoryId{
		Id:   baseRepository.Owner.Id,
		Name: baseRepository.Name,
	}
	baseRepoKeyJson, err := json.Marshal(repoId)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrLogic, "error encoding repository id to json")
	}

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.SetPullRequestStateEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributePullRequestIdKey, strconv.FormatUint(msg.Id, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestStateKey, msg.State),
			sdk.NewAttribute(types.EventAttributePullRequestMergeCommitShaKey, msg.MergeCommitSha),
			sdk.NewAttribute(types.EventAttributeTaskIdKey, strconv.FormatUint(msg.TaskId, 10)),
			sdk.NewAttribute(types.EventAttributeTaskStateKey, task.State.String()),
			sdk.NewAttribute(types.EventAttributeRepoNameKey, baseRepository.Name),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(baseRepository.Id, 10)),
			sdk.NewAttribute(types.EventAttributeBaseRepoKeyKey, string(baseRepoKeyJson)),
			sdk.NewAttribute(types.EventAttributeIsGitRefUpdatedKey, strconv.FormatBool(isGitRefUpdated)),
			sdk.NewAttribute(types.EventAttributeEnableArweaveBackupKey, strconv.FormatBool(baseRepository.EnableArweaveBackup)),
		),
	)

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

	pullRequest, found := k.GetPullRequest(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("pullRequest id (%d) doesn't exist", msg.Id))
	}

	if msg.Creator != pullRequest.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	if len(pullRequest.Reviewers)+len(msg.Reviewers) > 10 {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "pullRequest can't have more than 10 reviewers")
	}

	for _, r := range msg.Reviewers {
		if _, exists := utils.ReviewerExists(pullRequest.Reviewers, r); exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("reviewer (%v) already assigned", r))
		}
		_, found := k.GetUser(ctx, r)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("reviewer (%v) doesn't exist", r))
		}
		pullRequest.Reviewers = append(pullRequest.Reviewers, r)
	}

	pullRequest.CommentsCount += 1
	pullRequest.UpdatedAt = ctx.BlockTime().Unix()

	var comment = types.Comment{
		Creator:     "GITOPIA",
		ParentId:    msg.Id,
		CommentIid:  pullRequest.CommentsCount,
		Body:        utils.AddReviewersCommentBody(msg.Creator, msg.Reviewers),
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

	return &types.MsgAddPullRequestReviewersResponse{}, nil
}

func (k msgServer) RemovePullRequestReviewers(goCtx context.Context, msg *types.MsgRemovePullRequestReviewers) (*types.MsgRemovePullRequestReviewersResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	pullRequest, found := k.GetPullRequest(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("pullRequest id (%d) doesn't exist", msg.Id))
	}

	if msg.Creator != pullRequest.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	if len(pullRequest.Reviewers) < len(msg.Reviewers) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "can't remove more than user assigned")
	}

	for _, r := range msg.Reviewers {
		if i, exists := utils.ReviewerExists(pullRequest.Reviewers, r); exists {
			pullRequest.Reviewers = append(pullRequest.Reviewers[:i], pullRequest.Reviewers[i+1:]...)
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("reviewer (%v) aren't assigned", r))
		}
	}

	pullRequest.CommentsCount += 1
	pullRequest.UpdatedAt = ctx.BlockTime().Unix()

	var comment = types.Comment{
		Creator:     "GITOPIA",
		ParentId:    msg.Id,
		CommentIid:  pullRequest.CommentsCount,
		Body:        utils.RemoveReviewersCommentBody(msg.Creator, msg.Reviewers),
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

	return &types.MsgRemovePullRequestReviewersResponse{}, nil
}

func (k msgServer) AddPullRequestAssignees(goCtx context.Context, msg *types.MsgAddPullRequestAssignees) (*types.MsgAddPullRequestAssigneesResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	pullRequest, found := k.GetPullRequest(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("pullRequest id (%d) doesn't exist", msg.Id))
	}

	if msg.Creator != pullRequest.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	if len(pullRequest.Assignees)+len(msg.Assignees) > 10 {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "pullRequest can't have more than 10 assignees")
	}

	for _, a := range msg.Assignees {
		if _, exists := utils.AssigneeExists(pullRequest.Assignees, a); exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("assignee (%v) already assigned", a))
		}
		_, found := k.GetUser(ctx, a)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("assignee (%v) doesn't exist", a))
		}
		pullRequest.Assignees = append(pullRequest.Assignees, a)
	}

	pullRequest.CommentsCount += 1
	pullRequest.UpdatedAt = ctx.BlockTime().Unix()

	var comment = types.Comment{
		Creator:     "GITOPIA",
		ParentId:    msg.Id,
		CommentIid:  pullRequest.CommentsCount,
		Body:        utils.AddAssigneesCommentBody(msg.Creator, msg.Assignees),
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

	return &types.MsgAddPullRequestAssigneesResponse{}, nil
}

func (k msgServer) RemovePullRequestAssignees(goCtx context.Context, msg *types.MsgRemovePullRequestAssignees) (*types.MsgRemovePullRequestAssigneesResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	pullRequest, found := k.GetPullRequest(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("pullRequest id (%d) doesn't exist", msg.Id))
	}

	if msg.Creator != pullRequest.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	if len(pullRequest.Assignees) < len(msg.Assignees) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "can't remove more than user assigned")
	}

	for _, a := range msg.Assignees {
		if i, exists := utils.AssigneeExists(pullRequest.Assignees, a); exists {
			pullRequest.Assignees = append(pullRequest.Assignees[:i], pullRequest.Assignees[i+1:]...)
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("assignee (%v) aren't assigned", a))
		}
	}

	pullRequest.CommentsCount += 1
	pullRequest.UpdatedAt = ctx.BlockTime().Unix()

	var comment = types.Comment{
		Creator:     "GITOPIA",
		ParentId:    msg.Id,
		CommentIid:  pullRequest.CommentsCount,
		Body:        utils.RemoveAssigneesCommentBody(msg.Creator, msg.Assignees),
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

	return &types.MsgRemovePullRequestAssigneesResponse{}, nil
}

func (k msgServer) AddPullRequestLabels(goCtx context.Context, msg *types.MsgAddPullRequestLabels) (*types.MsgAddPullRequestLabelsResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	pullRequest, found := k.GetPullRequest(ctx, msg.PullRequestId)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("pullRequest id (%d) doesn't exist", msg.PullRequestId))
	}

	if msg.Creator != pullRequest.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	repository, found := k.GetRepositoryById(ctx, pullRequest.Base.RepositoryId)
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

	pullRequest, found := k.GetPullRequest(ctx, msg.PullRequestId)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("pullRequest id (%d) doesn't exist", msg.PullRequestId))
	}

	if msg.Creator != pullRequest.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	repository, found := k.GetRepositoryById(ctx, pullRequest.Base.RepositoryId)
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

	pullRequest, found := k.GetPullRequest(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("pullRequest id (%d) doesn't exist", msg.Id))
	}

	if msg.Creator != pullRequest.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.RemovePullRequest(ctx, msg.Id)

	return &types.MsgDeletePullRequestResponse{}, nil
}

func DoRemovePullRequest(ctx sdk.Context, k msgServer, pullRequest types.PullRequest, repository types.Repository) {
	for _, commentId := range pullRequest.Comments {
		k.RemoveComment(ctx, commentId)
	}

	if i, exists := utils.RepositoryPullRequestExists(repository.PullRequests, pullRequest.Iid); exists {
		repository.PullRequests = append(repository.PullRequests[:i], repository.PullRequests[i+1:]...)
	}

	repository.UpdatedAt = ctx.BlockTime().Unix()

	k.SetRepository(ctx, repository)
	k.RemovePullRequest(ctx, pullRequest.Id)
}
