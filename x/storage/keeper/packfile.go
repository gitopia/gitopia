package keeper

import (
	"encoding/binary"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v5/x/storage/types"
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
	key := []byte(types.PackfileKey + packfile.Cid)
	store.Set(key, appendedValue)

	// Update packfile count
	k.SetPackfileCount(ctx, count+1)

	return count
}

// SetPackfile sets a packfile in the store
func (k Keeper) SetPackfile(ctx sdk.Context, packfile types.Packfile) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PackfileKey))
	b := k.cdc.MustMarshal(&packfile)
	key := []byte(types.PackfileKey + packfile.Cid)
	store.Set(key, b)
}

// GetPackfile returns a packfile from its cid
func (k Keeper) GetPackfile(ctx sdk.Context, cid string) (val types.Packfile, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PackfileKey))
	key := []byte(types.PackfileKey + cid)
	b := store.Get(key)
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemovePackfile removes a packfile from the store
func (k Keeper) RemovePackfile(ctx sdk.Context, cid string) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PackfileKey))
	key := []byte(types.PackfileKey + cid)
	store.Delete(key)
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
