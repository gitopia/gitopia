package keeper

import (
	"context"
	"fmt"
	"sort"
	"time"

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

func (k Keeper) AddressRepositoryAll(c context.Context, req *types.QueryAllAddressRepositoryRequest) (*types.QueryAllAddressRepositoryResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var repositories []*types.Repository
	var pageRes *query.PageResponse
	ctx := sdk.UnwrapSDKContext(c)

	user, userFound := k.GetUser(ctx, req.Id)
	organization, organizationFound := k.GetOrganization(ctx, req.Id)
	if userFound {
		repositoryStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))

		var err error
		pageRes, err = PaginateAllUserRepository(k, ctx, repositoryStore, user, req.Pagination, func(repository types.Repository) error {
			repositories = append(repositories, &repository)
			return nil
		})
		if err != nil {
			return nil, status.Error(codes.Internal, err.Error())
		}
	} else if organizationFound {
		repositoryStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))

		var err error
		pageRes, err = PaginateAllOrganizationRepository(k, ctx, repositoryStore, organization, req.Pagination, func(repository types.Repository) error {
			repositories = append(repositories, &repository)
			return nil
		})
		if err != nil {
			return nil, status.Error(codes.Internal, err.Error())
		}
	} else {
		return nil, sdkerrors.ErrKeyNotFound

	}

	return &types.QueryAllAddressRepositoryResponse{Repository: repositories, Pagination: pageRes}, nil
}

func (k Keeper) AddressRepository(c context.Context, req *types.QueryGetAddressRepositoryRequest) (*types.QueryGetAddressRepositoryResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var repository types.Repository
	ctx := sdk.UnwrapSDKContext(c)

	user, userFound := k.GetUser(ctx, req.Id)
	organization, organizationFound := k.GetOrganization(ctx, req.Id)
	if userFound {
		if i, exists := utils.UserRepositoryExists(user.Repositories, req.RepositoryName); exists {
			repositoryStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))
			k.cdc.MustUnmarshal(repositoryStore.Get(GetRepositoryIDBytes(user.Repositories[i].Id)), &repository)
		}
	} else if organizationFound {
		if i, exists := utils.OrganizationRepositoryExists(organization.Repositories, req.RepositoryName); exists {
			repositoryStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))
			k.cdc.MustUnmarshal(repositoryStore.Get(GetRepositoryIDBytes(organization.Repositories[i].Id)), &repository)
		}
	} else {
		return nil, sdkerrors.ErrKeyNotFound
	}

	if repository.Creator == "" {
		return nil, sdkerrors.ErrKeyNotFound
	}

	return &types.QueryGetAddressRepositoryResponse{Repository: &repository}, nil
}

func (k Keeper) UserOrganizationAll(c context.Context, req *types.QueryAllUserOrganizationRequest) (*types.QueryAllUserOrganizationResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var organizations []*types.Organization
	ctx := sdk.UnwrapSDKContext(c)

	user, found := k.GetUser(ctx, req.Id)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	organizationStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.OrganizationKey))

	for _, userOrganization := range user.Organizations {
		var organization types.Organization
		key := []byte(types.OrganizationKey + userOrganization.Id)
		k.cdc.MustUnmarshal(organizationStore.Get(key), &organization)
		organizations = append(organizations, &organization)
	}

	return &types.QueryAllUserOrganizationResponse{Organization: organizations}, nil
}

func (k Keeper) AddressRequestReceivedAll(c context.Context, req *types.QueryAllAddressRequestReceivedRequest) (*types.QueryAllAddressRequestReceivedResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var requests []*types.Request
	var requestReceivedIds []uint64
	var pageRes *query.PageResponse
	ctx := sdk.UnwrapSDKContext(c)

	user, userFound := k.GetUser(ctx, req.Address)
	organization, organizationFound := k.GetOrganization(ctx, req.Address)
	if userFound {
		requestReceivedIds = user.Requests.Received
	} else if organizationFound {
		requestReceivedIds = organization.Requests.Received
	} else {
		return nil, sdkerrors.ErrKeyNotFound
	}

	requestStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RequestKey))

	var err error
	pageRes, err = PaginateAllAddressRequestReceived(k, ctx, requestStore, requestReceivedIds, req.Pagination, req.Option, func(request types.Request) error {
		requests = append(requests, &request)
		return nil
	})
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllAddressRequestReceivedResponse{Request: requests, Pagination: pageRes}, nil
}

func PaginateAllAddressRequestReceived(
	k Keeper,
	ctx sdk.Context,
	requestStore ks.KVStore,
	requestReceivedIds []uint64,
	pageRequest *query.PageRequest,
	option *types.RequestOptions,
	onResult func(request types.Request) error,
) (*query.PageResponse, error) {

	totalRequestCount := uint64(len(requestReceivedIds))
	requestIds := requestReceivedIds
	var requests []*types.Request

	if option == nil {
		option = &types.RequestOptions{}
	}

	if option.Sort != "ASC" {
		sort.Sort(sort.Reverse(utils.UInt64Slice(requestIds)))
	}

	if option.Sort == "ASC" && option.IncludeExpired == false {
		return nil, fmt.Errorf("invalid request, IncludeExpired expected to be true in case of ascending sort")
	}

	currentTime := time.Now().Unix()

	if option.IncludeExpired {
		for i := 0; uint64(i) < uint64(totalRequestCount); i++ {
			var request types.Request
			k.cdc.MustUnmarshal(requestStore.Get(GetRepositoryIDBytes(requestIds[uint64(i)])), &request)
			if request.Expiry-currentTime > 0 {
				requests = append(requests, &request)
			} else {
				break
			}
		}
		totalRequestCount = uint64(len(requests))
	} else {
		for i := 0; uint64(i) < uint64(totalRequestCount); i++ {
			var request types.Request
			k.cdc.MustUnmarshal(requestStore.Get(GetRepositoryIDBytes(requestIds[uint64(i)])), &request)
			requests = append(requests, &request)
		}
		totalRequestCount = uint64(len(requests))
	}

	if option.State != "" {
		var requestBuffer []*types.Request
		for i := 0; uint64(i) < uint64(totalRequestCount); i++ {
			var request types.Request
			k.cdc.MustUnmarshal(requestStore.Get(GetRepositoryIDBytes(requestIds[uint64(i)])), &request)
			if request.State.String() == option.State {
				requestBuffer = append(requestBuffer, &request)
			}
		}
		requests = requestBuffer
		totalRequestCount = uint64(len(requestBuffer))
	}

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

		for i := GetRequestIDFromBytes(key); uint64(i) < totalRequestCount; i++ {
			if count == limit {
				nextKey = GetRequestIDBytes(uint64(i))
				break
			}
			err := onResult(*requests[i])
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

	for i := offset; uint64(i) < totalRequestCount; i++ {
		if uint64(i) < end {
			err := onResult(*requests[i])
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
		res.Total = totalRequestCount
	}

	return res, nil
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
