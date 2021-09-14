/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";
import { Release } from "../gitopia/release";
import {
  PageRequest,
  PageResponse,
} from "../cosmos/base/query/v1beta1/pagination";
import { PullRequest } from "../gitopia/pullRequest";
import { Organization } from "../gitopia/organization";
import { Comment } from "../gitopia/comment";
import { Issue } from "../gitopia/issue";
import {
  Repository,
  RepositoryBranch,
  RepositoryTag,
} from "../gitopia/repository";
import { User } from "../gitopia/user";
import { Whois } from "../gitopia/whois";

export const protobufPackage = "gitopia.gitopia.gitopia";

export interface QueryGetLatestReleaseRequest {
  userId: string;
  repositoryName: string;
}

export interface QueryGetLatestReleaseResponse {
  Release: Release | undefined;
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

export interface QueryGetOrganizationRequest {
  id: string;
}

export interface QueryGetOrganizationResponse {
  Organization: Organization | undefined;
}

export interface QueryAllOrganizationRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllOrganizationResponse {
  Organization: Organization[];
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

export interface QueryGetRepositoryIssueRequest {
  id: string;
  repositoryName: string;
  issueIid: number;
}

export interface QueryGetRepositoryIssueResponse {
  Issue: Issue | undefined;
}

export interface QueryGetRepositoryPullRequestRequest {
  userId: string;
  repositoryName: string;
  pullIid: number;
}

export interface QueryGetRepositoryPullRequestResponse {
  PullRequest: PullRequest | undefined;
}

export interface QueryAllRepositoryIssueRequest {
  id: string;
  repositoryName: string;
  pagination: PageRequest | undefined;
}

export interface QueryAllRepositoryIssueResponse {
  Issue: Issue[];
  pagination: PageResponse | undefined;
}

export interface QueryAllRepositoryPullRequestRequest {
  userId: string;
  repositoryName: string;
  pagination: PageRequest | undefined;
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

export interface QueryGetAllBranchRequest {
  repositoryId: number;
}

export interface QueryGetAllBranchResponse {
  Branches: RepositoryBranch[];
}

export interface QueryGetBranchShaRequest {
  repositoryId: number;
  branchName: string;
}

export interface QueryGetBranchShaResponse {
  sha: string;
}

export interface QueryGetAllTagRequest {
  repositoryId: number;
}

export interface QueryGetAllTagResponse {
  Tags: RepositoryTag[];
}

export interface QueryGetTagShaRequest {
  repositoryId: number;
  tagName: string;
}

export interface QueryGetTagShaResponse {
  sha: string;
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

export interface QueryAllUserRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllUserResponse {
  User: User[];
  pagination: PageResponse | undefined;
}

export interface QueryAllAddressRepositoryRequest {
  id: string;
  pagination: PageRequest | undefined;
}

export interface QueryAllAddressRepositoryResponse {
  Repository: Repository[];
  pagination: PageResponse | undefined;
}

export interface QueryGetAddressRepositoryRequest {
  id: string;
  repositoryName: string;
}

export interface QueryGetAddressRepositoryResponse {
  Repository: Repository | undefined;
}

export interface QueryAllUserOrganizationRequest {
  id: string;
}

export interface QueryAllUserOrganizationResponse {
  organization: Organization[];
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

const baseQueryGetLatestReleaseRequest: object = {
  userId: "",
  repositoryName: "",
};

export const QueryGetLatestReleaseRequest = {
  encode(
    message: QueryGetLatestReleaseRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.repositoryName !== "") {
      writer.uint32(18).string(message.repositoryName);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetLatestReleaseRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetLatestReleaseRequest,
    } as QueryGetLatestReleaseRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = reader.string();
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

  fromJSON(object: any): QueryGetLatestReleaseRequest {
    const message = {
      ...baseQueryGetLatestReleaseRequest,
    } as QueryGetLatestReleaseRequest;
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = String(object.userId);
    } else {
      message.userId = "";
    }
    if (object.repositoryName !== undefined && object.repositoryName !== null) {
      message.repositoryName = String(object.repositoryName);
    } else {
      message.repositoryName = "";
    }
    return message;
  },

  toJSON(message: QueryGetLatestReleaseRequest): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = message.userId);
    message.repositoryName !== undefined &&
      (obj.repositoryName = message.repositoryName);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetLatestReleaseRequest>
  ): QueryGetLatestReleaseRequest {
    const message = {
      ...baseQueryGetLatestReleaseRequest,
    } as QueryGetLatestReleaseRequest;
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = object.userId;
    } else {
      message.userId = "";
    }
    if (object.repositoryName !== undefined && object.repositoryName !== null) {
      message.repositoryName = object.repositoryName;
    } else {
      message.repositoryName = "";
    }
    return message;
  },
};

const baseQueryGetLatestReleaseResponse: object = {};

export const QueryGetLatestReleaseResponse = {
  encode(
    message: QueryGetLatestReleaseResponse,
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
  ): QueryGetLatestReleaseResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetLatestReleaseResponse,
    } as QueryGetLatestReleaseResponse;
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

  fromJSON(object: any): QueryGetLatestReleaseResponse {
    const message = {
      ...baseQueryGetLatestReleaseResponse,
    } as QueryGetLatestReleaseResponse;
    if (object.Release !== undefined && object.Release !== null) {
      message.Release = Release.fromJSON(object.Release);
    } else {
      message.Release = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetLatestReleaseResponse): unknown {
    const obj: any = {};
    message.Release !== undefined &&
      (obj.Release = message.Release
        ? Release.toJSON(message.Release)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetLatestReleaseResponse>
  ): QueryGetLatestReleaseResponse {
    const message = {
      ...baseQueryGetLatestReleaseResponse,
    } as QueryGetLatestReleaseResponse;
    if (object.Release !== undefined && object.Release !== null) {
      message.Release = Release.fromPartial(object.Release);
    } else {
      message.Release = undefined;
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

const baseQueryGetOrganizationRequest: object = { id: "" };

export const QueryGetOrganizationRequest = {
  encode(
    message: QueryGetOrganizationRequest,
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
  ): QueryGetOrganizationRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetOrganizationRequest,
    } as QueryGetOrganizationRequest;
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

  fromJSON(object: any): QueryGetOrganizationRequest {
    const message = {
      ...baseQueryGetOrganizationRequest,
    } as QueryGetOrganizationRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    return message;
  },

  toJSON(message: QueryGetOrganizationRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetOrganizationRequest>
  ): QueryGetOrganizationRequest {
    const message = {
      ...baseQueryGetOrganizationRequest,
    } as QueryGetOrganizationRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    return message;
  },
};

const baseQueryGetOrganizationResponse: object = {};

export const QueryGetOrganizationResponse = {
  encode(
    message: QueryGetOrganizationResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.Organization !== undefined) {
      Organization.encode(
        message.Organization,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetOrganizationResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetOrganizationResponse,
    } as QueryGetOrganizationResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Organization = Organization.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetOrganizationResponse {
    const message = {
      ...baseQueryGetOrganizationResponse,
    } as QueryGetOrganizationResponse;
    if (object.Organization !== undefined && object.Organization !== null) {
      message.Organization = Organization.fromJSON(object.Organization);
    } else {
      message.Organization = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetOrganizationResponse): unknown {
    const obj: any = {};
    message.Organization !== undefined &&
      (obj.Organization = message.Organization
        ? Organization.toJSON(message.Organization)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetOrganizationResponse>
  ): QueryGetOrganizationResponse {
    const message = {
      ...baseQueryGetOrganizationResponse,
    } as QueryGetOrganizationResponse;
    if (object.Organization !== undefined && object.Organization !== null) {
      message.Organization = Organization.fromPartial(object.Organization);
    } else {
      message.Organization = undefined;
    }
    return message;
  },
};

const baseQueryAllOrganizationRequest: object = {};

export const QueryAllOrganizationRequest = {
  encode(
    message: QueryAllOrganizationRequest,
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
  ): QueryAllOrganizationRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllOrganizationRequest,
    } as QueryAllOrganizationRequest;
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

  fromJSON(object: any): QueryAllOrganizationRequest {
    const message = {
      ...baseQueryAllOrganizationRequest,
    } as QueryAllOrganizationRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllOrganizationRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllOrganizationRequest>
  ): QueryAllOrganizationRequest {
    const message = {
      ...baseQueryAllOrganizationRequest,
    } as QueryAllOrganizationRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllOrganizationResponse: object = {};

export const QueryAllOrganizationResponse = {
  encode(
    message: QueryAllOrganizationResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.Organization) {
      Organization.encode(v!, writer.uint32(10).fork()).ldelim();
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
  ): QueryAllOrganizationResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllOrganizationResponse,
    } as QueryAllOrganizationResponse;
    message.Organization = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Organization.push(
            Organization.decode(reader, reader.uint32())
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

  fromJSON(object: any): QueryAllOrganizationResponse {
    const message = {
      ...baseQueryAllOrganizationResponse,
    } as QueryAllOrganizationResponse;
    message.Organization = [];
    if (object.Organization !== undefined && object.Organization !== null) {
      for (const e of object.Organization) {
        message.Organization.push(Organization.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllOrganizationResponse): unknown {
    const obj: any = {};
    if (message.Organization) {
      obj.Organization = message.Organization.map((e) =>
        e ? Organization.toJSON(e) : undefined
      );
    } else {
      obj.Organization = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllOrganizationResponse>
  ): QueryAllOrganizationResponse {
    const message = {
      ...baseQueryAllOrganizationResponse,
    } as QueryAllOrganizationResponse;
    message.Organization = [];
    if (object.Organization !== undefined && object.Organization !== null) {
      for (const e of object.Organization) {
        message.Organization.push(Organization.fromPartial(e));
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
  userId: "",
  repositoryName: "",
  pullIid: 0,
};

export const QueryGetRepositoryPullRequestRequest = {
  encode(
    message: QueryGetRepositoryPullRequestRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
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
          message.userId = reader.string();
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
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = String(object.userId);
    } else {
      message.userId = "";
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
    message.userId !== undefined && (obj.userId = message.userId);
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
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = object.userId;
    } else {
      message.userId = "";
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
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
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
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
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
  userId: "",
  repositoryName: "",
};

export const QueryAllRepositoryPullRequestRequest = {
  encode(
    message: QueryAllRepositoryPullRequestRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
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
          message.userId = reader.string();
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

  fromJSON(object: any): QueryAllRepositoryPullRequestRequest {
    const message = {
      ...baseQueryAllRepositoryPullRequestRequest,
    } as QueryAllRepositoryPullRequestRequest;
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = String(object.userId);
    } else {
      message.userId = "";
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

  toJSON(message: QueryAllRepositoryPullRequestRequest): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = message.userId);
    message.repositoryName !== undefined &&
      (obj.repositoryName = message.repositoryName);
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
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = object.userId;
    } else {
      message.userId = "";
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

const baseQueryGetAllBranchRequest: object = { repositoryId: 0 };

export const QueryGetAllBranchRequest = {
  encode(
    message: QueryGetAllBranchRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.repositoryId !== 0) {
      writer.uint32(8).uint64(message.repositoryId);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetAllBranchRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetAllBranchRequest,
    } as QueryGetAllBranchRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetAllBranchRequest {
    const message = {
      ...baseQueryGetAllBranchRequest,
    } as QueryGetAllBranchRequest;
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = Number(object.repositoryId);
    } else {
      message.repositoryId = 0;
    }
    return message;
  },

  toJSON(message: QueryGetAllBranchRequest): unknown {
    const obj: any = {};
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetAllBranchRequest>
  ): QueryGetAllBranchRequest {
    const message = {
      ...baseQueryGetAllBranchRequest,
    } as QueryGetAllBranchRequest;
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = object.repositoryId;
    } else {
      message.repositoryId = 0;
    }
    return message;
  },
};

const baseQueryGetAllBranchResponse: object = {};

export const QueryGetAllBranchResponse = {
  encode(
    message: QueryGetAllBranchResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.Branches) {
      RepositoryBranch.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetAllBranchResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetAllBranchResponse,
    } as QueryGetAllBranchResponse;
    message.Branches = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Branches.push(
            RepositoryBranch.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetAllBranchResponse {
    const message = {
      ...baseQueryGetAllBranchResponse,
    } as QueryGetAllBranchResponse;
    message.Branches = [];
    if (object.Branches !== undefined && object.Branches !== null) {
      for (const e of object.Branches) {
        message.Branches.push(RepositoryBranch.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: QueryGetAllBranchResponse): unknown {
    const obj: any = {};
    if (message.Branches) {
      obj.Branches = message.Branches.map((e) =>
        e ? RepositoryBranch.toJSON(e) : undefined
      );
    } else {
      obj.Branches = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetAllBranchResponse>
  ): QueryGetAllBranchResponse {
    const message = {
      ...baseQueryGetAllBranchResponse,
    } as QueryGetAllBranchResponse;
    message.Branches = [];
    if (object.Branches !== undefined && object.Branches !== null) {
      for (const e of object.Branches) {
        message.Branches.push(RepositoryBranch.fromPartial(e));
      }
    }
    return message;
  },
};

const baseQueryGetBranchShaRequest: object = {
  repositoryId: 0,
  branchName: "",
};

export const QueryGetBranchShaRequest = {
  encode(
    message: QueryGetBranchShaRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.repositoryId !== 0) {
      writer.uint32(8).uint64(message.repositoryId);
    }
    if (message.branchName !== "") {
      writer.uint32(18).string(message.branchName);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetBranchShaRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetBranchShaRequest,
    } as QueryGetBranchShaRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.branchName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetBranchShaRequest {
    const message = {
      ...baseQueryGetBranchShaRequest,
    } as QueryGetBranchShaRequest;
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = Number(object.repositoryId);
    } else {
      message.repositoryId = 0;
    }
    if (object.branchName !== undefined && object.branchName !== null) {
      message.branchName = String(object.branchName);
    } else {
      message.branchName = "";
    }
    return message;
  },

  toJSON(message: QueryGetBranchShaRequest): unknown {
    const obj: any = {};
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId);
    message.branchName !== undefined && (obj.branchName = message.branchName);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetBranchShaRequest>
  ): QueryGetBranchShaRequest {
    const message = {
      ...baseQueryGetBranchShaRequest,
    } as QueryGetBranchShaRequest;
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = object.repositoryId;
    } else {
      message.repositoryId = 0;
    }
    if (object.branchName !== undefined && object.branchName !== null) {
      message.branchName = object.branchName;
    } else {
      message.branchName = "";
    }
    return message;
  },
};

const baseQueryGetBranchShaResponse: object = { sha: "" };

export const QueryGetBranchShaResponse = {
  encode(
    message: QueryGetBranchShaResponse,
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
  ): QueryGetBranchShaResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetBranchShaResponse,
    } as QueryGetBranchShaResponse;
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

  fromJSON(object: any): QueryGetBranchShaResponse {
    const message = {
      ...baseQueryGetBranchShaResponse,
    } as QueryGetBranchShaResponse;
    if (object.sha !== undefined && object.sha !== null) {
      message.sha = String(object.sha);
    } else {
      message.sha = "";
    }
    return message;
  },

  toJSON(message: QueryGetBranchShaResponse): unknown {
    const obj: any = {};
    message.sha !== undefined && (obj.sha = message.sha);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetBranchShaResponse>
  ): QueryGetBranchShaResponse {
    const message = {
      ...baseQueryGetBranchShaResponse,
    } as QueryGetBranchShaResponse;
    if (object.sha !== undefined && object.sha !== null) {
      message.sha = object.sha;
    } else {
      message.sha = "";
    }
    return message;
  },
};

const baseQueryGetAllTagRequest: object = { repositoryId: 0 };

export const QueryGetAllTagRequest = {
  encode(
    message: QueryGetAllTagRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.repositoryId !== 0) {
      writer.uint32(8).uint64(message.repositoryId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetAllTagRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetAllTagRequest } as QueryGetAllTagRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetAllTagRequest {
    const message = { ...baseQueryGetAllTagRequest } as QueryGetAllTagRequest;
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = Number(object.repositoryId);
    } else {
      message.repositoryId = 0;
    }
    return message;
  },

  toJSON(message: QueryGetAllTagRequest): unknown {
    const obj: any = {};
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetAllTagRequest>
  ): QueryGetAllTagRequest {
    const message = { ...baseQueryGetAllTagRequest } as QueryGetAllTagRequest;
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = object.repositoryId;
    } else {
      message.repositoryId = 0;
    }
    return message;
  },
};

const baseQueryGetAllTagResponse: object = {};

export const QueryGetAllTagResponse = {
  encode(
    message: QueryGetAllTagResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.Tags) {
      RepositoryTag.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetAllTagResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetAllTagResponse } as QueryGetAllTagResponse;
    message.Tags = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Tags.push(RepositoryTag.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetAllTagResponse {
    const message = { ...baseQueryGetAllTagResponse } as QueryGetAllTagResponse;
    message.Tags = [];
    if (object.Tags !== undefined && object.Tags !== null) {
      for (const e of object.Tags) {
        message.Tags.push(RepositoryTag.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: QueryGetAllTagResponse): unknown {
    const obj: any = {};
    if (message.Tags) {
      obj.Tags = message.Tags.map((e) =>
        e ? RepositoryTag.toJSON(e) : undefined
      );
    } else {
      obj.Tags = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetAllTagResponse>
  ): QueryGetAllTagResponse {
    const message = { ...baseQueryGetAllTagResponse } as QueryGetAllTagResponse;
    message.Tags = [];
    if (object.Tags !== undefined && object.Tags !== null) {
      for (const e of object.Tags) {
        message.Tags.push(RepositoryTag.fromPartial(e));
      }
    }
    return message;
  },
};

const baseQueryGetTagShaRequest: object = { repositoryId: 0, tagName: "" };

export const QueryGetTagShaRequest = {
  encode(
    message: QueryGetTagShaRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.repositoryId !== 0) {
      writer.uint32(8).uint64(message.repositoryId);
    }
    if (message.tagName !== "") {
      writer.uint32(18).string(message.tagName);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetTagShaRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetTagShaRequest } as QueryGetTagShaRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.tagName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetTagShaRequest {
    const message = { ...baseQueryGetTagShaRequest } as QueryGetTagShaRequest;
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = Number(object.repositoryId);
    } else {
      message.repositoryId = 0;
    }
    if (object.tagName !== undefined && object.tagName !== null) {
      message.tagName = String(object.tagName);
    } else {
      message.tagName = "";
    }
    return message;
  },

  toJSON(message: QueryGetTagShaRequest): unknown {
    const obj: any = {};
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId);
    message.tagName !== undefined && (obj.tagName = message.tagName);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetTagShaRequest>
  ): QueryGetTagShaRequest {
    const message = { ...baseQueryGetTagShaRequest } as QueryGetTagShaRequest;
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = object.repositoryId;
    } else {
      message.repositoryId = 0;
    }
    if (object.tagName !== undefined && object.tagName !== null) {
      message.tagName = object.tagName;
    } else {
      message.tagName = "";
    }
    return message;
  },
};

const baseQueryGetTagShaResponse: object = { sha: "" };

export const QueryGetTagShaResponse = {
  encode(
    message: QueryGetTagShaResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.sha !== "") {
      writer.uint32(10).string(message.sha);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetTagShaResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetTagShaResponse } as QueryGetTagShaResponse;
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

  fromJSON(object: any): QueryGetTagShaResponse {
    const message = { ...baseQueryGetTagShaResponse } as QueryGetTagShaResponse;
    if (object.sha !== undefined && object.sha !== null) {
      message.sha = String(object.sha);
    } else {
      message.sha = "";
    }
    return message;
  },

  toJSON(message: QueryGetTagShaResponse): unknown {
    const obj: any = {};
    message.sha !== undefined && (obj.sha = message.sha);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetTagShaResponse>
  ): QueryGetTagShaResponse {
    const message = { ...baseQueryGetTagShaResponse } as QueryGetTagShaResponse;
    if (object.sha !== undefined && object.sha !== null) {
      message.sha = object.sha;
    } else {
      message.sha = "";
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

const baseQueryAllAddressRepositoryRequest: object = { id: "" };

export const QueryAllAddressRepositoryRequest = {
  encode(
    message: QueryAllAddressRepositoryRequest,
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
  ): QueryAllAddressRepositoryRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllAddressRepositoryRequest,
    } as QueryAllAddressRepositoryRequest;
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

  fromJSON(object: any): QueryAllAddressRepositoryRequest {
    const message = {
      ...baseQueryAllAddressRepositoryRequest,
    } as QueryAllAddressRepositoryRequest;
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

  toJSON(message: QueryAllAddressRepositoryRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllAddressRepositoryRequest>
  ): QueryAllAddressRepositoryRequest {
    const message = {
      ...baseQueryAllAddressRepositoryRequest,
    } as QueryAllAddressRepositoryRequest;
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

const baseQueryAllAddressRepositoryResponse: object = {};

export const QueryAllAddressRepositoryResponse = {
  encode(
    message: QueryAllAddressRepositoryResponse,
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
  ): QueryAllAddressRepositoryResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllAddressRepositoryResponse,
    } as QueryAllAddressRepositoryResponse;
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

  fromJSON(object: any): QueryAllAddressRepositoryResponse {
    const message = {
      ...baseQueryAllAddressRepositoryResponse,
    } as QueryAllAddressRepositoryResponse;
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

  toJSON(message: QueryAllAddressRepositoryResponse): unknown {
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
    object: DeepPartial<QueryAllAddressRepositoryResponse>
  ): QueryAllAddressRepositoryResponse {
    const message = {
      ...baseQueryAllAddressRepositoryResponse,
    } as QueryAllAddressRepositoryResponse;
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

const baseQueryGetAddressRepositoryRequest: object = {
  id: "",
  repositoryName: "",
};

export const QueryGetAddressRepositoryRequest = {
  encode(
    message: QueryGetAddressRepositoryRequest,
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
  ): QueryGetAddressRepositoryRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetAddressRepositoryRequest,
    } as QueryGetAddressRepositoryRequest;
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

  fromJSON(object: any): QueryGetAddressRepositoryRequest {
    const message = {
      ...baseQueryGetAddressRepositoryRequest,
    } as QueryGetAddressRepositoryRequest;
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

  toJSON(message: QueryGetAddressRepositoryRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.repositoryName !== undefined &&
      (obj.repositoryName = message.repositoryName);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetAddressRepositoryRequest>
  ): QueryGetAddressRepositoryRequest {
    const message = {
      ...baseQueryGetAddressRepositoryRequest,
    } as QueryGetAddressRepositoryRequest;
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

const baseQueryGetAddressRepositoryResponse: object = {};

export const QueryGetAddressRepositoryResponse = {
  encode(
    message: QueryGetAddressRepositoryResponse,
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
  ): QueryGetAddressRepositoryResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetAddressRepositoryResponse,
    } as QueryGetAddressRepositoryResponse;
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

  fromJSON(object: any): QueryGetAddressRepositoryResponse {
    const message = {
      ...baseQueryGetAddressRepositoryResponse,
    } as QueryGetAddressRepositoryResponse;
    if (object.Repository !== undefined && object.Repository !== null) {
      message.Repository = Repository.fromJSON(object.Repository);
    } else {
      message.Repository = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetAddressRepositoryResponse): unknown {
    const obj: any = {};
    message.Repository !== undefined &&
      (obj.Repository = message.Repository
        ? Repository.toJSON(message.Repository)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetAddressRepositoryResponse>
  ): QueryGetAddressRepositoryResponse {
    const message = {
      ...baseQueryGetAddressRepositoryResponse,
    } as QueryGetAddressRepositoryResponse;
    if (object.Repository !== undefined && object.Repository !== null) {
      message.Repository = Repository.fromPartial(object.Repository);
    } else {
      message.Repository = undefined;
    }
    return message;
  },
};

const baseQueryAllUserOrganizationRequest: object = { id: "" };

export const QueryAllUserOrganizationRequest = {
  encode(
    message: QueryAllUserOrganizationRequest,
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
  ): QueryAllUserOrganizationRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllUserOrganizationRequest,
    } as QueryAllUserOrganizationRequest;
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

  fromJSON(object: any): QueryAllUserOrganizationRequest {
    const message = {
      ...baseQueryAllUserOrganizationRequest,
    } as QueryAllUserOrganizationRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    return message;
  },

  toJSON(message: QueryAllUserOrganizationRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllUserOrganizationRequest>
  ): QueryAllUserOrganizationRequest {
    const message = {
      ...baseQueryAllUserOrganizationRequest,
    } as QueryAllUserOrganizationRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    return message;
  },
};

const baseQueryAllUserOrganizationResponse: object = {};

export const QueryAllUserOrganizationResponse = {
  encode(
    message: QueryAllUserOrganizationResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.organization) {
      Organization.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllUserOrganizationResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllUserOrganizationResponse,
    } as QueryAllUserOrganizationResponse;
    message.organization = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.organization.push(
            Organization.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllUserOrganizationResponse {
    const message = {
      ...baseQueryAllUserOrganizationResponse,
    } as QueryAllUserOrganizationResponse;
    message.organization = [];
    if (object.organization !== undefined && object.organization !== null) {
      for (const e of object.organization) {
        message.organization.push(Organization.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: QueryAllUserOrganizationResponse): unknown {
    const obj: any = {};
    if (message.organization) {
      obj.organization = message.organization.map((e) =>
        e ? Organization.toJSON(e) : undefined
      );
    } else {
      obj.organization = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllUserOrganizationResponse>
  ): QueryAllUserOrganizationResponse {
    const message = {
      ...baseQueryAllUserOrganizationResponse,
    } as QueryAllUserOrganizationResponse;
    message.organization = [];
    if (object.organization !== undefined && object.organization !== null) {
      for (const e of object.organization) {
        message.organization.push(Organization.fromPartial(e));
      }
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
  LatestRelease(
    request: QueryGetLatestReleaseRequest
  ): Promise<QueryGetLatestReleaseResponse>;
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
  /** Queries a organization by id. */
  Organization(
    request: QueryGetOrganizationRequest
  ): Promise<QueryGetOrganizationResponse>;
  /** Queries a list of organization items. */
  OrganizationAll(
    request: QueryAllOrganizationRequest
  ): Promise<QueryAllOrganizationResponse>;
  /** Queries a comment by id. */
  Comment(request: QueryGetCommentRequest): Promise<QueryGetCommentResponse>;
  /** Queries a list of comment items. */
  CommentAll(request: QueryAllCommentRequest): Promise<QueryAllCommentResponse>;
  /** Queries a issue by id. */
  Issue(request: QueryGetIssueRequest): Promise<QueryGetIssueResponse>;
  /** Queries a list of issue items. */
  IssueAll(request: QueryAllIssueRequest): Promise<QueryAllIssueResponse>;
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
  /** Queries a repository by id. */
  BranchAll(
    request: QueryGetAllBranchRequest
  ): Promise<QueryGetAllBranchResponse>;
  BranchSha(
    request: QueryGetBranchShaRequest
  ): Promise<QueryGetBranchShaResponse>;
  TagAll(request: QueryGetAllTagRequest): Promise<QueryGetAllTagResponse>;
  TagSha(request: QueryGetTagShaRequest): Promise<QueryGetTagShaResponse>;
  /** Queries a user by id. */
  User(request: QueryGetUserRequest): Promise<QueryGetUserResponse>;
  /** Queries a list of user items. */
  UserAll(request: QueryAllUserRequest): Promise<QueryAllUserResponse>;
  /** Queries a list of user repositories. */
  AddressRepositoryAll(
    request: QueryAllAddressRepositoryRequest
  ): Promise<QueryAllAddressRepositoryResponse>;
  /** Queries a repository by user id and repository name */
  AddressRepository(
    request: QueryGetAddressRepositoryRequest
  ): Promise<QueryGetAddressRepositoryResponse>;
  /** Queries a list of user Organizations. */
  UserOrganizationAll(
    request: QueryAllUserOrganizationRequest
  ): Promise<QueryAllUserOrganizationResponse>;
  /** Queries a whois by id. */
  Whois(request: QueryGetWhoisRequest): Promise<QueryGetWhoisResponse>;
  /** Queries a list of whois items. */
  WhoisAll(request: QueryAllWhoisRequest): Promise<QueryAllWhoisResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  LatestRelease(
    request: QueryGetLatestReleaseRequest
  ): Promise<QueryGetLatestReleaseResponse> {
    const data = QueryGetLatestReleaseRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "LatestRelease",
      data
    );
    return promise.then((data) =>
      QueryGetLatestReleaseResponse.decode(new Reader(data))
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

  Organization(
    request: QueryGetOrganizationRequest
  ): Promise<QueryGetOrganizationResponse> {
    const data = QueryGetOrganizationRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "Organization",
      data
    );
    return promise.then((data) =>
      QueryGetOrganizationResponse.decode(new Reader(data))
    );
  }

  OrganizationAll(
    request: QueryAllOrganizationRequest
  ): Promise<QueryAllOrganizationResponse> {
    const data = QueryAllOrganizationRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "OrganizationAll",
      data
    );
    return promise.then((data) =>
      QueryAllOrganizationResponse.decode(new Reader(data))
    );
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

  BranchAll(
    request: QueryGetAllBranchRequest
  ): Promise<QueryGetAllBranchResponse> {
    const data = QueryGetAllBranchRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "BranchAll",
      data
    );
    return promise.then((data) =>
      QueryGetAllBranchResponse.decode(new Reader(data))
    );
  }

  BranchSha(
    request: QueryGetBranchShaRequest
  ): Promise<QueryGetBranchShaResponse> {
    const data = QueryGetBranchShaRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "BranchSha",
      data
    );
    return promise.then((data) =>
      QueryGetBranchShaResponse.decode(new Reader(data))
    );
  }

  TagAll(request: QueryGetAllTagRequest): Promise<QueryGetAllTagResponse> {
    const data = QueryGetAllTagRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "TagAll",
      data
    );
    return promise.then((data) =>
      QueryGetAllTagResponse.decode(new Reader(data))
    );
  }

  TagSha(request: QueryGetTagShaRequest): Promise<QueryGetTagShaResponse> {
    const data = QueryGetTagShaRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "TagSha",
      data
    );
    return promise.then((data) =>
      QueryGetTagShaResponse.decode(new Reader(data))
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

  AddressRepositoryAll(
    request: QueryAllAddressRepositoryRequest
  ): Promise<QueryAllAddressRepositoryResponse> {
    const data = QueryAllAddressRepositoryRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "AddressRepositoryAll",
      data
    );
    return promise.then((data) =>
      QueryAllAddressRepositoryResponse.decode(new Reader(data))
    );
  }

  AddressRepository(
    request: QueryGetAddressRepositoryRequest
  ): Promise<QueryGetAddressRepositoryResponse> {
    const data = QueryGetAddressRepositoryRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "AddressRepository",
      data
    );
    return promise.then((data) =>
      QueryGetAddressRepositoryResponse.decode(new Reader(data))
    );
  }

  UserOrganizationAll(
    request: QueryAllUserOrganizationRequest
  ): Promise<QueryAllUserOrganizationResponse> {
    const data = QueryAllUserOrganizationRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "UserOrganizationAll",
      data
    );
    return promise.then((data) =>
      QueryAllUserOrganizationResponse.decode(new Reader(data))
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
