package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func (k msgServer) CreateRelease(goCtx context.Context, msg *types.MsgCreateRelease) (*types.MsgCreateReleaseResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var release = types.Release{
		Creator:      msg.Creator,
		RepositoryId: msg.RepositoryId,
		TagName:      msg.TagName,
		Target:       msg.Target,
		Name:         msg.Name,
		Description:  msg.Description,
		Attachments:  msg.Attachments,
		Draft:        msg.Draft,
		PreRelease:   msg.PreRelease,
		IsTag:        msg.IsTag,
		CreatedAt:    msg.CreatedAt,
		UpdatedAt:    msg.UpdatedAt,
		PublishedAt:  msg.PublishedAt,
	}

	id := k.AppendRelease(
		ctx,
		release,
	)

	return &types.MsgCreateReleaseResponse{
		Id: id,
	}, nil
}

func (k msgServer) UpdateRelease(goCtx context.Context, msg *types.MsgUpdateRelease) (*types.MsgUpdateReleaseResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var release = types.Release{
		Creator:      msg.Creator,
		Id:           msg.Id,
		RepositoryId: msg.RepositoryId,
		TagName:      msg.TagName,
		Target:       msg.Target,
		Name:         msg.Name,
		Description:  msg.Description,
		Attachments:  msg.Attachments,
		Draft:        msg.Draft,
		PreRelease:   msg.PreRelease,
		IsTag:        msg.IsTag,
		CreatedAt:    msg.CreatedAt,
		UpdatedAt:    msg.UpdatedAt,
		PublishedAt:  msg.PublishedAt,
	}

	// Checks that the element exists
	if !k.HasRelease(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != k.GetReleaseOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.SetRelease(ctx, release)

	return &types.MsgUpdateReleaseResponse{}, nil
}

func (k msgServer) DeleteRelease(goCtx context.Context, msg *types.MsgDeleteRelease) (*types.MsgDeleteReleaseResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasRelease(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}
	if msg.Creator != k.GetReleaseOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.RemoveRelease(ctx, msg.Id)

	return &types.MsgDeleteReleaseResponse{}, nil
}
