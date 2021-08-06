import { StdFee } from "@cosmjs/launchpad";
import { OfflineSigner, EncodeObject } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgUpdateComment } from "./types/gitopia/tx";
import { MsgCreateRepository } from "./types/gitopia/tx";
import { MsgRenameRepository } from "./types/gitopia/tx";
import { MsgDeleteBranch } from "./types/gitopia/tx";
import { MsgUpdateUser } from "./types/gitopia/tx";
import { MsgDeleteRepository } from "./types/gitopia/tx";
import { MsgUpdateOrganization } from "./types/gitopia/tx";
import { MsgCreateUser } from "./types/gitopia/tx";
import { MsgSetWhois } from "./types/gitopia/tx";
import { MsgCreateIssue } from "./types/gitopia/tx";
import { MsgSetDefaultBranch } from "./types/gitopia/tx";
import { MsgUpdatePullRequest } from "./types/gitopia/tx";
import { MsgDeleteIssue } from "./types/gitopia/tx";
import { MsgDeleteUser } from "./types/gitopia/tx";
import { MsgDeleteOrganization } from "./types/gitopia/tx";
import { MsgUpdateIssueDescription } from "./types/gitopia/tx";
import { MsgForkRepository } from "./types/gitopia/tx";
import { MsgToggleIssueState } from "./types/gitopia/tx";
import { MsgCreatePullRequest } from "./types/gitopia/tx";
import { MsgDeleteComment } from "./types/gitopia/tx";
import { MsgUpdateIssue } from "./types/gitopia/tx";
import { MsgCreateBranch } from "./types/gitopia/tx";
import { MsgUpdateIssueTitle } from "./types/gitopia/tx";
import { MsgCreateComment } from "./types/gitopia/tx";
import { MsgUpdateRepository } from "./types/gitopia/tx";
import { MsgDeletePullRequest } from "./types/gitopia/tx";
import { MsgCreateOrganization } from "./types/gitopia/tx";
import { MsgUpdateWhois } from "./types/gitopia/tx";
import { MsgUpdateOrganizationMember } from "./types/gitopia/tx";
import { MsgDeleteWhois } from "./types/gitopia/tx";
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
    msgUpdateComment: (data: MsgUpdateComment) => EncodeObject;
    msgCreateRepository: (data: MsgCreateRepository) => EncodeObject;
    msgRenameRepository: (data: MsgRenameRepository) => EncodeObject;
    msgDeleteBranch: (data: MsgDeleteBranch) => EncodeObject;
    msgUpdateUser: (data: MsgUpdateUser) => EncodeObject;
    msgDeleteRepository: (data: MsgDeleteRepository) => EncodeObject;
    msgUpdateOrganization: (data: MsgUpdateOrganization) => EncodeObject;
    msgCreateUser: (data: MsgCreateUser) => EncodeObject;
    msgSetWhois: (data: MsgSetWhois) => EncodeObject;
    msgCreateIssue: (data: MsgCreateIssue) => EncodeObject;
    msgSetDefaultBranch: (data: MsgSetDefaultBranch) => EncodeObject;
    msgUpdatePullRequest: (data: MsgUpdatePullRequest) => EncodeObject;
    msgDeleteIssue: (data: MsgDeleteIssue) => EncodeObject;
    msgDeleteUser: (data: MsgDeleteUser) => EncodeObject;
    msgDeleteOrganization: (data: MsgDeleteOrganization) => EncodeObject;
    msgUpdateIssueDescription: (data: MsgUpdateIssueDescription) => EncodeObject;
    msgForkRepository: (data: MsgForkRepository) => EncodeObject;
    msgToggleIssueState: (data: MsgToggleIssueState) => EncodeObject;
    msgCreatePullRequest: (data: MsgCreatePullRequest) => EncodeObject;
    msgDeleteComment: (data: MsgDeleteComment) => EncodeObject;
    msgUpdateIssue: (data: MsgUpdateIssue) => EncodeObject;
    msgCreateBranch: (data: MsgCreateBranch) => EncodeObject;
    msgUpdateIssueTitle: (data: MsgUpdateIssueTitle) => EncodeObject;
    msgCreateComment: (data: MsgCreateComment) => EncodeObject;
    msgUpdateRepository: (data: MsgUpdateRepository) => EncodeObject;
    msgDeletePullRequest: (data: MsgDeletePullRequest) => EncodeObject;
    msgCreateOrganization: (data: MsgCreateOrganization) => EncodeObject;
    msgUpdateWhois: (data: MsgUpdateWhois) => EncodeObject;
    msgUpdateOrganizationMember: (data: MsgUpdateOrganizationMember) => EncodeObject;
    msgDeleteWhois: (data: MsgDeleteWhois) => EncodeObject;
}>;
interface QueryClientOptions {
    addr: string;
}
declare const queryClient: ({ addr: addr }?: QueryClientOptions) => Promise<Api<unknown>>;
export { txClient, queryClient, };
