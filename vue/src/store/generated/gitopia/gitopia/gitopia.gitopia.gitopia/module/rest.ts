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

export enum RepositoryCollaboratorPermission {
  READ = "READ",
  TRIAGE = "TRIAGE",
  WRITE = "WRITE",
  MAINTAIN = "MAINTAIN",
  ADMIN = "ADMIN",
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

export enum GitopiaCommentType {
  ISSUE = "ISSUE",
  PULLREQUEST = "PULLREQUEST",
}

export interface GitopiaDao {
  creator?: string;

  /** @format uint64 */
  id?: string;
  address?: string;
  name?: string;
  avatarUrl?: string;
  followers?: string[];
  following?: string[];
  teams?: string[];
  location?: string;
  website?: string;
  verified?: boolean;
  description?: string;

  /** @format int64 */
  createdAt?: string;

  /** @format int64 */
  updatedAt?: string;
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

export enum GitopiaIssueState {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

export interface GitopiaMember {
  /** @format uint64 */
  id?: string;
  address?: string;
  daoAddress?: string;
  role?: GitopiaMemberRole;
}

export enum GitopiaMemberRole {
  MEMBER = "MEMBER",
  OWNER = "OWNER",
}

export type GitopiaMsgAddIssueAssigneesResponse = object;

export type GitopiaMsgAddIssueLabelsResponse = object;

export type GitopiaMsgAddMemberResponse = object;

export type GitopiaMsgAddPullRequestAssigneesResponse = object;

export type GitopiaMsgAddPullRequestLabelsResponse = object;

export type GitopiaMsgAddPullRequestReviewersResponse = object;

export type GitopiaMsgAddRepositoryBackupRefResponse = object;

export type GitopiaMsgAuthorizeGitServerResponse = object;

export type GitopiaMsgAuthorizeStorageProviderResponse = object;

export type GitopiaMsgChangeOwnerResponse = object;

export interface GitopiaMsgCreateCommentResponse {
  /** @format uint64 */
  id?: string;
}

export interface GitopiaMsgCreateDaoResponse {
  id?: string;
}

export interface GitopiaMsgCreateIssueResponse {
  /** @format uint64 */
  id?: string;

  /** @format uint64 */
  iid?: string;
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
  repositoryId?: GitopiaRepositoryId;
}

export interface GitopiaMsgCreateStorageProviderResponse {
  /** @format uint64 */
  id?: string;
}

export interface GitopiaMsgCreateTaskResponse {
  /** @format uint64 */
  id?: string;
}

export interface GitopiaMsgCreateUserResponse {
  id?: string;
}

export type GitopiaMsgDeleteBranchResponse = object;

export type GitopiaMsgDeleteCommentResponse = object;

export type GitopiaMsgDeleteDaoResponse = object;

export type GitopiaMsgDeleteIssueResponse = object;

export type GitopiaMsgDeletePullRequestResponse = object;

export type GitopiaMsgDeleteReleaseResponse = object;

export type GitopiaMsgDeleteRepositoryLabelResponse = object;

export type GitopiaMsgDeleteRepositoryResponse = object;

export type GitopiaMsgDeleteStorageProviderResponse = object;

export type GitopiaMsgDeleteTagResponse = object;

export type GitopiaMsgDeleteTaskResponse = object;

export type GitopiaMsgDeleteUserResponse = object;

export interface GitopiaMsgForkRepositoryResponse {
  /** @format uint64 */
  id?: string;
}

export interface GitopiaMsgForkRepositorySuccessResponse {
  /** @format uint64 */
  id?: string;
}

export type GitopiaMsgInvokeForkRepositoryResponse = object;

export type GitopiaMsgInvokeMergePullRequestResponse = object;

export type GitopiaMsgMultiDeleteBranchResponse = object;

export type GitopiaMsgMultiDeleteTagResponse = object;

export interface GitopiaMsgMultiSetBranchBranch {
  name?: string;
  sha?: string;
}

export type GitopiaMsgMultiSetBranchResponse = object;

export type GitopiaMsgMultiSetTagResponse = object;

export interface GitopiaMsgMultiSetTagTag {
  name?: string;
  sha?: string;
}

export type GitopiaMsgRemoveIssueAssigneesResponse = object;

export type GitopiaMsgRemoveIssueLabelsResponse = object;

export type GitopiaMsgRemoveMemberResponse = object;

export type GitopiaMsgRemovePullRequestAssigneesResponse = object;

export type GitopiaMsgRemovePullRequestLabelsResponse = object;

export type GitopiaMsgRemovePullRequestReviewersResponse = object;

export type GitopiaMsgRemoveRepositoryCollaboratorResponse = object;

export type GitopiaMsgRenameDaoResponse = object;

export type GitopiaMsgRenameRepositoryResponse = object;

export type GitopiaMsgRevokeGitServerPermissionsResponse = object;

export type GitopiaMsgRevokeStorageProviderPermissionsResponse = object;

export interface GitopiaMsgSetBranchBranch {
  name?: string;
  sha?: string;
}

export type GitopiaMsgSetBranchResponse = object;

export type GitopiaMsgSetDefaultBranchResponse = object;

export interface GitopiaMsgSetPullRequestStateResponse {
  state?: string;
}

export type GitopiaMsgSetTagResponse = object;

export interface GitopiaMsgSetTagTag {
  name?: string;
  sha?: string;
}

export interface GitopiaMsgToggleIssueStateResponse {
  state?: string;
}

export interface GitopiaMsgToggleRepositoryForkingResponse {
  allowForking?: boolean;
}

export type GitopiaMsgUpdateCommentResponse = object;

export type GitopiaMsgUpdateDaoAvatarResponse = object;

export type GitopiaMsgUpdateDaoDescriptionResponse = object;

export type GitopiaMsgUpdateDaoLocationResponse = object;

export type GitopiaMsgUpdateDaoWebsiteResponse = object;

export type GitopiaMsgUpdateIssueDescriptionResponse = object;

export type GitopiaMsgUpdateIssueResponse = object;

export type GitopiaMsgUpdateIssueTitleResponse = object;

export type GitopiaMsgUpdateMemberRoleResponse = object;

export type GitopiaMsgUpdatePullRequestDescriptionResponse = object;

export type GitopiaMsgUpdatePullRequestResponse = object;

export type GitopiaMsgUpdatePullRequestTitleResponse = object;

export type GitopiaMsgUpdateReleaseResponse = object;

export type GitopiaMsgUpdateRepositoryBackupRefResponse = object;

export type GitopiaMsgUpdateRepositoryCollaboratorResponse = object;

export type GitopiaMsgUpdateRepositoryDescriptionResponse = object;

export type GitopiaMsgUpdateRepositoryLabelResponse = object;

export type GitopiaMsgUpdateStorageProviderResponse = object;

export type GitopiaMsgUpdateTaskResponse = object;

export type GitopiaMsgUpdateUserAvatarResponse = object;

export type GitopiaMsgUpdateUserBioResponse = object;

export type GitopiaMsgUpdateUserNameResponse = object;

export type GitopiaMsgUpdateUserUsernameResponse = object;

export enum GitopiaOwnerType {
  USER = "USER",
  DAO = "DAO",
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

export enum GitopiaPullRequestState {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  MERGED = "MERGED",
}

export interface GitopiaQueryAllAnyRepositoryResponse {
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

export interface GitopiaQueryAllBranchResponse {
  Branch?: GitopiagitopiaBranch[];

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

export interface GitopiaQueryAllDaoMemberResponse {
  Member?: GitopiaMember[];

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

export interface GitopiaQueryAllDaoResponse {
  dao?: GitopiaDao[];

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

export interface GitopiaQueryAllMemberResponse {
  Member?: GitopiaMember[];

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

export interface GitopiaQueryAllRepositoryBranchResponse {
  Branch?: GitopiagitopiaBranch[];

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

export interface GitopiaQueryAllRepositoryTagResponse {
  Tag?: GitopiagitopiaTag[];

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

export interface GitopiaQueryAllStorageProviderResponse {
  StorageProvider?: GitopiaStorageProvider[];

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

export interface GitopiaQueryAllTagResponse {
  Tag?: GitopiagitopiaTag[];

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

export interface GitopiaQueryAllUserDaoResponse {
  dao?: GitopiaDao[];

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

export interface GitopiaQueryCheckStorageProviderAuthorizationResponse {
  haveAuthorization?: boolean;
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

export interface GitopiaQueryGetAnyRepositoryResponse {
  Repository?: GitopiaRepository;
}

export interface GitopiaQueryGetCommentResponse {
  Comment?: GitopiaComment;
}

export interface GitopiaQueryGetDaoMemberResponse {
  Member?: GitopiaMember;
}

export interface GitopiaQueryGetDaoResponse {
  dao?: GitopiaDao;
}

export interface GitopiaQueryGetIssueResponse {
  Issue?: GitopiaIssue;
}

export interface GitopiaQueryGetLatestRepositoryReleaseResponse {
  Release?: GitopiaRelease;
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

export interface GitopiaQueryGetRepositoryBranchResponse {
  Branch?: GitopiagitopiaBranch;
}

export interface GitopiaQueryGetRepositoryBranchShaResponse {
  sha?: string;
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

export interface GitopiaQueryGetRepositoryTagResponse {
  Tag?: GitopiagitopiaTag;
}

export interface GitopiaQueryGetRepositoryTagShaResponse {
  sha?: string;
}

export interface GitopiaQueryGetStorageProviderResponse {
  StorageProvider?: GitopiaStorageProvider;
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
  backups?: GitopiaRepositoryBackup[];
}

export interface GitopiaRepositoryBackup {
  /** @format uint64 */
  providerId?: string;
  refs?: string[];
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

export interface GitopiaRepositoryId {
  id?: string;
  name?: string;
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
  type?: GitopiaOwnerType;
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

export interface GitopiaStorageProvider {
  /** @format uint64 */
  id?: string;
  store?: GitopiaStore;
  creator?: string;
}

export enum GitopiaStore {
  NONE = "NONE",
  IPFS = "IPFS",
  ARWEAVE = "ARWEAVE",
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

export enum GitopiaTaskState {
  TASK_STATE_PENDING = "TASK_STATE_PENDING",
  TASK_STATE_SUCCESS = "TASK_STATE_SUCCESS",
  TASK_STATE_FAILURE = "TASK_STATE_FAILURE",
}

export enum GitopiaTaskType {
  TASK_TYPE_FORK_REPOSITORY = "TASK_TYPE_FORK_REPOSITORY",
  TASK_TYPE_SET_PULL_REQUEST_STATE = "TASK_TYPE_SET_PULL_REQUEST_STATE",
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
  starredRepos?: string[];
  subscriptions?: string;
  bio?: string;

  /** @format int64 */
  createdAt?: string;

  /** @format int64 */
  updatedAt?: string;
}

export interface GitopiaWhois {
  creator?: string;
  name?: string;
  address?: string;
  ownerType?: GitopiaOwnerType;
}

export interface GitopiagitopiaBranch {
  /** @format uint64 */
  id?: string;

  /** @format uint64 */
  repositoryId?: string;
  name?: string;
  sha?: string;
  allowForcePush?: boolean;

  /** @format int64 */
  createdAt?: string;

  /** @format int64 */
  updatedAt?: string;
}

export interface GitopiagitopiaTag {
  /** @format uint64 */
  id?: string;

  /** @format uint64 */
  repositoryId?: string;
  name?: string;
  sha?: string;

  /** @format int64 */
  createdAt?: string;

  /** @format int64 */
  updatedAt?: string;
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
 * @title gitopia/branch.proto
 * @version version not set
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Query
   * @name QueryCheckGitServerAuthorization
   * @request GET:/gitopia/gitopia/gitopia/authorizations/git-server/{userAddress}/{providerAddress}
   */
  queryCheckGitServerAuthorization = (userAddress: string, providerAddress: string, params: RequestParams = {}) =>
    this.request<GitopiaQueryCheckGitServerAuthorizationResponse, RpcStatus>({
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
  queryCheckStorageProviderAuthorization = (userAddress: string, providerAddress: string, params: RequestParams = {}) =>
    this.request<GitopiaQueryCheckStorageProviderAuthorizationResponse, RpcStatus>({
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
  queryBranchAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.countTotal"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<GitopiaQueryAllBranchResponse, RpcStatus>({
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
  queryCommentAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.countTotal"?: boolean;
      "pagination.reverse"?: boolean;
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
   * @name QueryDaoAll
   * @summary Queries a list of Dao items.
   * @request GET:/gitopia/gitopia/gitopia/dao
   */
  queryDaoAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.countTotal"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<GitopiaQueryAllDaoResponse, RpcStatus>({
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
  queryDaoMemberAll = (
    daoId: string,
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.countTotal"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<GitopiaQueryAllDaoMemberResponse, RpcStatus>({
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
  queryDaoMember = (daoId: string, userId: string, params: RequestParams = {}) =>
    this.request<GitopiaQueryGetDaoMemberResponse, RpcStatus>({
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
  queryDao = (id: string, params: RequestParams = {}) =>
    this.request<GitopiaQueryGetDaoResponse, RpcStatus>({
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
  queryIssueAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.countTotal"?: boolean;
      "pagination.reverse"?: boolean;
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
   * @name QueryMemberAll
   * @summary Queries a list of Member items.
   * @request GET:/gitopia/gitopia/gitopia/member
   */
  queryMemberAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.countTotal"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<GitopiaQueryAllMemberResponse, RpcStatus>({
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
  queryPullRequestMergePermission = (userId: string, pullId: string, params: RequestParams = {}) =>
    this.request<GitopiaQueryGetPullRequestMergePermissionResponse, RpcStatus>({
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
  queryPullRequestAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.countTotal"?: boolean;
      "pagination.reverse"?: boolean;
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
   * @name QueryReleaseAll
   * @summary Queries a list of release items.
   * @request GET:/gitopia/gitopia/gitopia/release
   */
  queryReleaseAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.countTotal"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<GitopiaQueryAllReleaseResponse, RpcStatus>({
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
  queryRelease = (id: string, params: RequestParams = {}) =>
    this.request<GitopiaQueryGetReleaseResponse, RpcStatus>({
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
  queryRepositoryAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.countTotal"?: boolean;
      "pagination.reverse"?: boolean;
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
   * @name QueryStorageProviderAll
   * @summary Queries a list of StorageProvider items.
   * @request GET:/gitopia/gitopia/gitopia/storage_provider
   */
  queryStorageProviderAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.countTotal"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<GitopiaQueryAllStorageProviderResponse, RpcStatus>({
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
  queryStorageProvider = (id: string, params: RequestParams = {}) =>
    this.request<GitopiaQueryGetStorageProviderResponse, RpcStatus>({
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
  queryTagAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.countTotal"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<GitopiaQueryAllTagResponse, RpcStatus>({
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
  queryTaskAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.countTotal"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<GitopiaQueryAllTaskResponse, RpcStatus>({
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
  queryTask = (id: string, params: RequestParams = {}) =>
    this.request<GitopiaQueryGetTaskResponse, RpcStatus>({
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
  queryUserAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.countTotal"?: boolean;
      "pagination.reverse"?: boolean;
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
   * @name QueryAnyRepositoryAll
   * @summary Queries a list of user repositories.
   * @request GET:/gitopia/gitopia/gitopia/user/{id}/repository
   */
  queryAnyRepositoryAll = (
    id: string,
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.countTotal"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<GitopiaQueryAllAnyRepositoryResponse, RpcStatus>({
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
  queryAnyRepository = (id: string, repositoryName: string, params: RequestParams = {}) =>
    this.request<GitopiaQueryGetAnyRepositoryResponse, RpcStatus>({
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
  queryUserDaoAll = (
    userId: string,
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.countTotal"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<GitopiaQueryAllUserDaoResponse, RpcStatus>({
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
  queryWhoisAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.countTotal"?: boolean;
      "pagination.reverse"?: boolean;
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
   * @name QueryRepositoryBranchAll
   * @summary Queries a list of Repository Branch.
   * @request GET:/gitopia/gitopia/gitopia/{id}/repository/{repositoryName}/branch
   */
  queryRepositoryBranchAll = (
    id: string,
    repositoryName: string,
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.countTotal"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<GitopiaQueryAllRepositoryBranchResponse, RpcStatus>({
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
  queryRepositoryBranch = (id: string, repositoryName: string, branchName: string, params: RequestParams = {}) =>
    this.request<GitopiaQueryGetRepositoryBranchResponse, RpcStatus>({
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
  queryRepositoryBranchSha = (id: string, repositoryName: string, branchName: string, params: RequestParams = {}) =>
    this.request<GitopiaQueryGetRepositoryBranchShaResponse, RpcStatus>({
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
  queryForkAll = (
    id: string,
    repositoryName: string,
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.countTotal"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<GitopiaQueryGetAllForkResponse, RpcStatus>({
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
  queryRepositoryReleaseAll = (
    id: string,
    repositoryName: string,
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.countTotal"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<GitopiaQueryAllRepositoryReleaseResponse, RpcStatus>({
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
  queryRepositoryReleaseLatest = (id: string, repositoryName: string, params: RequestParams = {}) =>
    this.request<GitopiaQueryGetLatestRepositoryReleaseResponse, RpcStatus>({
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
  queryRepositoryRelease = (id: string, repositoryName: string, tagName: string, params: RequestParams = {}) =>
    this.request<GitopiaQueryGetRepositoryReleaseResponse, RpcStatus>({
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
  queryRepositoryTagAll = (
    id: string,
    repositoryName: string,
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.countTotal"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<GitopiaQueryAllRepositoryTagResponse, RpcStatus>({
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
  queryRepositoryTag = (id: string, repositoryName: string, tagName: string, params: RequestParams = {}) =>
    this.request<GitopiaQueryGetRepositoryTagResponse, RpcStatus>({
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
  queryRepositoryTagSha = (id: string, repositoryName: string, tagName: string, params: RequestParams = {}) =>
    this.request<GitopiaQueryGetRepositoryTagShaResponse, RpcStatus>({
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
  queryRepositoryIssueAll = (
    id: string,
    repositoryName: string,
    query?: {
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
   * @request GET:/gitopia/gitopia/gitopia/{id}/{repositoryName}/pull
   */
  queryRepositoryPullRequestAll = (
    id: string,
    repositoryName: string,
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<GitopiaQueryAllRepositoryPullRequestResponse, RpcStatus>({
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
  queryRepositoryPullRequest = (id: string, repositoryName: string, pullIid: string, params: RequestParams = {}) =>
    this.request<GitopiaQueryGetRepositoryPullRequestResponse, RpcStatus>({
      path: `/gitopia/gitopia/gitopia/${id}/${repositoryName}/pull/${pullIid}`,
      method: "GET",
      format: "json",
      ...params,
    });
}
