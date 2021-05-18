// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgUpdateWhois } from "./types/gitopia/tx";
import { MsgUpdateUser } from "./types/gitopia/tx";
import { MsgDeleteWhois } from "./types/gitopia/tx";
import { MsgSetWhois } from "./types/gitopia/tx";
import { MsgCreateUser } from "./types/gitopia/tx";
import { MsgDeleteUser } from "./types/gitopia/tx";
const types = [
    ["/gitopia.gitopia.gitopia.MsgUpdateWhois", MsgUpdateWhois],
    ["/gitopia.gitopia.gitopia.MsgUpdateUser", MsgUpdateUser],
    ["/gitopia.gitopia.gitopia.MsgDeleteWhois", MsgDeleteWhois],
    ["/gitopia.gitopia.gitopia.MsgSetWhois", MsgSetWhois],
    ["/gitopia.gitopia.gitopia.MsgCreateUser", MsgCreateUser],
    ["/gitopia.gitopia.gitopia.MsgDeleteUser", MsgDeleteUser],
];
const registry = new Registry(types);
const defaultFee = {
    amount: [],
    gas: "200000",
};
const txClient = async (wallet, { addr: addr } = { addr: "http://localhost:26657" }) => {
    if (!wallet)
        throw new Error("wallet is required");
    const client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
    const { address } = (await wallet.getAccounts())[0];
    return {
        signAndBroadcast: (msgs, { fee = defaultFee, memo = null }) => memo ? client.signAndBroadcast(address, msgs, fee, memo) : client.signAndBroadcast(address, msgs, fee),
        msgUpdateWhois: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateWhois", value: data }),
        msgUpdateUser: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateUser", value: data }),
        msgDeleteWhois: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteWhois", value: data }),
        msgSetWhois: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgSetWhois", value: data }),
        msgCreateUser: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateUser", value: data }),
        msgDeleteUser: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteUser", value: data }),
    };
};
const queryClient = async ({ addr: addr } = { addr: "http://localhost:1317" }) => {
    return new Api({ baseUrl: addr });
};
export { txClient, queryClient, };
