import { OwnerType } from "../gitopia/whois";
import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "gitopia.gitopia.gitopia";
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
export declare enum RepositoryCollaborator_Permission {
    READ = 0,
    TRIAGE = 1,
    WRITE = 2,
    MAINTAIN = 3,
    ADMIN = 4,
    UNRECOGNIZED = -1
}
export declare function repositoryCollaborator_PermissionFromJSON(object: any): RepositoryCollaborator_Permission;
export declare function repositoryCollaborator_PermissionToJSON(object: RepositoryCollaborator_Permission): string;
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
export declare enum RepositoryBackup_Store {
    IPFS = 0,
    ARWEAVE = 1,
    UNRECOGNIZED = -1
}
export declare function repositoryBackup_StoreFromJSON(object: any): RepositoryBackup_Store;
export declare function repositoryBackup_StoreToJSON(object: RepositoryBackup_Store): string;
export declare const Repository: {
    encode(message: Repository, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Repository;
    fromJSON(object: any): Repository;
    toJSON(message: Repository): unknown;
    fromPartial(object: DeepPartial<Repository>): Repository;
};
export declare const RepositoryId: {
    encode(message: RepositoryId, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): RepositoryId;
    fromJSON(object: any): RepositoryId;
    toJSON(message: RepositoryId): unknown;
    fromPartial(object: DeepPartial<RepositoryId>): RepositoryId;
};
export declare const BaseRepositoryKey: {
    encode(message: BaseRepositoryKey, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): BaseRepositoryKey;
    fromJSON(object: any): BaseRepositoryKey;
    toJSON(message: BaseRepositoryKey): unknown;
    fromPartial(object: DeepPartial<BaseRepositoryKey>): BaseRepositoryKey;
};
export declare const RepositoryOwner: {
    encode(message: RepositoryOwner, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): RepositoryOwner;
    fromJSON(object: any): RepositoryOwner;
    toJSON(message: RepositoryOwner): unknown;
    fromPartial(object: DeepPartial<RepositoryOwner>): RepositoryOwner;
};
export declare const RepositoryIssue: {
    encode(message: RepositoryIssue, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): RepositoryIssue;
    fromJSON(object: any): RepositoryIssue;
    toJSON(message: RepositoryIssue): unknown;
    fromPartial(object: DeepPartial<RepositoryIssue>): RepositoryIssue;
};
export declare const RepositoryPullRequest: {
    encode(message: RepositoryPullRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): RepositoryPullRequest;
    fromJSON(object: any): RepositoryPullRequest;
    toJSON(message: RepositoryPullRequest): unknown;
    fromPartial(object: DeepPartial<RepositoryPullRequest>): RepositoryPullRequest;
};
export declare const RepositoryCollaborator: {
    encode(message: RepositoryCollaborator, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): RepositoryCollaborator;
    fromJSON(object: any): RepositoryCollaborator;
    toJSON(message: RepositoryCollaborator): unknown;
    fromPartial(object: DeepPartial<RepositoryCollaborator>): RepositoryCollaborator;
};
export declare const RepositoryLabel: {
    encode(message: RepositoryLabel, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): RepositoryLabel;
    fromJSON(object: any): RepositoryLabel;
    toJSON(message: RepositoryLabel): unknown;
    fromPartial(object: DeepPartial<RepositoryLabel>): RepositoryLabel;
};
export declare const RepositoryRelease: {
    encode(message: RepositoryRelease, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): RepositoryRelease;
    fromJSON(object: any): RepositoryRelease;
    toJSON(message: RepositoryRelease): unknown;
    fromPartial(object: DeepPartial<RepositoryRelease>): RepositoryRelease;
};
export declare const Attachment: {
    encode(message: Attachment, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Attachment;
    fromJSON(object: any): Attachment;
    toJSON(message: Attachment): unknown;
    fromPartial(object: DeepPartial<Attachment>): Attachment;
};
export declare const RepositoryBackup: {
    encode(message: RepositoryBackup, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): RepositoryBackup;
    fromJSON(object: any): RepositoryBackup;
    toJSON(message: RepositoryBackup): unknown;
    fromPartial(object: DeepPartial<RepositoryBackup>): RepositoryBackup;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
