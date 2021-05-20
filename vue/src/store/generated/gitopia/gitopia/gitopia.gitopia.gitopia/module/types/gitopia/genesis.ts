/* eslint-disable */
import { Repository } from "../gitopia/repository";
import { User } from "../gitopia/user";
import { Whois } from "../gitopia/whois";
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "gitopia.gitopia.gitopia";

/** GenesisState defines the capability module's genesis state. */
export interface GenesisState {
  /** this line is used by starport scaffolding # genesis/proto/state */
  repositoryList: Repository[];
  /** this line is used by starport scaffolding # genesis/proto/stateField */
  userList: User[];
  /** this line is used by starport scaffolding # genesis/proto/stateField */
  whoisList: Whois[];
}

const baseGenesisState: object = {};

export const GenesisState = {
  encode(message: GenesisState, writer: Writer = Writer.create()): Writer {
    for (const v of message.repositoryList) {
      Repository.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.userList) {
      User.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.whoisList) {
      Whois.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenesisState } as GenesisState;
    message.repositoryList = [];
    message.userList = [];
    message.whoisList = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 3:
          message.repositoryList.push(
            Repository.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.userList.push(User.decode(reader, reader.uint32()));
          break;
        case 1:
          message.whoisList.push(Whois.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.repositoryList = [];
    message.userList = [];
    message.whoisList = [];
    if (object.repositoryList !== undefined && object.repositoryList !== null) {
      for (const e of object.repositoryList) {
        message.repositoryList.push(Repository.fromJSON(e));
      }
    }
    if (object.userList !== undefined && object.userList !== null) {
      for (const e of object.userList) {
        message.userList.push(User.fromJSON(e));
      }
    }
    if (object.whoisList !== undefined && object.whoisList !== null) {
      for (const e of object.whoisList) {
        message.whoisList.push(Whois.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.repositoryList) {
      obj.repositoryList = message.repositoryList.map((e) =>
        e ? Repository.toJSON(e) : undefined
      );
    } else {
      obj.repositoryList = [];
    }
    if (message.userList) {
      obj.userList = message.userList.map((e) =>
        e ? User.toJSON(e) : undefined
      );
    } else {
      obj.userList = [];
    }
    if (message.whoisList) {
      obj.whoisList = message.whoisList.map((e) =>
        e ? Whois.toJSON(e) : undefined
      );
    } else {
      obj.whoisList = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.repositoryList = [];
    message.userList = [];
    message.whoisList = [];
    if (object.repositoryList !== undefined && object.repositoryList !== null) {
      for (const e of object.repositoryList) {
        message.repositoryList.push(Repository.fromPartial(e));
      }
    }
    if (object.userList !== undefined && object.userList !== null) {
      for (const e of object.userList) {
        message.userList.push(User.fromPartial(e));
      }
    }
    if (object.whoisList !== undefined && object.whoisList !== null) {
      for (const e of object.whoisList) {
        message.whoisList.push(Whois.fromPartial(e));
      }
    }
    return message;
  },
};

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
