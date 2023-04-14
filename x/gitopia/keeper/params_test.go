package keeper_test

import (
	"testing"

	testkeeper "github.com/gitopia/gitopia/testutil/keeper"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/stretchr/testify/require"
)

func TestGetParams(t *testing.T) {
	keepers, ctx := testkeeper.AppKeepers(t)
	k := keepers.GitopiaKeeper
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
