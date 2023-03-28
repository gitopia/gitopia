package keeper

import (
	"context"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/rewards/types"
	"github.com/pkg/errors"
)

func (k msgServer) GetClaimableReward(ctx sdk.Context, addr string, totalReward sdk.Coins) (sdk.Coins, error) {
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

	// if reward.TotalAmount == reward.ClaimedAmount {
	// 	return http.StatusBadRequest, errors.New("reward already claimed")
	// }

	claimableReward, err := k.GetClaimableReward(ctx, msg.Creator, reward.Amount)
	if err != nil {
		return nil, err
	}

	err = k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.AirdropAccountName, toAddr, claimableReward)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrLogic, "error transfering reward")
	}

	return &types.MsgClaimResponse{}, nil
}
