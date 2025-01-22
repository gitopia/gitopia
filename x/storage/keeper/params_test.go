package keeper_test

import (
	"testing"

	testkeeper "github.com/gitopia/gitopia/v5/testutil/keeper"
	"github.com/gitopia/gitopia/v5/x/storage/types"
	"github.com/stretchr/testify/require"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.StorageKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
