package cli_test

import (
	"fmt"
	"strconv"
	"testing"

	"cosmossdk.io/math"
	sdkmath "cosmossdk.io/math"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/crypto/hd"
	"github.com/cosmos/cosmos-sdk/testutil"
	clitestutil "github.com/cosmos/cosmos-sdk/testutil/cli"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	"github.com/gitopia/gitopia/v3/testutil/network"
	"github.com/gitopia/gitopia/v3/testutil/sample"
	"github.com/gitopia/gitopia/v3/x/rewards/client/cli"
	"github.com/gitopia/gitopia/v3/x/rewards/types"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func initAccsWithBalance(t *testing.T, cfg *network.Config, addrs ...string) {
	genAccs := authtypes.GenesisAccounts{}
	genBals := []banktypes.Balance{}

	for _, addr := range addrs {
		genAccs = append(genAccs, &authtypes.BaseAccount{
			Address: addr,
		})
		genBals = append(genBals, banktypes.Balance{
			Address: addr,
			Coins:   sdk.Coins{sdk.Coin{Denom: sdk.DefaultBondDenom, Amount: math.NewInt(10000)}},
		})
	}

	packedGenAccs, err := authtypes.PackAccounts(genAccs)
	assert.NoError(t, err)

	authState := authtypes.DefaultGenesisState()
	authState.Accounts = append(authState.Accounts, packedGenAccs...)
	cfg.GenesisState[authtypes.ModuleName] = cfg.Codec.MustMarshalJSON(authState)

	bankState := banktypes.DefaultGenesisState()
	bankState.Balances = genBals
	cfg.GenesisState[banktypes.ModuleName] = cfg.Codec.MustMarshalJSON(bankState)
}

func TestCreateRewards(t *testing.T) {
	acc := types.Acc1
	cfg := network.DefaultConfig()
	initAccsWithBalance(t, &cfg, acc.Address)

	net := network.New(t, cfg)
	val := net.Validators[0]
	ctx := val.ClientCtx

	accAddr, _, err := testutil.GenerateSaveCoinKey(ctx.Keyring, acc.Name, acc.Mnemonic, true, hd.Secp256k1)
	assert.NoError(t, err)
	assert.Equal(t, acc.Address, accAddr.String())

	for _, tc := range []struct {
		desc      string
		recipient string
		amount    string

		args []string
		err  error
		code uint32
	}{
		{
			recipient: sample.AccAddress(),
			amount:    "10ulore",

			desc: "valid",
			args: []string{
				fmt.Sprintf("--%s=%s", flags.FlagFrom, acc.Address),
				fmt.Sprintf("--%s=true", flags.FlagSkipConfirmation),
				fmt.Sprintf("--%s=%s", flags.FlagBroadcastMode, flags.BroadcastBlock),
				fmt.Sprintf("--%s=%s", flags.FlagFees, sdk.NewCoins(sdk.NewCoin(net.Config.BondDenom, sdkmath.NewInt(10))).String()),
			},
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			args := []string{
				tc.recipient,
				tc.amount,
			}
			args = append(args, tc.args...)
			out, err := clitestutil.ExecTestCLICmd(ctx, cli.CmdCreateRewards(), args)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				var resp sdk.TxResponse
				require.NoError(t, ctx.Codec.UnmarshalJSON(out.Bytes(), &resp))
				require.Equal(t, tc.code, resp.Code)
			}
		})
	}
}
