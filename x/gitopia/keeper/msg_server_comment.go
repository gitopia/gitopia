package keeper

import (
	"context"
	"fmt"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func assignCommentIid(ctx sdk.Context, k msgServer, issue types.Issue, parentIssueId uint64) (uint64, error) {
	if !k.HasIssue(ctx, parentIssueId) {
		return 0, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("Issue Id %d doesn't exist", parentIssueId))
	}
	var len = uint64(len(issue.Comments) + 1)
	return len, nil
}

func (k msgServer) CreateComment(goCtx context.Context, msg *types.MsgCreateComment) (*types.MsgCreateCommentResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	issue := k.GetIssue(ctx, msg.ParentId)

	commentIid, err := assignCommentIid(ctx, k, issue, msg.ParentId)
	if err != nil {
		return nil, err
	}
	createdAt := time.Now().Unix()
	updatedAt := time.Now().Unix()
	extensions := string("")

	var comment = types.Comment{
		Creator:           msg.Creator,
		ParentId:          msg.ParentId,
		CommentIid:        commentIid,
		Body:              msg.Body,
		Attachments:       msg.Attachments,
		DiffHunk:          msg.DiffHunk,
		Path:              msg.Path,
		System:            msg.System,
		AuthorId:          msg.AuthorId,
		AuthorAssociation: msg.AuthorAssociation,
		CreatedAt:         createdAt,
		UpdatedAt:         updatedAt,
		CommentType:       msg.CommentType,
		Extensions:        extensions,
	}

	id := k.AppendComment(
		ctx,
		comment,
	)

	/* Append Comment in the parent issue */
	issue.Comments = append(issue.Comments, id)
	k.SetIssue(ctx, issue)

	return &types.MsgCreateCommentResponse{
		Id: id,
	}, nil
}

func (k msgServer) UpdateComment(goCtx context.Context, msg *types.MsgUpdateComment) (*types.MsgUpdateCommentResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var comment = k.GetComment(ctx, msg.Id)

	comment.Body = msg.Body
	comment.Attachments = msg.Attachments
	comment.UpdatedAt = time.Now().Unix()

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
