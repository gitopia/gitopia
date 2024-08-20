/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "gitopia.gitopia.rewards";

export enum taskType {
  UNKNOWN = 0,
  CREATE_USER = 1,
  CREATE_NON_EMPTY_REPO = 2,
  CREATE_ISSUE = 3,
  CREATE_ISSUE_WITH_BOUNTY = 4,
  CREATE_ISSUE_WITH_BOUNTY_VERIFIED = 5,
  PR_TO_REPO_MERGED = 6,
  PR_TO_VERIFIED_REPO_MERGED = 7,
  PR_TO_VERIFIED_REPO_MERGED_WITH_BOUNTY = 8,
  LORE_STAKED = 9,
  VOTE_PROPOSAL = 10,
  UNRECOGNIZED = -1,
}

export function taskTypeFromJSON(object: any): taskType {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return taskType.UNKNOWN;
    case 1:
    case "CREATE_USER":
      return taskType.CREATE_USER;
    case 2:
    case "CREATE_NON_EMPTY_REPO":
      return taskType.CREATE_NON_EMPTY_REPO;
    case 3:
    case "CREATE_ISSUE":
      return taskType.CREATE_ISSUE;
    case 4:
    case "CREATE_ISSUE_WITH_BOUNTY":
      return taskType.CREATE_ISSUE_WITH_BOUNTY;
    case 5:
    case "CREATE_ISSUE_WITH_BOUNTY_VERIFIED":
      return taskType.CREATE_ISSUE_WITH_BOUNTY_VERIFIED;
    case 6:
    case "PR_TO_REPO_MERGED":
      return taskType.PR_TO_REPO_MERGED;
    case 7:
    case "PR_TO_VERIFIED_REPO_MERGED":
      return taskType.PR_TO_VERIFIED_REPO_MERGED;
    case 8:
    case "PR_TO_VERIFIED_REPO_MERGED_WITH_BOUNTY":
      return taskType.PR_TO_VERIFIED_REPO_MERGED_WITH_BOUNTY;
    case 9:
    case "LORE_STAKED":
      return taskType.LORE_STAKED;
    case 10:
    case "VOTE_PROPOSAL":
      return taskType.VOTE_PROPOSAL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return taskType.UNRECOGNIZED;
  }
}

export function taskTypeToJSON(object: taskType): string {
  switch (object) {
    case taskType.UNKNOWN:
      return "UNKNOWN";
    case taskType.CREATE_USER:
      return "CREATE_USER";
    case taskType.CREATE_NON_EMPTY_REPO:
      return "CREATE_NON_EMPTY_REPO";
    case taskType.CREATE_ISSUE:
      return "CREATE_ISSUE";
    case taskType.CREATE_ISSUE_WITH_BOUNTY:
      return "CREATE_ISSUE_WITH_BOUNTY";
    case taskType.CREATE_ISSUE_WITH_BOUNTY_VERIFIED:
      return "CREATE_ISSUE_WITH_BOUNTY_VERIFIED";
    case taskType.PR_TO_REPO_MERGED:
      return "PR_TO_REPO_MERGED";
    case taskType.PR_TO_VERIFIED_REPO_MERGED:
      return "PR_TO_VERIFIED_REPO_MERGED";
    case taskType.PR_TO_VERIFIED_REPO_MERGED_WITH_BOUNTY:
      return "PR_TO_VERIFIED_REPO_MERGED_WITH_BOUNTY";
    case taskType.LORE_STAKED:
      return "LORE_STAKED";
    case taskType.VOTE_PROPOSAL:
      return "VOTE_PROPOSAL";
    case taskType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Task {
  type: taskType;
  isComplete: boolean;
  weight: number;
}

function createBaseTask(): Task {
  return { type: 0, isComplete: false, weight: 0 };
}

export const Task = {
  encode(message: Task, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.isComplete === true) {
      writer.uint32(16).bool(message.isComplete);
    }
    if (message.weight !== 0) {
      writer.uint32(24).int32(message.weight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Task {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTask();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.isComplete = reader.bool();
          break;
        case 3:
          message.weight = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Task {
    return {
      type: isSet(object.type) ? taskTypeFromJSON(object.type) : 0,
      isComplete: isSet(object.isComplete) ? Boolean(object.isComplete) : false,
      weight: isSet(object.weight) ? Number(object.weight) : 0,
    };
  },

  toJSON(message: Task): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = taskTypeToJSON(message.type));
    message.isComplete !== undefined && (obj.isComplete = message.isComplete);
    message.weight !== undefined && (obj.weight = Math.round(message.weight));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Task>, I>>(object: I): Task {
    const message = createBaseTask();
    message.type = object.type ?? 0;
    message.isComplete = object.isComplete ?? false;
    message.weight = object.weight ?? 0;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
