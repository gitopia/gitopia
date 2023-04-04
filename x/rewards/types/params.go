package types

import (
	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/app/params"
)

// NewParams creates a new Params instance
func NewParams(evaluatorAddress string) Params {
	return Params{
		EvaluatorAddress: evaluatorAddress,
		RewardSeries: &RewardSeries{
			SeriesOne:   &RewardPool{TotalAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(1000))},
			SeriesTwo:   &RewardPool{TotalAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(1000))},
			SeriesThree: &RewardPool{TotalAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(1000))},
			SeriesFour:  &RewardPool{TotalAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(1000))},
			SeriesFive:  &RewardPool{TotalAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(1000))},
			SeriesSix:   &RewardPool{TotalAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(1000))},
			SeriesSeven: &RewardPool{TotalAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(1000))},
		},
	}
}

// DefaultParams returns a default set of parameters
func DefaultParams() Params {
	return NewParams("gitopia1rrad3vleav3svu7tutqp9sqqv9mh4gex62vjvm")
}
