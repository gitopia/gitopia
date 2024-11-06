package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/x/group"
	"github.com/gitopia/gitopia/v4/x/gitopia/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) DaoMemberAll(c context.Context, req *types.QueryAllDaoMemberRequest) (*types.QueryAllDaoMemberResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(c)

	daoAddress, err := k.ResolveAddress(ctx, req.DaoId)
	if err != nil {
		return nil, err
	}

	dao, found := k.GetDao(ctx, daoAddress.Address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("DAO (%v) doesn't exist", req.DaoId))
	}

	groupMembersReq := &group.QueryGroupMembersRequest{
		GroupId:    dao.GroupId,
		Pagination: req.Pagination,
	}

	res, err := k.groupKeeper.GroupMembers(ctx, groupMembersReq)
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllDaoMemberResponse{Members: res.Members, Pagination: res.Pagination}, nil
}
