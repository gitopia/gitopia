package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func (k msgServer) CreatePullRequest(goCtx context.Context, msg *types.MsgCreatePullRequest) (*types.MsgCreatePullRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var pullRequest = types.PullRequest{
		Creator:             msg.Creator,
		Iid:                 msg.Iid,
		Title:               msg.Title,
		State:               msg.State,
		Description:         msg.Description,
		Locked:              msg.Locked,
		Comments:            msg.Comments,
		Issues:              msg.Issues,
		RepositoryId:        msg.RepositoryId,
		Labels:              msg.Labels,
		Assignees:           msg.Assignees,
		Reviewers:           msg.Reviewers,
		Draft:               msg.Draft,
		CreatedAt:           msg.CreatedAt,
		UpdatedAt:           msg.UpdatedAt,
		ClosedAt:            msg.ClosedAt,
		ClosedBy:            msg.ClosedBy,
		MergedAt:            msg.MergedAt,
		MergedBy:            msg.MergedBy,
		MergeCommitSha:      msg.MergeCommitSha,
		MaintainerCanModify: msg.MaintainerCanModify,
		Head:                msg.Head,
		Base:                msg.Base,
		Extensions:          msg.Extensions,
	}

	id := k.AppendPullRequest(
		ctx,
		pullRequest,
	)

	return &types.MsgCreatePullRequestResponse{
		Id: id,
	}, nil
}

func (k msgServer) UpdatePullRequest(goCtx context.Context, msg *types.MsgUpdatePullRequest) (*types.MsgUpdatePullRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var pullRequest = types.PullRequest{
		Creator:             msg.Creator,
		Id:                  msg.Id,
		Iid:                 msg.Iid,
		Title:               msg.Title,
		State:               msg.State,
		Description:         msg.Description,
		Locked:              msg.Locked,
		Comments:            msg.Comments,
		Issues:              msg.Issues,
		RepositoryId:        msg.RepositoryId,
		Labels:              msg.Labels,
		Assignees:           msg.Assignees,
		Reviewers:           msg.Reviewers,
		Draft:               msg.Draft,
		CreatedAt:           msg.CreatedAt,
		UpdatedAt:           msg.UpdatedAt,
		ClosedAt:            msg.ClosedAt,
		ClosedBy:            msg.ClosedBy,
		MergedAt:            msg.MergedAt,
		MergedBy:            msg.MergedBy,
		MergeCommitSha:      msg.MergeCommitSha,
		MaintainerCanModify: msg.MaintainerCanModify,
		Head:                msg.Head,
		Base:                msg.Base,
		Extensions:          msg.Extensions,
	}

	// Checks that the element exists
	if !k.HasPullRequest(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != k.GetPullRequestOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.SetPullRequest(ctx, pullRequest)

	return &types.MsgUpdatePullRequestResponse{}, nil
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
