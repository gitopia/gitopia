package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	cryptocodec "github.com/cosmos/cosmos-sdk/crypto/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterCodec(cdc *codec.LegacyAmino) {
	cdc.RegisterConcrete(&MsgRevokeProviderPermission{}, "gitopia/RevokeProviderPermission", nil)
	cdc.RegisterConcrete(&MsgAuthorizeProvider{}, "gitopia/AuthorizeProvider", nil)
	// cdc.RegisterConcrete(&MsgCreateTask{}, "gitopia/CreateTask", nil)
	cdc.RegisterConcrete(&MsgUpdateTask{}, "gitopia/UpdateTask", nil)
	// cdc.RegisterConcrete(&MsgDeleteTask{}, "gitopia/DeleteTask", nil)

	cdc.RegisterConcrete(&MsgSetBranch{}, "gitopia/SetBranch", nil)
	cdc.RegisterConcrete(&MsgSetDefaultBranch{}, "gitopia/SetDefaultBranch", nil)
	cdc.RegisterConcrete(&MsgMultiSetBranch{}, "gitopia/MultiSetBranch", nil)
	cdc.RegisterConcrete(&MsgDeleteBranch{}, "gitopia/DeleteBranch", nil)
	cdc.RegisterConcrete(&MsgMultiDeleteBranch{}, "gitopia/MultiDeleteBranch", nil)

	cdc.RegisterConcrete(&MsgSetTag{}, "gitopia/SetTag", nil)
	cdc.RegisterConcrete(&MsgMultiSetTag{}, "gitopia/MultiSetTag", nil)
	cdc.RegisterConcrete(&MsgDeleteTag{}, "gitopia/DeleteTag", nil)
	cdc.RegisterConcrete(&MsgMultiDeleteTag{}, "gitopia/MultiDeleteTag", nil)

	cdc.RegisterConcrete(&MsgAddMember{}, "gitopia/AddMember", nil)
	cdc.RegisterConcrete(&MsgUpdateMemberRole{}, "gitopia/UpdateMemberRole", nil)
	cdc.RegisterConcrete(&MsgRemoveMember{}, "gitopia/RemoveMember", nil)

	cdc.RegisterConcrete(&MsgUpdateRepositoryBackupRef{}, "gitopia/UpdateRepositoryBackupRef", nil)
	cdc.RegisterConcrete(&MsgAddRepositoryBackupRef{}, "gitopia/AddRepositoryBackupRef", nil)

	cdc.RegisterConcrete(&MsgCreateBounty{}, "gitopia/CreateBounty", nil)
	cdc.RegisterConcrete(&MsgUpdateBountyExpiry{}, "gitopia/UpdateBountyExpiry", nil)
	cdc.RegisterConcrete(&MsgCloseBounty{}, "gitopia/CloseBounty", nil)
	cdc.RegisterConcrete(&MsgDeleteBounty{}, "gitopia/DeleteBounty", nil)
	cdc.RegisterConcrete(&MsgToggleForcePush{}, "gitopia/ToggleForcePush", nil)
	cdc.RegisterConcrete(&MsgExercise{}, "gitopia/Exercise", nil)
	// this line is used by starport scaffolding # 2
	cdc.RegisterConcrete(&MsgCreateRelease{}, "gitopia/CreateRelease", nil)
	cdc.RegisterConcrete(&MsgUpdateRelease{}, "gitopia/UpdateRelease", nil)
	cdc.RegisterConcrete(&MsgDeleteRelease{}, "gitopia/DeleteRelease", nil)

	cdc.RegisterConcrete(&MsgCreatePullRequest{}, "gitopia/CreatePullRequest", nil)
	cdc.RegisterConcrete(&MsgUpdatePullRequestTitle{}, "gitopia/UpdatePullRequestTitle", nil)
	cdc.RegisterConcrete(&MsgUpdatePullRequestDescription{}, "gitopia/UpdatePullRequestDescription", nil)
	cdc.RegisterConcrete(&MsgInvokeMergePullRequest{}, "gitopia/InvokeMergePullRequest", nil)
	cdc.RegisterConcrete(&MsgSetPullRequestState{}, "gitopia/SetPullRequestState", nil)
	cdc.RegisterConcrete(&MsgAddPullRequestReviewers{}, "gitopia/AddPullRequestReviewers", nil)
	cdc.RegisterConcrete(&MsgRemovePullRequestReviewers{}, "gitopia/RemovePullRequestReviewers", nil)
	cdc.RegisterConcrete(&MsgLinkPullRequestIssueByIid{}, "gitopia/LinkPullRequestIssueByIid", nil)
	cdc.RegisterConcrete(&MsgUnlinkPullRequestIssueByIid{}, "gitopia/UnlinkPullRequestIssueByIid", nil)
	cdc.RegisterConcrete(&MsgAddPullRequestAssignees{}, "gitopia/AddPullRequestAssignees", nil)
	cdc.RegisterConcrete(&MsgRemovePullRequestAssignees{}, "gitopia/RemovePullRequestAssignees", nil)
	cdc.RegisterConcrete(&MsgAddPullRequestLabels{}, "gitopia/AddPullRequestLabels", nil)
	cdc.RegisterConcrete(&MsgRemovePullRequestLabels{}, "gitopia/RemovePullRequestLabels", nil)
	cdc.RegisterConcrete(&MsgDeletePullRequest{}, "gitopia/DeletePullRequest", nil)

	cdc.RegisterConcrete(&MsgCreateDao{}, "gitopia/CreateDao", nil)
	cdc.RegisterConcrete(&MsgRenameDao{}, "gitopia/RenameDao", nil)
	cdc.RegisterConcrete(&MsgUpdateDaoDescription{}, "gitopia/UpdateDaoDescription", nil)
	cdc.RegisterConcrete(&MsgUpdateDaoWebsite{}, "gitopia/UpdateDaoWebsite", nil)
	cdc.RegisterConcrete(&MsgUpdateDaoLocation{}, "gitopia/UpdateDaoLocation", nil)
	cdc.RegisterConcrete(&MsgUpdateDaoAvatar{}, "gitopia/UpdateDaoAvatar", nil)
	cdc.RegisterConcrete(&MsgDeleteDao{}, "gitopia/DeleteDao", nil)

	cdc.RegisterConcrete(&MsgCreateComment{}, "gitopia/CreateComment", nil)
	cdc.RegisterConcrete(&MsgUpdateComment{}, "gitopia/UpdateComment", nil)
	cdc.RegisterConcrete(&MsgDeleteComment{}, "gitopia/DeleteComment", nil)
	cdc.RegisterConcrete(&MsgToggleResolveComment{}, "gitopia/ToggleResolveComment", nil)

	cdc.RegisterConcrete(&MsgCreateIssue{}, "gitopia/CreateIssue", nil)
	cdc.RegisterConcrete(&MsgUpdateIssueTitle{}, "gitopia/UpdateIssueTitle", nil)
	cdc.RegisterConcrete(&MsgUpdateIssueDescription{}, "gitopia/UpdateIssueDescription", nil)
	cdc.RegisterConcrete(&MsgToggleIssueState{}, "gitopia/ToggleIssueState", nil)
	cdc.RegisterConcrete(&MsgAddIssueAssignees{}, "gitopia/AddIssueAssignees", nil)
	cdc.RegisterConcrete(&MsgRemoveIssueAssignees{}, "gitopia/RemoveIssueAssignees", nil)
	cdc.RegisterConcrete(&MsgAddIssueLabels{}, "gitopia/AddIssueLabels", nil)
	cdc.RegisterConcrete(&MsgRemoveIssueLabels{}, "gitopia/RemoveIssueLabels", nil)
	cdc.RegisterConcrete(&MsgDeleteIssue{}, "gitopia/DeleteIssue", nil)

	cdc.RegisterConcrete(&MsgCreateRepository{}, "gitopia/CreateRepository", nil)
	cdc.RegisterConcrete(&MsgInvokeForkRepository{}, "gitopia/InvokeForkRepository", nil)
	cdc.RegisterConcrete(&MsgForkRepository{}, "gitopia/ForkRepository", nil)
	cdc.RegisterConcrete(&MsgForkRepositorySuccess{}, "gitopia/ForkRepositorySuccess", nil)
	cdc.RegisterConcrete(&MsgRenameRepository{}, "gitopia/RenameRepository", nil)
	cdc.RegisterConcrete(&MsgUpdateRepositoryDescription{}, "gitopia/UpdateRepositoryDescription", nil)
	cdc.RegisterConcrete(&MsgChangeOwner{}, "gitopia/ChangeOwner", nil)
	cdc.RegisterConcrete(&MsgUpdateRepositoryCollaborator{}, "gitopia/UpdateRepositoryCollaborator", nil)
	cdc.RegisterConcrete(&MsgRemoveRepositoryCollaborator{}, "gitopia/RemoveRepositoryCollaborator", nil)
	cdc.RegisterConcrete(&MsgCreateRepositoryLabel{}, "gitopia/CreateRepositoryLabel", nil)
	cdc.RegisterConcrete(&MsgUpdateRepositoryLabel{}, "gitopia/UpdateRepositoryLabel", nil)
	cdc.RegisterConcrete(&MsgDeleteRepositoryLabel{}, "gitopia/DeleteRepositoryLabel", nil)
	cdc.RegisterConcrete(&MsgToggleRepositoryForking{}, "gitopia/ToggleRepositoryForking", nil)
	cdc.RegisterConcrete(&MsgToggleArweaveBackup{}, "gitopia/ToggleArweaveBackup", nil)
	cdc.RegisterConcrete(&MsgDeleteRepository{}, "gitopia/DeleteRepository", nil)

	cdc.RegisterConcrete(&MsgCreateUser{}, "gitopia/CreateUser", nil)
	cdc.RegisterConcrete(&MsgUpdateUserUsername{}, "gitopia/UpdateUserUsername", nil)
	cdc.RegisterConcrete(&MsgUpdateUserName{}, "gitopia/UpdateUserName", nil)
	cdc.RegisterConcrete(&MsgUpdateUserBio{}, "gitopia/UpdateUserBio", nil)
	cdc.RegisterConcrete(&MsgUpdateUserAvatar{}, "gitopia/UpdateUserAvatar", nil)
	cdc.RegisterConcrete(&MsgDeleteUser{}, "gitopia/DeleteUser", nil)
	// cdc.RegisterConcrete(&MsgTransferUser{}, "gitopia/TransferUser", nil)

}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgAuthorizeProvider{},
		&MsgRevokeProviderPermission{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		// &MsgCreateTask{},
		&MsgUpdateTask{},
		// &MsgDeleteTask{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgSetBranch{},
		&MsgSetDefaultBranch{},
		&MsgMultiSetBranch{},
		&MsgDeleteBranch{},
		&MsgMultiDeleteBranch{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgSetTag{},
		&MsgMultiSetTag{},
		&MsgDeleteTag{},
		&MsgMultiDeleteTag{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgAddMember{},
		&MsgUpdateMemberRole{},
		&MsgRemoveMember{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgAddRepositoryBackupRef{},
		&MsgUpdateRepositoryBackupRef{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreateBounty{},
		&MsgUpdateBountyExpiry{},
		&MsgCloseBounty{},
		&MsgDeleteBounty{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgToggleForcePush{},
		&MsgExercise{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil))
	// this line is used by starport scaffolding # 3

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)

	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreateRelease{},
		&MsgUpdateRelease{},
		&MsgDeleteRelease{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreatePullRequest{},
		&MsgUpdatePullRequestTitle{},
		&MsgUpdatePullRequestDescription{},
		&MsgInvokeMergePullRequest{},
		&MsgSetPullRequestState{},
		&MsgAddPullRequestReviewers{},
		&MsgRemovePullRequestReviewers{},
		&MsgAddPullRequestAssignees{},
		&MsgRemovePullRequestAssignees{},
		&MsgLinkPullRequestIssueByIid{},
		&MsgUnlinkPullRequestIssueByIid{},
		&MsgAddPullRequestLabels{},
		&MsgRemovePullRequestLabels{},
		&MsgDeletePullRequest{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreateDao{},
		&MsgRenameDao{},
		&MsgUpdateDaoDescription{},
		&MsgUpdateDaoWebsite{},
		&MsgUpdateDaoLocation{},
		&MsgUpdateDaoAvatar{},
		&MsgDeleteDao{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreateComment{},
		&MsgUpdateComment{},
		&MsgDeleteComment{},
		&MsgToggleResolveComment{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreateIssue{},
		&MsgUpdateIssueTitle{},
		&MsgUpdateIssueDescription{},
		&MsgToggleIssueState{},
		&MsgAddIssueAssignees{},
		&MsgRemoveIssueAssignees{},
		&MsgAddIssueLabels{},
		&MsgRemoveIssueLabels{},
		&MsgDeleteIssue{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreateRepository{},
		&MsgInvokeForkRepository{},
		&MsgForkRepository{},
		&MsgForkRepositorySuccess{},
		&MsgRenameRepository{},
		&MsgUpdateRepositoryDescription{},
		&MsgChangeOwner{},
		&MsgUpdateRepositoryCollaborator{},
		&MsgRemoveRepositoryCollaborator{},
		&MsgCreateRepositoryLabel{},
		&MsgUpdateRepositoryLabel{},
		&MsgDeleteRepositoryLabel{},
		&MsgToggleRepositoryForking{},
		&MsgToggleArweaveBackup{},
		&MsgDeleteRepository{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreateUser{},
		&MsgUpdateUserUsername{},
		&MsgUpdateUserName{},
		&MsgUpdateUserBio{},
		&MsgUpdateUserAvatar{},
		&MsgDeleteUser{},
		// &MsgTransferUser{},
	)

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewAminoCodec(amino)
)

func init() {
	RegisterCodec(amino)
	cryptocodec.RegisterCrypto(amino)
	amino.Seal()
}
