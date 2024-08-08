package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/gitopia/gitopia/v4/x/gitopia/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) CommentAll(c context.Context, req *types.QueryAllCommentRequest) (*types.QueryAllCommentResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var comments []*types.Comment
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	commentStore := prefix.NewStore(store, types.KeyPrefix(types.CommentKey))

	pageRes, err := query.Paginate(commentStore, req.Pagination, func(key []byte, value []byte) error {
		var comment types.Comment
		if err := k.cdc.Unmarshal(value, &comment); err != nil {
			return err
		}

		comments = append(comments, &comment)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllCommentResponse{Comment: comments, Pagination: pageRes}, nil
}

func (k Keeper) IssueCommentAll(c context.Context, req *types.QueryAllIssueCommentRequest) (*types.QueryAllIssueCommentResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var comments []*types.Comment
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	commentStore := prefix.NewStore(store, types.KeyPrefix(types.GetCommentKeyForIssue(req.RepositoryId, req.IssueIid)))

	pageRes, err := query.Paginate(commentStore, req.Pagination, func(key []byte, value []byte) error {
		var comment types.Comment
		if err := k.cdc.Unmarshal(value, &comment); err != nil {
			return err
		}

		comments = append(comments, &comment)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllIssueCommentResponse{Comment: comments, Pagination: pageRes}, nil
}

func (k Keeper) PullRequestCommentAll(c context.Context, req *types.QueryAllPullRequestCommentRequest) (*types.QueryAllPullRequestCommentResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var comments []*types.Comment
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	commentStore := prefix.NewStore(store, types.KeyPrefix(types.GetCommentKeyForPullRequest(req.RepositoryId, req.PullRequestIid)))

	pageRes, err := query.Paginate(commentStore, req.Pagination, func(key []byte, value []byte) error {
		var comment types.Comment
		if err := k.cdc.Unmarshal(value, &comment); err != nil {
			return err
		}

		comments = append(comments, &comment)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllPullRequestCommentResponse{Comment: comments, Pagination: pageRes}, nil
}

func (k Keeper) IssueComment(c context.Context, req *types.QueryGetIssueCommentRequest) (*types.QueryGetIssueCommentResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	comment, found := k.GetIssueComment(ctx, req.RepositoryId, req.IssueIid, req.CommentIid)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}
	return &types.QueryGetIssueCommentResponse{Comment: &comment}, nil
}

func (k Keeper) PullRequestComment(c context.Context, req *types.QueryGetPullRequestCommentRequest) (*types.QueryGetPullRequestCommentResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	comment, found := k.GetPullRequestComment(ctx, req.RepositoryId, req.PullRequestIid, req.CommentIid)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}
	return &types.QueryGetPullRequestCommentResponse{Comment: &comment}, nil
}
