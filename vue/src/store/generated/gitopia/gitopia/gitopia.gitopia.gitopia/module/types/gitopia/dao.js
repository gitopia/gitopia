/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
export const protobufPackage = "gitopia.gitopia.gitopia";
const baseDao = {
    creator: "",
    id: 0,
    address: "",
    name: "",
    avatarUrl: "",
    followers: "",
    following: "",
    teams: 0,
    location: "",
    website: "",
    verified: false,
    description: "",
    createdAt: 0,
    updatedAt: 0,
    legacyAddress: "",
};
export const Dao = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== 0) {
            writer.uint32(16).uint64(message.id);
        }
        if (message.address !== "") {
            writer.uint32(26).string(message.address);
        }
        if (message.name !== "") {
            writer.uint32(34).string(message.name);
        }
        if (message.avatarUrl !== "") {
            writer.uint32(42).string(message.avatarUrl);
        }
        for (const v of message.followers) {
            writer.uint32(50).string(v);
        }
        for (const v of message.following) {
            writer.uint32(58).string(v);
        }
        writer.uint32(66).fork();
        for (const v of message.teams) {
            writer.uint64(v);
        }
        writer.ldelim();
        if (message.location !== "") {
            writer.uint32(74).string(message.location);
        }
        if (message.website !== "") {
            writer.uint32(82).string(message.website);
        }
        if (message.verified === true) {
            writer.uint32(88).bool(message.verified);
        }
        if (message.description !== "") {
            writer.uint32(98).string(message.description);
        }
        if (message.createdAt !== 0) {
            writer.uint32(104).int64(message.createdAt);
        }
        if (message.updatedAt !== 0) {
            writer.uint32(112).int64(message.updatedAt);
        }
        if (message.legacyAddress !== "") {
            writer.uint32(122).string(message.legacyAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseDao };
        message.followers = [];
        message.following = [];
        message.teams = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.id = longToNumber(reader.uint64());
                    break;
                case 3:
                    message.address = reader.string();
                    break;
                case 4:
                    message.name = reader.string();
                    break;
                case 5:
                    message.avatarUrl = reader.string();
                    break;
                case 6:
                    message.followers.push(reader.string());
                    break;
                case 7:
                    message.following.push(reader.string());
                    break;
                case 8:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.teams.push(longToNumber(reader.uint64()));
                        }
                    }
                    else {
                        message.teams.push(longToNumber(reader.uint64()));
                    }
                    break;
                case 9:
                    message.location = reader.string();
                    break;
                case 10:
                    message.website = reader.string();
                    break;
                case 11:
                    message.verified = reader.bool();
                    break;
                case 12:
                    message.description = reader.string();
                    break;
                case 13:
                    message.createdAt = longToNumber(reader.int64());
                    break;
                case 14:
                    message.updatedAt = longToNumber(reader.int64());
                    break;
                case 15:
                    message.legacyAddress = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseDao };
        message.followers = [];
        message.following = [];
        message.teams = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.id !== undefined && object.id !== null) {
            message.id = Number(object.id);
        }
        else {
            message.id = 0;
        }
        if (object.address !== undefined && object.address !== null) {
            message.address = String(object.address);
        }
        else {
            message.address = "";
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = "";
        }
        if (object.avatarUrl !== undefined && object.avatarUrl !== null) {
            message.avatarUrl = String(object.avatarUrl);
        }
        else {
            message.avatarUrl = "";
        }
        if (object.followers !== undefined && object.followers !== null) {
            for (const e of object.followers) {
                message.followers.push(String(e));
            }
        }
        if (object.following !== undefined && object.following !== null) {
            for (const e of object.following) {
                message.following.push(String(e));
            }
        }
        if (object.teams !== undefined && object.teams !== null) {
            for (const e of object.teams) {
                message.teams.push(Number(e));
            }
        }
        if (object.location !== undefined && object.location !== null) {
            message.location = String(object.location);
        }
        else {
            message.location = "";
        }
        if (object.website !== undefined && object.website !== null) {
            message.website = String(object.website);
        }
        else {
            message.website = "";
        }
        if (object.verified !== undefined && object.verified !== null) {
            message.verified = Boolean(object.verified);
        }
        else {
            message.verified = false;
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = String(object.description);
        }
        else {
            message.description = "";
        }
        if (object.createdAt !== undefined && object.createdAt !== null) {
            message.createdAt = Number(object.createdAt);
        }
        else {
            message.createdAt = 0;
        }
        if (object.updatedAt !== undefined && object.updatedAt !== null) {
            message.updatedAt = Number(object.updatedAt);
        }
        else {
            message.updatedAt = 0;
        }
        if (object.legacyAddress !== undefined && object.legacyAddress !== null) {
            message.legacyAddress = String(object.legacyAddress);
        }
        else {
            message.legacyAddress = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        message.address !== undefined && (obj.address = message.address);
        message.name !== undefined && (obj.name = message.name);
        message.avatarUrl !== undefined && (obj.avatarUrl = message.avatarUrl);
        if (message.followers) {
            obj.followers = message.followers.map((e) => e);
        }
        else {
            obj.followers = [];
        }
        if (message.following) {
            obj.following = message.following.map((e) => e);
        }
        else {
            obj.following = [];
        }
        if (message.teams) {
            obj.teams = message.teams.map((e) => e);
        }
        else {
            obj.teams = [];
        }
        message.location !== undefined && (obj.location = message.location);
        message.website !== undefined && (obj.website = message.website);
        message.verified !== undefined && (obj.verified = message.verified);
        message.description !== undefined &&
            (obj.description = message.description);
        message.createdAt !== undefined && (obj.createdAt = message.createdAt);
        message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt);
        message.legacyAddress !== undefined &&
            (obj.legacyAddress = message.legacyAddress);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseDao };
        message.followers = [];
        message.following = [];
        message.teams = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = 0;
        }
        if (object.address !== undefined && object.address !== null) {
            message.address = object.address;
        }
        else {
            message.address = "";
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = "";
        }
        if (object.avatarUrl !== undefined && object.avatarUrl !== null) {
            message.avatarUrl = object.avatarUrl;
        }
        else {
            message.avatarUrl = "";
        }
        if (object.followers !== undefined && object.followers !== null) {
            for (const e of object.followers) {
                message.followers.push(e);
            }
        }
        if (object.following !== undefined && object.following !== null) {
            for (const e of object.following) {
                message.following.push(e);
            }
        }
        if (object.teams !== undefined && object.teams !== null) {
            for (const e of object.teams) {
                message.teams.push(e);
            }
        }
        if (object.location !== undefined && object.location !== null) {
            message.location = object.location;
        }
        else {
            message.location = "";
        }
        if (object.website !== undefined && object.website !== null) {
            message.website = object.website;
        }
        else {
            message.website = "";
        }
        if (object.verified !== undefined && object.verified !== null) {
            message.verified = object.verified;
        }
        else {
            message.verified = false;
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = object.description;
        }
        else {
            message.description = "";
        }
        if (object.createdAt !== undefined && object.createdAt !== null) {
            message.createdAt = object.createdAt;
        }
        else {
            message.createdAt = 0;
        }
        if (object.updatedAt !== undefined && object.updatedAt !== null) {
            message.updatedAt = object.updatedAt;
        }
        else {
            message.updatedAt = 0;
        }
        if (object.legacyAddress !== undefined && object.legacyAddress !== null) {
            message.legacyAddress = object.legacyAddress;
        }
        else {
            message.legacyAddress = "";
        }
        return message;
    },
};
const baseLegacyDaoAddress = { id: 0, legacyAddress: "", address: "" };
export const LegacyDaoAddress = {
    encode(message, writer = Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        if (message.legacyAddress !== "") {
            writer.uint32(18).string(message.legacyAddress);
        }
        if (message.address !== "") {
            writer.uint32(26).string(message.address);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseLegacyDaoAddress };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = longToNumber(reader.uint64());
                    break;
                case 2:
                    message.legacyAddress = reader.string();
                    break;
                case 3:
                    message.address = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseLegacyDaoAddress };
        if (object.id !== undefined && object.id !== null) {
            message.id = Number(object.id);
        }
        else {
            message.id = 0;
        }
        if (object.legacyAddress !== undefined && object.legacyAddress !== null) {
            message.legacyAddress = String(object.legacyAddress);
        }
        else {
            message.legacyAddress = "";
        }
        if (object.address !== undefined && object.address !== null) {
            message.address = String(object.address);
        }
        else {
            message.address = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        message.legacyAddress !== undefined &&
            (obj.legacyAddress = message.legacyAddress);
        message.address !== undefined && (obj.address = message.address);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseLegacyDaoAddress };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = 0;
        }
        if (object.legacyAddress !== undefined && object.legacyAddress !== null) {
            message.legacyAddress = object.legacyAddress;
        }
        else {
            message.legacyAddress = "";
        }
        if (object.address !== undefined && object.address !== null) {
            message.address = object.address;
        }
        else {
            message.address = "";
        }
        return message;
    },
};
var globalThis = (() => {
    if (typeof globalThis !== "undefined")
        return globalThis;
    if (typeof self !== "undefined")
        return self;
    if (typeof window !== "undefined")
        return window;
    if (typeof global !== "undefined")
        return global;
    throw "Unable to locate global object";
})();
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
    }
    return long.toNumber();
}
if (util.Long !== Long) {
    util.Long = Long;
    configure();
}
