import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "gitopia.gitopia.gitopia";
export interface PullRequest {
    creator: string;
    id: number;
    iid: number;
    title: string;
    state: PullRequest_State;
    description: string;
    locked: boolean;
    comments: number[];
    commentsCount: number;
    issues: number[];
    labels: string[];
    assignees: string[];
    reviewers: string[];
    draft: boolean;
    createdAt: number;
    updatedAt: number;
    closedAt: number;
    closedBy: string;
    mergedAt: number;
    mergedBy: string;
    mergeCommitSha: string;
    maintainerCanModify: boolean;
    headBranch: string;
    headRepoId: number;
    baseBranch: string;
    baseRepoId: number;
    extensions: string;
}
export declare enum PullRequest_State {
    OPEN = 0,
    CLOSED = 1,
    MERGED = 2,
    UNRECOGNIZED = -1
}
export declare function pullRequest_StateFromJSON(object: any): PullRequest_State;
export declare function pullRequest_StateToJSON(object: PullRequest_State): string;
export declare const PullRequest: {
    encode(message: PullRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): PullRequest;
    fromJSON(object: any): PullRequest;
    toJSON(message: PullRequest): unknown;
    fromPartial(object: DeepPartial<PullRequest>): PullRequest;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
