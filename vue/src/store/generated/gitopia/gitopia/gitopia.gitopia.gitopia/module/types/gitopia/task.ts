/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "gitopia.gitopia.gitopia";

export enum TaskType {
  TASK_TYPE_FORK_REPOSITORY = 0,
  TASK_TYPE_SET_PULL_REQUEST_STATE = 1,
  UNRECOGNIZED = -1,
}

export function taskTypeFromJSON(object: any): TaskType {
  switch (object) {
    case 0:
    case "TASK_TYPE_FORK_REPOSITORY":
      return TaskType.TASK_TYPE_FORK_REPOSITORY;
    case 1:
    case "TASK_TYPE_SET_PULL_REQUEST_STATE":
      return TaskType.TASK_TYPE_SET_PULL_REQUEST_STATE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TaskType.UNRECOGNIZED;
  }
}

export function taskTypeToJSON(object: TaskType): string {
  switch (object) {
    case TaskType.TASK_TYPE_FORK_REPOSITORY:
      return "TASK_TYPE_FORK_REPOSITORY";
    case TaskType.TASK_TYPE_SET_PULL_REQUEST_STATE:
      return "TASK_TYPE_SET_PULL_REQUEST_STATE";
    default:
      return "UNKNOWN";
  }
}

export enum TaskState {
  TASK_STATE_PENDING = 0,
  TASK_STATE_SUCCESS = 1,
  TASK_STATE_FAILURE = 2,
  UNRECOGNIZED = -1,
}

export function taskStateFromJSON(object: any): TaskState {
  switch (object) {
    case 0:
    case "TASK_STATE_PENDING":
      return TaskState.TASK_STATE_PENDING;
    case 1:
    case "TASK_STATE_SUCCESS":
      return TaskState.TASK_STATE_SUCCESS;
    case 2:
    case "TASK_STATE_FAILURE":
      return TaskState.TASK_STATE_FAILURE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TaskState.UNRECOGNIZED;
  }
}

export function taskStateToJSON(object: TaskState): string {
  switch (object) {
    case TaskState.TASK_STATE_PENDING:
      return "TASK_STATE_PENDING";
    case TaskState.TASK_STATE_SUCCESS:
      return "TASK_STATE_SUCCESS";
    case TaskState.TASK_STATE_FAILURE:
      return "TASK_STATE_FAILURE";
    default:
      return "UNKNOWN";
  }
}

export interface Task {
  id: number;
  type: TaskType;
  state: TaskState;
  message: string;
  creator: string;
  provider: string;
}

const baseTask: object = {
  id: 0,
  type: 0,
  state: 0,
  message: "",
  creator: "",
  provider: "",
};

export const Task = {
  encode(message: Task, writer: Writer = Writer.create()): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    if (message.state !== 0) {
      writer.uint32(24).int32(message.state);
    }
    if (message.message !== "") {
      writer.uint32(34).string(message.message);
    }
    if (message.creator !== "") {
      writer.uint32(42).string(message.creator);
    }
    if (message.provider !== "") {
      writer.uint32(50).string(message.provider);
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
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.type = reader.int32() as any;
          break;
        case 3:
          message.state = reader.int32() as any;
          break;
        case 4:
          message.message = reader.string();
          break;
        case 5:
          message.creator = reader.string();
          break;
        case 6:
          message.provider = reader.string();
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
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = taskTypeFromJSON(object.type);
    } else {
      message.type = 0;
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = taskStateFromJSON(object.state);
    } else {
      message.state = 0;
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = String(object.message);
    } else {
      message.message = "";
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = String(object.provider);
    } else {
      message.provider = "";
    }
    return message;
  },

  toJSON(message: Task): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.type !== undefined && (obj.type = taskTypeToJSON(message.type));
    message.state !== undefined && (obj.state = taskStateToJSON(message.state));
    message.message !== undefined && (obj.message = message.message);
    message.creator !== undefined && (obj.creator = message.creator);
    message.provider !== undefined && (obj.provider = message.provider);
    return obj;
  },

  fromPartial(object: DeepPartial<Task>): Task {
    const message = { ...baseTask } as Task;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = 0;
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    } else {
      message.state = 0;
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = object.message;
    } else {
      message.message = "";
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = object.provider;
    } else {
      message.provider = "";
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
