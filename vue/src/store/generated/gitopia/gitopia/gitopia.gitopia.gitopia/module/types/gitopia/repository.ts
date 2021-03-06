/* eslint-disable */
import {
  OwnerType,
  ownerTypeFromJSON,
  ownerTypeToJSON,
} from "../gitopia/whois";
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "gitopia.gitopia.gitopia";

export interface Repository {
  creator: string;
  id: number;
  name: string;
  owner: RepositoryOwner | undefined;
  description: string;
  forks: number[];
  subscribers: string;
  commits: string;
  issues: RepositoryIssue[];
  pullRequests: RepositoryPullRequest[];
  issuesCount: number;
  pullsCount: number;
  labels: RepositoryLabel[];
  labelsCount: number;
  releases: RepositoryRelease[];
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
  allowForking: boolean;
  backups: RepositoryBackup[];
  enableArweaveBackup: boolean;
}

export interface RepositoryId {
  id: string;
  name: string;
}

export interface BaseRepositoryKey {
  id: number;
  address: string;
  name: string;
}

export interface RepositoryOwner {
  id: string;
  type: OwnerType;
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
  permission: RepositoryCollaborator_Permission;
}

export enum RepositoryCollaborator_Permission {
  READ = 0,
  TRIAGE = 1,
  WRITE = 2,
  MAINTAIN = 3,
  ADMIN = 4,
  UNRECOGNIZED = -1,
}

export function repositoryCollaborator_PermissionFromJSON(
  object: any
): RepositoryCollaborator_Permission {
  switch (object) {
    case 0:
    case "READ":
      return RepositoryCollaborator_Permission.READ;
    case 1:
    case "TRIAGE":
      return RepositoryCollaborator_Permission.TRIAGE;
    case 2:
    case "WRITE":
      return RepositoryCollaborator_Permission.WRITE;
    case 3:
    case "MAINTAIN":
      return RepositoryCollaborator_Permission.MAINTAIN;
    case 4:
    case "ADMIN":
      return RepositoryCollaborator_Permission.ADMIN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RepositoryCollaborator_Permission.UNRECOGNIZED;
  }
}

export function repositoryCollaborator_PermissionToJSON(
  object: RepositoryCollaborator_Permission
): string {
  switch (object) {
    case RepositoryCollaborator_Permission.READ:
      return "READ";
    case RepositoryCollaborator_Permission.TRIAGE:
      return "TRIAGE";
    case RepositoryCollaborator_Permission.WRITE:
      return "WRITE";
    case RepositoryCollaborator_Permission.MAINTAIN:
      return "MAINTAIN";
    case RepositoryCollaborator_Permission.ADMIN:
      return "ADMIN";
    default:
      return "UNKNOWN";
  }
}

export interface RepositoryLabel {
  id: number;
  name: string;
  color: string;
  description: string;
}

export interface RepositoryRelease {
  id: number;
  tagName: string;
}

export interface Attachment {
  name: string;
  size: number;
  sha: string;
  uploader: string;
}

export interface RepositoryBackup {
  store: RepositoryBackup_Store;
  refs: string[];
}

export enum RepositoryBackup_Store {
  IPFS = 0,
  ARWEAVE = 1,
  UNRECOGNIZED = -1,
}

export function repositoryBackup_StoreFromJSON(
  object: any
): RepositoryBackup_Store {
  switch (object) {
    case 0:
    case "IPFS":
      return RepositoryBackup_Store.IPFS;
    case 1:
    case "ARWEAVE":
      return RepositoryBackup_Store.ARWEAVE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RepositoryBackup_Store.UNRECOGNIZED;
  }
}

export function repositoryBackup_StoreToJSON(
  object: RepositoryBackup_Store
): string {
  switch (object) {
    case RepositoryBackup_Store.IPFS:
      return "IPFS";
    case RepositoryBackup_Store.ARWEAVE:
      return "ARWEAVE";
    default:
      return "UNKNOWN";
  }
}

const baseRepository: object = {
  creator: "",
  id: 0,
  name: "",
  description: "",
  forks: 0,
  subscribers: "",
  commits: "",
  issuesCount: 0,
  pullsCount: 0,
  labelsCount: 0,
  createdAt: 0,
  updatedAt: 0,
  pushedAt: 0,
  stargazers: 0,
  archived: false,
  license: "",
  defaultBranch: "",
  parent: 0,
  fork: false,
  allowForking: false,
  enableArweaveBackup: false,
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
    if (message.owner !== undefined) {
      RepositoryOwner.encode(message.owner, writer.uint32(34).fork()).ldelim();
    }
    if (message.description !== "") {
      writer.uint32(42).string(message.description);
    }
    writer.uint32(50).fork();
    for (const v of message.forks) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.subscribers !== "") {
      writer.uint32(58).string(message.subscribers);
    }
    if (message.commits !== "") {
      writer.uint32(66).string(message.commits);
    }
    for (const v of message.issues) {
      RepositoryIssue.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    for (const v of message.pullRequests) {
      RepositoryPullRequest.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    if (message.issuesCount !== 0) {
      writer.uint32(88).uint64(message.issuesCount);
    }
    if (message.pullsCount !== 0) {
      writer.uint32(96).uint64(message.pullsCount);
    }
    for (const v of message.labels) {
      RepositoryLabel.encode(v!, writer.uint32(106).fork()).ldelim();
    }
    if (message.labelsCount !== 0) {
      writer.uint32(112).uint64(message.labelsCount);
    }
    for (const v of message.releases) {
      RepositoryRelease.encode(v!, writer.uint32(122).fork()).ldelim();
    }
    if (message.createdAt !== 0) {
      writer.uint32(128).int64(message.createdAt);
    }
    if (message.updatedAt !== 0) {
      writer.uint32(136).int64(message.updatedAt);
    }
    if (message.pushedAt !== 0) {
      writer.uint32(144).int64(message.pushedAt);
    }
    writer.uint32(154).fork();
    for (const v of message.stargazers) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.archived === true) {
      writer.uint32(160).bool(message.archived);
    }
    if (message.license !== "") {
      writer.uint32(170).string(message.license);
    }
    if (message.defaultBranch !== "") {
      writer.uint32(178).string(message.defaultBranch);
    }
    if (message.parent !== 0) {
      writer.uint32(184).uint64(message.parent);
    }
    if (message.fork === true) {
      writer.uint32(192).bool(message.fork);
    }
    for (const v of message.collaborators) {
      RepositoryCollaborator.encode(v!, writer.uint32(202).fork()).ldelim();
    }
    if (message.allowForking === true) {
      writer.uint32(208).bool(message.allowForking);
    }
    for (const v of message.backups) {
      RepositoryBackup.encode(v!, writer.uint32(218).fork()).ldelim();
    }
    if (message.enableArweaveBackup === true) {
      writer.uint32(224).bool(message.enableArweaveBackup);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Repository {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRepository } as Repository;
    message.forks = [];
    message.issues = [];
    message.pullRequests = [];
    message.labels = [];
    message.releases = [];
    message.stargazers = [];
    message.collaborators = [];
    message.backups = [];
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
          message.owner = RepositoryOwner.decode(reader, reader.uint32());
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
          message.subscribers = reader.string();
          break;
        case 8:
          message.commits = reader.string();
          break;
        case 9:
          message.issues.push(RepositoryIssue.decode(reader, reader.uint32()));
          break;
        case 10:
          message.pullRequests.push(
            RepositoryPullRequest.decode(reader, reader.uint32())
          );
          break;
        case 11:
          message.issuesCount = longToNumber(reader.uint64() as Long);
          break;
        case 12:
          message.pullsCount = longToNumber(reader.uint64() as Long);
          break;
        case 13:
          message.labels.push(RepositoryLabel.decode(reader, reader.uint32()));
          break;
        case 14:
          message.labelsCount = longToNumber(reader.uint64() as Long);
          break;
        case 15:
          message.releases.push(
            RepositoryRelease.decode(reader, reader.uint32())
          );
          break;
        case 16:
          message.createdAt = longToNumber(reader.int64() as Long);
          break;
        case 17:
          message.updatedAt = longToNumber(reader.int64() as Long);
          break;
        case 18:
          message.pushedAt = longToNumber(reader.int64() as Long);
          break;
        case 19:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.stargazers.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.stargazers.push(longToNumber(reader.uint64() as Long));
          }
          break;
        case 20:
          message.archived = reader.bool();
          break;
        case 21:
          message.license = reader.string();
          break;
        case 22:
          message.defaultBranch = reader.string();
          break;
        case 23:
          message.parent = longToNumber(reader.uint64() as Long);
          break;
        case 24:
          message.fork = reader.bool();
          break;
        case 25:
          message.collaborators.push(
            RepositoryCollaborator.decode(reader, reader.uint32())
          );
          break;
        case 26:
          message.allowForking = reader.bool();
          break;
        case 27:
          message.backups.push(
            RepositoryBackup.decode(reader, reader.uint32())
          );
          break;
        case 28:
          message.enableArweaveBackup = reader.bool();
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
    message.issues = [];
    message.pullRequests = [];
    message.labels = [];
    message.releases = [];
    message.stargazers = [];
    message.collaborators = [];
    message.backups = [];
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
      message.owner = RepositoryOwner.fromJSON(object.owner);
    } else {
      message.owner = undefined;
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
      for (const e of object.labels) {
        message.labels.push(RepositoryLabel.fromJSON(e));
      }
    }
    if (object.labelsCount !== undefined && object.labelsCount !== null) {
      message.labelsCount = Number(object.labelsCount);
    } else {
      message.labelsCount = 0;
    }
    if (object.releases !== undefined && object.releases !== null) {
      for (const e of object.releases) {
        message.releases.push(RepositoryRelease.fromJSON(e));
      }
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
    if (object.allowForking !== undefined && object.allowForking !== null) {
      message.allowForking = Boolean(object.allowForking);
    } else {
      message.allowForking = false;
    }
    if (object.backups !== undefined && object.backups !== null) {
      for (const e of object.backups) {
        message.backups.push(RepositoryBackup.fromJSON(e));
      }
    }
    if (
      object.enableArweaveBackup !== undefined &&
      object.enableArweaveBackup !== null
    ) {
      message.enableArweaveBackup = Boolean(object.enableArweaveBackup);
    } else {
      message.enableArweaveBackup = false;
    }
    return message;
  },

  toJSON(message: Repository): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.owner !== undefined &&
      (obj.owner = message.owner
        ? RepositoryOwner.toJSON(message.owner)
        : undefined);
    message.description !== undefined &&
      (obj.description = message.description);
    if (message.forks) {
      obj.forks = message.forks.map((e) => e);
    } else {
      obj.forks = [];
    }
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
    if (message.labels) {
      obj.labels = message.labels.map((e) =>
        e ? RepositoryLabel.toJSON(e) : undefined
      );
    } else {
      obj.labels = [];
    }
    message.labelsCount !== undefined &&
      (obj.labelsCount = message.labelsCount);
    if (message.releases) {
      obj.releases = message.releases.map((e) =>
        e ? RepositoryRelease.toJSON(e) : undefined
      );
    } else {
      obj.releases = [];
    }
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
    message.allowForking !== undefined &&
      (obj.allowForking = message.allowForking);
    if (message.backups) {
      obj.backups = message.backups.map((e) =>
        e ? RepositoryBackup.toJSON(e) : undefined
      );
    } else {
      obj.backups = [];
    }
    message.enableArweaveBackup !== undefined &&
      (obj.enableArweaveBackup = message.enableArweaveBackup);
    return obj;
  },

  fromPartial(object: DeepPartial<Repository>): Repository {
    const message = { ...baseRepository } as Repository;
    message.forks = [];
    message.issues = [];
    message.pullRequests = [];
    message.labels = [];
    message.releases = [];
    message.stargazers = [];
    message.collaborators = [];
    message.backups = [];
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
      message.owner = RepositoryOwner.fromPartial(object.owner);
    } else {
      message.owner = undefined;
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
      for (const e of object.labels) {
        message.labels.push(RepositoryLabel.fromPartial(e));
      }
    }
    if (object.labelsCount !== undefined && object.labelsCount !== null) {
      message.labelsCount = object.labelsCount;
    } else {
      message.labelsCount = 0;
    }
    if (object.releases !== undefined && object.releases !== null) {
      for (const e of object.releases) {
        message.releases.push(RepositoryRelease.fromPartial(e));
      }
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
    if (object.allowForking !== undefined && object.allowForking !== null) {
      message.allowForking = object.allowForking;
    } else {
      message.allowForking = false;
    }
    if (object.backups !== undefined && object.backups !== null) {
      for (const e of object.backups) {
        message.backups.push(RepositoryBackup.fromPartial(e));
      }
    }
    if (
      object.enableArweaveBackup !== undefined &&
      object.enableArweaveBackup !== null
    ) {
      message.enableArweaveBackup = object.enableArweaveBackup;
    } else {
      message.enableArweaveBackup = false;
    }
    return message;
  },
};

const baseRepositoryId: object = { id: "", name: "" };

export const RepositoryId = {
  encode(message: RepositoryId, writer: Writer = Writer.create()): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RepositoryId {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRepositoryId } as RepositoryId;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RepositoryId {
    const message = { ...baseRepositoryId } as RepositoryId;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    return message;
  },

  toJSON(message: RepositoryId): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial(object: DeepPartial<RepositoryId>): RepositoryId {
    const message = { ...baseRepositoryId } as RepositoryId;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    return message;
  },
};

const baseBaseRepositoryKey: object = { id: 0, address: "", name: "" };

export const BaseRepositoryKey = {
  encode(message: BaseRepositoryKey, writer: Writer = Writer.create()): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): BaseRepositoryKey {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseBaseRepositoryKey } as BaseRepositoryKey;
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
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BaseRepositoryKey {
    const message = { ...baseBaseRepositoryKey } as BaseRepositoryKey;
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
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    return message;
  },

  toJSON(message: BaseRepositoryKey): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.address !== undefined && (obj.address = message.address);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial(object: DeepPartial<BaseRepositoryKey>): BaseRepositoryKey {
    const message = { ...baseBaseRepositoryKey } as BaseRepositoryKey;
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
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    return message;
  },
};

const baseRepositoryOwner: object = { id: "", type: 0 };

export const RepositoryOwner = {
  encode(message: RepositoryOwner, writer: Writer = Writer.create()): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RepositoryOwner {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRepositoryOwner } as RepositoryOwner;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.type = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RepositoryOwner {
    const message = { ...baseRepositoryOwner } as RepositoryOwner;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = ownerTypeFromJSON(object.type);
    } else {
      message.type = 0;
    }
    return message;
  },

  toJSON(message: RepositoryOwner): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.type !== undefined && (obj.type = ownerTypeToJSON(message.type));
    return obj;
  },

  fromPartial(object: DeepPartial<RepositoryOwner>): RepositoryOwner {
    const message = { ...baseRepositoryOwner } as RepositoryOwner;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = 0;
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

const baseRepositoryCollaborator: object = { id: "", permission: 0 };

export const RepositoryCollaborator = {
  encode(
    message: RepositoryCollaborator,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.permission !== 0) {
      writer.uint32(16).int32(message.permission);
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
          message.permission = reader.int32() as any;
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
      message.permission = repositoryCollaborator_PermissionFromJSON(
        object.permission
      );
    } else {
      message.permission = 0;
    }
    return message;
  },

  toJSON(message: RepositoryCollaborator): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.permission !== undefined &&
      (obj.permission = repositoryCollaborator_PermissionToJSON(
        message.permission
      ));
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
      message.permission = 0;
    }
    return message;
  },
};

const baseRepositoryLabel: object = {
  id: 0,
  name: "",
  color: "",
  description: "",
};

export const RepositoryLabel = {
  encode(message: RepositoryLabel, writer: Writer = Writer.create()): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.color !== "") {
      writer.uint32(26).string(message.color);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RepositoryLabel {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRepositoryLabel } as RepositoryLabel;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.color = reader.string();
          break;
        case 4:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RepositoryLabel {
    const message = { ...baseRepositoryLabel } as RepositoryLabel;
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
    if (object.color !== undefined && object.color !== null) {
      message.color = String(object.color);
    } else {
      message.color = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    return message;
  },

  toJSON(message: RepositoryLabel): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.color !== undefined && (obj.color = message.color);
    message.description !== undefined &&
      (obj.description = message.description);
    return obj;
  },

  fromPartial(object: DeepPartial<RepositoryLabel>): RepositoryLabel {
    const message = { ...baseRepositoryLabel } as RepositoryLabel;
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
    if (object.color !== undefined && object.color !== null) {
      message.color = object.color;
    } else {
      message.color = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    return message;
  },
};

const baseRepositoryRelease: object = { id: 0, tagName: "" };

export const RepositoryRelease = {
  encode(message: RepositoryRelease, writer: Writer = Writer.create()): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.tagName !== "") {
      writer.uint32(18).string(message.tagName);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RepositoryRelease {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRepositoryRelease } as RepositoryRelease;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.tagName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RepositoryRelease {
    const message = { ...baseRepositoryRelease } as RepositoryRelease;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.tagName !== undefined && object.tagName !== null) {
      message.tagName = String(object.tagName);
    } else {
      message.tagName = "";
    }
    return message;
  },

  toJSON(message: RepositoryRelease): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.tagName !== undefined && (obj.tagName = message.tagName);
    return obj;
  },

  fromPartial(object: DeepPartial<RepositoryRelease>): RepositoryRelease {
    const message = { ...baseRepositoryRelease } as RepositoryRelease;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.tagName !== undefined && object.tagName !== null) {
      message.tagName = object.tagName;
    } else {
      message.tagName = "";
    }
    return message;
  },
};

const baseAttachment: object = { name: "", size: 0, sha: "", uploader: "" };

export const Attachment = {
  encode(message: Attachment, writer: Writer = Writer.create()): Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.size !== 0) {
      writer.uint32(16).uint64(message.size);
    }
    if (message.sha !== "") {
      writer.uint32(26).string(message.sha);
    }
    if (message.uploader !== "") {
      writer.uint32(34).string(message.uploader);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Attachment {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAttachment } as Attachment;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.size = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.sha = reader.string();
          break;
        case 4:
          message.uploader = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Attachment {
    const message = { ...baseAttachment } as Attachment;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.size !== undefined && object.size !== null) {
      message.size = Number(object.size);
    } else {
      message.size = 0;
    }
    if (object.sha !== undefined && object.sha !== null) {
      message.sha = String(object.sha);
    } else {
      message.sha = "";
    }
    if (object.uploader !== undefined && object.uploader !== null) {
      message.uploader = String(object.uploader);
    } else {
      message.uploader = "";
    }
    return message;
  },

  toJSON(message: Attachment): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.size !== undefined && (obj.size = message.size);
    message.sha !== undefined && (obj.sha = message.sha);
    message.uploader !== undefined && (obj.uploader = message.uploader);
    return obj;
  },

  fromPartial(object: DeepPartial<Attachment>): Attachment {
    const message = { ...baseAttachment } as Attachment;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.size !== undefined && object.size !== null) {
      message.size = object.size;
    } else {
      message.size = 0;
    }
    if (object.sha !== undefined && object.sha !== null) {
      message.sha = object.sha;
    } else {
      message.sha = "";
    }
    if (object.uploader !== undefined && object.uploader !== null) {
      message.uploader = object.uploader;
    } else {
      message.uploader = "";
    }
    return message;
  },
};

const baseRepositoryBackup: object = { store: 0, refs: "" };

export const RepositoryBackup = {
  encode(message: RepositoryBackup, writer: Writer = Writer.create()): Writer {
    if (message.store !== 0) {
      writer.uint32(8).int32(message.store);
    }
    for (const v of message.refs) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RepositoryBackup {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRepositoryBackup } as RepositoryBackup;
    message.refs = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.store = reader.int32() as any;
          break;
        case 2:
          message.refs.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RepositoryBackup {
    const message = { ...baseRepositoryBackup } as RepositoryBackup;
    message.refs = [];
    if (object.store !== undefined && object.store !== null) {
      message.store = repositoryBackup_StoreFromJSON(object.store);
    } else {
      message.store = 0;
    }
    if (object.refs !== undefined && object.refs !== null) {
      for (const e of object.refs) {
        message.refs.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: RepositoryBackup): unknown {
    const obj: any = {};
    message.store !== undefined &&
      (obj.store = repositoryBackup_StoreToJSON(message.store));
    if (message.refs) {
      obj.refs = message.refs.map((e) => e);
    } else {
      obj.refs = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<RepositoryBackup>): RepositoryBackup {
    const message = { ...baseRepositoryBackup } as RepositoryBackup;
    message.refs = [];
    if (object.store !== undefined && object.store !== null) {
      message.store = object.store;
    } else {
      message.store = 0;
    }
    if (object.refs !== undefined && object.refs !== null) {
      for (const e of object.refs) {
        message.refs.push(e);
      }
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
