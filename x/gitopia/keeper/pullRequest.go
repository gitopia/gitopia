package keeper

import (
	"encoding/binary"
	"strconv"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

// GetPullRequestCount get the total number of pullRequest
func (k Keeper) GetPullRequestCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PullRequestCountKey))
	byteKey := types.KeyPrefix(types.PullRequestCountKey)
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

// SetPullRequestCount set the total number of pullRequest
func (k Keeper) SetPullRequestCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PullRequestCountKey))
	byteKey := types.KeyPrefix(types.PullRequestCountKey)
	bz := []byte(strconv.FormatUint(count, 10))
	store.Set(byteKey, bz)
}

// AppendPullRequest appends a pullRequest in the store with a new id and update the count
func (k Keeper) AppendPullRequest(
	ctx sdk.Context,
	pullRequest types.PullRequest,
) uint64 {
	// Create the pullRequest
	count := k.GetPullRequestCount(ctx)

	// Set the ID of the appended value
	pullRequest.Id = count

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PullRequestKey))
	appendedValue := k.cdc.MustMarshal(&pullRequest)
	store.Set(GetPullRequestIDBytes(pullRequest.Id), appendedValue)

	// Update pullRequest count
	k.SetPullRequestCount(ctx, count+1)

	return count
}

// SetPullRequest set a specific pullRequest in the store
func (k Keeper) SetPullRequest(ctx sdk.Context, pullRequest types.PullRequest) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PullRequestKey))
	b := k.cdc.MustMarshal(&pullRequest)
	store.Set(GetPullRequestIDBytes(pullRequest.Id), b)
}

// GetPullRequest returns a pullRequest from its id
func (k Keeper) GetPullRequest(ctx sdk.Context, id uint64) types.PullRequest {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PullRequestKey))
	var pullRequest types.PullRequest
	k.cdc.MustUnmarshal(store.Get(GetPullRequestIDBytes(id)), &pullRequest)
	return pullRequest
}

// HasPullRequest checks if the pullRequest exists in the store
func (k Keeper) HasPullRequest(ctx sdk.Context, id uint64) bool {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PullRequestKey))
	return store.Has(GetPullRequestIDBytes(id))
}

// GetPullRequestOwner returns the creator of the pullRequest
func (k Keeper) GetPullRequestOwner(ctx sdk.Context, id uint64) string {
	return k.GetPullRequest(ctx, id).Creator
}

// RemovePullRequest removes a pullRequest from the store
func (k Keeper) RemovePullRequest(ctx sdk.Context, id uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PullRequestKey))
	store.Delete(GetPullRequestIDBytes(id))
}

// GetAllPullRequest returns all pullRequest
func (k Keeper) GetAllPullRequest(ctx sdk.Context) (list []types.PullRequest) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PullRequestKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.PullRequest
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetPullRequestIDBytes returns the byte representation of the ID
func GetPullRequestIDBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

// GetPullRequestIDFromBytes returns ID in uint64 format from a byte array
func GetPullRequestIDFromBytes(bz []byte) uint64 {
	return binary.BigEndian.Uint64(bz)
}
