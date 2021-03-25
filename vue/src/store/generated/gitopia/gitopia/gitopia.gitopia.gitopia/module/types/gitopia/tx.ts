/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";

export const protobufPackage = "gitopia.gitopia.gitopia";

/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgSetWhois {
  creator: string;
  name: string;
  address: string;
}

export interface MsgSetWhoisResponse {}

export interface MsgUpdateWhois {
  creator: string;
  name: string;
  address: string;
}

export interface MsgUpdateWhoisResponse {}

export interface MsgDeleteWhois {
  creator: string;
  name: string;
}

export interface MsgDeleteWhoisResponse {}

const baseMsgSetWhois: object = { creator: "", name: "", address: "" };

export const MsgSetWhois = {
  encode(message: MsgSetWhois, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.address !== "") {
      writer.uint32(26).string(message.address);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSetWhois {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgSetWhois } as MsgSetWhois;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetWhois {
    const message = { ...baseMsgSetWhois } as MsgSetWhois;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    return message;
  },

  toJSON(message: MsgSetWhois): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.name !== undefined && (obj.name = message.name);
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgSetWhois>): MsgSetWhois {
    const message = { ...baseMsgSetWhois } as MsgSetWhois;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    return message;
  },
};

const baseMsgSetWhoisResponse: object = {};

export const MsgSetWhoisResponse = {
  encode(_: MsgSetWhoisResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSetWhoisResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgSetWhoisResponse } as MsgSetWhoisResponse;
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

  fromJSON(_: any): MsgSetWhoisResponse {
    const message = { ...baseMsgSetWhoisResponse } as MsgSetWhoisResponse;
    return message;
  },

  toJSON(_: MsgSetWhoisResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgSetWhoisResponse>): MsgSetWhoisResponse {
    const message = { ...baseMsgSetWhoisResponse } as MsgSetWhoisResponse;
    return message;
  },
};

const baseMsgUpdateWhois: object = { creator: "", name: "", address: "" };

export const MsgUpdateWhois = {
  encode(message: MsgUpdateWhois, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.address !== "") {
      writer.uint32(26).string(message.address);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateWhois {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateWhois } as MsgUpdateWhois;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateWhois {
    const message = { ...baseMsgUpdateWhois } as MsgUpdateWhois;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    return message;
  },

  toJSON(message: MsgUpdateWhois): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.name !== undefined && (obj.name = message.name);
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpdateWhois>): MsgUpdateWhois {
    const message = { ...baseMsgUpdateWhois } as MsgUpdateWhois;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    return message;
  },
};

const baseMsgUpdateWhoisResponse: object = {};

export const MsgUpdateWhoisResponse = {
  encode(_: MsgUpdateWhoisResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateWhoisResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateWhoisResponse } as MsgUpdateWhoisResponse;
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

  fromJSON(_: any): MsgUpdateWhoisResponse {
    const message = { ...baseMsgUpdateWhoisResponse } as MsgUpdateWhoisResponse;
    return message;
  },

  toJSON(_: MsgUpdateWhoisResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgUpdateWhoisResponse>): MsgUpdateWhoisResponse {
    const message = { ...baseMsgUpdateWhoisResponse } as MsgUpdateWhoisResponse;
    return message;
  },
};

const baseMsgDeleteWhois: object = { creator: "", name: "" };

export const MsgDeleteWhois = {
  encode(message: MsgDeleteWhois, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteWhois {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteWhois } as MsgDeleteWhois;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteWhois {
    const message = { ...baseMsgDeleteWhois } as MsgDeleteWhois;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    return message;
  },

  toJSON(message: MsgDeleteWhois): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgDeleteWhois>): MsgDeleteWhois {
    const message = { ...baseMsgDeleteWhois } as MsgDeleteWhois;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    return message;
  },
};

const baseMsgDeleteWhoisResponse: object = {};

export const MsgDeleteWhoisResponse = {
  encode(_: MsgDeleteWhoisResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteWhoisResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteWhoisResponse } as MsgDeleteWhoisResponse;
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

  fromJSON(_: any): MsgDeleteWhoisResponse {
    const message = { ...baseMsgDeleteWhoisResponse } as MsgDeleteWhoisResponse;
    return message;
  },

  toJSON(_: MsgDeleteWhoisResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgDeleteWhoisResponse>): MsgDeleteWhoisResponse {
    const message = { ...baseMsgDeleteWhoisResponse } as MsgDeleteWhoisResponse;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** this line is used by starport scaffolding # proto/tx/rpc */
  SetWhois(request: MsgSetWhois): Promise<MsgSetWhoisResponse>;
  UpdateWhois(request: MsgUpdateWhois): Promise<MsgUpdateWhoisResponse>;
  DeleteWhois(request: MsgDeleteWhois): Promise<MsgDeleteWhoisResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  SetWhois(request: MsgSetWhois): Promise<MsgSetWhoisResponse> {
    const data = MsgSetWhois.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "SetWhois",
      data
    );
    return promise.then((data) => MsgSetWhoisResponse.decode(new Reader(data)));
  }

  UpdateWhois(request: MsgUpdateWhois): Promise<MsgUpdateWhoisResponse> {
    const data = MsgUpdateWhois.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "UpdateWhois",
      data
    );
    return promise.then((data) =>
      MsgUpdateWhoisResponse.decode(new Reader(data))
    );
  }

  DeleteWhois(request: MsgDeleteWhois): Promise<MsgDeleteWhoisResponse> {
    const data = MsgDeleteWhois.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "DeleteWhois",
      data
    );
    return promise.then((data) =>
      MsgDeleteWhoisResponse.decode(new Reader(data))
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
