/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
export const protobufPackage = "gitopia.gitopia.gitopia";
const baseUser = {
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
export const User = {
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
        const message = { ...baseUser };
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
        const message = { ...baseUser };
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
        const message = { ...baseUser };
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
