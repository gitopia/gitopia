package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"

	gTypes "github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/gitopia/gitopia/x/rewards/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) Tasks(c context.Context, req *types.QueryTasksRequest) (*types.QueryTasksResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)
	var tasks []types.Task

	whois, err := k.gitopiaKeeper.ResolveAddress(ctx, req.Address)
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	if whois.OwnerType != gTypes.OwnerType_USER {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}

	repos := k.gitopiaKeeper.GetAllAddressRepository(ctx, req.GetAddress())

	for _, repo := range repos {
		// non empty repo
		if len(repo.Commits) > 0 {
			tasks = append(tasks, types.Task{
				Type:       types.TaskType_CREATE_NON_EMPTY_REPO,
				IsComplete: true,
			})
			break
		}
	}

	// non empty DAO repo
	daos := k.gitopiaKeeper.GetAllUserDao(ctx, req.Address)
	for _, dao := range daos {
		if dao.Creator == req.Address {
			res, err := k.gitopiaKeeper.AnyRepositoryAll(ctx, &gTypes.QueryAllAnyRepositoryRequest{Id: dao.Address})
			if err != nil {
				return nil, status.Error(codes.Internal, err.Error())
			}
			for _, repo := range res.Repository {
				// the repo must be created by the dao owner only, who is also the requested user
				if repo.Creator == req.Address && len(repo.Commits) > 0 {
					tasks = append(tasks, types.Task{
						Type:       types.TaskType_CREATE_NON_EMPTY_DAO_REPO,
						IsComplete: true,
					})
					break
				}
			}
		}

	}

	// PR to verified repo
	prs:= k.gitopiaKeeper.GetAllPullRequest(ctx)
	prCreated := false
	prMerged := false
	for _, pr := range prs {
		if pr.Creator == req.Address {
			prCreated = true
			if pr.State == gTypes.PullRequest_MERGED {
				prMerged = true
			}
		}
	}

	if prCreated {
		tasks = append(tasks, types.Task{
			Type:       types.TaskType_PR_TO_VERIFIED_REPO,
			IsComplete: true,
		})
	}
	
	if prMerged {
		tasks = append(tasks, types.Task{
			Type:       types.TaskType_PR_TO_VERIFIED_REPO_MERGED,
			IsComplete: true,
		})
	}

	accAddr, err := sdk.AccAddressFromBech32(req.Address)
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	// lore staking
	delegations := k.stakingKeeper.GetDelegatorDelegations(ctx, accAddr, 1) // atleast 1
	if len(delegations) > 0 {
		tasks = append(tasks, types.Task{
			Type:       types.TaskType_LORE_STAKED,
			IsComplete: true,
		})
	}

	
	return &types.QueryTasksResponse{Tasks: tasks}, nil
}
