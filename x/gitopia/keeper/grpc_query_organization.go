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
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) OrganizationAll(c context.Context, req *types.QueryAllOrganizationRequest) (*types.QueryAllOrganizationResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var organizations []*types.Organization
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	organizationStore := prefix.NewStore(store, types.KeyPrefix(types.OrganizationKey))

	pageRes, err := query.Paginate(organizationStore, req.Pagination, func(key []byte, value []byte) error {
		var organization types.Organization
		if err := k.cdc.UnmarshalBinaryBare(value, &organization); err != nil {
			return err
		}

		organizations = append(organizations, &organization)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllOrganizationResponse{Organization: organizations, Pagination: pageRes}, nil
}

func (k Keeper) Organization(c context.Context, req *types.QueryGetOrganizationRequest) (*types.QueryGetOrganizationResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var organization types.Organization
	ctx := sdk.UnwrapSDKContext(c)

	if !k.HasOrganization(ctx, req.Id) {
		return nil, sdkerrors.ErrKeyNotFound
	}

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.OrganizationKey))
	key := []byte(types.OrganizationKey + req.Id)
	k.cdc.MustUnmarshalBinaryBare(store.Get(key), &organization)

	return &types.QueryGetOrganizationResponse{Organization: &organization}, nil
}

func (k Keeper) OrganizationRepositoryAll(c context.Context, req *types.QueryAllOrganizationRepositoryRequest) (*types.QueryAllOrganizationRepositoryResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(c)

	var organization types.Organization
	var repositories []*types.Repository

	if !k.HasOrganization(ctx, req.Id) {
		return nil, sdkerrors.ErrKeyNotFound
	}

	store := ctx.KVStore(k.storeKey)
	organizationStore := prefix.NewStore(store, types.KeyPrefix(types.OrganizationKey))
	organizationKey := []byte(types.OrganizationKey + req.Id)
	k.cdc.MustUnmarshalBinaryBare(organizationStore.Get(organizationKey), &organization)

	repositoryStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))

	pageRes, err := PaginateAllOrganizationRepository(k, ctx, repositoryStore, organization, req.Pagination, func(repository types.Repository) error {
		repositories = append(repositories, &repository)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllOrganizationRepositoryResponse{Repository: repositories, Pagination: pageRes}, nil
}

/* PaginateAllOrganizationRepository does pagination of all the results in the organization.Repositories
 * based on the provided PageRequest.
 */
func PaginateAllOrganizationRepository(
	k Keeper,
	ctx sdk.Context,
	repositoryStore ks.KVStore,
	organization types.Organization,
	pageRequest *query.PageRequest,
	onResult func(repository types.Repository) error,
) (*query.PageResponse, error) {

	totalRepositoryCount := len(organization.Repositories)
	repositories := organization.Repositories

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
			k.cdc.MustUnmarshalBinaryBare(repositoryStore.Get(GetRepositoryIDBytes(repositories[i].Id)), &repository)
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
			k.cdc.MustUnmarshalBinaryBare(repositoryStore.Get(GetRepositoryIDBytes(repositories[i].Id)), &repository)
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
