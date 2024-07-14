package app

import (
	"fmt"
	"io"
	"os"
	"path/filepath"
	"time"

	autocliv1 "cosmossdk.io/api/cosmos/autocli/v1"
	"cosmossdk.io/api/cosmos/crypto/ed25519"
	reflectionv1 "cosmossdk.io/api/cosmos/reflection/v1"
	dbm "github.com/cometbft/cometbft-db"
	abci "github.com/cometbft/cometbft/abci/types"
	"github.com/cometbft/cometbft/crypto"
	"github.com/cometbft/cometbft/libs/bytes"
	tmjson "github.com/cometbft/cometbft/libs/json"
	"github.com/cometbft/cometbft/libs/log"
	tmos "github.com/cometbft/cometbft/libs/os"
	tmproto "github.com/cometbft/cometbft/proto/tendermint/types"
	"github.com/cosmos/cosmos-sdk/baseapp"
	"github.com/cosmos/cosmos-sdk/client"
	nodeservice "github.com/cosmos/cosmos-sdk/client/grpc/node"
	"github.com/cosmos/cosmos-sdk/client/grpc/tmservice"
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/codec/types"
	runtimeservices "github.com/cosmos/cosmos-sdk/runtime/services"
	"github.com/cosmos/cosmos-sdk/server"
	"github.com/cosmos/cosmos-sdk/server/api"
	"github.com/cosmos/cosmos-sdk/server/config"
	servertypes "github.com/cosmos/cosmos-sdk/server/types"
	"github.com/cosmos/cosmos-sdk/testutil/testdata"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/bech32"
	"github.com/cosmos/cosmos-sdk/types/module"
	"github.com/cosmos/cosmos-sdk/version"
	"github.com/cosmos/cosmos-sdk/x/auth/ante"
	authtx "github.com/cosmos/cosmos-sdk/x/auth/tx"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	"github.com/cosmos/cosmos-sdk/x/crisis"
	distrtypes "github.com/cosmos/cosmos-sdk/x/distribution/types"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
	minttypes "github.com/cosmos/cosmos-sdk/x/mint/types"
	slashingtypes "github.com/cosmos/cosmos-sdk/x/slashing/types"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	upgradetypes "github.com/cosmos/cosmos-sdk/x/upgrade/types"
	gitopiaante "github.com/gitopia/gitopia/v4/ante"
	"github.com/gitopia/gitopia/v4/app/keepers"
	gitopiaappparams "github.com/gitopia/gitopia/v4/app/params"
	"github.com/gitopia/gitopia/v4/app/upgrades"
	v4 "github.com/gitopia/gitopia/v4/app/upgrades/v4"
	gitopiatypes "github.com/gitopia/gitopia/v4/x/gitopia/types"
	rewardstypes "github.com/gitopia/gitopia/v4/x/rewards/types"
	"github.com/spf13/cast"
)

const (
	AccountAddressPrefix = "gitopia"
	Name                 = "gitopia"
)

var (
	// DefaultNodeHome default home directories for the application daemon
	DefaultNodeHome string

	Upgrades = []upgrades.Upgrade{
		{
			UpgradeName:          "v3",
			CreateUpgradeHandler: upgrades.CreateUpgradeHandler,
		},
		{
			UpgradeName:          "v3.2.0",
			CreateUpgradeHandler: upgrades.CreateUpgradeHandler,
		},
		{
			UpgradeName:          "v3.3.0",
			CreateUpgradeHandler: upgrades.CreateUpgradeHandler,
		},
		v4.Upgrade,
	}
)

var (
	_ servertypes.Application = (*GitopiaApp)(nil)
)

func init() {
	userHomeDir, err := os.UserHomeDir()
	if err != nil {
		panic(err)
	}

	DefaultNodeHome = filepath.Join(userHomeDir, "."+Name)
}

// App extends an ABCI application, but with most of its parameters exported.
// They are exported for convenience in creating helper functions, as object
// capabilities aren't needed for testing.
type GitopiaApp struct {
	*baseapp.BaseApp
	keepers.AppKeepers

	cdc               *codec.LegacyAmino
	appCodec          codec.Codec
	txConfig          client.TxConfig
	interfaceRegistry types.InterfaceRegistry

	invCheckPeriod uint

	// the module manager
	mm           *module.Manager
	configurator module.Configurator
}

// NewGitopia returns a reference to an initialized Gaia.
func NewGitopiaApp(
	logger log.Logger,
	db dbm.DB,
	traceStore io.Writer,
	loadLatest bool,
	skipUpgradeHeights map[int64]bool,
	homePath string,
	encodingConfig gitopiaappparams.EncodingConfig,
	appOpts servertypes.AppOptions,
	baseAppOptions ...func(*baseapp.BaseApp),
) *GitopiaApp {
	appCodec := encodingConfig.Codec
	cdc := encodingConfig.Amino
	interfaceRegistry := encodingConfig.InterfaceRegistry
	txConfig := encodingConfig.TxConfig
	skipGenesisInvariants := cast.ToBool(appOpts.Get(crisis.FlagSkipGenesisInvariants))
	invCheckPeriod := cast.ToUint(appOpts.Get(server.FlagInvCheckPeriod))
	bApp := baseapp.NewBaseApp(
		Name,
		logger,
		db,
		txConfig.TxDecoder(),
		baseAppOptions...)
	bApp.SetCommitMultiStoreTracer(traceStore)
	bApp.SetVersion(version.Version)
	bApp.SetInterfaceRegistry(interfaceRegistry)
	bApp.SetTxEncoder(txConfig.TxEncoder())

	app := &GitopiaApp{
		BaseApp:           bApp,
		cdc:               cdc,
		txConfig:          txConfig,
		appCodec:          appCodec,
		interfaceRegistry: interfaceRegistry,
		invCheckPeriod:    invCheckPeriod,
	}
	// Setup keepers
	app.AppKeepers = keepers.NewAppKeeper(
		appCodec,
		bApp,
		cdc,
		maccPerms,
		app.BlockedModuleAccountAddrs(),
		skipUpgradeHeights,
		homePath,
		invCheckPeriod,
		logger,
		appOpts,
	)

	// NOTE: Any module instantiated in the module manager that is later modified
	// must be passed by reference here.
	app.mm = module.NewManager(appModules(app, encodingConfig, skipGenesisInvariants)...)

	// During begin block slashing happens after distr.BeginBlocker so that
	// there is nothing left over in the validator fee pool, so as to keep the
	// CanWithdrawInvariant invariant.
	// NOTE: staking module is required if HistoricalEntries param > 0
	// NOTE: capability module's beginblocker must come before any modules using capabilities (e.g. IBC)
	// Tell the app's module manager how to set the order of BeginBlockers, which are run at the beginning of every block.
	app.mm.SetOrderBeginBlockers(orderBeginBlockers()...)

	app.mm.SetOrderEndBlockers(orderEndBlockers()...)

	// NOTE: The genutils module must occur after staking so that pools are
	// properly initialized with tokens from genesis accounts.
	// NOTE: The genutils module must also occur after auth so that it can access the params from auth.
	// NOTE: Capability module must occur first so that it can initialize any capabilities
	// so that other modules that want to create or claim capabilities afterwards in InitChain
	// can do so safely.
	app.mm.SetOrderInitGenesis(orderInitBlockers()...)

	// Uncomment if you want to set a custom migration order here.
	// app.mm.SetOrderMigrations(custom order)

	app.mm.RegisterInvariants(app.CrisisKeeper)

	app.configurator = module.NewConfigurator(app.appCodec, app.MsgServiceRouter(), app.GRPCQueryRouter())
	app.mm.RegisterServices(app.configurator)

	autocliv1.RegisterQueryServer(app.GRPCQueryRouter(), runtimeservices.NewAutoCLIQueryService(app.mm.Modules))

	reflectionSvc, err := runtimeservices.NewReflectionService()
	if err != nil {
		panic(err)
	}
	reflectionv1.RegisterReflectionServiceServer(app.GRPCQueryRouter(), reflectionSvc)

	// add test gRPC service for testing gRPC queries in isolation
	testdata.RegisterQueryServer(app.GRPCQueryRouter(), testdata.QueryImpl{})

	// initialize stores
	app.MountKVStores(app.GetKVStoreKey())
	app.MountTransientStores(app.GetTransientStoreKey())
	app.MountMemoryStores(app.GetMemoryStoreKey())
	anteHandler, err := gitopiaante.NewAnteHandler(
		gitopiaante.HandlerOptions{
			HandlerOptions: ante.HandlerOptions{
				AccountKeeper:   app.AccountKeeper,
				BankKeeper:      app.BankKeeper,
				SignModeHandler: encodingConfig.TxConfig.SignModeHandler(),
				FeegrantKeeper:  app.FeeGrantKeeper,
				SigGasConsumer:  ante.DefaultSigVerificationGasConsumer,
			},
			Codec:     appCodec,
			IBCkeeper: app.IBCKeeper,
		},
	)
	if err != nil {
		panic(err)
	}

	app.SetAnteHandler(anteHandler)
	app.SetInitChainer(app.InitChainer)
	app.SetBeginBlocker(app.BeginBlocker)
	app.SetEndBlocker(app.EndBlocker)

	app.setupUpgradeHandlers()
	app.setupUpgradeStoreLoaders()

	if loadLatest {
		if err := app.LoadLatestVersion(); err != nil {
			tmos.Exit(err.Error())
		}
	}

	return app
}

// InitGitopiaAppForTestnet is broken down into two sections:
// Required Changes: Changes that, if not made, will cause the testnet to halt or panic
// Optional Changes: Changes to customize the testnet to one's liking (lower vote times, fund accounts, etc)
func InitGitopiaAppForTestnet(app *GitopiaApp, newValAddr bytes.HexBytes, newValPubKey crypto.PubKey, newOperatorAddress, upgradeToTrigger string) *GitopiaApp {
	//
	// Required Changes:
	//

	ctx := app.BaseApp.NewUncachedContext(true, tmproto.Header{})
	pubkey := &ed25519.PubKey{Key: newValPubKey.Bytes()}
	pubkeyAny, err := types.NewAnyWithValue(pubkey)
	if err != nil {
		tmos.Exit(err.Error())
	}

	// STAKING
	//

	// Create Validator struct for our new validator.
	_, bz, err := bech32.DecodeAndConvert(newOperatorAddress)
	if err != nil {
		tmos.Exit(err.Error())
	}
	bech32Addr, err := bech32.ConvertAndEncode("osmovaloper", bz)
	if err != nil {
		tmos.Exit(err.Error())
	}
	newVal := stakingtypes.Validator{
		OperatorAddress: bech32Addr,
		ConsensusPubkey: pubkeyAny,
		Jailed:          false,
		Status:          stakingtypes.Bonded,
		Tokens:          sdk.NewInt(900000000000000),
		DelegatorShares: sdk.MustNewDecFromStr("10000000"),
		Description: stakingtypes.Description{
			Moniker: "Testnet Validator",
		},
		Commission: stakingtypes.Commission{
			CommissionRates: stakingtypes.CommissionRates{
				Rate:          sdk.MustNewDecFromStr("0.05"),
				MaxRate:       sdk.MustNewDecFromStr("0.1"),
				MaxChangeRate: sdk.MustNewDecFromStr("0.05"),
			},
		},
		MinSelfDelegation: sdk.OneInt(),
	}

	// Remove all validators from power store
	stakingKey := app.GetKey(stakingtypes.ModuleName)
	stakingStore := ctx.KVStore(stakingKey)
	iterator := app.StakingKeeper.ValidatorsPowerStoreIterator(ctx)
	for ; iterator.Valid(); iterator.Next() {
		stakingStore.Delete(iterator.Key())
	}
	iterator.Close()

	// Remove all valdiators from last validators store
	iterator = app.StakingKeeper.LastValidatorsIterator(ctx)
	for ; iterator.Valid(); iterator.Next() {
		stakingStore.Delete(iterator.Key())
	}
	iterator.Close()

	// Add our validator to power and last validators store
	app.StakingKeeper.SetValidator(ctx, newVal)
	err = app.StakingKeeper.SetValidatorByConsAddr(ctx, newVal)
	if err != nil {
		tmos.Exit(err.Error())
	}
	app.StakingKeeper.SetValidatorByPowerIndex(ctx, newVal)
	app.StakingKeeper.SetLastValidatorPower(ctx, newVal.GetOperator(), 0)
	if err := app.StakingKeeper.Hooks().AfterValidatorCreated(ctx, newVal.GetOperator()); err != nil {
		panic(err)
	}

	// DISTRIBUTION
	//

	// Initialize records for this validator across all distribution stores
	app.DistrKeeper.SetValidatorHistoricalRewards(ctx, newVal.GetOperator(), 0, distrtypes.NewValidatorHistoricalRewards(sdk.DecCoins{}, 1))
	app.DistrKeeper.SetValidatorCurrentRewards(ctx, newVal.GetOperator(), distrtypes.NewValidatorCurrentRewards(sdk.DecCoins{}, 1))
	app.DistrKeeper.SetValidatorAccumulatedCommission(ctx, newVal.GetOperator(), distrtypes.InitialValidatorAccumulatedCommission())
	app.DistrKeeper.SetValidatorOutstandingRewards(ctx, newVal.GetOperator(), distrtypes.ValidatorOutstandingRewards{Rewards: sdk.DecCoins{}})

	// SLASHING
	//

	// Set validator signing info for our new validator.
	newConsAddr := sdk.ConsAddress(newValAddr.Bytes())
	newValidatorSigningInfo := slashingtypes.ValidatorSigningInfo{
		Address:     newConsAddr.String(),
		StartHeight: app.LastBlockHeight() - 1,
		Tombstoned:  false,
	}
	app.SlashingKeeper.SetValidatorSigningInfo(ctx, newConsAddr, newValidatorSigningInfo)

	//
	// Optional Changes:
	//

	// GOV
	//

	newVotingPeriod := time.Minute * 2

	govParams := app.GovKeeper.GetParams(ctx)
	govParams.VotingPeriod = &newVotingPeriod
	govParams.MinDeposit = sdk.NewCoins(sdk.NewInt64Coin("uosmo", 100000000))

	err = app.GovKeeper.SetParams(ctx, govParams)
	if err != nil {
		tmos.Exit(err.Error())
	}

	// BANK
	//

	defaultCoins := sdk.NewCoins(
		sdk.NewInt64Coin("ibc/0CD3A0285E1341859B5E86B6AB7682F023D03E97607CCC1DC95706411D866DF7", 1000000000000), // DAI
		sdk.NewInt64Coin("uosmo", 1000000000000),
		sdk.NewInt64Coin("uion", 1000000000))

	localGitopiaAccounts := []sdk.AccAddress{
		sdk.MustAccAddressFromBech32("osmo12smx2wdlyttvyzvzg54y2vnqwq2qjateuf7thj"),
		sdk.MustAccAddressFromBech32("osmo1cyyzpxplxdzkeea7kwsydadg87357qnahakaks"),
		sdk.MustAccAddressFromBech32("osmo18s5lynnmx37hq4wlrw9gdn68sg2uxp5rgk26vv"),
		sdk.MustAccAddressFromBech32("osmo1qwexv7c6sm95lwhzn9027vyu2ccneaqad4w8ka"),
		sdk.MustAccAddressFromBech32("osmo14hcxlnwlqtq75ttaxf674vk6mafspg8xwgnn53"),
		sdk.MustAccAddressFromBech32("osmo12rr534cer5c0vj53eq4y32lcwguyy7nndt0u2t"),
		sdk.MustAccAddressFromBech32("osmo1nt33cjd5auzh36syym6azgc8tve0jlvklnq7jq"),
		sdk.MustAccAddressFromBech32("osmo10qfrpash5g2vk3hppvu45x0g860czur8ff5yx0"),
		sdk.MustAccAddressFromBech32("osmo1f4tvsdukfwh6s9swrc24gkuz23tp8pd3e9r5fa"),
		sdk.MustAccAddressFromBech32("osmo1myv43sqgnj5sm4zl98ftl45af9cfzk7nhjxjqh"),
		sdk.MustAccAddressFromBech32("osmo14gs9zqh8m49yy9kscjqu9h72exyf295afg6kgk"),
		sdk.MustAccAddressFromBech32("osmo1jllfytsz4dryxhz5tl7u73v29exsf80vz52ucc")}

	// Fund localosmosis accounts
	for _, account := range localGitopiaAccounts {
		err := app.BankKeeper.MintCoins(ctx, minttypes.ModuleName, defaultCoins)
		if err != nil {
			tmos.Exit(err.Error())
		}
		err = app.BankKeeper.SendCoinsFromModuleToAccount(ctx, minttypes.ModuleName, account, defaultCoins)
		if err != nil {
			tmos.Exit(err.Error())
		}
	}

	// Fund edgenet faucet
	faucetCoins := sdk.NewCoins(
		sdk.NewInt64Coin("ibc/0CD3A0285E1341859B5E86B6AB7682F023D03E97607CCC1DC95706411D866DF7", 1000000000000000), // DAI
		sdk.NewInt64Coin("uosmo", 1000000000000000),
		sdk.NewInt64Coin("uion", 1000000000000))
	err = app.BankKeeper.MintCoins(ctx, minttypes.ModuleName, faucetCoins)
	if err != nil {
		tmos.Exit(err.Error())
	}
	err = app.BankKeeper.SendCoinsFromModuleToAccount(ctx, minttypes.ModuleName, sdk.MustAccAddressFromBech32("osmo1rqgf207csps822qwmd3k2n6k6k4e99w502e79t"), faucetCoins)
	if err != nil {
		tmos.Exit(err.Error())
	}

	// Mars bank account
	marsCoins := sdk.NewCoins(
		sdk.NewInt64Coin("uosmo", 10000000000000),
		sdk.NewInt64Coin("ibc/903A61A498756EA560B85A85132D3AEE21B5DEDD41213725D22ABF276EA6945E", 400000000000),
		sdk.NewInt64Coin("ibc/D189335C6E4A68B513C10AB227BF1C1D38C746766278BA3EEB4FB14124F1D858", 3000000000000),
		sdk.NewInt64Coin("ibc/C140AFD542AE77BD7DCC83F13FDD8C5E5BB8C4929785E6EC2F4C636F98F17901", 200000000000),
		sdk.NewInt64Coin("ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2", 700000000000),
		sdk.NewInt64Coin("ibc/D1542AA8762DB13087D8364F3EA6509FD6F009A34F00426AF9E4F9FA85CBBF1F", 2000000000),
		sdk.NewInt64Coin("ibc/EA1D43981D5C9A1C4AAEA9C23BB1D4FA126BA9BC7020A25E0AE4AA841EA25DC5", 3000000000000000000))
	err = app.BankKeeper.MintCoins(ctx, minttypes.ModuleName, marsCoins)
	if err != nil {
		tmos.Exit(err.Error())
	}
	err = app.BankKeeper.SendCoinsFromModuleToAccount(ctx, minttypes.ModuleName, sdk.MustAccAddressFromBech32("osmo1ev02crc36675xd8s029qh7wg3wjtfk37jr004z"), marsCoins)
	if err != nil {
		tmos.Exit(err.Error())
	}

	// UPGRADE
	//

	if upgradeToTrigger != "" {
		upgradePlan := upgradetypes.Plan{
			Name:   upgradeToTrigger,
			Height: app.LastBlockHeight(),
		}
		err = app.UpgradeKeeper.ScheduleUpgrade(ctx, upgradePlan)
		if err != nil {
			panic(err)
		}
	}

	return app
}

// Name returns the name of the App
func (app *GitopiaApp) Name() string { return app.BaseApp.Name() }

// BeginBlocker application updates every begin block
func (app *GitopiaApp) BeginBlocker(ctx sdk.Context, req abci.RequestBeginBlock) abci.ResponseBeginBlock {
	return app.mm.BeginBlock(ctx, req)
}

// EndBlocker application updates every end block
func (app *GitopiaApp) EndBlocker(ctx sdk.Context, req abci.RequestEndBlock) abci.ResponseEndBlock {
	return app.mm.EndBlock(ctx, req)
}

// InitChainer application update at chain initialization
func (app *GitopiaApp) InitChainer(ctx sdk.Context, req abci.RequestInitChain) abci.ResponseInitChain {
	var genesisState GenesisState

	if err := tmjson.Unmarshal(req.AppStateBytes, &genesisState); err != nil {
		panic(err)
	}
	app.UpgradeKeeper.SetModuleVersionMap(ctx, app.mm.GetVersionMap())

	return app.mm.InitGenesis(ctx, app.appCodec, genesisState)
}

// LoadHeight loads a particular height
func (app *GitopiaApp) LoadHeight(height int64) error {
	return app.LoadVersion(height)
}

// ModuleAccountAddrs returns all the app's module account addresses.
func (app *GitopiaApp) ModuleAccountAddrs() map[string]bool {
	modAccAddrs := make(map[string]bool)
	for acc := range maccPerms {
		modAccAddrs[authtypes.NewModuleAddress(acc).String()] = true
	}

	return modAccAddrs
}

// BlockedModuleAccountAddrs returns all the app's blocked module account
// addresses.
func (app *GitopiaApp) BlockedModuleAccountAddrs() map[string]bool {
	modAccAddrs := app.ModuleAccountAddrs()

	// remove module accounts that are ALLOWED to received funds
	//
	// TODO: Blocked on updating to v0.46.x
	// delete(modAccAddrs, authtypes.NewModuleAddress(grouptypes.ModuleName).String())
	delete(modAccAddrs, authtypes.NewModuleAddress(govtypes.ModuleName).String())
	delete(modAccAddrs, authtypes.NewModuleAddress(gitopiatypes.TeamAccountName).String())
	delete(modAccAddrs, authtypes.NewModuleAddress(gitopiatypes.LiquidityBootstrappingPoolAccountName).String())
	delete(modAccAddrs, authtypes.NewModuleAddress(gitopiatypes.EcosystemIncentivesAccountName).String())
	delete(modAccAddrs, authtypes.NewModuleAddress(rewardstypes.SeriesModuleAccount(rewardstypes.Series_COSMOS)).String())

	return modAccAddrs
}

// LegacyAmino returns SimApp's amino codec.
//
// NOTE: This is solely to be used for testing purposes as it may be desirable
// for modules to register their own custom testing types.
func (app *GitopiaApp) LegacyAmino() *codec.LegacyAmino {
	return app.cdc
}

// AppCodec returns Gaia's app codec.
//
// NOTE: This is solely to be used for testing purposes as it may be desirable
// for modules to register their own custom testing types.
func (app *GitopiaApp) AppCodec() codec.Codec {
	return app.appCodec
}

// InterfaceRegistry returns Gaia's InterfaceRegistry
func (app *GitopiaApp) InterfaceRegistry() types.InterfaceRegistry {
	return app.interfaceRegistry
}

// RegisterAPIRoutes registers all application module routes with the provided
// API server.
func (app *GitopiaApp) RegisterAPIRoutes(apiSvr *api.Server, apiConfig config.APIConfig) {
	clientCtx := apiSvr.ClientCtx

	// Register new tx routes from grpc-gateway.
	authtx.RegisterGRPCGatewayRoutes(clientCtx, apiSvr.GRPCGatewayRouter)

	// Register new tendermint queries routes from grpc-gateway.
	tmservice.RegisterGRPCGatewayRoutes(clientCtx, apiSvr.GRPCGatewayRouter)

	// Register grpc-gateway routes for all modules.
	ModuleBasics.RegisterGRPCGatewayRoutes(clientCtx, apiSvr.GRPCGatewayRouter)

	// Register nodeservice grpc-gateway routes.
	nodeservice.RegisterGRPCGatewayRoutes(clientCtx, apiSvr.GRPCGatewayRouter)
}

// RegisterTxService implements the Application.RegisterTxService method.
func (app *GitopiaApp) RegisterTxService(clientCtx client.Context) {
	authtx.RegisterTxService(app.BaseApp.GRPCQueryRouter(), clientCtx, app.BaseApp.Simulate, app.interfaceRegistry)
}

// RegisterTendermintService implements the Application.RegisterTendermintService method.
func (app *GitopiaApp) RegisterTendermintService(clientCtx client.Context) {
	tmservice.RegisterTendermintService(
		clientCtx,
		app.BaseApp.GRPCQueryRouter(),
		app.interfaceRegistry,
		app.Query,
	)
}
func (app *GitopiaApp) RegisterNodeService(clientCtx client.Context) {
	nodeservice.RegisterNodeService(clientCtx, app.GRPCQueryRouter())
}

// configure store loader that checks if version == upgradeHeight and applies store upgrades
func (app *GitopiaApp) setupUpgradeStoreLoaders() {
	upgradeInfo, err := app.UpgradeKeeper.ReadUpgradeInfoFromDisk()
	if err != nil {
		panic(fmt.Sprintf("failed to read upgrade info from disk %s", err))
	}

	if app.UpgradeKeeper.IsSkipHeight(upgradeInfo.Height) {
		return
	}

	for _, upgrade := range Upgrades {
		upgrade := upgrade
		if upgradeInfo.Name == upgrade.UpgradeName {
			storeUpgrades := upgrade.StoreUpgrades
			app.SetStoreLoader(upgradetypes.UpgradeStoreLoader(upgradeInfo.Height, &storeUpgrades))
		}
	}
}

func (app *GitopiaApp) setupUpgradeHandlers() {
	for _, upgrade := range Upgrades {
		app.UpgradeKeeper.SetUpgradeHandler(
			upgrade.UpgradeName,
			upgrade.CreateUpgradeHandler(
				app.mm,
				app.configurator,
				&app.AppKeepers,
			),
		)
	}
}

// GetMaccPerms returns a copy of the module account permissions
func GetMaccPerms() map[string][]string {
	dupMaccPerms := make(map[string][]string)
	for k, v := range maccPerms {
		dupMaccPerms[k] = v
	}
	return dupMaccPerms
}
