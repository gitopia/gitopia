package keeper_test

import (
	"strconv"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	keepertest "github.com/gitopia/gitopia/v4/testutil/keeper"
	"github.com/gitopia/gitopia/v4/testutil/nullify"
	"github.com/gitopia/gitopia/v4/x/rewards/types"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func TestRewardQuerySingle(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	wctx := sdk.WrapSDKContext(ctx)

	keepers.RewardKeeper.SetParams(ctx, types.DefaultParams())
	msgs := createNRewards(&keepers.RewardKeeper, ctx, 2)

	for _, tc := range []struct {
		desc     string
		request  *types.QueryGetRewardRequest
		response *types.QueryGetRewardResponse
		err      error
	}{
		{
			desc: "First",
			request: &types.QueryGetRewardRequest{
				Recipient: msgs[0].Recipient,
			},
			response: &types.QueryGetRewardResponse{
				Recipient: msgs[0].Recipient,
			},
		},
		{
			desc: "Second",
			request: &types.QueryGetRewardRequest{
				Recipient: msgs[1].Recipient,
			},
			response: &types.QueryGetRewardResponse{
				Recipient: msgs[1].Recipient,
			},
		},
		{
			desc: "KeyNotFound",
			request: &types.QueryGetRewardRequest{
				Recipient: strconv.Itoa(100000),
			},
			err: status.Error(codes.NotFound, "reward not found"),
		},
		{
			desc: "InvalidRequest",
			err:  status.Error(codes.InvalidArgument, "invalid request"),
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			response, err := keepers.RewardKeeper.Reward(wctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				require.Equal(t,
					nullify.Fill(tc.response),
					nullify.Fill(response),
				)
			}
		})
	}
}

func TestRewardQueryPaginated(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	wctx := sdk.WrapSDKContext(ctx)

	keepers.RewardKeeper.SetParams(ctx, types.DefaultParams())
	msgs := createNRewards(&keepers.RewardKeeper, ctx, 5)

	request := func(next []byte, offset, limit uint64, total bool) *types.QueryAllRewardsRequest {
		return &types.QueryAllRewardsRequest{
			Pagination: &query.PageRequest{
				Key:        next,
				Offset:     offset,
				Limit:      limit,
				CountTotal: total,
			},
		}
	}
	t.Run("ByOffset", func(t *testing.T) {
		step := 2
		for i := 0; i < len(msgs); i += step {
			resp, err := keepers.RewardKeeper.RewardsAll(wctx, request(nil, uint64(i), uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.Rewards), step)
			require.Subset(t,
				nullify.Fill(msgs),
				nullify.Fill(resp.Rewards),
			)
		}
	})
	t.Run("ByKey", func(t *testing.T) {
		step := 2
		var next []byte
		for i := 0; i < len(msgs); i += step {
			resp, err := keepers.RewardKeeper.RewardsAll(wctx, request(next, 0, uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.Rewards), step)
			require.Subset(t,
				nullify.Fill(msgs),
				nullify.Fill(resp.Rewards),
			)
			next = resp.Pagination.NextKey
		}
	})
	t.Run("Total", func(t *testing.T) {
		resp, err := keepers.RewardKeeper.RewardsAll(wctx, request(nil, 0, 0, true))
		require.NoError(t, err)
		require.Equal(t, len(msgs), int(resp.Pagination.Total))
		require.ElementsMatch(t,
			nullify.Fill(msgs),
			nullify.Fill(resp.Rewards),
		)
	})
	t.Run("InvalidRequest", func(t *testing.T) {
		_, err := keepers.RewardKeeper.RewardsAll(wctx, nil)
		require.ErrorIs(t, err, status.Error(codes.InvalidArgument, "invalid request"))
	})
}
