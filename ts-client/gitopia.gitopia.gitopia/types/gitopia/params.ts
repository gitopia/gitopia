/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../google/protobuf/timestamp";

export const protobufPackage = "gitopia.gitopia.gitopia";

export interface DistributionProportion {
  proportion: number;
  address: string;
}

export interface PoolProportions {
  ecosystem: DistributionProportion | undefined;
  team: DistributionProportion | undefined;
}

/** Params defines the parameters for the module. */
export interface Params {
  nextInflationTime: Date | undefined;
  poolProportions: PoolProportions | undefined;
  teamProportions: DistributionProportion[];
}

function createBaseDistributionProportion(): DistributionProportion {
  return { proportion: 0, address: "" };
}

export const DistributionProportion = {
  encode(message: DistributionProportion, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.proportion !== 0) {
      writer.uint32(8).int64(message.proportion);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DistributionProportion {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDistributionProportion();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proportion = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DistributionProportion {
    return {
      proportion: isSet(object.proportion) ? Number(object.proportion) : 0,
      address: isSet(object.address) ? String(object.address) : "",
    };
  },

  toJSON(message: DistributionProportion): unknown {
    const obj: any = {};
    message.proportion !== undefined && (obj.proportion = Math.round(message.proportion));
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DistributionProportion>, I>>(object: I): DistributionProportion {
    const message = createBaseDistributionProportion();
    message.proportion = object.proportion ?? 0;
    message.address = object.address ?? "";
    return message;
  },
};

function createBasePoolProportions(): PoolProportions {
  return { ecosystem: undefined, team: undefined };
}

export const PoolProportions = {
  encode(message: PoolProportions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ecosystem !== undefined) {
      DistributionProportion.encode(message.ecosystem, writer.uint32(10).fork()).ldelim();
    }
    if (message.team !== undefined) {
      DistributionProportion.encode(message.team, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PoolProportions {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolProportions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ecosystem = DistributionProportion.decode(reader, reader.uint32());
          break;
        case 2:
          message.team = DistributionProportion.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PoolProportions {
    return {
      ecosystem: isSet(object.ecosystem) ? DistributionProportion.fromJSON(object.ecosystem) : undefined,
      team: isSet(object.team) ? DistributionProportion.fromJSON(object.team) : undefined,
    };
  },

  toJSON(message: PoolProportions): unknown {
    const obj: any = {};
    message.ecosystem !== undefined
      && (obj.ecosystem = message.ecosystem ? DistributionProportion.toJSON(message.ecosystem) : undefined);
    message.team !== undefined && (obj.team = message.team ? DistributionProportion.toJSON(message.team) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PoolProportions>, I>>(object: I): PoolProportions {
    const message = createBasePoolProportions();
    message.ecosystem = (object.ecosystem !== undefined && object.ecosystem !== null)
      ? DistributionProportion.fromPartial(object.ecosystem)
      : undefined;
    message.team = (object.team !== undefined && object.team !== null)
      ? DistributionProportion.fromPartial(object.team)
      : undefined;
    return message;
  },
};

function createBaseParams(): Params {
  return { nextInflationTime: undefined, poolProportions: undefined, teamProportions: [] };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nextInflationTime !== undefined) {
      Timestamp.encode(toTimestamp(message.nextInflationTime), writer.uint32(10).fork()).ldelim();
    }
    if (message.poolProportions !== undefined) {
      PoolProportions.encode(message.poolProportions, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.teamProportions) {
      DistributionProportion.encode(v!, writer.uint32(26).fork()).ldelim();
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
          message.nextInflationTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 2:
          message.poolProportions = PoolProportions.decode(reader, reader.uint32());
          break;
        case 3:
          message.teamProportions.push(DistributionProportion.decode(reader, reader.uint32()));
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
      nextInflationTime: isSet(object.nextInflationTime) ? fromJsonTimestamp(object.nextInflationTime) : undefined,
      poolProportions: isSet(object.poolProportions) ? PoolProportions.fromJSON(object.poolProportions) : undefined,
      teamProportions: Array.isArray(object?.teamProportions)
        ? object.teamProportions.map((e: any) => DistributionProportion.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.nextInflationTime !== undefined && (obj.nextInflationTime = message.nextInflationTime.toISOString());
    message.poolProportions !== undefined
      && (obj.poolProportions = message.poolProportions ? PoolProportions.toJSON(message.poolProportions) : undefined);
    if (message.teamProportions) {
      obj.teamProportions = message.teamProportions.map((e) => e ? DistributionProportion.toJSON(e) : undefined);
    } else {
      obj.teamProportions = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.nextInflationTime = object.nextInflationTime ?? undefined;
    message.poolProportions = (object.poolProportions !== undefined && object.poolProportions !== null)
      ? PoolProportions.fromPartial(object.poolProportions)
      : undefined;
    message.teamProportions = object.teamProportions?.map((e) => DistributionProportion.fromPartial(e)) || [];
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

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

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
