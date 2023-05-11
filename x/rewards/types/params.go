package types

import (
	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/app/params"
)

type DefaultAcc struct {
	Name     string
	Address  string
	Mnemonic string
}

var Acc1 = DefaultAcc{
	"acc1",
	"gitopia1mnswtu0ueq7xw90u060ccfujvk04e8rv9vc47t",
	"catch ship moment silk oak kingdom program matrix wire sleep rabbit tank camp sauce heart uncle school letter segment feel mean empower develop short",
}

// NewParams creates a new Params instance
func NewParams(evaluatorAddress string, rewardSeries *RewardSeries) Params {
	return Params{
		EvaluatorAddress: evaluatorAddress,
		RewardSeries:     rewardSeries,
	}
}

// DefaultParams returns a default set of parameters
// NOTE: contains sensitive data. DO NOT use in production
func DefaultParams() Params {
	return NewParams(Acc1.Address, &RewardSeries{
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
