import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "gitopia.gitopia.gitopia";
export interface Request {
    id: number;
    source: string;
    target: string;
    requestType: Request_Type;
    state: Request_State;
    message: string;
    expiry: number;
    createdAt: number;
}
export declare enum Request_Type {
    UPDATEREPOSITORYCOLLABORATOR = 0,
    UPDATEDAOMEMBER = 1,
    UNRECOGNIZED = -1
}
export declare function request_TypeFromJSON(object: any): Request_Type;
export declare function request_TypeToJSON(object: Request_Type): string;
export declare enum Request_State {
    AWAITED = 0,
    ACCEPTED = 1,
    REJECTED = 2,
    UNRECOGNIZED = -1
}
export declare function request_StateFromJSON(object: any): Request_State;
export declare function request_StateToJSON(object: Request_State): string;
export interface Requests {
    sent: number[];
    received: number[];
}
export declare const Request: {
    encode(message: Request, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Request;
    fromJSON(object: any): Request;
    toJSON(message: Request): unknown;
    fromPartial(object: DeepPartial<Request>): Request;
};
export declare const Requests: {
    encode(message: Requests, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Requests;
    fromJSON(object: any): Requests;
    toJSON(message: Requests): unknown;
    fromPartial(object: DeepPartial<Requests>): Requests;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
