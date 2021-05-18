package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterCodec(cdc *codec.LegacyAmino) {
	// this line is used by starport scaffolding # 2
	cdc.RegisterConcrete(&MsgCreateUser{}, "gitopia/CreateUser", nil)
	cdc.RegisterConcrete(&MsgUpdateUser{}, "gitopia/UpdateUser", nil)
	cdc.RegisterConcrete(&MsgDeleteUser{}, "gitopia/DeleteUser", nil)

	cdc.RegisterConcrete(&MsgSetWhois{}, "gitopia/SetWhois", nil)
	cdc.RegisterConcrete(&MsgUpdateWhois{}, "gitopia/UpdateWhois", nil)
	cdc.RegisterConcrete(&MsgDeleteWhois{}, "gitopia/DeleteWhois", nil)

}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	// this line is used by starport scaffolding # 3
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreateUser{},
		&MsgUpdateUser{},
		&MsgDeleteUser{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgSetWhois{},
		&MsgUpdateWhois{},
		&MsgDeleteWhois{},
	)

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewAminoCodec(amino)
)
