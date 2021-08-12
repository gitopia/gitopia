/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "gitopia.gitopia.gitopia";

export interface Organization {
  creator: string;
  id: number;
  name: string;
  avatarUrl: string;
  followers: number[];
  following: number[];
  repositories: { [key: string]: number };
  teams: number[];
  members: { [key: string]: string };
  location: string;
  email: string;
  website: string;
  verified: boolean;
  description: string;
  createdAt: number;
  updatedAt: number;
  extensions: string;
}

export interface Organization_RepositoriesEntry {
  key: string;
  value: number;
}

export interface Organization_MembersEntry {
  key: string;
  value: string;
}

const baseOrganization: object = {
  creator: "",
  id: 0,
  name: "",
  avatarUrl: "",
  followers: 0,
  following: 0,
  teams: 0,
  location: "",
  email: "",
  website: "",
  verified: false,
  description: "",
  createdAt: 0,
  updatedAt: 0,
  extensions: "",
};

export const Organization = {
  encode(message: Organization, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.avatarUrl !== "") {
      writer.uint32(34).string(message.avatarUrl);
    }
    writer.uint32(42).fork();
    for (const v of message.followers) {
      writer.uint64(v);
    }
    writer.ldelim();
    writer.uint32(50).fork();
    for (const v of message.following) {
      writer.uint64(v);
    }
    writer.ldelim();
    Object.entries(message.repositories).forEach(([key, value]) => {
      Organization_RepositoriesEntry.encode(
        { key: key as any, value },
        writer.uint32(58).fork()
      ).ldelim();
    });
    writer.uint32(66).fork();
    for (const v of message.teams) {
      writer.uint64(v);
    }
    writer.ldelim();
    Object.entries(message.members).forEach(([key, value]) => {
      Organization_MembersEntry.encode(
        { key: key as any, value },
        writer.uint32(74).fork()
      ).ldelim();
    });
    if (message.location !== "") {
      writer.uint32(82).string(message.location);
    }
    if (message.email !== "") {
      writer.uint32(90).string(message.email);
    }
    if (message.website !== "") {
      writer.uint32(98).string(message.website);
    }
    if (message.verified === true) {
      writer.uint32(104).bool(message.verified);
    }
    if (message.description !== "") {
      writer.uint32(114).string(message.description);
    }
    if (message.createdAt !== 0) {
      writer.uint32(120).int64(message.createdAt);
    }
    if (message.updatedAt !== 0) {
      writer.uint32(128).int64(message.updatedAt);
    }
    if (message.extensions !== "") {
      writer.uint32(138).string(message.extensions);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Organization {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseOrganization } as Organization;
    message.followers = [];
    message.following = [];
    message.repositories = {};
    message.teams = [];
    message.members = {};
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
          message.avatarUrl = reader.string();
          break;
        case 5:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.followers.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.followers.push(longToNumber(reader.uint64() as Long));
          }
          break;
        case 6:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.following.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.following.push(longToNumber(reader.uint64() as Long));
          }
          break;
        case 7:
          const entry7 = Organization_RepositoriesEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry7.value !== undefined) {
            message.repositories[entry7.key] = entry7.value;
          }
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
          const entry9 = Organization_MembersEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry9.value !== undefined) {
            message.members[entry9.key] = entry9.value;
          }
          break;
        case 10:
          message.location = reader.string();
          break;
        case 11:
          message.email = reader.string();
          break;
        case 12:
          message.website = reader.string();
          break;
        case 13:
          message.verified = reader.bool();
          break;
        case 14:
          message.description = reader.string();
          break;
        case 15:
          message.createdAt = longToNumber(reader.int64() as Long);
          break;
        case 16:
          message.updatedAt = longToNumber(reader.int64() as Long);
          break;
        case 17:
          message.extensions = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Organization {
    const message = { ...baseOrganization } as Organization;
    message.followers = [];
    message.following = [];
    message.repositories = {};
    message.teams = [];
    message.members = {};
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
    if (object.avatarUrl !== undefined && object.avatarUrl !== null) {
      message.avatarUrl = String(object.avatarUrl);
    } else {
      message.avatarUrl = "";
    }
    if (object.followers !== undefined && object.followers !== null) {
      for (const e of object.followers) {
        message.followers.push(Number(e));
      }
    }
    if (object.following !== undefined && object.following !== null) {
      for (const e of object.following) {
        message.following.push(Number(e));
      }
    }
    if (object.repositories !== undefined && object.repositories !== null) {
      Object.entries(object.repositories).forEach(([key, value]) => {
        message.repositories[key] = Number(value);
      });
    }
    if (object.teams !== undefined && object.teams !== null) {
      for (const e of object.teams) {
        message.teams.push(Number(e));
      }
    }
    if (object.members !== undefined && object.members !== null) {
      Object.entries(object.members).forEach(([key, value]) => {
        message.members[key] = String(value);
      });
    }
    if (object.location !== undefined && object.location !== null) {
      message.location = String(object.location);
    } else {
      message.location = "";
    }
    if (object.email !== undefined && object.email !== null) {
      message.email = String(object.email);
    } else {
      message.email = "";
    }
    if (object.website !== undefined && object.website !== null) {
      message.website = String(object.website);
    } else {
      message.website = "";
    }
    if (object.verified !== undefined && object.verified !== null) {
      message.verified = Boolean(object.verified);
    } else {
      message.verified = false;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
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
    if (object.extensions !== undefined && object.extensions !== null) {
      message.extensions = String(object.extensions);
    } else {
      message.extensions = "";
    }
    return message;
  },

  toJSON(message: Organization): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
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
    obj.repositories = {};
    if (message.repositories) {
      Object.entries(message.repositories).forEach(([k, v]) => {
        obj.repositories[k] = v;
      });
    }
    if (message.teams) {
      obj.teams = message.teams.map((e) => e);
    } else {
      obj.teams = [];
    }
    obj.members = {};
    if (message.members) {
      Object.entries(message.members).forEach(([k, v]) => {
        obj.members[k] = v;
      });
    }
    message.location !== undefined && (obj.location = message.location);
    message.email !== undefined && (obj.email = message.email);
    message.website !== undefined && (obj.website = message.website);
    message.verified !== undefined && (obj.verified = message.verified);
    message.description !== undefined &&
      (obj.description = message.description);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt);
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt);
    message.extensions !== undefined && (obj.extensions = message.extensions);
    return obj;
  },

  fromPartial(object: DeepPartial<Organization>): Organization {
    const message = { ...baseOrganization } as Organization;
    message.followers = [];
    message.following = [];
    message.repositories = {};
    message.teams = [];
    message.members = {};
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
    if (object.repositories !== undefined && object.repositories !== null) {
      Object.entries(object.repositories).forEach(([key, value]) => {
        if (value !== undefined) {
          message.repositories[key] = Number(value);
        }
      });
    }
    if (object.teams !== undefined && object.teams !== null) {
      for (const e of object.teams) {
        message.teams.push(e);
      }
    }
    if (object.members !== undefined && object.members !== null) {
      Object.entries(object.members).forEach(([key, value]) => {
        if (value !== undefined) {
          message.members[key] = String(value);
        }
      });
    }
    if (object.location !== undefined && object.location !== null) {
      message.location = object.location;
    } else {
      message.location = "";
    }
    if (object.email !== undefined && object.email !== null) {
      message.email = object.email;
    } else {
      message.email = "";
    }
    if (object.website !== undefined && object.website !== null) {
      message.website = object.website;
    } else {
      message.website = "";
    }
    if (object.verified !== undefined && object.verified !== null) {
      message.verified = object.verified;
    } else {
      message.verified = false;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
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
    if (object.extensions !== undefined && object.extensions !== null) {
      message.extensions = object.extensions;
    } else {
      message.extensions = "";
    }
    return message;
  },
};

const baseOrganization_RepositoriesEntry: object = { key: "", value: 0 };

export const Organization_RepositoriesEntry = {
  encode(
    message: Organization_RepositoriesEntry,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(16).uint64(message.value);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): Organization_RepositoriesEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseOrganization_RepositoriesEntry,
    } as Organization_RepositoriesEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Organization_RepositoriesEntry {
    const message = {
      ...baseOrganization_RepositoriesEntry,
    } as Organization_RepositoriesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Number(object.value);
    } else {
      message.value = 0;
    }
    return message;
  },

  toJSON(message: Organization_RepositoriesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(
    object: DeepPartial<Organization_RepositoriesEntry>
  ): Organization_RepositoriesEntry {
    const message = {
      ...baseOrganization_RepositoriesEntry,
    } as Organization_RepositoriesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = 0;
    }
    return message;
  },
};

const baseOrganization_MembersEntry: object = { key: "", value: "" };

export const Organization_MembersEntry = {
  encode(
    message: Organization_MembersEntry,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): Organization_MembersEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseOrganization_MembersEntry,
    } as Organization_MembersEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Organization_MembersEntry {
    const message = {
      ...baseOrganization_MembersEntry,
    } as Organization_MembersEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    } else {
      message.value = "";
    }
    return message;
  },

  toJSON(message: Organization_MembersEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(
    object: DeepPartial<Organization_MembersEntry>
  ): Organization_MembersEntry {
    const message = {
      ...baseOrganization_MembersEntry,
    } as Organization_MembersEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = "";
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
