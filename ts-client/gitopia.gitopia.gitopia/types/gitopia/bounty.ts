/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../cosmos/base/v1beta1/coin";

export const protobufPackage = "gitopia.gitopia.gitopia";

export enum BountyState {
  BOUNTY_STATE_SRCDEBITTED = 0,
  BOUNTY_STATE_DESTCREDITED = 1,
  BOUNTY_STATE_REVERTEDBACK = 2,
  UNRECOGNIZED = -1,
}

export function bountyStateFromJSON(object: any): BountyState {
  switch (object) {
    case 0:
    case "BOUNTY_STATE_SRCDEBITTED":
      return BountyState.BOUNTY_STATE_SRCDEBITTED;
    case 1:
    case "BOUNTY_STATE_DESTCREDITED":
      return BountyState.BOUNTY_STATE_DESTCREDITED;
    case 2:
    case "BOUNTY_STATE_REVERTEDBACK":
      return BountyState.BOUNTY_STATE_REVERTEDBACK;
    case -1:
    case "UNRECOGNIZED":
    default:
      return BountyState.UNRECOGNIZED;
  }
}

export function bountyStateToJSON(object: BountyState): string {
  switch (object) {
    case BountyState.BOUNTY_STATE_SRCDEBITTED:
      return "BOUNTY_STATE_SRCDEBITTED";
    case BountyState.BOUNTY_STATE_DESTCREDITED:
      return "BOUNTY_STATE_DESTCREDITED";
    case BountyState.BOUNTY_STATE_REVERTEDBACK:
      return "BOUNTY_STATE_REVERTEDBACK";
    case BountyState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum BountyParent {
  BOUNTY_PARENT_ISSUE = 0,
  UNRECOGNIZED = -1,
}

export function bountyParentFromJSON(object: any): BountyParent {
  switch (object) {
    case 0:
    case "BOUNTY_PARENT_ISSUE":
      return BountyParent.BOUNTY_PARENT_ISSUE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return BountyParent.UNRECOGNIZED;
  }
}

export function bountyParentToJSON(object: BountyParent): string {
  switch (object) {
    case BountyParent.BOUNTY_PARENT_ISSUE:
      return "BOUNTY_PARENT_ISSUE";
    case BountyParent.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Bounty {
  id: number;
  amount: Coin[];
  state: BountyState;
  repositoryId: number;
  parentIid: number;
  parent: BountyParent;
  expireAt: number;
  rewardedTo: string;
  createdAt: number;
  updatedAt: number;
  creator: string;
}

function createBaseBounty(): Bounty {
  return {
    id: 0,
    amount: [],
    state: 0,
    repositoryId: 0,
    parentIid: 0,
    parent: 0,
    expireAt: 0,
    rewardedTo: "",
    createdAt: 0,
    updatedAt: 0,
    creator: "",
  };
}

export const Bounty = {
  encode(message: Bounty, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.state !== 0) {
      writer.uint32(24).int32(message.state);
    }
    if (message.repositoryId !== 0) {
      writer.uint32(32).uint64(message.repositoryId);
    }
    if (message.parentIid !== 0) {
      writer.uint32(40).uint64(message.parentIid);
    }
    if (message.parent !== 0) {
      writer.uint32(48).int32(message.parent);
    }
    if (message.expireAt !== 0) {
      writer.uint32(56).int64(message.expireAt);
    }
    if (message.rewardedTo !== "") {
      writer.uint32(66).string(message.rewardedTo);
    }
    if (message.createdAt !== 0) {
      writer.uint32(72).int64(message.createdAt);
    }
    if (message.updatedAt !== 0) {
      writer.uint32(80).int64(message.updatedAt);
    }
    if (message.creator !== "") {
      writer.uint32(90).string(message.creator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Bounty {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBounty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.amount.push(Coin.decode(reader, reader.uint32()));
          break;
        case 3:
          message.state = reader.int32() as any;
          break;
        case 4:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.parentIid = longToNumber(reader.uint64() as Long);
          break;
        case 6:
          message.parent = reader.int32() as any;
          break;
        case 7:
          message.expireAt = longToNumber(reader.int64() as Long);
          break;
        case 8:
          message.rewardedTo = reader.string();
          break;
        case 9:
          message.createdAt = longToNumber(reader.int64() as Long);
          break;
        case 10:
          message.updatedAt = longToNumber(reader.int64() as Long);
          break;
        case 11:
          message.creator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Bounty {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      amount: Array.isArray(object?.amount) ? object.amount.map((e: any) => Coin.fromJSON(e)) : [],
      state: isSet(object.state) ? bountyStateFromJSON(object.state) : 0,
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      parentIid: isSet(object.parentIid) ? Number(object.parentIid) : 0,
      parent: isSet(object.parent) ? bountyParentFromJSON(object.parent) : 0,
      expireAt: isSet(object.expireAt) ? Number(object.expireAt) : 0,
      rewardedTo: isSet(object.rewardedTo) ? String(object.rewardedTo) : "",
      createdAt: isSet(object.createdAt) ? Number(object.createdAt) : 0,
      updatedAt: isSet(object.updatedAt) ? Number(object.updatedAt) : 0,
      creator: isSet(object.creator) ? String(object.creator) : "",
    };
  },

  toJSON(message: Bounty): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    if (message.amount) {
      obj.amount = message.amount.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.amount = [];
    }
    message.state !== undefined && (obj.state = bountyStateToJSON(message.state));
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.parentIid !== undefined && (obj.parentIid = Math.round(message.parentIid));
    message.parent !== undefined && (obj.parent = bountyParentToJSON(message.parent));
    message.expireAt !== undefined && (obj.expireAt = Math.round(message.expireAt));
    message.rewardedTo !== undefined && (obj.rewardedTo = message.rewardedTo);
    message.createdAt !== undefined && (obj.createdAt = Math.round(message.createdAt));
    message.updatedAt !== undefined && (obj.updatedAt = Math.round(message.updatedAt));
    message.creator !== undefined && (obj.creator = message.creator);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Bounty>, I>>(object: I): Bounty {
    const message = createBaseBounty();
    message.id = object.id ?? 0;
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    message.state = object.state ?? 0;
    message.repositoryId = object.repositoryId ?? 0;
    message.parentIid = object.parentIid ?? 0;
    message.parent = object.parent ?? 0;
    message.expireAt = object.expireAt ?? 0;
    message.rewardedTo = object.rewardedTo ?? "";
    message.createdAt = object.createdAt ?? 0;
    message.updatedAt = object.updatedAt ?? 0;
    message.creator = object.creator ?? "";
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
