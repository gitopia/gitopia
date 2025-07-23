package keeper

import (
	"encoding/binary"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v6/x/storage/types"
)

// GetPackfileCount get the total number of packfile
func (k Keeper) GetPackfileCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PackfileCountKey))
	byteKey := types.KeyPrefix(types.PackfileCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	return binary.BigEndian.Uint64(bz)
}

// SetPackfileCount set the total number of packfile
func (k Keeper) SetPackfileCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PackfileCountKey))
	byteKey := types.KeyPrefix(types.PackfileCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	store.Set(byteKey, bz)
}

// AppendPackfile appends a packfile in the store with a new id and update the count
func (k Keeper) AppendPackfile(
	ctx sdk.Context,
	packfile types.Packfile,
) uint64 {
	// Create the packfile
	count := k.GetPackfileCount(ctx)

	// Set the ID of the appended value
	packfile.Id = count

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PackfileKey))
	appendedValue := k.cdc.MustMarshal(&packfile)
	store.Set(GetPackfileIdBytes(packfile.RepositoryId), appendedValue)

	// Set the mapping between packfile id and repository id
	k.SetPackfileRepositoryMapping(ctx, packfile.Id, packfile.RepositoryId)

	// Update packfile count
	k.SetPackfileCount(ctx, count+1)

	return count
}

// SetPackfile sets a packfile in the store
func (k Keeper) SetPackfile(ctx sdk.Context, packfile types.Packfile) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PackfileKey))
	b := k.cdc.MustMarshal(&packfile)
	store.Set(GetPackfileIdBytes(packfile.RepositoryId), b)
}

// GetPackfile returns a packfile from its repository id
func (k Keeper) GetPackfile(ctx sdk.Context, repositoryId uint64) (val types.Packfile, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PackfileKey))
	b := store.Get(GetPackfileIdBytes(repositoryId))
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// GetPackfileById returns a packfile from its packfile id
func (k Keeper) GetPackfileById(ctx sdk.Context, packfileId uint64) (val types.Packfile, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PackfileKey))

	packfileRepositoryMapping, found := k.GetPackfileRepositoryMapping(ctx, packfileId)
	if !found {
		return val, false
	}

	b := store.Get(GetPackfileIdBytes(packfileRepositoryMapping.RepositoryId))
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemovePackfile removes a packfile from the store
func (k Keeper) RemovePackfile(ctx sdk.Context, repositoryId uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PackfileKey))
	store.Delete(GetPackfileIdBytes(repositoryId))
}

// GetAllPackfile returns all packfiles
func (k Keeper) GetAllPackfile(ctx sdk.Context) (list []types.Packfile) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PackfileKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Packfile
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetPackfileIdBytes returns the byte representation of the ID
func GetPackfileIdBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

// SetPackfileRepositoryMapping set the mapping between packfile id and repository id
func (k Keeper) SetPackfileRepositoryMapping(ctx sdk.Context, packfileId uint64, repositoryId uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PackfileRepositoryMappingKey))

	packfileRepositoryMapping := types.PackfileRepositoryMapping{
		PackfileId:   packfileId,
		RepositoryId: repositoryId,
	}

	store.Set(GetPackfileIdBytes(packfileId), k.cdc.MustMarshal(&packfileRepositoryMapping))
}

// GetPackfileRepositoryMapping returns the mapping between packfile id and repository id
func (k Keeper) GetPackfileRepositoryMapping(ctx sdk.Context, packfileId uint64) (val types.PackfileRepositoryMapping, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PackfileRepositoryMappingKey))
	b := store.Get(GetPackfileIdBytes(packfileId))
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// GetStorageStats returns the total storage size
func (k Keeper) GetStorageStats(ctx sdk.Context) types.StorageStats {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StorageStatsKey))
	b := store.Get(types.KeyPrefix(types.StorageStatsKey))
	if b == nil {
		return types.StorageStats{}
	}
	var storageStats types.StorageStats
	k.cdc.MustUnmarshal(b, &storageStats)
	return storageStats
}

// SetStorageStats set the total storage size
func (k Keeper) SetStorageStats(ctx sdk.Context, storageStats types.StorageStats) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StorageStatsKey))
	bz := k.cdc.MustMarshal(&storageStats)
	store.Set(types.KeyPrefix(types.StorageStatsKey), bz)
}
