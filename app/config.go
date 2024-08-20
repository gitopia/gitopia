package app

import (
	"fmt"
	"time"

	dbm "github.com/cometbft/cometbft-db"

	"github.com/cosmos/cosmos-sdk/baseapp"
	"github.com/cosmos/cosmos-sdk/crypto/hd"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	"github.com/cosmos/cosmos-sdk/testutil/network"
	sims "github.com/cosmos/cosmos-sdk/testutil/sims"

	servertypes "github.com/cosmos/cosmos-sdk/server/types"
	pruningtypes "github.com/cosmos/cosmos-sdk/store/pruning/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
)

// DefaultConfig returns a default configuration suitable for nearly all
// testing requirements.
func DefaultConfig() network.Config {
	encCfg := MakeEncodingConfig()

	return network.Config{
		Codec:             encCfg.Codec,
		TxConfig:          encCfg.TxConfig,
		LegacyAmino:       encCfg.Amino,
		InterfaceRegistry: encCfg.InterfaceRegistry,
		AccountRetriever:  authtypes.AccountRetriever{},
		AppConstructor:    NewAppConstructor("gitopia-code-test"),
		GenesisState:      ModuleBasics.DefaultGenesis(encCfg.Codec),
		TimeoutCommit:     1 * time.Second / 2,
		ChainID:           "gitopia-code-test",
		NumValidators:     1,
		BondDenom:         sdk.DefaultBondDenom,
		MinGasPrices:      fmt.Sprintf("0.000006%s", sdk.DefaultBondDenom),
		AccountTokens:     sdk.TokensFromConsensusPower(1000, sdk.DefaultPowerReduction),
		StakingTokens:     sdk.TokensFromConsensusPower(500, sdk.DefaultPowerReduction),
		BondedTokens:      sdk.TokensFromConsensusPower(100, sdk.DefaultPowerReduction),
		PruningStrategy:   pruningtypes.PruningOptionNothing,
		CleanupDir:        true,
		SigningAlgo:       string(hd.Secp256k1Type),
		KeyringOptions:    []keyring.Option{},
	}
}

// NewAppConstructor returns a new Gitopia app given encoding type configs.
func NewAppConstructor(chainId string) network.AppConstructor {
	encCfg := MakeEncodingConfig()

	return func(val network.ValidatorI) servertypes.Application {
		valCtx := val.GetCtx()
		appConfig := val.GetAppConfig()

		return NewGitopiaApp(
			valCtx.Logger, dbm.NewMemDB(), nil, true, map[int64]bool{}, valCtx.Config.RootDir,
			encCfg,
			sims.EmptyAppOptions{},
			baseapp.SetMinGasPrices(appConfig.MinGasPrices),
			baseapp.SetChainID(chainId),
		)
	}
}
