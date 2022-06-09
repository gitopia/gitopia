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
export var RepositoryCollaboratorPermission;
(function (RepositoryCollaboratorPermission) {
    RepositoryCollaboratorPermission["READ"] = "READ";
    RepositoryCollaboratorPermission["TRIAGE"] = "TRIAGE";
    RepositoryCollaboratorPermission["WRITE"] = "WRITE";
    RepositoryCollaboratorPermission["MAINTAIN"] = "MAINTAIN";
    RepositoryCollaboratorPermission["ADMIN"] = "ADMIN";
})(RepositoryCollaboratorPermission || (RepositoryCollaboratorPermission = {}));
export var GitopiaCommentType;
(function (GitopiaCommentType) {
    GitopiaCommentType["ISSUE"] = "ISSUE";
    GitopiaCommentType["PULLREQUEST"] = "PULLREQUEST";
})(GitopiaCommentType || (GitopiaCommentType = {}));
export var GitopiaIssueState;
(function (GitopiaIssueState) {
    GitopiaIssueState["OPEN"] = "OPEN";
    GitopiaIssueState["CLOSED"] = "CLOSED";
})(GitopiaIssueState || (GitopiaIssueState = {}));
export var GitopiaMemberRole;
(function (GitopiaMemberRole) {
    GitopiaMemberRole["MEMBER"] = "MEMBER";
    GitopiaMemberRole["OWNER"] = "OWNER";
})(GitopiaMemberRole || (GitopiaMemberRole = {}));
export var GitopiaOwnerType;
(function (GitopiaOwnerType) {
    GitopiaOwnerType["USER"] = "USER";
    GitopiaOwnerType["DAO"] = "DAO";
})(GitopiaOwnerType || (GitopiaOwnerType = {}));
export var GitopiaPullRequestState;
(function (GitopiaPullRequestState) {
    GitopiaPullRequestState["OPEN"] = "OPEN";
    GitopiaPullRequestState["CLOSED"] = "CLOSED";
    GitopiaPullRequestState["MERGED"] = "MERGED";
})(GitopiaPullRequestState || (GitopiaPullRequestState = {}));
export var GitopiaStore;
(function (GitopiaStore) {
    GitopiaStore["NONE"] = "NONE";
    GitopiaStore["IPFS"] = "IPFS";
    GitopiaStore["ARWEAVE"] = "ARWEAVE";
})(GitopiaStore || (GitopiaStore = {}));
export var GitopiaTaskState;
(function (GitopiaTaskState) {
    GitopiaTaskState["TASK_STATE_PENDING"] = "TASK_STATE_PENDING";
    GitopiaTaskState["TASK_STATE_SUCCESS"] = "TASK_STATE_SUCCESS";
    GitopiaTaskState["TASK_STATE_FAILURE"] = "TASK_STATE_FAILURE";
})(GitopiaTaskState || (GitopiaTaskState = {}));
export var GitopiaTaskType;
(function (GitopiaTaskType) {
    GitopiaTaskType["TASK_TYPE_FORK_REPOSITORY"] = "TASK_TYPE_FORK_REPOSITORY";
    GitopiaTaskType["TASK_TYPE_SET_PULL_REQUEST_STATE"] = "TASK_TYPE_SET_PULL_REQUEST_STATE";
})(GitopiaTaskType || (GitopiaTaskType = {}));
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
 * @title gitopia/branch.proto
 * @version version not set
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * No description
         *
         * @tags Query
         * @name QueryCheckGitServerAuthorization
         * @request GET:/gitopia/gitopia/gitopia/authorizations/git-server/{userAddress}/{providerAddress}
         */
        this.queryCheckGitServerAuthorization = (userAddress, providerAddress, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/authorizations/git-server/${userAddress}/${providerAddress}`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryCheckStorageProviderAuthorization
         * @request GET:/gitopia/gitopia/gitopia/authorizations/storage-provider/{userAddress}/{providerAddress}
         */
        this.queryCheckStorageProviderAuthorization = (userAddress, providerAddress, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/authorizations/storage-provider/${userAddress}/${providerAddress}`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryBranchAll
         * @summary Queries a list of Branch items.
         * @request GET:/gitopia/gitopia/gitopia/branch
         */
        this.queryBranchAll = (query, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/branch`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
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
         * @name QueryDaoAll
         * @summary Queries a list of Dao items.
         * @request GET:/gitopia/gitopia/gitopia/dao
         */
        this.queryDaoAll = (query, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/dao`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryDaoMemberAll
         * @summary Queries a list of Dao Member.
         * @request GET:/gitopia/gitopia/gitopia/dao/{daoId}/member
         */
        this.queryDaoMemberAll = (daoId, query, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/dao/${daoId}/member`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryDaoMember
         * @summary Queries a Member by id.
         * @request GET:/gitopia/gitopia/gitopia/dao/{daoId}/member/{userId}
         */
        this.queryDaoMember = (daoId, userId, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/dao/${daoId}/member/${userId}`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryDao
         * @summary Queries a Dao by id.
         * @request GET:/gitopia/gitopia/gitopia/dao/{id}
         */
        this.queryDao = (id, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/dao/${id}`,
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
         * @name QueryMemberAll
         * @summary Queries a list of Member items.
         * @request GET:/gitopia/gitopia/gitopia/member
         */
        this.queryMemberAll = (query, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/member`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryPullRequestMergePermission
         * @request GET:/gitopia/gitopia/gitopia/permissions/{userId}/pull/{pullId}/merge
         */
        this.queryPullRequestMergePermission = (userId, pullId, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/permissions/${userId}/pull/${pullId}/merge`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryPullRequestAll
         * @summary Queries a list of pullRequest items.
         * @request GET:/gitopia/gitopia/gitopia/pullRequest
         */
        this.queryPullRequestAll = (query, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/pullRequest`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryPullRequest
         * @summary Queries a pullRequest by id.
         * @request GET:/gitopia/gitopia/gitopia/pullRequest/{id}
         */
        this.queryPullRequest = (id, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/pullRequest/${id}`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryReleaseAll
         * @summary Queries a list of release items.
         * @request GET:/gitopia/gitopia/gitopia/release
         */
        this.queryReleaseAll = (query, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/release`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryRelease
         * @summary Queries a release by id.
         * @request GET:/gitopia/gitopia/gitopia/release/{id}
         */
        this.queryRelease = (id, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/release/${id}`,
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
         * @name QueryStorageProviderAll
         * @summary Queries a list of StorageProvider items.
         * @request GET:/gitopia/gitopia/gitopia/storage_provider
         */
        this.queryStorageProviderAll = (query, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/storage_provider`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryStorageProvider
         * @summary Queries a StorageProvider by id.
         * @request GET:/gitopia/gitopia/gitopia/storage_provider/{id}
         */
        this.queryStorageProvider = (id, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/storage_provider/${id}`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryTagAll
         * @summary Queries a list of Tag items.
         * @request GET:/gitopia/gitopia/gitopia/tag
         */
        this.queryTagAll = (query, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/tag`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryTaskAll
         * @summary Queries a list of Task items.
         * @request GET:/gitopia/gitopia/gitopia/task
         */
        this.queryTaskAll = (query, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/task`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryTask
         * @summary Queries a Task by id.
         * @request GET:/gitopia/gitopia/gitopia/task/{id}
         */
        this.queryTask = (id, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/task/${id}`,
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
         * @name QueryAnyRepositoryAll
         * @summary Queries a list of user repositories.
         * @request GET:/gitopia/gitopia/gitopia/user/{id}/repository
         */
        this.queryAnyRepositoryAll = (id, query, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/user/${id}/repository`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryAnyRepository
         * @summary Queries a repository by user id and repository name
         * @request GET:/gitopia/gitopia/gitopia/user/{id}/repository/{repositoryName}
         */
        this.queryAnyRepository = (id, repositoryName, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/user/${id}/repository/${repositoryName}`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryUserDaoAll
         * @summary Queries a list of User Dao.
         * @request GET:/gitopia/gitopia/gitopia/user/{userId}/dao
         */
        this.queryUserDaoAll = (userId, query, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/user/${userId}/dao`,
            method: "GET",
            query: query,
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
        /**
         * No description
         *
         * @tags Query
         * @name QueryRepositoryBranchAll
         * @summary Queries a list of Repository Branch.
         * @request GET:/gitopia/gitopia/gitopia/{id}/repository/{repositoryName}/branch
         */
        this.queryRepositoryBranchAll = (id, repositoryName, query, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/${id}/repository/${repositoryName}/branch`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryRepositoryBranch
         * @summary Queries Repository Branch by name.
         * @request GET:/gitopia/gitopia/gitopia/{id}/repository/{repositoryName}/branch/{branchName}
         */
        this.queryRepositoryBranch = (id, repositoryName, branchName, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/${id}/repository/${repositoryName}/branch/${branchName}`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryRepositoryBranchSha
         * @request GET:/gitopia/gitopia/gitopia/{id}/repository/{repositoryName}/branch/{branchName}/sha
         */
        this.queryRepositoryBranchSha = (id, repositoryName, branchName, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/${id}/repository/${repositoryName}/branch/${branchName}/sha`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryForkAll
         * @summary Queries a repository forks by id.
         * @request GET:/gitopia/gitopia/gitopia/{id}/repository/{repositoryName}/forks
         */
        this.queryForkAll = (id, repositoryName, query, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/${id}/repository/${repositoryName}/forks`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryRepositoryReleaseAll
         * @request GET:/gitopia/gitopia/gitopia/{id}/repository/{repositoryName}/releases
         */
        this.queryRepositoryReleaseAll = (id, repositoryName, query, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/${id}/repository/${repositoryName}/releases`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryRepositoryReleaseLatest
         * @request GET:/gitopia/gitopia/gitopia/{id}/repository/{repositoryName}/releases/latest
         */
        this.queryRepositoryReleaseLatest = (id, repositoryName, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/${id}/repository/${repositoryName}/releases/latest`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryRepositoryRelease
         * @request GET:/gitopia/gitopia/gitopia/{id}/repository/{repositoryName}/releases/tag/{tagName}
         */
        this.queryRepositoryRelease = (id, repositoryName, tagName, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/${id}/repository/${repositoryName}/releases/tag/${tagName}`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryRepositoryTagAll
         * @summary Queries a list of Repository Tag.
         * @request GET:/gitopia/gitopia/gitopia/{id}/repository/{repositoryName}/tag
         */
        this.queryRepositoryTagAll = (id, repositoryName, query, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/${id}/repository/${repositoryName}/tag`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryRepositoryTag
         * @summary Queries a Repository Tag by id.
         * @request GET:/gitopia/gitopia/gitopia/{id}/repository/{repositoryName}/tag/{tagName}
         */
        this.queryRepositoryTag = (id, repositoryName, tagName, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/${id}/repository/${repositoryName}/tag/${tagName}`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryRepositoryTagSha
         * @request GET:/gitopia/gitopia/gitopia/{id}/repository/{repositoryName}/tag/{tagName}/sha
         */
        this.queryRepositoryTagSha = (id, repositoryName, tagName, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/${id}/repository/${repositoryName}/tag/${tagName}/sha`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryRepositoryIssueAll
         * @summary Queries a list of repository items.
         * @request GET:/gitopia/gitopia/gitopia/{id}/{repositoryName}/issue
         */
        this.queryRepositoryIssueAll = (id, repositoryName, query, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/${id}/${repositoryName}/issue`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryRepositoryIssue
         * @summary Queries a repository by id.
         * @request GET:/gitopia/gitopia/gitopia/{id}/{repositoryName}/issue/{issueIid}
         */
        this.queryRepositoryIssue = (id, repositoryName, issueIid, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/${id}/${repositoryName}/issue/${issueIid}`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryRepositoryPullRequestAll
         * @request GET:/gitopia/gitopia/gitopia/{id}/{repositoryName}/pull
         */
        this.queryRepositoryPullRequestAll = (id, repositoryName, query, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/${id}/${repositoryName}/pull`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryRepositoryPullRequest
         * @summary Queries a repository pullRequest by id.
         * @request GET:/gitopia/gitopia/gitopia/{id}/{repositoryName}/pull/{pullIid}
         */
        this.queryRepositoryPullRequest = (id, repositoryName, pullIid, params = {}) => this.request({
            path: `/gitopia/gitopia/gitopia/${id}/${repositoryName}/pull/${pullIid}`,
            method: "GET",
            format: "json",
            ...params,
        });
    }
}
