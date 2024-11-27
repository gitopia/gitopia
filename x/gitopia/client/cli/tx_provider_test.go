package cli_test

/*
import (
	"fmt"
	"testing"

	"github.com/cosmos/cosmos-sdk/client/flags"
	clitestutil "github.com/cosmos/cosmos-sdk/testutil/cli"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/require"

	"github.com/gitopia/gitopia/v5/testutil/network"
	"github.com/gitopia/gitopia/v5/testutil/sample"
	"github.com/gitopia/gitopia/v5/x/gitopia/client/cli"
)

func TestAuthorizeProvider(t *testing.T) {
	net := network.New(t)

	val := net.Validators[0]
	ctx := val.ClientCtx

	fields := []string{sample.AccAddress(), sample.AccAddress(), "GIT_SERVER"}
	common := []string{
		fmt.Sprintf("--%s=%s", flags.FlagFrom, val.Address.String()),
		fmt.Sprintf("--%s=true", flags.FlagSkipConfirmation),
		fmt.Sprintf("--%s=%s", flags.FlagBroadcastMode, flags.BroadcastBlock),
		fmt.Sprintf("--%s=%s", flags.FlagFees, sdk.NewCoins(sdk.NewCoin(net.Config.BondDenom, sdk.NewInt(10))).String()),
	}
	args := []string{}
	args = append(args, fields...)
	args = append(args, common...)
	_, err := clitestutil.ExecTestCLICmd(ctx, cli.CmdAuthorizeProvider(), args)
	require.NoError(t, err)

	for _, tc := range []struct {
		desc       string
		granter    string
		provider   string
		permission string
		args       []string
		code       uint32
		err        error
	}{
		// TODO: creator = granter
		// {
		// 	desc:       "valid provider address",
		// 	granter:    sample.AccAddress(),
		// 	provider:   sample.AccAddress(),
		// 	permission: "GIT_SERVER",
		// 	args:       common,
		// },
		{
			desc:       "invalid dao address",
			granter:    sample.AccAddress(),
			provider:   sample.AccAddress(),
			permission: "GIT_SERVER",
			args:       common,
			code:       sdkerrors.ErrKeyNotFound.ABCICode(),
			err:        sdkerrors.ErrKeyNotFound,
		},
	} {
		tc := tc
		t.Run(tc.desc, func(t *testing.T) {
			clitestutil.ExecTestCLICmd(ctx, cli.CmdCreateUser(), append([]string{"test", "teSWz
				require.NoError(t, err)
				var resp sdk.TxResponse
				require.NoError(t, ctx.Codec.UnmarshalJSON(out.Bytes(), &resp))
				require.Equal(t, tc.code, resp.Code)
			}
		})
	}
}
*/
