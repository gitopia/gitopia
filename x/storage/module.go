package storage

import (
	"context"
	"encoding/json"
	"fmt"

	// this line is used by starport scaffolding # 1

	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	"github.com/spf13/cobra"

	abci "github.com/cometbft/cometbft/abci/types"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	appparams "github.com/gitopia/gitopia/v6/app/params"
	"github.com/gitopia/gitopia/v6/x/storage/client/cli"
	"github.com/gitopia/gitopia/v6/x/storage/keeper"
	"github.com/gitopia/gitopia/v6/x/storage/types"
)

var (
	_ module.AppModule      = AppModule{}
	_ module.AppModuleBasic = AppModuleBasic{}
)

// ----------------------------------------------------------------------------
// AppModuleBasic
// ----------------------------------------------------------------------------

// AppModuleBasic implements the AppModuleBasic interface that defines the independent methods a Cosmos SDK module needs to implement.
type AppModuleBasic struct {
	cdc codec.BinaryCodec
}

func NewAppModuleBasic(cdc codec.BinaryCodec) AppModuleBasic {
	return AppModuleBasic{cdc: cdc}
}

// Name returns the name of the module as a string
func (AppModuleBasic) Name() string {
	return types.ModuleName
}

// RegisterLegacyAminoCodec registers the amino codec for the module, which is used to marshal and unmarshal structs to/from []byte in order to persist them in the module's KVStore
func (AppModuleBasic) RegisterLegacyAminoCodec(cdc *codec.LegacyAmino) {
	types.RegisterCodec(cdc)
}

// RegisterInterfaces registers a module's interface types and their concrete implementations as proto.Message
func (a AppModuleBasic) RegisterInterfaces(reg cdctypes.InterfaceRegistry) {
	types.RegisterInterfaces(reg)
}

// DefaultGenesis returns a default GenesisState for the module, marshalled to json.RawMessage. The default GenesisState need to be defined by the module developer and is primarily used for testing
func (AppModuleBasic) DefaultGenesis(cdc codec.JSONCodec) json.RawMessage {
	return cdc.MustMarshalJSON(types.DefaultGenesis())
}

// ValidateGenesis used to validate the GenesisState, given in its json.RawMessage form
func (AppModuleBasic) ValidateGenesis(cdc codec.JSONCodec, config client.TxEncodingConfig, bz json.RawMessage) error {
	var genState types.GenesisState
	if err := cdc.UnmarshalJSON(bz, &genState); err != nil {
		return fmt.Errorf("failed to unmarshal %s genesis state: %w", types.ModuleName, err)
	}
	return genState.Validate()
}

// RegisterGRPCGatewayRoutes registers the gRPC Gateway routes for the module
func (AppModuleBasic) RegisterGRPCGatewayRoutes(clientCtx client.Context, mux *runtime.ServeMux) {
	types.RegisterQueryHandlerClient(context.Background(), mux, types.NewQueryClient(clientCtx))
}

// GetTxCmd returns the root Tx command for the module. The subcommands of this root command are used by end-users to generate new transactions containing messages defined in the module
func (a AppModuleBasic) GetTxCmd() *cobra.Command {
	return cli.GetTxCmd()
}

// GetQueryCmd returns the root query command for the module. The subcommands of this root command are used by end-users to generate new queries to the subset of the state defined by the module
func (AppModuleBasic) GetQueryCmd() *cobra.Command {
	return cli.GetQueryCmd(types.StoreKey)
}

// ----------------------------------------------------------------------------
// AppModule
// ----------------------------------------------------------------------------

// AppModule implements the AppModule interface that defines the inter-dependent methods that modules need to implement
type AppModule struct {
	AppModuleBasic

	keeper        keeper.Keeper
	accountKeeper types.AccountKeeper
	bankKeeper    types.BankKeeper
}

func NewAppModule(
	cdc codec.Codec,
	keeper keeper.Keeper,
	accountKeeper types.AccountKeeper,
	bankKeeper types.BankKeeper,
) AppModule {
	return AppModule{
		AppModuleBasic: NewAppModuleBasic(cdc),
		keeper:         keeper,
		accountKeeper:  accountKeeper,
		bankKeeper:     bankKeeper,
	}
}

// RegisterServices registers a gRPC query service to respond to the module-specific gRPC queries
func (am AppModule) RegisterServices(cfg module.Configurator) {
	types.RegisterMsgServer(cfg.MsgServer(), keeper.NewMsgServerImpl(am.keeper))
	types.RegisterQueryServer(cfg.QueryServer(), am.keeper)
}

// RegisterInvariants registers the invariants of the module. If an invariant deviates from its predicted value, the InvariantRegistry triggers appropriate logic (most often the chain will be halted)
func (am AppModule) RegisterInvariants(_ sdk.InvariantRegistry) {}

// InitGenesis performs the module's genesis initialization. It returns no validator updates.
func (am AppModule) InitGenesis(ctx sdk.Context, cdc codec.JSONCodec, gs json.RawMessage) []abci.ValidatorUpdate {
	var genState types.GenesisState
	// Initialize global index to index in genesis state
	cdc.MustUnmarshalJSON(gs, &genState)

	keeper.InitGenesis(ctx, am.keeper, genState)

	return []abci.ValidatorUpdate{}
}

// ExportGenesis returns the module's exported genesis state as raw JSON bytes.
func (am AppModule) ExportGenesis(ctx sdk.Context, cdc codec.JSONCodec) json.RawMessage {
	genState := keeper.ExportGenesis(ctx, am.keeper)
	return cdc.MustMarshalJSON(genState)
}

// ConsensusVersion is a sequence number for state-breaking change of the module. It should be incremented on each consensus-breaking change introduced by the module. To avoid wrong/empty versions, the initial version should be set to 1
func (AppModule) ConsensusVersion() uint64 { return 1 }

// BeginBlock contains the logic that is automatically triggered at the beginning of each block
func (am AppModule) BeginBlock(ctx sdk.Context, _ abci.RequestBeginBlock) {
	params := am.keeper.GetParams(ctx)

	// Calculate which block numbers should generate challenges
	currentBlockHeight := uint64(ctx.BlockHeight())
	challengeInterval := params.ChallengeIntervalBlocks

	if currentBlockHeight%challengeInterval == 0 { // Check if it's time to generate challenges
		challenge, err := am.keeper.GenerateChallenge(ctx)
		if err != nil {
			ctx.Logger().Error(fmt.Sprintf("error generating challenge: %v", err))
		}
		if challenge != nil {
			id := am.keeper.AppendChallenge(ctx, *challenge)
			ctx.Logger().Info(fmt.Sprintf("generated new challenge ID: %d for provider: %s", id, challenge.Provider))

			ctx.EventManager().EmitTypedEvent(&types.EventChallengeCreated{
				ChallengeId: id,
				Provider:    challenge.Provider,
			})
		}
	}
}

// EndBlock contains the logic that is automatically triggered at the end of each block
func (am AppModule) EndBlock(ctx sdk.Context, _ abci.RequestEndBlock) []abci.ValidatorUpdate {
	am.keeper.SetPreviousBlockInfo(ctx, &types.BlockInfo{
		Height:    uint32(ctx.BlockHeight()),
		Timestamp: ctx.BlockTime(),
	})

	// check last challenge expiration
	challenge, found := am.keeper.GetChallenge(ctx, am.keeper.GetChallengeCount(ctx)-1)
	if found && challenge.Status == types.ChallengeStatus_CHALLENGE_STATUS_PENDING && challenge.Deadline.Before(ctx.BlockTime()) {

		provider, found := am.keeper.GetProvider(ctx, challenge.Provider)
		if !found {
			return []abci.ValidatorUpdate{}
		}

		// Update provider stats for failed challenge
		provider.TotalChallenges++
		provider.ConsecutiveFailures++

		params := am.keeper.GetParams(ctx)

		// Check if provider should be suspended due to consecutive failures
		if provider.ConsecutiveFailures >= params.ConsecutiveFailsThreshold {
			// Suspend the provider
			provider.Status = types.ProviderStatus_PROVIDER_STATUS_SUSPENDED

			// Apply percentage-based slash for consecutive failures
			providerAcc, _ := sdk.AccAddressFromBech32(provider.Creator)
			providerStake := am.keeper.GetProviderStake(ctx, providerAcc)
			stakeAmount := providerStake.Stake.AmountOf(appparams.BaseCoinUnit)
			dec := sdk.NewDec(int64(stakeAmount.Int64()))
			slashAmount := dec.Mul(sdk.NewDec(int64(params.ConsecutiveFailsSlashPercentage))).Quo(sdk.NewDec(100))
			slashAmountCoins := sdk.NewCoins(sdk.NewCoin(appparams.BaseCoinUnit, slashAmount.TruncateInt()))

			// Transfer slashed amount to slash account
			am.bankKeeper.SendCoinsFromModuleToModule(ctx, types.StorageBondedPoolName, types.ChallengeSlashPoolName, slashAmountCoins)

			// Update provider stake
			am.keeper.SetProviderStake(ctx, providerAcc, types.ProviderStake{
				Stake: providerStake.Stake.Sub(slashAmountCoins[0]),
			})

			// Reset consecutive failures
			provider.ConsecutiveFailures = 0

			ctx.Logger().Info(fmt.Sprintf("provider %s suspended due to consecutive failures and slashed %s", provider.Creator, slashAmountCoins.String()))

			// Emit suspension event
			ctx.EventManager().EmitTypedEvent(&types.EventProviderStatusUpdated{
				Address: provider.Creator,
				Online:  false,
			})
		} else {
			// Apply regular challenge failure slash
			slashAmountCoins := sdk.NewCoins(params.ChallengeSlashAmount)
			am.bankKeeper.SendCoinsFromModuleToModule(ctx, types.StorageBondedPoolName, types.ChallengeSlashPoolName, slashAmountCoins)

			// Update provider stake
			providerAcc, _ := sdk.AccAddressFromBech32(provider.Creator)
			providerStake := am.keeper.GetProviderStake(ctx, providerAcc)
			am.keeper.SetProviderStake(ctx, providerAcc, types.ProviderStake{
				Stake: providerStake.Stake.Sub(slashAmountCoins[0]),
			})
		}

		am.keeper.SetProvider(ctx, provider)

		challenge.Status = types.ChallengeStatus_CHALLENGE_STATUS_FAILED
		am.keeper.SetChallenge(ctx, challenge)

		ctx.Logger().Info(fmt.Sprintf("provider %s failed challenge %d", provider.Creator, challenge.Id))
	}

	return []abci.ValidatorUpdate{}
}
