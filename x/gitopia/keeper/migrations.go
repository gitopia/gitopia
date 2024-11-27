package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	v5 "github.com/gitopia/gitopia/v5/x/gitopia/migrations/v5"
)

// Migrator is a struct for handling in-place store migrations.
type Migrator struct {
	keeper Keeper
}

// NewMigrator returns a new Migrator.
func NewMigrator(keeper Keeper) Migrator {
	return Migrator{keeper: keeper}
}

// Migrate4to5 migrates from version 4 to 5.
func (m Migrator) Migrate4to5(ctx sdk.Context) error {
	return v5.Migrate(ctx, m.keeper.storeKey, m.keeper.cdc, m.keeper.groupKeeper)
}
