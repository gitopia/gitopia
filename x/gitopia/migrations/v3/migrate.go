package v3

import (
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v3/x/gitopia/keeper"
	v2types "github.com/gitopia/gitopia/v3/x/gitopia/migrations/v2/types"
	v3types "github.com/gitopia/gitopia/v3/x/gitopia/types"
)

const (
	teamMultiSigAddress = "gitopia199540csqt8wllnjcdgx5466gmc3jxxy9d8tgm9"
)

var (
	GENESIS_TIME = time.Date(2023, 5, 17, 17, 5, 17, 517517517, time.UTC)
)

type Migrator struct {
	keeper keeper.Keeper
}

func NewMigrator(keeper keeper.Keeper) Migrator {
	return Migrator{
		keeper: keeper,
	}
}

// migrate module from v2 to v3
// platfrom incentives
func (m Migrator) Migrate(ctx sdk.Context) error {
	var oldParams v2types.Params
	m.keeper.GetParamsOfType(ctx, &oldParams)

	newParams := getV3Params(oldParams)
	m.keeper.SetParams(ctx, newParams)

	m.keeper.CreateModuleAccount(ctx, v3types.PlatformAccountName)

	return nil
}

func getV3Params(from v2types.Params) v3types.Params {
	return v3types.Params{
		NextInflationTime: GENESIS_TIME.AddDate(1, 0, 0),
		PoolProportions: v3types.PoolProportions{
			Ecosystem: &v3types.DistributionProportion{Proportion: sdk.MustNewDecFromStr("15.0")},
			Team:      &v3types.DistributionProportion{Proportion: sdk.MustNewDecFromStr("28.0")},
			Platform:  &v3types.DistributionProportion{Proportion: sdk.MustNewDecFromStr("15.0")},
		},
		TeamProportions: []v3types.DistributionProportion{
			{Proportion: sdk.MustNewDecFromStr("35.0"), Address: "gitopia1z5yl2nk5lp0czd965qg9xs9z45ymr305f4vhpg"},
			{Proportion: sdk.MustNewDecFromStr("35.0"), Address: "gitopia14t0ta8vvv2nrcx86g87z888s7pqat4svuyw7ae"},
			{Proportion: sdk.MustNewDecFromStr("12.5"), Address: "gitopia1gyldx4ysv8u97v7rnjuw06sq35d8khmvn28d9n"},
			// 10 + 6.5 + 1.0
			{Proportion: sdk.MustNewDecFromStr("17.5"), Address: teamMultiSigAddress},
		},
		GitServer:       from.GitServer,
		StorageProvider: from.StorageProvider,
	}
}
