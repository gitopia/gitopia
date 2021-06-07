package keeper

import (
	"encoding/binary"
	"encoding/json"
	"strconv"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

type Owner struct {
	Type string
	ID   uint64
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
	count, err := strconv.ParseUint(string(bz), 10, 64)
	if err != nil {
		// Panic because the count should be always formattable to iint64
		panic("cannot decode count")
	}

	return count
}

// SetRepositoryCount set the total number of repository
func (k Keeper) SetRepositoryCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryCountKey))
	byteKey := types.KeyPrefix(types.RepositoryCountKey)
	bz := []byte(strconv.FormatUint(count, 10))
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
	appendedValue := k.cdc.MustMarshalBinaryBare(&repository)
	store.Set(GetRepositoryIDBytes(repository.Id), appendedValue)

	// Update repository count
	k.SetRepositoryCount(ctx, count+1)

	// Update user/organization repositories
	var o Owner
	json.Unmarshal([]byte(repository.Owner), &o)

	if o.Type == "User" {
		user := k.GetUser(ctx, o.ID)
		user.Repositories = append(user.Repositories, repository.Id)
		k.SetUser(ctx, user)
	} else if o.Type == "Organization" {
		// Todo
	}

	return count
}

// SetRepository set a specific repository in the store
func (k Keeper) SetRepository(ctx sdk.Context, repository types.Repository) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))
	b := k.cdc.MustMarshalBinaryBare(&repository)
	store.Set(GetRepositoryIDBytes(repository.Id), b)
}

// GetRepository returns a repository from its id
func (k Keeper) GetRepository(ctx sdk.Context, id uint64) types.Repository {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))
	var repository types.Repository
	k.cdc.MustUnmarshalBinaryBare(store.Get(GetRepositoryIDBytes(id)), &repository)
	return repository
}

// HasRepository checks if the repository exists in the store
func (k Keeper) HasRepository(ctx sdk.Context, id uint64) bool {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))
	return store.Has(GetRepositoryIDBytes(id))
}

// GetRepositoryOwner returns the creator of the repository
func (k Keeper) GetRepositoryOwner(ctx sdk.Context, id uint64) string {
	return k.GetRepository(ctx, id).Creator
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
		k.cdc.MustUnmarshalBinaryBare(iterator.Value(), &val)
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
