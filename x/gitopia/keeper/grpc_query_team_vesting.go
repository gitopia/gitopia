package keeper

import (
	"context"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/app/params"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func (k Keeper) GetVestedAmount(ctx sdk.Context, address string) (sdk.Coin, error){
	gitopiaParams := k.GetParams(ctx)

	var proportion int64
	for _, p := range gitopiaParams.TeamProportions {
		if address == p.Address {
			proportion = p.Proportion
			break
		}
	}

	if proportion == 0 {
		return sdk.Coin{}, sdkerrors.Wrapf(sdkerrors.ErrUnauthorized, "account (%v) doesn't have permission to perform this operation", address)
	}

	vested := vestedTeamTokens(gitopiaParams.GenesisTime, ctx.BlockTime())
	if vested.Amount.IsZero() {
		return sdk.Coin{}, sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "team tokens have not vested")
	}

	vestedProportion := sdk.Coin{
		Amount: vested.Amount.Mul(math.NewInt(proportion)).Quo(math.NewInt(100)),
		Denom: vested.Denom,
	}

	return vestedProportion, nil
}

func (k Keeper) VestedAmount(c context.Context, req *types.QueryVestedAmountRequest) (*types.QueryVestedAmountResponse, error) {
	ctx := sdk.UnwrapSDKContext(c)
	amount, err := k.GetVestedAmount(ctx, req.Address)
	if err != nil {
		return nil, err
	}

	exercisedAmount, found := k.GetExercisedAmount(ctx, req.Address)
	if !found{
		exercisedAmount.Amount = sdk.Coin{Denom: params.BaseCoinUnit, Amount: math.NewInt(0)}
	}

	res := new(types.QueryVestedAmountResponse)
	res.Address = req.Address
	res.Amount = amount
	res.ExercisedAmount = exercisedAmount.Amount

	return res, nil
}
