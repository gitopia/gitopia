/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
export const protobufPackage = "gitopia.gitopia.gitopia";
const baseUser = {
    creator: "",
    id: 0,
    name: "",
    username: "",
    usernameGithub: "",
    avatarUrl: "",
    followers: "",
    following: "",
    starredRepos: 0,
    subscriptions: "",
    bio: "",
    createdAt: 0,
    updatedAt: 0,
};
export const User = {
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
        if (message.username !== "") {
            writer.uint32(34).string(message.username);
        }
        if (message.usernameGithub !== "") {
            writer.uint32(42).string(message.usernameGithub);
        }
        if (message.avatarUrl !== "") {
            writer.uint32(50).string(message.avatarUrl);
        }
        for (const v of message.followers) {
            writer.uint32(58).string(v);
        }
        for (const v of message.following) {
            writer.uint32(66).string(v);
        }
        for (const v of message.repositories) {
            UserRepository.encode(v, writer.uint32(74).fork()).ldelim();
        }
        for (const v of message.organizations) {
            UserOrganization.encode(v, writer.uint32(82).fork()).ldelim();
        }
        writer.uint32(90).fork();
        for (const v of message.starredRepos) {
            writer.uint64(v);
        }
        writer.ldelim();
        if (message.subscriptions !== "") {
            writer.uint32(98).string(message.subscriptions);
        }
        if (message.bio !== "") {
            writer.uint32(106).string(message.bio);
        }
        if (message.createdAt !== 0) {
            writer.uint32(112).int64(message.createdAt);
        }
        if (message.updatedAt !== 0) {
            writer.uint32(120).int64(message.updatedAt);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseUser };
        message.followers = [];
        message.following = [];
        message.repositories = [];
        message.organizations = [];
        message.starredRepos = [];
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
                    message.username = reader.string();
                    break;
                case 5:
                    message.usernameGithub = reader.string();
                    break;
                case 6:
                    message.avatarUrl = reader.string();
                    break;
                case 7:
                    message.followers.push(reader.string());
                    break;
                case 8:
                    message.following.push(reader.string());
                    break;
                case 9:
                    message.repositories.push(UserRepository.decode(reader, reader.uint32()));
                    break;
                case 10:
                    message.organizations.push(UserOrganization.decode(reader, reader.uint32()));
                    break;
                case 11:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.starredRepos.push(longToNumber(reader.uint64()));
                        }
                    }
                    else {
                        message.starredRepos.push(longToNumber(reader.uint64()));
                    }
                    break;
                case 12:
                    message.subscriptions = reader.string();
                    break;
                case 13:
                    message.bio = reader.string();
                    break;
                case 14:
                    message.createdAt = longToNumber(reader.int64());
                    break;
                case 15:
                    message.updatedAt = longToNumber(reader.int64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseUser };
        message.followers = [];
        message.following = [];
        message.repositories = [];
        message.organizations = [];
        message.starredRepos = [];
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
            for (const e of object.followers) {
                message.followers.push(String(e));
            }
        }
        if (object.following !== undefined && object.following !== null) {
            for (const e of object.following) {
                message.following.push(String(e));
            }
        }
        if (object.repositories !== undefined && object.repositories !== null) {
            for (const e of object.repositories) {
                message.repositories.push(UserRepository.fromJSON(e));
            }
        }
        if (object.organizations !== undefined && object.organizations !== null) {
            for (const e of object.organizations) {
                message.organizations.push(UserOrganization.fromJSON(e));
            }
        }
        if (object.starredRepos !== undefined && object.starredRepos !== null) {
            for (const e of object.starredRepos) {
                message.starredRepos.push(Number(e));
            }
        }
        if (object.subscriptions !== undefined && object.subscriptions !== null) {
            message.subscriptions = String(object.subscriptions);
        }
        else {
            message.subscriptions = "";
        }
        if (object.bio !== undefined && object.bio !== null) {
            message.bio = String(object.bio);
        }
        else {
            message.bio = "";
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
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        message.name !== undefined && (obj.name = message.name);
        message.username !== undefined && (obj.username = message.username);
        message.usernameGithub !== undefined &&
            (obj.usernameGithub = message.usernameGithub);
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
        if (message.repositories) {
            obj.repositories = message.repositories.map((e) => e ? UserRepository.toJSON(e) : undefined);
        }
        else {
            obj.repositories = [];
        }
        if (message.organizations) {
            obj.organizations = message.organizations.map((e) => e ? UserOrganization.toJSON(e) : undefined);
        }
        else {
            obj.organizations = [];
        }
        if (message.starredRepos) {
            obj.starredRepos = message.starredRepos.map((e) => e);
        }
        else {
            obj.starredRepos = [];
        }
        message.subscriptions !== undefined &&
            (obj.subscriptions = message.subscriptions);
        message.bio !== undefined && (obj.bio = message.bio);
        message.createdAt !== undefined && (obj.createdAt = message.createdAt);
        message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseUser };
        message.followers = [];
        message.following = [];
        message.repositories = [];
        message.organizations = [];
        message.starredRepos = [];
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
            for (const e of object.followers) {
                message.followers.push(e);
            }
        }
        if (object.following !== undefined && object.following !== null) {
            for (const e of object.following) {
                message.following.push(e);
            }
        }
        if (object.repositories !== undefined && object.repositories !== null) {
            for (const e of object.repositories) {
                message.repositories.push(UserRepository.fromPartial(e));
            }
        }
        if (object.organizations !== undefined && object.organizations !== null) {
            for (const e of object.organizations) {
                message.organizations.push(UserOrganization.fromPartial(e));
            }
        }
        if (object.starredRepos !== undefined && object.starredRepos !== null) {
            for (const e of object.starredRepos) {
                message.starredRepos.push(e);
            }
        }
        if (object.subscriptions !== undefined && object.subscriptions !== null) {
            message.subscriptions = object.subscriptions;
        }
        else {
            message.subscriptions = "";
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
            message.createdAt = 0;
        }
        if (object.updatedAt !== undefined && object.updatedAt !== null) {
            message.updatedAt = object.updatedAt;
        }
        else {
            message.updatedAt = 0;
        }
        return message;
    },
};
const baseUserRepository = { name: "", id: 0 };
export const UserRepository = {
    encode(message, writer = Writer.create()) {
        if (message.name !== "") {
            writer.uint32(10).string(message.name);
        }
        if (message.id !== 0) {
            writer.uint32(16).uint64(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseUserRepository };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
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
        const message = { ...baseUserRepository };
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = "";
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
        message.name !== undefined && (obj.name = message.name);
        message.id !== undefined && (obj.id = message.id);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseUserRepository };
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = "";
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
const baseUserOrganization = { name: "", id: "" };
export const UserOrganization = {
    encode(message, writer = Writer.create()) {
        if (message.name !== "") {
            writer.uint32(10).string(message.name);
        }
        if (message.id !== "") {
            writer.uint32(18).string(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseUserOrganization };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
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
        const message = { ...baseUserOrganization };
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = "";
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
        message.name !== undefined && (obj.name = message.name);
        message.id !== undefined && (obj.id = message.id);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseUserOrganization };
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = "";
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
