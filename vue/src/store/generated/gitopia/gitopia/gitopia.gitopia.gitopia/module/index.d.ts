import { StdFee } from "@cosmjs/launchpad";
import { OfflineSigner, EncodeObject } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgUpdateRepository } from "./types/gitopia/tx";
import { MsgDeleteUser } from "./types/gitopia/tx";
import { MsgCreateRepository } from "./types/gitopia/tx";
import { MsgDeleteComment } from "./types/gitopia/tx";
import { MsgCreateUser } from "./types/gitopia/tx";
import { MsgUpdateUser } from "./types/gitopia/tx";
import { MsgCreateIssue } from "./types/gitopia/tx";
import { MsgUpdateIssue } from "./types/gitopia/tx";
import { MsgUpdateWhois } from "./types/gitopia/tx";
import { MsgDeleteWhois } from "./types/gitopia/tx";
import { MsgDeleteRepository } from "./types/gitopia/tx";
import { MsgSetWhois } from "./types/gitopia/tx";
import { MsgChangeIssueState } from "./types/gitopia/tx";
import { MsgUpdateComment } from "./types/gitopia/tx";
import { MsgDeleteIssue } from "./types/gitopia/tx";
import { MsgCreateComment } from "./types/gitopia/tx";
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
    msgUpdateRepository: (data: MsgUpdateRepository) => EncodeObject;
    msgDeleteUser: (data: MsgDeleteUser) => EncodeObject;
    msgCreateRepository: (data: MsgCreateRepository) => EncodeObject;
    msgDeleteComment: (data: MsgDeleteComment) => EncodeObject;
    msgCreateUser: (data: MsgCreateUser) => EncodeObject;
    msgUpdateUser: (data: MsgUpdateUser) => EncodeObject;
    msgCreateIssue: (data: MsgCreateIssue) => EncodeObject;
    msgUpdateIssue: (data: MsgUpdateIssue) => EncodeObject;
    msgUpdateWhois: (data: MsgUpdateWhois) => EncodeObject;
    msgDeleteWhois: (data: MsgDeleteWhois) => EncodeObject;
    msgDeleteRepository: (data: MsgDeleteRepository) => EncodeObject;
    msgSetWhois: (data: MsgSetWhois) => EncodeObject;
    msgChangeIssueState: (data: MsgChangeIssueState) => EncodeObject;
    msgUpdateComment: (data: MsgUpdateComment) => EncodeObject;
    msgDeleteIssue: (data: MsgDeleteIssue) => EncodeObject;
    msgCreateComment: (data: MsgCreateComment) => EncodeObject;
}>;
interface QueryClientOptions {
    addr: string;
}
declare const queryClient: ({ addr: addr }?: QueryClientOptions) => Promise<Api<unknown>>;
export { txClient, queryClient, };
