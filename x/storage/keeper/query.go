package keeper

import (
	"context"
	"fmt"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/gitopia/gitopia/v6/x/storage/types"
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

// ActiveProviders returns all active storage providers
func (k Keeper) ActiveProviders(goCtx context.Context, req *types.QueryActiveProvidersRequest) (*types.QueryActiveProvidersResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)

	activeProviders := k.GetActiveProviders(ctx)

	return &types.QueryActiveProvidersResponse{
		Providers: activeProviders,
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

// Packfiles returns all packfiles
func (k Keeper) Packfiles(goCtx context.Context, req *types.QueryPackfilesRequest) (*types.QueryPackfilesResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)

	var packfiles []types.Packfile
	store := ctx.KVStore(k.storeKey)
	packfileStore := prefix.NewStore(store, types.KeyPrefix(types.PackfileKey))

	pageRes, err := query.Paginate(packfileStore, req.Pagination, func(key []byte, value []byte) error {
		var packfile types.Packfile
		if err := k.cdc.Unmarshal(value, &packfile); err != nil {
			return err
		}
		packfiles = append(packfiles, packfile)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryPackfilesResponse{
		Packfiles:  packfiles,
		Pagination: pageRes,
	}, nil
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

// ReleaseAsset returns a release asset by ID
func (k Keeper) ReleaseAsset(goCtx context.Context, req *types.QueryReleaseAssetRequest) (*types.QueryReleaseAssetResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)

	asset, found := k.GetReleaseAssetById(ctx, req.Id)
	if !found {
		return nil, status.Errorf(codes.NotFound, "release asset not found")
	}
	return &types.QueryReleaseAssetResponse{ReleaseAsset: asset}, nil
}

// ReleaseAssets returns all release assets
func (k Keeper) ReleaseAssets(goCtx context.Context, req *types.QueryReleaseAssetsRequest) (*types.QueryReleaseAssetsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)

	var releaseAssets []types.ReleaseAsset
	store := ctx.KVStore(k.storeKey)
	releaseAssetStore := prefix.NewStore(store, types.KeyPrefix(types.ReleaseAssetKey))

	pageRes, err := query.Paginate(releaseAssetStore, req.Pagination, func(key []byte, value []byte) error {
		var releaseAsset types.ReleaseAsset
		if err := k.cdc.Unmarshal(value, &releaseAsset); err != nil {
			return err
		}
		releaseAssets = append(releaseAssets, releaseAsset)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryReleaseAssetsResponse{
		ReleaseAssets: releaseAssets,
		Pagination:    pageRes,
	}, nil
}

// RepositoryReleaseAsset returns a release asset for a repository
func (k Keeper) RepositoryReleaseAsset(goCtx context.Context, req *types.QueryRepositoryReleaseAssetRequest) (*types.QueryRepositoryReleaseAssetResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)

	asset, found := k.GetReleaseAsset(ctx, req.RepositoryId, req.Tag, req.Name)
	if !found {
		return nil, status.Errorf(codes.NotFound, "release asset not found")
	}

	return &types.QueryRepositoryReleaseAssetResponse{
		ReleaseAsset: asset,
	}, nil
}

// RepositoryReleaseAssets returns all release assets for a repository by repository id and tag
func (k Keeper) RepositoryReleaseAssets(goCtx context.Context, req *types.QueryRepositoryReleaseAssetsRequest) (*types.QueryRepositoryReleaseAssetsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)

	assets := k.GetReleaseAssets(ctx, req.RepositoryId, req.Tag)
	return &types.QueryRepositoryReleaseAssetsResponse{
		ReleaseAssets: assets,
	}, nil
}

// RepositoryReleaseAssetsByRepositoryId returns all release assets for a repository by repository id
func (k Keeper) RepositoryReleaseAssetsByRepositoryId(goCtx context.Context, req *types.QueryRepositoryReleaseAssetsByRepositoryIdRequest) (*types.QueryRepositoryReleaseAssetsByRepositoryIdResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)

	var assets []types.ReleaseAsset
	store := ctx.KVStore(k.storeKey)
	releaseAssetStore := prefix.NewStore(store, types.KeyPrefix(fmt.Sprintf("%s%d", types.ReleaseAssetKey, req.RepositoryId)))

	pageRes, err := query.Paginate(releaseAssetStore, req.Pagination, func(key []byte, value []byte) error {
		var releaseAsset types.ReleaseAsset
		if err := k.cdc.Unmarshal(value, &releaseAsset); err != nil {
			return err
		}
		assets = append(assets, releaseAsset)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryRepositoryReleaseAssetsByRepositoryIdResponse{
		ReleaseAssets: assets,
		Pagination:    pageRes,
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

// Challenges returns all challenges
func (k Keeper) Challenges(goCtx context.Context, req *types.QueryChallengesRequest) (*types.QueryChallengesResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)

	var challenges []types.Challenge
	store := ctx.KVStore(k.storeKey)
	challengeStore := prefix.NewStore(store, types.KeyPrefix(types.ChallengeKey))

	pageRes, err := query.Paginate(challengeStore, req.Pagination, func(key []byte, value []byte) error {
		var challenge types.Challenge
		if err := k.cdc.Unmarshal(value, &challenge); err != nil {
			return err
		}
		challenges = append(challenges, challenge)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryChallengesResponse{
		Challenges: challenges,
		Pagination: pageRes,
	}, nil
}

// TotalStorage returns the total storage size
func (k Keeper) TotalStorage(goCtx context.Context, req *types.QueryTotalStorageRequest) (*types.QueryTotalStorageResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)

	totalStorage := k.GetTotalStorageSize(ctx)
	return &types.QueryTotalStorageResponse{TotalStorage: totalStorage}, nil
}

// CidReferenceCount returns the reference count for a CID
func (k Keeper) CidReferenceCount(goCtx context.Context, req *types.QueryCidReferenceCountRequest) (*types.QueryCidReferenceCountResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)

	count, _ := k.GetCidReferenceCount(ctx, req.Cid)
	return &types.QueryCidReferenceCountResponse{Count: count.Count}, nil
}

// CidReferenceCounts returns all cid reference counts
func (k Keeper) CidReferenceCounts(goCtx context.Context, req *types.QueryCidReferenceCountsRequest) (*types.QueryCidReferenceCountsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)

	var cidReferenceCounts []types.CidReferenceCount
	store := ctx.KVStore(k.storeKey)
	cidReferenceCountStore := prefix.NewStore(store, types.KeyPrefix(types.CidReferenceCountKey))

	pageRes, err := query.Paginate(cidReferenceCountStore, req.Pagination, func(key []byte, value []byte) error {
		var cidReferenceCount types.CidReferenceCount
		if err := k.cdc.Unmarshal(value, &cidReferenceCount); err != nil {
			return err
		}
		cidReferenceCounts = append(cidReferenceCounts, cidReferenceCount)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryCidReferenceCountsResponse{
		CidReferenceCounts: cidReferenceCounts,
		Pagination:         pageRes,
	}, nil
}

// LFSObjects returns all LFS objects
func (k Keeper) LFSObjects(goCtx context.Context, req *types.QueryLFSObjectsRequest) (*types.QueryLFSObjectsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)

	var lfsObjects []types.LFSObject
	store := ctx.KVStore(k.storeKey)
	lfsObjectStore := prefix.NewStore(store, types.KeyPrefix(types.LFSObjectKey))

	pageRes, err := query.Paginate(lfsObjectStore, req.Pagination, func(key []byte, value []byte) error {
		var lfsObject types.LFSObject
		if err := k.cdc.Unmarshal(value, &lfsObject); err != nil {
			return err
		}
		lfsObjects = append(lfsObjects, lfsObject)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryLFSObjectsResponse{
		LfsObjects: lfsObjects,
		Pagination: pageRes,
	}, nil
}

// LFSObject returns an LFS object by id
func (k Keeper) LFSObject(goCtx context.Context, req *types.QueryLFSObjectRequest) (*types.QueryLFSObjectResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)

	lfsObj, found := k.GetLFSObjectById(ctx, req.Id)
	if !found {
		return nil, status.Errorf(codes.NotFound, "LFS object not found")
	}
	return &types.QueryLFSObjectResponse{LfsObject: lfsObj}, nil
}

// LFSObjectsByRepositoryId returns all LFS objects for a repository by repository id
func (k Keeper) LFSObjectsByRepositoryId(goCtx context.Context, req *types.QueryLFSObjectsByRepositoryIdRequest) (*types.QueryLFSObjectsByRepositoryIdResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)

	lfsObjects := k.GetLFSObjectsByRepositoryId(ctx, req.RepositoryId)
	return &types.QueryLFSObjectsByRepositoryIdResponse{LfsObjects: lfsObjects}, nil
}
