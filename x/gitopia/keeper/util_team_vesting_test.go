package keeper_test

import (
	"math/rand"
	"testing"
	"time"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v6/app/params"
	tkeeper "github.com/gitopia/gitopia/v6/testutil/keeper"
	"github.com/gitopia/gitopia/v6/testutil/sample"
	"github.com/gitopia/gitopia/v6/x/gitopia/keeper"
	"github.com/gitopia/gitopia/v6/x/gitopia/types"
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

func TestTeamVestingSchedule(t *testing.T) {
	genesisTime := time.Now()

	type vest struct {
		name        string
		blockTime   time.Time
		teamSupply  math.Int // in ulore
		teamVesting math.Int // in ulore
	}

	// NOTE: supply is estimated to be at inflation rate
	// there is no guarantee the actual token supply will be same as the estimated supply
	// team vesting will be affected if the actual supply is lower. the addresses claiming earlier will deficit the addresses claiming later
	tcs := []vest{
		{
			name:        "0 years",
			blockTime:   genesisTime,
			teamSupply:  math.NewInt(0),
			teamVesting: math.NewInt(0),
		},
		{
			name:        "1 years",
			blockTime:   genesisTime.AddDate(1, 0, 0), // at cliff period
			teamSupply:  math.NewInt(48999994 * 1000000),
			teamVesting: math.NewInt(0),
		},
		{
			name:        "2 years",
			blockTime:   genesisTime.AddDate(2, 0, 0),
			teamSupply:  math.NewInt(115149998 * 1000000),
			teamVesting: math.NewInt(33911820100000),
		},
		{
			name:        "3 years",
			blockTime:   genesisTime.AddDate(3, 0, 0),
			teamSupply:  math.NewInt(159801248 * 1000000),
			teamVesting: math.NewInt(67823640200000),
		},
		{
			name:        "4 years",
			blockTime:   genesisTime.AddDate(4, 0, 0),
			teamSupply:  math.NewInt(212266466 * 1000000),
			teamVesting: math.NewInt(101735460300000),
		},
		{
			name:        "5 years",
			blockTime:   genesisTime.AddDate(5, 0, 0),
			teamSupply:  math.NewInt(243089782 * 1000000),
			teamVesting: math.NewInt(135647280400000),
		},
		{
			name:        "6 years",
			blockTime:   genesisTime.AddDate(6, 0, 0),
			teamSupply:  math.NewInt(276610138 * 1000000),
			teamVesting: math.NewInt(169559100500000),
		},
		{
			name:        "7 years",
			blockTime:   genesisTime.AddDate(7, 0, 0),
			teamSupply:  math.NewInt(294836831 * 1000000),
			teamVesting: math.NewInt(203470920600000),
		},
		{
			name:        "8 years",
			blockTime:   genesisTime.AddDate(8, 0, 0),
			teamSupply:  math.NewInt(313860943 * 1000000),
			teamVesting: math.NewInt(237382740700000),
		},
		{
			name:        "9 years",
			blockTime:   genesisTime.AddDate(9, 0, 0),
			teamSupply:  math.NewInt(323789151 * 1000000),
			teamVesting: math.NewInt(271294560800000),
		},
		{
			name:        "10 years",
			blockTime:   genesisTime.AddDate(10, 0, 0),
			teamSupply:  math.NewInt(333934538 * 1000000),
			teamVesting: math.NewInt(305206380900000),
		},
		{
			name:        "11 years",
			blockTime:   genesisTime.AddDate(11, 0, 0),
			teamSupply:  math.NewInt(339118201 * 1000000),
			teamVesting: math.NewInt(339118201000000),
		},
	}

	for _, tc := range tcs {
		t.Run(tc.name, func(t *testing.T) {
			coin := keeper.VestedTeamTokens(genesisTime, tc.blockTime)
			assert.Equal(t, tc.teamVesting, coin.Amount)
			assert.True(t, tc.teamSupply.GTE(coin.Amount))
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
	err := gKeeper.SetParams(ctx, types.Params{
		NextInflationTime: time.Now().UTC().AddDate(1, 0, 0),
		PoolProportions: types.PoolProportions{
			Ecosystem: &types.DistributionProportion{
				Proportion: sdk.NewDec(15),
			},
			Platform: &types.DistributionProportion{
				Proportion: sdk.NewDec(15),
			},
			Team: &types.DistributionProportion{
				Proportion: sdk.NewDec(28),
			},
		},
		TeamProportions: []types.DistributionProportion{
			{
				Proportion: sdk.NewDec(20),
				Address:    devAddr,
			},
			{
				Proportion: sdk.NewDec(80),
				Address:    sample.AccAddress(),
			},
		},
		GenesisTime:     now.AddDate(-1, 0, 0),
		GitServer:       sample.AccAddress(),
		StorageProvider: sample.AccAddress(),
	})
	assert.NoError(t, err)

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

	err := gKeeper.SetParams(ctx, types.Params{
		NextInflationTime: time.Now().UTC().AddDate(1, 0, 0),
		PoolProportions: types.PoolProportions{
			Ecosystem: &types.DistributionProportion{
				Proportion: sdk.NewDec(15),
			},
			Platform: &types.DistributionProportion{
				Proportion: sdk.NewDec(15),
			},
			Team: &types.DistributionProportion{
				Proportion: sdk.NewDec(28),
			},
		},
		TeamProportions: []types.DistributionProportion{
			{
				Proportion: sdk.NewDec(20),
				Address:    devAddr,
			},
			{
				Proportion: sdk.NewDec(80),
				Address:    sample.AccAddress(),
			},
		},
		GenesisTime:     now.AddDate(-1, 0, 0),
		GitServer:       sample.AccAddress(),
		StorageProvider: sample.AccAddress(),
	})
	assert.NoError(t, err)

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

	err := gKeeper.SetParams(ctx, types.Params{
		NextInflationTime: time.Now().UTC().AddDate(1, 0, 0),
		PoolProportions: types.PoolProportions{
			Ecosystem: &types.DistributionProportion{
				Proportion: sdk.NewDec(15),
			},
			Platform: &types.DistributionProportion{
				Proportion: sdk.NewDec(15),
			},
			Team: &types.DistributionProportion{
				Proportion: sdk.NewDec(28),
			},
		},
		TeamProportions: []types.DistributionProportion{
			{
				Proportion: sdk.NewDec(100),
				Address:    sample.AccAddress(),
			},
		},
		GenesisTime:     now.AddDate(-1, 0, 0),
		GitServer:       sample.AccAddress(),
		StorageProvider: sample.AccAddress(),
	})
	assert.NoError(t, err)

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

	err := gKeeper.SetParams(ctx, types.Params{
		NextInflationTime: time.Now().UTC().AddDate(1, 0, 0),
		PoolProportions: types.PoolProportions{
			Ecosystem: &types.DistributionProportion{
				Proportion: sdk.NewDec(15),
			},
			Platform: &types.DistributionProportion{
				Proportion: sdk.NewDec(15),
			},
			Team: &types.DistributionProportion{
				Proportion: sdk.NewDec(28),
			},
		},
		TeamProportions: []types.DistributionProportion{
			{
				Proportion: sdk.NewDec(20),
				Address:    devAddr,
			},
			{
				Proportion: sdk.NewDec(80),
				Address:    sample.AccAddress(),
			},
		},
		GenesisTime:     now.AddDate(-1, 0, 0),
		GitServer:       sample.AccAddress(),
		StorageProvider: sample.AccAddress(),
	})
	assert.NoError(t, err)

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

	err := gKeeper.SetParams(ctx, types.Params{
		NextInflationTime: time.Now().UTC().AddDate(1, 0, 0),
		PoolProportions: types.PoolProportions{
			Ecosystem: &types.DistributionProportion{
				Proportion: sdk.NewDec(15),
			},
			Platform: &types.DistributionProportion{
				Proportion: sdk.NewDec(15),
			},
			Team: &types.DistributionProportion{
				Proportion: sdk.NewDec(28),
			},
		},
		TeamProportions: []types.DistributionProportion{
			{
				Proportion: sdk.NewDecWithPrec(205, 1),
				Address:    devAddr,
			},
			{
				Proportion: sdk.NewDecWithPrec(795, 1),
				Address:    sample.AccAddress(),
			},
		},
		GenesisTime:     now.AddDate(-1, 0, 0),
		GitServer:       sample.AccAddress(),
		StorageProvider: sample.AccAddress(),
	})
	assert.NoError(t, err)

	amount, err := gKeeper.GetVestedProportion(ctx, devAddr)

	assert.NoError(t, err)
	// 69,519,231,205,000
	proportion := sdk.NewDecWithPrec(205, 3).MulInt64(keeper.TEAM_VESTING_AMOUNT).TruncateInt64()
	assert.Equal(t, math.NewInt(proportion), amount.Amount)
	// 67,823,640,200,000
	roundedProportion := sdk.NewDecWithPrec(2, 1).MulInt64(keeper.TEAM_VESTING_AMOUNT).TruncateInt64()
	assert.NotEqual(t, math.NewInt(int64(roundedProportion)), amount.Amount)
}
