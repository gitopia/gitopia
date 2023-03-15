/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "gitopia.gitopia.gitopia";

export interface Branch {
  id: number;
  repositoryId: number;
  name: string;
  sha: string;
  allowForcePush: boolean;
  createdAt: number;
  updatedAt: number;
}

function createBaseBranch(): Branch {
  return { id: 0, repositoryId: 0, name: "", sha: "", allowForcePush: false, createdAt: 0, updatedAt: 0 };
}

export const Branch = {
  encode(message: Branch, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.repositoryId !== 0) {
      writer.uint32(16).uint64(message.repositoryId);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.sha !== "") {
      writer.uint32(34).string(message.sha);
    }
    if (message.allowForcePush === true) {
      writer.uint32(40).bool(message.allowForcePush);
    }
    if (message.createdAt !== 0) {
      writer.uint32(48).int64(message.createdAt);
    }
    if (message.updatedAt !== 0) {
      writer.uint32(56).int64(message.updatedAt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Branch {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBranch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.sha = reader.string();
          break;
        case 5:
          message.allowForcePush = reader.bool();
          break;
        case 6:
          message.createdAt = longToNumber(reader.int64() as Long);
          break;
        case 7:
          message.updatedAt = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Branch {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      name: isSet(object.name) ? String(object.name) : "",
      sha: isSet(object.sha) ? String(object.sha) : "",
      allowForcePush: isSet(object.allowForcePush) ? Boolean(object.allowForcePush) : false,
      createdAt: isSet(object.createdAt) ? Number(object.createdAt) : 0,
      updatedAt: isSet(object.updatedAt) ? Number(object.updatedAt) : 0,
    };
  },

  toJSON(message: Branch): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.name !== undefined && (obj.name = message.name);
    message.sha !== undefined && (obj.sha = message.sha);
    message.allowForcePush !== undefined && (obj.allowForcePush = message.allowForcePush);
    message.createdAt !== undefined && (obj.createdAt = Math.round(message.createdAt));
    message.updatedAt !== undefined && (obj.updatedAt = Math.round(message.updatedAt));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Branch>, I>>(object: I): Branch {
    const message = createBaseBranch();
    message.id = object.id ?? 0;
    message.repositoryId = object.repositoryId ?? 0;
    message.name = object.name ?? "";
    message.sha = object.sha ?? "";
    message.allowForcePush = object.allowForcePush ?? false;
    message.createdAt = object.createdAt ?? 0;
    message.updatedAt = object.updatedAt ?? 0;
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
