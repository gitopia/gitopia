package gitopia

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/x/gitopia/keeper"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

// InitGenesis initializes the capability module's state from a provided genesis
// state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	// Set all the request
	for _, elem := range genState.RequestList {
		k.SetRequest(ctx, elem)
	}

	// Set request count
	k.SetRequestCount(ctx, genState.RequestCount)
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

	// Set all the organization
	for _, elem := range genState.OrganizationList {
		k.SetOrganization(ctx, elem)
	}

	// Set organization count
	k.SetOrganizationCount(ctx, genState.OrganizationCount)

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

	// Set all the user
	for _, elem := range genState.UserList {
		k.SetUser(ctx, elem)
	}

	// Set user count
	k.SetUserCount(ctx, genState.UserCount)

	// Set all the whois
	for _, elem := range genState.WhoisList {
		k.SetWhois(ctx, elem.Name, elem)
	}

	// Set whois count
	k.SetWhoisCount(ctx, genState.WhoisCount)

}

// ExportGenesis returns the capability module's exported genesis.
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()

	genesis.RequestList = k.GetAllRequest(ctx)
	genesis.RequestCount = k.GetRequestCount(ctx)
	// this line is used by starport scaffolding # genesis/module/export
	// Get all release
	genesis.ReleaseList = k.GetAllRelease(ctx)
	genesis.ReleaseCount = k.GetReleaseCount(ctx)

	// Get all pullRequest
	genesis.PullRequestList = k.GetAllPullRequest(ctx)
	genesis.PullRequestCount = k.GetPullRequestCount(ctx)

	// Get all organization
	genesis.OrganizationList = k.GetAllOrganization(ctx)
	genesis.OrganizationCount = k.GetOrganizationCount(ctx)

	// Get all comment
	genesis.CommentList = k.GetAllComment(ctx)
	genesis.CommentCount = k.GetCommentCount(ctx)

	// Get all issue
	genesis.IssueList = k.GetAllIssue(ctx)
	genesis.IssueCount = k.GetIssueCount(ctx)

	// Get all repository
	genesis.RepositoryList = k.GetAllRepository(ctx)
	genesis.RepositoryCount = k.GetRepositoryCount(ctx)

	// Get all user
	genesis.UserList = k.GetAllUser(ctx)
	genesis.UserCount = k.GetUserCount(ctx)

	// Get all whois
	genesis.WhoisList = k.GetAllWhois(ctx)
	genesis.WhoisCount = k.GetWhoisCount(ctx)

	// this line is used by starport scaffolding # ibc/genesis/export

	return genesis
}
