package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterCodec(cdc *codec.LegacyAmino) {
	// this line is used by starport scaffolding # 2
	cdc.RegisterConcrete(&MsgCreatePullRequest{}, "gitopia/CreatePullRequest", nil)
	cdc.RegisterConcrete(&MsgUpdatePullRequest{}, "gitopia/UpdatePullRequest", nil)
	cdc.RegisterConcrete(&MsgDeletePullRequest{}, "gitopia/DeletePullRequest", nil)

	cdc.RegisterConcrete(&MsgCreateOrganization{}, "gitopia/CreateOrganization", nil)
	cdc.RegisterConcrete(&MsgUpdateOrganizationMember{}, "gitopia/UpdateOrganizationMember", nil)
	cdc.RegisterConcrete(&MsgUpdateOrganization{}, "gitopia/UpdateOrganization", nil)
	cdc.RegisterConcrete(&MsgDeleteOrganization{}, "gitopia/DeleteOrganization", nil)

	cdc.RegisterConcrete(&MsgCreateComment{}, "gitopia/CreateComment", nil)
	cdc.RegisterConcrete(&MsgUpdateComment{}, "gitopia/UpdateComment", nil)
	cdc.RegisterConcrete(&MsgDeleteComment{}, "gitopia/DeleteComment", nil)

	cdc.RegisterConcrete(&MsgCreateIssue{}, "gitopia/CreateIssue", nil)
	cdc.RegisterConcrete(&MsgUpdateIssue{}, "gitopia/UpdateIssue", nil)
	cdc.RegisterConcrete(&MsgUpdateIssueTitle{}, "gitopia/UpdateIssueTitle", nil)
	cdc.RegisterConcrete(&MsgUpdateIssueDescription{}, "gitopia/UpdateIssueDescription", nil)
	cdc.RegisterConcrete(&MsgToggleIssueState{}, "gitopia/ToggleIssueState", nil)
	cdc.RegisterConcrete(&MsgDeleteIssue{}, "gitopia/DeleteIssue", nil)

	cdc.RegisterConcrete(&MsgCreateRepository{}, "gitopia/CreateRepository", nil)
	cdc.RegisterConcrete(&MsgForkRepository{}, "gitopia/ForkRepository", nil)
	cdc.RegisterConcrete(&MsgRenameRepository{}, "gitopia/RenameRepository", nil)
	cdc.RegisterConcrete(&MsgChangeOwner{}, "gitopia/ChangeOwner", nil)
	cdc.RegisterConcrete(&MsgUpdateRepositoryCollaborator{}, "gitopia/UpdateRepositoryCollaborator", nil)
	cdc.RegisterConcrete(&MsgRemoveRepositoryCollaborator{}, "gitopia/RemoveRepositoryCollaborator", nil)
	cdc.RegisterConcrete(&MsgCreateBranch{}, "gitopia/CreateBranch", nil)
	cdc.RegisterConcrete(&MsgSetDefaultBranch{}, "gitopia/SetDefaultBranch", nil)
	cdc.RegisterConcrete(&MsgDeleteBranch{}, "gitopia/DeleteBranch", nil)
	cdc.RegisterConcrete(&MsgUpdateRepository{}, "gitopia/UpdateRepository", nil)
	cdc.RegisterConcrete(&MsgDeleteRepository{}, "gitopia/DeleteRepository", nil)

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
		&MsgCreatePullRequest{},
		&MsgUpdatePullRequest{},
		&MsgDeletePullRequest{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreateOrganization{},
		&MsgUpdateOrganizationMember{},
		&MsgUpdateOrganization{},
		&MsgDeleteOrganization{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreateComment{},
		&MsgUpdateComment{},
		&MsgDeleteComment{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreateIssue{},
		&MsgUpdateIssue{},
		&MsgUpdateIssueTitle{},
		&MsgUpdateIssueDescription{},
		&MsgToggleIssueState{},
		&MsgDeleteIssue{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreateRepository{},
		&MsgForkRepository{},
		&MsgRenameRepository{},
		&MsgChangeOwner{},
		&MsgUpdateRepositoryCollaborator{},
		&MsgRemoveRepositoryCollaborator{},
		&MsgCreateBranch{},
		&MsgSetDefaultBranch{},
		&MsgDeleteBranch{},
		&MsgUpdateRepository{},
		&MsgDeleteRepository{},
	)
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
	ModuleCdc = codec.NewProtoCodec(cdctypes.NewInterfaceRegistry())
)
