package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/pkg/errors"
)

func (k msgServer) Exercise(goCtx context.Context, msg *types.MsgExercise) (*types.MsgExerciseResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	vestedAmount, err := k.GetVestedAmount(ctx, msg.Creator)
	if err != nil {
		return nil, err
	}
	exercisedAmount, f := k.GetExercisedAmount(ctx, msg.Creator)
	amount := sdk.Coins{sdk.NormalizeCoin(msg.Amount)}
	if amount.IsAllGT(sdk.Coins{vestedAmount}.Sub(exercisedAmount.Amount)) {
		return nil, sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "cannot exercise more than vested tokens")
	}

	to, _ := sdk.AccAddressFromBech32(msg.To)
	err = k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.TeamAccountName, to, amount)
	if err != nil {
		return nil, errors.Wrapf(err, "error sending coins from team vesting module account")
	}

	// Update exercised amount
	if f {
		k.SetExercisedAmount(ctx, types.ExercisedAmount{
			Address: msg.Creator,
			Amount:  exercisedAmount.Amount.Add(amount[0]),
		})
	} else {
		k.AppendExercisedAmount(ctx, types.ExercisedAmount{
			Address: msg.Creator,
			Amount:  amount[0],
		})
	}

	return &types.MsgExerciseResponse{}, nil
}
