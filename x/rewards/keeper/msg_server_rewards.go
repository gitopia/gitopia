package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/rewards/types"
)

func (k msgServer) CreateReward(goCtx context.Context, msg *types.MsgCreateReward) (*types.MsgCreateRewardResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	rewards, isFound := k.GetRewards(ctx, msg.Recipient)
	// wallet has rewards
	if isFound {
		// wallet has rewards from the same creator
		if _, ok := rewards.RewardsByCreator[msg.Creator]; ok {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "reward for this recipient already exists")
		} else {
			// wallet gets a new reward from the creator
			rewards.RewardsByCreator[msg.Creator] = &types.Reward{TotalAmount: msg.TotalAmount}
		}
	} else {
		// this is the first reward for the wallet
		rewards = types.Rewards{
			Recipient: msg.Recipient,
			RewardsByCreator: map[string]*types.Reward{
				msg.Creator: {
					TotalAmount: msg.TotalAmount,
				},
			},
		}
	}

	k.SetRewards(
		ctx,
		rewards,
	)
	return &types.MsgCreateRewardResponse{}, nil
}
