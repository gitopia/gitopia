import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "gitopia.gitopia.gitopia";
export interface Comment {
    creator: string;
    id: number;
    parentId: number;
    commentIid: number;
    body: string;
    attachments: string[];
    diffHunk: string;
    path: string;
    system: boolean;
    authorAssociation: string;
    createdAt: number;
    updatedAt: number;
    commentType: Comment_Type;
}
export declare enum Comment_Type {
    ISSUE = 0,
    PULLREQUEST = 1,
    UNRECOGNIZED = -1
}
export declare function comment_TypeFromJSON(object: any): Comment_Type;
export declare function comment_TypeToJSON(object: Comment_Type): string;
export declare const Comment: {
    encode(message: Comment, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Comment;
    fromJSON(object: any): Comment;
    toJSON(message: Comment): unknown;
    fromPartial(object: DeepPartial<Comment>): Comment;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
