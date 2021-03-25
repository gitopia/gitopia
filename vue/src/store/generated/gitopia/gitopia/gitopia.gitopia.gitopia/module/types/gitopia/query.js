/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";
import { Whois } from "../gitopia/whois";
import { PageRequest, PageResponse, } from "../cosmos/base/query/v1beta1/pagination";
export const protobufPackage = "gitopia.gitopia.gitopia";
const baseQueryGetWhoisRequest = { name: "" };
export const QueryGetWhoisRequest = {
    encode(message, writer = Writer.create()) {
        if (message.name !== "") {
            writer.uint32(10).string(message.name);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetWhoisRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
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
        const message = { ...baseQueryGetWhoisRequest };
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
        message.name !== undefined && (obj.name = message.name);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetWhoisRequest };
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = "";
        }
        return message;
    },
};
const baseQueryGetWhoisResponse = {};
export const QueryGetWhoisResponse = {
    encode(message, writer = Writer.create()) {
        if (message.Whois !== undefined) {
            Whois.encode(message.Whois, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetWhoisResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Whois = Whois.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetWhoisResponse };
        if (object.Whois !== undefined && object.Whois !== null) {
            message.Whois = Whois.fromJSON(object.Whois);
        }
        else {
            message.Whois = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.Whois !== undefined &&
            (obj.Whois = message.Whois ? Whois.toJSON(message.Whois) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetWhoisResponse };
        if (object.Whois !== undefined && object.Whois !== null) {
            message.Whois = Whois.fromPartial(object.Whois);
        }
        else {
            message.Whois = undefined;
        }
        return message;
    },
};
const baseQueryAllWhoisRequest = {};
export const QueryAllWhoisRequest = {
    encode(message, writer = Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllWhoisRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pagination = PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryAllWhoisRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageRequest.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllWhoisRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryAllWhoisResponse = {};
export const QueryAllWhoisResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.Whois) {
            Whois.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllWhoisResponse };
        message.Whois = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Whois.push(Whois.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = PageResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryAllWhoisResponse };
        message.Whois = [];
        if (object.Whois !== undefined && object.Whois !== null) {
            for (const e of object.Whois) {
                message.Whois.push(Whois.fromJSON(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.Whois) {
            obj.Whois = message.Whois.map((e) => (e ? Whois.toJSON(e) : undefined));
        }
        else {
            obj.Whois = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageResponse.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllWhoisResponse };
        message.Whois = [];
        if (object.Whois !== undefined && object.Whois !== null) {
            for (const e of object.Whois) {
                message.Whois.push(Whois.fromPartial(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
export class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    Whois(request) {
        const data = QueryGetWhoisRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "Whois", data);
        return promise.then((data) => QueryGetWhoisResponse.decode(new Reader(data)));
    }
    WhoisAll(request) {
        const data = QueryAllWhoisRequest.encode(request).finish();
        const promise = this.rpc.request("gitopia.gitopia.gitopia.Query", "WhoisAll", data);
        return promise.then((data) => QueryAllWhoisResponse.decode(new Reader(data)));
    }
}
