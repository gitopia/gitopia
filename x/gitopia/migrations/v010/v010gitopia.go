package v010

import (
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func migrateUser(store sdk.KVStore, cdc codec.BinaryCodec) {

	oldStore := prefix.NewStore(store, types.KeyPrefix(types.UserKey))

	oldStoreIter := oldStore.Iterator(nil, nil)
	defer oldStoreIter.Close()

	for ; oldStoreIter.Valid(); oldStoreIter.Next() {

		var user types.User
		userKey := oldStoreIter.Key()
		cdc.MustUnmarshal(store.Get(userKey), &user)

		user.Email = "user@email.com"

		// Set new value on store. Key don't change.
		store.Set(userKey, cdc.MustMarshal(&user))
	}

}

func MigrateStore(ctx sdk.Context, storeKey sdk.StoreKey, cdc codec.BinaryCodec) error {
	store := ctx.KVStore(storeKey)

	migrateUser(store, cdc)
	return nil
}
