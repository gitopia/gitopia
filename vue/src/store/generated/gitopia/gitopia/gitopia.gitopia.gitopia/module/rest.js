/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */
export var ContentType;
(function (ContentType) {
    ContentType["Json"] = "application/json";
    ContentType["FormData"] = "multipart/form-data";
    ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
})(ContentType || (ContentType = {}));
export class HttpClient {
    constructor(apiConfig = {}) {
        this.baseUrl = "";
        this.securityData = null;
        this.securityWorker = null;
        this.abortControllers = new Map();
        this.baseApiParams = {
            credentials: "same-origin",
            headers: {},
            redirect: "follow",
            referrerPolicy: "no-referrer",
        };
        this.setSecurityData = (data) => {
            this.securityData = data;
        };
        this.contentFormatters = {
            [ContentType.Json]: (input) => input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
            [ContentType.FormData]: (input) => Object.keys(input || {}).reduce((data, key) => {
                data.append(key, input[key]);
                return data;
            }, new FormData()),
            [ContentType.UrlEncoded]: (input) => this.toQueryString(input),
        };
        this.createAbortSignal = (cancelToken) => {
            if (this.abortControllers.has(cancelToken)) {
                const abortController = this.abortControllers.get(cancelToken);
                if (abortController) {
                    return abortController.signal;
                }
                return void 0;
            }
            const abortController = new AbortController();
            this.abortControllers.set(cancelToken, abortController);
            return abortController.signal;
        };
        this.abortRequest = (cancelToken) => {
            const abortController = this.abortControllers.get(cancelToken);
            if (abortController) {
                abortController.abort();
                this.abortControllers.delete(cancelToken);
            }
        };
        this.request = ({ body, secure, path, type, query, format = "json", baseUrl, cancelToken, ...params }) => {
            const secureParams = (secure && this.securityWorker && this.securityWorker(this.securityData)) || {};
            const requestParams = this.mergeRequestParams(params, secureParams);
            const queryString = query && this.toQueryString(query);
            const payloadFormatter = this.contentFormatters[type || ContentType.Json];
            return fetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
                ...requestParams,
                headers: {
                    ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
                    ...(requestParams.headers || {}),
                },
                signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
                body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
            }).then(async (response) => {
                const r = response;
                r.data = null;
                r.error = null;
                const data = await response[format]()
                    .then((data) => {
                    if (r.ok) {
                        r.data = data;
                    }
                    else {
                        r.error = data;
                    }
                    return r;
                })
                    .catch((e) => {
                    r.error = e;
                    return r;
                });
                if (cancelToken) {
                    this.abortControllers.delete(cancelToken);
                }
                if (!response.ok)
                    throw data;
                return data;
            });
        };
        Object.assign(this, apiConfig);
    }
    addQueryParam(query, key) {
        const value = query[key];
        return (encodeURIComponent(key) +
            "=" +
            encodeURIComponent(Array.isArray(value) ? value.join(",") : typeof value === "number" ? value : `${value}`));
    }
    toQueryString(rawQuery) {
        const query = rawQuery || {};
        const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
        return keys
            .map((key) => typeof query[key] === "object" && !Array.isArray(query[key])
            ? this.toQueryString(query[key])
            : this.addQueryParam(query, key))
            .join("&");
    }
    addQueryParams(rawQuery) {
        const queryString = this.toQueryString(rawQuery);
        return queryString ? `?${queryString}` : "";
    }
    mergeRequestParams(params1, params2) {
        return {
            ...this.baseApiParams,
            ...params1,
            ...(params2 || {}),
            headers: {
                ...(this.baseApiParams.headers || {}),
                ...(params1.headers || {}),
                ...((params2 && params2.headers) || {}),
            },
        };
    }
}
/**
 * @title gitopia/comment.proto
 * @version version not set
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * No description
         *
         * @tags Query
         * @name QueryCommentAll
         * @summary Queries a list of comment items.
         * @request GET:/gitopia/gitopia/gitopia/comment
         */
        this.queryCommentAll = (query, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/comment`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryComment
         * @summary Queries a comment by id.
         * @request GET:/gitopia/gitopia/gitopia/comment/{id}
         */
        this.queryComment = (id, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/comment/${id}`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryIssueAll
         * @summary Queries a list of issue items.
         * @request GET:/gitopia/gitopia/gitopia/issue
         */
        this.queryIssueAll = (query, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/issue`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryIssue
         * @summary Queries a issue by id.
         * @request GET:/gitopia/gitopia/gitopia/issue/{id}
         */
        this.queryIssue = (id, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/issue/${id}`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryRepositoryAll
         * @summary Queries a list of repository items.
         * @request GET:/gitopia/gitopia/gitopia/repository
         */
        this.queryRepositoryAll = (query, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/repository`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryRepository
         * @summary Queries a repository by id.
         * @request GET:/gitopia/gitopia/gitopia/repository/{id}
         */
        this.queryRepository = (id, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/repository/${id}`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryBranchAll
         * @summary Queries a repository by id.
         * @request GET:/gitopia/gitopia/gitopia/repository/{id}/branches
         */
        this.queryBranchAll = (id, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/repository/${id}/branches`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryUserRepository
         * @summary Queries a repository by user id and repository name
         * @request GET:/gitopia/gitopia/gitopia/repository/{userId}/{repositoryName}
         */
        this.queryUserRepository = (userId, repositoryName, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/repository/${userId}/${repositoryName}`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryUserAll
         * @summary Queries a list of user items.
         * @request GET:/gitopia/gitopia/gitopia/user
         */
        this.queryUserAll = (query, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/user`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryUser
         * @summary Queries a user by id.
         * @request GET:/gitopia/gitopia/gitopia/user/{id}
         */
        this.queryUser = (id, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/user/${id}`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryUserRepositoryAll
         * @summary Queries a list of user repositories.
         * @request GET:/gitopia/gitopia/gitopia/user/{id}/repositories
         */
        this.queryUserRepositoryAll = (id, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/user/${id}/repositories`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryWhoisAll
         * @summary Queries a list of whois items.
         * @request GET:/gitopia/gitopia/gitopia/whois
         */
        this.queryWhoisAll = (query, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/whois`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryWhois
         * @summary Queries a whois by id.
         * @request GET:/gitopia/gitopia/gitopia/whois/{name}
         */
        this.queryWhois = (name, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/whois/${name}`,
            method: "GET",
            format: "json",
            ...params,
        });
    }
}