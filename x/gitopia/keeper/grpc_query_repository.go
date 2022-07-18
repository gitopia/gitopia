package keeper

import (
	"context"
	"fmt"
	"sort"
	"strings"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	ks "github.com/cosmos/cosmos-sdk/store/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	query "github.com/cosmos/cosmos-sdk/types/query"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/gitopia/gitopia/x/gitopia/utils"
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

	repository, found := k.GetRepository(ctx, req.Id)
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

	var repository types.Repository

	switch address.ownerType {
	case types.Whois_USER:
		user, _ := k.GetUser(ctx, address.address)
		if i, exists := utils.UserRepositoryExists(user.Repositories, req.RepositoryName); exists {
			repositoryStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))
			k.cdc.MustUnmarshal(repositoryStore.Get(GetRepositoryIDBytes(user.Repositories[i].Id)), &repository)
		} else {
			return nil, sdkerrors.ErrKeyNotFound
		}
	case types.Whois_ORGANIZATION:
		organization, _ := k.GetOrganization(ctx, address.address)
		if i, exists := utils.OrganizationRepositoryExists(organization.Repositories, req.RepositoryName); exists {
			repositoryStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))
			k.cdc.MustUnmarshal(repositoryStore.Get(GetRepositoryIDBytes(organization.Repositories[i].Id)), &repository)
		} else {
			return nil, sdkerrors.ErrKeyNotFound
		}
	default:
		return nil, sdkerrors.ErrLogic
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

	var repository types.Repository

	switch address.ownerType {
	case types.Whois_USER:
		user, _ := k.GetUser(ctx, address.address)
		if i, exists := utils.UserRepositoryExists(user.Repositories, req.RepositoryName); exists {
			repositoryStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))
			k.cdc.MustUnmarshal(repositoryStore.Get(GetRepositoryIDBytes(user.Repositories[i].Id)), &repository)
		} else {
			return nil, sdkerrors.ErrKeyNotFound
		}
	case types.Whois_ORGANIZATION:
		organization, _ := k.GetOrganization(ctx, address.address)
		if i, exists := utils.OrganizationRepositoryExists(organization.Repositories, req.RepositoryName); exists {
			repositoryStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))
			k.cdc.MustUnmarshal(repositoryStore.Get(GetRepositoryIDBytes(organization.Repositories[i].Id)), &repository)
		} else {
			return nil, sdkerrors.ErrKeyNotFound
		}
	default:
		return nil, sdkerrors.ErrLogic
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
	var pageRes *query.PageResponse

	switch address.ownerType {
	case types.Whois_USER:
		user, _ := k.GetUser(ctx, address.address)
		if i, exists := utils.UserRepositoryExists(user.Repositories, req.RepositoryName); exists {
			repositoryStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))
			k.cdc.MustUnmarshal(repositoryStore.Get(GetRepositoryIDBytes(user.Repositories[i].Id)), &repository)
		} else {
			return nil, sdkerrors.ErrKeyNotFound
		}
	case types.Whois_ORGANIZATION:
		organization, _ := k.GetOrganization(ctx, address.address)
		if i, exists := utils.OrganizationRepositoryExists(organization.Repositories, req.RepositoryName); exists {
			repositoryStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))
			k.cdc.MustUnmarshal(repositoryStore.Get(GetRepositoryIDBytes(organization.Repositories[i].Id)), &repository)
		} else {
			return nil, sdkerrors.ErrKeyNotFound
		}
	default:
		return nil, sdkerrors.ErrLogic
	}

	if repository.Creator != "" {
		releaseStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ReleaseKey))

		var err error
		pageRes, err = PaginateAllRepositoryRelease(k, ctx, releaseStore, repository, req.Pagination, func(release types.Release) error {
			releases = append(releases, &release)
			return nil
		})
		if err != nil {
			return nil, status.Error(codes.Internal, err.Error())
		}
	}

	return &types.QueryAllRepositoryReleaseResponse{Release: releases, Pagination: pageRes}, nil
}

func (k Keeper) RepositoryIssueAll(c context.Context, req *types.QueryAllRepositoryIssueRequest) (*types.QueryAllRepositoryIssueResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var repository types.Repository
	var issues []*types.Issue
	var pageRes *query.PageResponse
	ctx := sdk.UnwrapSDKContext(c)

	user, userFound := k.GetUser(ctx, req.Id)
	organization, organizationFound := k.GetOrganization(ctx, req.Id)
	if userFound {
		if i, exists := utils.UserRepositoryExists(user.Repositories, req.RepositoryName); exists {
			repositoryStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))
			k.cdc.MustUnmarshal(repositoryStore.Get(GetRepositoryIDBytes(user.Repositories[i].Id)), &repository)
		} else {
			return nil, sdkerrors.ErrKeyNotFound
		}
	} else if organizationFound {
		if i, exists := utils.OrganizationRepositoryExists(organization.Repositories, req.RepositoryName); exists {
			repositoryStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))
			k.cdc.MustUnmarshal(repositoryStore.Get(GetRepositoryIDBytes(organization.Repositories[i].Id)), &repository)
		} else {
			return nil, sdkerrors.ErrKeyNotFound
		}
	} else {
		return nil, sdkerrors.ErrKeyNotFound
	}

	if repository.Creator != "" {
		issueStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.IssueKey))

		var err error
		pageRes, err = PaginateAllRepositoryIssue(k, ctx, issueStore, repository, req.Pagination, req.Option, func(issue types.Issue) error {
			issues = append(issues, &issue)
			return nil
		})
		if err != nil {
			return nil, status.Error(codes.Internal, err.Error())
		}
	}

	return &types.QueryAllRepositoryIssueResponse{Issue: issues, Pagination: pageRes}, nil
}

func (k Keeper) RepositoryIssue(c context.Context, req *types.QueryGetRepositoryIssueRequest) (*types.QueryGetRepositoryIssueResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var repository types.Repository
	var issue types.Issue
	ctx := sdk.UnwrapSDKContext(c)

	user, userFound := k.GetUser(ctx, req.Id)
	organization, organizationFound := k.GetOrganization(ctx, req.Id)
	if userFound {
		if i, exists := utils.UserRepositoryExists(user.Repositories, req.RepositoryName); exists {
			repositoryStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))
			k.cdc.MustUnmarshal(repositoryStore.Get(GetRepositoryIDBytes(user.Repositories[i].Id)), &repository)
		} else {
			return nil, sdkerrors.ErrKeyNotFound
		}
	} else if organizationFound {
		if i, exists := utils.OrganizationRepositoryExists(organization.Repositories, req.RepositoryName); exists {
			repositoryStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))
			k.cdc.MustUnmarshal(repositoryStore.Get(GetRepositoryIDBytes(organization.Repositories[i].Id)), &repository)
		} else {
			return nil, sdkerrors.ErrKeyNotFound
		}
	} else {
		return nil, sdkerrors.ErrKeyNotFound
	}

	if repository.Creator != "" {
		if i, exists := utils.RepositoryIssueExists(repository.Issues, req.IssueIid); exists {
			issueStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.IssueKey))
			k.cdc.MustUnmarshal(issueStore.Get(GetIssueIDBytes(repository.Issues[i].Id)), &issue)

			return &types.QueryGetRepositoryIssueResponse{Issue: &issue}, nil
		}
	}

	return nil, sdkerrors.ErrKeyNotFound
}

func (k Keeper) RepositoryPullRequestAll(c context.Context, req *types.QueryAllRepositoryPullRequestRequest) (*types.QueryAllRepositoryPullRequestResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var repository types.Repository
	var pullRequests []*types.PullRequest
	var pageRes *query.PageResponse
	ctx := sdk.UnwrapSDKContext(c)

	user, userFound := k.GetUser(ctx, req.Id)
	organization, organizationFound := k.GetOrganization(ctx, req.Id)

	if userFound {
		if i, exists := utils.UserRepositoryExists(user.Repositories, req.RepositoryName); exists {
			repositoryStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))
			k.cdc.MustUnmarshal(repositoryStore.Get(GetRepositoryIDBytes(user.Repositories[i].Id)), &repository)
		} else {
			return nil, sdkerrors.ErrKeyNotFound
		}
	} else if organizationFound {
		if i, exists := utils.OrganizationRepositoryExists(organization.Repositories, req.RepositoryName); exists {
			repositoryStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))
			k.cdc.MustUnmarshal(repositoryStore.Get(GetRepositoryIDBytes(organization.Repositories[i].Id)), &repository)
		} else {
			return nil, sdkerrors.ErrKeyNotFound
		}
	} else {
		return nil, sdkerrors.ErrKeyNotFound
	}

	if repository.Creator != "" {
		pullRequestStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PullRequestKey))

		var err error
		pageRes, err = PaginateAllRepositoryPullRequest(k, ctx, pullRequestStore, repository, req.Pagination, req.Option, func(pullRequest types.PullRequest) error {
			pullRequests = append(pullRequests, &pullRequest)
			return nil
		})

		if err != nil {
			return nil, status.Error(codes.Internal, err.Error())
		}
	}

	return &types.QueryAllRepositoryPullRequestResponse{PullRequest: pullRequests, Pagination: pageRes}, nil
}

func (k Keeper) RepositoryPullRequest(c context.Context, req *types.QueryGetRepositoryPullRequestRequest) (*types.QueryGetRepositoryPullRequestResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var repository types.Repository
	var pullRequest types.PullRequest
	ctx := sdk.UnwrapSDKContext(c)

	user, userFound := k.GetUser(ctx, req.Id)
	organization, organizationFound := k.GetOrganization(ctx, req.Id)
	if userFound {
		if i, exists := utils.UserRepositoryExists(user.Repositories, req.RepositoryName); exists {
			repositoryStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))
			k.cdc.MustUnmarshal(repositoryStore.Get(GetRepositoryIDBytes(user.Repositories[i].Id)), &repository)
		} else {
			return nil, sdkerrors.ErrKeyNotFound
		}
	} else if organizationFound {
		if i, exists := utils.OrganizationRepositoryExists(organization.Repositories, req.RepositoryName); exists {
			repositoryStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))
			k.cdc.MustUnmarshal(repositoryStore.Get(GetRepositoryIDBytes(organization.Repositories[i].Id)), &repository)
		} else {
			return nil, sdkerrors.ErrKeyNotFound
		}
	} else {
		return nil, sdkerrors.ErrKeyNotFound
	}

	if repository.Creator != "" {
		if i, exists := utils.RepositoryPullRequestExists(repository.PullRequests, req.PullIid); exists {
			pullRequestStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PullRequestKey))
			k.cdc.MustUnmarshal(pullRequestStore.Get(GetPullRequestIDBytes(repository.PullRequests[i].Id)), &pullRequest)

			return &types.QueryGetRepositoryPullRequestResponse{PullRequest: &pullRequest}, nil
		}
	}

	return nil, sdkerrors.ErrKeyNotFound
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

	var pageRes *query.PageResponse
	var repositoryId uint64

	switch address.ownerType {
	case types.Whois_USER:
		user, _ := k.GetUser(ctx, address.address)
		if i, exists := utils.UserRepositoryExists(user.Repositories, req.RepositoryName); exists {
			repositoryId = user.Repositories[i].Id
		} else {
			return nil, sdkerrors.ErrKeyNotFound
		}
	case types.Whois_ORGANIZATION:
		organization, _ := k.GetOrganization(ctx, address.address)
		if i, exists := utils.OrganizationRepositoryExists(organization.Repositories, req.RepositoryName); exists {
			repositoryId = organization.Repositories[i].Id
		} else {
			return nil, sdkerrors.ErrKeyNotFound
		}
	default:
		return nil, sdkerrors.ErrLogic
	}

	repository, found := k.GetRepository(ctx, repositoryId)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	var forks []*types.RepositoryFork

	repositoryStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))

	pageRes, err = PaginateAllForkRepository(k, ctx, repositoryStore, repository, req.Pagination, func(repositoryFork types.RepositoryFork) error {
		forks = append(forks, &repositoryFork)
		return nil
	})
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryGetAllForkResponse{Forks: forks, Pagination: pageRes}, nil
}

func (k Keeper) BranchAll(c context.Context, req *types.QueryGetAllBranchRequest) (*types.QueryGetAllBranchResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var branches []*types.RepositoryBranch
	ctx := sdk.UnwrapSDKContext(c)

	repository, found := k.GetRepository(ctx, req.RepositoryId)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	for _, repositoryBranch := range repository.Branches {
		branches = append(branches, repositoryBranch)
	}
	return &types.QueryGetAllBranchResponse{Branches: branches}, nil
}

func (k Keeper) BranchSha(c context.Context, req *types.QueryGetBranchShaRequest) (*types.QueryGetBranchShaResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(c)

	repository, found := k.GetRepository(ctx, req.RepositoryId)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	if i, exists := utils.RepositoryBranchExists(repository.Branches, req.BranchName); exists {
		return &types.QueryGetBranchShaResponse{Sha: repository.Branches[i].Sha}, nil
	}

	return nil, sdkerrors.ErrKeyNotFound
}

func (k Keeper) TagAll(c context.Context, req *types.QueryGetAllTagRequest) (*types.QueryGetAllTagResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var tags []*types.RepositoryTag
	ctx := sdk.UnwrapSDKContext(c)

	repository, found := k.GetRepository(ctx, req.RepositoryId)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	for _, repositoryTag := range repository.Tags {
		tags = append(tags, repositoryTag)
	}
	return &types.QueryGetAllTagResponse{Tags: tags}, nil
}

func (k Keeper) TagSha(c context.Context, req *types.QueryGetTagShaRequest) (*types.QueryGetTagShaResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	repository, found := k.GetRepository(ctx, req.RepositoryId)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	if i, exists := utils.RepositoryTagExists(repository.Tags, req.TagName); exists {
		return &types.QueryGetTagShaResponse{Sha: repository.Tags[i].Sha}, nil
	}

	return nil, sdkerrors.ErrKeyNotFound
}

func PaginateAllForkRepository(
	k Keeper,
	ctx sdk.Context,
	repositoryStore ks.KVStore,
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

			var repository types.Repository
			k.cdc.MustUnmarshal(repositoryStore.Get(GetRepositoryIDBytes(repositoryForks[i])), &repository)
			repositoryFork := types.RepositoryFork{
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
			var repository types.Repository
			k.cdc.MustUnmarshal(repositoryStore.Get(GetRepositoryIDBytes(repositoryForks[i])), &repository)
			repositoryFork := types.RepositoryFork{
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

/* PaginateAllRepositoryIssue does pagination of all the results in the repository.IssueIids
 * based on the provided PageRequest.
 */
func PaginateAllRepositoryIssue(
	k Keeper,
	ctx sdk.Context,
	issueStore ks.KVStore,
	repository types.Repository,
	pageRequest *query.PageRequest,
	option *types.IssueOptions,
	onResult func(issue types.Issue) error,
) (*query.PageResponse, error) {
	totalIssueCount := uint64(len(repository.Issues))
	issues := repository.Issues

	if option == nil {
		option = &types.IssueOptions{}
	}

	if option.Sort != "ASC" {
		sort.Sort(sort.Reverse(types.RepositoryIssueSlice(issues)))
	}

	if option.CreatedBy != "" {
		var issueBuffer []*types.RepositoryIssue
		for i := 0; uint64(i) < totalIssueCount; i++ {
			var issue types.Issue
			k.cdc.MustUnmarshal(issueStore.Get(GetRepositoryIDBytes(issues[uint64(i)].Id)), &issue)
			if issue.Creator == option.CreatedBy {
				repositoryIssue := types.RepositoryIssue{
					Id:  issue.Id,
					Iid: issue.Iid,
				}
				issueBuffer = append(issueBuffer, &repositoryIssue)
			}
		}
		issues = issueBuffer
		totalIssueCount = uint64(len(issueBuffer))
	}

	if option.Assignee != "" {
		var issueBuffer []*types.RepositoryIssue
		for i := 0; uint64(i) < totalIssueCount; i++ {
			var issue types.Issue
			k.cdc.MustUnmarshal(issueStore.Get(GetRepositoryIDBytes(issues[uint64(i)].Id)), &issue)
			if _, exists := utils.AssigneeExists(issue.Assignees, option.Assignee); exists {
				repositoryIssue := types.RepositoryIssue{
					Id:  issue.Id,
					Iid: issue.Iid,
				}
				issueBuffer = append(issueBuffer, &repositoryIssue)
			}
		}
		issues = issueBuffer
		totalIssueCount = uint64(len(issueBuffer))
	}

	if option.State == types.Issue_CLOSED.String() {
		var issueBuffer []*types.RepositoryIssue
		for i := 0; uint64(i) < totalIssueCount; i++ {
			var issue types.Issue
			k.cdc.MustUnmarshal(issueStore.Get(GetRepositoryIDBytes(issues[uint64(i)].Id)), &issue)
			if issue.State == types.Issue_CLOSED {
				repositoryIssue := types.RepositoryIssue{
					Id:  issue.Id,
					Iid: issue.Iid,
				}
				issueBuffer = append(issueBuffer, &repositoryIssue)
			}
		}
		issues = issueBuffer
		totalIssueCount = uint64(len(issueBuffer))
	} else if option.State == types.Issue_OPEN.String() {
		var issueBuffer []*types.RepositoryIssue
		for i := 0; uint64(i) < totalIssueCount; i++ {
			var issue types.Issue
			k.cdc.MustUnmarshal(issueStore.Get(GetRepositoryIDBytes(issues[uint64(i)].Id)), &issue)
			if issue.State == types.Issue_OPEN {
				repositoryIssue := types.RepositoryIssue{
					Id:  issue.Id,
					Iid: issue.Iid,
				}
				issueBuffer = append(issueBuffer, &repositoryIssue)
			}
		}
		issues = issueBuffer
		totalIssueCount = uint64(len(issueBuffer))
	}

	if option.Labels == "ANY" {
		var issueBuffer []*types.RepositoryIssue
		for i := 0; uint64(i) < totalIssueCount; i++ {
			var issue types.Issue
			k.cdc.MustUnmarshal(issueStore.Get(GetRepositoryIDBytes(issues[uint64(i)].Id)), &issue)
			if len(issue.Labels) > 0 {
				repositoryIssue := types.RepositoryIssue{
					Id:  issue.Id,
					Iid: issue.Iid,
				}
				issueBuffer = append(issueBuffer, &repositoryIssue)
			}
		}
		issues = issueBuffer
		totalIssueCount = uint64(len(issueBuffer))
	} else if option.Labels == "NONE" {
		var issueBuffer []*types.RepositoryIssue
		for i := 0; uint64(i) < totalIssueCount; i++ {
			var issue types.Issue
			k.cdc.MustUnmarshal(issueStore.Get(GetRepositoryIDBytes(issues[uint64(i)].Id)), &issue)
			if len(issue.Labels) == 0 {
				repositoryIssue := types.RepositoryIssue{
					Id:  issue.Id,
					Iid: issue.Iid,
				}
				issueBuffer = append(issueBuffer, &repositoryIssue)
			}
		}
		issues = issueBuffer
		totalIssueCount = uint64(len(issueBuffer))
	}

	if len(option.LabelIds) > 0 {
		var issueBuffer []*types.RepositoryIssue
		for i := 0; uint64(i) < totalIssueCount; i++ {
			var issue types.Issue
			k.cdc.MustUnmarshal(issueStore.Get(GetRepositoryIDBytes(issues[uint64(i)].Id)), &issue)
			contains := false
			for _, l := range option.LabelIds {
				if _, exists := utils.LabelIdExists(issue.Labels, l); exists {
					contains = true
				} else {
					contains = false
					break
				}
			}
			if contains {
				repositoryIssue := types.RepositoryIssue{
					Id:  issue.Id,
					Iid: issue.Iid,
				}
				issueBuffer = append(issueBuffer, &repositoryIssue)
			}
		}
		issues = issueBuffer
		totalIssueCount = uint64(len(issueBuffer))
	}

	if option.UpdatedAfter != 0 {
		var issueBuffer []*types.RepositoryIssue
		for i := 0; uint64(i) < totalIssueCount; i++ {
			var issue types.Issue
			k.cdc.MustUnmarshal(issueStore.Get(GetRepositoryIDBytes(issues[uint64(i)].Id)), &issue)
			if issue.UpdatedAt > option.UpdatedAfter {
				repositoryIssue := types.RepositoryIssue{
					Id:  issue.Id,
					Iid: issue.Iid,
				}
				issueBuffer = append(issueBuffer, &repositoryIssue)
			}
		}
		issues = issueBuffer
		totalIssueCount = uint64(len(issueBuffer))
	}

	if option.UpdatedBefore != 0 {
		var issueBuffer []*types.RepositoryIssue
		for i := 0; uint64(i) < totalIssueCount; i++ {
			var issue types.Issue
			k.cdc.MustUnmarshal(issueStore.Get(GetRepositoryIDBytes(issues[uint64(i)].Id)), &issue)
			if issue.UpdatedAt < option.UpdatedBefore {
				repositoryIssue := types.RepositoryIssue{
					Id:  issue.Id,
					Iid: issue.Iid,
				}
				issueBuffer = append(issueBuffer, &repositoryIssue)
			}
		}
		issues = issueBuffer
		totalIssueCount = uint64(len(issueBuffer))
	}

	if option.Search != "" {
		var issueBuffer []*types.RepositoryIssue
		for i := 0; uint64(i) < totalIssueCount; i++ {
			var issue types.Issue
			k.cdc.MustUnmarshal(issueStore.Get(GetRepositoryIDBytes(issues[uint64(i)].Id)), &issue)
			if strings.Contains(issue.Title, option.Search) {
				repositoryIssue := types.RepositoryIssue{
					Id:  issue.Id,
					Iid: issue.Iid,
				}
				issueBuffer = append(issueBuffer, &repositoryIssue)
			}
		}
		issues = issueBuffer
		totalIssueCount = uint64(len(issueBuffer))
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

		for i := GetIssueIDFromBytes(key); uint64(i) < totalIssueCount; i++ {
			if count == limit {
				nextKey = GetIssueIDBytes(uint64(i))
				break
			}

			var issue types.Issue
			k.cdc.MustUnmarshal(issueStore.Get(GetRepositoryIDBytes(issues[uint64(i)].Id)), &issue)
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

	for i := offset; uint64(i) < totalIssueCount; i++ {
		if uint64(i) < end {
			var issue types.Issue
			k.cdc.MustUnmarshal(issueStore.Get(GetRepositoryIDBytes(issues[uint64(i)].Id)), &issue)
			err := onResult(issue)
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
		res.Total = totalIssueCount
	}

	return res, nil
}

/* PaginateAllRepositoryPullRequest does pagination of all the results in the repository.IssueIids
 * based on the provided PageRequest.
 */
func PaginateAllRepositoryPullRequest(
	k Keeper,
	ctx sdk.Context,
	pullRequestStore ks.KVStore,
	repository types.Repository,
	pageRequest *query.PageRequest,
	option *types.PullRequestOptions,
	onResult func(pullRequest types.PullRequest) error,
) (*query.PageResponse, error) {
	totalPullRequestCount := uint64(len(repository.PullRequests))
	pullRequests := repository.PullRequests

	if option == nil {
		option = &types.PullRequestOptions{}
	}

	if option.Sort != "ASC" {
		sort.Sort(sort.Reverse(types.RepositoryPullRequestSlice(pullRequests)))
	}

	if option.CreatedBy != "" {
		var pullRequestBuffer []*types.RepositoryPullRequest
		for i := 0; uint64(i) < totalPullRequestCount; i++ {
			var pullRequest types.PullRequest
			k.cdc.MustUnmarshal(pullRequestStore.Get(GetRepositoryIDBytes(pullRequests[uint64(i)].Id)), &pullRequest)
			if pullRequest.Creator == option.CreatedBy {
				repositoryPullRequest := types.RepositoryPullRequest{
					Id:  pullRequest.Id,
					Iid: pullRequest.Iid,
				}
				pullRequestBuffer = append(pullRequestBuffer, &repositoryPullRequest)
			}
		}
		pullRequests = pullRequestBuffer
		totalPullRequestCount = uint64(len(pullRequestBuffer))
	}

	if option.Assignee != "" {
		var pullRequestBuffer []*types.RepositoryPullRequest
		for i := 0; uint64(i) < totalPullRequestCount; i++ {
			var pullRequest types.PullRequest
			k.cdc.MustUnmarshal(pullRequestStore.Get(GetRepositoryIDBytes(pullRequests[uint64(i)].Id)), &pullRequest)
			if _, exists := utils.AssigneeExists(pullRequest.Assignees, option.Assignee); exists {
				repositoryPullRequest := types.RepositoryPullRequest{
					Id:  pullRequest.Id,
					Iid: pullRequest.Iid,
				}
				pullRequestBuffer = append(pullRequestBuffer, &repositoryPullRequest)
			}
		}
		pullRequests = pullRequestBuffer
		totalPullRequestCount = uint64(len(pullRequestBuffer))
	}

	if option.Reviewer != "" {
		var pullRequestBuffer []*types.RepositoryPullRequest
		for i := 0; uint64(i) < totalPullRequestCount; i++ {
			var pullRequest types.PullRequest
			k.cdc.MustUnmarshal(pullRequestStore.Get(GetRepositoryIDBytes(pullRequests[uint64(i)].Id)), &pullRequest)
			if _, exists := utils.ReviewerExists(pullRequest.Reviewers, option.Reviewer); exists {
				repositoryPullRequest := types.RepositoryPullRequest{
					Id:  pullRequest.Id,
					Iid: pullRequest.Iid,
				}
				pullRequestBuffer = append(pullRequestBuffer, &repositoryPullRequest)
			}
		}
		pullRequests = pullRequestBuffer
		totalPullRequestCount = uint64(len(pullRequestBuffer))
	}

	if option.State == types.PullRequest_OPEN.String() {
		var pullRequestBuffer []*types.RepositoryPullRequest
		for i := 0; uint64(i) < totalPullRequestCount; i++ {
			var pullRequest types.PullRequest
			k.cdc.MustUnmarshal(pullRequestStore.Get(GetRepositoryIDBytes(pullRequests[uint64(i)].Id)), &pullRequest)
			if pullRequest.State == types.PullRequest_OPEN {
				repositoryPullRequest := types.RepositoryPullRequest{
					Id:  pullRequest.Id,
					Iid: pullRequest.Iid,
				}
				pullRequestBuffer = append(pullRequestBuffer, &repositoryPullRequest)
			}
		}
		pullRequests = pullRequestBuffer
		totalPullRequestCount = uint64(len(pullRequestBuffer))
	} else if option.State == types.PullRequest_CLOSED.String() {
		var pullRequestBuffer []*types.RepositoryPullRequest
		for i := 0; uint64(i) < totalPullRequestCount; i++ {
			var pullRequest types.PullRequest
			k.cdc.MustUnmarshal(pullRequestStore.Get(GetRepositoryIDBytes(pullRequests[uint64(i)].Id)), &pullRequest)
			if pullRequest.State == types.PullRequest_CLOSED {
				repositoryPullRequest := types.RepositoryPullRequest{
					Id:  pullRequest.Id,
					Iid: pullRequest.Iid,
				}
				pullRequestBuffer = append(pullRequestBuffer, &repositoryPullRequest)
			}
		}
		pullRequests = pullRequestBuffer
		totalPullRequestCount = uint64(len(pullRequestBuffer))
	} else if option.State == types.PullRequest_MERGED.String() {
		var pullRequestBuffer []*types.RepositoryPullRequest
		for i := 0; uint64(i) < totalPullRequestCount; i++ {
			var pullRequest types.PullRequest
			k.cdc.MustUnmarshal(pullRequestStore.Get(GetRepositoryIDBytes(pullRequests[uint64(i)].Id)), &pullRequest)
			if pullRequest.State == types.PullRequest_MERGED {
				repositoryPullRequest := types.RepositoryPullRequest{
					Id:  pullRequest.Id,
					Iid: pullRequest.Iid,
				}
				pullRequestBuffer = append(pullRequestBuffer, &repositoryPullRequest)
			}
		}
		pullRequests = pullRequestBuffer
		totalPullRequestCount = uint64(len(pullRequestBuffer))
	}

	if option.Labels == "ANY" {
		var pullRequestBuffer []*types.RepositoryPullRequest
		for i := 0; uint64(i) < totalPullRequestCount; i++ {
			var pullRequest types.PullRequest
			k.cdc.MustUnmarshal(pullRequestStore.Get(GetRepositoryIDBytes(pullRequests[uint64(i)].Id)), &pullRequest)
			if len(pullRequest.Labels) > 0 {
				repositoryPullRequest := types.RepositoryPullRequest{
					Id:  pullRequest.Id,
					Iid: pullRequest.Iid,
				}
				pullRequestBuffer = append(pullRequestBuffer, &repositoryPullRequest)
			}
		}
		pullRequests = pullRequestBuffer
		totalPullRequestCount = uint64(len(pullRequestBuffer))
	} else if option.Labels == "NONE" {
		var pullRequestBuffer []*types.RepositoryPullRequest
		for i := 0; uint64(i) < totalPullRequestCount; i++ {
			var pullRequest types.PullRequest
			k.cdc.MustUnmarshal(pullRequestStore.Get(GetRepositoryIDBytes(pullRequests[uint64(i)].Id)), &pullRequest)
			if len(pullRequest.Labels) == 0 {
				repositoryPullRequest := types.RepositoryPullRequest{
					Id:  pullRequest.Id,
					Iid: pullRequest.Iid,
				}
				pullRequestBuffer = append(pullRequestBuffer, &repositoryPullRequest)
			}
		}
		pullRequests = pullRequestBuffer
		totalPullRequestCount = uint64(len(pullRequestBuffer))
	}

	if len(option.LabelIds) > 0 {
		var pullRequestBuffer []*types.RepositoryPullRequest
		for i := 0; uint64(i) < totalPullRequestCount; i++ {
			var pullRequest types.PullRequest
			k.cdc.MustUnmarshal(pullRequestStore.Get(GetRepositoryIDBytes(pullRequests[uint64(i)].Id)), &pullRequest)
			contains := false
			for _, l := range option.LabelIds {
				if _, exists := utils.LabelIdExists(pullRequest.Labels, l); exists {
					contains = true
				} else {
					contains = false
					break
				}
			}
			if contains {
				repositoryPullRequest := types.RepositoryPullRequest{
					Id:  pullRequest.Id,
					Iid: pullRequest.Iid,
				}
				pullRequestBuffer = append(pullRequestBuffer, &repositoryPullRequest)
			}
		}
		pullRequests = pullRequestBuffer
		totalPullRequestCount = uint64(len(pullRequestBuffer))
	}

	if option.UpdatedAfter != 0 {
		var pullRequestBuffer []*types.RepositoryPullRequest
		for i := 0; uint64(i) < totalPullRequestCount; i++ {
			var pullRequest types.PullRequest
			k.cdc.MustUnmarshal(pullRequestStore.Get(GetRepositoryIDBytes(pullRequests[uint64(i)].Id)), &pullRequest)
			if pullRequest.UpdatedAt > option.UpdatedAfter {
				repositoryPullRequest := types.RepositoryPullRequest{
					Id:  pullRequest.Id,
					Iid: pullRequest.Iid,
				}
				pullRequestBuffer = append(pullRequestBuffer, &repositoryPullRequest)
			}
		}
		pullRequests = pullRequestBuffer
		totalPullRequestCount = uint64(len(pullRequestBuffer))
	}

	if option.UpdatedBefore != 0 {
		var pullRequestBuffer []*types.RepositoryPullRequest
		for i := 0; uint64(i) < totalPullRequestCount; i++ {
			var pullRequest types.PullRequest
			k.cdc.MustUnmarshal(pullRequestStore.Get(GetRepositoryIDBytes(pullRequests[uint64(i)].Id)), &pullRequest)
			if pullRequest.UpdatedAt < option.UpdatedBefore {
				repositoryPullRequest := types.RepositoryPullRequest{
					Id:  pullRequest.Id,
					Iid: pullRequest.Iid,
				}
				pullRequestBuffer = append(pullRequestBuffer, &repositoryPullRequest)
			}
		}
		pullRequests = pullRequestBuffer
		totalPullRequestCount = uint64(len(pullRequestBuffer))
	}

	if option.Search != "" {
		var pullRequestBuffer []*types.RepositoryPullRequest
		for i := 0; uint64(i) < totalPullRequestCount; i++ {
			var pullRequest types.PullRequest
			k.cdc.MustUnmarshal(pullRequestStore.Get(GetRepositoryIDBytes(pullRequests[uint64(i)].Id)), &pullRequest)
			if strings.Contains(pullRequest.Title, option.Search) {
				repositoryPullRequest := types.RepositoryPullRequest{
					Id:  pullRequest.Id,
					Iid: pullRequest.Iid,
				}
				pullRequestBuffer = append(pullRequestBuffer, &repositoryPullRequest)
			}
		}
		pullRequests = pullRequestBuffer
		totalPullRequestCount = uint64(len(pullRequestBuffer))
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

		for i := GetPullRequestIDFromBytes(key); uint64(i) < totalPullRequestCount; i++ {
			if count == limit {
				nextKey = GetPullRequestIDBytes(uint64(i))
				break
			}

			var pullRequest types.PullRequest
			k.cdc.MustUnmarshal(pullRequestStore.Get(GetPullRequestIDBytes(pullRequests[uint64(i)].Id)), &pullRequest)
			err := onResult(pullRequest)
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

	for i := offset; uint64(i) < totalPullRequestCount; i++ {
		if uint64(i) < end {
			var pullRequest types.PullRequest
			k.cdc.MustUnmarshal(pullRequestStore.Get(GetPullRequestIDBytes(pullRequests[uint64(i)].Id)), &pullRequest)
			err := onResult(pullRequest)
			if err != nil {
				return nil, err
			}
		} else if uint64(i) == end {
			nextKey = GetPullRequestIDBytes(uint64(i))
			break
		}
	}

	res := &query.PageResponse{NextKey: nextKey}
	if countTotal {
		res.Total = totalPullRequestCount
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
