package keeper

import (
	"encoding/binary"
	"fmt"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v6/x/storage/types"
)

// GetReleaseAssetCount get the total number of release assets
func (k Keeper) GetReleaseAssetCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ReleaseAssetCountKey))
	byteKey := types.KeyPrefix(types.ReleaseAssetCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	return binary.BigEndian.Uint64(bz)
}

// SetReleaseAssetCount set the total number of release assets
func (k Keeper) SetReleaseAssetCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ReleaseAssetCountKey))
	byteKey := types.KeyPrefix(types.ReleaseAssetCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	store.Set(byteKey, bz)
}

// AppendReleaseAsset appends a release asset in the store with a new id and update the count
func (k Keeper) AppendReleaseAsset(
	ctx sdk.Context,
	releaseAsset types.ReleaseAsset,
) uint64 {
	// Create the release asset
	count := k.GetReleaseAssetCount(ctx)

	// Set the ID of the appended value
	releaseAsset.Id = count

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ReleaseAssetKey))
	appendedValue := k.cdc.MustMarshal(&releaseAsset)

	releaseAssetKey := fmt.Sprintf("%s-%s-%s", releaseAsset.RepositoryId, releaseAsset.Tag, releaseAsset.Name)
	store.Set([]byte(releaseAssetKey), appendedValue)

	// Set the mapping between release asset id and repository id
	k.SetReleaseAssetRepositoryMapping(ctx, releaseAsset.Id, releaseAsset.RepositoryId, releaseAsset.Tag, releaseAsset.Name)

	// Update release asset count
	k.SetReleaseAssetCount(ctx, count+1)

	return count
}

// SetReleaseAsset sets a release asset in the store
func (k Keeper) SetReleaseAsset(ctx sdk.Context, releaseAsset types.ReleaseAsset) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ReleaseAssetKey))
	releaseAssetKey := fmt.Sprintf("%s-%s-%s", releaseAsset.RepositoryId, releaseAsset.Tag, releaseAsset.Name)
	b := k.cdc.MustMarshal(&releaseAsset)
	store.Set([]byte(releaseAssetKey), b)
}

// GetReleaseAsset returns a release asset from its repository id, tag and name
func (k Keeper) GetReleaseAsset(ctx sdk.Context, repositoryId uint64, tag string, name string) (val types.ReleaseAsset, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ReleaseAssetKey))
	releaseAssetKey := fmt.Sprintf("%s-%s-%s", repositoryId, tag, name)
	b := store.Get([]byte(releaseAssetKey))
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// GetReleaseAssetById returns a release asset from its release asset id
func (k Keeper) GetReleaseAssetById(ctx sdk.Context, releaseAssetId uint64) (val types.ReleaseAsset, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ReleaseAssetKey))

	releaseAssetRepositoryMapping, found := k.GetReleaseAssetRepositoryMapping(ctx, releaseAssetId)
	if !found {
		return val, false
	}

	releaseAssetKey := fmt.Sprintf("%s-%s-%s", releaseAssetRepositoryMapping.RepositoryId, releaseAssetRepositoryMapping.Tag, releaseAssetRepositoryMapping.Name)
	b := store.Get([]byte(releaseAssetKey))
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveReleaseAsset removes a release asset from the store
func (k Keeper) RemoveReleaseAsset(ctx sdk.Context, repositoryId uint64, tag string, name string) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ReleaseAssetKey))
	releaseAssetKey := fmt.Sprintf("%s-%s-%s", repositoryId, tag, name)
	store.Delete([]byte(releaseAssetKey))
}

// GetAllReleaseAsset returns all release assets
func (k Keeper) GetAllReleaseAsset(ctx sdk.Context) (list []types.ReleaseAsset) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ReleaseAssetKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.ReleaseAsset
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetReleaseAssetIdBytes returns the byte representation of the ID
func GetReleaseAssetIdBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

// SetReleaseAssetRepositoryMapping set the mapping between release asset id and repository id
func (k Keeper) SetReleaseAssetRepositoryMapping(ctx sdk.Context, releaseAssetId uint64, repositoryId uint64, tag string, name string) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ReleaseAssetRepositoryMappingKey))

	releaseAssetRepositoryMapping := types.ReleaseAssetRepositoryMapping{
		ReleaseAssetId: releaseAssetId,
		RepositoryId:   repositoryId,
		Tag:            tag,
		Name:           name,
	}

	store.Set(GetReleaseAssetIdBytes(releaseAssetId), k.cdc.MustMarshal(&releaseAssetRepositoryMapping))
}

// GetReleaseAssetRepositoryMapping returns the mapping between release asset id and repository id
func (k Keeper) GetReleaseAssetRepositoryMapping(ctx sdk.Context, releaseAssetId uint64) (val types.ReleaseAssetRepositoryMapping, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ReleaseAssetRepositoryMappingKey))
	b := store.Get(GetReleaseAssetIdBytes(releaseAssetId))
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}
