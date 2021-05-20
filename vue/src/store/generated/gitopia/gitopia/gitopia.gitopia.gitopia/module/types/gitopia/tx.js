/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";
export const protobufPackage = "gitopia.gitopia.gitopia";
const baseMsgCreateRepository = {
    creator: "",
    name: "",
    owner: "",
    description: "",
    forks: "",
    branches: "",
    tags: "",
    subscribers: "",
    commits: "",
    issuesOpen: "",
    issuesClosed: "",
    pulls: "",
    labels: "",
    releases: "",
    createdAt: "",
    updatedAt: "",
    pushedAt: "",
    stargazers: "",
    archived: "",
    license: "",
    defaultBranch: "",
    extensions: "",
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
        if (message.forks !== "") {
            writer.uint32(42).string(message.forks);
        }
        if (message.branches !== "") {
            writer.uint32(50).string(message.branches);
        }
        if (message.tags !== "") {
            writer.uint32(58).string(message.tags);
        }
        if (message.subscribers !== "") {
            writer.uint32(66).string(message.subscribers);
        }
        if (message.commits !== "") {
            writer.uint32(74).string(message.commits);
        }
        if (message.issuesOpen !== "") {
            writer.uint32(82).string(message.issuesOpen);
        }
        if (message.issuesClosed !== "") {
            writer.uint32(90).string(message.issuesClosed);
        }
        if (message.pulls !== "") {
            writer.uint32(98).string(message.pulls);
        }
        if (message.labels !== "") {
            writer.uint32(106).string(message.labels);
        }
        if (message.releases !== "") {
            writer.uint32(114).string(message.releases);
        }
        if (message.createdAt !== "") {
            writer.uint32(122).string(message.createdAt);
        }
        if (message.updatedAt !== "") {
            writer.uint32(130).string(message.updatedAt);
        }
        if (message.pushedAt !== "") {
            writer.uint32(138).string(message.pushedAt);
        }
        if (message.stargazers !== "") {
            writer.uint32(146).string(message.stargazers);
        }
        if (message.archived !== "") {
            writer.uint32(154).string(message.archived);
        }
        if (message.license !== "") {
            writer.uint32(162).string(message.license);
        }
        if (message.defaultBranch !== "") {
            writer.uint32(170).string(message.defaultBranch);
        }
        if (message.extensions !== "") {
            writer.uint32(178).string(message.extensions);
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
                case 5:
                    message.forks = reader.string();
                    break;
                case 6:
                    message.branches = reader.string();
                    break;
                case 7:
                    message.tags = reader.string();
                    break;
                case 8:
                    message.subscribers = reader.string();
                    break;
                case 9:
                    message.commits = reader.string();
                    break;
                case 10:
                    message.issuesOpen = reader.string();
                    break;
                case 11:
                    message.issuesClosed = reader.string();
                    break;
                case 12:
                    message.pulls = reader.string();
                    break;
                case 13:
                    message.labels = reader.string();
                    break;
                case 14:
                    message.releases = reader.string();
                    break;
                case 15:
                    message.createdAt = reader.string();
                    break;
                case 16:
                    message.updatedAt = reader.string();
                    break;
                case 17:
                    message.pushedAt = reader.string();
                    break;
                case 18:
                    message.stargazers = reader.string();
                    break;
                case 19:
                    message.archived = reader.string();
                    break;
                case 20:
                    message.license = reader.string();
                    break;
                case 21:
                    message.defaultBranch = reader.string();
                    break;
                case 22:
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
        if (object.forks !== undefined && object.forks !== null) {
            message.forks = String(object.forks);
        }
        else {
            message.forks = "";
        }
        if (object.branches !== undefined && object.branches !== null) {
            message.branches = String(object.branches);
        }
        else {
            message.branches = "";
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
        if (object.issuesOpen !== undefined && object.issuesOpen !== null) {
            message.issuesOpen = String(object.issuesOpen);
        }
        else {
            message.issuesOpen = "";
        }
        if (object.issuesClosed !== undefined && object.issuesClosed !== null) {
            message.issuesClosed = String(object.issuesClosed);
        }
        else {
            message.issuesClosed = "";
        }
        if (object.pulls !== undefined && object.pulls !== null) {
            message.pulls = String(object.pulls);
        }
        else {
            message.pulls = "";
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
        if (object.pushedAt !== undefined && object.pushedAt !== null) {
            message.pushedAt = String(object.pushedAt);
        }
        else {
            message.pushedAt = "";
        }
        if (object.stargazers !== undefined && object.stargazers !== null) {
            message.stargazers = String(object.stargazers);
        }
        else {
            message.stargazers = "";
        }
        if (object.archived !== undefined && object.archived !== null) {
            message.archived = String(object.archived);
        }
        else {
            message.archived = "";
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
        message.name !== undefined && (obj.name = message.name);
        message.owner !== undefined && (obj.owner = message.owner);
        message.description !== undefined &&
            (obj.description = message.description);
        message.forks !== undefined && (obj.forks = message.forks);
        message.branches !== undefined && (obj.branches = message.branches);
        message.tags !== undefined && (obj.tags = message.tags);
        message.subscribers !== undefined &&
            (obj.subscribers = message.subscribers);
        message.commits !== undefined && (obj.commits = message.commits);
        message.issuesOpen !== undefined && (obj.issuesOpen = message.issuesOpen);
        message.issuesClosed !== undefined &&
            (obj.issuesClosed = message.issuesClosed);
        message.pulls !== undefined && (obj.pulls = message.pulls);
        message.labels !== undefined && (obj.labels = message.labels);
        message.releases !== undefined && (obj.releases = message.releases);
        message.createdAt !== undefined && (obj.createdAt = message.createdAt);
        message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt);
        message.pushedAt !== undefined && (obj.pushedAt = message.pushedAt);
        message.stargazers !== undefined && (obj.stargazers = message.stargazers);
        message.archived !== undefined && (obj.archived = message.archived);
        message.license !== undefined && (obj.license = message.license);
        message.defaultBranch !== undefined &&
            (obj.defaultBranch = message.defaultBranch);
        message.extensions !== undefined && (obj.extensions = message.extensions);
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
        if (object.forks !== undefined && object.forks !== null) {
            message.forks = object.forks;
        }
        else {
            message.forks = "";
        }
        if (object.branches !== undefined && object.branches !== null) {
            message.branches = object.branches;
        }
        else {
            message.branches = "";
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
        if (object.issuesOpen !== undefined && object.issuesOpen !== null) {
            message.issuesOpen = object.issuesOpen;
        }
        else {
            message.issuesOpen = "";
        }
        if (object.issuesClosed !== undefined && object.issuesClosed !== null) {
            message.issuesClosed = object.issuesClosed;
        }
        else {
            message.issuesClosed = "";
        }
        if (object.pulls !== undefined && object.pulls !== null) {
            message.pulls = object.pulls;
        }
        else {
            message.pulls = "";
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
            message.createdAt = "";
        }
        if (object.updatedAt !== undefined && object.updatedAt !== null) {
            message.updatedAt = object.updatedAt;
        }
        else {
            message.updatedAt = "";
        }
        if (object.pushedAt !== undefined && object.pushedAt !== null) {
            message.pushedAt = object.pushedAt;
        }
        else {
            message.pushedAt = "";
        }
        if (object.stargazers !== undefined && object.stargazers !== null) {
            message.stargazers = object.stargazers;
        }
        else {
            message.stargazers = "";
        }
        if (object.archived !== undefined && object.archived !== null) {
            message.archived = object.archived;
        }
        else {
            message.archived = "";
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
        if (object.extensions !== undefined && object.extensions !== null) {
            message.extensions = object.extensions;
        }
        else {
            message.extensions = "";
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
const baseMsgUpdateRepository = {
    creator: "",
    id: 0,
    name: "",
    owner: "",
    description: "",
    forks: "",
    branches: "",
    tags: "",
    subscribers: "",
    commits: "",
    issuesOpen: "",
    issuesClosed: "",
    pulls: "",
    labels: "",
    releases: "",
    createdAt: "",
    updatedAt: "",
    pushedAt: "",
    stargazers: "",
    archived: "",
    license: "",
    defaultBranch: "",
    extensions: "",
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
        if (message.forks !== "") {
            writer.uint32(50).string(message.forks);
        }
        if (message.branches !== "") {
            writer.uint32(58).string(message.branches);
        }
        if (message.tags !== "") {
            writer.uint32(66).string(message.tags);
        }
        if (message.subscribers !== "") {
            writer.uint32(74).string(message.subscribers);
        }
        if (message.commits !== "") {
            writer.uint32(82).string(message.commits);
        }
        if (message.issuesOpen !== "") {
            writer.uint32(90).string(message.issuesOpen);
        }
        if (message.issuesClosed !== "") {
            writer.uint32(98).string(message.issuesClosed);
        }
        if (message.pulls !== "") {
            writer.uint32(106).string(message.pulls);
        }
        if (message.labels !== "") {
            writer.uint32(114).string(message.labels);
        }
        if (message.releases !== "") {
            writer.uint32(122).string(message.releases);
        }
        if (message.createdAt !== "") {
            writer.uint32(130).string(message.createdAt);
        }
        if (message.updatedAt !== "") {
            writer.uint32(138).string(message.updatedAt);
        }
        if (message.pushedAt !== "") {
            writer.uint32(146).string(message.pushedAt);
        }
        if (message.stargazers !== "") {
            writer.uint32(154).string(message.stargazers);
        }
        if (message.archived !== "") {
            writer.uint32(162).string(message.archived);
        }
        if (message.license !== "") {
            writer.uint32(170).string(message.license);
        }
        if (message.defaultBranch !== "") {
            writer.uint32(178).string(message.defaultBranch);
        }
        if (message.extensions !== "") {
            writer.uint32(186).string(message.extensions);
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
                    message.forks = reader.string();
                    break;
                case 7:
                    message.branches = reader.string();
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
                    message.issuesOpen = reader.string();
                    break;
                case 12:
                    message.issuesClosed = reader.string();
                    break;
                case 13:
                    message.pulls = reader.string();
                    break;
                case 14:
                    message.labels = reader.string();
                    break;
                case 15:
                    message.releases = reader.string();
                    break;
                case 16:
                    message.createdAt = reader.string();
                    break;
                case 17:
                    message.updatedAt = reader.string();
                    break;
                case 18:
                    message.pushedAt = reader.string();
                    break;
                case 19:
                    message.stargazers = reader.string();
                    break;
                case 20:
                    message.archived = reader.string();
                    break;
                case 21:
                    message.license = reader.string();
                    break;
                case 22:
                    message.defaultBranch = reader.string();
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
        if (object.forks !== undefined && object.forks !== null) {
            message.forks = String(object.forks);
        }
        else {
            message.forks = "";
        }
        if (object.branches !== undefined && object.branches !== null) {
            message.branches = String(object.branches);
        }
        else {
            message.branches = "";
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
        if (object.issuesOpen !== undefined && object.issuesOpen !== null) {
            message.issuesOpen = String(object.issuesOpen);
        }
        else {
            message.issuesOpen = "";
        }
        if (object.issuesClosed !== undefined && object.issuesClosed !== null) {
            message.issuesClosed = String(object.issuesClosed);
        }
        else {
            message.issuesClosed = "";
        }
        if (object.pulls !== undefined && object.pulls !== null) {
            message.pulls = String(object.pulls);
        }
        else {
            message.pulls = "";
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
        if (object.pushedAt !== undefined && object.pushedAt !== null) {
            message.pushedAt = String(object.pushedAt);
        }
        else {
            message.pushedAt = "";
        }
        if (object.stargazers !== undefined && object.stargazers !== null) {
            message.stargazers = String(object.stargazers);
        }
        else {
            message.stargazers = "";
        }
        if (object.archived !== undefined && object.archived !== null) {
            message.archived = String(object.archived);
        }
        else {
            message.archived = "";
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
        message.forks !== undefined && (obj.forks = message.forks);
        message.branches !== undefined && (obj.branches = message.branches);
        message.tags !== undefined && (obj.tags = message.tags);
        message.subscribers !== undefined &&
            (obj.subscribers = message.subscribers);
        message.commits !== undefined && (obj.commits = message.commits);
        message.issuesOpen !== undefined && (obj.issuesOpen = message.issuesOpen);
        message.issuesClosed !== undefined &&
            (obj.issuesClosed = message.issuesClosed);
        message.pulls !== undefined && (obj.pulls = message.pulls);
        message.labels !== undefined && (obj.labels = message.labels);
        message.releases !== undefined && (obj.releases = message.releases);
        message.createdAt !== undefined && (obj.createdAt = message.createdAt);
        message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt);
        message.pushedAt !== undefined && (obj.pushedAt = message.pushedAt);
        message.stargazers !== undefined && (obj.stargazers = message.stargazers);
        message.archived !== undefined && (obj.archived = message.archived);
        message.license !== undefined && (obj.license = message.license);
        message.defaultBranch !== undefined &&
            (obj.defaultBranch = message.defaultBranch);
        message.extensions !== undefined && (obj.extensions = message.extensions);
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
        if (object.forks !== undefined && object.forks !== null) {
            message.forks = object.forks;
        }
        else {
            message.forks = "";
        }
        if (object.branches !== undefined && object.branches !== null) {
            message.branches = object.branches;
        }
        else {
            message.branches = "";
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
        if (object.issuesOpen !== undefined && object.issuesOpen !== null) {
            message.issuesOpen = object.issuesOpen;
        }
        else {
            message.issuesOpen = "";
        }
        if (object.issuesClosed !== undefined && object.issuesClosed !== null) {
            message.issuesClosed = object.issuesClosed;
        }
        else {
            message.issuesClosed = "";
        }
        if (object.pulls !== undefined && object.pulls !== null) {
            message.pulls = object.pulls;
        }
        else {
            message.pulls = "";
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
            message.createdAt = "";
        }
        if (object.updatedAt !== undefined && object.updatedAt !== null) {
            message.updatedAt = object.updatedAt;
        }
        else {
            message.updatedAt = "";
        }
        if (object.pushedAt !== undefined && object.pushedAt !== null) {
            message.pushedAt = object.pushedAt;
        }
        else {
            message.pushedAt = "";
        }
        if (object.stargazers !== undefined && object.stargazers !== null) {
            message.stargazers = object.stargazers;
        }
        else {
            message.stargazers = "";
        }
        if (object.archived !== undefined && object.archived !== null) {
            message.archived = object.archived;
        }
        else {
            message.archived = "";
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
        if (object.extensions !== undefined && object.extensions !== null) {
            message.extensions = object.extensions;
        }
        else {
            message.extensions = "";
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
const baseMsgCreateUserResponse = { id: 0 };
export const MsgCreateUserResponse = {
    encode(message, writer = Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
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
        const message = { ...baseMsgCreateUserResponse };
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
        const message = { ...baseMsgCreateUserResponse };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = 0;
        }
        return message;
    },
};
const baseMsgUpdateUser = {
    creator: "",
    id: 0,
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
        if (message.id !== 0) {
            writer.uint32(16).uint64(message.id);
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
                    message.id = longToNumber(reader.uint64());
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
            message.id = Number(object.id);
        }
        else {
            message.id = 0;
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
            message.id = 0;
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
const baseMsgDeleteUser = { creator: "", id: 0 };
export const MsgDeleteUser = {
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
        const message = { ...baseMsgDeleteUser };
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
        const message = { ...baseMsgDeleteUser };
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
            message.id = 0;
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
    CreateRepository(request) {
        const data = MsgCreateRepository.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "CreateRepository", data);
        return promise.then((data) => MsgCreateRepositoryResponse.decode(new Reader(data)));
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
