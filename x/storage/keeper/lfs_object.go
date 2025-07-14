package keeper

import (
	"encoding/binary"
	"fmt"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v6/x/storage/types"
)

// GetLFSObjectCount get the total number of LFS objects
func (k Keeper) GetLFSObjectCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.LFSObjectCountKey))
	byteKey := types.KeyPrefix(types.LFSObjectCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	return binary.BigEndian.Uint64(bz)
}

// SetLFSObjectCount set the total number of LFS objects
func (k Keeper) SetLFSObjectCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.LFSObjectCountKey))
	byteKey := types.KeyPrefix(types.LFSObjectCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	store.Set(byteKey, bz)
}

// AppendLFSObject appends an LFS object in the store with a new id and update the count
func (k Keeper) AppendLFSObject(
	ctx sdk.Context,
	lfsObj types.LFSObject,
) uint64 {
	// Create the LFS object
	count := k.GetLFSObjectCount(ctx)

	// Set the ID of the appended value
	lfsObj.Id = count

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.LFSObjectKey))
	appendedValue := k.cdc.MustMarshal(&lfsObj)

	lfsObjectKey := fmt.Sprintf("%d-%s", lfsObj.RepositoryId, lfsObj.Oid)
	store.Set([]byte(lfsObjectKey), appendedValue)

	// Set the mapping between LFS object id and repository id
	k.SetLFSObjectRepositoryMapping(ctx, lfsObj.Id, lfsObj.RepositoryId, lfsObj.Oid)

	// Update LFS object count
	k.SetLFSObjectCount(ctx, count+1)

	return count
}

// SetLFSObject stores an LFS object
func (k Keeper) SetLFSObject(ctx sdk.Context, lfsObj types.LFSObject) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.LFSObjectKey))
	lfsObjectKey := fmt.Sprintf("%d-%s", lfsObj.RepositoryId, lfsObj.Oid)
	bz := k.cdc.MustMarshal(&lfsObj)
	store.Set([]byte(lfsObjectKey), bz)
}

// GetLFSObject retrieves an LFS object by repository_id and oid
func (k Keeper) GetLFSObject(ctx sdk.Context, repositoryId uint64, oid string) (lfsObj types.LFSObject, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.LFSObjectKey))
	lfsObjectKey := fmt.Sprintf("%d-%s", repositoryId, oid)
	bz := store.Get([]byte(lfsObjectKey))
	if bz == nil {
		return lfsObj, false
	}
	k.cdc.MustUnmarshal(bz, &lfsObj)
	return lfsObj, true
}

// RemoveLFSObject removes an LFS object by repository_id and oid
func (k Keeper) RemoveLFSObject(ctx sdk.Context, repositoryId uint64, oid string) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.LFSObjectKey))
	lfsObjectKey := fmt.Sprintf("%d-%s", repositoryId, oid)

	lfsObject, found := k.GetLFSObject(ctx, repositoryId, oid)
	if !found {
		return
	}

	store.Delete([]byte(lfsObjectKey))

	k.RemoveLFSObjectRepositoryMapping(ctx, lfsObject.Id)
}

// GetLFSObjects returns all LFS objects
func (k Keeper) GetLFSObjects(ctx sdk.Context) (objs []types.LFSObject) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.LFSObjectKey))
	iterator := sdk.KVStorePrefixIterator(store, nil)
	defer iterator.Close()
	for ; iterator.Valid(); iterator.Next() {
		var obj types.LFSObject
		k.cdc.MustUnmarshal(iterator.Value(), &obj)
		objs = append(objs, obj)
	}
	return objs
}

// GetLFSObjectById returns an LFS object by id
func (k Keeper) GetLFSObjectById(ctx sdk.Context, id uint64) (lfsObj types.LFSObject, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.LFSObjectKey))

	lfsObjectRepositoryMapping, found := k.GetLFSObjectRepositoryMapping(ctx, id)
	if !found {
		return lfsObj, false
	}

	lfsObjectKey := fmt.Sprintf("%d-%s", lfsObjectRepositoryMapping.RepositoryId, lfsObjectRepositoryMapping.Oid)
	bz := store.Get([]byte(lfsObjectKey))
	if bz == nil {
		return lfsObj, false
	}
	k.cdc.MustUnmarshal(bz, &lfsObj)
	return lfsObj, true
}

// GetLFSObjectsByRepositoryId returns all LFS objects for a repository
func (k Keeper) GetLFSObjectsByRepositoryId(ctx sdk.Context, repositoryId uint64) (objs []types.LFSObject) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.LFSObjectKey))
	prefixKey := fmt.Sprintf("%d-", repositoryId)
	iterator := sdk.KVStorePrefixIterator(store, []byte(prefixKey))
	defer iterator.Close()
	for ; iterator.Valid(); iterator.Next() {
		var obj types.LFSObject
		k.cdc.MustUnmarshal(iterator.Value(), &obj)
		objs = append(objs, obj)
	}
	return objs
}

// GetLFSObjectIdBytes returns the byte representation of the ID
func GetLFSObjectIdBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

// SetLFSObjectRepositoryMapping set the mapping between LFS object id and repository id
func (k Keeper) SetLFSObjectRepositoryMapping(ctx sdk.Context, lfsObjectId uint64, repositoryId uint64, oid string) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.LFSObjectRepositoryMappingKey))
	lfsObjectRepositoryMapping := types.LFSObjectRepositoryMapping{
		LfsObjectId:  lfsObjectId,
		RepositoryId: repositoryId,
		Oid:          oid,
	}
	store.Set(GetLFSObjectIdBytes(lfsObjectId), k.cdc.MustMarshal(&lfsObjectRepositoryMapping))
}

// GetLFSObjectRepositoryMapping returns the mapping between LFS object id and repository id
func (k Keeper) GetLFSObjectRepositoryMapping(ctx sdk.Context, lfsObjectId uint64) (val types.LFSObjectRepositoryMapping, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.LFSObjectRepositoryMappingKey))
	b := store.Get(GetLFSObjectIdBytes(lfsObjectId))
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveLFSObjectRepositoryMapping removes the mapping between LFS object id and repository id
func (k Keeper) RemoveLFSObjectRepositoryMapping(ctx sdk.Context, lfsObjectId uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.LFSObjectRepositoryMappingKey))
	store.Delete(GetLFSObjectIdBytes(lfsObjectId))
}
