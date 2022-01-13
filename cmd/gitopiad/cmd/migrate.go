package cmd

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"time"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	crisistypes "github.com/cosmos/cosmos-sdk/x/crisis/types"
	distributiontypes "github.com/cosmos/cosmos-sdk/x/distribution/types"
	genutiltypes "github.com/cosmos/cosmos-sdk/x/genutil/types"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
	minttypes "github.com/cosmos/cosmos-sdk/x/mint/types"
	slashingtypes "github.com/cosmos/cosmos-sdk/x/slashing/types"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	ibctypes "github.com/cosmos/ibc-go/modules/core/types"
	"github.com/spf13/cobra"
	tmjson "github.com/tendermint/tendermint/libs/json"
	tmtypes "github.com/tendermint/tendermint/types"
)

const (
	flagGenesisTime   = "genesis-time"
	flagInitialHeight = "initial-height"
)

func contains(s []string, str string) bool {
	for _, v := range s {
		if v == str {
			return true
		}
	}

	return false
}

func MigrateCmd() *cobra.Command {
	cmd := cobra.Command{
		Use:   "migrate-denom [genesis-file]",
		Short: "Migrate Genesis file",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			var ctx = client.GetClientContextFromCmd(cmd)

			blob, err := ioutil.ReadFile(args[0])
			if err != nil {
				return err
			}

			chainID, err := cmd.Flags().GetString(flags.FlagChainID)
			if err != nil {
				return err
			}

			genesisTime, err := cmd.Flags().GetString(flagGenesisTime)
			if err != nil {
				return err
			}

			initialHeight, err := cmd.Flags().GetInt64(flagInitialHeight)
			if err != nil {
				return err
			}

			genesis, err := tmtypes.GenesisDocFromJSON(blob)
			if err != nil {
				return err
			}

			var state genutiltypes.AppMap
			if err := json.Unmarshal(genesis.AppState, &state); err != nil {
				return err
			}

			var (
				authGenesis   authtypes.GenesisState
				bankGenesis   banktypes.GenesisState
				crisisGenesis crisistypes.GenesisState
				govGenesis    govtypes.GenesisState
				mintGenesis   minttypes.GenesisState
				ibcGenesis    ibctypes.GenesisState
			)

			ctx.Codec.MustUnmarshalJSON(state[authtypes.ModuleName], &authGenesis)
			ctx.Codec.MustUnmarshalJSON(state[banktypes.ModuleName], &bankGenesis)
			ctx.Codec.MustUnmarshalJSON(state[crisistypes.ModuleName], &crisisGenesis)
			ctx.Codec.MustUnmarshalJSON(state[govtypes.ModuleName], &govGenesis)
			ctx.Codec.MustUnmarshalJSON(state[minttypes.ModuleName], &mintGenesis)
			ctx.Codec.MustUnmarshalJSON(state["ibc"], &ibcGenesis)

			var baseAccounts []*codectypes.Any
			var moduleAccounts []string
			for i := range authGenesis.Accounts {
				if authGenesis.Accounts[i].TypeUrl == "/cosmos.auth.v1beta1.BaseAccount" {
					baseAccounts = append(baseAccounts, authGenesis.Accounts[i])
				} else {
					moduleAccounts = append(moduleAccounts, string(authGenesis.Accounts[i].GetCachedValue().(authtypes.AccountI).GetAddress().String()))
				}
			}
			authGenesis.Accounts = baseAccounts

			bankGenesis.DenomMetadata = []banktypes.Metadata{
				{
					Description: "The native staking token of the Gitopia Hub.",
					DenomUnits: []*banktypes.DenomUnit{
						{Denom: "utlore", Exponent: uint32(0), Aliases: []string{"microtlore"}},
						{Denom: "tlore", Exponent: uint32(6), Aliases: []string{}},
					},
					Base:    "utlore",
					Display: "tlore",
					Name:    "tlore",
					Symbol:  "tlore",
				},
			}

			totalBalance := sdk.NewInt(0)

			var balances []banktypes.Balance
			for _, balance := range bankGenesis.Balances {
				if contains(moduleAccounts, balance.Address) {
					continue
				}
				for j := range balance.Coins {
					if balance.Coins[j].Denom == "tlore" {
						balance.Coins[j].Denom = "utlore"
						// bankGenesis.Balances[i].Coins[j].Amount = bankGenesis.Balances[i].Coins[j].Amount.Mul(sdk.NewInt(1000000))
						totalBalance = totalBalance.Add(balance.Coins[j].Amount)
					}
				}
				balances = append(balances, balance)
			}

			bankGenesis.Balances = balances

			// fmt.Fprintln(os.Stderr, "total", totalBalance.String())

			bankGenesis.Supply[0].Denom = "utlore"
			bankGenesis.Supply[0].Amount = totalBalance

			crisisGenesis.ConstantFee.Denom = "utlore"

			// govGenesis.DepositParams.MinDeposit[0].Amount = govGenesis.DepositParams.MinDeposit[0].Amount.Mul(sdk.NewInt(10000))
			govGenesis.DepositParams.MinDeposit[0].Denom = "utlore"

			mintGenesis.Params.MintDenom = "utlore"

			ibcGenesis.ConnectionGenesis.Params.MaxExpectedTimePerBlock = 30000000000

			var (
				distributionGenesis = distributiontypes.DefaultGenesisState()
				slashingGenesis     = slashingtypes.DefaultGenesisState()
				genutilGenesis      = genutiltypes.DefaultGenesisState()
				stakingGenesis      = stakingtypes.DefaultGenesisState()
			)

			stakingGenesis.Params.BondDenom = "utlore"

			state[authtypes.ModuleName] = ctx.Codec.MustMarshalJSON(&authGenesis)
			state[banktypes.ModuleName] = ctx.Codec.MustMarshalJSON(&bankGenesis)
			state[crisistypes.ModuleName] = ctx.Codec.MustMarshalJSON(&crisisGenesis)
			state[govtypes.ModuleName] = ctx.Codec.MustMarshalJSON(&govGenesis)
			state[distributiontypes.ModuleName] = ctx.Codec.MustMarshalJSON(distributionGenesis)
			state[minttypes.ModuleName] = ctx.Codec.MustMarshalJSON(&mintGenesis)
			state[slashingtypes.ModuleName] = ctx.Codec.MustMarshalJSON(slashingGenesis)
			state[genutiltypes.ModuleName] = ctx.Codec.MustMarshalJSON(genutilGenesis)
			state[stakingtypes.ModuleName] = ctx.Codec.MustMarshalJSON(stakingGenesis)
			state["ibc"] = ctx.Codec.MustMarshalJSON(&ibcGenesis)

			genesis.AppState, err = json.Marshal(state)
			if err != nil {
				return err
			}

			if genesisTime != "" {
				var t time.Time
				if err := t.UnmarshalText([]byte(genesisTime)); err != nil {
					return err
				}

				genesis.GenesisTime = t
			}
			if chainID != "" {
				genesis.ChainID = chainID
			}

			genesis.InitialHeight = initialHeight

			genesis.Validators = []tmtypes.GenesisValidator{}

			blob, err = tmjson.Marshal(genesis)
			if err != nil {
				return err
			}

			// sortedBlob, err := sdk.SortJSON(blob)
			// if err != nil {
			// 	return err
			// }

			fmt.Println(string(blob))
			return nil
		},
	}

	cmd.Flags().String(flags.FlagChainID, "", "set chain id")
	cmd.Flags().String(flagGenesisTime, "", "set genesis time")
	cmd.Flags().Int64(flagInitialHeight, 1, "set the initial height")

	return &cmd
}