package keeper

import (
	"math/rand"
	"testing"
	"time"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/app/params"
	"github.com/stretchr/testify/assert"
)

func TestTeamVestingMonthlySuccess(t *testing.T) {
	VESTING_PER_MONTH := float64(2825985008333.3335)
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
			vestedAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(TEAM_VESTING_AMOUNT)),
		},
		{
			name:         "max vesting even after vesting period",
			blockTime:    now.AddDate(11+rand.Intn(30), 0, 0),
			vestedAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(TEAM_VESTING_AMOUNT)),
		},
	}

	for _, tc := range tcs {
		t.Run(tc.name, func(t *testing.T) {
			coin := vestedTeamTokens(now, tc.blockTime)
			assert.Equal(t, tc.vestedAmount, coin)
		})
	}
}

// team vesting happens before completion of a month
func TestTeamVestingSuccessInCalendarMonth(t *testing.T) {
	// date of writing this test!!
	// hardcoding date so that an hour before doesnt fall in previous calendar month
	now := time.Date(2023, 04, 12, 0, 0, 0, 0, time.Now().Local().Location())

	coin := vestedTeamTokens(now, now.AddDate(1, 1, 0).Add(time.Duration(-1)*time.Hour))
	// not equal since team tokens have already vested even before completion of a month
	assert.NotEqual(t, sdk.Coin{
		Denom:  params.BaseCoinUnit,
		Amount: math.NewInt(0),
	}, coin)
}

// atleast 2 trillion vests every month after cliff period
func TestTeamVestingSuccessEveryMonth(t *testing.T) {
	now := time.Date(2023, 04, 12, 0, 0, 0, 0, time.Now().Local().Location())
	CLIFF_PERIOD := 1
	// 1 month after cliff period
	coin := vestedTeamTokens(now, now.AddDate(CLIFF_PERIOD, 1, 0))
	assert.True(t, coin.Amount.GTE(math.NewInt(2_000_000_000_000)))

	// 2 months after cliff period
	coin = vestedTeamTokens(now, now.AddDate(CLIFF_PERIOD, 2, 0))
	assert.True(t, coin.Amount.GTE(math.NewInt(2_000_000_000_000*2)))
}
