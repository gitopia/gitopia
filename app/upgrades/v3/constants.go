package v3

import (
	store "github.com/cosmos/cosmos-sdk/store/types"

	"github.com/gitopia/gitopia/app/upgrades"
	gitopiatypes "github.com/gitopia/gitopia/x/gitopia/types"
)

const (
	// UpgradeName defines the on-chain upgrade name.
	UpgradeName = "v3"
)

var Upgrade = upgrades.Upgrade{
	UpgradeName:          UpgradeName,
	CreateUpgradeHandler: CreateUpgradeHandler,
	StoreUpgrades: store.StoreUpgrades{
		Added: []string{
			gitopiatypes.ModuleName,
		},
	},
}
