/* eslint-disable */
import { User } from "../gitopia/user";
import { Whois } from "../gitopia/whois";
import { Writer, Reader } from "protobufjs/minimal";
export const protobufPackage = "gitopia.gitopia.gitopia";
const baseGenesisState = {};
export const GenesisState = {
    encode(message, writer = Writer.create()) {
        for (const v of message.userList) {
            User.encode(v, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.whoisList) {
            Whois.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseGenesisState };
        message.userList = [];
        message.whoisList = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
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
    fromJSON(object) {
        const message = { ...baseGenesisState };
        message.userList = [];
        message.whoisList = [];
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
    toJSON(message) {
        const obj = {};
        if (message.userList) {
            obj.userList = message.userList.map((e) => e ? User.toJSON(e) : undefined);
        }
        else {
            obj.userList = [];
        }
        if (message.whoisList) {
            obj.whoisList = message.whoisList.map((e) => e ? Whois.toJSON(e) : undefined);
        }
        else {
            obj.whoisList = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseGenesisState };
        message.userList = [];
        message.whoisList = [];
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
