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

	headRepoOwnerAddress, err := k.ResolveAddress(ctx, msg.HeadRepositoryId.Id)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, err.Error())
	}

	headRepository, found := k.GetAddressRepository(ctx, headRepoOwnerAddress.address, msg.HeadRepositoryId.Name)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("head-repository (%v/%v) doesn't exist", msg.HeadRepositoryId.Id, msg.HeadRepositoryId.Name))
	}

	if _, found := k.GetRepositoryBranch(ctx, headRepository.Id, msg.HeadBranch); !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("head-branch (%v) doesn't exist", msg.HeadBranch))
	}

	baseRepositoryAddress, err := k.ResolveAddress(ctx, msg.BaseRepositoryId.Id)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, err.Error())
	}

	baseRepository, found := k.GetAddressRepository(ctx, baseRepositoryAddress.address, msg.BaseRepositoryId.Name)
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

	pullRequests := k.GetAllRepositoryPullRequest(ctx, baseRepository.Id)
	for _, pullRequest := range pullRequests {
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

	if len(msg.Reviewers) > 0 || len(msg.Assignees) > 0 || len(msg.LabelIds) > 0 {
		if !k.HavePermission(ctx, msg.Creator, baseRepository, types.AssignPermission) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to assign reviewers, assignees or labels", msg.Creator))
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
	}

	id := k.AppendPullRequest(
		ctx,
		pullRequest,
	)

	k.SetRepository(ctx, baseRepository)

	headJson, _ := json.Marshal(head)
	baseJson, _ := json.Marshal(base)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.CreatePullRequestEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(pullRequest.Base.RepositoryId, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestIdKey, strconv.FormatUint(id, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestIidKey, strconv.FormatUint(pullRequest.Iid, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestTitleKey, pullRequest.Title),
			sdk.NewAttribute(types.EventAttributePullRequestDescriptionKey, pullRequest.Description),
			sdk.NewAttribute(types.EventAttributePullRequestStateKey, pullRequest.State.String()),
			sdk.NewAttribute(types.EventAttributePullRequestDraftKey, strconv.FormatBool(pullRequest.Draft)),
			sdk.NewAttribute(types.EventAttributePullRequestHeadKey, string(headJson)),
			sdk.NewAttribute(types.EventAttributePullRequestBaseKey, string(baseJson)),
			sdk.NewAttribute(types.EventAttributeCreatedAtKey, strconv.FormatInt(pullRequest.CreatedAt, 10)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(pullRequest.UpdatedAt, 10)),
			sdk.NewAttribute(types.EventAttributeClosedAtKey, strconv.FormatInt(pullRequest.ClosedAt, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestMergedAtKey, strconv.FormatInt(pullRequest.MergedAt, 10)),
		),
	)

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

	pullRequest, found := k.GetRepositoryPullRequest(ctx, msg.RepositoryId, msg.Iid)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("pullRequest (%d) doesn't exist in repository", msg.Iid))
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
		Creator:      "GITOPIA",
		RepositoryId: pullRequest.Base.RepositoryId,
		ParentIid:    pullRequest.Iid,
		Parent:       types.CommentParentPullRequest,
		CommentIid:   pullRequest.CommentsCount,
		Body:         utils.UpdateTitleCommentBody(msg.Creator, oldTitle, pullRequest.Title),
		System:       true,
		CreatedAt:    pullRequest.UpdatedAt,
		UpdatedAt:    pullRequest.UpdatedAt,
		CommentType:  types.CommentTypeModifiedTitle,
	}

	k.AppendComment(
		ctx,
		comment,
	)
	k.SetPullRequest(ctx, pullRequest)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.UpdatePullRequestTitleEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(pullRequest.Base.RepositoryId, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestIdKey, strconv.FormatUint(pullRequest.Id, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestIidKey, strconv.FormatUint(pullRequest.Iid, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestTitleKey, pullRequest.Title),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(pullRequest.UpdatedAt, 10)),
		),
	)

	return &types.MsgUpdatePullRequestTitleResponse{}, nil
}

func (k msgServer) UpdatePullRequestDescription(goCtx context.Context, msg *types.MsgUpdatePullRequestDescription) (*types.MsgUpdatePullRequestDescriptionResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	pullRequest, found := k.GetRepositoryPullRequest(ctx, msg.RepositoryId, msg.Iid)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("pullRequest (%d) doesn't exist in repository", msg.Iid))
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
		Creator:      "GITOPIA",
		RepositoryId: pullRequest.Base.RepositoryId,
		ParentIid:    pullRequest.Iid,
		Parent:       types.CommentParentPullRequest,
		CommentIid:   pullRequest.CommentsCount,
		Body:         utils.UpdateDescriptionCommentBody(msg.Creator),
		System:       true,
		CreatedAt:    pullRequest.UpdatedAt,
		UpdatedAt:    pullRequest.UpdatedAt,
		CommentType:  types.CommentTypeModifiedDescription,
	}

	k.AppendComment(
		ctx,
		comment,
	)
	k.SetPullRequest(ctx, pullRequest)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.UpdatePullRequestDescriptionEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(pullRequest.Base.RepositoryId, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestIdKey, strconv.FormatUint(pullRequest.Id, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestIidKey, strconv.FormatUint(pullRequest.Iid, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestDescriptionKey, pullRequest.Description),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(pullRequest.UpdatedAt, 10)),
		),
	)

	return &types.MsgUpdatePullRequestDescriptionResponse{}, nil
}

func (k msgServer) InvokeMergePullRequest(goCtx context.Context, msg *types.MsgInvokeMergePullRequest) (*types.MsgInvokeMergePullRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	pullRequest, found := k.GetRepositoryPullRequest(ctx, msg.RepositoryId, msg.Iid)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("pullRequest (%d) doesn't exist in repository", msg.Iid))
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
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(pullRequest.Base.RepositoryId, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestIdKey, strconv.FormatUint(pullRequest.Id, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestIidKey, strconv.FormatUint(pullRequest.Iid, 10)),
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

	pullRequest, found := k.GetRepositoryPullRequest(ctx, msg.RepositoryId, msg.Iid)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("pullRequest (%d) doesn't exist in repository", msg.Iid))
	}

	task, _ = k.GetTask(ctx, msg.TaskId)

	blockTime := ctx.BlockTime().Unix()

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

	var baseBranch types.Branch
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

		if msg.CommentBody != "" {
			pullRequest.CommentsCount += 1

			k.AppendComment(ctx, types.Comment{
				Creator:      msg.Creator,
				RepositoryId: msg.RepositoryId,
				ParentIid:    pullRequest.Iid,
				Parent:       types.CommentParentPullRequest,
				CommentIid:   pullRequest.CommentsCount,
				Body:         msg.CommentBody,
				CreatedAt:    ctx.BlockTime().Unix(),
				UpdatedAt:    ctx.BlockTime().Unix(),
				CommentType:  types.CommentTypeNone,
			})
		}

		pullRequest.ClosedAt = blockTime
		pullRequest.ClosedBy = msg.Creator
	case types.PullRequest_MERGED.String():
		if pullRequest.State == types.PullRequest_MERGED || pullRequest.State == types.PullRequest_CLOSED {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("can't merge (%v) pullRequest", pullRequest.State.String()))
		}

		// Update the branch ref in the base repository
		var found bool
		baseBranch, found = k.GetRepositoryBranch(ctx, baseRepository.Id, pullRequest.Base.Branch)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("baseBranch (%v) doesn't exist", pullRequest.Base.Branch))
		}
		pullRequest.Base.CommitSha = baseBranch.Sha
		baseBranch.Sha = msg.MergeCommitSha
		baseBranch.UpdatedAt = blockTime

		headRepository, found := k.GetRepositoryById(ctx, pullRequest.Head.RepositoryId)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", pullRequest.Head.RepositoryId))
		}

		if branch, found := k.GetRepositoryBranch(ctx, headRepository.Id, pullRequest.Head.Branch); found {
			pullRequest.Head.CommitSha = branch.Sha
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("headBranch (%v) doesn't exist", pullRequest.Head.Branch))
		}

		pullRequest.MergedAt = blockTime
		pullRequest.MergedBy = msg.Creator
		pullRequest.MergeCommitSha = msg.MergeCommitSha

		// Update task state
		if task.Creator != msg.Creator {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "unauthorized")
		}

		task.State = types.StateSuccess
		k.SetTask(ctx, task)
		k.SetRepositoryBranch(ctx, baseBranch)

		for _, issueIid := range pullRequest.Issues {
			issue, found := k.GetRepositoryIssue(ctx, baseRepository.Id, issueIid.Iid)
			if !found {
				continue
			}
			if issue.State != types.Issue_OPEN {
				continue
			}
			if len(issue.Assignees) != 1 || pullRequest.Creator != issue.Assignees[0] { // continue when pull request creator is not the only assignee
				continue
			}

			// close issue
			issue.State = types.Issue_CLOSED
			issue.ClosedBy = msg.Creator
			issue.ClosedAt = blockTime
			issue.UpdatedAt = blockTime
			k.SetIssue(ctx, issue)

			// reward bounties to pull request creator
			for _, bountyId := range issue.Bounties {
				bounty, found := k.GetBounty(ctx, bountyId)
				if !found {
					continue
				}
				if bounty.State != types.BountyStateSRCDEBITTED {
					continue
				}
				rewardAccAddress, err := sdk.AccAddressFromBech32(pullRequest.Creator)
				if err != nil {
					continue
				}

				if err := k.bankKeeper.IsSendEnabledCoins(ctx, bounty.Amount...); err != nil {
					continue
				}
				if k.bankKeeper.BlockedAddr(rewardAccAddress) {
					continue
				}
				bountyAddress := GetBountyAddress(bounty.Id)
				if err := k.bankKeeper.SendCoins(
					ctx, bountyAddress, rewardAccAddress, bounty.Amount,
				); err != nil {
					continue
				}

				bounty.State = types.BountyStateDESTCREDITED
				bounty.RewardedTo = pullRequest.Creator
				bounty.ExpireAt = time.Time{}.Unix()
				bounty.UpdatedAt = blockTime

				k.SetBounty(ctx, bounty)
			}
		}
	default:
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("invalid state (%v)", msg.State))
	}

	pullRequest.State = types.PullRequest_State(types.PullRequest_State_value[msg.State])
	pullRequest.UpdatedAt = blockTime
	pullRequest.CommentsCount += 1

	var commentType types.CommentType
	switch pullRequest.State {
	case types.PullRequest_MERGED:
		commentType = types.CommentTypePullRequestMerged
	case types.PullRequest_CLOSED:
		commentType = types.CommentTypePullRequestClosed
	case types.PullRequest_OPEN:
		commentType = types.CommentTypePullRequestOpened
	default:
		commentType = types.CommentTypeNone
	}

	var comment = types.Comment{
		Creator:      "GITOPIA",
		RepositoryId: pullRequest.Base.RepositoryId,
		ParentIid:    pullRequest.Iid,
		Parent:       types.CommentParentPullRequest,
		CommentIid:   pullRequest.CommentsCount,
		Body:         utils.PullRequestToggleStateCommentBody(msg.Creator, pullRequest.State),
		System:       true,
		CreatedAt:    pullRequest.UpdatedAt,
		UpdatedAt:    pullRequest.UpdatedAt,
		CommentType:  commentType,
	}

	k.AppendComment(
		ctx,
		comment,
	)

	baseRepository.UpdatedAt = blockTime
	k.SetRepository(ctx, baseRepository)
	k.SetPullRequest(ctx, pullRequest)

	isGitRefUpdated := false
	if pullRequest.State == types.PullRequest_MERGED {
		isGitRefUpdated = true
	}

	headJson, _ := json.Marshal(pullRequest.Head)
	baseBranchJson, _ := json.Marshal(baseBranch)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.SetPullRequestStateEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributePullRequestIdKey, strconv.FormatUint(pullRequest.Id, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestIidKey, strconv.FormatUint(pullRequest.Iid, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestStateKey, msg.State),
			sdk.NewAttribute(types.EventAttributePullRequestMergeCommitShaKey, msg.MergeCommitSha),
			sdk.NewAttribute(types.EventAttributeTaskIdKey, strconv.FormatUint(msg.TaskId, 10)),
			sdk.NewAttribute(types.EventAttributeTaskStateKey, task.State.String()),
			sdk.NewAttribute(types.EventAttributeRepoNameKey, baseRepository.Name),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(baseRepository.Id, 10)),
			sdk.NewAttribute(types.EventAttributeRepoOwnerIdKey, baseRepository.Owner.Id),
			sdk.NewAttribute(types.EventAttributeRepoOwnerTypeKey, baseRepository.Owner.Type.String()),
			sdk.NewAttribute(types.EventAttributeIsGitRefUpdatedKey, strconv.FormatBool(isGitRefUpdated)),
			sdk.NewAttribute(types.EventAttributeRepoEnableArweaveBackupKey, strconv.FormatBool(baseRepository.EnableArweaveBackup)),
			sdk.NewAttribute(types.EventAttributePullRequestHeadKey, string(headJson)),
			sdk.NewAttribute(types.EventAttributeRepoBranchKey, string(baseBranchJson)),
			sdk.NewAttribute(types.EventAttributePullRequestMergedByKey, pullRequest.MergedBy),
			sdk.NewAttribute(types.EventAttributeClosedByKey, pullRequest.ClosedBy),
			sdk.NewAttribute(types.EventAttributeClosedAtKey, strconv.FormatInt(pullRequest.ClosedAt, 10)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(pullRequest.UpdatedAt, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestMergedAtKey, strconv.FormatInt(pullRequest.MergedAt, 10)),
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

	pullRequest, found := k.GetRepositoryPullRequest(ctx, msg.RepositoryId, msg.Iid)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("pullRequest (%d) doesn't exist in repository", msg.Iid))
	}

	repository, found := k.GetRepositoryById(ctx, pullRequest.Base.RepositoryId)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", pullRequest.Base.RepositoryId))
	}

	if !k.HavePermission(ctx, msg.Creator, repository, types.AssignPermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to assign reviewers, assignees or labels", msg.Creator))
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
		Creator:      "GITOPIA",
		RepositoryId: pullRequest.Base.RepositoryId,
		ParentIid:    pullRequest.Iid,
		Parent:       types.CommentParentPullRequest,
		CommentIid:   pullRequest.CommentsCount,
		Body:         utils.AddReviewersCommentBody(msg.Creator, msg.Reviewers),
		System:       true,
		CreatedAt:    pullRequest.UpdatedAt,
		UpdatedAt:    pullRequest.UpdatedAt,
		CommentType:  types.CommentTypeAddReviewers,
	}

	k.AppendComment(
		ctx,
		comment,
	)
	k.SetPullRequest(ctx, pullRequest)

	reviewersJson, _ := json.Marshal(msg.Reviewers)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.AddPullRequestReviewersEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(pullRequest.Base.RepositoryId, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestIdKey, strconv.FormatUint(pullRequest.Id, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestIidKey, strconv.FormatUint(pullRequest.Iid, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestReviewersKey, string(reviewersJson)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(pullRequest.UpdatedAt, 10)),
		),
	)

	return &types.MsgAddPullRequestReviewersResponse{}, nil
}

func (k msgServer) RemovePullRequestReviewers(goCtx context.Context, msg *types.MsgRemovePullRequestReviewers) (*types.MsgRemovePullRequestReviewersResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	pullRequest, found := k.GetRepositoryPullRequest(ctx, msg.RepositoryId, msg.Iid)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("pullRequest (%d) doesn't exist in repository", msg.Iid))
	}

	repository, found := k.GetRepositoryById(ctx, pullRequest.Base.RepositoryId)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", pullRequest.Base.RepositoryId))
	}

	if !k.HavePermission(ctx, msg.Creator, repository, types.AssignPermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to assign reviewers, assignees or labels", msg.Creator))
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
		Creator:      "GITOPIA",
		RepositoryId: pullRequest.Base.RepositoryId,
		ParentIid:    pullRequest.Iid,
		Parent:       types.CommentParentPullRequest,
		CommentIid:   pullRequest.CommentsCount,
		Body:         utils.RemoveReviewersCommentBody(msg.Creator, msg.Reviewers),
		System:       true,
		CreatedAt:    pullRequest.UpdatedAt,
		UpdatedAt:    pullRequest.UpdatedAt,
		CommentType:  types.CommentTypeRemoveReviewers,
	}

	k.AppendComment(
		ctx,
		comment,
	)
	k.SetPullRequest(ctx, pullRequest)

	reviewersJson, _ := json.Marshal(msg.Reviewers)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.RemovePullRequestReviewersEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(pullRequest.Base.RepositoryId, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestIdKey, strconv.FormatUint(pullRequest.Id, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestIidKey, strconv.FormatUint(pullRequest.Iid, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestReviewersKey, string(reviewersJson)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(pullRequest.UpdatedAt, 10)),
		),
	)

	return &types.MsgRemovePullRequestReviewersResponse{}, nil
}

func (k msgServer) AddPullRequestAssignees(goCtx context.Context, msg *types.MsgAddPullRequestAssignees) (*types.MsgAddPullRequestAssigneesResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	pullRequest, found := k.GetRepositoryPullRequest(ctx, msg.RepositoryId, msg.Iid)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("pullRequest (%d) doesn't exist in repository", msg.Iid))
	}

	repository, found := k.GetRepositoryById(ctx, pullRequest.Base.RepositoryId)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", pullRequest.Base.RepositoryId))
	}

	if !k.HavePermission(ctx, msg.Creator, repository, types.AssignPermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to assign reviewers, assignees or labels", msg.Creator))
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
		Creator:      "GITOPIA",
		RepositoryId: pullRequest.Base.RepositoryId,
		ParentIid:    pullRequest.Iid,
		Parent:       types.CommentParentPullRequest,
		CommentIid:   pullRequest.CommentsCount,
		Body:         utils.AddAssigneesCommentBody(msg.Creator, msg.Assignees),
		System:       true,
		CreatedAt:    pullRequest.UpdatedAt,
		UpdatedAt:    pullRequest.UpdatedAt,
		CommentType:  types.CommentTypeAddAssignees,
	}

	k.AppendComment(
		ctx,
		comment,
	)
	k.SetPullRequest(ctx, pullRequest)

	assigneesJson, _ := json.Marshal(msg.Assignees)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.AddPullRequestAssigneesEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(pullRequest.Base.RepositoryId, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestIdKey, strconv.FormatUint(pullRequest.Id, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestIidKey, strconv.FormatUint(pullRequest.Iid, 10)),
			sdk.NewAttribute(types.EventAttributeAssigneesKey, string(assigneesJson)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(pullRequest.UpdatedAt, 10)),
		),
	)

	return &types.MsgAddPullRequestAssigneesResponse{}, nil
}

func (k msgServer) RemovePullRequestAssignees(goCtx context.Context, msg *types.MsgRemovePullRequestAssignees) (*types.MsgRemovePullRequestAssigneesResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	pullRequest, found := k.GetRepositoryPullRequest(ctx, msg.RepositoryId, msg.Iid)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("pullRequest (%d) doesn't exist in repository", msg.Iid))
	}

	repository, found := k.GetRepositoryById(ctx, pullRequest.Base.RepositoryId)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", pullRequest.Base.RepositoryId))
	}

	if !k.HavePermission(ctx, msg.Creator, repository, types.AssignPermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to assign reviewers, assignees or labels", msg.Creator))
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
		Creator:      "GITOPIA",
		RepositoryId: pullRequest.Base.RepositoryId,
		ParentIid:    pullRequest.Iid,
		Parent:       types.CommentParentPullRequest,
		CommentIid:   pullRequest.CommentsCount,
		Body:         utils.RemoveAssigneesCommentBody(msg.Creator, msg.Assignees),
		System:       true,
		CreatedAt:    pullRequest.UpdatedAt,
		UpdatedAt:    pullRequest.UpdatedAt,
		CommentType:  types.CommentTypeRemoveAssignees,
	}

	k.AppendComment(
		ctx,
		comment,
	)
	k.SetPullRequest(ctx, pullRequest)

	assigneesJson, _ := json.Marshal(msg.Assignees)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.RemovePullRequestAssigneesEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(pullRequest.Base.RepositoryId, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestIdKey, strconv.FormatUint(pullRequest.Id, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestIidKey, strconv.FormatUint(pullRequest.Iid, 10)),
			sdk.NewAttribute(types.EventAttributeAssigneesKey, string(assigneesJson)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(pullRequest.UpdatedAt, 10)),
		),
	)

	return &types.MsgRemovePullRequestAssigneesResponse{}, nil
}

func (k msgServer) LinkPullRequestIssueByIid(goCtx context.Context, msg *types.MsgLinkPullRequestIssueByIid) (*types.MsgLinkPullRequestIssueByIidResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	pullRequest, found := k.GetRepositoryPullRequest(ctx, msg.RepositoryId, msg.PullRequestIid)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("pullRequest (%d) doesn't exist in repository", msg.PullRequestIid))
	}

	baseRepository, found := k.GetRepositoryById(ctx, pullRequest.Base.RepositoryId)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", pullRequest.Base.RepositoryId))
	}

	if msg.Creator != pullRequest.Creator {
		if !k.HavePermission(ctx, msg.Creator, baseRepository, types.LinkPullRequestIssuePermission) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
		}
	}

	if len(pullRequest.Issues)+1 > 10 {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "pullRequest can't have more than 10 linked issues")
	}

	issue, found := k.GetRepositoryIssue(ctx, pullRequest.Base.RepositoryId, msg.IssueIid)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("issue (%d) doesn't exist in repository", issue.Iid))
	}

	if _, exists := utils.IssueIidExists(pullRequest.Issues, msg.IssueIid); exists {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("issue (%v) already linked", msg.IssueIid))
	}

	issueIid := &types.IssueIid{
		Iid: issue.Iid,
		Id:  issue.Iid,
	}

	pullRequest.Issues = append(pullRequest.Issues, issueIid)

	blockTime := ctx.BlockTime().Unix()
	pullRequest.CommentsCount += 1
	pullRequest.UpdatedAt = blockTime

	if _, exists := utils.PullRequestIidExists(issue.PullRequests, pullRequest.Iid); exists {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("pullRequest (%v) already linked in issue (%v)", pullRequest.Iid, issueIid.Iid))
	}

	issue.PullRequests = append(issue.PullRequests, &types.PullRequestIid{
		Id:  pullRequest.Id,
		Iid: pullRequest.Iid,
	})
	issue.CommentsCount += 1
	issue.UpdatedAt = blockTime

	var pullRequestComment = types.Comment{
		Creator:      "GITOPIA",
		RepositoryId: pullRequest.Base.RepositoryId,
		ParentIid:    pullRequest.Iid,
		Parent:       types.CommentParentPullRequest,
		CommentIid:   pullRequest.CommentsCount,
		Body:         utils.LinkIssueCommentBody(msg.Creator, msg.IssueIid),
		System:       true,
		CreatedAt:    blockTime,
		UpdatedAt:    blockTime,
		CommentType:  types.CommentTypeNone,
	}
	var issueComment = types.Comment{
		Creator:      "GITOPIA",
		RepositoryId: issue.RepositoryId,
		ParentIid:    issue.Iid,
		Parent:       types.CommentParentIssue,
		CommentIid:   issue.CommentsCount,
		Body:         utils.LinkPullRequestCommentBody(msg.Creator, pullRequest.Iid),
		System:       true,
		CreatedAt:    blockTime,
		UpdatedAt:    blockTime,
		CommentType:  types.CommentTypeNone,
	}

	k.AppendComment(
		ctx,
		pullRequestComment,
	)
	k.AppendComment(
		ctx,
		issueComment,
	)
	k.SetPullRequest(ctx, pullRequest)
	k.SetIssue(ctx, issue)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.LinkPullRequestIssueByIidEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(pullRequest.Base.RepositoryId, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestIdKey, strconv.FormatUint(pullRequest.Id, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestIidKey, strconv.FormatUint(pullRequest.Iid, 10)),
			sdk.NewAttribute(types.EventAttributeIssueIdKey, strconv.FormatUint(issue.Id, 10)),
			sdk.NewAttribute(types.EventAttributeIssueIidKey, strconv.FormatUint(issue.Iid, 10)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(pullRequest.UpdatedAt, 10)),
		),
	)

	return &types.MsgLinkPullRequestIssueByIidResponse{}, nil
}

func (k msgServer) UnlinkPullRequestIssueByIid(goCtx context.Context, msg *types.MsgUnlinkPullRequestIssueByIid) (*types.MsgUnlinkPullRequestIssueByIidResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	pullRequest, found := k.GetRepositoryPullRequest(ctx, msg.RepositoryId, msg.PullRequestIid)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("pullRequest (%d) doesn't exist in repository", msg.PullRequestIid))
	}

	baseRepository, found := k.GetRepositoryById(ctx, pullRequest.Base.RepositoryId)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", pullRequest.Base.RepositoryId))
	}

	if msg.Creator != pullRequest.Creator {
		if !k.HavePermission(ctx, msg.Creator, baseRepository, types.LinkPullRequestIssuePermission) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
		}
	}

	if len(pullRequest.Issues) == 0 {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "pullRequest does not have any linked issues")
	}

	var issueIid *types.IssueIid
	if i, exists := utils.IssueIidExists(pullRequest.Issues, msg.IssueIid); exists {
		issueIid = pullRequest.Issues[i]
		pullRequest.Issues = append(pullRequest.Issues[:i], pullRequest.Issues[i+1:]...)
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("issue with iid (%v) isn't linked", msg.IssueIid))
	}

	issue, found := k.GetRepositoryIssue(ctx, pullRequest.Base.RepositoryId, issueIid.Iid)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("issue id (%d) doesn't exist", issueIid.Iid))
	}

	blockTime := ctx.BlockTime().Unix()
	pullRequest.CommentsCount += 1
	pullRequest.UpdatedAt = blockTime

	if i, exists := utils.PullRequestIidExists(issue.PullRequests, pullRequest.Iid); exists {
		issue.PullRequests = append(issue.PullRequests[:i], issue.PullRequests[i+1:]...)
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("pullRequest (%v) isn't linked in issue (%v)", pullRequest.Iid, issueIid.Iid))
	}
	issue.UpdatedAt = blockTime
	issue.CommentsCount += 1

	var pullRequestComment = types.Comment{
		Creator:      "GITOPIA",
		RepositoryId: pullRequest.Base.RepositoryId,
		ParentIid:    pullRequest.Iid,
		Parent:       types.CommentParentPullRequest,
		CommentIid:   pullRequest.CommentsCount,
		Body:         utils.UnlinkIssueCommentBody(msg.Creator, msg.IssueIid),
		System:       true,
		CreatedAt:    blockTime,
		UpdatedAt:    blockTime,
		CommentType:  types.CommentTypeNone,
	}
	var issueComment = types.Comment{
		Creator:      "GITOPIA",
		RepositoryId: issue.RepositoryId,
		ParentIid:    issue.Iid,
		Parent:       types.CommentParentIssue,
		CommentIid:   issue.CommentsCount,
		Body:         utils.UnlinkPullRequestCommentBody(msg.Creator, pullRequest.Iid),
		System:       true,
		CreatedAt:    blockTime,
		UpdatedAt:    blockTime,
		CommentType:  types.CommentTypeNone,
	}

	k.AppendComment(
		ctx,
		pullRequestComment,
	)
	k.AppendComment(
		ctx,
		issueComment,
	)
	k.SetPullRequest(ctx, pullRequest)
	k.SetIssue(ctx, issue)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.UnlinkPullRequestIssueByIidEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(pullRequest.Base.RepositoryId, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestIdKey, strconv.FormatUint(pullRequest.Id, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestIidKey, strconv.FormatUint(pullRequest.Iid, 10)),
			sdk.NewAttribute(types.EventAttributeIssueIdKey, strconv.FormatUint(issue.Id, 10)),
			sdk.NewAttribute(types.EventAttributeIssueIidKey, strconv.FormatUint(issue.Iid, 10)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(pullRequest.UpdatedAt, 10)),
		),
	)

	return &types.MsgUnlinkPullRequestIssueByIidResponse{}, nil
}

func (k msgServer) AddPullRequestLabels(goCtx context.Context, msg *types.MsgAddPullRequestLabels) (*types.MsgAddPullRequestLabelsResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	pullRequest, found := k.GetRepositoryPullRequest(ctx, msg.RepositoryId, msg.Iid)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("pullRequest (%d) doesn't exist in repository", msg.Iid))
	}

	repository, found := k.GetRepositoryById(ctx, pullRequest.Base.RepositoryId)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", pullRequest.Base.RepositoryId))
	}

	if !k.HavePermission(ctx, msg.Creator, repository, types.AssignPermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to assign reviewers, assignees or labels", msg.Creator))
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
		Creator:      "GITOPIA",
		RepositoryId: pullRequest.Base.RepositoryId,
		ParentIid:    pullRequest.Iid,
		Parent:       types.CommentParentPullRequest,
		CommentIid:   pullRequest.CommentsCount,
		Body:         utils.AddLabelsCommentBody(msg.Creator, labelNames),
		System:       true,
		CreatedAt:    pullRequest.UpdatedAt,
		UpdatedAt:    pullRequest.UpdatedAt,
		CommentType:  types.CommentTypeAddLabels,
	}

	k.AppendComment(
		ctx,
		comment,
	)
	k.SetPullRequest(ctx, pullRequest)

	labelsJson, _ := json.Marshal(msg.LabelIds)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.AddPullRequestLabelsEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(pullRequest.Base.RepositoryId, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestIdKey, strconv.FormatUint(pullRequest.Id, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestIidKey, strconv.FormatUint(pullRequest.Iid, 10)),
			sdk.NewAttribute(types.EventAttributeLabelsKey, string(labelsJson)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(pullRequest.UpdatedAt, 10)),
		),
	)

	return &types.MsgAddPullRequestLabelsResponse{}, nil
}

func (k msgServer) RemovePullRequestLabels(goCtx context.Context, msg *types.MsgRemovePullRequestLabels) (*types.MsgRemovePullRequestLabelsResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	pullRequest, found := k.GetRepositoryPullRequest(ctx, msg.RepositoryId, msg.Iid)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("pullRequest (%d) doesn't exist in repository", msg.Iid))
	}

	repository, found := k.GetRepositoryById(ctx, pullRequest.Base.RepositoryId)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", pullRequest.Base.RepositoryId))
	}

	if !k.HavePermission(ctx, msg.Creator, repository, types.AssignPermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to assign reviewers, assignees or labels", msg.Creator))
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
		Creator:      "GITOPIA",
		RepositoryId: pullRequest.Base.RepositoryId,
		ParentIid:    pullRequest.Iid,
		Parent:       types.CommentParentPullRequest,
		CommentIid:   pullRequest.CommentsCount,
		Body:         utils.RemoveLabelsCommentBody(msg.Creator, labelNames),
		System:       true,
		CreatedAt:    pullRequest.UpdatedAt,
		UpdatedAt:    pullRequest.UpdatedAt,
		CommentType:  types.CommentTypeRemoveLabels,
	}

	k.AppendComment(
		ctx,
		comment,
	)
	k.SetPullRequest(ctx, pullRequest)

	labelsJson, _ := json.Marshal(msg.LabelIds)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.RemovePullRequestLabelsEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(pullRequest.Base.RepositoryId, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestIdKey, strconv.FormatUint(pullRequest.Id, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestIidKey, strconv.FormatUint(pullRequest.Iid, 10)),
			sdk.NewAttribute(types.EventAttributeLabelsKey, string(labelsJson)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(pullRequest.UpdatedAt, 10)),
		),
	)

	return &types.MsgRemovePullRequestLabelsResponse{}, nil
}

func (k msgServer) DeletePullRequest(goCtx context.Context, msg *types.MsgDeletePullRequest) (*types.MsgDeletePullRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	pullRequest, found := k.GetRepositoryPullRequest(ctx, msg.RepositoryId, msg.Iid)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("pullRequest (%d) doesn't exist in repository", msg.Iid))
	}

	if msg.Creator != pullRequest.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	repository, found := k.GetRepositoryById(ctx, msg.RepositoryId)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", msg.RepositoryId))
	}

	DoRemovePullRequest(ctx, k, pullRequest, repository)

	repository.UpdatedAt = ctx.BlockTime().Unix()
	k.SetRepository(ctx, repository)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.DeletePullRequestEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(pullRequest.Base.RepositoryId, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestIdKey, strconv.FormatUint(pullRequest.Id, 10)),
			sdk.NewAttribute(types.EventAttributePullRequestIidKey, strconv.FormatUint(pullRequest.Iid, 10)),
		),
	)

	return &types.MsgDeletePullRequestResponse{}, nil
}

func DoRemovePullRequest(ctx sdk.Context, k msgServer, pullRequest types.PullRequest, repository types.Repository) {
	comments := k.GetAllPullRequestComment(ctx, repository.Id, pullRequest.Iid)
	for _, comment := range comments {
		k.RemovePullRequestComment(ctx, repository.Id, pullRequest.Iid, comment.CommentIid)
	}

	k.RemoveRepositoryPullRequest(ctx, repository.Id, pullRequest.Iid)
}
