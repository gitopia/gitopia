package app

import (
	"encoding/json"

	"github.com/gitopia/gitopia/v6/app/params"
)

// The genesis state of the blockchain is represented here as a map of raw json
// messages key'd by a identifier string.
// The identifier is used to determine which module genesis information belongs
// to so it may be appropriately routed during init chain.
// Within this application default genesis information is retrieved from
// the ModuleBasicManager which populates json from each BasicModule
// object provided to it during init.
type GenesisState map[string]json.RawMessage

// NewDefaultGenesisState generates the default state for the application.
func NewDefaultGenesisState(encConfig params.EncodingConfig) GenesisState {
	return ModuleBasics.DefaultGenesis(encConfig.Codec)
}
