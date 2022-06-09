
package keeper

import sdk "github.com/cosmos/cosmos-sdk/types"

func (k msgServer) isAuthorized(ctx sdk.Context, owner string, creator string, msg sdk.Msg) bool {
	grantee, _ := sdk.AccAddressFromBech32(creator)
	granter, _ := sdk.AccAddressFromBech32(owner)
	msgUrl := sdk.MsgTypeURL(msg)

	auth, expiry := k.authzKeeper.GetCleanAuthorization(ctx, grantee, granter, msgUrl)
	if auth == nil {
		return false
	}
	authRes, err := auth.Accept(ctx, msg)
	if err != nil {
		return false
	}
	if !authRes.Accept {
		return false
	}
	if authRes.Delete {
		k.authzKeeper.DeleteGrant(ctx, grantee, granter, msgUrl)
		return false
	}
	if authRes.Updated != nil {
		k.authzKeeper.SaveGrant(ctx, grantee, granter, authRes.Updated, expiry)
	}

	return true
}