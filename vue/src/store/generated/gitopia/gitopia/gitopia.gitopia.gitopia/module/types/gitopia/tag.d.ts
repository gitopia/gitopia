import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "gitopia.gitopia.gitopia";
export interface Tag {
    id: number;
    repositoryId: number;
    name: string;
    sha: string;
    createdAt: number;
    updatedAt: number;
}
export declare const Tag: {
    encode(message: Tag, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Tag;
    fromJSON(object: any): Tag;
    toJSON(message: Tag): unknown;
    fromPartial(object: DeepPartial<Tag>): Tag;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
