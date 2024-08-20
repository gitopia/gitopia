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

/**
 * Params defines the parameters for the module.
 */
export interface GitopiarewardsParams {
  evaluator_address?: string;
  reward_series?: RewardsRewardPool[];
}

export interface GitopiarewardsReward {
  recipient?: string;
  rewards?: RewardsRecipientReward[];
}

export interface ProtobufAny {
  "@type"?: string;
}

export interface RewardsClaimResponseReward {
  series?: RewardsSeries;

  /**
   * Coin defines a token with a denomination and an amount.
   *
   * NOTE: The amount field is an Int which implements the custom method
   * signatures required by gogoproto.
   */
  amount?: V1Beta1Coin;
}

export interface RewardsMsgClaimResponse {
  claimed_rewards?: RewardsClaimResponseReward[];
  expired_rewards?: RewardsClaimResponseReward[];
  all_claimed_rewards?: RewardsClaimResponseReward[];
}

export interface RewardsMsgCreateRewardResponse {
  /**
   * actual granted amount
   * Coin defines a token with a denomination and an amount.
   *
   * NOTE: The amount field is an Int which implements the custom method
   * signatures required by gogoproto.
   */
  amount?: V1Beta1Coin;
}

export type RewardsMsgUpdateParamsResponse = object;

export interface RewardsQueryAllRewardsResponse {
  rewards?: GitopiarewardsReward[];

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

export interface RewardsQueryGetRewardResponse {
  recipient?: string;
  rewards?: RewardsQueryGetRewardResponseReward[];
}

export interface RewardsQueryGetRewardResponseReward {
  creator?: string;
  series?: RewardsSeries;

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
  claimed_amount?: V1Beta1Coin;

  /**
   * Coin defines a token with a denomination and an amount.
   *
   * NOTE: The amount field is an Int which implements the custom method
   * signatures required by gogoproto.
   */
  claimable_amount?: V1Beta1Coin;

  /**
   * Coin defines a token with a denomination and an amount.
   *
   * NOTE: The amount field is an Int which implements the custom method
   * signatures required by gogoproto.
   */
  remaining_claimable_amount?: V1Beta1Coin;
}

/**
 * QueryParamsResponse is the response type for the Query/Params RPC method.
 */
export interface RewardsQueryParamsResponse {
  /** params defines the parameters of the module. */
  params?: GitopiarewardsParams;
}

export interface RewardsQueryTasksResponse {
  tasks?: RewardsTask[];
}

export interface RewardsRecipientReward {
  series?: RewardsSeries;

  /**
   * Coin defines a token with a denomination and an amount.
   *
   * NOTE: The amount field is an Int which implements the custom method
   * signatures required by gogoproto.
   */
  amount?: V1Beta1Coin;
  creator?: string;

  /**
   * Coin defines a token with a denomination and an amount.
   *
   * NOTE: The amount field is an Int which implements the custom method
   * signatures required by gogoproto.
   */
  claimed_amount?: V1Beta1Coin;

  /**
   * Coin defines a token with a denomination and an amount.
   *
   * NOTE: The amount field is an Int which implements the custom method
   * signatures required by gogoproto.
   */
  claimed_amount_with_decay?: V1Beta1Coin;
}

export interface RewardsRewardPool {
  /**
   * Coin defines a token with a denomination and an amount.
   *
   * NOTE: The amount field is an Int which implements the custom method
   * signatures required by gogoproto.
   */
  total_amount?: V1Beta1Coin;

  /**
   * Coin defines a token with a denomination and an amount.
   *
   * NOTE: The amount field is an Int which implements the custom method
   * signatures required by gogoproto.
   */
  claimed_amount?: V1Beta1Coin;

  /** @format date-time */
  start_time?: string;

  /** @format date-time */
  end_time?: string;
  series?: RewardsSeries;
}

export enum RewardsSeries {
  NONE = "NONE",
  ONE = "ONE",
  TWO = "TWO",
  THREE = "THREE",
  FOUR = "FOUR",
  FIVE = "FIVE",
  SIX = "SIX",
  SEVEN = "SEVEN",
  COSMOS = "COSMOS",
}

export interface RewardsTask {
  type?: RewardstaskType;
  isComplete?: boolean;

  /** @format int32 */
  weight?: number;
}

export enum RewardstaskType {
  UNKNOWN = "UNKNOWN",
  CREATE_USER = "CREATE_USER",
  CREATE_NON_EMPTY_REPO = "CREATE_NON_EMPTY_REPO",
  CREATE_ISSUE = "CREATE_ISSUE",
  CREATE_ISSUE_WITH_BOUNTY = "CREATE_ISSUE_WITH_BOUNTY",
  CREATE_ISSUE_WITH_BOUNTY_VERIFIED = "CREATE_ISSUE_WITH_BOUNTY_VERIFIED",
  PR_TO_REPO_MERGED = "PR_TO_REPO_MERGED",
  PR_TO_VERIFIED_REPO_MERGED = "PR_TO_VERIFIED_REPO_MERGED",
  PR_TO_VERIFIED_REPO_MERGED_WITH_BOUNTY = "PR_TO_VERIFIED_REPO_MERGED_WITH_BOUNTY",
  LORE_STAKED = "LORE_STAKED",
  VOTE_PROPOSAL = "VOTE_PROPOSAL",
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
 * @title gitopia/gitopia/rewards/genesis.proto
 * @version version not set
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Query
   * @name QueryParams
   * @summary Params returns the total set of rewards parameters.
   * @request GET:/gitopia/gitopia/rewards/params
   */
  queryParams = (params: RequestParams = {}) =>
    this.request<RewardsQueryParamsResponse, RpcStatus>({
      path: `/gitopia/gitopia/rewards/params`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryRewardsAll
   * @summary Queries a list of Rewards items.
   * @request GET:/gitopia/gitopia/rewards/rewards
   */
  queryRewardsAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<RewardsQueryAllRewardsResponse, RpcStatus>({
      path: `/gitopia/gitopia/rewards/rewards`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryReward
   * @summary Queries a Rewards by index.
   * @request GET:/gitopia/gitopia/rewards/rewards/{recipient}
   */
  queryReward = (recipient: string, params: RequestParams = {}) =>
    this.request<RewardsQueryGetRewardResponse, RpcStatus>({
      path: `/gitopia/gitopia/rewards/rewards/${recipient}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryTasks
   * @summary Queries a list of tasks items.
   * @request GET:/gitopia/gitopia/rewards/tasks/{address}
   */
  queryTasks = (address: string, params: RequestParams = {}) =>
    this.request<RewardsQueryTasksResponse, RpcStatus>({
      path: `/gitopia/gitopia/rewards/tasks/${address}`,
      method: "GET",
      format: "json",
      ...params,
    });
}
