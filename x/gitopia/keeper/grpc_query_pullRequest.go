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

func (k Keeper) PullRequestAll(c context.Context, req *types.QueryAllPullRequestRequest) (*types.QueryAllPullRequestResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var pullRequests []*types.PullRequest
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	pullRequestStore := prefix.NewStore(store, types.KeyPrefix(types.PullRequestKey))

	pageRes, err := query.Paginate(pullRequestStore, req.Pagination, func(key []byte, value []byte) error {
		var pullRequest types.PullRequest
		if err := k.cdc.Unmarshal(value, &pullRequest); err != nil {
			return err
		}

		pullRequests = append(pullRequests, &pullRequest)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllPullRequestResponse{PullRequest: pullRequests, Pagination: pageRes}, nil
}

func (k Keeper) PullRequest(c context.Context, req *types.QueryGetPullRequestRequest) (*types.QueryGetPullRequestResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var pullRequest types.PullRequest
	ctx := sdk.UnwrapSDKContext(c)

	pullRequest, found := k.GetPullRequest(ctx, req.Id)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	return &types.QueryGetPullRequestResponse{PullRequest: &pullRequest}, nil
}

func (k Keeper) PullRequestMergePermission(c context.Context, req *types.QueryGetPullRequestMergePermissionRequest) (*types.QueryGetPullRequestMergePermissionResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(c)

	address, err := k.ResolveAddress(ctx, req.UserId)
	if err != nil {
		return nil, err
	}

	pullRequest, found := k.GetPullRequest(ctx, req.PullId)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	repository, found := k.GetRepositoryById(ctx, pullRequest.Base.RepositoryId)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	if k.HavePermission(ctx, address.Address, repository, types.PullRequestMergePermission) {
		return &types.QueryGetPullRequestMergePermissionResponse{HavePermission: true}, nil
	}

	return &types.QueryGetPullRequestMergePermissionResponse{HavePermission: false}, nil
}
