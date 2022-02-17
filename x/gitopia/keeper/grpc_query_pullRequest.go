package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/gitopia/gitopia/x/gitopia/utils"
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

	//var pullRequest types.PullRequest
	ctx := sdk.UnwrapSDKContext(c)

	pullRequest, found := k.GetPullRequest(ctx, req.PullId)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	repository, found := k.GetRepository(ctx, pullRequest.Base.RepositoryId)
	if !found {
		return nil, sdkerrors.ErrLogic
	}

	var organization types.Organization

	if repository.Owner.Type == types.RepositoryOwner_ORGANIZATION {
		organization, found = k.GetOrganization(ctx, repository.Owner.Id)
		if !found {
			return nil, sdkerrors.ErrLogic
		}
	}

	if utils.HavePullRequestMergePermission(repository, req.UserAddress, organization) {
		return &types.QueryGetPullRequestMergePermissionResponse{HavePermission: true}, nil
	}

	return &types.QueryGetPullRequestMergePermissionResponse{HavePermission: false}, nil
}
