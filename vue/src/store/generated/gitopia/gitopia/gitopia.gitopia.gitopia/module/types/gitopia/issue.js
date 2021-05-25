/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
export const protobufPackage = "gitopia.gitopia.gitopia";
const baseIssue = {
    creator: "",
    id: 0,
    iid: "",
    title: "",
    state: "",
    description: "",
    authorId: "",
    comments: "",
    pullRequests: "",
    repositoryId: "",
    labels: "",
    weight: "",
    assigneesId: "",
    createdAt: "",
    updatedAt: "",
    closedAt: "",
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
        if (message.iid !== "") {
            writer.uint32(26).string(message.iid);
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
        if (message.authorId !== "") {
            writer.uint32(58).string(message.authorId);
        }
        if (message.comments !== "") {
            writer.uint32(66).string(message.comments);
        }
        if (message.pullRequests !== "") {
            writer.uint32(74).string(message.pullRequests);
        }
        if (message.repositoryId !== "") {
            writer.uint32(82).string(message.repositoryId);
        }
        if (message.labels !== "") {
            writer.uint32(90).string(message.labels);
        }
        if (message.weight !== "") {
            writer.uint32(98).string(message.weight);
        }
        if (message.assigneesId !== "") {
            writer.uint32(106).string(message.assigneesId);
        }
        if (message.createdAt !== "") {
            writer.uint32(114).string(message.createdAt);
        }
        if (message.updatedAt !== "") {
            writer.uint32(122).string(message.updatedAt);
        }
        if (message.closedAt !== "") {
            writer.uint32(130).string(message.closedAt);
        }
        if (message.closedBy !== "") {
            writer.uint32(138).string(message.closedBy);
        }
        if (message.extensions !== "") {
            writer.uint32(146).string(message.extensions);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseIssue };
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
                    message.iid = reader.string();
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
                    message.authorId = reader.string();
                    break;
                case 8:
                    message.comments = reader.string();
                    break;
                case 9:
                    message.pullRequests = reader.string();
                    break;
                case 10:
                    message.repositoryId = reader.string();
                    break;
                case 11:
                    message.labels = reader.string();
                    break;
                case 12:
                    message.weight = reader.string();
                    break;
                case 13:
                    message.assigneesId = reader.string();
                    break;
                case 14:
                    message.createdAt = reader.string();
                    break;
                case 15:
                    message.updatedAt = reader.string();
                    break;
                case 16:
                    message.closedAt = reader.string();
                    break;
                case 17:
                    message.closedBy = reader.string();
                    break;
                case 18:
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
            message.iid = String(object.iid);
        }
        else {
            message.iid = "";
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
        if (object.authorId !== undefined && object.authorId !== null) {
            message.authorId = String(object.authorId);
        }
        else {
            message.authorId = "";
        }
        if (object.comments !== undefined && object.comments !== null) {
            message.comments = String(object.comments);
        }
        else {
            message.comments = "";
        }
        if (object.pullRequests !== undefined && object.pullRequests !== null) {
            message.pullRequests = String(object.pullRequests);
        }
        else {
            message.pullRequests = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = String(object.repositoryId);
        }
        else {
            message.repositoryId = "";
        }
        if (object.labels !== undefined && object.labels !== null) {
            message.labels = String(object.labels);
        }
        else {
            message.labels = "";
        }
        if (object.weight !== undefined && object.weight !== null) {
            message.weight = String(object.weight);
        }
        else {
            message.weight = "";
        }
        if (object.assigneesId !== undefined && object.assigneesId !== null) {
            message.assigneesId = String(object.assigneesId);
        }
        else {
            message.assigneesId = "";
        }
        if (object.createdAt !== undefined && object.createdAt !== null) {
            message.createdAt = String(object.createdAt);
        }
        else {
            message.createdAt = "";
        }
        if (object.updatedAt !== undefined && object.updatedAt !== null) {
            message.updatedAt = String(object.updatedAt);
        }
        else {
            message.updatedAt = "";
        }
        if (object.closedAt !== undefined && object.closedAt !== null) {
            message.closedAt = String(object.closedAt);
        }
        else {
            message.closedAt = "";
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
        message.authorId !== undefined && (obj.authorId = message.authorId);
        message.comments !== undefined && (obj.comments = message.comments);
        message.pullRequests !== undefined &&
            (obj.pullRequests = message.pullRequests);
        message.repositoryId !== undefined &&
            (obj.repositoryId = message.repositoryId);
        message.labels !== undefined && (obj.labels = message.labels);
        message.weight !== undefined && (obj.weight = message.weight);
        message.assigneesId !== undefined &&
            (obj.assigneesId = message.assigneesId);
        message.createdAt !== undefined && (obj.createdAt = message.createdAt);
        message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt);
        message.closedAt !== undefined && (obj.closedAt = message.closedAt);
        message.closedBy !== undefined && (obj.closedBy = message.closedBy);
        message.extensions !== undefined && (obj.extensions = message.extensions);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseIssue };
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
            message.iid = "";
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
        if (object.authorId !== undefined && object.authorId !== null) {
            message.authorId = object.authorId;
        }
        else {
            message.authorId = "";
        }
        if (object.comments !== undefined && object.comments !== null) {
            message.comments = object.comments;
        }
        else {
            message.comments = "";
        }
        if (object.pullRequests !== undefined && object.pullRequests !== null) {
            message.pullRequests = object.pullRequests;
        }
        else {
            message.pullRequests = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = object.repositoryId;
        }
        else {
            message.repositoryId = "";
        }
        if (object.labels !== undefined && object.labels !== null) {
            message.labels = object.labels;
        }
        else {
            message.labels = "";
        }
        if (object.weight !== undefined && object.weight !== null) {
            message.weight = object.weight;
        }
        else {
            message.weight = "";
        }
        if (object.assigneesId !== undefined && object.assigneesId !== null) {
            message.assigneesId = object.assigneesId;
        }
        else {
            message.assigneesId = "";
        }
        if (object.createdAt !== undefined && object.createdAt !== null) {
            message.createdAt = object.createdAt;
        }
        else {
            message.createdAt = "";
        }
        if (object.updatedAt !== undefined && object.updatedAt !== null) {
            message.updatedAt = object.updatedAt;
        }
        else {
            message.updatedAt = "";
        }
        if (object.closedAt !== undefined && object.closedAt !== null) {
            message.closedAt = object.closedAt;
        }
        else {
            message.closedAt = "";
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
