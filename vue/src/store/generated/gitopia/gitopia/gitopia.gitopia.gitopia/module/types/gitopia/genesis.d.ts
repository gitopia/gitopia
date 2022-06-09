import { Writer, Reader } from "protobufjs/minimal";
import { StorageProvider } from "../gitopia/storage_provider";
import { BaseRepositoryKey, Repository } from "../gitopia/repository";
import { UserDao, User } from "../gitopia/user";
import { Task } from "../gitopia/task";
import { Branch } from "../gitopia/branch";
import { Tag } from "../gitopia/tag";
import { Member } from "../gitopia/member";
import { Release } from "../gitopia/release";
import { PullRequest } from "../gitopia/pullRequest";
import { Dao } from "../gitopia/dao";
import { Comment } from "../gitopia/comment";
import { Issue } from "../gitopia/issue";
import { Whois } from "../gitopia/whois";
export declare const protobufPackage = "gitopia.gitopia.gitopia";
/** GenesisState defines the gitopia module's genesis state. */
export interface GenesisState {
    storageProviderList: StorageProvider[];
    storageProviderCount: number;
    baseRepositoryKeyList: BaseRepositoryKey[];
    userDaoList: UserDao[];
    taskList: Task[];
    taskCount: number;
    branchList: Branch[];
    branchCount: number;
    tagList: Tag[];
    tagCount: number;
    memberList: Member[];
    memberCount: number;
    /** this line is used by starport scaffolding # genesis/proto/state */
    releaseList: Release[];
    releaseCount: number;
    pullRequestList: PullRequest[];
    pullRequestCount: number;
    daoList: Dao[];
    daoCount: number;
    commentList: Comment[];
    commentCount: number;
    issueList: Issue[];
    issueCount: number;
    repositoryList: Repository[];
    repositoryCount: number;
    userList: User[];
    userCount: number;
    whoisList: Whois[];
    /** this line is used by starport scaffolding # ibc/genesis/proto */
    whoisCount: number;
}
export declare const GenesisState: {
    encode(message: GenesisState, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    fromPartial(object: DeepPartial<GenesisState>): GenesisState;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
