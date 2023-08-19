package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	keepertest "github.com/gitopia/gitopia/v3/testutil/keeper"
	"github.com/gitopia/gitopia/v3/testutil/nullify"
	"github.com/gitopia/gitopia/v3/x/gitopia/types"
)

/*
func TestMemberQuerySingle(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	wctx := sdk.WrapSDKContext(ctx)
	msgs := createNMember(keeper, ctx, 2)
	for _, tc := range []struct {
		desc     string
		request  *types.QueryGetMemberRequest
		response *types.QueryGetMemberResponse
		err      error
	}{
		{
			desc:     "First",
			request:  &types.QueryGetMemberRequest{Id: msgs[0].Id},
			response: &types.QueryGetMemberResponse{Member: msgs[0]},
		},
		{
			desc:     "Second",
			request:  &types.QueryGetMemberRequest{Id: msgs[1].Id},
			response: &types.QueryGetMemberResponse{Member: msgs[1]},
		},
		{
			desc:    "KeyNotFound",
			request: &types.QueryGetMemberRequest{Id: uint64(len(msgs))},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc: "InvalidRequest",
			err:  status.Error(codes.InvalidArgument, "invalid request"),
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			response, err := keeper.Member(wctx, tc.request)
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
*/

func TestMemberQueryPaginated(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	wctx := sdk.WrapSDKContext(ctx)
	msgs := createNMember(keeper, ctx, 5)

	request := func(next []byte, offset, limit uint64, total bool) *types.QueryAllMemberRequest {
		return &types.QueryAllMemberRequest{
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
			resp, err := keeper.MemberAll(wctx, request(nil, uint64(i), uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.Member), step)
			require.Subset(t,
				nullify.Fill(msgs),
				nullify.Fill(resp.Member),
			)
		}
	})
	t.Run("ByKey", func(t *testing.T) {
		step := 2
		var next []byte
		for i := 0; i < len(msgs); i += step {
			resp, err := keeper.MemberAll(wctx, request(next, 0, uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.Member), step)
			require.Subset(t,
				nullify.Fill(msgs),
				nullify.Fill(resp.Member),
			)
			next = resp.Pagination.NextKey
		}
	})
	t.Run("Total", func(t *testing.T) {
		resp, err := keeper.MemberAll(wctx, request(nil, 0, 0, true))
		require.NoError(t, err)
		require.Equal(t, len(msgs), int(resp.Pagination.Total))
		require.ElementsMatch(t,
			nullify.Fill(msgs),
			nullify.Fill(resp.Member),
		)
	})
	t.Run("InvalidRequest", func(t *testing.T) {
		_, err := keeper.MemberAll(wctx, nil)
		require.ErrorIs(t, err, status.Error(codes.InvalidArgument, "invalid request"))
	})
}
