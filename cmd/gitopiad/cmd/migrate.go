package cmd

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"time"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	"github.com/cosmos/cosmos-sdk/x/authz"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	crisistypes "github.com/cosmos/cosmos-sdk/x/crisis/types"
	distributiontypes "github.com/cosmos/cosmos-sdk/x/distribution/types"
	genutiltypes "github.com/cosmos/cosmos-sdk/x/genutil/types"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
	minttypes "github.com/cosmos/cosmos-sdk/x/mint/types"
	slashingtypes "github.com/cosmos/cosmos-sdk/x/slashing/types"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	ibctypes "github.com/cosmos/ibc-go/v2/modules/core/types"
	gitopiatypesv012 "github.com/gitopia/gitopia/x/gitopia/migrations/v012"
	gitopiatypes "github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/spf13/cobra"
	tmjson "github.com/tendermint/tendermint/libs/json"
	tmtypes "github.com/tendermint/tendermint/types"
)

const (
	flagGenesisTime   = "genesis-time"
	flagInitialHeight = "initial-height"
)

func contains(s []string, str string) bool {
	for _, v := range s {
		if v == str {
			return true
		}
	}

	return false
}

func migrateGitopiaGenesisTov013(gitopiaGenesisv012 gitopiatypesv012.GenesisState, gitopiaGenesis *gitopiatypes.GenesisState) {
	for i := range gitopiaGenesisv012.UserList {
		var repositories []*gitopiatypes.UserRepository
		var organizations []*gitopiatypes.UserOrganization

		for _, v012 := range gitopiaGenesisv012.UserList[i].Repositories {
			repositories = append(repositories,
				&gitopiatypes.UserRepository{
					Name: v012.Name,
					Id:   v012.Id,
				},
			)
		}

		for _, v012 := range gitopiaGenesisv012.UserList[i].Organizations {
			organizations = append(organizations,
				&gitopiatypes.UserOrganization{
					Name: v012.Name,
					Id:   v012.Id,
				},
			)
		}

		gitopiaGenesis.UserList = append(gitopiaGenesis.UserList,
			gitopiatypes.User{
				Creator:        gitopiaGenesisv012.UserList[i].Creator,
				Id:             gitopiaGenesisv012.UserList[i].Id,
				Name:           gitopiaGenesisv012.UserList[i].Name,
				Username:       gitopiaGenesisv012.UserList[i].Username,
				UsernameGithub: gitopiaGenesisv012.UserList[i].UsernameGithub,
				AvatarUrl:      gitopiaGenesisv012.UserList[i].AvatarUrl,
				Followers:      gitopiaGenesisv012.UserList[i].Followers,
				Following:      gitopiaGenesisv012.UserList[i].Following,
				Repositories:   repositories,
				Organizations:  organizations,
				StarredRepos:   gitopiaGenesisv012.UserList[i].StarredRepos,
				Subscriptions:  gitopiaGenesisv012.UserList[i].Subscriptions,
				Bio:            gitopiaGenesisv012.UserList[i].Bio,
				CreatedAt:      gitopiaGenesisv012.UserList[i].CreatedAt,
				UpdatedAt:      gitopiaGenesisv012.UserList[i].UpdatedAt,
			},
		)
	}

	for i := range gitopiaGenesisv012.OrganizationList {
		var repositories []*gitopiatypes.OrganizationRepository
		var members []*gitopiatypes.OrganizationMember

		for _, v012 := range gitopiaGenesisv012.OrganizationList[i].Repositories {
			repositories = append(repositories,
				&gitopiatypes.OrganizationRepository{
					Name: v012.Name,
					Id:   v012.Id,
				},
			)
		}

		for _, v012 := range gitopiaGenesisv012.OrganizationList[i].Members {
			members = append(members,
				&gitopiatypes.OrganizationMember{
					Id:   v012.Id,
					Role: gitopiatypes.OrganizationMember_Role(v012.Role),
				},
			)
		}

		gitopiaGenesis.OrganizationList = append(gitopiaGenesis.OrganizationList,
			gitopiatypes.Organization{
				Creator:      gitopiaGenesisv012.OrganizationList[i].Creator,
				Id:           gitopiaGenesisv012.OrganizationList[i].Id,
				Address:      gitopiaGenesisv012.OrganizationList[i].Address,
				Name:         gitopiaGenesisv012.OrganizationList[i].Name,
				AvatarUrl:    gitopiaGenesisv012.OrganizationList[i].AvatarUrl,
				Followers:    gitopiaGenesisv012.OrganizationList[i].Followers,
				Following:    gitopiaGenesisv012.OrganizationList[i].Following,
				Repositories: repositories,
				Teams:        gitopiaGenesisv012.OrganizationList[i].Teams,
				Members:      members,
				Location:     gitopiaGenesisv012.OrganizationList[i].Location,
				Website:      gitopiaGenesisv012.OrganizationList[i].Website,
				Verified:     gitopiaGenesisv012.OrganizationList[i].Verified,
				Description:  gitopiaGenesisv012.OrganizationList[i].Description,
				CreatedAt:    gitopiaGenesisv012.OrganizationList[i].CreatedAt,
				UpdatedAt:    gitopiaGenesisv012.OrganizationList[i].UpdatedAt,
			},
		)
	}

	for i := range gitopiaGenesisv012.RepositoryList {
		var branches []*gitopiatypes.RepositoryBranch
		var tags []*gitopiatypes.RepositoryTag
		var issues []*gitopiatypes.RepositoryIssue
		var pullRequests []*gitopiatypes.RepositoryPullRequest
		var labels []*gitopiatypes.RepositoryLabel
		var releases []*gitopiatypes.RepositoryRelease
		var collaborators []*gitopiatypes.RepositoryCollaborator

		for _, v012 := range gitopiaGenesisv012.RepositoryList[i].Branches {
			branches = append(branches,
				&gitopiatypes.RepositoryBranch{
					Name:          v012.Name,
					Sha:           v012.Sha,
					LastUpdatedAt: v012.LastUpdatedAt,
				},
			)
		}

		for _, v012 := range gitopiaGenesisv012.RepositoryList[i].Tags {
			tags = append(tags,
				&gitopiatypes.RepositoryTag{
					Name:          v012.Name,
					Sha:           v012.Sha,
					LastUpdatedAt: v012.LastUpdatedAt,
				},
			)
		}

		for _, v012 := range gitopiaGenesisv012.RepositoryList[i].Issues {
			issues = append(issues,
				&gitopiatypes.RepositoryIssue{
					Iid: v012.Iid,
					Id:  v012.Id,
				},
			)
		}

		for _, v012 := range gitopiaGenesisv012.RepositoryList[i].PullRequests {
			pullRequests = append(pullRequests,
				&gitopiatypes.RepositoryPullRequest{
					Iid: v012.Iid,
					Id:  v012.Id,
				},
			)
		}

		for _, v012 := range gitopiaGenesisv012.RepositoryList[i].Labels {
			labels = append(labels,
				&gitopiatypes.RepositoryLabel{
					Id:          v012.Id,
					Name:        v012.Name,
					Color:       v012.Color,
					Description: v012.Description,
				},
			)
		}

		for _, v012 := range gitopiaGenesisv012.RepositoryList[i].Releases {
			releases = append(releases,
				&gitopiatypes.RepositoryRelease{
					Id:      v012.Id,
					TagName: v012.TagName,
				},
			)
		}

		for _, v012 := range gitopiaGenesisv012.RepositoryList[i].Collaborators {
			collaborators = append(collaborators,
				&gitopiatypes.RepositoryCollaborator{
					Id:         v012.Id,
					Permission: gitopiatypes.RepositoryCollaborator_Permission(v012.Permission),
				},
			)
		}

		gitopiaGenesis.RepositoryList = append(gitopiaGenesis.RepositoryList,
			gitopiatypes.Repository{
				Creator: gitopiaGenesisv012.RepositoryList[i].Creator,
				Id:      gitopiaGenesisv012.RepositoryList[i].Id,
				Name:    gitopiaGenesisv012.RepositoryList[i].Name,
				Owner: &gitopiatypes.RepositoryOwner{
					Id:   gitopiaGenesisv012.RepositoryList[i].Owner.Id,
					Type: gitopiatypes.RepositoryOwner_Type(gitopiaGenesisv012.RepositoryList[i].Owner.Type),
				},
				Description:   gitopiaGenesisv012.RepositoryList[i].Description,
				Forks:         gitopiaGenesisv012.RepositoryList[i].Forks,
				Branches:      branches,
				Tags:          tags,
				Subscribers:   gitopiaGenesisv012.RepositoryList[i].Subscribers,
				Commits:       gitopiaGenesisv012.RepositoryList[i].Commits,
				Issues:        issues,
				PullRequests:  pullRequests,
				IssuesCount:   gitopiaGenesisv012.RepositoryList[i].IssuesCount,
				PullsCount:    gitopiaGenesisv012.RepositoryList[i].PullsCount,
				Labels:        labels,
				LabelsCount:   gitopiaGenesisv012.RepositoryList[i].LabelsCount,
				Releases:      releases,
				CreatedAt:     gitopiaGenesisv012.RepositoryList[i].CreatedAt,
				UpdatedAt:     gitopiaGenesisv012.RepositoryList[i].UpdatedAt,
				PushedAt:      gitopiaGenesisv012.RepositoryList[i].PushedAt,
				Stargazers:    gitopiaGenesisv012.RepositoryList[i].Stargazers,
				Archived:      gitopiaGenesisv012.RepositoryList[i].Archived,
				License:       gitopiaGenesisv012.RepositoryList[i].License,
				DefaultBranch: gitopiaGenesisv012.RepositoryList[i].DefaultBranch,
				Parent:        gitopiaGenesisv012.RepositoryList[i].Parent,
				Fork:          gitopiaGenesisv012.RepositoryList[i].Fork,
				Collaborators: collaborators,
				AllowForking:  gitopiaGenesisv012.RepositoryList[i].AllowForking,
			},
		)
	}

	for i := range gitopiaGenesisv012.IssueList {
		gitopiaGenesis.IssueList = append(gitopiaGenesis.IssueList,
			gitopiatypes.Issue{
				Creator:       gitopiaGenesisv012.IssueList[i].Creator,
				Id:            gitopiaGenesisv012.IssueList[i].Id,
				Iid:           gitopiaGenesisv012.IssueList[i].Iid,
				Title:         gitopiaGenesisv012.IssueList[i].Title,
				State:         gitopiatypes.Issue_State(gitopiaGenesisv012.IssueList[i].State),
				Description:   gitopiaGenesisv012.IssueList[i].Description,
				Comments:      gitopiaGenesisv012.IssueList[i].Comments,
				CommentsCount: gitopiaGenesisv012.IssueList[i].CommentsCount,
				PullRequests:  gitopiaGenesisv012.IssueList[i].PullRequests,
				RepositoryId:  gitopiaGenesisv012.IssueList[i].RepositoryId,
				Labels:        gitopiaGenesisv012.IssueList[i].Labels,
				Weight:        gitopiaGenesisv012.IssueList[i].Weight,
				Assignees:     gitopiaGenesisv012.IssueList[i].Assignees,
				CreatedAt:     gitopiaGenesisv012.IssueList[i].CreatedAt,
				UpdatedAt:     gitopiaGenesisv012.IssueList[i].UpdatedAt,
				ClosedAt:      gitopiaGenesisv012.IssueList[i].ClosedAt,
				ClosedBy:      gitopiaGenesisv012.IssueList[i].ClosedBy,
			},
		)
	}

	for i := range gitopiaGenesisv012.PullRequestList {
		gitopiaGenesis.PullRequestList = append(gitopiaGenesis.PullRequestList,
			gitopiatypes.PullRequest{
				Creator:             gitopiaGenesisv012.PullRequestList[i].Creator,
				Id:                  gitopiaGenesisv012.PullRequestList[i].Id,
				Iid:                 gitopiaGenesisv012.PullRequestList[i].Iid,
				Title:               gitopiaGenesisv012.PullRequestList[i].Title,
				State:               gitopiatypes.PullRequest_State(gitopiaGenesisv012.PullRequestList[i].State),
				Description:         gitopiaGenesisv012.PullRequestList[i].Description,
				Locked:              gitopiaGenesisv012.PullRequestList[i].Locked,
				Comments:            gitopiaGenesisv012.PullRequestList[i].Comments,
				CommentsCount:       gitopiaGenesisv012.PullRequestList[i].CommentsCount,
				Issues:              gitopiaGenesisv012.PullRequestList[i].Issues,
				Labels:              gitopiaGenesisv012.PullRequestList[i].Labels,
				Assignees:           gitopiaGenesisv012.PullRequestList[i].Assignees,
				Reviewers:           gitopiaGenesisv012.PullRequestList[i].Reviewers,
				Draft:               gitopiaGenesisv012.PullRequestList[i].Draft,
				CreatedAt:           gitopiaGenesisv012.PullRequestList[i].CreatedAt,
				UpdatedAt:           gitopiaGenesisv012.PullRequestList[i].UpdatedAt,
				ClosedAt:            gitopiaGenesisv012.PullRequestList[i].ClosedAt,
				ClosedBy:            gitopiaGenesisv012.PullRequestList[i].ClosedBy,
				MergedAt:            gitopiaGenesisv012.PullRequestList[i].MergedAt,
				MergedBy:            gitopiaGenesisv012.PullRequestList[i].MergedBy,
				MergeCommitSha:      gitopiaGenesisv012.PullRequestList[i].MergeCommitSha,
				MaintainerCanModify: gitopiaGenesisv012.PullRequestList[i].MaintainerCanModify,
				Head: &gitopiatypes.PullRequestHead{
					RepositoryId: gitopiaGenesisv012.PullRequestList[i].Head.RepositoryId,
					Branch:       gitopiaGenesisv012.PullRequestList[i].Head.Branch,
					CommitSha:    gitopiaGenesisv012.PullRequestList[i].Head.CommitSha,
				},
				Base: &gitopiatypes.PullRequestBase{
					RepositoryId: gitopiaGenesisv012.PullRequestList[i].Base.RepositoryId,
					Branch:       gitopiaGenesisv012.PullRequestList[i].Base.Branch,
					CommitSha:    gitopiaGenesisv012.PullRequestList[i].Base.CommitSha,
				},
			},
		)
	}

	for i := range gitopiaGenesisv012.CommentList {
		gitopiaGenesis.CommentList = append(gitopiaGenesis.CommentList,
			gitopiatypes.Comment{
				Creator:           gitopiaGenesisv012.CommentList[i].Creator,
				Id:                gitopiaGenesisv012.CommentList[i].Id,
				ParentId:          gitopiaGenesisv012.CommentList[i].ParentId,
				CommentIid:        gitopiaGenesisv012.CommentList[i].CommentIid,
				Body:              gitopiaGenesisv012.CommentList[i].Body,
				Attachments:       gitopiaGenesisv012.CommentList[i].Attachments,
				DiffHunk:          gitopiaGenesisv012.CommentList[i].DiffHunk,
				Path:              gitopiaGenesisv012.CommentList[i].Path,
				System:            gitopiaGenesisv012.CommentList[i].System,
				AuthorAssociation: gitopiaGenesisv012.CommentList[i].AuthorAssociation,
				CreatedAt:         gitopiaGenesisv012.CommentList[i].CreatedAt,
				UpdatedAt:         gitopiaGenesisv012.CommentList[i].UpdatedAt,
				CommentType:       gitopiatypes.Comment_Type(gitopiaGenesisv012.CommentList[i].CommentType),
			},
		)
	}

	for i := range gitopiaGenesisv012.ReleaseList {
		var attachments []*gitopiatypes.Attachment

		for _, v012 := range gitopiaGenesisv012.ReleaseList[i].Attachments {
			attachments = append(attachments,
				&gitopiatypes.Attachment{
					Name:     v012.Name,
					Size_:    v012.Size_,
					Sha:      v012.Sha,
					Uploader: v012.Uploader,
				},
			)
		}

		gitopiaGenesis.ReleaseList = append(gitopiaGenesis.ReleaseList,
			gitopiatypes.Release{
				Creator:      gitopiaGenesisv012.ReleaseList[i].Creator,
				Id:           gitopiaGenesisv012.ReleaseList[i].Id,
				RepositoryId: gitopiaGenesisv012.ReleaseList[i].RepositoryId,
				TagName:      gitopiaGenesisv012.ReleaseList[i].TagName,
				Target:       gitopiaGenesisv012.ReleaseList[i].Target,
				Name:         gitopiaGenesisv012.ReleaseList[i].Name,
				Description:  gitopiaGenesisv012.ReleaseList[i].Description,
				Attachments:  attachments,
				Draft:        gitopiaGenesisv012.ReleaseList[i].Draft,
				PreRelease:   gitopiaGenesisv012.ReleaseList[i].PreRelease,
				IsTag:        gitopiaGenesisv012.ReleaseList[i].IsTag,
				CreatedAt:    gitopiaGenesisv012.ReleaseList[i].CreatedAt,
				UpdatedAt:    gitopiaGenesisv012.ReleaseList[i].UpdatedAt,
				PublishedAt:  gitopiaGenesisv012.ReleaseList[i].PublishedAt,
			},
		)
	}

	for i := range gitopiaGenesisv012.WhoisList {
		gitopiaGenesis.WhoisList = append(gitopiaGenesis.WhoisList,
			gitopiatypes.Whois{
				Creator: gitopiaGenesisv012.WhoisList[i].Creator,
				Name:    gitopiaGenesisv012.WhoisList[i].Name,
				Address: gitopiaGenesisv012.WhoisList[i].Address,
			},
		)
	}

	gitopiaGenesis.ReleaseCount = gitopiaGenesisv012.ReleaseCount
	gitopiaGenesis.PullRequestCount = gitopiaGenesisv012.PullRequestCount
	gitopiaGenesis.OrganizationCount = gitopiaGenesisv012.OrganizationCount
	gitopiaGenesis.CommentCount = gitopiaGenesisv012.CommentCount
	gitopiaGenesis.IssueCount = gitopiaGenesisv012.IssueCount
	gitopiaGenesis.RepositoryCount = gitopiaGenesisv012.RepositoryCount
	gitopiaGenesis.UserCount = gitopiaGenesisv012.UserCount
	gitopiaGenesis.WhoisCount = gitopiaGenesisv012.WhoisCount
}

func MigrateCmd() *cobra.Command {
	cmd := cobra.Command{
		Use:   "migrate-denom [genesis-file]",
		Short: "Migrate Genesis file",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			var ctx = client.GetClientContextFromCmd(cmd)

			blob, err := ioutil.ReadFile(args[0])
			if err != nil {
				return err
			}

			chainID, err := cmd.Flags().GetString(flags.FlagChainID)
			if err != nil {
				return err
			}

			genesisTime, err := cmd.Flags().GetString(flagGenesisTime)
			if err != nil {
				return err
			}

			initialHeight, err := cmd.Flags().GetInt64(flagInitialHeight)
			if err != nil {
				return err
			}

			genesis, err := tmtypes.GenesisDocFromJSON(blob)
			if err != nil {
				return err
			}

			var state genutiltypes.AppMap
			if err := json.Unmarshal(genesis.AppState, &state); err != nil {
				return err
			}

			var (
				authGenesis        authtypes.GenesisState
				bankGenesis        banktypes.GenesisState
				crisisGenesis      crisistypes.GenesisState
				govGenesis         govtypes.GenesisState
				mintGenesis        minttypes.GenesisState
				ibcGenesis         ibctypes.GenesisState
				gitopiaGenesis     gitopiatypes.GenesisState
				gitopiaGenesisv012 gitopiatypesv012.GenesisState
			)

			ctx.Codec.MustUnmarshalJSON(state[authtypes.ModuleName], &authGenesis)
			ctx.Codec.MustUnmarshalJSON(state[banktypes.ModuleName], &bankGenesis)
			ctx.Codec.MustUnmarshalJSON(state[crisistypes.ModuleName], &crisisGenesis)
			ctx.Codec.MustUnmarshalJSON(state[govtypes.ModuleName], &govGenesis)
			ctx.Codec.MustUnmarshalJSON(state[minttypes.ModuleName], &mintGenesis)
			ctx.Codec.MustUnmarshalJSON(state["ibc"], &ibcGenesis)
			ctx.Codec.MustUnmarshalJSON(state[gitopiatypes.ModuleName], &gitopiaGenesisv012)

			migrateGitopiaGenesisTov013(gitopiaGenesisv012, &gitopiaGenesis)

			var baseAccounts []*codectypes.Any
			var moduleAccounts []string
			for i := range authGenesis.Accounts {
				if authGenesis.Accounts[i].TypeUrl == "/cosmos.auth.v1beta1.BaseAccount" {
					acc := authGenesis.Accounts[i].GetCachedValue().(authtypes.AccountI)
					err = acc.SetSequence(0)
					if err != nil {
						return err
					}
					accAny, err := codectypes.NewAnyWithValue(acc)
					if err != nil {
						return err
					}
					baseAccounts = append(baseAccounts, accAny)
				} else {
					moduleAccounts = append(moduleAccounts, string(authGenesis.Accounts[i].GetCachedValue().(authtypes.AccountI).GetAddress().String()))
				}
			}
			authGenesis.Accounts = baseAccounts

			bankGenesis.DenomMetadata = []banktypes.Metadata{
				{
					Description: "The native staking token of the Gitopia Hub.",
					DenomUnits: []*banktypes.DenomUnit{
						{Denom: "utlore", Exponent: uint32(0), Aliases: []string{"microtlore"}},
						{Denom: "tlore", Exponent: uint32(6), Aliases: []string{}},
					},
					Base:    "utlore",
					Display: "tlore",
					Name:    "tlore",
					Symbol:  "tlore",
				},
			}

			totalBalance := sdk.NewInt(0)

			var balances []banktypes.Balance
			for _, balance := range bankGenesis.Balances {
				if contains(moduleAccounts, balance.Address) {
					continue
				}
				for j := range balance.Coins {
					if balance.Coins[j].Denom == "tlore" {
						balance.Coins[j].Denom = "utlore"
						// bankGenesis.Balances[i].Coins[j].Amount = bankGenesis.Balances[i].Coins[j].Amount.Mul(sdk.NewInt(1000000))
						totalBalance = totalBalance.Add(balance.Coins[j].Amount)
					}
				}
				balances = append(balances, balance)
			}

			bankGenesis.Balances = balances

			// fmt.Fprintln(os.Stderr, "total", totalBalance.String())

			bankGenesis.Supply[0].Denom = "utlore"
			bankGenesis.Supply[0].Amount = totalBalance

			crisisGenesis.ConstantFee.Denom = "utlore"

			// govGenesis.DepositParams.MinDeposit[0].Amount = govGenesis.DepositParams.MinDeposit[0].Amount.Mul(sdk.NewInt(10000))
			govGenesis.DepositParams.MinDeposit[0].Denom = "utlore"

			mintGenesis.Params.MintDenom = "utlore"

			ibcGenesis.ConnectionGenesis.Params.MaxExpectedTimePerBlock = 30000000000

			var (
				distributionGenesis = distributiontypes.DefaultGenesisState()
				slashingGenesis     = slashingtypes.DefaultGenesisState()
				genutilGenesis      = genutiltypes.DefaultGenesisState()
				stakingGenesis      = stakingtypes.DefaultGenesisState()
				authzGenesis        = authz.DefaultGenesisState()
			)

			stakingGenesis.Params.BondDenom = "utlore"

			state[authtypes.ModuleName] = ctx.Codec.MustMarshalJSON(&authGenesis)
			state[banktypes.ModuleName] = ctx.Codec.MustMarshalJSON(&bankGenesis)
			state[crisistypes.ModuleName] = ctx.Codec.MustMarshalJSON(&crisisGenesis)
			state[govtypes.ModuleName] = ctx.Codec.MustMarshalJSON(&govGenesis)
			state[distributiontypes.ModuleName] = ctx.Codec.MustMarshalJSON(distributionGenesis)
			state[minttypes.ModuleName] = ctx.Codec.MustMarshalJSON(&mintGenesis)
			state[slashingtypes.ModuleName] = ctx.Codec.MustMarshalJSON(slashingGenesis)
			state[genutiltypes.ModuleName] = ctx.Codec.MustMarshalJSON(genutilGenesis)
			state[stakingtypes.ModuleName] = ctx.Codec.MustMarshalJSON(stakingGenesis)
			state["ibc"] = ctx.Codec.MustMarshalJSON(&ibcGenesis)
			state[authz.ModuleName] = ctx.Codec.MustMarshalJSON(authzGenesis)
			state[gitopiatypes.ModuleName] = ctx.Codec.MustMarshalJSON(&gitopiaGenesis)

			genesis.AppState, err = json.Marshal(state)
			if err != nil {
				return err
			}

			if genesisTime != "" {
				var t time.Time
				if err := t.UnmarshalText([]byte(genesisTime)); err != nil {
					return err
				}

				genesis.GenesisTime = t
			}
			if chainID != "" {
				genesis.ChainID = chainID
			}

			genesis.InitialHeight = initialHeight

			genesis.Validators = []tmtypes.GenesisValidator{}

			blob, err = tmjson.Marshal(genesis)
			if err != nil {
				return err
			}

			// sortedBlob, err := sdk.SortJSON(blob)
			// if err != nil {
			// 	return err
			// }

			fmt.Println(string(blob))
			return nil
		},
	}

	cmd.Flags().String(flags.FlagChainID, "", "set chain id")
	cmd.Flags().String(flagGenesisTime, "", "set genesis time")
	cmd.Flags().Int64(flagInitialHeight, 1, "set the initial height")

	return &cmd
}
