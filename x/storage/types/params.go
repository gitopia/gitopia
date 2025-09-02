package types

import (
	"fmt"
	"time"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"
	"gopkg.in/yaml.v2"
)

var _ paramtypes.ParamSet = (*Params)(nil)

const (
	DefaultChallengePeriod    = 10 * time.Second
	DefaultLivenessJailTime   = 4 * time.Hour
	DefaultProofFaultJailTime = 24 * time.Hour
)

// NOTE: ChallengeIntervalBlocks should be set to a value greater than ChallengePeriod
// to ensure that only one challenge is active at a time. The EndBlock logic in module.go
// only checks the last challenge in the queue, so if multiple challenges are active
// during the same period, the logic will not process all of them correctly.
var (
	KeyMinStakeAmount          = []byte("MinStakeAmount")
	KeyChallengeIntervalBlocks = []byte("ChallengeIntervalBlocks")
	KeyChallengePeriod         = []byte("ChallengePeriod")
	KeyRewardPerDay            = []byte("RewardPerDay")
	KeyUnstakeCooldownBlocks   = []byte("UnstakeCooldownBlocks")
	KeyStoragePricePerGb       = []byte("StoragePricePerGb")
	KeyFreeStorageMb           = []byte("FreeStorageMb")
	KeyMaxProviders            = []byte("MaxProviders")

	// Liveness tracking parameter keys
	KeyLivenessWindowChallenges = []byte("LivenessWindowChallenges")
	KeyMinLivenessPerWindow     = []byte("MinLivenessPerWindow")
	KeyLivenessSlashAmount      = []byte("LivenessSlashAmount")
	KeyLivenessSlashFraction    = []byte("LivenessSlashFraction")
	KeyLivenessJailTime         = []byte("LivenessJailTime")
	KeyProofFaultSlashAmount    = []byte("ProofFaultSlashAmount")
	KeyProofFaultSlashFraction  = []byte("ProofFaultSlashFraction")
	KeyProofFaultJailTime       = []byte("ProofFaultJailTime")
	KeyMaxProofFaults           = []byte("MaxProofFaults")

	// Default values for parameters
	DefaultMinStakeAmount          uint64   = 1_000_000_000_000                               // $1292
	DefaultChallengeIntervalBlocks uint64   = 1000                                            // ~30 min
	DefaultRewardPerDay            sdk.Coin = sdk.NewCoin("ulore", sdk.NewInt(2_675_000_000)) // $5 a day, $150 a month per provider
	DefaultUnstakeCooldownBlocks   uint64   = 1_521_500                                       // ~28 days
	DefaultStoragePricePerGb       sdk.Coin = sdk.NewCoin("ulore", sdk.NewInt(1_070_000_000)) // $2 per GB of storage update
	DefaultFreeStorageMb           uint64   = 157_286_400                                     // 150Mb
	DefaultMaxProviders            uint64   = 5

	// Liveness tracking default values
	DefaultLivenessWindowChallenges uint64   = 336                      // Last 336 challenges (~7 days at 1000 block intervals)
	DefaultMinLivenessPerWindow     sdk.Dec  = sdk.NewDecWithPrec(5, 1) // 50% minimum liveness
	DefaultLivenessSlashAmount      sdk.Coin = sdk.NewCoin("ulore", sdk.NewInt(0))
	DefaultLivenessSlashFraction    sdk.Dec  = math.LegacyNewDec(5).Quo(math.LegacyNewDec(1000)) // 0.5% stake slash for liveness fault
	DefaultProofFaultSlashAmount    sdk.Coin = sdk.NewCoin("ulore", sdk.NewInt(0))
	DefaultProofFaultSlashFraction  sdk.Dec  = math.LegacyNewDec(1).Quo(math.LegacyNewDec(20)) // 5% stake slash for proof fault
	DefaultMaxProofFaults           uint64   = 3                                               // Max consecutive proof faults
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
	unstakeCooldownBlocks uint64,
	storagePricePerGb sdk.Coin,
	freeStorageMb uint64,
	maxProviders uint64,
	// Liveness tracking parameters
	livenessWindowChallenges uint64,
	minLivenessPerWindow sdk.Dec,
	livenessSlashAmount sdk.Coin,
	livenessSlashFraction sdk.Dec,
	livenessJailTime time.Duration,
	proofFaultSlashAmount sdk.Coin,
	proofFaultSlashFraction sdk.Dec,
	proofFaultJailTime time.Duration,
	maxProofFaults uint64,
) Params {
	return Params{
		MinStakeAmount:          minStakeAmount,
		ChallengeIntervalBlocks: challengeIntervalBlocks,
		ChallengePeriod:         challengePeriod,
		RewardPerDay:            rewardPerDay,
		UnstakeCooldownBlocks:   unstakeCooldownBlocks,
		StoragePricePerGb:       storagePricePerGb,
		FreeStorageMb:           freeStorageMb,
		MaxProviders:            maxProviders,
		// Liveness tracking fields
		LivenessWindowChallenges: livenessWindowChallenges,
		MinLivenessPerWindow:     minLivenessPerWindow,
		LivenessSlashAmount:      livenessSlashAmount,
		LivenessSlashFraction:    livenessSlashFraction,
		LivenessJailTime:         livenessJailTime,
		ProofFaultSlashAmount:    proofFaultSlashAmount,
		ProofFaultSlashFraction:  proofFaultSlashFraction,
		ProofFaultJailTime:       proofFaultJailTime,
		MaxProofFaults:           maxProofFaults,
	}
}

// DefaultParams returns a default set of parameters
func DefaultParams() Params {
	return NewParams(
		DefaultMinStakeAmount,
		DefaultChallengeIntervalBlocks,
		DefaultChallengePeriod,
		DefaultRewardPerDay,
		DefaultUnstakeCooldownBlocks,
		DefaultStoragePricePerGb,
		DefaultFreeStorageMb,
		DefaultMaxProviders,
		// Liveness tracking defaults
		DefaultLivenessWindowChallenges,
		DefaultMinLivenessPerWindow,
		DefaultLivenessSlashAmount,
		DefaultLivenessSlashFraction,
		DefaultLivenessJailTime,
		DefaultProofFaultSlashAmount,
		DefaultProofFaultSlashFraction,
		DefaultProofFaultJailTime,
		DefaultMaxProofFaults,
	)
}

// ParamSetPairs get the params.ParamSet
func (p *Params) ParamSetPairs() paramtypes.ParamSetPairs {
	return paramtypes.ParamSetPairs{
		paramtypes.NewParamSetPair(KeyMinStakeAmount, &p.MinStakeAmount, validateMinStakeAmount),
		paramtypes.NewParamSetPair(KeyChallengeIntervalBlocks, &p.ChallengeIntervalBlocks, validateChallengeIntervalBlocks),
		paramtypes.NewParamSetPair(KeyChallengePeriod, &p.ChallengePeriod, validateChallengePeriod),
		paramtypes.NewParamSetPair(KeyRewardPerDay, &p.RewardPerDay, validateRewardPerDay),
		paramtypes.NewParamSetPair(KeyUnstakeCooldownBlocks, &p.UnstakeCooldownBlocks, validateUnstakeCooldownBlocks),
		paramtypes.NewParamSetPair(KeyStoragePricePerGb, &p.StoragePricePerGb, validateStoragePricePerGb),
		paramtypes.NewParamSetPair(KeyFreeStorageMb, &p.FreeStorageMb, validateFreeStorageMb),
		paramtypes.NewParamSetPair(KeyMaxProviders, &p.MaxProviders, validateMaxProviders),
		// Liveness tracking parameters
		paramtypes.NewParamSetPair(KeyLivenessWindowChallenges, &p.LivenessWindowChallenges, validateLivenessWindowChallenges),
		paramtypes.NewParamSetPair(KeyMinLivenessPerWindow, &p.MinLivenessPerWindow, validateMinLivenessPerWindow),
		paramtypes.NewParamSetPair(KeyLivenessSlashAmount, &p.LivenessSlashAmount, validateLivenessSlashAmount),
		paramtypes.NewParamSetPair(KeyLivenessSlashFraction, &p.LivenessSlashFraction, validateLivenessSlashFraction),
		paramtypes.NewParamSetPair(KeyLivenessJailTime, &p.LivenessJailTime, validateLivenessJailTime),
		paramtypes.NewParamSetPair(KeyProofFaultSlashAmount, &p.ProofFaultSlashAmount, validateProofFaultSlashAmount),
		paramtypes.NewParamSetPair(KeyProofFaultSlashFraction, &p.ProofFaultSlashFraction, validateProofFaultSlashFraction),
		paramtypes.NewParamSetPair(KeyProofFaultJailTime, &p.ProofFaultJailTime, validateProofFaultJailTime),
		paramtypes.NewParamSetPair(KeyMaxProofFaults, &p.MaxProofFaults, validateMaxProofFaults),
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
	if err := validateUnstakeCooldownBlocks(p.UnstakeCooldownBlocks); err != nil {
		return err
	}
	if err := validateStoragePricePerGb(p.StoragePricePerGb); err != nil {
		return err
	}
	if err := validateFreeStorageMb(p.FreeStorageMb); err != nil {
		return err
	}
	if err := validateMaxProviders(p.MaxProviders); err != nil {
		return err
	}
	if err := validateLivenessWindowChallenges(p.LivenessWindowChallenges); err != nil {
		return err
	}
	if err := validateMinLivenessPerWindow(p.MinLivenessPerWindow); err != nil {
		return err
	}
	if err := validateLivenessSlashAmount(p.LivenessSlashAmount); err != nil {
		return err
	}
	if err := validateLivenessSlashFraction(p.LivenessSlashFraction); err != nil {
		return err
	}
	if err := validateLivenessJailTime(p.LivenessJailTime); err != nil {
		return err
	}
	if err := validateProofFaultSlashAmount(p.ProofFaultSlashAmount); err != nil {
		return err
	}
	if err := validateProofFaultSlashFraction(p.ProofFaultSlashFraction); err != nil {
		return err
	}
	if err := validateProofFaultJailTime(p.ProofFaultJailTime); err != nil {
		return err
	}
	if err := validateMaxProofFaults(p.MaxProofFaults); err != nil {
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
		return fmt.Errorf("challenge interval blocks cannot be 0")
	}
	return nil
}

// validateChallengePeriod validates the ChallengePeriod param
func validateChallengePeriod(v interface{}) error {
	period, ok := v.(time.Duration)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}
	if period <= 0 {
		return fmt.Errorf("challenge period must be positive: %s", v)
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

// validateStoragePricePerGb validates the StoragePricePerGb param
func validateStoragePricePerGb(v interface{}) error {
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

// validateLivenessWindowChallenges validates the LivenessWindowChallenges param
func validateLivenessWindowChallenges(v interface{}) error {
	challenges, ok := v.(uint64)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}
	if challenges == 0 {
		return fmt.Errorf("liveness window challenges cannot be zero")
	}
	return nil
}

// validateMinLivenessPerWindow validates the MinLivenessPerWindow param
func validateMinLivenessPerWindow(v interface{}) error {
	ratio, ok := v.(sdk.Dec)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}
	if ratio.IsNil() {
		return fmt.Errorf("min liveness per window cannot be nil: %s", v)
	}
	if ratio.IsNegative() {
		return fmt.Errorf("min liveness per window cannot be negative: %s", v)
	}
	if ratio.GT(math.LegacyOneDec()) {
		return fmt.Errorf("min liveness per window too large: %s", v)
	}
	return nil
}

// validateLivenessSlashAmount validates the LivenessSlashAmount param
func validateLivenessSlashAmount(v interface{}) error {
	_, ok := v.(sdk.Coin)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}
	return nil
}

// validateLivenessSlashFraction validates the LivenessSlashFraction param
func validateLivenessSlashFraction(v interface{}) error {
	fraction, ok := v.(sdk.Dec)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}

	if fraction.IsNil() {
		return fmt.Errorf("liveness slash fraction cannot be nil: %s", v)
	}
	if fraction.IsNegative() {
		return fmt.Errorf("liveness slash fraction cannot be negative: %s", v)
	}
	if fraction.GT(math.LegacyOneDec()) {
		return fmt.Errorf("liveness slash fraction too large: %s", v)
	}

	return nil
}

// validateLivenessJailTime validates the LivenessJailTime param
func validateLivenessJailTime(v interface{}) error {
	time, ok := v.(time.Duration)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}
	if time <= 0 {
		return fmt.Errorf("liveness jail time must be positive: %s", v)
	}
	return nil
}

// validateProofFaultSlashAmount validates the ProofFaultSlashAmount param
func validateProofFaultSlashAmount(v interface{}) error {
	_, ok := v.(sdk.Coin)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}
	return nil
}

// validateProofFaultSlashFraction validates the ProofFaultSlashFraction param
func validateProofFaultSlashFraction(v interface{}) error {
	fraction, ok := v.(sdk.Dec)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}

	if fraction.IsNil() {
		return fmt.Errorf("proof fault slash fraction cannot be nil: %s", v)
	}
	if fraction.IsNegative() {
		return fmt.Errorf("proof fault slash fraction cannot be negative: %s", v)
	}
	if fraction.GT(math.LegacyOneDec()) {
		return fmt.Errorf("proof fault slash fraction too large: %s", v)
	}

	return nil
}

// validateProofFaultJailTime validates the ProofFaultJailTime param
func validateProofFaultJailTime(v interface{}) error {
	time, ok := v.(time.Duration)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}
	if time <= 0 {
		return fmt.Errorf("proof fault jail time must be positive: %s", v)
	}
	return nil
}

// validateMaxProofFaults validates the MaxProofFaults param
func validateMaxProofFaults(v interface{}) error {
	faults, ok := v.(uint64)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}
	if faults == 0 {
		return fmt.Errorf("max proof faults cannot be zero")
	}
	return nil
}
