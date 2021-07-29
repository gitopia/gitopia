/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
export const protobufPackage = "gitopia.gitopia.gitopia";
const baseRepository = {
    creator: "",
    id: 0,
    name: "",
    owner: "",
    description: "",
    forks: 0,
    tags: "",
    subscribers: "",
    commits: "",
    issues: 0,
    pulls: 0,
    labels: "",
    releases: "",
    createdAt: 0,
    updatedAt: 0,
    pushedAt: 0,
    stargazers: 0,
    archived: false,
    license: "",
    defaultBranch: "",
    extensions: "",
};
export const Repository = {
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
        writer.uint32(50).fork();
        for (const v of message.forks) {
            writer.uint64(v);
        }
        writer.ldelim();
        Object.entries(message.branches).forEach(([key, value]) => {
            Repository_BranchesEntry.encode({ key: key, value }, writer.uint32(58).fork()).ldelim();
        });
        if (message.tags !== "") {
            writer.uint32(66).string(message.tags);
        }
        if (message.subscribers !== "") {
            writer.uint32(74).string(message.subscribers);
        }
        if (message.commits !== "") {
            writer.uint32(82).string(message.commits);
        }
        writer.uint32(90).fork();
        for (const v of message.issues) {
            writer.uint64(v);
        }
        writer.ldelim();
        writer.uint32(98).fork();
        for (const v of message.pulls) {
            writer.uint64(v);
        }
        writer.ldelim();
        if (message.labels !== "") {
            writer.uint32(106).string(message.labels);
        }
        if (message.releases !== "") {
            writer.uint32(114).string(message.releases);
        }
        if (message.createdAt !== 0) {
            writer.uint32(120).int64(message.createdAt);
        }
        if (message.updatedAt !== 0) {
            writer.uint32(128).int64(message.updatedAt);
        }
        if (message.pushedAt !== 0) {
            writer.uint32(136).int64(message.pushedAt);
        }
        writer.uint32(146).fork();
        for (const v of message.stargazers) {
            writer.uint64(v);
        }
        writer.ldelim();
        if (message.archived === true) {
            writer.uint32(152).bool(message.archived);
        }
        if (message.license !== "") {
            writer.uint32(162).string(message.license);
        }
        if (message.defaultBranch !== "") {
            writer.uint32(170).string(message.defaultBranch);
        }
        Object.entries(message.collaborators).forEach(([key, value]) => {
            Repository_CollaboratorsEntry.encode({ key: key, value }, writer.uint32(178).fork()).ldelim();
        });
        if (message.extensions !== "") {
            writer.uint32(186).string(message.extensions);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseRepository };
        message.forks = [];
        message.branches = {};
        message.issues = [];
        message.pulls = [];
        message.stargazers = [];
        message.collaborators = {};
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
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.forks.push(longToNumber(reader.uint64()));
                        }
                    }
                    else {
                        message.forks.push(longToNumber(reader.uint64()));
                    }
                    break;
                case 7:
                    const entry7 = Repository_BranchesEntry.decode(reader, reader.uint32());
                    if (entry7.value !== undefined) {
                        message.branches[entry7.key] = entry7.value;
                    }
                    break;
                case 8:
                    message.tags = reader.string();
                    break;
                case 9:
                    message.subscribers = reader.string();
                    break;
                case 10:
                    message.commits = reader.string();
                    break;
                case 11:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.issues.push(longToNumber(reader.uint64()));
                        }
                    }
                    else {
                        message.issues.push(longToNumber(reader.uint64()));
                    }
                    break;
                case 12:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.pulls.push(longToNumber(reader.uint64()));
                        }
                    }
                    else {
                        message.pulls.push(longToNumber(reader.uint64()));
                    }
                    break;
                case 13:
                    message.labels = reader.string();
                    break;
                case 14:
                    message.releases = reader.string();
                    break;
                case 15:
                    message.createdAt = longToNumber(reader.int64());
                    break;
                case 16:
                    message.updatedAt = longToNumber(reader.int64());
                    break;
                case 17:
                    message.pushedAt = longToNumber(reader.int64());
                    break;
                case 18:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.stargazers.push(longToNumber(reader.uint64()));
                        }
                    }
                    else {
                        message.stargazers.push(longToNumber(reader.uint64()));
                    }
                    break;
                case 19:
                    message.archived = reader.bool();
                    break;
                case 20:
                    message.license = reader.string();
                    break;
                case 21:
                    message.defaultBranch = reader.string();
                    break;
                case 22:
                    const entry22 = Repository_CollaboratorsEntry.decode(reader, reader.uint32());
                    if (entry22.value !== undefined) {
                        message.collaborators[entry22.key] = entry22.value;
                    }
                    break;
                case 23:
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
        const message = { ...baseRepository };
        message.forks = [];
        message.branches = {};
        message.issues = [];
        message.pulls = [];
        message.stargazers = [];
        message.collaborators = {};
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
        if (object.forks !== undefined && object.forks !== null) {
            for (const e of object.forks) {
                message.forks.push(Number(e));
            }
        }
        if (object.branches !== undefined && object.branches !== null) {
            Object.entries(object.branches).forEach(([key, value]) => {
                message.branches[key] = String(value);
            });
        }
        if (object.tags !== undefined && object.tags !== null) {
            message.tags = String(object.tags);
        }
        else {
            message.tags = "";
        }
        if (object.subscribers !== undefined && object.subscribers !== null) {
            message.subscribers = String(object.subscribers);
        }
        else {
            message.subscribers = "";
        }
        if (object.commits !== undefined && object.commits !== null) {
            message.commits = String(object.commits);
        }
        else {
            message.commits = "";
        }
        if (object.issues !== undefined && object.issues !== null) {
            for (const e of object.issues) {
                message.issues.push(Number(e));
            }
        }
        if (object.pulls !== undefined && object.pulls !== null) {
            for (const e of object.pulls) {
                message.pulls.push(Number(e));
            }
        }
        if (object.labels !== undefined && object.labels !== null) {
            message.labels = String(object.labels);
        }
        else {
            message.labels = "";
        }
        if (object.releases !== undefined && object.releases !== null) {
            message.releases = String(object.releases);
        }
        else {
            message.releases = "";
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
        if (object.pushedAt !== undefined && object.pushedAt !== null) {
            message.pushedAt = Number(object.pushedAt);
        }
        else {
            message.pushedAt = 0;
        }
        if (object.stargazers !== undefined && object.stargazers !== null) {
            for (const e of object.stargazers) {
                message.stargazers.push(Number(e));
            }
        }
        if (object.archived !== undefined && object.archived !== null) {
            message.archived = Boolean(object.archived);
        }
        else {
            message.archived = false;
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
        if (object.collaborators !== undefined && object.collaborators !== null) {
            Object.entries(object.collaborators).forEach(([key, value]) => {
                message.collaborators[key] = String(value);
            });
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
        message.name !== undefined && (obj.name = message.name);
        message.owner !== undefined && (obj.owner = message.owner);
        message.description !== undefined &&
            (obj.description = message.description);
        if (message.forks) {
            obj.forks = message.forks.map((e) => e);
        }
        else {
            obj.forks = [];
        }
        obj.branches = {};
        if (message.branches) {
            Object.entries(message.branches).forEach(([k, v]) => {
                obj.branches[k] = v;
            });
        }
        message.tags !== undefined && (obj.tags = message.tags);
        message.subscribers !== undefined &&
            (obj.subscribers = message.subscribers);
        message.commits !== undefined && (obj.commits = message.commits);
        if (message.issues) {
            obj.issues = message.issues.map((e) => e);
        }
        else {
            obj.issues = [];
        }
        if (message.pulls) {
            obj.pulls = message.pulls.map((e) => e);
        }
        else {
            obj.pulls = [];
        }
        message.labels !== undefined && (obj.labels = message.labels);
        message.releases !== undefined && (obj.releases = message.releases);
        message.createdAt !== undefined && (obj.createdAt = message.createdAt);
        message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt);
        message.pushedAt !== undefined && (obj.pushedAt = message.pushedAt);
        if (message.stargazers) {
            obj.stargazers = message.stargazers.map((e) => e);
        }
        else {
            obj.stargazers = [];
        }
        message.archived !== undefined && (obj.archived = message.archived);
        message.license !== undefined && (obj.license = message.license);
        message.defaultBranch !== undefined &&
            (obj.defaultBranch = message.defaultBranch);
        obj.collaborators = {};
        if (message.collaborators) {
            Object.entries(message.collaborators).forEach(([k, v]) => {
                obj.collaborators[k] = v;
            });
        }
        message.extensions !== undefined && (obj.extensions = message.extensions);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseRepository };
        message.forks = [];
        message.branches = {};
        message.issues = [];
        message.pulls = [];
        message.stargazers = [];
        message.collaborators = {};
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
        if (object.forks !== undefined && object.forks !== null) {
            for (const e of object.forks) {
                message.forks.push(e);
            }
        }
        if (object.branches !== undefined && object.branches !== null) {
            Object.entries(object.branches).forEach(([key, value]) => {
                if (value !== undefined) {
                    message.branches[key] = String(value);
                }
            });
        }
        if (object.tags !== undefined && object.tags !== null) {
            message.tags = object.tags;
        }
        else {
            message.tags = "";
        }
        if (object.subscribers !== undefined && object.subscribers !== null) {
            message.subscribers = object.subscribers;
        }
        else {
            message.subscribers = "";
        }
        if (object.commits !== undefined && object.commits !== null) {
            message.commits = object.commits;
        }
        else {
            message.commits = "";
        }
        if (object.issues !== undefined && object.issues !== null) {
            for (const e of object.issues) {
                message.issues.push(e);
            }
        }
        if (object.pulls !== undefined && object.pulls !== null) {
            for (const e of object.pulls) {
                message.pulls.push(e);
            }
        }
        if (object.labels !== undefined && object.labels !== null) {
            message.labels = object.labels;
        }
        else {
            message.labels = "";
        }
        if (object.releases !== undefined && object.releases !== null) {
            message.releases = object.releases;
        }
        else {
            message.releases = "";
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
        if (object.pushedAt !== undefined && object.pushedAt !== null) {
            message.pushedAt = object.pushedAt;
        }
        else {
            message.pushedAt = 0;
        }
        if (object.stargazers !== undefined && object.stargazers !== null) {
            for (const e of object.stargazers) {
                message.stargazers.push(e);
            }
        }
        if (object.archived !== undefined && object.archived !== null) {
            message.archived = object.archived;
        }
        else {
            message.archived = false;
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
        if (object.collaborators !== undefined && object.collaborators !== null) {
            Object.entries(object.collaborators).forEach(([key, value]) => {
                if (value !== undefined) {
                    message.collaborators[key] = String(value);
                }
            });
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
const baseRepository_BranchesEntry = { key: "", value: "" };
export const Repository_BranchesEntry = {
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
            ...baseRepository_BranchesEntry,
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
            ...baseRepository_BranchesEntry,
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
            ...baseRepository_BranchesEntry,
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
const baseRepository_CollaboratorsEntry = { key: "", value: "" };
export const Repository_CollaboratorsEntry = {
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
            ...baseRepository_CollaboratorsEntry,
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
            ...baseRepository_CollaboratorsEntry,
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
            ...baseRepository_CollaboratorsEntry,
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
