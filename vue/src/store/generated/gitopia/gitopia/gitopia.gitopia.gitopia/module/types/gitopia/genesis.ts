/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import { Organization } from "../gitopia/organization";
import { Comment } from "../gitopia/comment";
import { Issue } from "../gitopia/issue";
import { Repository } from "../gitopia/repository";
import { User } from "../gitopia/user";
import { Whois } from "../gitopia/whois";

export const protobufPackage = "gitopia.gitopia.gitopia";

/** GenesisState defines the gitopia module's genesis state. */
export interface GenesisState {
  /** this line is used by starport scaffolding # genesis/proto/state */
  organizationList: Organization[];
  /** this line is used by starport scaffolding # genesis/proto/stateField */
  organizationCount: number;
  /** this line is used by starport scaffolding # genesis/proto/stateField */
  commentList: Comment[];
  /** this line is used by starport scaffolding # genesis/proto/stateField */
  commentCount: number;
  /** this line is used by starport scaffolding # genesis/proto/stateField */
  issueList: Issue[];
  /** this line is used by starport scaffolding # genesis/proto/stateField */
  issueCount: number;
  /** this line is used by starport scaffolding # genesis/proto/stateField */
  repositoryList: Repository[];
  /** this line is used by starport scaffolding # genesis/proto/stateField */
  repositoryCount: number;
  /** this line is used by starport scaffolding # genesis/proto/stateField */
  userList: User[];
  /** this line is used by starport scaffolding # genesis/proto/stateField */
  userCount: number;
  /** this line is used by starport scaffolding # genesis/proto/stateField */
  whoisList: Whois[];
  /** this line is used by starport scaffolding # genesis/proto/stateField */
  whoisCount: number;
}

const baseGenesisState: object = {
  organizationCount: 0,
  commentCount: 0,
  issueCount: 0,
  repositoryCount: 0,
  userCount: 0,
  whoisCount: 0,
};

export const GenesisState = {
  encode(message: GenesisState, writer: Writer = Writer.create()): Writer {
    for (const v of message.organizationList) {
      Organization.encode(v!, writer.uint32(90).fork()).ldelim();
    }
    if (message.organizationCount !== 0) {
      writer.uint32(96).uint64(message.organizationCount);
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

  decode(input: Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenesisState } as GenesisState;
    message.organizationList = [];
    message.commentList = [];
    message.issueList = [];
    message.repositoryList = [];
    message.userList = [];
    message.whoisList = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 11:
          message.organizationList.push(
            Organization.decode(reader, reader.uint32())
          );
          break;
        case 12:
          message.organizationCount = longToNumber(reader.uint64() as Long);
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
          message.repositoryList.push(
            Repository.decode(reader, reader.uint32())
          );
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
    const message = { ...baseGenesisState } as GenesisState;
    message.organizationList = [];
    message.commentList = [];
    message.issueList = [];
    message.repositoryList = [];
    message.userList = [];
    message.whoisList = [];
    if (
      object.organizationList !== undefined &&
      object.organizationList !== null
    ) {
      for (const e of object.organizationList) {
        message.organizationList.push(Organization.fromJSON(e));
      }
    }
    if (
      object.organizationCount !== undefined &&
      object.organizationCount !== null
    ) {
      message.organizationCount = Number(object.organizationCount);
    } else {
      message.organizationCount = 0;
    }
    if (object.commentList !== undefined && object.commentList !== null) {
      for (const e of object.commentList) {
        message.commentList.push(Comment.fromJSON(e));
      }
    }
    if (object.commentCount !== undefined && object.commentCount !== null) {
      message.commentCount = Number(object.commentCount);
    } else {
      message.commentCount = 0;
    }
    if (object.issueList !== undefined && object.issueList !== null) {
      for (const e of object.issueList) {
        message.issueList.push(Issue.fromJSON(e));
      }
    }
    if (object.issueCount !== undefined && object.issueCount !== null) {
      message.issueCount = Number(object.issueCount);
    } else {
      message.issueCount = 0;
    }
    if (object.repositoryList !== undefined && object.repositoryList !== null) {
      for (const e of object.repositoryList) {
        message.repositoryList.push(Repository.fromJSON(e));
      }
    }
    if (
      object.repositoryCount !== undefined &&
      object.repositoryCount !== null
    ) {
      message.repositoryCount = Number(object.repositoryCount);
    } else {
      message.repositoryCount = 0;
    }
    if (object.userList !== undefined && object.userList !== null) {
      for (const e of object.userList) {
        message.userList.push(User.fromJSON(e));
      }
    }
    if (object.userCount !== undefined && object.userCount !== null) {
      message.userCount = Number(object.userCount);
    } else {
      message.userCount = 0;
    }
    if (object.whoisList !== undefined && object.whoisList !== null) {
      for (const e of object.whoisList) {
        message.whoisList.push(Whois.fromJSON(e));
      }
    }
    if (object.whoisCount !== undefined && object.whoisCount !== null) {
      message.whoisCount = Number(object.whoisCount);
    } else {
      message.whoisCount = 0;
    }
    return message;
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.organizationList) {
      obj.organizationList = message.organizationList.map((e) =>
        e ? Organization.toJSON(e) : undefined
      );
    } else {
      obj.organizationList = [];
    }
    message.organizationCount !== undefined &&
      (obj.organizationCount = message.organizationCount);
    if (message.commentList) {
      obj.commentList = message.commentList.map((e) =>
        e ? Comment.toJSON(e) : undefined
      );
    } else {
      obj.commentList = [];
    }
    message.commentCount !== undefined &&
      (obj.commentCount = message.commentCount);
    if (message.issueList) {
      obj.issueList = message.issueList.map((e) =>
        e ? Issue.toJSON(e) : undefined
      );
    } else {
      obj.issueList = [];
    }
    message.issueCount !== undefined && (obj.issueCount = message.issueCount);
    if (message.repositoryList) {
      obj.repositoryList = message.repositoryList.map((e) =>
        e ? Repository.toJSON(e) : undefined
      );
    } else {
      obj.repositoryList = [];
    }
    message.repositoryCount !== undefined &&
      (obj.repositoryCount = message.repositoryCount);
    if (message.userList) {
      obj.userList = message.userList.map((e) =>
        e ? User.toJSON(e) : undefined
      );
    } else {
      obj.userList = [];
    }
    message.userCount !== undefined && (obj.userCount = message.userCount);
    if (message.whoisList) {
      obj.whoisList = message.whoisList.map((e) =>
        e ? Whois.toJSON(e) : undefined
      );
    } else {
      obj.whoisList = [];
    }
    message.whoisCount !== undefined && (obj.whoisCount = message.whoisCount);
    return obj;
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.organizationList = [];
    message.commentList = [];
    message.issueList = [];
    message.repositoryList = [];
    message.userList = [];
    message.whoisList = [];
    if (
      object.organizationList !== undefined &&
      object.organizationList !== null
    ) {
      for (const e of object.organizationList) {
        message.organizationList.push(Organization.fromPartial(e));
      }
    }
    if (
      object.organizationCount !== undefined &&
      object.organizationCount !== null
    ) {
      message.organizationCount = object.organizationCount;
    } else {
      message.organizationCount = 0;
    }
    if (object.commentList !== undefined && object.commentList !== null) {
      for (const e of object.commentList) {
        message.commentList.push(Comment.fromPartial(e));
      }
    }
    if (object.commentCount !== undefined && object.commentCount !== null) {
      message.commentCount = object.commentCount;
    } else {
      message.commentCount = 0;
    }
    if (object.issueList !== undefined && object.issueList !== null) {
      for (const e of object.issueList) {
        message.issueList.push(Issue.fromPartial(e));
      }
    }
    if (object.issueCount !== undefined && object.issueCount !== null) {
      message.issueCount = object.issueCount;
    } else {
      message.issueCount = 0;
    }
    if (object.repositoryList !== undefined && object.repositoryList !== null) {
      for (const e of object.repositoryList) {
        message.repositoryList.push(Repository.fromPartial(e));
      }
    }
    if (
      object.repositoryCount !== undefined &&
      object.repositoryCount !== null
    ) {
      message.repositoryCount = object.repositoryCount;
    } else {
      message.repositoryCount = 0;
    }
    if (object.userList !== undefined && object.userList !== null) {
      for (const e of object.userList) {
        message.userList.push(User.fromPartial(e));
      }
    }
    if (object.userCount !== undefined && object.userCount !== null) {
      message.userCount = object.userCount;
    } else {
      message.userCount = 0;
    }
    if (object.whoisList !== undefined && object.whoisList !== null) {
      for (const e of object.whoisList) {
        message.whoisList.push(Whois.fromPartial(e));
      }
    }
    if (object.whoisCount !== undefined && object.whoisCount !== null) {
      message.whoisCount = object.whoisCount;
    } else {
      message.whoisCount = 0;
    }
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
