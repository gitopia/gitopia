package rewards

import (
	"math/rand"

	"cosmossdk.io/math"
	"github.com/cosmos/cosmos-sdk/baseapp"
	simappparams "github.com/cosmos/cosmos-sdk/simapp/params"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"
	"github.com/gitopia/gitopia/testutil/sample"
	rewardssimulation "github.com/gitopia/gitopia/x/rewards/simulation"
	"github.com/gitopia/gitopia/x/rewards/types"
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
	opWeightMsgCreateReward = "op_weight_msg_reward"
	// TODO: Determine the simulation weight value
	defaultWeightMsgCreateReward int = 100

	// this line is used by starport scaffolding # simapp/module/const
)

// GenerateGenesisState creates a randomized GenState of the module
func (AppModule) GenerateGenesisState(simState *module.SimulationState) {
	accs := make([]string, len(simState.Accounts))
	for i, acc := range simState.Accounts {
		accs[i] = acc.Address.String()
	}
	rewardsGenesis := types.GenesisState{
		Params: types.DefaultParams(),
		RewardsList: []types.Rewards{
			{
				Recipient: sample.AccAddress(),
				RewardsByCreator: map[string]*types.Reward{
					sample.AccAddress(): {
						TotalAmount:    &sdk.Coin{Amount: math.NewInt(100), Denom: "utlore"},
						ClaimedAmount:  &sdk.Coin{Amount: math.NewInt(75), Denom: "utlore"},
					},
				},
			},
			{

				Recipient: sample.AccAddress(),
				RewardsByCreator: map[string]*types.Reward{
					sample.AccAddress(): {
						TotalAmount:   &sdk.Coin{Amount: math.NewInt(530), Denom: "utlore"},
						ClaimedAmount: &sdk.Coin{Amount: math.NewInt(530), Denom: "utlore"},
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

	var weightMsgCreateReward int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgCreateReward, &weightMsgCreateReward, nil,
		func(_ *rand.Rand) {
			weightMsgCreateReward = defaultWeightMsgCreateReward
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgCreateReward,
		rewardssimulation.SimulateMsgCreateReward(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	// this line is used by starport scaffolding # simapp/module/operation

	return operations
}
