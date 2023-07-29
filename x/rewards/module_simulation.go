package rewards

import (
	"math/rand"

	"github.com/cosmos/cosmos-sdk/baseapp"
	simappparams "github.com/cosmos/cosmos-sdk/simapp/params"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"
	"github.com/gitopia/gitopia/v2/testutil/sample"
	rewardssimulation "github.com/gitopia/gitopia/v2/x/rewards/simulation"
	"github.com/gitopia/gitopia/v2/x/rewards/types"
)

// avoid unused import issue
var (
	_ = sample.AccAddress
	_ = rewardssimulation.FindAccount
	_ = simappparams.StakePerAccount
	_ = simulation.MsgEntryKind
	_ = baseapp.Paramspace
)

const (
	opWeightMsgClaim = "op_weight_msg_claim"
	// TODO: Determine the simulation weight value
	defaultWeightMsgClaim int = 100

	opWeightMsgCreateRewards = "op_weight_msg_rewards"
	// TODO: Determine the simulation weight value
	defaultWeightMsgCreateRewards int = 100

	// this line is used by starport scaffolding # simapp/module/const
)

// GenerateGenesisState creates a randomized GenState of the module
func (AppModule) GenerateGenesisState(simState *module.SimulationState) {
	accs := make([]string, len(simState.Accounts))
	for i, acc := range simState.Accounts {
		accs[i] = acc.Address.String()
	}
	rewardsGenesis := types.GenesisState{
		RewardsList: []types.Reward{
			{
				Recipient: "0",
				Rewards: []*types.RecipientReward{
					{
						Creator: sample.AccAddress(),
					},
				},
			},
			{
				Recipient: "1",
				Rewards: []*types.RecipientReward{
					{
						Creator: sample.AccAddress(),
					},
				},
			},
		},
		// this line is used by starport scaffolding # simapp/module/genesisState
	}
	simState.GenState[types.ModuleName] = simState.Cdc.MustMarshalJSON(&rewardsGenesis)
}

// ProposalContents doesn't return any content functions for governance proposals
func (AppModule) ProposalContents(_ module.SimulationState) []simtypes.WeightedProposalContent {
	return nil
}

// RandomizedParams creates randomized  param changes for the simulator
func (am AppModule) RandomizedParams(_ *rand.Rand) []simtypes.ParamChange {

	return []simtypes.ParamChange{}
}

// RegisterStoreDecoder registers a decoder
func (am AppModule) RegisterStoreDecoder(_ sdk.StoreDecoderRegistry) {}

// WeightedOperations returns the all the gov module operations with their respective weights.
func (am AppModule) WeightedOperations(simState module.SimulationState) []simtypes.WeightedOperation {
	operations := make([]simtypes.WeightedOperation, 0)
	var weightMsgClaim int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgClaim, &weightMsgClaim, nil,
		func(_ *rand.Rand) {
			weightMsgClaim = defaultWeightMsgClaim
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgClaim,
		rewardssimulation.SimulateMsgClaim(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgCreateRewards int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgCreateRewards, &weightMsgCreateRewards, nil,
		func(_ *rand.Rand) {
			weightMsgCreateRewards = defaultWeightMsgCreateRewards
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgCreateRewards,
		rewardssimulation.SimulateMsgCreateRewards(am.accountKeeper, am.bankKeeper, am.keeper),
	))
	// this line is used by starport scaffolding # simapp/module/operation

	return operations
}
