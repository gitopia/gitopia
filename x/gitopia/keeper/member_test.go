package keeper_test

import (
	"fmt"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/gitopia/gitopia/testutil/keeper"
	"github.com/gitopia/gitopia/testutil/nullify"
	"github.com/gitopia/gitopia/x/gitopia/keeper"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/stretchr/testify/require"
)

func createNMember(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.Member {
	items := make([]types.Member, n)
	for i := range items {
		items[i].DaoAddress = fmt.Sprintf("dao-%v", i)
		items[i].Address = fmt.Sprintf("user-%v", i)
		items[i].Id = keeper.AppendMember(ctx, items[i])
	}
	return items
}

func TestMemberGet(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNMember(keeper, ctx, 10)
	for _, item := range items {
		got, found := keeper.GetDaoMember(ctx, item.DaoAddress, item.Address)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&got),
		)
	}
}

func TestMemberRemove(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNMember(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveDaoMember(ctx, item.DaoAddress, item.Address)
		_, found := keeper.GetDaoMember(ctx, item.DaoAddress, item.Address)
		require.False(t, found)
	}
}

func TestMemberGetAll(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNMember(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllMember(ctx)),
	)
}

func TestMemberCount(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	items := createNMember(keeper, ctx, 10)
	count := uint64(len(items))
	require.Equal(t, count, keeper.GetMemberCount(ctx))
}
