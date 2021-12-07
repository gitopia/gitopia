/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "gitopia.gitopia.gitopia";

export interface PullRequest {
  creator: string;
  id: number;
  iid: number;
  title: string;
  state: PullRequest_State;
  description: string;
  locked: boolean;
  comments: number[];
  commentsCount: number;
  issues: number[];
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
    default:
      return "UNKNOWN";
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

const basePullRequest: object = {
  creator: "",
  id: 0,
  iid: 0,
  title: "",
  state: 0,
  description: "",
  locked: false,
  comments: 0,
  commentsCount: 0,
  issues: 0,
  labels: 0,
  assignees: "",
  reviewers: "",
  draft: false,
  createdAt: 0,
  updatedAt: 0,
  closedAt: 0,
  closedBy: "",
  mergedAt: 0,
  mergedBy: "",
  mergeCommitSha: "",
  maintainerCanModify: false,
};

export const PullRequest = {
  encode(message: PullRequest, writer: Writer = Writer.create()): Writer {
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
    writer.uint32(66).fork();
    for (const v of message.comments) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.commentsCount !== 0) {
      writer.uint32(72).uint64(message.commentsCount);
    }
    writer.uint32(82).fork();
    for (const v of message.issues) {
      writer.uint64(v);
    }
    writer.ldelim();
    writer.uint32(90).fork();
    for (const v of message.labels) {
      writer.uint64(v);
    }
    writer.ldelim();
    for (const v of message.assignees) {
      writer.uint32(98).string(v!);
    }
    for (const v of message.reviewers) {
      writer.uint32(106).string(v!);
    }
    if (message.draft === true) {
      writer.uint32(112).bool(message.draft);
    }
    if (message.createdAt !== 0) {
      writer.uint32(120).int64(message.createdAt);
    }
    if (message.updatedAt !== 0) {
      writer.uint32(128).int64(message.updatedAt);
    }
    if (message.closedAt !== 0) {
      writer.uint32(136).int64(message.closedAt);
    }
    if (message.closedBy !== "") {
      writer.uint32(146).string(message.closedBy);
    }
    if (message.mergedAt !== 0) {
      writer.uint32(152).int64(message.mergedAt);
    }
    if (message.mergedBy !== "") {
      writer.uint32(162).string(message.mergedBy);
    }
    if (message.mergeCommitSha !== "") {
      writer.uint32(170).string(message.mergeCommitSha);
    }
    if (message.maintainerCanModify === true) {
      writer.uint32(176).bool(message.maintainerCanModify);
    }
    if (message.head !== undefined) {
      PullRequestHead.encode(message.head, writer.uint32(186).fork()).ldelim();
    }
    if (message.base !== undefined) {
      PullRequestBase.encode(message.base, writer.uint32(202).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): PullRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePullRequest } as PullRequest;
    message.comments = [];
    message.issues = [];
    message.labels = [];
    message.assignees = [];
    message.reviewers = [];
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
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.comments.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.comments.push(longToNumber(reader.uint64() as Long));
          }
          break;
        case 9:
          message.commentsCount = longToNumber(reader.uint64() as Long);
          break;
        case 10:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.issues.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.issues.push(longToNumber(reader.uint64() as Long));
          }
          break;
        case 11:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.labels.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.labels.push(longToNumber(reader.uint64() as Long));
          }
          break;
        case 12:
          message.assignees.push(reader.string());
          break;
        case 13:
          message.reviewers.push(reader.string());
          break;
        case 14:
          message.draft = reader.bool();
          break;
        case 15:
          message.createdAt = longToNumber(reader.int64() as Long);
          break;
        case 16:
          message.updatedAt = longToNumber(reader.int64() as Long);
          break;
        case 17:
          message.closedAt = longToNumber(reader.int64() as Long);
          break;
        case 18:
          message.closedBy = reader.string();
          break;
        case 19:
          message.mergedAt = longToNumber(reader.int64() as Long);
          break;
        case 20:
          message.mergedBy = reader.string();
          break;
        case 21:
          message.mergeCommitSha = reader.string();
          break;
        case 22:
          message.maintainerCanModify = reader.bool();
          break;
        case 23:
          message.head = PullRequestHead.decode(reader, reader.uint32());
          break;
        case 25:
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
    const message = { ...basePullRequest } as PullRequest;
    message.comments = [];
    message.issues = [];
    message.labels = [];
    message.assignees = [];
    message.reviewers = [];
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
    if (object.iid !== undefined && object.iid !== null) {
      message.iid = Number(object.iid);
    } else {
      message.iid = 0;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = "";
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = pullRequest_StateFromJSON(object.state);
    } else {
      message.state = 0;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.locked !== undefined && object.locked !== null) {
      message.locked = Boolean(object.locked);
    } else {
      message.locked = false;
    }
    if (object.comments !== undefined && object.comments !== null) {
      for (const e of object.comments) {
        message.comments.push(Number(e));
      }
    }
    if (object.commentsCount !== undefined && object.commentsCount !== null) {
      message.commentsCount = Number(object.commentsCount);
    } else {
      message.commentsCount = 0;
    }
    if (object.issues !== undefined && object.issues !== null) {
      for (const e of object.issues) {
        message.issues.push(Number(e));
      }
    }
    if (object.labels !== undefined && object.labels !== null) {
      for (const e of object.labels) {
        message.labels.push(Number(e));
      }
    }
    if (object.assignees !== undefined && object.assignees !== null) {
      for (const e of object.assignees) {
        message.assignees.push(String(e));
      }
    }
    if (object.reviewers !== undefined && object.reviewers !== null) {
      for (const e of object.reviewers) {
        message.reviewers.push(String(e));
      }
    }
    if (object.draft !== undefined && object.draft !== null) {
      message.draft = Boolean(object.draft);
    } else {
      message.draft = false;
    }
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = Number(object.createdAt);
    } else {
      message.createdAt = 0;
    }
    if (object.updatedAt !== undefined && object.updatedAt !== null) {
      message.updatedAt = Number(object.updatedAt);
    } else {
      message.updatedAt = 0;
    }
    if (object.closedAt !== undefined && object.closedAt !== null) {
      message.closedAt = Number(object.closedAt);
    } else {
      message.closedAt = 0;
    }
    if (object.closedBy !== undefined && object.closedBy !== null) {
      message.closedBy = String(object.closedBy);
    } else {
      message.closedBy = "";
    }
    if (object.mergedAt !== undefined && object.mergedAt !== null) {
      message.mergedAt = Number(object.mergedAt);
    } else {
      message.mergedAt = 0;
    }
    if (object.mergedBy !== undefined && object.mergedBy !== null) {
      message.mergedBy = String(object.mergedBy);
    } else {
      message.mergedBy = "";
    }
    if (object.mergeCommitSha !== undefined && object.mergeCommitSha !== null) {
      message.mergeCommitSha = String(object.mergeCommitSha);
    } else {
      message.mergeCommitSha = "";
    }
    if (
      object.maintainerCanModify !== undefined &&
      object.maintainerCanModify !== null
    ) {
      message.maintainerCanModify = Boolean(object.maintainerCanModify);
    } else {
      message.maintainerCanModify = false;
    }
    if (object.head !== undefined && object.head !== null) {
      message.head = PullRequestHead.fromJSON(object.head);
    } else {
      message.head = undefined;
    }
    if (object.base !== undefined && object.base !== null) {
      message.base = PullRequestBase.fromJSON(object.base);
    } else {
      message.base = undefined;
    }
    return message;
  },

  toJSON(message: PullRequest): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.iid !== undefined && (obj.iid = message.iid);
    message.title !== undefined && (obj.title = message.title);
    message.state !== undefined &&
      (obj.state = pullRequest_StateToJSON(message.state));
    message.description !== undefined &&
      (obj.description = message.description);
    message.locked !== undefined && (obj.locked = message.locked);
    if (message.comments) {
      obj.comments = message.comments.map((e) => e);
    } else {
      obj.comments = [];
    }
    message.commentsCount !== undefined &&
      (obj.commentsCount = message.commentsCount);
    if (message.issues) {
      obj.issues = message.issues.map((e) => e);
    } else {
      obj.issues = [];
    }
    if (message.labels) {
      obj.labels = message.labels.map((e) => e);
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
    message.createdAt !== undefined && (obj.createdAt = message.createdAt);
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt);
    message.closedAt !== undefined && (obj.closedAt = message.closedAt);
    message.closedBy !== undefined && (obj.closedBy = message.closedBy);
    message.mergedAt !== undefined && (obj.mergedAt = message.mergedAt);
    message.mergedBy !== undefined && (obj.mergedBy = message.mergedBy);
    message.mergeCommitSha !== undefined &&
      (obj.mergeCommitSha = message.mergeCommitSha);
    message.maintainerCanModify !== undefined &&
      (obj.maintainerCanModify = message.maintainerCanModify);
    message.head !== undefined &&
      (obj.head = message.head
        ? PullRequestHead.toJSON(message.head)
        : undefined);
    message.base !== undefined &&
      (obj.base = message.base
        ? PullRequestBase.toJSON(message.base)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<PullRequest>): PullRequest {
    const message = { ...basePullRequest } as PullRequest;
    message.comments = [];
    message.issues = [];
    message.labels = [];
    message.assignees = [];
    message.reviewers = [];
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
    if (object.iid !== undefined && object.iid !== null) {
      message.iid = object.iid;
    } else {
      message.iid = 0;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    } else {
      message.title = "";
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    } else {
      message.state = 0;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.locked !== undefined && object.locked !== null) {
      message.locked = object.locked;
    } else {
      message.locked = false;
    }
    if (object.comments !== undefined && object.comments !== null) {
      for (const e of object.comments) {
        message.comments.push(e);
      }
    }
    if (object.commentsCount !== undefined && object.commentsCount !== null) {
      message.commentsCount = object.commentsCount;
    } else {
      message.commentsCount = 0;
    }
    if (object.issues !== undefined && object.issues !== null) {
      for (const e of object.issues) {
        message.issues.push(e);
      }
    }
    if (object.labels !== undefined && object.labels !== null) {
      for (const e of object.labels) {
        message.labels.push(e);
      }
    }
    if (object.assignees !== undefined && object.assignees !== null) {
      for (const e of object.assignees) {
        message.assignees.push(e);
      }
    }
    if (object.reviewers !== undefined && object.reviewers !== null) {
      for (const e of object.reviewers) {
        message.reviewers.push(e);
      }
    }
    if (object.draft !== undefined && object.draft !== null) {
      message.draft = object.draft;
    } else {
      message.draft = false;
    }
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = object.createdAt;
    } else {
      message.createdAt = 0;
    }
    if (object.updatedAt !== undefined && object.updatedAt !== null) {
      message.updatedAt = object.updatedAt;
    } else {
      message.updatedAt = 0;
    }
    if (object.closedAt !== undefined && object.closedAt !== null) {
      message.closedAt = object.closedAt;
    } else {
      message.closedAt = 0;
    }
    if (object.closedBy !== undefined && object.closedBy !== null) {
      message.closedBy = object.closedBy;
    } else {
      message.closedBy = "";
    }
    if (object.mergedAt !== undefined && object.mergedAt !== null) {
      message.mergedAt = object.mergedAt;
    } else {
      message.mergedAt = 0;
    }
    if (object.mergedBy !== undefined && object.mergedBy !== null) {
      message.mergedBy = object.mergedBy;
    } else {
      message.mergedBy = "";
    }
    if (object.mergeCommitSha !== undefined && object.mergeCommitSha !== null) {
      message.mergeCommitSha = object.mergeCommitSha;
    } else {
      message.mergeCommitSha = "";
    }
    if (
      object.maintainerCanModify !== undefined &&
      object.maintainerCanModify !== null
    ) {
      message.maintainerCanModify = object.maintainerCanModify;
    } else {
      message.maintainerCanModify = false;
    }
    if (object.head !== undefined && object.head !== null) {
      message.head = PullRequestHead.fromPartial(object.head);
    } else {
      message.head = undefined;
    }
    if (object.base !== undefined && object.base !== null) {
      message.base = PullRequestBase.fromPartial(object.base);
    } else {
      message.base = undefined;
    }
    return message;
  },
};

const basePullRequestHead: object = {
  repositoryId: 0,
  branch: "",
  commitSha: "",
};

export const PullRequestHead = {
  encode(message: PullRequestHead, writer: Writer = Writer.create()): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): PullRequestHead {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePullRequestHead } as PullRequestHead;
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
    const message = { ...basePullRequestHead } as PullRequestHead;
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = Number(object.repositoryId);
    } else {
      message.repositoryId = 0;
    }
    if (object.branch !== undefined && object.branch !== null) {
      message.branch = String(object.branch);
    } else {
      message.branch = "";
    }
    if (object.commitSha !== undefined && object.commitSha !== null) {
      message.commitSha = String(object.commitSha);
    } else {
      message.commitSha = "";
    }
    return message;
  },

  toJSON(message: PullRequestHead): unknown {
    const obj: any = {};
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId);
    message.branch !== undefined && (obj.branch = message.branch);
    message.commitSha !== undefined && (obj.commitSha = message.commitSha);
    return obj;
  },

  fromPartial(object: DeepPartial<PullRequestHead>): PullRequestHead {
    const message = { ...basePullRequestHead } as PullRequestHead;
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = object.repositoryId;
    } else {
      message.repositoryId = 0;
    }
    if (object.branch !== undefined && object.branch !== null) {
      message.branch = object.branch;
    } else {
      message.branch = "";
    }
    if (object.commitSha !== undefined && object.commitSha !== null) {
      message.commitSha = object.commitSha;
    } else {
      message.commitSha = "";
    }
    return message;
  },
};

const basePullRequestBase: object = {
  repositoryId: 0,
  branch: "",
  commitSha: "",
};

export const PullRequestBase = {
  encode(message: PullRequestBase, writer: Writer = Writer.create()): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): PullRequestBase {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePullRequestBase } as PullRequestBase;
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
    const message = { ...basePullRequestBase } as PullRequestBase;
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = Number(object.repositoryId);
    } else {
      message.repositoryId = 0;
    }
    if (object.branch !== undefined && object.branch !== null) {
      message.branch = String(object.branch);
    } else {
      message.branch = "";
    }
    if (object.commitSha !== undefined && object.commitSha !== null) {
      message.commitSha = String(object.commitSha);
    } else {
      message.commitSha = "";
    }
    return message;
  },

  toJSON(message: PullRequestBase): unknown {
    const obj: any = {};
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId);
    message.branch !== undefined && (obj.branch = message.branch);
    message.commitSha !== undefined && (obj.commitSha = message.commitSha);
    return obj;
  },

  fromPartial(object: DeepPartial<PullRequestBase>): PullRequestBase {
    const message = { ...basePullRequestBase } as PullRequestBase;
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = object.repositoryId;
    } else {
      message.repositoryId = 0;
    }
    if (object.branch !== undefined && object.branch !== null) {
      message.branch = object.branch;
    } else {
      message.branch = "";
    }
    if (object.commitSha !== undefined && object.commitSha !== null) {
      message.commitSha = object.commitSha;
    } else {
      message.commitSha = "";
    }
    return message;
  },
};

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
