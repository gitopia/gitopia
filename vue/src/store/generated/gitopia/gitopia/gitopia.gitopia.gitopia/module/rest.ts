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

export enum OrganizationMemberRole {
  MEMBER = "MEMBER",
  OWNER = "OWNER",
}

export enum RepositoryCollaboratorPermission {
  READ = "READ",
  TRIAGE = "TRIAGE",
  WRITE = "WRITE",
  MAINTAIN = "MAINTAIN",
  ADMIN = "ADMIN",
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
  extensions?: string;
}

export enum GitopiaCommentType {
  ISSUE = "ISSUE",
  PULLREQUEST = "PULLREQUEST",
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
  extensions?: string;
}

export enum GitopiaIssueState {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

export type GitopiaMsgChangeOwnerResponse = object;

export type GitopiaMsgCreateBranchResponse = object;

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

export interface GitopiaMsgCreateRepositoryResponse {
  /** @format uint64 */
  id?: string;
  name?: string;
}

export type GitopiaMsgCreateTagResponse = object;

export interface GitopiaMsgCreateUserResponse {
  id?: string;
}

export type GitopiaMsgDeleteBranchResponse = object;

export type GitopiaMsgDeleteCommentResponse = object;

export type GitopiaMsgDeleteIssueResponse = object;

export type GitopiaMsgDeleteOrganizationResponse = object;

export type GitopiaMsgDeletePullRequestResponse = object;

export type GitopiaMsgDeleteRepositoryResponse = object;

export type GitopiaMsgDeleteTagResponse = object;

export type GitopiaMsgDeleteUserResponse = object;

export type GitopiaMsgDeleteWhoisResponse = object;

export interface GitopiaMsgForkRepositoryResponse {
  /** @format uint64 */
  id?: string;
}

export type GitopiaMsgRemoveOrganizationMemberResponse = object;

export type GitopiaMsgRemoveRepositoryCollaboratorResponse = object;

export type GitopiaMsgRenameRepositoryResponse = object;

export type GitopiaMsgSetDefaultBranchResponse = object;

export interface GitopiaMsgSetPullRequestStateResponse {
  state?: string;
}

export type GitopiaMsgSetWhoisResponse = object;

export interface GitopiaMsgToggleIssueStateResponse {
  state?: string;
}

export type GitopiaMsgUpdateCommentResponse = object;

export type GitopiaMsgUpdateIssueDescriptionResponse = object;

export type GitopiaMsgUpdateIssueResponse = object;

export type GitopiaMsgUpdateIssueTitleResponse = object;

export type GitopiaMsgUpdateOrganizationMemberResponse = object;

export type GitopiaMsgUpdateOrganizationResponse = object;

export type GitopiaMsgUpdatePullRequestDescriptionResponse = object;

export type GitopiaMsgUpdatePullRequestResponse = object;

export type GitopiaMsgUpdatePullRequestTitleResponse = object;

export type GitopiaMsgUpdateRepositoryCollaboratorResponse = object;

export type GitopiaMsgUpdateRepositoryResponse = object;

export type GitopiaMsgUpdateUserResponse = object;

export type GitopiaMsgUpdateWhoisResponse = object;

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
  email?: string;
  website?: string;
  verified?: boolean;
  description?: string;

  /** @format int64 */
  createdAt?: string;

  /** @format int64 */
  updatedAt?: string;
  extensions?: string;
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
  headBranch?: string;

  /** @format uint64 */
  headRepoId?: string;
  baseBranch?: string;

  /** @format uint64 */
  baseRepoId?: string;
  extensions?: string;
}

export enum GitopiaPullRequestState {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  MERGED = "MERGED",
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

export interface GitopiaQueryGetAddressRepositoryResponse {
  Repository?: GitopiaRepository;
}

export interface GitopiaQueryGetAllBranchResponse {
  Branches?: GitopiaRepositoryBranch[];
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

export interface GitopiaQueryGetOrganizationResponse {
  Organization?: GitopiaOrganization;
}

export interface GitopiaQueryGetPullRequestResponse {
  PullRequest?: GitopiaPullRequest;
}

export interface GitopiaQueryGetRepositoryIssueResponse {
  Issue?: GitopiaIssue;
}

export interface GitopiaQueryGetRepositoryPullRequestResponse {
  PullRequest?: GitopiaPullRequest;
}

export interface GitopiaQueryGetRepositoryResponse {
  Repository?: GitopiaRepository;
}

export interface GitopiaQueryGetTagShaResponse {
  sha?: string;
}

export interface GitopiaQueryGetUserResponse {
  User?: GitopiaUser;
}

export interface GitopiaQueryGetWhoisResponse {
  Whois?: GitopiaWhois;
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
  labels?: string;
  releases?: string;

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
  extensions?: string;
}

export interface GitopiaRepositoryBranch {
  name?: string;
  sha?: string;
}

export interface GitopiaRepositoryCollaborator {
  id?: string;
  permission?: RepositoryCollaboratorPermission;
}

export interface GitopiaRepositoryIssue {
  /** @format uint64 */
  iid?: string;

  /** @format uint64 */
  id?: string;
}

export interface GitopiaRepositoryOwner {
  id?: string;
  type?: GitopiaRepositoryOwnerType;
}

export enum GitopiaRepositoryOwnerType {
  USER = "USER",
  ORGANIZATION = "ORGANIZATION",
}

export interface GitopiaRepositoryPullRequest {
  /** @format uint64 */
  iid?: string;

  /** @format uint64 */
  id?: string;
}

export interface GitopiaRepositoryTag {
  name?: string;
  sha?: string;
}

export interface GitopiaUser {
  creator?: string;

  /** @format uint64 */
  id?: string;
  username?: string;
  usernameGithub?: string;
  avatarUrl?: string;
  followers?: string[];
  following?: string[];
  repositories?: GitopiaUserRepository[];
  organizations?: GitopiaUserOrganization[];
  starredRepos?: string[];
  subscriptions?: string;
  email?: string;
  bio?: string;

  /** @format int64 */
  createdAt?: string;

  /** @format int64 */
  updatedAt?: string;
  extensions?: string;
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

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

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

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType) => RequestParams | void;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType = null as any;
  private securityWorker: null | ApiConfig<SecurityDataType>["securityWorker"] = null;
  private abortControllers = new Map<CancelToken, AbortController>();

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType) => {
    this.securityData = data;
  };

  private addQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];

    return (
      encodeURIComponent(key) +
      "=" +
      encodeURIComponent(Array.isArray(value) ? value.join(",") : typeof value === "number" ? value : `${value}`)
    );
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) =>
        typeof query[key] === "object" && !Array.isArray(query[key])
          ? this.toQueryString(query[key] as QueryParamsType)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((data, key) => {
        data.append(key, input[key]);
        return data;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
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

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
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

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format = "json",
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
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
      const r = response as HttpResponse<T, E>;
      r.data = (null as unknown) as T;
      r.error = (null as unknown) as E;

      const data = await response[format]()
        .then((data) => {
          if (r.ok) {
            r.data = data;
          } else {
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

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title gitopia/comment.proto
 * @version version not set
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Query
   * @name QueryCommentAll
   * @summary Queries a list of comment items.
   * @request GET:/gitopia/gitopia/gitopia/comment
   */
  queryCommentAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.countTotal"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<GitopiaQueryAllCommentResponse, RpcStatus>({
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
  queryComment = (id: string, params: RequestParams = {}) =>
    this.request<GitopiaQueryGetCommentResponse, RpcStatus>({
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
  queryIssueAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.countTotal"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<GitopiaQueryAllIssueResponse, RpcStatus>({
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
  queryIssue = (id: string, params: RequestParams = {}) =>
    this.request<GitopiaQueryGetIssueResponse, RpcStatus>({
      path: `/gitopia/gitopia/gitopia/issue/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryOrganizationAll
   * @summary Queries a list of organization items.
   * @request GET:/gitopia/gitopia/gitopia/organization
   */
  queryOrganizationAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.countTotal"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<GitopiaQueryAllOrganizationResponse, RpcStatus>({
      path: `/gitopia/gitopia/gitopia/organization`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryOrganization
   * @summary Queries a organization by id.
   * @request GET:/gitopia/gitopia/gitopia/organization/{id}
   */
  queryOrganization = (id: string, params: RequestParams = {}) =>
    this.request<GitopiaQueryGetOrganizationResponse, RpcStatus>({
      path: `/gitopia/gitopia/gitopia/organization/${id}`,
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
  queryPullRequestAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.countTotal"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<GitopiaQueryAllPullRequestResponse, RpcStatus>({
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
  queryPullRequest = (id: string, params: RequestParams = {}) =>
    this.request<GitopiaQueryGetPullRequestResponse, RpcStatus>({
      path: `/gitopia/gitopia/gitopia/pullRequest/${id}`,
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
  queryRepositoryAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.countTotal"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<GitopiaQueryAllRepositoryResponse, RpcStatus>({
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
  queryRepository = (id: string, params: RequestParams = {}) =>
    this.request<GitopiaQueryGetRepositoryResponse, RpcStatus>({
      path: `/gitopia/gitopia/gitopia/repository/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryAddressRepository
   * @summary Queries a repository by user id and repository name
   * @request GET:/gitopia/gitopia/gitopia/repository/{id}/{repositoryName}
   */
  queryAddressRepository = (id: string, repositoryName: string, params: RequestParams = {}) =>
    this.request<GitopiaQueryGetAddressRepositoryResponse, RpcStatus>({
      path: `/gitopia/gitopia/gitopia/repository/${id}/${repositoryName}`,
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
   * @request GET:/gitopia/gitopia/gitopia/repository/{repositoryId}/branches
   */
  queryBranchAll = (repositoryId: string, params: RequestParams = {}) =>
    this.request<GitopiaQueryGetAllBranchResponse, RpcStatus>({
      path: `/gitopia/gitopia/gitopia/repository/${repositoryId}/branches`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryBranchSha
   * @request GET:/gitopia/gitopia/gitopia/repository/{repositoryId}/branches/{branchName}
   */
  queryBranchSha = (repositoryId: string, branchName: string, params: RequestParams = {}) =>
    this.request<GitopiaQueryGetBranchShaResponse, RpcStatus>({
      path: `/gitopia/gitopia/gitopia/repository/${repositoryId}/branches/${branchName}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryTagAll
   * @request GET:/gitopia/gitopia/gitopia/repository/{repositoryId}/tags
   */
  queryTagAll = (repositoryId: string, params: RequestParams = {}) =>
    this.request<GitopiaQueryGetAllTagResponse, RpcStatus>({
      path: `/gitopia/gitopia/gitopia/repository/${repositoryId}/tags`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryTagSha
   * @request GET:/gitopia/gitopia/gitopia/repository/{repositoryId}/tags/{tagName}
   */
  queryTagSha = (repositoryId: string, tagName: string, params: RequestParams = {}) =>
    this.request<GitopiaQueryGetTagShaResponse, RpcStatus>({
      path: `/gitopia/gitopia/gitopia/repository/${repositoryId}/tags/${tagName}`,
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
  queryUserAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.countTotal"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<GitopiaQueryAllUserResponse, RpcStatus>({
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
  queryUser = (id: string, params: RequestParams = {}) =>
    this.request<GitopiaQueryGetUserResponse, RpcStatus>({
      path: `/gitopia/gitopia/gitopia/user/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryUserOrganizationAll
   * @summary Queries a list of user Organizations.
   * @request GET:/gitopia/gitopia/gitopia/user/{id}/organizations
   */
  queryUserOrganizationAll = (id: string, params: RequestParams = {}) =>
    this.request<GitopiaQueryAllUserOrganizationResponse, RpcStatus>({
      path: `/gitopia/gitopia/gitopia/user/${id}/organizations`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryAddressRepositoryAll
   * @summary Queries a list of user repositories.
   * @request GET:/gitopia/gitopia/gitopia/user/{id}/repositories
   */
  queryAddressRepositoryAll = (
    id: string,
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.countTotal"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<GitopiaQueryAllAddressRepositoryResponse, RpcStatus>({
      path: `/gitopia/gitopia/gitopia/user/${id}/repositories`,
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
  queryWhoisAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.countTotal"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<GitopiaQueryAllWhoisResponse, RpcStatus>({
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
  queryWhois = (name: string, params: RequestParams = {}) =>
    this.request<GitopiaQueryGetWhoisResponse, RpcStatus>({
      path: `/gitopia/gitopia/gitopia/whois/${name}`,
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
  queryRepositoryIssueAll = (
    id: string,
    repositoryName: string,
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.countTotal"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<GitopiaQueryAllRepositoryIssueResponse, RpcStatus>({
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
  queryRepositoryIssue = (id: string, repositoryName: string, issueIid: string, params: RequestParams = {}) =>
    this.request<GitopiaQueryGetRepositoryIssueResponse, RpcStatus>({
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
   * @request GET:/gitopia/gitopia/gitopia/{userId}/{repositoryName}/pull
   */
  queryRepositoryPullRequestAll = (
    userId: string,
    repositoryName: string,
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.countTotal"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<GitopiaQueryAllRepositoryPullRequestResponse, RpcStatus>({
      path: `/gitopia/gitopia/gitopia/${userId}/${repositoryName}/pull`,
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
   * @request GET:/gitopia/gitopia/gitopia/{userId}/{repositoryName}/pull/{pullIid}
   */
  queryRepositoryPullRequest = (userId: string, repositoryName: string, pullIid: string, params: RequestParams = {}) =>
    this.request<GitopiaQueryGetRepositoryPullRequestResponse, RpcStatus>({
      path: `/gitopia/gitopia/gitopia/${userId}/${repositoryName}/pull/${pullIid}`,
      method: "GET",
      format: "json",
      ...params,
    });
}
