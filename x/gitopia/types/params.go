package types

import (
	time "time"

	// paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

	"gopkg.in/yaml.v2"
)

// var _ paramtypes.ParamSet = (*Params)(nil)

var (
	KeyNextInflationTime       = []byte("NextInflationTime")
	KeyDistributionProportions = []byte("DistributionProportions")
)

// // ParamKeyTable the param key table for launch module
// func ParamKeyTable() paramtypes.KeyTable {
// 	return paramtypes.NewKeyTable().RegisterParamSet(&Params{})
// }

// NewParams creates a new Params instance
func NewParams(nextInflationTime time.Time, distributionProportions []DistributionProportion) Params {
	return Params{
		NextInflationTime:       nextInflationTime,
		DistributionProportions: distributionProportions,
	}
}

// DefaultParams returns a default set of parameters
func DefaultParams() Params {
	return NewParams(time.Now().AddDate(2, 0, 0), []DistributionProportion{
		{"gitopia1rrad3vleav3svu7tutqp9sqqv9mh4gex62vjvm", 40},
		{"gitopia1njn3grh5ar4ccapyp4uehuq28wpk2sk5heu7ac", 25},
		{"gitopia1d5r0ql0pg5d8xfs5t0pmn7dl72m2zj2wchkfq3", 5},
	})
}

// // ParamSetPairs get the params.ParamSet
// func (p *Params) ParamSetPairs() paramtypes.ParamSetPairs {
// 	return paramtypes.ParamSetPairs{
// 		paramtypes.NewParamSetPair(KeyNextInflationTime, &p.NextInflationTime, validateNextInflationTime),
// 		paramtypes.NewParamSetPair(KeyDistributionProportions, &p.DistributionProportions, validateDistributionProportions),
// 	}
// }

// Validate validates the set of params
func (p Params) Validate() error {
	if err := validateNextInflationTime(p.NextInflationTime); err != nil {
		return err
	}
	if err := validateDistributionProportions(p.DistributionProportions); err != nil {
		return err
	}
	return nil
}

func validateNextInflationTime(i time.Time) error {
	return nil
}

func validateDistributionProportions(dp []DistributionProportion) error {
	sumProportions := int64(0)
	for _, p := range dp {
		_, err := sdk.AccAddressFromBech32(p.Address)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid address (%s)", err)
		}
		sumProportions += (p.Proportion)
	}
	if sumProportions > 100 {
		return sdkerrors.Wrapf(sdkerrors.ErrLogic, "distribution proportions must not exceed 100. got %d", sumProportions)
	}

	return nil
}

// String implements the Stringer interface.
func (p Params) String() string {
	out, _ := yaml.Marshal(p)
	return string(out)
}
