/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "gitopia.gitopia.gitopia";

export enum Emoji {
  EMOJI_THUMBS_UP = 0,
  EMOJI_THUMBS_DOWN = 1,
  UNRECOGNIZED = -1,
}

export function emojiFromJSON(object: any): Emoji {
  switch (object) {
    case 0:
    case "EMOJI_THUMBS_UP":
      return Emoji.EMOJI_THUMBS_UP;
    case 1:
    case "EMOJI_THUMBS_DOWN":
      return Emoji.EMOJI_THUMBS_DOWN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Emoji.UNRECOGNIZED;
  }
}

export function emojiToJSON(object: Emoji): string {
  switch (object) {
    case Emoji.EMOJI_THUMBS_UP:
      return "EMOJI_THUMBS_UP";
    case Emoji.EMOJI_THUMBS_DOWN:
      return "EMOJI_THUMBS_DOWN";
    case Emoji.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Reaction {
  address: string;
  emojis: Emoji[];
}

function createBaseReaction(): Reaction {
  return { address: "", emojis: [] };
}

export const Reaction = {
  encode(message: Reaction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    writer.uint32(18).fork();
    for (const v of message.emojis) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Reaction {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReaction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.emojis.push(reader.int32() as any);
            }
          } else {
            message.emojis.push(reader.int32() as any);
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Reaction {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      emojis: Array.isArray(object?.emojis) ? object.emojis.map((e: any) => emojiFromJSON(e)) : [],
    };
  },

  toJSON(message: Reaction): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    if (message.emojis) {
      obj.emojis = message.emojis.map((e) => emojiToJSON(e));
    } else {
      obj.emojis = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Reaction>, I>>(object: I): Reaction {
    const message = createBaseReaction();
    message.address = object.address ?? "";
    message.emojis = object.emojis?.map((e) => e) || [];
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
