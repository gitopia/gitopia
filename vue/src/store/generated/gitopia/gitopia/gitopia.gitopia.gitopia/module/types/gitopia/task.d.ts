import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "gitopia.gitopia.gitopia";
export declare enum TaskType {
    TASK_TYPE_FORK_REPOSITORY = 0,
    TASK_TYPE_SET_PULL_REQUEST_STATE = 1,
    UNRECOGNIZED = -1
}
export declare function taskTypeFromJSON(object: any): TaskType;
export declare function taskTypeToJSON(object: TaskType): string;
export declare enum TaskState {
    TASK_STATE_PENDING = 0,
    TASK_STATE_SUCCESS = 1,
    TASK_STATE_FAILURE = 2,
    UNRECOGNIZED = -1
}
export declare function taskStateFromJSON(object: any): TaskState;
export declare function taskStateToJSON(object: TaskState): string;
export interface Task {
    id: number;
    type: TaskType;
    state: TaskState;
    message: string;
    creator: string;
    provider: string;
}
export declare const Task: {
    encode(message: Task, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Task;
    fromJSON(object: any): Task;
    toJSON(message: Task): unknown;
    fromPartial(object: DeepPartial<Task>): Task;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
