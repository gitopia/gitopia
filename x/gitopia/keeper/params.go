package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v2/x/gitopia/types"
)

// GetParams get all parameters as types.Params
func (k Keeper) GetParams(ctx sdk.Context) (p types.Params) {
	store := ctx.KVStore(k.storeKey)
	bz := store.Get(types.ParamsKey)
	if bz == nil {
		return p
	}

	k.cdc.MustUnmarshal(bz, &p)
	return p
}

// SetParams set the params
func (k Keeper) SetParams(ctx sdk.Context, p types.Params) {
	store := ctx.KVStore(k.storeKey)
	bz := k.cdc.MustMarshal(&p)
	store.Set(types.ParamsKey, bz)
}
