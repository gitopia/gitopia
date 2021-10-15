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

func (k Keeper) Issue(c context.Context, req *types.QueryGetIssueRequest) (*types.QueryGetIssueResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(c)

	issue, found := k.GetIssue(ctx, req.Id)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	return &types.QueryGetIssueResponse{Issue: &issue}, nil
}
