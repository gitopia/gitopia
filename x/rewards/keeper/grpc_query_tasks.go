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
		types.TaskType_CREATE_USER:                            5,
		types.TaskType_CREATE_NON_EMPTY_REPO:                  10,
		types.TaskType_PR_TO_REPO_MERGED:                      20,
		types.TaskType_PR_TO_VERIFIED_REPO_MERGED:             10,
		types.TaskType_PR_TO_VERIFIED_REPO_MERGED_WITH_BOUNTY: 10,
		types.TaskType_CREATE_ISSUE:                           5,
		types.TaskType_CREATE_ISSUE_WITH_BOUNTY:               10,
		types.TaskType_CREATE_ISSUE_WITH_BOUNTY_VERIFIED:      10,
		types.TaskType_LORE_STAKED:                            10,
		types.TaskType_VOTE_PROPOSAL:                          10,
	}
)

func (k Keeper) Tasks(c context.Context, req *types.QueryTasksRequest) (*types.QueryTasksResponse, error) {
	if req == nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)
	var tasks []types.Task

	_, found := k.gitopiaKeeper.GetUser(ctx, req.Address)
	if !found {
		// DAOs cannot claim rewards
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("user %s not found", req.Address))
	}

	tasks = append(tasks, types.Task{
		Type:       types.TaskType_CREATE_USER,
		IsComplete: true,
		Weight:     taskWeights[types.TaskType_CREATE_USER],
	})

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

	issueCreated := false
	issueCreatedWithBounty := false
	issueCreatedWithBountyVerified := false

	issues := k.gitopiaKeeper.GetAllIssue(ctx)

	for _, issue := range issues {
		if issue.Creator == req.Address {
			issueCreated = true

			if len(issue.Bounties) > 0 {
				issueCreatedWithBounty = true

				repo, f := k.gitopiaKeeper.GetRepositoryById(ctx, issue.RepositoryId)
				if f && repo.Owner.Type == gTypes.OwnerType_DAO {
					issueCreatedWithBountyVerified = true
				}
			}
		}
	}

	tasks = append(tasks, types.Task{
		Type:       types.TaskType_CREATE_ISSUE,
		IsComplete: issueCreated,
		Weight:     taskWeights[types.TaskType_CREATE_ISSUE],
	}, types.Task{
		Type:       types.TaskType_CREATE_ISSUE_WITH_BOUNTY,
		IsComplete: issueCreatedWithBounty,
		Weight:     taskWeights[types.TaskType_CREATE_ISSUE_WITH_BOUNTY],
	}, types.Task{
		Type:       types.TaskType_CREATE_ISSUE_WITH_BOUNTY_VERIFIED,
		IsComplete: issueCreatedWithBountyVerified,
		Weight:     taskWeights[types.TaskType_CREATE_ISSUE_WITH_BOUNTY_VERIFIED],
	})

	prMerged := false
	prMergedVerified := false
	prMergedWithBountyVerified := false

	prs := k.gitopiaKeeper.GetAllPullRequest(ctx)

	for _, pr := range prs {
		if pr.Creator == req.Address && pr.State == gTypes.PullRequest_MERGED {
			prMerged = true

			baseRepo, f := k.gitopiaKeeper.GetRepositoryById(ctx, pr.Base.RepositoryId)
			if f && baseRepo.Owner.Type == gTypes.OwnerType_DAO {
				dao, f := k.gitopiaKeeper.GetDao(ctx, baseRepo.Owner.Id)
				if f && dao.Verified {
					prMergedVerified = true

					for _, i := range pr.Issues {
						issue, f := k.gitopiaKeeper.GetRepositoryIssue(ctx, baseRepo.Id, i.Iid)
						if f {
							for _, bountyId := range issue.Bounties {
								bounty, f := k.gitopiaKeeper.GetBounty(ctx, bountyId)
								if f && bounty.RewardedTo == pr.Creator {
									prMergedWithBountyVerified = true
								}
							}
						}
					}
				}
			}
		}
	}

	tasks = append(tasks, types.Task{
		Type:       types.TaskType_PR_TO_REPO_MERGED,
		IsComplete: prMerged,
		Weight:     taskWeights[types.TaskType_PR_TO_REPO_MERGED],
	}, types.Task{
		Type:       types.TaskType_PR_TO_VERIFIED_REPO_MERGED,
		IsComplete: prMergedVerified,
		Weight:     taskWeights[types.TaskType_PR_TO_VERIFIED_REPO_MERGED],
	}, types.Task{
		Type:       types.TaskType_PR_TO_VERIFIED_REPO_MERGED_WITH_BOUNTY,
		IsComplete: prMergedWithBountyVerified,
		Weight:     taskWeights[types.TaskType_PR_TO_VERIFIED_REPO_MERGED_WITH_BOUNTY],
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
		Weight:     taskWeights[types.TaskType_LORE_STAKED],
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
		Weight:     taskWeights[types.TaskType_VOTE_PROPOSAL],
	})

	return &types.QueryTasksResponse{Tasks: tasks}, nil
}
