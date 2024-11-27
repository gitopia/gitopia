package v4

import (
	"encoding/binary"
	"time"

	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/group"
	groupkeeper "github.com/cosmos/cosmos-sdk/x/group/keeper"
	v3types "github.com/gitopia/gitopia/v5/x/gitopia/migrations/v3/types"
	"github.com/gitopia/gitopia/v5/x/gitopia/types"
)

const (
	MemberKey = "Member-value-"
)

// migrate module from v4 to v5
func Migrate(ctx sdk.Context, storeKey storetypes.StoreKey, cdc codec.BinaryCodec, groupKeeper *groupkeeper.Keeper) error {
	store := ctx.KVStore(storeKey)
	iterator := sdk.KVStorePrefixIterator(store, types.KeyPrefix(types.DaoKey))

	defer iterator.Close()
	for ; iterator.Valid(); iterator.Next() {
		var oldDao v3types.Dao
		cdc.MustUnmarshal(iterator.Value(), &oldDao)

		// get all dao members
		members := GetAllDaoMember(ctx, storeKey, cdc, oldDao.Address)

		// iterate over members and create list of group member request
		var groupMembers []group.MemberRequest
		for _, member := range members {
			weight := "0.1"

			// set weight to 1 if member role is v3types.MemberRole_OWNER
			if member.Role == v3types.MemberRole_OWNER {
				weight = "1"
			}

			groupMembers = append(groupMembers, group.MemberRequest{
				Address:  member.Address,
				Weight:   weight,
				Metadata: "",
			})
		}

		groupMsg := &group.MsgCreateGroupWithPolicy{
			Admin:              oldDao.Creator,
			Members:            groupMembers,
			GroupMetadata:      oldDao.Name,
			GroupPolicyAsAdmin: true,
		}

		hours, _ := sdk.NewDecFromStr("2")
		seconds := hours.Mul(sdk.NewDec(int64(time.Hour))).TruncateInt().Int64()
		votingPeriod := time.Duration(seconds)

		policy := group.NewPercentageDecisionPolicy(
			"0.5",
			votingPeriod,
			time.Duration(0),
		)
		err := groupMsg.SetDecisionPolicy(policy)
		if err != nil {
			return err
		}

		// Create the group
		res, err := groupKeeper.CreateGroupWithPolicy(ctx, groupMsg)
		if err != nil {
			return err
		}

		var dao = types.Dao{
			Creator:     oldDao.Creator,
			Id:          oldDao.Id,
			Address:     oldDao.Address,
			Name:        oldDao.Name,
			AvatarUrl:   oldDao.AvatarUrl,
			Followers:   oldDao.Followers,
			Following:   oldDao.Following,
			Teams:       oldDao.Teams,
			Location:    oldDao.Location,
			Website:     oldDao.Website,
			Verified:    oldDao.Verified,
			Description: oldDao.Description,
			CreatedAt:   oldDao.CreatedAt,
			UpdatedAt:   oldDao.UpdatedAt,
			PinnedRepos: oldDao.PinnedRepos,

			GroupId: res.GroupId,
			Config:  types.DaoConfig{},
		}

		SetDao(ctx, storeKey, cdc, dao)

		// save the group id and dao id mapping
		AppendGroupDao(ctx, storeKey, cdc, dao.GroupId, types.GroupDao{DaoAddress: dao.Address})

	}

	return nil
}

// GetMemberKeyForDaoAddress returns Key from dao-address
func GetMemberKeyForDaoAddress(daoAddress string) string {
	return MemberKey + daoAddress + "-"
}

func GetAllDaoMember(ctx sdk.Context, storeKey storetypes.StoreKey, cdc codec.BinaryCodec, daoAddress string) (list []v3types.Member) {
	store := ctx.KVStore(storeKey)
	iterator := sdk.KVStorePrefixIterator(store, types.KeyPrefix(GetMemberKeyForDaoAddress(daoAddress)))

	defer iterator.Close()
	for ; iterator.Valid(); iterator.Next() {
		var member v3types.Member
		cdc.MustUnmarshal(iterator.Value(), &member)
		list = append(list, member)
	}

	return list
}

func SetDao(ctx sdk.Context, storeKey storetypes.StoreKey, cdc codec.BinaryCodec, dao types.Dao) {
	store := prefix.NewStore(
		ctx.KVStore(storeKey),
		types.KeyPrefix(types.DaoKey),
	)
	b := cdc.MustMarshal(&dao)
	store.Set([]byte(dao.Address), b)
}

// AppendGroupDao appends a GroupDao in the store with a new id and update the count
func AppendGroupDao(
	ctx sdk.Context,
	storeKey storetypes.StoreKey, cdc codec.BinaryCodec,
	groupId uint64,
	groupDao types.GroupDao,
) uint64 {
	// Create the GroupDao
	count := GetGroupDaoCount(ctx, storeKey)

	store := prefix.NewStore(ctx.KVStore(storeKey), types.KeyPrefix(types.GroupDaoKey))
	appendedValue := cdc.MustMarshal(&groupDao)
	store.Set(GetGroupDaoIDBytes(groupId), appendedValue)

	// Update GroupDao count
	SetGroupDaoCount(ctx, storeKey, count+1)

	return count
}

// GetGroupDaoCount get the total number of GroupDao
func GetGroupDaoCount(ctx sdk.Context, storeKey storetypes.StoreKey) uint64 {
	store := prefix.NewStore(ctx.KVStore(storeKey), types.KeyPrefix(types.GroupDaoCountKey))
	byteKey := types.KeyPrefix(types.GroupDaoCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	return binary.BigEndian.Uint64(bz)
}

// SetGroupDaoCount set the total number of GroupDao
func SetGroupDaoCount(ctx sdk.Context, storeKey storetypes.StoreKey, count uint64) {
	store := prefix.NewStore(ctx.KVStore(storeKey), types.KeyPrefix(types.GroupDaoCountKey))
	byteKey := types.KeyPrefix(types.GroupDaoCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	store.Set(byteKey, bz)
}

// GetGroupDaoIDBytes returns the byte representation of the ID
func GetGroupDaoIDBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}
