package keeper

import (
	"encoding/binary"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v2/x/gitopia/types"
)

// GetMemberCount get the total number of member
func (k Keeper) GetMemberCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.MemberCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	return binary.BigEndian.Uint64(bz)
}

// SetMemberCount set the total number of member
func (k Keeper) SetMemberCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.MemberCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	store.Set(byteKey, bz)
}

// AppendMember appends a member in the store with a new id and update the count
func (k Keeper) AppendMember(
	ctx sdk.Context,
	member types.Member,
) uint64 {
	// Create the member
	count := k.GetMemberCount(ctx)

	// Set the ID of the appended value
	member.Id = count

	daoStore := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.GetMemberKeyForDaoAddress(member.DaoAddress)),
	)
	appendedValue := k.cdc.MustMarshal(&member)
	daoStore.Set([]byte(member.Address), appendedValue)

	k.SetUserDao(ctx, types.UserDao{
		UserAddress: member.Address,
		DaoAddress:  member.DaoAddress,
	})

	// Update member count
	k.SetMemberCount(ctx, count+1)

	return count
}

// SetMember set a specific member in the store
func (k Keeper) SetMember(ctx sdk.Context, member types.Member) {
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.GetMemberKeyForDaoAddress(member.DaoAddress)),
	)
	b := k.cdc.MustMarshal(&member)
	store.Set([]byte(member.Address), b)
}

// GetDaoMember returns a member from its id
func (k Keeper) GetDaoMember(ctx sdk.Context, daoAddress string, memberAddress string) (val types.Member, found bool) {
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.GetMemberKeyForDaoAddress(daoAddress)),
	)
	b := store.Get([]byte(memberAddress))
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveDaoMember removes a member from the store
func (k Keeper) RemoveDaoMember(ctx sdk.Context, daoAddress string, memberAddress string) {
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.GetMemberKeyForDaoAddress(daoAddress)),
	)

	userDaoStore := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.GetUserDaoKeyForUserAddress(memberAddress)),
	)

	store.Delete([]byte(memberAddress))
	userDaoStore.Delete([]byte(daoAddress))
}

// GetAllMember returns all member
func (k Keeper) GetAllMember(ctx sdk.Context) (list []types.Member) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.MemberKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Member
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetAllDaoMember returns all dao member
func (k Keeper) GetAllDaoMember(ctx sdk.Context, daoAddress string) (list []types.Member) {
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.GetMemberKeyForDaoAddress(daoAddress)),
	)
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Member
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetDaoOwner returns all dao owner
func (k Keeper) GetAllDaoOwner(ctx sdk.Context, daoAddress string) (list []types.Member) {
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.GetMemberKeyForDaoAddress(daoAddress)),
	)
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Member
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		if val.Role == types.MemberRole_OWNER {
			list = append(list, val)
		}
	}

	return
}

// GetMemberIDBytes returns the byte representation of the ID
func GetMemberIDBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

// GetMemberIDFromBytes returns ID in uint64 format from a byte array
func GetMemberIDFromBytes(bz []byte) uint64 {
	return binary.BigEndian.Uint64(bz)
}
