package keeper_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	testkeeper "github.com/gitopia/gitopia/testutil/keeper"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.GitopiaKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
