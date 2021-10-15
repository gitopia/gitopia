package keeper

import (
	"encoding/binary"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

// GetIssueCount get the total number of issue
func (k Keeper) GetIssueCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.IssueCountKey))
	byteKey := types.KeyPrefix(types.IssueCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	return binary.BigEndian.Uint64(bz)
}

// SetIssueCount set the total number of issue
func (k Keeper) SetIssueCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.IssueCountKey))
	byteKey := types.KeyPrefix(types.IssueCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	store.Set(byteKey, bz)
}

// AppendIssue appends a issue in the store with a new id and update the count
func (k Keeper) AppendIssue(
	ctx sdk.Context,
	issue types.Issue,
) uint64 {
	// Create the issue
	count := k.GetIssueCount(ctx)

	// Set the ID of the appended value
	issue.Id = count

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.IssueKey))
	appendedValue := k.cdc.MustMarshal(&issue)
	store.Set(GetIssueIDBytes(issue.Id), appendedValue)

	// Update issue count
	k.SetIssueCount(ctx, count+1)

	return count
}

// SetIssue set a specific issue in the store
func (k Keeper) SetIssue(ctx sdk.Context, issue types.Issue) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.IssueKey))
	b := k.cdc.MustMarshal(&issue)
	store.Set(GetIssueIDBytes(issue.Id), b)
}

// GetIssue returns a issue from its id
func (k Keeper) GetIssue(ctx sdk.Context, id uint64) (val types.Issue, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.IssueKey))
	b := store.Get(GetIssueIDBytes(id))
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveIssue removes a issue from the store
func (k Keeper) RemoveIssue(ctx sdk.Context, id uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.IssueKey))
	store.Delete(GetIssueIDBytes(id))
}

// GetAllIssue returns all issue
func (k Keeper) GetAllIssue(ctx sdk.Context) (list []types.Issue) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.IssueKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Issue
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetIssueIDBytes returns the byte representation of the ID
func GetIssueIDBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

// GetIssueIDFromBytes returns ID in uint64 format from a byte array
func GetIssueIDFromBytes(bz []byte) uint64 {
	return binary.BigEndian.Uint64(bz)
}
