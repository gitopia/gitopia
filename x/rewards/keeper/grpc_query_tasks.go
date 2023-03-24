package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

	gTypes "github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/gitopia/gitopia/x/rewards/types"
)

var (
	// NOTE: sum of all task claim percent should not exceed 100
	taskWeights = map[types.TaskType]int32{
		types.TaskType_CREATE_NON_EMPTY_REPO:      10,
		types.TaskType_CREATE_NON_EMPTY_DAO_REPO:  10,
		types.TaskType_PR_TO_VERIFIED_REPO:        20, // remove
		types.TaskType_PR_TO_VERIFIED_REPO_MERGED: 20,
		types.TaskType_LORE_STAKED:                20,
		types.TaskType_VOTE_PROPOSAL:              20,
	}
)

func (k Keeper) Tasks(c context.Context, req *types.QueryTasksRequest) (*types.QueryTasksResponse, error) {
	if req == nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)
	var tasks []types.Task

	user, found := k.gitopiaKeeper.GetUser(ctx, req.Address)
	if !found {
		// DAOs cannot claim rewards
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("user %s not found", req.Address))
	}
	repos := k.gitopiaKeeper.GetAllAddressRepository(ctx, req.GetAddress())

	taskComplete := false
	for _, repo := range repos {
		branches := k.gitopiaKeeper.GetAllRepositoryBranch(ctx, repo.Id)
		// non empty repo
		if len(branches) > 0 {
			taskComplete = true
			break
		}
	}
	tasks = append(tasks, types.Task{
		Type:       types.TaskType_CREATE_NON_EMPTY_REPO,
		IsComplete: taskComplete,
		Weight:     taskWeights[types.TaskType_CREATE_NON_EMPTY_REPO],
	})

	// non empty DAO repo
	taskComplete = false
	daos, err := k.gitopiaKeeper.GetAllUserDao(ctx, req.Address)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrLogic, "unable to get user dao")
	}
	for _, dao := range daos {
		if dao.Creator == req.Address {
			res, err := k.gitopiaKeeper.AnyRepositoryAll(ctx, &gTypes.QueryAllAnyRepositoryRequest{Id: dao.Address})
			if err != nil {
				return nil, sdkerrors.Wrap(sdkerrors.ErrLogic, "error fetching DAO repos for address "+dao.Address)
			}
			for _, repo := range res.Repository {
				branches := k.gitopiaKeeper.GetAllRepositoryBranch(ctx, repo.Id)
				// the repo must be created by the dao owner only, who is also the requested user
				if repo.Creator == req.Address && len(branches) > 0 {
					taskComplete = true
					break
				}
			}
		}

	}

	tasks = append(tasks, types.Task{
		Type:       types.TaskType_CREATE_NON_EMPTY_DAO_REPO,
		IsComplete: taskComplete,
		Weight:     taskWeights[types.TaskType_CREATE_NON_EMPTY_DAO_REPO],
	})

	prCreated := false
	prMerged := false
	// PR to verified repos

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
		Weight: taskWeights[types.TaskType_PR_TO_VERIFIED_REPO],
	})

	tasks = append(tasks, types.Task{
		Type:       types.TaskType_PR_TO_VERIFIED_REPO_MERGED,
		IsComplete: prMerged,
		Weight: taskWeights[types.TaskType_PR_TO_VERIFIED_REPO_MERGED],
	})

	accAddr, err := sdk.AccAddressFromBech32(req.Address)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, err.Error())
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
		Weight: taskWeights[types.TaskType_LORE_STAKED],
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
		Weight: taskWeights[types.TaskType_VOTE_PROPOSAL],
	})

	return &types.QueryTasksResponse{Tasks: tasks}, nil
}
