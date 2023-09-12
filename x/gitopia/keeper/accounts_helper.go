package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
)

func (k Keeper) CreateModuleAccount(ctx sdk.Context, name string, permissions ...string) {
	moduleAcc := authtypes.NewEmptyModuleAccount(name, permissions...)
	k.accountKeeper.SetModuleAccount(ctx, moduleAcc)
}
