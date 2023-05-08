package keeper

import (
	"time"

	"cosmossdk.io/math"
	"github.com/gitopia/gitopia/app/params"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const (
	TEAM_VESTING_AMOUNT = 339_118_201_000_000 // max team supply
	CLIFF_PERIOD        = 12                  // 1 year cliff
	VESTING_PERIOD      = 120                 // 10 years * 12 months
)

func VestedTeamTokens(startTime, currentTime time.Time) sdk.Coin {
	// Calculate the number of months between genesis time and current time
	months := (currentTime.Year()-1)*12 + int(currentTime.Month()) -
		((startTime.Year()-1)*12 + int(startTime.Month()))

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

	vestedAmount := TEAM_VESTING_AMOUNT * ((float64)(vestedMonths) / VESTING_PERIOD)

	return sdk.NewCoin(params.BaseCoinUnit, math.NewInt(int64(vestedAmount)))
}

func (k Keeper) GetVestedProportion(ctx sdk.Context, address string) (sdk.Coin, error) {
	gitopiaParams := k.GetParams(ctx)

	proportion := sdk.NewDec(0)
	for _, p := range gitopiaParams.TeamProportions {
		if address == p.Address {
			proportion = p.Proportion
			break
		}
	}

	if proportion.IsZero() {
		return sdk.Coin{}, sdkerrors.Wrapf(sdkerrors.ErrUnauthorized, "account (%v) doesn't have permission to perform this operation", address)
	}

	vested := VestedTeamTokens(gitopiaParams.GenesisTime, ctx.BlockTime())
	if vested.Amount.IsZero() {
		return sdk.Coin{}, sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "team tokens have not vested")
	}

	dec := sdk.NewDec(vested.Amount.Int64())
	vestedProportion := sdk.Coin{
		Amount: dec.Mul(proportion).Quo(sdk.NewDec(100)).TruncateInt(),
		Denom:  vested.Denom,
	}

	return vestedProportion, nil
}
