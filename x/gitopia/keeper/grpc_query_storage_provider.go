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

func (k Keeper) StorageProviderAll(c context.Context, req *types.QueryAllStorageProviderRequest) (*types.QueryAllStorageProviderResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var storageProviders []types.StorageProvider
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	storageProviderStore := prefix.NewStore(store, types.KeyPrefix(types.StorageProviderKey))

	pageRes, err := query.Paginate(storageProviderStore, req.Pagination, func(key []byte, value []byte) error {
		var storageProvider types.StorageProvider
		if err := k.cdc.Unmarshal(value, &storageProvider); err != nil {
			return err
		}

		storageProviders = append(storageProviders, storageProvider)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllStorageProviderResponse{StorageProvider: storageProviders, Pagination: pageRes}, nil
}

func (k Keeper) StorageProvider(c context.Context, req *types.QueryGetStorageProviderRequest) (*types.QueryGetStorageProviderResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(c)
	storageProvider, found := k.GetStorageProvider(ctx, req.Id)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	return &types.QueryGetStorageProviderResponse{StorageProvider: storageProvider}, nil
}

func (k Keeper) CheckStorageProviderAuthorization(c context.Context, req *types.QueryCheckStorageProviderAuthorizationRequest) (*types.QueryCheckStorageProviderAuthorizationResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(c)

	grantee, _ := sdk.AccAddressFromBech32(req.ProviderAddress)
	granter, _ := sdk.AccAddressFromBech32(req.UserAddress)

	authorization, _ := k.authzKeeper.GetCleanAuthorization(ctx, grantee, granter, sdk.MsgTypeURL(&types.MsgUpdateRepositoryBackupRef{}))
	if authorization == nil {
		return &types.QueryCheckStorageProviderAuthorizationResponse{HaveAuthorization: false}, nil
	}

	authorization, _ = k.authzKeeper.GetCleanAuthorization(ctx, grantee, granter, sdk.MsgTypeURL(&types.MsgAddRepositoryBackupRef{}))
	if authorization == nil {
		return &types.QueryCheckStorageProviderAuthorizationResponse{HaveAuthorization: false}, nil
	}

	return &types.QueryCheckStorageProviderAuthorizationResponse{HaveAuthorization: true}, nil
}
