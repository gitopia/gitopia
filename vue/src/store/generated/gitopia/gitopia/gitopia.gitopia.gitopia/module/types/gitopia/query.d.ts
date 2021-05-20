import { Reader, Writer } from "protobufjs/minimal";
import { Repository } from "../gitopia/repository";
import { PageRequest, PageResponse } from "../cosmos/base/query/v1beta1/pagination";
import { User } from "../gitopia/user";
import { Whois } from "../gitopia/whois";
export declare const protobufPackage = "gitopia.gitopia.gitopia";
/** this line is used by starport scaffolding # 3 */
export interface QueryGetRepositoryRequest {
    id: number;
}
export interface QueryGetRepositoryResponse {
    Repository: Repository | undefined;
}
export interface QueryAllRepositoryRequest {
    pagination: PageRequest | undefined;
}
export interface QueryAllRepositoryResponse {
    Repository: Repository[];
    pagination: PageResponse | undefined;
}
export interface QueryGetUserRequest {
    id: number;
}
export interface QueryGetUserResponse {
    User: User | undefined;
}
export interface QueryAllUserRequest {
    pagination: PageRequest | undefined;
}
export interface QueryAllUserResponse {
    User: User[];
    pagination: PageResponse | undefined;
}
export interface QueryGetWhoisRequest {
    name: string;
}
export interface QueryGetWhoisResponse {
    Whois: Whois | undefined;
}
export interface QueryAllWhoisRequest {
    pagination: PageRequest | undefined;
}
export interface QueryAllWhoisResponse {
    Whois: Whois[];
    pagination: PageResponse | undefined;
}
export declare const QueryGetRepositoryRequest: {
    encode(message: QueryGetRepositoryRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetRepositoryRequest;
    fromJSON(object: any): QueryGetRepositoryRequest;
    toJSON(message: QueryGetRepositoryRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetRepositoryRequest>): QueryGetRepositoryRequest;
};
export declare const QueryGetRepositoryResponse: {
    encode(message: QueryGetRepositoryResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetRepositoryResponse;
    fromJSON(object: any): QueryGetRepositoryResponse;
    toJSON(message: QueryGetRepositoryResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetRepositoryResponse>): QueryGetRepositoryResponse;
};
export declare const QueryAllRepositoryRequest: {
    encode(message: QueryAllRepositoryRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllRepositoryRequest;
    fromJSON(object: any): QueryAllRepositoryRequest;
    toJSON(message: QueryAllRepositoryRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllRepositoryRequest>): QueryAllRepositoryRequest;
};
export declare const QueryAllRepositoryResponse: {
    encode(message: QueryAllRepositoryResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllRepositoryResponse;
    fromJSON(object: any): QueryAllRepositoryResponse;
    toJSON(message: QueryAllRepositoryResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllRepositoryResponse>): QueryAllRepositoryResponse;
};
export declare const QueryGetUserRequest: {
    encode(message: QueryGetUserRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetUserRequest;
    fromJSON(object: any): QueryGetUserRequest;
    toJSON(message: QueryGetUserRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetUserRequest>): QueryGetUserRequest;
};
export declare const QueryGetUserResponse: {
    encode(message: QueryGetUserResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetUserResponse;
    fromJSON(object: any): QueryGetUserResponse;
    toJSON(message: QueryGetUserResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetUserResponse>): QueryGetUserResponse;
};
export declare const QueryAllUserRequest: {
    encode(message: QueryAllUserRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllUserRequest;
    fromJSON(object: any): QueryAllUserRequest;
    toJSON(message: QueryAllUserRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllUserRequest>): QueryAllUserRequest;
};
export declare const QueryAllUserResponse: {
    encode(message: QueryAllUserResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllUserResponse;
    fromJSON(object: any): QueryAllUserResponse;
    toJSON(message: QueryAllUserResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllUserResponse>): QueryAllUserResponse;
};
export declare const QueryGetWhoisRequest: {
    encode(message: QueryGetWhoisRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetWhoisRequest;
    fromJSON(object: any): QueryGetWhoisRequest;
    toJSON(message: QueryGetWhoisRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetWhoisRequest>): QueryGetWhoisRequest;
};
export declare const QueryGetWhoisResponse: {
    encode(message: QueryGetWhoisResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetWhoisResponse;
    fromJSON(object: any): QueryGetWhoisResponse;
    toJSON(message: QueryGetWhoisResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetWhoisResponse>): QueryGetWhoisResponse;
};
export declare const QueryAllWhoisRequest: {
    encode(message: QueryAllWhoisRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllWhoisRequest;
    fromJSON(object: any): QueryAllWhoisRequest;
    toJSON(message: QueryAllWhoisRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllWhoisRequest>): QueryAllWhoisRequest;
};
export declare const QueryAllWhoisResponse: {
    encode(message: QueryAllWhoisResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllWhoisResponse;
    fromJSON(object: any): QueryAllWhoisResponse;
    toJSON(message: QueryAllWhoisResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllWhoisResponse>): QueryAllWhoisResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** this line is used by starport scaffolding # 2 */
    Repository(request: QueryGetRepositoryRequest): Promise<QueryGetRepositoryResponse>;
    RepositoryAll(request: QueryAllRepositoryRequest): Promise<QueryAllRepositoryResponse>;
    User(request: QueryGetUserRequest): Promise<QueryGetUserResponse>;
    UserAll(request: QueryAllUserRequest): Promise<QueryAllUserResponse>;
    Whois(request: QueryGetWhoisRequest): Promise<QueryGetWhoisResponse>;
    WhoisAll(request: QueryAllWhoisRequest): Promise<QueryAllWhoisResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    Repository(request: QueryGetRepositoryRequest): Promise<QueryGetRepositoryResponse>;
    RepositoryAll(request: QueryAllRepositoryRequest): Promise<QueryAllRepositoryResponse>;
    User(request: QueryGetUserRequest): Promise<QueryGetUserResponse>;
    UserAll(request: QueryAllUserRequest): Promise<QueryAllUserResponse>;
    Whois(request: QueryGetWhoisRequest): Promise<QueryGetWhoisResponse>;
    WhoisAll(request: QueryAllWhoisRequest): Promise<QueryAllWhoisResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
