package keeper

import (
	"context"
	"fmt"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	ks "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/gitopia/gitopia/x/gitopia/utils"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) UserAll(c context.Context, req *types.QueryAllUserRequest) (*types.QueryAllUserResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var users []*types.User
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	userStore := prefix.NewStore(store, types.KeyPrefix(types.UserKey))

	pageRes, err := query.Paginate(userStore, req.Pagination, func(key []byte, value []byte) error {
		var user types.User
		if err := k.cdc.Unmarshal(value, &user); err != nil {
			return err
		}

		users = append(users, &user)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllUserResponse{User: users, Pagination: pageRes}, nil
}

func (k Keeper) User(c context.Context, req *types.QueryGetUserRequest) (*types.QueryGetUserResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(c)

	user, found := k.GetUser(ctx, req.Id)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	return &types.QueryGetUserResponse{User: &user}, nil
}

func (k Keeper) AnyRepositoryAll(c context.Context, req *types.QueryAllAnyRepositoryRequest) (*types.QueryAllAnyRepositoryResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(c)

	address, err := k.ResolveAddress(ctx, req.Id)
	if err != nil {
		return nil, status.Error(codes.NotFound, err.Error())
	}

	var repositories []*types.Repository
	var pageRes *query.PageResponse

	switch address.ownerType {
	case types.Whois_USER:
		user, _ := k.GetUser(ctx, address.address)
		repositoryStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))

		var err error
		pageRes, err = PaginateAllUserRepository(k, ctx, repositoryStore, user, req.Pagination, func(repository types.Repository) error {
			repositories = append(repositories, &repository)
			return nil
		})
		if err != nil {
			return nil, status.Error(codes.Internal, err.Error())
		}
	case types.Whois_ORGANIZATION:
		organization, _ := k.GetOrganization(ctx, address.address)
		repositoryStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))

		var err error
		pageRes, err = PaginateAllOrganizationRepository(k, ctx, repositoryStore, organization, req.Pagination, func(repository types.Repository) error {
			repositories = append(repositories, &repository)
			return nil
		})
		if err != nil {
			return nil, status.Error(codes.Internal, err.Error())
		}
	default:
		return nil, sdkerrors.ErrLogic
	}

	return &types.QueryAllAnyRepositoryResponse{Repository: repositories, Pagination: pageRes}, nil
}

func (k Keeper) AnyRepository(c context.Context, req *types.QueryGetAnyRepositoryRequest) (*types.QueryGetAnyRepositoryResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(c)

	address, err := k.ResolveAddress(ctx, req.Id)
	if err != nil {
		return nil, status.Error(codes.NotFound, err.Error())
	}

	var repository types.Repository

	switch address.ownerType {
	case types.Whois_USER:
		user, _ := k.GetUser(ctx, address.address)
		if i, exists := utils.UserRepositoryExists(user.Repositories, req.RepositoryName); exists {
			repositoryStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))
			k.cdc.MustUnmarshal(repositoryStore.Get(GetRepositoryIDBytes(user.Repositories[i].Id)), &repository)
		}
	case types.Whois_ORGANIZATION:
		organization, _ := k.GetOrganization(ctx, address.address)
		if i, exists := utils.OrganizationRepositoryExists(organization.Repositories, req.RepositoryName); exists {
			repositoryStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))
			k.cdc.MustUnmarshal(repositoryStore.Get(GetRepositoryIDBytes(organization.Repositories[i].Id)), &repository)
		}
	default:
		return nil, sdkerrors.ErrLogic
	}

	if repository.Creator == "" {
		return nil, sdkerrors.ErrKeyNotFound
	}

	return &types.QueryGetAnyRepositoryResponse{Repository: &repository}, nil
}

func (k Keeper) UserOrganizationAll(c context.Context, req *types.QueryAllUserOrganizationRequest) (*types.QueryAllUserOrganizationResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(c)

	address, err := k.ResolveAddress(ctx, req.Id)
	if err != nil {
		return nil, status.Error(codes.NotFound, err.Error())
	}

	user, found := k.GetUser(ctx, address.address)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	var organizations []*types.Organization
	organizationStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.OrganizationKey))

	for _, userOrganization := range user.Organizations {
		var organization types.Organization
		key := []byte(types.OrganizationKey + userOrganization.Id)
		k.cdc.MustUnmarshal(organizationStore.Get(key), &organization)
		organizations = append(organizations, &organization)
	}

	return &types.QueryAllUserOrganizationResponse{Organization: organizations}, nil
}

func PaginateAllUserRepository(
	k Keeper,
	ctx sdk.Context,
	repositoryStore ks.KVStore,
	user types.User,
	pageRequest *query.PageRequest,
	onResult func(repository types.Repository) error,
) (*query.PageResponse, error) {

	totalRepositoryCount := len(user.Repositories)
	repositories := user.Repositories

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

		for i := GetIssueIDFromBytes(key); uint64(i) <= uint64(totalRepositoryCount); i++ {
			if count == limit {
				nextKey = GetIssueIDBytes(uint64(i))
				break
			}

			var repository types.Repository
			k.cdc.MustUnmarshal(repositoryStore.Get(GetRepositoryIDBytes(repositories[i].Id)), &repository)
			err := onResult(repository)
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

	for i := offset; uint64(i) < uint64(totalRepositoryCount); i++ {
		if uint64(i) < end {
			var repository types.Repository
			k.cdc.MustUnmarshal(repositoryStore.Get(GetRepositoryIDBytes(repositories[i].Id)), &repository)
			err := onResult(repository)
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
		res.Total = uint64(totalRepositoryCount)
	}

	return res, nil
}
