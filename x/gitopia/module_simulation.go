package gitopia

/*
import (
	"math/rand"

	"github.com/cosmos/cosmos-sdk/baseapp"
	simappparams "github.com/cosmos/cosmos-sdk/simapp/params"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"
	"github.com/gitopia/gitopia/v2/testutil/sample"
	gitopiasimulation "github.com/gitopia/gitopia/v2/x/gitopia/simulation"
	"github.com/gitopia/gitopia/v2/x/gitopia/types"
)

// avoid unused import issue
var (
	_ = sample.AccAddress
	_ = gitopiasimulation.FindAccount
	_ = simappparams.StakePerAccount
	_ = simulation.MsgEntryKind
	_ = baseapp.Paramspace
)

const (
	opWeightMsgCreateTag = "op_weight_msg_tag"
	// TODO: Determine the simulation weight value
	defaultWeightMsgCreateTag int = 100

	opWeightMsgUpdateTag = "op_weight_msg_tag"
	// TODO: Determine the simulation weight value
	defaultWeightMsgUpdateTag int = 100

	opWeightMsgDeleteTag = "op_weight_msg_tag"
	// TODO: Determine the simulation weight value
	defaultWeightMsgDeleteTag int = 100

	opWeightMsgCreateMember = "op_weight_msg_member"
	// TODO: Determine the simulation weight value
	defaultWeightMsgCreateMember int = 100

	opWeightMsgUpdateMember = "op_weight_msg_member"
	// TODO: Determine the simulation weight value
	defaultWeightMsgUpdateMember int = 100

	opWeightMsgDeleteMember = "op_weight_msg_member"
	// TODO: Determine the simulation weight value
	defaultWeightMsgDeleteMember int = 100

	opWeightMsgToggleForcePush = "op_weight_msg_toggle_force_push"
	// TODO: Determine the simulation weight value
	defaultWeightMsgToggleForcePush int = 100

	opWeightMsgExercise = "op_weight_msg_exercise"
	// TODO: Determine the simulation weight value
	defaultWeightMsgExercise int = 100

	// this line is used by starport scaffolding # simapp/module/const
)

// GenerateGenesisState creates a randomized GenState of the module
func (AppModule) GenerateGenesisState(simState *module.SimulationState) {
	accs := make([]string, len(simState.Accounts))
	for i, acc := range simState.Accounts {
		accs[i] = acc.Address.String()
	}
	gitopiaGenesis := types.GenesisState{
		TagList: []types.Tag{
			{
				Id: 0,
			},
			{
				Id: 1,
			},
		},
		TagCount: 2,
		MemberList: []types.Member{
			{
				Id:      0,
				Creator: sample.AccAddress(),
			},
			{
				Id:      1,
				Creator: sample.AccAddress(),
			},
		},
		MemberCount: 2,
		// this line is used by starport scaffolding # simapp/module/genesisState
	}
	simState.GenState[types.ModuleName] = simState.Cdc.MustMarshalJSON(&gitopiaGenesis)
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

	var weightMsgCreateTag int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgCreateTag, &weightMsgCreateTag, nil,
		func(_ *rand.Rand) {
			weightMsgCreateTag = defaultWeightMsgCreateTag
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgCreateTag,
		gitopiasimulation.SimulateMsgCreateTag(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgUpdateTag int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgUpdateTag, &weightMsgUpdateTag, nil,
		func(_ *rand.Rand) {
			weightMsgUpdateTag = defaultWeightMsgUpdateTag
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgUpdateTag,
		gitopiasimulation.SimulateMsgUpdateTag(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgDeleteTag int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgDeleteTag, &weightMsgDeleteTag, nil,
		func(_ *rand.Rand) {
			weightMsgDeleteTag = defaultWeightMsgDeleteTag
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgDeleteTag,
		gitopiasimulation.SimulateMsgDeleteTag(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgCreateMember int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgCreateMember, &weightMsgCreateMember, nil,
		func(_ *rand.Rand) {
			weightMsgCreateMember = defaultWeightMsgCreateMember
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgCreateMember,
		gitopiasimulation.SimulateMsgCreateMember(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgUpdateMember int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgUpdateMember, &weightMsgUpdateMember, nil,
		func(_ *rand.Rand) {
			weightMsgUpdateMember = defaultWeightMsgUpdateMember
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgUpdateMember,
		gitopiasimulation.SimulateMsgUpdateMember(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgDeleteMember int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgDeleteMember, &weightMsgDeleteMember, nil,
		func(_ *rand.Rand) {
			weightMsgDeleteMember = defaultWeightMsgDeleteMember
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgDeleteMember,
		gitopiasimulation.SimulateMsgDeleteMember(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgToggleForcePush int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgToggleForcePush, &weightMsgToggleForcePush, nil,
		func(_ *rand.Rand) {
			weightMsgToggleForcePush = defaultWeightMsgToggleForcePush
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgToggleForcePush,
		gitopiasimulation.SimulateMsgToggleForcePush(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgExercise int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgExercise, &weightMsgExercise, nil,
		func(_ *rand.Rand) {
			weightMsgExercise = defaultWeightMsgExercise
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgExercise,
		gitopiasimulation.SimulateMsgExercise(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	// this line is used by starport scaffolding # simapp/module/operation

	return operations
}
*/
