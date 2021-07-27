/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
export const protobufPackage = "gitopia.gitopia.gitopia";
const baseUser = {
    creator: "",
    username: "",
    usernameGithub: "",
    avatarUrl: "",
    followers: 0,
    following: 0,
    repositories: 0,
    repositoriesArchived: 0,
    organizations: 0,
    starredRepos: 0,
    subscriptions: "",
    email: "",
    bio: "",
    createdAt: 0,
    updatedAt: 0,
    extensions: "",
};
export const User = {
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
        writer.uint32(42).fork();
        for (const v of message.followers) {
            writer.uint64(v);
        }
        writer.ldelim();
        writer.uint32(50).fork();
        for (const v of message.following) {
            writer.uint64(v);
        }
        writer.ldelim();
        writer.uint32(58).fork();
        for (const v of message.repositories) {
            writer.uint64(v);
        }
        writer.ldelim();
        writer.uint32(66).fork();
        for (const v of message.repositoriesArchived) {
            writer.uint64(v);
        }
        writer.ldelim();
        Object.entries(message.repositoryNames).forEach(([key, value]) => {
            User_RepositoryNamesEntry.encode({ key: key, value }, writer.uint32(74).fork()).ldelim();
        });
        writer.uint32(82).fork();
        for (const v of message.organizations) {
            writer.uint64(v);
        }
        writer.ldelim();
        writer.uint32(90).fork();
        for (const v of message.starredRepos) {
            writer.uint64(v);
        }
        writer.ldelim();
        if (message.subscriptions !== "") {
            writer.uint32(98).string(message.subscriptions);
        }
        if (message.email !== "") {
            writer.uint32(106).string(message.email);
        }
        if (message.bio !== "") {
            writer.uint32(114).string(message.bio);
        }
        if (message.createdAt !== 0) {
            writer.uint32(120).int64(message.createdAt);
        }
        if (message.updatedAt !== 0) {
            writer.uint32(128).int64(message.updatedAt);
        }
        if (message.extensions !== "") {
            writer.uint32(138).string(message.extensions);
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
        message.repositoriesArchived = [];
        message.repositoryNames = {};
        message.organizations = [];
        message.starredRepos = [];
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
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.followers.push(longToNumber(reader.uint64()));
                        }
                    }
                    else {
                        message.followers.push(longToNumber(reader.uint64()));
                    }
                    break;
                case 6:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.following.push(longToNumber(reader.uint64()));
                        }
                    }
                    else {
                        message.following.push(longToNumber(reader.uint64()));
                    }
                    break;
                case 7:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.repositories.push(longToNumber(reader.uint64()));
                        }
                    }
                    else {
                        message.repositories.push(longToNumber(reader.uint64()));
                    }
                    break;
                case 8:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.repositoriesArchived.push(longToNumber(reader.uint64()));
                        }
                    }
                    else {
                        message.repositoriesArchived.push(longToNumber(reader.uint64()));
                    }
                    break;
                case 9:
                    const entry9 = User_RepositoryNamesEntry.decode(reader, reader.uint32());
                    if (entry9.value !== undefined) {
                        message.repositoryNames[entry9.key] = entry9.value;
                    }
                    break;
                case 10:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.organizations.push(longToNumber(reader.uint64()));
                        }
                    }
                    else {
                        message.organizations.push(longToNumber(reader.uint64()));
                    }
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
                    message.email = reader.string();
                    break;
                case 14:
                    message.bio = reader.string();
                    break;
                case 15:
                    message.createdAt = longToNumber(reader.int64());
                    break;
                case 16:
                    message.updatedAt = longToNumber(reader.int64());
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
        const message = { ...baseUser };
        message.followers = [];
        message.following = [];
        message.repositories = [];
        message.repositoriesArchived = [];
        message.repositoryNames = {};
        message.organizations = [];
        message.starredRepos = [];
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
            for (const e of object.followers) {
                message.followers.push(Number(e));
            }
        }
        if (object.following !== undefined && object.following !== null) {
            for (const e of object.following) {
                message.following.push(Number(e));
            }
        }
        if (object.repositories !== undefined && object.repositories !== null) {
            for (const e of object.repositories) {
                message.repositories.push(Number(e));
            }
        }
        if (object.repositoriesArchived !== undefined &&
            object.repositoriesArchived !== null) {
            for (const e of object.repositoriesArchived) {
                message.repositoriesArchived.push(Number(e));
            }
        }
        if (object.repositoryNames !== undefined &&
            object.repositoryNames !== null) {
            Object.entries(object.repositoryNames).forEach(([key, value]) => {
                message.repositoryNames[key] = Number(value);
            });
        }
        if (object.organizations !== undefined && object.organizations !== null) {
            for (const e of object.organizations) {
                message.organizations.push(Number(e));
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
            obj.repositories = message.repositories.map((e) => e);
        }
        else {
            obj.repositories = [];
        }
        if (message.repositoriesArchived) {
            obj.repositoriesArchived = message.repositoriesArchived.map((e) => e);
        }
        else {
            obj.repositoriesArchived = [];
        }
        obj.repositoryNames = {};
        if (message.repositoryNames) {
            Object.entries(message.repositoryNames).forEach(([k, v]) => {
                obj.repositoryNames[k] = v;
            });
        }
        if (message.organizations) {
            obj.organizations = message.organizations.map((e) => e);
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
        message.email !== undefined && (obj.email = message.email);
        message.bio !== undefined && (obj.bio = message.bio);
        message.createdAt !== undefined && (obj.createdAt = message.createdAt);
        message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt);
        message.extensions !== undefined && (obj.extensions = message.extensions);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseUser };
        message.followers = [];
        message.following = [];
        message.repositories = [];
        message.repositoriesArchived = [];
        message.repositoryNames = {};
        message.organizations = [];
        message.starredRepos = [];
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
                message.repositories.push(e);
            }
        }
        if (object.repositoriesArchived !== undefined &&
            object.repositoriesArchived !== null) {
            for (const e of object.repositoriesArchived) {
                message.repositoriesArchived.push(e);
            }
        }
        if (object.repositoryNames !== undefined &&
            object.repositoryNames !== null) {
            Object.entries(object.repositoryNames).forEach(([key, value]) => {
                if (value !== undefined) {
                    message.repositoryNames[key] = Number(value);
                }
            });
        }
        if (object.organizations !== undefined && object.organizations !== null) {
            for (const e of object.organizations) {
                message.organizations.push(e);
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
            message.createdAt = 0;
        }
        if (object.updatedAt !== undefined && object.updatedAt !== null) {
            message.updatedAt = object.updatedAt;
        }
        else {
            message.updatedAt = 0;
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
const baseUser_RepositoryNamesEntry = { key: "", value: 0 };
export const User_RepositoryNamesEntry = {
    encode(message, writer = Writer.create()) {
        if (message.key !== "") {
            writer.uint32(10).string(message.key);
        }
        if (message.value !== 0) {
            writer.uint32(16).uint64(message.value);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseUser_RepositoryNamesEntry,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.key = reader.string();
                    break;
                case 2:
                    message.value = longToNumber(reader.uint64());
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
            ...baseUser_RepositoryNamesEntry,
        };
        if (object.key !== undefined && object.key !== null) {
            message.key = String(object.key);
        }
        else {
            message.key = "";
        }
        if (object.value !== undefined && object.value !== null) {
            message.value = Number(object.value);
        }
        else {
            message.value = 0;
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
            ...baseUser_RepositoryNamesEntry,
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
            message.value = 0;
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