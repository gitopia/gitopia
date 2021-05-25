/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "gitopia.gitopia.gitopia";

export interface Comment {
  creator: string;
  id: number;
  parentId: string;
  commentIid: string;
  body: string;
  attachments: string;
  diffHunk: string;
  path: string;
  system: string;
  authorId: string;
  authorAssociation: string;
  createdAt: string;
  updatedAt: string;
  commentType: string;
  extensions: string;
}

const baseComment: object = {
  creator: "",
  id: 0,
  parentId: "",
  commentIid: "",
  body: "",
  attachments: "",
  diffHunk: "",
  path: "",
  system: "",
  authorId: "",
  authorAssociation: "",
  createdAt: "",
  updatedAt: "",
  commentType: "",
  extensions: "",
};

export const Comment = {
  encode(message: Comment, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.parentId !== "") {
      writer.uint32(26).string(message.parentId);
    }
    if (message.commentIid !== "") {
      writer.uint32(34).string(message.commentIid);
    }
    if (message.body !== "") {
      writer.uint32(42).string(message.body);
    }
    if (message.attachments !== "") {
      writer.uint32(50).string(message.attachments);
    }
    if (message.diffHunk !== "") {
      writer.uint32(58).string(message.diffHunk);
    }
    if (message.path !== "") {
      writer.uint32(66).string(message.path);
    }
    if (message.system !== "") {
      writer.uint32(74).string(message.system);
    }
    if (message.authorId !== "") {
      writer.uint32(82).string(message.authorId);
    }
    if (message.authorAssociation !== "") {
      writer.uint32(90).string(message.authorAssociation);
    }
    if (message.createdAt !== "") {
      writer.uint32(98).string(message.createdAt);
    }
    if (message.updatedAt !== "") {
      writer.uint32(106).string(message.updatedAt);
    }
    if (message.commentType !== "") {
      writer.uint32(114).string(message.commentType);
    }
    if (message.extensions !== "") {
      writer.uint32(122).string(message.extensions);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Comment {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseComment } as Comment;
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
          message.parentId = reader.string();
          break;
        case 4:
          message.commentIid = reader.string();
          break;
        case 5:
          message.body = reader.string();
          break;
        case 6:
          message.attachments = reader.string();
          break;
        case 7:
          message.diffHunk = reader.string();
          break;
        case 8:
          message.path = reader.string();
          break;
        case 9:
          message.system = reader.string();
          break;
        case 10:
          message.authorId = reader.string();
          break;
        case 11:
          message.authorAssociation = reader.string();
          break;
        case 12:
          message.createdAt = reader.string();
          break;
        case 13:
          message.updatedAt = reader.string();
          break;
        case 14:
          message.commentType = reader.string();
          break;
        case 15:
          message.extensions = reader.string();
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
      message.parentId = String(object.parentId);
    } else {
      message.parentId = "";
    }
    if (object.commentIid !== undefined && object.commentIid !== null) {
      message.commentIid = String(object.commentIid);
    } else {
      message.commentIid = "";
    }
    if (object.body !== undefined && object.body !== null) {
      message.body = String(object.body);
    } else {
      message.body = "";
    }
    if (object.attachments !== undefined && object.attachments !== null) {
      message.attachments = String(object.attachments);
    } else {
      message.attachments = "";
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
      message.system = String(object.system);
    } else {
      message.system = "";
    }
    if (object.authorId !== undefined && object.authorId !== null) {
      message.authorId = String(object.authorId);
    } else {
      message.authorId = "";
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
      message.createdAt = String(object.createdAt);
    } else {
      message.createdAt = "";
    }
    if (object.updatedAt !== undefined && object.updatedAt !== null) {
      message.updatedAt = String(object.updatedAt);
    } else {
      message.updatedAt = "";
    }
    if (object.commentType !== undefined && object.commentType !== null) {
      message.commentType = String(object.commentType);
    } else {
      message.commentType = "";
    }
    if (object.extensions !== undefined && object.extensions !== null) {
      message.extensions = String(object.extensions);
    } else {
      message.extensions = "";
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
    message.attachments !== undefined &&
      (obj.attachments = message.attachments);
    message.diffHunk !== undefined && (obj.diffHunk = message.diffHunk);
    message.path !== undefined && (obj.path = message.path);
    message.system !== undefined && (obj.system = message.system);
    message.authorId !== undefined && (obj.authorId = message.authorId);
    message.authorAssociation !== undefined &&
      (obj.authorAssociation = message.authorAssociation);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt);
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt);
    message.commentType !== undefined &&
      (obj.commentType = message.commentType);
    message.extensions !== undefined && (obj.extensions = message.extensions);
    return obj;
  },

  fromPartial(object: DeepPartial<Comment>): Comment {
    const message = { ...baseComment } as Comment;
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
      message.parentId = "";
    }
    if (object.commentIid !== undefined && object.commentIid !== null) {
      message.commentIid = object.commentIid;
    } else {
      message.commentIid = "";
    }
    if (object.body !== undefined && object.body !== null) {
      message.body = object.body;
    } else {
      message.body = "";
    }
    if (object.attachments !== undefined && object.attachments !== null) {
      message.attachments = object.attachments;
    } else {
      message.attachments = "";
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
      message.system = "";
    }
    if (object.authorId !== undefined && object.authorId !== null) {
      message.authorId = object.authorId;
    } else {
      message.authorId = "";
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
      message.createdAt = "";
    }
    if (object.updatedAt !== undefined && object.updatedAt !== null) {
      message.updatedAt = object.updatedAt;
    } else {
      message.updatedAt = "";
    }
    if (object.commentType !== undefined && object.commentType !== null) {
      message.commentType = object.commentType;
    } else {
      message.commentType = "";
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
