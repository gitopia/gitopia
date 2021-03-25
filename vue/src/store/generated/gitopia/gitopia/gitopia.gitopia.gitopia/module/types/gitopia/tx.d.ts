import { Reader, Writer } from "protobufjs/minimal";
export declare const protobufPackage = "gitopia.gitopia.gitopia";
/** this line is used by starport scaffolding # proto/tx/message */
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
    SetWhois(request: MsgSetWhois): Promise<MsgSetWhoisResponse>;
    UpdateWhois(request: MsgUpdateWhois): Promise<MsgUpdateWhoisResponse>;
    DeleteWhois(request: MsgDeleteWhois): Promise<MsgDeleteWhoisResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
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
