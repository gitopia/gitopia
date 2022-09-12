import { TaskType, TaskState } from "../gitopia/task";
import { Store } from "../gitopia/storage_provider";
import { MemberRole } from "../gitopia/member";
import { Reader, Writer } from "protobufjs/minimal";
import { RepositoryId } from "../gitopia/repository";
export declare const protobufPackage = "gitopia.gitopia.gitopia";
export interface MsgRevokeStorageProviderPermissions {
    creator: string;
    provider: string;
}
export interface MsgRevokeStorageProviderPermissionsResponse {
}
export interface MsgAuthorizeStorageProvider {
    creator: string;
    provider: string;
}
export interface MsgAuthorizeStorageProviderResponse {
}
export interface MsgRevokeGitServerPermissions {
    creator: string;
    provider: string;
}
export interface MsgRevokeGitServerPermissionsResponse {
}
export interface MsgAuthorizeGitServer {
    creator: string;
    provider: string;
}
export interface MsgAuthorizeGitServerResponse {
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
    store: Store;
    ref: string;
}
export interface MsgUpdateRepositoryBackupRefResponse {
}
export interface MsgAddRepositoryBackupRef {
    creator: string;
    repositoryId: RepositoryId | undefined;
    store: Store;
    ref: string;
}
export interface MsgAddRepositoryBackupRefResponse {
}
export interface MsgCreateStorageProvider {
    creator: string;
    store: Store;
}
export interface MsgCreateStorageProviderResponse {
    id: number;
}
export interface MsgUpdateStorageProvider {
    creator: string;
    id: number;
    store: Store;
}
export interface MsgUpdateStorageProviderResponse {
}
export interface MsgDeleteStorageProvider {
    creator: string;
    id: number;
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
}
export interface MsgCreatePullRequestResponse {
    id: number;
    iid: number;
}
export interface MsgUpdatePullRequest {
    creator: string;
    id: number;
    title: string;
    description: string;
}
export interface MsgUpdatePullRequestResponse {
}
export interface MsgUpdatePullRequestTitle {
    creator: string;
    id: number;
    title: string;
}
export interface MsgUpdatePullRequestTitleResponse {
}
export interface MsgUpdatePullRequestDescription {
    creator: string;
    id: number;
    description: string;
}
export interface MsgUpdatePullRequestDescriptionResponse {
}
export interface MsgInvokeMergePullRequest {
    creator: string;
    id: number;
    provider: string;
}
export interface MsgInvokeMergePullRequestResponse {
}
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
export interface MsgAddPullRequestReviewersResponse {
}
export interface MsgRemovePullRequestReviewers {
    creator: string;
    id: number;
    reviewers: string[];
}
export interface MsgRemovePullRequestReviewersResponse {
}
export interface MsgAddPullRequestAssignees {
    creator: string;
    id: number;
    assignees: string[];
}
export interface MsgAddPullRequestAssigneesResponse {
}
export interface MsgRemovePullRequestAssignees {
    creator: string;
    id: number;
    assignees: string[];
}
export interface MsgRemovePullRequestAssigneesResponse {
}
export interface MsgAddPullRequestLabels {
    creator: string;
    pullRequestId: number;
    labelIds: number[];
}
export interface MsgAddPullRequestLabelsResponse {
}
export interface MsgRemovePullRequestLabels {
    creator: string;
    pullRequestId: number;
    labelIds: number[];
}
export interface MsgRemovePullRequestLabelsResponse {
}
export interface MsgDeletePullRequest {
    creator: string;
    id: number;
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
export interface MsgUpdateCommentResponse {
}
export interface MsgDeleteComment {
    creator: string;
    id: number;
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
}
export interface MsgCreateIssueResponse {
    id: number;
    iid: number;
}
export interface MsgUpdateIssue {
    creator: string;
    id: number;
    title: string;
    description: string;
    weight: number;
    assignees: string[];
}
export interface MsgUpdateIssueResponse {
}
export interface MsgUpdateIssueTitle {
    creator: string;
    id: number;
    title: string;
}
export interface MsgUpdateIssueTitleResponse {
}
export interface MsgUpdateIssueDescription {
    creator: string;
    id: number;
    description: string;
}
export interface MsgUpdateIssueDescriptionResponse {
}
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
export interface MsgAddIssueAssigneesResponse {
}
export interface MsgRemoveIssueAssignees {
    creator: string;
    id: number;
    assignees: string[];
}
export interface MsgRemoveIssueAssigneesResponse {
}
export interface MsgAddIssueLabels {
    creator: string;
    issueId: number;
    labelIds: number[];
}
export interface MsgAddIssueLabelsResponse {
}
export interface MsgRemoveIssueLabels {
    creator: string;
    issueId: number;
    labelIds: number[];
}
export interface MsgRemoveIssueLabelsResponse {
}
export interface MsgDeleteIssue {
    creator: string;
    id: number;
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
    owner: string;
    provider: string;
}
export interface MsgInvokeForkRepositoryResponse {
}
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
export declare const MsgRevokeStorageProviderPermissions: {
    encode(message: MsgRevokeStorageProviderPermissions, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRevokeStorageProviderPermissions;
    fromJSON(object: any): MsgRevokeStorageProviderPermissions;
    toJSON(message: MsgRevokeStorageProviderPermissions): unknown;
    fromPartial(object: DeepPartial<MsgRevokeStorageProviderPermissions>): MsgRevokeStorageProviderPermissions;
};
export declare const MsgRevokeStorageProviderPermissionsResponse: {
    encode(_: MsgRevokeStorageProviderPermissionsResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRevokeStorageProviderPermissionsResponse;
    fromJSON(_: any): MsgRevokeStorageProviderPermissionsResponse;
    toJSON(_: MsgRevokeStorageProviderPermissionsResponse): unknown;
    fromPartial(_: DeepPartial<MsgRevokeStorageProviderPermissionsResponse>): MsgRevokeStorageProviderPermissionsResponse;
};
export declare const MsgAuthorizeStorageProvider: {
    encode(message: MsgAuthorizeStorageProvider, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAuthorizeStorageProvider;
    fromJSON(object: any): MsgAuthorizeStorageProvider;
    toJSON(message: MsgAuthorizeStorageProvider): unknown;
    fromPartial(object: DeepPartial<MsgAuthorizeStorageProvider>): MsgAuthorizeStorageProvider;
};
export declare const MsgAuthorizeStorageProviderResponse: {
    encode(_: MsgAuthorizeStorageProviderResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAuthorizeStorageProviderResponse;
    fromJSON(_: any): MsgAuthorizeStorageProviderResponse;
    toJSON(_: MsgAuthorizeStorageProviderResponse): unknown;
    fromPartial(_: DeepPartial<MsgAuthorizeStorageProviderResponse>): MsgAuthorizeStorageProviderResponse;
};
export declare const MsgRevokeGitServerPermissions: {
    encode(message: MsgRevokeGitServerPermissions, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRevokeGitServerPermissions;
    fromJSON(object: any): MsgRevokeGitServerPermissions;
    toJSON(message: MsgRevokeGitServerPermissions): unknown;
    fromPartial(object: DeepPartial<MsgRevokeGitServerPermissions>): MsgRevokeGitServerPermissions;
};
export declare const MsgRevokeGitServerPermissionsResponse: {
    encode(_: MsgRevokeGitServerPermissionsResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRevokeGitServerPermissionsResponse;
    fromJSON(_: any): MsgRevokeGitServerPermissionsResponse;
    toJSON(_: MsgRevokeGitServerPermissionsResponse): unknown;
    fromPartial(_: DeepPartial<MsgRevokeGitServerPermissionsResponse>): MsgRevokeGitServerPermissionsResponse;
};
export declare const MsgAuthorizeGitServer: {
    encode(message: MsgAuthorizeGitServer, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAuthorizeGitServer;
    fromJSON(object: any): MsgAuthorizeGitServer;
    toJSON(message: MsgAuthorizeGitServer): unknown;
    fromPartial(object: DeepPartial<MsgAuthorizeGitServer>): MsgAuthorizeGitServer;
};
export declare const MsgAuthorizeGitServerResponse: {
    encode(_: MsgAuthorizeGitServerResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAuthorizeGitServerResponse;
    fromJSON(_: any): MsgAuthorizeGitServerResponse;
    toJSON(_: MsgAuthorizeGitServerResponse): unknown;
    fromPartial(_: DeepPartial<MsgAuthorizeGitServerResponse>): MsgAuthorizeGitServerResponse;
};
export declare const MsgCreateTask: {
    encode(message: MsgCreateTask, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateTask;
    fromJSON(object: any): MsgCreateTask;
    toJSON(message: MsgCreateTask): unknown;
    fromPartial(object: DeepPartial<MsgCreateTask>): MsgCreateTask;
};
export declare const MsgCreateTaskResponse: {
    encode(message: MsgCreateTaskResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateTaskResponse;
    fromJSON(object: any): MsgCreateTaskResponse;
    toJSON(message: MsgCreateTaskResponse): unknown;
    fromPartial(object: DeepPartial<MsgCreateTaskResponse>): MsgCreateTaskResponse;
};
export declare const MsgUpdateTask: {
    encode(message: MsgUpdateTask, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateTask;
    fromJSON(object: any): MsgUpdateTask;
    toJSON(message: MsgUpdateTask): unknown;
    fromPartial(object: DeepPartial<MsgUpdateTask>): MsgUpdateTask;
};
export declare const MsgUpdateTaskResponse: {
    encode(_: MsgUpdateTaskResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateTaskResponse;
    fromJSON(_: any): MsgUpdateTaskResponse;
    toJSON(_: MsgUpdateTaskResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdateTaskResponse>): MsgUpdateTaskResponse;
};
export declare const MsgDeleteTask: {
    encode(message: MsgDeleteTask, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteTask;
    fromJSON(object: any): MsgDeleteTask;
    toJSON(message: MsgDeleteTask): unknown;
    fromPartial(object: DeepPartial<MsgDeleteTask>): MsgDeleteTask;
};
export declare const MsgUpdateRepositoryBackupRef: {
    encode(message: MsgUpdateRepositoryBackupRef, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateRepositoryBackupRef;
    fromJSON(object: any): MsgUpdateRepositoryBackupRef;
    toJSON(message: MsgUpdateRepositoryBackupRef): unknown;
    fromPartial(object: DeepPartial<MsgUpdateRepositoryBackupRef>): MsgUpdateRepositoryBackupRef;
};
export declare const MsgUpdateRepositoryBackupRefResponse: {
    encode(_: MsgUpdateRepositoryBackupRefResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateRepositoryBackupRefResponse;
    fromJSON(_: any): MsgUpdateRepositoryBackupRefResponse;
    toJSON(_: MsgUpdateRepositoryBackupRefResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdateRepositoryBackupRefResponse>): MsgUpdateRepositoryBackupRefResponse;
};
export declare const MsgAddRepositoryBackupRef: {
    encode(message: MsgAddRepositoryBackupRef, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddRepositoryBackupRef;
    fromJSON(object: any): MsgAddRepositoryBackupRef;
    toJSON(message: MsgAddRepositoryBackupRef): unknown;
    fromPartial(object: DeepPartial<MsgAddRepositoryBackupRef>): MsgAddRepositoryBackupRef;
};
export declare const MsgAddRepositoryBackupRefResponse: {
    encode(_: MsgAddRepositoryBackupRefResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddRepositoryBackupRefResponse;
    fromJSON(_: any): MsgAddRepositoryBackupRefResponse;
    toJSON(_: MsgAddRepositoryBackupRefResponse): unknown;
    fromPartial(_: DeepPartial<MsgAddRepositoryBackupRefResponse>): MsgAddRepositoryBackupRefResponse;
};
export declare const MsgCreateStorageProvider: {
    encode(message: MsgCreateStorageProvider, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateStorageProvider;
    fromJSON(object: any): MsgCreateStorageProvider;
    toJSON(message: MsgCreateStorageProvider): unknown;
    fromPartial(object: DeepPartial<MsgCreateStorageProvider>): MsgCreateStorageProvider;
};
export declare const MsgCreateStorageProviderResponse: {
    encode(message: MsgCreateStorageProviderResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateStorageProviderResponse;
    fromJSON(object: any): MsgCreateStorageProviderResponse;
    toJSON(message: MsgCreateStorageProviderResponse): unknown;
    fromPartial(object: DeepPartial<MsgCreateStorageProviderResponse>): MsgCreateStorageProviderResponse;
};
export declare const MsgUpdateStorageProvider: {
    encode(message: MsgUpdateStorageProvider, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateStorageProvider;
    fromJSON(object: any): MsgUpdateStorageProvider;
    toJSON(message: MsgUpdateStorageProvider): unknown;
    fromPartial(object: DeepPartial<MsgUpdateStorageProvider>): MsgUpdateStorageProvider;
};
export declare const MsgUpdateStorageProviderResponse: {
    encode(_: MsgUpdateStorageProviderResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateStorageProviderResponse;
    fromJSON(_: any): MsgUpdateStorageProviderResponse;
    toJSON(_: MsgUpdateStorageProviderResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdateStorageProviderResponse>): MsgUpdateStorageProviderResponse;
};
export declare const MsgDeleteStorageProvider: {
    encode(message: MsgDeleteStorageProvider, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteStorageProvider;
    fromJSON(object: any): MsgDeleteStorageProvider;
    toJSON(message: MsgDeleteStorageProvider): unknown;
    fromPartial(object: DeepPartial<MsgDeleteStorageProvider>): MsgDeleteStorageProvider;
};
export declare const MsgDeleteTaskResponse: {
    encode(_: MsgDeleteTaskResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteTaskResponse;
    fromJSON(_: any): MsgDeleteTaskResponse;
    toJSON(_: MsgDeleteTaskResponse): unknown;
    fromPartial(_: DeepPartial<MsgDeleteTaskResponse>): MsgDeleteTaskResponse;
};
export declare const MsgDeleteStorageProviderResponse: {
    encode(_: MsgDeleteStorageProviderResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteStorageProviderResponse;
    fromJSON(_: any): MsgDeleteStorageProviderResponse;
    toJSON(_: MsgDeleteStorageProviderResponse): unknown;
    fromPartial(_: DeepPartial<MsgDeleteStorageProviderResponse>): MsgDeleteStorageProviderResponse;
};
export declare const MsgSetBranch: {
    encode(message: MsgSetBranch, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSetBranch;
    fromJSON(object: any): MsgSetBranch;
    toJSON(message: MsgSetBranch): unknown;
    fromPartial(object: DeepPartial<MsgSetBranch>): MsgSetBranch;
};
export declare const MsgSetBranch_Branch: {
    encode(message: MsgSetBranch_Branch, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSetBranch_Branch;
    fromJSON(object: any): MsgSetBranch_Branch;
    toJSON(message: MsgSetBranch_Branch): unknown;
    fromPartial(object: DeepPartial<MsgSetBranch_Branch>): MsgSetBranch_Branch;
};
export declare const MsgSetBranchResponse: {
    encode(_: MsgSetBranchResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSetBranchResponse;
    fromJSON(_: any): MsgSetBranchResponse;
    toJSON(_: MsgSetBranchResponse): unknown;
    fromPartial(_: DeepPartial<MsgSetBranchResponse>): MsgSetBranchResponse;
};
export declare const MsgSetDefaultBranch: {
    encode(message: MsgSetDefaultBranch, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSetDefaultBranch;
    fromJSON(object: any): MsgSetDefaultBranch;
    toJSON(message: MsgSetDefaultBranch): unknown;
    fromPartial(object: DeepPartial<MsgSetDefaultBranch>): MsgSetDefaultBranch;
};
export declare const MsgSetDefaultBranchResponse: {
    encode(_: MsgSetDefaultBranchResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSetDefaultBranchResponse;
    fromJSON(_: any): MsgSetDefaultBranchResponse;
    toJSON(_: MsgSetDefaultBranchResponse): unknown;
    fromPartial(_: DeepPartial<MsgSetDefaultBranchResponse>): MsgSetDefaultBranchResponse;
};
export declare const MsgMultiSetBranch: {
    encode(message: MsgMultiSetBranch, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgMultiSetBranch;
    fromJSON(object: any): MsgMultiSetBranch;
    toJSON(message: MsgMultiSetBranch): unknown;
    fromPartial(object: DeepPartial<MsgMultiSetBranch>): MsgMultiSetBranch;
};
export declare const MsgMultiSetBranch_Branch: {
    encode(message: MsgMultiSetBranch_Branch, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgMultiSetBranch_Branch;
    fromJSON(object: any): MsgMultiSetBranch_Branch;
    toJSON(message: MsgMultiSetBranch_Branch): unknown;
    fromPartial(object: DeepPartial<MsgMultiSetBranch_Branch>): MsgMultiSetBranch_Branch;
};
export declare const MsgMultiSetBranchResponse: {
    encode(_: MsgMultiSetBranchResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgMultiSetBranchResponse;
    fromJSON(_: any): MsgMultiSetBranchResponse;
    toJSON(_: MsgMultiSetBranchResponse): unknown;
    fromPartial(_: DeepPartial<MsgMultiSetBranchResponse>): MsgMultiSetBranchResponse;
};
export declare const MsgDeleteBranch: {
    encode(message: MsgDeleteBranch, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteBranch;
    fromJSON(object: any): MsgDeleteBranch;
    toJSON(message: MsgDeleteBranch): unknown;
    fromPartial(object: DeepPartial<MsgDeleteBranch>): MsgDeleteBranch;
};
export declare const MsgDeleteBranchResponse: {
    encode(_: MsgDeleteBranchResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteBranchResponse;
    fromJSON(_: any): MsgDeleteBranchResponse;
    toJSON(_: MsgDeleteBranchResponse): unknown;
    fromPartial(_: DeepPartial<MsgDeleteBranchResponse>): MsgDeleteBranchResponse;
};
export declare const MsgMultiDeleteBranch: {
    encode(message: MsgMultiDeleteBranch, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgMultiDeleteBranch;
    fromJSON(object: any): MsgMultiDeleteBranch;
    toJSON(message: MsgMultiDeleteBranch): unknown;
    fromPartial(object: DeepPartial<MsgMultiDeleteBranch>): MsgMultiDeleteBranch;
};
export declare const MsgMultiDeleteBranchResponse: {
    encode(_: MsgMultiDeleteBranchResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgMultiDeleteBranchResponse;
    fromJSON(_: any): MsgMultiDeleteBranchResponse;
    toJSON(_: MsgMultiDeleteBranchResponse): unknown;
    fromPartial(_: DeepPartial<MsgMultiDeleteBranchResponse>): MsgMultiDeleteBranchResponse;
};
export declare const MsgSetTag: {
    encode(message: MsgSetTag, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSetTag;
    fromJSON(object: any): MsgSetTag;
    toJSON(message: MsgSetTag): unknown;
    fromPartial(object: DeepPartial<MsgSetTag>): MsgSetTag;
};
export declare const MsgSetTag_Tag: {
    encode(message: MsgSetTag_Tag, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSetTag_Tag;
    fromJSON(object: any): MsgSetTag_Tag;
    toJSON(message: MsgSetTag_Tag): unknown;
    fromPartial(object: DeepPartial<MsgSetTag_Tag>): MsgSetTag_Tag;
};
export declare const MsgSetTagResponse: {
    encode(_: MsgSetTagResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSetTagResponse;
    fromJSON(_: any): MsgSetTagResponse;
    toJSON(_: MsgSetTagResponse): unknown;
    fromPartial(_: DeepPartial<MsgSetTagResponse>): MsgSetTagResponse;
};
export declare const MsgMultiSetTag: {
    encode(message: MsgMultiSetTag, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgMultiSetTag;
    fromJSON(object: any): MsgMultiSetTag;
    toJSON(message: MsgMultiSetTag): unknown;
    fromPartial(object: DeepPartial<MsgMultiSetTag>): MsgMultiSetTag;
};
export declare const MsgMultiSetTag_Tag: {
    encode(message: MsgMultiSetTag_Tag, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgMultiSetTag_Tag;
    fromJSON(object: any): MsgMultiSetTag_Tag;
    toJSON(message: MsgMultiSetTag_Tag): unknown;
    fromPartial(object: DeepPartial<MsgMultiSetTag_Tag>): MsgMultiSetTag_Tag;
};
export declare const MsgMultiSetTagResponse: {
    encode(_: MsgMultiSetTagResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgMultiSetTagResponse;
    fromJSON(_: any): MsgMultiSetTagResponse;
    toJSON(_: MsgMultiSetTagResponse): unknown;
    fromPartial(_: DeepPartial<MsgMultiSetTagResponse>): MsgMultiSetTagResponse;
};
export declare const MsgDeleteTag: {
    encode(message: MsgDeleteTag, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteTag;
    fromJSON(object: any): MsgDeleteTag;
    toJSON(message: MsgDeleteTag): unknown;
    fromPartial(object: DeepPartial<MsgDeleteTag>): MsgDeleteTag;
};
export declare const MsgDeleteTagResponse: {
    encode(_: MsgDeleteTagResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteTagResponse;
    fromJSON(_: any): MsgDeleteTagResponse;
    toJSON(_: MsgDeleteTagResponse): unknown;
    fromPartial(_: DeepPartial<MsgDeleteTagResponse>): MsgDeleteTagResponse;
};
export declare const MsgMultiDeleteTag: {
    encode(message: MsgMultiDeleteTag, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgMultiDeleteTag;
    fromJSON(object: any): MsgMultiDeleteTag;
    toJSON(message: MsgMultiDeleteTag): unknown;
    fromPartial(object: DeepPartial<MsgMultiDeleteTag>): MsgMultiDeleteTag;
};
export declare const MsgMultiDeleteTagResponse: {
    encode(_: MsgMultiDeleteTagResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgMultiDeleteTagResponse;
    fromJSON(_: any): MsgMultiDeleteTagResponse;
    toJSON(_: MsgMultiDeleteTagResponse): unknown;
    fromPartial(_: DeepPartial<MsgMultiDeleteTagResponse>): MsgMultiDeleteTagResponse;
};
export declare const MsgAddMember: {
    encode(message: MsgAddMember, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddMember;
    fromJSON(object: any): MsgAddMember;
    toJSON(message: MsgAddMember): unknown;
    fromPartial(object: DeepPartial<MsgAddMember>): MsgAddMember;
};
export declare const MsgAddMemberResponse: {
    encode(_: MsgAddMemberResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddMemberResponse;
    fromJSON(_: any): MsgAddMemberResponse;
    toJSON(_: MsgAddMemberResponse): unknown;
    fromPartial(_: DeepPartial<MsgAddMemberResponse>): MsgAddMemberResponse;
};
export declare const MsgUpdateMemberRole: {
    encode(message: MsgUpdateMemberRole, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateMemberRole;
    fromJSON(object: any): MsgUpdateMemberRole;
    toJSON(message: MsgUpdateMemberRole): unknown;
    fromPartial(object: DeepPartial<MsgUpdateMemberRole>): MsgUpdateMemberRole;
};
export declare const MsgUpdateMemberRoleResponse: {
    encode(_: MsgUpdateMemberRoleResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateMemberRoleResponse;
    fromJSON(_: any): MsgUpdateMemberRoleResponse;
    toJSON(_: MsgUpdateMemberRoleResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdateMemberRoleResponse>): MsgUpdateMemberRoleResponse;
};
export declare const MsgRemoveMember: {
    encode(message: MsgRemoveMember, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRemoveMember;
    fromJSON(object: any): MsgRemoveMember;
    toJSON(message: MsgRemoveMember): unknown;
    fromPartial(object: DeepPartial<MsgRemoveMember>): MsgRemoveMember;
};
export declare const MsgRemoveMemberResponse: {
    encode(_: MsgRemoveMemberResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRemoveMemberResponse;
    fromJSON(_: any): MsgRemoveMemberResponse;
    toJSON(_: MsgRemoveMemberResponse): unknown;
    fromPartial(_: DeepPartial<MsgRemoveMemberResponse>): MsgRemoveMemberResponse;
};
export declare const MsgCreateRelease: {
    encode(message: MsgCreateRelease, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateRelease;
    fromJSON(object: any): MsgCreateRelease;
    toJSON(message: MsgCreateRelease): unknown;
    fromPartial(object: DeepPartial<MsgCreateRelease>): MsgCreateRelease;
};
export declare const MsgCreateReleaseResponse: {
    encode(message: MsgCreateReleaseResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateReleaseResponse;
    fromJSON(object: any): MsgCreateReleaseResponse;
    toJSON(message: MsgCreateReleaseResponse): unknown;
    fromPartial(object: DeepPartial<MsgCreateReleaseResponse>): MsgCreateReleaseResponse;
};
export declare const MsgUpdateRelease: {
    encode(message: MsgUpdateRelease, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateRelease;
    fromJSON(object: any): MsgUpdateRelease;
    toJSON(message: MsgUpdateRelease): unknown;
    fromPartial(object: DeepPartial<MsgUpdateRelease>): MsgUpdateRelease;
};
export declare const MsgUpdateReleaseResponse: {
    encode(_: MsgUpdateReleaseResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateReleaseResponse;
    fromJSON(_: any): MsgUpdateReleaseResponse;
    toJSON(_: MsgUpdateReleaseResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdateReleaseResponse>): MsgUpdateReleaseResponse;
};
export declare const MsgDeleteRelease: {
    encode(message: MsgDeleteRelease, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteRelease;
    fromJSON(object: any): MsgDeleteRelease;
    toJSON(message: MsgDeleteRelease): unknown;
    fromPartial(object: DeepPartial<MsgDeleteRelease>): MsgDeleteRelease;
};
export declare const MsgDeleteReleaseResponse: {
    encode(_: MsgDeleteReleaseResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteReleaseResponse;
    fromJSON(_: any): MsgDeleteReleaseResponse;
    toJSON(_: MsgDeleteReleaseResponse): unknown;
    fromPartial(_: DeepPartial<MsgDeleteReleaseResponse>): MsgDeleteReleaseResponse;
};
export declare const MsgCreatePullRequest: {
    encode(message: MsgCreatePullRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreatePullRequest;
    fromJSON(object: any): MsgCreatePullRequest;
    toJSON(message: MsgCreatePullRequest): unknown;
    fromPartial(object: DeepPartial<MsgCreatePullRequest>): MsgCreatePullRequest;
};
export declare const MsgCreatePullRequestResponse: {
    encode(message: MsgCreatePullRequestResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreatePullRequestResponse;
    fromJSON(object: any): MsgCreatePullRequestResponse;
    toJSON(message: MsgCreatePullRequestResponse): unknown;
    fromPartial(object: DeepPartial<MsgCreatePullRequestResponse>): MsgCreatePullRequestResponse;
};
export declare const MsgUpdatePullRequest: {
    encode(message: MsgUpdatePullRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdatePullRequest;
    fromJSON(object: any): MsgUpdatePullRequest;
    toJSON(message: MsgUpdatePullRequest): unknown;
    fromPartial(object: DeepPartial<MsgUpdatePullRequest>): MsgUpdatePullRequest;
};
export declare const MsgUpdatePullRequestResponse: {
    encode(_: MsgUpdatePullRequestResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdatePullRequestResponse;
    fromJSON(_: any): MsgUpdatePullRequestResponse;
    toJSON(_: MsgUpdatePullRequestResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdatePullRequestResponse>): MsgUpdatePullRequestResponse;
};
export declare const MsgUpdatePullRequestTitle: {
    encode(message: MsgUpdatePullRequestTitle, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdatePullRequestTitle;
    fromJSON(object: any): MsgUpdatePullRequestTitle;
    toJSON(message: MsgUpdatePullRequestTitle): unknown;
    fromPartial(object: DeepPartial<MsgUpdatePullRequestTitle>): MsgUpdatePullRequestTitle;
};
export declare const MsgUpdatePullRequestTitleResponse: {
    encode(_: MsgUpdatePullRequestTitleResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdatePullRequestTitleResponse;
    fromJSON(_: any): MsgUpdatePullRequestTitleResponse;
    toJSON(_: MsgUpdatePullRequestTitleResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdatePullRequestTitleResponse>): MsgUpdatePullRequestTitleResponse;
};
export declare const MsgUpdatePullRequestDescription: {
    encode(message: MsgUpdatePullRequestDescription, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdatePullRequestDescription;
    fromJSON(object: any): MsgUpdatePullRequestDescription;
    toJSON(message: MsgUpdatePullRequestDescription): unknown;
    fromPartial(object: DeepPartial<MsgUpdatePullRequestDescription>): MsgUpdatePullRequestDescription;
};
export declare const MsgUpdatePullRequestDescriptionResponse: {
    encode(_: MsgUpdatePullRequestDescriptionResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdatePullRequestDescriptionResponse;
    fromJSON(_: any): MsgUpdatePullRequestDescriptionResponse;
    toJSON(_: MsgUpdatePullRequestDescriptionResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdatePullRequestDescriptionResponse>): MsgUpdatePullRequestDescriptionResponse;
};
export declare const MsgInvokeMergePullRequest: {
    encode(message: MsgInvokeMergePullRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgInvokeMergePullRequest;
    fromJSON(object: any): MsgInvokeMergePullRequest;
    toJSON(message: MsgInvokeMergePullRequest): unknown;
    fromPartial(object: DeepPartial<MsgInvokeMergePullRequest>): MsgInvokeMergePullRequest;
};
export declare const MsgInvokeMergePullRequestResponse: {
    encode(_: MsgInvokeMergePullRequestResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgInvokeMergePullRequestResponse;
    fromJSON(_: any): MsgInvokeMergePullRequestResponse;
    toJSON(_: MsgInvokeMergePullRequestResponse): unknown;
    fromPartial(_: DeepPartial<MsgInvokeMergePullRequestResponse>): MsgInvokeMergePullRequestResponse;
};
export declare const MsgSetPullRequestState: {
    encode(message: MsgSetPullRequestState, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSetPullRequestState;
    fromJSON(object: any): MsgSetPullRequestState;
    toJSON(message: MsgSetPullRequestState): unknown;
    fromPartial(object: DeepPartial<MsgSetPullRequestState>): MsgSetPullRequestState;
};
export declare const MsgSetPullRequestStateResponse: {
    encode(message: MsgSetPullRequestStateResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSetPullRequestStateResponse;
    fromJSON(object: any): MsgSetPullRequestStateResponse;
    toJSON(message: MsgSetPullRequestStateResponse): unknown;
    fromPartial(object: DeepPartial<MsgSetPullRequestStateResponse>): MsgSetPullRequestStateResponse;
};
export declare const MsgAddPullRequestReviewers: {
    encode(message: MsgAddPullRequestReviewers, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddPullRequestReviewers;
    fromJSON(object: any): MsgAddPullRequestReviewers;
    toJSON(message: MsgAddPullRequestReviewers): unknown;
    fromPartial(object: DeepPartial<MsgAddPullRequestReviewers>): MsgAddPullRequestReviewers;
};
export declare const MsgAddPullRequestReviewersResponse: {
    encode(_: MsgAddPullRequestReviewersResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddPullRequestReviewersResponse;
    fromJSON(_: any): MsgAddPullRequestReviewersResponse;
    toJSON(_: MsgAddPullRequestReviewersResponse): unknown;
    fromPartial(_: DeepPartial<MsgAddPullRequestReviewersResponse>): MsgAddPullRequestReviewersResponse;
};
export declare const MsgRemovePullRequestReviewers: {
    encode(message: MsgRemovePullRequestReviewers, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRemovePullRequestReviewers;
    fromJSON(object: any): MsgRemovePullRequestReviewers;
    toJSON(message: MsgRemovePullRequestReviewers): unknown;
    fromPartial(object: DeepPartial<MsgRemovePullRequestReviewers>): MsgRemovePullRequestReviewers;
};
export declare const MsgRemovePullRequestReviewersResponse: {
    encode(_: MsgRemovePullRequestReviewersResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRemovePullRequestReviewersResponse;
    fromJSON(_: any): MsgRemovePullRequestReviewersResponse;
    toJSON(_: MsgRemovePullRequestReviewersResponse): unknown;
    fromPartial(_: DeepPartial<MsgRemovePullRequestReviewersResponse>): MsgRemovePullRequestReviewersResponse;
};
export declare const MsgAddPullRequestAssignees: {
    encode(message: MsgAddPullRequestAssignees, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddPullRequestAssignees;
    fromJSON(object: any): MsgAddPullRequestAssignees;
    toJSON(message: MsgAddPullRequestAssignees): unknown;
    fromPartial(object: DeepPartial<MsgAddPullRequestAssignees>): MsgAddPullRequestAssignees;
};
export declare const MsgAddPullRequestAssigneesResponse: {
    encode(_: MsgAddPullRequestAssigneesResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddPullRequestAssigneesResponse;
    fromJSON(_: any): MsgAddPullRequestAssigneesResponse;
    toJSON(_: MsgAddPullRequestAssigneesResponse): unknown;
    fromPartial(_: DeepPartial<MsgAddPullRequestAssigneesResponse>): MsgAddPullRequestAssigneesResponse;
};
export declare const MsgRemovePullRequestAssignees: {
    encode(message: MsgRemovePullRequestAssignees, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRemovePullRequestAssignees;
    fromJSON(object: any): MsgRemovePullRequestAssignees;
    toJSON(message: MsgRemovePullRequestAssignees): unknown;
    fromPartial(object: DeepPartial<MsgRemovePullRequestAssignees>): MsgRemovePullRequestAssignees;
};
export declare const MsgRemovePullRequestAssigneesResponse: {
    encode(_: MsgRemovePullRequestAssigneesResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRemovePullRequestAssigneesResponse;
    fromJSON(_: any): MsgRemovePullRequestAssigneesResponse;
    toJSON(_: MsgRemovePullRequestAssigneesResponse): unknown;
    fromPartial(_: DeepPartial<MsgRemovePullRequestAssigneesResponse>): MsgRemovePullRequestAssigneesResponse;
};
export declare const MsgAddPullRequestLabels: {
    encode(message: MsgAddPullRequestLabels, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddPullRequestLabels;
    fromJSON(object: any): MsgAddPullRequestLabels;
    toJSON(message: MsgAddPullRequestLabels): unknown;
    fromPartial(object: DeepPartial<MsgAddPullRequestLabels>): MsgAddPullRequestLabels;
};
export declare const MsgAddPullRequestLabelsResponse: {
    encode(_: MsgAddPullRequestLabelsResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddPullRequestLabelsResponse;
    fromJSON(_: any): MsgAddPullRequestLabelsResponse;
    toJSON(_: MsgAddPullRequestLabelsResponse): unknown;
    fromPartial(_: DeepPartial<MsgAddPullRequestLabelsResponse>): MsgAddPullRequestLabelsResponse;
};
export declare const MsgRemovePullRequestLabels: {
    encode(message: MsgRemovePullRequestLabels, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRemovePullRequestLabels;
    fromJSON(object: any): MsgRemovePullRequestLabels;
    toJSON(message: MsgRemovePullRequestLabels): unknown;
    fromPartial(object: DeepPartial<MsgRemovePullRequestLabels>): MsgRemovePullRequestLabels;
};
export declare const MsgRemovePullRequestLabelsResponse: {
    encode(_: MsgRemovePullRequestLabelsResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRemovePullRequestLabelsResponse;
    fromJSON(_: any): MsgRemovePullRequestLabelsResponse;
    toJSON(_: MsgRemovePullRequestLabelsResponse): unknown;
    fromPartial(_: DeepPartial<MsgRemovePullRequestLabelsResponse>): MsgRemovePullRequestLabelsResponse;
};
export declare const MsgDeletePullRequest: {
    encode(message: MsgDeletePullRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeletePullRequest;
    fromJSON(object: any): MsgDeletePullRequest;
    toJSON(message: MsgDeletePullRequest): unknown;
    fromPartial(object: DeepPartial<MsgDeletePullRequest>): MsgDeletePullRequest;
};
export declare const MsgDeletePullRequestResponse: {
    encode(_: MsgDeletePullRequestResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeletePullRequestResponse;
    fromJSON(_: any): MsgDeletePullRequestResponse;
    toJSON(_: MsgDeletePullRequestResponse): unknown;
    fromPartial(_: DeepPartial<MsgDeletePullRequestResponse>): MsgDeletePullRequestResponse;
};
export declare const MsgCreateDao: {
    encode(message: MsgCreateDao, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateDao;
    fromJSON(object: any): MsgCreateDao;
    toJSON(message: MsgCreateDao): unknown;
    fromPartial(object: DeepPartial<MsgCreateDao>): MsgCreateDao;
};
export declare const MsgCreateDaoResponse: {
    encode(message: MsgCreateDaoResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateDaoResponse;
    fromJSON(object: any): MsgCreateDaoResponse;
    toJSON(message: MsgCreateDaoResponse): unknown;
    fromPartial(object: DeepPartial<MsgCreateDaoResponse>): MsgCreateDaoResponse;
};
export declare const MsgRenameDao: {
    encode(message: MsgRenameDao, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRenameDao;
    fromJSON(object: any): MsgRenameDao;
    toJSON(message: MsgRenameDao): unknown;
    fromPartial(object: DeepPartial<MsgRenameDao>): MsgRenameDao;
};
export declare const MsgRenameDaoResponse: {
    encode(_: MsgRenameDaoResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRenameDaoResponse;
    fromJSON(_: any): MsgRenameDaoResponse;
    toJSON(_: MsgRenameDaoResponse): unknown;
    fromPartial(_: DeepPartial<MsgRenameDaoResponse>): MsgRenameDaoResponse;
};
export declare const MsgUpdateDaoDescription: {
    encode(message: MsgUpdateDaoDescription, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateDaoDescription;
    fromJSON(object: any): MsgUpdateDaoDescription;
    toJSON(message: MsgUpdateDaoDescription): unknown;
    fromPartial(object: DeepPartial<MsgUpdateDaoDescription>): MsgUpdateDaoDescription;
};
export declare const MsgUpdateDaoDescriptionResponse: {
    encode(_: MsgUpdateDaoDescriptionResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateDaoDescriptionResponse;
    fromJSON(_: any): MsgUpdateDaoDescriptionResponse;
    toJSON(_: MsgUpdateDaoDescriptionResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdateDaoDescriptionResponse>): MsgUpdateDaoDescriptionResponse;
};
export declare const MsgUpdateDaoWebsite: {
    encode(message: MsgUpdateDaoWebsite, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateDaoWebsite;
    fromJSON(object: any): MsgUpdateDaoWebsite;
    toJSON(message: MsgUpdateDaoWebsite): unknown;
    fromPartial(object: DeepPartial<MsgUpdateDaoWebsite>): MsgUpdateDaoWebsite;
};
export declare const MsgUpdateDaoWebsiteResponse: {
    encode(_: MsgUpdateDaoWebsiteResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateDaoWebsiteResponse;
    fromJSON(_: any): MsgUpdateDaoWebsiteResponse;
    toJSON(_: MsgUpdateDaoWebsiteResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdateDaoWebsiteResponse>): MsgUpdateDaoWebsiteResponse;
};
export declare const MsgUpdateDaoLocation: {
    encode(message: MsgUpdateDaoLocation, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateDaoLocation;
    fromJSON(object: any): MsgUpdateDaoLocation;
    toJSON(message: MsgUpdateDaoLocation): unknown;
    fromPartial(object: DeepPartial<MsgUpdateDaoLocation>): MsgUpdateDaoLocation;
};
export declare const MsgUpdateDaoLocationResponse: {
    encode(_: MsgUpdateDaoLocationResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateDaoLocationResponse;
    fromJSON(_: any): MsgUpdateDaoLocationResponse;
    toJSON(_: MsgUpdateDaoLocationResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdateDaoLocationResponse>): MsgUpdateDaoLocationResponse;
};
export declare const MsgUpdateDaoAvatar: {
    encode(message: MsgUpdateDaoAvatar, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateDaoAvatar;
    fromJSON(object: any): MsgUpdateDaoAvatar;
    toJSON(message: MsgUpdateDaoAvatar): unknown;
    fromPartial(object: DeepPartial<MsgUpdateDaoAvatar>): MsgUpdateDaoAvatar;
};
export declare const MsgUpdateDaoAvatarResponse: {
    encode(_: MsgUpdateDaoAvatarResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateDaoAvatarResponse;
    fromJSON(_: any): MsgUpdateDaoAvatarResponse;
    toJSON(_: MsgUpdateDaoAvatarResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdateDaoAvatarResponse>): MsgUpdateDaoAvatarResponse;
};
export declare const MsgDeleteDao: {
    encode(message: MsgDeleteDao, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteDao;
    fromJSON(object: any): MsgDeleteDao;
    toJSON(message: MsgDeleteDao): unknown;
    fromPartial(object: DeepPartial<MsgDeleteDao>): MsgDeleteDao;
};
export declare const MsgDeleteDaoResponse: {
    encode(_: MsgDeleteDaoResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteDaoResponse;
    fromJSON(_: any): MsgDeleteDaoResponse;
    toJSON(_: MsgDeleteDaoResponse): unknown;
    fromPartial(_: DeepPartial<MsgDeleteDaoResponse>): MsgDeleteDaoResponse;
};
export declare const MsgCreateComment: {
    encode(message: MsgCreateComment, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateComment;
    fromJSON(object: any): MsgCreateComment;
    toJSON(message: MsgCreateComment): unknown;
    fromPartial(object: DeepPartial<MsgCreateComment>): MsgCreateComment;
};
export declare const MsgCreateCommentResponse: {
    encode(message: MsgCreateCommentResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateCommentResponse;
    fromJSON(object: any): MsgCreateCommentResponse;
    toJSON(message: MsgCreateCommentResponse): unknown;
    fromPartial(object: DeepPartial<MsgCreateCommentResponse>): MsgCreateCommentResponse;
};
export declare const MsgUpdateComment: {
    encode(message: MsgUpdateComment, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateComment;
    fromJSON(object: any): MsgUpdateComment;
    toJSON(message: MsgUpdateComment): unknown;
    fromPartial(object: DeepPartial<MsgUpdateComment>): MsgUpdateComment;
};
export declare const MsgUpdateCommentResponse: {
    encode(_: MsgUpdateCommentResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateCommentResponse;
    fromJSON(_: any): MsgUpdateCommentResponse;
    toJSON(_: MsgUpdateCommentResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdateCommentResponse>): MsgUpdateCommentResponse;
};
export declare const MsgDeleteComment: {
    encode(message: MsgDeleteComment, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteComment;
    fromJSON(object: any): MsgDeleteComment;
    toJSON(message: MsgDeleteComment): unknown;
    fromPartial(object: DeepPartial<MsgDeleteComment>): MsgDeleteComment;
};
export declare const MsgDeleteCommentResponse: {
    encode(_: MsgDeleteCommentResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteCommentResponse;
    fromJSON(_: any): MsgDeleteCommentResponse;
    toJSON(_: MsgDeleteCommentResponse): unknown;
    fromPartial(_: DeepPartial<MsgDeleteCommentResponse>): MsgDeleteCommentResponse;
};
export declare const MsgCreateIssue: {
    encode(message: MsgCreateIssue, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateIssue;
    fromJSON(object: any): MsgCreateIssue;
    toJSON(message: MsgCreateIssue): unknown;
    fromPartial(object: DeepPartial<MsgCreateIssue>): MsgCreateIssue;
};
export declare const MsgCreateIssueResponse: {
    encode(message: MsgCreateIssueResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateIssueResponse;
    fromJSON(object: any): MsgCreateIssueResponse;
    toJSON(message: MsgCreateIssueResponse): unknown;
    fromPartial(object: DeepPartial<MsgCreateIssueResponse>): MsgCreateIssueResponse;
};
export declare const MsgUpdateIssue: {
    encode(message: MsgUpdateIssue, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateIssue;
    fromJSON(object: any): MsgUpdateIssue;
    toJSON(message: MsgUpdateIssue): unknown;
    fromPartial(object: DeepPartial<MsgUpdateIssue>): MsgUpdateIssue;
};
export declare const MsgUpdateIssueResponse: {
    encode(_: MsgUpdateIssueResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateIssueResponse;
    fromJSON(_: any): MsgUpdateIssueResponse;
    toJSON(_: MsgUpdateIssueResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdateIssueResponse>): MsgUpdateIssueResponse;
};
export declare const MsgUpdateIssueTitle: {
    encode(message: MsgUpdateIssueTitle, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateIssueTitle;
    fromJSON(object: any): MsgUpdateIssueTitle;
    toJSON(message: MsgUpdateIssueTitle): unknown;
    fromPartial(object: DeepPartial<MsgUpdateIssueTitle>): MsgUpdateIssueTitle;
};
export declare const MsgUpdateIssueTitleResponse: {
    encode(_: MsgUpdateIssueTitleResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateIssueTitleResponse;
    fromJSON(_: any): MsgUpdateIssueTitleResponse;
    toJSON(_: MsgUpdateIssueTitleResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdateIssueTitleResponse>): MsgUpdateIssueTitleResponse;
};
export declare const MsgUpdateIssueDescription: {
    encode(message: MsgUpdateIssueDescription, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateIssueDescription;
    fromJSON(object: any): MsgUpdateIssueDescription;
    toJSON(message: MsgUpdateIssueDescription): unknown;
    fromPartial(object: DeepPartial<MsgUpdateIssueDescription>): MsgUpdateIssueDescription;
};
export declare const MsgUpdateIssueDescriptionResponse: {
    encode(_: MsgUpdateIssueDescriptionResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateIssueDescriptionResponse;
    fromJSON(_: any): MsgUpdateIssueDescriptionResponse;
    toJSON(_: MsgUpdateIssueDescriptionResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdateIssueDescriptionResponse>): MsgUpdateIssueDescriptionResponse;
};
export declare const MsgToggleIssueState: {
    encode(message: MsgToggleIssueState, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgToggleIssueState;
    fromJSON(object: any): MsgToggleIssueState;
    toJSON(message: MsgToggleIssueState): unknown;
    fromPartial(object: DeepPartial<MsgToggleIssueState>): MsgToggleIssueState;
};
export declare const MsgToggleIssueStateResponse: {
    encode(message: MsgToggleIssueStateResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgToggleIssueStateResponse;
    fromJSON(object: any): MsgToggleIssueStateResponse;
    toJSON(message: MsgToggleIssueStateResponse): unknown;
    fromPartial(object: DeepPartial<MsgToggleIssueStateResponse>): MsgToggleIssueStateResponse;
};
export declare const MsgAddIssueAssignees: {
    encode(message: MsgAddIssueAssignees, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddIssueAssignees;
    fromJSON(object: any): MsgAddIssueAssignees;
    toJSON(message: MsgAddIssueAssignees): unknown;
    fromPartial(object: DeepPartial<MsgAddIssueAssignees>): MsgAddIssueAssignees;
};
export declare const MsgAddIssueAssigneesResponse: {
    encode(_: MsgAddIssueAssigneesResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddIssueAssigneesResponse;
    fromJSON(_: any): MsgAddIssueAssigneesResponse;
    toJSON(_: MsgAddIssueAssigneesResponse): unknown;
    fromPartial(_: DeepPartial<MsgAddIssueAssigneesResponse>): MsgAddIssueAssigneesResponse;
};
export declare const MsgRemoveIssueAssignees: {
    encode(message: MsgRemoveIssueAssignees, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRemoveIssueAssignees;
    fromJSON(object: any): MsgRemoveIssueAssignees;
    toJSON(message: MsgRemoveIssueAssignees): unknown;
    fromPartial(object: DeepPartial<MsgRemoveIssueAssignees>): MsgRemoveIssueAssignees;
};
export declare const MsgRemoveIssueAssigneesResponse: {
    encode(_: MsgRemoveIssueAssigneesResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRemoveIssueAssigneesResponse;
    fromJSON(_: any): MsgRemoveIssueAssigneesResponse;
    toJSON(_: MsgRemoveIssueAssigneesResponse): unknown;
    fromPartial(_: DeepPartial<MsgRemoveIssueAssigneesResponse>): MsgRemoveIssueAssigneesResponse;
};
export declare const MsgAddIssueLabels: {
    encode(message: MsgAddIssueLabels, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddIssueLabels;
    fromJSON(object: any): MsgAddIssueLabels;
    toJSON(message: MsgAddIssueLabels): unknown;
    fromPartial(object: DeepPartial<MsgAddIssueLabels>): MsgAddIssueLabels;
};
export declare const MsgAddIssueLabelsResponse: {
    encode(_: MsgAddIssueLabelsResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddIssueLabelsResponse;
    fromJSON(_: any): MsgAddIssueLabelsResponse;
    toJSON(_: MsgAddIssueLabelsResponse): unknown;
    fromPartial(_: DeepPartial<MsgAddIssueLabelsResponse>): MsgAddIssueLabelsResponse;
};
export declare const MsgRemoveIssueLabels: {
    encode(message: MsgRemoveIssueLabels, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRemoveIssueLabels;
    fromJSON(object: any): MsgRemoveIssueLabels;
    toJSON(message: MsgRemoveIssueLabels): unknown;
    fromPartial(object: DeepPartial<MsgRemoveIssueLabels>): MsgRemoveIssueLabels;
};
export declare const MsgRemoveIssueLabelsResponse: {
    encode(_: MsgRemoveIssueLabelsResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRemoveIssueLabelsResponse;
    fromJSON(_: any): MsgRemoveIssueLabelsResponse;
    toJSON(_: MsgRemoveIssueLabelsResponse): unknown;
    fromPartial(_: DeepPartial<MsgRemoveIssueLabelsResponse>): MsgRemoveIssueLabelsResponse;
};
export declare const MsgDeleteIssue: {
    encode(message: MsgDeleteIssue, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteIssue;
    fromJSON(object: any): MsgDeleteIssue;
    toJSON(message: MsgDeleteIssue): unknown;
    fromPartial(object: DeepPartial<MsgDeleteIssue>): MsgDeleteIssue;
};
export declare const MsgDeleteIssueResponse: {
    encode(_: MsgDeleteIssueResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteIssueResponse;
    fromJSON(_: any): MsgDeleteIssueResponse;
    toJSON(_: MsgDeleteIssueResponse): unknown;
    fromPartial(_: DeepPartial<MsgDeleteIssueResponse>): MsgDeleteIssueResponse;
};
export declare const MsgCreateRepository: {
    encode(message: MsgCreateRepository, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateRepository;
    fromJSON(object: any): MsgCreateRepository;
    toJSON(message: MsgCreateRepository): unknown;
    fromPartial(object: DeepPartial<MsgCreateRepository>): MsgCreateRepository;
};
export declare const MsgCreateRepositoryResponse: {
    encode(message: MsgCreateRepositoryResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateRepositoryResponse;
    fromJSON(object: any): MsgCreateRepositoryResponse;
    toJSON(message: MsgCreateRepositoryResponse): unknown;
    fromPartial(object: DeepPartial<MsgCreateRepositoryResponse>): MsgCreateRepositoryResponse;
};
export declare const MsgInvokeForkRepository: {
    encode(message: MsgInvokeForkRepository, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgInvokeForkRepository;
    fromJSON(object: any): MsgInvokeForkRepository;
    toJSON(message: MsgInvokeForkRepository): unknown;
    fromPartial(object: DeepPartial<MsgInvokeForkRepository>): MsgInvokeForkRepository;
};
export declare const MsgInvokeForkRepositoryResponse: {
    encode(_: MsgInvokeForkRepositoryResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgInvokeForkRepositoryResponse;
    fromJSON(_: any): MsgInvokeForkRepositoryResponse;
    toJSON(_: MsgInvokeForkRepositoryResponse): unknown;
    fromPartial(_: DeepPartial<MsgInvokeForkRepositoryResponse>): MsgInvokeForkRepositoryResponse;
};
export declare const MsgForkRepository: {
    encode(message: MsgForkRepository, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgForkRepository;
    fromJSON(object: any): MsgForkRepository;
    toJSON(message: MsgForkRepository): unknown;
    fromPartial(object: DeepPartial<MsgForkRepository>): MsgForkRepository;
};
export declare const MsgForkRepositoryResponse: {
    encode(message: MsgForkRepositoryResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgForkRepositoryResponse;
    fromJSON(object: any): MsgForkRepositoryResponse;
    toJSON(message: MsgForkRepositoryResponse): unknown;
    fromPartial(object: DeepPartial<MsgForkRepositoryResponse>): MsgForkRepositoryResponse;
};
export declare const MsgForkRepositorySuccess: {
    encode(message: MsgForkRepositorySuccess, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgForkRepositorySuccess;
    fromJSON(object: any): MsgForkRepositorySuccess;
    toJSON(message: MsgForkRepositorySuccess): unknown;
    fromPartial(object: DeepPartial<MsgForkRepositorySuccess>): MsgForkRepositorySuccess;
};
export declare const MsgForkRepositorySuccessResponse: {
    encode(message: MsgForkRepositorySuccessResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgForkRepositorySuccessResponse;
    fromJSON(object: any): MsgForkRepositorySuccessResponse;
    toJSON(message: MsgForkRepositorySuccessResponse): unknown;
    fromPartial(object: DeepPartial<MsgForkRepositorySuccessResponse>): MsgForkRepositorySuccessResponse;
};
export declare const MsgRenameRepository: {
    encode(message: MsgRenameRepository, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRenameRepository;
    fromJSON(object: any): MsgRenameRepository;
    toJSON(message: MsgRenameRepository): unknown;
    fromPartial(object: DeepPartial<MsgRenameRepository>): MsgRenameRepository;
};
export declare const MsgRenameRepositoryResponse: {
    encode(_: MsgRenameRepositoryResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRenameRepositoryResponse;
    fromJSON(_: any): MsgRenameRepositoryResponse;
    toJSON(_: MsgRenameRepositoryResponse): unknown;
    fromPartial(_: DeepPartial<MsgRenameRepositoryResponse>): MsgRenameRepositoryResponse;
};
export declare const MsgUpdateRepositoryDescription: {
    encode(message: MsgUpdateRepositoryDescription, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateRepositoryDescription;
    fromJSON(object: any): MsgUpdateRepositoryDescription;
    toJSON(message: MsgUpdateRepositoryDescription): unknown;
    fromPartial(object: DeepPartial<MsgUpdateRepositoryDescription>): MsgUpdateRepositoryDescription;
};
export declare const MsgUpdateRepositoryDescriptionResponse: {
    encode(_: MsgUpdateRepositoryDescriptionResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateRepositoryDescriptionResponse;
    fromJSON(_: any): MsgUpdateRepositoryDescriptionResponse;
    toJSON(_: MsgUpdateRepositoryDescriptionResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdateRepositoryDescriptionResponse>): MsgUpdateRepositoryDescriptionResponse;
};
export declare const MsgChangeOwner: {
    encode(message: MsgChangeOwner, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgChangeOwner;
    fromJSON(object: any): MsgChangeOwner;
    toJSON(message: MsgChangeOwner): unknown;
    fromPartial(object: DeepPartial<MsgChangeOwner>): MsgChangeOwner;
};
export declare const MsgChangeOwnerResponse: {
    encode(_: MsgChangeOwnerResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgChangeOwnerResponse;
    fromJSON(_: any): MsgChangeOwnerResponse;
    toJSON(_: MsgChangeOwnerResponse): unknown;
    fromPartial(_: DeepPartial<MsgChangeOwnerResponse>): MsgChangeOwnerResponse;
};
export declare const MsgUpdateRepositoryCollaborator: {
    encode(message: MsgUpdateRepositoryCollaborator, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateRepositoryCollaborator;
    fromJSON(object: any): MsgUpdateRepositoryCollaborator;
    toJSON(message: MsgUpdateRepositoryCollaborator): unknown;
    fromPartial(object: DeepPartial<MsgUpdateRepositoryCollaborator>): MsgUpdateRepositoryCollaborator;
};
export declare const MsgUpdateRepositoryCollaboratorResponse: {
    encode(_: MsgUpdateRepositoryCollaboratorResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateRepositoryCollaboratorResponse;
    fromJSON(_: any): MsgUpdateRepositoryCollaboratorResponse;
    toJSON(_: MsgUpdateRepositoryCollaboratorResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdateRepositoryCollaboratorResponse>): MsgUpdateRepositoryCollaboratorResponse;
};
export declare const MsgRemoveRepositoryCollaborator: {
    encode(message: MsgRemoveRepositoryCollaborator, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRemoveRepositoryCollaborator;
    fromJSON(object: any): MsgRemoveRepositoryCollaborator;
    toJSON(message: MsgRemoveRepositoryCollaborator): unknown;
    fromPartial(object: DeepPartial<MsgRemoveRepositoryCollaborator>): MsgRemoveRepositoryCollaborator;
};
export declare const MsgRemoveRepositoryCollaboratorResponse: {
    encode(_: MsgRemoveRepositoryCollaboratorResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRemoveRepositoryCollaboratorResponse;
    fromJSON(_: any): MsgRemoveRepositoryCollaboratorResponse;
    toJSON(_: MsgRemoveRepositoryCollaboratorResponse): unknown;
    fromPartial(_: DeepPartial<MsgRemoveRepositoryCollaboratorResponse>): MsgRemoveRepositoryCollaboratorResponse;
};
export declare const MsgCreateRepositoryLabel: {
    encode(message: MsgCreateRepositoryLabel, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateRepositoryLabel;
    fromJSON(object: any): MsgCreateRepositoryLabel;
    toJSON(message: MsgCreateRepositoryLabel): unknown;
    fromPartial(object: DeepPartial<MsgCreateRepositoryLabel>): MsgCreateRepositoryLabel;
};
export declare const MsgCreateRepositoryLabelResponse: {
    encode(message: MsgCreateRepositoryLabelResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateRepositoryLabelResponse;
    fromJSON(object: any): MsgCreateRepositoryLabelResponse;
    toJSON(message: MsgCreateRepositoryLabelResponse): unknown;
    fromPartial(object: DeepPartial<MsgCreateRepositoryLabelResponse>): MsgCreateRepositoryLabelResponse;
};
export declare const MsgUpdateRepositoryLabel: {
    encode(message: MsgUpdateRepositoryLabel, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateRepositoryLabel;
    fromJSON(object: any): MsgUpdateRepositoryLabel;
    toJSON(message: MsgUpdateRepositoryLabel): unknown;
    fromPartial(object: DeepPartial<MsgUpdateRepositoryLabel>): MsgUpdateRepositoryLabel;
};
export declare const MsgUpdateRepositoryLabelResponse: {
    encode(_: MsgUpdateRepositoryLabelResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateRepositoryLabelResponse;
    fromJSON(_: any): MsgUpdateRepositoryLabelResponse;
    toJSON(_: MsgUpdateRepositoryLabelResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdateRepositoryLabelResponse>): MsgUpdateRepositoryLabelResponse;
};
export declare const MsgDeleteRepositoryLabel: {
    encode(message: MsgDeleteRepositoryLabel, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteRepositoryLabel;
    fromJSON(object: any): MsgDeleteRepositoryLabel;
    toJSON(message: MsgDeleteRepositoryLabel): unknown;
    fromPartial(object: DeepPartial<MsgDeleteRepositoryLabel>): MsgDeleteRepositoryLabel;
};
export declare const MsgDeleteRepositoryLabelResponse: {
    encode(_: MsgDeleteRepositoryLabelResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteRepositoryLabelResponse;
    fromJSON(_: any): MsgDeleteRepositoryLabelResponse;
    toJSON(_: MsgDeleteRepositoryLabelResponse): unknown;
    fromPartial(_: DeepPartial<MsgDeleteRepositoryLabelResponse>): MsgDeleteRepositoryLabelResponse;
};
export declare const MsgToggleRepositoryForking: {
    encode(message: MsgToggleRepositoryForking, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgToggleRepositoryForking;
    fromJSON(object: any): MsgToggleRepositoryForking;
    toJSON(message: MsgToggleRepositoryForking): unknown;
    fromPartial(object: DeepPartial<MsgToggleRepositoryForking>): MsgToggleRepositoryForking;
};
export declare const MsgToggleRepositoryForkingResponse: {
    encode(message: MsgToggleRepositoryForkingResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgToggleRepositoryForkingResponse;
    fromJSON(object: any): MsgToggleRepositoryForkingResponse;
    toJSON(message: MsgToggleRepositoryForkingResponse): unknown;
    fromPartial(object: DeepPartial<MsgToggleRepositoryForkingResponse>): MsgToggleRepositoryForkingResponse;
};
export declare const MsgToggleArweaveBackup: {
    encode(message: MsgToggleArweaveBackup, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgToggleArweaveBackup;
    fromJSON(object: any): MsgToggleArweaveBackup;
    toJSON(message: MsgToggleArweaveBackup): unknown;
    fromPartial(object: DeepPartial<MsgToggleArweaveBackup>): MsgToggleArweaveBackup;
};
export declare const MsgToggleArweaveBackupResponse: {
    encode(message: MsgToggleArweaveBackupResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgToggleArweaveBackupResponse;
    fromJSON(object: any): MsgToggleArweaveBackupResponse;
    toJSON(message: MsgToggleArweaveBackupResponse): unknown;
    fromPartial(object: DeepPartial<MsgToggleArweaveBackupResponse>): MsgToggleArweaveBackupResponse;
};
export declare const MsgDeleteRepository: {
    encode(message: MsgDeleteRepository, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteRepository;
    fromJSON(object: any): MsgDeleteRepository;
    toJSON(message: MsgDeleteRepository): unknown;
    fromPartial(object: DeepPartial<MsgDeleteRepository>): MsgDeleteRepository;
};
export declare const MsgDeleteRepositoryResponse: {
    encode(_: MsgDeleteRepositoryResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteRepositoryResponse;
    fromJSON(_: any): MsgDeleteRepositoryResponse;
    toJSON(_: MsgDeleteRepositoryResponse): unknown;
    fromPartial(_: DeepPartial<MsgDeleteRepositoryResponse>): MsgDeleteRepositoryResponse;
};
export declare const MsgCreateUser: {
    encode(message: MsgCreateUser, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateUser;
    fromJSON(object: any): MsgCreateUser;
    toJSON(message: MsgCreateUser): unknown;
    fromPartial(object: DeepPartial<MsgCreateUser>): MsgCreateUser;
};
export declare const MsgCreateUserResponse: {
    encode(message: MsgCreateUserResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateUserResponse;
    fromJSON(object: any): MsgCreateUserResponse;
    toJSON(message: MsgCreateUserResponse): unknown;
    fromPartial(object: DeepPartial<MsgCreateUserResponse>): MsgCreateUserResponse;
};
export declare const MsgUpdateUserUsername: {
    encode(message: MsgUpdateUserUsername, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateUserUsername;
    fromJSON(object: any): MsgUpdateUserUsername;
    toJSON(message: MsgUpdateUserUsername): unknown;
    fromPartial(object: DeepPartial<MsgUpdateUserUsername>): MsgUpdateUserUsername;
};
export declare const MsgUpdateUserUsernameResponse: {
    encode(_: MsgUpdateUserUsernameResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateUserUsernameResponse;
    fromJSON(_: any): MsgUpdateUserUsernameResponse;
    toJSON(_: MsgUpdateUserUsernameResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdateUserUsernameResponse>): MsgUpdateUserUsernameResponse;
};
export declare const MsgUpdateUserName: {
    encode(message: MsgUpdateUserName, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateUserName;
    fromJSON(object: any): MsgUpdateUserName;
    toJSON(message: MsgUpdateUserName): unknown;
    fromPartial(object: DeepPartial<MsgUpdateUserName>): MsgUpdateUserName;
};
export declare const MsgUpdateUserNameResponse: {
    encode(_: MsgUpdateUserNameResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateUserNameResponse;
    fromJSON(_: any): MsgUpdateUserNameResponse;
    toJSON(_: MsgUpdateUserNameResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdateUserNameResponse>): MsgUpdateUserNameResponse;
};
export declare const MsgUpdateUserBio: {
    encode(message: MsgUpdateUserBio, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateUserBio;
    fromJSON(object: any): MsgUpdateUserBio;
    toJSON(message: MsgUpdateUserBio): unknown;
    fromPartial(object: DeepPartial<MsgUpdateUserBio>): MsgUpdateUserBio;
};
export declare const MsgUpdateUserBioResponse: {
    encode(_: MsgUpdateUserBioResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateUserBioResponse;
    fromJSON(_: any): MsgUpdateUserBioResponse;
    toJSON(_: MsgUpdateUserBioResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdateUserBioResponse>): MsgUpdateUserBioResponse;
};
export declare const MsgUpdateUserAvatar: {
    encode(message: MsgUpdateUserAvatar, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateUserAvatar;
    fromJSON(object: any): MsgUpdateUserAvatar;
    toJSON(message: MsgUpdateUserAvatar): unknown;
    fromPartial(object: DeepPartial<MsgUpdateUserAvatar>): MsgUpdateUserAvatar;
};
export declare const MsgUpdateUserAvatarResponse: {
    encode(_: MsgUpdateUserAvatarResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateUserAvatarResponse;
    fromJSON(_: any): MsgUpdateUserAvatarResponse;
    toJSON(_: MsgUpdateUserAvatarResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdateUserAvatarResponse>): MsgUpdateUserAvatarResponse;
};
export declare const MsgDeleteUser: {
    encode(message: MsgDeleteUser, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteUser;
    fromJSON(object: any): MsgDeleteUser;
    toJSON(message: MsgDeleteUser): unknown;
    fromPartial(object: DeepPartial<MsgDeleteUser>): MsgDeleteUser;
};
export declare const MsgDeleteUserResponse: {
    encode(_: MsgDeleteUserResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteUserResponse;
    fromJSON(_: any): MsgDeleteUserResponse;
    toJSON(_: MsgDeleteUserResponse): unknown;
    fromPartial(_: DeepPartial<MsgDeleteUserResponse>): MsgDeleteUserResponse;
};
/** Msg defines the Msg service. */
export interface Msg {
    /** this line is used by starport scaffolding # proto/tx/rpc */
    RevokeStorageProviderPermissions(request: MsgRevokeStorageProviderPermissions): Promise<MsgRevokeStorageProviderPermissionsResponse>;
    AuthorizeStorageProvider(request: MsgAuthorizeStorageProvider): Promise<MsgAuthorizeStorageProviderResponse>;
    RevokeGitServerPermissions(request: MsgRevokeGitServerPermissions): Promise<MsgRevokeGitServerPermissionsResponse>;
    AuthorizeGitServer(request: MsgAuthorizeGitServer): Promise<MsgAuthorizeGitServerResponse>;
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
    /** this line is used by starport scaffolding # proto/tx/rpc */
    CreateRelease(request: MsgCreateRelease): Promise<MsgCreateReleaseResponse>;
    UpdateRelease(request: MsgUpdateRelease): Promise<MsgUpdateReleaseResponse>;
    DeleteRelease(request: MsgDeleteRelease): Promise<MsgDeleteReleaseResponse>;
    CreatePullRequest(request: MsgCreatePullRequest): Promise<MsgCreatePullRequestResponse>;
    UpdatePullRequest(request: MsgUpdatePullRequest): Promise<MsgUpdatePullRequestResponse>;
    UpdatePullRequestTitle(request: MsgUpdatePullRequestTitle): Promise<MsgUpdatePullRequestTitleResponse>;
    UpdatePullRequestDescription(request: MsgUpdatePullRequestDescription): Promise<MsgUpdatePullRequestDescriptionResponse>;
    InvokeMergePullRequest(request: MsgInvokeMergePullRequest): Promise<MsgInvokeMergePullRequestResponse>;
    SetPullRequestState(request: MsgSetPullRequestState): Promise<MsgSetPullRequestStateResponse>;
    AddPullRequestReviewers(request: MsgAddPullRequestReviewers): Promise<MsgAddPullRequestReviewersResponse>;
    RemovePullRequestReviewers(request: MsgRemovePullRequestReviewers): Promise<MsgRemovePullRequestReviewersResponse>;
    AddPullRequestAssignees(request: MsgAddPullRequestAssignees): Promise<MsgAddPullRequestAssigneesResponse>;
    RemovePullRequestAssignees(request: MsgRemovePullRequestAssignees): Promise<MsgRemovePullRequestAssigneesResponse>;
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
    UpdateIssue(request: MsgUpdateIssue): Promise<MsgUpdateIssueResponse>;
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
    UpdateRepositoryCollaborator(request: MsgUpdateRepositoryCollaborator): Promise<MsgUpdateRepositoryCollaboratorResponse>;
    RemoveRepositoryCollaborator(request: MsgRemoveRepositoryCollaborator): Promise<MsgRemoveRepositoryCollaboratorResponse>;
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
    CreateStorageProvider(request: MsgCreateStorageProvider): Promise<MsgCreateStorageProviderResponse>;
    UpdateStorageProvider(request: MsgUpdateStorageProvider): Promise<MsgUpdateStorageProviderResponse>;
    DeleteStorageProvider(request: MsgDeleteStorageProvider): Promise<MsgDeleteStorageProviderResponse>;
    AddRepositoryBackupRef(request: MsgAddRepositoryBackupRef): Promise<MsgAddRepositoryBackupRefResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    RevokeStorageProviderPermissions(request: MsgRevokeStorageProviderPermissions): Promise<MsgRevokeStorageProviderPermissionsResponse>;
    AuthorizeStorageProvider(request: MsgAuthorizeStorageProvider): Promise<MsgAuthorizeStorageProviderResponse>;
    RevokeGitServerPermissions(request: MsgRevokeGitServerPermissions): Promise<MsgRevokeGitServerPermissionsResponse>;
    AuthorizeGitServer(request: MsgAuthorizeGitServer): Promise<MsgAuthorizeGitServerResponse>;
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
    CreateRelease(request: MsgCreateRelease): Promise<MsgCreateReleaseResponse>;
    UpdateRelease(request: MsgUpdateRelease): Promise<MsgUpdateReleaseResponse>;
    DeleteRelease(request: MsgDeleteRelease): Promise<MsgDeleteReleaseResponse>;
    CreatePullRequest(request: MsgCreatePullRequest): Promise<MsgCreatePullRequestResponse>;
    UpdatePullRequest(request: MsgUpdatePullRequest): Promise<MsgUpdatePullRequestResponse>;
    UpdatePullRequestTitle(request: MsgUpdatePullRequestTitle): Promise<MsgUpdatePullRequestTitleResponse>;
    UpdatePullRequestDescription(request: MsgUpdatePullRequestDescription): Promise<MsgUpdatePullRequestDescriptionResponse>;
    InvokeMergePullRequest(request: MsgInvokeMergePullRequest): Promise<MsgInvokeMergePullRequestResponse>;
    SetPullRequestState(request: MsgSetPullRequestState): Promise<MsgSetPullRequestStateResponse>;
    AddPullRequestReviewers(request: MsgAddPullRequestReviewers): Promise<MsgAddPullRequestReviewersResponse>;
    RemovePullRequestReviewers(request: MsgRemovePullRequestReviewers): Promise<MsgRemovePullRequestReviewersResponse>;
    AddPullRequestAssignees(request: MsgAddPullRequestAssignees): Promise<MsgAddPullRequestAssigneesResponse>;
    RemovePullRequestAssignees(request: MsgRemovePullRequestAssignees): Promise<MsgRemovePullRequestAssigneesResponse>;
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
    UpdateIssue(request: MsgUpdateIssue): Promise<MsgUpdateIssueResponse>;
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
    UpdateRepositoryCollaborator(request: MsgUpdateRepositoryCollaborator): Promise<MsgUpdateRepositoryCollaboratorResponse>;
    RemoveRepositoryCollaborator(request: MsgRemoveRepositoryCollaborator): Promise<MsgRemoveRepositoryCollaboratorResponse>;
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
    UpdateRepositoryBackupRef(request: MsgUpdateRepositoryBackupRef): Promise<MsgUpdateRepositoryBackupRefResponse>;
    CreateStorageProvider(request: MsgCreateStorageProvider): Promise<MsgCreateStorageProviderResponse>;
    UpdateStorageProvider(request: MsgUpdateStorageProvider): Promise<MsgUpdateStorageProviderResponse>;
    DeleteStorageProvider(request: MsgDeleteStorageProvider): Promise<MsgDeleteStorageProviderResponse>;
    AddRepositoryBackupRef(request: MsgAddRepositoryBackupRef): Promise<MsgAddRepositoryBackupRefResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
