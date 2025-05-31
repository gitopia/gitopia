package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// Message types for the storage module
const (
	TypeMsgRegisterProvider         = "register_provider"
	TypeMsgUpdateProvider           = "update_provider"
	TypeMsgUpdateRepositoryPackfile = "update_repository_packfile"
	TypeMsgSubmitChallengeResponse  = "submit_challenge_response"
	TypeMsgWithdrawProviderRewards  = "withdraw_provider_rewards"
	TypeMsgUnregisterProvider       = "unregister_provider"
	TypeMsgCompleteUnstake          = "complete_unstake"
	TypeMsgUpdateReleaseAsset       = "update_release_asset"
	TypeMsgUpdateParams             = "update_params"
	TypeMsgMergePullRequest         = "merge_pull_request"
)

var _ sdk.Msg = &MsgRegisterProvider{}

// NewMsgRegisterProvider creates a new MsgRegisterProvider instance
func NewMsgRegisterProvider(creator string, url string, description string, stake sdk.Coin) *MsgRegisterProvider {
	return &MsgRegisterProvider{
		Creator:     creator,
		Url:         url,
		Description: description,
		Stake:       stake,
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

	if msg.Url == "" || len(msg.Url) > 140 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "url cannot be empty or longer than 140 characters")
	}

	if msg.Description == "" || len(msg.Description) > 250 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "description cannot be empty or longer than 250 characters")
	}

	if msg.Stake.IsZero() {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "stake amount must be greater than 0")
	}

	return nil
}

var _ sdk.Msg = &MsgUpdateProvider{}

func NewMsgUpdateProvider(creator string, url string, description string) *MsgUpdateProvider {
	return &MsgUpdateProvider{
		Creator:     creator,
		Url:         url,
		Description: description,
	}
}

func (msg *MsgUpdateProvider) Route() string {
	return RouterKey
}

func (msg *MsgUpdateProvider) Type() string {
	return TypeMsgUpdateProvider
}

func (msg *MsgUpdateProvider) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateProvider) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateProvider) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if msg.Url == "" || len(msg.Url) > 140 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "url cannot be empty or longer than 140 characters")
	}

	if msg.Description == "" || len(msg.Description) > 250 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "description cannot be empty or longer than 250 characters")
	}

	return nil
}

var _ sdk.Msg = &MsgUpdateRepositoryPackfile{}

// NewMsgUpdateRepositoryPackfile creates a new MsgUpdateRepositoryPackfile instance
func NewMsgUpdateRepositoryPackfile(creator string, repositoryId uint64, name string, cid string, rootHash []byte, size uint64) *MsgUpdateRepositoryPackfile {
	return &MsgUpdateRepositoryPackfile{
		Creator:      creator,
		RepositoryId: repositoryId,
		Name:         name,
		Cid:          cid,
		RootHash:     rootHash,
		Size_:        size,
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

	if msg.Name == "" {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "name cannot be empty")
	}

	if msg.Cid == "" {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "CID cannot be empty")
	}

	if len(msg.RootHash) == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "root hash cannot be empty")
	}

	if msg.Size_ == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "size cannot be 0")
	}

	return nil
}

var _ sdk.Msg = &MsgSubmitChallengeResponse{}

func NewMsgSubmitChallengeResponse(creator string, challengeId uint64, data []byte, proof *Proof) *MsgSubmitChallengeResponse {
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

	if len(msg.Data) == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "data cannot be empty")
	}

	return nil
}

var _ sdk.Msg = &MsgWithdrawProviderRewards{}

func NewMsgWithdrawProviderRewards(creator string) *MsgWithdrawProviderRewards {
	return &MsgWithdrawProviderRewards{
		Creator: creator,
	}
}

func (msg *MsgWithdrawProviderRewards) Route() string {
	return RouterKey
}

func (msg *MsgWithdrawProviderRewards) Type() string {
	return TypeMsgWithdrawProviderRewards
}

func (msg *MsgWithdrawProviderRewards) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgWithdrawProviderRewards) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgWithdrawProviderRewards) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

var _ sdk.Msg = &MsgUnregisterProvider{}

// NewMsgUnregisterProvider creates a new MsgUnregisterProvider instance
func NewMsgUnregisterProvider(creator string) *MsgUnregisterProvider {
	return &MsgUnregisterProvider{
		Creator: creator,
	}
}

func (msg *MsgUnregisterProvider) Route() string {
	return RouterKey
}

func (msg *MsgUnregisterProvider) Type() string {
	return TypeMsgUnregisterProvider
}

func (msg *MsgUnregisterProvider) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUnregisterProvider) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUnregisterProvider) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

var _ sdk.Msg = &MsgCompleteUnstake{}

// NewMsgCompleteUnstake creates a new MsgCompleteUnstake instance
func NewMsgCompleteUnstake(creator string) *MsgCompleteUnstake {
	return &MsgCompleteUnstake{
		Creator: creator,
	}
}

func (msg *MsgCompleteUnstake) Route() string {
	return RouterKey
}

func (msg *MsgCompleteUnstake) Type() string {
	return TypeMsgCompleteUnstake
}

func (msg *MsgCompleteUnstake) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCompleteUnstake) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCompleteUnstake) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

var _ sdk.Msg = &MsgUpdateReleaseAsset{}

// NewMsgUpdateReleaseAsset creates a new MsgUpdateReleaseAsset instance
func NewMsgUpdateReleaseAsset(creator string, repositoryId uint64, tag string, name string, cid string, rootHash []byte, size uint64, sha256 string) *MsgUpdateReleaseAsset {
	return &MsgUpdateReleaseAsset{
		Creator:      creator,
		RepositoryId: repositoryId,
		Tag:          tag,
		Name:         name,
		Cid:          cid,
		RootHash:     rootHash,
		Size_:        size,
		Sha256:       sha256,
	}
}

func (msg *MsgUpdateReleaseAsset) Route() string {
	return RouterKey
}

func (msg *MsgUpdateReleaseAsset) Type() string {
	return TypeMsgUpdateReleaseAsset
}

func (msg *MsgUpdateReleaseAsset) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateReleaseAsset) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateReleaseAsset) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if msg.Tag == "" {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "tag cannot be empty")
	}

	if msg.Name == "" {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "name cannot be empty")
	}

	if msg.Cid == "" {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "CID cannot be empty")
	}

	if len(msg.RootHash) == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "root hash cannot be empty")
	}

	if msg.Size_ == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "size cannot be 0")
	}

	if msg.Sha256 == "" {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "sha256 cannot be empty")
	}

	return nil
}

var _ sdk.Msg = &MsgUpdateParams{}

func NewMsgUpdateParams(authority string, params Params) *MsgUpdateParams {
	return &MsgUpdateParams{
		Authority: authority,
		Params:    params,
	}
}

func (msg *MsgUpdateParams) Route() string {
	return RouterKey
}

func (msg *MsgUpdateParams) Type() string {
	return TypeMsgUpdateParams
}

func (msg *MsgUpdateParams) GetSigners() []sdk.AccAddress {
	authority, err := sdk.AccAddressFromBech32(msg.Authority)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{authority}
}

func (msg *MsgUpdateParams) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateParams) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Authority)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid authority address (%s)", err)
	}

	if err := msg.Params.Validate(); err != nil {
		return err
	}

	return nil
}

var _ sdk.Msg = &MsgMergePullRequest{}

func NewMsgMergePullRequest(creator string, repositoryId uint64, pullRequestIid uint64, mergeCommitSha string, taskId uint64) *MsgMergePullRequest {
	return &MsgMergePullRequest{
		Creator:        creator,
		RepositoryId:   repositoryId,
		PullRequestIid: pullRequestIid,
		MergeCommitSha: mergeCommitSha,
		TaskId:         taskId,
	}
}

func (msg *MsgMergePullRequest) Route() string {
	return RouterKey
}

func (msg *MsgMergePullRequest) Type() string {
	return TypeMsgMergePullRequest
}

func (msg *MsgMergePullRequest) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgMergePullRequest) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgMergePullRequest) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if msg.MergeCommitSha == "" {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "merge commit sha cannot be empty")
	}

	return nil
}
