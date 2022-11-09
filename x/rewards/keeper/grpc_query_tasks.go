package keeper

import (
	"context"
	
	"github.com/gitopia/gitopia/x/rewards/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) Tasks(c context.Context, req *types.QueryTasksRequest) (*types.QueryTasksResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var tasks []types.Task

	// non empty repo

	return &types.QueryTasksResponse{Tasks: tasks}, nil
}