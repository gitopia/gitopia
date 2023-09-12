package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgDistributePlatformIncentives{}

func NewMsgDistributePlatformIncentives(authority string, addresses []MsgDistributePlatformIncentives_Address) *MsgDistributePlatformIncentives {
	return &MsgDistributePlatformIncentives{
		Authority: authority,
		Addresses: addresses,
	}
}

func (msg *MsgDistributePlatformIncentives) Route() string {
	return RouterKey
}

func (msg *MsgDistributePlatformIncentives) Type() string {
	return "DistributePlatformIncentives"
}

func (msg *MsgDistributePlatformIncentives) GetSigners() []sdk.AccAddress {
	authority, err := sdk.AccAddressFromBech32(msg.Authority)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{authority}
}

func (msg *MsgDistributePlatformIncentives) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (m *MsgDistributePlatformIncentives) ValidateBasic() error {
	if _, err := sdk.AccAddressFromBech32(m.Authority); err != nil {
		return sdkerrors.Wrap(err, "invalid authority address")
	}

	for _, addr := range m.Addresses {
		if _, err := sdk.AccAddressFromBech32(addr.Address); err != nil {
			return sdkerrors.Wrap(err, "invalid address in addresses list")
		}
	}

	return nil
}
