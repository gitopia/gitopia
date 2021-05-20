/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "gitopia.gitopia.gitopia";

export interface Repository {
  creator: string;
  id: number;
  name: string;
  owner: string;
  description: string;
  forks: string;
  branches: string;
  tags: string;
  subscribers: string;
  commits: string;
  issuesOpen: string;
  issuesClosed: string;
  pulls: string;
  labels: string;
  releases: string;
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
  stargazers: string;
  archived: string;
  license: string;
  defaultBranch: string;
  extensions: string;
}

const baseRepository: object = {
  creator: "",
  id: 0,
  name: "",
  owner: "",
  description: "",
  forks: "",
  branches: "",
  tags: "",
  subscribers: "",
  commits: "",
  issuesOpen: "",
  issuesClosed: "",
  pulls: "",
  labels: "",
  releases: "",
  createdAt: "",
  updatedAt: "",
  pushedAt: "",
  stargazers: "",
  archived: "",
  license: "",
  defaultBranch: "",
  extensions: "",
};

export const Repository = {
  encode(message: Repository, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.owner !== "") {
      writer.uint32(34).string(message.owner);
    }
    if (message.description !== "") {
      writer.uint32(42).string(message.description);
    }
    if (message.forks !== "") {
      writer.uint32(50).string(message.forks);
    }
    if (message.branches !== "") {
      writer.uint32(58).string(message.branches);
    }
    if (message.tags !== "") {
      writer.uint32(66).string(message.tags);
    }
    if (message.subscribers !== "") {
      writer.uint32(74).string(message.subscribers);
    }
    if (message.commits !== "") {
      writer.uint32(82).string(message.commits);
    }
    if (message.issuesOpen !== "") {
      writer.uint32(90).string(message.issuesOpen);
    }
    if (message.issuesClosed !== "") {
      writer.uint32(98).string(message.issuesClosed);
    }
    if (message.pulls !== "") {
      writer.uint32(106).string(message.pulls);
    }
    if (message.labels !== "") {
      writer.uint32(114).string(message.labels);
    }
    if (message.releases !== "") {
      writer.uint32(122).string(message.releases);
    }
    if (message.createdAt !== "") {
      writer.uint32(130).string(message.createdAt);
    }
    if (message.updatedAt !== "") {
      writer.uint32(138).string(message.updatedAt);
    }
    if (message.pushedAt !== "") {
      writer.uint32(146).string(message.pushedAt);
    }
    if (message.stargazers !== "") {
      writer.uint32(154).string(message.stargazers);
    }
    if (message.archived !== "") {
      writer.uint32(162).string(message.archived);
    }
    if (message.license !== "") {
      writer.uint32(170).string(message.license);
    }
    if (message.defaultBranch !== "") {
      writer.uint32(178).string(message.defaultBranch);
    }
    if (message.extensions !== "") {
      writer.uint32(186).string(message.extensions);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Repository {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRepository } as Repository;
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
          message.owner = reader.string();
          break;
        case 5:
          message.description = reader.string();
          break;
        case 6:
          message.forks = reader.string();
          break;
        case 7:
          message.branches = reader.string();
          break;
        case 8:
          message.tags = reader.string();
          break;
        case 9:
          message.subscribers = reader.string();
          break;
        case 10:
          message.commits = reader.string();
          break;
        case 11:
          message.issuesOpen = reader.string();
          break;
        case 12:
          message.issuesClosed = reader.string();
          break;
        case 13:
          message.pulls = reader.string();
          break;
        case 14:
          message.labels = reader.string();
          break;
        case 15:
          message.releases = reader.string();
          break;
        case 16:
          message.createdAt = reader.string();
          break;
        case 17:
          message.updatedAt = reader.string();
          break;
        case 18:
          message.pushedAt = reader.string();
          break;
        case 19:
          message.stargazers = reader.string();
          break;
        case 20:
          message.archived = reader.string();
          break;
        case 21:
          message.license = reader.string();
          break;
        case 22:
          message.defaultBranch = reader.string();
          break;
        case 23:
          message.extensions = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Repository {
    const message = { ...baseRepository } as Repository;
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
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner);
    } else {
      message.owner = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.forks !== undefined && object.forks !== null) {
      message.forks = String(object.forks);
    } else {
      message.forks = "";
    }
    if (object.branches !== undefined && object.branches !== null) {
      message.branches = String(object.branches);
    } else {
      message.branches = "";
    }
    if (object.tags !== undefined && object.tags !== null) {
      message.tags = String(object.tags);
    } else {
      message.tags = "";
    }
    if (object.subscribers !== undefined && object.subscribers !== null) {
      message.subscribers = String(object.subscribers);
    } else {
      message.subscribers = "";
    }
    if (object.commits !== undefined && object.commits !== null) {
      message.commits = String(object.commits);
    } else {
      message.commits = "";
    }
    if (object.issuesOpen !== undefined && object.issuesOpen !== null) {
      message.issuesOpen = String(object.issuesOpen);
    } else {
      message.issuesOpen = "";
    }
    if (object.issuesClosed !== undefined && object.issuesClosed !== null) {
      message.issuesClosed = String(object.issuesClosed);
    } else {
      message.issuesClosed = "";
    }
    if (object.pulls !== undefined && object.pulls !== null) {
      message.pulls = String(object.pulls);
    } else {
      message.pulls = "";
    }
    if (object.labels !== undefined && object.labels !== null) {
      message.labels = String(object.labels);
    } else {
      message.labels = "";
    }
    if (object.releases !== undefined && object.releases !== null) {
      message.releases = String(object.releases);
    } else {
      message.releases = "";
    }
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = String(object.createdAt);
    } else {
      message.createdAt = "";
    }
    if (object.updatedAt !== undefined && object.updatedAt !== null) {
      message.updatedAt = String(object.updatedAt);
    } else {
      message.updatedAt = "";
    }
    if (object.pushedAt !== undefined && object.pushedAt !== null) {
      message.pushedAt = String(object.pushedAt);
    } else {
      message.pushedAt = "";
    }
    if (object.stargazers !== undefined && object.stargazers !== null) {
      message.stargazers = String(object.stargazers);
    } else {
      message.stargazers = "";
    }
    if (object.archived !== undefined && object.archived !== null) {
      message.archived = String(object.archived);
    } else {
      message.archived = "";
    }
    if (object.license !== undefined && object.license !== null) {
      message.license = String(object.license);
    } else {
      message.license = "";
    }
    if (object.defaultBranch !== undefined && object.defaultBranch !== null) {
      message.defaultBranch = String(object.defaultBranch);
    } else {
      message.defaultBranch = "";
    }
    if (object.extensions !== undefined && object.extensions !== null) {
      message.extensions = String(object.extensions);
    } else {
      message.extensions = "";
    }
    return message;
  },

  toJSON(message: Repository): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.owner !== undefined && (obj.owner = message.owner);
    message.description !== undefined &&
      (obj.description = message.description);
    message.forks !== undefined && (obj.forks = message.forks);
    message.branches !== undefined && (obj.branches = message.branches);
    message.tags !== undefined && (obj.tags = message.tags);
    message.subscribers !== undefined &&
      (obj.subscribers = message.subscribers);
    message.commits !== undefined && (obj.commits = message.commits);
    message.issuesOpen !== undefined && (obj.issuesOpen = message.issuesOpen);
    message.issuesClosed !== undefined &&
      (obj.issuesClosed = message.issuesClosed);
    message.pulls !== undefined && (obj.pulls = message.pulls);
    message.labels !== undefined && (obj.labels = message.labels);
    message.releases !== undefined && (obj.releases = message.releases);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt);
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt);
    message.pushedAt !== undefined && (obj.pushedAt = message.pushedAt);
    message.stargazers !== undefined && (obj.stargazers = message.stargazers);
    message.archived !== undefined && (obj.archived = message.archived);
    message.license !== undefined && (obj.license = message.license);
    message.defaultBranch !== undefined &&
      (obj.defaultBranch = message.defaultBranch);
    message.extensions !== undefined && (obj.extensions = message.extensions);
    return obj;
  },

  fromPartial(object: DeepPartial<Repository>): Repository {
    const message = { ...baseRepository } as Repository;
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
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    } else {
      message.owner = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.forks !== undefined && object.forks !== null) {
      message.forks = object.forks;
    } else {
      message.forks = "";
    }
    if (object.branches !== undefined && object.branches !== null) {
      message.branches = object.branches;
    } else {
      message.branches = "";
    }
    if (object.tags !== undefined && object.tags !== null) {
      message.tags = object.tags;
    } else {
      message.tags = "";
    }
    if (object.subscribers !== undefined && object.subscribers !== null) {
      message.subscribers = object.subscribers;
    } else {
      message.subscribers = "";
    }
    if (object.commits !== undefined && object.commits !== null) {
      message.commits = object.commits;
    } else {
      message.commits = "";
    }
    if (object.issuesOpen !== undefined && object.issuesOpen !== null) {
      message.issuesOpen = object.issuesOpen;
    } else {
      message.issuesOpen = "";
    }
    if (object.issuesClosed !== undefined && object.issuesClosed !== null) {
      message.issuesClosed = object.issuesClosed;
    } else {
      message.issuesClosed = "";
    }
    if (object.pulls !== undefined && object.pulls !== null) {
      message.pulls = object.pulls;
    } else {
      message.pulls = "";
    }
    if (object.labels !== undefined && object.labels !== null) {
      message.labels = object.labels;
    } else {
      message.labels = "";
    }
    if (object.releases !== undefined && object.releases !== null) {
      message.releases = object.releases;
    } else {
      message.releases = "";
    }
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = object.createdAt;
    } else {
      message.createdAt = "";
    }
    if (object.updatedAt !== undefined && object.updatedAt !== null) {
      message.updatedAt = object.updatedAt;
    } else {
      message.updatedAt = "";
    }
    if (object.pushedAt !== undefined && object.pushedAt !== null) {
      message.pushedAt = object.pushedAt;
    } else {
      message.pushedAt = "";
    }
    if (object.stargazers !== undefined && object.stargazers !== null) {
      message.stargazers = object.stargazers;
    } else {
      message.stargazers = "";
    }
    if (object.archived !== undefined && object.archived !== null) {
      message.archived = object.archived;
    } else {
      message.archived = "";
    }
    if (object.license !== undefined && object.license !== null) {
      message.license = object.license;
    } else {
      message.license = "";
    }
    if (object.defaultBranch !== undefined && object.defaultBranch !== null) {
      message.defaultBranch = object.defaultBranch;
    } else {
      message.defaultBranch = "";
    }
    if (object.extensions !== undefined && object.extensions !== null) {
      message.extensions = object.extensions;
    } else {
      message.extensions = "";
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
