package keeper

import (
	"context"
	"fmt"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	ks "github.com/cosmos/cosmos-sdk/store/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	query "github.com/cosmos/cosmos-sdk/types/query"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

const DefaultLimit = 100

func (k Keeper) RepositoryAll(c context.Context, req *types.QueryAllRepositoryRequest) (*types.QueryAllRepositoryResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var repositorys []*types.Repository
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	repositoryStore := prefix.NewStore(store, types.KeyPrefix(types.RepositoryKey))

	pageRes, err := query.Paginate(repositoryStore, req.Pagination, func(key []byte, value []byte) error {
		var repository types.Repository
		if err := k.cdc.UnmarshalBinaryBare(value, &repository); err != nil {
			return err
		}

		repositorys = append(repositorys, &repository)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllRepositoryResponse{Repository: repositorys, Pagination: pageRes}, nil
}

func (k Keeper) Repository(c context.Context, req *types.QueryGetRepositoryRequest) (*types.QueryGetRepositoryResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var repository types.Repository
	ctx := sdk.UnwrapSDKContext(c)

	if !k.HasRepository(ctx, req.Id) {
		return nil, sdkerrors.ErrKeyNotFound
	}

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))
	k.cdc.MustUnmarshalBinaryBare(store.Get(GetRepositoryIDBytes(req.Id)), &repository)

	return &types.QueryGetRepositoryResponse{Repository: &repository}, nil
}

func (k Keeper) RepositoryIssueAll(c context.Context, req *types.QueryAllRepositoryIssueRequest) (*types.QueryAllRepositoryIssueResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var user types.User
	var repository types.Repository
	var issues []*types.Issue
	ctx := sdk.UnwrapSDKContext(c)

	if !k.HasUser(ctx, req.UserId) {
		return nil, sdkerrors.ErrKeyNotFound
	}

	store := ctx.KVStore(k.storeKey)
	userStore := prefix.NewStore(store, types.KeyPrefix(types.UserKey))
	userKey := []byte(types.UserKey + req.UserId)
	k.cdc.UnmarshalBinaryBare(userStore.Get(userKey), &user)

	if repositoryId, ok := user.Repositories[req.RepositoryName]; ok {
		repositoryStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))
		k.cdc.MustUnmarshalBinaryBare(repositoryStore.Get(GetRepositoryIDBytes(repositoryId)), &repository)

		issueStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.IssueKey))

		pageRes, err := PaginateAllRepositoryIssue(k, ctx, issueStore, repository, req.Pagination, func(issue types.Issue) error {
			issues = append(issues, &issue)
			return nil
		})

		if err != nil {
			return nil, status.Error(codes.Internal, err.Error())
		}

		return &types.QueryAllRepositoryIssueResponse{Issue: issues, Pagination: pageRes}, nil
	}

	return nil, sdkerrors.ErrKeyNotFound
}

func (k Keeper) RepositoryIssue(c context.Context, req *types.QueryGetRepositoryIssueRequest) (*types.QueryGetRepositoryIssueResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var user types.User
	var repository types.Repository
	var issue types.Issue
	ctx := sdk.UnwrapSDKContext(c)

	if !k.HasUser(ctx, req.UserId) {
		return nil, sdkerrors.ErrKeyNotFound
	}

	userStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.UserKey))
	userKey := []byte(types.UserKey + req.UserId)
	k.cdc.UnmarshalBinaryBare(userStore.Get(userKey), &user)

	if repositoryId, ok := user.Repositories[req.RepositoryName]; ok {
		repositoryStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))
		k.cdc.MustUnmarshalBinaryBare(repositoryStore.Get(GetRepositoryIDBytes(repositoryId)), &repository)

		if issueId, ok := repository.IssueIids[req.IssueIid]; ok {
			issueStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.IssueKey))
			k.cdc.MustUnmarshalBinaryBare(issueStore.Get(GetIssueIDBytes(issueId)), &issue)

			return &types.QueryGetRepositoryIssueResponse{Issue: &issue}, nil
		}
	}

	return nil, sdkerrors.ErrKeyNotFound
}

func (k Keeper) RepositoryPullRequestAll(c context.Context, req *types.QueryAllRepositoryPullRequestRequest) (*types.QueryAllRepositoryPullRequestResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var user types.User
	var repository types.Repository
	var pullRequests []*types.PullRequest
	ctx := sdk.UnwrapSDKContext(c)

	if !k.HasUser(ctx, req.UserId) {
		return nil, sdkerrors.ErrKeyNotFound
	}

	store := ctx.KVStore(k.storeKey)
	userStore := prefix.NewStore(store, types.KeyPrefix(types.UserKey))
	userKey := []byte(types.UserKey + req.UserId)
	k.cdc.UnmarshalBinaryBare(userStore.Get(userKey), &user)

	if repositoryId, ok := user.Repositories[req.RepositoryName]; ok {
		repositoryStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))
		k.cdc.MustUnmarshalBinaryBare(repositoryStore.Get(GetRepositoryIDBytes(repositoryId)), &repository)

		pullRequestStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PullRequestKey))

		pageRes, err := PaginateAllRepositoryPullRequest(k, ctx, pullRequestStore, repository, req.Pagination, func(pullRequest types.PullRequest) error {
			pullRequests = append(pullRequests, &pullRequest)
			return nil
		})

		if err != nil {
			return nil, status.Error(codes.Internal, err.Error())
		}

		return &types.QueryAllRepositoryPullRequestResponse{PullRequest: pullRequests, Pagination: pageRes}, nil
	}

	return nil, sdkerrors.ErrKeyNotFound
}

func (k Keeper) RepositoryPullRequest(c context.Context, req *types.QueryGetRepositoryPullRequestRequest) (*types.QueryGetRepositoryPullRequestResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var user types.User
	var repository types.Repository
	var pullRequest types.PullRequest
	ctx := sdk.UnwrapSDKContext(c)

	if !k.HasUser(ctx, req.UserId) {
		return nil, sdkerrors.ErrKeyNotFound
	}

	userStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.UserKey))
	userKey := []byte(types.UserKey + req.UserId)
	k.cdc.UnmarshalBinaryBare(userStore.Get(userKey), &user)

	if repositoryId, ok := user.Repositories[req.RepositoryName]; ok {
		repositoryStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))
		k.cdc.MustUnmarshalBinaryBare(repositoryStore.Get(GetRepositoryIDBytes(repositoryId)), &repository)

		if pullRequestId, ok := repository.PullIids[req.PullIid]; ok {
			pullRequestStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PullRequestKey))
			k.cdc.MustUnmarshalBinaryBare(pullRequestStore.Get(GetPullRequestIDBytes(pullRequestId)), &pullRequest)

			return &types.QueryGetRepositoryPullRequestResponse{PullRequest: &pullRequest}, nil
		}
	}

	return nil, sdkerrors.ErrKeyNotFound
}

func (k Keeper) BranchAll(c context.Context, req *types.QueryGetAllBranchRequest) (*types.QueryGetAllBranchResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var repository types.Repository
	ctx := sdk.UnwrapSDKContext(c)

	if !k.HasRepository(ctx, req.Id) {
		return nil, sdkerrors.ErrKeyNotFound
	}

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))
	k.cdc.MustUnmarshalBinaryBare(store.Get(GetRepositoryIDBytes(req.Id)), &repository)

	return &types.QueryGetAllBranchResponse{Branches: repository.GetBranches()}, nil
}

func (k Keeper) BranchSha(c context.Context, req *types.QueryGetBranchShaRequest) (*types.QueryGetBranchShaResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var repository types.Repository
	ctx := sdk.UnwrapSDKContext(c)

	if !k.HasRepository(ctx, req.RepositoryId) {
		return nil, sdkerrors.ErrKeyNotFound
	}

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))
	k.cdc.MustUnmarshalBinaryBare(store.Get(GetRepositoryIDBytes(req.RepositoryId)), &repository)

	if branchSha, ok := repository.Branches[req.BranchName]; ok {
		return &types.QueryGetBranchShaResponse{Sha: branchSha}, nil
	}

	return nil, sdkerrors.ErrKeyNotFound
}

/* PaginateAllRepositoryIssue does pagination of all the results in the repository.IssueIids
 * based on the provided PageRequest.
 */
func PaginateAllRepositoryIssue(
	k Keeper,
	ctx sdk.Context,
	issueStore ks.KVStore,
	repository types.Repository,
	pageRequest *query.PageRequest,
	onResult func(issue types.Issue) error,
) (*query.PageResponse, error) {

	totalIssueCount := repository.IssuesCount
	issueIIds := repository.IssueIids

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

		for i := GetIssueIDFromBytes(key); uint64(i) <= totalIssueCount; i++ {
			if count == limit {
				nextKey = GetIssueIDBytes(uint64(i))
				break
			}

			var issue types.Issue
			k.cdc.MustUnmarshalBinaryBare(issueStore.Get(GetRepositoryIDBytes(issueIIds[uint64(i)])), &issue)
			err := onResult(issue)
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

	for i := offset + 1; uint64(i) <= totalIssueCount; i++ {
		if uint64(i) <= end {
			var issue types.Issue
			k.cdc.MustUnmarshalBinaryBare(issueStore.Get(GetRepositoryIDBytes(issueIIds[uint64(i)])), &issue)
			err := onResult(issue)
			if err != nil {
				return nil, err
			}
		} else if uint64(i) == end+1 {
			nextKey = GetIssueIDBytes(uint64(i))
			break
		}
	}

	res := &query.PageResponse{NextKey: nextKey}
	if countTotal {
		res.Total = totalIssueCount
	}

	return res, nil
}

/* PaginateAllRepositoryPullRequest does pagination of all the results in the repository.IssueIids
 * based on the provided PageRequest.
 */
func PaginateAllRepositoryPullRequest(
	k Keeper,
	ctx sdk.Context,
	pullRequestStore ks.KVStore,
	repository types.Repository,
	pageRequest *query.PageRequest,
	onResult func(pullRequest types.PullRequest) error,
) (*query.PageResponse, error) {

	totalPullRequestCount := repository.PullsCount
	pullRequestIIds := repository.PullIids

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

		for i := GetPullRequestIDFromBytes(key); uint64(i) <= totalPullRequestCount; i++ {
			if count == limit {
				nextKey = GetPullRequestIDBytes(uint64(i))
				break
			}

			var pullRequest types.PullRequest
			k.cdc.MustUnmarshalBinaryBare(pullRequestStore.Get(GetPullRequestIDBytes(pullRequestIIds[uint64(i)])), &pullRequest)
			err := onResult(pullRequest)
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

	for i := offset + 1; uint64(i) <= totalPullRequestCount; i++ {
		if uint64(i) <= end {
			var pullRequest types.PullRequest
			k.cdc.MustUnmarshalBinaryBare(pullRequestStore.Get(GetPullRequestIDBytes(pullRequestIIds[uint64(i)])), &pullRequest)
			err := onResult(pullRequest)
			if err != nil {
				return nil, err
			}
		} else if uint64(i) == end+1 {
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
