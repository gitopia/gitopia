package simapp

import (
	"time"

	sims "github.com/cosmos/cosmos-sdk/testutil/sims"
	gitopiaparams "github.com/gitopia/gitopia/v6/app/params"

	tmdb "github.com/cometbft/cometbft-db"
	"github.com/cometbft/cometbft/libs/log"
	tmproto "github.com/cometbft/cometbft/proto/tendermint/types"
	tmtypes "github.com/cometbft/cometbft/types"

	"github.com/gitopia/gitopia/v6/app"
)

// setup creates application instance with in-memory database and disabled logging.
func setup(dir string) *app.GitopiaApp {
	db := tmdb.NewMemDB()
	logger := log.NewNopLogger()

	encoding := gitopiaparams.EncodingConfig(app.MakeEncodingConfig())

	a := app.NewGitopiaApp(logger, db, nil, true, map[int64]bool{}, dir, encoding,
		// this line is used by starport scaffolding # stargate/testutil/appArgument
		sims.EmptyAppOptions{})
	// https://github.com/cosmos/cosmos-sdk/issues/8961. EDIT: DO NOT init chain
	// InitChain updates deliverState which is required when app.NewContext is called
	// a.InitChain(abci.RequestInitChain{
	// 	Validators:      []abci.ValidatorUpdate{},
	// 	ConsensusParams: defaultConsensusParams,
	// 	AppStateBytes:   []byte("{}"),
	// })

	return a
}

var defaultConsensusParams = &tmproto.ConsensusParams{
	Block: &tmproto.BlockParams{
		MaxBytes: 200000,
		MaxGas:   2000000,
	},
	Evidence: &tmproto.EvidenceParams{
		MaxAgeNumBlocks: 302400,
		MaxAgeDuration:  504 * time.Hour, // 3 weeks is the max duration
		MaxBytes:        10000,
	},
	Validator: &tmproto.ValidatorParams{
		PubKeyTypes: []string{
			tmtypes.ABCIPubKeyTypeEd25519,
		},
	},
}
