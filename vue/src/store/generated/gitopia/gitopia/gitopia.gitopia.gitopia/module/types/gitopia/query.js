/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";
import { Comment } from "../gitopia/comment";
import { PageRequest, PageResponse, } from "../cosmos/base/query/v1beta1/pagination";
import { Issue } from "../gitopia/issue";
import { Repository } from "../gitopia/repository";
import { User } from "../gitopia/user";
import { Whois } from "../gitopia/whois";
export const protobufPackage = "gitopia.gitopia.gitopia";
const baseQueryGetCommentRequest = { id: 0 };
export const QueryGetCommentRequest = {
    encode(message, writer = Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetCommentRequest };
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
        const message = { ...baseQueryGetCommentRequest };
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
        const message = { ...baseQueryGetCommentRequest };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = 0;
        }
        return message;
    },
};
const baseQueryGetCommentResponse = {};
export const QueryGetCommentResponse = {
    encode(message, writer = Writer.create()) {
        if (message.Comment !== undefined) {
            Comment.encode(message.Comment, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetCommentResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Comment = Comment.decode(reader, reader.uint32());
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
            ...baseQueryGetCommentResponse,
        };
        if (object.Comment !== undefined && object.Comment !== null) {
            message.Comment = Comment.fromJSON(object.Comment);
        }
        else {
            message.Comment = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.Comment !== undefined &&
            (obj.Comment = message.Comment
                ? Comment.toJSON(message.Comment)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetCommentResponse,
        };
        if (object.Comment !== undefined && object.Comment !== null) {
            message.Comment = Comment.fromPartial(object.Comment);
        }
        else {
            message.Comment = undefined;
        }
        return message;
    },
};
const baseQueryAllCommentRequest = {};
export const QueryAllCommentRequest = {
    encode(message, writer = Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllCommentRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pagination = PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryAllCommentRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageRequest.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllCommentRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryAllCommentResponse = {};
export const QueryAllCommentResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.Comment) {
            Comment.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryAllCommentResponse,
        };
        message.Comment = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Comment.push(Comment.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = PageResponse.decode(reader, reader.uint32());
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
            ...baseQueryAllCommentResponse,
        };
        message.Comment = [];
        if (object.Comment !== undefined && object.Comment !== null) {
            for (const e of object.Comment) {
                message.Comment.push(Comment.fromJSON(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.Comment) {
            obj.Comment = message.Comment.map((e) => e ? Comment.toJSON(e) : undefined);
        }
        else {
            obj.Comment = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageResponse.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryAllCommentResponse,
        };
        message.Comment = [];
        if (object.Comment !== undefined && object.Comment !== null) {
            for (const e of object.Comment) {
                message.Comment.push(Comment.fromPartial(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryGetIssueRequest = { id: 0 };
export const QueryGetIssueRequest = {
    encode(message, writer = Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetIssueRequest };
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
        const message = { ...baseQueryGetIssueRequest };
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
        const message = { ...baseQueryGetIssueRequest };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = 0;
        }
        return message;
    },
};
const baseQueryGetIssueResponse = {};
export const QueryGetIssueResponse = {
    encode(message, writer = Writer.create()) {
        if (message.Issue !== undefined) {
            Issue.encode(message.Issue, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetIssueResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Issue = Issue.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetIssueResponse };
        if (object.Issue !== undefined && object.Issue !== null) {
            message.Issue = Issue.fromJSON(object.Issue);
        }
        else {
            message.Issue = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.Issue !== undefined &&
            (obj.Issue = message.Issue ? Issue.toJSON(message.Issue) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetIssueResponse };
        if (object.Issue !== undefined && object.Issue !== null) {
            message.Issue = Issue.fromPartial(object.Issue);
        }
        else {
            message.Issue = undefined;
        }
        return message;
    },
};
const baseQueryAllIssueRequest = {};
export const QueryAllIssueRequest = {
    encode(message, writer = Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllIssueRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pagination = PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryAllIssueRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageRequest.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllIssueRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryAllIssueResponse = {};
export const QueryAllIssueResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.Issue) {
            Issue.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllIssueResponse };
        message.Issue = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Issue.push(Issue.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = PageResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryAllIssueResponse };
        message.Issue = [];
        if (object.Issue !== undefined && object.Issue !== null) {
            for (const e of object.Issue) {
                message.Issue.push(Issue.fromJSON(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.Issue) {
            obj.Issue = message.Issue.map((e) => (e ? Issue.toJSON(e) : undefined));
        }
        else {
            obj.Issue = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageResponse.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllIssueResponse };
        message.Issue = [];
        if (object.Issue !== undefined && object.Issue !== null) {
            for (const e of object.Issue) {
                message.Issue.push(Issue.fromPartial(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryGetRepositoryRequest = { id: 0 };
export const QueryGetRepositoryRequest = {
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
            ...baseQueryGetRepositoryRequest,
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
            ...baseQueryGetRepositoryRequest,
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
            ...baseQueryGetRepositoryRequest,
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
const baseQueryGetRepositoryResponse = {};
export const QueryGetRepositoryResponse = {
    encode(message, writer = Writer.create()) {
        if (message.Repository !== undefined) {
            Repository.encode(message.Repository, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetRepositoryResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Repository = Repository.decode(reader, reader.uint32());
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
            ...baseQueryGetRepositoryResponse,
        };
        if (object.Repository !== undefined && object.Repository !== null) {
            message.Repository = Repository.fromJSON(object.Repository);
        }
        else {
            message.Repository = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.Repository !== undefined &&
            (obj.Repository = message.Repository
                ? Repository.toJSON(message.Repository)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetRepositoryResponse,
        };
        if (object.Repository !== undefined && object.Repository !== null) {
            message.Repository = Repository.fromPartial(object.Repository);
        }
        else {
            message.Repository = undefined;
        }
        return message;
    },
};
const baseQueryGetAllBranchRequest = { id: 0 };
export const QueryGetAllBranchRequest = {
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
            ...baseQueryGetAllBranchRequest,
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
            ...baseQueryGetAllBranchRequest,
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
            ...baseQueryGetAllBranchRequest,
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
const baseQueryGetAllBranchResponse = {};
export const QueryGetAllBranchResponse = {
    encode(message, writer = Writer.create()) {
        Object.entries(message.Branches).forEach(([key, value]) => {
            QueryGetAllBranchResponse_BranchesEntry.encode({ key: key, value }, writer.uint32(10).fork()).ldelim();
        });
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetAllBranchResponse,
        };
        message.Branches = {};
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    const entry1 = QueryGetAllBranchResponse_BranchesEntry.decode(reader, reader.uint32());
                    if (entry1.value !== undefined) {
                        message.Branches[entry1.key] = entry1.value;
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
        const message = {
            ...baseQueryGetAllBranchResponse,
        };
        message.Branches = {};
        if (object.Branches !== undefined && object.Branches !== null) {
            Object.entries(object.Branches).forEach(([key, value]) => {
                message.Branches[key] = String(value);
            });
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        obj.Branches = {};
        if (message.Branches) {
            Object.entries(message.Branches).forEach(([k, v]) => {
                obj.Branches[k] = v;
            });
        }
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetAllBranchResponse,
        };
        message.Branches = {};
        if (object.Branches !== undefined && object.Branches !== null) {
            Object.entries(object.Branches).forEach(([key, value]) => {
                if (value !== undefined) {
                    message.Branches[key] = String(value);
                }
            });
        }
        return message;
    },
};
const baseQueryGetAllBranchResponse_BranchesEntry = {
    key: "",
    value: "",
};
export const QueryGetAllBranchResponse_BranchesEntry = {
    encode(message, writer = Writer.create()) {
        if (message.key !== "") {
            writer.uint32(10).string(message.key);
        }
        if (message.value !== "") {
            writer.uint32(18).string(message.value);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetAllBranchResponse_BranchesEntry,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.key = reader.string();
                    break;
                case 2:
                    message.value = reader.string();
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
            ...baseQueryGetAllBranchResponse_BranchesEntry,
        };
        if (object.key !== undefined && object.key !== null) {
            message.key = String(object.key);
        }
        else {
            message.key = "";
        }
        if (object.value !== undefined && object.value !== null) {
            message.value = String(object.value);
        }
        else {
            message.value = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.key !== undefined && (obj.key = message.key);
        message.value !== undefined && (obj.value = message.value);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetAllBranchResponse_BranchesEntry,
        };
        if (object.key !== undefined && object.key !== null) {
            message.key = object.key;
        }
        else {
            message.key = "";
        }
        if (object.value !== undefined && object.value !== null) {
            message.value = object.value;
        }
        else {
            message.value = "";
        }
        return message;
    },
};
const baseQueryAllRepositoryRequest = {};
export const QueryAllRepositoryRequest = {
    encode(message, writer = Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryAllRepositoryRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pagination = PageRequest.decode(reader, reader.uint32());
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
            ...baseQueryAllRepositoryRequest,
        };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageRequest.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryAllRepositoryRequest,
        };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryAllRepositoryResponse = {};
export const QueryAllRepositoryResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.Repository) {
            Repository.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryAllRepositoryResponse,
        };
        message.Repository = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Repository.push(Repository.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = PageResponse.decode(reader, reader.uint32());
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
            ...baseQueryAllRepositoryResponse,
        };
        message.Repository = [];
        if (object.Repository !== undefined && object.Repository !== null) {
            for (const e of object.Repository) {
                message.Repository.push(Repository.fromJSON(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.Repository) {
            obj.Repository = message.Repository.map((e) => e ? Repository.toJSON(e) : undefined);
        }
        else {
            obj.Repository = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageResponse.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryAllRepositoryResponse,
        };
        message.Repository = [];
        if (object.Repository !== undefined && object.Repository !== null) {
            for (const e of object.Repository) {
                message.Repository.push(Repository.fromPartial(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryGetUserRequest = { id: "" };
export const QueryGetUserRequest = {
    encode(message, writer = Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetUserRequest };
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
        const message = { ...baseQueryGetUserRequest };
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
        const message = { ...baseQueryGetUserRequest };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = "";
        }
        return message;
    },
};
const baseQueryGetUserResponse = {};
export const QueryGetUserResponse = {
    encode(message, writer = Writer.create()) {
        if (message.User !== undefined) {
            User.encode(message.User, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetUserResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.User = User.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetUserResponse };
        if (object.User !== undefined && object.User !== null) {
            message.User = User.fromJSON(object.User);
        }
        else {
            message.User = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.User !== undefined &&
            (obj.User = message.User ? User.toJSON(message.User) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetUserResponse };
        if (object.User !== undefined && object.User !== null) {
            message.User = User.fromPartial(object.User);
        }
        else {
            message.User = undefined;
        }
        return message;
    },
};
const baseQueryAllUserRequest = {};
export const QueryAllUserRequest = {
    encode(message, writer = Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllUserRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pagination = PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryAllUserRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageRequest.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllUserRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryAllUserResponse = {};
export const QueryAllUserResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.User) {
            User.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllUserResponse };
        message.User = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.User.push(User.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = PageResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryAllUserResponse };
        message.User = [];
        if (object.User !== undefined && object.User !== null) {
            for (const e of object.User) {
                message.User.push(User.fromJSON(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.User) {
            obj.User = message.User.map((e) => (e ? User.toJSON(e) : undefined));
        }
        else {
            obj.User = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageResponse.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllUserResponse };
        message.User = [];
        if (object.User !== undefined && object.User !== null) {
            for (const e of object.User) {
                message.User.push(User.fromPartial(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryAllUserRepositoryRequest = { id: "" };
export const QueryAllUserRepositoryRequest = {
    encode(message, writer = Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryAllUserRepositoryRequest,
        };
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
        const message = {
            ...baseQueryAllUserRepositoryRequest,
        };
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
        const message = {
            ...baseQueryAllUserRepositoryRequest,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = "";
        }
        return message;
    },
};
const baseQueryAllUserRepositoryResponse = {};
export const QueryAllUserRepositoryResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.Repository) {
            Repository.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryAllUserRepositoryResponse,
        };
        message.Repository = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Repository.push(Repository.decode(reader, reader.uint32()));
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
            ...baseQueryAllUserRepositoryResponse,
        };
        message.Repository = [];
        if (object.Repository !== undefined && object.Repository !== null) {
            for (const e of object.Repository) {
                message.Repository.push(Repository.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.Repository) {
            obj.Repository = message.Repository.map((e) => e ? Repository.toJSON(e) : undefined);
        }
        else {
            obj.Repository = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryAllUserRepositoryResponse,
        };
        message.Repository = [];
        if (object.Repository !== undefined && object.Repository !== null) {
            for (const e of object.Repository) {
                message.Repository.push(Repository.fromPartial(e));
            }
        }
        return message;
    },
};
const baseQueryGetUserRepositoryRequest = {
    userId: "",
    repositoryName: "",
};
export const QueryGetUserRepositoryRequest = {
    encode(message, writer = Writer.create()) {
        if (message.userId !== "") {
            writer.uint32(10).string(message.userId);
        }
        if (message.repositoryName !== "") {
            writer.uint32(18).string(message.repositoryName);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetUserRepositoryRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.userId = reader.string();
                    break;
                case 2:
                    message.repositoryName = reader.string();
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
            ...baseQueryGetUserRepositoryRequest,
        };
        if (object.userId !== undefined && object.userId !== null) {
            message.userId = String(object.userId);
        }
        else {
            message.userId = "";
        }
        if (object.repositoryName !== undefined && object.repositoryName !== null) {
            message.repositoryName = String(object.repositoryName);
        }
        else {
            message.repositoryName = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.userId !== undefined && (obj.userId = message.userId);
        message.repositoryName !== undefined &&
            (obj.repositoryName = message.repositoryName);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetUserRepositoryRequest,
        };
        if (object.userId !== undefined && object.userId !== null) {
            message.userId = object.userId;
        }
        else {
            message.userId = "";
        }
        if (object.repositoryName !== undefined && object.repositoryName !== null) {
            message.repositoryName = object.repositoryName;
        }
        else {
            message.repositoryName = "";
        }
        return message;
    },
};
const baseQueryGetUserRepositoryResponse = {};
export const QueryGetUserRepositoryResponse = {
    encode(message, writer = Writer.create()) {
        if (message.Repository !== undefined) {
            Repository.encode(message.Repository, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetUserRepositoryResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Repository = Repository.decode(reader, reader.uint32());
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
            ...baseQueryGetUserRepositoryResponse,
        };
        if (object.Repository !== undefined && object.Repository !== null) {
            message.Repository = Repository.fromJSON(object.Repository);
        }
        else {
            message.Repository = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.Repository !== undefined &&
            (obj.Repository = message.Repository
                ? Repository.toJSON(message.Repository)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetUserRepositoryResponse,
        };
        if (object.Repository !== undefined && object.Repository !== null) {
            message.Repository = Repository.fromPartial(object.Repository);
        }
        else {
            message.Repository = undefined;
        }
        return message;
    },
};
const baseQueryGetWhoisRequest = { name: "" };
export const QueryGetWhoisRequest = {
    encode(message, writer = Writer.create()) {
        if (message.name !== "") {
            writer.uint32(10).string(message.name);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetWhoisRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
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
        const message = { ...baseQueryGetWhoisRequest };
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
        message.name !== undefined && (obj.name = message.name);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetWhoisRequest };
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = "";
        }
        return message;
    },
};
const baseQueryGetWhoisResponse = {};
export const QueryGetWhoisResponse = {
    encode(message, writer = Writer.create()) {
        if (message.Whois !== undefined) {
            Whois.encode(message.Whois, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetWhoisResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Whois = Whois.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetWhoisResponse };
        if (object.Whois !== undefined && object.Whois !== null) {
            message.Whois = Whois.fromJSON(object.Whois);
        }
        else {
            message.Whois = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.Whois !== undefined &&
            (obj.Whois = message.Whois ? Whois.toJSON(message.Whois) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetWhoisResponse };
        if (object.Whois !== undefined && object.Whois !== null) {
            message.Whois = Whois.fromPartial(object.Whois);
        }
        else {
            message.Whois = undefined;
        }
        return message;
    },
};
const baseQueryAllWhoisRequest = {};
export const QueryAllWhoisRequest = {
    encode(message, writer = Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllWhoisRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pagination = PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryAllWhoisRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageRequest.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllWhoisRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryAllWhoisResponse = {};
export const QueryAllWhoisResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.Whois) {
            Whois.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllWhoisResponse };
        message.Whois = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Whois.push(Whois.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = PageResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryAllWhoisResponse };
        message.Whois = [];
        if (object.Whois !== undefined && object.Whois !== null) {
            for (const e of object.Whois) {
                message.Whois.push(Whois.fromJSON(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.Whois) {
            obj.Whois = message.Whois.map((e) => (e ? Whois.toJSON(e) : undefined));
        }
        else {
            obj.Whois = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageResponse.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllWhoisResponse };
        message.Whois = [];
        if (object.Whois !== undefined && object.Whois !== null) {
            for (const e of object.Whois) {
                message.Whois.push(Whois.fromPartial(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
export class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    Comment(request) {
        const data = QueryGetCommentRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "Comment", data);
        return promise.then((data) => QueryGetCommentResponse.decode(new Reader(data)));
    }
    CommentAll(request) {
        const data = QueryAllCommentRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "CommentAll", data);
        return promise.then((data) => QueryAllCommentResponse.decode(new Reader(data)));
    }
    Issue(request) {
        const data = QueryGetIssueRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "Issue", data);
        return promise.then((data) => QueryGetIssueResponse.decode(new Reader(data)));
    }
    IssueAll(request) {
        const data = QueryAllIssueRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "IssueAll", data);
        return promise.then((data) => QueryAllIssueResponse.decode(new Reader(data)));
    }
    Repository(request) {
        const data = QueryGetRepositoryRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "Repository", data);
        return promise.then((data) => QueryGetRepositoryResponse.decode(new Reader(data)));
    }
    RepositoryAll(request) {
        const data = QueryAllRepositoryRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "RepositoryAll", data);
        return promise.then((data) => QueryAllRepositoryResponse.decode(new Reader(data)));
    }
    BranchAll(request) {
        const data = QueryGetAllBranchRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "BranchAll", data);
        return promise.then((data) => QueryGetAllBranchResponse.decode(new Reader(data)));
    }
    User(request) {
        const data = QueryGetUserRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "User", data);
        return promise.then((data) => QueryGetUserResponse.decode(new Reader(data)));
    }
    UserAll(request) {
        const data = QueryAllUserRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "UserAll", data);
        return promise.then((data) => QueryAllUserResponse.decode(new Reader(data)));
    }
    UserRepositoryAll(request) {
        const data = QueryAllUserRepositoryRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "UserRepositoryAll", data);
        return promise.then((data) => QueryAllUserRepositoryResponse.decode(new Reader(data)));
    }
    UserRepository(request) {
        const data = QueryGetUserRepositoryRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "UserRepository", data);
        return promise.then((data) => QueryGetUserRepositoryResponse.decode(new Reader(data)));
    }
    Whois(request) {
        const data = QueryGetWhoisRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "Whois", data);
        return promise.then((data) => QueryGetWhoisResponse.decode(new Reader(data)));
    }
    WhoisAll(request) {
        const data = QueryAllWhoisRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "WhoisAll", data);
        return promise.then((data) => QueryAllWhoisResponse.decode(new Reader(data)));
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
