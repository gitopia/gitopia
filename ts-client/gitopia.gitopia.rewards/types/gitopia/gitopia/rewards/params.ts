/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { RewardPool } from "./pool";

export const protobufPackage = "gitopia.gitopia.rewards";

/** Params defines the parameters for the module. */
export interface Params {
  evaluatorAddress: string;
  rewardSeries: RewardPool[];
}

function createBaseParams(): Params {
  return { evaluatorAddress: "", rewardSeries: [] };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.evaluatorAddress !== "") {
      writer.uint32(10).string(message.evaluatorAddress);
    }
    for (const v of message.rewardSeries) {
      RewardPool.encode(v!, writer.uint32(18).fork()).ldelim();
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
          message.rewardSeries.push(RewardPool.decode(reader, reader.uint32()));
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
      rewardSeries: Array.isArray(object?.rewardSeries)
        ? object.rewardSeries.map((e: any) => RewardPool.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.evaluatorAddress !== undefined && (obj.evaluatorAddress = message.evaluatorAddress);
    if (message.rewardSeries) {
      obj.rewardSeries = message.rewardSeries.map((e) => e ? RewardPool.toJSON(e) : undefined);
    } else {
      obj.rewardSeries = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.evaluatorAddress = object.evaluatorAddress ?? "";
    message.rewardSeries = object.rewardSeries?.map((e) => RewardPool.fromPartial(e)) || [];
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
