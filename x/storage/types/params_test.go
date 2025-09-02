package types

import (
	"testing"
	"time"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
)

func TestParamsValidate(t *testing.T) {
	d, _ := sdk.NewDecFromStr("0.1")
	testCases := []struct {
		name     string
		params   Params
		expError bool
	}{
		{
			name:     "default params",
			params:   DefaultParams(),
			expError: false,
		},
		{
			name: "valid params",
			params: NewParams(
				1, 1, 1, sdk.NewCoin("ulore", sdk.NewInt(1)), 1, sdk.NewCoin("ulore", sdk.NewInt(1)), 1, 1, 1, d,
				sdk.NewCoin("ulore", sdk.NewInt(1)), d, 1, sdk.NewCoin("ulore", sdk.NewInt(1)), d, 1, 1,
			),
			expError: false,
		},
		{
			name: "invalid min stake amount",
			params: NewParams(
				0, 1, 1, sdk.NewCoin("ulore", sdk.NewInt(1)), 1, sdk.NewCoin("ulore", sdk.NewInt(1)), 1, 1, 1, d,
				sdk.NewCoin("ulore", sdk.NewInt(1)), d, 1, sdk.NewCoin("ulore", sdk.NewInt(1)), d, 1, 1,
			),
			expError: true,
		},
		{
			name: "invalid challenge interval blocks",
			params: NewParams(
				1, 0, 1, sdk.NewCoin("ulore", sdk.NewInt(1)), 1, sdk.NewCoin("ulore", sdk.NewInt(1)), 1, 1, 1, d,
				sdk.NewCoin("ulore", sdk.NewInt(1)), d, 1, sdk.NewCoin("ulore", sdk.NewInt(1)), d, 1, 1,
			),
			expError: true,
		},
		{
			name: "invalid challenge period",
			params: NewParams(
				1, 1, 0, sdk.NewCoin("ulore", sdk.NewInt(1)), 1, sdk.NewCoin("ulore", sdk.NewInt(1)), 1, 1, 1, d,
				sdk.NewCoin("ulore", sdk.NewInt(1)), d, 1, sdk.NewCoin("ulore", sdk.NewInt(1)), d, 1, 1,
			),
			expError: true,
		},
		{
			name: "invalid reward per day",
			params: NewParams(
				1, 1, 1, sdk.NewCoin("ulore", sdk.NewInt(0)), 1, sdk.NewCoin("ulore", sdk.NewInt(1)), 1, 1, 1, d,
				sdk.NewCoin("ulore", sdk.NewInt(1)), d, 1, sdk.NewCoin("ulore", sdk.NewInt(1)), d, 1, 1,
			),
			expError: true,
		},
		{
			name: "invalid unstake cooldown blocks",
			params: NewParams(
				1, 1, 1, sdk.NewCoin("ulore", sdk.NewInt(1)), 0, sdk.NewCoin("ulore", sdk.NewInt(1)), 1, 1, 1, d,
				sdk.NewCoin("ulore", sdk.NewInt(1)), d, 1, sdk.NewCoin("ulore", sdk.NewInt(1)), d, 1, 1,
			),
			expError: true,
		},
		{
			name: "invalid free storage mb",
			params: NewParams(
				1, 1, 1, sdk.NewCoin("ulore", sdk.NewInt(1)), 1, sdk.NewCoin("ulore", sdk.NewInt(1)), 0, 1, 1, d,
				sdk.NewCoin("ulore", sdk.NewInt(1)), d, 1, sdk.NewCoin("ulore", sdk.NewInt(1)), d, 1, 1,
			),
			expError: true,
		},
		{
			name: "invalid max providers",
			params: NewParams(
				1, 1, 1, sdk.NewCoin("ulore", sdk.NewInt(1)), 1, sdk.NewCoin("ulore", sdk.NewInt(1)), 1, 0, 1, d,
				sdk.NewCoin("ulore", sdk.NewInt(1)), d, 1, sdk.NewCoin("ulore", sdk.NewInt(1)), d, 1, 1,
			),
			expError: true,
		},
		{
			name: "invalid liveness window challenges",
			params: NewParams(
				1, 1, 1, sdk.NewCoin("ulore", sdk.NewInt(1)), 1, sdk.NewCoin("ulore", sdk.NewInt(1)), 1, 1, 0, d,
				sdk.NewCoin("ulore", sdk.NewInt(1)), d, 1, sdk.NewCoin("ulore", sdk.NewInt(1)), d, 1, 1,
			),
			expError: true,
		},
		{
			name: "invalid min liveness per window",
			params: NewParams(
				1, 1, 1, sdk.NewCoin("ulore", sdk.NewInt(1)), 1, sdk.NewCoin("ulore", sdk.NewInt(1)), 1, 1, 1, sdk.NewDec(2),
				sdk.NewCoin("ulore", sdk.NewInt(1)), d, 1, sdk.NewCoin("ulore", sdk.NewInt(1)), d, 1, 1,
			),
			expError: true,
		},
		{
			name: "invalid liveness jail time",
			params: NewParams(
				1, 1, 1, sdk.NewCoin("ulore", sdk.NewInt(1)), 1, sdk.NewCoin("ulore", sdk.NewInt(1)), 1, 1, 1, d,
				sdk.NewCoin("ulore", sdk.NewInt(1)), d, 0, sdk.NewCoin("ulore", sdk.NewInt(1)), d, 1, 1,
			),
			expError: true,
		},
		{
			name: "invalid proof fault jail time",
			params: NewParams(
				1, 1, 1, sdk.NewCoin("ulore", sdk.NewInt(1)), 1, sdk.NewCoin("ulore", sdk.NewInt(1)), 1, 1, 1, d,
				sdk.NewCoin("ulore", sdk.NewInt(1)), d, 1, sdk.NewCoin("ulore", sdk.NewInt(1)), d, 0, 1,
			),
			expError: true,
		},
		{
			name: "invalid max proof faults",
			params: NewParams(
				1, 1, 1, sdk.NewCoin("ulore", sdk.NewInt(1)), 1, sdk.NewCoin("ulore", sdk.NewInt(1)), 1, 1, 1, d,
				sdk.NewCoin("ulore", sdk.NewInt(1)), d, 1, sdk.NewCoin("ulore", sdk.NewInt(1)), d, 1, 0,
			),
			expError: true,
		},
	}

	for _, tc := range testCases {
		err := tc.params.Validate()
		if tc.expError {
			require.Error(t, err, tc.name)
		} else {
			require.NoError(t, err, tc.name)
		}
	}
}

func TestValidateChallengePeriod(t *testing.T) {
	d := time.Second
	err := validateChallengePeriod(&d)
	require.NoError(t, err)

	d = 0
	err = validateChallengePeriod(&d)
	require.Error(t, err)

	err = validateChallengePeriod(d)
	require.Error(t, err)
}

func TestValidateLivenessJailTime(t *testing.T) {
	d := time.Second
	err := validateLivenessJailTime(&d)
	require.NoError(t, err)

	d = 0
	err = validateLivenessJailTime(&d)
	require.Error(t, err)

	err = validateLivenessJailTime(d)
	require.Error(t, err)
}

func TestValidateProofFaultJailTime(t *testing.T) {
	d := time.Second
	err := validateProofFaultJailTime(&d)
	require.NoError(t, err)

	d = 0
	err = validateProofFaultJailTime(&d)
	require.Error(t, err)

	err = validateProofFaultJailTime(d)
	require.Error(t, err)
}

func TestValidateMinLivenessPerWindow(t *testing.T) {
	d := math.LegacyNewDec(0)
	err := validateMinLivenessPerWindow(d)
	require.NoError(t, err)

	d = math.LegacyNewDec(-1)
	err = validateMinLivenessPerWindow(d)
	require.Error(t, err)

	d = math.LegacyNewDec(2)
	err = validateMinLivenessPerWindow(d)
	require.Error(t, err)

	err = validateMinLivenessPerWindow(2)
	require.Error(t, err)
}

func TestValidateLivenessSlashFraction(t *testing.T) {
	d := math.LegacyNewDec(0)
	err := validateLivenessSlashFraction(d)
	require.NoError(t, err)

	d = math.LegacyNewDec(-1)
	err = validateLivenessSlashFraction(d)
	require.Error(t, err)

	d = math.LegacyNewDec(2)
	err = validateLivenessSlashFraction(d)
	require.Error(t, err)

	err = validateLivenessSlashFraction(2)
	require.Error(t, err)
}

func TestValidateProofFaultSlashFraction(t *testing.T) {
	d := math.LegacyNewDec(0)
	err := validateProofFaultSlashFraction(d)
	require.NoError(t, err)

	d = math.LegacyNewDec(-1)
	err = validateProofFaultSlashFraction(d)
	require.Error(t, err)

	d = math.LegacyNewDec(2)
	err = validateProofFaultSlashFraction(d)
	require.Error(t, err)

	err = validateProofFaultSlashFraction(2)
	require.Error(t, err)
}
