/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
export const protobufPackage = "gitopia.gitopia.gitopia";
export var OwnerType;
(function (OwnerType) {
    OwnerType[OwnerType["USER"] = 0] = "USER";
    OwnerType[OwnerType["DAO"] = 1] = "DAO";
    OwnerType[OwnerType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(OwnerType || (OwnerType = {}));
export function ownerTypeFromJSON(object) {
    switch (object) {
        case 0:
        case "USER":
            return OwnerType.USER;
        case 1:
        case "DAO":
            return OwnerType.DAO;
        case -1:
        case "UNRECOGNIZED":
        default:
            return OwnerType.UNRECOGNIZED;
    }
}
export function ownerTypeToJSON(object) {
    switch (object) {
        case OwnerType.USER:
            return "USER";
        case OwnerType.DAO:
            return "DAO";
        default:
            return "UNKNOWN";
    }
}
const baseWhois = {
    creator: "",
    id: 0,
    name: "",
    address: "",
    ownerType: 0,
};
export const Whois = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== 0) {
            writer.uint32(16).uint64(message.id);
        }
        if (message.name !== "") {
            writer.uint32(26).string(message.name);
        }
        if (message.address !== "") {
            writer.uint32(34).string(message.address);
        }
        if (message.ownerType !== 0) {
            writer.uint32(40).int32(message.ownerType);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseWhois };
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
                    message.name = reader.string();
                    break;
                case 4:
                    message.address = reader.string();
                    break;
                case 5:
                    message.ownerType = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseWhois };
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
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = "";
        }
        if (object.address !== undefined && object.address !== null) {
            message.address = String(object.address);
        }
        else {
            message.address = "";
        }
        if (object.ownerType !== undefined && object.ownerType !== null) {
            message.ownerType = ownerTypeFromJSON(object.ownerType);
        }
        else {
            message.ownerType = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        message.name !== undefined && (obj.name = message.name);
        message.address !== undefined && (obj.address = message.address);
        message.ownerType !== undefined &&
            (obj.ownerType = ownerTypeToJSON(message.ownerType));
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseWhois };
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
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = "";
        }
        if (object.address !== undefined && object.address !== null) {
            message.address = object.address;
        }
        else {
            message.address = "";
        }
        if (object.ownerType !== undefined && object.ownerType !== null) {
            message.ownerType = object.ownerType;
        }
        else {
            message.ownerType = 0;
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
