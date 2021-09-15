// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgRemoveIssueLabels } from "./types/gitopia/tx";
import { MsgDeleteIssue } from "./types/gitopia/tx";
import { MsgCreateBranch } from "./types/gitopia/tx";
import { MsgUpdateRepository } from "./types/gitopia/tx";
import { MsgDeletePullRequest } from "./types/gitopia/tx";
import { MsgCreateOrganization } from "./types/gitopia/tx";
import { MsgUpdatePullRequestDescription } from "./types/gitopia/tx";
import { MsgUpdatePullRequestTitle } from "./types/gitopia/tx";
import { MsgSetDefaultBranch } from "./types/gitopia/tx";
import { MsgSetPullRequestState } from "./types/gitopia/tx";
import { MsgAddIssueAssignees } from "./types/gitopia/tx";
import { MsgChangeOwner } from "./types/gitopia/tx";
import { MsgUpdateIssue } from "./types/gitopia/tx";
import { MsgCreateRepository } from "./types/gitopia/tx";
import { MsgCreatePullRequest } from "./types/gitopia/tx";
import { MsgDeleteUser } from "./types/gitopia/tx";
import { MsgUpdateRepositoryLabel } from "./types/gitopia/tx";
import { MsgAddIssueLabels } from "./types/gitopia/tx";
import { MsgCreateTag } from "./types/gitopia/tx";
import { MsgDeleteBranch } from "./types/gitopia/tx";
import { MsgDeleteRepository } from "./types/gitopia/tx";
import { MsgUpdateOrganization } from "./types/gitopia/tx";
import { MsgRenameRepository } from "./types/gitopia/tx";
import { MsgUpdateOrganizationMember } from "./types/gitopia/tx";
import { MsgDeleteRelease } from "./types/gitopia/tx";
import { MsgDeleteOrganization } from "./types/gitopia/tx";
import { MsgCreateComment } from "./types/gitopia/tx";
import { MsgCreateUser } from "./types/gitopia/tx";
import { MsgRemoveIssueAssignees } from "./types/gitopia/tx";
import { MsgRemoveOrganizationMember } from "./types/gitopia/tx";
import { MsgSetWhois } from "./types/gitopia/tx";
import { MsgDeleteRepositoryLabel } from "./types/gitopia/tx";
import { MsgDeleteWhois } from "./types/gitopia/tx";
import { MsgUpdateRepositoryCollaborator } from "./types/gitopia/tx";
import { MsgRemoveRepositoryCollaborator } from "./types/gitopia/tx";
import { MsgUpdateWhois } from "./types/gitopia/tx";
import { MsgCreateIssue } from "./types/gitopia/tx";
import { MsgDeleteComment } from "./types/gitopia/tx";
import { MsgUpdatePullRequest } from "./types/gitopia/tx";
import { MsgUpdateIssueTitle } from "./types/gitopia/tx";
import { MsgDeleteTag } from "./types/gitopia/tx";
import { MsgUpdateRelease } from "./types/gitopia/tx";
import { MsgToggleIssueState } from "./types/gitopia/tx";
import { MsgUpdateComment } from "./types/gitopia/tx";
import { MsgCreateRepositoryLabel } from "./types/gitopia/tx";
import { MsgCreateRelease } from "./types/gitopia/tx";
import { MsgUpdateUser } from "./types/gitopia/tx";
import { MsgForkRepository } from "./types/gitopia/tx";
import { MsgUpdateIssueDescription } from "./types/gitopia/tx";
const types = [
    ["/gitopia.gitopia.gitopia.MsgRemoveIssueLabels", MsgRemoveIssueLabels],
    ["/gitopia.gitopia.gitopia.MsgDeleteIssue", MsgDeleteIssue],
    ["/gitopia.gitopia.gitopia.MsgCreateBranch", MsgCreateBranch],
    ["/gitopia.gitopia.gitopia.MsgUpdateRepository", MsgUpdateRepository],
    ["/gitopia.gitopia.gitopia.MsgDeletePullRequest", MsgDeletePullRequest],
    ["/gitopia.gitopia.gitopia.MsgCreateOrganization", MsgCreateOrganization],
    ["/gitopia.gitopia.gitopia.MsgUpdatePullRequestDescription", MsgUpdatePullRequestDescription],
    ["/gitopia.gitopia.gitopia.MsgUpdatePullRequestTitle", MsgUpdatePullRequestTitle],
    ["/gitopia.gitopia.gitopia.MsgSetDefaultBranch", MsgSetDefaultBranch],
    ["/gitopia.gitopia.gitopia.MsgSetPullRequestState", MsgSetPullRequestState],
    ["/gitopia.gitopia.gitopia.MsgAddIssueAssignees", MsgAddIssueAssignees],
    ["/gitopia.gitopia.gitopia.MsgChangeOwner", MsgChangeOwner],
    ["/gitopia.gitopia.gitopia.MsgUpdateIssue", MsgUpdateIssue],
    ["/gitopia.gitopia.gitopia.MsgCreateRepository", MsgCreateRepository],
    ["/gitopia.gitopia.gitopia.MsgCreatePullRequest", MsgCreatePullRequest],
    ["/gitopia.gitopia.gitopia.MsgDeleteUser", MsgDeleteUser],
    ["/gitopia.gitopia.gitopia.MsgUpdateRepositoryLabel", MsgUpdateRepositoryLabel],
    ["/gitopia.gitopia.gitopia.MsgAddIssueLabels", MsgAddIssueLabels],
    ["/gitopia.gitopia.gitopia.MsgCreateTag", MsgCreateTag],
    ["/gitopia.gitopia.gitopia.MsgDeleteBranch", MsgDeleteBranch],
    ["/gitopia.gitopia.gitopia.MsgDeleteRepository", MsgDeleteRepository],
    ["/gitopia.gitopia.gitopia.MsgUpdateOrganization", MsgUpdateOrganization],
    ["/gitopia.gitopia.gitopia.MsgRenameRepository", MsgRenameRepository],
    ["/gitopia.gitopia.gitopia.MsgUpdateOrganizationMember", MsgUpdateOrganizationMember],
    ["/gitopia.gitopia.gitopia.MsgDeleteRelease", MsgDeleteRelease],
    ["/gitopia.gitopia.gitopia.MsgDeleteOrganization", MsgDeleteOrganization],
    ["/gitopia.gitopia.gitopia.MsgCreateComment", MsgCreateComment],
    ["/gitopia.gitopia.gitopia.MsgCreateUser", MsgCreateUser],
    ["/gitopia.gitopia.gitopia.MsgRemoveIssueAssignees", MsgRemoveIssueAssignees],
    ["/gitopia.gitopia.gitopia.MsgRemoveOrganizationMember", MsgRemoveOrganizationMember],
    ["/gitopia.gitopia.gitopia.MsgSetWhois", MsgSetWhois],
    ["/gitopia.gitopia.gitopia.MsgDeleteRepositoryLabel", MsgDeleteRepositoryLabel],
    ["/gitopia.gitopia.gitopia.MsgDeleteWhois", MsgDeleteWhois],
    ["/gitopia.gitopia.gitopia.MsgUpdateRepositoryCollaborator", MsgUpdateRepositoryCollaborator],
    ["/gitopia.gitopia.gitopia.MsgRemoveRepositoryCollaborator", MsgRemoveRepositoryCollaborator],
    ["/gitopia.gitopia.gitopia.MsgUpdateWhois", MsgUpdateWhois],
    ["/gitopia.gitopia.gitopia.MsgCreateIssue", MsgCreateIssue],
    ["/gitopia.gitopia.gitopia.MsgDeleteComment", MsgDeleteComment],
    ["/gitopia.gitopia.gitopia.MsgUpdatePullRequest", MsgUpdatePullRequest],
    ["/gitopia.gitopia.gitopia.MsgUpdateIssueTitle", MsgUpdateIssueTitle],
    ["/gitopia.gitopia.gitopia.MsgDeleteTag", MsgDeleteTag],
    ["/gitopia.gitopia.gitopia.MsgUpdateRelease", MsgUpdateRelease],
    ["/gitopia.gitopia.gitopia.MsgToggleIssueState", MsgToggleIssueState],
    ["/gitopia.gitopia.gitopia.MsgUpdateComment", MsgUpdateComment],
    ["/gitopia.gitopia.gitopia.MsgCreateRepositoryLabel", MsgCreateRepositoryLabel],
    ["/gitopia.gitopia.gitopia.MsgCreateRelease", MsgCreateRelease],
    ["/gitopia.gitopia.gitopia.MsgUpdateUser", MsgUpdateUser],
    ["/gitopia.gitopia.gitopia.MsgForkRepository", MsgForkRepository],
    ["/gitopia.gitopia.gitopia.MsgUpdateIssueDescription", MsgUpdateIssueDescription],
];
export const MissingWalletError = new Error("wallet is required");
const registry = new Registry(types);
const defaultFee = {
    amount: [],
    gas: "200000",
};
const txClient = async (wallet, { addr: addr } = { addr: "http://localhost:26657" }) => {
    if (!wallet)
        throw MissingWalletError;
    const client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
    const { address } = (await wallet.getAccounts())[0];
    return {
        signAndBroadcast: (msgs, { fee, memo } = { fee: defaultFee, memo: "" }) => client.signAndBroadcast(address, msgs, fee, memo),
        msgRemoveIssueLabels: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRemoveIssueLabels", value: data }),
        msgDeleteIssue: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteIssue", value: data }),
        msgCreateBranch: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateBranch", value: data }),
        msgUpdateRepository: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateRepository", value: data }),
        msgDeletePullRequest: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeletePullRequest", value: data }),
        msgCreateOrganization: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateOrganization", value: data }),
        msgUpdatePullRequestDescription: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdatePullRequestDescription", value: data }),
        msgUpdatePullRequestTitle: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdatePullRequestTitle", value: data }),
        msgSetDefaultBranch: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgSetDefaultBranch", value: data }),
        msgSetPullRequestState: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgSetPullRequestState", value: data }),
        msgAddIssueAssignees: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgAddIssueAssignees", value: data }),
        msgChangeOwner: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgChangeOwner", value: data }),
        msgUpdateIssue: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateIssue", value: data }),
        msgCreateRepository: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateRepository", value: data }),
        msgCreatePullRequest: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreatePullRequest", value: data }),
        msgDeleteUser: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteUser", value: data }),
        msgUpdateRepositoryLabel: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateRepositoryLabel", value: data }),
        msgAddIssueLabels: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgAddIssueLabels", value: data }),
        msgCreateTag: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateTag", value: data }),
        msgDeleteBranch: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteBranch", value: data }),
        msgDeleteRepository: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteRepository", value: data }),
        msgUpdateOrganization: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateOrganization", value: data }),
        msgRenameRepository: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRenameRepository", value: data }),
        msgUpdateOrganizationMember: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateOrganizationMember", value: data }),
        msgDeleteRelease: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteRelease", value: data }),
        msgDeleteOrganization: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteOrganization", value: data }),
        msgCreateComment: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateComment", value: data }),
        msgCreateUser: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateUser", value: data }),
        msgRemoveIssueAssignees: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRemoveIssueAssignees", value: data }),
        msgRemoveOrganizationMember: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRemoveOrganizationMember", value: data }),
        msgSetWhois: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgSetWhois", value: data }),
        msgDeleteRepositoryLabel: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteRepositoryLabel", value: data }),
        msgDeleteWhois: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteWhois", value: data }),
        msgUpdateRepositoryCollaborator: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateRepositoryCollaborator", value: data }),
        msgRemoveRepositoryCollaborator: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRemoveRepositoryCollaborator", value: data }),
        msgUpdateWhois: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateWhois", value: data }),
        msgCreateIssue: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateIssue", value: data }),
        msgDeleteComment: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteComment", value: data }),
        msgUpdatePullRequest: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdatePullRequest", value: data }),
        msgUpdateIssueTitle: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateIssueTitle", value: data }),
        msgDeleteTag: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteTag", value: data }),
        msgUpdateRelease: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateRelease", value: data }),
        msgToggleIssueState: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgToggleIssueState", value: data }),
        msgUpdateComment: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateComment", value: data }),
        msgCreateRepositoryLabel: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateRepositoryLabel", value: data }),
        msgCreateRelease: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateRelease", value: data }),
        msgUpdateUser: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateUser", value: data }),
        msgForkRepository: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgForkRepository", value: data }),
        msgUpdateIssueDescription: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateIssueDescription", value: data }),
    };
};
const queryClient = async ({ addr: addr } = { addr: "http://localhost:1317" }) => {
    return new Api({ baseUrl: addr });
};
export { txClient, queryClient, };
