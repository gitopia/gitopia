/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "gitopia.gitopia.gitopia";

export enum MemberRole {
  MEMBER = 0,
  OWNER = 1,
  UNRECOGNIZED = -1,
}

export function memberRoleFromJSON(object: any): MemberRole {
  switch (object) {
    case 0:
    case "MEMBER":
      return MemberRole.MEMBER;
    case 1:
    case "OWNER":
      return MemberRole.OWNER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MemberRole.UNRECOGNIZED;
  }
}

export function memberRoleToJSON(object: MemberRole): string {
  switch (object) {
    case MemberRole.MEMBER:
      return "MEMBER";
    case MemberRole.OWNER:
      return "OWNER";
    case MemberRole.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Member {
  id: number;
  address: string;
  daoAddress: string;
  role: MemberRole;
}

function createBaseMember(): Member {
  return { id: 0, address: "", daoAddress: "", role: 0 };
}

export const Member = {
  encode(message: Member, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (message.daoAddress !== "") {
      writer.uint32(26).string(message.daoAddress);
    }
    if (message.role !== 0) {
      writer.uint32(32).int32(message.role);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Member {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMember();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.address = reader.string();
          break;
        case 3:
          message.daoAddress = reader.string();
          break;
        case 4:
          message.role = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Member {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      address: isSet(object.address) ? String(object.address) : "",
      daoAddress: isSet(object.daoAddress) ? String(object.daoAddress) : "",
      role: isSet(object.role) ? memberRoleFromJSON(object.role) : 0,
    };
  },

  toJSON(message: Member): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.address !== undefined && (obj.address = message.address);
    message.daoAddress !== undefined && (obj.daoAddress = message.daoAddress);
    message.role !== undefined && (obj.role = memberRoleToJSON(message.role));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Member>, I>>(object: I): Member {
    const message = createBaseMember();
    message.id = object.id ?? 0;
    message.address = object.address ?? "";
    message.daoAddress = object.daoAddress ?? "";
    message.role = object.role ?? 0;
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
