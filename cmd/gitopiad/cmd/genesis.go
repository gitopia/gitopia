package cmd

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"

	"cosmossdk.io/math"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	authvesting "github.com/cosmos/cosmos-sdk/x/auth/vesting/types"
	"github.com/cosmos/cosmos-sdk/x/authz"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	capabilitytypes "github.com/cosmos/cosmos-sdk/x/capability/types"
	crisistypes "github.com/cosmos/cosmos-sdk/x/crisis/types"
	distributiontypes "github.com/cosmos/cosmos-sdk/x/distribution/types"
	evidencetypes "github.com/cosmos/cosmos-sdk/x/evidence/types"
	feegranttypes "github.com/cosmos/cosmos-sdk/x/feegrant"
	genutiltypes "github.com/cosmos/cosmos-sdk/x/genutil/types"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
	govv1types "github.com/cosmos/cosmos-sdk/x/gov/types/v1"
	"github.com/cosmos/cosmos-sdk/x/group"
	minttypes "github.com/cosmos/cosmos-sdk/x/mint/types"
	slashingtypes "github.com/cosmos/cosmos-sdk/x/slashing/types"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	ibchost "github.com/cosmos/ibc-go/v5/modules/core/24-host"
	ibctypes "github.com/cosmos/ibc-go/v5/modules/core/types"
	"github.com/gitopia/gitopia/app/params"
	"github.com/gitopia/gitopia/x/gitopia/keeper"
	testnettypes "github.com/gitopia/gitopia/x/gitopia/migrations/testnet/types"
	v2types "github.com/gitopia/gitopia/x/gitopia/migrations/v2/types"
	gitopiatypes "github.com/gitopia/gitopia/x/gitopia/types"
	rewardstypes "github.com/gitopia/gitopia/x/rewards/types"
	"github.com/spf13/cobra"
	tmjson "github.com/tendermint/tendermint/libs/json"
	tmtypes "github.com/tendermint/tendermint/types"
)

const (
	flagGenesisTime   = "genesis-time"
	flagInitialHeight = "initial-height"
)

const (
	rewardsServiceAddress            = "gitopia1r7mhw4f6x73lap55st3yxn4u7tj4yt6qqwmlv5"
	strategicReserveAddress1         = "gitopia1ryv3840cdfjhknqrjkvuhyn6h4zylwvq9ekdv9"
	strategicReserveAddress2         = "gitopia12lehgzv7w7k8x0vwu9nsu9fvj9e80evhsu3jpf"
	strategicReserveAddress3         = "gitopia17505m7wwzh28sf6dud2a8rd8qztlp4xvz5nqca"
	strategicReserveAddress4         = "gitopia17urengx7kxrsche82cfxu3qutxnng97k04vy9a"
	strategicReserveAddress5         = "gitopia1hcq6ejnxmsxaqpee7vh7mqjysgw2kp8sf4g4xm"
	feegrantsAddress                 = "gitopia13ashgc6j5xle4m47kqyn5psavq0u3klmscfxql"
	earlySupportersMultiSigAddress   = "gitopia1l8d76cnr6z5f02unp3hqayccqg789d9u0knxce"
	strategicPartnersMultiSigAddress = "gitopia1mqltrqxy9p96lnehksxqgr0ma062zmklcqh2mj"
	advisorsMultiSigAddress          = "gitopia1v43v8rhvk545fanfunpvn89anlf0zd9p7zwt34"
	teamMultiSigAddress              = "gitopia199540csqt8wllnjcdgx5466gmc3jxxy9d8tgm9"
	airdropMultiSigAddress           = "gitopia1jt78ze9c89lq43vkv2msf4vue3am07dfr9nglj"
)

const (
	STRATEGIC_PARTNERS_AMOUNT = 51_071_429_000_000
	ADVISORS_AMOUNT           = 10_000_000_000_000
	AIRDROP_AMOUNT            = 50_407_937_671_500 // Chains & bounties airdrop + GOL delegation: 407937.671500 LORE
)

const (
	VESTING_PERIOD_SECONDS = 86400 * 30 * 2 // 2 months
)

var (
	GENESIS_TIME       = time.Date(2023, 5, 17, 17, 5, 17, 517517517, time.UTC)
	VESTING_START_TIME = GENESIS_TIME.AddDate(1, 0, 0).Unix()
)

func createEarlySupporterVestingAccount(address string, tokens int64) *authvesting.PeriodicVestingAccount {
	addr, _ := sdk.AccAddressFromBech32(address)
	baseAccount := authtypes.NewBaseAccountWithAddress(addr)

	var periods []authvesting.Period

	vestedTokens := math.NewInt(tokens).Mul(math.NewInt(5)).Quo(math.NewInt(100))

	for i := 0; i < 20; i++ {
		periods = append(periods, authvesting.Period{
			Length: int64(VESTING_PERIOD_SECONDS),
			Amount: sdk.NewCoins(sdk.NewCoin(params.BaseCoinUnit, vestedTokens)),
		})
	}

	vestingAccount := authvesting.NewPeriodicVestingAccount(baseAccount,
		sdk.Coins{sdk.NewCoin(params.BaseCoinUnit, math.NewInt(tokens))},
		VESTING_START_TIME,
		periods,
	)

	return vestingAccount
}

func normalizeRepoName(name string) string {
	return strings.ToLower(name)
}

func newAnyAuthorization(a authz.Authorization) *codectypes.Any {
	any, err := codectypes.NewAnyWithValue(a)
	if err != nil {
		panic(err)
	}

	return any
}

func resolveRepoNameConflict(name string, repoNameMap map[string]int) string {
	normalizedRepoName := normalizeRepoName(name)
	count := repoNameMap[normalizedRepoName]
	if count > 0 {
		name = fmt.Sprintf("%s-%d", name, count)
	}
	repoNameMap[normalizedRepoName]++
	return name
}

// migrateTestnetState performs type migrations from v1.2.0 to v1.4.0. The
// migration includes:
//
// - Removed `issues` and `pullRequests` from Repository.
// - Add `repositoryId` in Comment and Bounty.
// - Modified comment structure - Parent: issue and pull; various comment types like label, assignees etc; reactions; replies; resolved/unresolved
func migrateTestnetState(state testnettypes.GenesisState) (v2types.GenesisState, error) {
	var genesisState v2types.GenesisState

	genesisState.Params = v2types.Params{
		NextInflationTime: GENESIS_TIME.AddDate(2, 0, 0),
		PoolProportions: v2types.PoolProportions{
			Ecosystem: &v2types.DistributionProportion{Proportion: sdk.MustNewDecFromStr("30.0")},
			Team:      &v2types.DistributionProportion{Proportion: sdk.MustNewDecFromStr("28.0")},
		},
		TeamProportions: []v2types.DistributionProportion{
			{Proportion: sdk.MustNewDecFromStr("35.0"), Address: "gitopia1z5yl2nk5lp0czd965qg9xs9z45ymr305f4vhpg"},
			{Proportion: sdk.MustNewDecFromStr("35.0"), Address: "gitopia14t0ta8vvv2nrcx86g87z888s7pqat4svuyw7ae"},
			{Proportion: sdk.MustNewDecFromStr("12.5"), Address: "gitopia1gyldx4ysv8u97v7rnjuw06sq35d8khmvn28d9n"},
			{Proportion: sdk.MustNewDecFromStr("2.0"), Address: "gitopia1ps5vrjmhtrkyxrge7d0fwvzsf02lq49wq3xeau"},
			{Proportion: sdk.MustNewDecFromStr("2.0"), Address: "gitopia1g0nvcrrd59zef2r9jt56jvut3gf6040svuveaa"},
			{Proportion: sdk.MustNewDecFromStr("2.0"), Address: "gitopia1kcnhjh9fkcc2w74g20s8edu6ue2eyamd3aqees"},
			{Proportion: sdk.MustNewDecFromStr("2.0"), Address: "gitopia1s0xhvlgg4mp5kkpj3tg0x0k48m5tcejnpusj8j"},
			{Proportion: sdk.MustNewDecFromStr("1.0"), Address: "gitopia1385wjgxrtvk4yyhcvtwsjeycv28pny3tc2lgxr"},
			{Proportion: sdk.MustNewDecFromStr("1.0"), Address: "gitopia1fyztge5vhfdfhnghumssv7z5cca7ctyecq3fqf"},
			// 6.5 + 1.0
			{Proportion: sdk.MustNewDecFromStr("7.5"), Address: teamMultiSigAddress},
		},
		GitServer:       "gitopia1hk75f7j7zseq2qljel4rxvh96g253y3gnuhwru",
		StorageProvider: "gitopia10vdh4fdyvsd8tsy8egcpkucqjupw8jqknwnv8w",
	}

	for _, oldTask := range state.TaskList {
		task := v2types.Task{
			Id:       oldTask.Id,
			Type:     v2types.TaskType(oldTask.Type),
			State:    v2types.TaskState(oldTask.State),
			Message:  oldTask.Message,
			Creator:  oldTask.Creator,
			Provider: oldTask.Provider,
		}

		genesisState.TaskList = append(genesisState.TaskList, task)
	}

	genesisState.TaskCount = state.TaskCount

	for _, oldBranch := range state.BranchList {
		branch := v2types.Branch{
			Id:             oldBranch.Id,
			RepositoryId:   oldBranch.RepositoryId,
			Name:           oldBranch.Name,
			Sha:            oldBranch.Sha,
			AllowForcePush: oldBranch.AllowForcePush,
			CreatedAt:      oldBranch.CreatedAt,
			UpdatedAt:      oldBranch.UpdatedAt,
		}

		genesisState.BranchList = append(genesisState.BranchList, branch)
	}

	genesisState.BranchCount = state.BranchCount

	for _, oldTag := range state.TagList {
		tag := v2types.Tag{
			Id:           oldTag.Id,
			RepositoryId: oldTag.RepositoryId,
			Name:         oldTag.Name,
			Sha:          oldTag.Sha,
			CreatedAt:    oldTag.CreatedAt,
			UpdatedAt:    oldTag.UpdatedAt,
		}

		genesisState.TagList = append(genesisState.TagList, tag)
	}

	genesisState.TagCount = state.TagCount

	for _, oldMember := range state.MemberList {
		member := v2types.Member{
			Id:         oldMember.Id,
			Address:    oldMember.Address,
			DaoAddress: oldMember.DaoAddress,
			Role:       v2types.MemberRole(oldMember.Role),
		}

		genesisState.MemberList = append(genesisState.MemberList, member)
	}

	genesisState.MemberCount = state.MemberCount

	for _, oldRelease := range state.ReleaseList {
		var attachments []*v2types.Attachment
		for _, oldAttachment := range oldRelease.Attachments {
			attachments = append(attachments, &v2types.Attachment{
				Name:     oldAttachment.Name,
				Size_:    oldAttachment.Size_,
				Sha:      oldAttachment.Sha,
				Uploader: oldAttachment.Uploader,
			})
		}

		release := v2types.Release{
			Creator:      oldRelease.Creator,
			Id:           oldRelease.Id,
			RepositoryId: oldRelease.RepositoryId,
			TagName:      oldRelease.TagName,
			Target:       oldRelease.Target,
			Name:         oldRelease.Name,
			Description:  oldRelease.Description,
			Attachments:  attachments,
			Draft:        oldRelease.Draft,
			PreRelease:   oldRelease.PreRelease,
			IsTag:        oldRelease.IsTag,
			CreatedAt:    oldRelease.CreatedAt,
			UpdatedAt:    oldRelease.UpdatedAt,
			PublishedAt:  oldRelease.PublishedAt,
		}

		genesisState.ReleaseList = append(genesisState.ReleaseList, release)
	}

	genesisState.ReleaseCount = state.ReleaseCount

	for _, oldDao := range state.DaoList {
		dao := v2types.Dao{
			Creator:     oldDao.Creator,
			Id:          oldDao.Id,
			Address:     oldDao.Address,
			Name:        oldDao.Name,
			AvatarUrl:   oldDao.AvatarUrl,
			Followers:   oldDao.Followers,
			Following:   oldDao.Following,
			Teams:       oldDao.Teams,
			Location:    oldDao.Location,
			Website:     oldDao.Website,
			Verified:    oldDao.Verified,
			Description: oldDao.Description,
			CreatedAt:   oldDao.CreatedAt,
			UpdatedAt:   oldDao.UpdatedAt,
		}

		genesisState.DaoList = append(genesisState.DaoList, dao)
	}

	genesisState.DaoCount = state.DaoCount

	for _, oldUser := range state.UserList {
		if oldUser.Creator == "" {
			continue
		}
		user := v2types.User{
			Creator:        oldUser.Creator,
			Id:             oldUser.Id,
			Name:           oldUser.Name,
			Username:       oldUser.Username,
			UsernameGithub: oldUser.UsernameGithub,
			AvatarUrl:      oldUser.AvatarUrl,
			Followers:      oldUser.Followers,
			Following:      oldUser.Following,
			StarredRepos:   oldUser.StarredRepos,
			Subscriptions:  oldUser.Subscriptions,
			Bio:            oldUser.Bio,
			CreatedAt:      oldUser.CreatedAt,
			UpdatedAt:      oldUser.UpdatedAt,
			Verified:       oldUser.Verified,
		}

		genesisState.UserList = append(genesisState.UserList, user)
	}

	genesisState.UserCount = state.UserCount

	for _, oldUserDao := range state.UserDaoList {
		userDao := v2types.UserDao{
			UserAddress: oldUserDao.UserAddress,
			DaoAddress:  oldUserDao.DaoAddress,
		}

		genesisState.UserDaoList = append(genesisState.UserDaoList, userDao)
	}

	for _, oldWhois := range state.WhoisList {
		whois := v2types.Whois{
			Creator:   oldWhois.Creator,
			Id:        oldWhois.Id,
			Name:      oldWhois.Name,
			Address:   oldWhois.Address,
			OwnerType: v2types.OwnerType(oldWhois.OwnerType),
		}

		genesisState.WhoisList = append(genesisState.WhoisList, whois)
	}

	genesisState.WhoisCount = state.WhoisCount

	repoNameMap := make(map[string]map[string]int)
	newRepoNameMap := make(map[string]map[string]string)

	for _, oldRepository := range state.RepositoryList {
		var labels []*v2types.RepositoryLabel
		var releases []*v2types.RepositoryRelease
		var collaborators []*v2types.RepositoryCollaborator
		var backups []*v2types.RepositoryBackup

		for _, oldLabel := range oldRepository.Labels {
			labels = append(labels, &v2types.RepositoryLabel{
				Id:          oldLabel.Id,
				Name:        oldLabel.Name,
				Color:       oldLabel.Color,
				Description: oldLabel.Description,
			})
		}

		for _, oldRelease := range oldRepository.Releases {
			releases = append(releases, &v2types.RepositoryRelease{
				Id:      oldRelease.Id,
				TagName: oldRelease.TagName,
			})
		}

		for _, oldCollaborator := range oldRepository.Collaborators {
			collaborators = append(collaborators, &v2types.RepositoryCollaborator{
				Id:         oldCollaborator.Id,
				Permission: v2types.RepositoryCollaborator_Permission(oldCollaborator.Permission),
			})
		}

		for _, oldBackup := range oldRepository.Backups {
			backups = append(backups, &v2types.RepositoryBackup{
				Store: v2types.RepositoryBackup_Store(oldBackup.Store),
				Refs:  oldBackup.Refs,
			})
		}

		if _, ok := repoNameMap[oldRepository.Owner.Id]; !ok {
			repoNameMap[oldRepository.Owner.Id] = make(map[string]int)
			newRepoNameMap[oldRepository.Owner.Id] = make(map[string]string)
		}
		newRepoName := resolveRepoNameConflict(oldRepository.Name, repoNameMap[oldRepository.Owner.Id])
		newRepoNameMap[oldRepository.Owner.Id][oldRepository.Name] = newRepoName

		repository := v2types.Repository{
			Creator: oldRepository.Creator,
			Id:      oldRepository.Id,
			Name:    newRepoName,
			Owner: &v2types.RepositoryOwner{
				Id:   oldRepository.Owner.Id,
				Type: v2types.OwnerType(oldRepository.Owner.Type),
			},
			Description:         oldRepository.Description,
			Forks:               oldRepository.Forks,
			Subscribers:         oldRepository.Subscribers,
			Commits:             oldRepository.Commits,
			IssuesCount:         oldRepository.IssuesCount,
			PullsCount:          oldRepository.PullsCount,
			Labels:              labels,
			LabelsCount:         oldRepository.LabelsCount,
			Releases:            releases,
			CreatedAt:           oldRepository.CreatedAt,
			UpdatedAt:           oldRepository.UpdatedAt,
			PushedAt:            oldRepository.PushedAt,
			Stargazers:          oldRepository.Stargazers,
			Archived:            oldRepository.Archived,
			License:             oldRepository.License,
			DefaultBranch:       oldRepository.DefaultBranch,
			Parent:              oldRepository.Parent,
			Fork:                oldRepository.Fork,
			Collaborators:       collaborators,
			AllowForking:        oldRepository.AllowForking,
			Backups:             backups,
			EnableArweaveBackup: oldRepository.EnableArweaveBackup,
		}

		genesisState.RepositoryList = append(genesisState.RepositoryList, repository)
	}

	genesisState.RepositoryCount = state.RepositoryCount

	for _, oldbaseRepositoryKey := range state.BaseRepositoryKeyList {
		baseRepositoryKey := v2types.BaseRepositoryKey{
			Id:      oldbaseRepositoryKey.Id,
			Address: oldbaseRepositoryKey.Address,
			Name:    normalizeRepoName(newRepoNameMap[oldbaseRepositoryKey.Address][oldbaseRepositoryKey.Name]),
		}

		genesisState.BaseRepositoryKeyList = append(genesisState.BaseRepositoryKeyList, baseRepositoryKey)
	}

	commentMap := make(map[uint64]testnettypes.Comment)
	for _, comment := range state.CommentList {
		commentMap[comment.Id] = comment
	}

	genesisState.CommentCount = state.CommentCount

	for _, oldIssue := range state.IssueList {
		issue := v2types.Issue{
			Creator:       oldIssue.Creator,
			Id:            oldIssue.Id,
			Iid:           oldIssue.Iid,
			Title:         oldIssue.Title,
			State:         v2types.Issue_State(oldIssue.State),
			Description:   oldIssue.Description,
			CommentsCount: oldIssue.CommentsCount,
			RepositoryId:  oldIssue.RepositoryId,
			Labels:        oldIssue.Labels,
			Weight:        oldIssue.Weight,
			Assignees:     oldIssue.Assignees,
			CreatedAt:     oldIssue.CreatedAt,
			UpdatedAt:     oldIssue.UpdatedAt,
			ClosedAt:      oldIssue.ClosedAt,
			ClosedBy:      oldIssue.ClosedBy,
		}

		// Migrate comments
		for _, commentId := range oldIssue.Comments {
			oldComment := commentMap[commentId]

			var attachments []*v2types.Attachment

			for _, attachmentStr := range oldComment.Attachments {
				var attachment v2types.Attachment
				if err := json.Unmarshal([]byte(attachmentStr), &attachment); err != nil {
					return v2types.GenesisState{}, err
				}

				attachments = append(attachments, &attachment)
			}

			commentType := v2types.CommentTypeNone

			// Set comment type in case of system comment
			if oldComment.System {
				if strings.Contains(oldComment.Body, "assigned to") {
					commentType = v2types.CommentTypeAddAssignees
				} else if strings.Contains(oldComment.Body, "unassigned") {
					commentType = v2types.CommentTypeRemoveAssignees
				} else if strings.Contains(oldComment.Body, "added") {
					commentType = v2types.CommentTypeAddLabels
				} else if strings.Contains(oldComment.Body, "remove") {
					commentType = v2types.CommentTypeRemoveLabels
				} else if strings.Contains(oldComment.Body, "changed title from") {
					commentType = v2types.CommentTypeModifiedTitle
				} else if strings.Contains(oldComment.Body, "changed the description") {
					commentType = v2types.CommentTypeModifiedDescription
				} else if strings.Contains(oldComment.Body, "reopened") {
					commentType = v2types.CommentTypeIssueOpened
				} else if strings.Contains(oldComment.Body, "closed") {
					commentType = v2types.CommentTypeIssueClosed
				}
			} else {
				commentType = v2types.CommentTypeReply
			}

			comment := v2types.Comment{
				Creator:           oldComment.Creator,
				Id:                oldComment.Id,
				RepositoryId:      issue.RepositoryId,
				ParentIid:         issue.Iid,
				Parent:            v2types.CommentParentIssue,
				CommentIid:        oldComment.CommentIid,
				Body:              oldComment.Body,
				Attachments:       attachments,
				DiffHunk:          oldComment.DiffHunk,
				Path:              oldComment.Path,
				System:            oldComment.System,
				AuthorAssociation: oldComment.AuthorAssociation,
				CreatedAt:         oldComment.CreatedAt,
				UpdatedAt:         oldComment.UpdatedAt,
				CommentType:       commentType,
			}

			genesisState.CommentList = append(genesisState.CommentList, comment)
		}

		genesisState.IssueList = append(genesisState.IssueList, issue)
	}

	genesisState.IssueCount = state.IssueCount

	for _, oldPullRequest := range state.GetPullRequestList() {
		pullRequest := v2types.PullRequest{
			Creator:             oldPullRequest.Creator,
			Id:                  oldPullRequest.Id,
			Iid:                 oldPullRequest.Iid,
			Title:               oldPullRequest.Title,
			State:               v2types.PullRequest_State(oldPullRequest.State),
			Description:         oldPullRequest.Description,
			Locked:              oldPullRequest.Locked,
			CommentsCount:       oldPullRequest.CommentsCount,
			Labels:              oldPullRequest.Labels,
			Assignees:           oldPullRequest.Assignees,
			Reviewers:           oldPullRequest.Reviewers,
			Draft:               oldPullRequest.Draft,
			CreatedAt:           oldPullRequest.CreatedAt,
			UpdatedAt:           oldPullRequest.UpdatedAt,
			ClosedAt:            oldPullRequest.ClosedAt,
			ClosedBy:            oldPullRequest.ClosedBy,
			MergedAt:            oldPullRequest.MergedAt,
			MergedBy:            oldPullRequest.MergedBy,
			MergeCommitSha:      oldPullRequest.MergeCommitSha,
			MaintainerCanModify: oldPullRequest.MaintainerCanModify,
			Head:                (*v2types.PullRequestHead)(oldPullRequest.Head),
			Base:                (*v2types.PullRequestBase)(oldPullRequest.Base),
		}

		// Migrate comments
		for _, commentId := range oldPullRequest.Comments {
			oldComment := commentMap[commentId]

			var attachments []*v2types.Attachment

			for _, attachmentStr := range oldComment.Attachments {
				var attachment v2types.Attachment
				if err := json.Unmarshal([]byte(attachmentStr), &attachment); err != nil {
					return v2types.GenesisState{}, err
				}

				attachments = append(attachments, &attachment)
			}

			var commentType v2types.CommentType

			// Set comment type in case of system comment
			if oldComment.System {
				if strings.Contains(oldComment.Body, "assigned to") {
					commentType = v2types.CommentTypeAddAssignees
				} else if strings.Contains(oldComment.Body, "unassigned") {
					commentType = v2types.CommentTypeRemoveAssignees
				} else if strings.Contains(oldComment.Body, "added") {
					commentType = v2types.CommentTypeAddLabels
				} else if strings.Contains(oldComment.Body, "remove") {
					commentType = v2types.CommentTypeRemoveLabels
				} else if strings.Contains(oldComment.Body, "changed title from") {
					commentType = v2types.CommentTypeModifiedTitle
				} else if strings.Contains(oldComment.Body, "changed the description") {
					commentType = v2types.CommentTypeModifiedDescription
				} else if strings.Contains(oldComment.Body, "reopened") {
					commentType = v2types.CommentTypePullRequestOpened
				} else if strings.Contains(oldComment.Body, "closed") {
					commentType = v2types.CommentTypePullRequestClosed
				} else if strings.Contains(oldComment.Body, "merged") {
					commentType = v2types.CommentTypePullRequestMerged
				} else if strings.Contains(oldComment.Body, "requested review from") {
					commentType = v2types.CommentTypeAddReviewers
				} else if strings.Contains(oldComment.Body, "removed review request for") {
					commentType = v2types.CommentTypeRemoveReviewers
				}
			}

			comment := v2types.Comment{
				Creator:           oldComment.Creator,
				Id:                oldComment.Id,
				RepositoryId:      pullRequest.Base.RepositoryId,
				ParentIid:         pullRequest.Iid,
				Parent:            v2types.CommentParentPullRequest,
				CommentIid:        oldComment.CommentIid,
				Body:              oldComment.Body,
				Attachments:       attachments,
				DiffHunk:          oldComment.DiffHunk,
				Path:              oldComment.Path,
				System:            oldComment.System,
				AuthorAssociation: oldComment.AuthorAssociation,
				CreatedAt:         oldComment.CreatedAt,
				UpdatedAt:         oldComment.UpdatedAt,
				CommentType:       commentType,
			}

			genesisState.CommentList = append(genesisState.CommentList, comment)
		}

		genesisState.PullRequestList = append(genesisState.PullRequestList, pullRequest)
	}

	genesisState.PullRequestCount = state.PullRequestCount

	return genesisState, nil
}

func GenerateGenesisCmd() *cobra.Command {
	cmd := cobra.Command{
		Use:   "generate-genesis [exported-testnet-state] [game-of-lore-airdrop]",
		Short: "Generate Mainnet Genesis file",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			ctx := client.GetClientContextFromCmd(cmd)

			blob, err := os.ReadFile(args[0])
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
				testnetGenesis testnettypes.GenesisState
				authGenesis    authtypes.GenesisState
			)

			ctx.Codec.MustUnmarshalJSON(state[gitopiatypes.ModuleName], &testnetGenesis)
			genesisState, err := migrateTestnetState(testnetGenesis)
			if err != nil {
				return err
			}

			ctx.Codec.MustUnmarshalJSON(state[authtypes.ModuleName], &authGenesis)

			earlySupporters := map[string]struct{}{
				"gitopia1rtf8ddfa780h4za8j2dss65f7kccurmwktth89": {},
				"gitopia1l85lsrnzcfr3llsgs993ceddgqrnutm9ncymrk": {},
				"gitopia12zu648n89ve3dg2qul7h28h8fkt6cqp4wt3l4z": {},
				"gitopia159a98x95n8uwguhxnf8gnzpy6wj6reu2effl8g": {},
				"gitopia1vxh2drxeu5ef4zy8atp59s78shy9dqetn3jedd": {},
				"gitopia1agd5k6zpksxkw5ufdtf73npluk5nuqa5h5eenr": {},
				"gitopia1za95wp6a7qhdyu099797dtfsxfmgs0tzwata9p": {},
				"gitopia1ycj45mssxs6nnv9exu0atukxcdgcvcvfq5cqtu": {},
			}

			oldAccounts := make(map[string]struct{})

			var baseAccounts []*codectypes.Any
			for i := range authGenesis.Accounts {
				if authGenesis.Accounts[i].TypeUrl == "/cosmos.auth.v1beta1.BaseAccount" {
					acc := authGenesis.Accounts[i].GetCachedValue().(authtypes.AccountI)

					// skip early supporter accounts
					addr := sdk.MustBech32ifyAddressBytes("gitopia", acc.GetAddress())
					if _, ok := earlySupporters[addr]; ok {
						continue
					}

					err = acc.SetSequence(0)
					if err != nil {
						return err
					}
					accAny, err := codectypes.NewAnyWithValue(acc)
					if err != nil {
						return err
					}
					baseAccounts = append(baseAccounts, accAny)
					oldAccounts[addr] = struct{}{}
				}
			}
			authGenesis.Accounts = baseAccounts

			// early supporters vesting accounts
			vestingAcc := createEarlySupporterVestingAccount("gitopia1rtf8ddfa780h4za8j2dss65f7kccurmwktth89",
				8_571_428_570_000)
			accAny, err := codectypes.NewAnyWithValue(vestingAcc)
			if err != nil {
				return err
			}
			authGenesis.Accounts = append(authGenesis.Accounts, accAny)
			oldAccounts["gitopia1rtf8ddfa780h4za8j2dss65f7kccurmwktth89"] = struct{}{}

			vestingAcc = createEarlySupporterVestingAccount("gitopia1l85lsrnzcfr3llsgs993ceddgqrnutm9ncymrk",
				1_785_714_290_000)
			accAny, err = codectypes.NewAnyWithValue(vestingAcc)
			if err != nil {
				return err
			}
			authGenesis.Accounts = append(authGenesis.Accounts, accAny)
			oldAccounts["gitopia1l85lsrnzcfr3llsgs993ceddgqrnutm9ncymrk"] = struct{}{}

			vestingAcc = createEarlySupporterVestingAccount("gitopia12zu648n89ve3dg2qul7h28h8fkt6cqp4wt3l4z",
				14_285_714_290_000)
			accAny, err = codectypes.NewAnyWithValue(vestingAcc)
			if err != nil {
				return err
			}
			authGenesis.Accounts = append(authGenesis.Accounts, accAny)
			oldAccounts["gitopia12zu648n89ve3dg2qul7h28h8fkt6cqp4wt3l4z"] = struct{}{}

			vestingAcc = createEarlySupporterVestingAccount("gitopia159a98x95n8uwguhxnf8gnzpy6wj6reu2effl8g",
				1_785_714_290_000)
			accAny, err = codectypes.NewAnyWithValue(vestingAcc)
			if err != nil {
				return err
			}
			authGenesis.Accounts = append(authGenesis.Accounts, accAny)
			oldAccounts["gitopia159a98x95n8uwguhxnf8gnzpy6wj6reu2effl8g"] = struct{}{}

			vestingAcc = createEarlySupporterVestingAccount("gitopia1vxh2drxeu5ef4zy8atp59s78shy9dqetn3jedd",
				892_857_140_000)
			accAny, err = codectypes.NewAnyWithValue(vestingAcc)
			if err != nil {
				return err
			}
			authGenesis.Accounts = append(authGenesis.Accounts, accAny)
			oldAccounts["gitopia1vxh2drxeu5ef4zy8atp59s78shy9dqetn3jedd"] = struct{}{}

			vestingAcc = createEarlySupporterVestingAccount("gitopia1agd5k6zpksxkw5ufdtf73npluk5nuqa5h5eenr",
				892_857_140_000)
			accAny, err = codectypes.NewAnyWithValue(vestingAcc)
			if err != nil {
				return err
			}
			authGenesis.Accounts = append(authGenesis.Accounts, accAny)
			oldAccounts["gitopia1agd5k6zpksxkw5ufdtf73npluk5nuqa5h5eenr"] = struct{}{}

			vestingAcc = createEarlySupporterVestingAccount("gitopia1za95wp6a7qhdyu099797dtfsxfmgs0tzwata9p",
				7_142_857_140_000)
			accAny, err = codectypes.NewAnyWithValue(vestingAcc)
			if err != nil {
				return err
			}
			authGenesis.Accounts = append(authGenesis.Accounts, accAny)
			oldAccounts["gitopia1za95wp6a7qhdyu099797dtfsxfmgs0tzwata9p"] = struct{}{}

			vestingAcc = createEarlySupporterVestingAccount("gitopia1ycj45mssxs6nnv9exu0atukxcdgcvcvfq5cqtu",
				714_285_710_000)
			accAny, err = codectypes.NewAnyWithValue(vestingAcc)
			if err != nil {
				return err
			}
			authGenesis.Accounts = append(authGenesis.Accounts, accAny)
			oldAccounts["gitopia1ycj45mssxs6nnv9exu0atukxcdgcvcvfq5cqtu"] = struct{}{}

			var (
				authzGenesis        = authz.DefaultGenesisState()
				bankGenesis         = banktypes.DefaultGenesisState()
				crisisGenesis       = crisistypes.DefaultGenesisState()
				govGenesis          = govv1types.DefaultGenesisState()
				mintGenesis         = minttypes.DefaultGenesisState()
				ibcGenesis          = ibctypes.DefaultGenesisState()
				distributionGenesis = distributiontypes.DefaultGenesisState()
				slashingGenesis     = slashingtypes.DefaultGenesisState()
				genutilGenesis      = genutiltypes.DefaultGenesisState()
				stakingGenesis      = stakingtypes.DefaultGenesisState()
				groupGenesis        = group.NewGenesisState()
				capabilityGenesis   = capabilitytypes.DefaultGenesis()
				evidenceGenesis     = evidencetypes.DefaultGenesisState()
				feegrantGenesis     = feegranttypes.DefaultGenesisState()
				rewardsGenesis      = rewardstypes.DefaultGenesis()
			)

			for _, user := range genesisState.UserList {
				for _, t := range keeper.GitServerTypeUrls {
					a := authz.GrantAuthorization{
						Granter:       user.Creator,
						Grantee:       genesisState.Params.GitServer,
						Authorization: newAnyAuthorization(authz.NewGenericAuthorization(t)),
					}
					authzGenesis.Authorization = append(authzGenesis.Authorization, a)
				}

				for _, t := range keeper.StorageTypeUrls {
					a := authz.GrantAuthorization{
						Granter:       user.Creator,
						Grantee:       genesisState.Params.StorageProvider,
						Authorization: newAnyAuthorization(authz.NewGenericAuthorization(t)),
					}
					authzGenesis.Authorization = append(authzGenesis.Authorization, a)
				}
			}

			for _, dao := range genesisState.DaoList {
				for _, t := range keeper.GitServerTypeUrls {
					a := authz.GrantAuthorization{
						Granter:       dao.Address,
						Grantee:       genesisState.Params.GitServer,
						Authorization: newAnyAuthorization(authz.NewGenericAuthorization(t)),
					}
					authzGenesis.Authorization = append(authzGenesis.Authorization, a)
				}

				for _, t := range keeper.StorageTypeUrls {
					a := authz.GrantAuthorization{
						Granter:       dao.Address,
						Grantee:       genesisState.Params.StorageProvider,
						Authorization: newAnyAuthorization(authz.NewGenericAuthorization(t)),
					}
					authzGenesis.Authorization = append(authzGenesis.Authorization, a)
				}
			}

			twoDays := 2 * 24 * time.Hour
			depositParams := govv1types.NewDepositParams(
				sdk.NewCoins(sdk.NewCoin(params.BaseCoinUnit, math.NewInt(1000000000))),
				twoDays,
			)
			govGenesis.DepositParams = &depositParams

			votingParams := govv1types.NewVotingParams(twoDays)
			govGenesis.VotingParams = &votingParams

			// Disable all transfers
			bankGenesis.Params.DefaultSendEnabled = false
			bankGenesis.DenomMetadata = []banktypes.Metadata{
				{
					Description: "The native staking token of the Gitopia Hub.",
					DenomUnits: []*banktypes.DenomUnit{
						{Denom: params.BaseCoinUnit, Exponent: uint32(0), Aliases: []string{"microlore"}},
						{Denom: params.CoinUnit, Exponent: uint32(6), Aliases: []string{}},
					},
					Base:    params.BaseCoinUnit,
					Display: params.HumanCoinUnit,
					Name:    params.HumanCoinUnit,
					Symbol:  params.HumanCoinUnit,
				},
			}
			bankGenesis.Balances = append(bankGenesis.Balances, banktypes.Balance{
				Address: strategicReserveAddress1,
				Coins:   sdk.NewCoins(sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(50_000_000_000_000))), // 50M LORE
			}, banktypes.Balance{
				Address: strategicReserveAddress2,
				Coins:   sdk.NewCoins(sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(50_000_000_000_000))), // 50M LORE
			}, banktypes.Balance{
				Address: strategicReserveAddress3,
				Coins:   sdk.NewCoins(sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(50_000_000_000_000))), // 50M LORE
			}, banktypes.Balance{
				Address: strategicReserveAddress4,
				Coins:   sdk.NewCoins(sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(50_000_000_000_000))), // 50M LORE
			}, banktypes.Balance{
				Address: strategicReserveAddress5,
				Coins:   sdk.NewCoins(sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(50_000_000_000_000))), // 50M LORE
			}, banktypes.Balance{
				Address: feegrantsAddress,
				Coins:   sdk.NewCoins(sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(1_000_000_000_000))), // 1M LORE of ecosystem incentives for feegrants
			}, banktypes.Balance{
				Address: "gitopia1rtf8ddfa780h4za8j2dss65f7kccurmwktth89",
				Coins:   sdk.NewCoins(sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(8_571_428_570_000))), // 8,571,428.57 LORE
			}, banktypes.Balance{
				Address: "gitopia1l85lsrnzcfr3llsgs993ceddgqrnutm9ncymrk",
				Coins:   sdk.NewCoins(sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(1_785_714_290_000))), // 1,785,714.29 LORE
			}, banktypes.Balance{
				Address: "gitopia12zu648n89ve3dg2qul7h28h8fkt6cqp4wt3l4z",
				Coins:   sdk.NewCoins(sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(14_285_714_290_000))), // 14,285,714.29 LORE
			}, banktypes.Balance{
				Address: "gitopia159a98x95n8uwguhxnf8gnzpy6wj6reu2effl8g",
				Coins:   sdk.NewCoins(sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(1_785_714_290_000))), // 1,785,714.29 LORE
			}, banktypes.Balance{
				Address: "gitopia1vxh2drxeu5ef4zy8atp59s78shy9dqetn3jedd",
				Coins:   sdk.NewCoins(sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(892_857_140_000))), // 892,857.14 LORE
			}, banktypes.Balance{
				Address: "gitopia1agd5k6zpksxkw5ufdtf73npluk5nuqa5h5eenr",
				Coins:   sdk.NewCoins(sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(892_857_140_000))), // 892,857.14 LORE
			}, banktypes.Balance{
				Address: "gitopia1za95wp6a7qhdyu099797dtfsxfmgs0tzwata9p",
				Coins:   sdk.NewCoins(sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(7_142_857_140_000))), // 7,142,857.14 LORE
			}, banktypes.Balance{
				Address: "gitopia1ycj45mssxs6nnv9exu0atukxcdgcvcvfq5cqtu",
				Coins:   sdk.NewCoins(sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(714_285_710_000))), // 714,285.71 LORE
			}, banktypes.Balance{
				Address: earlySupportersMultiSigAddress,
				// 17,857,142.86 LORE
				Coins: sdk.NewCoins(sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(17_857_142_860_000))),
			}, banktypes.Balance{
				Address: strategicPartnersMultiSigAddress,
				Coins:   sdk.NewCoins(sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(STRATEGIC_PARTNERS_AMOUNT))),
			}, banktypes.Balance{
				Address: advisorsMultiSigAddress,
				Coins:   sdk.NewCoins(sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(ADVISORS_AMOUNT))),
			}, banktypes.Balance{
				Address: airdropMultiSigAddress,
				Coins:   sdk.NewCoins(sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(AIRDROP_AMOUNT))),
			})

			// Game of Lore
			file, err := os.Open(args[1])
			if err != nil {
				return err
			}
			defer file.Close()

			reader := csv.NewReader(file)
			reader.Read()
			records, err := reader.ReadAll()
			if err != nil {
				return err
			}

			for _, record := range records {
				f, err := strconv.ParseFloat(record[1], 64)
				if err != nil {
					return err
				}

				// skip early supporter accounts
				if _, ok := earlySupporters[record[0]]; ok {
					continue
				}

				bankGenesis.Balances = append(bankGenesis.Balances, banktypes.Balance{
					Address: record[0],
					Coins:   sdk.Coins{sdk.NewCoin(params.BaseCoinUnit, math.NewInt(int64(f*1000000)))},
				})
			}

			// Create base accounts for new addresses
			for _, balance := range bankGenesis.Balances {
				if _, exists := oldAccounts[balance.Address]; !exists {
					addr, _ := sdk.AccAddressFromBech32(balance.Address)
					baseAccount := authtypes.NewBaseAccountWithAddress(addr)
					accAny, err = codectypes.NewAnyWithValue(baseAccount)
					if err != nil {
						return err
					}
					authGenesis.Accounts = append(authGenesis.Accounts, accAny)
				}
			}

			crisisGenesis.ConstantFee = sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(1000))

			mintGenesis.Minter.Inflation = sdk.NewDecWithPrec(35, 2)
			mintGenesis.Params = minttypes.Params{
				MintDenom:           params.BaseCoinUnit,
				InflationRateChange: sdk.NewDecWithPrec(20, 2),
				InflationMax:        sdk.NewDecWithPrec(45, 2),
				InflationMin:        sdk.NewDecWithPrec(25, 2),
				GoalBonded:          sdk.NewDecWithPrec(67, 2),
				BlocksPerYear:       19466666, // assuming 1.62s block time
			}

			distributionGenesis.Params = distributiontypes.Params{
				CommunityTax:        sdk.NewDecWithPrec(5, 2), // 5%
				BaseProposerReward:  sdk.NewDecWithPrec(1, 2), // 1%
				BonusProposerReward: sdk.NewDecWithPrec(4, 2), // 4%
				WithdrawAddrEnabled: true,
			}

			stakingGenesis.Params = stakingtypes.NewParams(
				stakingtypes.DefaultUnbondingTime,
				stakingtypes.DefaultMaxValidators,
				stakingtypes.DefaultMaxEntries,
				stakingtypes.DefaultHistoricalEntries,
				params.BaseCoinUnit,
				stakingtypes.DefaultMinCommissionRate,
			)

			slashingGenesis.Params = slashingtypes.NewParams(
				50000,
				sdk.MustNewDecFromStr("0.05"),
				60*10*time.Second,
				sdk.MustNewDecFromStr("0.05"),
				sdk.MustNewDecFromStr("0.0001"),
			)

			rewardsGenesis.Params = rewardstypes.NewParams(rewardsServiceAddress, &rewardstypes.RewardSeries{
				SeriesOne: &rewardstypes.RewardPool{
					TotalAmount:   sdk.NewCoin(params.BaseCoinUnit, math.NewInt(2_000_000_000_000)),
					ClaimedAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(0)),
				},
				SeriesTwo: &rewardstypes.RewardPool{
					TotalAmount:   sdk.NewCoin(params.BaseCoinUnit, math.NewInt(1_700_000_000_000)),
					ClaimedAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(0)),
				},
				SeriesThree: &rewardstypes.RewardPool{
					TotalAmount:   sdk.NewCoin(params.BaseCoinUnit, math.NewInt(1_400_000_000_000)),
					ClaimedAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(0)),
				},
				SeriesFour: &rewardstypes.RewardPool{
					TotalAmount:   sdk.NewCoin(params.BaseCoinUnit, math.NewInt(1_100_000_000_000)),
					ClaimedAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(0)),
				},
				SeriesFive: &rewardstypes.RewardPool{
					TotalAmount:   sdk.NewCoin(params.BaseCoinUnit, math.NewInt(800_000_000_000)),
					ClaimedAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(0)),
				},
				SeriesSix: &rewardstypes.RewardPool{
					TotalAmount:   sdk.NewCoin(params.BaseCoinUnit, math.NewInt(500_000_000_000)),
					ClaimedAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(0)),
				},
				SeriesSeven: &rewardstypes.RewardPool{
					TotalAmount:   sdk.NewCoin(params.BaseCoinUnit, math.NewInt(250_000_000_000)),
					ClaimedAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(0)),
				},
			})

			state[authtypes.ModuleName] = ctx.Codec.MustMarshalJSON(&authGenesis)
			state[authz.ModuleName] = ctx.Codec.MustMarshalJSON(authzGenesis)
			state[banktypes.ModuleName] = ctx.Codec.MustMarshalJSON(bankGenesis)
			state[crisistypes.ModuleName] = ctx.Codec.MustMarshalJSON(crisisGenesis)
			state[govtypes.ModuleName] = ctx.Codec.MustMarshalJSON(govGenesis)
			state[distributiontypes.ModuleName] = ctx.Codec.MustMarshalJSON(distributionGenesis)
			state[minttypes.ModuleName] = ctx.Codec.MustMarshalJSON(mintGenesis)
			state[slashingtypes.ModuleName] = ctx.Codec.MustMarshalJSON(slashingGenesis)
			state[genutiltypes.ModuleName] = ctx.Codec.MustMarshalJSON(genutilGenesis)
			state[stakingtypes.ModuleName] = ctx.Codec.MustMarshalJSON(stakingGenesis)
			state[ibchost.ModuleName] = ctx.Codec.MustMarshalJSON(ibcGenesis)
			state[gitopiatypes.ModuleName] = ctx.Codec.MustMarshalJSON(&genesisState)
			state[group.ModuleName] = ctx.Codec.MustMarshalJSON(groupGenesis)
			state[capabilitytypes.ModuleName] = ctx.Codec.MustMarshalJSON(capabilityGenesis)
			state[evidencetypes.ModuleName] = ctx.Codec.MustMarshalJSON(evidenceGenesis)
			state[feegranttypes.ModuleName] = ctx.Codec.MustMarshalJSON(feegrantGenesis)
			state[rewardstypes.ModuleName] = ctx.Codec.MustMarshalJSON(rewardsGenesis)

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

			sortedBlob, err := sdk.SortJSON(blob)
			if err != nil {
				return err
			}

			fmt.Println(string(sortedBlob))
			return nil
		},
	}

	cmd.Flags().String(flags.FlagChainID, "gitopia", "set chain id")
	cmd.Flags().String(flagGenesisTime, GENESIS_TIME.UTC().Format(time.RFC3339Nano), "set genesis time")
	cmd.Flags().Int64(flagInitialHeight, 1, "set the initial height")

	return &cmd
}
