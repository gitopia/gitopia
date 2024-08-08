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

func (k Keeper) TagAll(c context.Context, req *types.QueryAllTagRequest) (*types.QueryAllTagResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var tags []types.Tag
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	tagStore := prefix.NewStore(store, types.KeyPrefix(types.TagKey))

	pageRes, err := query.Paginate(tagStore, req.Pagination, func(key []byte, value []byte) error {
		var tag types.Tag
		if err := k.cdc.Unmarshal(value, &tag); err != nil {
			return err
		}

		tags = append(tags, tag)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllTagResponse{Tag: tags, Pagination: pageRes}, nil
}

func (k Keeper) RepositoryTagAll(c context.Context, req *types.QueryAllRepositoryTagRequest) (*types.QueryAllRepositoryTagResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var tags []types.Tag
	ctx := sdk.UnwrapSDKContext(c)

	address, err := k.ResolveAddress(ctx, req.Id)
	if err != nil {
		return nil, err
	}

	repository, found := k.GetAddressRepository(ctx, address.Address, req.RepositoryName)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	store := ctx.KVStore(k.storeKey)
	tagStore := prefix.NewStore(
		store,
		types.KeyPrefix(types.GetTagKeyForRepositoryId(repository.Id)),
	)

	pageRes, err := query.Paginate(tagStore, req.Pagination, func(key []byte, value []byte) error {
		var tag types.Tag
		if err := k.cdc.Unmarshal(value, &tag); err != nil {
			return err
		}

		tags = append(tags, tag)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllRepositoryTagResponse{Tag: tags, Pagination: pageRes}, nil
}

func (k Keeper) RepositoryTag(c context.Context, req *types.QueryGetRepositoryTagRequest) (*types.QueryGetRepositoryTagResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(c)

	address, err := k.ResolveAddress(ctx, req.Id)
	if err != nil {
		return nil, err
	}

	repository, found := k.GetAddressRepository(ctx, address.Address, req.RepositoryName)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	tag, found := k.GetRepositoryTag(ctx, repository.Id, req.TagName)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	return &types.QueryGetRepositoryTagResponse{Tag: tag}, nil
}

func (k Keeper) RepositoryTagSha(c context.Context, req *types.QueryGetRepositoryTagShaRequest) (*types.QueryGetRepositoryTagShaResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	address, err := k.ResolveAddress(ctx, req.Id)
	if err != nil {
		return nil, err
	}

	repository, found := k.GetAddressRepository(ctx, address.Address, req.RepositoryName)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	tag, found := k.GetRepositoryTag(ctx, repository.Id, req.TagName)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	return &types.QueryGetRepositoryTagShaResponse{Sha: tag.Sha}, nil
}
