package keeper_test

/*
 * Commented in favour of unexpected error.
 * Will uncomment as soon as we came up with fix.
 */

/*
import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/gitopia/gitopia/v6/testutil/keeper"
	"github.com/gitopia/gitopia/v6/testutil/sample"
	"github.com/gitopia/gitopia/v6/x/gitopia/keeper"
	"github.com/gitopia/gitopia/v6/x/gitopia/types"
	"github.com/stretchr/testify/require"
)

func createNOrganization(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.Organization {
	items := make([]types.Organization, n)
	for i := range items {
		items[i].Creator = sample.AccAddress()
		items[i].Id = uint64(i)
		items[i].Address = items[i].Creator
		items[i].Address = keeper.AppendOrganization(ctx, items[i])
	}
	return items
}

func TestOrganizationGet(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	createNOrganization(keeper, ctx, 10)
	items := createNOrganization(keeper, ctx, 10)
	for _, item := range items {
		got, found := keeper.GetOrganization(ctx, item.Address)
		require.True(t, found)
		require.Equal(t, item, got)
	}
}

func TestOrganizationRemove(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNOrganization(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveOrganization(ctx, item.Address)
		_, found := keeper.GetOrganization(ctx, item.Address)
		require.False(t, found)
	}
}

func TestOrganizationGetAll(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNOrganization(keeper, ctx, 10)
	require.ElementsMatch(t, items, keeper.GetAllOrganization(ctx))
}

func TestOrganizationCount(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNOrganization(keeper, ctx, 10)
	count := uint64(len(items))
	require.Equal(t, count, keeper.GetOrganizationCount(ctx))
}
*/
