import { StdFee } from "@cosmjs/launchpad";
import { OfflineSigner, EncodeObject } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgRenameRepository } from "./types/gitopia/tx";
import { MsgUpdateIssueTitle } from "./types/gitopia/tx";
import { MsgCreateComment } from "./types/gitopia/tx";
import { MsgUpdateOrganizationMember } from "./types/gitopia/tx";
import { MsgDeleteIssue } from "./types/gitopia/tx";
import { MsgDeleteComment } from "./types/gitopia/tx";
import { MsgDeleteRepository } from "./types/gitopia/tx";
import { MsgUpdateIssue } from "./types/gitopia/tx";
import { MsgUpdateIssueDescription } from "./types/gitopia/tx";
import { MsgCreateBranch } from "./types/gitopia/tx";
import { MsgUpdateRepository } from "./types/gitopia/tx";
import { MsgDeleteUser } from "./types/gitopia/tx";
import { MsgUpdatePullRequest } from "./types/gitopia/tx";
import { MsgUpdateOrganization } from "./types/gitopia/tx";
import { MsgToggleIssueState } from "./types/gitopia/tx";
import { MsgUpdateUser } from "./types/gitopia/tx";
import { MsgDeleteBranch } from "./types/gitopia/tx";
import { MsgDeleteWhois } from "./types/gitopia/tx";
import { MsgCreateIssue } from "./types/gitopia/tx";
import { MsgCreateUser } from "./types/gitopia/tx";
import { MsgCreatePullRequest } from "./types/gitopia/tx";
import { MsgUpdateWhois } from "./types/gitopia/tx";
import { MsgSetWhois } from "./types/gitopia/tx";
import { MsgDeleteOrganization } from "./types/gitopia/tx";
import { MsgUpdateComment } from "./types/gitopia/tx";
import { MsgCreateOrganization } from "./types/gitopia/tx";
import { MsgForkRepository } from "./types/gitopia/tx";
import { MsgCreateRepository } from "./types/gitopia/tx";
import { MsgSetDefaultBranch } from "./types/gitopia/tx";
import { MsgDeletePullRequest } from "./types/gitopia/tx";
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
    msgRenameRepository: (data: MsgRenameRepository) => EncodeObject;
    msgUpdateIssueTitle: (data: MsgUpdateIssueTitle) => EncodeObject;
    msgCreateComment: (data: MsgCreateComment) => EncodeObject;
    msgUpdateOrganizationMember: (data: MsgUpdateOrganizationMember) => EncodeObject;
    msgDeleteIssue: (data: MsgDeleteIssue) => EncodeObject;
    msgDeleteComment: (data: MsgDeleteComment) => EncodeObject;
    msgDeleteRepository: (data: MsgDeleteRepository) => EncodeObject;
    msgUpdateIssue: (data: MsgUpdateIssue) => EncodeObject;
    msgUpdateIssueDescription: (data: MsgUpdateIssueDescription) => EncodeObject;
    msgCreateBranch: (data: MsgCreateBranch) => EncodeObject;
    msgUpdateRepository: (data: MsgUpdateRepository) => EncodeObject;
    msgDeleteUser: (data: MsgDeleteUser) => EncodeObject;
    msgUpdatePullRequest: (data: MsgUpdatePullRequest) => EncodeObject;
    msgUpdateOrganization: (data: MsgUpdateOrganization) => EncodeObject;
    msgToggleIssueState: (data: MsgToggleIssueState) => EncodeObject;
    msgUpdateUser: (data: MsgUpdateUser) => EncodeObject;
    msgDeleteBranch: (data: MsgDeleteBranch) => EncodeObject;
    msgDeleteWhois: (data: MsgDeleteWhois) => EncodeObject;
    msgCreateIssue: (data: MsgCreateIssue) => EncodeObject;
    msgCreateUser: (data: MsgCreateUser) => EncodeObject;
    msgCreatePullRequest: (data: MsgCreatePullRequest) => EncodeObject;
    msgUpdateWhois: (data: MsgUpdateWhois) => EncodeObject;
    msgSetWhois: (data: MsgSetWhois) => EncodeObject;
    msgDeleteOrganization: (data: MsgDeleteOrganization) => EncodeObject;
    msgUpdateComment: (data: MsgUpdateComment) => EncodeObject;
    msgCreateOrganization: (data: MsgCreateOrganization) => EncodeObject;
    msgForkRepository: (data: MsgForkRepository) => EncodeObject;
    msgCreateRepository: (data: MsgCreateRepository) => EncodeObject;
    msgSetDefaultBranch: (data: MsgSetDefaultBranch) => EncodeObject;
    msgDeletePullRequest: (data: MsgDeletePullRequest) => EncodeObject;
}>;
interface QueryClientOptions {
    addr: string;
}
declare const queryClient: ({ addr: addr }?: QueryClientOptions) => Promise<Api<unknown>>;
export { txClient, queryClient, };
