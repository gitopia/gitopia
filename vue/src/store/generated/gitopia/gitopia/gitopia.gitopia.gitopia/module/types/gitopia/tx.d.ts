import { Reader, Writer } from "protobufjs/minimal";
export declare const protobufPackage = "gitopia.gitopia.gitopia";
/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgCreateUser {
    creator: string;
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
export interface MsgCreateUserResponse {
    id: number;
}
export interface MsgUpdateUser {
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
export interface MsgUpdateUserResponse {
}
export interface MsgDeleteUser {
    creator: string;
    id: number;
}
export interface MsgDeleteUserResponse {
}
export interface MsgSetWhois {
    creator: string;
    name: string;
    address: string;
}
export interface MsgSetWhoisResponse {
}
export interface MsgUpdateWhois {
    creator: string;
    name: string;
    address: string;
}
export interface MsgUpdateWhoisResponse {
}
export interface MsgDeleteWhois {
    creator: string;
    name: string;
}
export interface MsgDeleteWhoisResponse {
}
export declare const MsgCreateUser: {
    encode(message: MsgCreateUser, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateUser;
    fromJSON(object: any): MsgCreateUser;
    toJSON(message: MsgCreateUser): unknown;
    fromPartial(object: DeepPartial<MsgCreateUser>): MsgCreateUser;
};
export declare const MsgCreateUserResponse: {
    encode(message: MsgCreateUserResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateUserResponse;
    fromJSON(object: any): MsgCreateUserResponse;
    toJSON(message: MsgCreateUserResponse): unknown;
    fromPartial(object: DeepPartial<MsgCreateUserResponse>): MsgCreateUserResponse;
};
export declare const MsgUpdateUser: {
    encode(message: MsgUpdateUser, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateUser;
    fromJSON(object: any): MsgUpdateUser;
    toJSON(message: MsgUpdateUser): unknown;
    fromPartial(object: DeepPartial<MsgUpdateUser>): MsgUpdateUser;
};
export declare const MsgUpdateUserResponse: {
    encode(_: MsgUpdateUserResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateUserResponse;
    fromJSON(_: any): MsgUpdateUserResponse;
    toJSON(_: MsgUpdateUserResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdateUserResponse>): MsgUpdateUserResponse;
};
export declare const MsgDeleteUser: {
    encode(message: MsgDeleteUser, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteUser;
    fromJSON(object: any): MsgDeleteUser;
    toJSON(message: MsgDeleteUser): unknown;
    fromPartial(object: DeepPartial<MsgDeleteUser>): MsgDeleteUser;
};
export declare const MsgDeleteUserResponse: {
    encode(_: MsgDeleteUserResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteUserResponse;
    fromJSON(_: any): MsgDeleteUserResponse;
    toJSON(_: MsgDeleteUserResponse): unknown;
    fromPartial(_: DeepPartial<MsgDeleteUserResponse>): MsgDeleteUserResponse;
};
export declare const MsgSetWhois: {
    encode(message: MsgSetWhois, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSetWhois;
    fromJSON(object: any): MsgSetWhois;
    toJSON(message: MsgSetWhois): unknown;
    fromPartial(object: DeepPartial<MsgSetWhois>): MsgSetWhois;
};
export declare const MsgSetWhoisResponse: {
    encode(_: MsgSetWhoisResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSetWhoisResponse;
    fromJSON(_: any): MsgSetWhoisResponse;
    toJSON(_: MsgSetWhoisResponse): unknown;
    fromPartial(_: DeepPartial<MsgSetWhoisResponse>): MsgSetWhoisResponse;
};
export declare const MsgUpdateWhois: {
    encode(message: MsgUpdateWhois, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateWhois;
    fromJSON(object: any): MsgUpdateWhois;
    toJSON(message: MsgUpdateWhois): unknown;
    fromPartial(object: DeepPartial<MsgUpdateWhois>): MsgUpdateWhois;
};
export declare const MsgUpdateWhoisResponse: {
    encode(_: MsgUpdateWhoisResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateWhoisResponse;
    fromJSON(_: any): MsgUpdateWhoisResponse;
    toJSON(_: MsgUpdateWhoisResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdateWhoisResponse>): MsgUpdateWhoisResponse;
};
export declare const MsgDeleteWhois: {
    encode(message: MsgDeleteWhois, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteWhois;
    fromJSON(object: any): MsgDeleteWhois;
    toJSON(message: MsgDeleteWhois): unknown;
    fromPartial(object: DeepPartial<MsgDeleteWhois>): MsgDeleteWhois;
};
export declare const MsgDeleteWhoisResponse: {
    encode(_: MsgDeleteWhoisResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteWhoisResponse;
    fromJSON(_: any): MsgDeleteWhoisResponse;
    toJSON(_: MsgDeleteWhoisResponse): unknown;
    fromPartial(_: DeepPartial<MsgDeleteWhoisResponse>): MsgDeleteWhoisResponse;
};
/** Msg defines the Msg service. */
export interface Msg {
    /** this line is used by starport scaffolding # proto/tx/rpc */
    CreateUser(request: MsgCreateUser): Promise<MsgCreateUserResponse>;
    UpdateUser(request: MsgUpdateUser): Promise<MsgUpdateUserResponse>;
    DeleteUser(request: MsgDeleteUser): Promise<MsgDeleteUserResponse>;
    SetWhois(request: MsgSetWhois): Promise<MsgSetWhoisResponse>;
    UpdateWhois(request: MsgUpdateWhois): Promise<MsgUpdateWhoisResponse>;
    DeleteWhois(request: MsgDeleteWhois): Promise<MsgDeleteWhoisResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    CreateUser(request: MsgCreateUser): Promise<MsgCreateUserResponse>;
    UpdateUser(request: MsgUpdateUser): Promise<MsgUpdateUserResponse>;
    DeleteUser(request: MsgDeleteUser): Promise<MsgDeleteUserResponse>;
    SetWhois(request: MsgSetWhois): Promise<MsgSetWhoisResponse>;
    UpdateWhois(request: MsgUpdateWhois): Promise<MsgUpdateWhoisResponse>;
    DeleteWhois(request: MsgDeleteWhois): Promise<MsgDeleteWhoisResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
