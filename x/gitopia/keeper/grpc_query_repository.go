package keeper

import (
	"context"
	"fmt"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	ks "github.com/cosmos/cosmos-sdk/store/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	query "github.com/cosmos/cosmos-sdk/types/query"
	"github.com/gitopia/gitopia/v2/x/gitopia/types"
	"github.com/gitopia/gitopia/v2/x/gitopia/utils"
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
		if err := k.cdc.Unmarshal(value, &repository); err != nil {
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

	repository, found := k.GetRepositoryById(ctx, req.Id)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	return &types.QueryGetRepositoryResponse{Repository: &repository}, nil
}

func (k Keeper) RepositoryReleaseLatest(c context.Context, req *types.QueryGetLatestRepositoryReleaseRequest) (*types.QueryGetLatestRepositoryReleaseResponse, error) {
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

	totalReleaseCount := len(repository.Releases)

	if totalReleaseCount > 0 {
		var release types.Release

		releaseStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ReleaseKey))
		k.cdc.MustUnmarshal(releaseStore.Get(GetReleaseIDBytes(repository.Releases[totalReleaseCount-1].Id)), &release)

		return &types.QueryGetLatestRepositoryReleaseResponse{Release: &release}, nil
	}

	return nil, sdkerrors.ErrKeyNotFound
}

func (k Keeper) RepositoryRelease(c context.Context, req *types.QueryGetRepositoryReleaseRequest) (*types.QueryGetRepositoryReleaseResponse, error) {
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

	if i, exists := utils.RepositoryReleaseTagExists(repository.Releases, req.TagName); exists {
		var release types.Release

		releaseStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ReleaseKey))
		k.cdc.MustUnmarshal(releaseStore.Get(GetReleaseIDBytes(repository.Releases[i].Id)), &release)

		return &types.QueryGetRepositoryReleaseResponse{Release: &release}, nil
	}

	return nil, sdkerrors.ErrKeyNotFound
}

func (k Keeper) RepositoryReleaseAll(c context.Context, req *types.QueryAllRepositoryReleaseRequest) (*types.QueryAllRepositoryReleaseResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(c)

	address, err := k.ResolveAddress(ctx, req.Id)
	if err != nil {
		return nil, status.Error(codes.NotFound, err.Error())
	}

	var repository types.Repository
	var releases []*types.Release

	repository, found := k.GetAddressRepository(ctx, address.Address, req.RepositoryName)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	releaseStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ReleaseKey))
	pageRes, err := PaginateAllRepositoryRelease(k, ctx, releaseStore, repository, req.Pagination, func(release types.Release) error {
		releases = append(releases, &release)
		return nil
	})
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllRepositoryReleaseResponse{Release: releases, Pagination: pageRes}, nil
}

func (k Keeper) ForkAll(c context.Context, req *types.QueryGetAllForkRequest) (*types.QueryGetAllForkResponse, error) {
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

	var forks []*types.RepositoryFork

	pageRes, err := PaginateAllForkRepository(k, ctx, repository, req.Pagination, func(repositoryFork types.RepositoryFork) error {
		forks = append(forks, &repositoryFork)
		return nil
	})
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryGetAllForkResponse{Forks: forks, Pagination: pageRes}, nil
}

func PaginateAllForkRepository(
	k Keeper,
	ctx sdk.Context,
	repository types.Repository,
	pageRequest *query.PageRequest,
	onResult func(repository types.RepositoryFork) error,
) (*query.PageResponse, error) {

	totalRepositoryForkCount := len(repository.Forks)
	repositoryForks := repository.Forks

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

		for i := GetIssueIDFromBytes(key); uint64(i) <= uint64(totalRepositoryForkCount); i++ {
			if count == limit {
				nextKey = GetIssueIDBytes(uint64(i))
				break
			}

			var repositoryFork types.RepositoryFork
			if repository, found := k.GetRepositoryById(ctx, repositoryForks[i]); found {
				repositoryFork = types.RepositoryFork{
					Creator:     repository.Creator,
					Id:          repository.Id,
					Name:        repository.Name,
					Owner:       repository.Owner,
					Description: repository.Description,
					Parent:      repository.Parent,
					ForksCount:  uint64(len(repository.Forks)),
					IssuesCount: repository.IssuesCount,
					PullsCount:  repository.PullsCount,
				}
			}

			err := onResult(repositoryFork)
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

	for i := offset; uint64(i) < uint64(totalRepositoryForkCount); i++ {
		if uint64(i) < end {
			var repositoryFork types.RepositoryFork
			if repository, found := k.GetRepositoryById(ctx, repositoryForks[i]); found {
				repositoryFork = types.RepositoryFork{
					Creator:     repository.Creator,
					Id:          repository.Id,
					Name:        repository.Name,
					Owner:       repository.Owner,
					Description: repository.Description,
					Parent:      repository.Parent,
					ForksCount:  uint64(len(repository.Forks)),
					IssuesCount: repository.IssuesCount,
					PullsCount:  repository.PullsCount,
				}
			}
			err := onResult(repositoryFork)
			if err != nil {
				return nil, err
			}
		} else if uint64(i) == end {
			nextKey = GetIssueIDBytes(uint64(i))
			break
		}
	}

	res := &query.PageResponse{NextKey: nextKey}
	if countTotal {
		res.Total = uint64(totalRepositoryForkCount)
	}

	return res, nil
}

func PaginateAllRepositoryRelease(
	k Keeper,
	ctx sdk.Context,
	releaseStore ks.KVStore,
	repository types.Repository,
	pageRequest *query.PageRequest,
	onResult func(release types.Release) error,
) (*query.PageResponse, error) {

	totalReleaseCount := uint64(len(repository.Releases))
	releases := repository.Releases

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

		for i := GetReleaseIDFromBytes(key); uint64(i) <= totalReleaseCount; i++ {
			if count == limit {
				nextKey = GetIssueIDBytes(uint64(i))
				break
			}

			var release types.Release
			k.cdc.MustUnmarshal(releaseStore.Get(GetReleaseIDBytes(releases[uint64(i)].Id)), &release)
			err := onResult(release)
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

	for i := offset; uint64(i) < totalReleaseCount; i++ {
		if uint64(i) < end {
			var release types.Release
			k.cdc.MustUnmarshal(releaseStore.Get(GetReleaseIDBytes(releases[uint64(i)].Id)), &release)
			err := onResult(release)
			if err != nil {
				return nil, err
			}
		} else if uint64(i) == end+1 {
			nextKey = GetReleaseIDBytes(uint64(i))
			break
		}
	}

	res := &query.PageResponse{NextKey: nextKey}
	if countTotal {
		res.Total = totalReleaseCount
	}

	return res, nil
}
