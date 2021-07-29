package keeper

import (
	"encoding/binary"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"strconv"
)

// GetOrganizationCount get the total number of organization
func (k Keeper) GetOrganizationCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.OrganizationCountKey))
	byteKey := types.KeyPrefix(types.OrganizationCountKey)
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

// SetOrganizationCount set the total number of organization
func (k Keeper) SetOrganizationCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.OrganizationCountKey))
	byteKey := types.KeyPrefix(types.OrganizationCountKey)
	bz := []byte(strconv.FormatUint(count, 10))
	store.Set(byteKey, bz)
}

// AppendOrganization appends a organization in the store with a new id and update the count
func (k Keeper) AppendOrganization(
	ctx sdk.Context,
	organization types.Organization,
) uint64 {
	// Create the organization
	count := k.GetOrganizationCount(ctx)

	// Set the ID of the appended value
	organization.Id = count

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.OrganizationKey))
	appendedValue := k.cdc.MustMarshalBinaryBare(&organization)
	store.Set(GetOrganizationIDBytes(organization.Id), appendedValue)

	// Update organization count
	k.SetOrganizationCount(ctx, count+1)

	return count
}

// SetOrganization set a specific organization in the store
func (k Keeper) SetOrganization(ctx sdk.Context, organization types.Organization) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.OrganizationKey))
	b := k.cdc.MustMarshalBinaryBare(&organization)
	store.Set(GetOrganizationIDBytes(organization.Id), b)
}

// GetOrganization returns a organization from its id
func (k Keeper) GetOrganization(ctx sdk.Context, id uint64) types.Organization {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.OrganizationKey))
	var organization types.Organization
	k.cdc.MustUnmarshalBinaryBare(store.Get(GetOrganizationIDBytes(id)), &organization)
	return organization
}

// HasOrganization checks if the organization exists in the store
func (k Keeper) HasOrganization(ctx sdk.Context, id uint64) bool {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.OrganizationKey))
	return store.Has(GetOrganizationIDBytes(id))
}

// GetOrganizationOwner returns the creator of the organization
func (k Keeper) GetOrganizationOwner(ctx sdk.Context, id uint64) string {
	return k.GetOrganization(ctx, id).Creator
}

// RemoveOrganization removes a organization from the store
func (k Keeper) RemoveOrganization(ctx sdk.Context, id uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.OrganizationKey))
	store.Delete(GetOrganizationIDBytes(id))
}

// GetAllOrganization returns all organization
func (k Keeper) GetAllOrganization(ctx sdk.Context) (list []types.Organization) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.OrganizationKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Organization
		k.cdc.MustUnmarshalBinaryBare(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetOrganizationIDBytes returns the byte representation of the ID
func GetOrganizationIDBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

// GetOrganizationIDFromBytes returns ID in uint64 format from a byte array
func GetOrganizationIDFromBytes(bz []byte) uint64 {
	return binary.BigEndian.Uint64(bz)
}
