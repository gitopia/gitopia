import { Writer, Reader } from "protobufjs/minimal";
import { Requests } from "../gitopia/request";
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
    repositories: UserRepository[];
    organizations: UserOrganization[];
    starredRepos: number[];
    subscriptions: string;
    email: string;
    bio: string;
    createdAt: number;
    updatedAt: number;
    requests: Requests | undefined;
}
export interface UserRepository {
    name: string;
    id: number;
}
export interface UserOrganization {
    name: string;
    id: string;
}
export declare const User: {
    encode(message: User, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): User;
    fromJSON(object: any): User;
    toJSON(message: User): unknown;
    fromPartial(object: DeepPartial<User>): User;
};
export declare const UserRepository: {
    encode(message: UserRepository, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): UserRepository;
    fromJSON(object: any): UserRepository;
    toJSON(message: UserRepository): unknown;
    fromPartial(object: DeepPartial<UserRepository>): UserRepository;
};
export declare const UserOrganization: {
    encode(message: UserOrganization, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): UserOrganization;
    fromJSON(object: any): UserOrganization;
    toJSON(message: UserOrganization): unknown;
    fromPartial(object: DeepPartial<UserOrganization>): UserOrganization;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
