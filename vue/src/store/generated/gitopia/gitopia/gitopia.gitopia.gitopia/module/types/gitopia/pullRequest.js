/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
export const protobufPackage = "gitopia.gitopia.gitopia";
const basePullRequest = {
    creator: "",
    id: 0,
    iid: 0,
    title: "",
    state: "",
    description: "",
    locked: false,
    comments: 0,
    issues: 0,
    labels: "",
    assignees: "",
    reviewers: "",
    draft: false,
    createdAt: 0,
    updatedAt: 0,
    closedAt: 0,
    closedBy: "",
    mergedAt: 0,
    mergedBy: "",
    mergeCommitSha: "",
    maintainerCanModify: false,
    headBranch: "",
    headRepoId: 0,
    baseBranch: "",
    baseRepoId: 0,
    extensions: "",
};
export const PullRequest = {
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
        if (message.locked === true) {
            writer.uint32(56).bool(message.locked);
        }
        writer.uint32(66).fork();
        for (const v of message.comments) {
            writer.uint64(v);
        }
        writer.ldelim();
        writer.uint32(74).fork();
        for (const v of message.issues) {
            writer.uint64(v);
        }
        writer.ldelim();
        for (const v of message.labels) {
            writer.uint32(82).string(v);
        }
        for (const v of message.assignees) {
            writer.uint32(90).string(v);
        }
        for (const v of message.reviewers) {
            writer.uint32(98).string(v);
        }
        if (message.draft === true) {
            writer.uint32(104).bool(message.draft);
        }
        if (message.createdAt !== 0) {
            writer.uint32(112).int64(message.createdAt);
        }
        if (message.updatedAt !== 0) {
            writer.uint32(120).int64(message.updatedAt);
        }
        if (message.closedAt !== 0) {
            writer.uint32(128).int64(message.closedAt);
        }
        if (message.closedBy !== "") {
            writer.uint32(138).string(message.closedBy);
        }
        if (message.mergedAt !== 0) {
            writer.uint32(144).int64(message.mergedAt);
        }
        if (message.mergedBy !== "") {
            writer.uint32(154).string(message.mergedBy);
        }
        if (message.mergeCommitSha !== "") {
            writer.uint32(162).string(message.mergeCommitSha);
        }
        if (message.maintainerCanModify === true) {
            writer.uint32(168).bool(message.maintainerCanModify);
        }
        if (message.headBranch !== "") {
            writer.uint32(178).string(message.headBranch);
        }
        if (message.headRepoId !== 0) {
            writer.uint32(184).uint64(message.headRepoId);
        }
        if (message.baseBranch !== "") {
            writer.uint32(194).string(message.baseBranch);
        }
        if (message.baseRepoId !== 0) {
            writer.uint32(200).uint64(message.baseRepoId);
        }
        if (message.extensions !== "") {
            writer.uint32(210).string(message.extensions);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...basePullRequest };
        message.comments = [];
        message.issues = [];
        message.labels = [];
        message.assignees = [];
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
                    message.locked = reader.bool();
                    break;
                case 8:
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
                case 9:
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
                case 10:
                    message.labels.push(reader.string());
                    break;
                case 11:
                    message.assignees.push(reader.string());
                    break;
                case 12:
                    message.reviewers.push(reader.string());
                    break;
                case 13:
                    message.draft = reader.bool();
                    break;
                case 14:
                    message.createdAt = longToNumber(reader.int64());
                    break;
                case 15:
                    message.updatedAt = longToNumber(reader.int64());
                    break;
                case 16:
                    message.closedAt = longToNumber(reader.int64());
                    break;
                case 17:
                    message.closedBy = reader.string();
                    break;
                case 18:
                    message.mergedAt = longToNumber(reader.int64());
                    break;
                case 19:
                    message.mergedBy = reader.string();
                    break;
                case 20:
                    message.mergeCommitSha = reader.string();
                    break;
                case 21:
                    message.maintainerCanModify = reader.bool();
                    break;
                case 22:
                    message.headBranch = reader.string();
                    break;
                case 23:
                    message.headRepoId = longToNumber(reader.uint64());
                    break;
                case 24:
                    message.baseBranch = reader.string();
                    break;
                case 25:
                    message.baseRepoId = longToNumber(reader.uint64());
                    break;
                case 26:
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
        const message = { ...basePullRequest };
        message.comments = [];
        message.issues = [];
        message.labels = [];
        message.assignees = [];
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
        if (object.locked !== undefined && object.locked !== null) {
            message.locked = Boolean(object.locked);
        }
        else {
            message.locked = false;
        }
        if (object.comments !== undefined && object.comments !== null) {
            for (const e of object.comments) {
                message.comments.push(Number(e));
            }
        }
        if (object.issues !== undefined && object.issues !== null) {
            for (const e of object.issues) {
                message.issues.push(Number(e));
            }
        }
        if (object.labels !== undefined && object.labels !== null) {
            for (const e of object.labels) {
                message.labels.push(String(e));
            }
        }
        if (object.assignees !== undefined && object.assignees !== null) {
            for (const e of object.assignees) {
                message.assignees.push(String(e));
            }
        }
        if (object.reviewers !== undefined && object.reviewers !== null) {
            for (const e of object.reviewers) {
                message.reviewers.push(String(e));
            }
        }
        if (object.draft !== undefined && object.draft !== null) {
            message.draft = Boolean(object.draft);
        }
        else {
            message.draft = false;
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
        if (object.mergedAt !== undefined && object.mergedAt !== null) {
            message.mergedAt = Number(object.mergedAt);
        }
        else {
            message.mergedAt = 0;
        }
        if (object.mergedBy !== undefined && object.mergedBy !== null) {
            message.mergedBy = String(object.mergedBy);
        }
        else {
            message.mergedBy = "";
        }
        if (object.mergeCommitSha !== undefined && object.mergeCommitSha !== null) {
            message.mergeCommitSha = String(object.mergeCommitSha);
        }
        else {
            message.mergeCommitSha = "";
        }
        if (object.maintainerCanModify !== undefined &&
            object.maintainerCanModify !== null) {
            message.maintainerCanModify = Boolean(object.maintainerCanModify);
        }
        else {
            message.maintainerCanModify = false;
        }
        if (object.headBranch !== undefined && object.headBranch !== null) {
            message.headBranch = String(object.headBranch);
        }
        else {
            message.headBranch = "";
        }
        if (object.headRepoId !== undefined && object.headRepoId !== null) {
            message.headRepoId = Number(object.headRepoId);
        }
        else {
            message.headRepoId = 0;
        }
        if (object.baseBranch !== undefined && object.baseBranch !== null) {
            message.baseBranch = String(object.baseBranch);
        }
        else {
            message.baseBranch = "";
        }
        if (object.baseRepoId !== undefined && object.baseRepoId !== null) {
            message.baseRepoId = Number(object.baseRepoId);
        }
        else {
            message.baseRepoId = 0;
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
        message.locked !== undefined && (obj.locked = message.locked);
        if (message.comments) {
            obj.comments = message.comments.map((e) => e);
        }
        else {
            obj.comments = [];
        }
        if (message.issues) {
            obj.issues = message.issues.map((e) => e);
        }
        else {
            obj.issues = [];
        }
        if (message.labels) {
            obj.labels = message.labels.map((e) => e);
        }
        else {
            obj.labels = [];
        }
        if (message.assignees) {
            obj.assignees = message.assignees.map((e) => e);
        }
        else {
            obj.assignees = [];
        }
        if (message.reviewers) {
            obj.reviewers = message.reviewers.map((e) => e);
        }
        else {
            obj.reviewers = [];
        }
        message.draft !== undefined && (obj.draft = message.draft);
        message.createdAt !== undefined && (obj.createdAt = message.createdAt);
        message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt);
        message.closedAt !== undefined && (obj.closedAt = message.closedAt);
        message.closedBy !== undefined && (obj.closedBy = message.closedBy);
        message.mergedAt !== undefined && (obj.mergedAt = message.mergedAt);
        message.mergedBy !== undefined && (obj.mergedBy = message.mergedBy);
        message.mergeCommitSha !== undefined &&
            (obj.mergeCommitSha = message.mergeCommitSha);
        message.maintainerCanModify !== undefined &&
            (obj.maintainerCanModify = message.maintainerCanModify);
        message.headBranch !== undefined && (obj.headBranch = message.headBranch);
        message.headRepoId !== undefined && (obj.headRepoId = message.headRepoId);
        message.baseBranch !== undefined && (obj.baseBranch = message.baseBranch);
        message.baseRepoId !== undefined && (obj.baseRepoId = message.baseRepoId);
        message.extensions !== undefined && (obj.extensions = message.extensions);
        return obj;
    },
    fromPartial(object) {
        const message = { ...basePullRequest };
        message.comments = [];
        message.issues = [];
        message.labels = [];
        message.assignees = [];
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
        if (object.locked !== undefined && object.locked !== null) {
            message.locked = object.locked;
        }
        else {
            message.locked = false;
        }
        if (object.comments !== undefined && object.comments !== null) {
            for (const e of object.comments) {
                message.comments.push(e);
            }
        }
        if (object.issues !== undefined && object.issues !== null) {
            for (const e of object.issues) {
                message.issues.push(e);
            }
        }
        if (object.labels !== undefined && object.labels !== null) {
            for (const e of object.labels) {
                message.labels.push(e);
            }
        }
        if (object.assignees !== undefined && object.assignees !== null) {
            for (const e of object.assignees) {
                message.assignees.push(e);
            }
        }
        if (object.reviewers !== undefined && object.reviewers !== null) {
            for (const e of object.reviewers) {
                message.reviewers.push(e);
            }
        }
        if (object.draft !== undefined && object.draft !== null) {
            message.draft = object.draft;
        }
        else {
            message.draft = false;
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
        if (object.mergedAt !== undefined && object.mergedAt !== null) {
            message.mergedAt = object.mergedAt;
        }
        else {
            message.mergedAt = 0;
        }
        if (object.mergedBy !== undefined && object.mergedBy !== null) {
            message.mergedBy = object.mergedBy;
        }
        else {
            message.mergedBy = "";
        }
        if (object.mergeCommitSha !== undefined && object.mergeCommitSha !== null) {
            message.mergeCommitSha = object.mergeCommitSha;
        }
        else {
            message.mergeCommitSha = "";
        }
        if (object.maintainerCanModify !== undefined &&
            object.maintainerCanModify !== null) {
            message.maintainerCanModify = object.maintainerCanModify;
        }
        else {
            message.maintainerCanModify = false;
        }
        if (object.headBranch !== undefined && object.headBranch !== null) {
            message.headBranch = object.headBranch;
        }
        else {
            message.headBranch = "";
        }
        if (object.headRepoId !== undefined && object.headRepoId !== null) {
            message.headRepoId = object.headRepoId;
        }
        else {
            message.headRepoId = 0;
        }
        if (object.baseBranch !== undefined && object.baseBranch !== null) {
            message.baseBranch = object.baseBranch;
        }
        else {
            message.baseBranch = "";
        }
        if (object.baseRepoId !== undefined && object.baseRepoId !== null) {
            message.baseRepoId = object.baseRepoId;
        }
        else {
            message.baseRepoId = 0;
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
