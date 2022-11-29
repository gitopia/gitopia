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

	user, found := k.gitopiaKeeper.GetUser(ctx, req.Address)
	if !found {
		// DAOs cannot claim rewards
		return nil, status.Error(codes.InvalidArgument, "user not found")
	}
	repos := k.gitopiaKeeper.GetAllAddressRepository(ctx, req.GetAddress())

	taskComplete := false
	for _, repo := range repos {
		// non empty repo
		if len(repo.Commits) > 0 {
			taskComplete = true
			break
		}
	}
	tasks = append(tasks, types.Task{
		Type:       types.TaskType_CREATE_NON_EMPTY_REPO,
		IsComplete: taskComplete,
	})

	// non empty DAO repo
	taskComplete = false
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
					taskComplete = true
					break
				}
			}
		}

	}

	tasks = append(tasks, types.Task{
		Type:       types.TaskType_CREATE_NON_EMPTY_DAO_REPO,
		IsComplete: taskComplete,
	})

	prCreated := false
	prMerged := false
	// PR to verified repo
	if user.Verified {
		prs := k.gitopiaKeeper.GetAllPullRequest(ctx)

		for _, pr := range prs {
			if pr.Creator == req.Address {
				prCreated = true
				if pr.State == gTypes.PullRequest_MERGED {
					prMerged = true
					break
				}
			}
		}
	}
	tasks = append(tasks, types.Task{
		Type:       types.TaskType_PR_TO_VERIFIED_REPO,
		IsComplete: prCreated,
	})

	tasks = append(tasks, types.Task{
		Type:       types.TaskType_PR_TO_VERIFIED_REPO_MERGED,
		IsComplete: prMerged,
	})

	accAddr, err := sdk.AccAddressFromBech32(req.Address)
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	// lore staking
	taskComplete = false
	delegations := k.stakingKeeper.GetDelegatorDelegations(ctx, accAddr, 1) // atleast 1
	if len(delegations) > 0 {
		taskComplete = true
	}

	tasks = append(tasks, types.Task{
		Type:       types.TaskType_LORE_STAKED,
		IsComplete: taskComplete,
	})

	// proposal voting
	taskComplete = false
	votes := k.GovKeeper.GetAllVotes(ctx)
	for _, vote := range votes {
		if vote.Voter == req.Address {
			taskComplete = true
		}
	}
	tasks = append(tasks, types.Task{
		Type:       types.TaskType_VOTE_PROPOSAL,
		IsComplete: taskComplete,
	})

	return &types.QueryTasksResponse{Tasks: tasks}, nil
}
