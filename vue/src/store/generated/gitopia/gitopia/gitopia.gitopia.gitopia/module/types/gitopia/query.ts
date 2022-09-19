/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";
import { Task } from "../gitopia/task";
import {
  PageRequest,
  PageResponse,
} from "../cosmos/base/query/v1beta1/pagination";
import { Branch } from "../gitopia/branch";
import { Tag } from "../gitopia/tag";
import { Member } from "../gitopia/member";
import { StorageProvider } from "../gitopia/storage_provider";
import { Release } from "../gitopia/release";
import { PullRequest } from "../gitopia/pullRequest";
import { Dao } from "../gitopia/dao";
import { Comment } from "../gitopia/comment";
import { Issue } from "../gitopia/issue";
import { Repository, RepositoryOwner } from "../gitopia/repository";
import { User } from "../gitopia/user";
import { Whois } from "../gitopia/whois";

export const protobufPackage = "gitopia.gitopia.gitopia";

export interface QueryCheckStorageProviderAuthorizationRequest {
  userAddress: string;
  providerAddress: string;
}

export interface QueryCheckStorageProviderAuthorizationResponse {
  haveAuthorization: boolean;
}

export interface QueryGetTaskRequest {
  id: number;
}

export interface QueryGetTaskResponse {
  Task: Task | undefined;
}

export interface QueryAllTaskRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllTaskResponse {
  Task: Task[];
  pagination: PageResponse | undefined;
}

export interface QueryCheckGitServerAuthorizationRequest {
  userAddress: string;
  providerAddress: string;
}

export interface QueryCheckGitServerAuthorizationResponse {
  haveAuthorization: boolean;
}

export interface QueryAllBranchRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllBranchResponse {
  Branch: Branch[];
  pagination: PageResponse | undefined;
}

export interface QueryGetRepositoryBranchRequest {
  id: string;
  repositoryName: string;
  branchName: string;
}

export interface QueryGetRepositoryBranchResponse {
  Branch: Branch | undefined;
}

export interface QueryGetRepositoryBranchShaRequest {
  id: string;
  repositoryName: string;
  branchName: string;
}

export interface QueryGetRepositoryBranchShaResponse {
  sha: string;
}

export interface QueryAllRepositoryBranchRequest {
  id: string;
  repositoryName: string;
  pagination: PageRequest | undefined;
}

export interface QueryAllRepositoryBranchResponse {
  Branch: Branch[];
  pagination: PageResponse | undefined;
}

export interface QueryAllTagRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllTagResponse {
  Tag: Tag[];
  pagination: PageResponse | undefined;
}

export interface QueryGetRepositoryTagRequest {
  id: string;
  repositoryName: string;
  tagName: string;
}

export interface QueryGetRepositoryTagResponse {
  Tag: Tag | undefined;
}

export interface QueryGetRepositoryTagShaRequest {
  id: string;
  repositoryName: string;
  tagName: string;
}

export interface QueryGetRepositoryTagShaResponse {
  sha: string;
}

export interface QueryAllRepositoryTagRequest {
  id: string;
  repositoryName: string;
  pagination: PageRequest | undefined;
}

export interface QueryAllRepositoryTagResponse {
  Tag: Tag[];
  pagination: PageResponse | undefined;
}

export interface QueryGetDaoMemberRequest {
  daoId: string;
  userId: string;
}

export interface QueryGetDaoMemberResponse {
  Member: Member | undefined;
}

export interface QueryAllDaoMemberRequest {
  daoId: string;
  pagination: PageRequest | undefined;
}

export interface QueryAllDaoMemberResponse {
  Member: Member[];
  pagination: PageResponse | undefined;
}

export interface QueryAllMemberRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllMemberResponse {
  Member: Member[];
  pagination: PageResponse | undefined;
}

/** this line is used by starport scaffolding # 3 */
export interface QueryGetPullRequestMergePermissionRequest {
  userId: string;
  pullId: number;
}

export interface QueryGetPullRequestMergePermissionResponse {
  havePermission: boolean;
}

export interface QueryGetStorageProviderRequest {
  id: number;
}

export interface QueryGetStorageProviderResponse {
  StorageProvider: StorageProvider | undefined;
}

export interface QueryAllStorageProviderRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllStorageProviderResponse {
  StorageProvider: StorageProvider[];
  pagination: PageResponse | undefined;
}

/** this line is used by starport scaffolding # 3 */
export interface QueryGetReleaseRequest {
  id: number;
}

export interface QueryGetReleaseResponse {
  Release: Release | undefined;
}

export interface QueryAllReleaseRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllReleaseResponse {
  Release: Release[];
  pagination: PageResponse | undefined;
}

export interface QueryGetPullRequestRequest {
  id: number;
}

export interface QueryGetPullRequestResponse {
  PullRequest: PullRequest | undefined;
}

export interface QueryAllPullRequestRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllPullRequestResponse {
  PullRequest: PullRequest[];
  pagination: PageResponse | undefined;
}

export interface QueryGetDaoRequest {
  id: string;
}

export interface QueryGetDaoResponse {
  dao: Dao | undefined;
}

export interface QueryAllDaoRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllDaoResponse {
  dao: Dao[];
  pagination: PageResponse | undefined;
}

export interface QueryGetCommentRequest {
  id: number;
}

export interface QueryGetCommentResponse {
  Comment: Comment | undefined;
}

export interface QueryAllCommentRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllCommentResponse {
  Comment: Comment[];
  pagination: PageResponse | undefined;
}

export interface QueryGetIssueRequest {
  id: number;
}

export interface QueryGetIssueResponse {
  Issue: Issue | undefined;
}

export interface QueryAllIssueRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllIssueResponse {
  Issue: Issue[];
  pagination: PageResponse | undefined;
}

export interface QueryGetLatestRepositoryReleaseRequest {
  id: string;
  repositoryName: string;
}

export interface QueryGetLatestRepositoryReleaseResponse {
  Release: Release | undefined;
}

export interface QueryGetRepositoryReleaseRequest {
  id: string;
  repositoryName: string;
  tagName: string;
}

export interface QueryGetRepositoryReleaseResponse {
  Release: Release | undefined;
}

export interface QueryAllRepositoryReleaseRequest {
  id: string;
  repositoryName: string;
  pagination: PageRequest | undefined;
}

export interface QueryAllRepositoryReleaseResponse {
  Release: Release[];
  pagination: PageResponse | undefined;
}

export interface QueryGetRepositoryIssueRequest {
  id: string;
  repositoryName: string;
  issueIid: number;
}

export interface QueryGetRepositoryIssueResponse {
  Issue: Issue | undefined;
}

export interface QueryGetRepositoryPullRequestRequest {
  id: string;
  repositoryName: string;
  pullIid: number;
}

export interface QueryGetRepositoryPullRequestResponse {
  PullRequest: PullRequest | undefined;
}

export interface QueryAllRepositoryIssueRequest {
  id: string;
  repositoryName: string;
  option: IssueOptions | undefined;
  pagination: PageRequest | undefined;
}

export interface IssueOptions {
  createdBy: string;
  state: string;
  labels: string;
  assignee: string;
  labelIds: number[];
  sort: string;
  search: string;
  updatedAfter: number;
  updatedBefore: number;
}

export interface QueryAllRepositoryIssueResponse {
  Issue: Issue[];
  pagination: PageResponse | undefined;
}

export interface QueryAllRepositoryPullRequestRequest {
  id: string;
  repositoryName: string;
  option: PullRequestOptions | undefined;
  pagination: PageRequest | undefined;
}

export interface PullRequestOptions {
  createdBy: string;
  state: string;
  labels: string;
  assignee: string;
  reviewer: string;
  labelIds: number[];
  sort: string;
  search: string;
  updatedAfter: number;
  updatedBefore: number;
}

export interface QueryAllRepositoryPullRequestResponse {
  PullRequest: PullRequest[];
  pagination: PageResponse | undefined;
}

export interface QueryGetRepositoryRequest {
  id: number;
}

export interface QueryGetRepositoryResponse {
  Repository: Repository | undefined;
}

export interface RepositoryFork {
  creator: string;
  id: number;
  name: string;
  owner: RepositoryOwner | undefined;
  description: string;
  parent: number;
  forksCount: number;
  issuesCount: number;
  pullsCount: number;
}

export interface QueryGetAllForkRequest {
  id: string;
  repositoryName: string;
  pagination: PageRequest | undefined;
}

export interface QueryGetAllForkResponse {
  forks: RepositoryFork[];
  pagination: PageResponse | undefined;
}

export interface QueryAllRepositoryRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllRepositoryResponse {
  Repository: Repository[];
  pagination: PageResponse | undefined;
}

export interface QueryGetUserRequest {
  id: string;
}

export interface QueryGetUserResponse {
  User: User | undefined;
}

export interface QueryAllUserDaoRequest {
  userId: string;
  pagination: PageRequest | undefined;
}

export interface QueryAllUserDaoResponse {
  dao: Dao[];
  pagination: PageResponse | undefined;
}

export interface QueryAllUserRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllUserResponse {
  User: User[];
  pagination: PageResponse | undefined;
}

export interface QueryAllAnyRepositoryRequest {
  id: string;
  pagination: PageRequest | undefined;
}

export interface QueryAllAnyRepositoryResponse {
  Repository: Repository[];
  pagination: PageResponse | undefined;
}

export interface QueryGetAnyRepositoryRequest {
  id: string;
  repositoryName: string;
}

export interface QueryGetAnyRepositoryResponse {
  Repository: Repository | undefined;
}

export interface QueryGetWhoisRequest {
  name: string;
}

export interface QueryGetWhoisResponse {
  Whois: Whois | undefined;
}

export interface QueryAllWhoisRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllWhoisResponse {
  Whois: Whois[];
  pagination: PageResponse | undefined;
}

const baseQueryCheckStorageProviderAuthorizationRequest: object = {
  userAddress: "",
  providerAddress: "",
};

export const QueryCheckStorageProviderAuthorizationRequest = {
  encode(
    message: QueryCheckStorageProviderAuthorizationRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.userAddress !== "") {
      writer.uint32(10).string(message.userAddress);
    }
    if (message.providerAddress !== "") {
      writer.uint32(18).string(message.providerAddress);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryCheckStorageProviderAuthorizationRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryCheckStorageProviderAuthorizationRequest,
    } as QueryCheckStorageProviderAuthorizationRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userAddress = reader.string();
          break;
        case 2:
          message.providerAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryCheckStorageProviderAuthorizationRequest {
    const message = {
      ...baseQueryCheckStorageProviderAuthorizationRequest,
    } as QueryCheckStorageProviderAuthorizationRequest;
    if (object.userAddress !== undefined && object.userAddress !== null) {
      message.userAddress = String(object.userAddress);
    } else {
      message.userAddress = "";
    }
    if (
      object.providerAddress !== undefined &&
      object.providerAddress !== null
    ) {
      message.providerAddress = String(object.providerAddress);
    } else {
      message.providerAddress = "";
    }
    return message;
  },

  toJSON(message: QueryCheckStorageProviderAuthorizationRequest): unknown {
    const obj: any = {};
    message.userAddress !== undefined &&
      (obj.userAddress = message.userAddress);
    message.providerAddress !== undefined &&
      (obj.providerAddress = message.providerAddress);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryCheckStorageProviderAuthorizationRequest>
  ): QueryCheckStorageProviderAuthorizationRequest {
    const message = {
      ...baseQueryCheckStorageProviderAuthorizationRequest,
    } as QueryCheckStorageProviderAuthorizationRequest;
    if (object.userAddress !== undefined && object.userAddress !== null) {
      message.userAddress = object.userAddress;
    } else {
      message.userAddress = "";
    }
    if (
      object.providerAddress !== undefined &&
      object.providerAddress !== null
    ) {
      message.providerAddress = object.providerAddress;
    } else {
      message.providerAddress = "";
    }
    return message;
  },
};

const baseQueryCheckStorageProviderAuthorizationResponse: object = {
  haveAuthorization: false,
};

export const QueryCheckStorageProviderAuthorizationResponse = {
  encode(
    message: QueryCheckStorageProviderAuthorizationResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.haveAuthorization === true) {
      writer.uint32(8).bool(message.haveAuthorization);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryCheckStorageProviderAuthorizationResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryCheckStorageProviderAuthorizationResponse,
    } as QueryCheckStorageProviderAuthorizationResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.haveAuthorization = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryCheckStorageProviderAuthorizationResponse {
    const message = {
      ...baseQueryCheckStorageProviderAuthorizationResponse,
    } as QueryCheckStorageProviderAuthorizationResponse;
    if (
      object.haveAuthorization !== undefined &&
      object.haveAuthorization !== null
    ) {
      message.haveAuthorization = Boolean(object.haveAuthorization);
    } else {
      message.haveAuthorization = false;
    }
    return message;
  },

  toJSON(message: QueryCheckStorageProviderAuthorizationResponse): unknown {
    const obj: any = {};
    message.haveAuthorization !== undefined &&
      (obj.haveAuthorization = message.haveAuthorization);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryCheckStorageProviderAuthorizationResponse>
  ): QueryCheckStorageProviderAuthorizationResponse {
    const message = {
      ...baseQueryCheckStorageProviderAuthorizationResponse,
    } as QueryCheckStorageProviderAuthorizationResponse;
    if (
      object.haveAuthorization !== undefined &&
      object.haveAuthorization !== null
    ) {
      message.haveAuthorization = object.haveAuthorization;
    } else {
      message.haveAuthorization = false;
    }
    return message;
  },
};

const baseQueryGetTaskRequest: object = { id: 0 };

export const QueryGetTaskRequest = {
  encode(
    message: QueryGetTaskRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetTaskRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetTaskRequest } as QueryGetTaskRequest;
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

  fromJSON(object: any): QueryGetTaskRequest {
    const message = { ...baseQueryGetTaskRequest } as QueryGetTaskRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: QueryGetTaskRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryGetTaskRequest>): QueryGetTaskRequest {
    const message = { ...baseQueryGetTaskRequest } as QueryGetTaskRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseQueryGetTaskResponse: object = {};

export const QueryGetTaskResponse = {
  encode(
    message: QueryGetTaskResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.Task !== undefined) {
      Task.encode(message.Task, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetTaskResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetTaskResponse } as QueryGetTaskResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Task = Task.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetTaskResponse {
    const message = { ...baseQueryGetTaskResponse } as QueryGetTaskResponse;
    if (object.Task !== undefined && object.Task !== null) {
      message.Task = Task.fromJSON(object.Task);
    } else {
      message.Task = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetTaskResponse): unknown {
    const obj: any = {};
    message.Task !== undefined &&
      (obj.Task = message.Task ? Task.toJSON(message.Task) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryGetTaskResponse>): QueryGetTaskResponse {
    const message = { ...baseQueryGetTaskResponse } as QueryGetTaskResponse;
    if (object.Task !== undefined && object.Task !== null) {
      message.Task = Task.fromPartial(object.Task);
    } else {
      message.Task = undefined;
    }
    return message;
  },
};

const baseQueryAllTaskRequest: object = {};

export const QueryAllTaskRequest = {
  encode(
    message: QueryAllTaskRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllTaskRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllTaskRequest } as QueryAllTaskRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllTaskRequest {
    const message = { ...baseQueryAllTaskRequest } as QueryAllTaskRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllTaskRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAllTaskRequest>): QueryAllTaskRequest {
    const message = { ...baseQueryAllTaskRequest } as QueryAllTaskRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllTaskResponse: object = {};

export const QueryAllTaskResponse = {
  encode(
    message: QueryAllTaskResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.Task) {
      Task.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllTaskResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllTaskResponse } as QueryAllTaskResponse;
    message.Task = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Task.push(Task.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllTaskResponse {
    const message = { ...baseQueryAllTaskResponse } as QueryAllTaskResponse;
    message.Task = [];
    if (object.Task !== undefined && object.Task !== null) {
      for (const e of object.Task) {
        message.Task.push(Task.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllTaskResponse): unknown {
    const obj: any = {};
    if (message.Task) {
      obj.Task = message.Task.map((e) => (e ? Task.toJSON(e) : undefined));
    } else {
      obj.Task = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAllTaskResponse>): QueryAllTaskResponse {
    const message = { ...baseQueryAllTaskResponse } as QueryAllTaskResponse;
    message.Task = [];
    if (object.Task !== undefined && object.Task !== null) {
      for (const e of object.Task) {
        message.Task.push(Task.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryCheckGitServerAuthorizationRequest: object = {
  userAddress: "",
  providerAddress: "",
};

export const QueryCheckGitServerAuthorizationRequest = {
  encode(
    message: QueryCheckGitServerAuthorizationRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.userAddress !== "") {
      writer.uint32(10).string(message.userAddress);
    }
    if (message.providerAddress !== "") {
      writer.uint32(18).string(message.providerAddress);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryCheckGitServerAuthorizationRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryCheckGitServerAuthorizationRequest,
    } as QueryCheckGitServerAuthorizationRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userAddress = reader.string();
          break;
        case 2:
          message.providerAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryCheckGitServerAuthorizationRequest {
    const message = {
      ...baseQueryCheckGitServerAuthorizationRequest,
    } as QueryCheckGitServerAuthorizationRequest;
    if (object.userAddress !== undefined && object.userAddress !== null) {
      message.userAddress = String(object.userAddress);
    } else {
      message.userAddress = "";
    }
    if (
      object.providerAddress !== undefined &&
      object.providerAddress !== null
    ) {
      message.providerAddress = String(object.providerAddress);
    } else {
      message.providerAddress = "";
    }
    return message;
  },

  toJSON(message: QueryCheckGitServerAuthorizationRequest): unknown {
    const obj: any = {};
    message.userAddress !== undefined &&
      (obj.userAddress = message.userAddress);
    message.providerAddress !== undefined &&
      (obj.providerAddress = message.providerAddress);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryCheckGitServerAuthorizationRequest>
  ): QueryCheckGitServerAuthorizationRequest {
    const message = {
      ...baseQueryCheckGitServerAuthorizationRequest,
    } as QueryCheckGitServerAuthorizationRequest;
    if (object.userAddress !== undefined && object.userAddress !== null) {
      message.userAddress = object.userAddress;
    } else {
      message.userAddress = "";
    }
    if (
      object.providerAddress !== undefined &&
      object.providerAddress !== null
    ) {
      message.providerAddress = object.providerAddress;
    } else {
      message.providerAddress = "";
    }
    return message;
  },
};

const baseQueryCheckGitServerAuthorizationResponse: object = {
  haveAuthorization: false,
};

export const QueryCheckGitServerAuthorizationResponse = {
  encode(
    message: QueryCheckGitServerAuthorizationResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.haveAuthorization === true) {
      writer.uint32(8).bool(message.haveAuthorization);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryCheckGitServerAuthorizationResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryCheckGitServerAuthorizationResponse,
    } as QueryCheckGitServerAuthorizationResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.haveAuthorization = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryCheckGitServerAuthorizationResponse {
    const message = {
      ...baseQueryCheckGitServerAuthorizationResponse,
    } as QueryCheckGitServerAuthorizationResponse;
    if (
      object.haveAuthorization !== undefined &&
      object.haveAuthorization !== null
    ) {
      message.haveAuthorization = Boolean(object.haveAuthorization);
    } else {
      message.haveAuthorization = false;
    }
    return message;
  },

  toJSON(message: QueryCheckGitServerAuthorizationResponse): unknown {
    const obj: any = {};
    message.haveAuthorization !== undefined &&
      (obj.haveAuthorization = message.haveAuthorization);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryCheckGitServerAuthorizationResponse>
  ): QueryCheckGitServerAuthorizationResponse {
    const message = {
      ...baseQueryCheckGitServerAuthorizationResponse,
    } as QueryCheckGitServerAuthorizationResponse;
    if (
      object.haveAuthorization !== undefined &&
      object.haveAuthorization !== null
    ) {
      message.haveAuthorization = object.haveAuthorization;
    } else {
      message.haveAuthorization = false;
    }
    return message;
  },
};

const baseQueryAllBranchRequest: object = {};

export const QueryAllBranchRequest = {
  encode(
    message: QueryAllBranchRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllBranchRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllBranchRequest } as QueryAllBranchRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllBranchRequest {
    const message = { ...baseQueryAllBranchRequest } as QueryAllBranchRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllBranchRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllBranchRequest>
  ): QueryAllBranchRequest {
    const message = { ...baseQueryAllBranchRequest } as QueryAllBranchRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllBranchResponse: object = {};

export const QueryAllBranchResponse = {
  encode(
    message: QueryAllBranchResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.Branch) {
      Branch.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllBranchResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllBranchResponse } as QueryAllBranchResponse;
    message.Branch = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Branch.push(Branch.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllBranchResponse {
    const message = { ...baseQueryAllBranchResponse } as QueryAllBranchResponse;
    message.Branch = [];
    if (object.Branch !== undefined && object.Branch !== null) {
      for (const e of object.Branch) {
        message.Branch.push(Branch.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllBranchResponse): unknown {
    const obj: any = {};
    if (message.Branch) {
      obj.Branch = message.Branch.map((e) =>
        e ? Branch.toJSON(e) : undefined
      );
    } else {
      obj.Branch = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllBranchResponse>
  ): QueryAllBranchResponse {
    const message = { ...baseQueryAllBranchResponse } as QueryAllBranchResponse;
    message.Branch = [];
    if (object.Branch !== undefined && object.Branch !== null) {
      for (const e of object.Branch) {
        message.Branch.push(Branch.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryGetRepositoryBranchRequest: object = {
  id: "",
  repositoryName: "",
  branchName: "",
};

export const QueryGetRepositoryBranchRequest = {
  encode(
    message: QueryGetRepositoryBranchRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.repositoryName !== "") {
      writer.uint32(18).string(message.repositoryName);
    }
    if (message.branchName !== "") {
      writer.uint32(26).string(message.branchName);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetRepositoryBranchRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetRepositoryBranchRequest,
    } as QueryGetRepositoryBranchRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.repositoryName = reader.string();
          break;
        case 3:
          message.branchName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetRepositoryBranchRequest {
    const message = {
      ...baseQueryGetRepositoryBranchRequest,
    } as QueryGetRepositoryBranchRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.repositoryName !== undefined && object.repositoryName !== null) {
      message.repositoryName = String(object.repositoryName);
    } else {
      message.repositoryName = "";
    }
    if (object.branchName !== undefined && object.branchName !== null) {
      message.branchName = String(object.branchName);
    } else {
      message.branchName = "";
    }
    return message;
  },

  toJSON(message: QueryGetRepositoryBranchRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.repositoryName !== undefined &&
      (obj.repositoryName = message.repositoryName);
    message.branchName !== undefined && (obj.branchName = message.branchName);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetRepositoryBranchRequest>
  ): QueryGetRepositoryBranchRequest {
    const message = {
      ...baseQueryGetRepositoryBranchRequest,
    } as QueryGetRepositoryBranchRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.repositoryName !== undefined && object.repositoryName !== null) {
      message.repositoryName = object.repositoryName;
    } else {
      message.repositoryName = "";
    }
    if (object.branchName !== undefined && object.branchName !== null) {
      message.branchName = object.branchName;
    } else {
      message.branchName = "";
    }
    return message;
  },
};

const baseQueryGetRepositoryBranchResponse: object = {};

export const QueryGetRepositoryBranchResponse = {
  encode(
    message: QueryGetRepositoryBranchResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.Branch !== undefined) {
      Branch.encode(message.Branch, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetRepositoryBranchResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetRepositoryBranchResponse,
    } as QueryGetRepositoryBranchResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Branch = Branch.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetRepositoryBranchResponse {
    const message = {
      ...baseQueryGetRepositoryBranchResponse,
    } as QueryGetRepositoryBranchResponse;
    if (object.Branch !== undefined && object.Branch !== null) {
      message.Branch = Branch.fromJSON(object.Branch);
    } else {
      message.Branch = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetRepositoryBranchResponse): unknown {
    const obj: any = {};
    message.Branch !== undefined &&
      (obj.Branch = message.Branch ? Branch.toJSON(message.Branch) : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetRepositoryBranchResponse>
  ): QueryGetRepositoryBranchResponse {
    const message = {
      ...baseQueryGetRepositoryBranchResponse,
    } as QueryGetRepositoryBranchResponse;
    if (object.Branch !== undefined && object.Branch !== null) {
      message.Branch = Branch.fromPartial(object.Branch);
    } else {
      message.Branch = undefined;
    }
    return message;
  },
};

const baseQueryGetRepositoryBranchShaRequest: object = {
  id: "",
  repositoryName: "",
  branchName: "",
};

export const QueryGetRepositoryBranchShaRequest = {
  encode(
    message: QueryGetRepositoryBranchShaRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.repositoryName !== "") {
      writer.uint32(18).string(message.repositoryName);
    }
    if (message.branchName !== "") {
      writer.uint32(26).string(message.branchName);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetRepositoryBranchShaRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetRepositoryBranchShaRequest,
    } as QueryGetRepositoryBranchShaRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.repositoryName = reader.string();
          break;
        case 3:
          message.branchName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetRepositoryBranchShaRequest {
    const message = {
      ...baseQueryGetRepositoryBranchShaRequest,
    } as QueryGetRepositoryBranchShaRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.repositoryName !== undefined && object.repositoryName !== null) {
      message.repositoryName = String(object.repositoryName);
    } else {
      message.repositoryName = "";
    }
    if (object.branchName !== undefined && object.branchName !== null) {
      message.branchName = String(object.branchName);
    } else {
      message.branchName = "";
    }
    return message;
  },

  toJSON(message: QueryGetRepositoryBranchShaRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.repositoryName !== undefined &&
      (obj.repositoryName = message.repositoryName);
    message.branchName !== undefined && (obj.branchName = message.branchName);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetRepositoryBranchShaRequest>
  ): QueryGetRepositoryBranchShaRequest {
    const message = {
      ...baseQueryGetRepositoryBranchShaRequest,
    } as QueryGetRepositoryBranchShaRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.repositoryName !== undefined && object.repositoryName !== null) {
      message.repositoryName = object.repositoryName;
    } else {
      message.repositoryName = "";
    }
    if (object.branchName !== undefined && object.branchName !== null) {
      message.branchName = object.branchName;
    } else {
      message.branchName = "";
    }
    return message;
  },
};

const baseQueryGetRepositoryBranchShaResponse: object = { sha: "" };

export const QueryGetRepositoryBranchShaResponse = {
  encode(
    message: QueryGetRepositoryBranchShaResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.sha !== "") {
      writer.uint32(10).string(message.sha);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetRepositoryBranchShaResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetRepositoryBranchShaResponse,
    } as QueryGetRepositoryBranchShaResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sha = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetRepositoryBranchShaResponse {
    const message = {
      ...baseQueryGetRepositoryBranchShaResponse,
    } as QueryGetRepositoryBranchShaResponse;
    if (object.sha !== undefined && object.sha !== null) {
      message.sha = String(object.sha);
    } else {
      message.sha = "";
    }
    return message;
  },

  toJSON(message: QueryGetRepositoryBranchShaResponse): unknown {
    const obj: any = {};
    message.sha !== undefined && (obj.sha = message.sha);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetRepositoryBranchShaResponse>
  ): QueryGetRepositoryBranchShaResponse {
    const message = {
      ...baseQueryGetRepositoryBranchShaResponse,
    } as QueryGetRepositoryBranchShaResponse;
    if (object.sha !== undefined && object.sha !== null) {
      message.sha = object.sha;
    } else {
      message.sha = "";
    }
    return message;
  },
};

const baseQueryAllRepositoryBranchRequest: object = {
  id: "",
  repositoryName: "",
};

export const QueryAllRepositoryBranchRequest = {
  encode(
    message: QueryAllRepositoryBranchRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.repositoryName !== "") {
      writer.uint32(18).string(message.repositoryName);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllRepositoryBranchRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllRepositoryBranchRequest,
    } as QueryAllRepositoryBranchRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.repositoryName = reader.string();
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllRepositoryBranchRequest {
    const message = {
      ...baseQueryAllRepositoryBranchRequest,
    } as QueryAllRepositoryBranchRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.repositoryName !== undefined && object.repositoryName !== null) {
      message.repositoryName = String(object.repositoryName);
    } else {
      message.repositoryName = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllRepositoryBranchRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.repositoryName !== undefined &&
      (obj.repositoryName = message.repositoryName);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllRepositoryBranchRequest>
  ): QueryAllRepositoryBranchRequest {
    const message = {
      ...baseQueryAllRepositoryBranchRequest,
    } as QueryAllRepositoryBranchRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.repositoryName !== undefined && object.repositoryName !== null) {
      message.repositoryName = object.repositoryName;
    } else {
      message.repositoryName = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllRepositoryBranchResponse: object = {};

export const QueryAllRepositoryBranchResponse = {
  encode(
    message: QueryAllRepositoryBranchResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.Branch) {
      Branch.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllRepositoryBranchResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllRepositoryBranchResponse,
    } as QueryAllRepositoryBranchResponse;
    message.Branch = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Branch.push(Branch.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllRepositoryBranchResponse {
    const message = {
      ...baseQueryAllRepositoryBranchResponse,
    } as QueryAllRepositoryBranchResponse;
    message.Branch = [];
    if (object.Branch !== undefined && object.Branch !== null) {
      for (const e of object.Branch) {
        message.Branch.push(Branch.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllRepositoryBranchResponse): unknown {
    const obj: any = {};
    if (message.Branch) {
      obj.Branch = message.Branch.map((e) =>
        e ? Branch.toJSON(e) : undefined
      );
    } else {
      obj.Branch = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllRepositoryBranchResponse>
  ): QueryAllRepositoryBranchResponse {
    const message = {
      ...baseQueryAllRepositoryBranchResponse,
    } as QueryAllRepositoryBranchResponse;
    message.Branch = [];
    if (object.Branch !== undefined && object.Branch !== null) {
      for (const e of object.Branch) {
        message.Branch.push(Branch.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllTagRequest: object = {};

export const QueryAllTagRequest = {
  encode(
    message: QueryAllTagRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllTagRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllTagRequest } as QueryAllTagRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllTagRequest {
    const message = { ...baseQueryAllTagRequest } as QueryAllTagRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllTagRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAllTagRequest>): QueryAllTagRequest {
    const message = { ...baseQueryAllTagRequest } as QueryAllTagRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllTagResponse: object = {};

export const QueryAllTagResponse = {
  encode(
    message: QueryAllTagResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.Tag) {
      Tag.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllTagResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllTagResponse } as QueryAllTagResponse;
    message.Tag = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Tag.push(Tag.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllTagResponse {
    const message = { ...baseQueryAllTagResponse } as QueryAllTagResponse;
    message.Tag = [];
    if (object.Tag !== undefined && object.Tag !== null) {
      for (const e of object.Tag) {
        message.Tag.push(Tag.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllTagResponse): unknown {
    const obj: any = {};
    if (message.Tag) {
      obj.Tag = message.Tag.map((e) => (e ? Tag.toJSON(e) : undefined));
    } else {
      obj.Tag = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAllTagResponse>): QueryAllTagResponse {
    const message = { ...baseQueryAllTagResponse } as QueryAllTagResponse;
    message.Tag = [];
    if (object.Tag !== undefined && object.Tag !== null) {
      for (const e of object.Tag) {
        message.Tag.push(Tag.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryGetRepositoryTagRequest: object = {
  id: "",
  repositoryName: "",
  tagName: "",
};

export const QueryGetRepositoryTagRequest = {
  encode(
    message: QueryGetRepositoryTagRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.repositoryName !== "") {
      writer.uint32(18).string(message.repositoryName);
    }
    if (message.tagName !== "") {
      writer.uint32(26).string(message.tagName);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetRepositoryTagRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetRepositoryTagRequest,
    } as QueryGetRepositoryTagRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.repositoryName = reader.string();
          break;
        case 3:
          message.tagName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetRepositoryTagRequest {
    const message = {
      ...baseQueryGetRepositoryTagRequest,
    } as QueryGetRepositoryTagRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.repositoryName !== undefined && object.repositoryName !== null) {
      message.repositoryName = String(object.repositoryName);
    } else {
      message.repositoryName = "";
    }
    if (object.tagName !== undefined && object.tagName !== null) {
      message.tagName = String(object.tagName);
    } else {
      message.tagName = "";
    }
    return message;
  },

  toJSON(message: QueryGetRepositoryTagRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.repositoryName !== undefined &&
      (obj.repositoryName = message.repositoryName);
    message.tagName !== undefined && (obj.tagName = message.tagName);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetRepositoryTagRequest>
  ): QueryGetRepositoryTagRequest {
    const message = {
      ...baseQueryGetRepositoryTagRequest,
    } as QueryGetRepositoryTagRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.repositoryName !== undefined && object.repositoryName !== null) {
      message.repositoryName = object.repositoryName;
    } else {
      message.repositoryName = "";
    }
    if (object.tagName !== undefined && object.tagName !== null) {
      message.tagName = object.tagName;
    } else {
      message.tagName = "";
    }
    return message;
  },
};

const baseQueryGetRepositoryTagResponse: object = {};

export const QueryGetRepositoryTagResponse = {
  encode(
    message: QueryGetRepositoryTagResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.Tag !== undefined) {
      Tag.encode(message.Tag, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetRepositoryTagResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetRepositoryTagResponse,
    } as QueryGetRepositoryTagResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Tag = Tag.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetRepositoryTagResponse {
    const message = {
      ...baseQueryGetRepositoryTagResponse,
    } as QueryGetRepositoryTagResponse;
    if (object.Tag !== undefined && object.Tag !== null) {
      message.Tag = Tag.fromJSON(object.Tag);
    } else {
      message.Tag = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetRepositoryTagResponse): unknown {
    const obj: any = {};
    message.Tag !== undefined &&
      (obj.Tag = message.Tag ? Tag.toJSON(message.Tag) : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetRepositoryTagResponse>
  ): QueryGetRepositoryTagResponse {
    const message = {
      ...baseQueryGetRepositoryTagResponse,
    } as QueryGetRepositoryTagResponse;
    if (object.Tag !== undefined && object.Tag !== null) {
      message.Tag = Tag.fromPartial(object.Tag);
    } else {
      message.Tag = undefined;
    }
    return message;
  },
};

const baseQueryGetRepositoryTagShaRequest: object = {
  id: "",
  repositoryName: "",
  tagName: "",
};

export const QueryGetRepositoryTagShaRequest = {
  encode(
    message: QueryGetRepositoryTagShaRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.repositoryName !== "") {
      writer.uint32(18).string(message.repositoryName);
    }
    if (message.tagName !== "") {
      writer.uint32(26).string(message.tagName);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetRepositoryTagShaRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetRepositoryTagShaRequest,
    } as QueryGetRepositoryTagShaRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.repositoryName = reader.string();
          break;
        case 3:
          message.tagName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetRepositoryTagShaRequest {
    const message = {
      ...baseQueryGetRepositoryTagShaRequest,
    } as QueryGetRepositoryTagShaRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.repositoryName !== undefined && object.repositoryName !== null) {
      message.repositoryName = String(object.repositoryName);
    } else {
      message.repositoryName = "";
    }
    if (object.tagName !== undefined && object.tagName !== null) {
      message.tagName = String(object.tagName);
    } else {
      message.tagName = "";
    }
    return message;
  },

  toJSON(message: QueryGetRepositoryTagShaRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.repositoryName !== undefined &&
      (obj.repositoryName = message.repositoryName);
    message.tagName !== undefined && (obj.tagName = message.tagName);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetRepositoryTagShaRequest>
  ): QueryGetRepositoryTagShaRequest {
    const message = {
      ...baseQueryGetRepositoryTagShaRequest,
    } as QueryGetRepositoryTagShaRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.repositoryName !== undefined && object.repositoryName !== null) {
      message.repositoryName = object.repositoryName;
    } else {
      message.repositoryName = "";
    }
    if (object.tagName !== undefined && object.tagName !== null) {
      message.tagName = object.tagName;
    } else {
      message.tagName = "";
    }
    return message;
  },
};

const baseQueryGetRepositoryTagShaResponse: object = { sha: "" };

export const QueryGetRepositoryTagShaResponse = {
  encode(
    message: QueryGetRepositoryTagShaResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.sha !== "") {
      writer.uint32(10).string(message.sha);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetRepositoryTagShaResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetRepositoryTagShaResponse,
    } as QueryGetRepositoryTagShaResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sha = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetRepositoryTagShaResponse {
    const message = {
      ...baseQueryGetRepositoryTagShaResponse,
    } as QueryGetRepositoryTagShaResponse;
    if (object.sha !== undefined && object.sha !== null) {
      message.sha = String(object.sha);
    } else {
      message.sha = "";
    }
    return message;
  },

  toJSON(message: QueryGetRepositoryTagShaResponse): unknown {
    const obj: any = {};
    message.sha !== undefined && (obj.sha = message.sha);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetRepositoryTagShaResponse>
  ): QueryGetRepositoryTagShaResponse {
    const message = {
      ...baseQueryGetRepositoryTagShaResponse,
    } as QueryGetRepositoryTagShaResponse;
    if (object.sha !== undefined && object.sha !== null) {
      message.sha = object.sha;
    } else {
      message.sha = "";
    }
    return message;
  },
};

const baseQueryAllRepositoryTagRequest: object = { id: "", repositoryName: "" };

export const QueryAllRepositoryTagRequest = {
  encode(
    message: QueryAllRepositoryTagRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.repositoryName !== "") {
      writer.uint32(18).string(message.repositoryName);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllRepositoryTagRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllRepositoryTagRequest,
    } as QueryAllRepositoryTagRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.repositoryName = reader.string();
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllRepositoryTagRequest {
    const message = {
      ...baseQueryAllRepositoryTagRequest,
    } as QueryAllRepositoryTagRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.repositoryName !== undefined && object.repositoryName !== null) {
      message.repositoryName = String(object.repositoryName);
    } else {
      message.repositoryName = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllRepositoryTagRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.repositoryName !== undefined &&
      (obj.repositoryName = message.repositoryName);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllRepositoryTagRequest>
  ): QueryAllRepositoryTagRequest {
    const message = {
      ...baseQueryAllRepositoryTagRequest,
    } as QueryAllRepositoryTagRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.repositoryName !== undefined && object.repositoryName !== null) {
      message.repositoryName = object.repositoryName;
    } else {
      message.repositoryName = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllRepositoryTagResponse: object = {};

export const QueryAllRepositoryTagResponse = {
  encode(
    message: QueryAllRepositoryTagResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.Tag) {
      Tag.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllRepositoryTagResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllRepositoryTagResponse,
    } as QueryAllRepositoryTagResponse;
    message.Tag = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Tag.push(Tag.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllRepositoryTagResponse {
    const message = {
      ...baseQueryAllRepositoryTagResponse,
    } as QueryAllRepositoryTagResponse;
    message.Tag = [];
    if (object.Tag !== undefined && object.Tag !== null) {
      for (const e of object.Tag) {
        message.Tag.push(Tag.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllRepositoryTagResponse): unknown {
    const obj: any = {};
    if (message.Tag) {
      obj.Tag = message.Tag.map((e) => (e ? Tag.toJSON(e) : undefined));
    } else {
      obj.Tag = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllRepositoryTagResponse>
  ): QueryAllRepositoryTagResponse {
    const message = {
      ...baseQueryAllRepositoryTagResponse,
    } as QueryAllRepositoryTagResponse;
    message.Tag = [];
    if (object.Tag !== undefined && object.Tag !== null) {
      for (const e of object.Tag) {
        message.Tag.push(Tag.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryGetDaoMemberRequest: object = { daoId: "", userId: "" };

export const QueryGetDaoMemberRequest = {
  encode(
    message: QueryGetDaoMemberRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.daoId !== "") {
      writer.uint32(10).string(message.daoId);
    }
    if (message.userId !== "") {
      writer.uint32(18).string(message.userId);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetDaoMemberRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetDaoMemberRequest,
    } as QueryGetDaoMemberRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.daoId = reader.string();
          break;
        case 2:
          message.userId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetDaoMemberRequest {
    const message = {
      ...baseQueryGetDaoMemberRequest,
    } as QueryGetDaoMemberRequest;
    if (object.daoId !== undefined && object.daoId !== null) {
      message.daoId = String(object.daoId);
    } else {
      message.daoId = "";
    }
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = String(object.userId);
    } else {
      message.userId = "";
    }
    return message;
  },

  toJSON(message: QueryGetDaoMemberRequest): unknown {
    const obj: any = {};
    message.daoId !== undefined && (obj.daoId = message.daoId);
    message.userId !== undefined && (obj.userId = message.userId);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetDaoMemberRequest>
  ): QueryGetDaoMemberRequest {
    const message = {
      ...baseQueryGetDaoMemberRequest,
    } as QueryGetDaoMemberRequest;
    if (object.daoId !== undefined && object.daoId !== null) {
      message.daoId = object.daoId;
    } else {
      message.daoId = "";
    }
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = object.userId;
    } else {
      message.userId = "";
    }
    return message;
  },
};

const baseQueryGetDaoMemberResponse: object = {};

export const QueryGetDaoMemberResponse = {
  encode(
    message: QueryGetDaoMemberResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.Member !== undefined) {
      Member.encode(message.Member, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetDaoMemberResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetDaoMemberResponse,
    } as QueryGetDaoMemberResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Member = Member.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetDaoMemberResponse {
    const message = {
      ...baseQueryGetDaoMemberResponse,
    } as QueryGetDaoMemberResponse;
    if (object.Member !== undefined && object.Member !== null) {
      message.Member = Member.fromJSON(object.Member);
    } else {
      message.Member = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetDaoMemberResponse): unknown {
    const obj: any = {};
    message.Member !== undefined &&
      (obj.Member = message.Member ? Member.toJSON(message.Member) : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetDaoMemberResponse>
  ): QueryGetDaoMemberResponse {
    const message = {
      ...baseQueryGetDaoMemberResponse,
    } as QueryGetDaoMemberResponse;
    if (object.Member !== undefined && object.Member !== null) {
      message.Member = Member.fromPartial(object.Member);
    } else {
      message.Member = undefined;
    }
    return message;
  },
};

const baseQueryAllDaoMemberRequest: object = { daoId: "" };

export const QueryAllDaoMemberRequest = {
  encode(
    message: QueryAllDaoMemberRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.daoId !== "") {
      writer.uint32(10).string(message.daoId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllDaoMemberRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllDaoMemberRequest,
    } as QueryAllDaoMemberRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.daoId = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllDaoMemberRequest {
    const message = {
      ...baseQueryAllDaoMemberRequest,
    } as QueryAllDaoMemberRequest;
    if (object.daoId !== undefined && object.daoId !== null) {
      message.daoId = String(object.daoId);
    } else {
      message.daoId = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllDaoMemberRequest): unknown {
    const obj: any = {};
    message.daoId !== undefined && (obj.daoId = message.daoId);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllDaoMemberRequest>
  ): QueryAllDaoMemberRequest {
    const message = {
      ...baseQueryAllDaoMemberRequest,
    } as QueryAllDaoMemberRequest;
    if (object.daoId !== undefined && object.daoId !== null) {
      message.daoId = object.daoId;
    } else {
      message.daoId = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllDaoMemberResponse: object = {};

export const QueryAllDaoMemberResponse = {
  encode(
    message: QueryAllDaoMemberResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.Member) {
      Member.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllDaoMemberResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllDaoMemberResponse,
    } as QueryAllDaoMemberResponse;
    message.Member = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Member.push(Member.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllDaoMemberResponse {
    const message = {
      ...baseQueryAllDaoMemberResponse,
    } as QueryAllDaoMemberResponse;
    message.Member = [];
    if (object.Member !== undefined && object.Member !== null) {
      for (const e of object.Member) {
        message.Member.push(Member.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllDaoMemberResponse): unknown {
    const obj: any = {};
    if (message.Member) {
      obj.Member = message.Member.map((e) =>
        e ? Member.toJSON(e) : undefined
      );
    } else {
      obj.Member = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllDaoMemberResponse>
  ): QueryAllDaoMemberResponse {
    const message = {
      ...baseQueryAllDaoMemberResponse,
    } as QueryAllDaoMemberResponse;
    message.Member = [];
    if (object.Member !== undefined && object.Member !== null) {
      for (const e of object.Member) {
        message.Member.push(Member.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllMemberRequest: object = {};

export const QueryAllMemberRequest = {
  encode(
    message: QueryAllMemberRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllMemberRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllMemberRequest } as QueryAllMemberRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllMemberRequest {
    const message = { ...baseQueryAllMemberRequest } as QueryAllMemberRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllMemberRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllMemberRequest>
  ): QueryAllMemberRequest {
    const message = { ...baseQueryAllMemberRequest } as QueryAllMemberRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllMemberResponse: object = {};

export const QueryAllMemberResponse = {
  encode(
    message: QueryAllMemberResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.Member) {
      Member.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllMemberResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllMemberResponse } as QueryAllMemberResponse;
    message.Member = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Member.push(Member.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllMemberResponse {
    const message = { ...baseQueryAllMemberResponse } as QueryAllMemberResponse;
    message.Member = [];
    if (object.Member !== undefined && object.Member !== null) {
      for (const e of object.Member) {
        message.Member.push(Member.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllMemberResponse): unknown {
    const obj: any = {};
    if (message.Member) {
      obj.Member = message.Member.map((e) =>
        e ? Member.toJSON(e) : undefined
      );
    } else {
      obj.Member = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllMemberResponse>
  ): QueryAllMemberResponse {
    const message = { ...baseQueryAllMemberResponse } as QueryAllMemberResponse;
    message.Member = [];
    if (object.Member !== undefined && object.Member !== null) {
      for (const e of object.Member) {
        message.Member.push(Member.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryGetPullRequestMergePermissionRequest: object = {
  userId: "",
  pullId: 0,
};

export const QueryGetPullRequestMergePermissionRequest = {
  encode(
    message: QueryGetPullRequestMergePermissionRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.pullId !== 0) {
      writer.uint32(16).uint64(message.pullId);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetPullRequestMergePermissionRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetPullRequestMergePermissionRequest,
    } as QueryGetPullRequestMergePermissionRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = reader.string();
          break;
        case 2:
          message.pullId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetPullRequestMergePermissionRequest {
    const message = {
      ...baseQueryGetPullRequestMergePermissionRequest,
    } as QueryGetPullRequestMergePermissionRequest;
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = String(object.userId);
    } else {
      message.userId = "";
    }
    if (object.pullId !== undefined && object.pullId !== null) {
      message.pullId = Number(object.pullId);
    } else {
      message.pullId = 0;
    }
    return message;
  },

  toJSON(message: QueryGetPullRequestMergePermissionRequest): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = message.userId);
    message.pullId !== undefined && (obj.pullId = message.pullId);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetPullRequestMergePermissionRequest>
  ): QueryGetPullRequestMergePermissionRequest {
    const message = {
      ...baseQueryGetPullRequestMergePermissionRequest,
    } as QueryGetPullRequestMergePermissionRequest;
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = object.userId;
    } else {
      message.userId = "";
    }
    if (object.pullId !== undefined && object.pullId !== null) {
      message.pullId = object.pullId;
    } else {
      message.pullId = 0;
    }
    return message;
  },
};

const baseQueryGetPullRequestMergePermissionResponse: object = {
  havePermission: false,
};

export const QueryGetPullRequestMergePermissionResponse = {
  encode(
    message: QueryGetPullRequestMergePermissionResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.havePermission === true) {
      writer.uint32(8).bool(message.havePermission);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetPullRequestMergePermissionResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetPullRequestMergePermissionResponse,
    } as QueryGetPullRequestMergePermissionResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.havePermission = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetPullRequestMergePermissionResponse {
    const message = {
      ...baseQueryGetPullRequestMergePermissionResponse,
    } as QueryGetPullRequestMergePermissionResponse;
    if (object.havePermission !== undefined && object.havePermission !== null) {
      message.havePermission = Boolean(object.havePermission);
    } else {
      message.havePermission = false;
    }
    return message;
  },

  toJSON(message: QueryGetPullRequestMergePermissionResponse): unknown {
    const obj: any = {};
    message.havePermission !== undefined &&
      (obj.havePermission = message.havePermission);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetPullRequestMergePermissionResponse>
  ): QueryGetPullRequestMergePermissionResponse {
    const message = {
      ...baseQueryGetPullRequestMergePermissionResponse,
    } as QueryGetPullRequestMergePermissionResponse;
    if (object.havePermission !== undefined && object.havePermission !== null) {
      message.havePermission = object.havePermission;
    } else {
      message.havePermission = false;
    }
    return message;
  },
};

const baseQueryGetStorageProviderRequest: object = { id: 0 };

export const QueryGetStorageProviderRequest = {
  encode(
    message: QueryGetStorageProviderRequest,
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
  ): QueryGetStorageProviderRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetStorageProviderRequest,
    } as QueryGetStorageProviderRequest;
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

  fromJSON(object: any): QueryGetStorageProviderRequest {
    const message = {
      ...baseQueryGetStorageProviderRequest,
    } as QueryGetStorageProviderRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: QueryGetStorageProviderRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetStorageProviderRequest>
  ): QueryGetStorageProviderRequest {
    const message = {
      ...baseQueryGetStorageProviderRequest,
    } as QueryGetStorageProviderRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseQueryGetStorageProviderResponse: object = {};

export const QueryGetStorageProviderResponse = {
  encode(
    message: QueryGetStorageProviderResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.StorageProvider !== undefined) {
      StorageProvider.encode(
        message.StorageProvider,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetStorageProviderResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetStorageProviderResponse,
    } as QueryGetStorageProviderResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.StorageProvider = StorageProvider.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetStorageProviderResponse {
    const message = {
      ...baseQueryGetStorageProviderResponse,
    } as QueryGetStorageProviderResponse;
    if (
      object.StorageProvider !== undefined &&
      object.StorageProvider !== null
    ) {
      message.StorageProvider = StorageProvider.fromJSON(
        object.StorageProvider
      );
    } else {
      message.StorageProvider = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetStorageProviderResponse): unknown {
    const obj: any = {};
    message.StorageProvider !== undefined &&
      (obj.StorageProvider = message.StorageProvider
        ? StorageProvider.toJSON(message.StorageProvider)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetStorageProviderResponse>
  ): QueryGetStorageProviderResponse {
    const message = {
      ...baseQueryGetStorageProviderResponse,
    } as QueryGetStorageProviderResponse;
    if (
      object.StorageProvider !== undefined &&
      object.StorageProvider !== null
    ) {
      message.StorageProvider = StorageProvider.fromPartial(
        object.StorageProvider
      );
    } else {
      message.StorageProvider = undefined;
    }
    return message;
  },
};

const baseQueryAllStorageProviderRequest: object = {};

export const QueryAllStorageProviderRequest = {
  encode(
    message: QueryAllStorageProviderRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllStorageProviderRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllStorageProviderRequest,
    } as QueryAllStorageProviderRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllStorageProviderRequest {
    const message = {
      ...baseQueryAllStorageProviderRequest,
    } as QueryAllStorageProviderRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllStorageProviderRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllStorageProviderRequest>
  ): QueryAllStorageProviderRequest {
    const message = {
      ...baseQueryAllStorageProviderRequest,
    } as QueryAllStorageProviderRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllStorageProviderResponse: object = {};

export const QueryAllStorageProviderResponse = {
  encode(
    message: QueryAllStorageProviderResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.StorageProvider) {
      StorageProvider.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllStorageProviderResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllStorageProviderResponse,
    } as QueryAllStorageProviderResponse;
    message.StorageProvider = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.StorageProvider.push(
            StorageProvider.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllStorageProviderResponse {
    const message = {
      ...baseQueryAllStorageProviderResponse,
    } as QueryAllStorageProviderResponse;
    message.StorageProvider = [];
    if (
      object.StorageProvider !== undefined &&
      object.StorageProvider !== null
    ) {
      for (const e of object.StorageProvider) {
        message.StorageProvider.push(StorageProvider.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllStorageProviderResponse): unknown {
    const obj: any = {};
    if (message.StorageProvider) {
      obj.StorageProvider = message.StorageProvider.map((e) =>
        e ? StorageProvider.toJSON(e) : undefined
      );
    } else {
      obj.StorageProvider = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllStorageProviderResponse>
  ): QueryAllStorageProviderResponse {
    const message = {
      ...baseQueryAllStorageProviderResponse,
    } as QueryAllStorageProviderResponse;
    message.StorageProvider = [];
    if (
      object.StorageProvider !== undefined &&
      object.StorageProvider !== null
    ) {
      for (const e of object.StorageProvider) {
        message.StorageProvider.push(StorageProvider.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryGetReleaseRequest: object = { id: 0 };

export const QueryGetReleaseRequest = {
  encode(
    message: QueryGetReleaseRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetReleaseRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetReleaseRequest } as QueryGetReleaseRequest;
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

  fromJSON(object: any): QueryGetReleaseRequest {
    const message = { ...baseQueryGetReleaseRequest } as QueryGetReleaseRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: QueryGetReleaseRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetReleaseRequest>
  ): QueryGetReleaseRequest {
    const message = { ...baseQueryGetReleaseRequest } as QueryGetReleaseRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseQueryGetReleaseResponse: object = {};

export const QueryGetReleaseResponse = {
  encode(
    message: QueryGetReleaseResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.Release !== undefined) {
      Release.encode(message.Release, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetReleaseResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetReleaseResponse,
    } as QueryGetReleaseResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Release = Release.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetReleaseResponse {
    const message = {
      ...baseQueryGetReleaseResponse,
    } as QueryGetReleaseResponse;
    if (object.Release !== undefined && object.Release !== null) {
      message.Release = Release.fromJSON(object.Release);
    } else {
      message.Release = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetReleaseResponse): unknown {
    const obj: any = {};
    message.Release !== undefined &&
      (obj.Release = message.Release
        ? Release.toJSON(message.Release)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetReleaseResponse>
  ): QueryGetReleaseResponse {
    const message = {
      ...baseQueryGetReleaseResponse,
    } as QueryGetReleaseResponse;
    if (object.Release !== undefined && object.Release !== null) {
      message.Release = Release.fromPartial(object.Release);
    } else {
      message.Release = undefined;
    }
    return message;
  },
};

const baseQueryAllReleaseRequest: object = {};

export const QueryAllReleaseRequest = {
  encode(
    message: QueryAllReleaseRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllReleaseRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllReleaseRequest } as QueryAllReleaseRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllReleaseRequest {
    const message = { ...baseQueryAllReleaseRequest } as QueryAllReleaseRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllReleaseRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllReleaseRequest>
  ): QueryAllReleaseRequest {
    const message = { ...baseQueryAllReleaseRequest } as QueryAllReleaseRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllReleaseResponse: object = {};

export const QueryAllReleaseResponse = {
  encode(
    message: QueryAllReleaseResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.Release) {
      Release.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllReleaseResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllReleaseResponse,
    } as QueryAllReleaseResponse;
    message.Release = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Release.push(Release.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllReleaseResponse {
    const message = {
      ...baseQueryAllReleaseResponse,
    } as QueryAllReleaseResponse;
    message.Release = [];
    if (object.Release !== undefined && object.Release !== null) {
      for (const e of object.Release) {
        message.Release.push(Release.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllReleaseResponse): unknown {
    const obj: any = {};
    if (message.Release) {
      obj.Release = message.Release.map((e) =>
        e ? Release.toJSON(e) : undefined
      );
    } else {
      obj.Release = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllReleaseResponse>
  ): QueryAllReleaseResponse {
    const message = {
      ...baseQueryAllReleaseResponse,
    } as QueryAllReleaseResponse;
    message.Release = [];
    if (object.Release !== undefined && object.Release !== null) {
      for (const e of object.Release) {
        message.Release.push(Release.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryGetPullRequestRequest: object = { id: 0 };

export const QueryGetPullRequestRequest = {
  encode(
    message: QueryGetPullRequestRequest,
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
  ): QueryGetPullRequestRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetPullRequestRequest,
    } as QueryGetPullRequestRequest;
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

  fromJSON(object: any): QueryGetPullRequestRequest {
    const message = {
      ...baseQueryGetPullRequestRequest,
    } as QueryGetPullRequestRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: QueryGetPullRequestRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetPullRequestRequest>
  ): QueryGetPullRequestRequest {
    const message = {
      ...baseQueryGetPullRequestRequest,
    } as QueryGetPullRequestRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseQueryGetPullRequestResponse: object = {};

export const QueryGetPullRequestResponse = {
  encode(
    message: QueryGetPullRequestResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.PullRequest !== undefined) {
      PullRequest.encode(
        message.PullRequest,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetPullRequestResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetPullRequestResponse,
    } as QueryGetPullRequestResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.PullRequest = PullRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetPullRequestResponse {
    const message = {
      ...baseQueryGetPullRequestResponse,
    } as QueryGetPullRequestResponse;
    if (object.PullRequest !== undefined && object.PullRequest !== null) {
      message.PullRequest = PullRequest.fromJSON(object.PullRequest);
    } else {
      message.PullRequest = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetPullRequestResponse): unknown {
    const obj: any = {};
    message.PullRequest !== undefined &&
      (obj.PullRequest = message.PullRequest
        ? PullRequest.toJSON(message.PullRequest)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetPullRequestResponse>
  ): QueryGetPullRequestResponse {
    const message = {
      ...baseQueryGetPullRequestResponse,
    } as QueryGetPullRequestResponse;
    if (object.PullRequest !== undefined && object.PullRequest !== null) {
      message.PullRequest = PullRequest.fromPartial(object.PullRequest);
    } else {
      message.PullRequest = undefined;
    }
    return message;
  },
};

const baseQueryAllPullRequestRequest: object = {};

export const QueryAllPullRequestRequest = {
  encode(
    message: QueryAllPullRequestRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllPullRequestRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllPullRequestRequest,
    } as QueryAllPullRequestRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllPullRequestRequest {
    const message = {
      ...baseQueryAllPullRequestRequest,
    } as QueryAllPullRequestRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllPullRequestRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllPullRequestRequest>
  ): QueryAllPullRequestRequest {
    const message = {
      ...baseQueryAllPullRequestRequest,
    } as QueryAllPullRequestRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllPullRequestResponse: object = {};

export const QueryAllPullRequestResponse = {
  encode(
    message: QueryAllPullRequestResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.PullRequest) {
      PullRequest.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllPullRequestResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllPullRequestResponse,
    } as QueryAllPullRequestResponse;
    message.PullRequest = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.PullRequest.push(PullRequest.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllPullRequestResponse {
    const message = {
      ...baseQueryAllPullRequestResponse,
    } as QueryAllPullRequestResponse;
    message.PullRequest = [];
    if (object.PullRequest !== undefined && object.PullRequest !== null) {
      for (const e of object.PullRequest) {
        message.PullRequest.push(PullRequest.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllPullRequestResponse): unknown {
    const obj: any = {};
    if (message.PullRequest) {
      obj.PullRequest = message.PullRequest.map((e) =>
        e ? PullRequest.toJSON(e) : undefined
      );
    } else {
      obj.PullRequest = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllPullRequestResponse>
  ): QueryAllPullRequestResponse {
    const message = {
      ...baseQueryAllPullRequestResponse,
    } as QueryAllPullRequestResponse;
    message.PullRequest = [];
    if (object.PullRequest !== undefined && object.PullRequest !== null) {
      for (const e of object.PullRequest) {
        message.PullRequest.push(PullRequest.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryGetDaoRequest: object = { id: "" };

export const QueryGetDaoRequest = {
  encode(
    message: QueryGetDaoRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetDaoRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetDaoRequest } as QueryGetDaoRequest;
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

  fromJSON(object: any): QueryGetDaoRequest {
    const message = { ...baseQueryGetDaoRequest } as QueryGetDaoRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    return message;
  },

  toJSON(message: QueryGetDaoRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryGetDaoRequest>): QueryGetDaoRequest {
    const message = { ...baseQueryGetDaoRequest } as QueryGetDaoRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    return message;
  },
};

const baseQueryGetDaoResponse: object = {};

export const QueryGetDaoResponse = {
  encode(
    message: QueryGetDaoResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.dao !== undefined) {
      Dao.encode(message.dao, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetDaoResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetDaoResponse } as QueryGetDaoResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.dao = Dao.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetDaoResponse {
    const message = { ...baseQueryGetDaoResponse } as QueryGetDaoResponse;
    if (object.dao !== undefined && object.dao !== null) {
      message.dao = Dao.fromJSON(object.dao);
    } else {
      message.dao = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetDaoResponse): unknown {
    const obj: any = {};
    message.dao !== undefined &&
      (obj.dao = message.dao ? Dao.toJSON(message.dao) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryGetDaoResponse>): QueryGetDaoResponse {
    const message = { ...baseQueryGetDaoResponse } as QueryGetDaoResponse;
    if (object.dao !== undefined && object.dao !== null) {
      message.dao = Dao.fromPartial(object.dao);
    } else {
      message.dao = undefined;
    }
    return message;
  },
};

const baseQueryAllDaoRequest: object = {};

export const QueryAllDaoRequest = {
  encode(
    message: QueryAllDaoRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllDaoRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllDaoRequest } as QueryAllDaoRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllDaoRequest {
    const message = { ...baseQueryAllDaoRequest } as QueryAllDaoRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllDaoRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAllDaoRequest>): QueryAllDaoRequest {
    const message = { ...baseQueryAllDaoRequest } as QueryAllDaoRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllDaoResponse: object = {};

export const QueryAllDaoResponse = {
  encode(
    message: QueryAllDaoResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.dao) {
      Dao.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllDaoResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllDaoResponse } as QueryAllDaoResponse;
    message.dao = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.dao.push(Dao.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllDaoResponse {
    const message = { ...baseQueryAllDaoResponse } as QueryAllDaoResponse;
    message.dao = [];
    if (object.dao !== undefined && object.dao !== null) {
      for (const e of object.dao) {
        message.dao.push(Dao.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllDaoResponse): unknown {
    const obj: any = {};
    if (message.dao) {
      obj.dao = message.dao.map((e) => (e ? Dao.toJSON(e) : undefined));
    } else {
      obj.dao = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAllDaoResponse>): QueryAllDaoResponse {
    const message = { ...baseQueryAllDaoResponse } as QueryAllDaoResponse;
    message.dao = [];
    if (object.dao !== undefined && object.dao !== null) {
      for (const e of object.dao) {
        message.dao.push(Dao.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryGetCommentRequest: object = { id: 0 };

export const QueryGetCommentRequest = {
  encode(
    message: QueryGetCommentRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetCommentRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetCommentRequest } as QueryGetCommentRequest;
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

  fromJSON(object: any): QueryGetCommentRequest {
    const message = { ...baseQueryGetCommentRequest } as QueryGetCommentRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: QueryGetCommentRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetCommentRequest>
  ): QueryGetCommentRequest {
    const message = { ...baseQueryGetCommentRequest } as QueryGetCommentRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseQueryGetCommentResponse: object = {};

export const QueryGetCommentResponse = {
  encode(
    message: QueryGetCommentResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.Comment !== undefined) {
      Comment.encode(message.Comment, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetCommentResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetCommentResponse,
    } as QueryGetCommentResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Comment = Comment.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetCommentResponse {
    const message = {
      ...baseQueryGetCommentResponse,
    } as QueryGetCommentResponse;
    if (object.Comment !== undefined && object.Comment !== null) {
      message.Comment = Comment.fromJSON(object.Comment);
    } else {
      message.Comment = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetCommentResponse): unknown {
    const obj: any = {};
    message.Comment !== undefined &&
      (obj.Comment = message.Comment
        ? Comment.toJSON(message.Comment)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetCommentResponse>
  ): QueryGetCommentResponse {
    const message = {
      ...baseQueryGetCommentResponse,
    } as QueryGetCommentResponse;
    if (object.Comment !== undefined && object.Comment !== null) {
      message.Comment = Comment.fromPartial(object.Comment);
    } else {
      message.Comment = undefined;
    }
    return message;
  },
};

const baseQueryAllCommentRequest: object = {};

export const QueryAllCommentRequest = {
  encode(
    message: QueryAllCommentRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllCommentRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllCommentRequest } as QueryAllCommentRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllCommentRequest {
    const message = { ...baseQueryAllCommentRequest } as QueryAllCommentRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllCommentRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllCommentRequest>
  ): QueryAllCommentRequest {
    const message = { ...baseQueryAllCommentRequest } as QueryAllCommentRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllCommentResponse: object = {};

export const QueryAllCommentResponse = {
  encode(
    message: QueryAllCommentResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.Comment) {
      Comment.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllCommentResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllCommentResponse,
    } as QueryAllCommentResponse;
    message.Comment = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Comment.push(Comment.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllCommentResponse {
    const message = {
      ...baseQueryAllCommentResponse,
    } as QueryAllCommentResponse;
    message.Comment = [];
    if (object.Comment !== undefined && object.Comment !== null) {
      for (const e of object.Comment) {
        message.Comment.push(Comment.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllCommentResponse): unknown {
    const obj: any = {};
    if (message.Comment) {
      obj.Comment = message.Comment.map((e) =>
        e ? Comment.toJSON(e) : undefined
      );
    } else {
      obj.Comment = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllCommentResponse>
  ): QueryAllCommentResponse {
    const message = {
      ...baseQueryAllCommentResponse,
    } as QueryAllCommentResponse;
    message.Comment = [];
    if (object.Comment !== undefined && object.Comment !== null) {
      for (const e of object.Comment) {
        message.Comment.push(Comment.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryGetIssueRequest: object = { id: 0 };

export const QueryGetIssueRequest = {
  encode(
    message: QueryGetIssueRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetIssueRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetIssueRequest } as QueryGetIssueRequest;
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

  fromJSON(object: any): QueryGetIssueRequest {
    const message = { ...baseQueryGetIssueRequest } as QueryGetIssueRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: QueryGetIssueRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryGetIssueRequest>): QueryGetIssueRequest {
    const message = { ...baseQueryGetIssueRequest } as QueryGetIssueRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseQueryGetIssueResponse: object = {};

export const QueryGetIssueResponse = {
  encode(
    message: QueryGetIssueResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.Issue !== undefined) {
      Issue.encode(message.Issue, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetIssueResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetIssueResponse } as QueryGetIssueResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Issue = Issue.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetIssueResponse {
    const message = { ...baseQueryGetIssueResponse } as QueryGetIssueResponse;
    if (object.Issue !== undefined && object.Issue !== null) {
      message.Issue = Issue.fromJSON(object.Issue);
    } else {
      message.Issue = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetIssueResponse): unknown {
    const obj: any = {};
    message.Issue !== undefined &&
      (obj.Issue = message.Issue ? Issue.toJSON(message.Issue) : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetIssueResponse>
  ): QueryGetIssueResponse {
    const message = { ...baseQueryGetIssueResponse } as QueryGetIssueResponse;
    if (object.Issue !== undefined && object.Issue !== null) {
      message.Issue = Issue.fromPartial(object.Issue);
    } else {
      message.Issue = undefined;
    }
    return message;
  },
};

const baseQueryAllIssueRequest: object = {};

export const QueryAllIssueRequest = {
  encode(
    message: QueryAllIssueRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllIssueRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllIssueRequest } as QueryAllIssueRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllIssueRequest {
    const message = { ...baseQueryAllIssueRequest } as QueryAllIssueRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllIssueRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAllIssueRequest>): QueryAllIssueRequest {
    const message = { ...baseQueryAllIssueRequest } as QueryAllIssueRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllIssueResponse: object = {};

export const QueryAllIssueResponse = {
  encode(
    message: QueryAllIssueResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.Issue) {
      Issue.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllIssueResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllIssueResponse } as QueryAllIssueResponse;
    message.Issue = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Issue.push(Issue.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllIssueResponse {
    const message = { ...baseQueryAllIssueResponse } as QueryAllIssueResponse;
    message.Issue = [];
    if (object.Issue !== undefined && object.Issue !== null) {
      for (const e of object.Issue) {
        message.Issue.push(Issue.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllIssueResponse): unknown {
    const obj: any = {};
    if (message.Issue) {
      obj.Issue = message.Issue.map((e) => (e ? Issue.toJSON(e) : undefined));
    } else {
      obj.Issue = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllIssueResponse>
  ): QueryAllIssueResponse {
    const message = { ...baseQueryAllIssueResponse } as QueryAllIssueResponse;
    message.Issue = [];
    if (object.Issue !== undefined && object.Issue !== null) {
      for (const e of object.Issue) {
        message.Issue.push(Issue.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryGetLatestRepositoryReleaseRequest: object = {
  id: "",
  repositoryName: "",
};

export const QueryGetLatestRepositoryReleaseRequest = {
  encode(
    message: QueryGetLatestRepositoryReleaseRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.repositoryName !== "") {
      writer.uint32(18).string(message.repositoryName);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetLatestRepositoryReleaseRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetLatestRepositoryReleaseRequest,
    } as QueryGetLatestRepositoryReleaseRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.repositoryName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetLatestRepositoryReleaseRequest {
    const message = {
      ...baseQueryGetLatestRepositoryReleaseRequest,
    } as QueryGetLatestRepositoryReleaseRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.repositoryName !== undefined && object.repositoryName !== null) {
      message.repositoryName = String(object.repositoryName);
    } else {
      message.repositoryName = "";
    }
    return message;
  },

  toJSON(message: QueryGetLatestRepositoryReleaseRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.repositoryName !== undefined &&
      (obj.repositoryName = message.repositoryName);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetLatestRepositoryReleaseRequest>
  ): QueryGetLatestRepositoryReleaseRequest {
    const message = {
      ...baseQueryGetLatestRepositoryReleaseRequest,
    } as QueryGetLatestRepositoryReleaseRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.repositoryName !== undefined && object.repositoryName !== null) {
      message.repositoryName = object.repositoryName;
    } else {
      message.repositoryName = "";
    }
    return message;
  },
};

const baseQueryGetLatestRepositoryReleaseResponse: object = {};

export const QueryGetLatestRepositoryReleaseResponse = {
  encode(
    message: QueryGetLatestRepositoryReleaseResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.Release !== undefined) {
      Release.encode(message.Release, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetLatestRepositoryReleaseResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetLatestRepositoryReleaseResponse,
    } as QueryGetLatestRepositoryReleaseResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Release = Release.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetLatestRepositoryReleaseResponse {
    const message = {
      ...baseQueryGetLatestRepositoryReleaseResponse,
    } as QueryGetLatestRepositoryReleaseResponse;
    if (object.Release !== undefined && object.Release !== null) {
      message.Release = Release.fromJSON(object.Release);
    } else {
      message.Release = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetLatestRepositoryReleaseResponse): unknown {
    const obj: any = {};
    message.Release !== undefined &&
      (obj.Release = message.Release
        ? Release.toJSON(message.Release)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetLatestRepositoryReleaseResponse>
  ): QueryGetLatestRepositoryReleaseResponse {
    const message = {
      ...baseQueryGetLatestRepositoryReleaseResponse,
    } as QueryGetLatestRepositoryReleaseResponse;
    if (object.Release !== undefined && object.Release !== null) {
      message.Release = Release.fromPartial(object.Release);
    } else {
      message.Release = undefined;
    }
    return message;
  },
};

const baseQueryGetRepositoryReleaseRequest: object = {
  id: "",
  repositoryName: "",
  tagName: "",
};

export const QueryGetRepositoryReleaseRequest = {
  encode(
    message: QueryGetRepositoryReleaseRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.repositoryName !== "") {
      writer.uint32(18).string(message.repositoryName);
    }
    if (message.tagName !== "") {
      writer.uint32(26).string(message.tagName);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetRepositoryReleaseRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetRepositoryReleaseRequest,
    } as QueryGetRepositoryReleaseRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.repositoryName = reader.string();
          break;
        case 3:
          message.tagName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetRepositoryReleaseRequest {
    const message = {
      ...baseQueryGetRepositoryReleaseRequest,
    } as QueryGetRepositoryReleaseRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.repositoryName !== undefined && object.repositoryName !== null) {
      message.repositoryName = String(object.repositoryName);
    } else {
      message.repositoryName = "";
    }
    if (object.tagName !== undefined && object.tagName !== null) {
      message.tagName = String(object.tagName);
    } else {
      message.tagName = "";
    }
    return message;
  },

  toJSON(message: QueryGetRepositoryReleaseRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.repositoryName !== undefined &&
      (obj.repositoryName = message.repositoryName);
    message.tagName !== undefined && (obj.tagName = message.tagName);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetRepositoryReleaseRequest>
  ): QueryGetRepositoryReleaseRequest {
    const message = {
      ...baseQueryGetRepositoryReleaseRequest,
    } as QueryGetRepositoryReleaseRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.repositoryName !== undefined && object.repositoryName !== null) {
      message.repositoryName = object.repositoryName;
    } else {
      message.repositoryName = "";
    }
    if (object.tagName !== undefined && object.tagName !== null) {
      message.tagName = object.tagName;
    } else {
      message.tagName = "";
    }
    return message;
  },
};

const baseQueryGetRepositoryReleaseResponse: object = {};

export const QueryGetRepositoryReleaseResponse = {
  encode(
    message: QueryGetRepositoryReleaseResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.Release !== undefined) {
      Release.encode(message.Release, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetRepositoryReleaseResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetRepositoryReleaseResponse,
    } as QueryGetRepositoryReleaseResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Release = Release.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetRepositoryReleaseResponse {
    const message = {
      ...baseQueryGetRepositoryReleaseResponse,
    } as QueryGetRepositoryReleaseResponse;
    if (object.Release !== undefined && object.Release !== null) {
      message.Release = Release.fromJSON(object.Release);
    } else {
      message.Release = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetRepositoryReleaseResponse): unknown {
    const obj: any = {};
    message.Release !== undefined &&
      (obj.Release = message.Release
        ? Release.toJSON(message.Release)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetRepositoryReleaseResponse>
  ): QueryGetRepositoryReleaseResponse {
    const message = {
      ...baseQueryGetRepositoryReleaseResponse,
    } as QueryGetRepositoryReleaseResponse;
    if (object.Release !== undefined && object.Release !== null) {
      message.Release = Release.fromPartial(object.Release);
    } else {
      message.Release = undefined;
    }
    return message;
  },
};

const baseQueryAllRepositoryReleaseRequest: object = {
  id: "",
  repositoryName: "",
};

export const QueryAllRepositoryReleaseRequest = {
  encode(
    message: QueryAllRepositoryReleaseRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.repositoryName !== "") {
      writer.uint32(18).string(message.repositoryName);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllRepositoryReleaseRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllRepositoryReleaseRequest,
    } as QueryAllRepositoryReleaseRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.repositoryName = reader.string();
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllRepositoryReleaseRequest {
    const message = {
      ...baseQueryAllRepositoryReleaseRequest,
    } as QueryAllRepositoryReleaseRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.repositoryName !== undefined && object.repositoryName !== null) {
      message.repositoryName = String(object.repositoryName);
    } else {
      message.repositoryName = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllRepositoryReleaseRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.repositoryName !== undefined &&
      (obj.repositoryName = message.repositoryName);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllRepositoryReleaseRequest>
  ): QueryAllRepositoryReleaseRequest {
    const message = {
      ...baseQueryAllRepositoryReleaseRequest,
    } as QueryAllRepositoryReleaseRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.repositoryName !== undefined && object.repositoryName !== null) {
      message.repositoryName = object.repositoryName;
    } else {
      message.repositoryName = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllRepositoryReleaseResponse: object = {};

export const QueryAllRepositoryReleaseResponse = {
  encode(
    message: QueryAllRepositoryReleaseResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.Release) {
      Release.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllRepositoryReleaseResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllRepositoryReleaseResponse,
    } as QueryAllRepositoryReleaseResponse;
    message.Release = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Release.push(Release.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllRepositoryReleaseResponse {
    const message = {
      ...baseQueryAllRepositoryReleaseResponse,
    } as QueryAllRepositoryReleaseResponse;
    message.Release = [];
    if (object.Release !== undefined && object.Release !== null) {
      for (const e of object.Release) {
        message.Release.push(Release.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllRepositoryReleaseResponse): unknown {
    const obj: any = {};
    if (message.Release) {
      obj.Release = message.Release.map((e) =>
        e ? Release.toJSON(e) : undefined
      );
    } else {
      obj.Release = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllRepositoryReleaseResponse>
  ): QueryAllRepositoryReleaseResponse {
    const message = {
      ...baseQueryAllRepositoryReleaseResponse,
    } as QueryAllRepositoryReleaseResponse;
    message.Release = [];
    if (object.Release !== undefined && object.Release !== null) {
      for (const e of object.Release) {
        message.Release.push(Release.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryGetRepositoryIssueRequest: object = {
  id: "",
  repositoryName: "",
  issueIid: 0,
};

export const QueryGetRepositoryIssueRequest = {
  encode(
    message: QueryGetRepositoryIssueRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.repositoryName !== "") {
      writer.uint32(18).string(message.repositoryName);
    }
    if (message.issueIid !== 0) {
      writer.uint32(24).uint64(message.issueIid);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetRepositoryIssueRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetRepositoryIssueRequest,
    } as QueryGetRepositoryIssueRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.repositoryName = reader.string();
          break;
        case 3:
          message.issueIid = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetRepositoryIssueRequest {
    const message = {
      ...baseQueryGetRepositoryIssueRequest,
    } as QueryGetRepositoryIssueRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.repositoryName !== undefined && object.repositoryName !== null) {
      message.repositoryName = String(object.repositoryName);
    } else {
      message.repositoryName = "";
    }
    if (object.issueIid !== undefined && object.issueIid !== null) {
      message.issueIid = Number(object.issueIid);
    } else {
      message.issueIid = 0;
    }
    return message;
  },

  toJSON(message: QueryGetRepositoryIssueRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.repositoryName !== undefined &&
      (obj.repositoryName = message.repositoryName);
    message.issueIid !== undefined && (obj.issueIid = message.issueIid);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetRepositoryIssueRequest>
  ): QueryGetRepositoryIssueRequest {
    const message = {
      ...baseQueryGetRepositoryIssueRequest,
    } as QueryGetRepositoryIssueRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.repositoryName !== undefined && object.repositoryName !== null) {
      message.repositoryName = object.repositoryName;
    } else {
      message.repositoryName = "";
    }
    if (object.issueIid !== undefined && object.issueIid !== null) {
      message.issueIid = object.issueIid;
    } else {
      message.issueIid = 0;
    }
    return message;
  },
};

const baseQueryGetRepositoryIssueResponse: object = {};

export const QueryGetRepositoryIssueResponse = {
  encode(
    message: QueryGetRepositoryIssueResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.Issue !== undefined) {
      Issue.encode(message.Issue, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetRepositoryIssueResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetRepositoryIssueResponse,
    } as QueryGetRepositoryIssueResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Issue = Issue.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetRepositoryIssueResponse {
    const message = {
      ...baseQueryGetRepositoryIssueResponse,
    } as QueryGetRepositoryIssueResponse;
    if (object.Issue !== undefined && object.Issue !== null) {
      message.Issue = Issue.fromJSON(object.Issue);
    } else {
      message.Issue = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetRepositoryIssueResponse): unknown {
    const obj: any = {};
    message.Issue !== undefined &&
      (obj.Issue = message.Issue ? Issue.toJSON(message.Issue) : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetRepositoryIssueResponse>
  ): QueryGetRepositoryIssueResponse {
    const message = {
      ...baseQueryGetRepositoryIssueResponse,
    } as QueryGetRepositoryIssueResponse;
    if (object.Issue !== undefined && object.Issue !== null) {
      message.Issue = Issue.fromPartial(object.Issue);
    } else {
      message.Issue = undefined;
    }
    return message;
  },
};

const baseQueryGetRepositoryPullRequestRequest: object = {
  id: "",
  repositoryName: "",
  pullIid: 0,
};

export const QueryGetRepositoryPullRequestRequest = {
  encode(
    message: QueryGetRepositoryPullRequestRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.repositoryName !== "") {
      writer.uint32(18).string(message.repositoryName);
    }
    if (message.pullIid !== 0) {
      writer.uint32(24).uint64(message.pullIid);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetRepositoryPullRequestRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetRepositoryPullRequestRequest,
    } as QueryGetRepositoryPullRequestRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.repositoryName = reader.string();
          break;
        case 3:
          message.pullIid = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetRepositoryPullRequestRequest {
    const message = {
      ...baseQueryGetRepositoryPullRequestRequest,
    } as QueryGetRepositoryPullRequestRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.repositoryName !== undefined && object.repositoryName !== null) {
      message.repositoryName = String(object.repositoryName);
    } else {
      message.repositoryName = "";
    }
    if (object.pullIid !== undefined && object.pullIid !== null) {
      message.pullIid = Number(object.pullIid);
    } else {
      message.pullIid = 0;
    }
    return message;
  },

  toJSON(message: QueryGetRepositoryPullRequestRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.repositoryName !== undefined &&
      (obj.repositoryName = message.repositoryName);
    message.pullIid !== undefined && (obj.pullIid = message.pullIid);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetRepositoryPullRequestRequest>
  ): QueryGetRepositoryPullRequestRequest {
    const message = {
      ...baseQueryGetRepositoryPullRequestRequest,
    } as QueryGetRepositoryPullRequestRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.repositoryName !== undefined && object.repositoryName !== null) {
      message.repositoryName = object.repositoryName;
    } else {
      message.repositoryName = "";
    }
    if (object.pullIid !== undefined && object.pullIid !== null) {
      message.pullIid = object.pullIid;
    } else {
      message.pullIid = 0;
    }
    return message;
  },
};

const baseQueryGetRepositoryPullRequestResponse: object = {};

export const QueryGetRepositoryPullRequestResponse = {
  encode(
    message: QueryGetRepositoryPullRequestResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.PullRequest !== undefined) {
      PullRequest.encode(
        message.PullRequest,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetRepositoryPullRequestResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetRepositoryPullRequestResponse,
    } as QueryGetRepositoryPullRequestResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.PullRequest = PullRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetRepositoryPullRequestResponse {
    const message = {
      ...baseQueryGetRepositoryPullRequestResponse,
    } as QueryGetRepositoryPullRequestResponse;
    if (object.PullRequest !== undefined && object.PullRequest !== null) {
      message.PullRequest = PullRequest.fromJSON(object.PullRequest);
    } else {
      message.PullRequest = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetRepositoryPullRequestResponse): unknown {
    const obj: any = {};
    message.PullRequest !== undefined &&
      (obj.PullRequest = message.PullRequest
        ? PullRequest.toJSON(message.PullRequest)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetRepositoryPullRequestResponse>
  ): QueryGetRepositoryPullRequestResponse {
    const message = {
      ...baseQueryGetRepositoryPullRequestResponse,
    } as QueryGetRepositoryPullRequestResponse;
    if (object.PullRequest !== undefined && object.PullRequest !== null) {
      message.PullRequest = PullRequest.fromPartial(object.PullRequest);
    } else {
      message.PullRequest = undefined;
    }
    return message;
  },
};

const baseQueryAllRepositoryIssueRequest: object = {
  id: "",
  repositoryName: "",
};

export const QueryAllRepositoryIssueRequest = {
  encode(
    message: QueryAllRepositoryIssueRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.repositoryName !== "") {
      writer.uint32(18).string(message.repositoryName);
    }
    if (message.option !== undefined) {
      IssueOptions.encode(message.option, writer.uint32(26).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllRepositoryIssueRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllRepositoryIssueRequest,
    } as QueryAllRepositoryIssueRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.repositoryName = reader.string();
          break;
        case 3:
          message.option = IssueOptions.decode(reader, reader.uint32());
          break;
        case 4:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllRepositoryIssueRequest {
    const message = {
      ...baseQueryAllRepositoryIssueRequest,
    } as QueryAllRepositoryIssueRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.repositoryName !== undefined && object.repositoryName !== null) {
      message.repositoryName = String(object.repositoryName);
    } else {
      message.repositoryName = "";
    }
    if (object.option !== undefined && object.option !== null) {
      message.option = IssueOptions.fromJSON(object.option);
    } else {
      message.option = undefined;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllRepositoryIssueRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.repositoryName !== undefined &&
      (obj.repositoryName = message.repositoryName);
    message.option !== undefined &&
      (obj.option = message.option
        ? IssueOptions.toJSON(message.option)
        : undefined);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllRepositoryIssueRequest>
  ): QueryAllRepositoryIssueRequest {
    const message = {
      ...baseQueryAllRepositoryIssueRequest,
    } as QueryAllRepositoryIssueRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.repositoryName !== undefined && object.repositoryName !== null) {
      message.repositoryName = object.repositoryName;
    } else {
      message.repositoryName = "";
    }
    if (object.option !== undefined && object.option !== null) {
      message.option = IssueOptions.fromPartial(object.option);
    } else {
      message.option = undefined;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseIssueOptions: object = {
  createdBy: "",
  state: "",
  labels: "",
  assignee: "",
  labelIds: 0,
  sort: "",
  search: "",
  updatedAfter: 0,
  updatedBefore: 0,
};

export const IssueOptions = {
  encode(message: IssueOptions, writer: Writer = Writer.create()): Writer {
    if (message.createdBy !== "") {
      writer.uint32(10).string(message.createdBy);
    }
    if (message.state !== "") {
      writer.uint32(18).string(message.state);
    }
    if (message.labels !== "") {
      writer.uint32(26).string(message.labels);
    }
    if (message.assignee !== "") {
      writer.uint32(34).string(message.assignee);
    }
    writer.uint32(42).fork();
    for (const v of message.labelIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.sort !== "") {
      writer.uint32(50).string(message.sort);
    }
    if (message.search !== "") {
      writer.uint32(58).string(message.search);
    }
    if (message.updatedAfter !== 0) {
      writer.uint32(64).int64(message.updatedAfter);
    }
    if (message.updatedBefore !== 0) {
      writer.uint32(72).int64(message.updatedBefore);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): IssueOptions {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseIssueOptions } as IssueOptions;
    message.labelIds = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.createdBy = reader.string();
          break;
        case 2:
          message.state = reader.string();
          break;
        case 3:
          message.labels = reader.string();
          break;
        case 4:
          message.assignee = reader.string();
          break;
        case 5:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.labelIds.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.labelIds.push(longToNumber(reader.uint64() as Long));
          }
          break;
        case 6:
          message.sort = reader.string();
          break;
        case 7:
          message.search = reader.string();
          break;
        case 8:
          message.updatedAfter = longToNumber(reader.int64() as Long);
          break;
        case 9:
          message.updatedBefore = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): IssueOptions {
    const message = { ...baseIssueOptions } as IssueOptions;
    message.labelIds = [];
    if (object.createdBy !== undefined && object.createdBy !== null) {
      message.createdBy = String(object.createdBy);
    } else {
      message.createdBy = "";
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = String(object.state);
    } else {
      message.state = "";
    }
    if (object.labels !== undefined && object.labels !== null) {
      message.labels = String(object.labels);
    } else {
      message.labels = "";
    }
    if (object.assignee !== undefined && object.assignee !== null) {
      message.assignee = String(object.assignee);
    } else {
      message.assignee = "";
    }
    if (object.labelIds !== undefined && object.labelIds !== null) {
      for (const e of object.labelIds) {
        message.labelIds.push(Number(e));
      }
    }
    if (object.sort !== undefined && object.sort !== null) {
      message.sort = String(object.sort);
    } else {
      message.sort = "";
    }
    if (object.search !== undefined && object.search !== null) {
      message.search = String(object.search);
    } else {
      message.search = "";
    }
    if (object.updatedAfter !== undefined && object.updatedAfter !== null) {
      message.updatedAfter = Number(object.updatedAfter);
    } else {
      message.updatedAfter = 0;
    }
    if (object.updatedBefore !== undefined && object.updatedBefore !== null) {
      message.updatedBefore = Number(object.updatedBefore);
    } else {
      message.updatedBefore = 0;
    }
    return message;
  },

  toJSON(message: IssueOptions): unknown {
    const obj: any = {};
    message.createdBy !== undefined && (obj.createdBy = message.createdBy);
    message.state !== undefined && (obj.state = message.state);
    message.labels !== undefined && (obj.labels = message.labels);
    message.assignee !== undefined && (obj.assignee = message.assignee);
    if (message.labelIds) {
      obj.labelIds = message.labelIds.map((e) => e);
    } else {
      obj.labelIds = [];
    }
    message.sort !== undefined && (obj.sort = message.sort);
    message.search !== undefined && (obj.search = message.search);
    message.updatedAfter !== undefined &&
      (obj.updatedAfter = message.updatedAfter);
    message.updatedBefore !== undefined &&
      (obj.updatedBefore = message.updatedBefore);
    return obj;
  },

  fromPartial(object: DeepPartial<IssueOptions>): IssueOptions {
    const message = { ...baseIssueOptions } as IssueOptions;
    message.labelIds = [];
    if (object.createdBy !== undefined && object.createdBy !== null) {
      message.createdBy = object.createdBy;
    } else {
      message.createdBy = "";
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    } else {
      message.state = "";
    }
    if (object.labels !== undefined && object.labels !== null) {
      message.labels = object.labels;
    } else {
      message.labels = "";
    }
    if (object.assignee !== undefined && object.assignee !== null) {
      message.assignee = object.assignee;
    } else {
      message.assignee = "";
    }
    if (object.labelIds !== undefined && object.labelIds !== null) {
      for (const e of object.labelIds) {
        message.labelIds.push(e);
      }
    }
    if (object.sort !== undefined && object.sort !== null) {
      message.sort = object.sort;
    } else {
      message.sort = "";
    }
    if (object.search !== undefined && object.search !== null) {
      message.search = object.search;
    } else {
      message.search = "";
    }
    if (object.updatedAfter !== undefined && object.updatedAfter !== null) {
      message.updatedAfter = object.updatedAfter;
    } else {
      message.updatedAfter = 0;
    }
    if (object.updatedBefore !== undefined && object.updatedBefore !== null) {
      message.updatedBefore = object.updatedBefore;
    } else {
      message.updatedBefore = 0;
    }
    return message;
  },
};

const baseQueryAllRepositoryIssueResponse: object = {};

export const QueryAllRepositoryIssueResponse = {
  encode(
    message: QueryAllRepositoryIssueResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.Issue) {
      Issue.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllRepositoryIssueResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllRepositoryIssueResponse,
    } as QueryAllRepositoryIssueResponse;
    message.Issue = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Issue.push(Issue.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllRepositoryIssueResponse {
    const message = {
      ...baseQueryAllRepositoryIssueResponse,
    } as QueryAllRepositoryIssueResponse;
    message.Issue = [];
    if (object.Issue !== undefined && object.Issue !== null) {
      for (const e of object.Issue) {
        message.Issue.push(Issue.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllRepositoryIssueResponse): unknown {
    const obj: any = {};
    if (message.Issue) {
      obj.Issue = message.Issue.map((e) => (e ? Issue.toJSON(e) : undefined));
    } else {
      obj.Issue = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllRepositoryIssueResponse>
  ): QueryAllRepositoryIssueResponse {
    const message = {
      ...baseQueryAllRepositoryIssueResponse,
    } as QueryAllRepositoryIssueResponse;
    message.Issue = [];
    if (object.Issue !== undefined && object.Issue !== null) {
      for (const e of object.Issue) {
        message.Issue.push(Issue.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllRepositoryPullRequestRequest: object = {
  id: "",
  repositoryName: "",
};

export const QueryAllRepositoryPullRequestRequest = {
  encode(
    message: QueryAllRepositoryPullRequestRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.repositoryName !== "") {
      writer.uint32(18).string(message.repositoryName);
    }
    if (message.option !== undefined) {
      PullRequestOptions.encode(
        message.option,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllRepositoryPullRequestRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllRepositoryPullRequestRequest,
    } as QueryAllRepositoryPullRequestRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.repositoryName = reader.string();
          break;
        case 3:
          message.option = PullRequestOptions.decode(reader, reader.uint32());
          break;
        case 4:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllRepositoryPullRequestRequest {
    const message = {
      ...baseQueryAllRepositoryPullRequestRequest,
    } as QueryAllRepositoryPullRequestRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.repositoryName !== undefined && object.repositoryName !== null) {
      message.repositoryName = String(object.repositoryName);
    } else {
      message.repositoryName = "";
    }
    if (object.option !== undefined && object.option !== null) {
      message.option = PullRequestOptions.fromJSON(object.option);
    } else {
      message.option = undefined;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllRepositoryPullRequestRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.repositoryName !== undefined &&
      (obj.repositoryName = message.repositoryName);
    message.option !== undefined &&
      (obj.option = message.option
        ? PullRequestOptions.toJSON(message.option)
        : undefined);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllRepositoryPullRequestRequest>
  ): QueryAllRepositoryPullRequestRequest {
    const message = {
      ...baseQueryAllRepositoryPullRequestRequest,
    } as QueryAllRepositoryPullRequestRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.repositoryName !== undefined && object.repositoryName !== null) {
      message.repositoryName = object.repositoryName;
    } else {
      message.repositoryName = "";
    }
    if (object.option !== undefined && object.option !== null) {
      message.option = PullRequestOptions.fromPartial(object.option);
    } else {
      message.option = undefined;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const basePullRequestOptions: object = {
  createdBy: "",
  state: "",
  labels: "",
  assignee: "",
  reviewer: "",
  labelIds: 0,
  sort: "",
  search: "",
  updatedAfter: 0,
  updatedBefore: 0,
};

export const PullRequestOptions = {
  encode(
    message: PullRequestOptions,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.createdBy !== "") {
      writer.uint32(10).string(message.createdBy);
    }
    if (message.state !== "") {
      writer.uint32(18).string(message.state);
    }
    if (message.labels !== "") {
      writer.uint32(26).string(message.labels);
    }
    if (message.assignee !== "") {
      writer.uint32(34).string(message.assignee);
    }
    if (message.reviewer !== "") {
      writer.uint32(42).string(message.reviewer);
    }
    writer.uint32(50).fork();
    for (const v of message.labelIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.sort !== "") {
      writer.uint32(58).string(message.sort);
    }
    if (message.search !== "") {
      writer.uint32(66).string(message.search);
    }
    if (message.updatedAfter !== 0) {
      writer.uint32(72).int64(message.updatedAfter);
    }
    if (message.updatedBefore !== 0) {
      writer.uint32(80).int64(message.updatedBefore);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): PullRequestOptions {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePullRequestOptions } as PullRequestOptions;
    message.labelIds = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.createdBy = reader.string();
          break;
        case 2:
          message.state = reader.string();
          break;
        case 3:
          message.labels = reader.string();
          break;
        case 4:
          message.assignee = reader.string();
          break;
        case 5:
          message.reviewer = reader.string();
          break;
        case 6:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.labelIds.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.labelIds.push(longToNumber(reader.uint64() as Long));
          }
          break;
        case 7:
          message.sort = reader.string();
          break;
        case 8:
          message.search = reader.string();
          break;
        case 9:
          message.updatedAfter = longToNumber(reader.int64() as Long);
          break;
        case 10:
          message.updatedBefore = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PullRequestOptions {
    const message = { ...basePullRequestOptions } as PullRequestOptions;
    message.labelIds = [];
    if (object.createdBy !== undefined && object.createdBy !== null) {
      message.createdBy = String(object.createdBy);
    } else {
      message.createdBy = "";
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = String(object.state);
    } else {
      message.state = "";
    }
    if (object.labels !== undefined && object.labels !== null) {
      message.labels = String(object.labels);
    } else {
      message.labels = "";
    }
    if (object.assignee !== undefined && object.assignee !== null) {
      message.assignee = String(object.assignee);
    } else {
      message.assignee = "";
    }
    if (object.reviewer !== undefined && object.reviewer !== null) {
      message.reviewer = String(object.reviewer);
    } else {
      message.reviewer = "";
    }
    if (object.labelIds !== undefined && object.labelIds !== null) {
      for (const e of object.labelIds) {
        message.labelIds.push(Number(e));
      }
    }
    if (object.sort !== undefined && object.sort !== null) {
      message.sort = String(object.sort);
    } else {
      message.sort = "";
    }
    if (object.search !== undefined && object.search !== null) {
      message.search = String(object.search);
    } else {
      message.search = "";
    }
    if (object.updatedAfter !== undefined && object.updatedAfter !== null) {
      message.updatedAfter = Number(object.updatedAfter);
    } else {
      message.updatedAfter = 0;
    }
    if (object.updatedBefore !== undefined && object.updatedBefore !== null) {
      message.updatedBefore = Number(object.updatedBefore);
    } else {
      message.updatedBefore = 0;
    }
    return message;
  },

  toJSON(message: PullRequestOptions): unknown {
    const obj: any = {};
    message.createdBy !== undefined && (obj.createdBy = message.createdBy);
    message.state !== undefined && (obj.state = message.state);
    message.labels !== undefined && (obj.labels = message.labels);
    message.assignee !== undefined && (obj.assignee = message.assignee);
    message.reviewer !== undefined && (obj.reviewer = message.reviewer);
    if (message.labelIds) {
      obj.labelIds = message.labelIds.map((e) => e);
    } else {
      obj.labelIds = [];
    }
    message.sort !== undefined && (obj.sort = message.sort);
    message.search !== undefined && (obj.search = message.search);
    message.updatedAfter !== undefined &&
      (obj.updatedAfter = message.updatedAfter);
    message.updatedBefore !== undefined &&
      (obj.updatedBefore = message.updatedBefore);
    return obj;
  },

  fromPartial(object: DeepPartial<PullRequestOptions>): PullRequestOptions {
    const message = { ...basePullRequestOptions } as PullRequestOptions;
    message.labelIds = [];
    if (object.createdBy !== undefined && object.createdBy !== null) {
      message.createdBy = object.createdBy;
    } else {
      message.createdBy = "";
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    } else {
      message.state = "";
    }
    if (object.labels !== undefined && object.labels !== null) {
      message.labels = object.labels;
    } else {
      message.labels = "";
    }
    if (object.assignee !== undefined && object.assignee !== null) {
      message.assignee = object.assignee;
    } else {
      message.assignee = "";
    }
    if (object.reviewer !== undefined && object.reviewer !== null) {
      message.reviewer = object.reviewer;
    } else {
      message.reviewer = "";
    }
    if (object.labelIds !== undefined && object.labelIds !== null) {
      for (const e of object.labelIds) {
        message.labelIds.push(e);
      }
    }
    if (object.sort !== undefined && object.sort !== null) {
      message.sort = object.sort;
    } else {
      message.sort = "";
    }
    if (object.search !== undefined && object.search !== null) {
      message.search = object.search;
    } else {
      message.search = "";
    }
    if (object.updatedAfter !== undefined && object.updatedAfter !== null) {
      message.updatedAfter = object.updatedAfter;
    } else {
      message.updatedAfter = 0;
    }
    if (object.updatedBefore !== undefined && object.updatedBefore !== null) {
      message.updatedBefore = object.updatedBefore;
    } else {
      message.updatedBefore = 0;
    }
    return message;
  },
};

const baseQueryAllRepositoryPullRequestResponse: object = {};

export const QueryAllRepositoryPullRequestResponse = {
  encode(
    message: QueryAllRepositoryPullRequestResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.PullRequest) {
      PullRequest.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllRepositoryPullRequestResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllRepositoryPullRequestResponse,
    } as QueryAllRepositoryPullRequestResponse;
    message.PullRequest = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.PullRequest.push(PullRequest.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllRepositoryPullRequestResponse {
    const message = {
      ...baseQueryAllRepositoryPullRequestResponse,
    } as QueryAllRepositoryPullRequestResponse;
    message.PullRequest = [];
    if (object.PullRequest !== undefined && object.PullRequest !== null) {
      for (const e of object.PullRequest) {
        message.PullRequest.push(PullRequest.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllRepositoryPullRequestResponse): unknown {
    const obj: any = {};
    if (message.PullRequest) {
      obj.PullRequest = message.PullRequest.map((e) =>
        e ? PullRequest.toJSON(e) : undefined
      );
    } else {
      obj.PullRequest = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllRepositoryPullRequestResponse>
  ): QueryAllRepositoryPullRequestResponse {
    const message = {
      ...baseQueryAllRepositoryPullRequestResponse,
    } as QueryAllRepositoryPullRequestResponse;
    message.PullRequest = [];
    if (object.PullRequest !== undefined && object.PullRequest !== null) {
      for (const e of object.PullRequest) {
        message.PullRequest.push(PullRequest.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryGetRepositoryRequest: object = { id: 0 };

export const QueryGetRepositoryRequest = {
  encode(
    message: QueryGetRepositoryRequest,
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
  ): QueryGetRepositoryRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetRepositoryRequest,
    } as QueryGetRepositoryRequest;
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

  fromJSON(object: any): QueryGetRepositoryRequest {
    const message = {
      ...baseQueryGetRepositoryRequest,
    } as QueryGetRepositoryRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: QueryGetRepositoryRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetRepositoryRequest>
  ): QueryGetRepositoryRequest {
    const message = {
      ...baseQueryGetRepositoryRequest,
    } as QueryGetRepositoryRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseQueryGetRepositoryResponse: object = {};

export const QueryGetRepositoryResponse = {
  encode(
    message: QueryGetRepositoryResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.Repository !== undefined) {
      Repository.encode(message.Repository, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetRepositoryResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetRepositoryResponse,
    } as QueryGetRepositoryResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Repository = Repository.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetRepositoryResponse {
    const message = {
      ...baseQueryGetRepositoryResponse,
    } as QueryGetRepositoryResponse;
    if (object.Repository !== undefined && object.Repository !== null) {
      message.Repository = Repository.fromJSON(object.Repository);
    } else {
      message.Repository = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetRepositoryResponse): unknown {
    const obj: any = {};
    message.Repository !== undefined &&
      (obj.Repository = message.Repository
        ? Repository.toJSON(message.Repository)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetRepositoryResponse>
  ): QueryGetRepositoryResponse {
    const message = {
      ...baseQueryGetRepositoryResponse,
    } as QueryGetRepositoryResponse;
    if (object.Repository !== undefined && object.Repository !== null) {
      message.Repository = Repository.fromPartial(object.Repository);
    } else {
      message.Repository = undefined;
    }
    return message;
  },
};

const baseRepositoryFork: object = {
  creator: "",
  id: 0,
  name: "",
  description: "",
  parent: 0,
  forksCount: 0,
  issuesCount: 0,
  pullsCount: 0,
};

export const RepositoryFork = {
  encode(message: RepositoryFork, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.owner !== undefined) {
      RepositoryOwner.encode(message.owner, writer.uint32(34).fork()).ldelim();
    }
    if (message.description !== "") {
      writer.uint32(42).string(message.description);
    }
    if (message.parent !== 0) {
      writer.uint32(48).uint64(message.parent);
    }
    if (message.forksCount !== 0) {
      writer.uint32(56).uint64(message.forksCount);
    }
    if (message.issuesCount !== 0) {
      writer.uint32(64).uint64(message.issuesCount);
    }
    if (message.pullsCount !== 0) {
      writer.uint32(72).uint64(message.pullsCount);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RepositoryFork {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRepositoryFork } as RepositoryFork;
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
          message.owner = RepositoryOwner.decode(reader, reader.uint32());
          break;
        case 5:
          message.description = reader.string();
          break;
        case 6:
          message.parent = longToNumber(reader.uint64() as Long);
          break;
        case 7:
          message.forksCount = longToNumber(reader.uint64() as Long);
          break;
        case 8:
          message.issuesCount = longToNumber(reader.uint64() as Long);
          break;
        case 9:
          message.pullsCount = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RepositoryFork {
    const message = { ...baseRepositoryFork } as RepositoryFork;
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
      message.owner = RepositoryOwner.fromJSON(object.owner);
    } else {
      message.owner = undefined;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.parent !== undefined && object.parent !== null) {
      message.parent = Number(object.parent);
    } else {
      message.parent = 0;
    }
    if (object.forksCount !== undefined && object.forksCount !== null) {
      message.forksCount = Number(object.forksCount);
    } else {
      message.forksCount = 0;
    }
    if (object.issuesCount !== undefined && object.issuesCount !== null) {
      message.issuesCount = Number(object.issuesCount);
    } else {
      message.issuesCount = 0;
    }
    if (object.pullsCount !== undefined && object.pullsCount !== null) {
      message.pullsCount = Number(object.pullsCount);
    } else {
      message.pullsCount = 0;
    }
    return message;
  },

  toJSON(message: RepositoryFork): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.owner !== undefined &&
      (obj.owner = message.owner
        ? RepositoryOwner.toJSON(message.owner)
        : undefined);
    message.description !== undefined &&
      (obj.description = message.description);
    message.parent !== undefined && (obj.parent = message.parent);
    message.forksCount !== undefined && (obj.forksCount = message.forksCount);
    message.issuesCount !== undefined &&
      (obj.issuesCount = message.issuesCount);
    message.pullsCount !== undefined && (obj.pullsCount = message.pullsCount);
    return obj;
  },

  fromPartial(object: DeepPartial<RepositoryFork>): RepositoryFork {
    const message = { ...baseRepositoryFork } as RepositoryFork;
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
      message.owner = RepositoryOwner.fromPartial(object.owner);
    } else {
      message.owner = undefined;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.parent !== undefined && object.parent !== null) {
      message.parent = object.parent;
    } else {
      message.parent = 0;
    }
    if (object.forksCount !== undefined && object.forksCount !== null) {
      message.forksCount = object.forksCount;
    } else {
      message.forksCount = 0;
    }
    if (object.issuesCount !== undefined && object.issuesCount !== null) {
      message.issuesCount = object.issuesCount;
    } else {
      message.issuesCount = 0;
    }
    if (object.pullsCount !== undefined && object.pullsCount !== null) {
      message.pullsCount = object.pullsCount;
    } else {
      message.pullsCount = 0;
    }
    return message;
  },
};

const baseQueryGetAllForkRequest: object = { id: "", repositoryName: "" };

export const QueryGetAllForkRequest = {
  encode(
    message: QueryGetAllForkRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.repositoryName !== "") {
      writer.uint32(18).string(message.repositoryName);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetAllForkRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetAllForkRequest } as QueryGetAllForkRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.repositoryName = reader.string();
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetAllForkRequest {
    const message = { ...baseQueryGetAllForkRequest } as QueryGetAllForkRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.repositoryName !== undefined && object.repositoryName !== null) {
      message.repositoryName = String(object.repositoryName);
    } else {
      message.repositoryName = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetAllForkRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.repositoryName !== undefined &&
      (obj.repositoryName = message.repositoryName);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetAllForkRequest>
  ): QueryGetAllForkRequest {
    const message = { ...baseQueryGetAllForkRequest } as QueryGetAllForkRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.repositoryName !== undefined && object.repositoryName !== null) {
      message.repositoryName = object.repositoryName;
    } else {
      message.repositoryName = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryGetAllForkResponse: object = {};

export const QueryGetAllForkResponse = {
  encode(
    message: QueryGetAllForkResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.forks) {
      RepositoryFork.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetAllForkResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetAllForkResponse,
    } as QueryGetAllForkResponse;
    message.forks = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.forks.push(RepositoryFork.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetAllForkResponse {
    const message = {
      ...baseQueryGetAllForkResponse,
    } as QueryGetAllForkResponse;
    message.forks = [];
    if (object.forks !== undefined && object.forks !== null) {
      for (const e of object.forks) {
        message.forks.push(RepositoryFork.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetAllForkResponse): unknown {
    const obj: any = {};
    if (message.forks) {
      obj.forks = message.forks.map((e) =>
        e ? RepositoryFork.toJSON(e) : undefined
      );
    } else {
      obj.forks = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetAllForkResponse>
  ): QueryGetAllForkResponse {
    const message = {
      ...baseQueryGetAllForkResponse,
    } as QueryGetAllForkResponse;
    message.forks = [];
    if (object.forks !== undefined && object.forks !== null) {
      for (const e of object.forks) {
        message.forks.push(RepositoryFork.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllRepositoryRequest: object = {};

export const QueryAllRepositoryRequest = {
  encode(
    message: QueryAllRepositoryRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllRepositoryRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllRepositoryRequest,
    } as QueryAllRepositoryRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllRepositoryRequest {
    const message = {
      ...baseQueryAllRepositoryRequest,
    } as QueryAllRepositoryRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllRepositoryRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllRepositoryRequest>
  ): QueryAllRepositoryRequest {
    const message = {
      ...baseQueryAllRepositoryRequest,
    } as QueryAllRepositoryRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllRepositoryResponse: object = {};

export const QueryAllRepositoryResponse = {
  encode(
    message: QueryAllRepositoryResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.Repository) {
      Repository.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllRepositoryResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllRepositoryResponse,
    } as QueryAllRepositoryResponse;
    message.Repository = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Repository.push(Repository.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllRepositoryResponse {
    const message = {
      ...baseQueryAllRepositoryResponse,
    } as QueryAllRepositoryResponse;
    message.Repository = [];
    if (object.Repository !== undefined && object.Repository !== null) {
      for (const e of object.Repository) {
        message.Repository.push(Repository.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllRepositoryResponse): unknown {
    const obj: any = {};
    if (message.Repository) {
      obj.Repository = message.Repository.map((e) =>
        e ? Repository.toJSON(e) : undefined
      );
    } else {
      obj.Repository = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllRepositoryResponse>
  ): QueryAllRepositoryResponse {
    const message = {
      ...baseQueryAllRepositoryResponse,
    } as QueryAllRepositoryResponse;
    message.Repository = [];
    if (object.Repository !== undefined && object.Repository !== null) {
      for (const e of object.Repository) {
        message.Repository.push(Repository.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryGetUserRequest: object = { id: "" };

export const QueryGetUserRequest = {
  encode(
    message: QueryGetUserRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetUserRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetUserRequest } as QueryGetUserRequest;
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

  fromJSON(object: any): QueryGetUserRequest {
    const message = { ...baseQueryGetUserRequest } as QueryGetUserRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    return message;
  },

  toJSON(message: QueryGetUserRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryGetUserRequest>): QueryGetUserRequest {
    const message = { ...baseQueryGetUserRequest } as QueryGetUserRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    return message;
  },
};

const baseQueryGetUserResponse: object = {};

export const QueryGetUserResponse = {
  encode(
    message: QueryGetUserResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.User !== undefined) {
      User.encode(message.User, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetUserResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetUserResponse } as QueryGetUserResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.User = User.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetUserResponse {
    const message = { ...baseQueryGetUserResponse } as QueryGetUserResponse;
    if (object.User !== undefined && object.User !== null) {
      message.User = User.fromJSON(object.User);
    } else {
      message.User = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetUserResponse): unknown {
    const obj: any = {};
    message.User !== undefined &&
      (obj.User = message.User ? User.toJSON(message.User) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryGetUserResponse>): QueryGetUserResponse {
    const message = { ...baseQueryGetUserResponse } as QueryGetUserResponse;
    if (object.User !== undefined && object.User !== null) {
      message.User = User.fromPartial(object.User);
    } else {
      message.User = undefined;
    }
    return message;
  },
};

const baseQueryAllUserDaoRequest: object = { userId: "" };

export const QueryAllUserDaoRequest = {
  encode(
    message: QueryAllUserDaoRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllUserDaoRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllUserDaoRequest } as QueryAllUserDaoRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllUserDaoRequest {
    const message = { ...baseQueryAllUserDaoRequest } as QueryAllUserDaoRequest;
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = String(object.userId);
    } else {
      message.userId = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllUserDaoRequest): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = message.userId);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllUserDaoRequest>
  ): QueryAllUserDaoRequest {
    const message = { ...baseQueryAllUserDaoRequest } as QueryAllUserDaoRequest;
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = object.userId;
    } else {
      message.userId = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllUserDaoResponse: object = {};

export const QueryAllUserDaoResponse = {
  encode(
    message: QueryAllUserDaoResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.dao) {
      Dao.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllUserDaoResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllUserDaoResponse,
    } as QueryAllUserDaoResponse;
    message.dao = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.dao.push(Dao.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllUserDaoResponse {
    const message = {
      ...baseQueryAllUserDaoResponse,
    } as QueryAllUserDaoResponse;
    message.dao = [];
    if (object.dao !== undefined && object.dao !== null) {
      for (const e of object.dao) {
        message.dao.push(Dao.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllUserDaoResponse): unknown {
    const obj: any = {};
    if (message.dao) {
      obj.dao = message.dao.map((e) => (e ? Dao.toJSON(e) : undefined));
    } else {
      obj.dao = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllUserDaoResponse>
  ): QueryAllUserDaoResponse {
    const message = {
      ...baseQueryAllUserDaoResponse,
    } as QueryAllUserDaoResponse;
    message.dao = [];
    if (object.dao !== undefined && object.dao !== null) {
      for (const e of object.dao) {
        message.dao.push(Dao.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllUserRequest: object = {};

export const QueryAllUserRequest = {
  encode(
    message: QueryAllUserRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllUserRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllUserRequest } as QueryAllUserRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllUserRequest {
    const message = { ...baseQueryAllUserRequest } as QueryAllUserRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllUserRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAllUserRequest>): QueryAllUserRequest {
    const message = { ...baseQueryAllUserRequest } as QueryAllUserRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllUserResponse: object = {};

export const QueryAllUserResponse = {
  encode(
    message: QueryAllUserResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.User) {
      User.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllUserResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllUserResponse } as QueryAllUserResponse;
    message.User = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.User.push(User.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllUserResponse {
    const message = { ...baseQueryAllUserResponse } as QueryAllUserResponse;
    message.User = [];
    if (object.User !== undefined && object.User !== null) {
      for (const e of object.User) {
        message.User.push(User.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllUserResponse): unknown {
    const obj: any = {};
    if (message.User) {
      obj.User = message.User.map((e) => (e ? User.toJSON(e) : undefined));
    } else {
      obj.User = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAllUserResponse>): QueryAllUserResponse {
    const message = { ...baseQueryAllUserResponse } as QueryAllUserResponse;
    message.User = [];
    if (object.User !== undefined && object.User !== null) {
      for (const e of object.User) {
        message.User.push(User.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllAnyRepositoryRequest: object = { id: "" };

export const QueryAllAnyRepositoryRequest = {
  encode(
    message: QueryAllAnyRepositoryRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllAnyRepositoryRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllAnyRepositoryRequest,
    } as QueryAllAnyRepositoryRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllAnyRepositoryRequest {
    const message = {
      ...baseQueryAllAnyRepositoryRequest,
    } as QueryAllAnyRepositoryRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllAnyRepositoryRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllAnyRepositoryRequest>
  ): QueryAllAnyRepositoryRequest {
    const message = {
      ...baseQueryAllAnyRepositoryRequest,
    } as QueryAllAnyRepositoryRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllAnyRepositoryResponse: object = {};

export const QueryAllAnyRepositoryResponse = {
  encode(
    message: QueryAllAnyRepositoryResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.Repository) {
      Repository.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllAnyRepositoryResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllAnyRepositoryResponse,
    } as QueryAllAnyRepositoryResponse;
    message.Repository = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Repository.push(Repository.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllAnyRepositoryResponse {
    const message = {
      ...baseQueryAllAnyRepositoryResponse,
    } as QueryAllAnyRepositoryResponse;
    message.Repository = [];
    if (object.Repository !== undefined && object.Repository !== null) {
      for (const e of object.Repository) {
        message.Repository.push(Repository.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllAnyRepositoryResponse): unknown {
    const obj: any = {};
    if (message.Repository) {
      obj.Repository = message.Repository.map((e) =>
        e ? Repository.toJSON(e) : undefined
      );
    } else {
      obj.Repository = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllAnyRepositoryResponse>
  ): QueryAllAnyRepositoryResponse {
    const message = {
      ...baseQueryAllAnyRepositoryResponse,
    } as QueryAllAnyRepositoryResponse;
    message.Repository = [];
    if (object.Repository !== undefined && object.Repository !== null) {
      for (const e of object.Repository) {
        message.Repository.push(Repository.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryGetAnyRepositoryRequest: object = { id: "", repositoryName: "" };

export const QueryGetAnyRepositoryRequest = {
  encode(
    message: QueryGetAnyRepositoryRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.repositoryName !== "") {
      writer.uint32(18).string(message.repositoryName);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetAnyRepositoryRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetAnyRepositoryRequest,
    } as QueryGetAnyRepositoryRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.repositoryName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetAnyRepositoryRequest {
    const message = {
      ...baseQueryGetAnyRepositoryRequest,
    } as QueryGetAnyRepositoryRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.repositoryName !== undefined && object.repositoryName !== null) {
      message.repositoryName = String(object.repositoryName);
    } else {
      message.repositoryName = "";
    }
    return message;
  },

  toJSON(message: QueryGetAnyRepositoryRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.repositoryName !== undefined &&
      (obj.repositoryName = message.repositoryName);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetAnyRepositoryRequest>
  ): QueryGetAnyRepositoryRequest {
    const message = {
      ...baseQueryGetAnyRepositoryRequest,
    } as QueryGetAnyRepositoryRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.repositoryName !== undefined && object.repositoryName !== null) {
      message.repositoryName = object.repositoryName;
    } else {
      message.repositoryName = "";
    }
    return message;
  },
};

const baseQueryGetAnyRepositoryResponse: object = {};

export const QueryGetAnyRepositoryResponse = {
  encode(
    message: QueryGetAnyRepositoryResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.Repository !== undefined) {
      Repository.encode(message.Repository, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetAnyRepositoryResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetAnyRepositoryResponse,
    } as QueryGetAnyRepositoryResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Repository = Repository.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetAnyRepositoryResponse {
    const message = {
      ...baseQueryGetAnyRepositoryResponse,
    } as QueryGetAnyRepositoryResponse;
    if (object.Repository !== undefined && object.Repository !== null) {
      message.Repository = Repository.fromJSON(object.Repository);
    } else {
      message.Repository = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetAnyRepositoryResponse): unknown {
    const obj: any = {};
    message.Repository !== undefined &&
      (obj.Repository = message.Repository
        ? Repository.toJSON(message.Repository)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetAnyRepositoryResponse>
  ): QueryGetAnyRepositoryResponse {
    const message = {
      ...baseQueryGetAnyRepositoryResponse,
    } as QueryGetAnyRepositoryResponse;
    if (object.Repository !== undefined && object.Repository !== null) {
      message.Repository = Repository.fromPartial(object.Repository);
    } else {
      message.Repository = undefined;
    }
    return message;
  },
};

const baseQueryGetWhoisRequest: object = { name: "" };

export const QueryGetWhoisRequest = {
  encode(
    message: QueryGetWhoisRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetWhoisRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetWhoisRequest } as QueryGetWhoisRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetWhoisRequest {
    const message = { ...baseQueryGetWhoisRequest } as QueryGetWhoisRequest;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    return message;
  },

  toJSON(message: QueryGetWhoisRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryGetWhoisRequest>): QueryGetWhoisRequest {
    const message = { ...baseQueryGetWhoisRequest } as QueryGetWhoisRequest;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    return message;
  },
};

const baseQueryGetWhoisResponse: object = {};

export const QueryGetWhoisResponse = {
  encode(
    message: QueryGetWhoisResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.Whois !== undefined) {
      Whois.encode(message.Whois, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetWhoisResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetWhoisResponse } as QueryGetWhoisResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Whois = Whois.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetWhoisResponse {
    const message = { ...baseQueryGetWhoisResponse } as QueryGetWhoisResponse;
    if (object.Whois !== undefined && object.Whois !== null) {
      message.Whois = Whois.fromJSON(object.Whois);
    } else {
      message.Whois = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetWhoisResponse): unknown {
    const obj: any = {};
    message.Whois !== undefined &&
      (obj.Whois = message.Whois ? Whois.toJSON(message.Whois) : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetWhoisResponse>
  ): QueryGetWhoisResponse {
    const message = { ...baseQueryGetWhoisResponse } as QueryGetWhoisResponse;
    if (object.Whois !== undefined && object.Whois !== null) {
      message.Whois = Whois.fromPartial(object.Whois);
    } else {
      message.Whois = undefined;
    }
    return message;
  },
};

const baseQueryAllWhoisRequest: object = {};

export const QueryAllWhoisRequest = {
  encode(
    message: QueryAllWhoisRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllWhoisRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllWhoisRequest } as QueryAllWhoisRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllWhoisRequest {
    const message = { ...baseQueryAllWhoisRequest } as QueryAllWhoisRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllWhoisRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAllWhoisRequest>): QueryAllWhoisRequest {
    const message = { ...baseQueryAllWhoisRequest } as QueryAllWhoisRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllWhoisResponse: object = {};

export const QueryAllWhoisResponse = {
  encode(
    message: QueryAllWhoisResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.Whois) {
      Whois.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllWhoisResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllWhoisResponse } as QueryAllWhoisResponse;
    message.Whois = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Whois.push(Whois.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllWhoisResponse {
    const message = { ...baseQueryAllWhoisResponse } as QueryAllWhoisResponse;
    message.Whois = [];
    if (object.Whois !== undefined && object.Whois !== null) {
      for (const e of object.Whois) {
        message.Whois.push(Whois.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllWhoisResponse): unknown {
    const obj: any = {};
    if (message.Whois) {
      obj.Whois = message.Whois.map((e) => (e ? Whois.toJSON(e) : undefined));
    } else {
      obj.Whois = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllWhoisResponse>
  ): QueryAllWhoisResponse {
    const message = { ...baseQueryAllWhoisResponse } as QueryAllWhoisResponse;
    message.Whois = [];
    if (object.Whois !== undefined && object.Whois !== null) {
      for (const e of object.Whois) {
        message.Whois.push(Whois.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Queries a Task by id. */
  Task(request: QueryGetTaskRequest): Promise<QueryGetTaskResponse>;
  /** Queries a list of Task items. */
  TaskAll(request: QueryAllTaskRequest): Promise<QueryAllTaskResponse>;
  /** Queries a list of Branch items. */
  BranchAll(request: QueryAllBranchRequest): Promise<QueryAllBranchResponse>;
  /** Queries Repository Branch by name. */
  RepositoryBranch(
    request: QueryGetRepositoryBranchRequest
  ): Promise<QueryGetRepositoryBranchResponse>;
  RepositoryBranchSha(
    request: QueryGetRepositoryBranchShaRequest
  ): Promise<QueryGetRepositoryBranchShaResponse>;
  /** Queries a list of Repository Branch. */
  RepositoryBranchAll(
    request: QueryAllRepositoryBranchRequest
  ): Promise<QueryAllRepositoryBranchResponse>;
  /** Queries a list of Tag items. */
  TagAll(request: QueryAllTagRequest): Promise<QueryAllTagResponse>;
  /** Queries a Repository Tag by id. */
  RepositoryTag(
    request: QueryGetRepositoryTagRequest
  ): Promise<QueryGetRepositoryTagResponse>;
  RepositoryTagSha(
    request: QueryGetRepositoryTagShaRequest
  ): Promise<QueryGetRepositoryTagShaResponse>;
  /** Queries a list of Repository Tag. */
  RepositoryTagAll(
    request: QueryAllRepositoryTagRequest
  ): Promise<QueryAllRepositoryTagResponse>;
  /** Queries a Member by id. */
  DaoMember(
    request: QueryGetDaoMemberRequest
  ): Promise<QueryGetDaoMemberResponse>;
  /** Queries a list of Dao Member. */
  DaoMemberAll(
    request: QueryAllDaoMemberRequest
  ): Promise<QueryAllDaoMemberResponse>;
  /** Queries a list of Member items. */
  MemberAll(request: QueryAllMemberRequest): Promise<QueryAllMemberResponse>;
  /** Queries a StorageProvider by id. */
  StorageProvider(
    request: QueryGetStorageProviderRequest
  ): Promise<QueryGetStorageProviderResponse>;
  /** Queries a list of StorageProvider items. */
  StorageProviderAll(
    request: QueryAllStorageProviderRequest
  ): Promise<QueryAllStorageProviderResponse>;
  /** Queries a release by id. */
  Release(request: QueryGetReleaseRequest): Promise<QueryGetReleaseResponse>;
  /** Queries a list of release items. */
  ReleaseAll(request: QueryAllReleaseRequest): Promise<QueryAllReleaseResponse>;
  /** Queries a pullRequest by id. */
  PullRequest(
    request: QueryGetPullRequestRequest
  ): Promise<QueryGetPullRequestResponse>;
  /** Queries a list of pullRequest items. */
  PullRequestAll(
    request: QueryAllPullRequestRequest
  ): Promise<QueryAllPullRequestResponse>;
  /** Queries a Dao by id. */
  Dao(request: QueryGetDaoRequest): Promise<QueryGetDaoResponse>;
  /** Queries a list of Dao items. */
  DaoAll(request: QueryAllDaoRequest): Promise<QueryAllDaoResponse>;
  /** Queries a comment by id. */
  Comment(request: QueryGetCommentRequest): Promise<QueryGetCommentResponse>;
  /** Queries a list of comment items. */
  CommentAll(request: QueryAllCommentRequest): Promise<QueryAllCommentResponse>;
  /** Queries a issue by id. */
  Issue(request: QueryGetIssueRequest): Promise<QueryGetIssueResponse>;
  /** Queries a list of issue items. */
  IssueAll(request: QueryAllIssueRequest): Promise<QueryAllIssueResponse>;
  RepositoryReleaseLatest(
    request: QueryGetLatestRepositoryReleaseRequest
  ): Promise<QueryGetLatestRepositoryReleaseResponse>;
  RepositoryRelease(
    request: QueryGetRepositoryReleaseRequest
  ): Promise<QueryGetRepositoryReleaseResponse>;
  RepositoryReleaseAll(
    request: QueryAllRepositoryReleaseRequest
  ): Promise<QueryAllRepositoryReleaseResponse>;
  /** Queries a repository by id. */
  RepositoryIssue(
    request: QueryGetRepositoryIssueRequest
  ): Promise<QueryGetRepositoryIssueResponse>;
  /** Queries a list of repository items. */
  RepositoryIssueAll(
    request: QueryAllRepositoryIssueRequest
  ): Promise<QueryAllRepositoryIssueResponse>;
  /** Queries a repository pullRequest by id. */
  RepositoryPullRequest(
    request: QueryGetRepositoryPullRequestRequest
  ): Promise<QueryGetRepositoryPullRequestResponse>;
  RepositoryPullRequestAll(
    request: QueryAllRepositoryPullRequestRequest
  ): Promise<QueryAllRepositoryPullRequestResponse>;
  /** Queries a repository by id. */
  Repository(
    request: QueryGetRepositoryRequest
  ): Promise<QueryGetRepositoryResponse>;
  /** Queries a list of repository items. */
  RepositoryAll(
    request: QueryAllRepositoryRequest
  ): Promise<QueryAllRepositoryResponse>;
  /** Queries a repository forks by id. */
  ForkAll(request: QueryGetAllForkRequest): Promise<QueryGetAllForkResponse>;
  /** Queries a user by id. */
  User(request: QueryGetUserRequest): Promise<QueryGetUserResponse>;
  /** Queries a list of User Dao. */
  UserDaoAll(request: QueryAllUserDaoRequest): Promise<QueryAllUserDaoResponse>;
  /** Queries a list of user items. */
  UserAll(request: QueryAllUserRequest): Promise<QueryAllUserResponse>;
  /** Queries a list of user repositories. */
  AnyRepositoryAll(
    request: QueryAllAnyRepositoryRequest
  ): Promise<QueryAllAnyRepositoryResponse>;
  /** Queries a repository by user id and repository name */
  AnyRepository(
    request: QueryGetAnyRepositoryRequest
  ): Promise<QueryGetAnyRepositoryResponse>;
  /** Queries a whois by id. */
  Whois(request: QueryGetWhoisRequest): Promise<QueryGetWhoisResponse>;
  /** Queries a list of whois items. */
  WhoisAll(request: QueryAllWhoisRequest): Promise<QueryAllWhoisResponse>;
  PullRequestMergePermission(
    request: QueryGetPullRequestMergePermissionRequest
  ): Promise<QueryGetPullRequestMergePermissionResponse>;
  CheckGitServerAuthorization(
    request: QueryCheckGitServerAuthorizationRequest
  ): Promise<QueryCheckGitServerAuthorizationResponse>;
  CheckStorageProviderAuthorization(
    request: QueryCheckStorageProviderAuthorizationRequest
  ): Promise<QueryCheckStorageProviderAuthorizationResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  Task(request: QueryGetTaskRequest): Promise<QueryGetTaskResponse> {
    const data = QueryGetTaskRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "Task",
      data
    );
    return promise.then((data) =>
      QueryGetTaskResponse.decode(new Reader(data))
    );
  }

  TaskAll(request: QueryAllTaskRequest): Promise<QueryAllTaskResponse> {
    const data = QueryAllTaskRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "TaskAll",
      data
    );
    return promise.then((data) =>
      QueryAllTaskResponse.decode(new Reader(data))
    );
  }

  BranchAll(request: QueryAllBranchRequest): Promise<QueryAllBranchResponse> {
    const data = QueryAllBranchRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "BranchAll",
      data
    );
    return promise.then((data) =>
      QueryAllBranchResponse.decode(new Reader(data))
    );
  }

  RepositoryBranch(
    request: QueryGetRepositoryBranchRequest
  ): Promise<QueryGetRepositoryBranchResponse> {
    const data = QueryGetRepositoryBranchRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "RepositoryBranch",
      data
    );
    return promise.then((data) =>
      QueryGetRepositoryBranchResponse.decode(new Reader(data))
    );
  }

  RepositoryBranchSha(
    request: QueryGetRepositoryBranchShaRequest
  ): Promise<QueryGetRepositoryBranchShaResponse> {
    const data = QueryGetRepositoryBranchShaRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "RepositoryBranchSha",
      data
    );
    return promise.then((data) =>
      QueryGetRepositoryBranchShaResponse.decode(new Reader(data))
    );
  }

  RepositoryBranchAll(
    request: QueryAllRepositoryBranchRequest
  ): Promise<QueryAllRepositoryBranchResponse> {
    const data = QueryAllRepositoryBranchRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "RepositoryBranchAll",
      data
    );
    return promise.then((data) =>
      QueryAllRepositoryBranchResponse.decode(new Reader(data))
    );
  }

  TagAll(request: QueryAllTagRequest): Promise<QueryAllTagResponse> {
    const data = QueryAllTagRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "TagAll",
      data
    );
    return promise.then((data) => QueryAllTagResponse.decode(new Reader(data)));
  }

  RepositoryTag(
    request: QueryGetRepositoryTagRequest
  ): Promise<QueryGetRepositoryTagResponse> {
    const data = QueryGetRepositoryTagRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "RepositoryTag",
      data
    );
    return promise.then((data) =>
      QueryGetRepositoryTagResponse.decode(new Reader(data))
    );
  }

  RepositoryTagSha(
    request: QueryGetRepositoryTagShaRequest
  ): Promise<QueryGetRepositoryTagShaResponse> {
    const data = QueryGetRepositoryTagShaRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "RepositoryTagSha",
      data
    );
    return promise.then((data) =>
      QueryGetRepositoryTagShaResponse.decode(new Reader(data))
    );
  }

  RepositoryTagAll(
    request: QueryAllRepositoryTagRequest
  ): Promise<QueryAllRepositoryTagResponse> {
    const data = QueryAllRepositoryTagRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "RepositoryTagAll",
      data
    );
    return promise.then((data) =>
      QueryAllRepositoryTagResponse.decode(new Reader(data))
    );
  }

  DaoMember(
    request: QueryGetDaoMemberRequest
  ): Promise<QueryGetDaoMemberResponse> {
    const data = QueryGetDaoMemberRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "DaoMember",
      data
    );
    return promise.then((data) =>
      QueryGetDaoMemberResponse.decode(new Reader(data))
    );
  }

  DaoMemberAll(
    request: QueryAllDaoMemberRequest
  ): Promise<QueryAllDaoMemberResponse> {
    const data = QueryAllDaoMemberRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "DaoMemberAll",
      data
    );
    return promise.then((data) =>
      QueryAllDaoMemberResponse.decode(new Reader(data))
    );
  }

  MemberAll(request: QueryAllMemberRequest): Promise<QueryAllMemberResponse> {
    const data = QueryAllMemberRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "MemberAll",
      data
    );
    return promise.then((data) =>
      QueryAllMemberResponse.decode(new Reader(data))
    );
  }

  StorageProvider(
    request: QueryGetStorageProviderRequest
  ): Promise<QueryGetStorageProviderResponse> {
    const data = QueryGetStorageProviderRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "StorageProvider",
      data
    );
    return promise.then((data) =>
      QueryGetStorageProviderResponse.decode(new Reader(data))
    );
  }

  StorageProviderAll(
    request: QueryAllStorageProviderRequest
  ): Promise<QueryAllStorageProviderResponse> {
    const data = QueryAllStorageProviderRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "StorageProviderAll",
      data
    );
    return promise.then((data) =>
      QueryAllStorageProviderResponse.decode(new Reader(data))
    );
  }

  Release(request: QueryGetReleaseRequest): Promise<QueryGetReleaseResponse> {
    const data = QueryGetReleaseRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "Release",
      data
    );
    return promise.then((data) =>
      QueryGetReleaseResponse.decode(new Reader(data))
    );
  }

  ReleaseAll(
    request: QueryAllReleaseRequest
  ): Promise<QueryAllReleaseResponse> {
    const data = QueryAllReleaseRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "ReleaseAll",
      data
    );
    return promise.then((data) =>
      QueryAllReleaseResponse.decode(new Reader(data))
    );
  }

  PullRequest(
    request: QueryGetPullRequestRequest
  ): Promise<QueryGetPullRequestResponse> {
    const data = QueryGetPullRequestRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "PullRequest",
      data
    );
    return promise.then((data) =>
      QueryGetPullRequestResponse.decode(new Reader(data))
    );
  }

  PullRequestAll(
    request: QueryAllPullRequestRequest
  ): Promise<QueryAllPullRequestResponse> {
    const data = QueryAllPullRequestRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "PullRequestAll",
      data
    );
    return promise.then((data) =>
      QueryAllPullRequestResponse.decode(new Reader(data))
    );
  }

  Dao(request: QueryGetDaoRequest): Promise<QueryGetDaoResponse> {
    const data = QueryGetDaoRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "Dao",
      data
    );
    return promise.then((data) => QueryGetDaoResponse.decode(new Reader(data)));
  }

  DaoAll(request: QueryAllDaoRequest): Promise<QueryAllDaoResponse> {
    const data = QueryAllDaoRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "DaoAll",
      data
    );
    return promise.then((data) => QueryAllDaoResponse.decode(new Reader(data)));
  }

  Comment(request: QueryGetCommentRequest): Promise<QueryGetCommentResponse> {
    const data = QueryGetCommentRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "Comment",
      data
    );
    return promise.then((data) =>
      QueryGetCommentResponse.decode(new Reader(data))
    );
  }

  CommentAll(
    request: QueryAllCommentRequest
  ): Promise<QueryAllCommentResponse> {
    const data = QueryAllCommentRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "CommentAll",
      data
    );
    return promise.then((data) =>
      QueryAllCommentResponse.decode(new Reader(data))
    );
  }

  Issue(request: QueryGetIssueRequest): Promise<QueryGetIssueResponse> {
    const data = QueryGetIssueRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "Issue",
      data
    );
    return promise.then((data) =>
      QueryGetIssueResponse.decode(new Reader(data))
    );
  }

  IssueAll(request: QueryAllIssueRequest): Promise<QueryAllIssueResponse> {
    const data = QueryAllIssueRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "IssueAll",
      data
    );
    return promise.then((data) =>
      QueryAllIssueResponse.decode(new Reader(data))
    );
  }

  RepositoryReleaseLatest(
    request: QueryGetLatestRepositoryReleaseRequest
  ): Promise<QueryGetLatestRepositoryReleaseResponse> {
    const data = QueryGetLatestRepositoryReleaseRequest.encode(
      request
    ).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "RepositoryReleaseLatest",
      data
    );
    return promise.then((data) =>
      QueryGetLatestRepositoryReleaseResponse.decode(new Reader(data))
    );
  }

  RepositoryRelease(
    request: QueryGetRepositoryReleaseRequest
  ): Promise<QueryGetRepositoryReleaseResponse> {
    const data = QueryGetRepositoryReleaseRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "RepositoryRelease",
      data
    );
    return promise.then((data) =>
      QueryGetRepositoryReleaseResponse.decode(new Reader(data))
    );
  }

  RepositoryReleaseAll(
    request: QueryAllRepositoryReleaseRequest
  ): Promise<QueryAllRepositoryReleaseResponse> {
    const data = QueryAllRepositoryReleaseRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "RepositoryReleaseAll",
      data
    );
    return promise.then((data) =>
      QueryAllRepositoryReleaseResponse.decode(new Reader(data))
    );
  }

  RepositoryIssue(
    request: QueryGetRepositoryIssueRequest
  ): Promise<QueryGetRepositoryIssueResponse> {
    const data = QueryGetRepositoryIssueRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "RepositoryIssue",
      data
    );
    return promise.then((data) =>
      QueryGetRepositoryIssueResponse.decode(new Reader(data))
    );
  }

  RepositoryIssueAll(
    request: QueryAllRepositoryIssueRequest
  ): Promise<QueryAllRepositoryIssueResponse> {
    const data = QueryAllRepositoryIssueRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "RepositoryIssueAll",
      data
    );
    return promise.then((data) =>
      QueryAllRepositoryIssueResponse.decode(new Reader(data))
    );
  }

  RepositoryPullRequest(
    request: QueryGetRepositoryPullRequestRequest
  ): Promise<QueryGetRepositoryPullRequestResponse> {
    const data = QueryGetRepositoryPullRequestRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "RepositoryPullRequest",
      data
    );
    return promise.then((data) =>
      QueryGetRepositoryPullRequestResponse.decode(new Reader(data))
    );
  }

  RepositoryPullRequestAll(
    request: QueryAllRepositoryPullRequestRequest
  ): Promise<QueryAllRepositoryPullRequestResponse> {
    const data = QueryAllRepositoryPullRequestRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "RepositoryPullRequestAll",
      data
    );
    return promise.then((data) =>
      QueryAllRepositoryPullRequestResponse.decode(new Reader(data))
    );
  }

  Repository(
    request: QueryGetRepositoryRequest
  ): Promise<QueryGetRepositoryResponse> {
    const data = QueryGetRepositoryRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "Repository",
      data
    );
    return promise.then((data) =>
      QueryGetRepositoryResponse.decode(new Reader(data))
    );
  }

  RepositoryAll(
    request: QueryAllRepositoryRequest
  ): Promise<QueryAllRepositoryResponse> {
    const data = QueryAllRepositoryRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "RepositoryAll",
      data
    );
    return promise.then((data) =>
      QueryAllRepositoryResponse.decode(new Reader(data))
    );
  }

  ForkAll(request: QueryGetAllForkRequest): Promise<QueryGetAllForkResponse> {
    const data = QueryGetAllForkRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "ForkAll",
      data
    );
    return promise.then((data) =>
      QueryGetAllForkResponse.decode(new Reader(data))
    );
  }

  User(request: QueryGetUserRequest): Promise<QueryGetUserResponse> {
    const data = QueryGetUserRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "User",
      data
    );
    return promise.then((data) =>
      QueryGetUserResponse.decode(new Reader(data))
    );
  }

  UserDaoAll(
    request: QueryAllUserDaoRequest
  ): Promise<QueryAllUserDaoResponse> {
    const data = QueryAllUserDaoRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "UserDaoAll",
      data
    );
    return promise.then((data) =>
      QueryAllUserDaoResponse.decode(new Reader(data))
    );
  }

  UserAll(request: QueryAllUserRequest): Promise<QueryAllUserResponse> {
    const data = QueryAllUserRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "UserAll",
      data
    );
    return promise.then((data) =>
      QueryAllUserResponse.decode(new Reader(data))
    );
  }

  AnyRepositoryAll(
    request: QueryAllAnyRepositoryRequest
  ): Promise<QueryAllAnyRepositoryResponse> {
    const data = QueryAllAnyRepositoryRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "AnyRepositoryAll",
      data
    );
    return promise.then((data) =>
      QueryAllAnyRepositoryResponse.decode(new Reader(data))
    );
  }

  AnyRepository(
    request: QueryGetAnyRepositoryRequest
  ): Promise<QueryGetAnyRepositoryResponse> {
    const data = QueryGetAnyRepositoryRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "AnyRepository",
      data
    );
    return promise.then((data) =>
      QueryGetAnyRepositoryResponse.decode(new Reader(data))
    );
  }

  Whois(request: QueryGetWhoisRequest): Promise<QueryGetWhoisResponse> {
    const data = QueryGetWhoisRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "Whois",
      data
    );
    return promise.then((data) =>
      QueryGetWhoisResponse.decode(new Reader(data))
    );
  }

  WhoisAll(request: QueryAllWhoisRequest): Promise<QueryAllWhoisResponse> {
    const data = QueryAllWhoisRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "WhoisAll",
      data
    );
    return promise.then((data) =>
      QueryAllWhoisResponse.decode(new Reader(data))
    );
  }

  PullRequestMergePermission(
    request: QueryGetPullRequestMergePermissionRequest
  ): Promise<QueryGetPullRequestMergePermissionResponse> {
    const data = QueryGetPullRequestMergePermissionRequest.encode(
      request
    ).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "PullRequestMergePermission",
      data
    );
    return promise.then((data) =>
      QueryGetPullRequestMergePermissionResponse.decode(new Reader(data))
    );
  }

  CheckGitServerAuthorization(
    request: QueryCheckGitServerAuthorizationRequest
  ): Promise<QueryCheckGitServerAuthorizationResponse> {
    const data = QueryCheckGitServerAuthorizationRequest.encode(
      request
    ).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "CheckGitServerAuthorization",
      data
    );
    return promise.then((data) =>
      QueryCheckGitServerAuthorizationResponse.decode(new Reader(data))
    );
  }

  CheckStorageProviderAuthorization(
    request: QueryCheckStorageProviderAuthorizationRequest
  ): Promise<QueryCheckStorageProviderAuthorizationResponse> {
    const data = QueryCheckStorageProviderAuthorizationRequest.encode(
      request
    ).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "CheckStorageProviderAuthorization",
      data
    );
    return promise.then((data) =>
      QueryCheckStorageProviderAuthorizationResponse.decode(new Reader(data))
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
