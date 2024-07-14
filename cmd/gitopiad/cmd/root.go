package cmd

import (
	"fmt"
	"io"
	"os"
	"path/filepath"

	rosettaCmd "cosmossdk.io/tools/rosetta/cmd"

	tmcfg "github.com/cometbft/cometbft/config"
	"github.com/cometbft/cometbft/crypto"
	"github.com/cometbft/cometbft/libs/bytes"
	tmtypes "github.com/cometbft/cometbft/types"
	"github.com/cosmos/cosmos-sdk/baseapp"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/config"
	"github.com/cosmos/cosmos-sdk/client/debug"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/keys"
	"github.com/cosmos/cosmos-sdk/client/rpc"
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/server"
	serverconfig "github.com/cosmos/cosmos-sdk/server/config"
	servertypes "github.com/cosmos/cosmos-sdk/server/types"
	"github.com/cosmos/cosmos-sdk/snapshots"
	snapshotsTypes "github.com/cosmos/cosmos-sdk/snapshots/types"
	"github.com/cosmos/cosmos-sdk/store"
	sdk "github.com/cosmos/cosmos-sdk/types"
	authcmd "github.com/cosmos/cosmos-sdk/x/auth/client/cli"
	"github.com/cosmos/cosmos-sdk/x/auth/types"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	"github.com/cosmos/cosmos-sdk/x/crisis"
	genutil "github.com/cosmos/cosmos-sdk/x/genutil"
	genutilcli "github.com/cosmos/cosmos-sdk/x/genutil/client/cli"
	genutiltypes "github.com/cosmos/cosmos-sdk/x/genutil/types"
	upgradetypes "github.com/cosmos/cosmos-sdk/x/upgrade/types"
	gitopia "github.com/gitopia/gitopia/v4/app"
	"github.com/gitopia/gitopia/v4/app/params"
	gitopiaappparams "github.com/gitopia/gitopia/v4/app/params"
	v4 "github.com/gitopia/gitopia/v4/app/upgrades/v4"
	"github.com/spf13/cast"
	"github.com/spf13/cobra"

	dbm "github.com/cometbft/cometbft-db"
	tmcmds "github.com/cometbft/cometbft/cmd/cometbft/commands"
	tmcli "github.com/cometbft/cometbft/libs/cli"
	"github.com/cometbft/cometbft/libs/log"
)

// NewRootCmd creates a new root command for simd. It is called once in the
// main function.
func NewRootCmd() (*cobra.Command, params.EncodingConfig) {
	encodingConfig := gitopia.MakeEncodingConfig()
	initClientCtx := client.Context{}.
		WithCodec(encodingConfig.Codec).
		WithInterfaceRegistry(encodingConfig.InterfaceRegistry).
		WithTxConfig(encodingConfig.TxConfig).
		WithLegacyAmino(encodingConfig.Amino).
		WithInput(os.Stdin).
		WithAccountRetriever(types.AccountRetriever{}).
		WithBroadcastMode(flags.BroadcastSync).
		WithHomeDir(gitopia.DefaultNodeHome).
		WithViper("GITOPIA")

	rootCmd := &cobra.Command{
		Use:   "gitopiad",
		Short: "Start gitopia app",
		PersistentPreRunE: func(cmd *cobra.Command, _ []string) error {
			cmd.SetOut(cmd.OutOrStdout())
			cmd.SetErr(cmd.ErrOrStderr())

			initClientCtx, err := client.ReadPersistentCommandFlags(initClientCtx, cmd.Flags())
			if err != nil {
				return err
			}
			initClientCtx, err = config.ReadFromClientConfig(initClientCtx)
			if err != nil {
				return err
			}

			if err := client.SetCmdClientContextHandler(initClientCtx, cmd); err != nil {
				return err
			}
			customAppTemplate, customAppConfig := initAppConfig()
			customTMConfig := initTendermintConfig()
			return server.InterceptConfigsPreRunHandler(cmd, customAppTemplate, customAppConfig, customTMConfig)
		},
		SilenceUsage: true,
	}

	initRootCmd(rootCmd, encodingConfig)

	return rootCmd, encodingConfig
}

// initTendermintConfig helps to override default Tendermint Config values.
// return tmcfg.DefaultConfig if no custom configuration is required for the application.
func initTendermintConfig() *tmcfg.Config {
	cfg := tmcfg.DefaultConfig()

	// these values put a higher strain on node memory
	// cfg.P2P.MaxNumInboundPeers = 100
	// cfg.P2P.MaxNumOutboundPeers = 40

	return cfg
}

// initAppConfig helps to override default appConfig template and configs.
// return "", nil if no custom configuration is required for the application.
func initAppConfig() (string, interface{}) {
	GitopiaAppTemplate := serverconfig.DefaultConfigTemplate

	type CustomAppConfig struct {
		serverconfig.Config
	}

	srvCfg := serverconfig.DefaultConfig()
	srvCfg.StateSync.SnapshotInterval = 1500
	srvCfg.StateSync.SnapshotKeepRecent = 2
	srvCfg.MinGasPrices = "0.001" + params.BaseCoinUnit

	GitopiaAppCfg := CustomAppConfig{Config: *srvCfg}

	return GitopiaAppTemplate, GitopiaAppCfg
}

func initRootCmd(rootCmd *cobra.Command, encodingConfig params.EncodingConfig) {

	cfg := sdk.GetConfig()
	cfg.Seal()

	debugCmd := debug.Cmd()
	gentxModule, ok := gitopia.ModuleBasics[genutiltypes.ModuleName].(genutil.AppModuleBasic)
	if !ok {
		panic(fmt.Errorf("expected %s module to be an instance of type %T", genutiltypes.ModuleName, genutil.AppModuleBasic{}))
	}
	rootCmd.AddCommand(
		// genutilcli.InitCmd(gitopia.ModuleBasics, gitopia.DefaultNodeHome),
		InitCmd(gitopia.ModuleBasics, gitopia.DefaultNodeHome),
		genutilcli.CollectGenTxsCmd(banktypes.GenesisBalancesIterator{}, gitopia.DefaultNodeHome, gentxModule.GenTxValidator),
		genutilcli.MigrateGenesisCmd(),
		// GenerateGenesisCmd(),
		AddGenesisAccountCmd(gitopia.DefaultNodeHome),
		genutilcli.GenTxCmd(gitopia.ModuleBasics, encodingConfig.TxConfig, banktypes.GenesisBalancesIterator{}, gitopia.DefaultNodeHome),
		genutilcli.ValidateGenesisCmd(gitopia.ModuleBasics),
		tmcli.NewCompletionCmd(rootCmd, true),
		tmcmds.RollbackStateCmd,
		debugCmd,
		config.Cmd(),
	)

	server.AddCommands(rootCmd, gitopia.DefaultNodeHome, newApp, createGitopiaAppAndExport, addModuleInitFlags)
	server.AddTestnetCreatorCommand(rootCmd, gitopia.DefaultNodeHome, newTestnetApp, addModuleInitFlags)

	// add keybase, auxiliary RPC, query, and tx child commands
	rootCmd.AddCommand(
		rpc.StatusCommand(),
		queryCommand(),
		txCommand(),
		keys.Commands(gitopia.DefaultNodeHome),
	)
	// add rosetta
	rootCmd.AddCommand(rosettaCmd.RosettaCommand(encodingConfig.InterfaceRegistry, encodingConfig.Codec))
}

func addModuleInitFlags(startCmd *cobra.Command) {
	crisis.AddModuleInitFlags(startCmd)
}

func queryCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:                        "query",
		Aliases:                    []string{"q"},
		Short:                      "Querying subcommands",
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}

	cmd.AddCommand(
		authcmd.GetAccountCmd(),
		rpc.ValidatorCommand(),
		rpc.BlockCommand(),
		authcmd.QueryTxsByEventsCmd(),
		authcmd.QueryTxCmd(),
	)

	gitopia.ModuleBasics.AddQueryCommands(cmd)
	cmd.PersistentFlags().String(flags.FlagChainID, "", "The network chain ID")

	return cmd
}

func txCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:                        "tx",
		Short:                      "Transactions subcommands",
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}

	cmd.AddCommand(
		authcmd.GetSignCommand(),
		authcmd.GetSignBatchCommand(),
		authcmd.GetMultiSignCommand(),
		authcmd.GetValidateSignaturesCommand(),
		flags.LineBreak,
		authcmd.GetBroadcastCommand(),
		authcmd.GetEncodeCommand(),
		authcmd.GetDecodeCommand(),
		authcmd.GetAuxToFeeCommand(),
	)

	gitopia.ModuleBasics.AddTxCommands(cmd)
	cmd.PersistentFlags().String(flags.FlagChainID, "", "The network chain ID")

	return cmd
}

func newApp(logger log.Logger, db dbm.DB, traceStore io.Writer, appOpts servertypes.AppOptions) servertypes.Application {
	var cache sdk.MultiStorePersistentCache

	if cast.ToBool(appOpts.Get(server.FlagInterBlockCache)) {
		cache = store.NewCommitKVStoreCacheManager()
	}

	skipUpgradeHeights := make(map[int64]bool)
	for _, h := range cast.ToIntSlice(appOpts.Get(server.FlagUnsafeSkipUpgrades)) {
		skipUpgradeHeights[int64(h)] = true
	}

	pruningOpts, err := server.GetPruningOptionsFromFlags(appOpts)
	if err != nil {
		panic(err)
	}

	snapshotDir := filepath.Join(cast.ToString(appOpts.Get(flags.FlagHome)), "data", "snapshots")
	snapshotDB, err := dbm.NewDB("metadata", server.GetAppDBBackend(appOpts), snapshotDir)
	if err != nil {
		panic(err)
	}
	snapshotStore, err := snapshots.NewStore(snapshotDB, snapshotDir)
	if err != nil {
		panic(err)
	}
	homeDir := cast.ToString(appOpts.Get(flags.FlagHome))
	chainID := cast.ToString(appOpts.Get(flags.FlagChainID))
	if chainID == "" {
		// fallback to genesis chain-id
		appGenesis, err := tmtypes.GenesisDocFromFile(filepath.Join(homeDir, "config", "genesis.json"))
		if err != nil {
			panic(err)
		}

		chainID = appGenesis.ChainID
	}

	baseAppOptions := []func(*baseapp.BaseApp){
		baseapp.SetPruning(pruningOpts),
		baseapp.SetMinGasPrices(cast.ToString(appOpts.Get(server.FlagMinGasPrices))),
		baseapp.SetMinRetainBlocks(cast.ToUint64(appOpts.Get(server.FlagMinRetainBlocks))),
		baseapp.SetHaltHeight(cast.ToUint64(appOpts.Get(server.FlagHaltHeight))),
		baseapp.SetHaltTime(cast.ToUint64(appOpts.Get(server.FlagHaltTime))),
		baseapp.SetMinRetainBlocks(cast.ToUint64(appOpts.Get(server.FlagMinRetainBlocks))),
		baseapp.SetInterBlockCache(cache),
		baseapp.SetTrace(cast.ToBool(appOpts.Get(server.FlagTrace))),
		baseapp.SetIndexEvents(cast.ToStringSlice(appOpts.Get(server.FlagIndexEvents))),
		baseapp.SetSnapshot(snapshotStore, snapshotsTypes.SnapshotOptions{
			Interval:   cast.ToUint64(appOpts.Get(server.FlagStateSyncSnapshotInterval)),
			KeepRecent: cast.ToUint32(appOpts.Get(server.FlagStateSyncSnapshotKeepRecent)),
		}),
		baseapp.SetChainID(chainID),
	}

	// If this is an in place testnet, set any new stores that may exist
	if cast.ToBool(appOpts.Get(server.KeyIsTestnet)) {
		version := store.NewCommitMultiStore(db).LatestVersion() + 1
		fmt.Println("version", version)
		baseAppOptions = append(baseAppOptions, baseapp.SetStoreLoader(upgradetypes.UpgradeStoreLoader(version, &v4.Upgrade.StoreUpgrades)))
	}

	return gitopia.NewGitopiaApp(
		logger, db, traceStore, true, skipUpgradeHeights,
		cast.ToString(appOpts.Get(flags.FlagHome)),
		gitopiaappparams.EncodingConfig(gitopia.MakeEncodingConfig()), // Ideally, we would reuse the one created by NewRootCmd.
		appOpts,
		baseAppOptions...,
	)
}

// newTestnetApp starts by running the normal newApp method. From there, the app interface returned is modified in order
// for a testnet to be created from the provided app.
func newTestnetApp(logger log.Logger, db dbm.DB, traceStore io.Writer, appOpts servertypes.AppOptions) servertypes.Application {
	// Create an app and type cast to an GitopiaApp
	app := newApp(logger, db, traceStore, appOpts)
	gitopiaApp, ok := app.(*gitopia.GitopiaApp)
	if !ok {
		panic("app created from newApp is not of type gitopiaApp")
	}

	newValAddr, ok := appOpts.Get(server.KeyNewValAddr).(bytes.HexBytes)
	if !ok {
		panic("newValAddr is not of type bytes.HexBytes")
	}
	newValPubKey, ok := appOpts.Get(server.KeyUserPubKey).(crypto.PubKey)
	if !ok {
		panic("newValPubKey is not of type crypto.PubKey")
	}
	newOperatorAddress, ok := appOpts.Get(server.KeyNewOpAddr).(string)
	if !ok {
		panic("newOperatorAddress is not of type string")
	}
	upgradeToTrigger, ok := appOpts.Get(server.KeyTriggerTestnetUpgrade).(string)
	if !ok {
		panic("upgradeToTrigger is not of type string")
	}

	// Make modifications to the normal GitopiaApp required to run the network locally
	return gitopia.InitGitopiaAppForTestnet(gitopiaApp, newValAddr, newValPubKey, newOperatorAddress, upgradeToTrigger)
}

func createGitopiaAppAndExport(
	logger log.Logger, db dbm.DB, traceStore io.Writer, height int64, forZeroHeight bool, jailWhiteList []string,
	appOpts servertypes.AppOptions, modulesToExport []string) (servertypes.ExportedApp, error) {

	encCfg := gitopiaappparams.EncodingConfig(gitopia.MakeEncodingConfig())
	// Ideally, we would reuse the one created by NewRootCmd.
	encCfg.Codec = codec.NewProtoCodec(encCfg.InterfaceRegistry)
	var app *gitopia.GitopiaApp
	if height != -1 {
		app = gitopia.NewGitopiaApp(logger, db, traceStore, false, map[int64]bool{}, "", encCfg, appOpts)

		if err := app.LoadHeight(height); err != nil {
			return servertypes.ExportedApp{}, err
		}
	} else {
		app = gitopia.NewGitopiaApp(logger, db, traceStore, true, map[int64]bool{}, "", encCfg, appOpts)
	}

	return app.ExportAppStateAndValidators(forZeroHeight, jailWhiteList)
}
