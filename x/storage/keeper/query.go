package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/gitopia/gitopia/v5/x/storage/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

var _ types.QueryServer = Keeper{}

// Params returns the module parameters
func (k Keeper) Params(goCtx context.Context, req *types.QueryParamsRequest) (*types.QueryParamsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)

	return &types.QueryParamsResponse{Params: k.GetParams(ctx)}, nil
}

// Provider returns a storage provider by address
func (k Keeper) Provider(goCtx context.Context, req *types.QueryProviderRequest) (*types.QueryProviderResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)

	provider, found := k.GetProvider(ctx, req.Address)
	if !found {
		return nil, status.Errorf(codes.NotFound, "provider not found")
	}
	return &types.QueryProviderResponse{Provider: provider}, nil
}

// Providers returns all storage providers
func (k Keeper) Providers(goCtx context.Context, req *types.QueryProvidersRequest) (*types.QueryProvidersResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)

	var providers []types.Provider
	store := ctx.KVStore(k.storeKey)
	providerStore := prefix.NewStore(store, types.KeyPrefix(types.ProviderKey))

	pageRes, err := query.Paginate(providerStore, req.Pagination, func(key []byte, value []byte) error {
		var provider types.Provider
		if err := k.cdc.Unmarshal(value, &provider); err != nil {
			return err
		}
		providers = append(providers, provider)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryProvidersResponse{
		Providers:  providers,
		Pagination: pageRes,
	}, nil
}

// Packfile returns a packfile by ID
func (k Keeper) Packfile(goCtx context.Context, req *types.QueryPackfileRequest) (*types.QueryPackfileResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)

	packfile, found := k.GetPackfileById(ctx, req.Id)
	if !found {
		return nil, status.Errorf(codes.NotFound, "packfile not found")
	}
	return &types.QueryPackfileResponse{Packfile: packfile}, nil
}

// RepositoryPackfile returns a packfile for a repository
func (k Keeper) RepositoryPackfile(goCtx context.Context, req *types.QueryRepositoryPackfileRequest) (*types.QueryRepositoryPackfileResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)

	packfile, found := k.GetPackfile(ctx, req.RepositoryId)
	if !found {
		return nil, status.Errorf(codes.NotFound, "packfile not found")
	}

	return &types.QueryRepositoryPackfileResponse{
		Packfile: packfile,
	}, nil
}

// Challenge returns a challenge by ID
func (k Keeper) Challenge(goCtx context.Context, req *types.QueryChallengeRequest) (*types.QueryChallengeResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)

	challenge, found := k.GetChallenge(ctx, req.Id)
	if !found {
		return nil, status.Errorf(codes.NotFound, "challenge not found")
	}

	return &types.QueryChallengeResponse{Challenge: challenge}, nil
}
