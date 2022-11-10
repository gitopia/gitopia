package keeper

import (
	"context"

    "github.com/gitopia/gitopia/x/rewards/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)


func (k msgServer) Settle(goCtx context.Context,  msg *types.MsgSettle) (*types.MsgSettleResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

    // TODO: Handling the message
    _ = ctx

	return &types.MsgSettleResponse{}, nil
}
