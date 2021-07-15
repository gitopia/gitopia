import { StdFee } from "@cosmjs/launchpad";
import { OfflineSigner, EncodeObject } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgCreateIssue } from "./types/gitopia/tx";
import { MsgDeleteBranch } from "./types/gitopia/tx";
import { MsgUpdateRepository } from "./types/gitopia/tx";
import { MsgSetWhois } from "./types/gitopia/tx";
import { MsgDeleteRepository } from "./types/gitopia/tx";
import { MsgCreateUser } from "./types/gitopia/tx";
import { MsgUpdateComment } from "./types/gitopia/tx";
import { MsgSetDefaultBranch } from "./types/gitopia/tx";
import { MsgUpdateWhois } from "./types/gitopia/tx";
import { MsgUpdateIssueTitle } from "./types/gitopia/tx";
import { MsgCreateComment } from "./types/gitopia/tx";
import { MsgDeleteComment } from "./types/gitopia/tx";
import { MsgDeleteUser } from "./types/gitopia/tx";
import { MsgUpdateIssue } from "./types/gitopia/tx";
import { MsgDeleteIssue } from "./types/gitopia/tx";
import { MsgDeleteWhois } from "./types/gitopia/tx";
import { MsgCreateRepository } from "./types/gitopia/tx";
import { MsgCreateBranch } from "./types/gitopia/tx";
import { MsgUpdateUser } from "./types/gitopia/tx";
import { MsgToggleIssueState } from "./types/gitopia/tx";
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
    msgCreateIssue: (data: MsgCreateIssue) => EncodeObject;
    msgDeleteBranch: (data: MsgDeleteBranch) => EncodeObject;
    msgUpdateRepository: (data: MsgUpdateRepository) => EncodeObject;
    msgSetWhois: (data: MsgSetWhois) => EncodeObject;
    msgDeleteRepository: (data: MsgDeleteRepository) => EncodeObject;
    msgCreateUser: (data: MsgCreateUser) => EncodeObject;
    msgUpdateComment: (data: MsgUpdateComment) => EncodeObject;
    msgSetDefaultBranch: (data: MsgSetDefaultBranch) => EncodeObject;
    msgUpdateWhois: (data: MsgUpdateWhois) => EncodeObject;
    msgUpdateIssueTitle: (data: MsgUpdateIssueTitle) => EncodeObject;
    msgCreateComment: (data: MsgCreateComment) => EncodeObject;
    msgDeleteComment: (data: MsgDeleteComment) => EncodeObject;
    msgDeleteUser: (data: MsgDeleteUser) => EncodeObject;
    msgUpdateIssue: (data: MsgUpdateIssue) => EncodeObject;
    msgDeleteIssue: (data: MsgDeleteIssue) => EncodeObject;
    msgDeleteWhois: (data: MsgDeleteWhois) => EncodeObject;
    msgCreateRepository: (data: MsgCreateRepository) => EncodeObject;
    msgCreateBranch: (data: MsgCreateBranch) => EncodeObject;
    msgUpdateUser: (data: MsgUpdateUser) => EncodeObject;
    msgToggleIssueState: (data: MsgToggleIssueState) => EncodeObject;
}>;
interface QueryClientOptions {
    addr: string;
}
declare const queryClient: ({ addr: addr }?: QueryClientOptions) => Promise<Api<unknown>>;
export { txClient, queryClient, };
