package v010

import (
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func migrateUser(store sdk.KVStore, cdc codec.BinaryCodec) {

	userStore := prefix.NewStore(store, types.KeyPrefix(types.UserKey))

	userStoreIter := userStore.Iterator(nil, nil)
	defer userStoreIter.Close()

	for ; userStoreIter.Valid(); userStoreIter.Next() {

		var user types.User
		userKey := userStoreIter.Key()
		cdc.MustUnmarshal(userStore.Get(userKey), &user)

		// user.Name = user.Creator

		// Set new value on store. Key don't change.
		userStore.Set(userKey, cdc.MustMarshal(&user))
	}

}

func MigrateStore(ctx sdk.Context, storeKey sdk.StoreKey, cdc codec.BinaryCodec) error {
	store := ctx.KVStore(storeKey)

	migrateUser(store, cdc)
	return nil
}
