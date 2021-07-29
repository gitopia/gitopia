package gitopia

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/x/gitopia/keeper"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

// InitGenesis initializes the capability module's state from a provided genesis
// state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	// this line is used by starport scaffolding # genesis/module/init
	// Set all the organization
	for _, elem := range genState.OrganizationList {
		k.SetOrganization(ctx, *elem)
	}

	// Set organization count
	k.SetOrganizationCount(ctx, genState.OrganizationCount)

	// Set all the comment
	for _, elem := range genState.CommentList {
		k.SetComment(ctx, *elem)
	}

	// Set comment count
	k.SetCommentCount(ctx, genState.CommentCount)

	// Set all the issue
	for _, elem := range genState.IssueList {
		k.SetIssue(ctx, *elem)
	}

	// Set issue count
	k.SetIssueCount(ctx, genState.IssueCount)

	// Set all the repository
	for _, elem := range genState.RepositoryList {
		k.SetRepository(ctx, *elem)
	}

	// Set repository count
	k.SetRepositoryCount(ctx, genState.RepositoryCount)

	// Set all the user
	for _, elem := range genState.UserList {
		k.SetUser(ctx, *elem)
	}

	// Set user count
	k.SetUserCount(ctx, genState.UserCount)

	// Set all the whois
	for _, elem := range genState.WhoisList {
		k.SetWhois(ctx, elem.Name, *elem)
	}

	// Set whois count
	k.SetWhoisCount(ctx, genState.WhoisCount)

}

// ExportGenesis returns the capability module's exported genesis.
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()

	// this line is used by starport scaffolding # genesis/module/export
	// Get all organization
	organizationList := k.GetAllOrganization(ctx)
	for _, elem := range organizationList {
		elem := elem
		genesis.OrganizationList = append(genesis.OrganizationList, &elem)
	}

	// Set the current count
	genesis.OrganizationCount = k.GetOrganizationCount(ctx)

	// Get all comment
	commentList := k.GetAllComment(ctx)
	for _, elem := range commentList {
		elem := elem
		genesis.CommentList = append(genesis.CommentList, &elem)
	}

	// Set the current count
	genesis.CommentCount = k.GetCommentCount(ctx)

	// Get all issue
	issueList := k.GetAllIssue(ctx)
	for _, elem := range issueList {
		elem := elem
		genesis.IssueList = append(genesis.IssueList, &elem)
	}

	// Set the current count
	genesis.IssueCount = k.GetIssueCount(ctx)

	// Get all repository
	repositoryList := k.GetAllRepository(ctx)
	for _, elem := range repositoryList {
		elem := elem
		genesis.RepositoryList = append(genesis.RepositoryList, &elem)
	}

	// Set the current count
	genesis.RepositoryCount = k.GetRepositoryCount(ctx)

	// Get all user
	userList := k.GetAllUser(ctx)
	for _, elem := range userList {
		elem := elem
		genesis.UserList = append(genesis.UserList, &elem)
	}

	// Set the current count
	genesis.UserCount = k.GetUserCount(ctx)

	// Get all whois
	whoisList := k.GetAllWhois(ctx)
	for _, elem := range whoisList {
		elem := elem
		genesis.WhoisList = append(genesis.WhoisList, &elem)
	}

	// Set the current count
	genesis.WhoisCount = k.GetWhoisCount(ctx)

	// this line is used by starport scaffolding # ibc/genesis/export

	return genesis
}
