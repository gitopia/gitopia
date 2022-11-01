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
	govv046 "github.com/cosmos/cosmos-sdk/x/gov/migrations/v046"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
	govv1beta1 "github.com/cosmos/cosmos-sdk/x/gov/types/v1beta1"
	"github.com/cosmos/cosmos-sdk/x/group"
	minttypes "github.com/cosmos/cosmos-sdk/x/mint/types"
	slashingtypes "github.com/cosmos/cosmos-sdk/x/slashing/types"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	ibctypes "github.com/cosmos/ibc-go/v5/modules/core/types"
	"github.com/gitopia/gitopia/x/gitopia/keeper"
	gitopiatypesv013 "github.com/gitopia/gitopia/x/gitopia/migrations/v013"
	gitopiatypes "github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/spf13/cobra"
	tmjson "github.com/tendermint/tendermint/libs/json"
	tmtypes "github.com/tendermint/tendermint/types"
)

const (
	flagGenesisTime   = "genesis-time"
	flagInitialHeight = "initial-height"
)

// Map used to translate legacy dao address to new dao address
var newDaoAddressMap map[string]string

func contains(s []string, str string) bool {
	for _, v := range s {
		if v == str {
			return true
		}
	}

	return false
}

func migrateGitopiaGenesisTov014(gitopiaGenesisv013 gitopiatypesv013.GenesisState, gitopiaGenesis *gitopiatypes.GenesisState) {
	var memberCount uint64
	var branchCount uint64
	var tagCount uint64
	newDaoAddressMap = make(map[string]string)

	// Migrate Dao
	for i := range gitopiaGenesisv013.OrganizationList {
		legacyDaoAddress := gitopiaGenesisv013.OrganizationList[i].Address
		newDaoAddress := keeper.NewDaoAddress(gitopiaGenesisv013.OrganizationList[i].Id)
		newDaoAddressMap[legacyDaoAddress] = newDaoAddress.String()

		dao := gitopiatypes.Dao{
			Creator:     gitopiaGenesisv013.OrganizationList[i].Creator,
			Id:          gitopiaGenesisv013.OrganizationList[i].Id,
			Address:     newDaoAddress.String(),
			Name:        fmt.Sprintf("temp-%s-%s", gitopiaGenesisv013.OrganizationList[i].Name, gitopiaGenesisv013.OrganizationList[i].Address),
			AvatarUrl:   gitopiaGenesisv013.OrganizationList[i].AvatarUrl,
			Followers:   gitopiaGenesisv013.OrganizationList[i].Followers,
			Following:   gitopiaGenesisv013.OrganizationList[i].Following,
			Teams:       gitopiaGenesisv013.OrganizationList[i].Teams,
			Location:    gitopiaGenesisv013.OrganizationList[i].Location,
			Website:     gitopiaGenesisv013.OrganizationList[i].Website,
			Verified:    gitopiaGenesisv013.OrganizationList[i].Verified,
			Description: gitopiaGenesisv013.OrganizationList[i].Description,
			CreatedAt:   gitopiaGenesisv013.OrganizationList[i].CreatedAt,
			UpdatedAt:   gitopiaGenesisv013.OrganizationList[i].UpdatedAt,
		}

		if legacyDaoAddress == "gitopia1dlpc7ps63kj5v0kn5v8eq9sn2n8v8r5z9jmwff" {
			// Set gitopia dao as verified
			dao.Name = "Gitopia"
			dao.Verified = true

			// Create a whois record for gitopia
			gitopiaGenesis.WhoisList = append(gitopiaGenesis.WhoisList, gitopiatypes.Whois{
				Creator:   gitopiaGenesisv013.OrganizationList[i].Creator,
				Name:      "gitopia",
				Address:   dao.Address,
				OwnerType: gitopiatypes.OwnerType_DAO,
			})
		}

		gitopiaGenesis.DaoList = append(gitopiaGenesis.DaoList,
			dao,
		)

		// Migrate Member
		for _, v013 := range gitopiaGenesisv013.OrganizationList[i].Members {
			var role gitopiatypes.MemberRole

			// Migrate UserDao
			gitopiaGenesis.UserDaoList = append(gitopiaGenesis.UserDaoList,
				gitopiatypes.UserDao{
					UserAddress: v013.Id,
					DaoAddress:  newDaoAddress.String(),
				},
			)

			if v013.Role == gitopiatypesv013.OrganizationMember_OWNER {
				role = gitopiatypes.MemberRole_OWNER
			} else {
				role = gitopiatypes.MemberRole_MEMBER
			}

			gitopiaGenesis.MemberList = append(gitopiaGenesis.MemberList,
				gitopiatypes.Member{
					Id:         memberCount,
					Address:    v013.Id,
					DaoAddress: newDaoAddress.String(),
					Role:       role,
				},
			)
			memberCount += 1
		}
	}

	// Migrate User
	for i := range gitopiaGenesisv013.UserList {
		gitopiaGenesis.UserList = append(gitopiaGenesis.UserList,
			gitopiatypes.User{
				Creator:        gitopiaGenesisv013.UserList[i].Creator,
				Id:             gitopiaGenesisv013.UserList[i].Id,
				Name:           gitopiaGenesisv013.UserList[i].Name,
				Username:       gitopiaGenesisv013.UserList[i].Username,
				UsernameGithub: gitopiaGenesisv013.UserList[i].UsernameGithub,
				AvatarUrl:      gitopiaGenesisv013.UserList[i].AvatarUrl,
				Followers:      gitopiaGenesisv013.UserList[i].Followers,
				Following:      gitopiaGenesisv013.UserList[i].Following,
				StarredRepos:   gitopiaGenesisv013.UserList[i].StarredRepos,
				Subscriptions:  gitopiaGenesisv013.UserList[i].Subscriptions,
				Bio:            gitopiaGenesisv013.UserList[i].Bio,
				CreatedAt:      gitopiaGenesisv013.UserList[i].CreatedAt,
				UpdatedAt:      gitopiaGenesisv013.UserList[i].UpdatedAt,
			},
		)
	}

	// Migrate Repository
	for i := range gitopiaGenesisv013.RepositoryList {
		var issues []*gitopiatypes.RepositoryIssue
		var pullRequests []*gitopiatypes.RepositoryPullRequest
		var labels []*gitopiatypes.RepositoryLabel
		var releases []*gitopiatypes.RepositoryRelease
		var collaborators []*gitopiatypes.RepositoryCollaborator
		var newDaoAddress string

		// Migrate BaseRepositoryKey

		// Fix wrong ownership
		if gitopiaGenesisv013.RepositoryList[i].Id == 30677 {
			gitopiaGenesisv013.RepositoryList[i].Owner.Id = "gitopia1hv6xd7mzz7r8vkpvy47khc89qzrrup7w6mxurk"
		}

		baseRepositoryKey := gitopiatypes.BaseRepositoryKey{
			Id:      gitopiaGenesisv013.RepositoryList[i].Id,
			Address: gitopiaGenesisv013.RepositoryList[i].Owner.Id,
			Name:    gitopiaGenesisv013.RepositoryList[i].Name,
		}

		// Change the address in case of dao
		if gitopiaGenesisv013.RepositoryList[i].Owner.Type == gitopiatypesv013.RepositoryOwner_ORGANIZATION {
			newDaoAddress = newDaoAddressMap[gitopiaGenesisv013.RepositoryList[i].Owner.Id]
			baseRepositoryKey.Address = newDaoAddress
		}

		gitopiaGenesis.BaseRepositoryKeyList = append(gitopiaGenesis.BaseRepositoryKeyList,
			baseRepositoryKey,
		)

		// Migrate Branch
		for _, v013 := range gitopiaGenesisv013.RepositoryList[i].Branches {
			gitopiaGenesis.BranchList = append(gitopiaGenesis.BranchList,
				gitopiatypes.Branch{
					Id:             branchCount,
					RepositoryId:   gitopiaGenesisv013.RepositoryList[i].Id,
					Name:           v013.Name,
					Sha:            v013.Sha,
					AllowForcePush: true,
					CreatedAt:      0,
					UpdatedAt:      0,
				},
			)
			branchCount += 1
		}

		// Migrate Tag
		for _, v013 := range gitopiaGenesisv013.RepositoryList[i].Tags {
			gitopiaGenesis.TagList = append(gitopiaGenesis.TagList,
				gitopiatypes.Tag{
					Id:           tagCount,
					RepositoryId: gitopiaGenesisv013.RepositoryList[i].Id,
					Name:         v013.Name,
					Sha:          v013.Sha,
					CreatedAt:    0,
					UpdatedAt:    0,
				},
			)
			tagCount += 1
		}

		for _, v013 := range gitopiaGenesisv013.RepositoryList[i].Issues {
			issues = append(issues,
				&gitopiatypes.RepositoryIssue{
					Iid: v013.Iid,
					Id:  v013.Id,
				},
			)
		}

		for _, v013 := range gitopiaGenesisv013.RepositoryList[i].PullRequests {
			pullRequests = append(pullRequests,
				&gitopiatypes.RepositoryPullRequest{
					Iid: v013.Iid,
					Id:  v013.Id,
				},
			)
		}

		for _, v013 := range gitopiaGenesisv013.RepositoryList[i].Labels {
			labels = append(labels,
				&gitopiatypes.RepositoryLabel{
					Id:          v013.Id,
					Name:        v013.Name,
					Color:       v013.Color,
					Description: v013.Description,
				},
			)
		}

		for _, v013 := range gitopiaGenesisv013.RepositoryList[i].Releases {
			releases = append(releases,
				&gitopiatypes.RepositoryRelease{
					Id:      v013.Id,
					TagName: v013.TagName,
				},
			)
		}

		for _, v013 := range gitopiaGenesisv013.RepositoryList[i].Collaborators {
			collaborators = append(collaborators,
				&gitopiatypes.RepositoryCollaborator{
					Id:         v013.Id,
					Permission: gitopiatypes.RepositoryCollaborator_Permission(v013.Permission),
				},
			)
		}

		repository := gitopiatypes.Repository{
			Creator:       gitopiaGenesisv013.RepositoryList[i].Creator,
			Id:            gitopiaGenesisv013.RepositoryList[i].Id,
			Name:          gitopiaGenesisv013.RepositoryList[i].Name,
			Description:   gitopiaGenesisv013.RepositoryList[i].Description,
			Forks:         gitopiaGenesisv013.RepositoryList[i].Forks,
			Subscribers:   gitopiaGenesisv013.RepositoryList[i].Subscribers,
			Commits:       gitopiaGenesisv013.RepositoryList[i].Commits,
			Issues:        issues,
			PullRequests:  pullRequests,
			IssuesCount:   gitopiaGenesisv013.RepositoryList[i].IssuesCount,
			PullsCount:    gitopiaGenesisv013.RepositoryList[i].PullsCount,
			Labels:        labels,
			LabelsCount:   gitopiaGenesisv013.RepositoryList[i].LabelsCount,
			Releases:      releases,
			CreatedAt:     gitopiaGenesisv013.RepositoryList[i].CreatedAt,
			UpdatedAt:     gitopiaGenesisv013.RepositoryList[i].UpdatedAt,
			PushedAt:      gitopiaGenesisv013.RepositoryList[i].PushedAt,
			Stargazers:    gitopiaGenesisv013.RepositoryList[i].Stargazers,
			Archived:      gitopiaGenesisv013.RepositoryList[i].Archived,
			License:       gitopiaGenesisv013.RepositoryList[i].License,
			DefaultBranch: gitopiaGenesisv013.RepositoryList[i].DefaultBranch,
			Parent:        gitopiaGenesisv013.RepositoryList[i].Parent,
			Fork:          gitopiaGenesisv013.RepositoryList[i].Fork,
			Collaborators: collaborators,
			AllowForking:  gitopiaGenesisv013.RepositoryList[i].AllowForking,
		}

		if gitopiaGenesisv013.RepositoryList[i].Owner.Type == gitopiatypesv013.RepositoryOwner_ORGANIZATION {
			repository.Owner = &gitopiatypes.RepositoryOwner{
				Type: gitopiatypes.OwnerType_DAO,
				Id:   newDaoAddress,
			}
		} else {
			repository.Owner = &gitopiatypes.RepositoryOwner{
				Type: gitopiatypes.OwnerType_USER,
				Id:   gitopiaGenesisv013.RepositoryList[i].Owner.Id,
			}
		}

		gitopiaGenesis.RepositoryList = append(gitopiaGenesis.RepositoryList,
			repository,
		)
	}

	// Migrate Issue
	for i := range gitopiaGenesisv013.IssueList {
		gitopiaGenesis.IssueList = append(gitopiaGenesis.IssueList,
			gitopiatypes.Issue{
				Creator:       gitopiaGenesisv013.IssueList[i].Creator,
				Id:            gitopiaGenesisv013.IssueList[i].Id,
				Iid:           gitopiaGenesisv013.IssueList[i].Iid,
				Title:         gitopiaGenesisv013.IssueList[i].Title,
				State:         gitopiatypes.Issue_State(gitopiaGenesisv013.IssueList[i].State),
				Description:   gitopiaGenesisv013.IssueList[i].Description,
				Comments:      gitopiaGenesisv013.IssueList[i].Comments,
				CommentsCount: gitopiaGenesisv013.IssueList[i].CommentsCount,
				PullRequests:  gitopiaGenesisv013.IssueList[i].PullRequests,
				RepositoryId:  gitopiaGenesisv013.IssueList[i].RepositoryId,
				Labels:        gitopiaGenesisv013.IssueList[i].Labels,
				Weight:        gitopiaGenesisv013.IssueList[i].Weight,
				Assignees:     gitopiaGenesisv013.IssueList[i].Assignees,
				CreatedAt:     gitopiaGenesisv013.IssueList[i].CreatedAt,
				UpdatedAt:     gitopiaGenesisv013.IssueList[i].UpdatedAt,
				ClosedAt:      gitopiaGenesisv013.IssueList[i].ClosedAt,
				ClosedBy:      gitopiaGenesisv013.IssueList[i].ClosedBy,
			},
		)
	}

	// Migrate PullRequest
	for i := range gitopiaGenesisv013.PullRequestList {
		gitopiaGenesis.PullRequestList = append(gitopiaGenesis.PullRequestList,
			gitopiatypes.PullRequest{
				Creator:             gitopiaGenesisv013.PullRequestList[i].Creator,
				Id:                  gitopiaGenesisv013.PullRequestList[i].Id,
				Iid:                 gitopiaGenesisv013.PullRequestList[i].Iid,
				Title:               gitopiaGenesisv013.PullRequestList[i].Title,
				State:               gitopiatypes.PullRequest_State(gitopiaGenesisv013.PullRequestList[i].State),
				Description:         gitopiaGenesisv013.PullRequestList[i].Description,
				Locked:              gitopiaGenesisv013.PullRequestList[i].Locked,
				Comments:            gitopiaGenesisv013.PullRequestList[i].Comments,
				CommentsCount:       gitopiaGenesisv013.PullRequestList[i].CommentsCount,
				Issues:              gitopiaGenesisv013.PullRequestList[i].Issues,
				Labels:              gitopiaGenesisv013.PullRequestList[i].Labels,
				Assignees:           gitopiaGenesisv013.PullRequestList[i].Assignees,
				Reviewers:           gitopiaGenesisv013.PullRequestList[i].Reviewers,
				Draft:               gitopiaGenesisv013.PullRequestList[i].Draft,
				CreatedAt:           gitopiaGenesisv013.PullRequestList[i].CreatedAt,
				UpdatedAt:           gitopiaGenesisv013.PullRequestList[i].UpdatedAt,
				ClosedAt:            gitopiaGenesisv013.PullRequestList[i].ClosedAt,
				ClosedBy:            gitopiaGenesisv013.PullRequestList[i].ClosedBy,
				MergedAt:            gitopiaGenesisv013.PullRequestList[i].MergedAt,
				MergedBy:            gitopiaGenesisv013.PullRequestList[i].MergedBy,
				MergeCommitSha:      gitopiaGenesisv013.PullRequestList[i].MergeCommitSha,
				MaintainerCanModify: gitopiaGenesisv013.PullRequestList[i].MaintainerCanModify,
				Head: &gitopiatypes.PullRequestHead{
					RepositoryId: gitopiaGenesisv013.PullRequestList[i].Head.RepositoryId,
					Branch:       gitopiaGenesisv013.PullRequestList[i].Head.Branch,
					CommitSha:    gitopiaGenesisv013.PullRequestList[i].Head.CommitSha,
				},
				Base: &gitopiatypes.PullRequestBase{
					RepositoryId: gitopiaGenesisv013.PullRequestList[i].Base.RepositoryId,
					Branch:       gitopiaGenesisv013.PullRequestList[i].Base.Branch,
					CommitSha:    gitopiaGenesisv013.PullRequestList[i].Base.CommitSha,
				},
			},
		)
	}

	// Migrate CommentList
	for i := range gitopiaGenesisv013.CommentList {
		gitopiaGenesis.CommentList = append(gitopiaGenesis.CommentList,
			gitopiatypes.Comment{
				Creator:           gitopiaGenesisv013.CommentList[i].Creator,
				Id:                gitopiaGenesisv013.CommentList[i].Id,
				ParentId:          gitopiaGenesisv013.CommentList[i].ParentId,
				CommentIid:        gitopiaGenesisv013.CommentList[i].CommentIid,
				Body:              gitopiaGenesisv013.CommentList[i].Body,
				Attachments:       gitopiaGenesisv013.CommentList[i].Attachments,
				DiffHunk:          gitopiaGenesisv013.CommentList[i].DiffHunk,
				Path:              gitopiaGenesisv013.CommentList[i].Path,
				System:            gitopiaGenesisv013.CommentList[i].System,
				AuthorAssociation: gitopiaGenesisv013.CommentList[i].AuthorAssociation,
				CreatedAt:         gitopiaGenesisv013.CommentList[i].CreatedAt,
				UpdatedAt:         gitopiaGenesisv013.CommentList[i].UpdatedAt,
				CommentType:       gitopiatypes.Comment_Type(gitopiaGenesisv013.CommentList[i].CommentType),
			},
		)
	}

	// Migrate Release
	for i := range gitopiaGenesisv013.ReleaseList {
		var attachments []*gitopiatypes.Attachment

		for _, v013 := range gitopiaGenesisv013.ReleaseList[i].Attachments {
			attachments = append(attachments,
				&gitopiatypes.Attachment{
					Name:     v013.Name,
					Size_:    v013.Size_,
					Sha:      v013.Sha,
					Uploader: v013.Uploader,
				},
			)
		}

		gitopiaGenesis.ReleaseList = append(gitopiaGenesis.ReleaseList,
			gitopiatypes.Release{
				Creator:      gitopiaGenesisv013.ReleaseList[i].Creator,
				Id:           gitopiaGenesisv013.ReleaseList[i].Id,
				RepositoryId: gitopiaGenesisv013.ReleaseList[i].RepositoryId,
				TagName:      gitopiaGenesisv013.ReleaseList[i].TagName,
				Target:       gitopiaGenesisv013.ReleaseList[i].Target,
				Name:         gitopiaGenesisv013.ReleaseList[i].Name,
				Description:  gitopiaGenesisv013.ReleaseList[i].Description,
				Attachments:  attachments,
				Draft:        gitopiaGenesisv013.ReleaseList[i].Draft,
				PreRelease:   gitopiaGenesisv013.ReleaseList[i].PreRelease,
				IsTag:        gitopiaGenesisv013.ReleaseList[i].IsTag,
				CreatedAt:    gitopiaGenesisv013.ReleaseList[i].CreatedAt,
				UpdatedAt:    gitopiaGenesisv013.ReleaseList[i].UpdatedAt,
				PublishedAt:  gitopiaGenesisv013.ReleaseList[i].PublishedAt,
			},
		)
	}

	// Migrate Task
	for i := range gitopiaGenesisv013.TaskList {
		gitopiaGenesis.TaskList = append(gitopiaGenesis.TaskList,
			gitopiatypes.Task{
				Id:       gitopiaGenesisv013.TaskList[i].Id,
				Type:     gitopiatypes.TaskType(gitopiaGenesisv013.TaskList[i].Type),
				State:    gitopiatypes.TaskState(gitopiaGenesisv013.TaskList[i].State),
				Message:  gitopiaGenesisv013.TaskList[i].Message,
				Creator:  gitopiaGenesisv013.TaskList[i].Creator,
				Provider: gitopiaGenesisv013.TaskList[i].Provider,
			},
		)
	}

	// Set Count
	gitopiaGenesis.WhoisCount = 1
	gitopiaGenesis.UserCount = gitopiaGenesisv013.UserCount
	gitopiaGenesis.DaoCount = gitopiaGenesisv013.OrganizationCount
	gitopiaGenesis.MemberCount = memberCount
	gitopiaGenesis.RepositoryCount = gitopiaGenesisv013.RepositoryCount
	gitopiaGenesis.BranchCount = branchCount
	gitopiaGenesis.TagCount = tagCount
	gitopiaGenesis.IssueCount = gitopiaGenesisv013.IssueCount
	gitopiaGenesis.PullRequestCount = gitopiaGenesisv013.PullRequestCount
	gitopiaGenesis.CommentCount = gitopiaGenesisv013.CommentCount
	gitopiaGenesis.ReleaseCount = gitopiaGenesisv013.ReleaseCount
	gitopiaGenesis.TaskCount = gitopiaGenesisv013.TaskCount
}

func MigrateCmd() *cobra.Command {
	cmd := cobra.Command{
		Use:   "migrate-kv-store [genesis-file]",
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
				govGenesis         govv1beta1.GenesisState
				mintGenesis        minttypes.GenesisState
				ibcGenesis         ibctypes.GenesisState
				gitopiaGenesis     gitopiatypes.GenesisState
				gitopiaGenesisv013 gitopiatypesv013.GenesisState
			)

			ctx.Codec.MustUnmarshalJSON(state[authtypes.ModuleName], &authGenesis)
			ctx.Codec.MustUnmarshalJSON(state[banktypes.ModuleName], &bankGenesis)
			ctx.Codec.MustUnmarshalJSON(state[crisistypes.ModuleName], &crisisGenesis)
			ctx.Codec.MustUnmarshalJSON(state[govtypes.ModuleName], &govGenesis)
			ctx.Codec.MustUnmarshalJSON(state[minttypes.ModuleName], &mintGenesis)
			ctx.Codec.MustUnmarshalJSON(state["ibc"], &ibcGenesis)
			ctx.Codec.MustUnmarshalJSON(state[gitopiatypes.ModuleName], &gitopiaGenesisv013)

			migrateGitopiaGenesisTov014(gitopiaGenesisv013, &gitopiaGenesis)

			// Migrate govv1beta1 genesis to govv1 genesis
			migratedGovGenesis, _ := govv046.MigrateJSON(&govGenesis)

			twoDays := 2 * 24 * time.Hour
			migratedGovGenesis.DepositParams.MaxDepositPeriod = &twoDays
			migratedGovGenesis.VotingParams.VotingPeriod = &twoDays

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

			// Transfer dao address balance
			for i := range bankGenesis.Balances {
				if newAddress, found := newDaoAddressMap[bankGenesis.Balances[i].Address]; found {
					bankGenesis.Balances[i].Address = newAddress
				}
			}

			totalBalance := sdk.NewInt(0)

			var balances []banktypes.Balance
			for _, balance := range bankGenesis.Balances {
				if contains(moduleAccounts, balance.Address) {
					continue
				}
				for j := range balance.Coins {
					if balance.Coins[j].Denom == "utlore" {
						totalBalance = totalBalance.Add(balance.Coins[j].Amount)
						break
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
				groupGenesis        = group.NewGenesisState()
			)

			stakingGenesis.Params.BondDenom = "utlore"

			state[authtypes.ModuleName] = ctx.Codec.MustMarshalJSON(&authGenesis)
			state[banktypes.ModuleName] = ctx.Codec.MustMarshalJSON(&bankGenesis)
			state[crisistypes.ModuleName] = ctx.Codec.MustMarshalJSON(&crisisGenesis)
			state[govtypes.ModuleName] = ctx.Codec.MustMarshalJSON(migratedGovGenesis)
			state[distributiontypes.ModuleName] = ctx.Codec.MustMarshalJSON(distributionGenesis)
			state[minttypes.ModuleName] = ctx.Codec.MustMarshalJSON(&mintGenesis)
			state[slashingtypes.ModuleName] = ctx.Codec.MustMarshalJSON(slashingGenesis)
			state[genutiltypes.ModuleName] = ctx.Codec.MustMarshalJSON(genutilGenesis)
			state[stakingtypes.ModuleName] = ctx.Codec.MustMarshalJSON(stakingGenesis)
			state["ibc"] = ctx.Codec.MustMarshalJSON(&ibcGenesis)
			state[authz.ModuleName] = ctx.Codec.MustMarshalJSON(authzGenesis)
			state[gitopiatypes.ModuleName] = ctx.Codec.MustMarshalJSON(&gitopiaGenesis)
			state[group.ModuleName] = ctx.Codec.MustMarshalJSON(groupGenesis)

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
