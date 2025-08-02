package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"

	// this line is used by starport scaffolding # 1
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterCodec(cdc *codec.LegacyAmino) {
	// this line is used by starport scaffolding # 2
	cdc.RegisterConcrete(&MsgRegisterProvider{}, "storage/RegisterProvider", nil)
	cdc.RegisterConcrete(&MsgUpdateProvider{}, "storage/UpdateProvider", nil)
	cdc.RegisterConcrete(&MsgUpdateParams{}, "storage/UpdateParams", nil)
	cdc.RegisterConcrete(&MsgClawbackProviderStake{}, "storage/ClawbackProviderStake", nil)
	cdc.RegisterConcrete(&MsgUpdateRepositoryPackfile{}, "storage/UpdateRepositoryPackfile", nil)
	cdc.RegisterConcrete(&MsgDeleteRepositoryPackfile{}, "storage/DeleteRepositoryPackfile", nil)
	cdc.RegisterConcrete(&MsgSubmitChallengeResponse{}, "storage/SubmitChallengeResponse", nil)
	cdc.RegisterConcrete(&MsgWithdrawProviderRewards{}, "storage/WithdrawProviderRewards", nil)
	cdc.RegisterConcrete(&MsgUnregisterProvider{}, "storage/UnregisterProvider", nil)
	cdc.RegisterConcrete(&MsgCompleteUnstake{}, "storage/CompleteUnstake", nil)
	cdc.RegisterConcrete(&MsgUpdateReleaseAsset{}, "storage/UpdateReleaseAsset", nil)
	cdc.RegisterConcrete(&MsgDeleteReleaseAsset{}, "storage/DeleteReleaseAsset", nil)
	cdc.RegisterConcrete(&MsgUpdateLFSObject{}, "storage/UpdateLFSObject", nil)
	cdc.RegisterConcrete(&MsgDeleteLFSObject{}, "storage/DeleteLFSObject", nil)
	cdc.RegisterConcrete(&MsgIncreaseStake{}, "storage/IncreaseStake", nil)
	cdc.RegisterConcrete(&MsgDecreaseStake{}, "storage/DecreaseStake", nil)
	cdc.RegisterConcrete(&MsgCompleteDecreaseStake{}, "storage/CompleteDecreaseStake", nil)
	cdc.RegisterConcrete(&MsgUnjailProvider{}, "storage/UnjailProvider", nil)
	cdc.RegisterConcrete(&MsgProposeRepositoryPackfileUpdate{}, "storage/ProposeRepositoryPackfileUpdate", nil)
	cdc.RegisterConcrete(&MsgApproveRepositoryPackfileUpdate{}, "storage/ApproveRepositoryPackfileUpdate", nil)
	cdc.RegisterConcrete(&MsgRejectRepositoryPackfileUpdate{}, "storage/RejectRepositoryPackfileUpdate", nil)
	cdc.RegisterConcrete(&MsgProposeReleaseAssetsUpdate{}, "storage/ProposeReleaseAssetsUpdate", nil)
	cdc.RegisterConcrete(&MsgApproveReleaseAssetsUpdate{}, "storage/ApproveReleaseAssetsUpdate", nil)
	cdc.RegisterConcrete(&MsgRejectReleaseAssetsUpdate{}, "storage/RejectReleaseAssetsUpdate", nil)
	cdc.RegisterConcrete(&MsgProposeLFSObjectUpdate{}, "storage/ProposeLFSObjectUpdate", nil)
	cdc.RegisterConcrete(&MsgApproveLFSObjectUpdate{}, "storage/ApproveLFSObjectUpdate", nil)
	cdc.RegisterConcrete(&MsgRejectLFSObjectUpdate{}, "storage/RejectLFSObjectUpdate", nil)
}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	// this line is used by starport scaffolding # 3
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgRegisterProvider{},
		&MsgUpdateProvider{},
		&MsgUpdateParams{},
		&MsgClawbackProviderStake{},
		&MsgUpdateRepositoryPackfile{},
		&MsgDeleteRepositoryPackfile{},
		&MsgSubmitChallengeResponse{},
		&MsgWithdrawProviderRewards{},
		&MsgUnregisterProvider{},
		&MsgCompleteUnstake{},
		&MsgUpdateReleaseAsset{},
		&MsgDeleteReleaseAsset{},
		&MsgUpdateLFSObject{},
		&MsgDeleteLFSObject{},
		&MsgIncreaseStake{},
		&MsgDecreaseStake{},
		&MsgCompleteDecreaseStake{},
		&MsgUnjailProvider{},
		&MsgProposeRepositoryPackfileUpdate{},
		&MsgApproveRepositoryPackfileUpdate{},
		&MsgRejectRepositoryPackfileUpdate{},
		&MsgProposeReleaseAssetsUpdate{},
		&MsgApproveReleaseAssetsUpdate{},
		&MsgRejectReleaseAssetsUpdate{},
		&MsgProposeLFSObjectUpdate{},
		&MsgApproveLFSObjectUpdate{},
		&MsgRejectLFSObjectUpdate{},
	)

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	Amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewProtoCodec(cdctypes.NewInterfaceRegistry())
)
