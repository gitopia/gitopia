import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "gitopia.gitopia.gitopia";
export interface Organization {
    creator: string;
    id: number;
    name: string;
    avatarUrl: string;
    followers: string;
    following: string;
    repositories: string;
    repositoryNames: string;
    teams: string;
    members: string;
    location: string;
    email: string;
    website: string;
    verified: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    extensions: string;
}
export declare const Organization: {
    encode(message: Organization, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Organization;
    fromJSON(object: any): Organization;
    toJSON(message: Organization): unknown;
    fromPartial(object: DeepPartial<Organization>): Organization;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
