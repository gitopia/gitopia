package gitopia_test

import (
	"testing"

	keepertest "github.com/gitopia/gitopia/testutil/keeper"
	"github.com/gitopia/gitopia/testutil/sample"
	"github.com/gitopia/gitopia/x/gitopia"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		WhoisList: []types.Whois{
			{
				Creator: sample.AccAddress(),
				Name:    "name-1",
				Address: sample.AccAddress(),
			},
			{
				Creator: sample.AccAddress(),
				Name:    "name-2",
				Address: sample.AccAddress(),
			},
		},
		WhoisCount: 2,

		UserList: []types.User{
			{
				Creator: sample.AccAddress(),
				Id:      0,
			},
			{
				Creator: sample.AccAddress(),
				Id:      1,
			},
		},
		UserCount: 2,

		RepositoryList: []types.Repository{
			{
				Creator: sample.AccAddress(),
				Owner: &types.RepositoryOwner{
					Id:   sample.AccAddress(),
					Type: types.OwnerType_USER,
				},
				Name: "repository-0",
				Id:   0,
			},
			{
				Creator: sample.AccAddress(),
				Owner: &types.RepositoryOwner{
					Id:   sample.AccAddress(),
					Type: types.OwnerType_USER,
				},
				Name: "repository-1",
				Id:   1,
			},
		},
		RepositoryCount: 2,

		BaseRepositoryKeyList: []types.BaseRepositoryKey{
			{
				Id:      0,
				Address: sample.AccAddress(),
				Name:    "repository-0",
			},
			{
				Id:      1,
				Address: sample.AccAddress(),
				Name:    "repository-1",
			},
		},

		DaoList: []types.Dao{
			{
				Creator: sample.AccAddress(),
				Id:      0,
				Address: sample.AccAddress(),
			},
			{
				Creator: sample.AccAddress(),
				Id:      1,
				Address: sample.AccAddress(),
			},
		},
		DaoCount: 2,

		UserDaoList: []types.UserDao{
			{
				DaoAddress:  sample.AccAddress(),
				UserAddress: sample.AccAddress(),
			},
			{
				DaoAddress:  sample.AccAddress(),
				UserAddress: sample.AccAddress(),
			},
		},

		IssueList: []types.Issue{
			{
				Creator: sample.AccAddress(),
				Id:      0,
			},
			{
				Creator: sample.AccAddress(),
				Id:      1,
			},
		},
		IssueCount: 2,

		PullRequestList: []types.PullRequest{
			{
				Creator: sample.AccAddress(),
				Id:      0,
			},
			{
				Creator: sample.AccAddress(),
				Id:      1,
			},
		},
		PullRequestCount: 2,

		CommentList: []types.Comment{
			{
				Creator: sample.AccAddress(),
				Id:      0,
			},
			{
				Creator: sample.AccAddress(),
				Id:      1,
			},
		},
		CommentCount: 2,

		ReleaseList: []types.Release{
			{
				Creator: sample.AccAddress(),
				Id:      0,
			},
			{
				Creator: sample.AccAddress(),
				Id:      1,
			},
		},
		ReleaseCount: 2,

		TaskList: []types.Task{
			{
				Id: 0,
			},
			{
				Id: 1,
			},
		},
		TaskCount: 2,

		BranchList: []types.Branch{
			{
				Id:   0,
				Name: "branch-0",
			},
			{
				Id:   1,
				Name: "branch-1",
			},
		},
		BranchCount: 2,

		TagList: []types.Tag{
			{
				Id:   0,
				Name: "tag-0",
			},
			{
				Id:   1,
				Name: "tag-1",
			},
		},
		TagCount: 2,

		MemberList: []types.Member{
			{
				Id:         0,
				Address:    sample.AccAddress(),
				DaoAddress: sample.AccAddress(),
			},
			{
				Id:         1,
				Address:    sample.AccAddress(),
				DaoAddress: sample.AccAddress(),
			},
		},
		MemberCount: 2,
		BountyList: []types.Bounty{
			{
				Id: 0,
			},
			{
				Id: 1,
			},
		},
		BountyCount: 2,
		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.GitopiaKeeper(t)
	gitopia.InitGenesis(ctx, *k, genesisState)
	got := gitopia.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	require.Len(t, got.WhoisList, len(genesisState.WhoisList))
	require.Subset(t, genesisState.WhoisList, got.WhoisList)
	require.Equal(t, genesisState.WhoisCount, got.WhoisCount)

	require.Len(t, got.UserList, len(genesisState.UserList))
	require.Subset(t, genesisState.UserList, got.UserList)
	require.Equal(t, genesisState.UserCount, got.UserCount)

	require.Len(t, got.RepositoryList, len(genesisState.RepositoryList))
	require.Subset(t, genesisState.RepositoryList, got.RepositoryList)
	require.Equal(t, genesisState.RepositoryCount, got.RepositoryCount)

	require.Len(t, got.BaseRepositoryKeyList, len(genesisState.BaseRepositoryKeyList))

	require.Len(t, got.DaoList, len(genesisState.DaoList))
	require.Subset(t, genesisState.DaoList, got.DaoList)
	require.Equal(t, genesisState.DaoCount, got.DaoCount)

	require.Len(t, got.IssueList, len(genesisState.IssueList))
	require.Subset(t, genesisState.IssueList, got.IssueList)
	require.Equal(t, genesisState.IssueCount, got.IssueCount)

	require.Len(t, got.PullRequestList, len(genesisState.PullRequestList))
	require.Subset(t, genesisState.PullRequestList, got.PullRequestList)
	require.Equal(t, genesisState.PullRequestCount, got.PullRequestCount)

	require.Len(t, got.CommentList, len(genesisState.CommentList))
	require.Subset(t, genesisState.CommentList, got.CommentList)
	require.Equal(t, genesisState.CommentCount, got.CommentCount)

	require.Len(t, got.ReleaseList, len(genesisState.ReleaseList))
	require.Subset(t, genesisState.ReleaseList, got.ReleaseList)
	require.Equal(t, genesisState.ReleaseCount, got.ReleaseCount)

	require.ElementsMatch(t, genesisState.TaskList, got.TaskList)
	require.Equal(t, genesisState.TaskCount, got.TaskCount)

	require.ElementsMatch(t, genesisState.BranchList, got.BranchList)
	require.Equal(t, genesisState.BranchCount, got.BranchCount)

	require.ElementsMatch(t, genesisState.TagList, got.TagList)
	require.Equal(t, genesisState.TagCount, got.TagCount)

	require.ElementsMatch(t, genesisState.MemberList, got.MemberList)
	require.Equal(t, genesisState.MemberCount, got.MemberCount)

	require.ElementsMatch(t, genesisState.BountyList, got.BountyList)
	require.Equal(t, genesisState.BountyCount, got.BountyCount)
	// this line is used by starport scaffolding # genesis/test/assert
}
