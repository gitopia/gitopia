package keeper

import (
	"context"

    "github.com/gitopia/gitopia/x/rewards/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)


func (k msgServer) CreateReward(goCtx context.Context,  msg *types.MsgCreateReward) (*types.MsgCreateRewardResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

    // Check if the value already exists
    _, isFound := k.GetRewards(
        ctx,
        msg.Recipient,
        )
    if isFound {
        return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "index already set")
    }

    var rewards = types.Rewards{
        Creator: msg.Creator,
        Recipient: msg.Recipient,
        Rewards: msg.Reward,
        
    }

   k.SetRewards(
   		ctx,
   		rewards,
   	)
	return &types.MsgCreateRewardResponse{}, nil
}

