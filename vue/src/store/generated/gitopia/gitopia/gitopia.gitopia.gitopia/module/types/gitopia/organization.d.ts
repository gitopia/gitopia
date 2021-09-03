import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "gitopia.gitopia.gitopia";
export interface Organization {
    creator: string;
    id: number;
    name: string;
    avatarUrl: string;
    followers: string[];
    following: string[];
    repositories: OrganizationRepository[];
    teams: number[];
    members: OrganizationMember[];
    location: string;
    email: string;
    website: string;
    verified: boolean;
    description: string;
    createdAt: number;
    updatedAt: number;
    extensions: string;
}
export interface OrganizationRepository {
    name: string;
    id: number;
}
export interface OrganizationMember {
    id: string;
    role: OrganizationMember_Role;
}
export declare enum OrganizationMember_Role {
    MEMBER = 0,
    OWNER = 1,
    UNRECOGNIZED = -1
}
export declare function organizationMember_RoleFromJSON(object: any): OrganizationMember_Role;
export declare function organizationMember_RoleToJSON(object: OrganizationMember_Role): string;
export declare const Organization: {
    encode(message: Organization, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Organization;
    fromJSON(object: any): Organization;
    toJSON(message: Organization): unknown;
    fromPartial(object: DeepPartial<Organization>): Organization;
};
export declare const OrganizationRepository: {
    encode(message: OrganizationRepository, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): OrganizationRepository;
    fromJSON(object: any): OrganizationRepository;
    toJSON(message: OrganizationRepository): unknown;
    fromPartial(object: DeepPartial<OrganizationRepository>): OrganizationRepository;
};
export declare const OrganizationMember: {
    encode(message: OrganizationMember, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): OrganizationMember;
    fromJSON(object: any): OrganizationMember;
    toJSON(message: OrganizationMember): unknown;
    fromPartial(object: DeepPartial<OrganizationMember>): OrganizationMember;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
