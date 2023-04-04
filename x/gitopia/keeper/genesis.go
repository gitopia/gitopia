package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	"github.com/gitopia/gitopia/app/params"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

const (
	STRATEGIC_PARTNERS_AMOUNT           = 51_071_429_000_000
	LIQUIDITY_BOOTSTRAPPING_POOL_AMOUNT = 30_000_000_000_000
	ECOSYSTEM_INCENTIVES_AMOUNT         = 7_500_000_000_000
)

// InitGenesis initializes the capability module's state from a provided genesis
// state.
func InitGenesis(ctx sdk.Context, k Keeper, genState types.GenesisState) {
	// Set all the task
	for _, elem := range genState.TaskList {
		k.SetTask(ctx, elem)
	}

	// Set task count
	k.SetTaskCount(ctx, genState.TaskCount)

	// Set all the branch
	for _, elem := range genState.BranchList {
		k.SetRepositoryBranch(ctx, elem)
	}

	// Set branch count
	k.SetBranchCount(ctx, genState.BranchCount)

	// Set all the tag
	for _, elem := range genState.TagList {
		k.SetRepositoryTag(ctx, elem)
	}

	// Set tag count
	k.SetTagCount(ctx, genState.TagCount)
	// Set all the member
	for _, elem := range genState.MemberList {
		k.SetMember(ctx, elem)
	}

	// Set member count
	k.SetMemberCount(ctx, genState.MemberCount)

	// Set all the bounty
	for _, elem := range genState.BountyList {
		k.SetBounty(ctx, elem)
	}

	// Set bounty count
	k.SetBountyCount(ctx, genState.BountyCount)

	// this line is used by starport scaffolding # genesis/module/init
	// Set all the release
	for _, elem := range genState.ReleaseList {
		k.SetRelease(ctx, elem)
	}

	// Set release count
	k.SetReleaseCount(ctx, genState.ReleaseCount)

	// Set all the pullRequest
	for _, elem := range genState.PullRequestList {
		k.SetPullRequest(ctx, elem)
	}

	// Set pullRequest count
	k.SetPullRequestCount(ctx, genState.PullRequestCount)

	// Set all the dao
	for _, elem := range genState.DaoList {
		k.SetDao(ctx, elem)
	}

	// Set dao count
	k.SetDaoCount(ctx, genState.DaoCount)

	// Set all the userDao
	for _, elem := range genState.UserDaoList {
		k.SetUserDao(ctx, elem)
	}

	// Set all the comment
	for _, elem := range genState.CommentList {
		k.SetComment(ctx, elem)
	}

	// Set comment count
	k.SetCommentCount(ctx, genState.CommentCount)

	// Set all the issue
	for _, elem := range genState.IssueList {
		k.SetIssue(ctx, elem)
	}

	// Set issue count
	k.SetIssueCount(ctx, genState.IssueCount)

	// Set all the repository
	for _, elem := range genState.RepositoryList {
		k.SetRepository(ctx, elem)
	}

	// Set repository count
	k.SetRepositoryCount(ctx, genState.RepositoryCount)

	// Set all the baseRepository
	for _, elem := range genState.BaseRepositoryKeyList {
		k.SetBaseRepositoryKey(ctx, elem)
	}

	// Set all the user
	for _, elem := range genState.UserList {
		k.SetUser(ctx, elem)
	}

	// Set user count
	k.SetUserCount(ctx, genState.UserCount)

	// Set all the whois
	for _, elem := range genState.WhoisList {
		k.SetWhois(ctx, elem)
	}

	// Set whois count
	k.SetWhoisCount(ctx, genState.WhoisCount)

	// Set all the exercised amount
	for _, elem := range genState.ExercisedAmountList {
		k.SetExercisedAmount(ctx, elem)
	}

	// Set exercised amount count
	k.SetExercisedAmountCount(ctx, genState.ExercisedAmountCount)

	err := genState.Params.Validate()
	if err != nil {
		panic(err)
	}

	k.SetParams(ctx, genState.Params)

	if !k.accountKeeper.HasAccount(ctx, k.accountKeeper.GetModuleAddress(types.TeamAccountName)) {
		teamModuleAcc := authtypes.NewEmptyModuleAccount(
			types.TeamAccountName, authtypes.Minter)
		k.accountKeeper.SetModuleAccount(ctx, teamModuleAcc)
	}

	if !k.accountKeeper.HasAccount(ctx, k.accountKeeper.GetModuleAddress(types.StrategicPartnersAccountName)) {
		totalStrategicPartnersCoins := sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(STRATEGIC_PARTNERS_AMOUNT))

		if err := k.createModuleAccount(ctx, types.StrategicPartnersAccountName, totalStrategicPartnersCoins); err != nil {
			panic(err)
		}
	}

	if !k.accountKeeper.HasAccount(ctx, k.accountKeeper.GetModuleAddress(types.LiquidityBootstrappingPoolAccountName)) {
		totalLiquidityBootstrappingPoolCoins := sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(LIQUIDITY_BOOTSTRAPPING_POOL_AMOUNT))

		if err := k.createModuleAccount(ctx, types.LiquidityBootstrappingPoolAccountName, totalLiquidityBootstrappingPoolCoins); err != nil {
			panic(err)
		}
	}

	if !k.accountKeeper.HasAccount(ctx, k.accountKeeper.GetModuleAddress(types.EcosystemIncentivesAccountName)) {
		genesisEcosystemIncentivesCoins := sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(ECOSYSTEM_INCENTIVES_AMOUNT))

		if err := k.createModuleAccount(ctx, types.EcosystemIncentivesAccountName, genesisEcosystemIncentivesCoins); err != nil {
			panic(err)
		}
	}
}

// ExportGenesis returns the capability module's exported genesis.
func ExportGenesis(ctx sdk.Context, k Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()

	genesis.TaskList = k.GetAllTask(ctx)
	genesis.TaskCount = k.GetTaskCount(ctx)

	genesis.BranchList = k.GetAllBranch(ctx)
	genesis.BranchCount = k.GetBranchCount(ctx)

	genesis.TagList = k.GetAllTag(ctx)
	genesis.TagCount = k.GetTagCount(ctx)

	genesis.MemberList = k.GetAllMember(ctx)
	genesis.MemberCount = k.GetMemberCount(ctx)

	genesis.BountyList = k.GetAllBounty(ctx)
	genesis.BountyCount = k.GetBountyCount(ctx)
	// this line is used by starport scaffolding # genesis/module/export
	// Get all release
	genesis.ReleaseList = k.GetAllRelease(ctx)
	genesis.ReleaseCount = k.GetReleaseCount(ctx)

	// Get all pullRequest
	genesis.PullRequestList = k.GetAllPullRequest(ctx)
	genesis.PullRequestCount = k.GetPullRequestCount(ctx)

	// Get all dao
	genesis.DaoList = k.GetAllDao(ctx)
	genesis.DaoCount = k.GetDaoCount(ctx)

	// Get all comment
	genesis.CommentList = k.GetAllComment(ctx)
	genesis.CommentCount = k.GetCommentCount(ctx)

	// Get all issue
	genesis.IssueList = k.GetAllIssue(ctx)
	genesis.IssueCount = k.GetIssueCount(ctx)

	// Get all repository
	genesis.RepositoryList = k.GetAllRepository(ctx)
	genesis.RepositoryCount = k.GetRepositoryCount(ctx)
	genesis.BaseRepositoryKeyList = k.GetAllBaseRepositoryKey(ctx)

	// Get all user
	genesis.UserList = k.GetAllUser(ctx)
	genesis.UserCount = k.GetUserCount(ctx)
	genesis.UserDaoList = k.GetAllUserDaoEntry(ctx)

	// Get all whois
	genesis.WhoisList = k.GetAllWhois(ctx)
	genesis.WhoisCount = k.GetWhoisCount(ctx)

	// Get all exercised amount
	genesis.ExercisedAmountList = k.GetAllExercisedAmount(ctx)
	genesis.ExercisedAmountCount = k.GetExercisedAmountCount(ctx)

	genesis.Params = k.GetParams(ctx)

	// this line is used by starport scaffolding # ibc/genesis/export

	return genesis
}
