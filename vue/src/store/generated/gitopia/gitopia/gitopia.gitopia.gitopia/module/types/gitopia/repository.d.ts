import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "gitopia.gitopia.gitopia";
export interface Repository {
    creator: string;
    id: number;
    name: string;
    owner: string;
    description: string;
    forks: number[];
    branches: {
        [key: string]: string;
    };
    tags: string;
    subscribers: string;
    commits: string;
    issues: number[];
    pulls: number[];
    labels: string;
    releases: string;
    createdAt: number;
    updatedAt: number;
    pushedAt: number;
    stargazers: number[];
    archived: boolean;
    license: string;
    defaultBranch: string;
    collaborators: {
        [key: string]: string;
    };
    extensions: string;
}
export interface Repository_BranchesEntry {
    key: string;
    value: string;
}
export interface Repository_CollaboratorsEntry {
    key: string;
    value: string;
}
export declare const Repository: {
    encode(message: Repository, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Repository;
    fromJSON(object: any): Repository;
    toJSON(message: Repository): unknown;
    fromPartial(object: DeepPartial<Repository>): Repository;
};
export declare const Repository_BranchesEntry: {
    encode(message: Repository_BranchesEntry, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Repository_BranchesEntry;
    fromJSON(object: any): Repository_BranchesEntry;
    toJSON(message: Repository_BranchesEntry): unknown;
    fromPartial(object: DeepPartial<Repository_BranchesEntry>): Repository_BranchesEntry;
};
export declare const Repository_CollaboratorsEntry: {
    encode(message: Repository_CollaboratorsEntry, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Repository_CollaboratorsEntry;
    fromJSON(object: any): Repository_CollaboratorsEntry;
    toJSON(message: Repository_CollaboratorsEntry): unknown;
    fromPartial(object: DeepPartial<Repository_CollaboratorsEntry>): Repository_CollaboratorsEntry;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
