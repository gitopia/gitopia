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
    labels: number[];
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
    head: PullRequestHead | undefined;
    base: PullRequestBase | undefined;
}
export declare enum PullRequest_State {
    OPEN = 0,
    CLOSED = 1,
    MERGED = 2,
    UNRECOGNIZED = -1
}
export declare function pullRequest_StateFromJSON(object: any): PullRequest_State;
export declare function pullRequest_StateToJSON(object: PullRequest_State): string;
export interface PullRequestHead {
    repositoryId: number;
    branch: string;
    commitSha: string;
}
export interface PullRequestBase {
    repositoryId: number;
    branch: string;
    commitSha: string;
}
export declare const PullRequest: {
    encode(message: PullRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): PullRequest;
    fromJSON(object: any): PullRequest;
    toJSON(message: PullRequest): unknown;
    fromPartial(object: DeepPartial<PullRequest>): PullRequest;
};
export declare const PullRequestHead: {
    encode(message: PullRequestHead, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): PullRequestHead;
    fromJSON(object: any): PullRequestHead;
    toJSON(message: PullRequestHead): unknown;
    fromPartial(object: DeepPartial<PullRequestHead>): PullRequestHead;
};
export declare const PullRequestBase: {
    encode(message: PullRequestBase, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): PullRequestBase;
    fromJSON(object: any): PullRequestBase;
    toJSON(message: PullRequestBase): unknown;
    fromPartial(object: DeepPartial<PullRequestBase>): PullRequestBase;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
