package keeper

import (
	"encoding/binary"
	"strconv"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/tendermint/tendermint/crypto"
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
) string {
	// Create the organization
	count := k.GetOrganizationCount(ctx)

	// Set the ID of the appended value
	organization.Id = count
	organization.Address = k.GetOrganizationAddress(ctx, organization.Creator)

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.OrganizationKey))
	appendedValue := k.cdc.MustMarshalBinaryBare(&organization)
	key := []byte(types.OrganizationKey + organization.Address)
	store.Set(key, appendedValue)

	// Update organization count
	k.SetOrganizationCount(ctx, count+1)

	return organization.Address
}

// SetOrganization set a specific organization in the store
func (k Keeper) SetOrganization(ctx sdk.Context, organization types.Organization) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.OrganizationKey))
	b := k.cdc.MustMarshalBinaryBare(&organization)
	key := []byte(types.OrganizationKey + organization.Address)
	store.Set(key, b)
}

// GetOrganization returns a organization from its id
func (k Keeper) GetOrganization(ctx sdk.Context, id string) types.Organization {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.OrganizationKey))
	var organization types.Organization
	key := []byte(types.OrganizationKey + id)
	k.cdc.MustUnmarshalBinaryBare(store.Get(key), &organization)
	return organization
}

// HasOrganization checks if the organization exists in the store
func (k Keeper) HasOrganization(ctx sdk.Context, id string) bool {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.OrganizationKey))
	key := []byte(types.OrganizationKey + id)
	return store.Has(key)
}

// GetOrganizationOwner returns the creator of the organization
func (k Keeper) GetOrganizationOwner(ctx sdk.Context, id string) string {
	return k.GetOrganization(ctx, id).Creator
}

// RemoveOrganization removes a organization from the store
func (k Keeper) RemoveOrganization(ctx sdk.Context, id string) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.OrganizationKey))
	key := []byte(types.OrganizationKey + id)
	store.Delete(key)
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

// GetOrganizationAddress returns the address for a new organization
func (k Keeper) GetOrganizationAddress(ctx sdk.Context, creator string) string {
	addr, _ := sdk.AccAddressFromBech32(creator)
	account := k.accountKeeper.GetAccount(ctx, addr)
	nonce := account.GetSequence()
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, nonce)
	bz = append(addr, bz...)
	orgAddress := crypto.AddressHash(bz[8:])
	return sdk.AccAddress(orgAddress).String()
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
