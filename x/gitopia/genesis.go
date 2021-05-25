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
	// Set all the issue
	for _, elem := range genState.IssueList {
		k.SetIssue(ctx, *elem)
	}

	// Set issue count
	k.SetIssueCount(ctx, uint64(len(genState.IssueList)))

	// Set all the repository
	for _, elem := range genState.RepositoryList {
		k.SetRepository(ctx, *elem)
	}

	// Set repository count
	k.SetRepositoryCount(ctx, uint64(len(genState.RepositoryList)))

	// Set all the user
	for _, elem := range genState.UserList {
		k.SetUser(ctx, *elem)
	}

	// Set user count
	k.SetUserCount(ctx, uint64(len(genState.UserList)))

	// Set all the whois
	for _, elem := range genState.WhoisList {
		k.SetWhois(ctx, elem.Name, *elem)
	}

	// Set whois count
	k.SetWhoisCount(ctx, uint64(len(genState.WhoisList)))

}

// ExportGenesis returns the capability module's exported genesis.
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()

	// this line is used by starport scaffolding # genesis/module/export
	// Get all issue
	issueList := k.GetAllIssue(ctx)
	for _, elem := range issueList {
		elem := elem
		genesis.IssueList = append(genesis.IssueList, &elem)
	}

	// Get all repository
	repositoryList := k.GetAllRepository(ctx)
	for _, elem := range repositoryList {
		elem := elem
		genesis.RepositoryList = append(genesis.RepositoryList, &elem)
	}

	// Get all user
	userList := k.GetAllUser(ctx)
	for _, elem := range userList {
		elem := elem
		genesis.UserList = append(genesis.UserList, &elem)
	}

	// Get all whois
	whoisList := k.GetAllWhois(ctx)
	for _, elem := range whoisList {
		elem := elem
		genesis.WhoisList = append(genesis.WhoisList, &elem)
	}

	return genesis
}
