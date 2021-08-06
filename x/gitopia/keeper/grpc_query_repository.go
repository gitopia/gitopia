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

func i64tob(val uint64) []byte {
	r := make([]byte, 8)
	for i := uint64(0); i < 8; i++ {
		r[i] = byte((val >> (i * 8)) & 0xff)
	}
	return r
}

func btoi64(val []byte) uint64 {
	r := uint64(0)
	for i := uint64(0); i < 8; i++ {
		r |= uint64(val[i]) << (8 * i)
	}
	return r
}

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

	if repositoryId, ok := user.RepositoryNames[req.RepositoryName]; ok {
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

	if repositoryId, ok := user.RepositoryNames[req.RepositoryName]; ok {
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

		for i := btoi64(key); uint64(i) <= totalIssueCount; i++ {
			if count == limit {
				nextKey = i64tob(uint64(i))
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

	for i := 1; uint64(i) <= totalIssueCount; i++ {
		if uint64(i) <= offset {
			continue
		}
		if uint64(i) <= end {
			var issue types.Issue
			k.cdc.MustUnmarshalBinaryBare(issueStore.Get(GetRepositoryIDBytes(issueIIds[uint64(i)])), &issue)
			err := onResult(issue)
			if err != nil {
				return nil, err
			}
		} else if uint64(i) == end+1 {
			nextKey = i64tob(uint64(i))
			break
		}
	}

	res := &query.PageResponse{NextKey: nextKey}
	if countTotal {
		res.Total = totalIssueCount
	}

	return res, nil
}
