package types_test

import (
	"testing"

	"github.com/gitopia/gitopia/testutil/sample"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/stretchr/testify/require"
)

func TestGenesisState_Validate(t *testing.T) {
	userId := sample.AccAddress()
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
						Creator: sample.AccAddress(),
						Id:      0,
					},
					{
						Creator: sample.AccAddress(),
						Id:      1,
					},
				},
				RepositoryCount: 2,

				OrganizationList: []types.Organization{
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
				OrganizationCount: 2,

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
			desc: "duplicated repository",
			genState: &types.GenesisState{
				RepositoryList: []types.Repository{
					{
						Id: 0,
					},
					{
						Id: 0,
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
						Id: 0,
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
			desc: "duplicated organization",
			genState: &types.GenesisState{
				OrganizationList: []types.Organization{
					{
						Id: 0,
					},
					{
						Id: 0,
					},
				},
				OrganizationCount: 2,
			},
			valid: false,
		},
		{
			desc: "invalid organization count",
			genState: &types.GenesisState{
				OrganizationList: []types.Organization{
					{
						Id: 0,
					},
				},
				OrganizationCount: 0,
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
