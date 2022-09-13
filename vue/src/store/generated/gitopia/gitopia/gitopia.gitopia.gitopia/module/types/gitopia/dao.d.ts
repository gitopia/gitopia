import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "gitopia.gitopia.gitopia";
export interface Dao {
    creator: string;
    id: number;
    address: string;
    name: string;
    avatarUrl: string;
    followers: string[];
    following: string[];
    teams: number[];
    location: string;
    website: string;
    verified: boolean;
    description: string;
    createdAt: number;
    updatedAt: number;
    legacyAddress: string;
}
export interface LegacyDaoAddress {
    id: number;
    legacyAddress: string;
    address: string;
}
export declare const Dao: {
    encode(message: Dao, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Dao;
    fromJSON(object: any): Dao;
    toJSON(message: Dao): unknown;
    fromPartial(object: DeepPartial<Dao>): Dao;
};
export declare const LegacyDaoAddress: {
    encode(message: LegacyDaoAddress, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): LegacyDaoAddress;
    fromJSON(object: any): LegacyDaoAddress;
    toJSON(message: LegacyDaoAddress): unknown;
    fromPartial(object: DeepPartial<LegacyDaoAddress>): LegacyDaoAddress;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
