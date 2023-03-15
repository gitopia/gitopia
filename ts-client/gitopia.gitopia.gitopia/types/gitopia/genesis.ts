/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Bounty } from "./bounty";
import { Branch } from "./branch";
import { Comment } from "./comment";
import { Dao } from "./dao";
import { Issue } from "./issue";
import { Member } from "./member";
import { Params } from "./params";
import { PullRequest } from "./pullRequest";
import { Release } from "./release";
import { BaseRepositoryKey, Repository } from "./repository";
import { Tag } from "./tag";
import { Task } from "./task";
import { User, UserDao } from "./user";
import { Whois } from "./whois";

export const protobufPackage = "gitopia.gitopia.gitopia";

/** GenesisState defines the gitopia module's genesis state. */
export interface GenesisState {
  /** params defines all the paramaters of the module. */
  params: Params | undefined;
  bountyList: Bounty[];
  bountyCount: number;
  userDaoList: UserDao[];
  baseRepositoryKeyList: BaseRepositoryKey[];
  memberList: Member[];
  memberCount: number;
  tagList: Tag[];
  tagCount: number;
  branchList: Branch[];
  branchCount: number;
  taskList: Task[];
  taskCount: number;
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

function createBaseGenesisState(): GenesisState {
  return {
    params: undefined,
    bountyList: [],
    bountyCount: 0,
    userDaoList: [],
    baseRepositoryKeyList: [],
    memberList: [],
    memberCount: 0,
    tagList: [],
    tagCount: 0,
    branchList: [],
    branchCount: 0,
    taskList: [],
    taskCount: 0,
    releaseList: [],
    releaseCount: 0,
    pullRequestList: [],
    pullRequestCount: 0,
    daoList: [],
    daoCount: 0,
    commentList: [],
    commentCount: 0,
    issueList: [],
    issueCount: 0,
    repositoryList: [],
    repositoryCount: 0,
    userList: [],
    userCount: 0,
    whoisList: [],
    whoisCount: 0,
  };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(234).fork()).ldelim();
    }
    for (const v of message.bountyList) {
      Bounty.encode(v!, writer.uint32(218).fork()).ldelim();
    }
    if (message.bountyCount !== 0) {
      writer.uint32(224).uint64(message.bountyCount);
    }
    for (const v of message.userDaoList) {
      UserDao.encode(v!, writer.uint32(202).fork()).ldelim();
    }
    for (const v of message.baseRepositoryKeyList) {
      BaseRepositoryKey.encode(v!, writer.uint32(210).fork()).ldelim();
    }
    for (const v of message.memberList) {
      Member.encode(v!, writer.uint32(186).fork()).ldelim();
    }
    if (message.memberCount !== 0) {
      writer.uint32(192).uint64(message.memberCount);
    }
    for (const v of message.tagList) {
      Tag.encode(v!, writer.uint32(170).fork()).ldelim();
    }
    if (message.tagCount !== 0) {
      writer.uint32(176).uint64(message.tagCount);
    }
    for (const v of message.branchList) {
      Branch.encode(v!, writer.uint32(154).fork()).ldelim();
    }
    if (message.branchCount !== 0) {
      writer.uint32(160).uint64(message.branchCount);
    }
    for (const v of message.taskList) {
      Task.encode(v!, writer.uint32(138).fork()).ldelim();
    }
    if (message.taskCount !== 0) {
      writer.uint32(144).uint64(message.taskCount);
    }
    for (const v of message.releaseList) {
      Release.encode(v!, writer.uint32(122).fork()).ldelim();
    }
    if (message.releaseCount !== 0) {
      writer.uint32(128).uint64(message.releaseCount);
    }
    for (const v of message.pullRequestList) {
      PullRequest.encode(v!, writer.uint32(106).fork()).ldelim();
    }
    if (message.pullRequestCount !== 0) {
      writer.uint32(112).uint64(message.pullRequestCount);
    }
    for (const v of message.daoList) {
      Dao.encode(v!, writer.uint32(90).fork()).ldelim();
    }
    if (message.daoCount !== 0) {
      writer.uint32(96).uint64(message.daoCount);
    }
    for (const v of message.commentList) {
      Comment.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    if (message.commentCount !== 0) {
      writer.uint32(80).uint64(message.commentCount);
    }
    for (const v of message.issueList) {
      Issue.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.issueCount !== 0) {
      writer.uint32(64).uint64(message.issueCount);
    }
    for (const v of message.repositoryList) {
      Repository.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.repositoryCount !== 0) {
      writer.uint32(48).uint64(message.repositoryCount);
    }
    for (const v of message.userList) {
      User.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.userCount !== 0) {
      writer.uint32(32).uint64(message.userCount);
    }
    for (const v of message.whoisList) {
      Whois.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.whoisCount !== 0) {
      writer.uint32(16).uint64(message.whoisCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 29:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 27:
          message.bountyList.push(Bounty.decode(reader, reader.uint32()));
          break;
        case 28:
          message.bountyCount = longToNumber(reader.uint64() as Long);
          break;
        case 25:
          message.userDaoList.push(UserDao.decode(reader, reader.uint32()));
          break;
        case 26:
          message.baseRepositoryKeyList.push(BaseRepositoryKey.decode(reader, reader.uint32()));
          break;
        case 23:
          message.memberList.push(Member.decode(reader, reader.uint32()));
          break;
        case 24:
          message.memberCount = longToNumber(reader.uint64() as Long);
          break;
        case 21:
          message.tagList.push(Tag.decode(reader, reader.uint32()));
          break;
        case 22:
          message.tagCount = longToNumber(reader.uint64() as Long);
          break;
        case 19:
          message.branchList.push(Branch.decode(reader, reader.uint32()));
          break;
        case 20:
          message.branchCount = longToNumber(reader.uint64() as Long);
          break;
        case 17:
          message.taskList.push(Task.decode(reader, reader.uint32()));
          break;
        case 18:
          message.taskCount = longToNumber(reader.uint64() as Long);
          break;
        case 15:
          message.releaseList.push(Release.decode(reader, reader.uint32()));
          break;
        case 16:
          message.releaseCount = longToNumber(reader.uint64() as Long);
          break;
        case 13:
          message.pullRequestList.push(PullRequest.decode(reader, reader.uint32()));
          break;
        case 14:
          message.pullRequestCount = longToNumber(reader.uint64() as Long);
          break;
        case 11:
          message.daoList.push(Dao.decode(reader, reader.uint32()));
          break;
        case 12:
          message.daoCount = longToNumber(reader.uint64() as Long);
          break;
        case 9:
          message.commentList.push(Comment.decode(reader, reader.uint32()));
          break;
        case 10:
          message.commentCount = longToNumber(reader.uint64() as Long);
          break;
        case 7:
          message.issueList.push(Issue.decode(reader, reader.uint32()));
          break;
        case 8:
          message.issueCount = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.repositoryList.push(Repository.decode(reader, reader.uint32()));
          break;
        case 6:
          message.repositoryCount = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.userList.push(User.decode(reader, reader.uint32()));
          break;
        case 4:
          message.userCount = longToNumber(reader.uint64() as Long);
          break;
        case 1:
          message.whoisList.push(Whois.decode(reader, reader.uint32()));
          break;
        case 2:
          message.whoisCount = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      bountyList: Array.isArray(object?.bountyList) ? object.bountyList.map((e: any) => Bounty.fromJSON(e)) : [],
      bountyCount: isSet(object.bountyCount) ? Number(object.bountyCount) : 0,
      userDaoList: Array.isArray(object?.userDaoList) ? object.userDaoList.map((e: any) => UserDao.fromJSON(e)) : [],
      baseRepositoryKeyList: Array.isArray(object?.baseRepositoryKeyList)
        ? object.baseRepositoryKeyList.map((e: any) => BaseRepositoryKey.fromJSON(e))
        : [],
      memberList: Array.isArray(object?.memberList) ? object.memberList.map((e: any) => Member.fromJSON(e)) : [],
      memberCount: isSet(object.memberCount) ? Number(object.memberCount) : 0,
      tagList: Array.isArray(object?.tagList) ? object.tagList.map((e: any) => Tag.fromJSON(e)) : [],
      tagCount: isSet(object.tagCount) ? Number(object.tagCount) : 0,
      branchList: Array.isArray(object?.branchList) ? object.branchList.map((e: any) => Branch.fromJSON(e)) : [],
      branchCount: isSet(object.branchCount) ? Number(object.branchCount) : 0,
      taskList: Array.isArray(object?.taskList) ? object.taskList.map((e: any) => Task.fromJSON(e)) : [],
      taskCount: isSet(object.taskCount) ? Number(object.taskCount) : 0,
      releaseList: Array.isArray(object?.releaseList) ? object.releaseList.map((e: any) => Release.fromJSON(e)) : [],
      releaseCount: isSet(object.releaseCount) ? Number(object.releaseCount) : 0,
      pullRequestList: Array.isArray(object?.pullRequestList)
        ? object.pullRequestList.map((e: any) => PullRequest.fromJSON(e))
        : [],
      pullRequestCount: isSet(object.pullRequestCount) ? Number(object.pullRequestCount) : 0,
      daoList: Array.isArray(object?.daoList) ? object.daoList.map((e: any) => Dao.fromJSON(e)) : [],
      daoCount: isSet(object.daoCount) ? Number(object.daoCount) : 0,
      commentList: Array.isArray(object?.commentList) ? object.commentList.map((e: any) => Comment.fromJSON(e)) : [],
      commentCount: isSet(object.commentCount) ? Number(object.commentCount) : 0,
      issueList: Array.isArray(object?.issueList) ? object.issueList.map((e: any) => Issue.fromJSON(e)) : [],
      issueCount: isSet(object.issueCount) ? Number(object.issueCount) : 0,
      repositoryList: Array.isArray(object?.repositoryList)
        ? object.repositoryList.map((e: any) => Repository.fromJSON(e))
        : [],
      repositoryCount: isSet(object.repositoryCount) ? Number(object.repositoryCount) : 0,
      userList: Array.isArray(object?.userList) ? object.userList.map((e: any) => User.fromJSON(e)) : [],
      userCount: isSet(object.userCount) ? Number(object.userCount) : 0,
      whoisList: Array.isArray(object?.whoisList) ? object.whoisList.map((e: any) => Whois.fromJSON(e)) : [],
      whoisCount: isSet(object.whoisCount) ? Number(object.whoisCount) : 0,
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.bountyList) {
      obj.bountyList = message.bountyList.map((e) => e ? Bounty.toJSON(e) : undefined);
    } else {
      obj.bountyList = [];
    }
    message.bountyCount !== undefined && (obj.bountyCount = Math.round(message.bountyCount));
    if (message.userDaoList) {
      obj.userDaoList = message.userDaoList.map((e) => e ? UserDao.toJSON(e) : undefined);
    } else {
      obj.userDaoList = [];
    }
    if (message.baseRepositoryKeyList) {
      obj.baseRepositoryKeyList = message.baseRepositoryKeyList.map((e) => e ? BaseRepositoryKey.toJSON(e) : undefined);
    } else {
      obj.baseRepositoryKeyList = [];
    }
    if (message.memberList) {
      obj.memberList = message.memberList.map((e) => e ? Member.toJSON(e) : undefined);
    } else {
      obj.memberList = [];
    }
    message.memberCount !== undefined && (obj.memberCount = Math.round(message.memberCount));
    if (message.tagList) {
      obj.tagList = message.tagList.map((e) => e ? Tag.toJSON(e) : undefined);
    } else {
      obj.tagList = [];
    }
    message.tagCount !== undefined && (obj.tagCount = Math.round(message.tagCount));
    if (message.branchList) {
      obj.branchList = message.branchList.map((e) => e ? Branch.toJSON(e) : undefined);
    } else {
      obj.branchList = [];
    }
    message.branchCount !== undefined && (obj.branchCount = Math.round(message.branchCount));
    if (message.taskList) {
      obj.taskList = message.taskList.map((e) => e ? Task.toJSON(e) : undefined);
    } else {
      obj.taskList = [];
    }
    message.taskCount !== undefined && (obj.taskCount = Math.round(message.taskCount));
    if (message.releaseList) {
      obj.releaseList = message.releaseList.map((e) => e ? Release.toJSON(e) : undefined);
    } else {
      obj.releaseList = [];
    }
    message.releaseCount !== undefined && (obj.releaseCount = Math.round(message.releaseCount));
    if (message.pullRequestList) {
      obj.pullRequestList = message.pullRequestList.map((e) => e ? PullRequest.toJSON(e) : undefined);
    } else {
      obj.pullRequestList = [];
    }
    message.pullRequestCount !== undefined && (obj.pullRequestCount = Math.round(message.pullRequestCount));
    if (message.daoList) {
      obj.daoList = message.daoList.map((e) => e ? Dao.toJSON(e) : undefined);
    } else {
      obj.daoList = [];
    }
    message.daoCount !== undefined && (obj.daoCount = Math.round(message.daoCount));
    if (message.commentList) {
      obj.commentList = message.commentList.map((e) => e ? Comment.toJSON(e) : undefined);
    } else {
      obj.commentList = [];
    }
    message.commentCount !== undefined && (obj.commentCount = Math.round(message.commentCount));
    if (message.issueList) {
      obj.issueList = message.issueList.map((e) => e ? Issue.toJSON(e) : undefined);
    } else {
      obj.issueList = [];
    }
    message.issueCount !== undefined && (obj.issueCount = Math.round(message.issueCount));
    if (message.repositoryList) {
      obj.repositoryList = message.repositoryList.map((e) => e ? Repository.toJSON(e) : undefined);
    } else {
      obj.repositoryList = [];
    }
    message.repositoryCount !== undefined && (obj.repositoryCount = Math.round(message.repositoryCount));
    if (message.userList) {
      obj.userList = message.userList.map((e) => e ? User.toJSON(e) : undefined);
    } else {
      obj.userList = [];
    }
    message.userCount !== undefined && (obj.userCount = Math.round(message.userCount));
    if (message.whoisList) {
      obj.whoisList = message.whoisList.map((e) => e ? Whois.toJSON(e) : undefined);
    } else {
      obj.whoisList = [];
    }
    message.whoisCount !== undefined && (obj.whoisCount = Math.round(message.whoisCount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    message.bountyList = object.bountyList?.map((e) => Bounty.fromPartial(e)) || [];
    message.bountyCount = object.bountyCount ?? 0;
    message.userDaoList = object.userDaoList?.map((e) => UserDao.fromPartial(e)) || [];
    message.baseRepositoryKeyList = object.baseRepositoryKeyList?.map((e) => BaseRepositoryKey.fromPartial(e)) || [];
    message.memberList = object.memberList?.map((e) => Member.fromPartial(e)) || [];
    message.memberCount = object.memberCount ?? 0;
    message.tagList = object.tagList?.map((e) => Tag.fromPartial(e)) || [];
    message.tagCount = object.tagCount ?? 0;
    message.branchList = object.branchList?.map((e) => Branch.fromPartial(e)) || [];
    message.branchCount = object.branchCount ?? 0;
    message.taskList = object.taskList?.map((e) => Task.fromPartial(e)) || [];
    message.taskCount = object.taskCount ?? 0;
    message.releaseList = object.releaseList?.map((e) => Release.fromPartial(e)) || [];
    message.releaseCount = object.releaseCount ?? 0;
    message.pullRequestList = object.pullRequestList?.map((e) => PullRequest.fromPartial(e)) || [];
    message.pullRequestCount = object.pullRequestCount ?? 0;
    message.daoList = object.daoList?.map((e) => Dao.fromPartial(e)) || [];
    message.daoCount = object.daoCount ?? 0;
    message.commentList = object.commentList?.map((e) => Comment.fromPartial(e)) || [];
    message.commentCount = object.commentCount ?? 0;
    message.issueList = object.issueList?.map((e) => Issue.fromPartial(e)) || [];
    message.issueCount = object.issueCount ?? 0;
    message.repositoryList = object.repositoryList?.map((e) => Repository.fromPartial(e)) || [];
    message.repositoryCount = object.repositoryCount ?? 0;
    message.userList = object.userList?.map((e) => User.fromPartial(e)) || [];
    message.userCount = object.userCount ?? 0;
    message.whoisList = object.whoisList?.map((e) => Whois.fromPartial(e)) || [];
    message.whoisCount = object.whoisCount ?? 0;
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
