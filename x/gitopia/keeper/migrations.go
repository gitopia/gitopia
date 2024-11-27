package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	v4 "github.com/gitopia/gitopia/v5/x/gitopia/migrations/v4"
)

// Migrator is a struct for handling in-place store migrations.
type Migrator struct {
	keeper Keeper
}

// NewMigrator returns a new Migrator.
func NewMigrator(keeper Keeper) Migrator {
	return Migrator{keeper: keeper}
}

// Migrate3to4 migrates from version 3 to 4.
func (m Migrator) Migrate3to4(ctx sdk.Context) error {
	return v4.Migrate(ctx, m.keeper.storeKey, m.keeper.cdc, m.keeper.groupKeeper)
}
