package rewards

import (
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/gitopia/gitopia/v6/x/rewards/keeper"
	"github.com/gitopia/gitopia/v6/x/rewards/types"
)

// InitGenesis initializes the module's state from a provided genesis state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	// Set all the rewards
	for _, elem := range genState.RewardsList {
		k.SetReward(ctx, elem)
	}
	// this line is used by starport scaffolding # genesis/module/init
	k.SetParams(ctx, genState.Params)

	err := k.CreateRewardsModuleAccount(ctx, genState.Params)
	if err != nil {
		panic(err)
	}
}

// ExportGenesis returns the module's exported genesis
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()

	genesis.RewardsList = k.GetAllRewards(ctx)
	// this line is used by starport scaffolding # genesis/module/export

	return genesis
}
