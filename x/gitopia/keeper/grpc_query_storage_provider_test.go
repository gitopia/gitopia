package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	keepertest "github.com/gitopia/gitopia/testutil/keeper"
	"github.com/gitopia/gitopia/testutil/nullify"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func TestStorageProviderQuerySingle(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	wctx := sdk.WrapSDKContext(ctx)
	msgs := createNStorageProvider(keeper, ctx, 2)
	for _, tc := range []struct {
		desc     string
		request  *types.QueryGetStorageProviderRequest
		response *types.QueryGetStorageProviderResponse
		err      error
	}{
		{
			desc:     "First",
			request:  &types.QueryGetStorageProviderRequest{Id: msgs[0].Id},
			response: &types.QueryGetStorageProviderResponse{StorageProvider: msgs[0]},
		},
		{
			desc:     "Second",
			request:  &types.QueryGetStorageProviderRequest{Id: msgs[1].Id},
			response: &types.QueryGetStorageProviderResponse{StorageProvider: msgs[1]},
		},
		{
			desc:    "KeyNotFound",
			request: &types.QueryGetStorageProviderRequest{Id: uint64(len(msgs))},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc: "InvalidRequest",
			err:  status.Error(codes.InvalidArgument, "invalid request"),
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			response, err := keeper.StorageProvider(wctx, tc.request)
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

func TestStorageProviderQueryPaginated(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	wctx := sdk.WrapSDKContext(ctx)
	msgs := createNStorageProvider(keeper, ctx, 5)

	request := func(next []byte, offset, limit uint64, total bool) *types.QueryAllStorageProviderRequest {
		return &types.QueryAllStorageProviderRequest{
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
			resp, err := keeper.StorageProviderAll(wctx, request(nil, uint64(i), uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.StorageProvider), step)
			require.Subset(t,
				nullify.Fill(msgs),
				nullify.Fill(resp.StorageProvider),
			)
		}
	})
	t.Run("ByKey", func(t *testing.T) {
		step := 2
		var next []byte
		for i := 0; i < len(msgs); i += step {
			resp, err := keeper.StorageProviderAll(wctx, request(next, 0, uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.StorageProvider), step)
			require.Subset(t,
				nullify.Fill(msgs),
				nullify.Fill(resp.StorageProvider),
			)
			next = resp.Pagination.NextKey
		}
	})
	t.Run("Total", func(t *testing.T) {
		resp, err := keeper.StorageProviderAll(wctx, request(nil, 0, 0, true))
		require.NoError(t, err)
		require.Equal(t, len(msgs), int(resp.Pagination.Total))
		require.ElementsMatch(t,
			nullify.Fill(msgs),
			nullify.Fill(resp.StorageProvider),
		)
	})
	t.Run("InvalidRequest", func(t *testing.T) {
		_, err := keeper.StorageProviderAll(wctx, nil)
		require.ErrorIs(t, err, status.Error(codes.InvalidArgument, "invalid request"))
	})
}
