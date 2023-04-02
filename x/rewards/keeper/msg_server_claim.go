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
	if params.RewardSeries.SeriesOne.EndTime.Before(ctx.BlockTime()) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "series 1 reward pool expired")
	}

	reward, found := k.GetReward(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "reward not found for address "+msg.Creator)
	}

	if reward.Amount.IsZero() {
		return nil, sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "(%s) address not eligible for reward ", msg.Creator)
	}

	if reward.Amount.IsEqual(reward.ClaimedAmountWithoutDecay) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "reward already claimed by address "+msg.Creator)
	}

	claimableAmountWithoutDecay, err := k.GetTotalClaimableAmount(ctx, msg.Creator, reward.Amount)
	if err != nil {
		return nil, err
	}

	if reward.ClaimedAmountWithoutDecay.IsEqual(claimableAmountWithoutDecay) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "eligible reward already claimed. must complete more tasks")
	}

	balanceWithoutDecay := claimableAmountWithoutDecay.Sub(reward.ClaimedAmountWithoutDecay)
	balance, err := k.GetDecayedRewardAmount(ctx, balanceWithoutDecay)
	if err != nil {
		return nil, err
	}

	err = k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.RewardsSeriesOneAccount, toAddr, sdk.Coins{balance})
	if err != nil {
		return nil, err
	}

	reward.ClaimedAmount = reward.ClaimedAmount.Add(balance)
	reward.ClaimedAmountWithoutDecay = claimableAmountWithoutDecay
	k.SetReward(ctx, reward)

	return &types.MsgClaimResponse{}, nil
}
