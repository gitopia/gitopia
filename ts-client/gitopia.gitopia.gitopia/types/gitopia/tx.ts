/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../cosmos/base/v1beta1/coin";
import { Attachment } from "./attachment";
import { BountyParent, bountyParentFromJSON, bountyParentToJSON } from "./bounty";
import { CommentParent, commentParentFromJSON, commentParentToJSON } from "./comment";
import { MemberRole, memberRoleFromJSON, memberRoleToJSON } from "./member";
import {
  RepositoryBackup_Store,
  repositoryBackup_StoreFromJSON,
  repositoryBackup_StoreToJSON,
  RepositoryId,
} from "./repository";
import { TaskState, taskStateFromJSON, taskStateToJSON, TaskType, taskTypeFromJSON, taskTypeToJSON } from "./task";

export const protobufPackage = "gitopia.gitopia.gitopia";

export enum ProviderPermission {
  GIT_SERVER = 0,
  STORAGE = 1,
  UNRECOGNIZED = -1,
}

export function providerPermissionFromJSON(object: any): ProviderPermission {
  switch (object) {
    case 0:
    case "GIT_SERVER":
      return ProviderPermission.GIT_SERVER;
    case 1:
    case "STORAGE":
      return ProviderPermission.STORAGE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ProviderPermission.UNRECOGNIZED;
  }
}

export function providerPermissionToJSON(object: ProviderPermission): string {
  switch (object) {
    case ProviderPermission.GIT_SERVER:
      return "GIT_SERVER";
    case ProviderPermission.STORAGE:
      return "STORAGE";
    case ProviderPermission.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface MsgExercise {
  creator: string;
  coins: Coin[];
  to: string;
}

export interface MsgExerciseResponse {
}

export interface MsgToggleForcePush {
  creator: string;
  repositoryId: RepositoryId | undefined;
  branchName: string;
}

export interface MsgToggleForcePushResponse {
}

export interface MsgRevokeProviderPermission {
  creator: string;
  granter: string;
  provider: string;
  permission: ProviderPermission;
}

export interface MsgRevokeProviderPermissionResponse {
}

export interface MsgAuthorizeProvider {
  creator: string;
  granter: string;
  provider: string;
  permission: ProviderPermission;
}

export interface MsgAuthorizeProviderResponse {
}

export interface MsgCreateTask {
  creator: string;
  taskType: TaskType;
  provider: string;
}

export interface MsgCreateTaskResponse {
  id: number;
}

export interface MsgUpdateTask {
  creator: string;
  id: number;
  state: TaskState;
  message: string;
}

export interface MsgUpdateTaskResponse {
}

export interface MsgDeleteTask {
  creator: string;
  id: number;
}

export interface MsgUpdateRepositoryBackupRef {
  creator: string;
  repositoryId: RepositoryId | undefined;
  store: RepositoryBackup_Store;
  ref: string;
}

export interface MsgUpdateRepositoryBackupRefResponse {
}

export interface MsgAddRepositoryBackupRef {
  creator: string;
  repositoryId: RepositoryId | undefined;
  store: RepositoryBackup_Store;
  ref: string;
}

export interface MsgAddRepositoryBackupRefResponse {
}

export interface MsgDeleteTaskResponse {
}

export interface MsgDeleteStorageProviderResponse {
}

export interface MsgSetBranch {
  creator: string;
  repositoryId: RepositoryId | undefined;
  branch: MsgSetBranch_Branch | undefined;
}

export interface MsgSetBranch_Branch {
  name: string;
  sha: string;
}

export interface MsgSetBranchResponse {
}

export interface MsgSetDefaultBranch {
  creator: string;
  repositoryId: RepositoryId | undefined;
  branch: string;
}

export interface MsgSetDefaultBranchResponse {
}

export interface MsgMultiSetBranch {
  creator: string;
  repositoryId: RepositoryId | undefined;
  branches: MsgMultiSetBranch_Branch[];
}

export interface MsgMultiSetBranch_Branch {
  name: string;
  sha: string;
}

export interface MsgMultiSetBranchResponse {
}

export interface MsgDeleteBranch {
  creator: string;
  repositoryId: RepositoryId | undefined;
  branch: string;
}

export interface MsgDeleteBranchResponse {
}

export interface MsgMultiDeleteBranch {
  creator: string;
  repositoryId: RepositoryId | undefined;
  branches: string[];
}

export interface MsgMultiDeleteBranchResponse {
}

export interface MsgSetTag {
  creator: string;
  repositoryId: RepositoryId | undefined;
  tag: MsgSetTag_Tag | undefined;
}

export interface MsgSetTag_Tag {
  name: string;
  sha: string;
}

export interface MsgSetTagResponse {
}

export interface MsgMultiSetTag {
  creator: string;
  repositoryId: RepositoryId | undefined;
  tags: MsgMultiSetTag_Tag[];
}

export interface MsgMultiSetTag_Tag {
  name: string;
  sha: string;
}

export interface MsgMultiSetTagResponse {
}

export interface MsgDeleteTag {
  creator: string;
  repositoryId: RepositoryId | undefined;
  tag: string;
}

export interface MsgDeleteTagResponse {
}

export interface MsgMultiDeleteTag {
  creator: string;
  repositoryId: RepositoryId | undefined;
  tags: string[];
}

export interface MsgMultiDeleteTagResponse {
}

export interface MsgAddMember {
  creator: string;
  daoId: string;
  userId: string;
  role: MemberRole;
}

export interface MsgAddMemberResponse {
}

export interface MsgUpdateMemberRole {
  creator: string;
  daoId: string;
  userId: string;
  role: MemberRole;
}

export interface MsgUpdateMemberRoleResponse {
}

export interface MsgRemoveMember {
  creator: string;
  daoId: string;
  userId: string;
}

export interface MsgRemoveMemberResponse {
}

export interface MsgCreateBounty {
  creator: string;
  amount: Coin[];
  expiry: number;
  repositoryId: number;
  parentIid: number;
  parent: BountyParent;
}

export interface MsgCreateBountyResponse {
  id: number;
}

export interface MsgUpdateBountyExpiry {
  creator: string;
  id: number;
  expiry: number;
}

export interface MsgUpdateBountyExpiryResponse {
}

export interface MsgCloseBounty {
  creator: string;
  id: number;
}

export interface MsgCloseBountyResponse {
}

export interface MsgDeleteBounty {
  creator: string;
  id: number;
}

export interface MsgDeleteBountyResponse {
}

/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgCreateRelease {
  creator: string;
  repositoryId: RepositoryId | undefined;
  tagName: string;
  target: string;
  name: string;
  description: string;
  attachments: string;
  draft: boolean;
  preRelease: boolean;
  isTag: boolean;
}

export interface MsgCreateReleaseResponse {
  id: number;
}

export interface MsgUpdateRelease {
  creator: string;
  id: number;
  tagName: string;
  target: string;
  name: string;
  description: string;
  attachments: string;
  draft: boolean;
  preRelease: boolean;
  isTag: boolean;
}

export interface MsgUpdateReleaseResponse {
}

export interface MsgDeleteRelease {
  creator: string;
  id: number;
}

export interface MsgDeleteReleaseResponse {
}

export interface MsgCreatePullRequest {
  creator: string;
  title: string;
  description: string;
  headBranch: string;
  headRepositoryId: RepositoryId | undefined;
  baseBranch: string;
  baseRepositoryId: RepositoryId | undefined;
  reviewers: string[];
  assignees: string[];
  labelIds: number[];
  issueIids: number[];
}

export interface MsgCreatePullRequestResponse {
  id: number;
  iid: number;
}

export interface MsgUpdatePullRequestTitle {
  creator: string;
  repositoryId: number;
  iid: number;
  title: string;
}

export interface MsgUpdatePullRequestTitleResponse {
}

export interface MsgUpdatePullRequestDescription {
  creator: string;
  repositoryId: number;
  iid: number;
  description: string;
}

export interface MsgUpdatePullRequestDescriptionResponse {
}

export interface MsgInvokeMergePullRequest {
  creator: string;
  repositoryId: number;
  iid: number;
  provider: string;
}

export interface MsgInvokeMergePullRequestResponse {
}

export interface MsgSetPullRequestState {
  creator: string;
  repositoryId: number;
  iid: number;
  state: string;
  mergeCommitSha: string;
  commentBody: string;
  taskId: number;
}

export interface MsgSetPullRequestStateResponse {
  state: string;
}

export interface MsgAddPullRequestReviewers {
  creator: string;
  repositoryId: number;
  iid: number;
  reviewers: string[];
}

export interface MsgAddPullRequestReviewersResponse {
}

export interface MsgRemovePullRequestReviewers {
  creator: string;
  repositoryId: number;
  iid: number;
  reviewers: string[];
}

export interface MsgRemovePullRequestReviewersResponse {
}

export interface MsgAddPullRequestAssignees {
  creator: string;
  repositoryId: number;
  iid: number;
  assignees: string[];
}

export interface MsgAddPullRequestAssigneesResponse {
}

export interface MsgRemovePullRequestAssignees {
  creator: string;
  repositoryId: number;
  iid: number;
  assignees: string[];
}

export interface MsgRemovePullRequestAssigneesResponse {
}

export interface MsgLinkPullRequestIssueByIid {
  creator: string;
  repositoryId: number;
  pullRequestIid: number;
  issueIid: number;
}

export interface MsgLinkPullRequestIssueByIidResponse {
}

export interface MsgUnlinkPullRequestIssueByIid {
  creator: string;
  repositoryId: number;
  pullRequestIid: number;
  issueIid: number;
}

export interface MsgUnlinkPullRequestIssueByIidResponse {
}

export interface MsgAddPullRequestLabels {
  creator: string;
  repositoryId: number;
  iid: number;
  labelIds: number[];
}

export interface MsgAddPullRequestLabelsResponse {
}

export interface MsgRemovePullRequestLabels {
  creator: string;
  repositoryId: number;
  iid: number;
  labelIds: number[];
}

export interface MsgRemovePullRequestLabelsResponse {
}

export interface MsgDeletePullRequest {
  creator: string;
  repositoryId: number;
  iid: number;
}

export interface MsgDeletePullRequestResponse {
}

export interface MsgCreateDao {
  creator: string;
  name: string;
  description: string;
  avatarUrl: string;
  location: string;
  website: string;
}

export interface MsgCreateDaoResponse {
  id: string;
}

export interface MsgRenameDao {
  creator: string;
  id: string;
  name: string;
}

export interface MsgRenameDaoResponse {
}

export interface MsgUpdateDaoDescription {
  creator: string;
  id: string;
  description: string;
}

export interface MsgUpdateDaoDescriptionResponse {
}

export interface MsgUpdateDaoWebsite {
  creator: string;
  id: string;
  url: string;
}

export interface MsgUpdateDaoWebsiteResponse {
}

export interface MsgUpdateDaoLocation {
  creator: string;
  id: string;
  location: string;
}

export interface MsgUpdateDaoLocationResponse {
}

export interface MsgUpdateDaoAvatar {
  creator: string;
  id: string;
  url: string;
}

export interface MsgUpdateDaoAvatarResponse {
}

export interface MsgDeleteDao {
  creator: string;
  id: string;
}

export interface MsgDeleteDaoResponse {
}

export interface MsgCreateComment {
  creator: string;
  repositoryId: number;
  parentIid: number;
  parent: CommentParent;
  body: string;
  attachments: Attachment[];
  diffHunk: string;
  path: string;
}

export interface MsgCreateCommentResponse {
  id: number;
}

export interface MsgUpdateComment {
  creator: string;
  repositoryId: number;
  parentIid: number;
  parent: CommentParent;
  commentIid: number;
  body: string;
  attachments: Attachment[];
}

export interface MsgUpdateCommentResponse {
}

export interface MsgDeleteComment {
  creator: string;
  repositoryId: number;
  parentIid: number;
  parent: CommentParent;
  commentIid: number;
}

export interface MsgDeleteCommentResponse {
}

export interface MsgCreateIssue {
  creator: string;
  repositoryId: RepositoryId | undefined;
  title: string;
  description: string;
  labelIds: number[];
  weight: number;
  assignees: string[];
  bountyAmount: Coin[];
  bountyExpiry: number;
}

export interface MsgCreateIssueResponse {
  id: number;
  iid: number;
}

export interface MsgUpdateIssueTitle {
  creator: string;
  repositoryId: number;
  iid: number;
  title: string;
}

export interface MsgUpdateIssueTitleResponse {
}

export interface MsgUpdateIssueDescription {
  creator: string;
  repositoryId: number;
  iid: number;
  description: string;
}

export interface MsgUpdateIssueDescriptionResponse {
}

export interface MsgToggleIssueState {
  creator: string;
  repositoryId: number;
  iid: number;
  commentBody: string;
}

export interface MsgToggleIssueStateResponse {
  state: string;
}

export interface MsgAddIssueAssignees {
  creator: string;
  repositoryId: number;
  iid: number;
  assignees: string[];
}

export interface MsgAddIssueAssigneesResponse {
}

export interface MsgRemoveIssueAssignees {
  creator: string;
  repositoryId: number;
  iid: number;
  assignees: string[];
}

export interface MsgRemoveIssueAssigneesResponse {
}

export interface MsgAddIssueLabels {
  creator: string;
  repositoryId: number;
  iid: number;
  labelIds: number[];
}

export interface MsgAddIssueLabelsResponse {
}

export interface MsgRemoveIssueLabels {
  creator: string;
  repositoryId: number;
  iid: number;
  labelIds: number[];
}

export interface MsgRemoveIssueLabelsResponse {
}

export interface MsgDeleteIssue {
  creator: string;
  repositoryId: number;
  iid: number;
}

export interface MsgDeleteIssueResponse {
}

export interface MsgCreateRepository {
  creator: string;
  name: string;
  owner: string;
  description: string;
}

export interface MsgCreateRepositoryResponse {
  repositoryId: RepositoryId | undefined;
}

export interface MsgInvokeForkRepository {
  creator: string;
  repositoryId: RepositoryId | undefined;
  forkRepositoryName: string;
  forkRepositoryDescription: string;
  branch: string;
  owner: string;
  provider: string;
}

export interface MsgInvokeForkRepositoryResponse {
}

export interface MsgForkRepository {
  creator: string;
  repositoryId: RepositoryId | undefined;
  forkRepositoryName: string;
  forkRepositoryDescription: string;
  branch: string;
  owner: string;
  taskId: number;
}

export interface MsgForkRepositoryResponse {
  id: number;
}

export interface MsgForkRepositorySuccess {
  creator: string;
  repositoryId: RepositoryId | undefined;
  taskId: number;
}

export interface MsgForkRepositorySuccessResponse {
  id: number;
}

export interface MsgRenameRepository {
  creator: string;
  repositoryId: RepositoryId | undefined;
  name: string;
}

export interface MsgRenameRepositoryResponse {
}

export interface MsgUpdateRepositoryDescription {
  creator: string;
  repositoryId: RepositoryId | undefined;
  description: string;
}

export interface MsgUpdateRepositoryDescriptionResponse {
}

export interface MsgChangeOwner {
  creator: string;
  repositoryId: RepositoryId | undefined;
  owner: string;
}

export interface MsgChangeOwnerResponse {
}

export interface MsgUpdateRepositoryCollaborator {
  creator: string;
  repositoryId: RepositoryId | undefined;
  user: string;
  role: string;
}

export interface MsgUpdateRepositoryCollaboratorResponse {
}

export interface MsgRemoveRepositoryCollaborator {
  creator: string;
  repositoryId: RepositoryId | undefined;
  user: string;
}

export interface MsgRemoveRepositoryCollaboratorResponse {
}

export interface MsgCreateRepositoryLabel {
  creator: string;
  repositoryId: RepositoryId | undefined;
  name: string;
  color: string;
  description: string;
}

export interface MsgCreateRepositoryLabelResponse {
  id: number;
}

export interface MsgUpdateRepositoryLabel {
  creator: string;
  repositoryId: RepositoryId | undefined;
  labelId: number;
  name: string;
  color: string;
  description: string;
}

export interface MsgUpdateRepositoryLabelResponse {
}

export interface MsgDeleteRepositoryLabel {
  creator: string;
  repositoryId: RepositoryId | undefined;
  labelId: number;
}

export interface MsgDeleteRepositoryLabelResponse {
}

export interface MsgToggleRepositoryForking {
  creator: string;
  repositoryId: RepositoryId | undefined;
}

export interface MsgToggleRepositoryForkingResponse {
  allowForking: boolean;
}

export interface MsgToggleArweaveBackup {
  creator: string;
  repositoryId: RepositoryId | undefined;
}

export interface MsgToggleArweaveBackupResponse {
  enableArweaveBackup: boolean;
}

export interface MsgDeleteRepository {
  creator: string;
  repositoryId: RepositoryId | undefined;
}

export interface MsgDeleteRepositoryResponse {
}

export interface MsgCreateUser {
  creator: string;
  username: string;
  name: string;
  avatarUrl: string;
  bio: string;
}

export interface MsgCreateUserResponse {
  id: string;
}

export interface MsgUpdateUserUsername {
  creator: string;
  username: string;
}

export interface MsgUpdateUserUsernameResponse {
}

export interface MsgUpdateUserName {
  creator: string;
  name: string;
}

export interface MsgUpdateUserNameResponse {
}

export interface MsgUpdateUserBio {
  creator: string;
  bio: string;
}

export interface MsgUpdateUserBioResponse {
}

export interface MsgUpdateUserAvatar {
  creator: string;
  url: string;
}

export interface MsgUpdateUserAvatarResponse {
}

export interface MsgDeleteUser {
  creator: string;
  id: string;
}

export interface MsgDeleteUserResponse {
}

function createBaseMsgExercise(): MsgExercise {
  return { creator: "", coins: [], to: "" };
}

export const MsgExercise = {
  encode(message: MsgExercise, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.to !== "") {
      writer.uint32(26).string(message.to);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgExercise {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExercise();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.coins.push(Coin.decode(reader, reader.uint32()));
          break;
        case 3:
          message.to = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgExercise {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      coins: Array.isArray(object?.coins) ? object.coins.map((e: any) => Coin.fromJSON(e)) : [],
      to: isSet(object.to) ? String(object.to) : "",
    };
  },

  toJSON(message: MsgExercise): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    if (message.coins) {
      obj.coins = message.coins.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.coins = [];
    }
    message.to !== undefined && (obj.to = message.to);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgExercise>, I>>(object: I): MsgExercise {
    const message = createBaseMsgExercise();
    message.creator = object.creator ?? "";
    message.coins = object.coins?.map((e) => Coin.fromPartial(e)) || [];
    message.to = object.to ?? "";
    return message;
  },
};

function createBaseMsgExerciseResponse(): MsgExerciseResponse {
  return {};
}

export const MsgExerciseResponse = {
  encode(_: MsgExerciseResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgExerciseResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExerciseResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgExerciseResponse {
    return {};
  },

  toJSON(_: MsgExerciseResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgExerciseResponse>, I>>(_: I): MsgExerciseResponse {
    const message = createBaseMsgExerciseResponse();
    return message;
  },
};

function createBaseMsgToggleForcePush(): MsgToggleForcePush {
  return { creator: "", repositoryId: undefined, branchName: "" };
}

export const MsgToggleForcePush = {
  encode(message: MsgToggleForcePush, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
    }
    if (message.branchName !== "") {
      writer.uint32(26).string(message.branchName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgToggleForcePush {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgToggleForcePush();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = RepositoryId.decode(reader, reader.uint32());
          break;
        case 3:
          message.branchName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgToggleForcePush {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? RepositoryId.fromJSON(object.repositoryId) : undefined,
      branchName: isSet(object.branchName) ? String(object.branchName) : "",
    };
  },

  toJSON(message: MsgToggleForcePush): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined
      && (obj.repositoryId = message.repositoryId ? RepositoryId.toJSON(message.repositoryId) : undefined);
    message.branchName !== undefined && (obj.branchName = message.branchName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgToggleForcePush>, I>>(object: I): MsgToggleForcePush {
    const message = createBaseMsgToggleForcePush();
    message.creator = object.creator ?? "";
    message.repositoryId = (object.repositoryId !== undefined && object.repositoryId !== null)
      ? RepositoryId.fromPartial(object.repositoryId)
      : undefined;
    message.branchName = object.branchName ?? "";
    return message;
  },
};

function createBaseMsgToggleForcePushResponse(): MsgToggleForcePushResponse {
  return {};
}

export const MsgToggleForcePushResponse = {
  encode(_: MsgToggleForcePushResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgToggleForcePushResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgToggleForcePushResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgToggleForcePushResponse {
    return {};
  },

  toJSON(_: MsgToggleForcePushResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgToggleForcePushResponse>, I>>(_: I): MsgToggleForcePushResponse {
    const message = createBaseMsgToggleForcePushResponse();
    return message;
  },
};

function createBaseMsgRevokeProviderPermission(): MsgRevokeProviderPermission {
  return { creator: "", granter: "", provider: "", permission: 0 };
}

export const MsgRevokeProviderPermission = {
  encode(message: MsgRevokeProviderPermission, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.granter !== "") {
      writer.uint32(18).string(message.granter);
    }
    if (message.provider !== "") {
      writer.uint32(26).string(message.provider);
    }
    if (message.permission !== 0) {
      writer.uint32(32).int32(message.permission);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRevokeProviderPermission {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRevokeProviderPermission();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.granter = reader.string();
          break;
        case 3:
          message.provider = reader.string();
          break;
        case 4:
          message.permission = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRevokeProviderPermission {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      granter: isSet(object.granter) ? String(object.granter) : "",
      provider: isSet(object.provider) ? String(object.provider) : "",
      permission: isSet(object.permission) ? providerPermissionFromJSON(object.permission) : 0,
    };
  },

  toJSON(message: MsgRevokeProviderPermission): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.granter !== undefined && (obj.granter = message.granter);
    message.provider !== undefined && (obj.provider = message.provider);
    message.permission !== undefined && (obj.permission = providerPermissionToJSON(message.permission));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRevokeProviderPermission>, I>>(object: I): MsgRevokeProviderPermission {
    const message = createBaseMsgRevokeProviderPermission();
    message.creator = object.creator ?? "";
    message.granter = object.granter ?? "";
    message.provider = object.provider ?? "";
    message.permission = object.permission ?? 0;
    return message;
  },
};

function createBaseMsgRevokeProviderPermissionResponse(): MsgRevokeProviderPermissionResponse {
  return {};
}

export const MsgRevokeProviderPermissionResponse = {
  encode(_: MsgRevokeProviderPermissionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRevokeProviderPermissionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRevokeProviderPermissionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgRevokeProviderPermissionResponse {
    return {};
  },

  toJSON(_: MsgRevokeProviderPermissionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRevokeProviderPermissionResponse>, I>>(
    _: I,
  ): MsgRevokeProviderPermissionResponse {
    const message = createBaseMsgRevokeProviderPermissionResponse();
    return message;
  },
};

function createBaseMsgAuthorizeProvider(): MsgAuthorizeProvider {
  return { creator: "", granter: "", provider: "", permission: 0 };
}

export const MsgAuthorizeProvider = {
  encode(message: MsgAuthorizeProvider, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.granter !== "") {
      writer.uint32(18).string(message.granter);
    }
    if (message.provider !== "") {
      writer.uint32(26).string(message.provider);
    }
    if (message.permission !== 0) {
      writer.uint32(32).int32(message.permission);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAuthorizeProvider {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAuthorizeProvider();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.granter = reader.string();
          break;
        case 3:
          message.provider = reader.string();
          break;
        case 4:
          message.permission = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAuthorizeProvider {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      granter: isSet(object.granter) ? String(object.granter) : "",
      provider: isSet(object.provider) ? String(object.provider) : "",
      permission: isSet(object.permission) ? providerPermissionFromJSON(object.permission) : 0,
    };
  },

  toJSON(message: MsgAuthorizeProvider): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.granter !== undefined && (obj.granter = message.granter);
    message.provider !== undefined && (obj.provider = message.provider);
    message.permission !== undefined && (obj.permission = providerPermissionToJSON(message.permission));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAuthorizeProvider>, I>>(object: I): MsgAuthorizeProvider {
    const message = createBaseMsgAuthorizeProvider();
    message.creator = object.creator ?? "";
    message.granter = object.granter ?? "";
    message.provider = object.provider ?? "";
    message.permission = object.permission ?? 0;
    return message;
  },
};

function createBaseMsgAuthorizeProviderResponse(): MsgAuthorizeProviderResponse {
  return {};
}

export const MsgAuthorizeProviderResponse = {
  encode(_: MsgAuthorizeProviderResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAuthorizeProviderResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAuthorizeProviderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgAuthorizeProviderResponse {
    return {};
  },

  toJSON(_: MsgAuthorizeProviderResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAuthorizeProviderResponse>, I>>(_: I): MsgAuthorizeProviderResponse {
    const message = createBaseMsgAuthorizeProviderResponse();
    return message;
  },
};

function createBaseMsgCreateTask(): MsgCreateTask {
  return { creator: "", taskType: 0, provider: "" };
}

export const MsgCreateTask = {
  encode(message: MsgCreateTask, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.taskType !== 0) {
      writer.uint32(16).int32(message.taskType);
    }
    if (message.provider !== "") {
      writer.uint32(26).string(message.provider);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateTask {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateTask();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.taskType = reader.int32() as any;
          break;
        case 3:
          message.provider = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateTask {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      taskType: isSet(object.taskType) ? taskTypeFromJSON(object.taskType) : 0,
      provider: isSet(object.provider) ? String(object.provider) : "",
    };
  },

  toJSON(message: MsgCreateTask): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.taskType !== undefined && (obj.taskType = taskTypeToJSON(message.taskType));
    message.provider !== undefined && (obj.provider = message.provider);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateTask>, I>>(object: I): MsgCreateTask {
    const message = createBaseMsgCreateTask();
    message.creator = object.creator ?? "";
    message.taskType = object.taskType ?? 0;
    message.provider = object.provider ?? "";
    return message;
  },
};

function createBaseMsgCreateTaskResponse(): MsgCreateTaskResponse {
  return { id: 0 };
}

export const MsgCreateTaskResponse = {
  encode(message: MsgCreateTaskResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateTaskResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateTaskResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateTaskResponse {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: MsgCreateTaskResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateTaskResponse>, I>>(object: I): MsgCreateTaskResponse {
    const message = createBaseMsgCreateTaskResponse();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseMsgUpdateTask(): MsgUpdateTask {
  return { creator: "", id: 0, state: 0, message: "" };
}

export const MsgUpdateTask = {
  encode(message: MsgUpdateTask, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.state !== 0) {
      writer.uint32(24).int32(message.state);
    }
    if (message.message !== "") {
      writer.uint32(34).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateTask {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateTask();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.state = reader.int32() as any;
          break;
        case 4:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateTask {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
      state: isSet(object.state) ? taskStateFromJSON(object.state) : 0,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: MsgUpdateTask): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.state !== undefined && (obj.state = taskStateToJSON(message.state));
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateTask>, I>>(object: I): MsgUpdateTask {
    const message = createBaseMsgUpdateTask();
    message.creator = object.creator ?? "";
    message.id = object.id ?? 0;
    message.state = object.state ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseMsgUpdateTaskResponse(): MsgUpdateTaskResponse {
  return {};
}

export const MsgUpdateTaskResponse = {
  encode(_: MsgUpdateTaskResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateTaskResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateTaskResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateTaskResponse {
    return {};
  },

  toJSON(_: MsgUpdateTaskResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateTaskResponse>, I>>(_: I): MsgUpdateTaskResponse {
    const message = createBaseMsgUpdateTaskResponse();
    return message;
  },
};

function createBaseMsgDeleteTask(): MsgDeleteTask {
  return { creator: "", id: 0 };
}

export const MsgDeleteTask = {
  encode(message: MsgDeleteTask, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteTask {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteTask();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteTask {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
    };
  },

  toJSON(message: MsgDeleteTask): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteTask>, I>>(object: I): MsgDeleteTask {
    const message = createBaseMsgDeleteTask();
    message.creator = object.creator ?? "";
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseMsgUpdateRepositoryBackupRef(): MsgUpdateRepositoryBackupRef {
  return { creator: "", repositoryId: undefined, store: 0, ref: "" };
}

export const MsgUpdateRepositoryBackupRef = {
  encode(message: MsgUpdateRepositoryBackupRef, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
    }
    if (message.store !== 0) {
      writer.uint32(24).int32(message.store);
    }
    if (message.ref !== "") {
      writer.uint32(34).string(message.ref);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateRepositoryBackupRef {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateRepositoryBackupRef();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = RepositoryId.decode(reader, reader.uint32());
          break;
        case 3:
          message.store = reader.int32() as any;
          break;
        case 4:
          message.ref = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateRepositoryBackupRef {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? RepositoryId.fromJSON(object.repositoryId) : undefined,
      store: isSet(object.store) ? repositoryBackup_StoreFromJSON(object.store) : 0,
      ref: isSet(object.ref) ? String(object.ref) : "",
    };
  },

  toJSON(message: MsgUpdateRepositoryBackupRef): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined
      && (obj.repositoryId = message.repositoryId ? RepositoryId.toJSON(message.repositoryId) : undefined);
    message.store !== undefined && (obj.store = repositoryBackup_StoreToJSON(message.store));
    message.ref !== undefined && (obj.ref = message.ref);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateRepositoryBackupRef>, I>>(object: I): MsgUpdateRepositoryBackupRef {
    const message = createBaseMsgUpdateRepositoryBackupRef();
    message.creator = object.creator ?? "";
    message.repositoryId = (object.repositoryId !== undefined && object.repositoryId !== null)
      ? RepositoryId.fromPartial(object.repositoryId)
      : undefined;
    message.store = object.store ?? 0;
    message.ref = object.ref ?? "";
    return message;
  },
};

function createBaseMsgUpdateRepositoryBackupRefResponse(): MsgUpdateRepositoryBackupRefResponse {
  return {};
}

export const MsgUpdateRepositoryBackupRefResponse = {
  encode(_: MsgUpdateRepositoryBackupRefResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateRepositoryBackupRefResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateRepositoryBackupRefResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateRepositoryBackupRefResponse {
    return {};
  },

  toJSON(_: MsgUpdateRepositoryBackupRefResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateRepositoryBackupRefResponse>, I>>(
    _: I,
  ): MsgUpdateRepositoryBackupRefResponse {
    const message = createBaseMsgUpdateRepositoryBackupRefResponse();
    return message;
  },
};

function createBaseMsgAddRepositoryBackupRef(): MsgAddRepositoryBackupRef {
  return { creator: "", repositoryId: undefined, store: 0, ref: "" };
}

export const MsgAddRepositoryBackupRef = {
  encode(message: MsgAddRepositoryBackupRef, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
    }
    if (message.store !== 0) {
      writer.uint32(24).int32(message.store);
    }
    if (message.ref !== "") {
      writer.uint32(34).string(message.ref);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddRepositoryBackupRef {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddRepositoryBackupRef();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = RepositoryId.decode(reader, reader.uint32());
          break;
        case 3:
          message.store = reader.int32() as any;
          break;
        case 4:
          message.ref = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAddRepositoryBackupRef {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? RepositoryId.fromJSON(object.repositoryId) : undefined,
      store: isSet(object.store) ? repositoryBackup_StoreFromJSON(object.store) : 0,
      ref: isSet(object.ref) ? String(object.ref) : "",
    };
  },

  toJSON(message: MsgAddRepositoryBackupRef): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined
      && (obj.repositoryId = message.repositoryId ? RepositoryId.toJSON(message.repositoryId) : undefined);
    message.store !== undefined && (obj.store = repositoryBackup_StoreToJSON(message.store));
    message.ref !== undefined && (obj.ref = message.ref);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddRepositoryBackupRef>, I>>(object: I): MsgAddRepositoryBackupRef {
    const message = createBaseMsgAddRepositoryBackupRef();
    message.creator = object.creator ?? "";
    message.repositoryId = (object.repositoryId !== undefined && object.repositoryId !== null)
      ? RepositoryId.fromPartial(object.repositoryId)
      : undefined;
    message.store = object.store ?? 0;
    message.ref = object.ref ?? "";
    return message;
  },
};

function createBaseMsgAddRepositoryBackupRefResponse(): MsgAddRepositoryBackupRefResponse {
  return {};
}

export const MsgAddRepositoryBackupRefResponse = {
  encode(_: MsgAddRepositoryBackupRefResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddRepositoryBackupRefResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddRepositoryBackupRefResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgAddRepositoryBackupRefResponse {
    return {};
  },

  toJSON(_: MsgAddRepositoryBackupRefResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddRepositoryBackupRefResponse>, I>>(
    _: I,
  ): MsgAddRepositoryBackupRefResponse {
    const message = createBaseMsgAddRepositoryBackupRefResponse();
    return message;
  },
};

function createBaseMsgDeleteTaskResponse(): MsgDeleteTaskResponse {
  return {};
}

export const MsgDeleteTaskResponse = {
  encode(_: MsgDeleteTaskResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteTaskResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteTaskResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgDeleteTaskResponse {
    return {};
  },

  toJSON(_: MsgDeleteTaskResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteTaskResponse>, I>>(_: I): MsgDeleteTaskResponse {
    const message = createBaseMsgDeleteTaskResponse();
    return message;
  },
};

function createBaseMsgDeleteStorageProviderResponse(): MsgDeleteStorageProviderResponse {
  return {};
}

export const MsgDeleteStorageProviderResponse = {
  encode(_: MsgDeleteStorageProviderResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteStorageProviderResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteStorageProviderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgDeleteStorageProviderResponse {
    return {};
  },

  toJSON(_: MsgDeleteStorageProviderResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteStorageProviderResponse>, I>>(
    _: I,
  ): MsgDeleteStorageProviderResponse {
    const message = createBaseMsgDeleteStorageProviderResponse();
    return message;
  },
};

function createBaseMsgSetBranch(): MsgSetBranch {
  return { creator: "", repositoryId: undefined, branch: undefined };
}

export const MsgSetBranch = {
  encode(message: MsgSetBranch, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
    }
    if (message.branch !== undefined) {
      MsgSetBranch_Branch.encode(message.branch, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetBranch {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetBranch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = RepositoryId.decode(reader, reader.uint32());
          break;
        case 3:
          message.branch = MsgSetBranch_Branch.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetBranch {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? RepositoryId.fromJSON(object.repositoryId) : undefined,
      branch: isSet(object.branch) ? MsgSetBranch_Branch.fromJSON(object.branch) : undefined,
    };
  },

  toJSON(message: MsgSetBranch): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined
      && (obj.repositoryId = message.repositoryId ? RepositoryId.toJSON(message.repositoryId) : undefined);
    message.branch !== undefined
      && (obj.branch = message.branch ? MsgSetBranch_Branch.toJSON(message.branch) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetBranch>, I>>(object: I): MsgSetBranch {
    const message = createBaseMsgSetBranch();
    message.creator = object.creator ?? "";
    message.repositoryId = (object.repositoryId !== undefined && object.repositoryId !== null)
      ? RepositoryId.fromPartial(object.repositoryId)
      : undefined;
    message.branch = (object.branch !== undefined && object.branch !== null)
      ? MsgSetBranch_Branch.fromPartial(object.branch)
      : undefined;
    return message;
  },
};

function createBaseMsgSetBranch_Branch(): MsgSetBranch_Branch {
  return { name: "", sha: "" };
}

export const MsgSetBranch_Branch = {
  encode(message: MsgSetBranch_Branch, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.sha !== "") {
      writer.uint32(18).string(message.sha);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetBranch_Branch {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetBranch_Branch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.sha = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetBranch_Branch {
    return { name: isSet(object.name) ? String(object.name) : "", sha: isSet(object.sha) ? String(object.sha) : "" };
  },

  toJSON(message: MsgSetBranch_Branch): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.sha !== undefined && (obj.sha = message.sha);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetBranch_Branch>, I>>(object: I): MsgSetBranch_Branch {
    const message = createBaseMsgSetBranch_Branch();
    message.name = object.name ?? "";
    message.sha = object.sha ?? "";
    return message;
  },
};

function createBaseMsgSetBranchResponse(): MsgSetBranchResponse {
  return {};
}

export const MsgSetBranchResponse = {
  encode(_: MsgSetBranchResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetBranchResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetBranchResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgSetBranchResponse {
    return {};
  },

  toJSON(_: MsgSetBranchResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetBranchResponse>, I>>(_: I): MsgSetBranchResponse {
    const message = createBaseMsgSetBranchResponse();
    return message;
  },
};

function createBaseMsgSetDefaultBranch(): MsgSetDefaultBranch {
  return { creator: "", repositoryId: undefined, branch: "" };
}

export const MsgSetDefaultBranch = {
  encode(message: MsgSetDefaultBranch, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
    }
    if (message.branch !== "") {
      writer.uint32(26).string(message.branch);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetDefaultBranch {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetDefaultBranch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = RepositoryId.decode(reader, reader.uint32());
          break;
        case 3:
          message.branch = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetDefaultBranch {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? RepositoryId.fromJSON(object.repositoryId) : undefined,
      branch: isSet(object.branch) ? String(object.branch) : "",
    };
  },

  toJSON(message: MsgSetDefaultBranch): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined
      && (obj.repositoryId = message.repositoryId ? RepositoryId.toJSON(message.repositoryId) : undefined);
    message.branch !== undefined && (obj.branch = message.branch);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetDefaultBranch>, I>>(object: I): MsgSetDefaultBranch {
    const message = createBaseMsgSetDefaultBranch();
    message.creator = object.creator ?? "";
    message.repositoryId = (object.repositoryId !== undefined && object.repositoryId !== null)
      ? RepositoryId.fromPartial(object.repositoryId)
      : undefined;
    message.branch = object.branch ?? "";
    return message;
  },
};

function createBaseMsgSetDefaultBranchResponse(): MsgSetDefaultBranchResponse {
  return {};
}

export const MsgSetDefaultBranchResponse = {
  encode(_: MsgSetDefaultBranchResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetDefaultBranchResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetDefaultBranchResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgSetDefaultBranchResponse {
    return {};
  },

  toJSON(_: MsgSetDefaultBranchResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetDefaultBranchResponse>, I>>(_: I): MsgSetDefaultBranchResponse {
    const message = createBaseMsgSetDefaultBranchResponse();
    return message;
  },
};

function createBaseMsgMultiSetBranch(): MsgMultiSetBranch {
  return { creator: "", repositoryId: undefined, branches: [] };
}

export const MsgMultiSetBranch = {
  encode(message: MsgMultiSetBranch, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.branches) {
      MsgMultiSetBranch_Branch.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMultiSetBranch {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMultiSetBranch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = RepositoryId.decode(reader, reader.uint32());
          break;
        case 3:
          message.branches.push(MsgMultiSetBranch_Branch.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgMultiSetBranch {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? RepositoryId.fromJSON(object.repositoryId) : undefined,
      branches: Array.isArray(object?.branches)
        ? object.branches.map((e: any) => MsgMultiSetBranch_Branch.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgMultiSetBranch): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined
      && (obj.repositoryId = message.repositoryId ? RepositoryId.toJSON(message.repositoryId) : undefined);
    if (message.branches) {
      obj.branches = message.branches.map((e) => e ? MsgMultiSetBranch_Branch.toJSON(e) : undefined);
    } else {
      obj.branches = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgMultiSetBranch>, I>>(object: I): MsgMultiSetBranch {
    const message = createBaseMsgMultiSetBranch();
    message.creator = object.creator ?? "";
    message.repositoryId = (object.repositoryId !== undefined && object.repositoryId !== null)
      ? RepositoryId.fromPartial(object.repositoryId)
      : undefined;
    message.branches = object.branches?.map((e) => MsgMultiSetBranch_Branch.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgMultiSetBranch_Branch(): MsgMultiSetBranch_Branch {
  return { name: "", sha: "" };
}

export const MsgMultiSetBranch_Branch = {
  encode(message: MsgMultiSetBranch_Branch, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.sha !== "") {
      writer.uint32(18).string(message.sha);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMultiSetBranch_Branch {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMultiSetBranch_Branch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.sha = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgMultiSetBranch_Branch {
    return { name: isSet(object.name) ? String(object.name) : "", sha: isSet(object.sha) ? String(object.sha) : "" };
  },

  toJSON(message: MsgMultiSetBranch_Branch): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.sha !== undefined && (obj.sha = message.sha);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgMultiSetBranch_Branch>, I>>(object: I): MsgMultiSetBranch_Branch {
    const message = createBaseMsgMultiSetBranch_Branch();
    message.name = object.name ?? "";
    message.sha = object.sha ?? "";
    return message;
  },
};

function createBaseMsgMultiSetBranchResponse(): MsgMultiSetBranchResponse {
  return {};
}

export const MsgMultiSetBranchResponse = {
  encode(_: MsgMultiSetBranchResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMultiSetBranchResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMultiSetBranchResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgMultiSetBranchResponse {
    return {};
  },

  toJSON(_: MsgMultiSetBranchResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgMultiSetBranchResponse>, I>>(_: I): MsgMultiSetBranchResponse {
    const message = createBaseMsgMultiSetBranchResponse();
    return message;
  },
};

function createBaseMsgDeleteBranch(): MsgDeleteBranch {
  return { creator: "", repositoryId: undefined, branch: "" };
}

export const MsgDeleteBranch = {
  encode(message: MsgDeleteBranch, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
    }
    if (message.branch !== "") {
      writer.uint32(26).string(message.branch);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteBranch {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteBranch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = RepositoryId.decode(reader, reader.uint32());
          break;
        case 3:
          message.branch = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteBranch {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? RepositoryId.fromJSON(object.repositoryId) : undefined,
      branch: isSet(object.branch) ? String(object.branch) : "",
    };
  },

  toJSON(message: MsgDeleteBranch): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined
      && (obj.repositoryId = message.repositoryId ? RepositoryId.toJSON(message.repositoryId) : undefined);
    message.branch !== undefined && (obj.branch = message.branch);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteBranch>, I>>(object: I): MsgDeleteBranch {
    const message = createBaseMsgDeleteBranch();
    message.creator = object.creator ?? "";
    message.repositoryId = (object.repositoryId !== undefined && object.repositoryId !== null)
      ? RepositoryId.fromPartial(object.repositoryId)
      : undefined;
    message.branch = object.branch ?? "";
    return message;
  },
};

function createBaseMsgDeleteBranchResponse(): MsgDeleteBranchResponse {
  return {};
}

export const MsgDeleteBranchResponse = {
  encode(_: MsgDeleteBranchResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteBranchResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteBranchResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgDeleteBranchResponse {
    return {};
  },

  toJSON(_: MsgDeleteBranchResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteBranchResponse>, I>>(_: I): MsgDeleteBranchResponse {
    const message = createBaseMsgDeleteBranchResponse();
    return message;
  },
};

function createBaseMsgMultiDeleteBranch(): MsgMultiDeleteBranch {
  return { creator: "", repositoryId: undefined, branches: [] };
}

export const MsgMultiDeleteBranch = {
  encode(message: MsgMultiDeleteBranch, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.branches) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMultiDeleteBranch {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMultiDeleteBranch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = RepositoryId.decode(reader, reader.uint32());
          break;
        case 3:
          message.branches.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgMultiDeleteBranch {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? RepositoryId.fromJSON(object.repositoryId) : undefined,
      branches: Array.isArray(object?.branches) ? object.branches.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: MsgMultiDeleteBranch): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined
      && (obj.repositoryId = message.repositoryId ? RepositoryId.toJSON(message.repositoryId) : undefined);
    if (message.branches) {
      obj.branches = message.branches.map((e) => e);
    } else {
      obj.branches = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgMultiDeleteBranch>, I>>(object: I): MsgMultiDeleteBranch {
    const message = createBaseMsgMultiDeleteBranch();
    message.creator = object.creator ?? "";
    message.repositoryId = (object.repositoryId !== undefined && object.repositoryId !== null)
      ? RepositoryId.fromPartial(object.repositoryId)
      : undefined;
    message.branches = object.branches?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgMultiDeleteBranchResponse(): MsgMultiDeleteBranchResponse {
  return {};
}

export const MsgMultiDeleteBranchResponse = {
  encode(_: MsgMultiDeleteBranchResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMultiDeleteBranchResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMultiDeleteBranchResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgMultiDeleteBranchResponse {
    return {};
  },

  toJSON(_: MsgMultiDeleteBranchResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgMultiDeleteBranchResponse>, I>>(_: I): MsgMultiDeleteBranchResponse {
    const message = createBaseMsgMultiDeleteBranchResponse();
    return message;
  },
};

function createBaseMsgSetTag(): MsgSetTag {
  return { creator: "", repositoryId: undefined, tag: undefined };
}

export const MsgSetTag = {
  encode(message: MsgSetTag, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
    }
    if (message.tag !== undefined) {
      MsgSetTag_Tag.encode(message.tag, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetTag {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetTag();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = RepositoryId.decode(reader, reader.uint32());
          break;
        case 3:
          message.tag = MsgSetTag_Tag.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetTag {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? RepositoryId.fromJSON(object.repositoryId) : undefined,
      tag: isSet(object.tag) ? MsgSetTag_Tag.fromJSON(object.tag) : undefined,
    };
  },

  toJSON(message: MsgSetTag): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined
      && (obj.repositoryId = message.repositoryId ? RepositoryId.toJSON(message.repositoryId) : undefined);
    message.tag !== undefined && (obj.tag = message.tag ? MsgSetTag_Tag.toJSON(message.tag) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetTag>, I>>(object: I): MsgSetTag {
    const message = createBaseMsgSetTag();
    message.creator = object.creator ?? "";
    message.repositoryId = (object.repositoryId !== undefined && object.repositoryId !== null)
      ? RepositoryId.fromPartial(object.repositoryId)
      : undefined;
    message.tag = (object.tag !== undefined && object.tag !== null) ? MsgSetTag_Tag.fromPartial(object.tag) : undefined;
    return message;
  },
};

function createBaseMsgSetTag_Tag(): MsgSetTag_Tag {
  return { name: "", sha: "" };
}

export const MsgSetTag_Tag = {
  encode(message: MsgSetTag_Tag, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.sha !== "") {
      writer.uint32(18).string(message.sha);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetTag_Tag {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetTag_Tag();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.sha = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetTag_Tag {
    return { name: isSet(object.name) ? String(object.name) : "", sha: isSet(object.sha) ? String(object.sha) : "" };
  },

  toJSON(message: MsgSetTag_Tag): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.sha !== undefined && (obj.sha = message.sha);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetTag_Tag>, I>>(object: I): MsgSetTag_Tag {
    const message = createBaseMsgSetTag_Tag();
    message.name = object.name ?? "";
    message.sha = object.sha ?? "";
    return message;
  },
};

function createBaseMsgSetTagResponse(): MsgSetTagResponse {
  return {};
}

export const MsgSetTagResponse = {
  encode(_: MsgSetTagResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetTagResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetTagResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgSetTagResponse {
    return {};
  },

  toJSON(_: MsgSetTagResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetTagResponse>, I>>(_: I): MsgSetTagResponse {
    const message = createBaseMsgSetTagResponse();
    return message;
  },
};

function createBaseMsgMultiSetTag(): MsgMultiSetTag {
  return { creator: "", repositoryId: undefined, tags: [] };
}

export const MsgMultiSetTag = {
  encode(message: MsgMultiSetTag, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.tags) {
      MsgMultiSetTag_Tag.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMultiSetTag {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMultiSetTag();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = RepositoryId.decode(reader, reader.uint32());
          break;
        case 3:
          message.tags.push(MsgMultiSetTag_Tag.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgMultiSetTag {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? RepositoryId.fromJSON(object.repositoryId) : undefined,
      tags: Array.isArray(object?.tags) ? object.tags.map((e: any) => MsgMultiSetTag_Tag.fromJSON(e)) : [],
    };
  },

  toJSON(message: MsgMultiSetTag): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined
      && (obj.repositoryId = message.repositoryId ? RepositoryId.toJSON(message.repositoryId) : undefined);
    if (message.tags) {
      obj.tags = message.tags.map((e) => e ? MsgMultiSetTag_Tag.toJSON(e) : undefined);
    } else {
      obj.tags = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgMultiSetTag>, I>>(object: I): MsgMultiSetTag {
    const message = createBaseMsgMultiSetTag();
    message.creator = object.creator ?? "";
    message.repositoryId = (object.repositoryId !== undefined && object.repositoryId !== null)
      ? RepositoryId.fromPartial(object.repositoryId)
      : undefined;
    message.tags = object.tags?.map((e) => MsgMultiSetTag_Tag.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgMultiSetTag_Tag(): MsgMultiSetTag_Tag {
  return { name: "", sha: "" };
}

export const MsgMultiSetTag_Tag = {
  encode(message: MsgMultiSetTag_Tag, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.sha !== "") {
      writer.uint32(18).string(message.sha);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMultiSetTag_Tag {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMultiSetTag_Tag();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.sha = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgMultiSetTag_Tag {
    return { name: isSet(object.name) ? String(object.name) : "", sha: isSet(object.sha) ? String(object.sha) : "" };
  },

  toJSON(message: MsgMultiSetTag_Tag): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.sha !== undefined && (obj.sha = message.sha);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgMultiSetTag_Tag>, I>>(object: I): MsgMultiSetTag_Tag {
    const message = createBaseMsgMultiSetTag_Tag();
    message.name = object.name ?? "";
    message.sha = object.sha ?? "";
    return message;
  },
};

function createBaseMsgMultiSetTagResponse(): MsgMultiSetTagResponse {
  return {};
}

export const MsgMultiSetTagResponse = {
  encode(_: MsgMultiSetTagResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMultiSetTagResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMultiSetTagResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgMultiSetTagResponse {
    return {};
  },

  toJSON(_: MsgMultiSetTagResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgMultiSetTagResponse>, I>>(_: I): MsgMultiSetTagResponse {
    const message = createBaseMsgMultiSetTagResponse();
    return message;
  },
};

function createBaseMsgDeleteTag(): MsgDeleteTag {
  return { creator: "", repositoryId: undefined, tag: "" };
}

export const MsgDeleteTag = {
  encode(message: MsgDeleteTag, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
    }
    if (message.tag !== "") {
      writer.uint32(26).string(message.tag);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteTag {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteTag();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = RepositoryId.decode(reader, reader.uint32());
          break;
        case 3:
          message.tag = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteTag {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? RepositoryId.fromJSON(object.repositoryId) : undefined,
      tag: isSet(object.tag) ? String(object.tag) : "",
    };
  },

  toJSON(message: MsgDeleteTag): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined
      && (obj.repositoryId = message.repositoryId ? RepositoryId.toJSON(message.repositoryId) : undefined);
    message.tag !== undefined && (obj.tag = message.tag);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteTag>, I>>(object: I): MsgDeleteTag {
    const message = createBaseMsgDeleteTag();
    message.creator = object.creator ?? "";
    message.repositoryId = (object.repositoryId !== undefined && object.repositoryId !== null)
      ? RepositoryId.fromPartial(object.repositoryId)
      : undefined;
    message.tag = object.tag ?? "";
    return message;
  },
};

function createBaseMsgDeleteTagResponse(): MsgDeleteTagResponse {
  return {};
}

export const MsgDeleteTagResponse = {
  encode(_: MsgDeleteTagResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteTagResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteTagResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgDeleteTagResponse {
    return {};
  },

  toJSON(_: MsgDeleteTagResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteTagResponse>, I>>(_: I): MsgDeleteTagResponse {
    const message = createBaseMsgDeleteTagResponse();
    return message;
  },
};

function createBaseMsgMultiDeleteTag(): MsgMultiDeleteTag {
  return { creator: "", repositoryId: undefined, tags: [] };
}

export const MsgMultiDeleteTag = {
  encode(message: MsgMultiDeleteTag, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.tags) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMultiDeleteTag {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMultiDeleteTag();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = RepositoryId.decode(reader, reader.uint32());
          break;
        case 3:
          message.tags.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgMultiDeleteTag {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? RepositoryId.fromJSON(object.repositoryId) : undefined,
      tags: Array.isArray(object?.tags) ? object.tags.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: MsgMultiDeleteTag): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined
      && (obj.repositoryId = message.repositoryId ? RepositoryId.toJSON(message.repositoryId) : undefined);
    if (message.tags) {
      obj.tags = message.tags.map((e) => e);
    } else {
      obj.tags = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgMultiDeleteTag>, I>>(object: I): MsgMultiDeleteTag {
    const message = createBaseMsgMultiDeleteTag();
    message.creator = object.creator ?? "";
    message.repositoryId = (object.repositoryId !== undefined && object.repositoryId !== null)
      ? RepositoryId.fromPartial(object.repositoryId)
      : undefined;
    message.tags = object.tags?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgMultiDeleteTagResponse(): MsgMultiDeleteTagResponse {
  return {};
}

export const MsgMultiDeleteTagResponse = {
  encode(_: MsgMultiDeleteTagResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMultiDeleteTagResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMultiDeleteTagResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgMultiDeleteTagResponse {
    return {};
  },

  toJSON(_: MsgMultiDeleteTagResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgMultiDeleteTagResponse>, I>>(_: I): MsgMultiDeleteTagResponse {
    const message = createBaseMsgMultiDeleteTagResponse();
    return message;
  },
};

function createBaseMsgAddMember(): MsgAddMember {
  return { creator: "", daoId: "", userId: "", role: 0 };
}

export const MsgAddMember = {
  encode(message: MsgAddMember, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.daoId !== "") {
      writer.uint32(18).string(message.daoId);
    }
    if (message.userId !== "") {
      writer.uint32(26).string(message.userId);
    }
    if (message.role !== 0) {
      writer.uint32(32).int32(message.role);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddMember {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddMember();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.daoId = reader.string();
          break;
        case 3:
          message.userId = reader.string();
          break;
        case 4:
          message.role = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAddMember {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      daoId: isSet(object.daoId) ? String(object.daoId) : "",
      userId: isSet(object.userId) ? String(object.userId) : "",
      role: isSet(object.role) ? memberRoleFromJSON(object.role) : 0,
    };
  },

  toJSON(message: MsgAddMember): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.daoId !== undefined && (obj.daoId = message.daoId);
    message.userId !== undefined && (obj.userId = message.userId);
    message.role !== undefined && (obj.role = memberRoleToJSON(message.role));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddMember>, I>>(object: I): MsgAddMember {
    const message = createBaseMsgAddMember();
    message.creator = object.creator ?? "";
    message.daoId = object.daoId ?? "";
    message.userId = object.userId ?? "";
    message.role = object.role ?? 0;
    return message;
  },
};

function createBaseMsgAddMemberResponse(): MsgAddMemberResponse {
  return {};
}

export const MsgAddMemberResponse = {
  encode(_: MsgAddMemberResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddMemberResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddMemberResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgAddMemberResponse {
    return {};
  },

  toJSON(_: MsgAddMemberResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddMemberResponse>, I>>(_: I): MsgAddMemberResponse {
    const message = createBaseMsgAddMemberResponse();
    return message;
  },
};

function createBaseMsgUpdateMemberRole(): MsgUpdateMemberRole {
  return { creator: "", daoId: "", userId: "", role: 0 };
}

export const MsgUpdateMemberRole = {
  encode(message: MsgUpdateMemberRole, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.daoId !== "") {
      writer.uint32(18).string(message.daoId);
    }
    if (message.userId !== "") {
      writer.uint32(26).string(message.userId);
    }
    if (message.role !== 0) {
      writer.uint32(32).int32(message.role);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateMemberRole {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateMemberRole();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.daoId = reader.string();
          break;
        case 3:
          message.userId = reader.string();
          break;
        case 4:
          message.role = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateMemberRole {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      daoId: isSet(object.daoId) ? String(object.daoId) : "",
      userId: isSet(object.userId) ? String(object.userId) : "",
      role: isSet(object.role) ? memberRoleFromJSON(object.role) : 0,
    };
  },

  toJSON(message: MsgUpdateMemberRole): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.daoId !== undefined && (obj.daoId = message.daoId);
    message.userId !== undefined && (obj.userId = message.userId);
    message.role !== undefined && (obj.role = memberRoleToJSON(message.role));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateMemberRole>, I>>(object: I): MsgUpdateMemberRole {
    const message = createBaseMsgUpdateMemberRole();
    message.creator = object.creator ?? "";
    message.daoId = object.daoId ?? "";
    message.userId = object.userId ?? "";
    message.role = object.role ?? 0;
    return message;
  },
};

function createBaseMsgUpdateMemberRoleResponse(): MsgUpdateMemberRoleResponse {
  return {};
}

export const MsgUpdateMemberRoleResponse = {
  encode(_: MsgUpdateMemberRoleResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateMemberRoleResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateMemberRoleResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateMemberRoleResponse {
    return {};
  },

  toJSON(_: MsgUpdateMemberRoleResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateMemberRoleResponse>, I>>(_: I): MsgUpdateMemberRoleResponse {
    const message = createBaseMsgUpdateMemberRoleResponse();
    return message;
  },
};

function createBaseMsgRemoveMember(): MsgRemoveMember {
  return { creator: "", daoId: "", userId: "" };
}

export const MsgRemoveMember = {
  encode(message: MsgRemoveMember, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.daoId !== "") {
      writer.uint32(18).string(message.daoId);
    }
    if (message.userId !== "") {
      writer.uint32(26).string(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveMember {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveMember();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.daoId = reader.string();
          break;
        case 3:
          message.userId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRemoveMember {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      daoId: isSet(object.daoId) ? String(object.daoId) : "",
      userId: isSet(object.userId) ? String(object.userId) : "",
    };
  },

  toJSON(message: MsgRemoveMember): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.daoId !== undefined && (obj.daoId = message.daoId);
    message.userId !== undefined && (obj.userId = message.userId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRemoveMember>, I>>(object: I): MsgRemoveMember {
    const message = createBaseMsgRemoveMember();
    message.creator = object.creator ?? "";
    message.daoId = object.daoId ?? "";
    message.userId = object.userId ?? "";
    return message;
  },
};

function createBaseMsgRemoveMemberResponse(): MsgRemoveMemberResponse {
  return {};
}

export const MsgRemoveMemberResponse = {
  encode(_: MsgRemoveMemberResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveMemberResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveMemberResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgRemoveMemberResponse {
    return {};
  },

  toJSON(_: MsgRemoveMemberResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRemoveMemberResponse>, I>>(_: I): MsgRemoveMemberResponse {
    const message = createBaseMsgRemoveMemberResponse();
    return message;
  },
};

function createBaseMsgCreateBounty(): MsgCreateBounty {
  return { creator: "", amount: [], expiry: 0, repositoryId: 0, parentIid: 0, parent: 0 };
}

export const MsgCreateBounty = {
  encode(message: MsgCreateBounty, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.expiry !== 0) {
      writer.uint32(24).int64(message.expiry);
    }
    if (message.repositoryId !== 0) {
      writer.uint32(32).uint64(message.repositoryId);
    }
    if (message.parentIid !== 0) {
      writer.uint32(40).uint64(message.parentIid);
    }
    if (message.parent !== 0) {
      writer.uint32(48).int32(message.parent);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateBounty {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateBounty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.amount.push(Coin.decode(reader, reader.uint32()));
          break;
        case 3:
          message.expiry = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.parentIid = longToNumber(reader.uint64() as Long);
          break;
        case 6:
          message.parent = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateBounty {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      amount: Array.isArray(object?.amount) ? object.amount.map((e: any) => Coin.fromJSON(e)) : [],
      expiry: isSet(object.expiry) ? Number(object.expiry) : 0,
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      parentIid: isSet(object.parentIid) ? Number(object.parentIid) : 0,
      parent: isSet(object.parent) ? bountyParentFromJSON(object.parent) : 0,
    };
  },

  toJSON(message: MsgCreateBounty): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    if (message.amount) {
      obj.amount = message.amount.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.amount = [];
    }
    message.expiry !== undefined && (obj.expiry = Math.round(message.expiry));
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.parentIid !== undefined && (obj.parentIid = Math.round(message.parentIid));
    message.parent !== undefined && (obj.parent = bountyParentToJSON(message.parent));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateBounty>, I>>(object: I): MsgCreateBounty {
    const message = createBaseMsgCreateBounty();
    message.creator = object.creator ?? "";
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    message.expiry = object.expiry ?? 0;
    message.repositoryId = object.repositoryId ?? 0;
    message.parentIid = object.parentIid ?? 0;
    message.parent = object.parent ?? 0;
    return message;
  },
};

function createBaseMsgCreateBountyResponse(): MsgCreateBountyResponse {
  return { id: 0 };
}

export const MsgCreateBountyResponse = {
  encode(message: MsgCreateBountyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateBountyResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateBountyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateBountyResponse {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: MsgCreateBountyResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateBountyResponse>, I>>(object: I): MsgCreateBountyResponse {
    const message = createBaseMsgCreateBountyResponse();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseMsgUpdateBountyExpiry(): MsgUpdateBountyExpiry {
  return { creator: "", id: 0, expiry: 0 };
}

export const MsgUpdateBountyExpiry = {
  encode(message: MsgUpdateBountyExpiry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.expiry !== 0) {
      writer.uint32(24).int64(message.expiry);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateBountyExpiry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateBountyExpiry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.expiry = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateBountyExpiry {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
      expiry: isSet(object.expiry) ? Number(object.expiry) : 0,
    };
  },

  toJSON(message: MsgUpdateBountyExpiry): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.expiry !== undefined && (obj.expiry = Math.round(message.expiry));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateBountyExpiry>, I>>(object: I): MsgUpdateBountyExpiry {
    const message = createBaseMsgUpdateBountyExpiry();
    message.creator = object.creator ?? "";
    message.id = object.id ?? 0;
    message.expiry = object.expiry ?? 0;
    return message;
  },
};

function createBaseMsgUpdateBountyExpiryResponse(): MsgUpdateBountyExpiryResponse {
  return {};
}

export const MsgUpdateBountyExpiryResponse = {
  encode(_: MsgUpdateBountyExpiryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateBountyExpiryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateBountyExpiryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateBountyExpiryResponse {
    return {};
  },

  toJSON(_: MsgUpdateBountyExpiryResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateBountyExpiryResponse>, I>>(_: I): MsgUpdateBountyExpiryResponse {
    const message = createBaseMsgUpdateBountyExpiryResponse();
    return message;
  },
};

function createBaseMsgCloseBounty(): MsgCloseBounty {
  return { creator: "", id: 0 };
}

export const MsgCloseBounty = {
  encode(message: MsgCloseBounty, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCloseBounty {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCloseBounty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCloseBounty {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
    };
  },

  toJSON(message: MsgCloseBounty): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCloseBounty>, I>>(object: I): MsgCloseBounty {
    const message = createBaseMsgCloseBounty();
    message.creator = object.creator ?? "";
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseMsgCloseBountyResponse(): MsgCloseBountyResponse {
  return {};
}

export const MsgCloseBountyResponse = {
  encode(_: MsgCloseBountyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCloseBountyResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCloseBountyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgCloseBountyResponse {
    return {};
  },

  toJSON(_: MsgCloseBountyResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCloseBountyResponse>, I>>(_: I): MsgCloseBountyResponse {
    const message = createBaseMsgCloseBountyResponse();
    return message;
  },
};

function createBaseMsgDeleteBounty(): MsgDeleteBounty {
  return { creator: "", id: 0 };
}

export const MsgDeleteBounty = {
  encode(message: MsgDeleteBounty, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteBounty {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteBounty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteBounty {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
    };
  },

  toJSON(message: MsgDeleteBounty): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteBounty>, I>>(object: I): MsgDeleteBounty {
    const message = createBaseMsgDeleteBounty();
    message.creator = object.creator ?? "";
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseMsgDeleteBountyResponse(): MsgDeleteBountyResponse {
  return {};
}

export const MsgDeleteBountyResponse = {
  encode(_: MsgDeleteBountyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteBountyResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteBountyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgDeleteBountyResponse {
    return {};
  },

  toJSON(_: MsgDeleteBountyResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteBountyResponse>, I>>(_: I): MsgDeleteBountyResponse {
    const message = createBaseMsgDeleteBountyResponse();
    return message;
  },
};

function createBaseMsgCreateRelease(): MsgCreateRelease {
  return {
    creator: "",
    repositoryId: undefined,
    tagName: "",
    target: "",
    name: "",
    description: "",
    attachments: "",
    draft: false,
    preRelease: false,
    isTag: false,
  };
}

export const MsgCreateRelease = {
  encode(message: MsgCreateRelease, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
    }
    if (message.tagName !== "") {
      writer.uint32(26).string(message.tagName);
    }
    if (message.target !== "") {
      writer.uint32(34).string(message.target);
    }
    if (message.name !== "") {
      writer.uint32(42).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(50).string(message.description);
    }
    if (message.attachments !== "") {
      writer.uint32(58).string(message.attachments);
    }
    if (message.draft === true) {
      writer.uint32(64).bool(message.draft);
    }
    if (message.preRelease === true) {
      writer.uint32(72).bool(message.preRelease);
    }
    if (message.isTag === true) {
      writer.uint32(80).bool(message.isTag);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateRelease {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateRelease();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = RepositoryId.decode(reader, reader.uint32());
          break;
        case 3:
          message.tagName = reader.string();
          break;
        case 4:
          message.target = reader.string();
          break;
        case 5:
          message.name = reader.string();
          break;
        case 6:
          message.description = reader.string();
          break;
        case 7:
          message.attachments = reader.string();
          break;
        case 8:
          message.draft = reader.bool();
          break;
        case 9:
          message.preRelease = reader.bool();
          break;
        case 10:
          message.isTag = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateRelease {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? RepositoryId.fromJSON(object.repositoryId) : undefined,
      tagName: isSet(object.tagName) ? String(object.tagName) : "",
      target: isSet(object.target) ? String(object.target) : "",
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
      attachments: isSet(object.attachments) ? String(object.attachments) : "",
      draft: isSet(object.draft) ? Boolean(object.draft) : false,
      preRelease: isSet(object.preRelease) ? Boolean(object.preRelease) : false,
      isTag: isSet(object.isTag) ? Boolean(object.isTag) : false,
    };
  },

  toJSON(message: MsgCreateRelease): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined
      && (obj.repositoryId = message.repositoryId ? RepositoryId.toJSON(message.repositoryId) : undefined);
    message.tagName !== undefined && (obj.tagName = message.tagName);
    message.target !== undefined && (obj.target = message.target);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.attachments !== undefined && (obj.attachments = message.attachments);
    message.draft !== undefined && (obj.draft = message.draft);
    message.preRelease !== undefined && (obj.preRelease = message.preRelease);
    message.isTag !== undefined && (obj.isTag = message.isTag);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateRelease>, I>>(object: I): MsgCreateRelease {
    const message = createBaseMsgCreateRelease();
    message.creator = object.creator ?? "";
    message.repositoryId = (object.repositoryId !== undefined && object.repositoryId !== null)
      ? RepositoryId.fromPartial(object.repositoryId)
      : undefined;
    message.tagName = object.tagName ?? "";
    message.target = object.target ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.attachments = object.attachments ?? "";
    message.draft = object.draft ?? false;
    message.preRelease = object.preRelease ?? false;
    message.isTag = object.isTag ?? false;
    return message;
  },
};

function createBaseMsgCreateReleaseResponse(): MsgCreateReleaseResponse {
  return { id: 0 };
}

export const MsgCreateReleaseResponse = {
  encode(message: MsgCreateReleaseResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateReleaseResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateReleaseResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateReleaseResponse {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: MsgCreateReleaseResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateReleaseResponse>, I>>(object: I): MsgCreateReleaseResponse {
    const message = createBaseMsgCreateReleaseResponse();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseMsgUpdateRelease(): MsgUpdateRelease {
  return {
    creator: "",
    id: 0,
    tagName: "",
    target: "",
    name: "",
    description: "",
    attachments: "",
    draft: false,
    preRelease: false,
    isTag: false,
  };
}

export const MsgUpdateRelease = {
  encode(message: MsgUpdateRelease, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.tagName !== "") {
      writer.uint32(26).string(message.tagName);
    }
    if (message.target !== "") {
      writer.uint32(34).string(message.target);
    }
    if (message.name !== "") {
      writer.uint32(42).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(50).string(message.description);
    }
    if (message.attachments !== "") {
      writer.uint32(58).string(message.attachments);
    }
    if (message.draft === true) {
      writer.uint32(64).bool(message.draft);
    }
    if (message.preRelease === true) {
      writer.uint32(72).bool(message.preRelease);
    }
    if (message.isTag === true) {
      writer.uint32(80).bool(message.isTag);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateRelease {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateRelease();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.tagName = reader.string();
          break;
        case 4:
          message.target = reader.string();
          break;
        case 5:
          message.name = reader.string();
          break;
        case 6:
          message.description = reader.string();
          break;
        case 7:
          message.attachments = reader.string();
          break;
        case 8:
          message.draft = reader.bool();
          break;
        case 9:
          message.preRelease = reader.bool();
          break;
        case 10:
          message.isTag = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateRelease {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
      tagName: isSet(object.tagName) ? String(object.tagName) : "",
      target: isSet(object.target) ? String(object.target) : "",
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
      attachments: isSet(object.attachments) ? String(object.attachments) : "",
      draft: isSet(object.draft) ? Boolean(object.draft) : false,
      preRelease: isSet(object.preRelease) ? Boolean(object.preRelease) : false,
      isTag: isSet(object.isTag) ? Boolean(object.isTag) : false,
    };
  },

  toJSON(message: MsgUpdateRelease): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.tagName !== undefined && (obj.tagName = message.tagName);
    message.target !== undefined && (obj.target = message.target);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.attachments !== undefined && (obj.attachments = message.attachments);
    message.draft !== undefined && (obj.draft = message.draft);
    message.preRelease !== undefined && (obj.preRelease = message.preRelease);
    message.isTag !== undefined && (obj.isTag = message.isTag);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateRelease>, I>>(object: I): MsgUpdateRelease {
    const message = createBaseMsgUpdateRelease();
    message.creator = object.creator ?? "";
    message.id = object.id ?? 0;
    message.tagName = object.tagName ?? "";
    message.target = object.target ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.attachments = object.attachments ?? "";
    message.draft = object.draft ?? false;
    message.preRelease = object.preRelease ?? false;
    message.isTag = object.isTag ?? false;
    return message;
  },
};

function createBaseMsgUpdateReleaseResponse(): MsgUpdateReleaseResponse {
  return {};
}

export const MsgUpdateReleaseResponse = {
  encode(_: MsgUpdateReleaseResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateReleaseResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateReleaseResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateReleaseResponse {
    return {};
  },

  toJSON(_: MsgUpdateReleaseResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateReleaseResponse>, I>>(_: I): MsgUpdateReleaseResponse {
    const message = createBaseMsgUpdateReleaseResponse();
    return message;
  },
};

function createBaseMsgDeleteRelease(): MsgDeleteRelease {
  return { creator: "", id: 0 };
}

export const MsgDeleteRelease = {
  encode(message: MsgDeleteRelease, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteRelease {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteRelease();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteRelease {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
    };
  },

  toJSON(message: MsgDeleteRelease): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteRelease>, I>>(object: I): MsgDeleteRelease {
    const message = createBaseMsgDeleteRelease();
    message.creator = object.creator ?? "";
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseMsgDeleteReleaseResponse(): MsgDeleteReleaseResponse {
  return {};
}

export const MsgDeleteReleaseResponse = {
  encode(_: MsgDeleteReleaseResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteReleaseResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteReleaseResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgDeleteReleaseResponse {
    return {};
  },

  toJSON(_: MsgDeleteReleaseResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteReleaseResponse>, I>>(_: I): MsgDeleteReleaseResponse {
    const message = createBaseMsgDeleteReleaseResponse();
    return message;
  },
};

function createBaseMsgCreatePullRequest(): MsgCreatePullRequest {
  return {
    creator: "",
    title: "",
    description: "",
    headBranch: "",
    headRepositoryId: undefined,
    baseBranch: "",
    baseRepositoryId: undefined,
    reviewers: [],
    assignees: [],
    labelIds: [],
    issueIids: [],
  };
}

export const MsgCreatePullRequest = {
  encode(message: MsgCreatePullRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.headBranch !== "") {
      writer.uint32(34).string(message.headBranch);
    }
    if (message.headRepositoryId !== undefined) {
      RepositoryId.encode(message.headRepositoryId, writer.uint32(42).fork()).ldelim();
    }
    if (message.baseBranch !== "") {
      writer.uint32(50).string(message.baseBranch);
    }
    if (message.baseRepositoryId !== undefined) {
      RepositoryId.encode(message.baseRepositoryId, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.reviewers) {
      writer.uint32(66).string(v!);
    }
    for (const v of message.assignees) {
      writer.uint32(74).string(v!);
    }
    writer.uint32(82).fork();
    for (const v of message.labelIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    writer.uint32(90).fork();
    for (const v of message.issueIids) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreatePullRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreatePullRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.title = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        case 4:
          message.headBranch = reader.string();
          break;
        case 5:
          message.headRepositoryId = RepositoryId.decode(reader, reader.uint32());
          break;
        case 6:
          message.baseBranch = reader.string();
          break;
        case 7:
          message.baseRepositoryId = RepositoryId.decode(reader, reader.uint32());
          break;
        case 8:
          message.reviewers.push(reader.string());
          break;
        case 9:
          message.assignees.push(reader.string());
          break;
        case 10:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.labelIds.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.labelIds.push(longToNumber(reader.uint64() as Long));
          }
          break;
        case 11:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.issueIids.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.issueIids.push(longToNumber(reader.uint64() as Long));
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreatePullRequest {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      headBranch: isSet(object.headBranch) ? String(object.headBranch) : "",
      headRepositoryId: isSet(object.headRepositoryId) ? RepositoryId.fromJSON(object.headRepositoryId) : undefined,
      baseBranch: isSet(object.baseBranch) ? String(object.baseBranch) : "",
      baseRepositoryId: isSet(object.baseRepositoryId) ? RepositoryId.fromJSON(object.baseRepositoryId) : undefined,
      reviewers: Array.isArray(object?.reviewers) ? object.reviewers.map((e: any) => String(e)) : [],
      assignees: Array.isArray(object?.assignees) ? object.assignees.map((e: any) => String(e)) : [],
      labelIds: Array.isArray(object?.labelIds) ? object.labelIds.map((e: any) => Number(e)) : [],
      issueIids: Array.isArray(object?.issueIids) ? object.issueIids.map((e: any) => Number(e)) : [],
    };
  },

  toJSON(message: MsgCreatePullRequest): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.headBranch !== undefined && (obj.headBranch = message.headBranch);
    message.headRepositoryId !== undefined
      && (obj.headRepositoryId = message.headRepositoryId ? RepositoryId.toJSON(message.headRepositoryId) : undefined);
    message.baseBranch !== undefined && (obj.baseBranch = message.baseBranch);
    message.baseRepositoryId !== undefined
      && (obj.baseRepositoryId = message.baseRepositoryId ? RepositoryId.toJSON(message.baseRepositoryId) : undefined);
    if (message.reviewers) {
      obj.reviewers = message.reviewers.map((e) => e);
    } else {
      obj.reviewers = [];
    }
    if (message.assignees) {
      obj.assignees = message.assignees.map((e) => e);
    } else {
      obj.assignees = [];
    }
    if (message.labelIds) {
      obj.labelIds = message.labelIds.map((e) => Math.round(e));
    } else {
      obj.labelIds = [];
    }
    if (message.issueIids) {
      obj.issueIids = message.issueIids.map((e) => Math.round(e));
    } else {
      obj.issueIids = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreatePullRequest>, I>>(object: I): MsgCreatePullRequest {
    const message = createBaseMsgCreatePullRequest();
    message.creator = object.creator ?? "";
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.headBranch = object.headBranch ?? "";
    message.headRepositoryId = (object.headRepositoryId !== undefined && object.headRepositoryId !== null)
      ? RepositoryId.fromPartial(object.headRepositoryId)
      : undefined;
    message.baseBranch = object.baseBranch ?? "";
    message.baseRepositoryId = (object.baseRepositoryId !== undefined && object.baseRepositoryId !== null)
      ? RepositoryId.fromPartial(object.baseRepositoryId)
      : undefined;
    message.reviewers = object.reviewers?.map((e) => e) || [];
    message.assignees = object.assignees?.map((e) => e) || [];
    message.labelIds = object.labelIds?.map((e) => e) || [];
    message.issueIids = object.issueIids?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgCreatePullRequestResponse(): MsgCreatePullRequestResponse {
  return { id: 0, iid: 0 };
}

export const MsgCreatePullRequestResponse = {
  encode(message: MsgCreatePullRequestResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.iid !== 0) {
      writer.uint32(16).uint64(message.iid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreatePullRequestResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreatePullRequestResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.iid = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreatePullRequestResponse {
    return { id: isSet(object.id) ? Number(object.id) : 0, iid: isSet(object.iid) ? Number(object.iid) : 0 };
  },

  toJSON(message: MsgCreatePullRequestResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.iid !== undefined && (obj.iid = Math.round(message.iid));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreatePullRequestResponse>, I>>(object: I): MsgCreatePullRequestResponse {
    const message = createBaseMsgCreatePullRequestResponse();
    message.id = object.id ?? 0;
    message.iid = object.iid ?? 0;
    return message;
  },
};

function createBaseMsgUpdatePullRequestTitle(): MsgUpdatePullRequestTitle {
  return { creator: "", repositoryId: 0, iid: 0, title: "" };
}

export const MsgUpdatePullRequestTitle = {
  encode(message: MsgUpdatePullRequestTitle, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== 0) {
      writer.uint32(16).uint64(message.repositoryId);
    }
    if (message.iid !== 0) {
      writer.uint32(24).uint64(message.iid);
    }
    if (message.title !== "") {
      writer.uint32(34).string(message.title);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdatePullRequestTitle {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdatePullRequestTitle();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.iid = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.title = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdatePullRequestTitle {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      iid: isSet(object.iid) ? Number(object.iid) : 0,
      title: isSet(object.title) ? String(object.title) : "",
    };
  },

  toJSON(message: MsgUpdatePullRequestTitle): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.iid !== undefined && (obj.iid = Math.round(message.iid));
    message.title !== undefined && (obj.title = message.title);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdatePullRequestTitle>, I>>(object: I): MsgUpdatePullRequestTitle {
    const message = createBaseMsgUpdatePullRequestTitle();
    message.creator = object.creator ?? "";
    message.repositoryId = object.repositoryId ?? 0;
    message.iid = object.iid ?? 0;
    message.title = object.title ?? "";
    return message;
  },
};

function createBaseMsgUpdatePullRequestTitleResponse(): MsgUpdatePullRequestTitleResponse {
  return {};
}

export const MsgUpdatePullRequestTitleResponse = {
  encode(_: MsgUpdatePullRequestTitleResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdatePullRequestTitleResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdatePullRequestTitleResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdatePullRequestTitleResponse {
    return {};
  },

  toJSON(_: MsgUpdatePullRequestTitleResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdatePullRequestTitleResponse>, I>>(
    _: I,
  ): MsgUpdatePullRequestTitleResponse {
    const message = createBaseMsgUpdatePullRequestTitleResponse();
    return message;
  },
};

function createBaseMsgUpdatePullRequestDescription(): MsgUpdatePullRequestDescription {
  return { creator: "", repositoryId: 0, iid: 0, description: "" };
}

export const MsgUpdatePullRequestDescription = {
  encode(message: MsgUpdatePullRequestDescription, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== 0) {
      writer.uint32(16).uint64(message.repositoryId);
    }
    if (message.iid !== 0) {
      writer.uint32(24).uint64(message.iid);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdatePullRequestDescription {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdatePullRequestDescription();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.iid = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdatePullRequestDescription {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      iid: isSet(object.iid) ? Number(object.iid) : 0,
      description: isSet(object.description) ? String(object.description) : "",
    };
  },

  toJSON(message: MsgUpdatePullRequestDescription): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.iid !== undefined && (obj.iid = Math.round(message.iid));
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdatePullRequestDescription>, I>>(
    object: I,
  ): MsgUpdatePullRequestDescription {
    const message = createBaseMsgUpdatePullRequestDescription();
    message.creator = object.creator ?? "";
    message.repositoryId = object.repositoryId ?? 0;
    message.iid = object.iid ?? 0;
    message.description = object.description ?? "";
    return message;
  },
};

function createBaseMsgUpdatePullRequestDescriptionResponse(): MsgUpdatePullRequestDescriptionResponse {
  return {};
}

export const MsgUpdatePullRequestDescriptionResponse = {
  encode(_: MsgUpdatePullRequestDescriptionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdatePullRequestDescriptionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdatePullRequestDescriptionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdatePullRequestDescriptionResponse {
    return {};
  },

  toJSON(_: MsgUpdatePullRequestDescriptionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdatePullRequestDescriptionResponse>, I>>(
    _: I,
  ): MsgUpdatePullRequestDescriptionResponse {
    const message = createBaseMsgUpdatePullRequestDescriptionResponse();
    return message;
  },
};

function createBaseMsgInvokeMergePullRequest(): MsgInvokeMergePullRequest {
  return { creator: "", repositoryId: 0, iid: 0, provider: "" };
}

export const MsgInvokeMergePullRequest = {
  encode(message: MsgInvokeMergePullRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== 0) {
      writer.uint32(16).uint64(message.repositoryId);
    }
    if (message.iid !== 0) {
      writer.uint32(24).uint64(message.iid);
    }
    if (message.provider !== "") {
      writer.uint32(34).string(message.provider);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgInvokeMergePullRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgInvokeMergePullRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.iid = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.provider = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgInvokeMergePullRequest {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      iid: isSet(object.iid) ? Number(object.iid) : 0,
      provider: isSet(object.provider) ? String(object.provider) : "",
    };
  },

  toJSON(message: MsgInvokeMergePullRequest): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.iid !== undefined && (obj.iid = Math.round(message.iid));
    message.provider !== undefined && (obj.provider = message.provider);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgInvokeMergePullRequest>, I>>(object: I): MsgInvokeMergePullRequest {
    const message = createBaseMsgInvokeMergePullRequest();
    message.creator = object.creator ?? "";
    message.repositoryId = object.repositoryId ?? 0;
    message.iid = object.iid ?? 0;
    message.provider = object.provider ?? "";
    return message;
  },
};

function createBaseMsgInvokeMergePullRequestResponse(): MsgInvokeMergePullRequestResponse {
  return {};
}

export const MsgInvokeMergePullRequestResponse = {
  encode(_: MsgInvokeMergePullRequestResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgInvokeMergePullRequestResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgInvokeMergePullRequestResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgInvokeMergePullRequestResponse {
    return {};
  },

  toJSON(_: MsgInvokeMergePullRequestResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgInvokeMergePullRequestResponse>, I>>(
    _: I,
  ): MsgInvokeMergePullRequestResponse {
    const message = createBaseMsgInvokeMergePullRequestResponse();
    return message;
  },
};

function createBaseMsgSetPullRequestState(): MsgSetPullRequestState {
  return { creator: "", repositoryId: 0, iid: 0, state: "", mergeCommitSha: "", commentBody: "", taskId: 0 };
}

export const MsgSetPullRequestState = {
  encode(message: MsgSetPullRequestState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== 0) {
      writer.uint32(16).uint64(message.repositoryId);
    }
    if (message.iid !== 0) {
      writer.uint32(24).uint64(message.iid);
    }
    if (message.state !== "") {
      writer.uint32(34).string(message.state);
    }
    if (message.mergeCommitSha !== "") {
      writer.uint32(42).string(message.mergeCommitSha);
    }
    if (message.commentBody !== "") {
      writer.uint32(50).string(message.commentBody);
    }
    if (message.taskId !== 0) {
      writer.uint32(56).uint64(message.taskId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetPullRequestState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetPullRequestState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.iid = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.state = reader.string();
          break;
        case 5:
          message.mergeCommitSha = reader.string();
          break;
        case 6:
          message.commentBody = reader.string();
          break;
        case 7:
          message.taskId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetPullRequestState {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      iid: isSet(object.iid) ? Number(object.iid) : 0,
      state: isSet(object.state) ? String(object.state) : "",
      mergeCommitSha: isSet(object.mergeCommitSha) ? String(object.mergeCommitSha) : "",
      commentBody: isSet(object.commentBody) ? String(object.commentBody) : "",
      taskId: isSet(object.taskId) ? Number(object.taskId) : 0,
    };
  },

  toJSON(message: MsgSetPullRequestState): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.iid !== undefined && (obj.iid = Math.round(message.iid));
    message.state !== undefined && (obj.state = message.state);
    message.mergeCommitSha !== undefined && (obj.mergeCommitSha = message.mergeCommitSha);
    message.commentBody !== undefined && (obj.commentBody = message.commentBody);
    message.taskId !== undefined && (obj.taskId = Math.round(message.taskId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetPullRequestState>, I>>(object: I): MsgSetPullRequestState {
    const message = createBaseMsgSetPullRequestState();
    message.creator = object.creator ?? "";
    message.repositoryId = object.repositoryId ?? 0;
    message.iid = object.iid ?? 0;
    message.state = object.state ?? "";
    message.mergeCommitSha = object.mergeCommitSha ?? "";
    message.commentBody = object.commentBody ?? "";
    message.taskId = object.taskId ?? 0;
    return message;
  },
};

function createBaseMsgSetPullRequestStateResponse(): MsgSetPullRequestStateResponse {
  return { state: "" };
}

export const MsgSetPullRequestStateResponse = {
  encode(message: MsgSetPullRequestStateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.state !== "") {
      writer.uint32(10).string(message.state);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetPullRequestStateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetPullRequestStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.state = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetPullRequestStateResponse {
    return { state: isSet(object.state) ? String(object.state) : "" };
  },

  toJSON(message: MsgSetPullRequestStateResponse): unknown {
    const obj: any = {};
    message.state !== undefined && (obj.state = message.state);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetPullRequestStateResponse>, I>>(
    object: I,
  ): MsgSetPullRequestStateResponse {
    const message = createBaseMsgSetPullRequestStateResponse();
    message.state = object.state ?? "";
    return message;
  },
};

function createBaseMsgAddPullRequestReviewers(): MsgAddPullRequestReviewers {
  return { creator: "", repositoryId: 0, iid: 0, reviewers: [] };
}

export const MsgAddPullRequestReviewers = {
  encode(message: MsgAddPullRequestReviewers, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== 0) {
      writer.uint32(16).uint64(message.repositoryId);
    }
    if (message.iid !== 0) {
      writer.uint32(24).uint64(message.iid);
    }
    for (const v of message.reviewers) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddPullRequestReviewers {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddPullRequestReviewers();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.iid = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.reviewers.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAddPullRequestReviewers {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      iid: isSet(object.iid) ? Number(object.iid) : 0,
      reviewers: Array.isArray(object?.reviewers) ? object.reviewers.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: MsgAddPullRequestReviewers): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.iid !== undefined && (obj.iid = Math.round(message.iid));
    if (message.reviewers) {
      obj.reviewers = message.reviewers.map((e) => e);
    } else {
      obj.reviewers = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddPullRequestReviewers>, I>>(object: I): MsgAddPullRequestReviewers {
    const message = createBaseMsgAddPullRequestReviewers();
    message.creator = object.creator ?? "";
    message.repositoryId = object.repositoryId ?? 0;
    message.iid = object.iid ?? 0;
    message.reviewers = object.reviewers?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgAddPullRequestReviewersResponse(): MsgAddPullRequestReviewersResponse {
  return {};
}

export const MsgAddPullRequestReviewersResponse = {
  encode(_: MsgAddPullRequestReviewersResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddPullRequestReviewersResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddPullRequestReviewersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgAddPullRequestReviewersResponse {
    return {};
  },

  toJSON(_: MsgAddPullRequestReviewersResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddPullRequestReviewersResponse>, I>>(
    _: I,
  ): MsgAddPullRequestReviewersResponse {
    const message = createBaseMsgAddPullRequestReviewersResponse();
    return message;
  },
};

function createBaseMsgRemovePullRequestReviewers(): MsgRemovePullRequestReviewers {
  return { creator: "", repositoryId: 0, iid: 0, reviewers: [] };
}

export const MsgRemovePullRequestReviewers = {
  encode(message: MsgRemovePullRequestReviewers, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== 0) {
      writer.uint32(16).uint64(message.repositoryId);
    }
    if (message.iid !== 0) {
      writer.uint32(24).uint64(message.iid);
    }
    for (const v of message.reviewers) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemovePullRequestReviewers {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemovePullRequestReviewers();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.iid = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.reviewers.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRemovePullRequestReviewers {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      iid: isSet(object.iid) ? Number(object.iid) : 0,
      reviewers: Array.isArray(object?.reviewers) ? object.reviewers.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: MsgRemovePullRequestReviewers): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.iid !== undefined && (obj.iid = Math.round(message.iid));
    if (message.reviewers) {
      obj.reviewers = message.reviewers.map((e) => e);
    } else {
      obj.reviewers = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRemovePullRequestReviewers>, I>>(
    object: I,
  ): MsgRemovePullRequestReviewers {
    const message = createBaseMsgRemovePullRequestReviewers();
    message.creator = object.creator ?? "";
    message.repositoryId = object.repositoryId ?? 0;
    message.iid = object.iid ?? 0;
    message.reviewers = object.reviewers?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgRemovePullRequestReviewersResponse(): MsgRemovePullRequestReviewersResponse {
  return {};
}

export const MsgRemovePullRequestReviewersResponse = {
  encode(_: MsgRemovePullRequestReviewersResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemovePullRequestReviewersResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemovePullRequestReviewersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgRemovePullRequestReviewersResponse {
    return {};
  },

  toJSON(_: MsgRemovePullRequestReviewersResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRemovePullRequestReviewersResponse>, I>>(
    _: I,
  ): MsgRemovePullRequestReviewersResponse {
    const message = createBaseMsgRemovePullRequestReviewersResponse();
    return message;
  },
};

function createBaseMsgAddPullRequestAssignees(): MsgAddPullRequestAssignees {
  return { creator: "", repositoryId: 0, iid: 0, assignees: [] };
}

export const MsgAddPullRequestAssignees = {
  encode(message: MsgAddPullRequestAssignees, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== 0) {
      writer.uint32(16).uint64(message.repositoryId);
    }
    if (message.iid !== 0) {
      writer.uint32(24).uint64(message.iid);
    }
    for (const v of message.assignees) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddPullRequestAssignees {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddPullRequestAssignees();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.iid = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.assignees.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAddPullRequestAssignees {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      iid: isSet(object.iid) ? Number(object.iid) : 0,
      assignees: Array.isArray(object?.assignees) ? object.assignees.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: MsgAddPullRequestAssignees): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.iid !== undefined && (obj.iid = Math.round(message.iid));
    if (message.assignees) {
      obj.assignees = message.assignees.map((e) => e);
    } else {
      obj.assignees = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddPullRequestAssignees>, I>>(object: I): MsgAddPullRequestAssignees {
    const message = createBaseMsgAddPullRequestAssignees();
    message.creator = object.creator ?? "";
    message.repositoryId = object.repositoryId ?? 0;
    message.iid = object.iid ?? 0;
    message.assignees = object.assignees?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgAddPullRequestAssigneesResponse(): MsgAddPullRequestAssigneesResponse {
  return {};
}

export const MsgAddPullRequestAssigneesResponse = {
  encode(_: MsgAddPullRequestAssigneesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddPullRequestAssigneesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddPullRequestAssigneesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgAddPullRequestAssigneesResponse {
    return {};
  },

  toJSON(_: MsgAddPullRequestAssigneesResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddPullRequestAssigneesResponse>, I>>(
    _: I,
  ): MsgAddPullRequestAssigneesResponse {
    const message = createBaseMsgAddPullRequestAssigneesResponse();
    return message;
  },
};

function createBaseMsgRemovePullRequestAssignees(): MsgRemovePullRequestAssignees {
  return { creator: "", repositoryId: 0, iid: 0, assignees: [] };
}

export const MsgRemovePullRequestAssignees = {
  encode(message: MsgRemovePullRequestAssignees, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== 0) {
      writer.uint32(16).uint64(message.repositoryId);
    }
    if (message.iid !== 0) {
      writer.uint32(24).uint64(message.iid);
    }
    for (const v of message.assignees) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemovePullRequestAssignees {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemovePullRequestAssignees();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.iid = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.assignees.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRemovePullRequestAssignees {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      iid: isSet(object.iid) ? Number(object.iid) : 0,
      assignees: Array.isArray(object?.assignees) ? object.assignees.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: MsgRemovePullRequestAssignees): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.iid !== undefined && (obj.iid = Math.round(message.iid));
    if (message.assignees) {
      obj.assignees = message.assignees.map((e) => e);
    } else {
      obj.assignees = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRemovePullRequestAssignees>, I>>(
    object: I,
  ): MsgRemovePullRequestAssignees {
    const message = createBaseMsgRemovePullRequestAssignees();
    message.creator = object.creator ?? "";
    message.repositoryId = object.repositoryId ?? 0;
    message.iid = object.iid ?? 0;
    message.assignees = object.assignees?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgRemovePullRequestAssigneesResponse(): MsgRemovePullRequestAssigneesResponse {
  return {};
}

export const MsgRemovePullRequestAssigneesResponse = {
  encode(_: MsgRemovePullRequestAssigneesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemovePullRequestAssigneesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemovePullRequestAssigneesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgRemovePullRequestAssigneesResponse {
    return {};
  },

  toJSON(_: MsgRemovePullRequestAssigneesResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRemovePullRequestAssigneesResponse>, I>>(
    _: I,
  ): MsgRemovePullRequestAssigneesResponse {
    const message = createBaseMsgRemovePullRequestAssigneesResponse();
    return message;
  },
};

function createBaseMsgLinkPullRequestIssueByIid(): MsgLinkPullRequestIssueByIid {
  return { creator: "", repositoryId: 0, pullRequestIid: 0, issueIid: 0 };
}

export const MsgLinkPullRequestIssueByIid = {
  encode(message: MsgLinkPullRequestIssueByIid, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== 0) {
      writer.uint32(16).uint64(message.repositoryId);
    }
    if (message.pullRequestIid !== 0) {
      writer.uint32(24).uint64(message.pullRequestIid);
    }
    if (message.issueIid !== 0) {
      writer.uint32(32).uint64(message.issueIid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgLinkPullRequestIssueByIid {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLinkPullRequestIssueByIid();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.pullRequestIid = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.issueIid = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgLinkPullRequestIssueByIid {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      pullRequestIid: isSet(object.pullRequestIid) ? Number(object.pullRequestIid) : 0,
      issueIid: isSet(object.issueIid) ? Number(object.issueIid) : 0,
    };
  },

  toJSON(message: MsgLinkPullRequestIssueByIid): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.pullRequestIid !== undefined && (obj.pullRequestIid = Math.round(message.pullRequestIid));
    message.issueIid !== undefined && (obj.issueIid = Math.round(message.issueIid));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgLinkPullRequestIssueByIid>, I>>(object: I): MsgLinkPullRequestIssueByIid {
    const message = createBaseMsgLinkPullRequestIssueByIid();
    message.creator = object.creator ?? "";
    message.repositoryId = object.repositoryId ?? 0;
    message.pullRequestIid = object.pullRequestIid ?? 0;
    message.issueIid = object.issueIid ?? 0;
    return message;
  },
};

function createBaseMsgLinkPullRequestIssueByIidResponse(): MsgLinkPullRequestIssueByIidResponse {
  return {};
}

export const MsgLinkPullRequestIssueByIidResponse = {
  encode(_: MsgLinkPullRequestIssueByIidResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgLinkPullRequestIssueByIidResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLinkPullRequestIssueByIidResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgLinkPullRequestIssueByIidResponse {
    return {};
  },

  toJSON(_: MsgLinkPullRequestIssueByIidResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgLinkPullRequestIssueByIidResponse>, I>>(
    _: I,
  ): MsgLinkPullRequestIssueByIidResponse {
    const message = createBaseMsgLinkPullRequestIssueByIidResponse();
    return message;
  },
};

function createBaseMsgUnlinkPullRequestIssueByIid(): MsgUnlinkPullRequestIssueByIid {
  return { creator: "", repositoryId: 0, pullRequestIid: 0, issueIid: 0 };
}

export const MsgUnlinkPullRequestIssueByIid = {
  encode(message: MsgUnlinkPullRequestIssueByIid, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== 0) {
      writer.uint32(16).uint64(message.repositoryId);
    }
    if (message.pullRequestIid !== 0) {
      writer.uint32(24).uint64(message.pullRequestIid);
    }
    if (message.issueIid !== 0) {
      writer.uint32(32).uint64(message.issueIid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnlinkPullRequestIssueByIid {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnlinkPullRequestIssueByIid();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.pullRequestIid = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.issueIid = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUnlinkPullRequestIssueByIid {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      pullRequestIid: isSet(object.pullRequestIid) ? Number(object.pullRequestIid) : 0,
      issueIid: isSet(object.issueIid) ? Number(object.issueIid) : 0,
    };
  },

  toJSON(message: MsgUnlinkPullRequestIssueByIid): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.pullRequestIid !== undefined && (obj.pullRequestIid = Math.round(message.pullRequestIid));
    message.issueIid !== undefined && (obj.issueIid = Math.round(message.issueIid));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUnlinkPullRequestIssueByIid>, I>>(
    object: I,
  ): MsgUnlinkPullRequestIssueByIid {
    const message = createBaseMsgUnlinkPullRequestIssueByIid();
    message.creator = object.creator ?? "";
    message.repositoryId = object.repositoryId ?? 0;
    message.pullRequestIid = object.pullRequestIid ?? 0;
    message.issueIid = object.issueIid ?? 0;
    return message;
  },
};

function createBaseMsgUnlinkPullRequestIssueByIidResponse(): MsgUnlinkPullRequestIssueByIidResponse {
  return {};
}

export const MsgUnlinkPullRequestIssueByIidResponse = {
  encode(_: MsgUnlinkPullRequestIssueByIidResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnlinkPullRequestIssueByIidResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnlinkPullRequestIssueByIidResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUnlinkPullRequestIssueByIidResponse {
    return {};
  },

  toJSON(_: MsgUnlinkPullRequestIssueByIidResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUnlinkPullRequestIssueByIidResponse>, I>>(
    _: I,
  ): MsgUnlinkPullRequestIssueByIidResponse {
    const message = createBaseMsgUnlinkPullRequestIssueByIidResponse();
    return message;
  },
};

function createBaseMsgAddPullRequestLabels(): MsgAddPullRequestLabels {
  return { creator: "", repositoryId: 0, iid: 0, labelIds: [] };
}

export const MsgAddPullRequestLabels = {
  encode(message: MsgAddPullRequestLabels, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== 0) {
      writer.uint32(16).uint64(message.repositoryId);
    }
    if (message.iid !== 0) {
      writer.uint32(24).uint64(message.iid);
    }
    writer.uint32(34).fork();
    for (const v of message.labelIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddPullRequestLabels {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddPullRequestLabels();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.iid = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.labelIds.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.labelIds.push(longToNumber(reader.uint64() as Long));
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAddPullRequestLabels {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      iid: isSet(object.iid) ? Number(object.iid) : 0,
      labelIds: Array.isArray(object?.labelIds) ? object.labelIds.map((e: any) => Number(e)) : [],
    };
  },

  toJSON(message: MsgAddPullRequestLabels): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.iid !== undefined && (obj.iid = Math.round(message.iid));
    if (message.labelIds) {
      obj.labelIds = message.labelIds.map((e) => Math.round(e));
    } else {
      obj.labelIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddPullRequestLabels>, I>>(object: I): MsgAddPullRequestLabels {
    const message = createBaseMsgAddPullRequestLabels();
    message.creator = object.creator ?? "";
    message.repositoryId = object.repositoryId ?? 0;
    message.iid = object.iid ?? 0;
    message.labelIds = object.labelIds?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgAddPullRequestLabelsResponse(): MsgAddPullRequestLabelsResponse {
  return {};
}

export const MsgAddPullRequestLabelsResponse = {
  encode(_: MsgAddPullRequestLabelsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddPullRequestLabelsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddPullRequestLabelsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgAddPullRequestLabelsResponse {
    return {};
  },

  toJSON(_: MsgAddPullRequestLabelsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddPullRequestLabelsResponse>, I>>(_: I): MsgAddPullRequestLabelsResponse {
    const message = createBaseMsgAddPullRequestLabelsResponse();
    return message;
  },
};

function createBaseMsgRemovePullRequestLabels(): MsgRemovePullRequestLabels {
  return { creator: "", repositoryId: 0, iid: 0, labelIds: [] };
}

export const MsgRemovePullRequestLabels = {
  encode(message: MsgRemovePullRequestLabels, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== 0) {
      writer.uint32(16).uint64(message.repositoryId);
    }
    if (message.iid !== 0) {
      writer.uint32(24).uint64(message.iid);
    }
    writer.uint32(34).fork();
    for (const v of message.labelIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemovePullRequestLabels {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemovePullRequestLabels();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.iid = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.labelIds.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.labelIds.push(longToNumber(reader.uint64() as Long));
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRemovePullRequestLabels {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      iid: isSet(object.iid) ? Number(object.iid) : 0,
      labelIds: Array.isArray(object?.labelIds) ? object.labelIds.map((e: any) => Number(e)) : [],
    };
  },

  toJSON(message: MsgRemovePullRequestLabels): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.iid !== undefined && (obj.iid = Math.round(message.iid));
    if (message.labelIds) {
      obj.labelIds = message.labelIds.map((e) => Math.round(e));
    } else {
      obj.labelIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRemovePullRequestLabels>, I>>(object: I): MsgRemovePullRequestLabels {
    const message = createBaseMsgRemovePullRequestLabels();
    message.creator = object.creator ?? "";
    message.repositoryId = object.repositoryId ?? 0;
    message.iid = object.iid ?? 0;
    message.labelIds = object.labelIds?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgRemovePullRequestLabelsResponse(): MsgRemovePullRequestLabelsResponse {
  return {};
}

export const MsgRemovePullRequestLabelsResponse = {
  encode(_: MsgRemovePullRequestLabelsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemovePullRequestLabelsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemovePullRequestLabelsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgRemovePullRequestLabelsResponse {
    return {};
  },

  toJSON(_: MsgRemovePullRequestLabelsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRemovePullRequestLabelsResponse>, I>>(
    _: I,
  ): MsgRemovePullRequestLabelsResponse {
    const message = createBaseMsgRemovePullRequestLabelsResponse();
    return message;
  },
};

function createBaseMsgDeletePullRequest(): MsgDeletePullRequest {
  return { creator: "", repositoryId: 0, iid: 0 };
}

export const MsgDeletePullRequest = {
  encode(message: MsgDeletePullRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== 0) {
      writer.uint32(16).uint64(message.repositoryId);
    }
    if (message.iid !== 0) {
      writer.uint32(24).uint64(message.iid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeletePullRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeletePullRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.iid = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeletePullRequest {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      iid: isSet(object.iid) ? Number(object.iid) : 0,
    };
  },

  toJSON(message: MsgDeletePullRequest): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.iid !== undefined && (obj.iid = Math.round(message.iid));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeletePullRequest>, I>>(object: I): MsgDeletePullRequest {
    const message = createBaseMsgDeletePullRequest();
    message.creator = object.creator ?? "";
    message.repositoryId = object.repositoryId ?? 0;
    message.iid = object.iid ?? 0;
    return message;
  },
};

function createBaseMsgDeletePullRequestResponse(): MsgDeletePullRequestResponse {
  return {};
}

export const MsgDeletePullRequestResponse = {
  encode(_: MsgDeletePullRequestResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeletePullRequestResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeletePullRequestResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgDeletePullRequestResponse {
    return {};
  },

  toJSON(_: MsgDeletePullRequestResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeletePullRequestResponse>, I>>(_: I): MsgDeletePullRequestResponse {
    const message = createBaseMsgDeletePullRequestResponse();
    return message;
  },
};

function createBaseMsgCreateDao(): MsgCreateDao {
  return { creator: "", name: "", description: "", avatarUrl: "", location: "", website: "" };
}

export const MsgCreateDao = {
  encode(message: MsgCreateDao, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.avatarUrl !== "") {
      writer.uint32(34).string(message.avatarUrl);
    }
    if (message.location !== "") {
      writer.uint32(42).string(message.location);
    }
    if (message.website !== "") {
      writer.uint32(50).string(message.website);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateDao {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateDao();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        case 4:
          message.avatarUrl = reader.string();
          break;
        case 5:
          message.location = reader.string();
          break;
        case 6:
          message.website = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateDao {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
      avatarUrl: isSet(object.avatarUrl) ? String(object.avatarUrl) : "",
      location: isSet(object.location) ? String(object.location) : "",
      website: isSet(object.website) ? String(object.website) : "",
    };
  },

  toJSON(message: MsgCreateDao): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.avatarUrl !== undefined && (obj.avatarUrl = message.avatarUrl);
    message.location !== undefined && (obj.location = message.location);
    message.website !== undefined && (obj.website = message.website);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateDao>, I>>(object: I): MsgCreateDao {
    const message = createBaseMsgCreateDao();
    message.creator = object.creator ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.avatarUrl = object.avatarUrl ?? "";
    message.location = object.location ?? "";
    message.website = object.website ?? "";
    return message;
  },
};

function createBaseMsgCreateDaoResponse(): MsgCreateDaoResponse {
  return { id: "" };
}

export const MsgCreateDaoResponse = {
  encode(message: MsgCreateDaoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateDaoResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateDaoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateDaoResponse {
    return { id: isSet(object.id) ? String(object.id) : "" };
  },

  toJSON(message: MsgCreateDaoResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateDaoResponse>, I>>(object: I): MsgCreateDaoResponse {
    const message = createBaseMsgCreateDaoResponse();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseMsgRenameDao(): MsgRenameDao {
  return { creator: "", id: "", name: "" };
}

export const MsgRenameDao = {
  encode(message: MsgRenameDao, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRenameDao {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRenameDao();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRenameDao {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: MsgRenameDao): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRenameDao>, I>>(object: I): MsgRenameDao {
    const message = createBaseMsgRenameDao();
    message.creator = object.creator ?? "";
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseMsgRenameDaoResponse(): MsgRenameDaoResponse {
  return {};
}

export const MsgRenameDaoResponse = {
  encode(_: MsgRenameDaoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRenameDaoResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRenameDaoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgRenameDaoResponse {
    return {};
  },

  toJSON(_: MsgRenameDaoResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRenameDaoResponse>, I>>(_: I): MsgRenameDaoResponse {
    const message = createBaseMsgRenameDaoResponse();
    return message;
  },
};

function createBaseMsgUpdateDaoDescription(): MsgUpdateDaoDescription {
  return { creator: "", id: "", description: "" };
}

export const MsgUpdateDaoDescription = {
  encode(message: MsgUpdateDaoDescription, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateDaoDescription {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateDaoDescription();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateDaoDescription {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? String(object.id) : "",
      description: isSet(object.description) ? String(object.description) : "",
    };
  },

  toJSON(message: MsgUpdateDaoDescription): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateDaoDescription>, I>>(object: I): MsgUpdateDaoDescription {
    const message = createBaseMsgUpdateDaoDescription();
    message.creator = object.creator ?? "";
    message.id = object.id ?? "";
    message.description = object.description ?? "";
    return message;
  },
};

function createBaseMsgUpdateDaoDescriptionResponse(): MsgUpdateDaoDescriptionResponse {
  return {};
}

export const MsgUpdateDaoDescriptionResponse = {
  encode(_: MsgUpdateDaoDescriptionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateDaoDescriptionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateDaoDescriptionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateDaoDescriptionResponse {
    return {};
  },

  toJSON(_: MsgUpdateDaoDescriptionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateDaoDescriptionResponse>, I>>(_: I): MsgUpdateDaoDescriptionResponse {
    const message = createBaseMsgUpdateDaoDescriptionResponse();
    return message;
  },
};

function createBaseMsgUpdateDaoWebsite(): MsgUpdateDaoWebsite {
  return { creator: "", id: "", url: "" };
}

export const MsgUpdateDaoWebsite = {
  encode(message: MsgUpdateDaoWebsite, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.url !== "") {
      writer.uint32(26).string(message.url);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateDaoWebsite {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateDaoWebsite();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.url = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateDaoWebsite {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? String(object.id) : "",
      url: isSet(object.url) ? String(object.url) : "",
    };
  },

  toJSON(message: MsgUpdateDaoWebsite): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.url !== undefined && (obj.url = message.url);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateDaoWebsite>, I>>(object: I): MsgUpdateDaoWebsite {
    const message = createBaseMsgUpdateDaoWebsite();
    message.creator = object.creator ?? "";
    message.id = object.id ?? "";
    message.url = object.url ?? "";
    return message;
  },
};

function createBaseMsgUpdateDaoWebsiteResponse(): MsgUpdateDaoWebsiteResponse {
  return {};
}

export const MsgUpdateDaoWebsiteResponse = {
  encode(_: MsgUpdateDaoWebsiteResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateDaoWebsiteResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateDaoWebsiteResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateDaoWebsiteResponse {
    return {};
  },

  toJSON(_: MsgUpdateDaoWebsiteResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateDaoWebsiteResponse>, I>>(_: I): MsgUpdateDaoWebsiteResponse {
    const message = createBaseMsgUpdateDaoWebsiteResponse();
    return message;
  },
};

function createBaseMsgUpdateDaoLocation(): MsgUpdateDaoLocation {
  return { creator: "", id: "", location: "" };
}

export const MsgUpdateDaoLocation = {
  encode(message: MsgUpdateDaoLocation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.location !== "") {
      writer.uint32(26).string(message.location);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateDaoLocation {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateDaoLocation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.location = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateDaoLocation {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? String(object.id) : "",
      location: isSet(object.location) ? String(object.location) : "",
    };
  },

  toJSON(message: MsgUpdateDaoLocation): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.location !== undefined && (obj.location = message.location);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateDaoLocation>, I>>(object: I): MsgUpdateDaoLocation {
    const message = createBaseMsgUpdateDaoLocation();
    message.creator = object.creator ?? "";
    message.id = object.id ?? "";
    message.location = object.location ?? "";
    return message;
  },
};

function createBaseMsgUpdateDaoLocationResponse(): MsgUpdateDaoLocationResponse {
  return {};
}

export const MsgUpdateDaoLocationResponse = {
  encode(_: MsgUpdateDaoLocationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateDaoLocationResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateDaoLocationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateDaoLocationResponse {
    return {};
  },

  toJSON(_: MsgUpdateDaoLocationResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateDaoLocationResponse>, I>>(_: I): MsgUpdateDaoLocationResponse {
    const message = createBaseMsgUpdateDaoLocationResponse();
    return message;
  },
};

function createBaseMsgUpdateDaoAvatar(): MsgUpdateDaoAvatar {
  return { creator: "", id: "", url: "" };
}

export const MsgUpdateDaoAvatar = {
  encode(message: MsgUpdateDaoAvatar, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.url !== "") {
      writer.uint32(26).string(message.url);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateDaoAvatar {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateDaoAvatar();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.url = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateDaoAvatar {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? String(object.id) : "",
      url: isSet(object.url) ? String(object.url) : "",
    };
  },

  toJSON(message: MsgUpdateDaoAvatar): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.url !== undefined && (obj.url = message.url);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateDaoAvatar>, I>>(object: I): MsgUpdateDaoAvatar {
    const message = createBaseMsgUpdateDaoAvatar();
    message.creator = object.creator ?? "";
    message.id = object.id ?? "";
    message.url = object.url ?? "";
    return message;
  },
};

function createBaseMsgUpdateDaoAvatarResponse(): MsgUpdateDaoAvatarResponse {
  return {};
}

export const MsgUpdateDaoAvatarResponse = {
  encode(_: MsgUpdateDaoAvatarResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateDaoAvatarResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateDaoAvatarResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateDaoAvatarResponse {
    return {};
  },

  toJSON(_: MsgUpdateDaoAvatarResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateDaoAvatarResponse>, I>>(_: I): MsgUpdateDaoAvatarResponse {
    const message = createBaseMsgUpdateDaoAvatarResponse();
    return message;
  },
};

function createBaseMsgDeleteDao(): MsgDeleteDao {
  return { creator: "", id: "" };
}

export const MsgDeleteDao = {
  encode(message: MsgDeleteDao, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteDao {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteDao();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteDao {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: MsgDeleteDao): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteDao>, I>>(object: I): MsgDeleteDao {
    const message = createBaseMsgDeleteDao();
    message.creator = object.creator ?? "";
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseMsgDeleteDaoResponse(): MsgDeleteDaoResponse {
  return {};
}

export const MsgDeleteDaoResponse = {
  encode(_: MsgDeleteDaoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteDaoResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteDaoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgDeleteDaoResponse {
    return {};
  },

  toJSON(_: MsgDeleteDaoResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteDaoResponse>, I>>(_: I): MsgDeleteDaoResponse {
    const message = createBaseMsgDeleteDaoResponse();
    return message;
  },
};

function createBaseMsgCreateComment(): MsgCreateComment {
  return { creator: "", repositoryId: 0, parentIid: 0, parent: 0, body: "", attachments: [], diffHunk: "", path: "" };
}

export const MsgCreateComment = {
  encode(message: MsgCreateComment, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== 0) {
      writer.uint32(16).uint64(message.repositoryId);
    }
    if (message.parentIid !== 0) {
      writer.uint32(24).uint64(message.parentIid);
    }
    if (message.parent !== 0) {
      writer.uint32(32).int32(message.parent);
    }
    if (message.body !== "") {
      writer.uint32(42).string(message.body);
    }
    for (const v of message.attachments) {
      Attachment.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.diffHunk !== "") {
      writer.uint32(58).string(message.diffHunk);
    }
    if (message.path !== "") {
      writer.uint32(66).string(message.path);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateComment {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateComment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.parentIid = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.parent = reader.int32() as any;
          break;
        case 5:
          message.body = reader.string();
          break;
        case 6:
          message.attachments.push(Attachment.decode(reader, reader.uint32()));
          break;
        case 7:
          message.diffHunk = reader.string();
          break;
        case 8:
          message.path = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateComment {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      parentIid: isSet(object.parentIid) ? Number(object.parentIid) : 0,
      parent: isSet(object.parent) ? commentParentFromJSON(object.parent) : 0,
      body: isSet(object.body) ? String(object.body) : "",
      attachments: Array.isArray(object?.attachments) ? object.attachments.map((e: any) => Attachment.fromJSON(e)) : [],
      diffHunk: isSet(object.diffHunk) ? String(object.diffHunk) : "",
      path: isSet(object.path) ? String(object.path) : "",
    };
  },

  toJSON(message: MsgCreateComment): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.parentIid !== undefined && (obj.parentIid = Math.round(message.parentIid));
    message.parent !== undefined && (obj.parent = commentParentToJSON(message.parent));
    message.body !== undefined && (obj.body = message.body);
    if (message.attachments) {
      obj.attachments = message.attachments.map((e) => e ? Attachment.toJSON(e) : undefined);
    } else {
      obj.attachments = [];
    }
    message.diffHunk !== undefined && (obj.diffHunk = message.diffHunk);
    message.path !== undefined && (obj.path = message.path);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateComment>, I>>(object: I): MsgCreateComment {
    const message = createBaseMsgCreateComment();
    message.creator = object.creator ?? "";
    message.repositoryId = object.repositoryId ?? 0;
    message.parentIid = object.parentIid ?? 0;
    message.parent = object.parent ?? 0;
    message.body = object.body ?? "";
    message.attachments = object.attachments?.map((e) => Attachment.fromPartial(e)) || [];
    message.diffHunk = object.diffHunk ?? "";
    message.path = object.path ?? "";
    return message;
  },
};

function createBaseMsgCreateCommentResponse(): MsgCreateCommentResponse {
  return { id: 0 };
}

export const MsgCreateCommentResponse = {
  encode(message: MsgCreateCommentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateCommentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateCommentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateCommentResponse {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: MsgCreateCommentResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateCommentResponse>, I>>(object: I): MsgCreateCommentResponse {
    const message = createBaseMsgCreateCommentResponse();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseMsgUpdateComment(): MsgUpdateComment {
  return { creator: "", repositoryId: 0, parentIid: 0, parent: 0, commentIid: 0, body: "", attachments: [] };
}

export const MsgUpdateComment = {
  encode(message: MsgUpdateComment, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== 0) {
      writer.uint32(16).uint64(message.repositoryId);
    }
    if (message.parentIid !== 0) {
      writer.uint32(24).uint64(message.parentIid);
    }
    if (message.parent !== 0) {
      writer.uint32(32).int32(message.parent);
    }
    if (message.commentIid !== 0) {
      writer.uint32(40).uint64(message.commentIid);
    }
    if (message.body !== "") {
      writer.uint32(50).string(message.body);
    }
    for (const v of message.attachments) {
      Attachment.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateComment {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateComment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.parentIid = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.parent = reader.int32() as any;
          break;
        case 5:
          message.commentIid = longToNumber(reader.uint64() as Long);
          break;
        case 6:
          message.body = reader.string();
          break;
        case 7:
          message.attachments.push(Attachment.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateComment {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      parentIid: isSet(object.parentIid) ? Number(object.parentIid) : 0,
      parent: isSet(object.parent) ? commentParentFromJSON(object.parent) : 0,
      commentIid: isSet(object.commentIid) ? Number(object.commentIid) : 0,
      body: isSet(object.body) ? String(object.body) : "",
      attachments: Array.isArray(object?.attachments) ? object.attachments.map((e: any) => Attachment.fromJSON(e)) : [],
    };
  },

  toJSON(message: MsgUpdateComment): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.parentIid !== undefined && (obj.parentIid = Math.round(message.parentIid));
    message.parent !== undefined && (obj.parent = commentParentToJSON(message.parent));
    message.commentIid !== undefined && (obj.commentIid = Math.round(message.commentIid));
    message.body !== undefined && (obj.body = message.body);
    if (message.attachments) {
      obj.attachments = message.attachments.map((e) => e ? Attachment.toJSON(e) : undefined);
    } else {
      obj.attachments = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateComment>, I>>(object: I): MsgUpdateComment {
    const message = createBaseMsgUpdateComment();
    message.creator = object.creator ?? "";
    message.repositoryId = object.repositoryId ?? 0;
    message.parentIid = object.parentIid ?? 0;
    message.parent = object.parent ?? 0;
    message.commentIid = object.commentIid ?? 0;
    message.body = object.body ?? "";
    message.attachments = object.attachments?.map((e) => Attachment.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgUpdateCommentResponse(): MsgUpdateCommentResponse {
  return {};
}

export const MsgUpdateCommentResponse = {
  encode(_: MsgUpdateCommentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateCommentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateCommentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateCommentResponse {
    return {};
  },

  toJSON(_: MsgUpdateCommentResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateCommentResponse>, I>>(_: I): MsgUpdateCommentResponse {
    const message = createBaseMsgUpdateCommentResponse();
    return message;
  },
};

function createBaseMsgDeleteComment(): MsgDeleteComment {
  return { creator: "", repositoryId: 0, parentIid: 0, parent: 0, commentIid: 0 };
}

export const MsgDeleteComment = {
  encode(message: MsgDeleteComment, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== 0) {
      writer.uint32(16).uint64(message.repositoryId);
    }
    if (message.parentIid !== 0) {
      writer.uint32(24).uint64(message.parentIid);
    }
    if (message.parent !== 0) {
      writer.uint32(32).int32(message.parent);
    }
    if (message.commentIid !== 0) {
      writer.uint32(40).uint64(message.commentIid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteComment {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteComment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.parentIid = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.parent = reader.int32() as any;
          break;
        case 5:
          message.commentIid = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteComment {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      parentIid: isSet(object.parentIid) ? Number(object.parentIid) : 0,
      parent: isSet(object.parent) ? commentParentFromJSON(object.parent) : 0,
      commentIid: isSet(object.commentIid) ? Number(object.commentIid) : 0,
    };
  },

  toJSON(message: MsgDeleteComment): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.parentIid !== undefined && (obj.parentIid = Math.round(message.parentIid));
    message.parent !== undefined && (obj.parent = commentParentToJSON(message.parent));
    message.commentIid !== undefined && (obj.commentIid = Math.round(message.commentIid));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteComment>, I>>(object: I): MsgDeleteComment {
    const message = createBaseMsgDeleteComment();
    message.creator = object.creator ?? "";
    message.repositoryId = object.repositoryId ?? 0;
    message.parentIid = object.parentIid ?? 0;
    message.parent = object.parent ?? 0;
    message.commentIid = object.commentIid ?? 0;
    return message;
  },
};

function createBaseMsgDeleteCommentResponse(): MsgDeleteCommentResponse {
  return {};
}

export const MsgDeleteCommentResponse = {
  encode(_: MsgDeleteCommentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteCommentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteCommentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgDeleteCommentResponse {
    return {};
  },

  toJSON(_: MsgDeleteCommentResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteCommentResponse>, I>>(_: I): MsgDeleteCommentResponse {
    const message = createBaseMsgDeleteCommentResponse();
    return message;
  },
};

function createBaseMsgCreateIssue(): MsgCreateIssue {
  return {
    creator: "",
    repositoryId: undefined,
    title: "",
    description: "",
    labelIds: [],
    weight: 0,
    assignees: [],
    bountyAmount: [],
    bountyExpiry: 0,
  };
}

export const MsgCreateIssue = {
  encode(message: MsgCreateIssue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
    }
    if (message.title !== "") {
      writer.uint32(26).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    writer.uint32(42).fork();
    for (const v of message.labelIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.weight !== 0) {
      writer.uint32(48).uint64(message.weight);
    }
    for (const v of message.assignees) {
      writer.uint32(58).string(v!);
    }
    for (const v of message.bountyAmount) {
      Coin.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    if (message.bountyExpiry !== 0) {
      writer.uint32(72).int64(message.bountyExpiry);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateIssue {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateIssue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = RepositoryId.decode(reader, reader.uint32());
          break;
        case 3:
          message.title = reader.string();
          break;
        case 4:
          message.description = reader.string();
          break;
        case 5:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.labelIds.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.labelIds.push(longToNumber(reader.uint64() as Long));
          }
          break;
        case 6:
          message.weight = longToNumber(reader.uint64() as Long);
          break;
        case 7:
          message.assignees.push(reader.string());
          break;
        case 8:
          message.bountyAmount.push(Coin.decode(reader, reader.uint32()));
          break;
        case 9:
          message.bountyExpiry = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateIssue {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? RepositoryId.fromJSON(object.repositoryId) : undefined,
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      labelIds: Array.isArray(object?.labelIds) ? object.labelIds.map((e: any) => Number(e)) : [],
      weight: isSet(object.weight) ? Number(object.weight) : 0,
      assignees: Array.isArray(object?.assignees) ? object.assignees.map((e: any) => String(e)) : [],
      bountyAmount: Array.isArray(object?.bountyAmount) ? object.bountyAmount.map((e: any) => Coin.fromJSON(e)) : [],
      bountyExpiry: isSet(object.bountyExpiry) ? Number(object.bountyExpiry) : 0,
    };
  },

  toJSON(message: MsgCreateIssue): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined
      && (obj.repositoryId = message.repositoryId ? RepositoryId.toJSON(message.repositoryId) : undefined);
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    if (message.labelIds) {
      obj.labelIds = message.labelIds.map((e) => Math.round(e));
    } else {
      obj.labelIds = [];
    }
    message.weight !== undefined && (obj.weight = Math.round(message.weight));
    if (message.assignees) {
      obj.assignees = message.assignees.map((e) => e);
    } else {
      obj.assignees = [];
    }
    if (message.bountyAmount) {
      obj.bountyAmount = message.bountyAmount.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.bountyAmount = [];
    }
    message.bountyExpiry !== undefined && (obj.bountyExpiry = Math.round(message.bountyExpiry));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateIssue>, I>>(object: I): MsgCreateIssue {
    const message = createBaseMsgCreateIssue();
    message.creator = object.creator ?? "";
    message.repositoryId = (object.repositoryId !== undefined && object.repositoryId !== null)
      ? RepositoryId.fromPartial(object.repositoryId)
      : undefined;
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.labelIds = object.labelIds?.map((e) => e) || [];
    message.weight = object.weight ?? 0;
    message.assignees = object.assignees?.map((e) => e) || [];
    message.bountyAmount = object.bountyAmount?.map((e) => Coin.fromPartial(e)) || [];
    message.bountyExpiry = object.bountyExpiry ?? 0;
    return message;
  },
};

function createBaseMsgCreateIssueResponse(): MsgCreateIssueResponse {
  return { id: 0, iid: 0 };
}

export const MsgCreateIssueResponse = {
  encode(message: MsgCreateIssueResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.iid !== 0) {
      writer.uint32(16).uint64(message.iid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateIssueResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateIssueResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.iid = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateIssueResponse {
    return { id: isSet(object.id) ? Number(object.id) : 0, iid: isSet(object.iid) ? Number(object.iid) : 0 };
  },

  toJSON(message: MsgCreateIssueResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.iid !== undefined && (obj.iid = Math.round(message.iid));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateIssueResponse>, I>>(object: I): MsgCreateIssueResponse {
    const message = createBaseMsgCreateIssueResponse();
    message.id = object.id ?? 0;
    message.iid = object.iid ?? 0;
    return message;
  },
};

function createBaseMsgUpdateIssueTitle(): MsgUpdateIssueTitle {
  return { creator: "", repositoryId: 0, iid: 0, title: "" };
}

export const MsgUpdateIssueTitle = {
  encode(message: MsgUpdateIssueTitle, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== 0) {
      writer.uint32(16).uint64(message.repositoryId);
    }
    if (message.iid !== 0) {
      writer.uint32(24).uint64(message.iid);
    }
    if (message.title !== "") {
      writer.uint32(34).string(message.title);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateIssueTitle {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateIssueTitle();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.iid = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.title = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateIssueTitle {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      iid: isSet(object.iid) ? Number(object.iid) : 0,
      title: isSet(object.title) ? String(object.title) : "",
    };
  },

  toJSON(message: MsgUpdateIssueTitle): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.iid !== undefined && (obj.iid = Math.round(message.iid));
    message.title !== undefined && (obj.title = message.title);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateIssueTitle>, I>>(object: I): MsgUpdateIssueTitle {
    const message = createBaseMsgUpdateIssueTitle();
    message.creator = object.creator ?? "";
    message.repositoryId = object.repositoryId ?? 0;
    message.iid = object.iid ?? 0;
    message.title = object.title ?? "";
    return message;
  },
};

function createBaseMsgUpdateIssueTitleResponse(): MsgUpdateIssueTitleResponse {
  return {};
}

export const MsgUpdateIssueTitleResponse = {
  encode(_: MsgUpdateIssueTitleResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateIssueTitleResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateIssueTitleResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateIssueTitleResponse {
    return {};
  },

  toJSON(_: MsgUpdateIssueTitleResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateIssueTitleResponse>, I>>(_: I): MsgUpdateIssueTitleResponse {
    const message = createBaseMsgUpdateIssueTitleResponse();
    return message;
  },
};

function createBaseMsgUpdateIssueDescription(): MsgUpdateIssueDescription {
  return { creator: "", repositoryId: 0, iid: 0, description: "" };
}

export const MsgUpdateIssueDescription = {
  encode(message: MsgUpdateIssueDescription, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== 0) {
      writer.uint32(16).uint64(message.repositoryId);
    }
    if (message.iid !== 0) {
      writer.uint32(24).uint64(message.iid);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateIssueDescription {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateIssueDescription();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.iid = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateIssueDescription {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      iid: isSet(object.iid) ? Number(object.iid) : 0,
      description: isSet(object.description) ? String(object.description) : "",
    };
  },

  toJSON(message: MsgUpdateIssueDescription): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.iid !== undefined && (obj.iid = Math.round(message.iid));
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateIssueDescription>, I>>(object: I): MsgUpdateIssueDescription {
    const message = createBaseMsgUpdateIssueDescription();
    message.creator = object.creator ?? "";
    message.repositoryId = object.repositoryId ?? 0;
    message.iid = object.iid ?? 0;
    message.description = object.description ?? "";
    return message;
  },
};

function createBaseMsgUpdateIssueDescriptionResponse(): MsgUpdateIssueDescriptionResponse {
  return {};
}

export const MsgUpdateIssueDescriptionResponse = {
  encode(_: MsgUpdateIssueDescriptionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateIssueDescriptionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateIssueDescriptionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateIssueDescriptionResponse {
    return {};
  },

  toJSON(_: MsgUpdateIssueDescriptionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateIssueDescriptionResponse>, I>>(
    _: I,
  ): MsgUpdateIssueDescriptionResponse {
    const message = createBaseMsgUpdateIssueDescriptionResponse();
    return message;
  },
};

function createBaseMsgToggleIssueState(): MsgToggleIssueState {
  return { creator: "", repositoryId: 0, iid: 0, commentBody: "" };
}

export const MsgToggleIssueState = {
  encode(message: MsgToggleIssueState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== 0) {
      writer.uint32(16).uint64(message.repositoryId);
    }
    if (message.iid !== 0) {
      writer.uint32(24).uint64(message.iid);
    }
    if (message.commentBody !== "") {
      writer.uint32(34).string(message.commentBody);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgToggleIssueState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgToggleIssueState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.iid = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.commentBody = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgToggleIssueState {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      iid: isSet(object.iid) ? Number(object.iid) : 0,
      commentBody: isSet(object.commentBody) ? String(object.commentBody) : "",
    };
  },

  toJSON(message: MsgToggleIssueState): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.iid !== undefined && (obj.iid = Math.round(message.iid));
    message.commentBody !== undefined && (obj.commentBody = message.commentBody);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgToggleIssueState>, I>>(object: I): MsgToggleIssueState {
    const message = createBaseMsgToggleIssueState();
    message.creator = object.creator ?? "";
    message.repositoryId = object.repositoryId ?? 0;
    message.iid = object.iid ?? 0;
    message.commentBody = object.commentBody ?? "";
    return message;
  },
};

function createBaseMsgToggleIssueStateResponse(): MsgToggleIssueStateResponse {
  return { state: "" };
}

export const MsgToggleIssueStateResponse = {
  encode(message: MsgToggleIssueStateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.state !== "") {
      writer.uint32(10).string(message.state);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgToggleIssueStateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgToggleIssueStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.state = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgToggleIssueStateResponse {
    return { state: isSet(object.state) ? String(object.state) : "" };
  },

  toJSON(message: MsgToggleIssueStateResponse): unknown {
    const obj: any = {};
    message.state !== undefined && (obj.state = message.state);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgToggleIssueStateResponse>, I>>(object: I): MsgToggleIssueStateResponse {
    const message = createBaseMsgToggleIssueStateResponse();
    message.state = object.state ?? "";
    return message;
  },
};

function createBaseMsgAddIssueAssignees(): MsgAddIssueAssignees {
  return { creator: "", repositoryId: 0, iid: 0, assignees: [] };
}

export const MsgAddIssueAssignees = {
  encode(message: MsgAddIssueAssignees, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== 0) {
      writer.uint32(16).uint64(message.repositoryId);
    }
    if (message.iid !== 0) {
      writer.uint32(24).uint64(message.iid);
    }
    for (const v of message.assignees) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddIssueAssignees {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddIssueAssignees();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.iid = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.assignees.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAddIssueAssignees {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      iid: isSet(object.iid) ? Number(object.iid) : 0,
      assignees: Array.isArray(object?.assignees) ? object.assignees.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: MsgAddIssueAssignees): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.iid !== undefined && (obj.iid = Math.round(message.iid));
    if (message.assignees) {
      obj.assignees = message.assignees.map((e) => e);
    } else {
      obj.assignees = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddIssueAssignees>, I>>(object: I): MsgAddIssueAssignees {
    const message = createBaseMsgAddIssueAssignees();
    message.creator = object.creator ?? "";
    message.repositoryId = object.repositoryId ?? 0;
    message.iid = object.iid ?? 0;
    message.assignees = object.assignees?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgAddIssueAssigneesResponse(): MsgAddIssueAssigneesResponse {
  return {};
}

export const MsgAddIssueAssigneesResponse = {
  encode(_: MsgAddIssueAssigneesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddIssueAssigneesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddIssueAssigneesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgAddIssueAssigneesResponse {
    return {};
  },

  toJSON(_: MsgAddIssueAssigneesResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddIssueAssigneesResponse>, I>>(_: I): MsgAddIssueAssigneesResponse {
    const message = createBaseMsgAddIssueAssigneesResponse();
    return message;
  },
};

function createBaseMsgRemoveIssueAssignees(): MsgRemoveIssueAssignees {
  return { creator: "", repositoryId: 0, iid: 0, assignees: [] };
}

export const MsgRemoveIssueAssignees = {
  encode(message: MsgRemoveIssueAssignees, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== 0) {
      writer.uint32(16).uint64(message.repositoryId);
    }
    if (message.iid !== 0) {
      writer.uint32(24).uint64(message.iid);
    }
    for (const v of message.assignees) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveIssueAssignees {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveIssueAssignees();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.iid = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.assignees.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRemoveIssueAssignees {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      iid: isSet(object.iid) ? Number(object.iid) : 0,
      assignees: Array.isArray(object?.assignees) ? object.assignees.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: MsgRemoveIssueAssignees): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.iid !== undefined && (obj.iid = Math.round(message.iid));
    if (message.assignees) {
      obj.assignees = message.assignees.map((e) => e);
    } else {
      obj.assignees = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRemoveIssueAssignees>, I>>(object: I): MsgRemoveIssueAssignees {
    const message = createBaseMsgRemoveIssueAssignees();
    message.creator = object.creator ?? "";
    message.repositoryId = object.repositoryId ?? 0;
    message.iid = object.iid ?? 0;
    message.assignees = object.assignees?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgRemoveIssueAssigneesResponse(): MsgRemoveIssueAssigneesResponse {
  return {};
}

export const MsgRemoveIssueAssigneesResponse = {
  encode(_: MsgRemoveIssueAssigneesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveIssueAssigneesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveIssueAssigneesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgRemoveIssueAssigneesResponse {
    return {};
  },

  toJSON(_: MsgRemoveIssueAssigneesResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRemoveIssueAssigneesResponse>, I>>(_: I): MsgRemoveIssueAssigneesResponse {
    const message = createBaseMsgRemoveIssueAssigneesResponse();
    return message;
  },
};

function createBaseMsgAddIssueLabels(): MsgAddIssueLabels {
  return { creator: "", repositoryId: 0, iid: 0, labelIds: [] };
}

export const MsgAddIssueLabels = {
  encode(message: MsgAddIssueLabels, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== 0) {
      writer.uint32(16).uint64(message.repositoryId);
    }
    if (message.iid !== 0) {
      writer.uint32(24).uint64(message.iid);
    }
    writer.uint32(34).fork();
    for (const v of message.labelIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddIssueLabels {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddIssueLabels();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.iid = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.labelIds.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.labelIds.push(longToNumber(reader.uint64() as Long));
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAddIssueLabels {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      iid: isSet(object.iid) ? Number(object.iid) : 0,
      labelIds: Array.isArray(object?.labelIds) ? object.labelIds.map((e: any) => Number(e)) : [],
    };
  },

  toJSON(message: MsgAddIssueLabels): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.iid !== undefined && (obj.iid = Math.round(message.iid));
    if (message.labelIds) {
      obj.labelIds = message.labelIds.map((e) => Math.round(e));
    } else {
      obj.labelIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddIssueLabels>, I>>(object: I): MsgAddIssueLabels {
    const message = createBaseMsgAddIssueLabels();
    message.creator = object.creator ?? "";
    message.repositoryId = object.repositoryId ?? 0;
    message.iid = object.iid ?? 0;
    message.labelIds = object.labelIds?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgAddIssueLabelsResponse(): MsgAddIssueLabelsResponse {
  return {};
}

export const MsgAddIssueLabelsResponse = {
  encode(_: MsgAddIssueLabelsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddIssueLabelsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddIssueLabelsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgAddIssueLabelsResponse {
    return {};
  },

  toJSON(_: MsgAddIssueLabelsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddIssueLabelsResponse>, I>>(_: I): MsgAddIssueLabelsResponse {
    const message = createBaseMsgAddIssueLabelsResponse();
    return message;
  },
};

function createBaseMsgRemoveIssueLabels(): MsgRemoveIssueLabels {
  return { creator: "", repositoryId: 0, iid: 0, labelIds: [] };
}

export const MsgRemoveIssueLabels = {
  encode(message: MsgRemoveIssueLabels, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== 0) {
      writer.uint32(16).uint64(message.repositoryId);
    }
    if (message.iid !== 0) {
      writer.uint32(24).uint64(message.iid);
    }
    writer.uint32(34).fork();
    for (const v of message.labelIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveIssueLabels {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveIssueLabels();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.iid = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.labelIds.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.labelIds.push(longToNumber(reader.uint64() as Long));
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRemoveIssueLabels {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      iid: isSet(object.iid) ? Number(object.iid) : 0,
      labelIds: Array.isArray(object?.labelIds) ? object.labelIds.map((e: any) => Number(e)) : [],
    };
  },

  toJSON(message: MsgRemoveIssueLabels): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.iid !== undefined && (obj.iid = Math.round(message.iid));
    if (message.labelIds) {
      obj.labelIds = message.labelIds.map((e) => Math.round(e));
    } else {
      obj.labelIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRemoveIssueLabels>, I>>(object: I): MsgRemoveIssueLabels {
    const message = createBaseMsgRemoveIssueLabels();
    message.creator = object.creator ?? "";
    message.repositoryId = object.repositoryId ?? 0;
    message.iid = object.iid ?? 0;
    message.labelIds = object.labelIds?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgRemoveIssueLabelsResponse(): MsgRemoveIssueLabelsResponse {
  return {};
}

export const MsgRemoveIssueLabelsResponse = {
  encode(_: MsgRemoveIssueLabelsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveIssueLabelsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveIssueLabelsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgRemoveIssueLabelsResponse {
    return {};
  },

  toJSON(_: MsgRemoveIssueLabelsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRemoveIssueLabelsResponse>, I>>(_: I): MsgRemoveIssueLabelsResponse {
    const message = createBaseMsgRemoveIssueLabelsResponse();
    return message;
  },
};

function createBaseMsgDeleteIssue(): MsgDeleteIssue {
  return { creator: "", repositoryId: 0, iid: 0 };
}

export const MsgDeleteIssue = {
  encode(message: MsgDeleteIssue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== 0) {
      writer.uint32(16).uint64(message.repositoryId);
    }
    if (message.iid !== 0) {
      writer.uint32(24).uint64(message.iid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteIssue {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteIssue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.iid = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteIssue {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? Number(object.repositoryId) : 0,
      iid: isSet(object.iid) ? Number(object.iid) : 0,
    };
  },

  toJSON(message: MsgDeleteIssue): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined && (obj.repositoryId = Math.round(message.repositoryId));
    message.iid !== undefined && (obj.iid = Math.round(message.iid));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteIssue>, I>>(object: I): MsgDeleteIssue {
    const message = createBaseMsgDeleteIssue();
    message.creator = object.creator ?? "";
    message.repositoryId = object.repositoryId ?? 0;
    message.iid = object.iid ?? 0;
    return message;
  },
};

function createBaseMsgDeleteIssueResponse(): MsgDeleteIssueResponse {
  return {};
}

export const MsgDeleteIssueResponse = {
  encode(_: MsgDeleteIssueResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteIssueResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteIssueResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgDeleteIssueResponse {
    return {};
  },

  toJSON(_: MsgDeleteIssueResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteIssueResponse>, I>>(_: I): MsgDeleteIssueResponse {
    const message = createBaseMsgDeleteIssueResponse();
    return message;
  },
};

function createBaseMsgCreateRepository(): MsgCreateRepository {
  return { creator: "", name: "", owner: "", description: "" };
}

export const MsgCreateRepository = {
  encode(message: MsgCreateRepository, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.owner !== "") {
      writer.uint32(26).string(message.owner);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateRepository {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateRepository();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.owner = reader.string();
          break;
        case 4:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateRepository {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      name: isSet(object.name) ? String(object.name) : "",
      owner: isSet(object.owner) ? String(object.owner) : "",
      description: isSet(object.description) ? String(object.description) : "",
    };
  },

  toJSON(message: MsgCreateRepository): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.name !== undefined && (obj.name = message.name);
    message.owner !== undefined && (obj.owner = message.owner);
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateRepository>, I>>(object: I): MsgCreateRepository {
    const message = createBaseMsgCreateRepository();
    message.creator = object.creator ?? "";
    message.name = object.name ?? "";
    message.owner = object.owner ?? "";
    message.description = object.description ?? "";
    return message;
  },
};

function createBaseMsgCreateRepositoryResponse(): MsgCreateRepositoryResponse {
  return { repositoryId: undefined };
}

export const MsgCreateRepositoryResponse = {
  encode(message: MsgCreateRepositoryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateRepositoryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateRepositoryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.repositoryId = RepositoryId.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateRepositoryResponse {
    return { repositoryId: isSet(object.repositoryId) ? RepositoryId.fromJSON(object.repositoryId) : undefined };
  },

  toJSON(message: MsgCreateRepositoryResponse): unknown {
    const obj: any = {};
    message.repositoryId !== undefined
      && (obj.repositoryId = message.repositoryId ? RepositoryId.toJSON(message.repositoryId) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateRepositoryResponse>, I>>(object: I): MsgCreateRepositoryResponse {
    const message = createBaseMsgCreateRepositoryResponse();
    message.repositoryId = (object.repositoryId !== undefined && object.repositoryId !== null)
      ? RepositoryId.fromPartial(object.repositoryId)
      : undefined;
    return message;
  },
};

function createBaseMsgInvokeForkRepository(): MsgInvokeForkRepository {
  return {
    creator: "",
    repositoryId: undefined,
    forkRepositoryName: "",
    forkRepositoryDescription: "",
    branch: "",
    owner: "",
    provider: "",
  };
}

export const MsgInvokeForkRepository = {
  encode(message: MsgInvokeForkRepository, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
    }
    if (message.forkRepositoryName !== "") {
      writer.uint32(26).string(message.forkRepositoryName);
    }
    if (message.forkRepositoryDescription !== "") {
      writer.uint32(34).string(message.forkRepositoryDescription);
    }
    if (message.branch !== "") {
      writer.uint32(42).string(message.branch);
    }
    if (message.owner !== "") {
      writer.uint32(50).string(message.owner);
    }
    if (message.provider !== "") {
      writer.uint32(58).string(message.provider);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgInvokeForkRepository {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgInvokeForkRepository();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = RepositoryId.decode(reader, reader.uint32());
          break;
        case 3:
          message.forkRepositoryName = reader.string();
          break;
        case 4:
          message.forkRepositoryDescription = reader.string();
          break;
        case 5:
          message.branch = reader.string();
          break;
        case 6:
          message.owner = reader.string();
          break;
        case 7:
          message.provider = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgInvokeForkRepository {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? RepositoryId.fromJSON(object.repositoryId) : undefined,
      forkRepositoryName: isSet(object.forkRepositoryName) ? String(object.forkRepositoryName) : "",
      forkRepositoryDescription: isSet(object.forkRepositoryDescription)
        ? String(object.forkRepositoryDescription)
        : "",
      branch: isSet(object.branch) ? String(object.branch) : "",
      owner: isSet(object.owner) ? String(object.owner) : "",
      provider: isSet(object.provider) ? String(object.provider) : "",
    };
  },

  toJSON(message: MsgInvokeForkRepository): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined
      && (obj.repositoryId = message.repositoryId ? RepositoryId.toJSON(message.repositoryId) : undefined);
    message.forkRepositoryName !== undefined && (obj.forkRepositoryName = message.forkRepositoryName);
    message.forkRepositoryDescription !== undefined
      && (obj.forkRepositoryDescription = message.forkRepositoryDescription);
    message.branch !== undefined && (obj.branch = message.branch);
    message.owner !== undefined && (obj.owner = message.owner);
    message.provider !== undefined && (obj.provider = message.provider);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgInvokeForkRepository>, I>>(object: I): MsgInvokeForkRepository {
    const message = createBaseMsgInvokeForkRepository();
    message.creator = object.creator ?? "";
    message.repositoryId = (object.repositoryId !== undefined && object.repositoryId !== null)
      ? RepositoryId.fromPartial(object.repositoryId)
      : undefined;
    message.forkRepositoryName = object.forkRepositoryName ?? "";
    message.forkRepositoryDescription = object.forkRepositoryDescription ?? "";
    message.branch = object.branch ?? "";
    message.owner = object.owner ?? "";
    message.provider = object.provider ?? "";
    return message;
  },
};

function createBaseMsgInvokeForkRepositoryResponse(): MsgInvokeForkRepositoryResponse {
  return {};
}

export const MsgInvokeForkRepositoryResponse = {
  encode(_: MsgInvokeForkRepositoryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgInvokeForkRepositoryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgInvokeForkRepositoryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgInvokeForkRepositoryResponse {
    return {};
  },

  toJSON(_: MsgInvokeForkRepositoryResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgInvokeForkRepositoryResponse>, I>>(_: I): MsgInvokeForkRepositoryResponse {
    const message = createBaseMsgInvokeForkRepositoryResponse();
    return message;
  },
};

function createBaseMsgForkRepository(): MsgForkRepository {
  return {
    creator: "",
    repositoryId: undefined,
    forkRepositoryName: "",
    forkRepositoryDescription: "",
    branch: "",
    owner: "",
    taskId: 0,
  };
}

export const MsgForkRepository = {
  encode(message: MsgForkRepository, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
    }
    if (message.forkRepositoryName !== "") {
      writer.uint32(26).string(message.forkRepositoryName);
    }
    if (message.forkRepositoryDescription !== "") {
      writer.uint32(34).string(message.forkRepositoryDescription);
    }
    if (message.branch !== "") {
      writer.uint32(42).string(message.branch);
    }
    if (message.owner !== "") {
      writer.uint32(50).string(message.owner);
    }
    if (message.taskId !== 0) {
      writer.uint32(56).uint64(message.taskId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgForkRepository {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgForkRepository();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = RepositoryId.decode(reader, reader.uint32());
          break;
        case 3:
          message.forkRepositoryName = reader.string();
          break;
        case 4:
          message.forkRepositoryDescription = reader.string();
          break;
        case 5:
          message.branch = reader.string();
          break;
        case 6:
          message.owner = reader.string();
          break;
        case 7:
          message.taskId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgForkRepository {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? RepositoryId.fromJSON(object.repositoryId) : undefined,
      forkRepositoryName: isSet(object.forkRepositoryName) ? String(object.forkRepositoryName) : "",
      forkRepositoryDescription: isSet(object.forkRepositoryDescription)
        ? String(object.forkRepositoryDescription)
        : "",
      branch: isSet(object.branch) ? String(object.branch) : "",
      owner: isSet(object.owner) ? String(object.owner) : "",
      taskId: isSet(object.taskId) ? Number(object.taskId) : 0,
    };
  },

  toJSON(message: MsgForkRepository): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined
      && (obj.repositoryId = message.repositoryId ? RepositoryId.toJSON(message.repositoryId) : undefined);
    message.forkRepositoryName !== undefined && (obj.forkRepositoryName = message.forkRepositoryName);
    message.forkRepositoryDescription !== undefined
      && (obj.forkRepositoryDescription = message.forkRepositoryDescription);
    message.branch !== undefined && (obj.branch = message.branch);
    message.owner !== undefined && (obj.owner = message.owner);
    message.taskId !== undefined && (obj.taskId = Math.round(message.taskId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgForkRepository>, I>>(object: I): MsgForkRepository {
    const message = createBaseMsgForkRepository();
    message.creator = object.creator ?? "";
    message.repositoryId = (object.repositoryId !== undefined && object.repositoryId !== null)
      ? RepositoryId.fromPartial(object.repositoryId)
      : undefined;
    message.forkRepositoryName = object.forkRepositoryName ?? "";
    message.forkRepositoryDescription = object.forkRepositoryDescription ?? "";
    message.branch = object.branch ?? "";
    message.owner = object.owner ?? "";
    message.taskId = object.taskId ?? 0;
    return message;
  },
};

function createBaseMsgForkRepositoryResponse(): MsgForkRepositoryResponse {
  return { id: 0 };
}

export const MsgForkRepositoryResponse = {
  encode(message: MsgForkRepositoryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgForkRepositoryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgForkRepositoryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgForkRepositoryResponse {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: MsgForkRepositoryResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgForkRepositoryResponse>, I>>(object: I): MsgForkRepositoryResponse {
    const message = createBaseMsgForkRepositoryResponse();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseMsgForkRepositorySuccess(): MsgForkRepositorySuccess {
  return { creator: "", repositoryId: undefined, taskId: 0 };
}

export const MsgForkRepositorySuccess = {
  encode(message: MsgForkRepositorySuccess, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
    }
    if (message.taskId !== 0) {
      writer.uint32(24).uint64(message.taskId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgForkRepositorySuccess {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgForkRepositorySuccess();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = RepositoryId.decode(reader, reader.uint32());
          break;
        case 3:
          message.taskId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgForkRepositorySuccess {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? RepositoryId.fromJSON(object.repositoryId) : undefined,
      taskId: isSet(object.taskId) ? Number(object.taskId) : 0,
    };
  },

  toJSON(message: MsgForkRepositorySuccess): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined
      && (obj.repositoryId = message.repositoryId ? RepositoryId.toJSON(message.repositoryId) : undefined);
    message.taskId !== undefined && (obj.taskId = Math.round(message.taskId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgForkRepositorySuccess>, I>>(object: I): MsgForkRepositorySuccess {
    const message = createBaseMsgForkRepositorySuccess();
    message.creator = object.creator ?? "";
    message.repositoryId = (object.repositoryId !== undefined && object.repositoryId !== null)
      ? RepositoryId.fromPartial(object.repositoryId)
      : undefined;
    message.taskId = object.taskId ?? 0;
    return message;
  },
};

function createBaseMsgForkRepositorySuccessResponse(): MsgForkRepositorySuccessResponse {
  return { id: 0 };
}

export const MsgForkRepositorySuccessResponse = {
  encode(message: MsgForkRepositorySuccessResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgForkRepositorySuccessResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgForkRepositorySuccessResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgForkRepositorySuccessResponse {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: MsgForkRepositorySuccessResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgForkRepositorySuccessResponse>, I>>(
    object: I,
  ): MsgForkRepositorySuccessResponse {
    const message = createBaseMsgForkRepositorySuccessResponse();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseMsgRenameRepository(): MsgRenameRepository {
  return { creator: "", repositoryId: undefined, name: "" };
}

export const MsgRenameRepository = {
  encode(message: MsgRenameRepository, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRenameRepository {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRenameRepository();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = RepositoryId.decode(reader, reader.uint32());
          break;
        case 3:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRenameRepository {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? RepositoryId.fromJSON(object.repositoryId) : undefined,
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: MsgRenameRepository): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined
      && (obj.repositoryId = message.repositoryId ? RepositoryId.toJSON(message.repositoryId) : undefined);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRenameRepository>, I>>(object: I): MsgRenameRepository {
    const message = createBaseMsgRenameRepository();
    message.creator = object.creator ?? "";
    message.repositoryId = (object.repositoryId !== undefined && object.repositoryId !== null)
      ? RepositoryId.fromPartial(object.repositoryId)
      : undefined;
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseMsgRenameRepositoryResponse(): MsgRenameRepositoryResponse {
  return {};
}

export const MsgRenameRepositoryResponse = {
  encode(_: MsgRenameRepositoryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRenameRepositoryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRenameRepositoryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgRenameRepositoryResponse {
    return {};
  },

  toJSON(_: MsgRenameRepositoryResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRenameRepositoryResponse>, I>>(_: I): MsgRenameRepositoryResponse {
    const message = createBaseMsgRenameRepositoryResponse();
    return message;
  },
};

function createBaseMsgUpdateRepositoryDescription(): MsgUpdateRepositoryDescription {
  return { creator: "", repositoryId: undefined, description: "" };
}

export const MsgUpdateRepositoryDescription = {
  encode(message: MsgUpdateRepositoryDescription, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateRepositoryDescription {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateRepositoryDescription();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = RepositoryId.decode(reader, reader.uint32());
          break;
        case 3:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateRepositoryDescription {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? RepositoryId.fromJSON(object.repositoryId) : undefined,
      description: isSet(object.description) ? String(object.description) : "",
    };
  },

  toJSON(message: MsgUpdateRepositoryDescription): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined
      && (obj.repositoryId = message.repositoryId ? RepositoryId.toJSON(message.repositoryId) : undefined);
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateRepositoryDescription>, I>>(
    object: I,
  ): MsgUpdateRepositoryDescription {
    const message = createBaseMsgUpdateRepositoryDescription();
    message.creator = object.creator ?? "";
    message.repositoryId = (object.repositoryId !== undefined && object.repositoryId !== null)
      ? RepositoryId.fromPartial(object.repositoryId)
      : undefined;
    message.description = object.description ?? "";
    return message;
  },
};

function createBaseMsgUpdateRepositoryDescriptionResponse(): MsgUpdateRepositoryDescriptionResponse {
  return {};
}

export const MsgUpdateRepositoryDescriptionResponse = {
  encode(_: MsgUpdateRepositoryDescriptionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateRepositoryDescriptionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateRepositoryDescriptionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateRepositoryDescriptionResponse {
    return {};
  },

  toJSON(_: MsgUpdateRepositoryDescriptionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateRepositoryDescriptionResponse>, I>>(
    _: I,
  ): MsgUpdateRepositoryDescriptionResponse {
    const message = createBaseMsgUpdateRepositoryDescriptionResponse();
    return message;
  },
};

function createBaseMsgChangeOwner(): MsgChangeOwner {
  return { creator: "", repositoryId: undefined, owner: "" };
}

export const MsgChangeOwner = {
  encode(message: MsgChangeOwner, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
    }
    if (message.owner !== "") {
      writer.uint32(26).string(message.owner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChangeOwner {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChangeOwner();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = RepositoryId.decode(reader, reader.uint32());
          break;
        case 3:
          message.owner = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgChangeOwner {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? RepositoryId.fromJSON(object.repositoryId) : undefined,
      owner: isSet(object.owner) ? String(object.owner) : "",
    };
  },

  toJSON(message: MsgChangeOwner): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined
      && (obj.repositoryId = message.repositoryId ? RepositoryId.toJSON(message.repositoryId) : undefined);
    message.owner !== undefined && (obj.owner = message.owner);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgChangeOwner>, I>>(object: I): MsgChangeOwner {
    const message = createBaseMsgChangeOwner();
    message.creator = object.creator ?? "";
    message.repositoryId = (object.repositoryId !== undefined && object.repositoryId !== null)
      ? RepositoryId.fromPartial(object.repositoryId)
      : undefined;
    message.owner = object.owner ?? "";
    return message;
  },
};

function createBaseMsgChangeOwnerResponse(): MsgChangeOwnerResponse {
  return {};
}

export const MsgChangeOwnerResponse = {
  encode(_: MsgChangeOwnerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChangeOwnerResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChangeOwnerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgChangeOwnerResponse {
    return {};
  },

  toJSON(_: MsgChangeOwnerResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgChangeOwnerResponse>, I>>(_: I): MsgChangeOwnerResponse {
    const message = createBaseMsgChangeOwnerResponse();
    return message;
  },
};

function createBaseMsgUpdateRepositoryCollaborator(): MsgUpdateRepositoryCollaborator {
  return { creator: "", repositoryId: undefined, user: "", role: "" };
}

export const MsgUpdateRepositoryCollaborator = {
  encode(message: MsgUpdateRepositoryCollaborator, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
    }
    if (message.user !== "") {
      writer.uint32(26).string(message.user);
    }
    if (message.role !== "") {
      writer.uint32(34).string(message.role);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateRepositoryCollaborator {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateRepositoryCollaborator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = RepositoryId.decode(reader, reader.uint32());
          break;
        case 3:
          message.user = reader.string();
          break;
        case 4:
          message.role = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateRepositoryCollaborator {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? RepositoryId.fromJSON(object.repositoryId) : undefined,
      user: isSet(object.user) ? String(object.user) : "",
      role: isSet(object.role) ? String(object.role) : "",
    };
  },

  toJSON(message: MsgUpdateRepositoryCollaborator): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined
      && (obj.repositoryId = message.repositoryId ? RepositoryId.toJSON(message.repositoryId) : undefined);
    message.user !== undefined && (obj.user = message.user);
    message.role !== undefined && (obj.role = message.role);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateRepositoryCollaborator>, I>>(
    object: I,
  ): MsgUpdateRepositoryCollaborator {
    const message = createBaseMsgUpdateRepositoryCollaborator();
    message.creator = object.creator ?? "";
    message.repositoryId = (object.repositoryId !== undefined && object.repositoryId !== null)
      ? RepositoryId.fromPartial(object.repositoryId)
      : undefined;
    message.user = object.user ?? "";
    message.role = object.role ?? "";
    return message;
  },
};

function createBaseMsgUpdateRepositoryCollaboratorResponse(): MsgUpdateRepositoryCollaboratorResponse {
  return {};
}

export const MsgUpdateRepositoryCollaboratorResponse = {
  encode(_: MsgUpdateRepositoryCollaboratorResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateRepositoryCollaboratorResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateRepositoryCollaboratorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateRepositoryCollaboratorResponse {
    return {};
  },

  toJSON(_: MsgUpdateRepositoryCollaboratorResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateRepositoryCollaboratorResponse>, I>>(
    _: I,
  ): MsgUpdateRepositoryCollaboratorResponse {
    const message = createBaseMsgUpdateRepositoryCollaboratorResponse();
    return message;
  },
};

function createBaseMsgRemoveRepositoryCollaborator(): MsgRemoveRepositoryCollaborator {
  return { creator: "", repositoryId: undefined, user: "" };
}

export const MsgRemoveRepositoryCollaborator = {
  encode(message: MsgRemoveRepositoryCollaborator, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
    }
    if (message.user !== "") {
      writer.uint32(26).string(message.user);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveRepositoryCollaborator {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveRepositoryCollaborator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = RepositoryId.decode(reader, reader.uint32());
          break;
        case 3:
          message.user = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRemoveRepositoryCollaborator {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? RepositoryId.fromJSON(object.repositoryId) : undefined,
      user: isSet(object.user) ? String(object.user) : "",
    };
  },

  toJSON(message: MsgRemoveRepositoryCollaborator): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined
      && (obj.repositoryId = message.repositoryId ? RepositoryId.toJSON(message.repositoryId) : undefined);
    message.user !== undefined && (obj.user = message.user);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRemoveRepositoryCollaborator>, I>>(
    object: I,
  ): MsgRemoveRepositoryCollaborator {
    const message = createBaseMsgRemoveRepositoryCollaborator();
    message.creator = object.creator ?? "";
    message.repositoryId = (object.repositoryId !== undefined && object.repositoryId !== null)
      ? RepositoryId.fromPartial(object.repositoryId)
      : undefined;
    message.user = object.user ?? "";
    return message;
  },
};

function createBaseMsgRemoveRepositoryCollaboratorResponse(): MsgRemoveRepositoryCollaboratorResponse {
  return {};
}

export const MsgRemoveRepositoryCollaboratorResponse = {
  encode(_: MsgRemoveRepositoryCollaboratorResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveRepositoryCollaboratorResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveRepositoryCollaboratorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgRemoveRepositoryCollaboratorResponse {
    return {};
  },

  toJSON(_: MsgRemoveRepositoryCollaboratorResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRemoveRepositoryCollaboratorResponse>, I>>(
    _: I,
  ): MsgRemoveRepositoryCollaboratorResponse {
    const message = createBaseMsgRemoveRepositoryCollaboratorResponse();
    return message;
  },
};

function createBaseMsgCreateRepositoryLabel(): MsgCreateRepositoryLabel {
  return { creator: "", repositoryId: undefined, name: "", color: "", description: "" };
}

export const MsgCreateRepositoryLabel = {
  encode(message: MsgCreateRepositoryLabel, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.color !== "") {
      writer.uint32(34).string(message.color);
    }
    if (message.description !== "") {
      writer.uint32(42).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateRepositoryLabel {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateRepositoryLabel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = RepositoryId.decode(reader, reader.uint32());
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.color = reader.string();
          break;
        case 5:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateRepositoryLabel {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? RepositoryId.fromJSON(object.repositoryId) : undefined,
      name: isSet(object.name) ? String(object.name) : "",
      color: isSet(object.color) ? String(object.color) : "",
      description: isSet(object.description) ? String(object.description) : "",
    };
  },

  toJSON(message: MsgCreateRepositoryLabel): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined
      && (obj.repositoryId = message.repositoryId ? RepositoryId.toJSON(message.repositoryId) : undefined);
    message.name !== undefined && (obj.name = message.name);
    message.color !== undefined && (obj.color = message.color);
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateRepositoryLabel>, I>>(object: I): MsgCreateRepositoryLabel {
    const message = createBaseMsgCreateRepositoryLabel();
    message.creator = object.creator ?? "";
    message.repositoryId = (object.repositoryId !== undefined && object.repositoryId !== null)
      ? RepositoryId.fromPartial(object.repositoryId)
      : undefined;
    message.name = object.name ?? "";
    message.color = object.color ?? "";
    message.description = object.description ?? "";
    return message;
  },
};

function createBaseMsgCreateRepositoryLabelResponse(): MsgCreateRepositoryLabelResponse {
  return { id: 0 };
}

export const MsgCreateRepositoryLabelResponse = {
  encode(message: MsgCreateRepositoryLabelResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateRepositoryLabelResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateRepositoryLabelResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateRepositoryLabelResponse {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: MsgCreateRepositoryLabelResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateRepositoryLabelResponse>, I>>(
    object: I,
  ): MsgCreateRepositoryLabelResponse {
    const message = createBaseMsgCreateRepositoryLabelResponse();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseMsgUpdateRepositoryLabel(): MsgUpdateRepositoryLabel {
  return { creator: "", repositoryId: undefined, labelId: 0, name: "", color: "", description: "" };
}

export const MsgUpdateRepositoryLabel = {
  encode(message: MsgUpdateRepositoryLabel, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
    }
    if (message.labelId !== 0) {
      writer.uint32(24).uint64(message.labelId);
    }
    if (message.name !== "") {
      writer.uint32(34).string(message.name);
    }
    if (message.color !== "") {
      writer.uint32(42).string(message.color);
    }
    if (message.description !== "") {
      writer.uint32(50).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateRepositoryLabel {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateRepositoryLabel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = RepositoryId.decode(reader, reader.uint32());
          break;
        case 3:
          message.labelId = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.name = reader.string();
          break;
        case 5:
          message.color = reader.string();
          break;
        case 6:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateRepositoryLabel {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? RepositoryId.fromJSON(object.repositoryId) : undefined,
      labelId: isSet(object.labelId) ? Number(object.labelId) : 0,
      name: isSet(object.name) ? String(object.name) : "",
      color: isSet(object.color) ? String(object.color) : "",
      description: isSet(object.description) ? String(object.description) : "",
    };
  },

  toJSON(message: MsgUpdateRepositoryLabel): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined
      && (obj.repositoryId = message.repositoryId ? RepositoryId.toJSON(message.repositoryId) : undefined);
    message.labelId !== undefined && (obj.labelId = Math.round(message.labelId));
    message.name !== undefined && (obj.name = message.name);
    message.color !== undefined && (obj.color = message.color);
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateRepositoryLabel>, I>>(object: I): MsgUpdateRepositoryLabel {
    const message = createBaseMsgUpdateRepositoryLabel();
    message.creator = object.creator ?? "";
    message.repositoryId = (object.repositoryId !== undefined && object.repositoryId !== null)
      ? RepositoryId.fromPartial(object.repositoryId)
      : undefined;
    message.labelId = object.labelId ?? 0;
    message.name = object.name ?? "";
    message.color = object.color ?? "";
    message.description = object.description ?? "";
    return message;
  },
};

function createBaseMsgUpdateRepositoryLabelResponse(): MsgUpdateRepositoryLabelResponse {
  return {};
}

export const MsgUpdateRepositoryLabelResponse = {
  encode(_: MsgUpdateRepositoryLabelResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateRepositoryLabelResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateRepositoryLabelResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateRepositoryLabelResponse {
    return {};
  },

  toJSON(_: MsgUpdateRepositoryLabelResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateRepositoryLabelResponse>, I>>(
    _: I,
  ): MsgUpdateRepositoryLabelResponse {
    const message = createBaseMsgUpdateRepositoryLabelResponse();
    return message;
  },
};

function createBaseMsgDeleteRepositoryLabel(): MsgDeleteRepositoryLabel {
  return { creator: "", repositoryId: undefined, labelId: 0 };
}

export const MsgDeleteRepositoryLabel = {
  encode(message: MsgDeleteRepositoryLabel, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
    }
    if (message.labelId !== 0) {
      writer.uint32(24).uint64(message.labelId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteRepositoryLabel {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteRepositoryLabel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = RepositoryId.decode(reader, reader.uint32());
          break;
        case 3:
          message.labelId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteRepositoryLabel {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? RepositoryId.fromJSON(object.repositoryId) : undefined,
      labelId: isSet(object.labelId) ? Number(object.labelId) : 0,
    };
  },

  toJSON(message: MsgDeleteRepositoryLabel): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined
      && (obj.repositoryId = message.repositoryId ? RepositoryId.toJSON(message.repositoryId) : undefined);
    message.labelId !== undefined && (obj.labelId = Math.round(message.labelId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteRepositoryLabel>, I>>(object: I): MsgDeleteRepositoryLabel {
    const message = createBaseMsgDeleteRepositoryLabel();
    message.creator = object.creator ?? "";
    message.repositoryId = (object.repositoryId !== undefined && object.repositoryId !== null)
      ? RepositoryId.fromPartial(object.repositoryId)
      : undefined;
    message.labelId = object.labelId ?? 0;
    return message;
  },
};

function createBaseMsgDeleteRepositoryLabelResponse(): MsgDeleteRepositoryLabelResponse {
  return {};
}

export const MsgDeleteRepositoryLabelResponse = {
  encode(_: MsgDeleteRepositoryLabelResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteRepositoryLabelResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteRepositoryLabelResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgDeleteRepositoryLabelResponse {
    return {};
  },

  toJSON(_: MsgDeleteRepositoryLabelResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteRepositoryLabelResponse>, I>>(
    _: I,
  ): MsgDeleteRepositoryLabelResponse {
    const message = createBaseMsgDeleteRepositoryLabelResponse();
    return message;
  },
};

function createBaseMsgToggleRepositoryForking(): MsgToggleRepositoryForking {
  return { creator: "", repositoryId: undefined };
}

export const MsgToggleRepositoryForking = {
  encode(message: MsgToggleRepositoryForking, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgToggleRepositoryForking {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgToggleRepositoryForking();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = RepositoryId.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgToggleRepositoryForking {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? RepositoryId.fromJSON(object.repositoryId) : undefined,
    };
  },

  toJSON(message: MsgToggleRepositoryForking): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined
      && (obj.repositoryId = message.repositoryId ? RepositoryId.toJSON(message.repositoryId) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgToggleRepositoryForking>, I>>(object: I): MsgToggleRepositoryForking {
    const message = createBaseMsgToggleRepositoryForking();
    message.creator = object.creator ?? "";
    message.repositoryId = (object.repositoryId !== undefined && object.repositoryId !== null)
      ? RepositoryId.fromPartial(object.repositoryId)
      : undefined;
    return message;
  },
};

function createBaseMsgToggleRepositoryForkingResponse(): MsgToggleRepositoryForkingResponse {
  return { allowForking: false };
}

export const MsgToggleRepositoryForkingResponse = {
  encode(message: MsgToggleRepositoryForkingResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.allowForking === true) {
      writer.uint32(8).bool(message.allowForking);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgToggleRepositoryForkingResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgToggleRepositoryForkingResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.allowForking = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgToggleRepositoryForkingResponse {
    return { allowForking: isSet(object.allowForking) ? Boolean(object.allowForking) : false };
  },

  toJSON(message: MsgToggleRepositoryForkingResponse): unknown {
    const obj: any = {};
    message.allowForking !== undefined && (obj.allowForking = message.allowForking);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgToggleRepositoryForkingResponse>, I>>(
    object: I,
  ): MsgToggleRepositoryForkingResponse {
    const message = createBaseMsgToggleRepositoryForkingResponse();
    message.allowForking = object.allowForking ?? false;
    return message;
  },
};

function createBaseMsgToggleArweaveBackup(): MsgToggleArweaveBackup {
  return { creator: "", repositoryId: undefined };
}

export const MsgToggleArweaveBackup = {
  encode(message: MsgToggleArweaveBackup, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgToggleArweaveBackup {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgToggleArweaveBackup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = RepositoryId.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgToggleArweaveBackup {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? RepositoryId.fromJSON(object.repositoryId) : undefined,
    };
  },

  toJSON(message: MsgToggleArweaveBackup): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined
      && (obj.repositoryId = message.repositoryId ? RepositoryId.toJSON(message.repositoryId) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgToggleArweaveBackup>, I>>(object: I): MsgToggleArweaveBackup {
    const message = createBaseMsgToggleArweaveBackup();
    message.creator = object.creator ?? "";
    message.repositoryId = (object.repositoryId !== undefined && object.repositoryId !== null)
      ? RepositoryId.fromPartial(object.repositoryId)
      : undefined;
    return message;
  },
};

function createBaseMsgToggleArweaveBackupResponse(): MsgToggleArweaveBackupResponse {
  return { enableArweaveBackup: false };
}

export const MsgToggleArweaveBackupResponse = {
  encode(message: MsgToggleArweaveBackupResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.enableArweaveBackup === true) {
      writer.uint32(8).bool(message.enableArweaveBackup);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgToggleArweaveBackupResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgToggleArweaveBackupResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.enableArweaveBackup = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgToggleArweaveBackupResponse {
    return { enableArweaveBackup: isSet(object.enableArweaveBackup) ? Boolean(object.enableArweaveBackup) : false };
  },

  toJSON(message: MsgToggleArweaveBackupResponse): unknown {
    const obj: any = {};
    message.enableArweaveBackup !== undefined && (obj.enableArweaveBackup = message.enableArweaveBackup);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgToggleArweaveBackupResponse>, I>>(
    object: I,
  ): MsgToggleArweaveBackupResponse {
    const message = createBaseMsgToggleArweaveBackupResponse();
    message.enableArweaveBackup = object.enableArweaveBackup ?? false;
    return message;
  },
};

function createBaseMsgDeleteRepository(): MsgDeleteRepository {
  return { creator: "", repositoryId: undefined };
}

export const MsgDeleteRepository = {
  encode(message: MsgDeleteRepository, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(message.repositoryId, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteRepository {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteRepository();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.repositoryId = RepositoryId.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteRepository {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      repositoryId: isSet(object.repositoryId) ? RepositoryId.fromJSON(object.repositoryId) : undefined,
    };
  },

  toJSON(message: MsgDeleteRepository): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined
      && (obj.repositoryId = message.repositoryId ? RepositoryId.toJSON(message.repositoryId) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteRepository>, I>>(object: I): MsgDeleteRepository {
    const message = createBaseMsgDeleteRepository();
    message.creator = object.creator ?? "";
    message.repositoryId = (object.repositoryId !== undefined && object.repositoryId !== null)
      ? RepositoryId.fromPartial(object.repositoryId)
      : undefined;
    return message;
  },
};

function createBaseMsgDeleteRepositoryResponse(): MsgDeleteRepositoryResponse {
  return {};
}

export const MsgDeleteRepositoryResponse = {
  encode(_: MsgDeleteRepositoryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteRepositoryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteRepositoryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgDeleteRepositoryResponse {
    return {};
  },

  toJSON(_: MsgDeleteRepositoryResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteRepositoryResponse>, I>>(_: I): MsgDeleteRepositoryResponse {
    const message = createBaseMsgDeleteRepositoryResponse();
    return message;
  },
};

function createBaseMsgCreateUser(): MsgCreateUser {
  return { creator: "", username: "", name: "", avatarUrl: "", bio: "" };
}

export const MsgCreateUser = {
  encode(message: MsgCreateUser, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.username !== "") {
      writer.uint32(18).string(message.username);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.avatarUrl !== "") {
      writer.uint32(34).string(message.avatarUrl);
    }
    if (message.bio !== "") {
      writer.uint32(42).string(message.bio);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateUser {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.username = reader.string();
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.avatarUrl = reader.string();
          break;
        case 5:
          message.bio = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateUser {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      username: isSet(object.username) ? String(object.username) : "",
      name: isSet(object.name) ? String(object.name) : "",
      avatarUrl: isSet(object.avatarUrl) ? String(object.avatarUrl) : "",
      bio: isSet(object.bio) ? String(object.bio) : "",
    };
  },

  toJSON(message: MsgCreateUser): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.username !== undefined && (obj.username = message.username);
    message.name !== undefined && (obj.name = message.name);
    message.avatarUrl !== undefined && (obj.avatarUrl = message.avatarUrl);
    message.bio !== undefined && (obj.bio = message.bio);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateUser>, I>>(object: I): MsgCreateUser {
    const message = createBaseMsgCreateUser();
    message.creator = object.creator ?? "";
    message.username = object.username ?? "";
    message.name = object.name ?? "";
    message.avatarUrl = object.avatarUrl ?? "";
    message.bio = object.bio ?? "";
    return message;
  },
};

function createBaseMsgCreateUserResponse(): MsgCreateUserResponse {
  return { id: "" };
}

export const MsgCreateUserResponse = {
  encode(message: MsgCreateUserResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateUserResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateUserResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateUserResponse {
    return { id: isSet(object.id) ? String(object.id) : "" };
  },

  toJSON(message: MsgCreateUserResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateUserResponse>, I>>(object: I): MsgCreateUserResponse {
    const message = createBaseMsgCreateUserResponse();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseMsgUpdateUserUsername(): MsgUpdateUserUsername {
  return { creator: "", username: "" };
}

export const MsgUpdateUserUsername = {
  encode(message: MsgUpdateUserUsername, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.username !== "") {
      writer.uint32(18).string(message.username);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateUserUsername {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateUserUsername();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.username = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateUserUsername {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      username: isSet(object.username) ? String(object.username) : "",
    };
  },

  toJSON(message: MsgUpdateUserUsername): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.username !== undefined && (obj.username = message.username);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateUserUsername>, I>>(object: I): MsgUpdateUserUsername {
    const message = createBaseMsgUpdateUserUsername();
    message.creator = object.creator ?? "";
    message.username = object.username ?? "";
    return message;
  },
};

function createBaseMsgUpdateUserUsernameResponse(): MsgUpdateUserUsernameResponse {
  return {};
}

export const MsgUpdateUserUsernameResponse = {
  encode(_: MsgUpdateUserUsernameResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateUserUsernameResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateUserUsernameResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateUserUsernameResponse {
    return {};
  },

  toJSON(_: MsgUpdateUserUsernameResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateUserUsernameResponse>, I>>(_: I): MsgUpdateUserUsernameResponse {
    const message = createBaseMsgUpdateUserUsernameResponse();
    return message;
  },
};

function createBaseMsgUpdateUserName(): MsgUpdateUserName {
  return { creator: "", name: "" };
}

export const MsgUpdateUserName = {
  encode(message: MsgUpdateUserName, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateUserName {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateUserName();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateUserName {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: MsgUpdateUserName): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateUserName>, I>>(object: I): MsgUpdateUserName {
    const message = createBaseMsgUpdateUserName();
    message.creator = object.creator ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseMsgUpdateUserNameResponse(): MsgUpdateUserNameResponse {
  return {};
}

export const MsgUpdateUserNameResponse = {
  encode(_: MsgUpdateUserNameResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateUserNameResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateUserNameResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateUserNameResponse {
    return {};
  },

  toJSON(_: MsgUpdateUserNameResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateUserNameResponse>, I>>(_: I): MsgUpdateUserNameResponse {
    const message = createBaseMsgUpdateUserNameResponse();
    return message;
  },
};

function createBaseMsgUpdateUserBio(): MsgUpdateUserBio {
  return { creator: "", bio: "" };
}

export const MsgUpdateUserBio = {
  encode(message: MsgUpdateUserBio, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.bio !== "") {
      writer.uint32(18).string(message.bio);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateUserBio {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateUserBio();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.bio = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateUserBio {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      bio: isSet(object.bio) ? String(object.bio) : "",
    };
  },

  toJSON(message: MsgUpdateUserBio): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.bio !== undefined && (obj.bio = message.bio);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateUserBio>, I>>(object: I): MsgUpdateUserBio {
    const message = createBaseMsgUpdateUserBio();
    message.creator = object.creator ?? "";
    message.bio = object.bio ?? "";
    return message;
  },
};

function createBaseMsgUpdateUserBioResponse(): MsgUpdateUserBioResponse {
  return {};
}

export const MsgUpdateUserBioResponse = {
  encode(_: MsgUpdateUserBioResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateUserBioResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateUserBioResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateUserBioResponse {
    return {};
  },

  toJSON(_: MsgUpdateUserBioResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateUserBioResponse>, I>>(_: I): MsgUpdateUserBioResponse {
    const message = createBaseMsgUpdateUserBioResponse();
    return message;
  },
};

function createBaseMsgUpdateUserAvatar(): MsgUpdateUserAvatar {
  return { creator: "", url: "" };
}

export const MsgUpdateUserAvatar = {
  encode(message: MsgUpdateUserAvatar, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateUserAvatar {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateUserAvatar();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.url = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateUserAvatar {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      url: isSet(object.url) ? String(object.url) : "",
    };
  },

  toJSON(message: MsgUpdateUserAvatar): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.url !== undefined && (obj.url = message.url);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateUserAvatar>, I>>(object: I): MsgUpdateUserAvatar {
    const message = createBaseMsgUpdateUserAvatar();
    message.creator = object.creator ?? "";
    message.url = object.url ?? "";
    return message;
  },
};

function createBaseMsgUpdateUserAvatarResponse(): MsgUpdateUserAvatarResponse {
  return {};
}

export const MsgUpdateUserAvatarResponse = {
  encode(_: MsgUpdateUserAvatarResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateUserAvatarResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateUserAvatarResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateUserAvatarResponse {
    return {};
  },

  toJSON(_: MsgUpdateUserAvatarResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateUserAvatarResponse>, I>>(_: I): MsgUpdateUserAvatarResponse {
    const message = createBaseMsgUpdateUserAvatarResponse();
    return message;
  },
};

function createBaseMsgDeleteUser(): MsgDeleteUser {
  return { creator: "", id: "" };
}

export const MsgDeleteUser = {
  encode(message: MsgDeleteUser, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteUser {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteUser {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: MsgDeleteUser): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteUser>, I>>(object: I): MsgDeleteUser {
    const message = createBaseMsgDeleteUser();
    message.creator = object.creator ?? "";
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseMsgDeleteUserResponse(): MsgDeleteUserResponse {
  return {};
}

export const MsgDeleteUserResponse = {
  encode(_: MsgDeleteUserResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteUserResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteUserResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgDeleteUserResponse {
    return {};
  },

  toJSON(_: MsgDeleteUserResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteUserResponse>, I>>(_: I): MsgDeleteUserResponse {
    const message = createBaseMsgDeleteUserResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** this line is used by starport scaffolding # proto/tx/rpc */
  ToggleForcePush(request: MsgToggleForcePush): Promise<MsgToggleForcePushResponse>;
  RevokeProviderPermission(request: MsgRevokeProviderPermission): Promise<MsgRevokeProviderPermissionResponse>;
  AuthorizeProvider(request: MsgAuthorizeProvider): Promise<MsgAuthorizeProviderResponse>;
  CreateTask(request: MsgCreateTask): Promise<MsgCreateTaskResponse>;
  UpdateTask(request: MsgUpdateTask): Promise<MsgUpdateTaskResponse>;
  DeleteTask(request: MsgDeleteTask): Promise<MsgDeleteTaskResponse>;
  SetBranch(request: MsgSetBranch): Promise<MsgSetBranchResponse>;
  MultiSetBranch(request: MsgMultiSetBranch): Promise<MsgMultiSetBranchResponse>;
  DeleteBranch(request: MsgDeleteBranch): Promise<MsgDeleteBranchResponse>;
  MultiDeleteBranch(request: MsgMultiDeleteBranch): Promise<MsgMultiDeleteBranchResponse>;
  SetTag(request: MsgSetTag): Promise<MsgSetTagResponse>;
  MultiSetTag(request: MsgMultiSetTag): Promise<MsgMultiSetTagResponse>;
  DeleteTag(request: MsgDeleteTag): Promise<MsgDeleteTagResponse>;
  MultiDeleteTag(request: MsgMultiDeleteTag): Promise<MsgMultiDeleteTagResponse>;
  AddMember(request: MsgAddMember): Promise<MsgAddMemberResponse>;
  UpdateMemberRole(request: MsgUpdateMemberRole): Promise<MsgUpdateMemberRoleResponse>;
  RemoveMember(request: MsgRemoveMember): Promise<MsgRemoveMemberResponse>;
  CreateBounty(request: MsgCreateBounty): Promise<MsgCreateBountyResponse>;
  UpdateBountyExpiry(request: MsgUpdateBountyExpiry): Promise<MsgUpdateBountyExpiryResponse>;
  CloseBounty(request: MsgCloseBounty): Promise<MsgCloseBountyResponse>;
  DeleteBounty(request: MsgDeleteBounty): Promise<MsgDeleteBountyResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  Exercise(request: MsgExercise): Promise<MsgExerciseResponse>;
  CreateRelease(request: MsgCreateRelease): Promise<MsgCreateReleaseResponse>;
  UpdateRelease(request: MsgUpdateRelease): Promise<MsgUpdateReleaseResponse>;
  DeleteRelease(request: MsgDeleteRelease): Promise<MsgDeleteReleaseResponse>;
  CreatePullRequest(request: MsgCreatePullRequest): Promise<MsgCreatePullRequestResponse>;
  UpdatePullRequestTitle(request: MsgUpdatePullRequestTitle): Promise<MsgUpdatePullRequestTitleResponse>;
  UpdatePullRequestDescription(
    request: MsgUpdatePullRequestDescription,
  ): Promise<MsgUpdatePullRequestDescriptionResponse>;
  InvokeMergePullRequest(request: MsgInvokeMergePullRequest): Promise<MsgInvokeMergePullRequestResponse>;
  SetPullRequestState(request: MsgSetPullRequestState): Promise<MsgSetPullRequestStateResponse>;
  AddPullRequestReviewers(request: MsgAddPullRequestReviewers): Promise<MsgAddPullRequestReviewersResponse>;
  RemovePullRequestReviewers(request: MsgRemovePullRequestReviewers): Promise<MsgRemovePullRequestReviewersResponse>;
  AddPullRequestAssignees(request: MsgAddPullRequestAssignees): Promise<MsgAddPullRequestAssigneesResponse>;
  RemovePullRequestAssignees(request: MsgRemovePullRequestAssignees): Promise<MsgRemovePullRequestAssigneesResponse>;
  LinkPullRequestIssueByIid(request: MsgLinkPullRequestIssueByIid): Promise<MsgLinkPullRequestIssueByIidResponse>;
  UnlinkPullRequestIssueByIid(request: MsgUnlinkPullRequestIssueByIid): Promise<MsgUnlinkPullRequestIssueByIidResponse>;
  AddPullRequestLabels(request: MsgAddPullRequestLabels): Promise<MsgAddPullRequestLabelsResponse>;
  RemovePullRequestLabels(request: MsgRemovePullRequestLabels): Promise<MsgRemovePullRequestLabelsResponse>;
  DeletePullRequest(request: MsgDeletePullRequest): Promise<MsgDeletePullRequestResponse>;
  CreateDao(request: MsgCreateDao): Promise<MsgCreateDaoResponse>;
  RenameDao(request: MsgRenameDao): Promise<MsgRenameDaoResponse>;
  UpdateDaoDescription(request: MsgUpdateDaoDescription): Promise<MsgUpdateDaoDescriptionResponse>;
  UpdateDaoWebsite(request: MsgUpdateDaoWebsite): Promise<MsgUpdateDaoWebsiteResponse>;
  UpdateDaoLocation(request: MsgUpdateDaoLocation): Promise<MsgUpdateDaoLocationResponse>;
  UpdateDaoAvatar(request: MsgUpdateDaoAvatar): Promise<MsgUpdateDaoAvatarResponse>;
  DeleteDao(request: MsgDeleteDao): Promise<MsgDeleteDaoResponse>;
  CreateComment(request: MsgCreateComment): Promise<MsgCreateCommentResponse>;
  UpdateComment(request: MsgUpdateComment): Promise<MsgUpdateCommentResponse>;
  DeleteComment(request: MsgDeleteComment): Promise<MsgDeleteCommentResponse>;
  CreateIssue(request: MsgCreateIssue): Promise<MsgCreateIssueResponse>;
  UpdateIssueTitle(request: MsgUpdateIssueTitle): Promise<MsgUpdateIssueTitleResponse>;
  UpdateIssueDescription(request: MsgUpdateIssueDescription): Promise<MsgUpdateIssueDescriptionResponse>;
  ToggleIssueState(request: MsgToggleIssueState): Promise<MsgToggleIssueStateResponse>;
  AddIssueAssignees(request: MsgAddIssueAssignees): Promise<MsgAddIssueAssigneesResponse>;
  RemoveIssueAssignees(request: MsgRemoveIssueAssignees): Promise<MsgRemoveIssueAssigneesResponse>;
  AddIssueLabels(request: MsgAddIssueLabels): Promise<MsgAddIssueLabelsResponse>;
  RemoveIssueLabels(request: MsgRemoveIssueLabels): Promise<MsgRemoveIssueLabelsResponse>;
  DeleteIssue(request: MsgDeleteIssue): Promise<MsgDeleteIssueResponse>;
  CreateRepository(request: MsgCreateRepository): Promise<MsgCreateRepositoryResponse>;
  InvokeForkRepository(request: MsgInvokeForkRepository): Promise<MsgInvokeForkRepositoryResponse>;
  ForkRepository(request: MsgForkRepository): Promise<MsgForkRepositoryResponse>;
  ForkRepositorySuccess(request: MsgForkRepositorySuccess): Promise<MsgForkRepositorySuccessResponse>;
  RenameRepository(request: MsgRenameRepository): Promise<MsgRenameRepositoryResponse>;
  UpdateRepositoryDescription(request: MsgUpdateRepositoryDescription): Promise<MsgUpdateRepositoryDescriptionResponse>;
  ChangeOwner(request: MsgChangeOwner): Promise<MsgChangeOwnerResponse>;
  UpdateRepositoryCollaborator(
    request: MsgUpdateRepositoryCollaborator,
  ): Promise<MsgUpdateRepositoryCollaboratorResponse>;
  RemoveRepositoryCollaborator(
    request: MsgRemoveRepositoryCollaborator,
  ): Promise<MsgRemoveRepositoryCollaboratorResponse>;
  CreateRepositoryLabel(request: MsgCreateRepositoryLabel): Promise<MsgCreateRepositoryLabelResponse>;
  UpdateRepositoryLabel(request: MsgUpdateRepositoryLabel): Promise<MsgUpdateRepositoryLabelResponse>;
  DeleteRepositoryLabel(request: MsgDeleteRepositoryLabel): Promise<MsgDeleteRepositoryLabelResponse>;
  SetDefaultBranch(request: MsgSetDefaultBranch): Promise<MsgSetDefaultBranchResponse>;
  ToggleRepositoryForking(request: MsgToggleRepositoryForking): Promise<MsgToggleRepositoryForkingResponse>;
  ToggleArweaveBackup(request: MsgToggleArweaveBackup): Promise<MsgToggleArweaveBackupResponse>;
  DeleteRepository(request: MsgDeleteRepository): Promise<MsgDeleteRepositoryResponse>;
  CreateUser(request: MsgCreateUser): Promise<MsgCreateUserResponse>;
  UpdateUserUsername(request: MsgUpdateUserUsername): Promise<MsgUpdateUserUsernameResponse>;
  UpdateUserName(request: MsgUpdateUserName): Promise<MsgUpdateUserNameResponse>;
  UpdateUserBio(request: MsgUpdateUserBio): Promise<MsgUpdateUserBioResponse>;
  UpdateUserAvatar(request: MsgUpdateUserAvatar): Promise<MsgUpdateUserAvatarResponse>;
  DeleteUser(request: MsgDeleteUser): Promise<MsgDeleteUserResponse>;
  /** rpc TransferUser(MsgTransferUser) returns (MsgTransferUserResponse); */
  UpdateRepositoryBackupRef(request: MsgUpdateRepositoryBackupRef): Promise<MsgUpdateRepositoryBackupRefResponse>;
  AddRepositoryBackupRef(request: MsgAddRepositoryBackupRef): Promise<MsgAddRepositoryBackupRefResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ToggleForcePush = this.ToggleForcePush.bind(this);
    this.RevokeProviderPermission = this.RevokeProviderPermission.bind(this);
    this.AuthorizeProvider = this.AuthorizeProvider.bind(this);
    this.CreateTask = this.CreateTask.bind(this);
    this.UpdateTask = this.UpdateTask.bind(this);
    this.DeleteTask = this.DeleteTask.bind(this);
    this.SetBranch = this.SetBranch.bind(this);
    this.MultiSetBranch = this.MultiSetBranch.bind(this);
    this.DeleteBranch = this.DeleteBranch.bind(this);
    this.MultiDeleteBranch = this.MultiDeleteBranch.bind(this);
    this.SetTag = this.SetTag.bind(this);
    this.MultiSetTag = this.MultiSetTag.bind(this);
    this.DeleteTag = this.DeleteTag.bind(this);
    this.MultiDeleteTag = this.MultiDeleteTag.bind(this);
    this.AddMember = this.AddMember.bind(this);
    this.UpdateMemberRole = this.UpdateMemberRole.bind(this);
    this.RemoveMember = this.RemoveMember.bind(this);
    this.CreateBounty = this.CreateBounty.bind(this);
    this.UpdateBountyExpiry = this.UpdateBountyExpiry.bind(this);
    this.CloseBounty = this.CloseBounty.bind(this);
    this.DeleteBounty = this.DeleteBounty.bind(this);
    this.Exercise = this.Exercise.bind(this);
    this.CreateRelease = this.CreateRelease.bind(this);
    this.UpdateRelease = this.UpdateRelease.bind(this);
    this.DeleteRelease = this.DeleteRelease.bind(this);
    this.CreatePullRequest = this.CreatePullRequest.bind(this);
    this.UpdatePullRequestTitle = this.UpdatePullRequestTitle.bind(this);
    this.UpdatePullRequestDescription = this.UpdatePullRequestDescription.bind(this);
    this.InvokeMergePullRequest = this.InvokeMergePullRequest.bind(this);
    this.SetPullRequestState = this.SetPullRequestState.bind(this);
    this.AddPullRequestReviewers = this.AddPullRequestReviewers.bind(this);
    this.RemovePullRequestReviewers = this.RemovePullRequestReviewers.bind(this);
    this.AddPullRequestAssignees = this.AddPullRequestAssignees.bind(this);
    this.RemovePullRequestAssignees = this.RemovePullRequestAssignees.bind(this);
    this.LinkPullRequestIssueByIid = this.LinkPullRequestIssueByIid.bind(this);
    this.UnlinkPullRequestIssueByIid = this.UnlinkPullRequestIssueByIid.bind(this);
    this.AddPullRequestLabels = this.AddPullRequestLabels.bind(this);
    this.RemovePullRequestLabels = this.RemovePullRequestLabels.bind(this);
    this.DeletePullRequest = this.DeletePullRequest.bind(this);
    this.CreateDao = this.CreateDao.bind(this);
    this.RenameDao = this.RenameDao.bind(this);
    this.UpdateDaoDescription = this.UpdateDaoDescription.bind(this);
    this.UpdateDaoWebsite = this.UpdateDaoWebsite.bind(this);
    this.UpdateDaoLocation = this.UpdateDaoLocation.bind(this);
    this.UpdateDaoAvatar = this.UpdateDaoAvatar.bind(this);
    this.DeleteDao = this.DeleteDao.bind(this);
    this.CreateComment = this.CreateComment.bind(this);
    this.UpdateComment = this.UpdateComment.bind(this);
    this.DeleteComment = this.DeleteComment.bind(this);
    this.CreateIssue = this.CreateIssue.bind(this);
    this.UpdateIssueTitle = this.UpdateIssueTitle.bind(this);
    this.UpdateIssueDescription = this.UpdateIssueDescription.bind(this);
    this.ToggleIssueState = this.ToggleIssueState.bind(this);
    this.AddIssueAssignees = this.AddIssueAssignees.bind(this);
    this.RemoveIssueAssignees = this.RemoveIssueAssignees.bind(this);
    this.AddIssueLabels = this.AddIssueLabels.bind(this);
    this.RemoveIssueLabels = this.RemoveIssueLabels.bind(this);
    this.DeleteIssue = this.DeleteIssue.bind(this);
    this.CreateRepository = this.CreateRepository.bind(this);
    this.InvokeForkRepository = this.InvokeForkRepository.bind(this);
    this.ForkRepository = this.ForkRepository.bind(this);
    this.ForkRepositorySuccess = this.ForkRepositorySuccess.bind(this);
    this.RenameRepository = this.RenameRepository.bind(this);
    this.UpdateRepositoryDescription = this.UpdateRepositoryDescription.bind(this);
    this.ChangeOwner = this.ChangeOwner.bind(this);
    this.UpdateRepositoryCollaborator = this.UpdateRepositoryCollaborator.bind(this);
    this.RemoveRepositoryCollaborator = this.RemoveRepositoryCollaborator.bind(this);
    this.CreateRepositoryLabel = this.CreateRepositoryLabel.bind(this);
    this.UpdateRepositoryLabel = this.UpdateRepositoryLabel.bind(this);
    this.DeleteRepositoryLabel = this.DeleteRepositoryLabel.bind(this);
    this.SetDefaultBranch = this.SetDefaultBranch.bind(this);
    this.ToggleRepositoryForking = this.ToggleRepositoryForking.bind(this);
    this.ToggleArweaveBackup = this.ToggleArweaveBackup.bind(this);
    this.DeleteRepository = this.DeleteRepository.bind(this);
    this.CreateUser = this.CreateUser.bind(this);
    this.UpdateUserUsername = this.UpdateUserUsername.bind(this);
    this.UpdateUserName = this.UpdateUserName.bind(this);
    this.UpdateUserBio = this.UpdateUserBio.bind(this);
    this.UpdateUserAvatar = this.UpdateUserAvatar.bind(this);
    this.DeleteUser = this.DeleteUser.bind(this);
    this.UpdateRepositoryBackupRef = this.UpdateRepositoryBackupRef.bind(this);
    this.AddRepositoryBackupRef = this.AddRepositoryBackupRef.bind(this);
  }
  ToggleForcePush(request: MsgToggleForcePush): Promise<MsgToggleForcePushResponse> {
    const data = MsgToggleForcePush.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "ToggleForcePush", data);
    return promise.then((data) => MsgToggleForcePushResponse.decode(new _m0.Reader(data)));
  }

  RevokeProviderPermission(request: MsgRevokeProviderPermission): Promise<MsgRevokeProviderPermissionResponse> {
    const data = MsgRevokeProviderPermission.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "RevokeProviderPermission", data);
    return promise.then((data) => MsgRevokeProviderPermissionResponse.decode(new _m0.Reader(data)));
  }

  AuthorizeProvider(request: MsgAuthorizeProvider): Promise<MsgAuthorizeProviderResponse> {
    const data = MsgAuthorizeProvider.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "AuthorizeProvider", data);
    return promise.then((data) => MsgAuthorizeProviderResponse.decode(new _m0.Reader(data)));
  }

  CreateTask(request: MsgCreateTask): Promise<MsgCreateTaskResponse> {
    const data = MsgCreateTask.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "CreateTask", data);
    return promise.then((data) => MsgCreateTaskResponse.decode(new _m0.Reader(data)));
  }

  UpdateTask(request: MsgUpdateTask): Promise<MsgUpdateTaskResponse> {
    const data = MsgUpdateTask.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateTask", data);
    return promise.then((data) => MsgUpdateTaskResponse.decode(new _m0.Reader(data)));
  }

  DeleteTask(request: MsgDeleteTask): Promise<MsgDeleteTaskResponse> {
    const data = MsgDeleteTask.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "DeleteTask", data);
    return promise.then((data) => MsgDeleteTaskResponse.decode(new _m0.Reader(data)));
  }

  SetBranch(request: MsgSetBranch): Promise<MsgSetBranchResponse> {
    const data = MsgSetBranch.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "SetBranch", data);
    return promise.then((data) => MsgSetBranchResponse.decode(new _m0.Reader(data)));
  }

  MultiSetBranch(request: MsgMultiSetBranch): Promise<MsgMultiSetBranchResponse> {
    const data = MsgMultiSetBranch.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "MultiSetBranch", data);
    return promise.then((data) => MsgMultiSetBranchResponse.decode(new _m0.Reader(data)));
  }

  DeleteBranch(request: MsgDeleteBranch): Promise<MsgDeleteBranchResponse> {
    const data = MsgDeleteBranch.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "DeleteBranch", data);
    return promise.then((data) => MsgDeleteBranchResponse.decode(new _m0.Reader(data)));
  }

  MultiDeleteBranch(request: MsgMultiDeleteBranch): Promise<MsgMultiDeleteBranchResponse> {
    const data = MsgMultiDeleteBranch.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "MultiDeleteBranch", data);
    return promise.then((data) => MsgMultiDeleteBranchResponse.decode(new _m0.Reader(data)));
  }

  SetTag(request: MsgSetTag): Promise<MsgSetTagResponse> {
    const data = MsgSetTag.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "SetTag", data);
    return promise.then((data) => MsgSetTagResponse.decode(new _m0.Reader(data)));
  }

  MultiSetTag(request: MsgMultiSetTag): Promise<MsgMultiSetTagResponse> {
    const data = MsgMultiSetTag.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "MultiSetTag", data);
    return promise.then((data) => MsgMultiSetTagResponse.decode(new _m0.Reader(data)));
  }

  DeleteTag(request: MsgDeleteTag): Promise<MsgDeleteTagResponse> {
    const data = MsgDeleteTag.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "DeleteTag", data);
    return promise.then((data) => MsgDeleteTagResponse.decode(new _m0.Reader(data)));
  }

  MultiDeleteTag(request: MsgMultiDeleteTag): Promise<MsgMultiDeleteTagResponse> {
    const data = MsgMultiDeleteTag.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "MultiDeleteTag", data);
    return promise.then((data) => MsgMultiDeleteTagResponse.decode(new _m0.Reader(data)));
  }

  AddMember(request: MsgAddMember): Promise<MsgAddMemberResponse> {
    const data = MsgAddMember.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "AddMember", data);
    return promise.then((data) => MsgAddMemberResponse.decode(new _m0.Reader(data)));
  }

  UpdateMemberRole(request: MsgUpdateMemberRole): Promise<MsgUpdateMemberRoleResponse> {
    const data = MsgUpdateMemberRole.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateMemberRole", data);
    return promise.then((data) => MsgUpdateMemberRoleResponse.decode(new _m0.Reader(data)));
  }

  RemoveMember(request: MsgRemoveMember): Promise<MsgRemoveMemberResponse> {
    const data = MsgRemoveMember.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "RemoveMember", data);
    return promise.then((data) => MsgRemoveMemberResponse.decode(new _m0.Reader(data)));
  }

  CreateBounty(request: MsgCreateBounty): Promise<MsgCreateBountyResponse> {
    const data = MsgCreateBounty.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "CreateBounty", data);
    return promise.then((data) => MsgCreateBountyResponse.decode(new _m0.Reader(data)));
  }

  UpdateBountyExpiry(request: MsgUpdateBountyExpiry): Promise<MsgUpdateBountyExpiryResponse> {
    const data = MsgUpdateBountyExpiry.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateBountyExpiry", data);
    return promise.then((data) => MsgUpdateBountyExpiryResponse.decode(new _m0.Reader(data)));
  }

  CloseBounty(request: MsgCloseBounty): Promise<MsgCloseBountyResponse> {
    const data = MsgCloseBounty.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "CloseBounty", data);
    return promise.then((data) => MsgCloseBountyResponse.decode(new _m0.Reader(data)));
  }

  DeleteBounty(request: MsgDeleteBounty): Promise<MsgDeleteBountyResponse> {
    const data = MsgDeleteBounty.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "DeleteBounty", data);
    return promise.then((data) => MsgDeleteBountyResponse.decode(new _m0.Reader(data)));
  }

  Exercise(request: MsgExercise): Promise<MsgExerciseResponse> {
    const data = MsgExercise.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "Exercise", data);
    return promise.then((data) => MsgExerciseResponse.decode(new _m0.Reader(data)));
  }

  CreateRelease(request: MsgCreateRelease): Promise<MsgCreateReleaseResponse> {
    const data = MsgCreateRelease.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "CreateRelease", data);
    return promise.then((data) => MsgCreateReleaseResponse.decode(new _m0.Reader(data)));
  }

  UpdateRelease(request: MsgUpdateRelease): Promise<MsgUpdateReleaseResponse> {
    const data = MsgUpdateRelease.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateRelease", data);
    return promise.then((data) => MsgUpdateReleaseResponse.decode(new _m0.Reader(data)));
  }

  DeleteRelease(request: MsgDeleteRelease): Promise<MsgDeleteReleaseResponse> {
    const data = MsgDeleteRelease.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "DeleteRelease", data);
    return promise.then((data) => MsgDeleteReleaseResponse.decode(new _m0.Reader(data)));
  }

  CreatePullRequest(request: MsgCreatePullRequest): Promise<MsgCreatePullRequestResponse> {
    const data = MsgCreatePullRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "CreatePullRequest", data);
    return promise.then((data) => MsgCreatePullRequestResponse.decode(new _m0.Reader(data)));
  }

  UpdatePullRequestTitle(request: MsgUpdatePullRequestTitle): Promise<MsgUpdatePullRequestTitleResponse> {
    const data = MsgUpdatePullRequestTitle.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdatePullRequestTitle", data);
    return promise.then((data) => MsgUpdatePullRequestTitleResponse.decode(new _m0.Reader(data)));
  }

  UpdatePullRequestDescription(
    request: MsgUpdatePullRequestDescription,
  ): Promise<MsgUpdatePullRequestDescriptionResponse> {
    const data = MsgUpdatePullRequestDescription.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdatePullRequestDescription", data);
    return promise.then((data) => MsgUpdatePullRequestDescriptionResponse.decode(new _m0.Reader(data)));
  }

  InvokeMergePullRequest(request: MsgInvokeMergePullRequest): Promise<MsgInvokeMergePullRequestResponse> {
    const data = MsgInvokeMergePullRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "InvokeMergePullRequest", data);
    return promise.then((data) => MsgInvokeMergePullRequestResponse.decode(new _m0.Reader(data)));
  }

  SetPullRequestState(request: MsgSetPullRequestState): Promise<MsgSetPullRequestStateResponse> {
    const data = MsgSetPullRequestState.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "SetPullRequestState", data);
    return promise.then((data) => MsgSetPullRequestStateResponse.decode(new _m0.Reader(data)));
  }

  AddPullRequestReviewers(request: MsgAddPullRequestReviewers): Promise<MsgAddPullRequestReviewersResponse> {
    const data = MsgAddPullRequestReviewers.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "AddPullRequestReviewers", data);
    return promise.then((data) => MsgAddPullRequestReviewersResponse.decode(new _m0.Reader(data)));
  }

  RemovePullRequestReviewers(request: MsgRemovePullRequestReviewers): Promise<MsgRemovePullRequestReviewersResponse> {
    const data = MsgRemovePullRequestReviewers.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "RemovePullRequestReviewers", data);
    return promise.then((data) => MsgRemovePullRequestReviewersResponse.decode(new _m0.Reader(data)));
  }

  AddPullRequestAssignees(request: MsgAddPullRequestAssignees): Promise<MsgAddPullRequestAssigneesResponse> {
    const data = MsgAddPullRequestAssignees.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "AddPullRequestAssignees", data);
    return promise.then((data) => MsgAddPullRequestAssigneesResponse.decode(new _m0.Reader(data)));
  }

  RemovePullRequestAssignees(request: MsgRemovePullRequestAssignees): Promise<MsgRemovePullRequestAssigneesResponse> {
    const data = MsgRemovePullRequestAssignees.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "RemovePullRequestAssignees", data);
    return promise.then((data) => MsgRemovePullRequestAssigneesResponse.decode(new _m0.Reader(data)));
  }

  LinkPullRequestIssueByIid(request: MsgLinkPullRequestIssueByIid): Promise<MsgLinkPullRequestIssueByIidResponse> {
    const data = MsgLinkPullRequestIssueByIid.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "LinkPullRequestIssueByIid", data);
    return promise.then((data) => MsgLinkPullRequestIssueByIidResponse.decode(new _m0.Reader(data)));
  }

  UnlinkPullRequestIssueByIid(
    request: MsgUnlinkPullRequestIssueByIid,
  ): Promise<MsgUnlinkPullRequestIssueByIidResponse> {
    const data = MsgUnlinkPullRequestIssueByIid.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UnlinkPullRequestIssueByIid", data);
    return promise.then((data) => MsgUnlinkPullRequestIssueByIidResponse.decode(new _m0.Reader(data)));
  }

  AddPullRequestLabels(request: MsgAddPullRequestLabels): Promise<MsgAddPullRequestLabelsResponse> {
    const data = MsgAddPullRequestLabels.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "AddPullRequestLabels", data);
    return promise.then((data) => MsgAddPullRequestLabelsResponse.decode(new _m0.Reader(data)));
  }

  RemovePullRequestLabels(request: MsgRemovePullRequestLabels): Promise<MsgRemovePullRequestLabelsResponse> {
    const data = MsgRemovePullRequestLabels.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "RemovePullRequestLabels", data);
    return promise.then((data) => MsgRemovePullRequestLabelsResponse.decode(new _m0.Reader(data)));
  }

  DeletePullRequest(request: MsgDeletePullRequest): Promise<MsgDeletePullRequestResponse> {
    const data = MsgDeletePullRequest.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "DeletePullRequest", data);
    return promise.then((data) => MsgDeletePullRequestResponse.decode(new _m0.Reader(data)));
  }

  CreateDao(request: MsgCreateDao): Promise<MsgCreateDaoResponse> {
    const data = MsgCreateDao.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "CreateDao", data);
    return promise.then((data) => MsgCreateDaoResponse.decode(new _m0.Reader(data)));
  }

  RenameDao(request: MsgRenameDao): Promise<MsgRenameDaoResponse> {
    const data = MsgRenameDao.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "RenameDao", data);
    return promise.then((data) => MsgRenameDaoResponse.decode(new _m0.Reader(data)));
  }

  UpdateDaoDescription(request: MsgUpdateDaoDescription): Promise<MsgUpdateDaoDescriptionResponse> {
    const data = MsgUpdateDaoDescription.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateDaoDescription", data);
    return promise.then((data) => MsgUpdateDaoDescriptionResponse.decode(new _m0.Reader(data)));
  }

  UpdateDaoWebsite(request: MsgUpdateDaoWebsite): Promise<MsgUpdateDaoWebsiteResponse> {
    const data = MsgUpdateDaoWebsite.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateDaoWebsite", data);
    return promise.then((data) => MsgUpdateDaoWebsiteResponse.decode(new _m0.Reader(data)));
  }

  UpdateDaoLocation(request: MsgUpdateDaoLocation): Promise<MsgUpdateDaoLocationResponse> {
    const data = MsgUpdateDaoLocation.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateDaoLocation", data);
    return promise.then((data) => MsgUpdateDaoLocationResponse.decode(new _m0.Reader(data)));
  }

  UpdateDaoAvatar(request: MsgUpdateDaoAvatar): Promise<MsgUpdateDaoAvatarResponse> {
    const data = MsgUpdateDaoAvatar.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateDaoAvatar", data);
    return promise.then((data) => MsgUpdateDaoAvatarResponse.decode(new _m0.Reader(data)));
  }

  DeleteDao(request: MsgDeleteDao): Promise<MsgDeleteDaoResponse> {
    const data = MsgDeleteDao.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "DeleteDao", data);
    return promise.then((data) => MsgDeleteDaoResponse.decode(new _m0.Reader(data)));
  }

  CreateComment(request: MsgCreateComment): Promise<MsgCreateCommentResponse> {
    const data = MsgCreateComment.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "CreateComment", data);
    return promise.then((data) => MsgCreateCommentResponse.decode(new _m0.Reader(data)));
  }

  UpdateComment(request: MsgUpdateComment): Promise<MsgUpdateCommentResponse> {
    const data = MsgUpdateComment.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateComment", data);
    return promise.then((data) => MsgUpdateCommentResponse.decode(new _m0.Reader(data)));
  }

  DeleteComment(request: MsgDeleteComment): Promise<MsgDeleteCommentResponse> {
    const data = MsgDeleteComment.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "DeleteComment", data);
    return promise.then((data) => MsgDeleteCommentResponse.decode(new _m0.Reader(data)));
  }

  CreateIssue(request: MsgCreateIssue): Promise<MsgCreateIssueResponse> {
    const data = MsgCreateIssue.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "CreateIssue", data);
    return promise.then((data) => MsgCreateIssueResponse.decode(new _m0.Reader(data)));
  }

  UpdateIssueTitle(request: MsgUpdateIssueTitle): Promise<MsgUpdateIssueTitleResponse> {
    const data = MsgUpdateIssueTitle.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateIssueTitle", data);
    return promise.then((data) => MsgUpdateIssueTitleResponse.decode(new _m0.Reader(data)));
  }

  UpdateIssueDescription(request: MsgUpdateIssueDescription): Promise<MsgUpdateIssueDescriptionResponse> {
    const data = MsgUpdateIssueDescription.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateIssueDescription", data);
    return promise.then((data) => MsgUpdateIssueDescriptionResponse.decode(new _m0.Reader(data)));
  }

  ToggleIssueState(request: MsgToggleIssueState): Promise<MsgToggleIssueStateResponse> {
    const data = MsgToggleIssueState.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "ToggleIssueState", data);
    return promise.then((data) => MsgToggleIssueStateResponse.decode(new _m0.Reader(data)));
  }

  AddIssueAssignees(request: MsgAddIssueAssignees): Promise<MsgAddIssueAssigneesResponse> {
    const data = MsgAddIssueAssignees.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "AddIssueAssignees", data);
    return promise.then((data) => MsgAddIssueAssigneesResponse.decode(new _m0.Reader(data)));
  }

  RemoveIssueAssignees(request: MsgRemoveIssueAssignees): Promise<MsgRemoveIssueAssigneesResponse> {
    const data = MsgRemoveIssueAssignees.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "RemoveIssueAssignees", data);
    return promise.then((data) => MsgRemoveIssueAssigneesResponse.decode(new _m0.Reader(data)));
  }

  AddIssueLabels(request: MsgAddIssueLabels): Promise<MsgAddIssueLabelsResponse> {
    const data = MsgAddIssueLabels.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "AddIssueLabels", data);
    return promise.then((data) => MsgAddIssueLabelsResponse.decode(new _m0.Reader(data)));
  }

  RemoveIssueLabels(request: MsgRemoveIssueLabels): Promise<MsgRemoveIssueLabelsResponse> {
    const data = MsgRemoveIssueLabels.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "RemoveIssueLabels", data);
    return promise.then((data) => MsgRemoveIssueLabelsResponse.decode(new _m0.Reader(data)));
  }

  DeleteIssue(request: MsgDeleteIssue): Promise<MsgDeleteIssueResponse> {
    const data = MsgDeleteIssue.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "DeleteIssue", data);
    return promise.then((data) => MsgDeleteIssueResponse.decode(new _m0.Reader(data)));
  }

  CreateRepository(request: MsgCreateRepository): Promise<MsgCreateRepositoryResponse> {
    const data = MsgCreateRepository.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "CreateRepository", data);
    return promise.then((data) => MsgCreateRepositoryResponse.decode(new _m0.Reader(data)));
  }

  InvokeForkRepository(request: MsgInvokeForkRepository): Promise<MsgInvokeForkRepositoryResponse> {
    const data = MsgInvokeForkRepository.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "InvokeForkRepository", data);
    return promise.then((data) => MsgInvokeForkRepositoryResponse.decode(new _m0.Reader(data)));
  }

  ForkRepository(request: MsgForkRepository): Promise<MsgForkRepositoryResponse> {
    const data = MsgForkRepository.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "ForkRepository", data);
    return promise.then((data) => MsgForkRepositoryResponse.decode(new _m0.Reader(data)));
  }

  ForkRepositorySuccess(request: MsgForkRepositorySuccess): Promise<MsgForkRepositorySuccessResponse> {
    const data = MsgForkRepositorySuccess.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "ForkRepositorySuccess", data);
    return promise.then((data) => MsgForkRepositorySuccessResponse.decode(new _m0.Reader(data)));
  }

  RenameRepository(request: MsgRenameRepository): Promise<MsgRenameRepositoryResponse> {
    const data = MsgRenameRepository.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "RenameRepository", data);
    return promise.then((data) => MsgRenameRepositoryResponse.decode(new _m0.Reader(data)));
  }

  UpdateRepositoryDescription(
    request: MsgUpdateRepositoryDescription,
  ): Promise<MsgUpdateRepositoryDescriptionResponse> {
    const data = MsgUpdateRepositoryDescription.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateRepositoryDescription", data);
    return promise.then((data) => MsgUpdateRepositoryDescriptionResponse.decode(new _m0.Reader(data)));
  }

  ChangeOwner(request: MsgChangeOwner): Promise<MsgChangeOwnerResponse> {
    const data = MsgChangeOwner.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "ChangeOwner", data);
    return promise.then((data) => MsgChangeOwnerResponse.decode(new _m0.Reader(data)));
  }

  UpdateRepositoryCollaborator(
    request: MsgUpdateRepositoryCollaborator,
  ): Promise<MsgUpdateRepositoryCollaboratorResponse> {
    const data = MsgUpdateRepositoryCollaborator.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateRepositoryCollaborator", data);
    return promise.then((data) => MsgUpdateRepositoryCollaboratorResponse.decode(new _m0.Reader(data)));
  }

  RemoveRepositoryCollaborator(
    request: MsgRemoveRepositoryCollaborator,
  ): Promise<MsgRemoveRepositoryCollaboratorResponse> {
    const data = MsgRemoveRepositoryCollaborator.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "RemoveRepositoryCollaborator", data);
    return promise.then((data) => MsgRemoveRepositoryCollaboratorResponse.decode(new _m0.Reader(data)));
  }

  CreateRepositoryLabel(request: MsgCreateRepositoryLabel): Promise<MsgCreateRepositoryLabelResponse> {
    const data = MsgCreateRepositoryLabel.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "CreateRepositoryLabel", data);
    return promise.then((data) => MsgCreateRepositoryLabelResponse.decode(new _m0.Reader(data)));
  }

  UpdateRepositoryLabel(request: MsgUpdateRepositoryLabel): Promise<MsgUpdateRepositoryLabelResponse> {
    const data = MsgUpdateRepositoryLabel.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateRepositoryLabel", data);
    return promise.then((data) => MsgUpdateRepositoryLabelResponse.decode(new _m0.Reader(data)));
  }

  DeleteRepositoryLabel(request: MsgDeleteRepositoryLabel): Promise<MsgDeleteRepositoryLabelResponse> {
    const data = MsgDeleteRepositoryLabel.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "DeleteRepositoryLabel", data);
    return promise.then((data) => MsgDeleteRepositoryLabelResponse.decode(new _m0.Reader(data)));
  }

  SetDefaultBranch(request: MsgSetDefaultBranch): Promise<MsgSetDefaultBranchResponse> {
    const data = MsgSetDefaultBranch.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "SetDefaultBranch", data);
    return promise.then((data) => MsgSetDefaultBranchResponse.decode(new _m0.Reader(data)));
  }

  ToggleRepositoryForking(request: MsgToggleRepositoryForking): Promise<MsgToggleRepositoryForkingResponse> {
    const data = MsgToggleRepositoryForking.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "ToggleRepositoryForking", data);
    return promise.then((data) => MsgToggleRepositoryForkingResponse.decode(new _m0.Reader(data)));
  }

  ToggleArweaveBackup(request: MsgToggleArweaveBackup): Promise<MsgToggleArweaveBackupResponse> {
    const data = MsgToggleArweaveBackup.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "ToggleArweaveBackup", data);
    return promise.then((data) => MsgToggleArweaveBackupResponse.decode(new _m0.Reader(data)));
  }

  DeleteRepository(request: MsgDeleteRepository): Promise<MsgDeleteRepositoryResponse> {
    const data = MsgDeleteRepository.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "DeleteRepository", data);
    return promise.then((data) => MsgDeleteRepositoryResponse.decode(new _m0.Reader(data)));
  }

  CreateUser(request: MsgCreateUser): Promise<MsgCreateUserResponse> {
    const data = MsgCreateUser.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "CreateUser", data);
    return promise.then((data) => MsgCreateUserResponse.decode(new _m0.Reader(data)));
  }

  UpdateUserUsername(request: MsgUpdateUserUsername): Promise<MsgUpdateUserUsernameResponse> {
    const data = MsgUpdateUserUsername.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateUserUsername", data);
    return promise.then((data) => MsgUpdateUserUsernameResponse.decode(new _m0.Reader(data)));
  }

  UpdateUserName(request: MsgUpdateUserName): Promise<MsgUpdateUserNameResponse> {
    const data = MsgUpdateUserName.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateUserName", data);
    return promise.then((data) => MsgUpdateUserNameResponse.decode(new _m0.Reader(data)));
  }

  UpdateUserBio(request: MsgUpdateUserBio): Promise<MsgUpdateUserBioResponse> {
    const data = MsgUpdateUserBio.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateUserBio", data);
    return promise.then((data) => MsgUpdateUserBioResponse.decode(new _m0.Reader(data)));
  }

  UpdateUserAvatar(request: MsgUpdateUserAvatar): Promise<MsgUpdateUserAvatarResponse> {
    const data = MsgUpdateUserAvatar.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateUserAvatar", data);
    return promise.then((data) => MsgUpdateUserAvatarResponse.decode(new _m0.Reader(data)));
  }

  DeleteUser(request: MsgDeleteUser): Promise<MsgDeleteUserResponse> {
    const data = MsgDeleteUser.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "DeleteUser", data);
    return promise.then((data) => MsgDeleteUserResponse.decode(new _m0.Reader(data)));
  }

  UpdateRepositoryBackupRef(request: MsgUpdateRepositoryBackupRef): Promise<MsgUpdateRepositoryBackupRefResponse> {
    const data = MsgUpdateRepositoryBackupRef.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "UpdateRepositoryBackupRef", data);
    return promise.then((data) => MsgUpdateRepositoryBackupRefResponse.decode(new _m0.Reader(data)));
  }

  AddRepositoryBackupRef(request: MsgAddRepositoryBackupRef): Promise<MsgAddRepositoryBackupRefResponse> {
    const data = MsgAddRepositoryBackupRef.encode(request).finish();
    const promise = this.rpc.request("gitopia.gitopia.gitopia.Msg", "AddRepositoryBackupRef", data);
    return promise.then((data) => MsgAddRepositoryBackupRefResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
