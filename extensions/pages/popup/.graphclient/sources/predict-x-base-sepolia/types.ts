// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace PredictXBaseSepoliaTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  Int8: { input: any; output: any; }
  Timestamp: { input: any; output: any; }
};

export type Aggregation_interval =
  | 'hour'
  | 'day';

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type MarketAsserted = {
  id: Scalars['Bytes']['output'];
  marketId: Scalars['Bytes']['output'];
  assertedOutcome: Scalars['String']['output'];
  assertionId: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type MarketAsserted_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  marketId?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_not?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_gt?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_lt?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_gte?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_lte?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  marketId_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  marketId_contains?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  assertedOutcome?: InputMaybe<Scalars['String']['input']>;
  assertedOutcome_not?: InputMaybe<Scalars['String']['input']>;
  assertedOutcome_gt?: InputMaybe<Scalars['String']['input']>;
  assertedOutcome_lt?: InputMaybe<Scalars['String']['input']>;
  assertedOutcome_gte?: InputMaybe<Scalars['String']['input']>;
  assertedOutcome_lte?: InputMaybe<Scalars['String']['input']>;
  assertedOutcome_in?: InputMaybe<Array<Scalars['String']['input']>>;
  assertedOutcome_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  assertedOutcome_contains?: InputMaybe<Scalars['String']['input']>;
  assertedOutcome_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  assertedOutcome_not_contains?: InputMaybe<Scalars['String']['input']>;
  assertedOutcome_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  assertedOutcome_starts_with?: InputMaybe<Scalars['String']['input']>;
  assertedOutcome_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  assertedOutcome_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  assertedOutcome_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  assertedOutcome_ends_with?: InputMaybe<Scalars['String']['input']>;
  assertedOutcome_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  assertedOutcome_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  assertedOutcome_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  assertionId?: InputMaybe<Scalars['Bytes']['input']>;
  assertionId_not?: InputMaybe<Scalars['Bytes']['input']>;
  assertionId_gt?: InputMaybe<Scalars['Bytes']['input']>;
  assertionId_lt?: InputMaybe<Scalars['Bytes']['input']>;
  assertionId_gte?: InputMaybe<Scalars['Bytes']['input']>;
  assertionId_lte?: InputMaybe<Scalars['Bytes']['input']>;
  assertionId_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  assertionId_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  assertionId_contains?: InputMaybe<Scalars['Bytes']['input']>;
  assertionId_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MarketAsserted_filter>>>;
  or?: InputMaybe<Array<InputMaybe<MarketAsserted_filter>>>;
};

export type MarketAsserted_orderBy =
  | 'id'
  | 'marketId'
  | 'assertedOutcome'
  | 'assertionId'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type MarketInitialized = {
  id: Scalars['Bytes']['output'];
  marketId: Scalars['Bytes']['output'];
  outcome1: Scalars['String']['output'];
  outcome2: Scalars['String']['output'];
  description: Scalars['String']['output'];
  outcome1Token: Scalars['Bytes']['output'];
  outcome2Token: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type MarketInitialized_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  marketId?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_not?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_gt?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_lt?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_gte?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_lte?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  marketId_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  marketId_contains?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  outcome1?: InputMaybe<Scalars['String']['input']>;
  outcome1_not?: InputMaybe<Scalars['String']['input']>;
  outcome1_gt?: InputMaybe<Scalars['String']['input']>;
  outcome1_lt?: InputMaybe<Scalars['String']['input']>;
  outcome1_gte?: InputMaybe<Scalars['String']['input']>;
  outcome1_lte?: InputMaybe<Scalars['String']['input']>;
  outcome1_in?: InputMaybe<Array<Scalars['String']['input']>>;
  outcome1_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  outcome1_contains?: InputMaybe<Scalars['String']['input']>;
  outcome1_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  outcome1_not_contains?: InputMaybe<Scalars['String']['input']>;
  outcome1_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  outcome1_starts_with?: InputMaybe<Scalars['String']['input']>;
  outcome1_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  outcome1_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  outcome1_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  outcome1_ends_with?: InputMaybe<Scalars['String']['input']>;
  outcome1_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  outcome1_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  outcome1_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  outcome2?: InputMaybe<Scalars['String']['input']>;
  outcome2_not?: InputMaybe<Scalars['String']['input']>;
  outcome2_gt?: InputMaybe<Scalars['String']['input']>;
  outcome2_lt?: InputMaybe<Scalars['String']['input']>;
  outcome2_gte?: InputMaybe<Scalars['String']['input']>;
  outcome2_lte?: InputMaybe<Scalars['String']['input']>;
  outcome2_in?: InputMaybe<Array<Scalars['String']['input']>>;
  outcome2_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  outcome2_contains?: InputMaybe<Scalars['String']['input']>;
  outcome2_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  outcome2_not_contains?: InputMaybe<Scalars['String']['input']>;
  outcome2_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  outcome2_starts_with?: InputMaybe<Scalars['String']['input']>;
  outcome2_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  outcome2_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  outcome2_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  outcome2_ends_with?: InputMaybe<Scalars['String']['input']>;
  outcome2_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  outcome2_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  outcome2_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_gt?: InputMaybe<Scalars['String']['input']>;
  description_lt?: InputMaybe<Scalars['String']['input']>;
  description_gte?: InputMaybe<Scalars['String']['input']>;
  description_lte?: InputMaybe<Scalars['String']['input']>;
  description_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  description_starts_with?: InputMaybe<Scalars['String']['input']>;
  description_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_ends_with?: InputMaybe<Scalars['String']['input']>;
  description_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  outcome1Token?: InputMaybe<Scalars['Bytes']['input']>;
  outcome1Token_not?: InputMaybe<Scalars['Bytes']['input']>;
  outcome1Token_gt?: InputMaybe<Scalars['Bytes']['input']>;
  outcome1Token_lt?: InputMaybe<Scalars['Bytes']['input']>;
  outcome1Token_gte?: InputMaybe<Scalars['Bytes']['input']>;
  outcome1Token_lte?: InputMaybe<Scalars['Bytes']['input']>;
  outcome1Token_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  outcome1Token_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  outcome1Token_contains?: InputMaybe<Scalars['Bytes']['input']>;
  outcome1Token_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  outcome2Token?: InputMaybe<Scalars['Bytes']['input']>;
  outcome2Token_not?: InputMaybe<Scalars['Bytes']['input']>;
  outcome2Token_gt?: InputMaybe<Scalars['Bytes']['input']>;
  outcome2Token_lt?: InputMaybe<Scalars['Bytes']['input']>;
  outcome2Token_gte?: InputMaybe<Scalars['Bytes']['input']>;
  outcome2Token_lte?: InputMaybe<Scalars['Bytes']['input']>;
  outcome2Token_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  outcome2Token_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  outcome2Token_contains?: InputMaybe<Scalars['Bytes']['input']>;
  outcome2Token_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MarketInitialized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<MarketInitialized_filter>>>;
};

export type MarketInitialized_orderBy =
  | 'id'
  | 'marketId'
  | 'outcome1'
  | 'outcome2'
  | 'description'
  | 'outcome1Token'
  | 'outcome2Token'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type MarketResolved = {
  id: Scalars['Bytes']['output'];
  marketId: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type MarketResolved_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  marketId?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_not?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_gt?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_lt?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_gte?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_lte?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  marketId_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  marketId_contains?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MarketResolved_filter>>>;
  or?: InputMaybe<Array<InputMaybe<MarketResolved_filter>>>;
};

export type MarketResolved_orderBy =
  | 'id'
  | 'marketId'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  marketAsserted?: Maybe<MarketAsserted>;
  marketAsserteds: Array<MarketAsserted>;
  marketInitialized?: Maybe<MarketInitialized>;
  marketInitializeds: Array<MarketInitialized>;
  marketResolved?: Maybe<MarketResolved>;
  marketResolveds: Array<MarketResolved>;
  tokensBought?: Maybe<TokensBought>;
  tokensBoughts: Array<TokensBought>;
  tokensCreated?: Maybe<TokensCreated>;
  tokensCreateds: Array<TokensCreated>;
  tokensRedeemed?: Maybe<TokensRedeemed>;
  tokensRedeemeds: Array<TokensRedeemed>;
  tokensSettled?: Maybe<TokensSettled>;
  tokensSettleds: Array<TokensSettled>;
  tokensSold?: Maybe<TokensSold>;
  tokensSolds: Array<TokensSold>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QuerymarketAssertedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymarketAssertedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketAsserted_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MarketAsserted_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymarketInitializedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymarketInitializedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketInitialized_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MarketInitialized_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymarketResolvedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymarketResolvedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketResolved_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MarketResolved_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokensBoughtArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokensBoughtsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokensBought_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokensBought_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokensCreatedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokensCreatedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokensCreated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokensCreated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokensRedeemedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokensRedeemedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokensRedeemed_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokensRedeemed_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokensSettledArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokensSettledsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokensSettled_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokensSettled_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokensSoldArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokensSoldsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokensSold_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokensSold_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Subscription = {
  marketAsserted?: Maybe<MarketAsserted>;
  marketAsserteds: Array<MarketAsserted>;
  marketInitialized?: Maybe<MarketInitialized>;
  marketInitializeds: Array<MarketInitialized>;
  marketResolved?: Maybe<MarketResolved>;
  marketResolveds: Array<MarketResolved>;
  tokensBought?: Maybe<TokensBought>;
  tokensBoughts: Array<TokensBought>;
  tokensCreated?: Maybe<TokensCreated>;
  tokensCreateds: Array<TokensCreated>;
  tokensRedeemed?: Maybe<TokensRedeemed>;
  tokensRedeemeds: Array<TokensRedeemed>;
  tokensSettled?: Maybe<TokensSettled>;
  tokensSettleds: Array<TokensSettled>;
  tokensSold?: Maybe<TokensSold>;
  tokensSolds: Array<TokensSold>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionmarketAssertedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmarketAssertedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketAsserted_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MarketAsserted_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmarketInitializedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmarketInitializedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketInitialized_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MarketInitialized_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmarketResolvedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmarketResolvedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketResolved_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MarketResolved_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokensBoughtArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokensBoughtsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokensBought_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokensBought_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokensCreatedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokensCreatedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokensCreated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokensCreated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokensRedeemedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokensRedeemedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokensRedeemed_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokensRedeemed_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokensSettledArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokensSettledsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokensSettled_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokensSettled_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokensSoldArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokensSoldsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokensSold_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokensSold_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type TokensBought = {
  id: Scalars['Bytes']['output'];
  marketId: Scalars['Bytes']['output'];
  account: Scalars['Bytes']['output'];
  currencyAmount: Scalars['BigInt']['output'];
  outcomeTokensBought: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type TokensBought_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  marketId?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_not?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_gt?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_lt?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_gte?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_lte?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  marketId_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  marketId_contains?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  account?: InputMaybe<Scalars['Bytes']['input']>;
  account_not?: InputMaybe<Scalars['Bytes']['input']>;
  account_gt?: InputMaybe<Scalars['Bytes']['input']>;
  account_lt?: InputMaybe<Scalars['Bytes']['input']>;
  account_gte?: InputMaybe<Scalars['Bytes']['input']>;
  account_lte?: InputMaybe<Scalars['Bytes']['input']>;
  account_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  account_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  account_contains?: InputMaybe<Scalars['Bytes']['input']>;
  account_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  currencyAmount?: InputMaybe<Scalars['BigInt']['input']>;
  currencyAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  currencyAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  currencyAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  currencyAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  currencyAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  currencyAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  currencyAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  outcomeTokensBought?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeTokensBought_not?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeTokensBought_gt?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeTokensBought_lt?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeTokensBought_gte?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeTokensBought_lte?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeTokensBought_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  outcomeTokensBought_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TokensBought_filter>>>;
  or?: InputMaybe<Array<InputMaybe<TokensBought_filter>>>;
};

export type TokensBought_orderBy =
  | 'id'
  | 'marketId'
  | 'account'
  | 'currencyAmount'
  | 'outcomeTokensBought'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type TokensCreated = {
  id: Scalars['Bytes']['output'];
  marketId: Scalars['Bytes']['output'];
  account: Scalars['Bytes']['output'];
  tokensCreated: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type TokensCreated_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  marketId?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_not?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_gt?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_lt?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_gte?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_lte?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  marketId_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  marketId_contains?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  account?: InputMaybe<Scalars['Bytes']['input']>;
  account_not?: InputMaybe<Scalars['Bytes']['input']>;
  account_gt?: InputMaybe<Scalars['Bytes']['input']>;
  account_lt?: InputMaybe<Scalars['Bytes']['input']>;
  account_gte?: InputMaybe<Scalars['Bytes']['input']>;
  account_lte?: InputMaybe<Scalars['Bytes']['input']>;
  account_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  account_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  account_contains?: InputMaybe<Scalars['Bytes']['input']>;
  account_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  tokensCreated?: InputMaybe<Scalars['BigInt']['input']>;
  tokensCreated_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokensCreated_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokensCreated_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokensCreated_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokensCreated_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokensCreated_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokensCreated_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TokensCreated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<TokensCreated_filter>>>;
};

export type TokensCreated_orderBy =
  | 'id'
  | 'marketId'
  | 'account'
  | 'tokensCreated'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type TokensRedeemed = {
  id: Scalars['Bytes']['output'];
  marketId: Scalars['Bytes']['output'];
  account: Scalars['Bytes']['output'];
  tokensRedeemed: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type TokensRedeemed_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  marketId?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_not?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_gt?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_lt?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_gte?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_lte?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  marketId_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  marketId_contains?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  account?: InputMaybe<Scalars['Bytes']['input']>;
  account_not?: InputMaybe<Scalars['Bytes']['input']>;
  account_gt?: InputMaybe<Scalars['Bytes']['input']>;
  account_lt?: InputMaybe<Scalars['Bytes']['input']>;
  account_gte?: InputMaybe<Scalars['Bytes']['input']>;
  account_lte?: InputMaybe<Scalars['Bytes']['input']>;
  account_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  account_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  account_contains?: InputMaybe<Scalars['Bytes']['input']>;
  account_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  tokensRedeemed?: InputMaybe<Scalars['BigInt']['input']>;
  tokensRedeemed_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokensRedeemed_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokensRedeemed_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokensRedeemed_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokensRedeemed_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokensRedeemed_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokensRedeemed_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TokensRedeemed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<TokensRedeemed_filter>>>;
};

export type TokensRedeemed_orderBy =
  | 'id'
  | 'marketId'
  | 'account'
  | 'tokensRedeemed'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type TokensSettled = {
  id: Scalars['Bytes']['output'];
  marketId: Scalars['Bytes']['output'];
  account: Scalars['Bytes']['output'];
  payout: Scalars['BigInt']['output'];
  outcome1Tokens: Scalars['BigInt']['output'];
  outcome2Tokens: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type TokensSettled_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  marketId?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_not?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_gt?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_lt?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_gte?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_lte?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  marketId_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  marketId_contains?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  account?: InputMaybe<Scalars['Bytes']['input']>;
  account_not?: InputMaybe<Scalars['Bytes']['input']>;
  account_gt?: InputMaybe<Scalars['Bytes']['input']>;
  account_lt?: InputMaybe<Scalars['Bytes']['input']>;
  account_gte?: InputMaybe<Scalars['Bytes']['input']>;
  account_lte?: InputMaybe<Scalars['Bytes']['input']>;
  account_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  account_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  account_contains?: InputMaybe<Scalars['Bytes']['input']>;
  account_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  payout?: InputMaybe<Scalars['BigInt']['input']>;
  payout_not?: InputMaybe<Scalars['BigInt']['input']>;
  payout_gt?: InputMaybe<Scalars['BigInt']['input']>;
  payout_lt?: InputMaybe<Scalars['BigInt']['input']>;
  payout_gte?: InputMaybe<Scalars['BigInt']['input']>;
  payout_lte?: InputMaybe<Scalars['BigInt']['input']>;
  payout_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  payout_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  outcome1Tokens?: InputMaybe<Scalars['BigInt']['input']>;
  outcome1Tokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  outcome1Tokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  outcome1Tokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  outcome1Tokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  outcome1Tokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  outcome1Tokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  outcome1Tokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  outcome2Tokens?: InputMaybe<Scalars['BigInt']['input']>;
  outcome2Tokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  outcome2Tokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  outcome2Tokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  outcome2Tokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  outcome2Tokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  outcome2Tokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  outcome2Tokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TokensSettled_filter>>>;
  or?: InputMaybe<Array<InputMaybe<TokensSettled_filter>>>;
};

export type TokensSettled_orderBy =
  | 'id'
  | 'marketId'
  | 'account'
  | 'payout'
  | 'outcome1Tokens'
  | 'outcome2Tokens'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type TokensSold = {
  id: Scalars['Bytes']['output'];
  marketId: Scalars['Bytes']['output'];
  account: Scalars['Bytes']['output'];
  currencyAmount: Scalars['BigInt']['output'];
  outcomeTokensSold: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type TokensSold_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  marketId?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_not?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_gt?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_lt?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_gte?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_lte?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  marketId_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  marketId_contains?: InputMaybe<Scalars['Bytes']['input']>;
  marketId_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  account?: InputMaybe<Scalars['Bytes']['input']>;
  account_not?: InputMaybe<Scalars['Bytes']['input']>;
  account_gt?: InputMaybe<Scalars['Bytes']['input']>;
  account_lt?: InputMaybe<Scalars['Bytes']['input']>;
  account_gte?: InputMaybe<Scalars['Bytes']['input']>;
  account_lte?: InputMaybe<Scalars['Bytes']['input']>;
  account_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  account_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  account_contains?: InputMaybe<Scalars['Bytes']['input']>;
  account_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  currencyAmount?: InputMaybe<Scalars['BigInt']['input']>;
  currencyAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  currencyAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  currencyAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  currencyAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  currencyAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  currencyAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  currencyAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  outcomeTokensSold?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeTokensSold_not?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeTokensSold_gt?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeTokensSold_lt?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeTokensSold_gte?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeTokensSold_lte?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeTokensSold_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  outcomeTokensSold_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TokensSold_filter>>>;
  or?: InputMaybe<Array<InputMaybe<TokensSold_filter>>>;
};

export type TokensSold_orderBy =
  | 'id'
  | 'marketId'
  | 'account'
  | 'currencyAmount'
  | 'outcomeTokensSold'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

  export type QuerySdk = {
      /** null **/
  marketAsserted: InContextSdkMethod<Query['marketAsserted'], QuerymarketAssertedArgs, MeshContext>,
  /** null **/
  marketAsserteds: InContextSdkMethod<Query['marketAsserteds'], QuerymarketAssertedsArgs, MeshContext>,
  /** null **/
  marketInitialized: InContextSdkMethod<Query['marketInitialized'], QuerymarketInitializedArgs, MeshContext>,
  /** null **/
  marketInitializeds: InContextSdkMethod<Query['marketInitializeds'], QuerymarketInitializedsArgs, MeshContext>,
  /** null **/
  marketResolved: InContextSdkMethod<Query['marketResolved'], QuerymarketResolvedArgs, MeshContext>,
  /** null **/
  marketResolveds: InContextSdkMethod<Query['marketResolveds'], QuerymarketResolvedsArgs, MeshContext>,
  /** null **/
  tokensBought: InContextSdkMethod<Query['tokensBought'], QuerytokensBoughtArgs, MeshContext>,
  /** null **/
  tokensBoughts: InContextSdkMethod<Query['tokensBoughts'], QuerytokensBoughtsArgs, MeshContext>,
  /** null **/
  tokensCreated: InContextSdkMethod<Query['tokensCreated'], QuerytokensCreatedArgs, MeshContext>,
  /** null **/
  tokensCreateds: InContextSdkMethod<Query['tokensCreateds'], QuerytokensCreatedsArgs, MeshContext>,
  /** null **/
  tokensRedeemed: InContextSdkMethod<Query['tokensRedeemed'], QuerytokensRedeemedArgs, MeshContext>,
  /** null **/
  tokensRedeemeds: InContextSdkMethod<Query['tokensRedeemeds'], QuerytokensRedeemedsArgs, MeshContext>,
  /** null **/
  tokensSettled: InContextSdkMethod<Query['tokensSettled'], QuerytokensSettledArgs, MeshContext>,
  /** null **/
  tokensSettleds: InContextSdkMethod<Query['tokensSettleds'], QuerytokensSettledsArgs, MeshContext>,
  /** null **/
  tokensSold: InContextSdkMethod<Query['tokensSold'], QuerytokensSoldArgs, MeshContext>,
  /** null **/
  tokensSolds: InContextSdkMethod<Query['tokensSolds'], QuerytokensSoldsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  marketAsserted: InContextSdkMethod<Subscription['marketAsserted'], SubscriptionmarketAssertedArgs, MeshContext>,
  /** null **/
  marketAsserteds: InContextSdkMethod<Subscription['marketAsserteds'], SubscriptionmarketAssertedsArgs, MeshContext>,
  /** null **/
  marketInitialized: InContextSdkMethod<Subscription['marketInitialized'], SubscriptionmarketInitializedArgs, MeshContext>,
  /** null **/
  marketInitializeds: InContextSdkMethod<Subscription['marketInitializeds'], SubscriptionmarketInitializedsArgs, MeshContext>,
  /** null **/
  marketResolved: InContextSdkMethod<Subscription['marketResolved'], SubscriptionmarketResolvedArgs, MeshContext>,
  /** null **/
  marketResolveds: InContextSdkMethod<Subscription['marketResolveds'], SubscriptionmarketResolvedsArgs, MeshContext>,
  /** null **/
  tokensBought: InContextSdkMethod<Subscription['tokensBought'], SubscriptiontokensBoughtArgs, MeshContext>,
  /** null **/
  tokensBoughts: InContextSdkMethod<Subscription['tokensBoughts'], SubscriptiontokensBoughtsArgs, MeshContext>,
  /** null **/
  tokensCreated: InContextSdkMethod<Subscription['tokensCreated'], SubscriptiontokensCreatedArgs, MeshContext>,
  /** null **/
  tokensCreateds: InContextSdkMethod<Subscription['tokensCreateds'], SubscriptiontokensCreatedsArgs, MeshContext>,
  /** null **/
  tokensRedeemed: InContextSdkMethod<Subscription['tokensRedeemed'], SubscriptiontokensRedeemedArgs, MeshContext>,
  /** null **/
  tokensRedeemeds: InContextSdkMethod<Subscription['tokensRedeemeds'], SubscriptiontokensRedeemedsArgs, MeshContext>,
  /** null **/
  tokensSettled: InContextSdkMethod<Subscription['tokensSettled'], SubscriptiontokensSettledArgs, MeshContext>,
  /** null **/
  tokensSettleds: InContextSdkMethod<Subscription['tokensSettleds'], SubscriptiontokensSettledsArgs, MeshContext>,
  /** null **/
  tokensSold: InContextSdkMethod<Subscription['tokensSold'], SubscriptiontokensSoldArgs, MeshContext>,
  /** null **/
  tokensSolds: InContextSdkMethod<Subscription['tokensSolds'], SubscriptiontokensSoldsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["predict-x-base-sepolia"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
