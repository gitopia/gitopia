package simulation

import (
	"math/rand"

	"github.com/cosmos/cosmos-sdk/baseapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/gitopia/gitopia/v6/x/rewards/keeper"
	"github.com/gitopia/gitopia/v6/x/rewards/types"
)

func SimulateMsgClaim(
	ak types.AccountKeeper,
	bk types.BankKeeper,
	k keeper.Keeper,
) simtypes.Operation {
	return func(r *rand.Rand, app *baseapp.BaseApp, ctx sdk.Context, accs []simtypes.Account, chainID string,
	) (simtypes.OperationMsg, []simtypes.FutureOperation, error) {
		simAccount, _ := simtypes.RandomAcc(r, accs)
		msg := &types.MsgClaim{
			Creator: simAccount.Address.String(),
		}

		// TODO: Handling the Claim simulation

		return simtypes.NoOpMsg(types.ModuleName, msg.Type(), "Claim simulation not implemented"), nil, nil
	}
}
