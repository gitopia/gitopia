package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v6/x/storage/types"
)

// GetCidReferenceCount get the total number of cid reference count
func (k Keeper) GetCidReferenceCount(ctx sdk.Context, cid string) (val types.CidReferenceCount, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CidReferenceCountKey))
	byteKey := []byte(cid)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(bz, &val)
	return val, true
}

// SetCidReferenceCount set the total number of cid reference count
func (k Keeper) SetCidReferenceCount(ctx sdk.Context, cidReferenceCount types.CidReferenceCount) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CidReferenceCountKey))
	byteKey := []byte(cidReferenceCount.Cid)
	b := k.cdc.MustMarshal(&cidReferenceCount)
	store.Set(byteKey, b)
}

// IncreaseCidReferenceCount increase the total number of cid reference count
func (k Keeper) IncreaseCidReferenceCount(ctx sdk.Context, cid string) {
	count, _ := k.GetCidReferenceCount(ctx, cid)
	k.SetCidReferenceCount(ctx, types.CidReferenceCount{Cid: cid, Count: count.Count + 1})
}

// DecreaseCidReferenceCount decrease the total number of cid reference count
func (k Keeper) DecreaseCidReferenceCount(ctx sdk.Context, cid string) {
	count, _ := k.GetCidReferenceCount(ctx, cid)
	if count.Count == 0 {
		return
	}
	k.SetCidReferenceCount(ctx, types.CidReferenceCount{Cid: cid, Count: count.Count - 1})
}

// RemoveCidReferenceCount remove the cid reference count
func (k Keeper) RemoveCidReferenceCount(ctx sdk.Context, cid string) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CidReferenceCountKey))
	byteKey := []byte(cid)
	store.Delete(byteKey)
}
