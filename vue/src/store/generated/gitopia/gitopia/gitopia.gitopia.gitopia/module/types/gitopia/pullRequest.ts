/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "gitopia.gitopia.gitopia";

export interface PullRequest {
  creator: string;
  id: number;
  iid: string;
  title: string;
  state: string;
  description: string;
  locked: string;
  comments: string;
  issues: string;
  repositoryId: string;
  labels: string;
  assignees: string;
  reviewers: string;
  draft: string;
  createdAt: string;
  updatedAt: string;
  closedAt: string;
  closedBy: string;
  mergedAt: string;
  mergedBy: string;
  mergeCommitSha: string;
  maintainerCanModify: string;
  head: string;
  base: string;
  extensions: string;
}

const basePullRequest: object = {
  creator: "",
  id: 0,
  iid: "",
  title: "",
  state: "",
  description: "",
  locked: "",
  comments: "",
  issues: "",
  repositoryId: "",
  labels: "",
  assignees: "",
  reviewers: "",
  draft: "",
  createdAt: "",
  updatedAt: "",
  closedAt: "",
  closedBy: "",
  mergedAt: "",
  mergedBy: "",
  mergeCommitSha: "",
  maintainerCanModify: "",
  head: "",
  base: "",
  extensions: "",
};

export const PullRequest = {
  encode(message: PullRequest, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.iid !== "") {
      writer.uint32(26).string(message.iid);
    }
    if (message.title !== "") {
      writer.uint32(34).string(message.title);
    }
    if (message.state !== "") {
      writer.uint32(42).string(message.state);
    }
    if (message.description !== "") {
      writer.uint32(50).string(message.description);
    }
    if (message.locked !== "") {
      writer.uint32(58).string(message.locked);
    }
    if (message.comments !== "") {
      writer.uint32(66).string(message.comments);
    }
    if (message.issues !== "") {
      writer.uint32(74).string(message.issues);
    }
    if (message.repositoryId !== "") {
      writer.uint32(82).string(message.repositoryId);
    }
    if (message.labels !== "") {
      writer.uint32(90).string(message.labels);
    }
    if (message.assignees !== "") {
      writer.uint32(98).string(message.assignees);
    }
    if (message.reviewers !== "") {
      writer.uint32(106).string(message.reviewers);
    }
    if (message.draft !== "") {
      writer.uint32(114).string(message.draft);
    }
    if (message.createdAt !== "") {
      writer.uint32(122).string(message.createdAt);
    }
    if (message.updatedAt !== "") {
      writer.uint32(130).string(message.updatedAt);
    }
    if (message.closedAt !== "") {
      writer.uint32(138).string(message.closedAt);
    }
    if (message.closedBy !== "") {
      writer.uint32(146).string(message.closedBy);
    }
    if (message.mergedAt !== "") {
      writer.uint32(154).string(message.mergedAt);
    }
    if (message.mergedBy !== "") {
      writer.uint32(162).string(message.mergedBy);
    }
    if (message.mergeCommitSha !== "") {
      writer.uint32(170).string(message.mergeCommitSha);
    }
    if (message.maintainerCanModify !== "") {
      writer.uint32(178).string(message.maintainerCanModify);
    }
    if (message.head !== "") {
      writer.uint32(186).string(message.head);
    }
    if (message.base !== "") {
      writer.uint32(194).string(message.base);
    }
    if (message.extensions !== "") {
      writer.uint32(202).string(message.extensions);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): PullRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePullRequest } as PullRequest;
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
          message.iid = reader.string();
          break;
        case 4:
          message.title = reader.string();
          break;
        case 5:
          message.state = reader.string();
          break;
        case 6:
          message.description = reader.string();
          break;
        case 7:
          message.locked = reader.string();
          break;
        case 8:
          message.comments = reader.string();
          break;
        case 9:
          message.issues = reader.string();
          break;
        case 10:
          message.repositoryId = reader.string();
          break;
        case 11:
          message.labels = reader.string();
          break;
        case 12:
          message.assignees = reader.string();
          break;
        case 13:
          message.reviewers = reader.string();
          break;
        case 14:
          message.draft = reader.string();
          break;
        case 15:
          message.createdAt = reader.string();
          break;
        case 16:
          message.updatedAt = reader.string();
          break;
        case 17:
          message.closedAt = reader.string();
          break;
        case 18:
          message.closedBy = reader.string();
          break;
        case 19:
          message.mergedAt = reader.string();
          break;
        case 20:
          message.mergedBy = reader.string();
          break;
        case 21:
          message.mergeCommitSha = reader.string();
          break;
        case 22:
          message.maintainerCanModify = reader.string();
          break;
        case 23:
          message.head = reader.string();
          break;
        case 24:
          message.base = reader.string();
          break;
        case 25:
          message.extensions = reader.string();
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
      message.iid = String(object.iid);
    } else {
      message.iid = "";
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = "";
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = String(object.state);
    } else {
      message.state = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.locked !== undefined && object.locked !== null) {
      message.locked = String(object.locked);
    } else {
      message.locked = "";
    }
    if (object.comments !== undefined && object.comments !== null) {
      message.comments = String(object.comments);
    } else {
      message.comments = "";
    }
    if (object.issues !== undefined && object.issues !== null) {
      message.issues = String(object.issues);
    } else {
      message.issues = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = String(object.repositoryId);
    } else {
      message.repositoryId = "";
    }
    if (object.labels !== undefined && object.labels !== null) {
      message.labels = String(object.labels);
    } else {
      message.labels = "";
    }
    if (object.assignees !== undefined && object.assignees !== null) {
      message.assignees = String(object.assignees);
    } else {
      message.assignees = "";
    }
    if (object.reviewers !== undefined && object.reviewers !== null) {
      message.reviewers = String(object.reviewers);
    } else {
      message.reviewers = "";
    }
    if (object.draft !== undefined && object.draft !== null) {
      message.draft = String(object.draft);
    } else {
      message.draft = "";
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
    if (object.closedAt !== undefined && object.closedAt !== null) {
      message.closedAt = String(object.closedAt);
    } else {
      message.closedAt = "";
    }
    if (object.closedBy !== undefined && object.closedBy !== null) {
      message.closedBy = String(object.closedBy);
    } else {
      message.closedBy = "";
    }
    if (object.mergedAt !== undefined && object.mergedAt !== null) {
      message.mergedAt = String(object.mergedAt);
    } else {
      message.mergedAt = "";
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
      message.maintainerCanModify = String(object.maintainerCanModify);
    } else {
      message.maintainerCanModify = "";
    }
    if (object.head !== undefined && object.head !== null) {
      message.head = String(object.head);
    } else {
      message.head = "";
    }
    if (object.base !== undefined && object.base !== null) {
      message.base = String(object.base);
    } else {
      message.base = "";
    }
    if (object.extensions !== undefined && object.extensions !== null) {
      message.extensions = String(object.extensions);
    } else {
      message.extensions = "";
    }
    return message;
  },

  toJSON(message: PullRequest): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.iid !== undefined && (obj.iid = message.iid);
    message.title !== undefined && (obj.title = message.title);
    message.state !== undefined && (obj.state = message.state);
    message.description !== undefined &&
      (obj.description = message.description);
    message.locked !== undefined && (obj.locked = message.locked);
    message.comments !== undefined && (obj.comments = message.comments);
    message.issues !== undefined && (obj.issues = message.issues);
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId);
    message.labels !== undefined && (obj.labels = message.labels);
    message.assignees !== undefined && (obj.assignees = message.assignees);
    message.reviewers !== undefined && (obj.reviewers = message.reviewers);
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
    message.head !== undefined && (obj.head = message.head);
    message.base !== undefined && (obj.base = message.base);
    message.extensions !== undefined && (obj.extensions = message.extensions);
    return obj;
  },

  fromPartial(object: DeepPartial<PullRequest>): PullRequest {
    const message = { ...basePullRequest } as PullRequest;
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
      message.iid = "";
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    } else {
      message.title = "";
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    } else {
      message.state = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.locked !== undefined && object.locked !== null) {
      message.locked = object.locked;
    } else {
      message.locked = "";
    }
    if (object.comments !== undefined && object.comments !== null) {
      message.comments = object.comments;
    } else {
      message.comments = "";
    }
    if (object.issues !== undefined && object.issues !== null) {
      message.issues = object.issues;
    } else {
      message.issues = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = object.repositoryId;
    } else {
      message.repositoryId = "";
    }
    if (object.labels !== undefined && object.labels !== null) {
      message.labels = object.labels;
    } else {
      message.labels = "";
    }
    if (object.assignees !== undefined && object.assignees !== null) {
      message.assignees = object.assignees;
    } else {
      message.assignees = "";
    }
    if (object.reviewers !== undefined && object.reviewers !== null) {
      message.reviewers = object.reviewers;
    } else {
      message.reviewers = "";
    }
    if (object.draft !== undefined && object.draft !== null) {
      message.draft = object.draft;
    } else {
      message.draft = "";
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
    if (object.closedAt !== undefined && object.closedAt !== null) {
      message.closedAt = object.closedAt;
    } else {
      message.closedAt = "";
    }
    if (object.closedBy !== undefined && object.closedBy !== null) {
      message.closedBy = object.closedBy;
    } else {
      message.closedBy = "";
    }
    if (object.mergedAt !== undefined && object.mergedAt !== null) {
      message.mergedAt = object.mergedAt;
    } else {
      message.mergedAt = "";
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
      message.maintainerCanModify = "";
    }
    if (object.head !== undefined && object.head !== null) {
      message.head = object.head;
    } else {
      message.head = "";
    }
    if (object.base !== undefined && object.base !== null) {
      message.base = object.base;
    } else {
      message.base = "";
    }
    if (object.extensions !== undefined && object.extensions !== null) {
      message.extensions = object.extensions;
    } else {
      message.extensions = "";
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
