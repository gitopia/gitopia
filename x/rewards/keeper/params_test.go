package keeper_test

import (
	"testing"

	testkeeper "github.com/gitopia/gitopia/v5/testutil/keeper"
	"github.com/gitopia/gitopia/v5/x/rewards/types"
	"github.com/stretchr/testify/require"
)

func TestGetParams(t *testing.T) {
	keepers, ctx := testkeeper.AppKeepers(t)
	params := types.DefaultParams()

	keepers.RewardKeeper.SetParams(ctx, params)

	require.EqualValues(t, params, keepers.RewardKeeper.GetParams(ctx))
}
