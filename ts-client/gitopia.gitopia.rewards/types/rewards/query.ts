/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";
import { Task } from "../rewards/task";

export const protobufPackage = "gitopia.gitopia.rewards";

export interface QueryTasksRequest {
  address: string;
}

export interface QueryTasksResponse {
  tasks: Task[];
}

const baseQueryTasksRequest: object = { address: "" };

export const QueryTasksRequest = {
  encode(message: QueryTasksRequest, writer: Writer = Writer.create()): Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryTasksRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryTasksRequest } as QueryTasksRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryTasksRequest {
    const message = { ...baseQueryTasksRequest } as QueryTasksRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    return message;
  },

  toJSON(message: QueryTasksRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryTasksRequest>): QueryTasksRequest {
    const message = { ...baseQueryTasksRequest } as QueryTasksRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    return message;
  },
};

const baseQueryTasksResponse: object = {};

export const QueryTasksResponse = {
  encode(
    message: QueryTasksResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.tasks) {
      Task.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryTasksResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryTasksResponse } as QueryTasksResponse;
    message.tasks = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tasks.push(Task.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryTasksResponse {
    const message = { ...baseQueryTasksResponse } as QueryTasksResponse;
    message.tasks = [];
    if (object.tasks !== undefined && object.tasks !== null) {
      for (const e of object.tasks) {
        message.tasks.push(Task.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: QueryTasksResponse): unknown {
    const obj: any = {};
    if (message.tasks) {
      obj.tasks = message.tasks.map((e) => (e ? Task.toJSON(e) : undefined));
    } else {
      obj.tasks = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<QueryTasksResponse>): QueryTasksResponse {
    const message = { ...baseQueryTasksResponse } as QueryTasksResponse;
    message.tasks = [];
    if (object.tasks !== undefined && object.tasks !== null) {
      for (const e of object.tasks) {
        message.tasks.push(Task.fromPartial(e));
      }
    }
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Queries a list of tasks items. */
  Tasks(request: QueryTasksRequest): Promise<QueryTasksResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  Tasks(request: QueryTasksRequest): Promise<QueryTasksResponse> {
    const data = QueryTasksRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.rewards.Query",
      "Tasks",
      data
    );
    return promise.then((data) => QueryTasksResponse.decode(new Reader(data)));
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

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
