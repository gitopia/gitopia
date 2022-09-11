/* eslint-disable */
import { taskTypeFromJSON, taskTypeToJSON, taskStateFromJSON, taskStateToJSON, } from "../gitopia/task";
import { storeFromJSON, storeToJSON } from "../gitopia/storage_provider";
import { memberRoleFromJSON, memberRoleToJSON, } from "../gitopia/member";
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";
import { RepositoryId } from "../gitopia/repository";
export const protobufPackage = "gitopia.gitopia.gitopia";
const baseMsgRevokeStorageProviderPermissions = {
    creator: "",
    provider: "",
};
export const MsgRevokeStorageProviderPermissions = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.provider !== "") {
            writer.uint32(18).string(message.provider);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgRevokeStorageProviderPermissions,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.provider = reader.string();
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
            ...baseMsgRevokeStorageProviderPermissions,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.provider !== undefined && object.provider !== null) {
            message.provider = String(object.provider);
        }
        else {
            message.provider = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.provider !== undefined && (obj.provider = message.provider);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgRevokeStorageProviderPermissions,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.provider !== undefined && object.provider !== null) {
            message.provider = object.provider;
        }
        else {
            message.provider = "";
        }
        return message;
    },
};
const baseMsgRevokeStorageProviderPermissionsResponse = {};
export const MsgRevokeStorageProviderPermissionsResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgRevokeStorageProviderPermissionsResponse,
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
            ...baseMsgRevokeStorageProviderPermissionsResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgRevokeStorageProviderPermissionsResponse,
        };
        return message;
    },
};
const baseMsgAuthorizeStorageProvider = { creator: "", provider: "" };
export const MsgAuthorizeStorageProvider = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.provider !== "") {
            writer.uint32(18).string(message.provider);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgAuthorizeStorageProvider,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.provider = reader.string();
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
            ...baseMsgAuthorizeStorageProvider,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.provider !== undefined && object.provider !== null) {
            message.provider = String(object.provider);
        }
        else {
            message.provider = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.provider !== undefined && (obj.provider = message.provider);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgAuthorizeStorageProvider,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.provider !== undefined && object.provider !== null) {
            message.provider = object.provider;
        }
        else {
            message.provider = "";
        }
        return message;
    },
};
const baseMsgAuthorizeStorageProviderResponse = {};
export const MsgAuthorizeStorageProviderResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgAuthorizeStorageProviderResponse,
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
            ...baseMsgAuthorizeStorageProviderResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgAuthorizeStorageProviderResponse,
        };
        return message;
    },
};
const baseMsgRevokeGitServerPermissions = { creator: "", provider: "" };
export const MsgRevokeGitServerPermissions = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.provider !== "") {
            writer.uint32(18).string(message.provider);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgRevokeGitServerPermissions,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.provider = reader.string();
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
            ...baseMsgRevokeGitServerPermissions,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.provider !== undefined && object.provider !== null) {
            message.provider = String(object.provider);
        }
        else {
            message.provider = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.provider !== undefined && (obj.provider = message.provider);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgRevokeGitServerPermissions,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.provider !== undefined && object.provider !== null) {
            message.provider = object.provider;
        }
        else {
            message.provider = "";
        }
        return message;
    },
};
const baseMsgRevokeGitServerPermissionsResponse = {};
export const MsgRevokeGitServerPermissionsResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgRevokeGitServerPermissionsResponse,
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
            ...baseMsgRevokeGitServerPermissionsResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgRevokeGitServerPermissionsResponse,
        };
        return message;
    },
};
const baseMsgAuthorizeGitServer = { creator: "", provider: "" };
export const MsgAuthorizeGitServer = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.provider !== "") {
            writer.uint32(18).string(message.provider);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgAuthorizeGitServer };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.provider = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgAuthorizeGitServer };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.provider !== undefined && object.provider !== null) {
            message.provider = String(object.provider);
        }
        else {
            message.provider = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.provider !== undefined && (obj.provider = message.provider);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgAuthorizeGitServer };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.provider !== undefined && object.provider !== null) {
            message.provider = object.provider;
        }
        else {
            message.provider = "";
        }
        return message;
    },
};
const baseMsgAuthorizeGitServerResponse = {};
export const MsgAuthorizeGitServerResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgAuthorizeGitServerResponse,
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
            ...baseMsgAuthorizeGitServerResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgAuthorizeGitServerResponse,
        };
        return message;
    },
};
const baseMsgCreateTask = { creator: "", taskType: 0, provider: "" };
export const MsgCreateTask = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.taskType !== 0) {
            writer.uint32(16).int32(message.taskType);
        }
        if (message.provider !== "") {
            writer.uint32(26).string(message.provider);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreateTask };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.taskType = reader.int32();
                    break;
                case 3:
                    message.provider = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgCreateTask };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.taskType !== undefined && object.taskType !== null) {
            message.taskType = taskTypeFromJSON(object.taskType);
        }
        else {
            message.taskType = 0;
        }
        if (object.provider !== undefined && object.provider !== null) {
            message.provider = String(object.provider);
        }
        else {
            message.provider = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.taskType !== undefined &&
            (obj.taskType = taskTypeToJSON(message.taskType));
        message.provider !== undefined && (obj.provider = message.provider);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgCreateTask };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.taskType !== undefined && object.taskType !== null) {
            message.taskType = object.taskType;
        }
        else {
            message.taskType = 0;
        }
        if (object.provider !== undefined && object.provider !== null) {
            message.provider = object.provider;
        }
        else {
            message.provider = "";
        }
        return message;
    },
};
const baseMsgCreateTaskResponse = { id: 0 };
export const MsgCreateTaskResponse = {
    encode(message, writer = Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreateTaskResponse };
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
        const message = { ...baseMsgCreateTaskResponse };
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
        const message = { ...baseMsgCreateTaskResponse };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = 0;
        }
        return message;
    },
};
const baseMsgUpdateTask = { creator: "", id: 0, state: 0, message: "" };
export const MsgUpdateTask = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== 0) {
            writer.uint32(16).uint64(message.id);
        }
        if (message.state !== 0) {
            writer.uint32(24).int32(message.state);
        }
        if (message.message !== "") {
            writer.uint32(34).string(message.message);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpdateTask };
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
                    message.state = reader.int32();
                    break;
                case 4:
                    message.message = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgUpdateTask };
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
        if (object.state !== undefined && object.state !== null) {
            message.state = taskStateFromJSON(object.state);
        }
        else {
            message.state = 0;
        }
        if (object.message !== undefined && object.message !== null) {
            message.message = String(object.message);
        }
        else {
            message.message = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        message.state !== undefined && (obj.state = taskStateToJSON(message.state));
        message.message !== undefined && (obj.message = message.message);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgUpdateTask };
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
        if (object.state !== undefined && object.state !== null) {
            message.state = object.state;
        }
        else {
            message.state = 0;
        }
        if (object.message !== undefined && object.message !== null) {
            message.message = object.message;
        }
        else {
            message.message = "";
        }
        return message;
    },
};
const baseMsgUpdateTaskResponse = {};
export const MsgUpdateTaskResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpdateTaskResponse };
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
        const message = { ...baseMsgUpdateTaskResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgUpdateTaskResponse };
        return message;
    },
};
const baseMsgDeleteTask = { creator: "", id: 0 };
export const MsgDeleteTask = {
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
        const message = { ...baseMsgDeleteTask };
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
        const message = { ...baseMsgDeleteTask };
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
        const message = { ...baseMsgDeleteTask };
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
const baseMsgUpdateRepositoryBackupRef = {
    creator: "",
    store: 0,
    ref: "",
};
export const MsgUpdateRepositoryBackupRef = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.repositoryId !== undefined) {
            RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
        }
        if (message.store !== 0) {
            writer.uint32(24).int32(message.store);
        }
        if (message.ref !== "") {
            writer.uint32(34).string(message.ref);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgUpdateRepositoryBackupRef,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.repositoryId = RepositoryId.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.store = reader.int32();
                    break;
                case 4:
                    message.ref = reader.string();
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
            ...baseMsgUpdateRepositoryBackupRef,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.store !== undefined && object.store !== null) {
            message.store = storeFromJSON(object.store);
        }
        else {
            message.store = 0;
        }
        if (object.ref !== undefined && object.ref !== null) {
            message.ref = String(object.ref);
        }
        else {
            message.ref = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.repositoryId !== undefined &&
            (obj.repositoryId = message.repositoryId
                ? RepositoryId.toJSON(message.repositoryId)
                : undefined);
        message.store !== undefined && (obj.store = storeToJSON(message.store));
        message.ref !== undefined && (obj.ref = message.ref);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgUpdateRepositoryBackupRef,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.store !== undefined && object.store !== null) {
            message.store = object.store;
        }
        else {
            message.store = 0;
        }
        if (object.ref !== undefined && object.ref !== null) {
            message.ref = object.ref;
        }
        else {
            message.ref = "";
        }
        return message;
    },
};
const baseMsgUpdateRepositoryBackupRefResponse = {};
export const MsgUpdateRepositoryBackupRefResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgUpdateRepositoryBackupRefResponse,
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
            ...baseMsgUpdateRepositoryBackupRefResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgUpdateRepositoryBackupRefResponse,
        };
        return message;
    },
};
const baseMsgAddRepositoryBackupRef = {
    creator: "",
    store: 0,
    ref: "",
};
export const MsgAddRepositoryBackupRef = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.repositoryId !== undefined) {
            RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
        }
        if (message.store !== 0) {
            writer.uint32(24).int32(message.store);
        }
        if (message.ref !== "") {
            writer.uint32(34).string(message.ref);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgAddRepositoryBackupRef,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.repositoryId = RepositoryId.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.store = reader.int32();
                    break;
                case 4:
                    message.ref = reader.string();
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
            ...baseMsgAddRepositoryBackupRef,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.store !== undefined && object.store !== null) {
            message.store = storeFromJSON(object.store);
        }
        else {
            message.store = 0;
        }
        if (object.ref !== undefined && object.ref !== null) {
            message.ref = String(object.ref);
        }
        else {
            message.ref = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.repositoryId !== undefined &&
            (obj.repositoryId = message.repositoryId
                ? RepositoryId.toJSON(message.repositoryId)
                : undefined);
        message.store !== undefined && (obj.store = storeToJSON(message.store));
        message.ref !== undefined && (obj.ref = message.ref);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgAddRepositoryBackupRef,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.store !== undefined && object.store !== null) {
            message.store = object.store;
        }
        else {
            message.store = 0;
        }
        if (object.ref !== undefined && object.ref !== null) {
            message.ref = object.ref;
        }
        else {
            message.ref = "";
        }
        return message;
    },
};
const baseMsgAddRepositoryBackupRefResponse = {};
export const MsgAddRepositoryBackupRefResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgAddRepositoryBackupRefResponse,
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
            ...baseMsgAddRepositoryBackupRefResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgAddRepositoryBackupRefResponse,
        };
        return message;
    },
};
const baseMsgCreateStorageProvider = { creator: "", store: 0 };
export const MsgCreateStorageProvider = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.store !== 0) {
            writer.uint32(16).int32(message.store);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgCreateStorageProvider,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.store = reader.int32();
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
            ...baseMsgCreateStorageProvider,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.store !== undefined && object.store !== null) {
            message.store = storeFromJSON(object.store);
        }
        else {
            message.store = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.store !== undefined && (obj.store = storeToJSON(message.store));
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgCreateStorageProvider,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.store !== undefined && object.store !== null) {
            message.store = object.store;
        }
        else {
            message.store = 0;
        }
        return message;
    },
};
const baseMsgCreateStorageProviderResponse = { id: 0 };
export const MsgCreateStorageProviderResponse = {
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
            ...baseMsgCreateStorageProviderResponse,
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
            ...baseMsgCreateStorageProviderResponse,
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
            ...baseMsgCreateStorageProviderResponse,
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
const baseMsgUpdateStorageProvider = { creator: "", id: 0, store: 0 };
export const MsgUpdateStorageProvider = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== 0) {
            writer.uint32(16).uint64(message.id);
        }
        if (message.store !== 0) {
            writer.uint32(24).int32(message.store);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgUpdateStorageProvider,
        };
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
                    message.store = reader.int32();
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
            ...baseMsgUpdateStorageProvider,
        };
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
        if (object.store !== undefined && object.store !== null) {
            message.store = storeFromJSON(object.store);
        }
        else {
            message.store = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        message.store !== undefined && (obj.store = storeToJSON(message.store));
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgUpdateStorageProvider,
        };
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
        if (object.store !== undefined && object.store !== null) {
            message.store = object.store;
        }
        else {
            message.store = 0;
        }
        return message;
    },
};
const baseMsgUpdateStorageProviderResponse = {};
export const MsgUpdateStorageProviderResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgUpdateStorageProviderResponse,
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
            ...baseMsgUpdateStorageProviderResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgUpdateStorageProviderResponse,
        };
        return message;
    },
};
const baseMsgDeleteStorageProvider = { creator: "", id: 0 };
export const MsgDeleteStorageProvider = {
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
        const message = {
            ...baseMsgDeleteStorageProvider,
        };
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
        const message = {
            ...baseMsgDeleteStorageProvider,
        };
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
        const message = {
            ...baseMsgDeleteStorageProvider,
        };
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
const baseMsgDeleteTaskResponse = {};
export const MsgDeleteTaskResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgDeleteTaskResponse };
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
        const message = { ...baseMsgDeleteTaskResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgDeleteTaskResponse };
        return message;
    },
};
const baseMsgDeleteStorageProviderResponse = {};
export const MsgDeleteStorageProviderResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgDeleteStorageProviderResponse,
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
            ...baseMsgDeleteStorageProviderResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgDeleteStorageProviderResponse,
        };
        return message;
    },
};
const baseMsgSetBranch = { creator: "" };
export const MsgSetBranch = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.repositoryId !== undefined) {
            RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
        }
        if (message.branch !== undefined) {
            MsgSetBranch_Branch.encode(message.branch, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgSetBranch };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.repositoryId = RepositoryId.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.branch = MsgSetBranch_Branch.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgSetBranch };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.branch !== undefined && object.branch !== null) {
            message.branch = MsgSetBranch_Branch.fromJSON(object.branch);
        }
        else {
            message.branch = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.repositoryId !== undefined &&
            (obj.repositoryId = message.repositoryId
                ? RepositoryId.toJSON(message.repositoryId)
                : undefined);
        message.branch !== undefined &&
            (obj.branch = message.branch
                ? MsgSetBranch_Branch.toJSON(message.branch)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgSetBranch };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.branch !== undefined && object.branch !== null) {
            message.branch = MsgSetBranch_Branch.fromPartial(object.branch);
        }
        else {
            message.branch = undefined;
        }
        return message;
    },
};
const baseMsgSetBranch_Branch = { name: "", sha: "" };
export const MsgSetBranch_Branch = {
    encode(message, writer = Writer.create()) {
        if (message.name !== "") {
            writer.uint32(10).string(message.name);
        }
        if (message.sha !== "") {
            writer.uint32(18).string(message.sha);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgSetBranch_Branch };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
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
        const message = { ...baseMsgSetBranch_Branch };
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = "";
        }
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
        message.name !== undefined && (obj.name = message.name);
        message.sha !== undefined && (obj.sha = message.sha);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgSetBranch_Branch };
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = "";
        }
        if (object.sha !== undefined && object.sha !== null) {
            message.sha = object.sha;
        }
        else {
            message.sha = "";
        }
        return message;
    },
};
const baseMsgSetBranchResponse = {};
export const MsgSetBranchResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgSetBranchResponse };
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
        const message = { ...baseMsgSetBranchResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgSetBranchResponse };
        return message;
    },
};
const baseMsgSetDefaultBranch = { creator: "", branch: "" };
export const MsgSetDefaultBranch = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.repositoryId !== undefined) {
            RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
        }
        if (message.branch !== "") {
            writer.uint32(26).string(message.branch);
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
                    message.repositoryId = RepositoryId.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.branch = reader.string();
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
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.branch !== undefined && object.branch !== null) {
            message.branch = String(object.branch);
        }
        else {
            message.branch = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.repositoryId !== undefined &&
            (obj.repositoryId = message.repositoryId
                ? RepositoryId.toJSON(message.repositoryId)
                : undefined);
        message.branch !== undefined && (obj.branch = message.branch);
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
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.branch !== undefined && object.branch !== null) {
            message.branch = object.branch;
        }
        else {
            message.branch = "";
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
const baseMsgMultiSetBranch = { creator: "" };
export const MsgMultiSetBranch = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.repositoryId !== undefined) {
            RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.branches) {
            MsgMultiSetBranch_Branch.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgMultiSetBranch };
        message.branches = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.repositoryId = RepositoryId.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.branches.push(MsgMultiSetBranch_Branch.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgMultiSetBranch };
        message.branches = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.branches !== undefined && object.branches !== null) {
            for (const e of object.branches) {
                message.branches.push(MsgMultiSetBranch_Branch.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.repositoryId !== undefined &&
            (obj.repositoryId = message.repositoryId
                ? RepositoryId.toJSON(message.repositoryId)
                : undefined);
        if (message.branches) {
            obj.branches = message.branches.map((e) => e ? MsgMultiSetBranch_Branch.toJSON(e) : undefined);
        }
        else {
            obj.branches = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgMultiSetBranch };
        message.branches = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.branches !== undefined && object.branches !== null) {
            for (const e of object.branches) {
                message.branches.push(MsgMultiSetBranch_Branch.fromPartial(e));
            }
        }
        return message;
    },
};
const baseMsgMultiSetBranch_Branch = { name: "", sha: "" };
export const MsgMultiSetBranch_Branch = {
    encode(message, writer = Writer.create()) {
        if (message.name !== "") {
            writer.uint32(10).string(message.name);
        }
        if (message.sha !== "") {
            writer.uint32(18).string(message.sha);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgMultiSetBranch_Branch,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
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
            ...baseMsgMultiSetBranch_Branch,
        };
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = "";
        }
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
        message.name !== undefined && (obj.name = message.name);
        message.sha !== undefined && (obj.sha = message.sha);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgMultiSetBranch_Branch,
        };
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = "";
        }
        if (object.sha !== undefined && object.sha !== null) {
            message.sha = object.sha;
        }
        else {
            message.sha = "";
        }
        return message;
    },
};
const baseMsgMultiSetBranchResponse = {};
export const MsgMultiSetBranchResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgMultiSetBranchResponse,
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
            ...baseMsgMultiSetBranchResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgMultiSetBranchResponse,
        };
        return message;
    },
};
const baseMsgDeleteBranch = { creator: "", branch: "" };
export const MsgDeleteBranch = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.repositoryId !== undefined) {
            RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
        }
        if (message.branch !== "") {
            writer.uint32(26).string(message.branch);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgDeleteBranch };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.repositoryId = RepositoryId.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.branch = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgDeleteBranch };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.branch !== undefined && object.branch !== null) {
            message.branch = String(object.branch);
        }
        else {
            message.branch = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.repositoryId !== undefined &&
            (obj.repositoryId = message.repositoryId
                ? RepositoryId.toJSON(message.repositoryId)
                : undefined);
        message.branch !== undefined && (obj.branch = message.branch);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgDeleteBranch };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.branch !== undefined && object.branch !== null) {
            message.branch = object.branch;
        }
        else {
            message.branch = "";
        }
        return message;
    },
};
const baseMsgDeleteBranchResponse = {};
export const MsgDeleteBranchResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgDeleteBranchResponse,
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
            ...baseMsgDeleteBranchResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgDeleteBranchResponse,
        };
        return message;
    },
};
const baseMsgMultiDeleteBranch = { creator: "", branches: "" };
export const MsgMultiDeleteBranch = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.repositoryId !== undefined) {
            RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.branches) {
            writer.uint32(26).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgMultiDeleteBranch };
        message.branches = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.repositoryId = RepositoryId.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.branches.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgMultiDeleteBranch };
        message.branches = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.branches !== undefined && object.branches !== null) {
            for (const e of object.branches) {
                message.branches.push(String(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.repositoryId !== undefined &&
            (obj.repositoryId = message.repositoryId
                ? RepositoryId.toJSON(message.repositoryId)
                : undefined);
        if (message.branches) {
            obj.branches = message.branches.map((e) => e);
        }
        else {
            obj.branches = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgMultiDeleteBranch };
        message.branches = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.branches !== undefined && object.branches !== null) {
            for (const e of object.branches) {
                message.branches.push(e);
            }
        }
        return message;
    },
};
const baseMsgMultiDeleteBranchResponse = {};
export const MsgMultiDeleteBranchResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgMultiDeleteBranchResponse,
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
            ...baseMsgMultiDeleteBranchResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgMultiDeleteBranchResponse,
        };
        return message;
    },
};
const baseMsgSetTag = { creator: "" };
export const MsgSetTag = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.repositoryId !== undefined) {
            RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
        }
        if (message.tag !== undefined) {
            MsgSetTag_Tag.encode(message.tag, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgSetTag };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.repositoryId = RepositoryId.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.tag = MsgSetTag_Tag.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgSetTag };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.tag !== undefined && object.tag !== null) {
            message.tag = MsgSetTag_Tag.fromJSON(object.tag);
        }
        else {
            message.tag = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.repositoryId !== undefined &&
            (obj.repositoryId = message.repositoryId
                ? RepositoryId.toJSON(message.repositoryId)
                : undefined);
        message.tag !== undefined &&
            (obj.tag = message.tag ? MsgSetTag_Tag.toJSON(message.tag) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgSetTag };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.tag !== undefined && object.tag !== null) {
            message.tag = MsgSetTag_Tag.fromPartial(object.tag);
        }
        else {
            message.tag = undefined;
        }
        return message;
    },
};
const baseMsgSetTag_Tag = { name: "", sha: "" };
export const MsgSetTag_Tag = {
    encode(message, writer = Writer.create()) {
        if (message.name !== "") {
            writer.uint32(10).string(message.name);
        }
        if (message.sha !== "") {
            writer.uint32(18).string(message.sha);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgSetTag_Tag };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
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
        const message = { ...baseMsgSetTag_Tag };
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = "";
        }
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
        message.name !== undefined && (obj.name = message.name);
        message.sha !== undefined && (obj.sha = message.sha);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgSetTag_Tag };
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = "";
        }
        if (object.sha !== undefined && object.sha !== null) {
            message.sha = object.sha;
        }
        else {
            message.sha = "";
        }
        return message;
    },
};
const baseMsgSetTagResponse = {};
export const MsgSetTagResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgSetTagResponse };
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
        const message = { ...baseMsgSetTagResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgSetTagResponse };
        return message;
    },
};
const baseMsgMultiSetTag = { creator: "" };
export const MsgMultiSetTag = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.repositoryId !== undefined) {
            RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.tags) {
            MsgMultiSetTag_Tag.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgMultiSetTag };
        message.tags = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.repositoryId = RepositoryId.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.tags.push(MsgMultiSetTag_Tag.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgMultiSetTag };
        message.tags = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.tags !== undefined && object.tags !== null) {
            for (const e of object.tags) {
                message.tags.push(MsgMultiSetTag_Tag.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.repositoryId !== undefined &&
            (obj.repositoryId = message.repositoryId
                ? RepositoryId.toJSON(message.repositoryId)
                : undefined);
        if (message.tags) {
            obj.tags = message.tags.map((e) => e ? MsgMultiSetTag_Tag.toJSON(e) : undefined);
        }
        else {
            obj.tags = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgMultiSetTag };
        message.tags = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.tags !== undefined && object.tags !== null) {
            for (const e of object.tags) {
                message.tags.push(MsgMultiSetTag_Tag.fromPartial(e));
            }
        }
        return message;
    },
};
const baseMsgMultiSetTag_Tag = { name: "", sha: "" };
export const MsgMultiSetTag_Tag = {
    encode(message, writer = Writer.create()) {
        if (message.name !== "") {
            writer.uint32(10).string(message.name);
        }
        if (message.sha !== "") {
            writer.uint32(18).string(message.sha);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgMultiSetTag_Tag };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
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
        const message = { ...baseMsgMultiSetTag_Tag };
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = "";
        }
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
        message.name !== undefined && (obj.name = message.name);
        message.sha !== undefined && (obj.sha = message.sha);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgMultiSetTag_Tag };
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = "";
        }
        if (object.sha !== undefined && object.sha !== null) {
            message.sha = object.sha;
        }
        else {
            message.sha = "";
        }
        return message;
    },
};
const baseMsgMultiSetTagResponse = {};
export const MsgMultiSetTagResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgMultiSetTagResponse };
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
        const message = { ...baseMsgMultiSetTagResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgMultiSetTagResponse };
        return message;
    },
};
const baseMsgDeleteTag = { creator: "", tag: "" };
export const MsgDeleteTag = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.repositoryId !== undefined) {
            RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
        }
        if (message.tag !== "") {
            writer.uint32(26).string(message.tag);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgDeleteTag };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.repositoryId = RepositoryId.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.tag = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgDeleteTag };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.tag !== undefined && object.tag !== null) {
            message.tag = String(object.tag);
        }
        else {
            message.tag = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.repositoryId !== undefined &&
            (obj.repositoryId = message.repositoryId
                ? RepositoryId.toJSON(message.repositoryId)
                : undefined);
        message.tag !== undefined && (obj.tag = message.tag);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgDeleteTag };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.tag !== undefined && object.tag !== null) {
            message.tag = object.tag;
        }
        else {
            message.tag = "";
        }
        return message;
    },
};
const baseMsgDeleteTagResponse = {};
export const MsgDeleteTagResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgDeleteTagResponse };
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
        const message = { ...baseMsgDeleteTagResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgDeleteTagResponse };
        return message;
    },
};
const baseMsgMultiDeleteTag = { creator: "", tags: "" };
export const MsgMultiDeleteTag = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.repositoryId !== undefined) {
            RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.tags) {
            writer.uint32(26).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgMultiDeleteTag };
        message.tags = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.repositoryId = RepositoryId.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.tags.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgMultiDeleteTag };
        message.tags = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.tags !== undefined && object.tags !== null) {
            for (const e of object.tags) {
                message.tags.push(String(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.repositoryId !== undefined &&
            (obj.repositoryId = message.repositoryId
                ? RepositoryId.toJSON(message.repositoryId)
                : undefined);
        if (message.tags) {
            obj.tags = message.tags.map((e) => e);
        }
        else {
            obj.tags = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgMultiDeleteTag };
        message.tags = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.tags !== undefined && object.tags !== null) {
            for (const e of object.tags) {
                message.tags.push(e);
            }
        }
        return message;
    },
};
const baseMsgMultiDeleteTagResponse = {};
export const MsgMultiDeleteTagResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgMultiDeleteTagResponse,
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
            ...baseMsgMultiDeleteTagResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgMultiDeleteTagResponse,
        };
        return message;
    },
};
const baseMsgAddMember = {
    creator: "",
    daoId: "",
    userId: "",
    role: 0,
};
export const MsgAddMember = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.daoId !== "") {
            writer.uint32(18).string(message.daoId);
        }
        if (message.userId !== "") {
            writer.uint32(26).string(message.userId);
        }
        if (message.role !== 0) {
            writer.uint32(32).int32(message.role);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgAddMember };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.daoId = reader.string();
                    break;
                case 3:
                    message.userId = reader.string();
                    break;
                case 4:
                    message.role = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgAddMember };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
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
        if (object.role !== undefined && object.role !== null) {
            message.role = memberRoleFromJSON(object.role);
        }
        else {
            message.role = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.daoId !== undefined && (obj.daoId = message.daoId);
        message.userId !== undefined && (obj.userId = message.userId);
        message.role !== undefined && (obj.role = memberRoleToJSON(message.role));
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgAddMember };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
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
        if (object.role !== undefined && object.role !== null) {
            message.role = object.role;
        }
        else {
            message.role = 0;
        }
        return message;
    },
};
const baseMsgAddMemberResponse = {};
export const MsgAddMemberResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgAddMemberResponse };
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
        const message = { ...baseMsgAddMemberResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgAddMemberResponse };
        return message;
    },
};
const baseMsgUpdateMemberRole = {
    creator: "",
    daoId: "",
    userId: "",
    role: 0,
};
export const MsgUpdateMemberRole = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.daoId !== "") {
            writer.uint32(18).string(message.daoId);
        }
        if (message.userId !== "") {
            writer.uint32(26).string(message.userId);
        }
        if (message.role !== 0) {
            writer.uint32(32).int32(message.role);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpdateMemberRole };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.daoId = reader.string();
                    break;
                case 3:
                    message.userId = reader.string();
                    break;
                case 4:
                    message.role = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgUpdateMemberRole };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
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
        if (object.role !== undefined && object.role !== null) {
            message.role = memberRoleFromJSON(object.role);
        }
        else {
            message.role = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.daoId !== undefined && (obj.daoId = message.daoId);
        message.userId !== undefined && (obj.userId = message.userId);
        message.role !== undefined && (obj.role = memberRoleToJSON(message.role));
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgUpdateMemberRole };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
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
        if (object.role !== undefined && object.role !== null) {
            message.role = object.role;
        }
        else {
            message.role = 0;
        }
        return message;
    },
};
const baseMsgUpdateMemberRoleResponse = {};
export const MsgUpdateMemberRoleResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgUpdateMemberRoleResponse,
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
            ...baseMsgUpdateMemberRoleResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgUpdateMemberRoleResponse,
        };
        return message;
    },
};
const baseMsgRemoveMember = { creator: "", daoId: "", userId: "" };
export const MsgRemoveMember = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.daoId !== "") {
            writer.uint32(18).string(message.daoId);
        }
        if (message.userId !== "") {
            writer.uint32(26).string(message.userId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgRemoveMember };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.daoId = reader.string();
                    break;
                case 3:
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
        const message = { ...baseMsgRemoveMember };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
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
        message.creator !== undefined && (obj.creator = message.creator);
        message.daoId !== undefined && (obj.daoId = message.daoId);
        message.userId !== undefined && (obj.userId = message.userId);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgRemoveMember };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
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
const baseMsgRemoveMemberResponse = {};
export const MsgRemoveMemberResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgRemoveMemberResponse,
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
            ...baseMsgRemoveMemberResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgRemoveMemberResponse,
        };
        return message;
    },
};
const baseMsgCreateRelease = {
    creator: "",
    tagName: "",
    target: "",
    name: "",
    description: "",
    attachments: "",
    draft: false,
    preRelease: false,
    isTag: false,
};
export const MsgCreateRelease = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.repositoryId !== undefined) {
            RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
        }
        if (message.tagName !== "") {
            writer.uint32(26).string(message.tagName);
        }
        if (message.target !== "") {
            writer.uint32(34).string(message.target);
        }
        if (message.name !== "") {
            writer.uint32(42).string(message.name);
        }
        if (message.description !== "") {
            writer.uint32(50).string(message.description);
        }
        if (message.attachments !== "") {
            writer.uint32(58).string(message.attachments);
        }
        if (message.draft === true) {
            writer.uint32(64).bool(message.draft);
        }
        if (message.preRelease === true) {
            writer.uint32(72).bool(message.preRelease);
        }
        if (message.isTag === true) {
            writer.uint32(80).bool(message.isTag);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreateRelease };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.repositoryId = RepositoryId.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.tagName = reader.string();
                    break;
                case 4:
                    message.target = reader.string();
                    break;
                case 5:
                    message.name = reader.string();
                    break;
                case 6:
                    message.description = reader.string();
                    break;
                case 7:
                    message.attachments = reader.string();
                    break;
                case 8:
                    message.draft = reader.bool();
                    break;
                case 9:
                    message.preRelease = reader.bool();
                    break;
                case 10:
                    message.isTag = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgCreateRelease };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.tagName !== undefined && object.tagName !== null) {
            message.tagName = String(object.tagName);
        }
        else {
            message.tagName = "";
        }
        if (object.target !== undefined && object.target !== null) {
            message.target = String(object.target);
        }
        else {
            message.target = "";
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = "";
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = String(object.description);
        }
        else {
            message.description = "";
        }
        if (object.attachments !== undefined && object.attachments !== null) {
            message.attachments = String(object.attachments);
        }
        else {
            message.attachments = "";
        }
        if (object.draft !== undefined && object.draft !== null) {
            message.draft = Boolean(object.draft);
        }
        else {
            message.draft = false;
        }
        if (object.preRelease !== undefined && object.preRelease !== null) {
            message.preRelease = Boolean(object.preRelease);
        }
        else {
            message.preRelease = false;
        }
        if (object.isTag !== undefined && object.isTag !== null) {
            message.isTag = Boolean(object.isTag);
        }
        else {
            message.isTag = false;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.repositoryId !== undefined &&
            (obj.repositoryId = message.repositoryId
                ? RepositoryId.toJSON(message.repositoryId)
                : undefined);
        message.tagName !== undefined && (obj.tagName = message.tagName);
        message.target !== undefined && (obj.target = message.target);
        message.name !== undefined && (obj.name = message.name);
        message.description !== undefined &&
            (obj.description = message.description);
        message.attachments !== undefined &&
            (obj.attachments = message.attachments);
        message.draft !== undefined && (obj.draft = message.draft);
        message.preRelease !== undefined && (obj.preRelease = message.preRelease);
        message.isTag !== undefined && (obj.isTag = message.isTag);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgCreateRelease };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.tagName !== undefined && object.tagName !== null) {
            message.tagName = object.tagName;
        }
        else {
            message.tagName = "";
        }
        if (object.target !== undefined && object.target !== null) {
            message.target = object.target;
        }
        else {
            message.target = "";
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = "";
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = object.description;
        }
        else {
            message.description = "";
        }
        if (object.attachments !== undefined && object.attachments !== null) {
            message.attachments = object.attachments;
        }
        else {
            message.attachments = "";
        }
        if (object.draft !== undefined && object.draft !== null) {
            message.draft = object.draft;
        }
        else {
            message.draft = false;
        }
        if (object.preRelease !== undefined && object.preRelease !== null) {
            message.preRelease = object.preRelease;
        }
        else {
            message.preRelease = false;
        }
        if (object.isTag !== undefined && object.isTag !== null) {
            message.isTag = object.isTag;
        }
        else {
            message.isTag = false;
        }
        return message;
    },
};
const baseMsgCreateReleaseResponse = { id: 0 };
export const MsgCreateReleaseResponse = {
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
            ...baseMsgCreateReleaseResponse,
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
            ...baseMsgCreateReleaseResponse,
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
            ...baseMsgCreateReleaseResponse,
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
const baseMsgUpdateRelease = {
    creator: "",
    id: 0,
    tagName: "",
    target: "",
    name: "",
    description: "",
    attachments: "",
    draft: false,
    preRelease: false,
    isTag: false,
};
export const MsgUpdateRelease = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== 0) {
            writer.uint32(16).uint64(message.id);
        }
        if (message.tagName !== "") {
            writer.uint32(26).string(message.tagName);
        }
        if (message.target !== "") {
            writer.uint32(34).string(message.target);
        }
        if (message.name !== "") {
            writer.uint32(42).string(message.name);
        }
        if (message.description !== "") {
            writer.uint32(50).string(message.description);
        }
        if (message.attachments !== "") {
            writer.uint32(58).string(message.attachments);
        }
        if (message.draft === true) {
            writer.uint32(64).bool(message.draft);
        }
        if (message.preRelease === true) {
            writer.uint32(72).bool(message.preRelease);
        }
        if (message.isTag === true) {
            writer.uint32(80).bool(message.isTag);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpdateRelease };
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
                    message.tagName = reader.string();
                    break;
                case 4:
                    message.target = reader.string();
                    break;
                case 5:
                    message.name = reader.string();
                    break;
                case 6:
                    message.description = reader.string();
                    break;
                case 7:
                    message.attachments = reader.string();
                    break;
                case 8:
                    message.draft = reader.bool();
                    break;
                case 9:
                    message.preRelease = reader.bool();
                    break;
                case 10:
                    message.isTag = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgUpdateRelease };
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
        if (object.tagName !== undefined && object.tagName !== null) {
            message.tagName = String(object.tagName);
        }
        else {
            message.tagName = "";
        }
        if (object.target !== undefined && object.target !== null) {
            message.target = String(object.target);
        }
        else {
            message.target = "";
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = "";
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = String(object.description);
        }
        else {
            message.description = "";
        }
        if (object.attachments !== undefined && object.attachments !== null) {
            message.attachments = String(object.attachments);
        }
        else {
            message.attachments = "";
        }
        if (object.draft !== undefined && object.draft !== null) {
            message.draft = Boolean(object.draft);
        }
        else {
            message.draft = false;
        }
        if (object.preRelease !== undefined && object.preRelease !== null) {
            message.preRelease = Boolean(object.preRelease);
        }
        else {
            message.preRelease = false;
        }
        if (object.isTag !== undefined && object.isTag !== null) {
            message.isTag = Boolean(object.isTag);
        }
        else {
            message.isTag = false;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        message.tagName !== undefined && (obj.tagName = message.tagName);
        message.target !== undefined && (obj.target = message.target);
        message.name !== undefined && (obj.name = message.name);
        message.description !== undefined &&
            (obj.description = message.description);
        message.attachments !== undefined &&
            (obj.attachments = message.attachments);
        message.draft !== undefined && (obj.draft = message.draft);
        message.preRelease !== undefined && (obj.preRelease = message.preRelease);
        message.isTag !== undefined && (obj.isTag = message.isTag);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgUpdateRelease };
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
        if (object.tagName !== undefined && object.tagName !== null) {
            message.tagName = object.tagName;
        }
        else {
            message.tagName = "";
        }
        if (object.target !== undefined && object.target !== null) {
            message.target = object.target;
        }
        else {
            message.target = "";
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = "";
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = object.description;
        }
        else {
            message.description = "";
        }
        if (object.attachments !== undefined && object.attachments !== null) {
            message.attachments = object.attachments;
        }
        else {
            message.attachments = "";
        }
        if (object.draft !== undefined && object.draft !== null) {
            message.draft = object.draft;
        }
        else {
            message.draft = false;
        }
        if (object.preRelease !== undefined && object.preRelease !== null) {
            message.preRelease = object.preRelease;
        }
        else {
            message.preRelease = false;
        }
        if (object.isTag !== undefined && object.isTag !== null) {
            message.isTag = object.isTag;
        }
        else {
            message.isTag = false;
        }
        return message;
    },
};
const baseMsgUpdateReleaseResponse = {};
export const MsgUpdateReleaseResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgUpdateReleaseResponse,
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
            ...baseMsgUpdateReleaseResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgUpdateReleaseResponse,
        };
        return message;
    },
};
const baseMsgDeleteRelease = { creator: "", id: 0 };
export const MsgDeleteRelease = {
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
        const message = { ...baseMsgDeleteRelease };
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
        const message = { ...baseMsgDeleteRelease };
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
        const message = { ...baseMsgDeleteRelease };
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
const baseMsgDeleteReleaseResponse = {};
export const MsgDeleteReleaseResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgDeleteReleaseResponse,
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
            ...baseMsgDeleteReleaseResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgDeleteReleaseResponse,
        };
        return message;
    },
};
const baseMsgCreatePullRequest = {
    creator: "",
    title: "",
    description: "",
    headBranch: "",
    baseBranch: "",
    reviewers: "",
    assignees: "",
    labelIds: 0,
};
export const MsgCreatePullRequest = {
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
        if (message.headBranch !== "") {
            writer.uint32(34).string(message.headBranch);
        }
        if (message.headRepositoryId !== undefined) {
            RepositoryId.encode(message.headRepositoryId, writer.uint32(42).fork()).ldelim();
        }
        if (message.baseBranch !== "") {
            writer.uint32(50).string(message.baseBranch);
        }
        if (message.baseRepositoryId !== undefined) {
            RepositoryId.encode(message.baseRepositoryId, writer.uint32(58).fork()).ldelim();
        }
        for (const v of message.reviewers) {
            writer.uint32(66).string(v);
        }
        for (const v of message.assignees) {
            writer.uint32(74).string(v);
        }
        writer.uint32(82).fork();
        for (const v of message.labelIds) {
            writer.uint64(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreatePullRequest };
        message.reviewers = [];
        message.assignees = [];
        message.labelIds = [];
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
                    message.headBranch = reader.string();
                    break;
                case 5:
                    message.headRepositoryId = RepositoryId.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.baseBranch = reader.string();
                    break;
                case 7:
                    message.baseRepositoryId = RepositoryId.decode(reader, reader.uint32());
                    break;
                case 8:
                    message.reviewers.push(reader.string());
                    break;
                case 9:
                    message.assignees.push(reader.string());
                    break;
                case 10:
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
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgCreatePullRequest };
        message.reviewers = [];
        message.assignees = [];
        message.labelIds = [];
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
        if (object.headBranch !== undefined && object.headBranch !== null) {
            message.headBranch = String(object.headBranch);
        }
        else {
            message.headBranch = "";
        }
        if (object.headRepositoryId !== undefined &&
            object.headRepositoryId !== null) {
            message.headRepositoryId = RepositoryId.fromJSON(object.headRepositoryId);
        }
        else {
            message.headRepositoryId = undefined;
        }
        if (object.baseBranch !== undefined && object.baseBranch !== null) {
            message.baseBranch = String(object.baseBranch);
        }
        else {
            message.baseBranch = "";
        }
        if (object.baseRepositoryId !== undefined &&
            object.baseRepositoryId !== null) {
            message.baseRepositoryId = RepositoryId.fromJSON(object.baseRepositoryId);
        }
        else {
            message.baseRepositoryId = undefined;
        }
        if (object.reviewers !== undefined && object.reviewers !== null) {
            for (const e of object.reviewers) {
                message.reviewers.push(String(e));
            }
        }
        if (object.assignees !== undefined && object.assignees !== null) {
            for (const e of object.assignees) {
                message.assignees.push(String(e));
            }
        }
        if (object.labelIds !== undefined && object.labelIds !== null) {
            for (const e of object.labelIds) {
                message.labelIds.push(Number(e));
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
        message.headBranch !== undefined && (obj.headBranch = message.headBranch);
        message.headRepositoryId !== undefined &&
            (obj.headRepositoryId = message.headRepositoryId
                ? RepositoryId.toJSON(message.headRepositoryId)
                : undefined);
        message.baseBranch !== undefined && (obj.baseBranch = message.baseBranch);
        message.baseRepositoryId !== undefined &&
            (obj.baseRepositoryId = message.baseRepositoryId
                ? RepositoryId.toJSON(message.baseRepositoryId)
                : undefined);
        if (message.reviewers) {
            obj.reviewers = message.reviewers.map((e) => e);
        }
        else {
            obj.reviewers = [];
        }
        if (message.assignees) {
            obj.assignees = message.assignees.map((e) => e);
        }
        else {
            obj.assignees = [];
        }
        if (message.labelIds) {
            obj.labelIds = message.labelIds.map((e) => e);
        }
        else {
            obj.labelIds = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgCreatePullRequest };
        message.reviewers = [];
        message.assignees = [];
        message.labelIds = [];
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
        if (object.headBranch !== undefined && object.headBranch !== null) {
            message.headBranch = object.headBranch;
        }
        else {
            message.headBranch = "";
        }
        if (object.headRepositoryId !== undefined &&
            object.headRepositoryId !== null) {
            message.headRepositoryId = RepositoryId.fromPartial(object.headRepositoryId);
        }
        else {
            message.headRepositoryId = undefined;
        }
        if (object.baseBranch !== undefined && object.baseBranch !== null) {
            message.baseBranch = object.baseBranch;
        }
        else {
            message.baseBranch = "";
        }
        if (object.baseRepositoryId !== undefined &&
            object.baseRepositoryId !== null) {
            message.baseRepositoryId = RepositoryId.fromPartial(object.baseRepositoryId);
        }
        else {
            message.baseRepositoryId = undefined;
        }
        if (object.reviewers !== undefined && object.reviewers !== null) {
            for (const e of object.reviewers) {
                message.reviewers.push(e);
            }
        }
        if (object.assignees !== undefined && object.assignees !== null) {
            for (const e of object.assignees) {
                message.assignees.push(e);
            }
        }
        if (object.labelIds !== undefined && object.labelIds !== null) {
            for (const e of object.labelIds) {
                message.labelIds.push(e);
            }
        }
        return message;
    },
};
const baseMsgCreatePullRequestResponse = { id: 0, iid: 0 };
export const MsgCreatePullRequestResponse = {
    encode(message, writer = Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        if (message.iid !== 0) {
            writer.uint32(16).uint64(message.iid);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgCreatePullRequestResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = longToNumber(reader.uint64());
                    break;
                case 2:
                    message.iid = longToNumber(reader.uint64());
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
            ...baseMsgCreatePullRequestResponse,
        };
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
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        message.iid !== undefined && (obj.iid = message.iid);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgCreatePullRequestResponse,
        };
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
        return message;
    },
};
const baseMsgUpdatePullRequest = {
    creator: "",
    id: 0,
    title: "",
    description: "",
};
export const MsgUpdatePullRequest = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== 0) {
            writer.uint32(16).uint64(message.id);
        }
        if (message.title !== "") {
            writer.uint32(34).string(message.title);
        }
        if (message.description !== "") {
            writer.uint32(50).string(message.description);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpdatePullRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.id = longToNumber(reader.uint64());
                    break;
                case 4:
                    message.title = reader.string();
                    break;
                case 6:
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
        const message = { ...baseMsgUpdatePullRequest };
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
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        message.title !== undefined && (obj.title = message.title);
        message.description !== undefined &&
            (obj.description = message.description);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgUpdatePullRequest };
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
        return message;
    },
};
const baseMsgUpdatePullRequestResponse = {};
export const MsgUpdatePullRequestResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgUpdatePullRequestResponse,
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
            ...baseMsgUpdatePullRequestResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgUpdatePullRequestResponse,
        };
        return message;
    },
};
const baseMsgUpdatePullRequestTitle = { creator: "", id: 0, title: "" };
export const MsgUpdatePullRequestTitle = {
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
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgUpdatePullRequestTitle,
        };
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
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = {
            ...baseMsgUpdatePullRequestTitle,
        };
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
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        message.title !== undefined && (obj.title = message.title);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgUpdatePullRequestTitle,
        };
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
        return message;
    },
};
const baseMsgUpdatePullRequestTitleResponse = {};
export const MsgUpdatePullRequestTitleResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgUpdatePullRequestTitleResponse,
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
            ...baseMsgUpdatePullRequestTitleResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgUpdatePullRequestTitleResponse,
        };
        return message;
    },
};
const baseMsgUpdatePullRequestDescription = {
    creator: "",
    id: 0,
    description: "",
};
export const MsgUpdatePullRequestDescription = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== 0) {
            writer.uint32(16).uint64(message.id);
        }
        if (message.description !== "") {
            writer.uint32(26).string(message.description);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgUpdatePullRequestDescription,
        };
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
        const message = {
            ...baseMsgUpdatePullRequestDescription,
        };
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
        message.id !== undefined && (obj.id = message.id);
        message.description !== undefined &&
            (obj.description = message.description);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgUpdatePullRequestDescription,
        };
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
        if (object.description !== undefined && object.description !== null) {
            message.description = object.description;
        }
        else {
            message.description = "";
        }
        return message;
    },
};
const baseMsgUpdatePullRequestDescriptionResponse = {};
export const MsgUpdatePullRequestDescriptionResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgUpdatePullRequestDescriptionResponse,
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
            ...baseMsgUpdatePullRequestDescriptionResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgUpdatePullRequestDescriptionResponse,
        };
        return message;
    },
};
const baseMsgInvokeMergePullRequest = {
    creator: "",
    id: 0,
    provider: "",
};
export const MsgInvokeMergePullRequest = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== 0) {
            writer.uint32(16).uint64(message.id);
        }
        if (message.provider !== "") {
            writer.uint32(26).string(message.provider);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgInvokeMergePullRequest,
        };
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
                    message.provider = reader.string();
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
            ...baseMsgInvokeMergePullRequest,
        };
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
        if (object.provider !== undefined && object.provider !== null) {
            message.provider = String(object.provider);
        }
        else {
            message.provider = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        message.provider !== undefined && (obj.provider = message.provider);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgInvokeMergePullRequest,
        };
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
        if (object.provider !== undefined && object.provider !== null) {
            message.provider = object.provider;
        }
        else {
            message.provider = "";
        }
        return message;
    },
};
const baseMsgInvokeMergePullRequestResponse = {};
export const MsgInvokeMergePullRequestResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgInvokeMergePullRequestResponse,
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
            ...baseMsgInvokeMergePullRequestResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgInvokeMergePullRequestResponse,
        };
        return message;
    },
};
const baseMsgSetPullRequestState = {
    creator: "",
    id: 0,
    state: "",
    mergeCommitSha: "",
    taskId: 0,
};
export const MsgSetPullRequestState = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== 0) {
            writer.uint32(16).uint64(message.id);
        }
        if (message.state !== "") {
            writer.uint32(26).string(message.state);
        }
        if (message.mergeCommitSha !== "") {
            writer.uint32(34).string(message.mergeCommitSha);
        }
        if (message.taskId !== 0) {
            writer.uint32(40).uint64(message.taskId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgSetPullRequestState };
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
                    message.state = reader.string();
                    break;
                case 4:
                    message.mergeCommitSha = reader.string();
                    break;
                case 5:
                    message.taskId = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgSetPullRequestState };
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
        if (object.state !== undefined && object.state !== null) {
            message.state = String(object.state);
        }
        else {
            message.state = "";
        }
        if (object.mergeCommitSha !== undefined && object.mergeCommitSha !== null) {
            message.mergeCommitSha = String(object.mergeCommitSha);
        }
        else {
            message.mergeCommitSha = "";
        }
        if (object.taskId !== undefined && object.taskId !== null) {
            message.taskId = Number(object.taskId);
        }
        else {
            message.taskId = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        message.state !== undefined && (obj.state = message.state);
        message.mergeCommitSha !== undefined &&
            (obj.mergeCommitSha = message.mergeCommitSha);
        message.taskId !== undefined && (obj.taskId = message.taskId);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgSetPullRequestState };
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
        if (object.state !== undefined && object.state !== null) {
            message.state = object.state;
        }
        else {
            message.state = "";
        }
        if (object.mergeCommitSha !== undefined && object.mergeCommitSha !== null) {
            message.mergeCommitSha = object.mergeCommitSha;
        }
        else {
            message.mergeCommitSha = "";
        }
        if (object.taskId !== undefined && object.taskId !== null) {
            message.taskId = object.taskId;
        }
        else {
            message.taskId = 0;
        }
        return message;
    },
};
const baseMsgSetPullRequestStateResponse = { state: "" };
export const MsgSetPullRequestStateResponse = {
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
            ...baseMsgSetPullRequestStateResponse,
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
            ...baseMsgSetPullRequestStateResponse,
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
            ...baseMsgSetPullRequestStateResponse,
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
const baseMsgAddPullRequestReviewers = {
    creator: "",
    id: 0,
    reviewers: "",
};
export const MsgAddPullRequestReviewers = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== 0) {
            writer.uint32(16).uint64(message.id);
        }
        for (const v of message.reviewers) {
            writer.uint32(26).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgAddPullRequestReviewers,
        };
        message.reviewers = [];
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
                    message.reviewers.push(reader.string());
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
            ...baseMsgAddPullRequestReviewers,
        };
        message.reviewers = [];
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
        if (object.reviewers !== undefined && object.reviewers !== null) {
            for (const e of object.reviewers) {
                message.reviewers.push(String(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        if (message.reviewers) {
            obj.reviewers = message.reviewers.map((e) => e);
        }
        else {
            obj.reviewers = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgAddPullRequestReviewers,
        };
        message.reviewers = [];
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
        if (object.reviewers !== undefined && object.reviewers !== null) {
            for (const e of object.reviewers) {
                message.reviewers.push(e);
            }
        }
        return message;
    },
};
const baseMsgAddPullRequestReviewersResponse = {};
export const MsgAddPullRequestReviewersResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgAddPullRequestReviewersResponse,
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
            ...baseMsgAddPullRequestReviewersResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgAddPullRequestReviewersResponse,
        };
        return message;
    },
};
const baseMsgRemovePullRequestReviewers = {
    creator: "",
    id: 0,
    reviewers: "",
};
export const MsgRemovePullRequestReviewers = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== 0) {
            writer.uint32(16).uint64(message.id);
        }
        for (const v of message.reviewers) {
            writer.uint32(26).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgRemovePullRequestReviewers,
        };
        message.reviewers = [];
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
                    message.reviewers.push(reader.string());
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
            ...baseMsgRemovePullRequestReviewers,
        };
        message.reviewers = [];
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
        if (object.reviewers !== undefined && object.reviewers !== null) {
            for (const e of object.reviewers) {
                message.reviewers.push(String(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        if (message.reviewers) {
            obj.reviewers = message.reviewers.map((e) => e);
        }
        else {
            obj.reviewers = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgRemovePullRequestReviewers,
        };
        message.reviewers = [];
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
        if (object.reviewers !== undefined && object.reviewers !== null) {
            for (const e of object.reviewers) {
                message.reviewers.push(e);
            }
        }
        return message;
    },
};
const baseMsgRemovePullRequestReviewersResponse = {};
export const MsgRemovePullRequestReviewersResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgRemovePullRequestReviewersResponse,
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
            ...baseMsgRemovePullRequestReviewersResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgRemovePullRequestReviewersResponse,
        };
        return message;
    },
};
const baseMsgAddPullRequestAssignees = {
    creator: "",
    id: 0,
    assignees: "",
};
export const MsgAddPullRequestAssignees = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== 0) {
            writer.uint32(16).uint64(message.id);
        }
        for (const v of message.assignees) {
            writer.uint32(26).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgAddPullRequestAssignees,
        };
        message.assignees = [];
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
                    message.assignees.push(reader.string());
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
            ...baseMsgAddPullRequestAssignees,
        };
        message.assignees = [];
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
        if (object.assignees !== undefined && object.assignees !== null) {
            for (const e of object.assignees) {
                message.assignees.push(String(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        if (message.assignees) {
            obj.assignees = message.assignees.map((e) => e);
        }
        else {
            obj.assignees = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgAddPullRequestAssignees,
        };
        message.assignees = [];
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
        if (object.assignees !== undefined && object.assignees !== null) {
            for (const e of object.assignees) {
                message.assignees.push(e);
            }
        }
        return message;
    },
};
const baseMsgAddPullRequestAssigneesResponse = {};
export const MsgAddPullRequestAssigneesResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgAddPullRequestAssigneesResponse,
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
            ...baseMsgAddPullRequestAssigneesResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgAddPullRequestAssigneesResponse,
        };
        return message;
    },
};
const baseMsgRemovePullRequestAssignees = {
    creator: "",
    id: 0,
    assignees: "",
};
export const MsgRemovePullRequestAssignees = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== 0) {
            writer.uint32(16).uint64(message.id);
        }
        for (const v of message.assignees) {
            writer.uint32(26).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgRemovePullRequestAssignees,
        };
        message.assignees = [];
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
                    message.assignees.push(reader.string());
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
            ...baseMsgRemovePullRequestAssignees,
        };
        message.assignees = [];
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
        if (object.assignees !== undefined && object.assignees !== null) {
            for (const e of object.assignees) {
                message.assignees.push(String(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        if (message.assignees) {
            obj.assignees = message.assignees.map((e) => e);
        }
        else {
            obj.assignees = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgRemovePullRequestAssignees,
        };
        message.assignees = [];
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
        if (object.assignees !== undefined && object.assignees !== null) {
            for (const e of object.assignees) {
                message.assignees.push(e);
            }
        }
        return message;
    },
};
const baseMsgRemovePullRequestAssigneesResponse = {};
export const MsgRemovePullRequestAssigneesResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgRemovePullRequestAssigneesResponse,
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
            ...baseMsgRemovePullRequestAssigneesResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgRemovePullRequestAssigneesResponse,
        };
        return message;
    },
};
const baseMsgAddPullRequestLabels = {
    creator: "",
    pullRequestId: 0,
    labelIds: 0,
};
export const MsgAddPullRequestLabels = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.pullRequestId !== 0) {
            writer.uint32(16).uint64(message.pullRequestId);
        }
        writer.uint32(26).fork();
        for (const v of message.labelIds) {
            writer.uint64(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgAddPullRequestLabels,
        };
        message.labelIds = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.pullRequestId = longToNumber(reader.uint64());
                    break;
                case 3:
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
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = {
            ...baseMsgAddPullRequestLabels,
        };
        message.labelIds = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.pullRequestId !== undefined && object.pullRequestId !== null) {
            message.pullRequestId = Number(object.pullRequestId);
        }
        else {
            message.pullRequestId = 0;
        }
        if (object.labelIds !== undefined && object.labelIds !== null) {
            for (const e of object.labelIds) {
                message.labelIds.push(Number(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.pullRequestId !== undefined &&
            (obj.pullRequestId = message.pullRequestId);
        if (message.labelIds) {
            obj.labelIds = message.labelIds.map((e) => e);
        }
        else {
            obj.labelIds = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgAddPullRequestLabels,
        };
        message.labelIds = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.pullRequestId !== undefined && object.pullRequestId !== null) {
            message.pullRequestId = object.pullRequestId;
        }
        else {
            message.pullRequestId = 0;
        }
        if (object.labelIds !== undefined && object.labelIds !== null) {
            for (const e of object.labelIds) {
                message.labelIds.push(e);
            }
        }
        return message;
    },
};
const baseMsgAddPullRequestLabelsResponse = {};
export const MsgAddPullRequestLabelsResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgAddPullRequestLabelsResponse,
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
            ...baseMsgAddPullRequestLabelsResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgAddPullRequestLabelsResponse,
        };
        return message;
    },
};
const baseMsgRemovePullRequestLabels = {
    creator: "",
    pullRequestId: 0,
    labelIds: 0,
};
export const MsgRemovePullRequestLabels = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.pullRequestId !== 0) {
            writer.uint32(16).uint64(message.pullRequestId);
        }
        writer.uint32(26).fork();
        for (const v of message.labelIds) {
            writer.uint64(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgRemovePullRequestLabels,
        };
        message.labelIds = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.pullRequestId = longToNumber(reader.uint64());
                    break;
                case 3:
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
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = {
            ...baseMsgRemovePullRequestLabels,
        };
        message.labelIds = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.pullRequestId !== undefined && object.pullRequestId !== null) {
            message.pullRequestId = Number(object.pullRequestId);
        }
        else {
            message.pullRequestId = 0;
        }
        if (object.labelIds !== undefined && object.labelIds !== null) {
            for (const e of object.labelIds) {
                message.labelIds.push(Number(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.pullRequestId !== undefined &&
            (obj.pullRequestId = message.pullRequestId);
        if (message.labelIds) {
            obj.labelIds = message.labelIds.map((e) => e);
        }
        else {
            obj.labelIds = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgRemovePullRequestLabels,
        };
        message.labelIds = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.pullRequestId !== undefined && object.pullRequestId !== null) {
            message.pullRequestId = object.pullRequestId;
        }
        else {
            message.pullRequestId = 0;
        }
        if (object.labelIds !== undefined && object.labelIds !== null) {
            for (const e of object.labelIds) {
                message.labelIds.push(e);
            }
        }
        return message;
    },
};
const baseMsgRemovePullRequestLabelsResponse = {};
export const MsgRemovePullRequestLabelsResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgRemovePullRequestLabelsResponse,
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
            ...baseMsgRemovePullRequestLabelsResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgRemovePullRequestLabelsResponse,
        };
        return message;
    },
};
const baseMsgDeletePullRequest = { creator: "", id: 0 };
export const MsgDeletePullRequest = {
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
        const message = { ...baseMsgDeletePullRequest };
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
        const message = { ...baseMsgDeletePullRequest };
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
        const message = { ...baseMsgDeletePullRequest };
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
const baseMsgDeletePullRequestResponse = {};
export const MsgDeletePullRequestResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgDeletePullRequestResponse,
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
            ...baseMsgDeletePullRequestResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgDeletePullRequestResponse,
        };
        return message;
    },
};
const baseMsgCreateDao = {
    creator: "",
    name: "",
    description: "",
    avatarUrl: "",
    location: "",
    website: "",
};
export const MsgCreateDao = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.name !== "") {
            writer.uint32(18).string(message.name);
        }
        if (message.description !== "") {
            writer.uint32(26).string(message.description);
        }
        if (message.avatarUrl !== "") {
            writer.uint32(34).string(message.avatarUrl);
        }
        if (message.location !== "") {
            writer.uint32(42).string(message.location);
        }
        if (message.website !== "") {
            writer.uint32(50).string(message.website);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreateDao };
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
                    message.description = reader.string();
                    break;
                case 4:
                    message.avatarUrl = reader.string();
                    break;
                case 5:
                    message.location = reader.string();
                    break;
                case 6:
                    message.website = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgCreateDao };
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
        if (object.description !== undefined && object.description !== null) {
            message.description = String(object.description);
        }
        else {
            message.description = "";
        }
        if (object.avatarUrl !== undefined && object.avatarUrl !== null) {
            message.avatarUrl = String(object.avatarUrl);
        }
        else {
            message.avatarUrl = "";
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
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.name !== undefined && (obj.name = message.name);
        message.description !== undefined &&
            (obj.description = message.description);
        message.avatarUrl !== undefined && (obj.avatarUrl = message.avatarUrl);
        message.location !== undefined && (obj.location = message.location);
        message.website !== undefined && (obj.website = message.website);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgCreateDao };
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
        if (object.description !== undefined && object.description !== null) {
            message.description = object.description;
        }
        else {
            message.description = "";
        }
        if (object.avatarUrl !== undefined && object.avatarUrl !== null) {
            message.avatarUrl = object.avatarUrl;
        }
        else {
            message.avatarUrl = "";
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
        return message;
    },
};
const baseMsgCreateDaoResponse = { id: "" };
export const MsgCreateDaoResponse = {
    encode(message, writer = Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreateDaoResponse };
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
        const message = { ...baseMsgCreateDaoResponse };
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
        const message = { ...baseMsgCreateDaoResponse };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = "";
        }
        return message;
    },
};
const baseMsgRenameDao = { creator: "", id: "", name: "" };
export const MsgRenameDao = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== "") {
            writer.uint32(18).string(message.id);
        }
        if (message.name !== "") {
            writer.uint32(26).string(message.name);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgRenameDao };
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
        const message = { ...baseMsgRenameDao };
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
        const message = { ...baseMsgRenameDao };
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
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = "";
        }
        return message;
    },
};
const baseMsgRenameDaoResponse = {};
export const MsgRenameDaoResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgRenameDaoResponse };
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
        const message = { ...baseMsgRenameDaoResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgRenameDaoResponse };
        return message;
    },
};
const baseMsgUpdateDaoDescription = {
    creator: "",
    id: "",
    description: "",
};
export const MsgUpdateDaoDescription = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== "") {
            writer.uint32(18).string(message.id);
        }
        if (message.description !== "") {
            writer.uint32(26).string(message.description);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgUpdateDaoDescription,
        };
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
        const message = {
            ...baseMsgUpdateDaoDescription,
        };
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
        message.id !== undefined && (obj.id = message.id);
        message.description !== undefined &&
            (obj.description = message.description);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgUpdateDaoDescription,
        };
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
        if (object.description !== undefined && object.description !== null) {
            message.description = object.description;
        }
        else {
            message.description = "";
        }
        return message;
    },
};
const baseMsgUpdateDaoDescriptionResponse = {};
export const MsgUpdateDaoDescriptionResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgUpdateDaoDescriptionResponse,
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
            ...baseMsgUpdateDaoDescriptionResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgUpdateDaoDescriptionResponse,
        };
        return message;
    },
};
const baseMsgUpdateDaoWebsite = { creator: "", id: "", url: "" };
export const MsgUpdateDaoWebsite = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== "") {
            writer.uint32(18).string(message.id);
        }
        if (message.url !== "") {
            writer.uint32(26).string(message.url);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpdateDaoWebsite };
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
                    message.url = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgUpdateDaoWebsite };
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
        if (object.url !== undefined && object.url !== null) {
            message.url = String(object.url);
        }
        else {
            message.url = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        message.url !== undefined && (obj.url = message.url);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgUpdateDaoWebsite };
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
        if (object.url !== undefined && object.url !== null) {
            message.url = object.url;
        }
        else {
            message.url = "";
        }
        return message;
    },
};
const baseMsgUpdateDaoWebsiteResponse = {};
export const MsgUpdateDaoWebsiteResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgUpdateDaoWebsiteResponse,
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
            ...baseMsgUpdateDaoWebsiteResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgUpdateDaoWebsiteResponse,
        };
        return message;
    },
};
const baseMsgUpdateDaoLocation = { creator: "", id: "", location: "" };
export const MsgUpdateDaoLocation = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== "") {
            writer.uint32(18).string(message.id);
        }
        if (message.location !== "") {
            writer.uint32(26).string(message.location);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpdateDaoLocation };
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
                    message.location = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgUpdateDaoLocation };
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
        if (object.location !== undefined && object.location !== null) {
            message.location = String(object.location);
        }
        else {
            message.location = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        message.location !== undefined && (obj.location = message.location);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgUpdateDaoLocation };
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
        if (object.location !== undefined && object.location !== null) {
            message.location = object.location;
        }
        else {
            message.location = "";
        }
        return message;
    },
};
const baseMsgUpdateDaoLocationResponse = {};
export const MsgUpdateDaoLocationResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgUpdateDaoLocationResponse,
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
            ...baseMsgUpdateDaoLocationResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgUpdateDaoLocationResponse,
        };
        return message;
    },
};
const baseMsgUpdateDaoAvatar = { creator: "", id: "", url: "" };
export const MsgUpdateDaoAvatar = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== "") {
            writer.uint32(18).string(message.id);
        }
        if (message.url !== "") {
            writer.uint32(26).string(message.url);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpdateDaoAvatar };
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
                    message.url = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgUpdateDaoAvatar };
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
        if (object.url !== undefined && object.url !== null) {
            message.url = String(object.url);
        }
        else {
            message.url = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        message.url !== undefined && (obj.url = message.url);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgUpdateDaoAvatar };
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
        if (object.url !== undefined && object.url !== null) {
            message.url = object.url;
        }
        else {
            message.url = "";
        }
        return message;
    },
};
const baseMsgUpdateDaoAvatarResponse = {};
export const MsgUpdateDaoAvatarResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgUpdateDaoAvatarResponse,
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
            ...baseMsgUpdateDaoAvatarResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgUpdateDaoAvatarResponse,
        };
        return message;
    },
};
const baseMsgDeleteDao = { creator: "", id: "" };
export const MsgDeleteDao = {
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
        const message = { ...baseMsgDeleteDao };
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
        const message = { ...baseMsgDeleteDao };
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
        const message = { ...baseMsgDeleteDao };
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
const baseMsgDeleteDaoResponse = {};
export const MsgDeleteDaoResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgDeleteDaoResponse };
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
        const message = { ...baseMsgDeleteDaoResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgDeleteDaoResponse };
        return message;
    },
};
const baseMsgCreateComment = {
    creator: "",
    parentId: 0,
    body: "",
    attachments: "",
    diffHunk: "",
    path: "",
    system: false,
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
        if (message.authorAssociation !== "") {
            writer.uint32(66).string(message.authorAssociation);
        }
        if (message.commentType !== "") {
            writer.uint32(74).string(message.commentType);
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
                    message.authorAssociation = reader.string();
                    break;
                case 9:
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
    labelIds: 0,
    weight: 0,
    assignees: "",
};
export const MsgCreateIssue = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.repositoryId !== undefined) {
            RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
        }
        if (message.title !== "") {
            writer.uint32(26).string(message.title);
        }
        if (message.description !== "") {
            writer.uint32(34).string(message.description);
        }
        writer.uint32(42).fork();
        for (const v of message.labelIds) {
            writer.uint64(v);
        }
        writer.ldelim();
        if (message.weight !== 0) {
            writer.uint32(48).uint64(message.weight);
        }
        for (const v of message.assignees) {
            writer.uint32(58).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreateIssue };
        message.labelIds = [];
        message.assignees = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.repositoryId = RepositoryId.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.title = reader.string();
                    break;
                case 4:
                    message.description = reader.string();
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
                    message.weight = longToNumber(reader.uint64());
                    break;
                case 7:
                    message.assignees.push(reader.string());
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
        message.labelIds = [];
        message.assignees = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
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
        if (object.labelIds !== undefined && object.labelIds !== null) {
            for (const e of object.labelIds) {
                message.labelIds.push(Number(e));
            }
        }
        if (object.weight !== undefined && object.weight !== null) {
            message.weight = Number(object.weight);
        }
        else {
            message.weight = 0;
        }
        if (object.assignees !== undefined && object.assignees !== null) {
            for (const e of object.assignees) {
                message.assignees.push(String(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.repositoryId !== undefined &&
            (obj.repositoryId = message.repositoryId
                ? RepositoryId.toJSON(message.repositoryId)
                : undefined);
        message.title !== undefined && (obj.title = message.title);
        message.description !== undefined &&
            (obj.description = message.description);
        if (message.labelIds) {
            obj.labelIds = message.labelIds.map((e) => e);
        }
        else {
            obj.labelIds = [];
        }
        message.weight !== undefined && (obj.weight = message.weight);
        if (message.assignees) {
            obj.assignees = message.assignees.map((e) => e);
        }
        else {
            obj.assignees = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgCreateIssue };
        message.labelIds = [];
        message.assignees = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
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
        if (object.labelIds !== undefined && object.labelIds !== null) {
            for (const e of object.labelIds) {
                message.labelIds.push(e);
            }
        }
        if (object.weight !== undefined && object.weight !== null) {
            message.weight = object.weight;
        }
        else {
            message.weight = 0;
        }
        if (object.assignees !== undefined && object.assignees !== null) {
            for (const e of object.assignees) {
                message.assignees.push(e);
            }
        }
        return message;
    },
};
const baseMsgCreateIssueResponse = { id: 0, iid: 0 };
export const MsgCreateIssueResponse = {
    encode(message, writer = Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        if (message.iid !== 0) {
            writer.uint32(16).uint64(message.iid);
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
                case 2:
                    message.iid = longToNumber(reader.uint64());
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
        if (object.iid !== undefined && object.iid !== null) {
            message.iid = Number(object.iid);
        }
        else {
            message.iid = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        message.iid !== undefined && (obj.iid = message.iid);
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
        if (object.iid !== undefined && object.iid !== null) {
            message.iid = object.iid;
        }
        else {
            message.iid = 0;
        }
        return message;
    },
};
const baseMsgUpdateIssue = {
    creator: "",
    id: 0,
    title: "",
    description: "",
    weight: 0,
    assignees: "",
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
        if (message.weight !== 0) {
            writer.uint32(40).uint64(message.weight);
        }
        for (const v of message.assignees) {
            writer.uint32(50).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpdateIssue };
        message.assignees = [];
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
                    message.weight = longToNumber(reader.uint64());
                    break;
                case 6:
                    message.assignees.push(reader.string());
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
        message.assignees = [];
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
        if (object.weight !== undefined && object.weight !== null) {
            message.weight = Number(object.weight);
        }
        else {
            message.weight = 0;
        }
        if (object.assignees !== undefined && object.assignees !== null) {
            for (const e of object.assignees) {
                message.assignees.push(String(e));
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
        message.weight !== undefined && (obj.weight = message.weight);
        if (message.assignees) {
            obj.assignees = message.assignees.map((e) => e);
        }
        else {
            obj.assignees = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgUpdateIssue };
        message.assignees = [];
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
        if (object.weight !== undefined && object.weight !== null) {
            message.weight = object.weight;
        }
        else {
            message.weight = 0;
        }
        if (object.assignees !== undefined && object.assignees !== null) {
            for (const e of object.assignees) {
                message.assignees.push(e);
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
const baseMsgUpdateIssueTitle = { creator: "", id: 0, title: "" };
export const MsgUpdateIssueTitle = {
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
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpdateIssueTitle };
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
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgUpdateIssueTitle };
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
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        message.title !== undefined && (obj.title = message.title);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgUpdateIssueTitle };
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
        return message;
    },
};
const baseMsgUpdateIssueTitleResponse = {};
export const MsgUpdateIssueTitleResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgUpdateIssueTitleResponse,
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
            ...baseMsgUpdateIssueTitleResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgUpdateIssueTitleResponse,
        };
        return message;
    },
};
const baseMsgUpdateIssueDescription = {
    creator: "",
    id: 0,
    description: "",
};
export const MsgUpdateIssueDescription = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== 0) {
            writer.uint32(16).uint64(message.id);
        }
        if (message.description !== "") {
            writer.uint32(26).string(message.description);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgUpdateIssueDescription,
        };
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
        const message = {
            ...baseMsgUpdateIssueDescription,
        };
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
        message.id !== undefined && (obj.id = message.id);
        message.description !== undefined &&
            (obj.description = message.description);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgUpdateIssueDescription,
        };
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
        if (object.description !== undefined && object.description !== null) {
            message.description = object.description;
        }
        else {
            message.description = "";
        }
        return message;
    },
};
const baseMsgUpdateIssueDescriptionResponse = {};
export const MsgUpdateIssueDescriptionResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgUpdateIssueDescriptionResponse,
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
            ...baseMsgUpdateIssueDescriptionResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgUpdateIssueDescriptionResponse,
        };
        return message;
    },
};
const baseMsgToggleIssueState = { creator: "", id: 0 };
export const MsgToggleIssueState = {
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
        const message = { ...baseMsgToggleIssueState };
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
        const message = { ...baseMsgToggleIssueState };
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
        const message = { ...baseMsgToggleIssueState };
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
const baseMsgToggleIssueStateResponse = { state: "" };
export const MsgToggleIssueStateResponse = {
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
            ...baseMsgToggleIssueStateResponse,
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
            ...baseMsgToggleIssueStateResponse,
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
            ...baseMsgToggleIssueStateResponse,
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
const baseMsgAddIssueAssignees = { creator: "", id: 0, assignees: "" };
export const MsgAddIssueAssignees = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== 0) {
            writer.uint32(16).uint64(message.id);
        }
        for (const v of message.assignees) {
            writer.uint32(26).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgAddIssueAssignees };
        message.assignees = [];
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
                    message.assignees.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgAddIssueAssignees };
        message.assignees = [];
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
        if (object.assignees !== undefined && object.assignees !== null) {
            for (const e of object.assignees) {
                message.assignees.push(String(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        if (message.assignees) {
            obj.assignees = message.assignees.map((e) => e);
        }
        else {
            obj.assignees = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgAddIssueAssignees };
        message.assignees = [];
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
        if (object.assignees !== undefined && object.assignees !== null) {
            for (const e of object.assignees) {
                message.assignees.push(e);
            }
        }
        return message;
    },
};
const baseMsgAddIssueAssigneesResponse = {};
export const MsgAddIssueAssigneesResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgAddIssueAssigneesResponse,
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
            ...baseMsgAddIssueAssigneesResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgAddIssueAssigneesResponse,
        };
        return message;
    },
};
const baseMsgRemoveIssueAssignees = {
    creator: "",
    id: 0,
    assignees: "",
};
export const MsgRemoveIssueAssignees = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== 0) {
            writer.uint32(16).uint64(message.id);
        }
        for (const v of message.assignees) {
            writer.uint32(26).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgRemoveIssueAssignees,
        };
        message.assignees = [];
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
                    message.assignees.push(reader.string());
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
            ...baseMsgRemoveIssueAssignees,
        };
        message.assignees = [];
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
        if (object.assignees !== undefined && object.assignees !== null) {
            for (const e of object.assignees) {
                message.assignees.push(String(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        if (message.assignees) {
            obj.assignees = message.assignees.map((e) => e);
        }
        else {
            obj.assignees = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgRemoveIssueAssignees,
        };
        message.assignees = [];
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
        if (object.assignees !== undefined && object.assignees !== null) {
            for (const e of object.assignees) {
                message.assignees.push(e);
            }
        }
        return message;
    },
};
const baseMsgRemoveIssueAssigneesResponse = {};
export const MsgRemoveIssueAssigneesResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgRemoveIssueAssigneesResponse,
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
            ...baseMsgRemoveIssueAssigneesResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgRemoveIssueAssigneesResponse,
        };
        return message;
    },
};
const baseMsgAddIssueLabels = { creator: "", issueId: 0, labelIds: 0 };
export const MsgAddIssueLabels = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.issueId !== 0) {
            writer.uint32(16).uint64(message.issueId);
        }
        writer.uint32(26).fork();
        for (const v of message.labelIds) {
            writer.uint64(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgAddIssueLabels };
        message.labelIds = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.issueId = longToNumber(reader.uint64());
                    break;
                case 3:
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
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgAddIssueLabels };
        message.labelIds = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.issueId !== undefined && object.issueId !== null) {
            message.issueId = Number(object.issueId);
        }
        else {
            message.issueId = 0;
        }
        if (object.labelIds !== undefined && object.labelIds !== null) {
            for (const e of object.labelIds) {
                message.labelIds.push(Number(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.issueId !== undefined && (obj.issueId = message.issueId);
        if (message.labelIds) {
            obj.labelIds = message.labelIds.map((e) => e);
        }
        else {
            obj.labelIds = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgAddIssueLabels };
        message.labelIds = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.issueId !== undefined && object.issueId !== null) {
            message.issueId = object.issueId;
        }
        else {
            message.issueId = 0;
        }
        if (object.labelIds !== undefined && object.labelIds !== null) {
            for (const e of object.labelIds) {
                message.labelIds.push(e);
            }
        }
        return message;
    },
};
const baseMsgAddIssueLabelsResponse = {};
export const MsgAddIssueLabelsResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgAddIssueLabelsResponse,
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
            ...baseMsgAddIssueLabelsResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgAddIssueLabelsResponse,
        };
        return message;
    },
};
const baseMsgRemoveIssueLabels = {
    creator: "",
    issueId: 0,
    labelIds: 0,
};
export const MsgRemoveIssueLabels = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.issueId !== 0) {
            writer.uint32(16).uint64(message.issueId);
        }
        writer.uint32(26).fork();
        for (const v of message.labelIds) {
            writer.uint64(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgRemoveIssueLabels };
        message.labelIds = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.issueId = longToNumber(reader.uint64());
                    break;
                case 3:
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
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgRemoveIssueLabels };
        message.labelIds = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.issueId !== undefined && object.issueId !== null) {
            message.issueId = Number(object.issueId);
        }
        else {
            message.issueId = 0;
        }
        if (object.labelIds !== undefined && object.labelIds !== null) {
            for (const e of object.labelIds) {
                message.labelIds.push(Number(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.issueId !== undefined && (obj.issueId = message.issueId);
        if (message.labelIds) {
            obj.labelIds = message.labelIds.map((e) => e);
        }
        else {
            obj.labelIds = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgRemoveIssueLabels };
        message.labelIds = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.issueId !== undefined && object.issueId !== null) {
            message.issueId = object.issueId;
        }
        else {
            message.issueId = 0;
        }
        if (object.labelIds !== undefined && object.labelIds !== null) {
            for (const e of object.labelIds) {
                message.labelIds.push(e);
            }
        }
        return message;
    },
};
const baseMsgRemoveIssueLabelsResponse = {};
export const MsgRemoveIssueLabelsResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgRemoveIssueLabelsResponse,
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
            ...baseMsgRemoveIssueLabelsResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgRemoveIssueLabelsResponse,
        };
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
const baseMsgCreateRepositoryResponse = {};
export const MsgCreateRepositoryResponse = {
    encode(message, writer = Writer.create()) {
        if (message.repositoryId !== undefined) {
            RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
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
                case 2:
                    message.repositoryId = RepositoryId.decode(reader, reader.uint32());
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
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.repositoryId !== undefined &&
            (obj.repositoryId = message.repositoryId
                ? RepositoryId.toJSON(message.repositoryId)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgCreateRepositoryResponse,
        };
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        return message;
    },
};
const baseMsgInvokeForkRepository = {
    creator: "",
    owner: "",
    provider: "",
};
export const MsgInvokeForkRepository = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.repositoryId !== undefined) {
            RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
        }
        if (message.owner !== "") {
            writer.uint32(26).string(message.owner);
        }
        if (message.provider !== "") {
            writer.uint32(34).string(message.provider);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgInvokeForkRepository,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.repositoryId = RepositoryId.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.owner = reader.string();
                    break;
                case 4:
                    message.provider = reader.string();
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
            ...baseMsgInvokeForkRepository,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = String(object.owner);
        }
        else {
            message.owner = "";
        }
        if (object.provider !== undefined && object.provider !== null) {
            message.provider = String(object.provider);
        }
        else {
            message.provider = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.repositoryId !== undefined &&
            (obj.repositoryId = message.repositoryId
                ? RepositoryId.toJSON(message.repositoryId)
                : undefined);
        message.owner !== undefined && (obj.owner = message.owner);
        message.provider !== undefined && (obj.provider = message.provider);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgInvokeForkRepository,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = object.owner;
        }
        else {
            message.owner = "";
        }
        if (object.provider !== undefined && object.provider !== null) {
            message.provider = object.provider;
        }
        else {
            message.provider = "";
        }
        return message;
    },
};
const baseMsgInvokeForkRepositoryResponse = {};
export const MsgInvokeForkRepositoryResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgInvokeForkRepositoryResponse,
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
            ...baseMsgInvokeForkRepositoryResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgInvokeForkRepositoryResponse,
        };
        return message;
    },
};
const baseMsgForkRepository = { creator: "", owner: "", taskId: 0 };
export const MsgForkRepository = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.repositoryId !== undefined) {
            RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
        }
        if (message.owner !== "") {
            writer.uint32(26).string(message.owner);
        }
        if (message.taskId !== 0) {
            writer.uint32(32).uint64(message.taskId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgForkRepository };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.repositoryId = RepositoryId.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.owner = reader.string();
                    break;
                case 4:
                    message.taskId = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgForkRepository };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = String(object.owner);
        }
        else {
            message.owner = "";
        }
        if (object.taskId !== undefined && object.taskId !== null) {
            message.taskId = Number(object.taskId);
        }
        else {
            message.taskId = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.repositoryId !== undefined &&
            (obj.repositoryId = message.repositoryId
                ? RepositoryId.toJSON(message.repositoryId)
                : undefined);
        message.owner !== undefined && (obj.owner = message.owner);
        message.taskId !== undefined && (obj.taskId = message.taskId);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgForkRepository };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = object.owner;
        }
        else {
            message.owner = "";
        }
        if (object.taskId !== undefined && object.taskId !== null) {
            message.taskId = object.taskId;
        }
        else {
            message.taskId = 0;
        }
        return message;
    },
};
const baseMsgForkRepositoryResponse = { id: 0 };
export const MsgForkRepositoryResponse = {
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
            ...baseMsgForkRepositoryResponse,
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
            ...baseMsgForkRepositoryResponse,
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
            ...baseMsgForkRepositoryResponse,
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
const baseMsgForkRepositorySuccess = { creator: "", taskId: 0 };
export const MsgForkRepositorySuccess = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.repositoryId !== undefined) {
            RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
        }
        if (message.taskId !== 0) {
            writer.uint32(24).uint64(message.taskId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgForkRepositorySuccess,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.repositoryId = RepositoryId.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.taskId = longToNumber(reader.uint64());
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
            ...baseMsgForkRepositorySuccess,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.taskId !== undefined && object.taskId !== null) {
            message.taskId = Number(object.taskId);
        }
        else {
            message.taskId = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.repositoryId !== undefined &&
            (obj.repositoryId = message.repositoryId
                ? RepositoryId.toJSON(message.repositoryId)
                : undefined);
        message.taskId !== undefined && (obj.taskId = message.taskId);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgForkRepositorySuccess,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.taskId !== undefined && object.taskId !== null) {
            message.taskId = object.taskId;
        }
        else {
            message.taskId = 0;
        }
        return message;
    },
};
const baseMsgForkRepositorySuccessResponse = { id: 0 };
export const MsgForkRepositorySuccessResponse = {
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
            ...baseMsgForkRepositorySuccessResponse,
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
            ...baseMsgForkRepositorySuccessResponse,
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
            ...baseMsgForkRepositorySuccessResponse,
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
const baseMsgRenameRepository = { creator: "", name: "" };
export const MsgRenameRepository = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.repositoryId !== undefined) {
            RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
        }
        if (message.name !== "") {
            writer.uint32(26).string(message.name);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgRenameRepository };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.repositoryId = RepositoryId.decode(reader, reader.uint32());
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
        const message = { ...baseMsgRenameRepository };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
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
        message.repositoryId !== undefined &&
            (obj.repositoryId = message.repositoryId
                ? RepositoryId.toJSON(message.repositoryId)
                : undefined);
        message.name !== undefined && (obj.name = message.name);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgRenameRepository };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
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
const baseMsgRenameRepositoryResponse = {};
export const MsgRenameRepositoryResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgRenameRepositoryResponse,
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
            ...baseMsgRenameRepositoryResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgRenameRepositoryResponse,
        };
        return message;
    },
};
const baseMsgUpdateRepositoryDescription = {
    creator: "",
    description: "",
};
export const MsgUpdateRepositoryDescription = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.repositoryId !== undefined) {
            RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
        }
        if (message.description !== "") {
            writer.uint32(26).string(message.description);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgUpdateRepositoryDescription,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.repositoryId = RepositoryId.decode(reader, reader.uint32());
                    break;
                case 3:
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
        const message = {
            ...baseMsgUpdateRepositoryDescription,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
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
        message.repositoryId !== undefined &&
            (obj.repositoryId = message.repositoryId
                ? RepositoryId.toJSON(message.repositoryId)
                : undefined);
        message.description !== undefined &&
            (obj.description = message.description);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgUpdateRepositoryDescription,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
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
const baseMsgUpdateRepositoryDescriptionResponse = {};
export const MsgUpdateRepositoryDescriptionResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgUpdateRepositoryDescriptionResponse,
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
            ...baseMsgUpdateRepositoryDescriptionResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgUpdateRepositoryDescriptionResponse,
        };
        return message;
    },
};
const baseMsgChangeOwner = { creator: "", owner: "" };
export const MsgChangeOwner = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.repositoryId !== undefined) {
            RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
        }
        if (message.owner !== "") {
            writer.uint32(26).string(message.owner);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgChangeOwner };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.repositoryId = RepositoryId.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.owner = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgChangeOwner };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = String(object.owner);
        }
        else {
            message.owner = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.repositoryId !== undefined &&
            (obj.repositoryId = message.repositoryId
                ? RepositoryId.toJSON(message.repositoryId)
                : undefined);
        message.owner !== undefined && (obj.owner = message.owner);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgChangeOwner };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = object.owner;
        }
        else {
            message.owner = "";
        }
        return message;
    },
};
const baseMsgChangeOwnerResponse = {};
export const MsgChangeOwnerResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgChangeOwnerResponse };
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
        const message = { ...baseMsgChangeOwnerResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgChangeOwnerResponse };
        return message;
    },
};
const baseMsgUpdateRepositoryCollaborator = {
    creator: "",
    user: "",
    role: "",
};
export const MsgUpdateRepositoryCollaborator = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.repositoryId !== undefined) {
            RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
        }
        if (message.user !== "") {
            writer.uint32(26).string(message.user);
        }
        if (message.role !== "") {
            writer.uint32(34).string(message.role);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgUpdateRepositoryCollaborator,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.repositoryId = RepositoryId.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.user = reader.string();
                    break;
                case 4:
                    message.role = reader.string();
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
            ...baseMsgUpdateRepositoryCollaborator,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.user !== undefined && object.user !== null) {
            message.user = String(object.user);
        }
        else {
            message.user = "";
        }
        if (object.role !== undefined && object.role !== null) {
            message.role = String(object.role);
        }
        else {
            message.role = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.repositoryId !== undefined &&
            (obj.repositoryId = message.repositoryId
                ? RepositoryId.toJSON(message.repositoryId)
                : undefined);
        message.user !== undefined && (obj.user = message.user);
        message.role !== undefined && (obj.role = message.role);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgUpdateRepositoryCollaborator,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.user !== undefined && object.user !== null) {
            message.user = object.user;
        }
        else {
            message.user = "";
        }
        if (object.role !== undefined && object.role !== null) {
            message.role = object.role;
        }
        else {
            message.role = "";
        }
        return message;
    },
};
const baseMsgUpdateRepositoryCollaboratorResponse = {};
export const MsgUpdateRepositoryCollaboratorResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgUpdateRepositoryCollaboratorResponse,
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
            ...baseMsgUpdateRepositoryCollaboratorResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgUpdateRepositoryCollaboratorResponse,
        };
        return message;
    },
};
const baseMsgRemoveRepositoryCollaborator = { creator: "", user: "" };
export const MsgRemoveRepositoryCollaborator = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.repositoryId !== undefined) {
            RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
        }
        if (message.user !== "") {
            writer.uint32(26).string(message.user);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgRemoveRepositoryCollaborator,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.repositoryId = RepositoryId.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.user = reader.string();
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
            ...baseMsgRemoveRepositoryCollaborator,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.user !== undefined && object.user !== null) {
            message.user = String(object.user);
        }
        else {
            message.user = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.repositoryId !== undefined &&
            (obj.repositoryId = message.repositoryId
                ? RepositoryId.toJSON(message.repositoryId)
                : undefined);
        message.user !== undefined && (obj.user = message.user);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgRemoveRepositoryCollaborator,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.user !== undefined && object.user !== null) {
            message.user = object.user;
        }
        else {
            message.user = "";
        }
        return message;
    },
};
const baseMsgRemoveRepositoryCollaboratorResponse = {};
export const MsgRemoveRepositoryCollaboratorResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgRemoveRepositoryCollaboratorResponse,
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
            ...baseMsgRemoveRepositoryCollaboratorResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgRemoveRepositoryCollaboratorResponse,
        };
        return message;
    },
};
const baseMsgCreateRepositoryLabel = {
    creator: "",
    name: "",
    color: "",
    description: "",
};
export const MsgCreateRepositoryLabel = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.repositoryId !== undefined) {
            RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
        }
        if (message.name !== "") {
            writer.uint32(26).string(message.name);
        }
        if (message.color !== "") {
            writer.uint32(34).string(message.color);
        }
        if (message.description !== "") {
            writer.uint32(42).string(message.description);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgCreateRepositoryLabel,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.repositoryId = RepositoryId.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.name = reader.string();
                    break;
                case 4:
                    message.color = reader.string();
                    break;
                case 5:
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
        const message = {
            ...baseMsgCreateRepositoryLabel,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = "";
        }
        if (object.color !== undefined && object.color !== null) {
            message.color = String(object.color);
        }
        else {
            message.color = "";
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
        message.repositoryId !== undefined &&
            (obj.repositoryId = message.repositoryId
                ? RepositoryId.toJSON(message.repositoryId)
                : undefined);
        message.name !== undefined && (obj.name = message.name);
        message.color !== undefined && (obj.color = message.color);
        message.description !== undefined &&
            (obj.description = message.description);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgCreateRepositoryLabel,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = "";
        }
        if (object.color !== undefined && object.color !== null) {
            message.color = object.color;
        }
        else {
            message.color = "";
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
const baseMsgCreateRepositoryLabelResponse = { id: 0 };
export const MsgCreateRepositoryLabelResponse = {
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
            ...baseMsgCreateRepositoryLabelResponse,
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
            ...baseMsgCreateRepositoryLabelResponse,
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
            ...baseMsgCreateRepositoryLabelResponse,
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
const baseMsgUpdateRepositoryLabel = {
    creator: "",
    labelId: 0,
    name: "",
    color: "",
    description: "",
};
export const MsgUpdateRepositoryLabel = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.repositoryId !== undefined) {
            RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
        }
        if (message.labelId !== 0) {
            writer.uint32(24).uint64(message.labelId);
        }
        if (message.name !== "") {
            writer.uint32(34).string(message.name);
        }
        if (message.color !== "") {
            writer.uint32(42).string(message.color);
        }
        if (message.description !== "") {
            writer.uint32(50).string(message.description);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgUpdateRepositoryLabel,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.repositoryId = RepositoryId.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.labelId = longToNumber(reader.uint64());
                    break;
                case 4:
                    message.name = reader.string();
                    break;
                case 5:
                    message.color = reader.string();
                    break;
                case 6:
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
        const message = {
            ...baseMsgUpdateRepositoryLabel,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.labelId !== undefined && object.labelId !== null) {
            message.labelId = Number(object.labelId);
        }
        else {
            message.labelId = 0;
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = "";
        }
        if (object.color !== undefined && object.color !== null) {
            message.color = String(object.color);
        }
        else {
            message.color = "";
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
        message.repositoryId !== undefined &&
            (obj.repositoryId = message.repositoryId
                ? RepositoryId.toJSON(message.repositoryId)
                : undefined);
        message.labelId !== undefined && (obj.labelId = message.labelId);
        message.name !== undefined && (obj.name = message.name);
        message.color !== undefined && (obj.color = message.color);
        message.description !== undefined &&
            (obj.description = message.description);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgUpdateRepositoryLabel,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.labelId !== undefined && object.labelId !== null) {
            message.labelId = object.labelId;
        }
        else {
            message.labelId = 0;
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = "";
        }
        if (object.color !== undefined && object.color !== null) {
            message.color = object.color;
        }
        else {
            message.color = "";
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
const baseMsgUpdateRepositoryLabelResponse = {};
export const MsgUpdateRepositoryLabelResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgUpdateRepositoryLabelResponse,
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
            ...baseMsgUpdateRepositoryLabelResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgUpdateRepositoryLabelResponse,
        };
        return message;
    },
};
const baseMsgDeleteRepositoryLabel = { creator: "", labelId: 0 };
export const MsgDeleteRepositoryLabel = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.repositoryId !== undefined) {
            RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
        }
        if (message.labelId !== 0) {
            writer.uint32(24).uint64(message.labelId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgDeleteRepositoryLabel,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.repositoryId = RepositoryId.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.labelId = longToNumber(reader.uint64());
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
            ...baseMsgDeleteRepositoryLabel,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.labelId !== undefined && object.labelId !== null) {
            message.labelId = Number(object.labelId);
        }
        else {
            message.labelId = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.repositoryId !== undefined &&
            (obj.repositoryId = message.repositoryId
                ? RepositoryId.toJSON(message.repositoryId)
                : undefined);
        message.labelId !== undefined && (obj.labelId = message.labelId);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgDeleteRepositoryLabel,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        if (object.labelId !== undefined && object.labelId !== null) {
            message.labelId = object.labelId;
        }
        else {
            message.labelId = 0;
        }
        return message;
    },
};
const baseMsgDeleteRepositoryLabelResponse = {};
export const MsgDeleteRepositoryLabelResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgDeleteRepositoryLabelResponse,
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
            ...baseMsgDeleteRepositoryLabelResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgDeleteRepositoryLabelResponse,
        };
        return message;
    },
};
const baseMsgToggleRepositoryForking = { creator: "" };
export const MsgToggleRepositoryForking = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.repositoryId !== undefined) {
            RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgToggleRepositoryForking,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.repositoryId = RepositoryId.decode(reader, reader.uint32());
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
            ...baseMsgToggleRepositoryForking,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.repositoryId !== undefined &&
            (obj.repositoryId = message.repositoryId
                ? RepositoryId.toJSON(message.repositoryId)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgToggleRepositoryForking,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        return message;
    },
};
const baseMsgToggleRepositoryForkingResponse = { allowForking: false };
export const MsgToggleRepositoryForkingResponse = {
    encode(message, writer = Writer.create()) {
        if (message.allowForking === true) {
            writer.uint32(8).bool(message.allowForking);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgToggleRepositoryForkingResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.allowForking = reader.bool();
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
            ...baseMsgToggleRepositoryForkingResponse,
        };
        if (object.allowForking !== undefined && object.allowForking !== null) {
            message.allowForking = Boolean(object.allowForking);
        }
        else {
            message.allowForking = false;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.allowForking !== undefined &&
            (obj.allowForking = message.allowForking);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgToggleRepositoryForkingResponse,
        };
        if (object.allowForking !== undefined && object.allowForking !== null) {
            message.allowForking = object.allowForking;
        }
        else {
            message.allowForking = false;
        }
        return message;
    },
};
const baseMsgDeleteRepository = { creator: "" };
export const MsgDeleteRepository = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.repositoryId !== undefined) {
            RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
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
                    message.repositoryId = RepositoryId.decode(reader, reader.uint32());
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
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.repositoryId !== undefined &&
            (obj.repositoryId = message.repositoryId
                ? RepositoryId.toJSON(message.repositoryId)
                : undefined);
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
        if (object.repositoryId !== undefined && object.repositoryId !== null) {
            message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
        }
        else {
            message.repositoryId = undefined;
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
    name: "",
    avatarUrl: "",
    bio: "",
};
export const MsgCreateUser = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.username !== "") {
            writer.uint32(18).string(message.username);
        }
        if (message.name !== "") {
            writer.uint32(26).string(message.name);
        }
        if (message.avatarUrl !== "") {
            writer.uint32(34).string(message.avatarUrl);
        }
        if (message.bio !== "") {
            writer.uint32(42).string(message.bio);
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
                    message.name = reader.string();
                    break;
                case 4:
                    message.avatarUrl = reader.string();
                    break;
                case 5:
                    message.bio = reader.string();
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
        if (object.bio !== undefined && object.bio !== null) {
            message.bio = String(object.bio);
        }
        else {
            message.bio = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.username !== undefined && (obj.username = message.username);
        message.name !== undefined && (obj.name = message.name);
        message.avatarUrl !== undefined && (obj.avatarUrl = message.avatarUrl);
        message.bio !== undefined && (obj.bio = message.bio);
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
        if (object.bio !== undefined && object.bio !== null) {
            message.bio = object.bio;
        }
        else {
            message.bio = "";
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
const baseMsgUpdateUserUsername = { creator: "", username: "" };
export const MsgUpdateUserUsername = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.username !== "") {
            writer.uint32(18).string(message.username);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpdateUserUsername };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.username = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgUpdateUserUsername };
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
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.username !== undefined && (obj.username = message.username);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgUpdateUserUsername };
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
        return message;
    },
};
const baseMsgUpdateUserUsernameResponse = {};
export const MsgUpdateUserUsernameResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgUpdateUserUsernameResponse,
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
            ...baseMsgUpdateUserUsernameResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgUpdateUserUsernameResponse,
        };
        return message;
    },
};
const baseMsgUpdateUserName = { creator: "", name: "" };
export const MsgUpdateUserName = {
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
        const message = { ...baseMsgUpdateUserName };
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
        const message = { ...baseMsgUpdateUserName };
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
        const message = { ...baseMsgUpdateUserName };
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
const baseMsgUpdateUserNameResponse = {};
export const MsgUpdateUserNameResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgUpdateUserNameResponse,
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
            ...baseMsgUpdateUserNameResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgUpdateUserNameResponse,
        };
        return message;
    },
};
const baseMsgUpdateUserBio = { creator: "", bio: "" };
export const MsgUpdateUserBio = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.bio !== "") {
            writer.uint32(18).string(message.bio);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpdateUserBio };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.bio = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgUpdateUserBio };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.bio !== undefined && object.bio !== null) {
            message.bio = String(object.bio);
        }
        else {
            message.bio = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.bio !== undefined && (obj.bio = message.bio);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgUpdateUserBio };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.bio !== undefined && object.bio !== null) {
            message.bio = object.bio;
        }
        else {
            message.bio = "";
        }
        return message;
    },
};
const baseMsgUpdateUserBioResponse = {};
export const MsgUpdateUserBioResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgUpdateUserBioResponse,
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
            ...baseMsgUpdateUserBioResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgUpdateUserBioResponse,
        };
        return message;
    },
};
const baseMsgUpdateUserAvatar = { creator: "", url: "" };
export const MsgUpdateUserAvatar = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.url !== "") {
            writer.uint32(18).string(message.url);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpdateUserAvatar };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.url = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgUpdateUserAvatar };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.url !== undefined && object.url !== null) {
            message.url = String(object.url);
        }
        else {
            message.url = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.url !== undefined && (obj.url = message.url);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgUpdateUserAvatar };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.url !== undefined && object.url !== null) {
            message.url = object.url;
        }
        else {
            message.url = "";
        }
        return message;
    },
};
const baseMsgUpdateUserAvatarResponse = {};
export const MsgUpdateUserAvatarResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgUpdateUserAvatarResponse,
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
            ...baseMsgUpdateUserAvatarResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgUpdateUserAvatarResponse,
        };
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
export class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    RevokeStorageProviderPermissions(request) {
        const data = MsgRevokeStorageProviderPermissions.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "RevokeStorageProviderPermissions", data);
        return promise.then((data) => MsgRevokeStorageProviderPermissionsResponse.decode(new Reader(data)));
    }
    AuthorizeStorageProvider(request) {
        const data = MsgAuthorizeStorageProvider.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "AuthorizeStorageProvider", data);
        return promise.then((data) => MsgAuthorizeStorageProviderResponse.decode(new Reader(data)));
    }
    RevokeGitServerPermissions(request) {
        const data = MsgRevokeGitServerPermissions.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "RevokeGitServerPermissions", data);
        return promise.then((data) => MsgRevokeGitServerPermissionsResponse.decode(new Reader(data)));
    }
    AuthorizeGitServer(request) {
        const data = MsgAuthorizeGitServer.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "AuthorizeGitServer", data);
        return promise.then((data) => MsgAuthorizeGitServerResponse.decode(new Reader(data)));
    }
    CreateTask(request) {
        const data = MsgCreateTask.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "CreateTask", data);
        return promise.then((data) => MsgCreateTaskResponse.decode(new Reader(data)));
    }
    UpdateTask(request) {
        const data = MsgUpdateTask.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateTask", data);
        return promise.then((data) => MsgUpdateTaskResponse.decode(new Reader(data)));
    }
    DeleteTask(request) {
        const data = MsgDeleteTask.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "DeleteTask", data);
        return promise.then((data) => MsgDeleteTaskResponse.decode(new Reader(data)));
    }
    SetBranch(request) {
        const data = MsgSetBranch.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "SetBranch", data);
        return promise.then((data) => MsgSetBranchResponse.decode(new Reader(data)));
    }
    MultiSetBranch(request) {
        const data = MsgMultiSetBranch.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "MultiSetBranch", data);
        return promise.then((data) => MsgMultiSetBranchResponse.decode(new Reader(data)));
    }
    DeleteBranch(request) {
        const data = MsgDeleteBranch.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "DeleteBranch", data);
        return promise.then((data) => MsgDeleteBranchResponse.decode(new Reader(data)));
    }
    MultiDeleteBranch(request) {
        const data = MsgMultiDeleteBranch.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "MultiDeleteBranch", data);
        return promise.then((data) => MsgMultiDeleteBranchResponse.decode(new Reader(data)));
    }
    SetTag(request) {
        const data = MsgSetTag.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "SetTag", data);
        return promise.then((data) => MsgSetTagResponse.decode(new Reader(data)));
    }
    MultiSetTag(request) {
        const data = MsgMultiSetTag.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "MultiSetTag", data);
        return promise.then((data) => MsgMultiSetTagResponse.decode(new Reader(data)));
    }
    DeleteTag(request) {
        const data = MsgDeleteTag.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "DeleteTag", data);
        return promise.then((data) => MsgDeleteTagResponse.decode(new Reader(data)));
    }
    MultiDeleteTag(request) {
        const data = MsgMultiDeleteTag.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "MultiDeleteTag", data);
        return promise.then((data) => MsgMultiDeleteTagResponse.decode(new Reader(data)));
    }
    AddMember(request) {
        const data = MsgAddMember.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "AddMember", data);
        return promise.then((data) => MsgAddMemberResponse.decode(new Reader(data)));
    }
    UpdateMemberRole(request) {
        const data = MsgUpdateMemberRole.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateMemberRole", data);
        return promise.then((data) => MsgUpdateMemberRoleResponse.decode(new Reader(data)));
    }
    RemoveMember(request) {
        const data = MsgRemoveMember.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "RemoveMember", data);
        return promise.then((data) => MsgRemoveMemberResponse.decode(new Reader(data)));
    }
    CreateRelease(request) {
        const data = MsgCreateRelease.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "CreateRelease", data);
        return promise.then((data) => MsgCreateReleaseResponse.decode(new Reader(data)));
    }
    UpdateRelease(request) {
        const data = MsgUpdateRelease.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateRelease", data);
        return promise.then((data) => MsgUpdateReleaseResponse.decode(new Reader(data)));
    }
    DeleteRelease(request) {
        const data = MsgDeleteRelease.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "DeleteRelease", data);
        return promise.then((data) => MsgDeleteReleaseResponse.decode(new Reader(data)));
    }
    CreatePullRequest(request) {
        const data = MsgCreatePullRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "CreatePullRequest", data);
        return promise.then((data) => MsgCreatePullRequestResponse.decode(new Reader(data)));
    }
    UpdatePullRequest(request) {
        const data = MsgUpdatePullRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdatePullRequest", data);
        return promise.then((data) => MsgUpdatePullRequestResponse.decode(new Reader(data)));
    }
    UpdatePullRequestTitle(request) {
        const data = MsgUpdatePullRequestTitle.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdatePullRequestTitle", data);
        return promise.then((data) => MsgUpdatePullRequestTitleResponse.decode(new Reader(data)));
    }
    UpdatePullRequestDescription(request) {
        const data = MsgUpdatePullRequestDescription.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdatePullRequestDescription", data);
        return promise.then((data) => MsgUpdatePullRequestDescriptionResponse.decode(new Reader(data)));
    }
    InvokeMergePullRequest(request) {
        const data = MsgInvokeMergePullRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "InvokeMergePullRequest", data);
        return promise.then((data) => MsgInvokeMergePullRequestResponse.decode(new Reader(data)));
    }
    SetPullRequestState(request) {
        const data = MsgSetPullRequestState.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "SetPullRequestState", data);
        return promise.then((data) => MsgSetPullRequestStateResponse.decode(new Reader(data)));
    }
    AddPullRequestReviewers(request) {
        const data = MsgAddPullRequestReviewers.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "AddPullRequestReviewers", data);
        return promise.then((data) => MsgAddPullRequestReviewersResponse.decode(new Reader(data)));
    }
    RemovePullRequestReviewers(request) {
        const data = MsgRemovePullRequestReviewers.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "RemovePullRequestReviewers", data);
        return promise.then((data) => MsgRemovePullRequestReviewersResponse.decode(new Reader(data)));
    }
    AddPullRequestAssignees(request) {
        const data = MsgAddPullRequestAssignees.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "AddPullRequestAssignees", data);
        return promise.then((data) => MsgAddPullRequestAssigneesResponse.decode(new Reader(data)));
    }
    RemovePullRequestAssignees(request) {
        const data = MsgRemovePullRequestAssignees.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "RemovePullRequestAssignees", data);
        return promise.then((data) => MsgRemovePullRequestAssigneesResponse.decode(new Reader(data)));
    }
    AddPullRequestLabels(request) {
        const data = MsgAddPullRequestLabels.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "AddPullRequestLabels", data);
        return promise.then((data) => MsgAddPullRequestLabelsResponse.decode(new Reader(data)));
    }
    RemovePullRequestLabels(request) {
        const data = MsgRemovePullRequestLabels.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "RemovePullRequestLabels", data);
        return promise.then((data) => MsgRemovePullRequestLabelsResponse.decode(new Reader(data)));
    }
    DeletePullRequest(request) {
        const data = MsgDeletePullRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "DeletePullRequest", data);
        return promise.then((data) => MsgDeletePullRequestResponse.decode(new Reader(data)));
    }
    CreateDao(request) {
        const data = MsgCreateDao.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "CreateDao", data);
        return promise.then((data) => MsgCreateDaoResponse.decode(new Reader(data)));
    }
    RenameDao(request) {
        const data = MsgRenameDao.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "RenameDao", data);
        return promise.then((data) => MsgRenameDaoResponse.decode(new Reader(data)));
    }
    UpdateDaoDescription(request) {
        const data = MsgUpdateDaoDescription.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateDaoDescription", data);
        return promise.then((data) => MsgUpdateDaoDescriptionResponse.decode(new Reader(data)));
    }
    UpdateDaoWebsite(request) {
        const data = MsgUpdateDaoWebsite.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateDaoWebsite", data);
        return promise.then((data) => MsgUpdateDaoWebsiteResponse.decode(new Reader(data)));
    }
    UpdateDaoLocation(request) {
        const data = MsgUpdateDaoLocation.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateDaoLocation", data);
        return promise.then((data) => MsgUpdateDaoLocationResponse.decode(new Reader(data)));
    }
    UpdateDaoAvatar(request) {
        const data = MsgUpdateDaoAvatar.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateDaoAvatar", data);
        return promise.then((data) => MsgUpdateDaoAvatarResponse.decode(new Reader(data)));
    }
    DeleteDao(request) {
        const data = MsgDeleteDao.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "DeleteDao", data);
        return promise.then((data) => MsgDeleteDaoResponse.decode(new Reader(data)));
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
    UpdateIssueTitle(request) {
        const data = MsgUpdateIssueTitle.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateIssueTitle", data);
        return promise.then((data) => MsgUpdateIssueTitleResponse.decode(new Reader(data)));
    }
    UpdateIssueDescription(request) {
        const data = MsgUpdateIssueDescription.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateIssueDescription", data);
        return promise.then((data) => MsgUpdateIssueDescriptionResponse.decode(new Reader(data)));
    }
    ToggleIssueState(request) {
        const data = MsgToggleIssueState.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "ToggleIssueState", data);
        return promise.then((data) => MsgToggleIssueStateResponse.decode(new Reader(data)));
    }
    AddIssueAssignees(request) {
        const data = MsgAddIssueAssignees.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "AddIssueAssignees", data);
        return promise.then((data) => MsgAddIssueAssigneesResponse.decode(new Reader(data)));
    }
    RemoveIssueAssignees(request) {
        const data = MsgRemoveIssueAssignees.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "RemoveIssueAssignees", data);
        return promise.then((data) => MsgRemoveIssueAssigneesResponse.decode(new Reader(data)));
    }
    AddIssueLabels(request) {
        const data = MsgAddIssueLabels.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "AddIssueLabels", data);
        return promise.then((data) => MsgAddIssueLabelsResponse.decode(new Reader(data)));
    }
    RemoveIssueLabels(request) {
        const data = MsgRemoveIssueLabels.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "RemoveIssueLabels", data);
        return promise.then((data) => MsgRemoveIssueLabelsResponse.decode(new Reader(data)));
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
    InvokeForkRepository(request) {
        const data = MsgInvokeForkRepository.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "InvokeForkRepository", data);
        return promise.then((data) => MsgInvokeForkRepositoryResponse.decode(new Reader(data)));
    }
    ForkRepository(request) {
        const data = MsgForkRepository.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "ForkRepository", data);
        return promise.then((data) => MsgForkRepositoryResponse.decode(new Reader(data)));
    }
    ForkRepositorySuccess(request) {
        const data = MsgForkRepositorySuccess.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "ForkRepositorySuccess", data);
        return promise.then((data) => MsgForkRepositorySuccessResponse.decode(new Reader(data)));
    }
    RenameRepository(request) {
        const data = MsgRenameRepository.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "RenameRepository", data);
        return promise.then((data) => MsgRenameRepositoryResponse.decode(new Reader(data)));
    }
    UpdateRepositoryDescription(request) {
        const data = MsgUpdateRepositoryDescription.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateRepositoryDescription", data);
        return promise.then((data) => MsgUpdateRepositoryDescriptionResponse.decode(new Reader(data)));
    }
    ChangeOwner(request) {
        const data = MsgChangeOwner.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "ChangeOwner", data);
        return promise.then((data) => MsgChangeOwnerResponse.decode(new Reader(data)));
    }
    UpdateRepositoryCollaborator(request) {
        const data = MsgUpdateRepositoryCollaborator.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateRepositoryCollaborator", data);
        return promise.then((data) => MsgUpdateRepositoryCollaboratorResponse.decode(new Reader(data)));
    }
    RemoveRepositoryCollaborator(request) {
        const data = MsgRemoveRepositoryCollaborator.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "RemoveRepositoryCollaborator", data);
        return promise.then((data) => MsgRemoveRepositoryCollaboratorResponse.decode(new Reader(data)));
    }
    CreateRepositoryLabel(request) {
        const data = MsgCreateRepositoryLabel.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "CreateRepositoryLabel", data);
        return promise.then((data) => MsgCreateRepositoryLabelResponse.decode(new Reader(data)));
    }
    UpdateRepositoryLabel(request) {
        const data = MsgUpdateRepositoryLabel.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateRepositoryLabel", data);
        return promise.then((data) => MsgUpdateRepositoryLabelResponse.decode(new Reader(data)));
    }
    DeleteRepositoryLabel(request) {
        const data = MsgDeleteRepositoryLabel.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "DeleteRepositoryLabel", data);
        return promise.then((data) => MsgDeleteRepositoryLabelResponse.decode(new Reader(data)));
    }
    SetDefaultBranch(request) {
        const data = MsgSetDefaultBranch.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "SetDefaultBranch", data);
        return promise.then((data) => MsgSetDefaultBranchResponse.decode(new Reader(data)));
    }
    ToggleRepositoryForking(request) {
        const data = MsgToggleRepositoryForking.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "ToggleRepositoryForking", data);
        return promise.then((data) => MsgToggleRepositoryForkingResponse.decode(new Reader(data)));
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
    UpdateUserUsername(request) {
        const data = MsgUpdateUserUsername.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateUserUsername", data);
        return promise.then((data) => MsgUpdateUserUsernameResponse.decode(new Reader(data)));
    }
    UpdateUserName(request) {
        const data = MsgUpdateUserName.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateUserName", data);
        return promise.then((data) => MsgUpdateUserNameResponse.decode(new Reader(data)));
    }
    UpdateUserBio(request) {
        const data = MsgUpdateUserBio.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateUserBio", data);
        return promise.then((data) => MsgUpdateUserBioResponse.decode(new Reader(data)));
    }
    UpdateUserAvatar(request) {
        const data = MsgUpdateUserAvatar.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateUserAvatar", data);
        return promise.then((data) => MsgUpdateUserAvatarResponse.decode(new Reader(data)));
    }
    DeleteUser(request) {
        const data = MsgDeleteUser.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "DeleteUser", data);
        return promise.then((data) => MsgDeleteUserResponse.decode(new Reader(data)));
    }
    UpdateRepositoryBackupRef(request) {
        const data = MsgUpdateRepositoryBackupRef.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateRepositoryBackupRef", data);
        return promise.then((data) => MsgUpdateRepositoryBackupRefResponse.decode(new Reader(data)));
    }
    CreateStorageProvider(request) {
        const data = MsgCreateStorageProvider.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "CreateStorageProvider", data);
        return promise.then((data) => MsgCreateStorageProviderResponse.decode(new Reader(data)));
    }
    UpdateStorageProvider(request) {
        const data = MsgUpdateStorageProvider.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateStorageProvider", data);
        return promise.then((data) => MsgUpdateStorageProviderResponse.decode(new Reader(data)));
    }
    DeleteStorageProvider(request) {
        const data = MsgDeleteStorageProvider.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "DeleteStorageProvider", data);
        return promise.then((data) => MsgDeleteStorageProviderResponse.decode(new Reader(data)));
    }
    AddRepositoryBackupRef(request) {
        const data = MsgAddRepositoryBackupRef.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "AddRepositoryBackupRef", data);
        return promise.then((data) => MsgAddRepositoryBackupRefResponse.decode(new Reader(data)));
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
