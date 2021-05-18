import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "gitopia.gitopia.gitopia";
export interface User {
    creator: string;
    id: number;
    username: string;
    usernameGithub: string;
    avatarUrl: string;
    followers: string;
    following: string;
    repositories: string;
    repositoriesArchived: string;
    organizations: string;
    starredRepos: string;
    subscriptions: string;
    email: string;
    bio: string;
    createdAt: string;
    updatedAt: string;
    extensions: string;
}
export declare const User: {
    encode(message: User, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): User;
    fromJSON(object: any): User;
    toJSON(message: User): unknown;
    fromPartial(object: DeepPartial<User>): User;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
