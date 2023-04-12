package keeper

import (
	"context"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/app/params"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func (k Keeper) VestedAmount(c context.Context, req *types.QueryVestedAmountRequest) (*types.QueryVestedAmountResponse, error) {
	ctx := sdk.UnwrapSDKContext(c)
	amount, err := k.GetVestedAmount(ctx, req.Address)
	if err != nil {
		return nil, err
	}

	exercisedAmount, found := k.GetExercisedAmount(ctx, req.Address)
	if !found {
		exercisedAmount.Amount = sdk.Coin{Denom: params.BaseCoinUnit, Amount: math.NewInt(0)}
	}

	res := new(types.QueryVestedAmountResponse)
	res.Address = req.Address
	res.Amount = amount
	res.ExercisedAmount = exercisedAmount.Amount

	return res, nil
}
