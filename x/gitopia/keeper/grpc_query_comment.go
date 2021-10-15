package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/gitopia/gitopia/x/gitopia/types"
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

func (k Keeper) Comment(c context.Context, req *types.QueryGetCommentRequest) (*types.QueryGetCommentResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var comment types.Comment
	ctx := sdk.UnwrapSDKContext(c)

	comment, found := k.GetComment(ctx, req.Id)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}
	return &types.QueryGetCommentResponse{Comment: &comment}, nil
}
