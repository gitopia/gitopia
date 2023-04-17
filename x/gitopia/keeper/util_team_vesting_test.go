package keeper_test

import (
	"math/rand"
	"testing"
	"time"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/app/params"
	tkeeper "github.com/gitopia/gitopia/testutil/keeper"
	"github.com/gitopia/gitopia/testutil/sample"
	"github.com/gitopia/gitopia/x/gitopia/keeper"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/stretchr/testify/assert"
)

var (
	VESTING_PER_MONTH = float64(2825985008333.3335)
)

func TestTeamVestingMonthlySuccess(t *testing.T) {
	now := time.Now()

	type testCase struct {
		name         string
		blockTime    time.Time
		vestedAmount sdk.Coin
	}

	tcs := []testCase{
		{
			name:      "after 1 year",
			blockTime: now.AddDate(1, 0, 0),
			// no amount vested during cliff period, 1 year
			vestedAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(0)),
		},
		{
			name:         "after 1 year 1 month",
			blockTime:    now.AddDate(1, 1, 0),
			vestedAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt((int64)(VESTING_PER_MONTH))),
		},
		{
			name:         "after 1 year 2 months",
			blockTime:    now.AddDate(1, 2, 0),
			vestedAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt((int64)(VESTING_PER_MONTH*2))),
		},
		{
			name:         "after 2 years",
			blockTime:    now.AddDate(2, 0, 0),
			vestedAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt((int64)(VESTING_PER_MONTH*12))),
		},
		{
			name:         "after 3 years",
			blockTime:    now.AddDate(3, 0, 0),
			vestedAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt((int64)(VESTING_PER_MONTH*12*2))),
		},
		{
			name:         "after 10 years",
			blockTime:    now.AddDate(10, 0, 0),
			vestedAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt((int64)(VESTING_PER_MONTH*12*9))),
		},
		{
			name:         "max vesting at vesting period",
			blockTime:    now.AddDate(11, 0, 0),
			vestedAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(keeper.TEAM_VESTING_AMOUNT)),
		},
		{
			name:         "max vesting even after vesting period",
			blockTime:    now.AddDate(11+rand.Intn(30), 0, 0),
			vestedAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(keeper.TEAM_VESTING_AMOUNT)),
		},
	}

	for _, tc := range tcs {
		t.Run(tc.name, func(t *testing.T) {
			coin := keeper.VestedTeamTokens(now, tc.blockTime)
			assert.Equal(t, tc.vestedAmount, coin)
		})
	}
}

func TestTeamVestingOnlyAfterCompletionOfAMonth(t *testing.T) {
	now := time.Now()

	// not vested till the day before completion of vesting month
	coin := keeper.VestedTeamTokens(now, now.AddDate(1, 1, 0).Add(time.Duration(-24)*time.Hour))
	assert.Equal(t, sdk.Coin{
		Denom:  params.BaseCoinUnit,
		Amount: math.NewInt(0),
	}.String(), coin.String())

	// vested on the day of completion of vesting month
	coin = keeper.VestedTeamTokens(now, now.AddDate(1, 1, 0))
	assert.Equal(t, sdk.Coin{
		Denom:  params.BaseCoinUnit,
		Amount: math.NewInt(int64(VESTING_PER_MONTH)),
	}, coin)
}

// atleast 2 trillion vests every month after cliff period
func TestTeamVestingSuccessEveryMonth(t *testing.T) {
	now := time.Date(2023, 04, 12, 0, 0, 0, 0, time.Now().Local().Location())
	CLIFF_PERIOD := 1
	// 1 month after cliff period
	coin := keeper.VestedTeamTokens(now, now.AddDate(CLIFF_PERIOD, 1, 0))
	assert.True(t, coin.Amount.GTE(math.NewInt(2_000_000_000_000)))

	// 2 months after cliff period
	coin = keeper.VestedTeamTokens(now, now.AddDate(CLIFF_PERIOD, 2, 0))
	assert.True(t, coin.Amount.GTE(math.NewInt(2_000_000_000_000*2)))
}

func TestVestedDeveloperProportionSuccess(t *testing.T) {
	appKeepers, ctx := tkeeper.AppKeepers(t)
	gKeeper := appKeepers.GitopiaKeeper
	now := time.Now()
	ctx = ctx.WithBlockTime(now.AddDate(0, 1, 0)) // one month vesting
	devAddr := sample.AccAddress()

	gKeeper.SetParams(ctx, types.Params{
		TeamProportions: []types.DistributionProportion{{
			Proportion: sdk.NewDec(20),
			Address:    devAddr,
		}},
		GenesisTime: now.Add(time.Duration(-366*24) * time.Hour),
	})

	amount, err := gKeeper.GetVestedProportion(ctx, devAddr)

	assert.NoError(t, err)
	assert.Equal(t, math.NewInt(int64(VESTING_PER_MONTH*20/100)), amount.Amount)
}

func TestVestedDeveloperProportionWithNoVesting(t *testing.T) {
	appKeepers, ctx := tkeeper.AppKeepers(t)
	gKeeper := appKeepers.GitopiaKeeper
	now := time.Now()
	ctx = ctx.WithBlockTime(now)
	devAddr := sample.AccAddress()

	gKeeper.SetParams(ctx, types.Params{
		TeamProportions: []types.DistributionProportion{{
			Proportion: sdk.NewDec(20),
			Address:    devAddr,
		}},
		GenesisTime: now.Add(time.Duration(-366*24) * time.Hour),
	})

	amount, err := gKeeper.GetVestedProportion(ctx, devAddr)

	assert.Equal(t, "team tokens have not vested: invalid request", err.Error())
	assert.Equal(t, sdk.Coin{}, amount)
}

func TestVestedDeveloperUnauthorized(t *testing.T) {
	appKeepers, ctx := tkeeper.AppKeepers(t)
	gKeeper := appKeepers.GitopiaKeeper
	now := time.Now()
	ctx = ctx.WithBlockTime(now)
	devAddr := sample.AccAddress()

	gKeeper.SetParams(ctx, types.Params{
		TeamProportions: []types.DistributionProportion{},
		GenesisTime:     now.Add(time.Duration(-366*24) * time.Hour),
	})

	amount, err := gKeeper.GetVestedProportion(ctx, devAddr)

	assert.ErrorContains(t, err, "unauthorized")
	assert.Equal(t, sdk.Coin{}, amount)
}

func TestVestedDeveloperProportionMaxVesting(t *testing.T) {
	appKeepers, ctx := tkeeper.AppKeepers(t)
	gKeeper := appKeepers.GitopiaKeeper
	now := time.Now()
	ctx = ctx.WithBlockTime(now.AddDate(10, 0, 0)) // 11 year vesting
	devAddr := sample.AccAddress()

	gKeeper.SetParams(ctx, types.Params{
		TeamProportions: []types.DistributionProportion{{
			Proportion: sdk.NewDec(20),
			Address:    devAddr,
		}},
		GenesisTime: now.Add(time.Duration(-366*24) * time.Hour),
	})

	amount, err := gKeeper.GetVestedProportion(ctx, devAddr)

	assert.NoError(t, err)
	assert.Equal(t, math.NewInt(int64(keeper.TEAM_VESTING_AMOUNT*20/100)), amount.Amount)
}

func TestFractionalVestedDeveloperProportion(t *testing.T) {
	appKeepers, ctx := tkeeper.AppKeepers(t)
	gKeeper := appKeepers.GitopiaKeeper
	now := time.Now()
	ctx = ctx.WithBlockTime(now.AddDate(10, 0, 0)) // 11 year vesting. genesis 1 year ago
	devAddr := sample.AccAddress()

	gKeeper.SetParams(ctx, types.Params{
		TeamProportions: []types.DistributionProportion{{
			Proportion: sdk.NewDecWithPrec(205, 1),
			Address:    devAddr,
		}},
		GenesisTime: now.Add(time.Duration(-366*24) * time.Hour),
	})

	amount, err := gKeeper.GetVestedProportion(ctx, devAddr)

	assert.NoError(t, err)
	// 69,519,231,205,000
	proportion := sdk.NewDecWithPrec(205, 3).MulInt64(keeper.TEAM_VESTING_AMOUNT).TruncateInt64()
	assert.Equal(t, math.NewInt(proportion), amount.Amount)
	// 67,823,640,200,000
	roundedProportion := sdk.NewDecWithPrec(2, 1).MulInt64(keeper.TEAM_VESTING_AMOUNT).TruncateInt64()
	assert.NotEqual(t, math.NewInt(int64(roundedProportion)), amount.Amount)
}
