package keeper

import (
	"encoding/binary"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

type Owner struct {
	Type string
	ID   string
}

// GetRepositoryCount get the total number of repository
func (k Keeper) GetRepositoryCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryCountKey))
	byteKey := types.KeyPrefix(types.RepositoryCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	return binary.BigEndian.Uint64(bz)
}

// SetRepositoryCount set the total number of repository
func (k Keeper) SetRepositoryCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryCountKey))
	byteKey := types.KeyPrefix(types.RepositoryCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	store.Set(byteKey, bz)
}

// AppendRepository appends a repository in the store with a new id and update the count
func (k Keeper) AppendRepository(
	ctx sdk.Context,
	repository types.Repository,
) uint64 {
	// Create the repository
	count := k.GetRepositoryCount(ctx)

	// Set the ID of the appended value
	repository.Id = count

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))
	appendedValue := k.cdc.MustMarshal(&repository)
	store.Set(GetRepositoryIDBytes(repository.Id), appendedValue)

	// Update repository count
	k.SetRepositoryCount(ctx, count+1)

	return count
}

// SetRepository set a specific repository in the store
func (k Keeper) SetRepository(ctx sdk.Context, repository types.Repository) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))
	b := k.cdc.MustMarshal(&repository)
	store.Set(GetRepositoryIDBytes(repository.Id), b)
}

// GetRepository returns a repository from its id
func (k Keeper) GetRepository(ctx sdk.Context, id uint64) (val types.Repository, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))
	b := store.Get(GetRepositoryIDBytes(id))
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveRepository removes a repository from the store
func (k Keeper) RemoveRepository(ctx sdk.Context, id uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))
	store.Delete(GetRepositoryIDBytes(id))
}

// GetAllRepository returns all repository
func (k Keeper) GetAllRepository(ctx sdk.Context) (list []types.Repository) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Repository
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetRepositoryIDBytes returns the byte representation of the ID
func GetRepositoryIDBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

// GetRepositoryIDFromBytes returns ID in uint64 format from a byte array
func GetRepositoryIDFromBytes(bz []byte) uint64 {
	return binary.BigEndian.Uint64(bz)
}
