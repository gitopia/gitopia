package keeper

import (
	"context"

    "github.com/gitopia/gitopia/x/rewards/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)


func (k msgServer) Grant(goCtx context.Context,  msg *types.MsgGrant) (*types.MsgGrantResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

    params := k.GetParams(ctx)

	if params.EvaluatorAddress != msg.Creator {
		return nil, sdkerrors.Wrapf(sdkerrors.ErrUnauthorized, "user (%v) doesn't have permission to perform this operation", msg.Creator)
	}

	


	return &types.MsgGrantResponse{}, nil
}
