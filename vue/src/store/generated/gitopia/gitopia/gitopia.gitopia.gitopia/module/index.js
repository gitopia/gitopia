// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgCreateIssue } from "./types/gitopia/tx";
import { MsgDeleteIssue } from "./types/gitopia/tx";
import { MsgCreateBranch } from "./types/gitopia/tx";
import { MsgDeleteBranch } from "./types/gitopia/tx";
import { MsgUpdateUser } from "./types/gitopia/tx";
import { MsgSetDefaultBranch } from "./types/gitopia/tx";
import { MsgDeleteWhois } from "./types/gitopia/tx";
import { MsgUpdateWhois } from "./types/gitopia/tx";
import { MsgCreateComment } from "./types/gitopia/tx";
import { MsgUpdateIssueTitle } from "./types/gitopia/tx";
import { MsgUpdateIssueDescription } from "./types/gitopia/tx";
import { MsgCreateUser } from "./types/gitopia/tx";
import { MsgUpdateComment } from "./types/gitopia/tx";
import { MsgUpdateIssue } from "./types/gitopia/tx";
import { MsgDeleteRepository } from "./types/gitopia/tx";
import { MsgDeleteUser } from "./types/gitopia/tx";
import { MsgUpdateRepository } from "./types/gitopia/tx";
import { MsgCreateRepository } from "./types/gitopia/tx";
import { MsgToggleIssueState } from "./types/gitopia/tx";
import { MsgDeleteComment } from "./types/gitopia/tx";
import { MsgSetWhois } from "./types/gitopia/tx";
const types = [
    ["/gitopia.gitopia.gitopia.MsgCreateIssue", MsgCreateIssue],
    ["/gitopia.gitopia.gitopia.MsgDeleteIssue", MsgDeleteIssue],
    ["/gitopia.gitopia.gitopia.MsgCreateBranch", MsgCreateBranch],
    ["/gitopia.gitopia.gitopia.MsgDeleteBranch", MsgDeleteBranch],
    ["/gitopia.gitopia.gitopia.MsgUpdateUser", MsgUpdateUser],
    ["/gitopia.gitopia.gitopia.MsgSetDefaultBranch", MsgSetDefaultBranch],
    ["/gitopia.gitopia.gitopia.MsgDeleteWhois", MsgDeleteWhois],
    ["/gitopia.gitopia.gitopia.MsgUpdateWhois", MsgUpdateWhois],
    ["/gitopia.gitopia.gitopia.MsgCreateComment", MsgCreateComment],
    ["/gitopia.gitopia.gitopia.MsgUpdateIssueTitle", MsgUpdateIssueTitle],
    ["/gitopia.gitopia.gitopia.MsgUpdateIssueDescription", MsgUpdateIssueDescription],
    ["/gitopia.gitopia.gitopia.MsgCreateUser", MsgCreateUser],
    ["/gitopia.gitopia.gitopia.MsgUpdateComment", MsgUpdateComment],
    ["/gitopia.gitopia.gitopia.MsgUpdateIssue", MsgUpdateIssue],
    ["/gitopia.gitopia.gitopia.MsgDeleteRepository", MsgDeleteRepository],
    ["/gitopia.gitopia.gitopia.MsgDeleteUser", MsgDeleteUser],
    ["/gitopia.gitopia.gitopia.MsgUpdateRepository", MsgUpdateRepository],
    ["/gitopia.gitopia.gitopia.MsgCreateRepository", MsgCreateRepository],
    ["/gitopia.gitopia.gitopia.MsgToggleIssueState", MsgToggleIssueState],
    ["/gitopia.gitopia.gitopia.MsgDeleteComment", MsgDeleteComment],
    ["/gitopia.gitopia.gitopia.MsgSetWhois", MsgSetWhois],
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
        msgCreateIssue: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateIssue", value: data }),
        msgDeleteIssue: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteIssue", value: data }),
        msgCreateBranch: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateBranch", value: data }),
        msgDeleteBranch: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteBranch", value: data }),
        msgUpdateUser: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateUser", value: data }),
        msgSetDefaultBranch: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgSetDefaultBranch", value: data }),
        msgDeleteWhois: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteWhois", value: data }),
        msgUpdateWhois: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateWhois", value: data }),
        msgCreateComment: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateComment", value: data }),
        msgUpdateIssueTitle: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateIssueTitle", value: data }),
        msgUpdateIssueDescription: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateIssueDescription", value: data }),
        msgCreateUser: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateUser", value: data }),
        msgUpdateComment: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateComment", value: data }),
        msgUpdateIssue: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateIssue", value: data }),
        msgDeleteRepository: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteRepository", value: data }),
        msgDeleteUser: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteUser", value: data }),
        msgUpdateRepository: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateRepository", value: data }),
        msgCreateRepository: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateRepository", value: data }),
        msgToggleIssueState: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgToggleIssueState", value: data }),
        msgDeleteComment: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteComment", value: data }),
        msgSetWhois: (data) => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgSetWhois", value: data }),
    };
};
const queryClient = async ({ addr: addr } = { addr: "http://localhost:1317" }) => {
    return new Api({ baseUrl: addr });
};
export { txClient, queryClient, };
