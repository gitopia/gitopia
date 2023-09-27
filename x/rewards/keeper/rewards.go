package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v3/x/rewards/types"
)

// SetReward set a specific rewards in the store from its index
func (k Keeper) SetReward(ctx sdk.Context, reward types.Reward) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RewardsKeyPrefix))
	b := k.cdc.MustMarshal(&reward)
	store.Set(types.RewardsKey(
		reward.Recipient,
	), b)
}

// GetReward returns a rewards from its index
func (k Keeper) GetReward(
	ctx sdk.Context,
	recipient string,

) (val types.Reward, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RewardsKeyPrefix))

	b := store.Get(types.RewardsKey(
		recipient,
	))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveReward removes a rewards from the store
func (k Keeper) RemoveReward(
	ctx sdk.Context,
	recipient string,

) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RewardsKeyPrefix))
	store.Delete(types.RewardsKey(
		recipient,
	))
}

// GetAllRewards returns all rewards
func (k Keeper) GetAllRewards(ctx sdk.Context) (list []types.Reward) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RewardsKeyPrefix))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Reward
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// iterate through the rewards and perform the provided function
func (k Keeper) IterateRewards(ctx sdk.Context, fn func(validator types.Reward)) {
	store := ctx.KVStore(k.storeKey)

	iterator := sdk.KVStorePrefixIterator(store, types.KeyPrefix(types.RewardsKeyPrefix))
	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Reward
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		fn(val)
	}
}
