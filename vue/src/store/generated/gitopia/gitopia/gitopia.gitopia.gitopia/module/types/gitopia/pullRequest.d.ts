import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "gitopia.gitopia.gitopia";
export interface PullRequest {
    creator: string;
    id: number;
    iid: string;
    title: string;
    state: string;
    description: string;
    locked: string;
    comments: string;
    issues: string;
    repositoryId: string;
    labels: string;
    assignees: string;
    reviewers: string;
    draft: string;
    createdAt: string;
    updatedAt: string;
    closedAt: string;
    closedBy: string;
    mergedAt: string;
    mergedBy: string;
    mergeCommitSha: string;
    maintainerCanModify: string;
    head: string;
    base: string;
    extensions: string;
}
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
