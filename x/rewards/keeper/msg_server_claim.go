package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/rewards/types"
)

func (k msgServer) Claim(goCtx context.Context, msg *types.MsgClaim) (*types.MsgClaimResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	toAddr, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, "bad address "+msg.Creator)
	}

	params := k.GetParams(ctx)
	if params.RewardSeries.SeriesOne.Expiry.Before(ctx.BlockTime()) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "series 1 reward pool expired")
	}

	reward, found := k.GetReward(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "reward not found for address "+msg.Creator)
	}

	if reward.Amount.IsZero() {
		return nil, sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "(%s) address not eligible for reward ", msg.Creator)
	}

	if reward.Amount.IsEqual(reward.ClaimedAmount) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "reward already claimed by address "+msg.Creator)
	}

	claimableAmount, err := k.GetTotalClaimableAmount(ctx, msg.Creator, reward.Amount)
	if err != nil {
		return nil, err
	}

	if reward.ClaimedAmount.IsEqual(claimableAmount) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "eligible reward already claimed. must complete more tasks")
	}

	// should not happen!
	if reward.ClaimedAmount.Amount.GT(claimableAmount.Amount) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrLogic, "wallet rewarded more than eligible amount")
	}

	balance := claimableAmount.Sub(reward.ClaimedAmount)
	reward.ClaimedAmount = claimableAmount
	k.SetReward(ctx, reward)

	err = k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.RewardsSeriesOneAccount, toAddr, sdk.Coins{balance})
	if err != nil {
		return nil, err
	}

	return &types.MsgClaimResponse{}, nil
}
