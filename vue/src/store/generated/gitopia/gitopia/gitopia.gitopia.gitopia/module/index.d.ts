import { StdFee } from "@cosmjs/launchpad";
import { OfflineSigner, EncodeObject } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgSetWhois } from "./types/gitopia/tx";
import { MsgDeleteUser } from "./types/gitopia/tx";
import { MsgDeleteIssue } from "./types/gitopia/tx";
import { MsgCreateRepository } from "./types/gitopia/tx";
import { MsgUpdateRepository } from "./types/gitopia/tx";
import { MsgDeleteWhois } from "./types/gitopia/tx";
import { MsgCreateUser } from "./types/gitopia/tx";
import { MsgUpdateWhois } from "./types/gitopia/tx";
import { MsgChangeIssueState } from "./types/gitopia/tx";
import { MsgUpdateComment } from "./types/gitopia/tx";
import { MsgUpdateUser } from "./types/gitopia/tx";
import { MsgUpdateIssue } from "./types/gitopia/tx";
import { MsgCreateIssue } from "./types/gitopia/tx";
import { MsgCreateComment } from "./types/gitopia/tx";
import { MsgDeleteRepository } from "./types/gitopia/tx";
import { MsgDeleteComment } from "./types/gitopia/tx";
interface TxClientOptions {
    addr: string;
}
interface SignAndBroadcastOptions {
    fee: StdFee;
    memo?: string;
}
declare const txClient: (wallet: OfflineSigner, { addr: addr }?: TxClientOptions) => Promise<{
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }: SignAndBroadcastOptions) => Promise<import("@cosmjs/stargate").BroadcastTxResponse>;
    msgSetWhois: (data: MsgSetWhois) => EncodeObject;
    msgDeleteUser: (data: MsgDeleteUser) => EncodeObject;
    msgDeleteIssue: (data: MsgDeleteIssue) => EncodeObject;
    msgCreateRepository: (data: MsgCreateRepository) => EncodeObject;
    msgUpdateRepository: (data: MsgUpdateRepository) => EncodeObject;
    msgDeleteWhois: (data: MsgDeleteWhois) => EncodeObject;
    msgCreateUser: (data: MsgCreateUser) => EncodeObject;
    msgUpdateWhois: (data: MsgUpdateWhois) => EncodeObject;
    msgChangeIssueState: (data: MsgChangeIssueState) => EncodeObject;
    msgUpdateComment: (data: MsgUpdateComment) => EncodeObject;
    msgUpdateUser: (data: MsgUpdateUser) => EncodeObject;
    msgUpdateIssue: (data: MsgUpdateIssue) => EncodeObject;
    msgCreateIssue: (data: MsgCreateIssue) => EncodeObject;
    msgCreateComment: (data: MsgCreateComment) => EncodeObject;
    msgDeleteRepository: (data: MsgDeleteRepository) => EncodeObject;
    msgDeleteComment: (data: MsgDeleteComment) => EncodeObject;
}>;
interface QueryClientOptions {
    addr: string;
}
declare const queryClient: ({ addr: addr }?: QueryClientOptions) => Promise<Api<unknown>>;
export { txClient, queryClient, };
