package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/x/rewards/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
)

// SetRewards set a specific rewards in the store from its index
func (k Keeper) SetRewards(ctx sdk.Context, rewards types.Rewards) {
	store :=  prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RewardsKeyPrefix))
	b := k.cdc.MustMarshal(&rewards)
	store.Set(types.RewardsKey(
        rewards.Recipient,
    ), b)
}

// GetRewards returns a rewards from its index
func (k Keeper) GetRewards(
    ctx sdk.Context,
    recipient string,
    
) (val types.Rewards, found bool) {
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

// GetRewards returns a rewards from its index and creator
func (k Keeper) GetRewardForCreator(
    ctx sdk.Context,
    recipient string,
    creator string,
) (val types.Reward, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RewardsKeyPrefix))

	b := store.Get(types.RewardsKey(
        recipient,
    ))
    if b == nil {
        return val, false
    }

	rewards := types.Rewards{}
	k.cdc.MustUnmarshal(b, &rewards)

	return *rewards.RewardsByCreator[creator], true
}

// RemoveRewards removes a rewards from the store
func (k Keeper) RemoveRewards(
    ctx sdk.Context,
    recipient string,
    
) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RewardsKeyPrefix))
	store.Delete(types.RewardsKey(
	    recipient,
    ))
}

// GetAllRewards returns all rewards
func (k Keeper) GetAllRewards(ctx sdk.Context) (list []types.Rewards) {
    store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RewardsKeyPrefix))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Rewards
		k.cdc.MustUnmarshal(iterator.Value(), &val)
        list = append(list, val)
	}

    return
}
