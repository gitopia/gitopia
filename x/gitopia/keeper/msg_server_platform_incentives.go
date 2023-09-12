package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/errors"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
	"github.com/gitopia/gitopia/v2/x/gitopia/types"
)

func (k msgServer) DistributePlatformIncentives(goCtx context.Context, req *types.MsgDistributePlatformIncentives) (*types.MsgDistributePlatformIncentivesResponse, error) {
	if k.authority != req.Authority {
		return nil, errors.Wrapf(govtypes.ErrInvalidSigner, "invalid authority; expected %s, got %s", k.authority, req.Authority)
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	for _, addr := range req.Addresses {
		recipientAddr, err := sdk.AccAddressFromBech32(addr.Address)
		if err != nil {
			return nil, err
		}

		if err := k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.PlatformAccountName, recipientAddr, sdk.Coins{addr.Amount}); err != nil {
			return nil, err
		}
	}

	return &types.MsgDistributePlatformIncentivesResponse{}, nil
}
