package keeper_test

import (
	"testing"

	testkeeper "github.com/gitopia/gitopia/v6/testutil/keeper"
	"github.com/gitopia/gitopia/v6/x/storage/types"
	"github.com/stretchr/testify/require"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.StorageKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
