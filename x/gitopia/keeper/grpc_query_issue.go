package keeper

import (
	"context"
	"fmt"
	"sort"
	"strings"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/gitopia/gitopia/v2/x/gitopia/types"
	"github.com/gitopia/gitopia/v2/x/gitopia/utils"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) IssueAll(c context.Context, req *types.QueryAllIssueRequest) (*types.QueryAllIssueResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var issues []*types.Issue
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	issueStore := prefix.NewStore(store, types.KeyPrefix(types.IssueKey))

	pageRes, err := query.Paginate(issueStore, req.Pagination, func(key []byte, value []byte) error {
		var issue types.Issue
		if err := k.cdc.Unmarshal(value, &issue); err != nil {
			return err
		}

		issues = append(issues, &issue)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllIssueResponse{Issue: issues, Pagination: pageRes}, nil
}

func (k Keeper) RepositoryIssueAll(c context.Context, req *types.QueryAllRepositoryIssueRequest) (*types.QueryAllRepositoryIssueResponse, error) {
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
	resAllRepositoryIssue := k.GetAllRepositoryIssue(ctx, repository.Id)
	var allRepositoryIssue []*types.Issue
	for i := 0; i < len(resAllRepositoryIssue); i++ {
		allRepositoryIssue = append(allRepositoryIssue, &resAllRepositoryIssue[i])
	}

	var issues []*types.Issue
	pageRes, err := PaginateAllRepositoryIssue(k, ctx, allRepositoryIssue, req.Pagination, req.Option, func(issue types.Issue) error {
		issues = append(issues, &issue)
		return nil
	})
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllRepositoryIssueResponse{Issue: issues, Pagination: pageRes}, nil
}

func (k Keeper) RepositoryIssue(c context.Context, req *types.QueryGetRepositoryIssueRequest) (*types.QueryGetRepositoryIssueResponse, error) {
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

	issue, found := k.GetRepositoryIssue(ctx, repository.Id, req.IssueIid)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	return &types.QueryGetRepositoryIssueResponse{Issue: &issue}, nil
}

/* PaginateAllRepositoryIssue does pagination of the provided issue list
 * based on the provided PageRequest.
 */
func PaginateAllRepositoryIssue(
	k Keeper,
	ctx sdk.Context,
	issues []*types.Issue,
	pageRequest *query.PageRequest,
	option *types.IssueOptions,
	onResult func(issue types.Issue) error,
) (*query.PageResponse, error) {
	if option == nil {
		option = &types.IssueOptions{}
	}

	if option.Sort != "ASC" {
		sort.Sort(sort.Reverse(types.IssueList(issues)))
	}

	if option.CreatedBy != "" {
		var issueBuffer []*types.Issue
		for _, issue := range issues {
			address, err := k.ResolveAddress(ctx, option.CreatedBy)
			if err != nil {
				return nil, status.Error(codes.NotFound, err.Error())
			}

			if issue.Creator == address.Address {
				issueBuffer = append(issueBuffer, issue)
			}
		}
		issues = issueBuffer
	}

	if option.Assignee != "" {
		var issueBuffer []*types.Issue
		for _, issue := range issues {
			address, err := k.ResolveAddress(ctx, option.Assignee)
			if err != nil {
				return nil, status.Error(codes.NotFound, err.Error())
			}

			if _, exists := utils.AssigneeExists(issue.Assignees, address.Address); exists {
				issueBuffer = append(issueBuffer, issue)
			}
		}
		issues = issueBuffer
	}

	if option.State == types.Issue_CLOSED.String() {
		var issueBuffer []*types.Issue
		for _, issue := range issues {
			if issue.State == types.Issue_CLOSED {
				issueBuffer = append(issueBuffer, issue)
			}
		}
		issues = issueBuffer
	} else if option.State == types.Issue_OPEN.String() {
		var issueBuffer []*types.Issue
		for _, issue := range issues {
			if issue.State == types.Issue_OPEN {
				issueBuffer = append(issueBuffer, issue)
			}
		}
		issues = issueBuffer
	}

	if option.Labels == "ANY" {
		var issueBuffer []*types.Issue
		for _, issue := range issues {
			if len(issue.Labels) > 0 {
				issueBuffer = append(issueBuffer, issue)
			}
		}
		issues = issueBuffer
	} else if option.Labels == "NONE" {
		var issueBuffer []*types.Issue
		for _, issue := range issues {
			if len(issue.Labels) == 0 {
				issueBuffer = append(issueBuffer, issue)
			}
		}
		issues = issueBuffer
	}

	if len(option.LabelIds) > 0 {
		var issueBuffer []*types.Issue
		for _, issue := range issues {
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
				issueBuffer = append(issueBuffer, issue)
			}
		}
		issues = issueBuffer
	}

	if option.UpdatedAfter != 0 {
		var issueBuffer []*types.Issue
		for _, issue := range issues {
			if issue.UpdatedAt > option.UpdatedAfter {
				issueBuffer = append(issueBuffer, issue)
			}
		}
		issues = issueBuffer
	}

	if option.UpdatedBefore != 0 {
		var issueBuffer []*types.Issue
		for _, issue := range issues {
			if issue.UpdatedAt < option.UpdatedBefore {
				issueBuffer = append(issueBuffer, issue)
			}
		}
		issues = issueBuffer
	}

	if option.Search != "" {
		var issueBuffer []*types.Issue
		for _, issue := range issues {
			if strings.Contains(strings.ToLower(issue.Title), strings.ToLower(option.Search)) {
				issueBuffer = append(issueBuffer, issue)
			}
		}
		issues = issueBuffer
	}

	totalIssueCount := uint64(len(issues))

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

		for i := GetIssueIDFromBytes(key); i < totalIssueCount; i++ {
			if count == limit {
				nextKey = GetIssueIDBytes(uint64(i))
				break
			}

			err := onResult(*issues[i])
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

	for i := offset; i < totalIssueCount; i++ {
		if uint64(i) < end {
			err := onResult(*issues[i])
			if err != nil {
				return nil, err
			}
		} else if i == end {
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
