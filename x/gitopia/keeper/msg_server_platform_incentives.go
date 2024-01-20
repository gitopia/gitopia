package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/v3/x/gitopia/types"
)

func (k msgServer) DistributePlatformIncentives(goCtx context.Context, req *types.MsgDistributePlatformIncentives) (*types.MsgDistributePlatformIncentivesResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	params := k.GetParams(ctx)

	if params.PlatformIncentives != req.Creator {
		return nil, sdkerrors.Wrapf(sdkerrors.ErrUnauthorized, "user (%v) doesn't have permission to perform this operation", req.Creator)
	}

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
