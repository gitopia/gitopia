/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../cosmos/base/query/v1beta1/pagination";
import { Reward } from "./rewards";
import { Task } from "./task";

export const protobufPackage = "gitopia.gitopia.rewards";

export interface QueryTasksRequest {
  address: string;
}

export interface QueryTasksResponse {
  tasks: Task[];
}

export interface QueryGetRewardsRequest {
  recipient: string;
}

export interface QueryGetRewardsResponse {
  rewards: Reward | undefined;
}

export interface QueryAllRewardsRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllRewardsResponse {
  rewards: Reward[];
  pagination: PageResponse | undefined;
}

function createBaseQueryTasksRequest(): QueryTasksRequest {
  return { address: "" };
}

export const QueryTasksRequest = {
  encode(message: QueryTasksRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTasksRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTasksRequest();
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
    return { address: isSet(object.address) ? String(object.address) : "" };
  },

  toJSON(message: QueryTasksRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryTasksRequest>, I>>(object: I): QueryTasksRequest {
    const message = createBaseQueryTasksRequest();
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseQueryTasksResponse(): QueryTasksResponse {
  return { tasks: [] };
}

export const QueryTasksResponse = {
  encode(message: QueryTasksResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.tasks) {
      Task.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTasksResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTasksResponse();
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
    return { tasks: Array.isArray(object?.tasks) ? object.tasks.map((e: any) => Task.fromJSON(e)) : [] };
  },

  toJSON(message: QueryTasksResponse): unknown {
    const obj: any = {};
    if (message.tasks) {
      obj.tasks = message.tasks.map((e) => e ? Task.toJSON(e) : undefined);
    } else {
      obj.tasks = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryTasksResponse>, I>>(object: I): QueryTasksResponse {
    const message = createBaseQueryTasksResponse();
    message.tasks = object.tasks?.map((e) => Task.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryGetRewardsRequest(): QueryGetRewardsRequest {
  return { recipient: "" };
}

export const QueryGetRewardsRequest = {
  encode(message: QueryGetRewardsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.recipient !== "") {
      writer.uint32(10).string(message.recipient);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetRewardsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetRewardsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.recipient = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetRewardsRequest {
    return { recipient: isSet(object.recipient) ? String(object.recipient) : "" };
  },

  toJSON(message: QueryGetRewardsRequest): unknown {
    const obj: any = {};
    message.recipient !== undefined && (obj.recipient = message.recipient);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetRewardsRequest>, I>>(object: I): QueryGetRewardsRequest {
    const message = createBaseQueryGetRewardsRequest();
    message.recipient = object.recipient ?? "";
    return message;
  },
};

function createBaseQueryGetRewardsResponse(): QueryGetRewardsResponse {
  return { rewards: undefined };
}

export const QueryGetRewardsResponse = {
  encode(message: QueryGetRewardsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rewards !== undefined) {
      Reward.encode(message.rewards, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetRewardsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetRewardsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rewards = Reward.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetRewardsResponse {
    return { rewards: isSet(object.rewards) ? Reward.fromJSON(object.rewards) : undefined };
  },

  toJSON(message: QueryGetRewardsResponse): unknown {
    const obj: any = {};
    message.rewards !== undefined && (obj.rewards = message.rewards ? Reward.toJSON(message.rewards) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetRewardsResponse>, I>>(object: I): QueryGetRewardsResponse {
    const message = createBaseQueryGetRewardsResponse();
    message.rewards = (object.rewards !== undefined && object.rewards !== null)
      ? Reward.fromPartial(object.rewards)
      : undefined;
    return message;
  },
};

function createBaseQueryAllRewardsRequest(): QueryAllRewardsRequest {
  return { pagination: undefined };
}

export const QueryAllRewardsRequest = {
  encode(message: QueryAllRewardsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllRewardsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllRewardsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllRewardsRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllRewardsRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllRewardsRequest>, I>>(object: I): QueryAllRewardsRequest {
    const message = createBaseQueryAllRewardsRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllRewardsResponse(): QueryAllRewardsResponse {
  return { rewards: [], pagination: undefined };
}

export const QueryAllRewardsResponse = {
  encode(message: QueryAllRewardsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.rewards) {
      Reward.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllRewardsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllRewardsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rewards.push(Reward.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllRewardsResponse {
    return {
      rewards: Array.isArray(object?.rewards) ? object.rewards.map((e: any) => Reward.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllRewardsResponse): unknown {
    const obj: any = {};
    if (message.rewards) {
      obj.rewards = message.rewards.map((e) => e ? Reward.toJSON(e) : undefined);
    } else {
      obj.rewards = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllRewardsResponse>, I>>(object: I): QueryAllRewardsResponse {
    const message = createBaseQueryAllRewardsResponse();
    message.rewards = object.rewards?.map((e) => Reward.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Queries a list of tasks items. */
  Tasks(request: QueryTasksRequest): Promise<QueryTasksResponse>;
  /** Queries a Rewards by index. */
  Reward(request: QueryGetRewardsRequest): Promise<QueryGetRewardsResponse>;
  /** Queries a list of Rewards items. */
  RewardsAll(request: QueryAllRewardsRequest): Promise<QueryAllRewardsResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Tasks = this.Tasks.bind(this);
    this.Reward = this.Reward.bind(this);
    this.RewardsAll = this.RewardsAll.bind(this);
  }
  Tasks(request: QueryTasksRequest): Promise<QueryTasksResponse> {
    const data = QueryTasksRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.rewards.Query", "Tasks", data);
    return promise.then((data) => QueryTasksResponse.decode(new _m0.Reader(data)));
  }

  Reward(request: QueryGetRewardsRequest): Promise<QueryGetRewardsResponse> {
    const data = QueryGetRewardsRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.rewards.Query", "Reward", data);
    return promise.then((data) => QueryGetRewardsResponse.decode(new _m0.Reader(data)));
  }

  RewardsAll(request: QueryAllRewardsRequest): Promise<QueryAllRewardsResponse> {
    const data = QueryAllRewardsRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.rewards.Query", "RewardsAll", data);
    return promise.then((data) => QueryAllRewardsResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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
