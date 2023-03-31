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

const teamVestingAmount = 339_118_197_000_000

func vestedTeamTokens(startTime, currentTime time.Time) sdk.Coin {
	const cliffPeriod = 12                   // 1 year cliff
	const vestingPeriod = 120                // 10 years * 12 months
	const monthlyVestingPercentage = 0.00834 // 0.834% per month

	// Calculate the number of months between genesis time and current time
	months := currentTime.Year()*12 + int(currentTime.Month()) - (startTime.Year()*12 + int(startTime.Month()))

	if months <= cliffPeriod {
		return sdk.NewCoin(params.BaseCoinUnit, math.NewInt(0)) // No vesting before the end of the cliff period
	}

	// Calculate the vested amount
	vestedMonths := months - cliffPeriod
	if vestedMonths > vestingPeriod {
		vestedMonths = vestingPeriod
	}

	vestedAmount := teamVestingAmount * (monthlyVestingPercentage * float64(vestedMonths))

	return sdk.NewCoin(params.BaseCoinUnit, math.NewInt(int64(vestedAmount)))
}

func (k msgServer) Exercise(goCtx context.Context, msg *types.MsgExercise) (*types.MsgExerciseResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	gitopiaParams := k.GetParams(ctx)

	var proportion int64
	for _, p := range gitopiaParams.TeamProportions {
		proportion = p.Proportion
	}

	if proportion == 0 {
		return nil, sdkerrors.Wrapf(sdkerrors.ErrUnauthorized, "account (%v) doesn't have permission to perform this operation", msg.Creator)
	}

	vested := vestedTeamTokens(time.Unix(gitopiaParams.GenesisTime, 0), ctx.BlockTime())
	if vested.Amount.IsZero() {
		return nil, sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "team tokens have not vested")
	}

	vestedProportion := sdk.Coins{vested}.MulInt(math.NewInt(proportion)).QuoInt(math.NewInt(100))
	exercisedAmount, f := k.GetExercisedAmount(ctx, msg.Creator)
	amount := sdk.Coins{sdk.NormalizeCoin(msg.Amount)}
	if amount.IsAllGT(vestedProportion.Sub(exercisedAmount.Amount)) {
		return nil, sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "cannot exercise more than vested tokens")
	}

	to, _ := sdk.AccAddressFromBech32(msg.To)
	err := k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.TeamAccountName, to, amount)
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
