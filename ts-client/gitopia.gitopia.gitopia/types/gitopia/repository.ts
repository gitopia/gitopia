/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { OwnerType, ownerTypeFromJSON, ownerTypeToJSON } from "./whois";

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

export interface IssueIid {
  iid: number;
  id: number;
}

export interface PullRequestIid {
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

export function repositoryCollaborator_PermissionFromJSON(object: any): RepositoryCollaborator_Permission {
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

export function repositoryCollaborator_PermissionToJSON(object: RepositoryCollaborator_Permission): string {
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
    case RepositoryCollaborator_Permission.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
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

export interface RepositoryBackup {
  store: RepositoryBackup_Store;
  refs: string[];
}

export enum RepositoryBackup_Store {
  IPFS = 0,
  ARWEAVE = 1,
  UNRECOGNIZED = -1,
}

export function repositoryBackup_StoreFromJSON(object: any): RepositoryBackup_Store {
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

export function repositoryBackup_StoreToJSON(object: RepositoryBackup_Store): string {
  switch (object) {
    case RepositoryBackup_Store.IPFS:
      return "IPFS";
    case RepositoryBackup_Store.ARWEAVE:
      return "ARWEAVE";
    case RepositoryBackup_Store.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseRepository(): Repository {
  return {
    creator: "",
    id: 0,
    name: "",
    owner: undefined,
    description: "",
    forks: [],
    subscribers: "",
    commits: "",
    issuesCount: 0,
    pullsCount: 0,
    labels: [],
    labelsCount: 0,
    releases: [],
    createdAt: 0,
    updatedAt: 0,
    pushedAt: 0,
    stargazers: [],
    archived: false,
    license: "",
    defaultBranch: "",
    parent: 0,
    fork: false,
    collaborators: [],
    allowForking: false,
    backups: [],
    enableArweaveBackup: false,
  };
}

export const Repository = {
  encode(message: Repository, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
    if (message.issuesCount !== 0) {
      writer.uint32(72).uint64(message.issuesCount);
    }
    if (message.pullsCount !== 0) {
      writer.uint32(80).uint64(message.pullsCount);
    }
    for (const v of message.labels) {
      RepositoryLabel.encode(v!, writer.uint32(90).fork()).ldelim();
    }
    if (message.labelsCount !== 0) {
      writer.uint32(96).uint64(message.labelsCount);
    }
    for (const v of message.releases) {
      RepositoryRelease.encode(v!, writer.uint32(106).fork()).ldelim();
    }
    if (message.createdAt !== 0) {
      writer.uint32(112).int64(message.createdAt);
    }
    if (message.updatedAt !== 0) {
      writer.uint32(120).int64(message.updatedAt);
    }
    if (message.pushedAt !== 0) {
      writer.uint32(128).int64(message.pushedAt);
    }
    writer.uint32(138).fork();
    for (const v of message.stargazers) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.archived === true) {
      writer.uint32(144).bool(message.archived);
    }
    if (message.license !== "") {
      writer.uint32(154).string(message.license);
    }
    if (message.defaultBranch !== "") {
      writer.uint32(162).string(message.defaultBranch);
    }
    if (message.parent !== 0) {
      writer.uint32(168).uint64(message.parent);
    }
    if (message.fork === true) {
      writer.uint32(176).bool(message.fork);
    }
    for (const v of message.collaborators) {
      RepositoryCollaborator.encode(v!, writer.uint32(186).fork()).ldelim();
    }
    if (message.allowForking === true) {
      writer.uint32(192).bool(message.allowForking);
    }
    for (const v of message.backups) {
      RepositoryBackup.encode(v!, writer.uint32(202).fork()).ldelim();
    }
    if (message.enableArweaveBackup === true) {
      writer.uint32(208).bool(message.enableArweaveBackup);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Repository {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRepository();
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
          message.issuesCount = longToNumber(reader.uint64() as Long);
          break;
        case 10:
          message.pullsCount = longToNumber(reader.uint64() as Long);
          break;
        case 11:
          message.labels.push(RepositoryLabel.decode(reader, reader.uint32()));
          break;
        case 12:
          message.labelsCount = longToNumber(reader.uint64() as Long);
          break;
        case 13:
          message.releases.push(RepositoryRelease.decode(reader, reader.uint32()));
          break;
        case 14:
          message.createdAt = longToNumber(reader.int64() as Long);
          break;
        case 15:
          message.updatedAt = longToNumber(reader.int64() as Long);
          break;
        case 16:
          message.pushedAt = longToNumber(reader.int64() as Long);
          break;
        case 17:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.stargazers.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.stargazers.push(longToNumber(reader.uint64() as Long));
          }
          break;
        case 18:
          message.archived = reader.bool();
          break;
        case 19:
          message.license = reader.string();
          break;
        case 20:
          message.defaultBranch = reader.string();
          break;
        case 21:
          message.parent = longToNumber(reader.uint64() as Long);
          break;
        case 22:
          message.fork = reader.bool();
          break;
        case 23:
          message.collaborators.push(RepositoryCollaborator.decode(reader, reader.uint32()));
          break;
        case 24:
          message.allowForking = reader.bool();
          break;
        case 25:
          message.backups.push(RepositoryBackup.decode(reader, reader.uint32()));
          break;
        case 26:
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
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
      name: isSet(object.name) ? String(object.name) : "",
      owner: isSet(object.owner) ? RepositoryOwner.fromJSON(object.owner) : undefined,
      description: isSet(object.description) ? String(object.description) : "",
      forks: Array.isArray(object?.forks) ? object.forks.map((e: any) => Number(e)) : [],
      subscribers: isSet(object.subscribers) ? String(object.subscribers) : "",
      commits: isSet(object.commits) ? String(object.commits) : "",
      issuesCount: isSet(object.issuesCount) ? Number(object.issuesCount) : 0,
      pullsCount: isSet(object.pullsCount) ? Number(object.pullsCount) : 0,
      labels: Array.isArray(object?.labels) ? object.labels.map((e: any) => RepositoryLabel.fromJSON(e)) : [],
      labelsCount: isSet(object.labelsCount) ? Number(object.labelsCount) : 0,
      releases: Array.isArray(object?.releases) ? object.releases.map((e: any) => RepositoryRelease.fromJSON(e)) : [],
      createdAt: isSet(object.createdAt) ? Number(object.createdAt) : 0,
      updatedAt: isSet(object.updatedAt) ? Number(object.updatedAt) : 0,
      pushedAt: isSet(object.pushedAt) ? Number(object.pushedAt) : 0,
      stargazers: Array.isArray(object?.stargazers) ? object.stargazers.map((e: any) => Number(e)) : [],
      archived: isSet(object.archived) ? Boolean(object.archived) : false,
      license: isSet(object.license) ? String(object.license) : "",
      defaultBranch: isSet(object.defaultBranch) ? String(object.defaultBranch) : "",
      parent: isSet(object.parent) ? Number(object.parent) : 0,
      fork: isSet(object.fork) ? Boolean(object.fork) : false,
      collaborators: Array.isArray(object?.collaborators)
        ? object.collaborators.map((e: any) => RepositoryCollaborator.fromJSON(e))
        : [],
      allowForking: isSet(object.allowForking) ? Boolean(object.allowForking) : false,
      backups: Array.isArray(object?.backups) ? object.backups.map((e: any) => RepositoryBackup.fromJSON(e)) : [],
      enableArweaveBackup: isSet(object.enableArweaveBackup) ? Boolean(object.enableArweaveBackup) : false,
    };
  },

  toJSON(message: Repository): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.name !== undefined && (obj.name = message.name);
    message.owner !== undefined && (obj.owner = message.owner ? RepositoryOwner.toJSON(message.owner) : undefined);
    message.description !== undefined && (obj.description = message.description);
    if (message.forks) {
      obj.forks = message.forks.map((e) => Math.round(e));
    } else {
      obj.forks = [];
    }
    message.subscribers !== undefined && (obj.subscribers = message.subscribers);
    message.commits !== undefined && (obj.commits = message.commits);
    message.issuesCount !== undefined && (obj.issuesCount = Math.round(message.issuesCount));
    message.pullsCount !== undefined && (obj.pullsCount = Math.round(message.pullsCount));
    if (message.labels) {
      obj.labels = message.labels.map((e) => e ? RepositoryLabel.toJSON(e) : undefined);
    } else {
      obj.labels = [];
    }
    message.labelsCount !== undefined && (obj.labelsCount = Math.round(message.labelsCount));
    if (message.releases) {
      obj.releases = message.releases.map((e) => e ? RepositoryRelease.toJSON(e) : undefined);
    } else {
      obj.releases = [];
    }
    message.createdAt !== undefined && (obj.createdAt = Math.round(message.createdAt));
    message.updatedAt !== undefined && (obj.updatedAt = Math.round(message.updatedAt));
    message.pushedAt !== undefined && (obj.pushedAt = Math.round(message.pushedAt));
    if (message.stargazers) {
      obj.stargazers = message.stargazers.map((e) => Math.round(e));
    } else {
      obj.stargazers = [];
    }
    message.archived !== undefined && (obj.archived = message.archived);
    message.license !== undefined && (obj.license = message.license);
    message.defaultBranch !== undefined && (obj.defaultBranch = message.defaultBranch);
    message.parent !== undefined && (obj.parent = Math.round(message.parent));
    message.fork !== undefined && (obj.fork = message.fork);
    if (message.collaborators) {
      obj.collaborators = message.collaborators.map((e) => e ? RepositoryCollaborator.toJSON(e) : undefined);
    } else {
      obj.collaborators = [];
    }
    message.allowForking !== undefined && (obj.allowForking = message.allowForking);
    if (message.backups) {
      obj.backups = message.backups.map((e) => e ? RepositoryBackup.toJSON(e) : undefined);
    } else {
      obj.backups = [];
    }
    message.enableArweaveBackup !== undefined && (obj.enableArweaveBackup = message.enableArweaveBackup);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Repository>, I>>(object: I): Repository {
    const message = createBaseRepository();
    message.creator = object.creator ?? "";
    message.id = object.id ?? 0;
    message.name = object.name ?? "";
    message.owner = (object.owner !== undefined && object.owner !== null)
      ? RepositoryOwner.fromPartial(object.owner)
      : undefined;
    message.description = object.description ?? "";
    message.forks = object.forks?.map((e) => e) || [];
    message.subscribers = object.subscribers ?? "";
    message.commits = object.commits ?? "";
    message.issuesCount = object.issuesCount ?? 0;
    message.pullsCount = object.pullsCount ?? 0;
    message.labels = object.labels?.map((e) => RepositoryLabel.fromPartial(e)) || [];
    message.labelsCount = object.labelsCount ?? 0;
    message.releases = object.releases?.map((e) => RepositoryRelease.fromPartial(e)) || [];
    message.createdAt = object.createdAt ?? 0;
    message.updatedAt = object.updatedAt ?? 0;
    message.pushedAt = object.pushedAt ?? 0;
    message.stargazers = object.stargazers?.map((e) => e) || [];
    message.archived = object.archived ?? false;
    message.license = object.license ?? "";
    message.defaultBranch = object.defaultBranch ?? "";
    message.parent = object.parent ?? 0;
    message.fork = object.fork ?? false;
    message.collaborators = object.collaborators?.map((e) => RepositoryCollaborator.fromPartial(e)) || [];
    message.allowForking = object.allowForking ?? false;
    message.backups = object.backups?.map((e) => RepositoryBackup.fromPartial(e)) || [];
    message.enableArweaveBackup = object.enableArweaveBackup ?? false;
    return message;
  },
};

function createBaseRepositoryId(): RepositoryId {
  return { id: "", name: "" };
}

export const RepositoryId = {
  encode(message: RepositoryId, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RepositoryId {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRepositoryId();
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
    return { id: isSet(object.id) ? String(object.id) : "", name: isSet(object.name) ? String(object.name) : "" };
  },

  toJSON(message: RepositoryId): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RepositoryId>, I>>(object: I): RepositoryId {
    const message = createBaseRepositoryId();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseBaseRepositoryKey(): BaseRepositoryKey {
  return { id: 0, address: "", name: "" };
}

export const BaseRepositoryKey = {
  encode(message: BaseRepositoryKey, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): BaseRepositoryKey {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBaseRepositoryKey();
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
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      address: isSet(object.address) ? String(object.address) : "",
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: BaseRepositoryKey): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.address !== undefined && (obj.address = message.address);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BaseRepositoryKey>, I>>(object: I): BaseRepositoryKey {
    const message = createBaseBaseRepositoryKey();
    message.id = object.id ?? 0;
    message.address = object.address ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseRepositoryOwner(): RepositoryOwner {
  return { id: "", type: 0 };
}

export const RepositoryOwner = {
  encode(message: RepositoryOwner, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RepositoryOwner {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRepositoryOwner();
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
    return {
      id: isSet(object.id) ? String(object.id) : "",
      type: isSet(object.type) ? ownerTypeFromJSON(object.type) : 0,
    };
  },

  toJSON(message: RepositoryOwner): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.type !== undefined && (obj.type = ownerTypeToJSON(message.type));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RepositoryOwner>, I>>(object: I): RepositoryOwner {
    const message = createBaseRepositoryOwner();
    message.id = object.id ?? "";
    message.type = object.type ?? 0;
    return message;
  },
};

function createBaseIssueIid(): IssueIid {
  return { iid: 0, id: 0 };
}

export const IssueIid = {
  encode(message: IssueIid, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.iid !== 0) {
      writer.uint32(8).uint64(message.iid);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IssueIid {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIssueIid();
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

  fromJSON(object: any): IssueIid {
    return { iid: isSet(object.iid) ? Number(object.iid) : 0, id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: IssueIid): unknown {
    const obj: any = {};
    message.iid !== undefined && (obj.iid = Math.round(message.iid));
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<IssueIid>, I>>(object: I): IssueIid {
    const message = createBaseIssueIid();
    message.iid = object.iid ?? 0;
    message.id = object.id ?? 0;
    return message;
  },
};

function createBasePullRequestIid(): PullRequestIid {
  return { iid: 0, id: 0 };
}

export const PullRequestIid = {
  encode(message: PullRequestIid, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.iid !== 0) {
      writer.uint32(8).uint64(message.iid);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PullRequestIid {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePullRequestIid();
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

  fromJSON(object: any): PullRequestIid {
    return { iid: isSet(object.iid) ? Number(object.iid) : 0, id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: PullRequestIid): unknown {
    const obj: any = {};
    message.iid !== undefined && (obj.iid = Math.round(message.iid));
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PullRequestIid>, I>>(object: I): PullRequestIid {
    const message = createBasePullRequestIid();
    message.iid = object.iid ?? 0;
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseRepositoryCollaborator(): RepositoryCollaborator {
  return { id: "", permission: 0 };
}

export const RepositoryCollaborator = {
  encode(message: RepositoryCollaborator, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.permission !== 0) {
      writer.uint32(16).int32(message.permission);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RepositoryCollaborator {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRepositoryCollaborator();
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
    return {
      id: isSet(object.id) ? String(object.id) : "",
      permission: isSet(object.permission) ? repositoryCollaborator_PermissionFromJSON(object.permission) : 0,
    };
  },

  toJSON(message: RepositoryCollaborator): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.permission !== undefined && (obj.permission = repositoryCollaborator_PermissionToJSON(message.permission));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RepositoryCollaborator>, I>>(object: I): RepositoryCollaborator {
    const message = createBaseRepositoryCollaborator();
    message.id = object.id ?? "";
    message.permission = object.permission ?? 0;
    return message;
  },
};

function createBaseRepositoryLabel(): RepositoryLabel {
  return { id: 0, name: "", color: "", description: "" };
}

export const RepositoryLabel = {
  encode(message: RepositoryLabel, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): RepositoryLabel {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRepositoryLabel();
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
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      name: isSet(object.name) ? String(object.name) : "",
      color: isSet(object.color) ? String(object.color) : "",
      description: isSet(object.description) ? String(object.description) : "",
    };
  },

  toJSON(message: RepositoryLabel): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.name !== undefined && (obj.name = message.name);
    message.color !== undefined && (obj.color = message.color);
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RepositoryLabel>, I>>(object: I): RepositoryLabel {
    const message = createBaseRepositoryLabel();
    message.id = object.id ?? 0;
    message.name = object.name ?? "";
    message.color = object.color ?? "";
    message.description = object.description ?? "";
    return message;
  },
};

function createBaseRepositoryRelease(): RepositoryRelease {
  return { id: 0, tagName: "" };
}

export const RepositoryRelease = {
  encode(message: RepositoryRelease, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.tagName !== "") {
      writer.uint32(18).string(message.tagName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RepositoryRelease {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRepositoryRelease();
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
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      tagName: isSet(object.tagName) ? String(object.tagName) : "",
    };
  },

  toJSON(message: RepositoryRelease): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.tagName !== undefined && (obj.tagName = message.tagName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RepositoryRelease>, I>>(object: I): RepositoryRelease {
    const message = createBaseRepositoryRelease();
    message.id = object.id ?? 0;
    message.tagName = object.tagName ?? "";
    return message;
  },
};

function createBaseRepositoryBackup(): RepositoryBackup {
  return { store: 0, refs: [] };
}

export const RepositoryBackup = {
  encode(message: RepositoryBackup, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.store !== 0) {
      writer.uint32(8).int32(message.store);
    }
    for (const v of message.refs) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RepositoryBackup {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRepositoryBackup();
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
    return {
      store: isSet(object.store) ? repositoryBackup_StoreFromJSON(object.store) : 0,
      refs: Array.isArray(object?.refs) ? object.refs.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: RepositoryBackup): unknown {
    const obj: any = {};
    message.store !== undefined && (obj.store = repositoryBackup_StoreToJSON(message.store));
    if (message.refs) {
      obj.refs = message.refs.map((e) => e);
    } else {
      obj.refs = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RepositoryBackup>, I>>(object: I): RepositoryBackup {
    const message = createBaseRepositoryBackup();
    message.store = object.store ?? 0;
    message.refs = object.refs?.map((e) => e) || [];
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
