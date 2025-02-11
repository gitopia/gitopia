package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// Message types for the storage module
const (
	TypeMsgRegisterProvider         = "register_provider"
	TypeMsgUpdateRepositoryPackfile = "update_repository_packfile"
	TypeMsgSubmitChallengeResponse  = "submit_challenge_response"
)

var _ sdk.Msg = &MsgRegisterProvider{}

// NewMsgRegisterProvider creates a new MsgRegisterProvider instance
func NewMsgRegisterProvider(creator string, address string, stake sdk.Coin) *MsgRegisterProvider {
	return &MsgRegisterProvider{
		Creator: creator,
		Address: address,
		Stake:   stake,
	}
}

func (msg *MsgRegisterProvider) Route() string {
	return RouterKey
}

func (msg *MsgRegisterProvider) Type() string {
	return TypeMsgRegisterProvider
}

func (msg *MsgRegisterProvider) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgRegisterProvider) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgRegisterProvider) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if msg.Address == "" {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "address cannot be empty")
	}

	if msg.Stake.IsZero() {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "stake amount must be greater than 0")
	}

	return nil
}

var _ sdk.Msg = &MsgUpdateRepositoryPackfile{}

// NewMsgUpdateRepositoryPackfile creates a new MsgUpdateRepositoryPackfile instance
func NewMsgUpdateRepositoryPackfile(creator string, repositoryId uint64, name string, cid string, rootHash string) *MsgUpdateRepositoryPackfile {
	return &MsgUpdateRepositoryPackfile{
		Creator:      creator,
		RepositoryId: repositoryId,
		Name:         name,
		Cid:          cid,
		RootHash:     rootHash,
	}
}

func (msg *MsgUpdateRepositoryPackfile) Route() string {
	return RouterKey
}

func (msg *MsgUpdateRepositoryPackfile) Type() string {
	return TypeMsgUpdateRepositoryPackfile
}

func (msg *MsgUpdateRepositoryPackfile) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateRepositoryPackfile) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateRepositoryPackfile) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if msg.RepositoryId == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "repository ID cannot be 0")
	}

	if msg.Name == "" {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "name cannot be empty")
	}

	if msg.Cid == "" {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "CID cannot be empty")
	}

	if msg.RootHash == "" {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "root hash cannot be empty")
	}

	return nil
}

var _ sdk.Msg = &MsgSubmitChallengeResponse{}

func NewMsgSubmitChallengeResponse(creator string, challengeId uint64, data []byte, proof [][]byte) *MsgSubmitChallengeResponse {
	return &MsgSubmitChallengeResponse{
		Creator:     creator,
		ChallengeId: challengeId,
		Data:        data,
		Proof:       proof,
	}
}

func (msg *MsgSubmitChallengeResponse) Route() string {
	return RouterKey
}

func (msg *MsgSubmitChallengeResponse) Type() string {
	return TypeMsgSubmitChallengeResponse
}

func (msg *MsgSubmitChallengeResponse) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgSubmitChallengeResponse) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgSubmitChallengeResponse) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if msg.ChallengeId == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "challenge ID cannot be 0")
	}

	if len(msg.Data) == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "data cannot be empty")
	}

	if len(msg.Proof) == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "proof cannot be empty")
	}

	return nil
}
