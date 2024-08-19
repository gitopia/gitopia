/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Attachment } from "./attachment";

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

function createBaseRelease(): Release {
  return {
    creator: "",
    id: 0,
    repositoryId: 0,
    tagName: "",
    target: "",
    name: "",
    description: "",
    attachments: [],
    draft: false,
    preRelease: false,
    isTag: false,
    createdAt: 0,
    updatedAt: 0,
    publishedAt: 0,
  };
}

export const Release = {
  encode(message: Release, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): Release {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRelease();
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
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      tagName: isSet(object.tagName) ? String(object.tagName) : "",
      target: isSet(object.target) ? String(object.target) : "",
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
      attachments: Array.isArray(object?.attachments) ? object.attachments.map((e: any) => Attachment.fromJSON(e)) : [],
      draft: isSet(object.draft) ? Boolean(object.draft) : false,
      preRelease: isSet(object.preRelease) ? Boolean(object.preRelease) : false,
      isTag: isSet(object.isTag) ? Boolean(object.isTag) : false,
      createdAt: isSet(object.createdAt) ? Number(object.createdAt) : 0,
      updatedAt: isSet(object.updatedAt) ? Number(object.updatedAt) : 0,
      publishedAt: isSet(object.publishedAt) ? Number(object.publishedAt) : 0,
    };
  },

  toJSON(message: Release): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.tagName !== undefined && (obj.tagName = message.tagName);
    message.target !== undefined && (obj.target = message.target);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    if (message.attachments) {
      obj.attachments = message.attachments.map((e) => e ? Attachment.toJSON(e) : undefined);
    } else {
      obj.attachments = [];
    }
    message.draft !== undefined && (obj.draft = message.draft);
    message.preRelease !== undefined && (obj.preRelease = message.preRelease);
    message.isTag !== undefined && (obj.isTag = message.isTag);
    message.createdAt !== undefined && (obj.createdAt = Math.round(message.createdAt));
    message.updatedAt !== undefined && (obj.updatedAt = Math.round(message.updatedAt));
    message.publishedAt !== undefined && (obj.publishedAt = Math.round(message.publishedAt));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Release>, I>>(object: I): Release {
    const message = createBaseRelease();
    message.creator = object.creator ?? "";
    message.id = object.id ?? 0;
    message.repositoryId = object.repositoryId ?? 0;
    message.tagName = object.tagName ?? "";
    message.target = object.target ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.attachments = object.attachments?.map((e) => Attachment.fromPartial(e)) || [];
    message.draft = object.draft ?? false;
    message.preRelease = object.preRelease ?? false;
    message.isTag = object.isTag ?? false;
    message.createdAt = object.createdAt ?? 0;
    message.updatedAt = object.updatedAt ?? 0;
    message.publishedAt = object.publishedAt ?? 0;
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
