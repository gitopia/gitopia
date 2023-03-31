/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Coin } from "../cosmos/base/v1beta1/coin";

export const protobufPackage = "gitopia.gitopia.rewards";

export interface RewardPool {
  totalAmount: Coin[];
  claimedAmount: Coin[];
}

/** Params defines the parameters for the module. */
export interface Params {
  evaluatorAddress: string;
  rewardSeries: { [key: number]: RewardPool };
}

export interface Params_RewardSeriesEntry {
  key: number;
  value: RewardPool | undefined;
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

function createBaseParams(): Params {
  return { evaluatorAddress: "", rewardSeries: {} };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.evaluatorAddress !== "") {
      writer.uint32(10).string(message.evaluatorAddress);
    }
    Object.entries(message.rewardSeries).forEach(([key, value]) => {
      Params_RewardSeriesEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
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
          const entry2 = Params_RewardSeriesEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.rewardSeries[entry2.key] = entry2.value;
          }
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
      rewardSeries: isObject(object.rewardSeries)
        ? Object.entries(object.rewardSeries).reduce<{ [key: number]: RewardPool }>((acc, [key, value]) => {
          acc[Number(key)] = RewardPool.fromJSON(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.evaluatorAddress !== undefined && (obj.evaluatorAddress = message.evaluatorAddress);
    obj.rewardSeries = {};
    if (message.rewardSeries) {
      Object.entries(message.rewardSeries).forEach(([k, v]) => {
        obj.rewardSeries[k] = RewardPool.toJSON(v);
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.evaluatorAddress = object.evaluatorAddress ?? "";
    message.rewardSeries = Object.entries(object.rewardSeries ?? {}).reduce<{ [key: number]: RewardPool }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[Number(key)] = RewardPool.fromPartial(value);
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

function createBaseParams_RewardSeriesEntry(): Params_RewardSeriesEntry {
  return { key: 0, value: undefined };
}

export const Params_RewardSeriesEntry = {
  encode(message: Params_RewardSeriesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== 0) {
      writer.uint32(8).int32(message.key);
    }
    if (message.value !== undefined) {
      RewardPool.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params_RewardSeriesEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams_RewardSeriesEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.int32();
          break;
        case 2:
          message.value = RewardPool.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params_RewardSeriesEntry {
    return {
      key: isSet(object.key) ? Number(object.key) : 0,
      value: isSet(object.value) ? RewardPool.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: Params_RewardSeriesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = Math.round(message.key));
    message.value !== undefined && (obj.value = message.value ? RewardPool.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params_RewardSeriesEntry>, I>>(object: I): Params_RewardSeriesEntry {
    const message = createBaseParams_RewardSeriesEntry();
    message.key = object.key ?? 0;
    message.value = (object.value !== undefined && object.value !== null)
      ? RewardPool.fromPartial(object.value)
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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
