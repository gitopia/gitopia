package v21

import (
	"time"

	"github.com/cosmos/cosmos-sdk/baseapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"

	"github.com/gitopia/gitopia/v5/app/keepers"

	// SDK v47 modules

	paramstypes "github.com/cosmos/cosmos-sdk/x/params/types"
	upgradetypes "github.com/cosmos/cosmos-sdk/x/upgrade/types"
)

var (
	GENESIS_TIME = time.Date(2023, 5, 17, 17, 5, 17, 517517517, time.UTC)
)

func CreateUpgradeHandler(
	mm *module.Manager,
	configurator module.Configurator,
	keepers *keepers.AppKeepers,
) upgradetypes.UpgradeHandler {
	return func(ctx sdk.Context, plan upgradetypes.Plan, fromVM module.VersionMap) (module.VersionMap, error) {
		ctx.Logger().Info("Starting upgrade v4...")

		ctx.Logger().Info("Migrating tendermint consensus params from x/params to x/consensus...")
		baseAppLegacySS := keepers.ParamsKeeper.Subspace(baseapp.Paramspace).WithKeyTable(paramstypes.ConsensusParamsKeyTable())
		baseapp.MigrateParams(ctx, baseAppLegacySS, &keepers.ConsensusParamsKeeper)

		migrations, err := mm.RunMigrations(ctx, configurator, fromVM)
		if err != nil {
			return nil, err
		}

		govParams := keepers.GovKeeper.GetParams(ctx)
		govParams.MinInitialDepositRatio = sdk.NewDecWithPrec(1, 1).String() // 0.1 (10%)
		err = keepers.GovKeeper.SetParams(ctx, govParams)
		if err != nil {
			return nil, err
		}

		// fix genesis time in gitopia params for vested team accounts
		gitopiaParams := keepers.GitopiaKeeper.GetParams(ctx)
		gitopiaParams.GenesisTime = GENESIS_TIME
		err = keepers.GitopiaKeeper.SetParams(ctx, gitopiaParams)
		if err != nil {
			return nil, err
		}

		ctx.Logger().Info("v4 Upgrade Complete")
		return migrations, nil
	}
}
