/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";
import { Repository } from "../gitopia/repository";
import {
  PageRequest,
  PageResponse,
} from "../cosmos/base/query/v1beta1/pagination";
import { User } from "../gitopia/user";
import { Whois } from "../gitopia/whois";

export const protobufPackage = "gitopia.gitopia.gitopia";

/** this line is used by starport scaffolding # 3 */
export interface QueryGetRepositoryRequest {
  id: number;
}

export interface QueryGetRepositoryResponse {
  Repository: Repository | undefined;
}

export interface QueryAllRepositoryRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllRepositoryResponse {
  Repository: Repository[];
  pagination: PageResponse | undefined;
}

export interface QueryGetUserRequest {
  id: number;
}

export interface QueryGetUserResponse {
  User: User | undefined;
}

export interface QueryAllUserRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllUserResponse {
  User: User[];
  pagination: PageResponse | undefined;
}

export interface QueryGetWhoisRequest {
  name: string;
}

export interface QueryGetWhoisResponse {
  Whois: Whois | undefined;
}

export interface QueryAllWhoisRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllWhoisResponse {
  Whois: Whois[];
  pagination: PageResponse | undefined;
}

const baseQueryGetRepositoryRequest: object = { id: 0 };

export const QueryGetRepositoryRequest = {
  encode(
    message: QueryGetRepositoryRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetRepositoryRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetRepositoryRequest,
    } as QueryGetRepositoryRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetRepositoryRequest {
    const message = {
      ...baseQueryGetRepositoryRequest,
    } as QueryGetRepositoryRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: QueryGetRepositoryRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetRepositoryRequest>
  ): QueryGetRepositoryRequest {
    const message = {
      ...baseQueryGetRepositoryRequest,
    } as QueryGetRepositoryRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseQueryGetRepositoryResponse: object = {};

export const QueryGetRepositoryResponse = {
  encode(
    message: QueryGetRepositoryResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.Repository !== undefined) {
      Repository.encode(message.Repository, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetRepositoryResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetRepositoryResponse,
    } as QueryGetRepositoryResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Repository = Repository.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetRepositoryResponse {
    const message = {
      ...baseQueryGetRepositoryResponse,
    } as QueryGetRepositoryResponse;
    if (object.Repository !== undefined && object.Repository !== null) {
      message.Repository = Repository.fromJSON(object.Repository);
    } else {
      message.Repository = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetRepositoryResponse): unknown {
    const obj: any = {};
    message.Repository !== undefined &&
      (obj.Repository = message.Repository
        ? Repository.toJSON(message.Repository)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetRepositoryResponse>
  ): QueryGetRepositoryResponse {
    const message = {
      ...baseQueryGetRepositoryResponse,
    } as QueryGetRepositoryResponse;
    if (object.Repository !== undefined && object.Repository !== null) {
      message.Repository = Repository.fromPartial(object.Repository);
    } else {
      message.Repository = undefined;
    }
    return message;
  },
};

const baseQueryAllRepositoryRequest: object = {};

export const QueryAllRepositoryRequest = {
  encode(
    message: QueryAllRepositoryRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllRepositoryRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllRepositoryRequest,
    } as QueryAllRepositoryRequest;
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

  fromJSON(object: any): QueryAllRepositoryRequest {
    const message = {
      ...baseQueryAllRepositoryRequest,
    } as QueryAllRepositoryRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllRepositoryRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllRepositoryRequest>
  ): QueryAllRepositoryRequest {
    const message = {
      ...baseQueryAllRepositoryRequest,
    } as QueryAllRepositoryRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllRepositoryResponse: object = {};

export const QueryAllRepositoryResponse = {
  encode(
    message: QueryAllRepositoryResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.Repository) {
      Repository.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllRepositoryResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllRepositoryResponse,
    } as QueryAllRepositoryResponse;
    message.Repository = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Repository.push(Repository.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryAllRepositoryResponse {
    const message = {
      ...baseQueryAllRepositoryResponse,
    } as QueryAllRepositoryResponse;
    message.Repository = [];
    if (object.Repository !== undefined && object.Repository !== null) {
      for (const e of object.Repository) {
        message.Repository.push(Repository.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllRepositoryResponse): unknown {
    const obj: any = {};
    if (message.Repository) {
      obj.Repository = message.Repository.map((e) =>
        e ? Repository.toJSON(e) : undefined
      );
    } else {
      obj.Repository = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllRepositoryResponse>
  ): QueryAllRepositoryResponse {
    const message = {
      ...baseQueryAllRepositoryResponse,
    } as QueryAllRepositoryResponse;
    message.Repository = [];
    if (object.Repository !== undefined && object.Repository !== null) {
      for (const e of object.Repository) {
        message.Repository.push(Repository.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryGetUserRequest: object = { id: 0 };

export const QueryGetUserRequest = {
  encode(
    message: QueryGetUserRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetUserRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetUserRequest } as QueryGetUserRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetUserRequest {
    const message = { ...baseQueryGetUserRequest } as QueryGetUserRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: QueryGetUserRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryGetUserRequest>): QueryGetUserRequest {
    const message = { ...baseQueryGetUserRequest } as QueryGetUserRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseQueryGetUserResponse: object = {};

export const QueryGetUserResponse = {
  encode(
    message: QueryGetUserResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.User !== undefined) {
      User.encode(message.User, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetUserResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetUserResponse } as QueryGetUserResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.User = User.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetUserResponse {
    const message = { ...baseQueryGetUserResponse } as QueryGetUserResponse;
    if (object.User !== undefined && object.User !== null) {
      message.User = User.fromJSON(object.User);
    } else {
      message.User = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetUserResponse): unknown {
    const obj: any = {};
    message.User !== undefined &&
      (obj.User = message.User ? User.toJSON(message.User) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryGetUserResponse>): QueryGetUserResponse {
    const message = { ...baseQueryGetUserResponse } as QueryGetUserResponse;
    if (object.User !== undefined && object.User !== null) {
      message.User = User.fromPartial(object.User);
    } else {
      message.User = undefined;
    }
    return message;
  },
};

const baseQueryAllUserRequest: object = {};

export const QueryAllUserRequest = {
  encode(
    message: QueryAllUserRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllUserRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllUserRequest } as QueryAllUserRequest;
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

  fromJSON(object: any): QueryAllUserRequest {
    const message = { ...baseQueryAllUserRequest } as QueryAllUserRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllUserRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAllUserRequest>): QueryAllUserRequest {
    const message = { ...baseQueryAllUserRequest } as QueryAllUserRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllUserResponse: object = {};

export const QueryAllUserResponse = {
  encode(
    message: QueryAllUserResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.User) {
      User.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllUserResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllUserResponse } as QueryAllUserResponse;
    message.User = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.User.push(User.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryAllUserResponse {
    const message = { ...baseQueryAllUserResponse } as QueryAllUserResponse;
    message.User = [];
    if (object.User !== undefined && object.User !== null) {
      for (const e of object.User) {
        message.User.push(User.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllUserResponse): unknown {
    const obj: any = {};
    if (message.User) {
      obj.User = message.User.map((e) => (e ? User.toJSON(e) : undefined));
    } else {
      obj.User = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAllUserResponse>): QueryAllUserResponse {
    const message = { ...baseQueryAllUserResponse } as QueryAllUserResponse;
    message.User = [];
    if (object.User !== undefined && object.User !== null) {
      for (const e of object.User) {
        message.User.push(User.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryGetWhoisRequest: object = { name: "" };

export const QueryGetWhoisRequest = {
  encode(
    message: QueryGetWhoisRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetWhoisRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetWhoisRequest } as QueryGetWhoisRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetWhoisRequest {
    const message = { ...baseQueryGetWhoisRequest } as QueryGetWhoisRequest;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    return message;
  },

  toJSON(message: QueryGetWhoisRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryGetWhoisRequest>): QueryGetWhoisRequest {
    const message = { ...baseQueryGetWhoisRequest } as QueryGetWhoisRequest;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    return message;
  },
};

const baseQueryGetWhoisResponse: object = {};

export const QueryGetWhoisResponse = {
  encode(
    message: QueryGetWhoisResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.Whois !== undefined) {
      Whois.encode(message.Whois, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetWhoisResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetWhoisResponse } as QueryGetWhoisResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Whois = Whois.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetWhoisResponse {
    const message = { ...baseQueryGetWhoisResponse } as QueryGetWhoisResponse;
    if (object.Whois !== undefined && object.Whois !== null) {
      message.Whois = Whois.fromJSON(object.Whois);
    } else {
      message.Whois = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetWhoisResponse): unknown {
    const obj: any = {};
    message.Whois !== undefined &&
      (obj.Whois = message.Whois ? Whois.toJSON(message.Whois) : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetWhoisResponse>
  ): QueryGetWhoisResponse {
    const message = { ...baseQueryGetWhoisResponse } as QueryGetWhoisResponse;
    if (object.Whois !== undefined && object.Whois !== null) {
      message.Whois = Whois.fromPartial(object.Whois);
    } else {
      message.Whois = undefined;
    }
    return message;
  },
};

const baseQueryAllWhoisRequest: object = {};

export const QueryAllWhoisRequest = {
  encode(
    message: QueryAllWhoisRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllWhoisRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllWhoisRequest } as QueryAllWhoisRequest;
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

  fromJSON(object: any): QueryAllWhoisRequest {
    const message = { ...baseQueryAllWhoisRequest } as QueryAllWhoisRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllWhoisRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAllWhoisRequest>): QueryAllWhoisRequest {
    const message = { ...baseQueryAllWhoisRequest } as QueryAllWhoisRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllWhoisResponse: object = {};

export const QueryAllWhoisResponse = {
  encode(
    message: QueryAllWhoisResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.Whois) {
      Whois.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllWhoisResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllWhoisResponse } as QueryAllWhoisResponse;
    message.Whois = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Whois.push(Whois.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryAllWhoisResponse {
    const message = { ...baseQueryAllWhoisResponse } as QueryAllWhoisResponse;
    message.Whois = [];
    if (object.Whois !== undefined && object.Whois !== null) {
      for (const e of object.Whois) {
        message.Whois.push(Whois.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllWhoisResponse): unknown {
    const obj: any = {};
    if (message.Whois) {
      obj.Whois = message.Whois.map((e) => (e ? Whois.toJSON(e) : undefined));
    } else {
      obj.Whois = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllWhoisResponse>
  ): QueryAllWhoisResponse {
    const message = { ...baseQueryAllWhoisResponse } as QueryAllWhoisResponse;
    message.Whois = [];
    if (object.Whois !== undefined && object.Whois !== null) {
      for (const e of object.Whois) {
        message.Whois.push(Whois.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** this line is used by starport scaffolding # 2 */
  Repository(
    request: QueryGetRepositoryRequest
  ): Promise<QueryGetRepositoryResponse>;
  RepositoryAll(
    request: QueryAllRepositoryRequest
  ): Promise<QueryAllRepositoryResponse>;
  User(request: QueryGetUserRequest): Promise<QueryGetUserResponse>;
  UserAll(request: QueryAllUserRequest): Promise<QueryAllUserResponse>;
  Whois(request: QueryGetWhoisRequest): Promise<QueryGetWhoisResponse>;
  WhoisAll(request: QueryAllWhoisRequest): Promise<QueryAllWhoisResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  Repository(
    request: QueryGetRepositoryRequest
  ): Promise<QueryGetRepositoryResponse> {
    const data = QueryGetRepositoryRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "Repository",
      data
    );
    return promise.then((data) =>
      QueryGetRepositoryResponse.decode(new Reader(data))
    );
  }

  RepositoryAll(
    request: QueryAllRepositoryRequest
  ): Promise<QueryAllRepositoryResponse> {
    const data = QueryAllRepositoryRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "RepositoryAll",
      data
    );
    return promise.then((data) =>
      QueryAllRepositoryResponse.decode(new Reader(data))
    );
  }

  User(request: QueryGetUserRequest): Promise<QueryGetUserResponse> {
    const data = QueryGetUserRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "User",
      data
    );
    return promise.then((data) =>
      QueryGetUserResponse.decode(new Reader(data))
    );
  }

  UserAll(request: QueryAllUserRequest): Promise<QueryAllUserResponse> {
    const data = QueryAllUserRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "UserAll",
      data
    );
    return promise.then((data) =>
      QueryAllUserResponse.decode(new Reader(data))
    );
  }

  Whois(request: QueryGetWhoisRequest): Promise<QueryGetWhoisResponse> {
    const data = QueryGetWhoisRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "Whois",
      data
    );
    return promise.then((data) =>
      QueryGetWhoisResponse.decode(new Reader(data))
    );
  }

  WhoisAll(request: QueryAllWhoisRequest): Promise<QueryAllWhoisResponse> {
    const data = QueryAllWhoisRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Query",
      "WhoisAll",
      data
    );
    return promise.then((data) =>
      QueryAllWhoisResponse.decode(new Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

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
