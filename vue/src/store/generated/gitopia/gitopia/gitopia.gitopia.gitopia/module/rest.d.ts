export interface MsgMultiSetRepositoryBranchBranch {
    name?: string;
    commitSHA?: string;
}
export interface MsgMultiSetRepositoryTagTag {
    name?: string;
    commitSHA?: string;
}
export declare enum OrganizationMemberRole {
    MEMBER = "MEMBER",
    OWNER = "OWNER"
}
export declare enum RepositoryCollaboratorPermission {
    READ = "READ",
    TRIAGE = "TRIAGE",
    WRITE = "WRITE",
    MAINTAIN = "MAINTAIN",
    ADMIN = "ADMIN"
}
export interface GitopiaAttachment {
    name?: string;
    /** @format uint64 */
    size?: string;
    sha?: string;
    uploader?: string;
}
export interface GitopiaComment {
    creator?: string;
    /** @format uint64 */
    id?: string;
    /** @format uint64 */
    parentId?: string;
    /** @format uint64 */
    commentIid?: string;
    body?: string;
    attachments?: string[];
    diffHunk?: string;
    path?: string;
    system?: boolean;
    authorAssociation?: string;
    /** @format int64 */
    createdAt?: string;
    /** @format int64 */
    updatedAt?: string;
    commentType?: GitopiaCommentType;
}
export declare enum GitopiaCommentType {
    ISSUE = "ISSUE",
    PULLREQUEST = "PULLREQUEST"
}
export interface GitopiaIssue {
    creator?: string;
    /** @format uint64 */
    id?: string;
    /** @format uint64 */
    iid?: string;
    title?: string;
    state?: GitopiaIssueState;
    description?: string;
    comments?: string[];
    /** @format uint64 */
    commentsCount?: string;
    pullRequests?: string[];
    /** @format uint64 */
    repositoryId?: string;
    labels?: string[];
    /** @format uint64 */
    weight?: string;
    assignees?: string[];
    /** @format int64 */
    createdAt?: string;
    /** @format int64 */
    updatedAt?: string;
    /** @format int64 */
    closedAt?: string;
    closedBy?: string;
}
export interface GitopiaIssueOptions {
    createdBy?: string;
    state?: string;
    labels?: string;
    assignee?: string;
    labelIds?: string[];
    sort?: string;
    search?: string;
    /** @format int64 */
    updatedAfter?: string;
    /** @format int64 */
    updatedBefore?: string;
}
export declare enum GitopiaIssueState {
    OPEN = "OPEN",
    CLOSED = "CLOSED"
}
export declare type GitopiaMsgAddIssueAssigneesResponse = object;
export declare type GitopiaMsgAddIssueLabelsResponse = object;
export declare type GitopiaMsgAddPullRequestAssigneesResponse = object;
export declare type GitopiaMsgAddPullRequestLabelsResponse = object;
export declare type GitopiaMsgAddPullRequestReviewersResponse = object;
export declare type GitopiaMsgAuthorizeGitServerResponse = object;
export declare type GitopiaMsgChangeOwnerResponse = object;
export interface GitopiaMsgCreateCommentResponse {
    /** @format uint64 */
    id?: string;
}
export interface GitopiaMsgCreateIssueResponse {
    /** @format uint64 */
    id?: string;
    /** @format uint64 */
    iid?: string;
}
export interface GitopiaMsgCreateOrganizationResponse {
    id?: string;
}
export interface GitopiaMsgCreatePullRequestResponse {
    /** @format uint64 */
    id?: string;
    /** @format uint64 */
    iid?: string;
}
export interface GitopiaMsgCreateReleaseResponse {
    /** @format uint64 */
    id?: string;
}
export interface GitopiaMsgCreateRepositoryLabelResponse {
    /** @format uint64 */
    id?: string;
}
export interface GitopiaMsgCreateRepositoryResponse {
    /** @format uint64 */
    id?: string;
    name?: string;
}
export interface GitopiaMsgCreateTaskResponse {
    /** @format uint64 */
    id?: string;
}
export interface GitopiaMsgCreateUserResponse {
    id?: string;
}
export declare type GitopiaMsgDeleteBranchResponse = object;
export declare type GitopiaMsgDeleteCommentResponse = object;
export declare type GitopiaMsgDeleteIssueResponse = object;
export declare type GitopiaMsgDeleteOrganizationResponse = object;
export declare type GitopiaMsgDeletePullRequestResponse = object;
export declare type GitopiaMsgDeleteReleaseResponse = object;
export declare type GitopiaMsgDeleteRepositoryLabelResponse = object;
export declare type GitopiaMsgDeleteRepositoryResponse = object;
export declare type GitopiaMsgDeleteTagResponse = object;
export declare type GitopiaMsgDeleteTaskResponse = object;
export declare type GitopiaMsgDeleteUserResponse = object;
export declare type GitopiaMsgDeleteWhoisResponse = object;
export interface GitopiaMsgForkRepositoryResponse {
    /** @format uint64 */
    id?: string;
}
export interface GitopiaMsgForkRepositorySuccessResponse {
    /** @format uint64 */
    id?: string;
}
export declare type GitopiaMsgInvokeForkRepositoryResponse = object;
export declare type GitopiaMsgInvokeMergePullRequestResponse = object;
export declare type GitopiaMsgMultiDeleteBranchResponse = object;
export declare type GitopiaMsgMultiDeleteTagResponse = object;
export declare type GitopiaMsgMultiSetRepositoryBranchResponse = object;
export declare type GitopiaMsgMultiSetRepositoryTagResponse = object;
export declare type GitopiaMsgRemoveIssueAssigneesResponse = object;
export declare type GitopiaMsgRemoveIssueLabelsResponse = object;
export declare type GitopiaMsgRemoveOrganizationMemberResponse = object;
export declare type GitopiaMsgRemovePullRequestAssigneesResponse = object;
export declare type GitopiaMsgRemovePullRequestLabelsResponse = object;
export declare type GitopiaMsgRemovePullRequestReviewersResponse = object;
export declare type GitopiaMsgRemoveRepositoryCollaboratorResponse = object;
export declare type GitopiaMsgRenameOrganizationResponse = object;
export declare type GitopiaMsgRenameRepositoryResponse = object;
export declare type GitopiaMsgSetDefaultBranchResponse = object;
export interface GitopiaMsgSetPullRequestStateResponse {
    state?: string;
}
export declare type GitopiaMsgSetRepositoryBranchResponse = object;
export declare type GitopiaMsgSetRepositoryTagResponse = object;
export declare type GitopiaMsgSetWhoisResponse = object;
export interface GitopiaMsgToggleIssueStateResponse {
    state?: string;
}
export interface GitopiaMsgToggleRepositoryForkingResponse {
    allowForking?: boolean;
}
export declare type GitopiaMsgTransferUserResponse = object;
export declare type GitopiaMsgUpdateCommentResponse = object;
export declare type GitopiaMsgUpdateIssueDescriptionResponse = object;
export declare type GitopiaMsgUpdateIssueResponse = object;
export declare type GitopiaMsgUpdateIssueTitleResponse = object;
export declare type GitopiaMsgUpdateOrganizationAvatarResponse = object;
export declare type GitopiaMsgUpdateOrganizationDescriptionResponse = object;
export declare type GitopiaMsgUpdateOrganizationMemberResponse = object;
export declare type GitopiaMsgUpdateOrganizationResponse = object;
export declare type GitopiaMsgUpdatePullRequestDescriptionResponse = object;
export declare type GitopiaMsgUpdatePullRequestResponse = object;
export declare type GitopiaMsgUpdatePullRequestTitleResponse = object;
export declare type GitopiaMsgUpdateReleaseResponse = object;
export declare type GitopiaMsgUpdateRepositoryCollaboratorResponse = object;
export declare type GitopiaMsgUpdateRepositoryLabelResponse = object;
export declare type GitopiaMsgUpdateTaskResponse = object;
export declare type GitopiaMsgUpdateUserAvatarResponse = object;
export declare type GitopiaMsgUpdateUserBioResponse = object;
export declare type GitopiaMsgUpdateUserResponse = object;
export declare type GitopiaMsgUpdateWhoisResponse = object;
export interface GitopiaOrganization {
    creator?: string;
    /** @format uint64 */
    id?: string;
    address?: string;
    name?: string;
    avatarUrl?: string;
    followers?: string[];
    following?: string[];
    repositories?: GitopiaOrganizationRepository[];
    teams?: string[];
    members?: GitopiaOrganizationMember[];
    location?: string;
    website?: string;
    verified?: boolean;
    description?: string;
    /** @format int64 */
    createdAt?: string;
    /** @format int64 */
    updatedAt?: string;
}
export interface GitopiaOrganizationMember {
    id?: string;
    role?: OrganizationMemberRole;
}
export interface GitopiaOrganizationRepository {
    name?: string;
    /** @format uint64 */
    id?: string;
}
export interface GitopiaPullRequest {
    creator?: string;
    /** @format uint64 */
    id?: string;
    /** @format uint64 */
    iid?: string;
    title?: string;
    state?: GitopiaPullRequestState;
    description?: string;
    locked?: boolean;
    comments?: string[];
    /** @format uint64 */
    commentsCount?: string;
    issues?: string[];
    labels?: string[];
    assignees?: string[];
    reviewers?: string[];
    draft?: boolean;
    /** @format int64 */
    createdAt?: string;
    /** @format int64 */
    updatedAt?: string;
    /** @format int64 */
    closedAt?: string;
    closedBy?: string;
    /** @format int64 */
    mergedAt?: string;
    mergedBy?: string;
    mergeCommitSha?: string;
    maintainerCanModify?: boolean;
    head?: GitopiaPullRequestHead;
    base?: GitopiaPullRequestBase;
}
export interface GitopiaPullRequestBase {
    /** @format uint64 */
    repositoryId?: string;
    branch?: string;
    commitSha?: string;
}
export interface GitopiaPullRequestHead {
    /** @format uint64 */
    repositoryId?: string;
    branch?: string;
    commitSha?: string;
}
export interface GitopiaPullRequestOptions {
    createdBy?: string;
    state?: string;
    labels?: string;
    assignee?: string;
    reviewer?: string;
    labelIds?: string[];
    sort?: string;
    search?: string;
    /** @format int64 */
    updatedAfter?: string;
    /** @format int64 */
    updatedBefore?: string;
}
export declare enum GitopiaPullRequestState {
    OPEN = "OPEN",
    CLOSED = "CLOSED",
    MERGED = "MERGED"
}
export interface GitopiaQueryAllAddressRepositoryResponse {
    Repository?: GitopiaRepository[];
    /**
     * PageResponse is to be embedded in gRPC response messages where the
     * corresponding request message has used PageRequest.
     *
     *  message SomeResponse {
     *          repeated Bar results = 1;
     *          PageResponse page = 2;
     *  }
     */
    pagination?: V1Beta1PageResponse;
}
export interface GitopiaQueryAllCommentResponse {
    Comment?: GitopiaComment[];
    /**
     * PageResponse is to be embedded in gRPC response messages where the
     * corresponding request message has used PageRequest.
     *
     *  message SomeResponse {
     *          repeated Bar results = 1;
     *          PageResponse page = 2;
     *  }
     */
    pagination?: V1Beta1PageResponse;
}
export interface GitopiaQueryAllIssueResponse {
    Issue?: GitopiaIssue[];
    /**
     * PageResponse is to be embedded in gRPC response messages where the
     * corresponding request message has used PageRequest.
     *
     *  message SomeResponse {
     *          repeated Bar results = 1;
     *          PageResponse page = 2;
     *  }
     */
    pagination?: V1Beta1PageResponse;
}
export interface GitopiaQueryAllOrganizationResponse {
    Organization?: GitopiaOrganization[];
    /**
     * PageResponse is to be embedded in gRPC response messages where the
     * corresponding request message has used PageRequest.
     *
     *  message SomeResponse {
     *          repeated Bar results = 1;
     *          PageResponse page = 2;
     *  }
     */
    pagination?: V1Beta1PageResponse;
}
export interface GitopiaQueryAllPullRequestResponse {
    PullRequest?: GitopiaPullRequest[];
    /**
     * PageResponse is to be embedded in gRPC response messages where the
     * corresponding request message has used PageRequest.
     *
     *  message SomeResponse {
     *          repeated Bar results = 1;
     *          PageResponse page = 2;
     *  }
     */
    pagination?: V1Beta1PageResponse;
}
export interface GitopiaQueryAllReleaseResponse {
    Release?: GitopiaRelease[];
    /**
     * PageResponse is to be embedded in gRPC response messages where the
     * corresponding request message has used PageRequest.
     *
     *  message SomeResponse {
     *          repeated Bar results = 1;
     *          PageResponse page = 2;
     *  }
     */
    pagination?: V1Beta1PageResponse;
}
export interface GitopiaQueryAllRepositoryIssueResponse {
    Issue?: GitopiaIssue[];
    /**
     * PageResponse is to be embedded in gRPC response messages where the
     * corresponding request message has used PageRequest.
     *
     *  message SomeResponse {
     *          repeated Bar results = 1;
     *          PageResponse page = 2;
     *  }
     */
    pagination?: V1Beta1PageResponse;
}
export interface GitopiaQueryAllRepositoryPullRequestResponse {
    PullRequest?: GitopiaPullRequest[];
    /**
     * PageResponse is to be embedded in gRPC response messages where the
     * corresponding request message has used PageRequest.
     *
     *  message SomeResponse {
     *          repeated Bar results = 1;
     *          PageResponse page = 2;
     *  }
     */
    pagination?: V1Beta1PageResponse;
}
export interface GitopiaQueryAllRepositoryReleaseResponse {
    Release?: GitopiaRelease[];
    /**
     * PageResponse is to be embedded in gRPC response messages where the
     * corresponding request message has used PageRequest.
     *
     *  message SomeResponse {
     *          repeated Bar results = 1;
     *          PageResponse page = 2;
     *  }
     */
    pagination?: V1Beta1PageResponse;
}
export interface GitopiaQueryAllRepositoryResponse {
    Repository?: GitopiaRepository[];
    /**
     * PageResponse is to be embedded in gRPC response messages where the
     * corresponding request message has used PageRequest.
     *
     *  message SomeResponse {
     *          repeated Bar results = 1;
     *          PageResponse page = 2;
     *  }
     */
    pagination?: V1Beta1PageResponse;
}
export interface GitopiaQueryAllTaskResponse {
    Task?: GitopiaTask[];
    /**
     * PageResponse is to be embedded in gRPC response messages where the
     * corresponding request message has used PageRequest.
     *
     *  message SomeResponse {
     *          repeated Bar results = 1;
     *          PageResponse page = 2;
     *  }
     */
    pagination?: V1Beta1PageResponse;
}
export interface GitopiaQueryAllUserOrganizationResponse {
    organization?: GitopiaOrganization[];
}
export interface GitopiaQueryAllUserResponse {
    User?: GitopiaUser[];
    /**
     * PageResponse is to be embedded in gRPC response messages where the
     * corresponding request message has used PageRequest.
     *
     *  message SomeResponse {
     *          repeated Bar results = 1;
     *          PageResponse page = 2;
     *  }
     */
    pagination?: V1Beta1PageResponse;
}
export interface GitopiaQueryAllWhoisResponse {
    Whois?: GitopiaWhois[];
    /**
     * PageResponse is to be embedded in gRPC response messages where the
     * corresponding request message has used PageRequest.
     *
     *  message SomeResponse {
     *          repeated Bar results = 1;
     *          PageResponse page = 2;
     *  }
     */
    pagination?: V1Beta1PageResponse;
}
export interface GitopiaQueryCheckGitServerAuthorizationResponse {
    haveAuthorization?: boolean;
}
export interface GitopiaQueryGetAddressRepositoryResponse {
    Repository?: GitopiaRepository;
}
export interface GitopiaQueryGetAllBranchResponse {
    Branches?: GitopiaRepositoryBranch[];
}
export interface GitopiaQueryGetAllForkResponse {
    forks?: GitopiaRepositoryFork[];
    /**
     * PageResponse is to be embedded in gRPC response messages where the
     * corresponding request message has used PageRequest.
     *
     *  message SomeResponse {
     *          repeated Bar results = 1;
     *          PageResponse page = 2;
     *  }
     */
    pagination?: V1Beta1PageResponse;
}
export interface GitopiaQueryGetAllTagResponse {
    Tags?: GitopiaRepositoryTag[];
}
export interface GitopiaQueryGetBranchShaResponse {
    sha?: string;
}
export interface GitopiaQueryGetCommentResponse {
    Comment?: GitopiaComment;
}
export interface GitopiaQueryGetIssueResponse {
    Issue?: GitopiaIssue;
}
export interface GitopiaQueryGetLatestRepositoryReleaseResponse {
    Release?: GitopiaRelease;
}
export interface GitopiaQueryGetOrganizationResponse {
    Organization?: GitopiaOrganization;
}
export interface GitopiaQueryGetPullRequestMergePermissionResponse {
    havePermission?: boolean;
}
export interface GitopiaQueryGetPullRequestResponse {
    PullRequest?: GitopiaPullRequest;
}
export interface GitopiaQueryGetReleaseResponse {
    Release?: GitopiaRelease;
}
export interface GitopiaQueryGetRepositoryIssueResponse {
    Issue?: GitopiaIssue;
}
export interface GitopiaQueryGetRepositoryPullRequestResponse {
    PullRequest?: GitopiaPullRequest;
}
export interface GitopiaQueryGetRepositoryReleaseResponse {
    Release?: GitopiaRelease;
}
export interface GitopiaQueryGetRepositoryResponse {
    Repository?: GitopiaRepository;
}
export interface GitopiaQueryGetTagShaResponse {
    sha?: string;
}
export interface GitopiaQueryGetTaskResponse {
    Task?: GitopiaTask;
}
export interface GitopiaQueryGetUserResponse {
    User?: GitopiaUser;
}
export interface GitopiaQueryGetWhoisResponse {
    Whois?: GitopiaWhois;
}
export interface GitopiaRelease {
    creator?: string;
    /** @format uint64 */
    id?: string;
    /** @format uint64 */
    repositoryId?: string;
    tagName?: string;
    target?: string;
    name?: string;
    description?: string;
    attachments?: GitopiaAttachment[];
    draft?: boolean;
    preRelease?: boolean;
    isTag?: boolean;
    /** @format int64 */
    createdAt?: string;
    /** @format int64 */
    updatedAt?: string;
    /** @format int64 */
    publishedAt?: string;
}
export interface GitopiaRepository {
    creator?: string;
    /** @format uint64 */
    id?: string;
    name?: string;
    owner?: GitopiaRepositoryOwner;
    description?: string;
    forks?: string[];
    branches?: GitopiaRepositoryBranch[];
    tags?: GitopiaRepositoryTag[];
    subscribers?: string;
    commits?: string;
    issues?: GitopiaRepositoryIssue[];
    pullRequests?: GitopiaRepositoryPullRequest[];
    /** @format uint64 */
    issuesCount?: string;
    /** @format uint64 */
    pullsCount?: string;
    labels?: GitopiaRepositoryLabel[];
    /** @format uint64 */
    labelsCount?: string;
    releases?: GitopiaRepositoryRelease[];
    /** @format int64 */
    createdAt?: string;
    /** @format int64 */
    updatedAt?: string;
    /** @format int64 */
    pushedAt?: string;
    stargazers?: string[];
    archived?: boolean;
    license?: string;
    defaultBranch?: string;
    /** @format uint64 */
    parent?: string;
    fork?: boolean;
    collaborators?: GitopiaRepositoryCollaborator[];
    allowForking?: boolean;
}
export interface GitopiaRepositoryBranch {
    name?: string;
    sha?: string;
    /** @format int64 */
    lastUpdatedAt?: string;
}
export interface GitopiaRepositoryCollaborator {
    id?: string;
    permission?: RepositoryCollaboratorPermission;
}
export interface GitopiaRepositoryFork {
    creator?: string;
    /** @format uint64 */
    id?: string;
    name?: string;
    owner?: GitopiaRepositoryOwner;
    description?: string;
    /** @format uint64 */
    parent?: string;
    /** @format uint64 */
    forksCount?: string;
    /** @format uint64 */
    issuesCount?: string;
    /** @format uint64 */
    pullsCount?: string;
}
export interface GitopiaRepositoryIssue {
    /** @format uint64 */
    iid?: string;
    /** @format uint64 */
    id?: string;
}
export interface GitopiaRepositoryLabel {
    /** @format uint64 */
    id?: string;
    name?: string;
    color?: string;
    description?: string;
}
export interface GitopiaRepositoryOwner {
    id?: string;
    type?: GitopiaRepositoryOwnerType;
}
export declare enum GitopiaRepositoryOwnerType {
    USER = "USER",
    ORGANIZATION = "ORGANIZATION"
}
export interface GitopiaRepositoryPullRequest {
    /** @format uint64 */
    iid?: string;
    /** @format uint64 */
    id?: string;
}
export interface GitopiaRepositoryRelease {
    /** @format uint64 */
    id?: string;
    tagName?: string;
}
export interface GitopiaRepositoryTag {
    name?: string;
    sha?: string;
    /** @format int64 */
    lastUpdatedAt?: string;
}
export interface GitopiaTask {
    /** @format uint64 */
    id?: string;
    type?: GitopiaTaskType;
    state?: GitopiaTaskState;
    message?: string;
    creator?: string;
    provider?: string;
}
export declare enum GitopiaTaskState {
    TASK_STATE_PENDING = "TASK_STATE_PENDING",
    TASK_STATE_SUCCESS = "TASK_STATE_SUCCESS",
    TASK_STATE_FAILURE = "TASK_STATE_FAILURE"
}
export declare enum GitopiaTaskType {
    TASK_TYPE_FORK_REPOSITORY = "TASK_TYPE_FORK_REPOSITORY",
    TASK_TYPE_SET_PULL_REQUEST_STATE = "TASK_TYPE_SET_PULL_REQUEST_STATE"
}
export interface GitopiaUser {
    creator?: string;
    /** @format uint64 */
    id?: string;
    name?: string;
    username?: string;
    usernameGithub?: string;
    avatarUrl?: string;
    followers?: string[];
    following?: string[];
    repositories?: GitopiaUserRepository[];
    organizations?: GitopiaUserOrganization[];
    starredRepos?: string[];
    subscriptions?: string;
    bio?: string;
    /** @format int64 */
    createdAt?: string;
    /** @format int64 */
    updatedAt?: string;
}
export interface GitopiaUserOrganization {
    name?: string;
    id?: string;
}
export interface GitopiaUserRepository {
    name?: string;
    /** @format uint64 */
    id?: string;
}
export interface GitopiaWhois {
    creator?: string;
    name?: string;
    address?: string;
}
export interface ProtobufAny {
    "@type"?: string;
}
export interface RpcStatus {
    /** @format int32 */
    code?: number;
    message?: string;
    details?: ProtobufAny[];
}
/**
* message SomeRequest {
         Foo some_parameter = 1;
         PageRequest pagination = 2;
 }
*/
export interface V1Beta1PageRequest {
    /**
     * key is a value returned in PageResponse.next_key to begin
     * querying the next page most efficiently. Only one of offset or key
     * should be set.
     * @format byte
     */
    key?: string;
    /**
     * offset is a numeric offset that can be used when key is unavailable.
     * It is less efficient than using key. Only one of offset or key should
     * be set.
     * @format uint64
     */
    offset?: string;
    /**
     * limit is the total number of results to be returned in the result page.
     * If left empty it will default to a value to be set by each app.
     * @format uint64
     */
    limit?: string;
    /**
     * count_total is set to true  to indicate that the result set should include
     * a count of the total number of items available for pagination in UIs.
     * count_total is only respected when offset is used. It is ignored when key
     * is set.
     */
    countTotal?: boolean;
    /**
     * reverse is set to true if results are to be returned in the descending order.
     *
     * Since: cosmos-sdk 0.43
     */
    reverse?: boolean;
}
/**
* PageResponse is to be embedded in gRPC response messages where the
corresponding request message has used PageRequest.

 message SomeResponse {
         repeated Bar results = 1;
         PageResponse page = 2;
 }
*/
export interface V1Beta1PageResponse {
    /** @format byte */
    nextKey?: string;
    /** @format uint64 */
    total?: string;
}
export declare type QueryParamsType = Record<string | number, any>;
export declare type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;
export interface FullRequestParams extends Omit<RequestInit, "body"> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: keyof Omit<Body, "body" | "bodyUsed">;
    /** request body */
    body?: unknown;
    /** base url */
    baseUrl?: string;
    /** request cancellation token */
    cancelToken?: CancelToken;
}
export declare type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;
export interface ApiConfig<SecurityDataType = unknown> {
    baseUrl?: string;
    baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
    securityWorker?: (securityData: SecurityDataType) => RequestParams | void;
}
export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
    data: D;
    error: E;
}
declare type CancelToken = Symbol | string | number;
export declare enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded"
}
export declare class HttpClient<SecurityDataType = unknown> {
    baseUrl: string;
    private securityData;
    private securityWorker;
    private abortControllers;
    private baseApiParams;
    constructor(apiConfig?: ApiConfig<SecurityDataType>);
    setSecurityData: (data: SecurityDataType) => void;
    private addQueryParam;
    protected toQueryString(rawQuery?: QueryParamsType): string;
    protected addQueryParams(rawQuery?: QueryParamsType): string;
    private contentFormatters;
    private mergeRequestParams;
    private createAbortSignal;
    abortRequest: (cancelToken: CancelToken) => void;
    request: <T = any, E = any>({ body, secure, path, type, query, format, baseUrl, cancelToken, ...params }: FullRequestParams) => Promise<HttpResponse<T, E>>;
}
/**
 * @title gitopia/comment.proto
 * @version version not set
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Query
     * @name QueryCheckGitServerAuthorization
     * @request GET:/gitopia/gitopia/gitopia/authorizations/git-server/{userAddress}/{providerAddress}
     */
    queryCheckGitServerAuthorization: (userAddress: string, providerAddress: string, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryCheckGitServerAuthorizationResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryCommentAll
     * @summary Queries a list of comment items.
     * @request GET:/gitopia/gitopia/gitopia/comment
     */
    queryCommentAll: (query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.countTotal"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryAllCommentResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryComment
     * @summary Queries a comment by id.
     * @request GET:/gitopia/gitopia/gitopia/comment/{id}
     */
    queryComment: (id: string, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryGetCommentResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryIssueAll
     * @summary Queries a list of issue items.
     * @request GET:/gitopia/gitopia/gitopia/issue
     */
    queryIssueAll: (query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.countTotal"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryAllIssueResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryIssue
     * @summary Queries a issue by id.
     * @request GET:/gitopia/gitopia/gitopia/issue/{id}
     */
    queryIssue: (id: string, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryGetIssueResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryOrganizationAll
     * @summary Queries a list of organization items.
     * @request GET:/gitopia/gitopia/gitopia/organization
     */
    queryOrganizationAll: (query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.countTotal"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryAllOrganizationResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryOrganization
     * @summary Queries a organization by id.
     * @request GET:/gitopia/gitopia/gitopia/organization/{id}
     */
    queryOrganization: (id: string, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryGetOrganizationResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryPullRequestMergePermission
     * @request GET:/gitopia/gitopia/gitopia/permissions/{userAddress}/pull/{pullId}/merge
     */
    queryPullRequestMergePermission: (userAddress: string, pullId: string, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryGetPullRequestMergePermissionResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryPullRequestAll
     * @summary Queries a list of pullRequest items.
     * @request GET:/gitopia/gitopia/gitopia/pullRequest
     */
    queryPullRequestAll: (query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.countTotal"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryAllPullRequestResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryPullRequest
     * @summary Queries a pullRequest by id.
     * @request GET:/gitopia/gitopia/gitopia/pullRequest/{id}
     */
    queryPullRequest: (id: string, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryGetPullRequestResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryReleaseAll
     * @summary Queries a list of release items.
     * @request GET:/gitopia/gitopia/gitopia/release
     */
    queryReleaseAll: (query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.countTotal"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryAllReleaseResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryRelease
     * @summary Queries a release by id.
     * @request GET:/gitopia/gitopia/gitopia/release/{id}
     */
    queryRelease: (id: string, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryGetReleaseResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryRepositoryAll
     * @summary Queries a list of repository items.
     * @request GET:/gitopia/gitopia/gitopia/repository
     */
    queryRepositoryAll: (query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.countTotal"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryAllRepositoryResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryRepository
     * @summary Queries a repository by id.
     * @request GET:/gitopia/gitopia/gitopia/repository/{id}
     */
    queryRepository: (id: string, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryGetRepositoryResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryAddressRepository
     * @summary Queries a repository by user id and repository name
     * @request GET:/gitopia/gitopia/gitopia/repository/{id}/{repositoryName}
     */
    queryAddressRepository: (id: string, repositoryName: string, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryGetAddressRepositoryResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryBranchAll
     * @summary Queries a repository by id.
     * @request GET:/gitopia/gitopia/gitopia/repository/{repositoryId}/branches
     */
    queryBranchAll: (repositoryId: string, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryGetAllBranchResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryBranchSha
     * @request GET:/gitopia/gitopia/gitopia/repository/{repositoryId}/branches/{branchName}
     */
    queryBranchSha: (repositoryId: string, branchName: string, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryGetBranchShaResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryTagAll
     * @request GET:/gitopia/gitopia/gitopia/repository/{repositoryId}/tags
     */
    queryTagAll: (repositoryId: string, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryGetAllTagResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryTagSha
     * @request GET:/gitopia/gitopia/gitopia/repository/{repositoryId}/tags/{tagName}
     */
    queryTagSha: (repositoryId: string, tagName: string, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryGetTagShaResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryTaskAll
     * @summary Queries a list of Task items.
     * @request GET:/gitopia/gitopia/gitopia/task
     */
    queryTaskAll: (query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.countTotal"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryAllTaskResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryTask
     * @summary Queries a Task by id.
     * @request GET:/gitopia/gitopia/gitopia/task/{id}
     */
    queryTask: (id: string, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryGetTaskResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryUserAll
     * @summary Queries a list of user items.
     * @request GET:/gitopia/gitopia/gitopia/user
     */
    queryUserAll: (query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.countTotal"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryAllUserResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryUser
     * @summary Queries a user by id.
     * @request GET:/gitopia/gitopia/gitopia/user/{id}
     */
    queryUser: (id: string, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryGetUserResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryUserOrganizationAll
     * @summary Queries a list of user Organizations.
     * @request GET:/gitopia/gitopia/gitopia/user/{id}/organizations
     */
    queryUserOrganizationAll: (id: string, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryAllUserOrganizationResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryAddressRepositoryAll
     * @summary Queries a list of user repositories.
     * @request GET:/gitopia/gitopia/gitopia/user/{id}/repositories
     */
    queryAddressRepositoryAll: (id: string, query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.countTotal"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryAllAddressRepositoryResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryWhoisAll
     * @summary Queries a list of whois items.
     * @request GET:/gitopia/gitopia/gitopia/whois
     */
    queryWhoisAll: (query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.countTotal"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryAllWhoisResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryWhois
     * @summary Queries a whois by id.
     * @request GET:/gitopia/gitopia/gitopia/whois/{name}
     */
    queryWhois: (name: string, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryGetWhoisResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryRepositoryIssueAll
     * @summary Queries a list of repository items.
     * @request GET:/gitopia/gitopia/gitopia/{id}/{repositoryName}/issue
     */
    queryRepositoryIssueAll: (id: string, repositoryName: string, query?: {
        "option.createdBy"?: string;
        "option.state"?: string;
        "option.labels"?: string;
        "option.assignee"?: string;
        "option.labelIds"?: string[];
        "option.sort"?: string;
        "option.search"?: string;
        "option.updatedAfter"?: string;
        "option.updatedBefore"?: string;
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.countTotal"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryAllRepositoryIssueResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryRepositoryIssue
     * @summary Queries a repository by id.
     * @request GET:/gitopia/gitopia/gitopia/{id}/{repositoryName}/issue/{issueIid}
     */
    queryRepositoryIssue: (id: string, repositoryName: string, issueIid: string, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryGetRepositoryIssueResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryForkAll
     * @summary Queries a repository forks by id.
     * @request GET:/gitopia/gitopia/gitopia/{userId}/{repositoryName}/forks
     */
    queryForkAll: (userId: string, repositoryName: string, query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.countTotal"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryGetAllForkResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryRepositoryPullRequestAll
     * @request GET:/gitopia/gitopia/gitopia/{userId}/{repositoryName}/pull
     */
    queryRepositoryPullRequestAll: (userId: string, repositoryName: string, query?: {
        "option.createdBy"?: string;
        "option.state"?: string;
        "option.labels"?: string;
        "option.assignee"?: string;
        "option.reviewer"?: string;
        "option.labelIds"?: string[];
        "option.sort"?: string;
        "option.search"?: string;
        "option.updatedAfter"?: string;
        "option.updatedBefore"?: string;
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.countTotal"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryAllRepositoryPullRequestResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryRepositoryPullRequest
     * @summary Queries a repository pullRequest by id.
     * @request GET:/gitopia/gitopia/gitopia/{userId}/{repositoryName}/pull/{pullIid}
     */
    queryRepositoryPullRequest: (userId: string, repositoryName: string, pullIid: string, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryGetRepositoryPullRequestResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryRepositoryReleaseAll
     * @request GET:/gitopia/gitopia/gitopia/{userId}/{repositoryName}/releases
     */
    queryRepositoryReleaseAll: (userId: string, repositoryName: string, query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.countTotal"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryAllRepositoryReleaseResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryRepositoryReleaseLatest
     * @request GET:/gitopia/gitopia/gitopia/{userId}/{repositoryName}/releases/latest
     */
    queryRepositoryReleaseLatest: (userId: string, repositoryName: string, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryGetLatestRepositoryReleaseResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryRepositoryRelease
     * @request GET:/gitopia/gitopia/gitopia/{userId}/{repositoryName}/releases/tag/{tagName}
     */
    queryRepositoryRelease: (userId: string, repositoryName: string, tagName: string, params?: RequestParams) => Promise<HttpResponse<GitopiaQueryGetRepositoryReleaseResponse, RpcStatus>>;
}
export {};
