import { Reader, Writer } from "protobufjs/minimal";
import { PullRequest } from "../gitopia/pullRequest";
import { PageRequest, PageResponse } from "../cosmos/base/query/v1beta1/pagination";
import { Organization } from "../gitopia/organization";
import { Comment } from "../gitopia/comment";
import { Issue } from "../gitopia/issue";
import { Repository, RepositoryBranch } from "../gitopia/repository";
import { User } from "../gitopia/user";
import { Whois } from "../gitopia/whois";
export declare const protobufPackage = "gitopia.gitopia.gitopia";
/** this line is used by starport scaffolding # 3 */
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
export interface QueryGetOrganizationRequest {
    id: number;
}
export interface QueryGetOrganizationResponse {
    Organization: Organization | undefined;
}
export interface QueryGetOrganizationByNameRequest {
    organizationName: string;
}
export interface QueryGetOrganizationByNameResponse {
    Organization: Organization | undefined;
}
export interface QueryAllOrganizationRequest {
    pagination: PageRequest | undefined;
}
export interface QueryAllOrganizationResponse {
    Organization: Organization[];
    pagination: PageResponse | undefined;
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
export interface QueryGetRepositoryIssueRequest {
    userId: string;
    repositoryName: string;
    issueIid: number;
}
export interface QueryGetRepositoryIssueResponse {
    Issue: Issue | undefined;
}
export interface QueryGetRepositoryPullRequestRequest {
    userId: string;
    repositoryName: string;
    pullIid: number;
}
export interface QueryGetRepositoryPullRequestResponse {
    PullRequest: PullRequest | undefined;
}
export interface QueryAllRepositoryIssueRequest {
    userId: string;
    repositoryName: string;
    pagination: PageRequest | undefined;
}
export interface QueryAllRepositoryIssueResponse {
    Issue: Issue[];
    pagination: PageResponse | undefined;
}
export interface QueryAllRepositoryPullRequestRequest {
    userId: string;
    repositoryName: string;
    pagination: PageRequest | undefined;
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
export interface QueryGetAllBranchRequest {
    id: number;
}
export interface QueryGetAllBranchResponse {
    Branches: RepositoryBranch[];
}
export interface QueryGetBranchShaRequest {
    repositoryId: number;
    branchName: string;
}
export interface QueryGetBranchShaResponse {
    sha: string;
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
export interface QueryAllUserRequest {
    pagination: PageRequest | undefined;
}
export interface QueryAllUserResponse {
    User: User[];
    pagination: PageResponse | undefined;
}
export interface QueryAllUserRepositoryRequest {
    id: string;
}
export interface QueryAllUserRepositoryResponse {
    Repository: Repository[];
}
export interface QueryGetUserRepositoryRequest {
    userId: string;
    repositoryName: string;
}
export interface QueryGetUserRepositoryResponse {
    Repository: Repository | undefined;
}
export interface QueryAllUserOrganizationRequest {
    id: string;
}
export interface QueryAllUserOrganizationResponse {
    organization: Organization[];
}
export interface QueryAllOrganizationRepositoryRequest {
    organizationName: string;
    pagination: PageRequest | undefined;
}
export interface QueryAllOrganizationRepositoryResponse {
    Repository: Repository[];
    pagination: PageResponse | undefined;
}
export interface QueryGetOrganizationRepositoryRequest {
    organizationName: string;
    repositoryName: string;
}
export interface QueryGetOrganizationRepositoryResponse {
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
export declare const QueryGetOrganizationRequest: {
    encode(message: QueryGetOrganizationRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetOrganizationRequest;
    fromJSON(object: any): QueryGetOrganizationRequest;
    toJSON(message: QueryGetOrganizationRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetOrganizationRequest>): QueryGetOrganizationRequest;
};
export declare const QueryGetOrganizationResponse: {
    encode(message: QueryGetOrganizationResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetOrganizationResponse;
    fromJSON(object: any): QueryGetOrganizationResponse;
    toJSON(message: QueryGetOrganizationResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetOrganizationResponse>): QueryGetOrganizationResponse;
};
export declare const QueryGetOrganizationByNameRequest: {
    encode(message: QueryGetOrganizationByNameRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetOrganizationByNameRequest;
    fromJSON(object: any): QueryGetOrganizationByNameRequest;
    toJSON(message: QueryGetOrganizationByNameRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetOrganizationByNameRequest>): QueryGetOrganizationByNameRequest;
};
export declare const QueryGetOrganizationByNameResponse: {
    encode(message: QueryGetOrganizationByNameResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetOrganizationByNameResponse;
    fromJSON(object: any): QueryGetOrganizationByNameResponse;
    toJSON(message: QueryGetOrganizationByNameResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetOrganizationByNameResponse>): QueryGetOrganizationByNameResponse;
};
export declare const QueryAllOrganizationRequest: {
    encode(message: QueryAllOrganizationRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllOrganizationRequest;
    fromJSON(object: any): QueryAllOrganizationRequest;
    toJSON(message: QueryAllOrganizationRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllOrganizationRequest>): QueryAllOrganizationRequest;
};
export declare const QueryAllOrganizationResponse: {
    encode(message: QueryAllOrganizationResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllOrganizationResponse;
    fromJSON(object: any): QueryAllOrganizationResponse;
    toJSON(message: QueryAllOrganizationResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllOrganizationResponse>): QueryAllOrganizationResponse;
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
export declare const QueryGetAllBranchRequest: {
    encode(message: QueryGetAllBranchRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetAllBranchRequest;
    fromJSON(object: any): QueryGetAllBranchRequest;
    toJSON(message: QueryGetAllBranchRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetAllBranchRequest>): QueryGetAllBranchRequest;
};
export declare const QueryGetAllBranchResponse: {
    encode(message: QueryGetAllBranchResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetAllBranchResponse;
    fromJSON(object: any): QueryGetAllBranchResponse;
    toJSON(message: QueryGetAllBranchResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetAllBranchResponse>): QueryGetAllBranchResponse;
};
export declare const QueryGetBranchShaRequest: {
    encode(message: QueryGetBranchShaRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetBranchShaRequest;
    fromJSON(object: any): QueryGetBranchShaRequest;
    toJSON(message: QueryGetBranchShaRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetBranchShaRequest>): QueryGetBranchShaRequest;
};
export declare const QueryGetBranchShaResponse: {
    encode(message: QueryGetBranchShaResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetBranchShaResponse;
    fromJSON(object: any): QueryGetBranchShaResponse;
    toJSON(message: QueryGetBranchShaResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetBranchShaResponse>): QueryGetBranchShaResponse;
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
export declare const QueryAllUserRepositoryRequest: {
    encode(message: QueryAllUserRepositoryRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllUserRepositoryRequest;
    fromJSON(object: any): QueryAllUserRepositoryRequest;
    toJSON(message: QueryAllUserRepositoryRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllUserRepositoryRequest>): QueryAllUserRepositoryRequest;
};
export declare const QueryAllUserRepositoryResponse: {
    encode(message: QueryAllUserRepositoryResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllUserRepositoryResponse;
    fromJSON(object: any): QueryAllUserRepositoryResponse;
    toJSON(message: QueryAllUserRepositoryResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllUserRepositoryResponse>): QueryAllUserRepositoryResponse;
};
export declare const QueryGetUserRepositoryRequest: {
    encode(message: QueryGetUserRepositoryRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetUserRepositoryRequest;
    fromJSON(object: any): QueryGetUserRepositoryRequest;
    toJSON(message: QueryGetUserRepositoryRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetUserRepositoryRequest>): QueryGetUserRepositoryRequest;
};
export declare const QueryGetUserRepositoryResponse: {
    encode(message: QueryGetUserRepositoryResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetUserRepositoryResponse;
    fromJSON(object: any): QueryGetUserRepositoryResponse;
    toJSON(message: QueryGetUserRepositoryResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetUserRepositoryResponse>): QueryGetUserRepositoryResponse;
};
export declare const QueryAllUserOrganizationRequest: {
    encode(message: QueryAllUserOrganizationRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllUserOrganizationRequest;
    fromJSON(object: any): QueryAllUserOrganizationRequest;
    toJSON(message: QueryAllUserOrganizationRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllUserOrganizationRequest>): QueryAllUserOrganizationRequest;
};
export declare const QueryAllUserOrganizationResponse: {
    encode(message: QueryAllUserOrganizationResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllUserOrganizationResponse;
    fromJSON(object: any): QueryAllUserOrganizationResponse;
    toJSON(message: QueryAllUserOrganizationResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllUserOrganizationResponse>): QueryAllUserOrganizationResponse;
};
export declare const QueryAllOrganizationRepositoryRequest: {
    encode(message: QueryAllOrganizationRepositoryRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllOrganizationRepositoryRequest;
    fromJSON(object: any): QueryAllOrganizationRepositoryRequest;
    toJSON(message: QueryAllOrganizationRepositoryRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllOrganizationRepositoryRequest>): QueryAllOrganizationRepositoryRequest;
};
export declare const QueryAllOrganizationRepositoryResponse: {
    encode(message: QueryAllOrganizationRepositoryResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllOrganizationRepositoryResponse;
    fromJSON(object: any): QueryAllOrganizationRepositoryResponse;
    toJSON(message: QueryAllOrganizationRepositoryResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllOrganizationRepositoryResponse>): QueryAllOrganizationRepositoryResponse;
};
export declare const QueryGetOrganizationRepositoryRequest: {
    encode(message: QueryGetOrganizationRepositoryRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetOrganizationRepositoryRequest;
    fromJSON(object: any): QueryGetOrganizationRepositoryRequest;
    toJSON(message: QueryGetOrganizationRepositoryRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetOrganizationRepositoryRequest>): QueryGetOrganizationRepositoryRequest;
};
export declare const QueryGetOrganizationRepositoryResponse: {
    encode(message: QueryGetOrganizationRepositoryResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetOrganizationRepositoryResponse;
    fromJSON(object: any): QueryGetOrganizationRepositoryResponse;
    toJSON(message: QueryGetOrganizationRepositoryResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetOrganizationRepositoryResponse>): QueryGetOrganizationRepositoryResponse;
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
    /** Queries a pullRequest by id. */
    PullRequest(request: QueryGetPullRequestRequest): Promise<QueryGetPullRequestResponse>;
    /** Queries a list of pullRequest items. */
    PullRequestAll(request: QueryAllPullRequestRequest): Promise<QueryAllPullRequestResponse>;
    /** Queries a organization by id. */
    Organization(request: QueryGetOrganizationRequest): Promise<QueryGetOrganizationResponse>;
    /** Queries a organization by name. */
    OrganizationByName(request: QueryGetOrganizationByNameRequest): Promise<QueryGetOrganizationByNameResponse>;
    /** Queries a list of organization items. */
    OrganizationAll(request: QueryAllOrganizationRequest): Promise<QueryAllOrganizationResponse>;
    /** Queries a comment by id. */
    Comment(request: QueryGetCommentRequest): Promise<QueryGetCommentResponse>;
    /** Queries a list of comment items. */
    CommentAll(request: QueryAllCommentRequest): Promise<QueryAllCommentResponse>;
    /** Queries a issue by id. */
    Issue(request: QueryGetIssueRequest): Promise<QueryGetIssueResponse>;
    /** Queries a list of issue items. */
    IssueAll(request: QueryAllIssueRequest): Promise<QueryAllIssueResponse>;
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
    /** Queries a repository by id. */
    BranchAll(request: QueryGetAllBranchRequest): Promise<QueryGetAllBranchResponse>;
    BranchSha(request: QueryGetBranchShaRequest): Promise<QueryGetBranchShaResponse>;
    /** Queries a user by id. */
    User(request: QueryGetUserRequest): Promise<QueryGetUserResponse>;
    /** Queries a list of user items. */
    UserAll(request: QueryAllUserRequest): Promise<QueryAllUserResponse>;
    /** Queries a list of user repositories. */
    UserRepositoryAll(request: QueryAllUserRepositoryRequest): Promise<QueryAllUserRepositoryResponse>;
    /** Queries a repository by user id and repository name */
    UserRepository(request: QueryGetUserRepositoryRequest): Promise<QueryGetUserRepositoryResponse>;
    /** Queries a list of user Organizations. */
    UserOrganizationAll(request: QueryAllUserOrganizationRequest): Promise<QueryAllUserOrganizationResponse>;
    /** Queries a list of Organization repositories. */
    OrganizationRepositoryAll(request: QueryAllOrganizationRepositoryRequest): Promise<QueryAllOrganizationRepositoryResponse>;
    /** Queries a repository by Organization name and repository name */
    OrganizationRepository(request: QueryGetOrganizationRepositoryRequest): Promise<QueryGetOrganizationRepositoryResponse>;
    /** Queries a whois by id. */
    Whois(request: QueryGetWhoisRequest): Promise<QueryGetWhoisResponse>;
    /** Queries a list of whois items. */
    WhoisAll(request: QueryAllWhoisRequest): Promise<QueryAllWhoisResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    PullRequest(request: QueryGetPullRequestRequest): Promise<QueryGetPullRequestResponse>;
    PullRequestAll(request: QueryAllPullRequestRequest): Promise<QueryAllPullRequestResponse>;
    Organization(request: QueryGetOrganizationRequest): Promise<QueryGetOrganizationResponse>;
    OrganizationByName(request: QueryGetOrganizationByNameRequest): Promise<QueryGetOrganizationByNameResponse>;
    OrganizationAll(request: QueryAllOrganizationRequest): Promise<QueryAllOrganizationResponse>;
    Comment(request: QueryGetCommentRequest): Promise<QueryGetCommentResponse>;
    CommentAll(request: QueryAllCommentRequest): Promise<QueryAllCommentResponse>;
    Issue(request: QueryGetIssueRequest): Promise<QueryGetIssueResponse>;
    IssueAll(request: QueryAllIssueRequest): Promise<QueryAllIssueResponse>;
    RepositoryIssue(request: QueryGetRepositoryIssueRequest): Promise<QueryGetRepositoryIssueResponse>;
    RepositoryIssueAll(request: QueryAllRepositoryIssueRequest): Promise<QueryAllRepositoryIssueResponse>;
    RepositoryPullRequest(request: QueryGetRepositoryPullRequestRequest): Promise<QueryGetRepositoryPullRequestResponse>;
    RepositoryPullRequestAll(request: QueryAllRepositoryPullRequestRequest): Promise<QueryAllRepositoryPullRequestResponse>;
    Repository(request: QueryGetRepositoryRequest): Promise<QueryGetRepositoryResponse>;
    RepositoryAll(request: QueryAllRepositoryRequest): Promise<QueryAllRepositoryResponse>;
    BranchAll(request: QueryGetAllBranchRequest): Promise<QueryGetAllBranchResponse>;
    BranchSha(request: QueryGetBranchShaRequest): Promise<QueryGetBranchShaResponse>;
    User(request: QueryGetUserRequest): Promise<QueryGetUserResponse>;
    UserAll(request: QueryAllUserRequest): Promise<QueryAllUserResponse>;
    UserRepositoryAll(request: QueryAllUserRepositoryRequest): Promise<QueryAllUserRepositoryResponse>;
    UserRepository(request: QueryGetUserRepositoryRequest): Promise<QueryGetUserRepositoryResponse>;
    UserOrganizationAll(request: QueryAllUserOrganizationRequest): Promise<QueryAllUserOrganizationResponse>;
    OrganizationRepositoryAll(request: QueryAllOrganizationRepositoryRequest): Promise<QueryAllOrganizationRepositoryResponse>;
    OrganizationRepository(request: QueryGetOrganizationRepositoryRequest): Promise<QueryGetOrganizationRepositoryResponse>;
    Whois(request: QueryGetWhoisRequest): Promise<QueryGetWhoisResponse>;
    WhoisAll(request: QueryAllWhoisRequest): Promise<QueryAllWhoisResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
