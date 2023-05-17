package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	keepertest "github.com/gitopia/gitopia/v2/testutil/keeper"
	"github.com/gitopia/gitopia/v2/testutil/nullify"
	"github.com/gitopia/gitopia/v2/x/gitopia/types"
)

func TestBountyQuerySingle(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	wctx := sdk.WrapSDKContext(ctx)
	msgs := createNBounty(keeper, ctx, 2)
	for _, tc := range []struct {
		desc     string
		request  *types.QueryGetBountyRequest
		response *types.QueryGetBountyResponse
		err      error
	}{
		{
			desc:     "First",
			request:  &types.QueryGetBountyRequest{Id: msgs[0].Id},
			response: &types.QueryGetBountyResponse{Bounty: msgs[0]},
		},
		{
			desc:     "Second",
			request:  &types.QueryGetBountyRequest{Id: msgs[1].Id},
			response: &types.QueryGetBountyResponse{Bounty: msgs[1]},
		},
		{
			desc:    "KeyNotFound",
			request: &types.QueryGetBountyRequest{Id: uint64(len(msgs))},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc: "InvalidRequest",
			err:  status.Error(codes.InvalidArgument, "invalid request"),
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			response, err := keeper.Bounty(wctx, tc.request)
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

func TestBountyQueryPaginated(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	wctx := sdk.WrapSDKContext(ctx)
	msgs := createNBounty(keeper, ctx, 5)

	request := func(next []byte, offset, limit uint64, total bool) *types.QueryAllBountyRequest {
		return &types.QueryAllBountyRequest{
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
			resp, err := keeper.BountyAll(wctx, request(nil, uint64(i), uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.Bounty), step)
			require.Subset(t,
				nullify.Fill(msgs),
				nullify.Fill(resp.Bounty),
			)
		}
	})
	t.Run("ByKey", func(t *testing.T) {
		step := 2
		var next []byte
		for i := 0; i < len(msgs); i += step {
			resp, err := keeper.BountyAll(wctx, request(next, 0, uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.Bounty), step)
			require.Subset(t,
				nullify.Fill(msgs),
				nullify.Fill(resp.Bounty),
			)
			next = resp.Pagination.NextKey
		}
	})
	t.Run("Total", func(t *testing.T) {
		resp, err := keeper.BountyAll(wctx, request(nil, 0, 0, true))
		require.NoError(t, err)
		require.Equal(t, len(msgs), int(resp.Pagination.Total))
		require.ElementsMatch(t,
			nullify.Fill(msgs),
			nullify.Fill(resp.Bounty),
		)
	})
	t.Run("InvalidRequest", func(t *testing.T) {
		_, err := keeper.BountyAll(wctx, nil)
		require.ErrorIs(t, err, status.Error(codes.InvalidArgument, "invalid request"))
	})
}
