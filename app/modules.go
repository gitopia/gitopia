package app

import (
	"github.com/cosmos/cosmos-sdk/types/module"
	"github.com/cosmos/cosmos-sdk/x/auth"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	"github.com/cosmos/cosmos-sdk/x/auth/vesting"
	vestingtypes "github.com/cosmos/cosmos-sdk/x/auth/vesting/types"
	"github.com/cosmos/cosmos-sdk/x/authz"
	authzmodule "github.com/cosmos/cosmos-sdk/x/authz/module"
	"github.com/cosmos/cosmos-sdk/x/bank"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	"github.com/cosmos/cosmos-sdk/x/capability"
	capabilitytypes "github.com/cosmos/cosmos-sdk/x/capability/types"
	"github.com/cosmos/cosmos-sdk/x/consensus"
	consensusparamtypes "github.com/cosmos/cosmos-sdk/x/consensus/types"
	"github.com/cosmos/cosmos-sdk/x/crisis"
	crisistypes "github.com/cosmos/cosmos-sdk/x/crisis/types"
	distr "github.com/cosmos/cosmos-sdk/x/distribution"
	distrtypes "github.com/cosmos/cosmos-sdk/x/distribution/types"
	"github.com/cosmos/cosmos-sdk/x/evidence"
	evidencetypes "github.com/cosmos/cosmos-sdk/x/evidence/types"
	"github.com/cosmos/cosmos-sdk/x/feegrant"
	feegrantmodule "github.com/cosmos/cosmos-sdk/x/feegrant/module"
	"github.com/cosmos/cosmos-sdk/x/genutil"
	genutiltypes "github.com/cosmos/cosmos-sdk/x/genutil/types"
	"github.com/cosmos/cosmos-sdk/x/gov"
	govclient "github.com/cosmos/cosmos-sdk/x/gov/client"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
	"github.com/cosmos/cosmos-sdk/x/group"
	groupmodule "github.com/cosmos/cosmos-sdk/x/group/module"
	"github.com/cosmos/cosmos-sdk/x/mint"
	minttypes "github.com/cosmos/cosmos-sdk/x/mint/types"
	"github.com/cosmos/cosmos-sdk/x/params"
	paramsclient "github.com/cosmos/cosmos-sdk/x/params/client"
	paramstypes "github.com/cosmos/cosmos-sdk/x/params/types"
	"github.com/cosmos/cosmos-sdk/x/slashing"
	slashingtypes "github.com/cosmos/cosmos-sdk/x/slashing/types"
	"github.com/cosmos/cosmos-sdk/x/staking"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	"github.com/cosmos/cosmos-sdk/x/upgrade"
	upgradeclient "github.com/cosmos/cosmos-sdk/x/upgrade/client"
	upgradetypes "github.com/cosmos/cosmos-sdk/x/upgrade/types"
	ica "github.com/cosmos/ibc-go/v7/modules/apps/27-interchain-accounts"
	icatypes "github.com/cosmos/ibc-go/v7/modules/apps/27-interchain-accounts/types"
	"github.com/cosmos/ibc-go/v7/modules/apps/transfer"
	ibctransfertypes "github.com/cosmos/ibc-go/v7/modules/apps/transfer/types"
	ibc "github.com/cosmos/ibc-go/v7/modules/core"
	ibcclientclient "github.com/cosmos/ibc-go/v7/modules/core/02-client/client"
	ibcexported "github.com/cosmos/ibc-go/v7/modules/core/exported"
	ibctm "github.com/cosmos/ibc-go/v7/modules/light-clients/07-tendermint"
	gitopiaappparams "github.com/gitopia/gitopia/v6/app/params"
	"github.com/gitopia/gitopia/v6/x/gitopia"
	gitopiatypes "github.com/gitopia/gitopia/v6/x/gitopia/types"
	"github.com/gitopia/gitopia/v6/x/rewards"
	rewardtypes "github.com/gitopia/gitopia/v6/x/rewards/types"
	"github.com/gitopia/gitopia/v6/x/storage"
	storagetypes "github.com/gitopia/gitopia/v6/x/storage/types"
)

var maccPerms = map[string][]string{
	authtypes.FeeCollectorName:                                 nil,
	distrtypes.ModuleName:                                      nil,
	icatypes.ModuleName:                                        nil,
	minttypes.ModuleName:                                       {authtypes.Minter},
	stakingtypes.BondedPoolName:                                {authtypes.Burner, authtypes.Staking},
	stakingtypes.NotBondedPoolName:                             {authtypes.Burner, authtypes.Staking},
	govtypes.ModuleName:                                        {authtypes.Burner},
	ibctransfertypes.ModuleName:                                {authtypes.Minter, authtypes.Burner},
	gitopiatypes.MinterAccountName:                             nil,
	gitopiatypes.TeamAccountName:                               nil,
	gitopiatypes.PlatformAccountName:                           nil,
	gitopiatypes.LiquidityBootstrappingPoolAccountName:         {authtypes.Minter},
	gitopiatypes.EcosystemIncentivesAccountName:                {authtypes.Minter},
	gitopiatypes.CommunityPoolGenesisAccountName:               {authtypes.Minter},
	rewardtypes.SeriesModuleAccount(rewardtypes.Series_ONE):    {authtypes.Minter},
	rewardtypes.SeriesModuleAccount(rewardtypes.Series_TWO):    {authtypes.Minter},
	rewardtypes.SeriesModuleAccount(rewardtypes.Series_THREE):  {authtypes.Minter},
	rewardtypes.SeriesModuleAccount(rewardtypes.Series_FOUR):   {authtypes.Minter},
	rewardtypes.SeriesModuleAccount(rewardtypes.Series_FIVE):   {authtypes.Minter},
	rewardtypes.SeriesModuleAccount(rewardtypes.Series_SIX):    {authtypes.Minter},
	rewardtypes.SeriesModuleAccount(rewardtypes.Series_SEVEN):  {authtypes.Minter},
	rewardtypes.SeriesModuleAccount(rewardtypes.Series_COSMOS): nil,
	storagetypes.BurnAccountName:                               {authtypes.Burner},
}

// ModuleBasics defines the module BasicManager is in charge of setting up basic,
// non-dependant module elements, such as codec registration
// and genesis verification.
var ModuleBasics = module.NewBasicManager(
	auth.AppModuleBasic{},
	genutil.NewAppModuleBasic(genutiltypes.DefaultMessageValidator),
	bank.AppModuleBasic{},
	capability.AppModuleBasic{},
	staking.AppModuleBasic{},
	mint.AppModuleBasic{},
	distr.AppModuleBasic{},
	gov.NewAppModuleBasic(
		[]govclient.ProposalHandler{
			paramsclient.ProposalHandler,
			upgradeclient.LegacyProposalHandler,
			upgradeclient.LegacyCancelProposalHandler,
			ibcclientclient.UpdateClientProposalHandler,
			ibcclientclient.UpgradeProposalHandler,
		},
	),
	params.AppModuleBasic{},
	crisis.AppModuleBasic{},
	slashing.AppModuleBasic{},
	feegrantmodule.AppModuleBasic{},
	authzmodule.AppModuleBasic{},
	groupmodule.AppModuleBasic{},
	ibc.AppModuleBasic{},
	ibctm.AppModuleBasic{},
	upgrade.AppModuleBasic{},
	evidence.AppModuleBasic{},
	transfer.AppModuleBasic{},
	vesting.AppModuleBasic{},
	gitopia.AppModule{},
	rewards.AppModule{},
	consensus.AppModuleBasic{},
	ica.AppModuleBasic{},
	storage.AppModule{},
)

func appModules(
	app *GitopiaApp,
	encodingConfig gitopiaappparams.EncodingConfig,
	skipGenesisInvariants bool,
) []module.AppModule {
	appCodec := encodingConfig.Codec

	return []module.AppModule{
		genutil.NewAppModule(
			app.AccountKeeper,
			app.StakingKeeper,
			app.BaseApp.DeliverTx,
			encodingConfig.TxConfig,
		),
		auth.NewAppModule(appCodec, app.AccountKeeper, nil, app.GetSubspace(authtypes.ModuleName)),
		vesting.NewAppModule(app.AccountKeeper, app.BankKeeper),
		bank.NewAppModule(appCodec, app.BankKeeper, app.AccountKeeper, app.GetSubspace(banktypes.ModuleName)),
		capability.NewAppModule(appCodec, *app.CapabilityKeeper, false),
		crisis.NewAppModule(app.CrisisKeeper, skipGenesisInvariants, app.GetSubspace(crisistypes.ModuleName)),
		gov.NewAppModule(appCodec, &app.GovKeeper, app.AccountKeeper, app.BankKeeper, app.GetSubspace(govtypes.ModuleName)),
		mint.NewAppModule(appCodec, *app.MintKeeper, app.AccountKeeper, app.GitopiaKeeper.InflationFn, app.GetSubspace(minttypes.ModuleName)),
		slashing.NewAppModule(appCodec, app.SlashingKeeper, app.AccountKeeper, app.BankKeeper, app.StakingKeeper, app.GetSubspace(slashingtypes.ModuleName)),
		distr.NewAppModule(appCodec, *app.DistrKeeper, app.AccountKeeper, app.BankKeeper, app.StakingKeeper, app.GetSubspace(distrtypes.ModuleName)),
		staking.NewAppModule(appCodec, app.StakingKeeper, app.AccountKeeper, app.BankKeeper, app.GetSubspace(stakingtypes.ModuleName)),
		upgrade.NewAppModule(app.UpgradeKeeper),
		evidence.NewAppModule(app.EvidenceKeeper),
		feegrantmodule.NewAppModule(appCodec, app.AccountKeeper, app.BankKeeper, app.FeeGrantKeeper, app.interfaceRegistry),
		authzmodule.NewAppModule(appCodec, *app.AuthzKeeper, app.AccountKeeper, app.BankKeeper, app.interfaceRegistry),
		groupmodule.NewAppModule(appCodec, *app.GroupKeeper, app.AccountKeeper, app.BankKeeper, app.interfaceRegistry),
		ibc.NewAppModule(app.IBCKeeper),
		ica.NewAppModule(&app.ICAControllerKeeper, &app.ICAHostKeeper),
		params.NewAppModule(app.ParamsKeeper),
		transfer.NewAppModule(app.TransferKeeper),
		gitopia.NewAppModule(appCodec, app.GitopiaKeeper),
		rewards.NewAppModule(appCodec, app.RewardKeeper, app.AccountKeeper, app.BankKeeper),
		storage.NewAppModule(appCodec, app.StorageKeeper, app.AccountKeeper, app.BankKeeper),
	}
}

// orderBeginBlockers Tell the app's module manager how to set the order of
// BeginBlockers, which are run at the beginning of every block.
func orderBeginBlockers() []string {
	return []string{
		// upgrades should be run first
		upgradetypes.ModuleName,
		capabilitytypes.ModuleName,
		minttypes.ModuleName,
		// NOTE: must be ordered after mint module and before distribution module
		// this is required for minted token distribution
		gitopiatypes.ModuleName,
		distrtypes.ModuleName,
		slashingtypes.ModuleName,
		evidencetypes.ModuleName,
		stakingtypes.ModuleName,
		ibcexported.ModuleName,
		icatypes.ModuleName,
		feegrant.ModuleName,
		group.ModuleName,
		ibctransfertypes.ModuleName,
		authtypes.ModuleName,
		banktypes.ModuleName,
		govtypes.ModuleName,
		crisistypes.ModuleName,
		genutiltypes.ModuleName,
		authz.ModuleName,
		paramstypes.ModuleName,
		vestingtypes.ModuleName,
		rewardtypes.ModuleName,
		consensusparamtypes.ModuleName,
		storagetypes.ModuleName,
	}
}

func orderEndBlockers() []string {
	return []string{
		crisistypes.ModuleName,
		govtypes.ModuleName,
		stakingtypes.ModuleName,
		authz.ModuleName,
		capabilitytypes.ModuleName,
		authtypes.ModuleName,
		banktypes.ModuleName,
		distrtypes.ModuleName,
		slashingtypes.ModuleName,
		minttypes.ModuleName,
		genutiltypes.ModuleName,
		evidencetypes.ModuleName,
		paramstypes.ModuleName,
		upgradetypes.ModuleName,
		vestingtypes.ModuleName,
		ibcexported.ModuleName,
		icatypes.ModuleName,
		feegrant.ModuleName,
		group.ModuleName,
		ibctransfertypes.ModuleName,
		gitopiatypes.ModuleName,
		rewardtypes.ModuleName,
		consensusparamtypes.ModuleName,
		storagetypes.ModuleName,
	}
}

func orderInitBlockers() []string {
	return []string{
		capabilitytypes.ModuleName,
		authtypes.ModuleName,
		banktypes.ModuleName,
		distrtypes.ModuleName,
		govtypes.ModuleName,
		stakingtypes.ModuleName,
		slashingtypes.ModuleName,
		minttypes.ModuleName,
		crisistypes.ModuleName,
		ibcexported.ModuleName,
		icatypes.ModuleName,
		feegrant.ModuleName,
		group.ModuleName,
		genutiltypes.ModuleName,
		paramstypes.ModuleName,
		upgradetypes.ModuleName,
		vestingtypes.ModuleName,
		evidencetypes.ModuleName,
		ibctransfertypes.ModuleName,
		gitopiatypes.ModuleName,
		authz.ModuleName,
		rewardtypes.ModuleName,
		consensusparamtypes.ModuleName,
		storagetypes.ModuleName,
	}
}
