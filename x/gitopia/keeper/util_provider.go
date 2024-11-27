package keeper

import (
	"fmt"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/x/authz"

	"github.com/gitopia/gitopia/v5/x/gitopia/types"
)

func (k Keeper) AuthorizeProvider(
	ctx sdk.Context,
	provider string,
	user string,
	expiry *time.Time,
	providerType types.ProviderPermission) error {

	grantee, _ := sdk.AccAddressFromBech32(provider)
	granter, _ := sdk.AccAddressFromBech32(user)

	switch providerType {
	case types.ProviderPermission_GIT_SERVER:
		for _, t := range GitServerTypeUrls {
			authorization := authz.NewGenericAuthorization(t)
			err := k.authzKeeper.SaveGrant(ctx, grantee, granter, authorization, expiry)
			if err != nil {
				return sdkerrors.Wrap(sdkerrors.ErrLogic, "authz grant error")
			}
		}
	case types.ProviderPermission_STORAGE:
		for _, t := range StorageTypeUrls {
			authorization := authz.NewGenericAuthorization(t)
			err := k.authzKeeper.SaveGrant(ctx, grantee, granter, authorization, expiry)
			if err != nil {
				return sdkerrors.Wrap(sdkerrors.ErrLogic, "authz grant error")
			}
		}
	default:
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("invalid provider (%v)", providerType))
	}
	return nil
}
