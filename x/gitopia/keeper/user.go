package keeper

import (
	"encoding/binary"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"strconv"
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
	count, err := strconv.ParseUint(string(bz), 10, 64)
	if err != nil {
		// Panic because the count should be always formattable to iint64
		panic("cannot decode count")
	}

	return count
}

// SetUserCount set the total number of user
func (k Keeper) SetUserCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.UserCountKey))
	byteKey := types.KeyPrefix(types.UserCountKey)
	bz := []byte(strconv.FormatUint(count, 10))
	store.Set(byteKey, bz)
}

// AppendUser appends a user in the store with a new id and update the count
func (k Keeper) AppendUser(
	ctx sdk.Context,
	creator string,
	username string,
	usernameGithub string,
	avatarUrl string,
	followers string,
	following string,
	repositories string,
	repositories_archived string,
	organizations string,
	starred_repos string,
	subscriptions string,
	email string,
	bio string,
	createdAt string,
	updatedAt string,
	extensions string,
) uint64 {
	// Create the user
	count := k.GetUserCount(ctx)
	var user = types.User{
		Creator:               creator,
		Id:                    count,
		Username:              username,
		UsernameGithub:        usernameGithub,
		AvatarUrl:             avatarUrl,
		Followers:             followers,
		Following:             following,
		Repositories:          repositories,
		Repositories_archived: repositories_archived,
		Organizations:         organizations,
		Starred_repos:         starred_repos,
		Subscriptions:         subscriptions,
		Email:                 email,
		Bio:                   bio,
		CreatedAt:             createdAt,
		UpdatedAt:             updatedAt,
		Extensions:            extensions,
	}

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.UserKey))
	value := k.cdc.MustMarshalBinaryBare(&user)
	store.Set(GetUserIDBytes(user.Id), value)

	// Update user count
	k.SetUserCount(ctx, count+1)

	return count
}

// SetUser set a specific user in the store
func (k Keeper) SetUser(ctx sdk.Context, user types.User) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.UserKey))
	b := k.cdc.MustMarshalBinaryBare(&user)
	store.Set(GetUserIDBytes(user.Id), b)
}

// GetUser returns a user from its id
func (k Keeper) GetUser(ctx sdk.Context, id uint64) types.User {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.UserKey))
	var user types.User
	k.cdc.MustUnmarshalBinaryBare(store.Get(GetUserIDBytes(id)), &user)
	return user
}

// HasUser checks if the user exists in the store
func (k Keeper) HasUser(ctx sdk.Context, id uint64) bool {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.UserKey))
	return store.Has(GetUserIDBytes(id))
}

// GetUserOwner returns the creator of the user
func (k Keeper) GetUserOwner(ctx sdk.Context, id uint64) string {
	return k.GetUser(ctx, id).Creator
}

// RemoveUser removes a user from the store
func (k Keeper) RemoveUser(ctx sdk.Context, id uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.UserKey))
	store.Delete(GetUserIDBytes(id))
}

// GetAllUser returns all user
func (k Keeper) GetAllUser(ctx sdk.Context) (list []types.User) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.UserKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.User
		k.cdc.MustUnmarshalBinaryBare(iterator.Value(), &val)
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
