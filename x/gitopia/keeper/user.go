package keeper

import (
	"encoding/binary"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v5/x/gitopia/types"
)

// GetUserCount get the total number of user
func (k Keeper) GetUserCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.UserCountKey))
	byteKey := types.KeyPrefix(types.UserCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	return binary.BigEndian.Uint64(bz)
}

// SetUserCount set the total number of user
func (k Keeper) SetUserCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.UserCountKey))
	byteKey := types.KeyPrefix(types.UserCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	store.Set(byteKey, bz)
}

// AppendUser appends a user in the store with a new id and update the count
func (k Keeper) AppendUser(
	ctx sdk.Context,
	user types.User,
) uint64 {
	// Create the user
	count := k.GetUserCount(ctx)

	// Set the ID of the appended value
	user.Id = count

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.UserKey))
	appendedValue := k.cdc.MustMarshal(&user)
	key := []byte(types.UserKey + user.Creator)
	store.Set(key, appendedValue)

	// Update user count
	k.SetUserCount(ctx, count+1)

	/*
		if len(user.Username) > 0 {
			// Update whois
			var whois = types.Whois{
				Creator: user.Creator,
				Name:    user.Username,
				Address: user.Creator,
			}
			k.SetWhois(ctx, user.Username, whois)
		}
	*/

	return count
}

// SetUser set a specific user in the store
func (k Keeper) SetUser(ctx sdk.Context, user types.User) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.UserKey))
	b := k.cdc.MustMarshal(&user)
	key := []byte(types.UserKey + user.Creator)
	store.Set(key, b)
}

// GetUser returns a user from its id
func (k Keeper) GetUser(ctx sdk.Context, id string) (val types.User, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.UserKey))
	key := []byte(types.UserKey + id)
	b := store.Get(key)
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveUser removes a user from the store
func (k Keeper) RemoveUser(ctx sdk.Context, id string) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.UserKey))
	key := []byte(types.UserKey + id)
	store.Delete(key)
}

// GetAllUser returns all user
func (k Keeper) GetAllUser(ctx sdk.Context) (list []types.User) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.UserKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.User
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetAllUserDaoEntry returns all UserDao
func (k Keeper) GetAllUserDaoEntry(ctx sdk.Context) (list []types.UserDao) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.UserDaoKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.UserDao
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetUserIDBytes returns the byte representation of the ID
func GetUserIDBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

// GetUserIDFromBytes returns ID in uint64 format from a byte array
func GetUserIDFromBytes(bz []byte) uint64 {
	return binary.BigEndian.Uint64(bz)
}
