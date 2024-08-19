/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PullRequestIid } from "./repository";

export const protobufPackage = "gitopia.gitopia.gitopia";

export interface Issue {
  creator: string;
  id: number;
  iid: number;
  title: string;
  state: Issue_State;
  description: string;
  commentsCount: number;
  pullRequests: PullRequestIid[];
  repositoryId: number;
  labels: number[];
  weight: number;
  assignees: string[];
  bounties: number[];
  createdAt: number;
  updatedAt: number;
  closedAt: number;
  closedBy: string;
}

export enum Issue_State {
  OPEN = 0,
  CLOSED = 1,
  UNRECOGNIZED = -1,
}

export function issue_StateFromJSON(object: any): Issue_State {
  switch (object) {
    case 0:
    case "OPEN":
      return Issue_State.OPEN;
    case 1:
    case "CLOSED":
      return Issue_State.CLOSED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Issue_State.UNRECOGNIZED;
  }
}

export function issue_StateToJSON(object: Issue_State): string {
  switch (object) {
    case Issue_State.OPEN:
      return "OPEN";
    case Issue_State.CLOSED:
      return "CLOSED";
    case Issue_State.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseIssue(): Issue {
  return {
    creator: "",
    id: 0,
    iid: 0,
    title: "",
    state: 0,
    description: "",
    commentsCount: 0,
    pullRequests: [],
    repositoryId: 0,
    labels: [],
    weight: 0,
    assignees: [],
    bounties: [],
    createdAt: 0,
    updatedAt: 0,
    closedAt: 0,
    closedBy: "",
  };
}

export const Issue = {
  encode(message: Issue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
    if (message.commentsCount !== 0) {
      writer.uint32(56).uint64(message.commentsCount);
    }
    for (const v of message.pullRequests) {
      PullRequestIid.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    if (message.repositoryId !== 0) {
      writer.uint32(72).uint64(message.repositoryId);
    }
    writer.uint32(82).fork();
    for (const v of message.labels) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.weight !== 0) {
      writer.uint32(88).uint64(message.weight);
    }
    for (const v of message.assignees) {
      writer.uint32(98).string(v!);
    }
    writer.uint32(106).fork();
    for (const v of message.bounties) {
      writer.uint64(v);
    }
    writer.ldelim();
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
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Issue {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIssue();
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
          message.commentsCount = longToNumber(reader.uint64() as Long);
          break;
        case 8:
          message.pullRequests.push(PullRequestIid.decode(reader, reader.uint32()));
          break;
        case 9:
          message.repositoryId = longToNumber(reader.uint64() as Long);
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
          message.weight = longToNumber(reader.uint64() as Long);
          break;
        case 12:
          message.assignees.push(reader.string());
          break;
        case 13:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.bounties.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.bounties.push(longToNumber(reader.uint64() as Long));
          }
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
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Issue {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
      iid: isSet(object.iid) ? Number(object.iid) : 0,
      title: isSet(object.title) ? String(object.title) : "",
      state: isSet(object.state) ? issue_StateFromJSON(object.state) : 0,
      description: isSet(object.description) ? String(object.description) : "",
      commentsCount: isSet(object.commentsCount) ? Number(object.commentsCount) : 0,
      pullRequests: Array.isArray(object?.pullRequests)
        ? object.pullRequests.map((e: any) => PullRequestIid.fromJSON(e))
        : [],
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      labels: Array.isArray(object?.labels) ? object.labels.map((e: any) => Number(e)) : [],
      weight: isSet(object.weight) ? Number(object.weight) : 0,
      assignees: Array.isArray(object?.assignees) ? object.assignees.map((e: any) => String(e)) : [],
      bounties: Array.isArray(object?.bounties) ? object.bounties.map((e: any) => Number(e)) : [],
      createdAt: isSet(object.createdAt) ? Number(object.createdAt) : 0,
      updatedAt: isSet(object.updatedAt) ? Number(object.updatedAt) : 0,
      closedAt: isSet(object.closedAt) ? Number(object.closedAt) : 0,
      closedBy: isSet(object.closedBy) ? String(object.closedBy) : "",
    };
  },

  toJSON(message: Issue): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.iid !== undefined && (obj.iid = Math.round(message.iid));
    message.title !== undefined && (obj.title = message.title);
    message.state !== undefined && (obj.state = issue_StateToJSON(message.state));
    message.description !== undefined && (obj.description = message.description);
    message.commentsCount !== undefined && (obj.commentsCount = Math.round(message.commentsCount));
    if (message.pullRequests) {
      obj.pullRequests = message.pullRequests.map((e) => e ? PullRequestIid.toJSON(e) : undefined);
    } else {
      obj.pullRequests = [];
    }
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    if (message.labels) {
      obj.labels = message.labels.map((e) => Math.round(e));
    } else {
      obj.labels = [];
    }
    message.weight !== undefined && (obj.weight = Math.round(message.weight));
    if (message.assignees) {
      obj.assignees = message.assignees.map((e) => e);
    } else {
      obj.assignees = [];
    }
    if (message.bounties) {
      obj.bounties = message.bounties.map((e) => Math.round(e));
    } else {
      obj.bounties = [];
    }
    message.createdAt !== undefined && (obj.createdAt = Math.round(message.createdAt));
    message.updatedAt !== undefined && (obj.updatedAt = Math.round(message.updatedAt));
    message.closedAt !== undefined && (obj.closedAt = Math.round(message.closedAt));
    message.closedBy !== undefined && (obj.closedBy = message.closedBy);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Issue>, I>>(object: I): Issue {
    const message = createBaseIssue();
    message.creator = object.creator ?? "";
    message.id = object.id ?? 0;
    message.iid = object.iid ?? 0;
    message.title = object.title ?? "";
    message.state = object.state ?? 0;
    message.description = object.description ?? "";
    message.commentsCount = object.commentsCount ?? 0;
    message.pullRequests = object.pullRequests?.map((e) => PullRequestIid.fromPartial(e)) || [];
    message.repositoryId = object.repositoryId ?? 0;
    message.labels = object.labels?.map((e) => e) || [];
    message.weight = object.weight ?? 0;
    message.assignees = object.assignees?.map((e) => e) || [];
    message.bounties = object.bounties?.map((e) => e) || [];
    message.createdAt = object.createdAt ?? 0;
    message.updatedAt = object.updatedAt ?? 0;
    message.closedAt = object.closedAt ?? 0;
    message.closedBy = object.closedBy ?? "";
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
