/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Timestamp } from "../../../google/protobuf/timestamp";

export const protobufPackage = "gitopia.gitopia.rewards";

export enum Series {
  NONE = 0,
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
  SEVEN = 7,
  COSMOS = 8,
  UNRECOGNIZED = -1,
}

export function seriesFromJSON(object: any): Series {
  switch (object) {
    case 0:
    case "NONE":
      return Series.NONE;
    case 1:
    case "ONE":
      return Series.ONE;
    case 2:
    case "TWO":
      return Series.TWO;
    case 3:
    case "THREE":
      return Series.THREE;
    case 4:
    case "FOUR":
      return Series.FOUR;
    case 5:
    case "FIVE":
      return Series.FIVE;
    case 6:
    case "SIX":
      return Series.SIX;
    case 7:
    case "SEVEN":
      return Series.SEVEN;
    case 8:
    case "COSMOS":
      return Series.COSMOS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Series.UNRECOGNIZED;
  }
}

export function seriesToJSON(object: Series): string {
  switch (object) {
    case Series.NONE:
      return "NONE";
    case Series.ONE:
      return "ONE";
    case Series.TWO:
      return "TWO";
    case Series.THREE:
      return "THREE";
    case Series.FOUR:
      return "FOUR";
    case Series.FIVE:
      return "FIVE";
    case Series.SIX:
      return "SIX";
    case Series.SEVEN:
      return "SEVEN";
    case Series.COSMOS:
      return "COSMOS";
    case Series.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface RewardPool {
  totalAmount: Coin | undefined;
  claimedAmount: Coin | undefined;
  startTime: Date | undefined;
  endTime: Date | undefined;
  series: Series;
}

function createBaseRewardPool(): RewardPool {
  return { totalAmount: undefined, claimedAmount: undefined, startTime: undefined, endTime: undefined, series: 0 };
}

export const RewardPool = {
  encode(message: RewardPool, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.totalAmount !== undefined) {
      Coin.encode(message.totalAmount, writer.uint32(10).fork()).ldelim();
    }
    if (message.claimedAmount !== undefined) {
      Coin.encode(message.claimedAmount, writer.uint32(18).fork()).ldelim();
    }
    if (message.startTime !== undefined) {
      Timestamp.encode(toTimestamp(message.startTime), writer.uint32(26).fork()).ldelim();
    }
    if (message.endTime !== undefined) {
      Timestamp.encode(toTimestamp(message.endTime), writer.uint32(34).fork()).ldelim();
    }
    if (message.series !== 0) {
      writer.uint32(40).int32(message.series);
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
          message.totalAmount = Coin.decode(reader, reader.uint32());
          break;
        case 2:
          message.claimedAmount = Coin.decode(reader, reader.uint32());
          break;
        case 3:
          message.startTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 4:
          message.endTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 5:
          message.series = reader.int32() as any;
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
      totalAmount: isSet(object.totalAmount) ? Coin.fromJSON(object.totalAmount) : undefined,
      claimedAmount: isSet(object.claimedAmount) ? Coin.fromJSON(object.claimedAmount) : undefined,
      startTime: isSet(object.startTime) ? fromJsonTimestamp(object.startTime) : undefined,
      endTime: isSet(object.endTime) ? fromJsonTimestamp(object.endTime) : undefined,
      series: isSet(object.series) ? seriesFromJSON(object.series) : 0,
    };
  },

  toJSON(message: RewardPool): unknown {
    const obj: any = {};
    message.totalAmount !== undefined
      && (obj.totalAmount = message.totalAmount ? Coin.toJSON(message.totalAmount) : undefined);
    message.claimedAmount !== undefined
      && (obj.claimedAmount = message.claimedAmount ? Coin.toJSON(message.claimedAmount) : undefined);
    message.startTime !== undefined && (obj.startTime = message.startTime.toISOString());
    message.endTime !== undefined && (obj.endTime = message.endTime.toISOString());
    message.series !== undefined && (obj.series = seriesToJSON(message.series));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RewardPool>, I>>(object: I): RewardPool {
    const message = createBaseRewardPool();
    message.totalAmount = (object.totalAmount !== undefined && object.totalAmount !== null)
      ? Coin.fromPartial(object.totalAmount)
      : undefined;
    message.claimedAmount = (object.claimedAmount !== undefined && object.claimedAmount !== null)
      ? Coin.fromPartial(object.claimedAmount)
      : undefined;
    message.startTime = object.startTime ?? undefined;
    message.endTime = object.endTime ?? undefined;
    message.series = object.series ?? 0;
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

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
