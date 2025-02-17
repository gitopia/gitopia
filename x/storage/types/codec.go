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
	cdc.RegisterConcrete(&MsgUpdateRepositoryPackfile{}, "storage/UpdateRepositoryPackfile", nil)
	cdc.RegisterConcrete(&MsgSubmitChallengeResponse{}, "storage/SubmitChallengeResponse", nil)
	cdc.RegisterConcrete(&MsgWithdrawProviderRewards{}, "storage/WithdrawProviderRewards", nil)
}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	// this line is used by starport scaffolding # 3
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgRegisterProvider{},
		&MsgUpdateRepositoryPackfile{},
		&MsgSubmitChallengeResponse{},
		&MsgWithdrawProviderRewards{},
	)

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	Amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewProtoCodec(cdctypes.NewInterfaceRegistry())
)
