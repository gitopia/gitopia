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

func (k msgServer) CreateIssue(goCtx context.Context, msg *types.MsgCreateIssue) (*types.MsgCreateIssueResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	address, err := k.ResolveAddress(ctx, msg.RepositoryId.Id)
	if err != nil {
		return nil, err
	}

	repository, found := k.GetAddressRepository(ctx, address.Address, msg.RepositoryId.Name)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository (%v/%v) doesn't exist", msg.RepositoryId.Id, msg.RepositoryId.Name))
	}

	repository.IssuesCount += 1

	var issue = types.Issue{
		Creator:      msg.Creator,
		Iid:          repository.IssuesCount,
		Title:        msg.Title,
		State:        types.Issue_OPEN,
		Description:  msg.Description,
		RepositoryId: repository.Id,
		CreatedAt:    ctx.BlockTime().Unix(),
		UpdatedAt:    ctx.BlockTime().Unix(),
		ClosedAt:     time.Time{}.Unix(),
	}

	if len(msg.Assignees) > 0 || len(msg.LabelIds) > 0 {
		if !k.HavePermission(ctx, msg.Creator, repository, types.AssignPermission) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
		}

		for _, a := range msg.Assignees {
			_, found := k.GetUser(ctx, a)
			if !found {
				return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("assignee (%v) doesn't exist", a))
			}
		}
		issue.Assignees = msg.Assignees
		for _, labelId := range msg.LabelIds {
			if i, exists := utils.RepositoryLabelIdExists(repository.Labels, labelId); exists {
				issue.Labels = append(issue.Labels, repository.Labels[i].Id)
			} else {
				return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("label id (%v) doesn't exists in repository", labelId))
			}
		}
	}

	var bountyId uint64
	if len(msg.BountyAmount) > 0 {
		if msg.BountyExpiry < ctx.BlockTime().Unix() {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "expire time can't be less then current time")
		}

		var bounty = types.Bounty{
			Creator:      msg.Creator,
			RepositoryId: issue.RepositoryId,
			Amount:       msg.BountyAmount,
			State:        types.BountyStateSRCDEBITTED,
			Parent:       types.BountyParentIssue,
			ParentIid:    issue.Iid,
			ExpireAt:     msg.BountyExpiry,
			CreatedAt:    ctx.BlockTime().Unix(),
			UpdatedAt:    ctx.BlockTime().Unix(),
		}

		if err := k.bankKeeper.IsSendEnabledCoins(ctx, msg.BountyAmount...); err != nil {
			return nil, err
		}
		creatorAccAddress, err := sdk.AccAddressFromBech32(msg.Creator)
		if err != nil {
			return nil, err
		}
		bountyAddress := GetBountyAddress(k.GetBountyCount(ctx))
		err = k.bankKeeper.SendCoins(ctx, creatorAccAddress, bountyAddress, msg.BountyAmount)
		if err != nil {
			return nil, err
		}

		bountyId = k.AppendBounty(
			ctx,
			bounty,
		)

		issue.Bounties = append(issue.Bounties, bountyId)
	}

	issueId := k.AppendIssue(
		ctx,
		issue,
	)

	k.SetRepository(ctx, repository)

	assigneesJson, _ := json.Marshal(issue.Assignees)
	labelsJson, _ := json.Marshal(issue.Labels)
	bountyAmountJson, _ := json.Marshal(msg.BountyAmount)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.CreateIssueEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeIssueIdKey, strconv.FormatUint(issueId, 10)),
			sdk.NewAttribute(types.EventAttributeIssueIidKey, strconv.FormatUint(issue.Iid, 10)),
			sdk.NewAttribute(types.EventAttributeIssueTitleKey, issue.Title),
			sdk.NewAttribute(types.EventAttributeIssueDescriptionKey, issue.Description),
			sdk.NewAttribute(types.EventAttributeIssueStateKey, issue.State.String()),
			sdk.NewAttribute(types.EventAttributeAssigneesKey, string(assigneesJson)),
			sdk.NewAttribute(types.EventAttributeLabelsKey, string(labelsJson)),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(repository.Id, 10)),
			sdk.NewAttribute(types.EventAttributeRepoOwnerIdKey, repository.Owner.Id),
			sdk.NewAttribute(types.EventAttributeRepoOwnerTypeKey, repository.Owner.Type.String()),
			sdk.NewAttribute(types.EventAttributeBountyIdKey, strconv.FormatUint(bountyId, 10)),
			sdk.NewAttribute(types.EventAttributeBountyAmountKey, string(bountyAmountJson)),
			sdk.NewAttribute(types.EventAttributeBountyStateKey, types.BountyStateSRCDEBITTED.String()),
			sdk.NewAttribute(types.EventAttributeBountyParentKey, types.BountyParentIssue.String()),
			sdk.NewAttribute(types.EventAttributeBountyExpiry, strconv.FormatInt(msg.BountyExpiry, 10)),
			sdk.NewAttribute(types.EventAttributeCreatedAtKey, strconv.FormatInt(issue.CreatedAt, 10)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(issue.UpdatedAt, 10)),
			sdk.NewAttribute(types.EventAttributeClosedAtKey, strconv.FormatInt(issue.ClosedAt, 10)),
		),
	)

	return &types.MsgCreateIssueResponse{
		Id:  issueId,
		Iid: issue.Iid,
	}, nil
}

func (k msgServer) UpdateIssueTitle(goCtx context.Context, msg *types.MsgUpdateIssueTitle) (*types.MsgUpdateIssueTitleResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	issue, found := k.GetRepositoryIssue(ctx, msg.RepositoryId, msg.Iid)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("issue (%d) doesn't exist in repository", msg.Iid))
	}

	if issue.Title == msg.Title {
		return &types.MsgUpdateIssueTitleResponse{}, nil
	}

	if msg.Creator != issue.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	oldTitle := issue.Title

	issue.Title = msg.Title
	issue.UpdatedAt = ctx.BlockTime().Unix()
	issue.CommentsCount += 1

	var comment = types.Comment{
		Creator:      "GITOPIA",
		RepositoryId: issue.RepositoryId,
		ParentIid:    msg.Iid,
		Parent:       types.CommentParentIssue,
		CommentIid:   issue.CommentsCount,
		Body:         utils.UpdateTitleCommentBody(msg.Creator, oldTitle, issue.Title),
		System:       true,
		CreatedAt:    issue.UpdatedAt,
		UpdatedAt:    issue.UpdatedAt,
		CommentType:  types.CommentTypeModifiedTitle,
	}

	k.AppendComment(
		ctx,
		comment,
	)
	k.SetIssue(ctx, issue)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.UpdateIssueTitleEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(issue.RepositoryId, 10)),
			sdk.NewAttribute(types.EventAttributeIssueIdKey, strconv.FormatUint(issue.Id, 10)),
			sdk.NewAttribute(types.EventAttributeIssueIidKey, strconv.FormatUint(issue.Iid, 10)),
			sdk.NewAttribute(types.EventAttributeIssueTitleKey, issue.Title),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(issue.UpdatedAt, 10)),
		),
	)

	return &types.MsgUpdateIssueTitleResponse{}, nil
}

func (k msgServer) UpdateIssueDescription(goCtx context.Context, msg *types.MsgUpdateIssueDescription) (*types.MsgUpdateIssueDescriptionResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	issue, found := k.GetRepositoryIssue(ctx, msg.RepositoryId, msg.Iid)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("issue (%d) doesn't exist in repository", msg.Iid))
	}

	if issue.Description == msg.Description {
		return &types.MsgUpdateIssueDescriptionResponse{}, nil
	}

	if msg.Creator != issue.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	issue.Description = msg.Description
	issue.UpdatedAt = ctx.BlockTime().Unix()
	issue.CommentsCount += 1

	var comment = types.Comment{
		Creator:      "GITOPIA",
		RepositoryId: issue.RepositoryId,
		ParentIid:    msg.Iid,
		Parent:       types.CommentParentIssue,
		CommentIid:   issue.CommentsCount,
		Body:         utils.UpdateDescriptionCommentBody(msg.Creator),
		System:       true,
		CreatedAt:    issue.UpdatedAt,
		UpdatedAt:    issue.UpdatedAt,
		CommentType:  types.CommentTypeModifiedDescription,
	}

	k.AppendComment(
		ctx,
		comment,
	)
	k.SetIssue(ctx, issue)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.UpdateIssueDescriptionEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(issue.RepositoryId, 10)),
			sdk.NewAttribute(types.EventAttributeIssueIdKey, strconv.FormatUint(issue.Id, 10)),
			sdk.NewAttribute(types.EventAttributeIssueIidKey, strconv.FormatUint(issue.Iid, 10)),
			sdk.NewAttribute(types.EventAttributeIssueDescriptionKey, issue.Description),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(issue.UpdatedAt, 10)),
		),
	)

	return &types.MsgUpdateIssueDescriptionResponse{}, nil
}

func (k msgServer) ToggleIssueState(goCtx context.Context, msg *types.MsgToggleIssueState) (*types.MsgToggleIssueStateResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	issue, found := k.GetRepositoryIssue(ctx, msg.RepositoryId, msg.Iid)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("issue (%d) doesn't exist in repository", msg.Iid))
	}

	repository, found := k.GetRepositoryById(ctx, issue.RepositoryId)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", issue.RepositoryId))
	}

	if msg.Creator != issue.Creator {
		if !k.HavePermission(ctx, msg.Creator, repository, types.ToggleIssueStatePermission) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
		}
	}

	blockTime := ctx.BlockTime().Unix()
	var commentType types.CommentType

	switch issue.State {
	case types.Issue_OPEN:
		for _, pullRequestIid := range issue.PullRequests {
			pullRequest, found := k.GetRepositoryPullRequest(ctx, repository.Id, pullRequestIid.Iid)
			if !found {
				continue
			}
			if pullRequest.State == types.PullRequest_OPEN {
				return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "can't close issue with OPEN linked pull request")
			}
		}

		if msg.CommentBody != "" {
			issue.CommentsCount += 1

			k.AppendComment(ctx, types.Comment{
				Creator:      msg.Creator,
				RepositoryId: msg.RepositoryId,
				ParentIid:    issue.Iid,
				Parent:       types.CommentParentIssue,
				CommentIid:   issue.CommentsCount,
				Body:         msg.CommentBody,
				CreatedAt:    ctx.BlockTime().Unix(),
				UpdatedAt:    ctx.BlockTime().Unix(),
				CommentType:  types.CommentTypeReply,
			})
		}

		issue.State = types.Issue_CLOSED
		issue.ClosedBy = msg.Creator
		issue.ClosedAt = blockTime

		for _, bountyId := range issue.Bounties {
			bounty, found := k.GetBounty(ctx, bountyId)
			if !found {
				continue
			}
			if bounty.State != types.BountyStateSRCDEBITTED {
				continue
			}
			creatorAccAddress, err := sdk.AccAddressFromBech32(bounty.Creator)
			if err != nil {
				continue
			}

			if err := k.bankKeeper.IsSendEnabledCoins(ctx, bounty.Amount...); err != nil {
				continue
			}
			if k.bankKeeper.BlockedAddr(creatorAccAddress) {
				continue
			}
			bountyAddress := GetBountyAddress(bounty.Id)
			if err := k.bankKeeper.SendCoins(
				ctx, bountyAddress, creatorAccAddress, bounty.Amount,
			); err != nil {
				continue
			}

			bounty.State = types.BountyStateREVERTEDBACK
			bounty.ExpireAt = time.Time{}.Unix()
			bounty.UpdatedAt = blockTime

			k.SetBounty(ctx, bounty)
		}
		commentType = types.CommentTypeIssueClosed
	case types.Issue_CLOSED:
		issue.State = types.Issue_OPEN
		issue.ClosedBy = string("")
		issue.ClosedAt = time.Time{}.Unix()
		commentType = types.CommentTypeIssueOpened
	}

	issue.CommentsCount += 1
	issue.UpdatedAt = blockTime

	var comment = types.Comment{
		Creator:      "GITOPIA",
		RepositoryId: issue.RepositoryId,
		ParentIid:    msg.Iid,
		Parent:       types.CommentParentIssue,
		CommentIid:   issue.CommentsCount,
		Body:         utils.IssueToggleStateCommentBody(msg.Creator, issue.State),
		System:       true,
		CreatedAt:    issue.UpdatedAt,
		UpdatedAt:    issue.UpdatedAt,
		CommentType:  commentType,
	}

	k.AppendComment(
		ctx,
		comment,
	)
	k.SetIssue(ctx, issue)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.ToggleIssueStateEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(issue.RepositoryId, 10)),
			sdk.NewAttribute(types.EventAttributeIssueIdKey, strconv.FormatUint(issue.Id, 10)),
			sdk.NewAttribute(types.EventAttributeIssueIidKey, strconv.FormatUint(issue.Iid, 10)),
			sdk.NewAttribute(types.EventAttributeIssueStateKey, issue.State.String()),
			sdk.NewAttribute(types.EventAttributeClosedByKey, issue.ClosedBy),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(issue.UpdatedAt, 10)),
			sdk.NewAttribute(types.EventAttributeClosedAtKey, strconv.FormatInt(issue.ClosedAt, 10)),
		),
	)

	return &types.MsgToggleIssueStateResponse{
		State: issue.State.String(),
	}, nil
}

func (k msgServer) AddIssueAssignees(goCtx context.Context, msg *types.MsgAddIssueAssignees) (*types.MsgAddIssueAssigneesResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	issue, found := k.GetRepositoryIssue(ctx, msg.RepositoryId, msg.Iid)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("issue (%d) doesn't exist in repository", msg.Iid))
	}

	repository, found := k.GetRepositoryById(ctx, issue.RepositoryId)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", issue.RepositoryId))
	}

	if !k.HavePermission(ctx, msg.Creator, repository, types.AssignPermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	totalAssignees := len(issue.Assignees) + len(msg.Assignees)

	if len(issue.Bounties) > 0 && totalAssignees > 1 {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "issue with bounty can't have more then 1 assignee")
	}

	if totalAssignees > 10 {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "issue can't have more than 10 assignees")
	}

	for _, a := range msg.Assignees {
		if _, exists := utils.AssigneeExists(issue.Assignees, a); exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("assignee (%v) already assigned", a))
		}
		_, found := k.GetUser(ctx, a)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("assignee (%v) doesn't exist", a))
		}
		issue.Assignees = append(issue.Assignees, a)
	}

	issue.CommentsCount += 1
	issue.UpdatedAt = ctx.BlockTime().Unix()

	var comment = types.Comment{
		Creator:      "GITOPIA",
		RepositoryId: issue.RepositoryId,
		ParentIid:    msg.Iid,
		Parent:       types.CommentParentIssue,
		CommentIid:   issue.CommentsCount,
		Body:         utils.AddAssigneesCommentBody(msg.Creator, msg.Assignees),
		System:       true,
		CreatedAt:    issue.UpdatedAt,
		UpdatedAt:    issue.UpdatedAt,
		CommentType:  types.CommentTypeAddAssignees,
	}

	k.AppendComment(
		ctx,
		comment,
	)
	k.SetIssue(ctx, issue)

	assigneesJson, _ := json.Marshal(msg.Assignees)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.AddIssueAssigneesEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(issue.RepositoryId, 10)),
			sdk.NewAttribute(types.EventAttributeIssueIdKey, strconv.FormatUint(issue.Id, 10)),
			sdk.NewAttribute(types.EventAttributeIssueIidKey, strconv.FormatUint(issue.Iid, 10)),
			sdk.NewAttribute(types.EventAttributeAssigneesKey, string(assigneesJson)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(issue.UpdatedAt, 10)),
		),
	)

	return &types.MsgAddIssueAssigneesResponse{}, nil
}

func (k msgServer) RemoveIssueAssignees(goCtx context.Context, msg *types.MsgRemoveIssueAssignees) (*types.MsgRemoveIssueAssigneesResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	issue, found := k.GetRepositoryIssue(ctx, msg.RepositoryId, msg.Iid)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("issue (%d) doesn't exist in repository", msg.Iid))
	}

	repository, found := k.GetRepositoryById(ctx, issue.RepositoryId)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", issue.RepositoryId))
	}

	if !k.HavePermission(ctx, msg.Creator, repository, types.AssignPermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	if len(issue.Assignees) < len(msg.Assignees) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "can't remove more than user assigned")
	}

	for _, a := range msg.Assignees {
		if i, exists := utils.AssigneeExists(issue.Assignees, a); exists {
			issue.Assignees = append(issue.Assignees[:i], issue.Assignees[i+1:]...)
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("assignee (%v) aren't assigned", a))
		}
	}

	issue.CommentsCount += 1
	issue.UpdatedAt = ctx.BlockTime().Unix()

	var comment = types.Comment{
		Creator:      "GITOPIA",
		RepositoryId: issue.RepositoryId,
		ParentIid:    msg.Iid,
		Parent:       types.CommentParentIssue,
		CommentIid:   issue.CommentsCount,
		Body:         utils.RemoveAssigneesCommentBody(msg.Creator, msg.Assignees),
		System:       true,
		CreatedAt:    issue.UpdatedAt,
		UpdatedAt:    issue.UpdatedAt,
		CommentType:  types.CommentTypeRemoveAssignees,
	}

	k.AppendComment(
		ctx,
		comment,
	)
	k.SetIssue(ctx, issue)

	assigneesJson, _ := json.Marshal(msg.Assignees)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.RemoveIssueAssigneesEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(issue.RepositoryId, 10)),
			sdk.NewAttribute(types.EventAttributeIssueIdKey, strconv.FormatUint(issue.Id, 10)),
			sdk.NewAttribute(types.EventAttributeIssueIidKey, strconv.FormatUint(issue.Iid, 10)),
			sdk.NewAttribute(types.EventAttributeAssigneesKey, string(assigneesJson)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(issue.UpdatedAt, 10)),
		),
	)

	return &types.MsgRemoveIssueAssigneesResponse{}, nil
}

func (k msgServer) AddIssueLabels(goCtx context.Context, msg *types.MsgAddIssueLabels) (*types.MsgAddIssueLabelsResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	issue, found := k.GetRepositoryIssue(ctx, msg.RepositoryId, msg.Iid)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("issue (%d) doesn't exist in repository", msg.Iid))
	}

	repository, found := k.GetRepositoryById(ctx, issue.RepositoryId)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", issue.RepositoryId))
	}

	if !k.HavePermission(ctx, msg.Creator, repository, types.LabelPermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	if len(issue.Labels)+len(msg.LabelIds) > 50 {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "issue can't have more than 50 labels")
	}

	var labelNames []string

	for _, l := range msg.LabelIds {
		if i, exists := utils.RepositoryLabelIdExists(repository.Labels, l); exists {
			if _, exists := utils.LabelIdExists(issue.Labels, repository.Labels[i].Id); exists {
				return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("label id (%v) already exists in issue", l))
			}
			labelNames = append(labelNames, repository.Labels[i].Name)

			issue.Labels = append(issue.Labels, repository.Labels[i].Id)
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("label id (%v) doesn't exists in repository", l))
		}
	}

	issue.CommentsCount += 1
	issue.UpdatedAt = ctx.BlockTime().Unix()

	var comment = types.Comment{
		Creator:      "GITOPIA",
		RepositoryId: issue.RepositoryId,
		ParentIid:    msg.Iid,
		Parent:       types.CommentParentIssue,
		CommentIid:   issue.CommentsCount,
		Body:         utils.AddLabelsCommentBody(msg.Creator, labelNames),
		System:       true,
		CreatedAt:    issue.UpdatedAt,
		UpdatedAt:    issue.UpdatedAt,
		CommentType:  types.CommentTypeAddLabels,
	}

	k.AppendComment(
		ctx,
		comment,
	)
	k.SetIssue(ctx, issue)

	labelsJson, _ := json.Marshal(msg.LabelIds)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.AddIssueLabelsEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(issue.RepositoryId, 10)),
			sdk.NewAttribute(types.EventAttributeIssueIdKey, strconv.FormatUint(issue.Id, 10)),
			sdk.NewAttribute(types.EventAttributeIssueIidKey, strconv.FormatUint(issue.Iid, 10)),
			sdk.NewAttribute(types.EventAttributeLabelsKey, string(labelsJson)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(issue.UpdatedAt, 10)),
		),
	)

	return &types.MsgAddIssueLabelsResponse{}, nil
}

func (k msgServer) RemoveIssueLabels(goCtx context.Context, msg *types.MsgRemoveIssueLabels) (*types.MsgRemoveIssueLabelsResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	issue, found := k.GetRepositoryIssue(ctx, msg.RepositoryId, msg.Iid)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("issue (%d) doesn't exist in repository", msg.Iid))
	}

	repository, found := k.GetRepositoryById(ctx, issue.RepositoryId)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", issue.RepositoryId))
	}

	if !k.HavePermission(ctx, msg.Creator, repository, types.LabelPermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	if len(issue.Labels) < len(msg.LabelIds) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "can't remove more than existing labels")
	}

	var labelNames []string

	for _, l := range msg.LabelIds {
		if i, exists := utils.RepositoryLabelIdExists(repository.Labels, l); exists {
			if j, exists := utils.LabelIdExists(issue.Labels, repository.Labels[i].Id); exists {
				labelNames = append(labelNames, repository.Labels[i].Name)

				issue.Labels = append(issue.Labels[:j], issue.Labels[j+1:]...)
			} else {
				return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("label id (%v) doesn't exists in issue", l))
			}
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("label id (%v) doesn't exists in repository", l))
		}
	}

	issue.CommentsCount += 1
	issue.UpdatedAt = ctx.BlockTime().Unix()

	var comment = types.Comment{
		Creator:      "GITOPIA",
		RepositoryId: issue.RepositoryId,
		ParentIid:    msg.Iid,
		Parent:       types.CommentParentIssue,
		CommentIid:   issue.CommentsCount,
		Body:         utils.RemoveLabelsCommentBody(msg.Creator, labelNames),
		System:       true,
		CreatedAt:    issue.UpdatedAt,
		UpdatedAt:    issue.UpdatedAt,
		CommentType:  types.CommentTypeRemoveLabels,
	}

	k.AppendComment(
		ctx,
		comment,
	)
	k.SetIssue(ctx, issue)

	labelsJson, _ := json.Marshal(msg.LabelIds)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.RemoveIssueLabelsEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(issue.RepositoryId, 10)),
			sdk.NewAttribute(types.EventAttributeIssueIdKey, strconv.FormatUint(issue.Id, 10)),
			sdk.NewAttribute(types.EventAttributeIssueIidKey, strconv.FormatUint(issue.Iid, 10)),
			sdk.NewAttribute(types.EventAttributeLabelsKey, string(labelsJson)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(issue.UpdatedAt, 10)),
		),
	)

	return &types.MsgRemoveIssueLabelsResponse{}, nil
}

func (k msgServer) DeleteIssue(goCtx context.Context, msg *types.MsgDeleteIssue) (*types.MsgDeleteIssueResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	issue, found := k.GetRepositoryIssue(ctx, msg.RepositoryId, msg.Iid)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("issue (%d) doesn't exist in repository", msg.Iid))
	}

	repository, found := k.GetRepositoryById(ctx, issue.RepositoryId)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", issue.RepositoryId))
	}

	if !k.HavePermission(ctx, msg.Creator, repository, types.DeleteIssuePermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	for _, pullRequestIid := range issue.PullRequests {
		pullRequest, found := k.GetRepositoryPullRequest(ctx, repository.Id, pullRequestIid.Iid)
		if !found {
			continue
		}
		if pullRequest.State == types.PullRequest_OPEN {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "can't delete issue having OPEN linked pull request")
		}
	}

	DoRemoveIssue(ctx, k, issue, repository)

	repository.UpdatedAt = ctx.BlockTime().Unix()
	k.SetRepository(ctx, repository)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.DeleteIssueEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(issue.RepositoryId, 10)),
			sdk.NewAttribute(types.EventAttributeIssueIdKey, strconv.FormatUint(issue.Id, 10)),
			sdk.NewAttribute(types.EventAttributeIssueIidKey, strconv.FormatUint(issue.Iid, 10)),
		),
	)

	return &types.MsgDeleteIssueResponse{}, nil
}

func DoRemoveIssue(ctx sdk.Context, k msgServer, issue types.Issue, repository types.Repository) {
	blockTime := ctx.BlockTime().Unix()

	comments := k.GetAllIssueComment(ctx, repository.Id, issue.Iid)
	for _, comment := range comments {
		k.RemoveIssueComment(ctx, repository.Id, issue.Iid, comment.CommentIid)
	}

	for _, pullRequestIid := range issue.PullRequests {
		pullRequest, found := k.GetRepositoryPullRequest(ctx, repository.Id, pullRequestIid.Iid)
		if !found {
			continue
		}
		if i, exists := utils.IssueIidExists(pullRequest.Issues, issue.Iid); exists {
			pullRequest.Issues = append(pullRequest.Issues[:i], pullRequest.Issues[i+1:]...)
		} else {
			continue
		}
		pullRequest.UpdatedAt = blockTime

		k.SetPullRequest(ctx, pullRequest)
	}

	for _, bountyId := range issue.Bounties {
		bounty, found := k.GetBounty(ctx, bountyId)
		if !found {
			continue
		}
		if bounty.State != types.BountyStateSRCDEBITTED {
			continue
		}
		creatorAccAddress, err := sdk.AccAddressFromBech32(bounty.Creator)
		if err != nil {
			continue
		}

		if err := k.bankKeeper.IsSendEnabledCoins(ctx, bounty.Amount...); err != nil {
			continue
		}
		if k.bankKeeper.BlockedAddr(creatorAccAddress) {
			continue
		}
		bountyAddress := GetBountyAddress(bounty.Id)
		if err := k.bankKeeper.SendCoins(
			ctx, bountyAddress, creatorAccAddress, bounty.Amount,
		); err != nil {
			continue
		}

		bounty.State = types.BountyStateREVERTEDBACK
		bounty.ExpireAt = time.Time{}.Unix()
		bounty.UpdatedAt = blockTime

		k.SetBounty(ctx, bounty)
	}

	k.RemoveRepositoryIssue(ctx, repository.Id, issue.Iid)
}
