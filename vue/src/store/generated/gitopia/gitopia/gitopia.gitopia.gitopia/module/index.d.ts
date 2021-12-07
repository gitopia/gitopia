import { StdFee } from "@cosmjs/launchpad";
import { OfflineSigner, EncodeObject } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgRemovePullRequestLabels } from "./types/gitopia/tx";
import { MsgDeleteWhois } from "./types/gitopia/tx";
import { MsgUpdateOrganizationMember } from "./types/gitopia/tx";
import { MsgTransferUser } from "./types/gitopia/tx";
import { MsgDeleteComment } from "./types/gitopia/tx";
import { MsgAddIssueLabels } from "./types/gitopia/tx";
import { MsgSetRepositoryBranch } from "./types/gitopia/tx";
import { MsgRemoveIssueAssignees } from "./types/gitopia/tx";
import { MsgUpdatePullRequestDescription } from "./types/gitopia/tx";
import { MsgRemovePullRequestReviewers } from "./types/gitopia/tx";
import { MsgDeleteRepositoryLabel } from "./types/gitopia/tx";
import { MsgRemovePullRequestAssignees } from "./types/gitopia/tx";
import { MsgUpdateRelease } from "./types/gitopia/tx";
import { MsgCreateOrganization } from "./types/gitopia/tx";
import { MsgUpdateIssue } from "./types/gitopia/tx";
import { MsgDeleteRepository } from "./types/gitopia/tx";
import { MsgDeleteRelease } from "./types/gitopia/tx";
import { MsgCreateComment } from "./types/gitopia/tx";
import { MsgAddPullRequestReviewers } from "./types/gitopia/tx";
import { MsgUpdatePullRequestTitle } from "./types/gitopia/tx";
import { MsgAddPullRequestAssignees } from "./types/gitopia/tx";
import { MsgDeleteTag } from "./types/gitopia/tx";
import { MsgSetDefaultBranch } from "./types/gitopia/tx";
import { MsgUpdatePullRequest } from "./types/gitopia/tx";
import { MsgUpdateRepositoryCollaborator } from "./types/gitopia/tx";
import { MsgUpdateUser } from "./types/gitopia/tx";
import { MsgDeleteUser } from "./types/gitopia/tx";
import { MsgCreateUser } from "./types/gitopia/tx";
import { MsgUpdateRepository } from "./types/gitopia/tx";
import { MsgCreateRepository } from "./types/gitopia/tx";
import { MsgForkRepository } from "./types/gitopia/tx";
import { MsgSetWhois } from "./types/gitopia/tx";
import { MsgCreateIssue } from "./types/gitopia/tx";
import { MsgAddPullRequestLabels } from "./types/gitopia/tx";
import { MsgUpdateRepositoryLabel } from "./types/gitopia/tx";
import { MsgUpdateIssueTitle } from "./types/gitopia/tx";
import { MsgUpdateIssueDescription } from "./types/gitopia/tx";
import { MsgDeletePullRequest } from "./types/gitopia/tx";
import { MsgDeleteOrganization } from "./types/gitopia/tx";
import { MsgRenameRepository } from "./types/gitopia/tx";
import { MsgSetRepositoryTag } from "./types/gitopia/tx";
import { MsgUpdateComment } from "./types/gitopia/tx";
import { MsgUpdateOrganization } from "./types/gitopia/tx";
import { MsgCreatePullRequest } from "./types/gitopia/tx";
import { MsgSetPullRequestState } from "./types/gitopia/tx";
import { MsgCreateRelease } from "./types/gitopia/tx";
import { MsgUpdateWhois } from "./types/gitopia/tx";
import { MsgChangeOwner } from "./types/gitopia/tx";
import { MsgToggleIssueState } from "./types/gitopia/tx";
import { MsgDeleteBranch } from "./types/gitopia/tx";
import { MsgRemoveIssueLabels } from "./types/gitopia/tx";
import { MsgAddIssueAssignees } from "./types/gitopia/tx";
import { MsgCreateRepositoryLabel } from "./types/gitopia/tx";
import { MsgRenameOrganization } from "./types/gitopia/tx";
import { MsgRemoveRepositoryCollaborator } from "./types/gitopia/tx";
import { MsgDeleteIssue } from "./types/gitopia/tx";
import { MsgRemoveOrganizationMember } from "./types/gitopia/tx";
export declare const MissingWalletError: Error;
interface TxClientOptions {
    addr: string;
}
interface SignAndBroadcastOptions {
    fee: StdFee;
    memo?: string;
}
declare const txClient: (wallet: OfflineSigner, { addr: addr }?: TxClientOptions) => Promise<{
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }?: SignAndBroadcastOptions) => Promise<import("@cosmjs/stargate").BroadcastTxResponse>;
    msgRemovePullRequestLabels: (data: MsgRemovePullRequestLabels) => EncodeObject;
    msgDeleteWhois: (data: MsgDeleteWhois) => EncodeObject;
    msgUpdateOrganizationMember: (data: MsgUpdateOrganizationMember) => EncodeObject;
    msgTransferUser: (data: MsgTransferUser) => EncodeObject;
    msgDeleteComment: (data: MsgDeleteComment) => EncodeObject;
    msgAddIssueLabels: (data: MsgAddIssueLabels) => EncodeObject;
    msgSetRepositoryBranch: (data: MsgSetRepositoryBranch) => EncodeObject;
    msgRemoveIssueAssignees: (data: MsgRemoveIssueAssignees) => EncodeObject;
    msgUpdatePullRequestDescription: (data: MsgUpdatePullRequestDescription) => EncodeObject;
    msgRemovePullRequestReviewers: (data: MsgRemovePullRequestReviewers) => EncodeObject;
    msgDeleteRepositoryLabel: (data: MsgDeleteRepositoryLabel) => EncodeObject;
    msgRemovePullRequestAssignees: (data: MsgRemovePullRequestAssignees) => EncodeObject;
    msgUpdateRelease: (data: MsgUpdateRelease) => EncodeObject;
    msgCreateOrganization: (data: MsgCreateOrganization) => EncodeObject;
    msgUpdateIssue: (data: MsgUpdateIssue) => EncodeObject;
    msgDeleteRepository: (data: MsgDeleteRepository) => EncodeObject;
    msgDeleteRelease: (data: MsgDeleteRelease) => EncodeObject;
    msgCreateComment: (data: MsgCreateComment) => EncodeObject;
    msgAddPullRequestReviewers: (data: MsgAddPullRequestReviewers) => EncodeObject;
    msgUpdatePullRequestTitle: (data: MsgUpdatePullRequestTitle) => EncodeObject;
    msgAddPullRequestAssignees: (data: MsgAddPullRequestAssignees) => EncodeObject;
    msgDeleteTag: (data: MsgDeleteTag) => EncodeObject;
    msgSetDefaultBranch: (data: MsgSetDefaultBranch) => EncodeObject;
    msgUpdatePullRequest: (data: MsgUpdatePullRequest) => EncodeObject;
    msgUpdateRepositoryCollaborator: (data: MsgUpdateRepositoryCollaborator) => EncodeObject;
    msgUpdateUser: (data: MsgUpdateUser) => EncodeObject;
    msgDeleteUser: (data: MsgDeleteUser) => EncodeObject;
    msgCreateUser: (data: MsgCreateUser) => EncodeObject;
    msgUpdateRepository: (data: MsgUpdateRepository) => EncodeObject;
    msgCreateRepository: (data: MsgCreateRepository) => EncodeObject;
    msgForkRepository: (data: MsgForkRepository) => EncodeObject;
    msgSetWhois: (data: MsgSetWhois) => EncodeObject;
    msgCreateIssue: (data: MsgCreateIssue) => EncodeObject;
    msgAddPullRequestLabels: (data: MsgAddPullRequestLabels) => EncodeObject;
    msgUpdateRepositoryLabel: (data: MsgUpdateRepositoryLabel) => EncodeObject;
    msgUpdateIssueTitle: (data: MsgUpdateIssueTitle) => EncodeObject;
    msgUpdateIssueDescription: (data: MsgUpdateIssueDescription) => EncodeObject;
    msgDeletePullRequest: (data: MsgDeletePullRequest) => EncodeObject;
    msgDeleteOrganization: (data: MsgDeleteOrganization) => EncodeObject;
    msgRenameRepository: (data: MsgRenameRepository) => EncodeObject;
    msgSetRepositoryTag: (data: MsgSetRepositoryTag) => EncodeObject;
    msgUpdateComment: (data: MsgUpdateComment) => EncodeObject;
    msgUpdateOrganization: (data: MsgUpdateOrganization) => EncodeObject;
    msgCreatePullRequest: (data: MsgCreatePullRequest) => EncodeObject;
    msgSetPullRequestState: (data: MsgSetPullRequestState) => EncodeObject;
    msgCreateRelease: (data: MsgCreateRelease) => EncodeObject;
    msgUpdateWhois: (data: MsgUpdateWhois) => EncodeObject;
    msgChangeOwner: (data: MsgChangeOwner) => EncodeObject;
    msgToggleIssueState: (data: MsgToggleIssueState) => EncodeObject;
    msgDeleteBranch: (data: MsgDeleteBranch) => EncodeObject;
    msgRemoveIssueLabels: (data: MsgRemoveIssueLabels) => EncodeObject;
    msgAddIssueAssignees: (data: MsgAddIssueAssignees) => EncodeObject;
    msgCreateRepositoryLabel: (data: MsgCreateRepositoryLabel) => EncodeObject;
    msgRenameOrganization: (data: MsgRenameOrganization) => EncodeObject;
    msgRemoveRepositoryCollaborator: (data: MsgRemoveRepositoryCollaborator) => EncodeObject;
    msgDeleteIssue: (data: MsgDeleteIssue) => EncodeObject;
    msgRemoveOrganizationMember: (data: MsgRemoveOrganizationMember) => EncodeObject;
}>;
interface QueryClientOptions {
    addr: string;
}
declare const queryClient: ({ addr: addr }?: QueryClientOptions) => Promise<Api<unknown>>;
export { txClient, queryClient, };
