package keeper

import (
	"context"

    "github.com/gitopia/gitopia/x/gitopia/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)


func (k msgServer) Exercise(goCtx context.Context,  msg *types.MsgExercise) (*types.MsgExerciseResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

    // TODO: Handling the message
    _ = ctx

	return &types.MsgExerciseResponse{}, nil
}
