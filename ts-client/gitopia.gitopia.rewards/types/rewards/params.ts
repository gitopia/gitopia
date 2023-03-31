/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Coin } from "../cosmos/base/v1beta1/coin";

export const protobufPackage = "gitopia.gitopia.rewards";

export interface RewardPool {
  totalAmount: Coin[];
  claimedAmount: Coin[];
}

export interface RewardSeries {
  seriesOne: RewardPool | undefined;
  seriesTwo: RewardPool | undefined;
  seriesThree: RewardPool | undefined;
  seriesFour: RewardPool | undefined;
  seriesFive: RewardPool | undefined;
  seriesSix: RewardPool | undefined;
  seriesSeven: RewardPool | undefined;
}

/** Params defines the parameters for the module. */
export interface Params {
  evaluatorAddress: string;
  rewardSeries: RewardSeries | undefined;
}

function createBaseRewardPool(): RewardPool {
  return { totalAmount: [], claimedAmount: [] };
}

export const RewardPool = {
  encode(message: RewardPool, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.totalAmount) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.claimedAmount) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RewardPool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRewardPool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.totalAmount.push(Coin.decode(reader, reader.uint32()));
          break;
        case 2:
          message.claimedAmount.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RewardPool {
    return {
      totalAmount: Array.isArray(object?.totalAmount) ? object.totalAmount.map((e: any) => Coin.fromJSON(e)) : [],
      claimedAmount: Array.isArray(object?.claimedAmount) ? object.claimedAmount.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: RewardPool): unknown {
    const obj: any = {};
    if (message.totalAmount) {
      obj.totalAmount = message.totalAmount.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.totalAmount = [];
    }
    if (message.claimedAmount) {
      obj.claimedAmount = message.claimedAmount.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.claimedAmount = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RewardPool>, I>>(object: I): RewardPool {
    const message = createBaseRewardPool();
    message.totalAmount = object.totalAmount?.map((e) => Coin.fromPartial(e)) || [];
    message.claimedAmount = object.claimedAmount?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRewardSeries(): RewardSeries {
  return {
    seriesOne: undefined,
    seriesTwo: undefined,
    seriesThree: undefined,
    seriesFour: undefined,
    seriesFive: undefined,
    seriesSix: undefined,
    seriesSeven: undefined,
  };
}

export const RewardSeries = {
  encode(message: RewardSeries, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.seriesOne !== undefined) {
      RewardPool.encode(message.seriesOne, writer.uint32(10).fork()).ldelim();
    }
    if (message.seriesTwo !== undefined) {
      RewardPool.encode(message.seriesTwo, writer.uint32(18).fork()).ldelim();
    }
    if (message.seriesThree !== undefined) {
      RewardPool.encode(message.seriesThree, writer.uint32(26).fork()).ldelim();
    }
    if (message.seriesFour !== undefined) {
      RewardPool.encode(message.seriesFour, writer.uint32(34).fork()).ldelim();
    }
    if (message.seriesFive !== undefined) {
      RewardPool.encode(message.seriesFive, writer.uint32(42).fork()).ldelim();
    }
    if (message.seriesSix !== undefined) {
      RewardPool.encode(message.seriesSix, writer.uint32(50).fork()).ldelim();
    }
    if (message.seriesSeven !== undefined) {
      RewardPool.encode(message.seriesSeven, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RewardSeries {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRewardSeries();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.seriesOne = RewardPool.decode(reader, reader.uint32());
          break;
        case 2:
          message.seriesTwo = RewardPool.decode(reader, reader.uint32());
          break;
        case 3:
          message.seriesThree = RewardPool.decode(reader, reader.uint32());
          break;
        case 4:
          message.seriesFour = RewardPool.decode(reader, reader.uint32());
          break;
        case 5:
          message.seriesFive = RewardPool.decode(reader, reader.uint32());
          break;
        case 6:
          message.seriesSix = RewardPool.decode(reader, reader.uint32());
          break;
        case 7:
          message.seriesSeven = RewardPool.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RewardSeries {
    return {
      seriesOne: isSet(object.seriesOne) ? RewardPool.fromJSON(object.seriesOne) : undefined,
      seriesTwo: isSet(object.seriesTwo) ? RewardPool.fromJSON(object.seriesTwo) : undefined,
      seriesThree: isSet(object.seriesThree) ? RewardPool.fromJSON(object.seriesThree) : undefined,
      seriesFour: isSet(object.seriesFour) ? RewardPool.fromJSON(object.seriesFour) : undefined,
      seriesFive: isSet(object.seriesFive) ? RewardPool.fromJSON(object.seriesFive) : undefined,
      seriesSix: isSet(object.seriesSix) ? RewardPool.fromJSON(object.seriesSix) : undefined,
      seriesSeven: isSet(object.seriesSeven) ? RewardPool.fromJSON(object.seriesSeven) : undefined,
    };
  },

  toJSON(message: RewardSeries): unknown {
    const obj: any = {};
    message.seriesOne !== undefined
      && (obj.seriesOne = message.seriesOne ? RewardPool.toJSON(message.seriesOne) : undefined);
    message.seriesTwo !== undefined
      && (obj.seriesTwo = message.seriesTwo ? RewardPool.toJSON(message.seriesTwo) : undefined);
    message.seriesThree !== undefined
      && (obj.seriesThree = message.seriesThree ? RewardPool.toJSON(message.seriesThree) : undefined);
    message.seriesFour !== undefined
      && (obj.seriesFour = message.seriesFour ? RewardPool.toJSON(message.seriesFour) : undefined);
    message.seriesFive !== undefined
      && (obj.seriesFive = message.seriesFive ? RewardPool.toJSON(message.seriesFive) : undefined);
    message.seriesSix !== undefined
      && (obj.seriesSix = message.seriesSix ? RewardPool.toJSON(message.seriesSix) : undefined);
    message.seriesSeven !== undefined
      && (obj.seriesSeven = message.seriesSeven ? RewardPool.toJSON(message.seriesSeven) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RewardSeries>, I>>(object: I): RewardSeries {
    const message = createBaseRewardSeries();
    message.seriesOne = (object.seriesOne !== undefined && object.seriesOne !== null)
      ? RewardPool.fromPartial(object.seriesOne)
      : undefined;
    message.seriesTwo = (object.seriesTwo !== undefined && object.seriesTwo !== null)
      ? RewardPool.fromPartial(object.seriesTwo)
      : undefined;
    message.seriesThree = (object.seriesThree !== undefined && object.seriesThree !== null)
      ? RewardPool.fromPartial(object.seriesThree)
      : undefined;
    message.seriesFour = (object.seriesFour !== undefined && object.seriesFour !== null)
      ? RewardPool.fromPartial(object.seriesFour)
      : undefined;
    message.seriesFive = (object.seriesFive !== undefined && object.seriesFive !== null)
      ? RewardPool.fromPartial(object.seriesFive)
      : undefined;
    message.seriesSix = (object.seriesSix !== undefined && object.seriesSix !== null)
      ? RewardPool.fromPartial(object.seriesSix)
      : undefined;
    message.seriesSeven = (object.seriesSeven !== undefined && object.seriesSeven !== null)
      ? RewardPool.fromPartial(object.seriesSeven)
      : undefined;
    return message;
  },
};

function createBaseParams(): Params {
  return { evaluatorAddress: "", rewardSeries: undefined };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.evaluatorAddress !== "") {
      writer.uint32(10).string(message.evaluatorAddress);
    }
    if (message.rewardSeries !== undefined) {
      RewardSeries.encode(message.rewardSeries, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.evaluatorAddress = reader.string();
          break;
        case 2:
          message.rewardSeries = RewardSeries.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      evaluatorAddress: isSet(object.evaluatorAddress) ? String(object.evaluatorAddress) : "",
      rewardSeries: isSet(object.rewardSeries) ? RewardSeries.fromJSON(object.rewardSeries) : undefined,
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.evaluatorAddress !== undefined && (obj.evaluatorAddress = message.evaluatorAddress);
    message.rewardSeries !== undefined
      && (obj.rewardSeries = message.rewardSeries ? RewardSeries.toJSON(message.rewardSeries) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.evaluatorAddress = object.evaluatorAddress ?? "";
    message.rewardSeries = (object.rewardSeries !== undefined && object.rewardSeries !== null)
      ? RewardSeries.fromPartial(object.rewardSeries)
      : undefined;
    return message;
  },
};

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
