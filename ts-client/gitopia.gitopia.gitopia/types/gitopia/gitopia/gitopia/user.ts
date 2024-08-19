/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "gitopia.gitopia.gitopia";

export interface User {
  creator: string;
  id: number;
  name: string;
  username: string;
  usernameGithub: string;
  avatarUrl: string;
  followers: string[];
  following: string[];
  starredRepos: number[];
  subscriptions: string;
  bio: string;
  createdAt: number;
  updatedAt: number;
  verified: boolean;
  pinnedRepos: number[];
}

export interface UserDao {
  userAddress: string;
  daoAddress: string;
}

function createBaseUser(): User {
  return {
    creator: "",
    id: 0,
    name: "",
    username: "",
    usernameGithub: "",
    avatarUrl: "",
    followers: [],
    following: [],
    starredRepos: [],
    subscriptions: "",
    bio: "",
    createdAt: 0,
    updatedAt: 0,
    verified: false,
    pinnedRepos: [],
  };
}

export const User = {
  encode(message: User, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.username !== "") {
      writer.uint32(34).string(message.username);
    }
    if (message.usernameGithub !== "") {
      writer.uint32(42).string(message.usernameGithub);
    }
    if (message.avatarUrl !== "") {
      writer.uint32(50).string(message.avatarUrl);
    }
    for (const v of message.followers) {
      writer.uint32(58).string(v!);
    }
    for (const v of message.following) {
      writer.uint32(66).string(v!);
    }
    writer.uint32(74).fork();
    for (const v of message.starredRepos) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.subscriptions !== "") {
      writer.uint32(82).string(message.subscriptions);
    }
    if (message.bio !== "") {
      writer.uint32(90).string(message.bio);
    }
    if (message.createdAt !== 0) {
      writer.uint32(96).int64(message.createdAt);
    }
    if (message.updatedAt !== 0) {
      writer.uint32(104).int64(message.updatedAt);
    }
    if (message.verified === true) {
      writer.uint32(112).bool(message.verified);
    }
    writer.uint32(122).fork();
    for (const v of message.pinnedRepos) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): User {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUser();
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
          message.name = reader.string();
          break;
        case 4:
          message.username = reader.string();
          break;
        case 5:
          message.usernameGithub = reader.string();
          break;
        case 6:
          message.avatarUrl = reader.string();
          break;
        case 7:
          message.followers.push(reader.string());
          break;
        case 8:
          message.following.push(reader.string());
          break;
        case 9:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.starredRepos.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.starredRepos.push(longToNumber(reader.uint64() as Long));
          }
          break;
        case 10:
          message.subscriptions = reader.string();
          break;
        case 11:
          message.bio = reader.string();
          break;
        case 12:
          message.createdAt = longToNumber(reader.int64() as Long);
          break;
        case 13:
          message.updatedAt = longToNumber(reader.int64() as Long);
          break;
        case 14:
          message.verified = reader.bool();
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

  fromJSON(object: any): User {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
      name: isSet(object.name) ? String(object.name) : "",
      username: isSet(object.username) ? String(object.username) : "",
      usernameGithub: isSet(object.usernameGithub) ? String(object.usernameGithub) : "",
      avatarUrl: isSet(object.avatarUrl) ? String(object.avatarUrl) : "",
      followers: Array.isArray(object?.followers) ? object.followers.map((e: any) => String(e)) : [],
      following: Array.isArray(object?.following) ? object.following.map((e: any) => String(e)) : [],
      starredRepos: Array.isArray(object?.starredRepos) ? object.starredRepos.map((e: any) => Number(e)) : [],
      subscriptions: isSet(object.subscriptions) ? String(object.subscriptions) : "",
      bio: isSet(object.bio) ? String(object.bio) : "",
      createdAt: isSet(object.createdAt) ? Number(object.createdAt) : 0,
      updatedAt: isSet(object.updatedAt) ? Number(object.updatedAt) : 0,
      verified: isSet(object.verified) ? Boolean(object.verified) : false,
      pinnedRepos: Array.isArray(object?.pinnedRepos) ? object.pinnedRepos.map((e: any) => Number(e)) : [],
    };
  },

  toJSON(message: User): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.name !== undefined && (obj.name = message.name);
    message.username !== undefined && (obj.username = message.username);
    message.usernameGithub !== undefined && (obj.usernameGithub = message.usernameGithub);
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
    if (message.starredRepos) {
      obj.starredRepos = message.starredRepos.map((e) => Math.round(e));
    } else {
      obj.starredRepos = [];
    }
    message.subscriptions !== undefined && (obj.subscriptions = message.subscriptions);
    message.bio !== undefined && (obj.bio = message.bio);
    message.createdAt !== undefined && (obj.createdAt = Math.round(message.createdAt));
    message.updatedAt !== undefined && (obj.updatedAt = Math.round(message.updatedAt));
    message.verified !== undefined && (obj.verified = message.verified);
    if (message.pinnedRepos) {
      obj.pinnedRepos = message.pinnedRepos.map((e) => Math.round(e));
    } else {
      obj.pinnedRepos = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<User>, I>>(object: I): User {
    const message = createBaseUser();
    message.creator = object.creator ?? "";
    message.id = object.id ?? 0;
    message.name = object.name ?? "";
    message.username = object.username ?? "";
    message.usernameGithub = object.usernameGithub ?? "";
    message.avatarUrl = object.avatarUrl ?? "";
    message.followers = object.followers?.map((e) => e) || [];
    message.following = object.following?.map((e) => e) || [];
    message.starredRepos = object.starredRepos?.map((e) => e) || [];
    message.subscriptions = object.subscriptions ?? "";
    message.bio = object.bio ?? "";
    message.createdAt = object.createdAt ?? 0;
    message.updatedAt = object.updatedAt ?? 0;
    message.verified = object.verified ?? false;
    message.pinnedRepos = object.pinnedRepos?.map((e) => e) || [];
    return message;
  },
};

function createBaseUserDao(): UserDao {
  return { userAddress: "", daoAddress: "" };
}

export const UserDao = {
  encode(message: UserDao, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userAddress !== "") {
      writer.uint32(10).string(message.userAddress);
    }
    if (message.daoAddress !== "") {
      writer.uint32(18).string(message.daoAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserDao {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserDao();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userAddress = reader.string();
          break;
        case 2:
          message.daoAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UserDao {
    return {
      userAddress: isSet(object.userAddress) ? String(object.userAddress) : "",
      daoAddress: isSet(object.daoAddress) ? String(object.daoAddress) : "",
    };
  },

  toJSON(message: UserDao): unknown {
    const obj: any = {};
    message.userAddress !== undefined && (obj.userAddress = message.userAddress);
    message.daoAddress !== undefined && (obj.daoAddress = message.daoAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UserDao>, I>>(object: I): UserDao {
    const message = createBaseUserDao();
    message.userAddress = object.userAddress ?? "";
    message.daoAddress = object.daoAddress ?? "";
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
