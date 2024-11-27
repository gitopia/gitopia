package keeper

import (
	"context"
	"fmt"
	"sort"
	"strings"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/gitopia/gitopia/v5/x/gitopia/types"
	"github.com/gitopia/gitopia/v5/x/gitopia/utils"
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

func (k Keeper) RepositoryPullRequestAll(c context.Context, req *types.QueryAllRepositoryPullRequestRequest) (*types.QueryAllRepositoryPullRequestResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(c)

	address, err := k.ResolveAddress(ctx, req.Id)
	if err != nil {
		return nil, status.Error(codes.NotFound, err.Error())
	}

	repository, found := k.GetAddressRepository(ctx, address.Address, req.RepositoryName)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}
	resAllRepositoryPullRequest := k.GetAllRepositoryPullRequest(ctx, repository.Id)
	var allRepositoryPullRequest []*types.PullRequest
	for i := 0; i < len(resAllRepositoryPullRequest); i++ {
		allRepositoryPullRequest = append(allRepositoryPullRequest, &resAllRepositoryPullRequest[i])
	}

	var pullRequests []*types.PullRequest
	pageRes, err := PaginateAllRepositoryPullRequest(k, ctx, allRepositoryPullRequest, req.Pagination, req.Option, func(pullRequest types.PullRequest) error {
		pullRequests = append(pullRequests, &pullRequest)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllRepositoryPullRequestResponse{PullRequest: pullRequests, Pagination: pageRes}, nil
}

func (k Keeper) RepositoryPullRequest(c context.Context, req *types.QueryGetRepositoryPullRequestRequest) (*types.QueryGetRepositoryPullRequestResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(c)

	address, err := k.ResolveAddress(ctx, req.Id)
	if err != nil {
		return nil, status.Error(codes.NotFound, err.Error())
	}

	var pullRequest types.PullRequest

	repository, found := k.GetAddressRepository(ctx, address.Address, req.RepositoryName)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	pullRequest, found = k.GetRepositoryPullRequest(ctx, repository.Id, req.PullIid)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	return &types.QueryGetRepositoryPullRequestResponse{PullRequest: &pullRequest}, nil
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

	pullRequest, found := k.GetRepositoryPullRequest(ctx, req.RepositoryId, req.PullIid)
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

/* PaginateAllRepositoryPullRequest does pagination of the provided pullrequest list
 * based on the provided PageRequest.
 */
func PaginateAllRepositoryPullRequest(
	k Keeper,
	ctx sdk.Context,
	pullRequests []*types.PullRequest,
	pageRequest *query.PageRequest,
	option *types.PullRequestOptions,
	onResult func(pullRequest types.PullRequest) error,
) (*query.PageResponse, error) {
	if option == nil {
		option = &types.PullRequestOptions{}
	}

	if option.Sort != "ASC" {
		sort.Sort(sort.Reverse(types.PullRequestList(pullRequests)))
	}

	if option.CreatedBy != "" {
		var pullRequestBuffer []*types.PullRequest
		for _, pullRequest := range pullRequests {
			address, err := k.ResolveAddress(ctx, option.CreatedBy)
			if err != nil {
				return nil, status.Error(codes.NotFound, err.Error())
			}

			if pullRequest.Creator == address.Address {
				pullRequestBuffer = append(pullRequestBuffer, pullRequest)
			}
		}
		pullRequests = pullRequestBuffer
	}

	if option.Assignee != "" {
		var pullRequestBuffer []*types.PullRequest
		for _, pullRequest := range pullRequests {
			address, err := k.ResolveAddress(ctx, option.Assignee)
			if err != nil {
				return nil, status.Error(codes.NotFound, err.Error())
			}

			if _, exists := utils.AssigneeExists(pullRequest.Assignees, address.Address); exists {
				pullRequestBuffer = append(pullRequestBuffer, pullRequest)
			}
		}
		pullRequests = pullRequestBuffer
	}

	if option.Reviewer != "" {
		var pullRequestBuffer []*types.PullRequest
		for _, pullRequest := range pullRequests {
			address, err := k.ResolveAddress(ctx, option.Reviewer)
			if err != nil {
				return nil, status.Error(codes.NotFound, err.Error())
			}

			if _, exists := utils.ReviewerExists(pullRequest.Reviewers, address.Address); exists {
				pullRequestBuffer = append(pullRequestBuffer, pullRequest)
			}
		}
		pullRequests = pullRequestBuffer
	}

	if option.State == types.PullRequest_OPEN.String() {
		var pullRequestBuffer []*types.PullRequest
		for _, pullRequest := range pullRequests {
			if pullRequest.State == types.PullRequest_OPEN {
				pullRequestBuffer = append(pullRequestBuffer, pullRequest)
			}
		}
		pullRequests = pullRequestBuffer
	} else if option.State == types.PullRequest_CLOSED.String() {
		var pullRequestBuffer []*types.PullRequest
		for _, pullRequest := range pullRequests {
			if pullRequest.State == types.PullRequest_CLOSED {
				pullRequestBuffer = append(pullRequestBuffer, pullRequest)
			}
		}
		pullRequests = pullRequestBuffer
	} else if option.State == types.PullRequest_MERGED.String() {
		var pullRequestBuffer []*types.PullRequest
		for _, pullRequest := range pullRequests {
			if pullRequest.State == types.PullRequest_MERGED {
				pullRequestBuffer = append(pullRequestBuffer, pullRequest)
			}
		}
		pullRequests = pullRequestBuffer
	}

	if option.Labels == "ANY" {
		var pullRequestBuffer []*types.PullRequest
		for _, pullRequest := range pullRequests {
			if len(pullRequest.Labels) > 0 {
				pullRequestBuffer = append(pullRequestBuffer, pullRequest)
			}
		}
		pullRequests = pullRequestBuffer
	} else if option.Labels == "NONE" {
		var pullRequestBuffer []*types.PullRequest
		for _, pullRequest := range pullRequests {
			if len(pullRequest.Labels) == 0 {
				pullRequestBuffer = append(pullRequestBuffer, pullRequest)
			}
		}
		pullRequests = pullRequestBuffer
	}

	if len(option.LabelIds) > 0 {
		var pullRequestBuffer []*types.PullRequest
		for _, pullRequest := range pullRequests {
			contains := false
			for _, l := range option.LabelIds {
				if _, exists := utils.LabelIdExists(pullRequest.Labels, l); exists {
					contains = true
				} else {
					contains = false
					break
				}
			}
			if contains {
				pullRequestBuffer = append(pullRequestBuffer, pullRequest)
			}
		}
		pullRequests = pullRequestBuffer
	}

	if option.UpdatedAfter != 0 {
		var pullRequestBuffer []*types.PullRequest
		for _, pullRequest := range pullRequests {
			if pullRequest.UpdatedAt > option.UpdatedAfter {
				pullRequestBuffer = append(pullRequestBuffer, pullRequest)
			}
		}
		pullRequests = pullRequestBuffer
	}

	if option.UpdatedBefore != 0 {
		var pullRequestBuffer []*types.PullRequest
		for _, pullRequest := range pullRequests {
			if pullRequest.UpdatedAt < option.UpdatedBefore {
				pullRequestBuffer = append(pullRequestBuffer, pullRequest)
			}
		}
		pullRequests = pullRequestBuffer
	}

	if option.Search != "" {
		var pullRequestBuffer []*types.PullRequest
		for _, pullRequest := range pullRequests {
			if strings.Contains(strings.ToLower(pullRequest.Title), strings.ToLower(option.Search)) {
				pullRequestBuffer = append(pullRequestBuffer, pullRequest)
			}
		}
		pullRequests = pullRequestBuffer
	}

	totalPullRequestCount := uint64(len(pullRequests))

	// if the PageRequest is nil, use default PageRequest
	if pageRequest == nil {
		pageRequest = &query.PageRequest{}
	}

	offset := pageRequest.Offset
	key := pageRequest.Key
	limit := pageRequest.Limit
	countTotal := pageRequest.CountTotal

	if offset > 0 && key != nil {
		return nil, fmt.Errorf("invalid request, either offset or key is expected, got both")
	}

	if limit == 0 {
		limit = DefaultLimit

		// show total issue count when the limit is zero/not supplied
		countTotal = true
	}

	if len(key) != 0 {
		var count uint64
		var nextKey []byte

		for i := GetPullRequestIDFromBytes(key); i < totalPullRequestCount; i++ {
			if count == limit {
				nextKey = GetPullRequestIDBytes(uint64(i))
				break
			}

			err := onResult(*pullRequests[i])
			if err != nil {
				return nil, err
			}

			count++
		}

		return &query.PageResponse{
			NextKey: nextKey,
		}, nil
	}

	end := offset + limit

	var nextKey []byte

	for i := offset; i < totalPullRequestCount; i++ {
		if uint64(i) < end {
			err := onResult(*pullRequests[i])
			if err != nil {
				return nil, err
			}
		} else if uint64(i) == end {
			nextKey = GetPullRequestIDBytes(uint64(i))
			break
		}
	}

	res := &query.PageResponse{NextKey: nextKey}
	if countTotal {
		res.Total = totalPullRequestCount
	}

	return res, nil
}
