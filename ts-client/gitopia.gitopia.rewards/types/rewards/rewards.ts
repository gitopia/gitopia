/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Coin } from "../cosmos/base/v1beta1/coin";

export const protobufPackage = "gitopia.gitopia.rewards";

export interface Reward {
  recipient: string;
  amount: Coin | undefined;
  creator: string;
  claimedAmountWithoutDecay: Coin | undefined;
  claimedAmount: Coin | undefined;
}

function createBaseReward(): Reward {
  return {
    recipient: "",
    amount: undefined,
    creator: "",
    claimedAmountWithoutDecay: undefined,
    claimedAmount: undefined,
  };
}

export const Reward = {
  encode(message: Reward, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.recipient !== "") {
      writer.uint32(10).string(message.recipient);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(18).fork()).ldelim();
    }
    if (message.creator !== "") {
      writer.uint32(26).string(message.creator);
    }
    if (message.claimedAmountWithoutDecay !== undefined) {
      Coin.encode(message.claimedAmountWithoutDecay, writer.uint32(34).fork()).ldelim();
    }
    if (message.claimedAmount !== undefined) {
      Coin.encode(message.claimedAmount, writer.uint32(42).fork()).ldelim();
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
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        case 3:
          message.creator = reader.string();
          break;
        case 4:
          message.claimedAmountWithoutDecay = Coin.decode(reader, reader.uint32());
          break;
        case 5:
          message.claimedAmount = Coin.decode(reader, reader.uint32());
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
      amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined,
      creator: isSet(object.creator) ? String(object.creator) : "",
      claimedAmountWithoutDecay: isSet(object.claimedAmountWithoutDecay)
        ? Coin.fromJSON(object.claimedAmountWithoutDecay)
        : undefined,
      claimedAmount: isSet(object.claimedAmount) ? Coin.fromJSON(object.claimedAmount) : undefined,
    };
  },

  toJSON(message: Reward): unknown {
    const obj: any = {};
    message.recipient !== undefined && (obj.recipient = message.recipient);
    message.amount !== undefined && (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    message.creator !== undefined && (obj.creator = message.creator);
    message.claimedAmountWithoutDecay !== undefined
      && (obj.claimedAmountWithoutDecay = message.claimedAmountWithoutDecay
        ? Coin.toJSON(message.claimedAmountWithoutDecay)
        : undefined);
    message.claimedAmount !== undefined
      && (obj.claimedAmount = message.claimedAmount ? Coin.toJSON(message.claimedAmount) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Reward>, I>>(object: I): Reward {
    const message = createBaseReward();
    message.recipient = object.recipient ?? "";
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Coin.fromPartial(object.amount)
      : undefined;
    message.creator = object.creator ?? "";
    message.claimedAmountWithoutDecay =
      (object.claimedAmountWithoutDecay !== undefined && object.claimedAmountWithoutDecay !== null)
        ? Coin.fromPartial(object.claimedAmountWithoutDecay)
        : undefined;
    message.claimedAmount = (object.claimedAmount !== undefined && object.claimedAmount !== null)
      ? Coin.fromPartial(object.claimedAmount)
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
