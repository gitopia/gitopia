import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "gitopia.gitopia.gitopia";
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
export declare const Repository: {
    encode(message: Repository, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Repository;
    fromJSON(object: any): Repository;
    toJSON(message: Repository): unknown;
    fromPartial(object: DeepPartial<Repository>): Repository;
};
export declare const RepositoryBranch: {
    encode(message: RepositoryBranch, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): RepositoryBranch;
    fromJSON(object: any): RepositoryBranch;
    toJSON(message: RepositoryBranch): unknown;
    fromPartial(object: DeepPartial<RepositoryBranch>): RepositoryBranch;
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
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
