package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v5/x/storage/types"
)

// get rewards for a provider
func (k Keeper) GetProviderRewards(ctx sdk.Context, provider sdk.AccAddress) (rewards types.ProviderRewards) {
	store := ctx.KVStore(k.storeKey)
	b := store.Get(types.GetProviderRewardsKey(provider))
	if b == nil {
		return types.ProviderRewards{}
	}
	k.cdc.MustUnmarshal(b, &rewards)
	return
}

// set rewards for a provider
func (k Keeper) SetProviderRewards(ctx sdk.Context, provider sdk.AccAddress, rewards types.ProviderRewards) {
	var bz []byte

	store := ctx.KVStore(k.storeKey)
	if rewards.Rewards.IsZero() {
		bz = k.cdc.MustMarshal(&types.ProviderRewards{})
	} else {
		bz = k.cdc.MustMarshal(&rewards)
	}

	store.Set(types.GetProviderRewardsKey(provider), bz)
}

// delete rewards for a provider
func (k Keeper) DeleteProviderRewards(ctx sdk.Context, provider sdk.AccAddress) {
	store := ctx.KVStore(k.storeKey)
	store.Delete(types.GetProviderRewardsKey(provider))
}

// iterate over rewards
func (k Keeper) IterateProviderRewards(ctx sdk.Context, handler func(provider sdk.AccAddress, rewards types.ProviderRewards) (stop bool)) {
	store := ctx.KVStore(k.storeKey)
	iter := sdk.KVStorePrefixIterator(store, types.ProviderRewardsPrefix)
	defer iter.Close()
	for ; iter.Valid(); iter.Next() {
		var rewards types.ProviderRewards
		k.cdc.MustUnmarshal(iter.Value(), &rewards)
		provider := types.GetProviderRewardsAddress(iter.Key())
		if handler(provider, rewards) {
			break
		}
	}
}
