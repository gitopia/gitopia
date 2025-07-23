package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v6/x/storage/types"
)

// get rewards for a provider
func (k Keeper) GetProviderRewards(ctx sdk.Context, provider sdk.AccAddress) (rewards types.ProviderRewards) {
	store := ctx.KVStore(k.storeKey)
	b := store.Get(types.GetProviderRewardsKey(provider))
	if b == nil {
		return types.ProviderRewards{Provider: provider.String(), Rewards: sdk.NewDecCoins()}
	}
	k.cdc.MustUnmarshal(b, &rewards)
	return
}

// set rewards for a provider
func (k Keeper) SetProviderRewards(ctx sdk.Context, provider sdk.AccAddress, rewards types.ProviderRewards) {
	var bz []byte

	store := ctx.KVStore(k.storeKey)
	if rewards.Rewards.IsZero() {
		bz = k.cdc.MustMarshal(&types.ProviderRewards{Provider: provider.String(), Rewards: sdk.NewDecCoins()})
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

// GetProviderStake gets the stake for a provider
func (k Keeper) GetProviderStake(ctx sdk.Context, provider sdk.AccAddress) (stake types.ProviderStake) {
	store := ctx.KVStore(k.storeKey)
	b := store.Get(types.GetProviderStakeKey(provider))
	if b == nil {
		return types.ProviderStake{Provider: provider.String(), Stake: sdk.NewCoins()}
	}
	k.cdc.MustUnmarshal(b, &stake)
	return
}

// SetProviderStake sets the stake for a provider
func (k Keeper) SetProviderStake(ctx sdk.Context, provider sdk.AccAddress, stake types.ProviderStake) {
	var bz []byte

	store := ctx.KVStore(k.storeKey)
	if stake.Stake.IsZero() {
		bz = k.cdc.MustMarshal(&types.ProviderStake{Provider: provider.String(), Stake: sdk.NewCoins()})
	} else {
		bz = k.cdc.MustMarshal(&stake)
	}

	store.Set(types.GetProviderStakeKey(provider), bz)
}

// DeleteProviderStake deletes the stake for a provider
func (k Keeper) DeleteProviderStake(ctx sdk.Context, provider sdk.AccAddress) {
	store := ctx.KVStore(k.storeKey)
	store.Delete(types.GetProviderStakeKey(provider))
}

// IterateProviderStakes iterates over all provider stakes
func (k Keeper) IterateProviderStakes(ctx sdk.Context, handler func(provider sdk.AccAddress, stake types.ProviderStake) (stop bool)) {
	store := ctx.KVStore(k.storeKey)
	iter := sdk.KVStorePrefixIterator(store, types.ProviderStakePrefix)
	defer iter.Close()
	for ; iter.Valid(); iter.Next() {
		var stake types.ProviderStake
		k.cdc.MustUnmarshal(iter.Value(), &stake)
		provider := types.GetProviderStakeAddress(iter.Key())
		if handler(provider, stake) {
			break
		}
	}
}
