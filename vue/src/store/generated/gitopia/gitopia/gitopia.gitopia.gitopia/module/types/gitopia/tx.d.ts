import { Reader, Writer } from "protobufjs/minimal";
export declare const protobufPackage = "gitopia.gitopia.gitopia";
/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgCreatePullRequest {
    creator: string;
    title: string;
    description: string;
    headBranch: string;
    headRepoId: number;
    baseBranch: string;
    baseRepoId: number;
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
export interface MsgSetPullRequestState {
    creator: string;
    id: number;
    state: string;
    mergeCommitSha: string;
}
export interface MsgSetPullRequestStateResponse {
    state: string;
}
export interface MsgDeletePullRequest {
    creator: string;
    id: number;
}
export interface MsgDeletePullRequestResponse {
}
export interface MsgCreateOrganization {
    creator: string;
    name: string;
    description: string;
}
export interface MsgCreateOrganizationResponse {
    id: string;
}
export interface MsgUpdateOrganizationMember {
    creator: string;
    id: string;
    user: string;
    role: string;
}
export interface MsgUpdateOrganizationMemberResponse {
}
export interface MsgRemoveOrganizationMember {
    creator: string;
    id: string;
    user: string;
}
export interface MsgRemoveOrganizationMemberResponse {
}
export interface MsgUpdateOrganization {
    creator: string;
    id: string;
    name: string;
    avatarUrl: string;
    location: string;
    email: string;
    website: string;
    description: string;
}
export interface MsgUpdateOrganizationResponse {
}
export interface MsgDeleteOrganization {
    creator: string;
    id: string;
}
export interface MsgDeleteOrganizationResponse {
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
    title: string;
    description: string;
    repositoryId: number;
    labels: string[];
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
    labels: string[];
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
export interface MsgDeleteIssue {
    creator: string;
    id: number;
}
export interface MsgDeleteIssueResponse {
}
export interface MsgCreateRepository {
    creator: string;
    name: string;
    ownerId: string;
    ownerType: string;
    description: string;
}
export interface MsgCreateRepositoryResponse {
    id: number;
    name: string;
}
export interface MsgForkRepository {
    creator: string;
    repositoryId: number;
    ownerId: string;
    ownerType: string;
}
export interface MsgForkRepositoryResponse {
    id: number;
}
export interface MsgRenameRepository {
    creator: string;
    id: number;
    name: string;
}
export interface MsgRenameRepositoryResponse {
}
export interface MsgChangeOwner {
    creator: string;
    repositoryId: number;
    ownerId: string;
    ownerType: string;
}
export interface MsgChangeOwnerResponse {
}
export interface MsgUpdateRepositoryCollaborator {
    creator: string;
    id: number;
    user: string;
    role: string;
}
export interface MsgUpdateRepositoryCollaboratorResponse {
}
export interface MsgRemoveRepositoryCollaborator {
    creator: string;
    id: number;
    user: string;
}
export interface MsgRemoveRepositoryCollaboratorResponse {
}
export interface MsgCreateBranch {
    creator: string;
    id: number;
    name: string;
    commitSHA: string;
}
export interface MsgCreateBranchResponse {
}
export interface MsgSetDefaultBranch {
    creator: string;
    id: number;
    name: string;
}
export interface MsgSetDefaultBranchResponse {
}
export interface MsgDeleteBranch {
    creator: string;
    id: number;
    name: string;
}
export interface MsgDeleteBranchResponse {
}
export interface MsgCreateTag {
    creator: string;
    id: number;
    name: string;
    sha: string;
}
export interface MsgCreateTagResponse {
}
export interface MsgDeleteTag {
    creator: string;
    id: number;
    name: string;
}
export interface MsgDeleteTagResponse {
}
export interface MsgUpdateRepository {
    creator: string;
    id: number;
    name: string;
    owner: string;
    description: string;
    labels: string;
    license: string;
    defaultBranch: string;
}
export interface MsgUpdateRepositoryResponse {
}
export interface MsgDeleteRepository {
    creator: string;
    id: number;
}
export interface MsgDeleteRepositoryResponse {
}
export interface MsgCreateUser {
    creator: string;
    username: string;
    usernameGithub: string;
    avatarUrl: string;
    followers: string;
    following: string;
    repositories: string;
    repositoriesArchived: string;
    organizations: string;
    starredRepos: string;
    subscriptions: string;
    email: string;
    bio: string;
    createdAt: string;
    updatedAt: string;
    extensions: string;
}
export interface MsgCreateUserResponse {
    id: string;
}
export interface MsgUpdateUser {
    creator: string;
    id: string;
    username: string;
    usernameGithub: string;
    avatarUrl: string;
    followers: string;
    following: string;
    repositories: string;
    repositoriesArchived: string;
    organizations: string;
    starredRepos: string;
    subscriptions: string;
    email: string;
    bio: string;
    createdAt: string;
    updatedAt: string;
    extensions: string;
}
export interface MsgUpdateUserResponse {
}
export interface MsgDeleteUser {
    creator: string;
    id: string;
}
export interface MsgDeleteUserResponse {
}
export interface MsgSetWhois {
    creator: string;
    name: string;
    address: string;
}
export interface MsgSetWhoisResponse {
}
export interface MsgUpdateWhois {
    creator: string;
    name: string;
    address: string;
}
export interface MsgUpdateWhoisResponse {
}
export interface MsgDeleteWhois {
    creator: string;
    name: string;
}
export interface MsgDeleteWhoisResponse {
}
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
export declare const MsgCreateOrganization: {
    encode(message: MsgCreateOrganization, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateOrganization;
    fromJSON(object: any): MsgCreateOrganization;
    toJSON(message: MsgCreateOrganization): unknown;
    fromPartial(object: DeepPartial<MsgCreateOrganization>): MsgCreateOrganization;
};
export declare const MsgCreateOrganizationResponse: {
    encode(message: MsgCreateOrganizationResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateOrganizationResponse;
    fromJSON(object: any): MsgCreateOrganizationResponse;
    toJSON(message: MsgCreateOrganizationResponse): unknown;
    fromPartial(object: DeepPartial<MsgCreateOrganizationResponse>): MsgCreateOrganizationResponse;
};
export declare const MsgUpdateOrganizationMember: {
    encode(message: MsgUpdateOrganizationMember, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateOrganizationMember;
    fromJSON(object: any): MsgUpdateOrganizationMember;
    toJSON(message: MsgUpdateOrganizationMember): unknown;
    fromPartial(object: DeepPartial<MsgUpdateOrganizationMember>): MsgUpdateOrganizationMember;
};
export declare const MsgUpdateOrganizationMemberResponse: {
    encode(_: MsgUpdateOrganizationMemberResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateOrganizationMemberResponse;
    fromJSON(_: any): MsgUpdateOrganizationMemberResponse;
    toJSON(_: MsgUpdateOrganizationMemberResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdateOrganizationMemberResponse>): MsgUpdateOrganizationMemberResponse;
};
export declare const MsgRemoveOrganizationMember: {
    encode(message: MsgRemoveOrganizationMember, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRemoveOrganizationMember;
    fromJSON(object: any): MsgRemoveOrganizationMember;
    toJSON(message: MsgRemoveOrganizationMember): unknown;
    fromPartial(object: DeepPartial<MsgRemoveOrganizationMember>): MsgRemoveOrganizationMember;
};
export declare const MsgRemoveOrganizationMemberResponse: {
    encode(_: MsgRemoveOrganizationMemberResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRemoveOrganizationMemberResponse;
    fromJSON(_: any): MsgRemoveOrganizationMemberResponse;
    toJSON(_: MsgRemoveOrganizationMemberResponse): unknown;
    fromPartial(_: DeepPartial<MsgRemoveOrganizationMemberResponse>): MsgRemoveOrganizationMemberResponse;
};
export declare const MsgUpdateOrganization: {
    encode(message: MsgUpdateOrganization, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateOrganization;
    fromJSON(object: any): MsgUpdateOrganization;
    toJSON(message: MsgUpdateOrganization): unknown;
    fromPartial(object: DeepPartial<MsgUpdateOrganization>): MsgUpdateOrganization;
};
export declare const MsgUpdateOrganizationResponse: {
    encode(_: MsgUpdateOrganizationResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateOrganizationResponse;
    fromJSON(_: any): MsgUpdateOrganizationResponse;
    toJSON(_: MsgUpdateOrganizationResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdateOrganizationResponse>): MsgUpdateOrganizationResponse;
};
export declare const MsgDeleteOrganization: {
    encode(message: MsgDeleteOrganization, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteOrganization;
    fromJSON(object: any): MsgDeleteOrganization;
    toJSON(message: MsgDeleteOrganization): unknown;
    fromPartial(object: DeepPartial<MsgDeleteOrganization>): MsgDeleteOrganization;
};
export declare const MsgDeleteOrganizationResponse: {
    encode(_: MsgDeleteOrganizationResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteOrganizationResponse;
    fromJSON(_: any): MsgDeleteOrganizationResponse;
    toJSON(_: MsgDeleteOrganizationResponse): unknown;
    fromPartial(_: DeepPartial<MsgDeleteOrganizationResponse>): MsgDeleteOrganizationResponse;
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
export declare const MsgCreateBranch: {
    encode(message: MsgCreateBranch, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateBranch;
    fromJSON(object: any): MsgCreateBranch;
    toJSON(message: MsgCreateBranch): unknown;
    fromPartial(object: DeepPartial<MsgCreateBranch>): MsgCreateBranch;
};
export declare const MsgCreateBranchResponse: {
    encode(_: MsgCreateBranchResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateBranchResponse;
    fromJSON(_: any): MsgCreateBranchResponse;
    toJSON(_: MsgCreateBranchResponse): unknown;
    fromPartial(_: DeepPartial<MsgCreateBranchResponse>): MsgCreateBranchResponse;
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
export declare const MsgCreateTag: {
    encode(message: MsgCreateTag, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateTag;
    fromJSON(object: any): MsgCreateTag;
    toJSON(message: MsgCreateTag): unknown;
    fromPartial(object: DeepPartial<MsgCreateTag>): MsgCreateTag;
};
export declare const MsgCreateTagResponse: {
    encode(_: MsgCreateTagResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateTagResponse;
    fromJSON(_: any): MsgCreateTagResponse;
    toJSON(_: MsgCreateTagResponse): unknown;
    fromPartial(_: DeepPartial<MsgCreateTagResponse>): MsgCreateTagResponse;
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
export declare const MsgUpdateRepository: {
    encode(message: MsgUpdateRepository, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateRepository;
    fromJSON(object: any): MsgUpdateRepository;
    toJSON(message: MsgUpdateRepository): unknown;
    fromPartial(object: DeepPartial<MsgUpdateRepository>): MsgUpdateRepository;
};
export declare const MsgUpdateRepositoryResponse: {
    encode(_: MsgUpdateRepositoryResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateRepositoryResponse;
    fromJSON(_: any): MsgUpdateRepositoryResponse;
    toJSON(_: MsgUpdateRepositoryResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdateRepositoryResponse>): MsgUpdateRepositoryResponse;
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
export declare const MsgUpdateUser: {
    encode(message: MsgUpdateUser, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateUser;
    fromJSON(object: any): MsgUpdateUser;
    toJSON(message: MsgUpdateUser): unknown;
    fromPartial(object: DeepPartial<MsgUpdateUser>): MsgUpdateUser;
};
export declare const MsgUpdateUserResponse: {
    encode(_: MsgUpdateUserResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateUserResponse;
    fromJSON(_: any): MsgUpdateUserResponse;
    toJSON(_: MsgUpdateUserResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdateUserResponse>): MsgUpdateUserResponse;
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
export declare const MsgSetWhois: {
    encode(message: MsgSetWhois, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSetWhois;
    fromJSON(object: any): MsgSetWhois;
    toJSON(message: MsgSetWhois): unknown;
    fromPartial(object: DeepPartial<MsgSetWhois>): MsgSetWhois;
};
export declare const MsgSetWhoisResponse: {
    encode(_: MsgSetWhoisResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSetWhoisResponse;
    fromJSON(_: any): MsgSetWhoisResponse;
    toJSON(_: MsgSetWhoisResponse): unknown;
    fromPartial(_: DeepPartial<MsgSetWhoisResponse>): MsgSetWhoisResponse;
};
export declare const MsgUpdateWhois: {
    encode(message: MsgUpdateWhois, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateWhois;
    fromJSON(object: any): MsgUpdateWhois;
    toJSON(message: MsgUpdateWhois): unknown;
    fromPartial(object: DeepPartial<MsgUpdateWhois>): MsgUpdateWhois;
};
export declare const MsgUpdateWhoisResponse: {
    encode(_: MsgUpdateWhoisResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateWhoisResponse;
    fromJSON(_: any): MsgUpdateWhoisResponse;
    toJSON(_: MsgUpdateWhoisResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdateWhoisResponse>): MsgUpdateWhoisResponse;
};
export declare const MsgDeleteWhois: {
    encode(message: MsgDeleteWhois, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteWhois;
    fromJSON(object: any): MsgDeleteWhois;
    toJSON(message: MsgDeleteWhois): unknown;
    fromPartial(object: DeepPartial<MsgDeleteWhois>): MsgDeleteWhois;
};
export declare const MsgDeleteWhoisResponse: {
    encode(_: MsgDeleteWhoisResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteWhoisResponse;
    fromJSON(_: any): MsgDeleteWhoisResponse;
    toJSON(_: MsgDeleteWhoisResponse): unknown;
    fromPartial(_: DeepPartial<MsgDeleteWhoisResponse>): MsgDeleteWhoisResponse;
};
/** Msg defines the Msg service. */
export interface Msg {
    /** this line is used by starport scaffolding # proto/tx/rpc */
    CreatePullRequest(request: MsgCreatePullRequest): Promise<MsgCreatePullRequestResponse>;
    UpdatePullRequest(request: MsgUpdatePullRequest): Promise<MsgUpdatePullRequestResponse>;
    UpdatePullRequestTitle(request: MsgUpdatePullRequestTitle): Promise<MsgUpdatePullRequestTitleResponse>;
    UpdatePullRequestDescription(request: MsgUpdatePullRequestDescription): Promise<MsgUpdatePullRequestDescriptionResponse>;
    SetPullRequestState(request: MsgSetPullRequestState): Promise<MsgSetPullRequestStateResponse>;
    DeletePullRequest(request: MsgDeletePullRequest): Promise<MsgDeletePullRequestResponse>;
    CreateOrganization(request: MsgCreateOrganization): Promise<MsgCreateOrganizationResponse>;
    UpdateOrganizationMember(request: MsgUpdateOrganizationMember): Promise<MsgUpdateOrganizationMemberResponse>;
    RemoveOrganizationMember(request: MsgRemoveOrganizationMember): Promise<MsgRemoveOrganizationMemberResponse>;
    UpdateOrganization(request: MsgUpdateOrganization): Promise<MsgUpdateOrganizationResponse>;
    DeleteOrganization(request: MsgDeleteOrganization): Promise<MsgDeleteOrganizationResponse>;
    CreateComment(request: MsgCreateComment): Promise<MsgCreateCommentResponse>;
    UpdateComment(request: MsgUpdateComment): Promise<MsgUpdateCommentResponse>;
    DeleteComment(request: MsgDeleteComment): Promise<MsgDeleteCommentResponse>;
    CreateIssue(request: MsgCreateIssue): Promise<MsgCreateIssueResponse>;
    UpdateIssue(request: MsgUpdateIssue): Promise<MsgUpdateIssueResponse>;
    UpdateIssueTitle(request: MsgUpdateIssueTitle): Promise<MsgUpdateIssueTitleResponse>;
    UpdateIssueDescription(request: MsgUpdateIssueDescription): Promise<MsgUpdateIssueDescriptionResponse>;
    ToggleIssueState(request: MsgToggleIssueState): Promise<MsgToggleIssueStateResponse>;
    DeleteIssue(request: MsgDeleteIssue): Promise<MsgDeleteIssueResponse>;
    CreateRepository(request: MsgCreateRepository): Promise<MsgCreateRepositoryResponse>;
    ForkRepository(request: MsgForkRepository): Promise<MsgForkRepositoryResponse>;
    RenameRepository(request: MsgRenameRepository): Promise<MsgRenameRepositoryResponse>;
    ChangeOwner(request: MsgChangeOwner): Promise<MsgChangeOwnerResponse>;
    UpdateRepositoryCollaborator(request: MsgUpdateRepositoryCollaborator): Promise<MsgUpdateRepositoryCollaboratorResponse>;
    RemoveRepositoryCollaborator(request: MsgRemoveRepositoryCollaborator): Promise<MsgRemoveRepositoryCollaboratorResponse>;
    CreateBranch(request: MsgCreateBranch): Promise<MsgCreateBranchResponse>;
    SetDefaultBranch(request: MsgSetDefaultBranch): Promise<MsgSetDefaultBranchResponse>;
    DeleteBranch(request: MsgDeleteBranch): Promise<MsgDeleteBranchResponse>;
    CreateTag(request: MsgCreateTag): Promise<MsgCreateTagResponse>;
    DeleteTag(request: MsgDeleteTag): Promise<MsgDeleteTagResponse>;
    UpdateRepository(request: MsgUpdateRepository): Promise<MsgUpdateRepositoryResponse>;
    DeleteRepository(request: MsgDeleteRepository): Promise<MsgDeleteRepositoryResponse>;
    CreateUser(request: MsgCreateUser): Promise<MsgCreateUserResponse>;
    UpdateUser(request: MsgUpdateUser): Promise<MsgUpdateUserResponse>;
    DeleteUser(request: MsgDeleteUser): Promise<MsgDeleteUserResponse>;
    SetWhois(request: MsgSetWhois): Promise<MsgSetWhoisResponse>;
    UpdateWhois(request: MsgUpdateWhois): Promise<MsgUpdateWhoisResponse>;
    DeleteWhois(request: MsgDeleteWhois): Promise<MsgDeleteWhoisResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    CreatePullRequest(request: MsgCreatePullRequest): Promise<MsgCreatePullRequestResponse>;
    UpdatePullRequest(request: MsgUpdatePullRequest): Promise<MsgUpdatePullRequestResponse>;
    UpdatePullRequestTitle(request: MsgUpdatePullRequestTitle): Promise<MsgUpdatePullRequestTitleResponse>;
    UpdatePullRequestDescription(request: MsgUpdatePullRequestDescription): Promise<MsgUpdatePullRequestDescriptionResponse>;
    SetPullRequestState(request: MsgSetPullRequestState): Promise<MsgSetPullRequestStateResponse>;
    DeletePullRequest(request: MsgDeletePullRequest): Promise<MsgDeletePullRequestResponse>;
    CreateOrganization(request: MsgCreateOrganization): Promise<MsgCreateOrganizationResponse>;
    UpdateOrganizationMember(request: MsgUpdateOrganizationMember): Promise<MsgUpdateOrganizationMemberResponse>;
    RemoveOrganizationMember(request: MsgRemoveOrganizationMember): Promise<MsgRemoveOrganizationMemberResponse>;
    UpdateOrganization(request: MsgUpdateOrganization): Promise<MsgUpdateOrganizationResponse>;
    DeleteOrganization(request: MsgDeleteOrganization): Promise<MsgDeleteOrganizationResponse>;
    CreateComment(request: MsgCreateComment): Promise<MsgCreateCommentResponse>;
    UpdateComment(request: MsgUpdateComment): Promise<MsgUpdateCommentResponse>;
    DeleteComment(request: MsgDeleteComment): Promise<MsgDeleteCommentResponse>;
    CreateIssue(request: MsgCreateIssue): Promise<MsgCreateIssueResponse>;
    UpdateIssue(request: MsgUpdateIssue): Promise<MsgUpdateIssueResponse>;
    UpdateIssueTitle(request: MsgUpdateIssueTitle): Promise<MsgUpdateIssueTitleResponse>;
    UpdateIssueDescription(request: MsgUpdateIssueDescription): Promise<MsgUpdateIssueDescriptionResponse>;
    ToggleIssueState(request: MsgToggleIssueState): Promise<MsgToggleIssueStateResponse>;
    DeleteIssue(request: MsgDeleteIssue): Promise<MsgDeleteIssueResponse>;
    CreateRepository(request: MsgCreateRepository): Promise<MsgCreateRepositoryResponse>;
    ForkRepository(request: MsgForkRepository): Promise<MsgForkRepositoryResponse>;
    RenameRepository(request: MsgRenameRepository): Promise<MsgRenameRepositoryResponse>;
    ChangeOwner(request: MsgChangeOwner): Promise<MsgChangeOwnerResponse>;
    UpdateRepositoryCollaborator(request: MsgUpdateRepositoryCollaborator): Promise<MsgUpdateRepositoryCollaboratorResponse>;
    RemoveRepositoryCollaborator(request: MsgRemoveRepositoryCollaborator): Promise<MsgRemoveRepositoryCollaboratorResponse>;
    CreateBranch(request: MsgCreateBranch): Promise<MsgCreateBranchResponse>;
    SetDefaultBranch(request: MsgSetDefaultBranch): Promise<MsgSetDefaultBranchResponse>;
    DeleteBranch(request: MsgDeleteBranch): Promise<MsgDeleteBranchResponse>;
    CreateTag(request: MsgCreateTag): Promise<MsgCreateTagResponse>;
    DeleteTag(request: MsgDeleteTag): Promise<MsgDeleteTagResponse>;
    UpdateRepository(request: MsgUpdateRepository): Promise<MsgUpdateRepositoryResponse>;
    DeleteRepository(request: MsgDeleteRepository): Promise<MsgDeleteRepositoryResponse>;
    CreateUser(request: MsgCreateUser): Promise<MsgCreateUserResponse>;
    UpdateUser(request: MsgUpdateUser): Promise<MsgUpdateUserResponse>;
    DeleteUser(request: MsgDeleteUser): Promise<MsgDeleteUserResponse>;
    SetWhois(request: MsgSetWhois): Promise<MsgSetWhoisResponse>;
    UpdateWhois(request: MsgUpdateWhois): Promise<MsgUpdateWhoisResponse>;
    DeleteWhois(request: MsgDeleteWhois): Promise<MsgDeleteWhoisResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
