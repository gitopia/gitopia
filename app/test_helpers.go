package app

import (
	"encoding/json"
	"os"

	dbm "github.com/cometbft/cometbft-db"
	abci "github.com/cometbft/cometbft/abci/types"
	"github.com/cometbft/cometbft/libs/log"

	sims "github.com/cosmos/cosmos-sdk/testutil/sims"
	gitopiaparams "github.com/gitopia/gitopia/v6/app/params"
)

var defaultGenesisBz []byte

func getDefaultGenesisStateBytes(encConfig gitopiaparams.EncodingConfig) []byte {
	if len(defaultGenesisBz) == 0 {
		genesisState := NewDefaultGenesisState(encConfig)
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

	app := NewGitopiaApp(log.NewNopLogger(), db, nil, true, map[int64]bool{}, DefaultNodeHome, encoding, sims.EmptyAppOptions{})
	if !isCheckTx {
		stateBytes := getDefaultGenesisStateBytes(encoding)

		app.InitChain(
			abci.RequestInitChain{
				Validators:      []abci.ValidatorUpdate{},
				ConsensusParams: sims.DefaultConsensusParams,
				AppStateBytes:   stateBytes,
			},
		)
	}

	return app
}

// SetupTestingAppWithLevelDb initializes a new GitopiaApp intended for testing,
// with LevelDB as a db.
func SetupTestingAppWithLevelDb(isCheckTx bool) (app *GitopiaApp, cleanupFn func()) {
	dir, err := os.MkdirTemp(os.TempDir(), "gitopia_leveldb_testing")
	if err != nil {
		panic(err)
	}
	db, err := dbm.NewGoLevelDB("gitopia_leveldb_testing", dir)
	if err != nil {
		panic(err)
	}

	encoding := gitopiaparams.EncodingConfig(MakeEncodingConfig())

	app = NewGitopiaApp(log.NewNopLogger(), db, nil, true, map[int64]bool{}, DefaultNodeHome, encoding, sims.EmptyAppOptions{})
	if !isCheckTx {
		genesisState := NewDefaultGenesisState(encoding)
		stateBytes, err := json.MarshalIndent(genesisState, "", " ")
		if err != nil {
			panic(err)
		}

		app.InitChain(
			abci.RequestInitChain{
				Validators:      []abci.ValidatorUpdate{},
				ConsensusParams: sims.DefaultConsensusParams,
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
