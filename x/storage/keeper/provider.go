package keeper

import (
	"encoding/binary"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v5/x/storage/types"
)

// GetProviderCount get the total number of provider
func (k Keeper) GetProviderCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProviderCountKey))
	byteKey := types.KeyPrefix(types.ProviderCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	return binary.BigEndian.Uint64(bz)
}

// SetProviderCount set the total number of provider
func (k Keeper) SetProviderCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProviderCountKey))
	byteKey := types.KeyPrefix(types.ProviderCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	store.Set(byteKey, bz)
}

// AppendProvider appends a provider in the store with a new id and update the count
func (k Keeper) AppendProvider(ctx sdk.Context, provider types.Provider) uint64 {
	count := k.GetProviderCount(ctx)
	provider.Id = count
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProviderKey))
	appendedValue := k.cdc.MustMarshal(&provider)
	store.Set([]byte(provider.Creator), appendedValue)
	k.SetProviderCount(ctx, count+1)
	return count
}

// SetProvider set a specific provider in the store
func (k Keeper) SetProvider(ctx sdk.Context, provider types.Provider) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProviderKey))
	b := k.cdc.MustMarshal(&provider)
	store.Set([]byte(provider.Creator), b)
}

// GetProvider returns a provider from its id
func (k Keeper) GetProvider(ctx sdk.Context, creator string) (val types.Provider, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProviderKey))
	b := store.Get([]byte(creator))
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveProvider removes a provider from the store
func (k Keeper) RemoveProvider(ctx sdk.Context, creator string) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProviderKey))
	store.Delete([]byte(creator))
}

// GetAllProvider returns all provider
func (k Keeper) GetAllProvider(ctx sdk.Context) (list []types.Provider) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProviderKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Provider
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetProviderIDBytes returns the byte representation of the ID
func GetProviderIDBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

// GetProviderIDFromBytes returns ID in uint64 format from a byte array
func GetProviderIDFromBytes(bz []byte) uint64 {
	return binary.BigEndian.Uint64(bz)
}
