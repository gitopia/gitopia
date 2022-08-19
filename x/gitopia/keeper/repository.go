package keeper

import (
	"encoding/binary"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

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

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.GetRepositoryKeyForAddress(repository.Owner.Id)))
	appendedValue := k.cdc.MustMarshal(&repository)
	store.Set([]byte(repository.Name), appendedValue)
	k.SetBaseRepositoryKey(
		ctx,
		types.BaseRepositoryKey{Id: repository.Id, Address: repository.Owner.Id, Name: repository.Name},
	)

	// Update repository count
	k.SetRepositoryCount(ctx, count+1)

	return count
}

func (k Keeper) SetBaseRepositoryKey(
	ctx sdk.Context,
	repositoryKey types.BaseRepositoryKey,
) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.BaseRepositoryKeyKey))
	appendedValue := k.cdc.MustMarshal(&repositoryKey)
	store.Set(GetRepositoryIDBytes(repositoryKey.Id), appendedValue)
}

func (k Keeper) GetRepositoryKeyBytesFromId(
	ctx sdk.Context,
	repositoryId uint64,
) ([]byte, bool) {
	var repositoryKey types.BaseRepositoryKey
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.BaseRepositoryKeyKey))
	b := store.Get(GetRepositoryIDBytes(repositoryId))
	if b == nil {
		return []byte(""), false
	}
	k.cdc.MustUnmarshal(b, &repositoryKey)
	return []byte(repositoryKey.Address + "-" + repositoryKey.Name), true
}

// SetRepository set a specific repository in the store
func (k Keeper) SetRepository(ctx sdk.Context, repository types.Repository) {
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.GetRepositoryKeyForAddress(repository.Owner.Id)),
	)
	b := k.cdc.MustMarshal(&repository)
	store.Set(GetRepositoryIDBytes(repository.Id), b)
}

// GetAddressRepository returns a repository by address
func (k Keeper) GetAddressRepository(ctx sdk.Context, address string, name string) (val types.Repository, found bool) {
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.GetRepositoryKeyForAddress(address)),
	)
	b := store.Get([]byte(name))
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// GetRepositoryFromKey returns a repository by key
func (k Keeper) GetRepositoryFromKey(ctx sdk.Context, repositoryKey []byte) (val types.Repository, found bool) {
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.RepositoryKey),
	)
	b := store.Get(repositoryKey)
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// GetRepositoryFromKey returns a repository by key
func (k Keeper) GetRepositoryById(ctx sdk.Context, repositoryId uint64) (types.Repository, bool) {
	repositoryKey, found := k.GetRepositoryKeyBytesFromId(ctx, repositoryId)
	if !found {
		return types.Repository{}, false
	}
	repository, found := k.GetRepositoryFromKey(ctx, repositoryKey)
	if !found {
		return types.Repository{}, false
	}
	return repository, true
}

// RemoveAddressRepository removes a repository from the store by address
func (k Keeper) RemoveAddressRepository(ctx sdk.Context, address string, name string) {
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.GetRepositoryKeyForAddress(address)),
	)
	store.Delete([]byte(name))
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

// GetAllBaseRepositoryKey returns all repository
func (k Keeper) GetAllBaseRepositoryKey(ctx sdk.Context) (list []types.BaseRepositoryKey) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.BaseRepositoryKeyKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.BaseRepositoryKey
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetAllAddressRepository returns all repository for address
func (k Keeper) GetAllAddressRepository(ctx sdk.Context, address string) (list []types.Repository) {
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.GetRepositoryKeyForAddress(address)),
	)
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

func GetRepositoryKeyBytesFromBaseKey(repositoryId types.BaseRepositoryKey) []byte {
	return []byte(repositoryId.Address + "-" + repositoryId.Name)
}
