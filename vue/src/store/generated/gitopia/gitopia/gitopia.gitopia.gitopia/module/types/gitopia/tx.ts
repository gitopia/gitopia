/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";

export const protobufPackage = "gitopia.gitopia.gitopia";

/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgCreatePullRequest {
  creator: string;
  title: string;
  description: string;
  headBranch: string;
  headRepoId: number;
  baseBranch: string;
  baseRepoId: number;
}

export interface MsgCreatePullRequestResponse {
  id: number;
  iid: number;
}

export interface MsgUpdatePullRequest {
  creator: string;
  id: number;
  title: string;
  description: string;
}

export interface MsgUpdatePullRequestResponse {}

export interface MsgUpdatePullRequestTitle {
  creator: string;
  id: number;
  title: string;
}

export interface MsgUpdatePullRequestTitleResponse {}

export interface MsgUpdatePullRequestDescription {
  creator: string;
  id: number;
  description: string;
}

export interface MsgUpdatePullRequestDescriptionResponse {}

export interface MsgSetPullRequestState {
  creator: string;
  id: number;
  state: string;
  mergeCommitSha: string;
}

export interface MsgSetPullRequestStateResponse {
  state: string;
}

export interface MsgDeletePullRequest {
  creator: string;
  id: number;
}

export interface MsgDeletePullRequestResponse {}

export interface MsgCreateOrganization {
  creator: string;
  name: string;
  description: string;
}

export interface MsgCreateOrganizationResponse {
  id: string;
}

export interface MsgUpdateOrganizationMember {
  creator: string;
  id: string;
  user: string;
  role: string;
}

export interface MsgUpdateOrganizationMemberResponse {}

export interface MsgRemoveOrganizationMember {
  creator: string;
  id: string;
  user: string;
}

export interface MsgRemoveOrganizationMemberResponse {}

export interface MsgUpdateOrganization {
  creator: string;
  id: string;
  name: string;
  avatarUrl: string;
  location: string;
  email: string;
  website: string;
  description: string;
}

export interface MsgUpdateOrganizationResponse {}

export interface MsgDeleteOrganization {
  creator: string;
  id: string;
}

export interface MsgDeleteOrganizationResponse {}

export interface MsgCreateComment {
  creator: string;
  parentId: number;
  body: string;
  attachments: string[];
  diffHunk: string;
  path: string;
  system: boolean;
  authorAssociation: string;
  commentType: string;
}

export interface MsgCreateCommentResponse {
  id: number;
}

export interface MsgUpdateComment {
  creator: string;
  id: number;
  body: string;
  attachments: string[];
}

export interface MsgUpdateCommentResponse {}

export interface MsgDeleteComment {
  creator: string;
  id: number;
}

export interface MsgDeleteCommentResponse {}

export interface MsgCreateIssue {
  creator: string;
  title: string;
  description: string;
  repositoryId: number;
  labels: string[];
  weight: number;
  assignees: string[];
}

export interface MsgCreateIssueResponse {
  id: number;
  iid: number;
}

export interface MsgUpdateIssue {
  creator: string;
  id: number;
  title: string;
  description: string;
  labels: string[];
  weight: number;
  assignees: string[];
}

export interface MsgUpdateIssueResponse {}

export interface MsgUpdateIssueTitle {
  creator: string;
  id: number;
  title: string;
}

export interface MsgUpdateIssueTitleResponse {}

export interface MsgUpdateIssueDescription {
  creator: string;
  id: number;
  description: string;
}

export interface MsgUpdateIssueDescriptionResponse {}

export interface MsgToggleIssueState {
  creator: string;
  id: number;
}

export interface MsgToggleIssueStateResponse {
  state: string;
}

export interface MsgDeleteIssue {
  creator: string;
  id: number;
}

export interface MsgDeleteIssueResponse {}

export interface MsgCreateRepository {
  creator: string;
  name: string;
  ownerId: string;
  ownerType: string;
  description: string;
}

export interface MsgCreateRepositoryResponse {
  id: number;
  name: string;
}

export interface MsgForkRepository {
  creator: string;
  repositoryId: number;
  ownerId: string;
  ownerType: string;
}

export interface MsgForkRepositoryResponse {
  id: number;
}

export interface MsgRenameRepository {
  creator: string;
  id: number;
  name: string;
}

export interface MsgRenameRepositoryResponse {}

export interface MsgChangeOwner {
  creator: string;
  repositoryId: number;
  ownerId: string;
  ownerType: string;
}

export interface MsgChangeOwnerResponse {}

export interface MsgUpdateRepositoryCollaborator {
  creator: string;
  id: number;
  user: string;
  role: string;
}

export interface MsgUpdateRepositoryCollaboratorResponse {}

export interface MsgRemoveRepositoryCollaborator {
  creator: string;
  id: number;
  user: string;
}

export interface MsgRemoveRepositoryCollaboratorResponse {}

export interface MsgCreateBranch {
  creator: string;
  id: number;
  name: string;
  commitSHA: string;
}

export interface MsgCreateBranchResponse {}

export interface MsgSetDefaultBranch {
  creator: string;
  id: number;
  name: string;
}

export interface MsgSetDefaultBranchResponse {}

export interface MsgDeleteBranch {
  creator: string;
  id: number;
  name: string;
}

export interface MsgDeleteBranchResponse {}

export interface MsgCreateTag {
  creator: string;
  id: number;
  name: string;
  sha: string;
}

export interface MsgCreateTagResponse {}

export interface MsgDeleteTag {
  creator: string;
  id: number;
  name: string;
}

export interface MsgDeleteTagResponse {}

export interface MsgUpdateRepository {
  creator: string;
  id: number;
  name: string;
  owner: string;
  description: string;
  labels: string;
  license: string;
  defaultBranch: string;
}

export interface MsgUpdateRepositoryResponse {}

export interface MsgDeleteRepository {
  creator: string;
  id: number;
}

export interface MsgDeleteRepositoryResponse {}

export interface MsgCreateUser {
  creator: string;
  username: string;
  usernameGithub: string;
  avatarUrl: string;
  followers: string;
  following: string;
  repositories: string;
  repositoriesArchived: string;
  organizations: string;
  starredRepos: string;
  subscriptions: string;
  email: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
  extensions: string;
}

export interface MsgCreateUserResponse {
  id: string;
}

export interface MsgUpdateUser {
  creator: string;
  id: string;
  username: string;
  usernameGithub: string;
  avatarUrl: string;
  followers: string;
  following: string;
  repositories: string;
  repositoriesArchived: string;
  organizations: string;
  starredRepos: string;
  subscriptions: string;
  email: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
  extensions: string;
}

export interface MsgUpdateUserResponse {}

export interface MsgDeleteUser {
  creator: string;
  id: string;
}

export interface MsgDeleteUserResponse {}

export interface MsgSetWhois {
  creator: string;
  name: string;
  address: string;
}

export interface MsgSetWhoisResponse {}

export interface MsgUpdateWhois {
  creator: string;
  name: string;
  address: string;
}

export interface MsgUpdateWhoisResponse {}

export interface MsgDeleteWhois {
  creator: string;
  name: string;
}

export interface MsgDeleteWhoisResponse {}

const baseMsgCreatePullRequest: object = {
  creator: "",
  title: "",
  description: "",
  headBranch: "",
  headRepoId: 0,
  baseBranch: "",
  baseRepoId: 0,
};

export const MsgCreatePullRequest = {
  encode(
    message: MsgCreatePullRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.headBranch !== "") {
      writer.uint32(34).string(message.headBranch);
    }
    if (message.headRepoId !== 0) {
      writer.uint32(40).uint64(message.headRepoId);
    }
    if (message.baseBranch !== "") {
      writer.uint32(50).string(message.baseBranch);
    }
    if (message.baseRepoId !== 0) {
      writer.uint32(56).uint64(message.baseRepoId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreatePullRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreatePullRequest } as MsgCreatePullRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.title = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        case 4:
          message.headBranch = reader.string();
          break;
        case 5:
          message.headRepoId = longToNumber(reader.uint64() as Long);
          break;
        case 6:
          message.baseBranch = reader.string();
          break;
        case 7:
          message.baseRepoId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreatePullRequest {
    const message = { ...baseMsgCreatePullRequest } as MsgCreatePullRequest;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.headBranch !== undefined && object.headBranch !== null) {
      message.headBranch = String(object.headBranch);
    } else {
      message.headBranch = "";
    }
    if (object.headRepoId !== undefined && object.headRepoId !== null) {
      message.headRepoId = Number(object.headRepoId);
    } else {
      message.headRepoId = 0;
    }
    if (object.baseBranch !== undefined && object.baseBranch !== null) {
      message.baseBranch = String(object.baseBranch);
    } else {
      message.baseBranch = "";
    }
    if (object.baseRepoId !== undefined && object.baseRepoId !== null) {
      message.baseRepoId = Number(object.baseRepoId);
    } else {
      message.baseRepoId = 0;
    }
    return message;
  },

  toJSON(message: MsgCreatePullRequest): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined &&
      (obj.description = message.description);
    message.headBranch !== undefined && (obj.headBranch = message.headBranch);
    message.headRepoId !== undefined && (obj.headRepoId = message.headRepoId);
    message.baseBranch !== undefined && (obj.baseBranch = message.baseBranch);
    message.baseRepoId !== undefined && (obj.baseRepoId = message.baseRepoId);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreatePullRequest>): MsgCreatePullRequest {
    const message = { ...baseMsgCreatePullRequest } as MsgCreatePullRequest;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    } else {
      message.title = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.headBranch !== undefined && object.headBranch !== null) {
      message.headBranch = object.headBranch;
    } else {
      message.headBranch = "";
    }
    if (object.headRepoId !== undefined && object.headRepoId !== null) {
      message.headRepoId = object.headRepoId;
    } else {
      message.headRepoId = 0;
    }
    if (object.baseBranch !== undefined && object.baseBranch !== null) {
      message.baseBranch = object.baseBranch;
    } else {
      message.baseBranch = "";
    }
    if (object.baseRepoId !== undefined && object.baseRepoId !== null) {
      message.baseRepoId = object.baseRepoId;
    } else {
      message.baseRepoId = 0;
    }
    return message;
  },
};

const baseMsgCreatePullRequestResponse: object = { id: 0, iid: 0 };

export const MsgCreatePullRequestResponse = {
  encode(
    message: MsgCreatePullRequestResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.iid !== 0) {
      writer.uint32(16).uint64(message.iid);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgCreatePullRequestResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCreatePullRequestResponse,
    } as MsgCreatePullRequestResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.iid = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreatePullRequestResponse {
    const message = {
      ...baseMsgCreatePullRequestResponse,
    } as MsgCreatePullRequestResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.iid !== undefined && object.iid !== null) {
      message.iid = Number(object.iid);
    } else {
      message.iid = 0;
    }
    return message;
  },

  toJSON(message: MsgCreatePullRequestResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.iid !== undefined && (obj.iid = message.iid);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCreatePullRequestResponse>
  ): MsgCreatePullRequestResponse {
    const message = {
      ...baseMsgCreatePullRequestResponse,
    } as MsgCreatePullRequestResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.iid !== undefined && object.iid !== null) {
      message.iid = object.iid;
    } else {
      message.iid = 0;
    }
    return message;
  },
};

const baseMsgUpdatePullRequest: object = {
  creator: "",
  id: 0,
  title: "",
  description: "",
};

export const MsgUpdatePullRequest = {
  encode(
    message: MsgUpdatePullRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.title !== "") {
      writer.uint32(34).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(50).string(message.description);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUpdatePullRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdatePullRequest } as MsgUpdatePullRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.title = reader.string();
          break;
        case 6:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdatePullRequest {
    const message = { ...baseMsgUpdatePullRequest } as MsgUpdatePullRequest;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    return message;
  },

  toJSON(message: MsgUpdatePullRequest): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined &&
      (obj.description = message.description);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpdatePullRequest>): MsgUpdatePullRequest {
    const message = { ...baseMsgUpdatePullRequest } as MsgUpdatePullRequest;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    } else {
      message.title = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    return message;
  },
};

const baseMsgUpdatePullRequestResponse: object = {};

export const MsgUpdatePullRequestResponse = {
  encode(
    _: MsgUpdatePullRequestResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdatePullRequestResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdatePullRequestResponse,
    } as MsgUpdatePullRequestResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdatePullRequestResponse {
    const message = {
      ...baseMsgUpdatePullRequestResponse,
    } as MsgUpdatePullRequestResponse;
    return message;
  },

  toJSON(_: MsgUpdatePullRequestResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdatePullRequestResponse>
  ): MsgUpdatePullRequestResponse {
    const message = {
      ...baseMsgUpdatePullRequestResponse,
    } as MsgUpdatePullRequestResponse;
    return message;
  },
};

const baseMsgUpdatePullRequestTitle: object = { creator: "", id: 0, title: "" };

export const MsgUpdatePullRequestTitle = {
  encode(
    message: MsgUpdatePullRequestTitle,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.title !== "") {
      writer.uint32(26).string(message.title);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdatePullRequestTitle {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdatePullRequestTitle,
    } as MsgUpdatePullRequestTitle;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.title = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdatePullRequestTitle {
    const message = {
      ...baseMsgUpdatePullRequestTitle,
    } as MsgUpdatePullRequestTitle;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = "";
    }
    return message;
  },

  toJSON(message: MsgUpdatePullRequestTitle): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.title !== undefined && (obj.title = message.title);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgUpdatePullRequestTitle>
  ): MsgUpdatePullRequestTitle {
    const message = {
      ...baseMsgUpdatePullRequestTitle,
    } as MsgUpdatePullRequestTitle;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    } else {
      message.title = "";
    }
    return message;
  },
};

const baseMsgUpdatePullRequestTitleResponse: object = {};

export const MsgUpdatePullRequestTitleResponse = {
  encode(
    _: MsgUpdatePullRequestTitleResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdatePullRequestTitleResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdatePullRequestTitleResponse,
    } as MsgUpdatePullRequestTitleResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdatePullRequestTitleResponse {
    const message = {
      ...baseMsgUpdatePullRequestTitleResponse,
    } as MsgUpdatePullRequestTitleResponse;
    return message;
  },

  toJSON(_: MsgUpdatePullRequestTitleResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdatePullRequestTitleResponse>
  ): MsgUpdatePullRequestTitleResponse {
    const message = {
      ...baseMsgUpdatePullRequestTitleResponse,
    } as MsgUpdatePullRequestTitleResponse;
    return message;
  },
};

const baseMsgUpdatePullRequestDescription: object = {
  creator: "",
  id: 0,
  description: "",
};

export const MsgUpdatePullRequestDescription = {
  encode(
    message: MsgUpdatePullRequestDescription,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdatePullRequestDescription {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdatePullRequestDescription,
    } as MsgUpdatePullRequestDescription;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdatePullRequestDescription {
    const message = {
      ...baseMsgUpdatePullRequestDescription,
    } as MsgUpdatePullRequestDescription;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    return message;
  },

  toJSON(message: MsgUpdatePullRequestDescription): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.description !== undefined &&
      (obj.description = message.description);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgUpdatePullRequestDescription>
  ): MsgUpdatePullRequestDescription {
    const message = {
      ...baseMsgUpdatePullRequestDescription,
    } as MsgUpdatePullRequestDescription;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    return message;
  },
};

const baseMsgUpdatePullRequestDescriptionResponse: object = {};

export const MsgUpdatePullRequestDescriptionResponse = {
  encode(
    _: MsgUpdatePullRequestDescriptionResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdatePullRequestDescriptionResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdatePullRequestDescriptionResponse,
    } as MsgUpdatePullRequestDescriptionResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdatePullRequestDescriptionResponse {
    const message = {
      ...baseMsgUpdatePullRequestDescriptionResponse,
    } as MsgUpdatePullRequestDescriptionResponse;
    return message;
  },

  toJSON(_: MsgUpdatePullRequestDescriptionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdatePullRequestDescriptionResponse>
  ): MsgUpdatePullRequestDescriptionResponse {
    const message = {
      ...baseMsgUpdatePullRequestDescriptionResponse,
    } as MsgUpdatePullRequestDescriptionResponse;
    return message;
  },
};

const baseMsgSetPullRequestState: object = {
  creator: "",
  id: 0,
  state: "",
  mergeCommitSha: "",
};

export const MsgSetPullRequestState = {
  encode(
    message: MsgSetPullRequestState,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.state !== "") {
      writer.uint32(26).string(message.state);
    }
    if (message.mergeCommitSha !== "") {
      writer.uint32(34).string(message.mergeCommitSha);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSetPullRequestState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgSetPullRequestState } as MsgSetPullRequestState;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.state = reader.string();
          break;
        case 4:
          message.mergeCommitSha = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetPullRequestState {
    const message = { ...baseMsgSetPullRequestState } as MsgSetPullRequestState;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = String(object.state);
    } else {
      message.state = "";
    }
    if (object.mergeCommitSha !== undefined && object.mergeCommitSha !== null) {
      message.mergeCommitSha = String(object.mergeCommitSha);
    } else {
      message.mergeCommitSha = "";
    }
    return message;
  },

  toJSON(message: MsgSetPullRequestState): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.state !== undefined && (obj.state = message.state);
    message.mergeCommitSha !== undefined &&
      (obj.mergeCommitSha = message.mergeCommitSha);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgSetPullRequestState>
  ): MsgSetPullRequestState {
    const message = { ...baseMsgSetPullRequestState } as MsgSetPullRequestState;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    } else {
      message.state = "";
    }
    if (object.mergeCommitSha !== undefined && object.mergeCommitSha !== null) {
      message.mergeCommitSha = object.mergeCommitSha;
    } else {
      message.mergeCommitSha = "";
    }
    return message;
  },
};

const baseMsgSetPullRequestStateResponse: object = { state: "" };

export const MsgSetPullRequestStateResponse = {
  encode(
    message: MsgSetPullRequestStateResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.state !== "") {
      writer.uint32(10).string(message.state);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgSetPullRequestStateResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgSetPullRequestStateResponse,
    } as MsgSetPullRequestStateResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.state = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetPullRequestStateResponse {
    const message = {
      ...baseMsgSetPullRequestStateResponse,
    } as MsgSetPullRequestStateResponse;
    if (object.state !== undefined && object.state !== null) {
      message.state = String(object.state);
    } else {
      message.state = "";
    }
    return message;
  },

  toJSON(message: MsgSetPullRequestStateResponse): unknown {
    const obj: any = {};
    message.state !== undefined && (obj.state = message.state);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgSetPullRequestStateResponse>
  ): MsgSetPullRequestStateResponse {
    const message = {
      ...baseMsgSetPullRequestStateResponse,
    } as MsgSetPullRequestStateResponse;
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    } else {
      message.state = "";
    }
    return message;
  },
};

const baseMsgDeletePullRequest: object = { creator: "", id: 0 };

export const MsgDeletePullRequest = {
  encode(
    message: MsgDeletePullRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeletePullRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeletePullRequest } as MsgDeletePullRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeletePullRequest {
    const message = { ...baseMsgDeletePullRequest } as MsgDeletePullRequest;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: MsgDeletePullRequest): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgDeletePullRequest>): MsgDeletePullRequest {
    const message = { ...baseMsgDeletePullRequest } as MsgDeletePullRequest;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseMsgDeletePullRequestResponse: object = {};

export const MsgDeletePullRequestResponse = {
  encode(
    _: MsgDeletePullRequestResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgDeletePullRequestResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgDeletePullRequestResponse,
    } as MsgDeletePullRequestResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgDeletePullRequestResponse {
    const message = {
      ...baseMsgDeletePullRequestResponse,
    } as MsgDeletePullRequestResponse;
    return message;
  },

  toJSON(_: MsgDeletePullRequestResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgDeletePullRequestResponse>
  ): MsgDeletePullRequestResponse {
    const message = {
      ...baseMsgDeletePullRequestResponse,
    } as MsgDeletePullRequestResponse;
    return message;
  },
};

const baseMsgCreateOrganization: object = {
  creator: "",
  name: "",
  description: "",
};

export const MsgCreateOrganization = {
  encode(
    message: MsgCreateOrganization,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateOrganization {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateOrganization } as MsgCreateOrganization;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateOrganization {
    const message = { ...baseMsgCreateOrganization } as MsgCreateOrganization;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    return message;
  },

  toJSON(message: MsgCreateOrganization): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined &&
      (obj.description = message.description);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCreateOrganization>
  ): MsgCreateOrganization {
    const message = { ...baseMsgCreateOrganization } as MsgCreateOrganization;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    return message;
  },
};

const baseMsgCreateOrganizationResponse: object = { id: "" };

export const MsgCreateOrganizationResponse = {
  encode(
    message: MsgCreateOrganizationResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgCreateOrganizationResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCreateOrganizationResponse,
    } as MsgCreateOrganizationResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateOrganizationResponse {
    const message = {
      ...baseMsgCreateOrganizationResponse,
    } as MsgCreateOrganizationResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    return message;
  },

  toJSON(message: MsgCreateOrganizationResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCreateOrganizationResponse>
  ): MsgCreateOrganizationResponse {
    const message = {
      ...baseMsgCreateOrganizationResponse,
    } as MsgCreateOrganizationResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    return message;
  },
};

const baseMsgUpdateOrganizationMember: object = {
  creator: "",
  id: "",
  user: "",
  role: "",
};

export const MsgUpdateOrganizationMember = {
  encode(
    message: MsgUpdateOrganizationMember,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.user !== "") {
      writer.uint32(26).string(message.user);
    }
    if (message.role !== "") {
      writer.uint32(34).string(message.role);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdateOrganizationMember {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateOrganizationMember,
    } as MsgUpdateOrganizationMember;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.user = reader.string();
          break;
        case 4:
          message.role = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateOrganizationMember {
    const message = {
      ...baseMsgUpdateOrganizationMember,
    } as MsgUpdateOrganizationMember;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = String(object.user);
    } else {
      message.user = "";
    }
    if (object.role !== undefined && object.role !== null) {
      message.role = String(object.role);
    } else {
      message.role = "";
    }
    return message;
  },

  toJSON(message: MsgUpdateOrganizationMember): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.user !== undefined && (obj.user = message.user);
    message.role !== undefined && (obj.role = message.role);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgUpdateOrganizationMember>
  ): MsgUpdateOrganizationMember {
    const message = {
      ...baseMsgUpdateOrganizationMember,
    } as MsgUpdateOrganizationMember;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = object.user;
    } else {
      message.user = "";
    }
    if (object.role !== undefined && object.role !== null) {
      message.role = object.role;
    } else {
      message.role = "";
    }
    return message;
  },
};

const baseMsgUpdateOrganizationMemberResponse: object = {};

export const MsgUpdateOrganizationMemberResponse = {
  encode(
    _: MsgUpdateOrganizationMemberResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdateOrganizationMemberResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateOrganizationMemberResponse,
    } as MsgUpdateOrganizationMemberResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateOrganizationMemberResponse {
    const message = {
      ...baseMsgUpdateOrganizationMemberResponse,
    } as MsgUpdateOrganizationMemberResponse;
    return message;
  },

  toJSON(_: MsgUpdateOrganizationMemberResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateOrganizationMemberResponse>
  ): MsgUpdateOrganizationMemberResponse {
    const message = {
      ...baseMsgUpdateOrganizationMemberResponse,
    } as MsgUpdateOrganizationMemberResponse;
    return message;
  },
};

const baseMsgRemoveOrganizationMember: object = {
  creator: "",
  id: "",
  user: "",
};

export const MsgRemoveOrganizationMember = {
  encode(
    message: MsgRemoveOrganizationMember,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.user !== "") {
      writer.uint32(26).string(message.user);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgRemoveOrganizationMember {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgRemoveOrganizationMember,
    } as MsgRemoveOrganizationMember;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.user = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRemoveOrganizationMember {
    const message = {
      ...baseMsgRemoveOrganizationMember,
    } as MsgRemoveOrganizationMember;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = String(object.user);
    } else {
      message.user = "";
    }
    return message;
  },

  toJSON(message: MsgRemoveOrganizationMember): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.user !== undefined && (obj.user = message.user);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgRemoveOrganizationMember>
  ): MsgRemoveOrganizationMember {
    const message = {
      ...baseMsgRemoveOrganizationMember,
    } as MsgRemoveOrganizationMember;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = object.user;
    } else {
      message.user = "";
    }
    return message;
  },
};

const baseMsgRemoveOrganizationMemberResponse: object = {};

export const MsgRemoveOrganizationMemberResponse = {
  encode(
    _: MsgRemoveOrganizationMemberResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgRemoveOrganizationMemberResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgRemoveOrganizationMemberResponse,
    } as MsgRemoveOrganizationMemberResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgRemoveOrganizationMemberResponse {
    const message = {
      ...baseMsgRemoveOrganizationMemberResponse,
    } as MsgRemoveOrganizationMemberResponse;
    return message;
  },

  toJSON(_: MsgRemoveOrganizationMemberResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgRemoveOrganizationMemberResponse>
  ): MsgRemoveOrganizationMemberResponse {
    const message = {
      ...baseMsgRemoveOrganizationMemberResponse,
    } as MsgRemoveOrganizationMemberResponse;
    return message;
  },
};

const baseMsgUpdateOrganization: object = {
  creator: "",
  id: "",
  name: "",
  avatarUrl: "",
  location: "",
  email: "",
  website: "",
  description: "",
};

export const MsgUpdateOrganization = {
  encode(
    message: MsgUpdateOrganization,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.avatarUrl !== "") {
      writer.uint32(34).string(message.avatarUrl);
    }
    if (message.location !== "") {
      writer.uint32(42).string(message.location);
    }
    if (message.email !== "") {
      writer.uint32(50).string(message.email);
    }
    if (message.website !== "") {
      writer.uint32(58).string(message.website);
    }
    if (message.description !== "") {
      writer.uint32(66).string(message.description);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateOrganization {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateOrganization } as MsgUpdateOrganization;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.avatarUrl = reader.string();
          break;
        case 5:
          message.location = reader.string();
          break;
        case 6:
          message.email = reader.string();
          break;
        case 7:
          message.website = reader.string();
          break;
        case 8:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateOrganization {
    const message = { ...baseMsgUpdateOrganization } as MsgUpdateOrganization;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.avatarUrl !== undefined && object.avatarUrl !== null) {
      message.avatarUrl = String(object.avatarUrl);
    } else {
      message.avatarUrl = "";
    }
    if (object.location !== undefined && object.location !== null) {
      message.location = String(object.location);
    } else {
      message.location = "";
    }
    if (object.email !== undefined && object.email !== null) {
      message.email = String(object.email);
    } else {
      message.email = "";
    }
    if (object.website !== undefined && object.website !== null) {
      message.website = String(object.website);
    } else {
      message.website = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    return message;
  },

  toJSON(message: MsgUpdateOrganization): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.avatarUrl !== undefined && (obj.avatarUrl = message.avatarUrl);
    message.location !== undefined && (obj.location = message.location);
    message.email !== undefined && (obj.email = message.email);
    message.website !== undefined && (obj.website = message.website);
    message.description !== undefined &&
      (obj.description = message.description);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgUpdateOrganization>
  ): MsgUpdateOrganization {
    const message = { ...baseMsgUpdateOrganization } as MsgUpdateOrganization;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.avatarUrl !== undefined && object.avatarUrl !== null) {
      message.avatarUrl = object.avatarUrl;
    } else {
      message.avatarUrl = "";
    }
    if (object.location !== undefined && object.location !== null) {
      message.location = object.location;
    } else {
      message.location = "";
    }
    if (object.email !== undefined && object.email !== null) {
      message.email = object.email;
    } else {
      message.email = "";
    }
    if (object.website !== undefined && object.website !== null) {
      message.website = object.website;
    } else {
      message.website = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    return message;
  },
};

const baseMsgUpdateOrganizationResponse: object = {};

export const MsgUpdateOrganizationResponse = {
  encode(
    _: MsgUpdateOrganizationResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdateOrganizationResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateOrganizationResponse,
    } as MsgUpdateOrganizationResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateOrganizationResponse {
    const message = {
      ...baseMsgUpdateOrganizationResponse,
    } as MsgUpdateOrganizationResponse;
    return message;
  },

  toJSON(_: MsgUpdateOrganizationResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateOrganizationResponse>
  ): MsgUpdateOrganizationResponse {
    const message = {
      ...baseMsgUpdateOrganizationResponse,
    } as MsgUpdateOrganizationResponse;
    return message;
  },
};

const baseMsgDeleteOrganization: object = { creator: "", id: "" };

export const MsgDeleteOrganization = {
  encode(
    message: MsgDeleteOrganization,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteOrganization {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteOrganization } as MsgDeleteOrganization;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteOrganization {
    const message = { ...baseMsgDeleteOrganization } as MsgDeleteOrganization;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    return message;
  },

  toJSON(message: MsgDeleteOrganization): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgDeleteOrganization>
  ): MsgDeleteOrganization {
    const message = { ...baseMsgDeleteOrganization } as MsgDeleteOrganization;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    return message;
  },
};

const baseMsgDeleteOrganizationResponse: object = {};

export const MsgDeleteOrganizationResponse = {
  encode(
    _: MsgDeleteOrganizationResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgDeleteOrganizationResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgDeleteOrganizationResponse,
    } as MsgDeleteOrganizationResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgDeleteOrganizationResponse {
    const message = {
      ...baseMsgDeleteOrganizationResponse,
    } as MsgDeleteOrganizationResponse;
    return message;
  },

  toJSON(_: MsgDeleteOrganizationResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgDeleteOrganizationResponse>
  ): MsgDeleteOrganizationResponse {
    const message = {
      ...baseMsgDeleteOrganizationResponse,
    } as MsgDeleteOrganizationResponse;
    return message;
  },
};

const baseMsgCreateComment: object = {
  creator: "",
  parentId: 0,
  body: "",
  attachments: "",
  diffHunk: "",
  path: "",
  system: false,
  authorAssociation: "",
  commentType: "",
};

export const MsgCreateComment = {
  encode(message: MsgCreateComment, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.parentId !== 0) {
      writer.uint32(16).uint64(message.parentId);
    }
    if (message.body !== "") {
      writer.uint32(26).string(message.body);
    }
    for (const v of message.attachments) {
      writer.uint32(34).string(v!);
    }
    if (message.diffHunk !== "") {
      writer.uint32(42).string(message.diffHunk);
    }
    if (message.path !== "") {
      writer.uint32(50).string(message.path);
    }
    if (message.system === true) {
      writer.uint32(56).bool(message.system);
    }
    if (message.authorAssociation !== "") {
      writer.uint32(66).string(message.authorAssociation);
    }
    if (message.commentType !== "") {
      writer.uint32(74).string(message.commentType);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateComment {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateComment } as MsgCreateComment;
    message.attachments = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.parentId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.body = reader.string();
          break;
        case 4:
          message.attachments.push(reader.string());
          break;
        case 5:
          message.diffHunk = reader.string();
          break;
        case 6:
          message.path = reader.string();
          break;
        case 7:
          message.system = reader.bool();
          break;
        case 8:
          message.authorAssociation = reader.string();
          break;
        case 9:
          message.commentType = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateComment {
    const message = { ...baseMsgCreateComment } as MsgCreateComment;
    message.attachments = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.parentId !== undefined && object.parentId !== null) {
      message.parentId = Number(object.parentId);
    } else {
      message.parentId = 0;
    }
    if (object.body !== undefined && object.body !== null) {
      message.body = String(object.body);
    } else {
      message.body = "";
    }
    if (object.attachments !== undefined && object.attachments !== null) {
      for (const e of object.attachments) {
        message.attachments.push(String(e));
      }
    }
    if (object.diffHunk !== undefined && object.diffHunk !== null) {
      message.diffHunk = String(object.diffHunk);
    } else {
      message.diffHunk = "";
    }
    if (object.path !== undefined && object.path !== null) {
      message.path = String(object.path);
    } else {
      message.path = "";
    }
    if (object.system !== undefined && object.system !== null) {
      message.system = Boolean(object.system);
    } else {
      message.system = false;
    }
    if (
      object.authorAssociation !== undefined &&
      object.authorAssociation !== null
    ) {
      message.authorAssociation = String(object.authorAssociation);
    } else {
      message.authorAssociation = "";
    }
    if (object.commentType !== undefined && object.commentType !== null) {
      message.commentType = String(object.commentType);
    } else {
      message.commentType = "";
    }
    return message;
  },

  toJSON(message: MsgCreateComment): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.parentId !== undefined && (obj.parentId = message.parentId);
    message.body !== undefined && (obj.body = message.body);
    if (message.attachments) {
      obj.attachments = message.attachments.map((e) => e);
    } else {
      obj.attachments = [];
    }
    message.diffHunk !== undefined && (obj.diffHunk = message.diffHunk);
    message.path !== undefined && (obj.path = message.path);
    message.system !== undefined && (obj.system = message.system);
    message.authorAssociation !== undefined &&
      (obj.authorAssociation = message.authorAssociation);
    message.commentType !== undefined &&
      (obj.commentType = message.commentType);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreateComment>): MsgCreateComment {
    const message = { ...baseMsgCreateComment } as MsgCreateComment;
    message.attachments = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.parentId !== undefined && object.parentId !== null) {
      message.parentId = object.parentId;
    } else {
      message.parentId = 0;
    }
    if (object.body !== undefined && object.body !== null) {
      message.body = object.body;
    } else {
      message.body = "";
    }
    if (object.attachments !== undefined && object.attachments !== null) {
      for (const e of object.attachments) {
        message.attachments.push(e);
      }
    }
    if (object.diffHunk !== undefined && object.diffHunk !== null) {
      message.diffHunk = object.diffHunk;
    } else {
      message.diffHunk = "";
    }
    if (object.path !== undefined && object.path !== null) {
      message.path = object.path;
    } else {
      message.path = "";
    }
    if (object.system !== undefined && object.system !== null) {
      message.system = object.system;
    } else {
      message.system = false;
    }
    if (
      object.authorAssociation !== undefined &&
      object.authorAssociation !== null
    ) {
      message.authorAssociation = object.authorAssociation;
    } else {
      message.authorAssociation = "";
    }
    if (object.commentType !== undefined && object.commentType !== null) {
      message.commentType = object.commentType;
    } else {
      message.commentType = "";
    }
    return message;
  },
};

const baseMsgCreateCommentResponse: object = { id: 0 };

export const MsgCreateCommentResponse = {
  encode(
    message: MsgCreateCommentResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgCreateCommentResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCreateCommentResponse,
    } as MsgCreateCommentResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateCommentResponse {
    const message = {
      ...baseMsgCreateCommentResponse,
    } as MsgCreateCommentResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: MsgCreateCommentResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCreateCommentResponse>
  ): MsgCreateCommentResponse {
    const message = {
      ...baseMsgCreateCommentResponse,
    } as MsgCreateCommentResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseMsgUpdateComment: object = {
  creator: "",
  id: 0,
  body: "",
  attachments: "",
};

export const MsgUpdateComment = {
  encode(message: MsgUpdateComment, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.body !== "") {
      writer.uint32(26).string(message.body);
    }
    for (const v of message.attachments) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateComment {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateComment } as MsgUpdateComment;
    message.attachments = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.body = reader.string();
          break;
        case 4:
          message.attachments.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateComment {
    const message = { ...baseMsgUpdateComment } as MsgUpdateComment;
    message.attachments = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.body !== undefined && object.body !== null) {
      message.body = String(object.body);
    } else {
      message.body = "";
    }
    if (object.attachments !== undefined && object.attachments !== null) {
      for (const e of object.attachments) {
        message.attachments.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: MsgUpdateComment): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.body !== undefined && (obj.body = message.body);
    if (message.attachments) {
      obj.attachments = message.attachments.map((e) => e);
    } else {
      obj.attachments = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpdateComment>): MsgUpdateComment {
    const message = { ...baseMsgUpdateComment } as MsgUpdateComment;
    message.attachments = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.body !== undefined && object.body !== null) {
      message.body = object.body;
    } else {
      message.body = "";
    }
    if (object.attachments !== undefined && object.attachments !== null) {
      for (const e of object.attachments) {
        message.attachments.push(e);
      }
    }
    return message;
  },
};

const baseMsgUpdateCommentResponse: object = {};

export const MsgUpdateCommentResponse = {
  encode(
    _: MsgUpdateCommentResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdateCommentResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateCommentResponse,
    } as MsgUpdateCommentResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateCommentResponse {
    const message = {
      ...baseMsgUpdateCommentResponse,
    } as MsgUpdateCommentResponse;
    return message;
  },

  toJSON(_: MsgUpdateCommentResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateCommentResponse>
  ): MsgUpdateCommentResponse {
    const message = {
      ...baseMsgUpdateCommentResponse,
    } as MsgUpdateCommentResponse;
    return message;
  },
};

const baseMsgDeleteComment: object = { creator: "", id: 0 };

export const MsgDeleteComment = {
  encode(message: MsgDeleteComment, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteComment {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteComment } as MsgDeleteComment;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteComment {
    const message = { ...baseMsgDeleteComment } as MsgDeleteComment;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: MsgDeleteComment): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgDeleteComment>): MsgDeleteComment {
    const message = { ...baseMsgDeleteComment } as MsgDeleteComment;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseMsgDeleteCommentResponse: object = {};

export const MsgDeleteCommentResponse = {
  encode(
    _: MsgDeleteCommentResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgDeleteCommentResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgDeleteCommentResponse,
    } as MsgDeleteCommentResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgDeleteCommentResponse {
    const message = {
      ...baseMsgDeleteCommentResponse,
    } as MsgDeleteCommentResponse;
    return message;
  },

  toJSON(_: MsgDeleteCommentResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgDeleteCommentResponse>
  ): MsgDeleteCommentResponse {
    const message = {
      ...baseMsgDeleteCommentResponse,
    } as MsgDeleteCommentResponse;
    return message;
  },
};

const baseMsgCreateIssue: object = {
  creator: "",
  title: "",
  description: "",
  repositoryId: 0,
  labels: "",
  weight: 0,
  assignees: "",
};

export const MsgCreateIssue = {
  encode(message: MsgCreateIssue, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.repositoryId !== 0) {
      writer.uint32(32).uint64(message.repositoryId);
    }
    for (const v of message.labels) {
      writer.uint32(42).string(v!);
    }
    if (message.weight !== 0) {
      writer.uint32(48).uint64(message.weight);
    }
    for (const v of message.assignees) {
      writer.uint32(58).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateIssue {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateIssue } as MsgCreateIssue;
    message.labels = [];
    message.assignees = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.title = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        case 4:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.labels.push(reader.string());
          break;
        case 6:
          message.weight = longToNumber(reader.uint64() as Long);
          break;
        case 7:
          message.assignees.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateIssue {
    const message = { ...baseMsgCreateIssue } as MsgCreateIssue;
    message.labels = [];
    message.assignees = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = Number(object.repositoryId);
    } else {
      message.repositoryId = 0;
    }
    if (object.labels !== undefined && object.labels !== null) {
      for (const e of object.labels) {
        message.labels.push(String(e));
      }
    }
    if (object.weight !== undefined && object.weight !== null) {
      message.weight = Number(object.weight);
    } else {
      message.weight = 0;
    }
    if (object.assignees !== undefined && object.assignees !== null) {
      for (const e of object.assignees) {
        message.assignees.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: MsgCreateIssue): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined &&
      (obj.description = message.description);
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId);
    if (message.labels) {
      obj.labels = message.labels.map((e) => e);
    } else {
      obj.labels = [];
    }
    message.weight !== undefined && (obj.weight = message.weight);
    if (message.assignees) {
      obj.assignees = message.assignees.map((e) => e);
    } else {
      obj.assignees = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreateIssue>): MsgCreateIssue {
    const message = { ...baseMsgCreateIssue } as MsgCreateIssue;
    message.labels = [];
    message.assignees = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    } else {
      message.title = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = object.repositoryId;
    } else {
      message.repositoryId = 0;
    }
    if (object.labels !== undefined && object.labels !== null) {
      for (const e of object.labels) {
        message.labels.push(e);
      }
    }
    if (object.weight !== undefined && object.weight !== null) {
      message.weight = object.weight;
    } else {
      message.weight = 0;
    }
    if (object.assignees !== undefined && object.assignees !== null) {
      for (const e of object.assignees) {
        message.assignees.push(e);
      }
    }
    return message;
  },
};

const baseMsgCreateIssueResponse: object = { id: 0, iid: 0 };

export const MsgCreateIssueResponse = {
  encode(
    message: MsgCreateIssueResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.iid !== 0) {
      writer.uint32(16).uint64(message.iid);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateIssueResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateIssueResponse } as MsgCreateIssueResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.iid = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateIssueResponse {
    const message = { ...baseMsgCreateIssueResponse } as MsgCreateIssueResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.iid !== undefined && object.iid !== null) {
      message.iid = Number(object.iid);
    } else {
      message.iid = 0;
    }
    return message;
  },

  toJSON(message: MsgCreateIssueResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.iid !== undefined && (obj.iid = message.iid);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCreateIssueResponse>
  ): MsgCreateIssueResponse {
    const message = { ...baseMsgCreateIssueResponse } as MsgCreateIssueResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.iid !== undefined && object.iid !== null) {
      message.iid = object.iid;
    } else {
      message.iid = 0;
    }
    return message;
  },
};

const baseMsgUpdateIssue: object = {
  creator: "",
  id: 0,
  title: "",
  description: "",
  labels: "",
  weight: 0,
  assignees: "",
};

export const MsgUpdateIssue = {
  encode(message: MsgUpdateIssue, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.title !== "") {
      writer.uint32(26).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    for (const v of message.labels) {
      writer.uint32(42).string(v!);
    }
    if (message.weight !== 0) {
      writer.uint32(48).uint64(message.weight);
    }
    for (const v of message.assignees) {
      writer.uint32(58).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateIssue {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateIssue } as MsgUpdateIssue;
    message.labels = [];
    message.assignees = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.title = reader.string();
          break;
        case 4:
          message.description = reader.string();
          break;
        case 5:
          message.labels.push(reader.string());
          break;
        case 6:
          message.weight = longToNumber(reader.uint64() as Long);
          break;
        case 7:
          message.assignees.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateIssue {
    const message = { ...baseMsgUpdateIssue } as MsgUpdateIssue;
    message.labels = [];
    message.assignees = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.labels !== undefined && object.labels !== null) {
      for (const e of object.labels) {
        message.labels.push(String(e));
      }
    }
    if (object.weight !== undefined && object.weight !== null) {
      message.weight = Number(object.weight);
    } else {
      message.weight = 0;
    }
    if (object.assignees !== undefined && object.assignees !== null) {
      for (const e of object.assignees) {
        message.assignees.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: MsgUpdateIssue): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined &&
      (obj.description = message.description);
    if (message.labels) {
      obj.labels = message.labels.map((e) => e);
    } else {
      obj.labels = [];
    }
    message.weight !== undefined && (obj.weight = message.weight);
    if (message.assignees) {
      obj.assignees = message.assignees.map((e) => e);
    } else {
      obj.assignees = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpdateIssue>): MsgUpdateIssue {
    const message = { ...baseMsgUpdateIssue } as MsgUpdateIssue;
    message.labels = [];
    message.assignees = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    } else {
      message.title = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.labels !== undefined && object.labels !== null) {
      for (const e of object.labels) {
        message.labels.push(e);
      }
    }
    if (object.weight !== undefined && object.weight !== null) {
      message.weight = object.weight;
    } else {
      message.weight = 0;
    }
    if (object.assignees !== undefined && object.assignees !== null) {
      for (const e of object.assignees) {
        message.assignees.push(e);
      }
    }
    return message;
  },
};

const baseMsgUpdateIssueResponse: object = {};

export const MsgUpdateIssueResponse = {
  encode(_: MsgUpdateIssueResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateIssueResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateIssueResponse } as MsgUpdateIssueResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateIssueResponse {
    const message = { ...baseMsgUpdateIssueResponse } as MsgUpdateIssueResponse;
    return message;
  },

  toJSON(_: MsgUpdateIssueResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgUpdateIssueResponse>): MsgUpdateIssueResponse {
    const message = { ...baseMsgUpdateIssueResponse } as MsgUpdateIssueResponse;
    return message;
  },
};

const baseMsgUpdateIssueTitle: object = { creator: "", id: 0, title: "" };

export const MsgUpdateIssueTitle = {
  encode(
    message: MsgUpdateIssueTitle,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.title !== "") {
      writer.uint32(26).string(message.title);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateIssueTitle {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateIssueTitle } as MsgUpdateIssueTitle;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.title = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateIssueTitle {
    const message = { ...baseMsgUpdateIssueTitle } as MsgUpdateIssueTitle;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = "";
    }
    return message;
  },

  toJSON(message: MsgUpdateIssueTitle): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.title !== undefined && (obj.title = message.title);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpdateIssueTitle>): MsgUpdateIssueTitle {
    const message = { ...baseMsgUpdateIssueTitle } as MsgUpdateIssueTitle;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    } else {
      message.title = "";
    }
    return message;
  },
};

const baseMsgUpdateIssueTitleResponse: object = {};

export const MsgUpdateIssueTitleResponse = {
  encode(
    _: MsgUpdateIssueTitleResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdateIssueTitleResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateIssueTitleResponse,
    } as MsgUpdateIssueTitleResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateIssueTitleResponse {
    const message = {
      ...baseMsgUpdateIssueTitleResponse,
    } as MsgUpdateIssueTitleResponse;
    return message;
  },

  toJSON(_: MsgUpdateIssueTitleResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateIssueTitleResponse>
  ): MsgUpdateIssueTitleResponse {
    const message = {
      ...baseMsgUpdateIssueTitleResponse,
    } as MsgUpdateIssueTitleResponse;
    return message;
  },
};

const baseMsgUpdateIssueDescription: object = {
  creator: "",
  id: 0,
  description: "",
};

export const MsgUpdateIssueDescription = {
  encode(
    message: MsgUpdateIssueDescription,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdateIssueDescription {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateIssueDescription,
    } as MsgUpdateIssueDescription;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateIssueDescription {
    const message = {
      ...baseMsgUpdateIssueDescription,
    } as MsgUpdateIssueDescription;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    return message;
  },

  toJSON(message: MsgUpdateIssueDescription): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.description !== undefined &&
      (obj.description = message.description);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgUpdateIssueDescription>
  ): MsgUpdateIssueDescription {
    const message = {
      ...baseMsgUpdateIssueDescription,
    } as MsgUpdateIssueDescription;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    return message;
  },
};

const baseMsgUpdateIssueDescriptionResponse: object = {};

export const MsgUpdateIssueDescriptionResponse = {
  encode(
    _: MsgUpdateIssueDescriptionResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdateIssueDescriptionResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateIssueDescriptionResponse,
    } as MsgUpdateIssueDescriptionResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateIssueDescriptionResponse {
    const message = {
      ...baseMsgUpdateIssueDescriptionResponse,
    } as MsgUpdateIssueDescriptionResponse;
    return message;
  },

  toJSON(_: MsgUpdateIssueDescriptionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateIssueDescriptionResponse>
  ): MsgUpdateIssueDescriptionResponse {
    const message = {
      ...baseMsgUpdateIssueDescriptionResponse,
    } as MsgUpdateIssueDescriptionResponse;
    return message;
  },
};

const baseMsgToggleIssueState: object = { creator: "", id: 0 };

export const MsgToggleIssueState = {
  encode(
    message: MsgToggleIssueState,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgToggleIssueState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgToggleIssueState } as MsgToggleIssueState;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgToggleIssueState {
    const message = { ...baseMsgToggleIssueState } as MsgToggleIssueState;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: MsgToggleIssueState): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgToggleIssueState>): MsgToggleIssueState {
    const message = { ...baseMsgToggleIssueState } as MsgToggleIssueState;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseMsgToggleIssueStateResponse: object = { state: "" };

export const MsgToggleIssueStateResponse = {
  encode(
    message: MsgToggleIssueStateResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.state !== "") {
      writer.uint32(10).string(message.state);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgToggleIssueStateResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgToggleIssueStateResponse,
    } as MsgToggleIssueStateResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.state = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgToggleIssueStateResponse {
    const message = {
      ...baseMsgToggleIssueStateResponse,
    } as MsgToggleIssueStateResponse;
    if (object.state !== undefined && object.state !== null) {
      message.state = String(object.state);
    } else {
      message.state = "";
    }
    return message;
  },

  toJSON(message: MsgToggleIssueStateResponse): unknown {
    const obj: any = {};
    message.state !== undefined && (obj.state = message.state);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgToggleIssueStateResponse>
  ): MsgToggleIssueStateResponse {
    const message = {
      ...baseMsgToggleIssueStateResponse,
    } as MsgToggleIssueStateResponse;
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    } else {
      message.state = "";
    }
    return message;
  },
};

const baseMsgDeleteIssue: object = { creator: "", id: 0 };

export const MsgDeleteIssue = {
  encode(message: MsgDeleteIssue, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteIssue {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteIssue } as MsgDeleteIssue;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteIssue {
    const message = { ...baseMsgDeleteIssue } as MsgDeleteIssue;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: MsgDeleteIssue): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgDeleteIssue>): MsgDeleteIssue {
    const message = { ...baseMsgDeleteIssue } as MsgDeleteIssue;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseMsgDeleteIssueResponse: object = {};

export const MsgDeleteIssueResponse = {
  encode(_: MsgDeleteIssueResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteIssueResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteIssueResponse } as MsgDeleteIssueResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgDeleteIssueResponse {
    const message = { ...baseMsgDeleteIssueResponse } as MsgDeleteIssueResponse;
    return message;
  },

  toJSON(_: MsgDeleteIssueResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgDeleteIssueResponse>): MsgDeleteIssueResponse {
    const message = { ...baseMsgDeleteIssueResponse } as MsgDeleteIssueResponse;
    return message;
  },
};

const baseMsgCreateRepository: object = {
  creator: "",
  name: "",
  ownerId: "",
  ownerType: "",
  description: "",
};

export const MsgCreateRepository = {
  encode(
    message: MsgCreateRepository,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.ownerId !== "") {
      writer.uint32(26).string(message.ownerId);
    }
    if (message.ownerType !== "") {
      writer.uint32(34).string(message.ownerType);
    }
    if (message.description !== "") {
      writer.uint32(42).string(message.description);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateRepository {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateRepository } as MsgCreateRepository;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.ownerId = reader.string();
          break;
        case 4:
          message.ownerType = reader.string();
          break;
        case 5:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateRepository {
    const message = { ...baseMsgCreateRepository } as MsgCreateRepository;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.ownerId !== undefined && object.ownerId !== null) {
      message.ownerId = String(object.ownerId);
    } else {
      message.ownerId = "";
    }
    if (object.ownerType !== undefined && object.ownerType !== null) {
      message.ownerType = String(object.ownerType);
    } else {
      message.ownerType = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    return message;
  },

  toJSON(message: MsgCreateRepository): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.name !== undefined && (obj.name = message.name);
    message.ownerId !== undefined && (obj.ownerId = message.ownerId);
    message.ownerType !== undefined && (obj.ownerType = message.ownerType);
    message.description !== undefined &&
      (obj.description = message.description);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreateRepository>): MsgCreateRepository {
    const message = { ...baseMsgCreateRepository } as MsgCreateRepository;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.ownerId !== undefined && object.ownerId !== null) {
      message.ownerId = object.ownerId;
    } else {
      message.ownerId = "";
    }
    if (object.ownerType !== undefined && object.ownerType !== null) {
      message.ownerType = object.ownerType;
    } else {
      message.ownerType = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    return message;
  },
};

const baseMsgCreateRepositoryResponse: object = { id: 0, name: "" };

export const MsgCreateRepositoryResponse = {
  encode(
    message: MsgCreateRepositoryResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgCreateRepositoryResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCreateRepositoryResponse,
    } as MsgCreateRepositoryResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateRepositoryResponse {
    const message = {
      ...baseMsgCreateRepositoryResponse,
    } as MsgCreateRepositoryResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    return message;
  },

  toJSON(message: MsgCreateRepositoryResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCreateRepositoryResponse>
  ): MsgCreateRepositoryResponse {
    const message = {
      ...baseMsgCreateRepositoryResponse,
    } as MsgCreateRepositoryResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    return message;
  },
};

const baseMsgForkRepository: object = {
  creator: "",
  repositoryId: 0,
  ownerId: "",
  ownerType: "",
};

export const MsgForkRepository = {
  encode(message: MsgForkRepository, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== 0) {
      writer.uint32(16).uint64(message.repositoryId);
    }
    if (message.ownerId !== "") {
      writer.uint32(26).string(message.ownerId);
    }
    if (message.ownerType !== "") {
      writer.uint32(34).string(message.ownerType);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgForkRepository {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgForkRepository } as MsgForkRepository;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.ownerId = reader.string();
          break;
        case 4:
          message.ownerType = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgForkRepository {
    const message = { ...baseMsgForkRepository } as MsgForkRepository;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = Number(object.repositoryId);
    } else {
      message.repositoryId = 0;
    }
    if (object.ownerId !== undefined && object.ownerId !== null) {
      message.ownerId = String(object.ownerId);
    } else {
      message.ownerId = "";
    }
    if (object.ownerType !== undefined && object.ownerType !== null) {
      message.ownerType = String(object.ownerType);
    } else {
      message.ownerType = "";
    }
    return message;
  },

  toJSON(message: MsgForkRepository): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId);
    message.ownerId !== undefined && (obj.ownerId = message.ownerId);
    message.ownerType !== undefined && (obj.ownerType = message.ownerType);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgForkRepository>): MsgForkRepository {
    const message = { ...baseMsgForkRepository } as MsgForkRepository;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = object.repositoryId;
    } else {
      message.repositoryId = 0;
    }
    if (object.ownerId !== undefined && object.ownerId !== null) {
      message.ownerId = object.ownerId;
    } else {
      message.ownerId = "";
    }
    if (object.ownerType !== undefined && object.ownerType !== null) {
      message.ownerType = object.ownerType;
    } else {
      message.ownerType = "";
    }
    return message;
  },
};

const baseMsgForkRepositoryResponse: object = { id: 0 };

export const MsgForkRepositoryResponse = {
  encode(
    message: MsgForkRepositoryResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgForkRepositoryResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgForkRepositoryResponse,
    } as MsgForkRepositoryResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgForkRepositoryResponse {
    const message = {
      ...baseMsgForkRepositoryResponse,
    } as MsgForkRepositoryResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: MsgForkRepositoryResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgForkRepositoryResponse>
  ): MsgForkRepositoryResponse {
    const message = {
      ...baseMsgForkRepositoryResponse,
    } as MsgForkRepositoryResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseMsgRenameRepository: object = { creator: "", id: 0, name: "" };

export const MsgRenameRepository = {
  encode(
    message: MsgRenameRepository,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRenameRepository {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgRenameRepository } as MsgRenameRepository;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRenameRepository {
    const message = { ...baseMsgRenameRepository } as MsgRenameRepository;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    return message;
  },

  toJSON(message: MsgRenameRepository): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgRenameRepository>): MsgRenameRepository {
    const message = { ...baseMsgRenameRepository } as MsgRenameRepository;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    return message;
  },
};

const baseMsgRenameRepositoryResponse: object = {};

export const MsgRenameRepositoryResponse = {
  encode(
    _: MsgRenameRepositoryResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgRenameRepositoryResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgRenameRepositoryResponse,
    } as MsgRenameRepositoryResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgRenameRepositoryResponse {
    const message = {
      ...baseMsgRenameRepositoryResponse,
    } as MsgRenameRepositoryResponse;
    return message;
  },

  toJSON(_: MsgRenameRepositoryResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgRenameRepositoryResponse>
  ): MsgRenameRepositoryResponse {
    const message = {
      ...baseMsgRenameRepositoryResponse,
    } as MsgRenameRepositoryResponse;
    return message;
  },
};

const baseMsgChangeOwner: object = {
  creator: "",
  repositoryId: 0,
  ownerId: "",
  ownerType: "",
};

export const MsgChangeOwner = {
  encode(message: MsgChangeOwner, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== 0) {
      writer.uint32(16).uint64(message.repositoryId);
    }
    if (message.ownerId !== "") {
      writer.uint32(26).string(message.ownerId);
    }
    if (message.ownerType !== "") {
      writer.uint32(34).string(message.ownerType);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgChangeOwner {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgChangeOwner } as MsgChangeOwner;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.ownerId = reader.string();
          break;
        case 4:
          message.ownerType = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgChangeOwner {
    const message = { ...baseMsgChangeOwner } as MsgChangeOwner;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = Number(object.repositoryId);
    } else {
      message.repositoryId = 0;
    }
    if (object.ownerId !== undefined && object.ownerId !== null) {
      message.ownerId = String(object.ownerId);
    } else {
      message.ownerId = "";
    }
    if (object.ownerType !== undefined && object.ownerType !== null) {
      message.ownerType = String(object.ownerType);
    } else {
      message.ownerType = "";
    }
    return message;
  },

  toJSON(message: MsgChangeOwner): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId);
    message.ownerId !== undefined && (obj.ownerId = message.ownerId);
    message.ownerType !== undefined && (obj.ownerType = message.ownerType);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgChangeOwner>): MsgChangeOwner {
    const message = { ...baseMsgChangeOwner } as MsgChangeOwner;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = object.repositoryId;
    } else {
      message.repositoryId = 0;
    }
    if (object.ownerId !== undefined && object.ownerId !== null) {
      message.ownerId = object.ownerId;
    } else {
      message.ownerId = "";
    }
    if (object.ownerType !== undefined && object.ownerType !== null) {
      message.ownerType = object.ownerType;
    } else {
      message.ownerType = "";
    }
    return message;
  },
};

const baseMsgChangeOwnerResponse: object = {};

export const MsgChangeOwnerResponse = {
  encode(_: MsgChangeOwnerResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgChangeOwnerResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgChangeOwnerResponse } as MsgChangeOwnerResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgChangeOwnerResponse {
    const message = { ...baseMsgChangeOwnerResponse } as MsgChangeOwnerResponse;
    return message;
  },

  toJSON(_: MsgChangeOwnerResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgChangeOwnerResponse>): MsgChangeOwnerResponse {
    const message = { ...baseMsgChangeOwnerResponse } as MsgChangeOwnerResponse;
    return message;
  },
};

const baseMsgUpdateRepositoryCollaborator: object = {
  creator: "",
  id: 0,
  user: "",
  role: "",
};

export const MsgUpdateRepositoryCollaborator = {
  encode(
    message: MsgUpdateRepositoryCollaborator,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.user !== "") {
      writer.uint32(26).string(message.user);
    }
    if (message.role !== "") {
      writer.uint32(34).string(message.role);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdateRepositoryCollaborator {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateRepositoryCollaborator,
    } as MsgUpdateRepositoryCollaborator;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.user = reader.string();
          break;
        case 4:
          message.role = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateRepositoryCollaborator {
    const message = {
      ...baseMsgUpdateRepositoryCollaborator,
    } as MsgUpdateRepositoryCollaborator;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = String(object.user);
    } else {
      message.user = "";
    }
    if (object.role !== undefined && object.role !== null) {
      message.role = String(object.role);
    } else {
      message.role = "";
    }
    return message;
  },

  toJSON(message: MsgUpdateRepositoryCollaborator): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.user !== undefined && (obj.user = message.user);
    message.role !== undefined && (obj.role = message.role);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgUpdateRepositoryCollaborator>
  ): MsgUpdateRepositoryCollaborator {
    const message = {
      ...baseMsgUpdateRepositoryCollaborator,
    } as MsgUpdateRepositoryCollaborator;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = object.user;
    } else {
      message.user = "";
    }
    if (object.role !== undefined && object.role !== null) {
      message.role = object.role;
    } else {
      message.role = "";
    }
    return message;
  },
};

const baseMsgUpdateRepositoryCollaboratorResponse: object = {};

export const MsgUpdateRepositoryCollaboratorResponse = {
  encode(
    _: MsgUpdateRepositoryCollaboratorResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdateRepositoryCollaboratorResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateRepositoryCollaboratorResponse,
    } as MsgUpdateRepositoryCollaboratorResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateRepositoryCollaboratorResponse {
    const message = {
      ...baseMsgUpdateRepositoryCollaboratorResponse,
    } as MsgUpdateRepositoryCollaboratorResponse;
    return message;
  },

  toJSON(_: MsgUpdateRepositoryCollaboratorResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateRepositoryCollaboratorResponse>
  ): MsgUpdateRepositoryCollaboratorResponse {
    const message = {
      ...baseMsgUpdateRepositoryCollaboratorResponse,
    } as MsgUpdateRepositoryCollaboratorResponse;
    return message;
  },
};

const baseMsgRemoveRepositoryCollaborator: object = {
  creator: "",
  id: 0,
  user: "",
};

export const MsgRemoveRepositoryCollaborator = {
  encode(
    message: MsgRemoveRepositoryCollaborator,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.user !== "") {
      writer.uint32(26).string(message.user);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgRemoveRepositoryCollaborator {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgRemoveRepositoryCollaborator,
    } as MsgRemoveRepositoryCollaborator;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.user = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRemoveRepositoryCollaborator {
    const message = {
      ...baseMsgRemoveRepositoryCollaborator,
    } as MsgRemoveRepositoryCollaborator;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = String(object.user);
    } else {
      message.user = "";
    }
    return message;
  },

  toJSON(message: MsgRemoveRepositoryCollaborator): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.user !== undefined && (obj.user = message.user);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgRemoveRepositoryCollaborator>
  ): MsgRemoveRepositoryCollaborator {
    const message = {
      ...baseMsgRemoveRepositoryCollaborator,
    } as MsgRemoveRepositoryCollaborator;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = object.user;
    } else {
      message.user = "";
    }
    return message;
  },
};

const baseMsgRemoveRepositoryCollaboratorResponse: object = {};

export const MsgRemoveRepositoryCollaboratorResponse = {
  encode(
    _: MsgRemoveRepositoryCollaboratorResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgRemoveRepositoryCollaboratorResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgRemoveRepositoryCollaboratorResponse,
    } as MsgRemoveRepositoryCollaboratorResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgRemoveRepositoryCollaboratorResponse {
    const message = {
      ...baseMsgRemoveRepositoryCollaboratorResponse,
    } as MsgRemoveRepositoryCollaboratorResponse;
    return message;
  },

  toJSON(_: MsgRemoveRepositoryCollaboratorResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgRemoveRepositoryCollaboratorResponse>
  ): MsgRemoveRepositoryCollaboratorResponse {
    const message = {
      ...baseMsgRemoveRepositoryCollaboratorResponse,
    } as MsgRemoveRepositoryCollaboratorResponse;
    return message;
  },
};

const baseMsgCreateBranch: object = {
  creator: "",
  id: 0,
  name: "",
  commitSHA: "",
};

export const MsgCreateBranch = {
  encode(message: MsgCreateBranch, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.commitSHA !== "") {
      writer.uint32(34).string(message.commitSHA);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateBranch {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateBranch } as MsgCreateBranch;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.commitSHA = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateBranch {
    const message = { ...baseMsgCreateBranch } as MsgCreateBranch;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.commitSHA !== undefined && object.commitSHA !== null) {
      message.commitSHA = String(object.commitSHA);
    } else {
      message.commitSHA = "";
    }
    return message;
  },

  toJSON(message: MsgCreateBranch): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.commitSHA !== undefined && (obj.commitSHA = message.commitSHA);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreateBranch>): MsgCreateBranch {
    const message = { ...baseMsgCreateBranch } as MsgCreateBranch;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.commitSHA !== undefined && object.commitSHA !== null) {
      message.commitSHA = object.commitSHA;
    } else {
      message.commitSHA = "";
    }
    return message;
  },
};

const baseMsgCreateBranchResponse: object = {};

export const MsgCreateBranchResponse = {
  encode(_: MsgCreateBranchResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateBranchResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCreateBranchResponse,
    } as MsgCreateBranchResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgCreateBranchResponse {
    const message = {
      ...baseMsgCreateBranchResponse,
    } as MsgCreateBranchResponse;
    return message;
  },

  toJSON(_: MsgCreateBranchResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgCreateBranchResponse>
  ): MsgCreateBranchResponse {
    const message = {
      ...baseMsgCreateBranchResponse,
    } as MsgCreateBranchResponse;
    return message;
  },
};

const baseMsgSetDefaultBranch: object = { creator: "", id: 0, name: "" };

export const MsgSetDefaultBranch = {
  encode(
    message: MsgSetDefaultBranch,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSetDefaultBranch {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgSetDefaultBranch } as MsgSetDefaultBranch;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetDefaultBranch {
    const message = { ...baseMsgSetDefaultBranch } as MsgSetDefaultBranch;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    return message;
  },

  toJSON(message: MsgSetDefaultBranch): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgSetDefaultBranch>): MsgSetDefaultBranch {
    const message = { ...baseMsgSetDefaultBranch } as MsgSetDefaultBranch;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    return message;
  },
};

const baseMsgSetDefaultBranchResponse: object = {};

export const MsgSetDefaultBranchResponse = {
  encode(
    _: MsgSetDefaultBranchResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgSetDefaultBranchResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgSetDefaultBranchResponse,
    } as MsgSetDefaultBranchResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgSetDefaultBranchResponse {
    const message = {
      ...baseMsgSetDefaultBranchResponse,
    } as MsgSetDefaultBranchResponse;
    return message;
  },

  toJSON(_: MsgSetDefaultBranchResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgSetDefaultBranchResponse>
  ): MsgSetDefaultBranchResponse {
    const message = {
      ...baseMsgSetDefaultBranchResponse,
    } as MsgSetDefaultBranchResponse;
    return message;
  },
};

const baseMsgDeleteBranch: object = { creator: "", id: 0, name: "" };

export const MsgDeleteBranch = {
  encode(message: MsgDeleteBranch, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteBranch {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteBranch } as MsgDeleteBranch;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteBranch {
    const message = { ...baseMsgDeleteBranch } as MsgDeleteBranch;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    return message;
  },

  toJSON(message: MsgDeleteBranch): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgDeleteBranch>): MsgDeleteBranch {
    const message = { ...baseMsgDeleteBranch } as MsgDeleteBranch;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    return message;
  },
};

const baseMsgDeleteBranchResponse: object = {};

export const MsgDeleteBranchResponse = {
  encode(_: MsgDeleteBranchResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteBranchResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgDeleteBranchResponse,
    } as MsgDeleteBranchResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgDeleteBranchResponse {
    const message = {
      ...baseMsgDeleteBranchResponse,
    } as MsgDeleteBranchResponse;
    return message;
  },

  toJSON(_: MsgDeleteBranchResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgDeleteBranchResponse>
  ): MsgDeleteBranchResponse {
    const message = {
      ...baseMsgDeleteBranchResponse,
    } as MsgDeleteBranchResponse;
    return message;
  },
};

const baseMsgCreateTag: object = { creator: "", id: 0, name: "", sha: "" };

export const MsgCreateTag = {
  encode(message: MsgCreateTag, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.sha !== "") {
      writer.uint32(34).string(message.sha);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateTag {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateTag } as MsgCreateTag;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.sha = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateTag {
    const message = { ...baseMsgCreateTag } as MsgCreateTag;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.sha !== undefined && object.sha !== null) {
      message.sha = String(object.sha);
    } else {
      message.sha = "";
    }
    return message;
  },

  toJSON(message: MsgCreateTag): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.sha !== undefined && (obj.sha = message.sha);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreateTag>): MsgCreateTag {
    const message = { ...baseMsgCreateTag } as MsgCreateTag;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.sha !== undefined && object.sha !== null) {
      message.sha = object.sha;
    } else {
      message.sha = "";
    }
    return message;
  },
};

const baseMsgCreateTagResponse: object = {};

export const MsgCreateTagResponse = {
  encode(_: MsgCreateTagResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateTagResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateTagResponse } as MsgCreateTagResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgCreateTagResponse {
    const message = { ...baseMsgCreateTagResponse } as MsgCreateTagResponse;
    return message;
  },

  toJSON(_: MsgCreateTagResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgCreateTagResponse>): MsgCreateTagResponse {
    const message = { ...baseMsgCreateTagResponse } as MsgCreateTagResponse;
    return message;
  },
};

const baseMsgDeleteTag: object = { creator: "", id: 0, name: "" };

export const MsgDeleteTag = {
  encode(message: MsgDeleteTag, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteTag {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteTag } as MsgDeleteTag;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteTag {
    const message = { ...baseMsgDeleteTag } as MsgDeleteTag;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    return message;
  },

  toJSON(message: MsgDeleteTag): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgDeleteTag>): MsgDeleteTag {
    const message = { ...baseMsgDeleteTag } as MsgDeleteTag;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    return message;
  },
};

const baseMsgDeleteTagResponse: object = {};

export const MsgDeleteTagResponse = {
  encode(_: MsgDeleteTagResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteTagResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteTagResponse } as MsgDeleteTagResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgDeleteTagResponse {
    const message = { ...baseMsgDeleteTagResponse } as MsgDeleteTagResponse;
    return message;
  },

  toJSON(_: MsgDeleteTagResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgDeleteTagResponse>): MsgDeleteTagResponse {
    const message = { ...baseMsgDeleteTagResponse } as MsgDeleteTagResponse;
    return message;
  },
};

const baseMsgUpdateRepository: object = {
  creator: "",
  id: 0,
  name: "",
  owner: "",
  description: "",
  labels: "",
  license: "",
  defaultBranch: "",
};

export const MsgUpdateRepository = {
  encode(
    message: MsgUpdateRepository,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.owner !== "") {
      writer.uint32(34).string(message.owner);
    }
    if (message.description !== "") {
      writer.uint32(42).string(message.description);
    }
    if (message.labels !== "") {
      writer.uint32(50).string(message.labels);
    }
    if (message.license !== "") {
      writer.uint32(58).string(message.license);
    }
    if (message.defaultBranch !== "") {
      writer.uint32(66).string(message.defaultBranch);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateRepository {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateRepository } as MsgUpdateRepository;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.owner = reader.string();
          break;
        case 5:
          message.description = reader.string();
          break;
        case 6:
          message.labels = reader.string();
          break;
        case 7:
          message.license = reader.string();
          break;
        case 8:
          message.defaultBranch = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateRepository {
    const message = { ...baseMsgUpdateRepository } as MsgUpdateRepository;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner);
    } else {
      message.owner = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.labels !== undefined && object.labels !== null) {
      message.labels = String(object.labels);
    } else {
      message.labels = "";
    }
    if (object.license !== undefined && object.license !== null) {
      message.license = String(object.license);
    } else {
      message.license = "";
    }
    if (object.defaultBranch !== undefined && object.defaultBranch !== null) {
      message.defaultBranch = String(object.defaultBranch);
    } else {
      message.defaultBranch = "";
    }
    return message;
  },

  toJSON(message: MsgUpdateRepository): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.owner !== undefined && (obj.owner = message.owner);
    message.description !== undefined &&
      (obj.description = message.description);
    message.labels !== undefined && (obj.labels = message.labels);
    message.license !== undefined && (obj.license = message.license);
    message.defaultBranch !== undefined &&
      (obj.defaultBranch = message.defaultBranch);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpdateRepository>): MsgUpdateRepository {
    const message = { ...baseMsgUpdateRepository } as MsgUpdateRepository;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    } else {
      message.owner = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.labels !== undefined && object.labels !== null) {
      message.labels = object.labels;
    } else {
      message.labels = "";
    }
    if (object.license !== undefined && object.license !== null) {
      message.license = object.license;
    } else {
      message.license = "";
    }
    if (object.defaultBranch !== undefined && object.defaultBranch !== null) {
      message.defaultBranch = object.defaultBranch;
    } else {
      message.defaultBranch = "";
    }
    return message;
  },
};

const baseMsgUpdateRepositoryResponse: object = {};

export const MsgUpdateRepositoryResponse = {
  encode(
    _: MsgUpdateRepositoryResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdateRepositoryResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateRepositoryResponse,
    } as MsgUpdateRepositoryResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateRepositoryResponse {
    const message = {
      ...baseMsgUpdateRepositoryResponse,
    } as MsgUpdateRepositoryResponse;
    return message;
  },

  toJSON(_: MsgUpdateRepositoryResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateRepositoryResponse>
  ): MsgUpdateRepositoryResponse {
    const message = {
      ...baseMsgUpdateRepositoryResponse,
    } as MsgUpdateRepositoryResponse;
    return message;
  },
};

const baseMsgDeleteRepository: object = { creator: "", id: 0 };

export const MsgDeleteRepository = {
  encode(
    message: MsgDeleteRepository,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteRepository {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteRepository } as MsgDeleteRepository;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteRepository {
    const message = { ...baseMsgDeleteRepository } as MsgDeleteRepository;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: MsgDeleteRepository): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgDeleteRepository>): MsgDeleteRepository {
    const message = { ...baseMsgDeleteRepository } as MsgDeleteRepository;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseMsgDeleteRepositoryResponse: object = {};

export const MsgDeleteRepositoryResponse = {
  encode(
    _: MsgDeleteRepositoryResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgDeleteRepositoryResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgDeleteRepositoryResponse,
    } as MsgDeleteRepositoryResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgDeleteRepositoryResponse {
    const message = {
      ...baseMsgDeleteRepositoryResponse,
    } as MsgDeleteRepositoryResponse;
    return message;
  },

  toJSON(_: MsgDeleteRepositoryResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgDeleteRepositoryResponse>
  ): MsgDeleteRepositoryResponse {
    const message = {
      ...baseMsgDeleteRepositoryResponse,
    } as MsgDeleteRepositoryResponse;
    return message;
  },
};

const baseMsgCreateUser: object = {
  creator: "",
  username: "",
  usernameGithub: "",
  avatarUrl: "",
  followers: "",
  following: "",
  repositories: "",
  repositoriesArchived: "",
  organizations: "",
  starredRepos: "",
  subscriptions: "",
  email: "",
  bio: "",
  createdAt: "",
  updatedAt: "",
  extensions: "",
};

export const MsgCreateUser = {
  encode(message: MsgCreateUser, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.username !== "") {
      writer.uint32(18).string(message.username);
    }
    if (message.usernameGithub !== "") {
      writer.uint32(26).string(message.usernameGithub);
    }
    if (message.avatarUrl !== "") {
      writer.uint32(34).string(message.avatarUrl);
    }
    if (message.followers !== "") {
      writer.uint32(42).string(message.followers);
    }
    if (message.following !== "") {
      writer.uint32(50).string(message.following);
    }
    if (message.repositories !== "") {
      writer.uint32(58).string(message.repositories);
    }
    if (message.repositoriesArchived !== "") {
      writer.uint32(66).string(message.repositoriesArchived);
    }
    if (message.organizations !== "") {
      writer.uint32(74).string(message.organizations);
    }
    if (message.starredRepos !== "") {
      writer.uint32(82).string(message.starredRepos);
    }
    if (message.subscriptions !== "") {
      writer.uint32(90).string(message.subscriptions);
    }
    if (message.email !== "") {
      writer.uint32(98).string(message.email);
    }
    if (message.bio !== "") {
      writer.uint32(106).string(message.bio);
    }
    if (message.createdAt !== "") {
      writer.uint32(114).string(message.createdAt);
    }
    if (message.updatedAt !== "") {
      writer.uint32(122).string(message.updatedAt);
    }
    if (message.extensions !== "") {
      writer.uint32(130).string(message.extensions);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateUser {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateUser } as MsgCreateUser;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.username = reader.string();
          break;
        case 3:
          message.usernameGithub = reader.string();
          break;
        case 4:
          message.avatarUrl = reader.string();
          break;
        case 5:
          message.followers = reader.string();
          break;
        case 6:
          message.following = reader.string();
          break;
        case 7:
          message.repositories = reader.string();
          break;
        case 8:
          message.repositoriesArchived = reader.string();
          break;
        case 9:
          message.organizations = reader.string();
          break;
        case 10:
          message.starredRepos = reader.string();
          break;
        case 11:
          message.subscriptions = reader.string();
          break;
        case 12:
          message.email = reader.string();
          break;
        case 13:
          message.bio = reader.string();
          break;
        case 14:
          message.createdAt = reader.string();
          break;
        case 15:
          message.updatedAt = reader.string();
          break;
        case 16:
          message.extensions = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateUser {
    const message = { ...baseMsgCreateUser } as MsgCreateUser;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = String(object.username);
    } else {
      message.username = "";
    }
    if (object.usernameGithub !== undefined && object.usernameGithub !== null) {
      message.usernameGithub = String(object.usernameGithub);
    } else {
      message.usernameGithub = "";
    }
    if (object.avatarUrl !== undefined && object.avatarUrl !== null) {
      message.avatarUrl = String(object.avatarUrl);
    } else {
      message.avatarUrl = "";
    }
    if (object.followers !== undefined && object.followers !== null) {
      message.followers = String(object.followers);
    } else {
      message.followers = "";
    }
    if (object.following !== undefined && object.following !== null) {
      message.following = String(object.following);
    } else {
      message.following = "";
    }
    if (object.repositories !== undefined && object.repositories !== null) {
      message.repositories = String(object.repositories);
    } else {
      message.repositories = "";
    }
    if (
      object.repositoriesArchived !== undefined &&
      object.repositoriesArchived !== null
    ) {
      message.repositoriesArchived = String(object.repositoriesArchived);
    } else {
      message.repositoriesArchived = "";
    }
    if (object.organizations !== undefined && object.organizations !== null) {
      message.organizations = String(object.organizations);
    } else {
      message.organizations = "";
    }
    if (object.starredRepos !== undefined && object.starredRepos !== null) {
      message.starredRepos = String(object.starredRepos);
    } else {
      message.starredRepos = "";
    }
    if (object.subscriptions !== undefined && object.subscriptions !== null) {
      message.subscriptions = String(object.subscriptions);
    } else {
      message.subscriptions = "";
    }
    if (object.email !== undefined && object.email !== null) {
      message.email = String(object.email);
    } else {
      message.email = "";
    }
    if (object.bio !== undefined && object.bio !== null) {
      message.bio = String(object.bio);
    } else {
      message.bio = "";
    }
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = String(object.createdAt);
    } else {
      message.createdAt = "";
    }
    if (object.updatedAt !== undefined && object.updatedAt !== null) {
      message.updatedAt = String(object.updatedAt);
    } else {
      message.updatedAt = "";
    }
    if (object.extensions !== undefined && object.extensions !== null) {
      message.extensions = String(object.extensions);
    } else {
      message.extensions = "";
    }
    return message;
  },

  toJSON(message: MsgCreateUser): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.username !== undefined && (obj.username = message.username);
    message.usernameGithub !== undefined &&
      (obj.usernameGithub = message.usernameGithub);
    message.avatarUrl !== undefined && (obj.avatarUrl = message.avatarUrl);
    message.followers !== undefined && (obj.followers = message.followers);
    message.following !== undefined && (obj.following = message.following);
    message.repositories !== undefined &&
      (obj.repositories = message.repositories);
    message.repositoriesArchived !== undefined &&
      (obj.repositoriesArchived = message.repositoriesArchived);
    message.organizations !== undefined &&
      (obj.organizations = message.organizations);
    message.starredRepos !== undefined &&
      (obj.starredRepos = message.starredRepos);
    message.subscriptions !== undefined &&
      (obj.subscriptions = message.subscriptions);
    message.email !== undefined && (obj.email = message.email);
    message.bio !== undefined && (obj.bio = message.bio);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt);
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt);
    message.extensions !== undefined && (obj.extensions = message.extensions);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreateUser>): MsgCreateUser {
    const message = { ...baseMsgCreateUser } as MsgCreateUser;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = object.username;
    } else {
      message.username = "";
    }
    if (object.usernameGithub !== undefined && object.usernameGithub !== null) {
      message.usernameGithub = object.usernameGithub;
    } else {
      message.usernameGithub = "";
    }
    if (object.avatarUrl !== undefined && object.avatarUrl !== null) {
      message.avatarUrl = object.avatarUrl;
    } else {
      message.avatarUrl = "";
    }
    if (object.followers !== undefined && object.followers !== null) {
      message.followers = object.followers;
    } else {
      message.followers = "";
    }
    if (object.following !== undefined && object.following !== null) {
      message.following = object.following;
    } else {
      message.following = "";
    }
    if (object.repositories !== undefined && object.repositories !== null) {
      message.repositories = object.repositories;
    } else {
      message.repositories = "";
    }
    if (
      object.repositoriesArchived !== undefined &&
      object.repositoriesArchived !== null
    ) {
      message.repositoriesArchived = object.repositoriesArchived;
    } else {
      message.repositoriesArchived = "";
    }
    if (object.organizations !== undefined && object.organizations !== null) {
      message.organizations = object.organizations;
    } else {
      message.organizations = "";
    }
    if (object.starredRepos !== undefined && object.starredRepos !== null) {
      message.starredRepos = object.starredRepos;
    } else {
      message.starredRepos = "";
    }
    if (object.subscriptions !== undefined && object.subscriptions !== null) {
      message.subscriptions = object.subscriptions;
    } else {
      message.subscriptions = "";
    }
    if (object.email !== undefined && object.email !== null) {
      message.email = object.email;
    } else {
      message.email = "";
    }
    if (object.bio !== undefined && object.bio !== null) {
      message.bio = object.bio;
    } else {
      message.bio = "";
    }
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = object.createdAt;
    } else {
      message.createdAt = "";
    }
    if (object.updatedAt !== undefined && object.updatedAt !== null) {
      message.updatedAt = object.updatedAt;
    } else {
      message.updatedAt = "";
    }
    if (object.extensions !== undefined && object.extensions !== null) {
      message.extensions = object.extensions;
    } else {
      message.extensions = "";
    }
    return message;
  },
};

const baseMsgCreateUserResponse: object = { id: "" };

export const MsgCreateUserResponse = {
  encode(
    message: MsgCreateUserResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateUserResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateUserResponse } as MsgCreateUserResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateUserResponse {
    const message = { ...baseMsgCreateUserResponse } as MsgCreateUserResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    return message;
  },

  toJSON(message: MsgCreateUserResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCreateUserResponse>
  ): MsgCreateUserResponse {
    const message = { ...baseMsgCreateUserResponse } as MsgCreateUserResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    return message;
  },
};

const baseMsgUpdateUser: object = {
  creator: "",
  id: "",
  username: "",
  usernameGithub: "",
  avatarUrl: "",
  followers: "",
  following: "",
  repositories: "",
  repositoriesArchived: "",
  organizations: "",
  starredRepos: "",
  subscriptions: "",
  email: "",
  bio: "",
  createdAt: "",
  updatedAt: "",
  extensions: "",
};

export const MsgUpdateUser = {
  encode(message: MsgUpdateUser, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.username !== "") {
      writer.uint32(26).string(message.username);
    }
    if (message.usernameGithub !== "") {
      writer.uint32(34).string(message.usernameGithub);
    }
    if (message.avatarUrl !== "") {
      writer.uint32(42).string(message.avatarUrl);
    }
    if (message.followers !== "") {
      writer.uint32(50).string(message.followers);
    }
    if (message.following !== "") {
      writer.uint32(58).string(message.following);
    }
    if (message.repositories !== "") {
      writer.uint32(66).string(message.repositories);
    }
    if (message.repositoriesArchived !== "") {
      writer.uint32(74).string(message.repositoriesArchived);
    }
    if (message.organizations !== "") {
      writer.uint32(82).string(message.organizations);
    }
    if (message.starredRepos !== "") {
      writer.uint32(90).string(message.starredRepos);
    }
    if (message.subscriptions !== "") {
      writer.uint32(98).string(message.subscriptions);
    }
    if (message.email !== "") {
      writer.uint32(106).string(message.email);
    }
    if (message.bio !== "") {
      writer.uint32(114).string(message.bio);
    }
    if (message.createdAt !== "") {
      writer.uint32(122).string(message.createdAt);
    }
    if (message.updatedAt !== "") {
      writer.uint32(130).string(message.updatedAt);
    }
    if (message.extensions !== "") {
      writer.uint32(138).string(message.extensions);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateUser {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateUser } as MsgUpdateUser;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.username = reader.string();
          break;
        case 4:
          message.usernameGithub = reader.string();
          break;
        case 5:
          message.avatarUrl = reader.string();
          break;
        case 6:
          message.followers = reader.string();
          break;
        case 7:
          message.following = reader.string();
          break;
        case 8:
          message.repositories = reader.string();
          break;
        case 9:
          message.repositoriesArchived = reader.string();
          break;
        case 10:
          message.organizations = reader.string();
          break;
        case 11:
          message.starredRepos = reader.string();
          break;
        case 12:
          message.subscriptions = reader.string();
          break;
        case 13:
          message.email = reader.string();
          break;
        case 14:
          message.bio = reader.string();
          break;
        case 15:
          message.createdAt = reader.string();
          break;
        case 16:
          message.updatedAt = reader.string();
          break;
        case 17:
          message.extensions = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateUser {
    const message = { ...baseMsgUpdateUser } as MsgUpdateUser;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = String(object.username);
    } else {
      message.username = "";
    }
    if (object.usernameGithub !== undefined && object.usernameGithub !== null) {
      message.usernameGithub = String(object.usernameGithub);
    } else {
      message.usernameGithub = "";
    }
    if (object.avatarUrl !== undefined && object.avatarUrl !== null) {
      message.avatarUrl = String(object.avatarUrl);
    } else {
      message.avatarUrl = "";
    }
    if (object.followers !== undefined && object.followers !== null) {
      message.followers = String(object.followers);
    } else {
      message.followers = "";
    }
    if (object.following !== undefined && object.following !== null) {
      message.following = String(object.following);
    } else {
      message.following = "";
    }
    if (object.repositories !== undefined && object.repositories !== null) {
      message.repositories = String(object.repositories);
    } else {
      message.repositories = "";
    }
    if (
      object.repositoriesArchived !== undefined &&
      object.repositoriesArchived !== null
    ) {
      message.repositoriesArchived = String(object.repositoriesArchived);
    } else {
      message.repositoriesArchived = "";
    }
    if (object.organizations !== undefined && object.organizations !== null) {
      message.organizations = String(object.organizations);
    } else {
      message.organizations = "";
    }
    if (object.starredRepos !== undefined && object.starredRepos !== null) {
      message.starredRepos = String(object.starredRepos);
    } else {
      message.starredRepos = "";
    }
    if (object.subscriptions !== undefined && object.subscriptions !== null) {
      message.subscriptions = String(object.subscriptions);
    } else {
      message.subscriptions = "";
    }
    if (object.email !== undefined && object.email !== null) {
      message.email = String(object.email);
    } else {
      message.email = "";
    }
    if (object.bio !== undefined && object.bio !== null) {
      message.bio = String(object.bio);
    } else {
      message.bio = "";
    }
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = String(object.createdAt);
    } else {
      message.createdAt = "";
    }
    if (object.updatedAt !== undefined && object.updatedAt !== null) {
      message.updatedAt = String(object.updatedAt);
    } else {
      message.updatedAt = "";
    }
    if (object.extensions !== undefined && object.extensions !== null) {
      message.extensions = String(object.extensions);
    } else {
      message.extensions = "";
    }
    return message;
  },

  toJSON(message: MsgUpdateUser): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.username !== undefined && (obj.username = message.username);
    message.usernameGithub !== undefined &&
      (obj.usernameGithub = message.usernameGithub);
    message.avatarUrl !== undefined && (obj.avatarUrl = message.avatarUrl);
    message.followers !== undefined && (obj.followers = message.followers);
    message.following !== undefined && (obj.following = message.following);
    message.repositories !== undefined &&
      (obj.repositories = message.repositories);
    message.repositoriesArchived !== undefined &&
      (obj.repositoriesArchived = message.repositoriesArchived);
    message.organizations !== undefined &&
      (obj.organizations = message.organizations);
    message.starredRepos !== undefined &&
      (obj.starredRepos = message.starredRepos);
    message.subscriptions !== undefined &&
      (obj.subscriptions = message.subscriptions);
    message.email !== undefined && (obj.email = message.email);
    message.bio !== undefined && (obj.bio = message.bio);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt);
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt);
    message.extensions !== undefined && (obj.extensions = message.extensions);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpdateUser>): MsgUpdateUser {
    const message = { ...baseMsgUpdateUser } as MsgUpdateUser;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = object.username;
    } else {
      message.username = "";
    }
    if (object.usernameGithub !== undefined && object.usernameGithub !== null) {
      message.usernameGithub = object.usernameGithub;
    } else {
      message.usernameGithub = "";
    }
    if (object.avatarUrl !== undefined && object.avatarUrl !== null) {
      message.avatarUrl = object.avatarUrl;
    } else {
      message.avatarUrl = "";
    }
    if (object.followers !== undefined && object.followers !== null) {
      message.followers = object.followers;
    } else {
      message.followers = "";
    }
    if (object.following !== undefined && object.following !== null) {
      message.following = object.following;
    } else {
      message.following = "";
    }
    if (object.repositories !== undefined && object.repositories !== null) {
      message.repositories = object.repositories;
    } else {
      message.repositories = "";
    }
    if (
      object.repositoriesArchived !== undefined &&
      object.repositoriesArchived !== null
    ) {
      message.repositoriesArchived = object.repositoriesArchived;
    } else {
      message.repositoriesArchived = "";
    }
    if (object.organizations !== undefined && object.organizations !== null) {
      message.organizations = object.organizations;
    } else {
      message.organizations = "";
    }
    if (object.starredRepos !== undefined && object.starredRepos !== null) {
      message.starredRepos = object.starredRepos;
    } else {
      message.starredRepos = "";
    }
    if (object.subscriptions !== undefined && object.subscriptions !== null) {
      message.subscriptions = object.subscriptions;
    } else {
      message.subscriptions = "";
    }
    if (object.email !== undefined && object.email !== null) {
      message.email = object.email;
    } else {
      message.email = "";
    }
    if (object.bio !== undefined && object.bio !== null) {
      message.bio = object.bio;
    } else {
      message.bio = "";
    }
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = object.createdAt;
    } else {
      message.createdAt = "";
    }
    if (object.updatedAt !== undefined && object.updatedAt !== null) {
      message.updatedAt = object.updatedAt;
    } else {
      message.updatedAt = "";
    }
    if (object.extensions !== undefined && object.extensions !== null) {
      message.extensions = object.extensions;
    } else {
      message.extensions = "";
    }
    return message;
  },
};

const baseMsgUpdateUserResponse: object = {};

export const MsgUpdateUserResponse = {
  encode(_: MsgUpdateUserResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateUserResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateUserResponse } as MsgUpdateUserResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateUserResponse {
    const message = { ...baseMsgUpdateUserResponse } as MsgUpdateUserResponse;
    return message;
  },

  toJSON(_: MsgUpdateUserResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgUpdateUserResponse>): MsgUpdateUserResponse {
    const message = { ...baseMsgUpdateUserResponse } as MsgUpdateUserResponse;
    return message;
  },
};

const baseMsgDeleteUser: object = { creator: "", id: "" };

export const MsgDeleteUser = {
  encode(message: MsgDeleteUser, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteUser {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteUser } as MsgDeleteUser;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteUser {
    const message = { ...baseMsgDeleteUser } as MsgDeleteUser;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    return message;
  },

  toJSON(message: MsgDeleteUser): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgDeleteUser>): MsgDeleteUser {
    const message = { ...baseMsgDeleteUser } as MsgDeleteUser;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    return message;
  },
};

const baseMsgDeleteUserResponse: object = {};

export const MsgDeleteUserResponse = {
  encode(_: MsgDeleteUserResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteUserResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteUserResponse } as MsgDeleteUserResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgDeleteUserResponse {
    const message = { ...baseMsgDeleteUserResponse } as MsgDeleteUserResponse;
    return message;
  },

  toJSON(_: MsgDeleteUserResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgDeleteUserResponse>): MsgDeleteUserResponse {
    const message = { ...baseMsgDeleteUserResponse } as MsgDeleteUserResponse;
    return message;
  },
};

const baseMsgSetWhois: object = { creator: "", name: "", address: "" };

export const MsgSetWhois = {
  encode(message: MsgSetWhois, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.address !== "") {
      writer.uint32(26).string(message.address);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSetWhois {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgSetWhois } as MsgSetWhois;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetWhois {
    const message = { ...baseMsgSetWhois } as MsgSetWhois;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    return message;
  },

  toJSON(message: MsgSetWhois): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.name !== undefined && (obj.name = message.name);
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgSetWhois>): MsgSetWhois {
    const message = { ...baseMsgSetWhois } as MsgSetWhois;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    return message;
  },
};

const baseMsgSetWhoisResponse: object = {};

export const MsgSetWhoisResponse = {
  encode(_: MsgSetWhoisResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSetWhoisResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgSetWhoisResponse } as MsgSetWhoisResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgSetWhoisResponse {
    const message = { ...baseMsgSetWhoisResponse } as MsgSetWhoisResponse;
    return message;
  },

  toJSON(_: MsgSetWhoisResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgSetWhoisResponse>): MsgSetWhoisResponse {
    const message = { ...baseMsgSetWhoisResponse } as MsgSetWhoisResponse;
    return message;
  },
};

const baseMsgUpdateWhois: object = { creator: "", name: "", address: "" };

export const MsgUpdateWhois = {
  encode(message: MsgUpdateWhois, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.address !== "") {
      writer.uint32(26).string(message.address);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateWhois {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateWhois } as MsgUpdateWhois;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateWhois {
    const message = { ...baseMsgUpdateWhois } as MsgUpdateWhois;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    return message;
  },

  toJSON(message: MsgUpdateWhois): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.name !== undefined && (obj.name = message.name);
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpdateWhois>): MsgUpdateWhois {
    const message = { ...baseMsgUpdateWhois } as MsgUpdateWhois;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    return message;
  },
};

const baseMsgUpdateWhoisResponse: object = {};

export const MsgUpdateWhoisResponse = {
  encode(_: MsgUpdateWhoisResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateWhoisResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateWhoisResponse } as MsgUpdateWhoisResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateWhoisResponse {
    const message = { ...baseMsgUpdateWhoisResponse } as MsgUpdateWhoisResponse;
    return message;
  },

  toJSON(_: MsgUpdateWhoisResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgUpdateWhoisResponse>): MsgUpdateWhoisResponse {
    const message = { ...baseMsgUpdateWhoisResponse } as MsgUpdateWhoisResponse;
    return message;
  },
};

const baseMsgDeleteWhois: object = { creator: "", name: "" };

export const MsgDeleteWhois = {
  encode(message: MsgDeleteWhois, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteWhois {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteWhois } as MsgDeleteWhois;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteWhois {
    const message = { ...baseMsgDeleteWhois } as MsgDeleteWhois;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    return message;
  },

  toJSON(message: MsgDeleteWhois): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgDeleteWhois>): MsgDeleteWhois {
    const message = { ...baseMsgDeleteWhois } as MsgDeleteWhois;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    return message;
  },
};

const baseMsgDeleteWhoisResponse: object = {};

export const MsgDeleteWhoisResponse = {
  encode(_: MsgDeleteWhoisResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteWhoisResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteWhoisResponse } as MsgDeleteWhoisResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgDeleteWhoisResponse {
    const message = { ...baseMsgDeleteWhoisResponse } as MsgDeleteWhoisResponse;
    return message;
  },

  toJSON(_: MsgDeleteWhoisResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgDeleteWhoisResponse>): MsgDeleteWhoisResponse {
    const message = { ...baseMsgDeleteWhoisResponse } as MsgDeleteWhoisResponse;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** this line is used by starport scaffolding # proto/tx/rpc */
  CreatePullRequest(
    request: MsgCreatePullRequest
  ): Promise<MsgCreatePullRequestResponse>;
  UpdatePullRequest(
    request: MsgUpdatePullRequest
  ): Promise<MsgUpdatePullRequestResponse>;
  UpdatePullRequestTitle(
    request: MsgUpdatePullRequestTitle
  ): Promise<MsgUpdatePullRequestTitleResponse>;
  UpdatePullRequestDescription(
    request: MsgUpdatePullRequestDescription
  ): Promise<MsgUpdatePullRequestDescriptionResponse>;
  SetPullRequestState(
    request: MsgSetPullRequestState
  ): Promise<MsgSetPullRequestStateResponse>;
  DeletePullRequest(
    request: MsgDeletePullRequest
  ): Promise<MsgDeletePullRequestResponse>;
  CreateOrganization(
    request: MsgCreateOrganization
  ): Promise<MsgCreateOrganizationResponse>;
  UpdateOrganizationMember(
    request: MsgUpdateOrganizationMember
  ): Promise<MsgUpdateOrganizationMemberResponse>;
  RemoveOrganizationMember(
    request: MsgRemoveOrganizationMember
  ): Promise<MsgRemoveOrganizationMemberResponse>;
  UpdateOrganization(
    request: MsgUpdateOrganization
  ): Promise<MsgUpdateOrganizationResponse>;
  DeleteOrganization(
    request: MsgDeleteOrganization
  ): Promise<MsgDeleteOrganizationResponse>;
  CreateComment(request: MsgCreateComment): Promise<MsgCreateCommentResponse>;
  UpdateComment(request: MsgUpdateComment): Promise<MsgUpdateCommentResponse>;
  DeleteComment(request: MsgDeleteComment): Promise<MsgDeleteCommentResponse>;
  CreateIssue(request: MsgCreateIssue): Promise<MsgCreateIssueResponse>;
  UpdateIssue(request: MsgUpdateIssue): Promise<MsgUpdateIssueResponse>;
  UpdateIssueTitle(
    request: MsgUpdateIssueTitle
  ): Promise<MsgUpdateIssueTitleResponse>;
  UpdateIssueDescription(
    request: MsgUpdateIssueDescription
  ): Promise<MsgUpdateIssueDescriptionResponse>;
  ToggleIssueState(
    request: MsgToggleIssueState
  ): Promise<MsgToggleIssueStateResponse>;
  DeleteIssue(request: MsgDeleteIssue): Promise<MsgDeleteIssueResponse>;
  CreateRepository(
    request: MsgCreateRepository
  ): Promise<MsgCreateRepositoryResponse>;
  ForkRepository(
    request: MsgForkRepository
  ): Promise<MsgForkRepositoryResponse>;
  RenameRepository(
    request: MsgRenameRepository
  ): Promise<MsgRenameRepositoryResponse>;
  ChangeOwner(request: MsgChangeOwner): Promise<MsgChangeOwnerResponse>;
  UpdateRepositoryCollaborator(
    request: MsgUpdateRepositoryCollaborator
  ): Promise<MsgUpdateRepositoryCollaboratorResponse>;
  RemoveRepositoryCollaborator(
    request: MsgRemoveRepositoryCollaborator
  ): Promise<MsgRemoveRepositoryCollaboratorResponse>;
  CreateBranch(request: MsgCreateBranch): Promise<MsgCreateBranchResponse>;
  SetDefaultBranch(
    request: MsgSetDefaultBranch
  ): Promise<MsgSetDefaultBranchResponse>;
  DeleteBranch(request: MsgDeleteBranch): Promise<MsgDeleteBranchResponse>;
  CreateTag(request: MsgCreateTag): Promise<MsgCreateTagResponse>;
  DeleteTag(request: MsgDeleteTag): Promise<MsgDeleteTagResponse>;
  UpdateRepository(
    request: MsgUpdateRepository
  ): Promise<MsgUpdateRepositoryResponse>;
  DeleteRepository(
    request: MsgDeleteRepository
  ): Promise<MsgDeleteRepositoryResponse>;
  CreateUser(request: MsgCreateUser): Promise<MsgCreateUserResponse>;
  UpdateUser(request: MsgUpdateUser): Promise<MsgUpdateUserResponse>;
  DeleteUser(request: MsgDeleteUser): Promise<MsgDeleteUserResponse>;
  SetWhois(request: MsgSetWhois): Promise<MsgSetWhoisResponse>;
  UpdateWhois(request: MsgUpdateWhois): Promise<MsgUpdateWhoisResponse>;
  DeleteWhois(request: MsgDeleteWhois): Promise<MsgDeleteWhoisResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  CreatePullRequest(
    request: MsgCreatePullRequest
  ): Promise<MsgCreatePullRequestResponse> {
    const data = MsgCreatePullRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "CreatePullRequest",
      data
    );
    return promise.then((data) =>
      MsgCreatePullRequestResponse.decode(new Reader(data))
    );
  }

  UpdatePullRequest(
    request: MsgUpdatePullRequest
  ): Promise<MsgUpdatePullRequestResponse> {
    const data = MsgUpdatePullRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "UpdatePullRequest",
      data
    );
    return promise.then((data) =>
      MsgUpdatePullRequestResponse.decode(new Reader(data))
    );
  }

  UpdatePullRequestTitle(
    request: MsgUpdatePullRequestTitle
  ): Promise<MsgUpdatePullRequestTitleResponse> {
    const data = MsgUpdatePullRequestTitle.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "UpdatePullRequestTitle",
      data
    );
    return promise.then((data) =>
      MsgUpdatePullRequestTitleResponse.decode(new Reader(data))
    );
  }

  UpdatePullRequestDescription(
    request: MsgUpdatePullRequestDescription
  ): Promise<MsgUpdatePullRequestDescriptionResponse> {
    const data = MsgUpdatePullRequestDescription.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "UpdatePullRequestDescription",
      data
    );
    return promise.then((data) =>
      MsgUpdatePullRequestDescriptionResponse.decode(new Reader(data))
    );
  }

  SetPullRequestState(
    request: MsgSetPullRequestState
  ): Promise<MsgSetPullRequestStateResponse> {
    const data = MsgSetPullRequestState.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "SetPullRequestState",
      data
    );
    return promise.then((data) =>
      MsgSetPullRequestStateResponse.decode(new Reader(data))
    );
  }

  DeletePullRequest(
    request: MsgDeletePullRequest
  ): Promise<MsgDeletePullRequestResponse> {
    const data = MsgDeletePullRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "DeletePullRequest",
      data
    );
    return promise.then((data) =>
      MsgDeletePullRequestResponse.decode(new Reader(data))
    );
  }

  CreateOrganization(
    request: MsgCreateOrganization
  ): Promise<MsgCreateOrganizationResponse> {
    const data = MsgCreateOrganization.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "CreateOrganization",
      data
    );
    return promise.then((data) =>
      MsgCreateOrganizationResponse.decode(new Reader(data))
    );
  }

  UpdateOrganizationMember(
    request: MsgUpdateOrganizationMember
  ): Promise<MsgUpdateOrganizationMemberResponse> {
    const data = MsgUpdateOrganizationMember.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "UpdateOrganizationMember",
      data
    );
    return promise.then((data) =>
      MsgUpdateOrganizationMemberResponse.decode(new Reader(data))
    );
  }

  RemoveOrganizationMember(
    request: MsgRemoveOrganizationMember
  ): Promise<MsgRemoveOrganizationMemberResponse> {
    const data = MsgRemoveOrganizationMember.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "RemoveOrganizationMember",
      data
    );
    return promise.then((data) =>
      MsgRemoveOrganizationMemberResponse.decode(new Reader(data))
    );
  }

  UpdateOrganization(
    request: MsgUpdateOrganization
  ): Promise<MsgUpdateOrganizationResponse> {
    const data = MsgUpdateOrganization.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "UpdateOrganization",
      data
    );
    return promise.then((data) =>
      MsgUpdateOrganizationResponse.decode(new Reader(data))
    );
  }

  DeleteOrganization(
    request: MsgDeleteOrganization
  ): Promise<MsgDeleteOrganizationResponse> {
    const data = MsgDeleteOrganization.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "DeleteOrganization",
      data
    );
    return promise.then((data) =>
      MsgDeleteOrganizationResponse.decode(new Reader(data))
    );
  }

  CreateComment(request: MsgCreateComment): Promise<MsgCreateCommentResponse> {
    const data = MsgCreateComment.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "CreateComment",
      data
    );
    return promise.then((data) =>
      MsgCreateCommentResponse.decode(new Reader(data))
    );
  }

  UpdateComment(request: MsgUpdateComment): Promise<MsgUpdateCommentResponse> {
    const data = MsgUpdateComment.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "UpdateComment",
      data
    );
    return promise.then((data) =>
      MsgUpdateCommentResponse.decode(new Reader(data))
    );
  }

  DeleteComment(request: MsgDeleteComment): Promise<MsgDeleteCommentResponse> {
    const data = MsgDeleteComment.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "DeleteComment",
      data
    );
    return promise.then((data) =>
      MsgDeleteCommentResponse.decode(new Reader(data))
    );
  }

  CreateIssue(request: MsgCreateIssue): Promise<MsgCreateIssueResponse> {
    const data = MsgCreateIssue.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "CreateIssue",
      data
    );
    return promise.then((data) =>
      MsgCreateIssueResponse.decode(new Reader(data))
    );
  }

  UpdateIssue(request: MsgUpdateIssue): Promise<MsgUpdateIssueResponse> {
    const data = MsgUpdateIssue.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "UpdateIssue",
      data
    );
    return promise.then((data) =>
      MsgUpdateIssueResponse.decode(new Reader(data))
    );
  }

  UpdateIssueTitle(
    request: MsgUpdateIssueTitle
  ): Promise<MsgUpdateIssueTitleResponse> {
    const data = MsgUpdateIssueTitle.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "UpdateIssueTitle",
      data
    );
    return promise.then((data) =>
      MsgUpdateIssueTitleResponse.decode(new Reader(data))
    );
  }

  UpdateIssueDescription(
    request: MsgUpdateIssueDescription
  ): Promise<MsgUpdateIssueDescriptionResponse> {
    const data = MsgUpdateIssueDescription.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "UpdateIssueDescription",
      data
    );
    return promise.then((data) =>
      MsgUpdateIssueDescriptionResponse.decode(new Reader(data))
    );
  }

  ToggleIssueState(
    request: MsgToggleIssueState
  ): Promise<MsgToggleIssueStateResponse> {
    const data = MsgToggleIssueState.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "ToggleIssueState",
      data
    );
    return promise.then((data) =>
      MsgToggleIssueStateResponse.decode(new Reader(data))
    );
  }

  DeleteIssue(request: MsgDeleteIssue): Promise<MsgDeleteIssueResponse> {
    const data = MsgDeleteIssue.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "DeleteIssue",
      data
    );
    return promise.then((data) =>
      MsgDeleteIssueResponse.decode(new Reader(data))
    );
  }

  CreateRepository(
    request: MsgCreateRepository
  ): Promise<MsgCreateRepositoryResponse> {
    const data = MsgCreateRepository.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "CreateRepository",
      data
    );
    return promise.then((data) =>
      MsgCreateRepositoryResponse.decode(new Reader(data))
    );
  }

  ForkRepository(
    request: MsgForkRepository
  ): Promise<MsgForkRepositoryResponse> {
    const data = MsgForkRepository.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "ForkRepository",
      data
    );
    return promise.then((data) =>
      MsgForkRepositoryResponse.decode(new Reader(data))
    );
  }

  RenameRepository(
    request: MsgRenameRepository
  ): Promise<MsgRenameRepositoryResponse> {
    const data = MsgRenameRepository.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "RenameRepository",
      data
    );
    return promise.then((data) =>
      MsgRenameRepositoryResponse.decode(new Reader(data))
    );
  }

  ChangeOwner(request: MsgChangeOwner): Promise<MsgChangeOwnerResponse> {
    const data = MsgChangeOwner.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "ChangeOwner",
      data
    );
    return promise.then((data) =>
      MsgChangeOwnerResponse.decode(new Reader(data))
    );
  }

  UpdateRepositoryCollaborator(
    request: MsgUpdateRepositoryCollaborator
  ): Promise<MsgUpdateRepositoryCollaboratorResponse> {
    const data = MsgUpdateRepositoryCollaborator.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "UpdateRepositoryCollaborator",
      data
    );
    return promise.then((data) =>
      MsgUpdateRepositoryCollaboratorResponse.decode(new Reader(data))
    );
  }

  RemoveRepositoryCollaborator(
    request: MsgRemoveRepositoryCollaborator
  ): Promise<MsgRemoveRepositoryCollaboratorResponse> {
    const data = MsgRemoveRepositoryCollaborator.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "RemoveRepositoryCollaborator",
      data
    );
    return promise.then((data) =>
      MsgRemoveRepositoryCollaboratorResponse.decode(new Reader(data))
    );
  }

  CreateBranch(request: MsgCreateBranch): Promise<MsgCreateBranchResponse> {
    const data = MsgCreateBranch.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "CreateBranch",
      data
    );
    return promise.then((data) =>
      MsgCreateBranchResponse.decode(new Reader(data))
    );
  }

  SetDefaultBranch(
    request: MsgSetDefaultBranch
  ): Promise<MsgSetDefaultBranchResponse> {
    const data = MsgSetDefaultBranch.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "SetDefaultBranch",
      data
    );
    return promise.then((data) =>
      MsgSetDefaultBranchResponse.decode(new Reader(data))
    );
  }

  DeleteBranch(request: MsgDeleteBranch): Promise<MsgDeleteBranchResponse> {
    const data = MsgDeleteBranch.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "DeleteBranch",
      data
    );
    return promise.then((data) =>
      MsgDeleteBranchResponse.decode(new Reader(data))
    );
  }

  CreateTag(request: MsgCreateTag): Promise<MsgCreateTagResponse> {
    const data = MsgCreateTag.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "CreateTag",
      data
    );
    return promise.then((data) =>
      MsgCreateTagResponse.decode(new Reader(data))
    );
  }

  DeleteTag(request: MsgDeleteTag): Promise<MsgDeleteTagResponse> {
    const data = MsgDeleteTag.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "DeleteTag",
      data
    );
    return promise.then((data) =>
      MsgDeleteTagResponse.decode(new Reader(data))
    );
  }

  UpdateRepository(
    request: MsgUpdateRepository
  ): Promise<MsgUpdateRepositoryResponse> {
    const data = MsgUpdateRepository.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "UpdateRepository",
      data
    );
    return promise.then((data) =>
      MsgUpdateRepositoryResponse.decode(new Reader(data))
    );
  }

  DeleteRepository(
    request: MsgDeleteRepository
  ): Promise<MsgDeleteRepositoryResponse> {
    const data = MsgDeleteRepository.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "DeleteRepository",
      data
    );
    return promise.then((data) =>
      MsgDeleteRepositoryResponse.decode(new Reader(data))
    );
  }

  CreateUser(request: MsgCreateUser): Promise<MsgCreateUserResponse> {
    const data = MsgCreateUser.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "CreateUser",
      data
    );
    return promise.then((data) =>
      MsgCreateUserResponse.decode(new Reader(data))
    );
  }

  UpdateUser(request: MsgUpdateUser): Promise<MsgUpdateUserResponse> {
    const data = MsgUpdateUser.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "UpdateUser",
      data
    );
    return promise.then((data) =>
      MsgUpdateUserResponse.decode(new Reader(data))
    );
  }

  DeleteUser(request: MsgDeleteUser): Promise<MsgDeleteUserResponse> {
    const data = MsgDeleteUser.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "DeleteUser",
      data
    );
    return promise.then((data) =>
      MsgDeleteUserResponse.decode(new Reader(data))
    );
  }

  SetWhois(request: MsgSetWhois): Promise<MsgSetWhoisResponse> {
    const data = MsgSetWhois.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "SetWhois",
      data
    );
    return promise.then((data) => MsgSetWhoisResponse.decode(new Reader(data)));
  }

  UpdateWhois(request: MsgUpdateWhois): Promise<MsgUpdateWhoisResponse> {
    const data = MsgUpdateWhois.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "UpdateWhois",
      data
    );
    return promise.then((data) =>
      MsgUpdateWhoisResponse.decode(new Reader(data))
    );
  }

  DeleteWhois(request: MsgDeleteWhois): Promise<MsgDeleteWhoisResponse> {
    const data = MsgDeleteWhois.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "DeleteWhois",
      data
    );
    return promise.then((data) =>
      MsgDeleteWhoisResponse.decode(new Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
