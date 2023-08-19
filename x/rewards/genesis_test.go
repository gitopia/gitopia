package rewards_test

import (
	"testing"

	keepertest "github.com/gitopia/gitopia/v3/testutil/keeper"
	"github.com/gitopia/gitopia/v3/testutil/nullify"
	"github.com/gitopia/gitopia/v3/x/rewards"
	"github.com/gitopia/gitopia/v3/x/rewards/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		RewardsList: []types.Reward{
			{
				Recipient: "0",
			},
			{
				Recipient: "1",
			},
		},

		// this line is used by starport scaffolding # genesis/test/state
	}

	keepers, ctx := keepertest.AppKeepers(t)
	rewards.InitGenesis(ctx, keepers.RewardKeeper, genesisState)
	got := rewards.ExportGenesis(ctx, keepers.RewardKeeper)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	require.ElementsMatch(t, genesisState.RewardsList, got.RewardsList)
	require.ElementsMatch(t, genesisState.RewardsList, got.RewardsList)
	// this line is used by starport scaffolding # genesis/test/assert
}
