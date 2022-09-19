/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

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
}

export interface UserDao {
  userAddress: string;
  daoAddress: string;
}

const baseUser: object = {
  creator: "",
  id: 0,
  name: "",
  username: "",
  usernameGithub: "",
  avatarUrl: "",
  followers: "",
  following: "",
  starredRepos: 0,
  subscriptions: "",
  bio: "",
  createdAt: 0,
  updatedAt: 0,
  verified: false,
};

export const User = {
  encode(message: User, writer: Writer = Writer.create()): Writer {
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
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): User {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUser } as User;
    message.followers = [];
    message.following = [];
    message.starredRepos = [];
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
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): User {
    const message = { ...baseUser } as User;
    message.followers = [];
    message.following = [];
    message.starredRepos = [];
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
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = String(object.username);
    } else {
      message.username = "";
    }
    if (object.usernameGithub !== undefined && object.usernameGithub !== null) {
      message.usernameGithub = String(object.usernameGithub);
    } else {
      message.usernameGithub = "";
    }
    if (object.avatarUrl !== undefined && object.avatarUrl !== null) {
      message.avatarUrl = String(object.avatarUrl);
    } else {
      message.avatarUrl = "";
    }
    if (object.followers !== undefined && object.followers !== null) {
      for (const e of object.followers) {
        message.followers.push(String(e));
      }
    }
    if (object.following !== undefined && object.following !== null) {
      for (const e of object.following) {
        message.following.push(String(e));
      }
    }
    if (object.starredRepos !== undefined && object.starredRepos !== null) {
      for (const e of object.starredRepos) {
        message.starredRepos.push(Number(e));
      }
    }
    if (object.subscriptions !== undefined && object.subscriptions !== null) {
      message.subscriptions = String(object.subscriptions);
    } else {
      message.subscriptions = "";
    }
    if (object.bio !== undefined && object.bio !== null) {
      message.bio = String(object.bio);
    } else {
      message.bio = "";
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
    if (object.verified !== undefined && object.verified !== null) {
      message.verified = Boolean(object.verified);
    } else {
      message.verified = false;
    }
    return message;
  },

  toJSON(message: User): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.username !== undefined && (obj.username = message.username);
    message.usernameGithub !== undefined &&
      (obj.usernameGithub = message.usernameGithub);
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
      obj.starredRepos = message.starredRepos.map((e) => e);
    } else {
      obj.starredRepos = [];
    }
    message.subscriptions !== undefined &&
      (obj.subscriptions = message.subscriptions);
    message.bio !== undefined && (obj.bio = message.bio);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt);
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt);
    message.verified !== undefined && (obj.verified = message.verified);
    return obj;
  },

  fromPartial(object: DeepPartial<User>): User {
    const message = { ...baseUser } as User;
    message.followers = [];
    message.following = [];
    message.starredRepos = [];
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
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = object.username;
    } else {
      message.username = "";
    }
    if (object.usernameGithub !== undefined && object.usernameGithub !== null) {
      message.usernameGithub = object.usernameGithub;
    } else {
      message.usernameGithub = "";
    }
    if (object.avatarUrl !== undefined && object.avatarUrl !== null) {
      message.avatarUrl = object.avatarUrl;
    } else {
      message.avatarUrl = "";
    }
    if (object.followers !== undefined && object.followers !== null) {
      for (const e of object.followers) {
        message.followers.push(e);
      }
    }
    if (object.following !== undefined && object.following !== null) {
      for (const e of object.following) {
        message.following.push(e);
      }
    }
    if (object.starredRepos !== undefined && object.starredRepos !== null) {
      for (const e of object.starredRepos) {
        message.starredRepos.push(e);
      }
    }
    if (object.subscriptions !== undefined && object.subscriptions !== null) {
      message.subscriptions = object.subscriptions;
    } else {
      message.subscriptions = "";
    }
    if (object.bio !== undefined && object.bio !== null) {
      message.bio = object.bio;
    } else {
      message.bio = "";
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
    if (object.verified !== undefined && object.verified !== null) {
      message.verified = object.verified;
    } else {
      message.verified = false;
    }
    return message;
  },
};

const baseUserDao: object = { userAddress: "", daoAddress: "" };

export const UserDao = {
  encode(message: UserDao, writer: Writer = Writer.create()): Writer {
    if (message.userAddress !== "") {
      writer.uint32(10).string(message.userAddress);
    }
    if (message.daoAddress !== "") {
      writer.uint32(18).string(message.daoAddress);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): UserDao {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUserDao } as UserDao;
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
    const message = { ...baseUserDao } as UserDao;
    if (object.userAddress !== undefined && object.userAddress !== null) {
      message.userAddress = String(object.userAddress);
    } else {
      message.userAddress = "";
    }
    if (object.daoAddress !== undefined && object.daoAddress !== null) {
      message.daoAddress = String(object.daoAddress);
    } else {
      message.daoAddress = "";
    }
    return message;
  },

  toJSON(message: UserDao): unknown {
    const obj: any = {};
    message.userAddress !== undefined &&
      (obj.userAddress = message.userAddress);
    message.daoAddress !== undefined && (obj.daoAddress = message.daoAddress);
    return obj;
  },

  fromPartial(object: DeepPartial<UserDao>): UserDao {
    const message = { ...baseUserDao } as UserDao;
    if (object.userAddress !== undefined && object.userAddress !== null) {
      message.userAddress = object.userAddress;
    } else {
      message.userAddress = "";
    }
    if (object.daoAddress !== undefined && object.daoAddress !== null) {
      message.daoAddress = object.daoAddress;
    } else {
      message.daoAddress = "";
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
