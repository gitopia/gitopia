package app

import (
	"encoding/json"
	"os"

	dbm "github.com/cometbft/cometbft-db"
	abci "github.com/cometbft/cometbft/abci/types"
	"github.com/cometbft/cometbft/libs/log"

	"github.com/cosmos/cosmos-sdk/codec"
	sims "github.com/cosmos/cosmos-sdk/testutil/sims"
	sdk "github.com/cosmos/cosmos-sdk/types"
	gitopiaparams "github.com/gitopia/gitopia/v4/app/params"
)

var defaultGenesisBz []byte

func getDefaultGenesisStateBytes(cdc codec.JSONCodec) []byte {
	if len(defaultGenesisBz) == 0 {
		genesisState := NewDefaultGenesisState(cdc)
		stateBytes, err := json.MarshalIndent(genesisState, "", " ")
		if err != nil {
			panic(err)
		}
		defaultGenesisBz = stateBytes
	}
	return defaultGenesisBz
}

// Setup initializes a new GitopiaApp.
func Setup(isCheckTx bool) *GitopiaApp {
	db := dbm.NewMemDB()
	encoding := gitopiaparams.EncodingConfig(MakeEncodingConfig())

	app := NewGitopiaApp(log.NewNopLogger(), db, nil, true, map[int64]bool{}, DefaultNodeHome, 0, encoding, sims.EmptyAppOptions{})
	if !isCheckTx {
		stateBytes := getDefaultGenesisStateBytes(app.AppCodec())

		app.InitChain(
			abci.RequestInitChain{
				Validators:      []abci.ValidatorUpdate{},
				ConsensusParams: simapp.DefaultConsensusParams,
				AppStateBytes:   stateBytes,
			},
		)
	}

	return app
}

// SetupTestingAppWithLevelDb initializes a new GitopiaApp intended for testing,
// with LevelDB as a db.
func SetupTestingAppWithLevelDb(isCheckTx bool) (app *GitopiaApp, cleanupFn func()) {
	dir := "osmosis_testing"
	db, err := sdk.NewLevelDB("gitopia_leveldb_testing", dir)
	if err != nil {
		panic(err)
	}
	encoding := gitopiaparams.EncodingConfig(MakeEncodingConfig())

	app = NewGitopiaApp(log.NewNopLogger(), db, nil, true, map[int64]bool{}, DefaultNodeHome, 5, encoding, simapp.EmptyAppOptions{})
	if !isCheckTx {
		genesisState := NewDefaultGenesisState(app.AppCodec())
		stateBytes, err := json.MarshalIndent(genesisState, "", " ")
		if err != nil {
			panic(err)
		}

		app.InitChain(
			abci.RequestInitChain{
				Validators:      []abci.ValidatorUpdate{},
				ConsensusParams: simapp.DefaultConsensusParams,
				AppStateBytes:   stateBytes,
			},
		)
	}

	cleanupFn = func() {
		db.Close()
		err = os.RemoveAll(dir)
		if err != nil {
			panic(err)
		}
	}

	return app, cleanupFn
}
