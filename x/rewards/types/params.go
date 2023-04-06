package types

import (
	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/app/params"
)

// NewParams creates a new Params instance
func NewParams(evaluatorAddress string, rewardSeries *RewardSeries) Params {
	return Params{
		EvaluatorAddress: evaluatorAddress,
		RewardSeries:     rewardSeries,
	}
}

// DefaultParams returns a default set of parameters
func DefaultParams() Params {
	return NewParams("gitopia1rrad3vleav3svu7tutqp9sqqv9mh4gex62vjvm", &RewardSeries{
		SeriesOne: &RewardPool{
			TotalAmount:   sdk.NewCoin(params.BaseCoinUnit, math.NewInt(1000)),
			ClaimedAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(0)),
		},
		SeriesTwo: &RewardPool{
			TotalAmount:   sdk.NewCoin(params.BaseCoinUnit, math.NewInt(1000)),
			ClaimedAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(0)),
		},
		SeriesThree: &RewardPool{
			TotalAmount:   sdk.NewCoin(params.BaseCoinUnit, math.NewInt(1000)),
			ClaimedAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(0)),
		},
		SeriesFour: &RewardPool{
			TotalAmount:   sdk.NewCoin(params.BaseCoinUnit, math.NewInt(1000)),
			ClaimedAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(0)),
		},
		SeriesFive: &RewardPool{
			TotalAmount:   sdk.NewCoin(params.BaseCoinUnit, math.NewInt(1000)),
			ClaimedAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(0)),
		},
		SeriesSix: &RewardPool{
			TotalAmount:   sdk.NewCoin(params.BaseCoinUnit, math.NewInt(1000)),
			ClaimedAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(0)),
		},
		SeriesSeven: &RewardPool{
			TotalAmount:   sdk.NewCoin(params.BaseCoinUnit, math.NewInt(1000)),
			ClaimedAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(0)),
		},
	})
}
