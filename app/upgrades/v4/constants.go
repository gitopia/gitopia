package v21

import (
	"github.com/gitopia/gitopia/v4/app/upgrades"

	store "github.com/cosmos/cosmos-sdk/store/types"
	consensustypes "github.com/cosmos/cosmos-sdk/x/consensus/types"
	crisistypes "github.com/cosmos/cosmos-sdk/x/crisis/types"
	icacontrollertypes "github.com/cosmos/ibc-go/v7/modules/apps/27-interchain-accounts/controller/types"
	icahosttypes "github.com/cosmos/ibc-go/v7/modules/apps/27-interchain-accounts/host/types"
)

// UpgradeName defines the on-chain upgrade name for the Gitopia v4 upgrade.
const (
	UpgradeName = "v4"
)

var Upgrade = upgrades.Upgrade{
	UpgradeName:          UpgradeName,
	CreateUpgradeHandler: CreateUpgradeHandler,
	StoreUpgrades: store.StoreUpgrades{
		Added: []string{
			// v47 modules
			crisistypes.ModuleName,
			consensustypes.ModuleName,
			// ICA
			icacontrollertypes.SubModuleName,
			icahosttypes.SubModuleName,
		},
		Deleted: []string{},
	},
}
