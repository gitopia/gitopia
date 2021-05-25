package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func (k msgServer) CreateRepository(goCtx context.Context, msg *types.MsgCreateRepository) (*types.MsgCreateRepositoryResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	id := k.AppendRepository(
		ctx,
		msg.Creator,
		msg.Name,
		msg.Owner,
		msg.Description,
	)

	return &types.MsgCreateRepositoryResponse{
		Id: id,
	}, nil
}

func (k msgServer) UpdateRepository(goCtx context.Context, msg *types.MsgUpdateRepository) (*types.MsgUpdateRepositoryResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var repository = types.Repository{
		Creator:     msg.Creator,
		Id:          msg.Id,
		Name:        msg.Name,
		Owner:       msg.Owner,
		Description: msg.Description,
		// Forks:         msg.Forks,
		Branches:    msg.Branches,
		Tags:        msg.Tags,
		Subscribers: msg.Subscribers,
		Commits:     msg.Commits,
		// IssuesOpen:    msg.IssuesOpen,
		// IssuesClosed:  msg.IssuesClosed,
		// Pulls:         msg.Pulls,
		Labels:   msg.Labels,
		Releases: msg.Releases,
		// CreatedAt:     msg.CreatedAt,
		// UpdatedAt:     msg.UpdatedAt,
		// PushedAt:      msg.PushedAt,
		// Stargazers:    msg.Stargazers,
		// Archived:      msg.Archived,
		License:       msg.License,
		DefaultBranch: msg.DefaultBranch,
		Extensions:    msg.Extensions,
	}

	// Checks that the element exists
	if !k.HasRepository(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != k.GetRepositoryOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.SetRepository(ctx, repository)

	return &types.MsgUpdateRepositoryResponse{}, nil
}

func (k msgServer) DeleteRepository(goCtx context.Context, msg *types.MsgDeleteRepository) (*types.MsgDeleteRepositoryResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasRepository(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}
	if msg.Creator != k.GetRepositoryOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.RemoveRepository(ctx, msg.Id)

	return &types.MsgDeleteRepositoryResponse{}, nil
}
