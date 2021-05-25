package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func (k msgServer) CreateIssue(goCtx context.Context, msg *types.MsgCreateIssue) (*types.MsgCreateIssueResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	id := k.AppendIssue(
		ctx,
		msg.Creator,
		msg.Iid,
		msg.Title,
		msg.State,
		msg.Description,
		msg.AuthorId,
		msg.Comments,
		msg.PullRequests,
		msg.RepositoryId,
		msg.Labels,
		msg.Weight,
		msg.AssigneesId,
		msg.CreatedAt,
		msg.UpdatedAt,
		msg.ClosedAt,
		msg.ClosedBy,
		msg.Extensions,
	)

	return &types.MsgCreateIssueResponse{
		Id: id,
	}, nil
}

func (k msgServer) UpdateIssue(goCtx context.Context, msg *types.MsgUpdateIssue) (*types.MsgUpdateIssueResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var issue = types.Issue{
		Creator:      msg.Creator,
		Id:           msg.Id,
		Iid:          msg.Iid,
		Title:        msg.Title,
		State:        msg.State,
		Description:  msg.Description,
		AuthorId:     msg.AuthorId,
		Comments:     msg.Comments,
		PullRequests: msg.PullRequests,
		RepositoryId: msg.RepositoryId,
		Labels:       msg.Labels,
		Weight:       msg.Weight,
		AssigneesId:  msg.AssigneesId,
		CreatedAt:    msg.CreatedAt,
		UpdatedAt:    msg.UpdatedAt,
		ClosedAt:     msg.ClosedAt,
		ClosedBy:     msg.ClosedBy,
		Extensions:   msg.Extensions,
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

	return &types.MsgUpdateIssueResponse{}, nil
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
