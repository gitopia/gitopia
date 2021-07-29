import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "gitopia.gitopia.gitopia";
export interface Organization {
    creator: string;
    id: number;
    name: string;
    avatarUrl: string;
    followers: number[];
    following: number[];
    repositories: number[];
    repositoryNames: {
        [key: string]: number;
    };
    teams: number[];
    members: {
        [key: string]: string;
    };
    location: string;
    email: string;
    website: string;
    verified: boolean;
    description: string;
    createdAt: number;
    updatedAt: number;
    extensions: string;
}
export interface Organization_RepositoryNamesEntry {
    key: string;
    value: number;
}
export interface Organization_MembersEntry {
    key: string;
    value: string;
}
export declare const Organization: {
    encode(message: Organization, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Organization;
    fromJSON(object: any): Organization;
    toJSON(message: Organization): unknown;
    fromPartial(object: DeepPartial<Organization>): Organization;
};
export declare const Organization_RepositoryNamesEntry: {
    encode(message: Organization_RepositoryNamesEntry, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Organization_RepositoryNamesEntry;
    fromJSON(object: any): Organization_RepositoryNamesEntry;
    toJSON(message: Organization_RepositoryNamesEntry): unknown;
    fromPartial(object: DeepPartial<Organization_RepositoryNamesEntry>): Organization_RepositoryNamesEntry;
};
export declare const Organization_MembersEntry: {
    encode(message: Organization_MembersEntry, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Organization_MembersEntry;
    fromJSON(object: any): Organization_MembersEntry;
    toJSON(message: Organization_MembersEntry): unknown;
    fromPartial(object: DeepPartial<Organization_MembersEntry>): Organization_MembersEntry;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
