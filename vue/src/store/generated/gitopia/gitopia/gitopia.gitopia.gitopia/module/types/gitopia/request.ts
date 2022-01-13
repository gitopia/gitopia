/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "gitopia.gitopia.gitopia";

export interface Request {
  id: number;
  source: string;
  target: string;
  requestType: Request_Type;
  state: Request_State;
  message: string;
  expiry: number;
  createdAt: number;
}

export enum Request_Type {
  UPDATEREPOSITORYCOLLABORATOR = 0,
  UPDATEDAOMEMBER = 1,
  UNRECOGNIZED = -1,
}

export function request_TypeFromJSON(object: any): Request_Type {
  switch (object) {
    case 0:
    case "UPDATEREPOSITORYCOLLABORATOR":
      return Request_Type.UPDATEREPOSITORYCOLLABORATOR;
    case 1:
    case "UPDATEDAOMEMBER":
      return Request_Type.UPDATEDAOMEMBER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Request_Type.UNRECOGNIZED;
  }
}

export function request_TypeToJSON(object: Request_Type): string {
  switch (object) {
    case Request_Type.UPDATEREPOSITORYCOLLABORATOR:
      return "UPDATEREPOSITORYCOLLABORATOR";
    case Request_Type.UPDATEDAOMEMBER:
      return "UPDATEDAOMEMBER";
    default:
      return "UNKNOWN";
  }
}

export enum Request_State {
  AWAITED = 0,
  ACCEPTED = 1,
  REJECTED = 2,
  UNRECOGNIZED = -1,
}

export function request_StateFromJSON(object: any): Request_State {
  switch (object) {
    case 0:
    case "AWAITED":
      return Request_State.AWAITED;
    case 1:
    case "ACCEPTED":
      return Request_State.ACCEPTED;
    case 2:
    case "REJECTED":
      return Request_State.REJECTED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Request_State.UNRECOGNIZED;
  }
}

export function request_StateToJSON(object: Request_State): string {
  switch (object) {
    case Request_State.AWAITED:
      return "AWAITED";
    case Request_State.ACCEPTED:
      return "ACCEPTED";
    case Request_State.REJECTED:
      return "REJECTED";
    default:
      return "UNKNOWN";
  }
}

export interface Requests {
  sent: number[];
  received: number[];
}

const baseRequest: object = {
  id: 0,
  source: "",
  target: "",
  requestType: 0,
  state: 0,
  message: "",
  expiry: 0,
  createdAt: 0,
};

export const Request = {
  encode(message: Request, writer: Writer = Writer.create()): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.source !== "") {
      writer.uint32(18).string(message.source);
    }
    if (message.target !== "") {
      writer.uint32(26).string(message.target);
    }
    if (message.requestType !== 0) {
      writer.uint32(32).int32(message.requestType);
    }
    if (message.state !== 0) {
      writer.uint32(40).int32(message.state);
    }
    if (message.message !== "") {
      writer.uint32(50).string(message.message);
    }
    if (message.expiry !== 0) {
      writer.uint32(56).int64(message.expiry);
    }
    if (message.createdAt !== 0) {
      writer.uint32(64).int64(message.createdAt);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Request {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRequest } as Request;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.source = reader.string();
          break;
        case 3:
          message.target = reader.string();
          break;
        case 4:
          message.requestType = reader.int32() as any;
          break;
        case 5:
          message.state = reader.int32() as any;
          break;
        case 6:
          message.message = reader.string();
          break;
        case 7:
          message.expiry = longToNumber(reader.int64() as Long);
          break;
        case 8:
          message.createdAt = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Request {
    const message = { ...baseRequest } as Request;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.source !== undefined && object.source !== null) {
      message.source = String(object.source);
    } else {
      message.source = "";
    }
    if (object.target !== undefined && object.target !== null) {
      message.target = String(object.target);
    } else {
      message.target = "";
    }
    if (object.requestType !== undefined && object.requestType !== null) {
      message.requestType = request_TypeFromJSON(object.requestType);
    } else {
      message.requestType = 0;
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = request_StateFromJSON(object.state);
    } else {
      message.state = 0;
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = String(object.message);
    } else {
      message.message = "";
    }
    if (object.expiry !== undefined && object.expiry !== null) {
      message.expiry = Number(object.expiry);
    } else {
      message.expiry = 0;
    }
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = Number(object.createdAt);
    } else {
      message.createdAt = 0;
    }
    return message;
  },

  toJSON(message: Request): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.source !== undefined && (obj.source = message.source);
    message.target !== undefined && (obj.target = message.target);
    message.requestType !== undefined &&
      (obj.requestType = request_TypeToJSON(message.requestType));
    message.state !== undefined &&
      (obj.state = request_StateToJSON(message.state));
    message.message !== undefined && (obj.message = message.message);
    message.expiry !== undefined && (obj.expiry = message.expiry);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt);
    return obj;
  },

  fromPartial(object: DeepPartial<Request>): Request {
    const message = { ...baseRequest } as Request;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.source !== undefined && object.source !== null) {
      message.source = object.source;
    } else {
      message.source = "";
    }
    if (object.target !== undefined && object.target !== null) {
      message.target = object.target;
    } else {
      message.target = "";
    }
    if (object.requestType !== undefined && object.requestType !== null) {
      message.requestType = object.requestType;
    } else {
      message.requestType = 0;
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
    if (object.expiry !== undefined && object.expiry !== null) {
      message.expiry = object.expiry;
    } else {
      message.expiry = 0;
    }
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = object.createdAt;
    } else {
      message.createdAt = 0;
    }
    return message;
  },
};

const baseRequests: object = { sent: 0, received: 0 };

export const Requests = {
  encode(message: Requests, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).fork();
    for (const v of message.sent) {
      writer.uint64(v);
    }
    writer.ldelim();
    writer.uint32(18).fork();
    for (const v of message.received) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Requests {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRequests } as Requests;
    message.sent = [];
    message.received = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.sent.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.sent.push(longToNumber(reader.uint64() as Long));
          }
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.received.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.received.push(longToNumber(reader.uint64() as Long));
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Requests {
    const message = { ...baseRequests } as Requests;
    message.sent = [];
    message.received = [];
    if (object.sent !== undefined && object.sent !== null) {
      for (const e of object.sent) {
        message.sent.push(Number(e));
      }
    }
    if (object.received !== undefined && object.received !== null) {
      for (const e of object.received) {
        message.received.push(Number(e));
      }
    }
    return message;
  },

  toJSON(message: Requests): unknown {
    const obj: any = {};
    if (message.sent) {
      obj.sent = message.sent.map((e) => e);
    } else {
      obj.sent = [];
    }
    if (message.received) {
      obj.received = message.received.map((e) => e);
    } else {
      obj.received = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Requests>): Requests {
    const message = { ...baseRequests } as Requests;
    message.sent = [];
    message.received = [];
    if (object.sent !== undefined && object.sent !== null) {
      for (const e of object.sent) {
        message.sent.push(e);
      }
    }
    if (object.received !== undefined && object.received !== null) {
      for (const e of object.received) {
        message.received.push(e);
      }
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
