/* eslint-disable */
import {
  TaskType,
  TaskState,
  taskTypeFromJSON,
  taskTypeToJSON,
  taskStateFromJSON,
  taskStateToJSON,
} from "../gitopia/task";
import {
  MemberRole,
  memberRoleFromJSON,
  memberRoleToJSON,
} from "../gitopia/member";
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";
import { RepositoryId } from "../gitopia/repository";

export const protobufPackage = "gitopia.gitopia.gitopia";

export interface MsgRevokeStorageProviderPermissions {
  creator: string;
  provider: string;
}

export interface MsgRevokeStorageProviderPermissionsResponse {}

export interface MsgAuthorizeStorageProvider {
  creator: string;
  provider: string;
}

export interface MsgAuthorizeStorageProviderResponse {}

export interface MsgRevokeGitServerPermissions {
  creator: string;
  provider: string;
}

export interface MsgRevokeGitServerPermissionsResponse {}

export interface MsgAuthorizeGitServer {
  creator: string;
  provider: string;
}

export interface MsgAuthorizeGitServerResponse {}

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

export interface MsgUpdateTaskResponse {}

export interface MsgDeleteTask {
  creator: string;
  id: number;
}

export interface MsgUpdateIpfsBackupRef {
  creator: string;
  repositoryId: RepositoryId | undefined;
  ref: string;
}

export interface MsgUpdateIpfsBackupRefResponse {}

export interface MsgAddArweaveBackupRef {
  creator: string;
  repositoryId: RepositoryId | undefined;
  ref: string;
}

export interface MsgAddArweaveBackupRefResponse {}

export interface MsgDeleteTaskResponse {}

export interface MsgDeleteStorageProviderResponse {}

export interface MsgSetBranch {
  creator: string;
  repositoryId: RepositoryId | undefined;
  branch: MsgSetBranch_Branch | undefined;
}

export interface MsgSetBranch_Branch {
  name: string;
  sha: string;
}

export interface MsgSetBranchResponse {}

export interface MsgSetDefaultBranch {
  creator: string;
  repositoryId: RepositoryId | undefined;
  branch: string;
}

export interface MsgSetDefaultBranchResponse {}

export interface MsgMultiSetBranch {
  creator: string;
  repositoryId: RepositoryId | undefined;
  branches: MsgMultiSetBranch_Branch[];
}

export interface MsgMultiSetBranch_Branch {
  name: string;
  sha: string;
}

export interface MsgMultiSetBranchResponse {}

export interface MsgDeleteBranch {
  creator: string;
  repositoryId: RepositoryId | undefined;
  branch: string;
}

export interface MsgDeleteBranchResponse {}

export interface MsgMultiDeleteBranch {
  creator: string;
  repositoryId: RepositoryId | undefined;
  branches: string[];
}

export interface MsgMultiDeleteBranchResponse {}

export interface MsgSetTag {
  creator: string;
  repositoryId: RepositoryId | undefined;
  tag: MsgSetTag_Tag | undefined;
}

export interface MsgSetTag_Tag {
  name: string;
  sha: string;
}

export interface MsgSetTagResponse {}

export interface MsgMultiSetTag {
  creator: string;
  repositoryId: RepositoryId | undefined;
  tags: MsgMultiSetTag_Tag[];
}

export interface MsgMultiSetTag_Tag {
  name: string;
  sha: string;
}

export interface MsgMultiSetTagResponse {}

export interface MsgDeleteTag {
  creator: string;
  repositoryId: RepositoryId | undefined;
  tag: string;
}

export interface MsgDeleteTagResponse {}

export interface MsgMultiDeleteTag {
  creator: string;
  repositoryId: RepositoryId | undefined;
  tags: string[];
}

export interface MsgMultiDeleteTagResponse {}

export interface MsgAddMember {
  creator: string;
  daoId: string;
  userId: string;
  role: MemberRole;
}

export interface MsgAddMemberResponse {}

export interface MsgUpdateMemberRole {
  creator: string;
  daoId: string;
  userId: string;
  role: MemberRole;
}

export interface MsgUpdateMemberRoleResponse {}

export interface MsgRemoveMember {
  creator: string;
  daoId: string;
  userId: string;
}

export interface MsgRemoveMemberResponse {}

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

export interface MsgUpdateReleaseResponse {}

export interface MsgDeleteRelease {
  creator: string;
  id: number;
}

export interface MsgDeleteReleaseResponse {}

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
}

export interface MsgCreatePullRequestResponse {
  id: number;
  iid: number;
}

export interface MsgUpdatePullRequestTitle {
  creator: string;
  id: number;
  title: string;
}

export interface MsgUpdatePullRequestTitleResponse {}

export interface MsgUpdatePullRequestDescription {
  creator: string;
  id: number;
  description: string;
}

export interface MsgUpdatePullRequestDescriptionResponse {}

export interface MsgInvokeMergePullRequest {
  creator: string;
  id: number;
  provider: string;
}

export interface MsgInvokeMergePullRequestResponse {}

export interface MsgSetPullRequestState {
  creator: string;
  id: number;
  state: string;
  mergeCommitSha: string;
  taskId: number;
}

export interface MsgSetPullRequestStateResponse {
  state: string;
}

export interface MsgAddPullRequestReviewers {
  creator: string;
  id: number;
  reviewers: string[];
}

export interface MsgAddPullRequestReviewersResponse {}

export interface MsgRemovePullRequestReviewers {
  creator: string;
  id: number;
  reviewers: string[];
}

export interface MsgRemovePullRequestReviewersResponse {}

export interface MsgAddPullRequestAssignees {
  creator: string;
  id: number;
  assignees: string[];
}

export interface MsgAddPullRequestAssigneesResponse {}

export interface MsgRemovePullRequestAssignees {
  creator: string;
  id: number;
  assignees: string[];
}

export interface MsgRemovePullRequestAssigneesResponse {}

export interface MsgAddPullRequestLabels {
  creator: string;
  pullRequestId: number;
  labelIds: number[];
}

export interface MsgAddPullRequestLabelsResponse {}

export interface MsgRemovePullRequestLabels {
  creator: string;
  pullRequestId: number;
  labelIds: number[];
}

export interface MsgRemovePullRequestLabelsResponse {}

export interface MsgDeletePullRequest {
  creator: string;
  id: number;
}

export interface MsgDeletePullRequestResponse {}

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

export interface MsgRenameDaoResponse {}

export interface MsgUpdateDaoDescription {
  creator: string;
  id: string;
  description: string;
}

export interface MsgUpdateDaoDescriptionResponse {}

export interface MsgUpdateDaoWebsite {
  creator: string;
  id: string;
  url: string;
}

export interface MsgUpdateDaoWebsiteResponse {}

export interface MsgUpdateDaoLocation {
  creator: string;
  id: string;
  location: string;
}

export interface MsgUpdateDaoLocationResponse {}

export interface MsgUpdateDaoAvatar {
  creator: string;
  id: string;
  url: string;
}

export interface MsgUpdateDaoAvatarResponse {}

export interface MsgDeleteDao {
  creator: string;
  id: string;
}

export interface MsgDeleteDaoResponse {}

export interface MsgCreateComment {
  creator: string;
  parentId: number;
  body: string;
  attachments: string[];
  diffHunk: string;
  path: string;
  system: boolean;
  authorAssociation: string;
  commentType: string;
}

export interface MsgCreateCommentResponse {
  id: number;
}

export interface MsgUpdateComment {
  creator: string;
  id: number;
  body: string;
  attachments: string[];
}

export interface MsgUpdateCommentResponse {}

export interface MsgDeleteComment {
  creator: string;
  id: number;
}

export interface MsgDeleteCommentResponse {}

export interface MsgCreateIssue {
  creator: string;
  repositoryId: RepositoryId | undefined;
  title: string;
  description: string;
  labelIds: number[];
  weight: number;
  assignees: string[];
}

export interface MsgCreateIssueResponse {
  id: number;
  iid: number;
}

export interface MsgUpdateIssueTitle {
  creator: string;
  id: number;
  title: string;
}

export interface MsgUpdateIssueTitleResponse {}

export interface MsgUpdateIssueDescription {
  creator: string;
  id: number;
  description: string;
}

export interface MsgUpdateIssueDescriptionResponse {}

export interface MsgToggleIssueState {
  creator: string;
  id: number;
}

export interface MsgToggleIssueStateResponse {
  state: string;
}

export interface MsgAddIssueAssignees {
  creator: string;
  id: number;
  assignees: string[];
}

export interface MsgAddIssueAssigneesResponse {}

export interface MsgRemoveIssueAssignees {
  creator: string;
  id: number;
  assignees: string[];
}

export interface MsgRemoveIssueAssigneesResponse {}

export interface MsgAddIssueLabels {
  creator: string;
  issueId: number;
  labelIds: number[];
}

export interface MsgAddIssueLabelsResponse {}

export interface MsgRemoveIssueLabels {
  creator: string;
  issueId: number;
  labelIds: number[];
}

export interface MsgRemoveIssueLabelsResponse {}

export interface MsgDeleteIssue {
  creator: string;
  id: number;
}

export interface MsgDeleteIssueResponse {}

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
  owner: string;
  provider: string;
}

export interface MsgInvokeForkRepositoryResponse {}

export interface MsgForkRepository {
  creator: string;
  repositoryId: RepositoryId | undefined;
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

export interface MsgRenameRepositoryResponse {}

export interface MsgUpdateRepositoryDescription {
  creator: string;
  repositoryId: RepositoryId | undefined;
  description: string;
}

export interface MsgUpdateRepositoryDescriptionResponse {}

export interface MsgChangeOwner {
  creator: string;
  repositoryId: RepositoryId | undefined;
  owner: string;
}

export interface MsgChangeOwnerResponse {}

export interface MsgUpdateRepositoryCollaborator {
  creator: string;
  repositoryId: RepositoryId | undefined;
  user: string;
  role: string;
}

export interface MsgUpdateRepositoryCollaboratorResponse {}

export interface MsgRemoveRepositoryCollaborator {
  creator: string;
  repositoryId: RepositoryId | undefined;
  user: string;
}

export interface MsgRemoveRepositoryCollaboratorResponse {}

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

export interface MsgUpdateRepositoryLabelResponse {}

export interface MsgDeleteRepositoryLabel {
  creator: string;
  repositoryId: RepositoryId | undefined;
  labelId: number;
}

export interface MsgDeleteRepositoryLabelResponse {}

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

export interface MsgDeleteRepositoryResponse {}

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

export interface MsgUpdateUserUsernameResponse {}

export interface MsgUpdateUserName {
  creator: string;
  name: string;
}

export interface MsgUpdateUserNameResponse {}

export interface MsgUpdateUserBio {
  creator: string;
  bio: string;
}

export interface MsgUpdateUserBioResponse {}

export interface MsgUpdateUserAvatar {
  creator: string;
  url: string;
}

export interface MsgUpdateUserAvatarResponse {}

export interface MsgDeleteUser {
  creator: string;
  id: string;
}

export interface MsgDeleteUserResponse {}

const baseMsgRevokeStorageProviderPermissions: object = {
  creator: "",
  provider: "",
};

export const MsgRevokeStorageProviderPermissions = {
  encode(
    message: MsgRevokeStorageProviderPermissions,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.provider !== "") {
      writer.uint32(18).string(message.provider);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgRevokeStorageProviderPermissions {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgRevokeStorageProviderPermissions,
    } as MsgRevokeStorageProviderPermissions;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.provider = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRevokeStorageProviderPermissions {
    const message = {
      ...baseMsgRevokeStorageProviderPermissions,
    } as MsgRevokeStorageProviderPermissions;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = String(object.provider);
    } else {
      message.provider = "";
    }
    return message;
  },

  toJSON(message: MsgRevokeStorageProviderPermissions): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.provider !== undefined && (obj.provider = message.provider);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgRevokeStorageProviderPermissions>
  ): MsgRevokeStorageProviderPermissions {
    const message = {
      ...baseMsgRevokeStorageProviderPermissions,
    } as MsgRevokeStorageProviderPermissions;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = object.provider;
    } else {
      message.provider = "";
    }
    return message;
  },
};

const baseMsgRevokeStorageProviderPermissionsResponse: object = {};

export const MsgRevokeStorageProviderPermissionsResponse = {
  encode(
    _: MsgRevokeStorageProviderPermissionsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgRevokeStorageProviderPermissionsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgRevokeStorageProviderPermissionsResponse,
    } as MsgRevokeStorageProviderPermissionsResponse;
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

  fromJSON(_: any): MsgRevokeStorageProviderPermissionsResponse {
    const message = {
      ...baseMsgRevokeStorageProviderPermissionsResponse,
    } as MsgRevokeStorageProviderPermissionsResponse;
    return message;
  },

  toJSON(_: MsgRevokeStorageProviderPermissionsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgRevokeStorageProviderPermissionsResponse>
  ): MsgRevokeStorageProviderPermissionsResponse {
    const message = {
      ...baseMsgRevokeStorageProviderPermissionsResponse,
    } as MsgRevokeStorageProviderPermissionsResponse;
    return message;
  },
};

const baseMsgAuthorizeStorageProvider: object = { creator: "", provider: "" };

export const MsgAuthorizeStorageProvider = {
  encode(
    message: MsgAuthorizeStorageProvider,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.provider !== "") {
      writer.uint32(18).string(message.provider);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgAuthorizeStorageProvider {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgAuthorizeStorageProvider,
    } as MsgAuthorizeStorageProvider;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.provider = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAuthorizeStorageProvider {
    const message = {
      ...baseMsgAuthorizeStorageProvider,
    } as MsgAuthorizeStorageProvider;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = String(object.provider);
    } else {
      message.provider = "";
    }
    return message;
  },

  toJSON(message: MsgAuthorizeStorageProvider): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.provider !== undefined && (obj.provider = message.provider);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgAuthorizeStorageProvider>
  ): MsgAuthorizeStorageProvider {
    const message = {
      ...baseMsgAuthorizeStorageProvider,
    } as MsgAuthorizeStorageProvider;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = object.provider;
    } else {
      message.provider = "";
    }
    return message;
  },
};

const baseMsgAuthorizeStorageProviderResponse: object = {};

export const MsgAuthorizeStorageProviderResponse = {
  encode(
    _: MsgAuthorizeStorageProviderResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgAuthorizeStorageProviderResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgAuthorizeStorageProviderResponse,
    } as MsgAuthorizeStorageProviderResponse;
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

  fromJSON(_: any): MsgAuthorizeStorageProviderResponse {
    const message = {
      ...baseMsgAuthorizeStorageProviderResponse,
    } as MsgAuthorizeStorageProviderResponse;
    return message;
  },

  toJSON(_: MsgAuthorizeStorageProviderResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgAuthorizeStorageProviderResponse>
  ): MsgAuthorizeStorageProviderResponse {
    const message = {
      ...baseMsgAuthorizeStorageProviderResponse,
    } as MsgAuthorizeStorageProviderResponse;
    return message;
  },
};

const baseMsgRevokeGitServerPermissions: object = { creator: "", provider: "" };

export const MsgRevokeGitServerPermissions = {
  encode(
    message: MsgRevokeGitServerPermissions,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.provider !== "") {
      writer.uint32(18).string(message.provider);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgRevokeGitServerPermissions {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgRevokeGitServerPermissions,
    } as MsgRevokeGitServerPermissions;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.provider = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRevokeGitServerPermissions {
    const message = {
      ...baseMsgRevokeGitServerPermissions,
    } as MsgRevokeGitServerPermissions;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = String(object.provider);
    } else {
      message.provider = "";
    }
    return message;
  },

  toJSON(message: MsgRevokeGitServerPermissions): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.provider !== undefined && (obj.provider = message.provider);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgRevokeGitServerPermissions>
  ): MsgRevokeGitServerPermissions {
    const message = {
      ...baseMsgRevokeGitServerPermissions,
    } as MsgRevokeGitServerPermissions;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = object.provider;
    } else {
      message.provider = "";
    }
    return message;
  },
};

const baseMsgRevokeGitServerPermissionsResponse: object = {};

export const MsgRevokeGitServerPermissionsResponse = {
  encode(
    _: MsgRevokeGitServerPermissionsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgRevokeGitServerPermissionsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgRevokeGitServerPermissionsResponse,
    } as MsgRevokeGitServerPermissionsResponse;
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

  fromJSON(_: any): MsgRevokeGitServerPermissionsResponse {
    const message = {
      ...baseMsgRevokeGitServerPermissionsResponse,
    } as MsgRevokeGitServerPermissionsResponse;
    return message;
  },

  toJSON(_: MsgRevokeGitServerPermissionsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgRevokeGitServerPermissionsResponse>
  ): MsgRevokeGitServerPermissionsResponse {
    const message = {
      ...baseMsgRevokeGitServerPermissionsResponse,
    } as MsgRevokeGitServerPermissionsResponse;
    return message;
  },
};

const baseMsgAuthorizeGitServer: object = { creator: "", provider: "" };

export const MsgAuthorizeGitServer = {
  encode(
    message: MsgAuthorizeGitServer,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.provider !== "") {
      writer.uint32(18).string(message.provider);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgAuthorizeGitServer {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgAuthorizeGitServer } as MsgAuthorizeGitServer;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.provider = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAuthorizeGitServer {
    const message = { ...baseMsgAuthorizeGitServer } as MsgAuthorizeGitServer;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = String(object.provider);
    } else {
      message.provider = "";
    }
    return message;
  },

  toJSON(message: MsgAuthorizeGitServer): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.provider !== undefined && (obj.provider = message.provider);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgAuthorizeGitServer>
  ): MsgAuthorizeGitServer {
    const message = { ...baseMsgAuthorizeGitServer } as MsgAuthorizeGitServer;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = object.provider;
    } else {
      message.provider = "";
    }
    return message;
  },
};

const baseMsgAuthorizeGitServerResponse: object = {};

export const MsgAuthorizeGitServerResponse = {
  encode(
    _: MsgAuthorizeGitServerResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgAuthorizeGitServerResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgAuthorizeGitServerResponse,
    } as MsgAuthorizeGitServerResponse;
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

  fromJSON(_: any): MsgAuthorizeGitServerResponse {
    const message = {
      ...baseMsgAuthorizeGitServerResponse,
    } as MsgAuthorizeGitServerResponse;
    return message;
  },

  toJSON(_: MsgAuthorizeGitServerResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgAuthorizeGitServerResponse>
  ): MsgAuthorizeGitServerResponse {
    const message = {
      ...baseMsgAuthorizeGitServerResponse,
    } as MsgAuthorizeGitServerResponse;
    return message;
  },
};

const baseMsgCreateTask: object = { creator: "", taskType: 0, provider: "" };

export const MsgCreateTask = {
  encode(message: MsgCreateTask, writer: Writer = Writer.create()): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): MsgCreateTask {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateTask } as MsgCreateTask;
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
    const message = { ...baseMsgCreateTask } as MsgCreateTask;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.taskType !== undefined && object.taskType !== null) {
      message.taskType = taskTypeFromJSON(object.taskType);
    } else {
      message.taskType = 0;
    }
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = String(object.provider);
    } else {
      message.provider = "";
    }
    return message;
  },

  toJSON(message: MsgCreateTask): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.taskType !== undefined &&
      (obj.taskType = taskTypeToJSON(message.taskType));
    message.provider !== undefined && (obj.provider = message.provider);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreateTask>): MsgCreateTask {
    const message = { ...baseMsgCreateTask } as MsgCreateTask;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.taskType !== undefined && object.taskType !== null) {
      message.taskType = object.taskType;
    } else {
      message.taskType = 0;
    }
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = object.provider;
    } else {
      message.provider = "";
    }
    return message;
  },
};

const baseMsgCreateTaskResponse: object = { id: 0 };

export const MsgCreateTaskResponse = {
  encode(
    message: MsgCreateTaskResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateTaskResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateTaskResponse } as MsgCreateTaskResponse;
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
    const message = { ...baseMsgCreateTaskResponse } as MsgCreateTaskResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: MsgCreateTaskResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCreateTaskResponse>
  ): MsgCreateTaskResponse {
    const message = { ...baseMsgCreateTaskResponse } as MsgCreateTaskResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseMsgUpdateTask: object = { creator: "", id: 0, state: 0, message: "" };

export const MsgUpdateTask = {
  encode(message: MsgUpdateTask, writer: Writer = Writer.create()): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateTask {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateTask } as MsgUpdateTask;
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
    const message = { ...baseMsgUpdateTask } as MsgUpdateTask;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = taskStateFromJSON(object.state);
    } else {
      message.state = 0;
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = String(object.message);
    } else {
      message.message = "";
    }
    return message;
  },

  toJSON(message: MsgUpdateTask): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.state !== undefined && (obj.state = taskStateToJSON(message.state));
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpdateTask>): MsgUpdateTask {
    const message = { ...baseMsgUpdateTask } as MsgUpdateTask;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    } else {
      message.state = 0;
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = object.message;
    } else {
      message.message = "";
    }
    return message;
  },
};

const baseMsgUpdateTaskResponse: object = {};

export const MsgUpdateTaskResponse = {
  encode(_: MsgUpdateTaskResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateTaskResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateTaskResponse } as MsgUpdateTaskResponse;
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
    const message = { ...baseMsgUpdateTaskResponse } as MsgUpdateTaskResponse;
    return message;
  },

  toJSON(_: MsgUpdateTaskResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgUpdateTaskResponse>): MsgUpdateTaskResponse {
    const message = { ...baseMsgUpdateTaskResponse } as MsgUpdateTaskResponse;
    return message;
  },
};

const baseMsgDeleteTask: object = { creator: "", id: 0 };

export const MsgDeleteTask = {
  encode(message: MsgDeleteTask, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteTask {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteTask } as MsgDeleteTask;
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
    const message = { ...baseMsgDeleteTask } as MsgDeleteTask;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: MsgDeleteTask): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgDeleteTask>): MsgDeleteTask {
    const message = { ...baseMsgDeleteTask } as MsgDeleteTask;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseMsgUpdateIpfsBackupRef: object = { creator: "", ref: "" };

export const MsgUpdateIpfsBackupRef = {
  encode(
    message: MsgUpdateIpfsBackupRef,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(
        message.repositoryId,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.ref !== "") {
      writer.uint32(26).string(message.ref);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateIpfsBackupRef {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateIpfsBackupRef } as MsgUpdateIpfsBackupRef;
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
          message.ref = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateIpfsBackupRef {
    const message = { ...baseMsgUpdateIpfsBackupRef } as MsgUpdateIpfsBackupRef;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.ref !== undefined && object.ref !== null) {
      message.ref = String(object.ref);
    } else {
      message.ref = "";
    }
    return message;
  },

  toJSON(message: MsgUpdateIpfsBackupRef): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId
        ? RepositoryId.toJSON(message.repositoryId)
        : undefined);
    message.ref !== undefined && (obj.ref = message.ref);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgUpdateIpfsBackupRef>
  ): MsgUpdateIpfsBackupRef {
    const message = { ...baseMsgUpdateIpfsBackupRef } as MsgUpdateIpfsBackupRef;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.ref !== undefined && object.ref !== null) {
      message.ref = object.ref;
    } else {
      message.ref = "";
    }
    return message;
  },
};

const baseMsgUpdateIpfsBackupRefResponse: object = {};

export const MsgUpdateIpfsBackupRefResponse = {
  encode(
    _: MsgUpdateIpfsBackupRefResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdateIpfsBackupRefResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateIpfsBackupRefResponse,
    } as MsgUpdateIpfsBackupRefResponse;
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

  fromJSON(_: any): MsgUpdateIpfsBackupRefResponse {
    const message = {
      ...baseMsgUpdateIpfsBackupRefResponse,
    } as MsgUpdateIpfsBackupRefResponse;
    return message;
  },

  toJSON(_: MsgUpdateIpfsBackupRefResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateIpfsBackupRefResponse>
  ): MsgUpdateIpfsBackupRefResponse {
    const message = {
      ...baseMsgUpdateIpfsBackupRefResponse,
    } as MsgUpdateIpfsBackupRefResponse;
    return message;
  },
};

const baseMsgAddArweaveBackupRef: object = { creator: "", ref: "" };

export const MsgAddArweaveBackupRef = {
  encode(
    message: MsgAddArweaveBackupRef,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(
        message.repositoryId,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.ref !== "") {
      writer.uint32(26).string(message.ref);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgAddArweaveBackupRef {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgAddArweaveBackupRef } as MsgAddArweaveBackupRef;
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
          message.ref = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAddArweaveBackupRef {
    const message = { ...baseMsgAddArweaveBackupRef } as MsgAddArweaveBackupRef;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.ref !== undefined && object.ref !== null) {
      message.ref = String(object.ref);
    } else {
      message.ref = "";
    }
    return message;
  },

  toJSON(message: MsgAddArweaveBackupRef): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId
        ? RepositoryId.toJSON(message.repositoryId)
        : undefined);
    message.ref !== undefined && (obj.ref = message.ref);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgAddArweaveBackupRef>
  ): MsgAddArweaveBackupRef {
    const message = { ...baseMsgAddArweaveBackupRef } as MsgAddArweaveBackupRef;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.ref !== undefined && object.ref !== null) {
      message.ref = object.ref;
    } else {
      message.ref = "";
    }
    return message;
  },
};

const baseMsgAddArweaveBackupRefResponse: object = {};

export const MsgAddArweaveBackupRefResponse = {
  encode(
    _: MsgAddArweaveBackupRefResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgAddArweaveBackupRefResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgAddArweaveBackupRefResponse,
    } as MsgAddArweaveBackupRefResponse;
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

  fromJSON(_: any): MsgAddArweaveBackupRefResponse {
    const message = {
      ...baseMsgAddArweaveBackupRefResponse,
    } as MsgAddArweaveBackupRefResponse;
    return message;
  },

  toJSON(_: MsgAddArweaveBackupRefResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgAddArweaveBackupRefResponse>
  ): MsgAddArweaveBackupRefResponse {
    const message = {
      ...baseMsgAddArweaveBackupRefResponse,
    } as MsgAddArweaveBackupRefResponse;
    return message;
  },
};

const baseMsgDeleteTaskResponse: object = {};

export const MsgDeleteTaskResponse = {
  encode(_: MsgDeleteTaskResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteTaskResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteTaskResponse } as MsgDeleteTaskResponse;
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
    const message = { ...baseMsgDeleteTaskResponse } as MsgDeleteTaskResponse;
    return message;
  },

  toJSON(_: MsgDeleteTaskResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgDeleteTaskResponse>): MsgDeleteTaskResponse {
    const message = { ...baseMsgDeleteTaskResponse } as MsgDeleteTaskResponse;
    return message;
  },
};

const baseMsgDeleteStorageProviderResponse: object = {};

export const MsgDeleteStorageProviderResponse = {
  encode(
    _: MsgDeleteStorageProviderResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgDeleteStorageProviderResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgDeleteStorageProviderResponse,
    } as MsgDeleteStorageProviderResponse;
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
    const message = {
      ...baseMsgDeleteStorageProviderResponse,
    } as MsgDeleteStorageProviderResponse;
    return message;
  },

  toJSON(_: MsgDeleteStorageProviderResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgDeleteStorageProviderResponse>
  ): MsgDeleteStorageProviderResponse {
    const message = {
      ...baseMsgDeleteStorageProviderResponse,
    } as MsgDeleteStorageProviderResponse;
    return message;
  },
};

const baseMsgSetBranch: object = { creator: "" };

export const MsgSetBranch = {
  encode(message: MsgSetBranch, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(
        message.repositoryId,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.branch !== undefined) {
      MsgSetBranch_Branch.encode(
        message.branch,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSetBranch {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgSetBranch } as MsgSetBranch;
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
    const message = { ...baseMsgSetBranch } as MsgSetBranch;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.branch !== undefined && object.branch !== null) {
      message.branch = MsgSetBranch_Branch.fromJSON(object.branch);
    } else {
      message.branch = undefined;
    }
    return message;
  },

  toJSON(message: MsgSetBranch): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId
        ? RepositoryId.toJSON(message.repositoryId)
        : undefined);
    message.branch !== undefined &&
      (obj.branch = message.branch
        ? MsgSetBranch_Branch.toJSON(message.branch)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgSetBranch>): MsgSetBranch {
    const message = { ...baseMsgSetBranch } as MsgSetBranch;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.branch !== undefined && object.branch !== null) {
      message.branch = MsgSetBranch_Branch.fromPartial(object.branch);
    } else {
      message.branch = undefined;
    }
    return message;
  },
};

const baseMsgSetBranch_Branch: object = { name: "", sha: "" };

export const MsgSetBranch_Branch = {
  encode(
    message: MsgSetBranch_Branch,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.sha !== "") {
      writer.uint32(18).string(message.sha);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSetBranch_Branch {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgSetBranch_Branch } as MsgSetBranch_Branch;
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
    const message = { ...baseMsgSetBranch_Branch } as MsgSetBranch_Branch;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.sha !== undefined && object.sha !== null) {
      message.sha = String(object.sha);
    } else {
      message.sha = "";
    }
    return message;
  },

  toJSON(message: MsgSetBranch_Branch): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.sha !== undefined && (obj.sha = message.sha);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgSetBranch_Branch>): MsgSetBranch_Branch {
    const message = { ...baseMsgSetBranch_Branch } as MsgSetBranch_Branch;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.sha !== undefined && object.sha !== null) {
      message.sha = object.sha;
    } else {
      message.sha = "";
    }
    return message;
  },
};

const baseMsgSetBranchResponse: object = {};

export const MsgSetBranchResponse = {
  encode(_: MsgSetBranchResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSetBranchResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgSetBranchResponse } as MsgSetBranchResponse;
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
    const message = { ...baseMsgSetBranchResponse } as MsgSetBranchResponse;
    return message;
  },

  toJSON(_: MsgSetBranchResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgSetBranchResponse>): MsgSetBranchResponse {
    const message = { ...baseMsgSetBranchResponse } as MsgSetBranchResponse;
    return message;
  },
};

const baseMsgSetDefaultBranch: object = { creator: "", branch: "" };

export const MsgSetDefaultBranch = {
  encode(
    message: MsgSetDefaultBranch,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(
        message.repositoryId,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.branch !== "") {
      writer.uint32(26).string(message.branch);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSetDefaultBranch {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgSetDefaultBranch } as MsgSetDefaultBranch;
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
    const message = { ...baseMsgSetDefaultBranch } as MsgSetDefaultBranch;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.branch !== undefined && object.branch !== null) {
      message.branch = String(object.branch);
    } else {
      message.branch = "";
    }
    return message;
  },

  toJSON(message: MsgSetDefaultBranch): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId
        ? RepositoryId.toJSON(message.repositoryId)
        : undefined);
    message.branch !== undefined && (obj.branch = message.branch);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgSetDefaultBranch>): MsgSetDefaultBranch {
    const message = { ...baseMsgSetDefaultBranch } as MsgSetDefaultBranch;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.branch !== undefined && object.branch !== null) {
      message.branch = object.branch;
    } else {
      message.branch = "";
    }
    return message;
  },
};

const baseMsgSetDefaultBranchResponse: object = {};

export const MsgSetDefaultBranchResponse = {
  encode(
    _: MsgSetDefaultBranchResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgSetDefaultBranchResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgSetDefaultBranchResponse,
    } as MsgSetDefaultBranchResponse;
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
    const message = {
      ...baseMsgSetDefaultBranchResponse,
    } as MsgSetDefaultBranchResponse;
    return message;
  },

  toJSON(_: MsgSetDefaultBranchResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgSetDefaultBranchResponse>
  ): MsgSetDefaultBranchResponse {
    const message = {
      ...baseMsgSetDefaultBranchResponse,
    } as MsgSetDefaultBranchResponse;
    return message;
  },
};

const baseMsgMultiSetBranch: object = { creator: "" };

export const MsgMultiSetBranch = {
  encode(message: MsgMultiSetBranch, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(
        message.repositoryId,
        writer.uint32(18).fork()
      ).ldelim();
    }
    for (const v of message.branches) {
      MsgMultiSetBranch_Branch.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgMultiSetBranch {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgMultiSetBranch } as MsgMultiSetBranch;
    message.branches = [];
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
          message.branches.push(
            MsgMultiSetBranch_Branch.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgMultiSetBranch {
    const message = { ...baseMsgMultiSetBranch } as MsgMultiSetBranch;
    message.branches = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.branches !== undefined && object.branches !== null) {
      for (const e of object.branches) {
        message.branches.push(MsgMultiSetBranch_Branch.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: MsgMultiSetBranch): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId
        ? RepositoryId.toJSON(message.repositoryId)
        : undefined);
    if (message.branches) {
      obj.branches = message.branches.map((e) =>
        e ? MsgMultiSetBranch_Branch.toJSON(e) : undefined
      );
    } else {
      obj.branches = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<MsgMultiSetBranch>): MsgMultiSetBranch {
    const message = { ...baseMsgMultiSetBranch } as MsgMultiSetBranch;
    message.branches = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.branches !== undefined && object.branches !== null) {
      for (const e of object.branches) {
        message.branches.push(MsgMultiSetBranch_Branch.fromPartial(e));
      }
    }
    return message;
  },
};

const baseMsgMultiSetBranch_Branch: object = { name: "", sha: "" };

export const MsgMultiSetBranch_Branch = {
  encode(
    message: MsgMultiSetBranch_Branch,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.sha !== "") {
      writer.uint32(18).string(message.sha);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgMultiSetBranch_Branch {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgMultiSetBranch_Branch,
    } as MsgMultiSetBranch_Branch;
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
    const message = {
      ...baseMsgMultiSetBranch_Branch,
    } as MsgMultiSetBranch_Branch;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.sha !== undefined && object.sha !== null) {
      message.sha = String(object.sha);
    } else {
      message.sha = "";
    }
    return message;
  },

  toJSON(message: MsgMultiSetBranch_Branch): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.sha !== undefined && (obj.sha = message.sha);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgMultiSetBranch_Branch>
  ): MsgMultiSetBranch_Branch {
    const message = {
      ...baseMsgMultiSetBranch_Branch,
    } as MsgMultiSetBranch_Branch;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.sha !== undefined && object.sha !== null) {
      message.sha = object.sha;
    } else {
      message.sha = "";
    }
    return message;
  },
};

const baseMsgMultiSetBranchResponse: object = {};

export const MsgMultiSetBranchResponse = {
  encode(
    _: MsgMultiSetBranchResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgMultiSetBranchResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgMultiSetBranchResponse,
    } as MsgMultiSetBranchResponse;
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
    const message = {
      ...baseMsgMultiSetBranchResponse,
    } as MsgMultiSetBranchResponse;
    return message;
  },

  toJSON(_: MsgMultiSetBranchResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgMultiSetBranchResponse>
  ): MsgMultiSetBranchResponse {
    const message = {
      ...baseMsgMultiSetBranchResponse,
    } as MsgMultiSetBranchResponse;
    return message;
  },
};

const baseMsgDeleteBranch: object = { creator: "", branch: "" };

export const MsgDeleteBranch = {
  encode(message: MsgDeleteBranch, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(
        message.repositoryId,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.branch !== "") {
      writer.uint32(26).string(message.branch);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteBranch {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteBranch } as MsgDeleteBranch;
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
    const message = { ...baseMsgDeleteBranch } as MsgDeleteBranch;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.branch !== undefined && object.branch !== null) {
      message.branch = String(object.branch);
    } else {
      message.branch = "";
    }
    return message;
  },

  toJSON(message: MsgDeleteBranch): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId
        ? RepositoryId.toJSON(message.repositoryId)
        : undefined);
    message.branch !== undefined && (obj.branch = message.branch);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgDeleteBranch>): MsgDeleteBranch {
    const message = { ...baseMsgDeleteBranch } as MsgDeleteBranch;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.branch !== undefined && object.branch !== null) {
      message.branch = object.branch;
    } else {
      message.branch = "";
    }
    return message;
  },
};

const baseMsgDeleteBranchResponse: object = {};

export const MsgDeleteBranchResponse = {
  encode(_: MsgDeleteBranchResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteBranchResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgDeleteBranchResponse,
    } as MsgDeleteBranchResponse;
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
    const message = {
      ...baseMsgDeleteBranchResponse,
    } as MsgDeleteBranchResponse;
    return message;
  },

  toJSON(_: MsgDeleteBranchResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgDeleteBranchResponse>
  ): MsgDeleteBranchResponse {
    const message = {
      ...baseMsgDeleteBranchResponse,
    } as MsgDeleteBranchResponse;
    return message;
  },
};

const baseMsgMultiDeleteBranch: object = { creator: "", branches: "" };

export const MsgMultiDeleteBranch = {
  encode(
    message: MsgMultiDeleteBranch,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(
        message.repositoryId,
        writer.uint32(18).fork()
      ).ldelim();
    }
    for (const v of message.branches) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgMultiDeleteBranch {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgMultiDeleteBranch } as MsgMultiDeleteBranch;
    message.branches = [];
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
    const message = { ...baseMsgMultiDeleteBranch } as MsgMultiDeleteBranch;
    message.branches = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.branches !== undefined && object.branches !== null) {
      for (const e of object.branches) {
        message.branches.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: MsgMultiDeleteBranch): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId
        ? RepositoryId.toJSON(message.repositoryId)
        : undefined);
    if (message.branches) {
      obj.branches = message.branches.map((e) => e);
    } else {
      obj.branches = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<MsgMultiDeleteBranch>): MsgMultiDeleteBranch {
    const message = { ...baseMsgMultiDeleteBranch } as MsgMultiDeleteBranch;
    message.branches = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.branches !== undefined && object.branches !== null) {
      for (const e of object.branches) {
        message.branches.push(e);
      }
    }
    return message;
  },
};

const baseMsgMultiDeleteBranchResponse: object = {};

export const MsgMultiDeleteBranchResponse = {
  encode(
    _: MsgMultiDeleteBranchResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgMultiDeleteBranchResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgMultiDeleteBranchResponse,
    } as MsgMultiDeleteBranchResponse;
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
    const message = {
      ...baseMsgMultiDeleteBranchResponse,
    } as MsgMultiDeleteBranchResponse;
    return message;
  },

  toJSON(_: MsgMultiDeleteBranchResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgMultiDeleteBranchResponse>
  ): MsgMultiDeleteBranchResponse {
    const message = {
      ...baseMsgMultiDeleteBranchResponse,
    } as MsgMultiDeleteBranchResponse;
    return message;
  },
};

const baseMsgSetTag: object = { creator: "" };

export const MsgSetTag = {
  encode(message: MsgSetTag, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(
        message.repositoryId,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.tag !== undefined) {
      MsgSetTag_Tag.encode(message.tag, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSetTag {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgSetTag } as MsgSetTag;
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
    const message = { ...baseMsgSetTag } as MsgSetTag;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.tag !== undefined && object.tag !== null) {
      message.tag = MsgSetTag_Tag.fromJSON(object.tag);
    } else {
      message.tag = undefined;
    }
    return message;
  },

  toJSON(message: MsgSetTag): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId
        ? RepositoryId.toJSON(message.repositoryId)
        : undefined);
    message.tag !== undefined &&
      (obj.tag = message.tag ? MsgSetTag_Tag.toJSON(message.tag) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgSetTag>): MsgSetTag {
    const message = { ...baseMsgSetTag } as MsgSetTag;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.tag !== undefined && object.tag !== null) {
      message.tag = MsgSetTag_Tag.fromPartial(object.tag);
    } else {
      message.tag = undefined;
    }
    return message;
  },
};

const baseMsgSetTag_Tag: object = { name: "", sha: "" };

export const MsgSetTag_Tag = {
  encode(message: MsgSetTag_Tag, writer: Writer = Writer.create()): Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.sha !== "") {
      writer.uint32(18).string(message.sha);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSetTag_Tag {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgSetTag_Tag } as MsgSetTag_Tag;
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
    const message = { ...baseMsgSetTag_Tag } as MsgSetTag_Tag;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.sha !== undefined && object.sha !== null) {
      message.sha = String(object.sha);
    } else {
      message.sha = "";
    }
    return message;
  },

  toJSON(message: MsgSetTag_Tag): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.sha !== undefined && (obj.sha = message.sha);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgSetTag_Tag>): MsgSetTag_Tag {
    const message = { ...baseMsgSetTag_Tag } as MsgSetTag_Tag;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.sha !== undefined && object.sha !== null) {
      message.sha = object.sha;
    } else {
      message.sha = "";
    }
    return message;
  },
};

const baseMsgSetTagResponse: object = {};

export const MsgSetTagResponse = {
  encode(_: MsgSetTagResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSetTagResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgSetTagResponse } as MsgSetTagResponse;
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
    const message = { ...baseMsgSetTagResponse } as MsgSetTagResponse;
    return message;
  },

  toJSON(_: MsgSetTagResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgSetTagResponse>): MsgSetTagResponse {
    const message = { ...baseMsgSetTagResponse } as MsgSetTagResponse;
    return message;
  },
};

const baseMsgMultiSetTag: object = { creator: "" };

export const MsgMultiSetTag = {
  encode(message: MsgMultiSetTag, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(
        message.repositoryId,
        writer.uint32(18).fork()
      ).ldelim();
    }
    for (const v of message.tags) {
      MsgMultiSetTag_Tag.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgMultiSetTag {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgMultiSetTag } as MsgMultiSetTag;
    message.tags = [];
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
    const message = { ...baseMsgMultiSetTag } as MsgMultiSetTag;
    message.tags = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.tags !== undefined && object.tags !== null) {
      for (const e of object.tags) {
        message.tags.push(MsgMultiSetTag_Tag.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: MsgMultiSetTag): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId
        ? RepositoryId.toJSON(message.repositoryId)
        : undefined);
    if (message.tags) {
      obj.tags = message.tags.map((e) =>
        e ? MsgMultiSetTag_Tag.toJSON(e) : undefined
      );
    } else {
      obj.tags = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<MsgMultiSetTag>): MsgMultiSetTag {
    const message = { ...baseMsgMultiSetTag } as MsgMultiSetTag;
    message.tags = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.tags !== undefined && object.tags !== null) {
      for (const e of object.tags) {
        message.tags.push(MsgMultiSetTag_Tag.fromPartial(e));
      }
    }
    return message;
  },
};

const baseMsgMultiSetTag_Tag: object = { name: "", sha: "" };

export const MsgMultiSetTag_Tag = {
  encode(
    message: MsgMultiSetTag_Tag,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.sha !== "") {
      writer.uint32(18).string(message.sha);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgMultiSetTag_Tag {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgMultiSetTag_Tag } as MsgMultiSetTag_Tag;
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
    const message = { ...baseMsgMultiSetTag_Tag } as MsgMultiSetTag_Tag;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.sha !== undefined && object.sha !== null) {
      message.sha = String(object.sha);
    } else {
      message.sha = "";
    }
    return message;
  },

  toJSON(message: MsgMultiSetTag_Tag): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.sha !== undefined && (obj.sha = message.sha);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgMultiSetTag_Tag>): MsgMultiSetTag_Tag {
    const message = { ...baseMsgMultiSetTag_Tag } as MsgMultiSetTag_Tag;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.sha !== undefined && object.sha !== null) {
      message.sha = object.sha;
    } else {
      message.sha = "";
    }
    return message;
  },
};

const baseMsgMultiSetTagResponse: object = {};

export const MsgMultiSetTagResponse = {
  encode(_: MsgMultiSetTagResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgMultiSetTagResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgMultiSetTagResponse } as MsgMultiSetTagResponse;
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
    const message = { ...baseMsgMultiSetTagResponse } as MsgMultiSetTagResponse;
    return message;
  },

  toJSON(_: MsgMultiSetTagResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgMultiSetTagResponse>): MsgMultiSetTagResponse {
    const message = { ...baseMsgMultiSetTagResponse } as MsgMultiSetTagResponse;
    return message;
  },
};

const baseMsgDeleteTag: object = { creator: "", tag: "" };

export const MsgDeleteTag = {
  encode(message: MsgDeleteTag, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(
        message.repositoryId,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.tag !== "") {
      writer.uint32(26).string(message.tag);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteTag {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteTag } as MsgDeleteTag;
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
    const message = { ...baseMsgDeleteTag } as MsgDeleteTag;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.tag !== undefined && object.tag !== null) {
      message.tag = String(object.tag);
    } else {
      message.tag = "";
    }
    return message;
  },

  toJSON(message: MsgDeleteTag): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId
        ? RepositoryId.toJSON(message.repositoryId)
        : undefined);
    message.tag !== undefined && (obj.tag = message.tag);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgDeleteTag>): MsgDeleteTag {
    const message = { ...baseMsgDeleteTag } as MsgDeleteTag;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.tag !== undefined && object.tag !== null) {
      message.tag = object.tag;
    } else {
      message.tag = "";
    }
    return message;
  },
};

const baseMsgDeleteTagResponse: object = {};

export const MsgDeleteTagResponse = {
  encode(_: MsgDeleteTagResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteTagResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteTagResponse } as MsgDeleteTagResponse;
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
    const message = { ...baseMsgDeleteTagResponse } as MsgDeleteTagResponse;
    return message;
  },

  toJSON(_: MsgDeleteTagResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgDeleteTagResponse>): MsgDeleteTagResponse {
    const message = { ...baseMsgDeleteTagResponse } as MsgDeleteTagResponse;
    return message;
  },
};

const baseMsgMultiDeleteTag: object = { creator: "", tags: "" };

export const MsgMultiDeleteTag = {
  encode(message: MsgMultiDeleteTag, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(
        message.repositoryId,
        writer.uint32(18).fork()
      ).ldelim();
    }
    for (const v of message.tags) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgMultiDeleteTag {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgMultiDeleteTag } as MsgMultiDeleteTag;
    message.tags = [];
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
    const message = { ...baseMsgMultiDeleteTag } as MsgMultiDeleteTag;
    message.tags = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.tags !== undefined && object.tags !== null) {
      for (const e of object.tags) {
        message.tags.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: MsgMultiDeleteTag): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId
        ? RepositoryId.toJSON(message.repositoryId)
        : undefined);
    if (message.tags) {
      obj.tags = message.tags.map((e) => e);
    } else {
      obj.tags = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<MsgMultiDeleteTag>): MsgMultiDeleteTag {
    const message = { ...baseMsgMultiDeleteTag } as MsgMultiDeleteTag;
    message.tags = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.tags !== undefined && object.tags !== null) {
      for (const e of object.tags) {
        message.tags.push(e);
      }
    }
    return message;
  },
};

const baseMsgMultiDeleteTagResponse: object = {};

export const MsgMultiDeleteTagResponse = {
  encode(
    _: MsgMultiDeleteTagResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgMultiDeleteTagResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgMultiDeleteTagResponse,
    } as MsgMultiDeleteTagResponse;
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
    const message = {
      ...baseMsgMultiDeleteTagResponse,
    } as MsgMultiDeleteTagResponse;
    return message;
  },

  toJSON(_: MsgMultiDeleteTagResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgMultiDeleteTagResponse>
  ): MsgMultiDeleteTagResponse {
    const message = {
      ...baseMsgMultiDeleteTagResponse,
    } as MsgMultiDeleteTagResponse;
    return message;
  },
};

const baseMsgAddMember: object = {
  creator: "",
  daoId: "",
  userId: "",
  role: 0,
};

export const MsgAddMember = {
  encode(message: MsgAddMember, writer: Writer = Writer.create()): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): MsgAddMember {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgAddMember } as MsgAddMember;
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
    const message = { ...baseMsgAddMember } as MsgAddMember;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.daoId !== undefined && object.daoId !== null) {
      message.daoId = String(object.daoId);
    } else {
      message.daoId = "";
    }
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = String(object.userId);
    } else {
      message.userId = "";
    }
    if (object.role !== undefined && object.role !== null) {
      message.role = memberRoleFromJSON(object.role);
    } else {
      message.role = 0;
    }
    return message;
  },

  toJSON(message: MsgAddMember): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.daoId !== undefined && (obj.daoId = message.daoId);
    message.userId !== undefined && (obj.userId = message.userId);
    message.role !== undefined && (obj.role = memberRoleToJSON(message.role));
    return obj;
  },

  fromPartial(object: DeepPartial<MsgAddMember>): MsgAddMember {
    const message = { ...baseMsgAddMember } as MsgAddMember;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.daoId !== undefined && object.daoId !== null) {
      message.daoId = object.daoId;
    } else {
      message.daoId = "";
    }
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = object.userId;
    } else {
      message.userId = "";
    }
    if (object.role !== undefined && object.role !== null) {
      message.role = object.role;
    } else {
      message.role = 0;
    }
    return message;
  },
};

const baseMsgAddMemberResponse: object = {};

export const MsgAddMemberResponse = {
  encode(_: MsgAddMemberResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgAddMemberResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgAddMemberResponse } as MsgAddMemberResponse;
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
    const message = { ...baseMsgAddMemberResponse } as MsgAddMemberResponse;
    return message;
  },

  toJSON(_: MsgAddMemberResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgAddMemberResponse>): MsgAddMemberResponse {
    const message = { ...baseMsgAddMemberResponse } as MsgAddMemberResponse;
    return message;
  },
};

const baseMsgUpdateMemberRole: object = {
  creator: "",
  daoId: "",
  userId: "",
  role: 0,
};

export const MsgUpdateMemberRole = {
  encode(
    message: MsgUpdateMemberRole,
    writer: Writer = Writer.create()
  ): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateMemberRole {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateMemberRole } as MsgUpdateMemberRole;
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
    const message = { ...baseMsgUpdateMemberRole } as MsgUpdateMemberRole;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.daoId !== undefined && object.daoId !== null) {
      message.daoId = String(object.daoId);
    } else {
      message.daoId = "";
    }
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = String(object.userId);
    } else {
      message.userId = "";
    }
    if (object.role !== undefined && object.role !== null) {
      message.role = memberRoleFromJSON(object.role);
    } else {
      message.role = 0;
    }
    return message;
  },

  toJSON(message: MsgUpdateMemberRole): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.daoId !== undefined && (obj.daoId = message.daoId);
    message.userId !== undefined && (obj.userId = message.userId);
    message.role !== undefined && (obj.role = memberRoleToJSON(message.role));
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpdateMemberRole>): MsgUpdateMemberRole {
    const message = { ...baseMsgUpdateMemberRole } as MsgUpdateMemberRole;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.daoId !== undefined && object.daoId !== null) {
      message.daoId = object.daoId;
    } else {
      message.daoId = "";
    }
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = object.userId;
    } else {
      message.userId = "";
    }
    if (object.role !== undefined && object.role !== null) {
      message.role = object.role;
    } else {
      message.role = 0;
    }
    return message;
  },
};

const baseMsgUpdateMemberRoleResponse: object = {};

export const MsgUpdateMemberRoleResponse = {
  encode(
    _: MsgUpdateMemberRoleResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdateMemberRoleResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateMemberRoleResponse,
    } as MsgUpdateMemberRoleResponse;
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
    const message = {
      ...baseMsgUpdateMemberRoleResponse,
    } as MsgUpdateMemberRoleResponse;
    return message;
  },

  toJSON(_: MsgUpdateMemberRoleResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateMemberRoleResponse>
  ): MsgUpdateMemberRoleResponse {
    const message = {
      ...baseMsgUpdateMemberRoleResponse,
    } as MsgUpdateMemberRoleResponse;
    return message;
  },
};

const baseMsgRemoveMember: object = { creator: "", daoId: "", userId: "" };

export const MsgRemoveMember = {
  encode(message: MsgRemoveMember, writer: Writer = Writer.create()): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): MsgRemoveMember {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgRemoveMember } as MsgRemoveMember;
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
    const message = { ...baseMsgRemoveMember } as MsgRemoveMember;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.daoId !== undefined && object.daoId !== null) {
      message.daoId = String(object.daoId);
    } else {
      message.daoId = "";
    }
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = String(object.userId);
    } else {
      message.userId = "";
    }
    return message;
  },

  toJSON(message: MsgRemoveMember): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.daoId !== undefined && (obj.daoId = message.daoId);
    message.userId !== undefined && (obj.userId = message.userId);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgRemoveMember>): MsgRemoveMember {
    const message = { ...baseMsgRemoveMember } as MsgRemoveMember;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.daoId !== undefined && object.daoId !== null) {
      message.daoId = object.daoId;
    } else {
      message.daoId = "";
    }
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = object.userId;
    } else {
      message.userId = "";
    }
    return message;
  },
};

const baseMsgRemoveMemberResponse: object = {};

export const MsgRemoveMemberResponse = {
  encode(_: MsgRemoveMemberResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRemoveMemberResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgRemoveMemberResponse,
    } as MsgRemoveMemberResponse;
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
    const message = {
      ...baseMsgRemoveMemberResponse,
    } as MsgRemoveMemberResponse;
    return message;
  },

  toJSON(_: MsgRemoveMemberResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgRemoveMemberResponse>
  ): MsgRemoveMemberResponse {
    const message = {
      ...baseMsgRemoveMemberResponse,
    } as MsgRemoveMemberResponse;
    return message;
  },
};

const baseMsgCreateRelease: object = {
  creator: "",
  tagName: "",
  target: "",
  name: "",
  description: "",
  attachments: "",
  draft: false,
  preRelease: false,
  isTag: false,
};

export const MsgCreateRelease = {
  encode(message: MsgCreateRelease, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(
        message.repositoryId,
        writer.uint32(18).fork()
      ).ldelim();
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

  decode(input: Reader | Uint8Array, length?: number): MsgCreateRelease {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateRelease } as MsgCreateRelease;
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
    const message = { ...baseMsgCreateRelease } as MsgCreateRelease;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.tagName !== undefined && object.tagName !== null) {
      message.tagName = String(object.tagName);
    } else {
      message.tagName = "";
    }
    if (object.target !== undefined && object.target !== null) {
      message.target = String(object.target);
    } else {
      message.target = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.attachments !== undefined && object.attachments !== null) {
      message.attachments = String(object.attachments);
    } else {
      message.attachments = "";
    }
    if (object.draft !== undefined && object.draft !== null) {
      message.draft = Boolean(object.draft);
    } else {
      message.draft = false;
    }
    if (object.preRelease !== undefined && object.preRelease !== null) {
      message.preRelease = Boolean(object.preRelease);
    } else {
      message.preRelease = false;
    }
    if (object.isTag !== undefined && object.isTag !== null) {
      message.isTag = Boolean(object.isTag);
    } else {
      message.isTag = false;
    }
    return message;
  },

  toJSON(message: MsgCreateRelease): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId
        ? RepositoryId.toJSON(message.repositoryId)
        : undefined);
    message.tagName !== undefined && (obj.tagName = message.tagName);
    message.target !== undefined && (obj.target = message.target);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined &&
      (obj.description = message.description);
    message.attachments !== undefined &&
      (obj.attachments = message.attachments);
    message.draft !== undefined && (obj.draft = message.draft);
    message.preRelease !== undefined && (obj.preRelease = message.preRelease);
    message.isTag !== undefined && (obj.isTag = message.isTag);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreateRelease>): MsgCreateRelease {
    const message = { ...baseMsgCreateRelease } as MsgCreateRelease;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.tagName !== undefined && object.tagName !== null) {
      message.tagName = object.tagName;
    } else {
      message.tagName = "";
    }
    if (object.target !== undefined && object.target !== null) {
      message.target = object.target;
    } else {
      message.target = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.attachments !== undefined && object.attachments !== null) {
      message.attachments = object.attachments;
    } else {
      message.attachments = "";
    }
    if (object.draft !== undefined && object.draft !== null) {
      message.draft = object.draft;
    } else {
      message.draft = false;
    }
    if (object.preRelease !== undefined && object.preRelease !== null) {
      message.preRelease = object.preRelease;
    } else {
      message.preRelease = false;
    }
    if (object.isTag !== undefined && object.isTag !== null) {
      message.isTag = object.isTag;
    } else {
      message.isTag = false;
    }
    return message;
  },
};

const baseMsgCreateReleaseResponse: object = { id: 0 };

export const MsgCreateReleaseResponse = {
  encode(
    message: MsgCreateReleaseResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgCreateReleaseResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCreateReleaseResponse,
    } as MsgCreateReleaseResponse;
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
    const message = {
      ...baseMsgCreateReleaseResponse,
    } as MsgCreateReleaseResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: MsgCreateReleaseResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCreateReleaseResponse>
  ): MsgCreateReleaseResponse {
    const message = {
      ...baseMsgCreateReleaseResponse,
    } as MsgCreateReleaseResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseMsgUpdateRelease: object = {
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

export const MsgUpdateRelease = {
  encode(message: MsgUpdateRelease, writer: Writer = Writer.create()): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateRelease {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateRelease } as MsgUpdateRelease;
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
    const message = { ...baseMsgUpdateRelease } as MsgUpdateRelease;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.tagName !== undefined && object.tagName !== null) {
      message.tagName = String(object.tagName);
    } else {
      message.tagName = "";
    }
    if (object.target !== undefined && object.target !== null) {
      message.target = String(object.target);
    } else {
      message.target = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.attachments !== undefined && object.attachments !== null) {
      message.attachments = String(object.attachments);
    } else {
      message.attachments = "";
    }
    if (object.draft !== undefined && object.draft !== null) {
      message.draft = Boolean(object.draft);
    } else {
      message.draft = false;
    }
    if (object.preRelease !== undefined && object.preRelease !== null) {
      message.preRelease = Boolean(object.preRelease);
    } else {
      message.preRelease = false;
    }
    if (object.isTag !== undefined && object.isTag !== null) {
      message.isTag = Boolean(object.isTag);
    } else {
      message.isTag = false;
    }
    return message;
  },

  toJSON(message: MsgUpdateRelease): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.tagName !== undefined && (obj.tagName = message.tagName);
    message.target !== undefined && (obj.target = message.target);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined &&
      (obj.description = message.description);
    message.attachments !== undefined &&
      (obj.attachments = message.attachments);
    message.draft !== undefined && (obj.draft = message.draft);
    message.preRelease !== undefined && (obj.preRelease = message.preRelease);
    message.isTag !== undefined && (obj.isTag = message.isTag);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpdateRelease>): MsgUpdateRelease {
    const message = { ...baseMsgUpdateRelease } as MsgUpdateRelease;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.tagName !== undefined && object.tagName !== null) {
      message.tagName = object.tagName;
    } else {
      message.tagName = "";
    }
    if (object.target !== undefined && object.target !== null) {
      message.target = object.target;
    } else {
      message.target = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.attachments !== undefined && object.attachments !== null) {
      message.attachments = object.attachments;
    } else {
      message.attachments = "";
    }
    if (object.draft !== undefined && object.draft !== null) {
      message.draft = object.draft;
    } else {
      message.draft = false;
    }
    if (object.preRelease !== undefined && object.preRelease !== null) {
      message.preRelease = object.preRelease;
    } else {
      message.preRelease = false;
    }
    if (object.isTag !== undefined && object.isTag !== null) {
      message.isTag = object.isTag;
    } else {
      message.isTag = false;
    }
    return message;
  },
};

const baseMsgUpdateReleaseResponse: object = {};

export const MsgUpdateReleaseResponse = {
  encode(
    _: MsgUpdateReleaseResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdateReleaseResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateReleaseResponse,
    } as MsgUpdateReleaseResponse;
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
    const message = {
      ...baseMsgUpdateReleaseResponse,
    } as MsgUpdateReleaseResponse;
    return message;
  },

  toJSON(_: MsgUpdateReleaseResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateReleaseResponse>
  ): MsgUpdateReleaseResponse {
    const message = {
      ...baseMsgUpdateReleaseResponse,
    } as MsgUpdateReleaseResponse;
    return message;
  },
};

const baseMsgDeleteRelease: object = { creator: "", id: 0 };

export const MsgDeleteRelease = {
  encode(message: MsgDeleteRelease, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteRelease {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteRelease } as MsgDeleteRelease;
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
    const message = { ...baseMsgDeleteRelease } as MsgDeleteRelease;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: MsgDeleteRelease): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgDeleteRelease>): MsgDeleteRelease {
    const message = { ...baseMsgDeleteRelease } as MsgDeleteRelease;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseMsgDeleteReleaseResponse: object = {};

export const MsgDeleteReleaseResponse = {
  encode(
    _: MsgDeleteReleaseResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgDeleteReleaseResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgDeleteReleaseResponse,
    } as MsgDeleteReleaseResponse;
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
    const message = {
      ...baseMsgDeleteReleaseResponse,
    } as MsgDeleteReleaseResponse;
    return message;
  },

  toJSON(_: MsgDeleteReleaseResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgDeleteReleaseResponse>
  ): MsgDeleteReleaseResponse {
    const message = {
      ...baseMsgDeleteReleaseResponse,
    } as MsgDeleteReleaseResponse;
    return message;
  },
};

const baseMsgCreatePullRequest: object = {
  creator: "",
  title: "",
  description: "",
  headBranch: "",
  baseBranch: "",
  reviewers: "",
  assignees: "",
  labelIds: 0,
};

export const MsgCreatePullRequest = {
  encode(
    message: MsgCreatePullRequest,
    writer: Writer = Writer.create()
  ): Writer {
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
      RepositoryId.encode(
        message.headRepositoryId,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.baseBranch !== "") {
      writer.uint32(50).string(message.baseBranch);
    }
    if (message.baseRepositoryId !== undefined) {
      RepositoryId.encode(
        message.baseRepositoryId,
        writer.uint32(58).fork()
      ).ldelim();
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
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreatePullRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreatePullRequest } as MsgCreatePullRequest;
    message.reviewers = [];
    message.assignees = [];
    message.labelIds = [];
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
          message.headRepositoryId = RepositoryId.decode(
            reader,
            reader.uint32()
          );
          break;
        case 6:
          message.baseBranch = reader.string();
          break;
        case 7:
          message.baseRepositoryId = RepositoryId.decode(
            reader,
            reader.uint32()
          );
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
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreatePullRequest {
    const message = { ...baseMsgCreatePullRequest } as MsgCreatePullRequest;
    message.reviewers = [];
    message.assignees = [];
    message.labelIds = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.headBranch !== undefined && object.headBranch !== null) {
      message.headBranch = String(object.headBranch);
    } else {
      message.headBranch = "";
    }
    if (
      object.headRepositoryId !== undefined &&
      object.headRepositoryId !== null
    ) {
      message.headRepositoryId = RepositoryId.fromJSON(object.headRepositoryId);
    } else {
      message.headRepositoryId = undefined;
    }
    if (object.baseBranch !== undefined && object.baseBranch !== null) {
      message.baseBranch = String(object.baseBranch);
    } else {
      message.baseBranch = "";
    }
    if (
      object.baseRepositoryId !== undefined &&
      object.baseRepositoryId !== null
    ) {
      message.baseRepositoryId = RepositoryId.fromJSON(object.baseRepositoryId);
    } else {
      message.baseRepositoryId = undefined;
    }
    if (object.reviewers !== undefined && object.reviewers !== null) {
      for (const e of object.reviewers) {
        message.reviewers.push(String(e));
      }
    }
    if (object.assignees !== undefined && object.assignees !== null) {
      for (const e of object.assignees) {
        message.assignees.push(String(e));
      }
    }
    if (object.labelIds !== undefined && object.labelIds !== null) {
      for (const e of object.labelIds) {
        message.labelIds.push(Number(e));
      }
    }
    return message;
  },

  toJSON(message: MsgCreatePullRequest): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined &&
      (obj.description = message.description);
    message.headBranch !== undefined && (obj.headBranch = message.headBranch);
    message.headRepositoryId !== undefined &&
      (obj.headRepositoryId = message.headRepositoryId
        ? RepositoryId.toJSON(message.headRepositoryId)
        : undefined);
    message.baseBranch !== undefined && (obj.baseBranch = message.baseBranch);
    message.baseRepositoryId !== undefined &&
      (obj.baseRepositoryId = message.baseRepositoryId
        ? RepositoryId.toJSON(message.baseRepositoryId)
        : undefined);
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
      obj.labelIds = message.labelIds.map((e) => e);
    } else {
      obj.labelIds = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreatePullRequest>): MsgCreatePullRequest {
    const message = { ...baseMsgCreatePullRequest } as MsgCreatePullRequest;
    message.reviewers = [];
    message.assignees = [];
    message.labelIds = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    } else {
      message.title = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.headBranch !== undefined && object.headBranch !== null) {
      message.headBranch = object.headBranch;
    } else {
      message.headBranch = "";
    }
    if (
      object.headRepositoryId !== undefined &&
      object.headRepositoryId !== null
    ) {
      message.headRepositoryId = RepositoryId.fromPartial(
        object.headRepositoryId
      );
    } else {
      message.headRepositoryId = undefined;
    }
    if (object.baseBranch !== undefined && object.baseBranch !== null) {
      message.baseBranch = object.baseBranch;
    } else {
      message.baseBranch = "";
    }
    if (
      object.baseRepositoryId !== undefined &&
      object.baseRepositoryId !== null
    ) {
      message.baseRepositoryId = RepositoryId.fromPartial(
        object.baseRepositoryId
      );
    } else {
      message.baseRepositoryId = undefined;
    }
    if (object.reviewers !== undefined && object.reviewers !== null) {
      for (const e of object.reviewers) {
        message.reviewers.push(e);
      }
    }
    if (object.assignees !== undefined && object.assignees !== null) {
      for (const e of object.assignees) {
        message.assignees.push(e);
      }
    }
    if (object.labelIds !== undefined && object.labelIds !== null) {
      for (const e of object.labelIds) {
        message.labelIds.push(e);
      }
    }
    return message;
  },
};

const baseMsgCreatePullRequestResponse: object = { id: 0, iid: 0 };

export const MsgCreatePullRequestResponse = {
  encode(
    message: MsgCreatePullRequestResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.iid !== 0) {
      writer.uint32(16).uint64(message.iid);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgCreatePullRequestResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCreatePullRequestResponse,
    } as MsgCreatePullRequestResponse;
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
    const message = {
      ...baseMsgCreatePullRequestResponse,
    } as MsgCreatePullRequestResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.iid !== undefined && object.iid !== null) {
      message.iid = Number(object.iid);
    } else {
      message.iid = 0;
    }
    return message;
  },

  toJSON(message: MsgCreatePullRequestResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.iid !== undefined && (obj.iid = message.iid);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCreatePullRequestResponse>
  ): MsgCreatePullRequestResponse {
    const message = {
      ...baseMsgCreatePullRequestResponse,
    } as MsgCreatePullRequestResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.iid !== undefined && object.iid !== null) {
      message.iid = object.iid;
    } else {
      message.iid = 0;
    }
    return message;
  },
};

const baseMsgUpdatePullRequestTitle: object = { creator: "", id: 0, title: "" };

export const MsgUpdatePullRequestTitle = {
  encode(
    message: MsgUpdatePullRequestTitle,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.title !== "") {
      writer.uint32(26).string(message.title);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdatePullRequestTitle {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdatePullRequestTitle,
    } as MsgUpdatePullRequestTitle;
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
    const message = {
      ...baseMsgUpdatePullRequestTitle,
    } as MsgUpdatePullRequestTitle;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = "";
    }
    return message;
  },

  toJSON(message: MsgUpdatePullRequestTitle): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.title !== undefined && (obj.title = message.title);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgUpdatePullRequestTitle>
  ): MsgUpdatePullRequestTitle {
    const message = {
      ...baseMsgUpdatePullRequestTitle,
    } as MsgUpdatePullRequestTitle;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    } else {
      message.title = "";
    }
    return message;
  },
};

const baseMsgUpdatePullRequestTitleResponse: object = {};

export const MsgUpdatePullRequestTitleResponse = {
  encode(
    _: MsgUpdatePullRequestTitleResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdatePullRequestTitleResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdatePullRequestTitleResponse,
    } as MsgUpdatePullRequestTitleResponse;
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
    const message = {
      ...baseMsgUpdatePullRequestTitleResponse,
    } as MsgUpdatePullRequestTitleResponse;
    return message;
  },

  toJSON(_: MsgUpdatePullRequestTitleResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdatePullRequestTitleResponse>
  ): MsgUpdatePullRequestTitleResponse {
    const message = {
      ...baseMsgUpdatePullRequestTitleResponse,
    } as MsgUpdatePullRequestTitleResponse;
    return message;
  },
};

const baseMsgUpdatePullRequestDescription: object = {
  creator: "",
  id: 0,
  description: "",
};

export const MsgUpdatePullRequestDescription = {
  encode(
    message: MsgUpdatePullRequestDescription,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdatePullRequestDescription {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdatePullRequestDescription,
    } as MsgUpdatePullRequestDescription;
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
    const message = {
      ...baseMsgUpdatePullRequestDescription,
    } as MsgUpdatePullRequestDescription;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    return message;
  },

  toJSON(message: MsgUpdatePullRequestDescription): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.description !== undefined &&
      (obj.description = message.description);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgUpdatePullRequestDescription>
  ): MsgUpdatePullRequestDescription {
    const message = {
      ...baseMsgUpdatePullRequestDescription,
    } as MsgUpdatePullRequestDescription;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    return message;
  },
};

const baseMsgUpdatePullRequestDescriptionResponse: object = {};

export const MsgUpdatePullRequestDescriptionResponse = {
  encode(
    _: MsgUpdatePullRequestDescriptionResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdatePullRequestDescriptionResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdatePullRequestDescriptionResponse,
    } as MsgUpdatePullRequestDescriptionResponse;
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
    const message = {
      ...baseMsgUpdatePullRequestDescriptionResponse,
    } as MsgUpdatePullRequestDescriptionResponse;
    return message;
  },

  toJSON(_: MsgUpdatePullRequestDescriptionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdatePullRequestDescriptionResponse>
  ): MsgUpdatePullRequestDescriptionResponse {
    const message = {
      ...baseMsgUpdatePullRequestDescriptionResponse,
    } as MsgUpdatePullRequestDescriptionResponse;
    return message;
  },
};

const baseMsgInvokeMergePullRequest: object = {
  creator: "",
  id: 0,
  provider: "",
};

export const MsgInvokeMergePullRequest = {
  encode(
    message: MsgInvokeMergePullRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.provider !== "") {
      writer.uint32(26).string(message.provider);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgInvokeMergePullRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgInvokeMergePullRequest,
    } as MsgInvokeMergePullRequest;
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
    const message = {
      ...baseMsgInvokeMergePullRequest,
    } as MsgInvokeMergePullRequest;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = String(object.provider);
    } else {
      message.provider = "";
    }
    return message;
  },

  toJSON(message: MsgInvokeMergePullRequest): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.provider !== undefined && (obj.provider = message.provider);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgInvokeMergePullRequest>
  ): MsgInvokeMergePullRequest {
    const message = {
      ...baseMsgInvokeMergePullRequest,
    } as MsgInvokeMergePullRequest;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = object.provider;
    } else {
      message.provider = "";
    }
    return message;
  },
};

const baseMsgInvokeMergePullRequestResponse: object = {};

export const MsgInvokeMergePullRequestResponse = {
  encode(
    _: MsgInvokeMergePullRequestResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgInvokeMergePullRequestResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgInvokeMergePullRequestResponse,
    } as MsgInvokeMergePullRequestResponse;
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
    const message = {
      ...baseMsgInvokeMergePullRequestResponse,
    } as MsgInvokeMergePullRequestResponse;
    return message;
  },

  toJSON(_: MsgInvokeMergePullRequestResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgInvokeMergePullRequestResponse>
  ): MsgInvokeMergePullRequestResponse {
    const message = {
      ...baseMsgInvokeMergePullRequestResponse,
    } as MsgInvokeMergePullRequestResponse;
    return message;
  },
};

const baseMsgSetPullRequestState: object = {
  creator: "",
  id: 0,
  state: "",
  mergeCommitSha: "",
  taskId: 0,
};

export const MsgSetPullRequestState = {
  encode(
    message: MsgSetPullRequestState,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.state !== "") {
      writer.uint32(26).string(message.state);
    }
    if (message.mergeCommitSha !== "") {
      writer.uint32(34).string(message.mergeCommitSha);
    }
    if (message.taskId !== 0) {
      writer.uint32(40).uint64(message.taskId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSetPullRequestState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgSetPullRequestState } as MsgSetPullRequestState;
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
          message.state = reader.string();
          break;
        case 4:
          message.mergeCommitSha = reader.string();
          break;
        case 5:
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
    const message = { ...baseMsgSetPullRequestState } as MsgSetPullRequestState;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = String(object.state);
    } else {
      message.state = "";
    }
    if (object.mergeCommitSha !== undefined && object.mergeCommitSha !== null) {
      message.mergeCommitSha = String(object.mergeCommitSha);
    } else {
      message.mergeCommitSha = "";
    }
    if (object.taskId !== undefined && object.taskId !== null) {
      message.taskId = Number(object.taskId);
    } else {
      message.taskId = 0;
    }
    return message;
  },

  toJSON(message: MsgSetPullRequestState): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.state !== undefined && (obj.state = message.state);
    message.mergeCommitSha !== undefined &&
      (obj.mergeCommitSha = message.mergeCommitSha);
    message.taskId !== undefined && (obj.taskId = message.taskId);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgSetPullRequestState>
  ): MsgSetPullRequestState {
    const message = { ...baseMsgSetPullRequestState } as MsgSetPullRequestState;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    } else {
      message.state = "";
    }
    if (object.mergeCommitSha !== undefined && object.mergeCommitSha !== null) {
      message.mergeCommitSha = object.mergeCommitSha;
    } else {
      message.mergeCommitSha = "";
    }
    if (object.taskId !== undefined && object.taskId !== null) {
      message.taskId = object.taskId;
    } else {
      message.taskId = 0;
    }
    return message;
  },
};

const baseMsgSetPullRequestStateResponse: object = { state: "" };

export const MsgSetPullRequestStateResponse = {
  encode(
    message: MsgSetPullRequestStateResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.state !== "") {
      writer.uint32(10).string(message.state);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgSetPullRequestStateResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgSetPullRequestStateResponse,
    } as MsgSetPullRequestStateResponse;
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
    const message = {
      ...baseMsgSetPullRequestStateResponse,
    } as MsgSetPullRequestStateResponse;
    if (object.state !== undefined && object.state !== null) {
      message.state = String(object.state);
    } else {
      message.state = "";
    }
    return message;
  },

  toJSON(message: MsgSetPullRequestStateResponse): unknown {
    const obj: any = {};
    message.state !== undefined && (obj.state = message.state);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgSetPullRequestStateResponse>
  ): MsgSetPullRequestStateResponse {
    const message = {
      ...baseMsgSetPullRequestStateResponse,
    } as MsgSetPullRequestStateResponse;
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    } else {
      message.state = "";
    }
    return message;
  },
};

const baseMsgAddPullRequestReviewers: object = {
  creator: "",
  id: 0,
  reviewers: "",
};

export const MsgAddPullRequestReviewers = {
  encode(
    message: MsgAddPullRequestReviewers,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    for (const v of message.reviewers) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgAddPullRequestReviewers {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgAddPullRequestReviewers,
    } as MsgAddPullRequestReviewers;
    message.reviewers = [];
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
    const message = {
      ...baseMsgAddPullRequestReviewers,
    } as MsgAddPullRequestReviewers;
    message.reviewers = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.reviewers !== undefined && object.reviewers !== null) {
      for (const e of object.reviewers) {
        message.reviewers.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: MsgAddPullRequestReviewers): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    if (message.reviewers) {
      obj.reviewers = message.reviewers.map((e) => e);
    } else {
      obj.reviewers = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgAddPullRequestReviewers>
  ): MsgAddPullRequestReviewers {
    const message = {
      ...baseMsgAddPullRequestReviewers,
    } as MsgAddPullRequestReviewers;
    message.reviewers = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.reviewers !== undefined && object.reviewers !== null) {
      for (const e of object.reviewers) {
        message.reviewers.push(e);
      }
    }
    return message;
  },
};

const baseMsgAddPullRequestReviewersResponse: object = {};

export const MsgAddPullRequestReviewersResponse = {
  encode(
    _: MsgAddPullRequestReviewersResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgAddPullRequestReviewersResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgAddPullRequestReviewersResponse,
    } as MsgAddPullRequestReviewersResponse;
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
    const message = {
      ...baseMsgAddPullRequestReviewersResponse,
    } as MsgAddPullRequestReviewersResponse;
    return message;
  },

  toJSON(_: MsgAddPullRequestReviewersResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgAddPullRequestReviewersResponse>
  ): MsgAddPullRequestReviewersResponse {
    const message = {
      ...baseMsgAddPullRequestReviewersResponse,
    } as MsgAddPullRequestReviewersResponse;
    return message;
  },
};

const baseMsgRemovePullRequestReviewers: object = {
  creator: "",
  id: 0,
  reviewers: "",
};

export const MsgRemovePullRequestReviewers = {
  encode(
    message: MsgRemovePullRequestReviewers,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    for (const v of message.reviewers) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgRemovePullRequestReviewers {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgRemovePullRequestReviewers,
    } as MsgRemovePullRequestReviewers;
    message.reviewers = [];
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
    const message = {
      ...baseMsgRemovePullRequestReviewers,
    } as MsgRemovePullRequestReviewers;
    message.reviewers = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.reviewers !== undefined && object.reviewers !== null) {
      for (const e of object.reviewers) {
        message.reviewers.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: MsgRemovePullRequestReviewers): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    if (message.reviewers) {
      obj.reviewers = message.reviewers.map((e) => e);
    } else {
      obj.reviewers = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgRemovePullRequestReviewers>
  ): MsgRemovePullRequestReviewers {
    const message = {
      ...baseMsgRemovePullRequestReviewers,
    } as MsgRemovePullRequestReviewers;
    message.reviewers = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.reviewers !== undefined && object.reviewers !== null) {
      for (const e of object.reviewers) {
        message.reviewers.push(e);
      }
    }
    return message;
  },
};

const baseMsgRemovePullRequestReviewersResponse: object = {};

export const MsgRemovePullRequestReviewersResponse = {
  encode(
    _: MsgRemovePullRequestReviewersResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgRemovePullRequestReviewersResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgRemovePullRequestReviewersResponse,
    } as MsgRemovePullRequestReviewersResponse;
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
    const message = {
      ...baseMsgRemovePullRequestReviewersResponse,
    } as MsgRemovePullRequestReviewersResponse;
    return message;
  },

  toJSON(_: MsgRemovePullRequestReviewersResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgRemovePullRequestReviewersResponse>
  ): MsgRemovePullRequestReviewersResponse {
    const message = {
      ...baseMsgRemovePullRequestReviewersResponse,
    } as MsgRemovePullRequestReviewersResponse;
    return message;
  },
};

const baseMsgAddPullRequestAssignees: object = {
  creator: "",
  id: 0,
  assignees: "",
};

export const MsgAddPullRequestAssignees = {
  encode(
    message: MsgAddPullRequestAssignees,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    for (const v of message.assignees) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgAddPullRequestAssignees {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgAddPullRequestAssignees,
    } as MsgAddPullRequestAssignees;
    message.assignees = [];
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
    const message = {
      ...baseMsgAddPullRequestAssignees,
    } as MsgAddPullRequestAssignees;
    message.assignees = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.assignees !== undefined && object.assignees !== null) {
      for (const e of object.assignees) {
        message.assignees.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: MsgAddPullRequestAssignees): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    if (message.assignees) {
      obj.assignees = message.assignees.map((e) => e);
    } else {
      obj.assignees = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgAddPullRequestAssignees>
  ): MsgAddPullRequestAssignees {
    const message = {
      ...baseMsgAddPullRequestAssignees,
    } as MsgAddPullRequestAssignees;
    message.assignees = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.assignees !== undefined && object.assignees !== null) {
      for (const e of object.assignees) {
        message.assignees.push(e);
      }
    }
    return message;
  },
};

const baseMsgAddPullRequestAssigneesResponse: object = {};

export const MsgAddPullRequestAssigneesResponse = {
  encode(
    _: MsgAddPullRequestAssigneesResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgAddPullRequestAssigneesResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgAddPullRequestAssigneesResponse,
    } as MsgAddPullRequestAssigneesResponse;
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
    const message = {
      ...baseMsgAddPullRequestAssigneesResponse,
    } as MsgAddPullRequestAssigneesResponse;
    return message;
  },

  toJSON(_: MsgAddPullRequestAssigneesResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgAddPullRequestAssigneesResponse>
  ): MsgAddPullRequestAssigneesResponse {
    const message = {
      ...baseMsgAddPullRequestAssigneesResponse,
    } as MsgAddPullRequestAssigneesResponse;
    return message;
  },
};

const baseMsgRemovePullRequestAssignees: object = {
  creator: "",
  id: 0,
  assignees: "",
};

export const MsgRemovePullRequestAssignees = {
  encode(
    message: MsgRemovePullRequestAssignees,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    for (const v of message.assignees) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgRemovePullRequestAssignees {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgRemovePullRequestAssignees,
    } as MsgRemovePullRequestAssignees;
    message.assignees = [];
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
    const message = {
      ...baseMsgRemovePullRequestAssignees,
    } as MsgRemovePullRequestAssignees;
    message.assignees = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.assignees !== undefined && object.assignees !== null) {
      for (const e of object.assignees) {
        message.assignees.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: MsgRemovePullRequestAssignees): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    if (message.assignees) {
      obj.assignees = message.assignees.map((e) => e);
    } else {
      obj.assignees = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgRemovePullRequestAssignees>
  ): MsgRemovePullRequestAssignees {
    const message = {
      ...baseMsgRemovePullRequestAssignees,
    } as MsgRemovePullRequestAssignees;
    message.assignees = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.assignees !== undefined && object.assignees !== null) {
      for (const e of object.assignees) {
        message.assignees.push(e);
      }
    }
    return message;
  },
};

const baseMsgRemovePullRequestAssigneesResponse: object = {};

export const MsgRemovePullRequestAssigneesResponse = {
  encode(
    _: MsgRemovePullRequestAssigneesResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgRemovePullRequestAssigneesResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgRemovePullRequestAssigneesResponse,
    } as MsgRemovePullRequestAssigneesResponse;
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
    const message = {
      ...baseMsgRemovePullRequestAssigneesResponse,
    } as MsgRemovePullRequestAssigneesResponse;
    return message;
  },

  toJSON(_: MsgRemovePullRequestAssigneesResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgRemovePullRequestAssigneesResponse>
  ): MsgRemovePullRequestAssigneesResponse {
    const message = {
      ...baseMsgRemovePullRequestAssigneesResponse,
    } as MsgRemovePullRequestAssigneesResponse;
    return message;
  },
};

const baseMsgAddPullRequestLabels: object = {
  creator: "",
  pullRequestId: 0,
  labelIds: 0,
};

export const MsgAddPullRequestLabels = {
  encode(
    message: MsgAddPullRequestLabels,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.pullRequestId !== 0) {
      writer.uint32(16).uint64(message.pullRequestId);
    }
    writer.uint32(26).fork();
    for (const v of message.labelIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgAddPullRequestLabels {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgAddPullRequestLabels,
    } as MsgAddPullRequestLabels;
    message.labelIds = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.pullRequestId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
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
    const message = {
      ...baseMsgAddPullRequestLabels,
    } as MsgAddPullRequestLabels;
    message.labelIds = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.pullRequestId !== undefined && object.pullRequestId !== null) {
      message.pullRequestId = Number(object.pullRequestId);
    } else {
      message.pullRequestId = 0;
    }
    if (object.labelIds !== undefined && object.labelIds !== null) {
      for (const e of object.labelIds) {
        message.labelIds.push(Number(e));
      }
    }
    return message;
  },

  toJSON(message: MsgAddPullRequestLabels): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.pullRequestId !== undefined &&
      (obj.pullRequestId = message.pullRequestId);
    if (message.labelIds) {
      obj.labelIds = message.labelIds.map((e) => e);
    } else {
      obj.labelIds = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgAddPullRequestLabels>
  ): MsgAddPullRequestLabels {
    const message = {
      ...baseMsgAddPullRequestLabels,
    } as MsgAddPullRequestLabels;
    message.labelIds = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.pullRequestId !== undefined && object.pullRequestId !== null) {
      message.pullRequestId = object.pullRequestId;
    } else {
      message.pullRequestId = 0;
    }
    if (object.labelIds !== undefined && object.labelIds !== null) {
      for (const e of object.labelIds) {
        message.labelIds.push(e);
      }
    }
    return message;
  },
};

const baseMsgAddPullRequestLabelsResponse: object = {};

export const MsgAddPullRequestLabelsResponse = {
  encode(
    _: MsgAddPullRequestLabelsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgAddPullRequestLabelsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgAddPullRequestLabelsResponse,
    } as MsgAddPullRequestLabelsResponse;
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
    const message = {
      ...baseMsgAddPullRequestLabelsResponse,
    } as MsgAddPullRequestLabelsResponse;
    return message;
  },

  toJSON(_: MsgAddPullRequestLabelsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgAddPullRequestLabelsResponse>
  ): MsgAddPullRequestLabelsResponse {
    const message = {
      ...baseMsgAddPullRequestLabelsResponse,
    } as MsgAddPullRequestLabelsResponse;
    return message;
  },
};

const baseMsgRemovePullRequestLabels: object = {
  creator: "",
  pullRequestId: 0,
  labelIds: 0,
};

export const MsgRemovePullRequestLabels = {
  encode(
    message: MsgRemovePullRequestLabels,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.pullRequestId !== 0) {
      writer.uint32(16).uint64(message.pullRequestId);
    }
    writer.uint32(26).fork();
    for (const v of message.labelIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgRemovePullRequestLabels {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgRemovePullRequestLabels,
    } as MsgRemovePullRequestLabels;
    message.labelIds = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.pullRequestId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
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
    const message = {
      ...baseMsgRemovePullRequestLabels,
    } as MsgRemovePullRequestLabels;
    message.labelIds = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.pullRequestId !== undefined && object.pullRequestId !== null) {
      message.pullRequestId = Number(object.pullRequestId);
    } else {
      message.pullRequestId = 0;
    }
    if (object.labelIds !== undefined && object.labelIds !== null) {
      for (const e of object.labelIds) {
        message.labelIds.push(Number(e));
      }
    }
    return message;
  },

  toJSON(message: MsgRemovePullRequestLabels): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.pullRequestId !== undefined &&
      (obj.pullRequestId = message.pullRequestId);
    if (message.labelIds) {
      obj.labelIds = message.labelIds.map((e) => e);
    } else {
      obj.labelIds = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgRemovePullRequestLabels>
  ): MsgRemovePullRequestLabels {
    const message = {
      ...baseMsgRemovePullRequestLabels,
    } as MsgRemovePullRequestLabels;
    message.labelIds = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.pullRequestId !== undefined && object.pullRequestId !== null) {
      message.pullRequestId = object.pullRequestId;
    } else {
      message.pullRequestId = 0;
    }
    if (object.labelIds !== undefined && object.labelIds !== null) {
      for (const e of object.labelIds) {
        message.labelIds.push(e);
      }
    }
    return message;
  },
};

const baseMsgRemovePullRequestLabelsResponse: object = {};

export const MsgRemovePullRequestLabelsResponse = {
  encode(
    _: MsgRemovePullRequestLabelsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgRemovePullRequestLabelsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgRemovePullRequestLabelsResponse,
    } as MsgRemovePullRequestLabelsResponse;
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
    const message = {
      ...baseMsgRemovePullRequestLabelsResponse,
    } as MsgRemovePullRequestLabelsResponse;
    return message;
  },

  toJSON(_: MsgRemovePullRequestLabelsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgRemovePullRequestLabelsResponse>
  ): MsgRemovePullRequestLabelsResponse {
    const message = {
      ...baseMsgRemovePullRequestLabelsResponse,
    } as MsgRemovePullRequestLabelsResponse;
    return message;
  },
};

const baseMsgDeletePullRequest: object = { creator: "", id: 0 };

export const MsgDeletePullRequest = {
  encode(
    message: MsgDeletePullRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeletePullRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeletePullRequest } as MsgDeletePullRequest;
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

  fromJSON(object: any): MsgDeletePullRequest {
    const message = { ...baseMsgDeletePullRequest } as MsgDeletePullRequest;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: MsgDeletePullRequest): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgDeletePullRequest>): MsgDeletePullRequest {
    const message = { ...baseMsgDeletePullRequest } as MsgDeletePullRequest;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseMsgDeletePullRequestResponse: object = {};

export const MsgDeletePullRequestResponse = {
  encode(
    _: MsgDeletePullRequestResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgDeletePullRequestResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgDeletePullRequestResponse,
    } as MsgDeletePullRequestResponse;
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
    const message = {
      ...baseMsgDeletePullRequestResponse,
    } as MsgDeletePullRequestResponse;
    return message;
  },

  toJSON(_: MsgDeletePullRequestResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgDeletePullRequestResponse>
  ): MsgDeletePullRequestResponse {
    const message = {
      ...baseMsgDeletePullRequestResponse,
    } as MsgDeletePullRequestResponse;
    return message;
  },
};

const baseMsgCreateDao: object = {
  creator: "",
  name: "",
  description: "",
  avatarUrl: "",
  location: "",
  website: "",
};

export const MsgCreateDao = {
  encode(message: MsgCreateDao, writer: Writer = Writer.create()): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): MsgCreateDao {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateDao } as MsgCreateDao;
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
    const message = { ...baseMsgCreateDao } as MsgCreateDao;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.avatarUrl !== undefined && object.avatarUrl !== null) {
      message.avatarUrl = String(object.avatarUrl);
    } else {
      message.avatarUrl = "";
    }
    if (object.location !== undefined && object.location !== null) {
      message.location = String(object.location);
    } else {
      message.location = "";
    }
    if (object.website !== undefined && object.website !== null) {
      message.website = String(object.website);
    } else {
      message.website = "";
    }
    return message;
  },

  toJSON(message: MsgCreateDao): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined &&
      (obj.description = message.description);
    message.avatarUrl !== undefined && (obj.avatarUrl = message.avatarUrl);
    message.location !== undefined && (obj.location = message.location);
    message.website !== undefined && (obj.website = message.website);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreateDao>): MsgCreateDao {
    const message = { ...baseMsgCreateDao } as MsgCreateDao;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.avatarUrl !== undefined && object.avatarUrl !== null) {
      message.avatarUrl = object.avatarUrl;
    } else {
      message.avatarUrl = "";
    }
    if (object.location !== undefined && object.location !== null) {
      message.location = object.location;
    } else {
      message.location = "";
    }
    if (object.website !== undefined && object.website !== null) {
      message.website = object.website;
    } else {
      message.website = "";
    }
    return message;
  },
};

const baseMsgCreateDaoResponse: object = { id: "" };

export const MsgCreateDaoResponse = {
  encode(
    message: MsgCreateDaoResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateDaoResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateDaoResponse } as MsgCreateDaoResponse;
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
    const message = { ...baseMsgCreateDaoResponse } as MsgCreateDaoResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    return message;
  },

  toJSON(message: MsgCreateDaoResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreateDaoResponse>): MsgCreateDaoResponse {
    const message = { ...baseMsgCreateDaoResponse } as MsgCreateDaoResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    return message;
  },
};

const baseMsgRenameDao: object = { creator: "", id: "", name: "" };

export const MsgRenameDao = {
  encode(message: MsgRenameDao, writer: Writer = Writer.create()): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): MsgRenameDao {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgRenameDao } as MsgRenameDao;
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
    const message = { ...baseMsgRenameDao } as MsgRenameDao;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    return message;
  },

  toJSON(message: MsgRenameDao): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgRenameDao>): MsgRenameDao {
    const message = { ...baseMsgRenameDao } as MsgRenameDao;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    return message;
  },
};

const baseMsgRenameDaoResponse: object = {};

export const MsgRenameDaoResponse = {
  encode(_: MsgRenameDaoResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRenameDaoResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgRenameDaoResponse } as MsgRenameDaoResponse;
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
    const message = { ...baseMsgRenameDaoResponse } as MsgRenameDaoResponse;
    return message;
  },

  toJSON(_: MsgRenameDaoResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgRenameDaoResponse>): MsgRenameDaoResponse {
    const message = { ...baseMsgRenameDaoResponse } as MsgRenameDaoResponse;
    return message;
  },
};

const baseMsgUpdateDaoDescription: object = {
  creator: "",
  id: "",
  description: "",
};

export const MsgUpdateDaoDescription = {
  encode(
    message: MsgUpdateDaoDescription,
    writer: Writer = Writer.create()
  ): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateDaoDescription {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateDaoDescription,
    } as MsgUpdateDaoDescription;
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
    const message = {
      ...baseMsgUpdateDaoDescription,
    } as MsgUpdateDaoDescription;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    return message;
  },

  toJSON(message: MsgUpdateDaoDescription): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.description !== undefined &&
      (obj.description = message.description);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgUpdateDaoDescription>
  ): MsgUpdateDaoDescription {
    const message = {
      ...baseMsgUpdateDaoDescription,
    } as MsgUpdateDaoDescription;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    return message;
  },
};

const baseMsgUpdateDaoDescriptionResponse: object = {};

export const MsgUpdateDaoDescriptionResponse = {
  encode(
    _: MsgUpdateDaoDescriptionResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdateDaoDescriptionResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateDaoDescriptionResponse,
    } as MsgUpdateDaoDescriptionResponse;
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
    const message = {
      ...baseMsgUpdateDaoDescriptionResponse,
    } as MsgUpdateDaoDescriptionResponse;
    return message;
  },

  toJSON(_: MsgUpdateDaoDescriptionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateDaoDescriptionResponse>
  ): MsgUpdateDaoDescriptionResponse {
    const message = {
      ...baseMsgUpdateDaoDescriptionResponse,
    } as MsgUpdateDaoDescriptionResponse;
    return message;
  },
};

const baseMsgUpdateDaoWebsite: object = { creator: "", id: "", url: "" };

export const MsgUpdateDaoWebsite = {
  encode(
    message: MsgUpdateDaoWebsite,
    writer: Writer = Writer.create()
  ): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateDaoWebsite {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateDaoWebsite } as MsgUpdateDaoWebsite;
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
    const message = { ...baseMsgUpdateDaoWebsite } as MsgUpdateDaoWebsite;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.url !== undefined && object.url !== null) {
      message.url = String(object.url);
    } else {
      message.url = "";
    }
    return message;
  },

  toJSON(message: MsgUpdateDaoWebsite): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.url !== undefined && (obj.url = message.url);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpdateDaoWebsite>): MsgUpdateDaoWebsite {
    const message = { ...baseMsgUpdateDaoWebsite } as MsgUpdateDaoWebsite;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.url !== undefined && object.url !== null) {
      message.url = object.url;
    } else {
      message.url = "";
    }
    return message;
  },
};

const baseMsgUpdateDaoWebsiteResponse: object = {};

export const MsgUpdateDaoWebsiteResponse = {
  encode(
    _: MsgUpdateDaoWebsiteResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdateDaoWebsiteResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateDaoWebsiteResponse,
    } as MsgUpdateDaoWebsiteResponse;
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
    const message = {
      ...baseMsgUpdateDaoWebsiteResponse,
    } as MsgUpdateDaoWebsiteResponse;
    return message;
  },

  toJSON(_: MsgUpdateDaoWebsiteResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateDaoWebsiteResponse>
  ): MsgUpdateDaoWebsiteResponse {
    const message = {
      ...baseMsgUpdateDaoWebsiteResponse,
    } as MsgUpdateDaoWebsiteResponse;
    return message;
  },
};

const baseMsgUpdateDaoLocation: object = { creator: "", id: "", location: "" };

export const MsgUpdateDaoLocation = {
  encode(
    message: MsgUpdateDaoLocation,
    writer: Writer = Writer.create()
  ): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateDaoLocation {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateDaoLocation } as MsgUpdateDaoLocation;
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
    const message = { ...baseMsgUpdateDaoLocation } as MsgUpdateDaoLocation;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.location !== undefined && object.location !== null) {
      message.location = String(object.location);
    } else {
      message.location = "";
    }
    return message;
  },

  toJSON(message: MsgUpdateDaoLocation): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.location !== undefined && (obj.location = message.location);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpdateDaoLocation>): MsgUpdateDaoLocation {
    const message = { ...baseMsgUpdateDaoLocation } as MsgUpdateDaoLocation;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.location !== undefined && object.location !== null) {
      message.location = object.location;
    } else {
      message.location = "";
    }
    return message;
  },
};

const baseMsgUpdateDaoLocationResponse: object = {};

export const MsgUpdateDaoLocationResponse = {
  encode(
    _: MsgUpdateDaoLocationResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdateDaoLocationResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateDaoLocationResponse,
    } as MsgUpdateDaoLocationResponse;
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
    const message = {
      ...baseMsgUpdateDaoLocationResponse,
    } as MsgUpdateDaoLocationResponse;
    return message;
  },

  toJSON(_: MsgUpdateDaoLocationResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateDaoLocationResponse>
  ): MsgUpdateDaoLocationResponse {
    const message = {
      ...baseMsgUpdateDaoLocationResponse,
    } as MsgUpdateDaoLocationResponse;
    return message;
  },
};

const baseMsgUpdateDaoAvatar: object = { creator: "", id: "", url: "" };

export const MsgUpdateDaoAvatar = {
  encode(
    message: MsgUpdateDaoAvatar,
    writer: Writer = Writer.create()
  ): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateDaoAvatar {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateDaoAvatar } as MsgUpdateDaoAvatar;
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
    const message = { ...baseMsgUpdateDaoAvatar } as MsgUpdateDaoAvatar;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.url !== undefined && object.url !== null) {
      message.url = String(object.url);
    } else {
      message.url = "";
    }
    return message;
  },

  toJSON(message: MsgUpdateDaoAvatar): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.url !== undefined && (obj.url = message.url);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpdateDaoAvatar>): MsgUpdateDaoAvatar {
    const message = { ...baseMsgUpdateDaoAvatar } as MsgUpdateDaoAvatar;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.url !== undefined && object.url !== null) {
      message.url = object.url;
    } else {
      message.url = "";
    }
    return message;
  },
};

const baseMsgUpdateDaoAvatarResponse: object = {};

export const MsgUpdateDaoAvatarResponse = {
  encode(
    _: MsgUpdateDaoAvatarResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdateDaoAvatarResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateDaoAvatarResponse,
    } as MsgUpdateDaoAvatarResponse;
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
    const message = {
      ...baseMsgUpdateDaoAvatarResponse,
    } as MsgUpdateDaoAvatarResponse;
    return message;
  },

  toJSON(_: MsgUpdateDaoAvatarResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateDaoAvatarResponse>
  ): MsgUpdateDaoAvatarResponse {
    const message = {
      ...baseMsgUpdateDaoAvatarResponse,
    } as MsgUpdateDaoAvatarResponse;
    return message;
  },
};

const baseMsgDeleteDao: object = { creator: "", id: "" };

export const MsgDeleteDao = {
  encode(message: MsgDeleteDao, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteDao {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteDao } as MsgDeleteDao;
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
    const message = { ...baseMsgDeleteDao } as MsgDeleteDao;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    return message;
  },

  toJSON(message: MsgDeleteDao): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgDeleteDao>): MsgDeleteDao {
    const message = { ...baseMsgDeleteDao } as MsgDeleteDao;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    return message;
  },
};

const baseMsgDeleteDaoResponse: object = {};

export const MsgDeleteDaoResponse = {
  encode(_: MsgDeleteDaoResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteDaoResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteDaoResponse } as MsgDeleteDaoResponse;
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
    const message = { ...baseMsgDeleteDaoResponse } as MsgDeleteDaoResponse;
    return message;
  },

  toJSON(_: MsgDeleteDaoResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgDeleteDaoResponse>): MsgDeleteDaoResponse {
    const message = { ...baseMsgDeleteDaoResponse } as MsgDeleteDaoResponse;
    return message;
  },
};

const baseMsgCreateComment: object = {
  creator: "",
  parentId: 0,
  body: "",
  attachments: "",
  diffHunk: "",
  path: "",
  system: false,
  authorAssociation: "",
  commentType: "",
};

export const MsgCreateComment = {
  encode(message: MsgCreateComment, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.parentId !== 0) {
      writer.uint32(16).uint64(message.parentId);
    }
    if (message.body !== "") {
      writer.uint32(26).string(message.body);
    }
    for (const v of message.attachments) {
      writer.uint32(34).string(v!);
    }
    if (message.diffHunk !== "") {
      writer.uint32(42).string(message.diffHunk);
    }
    if (message.path !== "") {
      writer.uint32(50).string(message.path);
    }
    if (message.system === true) {
      writer.uint32(56).bool(message.system);
    }
    if (message.authorAssociation !== "") {
      writer.uint32(66).string(message.authorAssociation);
    }
    if (message.commentType !== "") {
      writer.uint32(74).string(message.commentType);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateComment {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateComment } as MsgCreateComment;
    message.attachments = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.parentId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.body = reader.string();
          break;
        case 4:
          message.attachments.push(reader.string());
          break;
        case 5:
          message.diffHunk = reader.string();
          break;
        case 6:
          message.path = reader.string();
          break;
        case 7:
          message.system = reader.bool();
          break;
        case 8:
          message.authorAssociation = reader.string();
          break;
        case 9:
          message.commentType = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateComment {
    const message = { ...baseMsgCreateComment } as MsgCreateComment;
    message.attachments = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.parentId !== undefined && object.parentId !== null) {
      message.parentId = Number(object.parentId);
    } else {
      message.parentId = 0;
    }
    if (object.body !== undefined && object.body !== null) {
      message.body = String(object.body);
    } else {
      message.body = "";
    }
    if (object.attachments !== undefined && object.attachments !== null) {
      for (const e of object.attachments) {
        message.attachments.push(String(e));
      }
    }
    if (object.diffHunk !== undefined && object.diffHunk !== null) {
      message.diffHunk = String(object.diffHunk);
    } else {
      message.diffHunk = "";
    }
    if (object.path !== undefined && object.path !== null) {
      message.path = String(object.path);
    } else {
      message.path = "";
    }
    if (object.system !== undefined && object.system !== null) {
      message.system = Boolean(object.system);
    } else {
      message.system = false;
    }
    if (
      object.authorAssociation !== undefined &&
      object.authorAssociation !== null
    ) {
      message.authorAssociation = String(object.authorAssociation);
    } else {
      message.authorAssociation = "";
    }
    if (object.commentType !== undefined && object.commentType !== null) {
      message.commentType = String(object.commentType);
    } else {
      message.commentType = "";
    }
    return message;
  },

  toJSON(message: MsgCreateComment): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.parentId !== undefined && (obj.parentId = message.parentId);
    message.body !== undefined && (obj.body = message.body);
    if (message.attachments) {
      obj.attachments = message.attachments.map((e) => e);
    } else {
      obj.attachments = [];
    }
    message.diffHunk !== undefined && (obj.diffHunk = message.diffHunk);
    message.path !== undefined && (obj.path = message.path);
    message.system !== undefined && (obj.system = message.system);
    message.authorAssociation !== undefined &&
      (obj.authorAssociation = message.authorAssociation);
    message.commentType !== undefined &&
      (obj.commentType = message.commentType);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreateComment>): MsgCreateComment {
    const message = { ...baseMsgCreateComment } as MsgCreateComment;
    message.attachments = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.parentId !== undefined && object.parentId !== null) {
      message.parentId = object.parentId;
    } else {
      message.parentId = 0;
    }
    if (object.body !== undefined && object.body !== null) {
      message.body = object.body;
    } else {
      message.body = "";
    }
    if (object.attachments !== undefined && object.attachments !== null) {
      for (const e of object.attachments) {
        message.attachments.push(e);
      }
    }
    if (object.diffHunk !== undefined && object.diffHunk !== null) {
      message.diffHunk = object.diffHunk;
    } else {
      message.diffHunk = "";
    }
    if (object.path !== undefined && object.path !== null) {
      message.path = object.path;
    } else {
      message.path = "";
    }
    if (object.system !== undefined && object.system !== null) {
      message.system = object.system;
    } else {
      message.system = false;
    }
    if (
      object.authorAssociation !== undefined &&
      object.authorAssociation !== null
    ) {
      message.authorAssociation = object.authorAssociation;
    } else {
      message.authorAssociation = "";
    }
    if (object.commentType !== undefined && object.commentType !== null) {
      message.commentType = object.commentType;
    } else {
      message.commentType = "";
    }
    return message;
  },
};

const baseMsgCreateCommentResponse: object = { id: 0 };

export const MsgCreateCommentResponse = {
  encode(
    message: MsgCreateCommentResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgCreateCommentResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCreateCommentResponse,
    } as MsgCreateCommentResponse;
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
    const message = {
      ...baseMsgCreateCommentResponse,
    } as MsgCreateCommentResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: MsgCreateCommentResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCreateCommentResponse>
  ): MsgCreateCommentResponse {
    const message = {
      ...baseMsgCreateCommentResponse,
    } as MsgCreateCommentResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseMsgUpdateComment: object = {
  creator: "",
  id: 0,
  body: "",
  attachments: "",
};

export const MsgUpdateComment = {
  encode(message: MsgUpdateComment, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.body !== "") {
      writer.uint32(26).string(message.body);
    }
    for (const v of message.attachments) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateComment {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateComment } as MsgUpdateComment;
    message.attachments = [];
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
          message.body = reader.string();
          break;
        case 4:
          message.attachments.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateComment {
    const message = { ...baseMsgUpdateComment } as MsgUpdateComment;
    message.attachments = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.body !== undefined && object.body !== null) {
      message.body = String(object.body);
    } else {
      message.body = "";
    }
    if (object.attachments !== undefined && object.attachments !== null) {
      for (const e of object.attachments) {
        message.attachments.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: MsgUpdateComment): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.body !== undefined && (obj.body = message.body);
    if (message.attachments) {
      obj.attachments = message.attachments.map((e) => e);
    } else {
      obj.attachments = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpdateComment>): MsgUpdateComment {
    const message = { ...baseMsgUpdateComment } as MsgUpdateComment;
    message.attachments = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.body !== undefined && object.body !== null) {
      message.body = object.body;
    } else {
      message.body = "";
    }
    if (object.attachments !== undefined && object.attachments !== null) {
      for (const e of object.attachments) {
        message.attachments.push(e);
      }
    }
    return message;
  },
};

const baseMsgUpdateCommentResponse: object = {};

export const MsgUpdateCommentResponse = {
  encode(
    _: MsgUpdateCommentResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdateCommentResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateCommentResponse,
    } as MsgUpdateCommentResponse;
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
    const message = {
      ...baseMsgUpdateCommentResponse,
    } as MsgUpdateCommentResponse;
    return message;
  },

  toJSON(_: MsgUpdateCommentResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateCommentResponse>
  ): MsgUpdateCommentResponse {
    const message = {
      ...baseMsgUpdateCommentResponse,
    } as MsgUpdateCommentResponse;
    return message;
  },
};

const baseMsgDeleteComment: object = { creator: "", id: 0 };

export const MsgDeleteComment = {
  encode(message: MsgDeleteComment, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteComment {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteComment } as MsgDeleteComment;
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

  fromJSON(object: any): MsgDeleteComment {
    const message = { ...baseMsgDeleteComment } as MsgDeleteComment;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: MsgDeleteComment): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgDeleteComment>): MsgDeleteComment {
    const message = { ...baseMsgDeleteComment } as MsgDeleteComment;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseMsgDeleteCommentResponse: object = {};

export const MsgDeleteCommentResponse = {
  encode(
    _: MsgDeleteCommentResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgDeleteCommentResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgDeleteCommentResponse,
    } as MsgDeleteCommentResponse;
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
    const message = {
      ...baseMsgDeleteCommentResponse,
    } as MsgDeleteCommentResponse;
    return message;
  },

  toJSON(_: MsgDeleteCommentResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgDeleteCommentResponse>
  ): MsgDeleteCommentResponse {
    const message = {
      ...baseMsgDeleteCommentResponse,
    } as MsgDeleteCommentResponse;
    return message;
  },
};

const baseMsgCreateIssue: object = {
  creator: "",
  title: "",
  description: "",
  labelIds: 0,
  weight: 0,
  assignees: "",
};

export const MsgCreateIssue = {
  encode(message: MsgCreateIssue, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(
        message.repositoryId,
        writer.uint32(18).fork()
      ).ldelim();
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
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateIssue {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateIssue } as MsgCreateIssue;
    message.labelIds = [];
    message.assignees = [];
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
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateIssue {
    const message = { ...baseMsgCreateIssue } as MsgCreateIssue;
    message.labelIds = [];
    message.assignees = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.labelIds !== undefined && object.labelIds !== null) {
      for (const e of object.labelIds) {
        message.labelIds.push(Number(e));
      }
    }
    if (object.weight !== undefined && object.weight !== null) {
      message.weight = Number(object.weight);
    } else {
      message.weight = 0;
    }
    if (object.assignees !== undefined && object.assignees !== null) {
      for (const e of object.assignees) {
        message.assignees.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: MsgCreateIssue): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId
        ? RepositoryId.toJSON(message.repositoryId)
        : undefined);
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined &&
      (obj.description = message.description);
    if (message.labelIds) {
      obj.labelIds = message.labelIds.map((e) => e);
    } else {
      obj.labelIds = [];
    }
    message.weight !== undefined && (obj.weight = message.weight);
    if (message.assignees) {
      obj.assignees = message.assignees.map((e) => e);
    } else {
      obj.assignees = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreateIssue>): MsgCreateIssue {
    const message = { ...baseMsgCreateIssue } as MsgCreateIssue;
    message.labelIds = [];
    message.assignees = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    } else {
      message.title = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.labelIds !== undefined && object.labelIds !== null) {
      for (const e of object.labelIds) {
        message.labelIds.push(e);
      }
    }
    if (object.weight !== undefined && object.weight !== null) {
      message.weight = object.weight;
    } else {
      message.weight = 0;
    }
    if (object.assignees !== undefined && object.assignees !== null) {
      for (const e of object.assignees) {
        message.assignees.push(e);
      }
    }
    return message;
  },
};

const baseMsgCreateIssueResponse: object = { id: 0, iid: 0 };

export const MsgCreateIssueResponse = {
  encode(
    message: MsgCreateIssueResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.iid !== 0) {
      writer.uint32(16).uint64(message.iid);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateIssueResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateIssueResponse } as MsgCreateIssueResponse;
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
    const message = { ...baseMsgCreateIssueResponse } as MsgCreateIssueResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.iid !== undefined && object.iid !== null) {
      message.iid = Number(object.iid);
    } else {
      message.iid = 0;
    }
    return message;
  },

  toJSON(message: MsgCreateIssueResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.iid !== undefined && (obj.iid = message.iid);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCreateIssueResponse>
  ): MsgCreateIssueResponse {
    const message = { ...baseMsgCreateIssueResponse } as MsgCreateIssueResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.iid !== undefined && object.iid !== null) {
      message.iid = object.iid;
    } else {
      message.iid = 0;
    }
    return message;
  },
};

const baseMsgUpdateIssueTitle: object = { creator: "", id: 0, title: "" };

export const MsgUpdateIssueTitle = {
  encode(
    message: MsgUpdateIssueTitle,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.title !== "") {
      writer.uint32(26).string(message.title);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateIssueTitle {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateIssueTitle } as MsgUpdateIssueTitle;
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
    const message = { ...baseMsgUpdateIssueTitle } as MsgUpdateIssueTitle;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = "";
    }
    return message;
  },

  toJSON(message: MsgUpdateIssueTitle): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.title !== undefined && (obj.title = message.title);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpdateIssueTitle>): MsgUpdateIssueTitle {
    const message = { ...baseMsgUpdateIssueTitle } as MsgUpdateIssueTitle;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    } else {
      message.title = "";
    }
    return message;
  },
};

const baseMsgUpdateIssueTitleResponse: object = {};

export const MsgUpdateIssueTitleResponse = {
  encode(
    _: MsgUpdateIssueTitleResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdateIssueTitleResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateIssueTitleResponse,
    } as MsgUpdateIssueTitleResponse;
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
    const message = {
      ...baseMsgUpdateIssueTitleResponse,
    } as MsgUpdateIssueTitleResponse;
    return message;
  },

  toJSON(_: MsgUpdateIssueTitleResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateIssueTitleResponse>
  ): MsgUpdateIssueTitleResponse {
    const message = {
      ...baseMsgUpdateIssueTitleResponse,
    } as MsgUpdateIssueTitleResponse;
    return message;
  },
};

const baseMsgUpdateIssueDescription: object = {
  creator: "",
  id: 0,
  description: "",
};

export const MsgUpdateIssueDescription = {
  encode(
    message: MsgUpdateIssueDescription,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdateIssueDescription {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateIssueDescription,
    } as MsgUpdateIssueDescription;
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
    const message = {
      ...baseMsgUpdateIssueDescription,
    } as MsgUpdateIssueDescription;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    return message;
  },

  toJSON(message: MsgUpdateIssueDescription): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.description !== undefined &&
      (obj.description = message.description);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgUpdateIssueDescription>
  ): MsgUpdateIssueDescription {
    const message = {
      ...baseMsgUpdateIssueDescription,
    } as MsgUpdateIssueDescription;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    return message;
  },
};

const baseMsgUpdateIssueDescriptionResponse: object = {};

export const MsgUpdateIssueDescriptionResponse = {
  encode(
    _: MsgUpdateIssueDescriptionResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdateIssueDescriptionResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateIssueDescriptionResponse,
    } as MsgUpdateIssueDescriptionResponse;
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
    const message = {
      ...baseMsgUpdateIssueDescriptionResponse,
    } as MsgUpdateIssueDescriptionResponse;
    return message;
  },

  toJSON(_: MsgUpdateIssueDescriptionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateIssueDescriptionResponse>
  ): MsgUpdateIssueDescriptionResponse {
    const message = {
      ...baseMsgUpdateIssueDescriptionResponse,
    } as MsgUpdateIssueDescriptionResponse;
    return message;
  },
};

const baseMsgToggleIssueState: object = { creator: "", id: 0 };

export const MsgToggleIssueState = {
  encode(
    message: MsgToggleIssueState,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgToggleIssueState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgToggleIssueState } as MsgToggleIssueState;
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

  fromJSON(object: any): MsgToggleIssueState {
    const message = { ...baseMsgToggleIssueState } as MsgToggleIssueState;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: MsgToggleIssueState): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgToggleIssueState>): MsgToggleIssueState {
    const message = { ...baseMsgToggleIssueState } as MsgToggleIssueState;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseMsgToggleIssueStateResponse: object = { state: "" };

export const MsgToggleIssueStateResponse = {
  encode(
    message: MsgToggleIssueStateResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.state !== "") {
      writer.uint32(10).string(message.state);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgToggleIssueStateResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgToggleIssueStateResponse,
    } as MsgToggleIssueStateResponse;
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
    const message = {
      ...baseMsgToggleIssueStateResponse,
    } as MsgToggleIssueStateResponse;
    if (object.state !== undefined && object.state !== null) {
      message.state = String(object.state);
    } else {
      message.state = "";
    }
    return message;
  },

  toJSON(message: MsgToggleIssueStateResponse): unknown {
    const obj: any = {};
    message.state !== undefined && (obj.state = message.state);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgToggleIssueStateResponse>
  ): MsgToggleIssueStateResponse {
    const message = {
      ...baseMsgToggleIssueStateResponse,
    } as MsgToggleIssueStateResponse;
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    } else {
      message.state = "";
    }
    return message;
  },
};

const baseMsgAddIssueAssignees: object = { creator: "", id: 0, assignees: "" };

export const MsgAddIssueAssignees = {
  encode(
    message: MsgAddIssueAssignees,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    for (const v of message.assignees) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgAddIssueAssignees {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgAddIssueAssignees } as MsgAddIssueAssignees;
    message.assignees = [];
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
    const message = { ...baseMsgAddIssueAssignees } as MsgAddIssueAssignees;
    message.assignees = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.assignees !== undefined && object.assignees !== null) {
      for (const e of object.assignees) {
        message.assignees.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: MsgAddIssueAssignees): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    if (message.assignees) {
      obj.assignees = message.assignees.map((e) => e);
    } else {
      obj.assignees = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<MsgAddIssueAssignees>): MsgAddIssueAssignees {
    const message = { ...baseMsgAddIssueAssignees } as MsgAddIssueAssignees;
    message.assignees = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.assignees !== undefined && object.assignees !== null) {
      for (const e of object.assignees) {
        message.assignees.push(e);
      }
    }
    return message;
  },
};

const baseMsgAddIssueAssigneesResponse: object = {};

export const MsgAddIssueAssigneesResponse = {
  encode(
    _: MsgAddIssueAssigneesResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgAddIssueAssigneesResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgAddIssueAssigneesResponse,
    } as MsgAddIssueAssigneesResponse;
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
    const message = {
      ...baseMsgAddIssueAssigneesResponse,
    } as MsgAddIssueAssigneesResponse;
    return message;
  },

  toJSON(_: MsgAddIssueAssigneesResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgAddIssueAssigneesResponse>
  ): MsgAddIssueAssigneesResponse {
    const message = {
      ...baseMsgAddIssueAssigneesResponse,
    } as MsgAddIssueAssigneesResponse;
    return message;
  },
};

const baseMsgRemoveIssueAssignees: object = {
  creator: "",
  id: 0,
  assignees: "",
};

export const MsgRemoveIssueAssignees = {
  encode(
    message: MsgRemoveIssueAssignees,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    for (const v of message.assignees) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRemoveIssueAssignees {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgRemoveIssueAssignees,
    } as MsgRemoveIssueAssignees;
    message.assignees = [];
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
    const message = {
      ...baseMsgRemoveIssueAssignees,
    } as MsgRemoveIssueAssignees;
    message.assignees = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.assignees !== undefined && object.assignees !== null) {
      for (const e of object.assignees) {
        message.assignees.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: MsgRemoveIssueAssignees): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    if (message.assignees) {
      obj.assignees = message.assignees.map((e) => e);
    } else {
      obj.assignees = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgRemoveIssueAssignees>
  ): MsgRemoveIssueAssignees {
    const message = {
      ...baseMsgRemoveIssueAssignees,
    } as MsgRemoveIssueAssignees;
    message.assignees = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.assignees !== undefined && object.assignees !== null) {
      for (const e of object.assignees) {
        message.assignees.push(e);
      }
    }
    return message;
  },
};

const baseMsgRemoveIssueAssigneesResponse: object = {};

export const MsgRemoveIssueAssigneesResponse = {
  encode(
    _: MsgRemoveIssueAssigneesResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgRemoveIssueAssigneesResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgRemoveIssueAssigneesResponse,
    } as MsgRemoveIssueAssigneesResponse;
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
    const message = {
      ...baseMsgRemoveIssueAssigneesResponse,
    } as MsgRemoveIssueAssigneesResponse;
    return message;
  },

  toJSON(_: MsgRemoveIssueAssigneesResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgRemoveIssueAssigneesResponse>
  ): MsgRemoveIssueAssigneesResponse {
    const message = {
      ...baseMsgRemoveIssueAssigneesResponse,
    } as MsgRemoveIssueAssigneesResponse;
    return message;
  },
};

const baseMsgAddIssueLabels: object = { creator: "", issueId: 0, labelIds: 0 };

export const MsgAddIssueLabels = {
  encode(message: MsgAddIssueLabels, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.issueId !== 0) {
      writer.uint32(16).uint64(message.issueId);
    }
    writer.uint32(26).fork();
    for (const v of message.labelIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgAddIssueLabels {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgAddIssueLabels } as MsgAddIssueLabels;
    message.labelIds = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.issueId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
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
    const message = { ...baseMsgAddIssueLabels } as MsgAddIssueLabels;
    message.labelIds = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.issueId !== undefined && object.issueId !== null) {
      message.issueId = Number(object.issueId);
    } else {
      message.issueId = 0;
    }
    if (object.labelIds !== undefined && object.labelIds !== null) {
      for (const e of object.labelIds) {
        message.labelIds.push(Number(e));
      }
    }
    return message;
  },

  toJSON(message: MsgAddIssueLabels): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.issueId !== undefined && (obj.issueId = message.issueId);
    if (message.labelIds) {
      obj.labelIds = message.labelIds.map((e) => e);
    } else {
      obj.labelIds = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<MsgAddIssueLabels>): MsgAddIssueLabels {
    const message = { ...baseMsgAddIssueLabels } as MsgAddIssueLabels;
    message.labelIds = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.issueId !== undefined && object.issueId !== null) {
      message.issueId = object.issueId;
    } else {
      message.issueId = 0;
    }
    if (object.labelIds !== undefined && object.labelIds !== null) {
      for (const e of object.labelIds) {
        message.labelIds.push(e);
      }
    }
    return message;
  },
};

const baseMsgAddIssueLabelsResponse: object = {};

export const MsgAddIssueLabelsResponse = {
  encode(
    _: MsgAddIssueLabelsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgAddIssueLabelsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgAddIssueLabelsResponse,
    } as MsgAddIssueLabelsResponse;
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
    const message = {
      ...baseMsgAddIssueLabelsResponse,
    } as MsgAddIssueLabelsResponse;
    return message;
  },

  toJSON(_: MsgAddIssueLabelsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgAddIssueLabelsResponse>
  ): MsgAddIssueLabelsResponse {
    const message = {
      ...baseMsgAddIssueLabelsResponse,
    } as MsgAddIssueLabelsResponse;
    return message;
  },
};

const baseMsgRemoveIssueLabels: object = {
  creator: "",
  issueId: 0,
  labelIds: 0,
};

export const MsgRemoveIssueLabels = {
  encode(
    message: MsgRemoveIssueLabels,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.issueId !== 0) {
      writer.uint32(16).uint64(message.issueId);
    }
    writer.uint32(26).fork();
    for (const v of message.labelIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRemoveIssueLabels {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgRemoveIssueLabels } as MsgRemoveIssueLabels;
    message.labelIds = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.issueId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
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
    const message = { ...baseMsgRemoveIssueLabels } as MsgRemoveIssueLabels;
    message.labelIds = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.issueId !== undefined && object.issueId !== null) {
      message.issueId = Number(object.issueId);
    } else {
      message.issueId = 0;
    }
    if (object.labelIds !== undefined && object.labelIds !== null) {
      for (const e of object.labelIds) {
        message.labelIds.push(Number(e));
      }
    }
    return message;
  },

  toJSON(message: MsgRemoveIssueLabels): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.issueId !== undefined && (obj.issueId = message.issueId);
    if (message.labelIds) {
      obj.labelIds = message.labelIds.map((e) => e);
    } else {
      obj.labelIds = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<MsgRemoveIssueLabels>): MsgRemoveIssueLabels {
    const message = { ...baseMsgRemoveIssueLabels } as MsgRemoveIssueLabels;
    message.labelIds = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.issueId !== undefined && object.issueId !== null) {
      message.issueId = object.issueId;
    } else {
      message.issueId = 0;
    }
    if (object.labelIds !== undefined && object.labelIds !== null) {
      for (const e of object.labelIds) {
        message.labelIds.push(e);
      }
    }
    return message;
  },
};

const baseMsgRemoveIssueLabelsResponse: object = {};

export const MsgRemoveIssueLabelsResponse = {
  encode(
    _: MsgRemoveIssueLabelsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgRemoveIssueLabelsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgRemoveIssueLabelsResponse,
    } as MsgRemoveIssueLabelsResponse;
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
    const message = {
      ...baseMsgRemoveIssueLabelsResponse,
    } as MsgRemoveIssueLabelsResponse;
    return message;
  },

  toJSON(_: MsgRemoveIssueLabelsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgRemoveIssueLabelsResponse>
  ): MsgRemoveIssueLabelsResponse {
    const message = {
      ...baseMsgRemoveIssueLabelsResponse,
    } as MsgRemoveIssueLabelsResponse;
    return message;
  },
};

const baseMsgDeleteIssue: object = { creator: "", id: 0 };

export const MsgDeleteIssue = {
  encode(message: MsgDeleteIssue, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteIssue {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteIssue } as MsgDeleteIssue;
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

  fromJSON(object: any): MsgDeleteIssue {
    const message = { ...baseMsgDeleteIssue } as MsgDeleteIssue;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: MsgDeleteIssue): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgDeleteIssue>): MsgDeleteIssue {
    const message = { ...baseMsgDeleteIssue } as MsgDeleteIssue;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseMsgDeleteIssueResponse: object = {};

export const MsgDeleteIssueResponse = {
  encode(_: MsgDeleteIssueResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteIssueResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteIssueResponse } as MsgDeleteIssueResponse;
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
    const message = { ...baseMsgDeleteIssueResponse } as MsgDeleteIssueResponse;
    return message;
  },

  toJSON(_: MsgDeleteIssueResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgDeleteIssueResponse>): MsgDeleteIssueResponse {
    const message = { ...baseMsgDeleteIssueResponse } as MsgDeleteIssueResponse;
    return message;
  },
};

const baseMsgCreateRepository: object = {
  creator: "",
  name: "",
  owner: "",
  description: "",
};

export const MsgCreateRepository = {
  encode(
    message: MsgCreateRepository,
    writer: Writer = Writer.create()
  ): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): MsgCreateRepository {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateRepository } as MsgCreateRepository;
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
    const message = { ...baseMsgCreateRepository } as MsgCreateRepository;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner);
    } else {
      message.owner = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    return message;
  },

  toJSON(message: MsgCreateRepository): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.name !== undefined && (obj.name = message.name);
    message.owner !== undefined && (obj.owner = message.owner);
    message.description !== undefined &&
      (obj.description = message.description);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreateRepository>): MsgCreateRepository {
    const message = { ...baseMsgCreateRepository } as MsgCreateRepository;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    } else {
      message.owner = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    return message;
  },
};

const baseMsgCreateRepositoryResponse: object = {};

export const MsgCreateRepositoryResponse = {
  encode(
    message: MsgCreateRepositoryResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(
        message.repositoryId,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgCreateRepositoryResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCreateRepositoryResponse,
    } as MsgCreateRepositoryResponse;
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
    const message = {
      ...baseMsgCreateRepositoryResponse,
    } as MsgCreateRepositoryResponse;
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    return message;
  },

  toJSON(message: MsgCreateRepositoryResponse): unknown {
    const obj: any = {};
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId
        ? RepositoryId.toJSON(message.repositoryId)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCreateRepositoryResponse>
  ): MsgCreateRepositoryResponse {
    const message = {
      ...baseMsgCreateRepositoryResponse,
    } as MsgCreateRepositoryResponse;
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    return message;
  },
};

const baseMsgInvokeForkRepository: object = {
  creator: "",
  owner: "",
  provider: "",
};

export const MsgInvokeForkRepository = {
  encode(
    message: MsgInvokeForkRepository,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(
        message.repositoryId,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.owner !== "") {
      writer.uint32(26).string(message.owner);
    }
    if (message.provider !== "") {
      writer.uint32(34).string(message.provider);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgInvokeForkRepository {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgInvokeForkRepository,
    } as MsgInvokeForkRepository;
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

  fromJSON(object: any): MsgInvokeForkRepository {
    const message = {
      ...baseMsgInvokeForkRepository,
    } as MsgInvokeForkRepository;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner);
    } else {
      message.owner = "";
    }
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = String(object.provider);
    } else {
      message.provider = "";
    }
    return message;
  },

  toJSON(message: MsgInvokeForkRepository): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId
        ? RepositoryId.toJSON(message.repositoryId)
        : undefined);
    message.owner !== undefined && (obj.owner = message.owner);
    message.provider !== undefined && (obj.provider = message.provider);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgInvokeForkRepository>
  ): MsgInvokeForkRepository {
    const message = {
      ...baseMsgInvokeForkRepository,
    } as MsgInvokeForkRepository;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    } else {
      message.owner = "";
    }
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = object.provider;
    } else {
      message.provider = "";
    }
    return message;
  },
};

const baseMsgInvokeForkRepositoryResponse: object = {};

export const MsgInvokeForkRepositoryResponse = {
  encode(
    _: MsgInvokeForkRepositoryResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgInvokeForkRepositoryResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgInvokeForkRepositoryResponse,
    } as MsgInvokeForkRepositoryResponse;
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
    const message = {
      ...baseMsgInvokeForkRepositoryResponse,
    } as MsgInvokeForkRepositoryResponse;
    return message;
  },

  toJSON(_: MsgInvokeForkRepositoryResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgInvokeForkRepositoryResponse>
  ): MsgInvokeForkRepositoryResponse {
    const message = {
      ...baseMsgInvokeForkRepositoryResponse,
    } as MsgInvokeForkRepositoryResponse;
    return message;
  },
};

const baseMsgForkRepository: object = { creator: "", owner: "", taskId: 0 };

export const MsgForkRepository = {
  encode(message: MsgForkRepository, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(
        message.repositoryId,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.owner !== "") {
      writer.uint32(26).string(message.owner);
    }
    if (message.taskId !== 0) {
      writer.uint32(32).uint64(message.taskId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgForkRepository {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgForkRepository } as MsgForkRepository;
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
        case 4:
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
    const message = { ...baseMsgForkRepository } as MsgForkRepository;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner);
    } else {
      message.owner = "";
    }
    if (object.taskId !== undefined && object.taskId !== null) {
      message.taskId = Number(object.taskId);
    } else {
      message.taskId = 0;
    }
    return message;
  },

  toJSON(message: MsgForkRepository): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId
        ? RepositoryId.toJSON(message.repositoryId)
        : undefined);
    message.owner !== undefined && (obj.owner = message.owner);
    message.taskId !== undefined && (obj.taskId = message.taskId);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgForkRepository>): MsgForkRepository {
    const message = { ...baseMsgForkRepository } as MsgForkRepository;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    } else {
      message.owner = "";
    }
    if (object.taskId !== undefined && object.taskId !== null) {
      message.taskId = object.taskId;
    } else {
      message.taskId = 0;
    }
    return message;
  },
};

const baseMsgForkRepositoryResponse: object = { id: 0 };

export const MsgForkRepositoryResponse = {
  encode(
    message: MsgForkRepositoryResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgForkRepositoryResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgForkRepositoryResponse,
    } as MsgForkRepositoryResponse;
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
    const message = {
      ...baseMsgForkRepositoryResponse,
    } as MsgForkRepositoryResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: MsgForkRepositoryResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgForkRepositoryResponse>
  ): MsgForkRepositoryResponse {
    const message = {
      ...baseMsgForkRepositoryResponse,
    } as MsgForkRepositoryResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseMsgForkRepositorySuccess: object = { creator: "", taskId: 0 };

export const MsgForkRepositorySuccess = {
  encode(
    message: MsgForkRepositorySuccess,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(
        message.repositoryId,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.taskId !== 0) {
      writer.uint32(24).uint64(message.taskId);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgForkRepositorySuccess {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgForkRepositorySuccess,
    } as MsgForkRepositorySuccess;
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
    const message = {
      ...baseMsgForkRepositorySuccess,
    } as MsgForkRepositorySuccess;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.taskId !== undefined && object.taskId !== null) {
      message.taskId = Number(object.taskId);
    } else {
      message.taskId = 0;
    }
    return message;
  },

  toJSON(message: MsgForkRepositorySuccess): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId
        ? RepositoryId.toJSON(message.repositoryId)
        : undefined);
    message.taskId !== undefined && (obj.taskId = message.taskId);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgForkRepositorySuccess>
  ): MsgForkRepositorySuccess {
    const message = {
      ...baseMsgForkRepositorySuccess,
    } as MsgForkRepositorySuccess;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.taskId !== undefined && object.taskId !== null) {
      message.taskId = object.taskId;
    } else {
      message.taskId = 0;
    }
    return message;
  },
};

const baseMsgForkRepositorySuccessResponse: object = { id: 0 };

export const MsgForkRepositorySuccessResponse = {
  encode(
    message: MsgForkRepositorySuccessResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgForkRepositorySuccessResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgForkRepositorySuccessResponse,
    } as MsgForkRepositorySuccessResponse;
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
    const message = {
      ...baseMsgForkRepositorySuccessResponse,
    } as MsgForkRepositorySuccessResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: MsgForkRepositorySuccessResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgForkRepositorySuccessResponse>
  ): MsgForkRepositorySuccessResponse {
    const message = {
      ...baseMsgForkRepositorySuccessResponse,
    } as MsgForkRepositorySuccessResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseMsgRenameRepository: object = { creator: "", name: "" };

export const MsgRenameRepository = {
  encode(
    message: MsgRenameRepository,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(
        message.repositoryId,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRenameRepository {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgRenameRepository } as MsgRenameRepository;
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
    const message = { ...baseMsgRenameRepository } as MsgRenameRepository;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    return message;
  },

  toJSON(message: MsgRenameRepository): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId
        ? RepositoryId.toJSON(message.repositoryId)
        : undefined);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgRenameRepository>): MsgRenameRepository {
    const message = { ...baseMsgRenameRepository } as MsgRenameRepository;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    return message;
  },
};

const baseMsgRenameRepositoryResponse: object = {};

export const MsgRenameRepositoryResponse = {
  encode(
    _: MsgRenameRepositoryResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgRenameRepositoryResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgRenameRepositoryResponse,
    } as MsgRenameRepositoryResponse;
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
    const message = {
      ...baseMsgRenameRepositoryResponse,
    } as MsgRenameRepositoryResponse;
    return message;
  },

  toJSON(_: MsgRenameRepositoryResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgRenameRepositoryResponse>
  ): MsgRenameRepositoryResponse {
    const message = {
      ...baseMsgRenameRepositoryResponse,
    } as MsgRenameRepositoryResponse;
    return message;
  },
};

const baseMsgUpdateRepositoryDescription: object = {
  creator: "",
  description: "",
};

export const MsgUpdateRepositoryDescription = {
  encode(
    message: MsgUpdateRepositoryDescription,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(
        message.repositoryId,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdateRepositoryDescription {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateRepositoryDescription,
    } as MsgUpdateRepositoryDescription;
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
    const message = {
      ...baseMsgUpdateRepositoryDescription,
    } as MsgUpdateRepositoryDescription;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    return message;
  },

  toJSON(message: MsgUpdateRepositoryDescription): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId
        ? RepositoryId.toJSON(message.repositoryId)
        : undefined);
    message.description !== undefined &&
      (obj.description = message.description);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgUpdateRepositoryDescription>
  ): MsgUpdateRepositoryDescription {
    const message = {
      ...baseMsgUpdateRepositoryDescription,
    } as MsgUpdateRepositoryDescription;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    return message;
  },
};

const baseMsgUpdateRepositoryDescriptionResponse: object = {};

export const MsgUpdateRepositoryDescriptionResponse = {
  encode(
    _: MsgUpdateRepositoryDescriptionResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdateRepositoryDescriptionResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateRepositoryDescriptionResponse,
    } as MsgUpdateRepositoryDescriptionResponse;
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
    const message = {
      ...baseMsgUpdateRepositoryDescriptionResponse,
    } as MsgUpdateRepositoryDescriptionResponse;
    return message;
  },

  toJSON(_: MsgUpdateRepositoryDescriptionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateRepositoryDescriptionResponse>
  ): MsgUpdateRepositoryDescriptionResponse {
    const message = {
      ...baseMsgUpdateRepositoryDescriptionResponse,
    } as MsgUpdateRepositoryDescriptionResponse;
    return message;
  },
};

const baseMsgChangeOwner: object = { creator: "", owner: "" };

export const MsgChangeOwner = {
  encode(message: MsgChangeOwner, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(
        message.repositoryId,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.owner !== "") {
      writer.uint32(26).string(message.owner);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgChangeOwner {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgChangeOwner } as MsgChangeOwner;
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
    const message = { ...baseMsgChangeOwner } as MsgChangeOwner;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner);
    } else {
      message.owner = "";
    }
    return message;
  },

  toJSON(message: MsgChangeOwner): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId
        ? RepositoryId.toJSON(message.repositoryId)
        : undefined);
    message.owner !== undefined && (obj.owner = message.owner);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgChangeOwner>): MsgChangeOwner {
    const message = { ...baseMsgChangeOwner } as MsgChangeOwner;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    } else {
      message.owner = "";
    }
    return message;
  },
};

const baseMsgChangeOwnerResponse: object = {};

export const MsgChangeOwnerResponse = {
  encode(_: MsgChangeOwnerResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgChangeOwnerResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgChangeOwnerResponse } as MsgChangeOwnerResponse;
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
    const message = { ...baseMsgChangeOwnerResponse } as MsgChangeOwnerResponse;
    return message;
  },

  toJSON(_: MsgChangeOwnerResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgChangeOwnerResponse>): MsgChangeOwnerResponse {
    const message = { ...baseMsgChangeOwnerResponse } as MsgChangeOwnerResponse;
    return message;
  },
};

const baseMsgUpdateRepositoryCollaborator: object = {
  creator: "",
  user: "",
  role: "",
};

export const MsgUpdateRepositoryCollaborator = {
  encode(
    message: MsgUpdateRepositoryCollaborator,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(
        message.repositoryId,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.user !== "") {
      writer.uint32(26).string(message.user);
    }
    if (message.role !== "") {
      writer.uint32(34).string(message.role);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdateRepositoryCollaborator {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateRepositoryCollaborator,
    } as MsgUpdateRepositoryCollaborator;
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
    const message = {
      ...baseMsgUpdateRepositoryCollaborator,
    } as MsgUpdateRepositoryCollaborator;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = String(object.user);
    } else {
      message.user = "";
    }
    if (object.role !== undefined && object.role !== null) {
      message.role = String(object.role);
    } else {
      message.role = "";
    }
    return message;
  },

  toJSON(message: MsgUpdateRepositoryCollaborator): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId
        ? RepositoryId.toJSON(message.repositoryId)
        : undefined);
    message.user !== undefined && (obj.user = message.user);
    message.role !== undefined && (obj.role = message.role);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgUpdateRepositoryCollaborator>
  ): MsgUpdateRepositoryCollaborator {
    const message = {
      ...baseMsgUpdateRepositoryCollaborator,
    } as MsgUpdateRepositoryCollaborator;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = object.user;
    } else {
      message.user = "";
    }
    if (object.role !== undefined && object.role !== null) {
      message.role = object.role;
    } else {
      message.role = "";
    }
    return message;
  },
};

const baseMsgUpdateRepositoryCollaboratorResponse: object = {};

export const MsgUpdateRepositoryCollaboratorResponse = {
  encode(
    _: MsgUpdateRepositoryCollaboratorResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdateRepositoryCollaboratorResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateRepositoryCollaboratorResponse,
    } as MsgUpdateRepositoryCollaboratorResponse;
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
    const message = {
      ...baseMsgUpdateRepositoryCollaboratorResponse,
    } as MsgUpdateRepositoryCollaboratorResponse;
    return message;
  },

  toJSON(_: MsgUpdateRepositoryCollaboratorResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateRepositoryCollaboratorResponse>
  ): MsgUpdateRepositoryCollaboratorResponse {
    const message = {
      ...baseMsgUpdateRepositoryCollaboratorResponse,
    } as MsgUpdateRepositoryCollaboratorResponse;
    return message;
  },
};

const baseMsgRemoveRepositoryCollaborator: object = { creator: "", user: "" };

export const MsgRemoveRepositoryCollaborator = {
  encode(
    message: MsgRemoveRepositoryCollaborator,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(
        message.repositoryId,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.user !== "") {
      writer.uint32(26).string(message.user);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgRemoveRepositoryCollaborator {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgRemoveRepositoryCollaborator,
    } as MsgRemoveRepositoryCollaborator;
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
    const message = {
      ...baseMsgRemoveRepositoryCollaborator,
    } as MsgRemoveRepositoryCollaborator;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = String(object.user);
    } else {
      message.user = "";
    }
    return message;
  },

  toJSON(message: MsgRemoveRepositoryCollaborator): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId
        ? RepositoryId.toJSON(message.repositoryId)
        : undefined);
    message.user !== undefined && (obj.user = message.user);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgRemoveRepositoryCollaborator>
  ): MsgRemoveRepositoryCollaborator {
    const message = {
      ...baseMsgRemoveRepositoryCollaborator,
    } as MsgRemoveRepositoryCollaborator;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = object.user;
    } else {
      message.user = "";
    }
    return message;
  },
};

const baseMsgRemoveRepositoryCollaboratorResponse: object = {};

export const MsgRemoveRepositoryCollaboratorResponse = {
  encode(
    _: MsgRemoveRepositoryCollaboratorResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgRemoveRepositoryCollaboratorResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgRemoveRepositoryCollaboratorResponse,
    } as MsgRemoveRepositoryCollaboratorResponse;
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
    const message = {
      ...baseMsgRemoveRepositoryCollaboratorResponse,
    } as MsgRemoveRepositoryCollaboratorResponse;
    return message;
  },

  toJSON(_: MsgRemoveRepositoryCollaboratorResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgRemoveRepositoryCollaboratorResponse>
  ): MsgRemoveRepositoryCollaboratorResponse {
    const message = {
      ...baseMsgRemoveRepositoryCollaboratorResponse,
    } as MsgRemoveRepositoryCollaboratorResponse;
    return message;
  },
};

const baseMsgCreateRepositoryLabel: object = {
  creator: "",
  name: "",
  color: "",
  description: "",
};

export const MsgCreateRepositoryLabel = {
  encode(
    message: MsgCreateRepositoryLabel,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(
        message.repositoryId,
        writer.uint32(18).fork()
      ).ldelim();
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

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgCreateRepositoryLabel {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCreateRepositoryLabel,
    } as MsgCreateRepositoryLabel;
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
    const message = {
      ...baseMsgCreateRepositoryLabel,
    } as MsgCreateRepositoryLabel;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.color !== undefined && object.color !== null) {
      message.color = String(object.color);
    } else {
      message.color = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    return message;
  },

  toJSON(message: MsgCreateRepositoryLabel): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId
        ? RepositoryId.toJSON(message.repositoryId)
        : undefined);
    message.name !== undefined && (obj.name = message.name);
    message.color !== undefined && (obj.color = message.color);
    message.description !== undefined &&
      (obj.description = message.description);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCreateRepositoryLabel>
  ): MsgCreateRepositoryLabel {
    const message = {
      ...baseMsgCreateRepositoryLabel,
    } as MsgCreateRepositoryLabel;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.color !== undefined && object.color !== null) {
      message.color = object.color;
    } else {
      message.color = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    return message;
  },
};

const baseMsgCreateRepositoryLabelResponse: object = { id: 0 };

export const MsgCreateRepositoryLabelResponse = {
  encode(
    message: MsgCreateRepositoryLabelResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgCreateRepositoryLabelResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCreateRepositoryLabelResponse,
    } as MsgCreateRepositoryLabelResponse;
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
    const message = {
      ...baseMsgCreateRepositoryLabelResponse,
    } as MsgCreateRepositoryLabelResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: MsgCreateRepositoryLabelResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCreateRepositoryLabelResponse>
  ): MsgCreateRepositoryLabelResponse {
    const message = {
      ...baseMsgCreateRepositoryLabelResponse,
    } as MsgCreateRepositoryLabelResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseMsgUpdateRepositoryLabel: object = {
  creator: "",
  labelId: 0,
  name: "",
  color: "",
  description: "",
};

export const MsgUpdateRepositoryLabel = {
  encode(
    message: MsgUpdateRepositoryLabel,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(
        message.repositoryId,
        writer.uint32(18).fork()
      ).ldelim();
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

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdateRepositoryLabel {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateRepositoryLabel,
    } as MsgUpdateRepositoryLabel;
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
    const message = {
      ...baseMsgUpdateRepositoryLabel,
    } as MsgUpdateRepositoryLabel;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.labelId !== undefined && object.labelId !== null) {
      message.labelId = Number(object.labelId);
    } else {
      message.labelId = 0;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.color !== undefined && object.color !== null) {
      message.color = String(object.color);
    } else {
      message.color = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    return message;
  },

  toJSON(message: MsgUpdateRepositoryLabel): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId
        ? RepositoryId.toJSON(message.repositoryId)
        : undefined);
    message.labelId !== undefined && (obj.labelId = message.labelId);
    message.name !== undefined && (obj.name = message.name);
    message.color !== undefined && (obj.color = message.color);
    message.description !== undefined &&
      (obj.description = message.description);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgUpdateRepositoryLabel>
  ): MsgUpdateRepositoryLabel {
    const message = {
      ...baseMsgUpdateRepositoryLabel,
    } as MsgUpdateRepositoryLabel;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.labelId !== undefined && object.labelId !== null) {
      message.labelId = object.labelId;
    } else {
      message.labelId = 0;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.color !== undefined && object.color !== null) {
      message.color = object.color;
    } else {
      message.color = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    return message;
  },
};

const baseMsgUpdateRepositoryLabelResponse: object = {};

export const MsgUpdateRepositoryLabelResponse = {
  encode(
    _: MsgUpdateRepositoryLabelResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdateRepositoryLabelResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateRepositoryLabelResponse,
    } as MsgUpdateRepositoryLabelResponse;
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
    const message = {
      ...baseMsgUpdateRepositoryLabelResponse,
    } as MsgUpdateRepositoryLabelResponse;
    return message;
  },

  toJSON(_: MsgUpdateRepositoryLabelResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateRepositoryLabelResponse>
  ): MsgUpdateRepositoryLabelResponse {
    const message = {
      ...baseMsgUpdateRepositoryLabelResponse,
    } as MsgUpdateRepositoryLabelResponse;
    return message;
  },
};

const baseMsgDeleteRepositoryLabel: object = { creator: "", labelId: 0 };

export const MsgDeleteRepositoryLabel = {
  encode(
    message: MsgDeleteRepositoryLabel,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(
        message.repositoryId,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.labelId !== 0) {
      writer.uint32(24).uint64(message.labelId);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgDeleteRepositoryLabel {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgDeleteRepositoryLabel,
    } as MsgDeleteRepositoryLabel;
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
    const message = {
      ...baseMsgDeleteRepositoryLabel,
    } as MsgDeleteRepositoryLabel;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.labelId !== undefined && object.labelId !== null) {
      message.labelId = Number(object.labelId);
    } else {
      message.labelId = 0;
    }
    return message;
  },

  toJSON(message: MsgDeleteRepositoryLabel): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId
        ? RepositoryId.toJSON(message.repositoryId)
        : undefined);
    message.labelId !== undefined && (obj.labelId = message.labelId);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgDeleteRepositoryLabel>
  ): MsgDeleteRepositoryLabel {
    const message = {
      ...baseMsgDeleteRepositoryLabel,
    } as MsgDeleteRepositoryLabel;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    if (object.labelId !== undefined && object.labelId !== null) {
      message.labelId = object.labelId;
    } else {
      message.labelId = 0;
    }
    return message;
  },
};

const baseMsgDeleteRepositoryLabelResponse: object = {};

export const MsgDeleteRepositoryLabelResponse = {
  encode(
    _: MsgDeleteRepositoryLabelResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgDeleteRepositoryLabelResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgDeleteRepositoryLabelResponse,
    } as MsgDeleteRepositoryLabelResponse;
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
    const message = {
      ...baseMsgDeleteRepositoryLabelResponse,
    } as MsgDeleteRepositoryLabelResponse;
    return message;
  },

  toJSON(_: MsgDeleteRepositoryLabelResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgDeleteRepositoryLabelResponse>
  ): MsgDeleteRepositoryLabelResponse {
    const message = {
      ...baseMsgDeleteRepositoryLabelResponse,
    } as MsgDeleteRepositoryLabelResponse;
    return message;
  },
};

const baseMsgToggleRepositoryForking: object = { creator: "" };

export const MsgToggleRepositoryForking = {
  encode(
    message: MsgToggleRepositoryForking,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(
        message.repositoryId,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgToggleRepositoryForking {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgToggleRepositoryForking,
    } as MsgToggleRepositoryForking;
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
    const message = {
      ...baseMsgToggleRepositoryForking,
    } as MsgToggleRepositoryForking;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    return message;
  },

  toJSON(message: MsgToggleRepositoryForking): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId
        ? RepositoryId.toJSON(message.repositoryId)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgToggleRepositoryForking>
  ): MsgToggleRepositoryForking {
    const message = {
      ...baseMsgToggleRepositoryForking,
    } as MsgToggleRepositoryForking;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    return message;
  },
};

const baseMsgToggleRepositoryForkingResponse: object = { allowForking: false };

export const MsgToggleRepositoryForkingResponse = {
  encode(
    message: MsgToggleRepositoryForkingResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.allowForking === true) {
      writer.uint32(8).bool(message.allowForking);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgToggleRepositoryForkingResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgToggleRepositoryForkingResponse,
    } as MsgToggleRepositoryForkingResponse;
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
    const message = {
      ...baseMsgToggleRepositoryForkingResponse,
    } as MsgToggleRepositoryForkingResponse;
    if (object.allowForking !== undefined && object.allowForking !== null) {
      message.allowForking = Boolean(object.allowForking);
    } else {
      message.allowForking = false;
    }
    return message;
  },

  toJSON(message: MsgToggleRepositoryForkingResponse): unknown {
    const obj: any = {};
    message.allowForking !== undefined &&
      (obj.allowForking = message.allowForking);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgToggleRepositoryForkingResponse>
  ): MsgToggleRepositoryForkingResponse {
    const message = {
      ...baseMsgToggleRepositoryForkingResponse,
    } as MsgToggleRepositoryForkingResponse;
    if (object.allowForking !== undefined && object.allowForking !== null) {
      message.allowForking = object.allowForking;
    } else {
      message.allowForking = false;
    }
    return message;
  },
};

const baseMsgToggleArweaveBackup: object = { creator: "" };

export const MsgToggleArweaveBackup = {
  encode(
    message: MsgToggleArweaveBackup,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(
        message.repositoryId,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgToggleArweaveBackup {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgToggleArweaveBackup } as MsgToggleArweaveBackup;
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
    const message = { ...baseMsgToggleArweaveBackup } as MsgToggleArweaveBackup;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    return message;
  },

  toJSON(message: MsgToggleArweaveBackup): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId
        ? RepositoryId.toJSON(message.repositoryId)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgToggleArweaveBackup>
  ): MsgToggleArweaveBackup {
    const message = { ...baseMsgToggleArweaveBackup } as MsgToggleArweaveBackup;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    return message;
  },
};

const baseMsgToggleArweaveBackupResponse: object = {
  enableArweaveBackup: false,
};

export const MsgToggleArweaveBackupResponse = {
  encode(
    message: MsgToggleArweaveBackupResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.enableArweaveBackup === true) {
      writer.uint32(8).bool(message.enableArweaveBackup);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgToggleArweaveBackupResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgToggleArweaveBackupResponse,
    } as MsgToggleArweaveBackupResponse;
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
    const message = {
      ...baseMsgToggleArweaveBackupResponse,
    } as MsgToggleArweaveBackupResponse;
    if (
      object.enableArweaveBackup !== undefined &&
      object.enableArweaveBackup !== null
    ) {
      message.enableArweaveBackup = Boolean(object.enableArweaveBackup);
    } else {
      message.enableArweaveBackup = false;
    }
    return message;
  },

  toJSON(message: MsgToggleArweaveBackupResponse): unknown {
    const obj: any = {};
    message.enableArweaveBackup !== undefined &&
      (obj.enableArweaveBackup = message.enableArweaveBackup);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgToggleArweaveBackupResponse>
  ): MsgToggleArweaveBackupResponse {
    const message = {
      ...baseMsgToggleArweaveBackupResponse,
    } as MsgToggleArweaveBackupResponse;
    if (
      object.enableArweaveBackup !== undefined &&
      object.enableArweaveBackup !== null
    ) {
      message.enableArweaveBackup = object.enableArweaveBackup;
    } else {
      message.enableArweaveBackup = false;
    }
    return message;
  },
};

const baseMsgDeleteRepository: object = { creator: "" };

export const MsgDeleteRepository = {
  encode(
    message: MsgDeleteRepository,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.repositoryId !== undefined) {
      RepositoryId.encode(
        message.repositoryId,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteRepository {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteRepository } as MsgDeleteRepository;
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
    const message = { ...baseMsgDeleteRepository } as MsgDeleteRepository;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromJSON(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    return message;
  },

  toJSON(message: MsgDeleteRepository): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.repositoryId !== undefined &&
      (obj.repositoryId = message.repositoryId
        ? RepositoryId.toJSON(message.repositoryId)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgDeleteRepository>): MsgDeleteRepository {
    const message = { ...baseMsgDeleteRepository } as MsgDeleteRepository;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.repositoryId !== undefined && object.repositoryId !== null) {
      message.repositoryId = RepositoryId.fromPartial(object.repositoryId);
    } else {
      message.repositoryId = undefined;
    }
    return message;
  },
};

const baseMsgDeleteRepositoryResponse: object = {};

export const MsgDeleteRepositoryResponse = {
  encode(
    _: MsgDeleteRepositoryResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgDeleteRepositoryResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgDeleteRepositoryResponse,
    } as MsgDeleteRepositoryResponse;
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
    const message = {
      ...baseMsgDeleteRepositoryResponse,
    } as MsgDeleteRepositoryResponse;
    return message;
  },

  toJSON(_: MsgDeleteRepositoryResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgDeleteRepositoryResponse>
  ): MsgDeleteRepositoryResponse {
    const message = {
      ...baseMsgDeleteRepositoryResponse,
    } as MsgDeleteRepositoryResponse;
    return message;
  },
};

const baseMsgCreateUser: object = {
  creator: "",
  username: "",
  name: "",
  avatarUrl: "",
  bio: "",
};

export const MsgCreateUser = {
  encode(message: MsgCreateUser, writer: Writer = Writer.create()): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): MsgCreateUser {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateUser } as MsgCreateUser;
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
    const message = { ...baseMsgCreateUser } as MsgCreateUser;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = String(object.username);
    } else {
      message.username = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.avatarUrl !== undefined && object.avatarUrl !== null) {
      message.avatarUrl = String(object.avatarUrl);
    } else {
      message.avatarUrl = "";
    }
    if (object.bio !== undefined && object.bio !== null) {
      message.bio = String(object.bio);
    } else {
      message.bio = "";
    }
    return message;
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

  fromPartial(object: DeepPartial<MsgCreateUser>): MsgCreateUser {
    const message = { ...baseMsgCreateUser } as MsgCreateUser;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = object.username;
    } else {
      message.username = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.avatarUrl !== undefined && object.avatarUrl !== null) {
      message.avatarUrl = object.avatarUrl;
    } else {
      message.avatarUrl = "";
    }
    if (object.bio !== undefined && object.bio !== null) {
      message.bio = object.bio;
    } else {
      message.bio = "";
    }
    return message;
  },
};

const baseMsgCreateUserResponse: object = { id: "" };

export const MsgCreateUserResponse = {
  encode(
    message: MsgCreateUserResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateUserResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateUserResponse } as MsgCreateUserResponse;
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
    const message = { ...baseMsgCreateUserResponse } as MsgCreateUserResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    return message;
  },

  toJSON(message: MsgCreateUserResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCreateUserResponse>
  ): MsgCreateUserResponse {
    const message = { ...baseMsgCreateUserResponse } as MsgCreateUserResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    return message;
  },
};

const baseMsgUpdateUserUsername: object = { creator: "", username: "" };

export const MsgUpdateUserUsername = {
  encode(
    message: MsgUpdateUserUsername,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.username !== "") {
      writer.uint32(18).string(message.username);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateUserUsername {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateUserUsername } as MsgUpdateUserUsername;
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
    const message = { ...baseMsgUpdateUserUsername } as MsgUpdateUserUsername;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = String(object.username);
    } else {
      message.username = "";
    }
    return message;
  },

  toJSON(message: MsgUpdateUserUsername): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.username !== undefined && (obj.username = message.username);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgUpdateUserUsername>
  ): MsgUpdateUserUsername {
    const message = { ...baseMsgUpdateUserUsername } as MsgUpdateUserUsername;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = object.username;
    } else {
      message.username = "";
    }
    return message;
  },
};

const baseMsgUpdateUserUsernameResponse: object = {};

export const MsgUpdateUserUsernameResponse = {
  encode(
    _: MsgUpdateUserUsernameResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdateUserUsernameResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateUserUsernameResponse,
    } as MsgUpdateUserUsernameResponse;
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
    const message = {
      ...baseMsgUpdateUserUsernameResponse,
    } as MsgUpdateUserUsernameResponse;
    return message;
  },

  toJSON(_: MsgUpdateUserUsernameResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateUserUsernameResponse>
  ): MsgUpdateUserUsernameResponse {
    const message = {
      ...baseMsgUpdateUserUsernameResponse,
    } as MsgUpdateUserUsernameResponse;
    return message;
  },
};

const baseMsgUpdateUserName: object = { creator: "", name: "" };

export const MsgUpdateUserName = {
  encode(message: MsgUpdateUserName, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateUserName {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateUserName } as MsgUpdateUserName;
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
    const message = { ...baseMsgUpdateUserName } as MsgUpdateUserName;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    return message;
  },

  toJSON(message: MsgUpdateUserName): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpdateUserName>): MsgUpdateUserName {
    const message = { ...baseMsgUpdateUserName } as MsgUpdateUserName;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    return message;
  },
};

const baseMsgUpdateUserNameResponse: object = {};

export const MsgUpdateUserNameResponse = {
  encode(
    _: MsgUpdateUserNameResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdateUserNameResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateUserNameResponse,
    } as MsgUpdateUserNameResponse;
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
    const message = {
      ...baseMsgUpdateUserNameResponse,
    } as MsgUpdateUserNameResponse;
    return message;
  },

  toJSON(_: MsgUpdateUserNameResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateUserNameResponse>
  ): MsgUpdateUserNameResponse {
    const message = {
      ...baseMsgUpdateUserNameResponse,
    } as MsgUpdateUserNameResponse;
    return message;
  },
};

const baseMsgUpdateUserBio: object = { creator: "", bio: "" };

export const MsgUpdateUserBio = {
  encode(message: MsgUpdateUserBio, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.bio !== "") {
      writer.uint32(18).string(message.bio);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateUserBio {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateUserBio } as MsgUpdateUserBio;
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
    const message = { ...baseMsgUpdateUserBio } as MsgUpdateUserBio;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.bio !== undefined && object.bio !== null) {
      message.bio = String(object.bio);
    } else {
      message.bio = "";
    }
    return message;
  },

  toJSON(message: MsgUpdateUserBio): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.bio !== undefined && (obj.bio = message.bio);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpdateUserBio>): MsgUpdateUserBio {
    const message = { ...baseMsgUpdateUserBio } as MsgUpdateUserBio;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.bio !== undefined && object.bio !== null) {
      message.bio = object.bio;
    } else {
      message.bio = "";
    }
    return message;
  },
};

const baseMsgUpdateUserBioResponse: object = {};

export const MsgUpdateUserBioResponse = {
  encode(
    _: MsgUpdateUserBioResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdateUserBioResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateUserBioResponse,
    } as MsgUpdateUserBioResponse;
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
    const message = {
      ...baseMsgUpdateUserBioResponse,
    } as MsgUpdateUserBioResponse;
    return message;
  },

  toJSON(_: MsgUpdateUserBioResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateUserBioResponse>
  ): MsgUpdateUserBioResponse {
    const message = {
      ...baseMsgUpdateUserBioResponse,
    } as MsgUpdateUserBioResponse;
    return message;
  },
};

const baseMsgUpdateUserAvatar: object = { creator: "", url: "" };

export const MsgUpdateUserAvatar = {
  encode(
    message: MsgUpdateUserAvatar,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateUserAvatar {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateUserAvatar } as MsgUpdateUserAvatar;
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
    const message = { ...baseMsgUpdateUserAvatar } as MsgUpdateUserAvatar;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.url !== undefined && object.url !== null) {
      message.url = String(object.url);
    } else {
      message.url = "";
    }
    return message;
  },

  toJSON(message: MsgUpdateUserAvatar): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.url !== undefined && (obj.url = message.url);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpdateUserAvatar>): MsgUpdateUserAvatar {
    const message = { ...baseMsgUpdateUserAvatar } as MsgUpdateUserAvatar;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.url !== undefined && object.url !== null) {
      message.url = object.url;
    } else {
      message.url = "";
    }
    return message;
  },
};

const baseMsgUpdateUserAvatarResponse: object = {};

export const MsgUpdateUserAvatarResponse = {
  encode(
    _: MsgUpdateUserAvatarResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgUpdateUserAvatarResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateUserAvatarResponse,
    } as MsgUpdateUserAvatarResponse;
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
    const message = {
      ...baseMsgUpdateUserAvatarResponse,
    } as MsgUpdateUserAvatarResponse;
    return message;
  },

  toJSON(_: MsgUpdateUserAvatarResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateUserAvatarResponse>
  ): MsgUpdateUserAvatarResponse {
    const message = {
      ...baseMsgUpdateUserAvatarResponse,
    } as MsgUpdateUserAvatarResponse;
    return message;
  },
};

const baseMsgDeleteUser: object = { creator: "", id: "" };

export const MsgDeleteUser = {
  encode(message: MsgDeleteUser, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteUser {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteUser } as MsgDeleteUser;
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
    const message = { ...baseMsgDeleteUser } as MsgDeleteUser;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    return message;
  },

  toJSON(message: MsgDeleteUser): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgDeleteUser>): MsgDeleteUser {
    const message = { ...baseMsgDeleteUser } as MsgDeleteUser;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    return message;
  },
};

const baseMsgDeleteUserResponse: object = {};

export const MsgDeleteUserResponse = {
  encode(_: MsgDeleteUserResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteUserResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteUserResponse } as MsgDeleteUserResponse;
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
    const message = { ...baseMsgDeleteUserResponse } as MsgDeleteUserResponse;
    return message;
  },

  toJSON(_: MsgDeleteUserResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgDeleteUserResponse>): MsgDeleteUserResponse {
    const message = { ...baseMsgDeleteUserResponse } as MsgDeleteUserResponse;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** this line is used by starport scaffolding # proto/tx/rpc */
  RevokeStorageProviderPermissions(
    request: MsgRevokeStorageProviderPermissions
  ): Promise<MsgRevokeStorageProviderPermissionsResponse>;
  AuthorizeStorageProvider(
    request: MsgAuthorizeStorageProvider
  ): Promise<MsgAuthorizeStorageProviderResponse>;
  RevokeGitServerPermissions(
    request: MsgRevokeGitServerPermissions
  ): Promise<MsgRevokeGitServerPermissionsResponse>;
  AuthorizeGitServer(
    request: MsgAuthorizeGitServer
  ): Promise<MsgAuthorizeGitServerResponse>;
  CreateTask(request: MsgCreateTask): Promise<MsgCreateTaskResponse>;
  UpdateTask(request: MsgUpdateTask): Promise<MsgUpdateTaskResponse>;
  DeleteTask(request: MsgDeleteTask): Promise<MsgDeleteTaskResponse>;
  SetBranch(request: MsgSetBranch): Promise<MsgSetBranchResponse>;
  MultiSetBranch(
    request: MsgMultiSetBranch
  ): Promise<MsgMultiSetBranchResponse>;
  DeleteBranch(request: MsgDeleteBranch): Promise<MsgDeleteBranchResponse>;
  MultiDeleteBranch(
    request: MsgMultiDeleteBranch
  ): Promise<MsgMultiDeleteBranchResponse>;
  SetTag(request: MsgSetTag): Promise<MsgSetTagResponse>;
  MultiSetTag(request: MsgMultiSetTag): Promise<MsgMultiSetTagResponse>;
  DeleteTag(request: MsgDeleteTag): Promise<MsgDeleteTagResponse>;
  MultiDeleteTag(
    request: MsgMultiDeleteTag
  ): Promise<MsgMultiDeleteTagResponse>;
  AddMember(request: MsgAddMember): Promise<MsgAddMemberResponse>;
  UpdateMemberRole(
    request: MsgUpdateMemberRole
  ): Promise<MsgUpdateMemberRoleResponse>;
  RemoveMember(request: MsgRemoveMember): Promise<MsgRemoveMemberResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  CreateRelease(request: MsgCreateRelease): Promise<MsgCreateReleaseResponse>;
  UpdateRelease(request: MsgUpdateRelease): Promise<MsgUpdateReleaseResponse>;
  DeleteRelease(request: MsgDeleteRelease): Promise<MsgDeleteReleaseResponse>;
  CreatePullRequest(
    request: MsgCreatePullRequest
  ): Promise<MsgCreatePullRequestResponse>;
  UpdatePullRequestTitle(
    request: MsgUpdatePullRequestTitle
  ): Promise<MsgUpdatePullRequestTitleResponse>;
  UpdatePullRequestDescription(
    request: MsgUpdatePullRequestDescription
  ): Promise<MsgUpdatePullRequestDescriptionResponse>;
  InvokeMergePullRequest(
    request: MsgInvokeMergePullRequest
  ): Promise<MsgInvokeMergePullRequestResponse>;
  SetPullRequestState(
    request: MsgSetPullRequestState
  ): Promise<MsgSetPullRequestStateResponse>;
  AddPullRequestReviewers(
    request: MsgAddPullRequestReviewers
  ): Promise<MsgAddPullRequestReviewersResponse>;
  RemovePullRequestReviewers(
    request: MsgRemovePullRequestReviewers
  ): Promise<MsgRemovePullRequestReviewersResponse>;
  AddPullRequestAssignees(
    request: MsgAddPullRequestAssignees
  ): Promise<MsgAddPullRequestAssigneesResponse>;
  RemovePullRequestAssignees(
    request: MsgRemovePullRequestAssignees
  ): Promise<MsgRemovePullRequestAssigneesResponse>;
  AddPullRequestLabels(
    request: MsgAddPullRequestLabels
  ): Promise<MsgAddPullRequestLabelsResponse>;
  RemovePullRequestLabels(
    request: MsgRemovePullRequestLabels
  ): Promise<MsgRemovePullRequestLabelsResponse>;
  DeletePullRequest(
    request: MsgDeletePullRequest
  ): Promise<MsgDeletePullRequestResponse>;
  CreateDao(request: MsgCreateDao): Promise<MsgCreateDaoResponse>;
  RenameDao(request: MsgRenameDao): Promise<MsgRenameDaoResponse>;
  UpdateDaoDescription(
    request: MsgUpdateDaoDescription
  ): Promise<MsgUpdateDaoDescriptionResponse>;
  UpdateDaoWebsite(
    request: MsgUpdateDaoWebsite
  ): Promise<MsgUpdateDaoWebsiteResponse>;
  UpdateDaoLocation(
    request: MsgUpdateDaoLocation
  ): Promise<MsgUpdateDaoLocationResponse>;
  UpdateDaoAvatar(
    request: MsgUpdateDaoAvatar
  ): Promise<MsgUpdateDaoAvatarResponse>;
  DeleteDao(request: MsgDeleteDao): Promise<MsgDeleteDaoResponse>;
  CreateComment(request: MsgCreateComment): Promise<MsgCreateCommentResponse>;
  UpdateComment(request: MsgUpdateComment): Promise<MsgUpdateCommentResponse>;
  DeleteComment(request: MsgDeleteComment): Promise<MsgDeleteCommentResponse>;
  CreateIssue(request: MsgCreateIssue): Promise<MsgCreateIssueResponse>;
  UpdateIssueTitle(
    request: MsgUpdateIssueTitle
  ): Promise<MsgUpdateIssueTitleResponse>;
  UpdateIssueDescription(
    request: MsgUpdateIssueDescription
  ): Promise<MsgUpdateIssueDescriptionResponse>;
  ToggleIssueState(
    request: MsgToggleIssueState
  ): Promise<MsgToggleIssueStateResponse>;
  AddIssueAssignees(
    request: MsgAddIssueAssignees
  ): Promise<MsgAddIssueAssigneesResponse>;
  RemoveIssueAssignees(
    request: MsgRemoveIssueAssignees
  ): Promise<MsgRemoveIssueAssigneesResponse>;
  AddIssueLabels(
    request: MsgAddIssueLabels
  ): Promise<MsgAddIssueLabelsResponse>;
  RemoveIssueLabels(
    request: MsgRemoveIssueLabels
  ): Promise<MsgRemoveIssueLabelsResponse>;
  DeleteIssue(request: MsgDeleteIssue): Promise<MsgDeleteIssueResponse>;
  CreateRepository(
    request: MsgCreateRepository
  ): Promise<MsgCreateRepositoryResponse>;
  InvokeForkRepository(
    request: MsgInvokeForkRepository
  ): Promise<MsgInvokeForkRepositoryResponse>;
  ForkRepository(
    request: MsgForkRepository
  ): Promise<MsgForkRepositoryResponse>;
  ForkRepositorySuccess(
    request: MsgForkRepositorySuccess
  ): Promise<MsgForkRepositorySuccessResponse>;
  RenameRepository(
    request: MsgRenameRepository
  ): Promise<MsgRenameRepositoryResponse>;
  UpdateRepositoryDescription(
    request: MsgUpdateRepositoryDescription
  ): Promise<MsgUpdateRepositoryDescriptionResponse>;
  ChangeOwner(request: MsgChangeOwner): Promise<MsgChangeOwnerResponse>;
  UpdateRepositoryCollaborator(
    request: MsgUpdateRepositoryCollaborator
  ): Promise<MsgUpdateRepositoryCollaboratorResponse>;
  RemoveRepositoryCollaborator(
    request: MsgRemoveRepositoryCollaborator
  ): Promise<MsgRemoveRepositoryCollaboratorResponse>;
  CreateRepositoryLabel(
    request: MsgCreateRepositoryLabel
  ): Promise<MsgCreateRepositoryLabelResponse>;
  UpdateRepositoryLabel(
    request: MsgUpdateRepositoryLabel
  ): Promise<MsgUpdateRepositoryLabelResponse>;
  DeleteRepositoryLabel(
    request: MsgDeleteRepositoryLabel
  ): Promise<MsgDeleteRepositoryLabelResponse>;
  SetDefaultBranch(
    request: MsgSetDefaultBranch
  ): Promise<MsgSetDefaultBranchResponse>;
  ToggleRepositoryForking(
    request: MsgToggleRepositoryForking
  ): Promise<MsgToggleRepositoryForkingResponse>;
  ToggleArweaveBackup(
    request: MsgToggleArweaveBackup
  ): Promise<MsgToggleArweaveBackupResponse>;
  DeleteRepository(
    request: MsgDeleteRepository
  ): Promise<MsgDeleteRepositoryResponse>;
  CreateUser(request: MsgCreateUser): Promise<MsgCreateUserResponse>;
  UpdateUserUsername(
    request: MsgUpdateUserUsername
  ): Promise<MsgUpdateUserUsernameResponse>;
  UpdateUserName(
    request: MsgUpdateUserName
  ): Promise<MsgUpdateUserNameResponse>;
  UpdateUserBio(request: MsgUpdateUserBio): Promise<MsgUpdateUserBioResponse>;
  UpdateUserAvatar(
    request: MsgUpdateUserAvatar
  ): Promise<MsgUpdateUserAvatarResponse>;
  DeleteUser(request: MsgDeleteUser): Promise<MsgDeleteUserResponse>;
  /** rpc TransferUser(MsgTransferUser) returns (MsgTransferUserResponse); */
  UpdateIpfsBackupRef(
    request: MsgUpdateIpfsBackupRef
  ): Promise<MsgUpdateIpfsBackupRefResponse>;
  AddArweaveBackupRef(
    request: MsgAddArweaveBackupRef
  ): Promise<MsgAddArweaveBackupRefResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  RevokeStorageProviderPermissions(
    request: MsgRevokeStorageProviderPermissions
  ): Promise<MsgRevokeStorageProviderPermissionsResponse> {
    const data = MsgRevokeStorageProviderPermissions.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "RevokeStorageProviderPermissions",
      data
    );
    return promise.then((data) =>
      MsgRevokeStorageProviderPermissionsResponse.decode(new Reader(data))
    );
  }

  AuthorizeStorageProvider(
    request: MsgAuthorizeStorageProvider
  ): Promise<MsgAuthorizeStorageProviderResponse> {
    const data = MsgAuthorizeStorageProvider.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "AuthorizeStorageProvider",
      data
    );
    return promise.then((data) =>
      MsgAuthorizeStorageProviderResponse.decode(new Reader(data))
    );
  }

  RevokeGitServerPermissions(
    request: MsgRevokeGitServerPermissions
  ): Promise<MsgRevokeGitServerPermissionsResponse> {
    const data = MsgRevokeGitServerPermissions.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "RevokeGitServerPermissions",
      data
    );
    return promise.then((data) =>
      MsgRevokeGitServerPermissionsResponse.decode(new Reader(data))
    );
  }

  AuthorizeGitServer(
    request: MsgAuthorizeGitServer
  ): Promise<MsgAuthorizeGitServerResponse> {
    const data = MsgAuthorizeGitServer.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "AuthorizeGitServer",
      data
    );
    return promise.then((data) =>
      MsgAuthorizeGitServerResponse.decode(new Reader(data))
    );
  }

  CreateTask(request: MsgCreateTask): Promise<MsgCreateTaskResponse> {
    const data = MsgCreateTask.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "CreateTask",
      data
    );
    return promise.then((data) =>
      MsgCreateTaskResponse.decode(new Reader(data))
    );
  }

  UpdateTask(request: MsgUpdateTask): Promise<MsgUpdateTaskResponse> {
    const data = MsgUpdateTask.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "UpdateTask",
      data
    );
    return promise.then((data) =>
      MsgUpdateTaskResponse.decode(new Reader(data))
    );
  }

  DeleteTask(request: MsgDeleteTask): Promise<MsgDeleteTaskResponse> {
    const data = MsgDeleteTask.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "DeleteTask",
      data
    );
    return promise.then((data) =>
      MsgDeleteTaskResponse.decode(new Reader(data))
    );
  }

  SetBranch(request: MsgSetBranch): Promise<MsgSetBranchResponse> {
    const data = MsgSetBranch.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "SetBranch",
      data
    );
    return promise.then((data) =>
      MsgSetBranchResponse.decode(new Reader(data))
    );
  }

  MultiSetBranch(
    request: MsgMultiSetBranch
  ): Promise<MsgMultiSetBranchResponse> {
    const data = MsgMultiSetBranch.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "MultiSetBranch",
      data
    );
    return promise.then((data) =>
      MsgMultiSetBranchResponse.decode(new Reader(data))
    );
  }

  DeleteBranch(request: MsgDeleteBranch): Promise<MsgDeleteBranchResponse> {
    const data = MsgDeleteBranch.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "DeleteBranch",
      data
    );
    return promise.then((data) =>
      MsgDeleteBranchResponse.decode(new Reader(data))
    );
  }

  MultiDeleteBranch(
    request: MsgMultiDeleteBranch
  ): Promise<MsgMultiDeleteBranchResponse> {
    const data = MsgMultiDeleteBranch.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "MultiDeleteBranch",
      data
    );
    return promise.then((data) =>
      MsgMultiDeleteBranchResponse.decode(new Reader(data))
    );
  }

  SetTag(request: MsgSetTag): Promise<MsgSetTagResponse> {
    const data = MsgSetTag.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "SetTag",
      data
    );
    return promise.then((data) => MsgSetTagResponse.decode(new Reader(data)));
  }

  MultiSetTag(request: MsgMultiSetTag): Promise<MsgMultiSetTagResponse> {
    const data = MsgMultiSetTag.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "MultiSetTag",
      data
    );
    return promise.then((data) =>
      MsgMultiSetTagResponse.decode(new Reader(data))
    );
  }

  DeleteTag(request: MsgDeleteTag): Promise<MsgDeleteTagResponse> {
    const data = MsgDeleteTag.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "DeleteTag",
      data
    );
    return promise.then((data) =>
      MsgDeleteTagResponse.decode(new Reader(data))
    );
  }

  MultiDeleteTag(
    request: MsgMultiDeleteTag
  ): Promise<MsgMultiDeleteTagResponse> {
    const data = MsgMultiDeleteTag.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "MultiDeleteTag",
      data
    );
    return promise.then((data) =>
      MsgMultiDeleteTagResponse.decode(new Reader(data))
    );
  }

  AddMember(request: MsgAddMember): Promise<MsgAddMemberResponse> {
    const data = MsgAddMember.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "AddMember",
      data
    );
    return promise.then((data) =>
      MsgAddMemberResponse.decode(new Reader(data))
    );
  }

  UpdateMemberRole(
    request: MsgUpdateMemberRole
  ): Promise<MsgUpdateMemberRoleResponse> {
    const data = MsgUpdateMemberRole.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "UpdateMemberRole",
      data
    );
    return promise.then((data) =>
      MsgUpdateMemberRoleResponse.decode(new Reader(data))
    );
  }

  RemoveMember(request: MsgRemoveMember): Promise<MsgRemoveMemberResponse> {
    const data = MsgRemoveMember.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "RemoveMember",
      data
    );
    return promise.then((data) =>
      MsgRemoveMemberResponse.decode(new Reader(data))
    );
  }

  CreateRelease(request: MsgCreateRelease): Promise<MsgCreateReleaseResponse> {
    const data = MsgCreateRelease.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "CreateRelease",
      data
    );
    return promise.then((data) =>
      MsgCreateReleaseResponse.decode(new Reader(data))
    );
  }

  UpdateRelease(request: MsgUpdateRelease): Promise<MsgUpdateReleaseResponse> {
    const data = MsgUpdateRelease.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "UpdateRelease",
      data
    );
    return promise.then((data) =>
      MsgUpdateReleaseResponse.decode(new Reader(data))
    );
  }

  DeleteRelease(request: MsgDeleteRelease): Promise<MsgDeleteReleaseResponse> {
    const data = MsgDeleteRelease.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "DeleteRelease",
      data
    );
    return promise.then((data) =>
      MsgDeleteReleaseResponse.decode(new Reader(data))
    );
  }

  CreatePullRequest(
    request: MsgCreatePullRequest
  ): Promise<MsgCreatePullRequestResponse> {
    const data = MsgCreatePullRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "CreatePullRequest",
      data
    );
    return promise.then((data) =>
      MsgCreatePullRequestResponse.decode(new Reader(data))
    );
  }

  UpdatePullRequestTitle(
    request: MsgUpdatePullRequestTitle
  ): Promise<MsgUpdatePullRequestTitleResponse> {
    const data = MsgUpdatePullRequestTitle.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "UpdatePullRequestTitle",
      data
    );
    return promise.then((data) =>
      MsgUpdatePullRequestTitleResponse.decode(new Reader(data))
    );
  }

  UpdatePullRequestDescription(
    request: MsgUpdatePullRequestDescription
  ): Promise<MsgUpdatePullRequestDescriptionResponse> {
    const data = MsgUpdatePullRequestDescription.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "UpdatePullRequestDescription",
      data
    );
    return promise.then((data) =>
      MsgUpdatePullRequestDescriptionResponse.decode(new Reader(data))
    );
  }

  InvokeMergePullRequest(
    request: MsgInvokeMergePullRequest
  ): Promise<MsgInvokeMergePullRequestResponse> {
    const data = MsgInvokeMergePullRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "InvokeMergePullRequest",
      data
    );
    return promise.then((data) =>
      MsgInvokeMergePullRequestResponse.decode(new Reader(data))
    );
  }

  SetPullRequestState(
    request: MsgSetPullRequestState
  ): Promise<MsgSetPullRequestStateResponse> {
    const data = MsgSetPullRequestState.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "SetPullRequestState",
      data
    );
    return promise.then((data) =>
      MsgSetPullRequestStateResponse.decode(new Reader(data))
    );
  }

  AddPullRequestReviewers(
    request: MsgAddPullRequestReviewers
  ): Promise<MsgAddPullRequestReviewersResponse> {
    const data = MsgAddPullRequestReviewers.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "AddPullRequestReviewers",
      data
    );
    return promise.then((data) =>
      MsgAddPullRequestReviewersResponse.decode(new Reader(data))
    );
  }

  RemovePullRequestReviewers(
    request: MsgRemovePullRequestReviewers
  ): Promise<MsgRemovePullRequestReviewersResponse> {
    const data = MsgRemovePullRequestReviewers.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "RemovePullRequestReviewers",
      data
    );
    return promise.then((data) =>
      MsgRemovePullRequestReviewersResponse.decode(new Reader(data))
    );
  }

  AddPullRequestAssignees(
    request: MsgAddPullRequestAssignees
  ): Promise<MsgAddPullRequestAssigneesResponse> {
    const data = MsgAddPullRequestAssignees.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "AddPullRequestAssignees",
      data
    );
    return promise.then((data) =>
      MsgAddPullRequestAssigneesResponse.decode(new Reader(data))
    );
  }

  RemovePullRequestAssignees(
    request: MsgRemovePullRequestAssignees
  ): Promise<MsgRemovePullRequestAssigneesResponse> {
    const data = MsgRemovePullRequestAssignees.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "RemovePullRequestAssignees",
      data
    );
    return promise.then((data) =>
      MsgRemovePullRequestAssigneesResponse.decode(new Reader(data))
    );
  }

  AddPullRequestLabels(
    request: MsgAddPullRequestLabels
  ): Promise<MsgAddPullRequestLabelsResponse> {
    const data = MsgAddPullRequestLabels.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "AddPullRequestLabels",
      data
    );
    return promise.then((data) =>
      MsgAddPullRequestLabelsResponse.decode(new Reader(data))
    );
  }

  RemovePullRequestLabels(
    request: MsgRemovePullRequestLabels
  ): Promise<MsgRemovePullRequestLabelsResponse> {
    const data = MsgRemovePullRequestLabels.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "RemovePullRequestLabels",
      data
    );
    return promise.then((data) =>
      MsgRemovePullRequestLabelsResponse.decode(new Reader(data))
    );
  }

  DeletePullRequest(
    request: MsgDeletePullRequest
  ): Promise<MsgDeletePullRequestResponse> {
    const data = MsgDeletePullRequest.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "DeletePullRequest",
      data
    );
    return promise.then((data) =>
      MsgDeletePullRequestResponse.decode(new Reader(data))
    );
  }

  CreateDao(request: MsgCreateDao): Promise<MsgCreateDaoResponse> {
    const data = MsgCreateDao.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "CreateDao",
      data
    );
    return promise.then((data) =>
      MsgCreateDaoResponse.decode(new Reader(data))
    );
  }

  RenameDao(request: MsgRenameDao): Promise<MsgRenameDaoResponse> {
    const data = MsgRenameDao.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "RenameDao",
      data
    );
    return promise.then((data) =>
      MsgRenameDaoResponse.decode(new Reader(data))
    );
  }

  UpdateDaoDescription(
    request: MsgUpdateDaoDescription
  ): Promise<MsgUpdateDaoDescriptionResponse> {
    const data = MsgUpdateDaoDescription.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "UpdateDaoDescription",
      data
    );
    return promise.then((data) =>
      MsgUpdateDaoDescriptionResponse.decode(new Reader(data))
    );
  }

  UpdateDaoWebsite(
    request: MsgUpdateDaoWebsite
  ): Promise<MsgUpdateDaoWebsiteResponse> {
    const data = MsgUpdateDaoWebsite.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "UpdateDaoWebsite",
      data
    );
    return promise.then((data) =>
      MsgUpdateDaoWebsiteResponse.decode(new Reader(data))
    );
  }

  UpdateDaoLocation(
    request: MsgUpdateDaoLocation
  ): Promise<MsgUpdateDaoLocationResponse> {
    const data = MsgUpdateDaoLocation.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "UpdateDaoLocation",
      data
    );
    return promise.then((data) =>
      MsgUpdateDaoLocationResponse.decode(new Reader(data))
    );
  }

  UpdateDaoAvatar(
    request: MsgUpdateDaoAvatar
  ): Promise<MsgUpdateDaoAvatarResponse> {
    const data = MsgUpdateDaoAvatar.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "UpdateDaoAvatar",
      data
    );
    return promise.then((data) =>
      MsgUpdateDaoAvatarResponse.decode(new Reader(data))
    );
  }

  DeleteDao(request: MsgDeleteDao): Promise<MsgDeleteDaoResponse> {
    const data = MsgDeleteDao.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "DeleteDao",
      data
    );
    return promise.then((data) =>
      MsgDeleteDaoResponse.decode(new Reader(data))
    );
  }

  CreateComment(request: MsgCreateComment): Promise<MsgCreateCommentResponse> {
    const data = MsgCreateComment.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "CreateComment",
      data
    );
    return promise.then((data) =>
      MsgCreateCommentResponse.decode(new Reader(data))
    );
  }

  UpdateComment(request: MsgUpdateComment): Promise<MsgUpdateCommentResponse> {
    const data = MsgUpdateComment.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "UpdateComment",
      data
    );
    return promise.then((data) =>
      MsgUpdateCommentResponse.decode(new Reader(data))
    );
  }

  DeleteComment(request: MsgDeleteComment): Promise<MsgDeleteCommentResponse> {
    const data = MsgDeleteComment.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "DeleteComment",
      data
    );
    return promise.then((data) =>
      MsgDeleteCommentResponse.decode(new Reader(data))
    );
  }

  CreateIssue(request: MsgCreateIssue): Promise<MsgCreateIssueResponse> {
    const data = MsgCreateIssue.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "CreateIssue",
      data
    );
    return promise.then((data) =>
      MsgCreateIssueResponse.decode(new Reader(data))
    );
  }

  UpdateIssueTitle(
    request: MsgUpdateIssueTitle
  ): Promise<MsgUpdateIssueTitleResponse> {
    const data = MsgUpdateIssueTitle.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "UpdateIssueTitle",
      data
    );
    return promise.then((data) =>
      MsgUpdateIssueTitleResponse.decode(new Reader(data))
    );
  }

  UpdateIssueDescription(
    request: MsgUpdateIssueDescription
  ): Promise<MsgUpdateIssueDescriptionResponse> {
    const data = MsgUpdateIssueDescription.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "UpdateIssueDescription",
      data
    );
    return promise.then((data) =>
      MsgUpdateIssueDescriptionResponse.decode(new Reader(data))
    );
  }

  ToggleIssueState(
    request: MsgToggleIssueState
  ): Promise<MsgToggleIssueStateResponse> {
    const data = MsgToggleIssueState.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "ToggleIssueState",
      data
    );
    return promise.then((data) =>
      MsgToggleIssueStateResponse.decode(new Reader(data))
    );
  }

  AddIssueAssignees(
    request: MsgAddIssueAssignees
  ): Promise<MsgAddIssueAssigneesResponse> {
    const data = MsgAddIssueAssignees.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "AddIssueAssignees",
      data
    );
    return promise.then((data) =>
      MsgAddIssueAssigneesResponse.decode(new Reader(data))
    );
  }

  RemoveIssueAssignees(
    request: MsgRemoveIssueAssignees
  ): Promise<MsgRemoveIssueAssigneesResponse> {
    const data = MsgRemoveIssueAssignees.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "RemoveIssueAssignees",
      data
    );
    return promise.then((data) =>
      MsgRemoveIssueAssigneesResponse.decode(new Reader(data))
    );
  }

  AddIssueLabels(
    request: MsgAddIssueLabels
  ): Promise<MsgAddIssueLabelsResponse> {
    const data = MsgAddIssueLabels.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "AddIssueLabels",
      data
    );
    return promise.then((data) =>
      MsgAddIssueLabelsResponse.decode(new Reader(data))
    );
  }

  RemoveIssueLabels(
    request: MsgRemoveIssueLabels
  ): Promise<MsgRemoveIssueLabelsResponse> {
    const data = MsgRemoveIssueLabels.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "RemoveIssueLabels",
      data
    );
    return promise.then((data) =>
      MsgRemoveIssueLabelsResponse.decode(new Reader(data))
    );
  }

  DeleteIssue(request: MsgDeleteIssue): Promise<MsgDeleteIssueResponse> {
    const data = MsgDeleteIssue.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "DeleteIssue",
      data
    );
    return promise.then((data) =>
      MsgDeleteIssueResponse.decode(new Reader(data))
    );
  }

  CreateRepository(
    request: MsgCreateRepository
  ): Promise<MsgCreateRepositoryResponse> {
    const data = MsgCreateRepository.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "CreateRepository",
      data
    );
    return promise.then((data) =>
      MsgCreateRepositoryResponse.decode(new Reader(data))
    );
  }

  InvokeForkRepository(
    request: MsgInvokeForkRepository
  ): Promise<MsgInvokeForkRepositoryResponse> {
    const data = MsgInvokeForkRepository.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "InvokeForkRepository",
      data
    );
    return promise.then((data) =>
      MsgInvokeForkRepositoryResponse.decode(new Reader(data))
    );
  }

  ForkRepository(
    request: MsgForkRepository
  ): Promise<MsgForkRepositoryResponse> {
    const data = MsgForkRepository.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "ForkRepository",
      data
    );
    return promise.then((data) =>
      MsgForkRepositoryResponse.decode(new Reader(data))
    );
  }

  ForkRepositorySuccess(
    request: MsgForkRepositorySuccess
  ): Promise<MsgForkRepositorySuccessResponse> {
    const data = MsgForkRepositorySuccess.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "ForkRepositorySuccess",
      data
    );
    return promise.then((data) =>
      MsgForkRepositorySuccessResponse.decode(new Reader(data))
    );
  }

  RenameRepository(
    request: MsgRenameRepository
  ): Promise<MsgRenameRepositoryResponse> {
    const data = MsgRenameRepository.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "RenameRepository",
      data
    );
    return promise.then((data) =>
      MsgRenameRepositoryResponse.decode(new Reader(data))
    );
  }

  UpdateRepositoryDescription(
    request: MsgUpdateRepositoryDescription
  ): Promise<MsgUpdateRepositoryDescriptionResponse> {
    const data = MsgUpdateRepositoryDescription.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "UpdateRepositoryDescription",
      data
    );
    return promise.then((data) =>
      MsgUpdateRepositoryDescriptionResponse.decode(new Reader(data))
    );
  }

  ChangeOwner(request: MsgChangeOwner): Promise<MsgChangeOwnerResponse> {
    const data = MsgChangeOwner.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "ChangeOwner",
      data
    );
    return promise.then((data) =>
      MsgChangeOwnerResponse.decode(new Reader(data))
    );
  }

  UpdateRepositoryCollaborator(
    request: MsgUpdateRepositoryCollaborator
  ): Promise<MsgUpdateRepositoryCollaboratorResponse> {
    const data = MsgUpdateRepositoryCollaborator.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "UpdateRepositoryCollaborator",
      data
    );
    return promise.then((data) =>
      MsgUpdateRepositoryCollaboratorResponse.decode(new Reader(data))
    );
  }

  RemoveRepositoryCollaborator(
    request: MsgRemoveRepositoryCollaborator
  ): Promise<MsgRemoveRepositoryCollaboratorResponse> {
    const data = MsgRemoveRepositoryCollaborator.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "RemoveRepositoryCollaborator",
      data
    );
    return promise.then((data) =>
      MsgRemoveRepositoryCollaboratorResponse.decode(new Reader(data))
    );
  }

  CreateRepositoryLabel(
    request: MsgCreateRepositoryLabel
  ): Promise<MsgCreateRepositoryLabelResponse> {
    const data = MsgCreateRepositoryLabel.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "CreateRepositoryLabel",
      data
    );
    return promise.then((data) =>
      MsgCreateRepositoryLabelResponse.decode(new Reader(data))
    );
  }

  UpdateRepositoryLabel(
    request: MsgUpdateRepositoryLabel
  ): Promise<MsgUpdateRepositoryLabelResponse> {
    const data = MsgUpdateRepositoryLabel.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "UpdateRepositoryLabel",
      data
    );
    return promise.then((data) =>
      MsgUpdateRepositoryLabelResponse.decode(new Reader(data))
    );
  }

  DeleteRepositoryLabel(
    request: MsgDeleteRepositoryLabel
  ): Promise<MsgDeleteRepositoryLabelResponse> {
    const data = MsgDeleteRepositoryLabel.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "DeleteRepositoryLabel",
      data
    );
    return promise.then((data) =>
      MsgDeleteRepositoryLabelResponse.decode(new Reader(data))
    );
  }

  SetDefaultBranch(
    request: MsgSetDefaultBranch
  ): Promise<MsgSetDefaultBranchResponse> {
    const data = MsgSetDefaultBranch.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "SetDefaultBranch",
      data
    );
    return promise.then((data) =>
      MsgSetDefaultBranchResponse.decode(new Reader(data))
    );
  }

  ToggleRepositoryForking(
    request: MsgToggleRepositoryForking
  ): Promise<MsgToggleRepositoryForkingResponse> {
    const data = MsgToggleRepositoryForking.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "ToggleRepositoryForking",
      data
    );
    return promise.then((data) =>
      MsgToggleRepositoryForkingResponse.decode(new Reader(data))
    );
  }

  ToggleArweaveBackup(
    request: MsgToggleArweaveBackup
  ): Promise<MsgToggleArweaveBackupResponse> {
    const data = MsgToggleArweaveBackup.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "ToggleArweaveBackup",
      data
    );
    return promise.then((data) =>
      MsgToggleArweaveBackupResponse.decode(new Reader(data))
    );
  }

  DeleteRepository(
    request: MsgDeleteRepository
  ): Promise<MsgDeleteRepositoryResponse> {
    const data = MsgDeleteRepository.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "DeleteRepository",
      data
    );
    return promise.then((data) =>
      MsgDeleteRepositoryResponse.decode(new Reader(data))
    );
  }

  CreateUser(request: MsgCreateUser): Promise<MsgCreateUserResponse> {
    const data = MsgCreateUser.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "CreateUser",
      data
    );
    return promise.then((data) =>
      MsgCreateUserResponse.decode(new Reader(data))
    );
  }

  UpdateUserUsername(
    request: MsgUpdateUserUsername
  ): Promise<MsgUpdateUserUsernameResponse> {
    const data = MsgUpdateUserUsername.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "UpdateUserUsername",
      data
    );
    return promise.then((data) =>
      MsgUpdateUserUsernameResponse.decode(new Reader(data))
    );
  }

  UpdateUserName(
    request: MsgUpdateUserName
  ): Promise<MsgUpdateUserNameResponse> {
    const data = MsgUpdateUserName.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "UpdateUserName",
      data
    );
    return promise.then((data) =>
      MsgUpdateUserNameResponse.decode(new Reader(data))
    );
  }

  UpdateUserBio(request: MsgUpdateUserBio): Promise<MsgUpdateUserBioResponse> {
    const data = MsgUpdateUserBio.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "UpdateUserBio",
      data
    );
    return promise.then((data) =>
      MsgUpdateUserBioResponse.decode(new Reader(data))
    );
  }

  UpdateUserAvatar(
    request: MsgUpdateUserAvatar
  ): Promise<MsgUpdateUserAvatarResponse> {
    const data = MsgUpdateUserAvatar.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "UpdateUserAvatar",
      data
    );
    return promise.then((data) =>
      MsgUpdateUserAvatarResponse.decode(new Reader(data))
    );
  }

  DeleteUser(request: MsgDeleteUser): Promise<MsgDeleteUserResponse> {
    const data = MsgDeleteUser.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "DeleteUser",
      data
    );
    return promise.then((data) =>
      MsgDeleteUserResponse.decode(new Reader(data))
    );
  }

  UpdateIpfsBackupRef(
    request: MsgUpdateIpfsBackupRef
  ): Promise<MsgUpdateIpfsBackupRefResponse> {
    const data = MsgUpdateIpfsBackupRef.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "UpdateIpfsBackupRef",
      data
    );
    return promise.then((data) =>
      MsgUpdateIpfsBackupRefResponse.decode(new Reader(data))
    );
  }

  AddArweaveBackupRef(
    request: MsgAddArweaveBackupRef
  ): Promise<MsgAddArweaveBackupRefResponse> {
    const data = MsgAddArweaveBackupRef.encode(request).finish();
    const promise = this.rpc.request(
      "gitopia.gitopia.gitopia.Msg",
      "AddArweaveBackupRef",
      data
    );
    return promise.then((data) =>
      MsgAddArweaveBackupRefResponse.decode(new Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
