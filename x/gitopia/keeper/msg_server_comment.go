package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func (k msgServer) CreateComment(goCtx context.Context, msg *types.MsgCreateComment) (*types.MsgCreateCommentResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	id := k.AppendComment(
		ctx,
		msg.Creator,
		msg.ParentId,
		msg.CommentIid,
		msg.Body,
		msg.Attachments,
		msg.DiffHunk,
		msg.Path,
		msg.System,
		msg.AuthorId,
		msg.AuthorAssociation,
		msg.CreatedAt,
		msg.UpdatedAt,
		msg.CommentType,
		msg.Extensions,
	)

	return &types.MsgCreateCommentResponse{
		Id: id,
	}, nil
}

func (k msgServer) UpdateComment(goCtx context.Context, msg *types.MsgUpdateComment) (*types.MsgUpdateCommentResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var comment = types.Comment{
		Creator:           msg.Creator,
		Id:                msg.Id,
		ParentId:          msg.ParentId,
		CommentIid:        msg.CommentIid,
		Body:              msg.Body,
		Attachments:       msg.Attachments,
		DiffHunk:          msg.DiffHunk,
		Path:              msg.Path,
		System:            msg.System,
		AuthorId:          msg.AuthorId,
		AuthorAssociation: msg.AuthorAssociation,
		CreatedAt:         msg.CreatedAt,
		UpdatedAt:         msg.UpdatedAt,
		CommentType:       msg.CommentType,
		Extensions:        msg.Extensions,
	}

	// Checks that the element exists
	if !k.HasComment(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != k.GetCommentOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.SetComment(ctx, comment)

	return &types.MsgUpdateCommentResponse{}, nil
}

func (k msgServer) DeleteComment(goCtx context.Context, msg *types.MsgDeleteComment) (*types.MsgDeleteCommentResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasComment(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}
	if msg.Creator != k.GetCommentOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.RemoveComment(ctx, msg.Id)

	return &types.MsgDeleteCommentResponse{}, nil
}
