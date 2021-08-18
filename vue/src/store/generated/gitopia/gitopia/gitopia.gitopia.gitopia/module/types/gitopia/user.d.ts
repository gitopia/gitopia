import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "gitopia.gitopia.gitopia";
export interface User {
    creator: string;
    username: string;
    usernameGithub: string;
    avatarUrl: string;
    followers: number[];
    following: number[];
    repositories: {
        [key: string]: number;
    };
    organizations: {
        [key: string]: number;
    };
    starredRepos: number[];
    subscriptions: string;
    email: string;
    bio: string;
    createdAt: number;
    updatedAt: number;
    extensions: string;
}
export interface User_RepositoriesEntry {
    key: string;
    value: number;
}
export interface User_OrganizationsEntry {
    key: string;
    value: number;
}
export declare const User: {
    encode(message: User, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): User;
    fromJSON(object: any): User;
    toJSON(message: User): unknown;
    fromPartial(object: DeepPartial<User>): User;
};
export declare const User_RepositoriesEntry: {
    encode(message: User_RepositoriesEntry, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): User_RepositoriesEntry;
    fromJSON(object: any): User_RepositoriesEntry;
    toJSON(message: User_RepositoriesEntry): unknown;
    fromPartial(object: DeepPartial<User_RepositoriesEntry>): User_RepositoriesEntry;
};
export declare const User_OrganizationsEntry: {
    encode(message: User_OrganizationsEntry, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): User_OrganizationsEntry;
    fromJSON(object: any): User_OrganizationsEntry;
    toJSON(message: User_OrganizationsEntry): unknown;
    fromPartial(object: DeepPartial<User_OrganizationsEntry>): User_OrganizationsEntry;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
