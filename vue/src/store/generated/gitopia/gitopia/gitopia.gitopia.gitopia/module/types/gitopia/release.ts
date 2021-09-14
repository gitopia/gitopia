/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import { Attachment } from "../gitopia/repository";

export const protobufPackage = "gitopia.gitopia.gitopia";

export interface Release {
  creator: string;
  id: number;
  repositoryId: number;
  tagName: string;
  target: string;
  name: string;
  description: string;
  attachments: Attachment[];
  draft: boolean;
  preRelease: boolean;
  isTag: boolean;
  createdAt: number;
  updatedAt: number;
  publishedAt: number;
}

const baseRelease: object = {
  creator: "",
  id: 0,
  repositoryId: 0,
  tagName: "",
  target: "",
  name: "",
  description: "",
  draft: false,
  preRelease: false,
  isTag: false,
  createdAt: 0,
  updatedAt: 0,
  publishedAt: 0,
};

export const Release = {
  encode(message: Release, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.repositoryId !== 0) {
      writer.uint32(24).uint64(message.repositoryId);
    }
    if (message.tagName !== "") {
      writer.uint32(34).string(message.tagName);
    }
    if (message.target !== "") {
      writer.uint32(42).string(message.target);
    }
    if (message.name !== "") {
      writer.uint32(50).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(58).string(message.description);
    }
    for (const v of message.attachments) {
      Attachment.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    if (message.draft === true) {
      writer.uint32(72).bool(message.draft);
    }
    if (message.preRelease === true) {
      writer.uint32(80).bool(message.preRelease);
    }
    if (message.isTag === true) {
      writer.uint32(88).bool(message.isTag);
    }
    if (message.createdAt !== 0) {
      writer.uint32(96).int64(message.createdAt);
    }
    if (message.updatedAt !== 0) {
      writer.uint32(104).int64(message.updatedAt);
    }
    if (message.publishedAt !== 0) {
      writer.uint32(112).int64(message.publishedAt);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Release {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRelease } as Release;
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
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.tagName = reader.string();
          break;
        case 5:
          message.target = reader.string();
          break;
        case 6:
          message.name = reader.string();
          break;
        case 7:
          message.description = reader.string();
          break;
        case 8:
          message.attachments.push(Attachment.decode(reader, reader.uint32()));
          break;
        case 9:
          message.draft = reader.bool();
          break;
        case 10:
          message.preRelease = reader.bool();
          break;
        case 11:
          message.isTag = reader.bool();
          break;
        case 12:
          message.createdAt = longToNumber(reader.int64() as Long);
          break;
        case 13:
          message.updatedAt = longToNumber(reader.int64() as Long);
          break;
        case 14:
          message.publishedAt = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Release {
    const message = { ...baseRelease } as Release;
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
    if (object.target !== undefined && object.target !== null) {
      message.target = String(object.target);
    } else {
      message.target = "";
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
    if (object.attachments !== undefined && object.attachments !== null) {
      for (const e of object.attachments) {
        message.attachments.push(Attachment.fromJSON(e));
      }
    }
    if (object.draft !== undefined && object.draft !== null) {
      message.draft = Boolean(object.draft);
    } else {
      message.draft = false;
    }
    if (object.preRelease !== undefined && object.preRelease !== null) {
      message.preRelease = Boolean(object.preRelease);
    } else {
      message.preRelease = false;
    }
    if (object.isTag !== undefined && object.isTag !== null) {
      message.isTag = Boolean(object.isTag);
    } else {
      message.isTag = false;
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
    if (object.publishedAt !== undefined && object.publishedAt !== null) {
      message.publishedAt = Number(object.publishedAt);
    } else {
      message.publishedAt = 0;
    }
    return message;
  },

  toJSON(message: Release): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId);
    message.tagName !== undefined && (obj.tagName = message.tagName);
    message.target !== undefined && (obj.target = message.target);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined &&
      (obj.description = message.description);
    if (message.attachments) {
      obj.attachments = message.attachments.map((e) =>
        e ? Attachment.toJSON(e) : undefined
      );
    } else {
      obj.attachments = [];
    }
    message.draft !== undefined && (obj.draft = message.draft);
    message.preRelease !== undefined && (obj.preRelease = message.preRelease);
    message.isTag !== undefined && (obj.isTag = message.isTag);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt);
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt);
    message.publishedAt !== undefined &&
      (obj.publishedAt = message.publishedAt);
    return obj;
  },

  fromPartial(object: DeepPartial<Release>): Release {
    const message = { ...baseRelease } as Release;
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
    if (object.target !== undefined && object.target !== null) {
      message.target = object.target;
    } else {
      message.target = "";
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
    if (object.attachments !== undefined && object.attachments !== null) {
      for (const e of object.attachments) {
        message.attachments.push(Attachment.fromPartial(e));
      }
    }
    if (object.draft !== undefined && object.draft !== null) {
      message.draft = object.draft;
    } else {
      message.draft = false;
    }
    if (object.preRelease !== undefined && object.preRelease !== null) {
      message.preRelease = object.preRelease;
    } else {
      message.preRelease = false;
    }
    if (object.isTag !== undefined && object.isTag !== null) {
      message.isTag = object.isTag;
    } else {
      message.isTag = false;
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
    if (object.publishedAt !== undefined && object.publishedAt !== null) {
      message.publishedAt = object.publishedAt;
    } else {
      message.publishedAt = 0;
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
