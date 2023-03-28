package keeper

import (
	"context"

    "github.com/gitopia/gitopia/x/rewards/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)


func (k msgServer) Grant(goCtx context.Context,  msg *types.MsgGrant) (*types.MsgGrantResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

    // TODO: Handling the message
    _ = ctx

	return &types.MsgGrantResponse{}, nil
}
