// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry, OfflineSigner, EncodeObject, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgUpdateWhois } from "./types/gitopia/tx";
import { MsgCreateRepositoryLabel } from "./types/gitopia/tx";
import { MsgDeleteTask } from "./types/gitopia/tx";
import { MsgDeleteIssue } from "./types/gitopia/tx";
import { MsgRemovePullRequestLabels } from "./types/gitopia/tx";
import { MsgRemoveIssueLabels } from "./types/gitopia/tx";
import { MsgRemoveOrganizationMember } from "./types/gitopia/tx";
import { MsgAddPullRequestLabels } from "./types/gitopia/tx";
import { MsgRemoveIssueAssignees } from "./types/gitopia/tx";
import { MsgDeleteTag } from "./types/gitopia/tx";
import { MsgUpdateIssue } from "./types/gitopia/tx";
import { MsgUpdatePullRequestDescription } from "./types/gitopia/tx";
import { MsgRenameRepository } from "./types/gitopia/tx";
import { MsgDeleteUser } from "./types/gitopia/tx";
import { MsgMultiSetRepositoryBranch } from "./types/gitopia/tx";
import { MsgDeleteRepository } from "./types/gitopia/tx";
import { MsgUpdateOrganization } from "./types/gitopia/tx";
import { MsgToggleRepositoryForking } from "./types/gitopia/tx";
import { MsgTransferUser } from "./types/gitopia/tx";
import { MsgCreateOrganization } from "./types/gitopia/tx";
import { MsgRemovePullRequestAssignees } from "./types/gitopia/tx";
import { MsgInvokeMergePullRequest } from "./types/gitopia/tx";
import { MsgSetRepositoryTag } from "./types/gitopia/tx";
import { MsgDeleteOrganization } from "./types/gitopia/tx";
import { MsgSetDefaultBranch } from "./types/gitopia/tx";
import { MsgUpdateComment } from "./types/gitopia/tx";
import { MsgDeleteWhois } from "./types/gitopia/tx";
import { MsgForkRepository } from "./types/gitopia/tx";
import { MsgCreateTask } from "./types/gitopia/tx";
import { MsgSetPullRequestState } from "./types/gitopia/tx";
import { MsgMultiDeleteTag } from "./types/gitopia/tx";
import { MsgDeleteBranch } from "./types/gitopia/tx";
import { MsgCreatePullRequest } from "./types/gitopia/tx";
import { MsgCreateComment } from "./types/gitopia/tx";
import { MsgCreateIssue } from "./types/gitopia/tx";
import { MsgAddPullRequestAssignees } from "./types/gitopia/tx";
import { MsgUpdateRepositoryLabel } from "./types/gitopia/tx";
import { MsgDeleteComment } from "./types/gitopia/tx";
import { MsgUpdateUser } from "./types/gitopia/tx";
import { MsgUpdatePullRequest } from "./types/gitopia/tx";
import { MsgCreateRelease } from "./types/gitopia/tx";
import { MsgUpdateTask } from "./types/gitopia/tx";
import { MsgInvokeForkRepository } from "./types/gitopia/tx";
import { MsgUpdateRepositoryCollaborator } from "./types/gitopia/tx";
import { MsgAddIssueLabels } from "./types/gitopia/tx";
import { MsgForkRepositorySuccess } from "./types/gitopia/tx";
import { MsgToggleIssueState } from "./types/gitopia/tx";
import { MsgDeletePullRequest } from "./types/gitopia/tx";
import { MsgCreateUser } from "./types/gitopia/tx";
import { MsgUpdatePullRequestTitle } from "./types/gitopia/tx";
import { MsgDeleteRelease } from "./types/gitopia/tx";
import { MsgCreateRepository } from "./types/gitopia/tx";
import { MsgMultiSetRepositoryTag } from "./types/gitopia/tx";
import { MsgRenameOrganization } from "./types/gitopia/tx";
import { MsgMultiDeleteBranch } from "./types/gitopia/tx";
import { MsgAddPullRequestReviewers } from "./types/gitopia/tx";
import { MsgDeleteRepositoryLabel } from "./types/gitopia/tx";
import { MsgAddIssueAssignees } from "./types/gitopia/tx";
import { MsgUpdateIssueDescription } from "./types/gitopia/tx";
import { MsgRemovePullRequestReviewers } from "./types/gitopia/tx";
import { MsgRemoveRepositoryCollaborator } from "./types/gitopia/tx";
import { MsgAuthorizeGitServer } from "./types/gitopia/tx";
import { MsgUpdateIssueTitle } from "./types/gitopia/tx";
import { MsgChangeOwner } from "./types/gitopia/tx";
import { MsgSetWhois } from "./types/gitopia/tx";
import { MsgUpdateRelease } from "./types/gitopia/tx";
import { MsgSetRepositoryBranch } from "./types/gitopia/tx";
import { MsgUpdateOrganizationMember } from "./types/gitopia/tx";


const types = [
  ["/gitopia.gitopia.gitopia.MsgUpdateWhois", MsgUpdateWhois],
  ["/gitopia.gitopia.gitopia.MsgCreateRepositoryLabel", MsgCreateRepositoryLabel],
  ["/gitopia.gitopia.gitopia.MsgDeleteTask", MsgDeleteTask],
  ["/gitopia.gitopia.gitopia.MsgDeleteIssue", MsgDeleteIssue],
  ["/gitopia.gitopia.gitopia.MsgRemovePullRequestLabels", MsgRemovePullRequestLabels],
  ["/gitopia.gitopia.gitopia.MsgRemoveIssueLabels", MsgRemoveIssueLabels],
  ["/gitopia.gitopia.gitopia.MsgRemoveOrganizationMember", MsgRemoveOrganizationMember],
  ["/gitopia.gitopia.gitopia.MsgAddPullRequestLabels", MsgAddPullRequestLabels],
  ["/gitopia.gitopia.gitopia.MsgRemoveIssueAssignees", MsgRemoveIssueAssignees],
  ["/gitopia.gitopia.gitopia.MsgDeleteTag", MsgDeleteTag],
  ["/gitopia.gitopia.gitopia.MsgUpdateIssue", MsgUpdateIssue],
  ["/gitopia.gitopia.gitopia.MsgUpdatePullRequestDescription", MsgUpdatePullRequestDescription],
  ["/gitopia.gitopia.gitopia.MsgRenameRepository", MsgRenameRepository],
  ["/gitopia.gitopia.gitopia.MsgDeleteUser", MsgDeleteUser],
  ["/gitopia.gitopia.gitopia.MsgMultiSetRepositoryBranch", MsgMultiSetRepositoryBranch],
  ["/gitopia.gitopia.gitopia.MsgDeleteRepository", MsgDeleteRepository],
  ["/gitopia.gitopia.gitopia.MsgUpdateOrganization", MsgUpdateOrganization],
  ["/gitopia.gitopia.gitopia.MsgToggleRepositoryForking", MsgToggleRepositoryForking],
  ["/gitopia.gitopia.gitopia.MsgTransferUser", MsgTransferUser],
  ["/gitopia.gitopia.gitopia.MsgCreateOrganization", MsgCreateOrganization],
  ["/gitopia.gitopia.gitopia.MsgRemovePullRequestAssignees", MsgRemovePullRequestAssignees],
  ["/gitopia.gitopia.gitopia.MsgInvokeMergePullRequest", MsgInvokeMergePullRequest],
  ["/gitopia.gitopia.gitopia.MsgSetRepositoryTag", MsgSetRepositoryTag],
  ["/gitopia.gitopia.gitopia.MsgDeleteOrganization", MsgDeleteOrganization],
  ["/gitopia.gitopia.gitopia.MsgSetDefaultBranch", MsgSetDefaultBranch],
  ["/gitopia.gitopia.gitopia.MsgUpdateComment", MsgUpdateComment],
  ["/gitopia.gitopia.gitopia.MsgDeleteWhois", MsgDeleteWhois],
  ["/gitopia.gitopia.gitopia.MsgForkRepository", MsgForkRepository],
  ["/gitopia.gitopia.gitopia.MsgCreateTask", MsgCreateTask],
  ["/gitopia.gitopia.gitopia.MsgSetPullRequestState", MsgSetPullRequestState],
  ["/gitopia.gitopia.gitopia.MsgMultiDeleteTag", MsgMultiDeleteTag],
  ["/gitopia.gitopia.gitopia.MsgDeleteBranch", MsgDeleteBranch],
  ["/gitopia.gitopia.gitopia.MsgCreatePullRequest", MsgCreatePullRequest],
  ["/gitopia.gitopia.gitopia.MsgCreateComment", MsgCreateComment],
  ["/gitopia.gitopia.gitopia.MsgCreateIssue", MsgCreateIssue],
  ["/gitopia.gitopia.gitopia.MsgAddPullRequestAssignees", MsgAddPullRequestAssignees],
  ["/gitopia.gitopia.gitopia.MsgUpdateRepositoryLabel", MsgUpdateRepositoryLabel],
  ["/gitopia.gitopia.gitopia.MsgDeleteComment", MsgDeleteComment],
  ["/gitopia.gitopia.gitopia.MsgUpdateUser", MsgUpdateUser],
  ["/gitopia.gitopia.gitopia.MsgUpdatePullRequest", MsgUpdatePullRequest],
  ["/gitopia.gitopia.gitopia.MsgCreateRelease", MsgCreateRelease],
  ["/gitopia.gitopia.gitopia.MsgUpdateTask", MsgUpdateTask],
  ["/gitopia.gitopia.gitopia.MsgInvokeForkRepository", MsgInvokeForkRepository],
  ["/gitopia.gitopia.gitopia.MsgUpdateRepositoryCollaborator", MsgUpdateRepositoryCollaborator],
  ["/gitopia.gitopia.gitopia.MsgAddIssueLabels", MsgAddIssueLabels],
  ["/gitopia.gitopia.gitopia.MsgForkRepositorySuccess", MsgForkRepositorySuccess],
  ["/gitopia.gitopia.gitopia.MsgToggleIssueState", MsgToggleIssueState],
  ["/gitopia.gitopia.gitopia.MsgDeletePullRequest", MsgDeletePullRequest],
  ["/gitopia.gitopia.gitopia.MsgCreateUser", MsgCreateUser],
  ["/gitopia.gitopia.gitopia.MsgUpdatePullRequestTitle", MsgUpdatePullRequestTitle],
  ["/gitopia.gitopia.gitopia.MsgDeleteRelease", MsgDeleteRelease],
  ["/gitopia.gitopia.gitopia.MsgCreateRepository", MsgCreateRepository],
  ["/gitopia.gitopia.gitopia.MsgMultiSetRepositoryTag", MsgMultiSetRepositoryTag],
  ["/gitopia.gitopia.gitopia.MsgRenameOrganization", MsgRenameOrganization],
  ["/gitopia.gitopia.gitopia.MsgMultiDeleteBranch", MsgMultiDeleteBranch],
  ["/gitopia.gitopia.gitopia.MsgAddPullRequestReviewers", MsgAddPullRequestReviewers],
  ["/gitopia.gitopia.gitopia.MsgDeleteRepositoryLabel", MsgDeleteRepositoryLabel],
  ["/gitopia.gitopia.gitopia.MsgAddIssueAssignees", MsgAddIssueAssignees],
  ["/gitopia.gitopia.gitopia.MsgUpdateIssueDescription", MsgUpdateIssueDescription],
  ["/gitopia.gitopia.gitopia.MsgRemovePullRequestReviewers", MsgRemovePullRequestReviewers],
  ["/gitopia.gitopia.gitopia.MsgRemoveRepositoryCollaborator", MsgRemoveRepositoryCollaborator],
  ["/gitopia.gitopia.gitopia.MsgAuthorizeGitServer", MsgAuthorizeGitServer],
  ["/gitopia.gitopia.gitopia.MsgUpdateIssueTitle", MsgUpdateIssueTitle],
  ["/gitopia.gitopia.gitopia.MsgChangeOwner", MsgChangeOwner],
  ["/gitopia.gitopia.gitopia.MsgSetWhois", MsgSetWhois],
  ["/gitopia.gitopia.gitopia.MsgUpdateRelease", MsgUpdateRelease],
  ["/gitopia.gitopia.gitopia.MsgSetRepositoryBranch", MsgSetRepositoryBranch],
  ["/gitopia.gitopia.gitopia.MsgUpdateOrganizationMember", MsgUpdateOrganizationMember],
  
];
export const MissingWalletError = new Error("wallet is required");

export const registry = new Registry(<any>types);

const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
}

interface SignAndBroadcastOptions {
  fee: StdFee,
  memo?: string
}

const txClient = async (wallet: OfflineSigner, { addr: addr }: TxClientOptions = { addr: "http://localhost:26657" }) => {
  if (!wallet) throw MissingWalletError;
  let client;
  if (addr) {
    client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
  }else{
    client = await SigningStargateClient.offline( wallet, { registry });
  }
  const { address } = (await wallet.getAccounts())[0];

  return {
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }: SignAndBroadcastOptions = {fee: defaultFee, memo: ""}) => client.signAndBroadcast(address, msgs, fee,memo),
    msgUpdateWhois: (data: MsgUpdateWhois): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateWhois", value: MsgUpdateWhois.fromPartial( data ) }),
    msgCreateRepositoryLabel: (data: MsgCreateRepositoryLabel): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateRepositoryLabel", value: MsgCreateRepositoryLabel.fromPartial( data ) }),
    msgDeleteTask: (data: MsgDeleteTask): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteTask", value: MsgDeleteTask.fromPartial( data ) }),
    msgDeleteIssue: (data: MsgDeleteIssue): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteIssue", value: MsgDeleteIssue.fromPartial( data ) }),
    msgRemovePullRequestLabels: (data: MsgRemovePullRequestLabels): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRemovePullRequestLabels", value: MsgRemovePullRequestLabels.fromPartial( data ) }),
    msgRemoveIssueLabels: (data: MsgRemoveIssueLabels): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRemoveIssueLabels", value: MsgRemoveIssueLabels.fromPartial( data ) }),
    msgRemoveOrganizationMember: (data: MsgRemoveOrganizationMember): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRemoveOrganizationMember", value: MsgRemoveOrganizationMember.fromPartial( data ) }),
    msgAddPullRequestLabels: (data: MsgAddPullRequestLabels): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgAddPullRequestLabels", value: MsgAddPullRequestLabels.fromPartial( data ) }),
    msgRemoveIssueAssignees: (data: MsgRemoveIssueAssignees): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRemoveIssueAssignees", value: MsgRemoveIssueAssignees.fromPartial( data ) }),
    msgDeleteTag: (data: MsgDeleteTag): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteTag", value: MsgDeleteTag.fromPartial( data ) }),
    msgUpdateIssue: (data: MsgUpdateIssue): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateIssue", value: MsgUpdateIssue.fromPartial( data ) }),
    msgUpdatePullRequestDescription: (data: MsgUpdatePullRequestDescription): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdatePullRequestDescription", value: MsgUpdatePullRequestDescription.fromPartial( data ) }),
    msgRenameRepository: (data: MsgRenameRepository): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRenameRepository", value: MsgRenameRepository.fromPartial( data ) }),
    msgDeleteUser: (data: MsgDeleteUser): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteUser", value: MsgDeleteUser.fromPartial( data ) }),
    msgMultiSetRepositoryBranch: (data: MsgMultiSetRepositoryBranch): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgMultiSetRepositoryBranch", value: MsgMultiSetRepositoryBranch.fromPartial( data ) }),
    msgDeleteRepository: (data: MsgDeleteRepository): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteRepository", value: MsgDeleteRepository.fromPartial( data ) }),
    msgUpdateOrganization: (data: MsgUpdateOrganization): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateOrganization", value: MsgUpdateOrganization.fromPartial( data ) }),
    msgToggleRepositoryForking: (data: MsgToggleRepositoryForking): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgToggleRepositoryForking", value: MsgToggleRepositoryForking.fromPartial( data ) }),
    msgTransferUser: (data: MsgTransferUser): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgTransferUser", value: MsgTransferUser.fromPartial( data ) }),
    msgCreateOrganization: (data: MsgCreateOrganization): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateOrganization", value: MsgCreateOrganization.fromPartial( data ) }),
    msgRemovePullRequestAssignees: (data: MsgRemovePullRequestAssignees): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRemovePullRequestAssignees", value: MsgRemovePullRequestAssignees.fromPartial( data ) }),
    msgInvokeMergePullRequest: (data: MsgInvokeMergePullRequest): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgInvokeMergePullRequest", value: MsgInvokeMergePullRequest.fromPartial( data ) }),
    msgSetRepositoryTag: (data: MsgSetRepositoryTag): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgSetRepositoryTag", value: MsgSetRepositoryTag.fromPartial( data ) }),
    msgDeleteOrganization: (data: MsgDeleteOrganization): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteOrganization", value: MsgDeleteOrganization.fromPartial( data ) }),
    msgSetDefaultBranch: (data: MsgSetDefaultBranch): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgSetDefaultBranch", value: MsgSetDefaultBranch.fromPartial( data ) }),
    msgUpdateComment: (data: MsgUpdateComment): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateComment", value: MsgUpdateComment.fromPartial( data ) }),
    msgDeleteWhois: (data: MsgDeleteWhois): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteWhois", value: MsgDeleteWhois.fromPartial( data ) }),
    msgForkRepository: (data: MsgForkRepository): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgForkRepository", value: MsgForkRepository.fromPartial( data ) }),
    msgCreateTask: (data: MsgCreateTask): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateTask", value: MsgCreateTask.fromPartial( data ) }),
    msgSetPullRequestState: (data: MsgSetPullRequestState): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgSetPullRequestState", value: MsgSetPullRequestState.fromPartial( data ) }),
    msgMultiDeleteTag: (data: MsgMultiDeleteTag): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgMultiDeleteTag", value: MsgMultiDeleteTag.fromPartial( data ) }),
    msgDeleteBranch: (data: MsgDeleteBranch): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteBranch", value: MsgDeleteBranch.fromPartial( data ) }),
    msgCreatePullRequest: (data: MsgCreatePullRequest): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreatePullRequest", value: MsgCreatePullRequest.fromPartial( data ) }),
    msgCreateComment: (data: MsgCreateComment): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateComment", value: MsgCreateComment.fromPartial( data ) }),
    msgCreateIssue: (data: MsgCreateIssue): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateIssue", value: MsgCreateIssue.fromPartial( data ) }),
    msgAddPullRequestAssignees: (data: MsgAddPullRequestAssignees): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgAddPullRequestAssignees", value: MsgAddPullRequestAssignees.fromPartial( data ) }),
    msgUpdateRepositoryLabel: (data: MsgUpdateRepositoryLabel): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateRepositoryLabel", value: MsgUpdateRepositoryLabel.fromPartial( data ) }),
    msgDeleteComment: (data: MsgDeleteComment): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteComment", value: MsgDeleteComment.fromPartial( data ) }),
    msgUpdateUser: (data: MsgUpdateUser): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateUser", value: MsgUpdateUser.fromPartial( data ) }),
    msgUpdatePullRequest: (data: MsgUpdatePullRequest): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdatePullRequest", value: MsgUpdatePullRequest.fromPartial( data ) }),
    msgCreateRelease: (data: MsgCreateRelease): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateRelease", value: MsgCreateRelease.fromPartial( data ) }),
    msgUpdateTask: (data: MsgUpdateTask): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateTask", value: MsgUpdateTask.fromPartial( data ) }),
    msgInvokeForkRepository: (data: MsgInvokeForkRepository): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgInvokeForkRepository", value: MsgInvokeForkRepository.fromPartial( data ) }),
    msgUpdateRepositoryCollaborator: (data: MsgUpdateRepositoryCollaborator): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateRepositoryCollaborator", value: MsgUpdateRepositoryCollaborator.fromPartial( data ) }),
    msgAddIssueLabels: (data: MsgAddIssueLabels): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgAddIssueLabels", value: MsgAddIssueLabels.fromPartial( data ) }),
    msgForkRepositorySuccess: (data: MsgForkRepositorySuccess): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgForkRepositorySuccess", value: MsgForkRepositorySuccess.fromPartial( data ) }),
    msgToggleIssueState: (data: MsgToggleIssueState): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgToggleIssueState", value: MsgToggleIssueState.fromPartial( data ) }),
    msgDeletePullRequest: (data: MsgDeletePullRequest): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeletePullRequest", value: MsgDeletePullRequest.fromPartial( data ) }),
    msgCreateUser: (data: MsgCreateUser): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateUser", value: MsgCreateUser.fromPartial( data ) }),
    msgUpdatePullRequestTitle: (data: MsgUpdatePullRequestTitle): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdatePullRequestTitle", value: MsgUpdatePullRequestTitle.fromPartial( data ) }),
    msgDeleteRelease: (data: MsgDeleteRelease): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteRelease", value: MsgDeleteRelease.fromPartial( data ) }),
    msgCreateRepository: (data: MsgCreateRepository): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateRepository", value: MsgCreateRepository.fromPartial( data ) }),
    msgMultiSetRepositoryTag: (data: MsgMultiSetRepositoryTag): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgMultiSetRepositoryTag", value: MsgMultiSetRepositoryTag.fromPartial( data ) }),
    msgRenameOrganization: (data: MsgRenameOrganization): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRenameOrganization", value: MsgRenameOrganization.fromPartial( data ) }),
    msgMultiDeleteBranch: (data: MsgMultiDeleteBranch): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgMultiDeleteBranch", value: MsgMultiDeleteBranch.fromPartial( data ) }),
    msgAddPullRequestReviewers: (data: MsgAddPullRequestReviewers): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgAddPullRequestReviewers", value: MsgAddPullRequestReviewers.fromPartial( data ) }),
    msgDeleteRepositoryLabel: (data: MsgDeleteRepositoryLabel): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteRepositoryLabel", value: MsgDeleteRepositoryLabel.fromPartial( data ) }),
    msgAddIssueAssignees: (data: MsgAddIssueAssignees): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgAddIssueAssignees", value: MsgAddIssueAssignees.fromPartial( data ) }),
    msgUpdateIssueDescription: (data: MsgUpdateIssueDescription): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateIssueDescription", value: MsgUpdateIssueDescription.fromPartial( data ) }),
    msgRemovePullRequestReviewers: (data: MsgRemovePullRequestReviewers): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRemovePullRequestReviewers", value: MsgRemovePullRequestReviewers.fromPartial( data ) }),
    msgRemoveRepositoryCollaborator: (data: MsgRemoveRepositoryCollaborator): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRemoveRepositoryCollaborator", value: MsgRemoveRepositoryCollaborator.fromPartial( data ) }),
    msgAuthorizeGitServer: (data: MsgAuthorizeGitServer): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgAuthorizeGitServer", value: MsgAuthorizeGitServer.fromPartial( data ) }),
    msgUpdateIssueTitle: (data: MsgUpdateIssueTitle): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateIssueTitle", value: MsgUpdateIssueTitle.fromPartial( data ) }),
    msgChangeOwner: (data: MsgChangeOwner): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgChangeOwner", value: MsgChangeOwner.fromPartial( data ) }),
    msgSetWhois: (data: MsgSetWhois): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgSetWhois", value: MsgSetWhois.fromPartial( data ) }),
    msgUpdateRelease: (data: MsgUpdateRelease): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateRelease", value: MsgUpdateRelease.fromPartial( data ) }),
    msgSetRepositoryBranch: (data: MsgSetRepositoryBranch): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgSetRepositoryBranch", value: MsgSetRepositoryBranch.fromPartial( data ) }),
    msgUpdateOrganizationMember: (data: MsgUpdateOrganizationMember): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateOrganizationMember", value: MsgUpdateOrganizationMember.fromPartial( data ) }),
    
  };
};

interface QueryClientOptions {
  addr: string
}

const queryClient = async ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseUrl: addr });
};

export {
  txClient,
  queryClient,
};
