package keeper_test

import (
	"testing"

	keepertest "github.com/gitopia/gitopia/v6/testutil/keeper"
	"github.com/gitopia/gitopia/v6/testutil/nullify"
	"github.com/gitopia/gitopia/v6/x/storage/keeper"
	"github.com/gitopia/gitopia/v6/x/storage/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.StorageKeeper(t)
	keeper.InitGenesis(ctx, *k, genesisState)
	got := keeper.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
