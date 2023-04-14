package keeper

import (
	"context"
	"time"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/app/params"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/pkg/errors"
)

const (
	TEAM_VESTING_AMOUNT = 339_118_201_000_000 // max team supply
	CLIFF_PERIOD        = 12                  // 1 year cliff
	VESTING_PERIOD      = 120                 // 10 years * 12 months
)

func vestedTeamTokens(startTime, currentTime time.Time) sdk.Coin {
	// Calculate the number of months between genesis time and current time
	months := currentTime.Year()*12 + int(currentTime.Month()) - (startTime.Year()*12 + int(startTime.Month()))

	// Check if the current day of the month is less than the start day, and if so, reduce the month count by 1
	if currentTime.Day() < startTime.Day() {
		months--
	}

	if months <= CLIFF_PERIOD {
		return sdk.NewCoin(params.BaseCoinUnit, math.NewInt(0)) // No vesting before the end of the cliff period
	}

	// Calculate the vested amount
	vestedMonths := months - CLIFF_PERIOD
	if vestedMonths > VESTING_PERIOD {
		vestedMonths = VESTING_PERIOD
	}

	vestedAmount := TEAM_VESTING_AMOUNT / VESTING_PERIOD * vestedMonths

	return sdk.NewCoin(params.BaseCoinUnit, math.NewInt(int64(vestedAmount)))
}

func (k msgServer) Exercise(goCtx context.Context, msg *types.MsgExercise) (*types.MsgExerciseResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	vestedProportion, err := k.GetVestedAmount(ctx, msg.Creator)
	if err != nil {
		return nil, err
	}
	exercisedAmount, f := k.GetExercisedAmount(ctx, msg.Creator)
	amount := sdk.Coins{sdk.NormalizeCoin(msg.Amount)}
	if amount.IsAllGT(sdk.Coins{vestedProportion}.Sub(exercisedAmount.Amount)) {
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
