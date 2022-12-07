package keeper

import (
	"encoding/binary"

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
	return binary.BigEndian.Uint64(bz)
}

// SetPullRequestCount set the total number of pullRequest
func (k Keeper) SetPullRequestCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PullRequestCountKey))
	byteKey := types.KeyPrefix(types.PullRequestCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
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

	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.GetPullRequestKeyForRepositoryId(pullRequest.Base.RepositoryId)),
	)
	appendedValue := k.cdc.MustMarshal(&pullRequest)
	store.Set(GetPullRequestIDBytes(pullRequest.Iid), appendedValue)

	// Update pullRequest count
	k.SetPullRequestCount(ctx, count+1)

	return count
}

// SetPullRequest set a specific pullRequest in the store
func (k Keeper) SetPullRequest(ctx sdk.Context, pullRequest types.PullRequest) {
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.GetPullRequestKeyForRepositoryId(pullRequest.Base.RepositoryId)),
	)
	b := k.cdc.MustMarshal(&pullRequest)
	store.Set(GetPullRequestIDBytes(pullRequest.Iid), b)
}

// GetRepositoryPullRequest returns a pullRequest from its id
func (k Keeper) GetRepositoryPullRequest(ctx sdk.Context, repositoryId uint64, iid uint64) (val types.PullRequest, found bool) {
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.GetPullRequestKeyForRepositoryId(repositoryId)),
	)
	b := store.Get(GetPullRequestIDBytes(iid))
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveRepositoryPullRequest removes a pullRequest from the store
func (k Keeper) RemoveRepositoryPullRequest(ctx sdk.Context, repositoryId uint64, iid uint64) {
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.GetPullRequestKeyForRepositoryId(repositoryId)),
	)
	store.Delete(GetPullRequestIDBytes(iid))
}

// GetAllRepositoryPullRequest returns all repository pullRequest
func (k Keeper) GetAllRepositoryPullRequest(ctx sdk.Context, repositoryId uint64) (list []types.PullRequest) {
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.GetPullRequestKeyForRepositoryId(repositoryId)),
	)
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.PullRequest
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
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
