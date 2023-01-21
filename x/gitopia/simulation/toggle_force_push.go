package simulation

// import (
// 	"math/rand"

// 	"github.com/gitopia/gitopia/x/gitopia/keeper"
// 	"github.com/gitopia/gitopia/x/gitopia/types"
// 	"github.com/cosmos/cosmos-sdk/baseapp"
// 	sdk "github.com/cosmos/cosmos-sdk/types"
// 	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
// )

// func SimulateMsgToggleForcePush(
// 	ak types.AccountKeeper,
// 	bk types.BankKeeper,
// 	k keeper.Keeper,
// ) simtypes.Operation {
// 	return func(r *rand.Rand, app *baseapp.BaseApp, ctx sdk.Context, accs []simtypes.Account, chainID string,
// 	) (simtypes.OperationMsg, []simtypes.FutureOperation, error) {
// 		simAccount, _ := simtypes.RandomAcc(r, accs)
// 		msg := &types.MsgToggleForcePush{
// 			Creator: simAccount.Address.String(),
// 		}

// 		// TODO: Handling the ToggleForcePush simulation

// 		return simtypes.NoOpMsg(types.ModuleName, msg.Type(), "ToggleForcePush simulation not implemented"), nil, nil
// 	}
// }
