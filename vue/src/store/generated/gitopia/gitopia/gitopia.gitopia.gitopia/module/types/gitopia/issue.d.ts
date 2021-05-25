import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "gitopia.gitopia.gitopia";
export interface Issue {
    creator: string;
    id: number;
    iid: string;
    title: string;
    state: string;
    description: string;
    authorId: string;
    comments: string;
    pullRequests: string;
    repositoryId: string;
    labels: string;
    weight: string;
    assigneesId: string;
    createdAt: string;
    updatedAt: string;
    closedAt: string;
    closedBy: string;
    extensions: string;
}
export declare const Issue: {
    encode(message: Issue, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Issue;
    fromJSON(object: any): Issue;
    toJSON(message: Issue): unknown;
    fromPartial(object: DeepPartial<Issue>): Issue;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
