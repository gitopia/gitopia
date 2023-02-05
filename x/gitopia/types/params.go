package types

import (
	time "time"

	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"
	"gopkg.in/yaml.v2"
)

var _ paramtypes.ParamSet = (*Params)(nil)

var (
	KeyNextInflationTime = []byte("NextInflationTime")
)

// ParamKeyTable the param key table for launch module
func ParamKeyTable() paramtypes.KeyTable {
	return paramtypes.NewKeyTable().RegisterParamSet(&Params{})
}

// NewParams creates a new Params instance
func NewParams(nextInflationTime time.Time, distributionProportions []DistributionProportion) Params {
	return Params{
		NextInflationTime: nextInflationTime,
		DistributionProportions: distributionProportions,
	}
}

// DefaultParams returns a default set of parameters
func DefaultParams() Params {
	return NewParams(time.Now().AddDate(2, 0, 0),[]DistributionProportion{
		{"gitopia1rrad3vleav3svu7tutqp9sqqv9mh4gex62vjvm", 40},
		{"gitopia1njn3grh5ar4ccapyp4uehuq28wpk2sk5heu7ac", 25},
		{"gitopia1d5r0ql0pg5d8xfs5t0pmn7dl72m2zj2wchkfq3", 5},
	})
}

// ParamSetPairs get the params.ParamSet
func (p *Params) ParamSetPairs() paramtypes.ParamSetPairs {
	return paramtypes.ParamSetPairs{
		paramtypes.NewParamSetPair(KeyNextInflationTime, &p.NextInflationTime, validateNextInflationTime),
	}
}

// Validate validates the set of params
func (p Params) Validate() error {
	return validateNextInflationTime(p.NextInflationTime)
}

func validateNextInflationTime(i interface{}) error {
	return nil
}

// String implements the Stringer interface.
func (p Params) String() string {
	out, _ := yaml.Marshal(p)
	return string(out)
}
