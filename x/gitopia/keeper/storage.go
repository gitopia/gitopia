package keeper

import (
	"encoding/binary"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v4/x/gitopia/types"
)

// GetStorageCount get the total number of storage
func (k Keeper) GetStorageCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.StorageCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	return binary.BigEndian.Uint64(bz)
}

// SetStorageCount set the total number of storage
func (k Keeper) SetStorageCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.StorageCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	store.Set(byteKey, bz)
}

// AppendStorage appends a storage in the store with a new id and update the count
func (k Keeper) AppendStorage(
	ctx sdk.Context,
	storage types.Storage,
) uint64 {
	// Create the storage
	count := k.GetStorageCount(ctx)
	// Set the ID of the appended value
	storage.Id = count

	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.GetStorageKeyForGitRepository(storage.ParentId)),
	)
	appendedValue := k.cdc.MustMarshal(&storage)
	store.Set(GetStorageIDBytes(storage.Id), appendedValue)

	// Update storage count
	k.SetStorageCount(ctx, count+1)

	return count
}

// SetStorage set a specific storage in the store for repository-id
func (k Keeper) SetRepositoryStorage(ctx sdk.Context, storage types.Storage) {
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.GetStorageKeyForGitRepository(storage.ParentId)),
	)
	b := k.cdc.MustMarshal(&storage)
	store.Set(GetStorageIDBytes(storage.Id), b)
}

// GetRepositoryStorage returns a Storage from its repository id
func (k Keeper) GetRepositoryStorage(ctx sdk.Context, repositoryId uint64) (val types.Storage, found bool) {
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.StorageKey),
	)
	b := store.Get([]byte(types.GetStorageKeyForGitRepository(repositoryId)))
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveStorage removes a storage from the store
func (k Keeper) RemoveRepositoryStorage(ctx sdk.Context, repositoryId uint64) {
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.StorageKey),
	)
	store.Delete([]byte(types.GetStorageKeyForGitRepository(repositoryId)))
}

// GetAllStorage returns all Storage
func (k Keeper) GetAllStorage(ctx sdk.Context) (list []types.Storage) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StorageKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Storage
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetStorageIDBytes returns the byte representation of the ID
func GetStorageIDBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

// GetStorageIDFromBytes returns ID in uint64 format from a byte array
func GetStorageIDFromBytes(bz []byte) uint64 {
	return binary.BigEndian.Uint64(bz)
}
