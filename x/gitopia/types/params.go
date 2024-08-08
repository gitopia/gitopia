package types

import (
	fmt "fmt"
	time "time"

	"gopkg.in/yaml.v2"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"
)

// Parameter store keys.
var (
	KeyNextInflationTime = []byte("NextInflationTime")
	KeyPoolProportions   = []byte("PoolProportions")
	KeyTeamProportions   = []byte("TeamProportions")
	KeyGenesisTime       = []byte("GenesisTime")
	KeyGitServer         = []byte("GitServer")
	KeyStorageProvider   = []byte("StorageProvider")
)

// ParamTable for gitopia module.
func ParamKeyTable() paramtypes.KeyTable {
	return paramtypes.NewKeyTable().RegisterParamSet(&Params{})
}

// NewParams creates a new Params instance
func NewParams(nextInflationTime time.Time,
	poolProportions PoolProportions,
	teamProportions []DistributionProportion,
	genesisTime time.Time,
	gitServer string,
	storageProvider string) Params {
	return Params{
		NextInflationTime: nextInflationTime,
		PoolProportions:   poolProportions,
		TeamProportions:   teamProportions,
		GenesisTime:       genesisTime,
		GitServer:         gitServer,
		StorageProvider:   storageProvider,
	}
}

// DefaultParams returns a default set of parameters
func DefaultParams() Params {
	ecosystemProportion, _ := sdk.NewDecFromStr("30.0")
	teamProportion, _ := sdk.NewDecFromStr("28.0")

	teamProportion1, _ := sdk.NewDecFromStr("50.0")
	teamProportion2, _ := sdk.NewDecFromStr("35.0")
	teamProportion3, _ := sdk.NewDecFromStr("15.0")

	return NewParams(time.Now().AddDate(2, 0, 0).UTC(), // two years from now
		PoolProportions{
			Ecosystem: &DistributionProportion{Proportion: ecosystemProportion},
			Team:      &DistributionProportion{Proportion: teamProportion},
		},
		[]DistributionProportion{
			{teamProportion1, "gitopia1k9pvyj845y9a4m4vuxx8sjq5q28yxym520fh2x"},
			{teamProportion2, "gitopia1njn3grh5ar4ccapyp4uehuq28wpk2sk5heu7ac"},
			{teamProportion3, "gitopia1d5r0ql0pg5d8xfs5t0pmn7dl72m2zj2wchkfq3"},
		},
		time.Now().Add(time.Duration(-365*24)*time.Hour).UTC(), // one year ago
		"gitopia1s9qkkznqqv8p838fuyzzfaxu7ckhy3v8cw3pke",
		"gitopia1xp4e40rd4akt882h2pxl8cw8ygxjxndu23c5wn",
	)
}

// ParamSetPairs get the params.ParamSet
func (p *Params) ParamSetPairs() paramtypes.ParamSetPairs {
	return paramtypes.ParamSetPairs{
		paramtypes.NewParamSetPair(KeyNextInflationTime, &p.NextInflationTime, validateNextInflationTime),
		paramtypes.NewParamSetPair(KeyPoolProportions, &p.PoolProportions, validatePoolProportions),
		paramtypes.NewParamSetPair(KeyTeamProportions, &p.TeamProportions, validateTeamProportions),
		paramtypes.NewParamSetPair(KeyGenesisTime, &p.GenesisTime, validateGenesisTime),
		paramtypes.NewParamSetPair(KeyGitServer, &p.GitServer, validateAddress),
		paramtypes.NewParamSetPair(KeyStorageProvider, &p.StorageProvider, validateAddress),
	}
}

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
	if err := validateGenesisTime(p.GenesisTime); err != nil {
		return err
	}
	if err := validateAddress(p.GitServer); err != nil {
		return err
	}
	if err := validateAddress(p.StorageProvider); err != nil {
		return err
	}
	return nil
}

func validateNextInflationTime(i interface{}) error {
	v, ok := i.(time.Time)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", i)
	}
	if v.Before(time.Now().UTC()) {
		return fmt.Errorf("next inflation time must be in the future. got %s", v)
	}

	return nil
}

func validatePoolProportions(i interface{}) error {
	pp, ok := i.(PoolProportions)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", i)
	}
	if pp.Ecosystem == nil {
		return sdkerrors.Wrap(sdkerrors.ErrLogic, "ecosystem proportion is empty")
	}

	if pp.Team == nil {
		return sdkerrors.Wrap(sdkerrors.ErrLogic, "team proportion is empty")
	}

	if pp.Ecosystem.Address != "" {
		return sdkerrors.Wrapf(sdkerrors.ErrLogic, "ecosystem address must be empty. got %s", pp.Ecosystem.Address)
	}

	if pp.Team.Address != "" {
		return sdkerrors.Wrapf(sdkerrors.ErrLogic, "team address must be empty. got %s", pp.Team.Address)
	}

	sum := pp.Ecosystem.Proportion.Add(pp.Team.Proportion)
	if sum.GT(sdk.NewDec(100)) {
		return sdkerrors.Wrapf(sdkerrors.ErrLogic, "pool proportions must not exceed 100. got %d", sum)
	}
	return nil
}

func validateTeamProportions(i interface{}) error {
	dp, ok := i.([]DistributionProportion)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", i)
	}
	sumProportions := sdk.NewDec(0)
	for _, p := range dp {
		_, err := sdk.AccAddressFromBech32(p.Address)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid address (%s)", err)
		}
		sumProportions = sumProportions.Add(p.Proportion)
	}
	if sumProportions.GT(sdk.NewDec(100)) {
		return sdkerrors.Wrapf(sdkerrors.ErrLogic, "team proportions must not exceed 100. got %d", sumProportions)
	}
	if sumProportions.LT(sdk.NewDec(100)) {
		return sdkerrors.Wrapf(sdkerrors.ErrLogic, "team proportions must be equal to hundred 100. got %d", sumProportions)
	}

	return nil
}

func validateGenesisTime(i interface{}) error {
	v, ok := i.(time.Time)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", i)
	}
	if v.After(time.Now().UTC()) {
		return fmt.Errorf("genesis time must be in the past. got %s", v)
	}

	return nil
}

func validateAddress(i interface{}) error {
	v, ok := i.(string)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", i)
	}
	_, err := sdk.AccAddressFromBech32(v)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid address (%s)", err)
	}
	return nil
}

// String implements the Stringer interface.
func (p Params) String() string {
	out, _ := yaml.Marshal(p)
	return string(out)
}
