/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "gitopia.gitopia.gitopia";

export interface Comment {
  creator: string;
  id: number;
  parentId: number;
  commentIid: number;
  body: string;
  attachments: string[];
  diffHunk: string;
  path: string;
  system: boolean;
  authorAssociation: string;
  createdAt: number;
  updatedAt: number;
  commentType: Comment_Type;
}

export enum Comment_Type {
  ISSUE = 0,
  PULLREQUEST = 1,
  UNRECOGNIZED = -1,
}

export function comment_TypeFromJSON(object: any): Comment_Type {
  switch (object) {
    case 0:
    case "ISSUE":
      return Comment_Type.ISSUE;
    case 1:
    case "PULLREQUEST":
      return Comment_Type.PULLREQUEST;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Comment_Type.UNRECOGNIZED;
  }
}

export function comment_TypeToJSON(object: Comment_Type): string {
  switch (object) {
    case Comment_Type.ISSUE:
      return "ISSUE";
    case Comment_Type.PULLREQUEST:
      return "PULLREQUEST";
    default:
      return "UNKNOWN";
  }
}

const baseComment: object = {
  creator: "",
  id: 0,
  parentId: 0,
  commentIid: 0,
  body: "",
  attachments: "",
  diffHunk: "",
  path: "",
  system: false,
  authorAssociation: "",
  createdAt: 0,
  updatedAt: 0,
  commentType: 0,
};

export const Comment = {
  encode(message: Comment, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.parentId !== 0) {
      writer.uint32(24).uint64(message.parentId);
    }
    if (message.commentIid !== 0) {
      writer.uint32(32).uint64(message.commentIid);
    }
    if (message.body !== "") {
      writer.uint32(42).string(message.body);
    }
    for (const v of message.attachments) {
      writer.uint32(50).string(v!);
    }
    if (message.diffHunk !== "") {
      writer.uint32(58).string(message.diffHunk);
    }
    if (message.path !== "") {
      writer.uint32(66).string(message.path);
    }
    if (message.system === true) {
      writer.uint32(72).bool(message.system);
    }
    if (message.authorAssociation !== "") {
      writer.uint32(82).string(message.authorAssociation);
    }
    if (message.createdAt !== 0) {
      writer.uint32(88).int64(message.createdAt);
    }
    if (message.updatedAt !== 0) {
      writer.uint32(96).int64(message.updatedAt);
    }
    if (message.commentType !== 0) {
      writer.uint32(104).int32(message.commentType);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Comment {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseComment } as Comment;
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
          message.parentId = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.commentIid = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.body = reader.string();
          break;
        case 6:
          message.attachments.push(reader.string());
          break;
        case 7:
          message.diffHunk = reader.string();
          break;
        case 8:
          message.path = reader.string();
          break;
        case 9:
          message.system = reader.bool();
          break;
        case 10:
          message.authorAssociation = reader.string();
          break;
        case 11:
          message.createdAt = longToNumber(reader.int64() as Long);
          break;
        case 12:
          message.updatedAt = longToNumber(reader.int64() as Long);
          break;
        case 13:
          message.commentType = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Comment {
    const message = { ...baseComment } as Comment;
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
    if (object.parentId !== undefined && object.parentId !== null) {
      message.parentId = Number(object.parentId);
    } else {
      message.parentId = 0;
    }
    if (object.commentIid !== undefined && object.commentIid !== null) {
      message.commentIid = Number(object.commentIid);
    } else {
      message.commentIid = 0;
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
    if (object.commentType !== undefined && object.commentType !== null) {
      message.commentType = comment_TypeFromJSON(object.commentType);
    } else {
      message.commentType = 0;
    }
    return message;
  },

  toJSON(message: Comment): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.parentId !== undefined && (obj.parentId = message.parentId);
    message.commentIid !== undefined && (obj.commentIid = message.commentIid);
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
    message.createdAt !== undefined && (obj.createdAt = message.createdAt);
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt);
    message.commentType !== undefined &&
      (obj.commentType = comment_TypeToJSON(message.commentType));
    return obj;
  },

  fromPartial(object: DeepPartial<Comment>): Comment {
    const message = { ...baseComment } as Comment;
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
    if (object.parentId !== undefined && object.parentId !== null) {
      message.parentId = object.parentId;
    } else {
      message.parentId = 0;
    }
    if (object.commentIid !== undefined && object.commentIid !== null) {
      message.commentIid = object.commentIid;
    } else {
      message.commentIid = 0;
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
    if (object.commentType !== undefined && object.commentType !== null) {
      message.commentType = object.commentType;
    } else {
      message.commentType = 0;
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
