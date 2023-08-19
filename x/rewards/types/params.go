package types

import (
	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v3/app/params"
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
func NewParams(evaluatorAddress string, rewardSeries []*RewardPool) Params {
	return Params{
		EvaluatorAddress: evaluatorAddress,
		RewardSeries:     rewardSeries,
	}
}

// DefaultParams returns a default set of parameters
// NOTE: contains sensitive data. DO NOT use in production
func DefaultParams() Params {
	return NewParams(Acc1.Address, []*RewardPool{
		{
			TotalAmount:   sdk.NewCoin(params.BaseCoinUnit, math.NewInt(1000)),
			ClaimedAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(0)),
			Series:        Series_ONE,
		},
		{
			TotalAmount:   sdk.NewCoin(params.BaseCoinUnit, math.NewInt(1000)),
			ClaimedAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(0)),
			Series:        Series_TWO,
		},
		{
			TotalAmount:   sdk.NewCoin(params.BaseCoinUnit, math.NewInt(1000)),
			ClaimedAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(0)),
			Series:        Series_THREE,
		},
		{
			TotalAmount:   sdk.NewCoin(params.BaseCoinUnit, math.NewInt(1000)),
			ClaimedAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(0)),
			Series:        Series_FOUR,
		},
		{
			TotalAmount:   sdk.NewCoin(params.BaseCoinUnit, math.NewInt(1000)),
			ClaimedAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(0)),
			Series:        Series_FIVE,
		},
		{
			TotalAmount:   sdk.NewCoin(params.BaseCoinUnit, math.NewInt(1000)),
			ClaimedAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(0)),
			Series:        Series_SIX,
		},
		{
			TotalAmount:   sdk.NewCoin(params.BaseCoinUnit, math.NewInt(1000)),
			ClaimedAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(0)),
			Series:        Series_SEVEN,
		},
	})
}
