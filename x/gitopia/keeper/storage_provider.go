package keeper

import (
	"encoding/binary"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

// GetStorageProviderCount get the total number of storageProvider
func (k Keeper) GetStorageProviderCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.StorageProviderCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	return binary.BigEndian.Uint64(bz)
}

// SetStorageProviderCount set the total number of storageProvider
func (k Keeper) SetStorageProviderCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.StorageProviderCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	store.Set(byteKey, bz)
}

// AppendStorageProvider appends a storageProvider in the store with a new id and update the count
func (k Keeper) AppendStorageProvider(
	ctx sdk.Context,
	storageProvider types.StorageProvider,
) uint64 {
	// Create the storageProvider
	count := k.GetStorageProviderCount(ctx)

	// Set the ID of the appended value
	storageProvider.Id = count

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StorageProviderKey))
	appendedValue := k.cdc.MustMarshal(&storageProvider)
	store.Set(GetStorageProviderIDBytes(storageProvider.Id), appendedValue)

	// Update storageProvider count
	k.SetStorageProviderCount(ctx, count+1)

	return count
}

// SetStorageProvider set a specific storageProvider in the store
func (k Keeper) SetStorageProvider(ctx sdk.Context, storageProvider types.StorageProvider) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StorageProviderKey))
	b := k.cdc.MustMarshal(&storageProvider)
	store.Set(GetStorageProviderIDBytes(storageProvider.Id), b)
}

// GetStorageProvider returns a storageProvider from its id
func (k Keeper) GetStorageProvider(ctx sdk.Context, id uint64) (val types.StorageProvider, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StorageProviderKey))
	b := store.Get(GetStorageProviderIDBytes(id))
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

type storageProviderPKey struct {
	creator string
	store   types.StorageProvider_Store
}

// GetStorageProvider returns a storageProvider from its key
func (k Keeper) GetStorageProviderByKey(ctx sdk.Context, key storageProviderPKey) (types.StorageProvider, bool) {
	s := k.GetAllStorageProvider(ctx)
	for _, v := range s {
		if key.creator == v.Creator && key.store == v.Store {
			return v, true
		}
	}
	return types.StorageProvider{}, false
}

// RemoveStorageProvider removes a storageProvider from the store
func (k Keeper) RemoveStorageProvider(ctx sdk.Context, id uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StorageProviderKey))
	store.Delete(GetStorageProviderIDBytes(id))
}

// GetAllStorageProvider returns all storageProvider
func (k Keeper) GetAllStorageProvider(ctx sdk.Context) (list []types.StorageProvider) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StorageProviderKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.StorageProvider
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

func (k Keeper) FindBackupProvider(ctx sdk.Context, repo types.Repository, providerId uint64) (*types.RepositoryBackup, bool) {
	for _, backup := range repo.Backups {
		if backup.ProviderId == providerId {
			return backup, true
		}
	}
	return nil, false
}

// GetStorageProviderIDBytes returns the byte representation of the ID
func GetStorageProviderIDBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

// GetStorageProviderIDFromBytes returns ID in uint64 format from a byte array
func GetStorageProviderIDFromBytes(bz []byte) uint64 {
	return binary.BigEndian.Uint64(bz)
}
