/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { IssueIid } from "./repository";

export const protobufPackage = "gitopia.gitopia.gitopia";

export interface PullRequest {
  creator: string;
  id: number;
  iid: number;
  title: string;
  state: PullRequest_State;
  description: string;
  locked: boolean;
  commentsCount: number;
  issues: IssueIid[];
  labels: number[];
  assignees: string[];
  reviewers: string[];
  draft: boolean;
  createdAt: number;
  updatedAt: number;
  closedAt: number;
  closedBy: string;
  mergedAt: number;
  mergedBy: string;
  mergeCommitSha: string;
  maintainerCanModify: boolean;
  head: PullRequestHead | undefined;
  base: PullRequestBase | undefined;
}

export enum PullRequest_State {
  OPEN = 0,
  CLOSED = 1,
  MERGED = 2,
  UNRECOGNIZED = -1,
}

export function pullRequest_StateFromJSON(object: any): PullRequest_State {
  switch (object) {
    case 0:
    case "OPEN":
      return PullRequest_State.OPEN;
    case 1:
    case "CLOSED":
      return PullRequest_State.CLOSED;
    case 2:
    case "MERGED":
      return PullRequest_State.MERGED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PullRequest_State.UNRECOGNIZED;
  }
}

export function pullRequest_StateToJSON(object: PullRequest_State): string {
  switch (object) {
    case PullRequest_State.OPEN:
      return "OPEN";
    case PullRequest_State.CLOSED:
      return "CLOSED";
    case PullRequest_State.MERGED:
      return "MERGED";
    case PullRequest_State.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface PullRequestHead {
  repositoryId: number;
  branch: string;
  commitSha: string;
}

export interface PullRequestBase {
  repositoryId: number;
  branch: string;
  commitSha: string;
}

function createBasePullRequest(): PullRequest {
  return {
    creator: "",
    id: 0,
    iid: 0,
    title: "",
    state: 0,
    description: "",
    locked: false,
    commentsCount: 0,
    issues: [],
    labels: [],
    assignees: [],
    reviewers: [],
    draft: false,
    createdAt: 0,
    updatedAt: 0,
    closedAt: 0,
    closedBy: "",
    mergedAt: 0,
    mergedBy: "",
    mergeCommitSha: "",
    maintainerCanModify: false,
    head: undefined,
    base: undefined,
  };
}

export const PullRequest = {
  encode(message: PullRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.iid !== 0) {
      writer.uint32(24).uint64(message.iid);
    }
    if (message.title !== "") {
      writer.uint32(34).string(message.title);
    }
    if (message.state !== 0) {
      writer.uint32(40).int32(message.state);
    }
    if (message.description !== "") {
      writer.uint32(50).string(message.description);
    }
    if (message.locked === true) {
      writer.uint32(56).bool(message.locked);
    }
    if (message.commentsCount !== 0) {
      writer.uint32(64).uint64(message.commentsCount);
    }
    for (const v of message.issues) {
      IssueIid.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    writer.uint32(82).fork();
    for (const v of message.labels) {
      writer.uint64(v);
    }
    writer.ldelim();
    for (const v of message.assignees) {
      writer.uint32(90).string(v!);
    }
    for (const v of message.reviewers) {
      writer.uint32(98).string(v!);
    }
    if (message.draft === true) {
      writer.uint32(104).bool(message.draft);
    }
    if (message.createdAt !== 0) {
      writer.uint32(112).int64(message.createdAt);
    }
    if (message.updatedAt !== 0) {
      writer.uint32(120).int64(message.updatedAt);
    }
    if (message.closedAt !== 0) {
      writer.uint32(128).int64(message.closedAt);
    }
    if (message.closedBy !== "") {
      writer.uint32(138).string(message.closedBy);
    }
    if (message.mergedAt !== 0) {
      writer.uint32(144).int64(message.mergedAt);
    }
    if (message.mergedBy !== "") {
      writer.uint32(154).string(message.mergedBy);
    }
    if (message.mergeCommitSha !== "") {
      writer.uint32(162).string(message.mergeCommitSha);
    }
    if (message.maintainerCanModify === true) {
      writer.uint32(168).bool(message.maintainerCanModify);
    }
    if (message.head !== undefined) {
      PullRequestHead.encode(message.head, writer.uint32(178).fork()).ldelim();
    }
    if (message.base !== undefined) {
      PullRequestBase.encode(message.base, writer.uint32(186).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PullRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePullRequest();
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
          message.iid = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.title = reader.string();
          break;
        case 5:
          message.state = reader.int32() as any;
          break;
        case 6:
          message.description = reader.string();
          break;
        case 7:
          message.locked = reader.bool();
          break;
        case 8:
          message.commentsCount = longToNumber(reader.uint64() as Long);
          break;
        case 9:
          message.issues.push(IssueIid.decode(reader, reader.uint32()));
          break;
        case 10:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.labels.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.labels.push(longToNumber(reader.uint64() as Long));
          }
          break;
        case 11:
          message.assignees.push(reader.string());
          break;
        case 12:
          message.reviewers.push(reader.string());
          break;
        case 13:
          message.draft = reader.bool();
          break;
        case 14:
          message.createdAt = longToNumber(reader.int64() as Long);
          break;
        case 15:
          message.updatedAt = longToNumber(reader.int64() as Long);
          break;
        case 16:
          message.closedAt = longToNumber(reader.int64() as Long);
          break;
        case 17:
          message.closedBy = reader.string();
          break;
        case 18:
          message.mergedAt = longToNumber(reader.int64() as Long);
          break;
        case 19:
          message.mergedBy = reader.string();
          break;
        case 20:
          message.mergeCommitSha = reader.string();
          break;
        case 21:
          message.maintainerCanModify = reader.bool();
          break;
        case 22:
          message.head = PullRequestHead.decode(reader, reader.uint32());
          break;
        case 23:
          message.base = PullRequestBase.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PullRequest {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
      iid: isSet(object.iid) ? Number(object.iid) : 0,
      title: isSet(object.title) ? String(object.title) : "",
      state: isSet(object.state) ? pullRequest_StateFromJSON(object.state) : 0,
      description: isSet(object.description) ? String(object.description) : "",
      locked: isSet(object.locked) ? Boolean(object.locked) : false,
      commentsCount: isSet(object.commentsCount) ? Number(object.commentsCount) : 0,
      issues: Array.isArray(object?.issues) ? object.issues.map((e: any) => IssueIid.fromJSON(e)) : [],
      labels: Array.isArray(object?.labels) ? object.labels.map((e: any) => Number(e)) : [],
      assignees: Array.isArray(object?.assignees) ? object.assignees.map((e: any) => String(e)) : [],
      reviewers: Array.isArray(object?.reviewers) ? object.reviewers.map((e: any) => String(e)) : [],
      draft: isSet(object.draft) ? Boolean(object.draft) : false,
      createdAt: isSet(object.createdAt) ? Number(object.createdAt) : 0,
      updatedAt: isSet(object.updatedAt) ? Number(object.updatedAt) : 0,
      closedAt: isSet(object.closedAt) ? Number(object.closedAt) : 0,
      closedBy: isSet(object.closedBy) ? String(object.closedBy) : "",
      mergedAt: isSet(object.mergedAt) ? Number(object.mergedAt) : 0,
      mergedBy: isSet(object.mergedBy) ? String(object.mergedBy) : "",
      mergeCommitSha: isSet(object.mergeCommitSha) ? String(object.mergeCommitSha) : "",
      maintainerCanModify: isSet(object.maintainerCanModify) ? Boolean(object.maintainerCanModify) : false,
      head: isSet(object.head) ? PullRequestHead.fromJSON(object.head) : undefined,
      base: isSet(object.base) ? PullRequestBase.fromJSON(object.base) : undefined,
    };
  },

  toJSON(message: PullRequest): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.iid !== undefined && (obj.iid = Math.round(message.iid));
    message.title !== undefined && (obj.title = message.title);
    message.state !== undefined && (obj.state = pullRequest_StateToJSON(message.state));
    message.description !== undefined && (obj.description = message.description);
    message.locked !== undefined && (obj.locked = message.locked);
    message.commentsCount !== undefined && (obj.commentsCount = Math.round(message.commentsCount));
    if (message.issues) {
      obj.issues = message.issues.map((e) => e ? IssueIid.toJSON(e) : undefined);
    } else {
      obj.issues = [];
    }
    if (message.labels) {
      obj.labels = message.labels.map((e) => Math.round(e));
    } else {
      obj.labels = [];
    }
    if (message.assignees) {
      obj.assignees = message.assignees.map((e) => e);
    } else {
      obj.assignees = [];
    }
    if (message.reviewers) {
      obj.reviewers = message.reviewers.map((e) => e);
    } else {
      obj.reviewers = [];
    }
    message.draft !== undefined && (obj.draft = message.draft);
    message.createdAt !== undefined && (obj.createdAt = Math.round(message.createdAt));
    message.updatedAt !== undefined && (obj.updatedAt = Math.round(message.updatedAt));
    message.closedAt !== undefined && (obj.closedAt = Math.round(message.closedAt));
    message.closedBy !== undefined && (obj.closedBy = message.closedBy);
    message.mergedAt !== undefined && (obj.mergedAt = Math.round(message.mergedAt));
    message.mergedBy !== undefined && (obj.mergedBy = message.mergedBy);
    message.mergeCommitSha !== undefined && (obj.mergeCommitSha = message.mergeCommitSha);
    message.maintainerCanModify !== undefined && (obj.maintainerCanModify = message.maintainerCanModify);
    message.head !== undefined && (obj.head = message.head ? PullRequestHead.toJSON(message.head) : undefined);
    message.base !== undefined && (obj.base = message.base ? PullRequestBase.toJSON(message.base) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PullRequest>, I>>(object: I): PullRequest {
    const message = createBasePullRequest();
    message.creator = object.creator ?? "";
    message.id = object.id ?? 0;
    message.iid = object.iid ?? 0;
    message.title = object.title ?? "";
    message.state = object.state ?? 0;
    message.description = object.description ?? "";
    message.locked = object.locked ?? false;
    message.commentsCount = object.commentsCount ?? 0;
    message.issues = object.issues?.map((e) => IssueIid.fromPartial(e)) || [];
    message.labels = object.labels?.map((e) => e) || [];
    message.assignees = object.assignees?.map((e) => e) || [];
    message.reviewers = object.reviewers?.map((e) => e) || [];
    message.draft = object.draft ?? false;
    message.createdAt = object.createdAt ?? 0;
    message.updatedAt = object.updatedAt ?? 0;
    message.closedAt = object.closedAt ?? 0;
    message.closedBy = object.closedBy ?? "";
    message.mergedAt = object.mergedAt ?? 0;
    message.mergedBy = object.mergedBy ?? "";
    message.mergeCommitSha = object.mergeCommitSha ?? "";
    message.maintainerCanModify = object.maintainerCanModify ?? false;
    message.head = (object.head !== undefined && object.head !== null)
      ? PullRequestHead.fromPartial(object.head)
      : undefined;
    message.base = (object.base !== undefined && object.base !== null)
      ? PullRequestBase.fromPartial(object.base)
      : undefined;
    return message;
  },
};

function createBasePullRequestHead(): PullRequestHead {
  return { repositoryId: 0, branch: "", commitSha: "" };
}

export const PullRequestHead = {
  encode(message: PullRequestHead, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.repositoryId !== 0) {
      writer.uint32(8).uint64(message.repositoryId);
    }
    if (message.branch !== "") {
      writer.uint32(18).string(message.branch);
    }
    if (message.commitSha !== "") {
      writer.uint32(26).string(message.commitSha);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PullRequestHead {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePullRequestHead();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.branch = reader.string();
          break;
        case 3:
          message.commitSha = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PullRequestHead {
    return {
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      branch: isSet(object.branch) ? String(object.branch) : "",
      commitSha: isSet(object.commitSha) ? String(object.commitSha) : "",
    };
  },

  toJSON(message: PullRequestHead): unknown {
    const obj: any = {};
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.branch !== undefined && (obj.branch = message.branch);
    message.commitSha !== undefined && (obj.commitSha = message.commitSha);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PullRequestHead>, I>>(object: I): PullRequestHead {
    const message = createBasePullRequestHead();
    message.repositoryId = object.repositoryId ?? 0;
    message.branch = object.branch ?? "";
    message.commitSha = object.commitSha ?? "";
    return message;
  },
};

function createBasePullRequestBase(): PullRequestBase {
  return { repositoryId: 0, branch: "", commitSha: "" };
}

export const PullRequestBase = {
  encode(message: PullRequestBase, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.repositoryId !== 0) {
      writer.uint32(8).uint64(message.repositoryId);
    }
    if (message.branch !== "") {
      writer.uint32(18).string(message.branch);
    }
    if (message.commitSha !== "") {
      writer.uint32(26).string(message.commitSha);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PullRequestBase {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePullRequestBase();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.branch = reader.string();
          break;
        case 3:
          message.commitSha = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PullRequestBase {
    return {
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      branch: isSet(object.branch) ? String(object.branch) : "",
      commitSha: isSet(object.commitSha) ? String(object.commitSha) : "",
    };
  },

  toJSON(message: PullRequestBase): unknown {
    const obj: any = {};
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.branch !== undefined && (obj.branch = message.branch);
    message.commitSha !== undefined && (obj.commitSha = message.commitSha);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PullRequestBase>, I>>(object: I): PullRequestBase {
    const message = createBasePullRequestBase();
    message.repositoryId = object.repositoryId ?? 0;
    message.branch = object.branch ?? "";
    message.commitSha = object.commitSha ?? "";
    return message;
  },
};

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
