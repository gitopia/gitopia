/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import { Task } from "../gitopia/task";
import { Release } from "../gitopia/release";
import { PullRequest } from "../gitopia/pullRequest";
import { Organization } from "../gitopia/organization";
import { Comment } from "../gitopia/comment";
import { Issue } from "../gitopia/issue";
import { Repository } from "../gitopia/repository";
import { User } from "../gitopia/user";
import { Whois } from "../gitopia/whois";
export const protobufPackage = "gitopia.gitopia.gitopia";
const baseGenesisState = {
    taskCount: 0,
    releaseCount: 0,
    pullRequestCount: 0,
    organizationCount: 0,
    commentCount: 0,
    issueCount: 0,
    repositoryCount: 0,
    userCount: 0,
    whoisCount: 0,
};
export const GenesisState = {
    encode(message, writer = Writer.create()) {
        for (const v of message.taskList) {
            Task.encode(v, writer.uint32(138).fork()).ldelim();
        }
        if (message.taskCount !== 0) {
            writer.uint32(144).uint64(message.taskCount);
        }
        for (const v of message.releaseList) {
            Release.encode(v, writer.uint32(122).fork()).ldelim();
        }
        if (message.releaseCount !== 0) {
            writer.uint32(128).uint64(message.releaseCount);
        }
        for (const v of message.pullRequestList) {
            PullRequest.encode(v, writer.uint32(106).fork()).ldelim();
        }
        if (message.pullRequestCount !== 0) {
            writer.uint32(112).uint64(message.pullRequestCount);
        }
        for (const v of message.organizationList) {
            Organization.encode(v, writer.uint32(90).fork()).ldelim();
        }
        if (message.organizationCount !== 0) {
            writer.uint32(96).uint64(message.organizationCount);
        }
        for (const v of message.commentList) {
            Comment.encode(v, writer.uint32(74).fork()).ldelim();
        }
        if (message.commentCount !== 0) {
            writer.uint32(80).uint64(message.commentCount);
        }
        for (const v of message.issueList) {
            Issue.encode(v, writer.uint32(58).fork()).ldelim();
        }
        if (message.issueCount !== 0) {
            writer.uint32(64).uint64(message.issueCount);
        }
        for (const v of message.repositoryList) {
            Repository.encode(v, writer.uint32(42).fork()).ldelim();
        }
        if (message.repositoryCount !== 0) {
            writer.uint32(48).uint64(message.repositoryCount);
        }
        for (const v of message.userList) {
            User.encode(v, writer.uint32(26).fork()).ldelim();
        }
        if (message.userCount !== 0) {
            writer.uint32(32).uint64(message.userCount);
        }
        for (const v of message.whoisList) {
            Whois.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.whoisCount !== 0) {
            writer.uint32(16).uint64(message.whoisCount);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseGenesisState };
        message.taskList = [];
        message.releaseList = [];
        message.pullRequestList = [];
        message.organizationList = [];
        message.commentList = [];
        message.issueList = [];
        message.repositoryList = [];
        message.userList = [];
        message.whoisList = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 17:
                    message.taskList.push(Task.decode(reader, reader.uint32()));
                    break;
                case 18:
                    message.taskCount = longToNumber(reader.uint64());
                    break;
                case 15:
                    message.releaseList.push(Release.decode(reader, reader.uint32()));
                    break;
                case 16:
                    message.releaseCount = longToNumber(reader.uint64());
                    break;
                case 13:
                    message.pullRequestList.push(PullRequest.decode(reader, reader.uint32()));
                    break;
                case 14:
                    message.pullRequestCount = longToNumber(reader.uint64());
                    break;
                case 11:
                    message.organizationList.push(Organization.decode(reader, reader.uint32()));
                    break;
                case 12:
                    message.organizationCount = longToNumber(reader.uint64());
                    break;
                case 9:
                    message.commentList.push(Comment.decode(reader, reader.uint32()));
                    break;
                case 10:
                    message.commentCount = longToNumber(reader.uint64());
                    break;
                case 7:
                    message.issueList.push(Issue.decode(reader, reader.uint32()));
                    break;
                case 8:
                    message.issueCount = longToNumber(reader.uint64());
                    break;
                case 5:
                    message.repositoryList.push(Repository.decode(reader, reader.uint32()));
                    break;
                case 6:
                    message.repositoryCount = longToNumber(reader.uint64());
                    break;
                case 3:
                    message.userList.push(User.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.userCount = longToNumber(reader.uint64());
                    break;
                case 1:
                    message.whoisList.push(Whois.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.whoisCount = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseGenesisState };
        message.taskList = [];
        message.releaseList = [];
        message.pullRequestList = [];
        message.organizationList = [];
        message.commentList = [];
        message.issueList = [];
        message.repositoryList = [];
        message.userList = [];
        message.whoisList = [];
        if (object.taskList !== undefined && object.taskList !== null) {
            for (const e of object.taskList) {
                message.taskList.push(Task.fromJSON(e));
            }
        }
        if (object.taskCount !== undefined && object.taskCount !== null) {
            message.taskCount = Number(object.taskCount);
        }
        else {
            message.taskCount = 0;
        }
        if (object.releaseList !== undefined && object.releaseList !== null) {
            for (const e of object.releaseList) {
                message.releaseList.push(Release.fromJSON(e));
            }
        }
        if (object.releaseCount !== undefined && object.releaseCount !== null) {
            message.releaseCount = Number(object.releaseCount);
        }
        else {
            message.releaseCount = 0;
        }
        if (object.pullRequestList !== undefined &&
            object.pullRequestList !== null) {
            for (const e of object.pullRequestList) {
                message.pullRequestList.push(PullRequest.fromJSON(e));
            }
        }
        if (object.pullRequestCount !== undefined &&
            object.pullRequestCount !== null) {
            message.pullRequestCount = Number(object.pullRequestCount);
        }
        else {
            message.pullRequestCount = 0;
        }
        if (object.organizationList !== undefined &&
            object.organizationList !== null) {
            for (const e of object.organizationList) {
                message.organizationList.push(Organization.fromJSON(e));
            }
        }
        if (object.organizationCount !== undefined &&
            object.organizationCount !== null) {
            message.organizationCount = Number(object.organizationCount);
        }
        else {
            message.organizationCount = 0;
        }
        if (object.commentList !== undefined && object.commentList !== null) {
            for (const e of object.commentList) {
                message.commentList.push(Comment.fromJSON(e));
            }
        }
        if (object.commentCount !== undefined && object.commentCount !== null) {
            message.commentCount = Number(object.commentCount);
        }
        else {
            message.commentCount = 0;
        }
        if (object.issueList !== undefined && object.issueList !== null) {
            for (const e of object.issueList) {
                message.issueList.push(Issue.fromJSON(e));
            }
        }
        if (object.issueCount !== undefined && object.issueCount !== null) {
            message.issueCount = Number(object.issueCount);
        }
        else {
            message.issueCount = 0;
        }
        if (object.repositoryList !== undefined && object.repositoryList !== null) {
            for (const e of object.repositoryList) {
                message.repositoryList.push(Repository.fromJSON(e));
            }
        }
        if (object.repositoryCount !== undefined &&
            object.repositoryCount !== null) {
            message.repositoryCount = Number(object.repositoryCount);
        }
        else {
            message.repositoryCount = 0;
        }
        if (object.userList !== undefined && object.userList !== null) {
            for (const e of object.userList) {
                message.userList.push(User.fromJSON(e));
            }
        }
        if (object.userCount !== undefined && object.userCount !== null) {
            message.userCount = Number(object.userCount);
        }
        else {
            message.userCount = 0;
        }
        if (object.whoisList !== undefined && object.whoisList !== null) {
            for (const e of object.whoisList) {
                message.whoisList.push(Whois.fromJSON(e));
            }
        }
        if (object.whoisCount !== undefined && object.whoisCount !== null) {
            message.whoisCount = Number(object.whoisCount);
        }
        else {
            message.whoisCount = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.taskList) {
            obj.taskList = message.taskList.map((e) => e ? Task.toJSON(e) : undefined);
        }
        else {
            obj.taskList = [];
        }
        message.taskCount !== undefined && (obj.taskCount = message.taskCount);
        if (message.releaseList) {
            obj.releaseList = message.releaseList.map((e) => e ? Release.toJSON(e) : undefined);
        }
        else {
            obj.releaseList = [];
        }
        message.releaseCount !== undefined &&
            (obj.releaseCount = message.releaseCount);
        if (message.pullRequestList) {
            obj.pullRequestList = message.pullRequestList.map((e) => e ? PullRequest.toJSON(e) : undefined);
        }
        else {
            obj.pullRequestList = [];
        }
        message.pullRequestCount !== undefined &&
            (obj.pullRequestCount = message.pullRequestCount);
        if (message.organizationList) {
            obj.organizationList = message.organizationList.map((e) => e ? Organization.toJSON(e) : undefined);
        }
        else {
            obj.organizationList = [];
        }
        message.organizationCount !== undefined &&
            (obj.organizationCount = message.organizationCount);
        if (message.commentList) {
            obj.commentList = message.commentList.map((e) => e ? Comment.toJSON(e) : undefined);
        }
        else {
            obj.commentList = [];
        }
        message.commentCount !== undefined &&
            (obj.commentCount = message.commentCount);
        if (message.issueList) {
            obj.issueList = message.issueList.map((e) => e ? Issue.toJSON(e) : undefined);
        }
        else {
            obj.issueList = [];
        }
        message.issueCount !== undefined && (obj.issueCount = message.issueCount);
        if (message.repositoryList) {
            obj.repositoryList = message.repositoryList.map((e) => e ? Repository.toJSON(e) : undefined);
        }
        else {
            obj.repositoryList = [];
        }
        message.repositoryCount !== undefined &&
            (obj.repositoryCount = message.repositoryCount);
        if (message.userList) {
            obj.userList = message.userList.map((e) => e ? User.toJSON(e) : undefined);
        }
        else {
            obj.userList = [];
        }
        message.userCount !== undefined && (obj.userCount = message.userCount);
        if (message.whoisList) {
            obj.whoisList = message.whoisList.map((e) => e ? Whois.toJSON(e) : undefined);
        }
        else {
            obj.whoisList = [];
        }
        message.whoisCount !== undefined && (obj.whoisCount = message.whoisCount);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseGenesisState };
        message.taskList = [];
        message.releaseList = [];
        message.pullRequestList = [];
        message.organizationList = [];
        message.commentList = [];
        message.issueList = [];
        message.repositoryList = [];
        message.userList = [];
        message.whoisList = [];
        if (object.taskList !== undefined && object.taskList !== null) {
            for (const e of object.taskList) {
                message.taskList.push(Task.fromPartial(e));
            }
        }
        if (object.taskCount !== undefined && object.taskCount !== null) {
            message.taskCount = object.taskCount;
        }
        else {
            message.taskCount = 0;
        }
        if (object.releaseList !== undefined && object.releaseList !== null) {
            for (const e of object.releaseList) {
                message.releaseList.push(Release.fromPartial(e));
            }
        }
        if (object.releaseCount !== undefined && object.releaseCount !== null) {
            message.releaseCount = object.releaseCount;
        }
        else {
            message.releaseCount = 0;
        }
        if (object.pullRequestList !== undefined &&
            object.pullRequestList !== null) {
            for (const e of object.pullRequestList) {
                message.pullRequestList.push(PullRequest.fromPartial(e));
            }
        }
        if (object.pullRequestCount !== undefined &&
            object.pullRequestCount !== null) {
            message.pullRequestCount = object.pullRequestCount;
        }
        else {
            message.pullRequestCount = 0;
        }
        if (object.organizationList !== undefined &&
            object.organizationList !== null) {
            for (const e of object.organizationList) {
                message.organizationList.push(Organization.fromPartial(e));
            }
        }
        if (object.organizationCount !== undefined &&
            object.organizationCount !== null) {
            message.organizationCount = object.organizationCount;
        }
        else {
            message.organizationCount = 0;
        }
        if (object.commentList !== undefined && object.commentList !== null) {
            for (const e of object.commentList) {
                message.commentList.push(Comment.fromPartial(e));
            }
        }
        if (object.commentCount !== undefined && object.commentCount !== null) {
            message.commentCount = object.commentCount;
        }
        else {
            message.commentCount = 0;
        }
        if (object.issueList !== undefined && object.issueList !== null) {
            for (const e of object.issueList) {
                message.issueList.push(Issue.fromPartial(e));
            }
        }
        if (object.issueCount !== undefined && object.issueCount !== null) {
            message.issueCount = object.issueCount;
        }
        else {
            message.issueCount = 0;
        }
        if (object.repositoryList !== undefined && object.repositoryList !== null) {
            for (const e of object.repositoryList) {
                message.repositoryList.push(Repository.fromPartial(e));
            }
        }
        if (object.repositoryCount !== undefined &&
            object.repositoryCount !== null) {
            message.repositoryCount = object.repositoryCount;
        }
        else {
            message.repositoryCount = 0;
        }
        if (object.userList !== undefined && object.userList !== null) {
            for (const e of object.userList) {
                message.userList.push(User.fromPartial(e));
            }
        }
        if (object.userCount !== undefined && object.userCount !== null) {
            message.userCount = object.userCount;
        }
        else {
            message.userCount = 0;
        }
        if (object.whoisList !== undefined && object.whoisList !== null) {
            for (const e of object.whoisList) {
                message.whoisList.push(Whois.fromPartial(e));
            }
        }
        if (object.whoisCount !== undefined && object.whoisCount !== null) {
            message.whoisCount = object.whoisCount;
        }
        else {
            message.whoisCount = 0;
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
