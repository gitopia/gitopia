/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
export const protobufPackage = "gitopia.gitopia.gitopia";
const baseOrganization = {
    creator: "",
    id: 0,
    name: "",
    avatarUrl: "",
    followers: "",
    following: "",
    repositories: "",
    repositoryNames: "",
    teams: "",
    members: "",
    location: "",
    email: "",
    website: "",
    verified: "",
    description: "",
    createdAt: "",
    updatedAt: "",
    extensions: "",
};
export const Organization = {
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
        if (message.repositoryNames !== "") {
            writer.uint32(66).string(message.repositoryNames);
        }
        if (message.teams !== "") {
            writer.uint32(74).string(message.teams);
        }
        if (message.members !== "") {
            writer.uint32(82).string(message.members);
        }
        if (message.location !== "") {
            writer.uint32(90).string(message.location);
        }
        if (message.email !== "") {
            writer.uint32(98).string(message.email);
        }
        if (message.website !== "") {
            writer.uint32(106).string(message.website);
        }
        if (message.verified !== "") {
            writer.uint32(114).string(message.verified);
        }
        if (message.description !== "") {
            writer.uint32(122).string(message.description);
        }
        if (message.createdAt !== "") {
            writer.uint32(130).string(message.createdAt);
        }
        if (message.updatedAt !== "") {
            writer.uint32(138).string(message.updatedAt);
        }
        if (message.extensions !== "") {
            writer.uint32(146).string(message.extensions);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseOrganization };
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
                    message.repositoryNames = reader.string();
                    break;
                case 9:
                    message.teams = reader.string();
                    break;
                case 10:
                    message.members = reader.string();
                    break;
                case 11:
                    message.location = reader.string();
                    break;
                case 12:
                    message.email = reader.string();
                    break;
                case 13:
                    message.website = reader.string();
                    break;
                case 14:
                    message.verified = reader.string();
                    break;
                case 15:
                    message.description = reader.string();
                    break;
                case 16:
                    message.createdAt = reader.string();
                    break;
                case 17:
                    message.updatedAt = reader.string();
                    break;
                case 18:
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
        const message = { ...baseOrganization };
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
        if (object.repositoryNames !== undefined &&
            object.repositoryNames !== null) {
            message.repositoryNames = String(object.repositoryNames);
        }
        else {
            message.repositoryNames = "";
        }
        if (object.teams !== undefined && object.teams !== null) {
            message.teams = String(object.teams);
        }
        else {
            message.teams = "";
        }
        if (object.members !== undefined && object.members !== null) {
            message.members = String(object.members);
        }
        else {
            message.members = "";
        }
        if (object.location !== undefined && object.location !== null) {
            message.location = String(object.location);
        }
        else {
            message.location = "";
        }
        if (object.email !== undefined && object.email !== null) {
            message.email = String(object.email);
        }
        else {
            message.email = "";
        }
        if (object.website !== undefined && object.website !== null) {
            message.website = String(object.website);
        }
        else {
            message.website = "";
        }
        if (object.verified !== undefined && object.verified !== null) {
            message.verified = String(object.verified);
        }
        else {
            message.verified = "";
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = String(object.description);
        }
        else {
            message.description = "";
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
        message.name !== undefined && (obj.name = message.name);
        message.avatarUrl !== undefined && (obj.avatarUrl = message.avatarUrl);
        message.followers !== undefined && (obj.followers = message.followers);
        message.following !== undefined && (obj.following = message.following);
        message.repositories !== undefined &&
            (obj.repositories = message.repositories);
        message.repositoryNames !== undefined &&
            (obj.repositoryNames = message.repositoryNames);
        message.teams !== undefined && (obj.teams = message.teams);
        message.members !== undefined && (obj.members = message.members);
        message.location !== undefined && (obj.location = message.location);
        message.email !== undefined && (obj.email = message.email);
        message.website !== undefined && (obj.website = message.website);
        message.verified !== undefined && (obj.verified = message.verified);
        message.description !== undefined &&
            (obj.description = message.description);
        message.createdAt !== undefined && (obj.createdAt = message.createdAt);
        message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt);
        message.extensions !== undefined && (obj.extensions = message.extensions);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseOrganization };
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
        if (object.repositoryNames !== undefined &&
            object.repositoryNames !== null) {
            message.repositoryNames = object.repositoryNames;
        }
        else {
            message.repositoryNames = "";
        }
        if (object.teams !== undefined && object.teams !== null) {
            message.teams = object.teams;
        }
        else {
            message.teams = "";
        }
        if (object.members !== undefined && object.members !== null) {
            message.members = object.members;
        }
        else {
            message.members = "";
        }
        if (object.location !== undefined && object.location !== null) {
            message.location = object.location;
        }
        else {
            message.location = "";
        }
        if (object.email !== undefined && object.email !== null) {
            message.email = object.email;
        }
        else {
            message.email = "";
        }
        if (object.website !== undefined && object.website !== null) {
            message.website = object.website;
        }
        else {
            message.website = "";
        }
        if (object.verified !== undefined && object.verified !== null) {
            message.verified = object.verified;
        }
        else {
            message.verified = "";
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = object.description;
        }
        else {
            message.description = "";
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
