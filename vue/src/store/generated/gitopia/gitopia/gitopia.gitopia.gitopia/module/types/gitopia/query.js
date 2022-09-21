/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";
import { Task } from "../gitopia/task";
import { PageRequest, PageResponse, } from "../cosmos/base/query/v1beta1/pagination";
import { Branch } from "../gitopia/branch";
import { Tag } from "../gitopia/tag";
import { Member } from "../gitopia/member";
import { Release } from "../gitopia/release";
import { PullRequest } from "../gitopia/pullRequest";
import { Dao } from "../gitopia/dao";
import { Comment } from "../gitopia/comment";
import { Issue } from "../gitopia/issue";
import { Repository, RepositoryOwner } from "../gitopia/repository";
import { User } from "../gitopia/user";
import { Whois } from "../gitopia/whois";
export const protobufPackage = "gitopia.gitopia.gitopia";
const baseQueryCheckStorageProviderAuthorizationRequest = {
    userAddress: "",
    providerAddress: "",
};
export const QueryCheckStorageProviderAuthorizationRequest = {
    encode(message, writer = Writer.create()) {
        if (message.userAddress !== "") {
            writer.uint32(10).string(message.userAddress);
        }
        if (message.providerAddress !== "") {
            writer.uint32(18).string(message.providerAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryCheckStorageProviderAuthorizationRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.userAddress = reader.string();
                    break;
                case 2:
                    message.providerAddress = reader.string();
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
            ...baseQueryCheckStorageProviderAuthorizationRequest,
        };
        if (object.userAddress !== undefined && object.userAddress !== null) {
            message.userAddress = String(object.userAddress);
        }
        else {
            message.userAddress = "";
        }
        if (object.providerAddress !== undefined &&
            object.providerAddress !== null) {
            message.providerAddress = String(object.providerAddress);
        }
        else {
            message.providerAddress = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.userAddress !== undefined &&
            (obj.userAddress = message.userAddress);
        message.providerAddress !== undefined &&
            (obj.providerAddress = message.providerAddress);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryCheckStorageProviderAuthorizationRequest,
        };
        if (object.userAddress !== undefined && object.userAddress !== null) {
            message.userAddress = object.userAddress;
        }
        else {
            message.userAddress = "";
        }
        if (object.providerAddress !== undefined &&
            object.providerAddress !== null) {
            message.providerAddress = object.providerAddress;
        }
        else {
            message.providerAddress = "";
        }
        return message;
    },
};
const baseQueryCheckStorageProviderAuthorizationResponse = {
    haveAuthorization: false,
};
export const QueryCheckStorageProviderAuthorizationResponse = {
    encode(message, writer = Writer.create()) {
        if (message.haveAuthorization === true) {
            writer.uint32(8).bool(message.haveAuthorization);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryCheckStorageProviderAuthorizationResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.haveAuthorization = reader.bool();
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
            ...baseQueryCheckStorageProviderAuthorizationResponse,
        };
        if (object.haveAuthorization !== undefined &&
            object.haveAuthorization !== null) {
            message.haveAuthorization = Boolean(object.haveAuthorization);
        }
        else {
            message.haveAuthorization = false;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.haveAuthorization !== undefined &&
            (obj.haveAuthorization = message.haveAuthorization);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryCheckStorageProviderAuthorizationResponse,
        };
        if (object.haveAuthorization !== undefined &&
            object.haveAuthorization !== null) {
            message.haveAuthorization = object.haveAuthorization;
        }
        else {
            message.haveAuthorization = false;
        }
        return message;
    },
};
const baseQueryGetTaskRequest = { id: 0 };
export const QueryGetTaskRequest = {
    encode(message, writer = Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetTaskRequest };
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
        const message = { ...baseQueryGetTaskRequest };
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
        const message = { ...baseQueryGetTaskRequest };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = 0;
        }
        return message;
    },
};
const baseQueryGetTaskResponse = {};
export const QueryGetTaskResponse = {
    encode(message, writer = Writer.create()) {
        if (message.Task !== undefined) {
            Task.encode(message.Task, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetTaskResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Task = Task.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetTaskResponse };
        if (object.Task !== undefined && object.Task !== null) {
            message.Task = Task.fromJSON(object.Task);
        }
        else {
            message.Task = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.Task !== undefined &&
            (obj.Task = message.Task ? Task.toJSON(message.Task) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetTaskResponse };
        if (object.Task !== undefined && object.Task !== null) {
            message.Task = Task.fromPartial(object.Task);
        }
        else {
            message.Task = undefined;
        }
        return message;
    },
};
const baseQueryAllTaskRequest = {};
export const QueryAllTaskRequest = {
    encode(message, writer = Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllTaskRequest };
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
        const message = { ...baseQueryAllTaskRequest };
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
        const message = { ...baseQueryAllTaskRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryAllTaskResponse = {};
export const QueryAllTaskResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.Task) {
            Task.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllTaskResponse };
        message.Task = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Task.push(Task.decode(reader, reader.uint32()));
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
        const message = { ...baseQueryAllTaskResponse };
        message.Task = [];
        if (object.Task !== undefined && object.Task !== null) {
            for (const e of object.Task) {
                message.Task.push(Task.fromJSON(e));
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
        if (message.Task) {
            obj.Task = message.Task.map((e) => (e ? Task.toJSON(e) : undefined));
        }
        else {
            obj.Task = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageResponse.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllTaskResponse };
        message.Task = [];
        if (object.Task !== undefined && object.Task !== null) {
            for (const e of object.Task) {
                message.Task.push(Task.fromPartial(e));
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
const baseQueryCheckGitServerAuthorizationRequest = {
    userAddress: "",
    providerAddress: "",
};
export const QueryCheckGitServerAuthorizationRequest = {
    encode(message, writer = Writer.create()) {
        if (message.userAddress !== "") {
            writer.uint32(10).string(message.userAddress);
        }
        if (message.providerAddress !== "") {
            writer.uint32(18).string(message.providerAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryCheckGitServerAuthorizationRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.userAddress = reader.string();
                    break;
                case 2:
                    message.providerAddress = reader.string();
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
            ...baseQueryCheckGitServerAuthorizationRequest,
        };
        if (object.userAddress !== undefined && object.userAddress !== null) {
            message.userAddress = String(object.userAddress);
        }
        else {
            message.userAddress = "";
        }
        if (object.providerAddress !== undefined &&
            object.providerAddress !== null) {
            message.providerAddress = String(object.providerAddress);
        }
        else {
            message.providerAddress = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.userAddress !== undefined &&
            (obj.userAddress = message.userAddress);
        message.providerAddress !== undefined &&
            (obj.providerAddress = message.providerAddress);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryCheckGitServerAuthorizationRequest,
        };
        if (object.userAddress !== undefined && object.userAddress !== null) {
            message.userAddress = object.userAddress;
        }
        else {
            message.userAddress = "";
        }
        if (object.providerAddress !== undefined &&
            object.providerAddress !== null) {
            message.providerAddress = object.providerAddress;
        }
        else {
            message.providerAddress = "";
        }
        return message;
    },
};
const baseQueryCheckGitServerAuthorizationResponse = {
    haveAuthorization: false,
};
export const QueryCheckGitServerAuthorizationResponse = {
    encode(message, writer = Writer.create()) {
        if (message.haveAuthorization === true) {
            writer.uint32(8).bool(message.haveAuthorization);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryCheckGitServerAuthorizationResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.haveAuthorization = reader.bool();
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
            ...baseQueryCheckGitServerAuthorizationResponse,
        };
        if (object.haveAuthorization !== undefined &&
            object.haveAuthorization !== null) {
            message.haveAuthorization = Boolean(object.haveAuthorization);
        }
        else {
            message.haveAuthorization = false;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.haveAuthorization !== undefined &&
            (obj.haveAuthorization = message.haveAuthorization);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryCheckGitServerAuthorizationResponse,
        };
        if (object.haveAuthorization !== undefined &&
            object.haveAuthorization !== null) {
            message.haveAuthorization = object.haveAuthorization;
        }
        else {
            message.haveAuthorization = false;
        }
        return message;
    },
};
const baseQueryAllBranchRequest = {};
export const QueryAllBranchRequest = {
    encode(message, writer = Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllBranchRequest };
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
        const message = { ...baseQueryAllBranchRequest };
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
        const message = { ...baseQueryAllBranchRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryAllBranchResponse = {};
export const QueryAllBranchResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.Branch) {
            Branch.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllBranchResponse };
        message.Branch = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Branch.push(Branch.decode(reader, reader.uint32()));
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
        const message = { ...baseQueryAllBranchResponse };
        message.Branch = [];
        if (object.Branch !== undefined && object.Branch !== null) {
            for (const e of object.Branch) {
                message.Branch.push(Branch.fromJSON(e));
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
        if (message.Branch) {
            obj.Branch = message.Branch.map((e) => e ? Branch.toJSON(e) : undefined);
        }
        else {
            obj.Branch = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageResponse.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllBranchResponse };
        message.Branch = [];
        if (object.Branch !== undefined && object.Branch !== null) {
            for (const e of object.Branch) {
                message.Branch.push(Branch.fromPartial(e));
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
const baseQueryGetRepositoryBranchRequest = {
    id: "",
    repositoryName: "",
    branchName: "",
};
export const QueryGetRepositoryBranchRequest = {
    encode(message, writer = Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.repositoryName !== "") {
            writer.uint32(18).string(message.repositoryName);
        }
        if (message.branchName !== "") {
            writer.uint32(26).string(message.branchName);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetRepositoryBranchRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.repositoryName = reader.string();
                    break;
                case 3:
                    message.branchName = reader.string();
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
            ...baseQueryGetRepositoryBranchRequest,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = "";
        }
        if (object.repositoryName !== undefined && object.repositoryName !== null) {
            message.repositoryName = String(object.repositoryName);
        }
        else {
            message.repositoryName = "";
        }
        if (object.branchName !== undefined && object.branchName !== null) {
            message.branchName = String(object.branchName);
        }
        else {
            message.branchName = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        message.repositoryName !== undefined &&
            (obj.repositoryName = message.repositoryName);
        message.branchName !== undefined && (obj.branchName = message.branchName);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetRepositoryBranchRequest,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = "";
        }
        if (object.repositoryName !== undefined && object.repositoryName !== null) {
            message.repositoryName = object.repositoryName;
        }
        else {
            message.repositoryName = "";
        }
        if (object.branchName !== undefined && object.branchName !== null) {
            message.branchName = object.branchName;
        }
        else {
            message.branchName = "";
        }
        return message;
    },
};
const baseQueryGetRepositoryBranchResponse = {};
export const QueryGetRepositoryBranchResponse = {
    encode(message, writer = Writer.create()) {
        if (message.Branch !== undefined) {
            Branch.encode(message.Branch, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetRepositoryBranchResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Branch = Branch.decode(reader, reader.uint32());
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
            ...baseQueryGetRepositoryBranchResponse,
        };
        if (object.Branch !== undefined && object.Branch !== null) {
            message.Branch = Branch.fromJSON(object.Branch);
        }
        else {
            message.Branch = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.Branch !== undefined &&
            (obj.Branch = message.Branch ? Branch.toJSON(message.Branch) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetRepositoryBranchResponse,
        };
        if (object.Branch !== undefined && object.Branch !== null) {
            message.Branch = Branch.fromPartial(object.Branch);
        }
        else {
            message.Branch = undefined;
        }
        return message;
    },
};
const baseQueryGetRepositoryBranchShaRequest = {
    id: "",
    repositoryName: "",
    branchName: "",
};
export const QueryGetRepositoryBranchShaRequest = {
    encode(message, writer = Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.repositoryName !== "") {
            writer.uint32(18).string(message.repositoryName);
        }
        if (message.branchName !== "") {
            writer.uint32(26).string(message.branchName);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetRepositoryBranchShaRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.repositoryName = reader.string();
                    break;
                case 3:
                    message.branchName = reader.string();
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
            ...baseQueryGetRepositoryBranchShaRequest,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = "";
        }
        if (object.repositoryName !== undefined && object.repositoryName !== null) {
            message.repositoryName = String(object.repositoryName);
        }
        else {
            message.repositoryName = "";
        }
        if (object.branchName !== undefined && object.branchName !== null) {
            message.branchName = String(object.branchName);
        }
        else {
            message.branchName = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        message.repositoryName !== undefined &&
            (obj.repositoryName = message.repositoryName);
        message.branchName !== undefined && (obj.branchName = message.branchName);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetRepositoryBranchShaRequest,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = "";
        }
        if (object.repositoryName !== undefined && object.repositoryName !== null) {
            message.repositoryName = object.repositoryName;
        }
        else {
            message.repositoryName = "";
        }
        if (object.branchName !== undefined && object.branchName !== null) {
            message.branchName = object.branchName;
        }
        else {
            message.branchName = "";
        }
        return message;
    },
};
const baseQueryGetRepositoryBranchShaResponse = { sha: "" };
export const QueryGetRepositoryBranchShaResponse = {
    encode(message, writer = Writer.create()) {
        if (message.sha !== "") {
            writer.uint32(10).string(message.sha);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetRepositoryBranchShaResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sha = reader.string();
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
            ...baseQueryGetRepositoryBranchShaResponse,
        };
        if (object.sha !== undefined && object.sha !== null) {
            message.sha = String(object.sha);
        }
        else {
            message.sha = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.sha !== undefined && (obj.sha = message.sha);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetRepositoryBranchShaResponse,
        };
        if (object.sha !== undefined && object.sha !== null) {
            message.sha = object.sha;
        }
        else {
            message.sha = "";
        }
        return message;
    },
};
const baseQueryAllRepositoryBranchRequest = {
    id: "",
    repositoryName: "",
};
export const QueryAllRepositoryBranchRequest = {
    encode(message, writer = Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.repositoryName !== "") {
            writer.uint32(18).string(message.repositoryName);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryAllRepositoryBranchRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.repositoryName = reader.string();
                    break;
                case 3:
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
            ...baseQueryAllRepositoryBranchRequest,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = "";
        }
        if (object.repositoryName !== undefined && object.repositoryName !== null) {
            message.repositoryName = String(object.repositoryName);
        }
        else {
            message.repositoryName = "";
        }
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
        message.id !== undefined && (obj.id = message.id);
        message.repositoryName !== undefined &&
            (obj.repositoryName = message.repositoryName);
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageRequest.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryAllRepositoryBranchRequest,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = "";
        }
        if (object.repositoryName !== undefined && object.repositoryName !== null) {
            message.repositoryName = object.repositoryName;
        }
        else {
            message.repositoryName = "";
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryAllRepositoryBranchResponse = {};
export const QueryAllRepositoryBranchResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.Branch) {
            Branch.encode(v, writer.uint32(10).fork()).ldelim();
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
            ...baseQueryAllRepositoryBranchResponse,
        };
        message.Branch = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Branch.push(Branch.decode(reader, reader.uint32()));
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
            ...baseQueryAllRepositoryBranchResponse,
        };
        message.Branch = [];
        if (object.Branch !== undefined && object.Branch !== null) {
            for (const e of object.Branch) {
                message.Branch.push(Branch.fromJSON(e));
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
        if (message.Branch) {
            obj.Branch = message.Branch.map((e) => e ? Branch.toJSON(e) : undefined);
        }
        else {
            obj.Branch = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageResponse.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryAllRepositoryBranchResponse,
        };
        message.Branch = [];
        if (object.Branch !== undefined && object.Branch !== null) {
            for (const e of object.Branch) {
                message.Branch.push(Branch.fromPartial(e));
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
const baseQueryAllTagRequest = {};
export const QueryAllTagRequest = {
    encode(message, writer = Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllTagRequest };
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
        const message = { ...baseQueryAllTagRequest };
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
        const message = { ...baseQueryAllTagRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryAllTagResponse = {};
export const QueryAllTagResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.Tag) {
            Tag.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllTagResponse };
        message.Tag = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Tag.push(Tag.decode(reader, reader.uint32()));
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
        const message = { ...baseQueryAllTagResponse };
        message.Tag = [];
        if (object.Tag !== undefined && object.Tag !== null) {
            for (const e of object.Tag) {
                message.Tag.push(Tag.fromJSON(e));
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
        if (message.Tag) {
            obj.Tag = message.Tag.map((e) => (e ? Tag.toJSON(e) : undefined));
        }
        else {
            obj.Tag = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageResponse.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllTagResponse };
        message.Tag = [];
        if (object.Tag !== undefined && object.Tag !== null) {
            for (const e of object.Tag) {
                message.Tag.push(Tag.fromPartial(e));
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
const baseQueryGetRepositoryTagRequest = {
    id: "",
    repositoryName: "",
    tagName: "",
};
export const QueryGetRepositoryTagRequest = {
    encode(message, writer = Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.repositoryName !== "") {
            writer.uint32(18).string(message.repositoryName);
        }
        if (message.tagName !== "") {
            writer.uint32(26).string(message.tagName);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetRepositoryTagRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.repositoryName = reader.string();
                    break;
                case 3:
                    message.tagName = reader.string();
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
            ...baseQueryGetRepositoryTagRequest,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = "";
        }
        if (object.repositoryName !== undefined && object.repositoryName !== null) {
            message.repositoryName = String(object.repositoryName);
        }
        else {
            message.repositoryName = "";
        }
        if (object.tagName !== undefined && object.tagName !== null) {
            message.tagName = String(object.tagName);
        }
        else {
            message.tagName = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        message.repositoryName !== undefined &&
            (obj.repositoryName = message.repositoryName);
        message.tagName !== undefined && (obj.tagName = message.tagName);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetRepositoryTagRequest,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = "";
        }
        if (object.repositoryName !== undefined && object.repositoryName !== null) {
            message.repositoryName = object.repositoryName;
        }
        else {
            message.repositoryName = "";
        }
        if (object.tagName !== undefined && object.tagName !== null) {
            message.tagName = object.tagName;
        }
        else {
            message.tagName = "";
        }
        return message;
    },
};
const baseQueryGetRepositoryTagResponse = {};
export const QueryGetRepositoryTagResponse = {
    encode(message, writer = Writer.create()) {
        if (message.Tag !== undefined) {
            Tag.encode(message.Tag, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetRepositoryTagResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Tag = Tag.decode(reader, reader.uint32());
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
            ...baseQueryGetRepositoryTagResponse,
        };
        if (object.Tag !== undefined && object.Tag !== null) {
            message.Tag = Tag.fromJSON(object.Tag);
        }
        else {
            message.Tag = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.Tag !== undefined &&
            (obj.Tag = message.Tag ? Tag.toJSON(message.Tag) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetRepositoryTagResponse,
        };
        if (object.Tag !== undefined && object.Tag !== null) {
            message.Tag = Tag.fromPartial(object.Tag);
        }
        else {
            message.Tag = undefined;
        }
        return message;
    },
};
const baseQueryGetRepositoryTagShaRequest = {
    id: "",
    repositoryName: "",
    tagName: "",
};
export const QueryGetRepositoryTagShaRequest = {
    encode(message, writer = Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.repositoryName !== "") {
            writer.uint32(18).string(message.repositoryName);
        }
        if (message.tagName !== "") {
            writer.uint32(26).string(message.tagName);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetRepositoryTagShaRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.repositoryName = reader.string();
                    break;
                case 3:
                    message.tagName = reader.string();
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
            ...baseQueryGetRepositoryTagShaRequest,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = "";
        }
        if (object.repositoryName !== undefined && object.repositoryName !== null) {
            message.repositoryName = String(object.repositoryName);
        }
        else {
            message.repositoryName = "";
        }
        if (object.tagName !== undefined && object.tagName !== null) {
            message.tagName = String(object.tagName);
        }
        else {
            message.tagName = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        message.repositoryName !== undefined &&
            (obj.repositoryName = message.repositoryName);
        message.tagName !== undefined && (obj.tagName = message.tagName);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetRepositoryTagShaRequest,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = "";
        }
        if (object.repositoryName !== undefined && object.repositoryName !== null) {
            message.repositoryName = object.repositoryName;
        }
        else {
            message.repositoryName = "";
        }
        if (object.tagName !== undefined && object.tagName !== null) {
            message.tagName = object.tagName;
        }
        else {
            message.tagName = "";
        }
        return message;
    },
};
const baseQueryGetRepositoryTagShaResponse = { sha: "" };
export const QueryGetRepositoryTagShaResponse = {
    encode(message, writer = Writer.create()) {
        if (message.sha !== "") {
            writer.uint32(10).string(message.sha);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetRepositoryTagShaResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sha = reader.string();
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
            ...baseQueryGetRepositoryTagShaResponse,
        };
        if (object.sha !== undefined && object.sha !== null) {
            message.sha = String(object.sha);
        }
        else {
            message.sha = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.sha !== undefined && (obj.sha = message.sha);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetRepositoryTagShaResponse,
        };
        if (object.sha !== undefined && object.sha !== null) {
            message.sha = object.sha;
        }
        else {
            message.sha = "";
        }
        return message;
    },
};
const baseQueryAllRepositoryTagRequest = { id: "", repositoryName: "" };
export const QueryAllRepositoryTagRequest = {
    encode(message, writer = Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.repositoryName !== "") {
            writer.uint32(18).string(message.repositoryName);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryAllRepositoryTagRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.repositoryName = reader.string();
                    break;
                case 3:
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
            ...baseQueryAllRepositoryTagRequest,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = "";
        }
        if (object.repositoryName !== undefined && object.repositoryName !== null) {
            message.repositoryName = String(object.repositoryName);
        }
        else {
            message.repositoryName = "";
        }
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
        message.id !== undefined && (obj.id = message.id);
        message.repositoryName !== undefined &&
            (obj.repositoryName = message.repositoryName);
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageRequest.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryAllRepositoryTagRequest,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = "";
        }
        if (object.repositoryName !== undefined && object.repositoryName !== null) {
            message.repositoryName = object.repositoryName;
        }
        else {
            message.repositoryName = "";
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryAllRepositoryTagResponse = {};
export const QueryAllRepositoryTagResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.Tag) {
            Tag.encode(v, writer.uint32(10).fork()).ldelim();
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
            ...baseQueryAllRepositoryTagResponse,
        };
        message.Tag = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Tag.push(Tag.decode(reader, reader.uint32()));
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
            ...baseQueryAllRepositoryTagResponse,
        };
        message.Tag = [];
        if (object.Tag !== undefined && object.Tag !== null) {
            for (const e of object.Tag) {
                message.Tag.push(Tag.fromJSON(e));
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
        if (message.Tag) {
            obj.Tag = message.Tag.map((e) => (e ? Tag.toJSON(e) : undefined));
        }
        else {
            obj.Tag = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageResponse.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryAllRepositoryTagResponse,
        };
        message.Tag = [];
        if (object.Tag !== undefined && object.Tag !== null) {
            for (const e of object.Tag) {
                message.Tag.push(Tag.fromPartial(e));
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
const baseQueryGetDaoMemberRequest = { daoId: "", userId: "" };
export const QueryGetDaoMemberRequest = {
    encode(message, writer = Writer.create()) {
        if (message.daoId !== "") {
            writer.uint32(10).string(message.daoId);
        }
        if (message.userId !== "") {
            writer.uint32(18).string(message.userId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetDaoMemberRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.daoId = reader.string();
                    break;
                case 2:
                    message.userId = reader.string();
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
            ...baseQueryGetDaoMemberRequest,
        };
        if (object.daoId !== undefined && object.daoId !== null) {
            message.daoId = String(object.daoId);
        }
        else {
            message.daoId = "";
        }
        if (object.userId !== undefined && object.userId !== null) {
            message.userId = String(object.userId);
        }
        else {
            message.userId = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.daoId !== undefined && (obj.daoId = message.daoId);
        message.userId !== undefined && (obj.userId = message.userId);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetDaoMemberRequest,
        };
        if (object.daoId !== undefined && object.daoId !== null) {
            message.daoId = object.daoId;
        }
        else {
            message.daoId = "";
        }
        if (object.userId !== undefined && object.userId !== null) {
            message.userId = object.userId;
        }
        else {
            message.userId = "";
        }
        return message;
    },
};
const baseQueryGetDaoMemberResponse = {};
export const QueryGetDaoMemberResponse = {
    encode(message, writer = Writer.create()) {
        if (message.Member !== undefined) {
            Member.encode(message.Member, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetDaoMemberResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Member = Member.decode(reader, reader.uint32());
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
            ...baseQueryGetDaoMemberResponse,
        };
        if (object.Member !== undefined && object.Member !== null) {
            message.Member = Member.fromJSON(object.Member);
        }
        else {
            message.Member = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.Member !== undefined &&
            (obj.Member = message.Member ? Member.toJSON(message.Member) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetDaoMemberResponse,
        };
        if (object.Member !== undefined && object.Member !== null) {
            message.Member = Member.fromPartial(object.Member);
        }
        else {
            message.Member = undefined;
        }
        return message;
    },
};
const baseQueryAllDaoMemberRequest = { daoId: "" };
export const QueryAllDaoMemberRequest = {
    encode(message, writer = Writer.create()) {
        if (message.daoId !== "") {
            writer.uint32(10).string(message.daoId);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryAllDaoMemberRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.daoId = reader.string();
                    break;
                case 2:
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
            ...baseQueryAllDaoMemberRequest,
        };
        if (object.daoId !== undefined && object.daoId !== null) {
            message.daoId = String(object.daoId);
        }
        else {
            message.daoId = "";
        }
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
        message.daoId !== undefined && (obj.daoId = message.daoId);
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageRequest.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryAllDaoMemberRequest,
        };
        if (object.daoId !== undefined && object.daoId !== null) {
            message.daoId = object.daoId;
        }
        else {
            message.daoId = "";
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryAllDaoMemberResponse = {};
export const QueryAllDaoMemberResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.Member) {
            Member.encode(v, writer.uint32(10).fork()).ldelim();
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
            ...baseQueryAllDaoMemberResponse,
        };
        message.Member = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Member.push(Member.decode(reader, reader.uint32()));
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
            ...baseQueryAllDaoMemberResponse,
        };
        message.Member = [];
        if (object.Member !== undefined && object.Member !== null) {
            for (const e of object.Member) {
                message.Member.push(Member.fromJSON(e));
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
        if (message.Member) {
            obj.Member = message.Member.map((e) => e ? Member.toJSON(e) : undefined);
        }
        else {
            obj.Member = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageResponse.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryAllDaoMemberResponse,
        };
        message.Member = [];
        if (object.Member !== undefined && object.Member !== null) {
            for (const e of object.Member) {
                message.Member.push(Member.fromPartial(e));
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
const baseQueryAllMemberRequest = {};
export const QueryAllMemberRequest = {
    encode(message, writer = Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllMemberRequest };
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
        const message = { ...baseQueryAllMemberRequest };
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
        const message = { ...baseQueryAllMemberRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryAllMemberResponse = {};
export const QueryAllMemberResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.Member) {
            Member.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllMemberResponse };
        message.Member = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Member.push(Member.decode(reader, reader.uint32()));
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
        const message = { ...baseQueryAllMemberResponse };
        message.Member = [];
        if (object.Member !== undefined && object.Member !== null) {
            for (const e of object.Member) {
                message.Member.push(Member.fromJSON(e));
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
        if (message.Member) {
            obj.Member = message.Member.map((e) => e ? Member.toJSON(e) : undefined);
        }
        else {
            obj.Member = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageResponse.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllMemberResponse };
        message.Member = [];
        if (object.Member !== undefined && object.Member !== null) {
            for (const e of object.Member) {
                message.Member.push(Member.fromPartial(e));
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
const baseQueryGetPullRequestMergePermissionRequest = {
    userId: "",
    pullId: 0,
};
export const QueryGetPullRequestMergePermissionRequest = {
    encode(message, writer = Writer.create()) {
        if (message.userId !== "") {
            writer.uint32(10).string(message.userId);
        }
        if (message.pullId !== 0) {
            writer.uint32(16).uint64(message.pullId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetPullRequestMergePermissionRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.userId = reader.string();
                    break;
                case 2:
                    message.pullId = longToNumber(reader.uint64());
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
            ...baseQueryGetPullRequestMergePermissionRequest,
        };
        if (object.userId !== undefined && object.userId !== null) {
            message.userId = String(object.userId);
        }
        else {
            message.userId = "";
        }
        if (object.pullId !== undefined && object.pullId !== null) {
            message.pullId = Number(object.pullId);
        }
        else {
            message.pullId = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.userId !== undefined && (obj.userId = message.userId);
        message.pullId !== undefined && (obj.pullId = message.pullId);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetPullRequestMergePermissionRequest,
        };
        if (object.userId !== undefined && object.userId !== null) {
            message.userId = object.userId;
        }
        else {
            message.userId = "";
        }
        if (object.pullId !== undefined && object.pullId !== null) {
            message.pullId = object.pullId;
        }
        else {
            message.pullId = 0;
        }
        return message;
    },
};
const baseQueryGetPullRequestMergePermissionResponse = {
    havePermission: false,
};
export const QueryGetPullRequestMergePermissionResponse = {
    encode(message, writer = Writer.create()) {
        if (message.havePermission === true) {
            writer.uint32(8).bool(message.havePermission);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetPullRequestMergePermissionResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.havePermission = reader.bool();
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
            ...baseQueryGetPullRequestMergePermissionResponse,
        };
        if (object.havePermission !== undefined && object.havePermission !== null) {
            message.havePermission = Boolean(object.havePermission);
        }
        else {
            message.havePermission = false;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.havePermission !== undefined &&
            (obj.havePermission = message.havePermission);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetPullRequestMergePermissionResponse,
        };
        if (object.havePermission !== undefined && object.havePermission !== null) {
            message.havePermission = object.havePermission;
        }
        else {
            message.havePermission = false;
        }
        return message;
    },
};
const baseQueryGetReleaseRequest = { id: 0 };
export const QueryGetReleaseRequest = {
    encode(message, writer = Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetReleaseRequest };
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
        const message = { ...baseQueryGetReleaseRequest };
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
        const message = { ...baseQueryGetReleaseRequest };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = 0;
        }
        return message;
    },
};
const baseQueryGetReleaseResponse = {};
export const QueryGetReleaseResponse = {
    encode(message, writer = Writer.create()) {
        if (message.Release !== undefined) {
            Release.encode(message.Release, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetReleaseResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Release = Release.decode(reader, reader.uint32());
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
            ...baseQueryGetReleaseResponse,
        };
        if (object.Release !== undefined && object.Release !== null) {
            message.Release = Release.fromJSON(object.Release);
        }
        else {
            message.Release = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.Release !== undefined &&
            (obj.Release = message.Release
                ? Release.toJSON(message.Release)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetReleaseResponse,
        };
        if (object.Release !== undefined && object.Release !== null) {
            message.Release = Release.fromPartial(object.Release);
        }
        else {
            message.Release = undefined;
        }
        return message;
    },
};
const baseQueryAllReleaseRequest = {};
export const QueryAllReleaseRequest = {
    encode(message, writer = Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllReleaseRequest };
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
        const message = { ...baseQueryAllReleaseRequest };
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
        const message = { ...baseQueryAllReleaseRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryAllReleaseResponse = {};
export const QueryAllReleaseResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.Release) {
            Release.encode(v, writer.uint32(10).fork()).ldelim();
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
            ...baseQueryAllReleaseResponse,
        };
        message.Release = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Release.push(Release.decode(reader, reader.uint32()));
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
            ...baseQueryAllReleaseResponse,
        };
        message.Release = [];
        if (object.Release !== undefined && object.Release !== null) {
            for (const e of object.Release) {
                message.Release.push(Release.fromJSON(e));
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
        if (message.Release) {
            obj.Release = message.Release.map((e) => e ? Release.toJSON(e) : undefined);
        }
        else {
            obj.Release = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageResponse.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryAllReleaseResponse,
        };
        message.Release = [];
        if (object.Release !== undefined && object.Release !== null) {
            for (const e of object.Release) {
                message.Release.push(Release.fromPartial(e));
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
const baseQueryGetPullRequestRequest = { id: 0 };
export const QueryGetPullRequestRequest = {
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
            ...baseQueryGetPullRequestRequest,
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
            ...baseQueryGetPullRequestRequest,
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
            ...baseQueryGetPullRequestRequest,
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
const baseQueryGetPullRequestResponse = {};
export const QueryGetPullRequestResponse = {
    encode(message, writer = Writer.create()) {
        if (message.PullRequest !== undefined) {
            PullRequest.encode(message.PullRequest, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetPullRequestResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.PullRequest = PullRequest.decode(reader, reader.uint32());
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
            ...baseQueryGetPullRequestResponse,
        };
        if (object.PullRequest !== undefined && object.PullRequest !== null) {
            message.PullRequest = PullRequest.fromJSON(object.PullRequest);
        }
        else {
            message.PullRequest = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.PullRequest !== undefined &&
            (obj.PullRequest = message.PullRequest
                ? PullRequest.toJSON(message.PullRequest)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetPullRequestResponse,
        };
        if (object.PullRequest !== undefined && object.PullRequest !== null) {
            message.PullRequest = PullRequest.fromPartial(object.PullRequest);
        }
        else {
            message.PullRequest = undefined;
        }
        return message;
    },
};
const baseQueryAllPullRequestRequest = {};
export const QueryAllPullRequestRequest = {
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
            ...baseQueryAllPullRequestRequest,
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
            ...baseQueryAllPullRequestRequest,
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
            ...baseQueryAllPullRequestRequest,
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
const baseQueryAllPullRequestResponse = {};
export const QueryAllPullRequestResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.PullRequest) {
            PullRequest.encode(v, writer.uint32(10).fork()).ldelim();
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
            ...baseQueryAllPullRequestResponse,
        };
        message.PullRequest = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.PullRequest.push(PullRequest.decode(reader, reader.uint32()));
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
            ...baseQueryAllPullRequestResponse,
        };
        message.PullRequest = [];
        if (object.PullRequest !== undefined && object.PullRequest !== null) {
            for (const e of object.PullRequest) {
                message.PullRequest.push(PullRequest.fromJSON(e));
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
        if (message.PullRequest) {
            obj.PullRequest = message.PullRequest.map((e) => e ? PullRequest.toJSON(e) : undefined);
        }
        else {
            obj.PullRequest = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageResponse.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryAllPullRequestResponse,
        };
        message.PullRequest = [];
        if (object.PullRequest !== undefined && object.PullRequest !== null) {
            for (const e of object.PullRequest) {
                message.PullRequest.push(PullRequest.fromPartial(e));
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
const baseQueryGetDaoRequest = { id: "" };
export const QueryGetDaoRequest = {
    encode(message, writer = Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetDaoRequest };
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
        const message = { ...baseQueryGetDaoRequest };
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
        const message = { ...baseQueryGetDaoRequest };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = "";
        }
        return message;
    },
};
const baseQueryGetDaoResponse = {};
export const QueryGetDaoResponse = {
    encode(message, writer = Writer.create()) {
        if (message.dao !== undefined) {
            Dao.encode(message.dao, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetDaoResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.dao = Dao.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetDaoResponse };
        if (object.dao !== undefined && object.dao !== null) {
            message.dao = Dao.fromJSON(object.dao);
        }
        else {
            message.dao = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.dao !== undefined &&
            (obj.dao = message.dao ? Dao.toJSON(message.dao) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetDaoResponse };
        if (object.dao !== undefined && object.dao !== null) {
            message.dao = Dao.fromPartial(object.dao);
        }
        else {
            message.dao = undefined;
        }
        return message;
    },
};
const baseQueryAllDaoRequest = {};
export const QueryAllDaoRequest = {
    encode(message, writer = Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllDaoRequest };
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
        const message = { ...baseQueryAllDaoRequest };
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
        const message = { ...baseQueryAllDaoRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryAllDaoResponse = {};
export const QueryAllDaoResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.dao) {
            Dao.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllDaoResponse };
        message.dao = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.dao.push(Dao.decode(reader, reader.uint32()));
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
        const message = { ...baseQueryAllDaoResponse };
        message.dao = [];
        if (object.dao !== undefined && object.dao !== null) {
            for (const e of object.dao) {
                message.dao.push(Dao.fromJSON(e));
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
        if (message.dao) {
            obj.dao = message.dao.map((e) => (e ? Dao.toJSON(e) : undefined));
        }
        else {
            obj.dao = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageResponse.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllDaoResponse };
        message.dao = [];
        if (object.dao !== undefined && object.dao !== null) {
            for (const e of object.dao) {
                message.dao.push(Dao.fromPartial(e));
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
const baseQueryGetLatestRepositoryReleaseRequest = {
    id: "",
    repositoryName: "",
};
export const QueryGetLatestRepositoryReleaseRequest = {
    encode(message, writer = Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
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
            ...baseQueryGetLatestRepositoryReleaseRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
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
            ...baseQueryGetLatestRepositoryReleaseRequest,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = "";
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
        message.id !== undefined && (obj.id = message.id);
        message.repositoryName !== undefined &&
            (obj.repositoryName = message.repositoryName);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetLatestRepositoryReleaseRequest,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = "";
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
const baseQueryGetLatestRepositoryReleaseResponse = {};
export const QueryGetLatestRepositoryReleaseResponse = {
    encode(message, writer = Writer.create()) {
        if (message.Release !== undefined) {
            Release.encode(message.Release, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetLatestRepositoryReleaseResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Release = Release.decode(reader, reader.uint32());
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
            ...baseQueryGetLatestRepositoryReleaseResponse,
        };
        if (object.Release !== undefined && object.Release !== null) {
            message.Release = Release.fromJSON(object.Release);
        }
        else {
            message.Release = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.Release !== undefined &&
            (obj.Release = message.Release
                ? Release.toJSON(message.Release)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetLatestRepositoryReleaseResponse,
        };
        if (object.Release !== undefined && object.Release !== null) {
            message.Release = Release.fromPartial(object.Release);
        }
        else {
            message.Release = undefined;
        }
        return message;
    },
};
const baseQueryGetRepositoryReleaseRequest = {
    id: "",
    repositoryName: "",
    tagName: "",
};
export const QueryGetRepositoryReleaseRequest = {
    encode(message, writer = Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.repositoryName !== "") {
            writer.uint32(18).string(message.repositoryName);
        }
        if (message.tagName !== "") {
            writer.uint32(26).string(message.tagName);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetRepositoryReleaseRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.repositoryName = reader.string();
                    break;
                case 3:
                    message.tagName = reader.string();
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
            ...baseQueryGetRepositoryReleaseRequest,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = "";
        }
        if (object.repositoryName !== undefined && object.repositoryName !== null) {
            message.repositoryName = String(object.repositoryName);
        }
        else {
            message.repositoryName = "";
        }
        if (object.tagName !== undefined && object.tagName !== null) {
            message.tagName = String(object.tagName);
        }
        else {
            message.tagName = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        message.repositoryName !== undefined &&
            (obj.repositoryName = message.repositoryName);
        message.tagName !== undefined && (obj.tagName = message.tagName);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetRepositoryReleaseRequest,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = "";
        }
        if (object.repositoryName !== undefined && object.repositoryName !== null) {
            message.repositoryName = object.repositoryName;
        }
        else {
            message.repositoryName = "";
        }
        if (object.tagName !== undefined && object.tagName !== null) {
            message.tagName = object.tagName;
        }
        else {
            message.tagName = "";
        }
        return message;
    },
};
const baseQueryGetRepositoryReleaseResponse = {};
export const QueryGetRepositoryReleaseResponse = {
    encode(message, writer = Writer.create()) {
        if (message.Release !== undefined) {
            Release.encode(message.Release, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetRepositoryReleaseResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Release = Release.decode(reader, reader.uint32());
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
            ...baseQueryGetRepositoryReleaseResponse,
        };
        if (object.Release !== undefined && object.Release !== null) {
            message.Release = Release.fromJSON(object.Release);
        }
        else {
            message.Release = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.Release !== undefined &&
            (obj.Release = message.Release
                ? Release.toJSON(message.Release)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetRepositoryReleaseResponse,
        };
        if (object.Release !== undefined && object.Release !== null) {
            message.Release = Release.fromPartial(object.Release);
        }
        else {
            message.Release = undefined;
        }
        return message;
    },
};
const baseQueryAllRepositoryReleaseRequest = {
    id: "",
    repositoryName: "",
};
export const QueryAllRepositoryReleaseRequest = {
    encode(message, writer = Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.repositoryName !== "") {
            writer.uint32(18).string(message.repositoryName);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryAllRepositoryReleaseRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.repositoryName = reader.string();
                    break;
                case 3:
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
            ...baseQueryAllRepositoryReleaseRequest,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = "";
        }
        if (object.repositoryName !== undefined && object.repositoryName !== null) {
            message.repositoryName = String(object.repositoryName);
        }
        else {
            message.repositoryName = "";
        }
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
        message.id !== undefined && (obj.id = message.id);
        message.repositoryName !== undefined &&
            (obj.repositoryName = message.repositoryName);
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageRequest.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryAllRepositoryReleaseRequest,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = "";
        }
        if (object.repositoryName !== undefined && object.repositoryName !== null) {
            message.repositoryName = object.repositoryName;
        }
        else {
            message.repositoryName = "";
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryAllRepositoryReleaseResponse = {};
export const QueryAllRepositoryReleaseResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.Release) {
            Release.encode(v, writer.uint32(10).fork()).ldelim();
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
            ...baseQueryAllRepositoryReleaseResponse,
        };
        message.Release = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Release.push(Release.decode(reader, reader.uint32()));
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
            ...baseQueryAllRepositoryReleaseResponse,
        };
        message.Release = [];
        if (object.Release !== undefined && object.Release !== null) {
            for (const e of object.Release) {
                message.Release.push(Release.fromJSON(e));
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
        if (message.Release) {
            obj.Release = message.Release.map((e) => e ? Release.toJSON(e) : undefined);
        }
        else {
            obj.Release = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageResponse.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryAllRepositoryReleaseResponse,
        };
        message.Release = [];
        if (object.Release !== undefined && object.Release !== null) {
            for (const e of object.Release) {
                message.Release.push(Release.fromPartial(e));
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
const baseQueryGetRepositoryIssueRequest = {
    id: "",
    repositoryName: "",
    issueIid: 0,
};
export const QueryGetRepositoryIssueRequest = {
    encode(message, writer = Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.repositoryName !== "") {
            writer.uint32(18).string(message.repositoryName);
        }
        if (message.issueIid !== 0) {
            writer.uint32(24).uint64(message.issueIid);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetRepositoryIssueRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.repositoryName = reader.string();
                    break;
                case 3:
                    message.issueIid = longToNumber(reader.uint64());
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
            ...baseQueryGetRepositoryIssueRequest,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = "";
        }
        if (object.repositoryName !== undefined && object.repositoryName !== null) {
            message.repositoryName = String(object.repositoryName);
        }
        else {
            message.repositoryName = "";
        }
        if (object.issueIid !== undefined && object.issueIid !== null) {
            message.issueIid = Number(object.issueIid);
        }
        else {
            message.issueIid = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        message.repositoryName !== undefined &&
            (obj.repositoryName = message.repositoryName);
        message.issueIid !== undefined && (obj.issueIid = message.issueIid);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetRepositoryIssueRequest,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = "";
        }
        if (object.repositoryName !== undefined && object.repositoryName !== null) {
            message.repositoryName = object.repositoryName;
        }
        else {
            message.repositoryName = "";
        }
        if (object.issueIid !== undefined && object.issueIid !== null) {
            message.issueIid = object.issueIid;
        }
        else {
            message.issueIid = 0;
        }
        return message;
    },
};
const baseQueryGetRepositoryIssueResponse = {};
export const QueryGetRepositoryIssueResponse = {
    encode(message, writer = Writer.create()) {
        if (message.Issue !== undefined) {
            Issue.encode(message.Issue, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetRepositoryIssueResponse,
        };
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
        const message = {
            ...baseQueryGetRepositoryIssueResponse,
        };
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
        const message = {
            ...baseQueryGetRepositoryIssueResponse,
        };
        if (object.Issue !== undefined && object.Issue !== null) {
            message.Issue = Issue.fromPartial(object.Issue);
        }
        else {
            message.Issue = undefined;
        }
        return message;
    },
};
const baseQueryGetRepositoryPullRequestRequest = {
    id: "",
    repositoryName: "",
    pullIid: 0,
};
export const QueryGetRepositoryPullRequestRequest = {
    encode(message, writer = Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.repositoryName !== "") {
            writer.uint32(18).string(message.repositoryName);
        }
        if (message.pullIid !== 0) {
            writer.uint32(24).uint64(message.pullIid);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetRepositoryPullRequestRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.repositoryName = reader.string();
                    break;
                case 3:
                    message.pullIid = longToNumber(reader.uint64());
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
            ...baseQueryGetRepositoryPullRequestRequest,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = "";
        }
        if (object.repositoryName !== undefined && object.repositoryName !== null) {
            message.repositoryName = String(object.repositoryName);
        }
        else {
            message.repositoryName = "";
        }
        if (object.pullIid !== undefined && object.pullIid !== null) {
            message.pullIid = Number(object.pullIid);
        }
        else {
            message.pullIid = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        message.repositoryName !== undefined &&
            (obj.repositoryName = message.repositoryName);
        message.pullIid !== undefined && (obj.pullIid = message.pullIid);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetRepositoryPullRequestRequest,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = "";
        }
        if (object.repositoryName !== undefined && object.repositoryName !== null) {
            message.repositoryName = object.repositoryName;
        }
        else {
            message.repositoryName = "";
        }
        if (object.pullIid !== undefined && object.pullIid !== null) {
            message.pullIid = object.pullIid;
        }
        else {
            message.pullIid = 0;
        }
        return message;
    },
};
const baseQueryGetRepositoryPullRequestResponse = {};
export const QueryGetRepositoryPullRequestResponse = {
    encode(message, writer = Writer.create()) {
        if (message.PullRequest !== undefined) {
            PullRequest.encode(message.PullRequest, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetRepositoryPullRequestResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.PullRequest = PullRequest.decode(reader, reader.uint32());
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
            ...baseQueryGetRepositoryPullRequestResponse,
        };
        if (object.PullRequest !== undefined && object.PullRequest !== null) {
            message.PullRequest = PullRequest.fromJSON(object.PullRequest);
        }
        else {
            message.PullRequest = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.PullRequest !== undefined &&
            (obj.PullRequest = message.PullRequest
                ? PullRequest.toJSON(message.PullRequest)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetRepositoryPullRequestResponse,
        };
        if (object.PullRequest !== undefined && object.PullRequest !== null) {
            message.PullRequest = PullRequest.fromPartial(object.PullRequest);
        }
        else {
            message.PullRequest = undefined;
        }
        return message;
    },
};
const baseQueryAllRepositoryIssueRequest = {
    id: "",
    repositoryName: "",
};
export const QueryAllRepositoryIssueRequest = {
    encode(message, writer = Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.repositoryName !== "") {
            writer.uint32(18).string(message.repositoryName);
        }
        if (message.option !== undefined) {
            IssueOptions.encode(message.option, writer.uint32(26).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryAllRepositoryIssueRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.repositoryName = reader.string();
                    break;
                case 3:
                    message.option = IssueOptions.decode(reader, reader.uint32());
                    break;
                case 4:
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
            ...baseQueryAllRepositoryIssueRequest,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = "";
        }
        if (object.repositoryName !== undefined && object.repositoryName !== null) {
            message.repositoryName = String(object.repositoryName);
        }
        else {
            message.repositoryName = "";
        }
        if (object.option !== undefined && object.option !== null) {
            message.option = IssueOptions.fromJSON(object.option);
        }
        else {
            message.option = undefined;
        }
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
        message.id !== undefined && (obj.id = message.id);
        message.repositoryName !== undefined &&
            (obj.repositoryName = message.repositoryName);
        message.option !== undefined &&
            (obj.option = message.option
                ? IssueOptions.toJSON(message.option)
                : undefined);
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageRequest.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryAllRepositoryIssueRequest,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = "";
        }
        if (object.repositoryName !== undefined && object.repositoryName !== null) {
            message.repositoryName = object.repositoryName;
        }
        else {
            message.repositoryName = "";
        }
        if (object.option !== undefined && object.option !== null) {
            message.option = IssueOptions.fromPartial(object.option);
        }
        else {
            message.option = undefined;
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseIssueOptions = {
    createdBy: "",
    state: "",
    labels: "",
    assignee: "",
    labelIds: 0,
    sort: "",
    search: "",
    updatedAfter: 0,
    updatedBefore: 0,
};
export const IssueOptions = {
    encode(message, writer = Writer.create()) {
        if (message.createdBy !== "") {
            writer.uint32(10).string(message.createdBy);
        }
        if (message.state !== "") {
            writer.uint32(18).string(message.state);
        }
        if (message.labels !== "") {
            writer.uint32(26).string(message.labels);
        }
        if (message.assignee !== "") {
            writer.uint32(34).string(message.assignee);
        }
        writer.uint32(42).fork();
        for (const v of message.labelIds) {
            writer.uint64(v);
        }
        writer.ldelim();
        if (message.sort !== "") {
            writer.uint32(50).string(message.sort);
        }
        if (message.search !== "") {
            writer.uint32(58).string(message.search);
        }
        if (message.updatedAfter !== 0) {
            writer.uint32(64).int64(message.updatedAfter);
        }
        if (message.updatedBefore !== 0) {
            writer.uint32(72).int64(message.updatedBefore);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseIssueOptions };
        message.labelIds = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.createdBy = reader.string();
                    break;
                case 2:
                    message.state = reader.string();
                    break;
                case 3:
                    message.labels = reader.string();
                    break;
                case 4:
                    message.assignee = reader.string();
                    break;
                case 5:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.labelIds.push(longToNumber(reader.uint64()));
                        }
                    }
                    else {
                        message.labelIds.push(longToNumber(reader.uint64()));
                    }
                    break;
                case 6:
                    message.sort = reader.string();
                    break;
                case 7:
                    message.search = reader.string();
                    break;
                case 8:
                    message.updatedAfter = longToNumber(reader.int64());
                    break;
                case 9:
                    message.updatedBefore = longToNumber(reader.int64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseIssueOptions };
        message.labelIds = [];
        if (object.createdBy !== undefined && object.createdBy !== null) {
            message.createdBy = String(object.createdBy);
        }
        else {
            message.createdBy = "";
        }
        if (object.state !== undefined && object.state !== null) {
            message.state = String(object.state);
        }
        else {
            message.state = "";
        }
        if (object.labels !== undefined && object.labels !== null) {
            message.labels = String(object.labels);
        }
        else {
            message.labels = "";
        }
        if (object.assignee !== undefined && object.assignee !== null) {
            message.assignee = String(object.assignee);
        }
        else {
            message.assignee = "";
        }
        if (object.labelIds !== undefined && object.labelIds !== null) {
            for (const e of object.labelIds) {
                message.labelIds.push(Number(e));
            }
        }
        if (object.sort !== undefined && object.sort !== null) {
            message.sort = String(object.sort);
        }
        else {
            message.sort = "";
        }
        if (object.search !== undefined && object.search !== null) {
            message.search = String(object.search);
        }
        else {
            message.search = "";
        }
        if (object.updatedAfter !== undefined && object.updatedAfter !== null) {
            message.updatedAfter = Number(object.updatedAfter);
        }
        else {
            message.updatedAfter = 0;
        }
        if (object.updatedBefore !== undefined && object.updatedBefore !== null) {
            message.updatedBefore = Number(object.updatedBefore);
        }
        else {
            message.updatedBefore = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.createdBy !== undefined && (obj.createdBy = message.createdBy);
        message.state !== undefined && (obj.state = message.state);
        message.labels !== undefined && (obj.labels = message.labels);
        message.assignee !== undefined && (obj.assignee = message.assignee);
        if (message.labelIds) {
            obj.labelIds = message.labelIds.map((e) => e);
        }
        else {
            obj.labelIds = [];
        }
        message.sort !== undefined && (obj.sort = message.sort);
        message.search !== undefined && (obj.search = message.search);
        message.updatedAfter !== undefined &&
            (obj.updatedAfter = message.updatedAfter);
        message.updatedBefore !== undefined &&
            (obj.updatedBefore = message.updatedBefore);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseIssueOptions };
        message.labelIds = [];
        if (object.createdBy !== undefined && object.createdBy !== null) {
            message.createdBy = object.createdBy;
        }
        else {
            message.createdBy = "";
        }
        if (object.state !== undefined && object.state !== null) {
            message.state = object.state;
        }
        else {
            message.state = "";
        }
        if (object.labels !== undefined && object.labels !== null) {
            message.labels = object.labels;
        }
        else {
            message.labels = "";
        }
        if (object.assignee !== undefined && object.assignee !== null) {
            message.assignee = object.assignee;
        }
        else {
            message.assignee = "";
        }
        if (object.labelIds !== undefined && object.labelIds !== null) {
            for (const e of object.labelIds) {
                message.labelIds.push(e);
            }
        }
        if (object.sort !== undefined && object.sort !== null) {
            message.sort = object.sort;
        }
        else {
            message.sort = "";
        }
        if (object.search !== undefined && object.search !== null) {
            message.search = object.search;
        }
        else {
            message.search = "";
        }
        if (object.updatedAfter !== undefined && object.updatedAfter !== null) {
            message.updatedAfter = object.updatedAfter;
        }
        else {
            message.updatedAfter = 0;
        }
        if (object.updatedBefore !== undefined && object.updatedBefore !== null) {
            message.updatedBefore = object.updatedBefore;
        }
        else {
            message.updatedBefore = 0;
        }
        return message;
    },
};
const baseQueryAllRepositoryIssueResponse = {};
export const QueryAllRepositoryIssueResponse = {
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
        const message = {
            ...baseQueryAllRepositoryIssueResponse,
        };
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
        const message = {
            ...baseQueryAllRepositoryIssueResponse,
        };
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
        const message = {
            ...baseQueryAllRepositoryIssueResponse,
        };
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
const baseQueryAllRepositoryPullRequestRequest = {
    id: "",
    repositoryName: "",
};
export const QueryAllRepositoryPullRequestRequest = {
    encode(message, writer = Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.repositoryName !== "") {
            writer.uint32(18).string(message.repositoryName);
        }
        if (message.option !== undefined) {
            PullRequestOptions.encode(message.option, writer.uint32(26).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryAllRepositoryPullRequestRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.repositoryName = reader.string();
                    break;
                case 3:
                    message.option = PullRequestOptions.decode(reader, reader.uint32());
                    break;
                case 4:
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
            ...baseQueryAllRepositoryPullRequestRequest,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = "";
        }
        if (object.repositoryName !== undefined && object.repositoryName !== null) {
            message.repositoryName = String(object.repositoryName);
        }
        else {
            message.repositoryName = "";
        }
        if (object.option !== undefined && object.option !== null) {
            message.option = PullRequestOptions.fromJSON(object.option);
        }
        else {
            message.option = undefined;
        }
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
        message.id !== undefined && (obj.id = message.id);
        message.repositoryName !== undefined &&
            (obj.repositoryName = message.repositoryName);
        message.option !== undefined &&
            (obj.option = message.option
                ? PullRequestOptions.toJSON(message.option)
                : undefined);
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageRequest.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryAllRepositoryPullRequestRequest,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = "";
        }
        if (object.repositoryName !== undefined && object.repositoryName !== null) {
            message.repositoryName = object.repositoryName;
        }
        else {
            message.repositoryName = "";
        }
        if (object.option !== undefined && object.option !== null) {
            message.option = PullRequestOptions.fromPartial(object.option);
        }
        else {
            message.option = undefined;
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const basePullRequestOptions = {
    createdBy: "",
    state: "",
    labels: "",
    assignee: "",
    reviewer: "",
    labelIds: 0,
    sort: "",
    search: "",
    updatedAfter: 0,
    updatedBefore: 0,
};
export const PullRequestOptions = {
    encode(message, writer = Writer.create()) {
        if (message.createdBy !== "") {
            writer.uint32(10).string(message.createdBy);
        }
        if (message.state !== "") {
            writer.uint32(18).string(message.state);
        }
        if (message.labels !== "") {
            writer.uint32(26).string(message.labels);
        }
        if (message.assignee !== "") {
            writer.uint32(34).string(message.assignee);
        }
        if (message.reviewer !== "") {
            writer.uint32(42).string(message.reviewer);
        }
        writer.uint32(50).fork();
        for (const v of message.labelIds) {
            writer.uint64(v);
        }
        writer.ldelim();
        if (message.sort !== "") {
            writer.uint32(58).string(message.sort);
        }
        if (message.search !== "") {
            writer.uint32(66).string(message.search);
        }
        if (message.updatedAfter !== 0) {
            writer.uint32(72).int64(message.updatedAfter);
        }
        if (message.updatedBefore !== 0) {
            writer.uint32(80).int64(message.updatedBefore);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...basePullRequestOptions };
        message.labelIds = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.createdBy = reader.string();
                    break;
                case 2:
                    message.state = reader.string();
                    break;
                case 3:
                    message.labels = reader.string();
                    break;
                case 4:
                    message.assignee = reader.string();
                    break;
                case 5:
                    message.reviewer = reader.string();
                    break;
                case 6:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.labelIds.push(longToNumber(reader.uint64()));
                        }
                    }
                    else {
                        message.labelIds.push(longToNumber(reader.uint64()));
                    }
                    break;
                case 7:
                    message.sort = reader.string();
                    break;
                case 8:
                    message.search = reader.string();
                    break;
                case 9:
                    message.updatedAfter = longToNumber(reader.int64());
                    break;
                case 10:
                    message.updatedBefore = longToNumber(reader.int64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...basePullRequestOptions };
        message.labelIds = [];
        if (object.createdBy !== undefined && object.createdBy !== null) {
            message.createdBy = String(object.createdBy);
        }
        else {
            message.createdBy = "";
        }
        if (object.state !== undefined && object.state !== null) {
            message.state = String(object.state);
        }
        else {
            message.state = "";
        }
        if (object.labels !== undefined && object.labels !== null) {
            message.labels = String(object.labels);
        }
        else {
            message.labels = "";
        }
        if (object.assignee !== undefined && object.assignee !== null) {
            message.assignee = String(object.assignee);
        }
        else {
            message.assignee = "";
        }
        if (object.reviewer !== undefined && object.reviewer !== null) {
            message.reviewer = String(object.reviewer);
        }
        else {
            message.reviewer = "";
        }
        if (object.labelIds !== undefined && object.labelIds !== null) {
            for (const e of object.labelIds) {
                message.labelIds.push(Number(e));
            }
        }
        if (object.sort !== undefined && object.sort !== null) {
            message.sort = String(object.sort);
        }
        else {
            message.sort = "";
        }
        if (object.search !== undefined && object.search !== null) {
            message.search = String(object.search);
        }
        else {
            message.search = "";
        }
        if (object.updatedAfter !== undefined && object.updatedAfter !== null) {
            message.updatedAfter = Number(object.updatedAfter);
        }
        else {
            message.updatedAfter = 0;
        }
        if (object.updatedBefore !== undefined && object.updatedBefore !== null) {
            message.updatedBefore = Number(object.updatedBefore);
        }
        else {
            message.updatedBefore = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.createdBy !== undefined && (obj.createdBy = message.createdBy);
        message.state !== undefined && (obj.state = message.state);
        message.labels !== undefined && (obj.labels = message.labels);
        message.assignee !== undefined && (obj.assignee = message.assignee);
        message.reviewer !== undefined && (obj.reviewer = message.reviewer);
        if (message.labelIds) {
            obj.labelIds = message.labelIds.map((e) => e);
        }
        else {
            obj.labelIds = [];
        }
        message.sort !== undefined && (obj.sort = message.sort);
        message.search !== undefined && (obj.search = message.search);
        message.updatedAfter !== undefined &&
            (obj.updatedAfter = message.updatedAfter);
        message.updatedBefore !== undefined &&
            (obj.updatedBefore = message.updatedBefore);
        return obj;
    },
    fromPartial(object) {
        const message = { ...basePullRequestOptions };
        message.labelIds = [];
        if (object.createdBy !== undefined && object.createdBy !== null) {
            message.createdBy = object.createdBy;
        }
        else {
            message.createdBy = "";
        }
        if (object.state !== undefined && object.state !== null) {
            message.state = object.state;
        }
        else {
            message.state = "";
        }
        if (object.labels !== undefined && object.labels !== null) {
            message.labels = object.labels;
        }
        else {
            message.labels = "";
        }
        if (object.assignee !== undefined && object.assignee !== null) {
            message.assignee = object.assignee;
        }
        else {
            message.assignee = "";
        }
        if (object.reviewer !== undefined && object.reviewer !== null) {
            message.reviewer = object.reviewer;
        }
        else {
            message.reviewer = "";
        }
        if (object.labelIds !== undefined && object.labelIds !== null) {
            for (const e of object.labelIds) {
                message.labelIds.push(e);
            }
        }
        if (object.sort !== undefined && object.sort !== null) {
            message.sort = object.sort;
        }
        else {
            message.sort = "";
        }
        if (object.search !== undefined && object.search !== null) {
            message.search = object.search;
        }
        else {
            message.search = "";
        }
        if (object.updatedAfter !== undefined && object.updatedAfter !== null) {
            message.updatedAfter = object.updatedAfter;
        }
        else {
            message.updatedAfter = 0;
        }
        if (object.updatedBefore !== undefined && object.updatedBefore !== null) {
            message.updatedBefore = object.updatedBefore;
        }
        else {
            message.updatedBefore = 0;
        }
        return message;
    },
};
const baseQueryAllRepositoryPullRequestResponse = {};
export const QueryAllRepositoryPullRequestResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.PullRequest) {
            PullRequest.encode(v, writer.uint32(10).fork()).ldelim();
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
            ...baseQueryAllRepositoryPullRequestResponse,
        };
        message.PullRequest = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.PullRequest.push(PullRequest.decode(reader, reader.uint32()));
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
            ...baseQueryAllRepositoryPullRequestResponse,
        };
        message.PullRequest = [];
        if (object.PullRequest !== undefined && object.PullRequest !== null) {
            for (const e of object.PullRequest) {
                message.PullRequest.push(PullRequest.fromJSON(e));
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
        if (message.PullRequest) {
            obj.PullRequest = message.PullRequest.map((e) => e ? PullRequest.toJSON(e) : undefined);
        }
        else {
            obj.PullRequest = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageResponse.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryAllRepositoryPullRequestResponse,
        };
        message.PullRequest = [];
        if (object.PullRequest !== undefined && object.PullRequest !== null) {
            for (const e of object.PullRequest) {
                message.PullRequest.push(PullRequest.fromPartial(e));
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
const baseRepositoryFork = {
    creator: "",
    id: 0,
    name: "",
    description: "",
    parent: 0,
    forksCount: 0,
    issuesCount: 0,
    pullsCount: 0,
};
export const RepositoryFork = {
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
        if (message.owner !== undefined) {
            RepositoryOwner.encode(message.owner, writer.uint32(34).fork()).ldelim();
        }
        if (message.description !== "") {
            writer.uint32(42).string(message.description);
        }
        if (message.parent !== 0) {
            writer.uint32(48).uint64(message.parent);
        }
        if (message.forksCount !== 0) {
            writer.uint32(56).uint64(message.forksCount);
        }
        if (message.issuesCount !== 0) {
            writer.uint32(64).uint64(message.issuesCount);
        }
        if (message.pullsCount !== 0) {
            writer.uint32(72).uint64(message.pullsCount);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseRepositoryFork };
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
                    message.owner = RepositoryOwner.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.description = reader.string();
                    break;
                case 6:
                    message.parent = longToNumber(reader.uint64());
                    break;
                case 7:
                    message.forksCount = longToNumber(reader.uint64());
                    break;
                case 8:
                    message.issuesCount = longToNumber(reader.uint64());
                    break;
                case 9:
                    message.pullsCount = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseRepositoryFork };
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
            message.owner = RepositoryOwner.fromJSON(object.owner);
        }
        else {
            message.owner = undefined;
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = String(object.description);
        }
        else {
            message.description = "";
        }
        if (object.parent !== undefined && object.parent !== null) {
            message.parent = Number(object.parent);
        }
        else {
            message.parent = 0;
        }
        if (object.forksCount !== undefined && object.forksCount !== null) {
            message.forksCount = Number(object.forksCount);
        }
        else {
            message.forksCount = 0;
        }
        if (object.issuesCount !== undefined && object.issuesCount !== null) {
            message.issuesCount = Number(object.issuesCount);
        }
        else {
            message.issuesCount = 0;
        }
        if (object.pullsCount !== undefined && object.pullsCount !== null) {
            message.pullsCount = Number(object.pullsCount);
        }
        else {
            message.pullsCount = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        message.name !== undefined && (obj.name = message.name);
        message.owner !== undefined &&
            (obj.owner = message.owner
                ? RepositoryOwner.toJSON(message.owner)
                : undefined);
        message.description !== undefined &&
            (obj.description = message.description);
        message.parent !== undefined && (obj.parent = message.parent);
        message.forksCount !== undefined && (obj.forksCount = message.forksCount);
        message.issuesCount !== undefined &&
            (obj.issuesCount = message.issuesCount);
        message.pullsCount !== undefined && (obj.pullsCount = message.pullsCount);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseRepositoryFork };
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
            message.owner = RepositoryOwner.fromPartial(object.owner);
        }
        else {
            message.owner = undefined;
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = object.description;
        }
        else {
            message.description = "";
        }
        if (object.parent !== undefined && object.parent !== null) {
            message.parent = object.parent;
        }
        else {
            message.parent = 0;
        }
        if (object.forksCount !== undefined && object.forksCount !== null) {
            message.forksCount = object.forksCount;
        }
        else {
            message.forksCount = 0;
        }
        if (object.issuesCount !== undefined && object.issuesCount !== null) {
            message.issuesCount = object.issuesCount;
        }
        else {
            message.issuesCount = 0;
        }
        if (object.pullsCount !== undefined && object.pullsCount !== null) {
            message.pullsCount = object.pullsCount;
        }
        else {
            message.pullsCount = 0;
        }
        return message;
    },
};
const baseQueryGetAllForkRequest = { id: "", repositoryName: "" };
export const QueryGetAllForkRequest = {
    encode(message, writer = Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.repositoryName !== "") {
            writer.uint32(18).string(message.repositoryName);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetAllForkRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.repositoryName = reader.string();
                    break;
                case 3:
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
        const message = { ...baseQueryGetAllForkRequest };
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = "";
        }
        if (object.repositoryName !== undefined && object.repositoryName !== null) {
            message.repositoryName = String(object.repositoryName);
        }
        else {
            message.repositoryName = "";
        }
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
        message.id !== undefined && (obj.id = message.id);
        message.repositoryName !== undefined &&
            (obj.repositoryName = message.repositoryName);
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageRequest.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetAllForkRequest };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = "";
        }
        if (object.repositoryName !== undefined && object.repositoryName !== null) {
            message.repositoryName = object.repositoryName;
        }
        else {
            message.repositoryName = "";
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryGetAllForkResponse = {};
export const QueryGetAllForkResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.forks) {
            RepositoryFork.encode(v, writer.uint32(10).fork()).ldelim();
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
            ...baseQueryGetAllForkResponse,
        };
        message.forks = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.forks.push(RepositoryFork.decode(reader, reader.uint32()));
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
            ...baseQueryGetAllForkResponse,
        };
        message.forks = [];
        if (object.forks !== undefined && object.forks !== null) {
            for (const e of object.forks) {
                message.forks.push(RepositoryFork.fromJSON(e));
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
        if (message.forks) {
            obj.forks = message.forks.map((e) => e ? RepositoryFork.toJSON(e) : undefined);
        }
        else {
            obj.forks = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageResponse.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetAllForkResponse,
        };
        message.forks = [];
        if (object.forks !== undefined && object.forks !== null) {
            for (const e of object.forks) {
                message.forks.push(RepositoryFork.fromPartial(e));
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
const baseQueryAllUserDaoRequest = { userId: "" };
export const QueryAllUserDaoRequest = {
    encode(message, writer = Writer.create()) {
        if (message.userId !== "") {
            writer.uint32(10).string(message.userId);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllUserDaoRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.userId = reader.string();
                    break;
                case 2:
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
        const message = { ...baseQueryAllUserDaoRequest };
        if (object.userId !== undefined && object.userId !== null) {
            message.userId = String(object.userId);
        }
        else {
            message.userId = "";
        }
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
        message.userId !== undefined && (obj.userId = message.userId);
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageRequest.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllUserDaoRequest };
        if (object.userId !== undefined && object.userId !== null) {
            message.userId = object.userId;
        }
        else {
            message.userId = "";
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryAllUserDaoResponse = {};
export const QueryAllUserDaoResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.dao) {
            Dao.encode(v, writer.uint32(10).fork()).ldelim();
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
            ...baseQueryAllUserDaoResponse,
        };
        message.dao = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.dao.push(Dao.decode(reader, reader.uint32()));
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
            ...baseQueryAllUserDaoResponse,
        };
        message.dao = [];
        if (object.dao !== undefined && object.dao !== null) {
            for (const e of object.dao) {
                message.dao.push(Dao.fromJSON(e));
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
        if (message.dao) {
            obj.dao = message.dao.map((e) => (e ? Dao.toJSON(e) : undefined));
        }
        else {
            obj.dao = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageResponse.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryAllUserDaoResponse,
        };
        message.dao = [];
        if (object.dao !== undefined && object.dao !== null) {
            for (const e of object.dao) {
                message.dao.push(Dao.fromPartial(e));
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
const baseQueryAllAnyRepositoryRequest = { id: "" };
export const QueryAllAnyRepositoryRequest = {
    encode(message, writer = Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryAllAnyRepositoryRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
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
            ...baseQueryAllAnyRepositoryRequest,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = "";
        }
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
        message.id !== undefined && (obj.id = message.id);
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageRequest.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryAllAnyRepositoryRequest,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = "";
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryAllAnyRepositoryResponse = {};
export const QueryAllAnyRepositoryResponse = {
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
            ...baseQueryAllAnyRepositoryResponse,
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
            ...baseQueryAllAnyRepositoryResponse,
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
            ...baseQueryAllAnyRepositoryResponse,
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
const baseQueryGetAnyRepositoryRequest = { id: "", repositoryName: "" };
export const QueryGetAnyRepositoryRequest = {
    encode(message, writer = Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
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
            ...baseQueryGetAnyRepositoryRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
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
            ...baseQueryGetAnyRepositoryRequest,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = "";
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
        message.id !== undefined && (obj.id = message.id);
        message.repositoryName !== undefined &&
            (obj.repositoryName = message.repositoryName);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetAnyRepositoryRequest,
        };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = "";
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
const baseQueryGetAnyRepositoryResponse = {};
export const QueryGetAnyRepositoryResponse = {
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
            ...baseQueryGetAnyRepositoryResponse,
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
            ...baseQueryGetAnyRepositoryResponse,
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
            ...baseQueryGetAnyRepositoryResponse,
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
    Task(request) {
        const data = QueryGetTaskRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "Task", data);
        return promise.then((data) => QueryGetTaskResponse.decode(new Reader(data)));
    }
    TaskAll(request) {
        const data = QueryAllTaskRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "TaskAll", data);
        return promise.then((data) => QueryAllTaskResponse.decode(new Reader(data)));
    }
    BranchAll(request) {
        const data = QueryAllBranchRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "BranchAll", data);
        return promise.then((data) => QueryAllBranchResponse.decode(new Reader(data)));
    }
    RepositoryBranch(request) {
        const data = QueryGetRepositoryBranchRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "RepositoryBranch", data);
        return promise.then((data) => QueryGetRepositoryBranchResponse.decode(new Reader(data)));
    }
    RepositoryBranchSha(request) {
        const data = QueryGetRepositoryBranchShaRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "RepositoryBranchSha", data);
        return promise.then((data) => QueryGetRepositoryBranchShaResponse.decode(new Reader(data)));
    }
    RepositoryBranchAll(request) {
        const data = QueryAllRepositoryBranchRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "RepositoryBranchAll", data);
        return promise.then((data) => QueryAllRepositoryBranchResponse.decode(new Reader(data)));
    }
    TagAll(request) {
        const data = QueryAllTagRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "TagAll", data);
        return promise.then((data) => QueryAllTagResponse.decode(new Reader(data)));
    }
    RepositoryTag(request) {
        const data = QueryGetRepositoryTagRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "RepositoryTag", data);
        return promise.then((data) => QueryGetRepositoryTagResponse.decode(new Reader(data)));
    }
    RepositoryTagSha(request) {
        const data = QueryGetRepositoryTagShaRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "RepositoryTagSha", data);
        return promise.then((data) => QueryGetRepositoryTagShaResponse.decode(new Reader(data)));
    }
    RepositoryTagAll(request) {
        const data = QueryAllRepositoryTagRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "RepositoryTagAll", data);
        return promise.then((data) => QueryAllRepositoryTagResponse.decode(new Reader(data)));
    }
    DaoMember(request) {
        const data = QueryGetDaoMemberRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "DaoMember", data);
        return promise.then((data) => QueryGetDaoMemberResponse.decode(new Reader(data)));
    }
    DaoMemberAll(request) {
        const data = QueryAllDaoMemberRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "DaoMemberAll", data);
        return promise.then((data) => QueryAllDaoMemberResponse.decode(new Reader(data)));
    }
    MemberAll(request) {
        const data = QueryAllMemberRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "MemberAll", data);
        return promise.then((data) => QueryAllMemberResponse.decode(new Reader(data)));
    }
    Release(request) {
        const data = QueryGetReleaseRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "Release", data);
        return promise.then((data) => QueryGetReleaseResponse.decode(new Reader(data)));
    }
    ReleaseAll(request) {
        const data = QueryAllReleaseRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "ReleaseAll", data);
        return promise.then((data) => QueryAllReleaseResponse.decode(new Reader(data)));
    }
    PullRequest(request) {
        const data = QueryGetPullRequestRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "PullRequest", data);
        return promise.then((data) => QueryGetPullRequestResponse.decode(new Reader(data)));
    }
    PullRequestAll(request) {
        const data = QueryAllPullRequestRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "PullRequestAll", data);
        return promise.then((data) => QueryAllPullRequestResponse.decode(new Reader(data)));
    }
    Dao(request) {
        const data = QueryGetDaoRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "Dao", data);
        return promise.then((data) => QueryGetDaoResponse.decode(new Reader(data)));
    }
    DaoAll(request) {
        const data = QueryAllDaoRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "DaoAll", data);
        return promise.then((data) => QueryAllDaoResponse.decode(new Reader(data)));
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
    RepositoryReleaseLatest(request) {
        const data = QueryGetLatestRepositoryReleaseRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "RepositoryReleaseLatest", data);
        return promise.then((data) => QueryGetLatestRepositoryReleaseResponse.decode(new Reader(data)));
    }
    RepositoryRelease(request) {
        const data = QueryGetRepositoryReleaseRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "RepositoryRelease", data);
        return promise.then((data) => QueryGetRepositoryReleaseResponse.decode(new Reader(data)));
    }
    RepositoryReleaseAll(request) {
        const data = QueryAllRepositoryReleaseRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "RepositoryReleaseAll", data);
        return promise.then((data) => QueryAllRepositoryReleaseResponse.decode(new Reader(data)));
    }
    RepositoryIssue(request) {
        const data = QueryGetRepositoryIssueRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "RepositoryIssue", data);
        return promise.then((data) => QueryGetRepositoryIssueResponse.decode(new Reader(data)));
    }
    RepositoryIssueAll(request) {
        const data = QueryAllRepositoryIssueRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "RepositoryIssueAll", data);
        return promise.then((data) => QueryAllRepositoryIssueResponse.decode(new Reader(data)));
    }
    RepositoryPullRequest(request) {
        const data = QueryGetRepositoryPullRequestRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "RepositoryPullRequest", data);
        return promise.then((data) => QueryGetRepositoryPullRequestResponse.decode(new Reader(data)));
    }
    RepositoryPullRequestAll(request) {
        const data = QueryAllRepositoryPullRequestRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "RepositoryPullRequestAll", data);
        return promise.then((data) => QueryAllRepositoryPullRequestResponse.decode(new Reader(data)));
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
    ForkAll(request) {
        const data = QueryGetAllForkRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "ForkAll", data);
        return promise.then((data) => QueryGetAllForkResponse.decode(new Reader(data)));
    }
    User(request) {
        const data = QueryGetUserRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "User", data);
        return promise.then((data) => QueryGetUserResponse.decode(new Reader(data)));
    }
    UserDaoAll(request) {
        const data = QueryAllUserDaoRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "UserDaoAll", data);
        return promise.then((data) => QueryAllUserDaoResponse.decode(new Reader(data)));
    }
    UserAll(request) {
        const data = QueryAllUserRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "UserAll", data);
        return promise.then((data) => QueryAllUserResponse.decode(new Reader(data)));
    }
    AnyRepositoryAll(request) {
        const data = QueryAllAnyRepositoryRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "AnyRepositoryAll", data);
        return promise.then((data) => QueryAllAnyRepositoryResponse.decode(new Reader(data)));
    }
    AnyRepository(request) {
        const data = QueryGetAnyRepositoryRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "AnyRepository", data);
        return promise.then((data) => QueryGetAnyRepositoryResponse.decode(new Reader(data)));
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
    PullRequestMergePermission(request) {
        const data = QueryGetPullRequestMergePermissionRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "PullRequestMergePermission", data);
        return promise.then((data) => QueryGetPullRequestMergePermissionResponse.decode(new Reader(data)));
    }
    CheckGitServerAuthorization(request) {
        const data = QueryCheckGitServerAuthorizationRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "CheckGitServerAuthorization", data);
        return promise.then((data) => QueryCheckGitServerAuthorizationResponse.decode(new Reader(data)));
    }
    CheckStorageProviderAuthorization(request) {
        const data = QueryCheckStorageProviderAuthorizationRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "CheckStorageProviderAuthorization", data);
        return promise.then((data) => QueryCheckStorageProviderAuthorizationResponse.decode(new Reader(data)));
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
