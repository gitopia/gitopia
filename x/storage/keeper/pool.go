package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	"github.com/gitopia/gitopia/v6/x/storage/types"
)

// GetBondedPool returns the bonded tokens pool's module account
func (k Keeper) GetBondedPool(ctx sdk.Context) (bondedPool authtypes.ModuleAccountI) {
	return k.accountKeeper.GetModuleAccount(ctx, types.StorageBondedPoolName)
}

// GetFeePool returns the fee pool's module account
func (k Keeper) GetFeePool(ctx sdk.Context) (feePool authtypes.ModuleAccountI) {
	return k.accountKeeper.GetModuleAccount(ctx, types.StorageFeePoolName)
}

// GetChallengeSlashPool returns the challenge slash pool's module account
func (k Keeper) GetChallengeSlashPool(ctx sdk.Context) (challengeSlashPool authtypes.ModuleAccountI) {
	return k.accountKeeper.GetModuleAccount(ctx, types.ChallengeSlashPoolName)
}
