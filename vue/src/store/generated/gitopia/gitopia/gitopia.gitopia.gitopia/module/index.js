// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgSetRepositoryBranch } from "./types/gitopia/tx";
import { MsgMultiDeleteBranch } from "./types/gitopia/tx";
import { MsgDeleteComment } from "./types/gitopia/tx";
import { MsgRenameRepository } from "./types/gitopia/tx";
import { MsgDeleteTag } from "./types/gitopia/tx";
import { MsgSetRepositoryTag } from "./types/gitopia/tx";
import { MsgUpdateWhois } from "./types/gitopia/tx";
import { MsgRemoveIssueAssignees } from "./types/gitopia/tx";
import { MsgUpdatePullRequestTitle } from "./types/gitopia/tx";
import { MsgSetDefaultBranch } from "./types/gitopia/tx";
import { MsgDeleteBranch } from "./types/gitopia/tx";
import { MsgDeleteRepositoryLabel } from "./types/gitopia/tx";
import { MsgUpdateTask } from "./types/gitopia/tx";
import { MsgCreateComment } from "./types/gitopia/tx";
import { MsgMultiDeleteTag } from "./types/gitopia/tx";
import { MsgUpdateIssueTitle } from "./types/gitopia/tx";
import { MsgUpdateRelease } from "./types/gitopia/tx";
import { MsgRemoveOrganizationMember } from "./types/gitopia/tx";
import { MsgUpdatePullRequest } from "./types/gitopia/tx";
import { MsgRemovePullRequestAssignees } from "./types/gitopia/tx";
import { MsgCreateRepository } from "./types/gitopia/tx";
import { MsgDeleteRepository } from "./types/gitopia/tx";
import { MsgToggleRepositoryForking } from "./types/gitopia/tx";
import { MsgToggleIssueState } from "./types/gitopia/tx";
import { MsgCreateOrganization } from "./types/gitopia/tx";
import { MsgMultiSetRepositoryBranch } from "./types/gitopia/tx";
import { MsgSetWhois } from "./types/gitopia/tx";
import { MsgCreateTask } from "./types/gitopia/tx";
import { MsgChangeOwner } from "./types/gitopia/tx";
import { MsgAddPullRequestLabels } from "./types/gitopia/tx";
import { MsgCreateRepositoryLabel } from "./types/gitopia/tx";
import { MsgSetPullRequestState } from "./types/gitopia/tx";
import { MsgForkRepository } from "./types/gitopia/tx";
import { MsgDeleteIssue } from "./types/gitopia/tx";
import { MsgUpdateOrganizationMember } from "./types/gitopia/tx";
import { MsgCreatePullRequest } from "./types/gitopia/tx";
import { MsgAddPullRequestReviewers } from "./types/gitopia/tx";
import { MsgUpdateRepositoryCollaborator } from "./types/gitopia/tx";
import { MsgRemoveRepositoryCollaborator } from "./types/gitopia/tx";
import { MsgCreateRelease } from "./types/gitopia/tx";
import { MsgUpdatePullRequestDescription } from "./types/gitopia/tx";
import { MsgRemovePullRequestLabels } from "./types/gitopia/tx";
import { MsgDeletePullRequest } from "./types/gitopia/tx";
import { MsgUpdateRepositoryLabel } from "./types/gitopia/tx";
import { MsgRemoveIssueLabels } from "./types/gitopia/tx";
import { MsgDeleteTask } from "./types/gitopia/tx";
import { MsgUpdateIssue } from "./types/gitopia/tx";
import { MsgAddPullRequestAssignees } from "./types/gitopia/tx";
import { MsgUpdateComment } from "./types/gitopia/tx";
import { MsgUpdateUser } from "./types/gitopia/tx";
import { MsgUpdateOrganization } from "./types/gitopia/tx";
import { MsgAddIssueLabels } from "./types/gitopia/tx";
import { MsgInvokeForkRepository } from "./types/gitopia/tx";
import { MsgForkRepositorySuccess } from "./types/gitopia/tx";
import { MsgCreateIssue } from "./types/gitopia/tx";
import { MsgDeleteRelease } from "./types/gitopia/tx";
import { MsgCreateUser } from "./types/gitopia/tx";
import { MsgAddIssueAssignees } from "./types/gitopia/tx";
import { MsgRenameOrganization } from "./types/gitopia/tx";
import { MsgMultiSetRepositoryTag } from "./types/gitopia/tx";
import { MsgUpdateIssueDescription } from "./types/gitopia/tx";
import { MsgTransferUser } from "./types/gitopia/tx";
import { MsgAuthorizeGitServer } from "./types/gitopia/tx";
import { MsgDeleteOrganization } from "./types/gitopia/tx";
import { MsgDeleteWhois } from "./types/gitopia/tx";
import { MsgDeleteUser } from "./types/gitopia/tx";
import { MsgInvokeMergePullRequest } from "./types/gitopia/tx";
import { MsgRemovePullRequestReviewers } from "./types/gitopia/tx";
const types = [
    ["/gitopia.gitopia.gitopia.MsgSetRepositoryBranch", MsgSetRepositoryBranch],
    ["/gitopia.gitopia.gitopia.MsgMultiDeleteBranch", MsgMultiDeleteBranch],
    ["/gitopia.gitopia.gitopia.MsgDeleteComment", MsgDeleteComment],
    ["/gitopia.gitopia.gitopia.MsgRenameRepository", MsgRenameRepository],
    ["/gitopia.gitopia.gitopia.MsgDeleteTag", MsgDeleteTag],
    ["/gitopia.gitopia.gitopia.MsgSetRepositoryTag", MsgSetRepositoryTag],
    ["/gitopia.gitopia.gitopia.MsgUpdateWhois", MsgUpdateWhois],
    ["/gitopia.gitopia.gitopia.MsgRemoveIssueAssignees", MsgRemoveIssueAssignees],
    ["/gitopia.gitopia.gitopia.MsgUpdatePullRequestTitle", MsgUpdatePullRequestTitle],
    ["/gitopia.gitopia.gitopia.MsgSetDefaultBranch", MsgSetDefaultBranch],
    ["/gitopia.gitopia.gitopia.MsgDeleteBranch", MsgDeleteBranch],
    ["/gitopia.gitopia.gitopia.MsgDeleteRepositoryLabel", MsgDeleteRepositoryLabel],
    ["/gitopia.gitopia.gitopia.MsgUpdateTask", MsgUpdateTask],
    ["/gitopia.gitopia.gitopia.MsgCreateComment", MsgCreateComment],
    ["/gitopia.gitopia.gitopia.MsgMultiDeleteTag", MsgMultiDeleteTag],
    ["/gitopia.gitopia.gitopia.MsgUpdateIssueTitle", MsgUpdateIssueTitle],
    ["/gitopia.gitopia.gitopia.MsgUpdateRelease", MsgUpdateRelease],
    ["/gitopia.gitopia.gitopia.MsgRemoveOrganizationMember", MsgRemoveOrganizationMember],
    ["/gitopia.gitopia.gitopia.MsgUpdatePullRequest", MsgUpdatePullRequest],
    ["/gitopia.gitopia.gitopia.MsgRemovePullRequestAssignees", MsgRemovePullRequestAssignees],
    ["/gitopia.gitopia.gitopia.MsgCreateRepository", MsgCreateRepository],
    ["/gitopia.gitopia.gitopia.MsgDeleteRepository", MsgDeleteRepository],
    ["/gitopia.gitopia.gitopia.MsgToggleRepositoryForking", MsgToggleRepositoryForking],
    ["/gitopia.gitopia.gitopia.MsgToggleIssueState", MsgToggleIssueState],
    ["/gitopia.gitopia.gitopia.MsgCreateOrganization", MsgCreateOrganization],
    ["/gitopia.gitopia.gitopia.MsgMultiSetRepositoryBranch", MsgMultiSetRepositoryBranch],
    ["/gitopia.gitopia.gitopia.MsgSetWhois", MsgSetWhois],
    ["/gitopia.gitopia.gitopia.MsgCreateTask", MsgCreateTask],
    ["/gitopia.gitopia.gitopia.MsgChangeOwner", MsgChangeOwner],
    ["/gitopia.gitopia.gitopia.MsgAddPullRequestLabels", MsgAddPullRequestLabels],
    ["/gitopia.gitopia.gitopia.MsgCreateRepositoryLabel", MsgCreateRepositoryLabel],
    ["/gitopia.gitopia.gitopia.MsgSetPullRequestState", MsgSetPullRequestState],
    ["/gitopia.gitopia.gitopia.MsgForkRepository", MsgForkRepository],
    ["/gitopia.gitopia.gitopia.MsgDeleteIssue", MsgDeleteIssue],
    ["/gitopia.gitopia.gitopia.MsgUpdateOrganizationMember", MsgUpdateOrganizationMember],
    ["/gitopia.gitopia.gitopia.MsgCreatePullRequest", MsgCreatePullRequest],
    ["/gitopia.gitopia.gitopia.MsgAddPullRequestReviewers", MsgAddPullRequestReviewers],
    ["/gitopia.gitopia.gitopia.MsgUpdateRepositoryCollaborator", MsgUpdateRepositoryCollaborator],
    ["/gitopia.gitopia.gitopia.MsgRemoveRepositoryCollaborator", MsgRemoveRepositoryCollaborator],
    ["/gitopia.gitopia.gitopia.MsgCreateRelease", MsgCreateRelease],
    ["/gitopia.gitopia.gitopia.MsgUpdatePullRequestDescription", MsgUpdatePullRequestDescription],
    ["/gitopia.gitopia.gitopia.MsgRemovePullRequestLabels", MsgRemovePullRequestLabels],
    ["/gitopia.gitopia.gitopia.MsgDeletePullRequest", MsgDeletePullRequest],
    ["/gitopia.gitopia.gitopia.MsgUpdateRepositoryLabel", MsgUpdateRepositoryLabel],
    ["/gitopia.gitopia.gitopia.MsgRemoveIssueLabels", MsgRemoveIssueLabels],
    ["/gitopia.gitopia.gitopia.MsgDeleteTask", MsgDeleteTask],
    ["/gitopia.gitopia.gitopia.MsgUpdateIssue", MsgUpdateIssue],
    ["/gitopia.gitopia.gitopia.MsgAddPullRequestAssignees", MsgAddPullRequestAssignees],
    ["/gitopia.gitopia.gitopia.MsgUpdateComment", MsgUpdateComment],
    ["/gitopia.gitopia.gitopia.MsgUpdateUser", MsgUpdateUser],
    ["/gitopia.gitopia.gitopia.MsgUpdateOrganization", MsgUpdateOrganization],
    ["/gitopia.gitopia.gitopia.MsgAddIssueLabels", MsgAddIssueLabels],
    ["/gitopia.gitopia.gitopia.MsgInvokeForkRepository", MsgInvokeForkRepository],
    ["/gitopia.gitopia.gitopia.MsgForkRepositorySuccess", MsgForkRepositorySuccess],
    ["/gitopia.gitopia.gitopia.MsgCreateIssue", MsgCreateIssue],
    ["/gitopia.gitopia.gitopia.MsgDeleteRelease", MsgDeleteRelease],
    ["/gitopia.gitopia.gitopia.MsgCreateUser", MsgCreateUser],
    ["/gitopia.gitopia.gitopia.MsgAddIssueAssignees", MsgAddIssueAssignees],
    ["/gitopia.gitopia.gitopia.MsgRenameOrganization", MsgRenameOrganization],
    ["/gitopia.gitopia.gitopia.MsgMultiSetRepositoryTag", MsgMultiSetRepositoryTag],
    ["/gitopia.gitopia.gitopia.MsgUpdateIssueDescription", MsgUpdateIssueDescription],
    ["/gitopia.gitopia.gitopia.MsgTransferUser", MsgTransferUser],
    ["/gitopia.gitopia.gitopia.MsgAuthorizeGitServer", MsgAuthorizeGitServer],
    ["/gitopia.gitopia.gitopia.MsgDeleteOrganization", MsgDeleteOrganization],
    ["/gitopia.gitopia.gitopia.MsgDeleteWhois", MsgDeleteWhois],
    ["/gitopia.gitopia.gitopia.MsgDeleteUser", MsgDeleteUser],
    ["/gitopia.gitopia.gitopia.MsgInvokeMergePullRequest", MsgInvokeMergePullRequest],
    ["/gitopia.gitopia.gitopia.MsgRemovePullRequestReviewers", MsgRemovePullRequestReviewers],
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
        msgSetRepositoryBranch: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgSetRepositoryBranch", value: MsgSetRepositoryBranch.fromPartial(data) }),
        msgMultiDeleteBranch: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgMultiDeleteBranch", value: MsgMultiDeleteBranch.fromPartial(data) }),
        msgDeleteComment: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteComment", value: MsgDeleteComment.fromPartial(data) }),
        msgRenameRepository: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRenameRepository", value: MsgRenameRepository.fromPartial(data) }),
        msgDeleteTag: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteTag", value: MsgDeleteTag.fromPartial(data) }),
        msgSetRepositoryTag: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgSetRepositoryTag", value: MsgSetRepositoryTag.fromPartial(data) }),
        msgUpdateWhois: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateWhois", value: MsgUpdateWhois.fromPartial(data) }),
        msgRemoveIssueAssignees: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRemoveIssueAssignees", value: MsgRemoveIssueAssignees.fromPartial(data) }),
        msgUpdatePullRequestTitle: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdatePullRequestTitle", value: MsgUpdatePullRequestTitle.fromPartial(data) }),
        msgSetDefaultBranch: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgSetDefaultBranch", value: MsgSetDefaultBranch.fromPartial(data) }),
        msgDeleteBranch: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteBranch", value: MsgDeleteBranch.fromPartial(data) }),
        msgDeleteRepositoryLabel: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteRepositoryLabel", value: MsgDeleteRepositoryLabel.fromPartial(data) }),
        msgUpdateTask: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateTask", value: MsgUpdateTask.fromPartial(data) }),
        msgCreateComment: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateComment", value: MsgCreateComment.fromPartial(data) }),
        msgMultiDeleteTag: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgMultiDeleteTag", value: MsgMultiDeleteTag.fromPartial(data) }),
        msgUpdateIssueTitle: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateIssueTitle", value: MsgUpdateIssueTitle.fromPartial(data) }),
        msgUpdateRelease: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateRelease", value: MsgUpdateRelease.fromPartial(data) }),
        msgRemoveOrganizationMember: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRemoveOrganizationMember", value: MsgRemoveOrganizationMember.fromPartial(data) }),
        msgUpdatePullRequest: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdatePullRequest", value: MsgUpdatePullRequest.fromPartial(data) }),
        msgRemovePullRequestAssignees: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRemovePullRequestAssignees", value: MsgRemovePullRequestAssignees.fromPartial(data) }),
        msgCreateRepository: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateRepository", value: MsgCreateRepository.fromPartial(data) }),
        msgDeleteRepository: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteRepository", value: MsgDeleteRepository.fromPartial(data) }),
        msgToggleRepositoryForking: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgToggleRepositoryForking", value: MsgToggleRepositoryForking.fromPartial(data) }),
        msgToggleIssueState: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgToggleIssueState", value: MsgToggleIssueState.fromPartial(data) }),
        msgCreateOrganization: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateOrganization", value: MsgCreateOrganization.fromPartial(data) }),
        msgMultiSetRepositoryBranch: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgMultiSetRepositoryBranch", value: MsgMultiSetRepositoryBranch.fromPartial(data) }),
        msgSetWhois: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgSetWhois", value: MsgSetWhois.fromPartial(data) }),
        msgCreateTask: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateTask", value: MsgCreateTask.fromPartial(data) }),
        msgChangeOwner: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgChangeOwner", value: MsgChangeOwner.fromPartial(data) }),
        msgAddPullRequestLabels: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgAddPullRequestLabels", value: MsgAddPullRequestLabels.fromPartial(data) }),
        msgCreateRepositoryLabel: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateRepositoryLabel", value: MsgCreateRepositoryLabel.fromPartial(data) }),
        msgSetPullRequestState: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgSetPullRequestState", value: MsgSetPullRequestState.fromPartial(data) }),
        msgForkRepository: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgForkRepository", value: MsgForkRepository.fromPartial(data) }),
        msgDeleteIssue: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteIssue", value: MsgDeleteIssue.fromPartial(data) }),
        msgUpdateOrganizationMember: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateOrganizationMember", value: MsgUpdateOrganizationMember.fromPartial(data) }),
        msgCreatePullRequest: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreatePullRequest", value: MsgCreatePullRequest.fromPartial(data) }),
        msgAddPullRequestReviewers: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgAddPullRequestReviewers", value: MsgAddPullRequestReviewers.fromPartial(data) }),
        msgUpdateRepositoryCollaborator: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateRepositoryCollaborator", value: MsgUpdateRepositoryCollaborator.fromPartial(data) }),
        msgRemoveRepositoryCollaborator: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRemoveRepositoryCollaborator", value: MsgRemoveRepositoryCollaborator.fromPartial(data) }),
        msgCreateRelease: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateRelease", value: MsgCreateRelease.fromPartial(data) }),
        msgUpdatePullRequestDescription: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdatePullRequestDescription", value: MsgUpdatePullRequestDescription.fromPartial(data) }),
        msgRemovePullRequestLabels: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRemovePullRequestLabels", value: MsgRemovePullRequestLabels.fromPartial(data) }),
        msgDeletePullRequest: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeletePullRequest", value: MsgDeletePullRequest.fromPartial(data) }),
        msgUpdateRepositoryLabel: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateRepositoryLabel", value: MsgUpdateRepositoryLabel.fromPartial(data) }),
        msgRemoveIssueLabels: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRemoveIssueLabels", value: MsgRemoveIssueLabels.fromPartial(data) }),
        msgDeleteTask: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteTask", value: MsgDeleteTask.fromPartial(data) }),
        msgUpdateIssue: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateIssue", value: MsgUpdateIssue.fromPartial(data) }),
        msgAddPullRequestAssignees: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgAddPullRequestAssignees", value: MsgAddPullRequestAssignees.fromPartial(data) }),
        msgUpdateComment: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateComment", value: MsgUpdateComment.fromPartial(data) }),
        msgUpdateUser: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateUser", value: MsgUpdateUser.fromPartial(data) }),
        msgUpdateOrganization: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateOrganization", value: MsgUpdateOrganization.fromPartial(data) }),
        msgAddIssueLabels: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgAddIssueLabels", value: MsgAddIssueLabels.fromPartial(data) }),
        msgInvokeForkRepository: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgInvokeForkRepository", value: MsgInvokeForkRepository.fromPartial(data) }),
        msgForkRepositorySuccess: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgForkRepositorySuccess", value: MsgForkRepositorySuccess.fromPartial(data) }),
        msgCreateIssue: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateIssue", value: MsgCreateIssue.fromPartial(data) }),
        msgDeleteRelease: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteRelease", value: MsgDeleteRelease.fromPartial(data) }),
        msgCreateUser: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateUser", value: MsgCreateUser.fromPartial(data) }),
        msgAddIssueAssignees: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgAddIssueAssignees", value: MsgAddIssueAssignees.fromPartial(data) }),
        msgRenameOrganization: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRenameOrganization", value: MsgRenameOrganization.fromPartial(data) }),
        msgMultiSetRepositoryTag: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgMultiSetRepositoryTag", value: MsgMultiSetRepositoryTag.fromPartial(data) }),
        msgUpdateIssueDescription: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateIssueDescription", value: MsgUpdateIssueDescription.fromPartial(data) }),
        msgTransferUser: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgTransferUser", value: MsgTransferUser.fromPartial(data) }),
        msgAuthorizeGitServer: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgAuthorizeGitServer", value: MsgAuthorizeGitServer.fromPartial(data) }),
        msgDeleteOrganization: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteOrganization", value: MsgDeleteOrganization.fromPartial(data) }),
        msgDeleteWhois: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteWhois", value: MsgDeleteWhois.fromPartial(data) }),
        msgDeleteUser: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteUser", value: MsgDeleteUser.fromPartial(data) }),
        msgInvokeMergePullRequest: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgInvokeMergePullRequest", value: MsgInvokeMergePullRequest.fromPartial(data) }),
        msgRemovePullRequestReviewers: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRemovePullRequestReviewers", value: MsgRemovePullRequestReviewers.fromPartial(data) }),
    };
};
const queryClient = async ({ addr: addr } = { addr: "http://localhost:1317" }) => {
    return new Api({ baseUrl: addr });
};
export { txClient, queryClient, };
