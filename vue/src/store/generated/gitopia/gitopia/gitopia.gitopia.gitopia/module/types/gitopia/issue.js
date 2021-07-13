/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
export const protobufPackage = "gitopia.gitopia.gitopia";
const baseIssue = {
    creator: "",
    id: 0,
    iid: 0,
    title: "",
    state: "",
    description: "",
    comments: 0,
    pullRequests: 0,
    repositoryId: 0,
    labels: "",
    weight: 0,
    assigneesId: 0,
    createdAt: 0,
    updatedAt: 0,
    closedAt: 0,
    closedBy: "",
    extensions: "",
};
export const Issue = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== 0) {
            writer.uint32(16).uint64(message.id);
        }
        if (message.iid !== 0) {
            writer.uint32(24).uint64(message.iid);
        }
        if (message.title !== "") {
            writer.uint32(34).string(message.title);
        }
        if (message.state !== "") {
            writer.uint32(42).string(message.state);
        }
        if (message.description !== "") {
            writer.uint32(50).string(message.description);
        }
        writer.uint32(58).fork();
        for (const v of message.comments) {
            writer.uint64(v);
        }
        writer.ldelim();
        writer.uint32(66).fork();
        for (const v of message.pullRequests) {
            writer.uint64(v);
        }
        writer.ldelim();
        if (message.repositoryId !== 0) {
            writer.uint32(72).uint64(message.repositoryId);
        }
        for (const v of message.labels) {
            writer.uint32(82).string(v);
        }
        if (message.weight !== 0) {
            writer.uint32(88).uint64(message.weight);
        }
        writer.uint32(98).fork();
        for (const v of message.assigneesId) {
            writer.uint64(v);
        }
        writer.ldelim();
        if (message.createdAt !== 0) {
            writer.uint32(104).int64(message.createdAt);
        }
        if (message.updatedAt !== 0) {
            writer.uint32(112).int64(message.updatedAt);
        }
        if (message.closedAt !== 0) {
            writer.uint32(120).int64(message.closedAt);
        }
        if (message.closedBy !== "") {
            writer.uint32(130).string(message.closedBy);
        }
        if (message.extensions !== "") {
            writer.uint32(138).string(message.extensions);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseIssue };
        message.comments = [];
        message.pullRequests = [];
        message.labels = [];
        message.assigneesId = [];
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
                    message.iid = longToNumber(reader.uint64());
                    break;
                case 4:
                    message.title = reader.string();
                    break;
                case 5:
                    message.state = reader.string();
                    break;
                case 6:
                    message.description = reader.string();
                    break;
                case 7:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.comments.push(longToNumber(reader.uint64()));
                        }
                    }
                    else {
                        message.comments.push(longToNumber(reader.uint64()));
                    }
                    break;
                case 8:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.pullRequests.push(longToNumber(reader.uint64()));
                        }
                    }
                    else {
                        message.pullRequests.push(longToNumber(reader.uint64()));
                    }
                    break;
                case 9:
                    message.repositoryId = longToNumber(reader.uint64());
                    break;
                case 10:
                    message.labels.push(reader.string());
                    break;
                case 11:
                    message.weight = longToNumber(reader.uint64());
                    break;
                case 12:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.assigneesId.push(longToNumber(reader.uint64()));
                        }
                    }
                    else {
                        message.assigneesId.push(longToNumber(reader.uint64()));
                    }
                    break;
                case 13:
                    message.createdAt = longToNumber(reader.int64());
                    break;
                case 14:
                    message.updatedAt = longToNumber(reader.int64());
                    break;
                case 15:
                    message.closedAt = longToNumber(reader.int64());
                    break;
                case 16:
                    message.closedBy = reader.string();
                    break;
                case 17:
                    message.extensions = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseIssue };
        message.comments = [];
        message.pullRequests = [];
        message.labels = [];
        message.assigneesId = [];
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
        if (object.iid !== undefined && object.iid !== null) {
            message.iid = Number(object.iid);
        }
        else {
            message.iid = 0;
        }
        if (object.title !== undefined && object.title !== null) {
            message.title = String(object.title);
        }
        else {
            message.title = "";
        }
        if (object.state !== undefined && object.state !== null) {
            message.state = String(object.state);
        }
        else {
            message.state = "";
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = String(object.description);
        }
        else {
            message.description = "";
        }
        if (object.comments !== undefined && object.comments !== null) {
            for (const e of object.comments) {
                message.comments.push(Number(e));
            }
        }
        if (object.pullRequests !== undefined && object.pullRequests !== null) {
            for (const e of object.pullRequests) {
                message.pullRequests.push(Number(e));
            }
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = Number(object.repositoryId);
        }
        else {
            message.repositoryId = 0;
        }
        if (object.labels !== undefined && object.labels !== null) {
            for (const e of object.labels) {
                message.labels.push(String(e));
            }
        }
        if (object.weight !== undefined && object.weight !== null) {
            message.weight = Number(object.weight);
        }
        else {
            message.weight = 0;
        }
        if (object.assigneesId !== undefined && object.assigneesId !== null) {
            for (const e of object.assigneesId) {
                message.assigneesId.push(Number(e));
            }
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
        if (object.closedAt !== undefined && object.closedAt !== null) {
            message.closedAt = Number(object.closedAt);
        }
        else {
            message.closedAt = 0;
        }
        if (object.closedBy !== undefined && object.closedBy !== null) {
            message.closedBy = String(object.closedBy);
        }
        else {
            message.closedBy = "";
        }
        if (object.extensions !== undefined && object.extensions !== null) {
            message.extensions = String(object.extensions);
        }
        else {
            message.extensions = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        message.iid !== undefined && (obj.iid = message.iid);
        message.title !== undefined && (obj.title = message.title);
        message.state !== undefined && (obj.state = message.state);
        message.description !== undefined &&
            (obj.description = message.description);
        if (message.comments) {
            obj.comments = message.comments.map((e) => e);
        }
        else {
            obj.comments = [];
        }
        if (message.pullRequests) {
            obj.pullRequests = message.pullRequests.map((e) => e);
        }
        else {
            obj.pullRequests = [];
        }
        message.repositoryId !== undefined &&
            (obj.repositoryId = message.repositoryId);
        if (message.labels) {
            obj.labels = message.labels.map((e) => e);
        }
        else {
            obj.labels = [];
        }
        message.weight !== undefined && (obj.weight = message.weight);
        if (message.assigneesId) {
            obj.assigneesId = message.assigneesId.map((e) => e);
        }
        else {
            obj.assigneesId = [];
        }
        message.createdAt !== undefined && (obj.createdAt = message.createdAt);
        message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt);
        message.closedAt !== undefined && (obj.closedAt = message.closedAt);
        message.closedBy !== undefined && (obj.closedBy = message.closedBy);
        message.extensions !== undefined && (obj.extensions = message.extensions);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseIssue };
        message.comments = [];
        message.pullRequests = [];
        message.labels = [];
        message.assigneesId = [];
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
        if (object.iid !== undefined && object.iid !== null) {
            message.iid = object.iid;
        }
        else {
            message.iid = 0;
        }
        if (object.title !== undefined && object.title !== null) {
            message.title = object.title;
        }
        else {
            message.title = "";
        }
        if (object.state !== undefined && object.state !== null) {
            message.state = object.state;
        }
        else {
            message.state = "";
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = object.description;
        }
        else {
            message.description = "";
        }
        if (object.comments !== undefined && object.comments !== null) {
            for (const e of object.comments) {
                message.comments.push(e);
            }
        }
        if (object.pullRequests !== undefined && object.pullRequests !== null) {
            for (const e of object.pullRequests) {
                message.pullRequests.push(e);
            }
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = object.repositoryId;
        }
        else {
            message.repositoryId = 0;
        }
        if (object.labels !== undefined && object.labels !== null) {
            for (const e of object.labels) {
                message.labels.push(e);
            }
        }
        if (object.weight !== undefined && object.weight !== null) {
            message.weight = object.weight;
        }
        else {
            message.weight = 0;
        }
        if (object.assigneesId !== undefined && object.assigneesId !== null) {
            for (const e of object.assigneesId) {
                message.assigneesId.push(e);
            }
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
        if (object.closedAt !== undefined && object.closedAt !== null) {
            message.closedAt = object.closedAt;
        }
        else {
            message.closedAt = 0;
        }
        if (object.closedBy !== undefined && object.closedBy !== null) {
            message.closedBy = object.closedBy;
        }
        else {
            message.closedBy = "";
        }
        if (object.extensions !== undefined && object.extensions !== null) {
            message.extensions = object.extensions;
        }
        else {
            message.extensions = "";
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
