/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../cosmos/base/query/v1beta1/pagination";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Params } from "./params";
import { Series, seriesFromJSON, seriesToJSON } from "./pool";
import { Reward } from "./rewards";
import { Task } from "./task";

export const protobufPackage = "gitopia.gitopia.rewards";

/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params defines the parameters of the module. */
  params: Params | undefined;
}

export interface QueryTasksRequest {
  address: string;
}

export interface QueryTasksResponse {
  tasks: Task[];
}

export interface QueryGetRewardRequest {
  recipient: string;
}

export interface QueryGetRewardResponseReward {
  creator: string;
  series: Series;
  amount: Coin | undefined;
  claimedAmount: Coin | undefined;
  claimableAmount: Coin | undefined;
  remainingClaimableAmount: Coin | undefined;
}

export interface QueryGetRewardResponse {
  recipient: string;
  rewards: QueryGetRewardResponseReward[];
}

export interface QueryAllRewardsRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllRewardsResponse {
  rewards: Reward[];
  pagination: PageResponse | undefined;
}

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryParamsRequest {
    return {};
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(_: I): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
  return { params: undefined };
}

export const QueryParamsResponse = {
  encode(message: QueryParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(object: I): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

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

function createBaseQueryGetRewardRequest(): QueryGetRewardRequest {
  return { recipient: "" };
}

export const QueryGetRewardRequest = {
  encode(message: QueryGetRewardRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.recipient !== "") {
      writer.uint32(10).string(message.recipient);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetRewardRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetRewardRequest();
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

  fromJSON(object: any): QueryGetRewardRequest {
    return { recipient: isSet(object.recipient) ? String(object.recipient) : "" };
  },

  toJSON(message: QueryGetRewardRequest): unknown {
    const obj: any = {};
    message.recipient !== undefined && (obj.recipient = message.recipient);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetRewardRequest>, I>>(object: I): QueryGetRewardRequest {
    const message = createBaseQueryGetRewardRequest();
    message.recipient = object.recipient ?? "";
    return message;
  },
};

function createBaseQueryGetRewardResponseReward(): QueryGetRewardResponseReward {
  return {
    creator: "",
    series: 0,
    amount: undefined,
    claimedAmount: undefined,
    claimableAmount: undefined,
    remainingClaimableAmount: undefined,
  };
}

export const QueryGetRewardResponseReward = {
  encode(message: QueryGetRewardResponseReward, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.series !== 0) {
      writer.uint32(16).int32(message.series);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(26).fork()).ldelim();
    }
    if (message.claimedAmount !== undefined) {
      Coin.encode(message.claimedAmount, writer.uint32(34).fork()).ldelim();
    }
    if (message.claimableAmount !== undefined) {
      Coin.encode(message.claimableAmount, writer.uint32(42).fork()).ldelim();
    }
    if (message.remainingClaimableAmount !== undefined) {
      Coin.encode(message.remainingClaimableAmount, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetRewardResponseReward {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetRewardResponseReward();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.series = reader.int32() as any;
          break;
        case 3:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.claimedAmount = Coin.decode(reader, reader.uint32());
          break;
        case 5:
          message.claimableAmount = Coin.decode(reader, reader.uint32());
          break;
        case 6:
          message.remainingClaimableAmount = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetRewardResponseReward {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      series: isSet(object.series) ? seriesFromJSON(object.series) : 0,
      amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined,
      claimedAmount: isSet(object.claimedAmount) ? Coin.fromJSON(object.claimedAmount) : undefined,
      claimableAmount: isSet(object.claimableAmount) ? Coin.fromJSON(object.claimableAmount) : undefined,
      remainingClaimableAmount: isSet(object.remainingClaimableAmount)
        ? Coin.fromJSON(object.remainingClaimableAmount)
        : undefined,
    };
  },

  toJSON(message: QueryGetRewardResponseReward): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.series !== undefined && (obj.series = seriesToJSON(message.series));
    message.amount !== undefined && (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    message.claimedAmount !== undefined
      && (obj.claimedAmount = message.claimedAmount ? Coin.toJSON(message.claimedAmount) : undefined);
    message.claimableAmount !== undefined
      && (obj.claimableAmount = message.claimableAmount ? Coin.toJSON(message.claimableAmount) : undefined);
    message.remainingClaimableAmount !== undefined && (obj.remainingClaimableAmount = message.remainingClaimableAmount
      ? Coin.toJSON(message.remainingClaimableAmount)
      : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetRewardResponseReward>, I>>(object: I): QueryGetRewardResponseReward {
    const message = createBaseQueryGetRewardResponseReward();
    message.creator = object.creator ?? "";
    message.series = object.series ?? 0;
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Coin.fromPartial(object.amount)
      : undefined;
    message.claimedAmount = (object.claimedAmount !== undefined && object.claimedAmount !== null)
      ? Coin.fromPartial(object.claimedAmount)
      : undefined;
    message.claimableAmount = (object.claimableAmount !== undefined && object.claimableAmount !== null)
      ? Coin.fromPartial(object.claimableAmount)
      : undefined;
    message.remainingClaimableAmount =
      (object.remainingClaimableAmount !== undefined && object.remainingClaimableAmount !== null)
        ? Coin.fromPartial(object.remainingClaimableAmount)
        : undefined;
    return message;
  },
};

function createBaseQueryGetRewardResponse(): QueryGetRewardResponse {
  return { recipient: "", rewards: [] };
}

export const QueryGetRewardResponse = {
  encode(message: QueryGetRewardResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.recipient !== "") {
      writer.uint32(10).string(message.recipient);
    }
    for (const v of message.rewards) {
      QueryGetRewardResponseReward.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetRewardResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetRewardResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.recipient = reader.string();
          break;
        case 2:
          message.rewards.push(QueryGetRewardResponseReward.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetRewardResponse {
    return {
      recipient: isSet(object.recipient) ? String(object.recipient) : "",
      rewards: Array.isArray(object?.rewards)
        ? object.rewards.map((e: any) => QueryGetRewardResponseReward.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryGetRewardResponse): unknown {
    const obj: any = {};
    message.recipient !== undefined && (obj.recipient = message.recipient);
    if (message.rewards) {
      obj.rewards = message.rewards.map((e) => e ? QueryGetRewardResponseReward.toJSON(e) : undefined);
    } else {
      obj.rewards = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetRewardResponse>, I>>(object: I): QueryGetRewardResponse {
    const message = createBaseQueryGetRewardResponse();
    message.recipient = object.recipient ?? "";
    message.rewards = object.rewards?.map((e) => QueryGetRewardResponseReward.fromPartial(e)) || [];
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
  /** Params returns the total set of rewards parameters. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a list of tasks items. */
  Tasks(request: QueryTasksRequest): Promise<QueryTasksResponse>;
  /** Queries a Rewards by index. */
  Reward(request: QueryGetRewardRequest): Promise<QueryGetRewardResponse>;
  /** Queries a list of Rewards items. */
  RewardsAll(request: QueryAllRewardsRequest): Promise<QueryAllRewardsResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.Tasks = this.Tasks.bind(this);
    this.Reward = this.Reward.bind(this);
    this.RewardsAll = this.RewardsAll.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.rewards.Query", "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new _m0.Reader(data)));
  }

  Tasks(request: QueryTasksRequest): Promise<QueryTasksResponse> {
    const data = QueryTasksRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.rewards.Query", "Tasks", data);
    return promise.then((data) => QueryTasksResponse.decode(new _m0.Reader(data)));
  }

  Reward(request: QueryGetRewardRequest): Promise<QueryGetRewardResponse> {
    const data = QueryGetRewardRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.rewards.Query", "Reward", data);
    return promise.then((data) => QueryGetRewardResponse.decode(new _m0.Reader(data)));
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
