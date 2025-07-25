package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgInvokeDaoMergePullRequest{}

func NewMsgInvokeDaoMergePullRequest(admin string, repositoryId uint64, iid uint64, provider string, baseCommitSha string) *MsgInvokeDaoMergePullRequest {
	return &MsgInvokeDaoMergePullRequest{
		Admin:         admin,
		RepositoryId:  repositoryId,
		Iid:           iid,
		Provider:      provider,
		BaseCommitSha: baseCommitSha,
	}
}

func (msg *MsgInvokeDaoMergePullRequest) Route() string {
	return sdk.MsgTypeURL(msg)
}

func (msg *MsgInvokeDaoMergePullRequest) Type() string {
	return sdk.MsgTypeURL(msg)
}

func (msg *MsgInvokeDaoMergePullRequest) GetSigners() []sdk.AccAddress {
	admin, err := sdk.AccAddressFromBech32(msg.Admin)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{admin}
}

func (msg *MsgInvokeDaoMergePullRequest) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgInvokeDaoMergePullRequest) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Admin)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid admin address (%s)", err)
	}

	_, err = sdk.AccAddressFromBech32(msg.Provider)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid provider address (%s)", err)
	}

	return nil
}
