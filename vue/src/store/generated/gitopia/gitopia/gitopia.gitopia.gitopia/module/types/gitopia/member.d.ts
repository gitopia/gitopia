import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "gitopia.gitopia.gitopia";
export declare enum MemberRole {
    MEMBER = 0,
    OWNER = 1,
    UNRECOGNIZED = -1
}
export declare function memberRoleFromJSON(object: any): MemberRole;
export declare function memberRoleToJSON(object: MemberRole): string;
export interface Member {
    id: number;
    address: string;
    daoAddress: string;
    role: MemberRole;
}
export declare const Member: {
    encode(message: Member, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Member;
    fromJSON(object: any): Member;
    toJSON(message: Member): unknown;
    fromPartial(object: DeepPartial<Member>): Member;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
