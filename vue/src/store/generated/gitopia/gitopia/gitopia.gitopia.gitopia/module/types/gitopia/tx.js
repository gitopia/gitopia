/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";
export const protobufPackage = "gitopia.gitopia.gitopia";
const baseMsgCreateComment = {
    creator: "",
    parentId: 0,
    body: "",
    attachments: "",
    diffHunk: "",
    path: "",
    system: false,
    authorId: 0,
    authorAssociation: "",
    commentType: "",
};
export const MsgCreateComment = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.parentId !== 0) {
            writer.uint32(16).uint64(message.parentId);
        }
        if (message.body !== "") {
            writer.uint32(26).string(message.body);
        }
        for (const v of message.attachments) {
            writer.uint32(34).string(v);
        }
        if (message.diffHunk !== "") {
            writer.uint32(42).string(message.diffHunk);
        }
        if (message.path !== "") {
            writer.uint32(50).string(message.path);
        }
        if (message.system === true) {
            writer.uint32(56).bool(message.system);
        }
        if (message.authorId !== 0) {
            writer.uint32(64).uint64(message.authorId);
        }
        if (message.authorAssociation !== "") {
            writer.uint32(74).string(message.authorAssociation);
        }
        if (message.commentType !== "") {
            writer.uint32(82).string(message.commentType);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreateComment };
        message.attachments = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.parentId = longToNumber(reader.uint64());
                    break;
                case 3:
                    message.body = reader.string();
                    break;
                case 4:
                    message.attachments.push(reader.string());
                    break;
                case 5:
                    message.diffHunk = reader.string();
                    break;
                case 6:
                    message.path = reader.string();
                    break;
                case 7:
                    message.system = reader.bool();
                    break;
                case 8:
                    message.authorId = longToNumber(reader.uint64());
                    break;
                case 9:
                    message.authorAssociation = reader.string();
                    break;
                case 10:
                    message.commentType = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgCreateComment };
        message.attachments = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.parentId !== undefined && object.parentId !== null) {
            message.parentId = Number(object.parentId);
        }
        else {
            message.parentId = 0;
        }
        if (object.body !== undefined && object.body !== null) {
            message.body = String(object.body);
        }
        else {
            message.body = "";
        }
        if (object.attachments !== undefined && object.attachments !== null) {
            for (const e of object.attachments) {
                message.attachments.push(String(e));
            }
        }
        if (object.diffHunk !== undefined && object.diffHunk !== null) {
            message.diffHunk = String(object.diffHunk);
        }
        else {
            message.diffHunk = "";
        }
        if (object.path !== undefined && object.path !== null) {
            message.path = String(object.path);
        }
        else {
            message.path = "";
        }
        if (object.system !== undefined && object.system !== null) {
            message.system = Boolean(object.system);
        }
        else {
            message.system = false;
        }
        if (object.authorId !== undefined && object.authorId !== null) {
            message.authorId = Number(object.authorId);
        }
        else {
            message.authorId = 0;
        }
        if (object.authorAssociation !== undefined &&
            object.authorAssociation !== null) {
            message.authorAssociation = String(object.authorAssociation);
        }
        else {
            message.authorAssociation = "";
        }
        if (object.commentType !== undefined && object.commentType !== null) {
            message.commentType = String(object.commentType);
        }
        else {
            message.commentType = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.parentId !== undefined && (obj.parentId = message.parentId);
        message.body !== undefined && (obj.body = message.body);
        if (message.attachments) {
            obj.attachments = message.attachments.map((e) => e);
        }
        else {
            obj.attachments = [];
        }
        message.diffHunk !== undefined && (obj.diffHunk = message.diffHunk);
        message.path !== undefined && (obj.path = message.path);
        message.system !== undefined && (obj.system = message.system);
        message.authorId !== undefined && (obj.authorId = message.authorId);
        message.authorAssociation !== undefined &&
            (obj.authorAssociation = message.authorAssociation);
        message.commentType !== undefined &&
            (obj.commentType = message.commentType);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgCreateComment };
        message.attachments = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.parentId !== undefined && object.parentId !== null) {
            message.parentId = object.parentId;
        }
        else {
            message.parentId = 0;
        }
        if (object.body !== undefined && object.body !== null) {
            message.body = object.body;
        }
        else {
            message.body = "";
        }
        if (object.attachments !== undefined && object.attachments !== null) {
            for (const e of object.attachments) {
                message.attachments.push(e);
            }
        }
        if (object.diffHunk !== undefined && object.diffHunk !== null) {
            message.diffHunk = object.diffHunk;
        }
        else {
            message.diffHunk = "";
        }
        if (object.path !== undefined && object.path !== null) {
            message.path = object.path;
        }
        else {
            message.path = "";
        }
        if (object.system !== undefined && object.system !== null) {
            message.system = object.system;
        }
        else {
            message.system = false;
        }
        if (object.authorId !== undefined && object.authorId !== null) {
            message.authorId = object.authorId;
        }
        else {
            message.authorId = 0;
        }
        if (object.authorAssociation !== undefined &&
            object.authorAssociation !== null) {
            message.authorAssociation = object.authorAssociation;
        }
        else {
            message.authorAssociation = "";
        }
        if (object.commentType !== undefined && object.commentType !== null) {
            message.commentType = object.commentType;
        }
        else {
            message.commentType = "";
        }
        return message;
    },
};
const baseMsgCreateCommentResponse = { id: 0 };
export const MsgCreateCommentResponse = {
    encode(message, writer = Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgCreateCommentResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = {
            ...baseMsgCreateCommentResponse,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = Number(object.id);
        }
        else {
            message.id = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgCreateCommentResponse,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = 0;
        }
        return message;
    },
};
const baseMsgUpdateComment = {
    creator: "",
    id: 0,
    body: "",
    attachments: "",
};
export const MsgUpdateComment = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== 0) {
            writer.uint32(16).uint64(message.id);
        }
        if (message.body !== "") {
            writer.uint32(26).string(message.body);
        }
        for (const v of message.attachments) {
            writer.uint32(34).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpdateComment };
        message.attachments = [];
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
                    message.body = reader.string();
                    break;
                case 4:
                    message.attachments.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgUpdateComment };
        message.attachments = [];
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
        if (object.body !== undefined && object.body !== null) {
            message.body = String(object.body);
        }
        else {
            message.body = "";
        }
        if (object.attachments !== undefined && object.attachments !== null) {
            for (const e of object.attachments) {
                message.attachments.push(String(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        message.body !== undefined && (obj.body = message.body);
        if (message.attachments) {
            obj.attachments = message.attachments.map((e) => e);
        }
        else {
            obj.attachments = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgUpdateComment };
        message.attachments = [];
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
        if (object.body !== undefined && object.body !== null) {
            message.body = object.body;
        }
        else {
            message.body = "";
        }
        if (object.attachments !== undefined && object.attachments !== null) {
            for (const e of object.attachments) {
                message.attachments.push(e);
            }
        }
        return message;
    },
};
const baseMsgUpdateCommentResponse = {};
export const MsgUpdateCommentResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgUpdateCommentResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = {
            ...baseMsgUpdateCommentResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgUpdateCommentResponse,
        };
        return message;
    },
};
const baseMsgDeleteComment = { creator: "", id: 0 };
export const MsgDeleteComment = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== 0) {
            writer.uint32(16).uint64(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgDeleteComment };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.id = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgDeleteComment };
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
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgDeleteComment };
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
        return message;
    },
};
const baseMsgDeleteCommentResponse = {};
export const MsgDeleteCommentResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgDeleteCommentResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = {
            ...baseMsgDeleteCommentResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgDeleteCommentResponse,
        };
        return message;
    },
};
const baseMsgCreateIssue = {
    creator: "",
    title: "",
    description: "",
    authorId: 0,
    repositoryId: 0,
    labels: "",
    weight: 0,
    assigneesId: 0,
};
export const MsgCreateIssue = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.title !== "") {
            writer.uint32(18).string(message.title);
        }
        if (message.description !== "") {
            writer.uint32(26).string(message.description);
        }
        if (message.authorId !== 0) {
            writer.uint32(32).uint64(message.authorId);
        }
        if (message.repositoryId !== 0) {
            writer.uint32(40).uint64(message.repositoryId);
        }
        for (const v of message.labels) {
            writer.uint32(50).string(v);
        }
        if (message.weight !== 0) {
            writer.uint32(56).uint64(message.weight);
        }
        writer.uint32(66).fork();
        for (const v of message.assigneesId) {
            writer.uint64(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreateIssue };
        message.labels = [];
        message.assigneesId = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.title = reader.string();
                    break;
                case 3:
                    message.description = reader.string();
                    break;
                case 4:
                    message.authorId = longToNumber(reader.uint64());
                    break;
                case 5:
                    message.repositoryId = longToNumber(reader.uint64());
                    break;
                case 6:
                    message.labels.push(reader.string());
                    break;
                case 7:
                    message.weight = longToNumber(reader.uint64());
                    break;
                case 8:
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
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgCreateIssue };
        message.labels = [];
        message.assigneesId = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.title !== undefined && object.title !== null) {
            message.title = String(object.title);
        }
        else {
            message.title = "";
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = String(object.description);
        }
        else {
            message.description = "";
        }
        if (object.authorId !== undefined && object.authorId !== null) {
            message.authorId = Number(object.authorId);
        }
        else {
            message.authorId = 0;
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
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.title !== undefined && (obj.title = message.title);
        message.description !== undefined &&
            (obj.description = message.description);
        message.authorId !== undefined && (obj.authorId = message.authorId);
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
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgCreateIssue };
        message.labels = [];
        message.assigneesId = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.title !== undefined && object.title !== null) {
            message.title = object.title;
        }
        else {
            message.title = "";
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
            message.authorId = 0;
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
        return message;
    },
};
const baseMsgCreateIssueResponse = { id: 0 };
export const MsgCreateIssueResponse = {
    encode(message, writer = Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreateIssueResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgCreateIssueResponse };
        if (object.id !== undefined && object.id !== null) {
            message.id = Number(object.id);
        }
        else {
            message.id = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgCreateIssueResponse };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = 0;
        }
        return message;
    },
};
const baseMsgUpdateIssue = {
    creator: "",
    id: 0,
    title: "",
    description: "",
    labels: "",
    weight: 0,
    assigneesId: 0,
};
export const MsgUpdateIssue = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== 0) {
            writer.uint32(16).uint64(message.id);
        }
        if (message.title !== "") {
            writer.uint32(26).string(message.title);
        }
        if (message.description !== "") {
            writer.uint32(34).string(message.description);
        }
        for (const v of message.labels) {
            writer.uint32(42).string(v);
        }
        if (message.weight !== 0) {
            writer.uint32(48).uint64(message.weight);
        }
        writer.uint32(58).fork();
        for (const v of message.assigneesId) {
            writer.uint64(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpdateIssue };
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
                    message.title = reader.string();
                    break;
                case 4:
                    message.description = reader.string();
                    break;
                case 5:
                    message.labels.push(reader.string());
                    break;
                case 6:
                    message.weight = longToNumber(reader.uint64());
                    break;
                case 7:
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
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgUpdateIssue };
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
        if (object.title !== undefined && object.title !== null) {
            message.title = String(object.title);
        }
        else {
            message.title = "";
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = String(object.description);
        }
        else {
            message.description = "";
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
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        message.title !== undefined && (obj.title = message.title);
        message.description !== undefined &&
            (obj.description = message.description);
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
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgUpdateIssue };
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
        if (object.title !== undefined && object.title !== null) {
            message.title = object.title;
        }
        else {
            message.title = "";
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = object.description;
        }
        else {
            message.description = "";
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
        return message;
    },
};
const baseMsgUpdateIssueResponse = {};
export const MsgUpdateIssueResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpdateIssueResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = { ...baseMsgUpdateIssueResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgUpdateIssueResponse };
        return message;
    },
};
const baseMsgChangeIssueState = { creator: "", id: 0, closedBy: 0 };
export const MsgChangeIssueState = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== 0) {
            writer.uint32(16).uint64(message.id);
        }
        if (message.closedBy !== 0) {
            writer.uint32(24).uint64(message.closedBy);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgChangeIssueState };
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
                    message.closedBy = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgChangeIssueState };
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
        if (object.closedBy !== undefined && object.closedBy !== null) {
            message.closedBy = Number(object.closedBy);
        }
        else {
            message.closedBy = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        message.closedBy !== undefined && (obj.closedBy = message.closedBy);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgChangeIssueState };
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
        if (object.closedBy !== undefined && object.closedBy !== null) {
            message.closedBy = object.closedBy;
        }
        else {
            message.closedBy = 0;
        }
        return message;
    },
};
const baseMsgChangeIssueStateResponse = { state: "" };
export const MsgChangeIssueStateResponse = {
    encode(message, writer = Writer.create()) {
        if (message.state !== "") {
            writer.uint32(10).string(message.state);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgChangeIssueStateResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.state = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = {
            ...baseMsgChangeIssueStateResponse,
        };
        if (object.state !== undefined && object.state !== null) {
            message.state = String(object.state);
        }
        else {
            message.state = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.state !== undefined && (obj.state = message.state);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgChangeIssueStateResponse,
        };
        if (object.state !== undefined && object.state !== null) {
            message.state = object.state;
        }
        else {
            message.state = "";
        }
        return message;
    },
};
const baseMsgDeleteIssue = { creator: "", id: 0 };
export const MsgDeleteIssue = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== 0) {
            writer.uint32(16).uint64(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgDeleteIssue };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.id = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgDeleteIssue };
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
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgDeleteIssue };
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
        return message;
    },
};
const baseMsgDeleteIssueResponse = {};
export const MsgDeleteIssueResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgDeleteIssueResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = { ...baseMsgDeleteIssueResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgDeleteIssueResponse };
        return message;
    },
};
const baseMsgCreateRepository = {
    creator: "",
    name: "",
    owner: "",
    description: "",
};
export const MsgCreateRepository = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.name !== "") {
            writer.uint32(18).string(message.name);
        }
        if (message.owner !== "") {
            writer.uint32(26).string(message.owner);
        }
        if (message.description !== "") {
            writer.uint32(34).string(message.description);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreateRepository };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.owner = reader.string();
                    break;
                case 4:
                    message.description = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgCreateRepository };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = "";
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = String(object.owner);
        }
        else {
            message.owner = "";
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = String(object.description);
        }
        else {
            message.description = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.name !== undefined && (obj.name = message.name);
        message.owner !== undefined && (obj.owner = message.owner);
        message.description !== undefined &&
            (obj.description = message.description);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgCreateRepository };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = "";
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = object.owner;
        }
        else {
            message.owner = "";
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = object.description;
        }
        else {
            message.description = "";
        }
        return message;
    },
};
const baseMsgCreateRepositoryResponse = { id: 0 };
export const MsgCreateRepositoryResponse = {
    encode(message, writer = Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgCreateRepositoryResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = {
            ...baseMsgCreateRepositoryResponse,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = Number(object.id);
        }
        else {
            message.id = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgCreateRepositoryResponse,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = 0;
        }
        return message;
    },
};
const baseMsgCreateBranch = {
    creator: "",
    id: 0,
    name: "",
    commitSHA: "",
};
export const MsgCreateBranch = {
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
        if (message.commitSHA !== "") {
            writer.uint32(34).string(message.commitSHA);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreateBranch };
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
                    message.commitSHA = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgCreateBranch };
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
        if (object.commitSHA !== undefined && object.commitSHA !== null) {
            message.commitSHA = String(object.commitSHA);
        }
        else {
            message.commitSHA = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        message.name !== undefined && (obj.name = message.name);
        message.commitSHA !== undefined && (obj.commitSHA = message.commitSHA);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgCreateBranch };
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
        if (object.commitSHA !== undefined && object.commitSHA !== null) {
            message.commitSHA = object.commitSHA;
        }
        else {
            message.commitSHA = "";
        }
        return message;
    },
};
const baseMsgCreateBranchResponse = {};
export const MsgCreateBranchResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgCreateBranchResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = {
            ...baseMsgCreateBranchResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgCreateBranchResponse,
        };
        return message;
    },
};
const baseMsgSetDefaultBranch = { creator: "", id: 0, name: "" };
export const MsgSetDefaultBranch = {
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
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgSetDefaultBranch };
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
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgSetDefaultBranch };
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
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        message.name !== undefined && (obj.name = message.name);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgSetDefaultBranch };
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
        return message;
    },
};
const baseMsgSetDefaultBranchResponse = {};
export const MsgSetDefaultBranchResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgSetDefaultBranchResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = {
            ...baseMsgSetDefaultBranchResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgSetDefaultBranchResponse,
        };
        return message;
    },
};
const baseMsgUpdateRepository = {
    creator: "",
    id: 0,
    name: "",
    owner: "",
    description: "",
    labels: "",
    license: "",
    defaultBranch: "",
};
export const MsgUpdateRepository = {
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
        if (message.owner !== "") {
            writer.uint32(34).string(message.owner);
        }
        if (message.description !== "") {
            writer.uint32(42).string(message.description);
        }
        if (message.labels !== "") {
            writer.uint32(50).string(message.labels);
        }
        if (message.license !== "") {
            writer.uint32(58).string(message.license);
        }
        if (message.defaultBranch !== "") {
            writer.uint32(66).string(message.defaultBranch);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpdateRepository };
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
                    message.owner = reader.string();
                    break;
                case 5:
                    message.description = reader.string();
                    break;
                case 6:
                    message.labels = reader.string();
                    break;
                case 7:
                    message.license = reader.string();
                    break;
                case 8:
                    message.defaultBranch = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgUpdateRepository };
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
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = String(object.owner);
        }
        else {
            message.owner = "";
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = String(object.description);
        }
        else {
            message.description = "";
        }
        if (object.labels !== undefined && object.labels !== null) {
            message.labels = String(object.labels);
        }
        else {
            message.labels = "";
        }
        if (object.license !== undefined && object.license !== null) {
            message.license = String(object.license);
        }
        else {
            message.license = "";
        }
        if (object.defaultBranch !== undefined && object.defaultBranch !== null) {
            message.defaultBranch = String(object.defaultBranch);
        }
        else {
            message.defaultBranch = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        message.name !== undefined && (obj.name = message.name);
        message.owner !== undefined && (obj.owner = message.owner);
        message.description !== undefined &&
            (obj.description = message.description);
        message.labels !== undefined && (obj.labels = message.labels);
        message.license !== undefined && (obj.license = message.license);
        message.defaultBranch !== undefined &&
            (obj.defaultBranch = message.defaultBranch);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgUpdateRepository };
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
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = object.owner;
        }
        else {
            message.owner = "";
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = object.description;
        }
        else {
            message.description = "";
        }
        if (object.labels !== undefined && object.labels !== null) {
            message.labels = object.labels;
        }
        else {
            message.labels = "";
        }
        if (object.license !== undefined && object.license !== null) {
            message.license = object.license;
        }
        else {
            message.license = "";
        }
        if (object.defaultBranch !== undefined && object.defaultBranch !== null) {
            message.defaultBranch = object.defaultBranch;
        }
        else {
            message.defaultBranch = "";
        }
        return message;
    },
};
const baseMsgUpdateRepositoryResponse = {};
export const MsgUpdateRepositoryResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgUpdateRepositoryResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = {
            ...baseMsgUpdateRepositoryResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgUpdateRepositoryResponse,
        };
        return message;
    },
};
const baseMsgDeleteRepository = { creator: "", id: 0 };
export const MsgDeleteRepository = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== 0) {
            writer.uint32(16).uint64(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgDeleteRepository };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.id = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgDeleteRepository };
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
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgDeleteRepository };
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
        return message;
    },
};
const baseMsgDeleteRepositoryResponse = {};
export const MsgDeleteRepositoryResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgDeleteRepositoryResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = {
            ...baseMsgDeleteRepositoryResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgDeleteRepositoryResponse,
        };
        return message;
    },
};
const baseMsgCreateUser = {
    creator: "",
    username: "",
    usernameGithub: "",
    avatarUrl: "",
    followers: "",
    following: "",
    repositories: "",
    repositoriesArchived: "",
    organizations: "",
    starredRepos: "",
    subscriptions: "",
    email: "",
    bio: "",
    createdAt: "",
    updatedAt: "",
    extensions: "",
};
export const MsgCreateUser = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.username !== "") {
            writer.uint32(18).string(message.username);
        }
        if (message.usernameGithub !== "") {
            writer.uint32(26).string(message.usernameGithub);
        }
        if (message.avatarUrl !== "") {
            writer.uint32(34).string(message.avatarUrl);
        }
        if (message.followers !== "") {
            writer.uint32(42).string(message.followers);
        }
        if (message.following !== "") {
            writer.uint32(50).string(message.following);
        }
        if (message.repositories !== "") {
            writer.uint32(58).string(message.repositories);
        }
        if (message.repositoriesArchived !== "") {
            writer.uint32(66).string(message.repositoriesArchived);
        }
        if (message.organizations !== "") {
            writer.uint32(74).string(message.organizations);
        }
        if (message.starredRepos !== "") {
            writer.uint32(82).string(message.starredRepos);
        }
        if (message.subscriptions !== "") {
            writer.uint32(90).string(message.subscriptions);
        }
        if (message.email !== "") {
            writer.uint32(98).string(message.email);
        }
        if (message.bio !== "") {
            writer.uint32(106).string(message.bio);
        }
        if (message.createdAt !== "") {
            writer.uint32(114).string(message.createdAt);
        }
        if (message.updatedAt !== "") {
            writer.uint32(122).string(message.updatedAt);
        }
        if (message.extensions !== "") {
            writer.uint32(130).string(message.extensions);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreateUser };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.username = reader.string();
                    break;
                case 3:
                    message.usernameGithub = reader.string();
                    break;
                case 4:
                    message.avatarUrl = reader.string();
                    break;
                case 5:
                    message.followers = reader.string();
                    break;
                case 6:
                    message.following = reader.string();
                    break;
                case 7:
                    message.repositories = reader.string();
                    break;
                case 8:
                    message.repositoriesArchived = reader.string();
                    break;
                case 9:
                    message.organizations = reader.string();
                    break;
                case 10:
                    message.starredRepos = reader.string();
                    break;
                case 11:
                    message.subscriptions = reader.string();
                    break;
                case 12:
                    message.email = reader.string();
                    break;
                case 13:
                    message.bio = reader.string();
                    break;
                case 14:
                    message.createdAt = reader.string();
                    break;
                case 15:
                    message.updatedAt = reader.string();
                    break;
                case 16:
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
        const message = { ...baseMsgCreateUser };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.username !== undefined && object.username !== null) {
            message.username = String(object.username);
        }
        else {
            message.username = "";
        }
        if (object.usernameGithub !== undefined && object.usernameGithub !== null) {
            message.usernameGithub = String(object.usernameGithub);
        }
        else {
            message.usernameGithub = "";
        }
        if (object.avatarUrl !== undefined && object.avatarUrl !== null) {
            message.avatarUrl = String(object.avatarUrl);
        }
        else {
            message.avatarUrl = "";
        }
        if (object.followers !== undefined && object.followers !== null) {
            message.followers = String(object.followers);
        }
        else {
            message.followers = "";
        }
        if (object.following !== undefined && object.following !== null) {
            message.following = String(object.following);
        }
        else {
            message.following = "";
        }
        if (object.repositories !== undefined && object.repositories !== null) {
            message.repositories = String(object.repositories);
        }
        else {
            message.repositories = "";
        }
        if (object.repositoriesArchived !== undefined &&
            object.repositoriesArchived !== null) {
            message.repositoriesArchived = String(object.repositoriesArchived);
        }
        else {
            message.repositoriesArchived = "";
        }
        if (object.organizations !== undefined && object.organizations !== null) {
            message.organizations = String(object.organizations);
        }
        else {
            message.organizations = "";
        }
        if (object.starredRepos !== undefined && object.starredRepos !== null) {
            message.starredRepos = String(object.starredRepos);
        }
        else {
            message.starredRepos = "";
        }
        if (object.subscriptions !== undefined && object.subscriptions !== null) {
            message.subscriptions = String(object.subscriptions);
        }
        else {
            message.subscriptions = "";
        }
        if (object.email !== undefined && object.email !== null) {
            message.email = String(object.email);
        }
        else {
            message.email = "";
        }
        if (object.bio !== undefined && object.bio !== null) {
            message.bio = String(object.bio);
        }
        else {
            message.bio = "";
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
        message.username !== undefined && (obj.username = message.username);
        message.usernameGithub !== undefined &&
            (obj.usernameGithub = message.usernameGithub);
        message.avatarUrl !== undefined && (obj.avatarUrl = message.avatarUrl);
        message.followers !== undefined && (obj.followers = message.followers);
        message.following !== undefined && (obj.following = message.following);
        message.repositories !== undefined &&
            (obj.repositories = message.repositories);
        message.repositoriesArchived !== undefined &&
            (obj.repositoriesArchived = message.repositoriesArchived);
        message.organizations !== undefined &&
            (obj.organizations = message.organizations);
        message.starredRepos !== undefined &&
            (obj.starredRepos = message.starredRepos);
        message.subscriptions !== undefined &&
            (obj.subscriptions = message.subscriptions);
        message.email !== undefined && (obj.email = message.email);
        message.bio !== undefined && (obj.bio = message.bio);
        message.createdAt !== undefined && (obj.createdAt = message.createdAt);
        message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt);
        message.extensions !== undefined && (obj.extensions = message.extensions);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgCreateUser };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.username !== undefined && object.username !== null) {
            message.username = object.username;
        }
        else {
            message.username = "";
        }
        if (object.usernameGithub !== undefined && object.usernameGithub !== null) {
            message.usernameGithub = object.usernameGithub;
        }
        else {
            message.usernameGithub = "";
        }
        if (object.avatarUrl !== undefined && object.avatarUrl !== null) {
            message.avatarUrl = object.avatarUrl;
        }
        else {
            message.avatarUrl = "";
        }
        if (object.followers !== undefined && object.followers !== null) {
            message.followers = object.followers;
        }
        else {
            message.followers = "";
        }
        if (object.following !== undefined && object.following !== null) {
            message.following = object.following;
        }
        else {
            message.following = "";
        }
        if (object.repositories !== undefined && object.repositories !== null) {
            message.repositories = object.repositories;
        }
        else {
            message.repositories = "";
        }
        if (object.repositoriesArchived !== undefined &&
            object.repositoriesArchived !== null) {
            message.repositoriesArchived = object.repositoriesArchived;
        }
        else {
            message.repositoriesArchived = "";
        }
        if (object.organizations !== undefined && object.organizations !== null) {
            message.organizations = object.organizations;
        }
        else {
            message.organizations = "";
        }
        if (object.starredRepos !== undefined && object.starredRepos !== null) {
            message.starredRepos = object.starredRepos;
        }
        else {
            message.starredRepos = "";
        }
        if (object.subscriptions !== undefined && object.subscriptions !== null) {
            message.subscriptions = object.subscriptions;
        }
        else {
            message.subscriptions = "";
        }
        if (object.email !== undefined && object.email !== null) {
            message.email = object.email;
        }
        else {
            message.email = "";
        }
        if (object.bio !== undefined && object.bio !== null) {
            message.bio = object.bio;
        }
        else {
            message.bio = "";
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
        if (object.extensions !== undefined && object.extensions !== null) {
            message.extensions = object.extensions;
        }
        else {
            message.extensions = "";
        }
        return message;
    },
};
const baseMsgCreateUserResponse = { id: "" };
export const MsgCreateUserResponse = {
    encode(message, writer = Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreateUserResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgCreateUserResponse };
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgCreateUserResponse };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = "";
        }
        return message;
    },
};
const baseMsgUpdateUser = {
    creator: "",
    id: "",
    username: "",
    usernameGithub: "",
    avatarUrl: "",
    followers: "",
    following: "",
    repositories: "",
    repositoriesArchived: "",
    organizations: "",
    starredRepos: "",
    subscriptions: "",
    email: "",
    bio: "",
    createdAt: "",
    updatedAt: "",
    extensions: "",
};
export const MsgUpdateUser = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== "") {
            writer.uint32(18).string(message.id);
        }
        if (message.username !== "") {
            writer.uint32(26).string(message.username);
        }
        if (message.usernameGithub !== "") {
            writer.uint32(34).string(message.usernameGithub);
        }
        if (message.avatarUrl !== "") {
            writer.uint32(42).string(message.avatarUrl);
        }
        if (message.followers !== "") {
            writer.uint32(50).string(message.followers);
        }
        if (message.following !== "") {
            writer.uint32(58).string(message.following);
        }
        if (message.repositories !== "") {
            writer.uint32(66).string(message.repositories);
        }
        if (message.repositoriesArchived !== "") {
            writer.uint32(74).string(message.repositoriesArchived);
        }
        if (message.organizations !== "") {
            writer.uint32(82).string(message.organizations);
        }
        if (message.starredRepos !== "") {
            writer.uint32(90).string(message.starredRepos);
        }
        if (message.subscriptions !== "") {
            writer.uint32(98).string(message.subscriptions);
        }
        if (message.email !== "") {
            writer.uint32(106).string(message.email);
        }
        if (message.bio !== "") {
            writer.uint32(114).string(message.bio);
        }
        if (message.createdAt !== "") {
            writer.uint32(122).string(message.createdAt);
        }
        if (message.updatedAt !== "") {
            writer.uint32(130).string(message.updatedAt);
        }
        if (message.extensions !== "") {
            writer.uint32(138).string(message.extensions);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpdateUser };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.id = reader.string();
                    break;
                case 3:
                    message.username = reader.string();
                    break;
                case 4:
                    message.usernameGithub = reader.string();
                    break;
                case 5:
                    message.avatarUrl = reader.string();
                    break;
                case 6:
                    message.followers = reader.string();
                    break;
                case 7:
                    message.following = reader.string();
                    break;
                case 8:
                    message.repositories = reader.string();
                    break;
                case 9:
                    message.repositoriesArchived = reader.string();
                    break;
                case 10:
                    message.organizations = reader.string();
                    break;
                case 11:
                    message.starredRepos = reader.string();
                    break;
                case 12:
                    message.subscriptions = reader.string();
                    break;
                case 13:
                    message.email = reader.string();
                    break;
                case 14:
                    message.bio = reader.string();
                    break;
                case 15:
                    message.createdAt = reader.string();
                    break;
                case 16:
                    message.updatedAt = reader.string();
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
        const message = { ...baseMsgUpdateUser };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = "";
        }
        if (object.username !== undefined && object.username !== null) {
            message.username = String(object.username);
        }
        else {
            message.username = "";
        }
        if (object.usernameGithub !== undefined && object.usernameGithub !== null) {
            message.usernameGithub = String(object.usernameGithub);
        }
        else {
            message.usernameGithub = "";
        }
        if (object.avatarUrl !== undefined && object.avatarUrl !== null) {
            message.avatarUrl = String(object.avatarUrl);
        }
        else {
            message.avatarUrl = "";
        }
        if (object.followers !== undefined && object.followers !== null) {
            message.followers = String(object.followers);
        }
        else {
            message.followers = "";
        }
        if (object.following !== undefined && object.following !== null) {
            message.following = String(object.following);
        }
        else {
            message.following = "";
        }
        if (object.repositories !== undefined && object.repositories !== null) {
            message.repositories = String(object.repositories);
        }
        else {
            message.repositories = "";
        }
        if (object.repositoriesArchived !== undefined &&
            object.repositoriesArchived !== null) {
            message.repositoriesArchived = String(object.repositoriesArchived);
        }
        else {
            message.repositoriesArchived = "";
        }
        if (object.organizations !== undefined && object.organizations !== null) {
            message.organizations = String(object.organizations);
        }
        else {
            message.organizations = "";
        }
        if (object.starredRepos !== undefined && object.starredRepos !== null) {
            message.starredRepos = String(object.starredRepos);
        }
        else {
            message.starredRepos = "";
        }
        if (object.subscriptions !== undefined && object.subscriptions !== null) {
            message.subscriptions = String(object.subscriptions);
        }
        else {
            message.subscriptions = "";
        }
        if (object.email !== undefined && object.email !== null) {
            message.email = String(object.email);
        }
        else {
            message.email = "";
        }
        if (object.bio !== undefined && object.bio !== null) {
            message.bio = String(object.bio);
        }
        else {
            message.bio = "";
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
        message.username !== undefined && (obj.username = message.username);
        message.usernameGithub !== undefined &&
            (obj.usernameGithub = message.usernameGithub);
        message.avatarUrl !== undefined && (obj.avatarUrl = message.avatarUrl);
        message.followers !== undefined && (obj.followers = message.followers);
        message.following !== undefined && (obj.following = message.following);
        message.repositories !== undefined &&
            (obj.repositories = message.repositories);
        message.repositoriesArchived !== undefined &&
            (obj.repositoriesArchived = message.repositoriesArchived);
        message.organizations !== undefined &&
            (obj.organizations = message.organizations);
        message.starredRepos !== undefined &&
            (obj.starredRepos = message.starredRepos);
        message.subscriptions !== undefined &&
            (obj.subscriptions = message.subscriptions);
        message.email !== undefined && (obj.email = message.email);
        message.bio !== undefined && (obj.bio = message.bio);
        message.createdAt !== undefined && (obj.createdAt = message.createdAt);
        message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt);
        message.extensions !== undefined && (obj.extensions = message.extensions);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgUpdateUser };
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
            message.id = "";
        }
        if (object.username !== undefined && object.username !== null) {
            message.username = object.username;
        }
        else {
            message.username = "";
        }
        if (object.usernameGithub !== undefined && object.usernameGithub !== null) {
            message.usernameGithub = object.usernameGithub;
        }
        else {
            message.usernameGithub = "";
        }
        if (object.avatarUrl !== undefined && object.avatarUrl !== null) {
            message.avatarUrl = object.avatarUrl;
        }
        else {
            message.avatarUrl = "";
        }
        if (object.followers !== undefined && object.followers !== null) {
            message.followers = object.followers;
        }
        else {
            message.followers = "";
        }
        if (object.following !== undefined && object.following !== null) {
            message.following = object.following;
        }
        else {
            message.following = "";
        }
        if (object.repositories !== undefined && object.repositories !== null) {
            message.repositories = object.repositories;
        }
        else {
            message.repositories = "";
        }
        if (object.repositoriesArchived !== undefined &&
            object.repositoriesArchived !== null) {
            message.repositoriesArchived = object.repositoriesArchived;
        }
        else {
            message.repositoriesArchived = "";
        }
        if (object.organizations !== undefined && object.organizations !== null) {
            message.organizations = object.organizations;
        }
        else {
            message.organizations = "";
        }
        if (object.starredRepos !== undefined && object.starredRepos !== null) {
            message.starredRepos = object.starredRepos;
        }
        else {
            message.starredRepos = "";
        }
        if (object.subscriptions !== undefined && object.subscriptions !== null) {
            message.subscriptions = object.subscriptions;
        }
        else {
            message.subscriptions = "";
        }
        if (object.email !== undefined && object.email !== null) {
            message.email = object.email;
        }
        else {
            message.email = "";
        }
        if (object.bio !== undefined && object.bio !== null) {
            message.bio = object.bio;
        }
        else {
            message.bio = "";
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
        if (object.extensions !== undefined && object.extensions !== null) {
            message.extensions = object.extensions;
        }
        else {
            message.extensions = "";
        }
        return message;
    },
};
const baseMsgUpdateUserResponse = {};
export const MsgUpdateUserResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpdateUserResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = { ...baseMsgUpdateUserResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgUpdateUserResponse };
        return message;
    },
};
const baseMsgDeleteUser = { creator: "", id: "" };
export const MsgDeleteUser = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== "") {
            writer.uint32(18).string(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgDeleteUser };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.id = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgDeleteUser };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgDeleteUser };
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
            message.id = "";
        }
        return message;
    },
};
const baseMsgDeleteUserResponse = {};
export const MsgDeleteUserResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgDeleteUserResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = { ...baseMsgDeleteUserResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgDeleteUserResponse };
        return message;
    },
};
const baseMsgSetWhois = { creator: "", name: "", address: "" };
export const MsgSetWhois = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.name !== "") {
            writer.uint32(18).string(message.name);
        }
        if (message.address !== "") {
            writer.uint32(26).string(message.address);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgSetWhois };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.name = reader.string();
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
        const message = { ...baseMsgSetWhois };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
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
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.name !== undefined && (obj.name = message.name);
        message.address !== undefined && (obj.address = message.address);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgSetWhois };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
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
        return message;
    },
};
const baseMsgSetWhoisResponse = {};
export const MsgSetWhoisResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgSetWhoisResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = { ...baseMsgSetWhoisResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgSetWhoisResponse };
        return message;
    },
};
const baseMsgUpdateWhois = { creator: "", name: "", address: "" };
export const MsgUpdateWhois = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.name !== "") {
            writer.uint32(18).string(message.name);
        }
        if (message.address !== "") {
            writer.uint32(26).string(message.address);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpdateWhois };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.name = reader.string();
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
        const message = { ...baseMsgUpdateWhois };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
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
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.name !== undefined && (obj.name = message.name);
        message.address !== undefined && (obj.address = message.address);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgUpdateWhois };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
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
        return message;
    },
};
const baseMsgUpdateWhoisResponse = {};
export const MsgUpdateWhoisResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpdateWhoisResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = { ...baseMsgUpdateWhoisResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgUpdateWhoisResponse };
        return message;
    },
};
const baseMsgDeleteWhois = { creator: "", name: "" };
export const MsgDeleteWhois = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.name !== "") {
            writer.uint32(18).string(message.name);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgDeleteWhois };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgDeleteWhois };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.name !== undefined && (obj.name = message.name);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgDeleteWhois };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = "";
        }
        return message;
    },
};
const baseMsgDeleteWhoisResponse = {};
export const MsgDeleteWhoisResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgDeleteWhoisResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = { ...baseMsgDeleteWhoisResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgDeleteWhoisResponse };
        return message;
    },
};
export class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    CreateComment(request) {
        const data = MsgCreateComment.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "CreateComment", data);
        return promise.then((data) => MsgCreateCommentResponse.decode(new Reader(data)));
    }
    UpdateComment(request) {
        const data = MsgUpdateComment.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateComment", data);
        return promise.then((data) => MsgUpdateCommentResponse.decode(new Reader(data)));
    }
    DeleteComment(request) {
        const data = MsgDeleteComment.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "DeleteComment", data);
        return promise.then((data) => MsgDeleteCommentResponse.decode(new Reader(data)));
    }
    CreateIssue(request) {
        const data = MsgCreateIssue.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "CreateIssue", data);
        return promise.then((data) => MsgCreateIssueResponse.decode(new Reader(data)));
    }
    UpdateIssue(request) {
        const data = MsgUpdateIssue.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateIssue", data);
        return promise.then((data) => MsgUpdateIssueResponse.decode(new Reader(data)));
    }
    ChangeIssueState(request) {
        const data = MsgChangeIssueState.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "ChangeIssueState", data);
        return promise.then((data) => MsgChangeIssueStateResponse.decode(new Reader(data)));
    }
    DeleteIssue(request) {
        const data = MsgDeleteIssue.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "DeleteIssue", data);
        return promise.then((data) => MsgDeleteIssueResponse.decode(new Reader(data)));
    }
    CreateRepository(request) {
        const data = MsgCreateRepository.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "CreateRepository", data);
        return promise.then((data) => MsgCreateRepositoryResponse.decode(new Reader(data)));
    }
    CreateBranch(request) {
        const data = MsgCreateBranch.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "CreateBranch", data);
        return promise.then((data) => MsgCreateBranchResponse.decode(new Reader(data)));
    }
    SetDefaultBranch(request) {
        const data = MsgSetDefaultBranch.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "SetDefaultBranch", data);
        return promise.then((data) => MsgSetDefaultBranchResponse.decode(new Reader(data)));
    }
    UpdateRepository(request) {
        const data = MsgUpdateRepository.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateRepository", data);
        return promise.then((data) => MsgUpdateRepositoryResponse.decode(new Reader(data)));
    }
    DeleteRepository(request) {
        const data = MsgDeleteRepository.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "DeleteRepository", data);
        return promise.then((data) => MsgDeleteRepositoryResponse.decode(new Reader(data)));
    }
    CreateUser(request) {
        const data = MsgCreateUser.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "CreateUser", data);
        return promise.then((data) => MsgCreateUserResponse.decode(new Reader(data)));
    }
    UpdateUser(request) {
        const data = MsgUpdateUser.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateUser", data);
        return promise.then((data) => MsgUpdateUserResponse.decode(new Reader(data)));
    }
    DeleteUser(request) {
        const data = MsgDeleteUser.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "DeleteUser", data);
        return promise.then((data) => MsgDeleteUserResponse.decode(new Reader(data)));
    }
    SetWhois(request) {
        const data = MsgSetWhois.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "SetWhois", data);
        return promise.then((data) => MsgSetWhoisResponse.decode(new Reader(data)));
    }
    UpdateWhois(request) {
        const data = MsgUpdateWhois.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateWhois", data);
        return promise.then((data) => MsgUpdateWhoisResponse.decode(new Reader(data)));
    }
    DeleteWhois(request) {
        const data = MsgDeleteWhois.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "DeleteWhois", data);
        return promise.then((data) => MsgDeleteWhoisResponse.decode(new Reader(data)));
    }
}
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
