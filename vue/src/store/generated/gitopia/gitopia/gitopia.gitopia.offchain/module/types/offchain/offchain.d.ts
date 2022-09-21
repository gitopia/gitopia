import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "gitopia.gitopia.offchain";
/** MsgSignData defines an arbitrary, general-purpose, off-chain message */
export interface MsgSignData {
    /** signer is the bech32 representation of the signer's account address */
    signer: string;
    /** data represents the raw bytes of the content that is signed (text, json, etc) */
    data: Uint8Array;
}
/** ListOfMsgSignData defines a list of MsgSignData, used to marshal and unmarshal them in a clean way */
export interface ListOfMsgSignData {
    /** msgs is a list of messages */
    msgs: MsgSignData[];
}
export declare const MsgSignData: {
    encode(message: MsgSignData, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSignData;
    fromJSON(object: any): MsgSignData;
    toJSON(message: MsgSignData): unknown;
    fromPartial(object: DeepPartial<MsgSignData>): MsgSignData;
};
export declare const ListOfMsgSignData: {
    encode(message: ListOfMsgSignData, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): ListOfMsgSignData;
    fromJSON(object: any): ListOfMsgSignData;
    toJSON(message: ListOfMsgSignData): unknown;
    fromPartial(object: DeepPartial<ListOfMsgSignData>): ListOfMsgSignData;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
