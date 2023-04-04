package types

import (
	time "time"
	"gopkg.in/yaml.v2"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// NewParams creates a new Params instance
func NewParams(nextInflationTime time.Time, poolProportions PoolProportions, teamProportions []DistributionProportion) Params {
	return Params{
		NextInflationTime: nextInflationTime,
		PoolProportions:   poolProportions,
		TeamProportions:   teamProportions,
	}
}

// DefaultParams returns a default set of parameters
func DefaultParams() Params {
	return NewParams(time.Now().AddDate(2, 0, 0),
		PoolProportions{
			Ecosystem: &DistributionProportion{40, "gitopia1rrad3vleav3svu7tutqp9sqqv9mh4gex62vjvm"},
			Team:      &DistributionProportion{Proportion: 25},
		},
		[]DistributionProportion{
			{50, "gitopia1k9pvyj845y9a4m4vuxx8sjq5q28yxym520fh2x"},
			{35, "gitopia1njn3grh5ar4ccapyp4uehuq28wpk2sk5heu7ac"},
			{15, "gitopia1d5r0ql0pg5d8xfs5t0pmn7dl72m2zj2wchkfq3"},
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
	if err := validatePoolProportions(p.PoolProportions); err != nil {
		return err
	}
	if err := validateTeamProportions(p.TeamProportions); err != nil {
		return err
	}
	return nil
}

func validateNextInflationTime(i time.Time) error {
	return nil
}

func validatePoolProportions(pp PoolProportions) error {
	_, err := sdk.AccAddressFromBech32(pp.Ecosystem.Address)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid address (%s)", err)
	}

	if pp.Team.Address != "" {
		return sdkerrors.Wrapf(sdkerrors.ErrLogic, "team address must be empty. got %d", pp.Team.Address)
	}

	sum := pp.Ecosystem.Proportion + pp.Team.Proportion
	if  sum > 100 {
		return sdkerrors.Wrapf(sdkerrors.ErrLogic, "pool proportions must not exceed 100. got %d", sum)
	}
	return nil
}

func validateTeamProportions(dp []DistributionProportion) error {
	sumProportions := int64(0)
	for _, p := range dp {
		_, err := sdk.AccAddressFromBech32(p.Address)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid address (%s)", err)
		}
		sumProportions += (p.Proportion)
	}
	if sumProportions > 100 {
		return sdkerrors.Wrapf(sdkerrors.ErrLogic, "team proportions must not exceed 100. got %d", sumProportions)
	}
	if sumProportions < 100 {
		return sdkerrors.Wrapf(sdkerrors.ErrLogic, "team proportions must be equal to hundered 100. got %d", sumProportions)
	}

	return nil
}

// String implements the Stringer interface.
func (p Params) String() string {
	out, _ := yaml.Marshal(p)
	return string(out)
}
