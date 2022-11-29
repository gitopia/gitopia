/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "gitopia.gitopia.rewards";

export enum taskType {
  UNKNOWN = 0,
  CREATE_NON_EMPTY_REPO = 1,
  CREATE_NON_EMPTY_DAO_REPO = 2,
  PR_TO_VERIFIED_REPO = 3,
  PR_TO_VERIFIED_REPO_MERGED = 4,
  LORE_STAKED = 5,
  VOTE_PROPOSAL = 6,
  UNRECOGNIZED = -1,
}

export function taskTypeFromJSON(object: any): taskType {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return taskType.UNKNOWN;
    case 1:
    case "CREATE_NON_EMPTY_REPO":
      return taskType.CREATE_NON_EMPTY_REPO;
    case 2:
    case "CREATE_NON_EMPTY_DAO_REPO":
      return taskType.CREATE_NON_EMPTY_DAO_REPO;
    case 3:
    case "PR_TO_VERIFIED_REPO":
      return taskType.PR_TO_VERIFIED_REPO;
    case 4:
    case "PR_TO_VERIFIED_REPO_MERGED":
      return taskType.PR_TO_VERIFIED_REPO_MERGED;
    case 5:
    case "LORE_STAKED":
      return taskType.LORE_STAKED;
    case 6:
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
    case taskType.CREATE_NON_EMPTY_REPO:
      return "CREATE_NON_EMPTY_REPO";
    case taskType.CREATE_NON_EMPTY_DAO_REPO:
      return "CREATE_NON_EMPTY_DAO_REPO";
    case taskType.PR_TO_VERIFIED_REPO:
      return "PR_TO_VERIFIED_REPO";
    case taskType.PR_TO_VERIFIED_REPO_MERGED:
      return "PR_TO_VERIFIED_REPO_MERGED";
    case taskType.LORE_STAKED:
      return "LORE_STAKED";
    case taskType.VOTE_PROPOSAL:
      return "VOTE_PROPOSAL";
    default:
      return "UNKNOWN";
  }
}

export interface Task {
  type: taskType;
  isComplete: boolean;
}

const baseTask: object = { type: 0, isComplete: false };

export const Task = {
  encode(message: Task, writer: Writer = Writer.create()): Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.isComplete === true) {
      writer.uint32(16).bool(message.isComplete);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Task {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTask } as Task;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.isComplete = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Task {
    const message = { ...baseTask } as Task;
    if (object.type !== undefined && object.type !== null) {
      message.type = taskTypeFromJSON(object.type);
    } else {
      message.type = 0;
    }
    if (object.isComplete !== undefined && object.isComplete !== null) {
      message.isComplete = Boolean(object.isComplete);
    } else {
      message.isComplete = false;
    }
    return message;
  },

  toJSON(message: Task): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = taskTypeToJSON(message.type));
    message.isComplete !== undefined && (obj.isComplete = message.isComplete);
    return obj;
  },

  fromPartial(object: DeepPartial<Task>): Task {
    const message = { ...baseTask } as Task;
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = 0;
    }
    if (object.isComplete !== undefined && object.isComplete !== null) {
      message.isComplete = object.isComplete;
    } else {
      message.isComplete = false;
    }
    return message;
  },
};

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
