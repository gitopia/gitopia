package keeper

import (
	"encoding/binary"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/address"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

// GetDaoCount get the total number of Dao
func (k Keeper) GetDaoCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.DaoCountKey))
	byteKey := types.KeyPrefix(types.DaoCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	return binary.BigEndian.Uint64(bz)
}

// SetDaoCount set the total number of Dao
func (k Keeper) SetDaoCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.DaoCountKey))
	byteKey := types.KeyPrefix(types.DaoCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	store.Set(byteKey, bz)
}

// AppendDao appends a Dao in the store with a new id and update the count
func (k Keeper) AppendDao(
	ctx sdk.Context,
	dao types.Dao,
) uint64 {
	// Create the Dao
	count := k.GetDaoCount(ctx)

	// Set the ID of the appended value
	dao.Id = count

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.DaoKey))
	appendedValue := k.cdc.MustMarshal(&dao)
	store.Set([]byte(dao.Address), appendedValue)

	// Update Dao count
	k.SetDaoCount(ctx, count+1)

	return count
}

func (k Keeper) SetUserDao(
	ctx sdk.Context,
	userDao types.UserDao,
) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.GetUserDaoKeyForUserAddress(userDao.UserAddress)))
	appendedValue := k.cdc.MustMarshal(&userDao)
	store.Set([]byte(userDao.DaoAddress), appendedValue)
}

// SetDao set a specific Dao in the store
func (k Keeper) SetDao(ctx sdk.Context, dao types.Dao) {
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.DaoKey),
	)
	b := k.cdc.MustMarshal(&dao)
	store.Set([]byte(dao.Address), b)
}

// GetDao returns a Dao from its address
func (k Keeper) GetDao(ctx sdk.Context, address string) (val types.Dao, found bool) {
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.DaoKey),
	)
	b := store.Get([]byte(address))
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveDao removes a Dao from the store
func (k Keeper) RemoveDao(ctx sdk.Context, address string) {
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.DaoKey),
	)
	store.Delete([]byte(address))
}

// GetAllDao returns all Dao
func (k Keeper) GetAllDao(ctx sdk.Context) (list []types.Dao) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.DaoKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Dao
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetAllUserDao returns all user
func (k Keeper) GetAllUserDao(ctx sdk.Context, userAddress string) (list []types.Dao) {
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.GetUserDaoKeyForUserAddress(userAddress)),
	)
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		dao, found := k.GetDao(ctx, string(iterator.Value()))
		if found {
			list = append(list, dao)
		}
	}

	return
}

func NewDaoAddress(daoId uint64) sdk.AccAddress {
	key := append([]byte("dao"), sdk.Uint64ToBigEndian(daoId)...)
	return address.Module(types.ModuleName, key)
}

// GetDaoIDBytes returns the byte representation of the ID
func GetDaoIDBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

// GetDaoIDFromBytes returns ID in uint64 format from a byte array
func GetDaoIDFromBytes(bz []byte) uint64 {
	return binary.BigEndian.Uint64(bz)
}
