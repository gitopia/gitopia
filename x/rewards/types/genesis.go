package types

import (
	"fmt"
)

// DefaultIndex is the default global index
const DefaultIndex uint64 = 1

// DefaultGenesis returns the default genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		Params:      DefaultParams(),
		RewardsList: []Reward{},
		// this line is used by starport scaffolding # genesis/types/default
	}
}

// Validate performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) Validate() error {
	// Check for duplicated index in rewards

	// Check for duplicated index in rewards
	rewardsIndexMap := make(map[string]struct{})

	for _, elem := range gs.RewardsList {
		index := string(RewardsKey(elem.Recipient))
		if _, ok := rewardsIndexMap[index]; ok {
			return fmt.Errorf("duplicated index for rewards")
		}
		rewardsIndexMap[index] = struct{}{}
	}
	// this line is used by starport scaffolding # genesis/types/validate

	return nil
}
