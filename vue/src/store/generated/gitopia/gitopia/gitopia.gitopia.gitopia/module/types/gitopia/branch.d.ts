import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "gitopia.gitopia.gitopia";
export interface Branch {
    id: number;
    repositoryId: number;
    name: string;
    sha: string;
    allowForcePush: boolean;
    createdAt: number;
    updatedAt: number;
}
export declare const Branch: {
    encode(message: Branch, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Branch;
    fromJSON(object: any): Branch;
    toJSON(message: Branch): unknown;
    fromPartial(object: DeepPartial<Branch>): Branch;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
