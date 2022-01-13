/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import { Requests } from "../gitopia/request";
export const protobufPackage = "gitopia.gitopia.gitopia";
export var OrganizationMember_Role;
(function (OrganizationMember_Role) {
    OrganizationMember_Role[OrganizationMember_Role["MEMBER"] = 0] = "MEMBER";
    OrganizationMember_Role[OrganizationMember_Role["OWNER"] = 1] = "OWNER";
    OrganizationMember_Role[OrganizationMember_Role["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(OrganizationMember_Role || (OrganizationMember_Role = {}));
export function organizationMember_RoleFromJSON(object) {
    switch (object) {
        case 0:
        case "MEMBER":
            return OrganizationMember_Role.MEMBER;
        case 1:
        case "OWNER":
            return OrganizationMember_Role.OWNER;
        case -1:
        case "UNRECOGNIZED":
        default:
            return OrganizationMember_Role.UNRECOGNIZED;
    }
}
export function organizationMember_RoleToJSON(object) {
    switch (object) {
        case OrganizationMember_Role.MEMBER:
            return "MEMBER";
        case OrganizationMember_Role.OWNER:
            return "OWNER";
        default:
            return "UNKNOWN";
    }
}
const baseOrganization = {
    creator: "",
    id: 0,
    address: "",
    name: "",
    avatarUrl: "",
    followers: "",
    following: "",
    teams: 0,
    location: "",
    email: "",
    website: "",
    verified: false,
    description: "",
    createdAt: 0,
    updatedAt: 0,
};
export const Organization = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== 0) {
            writer.uint32(16).uint64(message.id);
        }
        if (message.address !== "") {
            writer.uint32(26).string(message.address);
        }
        if (message.name !== "") {
            writer.uint32(34).string(message.name);
        }
        if (message.avatarUrl !== "") {
            writer.uint32(42).string(message.avatarUrl);
        }
        for (const v of message.followers) {
            writer.uint32(50).string(v);
        }
        for (const v of message.following) {
            writer.uint32(58).string(v);
        }
        for (const v of message.repositories) {
            OrganizationRepository.encode(v, writer.uint32(66).fork()).ldelim();
        }
        writer.uint32(74).fork();
        for (const v of message.teams) {
            writer.uint64(v);
        }
        writer.ldelim();
        for (const v of message.members) {
            OrganizationMember.encode(v, writer.uint32(82).fork()).ldelim();
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
        if (message.verified === true) {
            writer.uint32(112).bool(message.verified);
        }
        if (message.description !== "") {
            writer.uint32(122).string(message.description);
        }
        if (message.createdAt !== 0) {
            writer.uint32(128).int64(message.createdAt);
        }
        if (message.updatedAt !== 0) {
            writer.uint32(136).int64(message.updatedAt);
        }
        if (message.requests !== undefined) {
            Requests.encode(message.requests, writer.uint32(146).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseOrganization };
        message.followers = [];
        message.following = [];
        message.repositories = [];
        message.teams = [];
        message.members = [];
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
                    message.address = reader.string();
                    break;
                case 4:
                    message.name = reader.string();
                    break;
                case 5:
                    message.avatarUrl = reader.string();
                    break;
                case 6:
                    message.followers.push(reader.string());
                    break;
                case 7:
                    message.following.push(reader.string());
                    break;
                case 8:
                    message.repositories.push(OrganizationRepository.decode(reader, reader.uint32()));
                    break;
                case 9:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.teams.push(longToNumber(reader.uint64()));
                        }
                    }
                    else {
                        message.teams.push(longToNumber(reader.uint64()));
                    }
                    break;
                case 10:
                    message.members.push(OrganizationMember.decode(reader, reader.uint32()));
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
                    message.verified = reader.bool();
                    break;
                case 15:
                    message.description = reader.string();
                    break;
                case 16:
                    message.createdAt = longToNumber(reader.int64());
                    break;
                case 17:
                    message.updatedAt = longToNumber(reader.int64());
                    break;
                case 18:
                    message.requests = Requests.decode(reader, reader.uint32());
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
        message.followers = [];
        message.following = [];
        message.repositories = [];
        message.teams = [];
        message.members = [];
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
        if (object.address !== undefined && object.address !== null) {
            message.address = String(object.address);
        }
        else {
            message.address = "";
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
                message.repositories.push(OrganizationRepository.fromJSON(e));
            }
        }
        if (object.teams !== undefined && object.teams !== null) {
            for (const e of object.teams) {
                message.teams.push(Number(e));
            }
        }
        if (object.members !== undefined && object.members !== null) {
            for (const e of object.members) {
                message.members.push(OrganizationMember.fromJSON(e));
            }
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
            message.verified = Boolean(object.verified);
        }
        else {
            message.verified = false;
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = String(object.description);
        }
        else {
            message.description = "";
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
        if (object.requests !== undefined && object.requests !== null) {
            message.requests = Requests.fromJSON(object.requests);
        }
        else {
            message.requests = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        message.address !== undefined && (obj.address = message.address);
        message.name !== undefined && (obj.name = message.name);
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
            obj.repositories = message.repositories.map((e) => e ? OrganizationRepository.toJSON(e) : undefined);
        }
        else {
            obj.repositories = [];
        }
        if (message.teams) {
            obj.teams = message.teams.map((e) => e);
        }
        else {
            obj.teams = [];
        }
        if (message.members) {
            obj.members = message.members.map((e) => e ? OrganizationMember.toJSON(e) : undefined);
        }
        else {
            obj.members = [];
        }
        message.location !== undefined && (obj.location = message.location);
        message.email !== undefined && (obj.email = message.email);
        message.website !== undefined && (obj.website = message.website);
        message.verified !== undefined && (obj.verified = message.verified);
        message.description !== undefined &&
            (obj.description = message.description);
        message.createdAt !== undefined && (obj.createdAt = message.createdAt);
        message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt);
        message.requests !== undefined &&
            (obj.requests = message.requests
                ? Requests.toJSON(message.requests)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseOrganization };
        message.followers = [];
        message.following = [];
        message.repositories = [];
        message.teams = [];
        message.members = [];
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
        if (object.address !== undefined && object.address !== null) {
            message.address = object.address;
        }
        else {
            message.address = "";
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
                message.repositories.push(OrganizationRepository.fromPartial(e));
            }
        }
        if (object.teams !== undefined && object.teams !== null) {
            for (const e of object.teams) {
                message.teams.push(e);
            }
        }
        if (object.members !== undefined && object.members !== null) {
            for (const e of object.members) {
                message.members.push(OrganizationMember.fromPartial(e));
            }
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
            message.verified = false;
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
            message.createdAt = 0;
        }
        if (object.updatedAt !== undefined && object.updatedAt !== null) {
            message.updatedAt = object.updatedAt;
        }
        else {
            message.updatedAt = 0;
        }
        if (object.requests !== undefined && object.requests !== null) {
            message.requests = Requests.fromPartial(object.requests);
        }
        else {
            message.requests = undefined;
        }
        return message;
    },
};
const baseOrganizationRepository = { name: "", id: 0 };
export const OrganizationRepository = {
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
        const message = { ...baseOrganizationRepository };
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
        const message = { ...baseOrganizationRepository };
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
        const message = { ...baseOrganizationRepository };
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
const baseOrganizationMember = { id: "", role: 0 };
export const OrganizationMember = {
    encode(message, writer = Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.role !== 0) {
            writer.uint32(16).int32(message.role);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseOrganizationMember };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
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
        const message = { ...baseOrganizationMember };
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = "";
        }
        if (object.role !== undefined && object.role !== null) {
            message.role = organizationMember_RoleFromJSON(object.role);
        }
        else {
            message.role = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        message.role !== undefined &&
            (obj.role = organizationMember_RoleToJSON(message.role));
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseOrganizationMember };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = "";
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
