/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Series, seriesFromJSON, seriesToJSON } from "./pool";

export const protobufPackage = "gitopia.gitopia.rewards";

/** a map from recipient to all her rewards */
export interface Reward {
  recipient: string;
  rewards: RecipientReward[];
}

export interface RecipientReward {
  series: Series;
  amount: Coin | undefined;
  creator: string;
  claimedAmount: Coin | undefined;
  claimedAmountWithDecay: Coin | undefined;
}

function createBaseReward(): Reward {
  return { recipient: "", rewards: [] };
}

export const Reward = {
  encode(message: Reward, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.recipient !== "") {
      writer.uint32(10).string(message.recipient);
    }
    for (const v of message.rewards) {
      RecipientReward.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Reward {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReward();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.recipient = reader.string();
          break;
        case 2:
          message.rewards.push(RecipientReward.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Reward {
    return {
      recipient: isSet(object.recipient) ? String(object.recipient) : "",
      rewards: Array.isArray(object?.rewards) ? object.rewards.map((e: any) => RecipientReward.fromJSON(e)) : [],
    };
  },

  toJSON(message: Reward): unknown {
    const obj: any = {};
    message.recipient !== undefined && (obj.recipient = message.recipient);
    if (message.rewards) {
      obj.rewards = message.rewards.map((e) => e ? RecipientReward.toJSON(e) : undefined);
    } else {
      obj.rewards = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Reward>, I>>(object: I): Reward {
    const message = createBaseReward();
    message.recipient = object.recipient ?? "";
    message.rewards = object.rewards?.map((e) => RecipientReward.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRecipientReward(): RecipientReward {
  return { series: 0, amount: undefined, creator: "", claimedAmount: undefined, claimedAmountWithDecay: undefined };
}

export const RecipientReward = {
  encode(message: RecipientReward, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.series !== 0) {
      writer.uint32(8).int32(message.series);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(18).fork()).ldelim();
    }
    if (message.creator !== "") {
      writer.uint32(26).string(message.creator);
    }
    if (message.claimedAmount !== undefined) {
      Coin.encode(message.claimedAmount, writer.uint32(34).fork()).ldelim();
    }
    if (message.claimedAmountWithDecay !== undefined) {
      Coin.encode(message.claimedAmountWithDecay, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecipientReward {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecipientReward();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.series = reader.int32() as any;
          break;
        case 2:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        case 3:
          message.creator = reader.string();
          break;
        case 4:
          message.claimedAmount = Coin.decode(reader, reader.uint32());
          break;
        case 5:
          message.claimedAmountWithDecay = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecipientReward {
    return {
      series: isSet(object.series) ? seriesFromJSON(object.series) : 0,
      amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined,
      creator: isSet(object.creator) ? String(object.creator) : "",
      claimedAmount: isSet(object.claimedAmount) ? Coin.fromJSON(object.claimedAmount) : undefined,
      claimedAmountWithDecay: isSet(object.claimedAmountWithDecay)
        ? Coin.fromJSON(object.claimedAmountWithDecay)
        : undefined,
    };
  },

  toJSON(message: RecipientReward): unknown {
    const obj: any = {};
    message.series !== undefined && (obj.series = seriesToJSON(message.series));
    message.amount !== undefined && (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    message.creator !== undefined && (obj.creator = message.creator);
    message.claimedAmount !== undefined
      && (obj.claimedAmount = message.claimedAmount ? Coin.toJSON(message.claimedAmount) : undefined);
    message.claimedAmountWithDecay !== undefined && (obj.claimedAmountWithDecay = message.claimedAmountWithDecay
      ? Coin.toJSON(message.claimedAmountWithDecay)
      : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecipientReward>, I>>(object: I): RecipientReward {
    const message = createBaseRecipientReward();
    message.series = object.series ?? 0;
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Coin.fromPartial(object.amount)
      : undefined;
    message.creator = object.creator ?? "";
    message.claimedAmount = (object.claimedAmount !== undefined && object.claimedAmount !== null)
      ? Coin.fromPartial(object.claimedAmount)
      : undefined;
    message.claimedAmountWithDecay =
      (object.claimedAmountWithDecay !== undefined && object.claimedAmountWithDecay !== null)
        ? Coin.fromPartial(object.claimedAmountWithDecay)
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
