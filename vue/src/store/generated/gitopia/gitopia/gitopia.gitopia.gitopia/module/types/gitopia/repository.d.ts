import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "gitopia.gitopia.gitopia";
export interface Repository {
    creator: string;
    id: number;
    name: string;
    owner: string;
    description: string;
    forks: number[];
    branches: string;
    tags: string;
    subscribers: string;
    commits: string;
    issuesOpen: number[];
    issuesClosed: number[];
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
    extensions: string;
}
export declare const Repository: {
    encode(message: Repository, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Repository;
    fromJSON(object: any): Repository;
    toJSON(message: Repository): unknown;
    fromPartial(object: DeepPartial<Repository>): Repository;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
