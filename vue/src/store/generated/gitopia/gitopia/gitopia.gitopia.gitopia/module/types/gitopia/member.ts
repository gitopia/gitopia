/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

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
    default:
      return "UNKNOWN";
  }
}

export interface Member {
  id: number;
  address: string;
  daoAddress: string;
  role: MemberRole;
}

const baseMember: object = { id: 0, address: "", daoAddress: "", role: 0 };

export const Member = {
  encode(message: Member, writer: Writer = Writer.create()): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): Member {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMember } as Member;
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
    const message = { ...baseMember } as Member;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    if (object.daoAddress !== undefined && object.daoAddress !== null) {
      message.daoAddress = String(object.daoAddress);
    } else {
      message.daoAddress = "";
    }
    if (object.role !== undefined && object.role !== null) {
      message.role = memberRoleFromJSON(object.role);
    } else {
      message.role = 0;
    }
    return message;
  },

  toJSON(message: Member): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.address !== undefined && (obj.address = message.address);
    message.daoAddress !== undefined && (obj.daoAddress = message.daoAddress);
    message.role !== undefined && (obj.role = memberRoleToJSON(message.role));
    return obj;
  },

  fromPartial(object: DeepPartial<Member>): Member {
    const message = { ...baseMember } as Member;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    if (object.daoAddress !== undefined && object.daoAddress !== null) {
      message.daoAddress = object.daoAddress;
    } else {
      message.daoAddress = "";
    }
    if (object.role !== undefined && object.role !== null) {
      message.role = object.role;
    } else {
      message.role = 0;
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
