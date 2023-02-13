package keeper_test

import (
	"strconv"
	"testing"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	minttypes "github.com/cosmos/cosmos-sdk/x/mint/types"
	"github.com/gitopia/gitopia/testutil/simapp"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/stretchr/testify/assert"
	tmtypes "github.com/tendermint/tendermint/proto/tendermint/types"
)

// tests inflation does not halve, if next inflation time has not passed
func TestInflationFnConstantInflationSuccess(t *testing.T) {
	app := simapp.Setup(t)
	ctx := app.BaseApp.NewContext(false, tmtypes.Header{Time: time.Now()})

	gitopiaKeeper := app.GitopiaKeeper
	mintKeeper := app.MintKeeper
	minter := minttypes.Minter{Inflation: sdk.NewDecWithPrec(35, 2)} // current inflation

	inflationTime := time.Now().UTC().Add(10 * time.Minute)
	gitopiaParams := types.Params{NextInflationTime: inflationTime}
	gitopiaKeeper.SetParams(ctx, gitopiaParams)
	mintParams := minttypes.Params{
		GoalBonded:          sdk.NewDecWithPrec(67, 2),
		InflationMax:        sdk.NewDecWithPrec(45, 2),
		InflationMin:        sdk.NewDecWithPrec(25, 2),
		InflationRateChange: sdk.NewDec(0), // no additional change
		BlocksPerYear:       10,            // doesnt matter
		MintDenom:           "utlore",
	}
	mintKeeper.SetParams(ctx, mintParams)
	bondedRatio := mintParams.GoalBonded // zero inflation change due to bonded ratio
	inflation := gitopiaKeeper.InflationFn(ctx, minter, mintParams, bondedRatio)

	assert.Equal(t, sdk.NewDecWithPrec(35, 2), inflation)
	assert.Equal(t, inflationTime, gitopiaKeeper.GetParams(ctx).NextInflationTime)
	assert.Equal(t, sdk.NewDecWithPrec(45, 2), mintKeeper.GetParams(ctx).InflationMax)
	assert.Equal(t, sdk.NewDecWithPrec(25, 2), mintKeeper.GetParams(ctx).InflationMin)
}

func TestInflationFnMaxSuccess(t *testing.T) {
	app := simapp.Setup(t)
	ctx := app.BaseApp.NewContext(false, tmtypes.Header{Time: time.Now()})

	gitopiaKeeper := app.GitopiaKeeper
	mintKeeper := app.MintKeeper
	minter := minttypes.Minter{Inflation: sdk.NewDecWithPrec(55, 2)} // current inflation

	inflationTime := time.Now().UTC().Add(10 * time.Minute)
	gitopiaParams := types.Params{NextInflationTime: inflationTime}
	gitopiaKeeper.SetParams(ctx, gitopiaParams)
	mintParams := minttypes.Params{
		GoalBonded:          sdk.NewDecWithPrec(67, 2),
		InflationMax:        sdk.NewDecWithPrec(45, 2),
		InflationMin:        sdk.NewDecWithPrec(25, 2),
		InflationRateChange: sdk.NewDec(0), // no additional change
		BlocksPerYear:       10,            // doesnt matter
		MintDenom:           "utlore",
	}
	mintKeeper.SetParams(ctx, mintParams)
	bondedRatio := mintParams.GoalBonded // zero inflation change due to bonded ratio
	inflation := gitopiaKeeper.InflationFn(ctx, minter, mintParams, bondedRatio)

	assert.Equal(t, sdk.NewDecWithPrec(45, 2), inflation)
	assert.Equal(t, inflationTime, gitopiaKeeper.GetParams(ctx).NextInflationTime)
	assert.Equal(t, sdk.NewDecWithPrec(45, 2), mintKeeper.GetParams(ctx).InflationMax)
	assert.Equal(t, sdk.NewDecWithPrec(25, 2), mintKeeper.GetParams(ctx).InflationMin)
}

func TestInflationFnMinSuccess(t *testing.T) {
	app := simapp.Setup(t)
	ctx := app.BaseApp.NewContext(false, tmtypes.Header{Time: time.Now()})

	gitopiaKeeper := app.GitopiaKeeper
	mintKeeper := app.MintKeeper
	minter := minttypes.Minter{Inflation: sdk.NewDecWithPrec(10, 2)} // current inflation

	inflationTime := time.Now().UTC().Add(10 * time.Minute)
	gitopiaParams := types.Params{NextInflationTime: inflationTime}
	gitopiaKeeper.SetParams(ctx, gitopiaParams)
	mintParams := minttypes.Params{
		GoalBonded:          sdk.NewDecWithPrec(67, 2),
		InflationMax:        sdk.NewDecWithPrec(45, 2),
		InflationMin:        sdk.NewDecWithPrec(25, 2),
		InflationRateChange: sdk.NewDec(0), // no additional change
		BlocksPerYear:       10,            // doesnt matter
		MintDenom:           "utlore",
	}
	mintKeeper.SetParams(ctx, mintParams)
	bondedRatio := mintParams.GoalBonded // zero inflation change due to bonded ratio
	inflation := gitopiaKeeper.InflationFn(ctx, minter, mintParams, bondedRatio)

	assert.Equal(t, sdk.NewDecWithPrec(25, 2), inflation)
	assert.Equal(t, inflationTime, gitopiaKeeper.GetParams(ctx).NextInflationTime)
	assert.Equal(t, sdk.NewDecWithPrec(45, 2), mintKeeper.GetParams(ctx).InflationMax)
	assert.Equal(t, sdk.NewDecWithPrec(25, 2), mintKeeper.GetParams(ctx).InflationMin)
}

// tests inflation changes by inflation rate by a fraction of unbonded supply to goal bonded
func TestInflationFnChangePerBondedRatioSuccess(t *testing.T) {
	app := simapp.Setup(t)
	ctx := app.BaseApp.NewContext(false, tmtypes.Header{Time: time.Now()})

	gitopiaKeeper := app.GitopiaKeeper
	mintKeeper := app.MintKeeper
	minter := minttypes.Minter{Inflation: sdk.NewDecWithPrec(35, 2)} // current inflation

	inflationTime := time.Now().UTC().Add(10 * time.Minute)
	gitopiaParams := types.Params{NextInflationTime: inflationTime}
	gitopiaKeeper.SetParams(ctx, gitopiaParams)
	mintParams := minttypes.Params{
		GoalBonded:          sdk.NewDecWithPrec(67, 2),
		InflationMax:        sdk.NewDecWithPrec(100, 2), // max
		InflationMin:        sdk.NewDecWithPrec(25, 2),
		InflationRateChange: sdk.NewDecWithPrec(100, 2), // change in inflation rate when bonded ratio is not equal to goal bonded
		BlocksPerYear:       1,                          // doesnt matter
		MintDenom:           "utlore",
	}
	mintKeeper.SetParams(ctx, mintParams)
	bondedRatio := sdk.NewDecWithPrec(50, 2)
	inflation := gitopiaKeeper.InflationFn(ctx, minter, mintParams, bondedRatio)

	//inflation+(((1-bondedRatio/goalBonded)*InflationRateChange)/BlocksPerYear)
	//0.35+(((1-0.5/0.67))*1.0/1)=0.06037
	assert.Equal(t, int64(60), inflation.Mul(sdk.NewDec(100)).TruncateInt64())
	assert.Equal(t, inflationTime, gitopiaKeeper.GetParams(ctx).NextInflationTime)
}

// tests inflation halves, if next inflation time has passed
func TestInflationFnHalvesSuccess(t *testing.T) {
	app := simapp.Setup(t)
	ctx := app.BaseApp.NewContext(false, tmtypes.Header{Time: time.Now()})

	gitopiaKeeper := app.GitopiaKeeper
	mintKeeper := app.MintKeeper
	minter := minttypes.Minter{Inflation: sdk.NewDecWithPrec(35, 2)} // current inflation

	inflationTime := time.Now().UTC().Add(-10 * time.Second)
	gitopiaParams := types.Params{NextInflationTime: inflationTime}
	gitopiaKeeper.SetParams(ctx, gitopiaParams)
	mintParams := minttypes.Params{
		GoalBonded:          sdk.NewDecWithPrec(67, 2),
		InflationMax:        sdk.NewDecWithPrec(45, 2),
		InflationMin:        sdk.NewDecWithPrec(25, 2),
		InflationRateChange: sdk.NewDec(0), // no additional change
		BlocksPerYear:       10,            // doesnt matter
		MintDenom:           "utlore",
	}
	bondedRatio := mintParams.GoalBonded // zero inflation change due to bonded ratio
	inflation := gitopiaKeeper.InflationFn(ctx, minter, mintParams, bondedRatio)

	assert.Equal(t, sdk.NewDecWithPrec(175, 3), inflation)
	assert.Equal(t, inflationTime.AddDate(2, 0, 0), gitopiaKeeper.GetParams(ctx).NextInflationTime)
	assert.Equal(t, sdk.NewDecWithPrec(225, 3), mintKeeper.GetParams(ctx).InflationMax)
	assert.Equal(t, sdk.NewDecWithPrec(125, 3), mintKeeper.GetParams(ctx).InflationMin)
}

func TestInflationFnHalvesOverYearsSuccess(t *testing.T) {
	app := simapp.Setup(t)

	gitopiaKeeper := app.GitopiaKeeper
	mintKeeper := app.MintKeeper

	now := time.Now().UTC()
	inflationTimeline := []struct {
		blockTime     time.Time
		inflationTime time.Time
		inflation     sdk.Dec
		minInflation  sdk.Dec
		maxInflation  sdk.Dec
	}{
		// year 0
		{
			blockTime:     now,
			inflationTime: now.AddDate(0, 0, -1),     // trigger inflation halving
			inflation:     sdk.NewDecWithPrec(35, 2), // 35% or 0.35
			minInflation:  sdk.NewDecWithPrec(25, 2), // 25% or 0.25
			maxInflation:  sdk.NewDecWithPrec(45, 2), // 45% or 0.45
		},
		// year 2
		{
			blockTime:     now.AddDate(2, 0, 0),
			inflationTime: now.AddDate(2, 0, -1),      // 2 years from previous inflation time
			inflation:     sdk.NewDecWithPrec(175, 3), // 17.5% or 0.175
			minInflation:  sdk.NewDecWithPrec(125, 3), // 12.5% or 0.125
			maxInflation:  sdk.NewDecWithPrec(225, 3), // 22.5% or 0.225
		},
		// year 4
		{
			blockTime:     now.AddDate(4, 0, 0),
			inflationTime: now.AddDate(4, 0, -1),       // 2 years from previous inflation time
			inflation:     sdk.NewDecWithPrec(875, 4),  // 8.75% or 0.0875
			minInflation:  sdk.NewDecWithPrec(625, 4),  // 6.25% or 0.0625
			maxInflation:  sdk.NewDecWithPrec(1125, 4), // 11.25% or 0.1125
		},
		// year 6
		{
			blockTime:     now.AddDate(6, 0, 0),
			inflationTime: now.AddDate(6, 0, -1),       // 2 years from previous inflation time
			inflation:     sdk.NewDecWithPrec(4375, 5), // 4.375% or 0.04375
			minInflation:  sdk.NewDecWithPrec(3125, 5), // 3.125% or 0.03125
			maxInflation:  sdk.NewDecWithPrec(5625, 5), // 5.625% or 0.05625
		},
		// year 8
		{
			blockTime:     now.AddDate(8, 0, 0),
			inflationTime: now.AddDate(8, 0, -1),        // 2 years from previous inflation time
			inflation:     sdk.NewDecWithPrec(21875, 6), // 2.1875% or 0.021875
			minInflation:  sdk.NewDecWithPrec(15625, 6), // 1.5625% or 0.015625
			maxInflation:  sdk.NewDecWithPrec(28125, 6), // 2.8125% or 0.028125
		},
		// year 10
		{
			blockTime:     now.AddDate(10, 0, 0),
			inflationTime: now.AddDate(10, 0, -1),        // 2 years from previous inflation time
			inflation:     sdk.NewDecWithPrec(109375, 7), // 1.09375% or 0.0109375
			minInflation:  sdk.NewDecWithPrec(78125, 7),  // 0.78125% or 0.0078125
			maxInflation:  sdk.NewDecWithPrec(140625, 7), // 1.40625% or 0.0140625
		},
	}

	for i := 1; i < len(inflationTimeline); i++ {
		t.Run("year "+strconv.Itoa(i*2), func(t *testing.T) {
			ctx := app.BaseApp.NewContext(false, tmtypes.Header{Time: inflationTimeline[i-1].blockTime})
			gitopiaParams := types.Params{NextInflationTime: inflationTimeline[i-1].inflationTime}
			gitopiaKeeper.SetParams(ctx, gitopiaParams)
			minter := minttypes.Minter{Inflation: inflationTimeline[i-1].inflation} // current inflation
			mintParams := minttypes.Params{
				GoalBonded:          sdk.NewDecWithPrec(67, 2),
				InflationMax:        inflationTimeline[i-1].maxInflation,
				InflationMin:        inflationTimeline[i-1].minInflation,
				InflationRateChange: sdk.NewDec(0), // no additional change
				BlocksPerYear:       1,             // doesnt matter
				MintDenom:           "utlore",
			}
			bondedRatio := mintParams.GoalBonded // zero inflation change due to bonded ratio
			inflation := gitopiaKeeper.InflationFn(ctx, minter, mintParams, bondedRatio)

			assert.Equal(t, inflationTimeline[i].inflation, inflation)
			assert.Equal(t, inflationTimeline[i].inflationTime, gitopiaKeeper.GetParams(ctx).NextInflationTime)
			assert.Equal(t, inflationTimeline[i].maxInflation, mintKeeper.GetParams(ctx).InflationMax)
			assert.Equal(t, inflationTimeline[i].minInflation, mintKeeper.GetParams(ctx).InflationMin)
		})
	}

}
