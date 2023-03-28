package keeper

import (
	"context"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/rewards/types"
	"github.com/pkg/errors"
)

func (k msgServer) GetClaimableAmount(ctx sdk.Context, addr string, totalReward sdk.Coins) (sdk.Coins, error) {
	tasks, err := k.getTasks(ctx, addr)
	if err != nil {
		return nil, err
	}

	totalClaimablePercent := int64(0)
	for _, task := range tasks {
		if task.IsComplete {
			totalClaimablePercent += (int64)(task.Weight)
			if totalClaimablePercent > 100 {
				return nil, errors.New("cannot reward more than 100 percent!")
			}
		}
	}

	// rounded
	totalClaimableAmount := totalReward.MulInt(math.NewInt(totalClaimablePercent)).QuoInt(math.NewInt(100))
	return totalClaimableAmount, nil
}

func (k msgServer) Claim(goCtx context.Context, msg *types.MsgClaim) (*types.MsgClaimResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	toAddr, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, "bad address "+msg.Creator)
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

	claimableAmount, err := k.GetClaimableAmount(ctx, msg.Creator, reward.Amount)
	if err != nil {
		return nil, err
	}

	if reward.ClaimedAmount.IsEqual(claimableAmount) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "eligible reward already claimed. must complete more tasks")
	}

	// should not happen!
	if reward.ClaimedAmount.IsAnyGT(claimableAmount) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrLogic, "wallet rewarded more than eligible amount")
	}

	balance := claimableAmount.Sub(reward.ClaimedAmount...)
	reward.ClaimedAmount = claimableAmount
	k.SetReward(ctx, reward)

	err = k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.AirdropAccountName, toAddr, balance)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrLogic, "error transfering reward")
	}

	return &types.MsgClaimResponse{}, nil
}
