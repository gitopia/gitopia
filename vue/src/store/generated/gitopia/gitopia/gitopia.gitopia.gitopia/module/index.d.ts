import { StdFee } from "@cosmjs/launchpad";
import { OfflineSigner, EncodeObject } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgUpdateWhois } from "./types/gitopia/tx";
import { MsgUpdateUser } from "./types/gitopia/tx";
import { MsgDeleteWhois } from "./types/gitopia/tx";
import { MsgSetWhois } from "./types/gitopia/tx";
import { MsgCreateUser } from "./types/gitopia/tx";
import { MsgDeleteUser } from "./types/gitopia/tx";
interface TxClientOptions {
    addr: string;
}
interface SignAndBroadcastOptions {
    fee: StdFee;
    memo?: string;
}
declare const txClient: (wallet: OfflineSigner, { addr: addr }?: TxClientOptions) => Promise<{
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }: SignAndBroadcastOptions) => Promise<import("@cosmjs/stargate").BroadcastTxResponse>;
    msgUpdateWhois: (data: MsgUpdateWhois) => EncodeObject;
    msgUpdateUser: (data: MsgUpdateUser) => EncodeObject;
    msgDeleteWhois: (data: MsgDeleteWhois) => EncodeObject;
    msgSetWhois: (data: MsgSetWhois) => EncodeObject;
    msgCreateUser: (data: MsgCreateUser) => EncodeObject;
    msgDeleteUser: (data: MsgDeleteUser) => EncodeObject;
}>;
interface QueryClientOptions {
    addr: string;
}
declare const queryClient: ({ addr: addr }?: QueryClientOptions) => Promise<Api<unknown>>;
export { txClient, queryClient, };
