package cli_test

import (
	"fmt"
	"strconv"
	"testing"

	"github.com/cosmos/cosmos-sdk/client/flags"
	clitestutil "github.com/cosmos/cosmos-sdk/testutil/cli"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	tmcli "github.com/tendermint/tendermint/libs/cli"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"github.com/gitopia/gitopia/v2/testutil/network"
	"github.com/gitopia/gitopia/v2/testutil/nullify"
	"github.com/gitopia/gitopia/v2/testutil/sample"
	"github.com/gitopia/gitopia/v2/x/rewards/client/cli"
	"github.com/gitopia/gitopia/v2/x/rewards/types"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func networkWithRewardsObjects(t *testing.T, n int) (*network.Network, []types.Reward) {
	t.Helper()
	cfg := network.DefaultConfig()
	state := types.GenesisState{}
	require.NoError(t, cfg.Codec.UnmarshalJSON(cfg.GenesisState[types.ModuleName], &state))

	for i := 0; i < n; i++ {
		reward := types.Reward{
			Recipient: sample.AccAddress(),
		}
		nullify.Fill(&reward)
		state.RewardsList = append(state.RewardsList, reward)
	}
	buf, err := cfg.Codec.MarshalJSON(&state)
	require.NoError(t, err)
	cfg.GenesisState[types.ModuleName] = buf
	return network.New(t, cfg), state.RewardsList
}

func TestShowRewards(t *testing.T) {
	net, objs := networkWithRewardsObjects(t, 2)

	ctx := net.Validators[0].ClientCtx
	common := []string{
		fmt.Sprintf("--%s=json", tmcli.OutputFlag),
	}
	for _, tc := range []struct {
		desc        string
		idRecipient string

		args []string
		err  error
		obj  types.Reward
	}{
		{
			desc:        "found",
			idRecipient: objs[0].Recipient,

			args: common,
			obj:  objs[0],
		},
		{
			desc:        "not found",
			idRecipient: strconv.Itoa(100000),

			args: common,
			err:  status.Error(codes.NotFound, "not found"),
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			args := []string{
				tc.idRecipient,
			}
			args = append(args, tc.args...)
			out, err := clitestutil.ExecTestCLICmd(ctx, cli.CmdShowRewards(), args)
			if tc.err != nil {
				stat, ok := status.FromError(tc.err)
				require.True(t, ok)
				require.ErrorIs(t, stat.Err(), tc.err)
			} else {
				require.NoError(t, err)
				var resp types.QueryGetRewardResponse
				require.NoError(t, net.Config.Codec.UnmarshalJSON(out.Bytes(), &resp))
				require.NotNil(t, resp.Reward)
				nullify.Fill(&resp)
				// query doesnt return reward as is. returns additional processed fields
				assert.Equal(t, tc.obj.Recipient, resp.Reward.Recipient)
				assert.Equal(t, tc.obj.Amount, resp.Reward.Amount)
				assert.Equal(t, tc.obj.Creator, resp.Reward.Creator)
			}
		})
	}
}

func TestListRewards(t *testing.T) {
	net, objs := networkWithRewardsObjects(t, 5)

	ctx := net.Validators[0].ClientCtx
	request := func(next []byte, offset, limit uint64, total bool) []string {
		args := []string{
			fmt.Sprintf("--%s=json", tmcli.OutputFlag),
		}
		if next == nil {
			args = append(args, fmt.Sprintf("--%s=%d", flags.FlagOffset, offset))
		} else {
			args = append(args, fmt.Sprintf("--%s=%s", flags.FlagPageKey, next))
		}
		args = append(args, fmt.Sprintf("--%s=%d", flags.FlagLimit, limit))
		if total {
			args = append(args, fmt.Sprintf("--%s", flags.FlagCountTotal))
		}
		return args
	}
	t.Run("ByOffset", func(t *testing.T) {
		step := 2
		for i := 0; i < len(objs); i += step {
			args := request(nil, uint64(i), uint64(step), false)
			out, err := clitestutil.ExecTestCLICmd(ctx, cli.CmdListRewards(), args)
			require.NoError(t, err)
			var resp types.QueryAllRewardsResponse
			require.NoError(t, net.Config.Codec.UnmarshalJSON(out.Bytes(), &resp))
			require.LessOrEqual(t, len(resp.Rewards), step)
			require.Subset(t,
				nullify.Fill(objs),
				nullify.Fill(resp.Rewards),
			)
		}
	})
	t.Run("ByKey", func(t *testing.T) {
		step := 2
		var next []byte
		for i := 0; i < len(objs); i += step {
			args := request(next, 0, uint64(step), false)
			out, err := clitestutil.ExecTestCLICmd(ctx, cli.CmdListRewards(), args)
			require.NoError(t, err)
			var resp types.QueryAllRewardsResponse
			require.NoError(t, net.Config.Codec.UnmarshalJSON(out.Bytes(), &resp))
			require.LessOrEqual(t, len(resp.Rewards), step)
			require.Subset(t,
				nullify.Fill(objs),
				nullify.Fill(resp.Rewards),
			)
			next = resp.Pagination.NextKey
		}
	})
	t.Run("Total", func(t *testing.T) {
		args := request(nil, 0, uint64(len(objs)), true)
		out, err := clitestutil.ExecTestCLICmd(ctx, cli.CmdListRewards(), args)
		require.NoError(t, err)
		var resp types.QueryAllRewardsResponse
		require.NoError(t, net.Config.Codec.UnmarshalJSON(out.Bytes(), &resp))

		require.Equal(t, len(objs), int(resp.Pagination.Total))
		require.ElementsMatch(t,
			nullify.Fill(objs),
			nullify.Fill(resp.Rewards),
		)
	})
}
