import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "gitopia.gitopia.gitopia";
export interface User {
    creator: string;
    id: number;
    name: string;
    username: string;
    usernameGithub: string;
    avatarUrl: string;
    followers: string[];
    following: string[];
    starredRepos: number[];
    subscriptions: string;
    bio: string;
    createdAt: number;
    updatedAt: number;
}
export interface UserDao {
    userAddress: string;
    daoAddress: string;
}
export declare const User: {
    encode(message: User, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): User;
    fromJSON(object: any): User;
    toJSON(message: User): unknown;
    fromPartial(object: DeepPartial<User>): User;
};
export declare const UserDao: {
    encode(message: UserDao, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): UserDao;
    fromJSON(object: any): UserDao;
    toJSON(message: UserDao): unknown;
    fromPartial(object: DeepPartial<UserDao>): UserDao;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
