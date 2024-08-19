/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../cosmos/base/query/v1beta1/pagination";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Bounty } from "./bounty";
import { Branch } from "./branch";
import { Comment } from "./comment";
import { Dao } from "./dao";
import { Issue } from "./issue";
import { Member } from "./member";
import { Params } from "./params";
import { PullRequest } from "./pullRequest";
import { Release } from "./release";
import { Repository, RepositoryOwner } from "./repository";
import { Tag } from "./tag";
import { Task } from "./task";
import { User } from "./user";
import { Whois } from "./whois";

export const protobufPackage = "gitopia.gitopia.gitopia";

/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params defines the parameters of the module. */
  params: Params | undefined;
}

export interface QueryVestedAmountRequest {
  address: string;
}

export interface QueryVestedAmountResponse {
  address: string;
  amount: Coin | undefined;
  exercisedAmount: Coin | undefined;
}

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

export interface QueryGetBountyRequest {
  id: number;
}

export interface QueryGetBountyResponse {
  Bounty: Bounty | undefined;
}

export interface QueryAllBountyRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllBountyResponse {
  Bounty: Bounty[];
  pagination: PageResponse | undefined;
}

/** this line is used by starport scaffolding # 3 */
export interface QueryGetPullRequestMergePermissionRequest {
  userId: string;
  repositoryId: number;
  pullIid: number;
}

export interface QueryGetPullRequestMergePermissionResponse {
  havePermission: boolean;
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

export interface QueryGetIssueCommentRequest {
  repositoryId: number;
  issueIid: number;
  commentIid: number;
}

export interface QueryGetIssueCommentResponse {
  Comment: Comment | undefined;
}

export interface QueryGetPullRequestCommentRequest {
  repositoryId: number;
  pullRequestIid: number;
  commentIid: number;
}

export interface QueryGetPullRequestCommentResponse {
  Comment: Comment | undefined;
}

export interface QueryAllCommentRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllCommentResponse {
  Comment: Comment[];
  pagination: PageResponse | undefined;
}

export interface QueryAllIssueCommentRequest {
  repositoryId: number;
  issueIid: number;
  pagination: PageRequest | undefined;
}

export interface QueryAllIssueCommentResponse {
  Comment: Comment[];
  pagination: PageResponse | undefined;
}

export interface QueryAllPullRequestCommentRequest {
  repositoryId: number;
  pullRequestIid: number;
  pagination: PageRequest | undefined;
}

export interface QueryAllPullRequestCommentResponse {
  Comment: Comment[];
  pagination: PageResponse | undefined;
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

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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

  fromJSON(_: any): QueryParamsRequest {
    return {};
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(_: I): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
  return { params: undefined };
}

export const QueryParamsResponse = {
  encode(message: QueryParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(object: I): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseQueryVestedAmountRequest(): QueryVestedAmountRequest {
  return { address: "" };
}

export const QueryVestedAmountRequest = {
  encode(message: QueryVestedAmountRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryVestedAmountRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryVestedAmountRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryVestedAmountRequest {
    return { address: isSet(object.address) ? String(object.address) : "" };
  },

  toJSON(message: QueryVestedAmountRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryVestedAmountRequest>, I>>(object: I): QueryVestedAmountRequest {
    const message = createBaseQueryVestedAmountRequest();
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseQueryVestedAmountResponse(): QueryVestedAmountResponse {
  return { address: "", amount: undefined, exercisedAmount: undefined };
}

export const QueryVestedAmountResponse = {
  encode(message: QueryVestedAmountResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(18).fork()).ldelim();
    }
    if (message.exercisedAmount !== undefined) {
      Coin.encode(message.exercisedAmount, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryVestedAmountResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryVestedAmountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        case 3:
          message.exercisedAmount = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryVestedAmountResponse {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined,
      exercisedAmount: isSet(object.exercisedAmount) ? Coin.fromJSON(object.exercisedAmount) : undefined,
    };
  },

  toJSON(message: QueryVestedAmountResponse): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.amount !== undefined && (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    message.exercisedAmount !== undefined
      && (obj.exercisedAmount = message.exercisedAmount ? Coin.toJSON(message.exercisedAmount) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryVestedAmountResponse>, I>>(object: I): QueryVestedAmountResponse {
    const message = createBaseQueryVestedAmountResponse();
    message.address = object.address ?? "";
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Coin.fromPartial(object.amount)
      : undefined;
    message.exercisedAmount = (object.exercisedAmount !== undefined && object.exercisedAmount !== null)
      ? Coin.fromPartial(object.exercisedAmount)
      : undefined;
    return message;
  },
};

function createBaseQueryCheckStorageProviderAuthorizationRequest(): QueryCheckStorageProviderAuthorizationRequest {
  return { userAddress: "", providerAddress: "" };
}

export const QueryCheckStorageProviderAuthorizationRequest = {
  encode(message: QueryCheckStorageProviderAuthorizationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userAddress !== "") {
      writer.uint32(10).string(message.userAddress);
    }
    if (message.providerAddress !== "") {
      writer.uint32(18).string(message.providerAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCheckStorageProviderAuthorizationRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCheckStorageProviderAuthorizationRequest();
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
    return {
      userAddress: isSet(object.userAddress) ? String(object.userAddress) : "",
      providerAddress: isSet(object.providerAddress) ? String(object.providerAddress) : "",
    };
  },

  toJSON(message: QueryCheckStorageProviderAuthorizationRequest): unknown {
    const obj: any = {};
    message.userAddress !== undefined && (obj.userAddress = message.userAddress);
    message.providerAddress !== undefined && (obj.providerAddress = message.providerAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryCheckStorageProviderAuthorizationRequest>, I>>(
    object: I,
  ): QueryCheckStorageProviderAuthorizationRequest {
    const message = createBaseQueryCheckStorageProviderAuthorizationRequest();
    message.userAddress = object.userAddress ?? "";
    message.providerAddress = object.providerAddress ?? "";
    return message;
  },
};

function createBaseQueryCheckStorageProviderAuthorizationResponse(): QueryCheckStorageProviderAuthorizationResponse {
  return { haveAuthorization: false };
}

export const QueryCheckStorageProviderAuthorizationResponse = {
  encode(
    message: QueryCheckStorageProviderAuthorizationResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.haveAuthorization === true) {
      writer.uint32(8).bool(message.haveAuthorization);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCheckStorageProviderAuthorizationResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCheckStorageProviderAuthorizationResponse();
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
    return { haveAuthorization: isSet(object.haveAuthorization) ? Boolean(object.haveAuthorization) : false };
  },

  toJSON(message: QueryCheckStorageProviderAuthorizationResponse): unknown {
    const obj: any = {};
    message.haveAuthorization !== undefined && (obj.haveAuthorization = message.haveAuthorization);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryCheckStorageProviderAuthorizationResponse>, I>>(
    object: I,
  ): QueryCheckStorageProviderAuthorizationResponse {
    const message = createBaseQueryCheckStorageProviderAuthorizationResponse();
    message.haveAuthorization = object.haveAuthorization ?? false;
    return message;
  },
};

function createBaseQueryGetTaskRequest(): QueryGetTaskRequest {
  return { id: 0 };
}

export const QueryGetTaskRequest = {
  encode(message: QueryGetTaskRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetTaskRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetTaskRequest();
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
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: QueryGetTaskRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetTaskRequest>, I>>(object: I): QueryGetTaskRequest {
    const message = createBaseQueryGetTaskRequest();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseQueryGetTaskResponse(): QueryGetTaskResponse {
  return { Task: undefined };
}

export const QueryGetTaskResponse = {
  encode(message: QueryGetTaskResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Task !== undefined) {
      Task.encode(message.Task, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetTaskResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetTaskResponse();
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
    return { Task: isSet(object.Task) ? Task.fromJSON(object.Task) : undefined };
  },

  toJSON(message: QueryGetTaskResponse): unknown {
    const obj: any = {};
    message.Task !== undefined && (obj.Task = message.Task ? Task.toJSON(message.Task) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetTaskResponse>, I>>(object: I): QueryGetTaskResponse {
    const message = createBaseQueryGetTaskResponse();
    message.Task = (object.Task !== undefined && object.Task !== null) ? Task.fromPartial(object.Task) : undefined;
    return message;
  },
};

function createBaseQueryAllTaskRequest(): QueryAllTaskRequest {
  return { pagination: undefined };
}

export const QueryAllTaskRequest = {
  encode(message: QueryAllTaskRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllTaskRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllTaskRequest();
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
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllTaskRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllTaskRequest>, I>>(object: I): QueryAllTaskRequest {
    const message = createBaseQueryAllTaskRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllTaskResponse(): QueryAllTaskResponse {
  return { Task: [], pagination: undefined };
}

export const QueryAllTaskResponse = {
  encode(message: QueryAllTaskResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Task) {
      Task.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllTaskResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllTaskResponse();
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
    return {
      Task: Array.isArray(object?.Task) ? object.Task.map((e: any) => Task.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllTaskResponse): unknown {
    const obj: any = {};
    if (message.Task) {
      obj.Task = message.Task.map((e) => e ? Task.toJSON(e) : undefined);
    } else {
      obj.Task = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllTaskResponse>, I>>(object: I): QueryAllTaskResponse {
    const message = createBaseQueryAllTaskResponse();
    message.Task = object.Task?.map((e) => Task.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryCheckGitServerAuthorizationRequest(): QueryCheckGitServerAuthorizationRequest {
  return { userAddress: "", providerAddress: "" };
}

export const QueryCheckGitServerAuthorizationRequest = {
  encode(message: QueryCheckGitServerAuthorizationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userAddress !== "") {
      writer.uint32(10).string(message.userAddress);
    }
    if (message.providerAddress !== "") {
      writer.uint32(18).string(message.providerAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCheckGitServerAuthorizationRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCheckGitServerAuthorizationRequest();
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
    return {
      userAddress: isSet(object.userAddress) ? String(object.userAddress) : "",
      providerAddress: isSet(object.providerAddress) ? String(object.providerAddress) : "",
    };
  },

  toJSON(message: QueryCheckGitServerAuthorizationRequest): unknown {
    const obj: any = {};
    message.userAddress !== undefined && (obj.userAddress = message.userAddress);
    message.providerAddress !== undefined && (obj.providerAddress = message.providerAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryCheckGitServerAuthorizationRequest>, I>>(
    object: I,
  ): QueryCheckGitServerAuthorizationRequest {
    const message = createBaseQueryCheckGitServerAuthorizationRequest();
    message.userAddress = object.userAddress ?? "";
    message.providerAddress = object.providerAddress ?? "";
    return message;
  },
};

function createBaseQueryCheckGitServerAuthorizationResponse(): QueryCheckGitServerAuthorizationResponse {
  return { haveAuthorization: false };
}

export const QueryCheckGitServerAuthorizationResponse = {
  encode(message: QueryCheckGitServerAuthorizationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.haveAuthorization === true) {
      writer.uint32(8).bool(message.haveAuthorization);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCheckGitServerAuthorizationResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCheckGitServerAuthorizationResponse();
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
    return { haveAuthorization: isSet(object.haveAuthorization) ? Boolean(object.haveAuthorization) : false };
  },

  toJSON(message: QueryCheckGitServerAuthorizationResponse): unknown {
    const obj: any = {};
    message.haveAuthorization !== undefined && (obj.haveAuthorization = message.haveAuthorization);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryCheckGitServerAuthorizationResponse>, I>>(
    object: I,
  ): QueryCheckGitServerAuthorizationResponse {
    const message = createBaseQueryCheckGitServerAuthorizationResponse();
    message.haveAuthorization = object.haveAuthorization ?? false;
    return message;
  },
};

function createBaseQueryAllBranchRequest(): QueryAllBranchRequest {
  return { pagination: undefined };
}

export const QueryAllBranchRequest = {
  encode(message: QueryAllBranchRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllBranchRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllBranchRequest();
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
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllBranchRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllBranchRequest>, I>>(object: I): QueryAllBranchRequest {
    const message = createBaseQueryAllBranchRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllBranchResponse(): QueryAllBranchResponse {
  return { Branch: [], pagination: undefined };
}

export const QueryAllBranchResponse = {
  encode(message: QueryAllBranchResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Branch) {
      Branch.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllBranchResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllBranchResponse();
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
    return {
      Branch: Array.isArray(object?.Branch) ? object.Branch.map((e: any) => Branch.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllBranchResponse): unknown {
    const obj: any = {};
    if (message.Branch) {
      obj.Branch = message.Branch.map((e) => e ? Branch.toJSON(e) : undefined);
    } else {
      obj.Branch = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllBranchResponse>, I>>(object: I): QueryAllBranchResponse {
    const message = createBaseQueryAllBranchResponse();
    message.Branch = object.Branch?.map((e) => Branch.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetRepositoryBranchRequest(): QueryGetRepositoryBranchRequest {
  return { id: "", repositoryName: "", branchName: "" };
}

export const QueryGetRepositoryBranchRequest = {
  encode(message: QueryGetRepositoryBranchRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetRepositoryBranchRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetRepositoryBranchRequest();
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
    return {
      id: isSet(object.id) ? String(object.id) : "",
      repositoryName: isSet(object.repositoryName) ? String(object.repositoryName) : "",
      branchName: isSet(object.branchName) ? String(object.branchName) : "",
    };
  },

  toJSON(message: QueryGetRepositoryBranchRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.repositoryName !== undefined && (obj.repositoryName = message.repositoryName);
    message.branchName !== undefined && (obj.branchName = message.branchName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetRepositoryBranchRequest>, I>>(
    object: I,
  ): QueryGetRepositoryBranchRequest {
    const message = createBaseQueryGetRepositoryBranchRequest();
    message.id = object.id ?? "";
    message.repositoryName = object.repositoryName ?? "";
    message.branchName = object.branchName ?? "";
    return message;
  },
};

function createBaseQueryGetRepositoryBranchResponse(): QueryGetRepositoryBranchResponse {
  return { Branch: undefined };
}

export const QueryGetRepositoryBranchResponse = {
  encode(message: QueryGetRepositoryBranchResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Branch !== undefined) {
      Branch.encode(message.Branch, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetRepositoryBranchResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetRepositoryBranchResponse();
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
    return { Branch: isSet(object.Branch) ? Branch.fromJSON(object.Branch) : undefined };
  },

  toJSON(message: QueryGetRepositoryBranchResponse): unknown {
    const obj: any = {};
    message.Branch !== undefined && (obj.Branch = message.Branch ? Branch.toJSON(message.Branch) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetRepositoryBranchResponse>, I>>(
    object: I,
  ): QueryGetRepositoryBranchResponse {
    const message = createBaseQueryGetRepositoryBranchResponse();
    message.Branch = (object.Branch !== undefined && object.Branch !== null)
      ? Branch.fromPartial(object.Branch)
      : undefined;
    return message;
  },
};

function createBaseQueryGetRepositoryBranchShaRequest(): QueryGetRepositoryBranchShaRequest {
  return { id: "", repositoryName: "", branchName: "" };
}

export const QueryGetRepositoryBranchShaRequest = {
  encode(message: QueryGetRepositoryBranchShaRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetRepositoryBranchShaRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetRepositoryBranchShaRequest();
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
    return {
      id: isSet(object.id) ? String(object.id) : "",
      repositoryName: isSet(object.repositoryName) ? String(object.repositoryName) : "",
      branchName: isSet(object.branchName) ? String(object.branchName) : "",
    };
  },

  toJSON(message: QueryGetRepositoryBranchShaRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.repositoryName !== undefined && (obj.repositoryName = message.repositoryName);
    message.branchName !== undefined && (obj.branchName = message.branchName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetRepositoryBranchShaRequest>, I>>(
    object: I,
  ): QueryGetRepositoryBranchShaRequest {
    const message = createBaseQueryGetRepositoryBranchShaRequest();
    message.id = object.id ?? "";
    message.repositoryName = object.repositoryName ?? "";
    message.branchName = object.branchName ?? "";
    return message;
  },
};

function createBaseQueryGetRepositoryBranchShaResponse(): QueryGetRepositoryBranchShaResponse {
  return { sha: "" };
}

export const QueryGetRepositoryBranchShaResponse = {
  encode(message: QueryGetRepositoryBranchShaResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sha !== "") {
      writer.uint32(10).string(message.sha);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetRepositoryBranchShaResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetRepositoryBranchShaResponse();
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
    return { sha: isSet(object.sha) ? String(object.sha) : "" };
  },

  toJSON(message: QueryGetRepositoryBranchShaResponse): unknown {
    const obj: any = {};
    message.sha !== undefined && (obj.sha = message.sha);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetRepositoryBranchShaResponse>, I>>(
    object: I,
  ): QueryGetRepositoryBranchShaResponse {
    const message = createBaseQueryGetRepositoryBranchShaResponse();
    message.sha = object.sha ?? "";
    return message;
  },
};

function createBaseQueryAllRepositoryBranchRequest(): QueryAllRepositoryBranchRequest {
  return { id: "", repositoryName: "", pagination: undefined };
}

export const QueryAllRepositoryBranchRequest = {
  encode(message: QueryAllRepositoryBranchRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllRepositoryBranchRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllRepositoryBranchRequest();
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
    return {
      id: isSet(object.id) ? String(object.id) : "",
      repositoryName: isSet(object.repositoryName) ? String(object.repositoryName) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllRepositoryBranchRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.repositoryName !== undefined && (obj.repositoryName = message.repositoryName);
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllRepositoryBranchRequest>, I>>(
    object: I,
  ): QueryAllRepositoryBranchRequest {
    const message = createBaseQueryAllRepositoryBranchRequest();
    message.id = object.id ?? "";
    message.repositoryName = object.repositoryName ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllRepositoryBranchResponse(): QueryAllRepositoryBranchResponse {
  return { Branch: [], pagination: undefined };
}

export const QueryAllRepositoryBranchResponse = {
  encode(message: QueryAllRepositoryBranchResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Branch) {
      Branch.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllRepositoryBranchResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllRepositoryBranchResponse();
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
    return {
      Branch: Array.isArray(object?.Branch) ? object.Branch.map((e: any) => Branch.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllRepositoryBranchResponse): unknown {
    const obj: any = {};
    if (message.Branch) {
      obj.Branch = message.Branch.map((e) => e ? Branch.toJSON(e) : undefined);
    } else {
      obj.Branch = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllRepositoryBranchResponse>, I>>(
    object: I,
  ): QueryAllRepositoryBranchResponse {
    const message = createBaseQueryAllRepositoryBranchResponse();
    message.Branch = object.Branch?.map((e) => Branch.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllTagRequest(): QueryAllTagRequest {
  return { pagination: undefined };
}

export const QueryAllTagRequest = {
  encode(message: QueryAllTagRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllTagRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllTagRequest();
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
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllTagRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllTagRequest>, I>>(object: I): QueryAllTagRequest {
    const message = createBaseQueryAllTagRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllTagResponse(): QueryAllTagResponse {
  return { Tag: [], pagination: undefined };
}

export const QueryAllTagResponse = {
  encode(message: QueryAllTagResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Tag) {
      Tag.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllTagResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllTagResponse();
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
    return {
      Tag: Array.isArray(object?.Tag) ? object.Tag.map((e: any) => Tag.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllTagResponse): unknown {
    const obj: any = {};
    if (message.Tag) {
      obj.Tag = message.Tag.map((e) => e ? Tag.toJSON(e) : undefined);
    } else {
      obj.Tag = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllTagResponse>, I>>(object: I): QueryAllTagResponse {
    const message = createBaseQueryAllTagResponse();
    message.Tag = object.Tag?.map((e) => Tag.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetRepositoryTagRequest(): QueryGetRepositoryTagRequest {
  return { id: "", repositoryName: "", tagName: "" };
}

export const QueryGetRepositoryTagRequest = {
  encode(message: QueryGetRepositoryTagRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetRepositoryTagRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetRepositoryTagRequest();
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
    return {
      id: isSet(object.id) ? String(object.id) : "",
      repositoryName: isSet(object.repositoryName) ? String(object.repositoryName) : "",
      tagName: isSet(object.tagName) ? String(object.tagName) : "",
    };
  },

  toJSON(message: QueryGetRepositoryTagRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.repositoryName !== undefined && (obj.repositoryName = message.repositoryName);
    message.tagName !== undefined && (obj.tagName = message.tagName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetRepositoryTagRequest>, I>>(object: I): QueryGetRepositoryTagRequest {
    const message = createBaseQueryGetRepositoryTagRequest();
    message.id = object.id ?? "";
    message.repositoryName = object.repositoryName ?? "";
    message.tagName = object.tagName ?? "";
    return message;
  },
};

function createBaseQueryGetRepositoryTagResponse(): QueryGetRepositoryTagResponse {
  return { Tag: undefined };
}

export const QueryGetRepositoryTagResponse = {
  encode(message: QueryGetRepositoryTagResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Tag !== undefined) {
      Tag.encode(message.Tag, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetRepositoryTagResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetRepositoryTagResponse();
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
    return { Tag: isSet(object.Tag) ? Tag.fromJSON(object.Tag) : undefined };
  },

  toJSON(message: QueryGetRepositoryTagResponse): unknown {
    const obj: any = {};
    message.Tag !== undefined && (obj.Tag = message.Tag ? Tag.toJSON(message.Tag) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetRepositoryTagResponse>, I>>(
    object: I,
  ): QueryGetRepositoryTagResponse {
    const message = createBaseQueryGetRepositoryTagResponse();
    message.Tag = (object.Tag !== undefined && object.Tag !== null) ? Tag.fromPartial(object.Tag) : undefined;
    return message;
  },
};

function createBaseQueryGetRepositoryTagShaRequest(): QueryGetRepositoryTagShaRequest {
  return { id: "", repositoryName: "", tagName: "" };
}

export const QueryGetRepositoryTagShaRequest = {
  encode(message: QueryGetRepositoryTagShaRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetRepositoryTagShaRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetRepositoryTagShaRequest();
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
    return {
      id: isSet(object.id) ? String(object.id) : "",
      repositoryName: isSet(object.repositoryName) ? String(object.repositoryName) : "",
      tagName: isSet(object.tagName) ? String(object.tagName) : "",
    };
  },

  toJSON(message: QueryGetRepositoryTagShaRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.repositoryName !== undefined && (obj.repositoryName = message.repositoryName);
    message.tagName !== undefined && (obj.tagName = message.tagName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetRepositoryTagShaRequest>, I>>(
    object: I,
  ): QueryGetRepositoryTagShaRequest {
    const message = createBaseQueryGetRepositoryTagShaRequest();
    message.id = object.id ?? "";
    message.repositoryName = object.repositoryName ?? "";
    message.tagName = object.tagName ?? "";
    return message;
  },
};

function createBaseQueryGetRepositoryTagShaResponse(): QueryGetRepositoryTagShaResponse {
  return { sha: "" };
}

export const QueryGetRepositoryTagShaResponse = {
  encode(message: QueryGetRepositoryTagShaResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sha !== "") {
      writer.uint32(10).string(message.sha);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetRepositoryTagShaResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetRepositoryTagShaResponse();
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
    return { sha: isSet(object.sha) ? String(object.sha) : "" };
  },

  toJSON(message: QueryGetRepositoryTagShaResponse): unknown {
    const obj: any = {};
    message.sha !== undefined && (obj.sha = message.sha);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetRepositoryTagShaResponse>, I>>(
    object: I,
  ): QueryGetRepositoryTagShaResponse {
    const message = createBaseQueryGetRepositoryTagShaResponse();
    message.sha = object.sha ?? "";
    return message;
  },
};

function createBaseQueryAllRepositoryTagRequest(): QueryAllRepositoryTagRequest {
  return { id: "", repositoryName: "", pagination: undefined };
}

export const QueryAllRepositoryTagRequest = {
  encode(message: QueryAllRepositoryTagRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllRepositoryTagRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllRepositoryTagRequest();
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
    return {
      id: isSet(object.id) ? String(object.id) : "",
      repositoryName: isSet(object.repositoryName) ? String(object.repositoryName) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllRepositoryTagRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.repositoryName !== undefined && (obj.repositoryName = message.repositoryName);
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllRepositoryTagRequest>, I>>(object: I): QueryAllRepositoryTagRequest {
    const message = createBaseQueryAllRepositoryTagRequest();
    message.id = object.id ?? "";
    message.repositoryName = object.repositoryName ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllRepositoryTagResponse(): QueryAllRepositoryTagResponse {
  return { Tag: [], pagination: undefined };
}

export const QueryAllRepositoryTagResponse = {
  encode(message: QueryAllRepositoryTagResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Tag) {
      Tag.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllRepositoryTagResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllRepositoryTagResponse();
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
    return {
      Tag: Array.isArray(object?.Tag) ? object.Tag.map((e: any) => Tag.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllRepositoryTagResponse): unknown {
    const obj: any = {};
    if (message.Tag) {
      obj.Tag = message.Tag.map((e) => e ? Tag.toJSON(e) : undefined);
    } else {
      obj.Tag = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllRepositoryTagResponse>, I>>(
    object: I,
  ): QueryAllRepositoryTagResponse {
    const message = createBaseQueryAllRepositoryTagResponse();
    message.Tag = object.Tag?.map((e) => Tag.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetDaoMemberRequest(): QueryGetDaoMemberRequest {
  return { daoId: "", userId: "" };
}

export const QueryGetDaoMemberRequest = {
  encode(message: QueryGetDaoMemberRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.daoId !== "") {
      writer.uint32(10).string(message.daoId);
    }
    if (message.userId !== "") {
      writer.uint32(18).string(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetDaoMemberRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetDaoMemberRequest();
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
    return {
      daoId: isSet(object.daoId) ? String(object.daoId) : "",
      userId: isSet(object.userId) ? String(object.userId) : "",
    };
  },

  toJSON(message: QueryGetDaoMemberRequest): unknown {
    const obj: any = {};
    message.daoId !== undefined && (obj.daoId = message.daoId);
    message.userId !== undefined && (obj.userId = message.userId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetDaoMemberRequest>, I>>(object: I): QueryGetDaoMemberRequest {
    const message = createBaseQueryGetDaoMemberRequest();
    message.daoId = object.daoId ?? "";
    message.userId = object.userId ?? "";
    return message;
  },
};

function createBaseQueryGetDaoMemberResponse(): QueryGetDaoMemberResponse {
  return { Member: undefined };
}

export const QueryGetDaoMemberResponse = {
  encode(message: QueryGetDaoMemberResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Member !== undefined) {
      Member.encode(message.Member, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetDaoMemberResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetDaoMemberResponse();
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
    return { Member: isSet(object.Member) ? Member.fromJSON(object.Member) : undefined };
  },

  toJSON(message: QueryGetDaoMemberResponse): unknown {
    const obj: any = {};
    message.Member !== undefined && (obj.Member = message.Member ? Member.toJSON(message.Member) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetDaoMemberResponse>, I>>(object: I): QueryGetDaoMemberResponse {
    const message = createBaseQueryGetDaoMemberResponse();
    message.Member = (object.Member !== undefined && object.Member !== null)
      ? Member.fromPartial(object.Member)
      : undefined;
    return message;
  },
};

function createBaseQueryAllDaoMemberRequest(): QueryAllDaoMemberRequest {
  return { daoId: "", pagination: undefined };
}

export const QueryAllDaoMemberRequest = {
  encode(message: QueryAllDaoMemberRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.daoId !== "") {
      writer.uint32(10).string(message.daoId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllDaoMemberRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllDaoMemberRequest();
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
    return {
      daoId: isSet(object.daoId) ? String(object.daoId) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllDaoMemberRequest): unknown {
    const obj: any = {};
    message.daoId !== undefined && (obj.daoId = message.daoId);
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllDaoMemberRequest>, I>>(object: I): QueryAllDaoMemberRequest {
    const message = createBaseQueryAllDaoMemberRequest();
    message.daoId = object.daoId ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllDaoMemberResponse(): QueryAllDaoMemberResponse {
  return { Member: [], pagination: undefined };
}

export const QueryAllDaoMemberResponse = {
  encode(message: QueryAllDaoMemberResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Member) {
      Member.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllDaoMemberResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllDaoMemberResponse();
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
    return {
      Member: Array.isArray(object?.Member) ? object.Member.map((e: any) => Member.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllDaoMemberResponse): unknown {
    const obj: any = {};
    if (message.Member) {
      obj.Member = message.Member.map((e) => e ? Member.toJSON(e) : undefined);
    } else {
      obj.Member = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllDaoMemberResponse>, I>>(object: I): QueryAllDaoMemberResponse {
    const message = createBaseQueryAllDaoMemberResponse();
    message.Member = object.Member?.map((e) => Member.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllMemberRequest(): QueryAllMemberRequest {
  return { pagination: undefined };
}

export const QueryAllMemberRequest = {
  encode(message: QueryAllMemberRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllMemberRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllMemberRequest();
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
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllMemberRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllMemberRequest>, I>>(object: I): QueryAllMemberRequest {
    const message = createBaseQueryAllMemberRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllMemberResponse(): QueryAllMemberResponse {
  return { Member: [], pagination: undefined };
}

export const QueryAllMemberResponse = {
  encode(message: QueryAllMemberResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Member) {
      Member.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllMemberResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllMemberResponse();
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
    return {
      Member: Array.isArray(object?.Member) ? object.Member.map((e: any) => Member.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllMemberResponse): unknown {
    const obj: any = {};
    if (message.Member) {
      obj.Member = message.Member.map((e) => e ? Member.toJSON(e) : undefined);
    } else {
      obj.Member = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllMemberResponse>, I>>(object: I): QueryAllMemberResponse {
    const message = createBaseQueryAllMemberResponse();
    message.Member = object.Member?.map((e) => Member.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetBountyRequest(): QueryGetBountyRequest {
  return { id: 0 };
}

export const QueryGetBountyRequest = {
  encode(message: QueryGetBountyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetBountyRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetBountyRequest();
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

  fromJSON(object: any): QueryGetBountyRequest {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: QueryGetBountyRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetBountyRequest>, I>>(object: I): QueryGetBountyRequest {
    const message = createBaseQueryGetBountyRequest();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseQueryGetBountyResponse(): QueryGetBountyResponse {
  return { Bounty: undefined };
}

export const QueryGetBountyResponse = {
  encode(message: QueryGetBountyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Bounty !== undefined) {
      Bounty.encode(message.Bounty, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetBountyResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetBountyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Bounty = Bounty.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetBountyResponse {
    return { Bounty: isSet(object.Bounty) ? Bounty.fromJSON(object.Bounty) : undefined };
  },

  toJSON(message: QueryGetBountyResponse): unknown {
    const obj: any = {};
    message.Bounty !== undefined && (obj.Bounty = message.Bounty ? Bounty.toJSON(message.Bounty) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetBountyResponse>, I>>(object: I): QueryGetBountyResponse {
    const message = createBaseQueryGetBountyResponse();
    message.Bounty = (object.Bounty !== undefined && object.Bounty !== null)
      ? Bounty.fromPartial(object.Bounty)
      : undefined;
    return message;
  },
};

function createBaseQueryAllBountyRequest(): QueryAllBountyRequest {
  return { pagination: undefined };
}

export const QueryAllBountyRequest = {
  encode(message: QueryAllBountyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllBountyRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllBountyRequest();
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

  fromJSON(object: any): QueryAllBountyRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllBountyRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllBountyRequest>, I>>(object: I): QueryAllBountyRequest {
    const message = createBaseQueryAllBountyRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllBountyResponse(): QueryAllBountyResponse {
  return { Bounty: [], pagination: undefined };
}

export const QueryAllBountyResponse = {
  encode(message: QueryAllBountyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Bounty) {
      Bounty.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllBountyResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllBountyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Bounty.push(Bounty.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryAllBountyResponse {
    return {
      Bounty: Array.isArray(object?.Bounty) ? object.Bounty.map((e: any) => Bounty.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllBountyResponse): unknown {
    const obj: any = {};
    if (message.Bounty) {
      obj.Bounty = message.Bounty.map((e) => e ? Bounty.toJSON(e) : undefined);
    } else {
      obj.Bounty = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllBountyResponse>, I>>(object: I): QueryAllBountyResponse {
    const message = createBaseQueryAllBountyResponse();
    message.Bounty = object.Bounty?.map((e) => Bounty.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetPullRequestMergePermissionRequest(): QueryGetPullRequestMergePermissionRequest {
  return { userId: "", repositoryId: 0, pullIid: 0 };
}

export const QueryGetPullRequestMergePermissionRequest = {
  encode(message: QueryGetPullRequestMergePermissionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.repositoryId !== 0) {
      writer.uint32(16).uint64(message.repositoryId);
    }
    if (message.pullIid !== 0) {
      writer.uint32(24).uint64(message.pullIid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetPullRequestMergePermissionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPullRequestMergePermissionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = reader.string();
          break;
        case 2:
          message.repositoryId = longToNumber(reader.uint64() as Long);
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

  fromJSON(object: any): QueryGetPullRequestMergePermissionRequest {
    return {
      userId: isSet(object.userId) ? String(object.userId) : "",
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      pullIid: isSet(object.pullIid) ? Number(object.pullIid) : 0,
    };
  },

  toJSON(message: QueryGetPullRequestMergePermissionRequest): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = message.userId);
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.pullIid !== undefined && (obj.pullIid = Math.round(message.pullIid));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetPullRequestMergePermissionRequest>, I>>(
    object: I,
  ): QueryGetPullRequestMergePermissionRequest {
    const message = createBaseQueryGetPullRequestMergePermissionRequest();
    message.userId = object.userId ?? "";
    message.repositoryId = object.repositoryId ?? 0;
    message.pullIid = object.pullIid ?? 0;
    return message;
  },
};

function createBaseQueryGetPullRequestMergePermissionResponse(): QueryGetPullRequestMergePermissionResponse {
  return { havePermission: false };
}

export const QueryGetPullRequestMergePermissionResponse = {
  encode(message: QueryGetPullRequestMergePermissionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.havePermission === true) {
      writer.uint32(8).bool(message.havePermission);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetPullRequestMergePermissionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPullRequestMergePermissionResponse();
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
    return { havePermission: isSet(object.havePermission) ? Boolean(object.havePermission) : false };
  },

  toJSON(message: QueryGetPullRequestMergePermissionResponse): unknown {
    const obj: any = {};
    message.havePermission !== undefined && (obj.havePermission = message.havePermission);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetPullRequestMergePermissionResponse>, I>>(
    object: I,
  ): QueryGetPullRequestMergePermissionResponse {
    const message = createBaseQueryGetPullRequestMergePermissionResponse();
    message.havePermission = object.havePermission ?? false;
    return message;
  },
};

function createBaseQueryGetReleaseRequest(): QueryGetReleaseRequest {
  return { id: 0 };
}

export const QueryGetReleaseRequest = {
  encode(message: QueryGetReleaseRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetReleaseRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetReleaseRequest();
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
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: QueryGetReleaseRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetReleaseRequest>, I>>(object: I): QueryGetReleaseRequest {
    const message = createBaseQueryGetReleaseRequest();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseQueryGetReleaseResponse(): QueryGetReleaseResponse {
  return { Release: undefined };
}

export const QueryGetReleaseResponse = {
  encode(message: QueryGetReleaseResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Release !== undefined) {
      Release.encode(message.Release, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetReleaseResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetReleaseResponse();
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
    return { Release: isSet(object.Release) ? Release.fromJSON(object.Release) : undefined };
  },

  toJSON(message: QueryGetReleaseResponse): unknown {
    const obj: any = {};
    message.Release !== undefined && (obj.Release = message.Release ? Release.toJSON(message.Release) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetReleaseResponse>, I>>(object: I): QueryGetReleaseResponse {
    const message = createBaseQueryGetReleaseResponse();
    message.Release = (object.Release !== undefined && object.Release !== null)
      ? Release.fromPartial(object.Release)
      : undefined;
    return message;
  },
};

function createBaseQueryAllReleaseRequest(): QueryAllReleaseRequest {
  return { pagination: undefined };
}

export const QueryAllReleaseRequest = {
  encode(message: QueryAllReleaseRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllReleaseRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllReleaseRequest();
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
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllReleaseRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllReleaseRequest>, I>>(object: I): QueryAllReleaseRequest {
    const message = createBaseQueryAllReleaseRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllReleaseResponse(): QueryAllReleaseResponse {
  return { Release: [], pagination: undefined };
}

export const QueryAllReleaseResponse = {
  encode(message: QueryAllReleaseResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Release) {
      Release.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllReleaseResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllReleaseResponse();
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
    return {
      Release: Array.isArray(object?.Release) ? object.Release.map((e: any) => Release.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllReleaseResponse): unknown {
    const obj: any = {};
    if (message.Release) {
      obj.Release = message.Release.map((e) => e ? Release.toJSON(e) : undefined);
    } else {
      obj.Release = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllReleaseResponse>, I>>(object: I): QueryAllReleaseResponse {
    const message = createBaseQueryAllReleaseResponse();
    message.Release = object.Release?.map((e) => Release.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetPullRequestRequest(): QueryGetPullRequestRequest {
  return { id: 0 };
}

export const QueryGetPullRequestRequest = {
  encode(message: QueryGetPullRequestRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetPullRequestRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPullRequestRequest();
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
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: QueryGetPullRequestRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetPullRequestRequest>, I>>(object: I): QueryGetPullRequestRequest {
    const message = createBaseQueryGetPullRequestRequest();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseQueryGetPullRequestResponse(): QueryGetPullRequestResponse {
  return { PullRequest: undefined };
}

export const QueryGetPullRequestResponse = {
  encode(message: QueryGetPullRequestResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.PullRequest !== undefined) {
      PullRequest.encode(message.PullRequest, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetPullRequestResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPullRequestResponse();
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
    return { PullRequest: isSet(object.PullRequest) ? PullRequest.fromJSON(object.PullRequest) : undefined };
  },

  toJSON(message: QueryGetPullRequestResponse): unknown {
    const obj: any = {};
    message.PullRequest !== undefined
      && (obj.PullRequest = message.PullRequest ? PullRequest.toJSON(message.PullRequest) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetPullRequestResponse>, I>>(object: I): QueryGetPullRequestResponse {
    const message = createBaseQueryGetPullRequestResponse();
    message.PullRequest = (object.PullRequest !== undefined && object.PullRequest !== null)
      ? PullRequest.fromPartial(object.PullRequest)
      : undefined;
    return message;
  },
};

function createBaseQueryAllPullRequestRequest(): QueryAllPullRequestRequest {
  return { pagination: undefined };
}

export const QueryAllPullRequestRequest = {
  encode(message: QueryAllPullRequestRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllPullRequestRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPullRequestRequest();
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
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllPullRequestRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllPullRequestRequest>, I>>(object: I): QueryAllPullRequestRequest {
    const message = createBaseQueryAllPullRequestRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllPullRequestResponse(): QueryAllPullRequestResponse {
  return { PullRequest: [], pagination: undefined };
}

export const QueryAllPullRequestResponse = {
  encode(message: QueryAllPullRequestResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.PullRequest) {
      PullRequest.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllPullRequestResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPullRequestResponse();
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
    return {
      PullRequest: Array.isArray(object?.PullRequest)
        ? object.PullRequest.map((e: any) => PullRequest.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllPullRequestResponse): unknown {
    const obj: any = {};
    if (message.PullRequest) {
      obj.PullRequest = message.PullRequest.map((e) => e ? PullRequest.toJSON(e) : undefined);
    } else {
      obj.PullRequest = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllPullRequestResponse>, I>>(object: I): QueryAllPullRequestResponse {
    const message = createBaseQueryAllPullRequestResponse();
    message.PullRequest = object.PullRequest?.map((e) => PullRequest.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetDaoRequest(): QueryGetDaoRequest {
  return { id: "" };
}

export const QueryGetDaoRequest = {
  encode(message: QueryGetDaoRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetDaoRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetDaoRequest();
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
    return { id: isSet(object.id) ? String(object.id) : "" };
  },

  toJSON(message: QueryGetDaoRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetDaoRequest>, I>>(object: I): QueryGetDaoRequest {
    const message = createBaseQueryGetDaoRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseQueryGetDaoResponse(): QueryGetDaoResponse {
  return { dao: undefined };
}

export const QueryGetDaoResponse = {
  encode(message: QueryGetDaoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.dao !== undefined) {
      Dao.encode(message.dao, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetDaoResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetDaoResponse();
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
    return { dao: isSet(object.dao) ? Dao.fromJSON(object.dao) : undefined };
  },

  toJSON(message: QueryGetDaoResponse): unknown {
    const obj: any = {};
    message.dao !== undefined && (obj.dao = message.dao ? Dao.toJSON(message.dao) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetDaoResponse>, I>>(object: I): QueryGetDaoResponse {
    const message = createBaseQueryGetDaoResponse();
    message.dao = (object.dao !== undefined && object.dao !== null) ? Dao.fromPartial(object.dao) : undefined;
    return message;
  },
};

function createBaseQueryAllDaoRequest(): QueryAllDaoRequest {
  return { pagination: undefined };
}

export const QueryAllDaoRequest = {
  encode(message: QueryAllDaoRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllDaoRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllDaoRequest();
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
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllDaoRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllDaoRequest>, I>>(object: I): QueryAllDaoRequest {
    const message = createBaseQueryAllDaoRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllDaoResponse(): QueryAllDaoResponse {
  return { dao: [], pagination: undefined };
}

export const QueryAllDaoResponse = {
  encode(message: QueryAllDaoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.dao) {
      Dao.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllDaoResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllDaoResponse();
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
    return {
      dao: Array.isArray(object?.dao) ? object.dao.map((e: any) => Dao.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllDaoResponse): unknown {
    const obj: any = {};
    if (message.dao) {
      obj.dao = message.dao.map((e) => e ? Dao.toJSON(e) : undefined);
    } else {
      obj.dao = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllDaoResponse>, I>>(object: I): QueryAllDaoResponse {
    const message = createBaseQueryAllDaoResponse();
    message.dao = object.dao?.map((e) => Dao.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetIssueCommentRequest(): QueryGetIssueCommentRequest {
  return { repositoryId: 0, issueIid: 0, commentIid: 0 };
}

export const QueryGetIssueCommentRequest = {
  encode(message: QueryGetIssueCommentRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.repositoryId !== 0) {
      writer.uint32(8).uint64(message.repositoryId);
    }
    if (message.issueIid !== 0) {
      writer.uint32(16).uint64(message.issueIid);
    }
    if (message.commentIid !== 0) {
      writer.uint32(24).uint64(message.commentIid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetIssueCommentRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetIssueCommentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.issueIid = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.commentIid = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetIssueCommentRequest {
    return {
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      issueIid: isSet(object.issueIid) ? Number(object.issueIid) : 0,
      commentIid: isSet(object.commentIid) ? Number(object.commentIid) : 0,
    };
  },

  toJSON(message: QueryGetIssueCommentRequest): unknown {
    const obj: any = {};
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.issueIid !== undefined && (obj.issueIid = Math.round(message.issueIid));
    message.commentIid !== undefined && (obj.commentIid = Math.round(message.commentIid));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetIssueCommentRequest>, I>>(object: I): QueryGetIssueCommentRequest {
    const message = createBaseQueryGetIssueCommentRequest();
    message.repositoryId = object.repositoryId ?? 0;
    message.issueIid = object.issueIid ?? 0;
    message.commentIid = object.commentIid ?? 0;
    return message;
  },
};

function createBaseQueryGetIssueCommentResponse(): QueryGetIssueCommentResponse {
  return { Comment: undefined };
}

export const QueryGetIssueCommentResponse = {
  encode(message: QueryGetIssueCommentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Comment !== undefined) {
      Comment.encode(message.Comment, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetIssueCommentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetIssueCommentResponse();
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

  fromJSON(object: any): QueryGetIssueCommentResponse {
    return { Comment: isSet(object.Comment) ? Comment.fromJSON(object.Comment) : undefined };
  },

  toJSON(message: QueryGetIssueCommentResponse): unknown {
    const obj: any = {};
    message.Comment !== undefined && (obj.Comment = message.Comment ? Comment.toJSON(message.Comment) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetIssueCommentResponse>, I>>(object: I): QueryGetIssueCommentResponse {
    const message = createBaseQueryGetIssueCommentResponse();
    message.Comment = (object.Comment !== undefined && object.Comment !== null)
      ? Comment.fromPartial(object.Comment)
      : undefined;
    return message;
  },
};

function createBaseQueryGetPullRequestCommentRequest(): QueryGetPullRequestCommentRequest {
  return { repositoryId: 0, pullRequestIid: 0, commentIid: 0 };
}

export const QueryGetPullRequestCommentRequest = {
  encode(message: QueryGetPullRequestCommentRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.repositoryId !== 0) {
      writer.uint32(8).uint64(message.repositoryId);
    }
    if (message.pullRequestIid !== 0) {
      writer.uint32(16).uint64(message.pullRequestIid);
    }
    if (message.commentIid !== 0) {
      writer.uint32(24).uint64(message.commentIid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetPullRequestCommentRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPullRequestCommentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.pullRequestIid = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.commentIid = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetPullRequestCommentRequest {
    return {
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      pullRequestIid: isSet(object.pullRequestIid) ? Number(object.pullRequestIid) : 0,
      commentIid: isSet(object.commentIid) ? Number(object.commentIid) : 0,
    };
  },

  toJSON(message: QueryGetPullRequestCommentRequest): unknown {
    const obj: any = {};
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.pullRequestIid !== undefined && (obj.pullRequestIid = Math.round(message.pullRequestIid));
    message.commentIid !== undefined && (obj.commentIid = Math.round(message.commentIid));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetPullRequestCommentRequest>, I>>(
    object: I,
  ): QueryGetPullRequestCommentRequest {
    const message = createBaseQueryGetPullRequestCommentRequest();
    message.repositoryId = object.repositoryId ?? 0;
    message.pullRequestIid = object.pullRequestIid ?? 0;
    message.commentIid = object.commentIid ?? 0;
    return message;
  },
};

function createBaseQueryGetPullRequestCommentResponse(): QueryGetPullRequestCommentResponse {
  return { Comment: undefined };
}

export const QueryGetPullRequestCommentResponse = {
  encode(message: QueryGetPullRequestCommentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Comment !== undefined) {
      Comment.encode(message.Comment, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetPullRequestCommentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPullRequestCommentResponse();
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

  fromJSON(object: any): QueryGetPullRequestCommentResponse {
    return { Comment: isSet(object.Comment) ? Comment.fromJSON(object.Comment) : undefined };
  },

  toJSON(message: QueryGetPullRequestCommentResponse): unknown {
    const obj: any = {};
    message.Comment !== undefined && (obj.Comment = message.Comment ? Comment.toJSON(message.Comment) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetPullRequestCommentResponse>, I>>(
    object: I,
  ): QueryGetPullRequestCommentResponse {
    const message = createBaseQueryGetPullRequestCommentResponse();
    message.Comment = (object.Comment !== undefined && object.Comment !== null)
      ? Comment.fromPartial(object.Comment)
      : undefined;
    return message;
  },
};

function createBaseQueryAllCommentRequest(): QueryAllCommentRequest {
  return { pagination: undefined };
}

export const QueryAllCommentRequest = {
  encode(message: QueryAllCommentRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllCommentRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllCommentRequest();
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
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllCommentRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllCommentRequest>, I>>(object: I): QueryAllCommentRequest {
    const message = createBaseQueryAllCommentRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllCommentResponse(): QueryAllCommentResponse {
  return { Comment: [], pagination: undefined };
}

export const QueryAllCommentResponse = {
  encode(message: QueryAllCommentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Comment) {
      Comment.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllCommentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllCommentResponse();
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
    return {
      Comment: Array.isArray(object?.Comment) ? object.Comment.map((e: any) => Comment.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllCommentResponse): unknown {
    const obj: any = {};
    if (message.Comment) {
      obj.Comment = message.Comment.map((e) => e ? Comment.toJSON(e) : undefined);
    } else {
      obj.Comment = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllCommentResponse>, I>>(object: I): QueryAllCommentResponse {
    const message = createBaseQueryAllCommentResponse();
    message.Comment = object.Comment?.map((e) => Comment.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllIssueCommentRequest(): QueryAllIssueCommentRequest {
  return { repositoryId: 0, issueIid: 0, pagination: undefined };
}

export const QueryAllIssueCommentRequest = {
  encode(message: QueryAllIssueCommentRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.repositoryId !== 0) {
      writer.uint32(8).uint64(message.repositoryId);
    }
    if (message.issueIid !== 0) {
      writer.uint32(16).uint64(message.issueIid);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllIssueCommentRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllIssueCommentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.issueIid = longToNumber(reader.uint64() as Long);
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

  fromJSON(object: any): QueryAllIssueCommentRequest {
    return {
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      issueIid: isSet(object.issueIid) ? Number(object.issueIid) : 0,
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllIssueCommentRequest): unknown {
    const obj: any = {};
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.issueIid !== undefined && (obj.issueIid = Math.round(message.issueIid));
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllIssueCommentRequest>, I>>(object: I): QueryAllIssueCommentRequest {
    const message = createBaseQueryAllIssueCommentRequest();
    message.repositoryId = object.repositoryId ?? 0;
    message.issueIid = object.issueIid ?? 0;
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllIssueCommentResponse(): QueryAllIssueCommentResponse {
  return { Comment: [], pagination: undefined };
}

export const QueryAllIssueCommentResponse = {
  encode(message: QueryAllIssueCommentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Comment) {
      Comment.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllIssueCommentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllIssueCommentResponse();
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

  fromJSON(object: any): QueryAllIssueCommentResponse {
    return {
      Comment: Array.isArray(object?.Comment) ? object.Comment.map((e: any) => Comment.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllIssueCommentResponse): unknown {
    const obj: any = {};
    if (message.Comment) {
      obj.Comment = message.Comment.map((e) => e ? Comment.toJSON(e) : undefined);
    } else {
      obj.Comment = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllIssueCommentResponse>, I>>(object: I): QueryAllIssueCommentResponse {
    const message = createBaseQueryAllIssueCommentResponse();
    message.Comment = object.Comment?.map((e) => Comment.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllPullRequestCommentRequest(): QueryAllPullRequestCommentRequest {
  return { repositoryId: 0, pullRequestIid: 0, pagination: undefined };
}

export const QueryAllPullRequestCommentRequest = {
  encode(message: QueryAllPullRequestCommentRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.repositoryId !== 0) {
      writer.uint32(8).uint64(message.repositoryId);
    }
    if (message.pullRequestIid !== 0) {
      writer.uint32(16).uint64(message.pullRequestIid);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllPullRequestCommentRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPullRequestCommentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.pullRequestIid = longToNumber(reader.uint64() as Long);
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

  fromJSON(object: any): QueryAllPullRequestCommentRequest {
    return {
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      pullRequestIid: isSet(object.pullRequestIid) ? Number(object.pullRequestIid) : 0,
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllPullRequestCommentRequest): unknown {
    const obj: any = {};
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.pullRequestIid !== undefined && (obj.pullRequestIid = Math.round(message.pullRequestIid));
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllPullRequestCommentRequest>, I>>(
    object: I,
  ): QueryAllPullRequestCommentRequest {
    const message = createBaseQueryAllPullRequestCommentRequest();
    message.repositoryId = object.repositoryId ?? 0;
    message.pullRequestIid = object.pullRequestIid ?? 0;
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllPullRequestCommentResponse(): QueryAllPullRequestCommentResponse {
  return { Comment: [], pagination: undefined };
}

export const QueryAllPullRequestCommentResponse = {
  encode(message: QueryAllPullRequestCommentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Comment) {
      Comment.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllPullRequestCommentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPullRequestCommentResponse();
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

  fromJSON(object: any): QueryAllPullRequestCommentResponse {
    return {
      Comment: Array.isArray(object?.Comment) ? object.Comment.map((e: any) => Comment.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllPullRequestCommentResponse): unknown {
    const obj: any = {};
    if (message.Comment) {
      obj.Comment = message.Comment.map((e) => e ? Comment.toJSON(e) : undefined);
    } else {
      obj.Comment = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllPullRequestCommentResponse>, I>>(
    object: I,
  ): QueryAllPullRequestCommentResponse {
    const message = createBaseQueryAllPullRequestCommentResponse();
    message.Comment = object.Comment?.map((e) => Comment.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllIssueRequest(): QueryAllIssueRequest {
  return { pagination: undefined };
}

export const QueryAllIssueRequest = {
  encode(message: QueryAllIssueRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllIssueRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllIssueRequest();
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
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllIssueRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllIssueRequest>, I>>(object: I): QueryAllIssueRequest {
    const message = createBaseQueryAllIssueRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllIssueResponse(): QueryAllIssueResponse {
  return { Issue: [], pagination: undefined };
}

export const QueryAllIssueResponse = {
  encode(message: QueryAllIssueResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Issue) {
      Issue.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllIssueResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllIssueResponse();
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
    return {
      Issue: Array.isArray(object?.Issue) ? object.Issue.map((e: any) => Issue.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllIssueResponse): unknown {
    const obj: any = {};
    if (message.Issue) {
      obj.Issue = message.Issue.map((e) => e ? Issue.toJSON(e) : undefined);
    } else {
      obj.Issue = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllIssueResponse>, I>>(object: I): QueryAllIssueResponse {
    const message = createBaseQueryAllIssueResponse();
    message.Issue = object.Issue?.map((e) => Issue.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetLatestRepositoryReleaseRequest(): QueryGetLatestRepositoryReleaseRequest {
  return { id: "", repositoryName: "" };
}

export const QueryGetLatestRepositoryReleaseRequest = {
  encode(message: QueryGetLatestRepositoryReleaseRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.repositoryName !== "") {
      writer.uint32(18).string(message.repositoryName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetLatestRepositoryReleaseRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetLatestRepositoryReleaseRequest();
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
    return {
      id: isSet(object.id) ? String(object.id) : "",
      repositoryName: isSet(object.repositoryName) ? String(object.repositoryName) : "",
    };
  },

  toJSON(message: QueryGetLatestRepositoryReleaseRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.repositoryName !== undefined && (obj.repositoryName = message.repositoryName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetLatestRepositoryReleaseRequest>, I>>(
    object: I,
  ): QueryGetLatestRepositoryReleaseRequest {
    const message = createBaseQueryGetLatestRepositoryReleaseRequest();
    message.id = object.id ?? "";
    message.repositoryName = object.repositoryName ?? "";
    return message;
  },
};

function createBaseQueryGetLatestRepositoryReleaseResponse(): QueryGetLatestRepositoryReleaseResponse {
  return { Release: undefined };
}

export const QueryGetLatestRepositoryReleaseResponse = {
  encode(message: QueryGetLatestRepositoryReleaseResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Release !== undefined) {
      Release.encode(message.Release, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetLatestRepositoryReleaseResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetLatestRepositoryReleaseResponse();
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
    return { Release: isSet(object.Release) ? Release.fromJSON(object.Release) : undefined };
  },

  toJSON(message: QueryGetLatestRepositoryReleaseResponse): unknown {
    const obj: any = {};
    message.Release !== undefined && (obj.Release = message.Release ? Release.toJSON(message.Release) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetLatestRepositoryReleaseResponse>, I>>(
    object: I,
  ): QueryGetLatestRepositoryReleaseResponse {
    const message = createBaseQueryGetLatestRepositoryReleaseResponse();
    message.Release = (object.Release !== undefined && object.Release !== null)
      ? Release.fromPartial(object.Release)
      : undefined;
    return message;
  },
};

function createBaseQueryGetRepositoryReleaseRequest(): QueryGetRepositoryReleaseRequest {
  return { id: "", repositoryName: "", tagName: "" };
}

export const QueryGetRepositoryReleaseRequest = {
  encode(message: QueryGetRepositoryReleaseRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetRepositoryReleaseRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetRepositoryReleaseRequest();
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
    return {
      id: isSet(object.id) ? String(object.id) : "",
      repositoryName: isSet(object.repositoryName) ? String(object.repositoryName) : "",
      tagName: isSet(object.tagName) ? String(object.tagName) : "",
    };
  },

  toJSON(message: QueryGetRepositoryReleaseRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.repositoryName !== undefined && (obj.repositoryName = message.repositoryName);
    message.tagName !== undefined && (obj.tagName = message.tagName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetRepositoryReleaseRequest>, I>>(
    object: I,
  ): QueryGetRepositoryReleaseRequest {
    const message = createBaseQueryGetRepositoryReleaseRequest();
    message.id = object.id ?? "";
    message.repositoryName = object.repositoryName ?? "";
    message.tagName = object.tagName ?? "";
    return message;
  },
};

function createBaseQueryGetRepositoryReleaseResponse(): QueryGetRepositoryReleaseResponse {
  return { Release: undefined };
}

export const QueryGetRepositoryReleaseResponse = {
  encode(message: QueryGetRepositoryReleaseResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Release !== undefined) {
      Release.encode(message.Release, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetRepositoryReleaseResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetRepositoryReleaseResponse();
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
    return { Release: isSet(object.Release) ? Release.fromJSON(object.Release) : undefined };
  },

  toJSON(message: QueryGetRepositoryReleaseResponse): unknown {
    const obj: any = {};
    message.Release !== undefined && (obj.Release = message.Release ? Release.toJSON(message.Release) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetRepositoryReleaseResponse>, I>>(
    object: I,
  ): QueryGetRepositoryReleaseResponse {
    const message = createBaseQueryGetRepositoryReleaseResponse();
    message.Release = (object.Release !== undefined && object.Release !== null)
      ? Release.fromPartial(object.Release)
      : undefined;
    return message;
  },
};

function createBaseQueryAllRepositoryReleaseRequest(): QueryAllRepositoryReleaseRequest {
  return { id: "", repositoryName: "", pagination: undefined };
}

export const QueryAllRepositoryReleaseRequest = {
  encode(message: QueryAllRepositoryReleaseRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllRepositoryReleaseRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllRepositoryReleaseRequest();
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
    return {
      id: isSet(object.id) ? String(object.id) : "",
      repositoryName: isSet(object.repositoryName) ? String(object.repositoryName) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllRepositoryReleaseRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.repositoryName !== undefined && (obj.repositoryName = message.repositoryName);
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllRepositoryReleaseRequest>, I>>(
    object: I,
  ): QueryAllRepositoryReleaseRequest {
    const message = createBaseQueryAllRepositoryReleaseRequest();
    message.id = object.id ?? "";
    message.repositoryName = object.repositoryName ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllRepositoryReleaseResponse(): QueryAllRepositoryReleaseResponse {
  return { Release: [], pagination: undefined };
}

export const QueryAllRepositoryReleaseResponse = {
  encode(message: QueryAllRepositoryReleaseResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Release) {
      Release.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllRepositoryReleaseResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllRepositoryReleaseResponse();
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
    return {
      Release: Array.isArray(object?.Release) ? object.Release.map((e: any) => Release.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllRepositoryReleaseResponse): unknown {
    const obj: any = {};
    if (message.Release) {
      obj.Release = message.Release.map((e) => e ? Release.toJSON(e) : undefined);
    } else {
      obj.Release = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllRepositoryReleaseResponse>, I>>(
    object: I,
  ): QueryAllRepositoryReleaseResponse {
    const message = createBaseQueryAllRepositoryReleaseResponse();
    message.Release = object.Release?.map((e) => Release.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetRepositoryIssueRequest(): QueryGetRepositoryIssueRequest {
  return { id: "", repositoryName: "", issueIid: 0 };
}

export const QueryGetRepositoryIssueRequest = {
  encode(message: QueryGetRepositoryIssueRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetRepositoryIssueRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetRepositoryIssueRequest();
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
    return {
      id: isSet(object.id) ? String(object.id) : "",
      repositoryName: isSet(object.repositoryName) ? String(object.repositoryName) : "",
      issueIid: isSet(object.issueIid) ? Number(object.issueIid) : 0,
    };
  },

  toJSON(message: QueryGetRepositoryIssueRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.repositoryName !== undefined && (obj.repositoryName = message.repositoryName);
    message.issueIid !== undefined && (obj.issueIid = Math.round(message.issueIid));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetRepositoryIssueRequest>, I>>(
    object: I,
  ): QueryGetRepositoryIssueRequest {
    const message = createBaseQueryGetRepositoryIssueRequest();
    message.id = object.id ?? "";
    message.repositoryName = object.repositoryName ?? "";
    message.issueIid = object.issueIid ?? 0;
    return message;
  },
};

function createBaseQueryGetRepositoryIssueResponse(): QueryGetRepositoryIssueResponse {
  return { Issue: undefined };
}

export const QueryGetRepositoryIssueResponse = {
  encode(message: QueryGetRepositoryIssueResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Issue !== undefined) {
      Issue.encode(message.Issue, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetRepositoryIssueResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetRepositoryIssueResponse();
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
    return { Issue: isSet(object.Issue) ? Issue.fromJSON(object.Issue) : undefined };
  },

  toJSON(message: QueryGetRepositoryIssueResponse): unknown {
    const obj: any = {};
    message.Issue !== undefined && (obj.Issue = message.Issue ? Issue.toJSON(message.Issue) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetRepositoryIssueResponse>, I>>(
    object: I,
  ): QueryGetRepositoryIssueResponse {
    const message = createBaseQueryGetRepositoryIssueResponse();
    message.Issue = (object.Issue !== undefined && object.Issue !== null) ? Issue.fromPartial(object.Issue) : undefined;
    return message;
  },
};

function createBaseQueryGetRepositoryPullRequestRequest(): QueryGetRepositoryPullRequestRequest {
  return { id: "", repositoryName: "", pullIid: 0 };
}

export const QueryGetRepositoryPullRequestRequest = {
  encode(message: QueryGetRepositoryPullRequestRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetRepositoryPullRequestRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetRepositoryPullRequestRequest();
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
    return {
      id: isSet(object.id) ? String(object.id) : "",
      repositoryName: isSet(object.repositoryName) ? String(object.repositoryName) : "",
      pullIid: isSet(object.pullIid) ? Number(object.pullIid) : 0,
    };
  },

  toJSON(message: QueryGetRepositoryPullRequestRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.repositoryName !== undefined && (obj.repositoryName = message.repositoryName);
    message.pullIid !== undefined && (obj.pullIid = Math.round(message.pullIid));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetRepositoryPullRequestRequest>, I>>(
    object: I,
  ): QueryGetRepositoryPullRequestRequest {
    const message = createBaseQueryGetRepositoryPullRequestRequest();
    message.id = object.id ?? "";
    message.repositoryName = object.repositoryName ?? "";
    message.pullIid = object.pullIid ?? 0;
    return message;
  },
};

function createBaseQueryGetRepositoryPullRequestResponse(): QueryGetRepositoryPullRequestResponse {
  return { PullRequest: undefined };
}

export const QueryGetRepositoryPullRequestResponse = {
  encode(message: QueryGetRepositoryPullRequestResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.PullRequest !== undefined) {
      PullRequest.encode(message.PullRequest, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetRepositoryPullRequestResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetRepositoryPullRequestResponse();
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
    return { PullRequest: isSet(object.PullRequest) ? PullRequest.fromJSON(object.PullRequest) : undefined };
  },

  toJSON(message: QueryGetRepositoryPullRequestResponse): unknown {
    const obj: any = {};
    message.PullRequest !== undefined
      && (obj.PullRequest = message.PullRequest ? PullRequest.toJSON(message.PullRequest) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetRepositoryPullRequestResponse>, I>>(
    object: I,
  ): QueryGetRepositoryPullRequestResponse {
    const message = createBaseQueryGetRepositoryPullRequestResponse();
    message.PullRequest = (object.PullRequest !== undefined && object.PullRequest !== null)
      ? PullRequest.fromPartial(object.PullRequest)
      : undefined;
    return message;
  },
};

function createBaseQueryAllRepositoryIssueRequest(): QueryAllRepositoryIssueRequest {
  return { id: "", repositoryName: "", option: undefined, pagination: undefined };
}

export const QueryAllRepositoryIssueRequest = {
  encode(message: QueryAllRepositoryIssueRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllRepositoryIssueRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllRepositoryIssueRequest();
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
    return {
      id: isSet(object.id) ? String(object.id) : "",
      repositoryName: isSet(object.repositoryName) ? String(object.repositoryName) : "",
      option: isSet(object.option) ? IssueOptions.fromJSON(object.option) : undefined,
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllRepositoryIssueRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.repositoryName !== undefined && (obj.repositoryName = message.repositoryName);
    message.option !== undefined && (obj.option = message.option ? IssueOptions.toJSON(message.option) : undefined);
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllRepositoryIssueRequest>, I>>(
    object: I,
  ): QueryAllRepositoryIssueRequest {
    const message = createBaseQueryAllRepositoryIssueRequest();
    message.id = object.id ?? "";
    message.repositoryName = object.repositoryName ?? "";
    message.option = (object.option !== undefined && object.option !== null)
      ? IssueOptions.fromPartial(object.option)
      : undefined;
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseIssueOptions(): IssueOptions {
  return {
    createdBy: "",
    state: "",
    labels: "",
    assignee: "",
    labelIds: [],
    sort: "",
    search: "",
    updatedAfter: 0,
    updatedBefore: 0,
  };
}

export const IssueOptions = {
  encode(message: IssueOptions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): IssueOptions {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIssueOptions();
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
    return {
      createdBy: isSet(object.createdBy) ? String(object.createdBy) : "",
      state: isSet(object.state) ? String(object.state) : "",
      labels: isSet(object.labels) ? String(object.labels) : "",
      assignee: isSet(object.assignee) ? String(object.assignee) : "",
      labelIds: Array.isArray(object?.labelIds) ? object.labelIds.map((e: any) => Number(e)) : [],
      sort: isSet(object.sort) ? String(object.sort) : "",
      search: isSet(object.search) ? String(object.search) : "",
      updatedAfter: isSet(object.updatedAfter) ? Number(object.updatedAfter) : 0,
      updatedBefore: isSet(object.updatedBefore) ? Number(object.updatedBefore) : 0,
    };
  },

  toJSON(message: IssueOptions): unknown {
    const obj: any = {};
    message.createdBy !== undefined && (obj.createdBy = message.createdBy);
    message.state !== undefined && (obj.state = message.state);
    message.labels !== undefined && (obj.labels = message.labels);
    message.assignee !== undefined && (obj.assignee = message.assignee);
    if (message.labelIds) {
      obj.labelIds = message.labelIds.map((e) => Math.round(e));
    } else {
      obj.labelIds = [];
    }
    message.sort !== undefined && (obj.sort = message.sort);
    message.search !== undefined && (obj.search = message.search);
    message.updatedAfter !== undefined && (obj.updatedAfter = Math.round(message.updatedAfter));
    message.updatedBefore !== undefined && (obj.updatedBefore = Math.round(message.updatedBefore));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<IssueOptions>, I>>(object: I): IssueOptions {
    const message = createBaseIssueOptions();
    message.createdBy = object.createdBy ?? "";
    message.state = object.state ?? "";
    message.labels = object.labels ?? "";
    message.assignee = object.assignee ?? "";
    message.labelIds = object.labelIds?.map((e) => e) || [];
    message.sort = object.sort ?? "";
    message.search = object.search ?? "";
    message.updatedAfter = object.updatedAfter ?? 0;
    message.updatedBefore = object.updatedBefore ?? 0;
    return message;
  },
};

function createBaseQueryAllRepositoryIssueResponse(): QueryAllRepositoryIssueResponse {
  return { Issue: [], pagination: undefined };
}

export const QueryAllRepositoryIssueResponse = {
  encode(message: QueryAllRepositoryIssueResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Issue) {
      Issue.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllRepositoryIssueResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllRepositoryIssueResponse();
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
    return {
      Issue: Array.isArray(object?.Issue) ? object.Issue.map((e: any) => Issue.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllRepositoryIssueResponse): unknown {
    const obj: any = {};
    if (message.Issue) {
      obj.Issue = message.Issue.map((e) => e ? Issue.toJSON(e) : undefined);
    } else {
      obj.Issue = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllRepositoryIssueResponse>, I>>(
    object: I,
  ): QueryAllRepositoryIssueResponse {
    const message = createBaseQueryAllRepositoryIssueResponse();
    message.Issue = object.Issue?.map((e) => Issue.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllRepositoryPullRequestRequest(): QueryAllRepositoryPullRequestRequest {
  return { id: "", repositoryName: "", option: undefined, pagination: undefined };
}

export const QueryAllRepositoryPullRequestRequest = {
  encode(message: QueryAllRepositoryPullRequestRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.repositoryName !== "") {
      writer.uint32(18).string(message.repositoryName);
    }
    if (message.option !== undefined) {
      PullRequestOptions.encode(message.option, writer.uint32(26).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllRepositoryPullRequestRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllRepositoryPullRequestRequest();
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
    return {
      id: isSet(object.id) ? String(object.id) : "",
      repositoryName: isSet(object.repositoryName) ? String(object.repositoryName) : "",
      option: isSet(object.option) ? PullRequestOptions.fromJSON(object.option) : undefined,
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllRepositoryPullRequestRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.repositoryName !== undefined && (obj.repositoryName = message.repositoryName);
    message.option !== undefined
      && (obj.option = message.option ? PullRequestOptions.toJSON(message.option) : undefined);
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllRepositoryPullRequestRequest>, I>>(
    object: I,
  ): QueryAllRepositoryPullRequestRequest {
    const message = createBaseQueryAllRepositoryPullRequestRequest();
    message.id = object.id ?? "";
    message.repositoryName = object.repositoryName ?? "";
    message.option = (object.option !== undefined && object.option !== null)
      ? PullRequestOptions.fromPartial(object.option)
      : undefined;
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBasePullRequestOptions(): PullRequestOptions {
  return {
    createdBy: "",
    state: "",
    labels: "",
    assignee: "",
    reviewer: "",
    labelIds: [],
    sort: "",
    search: "",
    updatedAfter: 0,
    updatedBefore: 0,
  };
}

export const PullRequestOptions = {
  encode(message: PullRequestOptions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): PullRequestOptions {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePullRequestOptions();
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
    return {
      createdBy: isSet(object.createdBy) ? String(object.createdBy) : "",
      state: isSet(object.state) ? String(object.state) : "",
      labels: isSet(object.labels) ? String(object.labels) : "",
      assignee: isSet(object.assignee) ? String(object.assignee) : "",
      reviewer: isSet(object.reviewer) ? String(object.reviewer) : "",
      labelIds: Array.isArray(object?.labelIds) ? object.labelIds.map((e: any) => Number(e)) : [],
      sort: isSet(object.sort) ? String(object.sort) : "",
      search: isSet(object.search) ? String(object.search) : "",
      updatedAfter: isSet(object.updatedAfter) ? Number(object.updatedAfter) : 0,
      updatedBefore: isSet(object.updatedBefore) ? Number(object.updatedBefore) : 0,
    };
  },

  toJSON(message: PullRequestOptions): unknown {
    const obj: any = {};
    message.createdBy !== undefined && (obj.createdBy = message.createdBy);
    message.state !== undefined && (obj.state = message.state);
    message.labels !== undefined && (obj.labels = message.labels);
    message.assignee !== undefined && (obj.assignee = message.assignee);
    message.reviewer !== undefined && (obj.reviewer = message.reviewer);
    if (message.labelIds) {
      obj.labelIds = message.labelIds.map((e) => Math.round(e));
    } else {
      obj.labelIds = [];
    }
    message.sort !== undefined && (obj.sort = message.sort);
    message.search !== undefined && (obj.search = message.search);
    message.updatedAfter !== undefined && (obj.updatedAfter = Math.round(message.updatedAfter));
    message.updatedBefore !== undefined && (obj.updatedBefore = Math.round(message.updatedBefore));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PullRequestOptions>, I>>(object: I): PullRequestOptions {
    const message = createBasePullRequestOptions();
    message.createdBy = object.createdBy ?? "";
    message.state = object.state ?? "";
    message.labels = object.labels ?? "";
    message.assignee = object.assignee ?? "";
    message.reviewer = object.reviewer ?? "";
    message.labelIds = object.labelIds?.map((e) => e) || [];
    message.sort = object.sort ?? "";
    message.search = object.search ?? "";
    message.updatedAfter = object.updatedAfter ?? 0;
    message.updatedBefore = object.updatedBefore ?? 0;
    return message;
  },
};

function createBaseQueryAllRepositoryPullRequestResponse(): QueryAllRepositoryPullRequestResponse {
  return { PullRequest: [], pagination: undefined };
}

export const QueryAllRepositoryPullRequestResponse = {
  encode(message: QueryAllRepositoryPullRequestResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.PullRequest) {
      PullRequest.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllRepositoryPullRequestResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllRepositoryPullRequestResponse();
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
    return {
      PullRequest: Array.isArray(object?.PullRequest)
        ? object.PullRequest.map((e: any) => PullRequest.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllRepositoryPullRequestResponse): unknown {
    const obj: any = {};
    if (message.PullRequest) {
      obj.PullRequest = message.PullRequest.map((e) => e ? PullRequest.toJSON(e) : undefined);
    } else {
      obj.PullRequest = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllRepositoryPullRequestResponse>, I>>(
    object: I,
  ): QueryAllRepositoryPullRequestResponse {
    const message = createBaseQueryAllRepositoryPullRequestResponse();
    message.PullRequest = object.PullRequest?.map((e) => PullRequest.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetRepositoryRequest(): QueryGetRepositoryRequest {
  return { id: 0 };
}

export const QueryGetRepositoryRequest = {
  encode(message: QueryGetRepositoryRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetRepositoryRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetRepositoryRequest();
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
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: QueryGetRepositoryRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetRepositoryRequest>, I>>(object: I): QueryGetRepositoryRequest {
    const message = createBaseQueryGetRepositoryRequest();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseQueryGetRepositoryResponse(): QueryGetRepositoryResponse {
  return { Repository: undefined };
}

export const QueryGetRepositoryResponse = {
  encode(message: QueryGetRepositoryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Repository !== undefined) {
      Repository.encode(message.Repository, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetRepositoryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetRepositoryResponse();
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
    return { Repository: isSet(object.Repository) ? Repository.fromJSON(object.Repository) : undefined };
  },

  toJSON(message: QueryGetRepositoryResponse): unknown {
    const obj: any = {};
    message.Repository !== undefined
      && (obj.Repository = message.Repository ? Repository.toJSON(message.Repository) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetRepositoryResponse>, I>>(object: I): QueryGetRepositoryResponse {
    const message = createBaseQueryGetRepositoryResponse();
    message.Repository = (object.Repository !== undefined && object.Repository !== null)
      ? Repository.fromPartial(object.Repository)
      : undefined;
    return message;
  },
};

function createBaseRepositoryFork(): RepositoryFork {
  return {
    creator: "",
    id: 0,
    name: "",
    owner: undefined,
    description: "",
    parent: 0,
    forksCount: 0,
    issuesCount: 0,
    pullsCount: 0,
  };
}

export const RepositoryFork = {
  encode(message: RepositoryFork, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): RepositoryFork {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRepositoryFork();
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
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
      name: isSet(object.name) ? String(object.name) : "",
      owner: isSet(object.owner) ? RepositoryOwner.fromJSON(object.owner) : undefined,
      description: isSet(object.description) ? String(object.description) : "",
      parent: isSet(object.parent) ? Number(object.parent) : 0,
      forksCount: isSet(object.forksCount) ? Number(object.forksCount) : 0,
      issuesCount: isSet(object.issuesCount) ? Number(object.issuesCount) : 0,
      pullsCount: isSet(object.pullsCount) ? Number(object.pullsCount) : 0,
    };
  },

  toJSON(message: RepositoryFork): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.name !== undefined && (obj.name = message.name);
    message.owner !== undefined && (obj.owner = message.owner ? RepositoryOwner.toJSON(message.owner) : undefined);
    message.description !== undefined && (obj.description = message.description);
    message.parent !== undefined && (obj.parent = Math.round(message.parent));
    message.forksCount !== undefined && (obj.forksCount = Math.round(message.forksCount));
    message.issuesCount !== undefined && (obj.issuesCount = Math.round(message.issuesCount));
    message.pullsCount !== undefined && (obj.pullsCount = Math.round(message.pullsCount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RepositoryFork>, I>>(object: I): RepositoryFork {
    const message = createBaseRepositoryFork();
    message.creator = object.creator ?? "";
    message.id = object.id ?? 0;
    message.name = object.name ?? "";
    message.owner = (object.owner !== undefined && object.owner !== null)
      ? RepositoryOwner.fromPartial(object.owner)
      : undefined;
    message.description = object.description ?? "";
    message.parent = object.parent ?? 0;
    message.forksCount = object.forksCount ?? 0;
    message.issuesCount = object.issuesCount ?? 0;
    message.pullsCount = object.pullsCount ?? 0;
    return message;
  },
};

function createBaseQueryGetAllForkRequest(): QueryGetAllForkRequest {
  return { id: "", repositoryName: "", pagination: undefined };
}

export const QueryGetAllForkRequest = {
  encode(message: QueryGetAllForkRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetAllForkRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetAllForkRequest();
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
    return {
      id: isSet(object.id) ? String(object.id) : "",
      repositoryName: isSet(object.repositoryName) ? String(object.repositoryName) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryGetAllForkRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.repositoryName !== undefined && (obj.repositoryName = message.repositoryName);
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetAllForkRequest>, I>>(object: I): QueryGetAllForkRequest {
    const message = createBaseQueryGetAllForkRequest();
    message.id = object.id ?? "";
    message.repositoryName = object.repositoryName ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetAllForkResponse(): QueryGetAllForkResponse {
  return { forks: [], pagination: undefined };
}

export const QueryGetAllForkResponse = {
  encode(message: QueryGetAllForkResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.forks) {
      RepositoryFork.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetAllForkResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetAllForkResponse();
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
    return {
      forks: Array.isArray(object?.forks) ? object.forks.map((e: any) => RepositoryFork.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryGetAllForkResponse): unknown {
    const obj: any = {};
    if (message.forks) {
      obj.forks = message.forks.map((e) => e ? RepositoryFork.toJSON(e) : undefined);
    } else {
      obj.forks = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetAllForkResponse>, I>>(object: I): QueryGetAllForkResponse {
    const message = createBaseQueryGetAllForkResponse();
    message.forks = object.forks?.map((e) => RepositoryFork.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllRepositoryRequest(): QueryAllRepositoryRequest {
  return { pagination: undefined };
}

export const QueryAllRepositoryRequest = {
  encode(message: QueryAllRepositoryRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllRepositoryRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllRepositoryRequest();
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
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllRepositoryRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllRepositoryRequest>, I>>(object: I): QueryAllRepositoryRequest {
    const message = createBaseQueryAllRepositoryRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllRepositoryResponse(): QueryAllRepositoryResponse {
  return { Repository: [], pagination: undefined };
}

export const QueryAllRepositoryResponse = {
  encode(message: QueryAllRepositoryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Repository) {
      Repository.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllRepositoryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllRepositoryResponse();
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
    return {
      Repository: Array.isArray(object?.Repository) ? object.Repository.map((e: any) => Repository.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllRepositoryResponse): unknown {
    const obj: any = {};
    if (message.Repository) {
      obj.Repository = message.Repository.map((e) => e ? Repository.toJSON(e) : undefined);
    } else {
      obj.Repository = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllRepositoryResponse>, I>>(object: I): QueryAllRepositoryResponse {
    const message = createBaseQueryAllRepositoryResponse();
    message.Repository = object.Repository?.map((e) => Repository.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetUserRequest(): QueryGetUserRequest {
  return { id: "" };
}

export const QueryGetUserRequest = {
  encode(message: QueryGetUserRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetUserRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetUserRequest();
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
    return { id: isSet(object.id) ? String(object.id) : "" };
  },

  toJSON(message: QueryGetUserRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetUserRequest>, I>>(object: I): QueryGetUserRequest {
    const message = createBaseQueryGetUserRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseQueryGetUserResponse(): QueryGetUserResponse {
  return { User: undefined };
}

export const QueryGetUserResponse = {
  encode(message: QueryGetUserResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.User !== undefined) {
      User.encode(message.User, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetUserResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetUserResponse();
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
    return { User: isSet(object.User) ? User.fromJSON(object.User) : undefined };
  },

  toJSON(message: QueryGetUserResponse): unknown {
    const obj: any = {};
    message.User !== undefined && (obj.User = message.User ? User.toJSON(message.User) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetUserResponse>, I>>(object: I): QueryGetUserResponse {
    const message = createBaseQueryGetUserResponse();
    message.User = (object.User !== undefined && object.User !== null) ? User.fromPartial(object.User) : undefined;
    return message;
  },
};

function createBaseQueryAllUserDaoRequest(): QueryAllUserDaoRequest {
  return { userId: "", pagination: undefined };
}

export const QueryAllUserDaoRequest = {
  encode(message: QueryAllUserDaoRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllUserDaoRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllUserDaoRequest();
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
    return {
      userId: isSet(object.userId) ? String(object.userId) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllUserDaoRequest): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = message.userId);
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllUserDaoRequest>, I>>(object: I): QueryAllUserDaoRequest {
    const message = createBaseQueryAllUserDaoRequest();
    message.userId = object.userId ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllUserDaoResponse(): QueryAllUserDaoResponse {
  return { dao: [], pagination: undefined };
}

export const QueryAllUserDaoResponse = {
  encode(message: QueryAllUserDaoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.dao) {
      Dao.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllUserDaoResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllUserDaoResponse();
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
    return {
      dao: Array.isArray(object?.dao) ? object.dao.map((e: any) => Dao.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllUserDaoResponse): unknown {
    const obj: any = {};
    if (message.dao) {
      obj.dao = message.dao.map((e) => e ? Dao.toJSON(e) : undefined);
    } else {
      obj.dao = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllUserDaoResponse>, I>>(object: I): QueryAllUserDaoResponse {
    const message = createBaseQueryAllUserDaoResponse();
    message.dao = object.dao?.map((e) => Dao.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllUserRequest(): QueryAllUserRequest {
  return { pagination: undefined };
}

export const QueryAllUserRequest = {
  encode(message: QueryAllUserRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllUserRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllUserRequest();
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
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllUserRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllUserRequest>, I>>(object: I): QueryAllUserRequest {
    const message = createBaseQueryAllUserRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllUserResponse(): QueryAllUserResponse {
  return { User: [], pagination: undefined };
}

export const QueryAllUserResponse = {
  encode(message: QueryAllUserResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.User) {
      User.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllUserResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllUserResponse();
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
    return {
      User: Array.isArray(object?.User) ? object.User.map((e: any) => User.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllUserResponse): unknown {
    const obj: any = {};
    if (message.User) {
      obj.User = message.User.map((e) => e ? User.toJSON(e) : undefined);
    } else {
      obj.User = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllUserResponse>, I>>(object: I): QueryAllUserResponse {
    const message = createBaseQueryAllUserResponse();
    message.User = object.User?.map((e) => User.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllAnyRepositoryRequest(): QueryAllAnyRepositoryRequest {
  return { id: "", pagination: undefined };
}

export const QueryAllAnyRepositoryRequest = {
  encode(message: QueryAllAnyRepositoryRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllAnyRepositoryRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllAnyRepositoryRequest();
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
    return {
      id: isSet(object.id) ? String(object.id) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllAnyRepositoryRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllAnyRepositoryRequest>, I>>(object: I): QueryAllAnyRepositoryRequest {
    const message = createBaseQueryAllAnyRepositoryRequest();
    message.id = object.id ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllAnyRepositoryResponse(): QueryAllAnyRepositoryResponse {
  return { Repository: [], pagination: undefined };
}

export const QueryAllAnyRepositoryResponse = {
  encode(message: QueryAllAnyRepositoryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Repository) {
      Repository.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllAnyRepositoryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllAnyRepositoryResponse();
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
    return {
      Repository: Array.isArray(object?.Repository) ? object.Repository.map((e: any) => Repository.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllAnyRepositoryResponse): unknown {
    const obj: any = {};
    if (message.Repository) {
      obj.Repository = message.Repository.map((e) => e ? Repository.toJSON(e) : undefined);
    } else {
      obj.Repository = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllAnyRepositoryResponse>, I>>(
    object: I,
  ): QueryAllAnyRepositoryResponse {
    const message = createBaseQueryAllAnyRepositoryResponse();
    message.Repository = object.Repository?.map((e) => Repository.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetAnyRepositoryRequest(): QueryGetAnyRepositoryRequest {
  return { id: "", repositoryName: "" };
}

export const QueryGetAnyRepositoryRequest = {
  encode(message: QueryGetAnyRepositoryRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.repositoryName !== "") {
      writer.uint32(18).string(message.repositoryName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetAnyRepositoryRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetAnyRepositoryRequest();
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
    return {
      id: isSet(object.id) ? String(object.id) : "",
      repositoryName: isSet(object.repositoryName) ? String(object.repositoryName) : "",
    };
  },

  toJSON(message: QueryGetAnyRepositoryRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.repositoryName !== undefined && (obj.repositoryName = message.repositoryName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetAnyRepositoryRequest>, I>>(object: I): QueryGetAnyRepositoryRequest {
    const message = createBaseQueryGetAnyRepositoryRequest();
    message.id = object.id ?? "";
    message.repositoryName = object.repositoryName ?? "";
    return message;
  },
};

function createBaseQueryGetAnyRepositoryResponse(): QueryGetAnyRepositoryResponse {
  return { Repository: undefined };
}

export const QueryGetAnyRepositoryResponse = {
  encode(message: QueryGetAnyRepositoryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Repository !== undefined) {
      Repository.encode(message.Repository, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetAnyRepositoryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetAnyRepositoryResponse();
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
    return { Repository: isSet(object.Repository) ? Repository.fromJSON(object.Repository) : undefined };
  },

  toJSON(message: QueryGetAnyRepositoryResponse): unknown {
    const obj: any = {};
    message.Repository !== undefined
      && (obj.Repository = message.Repository ? Repository.toJSON(message.Repository) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetAnyRepositoryResponse>, I>>(
    object: I,
  ): QueryGetAnyRepositoryResponse {
    const message = createBaseQueryGetAnyRepositoryResponse();
    message.Repository = (object.Repository !== undefined && object.Repository !== null)
      ? Repository.fromPartial(object.Repository)
      : undefined;
    return message;
  },
};

function createBaseQueryGetWhoisRequest(): QueryGetWhoisRequest {
  return { name: "" };
}

export const QueryGetWhoisRequest = {
  encode(message: QueryGetWhoisRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetWhoisRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetWhoisRequest();
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
    return { name: isSet(object.name) ? String(object.name) : "" };
  },

  toJSON(message: QueryGetWhoisRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetWhoisRequest>, I>>(object: I): QueryGetWhoisRequest {
    const message = createBaseQueryGetWhoisRequest();
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseQueryGetWhoisResponse(): QueryGetWhoisResponse {
  return { Whois: undefined };
}

export const QueryGetWhoisResponse = {
  encode(message: QueryGetWhoisResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Whois !== undefined) {
      Whois.encode(message.Whois, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetWhoisResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetWhoisResponse();
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
    return { Whois: isSet(object.Whois) ? Whois.fromJSON(object.Whois) : undefined };
  },

  toJSON(message: QueryGetWhoisResponse): unknown {
    const obj: any = {};
    message.Whois !== undefined && (obj.Whois = message.Whois ? Whois.toJSON(message.Whois) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetWhoisResponse>, I>>(object: I): QueryGetWhoisResponse {
    const message = createBaseQueryGetWhoisResponse();
    message.Whois = (object.Whois !== undefined && object.Whois !== null) ? Whois.fromPartial(object.Whois) : undefined;
    return message;
  },
};

function createBaseQueryAllWhoisRequest(): QueryAllWhoisRequest {
  return { pagination: undefined };
}

export const QueryAllWhoisRequest = {
  encode(message: QueryAllWhoisRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllWhoisRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllWhoisRequest();
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
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllWhoisRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllWhoisRequest>, I>>(object: I): QueryAllWhoisRequest {
    const message = createBaseQueryAllWhoisRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllWhoisResponse(): QueryAllWhoisResponse {
  return { Whois: [], pagination: undefined };
}

export const QueryAllWhoisResponse = {
  encode(message: QueryAllWhoisResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Whois) {
      Whois.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllWhoisResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllWhoisResponse();
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
    return {
      Whois: Array.isArray(object?.Whois) ? object.Whois.map((e: any) => Whois.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllWhoisResponse): unknown {
    const obj: any = {};
    if (message.Whois) {
      obj.Whois = message.Whois.map((e) => e ? Whois.toJSON(e) : undefined);
    } else {
      obj.Whois = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllWhoisResponse>, I>>(object: I): QueryAllWhoisResponse {
    const message = createBaseQueryAllWhoisResponse();
    message.Whois = object.Whois?.map((e) => Whois.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Params returns the total set of gitopia parameters. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** query vested amount for developer address */
  VestedAmount(request: QueryVestedAmountRequest): Promise<QueryVestedAmountResponse>;
  /** Queries a Task by id. */
  Task(request: QueryGetTaskRequest): Promise<QueryGetTaskResponse>;
  /** Queries a list of Task items. */
  TaskAll(request: QueryAllTaskRequest): Promise<QueryAllTaskResponse>;
  /** Queries a list of Branch items. */
  BranchAll(request: QueryAllBranchRequest): Promise<QueryAllBranchResponse>;
  /** Queries Repository Branch by name. */
  RepositoryBranch(request: QueryGetRepositoryBranchRequest): Promise<QueryGetRepositoryBranchResponse>;
  RepositoryBranchSha(request: QueryGetRepositoryBranchShaRequest): Promise<QueryGetRepositoryBranchShaResponse>;
  /** Queries a list of Repository Branch. */
  RepositoryBranchAll(request: QueryAllRepositoryBranchRequest): Promise<QueryAllRepositoryBranchResponse>;
  /** Queries a list of Tag items. */
  TagAll(request: QueryAllTagRequest): Promise<QueryAllTagResponse>;
  /** Queries a Repository Tag by id. */
  RepositoryTag(request: QueryGetRepositoryTagRequest): Promise<QueryGetRepositoryTagResponse>;
  RepositoryTagSha(request: QueryGetRepositoryTagShaRequest): Promise<QueryGetRepositoryTagShaResponse>;
  /** Queries a list of Repository Tag. */
  RepositoryTagAll(request: QueryAllRepositoryTagRequest): Promise<QueryAllRepositoryTagResponse>;
  /** Queries a Member by id. */
  DaoMember(request: QueryGetDaoMemberRequest): Promise<QueryGetDaoMemberResponse>;
  /** Queries a list of Dao Member. */
  DaoMemberAll(request: QueryAllDaoMemberRequest): Promise<QueryAllDaoMemberResponse>;
  /** Queries a list of Member items. */
  MemberAll(request: QueryAllMemberRequest): Promise<QueryAllMemberResponse>;
  /** Queries a Bounty by id. */
  Bounty(request: QueryGetBountyRequest): Promise<QueryGetBountyResponse>;
  /** Queries a list of Bounty items. */
  BountyAll(request: QueryAllBountyRequest): Promise<QueryAllBountyResponse>;
  /** Queries a release by id. */
  Release(request: QueryGetReleaseRequest): Promise<QueryGetReleaseResponse>;
  /** Queries a list of release items. */
  ReleaseAll(request: QueryAllReleaseRequest): Promise<QueryAllReleaseResponse>;
  /** Queries a list of pullRequest items. */
  PullRequestAll(request: QueryAllPullRequestRequest): Promise<QueryAllPullRequestResponse>;
  /** Queries a Dao by id. */
  Dao(request: QueryGetDaoRequest): Promise<QueryGetDaoResponse>;
  /** Queries a list of Dao items. */
  DaoAll(request: QueryAllDaoRequest): Promise<QueryAllDaoResponse>;
  /** Queries a issue comment. */
  IssueComment(request: QueryGetIssueCommentRequest): Promise<QueryGetIssueCommentResponse>;
  /** Queries a pullrequest comment. */
  PullRequestComment(request: QueryGetPullRequestCommentRequest): Promise<QueryGetPullRequestCommentResponse>;
  /** Queries a list of comment. */
  CommentAll(request: QueryAllCommentRequest): Promise<QueryAllCommentResponse>;
  /** Queries a list of issue comment. */
  IssueCommentAll(request: QueryAllIssueCommentRequest): Promise<QueryAllIssueCommentResponse>;
  /** Queries a list of pullrequest comment. */
  PullRequestCommentAll(request: QueryAllPullRequestCommentRequest): Promise<QueryAllPullRequestCommentResponse>;
  /** Queries a list of issue items. */
  IssueAll(request: QueryAllIssueRequest): Promise<QueryAllIssueResponse>;
  RepositoryReleaseLatest(
    request: QueryGetLatestRepositoryReleaseRequest,
  ): Promise<QueryGetLatestRepositoryReleaseResponse>;
  RepositoryRelease(request: QueryGetRepositoryReleaseRequest): Promise<QueryGetRepositoryReleaseResponse>;
  RepositoryReleaseAll(request: QueryAllRepositoryReleaseRequest): Promise<QueryAllRepositoryReleaseResponse>;
  /** Queries a repository issue by iid. */
  RepositoryIssue(request: QueryGetRepositoryIssueRequest): Promise<QueryGetRepositoryIssueResponse>;
  /** Queries a list of repository issue. */
  RepositoryIssueAll(request: QueryAllRepositoryIssueRequest): Promise<QueryAllRepositoryIssueResponse>;
  /** Queries a repository pullRequest. */
  RepositoryPullRequest(request: QueryGetRepositoryPullRequestRequest): Promise<QueryGetRepositoryPullRequestResponse>;
  /** Queries a list of repository pullRequest. */
  RepositoryPullRequestAll(
    request: QueryAllRepositoryPullRequestRequest,
  ): Promise<QueryAllRepositoryPullRequestResponse>;
  /** Queries a repository by id. */
  Repository(request: QueryGetRepositoryRequest): Promise<QueryGetRepositoryResponse>;
  /** Queries a list of repository items. */
  RepositoryAll(request: QueryAllRepositoryRequest): Promise<QueryAllRepositoryResponse>;
  /** Queries a repository forks by id. */
  ForkAll(request: QueryGetAllForkRequest): Promise<QueryGetAllForkResponse>;
  /** Queries a user by id. */
  User(request: QueryGetUserRequest): Promise<QueryGetUserResponse>;
  /** Queries a list of User Dao. */
  UserDaoAll(request: QueryAllUserDaoRequest): Promise<QueryAllUserDaoResponse>;
  /** Queries a list of user items. */
  UserAll(request: QueryAllUserRequest): Promise<QueryAllUserResponse>;
  /** Queries a list of user repositories. */
  AnyRepositoryAll(request: QueryAllAnyRepositoryRequest): Promise<QueryAllAnyRepositoryResponse>;
  /** Queries a repository by user id and repository name */
  AnyRepository(request: QueryGetAnyRepositoryRequest): Promise<QueryGetAnyRepositoryResponse>;
  /** Queries a whois by id. */
  Whois(request: QueryGetWhoisRequest): Promise<QueryGetWhoisResponse>;
  /** Queries a list of whois items. */
  WhoisAll(request: QueryAllWhoisRequest): Promise<QueryAllWhoisResponse>;
  PullRequestMergePermission(
    request: QueryGetPullRequestMergePermissionRequest,
  ): Promise<QueryGetPullRequestMergePermissionResponse>;
  CheckGitServerAuthorization(
    request: QueryCheckGitServerAuthorizationRequest,
  ): Promise<QueryCheckGitServerAuthorizationResponse>;
  CheckStorageProviderAuthorization(
    request: QueryCheckStorageProviderAuthorizationRequest,
  ): Promise<QueryCheckStorageProviderAuthorizationResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.VestedAmount = this.VestedAmount.bind(this);
    this.Task = this.Task.bind(this);
    this.TaskAll = this.TaskAll.bind(this);
    this.BranchAll = this.BranchAll.bind(this);
    this.RepositoryBranch = this.RepositoryBranch.bind(this);
    this.RepositoryBranchSha = this.RepositoryBranchSha.bind(this);
    this.RepositoryBranchAll = this.RepositoryBranchAll.bind(this);
    this.TagAll = this.TagAll.bind(this);
    this.RepositoryTag = this.RepositoryTag.bind(this);
    this.RepositoryTagSha = this.RepositoryTagSha.bind(this);
    this.RepositoryTagAll = this.RepositoryTagAll.bind(this);
    this.DaoMember = this.DaoMember.bind(this);
    this.DaoMemberAll = this.DaoMemberAll.bind(this);
    this.MemberAll = this.MemberAll.bind(this);
    this.Bounty = this.Bounty.bind(this);
    this.BountyAll = this.BountyAll.bind(this);
    this.Release = this.Release.bind(this);
    this.ReleaseAll = this.ReleaseAll.bind(this);
    this.PullRequestAll = this.PullRequestAll.bind(this);
    this.Dao = this.Dao.bind(this);
    this.DaoAll = this.DaoAll.bind(this);
    this.IssueComment = this.IssueComment.bind(this);
    this.PullRequestComment = this.PullRequestComment.bind(this);
    this.CommentAll = this.CommentAll.bind(this);
    this.IssueCommentAll = this.IssueCommentAll.bind(this);
    this.PullRequestCommentAll = this.PullRequestCommentAll.bind(this);
    this.IssueAll = this.IssueAll.bind(this);
    this.RepositoryReleaseLatest = this.RepositoryReleaseLatest.bind(this);
    this.RepositoryRelease = this.RepositoryRelease.bind(this);
    this.RepositoryReleaseAll = this.RepositoryReleaseAll.bind(this);
    this.RepositoryIssue = this.RepositoryIssue.bind(this);
    this.RepositoryIssueAll = this.RepositoryIssueAll.bind(this);
    this.RepositoryPullRequest = this.RepositoryPullRequest.bind(this);
    this.RepositoryPullRequestAll = this.RepositoryPullRequestAll.bind(this);
    this.Repository = this.Repository.bind(this);
    this.RepositoryAll = this.RepositoryAll.bind(this);
    this.ForkAll = this.ForkAll.bind(this);
    this.User = this.User.bind(this);
    this.UserDaoAll = this.UserDaoAll.bind(this);
    this.UserAll = this.UserAll.bind(this);
    this.AnyRepositoryAll = this.AnyRepositoryAll.bind(this);
    this.AnyRepository = this.AnyRepository.bind(this);
    this.Whois = this.Whois.bind(this);
    this.WhoisAll = this.WhoisAll.bind(this);
    this.PullRequestMergePermission = this.PullRequestMergePermission.bind(this);
    this.CheckGitServerAuthorization = this.CheckGitServerAuthorization.bind(this);
    this.CheckStorageProviderAuthorization = this.CheckStorageProviderAuthorization.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new _m0.Reader(data)));
  }

  VestedAmount(request: QueryVestedAmountRequest): Promise<QueryVestedAmountResponse> {
    const data = QueryVestedAmountRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "VestedAmount", data);
    return promise.then((data) => QueryVestedAmountResponse.decode(new _m0.Reader(data)));
  }

  Task(request: QueryGetTaskRequest): Promise<QueryGetTaskResponse> {
    const data = QueryGetTaskRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "Task", data);
    return promise.then((data) => QueryGetTaskResponse.decode(new _m0.Reader(data)));
  }

  TaskAll(request: QueryAllTaskRequest): Promise<QueryAllTaskResponse> {
    const data = QueryAllTaskRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "TaskAll", data);
    return promise.then((data) => QueryAllTaskResponse.decode(new _m0.Reader(data)));
  }

  BranchAll(request: QueryAllBranchRequest): Promise<QueryAllBranchResponse> {
    const data = QueryAllBranchRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "BranchAll", data);
    return promise.then((data) => QueryAllBranchResponse.decode(new _m0.Reader(data)));
  }

  RepositoryBranch(request: QueryGetRepositoryBranchRequest): Promise<QueryGetRepositoryBranchResponse> {
    const data = QueryGetRepositoryBranchRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "RepositoryBranch", data);
    return promise.then((data) => QueryGetRepositoryBranchResponse.decode(new _m0.Reader(data)));
  }

  RepositoryBranchSha(request: QueryGetRepositoryBranchShaRequest): Promise<QueryGetRepositoryBranchShaResponse> {
    const data = QueryGetRepositoryBranchShaRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "RepositoryBranchSha", data);
    return promise.then((data) => QueryGetRepositoryBranchShaResponse.decode(new _m0.Reader(data)));
  }

  RepositoryBranchAll(request: QueryAllRepositoryBranchRequest): Promise<QueryAllRepositoryBranchResponse> {
    const data = QueryAllRepositoryBranchRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "RepositoryBranchAll", data);
    return promise.then((data) => QueryAllRepositoryBranchResponse.decode(new _m0.Reader(data)));
  }

  TagAll(request: QueryAllTagRequest): Promise<QueryAllTagResponse> {
    const data = QueryAllTagRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "TagAll", data);
    return promise.then((data) => QueryAllTagResponse.decode(new _m0.Reader(data)));
  }

  RepositoryTag(request: QueryGetRepositoryTagRequest): Promise<QueryGetRepositoryTagResponse> {
    const data = QueryGetRepositoryTagRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "RepositoryTag", data);
    return promise.then((data) => QueryGetRepositoryTagResponse.decode(new _m0.Reader(data)));
  }

  RepositoryTagSha(request: QueryGetRepositoryTagShaRequest): Promise<QueryGetRepositoryTagShaResponse> {
    const data = QueryGetRepositoryTagShaRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "RepositoryTagSha", data);
    return promise.then((data) => QueryGetRepositoryTagShaResponse.decode(new _m0.Reader(data)));
  }

  RepositoryTagAll(request: QueryAllRepositoryTagRequest): Promise<QueryAllRepositoryTagResponse> {
    const data = QueryAllRepositoryTagRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "RepositoryTagAll", data);
    return promise.then((data) => QueryAllRepositoryTagResponse.decode(new _m0.Reader(data)));
  }

  DaoMember(request: QueryGetDaoMemberRequest): Promise<QueryGetDaoMemberResponse> {
    const data = QueryGetDaoMemberRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "DaoMember", data);
    return promise.then((data) => QueryGetDaoMemberResponse.decode(new _m0.Reader(data)));
  }

  DaoMemberAll(request: QueryAllDaoMemberRequest): Promise<QueryAllDaoMemberResponse> {
    const data = QueryAllDaoMemberRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "DaoMemberAll", data);
    return promise.then((data) => QueryAllDaoMemberResponse.decode(new _m0.Reader(data)));
  }

  MemberAll(request: QueryAllMemberRequest): Promise<QueryAllMemberResponse> {
    const data = QueryAllMemberRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "MemberAll", data);
    return promise.then((data) => QueryAllMemberResponse.decode(new _m0.Reader(data)));
  }

  Bounty(request: QueryGetBountyRequest): Promise<QueryGetBountyResponse> {
    const data = QueryGetBountyRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "Bounty", data);
    return promise.then((data) => QueryGetBountyResponse.decode(new _m0.Reader(data)));
  }

  BountyAll(request: QueryAllBountyRequest): Promise<QueryAllBountyResponse> {
    const data = QueryAllBountyRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "BountyAll", data);
    return promise.then((data) => QueryAllBountyResponse.decode(new _m0.Reader(data)));
  }

  Release(request: QueryGetReleaseRequest): Promise<QueryGetReleaseResponse> {
    const data = QueryGetReleaseRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "Release", data);
    return promise.then((data) => QueryGetReleaseResponse.decode(new _m0.Reader(data)));
  }

  ReleaseAll(request: QueryAllReleaseRequest): Promise<QueryAllReleaseResponse> {
    const data = QueryAllReleaseRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "ReleaseAll", data);
    return promise.then((data) => QueryAllReleaseResponse.decode(new _m0.Reader(data)));
  }

  PullRequestAll(request: QueryAllPullRequestRequest): Promise<QueryAllPullRequestResponse> {
    const data = QueryAllPullRequestRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "PullRequestAll", data);
    return promise.then((data) => QueryAllPullRequestResponse.decode(new _m0.Reader(data)));
  }

  Dao(request: QueryGetDaoRequest): Promise<QueryGetDaoResponse> {
    const data = QueryGetDaoRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "Dao", data);
    return promise.then((data) => QueryGetDaoResponse.decode(new _m0.Reader(data)));
  }

  DaoAll(request: QueryAllDaoRequest): Promise<QueryAllDaoResponse> {
    const data = QueryAllDaoRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "DaoAll", data);
    return promise.then((data) => QueryAllDaoResponse.decode(new _m0.Reader(data)));
  }

  IssueComment(request: QueryGetIssueCommentRequest): Promise<QueryGetIssueCommentResponse> {
    const data = QueryGetIssueCommentRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "IssueComment", data);
    return promise.then((data) => QueryGetIssueCommentResponse.decode(new _m0.Reader(data)));
  }

  PullRequestComment(request: QueryGetPullRequestCommentRequest): Promise<QueryGetPullRequestCommentResponse> {
    const data = QueryGetPullRequestCommentRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "PullRequestComment", data);
    return promise.then((data) => QueryGetPullRequestCommentResponse.decode(new _m0.Reader(data)));
  }

  CommentAll(request: QueryAllCommentRequest): Promise<QueryAllCommentResponse> {
    const data = QueryAllCommentRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "CommentAll", data);
    return promise.then((data) => QueryAllCommentResponse.decode(new _m0.Reader(data)));
  }

  IssueCommentAll(request: QueryAllIssueCommentRequest): Promise<QueryAllIssueCommentResponse> {
    const data = QueryAllIssueCommentRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "IssueCommentAll", data);
    return promise.then((data) => QueryAllIssueCommentResponse.decode(new _m0.Reader(data)));
  }

  PullRequestCommentAll(request: QueryAllPullRequestCommentRequest): Promise<QueryAllPullRequestCommentResponse> {
    const data = QueryAllPullRequestCommentRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "PullRequestCommentAll", data);
    return promise.then((data) => QueryAllPullRequestCommentResponse.decode(new _m0.Reader(data)));
  }

  IssueAll(request: QueryAllIssueRequest): Promise<QueryAllIssueResponse> {
    const data = QueryAllIssueRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "IssueAll", data);
    return promise.then((data) => QueryAllIssueResponse.decode(new _m0.Reader(data)));
  }

  RepositoryReleaseLatest(
    request: QueryGetLatestRepositoryReleaseRequest,
  ): Promise<QueryGetLatestRepositoryReleaseResponse> {
    const data = QueryGetLatestRepositoryReleaseRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "RepositoryReleaseLatest", data);
    return promise.then((data) => QueryGetLatestRepositoryReleaseResponse.decode(new _m0.Reader(data)));
  }

  RepositoryRelease(request: QueryGetRepositoryReleaseRequest): Promise<QueryGetRepositoryReleaseResponse> {
    const data = QueryGetRepositoryReleaseRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "RepositoryRelease", data);
    return promise.then((data) => QueryGetRepositoryReleaseResponse.decode(new _m0.Reader(data)));
  }

  RepositoryReleaseAll(request: QueryAllRepositoryReleaseRequest): Promise<QueryAllRepositoryReleaseResponse> {
    const data = QueryAllRepositoryReleaseRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "RepositoryReleaseAll", data);
    return promise.then((data) => QueryAllRepositoryReleaseResponse.decode(new _m0.Reader(data)));
  }

  RepositoryIssue(request: QueryGetRepositoryIssueRequest): Promise<QueryGetRepositoryIssueResponse> {
    const data = QueryGetRepositoryIssueRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "RepositoryIssue", data);
    return promise.then((data) => QueryGetRepositoryIssueResponse.decode(new _m0.Reader(data)));
  }

  RepositoryIssueAll(request: QueryAllRepositoryIssueRequest): Promise<QueryAllRepositoryIssueResponse> {
    const data = QueryAllRepositoryIssueRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "RepositoryIssueAll", data);
    return promise.then((data) => QueryAllRepositoryIssueResponse.decode(new _m0.Reader(data)));
  }

  RepositoryPullRequest(request: QueryGetRepositoryPullRequestRequest): Promise<QueryGetRepositoryPullRequestResponse> {
    const data = QueryGetRepositoryPullRequestRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "RepositoryPullRequest", data);
    return promise.then((data) => QueryGetRepositoryPullRequestResponse.decode(new _m0.Reader(data)));
  }

  RepositoryPullRequestAll(
    request: QueryAllRepositoryPullRequestRequest,
  ): Promise<QueryAllRepositoryPullRequestResponse> {
    const data = QueryAllRepositoryPullRequestRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "RepositoryPullRequestAll", data);
    return promise.then((data) => QueryAllRepositoryPullRequestResponse.decode(new _m0.Reader(data)));
  }

  Repository(request: QueryGetRepositoryRequest): Promise<QueryGetRepositoryResponse> {
    const data = QueryGetRepositoryRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "Repository", data);
    return promise.then((data) => QueryGetRepositoryResponse.decode(new _m0.Reader(data)));
  }

  RepositoryAll(request: QueryAllRepositoryRequest): Promise<QueryAllRepositoryResponse> {
    const data = QueryAllRepositoryRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "RepositoryAll", data);
    return promise.then((data) => QueryAllRepositoryResponse.decode(new _m0.Reader(data)));
  }

  ForkAll(request: QueryGetAllForkRequest): Promise<QueryGetAllForkResponse> {
    const data = QueryGetAllForkRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "ForkAll", data);
    return promise.then((data) => QueryGetAllForkResponse.decode(new _m0.Reader(data)));
  }

  User(request: QueryGetUserRequest): Promise<QueryGetUserResponse> {
    const data = QueryGetUserRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "User", data);
    return promise.then((data) => QueryGetUserResponse.decode(new _m0.Reader(data)));
  }

  UserDaoAll(request: QueryAllUserDaoRequest): Promise<QueryAllUserDaoResponse> {
    const data = QueryAllUserDaoRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "UserDaoAll", data);
    return promise.then((data) => QueryAllUserDaoResponse.decode(new _m0.Reader(data)));
  }

  UserAll(request: QueryAllUserRequest): Promise<QueryAllUserResponse> {
    const data = QueryAllUserRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "UserAll", data);
    return promise.then((data) => QueryAllUserResponse.decode(new _m0.Reader(data)));
  }

  AnyRepositoryAll(request: QueryAllAnyRepositoryRequest): Promise<QueryAllAnyRepositoryResponse> {
    const data = QueryAllAnyRepositoryRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "AnyRepositoryAll", data);
    return promise.then((data) => QueryAllAnyRepositoryResponse.decode(new _m0.Reader(data)));
  }

  AnyRepository(request: QueryGetAnyRepositoryRequest): Promise<QueryGetAnyRepositoryResponse> {
    const data = QueryGetAnyRepositoryRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "AnyRepository", data);
    return promise.then((data) => QueryGetAnyRepositoryResponse.decode(new _m0.Reader(data)));
  }

  Whois(request: QueryGetWhoisRequest): Promise<QueryGetWhoisResponse> {
    const data = QueryGetWhoisRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "Whois", data);
    return promise.then((data) => QueryGetWhoisResponse.decode(new _m0.Reader(data)));
  }

  WhoisAll(request: QueryAllWhoisRequest): Promise<QueryAllWhoisResponse> {
    const data = QueryAllWhoisRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "WhoisAll", data);
    return promise.then((data) => QueryAllWhoisResponse.decode(new _m0.Reader(data)));
  }

  PullRequestMergePermission(
    request: QueryGetPullRequestMergePermissionRequest,
  ): Promise<QueryGetPullRequestMergePermissionResponse> {
    const data = QueryGetPullRequestMergePermissionRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "PullRequestMergePermission", data);
    return promise.then((data) => QueryGetPullRequestMergePermissionResponse.decode(new _m0.Reader(data)));
  }

  CheckGitServerAuthorization(
    request: QueryCheckGitServerAuthorizationRequest,
  ): Promise<QueryCheckGitServerAuthorizationResponse> {
    const data = QueryCheckGitServerAuthorizationRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "CheckGitServerAuthorization", data);
    return promise.then((data) => QueryCheckGitServerAuthorizationResponse.decode(new _m0.Reader(data)));
  }

  CheckStorageProviderAuthorization(
    request: QueryCheckStorageProviderAuthorizationRequest,
  ): Promise<QueryCheckStorageProviderAuthorizationResponse> {
    const data = QueryCheckStorageProviderAuthorizationRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "CheckStorageProviderAuthorization", data);
    return promise.then((data) => QueryCheckStorageProviderAuthorizationResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
