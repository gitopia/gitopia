package keeper

import (
	"encoding/binary"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

// GetLegacyDaoAddressCount get the total number of Daos with legacy address
func (k Keeper) GetLegacyDaoAddressCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.LegacyDaoAddressCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	return binary.BigEndian.Uint64(bz)
}

// SetLegacyDaoAddressCount set the total number of Daos with legacy address
func (k Keeper) SetLegacyDaoAddressCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.LegacyDaoAddressCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	store.Set(byteKey, bz)
}

// AppendLegacyDaoAddress appends a legacyDaoAddress in the store with a new id and update the count
func (k Keeper) AppendLegacyDaoAddress(
	ctx sdk.Context,
	legacyDaoAddress types.LegacyDaoAddress,
) uint64 {
	count := k.GetLegacyDaoAddressCount(ctx)

	// Set the ID of the appended value
	legacyDaoAddress.Id = count

	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.LegacyDaoAddressKey),
	)
	appendedValue := k.cdc.MustMarshal(&legacyDaoAddress)
	store.Set([]byte(legacyDaoAddress.LegacyAddress), appendedValue)

	k.SetLegacyDaoAddress(ctx, types.LegacyDaoAddress{
		Id:            legacyDaoAddress.Id,
		LegacyAddress: legacyDaoAddress.LegacyAddress,
		Address:       legacyDaoAddress.Address,
	})

	// Update legacyDaoAddress count
	k.SetLegacyDaoAddressCount(ctx, count+1)

	return count
}

// SetLegacyDaoAddress set a specific legacyDaoAddress in the store
func (k Keeper) SetLegacyDaoAddress(ctx sdk.Context, legacyDaoAddress types.LegacyDaoAddress) {
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.LegacyDaoAddressKey),
	)
	b := k.cdc.MustMarshal(&legacyDaoAddress)
	store.Set([]byte(legacyDaoAddress.LegacyAddress), b)
}

// GetLegacyDaoAddress returns a legacyDaoAddress from its legacyAddress
func (k Keeper) GetLegacyDaoAddress(ctx sdk.Context, legacyDaoAddress string) (val types.LegacyDaoAddress, found bool) {
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.LegacyDaoAddressKey),
	)
	b := store.Get([]byte(legacyDaoAddress))
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveLegacyDaoAddress removes a legacyDaoAddress from the store
func (k Keeper) RemoveLegacyDaoAddress(ctx sdk.Context, legacyDaoAddress string) {
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.LegacyDaoAddressKey),
	)

	store.Delete([]byte(legacyDaoAddress))
}

// GetAllLegacyDaoAddress returns all legacyDaoAddress
func (k Keeper) GetAllLegacyDaoAddress(ctx sdk.Context) (list []types.LegacyDaoAddress) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.LegacyDaoAddressKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.LegacyDaoAddress
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetLegacyDaoAddressIDBytes returns the byte representation of the ID
func GetLegacyDaoAddressIDBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

// GetMemberIDFromBytes returns ID in uint64 format from a byte array
func GetLegacyDaoAddressIDFromBytes(bz []byte) uint64 {
	return binary.BigEndian.Uint64(bz)
}
