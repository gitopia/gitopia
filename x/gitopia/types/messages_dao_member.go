package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func (msg MsgSubmitAddMemberProposal) Route() string { return RouterKey }

func (msg MsgSubmitAddMemberProposal) Type() string { return sdk.MsgTypeURL(&msg) }

func (msg MsgSubmitAddMemberProposal) ValidateBasic() error {
	if _, err := sdk.AccAddressFromBech32(msg.Creator); err != nil {
		return sdkerrors.ErrInvalidAddress.Wrapf("invalid creator address: %s", err)
	}

	if err := ValidateDaoId(msg.DaoId); err != nil {
		return sdkerrors.ErrInvalidRequest.Wrapf("invalid dao id (%v)", err)
	}

	if err := ValidateUserId(msg.UserId); err != nil {
		return sdkerrors.ErrInvalidRequest.Wrapf("invalid user id (%v)", err)
	}

	return nil
}

func (msg MsgSubmitAddMemberProposal) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(&msg)
	return sdk.MustSortJSON(bz)
}

func (msg MsgSubmitAddMemberProposal) GetSigners() []sdk.AccAddress {
	creator, _ := sdk.AccAddressFromBech32(msg.Creator)
	return []sdk.AccAddress{creator}
}
