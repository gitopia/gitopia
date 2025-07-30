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
	DefaultChallengePeriod    = 10 * time.Second
	DefaultLivenessJailTime   = 900 * time.Second
	DefaultProofFaultJailTime = 4 * time.Hour
)

var (
	KeyMinStakeAmount          = []byte("MinStakeAmount")
	KeyChallengeIntervalBlocks = []byte("ChallengeIntervalBlocks")
	KeyChallengePeriod         = []byte("ChallengePeriod")
	KeyRewardPerDay            = []byte("RewardPerDay")
	KeyUnstakeCooldownBlocks   = []byte("UnstakeCooldownBlocks")
	KeyStoragePricePerMb       = []byte("StoragePricePerMb")
	KeyFreeStorageMb           = []byte("FreeStorageMb")
	KeyMaxProviders            = []byte("MaxProviders")

	// Liveness tracking parameter keys
	KeyLivenessWindowChallenges  = []byte("LivenessWindowChallenges")
	KeyMinLivenessRatio          = []byte("MinLivenessRatio")
	KeyLivenessSlashAmount       = []byte("LivenessSlashAmount")
	KeyLivenessSlashPercentage   = []byte("LivenessSlashPercentage")
	KeyLivenessJailTime          = []byte("LivenessJailTime")
	KeyProofFaultSlashAmount     = []byte("ProofFaultSlashAmount")
	KeyProofFaultSlashPercentage = []byte("ProofFaultSlashPercentage")
	KeyProofFaultJailTime        = []byte("ProofFaultJailTime")
	KeyMaxProofFaults            = []byte("MaxProofFaults")

	// Default values for parameters
	DefaultMinStakeAmount                  uint64   = 1_000_000_000_000                               // $1134
	DefaultChallengeIntervalBlocks         uint64   = 100                                             // ~30 min
	DefaultRewardPerDay                    sdk.Coin = sdk.NewCoin("ulore", sdk.NewInt(4_267_000_000)) // $4.8 a day, $150 a month per provider
	DefaultChallengeSlashAmount            sdk.Coin = sdk.NewCoin("ulore", sdk.NewInt(2_200_000_000)) // $2.5
	DefaultConsecutiveFailsThreshold       uint64   = 3
	DefaultConsecutiveFailsSlashPercentage uint64   = 1                                        // $11 when stake is $1134
	DefaultUnstakeCooldownBlocks           uint64   = 1_521_500                                // ~28 days
	DefaultStoragePricePerMb               sdk.Coin = sdk.NewCoin("ulore", sdk.NewInt(12_000)) // $0.00001 per MB of storage update
	DefaultFreeStorageMb                   uint64   = 157_286_400                              // 150Mb
	DefaultMaxProviders                    uint64   = 5

	// Liveness tracking default values
	DefaultLivenessWindowChallenges  uint64   = 100                                             // Last 100 challenges (~2.7 hours at 100 block intervals)
	DefaultMinLivenessRatio          uint64   = 67                                              // 67% minimum liveness
	DefaultLivenessSlashAmount       sdk.Coin = sdk.NewCoin("ulore", sdk.NewInt(500_000_000))   // $0.56 (lighter penalty for liveness)
	DefaultLivenessSlashPercentage   uint64   = 50                                              // 0.5% stake slash for liveness fault (50 basis points)
	DefaultLivenessJailBlocks        uint64   = 86400                                           // ~2.4 days jail for liveness fault
	DefaultProofFaultSlashAmount     sdk.Coin = sdk.NewCoin("ulore", sdk.NewInt(2_200_000_000)) // $2.5 (heavier penalty for proof fault)
	DefaultProofFaultSlashPercentage uint64   = 2                                               // 2% stake slash for proof fault
	DefaultProofFaultJailBlocks      uint64   = 259200                                          // ~7.2 days jail for proof fault
	DefaultMaxProofFaults            uint64   = 3                                               // Max consecutive proof faults
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
	storagePricePerMb sdk.Coin,
	freeStorageMb uint64,
	maxProviders uint64,
	// Liveness tracking parameters
	livenessWindowChallenges uint64,
	minLivenessRatio uint64,
	livenessSlashAmount sdk.Coin,
	livenessSlashPercentage uint64,
	livenessJailTime time.Duration,
	proofFaultSlashAmount sdk.Coin,
	proofFaultSlashPercentage uint64,
	proofFaultJailTime time.Duration,
	maxProofFaults uint64,
) Params {
	return Params{
		MinStakeAmount:          minStakeAmount,
		ChallengeIntervalBlocks: challengeIntervalBlocks,
		ChallengePeriod:         &challengePeriod,
		RewardPerDay:            rewardPerDay,
		UnstakeCooldownBlocks:   unstakeCooldownBlocks,
		StoragePricePerMb:       storagePricePerMb,
		FreeStorageMb:           freeStorageMb,
		MaxProviders:            maxProviders,
		// Liveness tracking fields
		LivenessWindowChallenges:  livenessWindowChallenges,
		MinLivenessRatio:          minLivenessRatio,
		LivenessSlashAmount:       livenessSlashAmount,
		LivenessSlashPercentage:   livenessSlashPercentage,
		LivenessJailTime:          &livenessJailTime,
		ProofFaultSlashAmount:     proofFaultSlashAmount,
		ProofFaultSlashPercentage: proofFaultSlashPercentage,
		ProofFaultJailTime:        &proofFaultJailTime,
		MaxProofFaults:            maxProofFaults,
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
		DefaultStoragePricePerMb,
		DefaultFreeStorageMb,
		DefaultMaxProviders,
		// Liveness tracking defaults
		DefaultLivenessWindowChallenges,
		DefaultMinLivenessRatio,
		DefaultLivenessSlashAmount,
		DefaultLivenessSlashPercentage,
		DefaultLivenessJailTime,
		DefaultProofFaultSlashAmount,
		DefaultProofFaultSlashPercentage,
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
		paramtypes.NewParamSetPair(KeyStoragePricePerMb, &p.StoragePricePerMb, validateStoragePricePerMb),
		paramtypes.NewParamSetPair(KeyFreeStorageMb, &p.FreeStorageMb, validateFreeStorageMb),
		paramtypes.NewParamSetPair(KeyMaxProviders, &p.MaxProviders, validateMaxProviders),
		// Liveness tracking parameters
		paramtypes.NewParamSetPair(KeyLivenessWindowChallenges, &p.LivenessWindowChallenges, validateLivenessWindowChallenges),
		paramtypes.NewParamSetPair(KeyMinLivenessRatio, &p.MinLivenessRatio, validateMinLivenessRatio),
		paramtypes.NewParamSetPair(KeyLivenessSlashAmount, &p.LivenessSlashAmount, validateLivenessSlashAmount),
		paramtypes.NewParamSetPair(KeyLivenessSlashPercentage, &p.LivenessSlashPercentage, validateLivenessSlashPercentage),
		paramtypes.NewParamSetPair(KeyLivenessJailTime, &p.LivenessJailTime, validateLivenessJailTime),
		paramtypes.NewParamSetPair(KeyProofFaultSlashAmount, &p.ProofFaultSlashAmount, validateProofFaultSlashAmount),
		paramtypes.NewParamSetPair(KeyProofFaultSlashPercentage, &p.ProofFaultSlashPercentage, validateProofFaultSlashPercentage),
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
	if err := validateStoragePricePerMb(p.StoragePricePerMb); err != nil {
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
	if err := validateMinLivenessRatio(p.MinLivenessRatio); err != nil {
		return err
	}
	if err := validateLivenessSlashAmount(p.LivenessSlashAmount); err != nil {
		return err
	}
	if err := validateLivenessSlashPercentage(p.LivenessSlashPercentage); err != nil {
		return err
	}
	if err := validateLivenessJailTime(p.LivenessJailTime); err != nil {
		return err
	}
	if err := validateProofFaultSlashAmount(p.ProofFaultSlashAmount); err != nil {
		return err
	}
	if err := validateProofFaultSlashPercentage(p.ProofFaultSlashPercentage); err != nil {
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

// validateMinLivenessRatio validates the MinLivenessRatio param
func validateMinLivenessRatio(v interface{}) error {
	ratio, ok := v.(uint64)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}
	if ratio == 0 || ratio > 100 {
		return fmt.Errorf("min liveness ratio must be between 1 and 100")
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

// validateLivenessSlashPercentage validates the LivenessSlashPercentage param
func validateLivenessSlashPercentage(v interface{}) error {
	percentage, ok := v.(uint64)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}
	if percentage > 10000 { // 100.00% in basis points
		return fmt.Errorf("liveness slash percentage cannot exceed 100%%")
	}
	return nil
}

// validateLivenessJailTime validates the LivenessJailTime param
func validateLivenessJailTime(v interface{}) error {
	time, ok := v.(*time.Duration)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}
	if time == nil || time.Seconds() <= 0 {
		return fmt.Errorf("liveness jail time cannot be zero")
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

// validateProofFaultSlashPercentage validates the ProofFaultSlashPercentage param
func validateProofFaultSlashPercentage(v interface{}) error {
	percentage, ok := v.(uint64)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}
	if percentage > 10000 { // 100.00% in basis points
		return fmt.Errorf("proof fault slash percentage cannot exceed 100%%")
	}
	return nil
}

// validateProofFaultJailTime validates the ProofFaultJailTime param
func validateProofFaultJailTime(v interface{}) error {
	time, ok := v.(*time.Duration)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}
	if time == nil || time.Seconds() <= 0 {
		return fmt.Errorf("proof fault jail time cannot be zero")
	}
	return nil
}

// validateMaxLivenessFaults validates the MaxLivenessFaults param
func validateMaxLivenessFaults(v interface{}) error {
	faults, ok := v.(uint64)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}
	if faults == 0 {
		return fmt.Errorf("max liveness faults cannot be zero")
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
