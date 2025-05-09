package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v5/x/gitopia/types"
)

// SetUserQuota set a specific user quota in the store
func (k Keeper) SetUserQuota(ctx sdk.Context, userQuota types.UserQuota) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.UserQuotaKey))
	b := k.cdc.MustMarshal(&userQuota)
	store.Set([]byte(userQuota.Address), b)
}

// GetUserQuota returns the user quota information
func (k Keeper) GetUserQuota(ctx sdk.Context, address string) (val types.UserQuota, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.UserQuotaKey))
	b := store.Get([]byte(address))
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}
