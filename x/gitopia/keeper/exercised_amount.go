package keeper

import (
	"encoding/binary"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v2/x/gitopia/types"
)

// GetExercisedAmountCount get the total number of exercised amounts
func (k Keeper) GetExercisedAmountCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ExercisedAmountCountKey))
	byteKey := types.KeyPrefix(types.ExercisedAmountCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	return binary.BigEndian.Uint64(bz)
}

// SetExercisedAmountCount set the total number of exercised amount
func (k Keeper) SetExercisedAmountCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ExercisedAmountCountKey))
	byteKey := types.KeyPrefix(types.ExercisedAmountCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	store.Set(byteKey, bz)
}

// AppendExercisedAmount appends a exercised amount in the store and update the count
func (k Keeper) AppendExercisedAmount(
	ctx sdk.Context,
	exercisedAmount types.ExercisedAmount,
) uint64 {
	// Create the exercised amount
	count := k.GetExercisedAmountCount(ctx)

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ExercisedAmountKey))
	appendedValue := k.cdc.MustMarshal(&exercisedAmount)
	store.Set([]byte(exercisedAmount.Address), appendedValue)

	// Update exercised amount count
	k.SetExercisedAmountCount(ctx, count+1)

	return count
}

// SetExercisedAmount set a specific exercised amount in the store
func (k Keeper) SetExercisedAmount(ctx sdk.Context, exercisedAmount types.ExercisedAmount) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ExercisedAmountKey))
	b := k.cdc.MustMarshal(&exercisedAmount)
	store.Set([]byte(exercisedAmount.Address), b)
}

// GetExercisedAmount returns the exercised amount information
func (k Keeper) GetExercisedAmount(ctx sdk.Context, address string) (val types.ExercisedAmount, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ExercisedAmountKey))
	b := store.Get([]byte(address))
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveExercisedAmount removes a exercised amount from the store
func (k Keeper) RemoveExercised(ctx sdk.Context, address string) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ExercisedAmountKey))
	store.Delete([]byte(address))
}

// GetAllExercisedAmount returns all exercised amount
func (k Keeper) GetAllExercisedAmount(ctx sdk.Context) (list []types.ExercisedAmount) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ExercisedAmountKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.ExercisedAmount
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetExercisedAmountIDBytes returns the byte representation of the ID
func GetExercisedAmountIDBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

// GetExercisedAmountIDFromBytes returns ID in uint64 format from a byte array
func GetExercisedAmountIDFromBytes(bz []byte) uint64 {
	return binary.BigEndian.Uint64(bz)
}
