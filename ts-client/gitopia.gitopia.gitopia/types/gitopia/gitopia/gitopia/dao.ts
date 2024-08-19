/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "gitopia.gitopia.gitopia";

export interface Dao {
  creator: string;
  id: number;
  address: string;
  name: string;
  avatarUrl: string;
  followers: string[];
  following: string[];
  teams: number[];
  location: string;
  website: string;
  verified: boolean;
  description: string;
  createdAt: number;
  updatedAt: number;
  pinnedRepos: number[];
}

function createBaseDao(): Dao {
  return {
    creator: "",
    id: 0,
    address: "",
    name: "",
    avatarUrl: "",
    followers: [],
    following: [],
    teams: [],
    location: "",
    website: "",
    verified: false,
    description: "",
    createdAt: 0,
    updatedAt: 0,
    pinnedRepos: [],
  };
}

export const Dao = {
  encode(message: Dao, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.address !== "") {
      writer.uint32(26).string(message.address);
    }
    if (message.name !== "") {
      writer.uint32(34).string(message.name);
    }
    if (message.avatarUrl !== "") {
      writer.uint32(42).string(message.avatarUrl);
    }
    for (const v of message.followers) {
      writer.uint32(50).string(v!);
    }
    for (const v of message.following) {
      writer.uint32(58).string(v!);
    }
    writer.uint32(66).fork();
    for (const v of message.teams) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.location !== "") {
      writer.uint32(74).string(message.location);
    }
    if (message.website !== "") {
      writer.uint32(82).string(message.website);
    }
    if (message.verified === true) {
      writer.uint32(88).bool(message.verified);
    }
    if (message.description !== "") {
      writer.uint32(98).string(message.description);
    }
    if (message.createdAt !== 0) {
      writer.uint32(104).int64(message.createdAt);
    }
    if (message.updatedAt !== 0) {
      writer.uint32(112).int64(message.updatedAt);
    }
    writer.uint32(122).fork();
    for (const v of message.pinnedRepos) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Dao {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDao();
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
          message.address = reader.string();
          break;
        case 4:
          message.name = reader.string();
          break;
        case 5:
          message.avatarUrl = reader.string();
          break;
        case 6:
          message.followers.push(reader.string());
          break;
        case 7:
          message.following.push(reader.string());
          break;
        case 8:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.teams.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.teams.push(longToNumber(reader.uint64() as Long));
          }
          break;
        case 9:
          message.location = reader.string();
          break;
        case 10:
          message.website = reader.string();
          break;
        case 11:
          message.verified = reader.bool();
          break;
        case 12:
          message.description = reader.string();
          break;
        case 13:
          message.createdAt = longToNumber(reader.int64() as Long);
          break;
        case 14:
          message.updatedAt = longToNumber(reader.int64() as Long);
          break;
        case 15:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.pinnedRepos.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.pinnedRepos.push(longToNumber(reader.uint64() as Long));
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Dao {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
      address: isSet(object.address) ? String(object.address) : "",
      name: isSet(object.name) ? String(object.name) : "",
      avatarUrl: isSet(object.avatarUrl) ? String(object.avatarUrl) : "",
      followers: Array.isArray(object?.followers) ? object.followers.map((e: any) => String(e)) : [],
      following: Array.isArray(object?.following) ? object.following.map((e: any) => String(e)) : [],
      teams: Array.isArray(object?.teams) ? object.teams.map((e: any) => Number(e)) : [],
      location: isSet(object.location) ? String(object.location) : "",
      website: isSet(object.website) ? String(object.website) : "",
      verified: isSet(object.verified) ? Boolean(object.verified) : false,
      description: isSet(object.description) ? String(object.description) : "",
      createdAt: isSet(object.createdAt) ? Number(object.createdAt) : 0,
      updatedAt: isSet(object.updatedAt) ? Number(object.updatedAt) : 0,
      pinnedRepos: Array.isArray(object?.pinnedRepos) ? object.pinnedRepos.map((e: any) => Number(e)) : [],
    };
  },

  toJSON(message: Dao): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.address !== undefined && (obj.address = message.address);
    message.name !== undefined && (obj.name = message.name);
    message.avatarUrl !== undefined && (obj.avatarUrl = message.avatarUrl);
    if (message.followers) {
      obj.followers = message.followers.map((e) => e);
    } else {
      obj.followers = [];
    }
    if (message.following) {
      obj.following = message.following.map((e) => e);
    } else {
      obj.following = [];
    }
    if (message.teams) {
      obj.teams = message.teams.map((e) => Math.round(e));
    } else {
      obj.teams = [];
    }
    message.location !== undefined && (obj.location = message.location);
    message.website !== undefined && (obj.website = message.website);
    message.verified !== undefined && (obj.verified = message.verified);
    message.description !== undefined && (obj.description = message.description);
    message.createdAt !== undefined && (obj.createdAt = Math.round(message.createdAt));
    message.updatedAt !== undefined && (obj.updatedAt = Math.round(message.updatedAt));
    if (message.pinnedRepos) {
      obj.pinnedRepos = message.pinnedRepos.map((e) => Math.round(e));
    } else {
      obj.pinnedRepos = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Dao>, I>>(object: I): Dao {
    const message = createBaseDao();
    message.creator = object.creator ?? "";
    message.id = object.id ?? 0;
    message.address = object.address ?? "";
    message.name = object.name ?? "";
    message.avatarUrl = object.avatarUrl ?? "";
    message.followers = object.followers?.map((e) => e) || [];
    message.following = object.following?.map((e) => e) || [];
    message.teams = object.teams?.map((e) => e) || [];
    message.location = object.location ?? "";
    message.website = object.website ?? "";
    message.verified = object.verified ?? false;
    message.description = object.description ?? "";
    message.createdAt = object.createdAt ?? 0;
    message.updatedAt = object.updatedAt ?? 0;
    message.pinnedRepos = object.pinnedRepos?.map((e) => e) || [];
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
