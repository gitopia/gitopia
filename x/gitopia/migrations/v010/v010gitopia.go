package v010

import (
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	v012 "github.com/gitopia/gitopia/x/gitopia/migrations/v012"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func migrateUser(store sdk.KVStore, cdc codec.BinaryCodec) {

	userStore := prefix.NewStore(store, types.KeyPrefix(types.UserKey))

	userStoreIter := userStore.Iterator(nil, nil)
	defer userStoreIter.Close()

	for ; userStoreIter.Valid(); userStoreIter.Next() {

		var oldUser User
		userKey := userStoreIter.Key()
		cdc.MustUnmarshal(userStore.Get(userKey), &oldUser)

		var repositories []*v012.UserRepository
		var organizations []*v012.UserOrganization

		for _, old := range oldUser.Repositories {
			repository := v012.UserRepository{
				Name: old.Name,
				Id:   old.Id,
			}
			repositories = append(repositories, &repository)
		}

		for _, old := range oldUser.Organizations {
			organization := v012.UserOrganization{
				Name: old.Name,
				Id:   old.Id,
			}
			organizations = append(organizations, &organization)
		}

		user := v012.User{
			Creator:        oldUser.Creator,
			Id:             oldUser.Id,
			Name:           "",
			Username:       oldUser.Username,
			UsernameGithub: oldUser.UsernameGithub,
			AvatarUrl:      oldUser.AvatarUrl,
			Followers:      oldUser.Followers,
			Following:      oldUser.Following,
			Repositories:   repositories,
			Organizations:  organizations,
			StarredRepos:   oldUser.StarredRepos,
			Subscriptions:  oldUser.Subscriptions,
			Email:          oldUser.Email,
			Bio:            oldUser.Bio,
			CreatedAt:      oldUser.CreatedAt,
			UpdatedAt:      oldUser.UpdatedAt,
		}

		// Set new value on store. Key don't change.
		userStore.Set(userKey, cdc.MustMarshal(&user))
	}

}

func MigrateStore(ctx sdk.Context, storeKey storetypes.StoreKey, cdc codec.BinaryCodec) error {
	store := ctx.KVStore(storeKey)

	migrateUser(store, cdc)
	return nil
}
