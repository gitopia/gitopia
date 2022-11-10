package keeper

import (
	"context"

    "github.com/gitopia/gitopia/x/rewards/types"
	sdk "github.com/cosmos/cosmos-sdk/types"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)


func (k msgServer) Settle(goCtx context.Context,  msg *types.MsgSettle) (*types.MsgSettleResponse, error) {
    ctx := sdk.UnwrapSDKContext(goCtx)

	sender, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil, sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid sender address (%s)", err)
	}
	receiver, err := sdk.AccAddressFromBech32(msg.Recipient)
	if err != nil {
		return nil, sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid receiver address (%s)", err)
	}

	rewards, found := k.GetRewards(ctx, msg.Recipient)
	if !found {
		return nil, sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "recipient (%s) not eligible", msg.Recipient)
	}

	reward, ok := rewards.RewardsByCreator[msg.Creator]
	if ! ok {
		return nil, sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "recipient (%s) not eligible for reward from (%s)", msg.Recipient, msg.Creator)
	}

	balance, err := reward.TotalAmount.SafeSub(*reward.ClaimedAmount)
	if  err != nil {
		return nil, err
	}

	if !balance.IsGTE(*msg.Amount) {
		return nil, sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "insufficient reward balance")
	}

	err = k.bankKeeper.SendCoins(ctx, sender, receiver, []sdk.Coin{*msg.Amount})
	if err != nil {
		return nil, err
	}

	balance = reward.ClaimedAmount.AddAmount(msg.Amount.Amount)
	reward.ClaimedAmount = &balance

	k.SetRewards(ctx, rewards)

	return &types.MsgSettleResponse{}, nil
}
