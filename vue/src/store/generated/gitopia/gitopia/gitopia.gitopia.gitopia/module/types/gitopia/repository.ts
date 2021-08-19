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
  forks: number[];
  branches: RepositoryBranch[];
  tags: string;
  subscribers: string;
  commits: string;
  issues: RepositoryIssue[];
  pullRequests: RepositoryPullRequest[];
  issuesCount: number;
  pullsCount: number;
  labels: string;
  releases: string;
  createdAt: number;
  updatedAt: number;
  pushedAt: number;
  stargazers: number[];
  archived: boolean;
  license: string;
  defaultBranch: string;
  parent: number;
  fork: boolean;
  collaborators: RepositoryCollaborator[];
  extensions: string;
}

export interface RepositoryBranch {
  name: string;
  sha: string;
}

export interface RepositoryIssue {
  iid: number;
  id: number;
}

export interface RepositoryPullRequest {
  iid: number;
  id: number;
}

export interface RepositoryCollaborator {
  id: string;
  permission: string;
}

const baseRepository: object = {
  creator: "",
  id: 0,
  name: "",
  owner: "",
  description: "",
  forks: 0,
  tags: "",
  subscribers: "",
  commits: "",
  issuesCount: 0,
  pullsCount: 0,
  labels: "",
  releases: "",
  createdAt: 0,
  updatedAt: 0,
  pushedAt: 0,
  stargazers: 0,
  archived: false,
  license: "",
  defaultBranch: "",
  parent: 0,
  fork: false,
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
    writer.uint32(50).fork();
    for (const v of message.forks) {
      writer.uint64(v);
    }
    writer.ldelim();
    for (const v of message.branches) {
      RepositoryBranch.encode(v!, writer.uint32(58).fork()).ldelim();
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
    for (const v of message.issues) {
      RepositoryIssue.encode(v!, writer.uint32(90).fork()).ldelim();
    }
    for (const v of message.pullRequests) {
      RepositoryPullRequest.encode(v!, writer.uint32(98).fork()).ldelim();
    }
    if (message.issuesCount !== 0) {
      writer.uint32(104).uint64(message.issuesCount);
    }
    if (message.pullsCount !== 0) {
      writer.uint32(112).uint64(message.pullsCount);
    }
    if (message.labels !== "") {
      writer.uint32(122).string(message.labels);
    }
    if (message.releases !== "") {
      writer.uint32(130).string(message.releases);
    }
    if (message.createdAt !== 0) {
      writer.uint32(136).int64(message.createdAt);
    }
    if (message.updatedAt !== 0) {
      writer.uint32(144).int64(message.updatedAt);
    }
    if (message.pushedAt !== 0) {
      writer.uint32(152).int64(message.pushedAt);
    }
    writer.uint32(162).fork();
    for (const v of message.stargazers) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.archived === true) {
      writer.uint32(168).bool(message.archived);
    }
    if (message.license !== "") {
      writer.uint32(178).string(message.license);
    }
    if (message.defaultBranch !== "") {
      writer.uint32(186).string(message.defaultBranch);
    }
    if (message.parent !== 0) {
      writer.uint32(192).uint64(message.parent);
    }
    if (message.fork === true) {
      writer.uint32(200).bool(message.fork);
    }
    for (const v of message.collaborators) {
      RepositoryCollaborator.encode(v!, writer.uint32(210).fork()).ldelim();
    }
    if (message.extensions !== "") {
      writer.uint32(218).string(message.extensions);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Repository {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRepository } as Repository;
    message.forks = [];
    message.branches = [];
    message.issues = [];
    message.pullRequests = [];
    message.stargazers = [];
    message.collaborators = [];
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
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.forks.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.forks.push(longToNumber(reader.uint64() as Long));
          }
          break;
        case 7:
          message.branches.push(
            RepositoryBranch.decode(reader, reader.uint32())
          );
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
          message.issues.push(RepositoryIssue.decode(reader, reader.uint32()));
          break;
        case 12:
          message.pullRequests.push(
            RepositoryPullRequest.decode(reader, reader.uint32())
          );
          break;
        case 13:
          message.issuesCount = longToNumber(reader.uint64() as Long);
          break;
        case 14:
          message.pullsCount = longToNumber(reader.uint64() as Long);
          break;
        case 15:
          message.labels = reader.string();
          break;
        case 16:
          message.releases = reader.string();
          break;
        case 17:
          message.createdAt = longToNumber(reader.int64() as Long);
          break;
        case 18:
          message.updatedAt = longToNumber(reader.int64() as Long);
          break;
        case 19:
          message.pushedAt = longToNumber(reader.int64() as Long);
          break;
        case 20:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.stargazers.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.stargazers.push(longToNumber(reader.uint64() as Long));
          }
          break;
        case 21:
          message.archived = reader.bool();
          break;
        case 22:
          message.license = reader.string();
          break;
        case 23:
          message.defaultBranch = reader.string();
          break;
        case 24:
          message.parent = longToNumber(reader.uint64() as Long);
          break;
        case 25:
          message.fork = reader.bool();
          break;
        case 26:
          message.collaborators.push(
            RepositoryCollaborator.decode(reader, reader.uint32())
          );
          break;
        case 27:
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
    message.forks = [];
    message.branches = [];
    message.issues = [];
    message.pullRequests = [];
    message.stargazers = [];
    message.collaborators = [];
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
      for (const e of object.forks) {
        message.forks.push(Number(e));
      }
    }
    if (object.branches !== undefined && object.branches !== null) {
      for (const e of object.branches) {
        message.branches.push(RepositoryBranch.fromJSON(e));
      }
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
    if (object.issues !== undefined && object.issues !== null) {
      for (const e of object.issues) {
        message.issues.push(RepositoryIssue.fromJSON(e));
      }
    }
    if (object.pullRequests !== undefined && object.pullRequests !== null) {
      for (const e of object.pullRequests) {
        message.pullRequests.push(RepositoryPullRequest.fromJSON(e));
      }
    }
    if (object.issuesCount !== undefined && object.issuesCount !== null) {
      message.issuesCount = Number(object.issuesCount);
    } else {
      message.issuesCount = 0;
    }
    if (object.pullsCount !== undefined && object.pullsCount !== null) {
      message.pullsCount = Number(object.pullsCount);
    } else {
      message.pullsCount = 0;
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
      message.createdAt = Number(object.createdAt);
    } else {
      message.createdAt = 0;
    }
    if (object.updatedAt !== undefined && object.updatedAt !== null) {
      message.updatedAt = Number(object.updatedAt);
    } else {
      message.updatedAt = 0;
    }
    if (object.pushedAt !== undefined && object.pushedAt !== null) {
      message.pushedAt = Number(object.pushedAt);
    } else {
      message.pushedAt = 0;
    }
    if (object.stargazers !== undefined && object.stargazers !== null) {
      for (const e of object.stargazers) {
        message.stargazers.push(Number(e));
      }
    }
    if (object.archived !== undefined && object.archived !== null) {
      message.archived = Boolean(object.archived);
    } else {
      message.archived = false;
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
    if (object.parent !== undefined && object.parent !== null) {
      message.parent = Number(object.parent);
    } else {
      message.parent = 0;
    }
    if (object.fork !== undefined && object.fork !== null) {
      message.fork = Boolean(object.fork);
    } else {
      message.fork = false;
    }
    if (object.collaborators !== undefined && object.collaborators !== null) {
      for (const e of object.collaborators) {
        message.collaborators.push(RepositoryCollaborator.fromJSON(e));
      }
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
    if (message.forks) {
      obj.forks = message.forks.map((e) => e);
    } else {
      obj.forks = [];
    }
    if (message.branches) {
      obj.branches = message.branches.map((e) =>
        e ? RepositoryBranch.toJSON(e) : undefined
      );
    } else {
      obj.branches = [];
    }
    message.tags !== undefined && (obj.tags = message.tags);
    message.subscribers !== undefined &&
      (obj.subscribers = message.subscribers);
    message.commits !== undefined && (obj.commits = message.commits);
    if (message.issues) {
      obj.issues = message.issues.map((e) =>
        e ? RepositoryIssue.toJSON(e) : undefined
      );
    } else {
      obj.issues = [];
    }
    if (message.pullRequests) {
      obj.pullRequests = message.pullRequests.map((e) =>
        e ? RepositoryPullRequest.toJSON(e) : undefined
      );
    } else {
      obj.pullRequests = [];
    }
    message.issuesCount !== undefined &&
      (obj.issuesCount = message.issuesCount);
    message.pullsCount !== undefined && (obj.pullsCount = message.pullsCount);
    message.labels !== undefined && (obj.labels = message.labels);
    message.releases !== undefined && (obj.releases = message.releases);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt);
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt);
    message.pushedAt !== undefined && (obj.pushedAt = message.pushedAt);
    if (message.stargazers) {
      obj.stargazers = message.stargazers.map((e) => e);
    } else {
      obj.stargazers = [];
    }
    message.archived !== undefined && (obj.archived = message.archived);
    message.license !== undefined && (obj.license = message.license);
    message.defaultBranch !== undefined &&
      (obj.defaultBranch = message.defaultBranch);
    message.parent !== undefined && (obj.parent = message.parent);
    message.fork !== undefined && (obj.fork = message.fork);
    if (message.collaborators) {
      obj.collaborators = message.collaborators.map((e) =>
        e ? RepositoryCollaborator.toJSON(e) : undefined
      );
    } else {
      obj.collaborators = [];
    }
    message.extensions !== undefined && (obj.extensions = message.extensions);
    return obj;
  },

  fromPartial(object: DeepPartial<Repository>): Repository {
    const message = { ...baseRepository } as Repository;
    message.forks = [];
    message.branches = [];
    message.issues = [];
    message.pullRequests = [];
    message.stargazers = [];
    message.collaborators = [];
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
      for (const e of object.forks) {
        message.forks.push(e);
      }
    }
    if (object.branches !== undefined && object.branches !== null) {
      for (const e of object.branches) {
        message.branches.push(RepositoryBranch.fromPartial(e));
      }
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
    if (object.issues !== undefined && object.issues !== null) {
      for (const e of object.issues) {
        message.issues.push(RepositoryIssue.fromPartial(e));
      }
    }
    if (object.pullRequests !== undefined && object.pullRequests !== null) {
      for (const e of object.pullRequests) {
        message.pullRequests.push(RepositoryPullRequest.fromPartial(e));
      }
    }
    if (object.issuesCount !== undefined && object.issuesCount !== null) {
      message.issuesCount = object.issuesCount;
    } else {
      message.issuesCount = 0;
    }
    if (object.pullsCount !== undefined && object.pullsCount !== null) {
      message.pullsCount = object.pullsCount;
    } else {
      message.pullsCount = 0;
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
      message.createdAt = 0;
    }
    if (object.updatedAt !== undefined && object.updatedAt !== null) {
      message.updatedAt = object.updatedAt;
    } else {
      message.updatedAt = 0;
    }
    if (object.pushedAt !== undefined && object.pushedAt !== null) {
      message.pushedAt = object.pushedAt;
    } else {
      message.pushedAt = 0;
    }
    if (object.stargazers !== undefined && object.stargazers !== null) {
      for (const e of object.stargazers) {
        message.stargazers.push(e);
      }
    }
    if (object.archived !== undefined && object.archived !== null) {
      message.archived = object.archived;
    } else {
      message.archived = false;
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
    if (object.parent !== undefined && object.parent !== null) {
      message.parent = object.parent;
    } else {
      message.parent = 0;
    }
    if (object.fork !== undefined && object.fork !== null) {
      message.fork = object.fork;
    } else {
      message.fork = false;
    }
    if (object.collaborators !== undefined && object.collaborators !== null) {
      for (const e of object.collaborators) {
        message.collaborators.push(RepositoryCollaborator.fromPartial(e));
      }
    }
    if (object.extensions !== undefined && object.extensions !== null) {
      message.extensions = object.extensions;
    } else {
      message.extensions = "";
    }
    return message;
  },
};

const baseRepositoryBranch: object = { name: "", sha: "" };

export const RepositoryBranch = {
  encode(message: RepositoryBranch, writer: Writer = Writer.create()): Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.sha !== "") {
      writer.uint32(18).string(message.sha);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RepositoryBranch {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRepositoryBranch } as RepositoryBranch;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.sha = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RepositoryBranch {
    const message = { ...baseRepositoryBranch } as RepositoryBranch;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.sha !== undefined && object.sha !== null) {
      message.sha = String(object.sha);
    } else {
      message.sha = "";
    }
    return message;
  },

  toJSON(message: RepositoryBranch): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.sha !== undefined && (obj.sha = message.sha);
    return obj;
  },

  fromPartial(object: DeepPartial<RepositoryBranch>): RepositoryBranch {
    const message = { ...baseRepositoryBranch } as RepositoryBranch;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.sha !== undefined && object.sha !== null) {
      message.sha = object.sha;
    } else {
      message.sha = "";
    }
    return message;
  },
};

const baseRepositoryIssue: object = { iid: 0, id: 0 };

export const RepositoryIssue = {
  encode(message: RepositoryIssue, writer: Writer = Writer.create()): Writer {
    if (message.iid !== 0) {
      writer.uint32(8).uint64(message.iid);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RepositoryIssue {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRepositoryIssue } as RepositoryIssue;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.iid = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RepositoryIssue {
    const message = { ...baseRepositoryIssue } as RepositoryIssue;
    if (object.iid !== undefined && object.iid !== null) {
      message.iid = Number(object.iid);
    } else {
      message.iid = 0;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: RepositoryIssue): unknown {
    const obj: any = {};
    message.iid !== undefined && (obj.iid = message.iid);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<RepositoryIssue>): RepositoryIssue {
    const message = { ...baseRepositoryIssue } as RepositoryIssue;
    if (object.iid !== undefined && object.iid !== null) {
      message.iid = object.iid;
    } else {
      message.iid = 0;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseRepositoryPullRequest: object = { iid: 0, id: 0 };

export const RepositoryPullRequest = {
  encode(
    message: RepositoryPullRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.iid !== 0) {
      writer.uint32(8).uint64(message.iid);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RepositoryPullRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRepositoryPullRequest } as RepositoryPullRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.iid = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RepositoryPullRequest {
    const message = { ...baseRepositoryPullRequest } as RepositoryPullRequest;
    if (object.iid !== undefined && object.iid !== null) {
      message.iid = Number(object.iid);
    } else {
      message.iid = 0;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: RepositoryPullRequest): unknown {
    const obj: any = {};
    message.iid !== undefined && (obj.iid = message.iid);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<RepositoryPullRequest>
  ): RepositoryPullRequest {
    const message = { ...baseRepositoryPullRequest } as RepositoryPullRequest;
    if (object.iid !== undefined && object.iid !== null) {
      message.iid = object.iid;
    } else {
      message.iid = 0;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseRepositoryCollaborator: object = { id: "", permission: "" };

export const RepositoryCollaborator = {
  encode(
    message: RepositoryCollaborator,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.permission !== "") {
      writer.uint32(18).string(message.permission);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RepositoryCollaborator {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRepositoryCollaborator } as RepositoryCollaborator;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.permission = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RepositoryCollaborator {
    const message = { ...baseRepositoryCollaborator } as RepositoryCollaborator;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.permission !== undefined && object.permission !== null) {
      message.permission = String(object.permission);
    } else {
      message.permission = "";
    }
    return message;
  },

  toJSON(message: RepositoryCollaborator): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.permission !== undefined && (obj.permission = message.permission);
    return obj;
  },

  fromPartial(
    object: DeepPartial<RepositoryCollaborator>
  ): RepositoryCollaborator {
    const message = { ...baseRepositoryCollaborator } as RepositoryCollaborator;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.permission !== undefined && object.permission !== null) {
      message.permission = object.permission;
    } else {
      message.permission = "";
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
