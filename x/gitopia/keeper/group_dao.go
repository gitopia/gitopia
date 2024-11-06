package keeper

import (
	"encoding/binary"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v4/x/gitopia/types"
)

// GetGroupDaoCount get the total number of GroupDao
func (k Keeper) GetGroupDaoCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.GroupDaoCountKey))
	byteKey := types.KeyPrefix(types.GroupDaoCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	return binary.BigEndian.Uint64(bz)
}

// SetGroupDaoCount set the total number of GroupDao
func (k Keeper) SetGroupDaoCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.GroupDaoCountKey))
	byteKey := types.KeyPrefix(types.GroupDaoCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	store.Set(byteKey, bz)
}

// AppendGroupDao appends a GroupDao in the store with a new id and update the count
func (k Keeper) AppendGroupDao(
	ctx sdk.Context,
	groupId uint64,
	groupDao types.GroupDao,
) uint64 {
	// Create the GroupDao
	count := k.GetGroupDaoCount(ctx)

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.GroupDaoKey))
	appendedValue := k.cdc.MustMarshal(&groupDao)
	store.Set(GetGroupDaoIDBytes(groupId), appendedValue)

	// Update GroupDao count
	k.SetGroupDaoCount(ctx, count+1)

	return count
}

// GetGroupDao returns the GroupDao information
func (k Keeper) GetGroupDao(ctx sdk.Context, groupId uint64) (val types.GroupDao, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.GroupDaoKey))
	b := store.Get(GetGroupDaoIDBytes(groupId))
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveGroupDao removes a GroupDao from the store
func (k Keeper) RemoveGroupDao(ctx sdk.Context, groupId uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.GroupDaoKey))
	store.Delete(GetGroupDaoIDBytes(groupId))
}

// GetAllGroupDao returns all GroupDao
func (k Keeper) GetAllGroupDao(ctx sdk.Context) (list []types.GroupDao) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.GroupDaoKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.GroupDao
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetGroupDaoIDBytes returns the byte representation of the ID
func GetGroupDaoIDBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

// GetGroupDaoIDFromBytes returns ID in uint64 format from a byte array
func GetGroupDaoIDFromBytes(bz []byte) uint64 {
	return binary.BigEndian.Uint64(bz)
}
