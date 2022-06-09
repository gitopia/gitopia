/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "gitopia.gitopia.gitopia";

export enum Store {
  NONE = 0,
  IPFS = 1,
  ARWEAVE = 2,
  UNRECOGNIZED = -1,
}

export function storeFromJSON(object: any): Store {
  switch (object) {
    case 0:
    case "NONE":
      return Store.NONE;
    case 1:
    case "IPFS":
      return Store.IPFS;
    case 2:
    case "ARWEAVE":
      return Store.ARWEAVE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Store.UNRECOGNIZED;
  }
}

export function storeToJSON(object: Store): string {
  switch (object) {
    case Store.NONE:
      return "NONE";
    case Store.IPFS:
      return "IPFS";
    case Store.ARWEAVE:
      return "ARWEAVE";
    default:
      return "UNKNOWN";
  }
}

export interface StorageProvider {
  id: number;
  store: Store;
  creator: string;
}

const baseStorageProvider: object = { id: 0, store: 0, creator: "" };

export const StorageProvider = {
  encode(message: StorageProvider, writer: Writer = Writer.create()): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.store !== 0) {
      writer.uint32(16).int32(message.store);
    }
    if (message.creator !== "") {
      writer.uint32(26).string(message.creator);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): StorageProvider {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStorageProvider } as StorageProvider;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.store = reader.int32() as any;
          break;
        case 3:
          message.creator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StorageProvider {
    const message = { ...baseStorageProvider } as StorageProvider;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.store !== undefined && object.store !== null) {
      message.store = storeFromJSON(object.store);
    } else {
      message.store = 0;
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    return message;
  },

  toJSON(message: StorageProvider): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.store !== undefined && (obj.store = storeToJSON(message.store));
    message.creator !== undefined && (obj.creator = message.creator);
    return obj;
  },

  fromPartial(object: DeepPartial<StorageProvider>): StorageProvider {
    const message = { ...baseStorageProvider } as StorageProvider;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.store !== undefined && object.store !== null) {
      message.store = object.store;
    } else {
      message.store = 0;
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
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
