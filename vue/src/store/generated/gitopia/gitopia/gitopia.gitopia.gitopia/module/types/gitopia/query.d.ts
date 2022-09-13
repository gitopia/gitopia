import { Reader, Writer } from "protobufjs/minimal";
import { Task } from "../gitopia/task";
import { PageRequest, PageResponse } from "../cosmos/base/query/v1beta1/pagination";
import { Branch } from "../gitopia/branch";
import { Tag } from "../gitopia/tag";
import { Member } from "../gitopia/member";
import { StorageProvider } from "../gitopia/storage_provider";
import { Release } from "../gitopia/release";
import { PullRequest } from "../gitopia/pullRequest";
import { Dao } from "../gitopia/dao";
import { Comment } from "../gitopia/comment";
import { Issue } from "../gitopia/issue";
import { Repository, RepositoryOwner } from "../gitopia/repository";
import { User } from "../gitopia/user";
import { Whois } from "../gitopia/whois";
export declare const protobufPackage = "gitopia.gitopia.gitopia";
export interface QueryCheckStorageProviderAuthorizationRequest {
    userAddress: string;
    providerAddress: string;
}
export interface QueryCheckStorageProviderAuthorizationResponse {
    haveAuthorization: boolean;
}
export interface QueryGetTaskRequest {
    id: number;
}
export interface QueryGetTaskResponse {
    Task: Task | undefined;
}
export interface QueryAllTaskRequest {
    pagination: PageRequest | undefined;
}
export interface QueryAllTaskResponse {
    Task: Task[];
    pagination: PageResponse | undefined;
}
export interface QueryCheckGitServerAuthorizationRequest {
    userAddress: string;
    providerAddress: string;
}
export interface QueryCheckGitServerAuthorizationResponse {
    haveAuthorization: boolean;
}
export interface QueryAllBranchRequest {
    pagination: PageRequest | undefined;
}
export interface QueryAllBranchResponse {
    Branch: Branch[];
    pagination: PageResponse | undefined;
}
export interface QueryGetRepositoryBranchRequest {
    id: string;
    repositoryName: string;
    branchName: string;
}
export interface QueryGetRepositoryBranchResponse {
    Branch: Branch | undefined;
}
export interface QueryGetRepositoryBranchShaRequest {
    id: string;
    repositoryName: string;
    branchName: string;
}
export interface QueryGetRepositoryBranchShaResponse {
    sha: string;
}
export interface QueryAllRepositoryBranchRequest {
    id: string;
    repositoryName: string;
    pagination: PageRequest | undefined;
}
export interface QueryAllRepositoryBranchResponse {
    Branch: Branch[];
    pagination: PageResponse | undefined;
}
export interface QueryAllTagRequest {
    pagination: PageRequest | undefined;
}
export interface QueryAllTagResponse {
    Tag: Tag[];
    pagination: PageResponse | undefined;
}
export interface QueryGetRepositoryTagRequest {
    id: string;
    repositoryName: string;
    tagName: string;
}
export interface QueryGetRepositoryTagResponse {
    Tag: Tag | undefined;
}
export interface QueryGetRepositoryTagShaRequest {
    id: string;
    repositoryName: string;
    tagName: string;
}
export interface QueryGetRepositoryTagShaResponse {
    sha: string;
}
export interface QueryAllRepositoryTagRequest {
    id: string;
    repositoryName: string;
    pagination: PageRequest | undefined;
}
export interface QueryAllRepositoryTagResponse {
    Tag: Tag[];
    pagination: PageResponse | undefined;
}
export interface QueryGetDaoMemberRequest {
    daoId: string;
    userId: string;
}
export interface QueryGetDaoMemberResponse {
    Member: Member | undefined;
}
export interface QueryAllDaoMemberRequest {
    daoId: string;
    pagination: PageRequest | undefined;
}
export interface QueryAllDaoMemberResponse {
    Member: Member[];
    pagination: PageResponse | undefined;
}
export interface QueryAllMemberRequest {
    pagination: PageRequest | undefined;
}
export interface QueryAllMemberResponse {
    Member: Member[];
    pagination: PageResponse | undefined;
}
/** this line is used by starport scaffolding # 3 */
export interface QueryGetPullRequestMergePermissionRequest {
    userId: string;
    pullId: number;
}
export interface QueryGetPullRequestMergePermissionResponse {
    havePermission: boolean;
}
export interface QueryGetStorageProviderRequest {
    id: number;
}
export interface QueryGetStorageProviderResponse {
    StorageProvider: StorageProvider | undefined;
}
export interface QueryAllStorageProviderRequest {
    pagination: PageRequest | undefined;
}
export interface QueryAllStorageProviderResponse {
    StorageProvider: StorageProvider[];
    pagination: PageResponse | undefined;
}
/** this line is used by starport scaffolding # 3 */
export interface QueryGetReleaseRequest {
    id: number;
}
export interface QueryGetReleaseResponse {
    Release: Release | undefined;
}
export interface QueryAllReleaseRequest {
    pagination: PageRequest | undefined;
}
export interface QueryAllReleaseResponse {
    Release: Release[];
    pagination: PageResponse | undefined;
}
export interface QueryGetPullRequestRequest {
    id: number;
}
export interface QueryGetPullRequestResponse {
    PullRequest: PullRequest | undefined;
}
export interface QueryAllPullRequestRequest {
    pagination: PageRequest | undefined;
}
export interface QueryAllPullRequestResponse {
    PullRequest: PullRequest[];
    pagination: PageResponse | undefined;
}
export interface QueryGetDaoRequest {
    id: string;
}
export interface QueryGetDaoResponse {
    dao: Dao | undefined;
}
export interface QueryAllDaoRequest {
    pagination: PageRequest | undefined;
}
export interface QueryAllDaoResponse {
    dao: Dao[];
    pagination: PageResponse | undefined;
}
export interface QueryGetLegacyDaoRequest {
    legacyAddress: string;
}
export interface QueryGetLegacyDaoResponse {
    dao: Dao | undefined;
}
export interface QueryGetCommentRequest {
    id: number;
}
export interface QueryGetCommentResponse {
    Comment: Comment | undefined;
}
export interface QueryAllCommentRequest {
    pagination: PageRequest | undefined;
}
export interface QueryAllCommentResponse {
    Comment: Comment[];
    pagination: PageResponse | undefined;
}
export interface QueryGetIssueRequest {
    id: number;
}
export interface QueryGetIssueResponse {
    Issue: Issue | undefined;
}
export interface QueryAllIssueRequest {
    pagination: PageRequest | undefined;
}
export interface QueryAllIssueResponse {
    Issue: Issue[];
    pagination: PageResponse | undefined;
}
export interface QueryGetLatestRepositoryReleaseRequest {
    id: string;
    repositoryName: string;
}
export interface QueryGetLatestRepositoryReleaseResponse {
    Release: Release | undefined;
}
export interface QueryGetRepositoryReleaseRequest {
    id: string;
    repositoryName: string;
    tagName: string;
}
export interface QueryGetRepositoryReleaseResponse {
    Release: Release | undefined;
}
export interface QueryAllRepositoryReleaseRequest {
    id: string;
    repositoryName: string;
    pagination: PageRequest | undefined;
}
export interface QueryAllRepositoryReleaseResponse {
    Release: Release[];
    pagination: PageResponse | undefined;
}
export interface QueryGetRepositoryIssueRequest {
    id: string;
    repositoryName: string;
    issueIid: number;
}
export interface QueryGetRepositoryIssueResponse {
    Issue: Issue | undefined;
}
export interface QueryGetRepositoryPullRequestRequest {
    id: string;
    repositoryName: string;
    pullIid: number;
}
export interface QueryGetRepositoryPullRequestResponse {
    PullRequest: PullRequest | undefined;
}
export interface QueryAllRepositoryIssueRequest {
    id: string;
    repositoryName: string;
    option: IssueOptions | undefined;
    pagination: PageRequest | undefined;
}
export interface IssueOptions {
    createdBy: string;
    state: string;
    labels: string;
    assignee: string;
    labelIds: number[];
    sort: string;
    search: string;
    updatedAfter: number;
    updatedBefore: number;
}
export interface QueryAllRepositoryIssueResponse {
    Issue: Issue[];
    pagination: PageResponse | undefined;
}
export interface QueryAllRepositoryPullRequestRequest {
    id: string;
    repositoryName: string;
    option: PullRequestOptions | undefined;
    pagination: PageRequest | undefined;
}
export interface PullRequestOptions {
    createdBy: string;
    state: string;
    labels: string;
    assignee: string;
    reviewer: string;
    labelIds: number[];
    sort: string;
    search: string;
    updatedAfter: number;
    updatedBefore: number;
}
export interface QueryAllRepositoryPullRequestResponse {
    PullRequest: PullRequest[];
    pagination: PageResponse | undefined;
}
export interface QueryGetRepositoryRequest {
    id: number;
}
export interface QueryGetRepositoryResponse {
    Repository: Repository | undefined;
}
export interface RepositoryFork {
    creator: string;
    id: number;
    name: string;
    owner: RepositoryOwner | undefined;
    description: string;
    parent: number;
    forksCount: number;
    issuesCount: number;
    pullsCount: number;
}
export interface QueryGetAllForkRequest {
    id: string;
    repositoryName: string;
    pagination: PageRequest | undefined;
}
export interface QueryGetAllForkResponse {
    forks: RepositoryFork[];
    pagination: PageResponse | undefined;
}
export interface QueryAllRepositoryRequest {
    pagination: PageRequest | undefined;
}
export interface QueryAllRepositoryResponse {
    Repository: Repository[];
    pagination: PageResponse | undefined;
}
export interface QueryGetUserRequest {
    id: string;
}
export interface QueryGetUserResponse {
    User: User | undefined;
}
export interface QueryAllUserDaoRequest {
    userId: string;
    pagination: PageRequest | undefined;
}
export interface QueryAllUserDaoResponse {
    dao: Dao[];
    pagination: PageResponse | undefined;
}
export interface QueryAllUserRequest {
    pagination: PageRequest | undefined;
}
export interface QueryAllUserResponse {
    User: User[];
    pagination: PageResponse | undefined;
}
export interface QueryAllAnyRepositoryRequest {
    id: string;
    pagination: PageRequest | undefined;
}
export interface QueryAllAnyRepositoryResponse {
    Repository: Repository[];
    pagination: PageResponse | undefined;
}
export interface QueryGetAnyRepositoryRequest {
    id: string;
    repositoryName: string;
}
export interface QueryGetAnyRepositoryResponse {
    Repository: Repository | undefined;
}
export interface QueryGetWhoisRequest {
    name: string;
}
export interface QueryGetWhoisResponse {
    Whois: Whois | undefined;
}
export interface QueryAllWhoisRequest {
    pagination: PageRequest | undefined;
}
export interface QueryAllWhoisResponse {
    Whois: Whois[];
    pagination: PageResponse | undefined;
}
export declare const QueryCheckStorageProviderAuthorizationRequest: {
    encode(message: QueryCheckStorageProviderAuthorizationRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryCheckStorageProviderAuthorizationRequest;
    fromJSON(object: any): QueryCheckStorageProviderAuthorizationRequest;
    toJSON(message: QueryCheckStorageProviderAuthorizationRequest): unknown;
    fromPartial(object: DeepPartial<QueryCheckStorageProviderAuthorizationRequest>): QueryCheckStorageProviderAuthorizationRequest;
};
export declare const QueryCheckStorageProviderAuthorizationResponse: {
    encode(message: QueryCheckStorageProviderAuthorizationResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryCheckStorageProviderAuthorizationResponse;
    fromJSON(object: any): QueryCheckStorageProviderAuthorizationResponse;
    toJSON(message: QueryCheckStorageProviderAuthorizationResponse): unknown;
    fromPartial(object: DeepPartial<QueryCheckStorageProviderAuthorizationResponse>): QueryCheckStorageProviderAuthorizationResponse;
};
export declare const QueryGetTaskRequest: {
    encode(message: QueryGetTaskRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetTaskRequest;
    fromJSON(object: any): QueryGetTaskRequest;
    toJSON(message: QueryGetTaskRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetTaskRequest>): QueryGetTaskRequest;
};
export declare const QueryGetTaskResponse: {
    encode(message: QueryGetTaskResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetTaskResponse;
    fromJSON(object: any): QueryGetTaskResponse;
    toJSON(message: QueryGetTaskResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetTaskResponse>): QueryGetTaskResponse;
};
export declare const QueryAllTaskRequest: {
    encode(message: QueryAllTaskRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllTaskRequest;
    fromJSON(object: any): QueryAllTaskRequest;
    toJSON(message: QueryAllTaskRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllTaskRequest>): QueryAllTaskRequest;
};
export declare const QueryAllTaskResponse: {
    encode(message: QueryAllTaskResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllTaskResponse;
    fromJSON(object: any): QueryAllTaskResponse;
    toJSON(message: QueryAllTaskResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllTaskResponse>): QueryAllTaskResponse;
};
export declare const QueryCheckGitServerAuthorizationRequest: {
    encode(message: QueryCheckGitServerAuthorizationRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryCheckGitServerAuthorizationRequest;
    fromJSON(object: any): QueryCheckGitServerAuthorizationRequest;
    toJSON(message: QueryCheckGitServerAuthorizationRequest): unknown;
    fromPartial(object: DeepPartial<QueryCheckGitServerAuthorizationRequest>): QueryCheckGitServerAuthorizationRequest;
};
export declare const QueryCheckGitServerAuthorizationResponse: {
    encode(message: QueryCheckGitServerAuthorizationResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryCheckGitServerAuthorizationResponse;
    fromJSON(object: any): QueryCheckGitServerAuthorizationResponse;
    toJSON(message: QueryCheckGitServerAuthorizationResponse): unknown;
    fromPartial(object: DeepPartial<QueryCheckGitServerAuthorizationResponse>): QueryCheckGitServerAuthorizationResponse;
};
export declare const QueryAllBranchRequest: {
    encode(message: QueryAllBranchRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllBranchRequest;
    fromJSON(object: any): QueryAllBranchRequest;
    toJSON(message: QueryAllBranchRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllBranchRequest>): QueryAllBranchRequest;
};
export declare const QueryAllBranchResponse: {
    encode(message: QueryAllBranchResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllBranchResponse;
    fromJSON(object: any): QueryAllBranchResponse;
    toJSON(message: QueryAllBranchResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllBranchResponse>): QueryAllBranchResponse;
};
export declare const QueryGetRepositoryBranchRequest: {
    encode(message: QueryGetRepositoryBranchRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetRepositoryBranchRequest;
    fromJSON(object: any): QueryGetRepositoryBranchRequest;
    toJSON(message: QueryGetRepositoryBranchRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetRepositoryBranchRequest>): QueryGetRepositoryBranchRequest;
};
export declare const QueryGetRepositoryBranchResponse: {
    encode(message: QueryGetRepositoryBranchResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetRepositoryBranchResponse;
    fromJSON(object: any): QueryGetRepositoryBranchResponse;
    toJSON(message: QueryGetRepositoryBranchResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetRepositoryBranchResponse>): QueryGetRepositoryBranchResponse;
};
export declare const QueryGetRepositoryBranchShaRequest: {
    encode(message: QueryGetRepositoryBranchShaRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetRepositoryBranchShaRequest;
    fromJSON(object: any): QueryGetRepositoryBranchShaRequest;
    toJSON(message: QueryGetRepositoryBranchShaRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetRepositoryBranchShaRequest>): QueryGetRepositoryBranchShaRequest;
};
export declare const QueryGetRepositoryBranchShaResponse: {
    encode(message: QueryGetRepositoryBranchShaResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetRepositoryBranchShaResponse;
    fromJSON(object: any): QueryGetRepositoryBranchShaResponse;
    toJSON(message: QueryGetRepositoryBranchShaResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetRepositoryBranchShaResponse>): QueryGetRepositoryBranchShaResponse;
};
export declare const QueryAllRepositoryBranchRequest: {
    encode(message: QueryAllRepositoryBranchRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllRepositoryBranchRequest;
    fromJSON(object: any): QueryAllRepositoryBranchRequest;
    toJSON(message: QueryAllRepositoryBranchRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllRepositoryBranchRequest>): QueryAllRepositoryBranchRequest;
};
export declare const QueryAllRepositoryBranchResponse: {
    encode(message: QueryAllRepositoryBranchResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllRepositoryBranchResponse;
    fromJSON(object: any): QueryAllRepositoryBranchResponse;
    toJSON(message: QueryAllRepositoryBranchResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllRepositoryBranchResponse>): QueryAllRepositoryBranchResponse;
};
export declare const QueryAllTagRequest: {
    encode(message: QueryAllTagRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllTagRequest;
    fromJSON(object: any): QueryAllTagRequest;
    toJSON(message: QueryAllTagRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllTagRequest>): QueryAllTagRequest;
};
export declare const QueryAllTagResponse: {
    encode(message: QueryAllTagResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllTagResponse;
    fromJSON(object: any): QueryAllTagResponse;
    toJSON(message: QueryAllTagResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllTagResponse>): QueryAllTagResponse;
};
export declare const QueryGetRepositoryTagRequest: {
    encode(message: QueryGetRepositoryTagRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetRepositoryTagRequest;
    fromJSON(object: any): QueryGetRepositoryTagRequest;
    toJSON(message: QueryGetRepositoryTagRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetRepositoryTagRequest>): QueryGetRepositoryTagRequest;
};
export declare const QueryGetRepositoryTagResponse: {
    encode(message: QueryGetRepositoryTagResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetRepositoryTagResponse;
    fromJSON(object: any): QueryGetRepositoryTagResponse;
    toJSON(message: QueryGetRepositoryTagResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetRepositoryTagResponse>): QueryGetRepositoryTagResponse;
};
export declare const QueryGetRepositoryTagShaRequest: {
    encode(message: QueryGetRepositoryTagShaRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetRepositoryTagShaRequest;
    fromJSON(object: any): QueryGetRepositoryTagShaRequest;
    toJSON(message: QueryGetRepositoryTagShaRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetRepositoryTagShaRequest>): QueryGetRepositoryTagShaRequest;
};
export declare const QueryGetRepositoryTagShaResponse: {
    encode(message: QueryGetRepositoryTagShaResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetRepositoryTagShaResponse;
    fromJSON(object: any): QueryGetRepositoryTagShaResponse;
    toJSON(message: QueryGetRepositoryTagShaResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetRepositoryTagShaResponse>): QueryGetRepositoryTagShaResponse;
};
export declare const QueryAllRepositoryTagRequest: {
    encode(message: QueryAllRepositoryTagRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllRepositoryTagRequest;
    fromJSON(object: any): QueryAllRepositoryTagRequest;
    toJSON(message: QueryAllRepositoryTagRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllRepositoryTagRequest>): QueryAllRepositoryTagRequest;
};
export declare const QueryAllRepositoryTagResponse: {
    encode(message: QueryAllRepositoryTagResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllRepositoryTagResponse;
    fromJSON(object: any): QueryAllRepositoryTagResponse;
    toJSON(message: QueryAllRepositoryTagResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllRepositoryTagResponse>): QueryAllRepositoryTagResponse;
};
export declare const QueryGetDaoMemberRequest: {
    encode(message: QueryGetDaoMemberRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetDaoMemberRequest;
    fromJSON(object: any): QueryGetDaoMemberRequest;
    toJSON(message: QueryGetDaoMemberRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetDaoMemberRequest>): QueryGetDaoMemberRequest;
};
export declare const QueryGetDaoMemberResponse: {
    encode(message: QueryGetDaoMemberResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetDaoMemberResponse;
    fromJSON(object: any): QueryGetDaoMemberResponse;
    toJSON(message: QueryGetDaoMemberResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetDaoMemberResponse>): QueryGetDaoMemberResponse;
};
export declare const QueryAllDaoMemberRequest: {
    encode(message: QueryAllDaoMemberRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllDaoMemberRequest;
    fromJSON(object: any): QueryAllDaoMemberRequest;
    toJSON(message: QueryAllDaoMemberRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllDaoMemberRequest>): QueryAllDaoMemberRequest;
};
export declare const QueryAllDaoMemberResponse: {
    encode(message: QueryAllDaoMemberResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllDaoMemberResponse;
    fromJSON(object: any): QueryAllDaoMemberResponse;
    toJSON(message: QueryAllDaoMemberResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllDaoMemberResponse>): QueryAllDaoMemberResponse;
};
export declare const QueryAllMemberRequest: {
    encode(message: QueryAllMemberRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllMemberRequest;
    fromJSON(object: any): QueryAllMemberRequest;
    toJSON(message: QueryAllMemberRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllMemberRequest>): QueryAllMemberRequest;
};
export declare const QueryAllMemberResponse: {
    encode(message: QueryAllMemberResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllMemberResponse;
    fromJSON(object: any): QueryAllMemberResponse;
    toJSON(message: QueryAllMemberResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllMemberResponse>): QueryAllMemberResponse;
};
export declare const QueryGetPullRequestMergePermissionRequest: {
    encode(message: QueryGetPullRequestMergePermissionRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetPullRequestMergePermissionRequest;
    fromJSON(object: any): QueryGetPullRequestMergePermissionRequest;
    toJSON(message: QueryGetPullRequestMergePermissionRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetPullRequestMergePermissionRequest>): QueryGetPullRequestMergePermissionRequest;
};
export declare const QueryGetPullRequestMergePermissionResponse: {
    encode(message: QueryGetPullRequestMergePermissionResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetPullRequestMergePermissionResponse;
    fromJSON(object: any): QueryGetPullRequestMergePermissionResponse;
    toJSON(message: QueryGetPullRequestMergePermissionResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetPullRequestMergePermissionResponse>): QueryGetPullRequestMergePermissionResponse;
};
export declare const QueryGetStorageProviderRequest: {
    encode(message: QueryGetStorageProviderRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetStorageProviderRequest;
    fromJSON(object: any): QueryGetStorageProviderRequest;
    toJSON(message: QueryGetStorageProviderRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetStorageProviderRequest>): QueryGetStorageProviderRequest;
};
export declare const QueryGetStorageProviderResponse: {
    encode(message: QueryGetStorageProviderResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetStorageProviderResponse;
    fromJSON(object: any): QueryGetStorageProviderResponse;
    toJSON(message: QueryGetStorageProviderResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetStorageProviderResponse>): QueryGetStorageProviderResponse;
};
export declare const QueryAllStorageProviderRequest: {
    encode(message: QueryAllStorageProviderRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllStorageProviderRequest;
    fromJSON(object: any): QueryAllStorageProviderRequest;
    toJSON(message: QueryAllStorageProviderRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllStorageProviderRequest>): QueryAllStorageProviderRequest;
};
export declare const QueryAllStorageProviderResponse: {
    encode(message: QueryAllStorageProviderResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllStorageProviderResponse;
    fromJSON(object: any): QueryAllStorageProviderResponse;
    toJSON(message: QueryAllStorageProviderResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllStorageProviderResponse>): QueryAllStorageProviderResponse;
};
export declare const QueryGetReleaseRequest: {
    encode(message: QueryGetReleaseRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetReleaseRequest;
    fromJSON(object: any): QueryGetReleaseRequest;
    toJSON(message: QueryGetReleaseRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetReleaseRequest>): QueryGetReleaseRequest;
};
export declare const QueryGetReleaseResponse: {
    encode(message: QueryGetReleaseResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetReleaseResponse;
    fromJSON(object: any): QueryGetReleaseResponse;
    toJSON(message: QueryGetReleaseResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetReleaseResponse>): QueryGetReleaseResponse;
};
export declare const QueryAllReleaseRequest: {
    encode(message: QueryAllReleaseRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllReleaseRequest;
    fromJSON(object: any): QueryAllReleaseRequest;
    toJSON(message: QueryAllReleaseRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllReleaseRequest>): QueryAllReleaseRequest;
};
export declare const QueryAllReleaseResponse: {
    encode(message: QueryAllReleaseResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllReleaseResponse;
    fromJSON(object: any): QueryAllReleaseResponse;
    toJSON(message: QueryAllReleaseResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllReleaseResponse>): QueryAllReleaseResponse;
};
export declare const QueryGetPullRequestRequest: {
    encode(message: QueryGetPullRequestRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetPullRequestRequest;
    fromJSON(object: any): QueryGetPullRequestRequest;
    toJSON(message: QueryGetPullRequestRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetPullRequestRequest>): QueryGetPullRequestRequest;
};
export declare const QueryGetPullRequestResponse: {
    encode(message: QueryGetPullRequestResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetPullRequestResponse;
    fromJSON(object: any): QueryGetPullRequestResponse;
    toJSON(message: QueryGetPullRequestResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetPullRequestResponse>): QueryGetPullRequestResponse;
};
export declare const QueryAllPullRequestRequest: {
    encode(message: QueryAllPullRequestRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllPullRequestRequest;
    fromJSON(object: any): QueryAllPullRequestRequest;
    toJSON(message: QueryAllPullRequestRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllPullRequestRequest>): QueryAllPullRequestRequest;
};
export declare const QueryAllPullRequestResponse: {
    encode(message: QueryAllPullRequestResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllPullRequestResponse;
    fromJSON(object: any): QueryAllPullRequestResponse;
    toJSON(message: QueryAllPullRequestResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllPullRequestResponse>): QueryAllPullRequestResponse;
};
export declare const QueryGetDaoRequest: {
    encode(message: QueryGetDaoRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetDaoRequest;
    fromJSON(object: any): QueryGetDaoRequest;
    toJSON(message: QueryGetDaoRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetDaoRequest>): QueryGetDaoRequest;
};
export declare const QueryGetDaoResponse: {
    encode(message: QueryGetDaoResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetDaoResponse;
    fromJSON(object: any): QueryGetDaoResponse;
    toJSON(message: QueryGetDaoResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetDaoResponse>): QueryGetDaoResponse;
};
export declare const QueryAllDaoRequest: {
    encode(message: QueryAllDaoRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllDaoRequest;
    fromJSON(object: any): QueryAllDaoRequest;
    toJSON(message: QueryAllDaoRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllDaoRequest>): QueryAllDaoRequest;
};
export declare const QueryAllDaoResponse: {
    encode(message: QueryAllDaoResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllDaoResponse;
    fromJSON(object: any): QueryAllDaoResponse;
    toJSON(message: QueryAllDaoResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllDaoResponse>): QueryAllDaoResponse;
};
export declare const QueryGetLegacyDaoRequest: {
    encode(message: QueryGetLegacyDaoRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetLegacyDaoRequest;
    fromJSON(object: any): QueryGetLegacyDaoRequest;
    toJSON(message: QueryGetLegacyDaoRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetLegacyDaoRequest>): QueryGetLegacyDaoRequest;
};
export declare const QueryGetLegacyDaoResponse: {
    encode(message: QueryGetLegacyDaoResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetLegacyDaoResponse;
    fromJSON(object: any): QueryGetLegacyDaoResponse;
    toJSON(message: QueryGetLegacyDaoResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetLegacyDaoResponse>): QueryGetLegacyDaoResponse;
};
export declare const QueryGetCommentRequest: {
    encode(message: QueryGetCommentRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetCommentRequest;
    fromJSON(object: any): QueryGetCommentRequest;
    toJSON(message: QueryGetCommentRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetCommentRequest>): QueryGetCommentRequest;
};
export declare const QueryGetCommentResponse: {
    encode(message: QueryGetCommentResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetCommentResponse;
    fromJSON(object: any): QueryGetCommentResponse;
    toJSON(message: QueryGetCommentResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetCommentResponse>): QueryGetCommentResponse;
};
export declare const QueryAllCommentRequest: {
    encode(message: QueryAllCommentRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllCommentRequest;
    fromJSON(object: any): QueryAllCommentRequest;
    toJSON(message: QueryAllCommentRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllCommentRequest>): QueryAllCommentRequest;
};
export declare const QueryAllCommentResponse: {
    encode(message: QueryAllCommentResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllCommentResponse;
    fromJSON(object: any): QueryAllCommentResponse;
    toJSON(message: QueryAllCommentResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllCommentResponse>): QueryAllCommentResponse;
};
export declare const QueryGetIssueRequest: {
    encode(message: QueryGetIssueRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetIssueRequest;
    fromJSON(object: any): QueryGetIssueRequest;
    toJSON(message: QueryGetIssueRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetIssueRequest>): QueryGetIssueRequest;
};
export declare const QueryGetIssueResponse: {
    encode(message: QueryGetIssueResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetIssueResponse;
    fromJSON(object: any): QueryGetIssueResponse;
    toJSON(message: QueryGetIssueResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetIssueResponse>): QueryGetIssueResponse;
};
export declare const QueryAllIssueRequest: {
    encode(message: QueryAllIssueRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllIssueRequest;
    fromJSON(object: any): QueryAllIssueRequest;
    toJSON(message: QueryAllIssueRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllIssueRequest>): QueryAllIssueRequest;
};
export declare const QueryAllIssueResponse: {
    encode(message: QueryAllIssueResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllIssueResponse;
    fromJSON(object: any): QueryAllIssueResponse;
    toJSON(message: QueryAllIssueResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllIssueResponse>): QueryAllIssueResponse;
};
export declare const QueryGetLatestRepositoryReleaseRequest: {
    encode(message: QueryGetLatestRepositoryReleaseRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetLatestRepositoryReleaseRequest;
    fromJSON(object: any): QueryGetLatestRepositoryReleaseRequest;
    toJSON(message: QueryGetLatestRepositoryReleaseRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetLatestRepositoryReleaseRequest>): QueryGetLatestRepositoryReleaseRequest;
};
export declare const QueryGetLatestRepositoryReleaseResponse: {
    encode(message: QueryGetLatestRepositoryReleaseResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetLatestRepositoryReleaseResponse;
    fromJSON(object: any): QueryGetLatestRepositoryReleaseResponse;
    toJSON(message: QueryGetLatestRepositoryReleaseResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetLatestRepositoryReleaseResponse>): QueryGetLatestRepositoryReleaseResponse;
};
export declare const QueryGetRepositoryReleaseRequest: {
    encode(message: QueryGetRepositoryReleaseRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetRepositoryReleaseRequest;
    fromJSON(object: any): QueryGetRepositoryReleaseRequest;
    toJSON(message: QueryGetRepositoryReleaseRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetRepositoryReleaseRequest>): QueryGetRepositoryReleaseRequest;
};
export declare const QueryGetRepositoryReleaseResponse: {
    encode(message: QueryGetRepositoryReleaseResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetRepositoryReleaseResponse;
    fromJSON(object: any): QueryGetRepositoryReleaseResponse;
    toJSON(message: QueryGetRepositoryReleaseResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetRepositoryReleaseResponse>): QueryGetRepositoryReleaseResponse;
};
export declare const QueryAllRepositoryReleaseRequest: {
    encode(message: QueryAllRepositoryReleaseRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllRepositoryReleaseRequest;
    fromJSON(object: any): QueryAllRepositoryReleaseRequest;
    toJSON(message: QueryAllRepositoryReleaseRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllRepositoryReleaseRequest>): QueryAllRepositoryReleaseRequest;
};
export declare const QueryAllRepositoryReleaseResponse: {
    encode(message: QueryAllRepositoryReleaseResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllRepositoryReleaseResponse;
    fromJSON(object: any): QueryAllRepositoryReleaseResponse;
    toJSON(message: QueryAllRepositoryReleaseResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllRepositoryReleaseResponse>): QueryAllRepositoryReleaseResponse;
};
export declare const QueryGetRepositoryIssueRequest: {
    encode(message: QueryGetRepositoryIssueRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetRepositoryIssueRequest;
    fromJSON(object: any): QueryGetRepositoryIssueRequest;
    toJSON(message: QueryGetRepositoryIssueRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetRepositoryIssueRequest>): QueryGetRepositoryIssueRequest;
};
export declare const QueryGetRepositoryIssueResponse: {
    encode(message: QueryGetRepositoryIssueResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetRepositoryIssueResponse;
    fromJSON(object: any): QueryGetRepositoryIssueResponse;
    toJSON(message: QueryGetRepositoryIssueResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetRepositoryIssueResponse>): QueryGetRepositoryIssueResponse;
};
export declare const QueryGetRepositoryPullRequestRequest: {
    encode(message: QueryGetRepositoryPullRequestRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetRepositoryPullRequestRequest;
    fromJSON(object: any): QueryGetRepositoryPullRequestRequest;
    toJSON(message: QueryGetRepositoryPullRequestRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetRepositoryPullRequestRequest>): QueryGetRepositoryPullRequestRequest;
};
export declare const QueryGetRepositoryPullRequestResponse: {
    encode(message: QueryGetRepositoryPullRequestResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetRepositoryPullRequestResponse;
    fromJSON(object: any): QueryGetRepositoryPullRequestResponse;
    toJSON(message: QueryGetRepositoryPullRequestResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetRepositoryPullRequestResponse>): QueryGetRepositoryPullRequestResponse;
};
export declare const QueryAllRepositoryIssueRequest: {
    encode(message: QueryAllRepositoryIssueRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllRepositoryIssueRequest;
    fromJSON(object: any): QueryAllRepositoryIssueRequest;
    toJSON(message: QueryAllRepositoryIssueRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllRepositoryIssueRequest>): QueryAllRepositoryIssueRequest;
};
export declare const IssueOptions: {
    encode(message: IssueOptions, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): IssueOptions;
    fromJSON(object: any): IssueOptions;
    toJSON(message: IssueOptions): unknown;
    fromPartial(object: DeepPartial<IssueOptions>): IssueOptions;
};
export declare const QueryAllRepositoryIssueResponse: {
    encode(message: QueryAllRepositoryIssueResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllRepositoryIssueResponse;
    fromJSON(object: any): QueryAllRepositoryIssueResponse;
    toJSON(message: QueryAllRepositoryIssueResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllRepositoryIssueResponse>): QueryAllRepositoryIssueResponse;
};
export declare const QueryAllRepositoryPullRequestRequest: {
    encode(message: QueryAllRepositoryPullRequestRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllRepositoryPullRequestRequest;
    fromJSON(object: any): QueryAllRepositoryPullRequestRequest;
    toJSON(message: QueryAllRepositoryPullRequestRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllRepositoryPullRequestRequest>): QueryAllRepositoryPullRequestRequest;
};
export declare const PullRequestOptions: {
    encode(message: PullRequestOptions, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): PullRequestOptions;
    fromJSON(object: any): PullRequestOptions;
    toJSON(message: PullRequestOptions): unknown;
    fromPartial(object: DeepPartial<PullRequestOptions>): PullRequestOptions;
};
export declare const QueryAllRepositoryPullRequestResponse: {
    encode(message: QueryAllRepositoryPullRequestResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllRepositoryPullRequestResponse;
    fromJSON(object: any): QueryAllRepositoryPullRequestResponse;
    toJSON(message: QueryAllRepositoryPullRequestResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllRepositoryPullRequestResponse>): QueryAllRepositoryPullRequestResponse;
};
export declare const QueryGetRepositoryRequest: {
    encode(message: QueryGetRepositoryRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetRepositoryRequest;
    fromJSON(object: any): QueryGetRepositoryRequest;
    toJSON(message: QueryGetRepositoryRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetRepositoryRequest>): QueryGetRepositoryRequest;
};
export declare const QueryGetRepositoryResponse: {
    encode(message: QueryGetRepositoryResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetRepositoryResponse;
    fromJSON(object: any): QueryGetRepositoryResponse;
    toJSON(message: QueryGetRepositoryResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetRepositoryResponse>): QueryGetRepositoryResponse;
};
export declare const RepositoryFork: {
    encode(message: RepositoryFork, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): RepositoryFork;
    fromJSON(object: any): RepositoryFork;
    toJSON(message: RepositoryFork): unknown;
    fromPartial(object: DeepPartial<RepositoryFork>): RepositoryFork;
};
export declare const QueryGetAllForkRequest: {
    encode(message: QueryGetAllForkRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetAllForkRequest;
    fromJSON(object: any): QueryGetAllForkRequest;
    toJSON(message: QueryGetAllForkRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetAllForkRequest>): QueryGetAllForkRequest;
};
export declare const QueryGetAllForkResponse: {
    encode(message: QueryGetAllForkResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetAllForkResponse;
    fromJSON(object: any): QueryGetAllForkResponse;
    toJSON(message: QueryGetAllForkResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetAllForkResponse>): QueryGetAllForkResponse;
};
export declare const QueryAllRepositoryRequest: {
    encode(message: QueryAllRepositoryRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllRepositoryRequest;
    fromJSON(object: any): QueryAllRepositoryRequest;
    toJSON(message: QueryAllRepositoryRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllRepositoryRequest>): QueryAllRepositoryRequest;
};
export declare const QueryAllRepositoryResponse: {
    encode(message: QueryAllRepositoryResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllRepositoryResponse;
    fromJSON(object: any): QueryAllRepositoryResponse;
    toJSON(message: QueryAllRepositoryResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllRepositoryResponse>): QueryAllRepositoryResponse;
};
export declare const QueryGetUserRequest: {
    encode(message: QueryGetUserRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetUserRequest;
    fromJSON(object: any): QueryGetUserRequest;
    toJSON(message: QueryGetUserRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetUserRequest>): QueryGetUserRequest;
};
export declare const QueryGetUserResponse: {
    encode(message: QueryGetUserResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetUserResponse;
    fromJSON(object: any): QueryGetUserResponse;
    toJSON(message: QueryGetUserResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetUserResponse>): QueryGetUserResponse;
};
export declare const QueryAllUserDaoRequest: {
    encode(message: QueryAllUserDaoRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllUserDaoRequest;
    fromJSON(object: any): QueryAllUserDaoRequest;
    toJSON(message: QueryAllUserDaoRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllUserDaoRequest>): QueryAllUserDaoRequest;
};
export declare const QueryAllUserDaoResponse: {
    encode(message: QueryAllUserDaoResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllUserDaoResponse;
    fromJSON(object: any): QueryAllUserDaoResponse;
    toJSON(message: QueryAllUserDaoResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllUserDaoResponse>): QueryAllUserDaoResponse;
};
export declare const QueryAllUserRequest: {
    encode(message: QueryAllUserRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllUserRequest;
    fromJSON(object: any): QueryAllUserRequest;
    toJSON(message: QueryAllUserRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllUserRequest>): QueryAllUserRequest;
};
export declare const QueryAllUserResponse: {
    encode(message: QueryAllUserResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllUserResponse;
    fromJSON(object: any): QueryAllUserResponse;
    toJSON(message: QueryAllUserResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllUserResponse>): QueryAllUserResponse;
};
export declare const QueryAllAnyRepositoryRequest: {
    encode(message: QueryAllAnyRepositoryRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllAnyRepositoryRequest;
    fromJSON(object: any): QueryAllAnyRepositoryRequest;
    toJSON(message: QueryAllAnyRepositoryRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllAnyRepositoryRequest>): QueryAllAnyRepositoryRequest;
};
export declare const QueryAllAnyRepositoryResponse: {
    encode(message: QueryAllAnyRepositoryResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllAnyRepositoryResponse;
    fromJSON(object: any): QueryAllAnyRepositoryResponse;
    toJSON(message: QueryAllAnyRepositoryResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllAnyRepositoryResponse>): QueryAllAnyRepositoryResponse;
};
export declare const QueryGetAnyRepositoryRequest: {
    encode(message: QueryGetAnyRepositoryRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetAnyRepositoryRequest;
    fromJSON(object: any): QueryGetAnyRepositoryRequest;
    toJSON(message: QueryGetAnyRepositoryRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetAnyRepositoryRequest>): QueryGetAnyRepositoryRequest;
};
export declare const QueryGetAnyRepositoryResponse: {
    encode(message: QueryGetAnyRepositoryResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetAnyRepositoryResponse;
    fromJSON(object: any): QueryGetAnyRepositoryResponse;
    toJSON(message: QueryGetAnyRepositoryResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetAnyRepositoryResponse>): QueryGetAnyRepositoryResponse;
};
export declare const QueryGetWhoisRequest: {
    encode(message: QueryGetWhoisRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetWhoisRequest;
    fromJSON(object: any): QueryGetWhoisRequest;
    toJSON(message: QueryGetWhoisRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetWhoisRequest>): QueryGetWhoisRequest;
};
export declare const QueryGetWhoisResponse: {
    encode(message: QueryGetWhoisResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetWhoisResponse;
    fromJSON(object: any): QueryGetWhoisResponse;
    toJSON(message: QueryGetWhoisResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetWhoisResponse>): QueryGetWhoisResponse;
};
export declare const QueryAllWhoisRequest: {
    encode(message: QueryAllWhoisRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllWhoisRequest;
    fromJSON(object: any): QueryAllWhoisRequest;
    toJSON(message: QueryAllWhoisRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllWhoisRequest>): QueryAllWhoisRequest;
};
export declare const QueryAllWhoisResponse: {
    encode(message: QueryAllWhoisResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllWhoisResponse;
    fromJSON(object: any): QueryAllWhoisResponse;
    toJSON(message: QueryAllWhoisResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllWhoisResponse>): QueryAllWhoisResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** Queries a Task by id. */
    Task(request: QueryGetTaskRequest): Promise<QueryGetTaskResponse>;
    /** Queries a list of Task items. */
    TaskAll(request: QueryAllTaskRequest): Promise<QueryAllTaskResponse>;
    /** Queries a list of Branch items. */
    BranchAll(request: QueryAllBranchRequest): Promise<QueryAllBranchResponse>;
    /** Queries Repository Branch by name. */
    RepositoryBranch(request: QueryGetRepositoryBranchRequest): Promise<QueryGetRepositoryBranchResponse>;
    RepositoryBranchSha(request: QueryGetRepositoryBranchShaRequest): Promise<QueryGetRepositoryBranchShaResponse>;
    /** Queries a list of Repository Branch. */
    RepositoryBranchAll(request: QueryAllRepositoryBranchRequest): Promise<QueryAllRepositoryBranchResponse>;
    /** Queries a list of Tag items. */
    TagAll(request: QueryAllTagRequest): Promise<QueryAllTagResponse>;
    /** Queries a Repository Tag by id. */
    RepositoryTag(request: QueryGetRepositoryTagRequest): Promise<QueryGetRepositoryTagResponse>;
    RepositoryTagSha(request: QueryGetRepositoryTagShaRequest): Promise<QueryGetRepositoryTagShaResponse>;
    /** Queries a list of Repository Tag. */
    RepositoryTagAll(request: QueryAllRepositoryTagRequest): Promise<QueryAllRepositoryTagResponse>;
    /** Queries a Member by id. */
    DaoMember(request: QueryGetDaoMemberRequest): Promise<QueryGetDaoMemberResponse>;
    /** Queries a list of Dao Member. */
    DaoMemberAll(request: QueryAllDaoMemberRequest): Promise<QueryAllDaoMemberResponse>;
    /** Queries a list of Member items. */
    MemberAll(request: QueryAllMemberRequest): Promise<QueryAllMemberResponse>;
    /** Queries a StorageProvider by id. */
    StorageProvider(request: QueryGetStorageProviderRequest): Promise<QueryGetStorageProviderResponse>;
    /** Queries a list of StorageProvider items. */
    StorageProviderAll(request: QueryAllStorageProviderRequest): Promise<QueryAllStorageProviderResponse>;
    /** Queries a release by id. */
    Release(request: QueryGetReleaseRequest): Promise<QueryGetReleaseResponse>;
    /** Queries a list of release items. */
    ReleaseAll(request: QueryAllReleaseRequest): Promise<QueryAllReleaseResponse>;
    /** Queries a pullRequest by id. */
    PullRequest(request: QueryGetPullRequestRequest): Promise<QueryGetPullRequestResponse>;
    /** Queries a list of pullRequest items. */
    PullRequestAll(request: QueryAllPullRequestRequest): Promise<QueryAllPullRequestResponse>;
    /** Queries a Dao by id. */
    Dao(request: QueryGetDaoRequest): Promise<QueryGetDaoResponse>;
    /** Queries a list of Dao items. */
    DaoAll(request: QueryAllDaoRequest): Promise<QueryAllDaoResponse>;
    /** Queries a Dao by legacy address */
    LegacyDao(request: QueryGetLegacyDaoRequest): Promise<QueryGetLegacyDaoResponse>;
    /** Queries a comment by id. */
    Comment(request: QueryGetCommentRequest): Promise<QueryGetCommentResponse>;
    /** Queries a list of comment items. */
    CommentAll(request: QueryAllCommentRequest): Promise<QueryAllCommentResponse>;
    /** Queries a issue by id. */
    Issue(request: QueryGetIssueRequest): Promise<QueryGetIssueResponse>;
    /** Queries a list of issue items. */
    IssueAll(request: QueryAllIssueRequest): Promise<QueryAllIssueResponse>;
    RepositoryReleaseLatest(request: QueryGetLatestRepositoryReleaseRequest): Promise<QueryGetLatestRepositoryReleaseResponse>;
    RepositoryRelease(request: QueryGetRepositoryReleaseRequest): Promise<QueryGetRepositoryReleaseResponse>;
    RepositoryReleaseAll(request: QueryAllRepositoryReleaseRequest): Promise<QueryAllRepositoryReleaseResponse>;
    /** Queries a repository by id. */
    RepositoryIssue(request: QueryGetRepositoryIssueRequest): Promise<QueryGetRepositoryIssueResponse>;
    /** Queries a list of repository items. */
    RepositoryIssueAll(request: QueryAllRepositoryIssueRequest): Promise<QueryAllRepositoryIssueResponse>;
    /** Queries a repository pullRequest by id. */
    RepositoryPullRequest(request: QueryGetRepositoryPullRequestRequest): Promise<QueryGetRepositoryPullRequestResponse>;
    RepositoryPullRequestAll(request: QueryAllRepositoryPullRequestRequest): Promise<QueryAllRepositoryPullRequestResponse>;
    /** Queries a repository by id. */
    Repository(request: QueryGetRepositoryRequest): Promise<QueryGetRepositoryResponse>;
    /** Queries a list of repository items. */
    RepositoryAll(request: QueryAllRepositoryRequest): Promise<QueryAllRepositoryResponse>;
    /** Queries a repository forks by id. */
    ForkAll(request: QueryGetAllForkRequest): Promise<QueryGetAllForkResponse>;
    /** Queries a user by id. */
    User(request: QueryGetUserRequest): Promise<QueryGetUserResponse>;
    /** Queries a list of User Dao. */
    UserDaoAll(request: QueryAllUserDaoRequest): Promise<QueryAllUserDaoResponse>;
    /** Queries a list of user items. */
    UserAll(request: QueryAllUserRequest): Promise<QueryAllUserResponse>;
    /** Queries a list of user repositories. */
    AnyRepositoryAll(request: QueryAllAnyRepositoryRequest): Promise<QueryAllAnyRepositoryResponse>;
    /** Queries a repository by user id and repository name */
    AnyRepository(request: QueryGetAnyRepositoryRequest): Promise<QueryGetAnyRepositoryResponse>;
    /** Queries a whois by id. */
    Whois(request: QueryGetWhoisRequest): Promise<QueryGetWhoisResponse>;
    /** Queries a list of whois items. */
    WhoisAll(request: QueryAllWhoisRequest): Promise<QueryAllWhoisResponse>;
    PullRequestMergePermission(request: QueryGetPullRequestMergePermissionRequest): Promise<QueryGetPullRequestMergePermissionResponse>;
    CheckGitServerAuthorization(request: QueryCheckGitServerAuthorizationRequest): Promise<QueryCheckGitServerAuthorizationResponse>;
    CheckStorageProviderAuthorization(request: QueryCheckStorageProviderAuthorizationRequest): Promise<QueryCheckStorageProviderAuthorizationResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    Task(request: QueryGetTaskRequest): Promise<QueryGetTaskResponse>;
    TaskAll(request: QueryAllTaskRequest): Promise<QueryAllTaskResponse>;
    BranchAll(request: QueryAllBranchRequest): Promise<QueryAllBranchResponse>;
    RepositoryBranch(request: QueryGetRepositoryBranchRequest): Promise<QueryGetRepositoryBranchResponse>;
    RepositoryBranchSha(request: QueryGetRepositoryBranchShaRequest): Promise<QueryGetRepositoryBranchShaResponse>;
    RepositoryBranchAll(request: QueryAllRepositoryBranchRequest): Promise<QueryAllRepositoryBranchResponse>;
    TagAll(request: QueryAllTagRequest): Promise<QueryAllTagResponse>;
    RepositoryTag(request: QueryGetRepositoryTagRequest): Promise<QueryGetRepositoryTagResponse>;
    RepositoryTagSha(request: QueryGetRepositoryTagShaRequest): Promise<QueryGetRepositoryTagShaResponse>;
    RepositoryTagAll(request: QueryAllRepositoryTagRequest): Promise<QueryAllRepositoryTagResponse>;
    DaoMember(request: QueryGetDaoMemberRequest): Promise<QueryGetDaoMemberResponse>;
    DaoMemberAll(request: QueryAllDaoMemberRequest): Promise<QueryAllDaoMemberResponse>;
    MemberAll(request: QueryAllMemberRequest): Promise<QueryAllMemberResponse>;
    StorageProvider(request: QueryGetStorageProviderRequest): Promise<QueryGetStorageProviderResponse>;
    StorageProviderAll(request: QueryAllStorageProviderRequest): Promise<QueryAllStorageProviderResponse>;
    Release(request: QueryGetReleaseRequest): Promise<QueryGetReleaseResponse>;
    ReleaseAll(request: QueryAllReleaseRequest): Promise<QueryAllReleaseResponse>;
    PullRequest(request: QueryGetPullRequestRequest): Promise<QueryGetPullRequestResponse>;
    PullRequestAll(request: QueryAllPullRequestRequest): Promise<QueryAllPullRequestResponse>;
    Dao(request: QueryGetDaoRequest): Promise<QueryGetDaoResponse>;
    DaoAll(request: QueryAllDaoRequest): Promise<QueryAllDaoResponse>;
    LegacyDao(request: QueryGetLegacyDaoRequest): Promise<QueryGetLegacyDaoResponse>;
    Comment(request: QueryGetCommentRequest): Promise<QueryGetCommentResponse>;
    CommentAll(request: QueryAllCommentRequest): Promise<QueryAllCommentResponse>;
    Issue(request: QueryGetIssueRequest): Promise<QueryGetIssueResponse>;
    IssueAll(request: QueryAllIssueRequest): Promise<QueryAllIssueResponse>;
    RepositoryReleaseLatest(request: QueryGetLatestRepositoryReleaseRequest): Promise<QueryGetLatestRepositoryReleaseResponse>;
    RepositoryRelease(request: QueryGetRepositoryReleaseRequest): Promise<QueryGetRepositoryReleaseResponse>;
    RepositoryReleaseAll(request: QueryAllRepositoryReleaseRequest): Promise<QueryAllRepositoryReleaseResponse>;
    RepositoryIssue(request: QueryGetRepositoryIssueRequest): Promise<QueryGetRepositoryIssueResponse>;
    RepositoryIssueAll(request: QueryAllRepositoryIssueRequest): Promise<QueryAllRepositoryIssueResponse>;
    RepositoryPullRequest(request: QueryGetRepositoryPullRequestRequest): Promise<QueryGetRepositoryPullRequestResponse>;
    RepositoryPullRequestAll(request: QueryAllRepositoryPullRequestRequest): Promise<QueryAllRepositoryPullRequestResponse>;
    Repository(request: QueryGetRepositoryRequest): Promise<QueryGetRepositoryResponse>;
    RepositoryAll(request: QueryAllRepositoryRequest): Promise<QueryAllRepositoryResponse>;
    ForkAll(request: QueryGetAllForkRequest): Promise<QueryGetAllForkResponse>;
    User(request: QueryGetUserRequest): Promise<QueryGetUserResponse>;
    UserDaoAll(request: QueryAllUserDaoRequest): Promise<QueryAllUserDaoResponse>;
    UserAll(request: QueryAllUserRequest): Promise<QueryAllUserResponse>;
    AnyRepositoryAll(request: QueryAllAnyRepositoryRequest): Promise<QueryAllAnyRepositoryResponse>;
    AnyRepository(request: QueryGetAnyRepositoryRequest): Promise<QueryGetAnyRepositoryResponse>;
    Whois(request: QueryGetWhoisRequest): Promise<QueryGetWhoisResponse>;
    WhoisAll(request: QueryAllWhoisRequest): Promise<QueryAllWhoisResponse>;
    PullRequestMergePermission(request: QueryGetPullRequestMergePermissionRequest): Promise<QueryGetPullRequestMergePermissionResponse>;
    CheckGitServerAuthorization(request: QueryCheckGitServerAuthorizationRequest): Promise<QueryCheckGitServerAuthorizationResponse>;
    CheckStorageProviderAuthorization(request: QueryCheckStorageProviderAuthorizationRequest): Promise<QueryCheckStorageProviderAuthorizationResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
