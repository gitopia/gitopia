package keeper

import (
	"encoding/binary"
	"errors"
	"strings"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

type WhoisAddress struct {
	address   string
	ownerType types.OwnerType
}

// GetWhoisCount get the total number of whois
func (k Keeper) GetWhoisCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.WhoisCountKey))
	byteKey := types.KeyPrefix(types.WhoisCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	return binary.BigEndian.Uint64(bz)
}

// SetWhoisCount set the total number of whois
func (k Keeper) SetWhoisCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.WhoisCountKey))
	byteKey := types.KeyPrefix(types.WhoisCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	store.Set(byteKey, bz)
}

// SetWhois set a specific whois in the store
func (k Keeper) SetWhois(ctx sdk.Context, name string, whois types.Whois) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.WhoisKey))
	b := k.cdc.MustMarshal(&whois)
	key := []byte(types.WhoisKey + name)
	store.Set(key, b)
}

// GetWhois returns the whois information
func (k Keeper) GetWhois(ctx sdk.Context, key string) (val types.Whois, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.WhoisKey))
	byteKey := []byte(types.WhoisKey + key)
	b := store.Get(byteKey)
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveWhois removes a whois from the store
func (k Keeper) RemoveWhois(ctx sdk.Context, key string) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.WhoisKey))
	store.Delete([]byte(types.WhoisKey + key))
}

// GetAllWhois returns all whois
func (k Keeper) GetAllWhois(ctx sdk.Context) (list []types.Whois) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.WhoisKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Whois
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// Checks if username or address is valid and exists. Also identify its type (USER/DAO).
func (k Keeper) ResolveAddress(ctx sdk.Context, id string) (address *WhoisAddress, err error) {
	if _, err := sdk.AccAddressFromBech32(id); err != nil {
		whois, found := k.GetWhois(ctx, strings.ToLower(id))
		if !found {
			return nil, errors.New("username or address not exists")
		}
		return &WhoisAddress{address: whois.Address, ownerType: whois.OwnerType}, nil
	}

	if _, found := k.GetUser(ctx, id); found {
		return &WhoisAddress{address: id, ownerType: types.OwnerType_USER}, nil
	}

	if _, found := k.GetDao(ctx, id); found {
		return &WhoisAddress{address: id, ownerType: types.OwnerType_DAO}, nil
	}

	return nil, errors.New("username or address not exists")
}
