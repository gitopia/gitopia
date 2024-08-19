/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Params } from "./params";
import { Series, seriesFromJSON, seriesToJSON } from "./pool";

export const protobufPackage = "gitopia.gitopia.rewards";

export interface MsgCreateReward {
  creator: string;
  recipient: string;
  amount: Coin | undefined;
  series: Series;
}

export interface MsgCreateRewardResponse {
  /** actual granted amount */
  amount: Coin | undefined;
}

/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgClaim {
  creator: string;
}

export interface ClaimResponseReward {
  series: Series;
  amount: Coin | undefined;
}

export interface MsgClaimResponse {
  claimedRewards: ClaimResponseReward[];
  expiredRewards: ClaimResponseReward[];
  allClaimedRewards: ClaimResponseReward[];
}

export interface MsgUpdateParams {
  /** authority is the address of the governance account. */
  authority: string;
  /**
   * params defines the x/rewards parameters to update.
   *
   * NOTE: All parameters must be supplied.
   */
  params: Params | undefined;
}

export interface MsgUpdateParamsResponse {
}

function createBaseMsgCreateReward(): MsgCreateReward {
  return { creator: "", recipient: "", amount: undefined, series: 0 };
}

export const MsgCreateReward = {
  encode(message: MsgCreateReward, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.recipient !== "") {
      writer.uint32(18).string(message.recipient);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(26).fork()).ldelim();
    }
    if (message.series !== 0) {
      writer.uint32(32).int32(message.series);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateReward {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateReward();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.recipient = reader.string();
          break;
        case 3:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.series = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateReward {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      recipient: isSet(object.recipient) ? String(object.recipient) : "",
      amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined,
      series: isSet(object.series) ? seriesFromJSON(object.series) : 0,
    };
  },

  toJSON(message: MsgCreateReward): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.recipient !== undefined && (obj.recipient = message.recipient);
    message.amount !== undefined && (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    message.series !== undefined && (obj.series = seriesToJSON(message.series));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateReward>, I>>(object: I): MsgCreateReward {
    const message = createBaseMsgCreateReward();
    message.creator = object.creator ?? "";
    message.recipient = object.recipient ?? "";
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Coin.fromPartial(object.amount)
      : undefined;
    message.series = object.series ?? 0;
    return message;
  },
};

function createBaseMsgCreateRewardResponse(): MsgCreateRewardResponse {
  return { amount: undefined };
}

export const MsgCreateRewardResponse = {
  encode(message: MsgCreateRewardResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateRewardResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateRewardResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateRewardResponse {
    return { amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined };
  },

  toJSON(message: MsgCreateRewardResponse): unknown {
    const obj: any = {};
    message.amount !== undefined && (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateRewardResponse>, I>>(object: I): MsgCreateRewardResponse {
    const message = createBaseMsgCreateRewardResponse();
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Coin.fromPartial(object.amount)
      : undefined;
    return message;
  },
};

function createBaseMsgClaim(): MsgClaim {
  return { creator: "" };
}

export const MsgClaim = {
  encode(message: MsgClaim, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgClaim {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaim();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgClaim {
    return { creator: isSet(object.creator) ? String(object.creator) : "" };
  },

  toJSON(message: MsgClaim): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgClaim>, I>>(object: I): MsgClaim {
    const message = createBaseMsgClaim();
    message.creator = object.creator ?? "";
    return message;
  },
};

function createBaseClaimResponseReward(): ClaimResponseReward {
  return { series: 0, amount: undefined };
}

export const ClaimResponseReward = {
  encode(message: ClaimResponseReward, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.series !== 0) {
      writer.uint32(8).int32(message.series);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClaimResponseReward {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClaimResponseReward();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.series = reader.int32() as any;
          break;
        case 2:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClaimResponseReward {
    return {
      series: isSet(object.series) ? seriesFromJSON(object.series) : 0,
      amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined,
    };
  },

  toJSON(message: ClaimResponseReward): unknown {
    const obj: any = {};
    message.series !== undefined && (obj.series = seriesToJSON(message.series));
    message.amount !== undefined && (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ClaimResponseReward>, I>>(object: I): ClaimResponseReward {
    const message = createBaseClaimResponseReward();
    message.series = object.series ?? 0;
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Coin.fromPartial(object.amount)
      : undefined;
    return message;
  },
};

function createBaseMsgClaimResponse(): MsgClaimResponse {
  return { claimedRewards: [], expiredRewards: [], allClaimedRewards: [] };
}

export const MsgClaimResponse = {
  encode(message: MsgClaimResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.claimedRewards) {
      ClaimResponseReward.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.expiredRewards) {
      ClaimResponseReward.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.allClaimedRewards) {
      ClaimResponseReward.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgClaimResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.claimedRewards.push(ClaimResponseReward.decode(reader, reader.uint32()));
          break;
        case 2:
          message.expiredRewards.push(ClaimResponseReward.decode(reader, reader.uint32()));
          break;
        case 3:
          message.allClaimedRewards.push(ClaimResponseReward.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgClaimResponse {
    return {
      claimedRewards: Array.isArray(object?.claimedRewards)
        ? object.claimedRewards.map((e: any) => ClaimResponseReward.fromJSON(e))
        : [],
      expiredRewards: Array.isArray(object?.expiredRewards)
        ? object.expiredRewards.map((e: any) => ClaimResponseReward.fromJSON(e))
        : [],
      allClaimedRewards: Array.isArray(object?.allClaimedRewards)
        ? object.allClaimedRewards.map((e: any) => ClaimResponseReward.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgClaimResponse): unknown {
    const obj: any = {};
    if (message.claimedRewards) {
      obj.claimedRewards = message.claimedRewards.map((e) => e ? ClaimResponseReward.toJSON(e) : undefined);
    } else {
      obj.claimedRewards = [];
    }
    if (message.expiredRewards) {
      obj.expiredRewards = message.expiredRewards.map((e) => e ? ClaimResponseReward.toJSON(e) : undefined);
    } else {
      obj.expiredRewards = [];
    }
    if (message.allClaimedRewards) {
      obj.allClaimedRewards = message.allClaimedRewards.map((e) => e ? ClaimResponseReward.toJSON(e) : undefined);
    } else {
      obj.allClaimedRewards = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgClaimResponse>, I>>(object: I): MsgClaimResponse {
    const message = createBaseMsgClaimResponse();
    message.claimedRewards = object.claimedRewards?.map((e) => ClaimResponseReward.fromPartial(e)) || [];
    message.expiredRewards = object.expiredRewards?.map((e) => ClaimResponseReward.fromPartial(e)) || [];
    message.allClaimedRewards = object.allClaimedRewards?.map((e) => ClaimResponseReward.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgUpdateParams(): MsgUpdateParams {
  return { authority: "", params: undefined };
}

export const MsgUpdateParams = {
  encode(message: MsgUpdateParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateParams {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: MsgUpdateParams): unknown {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateParams>, I>>(object: I): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}

export const MsgUpdateParamsResponse = {
  encode(_: MsgUpdateParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
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

  fromJSON(_: any): MsgUpdateParamsResponse {
    return {};
  },

  toJSON(_: MsgUpdateParamsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateParamsResponse>, I>>(_: I): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  Claim(request: MsgClaim): Promise<MsgClaimResponse>;
  CreateReward(request: MsgCreateReward): Promise<MsgCreateRewardResponse>;
  /**
   * UpdateParams defines a governance operation for updating the x/rewards module
   * parameters. The authority is hard-coded to the x/gov module account.
   */
  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Claim = this.Claim.bind(this);
    this.CreateReward = this.CreateReward.bind(this);
    this.UpdateParams = this.UpdateParams.bind(this);
  }
  Claim(request: MsgClaim): Promise<MsgClaimResponse> {
    const data = MsgClaim.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.rewards.Msg", "Claim", data);
    return promise.then((data) => MsgClaimResponse.decode(new _m0.Reader(data)));
  }

  CreateReward(request: MsgCreateReward): Promise<MsgCreateRewardResponse> {
    const data = MsgCreateReward.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.rewards.Msg", "CreateReward", data);
    return promise.then((data) => MsgCreateRewardResponse.decode(new _m0.Reader(data)));
  }

  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.rewards.Msg", "UpdateParams", data);
    return promise.then((data) => MsgUpdateParamsResponse.decode(new _m0.Reader(data)));
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
