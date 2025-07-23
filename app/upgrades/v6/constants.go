package v6

import (
	"github.com/gitopia/gitopia/v6/app/upgrades"
	storagetypes "github.com/gitopia/gitopia/v6/x/storage/types"

	store "github.com/cosmos/cosmos-sdk/store/types"
)

// UpgradeName defines the on-chain upgrade name for the Gitopia v6 upgrade.
const (
	UpgradeName = "v6"
)

var Upgrade = upgrades.Upgrade{
	UpgradeName:          UpgradeName,
	CreateUpgradeHandler: CreateUpgradeHandler,
	StoreUpgrades: store.StoreUpgrades{
		Added: []string{
			storagetypes.ModuleName,
		},
		Deleted: []string{},
	},
}
