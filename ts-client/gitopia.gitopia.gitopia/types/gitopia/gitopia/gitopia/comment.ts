/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Attachment } from "./attachment";
import { Reaction } from "./reaction";

export const protobufPackage = "gitopia.gitopia.gitopia";

export enum CommentType {
  COMMENT_TYPE_NONE = 0,
  COMMENT_TYPE_REPLY = 1,
  COMMENT_TYPE_ADD_LABELS = 2,
  COMMENT_TYPE_REMOVE_LABELS = 3,
  COMMENT_TYPE_ADD_ASSIGNEES = 4,
  COMMENT_TYPE_REMOVE_ASSIGNEES = 5,
  COMMENT_TYPE_ADD_REVIEWERS = 6,
  COMMENT_TYPE_REMOVE_REVIEWERS = 7,
  COMMENT_TYPE_MODIFIED_TITLE = 8,
  COMMENT_TYPE_MODIFIED_DESCRIPTION = 9,
  COMMENT_TYPE_ISSUE_CLOSED = 10,
  COMMENT_TYPE_ISSUE_OPENED = 11,
  COMMENT_TYPE_PULL_REQUEST_CLOSED = 12,
  COMMENT_TYPE_PULL_REQUEST_OPENED = 13,
  COMMENT_TYPE_PULL_REQUEST_MERGED = 14,
  COMMENT_TYPE_REVIEW = 15,
  COMMENT_TYPE_ADD_BOUNTY = 16,
  COMMENT_TYPE_MODIFIED_BOUNTY = 17,
  COMMENT_TYPE_CLOSED_BOUNTY = 18,
  UNRECOGNIZED = -1,
}

export function commentTypeFromJSON(object: any): CommentType {
  switch (object) {
    case 0:
    case "COMMENT_TYPE_NONE":
      return CommentType.COMMENT_TYPE_NONE;
    case 1:
    case "COMMENT_TYPE_REPLY":
      return CommentType.COMMENT_TYPE_REPLY;
    case 2:
    case "COMMENT_TYPE_ADD_LABELS":
      return CommentType.COMMENT_TYPE_ADD_LABELS;
    case 3:
    case "COMMENT_TYPE_REMOVE_LABELS":
      return CommentType.COMMENT_TYPE_REMOVE_LABELS;
    case 4:
    case "COMMENT_TYPE_ADD_ASSIGNEES":
      return CommentType.COMMENT_TYPE_ADD_ASSIGNEES;
    case 5:
    case "COMMENT_TYPE_REMOVE_ASSIGNEES":
      return CommentType.COMMENT_TYPE_REMOVE_ASSIGNEES;
    case 6:
    case "COMMENT_TYPE_ADD_REVIEWERS":
      return CommentType.COMMENT_TYPE_ADD_REVIEWERS;
    case 7:
    case "COMMENT_TYPE_REMOVE_REVIEWERS":
      return CommentType.COMMENT_TYPE_REMOVE_REVIEWERS;
    case 8:
    case "COMMENT_TYPE_MODIFIED_TITLE":
      return CommentType.COMMENT_TYPE_MODIFIED_TITLE;
    case 9:
    case "COMMENT_TYPE_MODIFIED_DESCRIPTION":
      return CommentType.COMMENT_TYPE_MODIFIED_DESCRIPTION;
    case 10:
    case "COMMENT_TYPE_ISSUE_CLOSED":
      return CommentType.COMMENT_TYPE_ISSUE_CLOSED;
    case 11:
    case "COMMENT_TYPE_ISSUE_OPENED":
      return CommentType.COMMENT_TYPE_ISSUE_OPENED;
    case 12:
    case "COMMENT_TYPE_PULL_REQUEST_CLOSED":
      return CommentType.COMMENT_TYPE_PULL_REQUEST_CLOSED;
    case 13:
    case "COMMENT_TYPE_PULL_REQUEST_OPENED":
      return CommentType.COMMENT_TYPE_PULL_REQUEST_OPENED;
    case 14:
    case "COMMENT_TYPE_PULL_REQUEST_MERGED":
      return CommentType.COMMENT_TYPE_PULL_REQUEST_MERGED;
    case 15:
    case "COMMENT_TYPE_REVIEW":
      return CommentType.COMMENT_TYPE_REVIEW;
    case 16:
    case "COMMENT_TYPE_ADD_BOUNTY":
      return CommentType.COMMENT_TYPE_ADD_BOUNTY;
    case 17:
    case "COMMENT_TYPE_MODIFIED_BOUNTY":
      return CommentType.COMMENT_TYPE_MODIFIED_BOUNTY;
    case 18:
    case "COMMENT_TYPE_CLOSED_BOUNTY":
      return CommentType.COMMENT_TYPE_CLOSED_BOUNTY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CommentType.UNRECOGNIZED;
  }
}

export function commentTypeToJSON(object: CommentType): string {
  switch (object) {
    case CommentType.COMMENT_TYPE_NONE:
      return "COMMENT_TYPE_NONE";
    case CommentType.COMMENT_TYPE_REPLY:
      return "COMMENT_TYPE_REPLY";
    case CommentType.COMMENT_TYPE_ADD_LABELS:
      return "COMMENT_TYPE_ADD_LABELS";
    case CommentType.COMMENT_TYPE_REMOVE_LABELS:
      return "COMMENT_TYPE_REMOVE_LABELS";
    case CommentType.COMMENT_TYPE_ADD_ASSIGNEES:
      return "COMMENT_TYPE_ADD_ASSIGNEES";
    case CommentType.COMMENT_TYPE_REMOVE_ASSIGNEES:
      return "COMMENT_TYPE_REMOVE_ASSIGNEES";
    case CommentType.COMMENT_TYPE_ADD_REVIEWERS:
      return "COMMENT_TYPE_ADD_REVIEWERS";
    case CommentType.COMMENT_TYPE_REMOVE_REVIEWERS:
      return "COMMENT_TYPE_REMOVE_REVIEWERS";
    case CommentType.COMMENT_TYPE_MODIFIED_TITLE:
      return "COMMENT_TYPE_MODIFIED_TITLE";
    case CommentType.COMMENT_TYPE_MODIFIED_DESCRIPTION:
      return "COMMENT_TYPE_MODIFIED_DESCRIPTION";
    case CommentType.COMMENT_TYPE_ISSUE_CLOSED:
      return "COMMENT_TYPE_ISSUE_CLOSED";
    case CommentType.COMMENT_TYPE_ISSUE_OPENED:
      return "COMMENT_TYPE_ISSUE_OPENED";
    case CommentType.COMMENT_TYPE_PULL_REQUEST_CLOSED:
      return "COMMENT_TYPE_PULL_REQUEST_CLOSED";
    case CommentType.COMMENT_TYPE_PULL_REQUEST_OPENED:
      return "COMMENT_TYPE_PULL_REQUEST_OPENED";
    case CommentType.COMMENT_TYPE_PULL_REQUEST_MERGED:
      return "COMMENT_TYPE_PULL_REQUEST_MERGED";
    case CommentType.COMMENT_TYPE_REVIEW:
      return "COMMENT_TYPE_REVIEW";
    case CommentType.COMMENT_TYPE_ADD_BOUNTY:
      return "COMMENT_TYPE_ADD_BOUNTY";
    case CommentType.COMMENT_TYPE_MODIFIED_BOUNTY:
      return "COMMENT_TYPE_MODIFIED_BOUNTY";
    case CommentType.COMMENT_TYPE_CLOSED_BOUNTY:
      return "COMMENT_TYPE_CLOSED_BOUNTY";
    case CommentType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum CommentParent {
  COMMENT_PARENT_NONE = 0,
  COMMENT_PARENT_ISSUE = 1,
  COMMENT_PARENT_PULL_REQUEST = 2,
  UNRECOGNIZED = -1,
}

export function commentParentFromJSON(object: any): CommentParent {
  switch (object) {
    case 0:
    case "COMMENT_PARENT_NONE":
      return CommentParent.COMMENT_PARENT_NONE;
    case 1:
    case "COMMENT_PARENT_ISSUE":
      return CommentParent.COMMENT_PARENT_ISSUE;
    case 2:
    case "COMMENT_PARENT_PULL_REQUEST":
      return CommentParent.COMMENT_PARENT_PULL_REQUEST;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CommentParent.UNRECOGNIZED;
  }
}

export function commentParentToJSON(object: CommentParent): string {
  switch (object) {
    case CommentParent.COMMENT_PARENT_NONE:
      return "COMMENT_PARENT_NONE";
    case CommentParent.COMMENT_PARENT_ISSUE:
      return "COMMENT_PARENT_ISSUE";
    case CommentParent.COMMENT_PARENT_PULL_REQUEST:
      return "COMMENT_PARENT_PULL_REQUEST";
    case CommentParent.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Comment {
  creator: string;
  id: number;
  repositoryId: number;
  parentIid: number;
  parent: CommentParent;
  commentIid: number;
  body: string;
  attachments: Attachment[];
  diffHunk: string;
  path: string;
  position: number;
  system: boolean;
  authorAssociation: string;
  createdAt: number;
  updatedAt: number;
  commentType: CommentType;
  resolved: boolean;
  replies: number[];
  reactions: Reaction[];
  hidden: boolean;
}

function createBaseComment(): Comment {
  return {
    creator: "",
    id: 0,
    repositoryId: 0,
    parentIid: 0,
    parent: 0,
    commentIid: 0,
    body: "",
    attachments: [],
    diffHunk: "",
    path: "",
    position: 0,
    system: false,
    authorAssociation: "",
    createdAt: 0,
    updatedAt: 0,
    commentType: 0,
    resolved: false,
    replies: [],
    reactions: [],
    hidden: false,
  };
}

export const Comment = {
  encode(message: Comment, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.repositoryId !== 0) {
      writer.uint32(24).uint64(message.repositoryId);
    }
    if (message.parentIid !== 0) {
      writer.uint32(32).uint64(message.parentIid);
    }
    if (message.parent !== 0) {
      writer.uint32(40).int32(message.parent);
    }
    if (message.commentIid !== 0) {
      writer.uint32(48).uint64(message.commentIid);
    }
    if (message.body !== "") {
      writer.uint32(58).string(message.body);
    }
    for (const v of message.attachments) {
      Attachment.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    if (message.diffHunk !== "") {
      writer.uint32(74).string(message.diffHunk);
    }
    if (message.path !== "") {
      writer.uint32(82).string(message.path);
    }
    if (message.position !== 0) {
      writer.uint32(88).uint64(message.position);
    }
    if (message.system === true) {
      writer.uint32(96).bool(message.system);
    }
    if (message.authorAssociation !== "") {
      writer.uint32(106).string(message.authorAssociation);
    }
    if (message.createdAt !== 0) {
      writer.uint32(112).int64(message.createdAt);
    }
    if (message.updatedAt !== 0) {
      writer.uint32(120).int64(message.updatedAt);
    }
    if (message.commentType !== 0) {
      writer.uint32(128).int32(message.commentType);
    }
    if (message.resolved === true) {
      writer.uint32(136).bool(message.resolved);
    }
    writer.uint32(146).fork();
    for (const v of message.replies) {
      writer.uint64(v);
    }
    writer.ldelim();
    for (const v of message.reactions) {
      Reaction.encode(v!, writer.uint32(154).fork()).ldelim();
    }
    if (message.hidden === true) {
      writer.uint32(160).bool(message.hidden);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Comment {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseComment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.parentIid = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.parent = reader.int32() as any;
          break;
        case 6:
          message.commentIid = longToNumber(reader.uint64() as Long);
          break;
        case 7:
          message.body = reader.string();
          break;
        case 8:
          message.attachments.push(Attachment.decode(reader, reader.uint32()));
          break;
        case 9:
          message.diffHunk = reader.string();
          break;
        case 10:
          message.path = reader.string();
          break;
        case 11:
          message.position = longToNumber(reader.uint64() as Long);
          break;
        case 12:
          message.system = reader.bool();
          break;
        case 13:
          message.authorAssociation = reader.string();
          break;
        case 14:
          message.createdAt = longToNumber(reader.int64() as Long);
          break;
        case 15:
          message.updatedAt = longToNumber(reader.int64() as Long);
          break;
        case 16:
          message.commentType = reader.int32() as any;
          break;
        case 17:
          message.resolved = reader.bool();
          break;
        case 18:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.replies.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.replies.push(longToNumber(reader.uint64() as Long));
          }
          break;
        case 19:
          message.reactions.push(Reaction.decode(reader, reader.uint32()));
          break;
        case 20:
          message.hidden = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Comment {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      parentIid: isSet(object.parentIid) ? Number(object.parentIid) : 0,
      parent: isSet(object.parent) ? commentParentFromJSON(object.parent) : 0,
      commentIid: isSet(object.commentIid) ? Number(object.commentIid) : 0,
      body: isSet(object.body) ? String(object.body) : "",
      attachments: Array.isArray(object?.attachments) ? object.attachments.map((e: any) => Attachment.fromJSON(e)) : [],
      diffHunk: isSet(object.diffHunk) ? String(object.diffHunk) : "",
      path: isSet(object.path) ? String(object.path) : "",
      position: isSet(object.position) ? Number(object.position) : 0,
      system: isSet(object.system) ? Boolean(object.system) : false,
      authorAssociation: isSet(object.authorAssociation) ? String(object.authorAssociation) : "",
      createdAt: isSet(object.createdAt) ? Number(object.createdAt) : 0,
      updatedAt: isSet(object.updatedAt) ? Number(object.updatedAt) : 0,
      commentType: isSet(object.commentType) ? commentTypeFromJSON(object.commentType) : 0,
      resolved: isSet(object.resolved) ? Boolean(object.resolved) : false,
      replies: Array.isArray(object?.replies) ? object.replies.map((e: any) => Number(e)) : [],
      reactions: Array.isArray(object?.reactions) ? object.reactions.map((e: any) => Reaction.fromJSON(e)) : [],
      hidden: isSet(object.hidden) ? Boolean(object.hidden) : false,
    };
  },

  toJSON(message: Comment): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.parentIid !== undefined && (obj.parentIid = Math.round(message.parentIid));
    message.parent !== undefined && (obj.parent = commentParentToJSON(message.parent));
    message.commentIid !== undefined && (obj.commentIid = Math.round(message.commentIid));
    message.body !== undefined && (obj.body = message.body);
    if (message.attachments) {
      obj.attachments = message.attachments.map((e) => e ? Attachment.toJSON(e) : undefined);
    } else {
      obj.attachments = [];
    }
    message.diffHunk !== undefined && (obj.diffHunk = message.diffHunk);
    message.path !== undefined && (obj.path = message.path);
    message.position !== undefined && (obj.position = Math.round(message.position));
    message.system !== undefined && (obj.system = message.system);
    message.authorAssociation !== undefined && (obj.authorAssociation = message.authorAssociation);
    message.createdAt !== undefined && (obj.createdAt = Math.round(message.createdAt));
    message.updatedAt !== undefined && (obj.updatedAt = Math.round(message.updatedAt));
    message.commentType !== undefined && (obj.commentType = commentTypeToJSON(message.commentType));
    message.resolved !== undefined && (obj.resolved = message.resolved);
    if (message.replies) {
      obj.replies = message.replies.map((e) => Math.round(e));
    } else {
      obj.replies = [];
    }
    if (message.reactions) {
      obj.reactions = message.reactions.map((e) => e ? Reaction.toJSON(e) : undefined);
    } else {
      obj.reactions = [];
    }
    message.hidden !== undefined && (obj.hidden = message.hidden);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Comment>, I>>(object: I): Comment {
    const message = createBaseComment();
    message.creator = object.creator ?? "";
    message.id = object.id ?? 0;
    message.repositoryId = object.repositoryId ?? 0;
    message.parentIid = object.parentIid ?? 0;
    message.parent = object.parent ?? 0;
    message.commentIid = object.commentIid ?? 0;
    message.body = object.body ?? "";
    message.attachments = object.attachments?.map((e) => Attachment.fromPartial(e)) || [];
    message.diffHunk = object.diffHunk ?? "";
    message.path = object.path ?? "";
    message.position = object.position ?? 0;
    message.system = object.system ?? false;
    message.authorAssociation = object.authorAssociation ?? "";
    message.createdAt = object.createdAt ?? 0;
    message.updatedAt = object.updatedAt ?? 0;
    message.commentType = object.commentType ?? 0;
    message.resolved = object.resolved ?? false;
    message.replies = object.replies?.map((e) => e) || [];
    message.reactions = object.reactions?.map((e) => Reaction.fromPartial(e)) || [];
    message.hidden = object.hidden ?? false;
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
