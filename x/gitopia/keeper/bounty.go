package keeper

import (
	"encoding/binary"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/address"
	"github.com/gitopia/gitopia/v3/x/gitopia/types"
)

// GetBountyCount get the total number of bounty
func (k Keeper) GetBountyCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.BountyCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	return binary.BigEndian.Uint64(bz)
}

// SetBountyCount set the total number of bounty
func (k Keeper) SetBountyCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.BountyCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	store.Set(byteKey, bz)
}

// AppendBounty appends a bounty in the store with a new id and update the count
func (k Keeper) AppendBounty(
	ctx sdk.Context,
	bounty types.Bounty,
) uint64 {
	// Create the bounty
	count := k.GetBountyCount(ctx)

	// Set the ID of the appended value
	bounty.Id = count

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.BountyKey))
	appendedValue := k.cdc.MustMarshal(&bounty)
	store.Set(GetBountyIDBytes(bounty.Id), appendedValue)

	// Update bounty count
	k.SetBountyCount(ctx, count+1)

	return count
}

// SetBounty set a specific bounty in the store
func (k Keeper) SetBounty(ctx sdk.Context, bounty types.Bounty) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.BountyKey))
	b := k.cdc.MustMarshal(&bounty)
	store.Set(GetBountyIDBytes(bounty.Id), b)
}

// GetBounty returns a bounty from its id
func (k Keeper) GetBounty(ctx sdk.Context, id uint64) (val types.Bounty, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.BountyKey))
	b := store.Get(GetBountyIDBytes(id))
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveBounty removes a bounty from the store
func (k Keeper) RemoveBounty(ctx sdk.Context, id uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.BountyKey))
	store.Delete(GetBountyIDBytes(id))
}

// GetAllBounty returns all bounty
func (k Keeper) GetAllBounty(ctx sdk.Context) (list []types.Bounty) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.BountyKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Bounty
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetBountyIDBytes returns the Module address for bounty id
func GetBountyAddress(bountyId uint64) sdk.AccAddress {
	key := append([]byte("bounty"), sdk.Uint64ToBigEndian(bountyId)...)
	return address.Module(types.ModuleName, key)
}

// GetBountyIDBytes returns the byte representation of the ID
func GetBountyIDBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

// GetBountyIDFromBytes returns ID in uint64 format from a byte array
func GetBountyIDFromBytes(bz []byte) uint64 {
	return binary.BigEndian.Uint64(bz)
}
