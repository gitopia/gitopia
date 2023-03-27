package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/rewards/types"
)

func (k msgServer) Claim(goCtx context.Context, msg *types.MsgClaim) (*types.MsgClaimResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)


	fromAddr, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, "bad address "+msg.Creator)
	}

	toAddr, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, "bad address "+msg.Creator)
	}

	err = k.bankKeeper.SendCoins(ctx, fromAddr, toAddr, sdk.Coins{})
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrLogic, "error transfering reward")
	}

	return &types.MsgClaimResponse{}, nil
}
