// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry, OfflineSigner, EncodeObject, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgUpdateOrganization } from "./types/gitopia/tx";
import { MsgDeletePullRequest } from "./types/gitopia/tx";
import { MsgUpdateWhois } from "./types/gitopia/tx";
import { MsgUpdatePullRequest } from "./types/gitopia/tx";
import { MsgDeleteWhois } from "./types/gitopia/tx";
import { MsgCreateRepository } from "./types/gitopia/tx";
import { MsgUpdateRepository } from "./types/gitopia/tx";
import { MsgSetDefaultBranch } from "./types/gitopia/tx";
import { MsgUpdateIssueTitle } from "./types/gitopia/tx";
import { MsgCreateBranch } from "./types/gitopia/tx";
import { MsgUpdateIssueDescription } from "./types/gitopia/tx";
import { MsgRenameRepository } from "./types/gitopia/tx";
import { MsgToggleIssueState } from "./types/gitopia/tx";
import { MsgCreatePullRequest } from "./types/gitopia/tx";
import { MsgCreateIssue } from "./types/gitopia/tx";
import { MsgDeleteIssue } from "./types/gitopia/tx";
import { MsgSetWhois } from "./types/gitopia/tx";
import { MsgDeleteBranch } from "./types/gitopia/tx";
import { MsgCreateComment } from "./types/gitopia/tx";
import { MsgDeleteComment } from "./types/gitopia/tx";
import { MsgUpdateUser } from "./types/gitopia/tx";
import { MsgDeleteUser } from "./types/gitopia/tx";
import { MsgUpdateComment } from "./types/gitopia/tx";
import { MsgCreateOrganization } from "./types/gitopia/tx";
import { MsgUpdateOrganizationMember } from "./types/gitopia/tx";
import { MsgDeleteOrganization } from "./types/gitopia/tx";
import { MsgCreateUser } from "./types/gitopia/tx";
import { MsgDeleteRepository } from "./types/gitopia/tx";
import { MsgUpdateIssue } from "./types/gitopia/tx";


const types = [
  ["/gitopia.gitopia.gitopia.MsgUpdateOrganization", MsgUpdateOrganization],
  ["/gitopia.gitopia.gitopia.MsgDeletePullRequest", MsgDeletePullRequest],
  ["/gitopia.gitopia.gitopia.MsgUpdateWhois", MsgUpdateWhois],
  ["/gitopia.gitopia.gitopia.MsgUpdatePullRequest", MsgUpdatePullRequest],
  ["/gitopia.gitopia.gitopia.MsgDeleteWhois", MsgDeleteWhois],
  ["/gitopia.gitopia.gitopia.MsgCreateRepository", MsgCreateRepository],
  ["/gitopia.gitopia.gitopia.MsgUpdateRepository", MsgUpdateRepository],
  ["/gitopia.gitopia.gitopia.MsgSetDefaultBranch", MsgSetDefaultBranch],
  ["/gitopia.gitopia.gitopia.MsgUpdateIssueTitle", MsgUpdateIssueTitle],
  ["/gitopia.gitopia.gitopia.MsgCreateBranch", MsgCreateBranch],
  ["/gitopia.gitopia.gitopia.MsgUpdateIssueDescription", MsgUpdateIssueDescription],
  ["/gitopia.gitopia.gitopia.MsgRenameRepository", MsgRenameRepository],
  ["/gitopia.gitopia.gitopia.MsgToggleIssueState", MsgToggleIssueState],
  ["/gitopia.gitopia.gitopia.MsgCreatePullRequest", MsgCreatePullRequest],
  ["/gitopia.gitopia.gitopia.MsgCreateIssue", MsgCreateIssue],
  ["/gitopia.gitopia.gitopia.MsgDeleteIssue", MsgDeleteIssue],
  ["/gitopia.gitopia.gitopia.MsgSetWhois", MsgSetWhois],
  ["/gitopia.gitopia.gitopia.MsgDeleteBranch", MsgDeleteBranch],
  ["/gitopia.gitopia.gitopia.MsgCreateComment", MsgCreateComment],
  ["/gitopia.gitopia.gitopia.MsgDeleteComment", MsgDeleteComment],
  ["/gitopia.gitopia.gitopia.MsgUpdateUser", MsgUpdateUser],
  ["/gitopia.gitopia.gitopia.MsgDeleteUser", MsgDeleteUser],
  ["/gitopia.gitopia.gitopia.MsgUpdateComment", MsgUpdateComment],
  ["/gitopia.gitopia.gitopia.MsgCreateOrganization", MsgCreateOrganization],
  ["/gitopia.gitopia.gitopia.MsgUpdateOrganizationMember", MsgUpdateOrganizationMember],
  ["/gitopia.gitopia.gitopia.MsgDeleteOrganization", MsgDeleteOrganization],
  ["/gitopia.gitopia.gitopia.MsgCreateUser", MsgCreateUser],
  ["/gitopia.gitopia.gitopia.MsgDeleteRepository", MsgDeleteRepository],
  ["/gitopia.gitopia.gitopia.MsgUpdateIssue", MsgUpdateIssue],
  
];
export const MissingWalletError = new Error("wallet is required");

const registry = new Registry(<any>types);

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

  const client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
  const { address } = (await wallet.getAccounts())[0];

  return {
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }: SignAndBroadcastOptions = {fee: defaultFee, memo: ""}) => client.signAndBroadcast(address, msgs, fee,memo),
    msgUpdateOrganization: (data: MsgUpdateOrganization): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateOrganization", value: data }),
    msgDeletePullRequest: (data: MsgDeletePullRequest): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeletePullRequest", value: data }),
    msgUpdateWhois: (data: MsgUpdateWhois): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateWhois", value: data }),
    msgUpdatePullRequest: (data: MsgUpdatePullRequest): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdatePullRequest", value: data }),
    msgDeleteWhois: (data: MsgDeleteWhois): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteWhois", value: data }),
    msgCreateRepository: (data: MsgCreateRepository): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateRepository", value: data }),
    msgUpdateRepository: (data: MsgUpdateRepository): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateRepository", value: data }),
    msgSetDefaultBranch: (data: MsgSetDefaultBranch): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgSetDefaultBranch", value: data }),
    msgUpdateIssueTitle: (data: MsgUpdateIssueTitle): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateIssueTitle", value: data }),
    msgCreateBranch: (data: MsgCreateBranch): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateBranch", value: data }),
    msgUpdateIssueDescription: (data: MsgUpdateIssueDescription): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateIssueDescription", value: data }),
    msgRenameRepository: (data: MsgRenameRepository): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgRenameRepository", value: data }),
    msgToggleIssueState: (data: MsgToggleIssueState): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgToggleIssueState", value: data }),
    msgCreatePullRequest: (data: MsgCreatePullRequest): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreatePullRequest", value: data }),
    msgCreateIssue: (data: MsgCreateIssue): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateIssue", value: data }),
    msgDeleteIssue: (data: MsgDeleteIssue): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteIssue", value: data }),
    msgSetWhois: (data: MsgSetWhois): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgSetWhois", value: data }),
    msgDeleteBranch: (data: MsgDeleteBranch): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteBranch", value: data }),
    msgCreateComment: (data: MsgCreateComment): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateComment", value: data }),
    msgDeleteComment: (data: MsgDeleteComment): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteComment", value: data }),
    msgUpdateUser: (data: MsgUpdateUser): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateUser", value: data }),
    msgDeleteUser: (data: MsgDeleteUser): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteUser", value: data }),
    msgUpdateComment: (data: MsgUpdateComment): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateComment", value: data }),
    msgCreateOrganization: (data: MsgCreateOrganization): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateOrganization", value: data }),
    msgUpdateOrganizationMember: (data: MsgUpdateOrganizationMember): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateOrganizationMember", value: data }),
    msgDeleteOrganization: (data: MsgDeleteOrganization): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteOrganization", value: data }),
    msgCreateUser: (data: MsgCreateUser): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgCreateUser", value: data }),
    msgDeleteRepository: (data: MsgDeleteRepository): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgDeleteRepository", value: data }),
    msgUpdateIssue: (data: MsgUpdateIssue): EncodeObject => ({ typeUrl: "/gitopia.gitopia.gitopia.MsgUpdateIssue", value: data }),
    
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
