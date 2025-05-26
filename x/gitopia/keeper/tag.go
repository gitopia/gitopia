package keeper

import (
	"encoding/binary"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v6/x/gitopia/types"
)

// GetTagCount get the total number of tag
func (k Keeper) GetTagCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.TagCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	return binary.BigEndian.Uint64(bz)
}

// SetTagCount set the total number of tag
func (k Keeper) SetTagCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.TagCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	store.Set(byteKey, bz)
}

// AppendTag appends a tag in the store with a new id and update the count
func (k Keeper) AppendTag(
	ctx sdk.Context,
	tag types.Tag,
) uint64 {
	// Create the tag
	count := k.GetTagCount(ctx)

	// Set the ID of the appended value
	tag.Id = count

	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.GetTagKeyForRepositoryId(tag.RepositoryId)),
	)
	appendedValue := k.cdc.MustMarshal(&tag)
	store.Set([]byte(tag.Name), appendedValue)

	// Update tag count
	k.SetTagCount(ctx, count+1)

	return count
}

// SetTag set a specific tag in the store
func (k Keeper) SetRepositoryTag(ctx sdk.Context, tag types.Tag) {
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.GetTagKeyForRepositoryId(tag.RepositoryId)),
	)
	b := k.cdc.MustMarshal(&tag)
	store.Set([]byte(tag.Name), b)
}

// GetRepositoryTag returns a tag from its name
func (k Keeper) GetRepositoryTag(ctx sdk.Context, repositoryId uint64, tag string) (val types.Tag, found bool) {
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.GetTagKeyForRepositoryId(repositoryId)),
	)
	b := store.Get([]byte(tag))
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveRepositoryTag removes a tag from the store
func (k Keeper) RemoveRepositoryTag(ctx sdk.Context, repositoryId uint64, tag string) {
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.GetTagKeyForRepositoryId(repositoryId)),
	)
	store.Delete([]byte(tag))
}

// GetAllTag returns all tag
func (k Keeper) GetAllTag(ctx sdk.Context) (list []types.Tag) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.TagKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Tag
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetAllRepositoryTag returns all repository tag
func (k Keeper) GetAllRepositoryTag(ctx sdk.Context, repositoryId uint64) (list []types.Tag) {
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.GetTagKeyForRepositoryId(repositoryId)),
	)
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Tag
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetTagIDBytes returns the byte representation of the ID
func GetTagIDBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

// GetTagIDFromBytes returns ID in uint64 format from a byte array
func GetTagIDFromBytes(bz []byte) uint64 {
	return binary.BigEndian.Uint64(bz)
}
