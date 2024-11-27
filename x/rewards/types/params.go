package types

import (
	"fmt"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"
	"github.com/gitopia/gitopia/v5/app/params"
	"gopkg.in/yaml.v2"
)

// Parameter store keys.
var (
	KeyEvaluatorAddress = []byte("EvaluatorAddress")
	KeyRewardSeries     = []byte("RewardSeries")
)

// ParamTable for rewards module.
func ParamKeyTable() paramtypes.KeyTable {
	return paramtypes.NewKeyTable().RegisterParamSet(&Params{})
}

// NewParams creates a new Params instance
func NewParams(evaluatorAddress string, rewardSeries []*RewardPool) Params {
	return Params{
		EvaluatorAddress: evaluatorAddress,
		RewardSeries:     rewardSeries,
	}
}

// DefaultParams returns a default set of parameters
func DefaultParams() Params {
	return NewParams("gitopia1mnswtu0ueq7xw90u060ccfujvk04e8rv9vc47t", []*RewardPool{
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

// ParamSetPairs get the params.ParamSet
func (p *Params) ParamSetPairs() paramtypes.ParamSetPairs {
	return paramtypes.ParamSetPairs{
		paramtypes.NewParamSetPair(KeyEvaluatorAddress, &p.EvaluatorAddress, validateEvaluatorAddress),
		paramtypes.NewParamSetPair(KeyRewardSeries, &p.RewardSeries, validateRewardSeries),
	}
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
