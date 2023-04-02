package types

import (
	time "time"
	"gopkg.in/yaml.v2"
)

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

// String implements the Stringer interface.
func (p Params) String() string {
	out, _ := yaml.Marshal(p)
	return string(out)
}
