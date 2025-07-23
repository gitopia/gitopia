package keeper

import (
	"encoding/binary"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v6/x/gitopia/types"
)

// GetBranchCount get the total number of branch
func (k Keeper) GetBranchCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.BranchCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	return binary.BigEndian.Uint64(bz)
}

// SetBranchCount set the total number of branch
func (k Keeper) SetBranchCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.BranchCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	store.Set(byteKey, bz)
}

// AppendBranch appends a branch in the store with a new id and update the count
func (k Keeper) AppendBranch(
	ctx sdk.Context,
	branch types.Branch,
) uint64 {
	// Create the branch
	count := k.GetBranchCount(ctx)
	// Set the ID of the appended value
	branch.Id = count

	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.GetBranchKeyForRepositoryId(branch.RepositoryId)),
	)
	appendedValue := k.cdc.MustMarshal(&branch)
	store.Set([]byte(branch.Name), appendedValue)

	// Update branch count
	k.SetBranchCount(ctx, count+1)

	return count
}

// SetBranch set a specific branch in the store for repository-id
func (k Keeper) SetRepositoryBranch(ctx sdk.Context, branch types.Branch) {
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.GetBranchKeyForRepositoryId(branch.RepositoryId)),
	)
	b := k.cdc.MustMarshal(&branch)
	store.Set([]byte(branch.Name), b)
}

// GetRepositoryBranch returns a branch from its name
func (k Keeper) GetRepositoryBranch(ctx sdk.Context, repositoryId uint64, branch string) (val types.Branch, found bool) {
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.GetBranchKeyForRepositoryId(repositoryId)),
	)
	b := store.Get([]byte(branch))
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveBranch removes a branch from the store
func (k Keeper) RemoveRepositoryBranch(ctx sdk.Context, repositoryId uint64, branchName string) {
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.GetBranchKeyForRepositoryId(repositoryId)),
	)
	store.Delete([]byte(branchName))
}

// GetAllBranch returns all branch
func (k Keeper) GetAllBranch(ctx sdk.Context) (list []types.Branch) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.BranchKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Branch
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetAllRepositoryBranch returns all branch for repository-id
func (k Keeper) GetAllRepositoryBranch(ctx sdk.Context, repositoryId uint64) (list []types.Branch) {
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.GetBranchKeyForRepositoryId(repositoryId)),
	)
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Branch
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetBranchIDBytes returns the byte representation of the ID
func GetBranchIDBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

// GetBranchIDFromBytes returns ID in uint64 format from a byte array
func GetBranchIDFromBytes(bz []byte) uint64 {
	return binary.BigEndian.Uint64(bz)
}
