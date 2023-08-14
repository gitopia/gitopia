package keeper

import (
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	sdk "github.com/cosmos/cosmos-sdk/types"

)

func (k Keeper) CreateModuleAccount(ctx sdk.Context, name string, permissions ...string) {
	moduleAcc := authtypes.NewEmptyModuleAccount(name, permissions...)
	k.accountKeeper.SetModuleAccount(ctx, moduleAcc)
}
