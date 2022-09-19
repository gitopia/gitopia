import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "gitopia.gitopia.gitopia";
export declare enum Store {
    NONE = 0,
    IPFS = 1,
    ARWEAVE = 2,
    UNRECOGNIZED = -1
}
export declare function storeFromJSON(object: any): Store;
export declare function storeToJSON(object: Store): string;
export interface StorageProvider {
    id: number;
    store: Store;
    creator: string;
}
export declare const StorageProvider: {
    encode(message: StorageProvider, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): StorageProvider;
    fromJSON(object: any): StorageProvider;
    toJSON(message: StorageProvider): unknown;
    fromPartial(object: DeepPartial<StorageProvider>): StorageProvider;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
