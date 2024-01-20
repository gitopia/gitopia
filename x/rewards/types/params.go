package types

import (
	"fmt"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v4/app/params"
	"gopkg.in/yaml.v2"
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

// validate params
func (p Params) Validate() error {
	if err := validateEvaluatorAddress(p.EvaluatorAddress); err != nil {
		return err
	}
	if err := validateRewardSeries(p.RewardSeries); err != nil {
		return err
	}

	return nil
}

// String implements the Stringer interface.
func (p Params) String() string {
	out, _ := yaml.Marshal(p)
	return string(out)
}

func validateEvaluatorAddress(i interface{}) error {
	v, ok := i.(string)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", i)
	}

	// validate v is an address
	_, err := sdk.AccAddressFromBech32(v)
	if err != nil {
		return fmt.Errorf("invalid evaluator address: %s", err)
	}

	return nil
}

func validateRewardSeries(i interface{}) error {
	v, ok := i.([]*RewardPool)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", i)
	}

	for _, pool := range v {
		if err := validateRewardPool(pool); err != nil {
			return err
		}
	}

	return nil
}

func validateRewardPool(pool *RewardPool) error {
	if pool.TotalAmount.IsZero() {
		return fmt.Errorf("total amount cannot be zero")
	}

	if pool.ClaimedAmount.IsNegative() {
		return fmt.Errorf("claimed amount cannot be negative")
	}

	if pool.ClaimedAmount.Amount.GT(pool.TotalAmount.Amount) {
		return fmt.Errorf("claimed amount cannot exceed total amount")
	}

	return nil
}
