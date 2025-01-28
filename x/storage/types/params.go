package types

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"
	"gopkg.in/yaml.v2"
)

var _ paramtypes.ParamSet = (*Params)(nil)

var (
	KeyMinStakeAmount                  = []byte("MinStakeAmount")
	KeyChallengeIntervalBlocks         = []byte("ChallengeIntervalBlocks")
	KeyChallengeTimeoutBlocks          = []byte("ChallengeTimeoutBlocks")
	KeyChallengeReward                 = []byte("ChallengeReward")
	KeyChallengeSlashAmount            = []byte("ChallengeSlashAmount")
	KeyConsecutiveFailsThreshold       = []byte("ConsecutiveFailsThreshold")
	KeyConsecutiveFailsSlashPercentage = []byte("ConsecutiveFailsSlashPercentage")
	// Default values for parameters
	DefaultMinStakeAmount                  uint64   = 100
	DefaultChallengeIntervalBlocks         uint64   = 100
	DefaultChallengeTimeoutBlocks          uint64   = 5
	DefaultChallengeReward                 sdk.Coin = sdk.NewCoin("stake", sdk.NewInt(1000))
	DefaultChallengeSlashAmount            sdk.Coin = sdk.NewCoin("stake", sdk.NewInt(500))
	DefaultConsecutiveFailsThreshold       uint64   = 3
	DefaultConsecutiveFailsSlashPercentage uint64   = 10
)

// ParamKeyTable the param key table for launch module
func ParamKeyTable() paramtypes.KeyTable {
	return paramtypes.NewKeyTable().RegisterParamSet(&Params{})
}

// NewParams creates a new Params instance
func NewParams(
	minStakeAmount uint64,
	challengeIntervalBlocks uint64,
	challengeTimeoutBlocks uint64,
	challengeReward sdk.Coin,
	challengeSlashAmount sdk.Coin,
	consecutiveFailsThreshold uint64,
	consecutiveFailsSlashPercentage uint64,
) Params {
	return Params{
		MinStakeAmount:                  minStakeAmount,
		ChallengeIntervalBlocks:         challengeIntervalBlocks,
		ChallengeTimeoutBlocks:          challengeTimeoutBlocks,
		ChallengeReward:                 challengeReward,
		ChallengeSlashAmount:            challengeSlashAmount,
		ConsecutiveFailsThreshold:       consecutiveFailsThreshold,
		ConsecutiveFailsSlashPercentage: consecutiveFailsSlashPercentage,
	}
}

// DefaultParams returns a default set of parameters
func DefaultParams() Params {
	return NewParams(
		DefaultMinStakeAmount,
		DefaultChallengeIntervalBlocks,
		DefaultChallengeTimeoutBlocks,
		DefaultChallengeReward,
		DefaultChallengeSlashAmount,
		DefaultConsecutiveFailsThreshold,
		DefaultConsecutiveFailsSlashPercentage,
	)
}

// ParamSetPairs get the params.ParamSet
func (p *Params) ParamSetPairs() paramtypes.ParamSetPairs {
	return paramtypes.ParamSetPairs{
		paramtypes.NewParamSetPair(KeyMinStakeAmount, &p.MinStakeAmount, validateMinStakeAmount),
		paramtypes.NewParamSetPair(KeyChallengeIntervalBlocks, &p.ChallengeIntervalBlocks, validateChallengeIntervalBlocks),
		paramtypes.NewParamSetPair(KeyChallengeTimeoutBlocks, &p.ChallengeTimeoutBlocks, validateChallengeTimeoutBlocks),
		paramtypes.NewParamSetPair(KeyChallengeReward, &p.ChallengeReward, validateChallengeReward),
		paramtypes.NewParamSetPair(KeyChallengeSlashAmount, &p.ChallengeSlashAmount, validateChallengeSlashAmount),
		paramtypes.NewParamSetPair(KeyConsecutiveFailsThreshold, &p.ConsecutiveFailsThreshold, validateConsecutiveFailsThreshold),
		paramtypes.NewParamSetPair(KeyConsecutiveFailsSlashPercentage, &p.ConsecutiveFailsSlashPercentage, validateConsecutiveFailsSlashPercentage),
	}
}

// Validate validates the set of params
func (p Params) Validate() error {
	if err := validateMinStakeAmount(p.MinStakeAmount); err != nil {
		return err
	}
	if err := validateChallengeIntervalBlocks(p.ChallengeIntervalBlocks); err != nil {
		return err
	}

	return nil
}

// String implements the Stringer interface.
func (p Params) String() string {
	out, _ := yaml.Marshal(p)
	return string(out)
}

// validateMinStakeAmount validates the MinStakeAmount param
func validateMinStakeAmount(v interface{}) error {
	amount, ok := v.(uint64)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}
	if amount == 0 {
		return fmt.Errorf("min stake amount cannot be 0")
	}
	return nil
}

// validateChallengeIntervalBlocks validates the ChallengeIntervalBlocks param
func validateChallengeIntervalBlocks(v interface{}) error {
	amount, ok := v.(uint64)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}
	if amount == 0 {
		return fmt.Errorf("challenges per day cannot be 0")
	}
	return nil
}

// validateChallengeTimeoutBlocks validates the ChallengeTimeoutBlocks param
func validateChallengeTimeoutBlocks(v interface{}) error {
	blocks, ok := v.(uint64)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}
	if blocks == 0 {
		return fmt.Errorf("challenge timeout blocks cannot be 0")
	}
	return nil
}

// validateChallengeReward validates the ChallengeReward param
func validateChallengeReward(v interface{}) error {
	coin, ok := v.(sdk.Coin)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}
	if coin.IsZero() {
		return fmt.Errorf("challenge reward cannot be zero")
	}
	return nil
}

// validateChallengeSlashAmount validates the ChallengeSlashAmount param
func validateChallengeSlashAmount(v interface{}) error {
	coin, ok := v.(sdk.Coin)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}
	if coin.IsZero() {
		return fmt.Errorf("challenge slash amount cannot be zero")
	}
	return nil
}

// validateConsecutiveFailsThreshold validates the ConsecutiveFailsThreshold param
func validateConsecutiveFailsThreshold(v interface{}) error {
	threshold, ok := v.(uint64)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}
	if threshold == 0 {
		return fmt.Errorf("consecutive fails threshold cannot be 0")
	}
	return nil
}

// validateConsecutiveFailsSlashPercentage validates the ConsecutiveFailsSlashPercentage param
func validateConsecutiveFailsSlashPercentage(v interface{}) error {
	percentage, ok := v.(uint64)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}
	if percentage == 0 {
		return fmt.Errorf("consecutive fails slash percentage cannot be 0")
	}
	return nil
}
