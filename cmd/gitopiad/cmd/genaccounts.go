package cmd

import (
	"bufio"
	"encoding/json"
	"errors"
	"fmt"

	"github.com/spf13/cobra"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	"github.com/cosmos/cosmos-sdk/server"
	sdk "github.com/cosmos/cosmos-sdk/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	authvesting "github.com/cosmos/cosmos-sdk/x/auth/vesting/types"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	"github.com/cosmos/cosmos-sdk/x/genutil"
	genutiltypes "github.com/cosmos/cosmos-sdk/x/genutil/types"
)

const (
	flagVestingStart = "vesting-start-time"
	flagVestingEnd   = "vesting-end-time"
	flagVestingAmt   = "vesting-amount"
)

const (
	period1Month = 2592000
	genesisTime  = 1621036800 // 15 May 2021 00:00:00
)

const (
	preSeedRoundTokens        = 17850000
	seedRoundTokens           = 62500000
	strategicOfferingTokens   = 44650000
	teamTokens                = 100000000
	treasuryTokens            = 60000000
	communityIncentivesTokens = 75000000
	marketingTokens           = 25000000
	ecosystemPartnersTokens   = 35000000
	resourceIncentivesTokens  = 35000000
	validatorIncentivesTokens = 25000000
	advisorsTokens            = 20000000
)

const (
	preSeedRoundAcc        = "pre-seed"
	seedRoundAcc           = "seed"
	strategicOfferingAcc   = "strategic-offering"
	teamAcc                = "team"
	treasuryAcc            = "treasury"
	communityIncentivesAcc = "community-incentives"
	marketingAcc           = "marketing"
	ecosystemPartnersAcc   = "ecosystem-partners"
	resourceIncentivesAcc  = "resource-incentives"
	validatorIncentivesAcc = "validator-incentives"
	advisorsAcc            = "advisors"
)

// AddGenesisAccountCmd returns add-genesis-account cobra Command.
func AddGenesisAccountCmd(defaultNodeHome string) *cobra.Command {
	cmd := &cobra.Command{
		Use:   "add-genesis-account [address_or_key_name] [coin][,[coin]]",
		Short: "Add a genesis account to genesis.json",
		Long: `Add a genesis account to genesis.json. The provided account must specify
the account address or key name and a list of initial coins. If a key name is given,
the address will be looked up in the local Keybase. The list of initial tokens must
contain valid denominations. Accounts may optionally be supplied with vesting parameters.
`,
		Args: cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)
			serverCtx := server.GetServerContextFromCmd(cmd)
			config := serverCtx.Config

			config.SetRoot(clientCtx.HomeDir)

			var kr keyring.Keyring
			addr, err := sdk.AccAddressFromBech32(args[0])
			if err != nil {
				inBuf := bufio.NewReader(cmd.InOrStdin())
				keyringBackend, err := cmd.Flags().GetString(flags.FlagKeyringBackend)
				if err != nil {
					return err
				}

				if keyringBackend != "" && clientCtx.Keyring == nil {
					var err error
					kr, err = keyring.New(sdk.KeyringServiceName(), keyringBackend, clientCtx.HomeDir, inBuf, clientCtx.Codec)
					if err != nil {
						return err
					}
				} else {
					kr = clientCtx.Keyring
				}

				info, err := kr.Key(args[0])
				if err != nil {
					return fmt.Errorf("failed to get address from Keybase: %w", err)
				}

				addr, err = info.GetAddress()
				if err != nil {
					return err
				}
			}

			coins, err := sdk.ParseCoinsNormalized(args[1])
			if err != nil {
				return fmt.Errorf("failed to parse coins: %w", err)
			}

			vestingStart, err := cmd.Flags().GetInt64(flagVestingStart)
			if err != nil {
				return err
			}
			vestingEnd, err := cmd.Flags().GetInt64(flagVestingEnd)
			if err != nil {
				return err
			}
			vestingAmtStr, err := cmd.Flags().GetString(flagVestingAmt)
			if err != nil {
				return err
			}

			vestingAmt, err := sdk.ParseCoinsNormalized(vestingAmtStr)
			if err != nil {
				return fmt.Errorf("failed to parse vesting amount: %w", err)
			}

			// create concrete account type based on input parameters
			var genAccount authtypes.GenesisAccount

			balances := banktypes.Balance{Address: addr.String(), Coins: coins.Sort()}
			baseAccount := authtypes.NewBaseAccount(addr, nil, 0, 0)

			if !vestingAmt.IsZero() {
				baseVestingAccount := authvesting.NewBaseVestingAccount(baseAccount, vestingAmt.Sort(), vestingEnd)

				// if (balances.Coins.IsZero() && !baseVestingAccount.OriginalVesting.IsZero()) ||
				// 	baseVestingAccount.OriginalVesting.IsAnyGT(balances.Coins) {
				// 	return errors.New("vesting amount cannot be greater than total amount")
				// }

				switch {
				case vestingStart != 0 && vestingEnd != 0:
					genAccount = authvesting.NewContinuousVestingAccountRaw(baseVestingAccount, vestingStart)

				case vestingEnd != 0:
					genAccount = authvesting.NewDelayedVestingAccountRaw(baseVestingAccount)

				default:
					return errors.New("invalid vesting parameters; must supply start and end time or end time")
				}
			} else {
				genAccount = baseAccount
			}

			if err := genAccount.Validate(); err != nil {
				return fmt.Errorf("failed to validate new genesis account: %w", err)
			}

			genFile := config.GenesisFile()
			appState, genDoc, err := genutiltypes.GenesisStateFromGenFile(genFile)
			if err != nil {
				return fmt.Errorf("failed to unmarshal genesis state: %w", err)
			}

			authGenState := authtypes.GetGenesisStateFromAppState(clientCtx.Codec, appState)

			accs, err := authtypes.UnpackAccounts(authGenState.Accounts)
			if err != nil {
				return fmt.Errorf("failed to get accounts from any: %w", err)
			}

			if accs.Contains(addr) {
				return fmt.Errorf("cannot add account at existing address %s", addr)
			}

			// Add the new account to the set of genesis accounts and sanitize the
			// accounts afterwards.
			accs = append(accs, genAccount)
			accs = authtypes.SanitizeGenesisAccounts(accs)

			genAccs, err := authtypes.PackAccounts(accs)
			if err != nil {
				return fmt.Errorf("failed to convert accounts into any's: %w", err)
			}
			authGenState.Accounts = genAccs

			authGenStateBz, err := clientCtx.Codec.MarshalJSON(&authGenState)
			if err != nil {
				return fmt.Errorf("failed to marshal auth genesis state: %w", err)
			}

			appState[authtypes.ModuleName] = authGenStateBz

			bankGenState := banktypes.GetGenesisStateFromAppState(clientCtx.Codec, appState)
			bankGenState.Balances = append(bankGenState.Balances, balances)
			bankGenState.Balances = banktypes.SanitizeGenesisBalances(bankGenState.Balances)
			bankGenState.Supply = bankGenState.Supply.Add(balances.Coins...)

			bankGenStateBz, err := clientCtx.Codec.MarshalJSON(bankGenState)
			if err != nil {
				return fmt.Errorf("failed to marshal bank genesis state: %w", err)
			}

			appState[banktypes.ModuleName] = bankGenStateBz

			appStateJSON, err := json.Marshal(appState)
			if err != nil {
				return fmt.Errorf("failed to marshal application genesis state: %w", err)
			}

			genDoc.AppState = appStateJSON
			return genutil.ExportGenesisFile(genDoc, genFile)
		},
	}

	cmd.Flags().String(flags.FlagHome, defaultNodeHome, "The application home directory")
	cmd.Flags().String(flags.FlagKeyringBackend, flags.DefaultKeyringBackend, "Select keyring's backend (os|file|kwallet|pass|test)")
	cmd.Flags().String(flagVestingAmt, "", "amount of coins for vesting accounts")
	cmd.Flags().Int64(flagVestingStart, 0, "schedule start time (unix epoch) for vesting accounts")
	cmd.Flags().Int64(flagVestingEnd, 0, "schedule end time (unix epoch) for vesting accounts")
	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}

// AddGenesisAccountCmd returns add-genesis-account cobra Command.
func AddGenesisPeriodicVestingAccountsCmd(defaultNodeHome string) *cobra.Command {
	cmd := &cobra.Command{
		Use:   "add-genesis-periodic-vesting-accounts",
		Short: "Add periodic vesting accounts to genesis.json",
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)
			cdc := clientCtx.Codec
			serverCtx := server.GetServerContextFromCmd(cmd)
			config := serverCtx.Config

			config.SetRoot(clientCtx.HomeDir)

			inBuf := bufio.NewReader(cmd.InOrStdin())
			keyringBackend, err := cmd.Flags().GetString(flags.FlagKeyringBackend)
			if err != nil {
				return err
			}

			// attempt to lookup address from Keybase if no address was provided
			kb, err := keyring.New(sdk.KeyringServiceName(), keyringBackend, clientCtx.HomeDir, inBuf, cdc)
			if err != nil {
				return err
			}

			var genAccounts []authtypes.GenesisAccount
			var balances []banktypes.Balance
			var addrs []sdk.AccAddress

			// Pre-seed allocation

			coins := sdk.Coins{sdk.NewInt64Coin("token", preSeedRoundTokens)}

			info, err := kb.Key(preSeedRoundAcc)
			if err != nil {
				return fmt.Errorf("failed to get address from Keybase: %w", err)
			}
			addr, err := info.GetAddress()
			if err != nil {
				return err
			}
			addrs = append(addrs, addr)

			balances = append(balances, banktypes.Balance{Address: addr.String(), Coins: coins})
			baseAccount := authtypes.NewBaseAccountWithAddress(addr)

			periods := authvesting.Periods{
				authvesting.Period{Length: int64(0), Amount: sdk.Coins{sdk.NewInt64Coin("token", 892500)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 892500)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 892500)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 892500)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 892500)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 892500)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 892500)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 892500)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 892500)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 892500)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 892500)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 892500)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 892500)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 892500)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 892500)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 892500)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 892500)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 892500)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 892500)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 892500)}},
			}

			preSeedVestingAccount := authvesting.NewPeriodicVestingAccount(baseAccount, coins, int64(genesisTime+period1Month*12), periods)
			genAccounts = append(genAccounts, preSeedVestingAccount)

			// Seed allocation

			coins = sdk.Coins{sdk.NewInt64Coin("token", seedRoundTokens)}

			info, err = kb.Key(seedRoundAcc)
			if err != nil {
				return fmt.Errorf("failed to get address from Keybase: %w", err)
			}
			addr, err = info.GetAddress()
			if err != nil {
				return err
			}
			addrs = append(addrs, addr)

			balances = append(balances, banktypes.Balance{Address: addr.String(), Coins: coins})
			baseAccount = authtypes.NewBaseAccountWithAddress(addr)

			periods = authvesting.Periods{
				authvesting.Period{Length: int64(0), Amount: sdk.Coins{sdk.NewInt64Coin("token", 3125000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 3125000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 3125000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 3125000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 3125000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 3125000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 3125000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 3125000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 3125000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 3125000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 3125000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 3125000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 3125000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 3125000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 3125000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 3125000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 3125000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 3125000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 3125000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 3125000)}},
			}

			seedVestingAccount := authvesting.NewPeriodicVestingAccount(baseAccount, coins, int64(genesisTime+period1Month*12), periods)
			genAccounts = append(genAccounts, seedVestingAccount)

			// Strategic Offering allocation

			coins = sdk.Coins{sdk.NewInt64Coin("token", strategicOfferingTokens)}

			info, err = kb.Key(strategicOfferingAcc)
			if err != nil {
				return fmt.Errorf("failed to get address from Keybase: %w", err)
			}
			addr, err = info.GetAddress()
			if err != nil {
				return err
			}
			addrs = append(addrs, addr)

			balances = append(balances, banktypes.Balance{Address: addr.String(), Coins: coins})
			baseAccount = authtypes.NewBaseAccountWithAddress(addr)

			periods = authvesting.Periods{
				authvesting.Period{Length: int64(period1Month * 5), Amount: sdk.Coins{sdk.NewInt64Coin("token", 8930000)}},
				authvesting.Period{Length: int64(period1Month * 5), Amount: sdk.Coins{sdk.NewInt64Coin("token", 8930000)}},
				authvesting.Period{Length: int64(period1Month * 5), Amount: sdk.Coins{sdk.NewInt64Coin("token", 8930000)}},
				authvesting.Period{Length: int64(period1Month * 5), Amount: sdk.Coins{sdk.NewInt64Coin("token", 8930000)}},
				authvesting.Period{Length: int64(period1Month * 5), Amount: sdk.Coins{sdk.NewInt64Coin("token", 8930000)}},
			}

			strategicOfferingVestingAccount := authvesting.NewPeriodicVestingAccount(baseAccount, coins, int64(genesisTime), periods)
			genAccounts = append(genAccounts, strategicOfferingVestingAccount)

			// Team allocation

			coins = sdk.Coins{sdk.NewInt64Coin("token", teamTokens)}

			info, err = kb.Key(teamAcc)
			if err != nil {
				return fmt.Errorf("failed to get address from Keybase: %w", err)
			}
			addr, err = info.GetAddress()
			if err != nil {
				return err
			}
			addrs = append(addrs, addr)

			balances = append(balances, banktypes.Balance{Address: addr.String(), Coins: coins})
			baseAccount = authtypes.NewBaseAccountWithAddress(addr)

			periods = authvesting.Periods{
				authvesting.Period{Length: int64(0), Amount: sdk.Coins{sdk.NewInt64Coin("token", 5000000)}},
				authvesting.Period{Length: int64(period1Month * 3), Amount: sdk.Coins{sdk.NewInt64Coin("token", 5000000)}},
				authvesting.Period{Length: int64(period1Month * 3), Amount: sdk.Coins{sdk.NewInt64Coin("token", 5000000)}},
				authvesting.Period{Length: int64(period1Month * 3), Amount: sdk.Coins{sdk.NewInt64Coin("token", 5000000)}},
				authvesting.Period{Length: int64(period1Month * 3), Amount: sdk.Coins{sdk.NewInt64Coin("token", 10000000)}},
				authvesting.Period{Length: int64(period1Month * 3), Amount: sdk.Coins{sdk.NewInt64Coin("token", 10000000)}},
				authvesting.Period{Length: int64(period1Month * 3), Amount: sdk.Coins{sdk.NewInt64Coin("token", 10000000)}},
				authvesting.Period{Length: int64(period1Month * 3), Amount: sdk.Coins{sdk.NewInt64Coin("token", 10000000)}},
				authvesting.Period{Length: int64(period1Month * 3), Amount: sdk.Coins{sdk.NewInt64Coin("token", 10000000)}},
				authvesting.Period{Length: int64(period1Month * 3), Amount: sdk.Coins{sdk.NewInt64Coin("token", 10000000)}},
				authvesting.Period{Length: int64(period1Month * 3), Amount: sdk.Coins{sdk.NewInt64Coin("token", 10000000)}},
				authvesting.Period{Length: int64(period1Month * 3), Amount: sdk.Coins{sdk.NewInt64Coin("token", 10000000)}},
			}

			teamVestingAccount := authvesting.NewPeriodicVestingAccount(baseAccount, coins, int64(genesisTime+period1Month*24), periods)
			genAccounts = append(genAccounts, teamVestingAccount)

			// Treasury allocation

			coins = sdk.Coins{sdk.NewInt64Coin("token", treasuryTokens)}

			info, err = kb.Key(treasuryAcc)
			if err != nil {
				return fmt.Errorf("failed to get address from Keybase: %w", err)
			}
			addr, err = info.GetAddress()
			if err != nil {
				return err
			}
			addrs = append(addrs, addr)

			balances = append(balances, banktypes.Balance{Address: addr.String(), Coins: coins})
			baseAccount = authtypes.NewBaseAccountWithAddress(addr)

			periods = authvesting.Periods{
				authvesting.Period{Length: int64(0), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2500000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2500000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2500000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2500000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2500000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2500000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2500000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2500000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2500000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2500000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2500000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2500000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2000000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2000000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2000000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2000000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2000000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2000000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2000000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2000000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2000000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2000000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2000000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2000000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1500000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1500000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1500000)}},
				authvesting.Period{Length: int64(period1Month * 2), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1500000)}},
			}

			treasuryVestingAccount := authvesting.NewPeriodicVestingAccount(baseAccount, coins, int64(genesisTime), periods)
			genAccounts = append(genAccounts, treasuryVestingAccount)

			// Community Incentives allocation

			coins = sdk.Coins{sdk.NewInt64Coin("token", communityIncentivesTokens)}

			info, err = kb.Key(communityIncentivesAcc)
			if err != nil {
				return fmt.Errorf("failed to get address from Keybase: %w", err)
			}
			addr, err = info.GetAddress()
			if err != nil {
				return err
			}
			addrs = append(addrs, addr)

			balances = append(balances, banktypes.Balance{Address: addr.String(), Coins: coins})
			baseAccount = authtypes.NewBaseAccountWithAddress(addr)

			periods = authvesting.Periods{
				authvesting.Period{Length: int64(0), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1250000)}},
			}

			communityIncentivesVestingAccount := authvesting.NewPeriodicVestingAccount(baseAccount, coins, int64(genesisTime), periods)
			genAccounts = append(genAccounts, communityIncentivesVestingAccount)

			// Marketing allocation

			coins = sdk.Coins{sdk.NewInt64Coin("token", marketingTokens)}

			info, err = kb.Key(marketingAcc)
			if err != nil {
				return fmt.Errorf("failed to get address from Keybase: %w", err)
			}
			addr, err = info.GetAddress()
			if err != nil {
				return err
			}
			addrs = append(addrs, addr)

			balances = append(balances, banktypes.Balance{Address: addr.String(), Coins: coins})
			baseAccount = authtypes.NewBaseAccountWithAddress(addr)

			periods = authvesting.Periods{
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2500000)}},
				authvesting.Period{Length: int64(period1Month * 4), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2500000)}},
				authvesting.Period{Length: int64(period1Month * 4), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2500000)}},
				authvesting.Period{Length: int64(period1Month * 4), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2500000)}},
				authvesting.Period{Length: int64(period1Month * 4), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2500000)}},
				authvesting.Period{Length: int64(period1Month * 4), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2500000)}},
				authvesting.Period{Length: int64(period1Month * 4), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2500000)}},
				authvesting.Period{Length: int64(period1Month * 4), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2500000)}},
				authvesting.Period{Length: int64(period1Month * 4), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2500000)}},
				authvesting.Period{Length: int64(period1Month * 4), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2500000)}},
			}

			marketingVestingAccount := authvesting.NewPeriodicVestingAccount(baseAccount, coins, int64(genesisTime), periods)
			genAccounts = append(genAccounts, marketingVestingAccount)

			// Ecosystem Partners allocation

			coins = sdk.Coins{sdk.NewInt64Coin("token", ecosystemPartnersTokens)}

			info, err = kb.Key(ecosystemPartnersAcc)
			if err != nil {
				return fmt.Errorf("failed to get address from Keybase: %w", err)
			}
			addr, err = info.GetAddress()
			if err != nil {
				return err
			}
			addrs = append(addrs, addr)

			balances = append(balances, banktypes.Balance{Address: addr.String(), Coins: coins})
			baseAccount = authtypes.NewBaseAccountWithAddress(addr)

			periods = authvesting.Periods{
				authvesting.Period{Length: int64(0), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1000000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1000000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1000000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1000000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1000000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1000000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1000000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1000000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1000000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1000000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 250000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 250000)}},
			}

			ecosystemPartnersVestingAccount := authvesting.NewPeriodicVestingAccount(baseAccount, coins, int64(genesisTime), periods)
			genAccounts = append(genAccounts, ecosystemPartnersVestingAccount)

			// Resource Incentives allocation

			coins = sdk.Coins{sdk.NewInt64Coin("token", resourceIncentivesTokens)}

			info, err = kb.Key(resourceIncentivesAcc)
			if err != nil {
				return fmt.Errorf("failed to get address from Keybase: %w", err)
			}
			addr, err = info.GetAddress()
			if err != nil {
				return err
			}
			addrs = append(addrs, addr)

			balances = append(balances, banktypes.Balance{Address: addr.String(), Coins: coins})
			baseAccount = authtypes.NewBaseAccountWithAddress(addr)

			periods = authvesting.Periods{
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1000000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1000000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1000000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1000000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1000000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1000000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
			}

			resourceIncentivesVestingAccount := authvesting.NewPeriodicVestingAccount(baseAccount, coins, int64(genesisTime+period1Month*2), periods)
			genAccounts = append(genAccounts, resourceIncentivesVestingAccount)

			// Validator Incentives allocation

			coins = sdk.Coins{sdk.NewInt64Coin("token", validatorIncentivesTokens)}

			info, err = kb.Key(validatorIncentivesAcc)
			if err != nil {
				return fmt.Errorf("failed to get address from Keybase: %w", err)
			}
			addr, err = info.GetAddress()
			if err != nil {
				return err
			}
			addrs = append(addrs, addr)

			balances = append(balances, banktypes.Balance{Address: addr.String(), Coins: coins})
			baseAccount = authtypes.NewBaseAccountWithAddress(addr)

			periods = authvesting.Periods{
				authvesting.Period{Length: int64(0), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1000000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1000000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1000000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1000000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1000000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 1000000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 750000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
				authvesting.Period{Length: int64(period1Month), Amount: sdk.Coins{sdk.NewInt64Coin("token", 500000)}},
			}

			validatorIncentivesVestingAccount := authvesting.NewPeriodicVestingAccount(baseAccount, coins, int64(genesisTime), periods)
			genAccounts = append(genAccounts, validatorIncentivesVestingAccount)

			// Advisors allocation

			coins = sdk.Coins{sdk.NewInt64Coin("token", advisorsTokens)}

			info, err = kb.Key(advisorsAcc)
			if err != nil {
				return fmt.Errorf("failed to get address from Keybase: %w", err)
			}
			addr, err = info.GetAddress()
			if err != nil {
				return err
			}
			addrs = append(addrs, addr)

			balances = append(balances, banktypes.Balance{Address: addr.String(), Coins: coins})
			baseAccount = authtypes.NewBaseAccountWithAddress(addr)

			periods = authvesting.Periods{
				authvesting.Period{Length: int64(0), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2000000)}},
				authvesting.Period{Length: int64(period1Month * 4), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2000000)}},
				authvesting.Period{Length: int64(period1Month * 4), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2000000)}},
				authvesting.Period{Length: int64(period1Month * 4), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2000000)}},
				authvesting.Period{Length: int64(period1Month * 4), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2000000)}},
				authvesting.Period{Length: int64(period1Month * 4), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2000000)}},
				authvesting.Period{Length: int64(period1Month * 4), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2000000)}},
				authvesting.Period{Length: int64(period1Month * 4), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2000000)}},
				authvesting.Period{Length: int64(period1Month * 4), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2000000)}},
				authvesting.Period{Length: int64(period1Month * 4), Amount: sdk.Coins{sdk.NewInt64Coin("token", 2000000)}},
			}

			advisorsVestingAccount := authvesting.NewPeriodicVestingAccount(baseAccount, coins, int64(genesisTime), periods)
			genAccounts = append(genAccounts, advisorsVestingAccount)

			for _, genAccount := range genAccounts {
				if err := genAccount.Validate(); err != nil {
					return fmt.Errorf("failed to validate new genesis account: %w", err)
				}
			}

			genFile := config.GenesisFile()
			appState, genDoc, err := genutiltypes.GenesisStateFromGenFile(genFile)
			if err != nil {
				return fmt.Errorf("failed to unmarshal genesis state: %w", err)
			}

			authGenState := authtypes.GetGenesisStateFromAppState(cdc, appState)

			accs, err := authtypes.UnpackAccounts(authGenState.Accounts)
			if err != nil {
				return fmt.Errorf("failed to get accounts from any: %w", err)
			}

			for _, addr := range addrs {
				if accs.Contains(addr) {
					return fmt.Errorf("cannot add account at existing address %s", addr)
				}
			}

			// Add the new account to the set of genesis accounts and sanitize the
			// accounts afterwards.
			accs = append(accs, genAccounts...)
			accs = authtypes.SanitizeGenesisAccounts(accs)

			genAccs, err := authtypes.PackAccounts(accs)
			if err != nil {
				return fmt.Errorf("failed to convert accounts into any's: %w", err)
			}
			authGenState.Accounts = genAccs

			authGenStateBz, err := cdc.MarshalJSON(&authGenState)
			if err != nil {
				return fmt.Errorf("failed to marshal auth genesis state: %w", err)
			}

			appState[authtypes.ModuleName] = authGenStateBz

			bankGenState := banktypes.GetGenesisStateFromAppState(cdc, appState)
			bankGenState.Balances = append(bankGenState.Balances, balances...)
			bankGenState.Balances = banktypes.SanitizeGenesisBalances(bankGenState.Balances)

			bankGenStateBz, err := cdc.MarshalJSON(bankGenState)
			if err != nil {
				return fmt.Errorf("failed to marshal bank genesis state: %w", err)
			}

			appState[banktypes.ModuleName] = bankGenStateBz

			appStateJSON, err := json.Marshal(appState)
			if err != nil {
				return fmt.Errorf("failed to marshal application genesis state: %w", err)
			}

			genDoc.AppState = appStateJSON
			return genutil.ExportGenesisFile(genDoc, genFile)
		},
	}

	cmd.Flags().String(flags.FlagKeyringBackend, flags.DefaultKeyringBackend, "Select keyring's backend (os|file|kwallet|pass|test)")
	cmd.Flags().String(flags.FlagHome, defaultNodeHome, "The application home directory")
	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
