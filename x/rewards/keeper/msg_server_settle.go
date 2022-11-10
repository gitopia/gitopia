package keeper

import (
	"context"

    "github.com/gitopia/gitopia/x/rewards/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)


func (k msgServer) Settle(goCtx context.Context,  msg *types.MsgSettle) (*types.MsgSettleResponse, error) {
    _ = sdk.UnwrapSDKContext(goCtx)


	return &types.MsgSettleResponse{}, nil
}
