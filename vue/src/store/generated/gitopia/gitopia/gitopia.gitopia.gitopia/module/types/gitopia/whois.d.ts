import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "gitopia.gitopia.gitopia";
export declare enum OwnerType {
    USER = 0,
    DAO = 1,
    UNRECOGNIZED = -1
}
export declare function ownerTypeFromJSON(object: any): OwnerType;
export declare function ownerTypeToJSON(object: OwnerType): string;
export interface Whois {
    creator: string;
    id: number;
    name: string;
    address: string;
    ownerType: OwnerType;
}
export declare const Whois: {
    encode(message: Whois, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Whois;
    fromJSON(object: any): Whois;
    toJSON(message: Whois): unknown;
    fromPartial(object: DeepPartial<Whois>): Whois;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
