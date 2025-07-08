package types

import (
	"fmt"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"
	"gopkg.in/yaml.v2"
)

var _ paramtypes.ParamSet = (*Params)(nil)

const (
	DefaultChallengePeriod = 10 * time.Second
)

var (
	KeyMinStakeAmount                  = []byte("MinStakeAmount")
	KeyChallengeIntervalBlocks         = []byte("ChallengeIntervalBlocks")
	KeyChallengePeriod                 = []byte("ChallengePeriod")
	KeyRewardPerDay                    = []byte("RewardPerDay")
	KeyChallengeSlashAmount            = []byte("ChallengeSlashAmount")
	KeyConsecutiveFailsThreshold       = []byte("ConsecutiveFailsThreshold")
	KeyConsecutiveFailsSlashPercentage = []byte("ConsecutiveFailsSlashPercentage")
	KeyUnstakeCooldownBlocks           = []byte("UnstakeCooldownBlocks")
	KeyStoragePricePerMb               = []byte("StoragePricePerMb")
	KeyFreeStorageMb                   = []byte("FreeStorageMb")
	KeyMaxProviders                    = []byte("MaxProviders")
	KeyEnableStorageChallenges         = []byte("EnableStorageChallenges")
	// Default values for parameters
	DefaultMinStakeAmount                  uint64   = 1_000_000_000_000
	DefaultChallengeIntervalBlocks         uint64   = 1000                                            // ~30 min
	DefaultRewardPerDay                    sdk.Coin = sdk.NewCoin("ulore", sdk.NewInt(6_000_000_000)) // $5, $150 a month
	DefaultChallengeSlashAmount            sdk.Coin = sdk.NewCoin("ulore", sdk.NewInt(1_250_000_000))
	DefaultConsecutiveFailsThreshold       uint64   = 3
	DefaultConsecutiveFailsSlashPercentage uint64   = 1
	DefaultUnstakeCooldownBlocks           uint64   = 1_521_500 // ~28 days
	DefaultStoragePricePerMb               sdk.Coin = sdk.NewCoin("ulore", sdk.NewInt(0))
	DefaultFreeStorageMb                   uint64   = 157_286_400 // 150Mb
	DefaultMaxProviders                    uint64   = 5
	DefaultEnableStorageChallenges         bool     = false
)

// ParamKeyTable the param key table for launch module
func ParamKeyTable() paramtypes.KeyTable {
	return paramtypes.NewKeyTable().RegisterParamSet(&Params{})
}

// NewParams creates a new Params instance
func NewParams(
	minStakeAmount uint64,
	challengeIntervalBlocks uint64,
	challengePeriod time.Duration,
	rewardPerDay sdk.Coin,
	challengeSlashAmount sdk.Coin,
	consecutiveFailsThreshold uint64,
	consecutiveFailsSlashPercentage uint64,
	unstakeCooldownBlocks uint64,
	storagePricePerMb sdk.Coin,
	freeStorageMb uint64,
	maxProviders uint64,
	enableStorageChallenges bool,
) Params {
	return Params{
		MinStakeAmount:                  minStakeAmount,
		ChallengeIntervalBlocks:         challengeIntervalBlocks,
		ChallengePeriod:                 &challengePeriod,
		RewardPerDay:                    rewardPerDay,
		ChallengeSlashAmount:            challengeSlashAmount,
		ConsecutiveFailsThreshold:       consecutiveFailsThreshold,
		ConsecutiveFailsSlashPercentage: consecutiveFailsSlashPercentage,
		UnstakeCooldownBlocks:           unstakeCooldownBlocks,
		StoragePricePerMb:               storagePricePerMb,
		FreeStorageMb:                   freeStorageMb,
		MaxProviders:                    maxProviders,
		EnableStorageChallenges:         enableStorageChallenges,
	}
}

// DefaultParams returns a default set of parameters
func DefaultParams() Params {
	return NewParams(
		DefaultMinStakeAmount,
		DefaultChallengeIntervalBlocks,
		DefaultChallengePeriod,
		DefaultRewardPerDay,
		DefaultChallengeSlashAmount,
		DefaultConsecutiveFailsThreshold,
		DefaultConsecutiveFailsSlashPercentage,
		DefaultUnstakeCooldownBlocks,
		DefaultStoragePricePerMb,
		DefaultFreeStorageMb,
		DefaultMaxProviders,
		DefaultEnableStorageChallenges,
	)
}

// ParamSetPairs get the params.ParamSet
func (p *Params) ParamSetPairs() paramtypes.ParamSetPairs {
	return paramtypes.ParamSetPairs{
		paramtypes.NewParamSetPair(KeyMinStakeAmount, &p.MinStakeAmount, validateMinStakeAmount),
		paramtypes.NewParamSetPair(KeyChallengeIntervalBlocks, &p.ChallengeIntervalBlocks, validateChallengeIntervalBlocks),
		paramtypes.NewParamSetPair(KeyChallengePeriod, &p.ChallengePeriod, validateChallengePeriod),
		paramtypes.NewParamSetPair(KeyRewardPerDay, &p.RewardPerDay, validateRewardPerDay),
		paramtypes.NewParamSetPair(KeyChallengeSlashAmount, &p.ChallengeSlashAmount, validateChallengeSlashAmount),
		paramtypes.NewParamSetPair(KeyConsecutiveFailsThreshold, &p.ConsecutiveFailsThreshold, validateConsecutiveFailsThreshold),
		paramtypes.NewParamSetPair(KeyConsecutiveFailsSlashPercentage, &p.ConsecutiveFailsSlashPercentage, validateConsecutiveFailsSlashPercentage),
		paramtypes.NewParamSetPair(KeyUnstakeCooldownBlocks, &p.UnstakeCooldownBlocks, validateUnstakeCooldownBlocks),
		paramtypes.NewParamSetPair(KeyStoragePricePerMb, &p.StoragePricePerMb, validateStoragePricePerMb),
		paramtypes.NewParamSetPair(KeyFreeStorageMb, &p.FreeStorageMb, validateFreeStorageMb),
		paramtypes.NewParamSetPair(KeyMaxProviders, &p.MaxProviders, validateMaxProviders),
		paramtypes.NewParamSetPair(KeyEnableStorageChallenges, &p.EnableStorageChallenges, validateEnableStorageChallenges),
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
	if err := validateChallengePeriod(p.ChallengePeriod); err != nil {
		return err
	}
	if err := validateRewardPerDay(p.RewardPerDay); err != nil {
		return err
	}
	if err := validateChallengeSlashAmount(p.ChallengeSlashAmount); err != nil {
		return err
	}
	if err := validateConsecutiveFailsThreshold(p.ConsecutiveFailsThreshold); err != nil {
		return err
	}
	if err := validateConsecutiveFailsSlashPercentage(p.ConsecutiveFailsSlashPercentage); err != nil {
		return err
	}
	if err := validateUnstakeCooldownBlocks(p.UnstakeCooldownBlocks); err != nil {
		return err
	}
	if err := validateStoragePricePerMb(p.StoragePricePerMb); err != nil {
		return err
	}
	if err := validateFreeStorageMb(p.FreeStorageMb); err != nil {
		return err
	}
	if err := validateMaxProviders(p.MaxProviders); err != nil {
		return err
	}
	if err := validateEnableStorageChallenges(p.EnableStorageChallenges); err != nil {
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

// validateChallengePeriod validates the ChallengePeriod param
func validateChallengePeriod(v interface{}) error {
	period, ok := v.(*time.Duration)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}
	if period == nil || period.Seconds() <= 0 {
		return fmt.Errorf("challenge period must be greater than 0")
	}
	return nil
}

// validateRewardPerDay validates the RewardPerDay param
func validateRewardPerDay(v interface{}) error {
	coin, ok := v.(sdk.Coin)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}
	if coin.IsZero() {
		return fmt.Errorf("reward per day cannot be zero")
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

// validateUnstakeCooldownBlocks validates the UnstakeCooldownBlocks param
func validateUnstakeCooldownBlocks(v interface{}) error {
	blocks, ok := v.(uint64)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}
	if blocks == 0 {
		return fmt.Errorf("unstake cooldown blocks cannot be 0")
	}
	return nil
}

// validateStoragePricePerMb validates the StoragePricePerMb param
func validateStoragePricePerMb(v interface{}) error {
	_, ok := v.(sdk.Coin)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}

	return nil
}

// validateFreeStorageMb validates the FreeStorageMb param
func validateFreeStorageMb(v interface{}) error {
	mb, ok := v.(uint64)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}
	if mb == 0 {
		return fmt.Errorf("free storage mb cannot be zero")
	}

	return nil
}

// validateMaxProviders validates the MaxProviders param
func validateMaxProviders(v interface{}) error {
	providers, ok := v.(uint64)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}
	if providers == 0 {
		return fmt.Errorf("max providers cannot be zero")
	}
	return nil
}

// validateEnableStorageChallenges validates the EnableStorageChallenges param
func validateEnableStorageChallenges(v interface{}) error {
	_, ok := v.(bool)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}
	return nil
}
