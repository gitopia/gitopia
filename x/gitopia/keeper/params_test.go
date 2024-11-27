package keeper_test

import (
	"testing"

	testkeeper "github.com/gitopia/gitopia/v5/testutil/keeper"
	"github.com/gitopia/gitopia/v5/x/gitopia/types"
	"github.com/stretchr/testify/require"
)

func TestGetParams(t *testing.T) {
	keepers, ctx := testkeeper.AppKeepers(t)
	k := keepers.GitopiaKeeper
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	p := k.GetParams(ctx)
	require.EqualValues(t, params, p)
}
