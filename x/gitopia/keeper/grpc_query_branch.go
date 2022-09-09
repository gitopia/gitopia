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

func (k Keeper) BranchAll(c context.Context, req *types.QueryAllBranchRequest) (*types.QueryAllBranchResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	branchStore := prefix.NewStore(
		store,
		types.KeyPrefix(types.BranchKey),
	)

	var branchs []types.Branch
	pageRes, err := query.Paginate(branchStore, req.Pagination, func(key []byte, value []byte) error {
		var branch types.Branch
		if err := k.cdc.Unmarshal(value, &branch); err != nil {
			return err
		}

		branchs = append(branchs, branch)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllBranchResponse{Branch: branchs, Pagination: pageRes}, nil
}

func (k Keeper) RepositoryBranchAll(c context.Context, req *types.QueryAllRepositoryBranchRequest) (*types.QueryAllRepositoryBranchResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(c)

	address, err := k.ResolveAddress(ctx, req.Id)
	if err != nil {
		return nil, err
	}
	repository, found := k.GetAddressRepository(ctx, address.address, req.RepositoryName)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	store := ctx.KVStore(k.storeKey)
	branchStore := prefix.NewStore(
		store,
		types.KeyPrefix(types.GetBranchKeyForRepositoryId(repository.Id)),
	)

	var branchs []types.Branch
	pageRes, err := query.Paginate(branchStore, req.Pagination, func(key []byte, value []byte) error {
		var branch types.Branch
		if err := k.cdc.Unmarshal(value, &branch); err != nil {
			return err
		}

		branchs = append(branchs, branch)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllRepositoryBranchResponse{Branch: branchs, Pagination: pageRes}, nil
}

func (k Keeper) RepositoryBranch(c context.Context, req *types.QueryGetRepositoryBranchRequest) (*types.QueryGetRepositoryBranchResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(c)

	address, err := k.ResolveAddress(ctx, req.Id)
	if err != nil {
		return nil, err
	}

	repository, found := k.GetAddressRepository(ctx, address.address, req.RepositoryName)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	branch, found := k.GetRepositoryBranch(ctx, repository.Id, req.BranchName)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	return &types.QueryGetRepositoryBranchResponse{Branch: branch}, nil
}

func (k Keeper) RepositoryBranchSha(c context.Context, req *types.QueryGetRepositoryBranchShaRequest) (*types.QueryGetRepositoryBranchShaResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(c)

	address, err := k.ResolveAddress(ctx, req.Id)
	if err != nil {
		return nil, err
	}

	repository, found := k.GetAddressRepository(ctx, address.address, req.RepositoryName)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	branch, found := k.GetRepositoryBranch(ctx, repository.Id, req.BranchName)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	return &types.QueryGetRepositoryBranchShaResponse{Sha: branch.Sha}, nil
}
