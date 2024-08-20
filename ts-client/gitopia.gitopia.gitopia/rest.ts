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

export interface MsgDistributePlatformIncentivesAddress {
  address?: string;

  /**
   * Coin defines a token with a denomination and an amount.
   *
   * NOTE: The amount field is an Int which implements the custom method
   * signatures required by gogoproto.
   */
  amount?: V1Beta1Coin;
}

export enum RepositoryBackupStore {
  IPFS = "IPFS",
  ARWEAVE = "ARWEAVE",
}

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

export enum GitopiaBountyParent {
  BOUNTY_PARENT_ISSUE = "BOUNTY_PARENT_ISSUE",
}

export enum GitopiaBountyState {
  BOUNTY_STATE_SRCDEBITTED = "BOUNTY_STATE_SRCDEBITTED",
  BOUNTY_STATE_DESTCREDITED = "BOUNTY_STATE_DESTCREDITED",
  BOUNTY_STATE_REVERTEDBACK = "BOUNTY_STATE_REVERTEDBACK",
}

export interface GitopiaComment {
  creator?: string;

  /** @format uint64 */
  id?: string;

  /** @format uint64 */
  repositoryId?: string;

  /** @format uint64 */
  parentIid?: string;
  parent?: GitopiaCommentParent;

  /** @format uint64 */
  commentIid?: string;
  body?: string;
  attachments?: GitopiaAttachment[];
  diffHunk?: string;
  path?: string;

  /** @format uint64 */
  position?: string;
  system?: boolean;
  authorAssociation?: string;

  /** @format int64 */
  createdAt?: string;

  /** @format int64 */
  updatedAt?: string;
  commentType?: GitopiaCommentType;
  resolved?: boolean;
  replies?: string[];
  reactions?: GitopiaReaction[];
  hidden?: boolean;
}

export enum GitopiaCommentParent {
  COMMENT_PARENT_NONE = "COMMENT_PARENT_NONE",
  COMMENT_PARENT_ISSUE = "COMMENT_PARENT_ISSUE",
  COMMENT_PARENT_PULL_REQUEST = "COMMENT_PARENT_PULL_REQUEST",
}

export enum GitopiaCommentType {
  COMMENT_TYPE_NONE = "COMMENT_TYPE_NONE",
  COMMENT_TYPE_REPLY = "COMMENT_TYPE_REPLY",
  COMMENT_TYPE_ADD_LABELS = "COMMENT_TYPE_ADD_LABELS",
  COMMENT_TYPE_REMOVE_LABELS = "COMMENT_TYPE_REMOVE_LABELS",
  COMMENT_TYPE_ADD_ASSIGNEES = "COMMENT_TYPE_ADD_ASSIGNEES",
  COMMENT_TYPE_REMOVE_ASSIGNEES = "COMMENT_TYPE_REMOVE_ASSIGNEES",
  COMMENT_TYPE_ADD_REVIEWERS = "COMMENT_TYPE_ADD_REVIEWERS",
  COMMENT_TYPE_REMOVE_REVIEWERS = "COMMENT_TYPE_REMOVE_REVIEWERS",
  COMMENT_TYPE_MODIFIED_TITLE = "COMMENT_TYPE_MODIFIED_TITLE",
  COMMENT_TYPE_MODIFIED_DESCRIPTION = "COMMENT_TYPE_MODIFIED_DESCRIPTION",
  COMMENT_TYPE_ISSUE_CLOSED = "COMMENT_TYPE_ISSUE_CLOSED",
  COMMENT_TYPE_ISSUE_OPENED = "COMMENT_TYPE_ISSUE_OPENED",
  COMMENT_TYPE_PULL_REQUEST_CLOSED = "COMMENT_TYPE_PULL_REQUEST_CLOSED",
  COMMENT_TYPE_PULL_REQUEST_OPENED = "COMMENT_TYPE_PULL_REQUEST_OPENED",
  COMMENT_TYPE_PULL_REQUEST_MERGED = "COMMENT_TYPE_PULL_REQUEST_MERGED",
  COMMENT_TYPE_REVIEW = "COMMENT_TYPE_REVIEW",
  COMMENT_TYPE_ADD_BOUNTY = "COMMENT_TYPE_ADD_BOUNTY",
  COMMENT_TYPE_MODIFIED_BOUNTY = "COMMENT_TYPE_MODIFIED_BOUNTY",
  COMMENT_TYPE_CLOSED_BOUNTY = "COMMENT_TYPE_CLOSED_BOUNTY",
}

export interface GitopiaDistributionProportion {
  proportion?: string;
  address?: string;
}

export enum GitopiaEmoji {
  EMOJI_THUMBS_UP = "EMOJI_THUMBS_UP",
  EMOJI_THUMBS_DOWN = "EMOJI_THUMBS_DOWN",
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

  /** @format uint64 */
  commentsCount?: string;
  pullRequests?: GitopiaPullRequestIid[];

  /** @format uint64 */
  repositoryId?: string;
  labels?: string[];

  /** @format uint64 */
  weight?: string;
  assignees?: string[];
  bounties?: string[];

  /** @format int64 */
  createdAt?: string;

  /** @format int64 */
  updatedAt?: string;

  /** @format int64 */
  closedAt?: string;
  closedBy?: string;
}

export interface GitopiaIssueIid {
  /** @format uint64 */
  iid?: string;

  /** @format uint64 */
  id?: string;
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

export type GitopiaMsgAuthorizeProviderResponse = object;

export type GitopiaMsgChangeOwnerResponse = object;

export type GitopiaMsgCloseBountyResponse = object;

export interface GitopiaMsgCreateBountyResponse {
  /** @format uint64 */
  id?: string;
}

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

export interface GitopiaMsgCreateTaskResponse {
  /** @format uint64 */
  id?: string;
}

export interface GitopiaMsgCreateUserResponse {
  id?: string;
}

export type GitopiaMsgDeleteBountyResponse = object;

export type GitopiaMsgDeleteBranchResponse = object;

export type GitopiaMsgDeleteCommentResponse = object;

export type GitopiaMsgDeleteDaoResponse = object;

export type GitopiaMsgDeleteIssueResponse = object;

export type GitopiaMsgDeletePullRequestResponse = object;

export type GitopiaMsgDeleteReleaseResponse = object;

export type GitopiaMsgDeleteRepositoryLabelResponse = object;

export type GitopiaMsgDeleteRepositoryResponse = object;

export type GitopiaMsgDeleteTagResponse = object;

export type GitopiaMsgDeleteTaskResponse = object;

export type GitopiaMsgDeleteUserResponse = object;

export type GitopiaMsgDistributePlatformIncentivesResponse = object;

export type GitopiaMsgExerciseResponse = object;

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

export type GitopiaMsgLinkPullRequestIssueByIidResponse = object;

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

export type GitopiaMsgRevokeProviderPermissionResponse = object;

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

export interface GitopiaMsgToggleArweaveBackupResponse {
  enableArweaveBackup?: boolean;
}

export interface GitopiaMsgToggleCommentResolvedResponse {
  resolved?: boolean;
}

export type GitopiaMsgToggleForcePushResponse = object;

export interface GitopiaMsgToggleIssueStateResponse {
  state?: string;
}

export type GitopiaMsgToggleRepositoryArchivedResponse = object;

export interface GitopiaMsgToggleRepositoryForkingResponse {
  allowForking?: boolean;
}

export type GitopiaMsgUnlinkPullRequestIssueByIidResponse = object;

export type GitopiaMsgUpdateBountyExpiryResponse = object;

export type GitopiaMsgUpdateCommentResponse = object;

export type GitopiaMsgUpdateDaoAvatarResponse = object;

export type GitopiaMsgUpdateDaoDescriptionResponse = object;

export type GitopiaMsgUpdateDaoLocationResponse = object;

export type GitopiaMsgUpdateDaoPinnedRepositoriesResponse = object;

export type GitopiaMsgUpdateDaoWebsiteResponse = object;

export type GitopiaMsgUpdateIssueDescriptionResponse = object;

export type GitopiaMsgUpdateIssueTitleResponse = object;

export type GitopiaMsgUpdateMemberRoleResponse = object;

export type GitopiaMsgUpdateParamsResponse = object;

export type GitopiaMsgUpdatePullRequestDescriptionResponse = object;

export type GitopiaMsgUpdatePullRequestTitleResponse = object;

export type GitopiaMsgUpdateReleaseResponse = object;

export type GitopiaMsgUpdateRepositoryBackupRefResponse = object;

export type GitopiaMsgUpdateRepositoryCollaboratorResponse = object;

export type GitopiaMsgUpdateRepositoryDescriptionResponse = object;

export type GitopiaMsgUpdateRepositoryLabelResponse = object;

export type GitopiaMsgUpdateTaskResponse = object;

export type GitopiaMsgUpdateUserAvatarResponse = object;

export type GitopiaMsgUpdateUserBioResponse = object;

export type GitopiaMsgUpdateUserNameResponse = object;

export type GitopiaMsgUpdateUserPinnedRepositoriesResponse = object;

export type GitopiaMsgUpdateUserUsernameResponse = object;

export enum GitopiaOwnerType {
  USER = "USER",
  DAO = "DAO",
}

export interface GitopiaPoolProportions {
  ecosystem?: GitopiaDistributionProportion;
  team?: GitopiaDistributionProportion;
  platform?: GitopiaDistributionProportion;
}

export enum GitopiaProviderPermission {
  GIT_SERVER = "GIT_SERVER",
  STORAGE = "STORAGE",
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

  /** @format uint64 */
  commentsCount?: string;
  issues?: GitopiaIssueIid[];
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

export interface GitopiaPullRequestIid {
  /** @format uint64 */
  iid?: string;

  /** @format uint64 */
  id?: string;
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
  Repository?: GitopiagitopiaRepository[];

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

export interface GitopiaQueryAllBountyResponse {
  Bounty?: GitopiagitopiaBounty[];

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
  dao?: GitopiagitopiaDao[];

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

export interface GitopiaQueryAllIssueCommentResponse {
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

export interface GitopiaQueryAllPullRequestCommentResponse {
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
  Release?: GitopiagitopiaRelease[];

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
  Release?: GitopiagitopiaRelease[];

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
  Repository?: GitopiagitopiaRepository[];

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
  Task?: GitopiagitopiaTask[];

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
  dao?: GitopiagitopiaDao[];

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
  User?: GitopiagitopiaUser[];

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
  Whois?: GitopiagitopiaWhois[];

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
  Repository?: GitopiagitopiaRepository;
}

export interface GitopiaQueryGetBountyResponse {
  Bounty?: GitopiagitopiaBounty;
}

export interface GitopiaQueryGetDaoMemberResponse {
  Member?: GitopiaMember;
}

export interface GitopiaQueryGetDaoResponse {
  dao?: GitopiagitopiaDao;
}

export interface GitopiaQueryGetIssueCommentResponse {
  Comment?: GitopiaComment;
}

export interface GitopiaQueryGetLatestRepositoryReleaseResponse {
  Release?: GitopiagitopiaRelease;
}

export interface GitopiaQueryGetPullRequestCommentResponse {
  Comment?: GitopiaComment;
}

export interface GitopiaQueryGetPullRequestMergePermissionResponse {
  havePermission?: boolean;
}

export interface GitopiaQueryGetReleaseResponse {
  Release?: GitopiagitopiaRelease;
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
  Release?: GitopiagitopiaRelease;
}

export interface GitopiaQueryGetRepositoryResponse {
  Repository?: GitopiagitopiaRepository;
}

export interface GitopiaQueryGetRepositoryTagResponse {
  Tag?: GitopiagitopiaTag;
}

export interface GitopiaQueryGetRepositoryTagShaResponse {
  sha?: string;
}

export interface GitopiaQueryGetTaskResponse {
  Task?: GitopiagitopiaTask;
}

export interface GitopiaQueryGetUserResponse {
  User?: GitopiagitopiaUser;
}

export interface GitopiaQueryGetWhoisResponse {
  Whois?: GitopiagitopiaWhois;
}

/**
 * QueryParamsResponse is the response type for the Query/Params RPC method.
 */
export interface GitopiaQueryParamsResponse {
  /** params defines the parameters of the module. */
  params?: GitopiagitopiaParams;
}

export interface GitopiaQueryVestedAmountResponse {
  address?: string;

  /**
   * Coin defines a token with a denomination and an amount.
   *
   * NOTE: The amount field is an Int which implements the custom method
   * signatures required by gogoproto.
   */
  amount?: V1Beta1Coin;

  /**
   * Coin defines a token with a denomination and an amount.
   *
   * NOTE: The amount field is an Int which implements the custom method
   * signatures required by gogoproto.
   */
  exercisedAmount?: V1Beta1Coin;
}

export interface GitopiaReaction {
  address?: string;
  emojis?: GitopiaEmoji[];
}

export interface GitopiaRepositoryBackup {
  store?: RepositoryBackupStore;
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

export enum GitopiaTaskState {
  TASK_STATE_PENDING = "TASK_STATE_PENDING",
  TASK_STATE_SUCCESS = "TASK_STATE_SUCCESS",
  TASK_STATE_FAILURE = "TASK_STATE_FAILURE",
}

export enum GitopiaTaskType {
  TASK_TYPE_FORK_REPOSITORY = "TASK_TYPE_FORK_REPOSITORY",
  TASK_TYPE_SET_PULL_REQUEST_STATE = "TASK_TYPE_SET_PULL_REQUEST_STATE",
}

export interface GitopiagitopiaBounty {
  /** @format uint64 */
  id?: string;
  amount?: V1Beta1Coin[];
  state?: GitopiaBountyState;

  /** @format uint64 */
  repositoryId?: string;

  /** @format uint64 */
  parentIid?: string;
  parent?: GitopiaBountyParent;

  /** @format int64 */
  expireAt?: string;
  rewardedTo?: string;

  /** @format int64 */
  createdAt?: string;

  /** @format int64 */
  updatedAt?: string;
  creator?: string;
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

export interface GitopiagitopiaDao {
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
  pinned_repos?: string[];
}

/**
 * Params defines the parameters for the module.
 */
export interface GitopiagitopiaParams {
  /** @format date-time */
  next_inflation_time?: string;
  pool_proportions?: GitopiaPoolProportions;
  team_proportions?: GitopiaDistributionProportion[];

  /** @format date-time */
  genesis_time?: string;
  git_server?: string;
  storage_provider?: string;
}

export interface GitopiagitopiaRelease {
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

export interface GitopiagitopiaRepository {
  creator?: string;

  /** @format uint64 */
  id?: string;
  name?: string;
  owner?: GitopiaRepositoryOwner;
  description?: string;
  forks?: string[];
  subscribers?: string;
  commits?: string;

  /** @format uint64 */
  issuesCount?: string;

  /** @format uint64 */
  pullsCount?: string;
  labels?: GitopiaRepositoryLabel[];

  /** @format uint64 */
  labelsCount?: string;
  releases?: GitopiagitopiaRepositoryRelease[];

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
  enableArweaveBackup?: boolean;
}

export interface GitopiagitopiaRepositoryRelease {
  /** @format uint64 */
  id?: string;
  tagName?: string;
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

export interface GitopiagitopiaTask {
  /** @format uint64 */
  id?: string;
  type?: GitopiaTaskType;
  state?: GitopiaTaskState;
  message?: string;
  creator?: string;
  provider?: string;
}

export interface GitopiagitopiaUser {
  creator?: string;

  /** @format uint64 */
  id?: string;
  name?: string;
  username?: string;
  usernameGithub?: string;
  avatarUrl?: string;
  followers?: string[];
  following?: string[];
  starred_repos?: string[];
  subscriptions?: string;
  bio?: string;

  /** @format int64 */
  createdAt?: string;

  /** @format int64 */
  updatedAt?: string;
  verified?: boolean;
  pinned_repos?: string[];
}

export interface GitopiagitopiaWhois {
  creator?: string;

  /** @format uint64 */
  id?: string;
  name?: string;
  address?: string;
  ownerType?: GitopiaOwnerType;
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
* Coin defines a token with a denomination and an amount.

NOTE: The amount field is an Int which implements the custom method
signatures required by gogoproto.
*/
export interface V1Beta1Coin {
  denom?: string;
  amount?: string;
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
  count_total?: boolean;

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
  /**
   * next_key is the key to be passed to PageRequest.key to
   * query the next page most efficiently. It will be empty if
   * there are no more results.
   * @format byte
   */
  next_key?: string;

  /**
   * total is total number of results available if PageRequest.count_total
   * was set, its value is undefined otherwise
   * @format uint64
   */
  total?: string;
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.instance.defaults.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      formData.append(
        key,
        property instanceof Blob
          ? property
          : typeof property === "object" && property !== null
          ? JSON.stringify(property)
          : `${property}`,
      );
      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = (format && this.format) || void 0;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      requestParams.headers.common = { Accept: "*/*" };
      requestParams.headers.post = {};
      requestParams.headers.put = {};

      body = this.createFormData(body as Record<string, unknown>);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title gitopia/gitopia/gitopia/attachment.proto
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
   * @name QueryBountyAll
   * @summary Queries a list of Bounty items.
   * @request GET:/gitopia/gitopia/gitopia/bounty
   */
  queryBountyAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<GitopiaQueryAllBountyResponse, RpcStatus>({
      path: `/gitopia/gitopia/gitopia/bounty`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryBounty
   * @summary Queries a Bounty by id.
   * @request GET:/gitopia/gitopia/gitopia/bounty/{id}
   */
  queryBounty = (id: string, params: RequestParams = {}) =>
    this.request<GitopiaQueryGetBountyResponse, RpcStatus>({
      path: `/gitopia/gitopia/gitopia/bounty/${id}`,
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
      "pagination.count_total"?: boolean;
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
   * @summary Queries a list of comment.
   * @request GET:/gitopia/gitopia/gitopia/comment
   */
  queryCommentAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
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
   * @name QueryDaoAll
   * @summary Queries a list of Dao items.
   * @request GET:/gitopia/gitopia/gitopia/dao
   */
  queryDaoAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
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
      "pagination.count_total"?: boolean;
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
      "pagination.count_total"?: boolean;
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
   * @name QueryMemberAll
   * @summary Queries a list of Member items.
   * @request GET:/gitopia/gitopia/gitopia/member
   */
  queryMemberAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
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
   * @name QueryParams
   * @summary Params returns the total set of gitopia parameters.
   * @request GET:/gitopia/gitopia/gitopia/params
   */
  queryParams = (params: RequestParams = {}) =>
    this.request<GitopiaQueryParamsResponse, RpcStatus>({
      path: `/gitopia/gitopia/gitopia/params`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryPullRequestMergePermission
   * @request GET:/gitopia/gitopia/gitopia/permissions/{userId}/repository/{repositoryId}/pull/{pullIid}/merge
   */
  queryPullRequestMergePermission = (
    userId: string,
    repositoryId: string,
    pullIid: string,
    params: RequestParams = {},
  ) =>
    this.request<GitopiaQueryGetPullRequestMergePermissionResponse, RpcStatus>({
      path: `/gitopia/gitopia/gitopia/permissions/${userId}/repository/${repositoryId}/pull/${pullIid}/merge`,
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
      "pagination.count_total"?: boolean;
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
   * @name QueryReleaseAll
   * @summary Queries a list of release items.
   * @request GET:/gitopia/gitopia/gitopia/release
   */
  queryReleaseAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
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
      "pagination.count_total"?: boolean;
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
   * @name QueryIssueCommentAll
   * @summary Queries a list of issue comment.
   * @request GET:/gitopia/gitopia/gitopia/repository/{repositoryId}/issue/{issueIid}/comment
   */
  queryIssueCommentAll = (
    repositoryId: string,
    issueIid: string,
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<GitopiaQueryAllIssueCommentResponse, RpcStatus>({
      path: `/gitopia/gitopia/gitopia/repository/${repositoryId}/issue/${issueIid}/comment`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryIssueComment
   * @summary Queries a issue comment.
   * @request GET:/gitopia/gitopia/gitopia/repository/{repositoryId}/issue/{issueIid}/comment/{commentIid}
   */
  queryIssueComment = (repositoryId: string, issueIid: string, commentIid: string, params: RequestParams = {}) =>
    this.request<GitopiaQueryGetIssueCommentResponse, RpcStatus>({
      path: `/gitopia/gitopia/gitopia/repository/${repositoryId}/issue/${issueIid}/comment/${commentIid}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryPullRequestCommentAll
   * @summary Queries a list of pullrequest comment.
   * @request GET:/gitopia/gitopia/gitopia/repository/{repositoryId}/pullrequest/{pullRequestIid}/comment
   */
  queryPullRequestCommentAll = (
    repositoryId: string,
    pullRequestIid: string,
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<GitopiaQueryAllPullRequestCommentResponse, RpcStatus>({
      path: `/gitopia/gitopia/gitopia/repository/${repositoryId}/pullrequest/${pullRequestIid}/comment`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryPullRequestComment
   * @summary Queries a pullrequest comment.
   * @request GET:/gitopia/gitopia/gitopia/repository/{repositoryId}/pullrequest/{pullRequestIid}/comment/{commentIid}
   */
  queryPullRequestComment = (
    repositoryId: string,
    pullRequestIid: string,
    commentIid: string,
    params: RequestParams = {},
  ) =>
    this.request<GitopiaQueryGetPullRequestCommentResponse, RpcStatus>({
      path: `/gitopia/gitopia/gitopia/repository/${repositoryId}/pullrequest/${pullRequestIid}/comment/${commentIid}`,
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
      "pagination.count_total"?: boolean;
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
      "pagination.count_total"?: boolean;
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
      "pagination.count_total"?: boolean;
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
      "pagination.count_total"?: boolean;
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
      "pagination.count_total"?: boolean;
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
   * @name QueryVestedAmount
   * @summary query vested amount for developer address
   * @request GET:/gitopia/gitopia/gitopia/vestedAmount/{address}
   */
  queryVestedAmount = (address: string, params: RequestParams = {}) =>
    this.request<GitopiaQueryVestedAmountResponse, RpcStatus>({
      path: `/gitopia/gitopia/gitopia/vestedAmount/${address}`,
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
  queryWhoisAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
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
      "pagination.count_total"?: boolean;
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
      "pagination.count_total"?: boolean;
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
      "pagination.count_total"?: boolean;
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
      "pagination.count_total"?: boolean;
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
   * @summary Queries a list of repository issue.
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
      "pagination.count_total"?: boolean;
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
   * @summary Queries a repository issue by iid.
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
   * @summary Queries a list of repository pullRequest.
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
      "pagination.count_total"?: boolean;
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
   * @summary Queries a repository pullRequest.
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
