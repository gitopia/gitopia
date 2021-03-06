// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgAddPullRequestAssignees } from "./types/gitopia/tx";
import { MsgUpdateDaoAvatar } from "./types/gitopia/tx";
import { MsgAddIssueAssignees } from "./types/gitopia/tx";
import { MsgUpdateUserUsername } from "./types/gitopia/tx";
import { MsgUpdatePullRequestTitle } from "./types/gitopia/tx";
import { MsgInvokeForkRepository } from "./types/gitopia/tx";
import { MsgSetPullRequestState } from "./types/gitopia/tx";
import { MsgRemoveRepositoryCollaborator } from "./types/gitopia/tx";
import { MsgCreateRepositoryLabel } from "./types/gitopia/tx";
import { MsgToggleRepositoryForking } from "./types/gitopia/tx";
import { MsgSetTag } from "./types/gitopia/tx";
import { MsgUpdateRelease } from "./types/gitopia/tx";
import { MsgDeletePullRequest } from "./types/gitopia/tx";
import { MsgCreateRepository } from "./types/gitopia/tx";
import { MsgUpdateRepositoryLabel } from "./types/gitopia/tx";
import { MsgUpdateComment } from "./types/gitopia/tx";
import { MsgUpdateUserBio } from "./types/gitopia/tx";
import { MsgUpdateMemberRole } from "./types/gitopia/tx";
import { MsgRemoveIssueAssignees } from "./types/gitopia/tx";
import { MsgMultiSetTag } from "./types/gitopia/tx";
import { MsgChangeOwner } from "./types/gitopia/tx";
import { MsgUpdateDaoLocation } from "./types/gitopia/tx";
import { MsgToggleIssueState } from "./types/gitopia/tx";
import { MsgRemoveMember } from "./types/gitopia/tx";
import { MsgCreateComment } from "./types/gitopia/tx";
import { MsgCreateRelease } from "./types/gitopia/tx";
import { MsgDeleteRelease } from "./types/gitopia/tx";
import { MsgUpdateIssueTitle } from "./types/gitopia/tx";
import { MsgCreateTask } from "./types/gitopia/tx";
import { MsgDeleteIssue } from "./types/gitopia/tx";
import { MsgCreatePullRequest } from "./types/gitopia/tx";
import { MsgMultiDeleteTag } from "./types/gitopia/tx";
import { MsgCreateUser } from "./types/gitopia/tx";
import { MsgAddPullRequestReviewers } from "./types/gitopia/tx";
import { MsgUpdateRepositoryCollaborator } from "./types/gitopia/tx";
import { MsgAddMember } from "./types/gitopia/tx";
import { MsgRemovePullRequestReviewers } from "./types/gitopia/tx";
import { MsgRenameDao } from "./types/gitopia/tx";
import { MsgDeleteDao } from "./types/gitopia/tx";
import { MsgUpdateUserAvatar } from "./types/gitopia/tx";
import { MsgToggleArweaveBackup } from "./types/gitopia/tx";
import { MsgSetBranch } from "./types/gitopia/tx";
import { MsgAuthorizeStorageProvider } from "./types/gitopia/tx";
import { MsgAuthorizeGitServer } from "./types/gitopia/tx";
import { MsgUpdateIssueDescription } from "./types/gitopia/tx";
import { MsgMultiSetBranch } from "./types/gitopia/tx";
import { MsgInvokeMergePullRequest } from "./types/gitopia/tx";
import { MsgDeleteComment } from "./types/gitopia/tx";
import { MsgAddPullRequestLabels } from "./types/gitopia/tx";
import { MsgUpdateIpfsBackupRef } from "./types/gitopia/tx";
import { MsgCreateDao } from "./types/gitopia/tx";
import { MsgRemoveIssueLabels } from "./types/gitopia/tx";
import { MsgUpdatePullRequestDescription } from "./types/gitopia/tx";
import { MsgAddArweaveBackupRef } from "./types/gitopia/tx";
import { MsgRevokeStorageProviderPermissions } from "./types/gitopia/tx";
import { MsgRemovePullRequestAssignees } from "./types/gitopia/tx";
import { MsgForkRepositorySuccess } from "./types/gitopia/tx";
import { MsgSetDefaultBranch } from "./types/gitopia/tx";
import { MsgDeleteTag } from "./types/gitopia/tx";
import { MsgCreateIssue } from "./types/gitopia/tx";
import { MsgDeleteRepositoryLabel } from "./types/gitopia/tx";
import { MsgRenameRepository } from "./types/gitopia/tx";
import { MsgMultiDeleteBranch } from "./types/gitopia/tx";
import { MsgUpdateDaoWebsite } from "./types/gitopia/tx";
import { MsgDeleteBranch } from "./types/gitopia/tx";
import { MsgRemovePullRequestLabels } from "./types/gitopia/tx";
import { MsgRevokeGitServerPermissions } from "./types/gitopia/tx";
import { MsgDeleteTask } from "./types/gitopia/tx";
import { MsgUpdateRepositoryDescription } from "./types/gitopia/tx";
import { MsgUpdateTask } from "./types/gitopia/tx";
import { MsgDeleteRepository } from "./types/gitopia/tx";
import { MsgAddIssueLabels } from "./types/gitopia/tx";
import { MsgUpdateUserName } from "./types/gitopia/tx";
import { MsgForkRepository } from "./types/gitopia/tx";
import { MsgDeleteUser } from "./types/gitopia/tx";
import { MsgUpdateDaoDescription } from "./types/gitopia/tx";
const types = [
    ["/gitopia.gitopia.gitopia.MsgAddPullRequestAssignees", MsgAddPullRequestAssignees],
    ["/gitopia.gitopia.gitopia.MsgUpdateDaoAvatar", MsgUpdateDaoAvatar],
    ["/gitopia.gitopia.gitopia.MsgAddIssueAssignees", MsgAddIssueAssignees],
    ["/gitopia.gitopia.gitopia.MsgUpdateUserUsername", MsgUpdateUserUsername],
    ["/gitopia.gitopia.gitopia.MsgUpdatePullRequestTitle", MsgUpdatePullRequestTitle],
    ["/gitopia.gitopia.gitopia.MsgInvokeForkRepository", MsgInvokeForkRepository],
    ["/gitopia.gitopia.gitopia.MsgSetPullRequestState", MsgSetPullRequestState],
    ["/gitopia.gitopia.gitopia.MsgRemoveRepositoryCollaborator", MsgRemoveRepositoryCollaborator],
    ["/gitopia.gitopia.gitopia.MsgCreateRepositoryLabel", MsgCreateRepositoryLabel],
    ["/gitopia.gitopia.gitopia.MsgToggleRepositoryForking", MsgToggleRepositoryForking],
    ["/gitopia.gitopia.gitopia.MsgSetTag", MsgSetTag],
    ["/gitopia.gitopia.gitopia.MsgUpdateRelease", MsgUpdateRelease],
    ["/gitopia.gitopia.gitopia.MsgDeletePullRequest", MsgDeletePullRequest],
    ["/gitopia.gitopia.gitopia.MsgCreateRepository", MsgCreateRepository],
    ["/gitopia.gitopia.gitopia.MsgUpdateRepositoryLabel", MsgUpdateRepositoryLabel],
    ["/gitopia.gitopia.gitopia.MsgUpdateComment", MsgUpdateComment],
    ["/gitopia.gitopia.gitopia.MsgUpdateUserBio", MsgUpdateUserBio],
    ["/gitopia.gitopia.gitopia.MsgUpdateMemberRole", MsgUpdateMemberRole],
    ["/gitopia.gitopia.gitopia.MsgRemoveIssueAssignees", MsgRemoveIssueAssignees],
    ["/gitopia.gitopia.gitopia.MsgMultiSetTag", MsgMultiSetTag],
    ["/gitopia.gitopia.gitopia.MsgChangeOwner", MsgChangeOwner],
    ["/gitopia.gitopia.gitopia.MsgUpdateDaoLocation", MsgUpdateDaoLocation],
    ["/gitopia.gitopia.gitopia.MsgToggleIssueState", MsgToggleIssueState],
    ["/gitopia.gitopia.gitopia.MsgRemoveMember", MsgRemoveMember],
    ["/gitopia.gitopia.gitopia.MsgCreateComment", MsgCreateComment],
    ["/gitopia.gitopia.gitopia.MsgCreateRelease", MsgCreateRelease],
    ["/gitopia.gitopia.gitopia.MsgDeleteRelease", MsgDeleteRelease],
    ["/gitopia.gitopia.gitopia.MsgUpdateIssueTitle", MsgUpdateIssueTitle],
    ["/gitopia.gitopia.gitopia.MsgCreateTask", MsgCreateTask],
    ["/gitopia.gitopia.gitopia.MsgDeleteIssue", MsgDeleteIssue],
    ["/gitopia.gitopia.gitopia.MsgCreatePullRequest", MsgCreatePullRequest],
    ["/gitopia.gitopia.gitopia.MsgMultiDeleteTag", MsgMultiDeleteTag],
    ["/gitopia.gitopia.gitopia.MsgCreateUser", MsgCreateUser],
    ["/gitopia.gitopia.gitopia.MsgAddPullRequestReviewers", MsgAddPullRequestReviewers],
    ["/gitopia.gitopia.gitopia.MsgUpdateRepositoryCollaborator", MsgUpdateRepositoryCollaborator],
    ["/gitopia.gitopia.gitopia.MsgAddMember", MsgAddMember],
    ["/gitopia.gitopia.gitopia.MsgRemovePullRequestReviewers", MsgRemovePullRequestReviewers],
    ["/gitopia.gitopia.gitopia.MsgRenameDao", MsgRenameDao],
    ["/gitopia.gitopia.gitopia.MsgDeleteDao", MsgDeleteDao],
    ["/gitopia.gitopia.gitopia.MsgUpdateUserAvatar", MsgUpdateUserAvatar],
    ["/gitopia.gitopia.gitopia.MsgToggleArweaveBackup", MsgToggleArweaveBackup],
    ["/gitopia.gitopia.gitopia.MsgSetBranch", MsgSetBranch],
    ["/gitopia.gitopia.gitopia.MsgAuthorizeStorageProvider", MsgAuthorizeStorageProvider],
    ["/gitopia.gitopia.gitopia.MsgAuthorizeGitServer", MsgAuthorizeGitServer],
    ["/gitopia.gitopia.gitopia.MsgUpdateIssueDescription", MsgUpdateIssueDescription],
    ["/gitopia.gitopia.gitopia.MsgMultiSetBranch", MsgMultiSetBranch],
    ["/gitopia.gitopia.gitopia.MsgInvokeMergePullRequest", MsgInvokeMergePullRequest],
    ["/gitopia.gitopia.gitopia.MsgDeleteComment", MsgDeleteComment],
    ["/gitopia.gitopia.gitopia.MsgAddPullRequestLabels", MsgAddPullRequestLabels],
    ["/gitopia.gitopia.gitopia.MsgUpdateIpfsBackupRef", MsgUpdateIpfsBackupRef],
    ["/gitopia.gitopia.gitopia.MsgCreateDao", MsgCreateDao],
    ["/gitopia.gitopia.gitopia.MsgRemoveIssueLabels", MsgRemoveIssueLabels],
    ["/gitopia.gitopia.gitopia.MsgUpdatePullRequestDescription", MsgUpdatePullRequestDescription],
    ["/gitopia.gitopia.gitopia.MsgAddArweaveBackupRef", MsgAddArweaveBackupRef],
    ["/gitopia.gitopia.gitopia.MsgRevokeStorageProviderPermissions", MsgRevokeStorageProviderPermissions],
    ["/gitopia.gitopia.gitopia.MsgRemovePullRequestAssignees", MsgRemovePullRequestAssignees],
    ["/gitopia.gitopia.gitopia.MsgForkRepositorySuccess", MsgForkRepositorySuccess],
    ["/gitopia.gitopia.gitopia.MsgSetDefaultBranch", MsgSetDefaultBranch],
    ["/gitopia.gitopia.gitopia.MsgDeleteTag", MsgDeleteTag],
    ["/gitopia.gitopia.gitopia.MsgCreateIssue", MsgCreateIssue],
    ["/gitopia.gitopia.gitopia.MsgDeleteRepositoryLabel", MsgDeleteRepositoryLabel],
    ["/gitopia.gitopia.gitopia.MsgRenameRepository", MsgRenameRepository],
    ["/gitopia.gitopia.gitopia.MsgMultiDeleteBranch", MsgMultiDeleteBranch],
    ["/gitopia.gitopia.gitopia.MsgUpdateDaoWebsite", MsgUpdateDaoWebsite],
    ["/gitopia.gitopia.gitopia.MsgDeleteBranch", MsgDeleteBranch],
    ["/gitopia.gitopia.gitopia.MsgRemovePullRequestLabels", MsgRemovePullRequestLabels],
    ["/gitopia.gitopia.gitopia.MsgRevokeGitServerPermissions", MsgRevokeGitServerPermissions],
    ["/gitopia.gitopia.gitopia.MsgDeleteTask", MsgDeleteTask],
    ["/gitopia.gitopia.gitopia.MsgUpdateRepositoryDescription", MsgUpdateRepositoryDescription],
    ["/gitopia.gitopia.gitopia.MsgUpdateTask", MsgUpdateTask],
    ["/gitopia.gitopia.gitopia.MsgDeleteRepository", MsgDeleteRepository],
    ["/gitopia.gitopia.gitopia.MsgAddIssueLabels", MsgAddIssueLabels],
    ["/gitopia.gitopia.gitopia.MsgUpdateUserName", MsgUpdateUserName],
    ["/gitopia.gitopia.gitopia.MsgForkRepository", MsgForkRepository],
    ["/gitopia.gitopia.gitopia.MsgDeleteUser", MsgDeleteUser],
    ["/gitopia.gitopia.gitopia.MsgUpdateDaoDescription", MsgUpdateDaoDescription],
];
export const MissingWalletError = new Error("wallet is required");
export const registry = new Registry(types);
const defaultFee = {
    amount: [],
    gas: "200000",
};
const txClient = async (wallet, { addr: addr } = { addr: "http://localhost:26657" }) => {
    if (!wallet)
        throw MissingWalletError;
    let client;
    if (addr) {
        client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
    }
    else {
        client = await SigningStargateClient.offline(wallet, { registry });
    }
    const { address } = (await wallet.getAccounts())[0];
    return {
        signAndBroadcast: (msgs, { fee, memo } = { fee: defaultFee, memo: "" }) => client.signAndBroadcast(address, msgs, fee, memo),
        msgAddPullRequestAssignees: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgAddPullRequestAssignees", value: MsgAddPullRequestAssignees.fromPartial(data) }),
        msgUpdateDaoAvatar: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateDaoAvatar", value: MsgUpdateDaoAvatar.fromPartial(data) }),
        msgAddIssueAssignees: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgAddIssueAssignees", value: MsgAddIssueAssignees.fromPartial(data) }),
        msgUpdateUserUsername: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateUserUsername", value: MsgUpdateUserUsername.fromPartial(data) }),
        msgUpdatePullRequestTitle: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdatePullRequestTitle", value: MsgUpdatePullRequestTitle.fromPartial(data) }),
        msgInvokeForkRepository: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgInvokeForkRepository", value: MsgInvokeForkRepository.fromPartial(data) }),
        msgSetPullRequestState: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgSetPullRequestState", value: MsgSetPullRequestState.fromPartial(data) }),
        msgRemoveRepositoryCollaborator: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRemoveRepositoryCollaborator", value: MsgRemoveRepositoryCollaborator.fromPartial(data) }),
        msgCreateRepositoryLabel: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateRepositoryLabel", value: MsgCreateRepositoryLabel.fromPartial(data) }),
        msgToggleRepositoryForking: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgToggleRepositoryForking", value: MsgToggleRepositoryForking.fromPartial(data) }),
        msgSetTag: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgSetTag", value: MsgSetTag.fromPartial(data) }),
        msgUpdateRelease: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateRelease", value: MsgUpdateRelease.fromPartial(data) }),
        msgDeletePullRequest: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeletePullRequest", value: MsgDeletePullRequest.fromPartial(data) }),
        msgCreateRepository: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateRepository", value: MsgCreateRepository.fromPartial(data) }),
        msgUpdateRepositoryLabel: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateRepositoryLabel", value: MsgUpdateRepositoryLabel.fromPartial(data) }),
        msgUpdateComment: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateComment", value: MsgUpdateComment.fromPartial(data) }),
        msgUpdateUserBio: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateUserBio", value: MsgUpdateUserBio.fromPartial(data) }),
        msgUpdateMemberRole: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateMemberRole", value: MsgUpdateMemberRole.fromPartial(data) }),
        msgRemoveIssueAssignees: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRemoveIssueAssignees", value: MsgRemoveIssueAssignees.fromPartial(data) }),
        msgMultiSetTag: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgMultiSetTag", value: MsgMultiSetTag.fromPartial(data) }),
        msgChangeOwner: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgChangeOwner", value: MsgChangeOwner.fromPartial(data) }),
        msgUpdateDaoLocation: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateDaoLocation", value: MsgUpdateDaoLocation.fromPartial(data) }),
        msgToggleIssueState: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgToggleIssueState", value: MsgToggleIssueState.fromPartial(data) }),
        msgRemoveMember: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRemoveMember", value: MsgRemoveMember.fromPartial(data) }),
        msgCreateComment: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateComment", value: MsgCreateComment.fromPartial(data) }),
        msgCreateRelease: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateRelease", value: MsgCreateRelease.fromPartial(data) }),
        msgDeleteRelease: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteRelease", value: MsgDeleteRelease.fromPartial(data) }),
        msgUpdateIssueTitle: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateIssueTitle", value: MsgUpdateIssueTitle.fromPartial(data) }),
        msgCreateTask: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateTask", value: MsgCreateTask.fromPartial(data) }),
        msgDeleteIssue: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteIssue", value: MsgDeleteIssue.fromPartial(data) }),
        msgCreatePullRequest: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreatePullRequest", value: MsgCreatePullRequest.fromPartial(data) }),
        msgMultiDeleteTag: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgMultiDeleteTag", value: MsgMultiDeleteTag.fromPartial(data) }),
        msgCreateUser: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateUser", value: MsgCreateUser.fromPartial(data) }),
        msgAddPullRequestReviewers: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgAddPullRequestReviewers", value: MsgAddPullRequestReviewers.fromPartial(data) }),
        msgUpdateRepositoryCollaborator: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateRepositoryCollaborator", value: MsgUpdateRepositoryCollaborator.fromPartial(data) }),
        msgAddMember: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgAddMember", value: MsgAddMember.fromPartial(data) }),
        msgRemovePullRequestReviewers: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRemovePullRequestReviewers", value: MsgRemovePullRequestReviewers.fromPartial(data) }),
        msgRenameDao: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRenameDao", value: MsgRenameDao.fromPartial(data) }),
        msgDeleteDao: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteDao", value: MsgDeleteDao.fromPartial(data) }),
        msgUpdateUserAvatar: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateUserAvatar", value: MsgUpdateUserAvatar.fromPartial(data) }),
        msgToggleArweaveBackup: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgToggleArweaveBackup", value: MsgToggleArweaveBackup.fromPartial(data) }),
        msgSetBranch: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgSetBranch", value: MsgSetBranch.fromPartial(data) }),
        msgAuthorizeStorageProvider: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgAuthorizeStorageProvider", value: MsgAuthorizeStorageProvider.fromPartial(data) }),
        msgAuthorizeGitServer: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgAuthorizeGitServer", value: MsgAuthorizeGitServer.fromPartial(data) }),
        msgUpdateIssueDescription: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateIssueDescription", value: MsgUpdateIssueDescription.fromPartial(data) }),
        msgMultiSetBranch: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgMultiSetBranch", value: MsgMultiSetBranch.fromPartial(data) }),
        msgInvokeMergePullRequest: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgInvokeMergePullRequest", value: MsgInvokeMergePullRequest.fromPartial(data) }),
        msgDeleteComment: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteComment", value: MsgDeleteComment.fromPartial(data) }),
        msgAddPullRequestLabels: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgAddPullRequestLabels", value: MsgAddPullRequestLabels.fromPartial(data) }),
        msgUpdateIpfsBackupRef: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateIpfsBackupRef", value: MsgUpdateIpfsBackupRef.fromPartial(data) }),
        msgCreateDao: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateDao", value: MsgCreateDao.fromPartial(data) }),
        msgRemoveIssueLabels: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRemoveIssueLabels", value: MsgRemoveIssueLabels.fromPartial(data) }),
        msgUpdatePullRequestDescription: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdatePullRequestDescription", value: MsgUpdatePullRequestDescription.fromPartial(data) }),
        msgAddArweaveBackupRef: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgAddArweaveBackupRef", value: MsgAddArweaveBackupRef.fromPartial(data) }),
        msgRevokeStorageProviderPermissions: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRevokeStorageProviderPermissions", value: MsgRevokeStorageProviderPermissions.fromPartial(data) }),
        msgRemovePullRequestAssignees: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRemovePullRequestAssignees", value: MsgRemovePullRequestAssignees.fromPartial(data) }),
        msgForkRepositorySuccess: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgForkRepositorySuccess", value: MsgForkRepositorySuccess.fromPartial(data) }),
        msgSetDefaultBranch: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgSetDefaultBranch", value: MsgSetDefaultBranch.fromPartial(data) }),
        msgDeleteTag: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteTag", value: MsgDeleteTag.fromPartial(data) }),
        msgCreateIssue: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateIssue", value: MsgCreateIssue.fromPartial(data) }),
        msgDeleteRepositoryLabel: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteRepositoryLabel", value: MsgDeleteRepositoryLabel.fromPartial(data) }),
        msgRenameRepository: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRenameRepository", value: MsgRenameRepository.fromPartial(data) }),
        msgMultiDeleteBranch: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgMultiDeleteBranch", value: MsgMultiDeleteBranch.fromPartial(data) }),
        msgUpdateDaoWebsite: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateDaoWebsite", value: MsgUpdateDaoWebsite.fromPartial(data) }),
        msgDeleteBranch: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteBranch", value: MsgDeleteBranch.fromPartial(data) }),
        msgRemovePullRequestLabels: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRemovePullRequestLabels", value: MsgRemovePullRequestLabels.fromPartial(data) }),
        msgRevokeGitServerPermissions: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRevokeGitServerPermissions", value: MsgRevokeGitServerPermissions.fromPartial(data) }),
        msgDeleteTask: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteTask", value: MsgDeleteTask.fromPartial(data) }),
        msgUpdateRepositoryDescription: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateRepositoryDescription", value: MsgUpdateRepositoryDescription.fromPartial(data) }),
        msgUpdateTask: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateTask", value: MsgUpdateTask.fromPartial(data) }),
        msgDeleteRepository: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteRepository", value: MsgDeleteRepository.fromPartial(data) }),
        msgAddIssueLabels: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgAddIssueLabels", value: MsgAddIssueLabels.fromPartial(data) }),
        msgUpdateUserName: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateUserName", value: MsgUpdateUserName.fromPartial(data) }),
        msgForkRepository: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgForkRepository", value: MsgForkRepository.fromPartial(data) }),
        msgDeleteUser: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteUser", value: MsgDeleteUser.fromPartial(data) }),
        msgUpdateDaoDescription: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateDaoDescription", value: MsgUpdateDaoDescription.fromPartial(data) }),
    };
};
const queryClient = async ({ addr: addr } = { addr: "http://localhost:1317" }) => {
    return new Api({ baseUrl: addr });
};
export { txClient, queryClient, };
