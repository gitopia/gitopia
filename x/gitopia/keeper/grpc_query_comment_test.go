package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	keepertest "github.com/gitopia/gitopia/v4/testutil/keeper"
	"github.com/gitopia/gitopia/v4/x/gitopia/types"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func TestCommentQuerySingle(t *testing.T) {
	keepers, ctx := keepertest.AppKeepers(t)
	keeper := &keepers.GitopiaKeeper
	wctx := sdk.WrapSDKContext(ctx)
	msgs := createNComment(keeper, ctx, types.CommentParentIssue, 2)
	for _, tc := range []struct {
		desc     string
		request  *types.QueryGetIssueCommentRequest
		response *types.QueryGetIssueCommentResponse
		err      error
	}{
		{
			desc:     "First",
			request:  &types.QueryGetIssueCommentRequest{RepositoryId: 0, IssueIid: 1, CommentIid: 1},
			response: &types.QueryGetIssueCommentResponse{Comment: &msgs[0]},
		},
		{
			desc:     "Second",
			request:  &types.QueryGetIssueCommentRequest{RepositoryId: 0, IssueIid: 1, CommentIid: 2},
			response: &types.QueryGetIssueCommentResponse{Comment: &msgs[1]},
		},
		{
			desc:    "KeyNotFound",
			request: &types.QueryGetIssueCommentRequest{RepositoryId: 0, IssueIid: 1, CommentIid: 10},
			err:     sdkerrors.ErrKeyNotFound,
		},
		{
			desc: "InvalidRequest",
			err:  status.Error(codes.InvalidArgument, "invalid request"),
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			response, err := keeper.IssueComment(wctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				require.Equal(t, tc.response, response)
			}
		})
	}
}

/* Needs fix

func TestCommentQueryPaginated(t *testing.T) {
	keeper, ctx := keepertest.GitopiaKeeper(t)
	wctx := sdk.WrapSDKContext(ctx)
	msgs := createNComment(keeper, ctx, 5)

	request := func(next []byte, offset, limit uint64, total bool) *types.QueryAllCommentRequest {
		return &types.QueryAllCommentRequest{
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
			resp, err := keeper.CommentAll(wctx, request(nil, uint64(i), uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.Comment), step)
			require.Subset(t, msgs, resp.Comment)
		}
	})
	t.Run("ByKey", func(t *testing.T) {
		step := 2
		var next []byte
		for i := 0; i < len(msgs); i += step {
			resp, err := keeper.CommentAll(wctx, request(next, 0, uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.Comment), step)
			//require.Subset(t, msgs, resp.Comment)
			next = resp.Pagination.NextKey
		}
	})
	t.Run("Total", func(t *testing.T) {
		resp, err := keeper.CommentAll(wctx, request(nil, 0, 0, true))
		require.NoError(t, err)
		require.Equal(t, len(msgs), int(resp.Pagination.Total))
	})
	t.Run("InvalidRequest", func(t *testing.T) {
		_, err := keeper.CommentAll(wctx, nil)
		require.ErrorIs(t, err, status.Error(codes.InvalidArgument, "invalid request"))
	})
}
*/
