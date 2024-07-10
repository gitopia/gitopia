package types_test

import (
	"testing"

	"github.com/gitopia/gitopia/v4/testutil/sample"
	"github.com/gitopia/gitopia/v4/x/gitopia/types"
	"github.com/stretchr/testify/require"
)

func TestGenesisState_Validate(t *testing.T) {
	userId := sample.AccAddress()
	daoId := sample.AccAddress()
	for _, tc := range []struct {
		desc     string
		genState *types.GenesisState
		valid    bool
	}{
		{
			desc:     "default is valid",
			genState: types.DefaultGenesis(),
			valid:    true,
		},
		{
			desc: "valid genesis state",
			genState: &types.GenesisState{
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
						Creator: userId,
						Owner: &types.RepositoryOwner{
							Id:   userId,
							Type: types.OwnerType_USER,
						},
						Name: "repository-0",
						Id:   0,
					},
					{
						Creator: userId,
						Owner: &types.RepositoryOwner{
							Id:   userId,
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
						Address: userId,
						Name:    "repository-0",
					},
					{
						Id:      1,
						Address: userId,
						Name:    "repository-1",
					},
				},

				DaoList: []types.Dao{
					{
						Creator: sample.AccAddress(),
						Id:      0,
						Address: sample.AccAddress(),
					},
				},
				DaoCount: 1,

				UserDaoList: []types.UserDao{
					{
						DaoAddress:  daoId,
						UserAddress: userId,
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
						Address:    userId,
						DaoAddress: daoId,
					},
				},
				MemberCount: 1,

				BountyList: []types.Bounty{
					{
						Id: 0,
					},
					{
						Id: 1,
					},
				},
				BountyCount: 2,
				// this line is used by starport scaffolding # types/genesis/validField
			},
			valid: true,
		},

		{
			desc: "duplicated whois",
			genState: &types.GenesisState{
				WhoisList: []types.Whois{
					{
						Name: "name",
					},
					{
						Name: "name",
					},
				},
			},
			valid: false,
		},

		{
			desc: "duplicated user",
			genState: &types.GenesisState{
				UserList: []types.User{
					{
						Creator: userId,
						Id:      0,
					},
					{
						Creator: userId,
						Id:      1,
					},
				},
			},
			valid: false,
		},
		{
			desc: "invalid user count",
			genState: &types.GenesisState{
				UserList: []types.User{
					{
						Creator: sample.AccAddress(),
						Id:      0,
					},
				},
				UserCount: 0,
			},
			valid: false,
		},
		{
			desc: "duplicated repository id",
			genState: &types.GenesisState{
				RepositoryList: []types.Repository{
					{
						Creator: userId,
						Owner: &types.RepositoryOwner{
							Id:   userId,
							Type: types.OwnerType_USER,
						},
						Name: "repository-0",
						Id:   0,
					},
					{
						Creator: userId,
						Owner: &types.RepositoryOwner{
							Id:   userId,
							Type: types.OwnerType_USER,
						},
						Name: "repository-1",
						Id:   0,
					},
				},
				RepositoryCount: 2,
			},
			valid: false,
		},
		{
			desc: "duplicated repository",
			genState: &types.GenesisState{
				RepositoryList: []types.Repository{
					{
						Creator: userId,
						Owner: &types.RepositoryOwner{
							Id:   userId,
							Type: types.OwnerType_USER,
						},
						Name: "repository",
						Id:   0,
					},
					{
						Creator: userId,
						Owner: &types.RepositoryOwner{
							Id:   userId,
							Type: types.OwnerType_USER,
						},
						Name: "repository",
						Id:   1,
					},
				},
				RepositoryCount: 2,
			},
			valid: false,
		},
		{
			desc: "invalid repository count",
			genState: &types.GenesisState{
				RepositoryList: []types.Repository{
					{
						Creator: userId,
						Owner: &types.RepositoryOwner{
							Id:   userId,
							Type: types.OwnerType_USER,
						},
						Name: "repository-0",
						Id:   0,
					},
				},
				RepositoryCount: 0,
			},
			valid: false,
		},

		{
			desc: "duplicated issue",
			genState: &types.GenesisState{
				IssueList: []types.Issue{
					{
						Id: 0,
					},
					{
						Id: 0,
					},
				},
				IssueCount: 2,
			},
			valid: false,
		},
		{
			desc: "invalid issue count",
			genState: &types.GenesisState{
				IssueList: []types.Issue{
					{
						Id: 0,
					},
				},
				IssueCount: 0,
			},
			valid: false,
		},

		{
			desc: "duplicated Dao",
			genState: &types.GenesisState{
				DaoList: []types.Dao{
					{
						Id: 0,
					},
					{
						Id: 0,
					},
				},
				DaoCount: 2,
			},
			valid: false,
		},
		{
			desc: "invalid Dao count",
			genState: &types.GenesisState{
				DaoList: []types.Dao{
					{
						Id: 0,
					},
				},
				DaoCount: 0,
			},
			valid: false,
		},

		{
			desc: "duplicated pullrequest",
			genState: &types.GenesisState{
				PullRequestList: []types.PullRequest{
					{
						Id: 0,
					},
					{
						Id: 0,
					},
				},
				PullRequestCount: 2,
			},
			valid: false,
		},
		{
			desc: "invalid pullrequest count",
			genState: &types.GenesisState{
				PullRequestList: []types.PullRequest{
					{
						Id: 0,
					},
				},
				PullRequestCount: 0,
			},
			valid: false,
		},

		{
			desc: "duplicated release",
			genState: &types.GenesisState{
				ReleaseList: []types.Release{
					{
						Id: 0,
					},
					{
						Id: 0,
					},
				},
				ReleaseCount: 2,
			},
			valid: false,
		},
		{
			desc: "invalid release count",
			genState: &types.GenesisState{
				ReleaseList: []types.Release{
					{
						Id: 0,
					},
				},
				ReleaseCount: 0,
			},
			valid: false,
		},
		{
			desc: "duplicated task",
			genState: &types.GenesisState{
				TaskList: []types.Task{
					{
						Id: 0,
					},
					{
						Id: 0,
					},
				},
			},
			valid: false,
		},
		{
			desc: "invalid task count",
			genState: &types.GenesisState{
				TaskList: []types.Task{
					{
						Id: 1,
					},
				},
				TaskCount: 0,
			},
			valid: false,
		},
		{
			desc: "duplicated branch id",
			genState: &types.GenesisState{
				BranchList: []types.Branch{
					{
						Id:           0,
						RepositoryId: 0,
						Name:         "branch-0",
					},
					{
						Id:           0,
						RepositoryId: 0,
						Name:         "branch-1",
					},
				},
			},
			valid: false,
		},
		{
			desc: "duplicated branch",
			genState: &types.GenesisState{
				BranchList: []types.Branch{
					{
						Id:           0,
						RepositoryId: 0,
						Name:         "branch",
					},
					{
						Id:           1,
						RepositoryId: 0,
						Name:         "branch",
					},
				},
			},
			valid: false,
		},
		{
			desc: "invalid branch count",
			genState: &types.GenesisState{
				BranchList: []types.Branch{
					{
						Id:           1,
						RepositoryId: 0,
						Name:         "Branch",
					},
				},
				BranchCount: 0,
			},
			valid: false,
		},
		{
			desc: "duplicated tag id",
			genState: &types.GenesisState{
				TagList: []types.Tag{
					{
						Id:           0,
						RepositoryId: 0,
						Name:         "tag-0",
					},
					{
						Id:           0,
						RepositoryId: 0,
						Name:         "tag-1",
					},
				},
			},
			valid: false,
		},
		{
			desc: "duplicated tag",
			genState: &types.GenesisState{
				TagList: []types.Tag{
					{
						Id:           0,
						RepositoryId: 0,
						Name:         "tag",
					},
					{
						Id:           1,
						RepositoryId: 0,
						Name:         "tag",
					},
				},
			},
			valid: false,
		},
		{
			desc: "invalid tag count",
			genState: &types.GenesisState{
				TagList: []types.Tag{
					{
						Id:           1,
						RepositoryId: 0,
						Name:         "tag",
					},
				},
				TagCount: 0,
			},
			valid: false,
		},
		{
			desc: "duplicated member id",
			genState: &types.GenesisState{
				MemberList: []types.Member{
					{
						Id: 0,
					},
					{
						Id: 0,
					},
				},
			},
			valid: false,
		},
		{
			desc: "duplicated member",
			genState: &types.GenesisState{
				MemberList: []types.Member{
					{
						Id:         0,
						Address:    userId,
						DaoAddress: daoId,
					},
					{
						Id:         1,
						Address:    userId,
						DaoAddress: daoId,
					},
				},
			},
			valid: false,
		},
		{
			desc: "invalid member count",
			genState: &types.GenesisState{
				MemberList: []types.Member{
					{
						Id: 1,
					},
				},
				MemberCount: 0,
			},
			valid: false,
		},
		{
			desc: "duplicated bounty",
			genState: &types.GenesisState{
				BountyList: []types.Bounty{
					{
						Id: 0,
					},
					{
						Id: 0,
					},
				},
			},
			valid: false,
		},
		{
			desc: "invalid bounty count",
			genState: &types.GenesisState{
				BountyList: []types.Bounty{
					{
						Id: 1,
					},
				},
				BountyCount: 0,
			},
			valid: false,
		},
		// this line is used by starport scaffolding # types/genesis/testcase
	} {
		t.Run(tc.desc, func(t *testing.T) {
			err := tc.genState.Validate()
			if tc.valid {
				require.NoError(t, err)
			} else {
				require.Error(t, err)
			}
		})
	}
}
