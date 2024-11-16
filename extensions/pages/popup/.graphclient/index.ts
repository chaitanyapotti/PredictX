// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import UsePollingLive from "@graphprotocol/client-polling-live";
import BareMerger from "@graphql-mesh/merger-bare";
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { PredictXTypes } from './sources/predict-x/types';
import * as importedModule$0 from "./sources/predict-x/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Aggregation_interval: Aggregation_interval;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']['output']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']['output']>;
  MarketAsserted: ResolverTypeWrapper<MarketAsserted>;
  MarketAsserted_filter: MarketAsserted_filter;
  MarketAsserted_orderBy: MarketAsserted_orderBy;
  MarketInitialized: ResolverTypeWrapper<MarketInitialized>;
  MarketInitialized_filter: MarketInitialized_filter;
  MarketInitialized_orderBy: MarketInitialized_orderBy;
  MarketResolved: ResolverTypeWrapper<MarketResolved>;
  MarketResolved_filter: MarketResolved_filter;
  MarketResolved_orderBy: MarketResolved_orderBy;
  OrderDirection: OrderDirection;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  TokensBought: ResolverTypeWrapper<TokensBought>;
  TokensBought_filter: TokensBought_filter;
  TokensBought_orderBy: TokensBought_orderBy;
  TokensCreated: ResolverTypeWrapper<TokensCreated>;
  TokensCreated_filter: TokensCreated_filter;
  TokensCreated_orderBy: TokensCreated_orderBy;
  TokensRedeemed: ResolverTypeWrapper<TokensRedeemed>;
  TokensRedeemed_filter: TokensRedeemed_filter;
  TokensRedeemed_orderBy: TokensRedeemed_orderBy;
  TokensSettled: ResolverTypeWrapper<TokensSettled>;
  TokensSettled_filter: TokensSettled_filter;
  TokensSettled_orderBy: TokensSettled_orderBy;
  TokensSold: ResolverTypeWrapper<TokensSold>;
  TokensSold_filter: TokensSold_filter;
  TokensSold_orderBy: TokensSold_orderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BigDecimal: Scalars['BigDecimal']['output'];
  BigInt: Scalars['BigInt']['output'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean']['output'];
  Bytes: Scalars['Bytes']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Int8: Scalars['Int8']['output'];
  MarketAsserted: MarketAsserted;
  MarketAsserted_filter: MarketAsserted_filter;
  MarketInitialized: MarketInitialized;
  MarketInitialized_filter: MarketInitialized_filter;
  MarketResolved: MarketResolved;
  MarketResolved_filter: MarketResolved_filter;
  Query: {};
  String: Scalars['String']['output'];
  Subscription: {};
  Timestamp: Scalars['Timestamp']['output'];
  TokensBought: TokensBought;
  TokensBought_filter: TokensBought_filter;
  TokensCreated: TokensCreated;
  TokensCreated_filter: TokensCreated_filter;
  TokensRedeemed: TokensRedeemed;
  TokensRedeemed_filter: TokensRedeemed_filter;
  TokensSettled: TokensSettled;
  TokensSettled_filter: TokensSettled_filter;
  TokensSold: TokensSold;
  TokensSold_filter: TokensSold_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String']['input'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String']['input'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type MarketAssertedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['MarketAsserted'] = ResolversParentTypes['MarketAsserted']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  marketId?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  assertedOutcome?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  assertionId?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MarketInitializedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['MarketInitialized'] = ResolversParentTypes['MarketInitialized']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  marketId?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  outcome1?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  outcome2?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  outcome1Token?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  outcome2Token?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MarketResolvedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['MarketResolved'] = ResolversParentTypes['MarketResolved']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  marketId?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  marketAsserted?: Resolver<Maybe<ResolversTypes['MarketAsserted']>, ParentType, ContextType, RequireFields<QuerymarketAssertedArgs, 'id' | 'subgraphError'>>;
  marketAsserteds?: Resolver<Array<ResolversTypes['MarketAsserted']>, ParentType, ContextType, RequireFields<QuerymarketAssertedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  marketInitialized?: Resolver<Maybe<ResolversTypes['MarketInitialized']>, ParentType, ContextType, RequireFields<QuerymarketInitializedArgs, 'id' | 'subgraphError'>>;
  marketInitializeds?: Resolver<Array<ResolversTypes['MarketInitialized']>, ParentType, ContextType, RequireFields<QuerymarketInitializedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  marketResolved?: Resolver<Maybe<ResolversTypes['MarketResolved']>, ParentType, ContextType, RequireFields<QuerymarketResolvedArgs, 'id' | 'subgraphError'>>;
  marketResolveds?: Resolver<Array<ResolversTypes['MarketResolved']>, ParentType, ContextType, RequireFields<QuerymarketResolvedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  tokensBought?: Resolver<Maybe<ResolversTypes['TokensBought']>, ParentType, ContextType, RequireFields<QuerytokensBoughtArgs, 'id' | 'subgraphError'>>;
  tokensBoughts?: Resolver<Array<ResolversTypes['TokensBought']>, ParentType, ContextType, RequireFields<QuerytokensBoughtsArgs, 'skip' | 'first' | 'subgraphError'>>;
  tokensCreated?: Resolver<Maybe<ResolversTypes['TokensCreated']>, ParentType, ContextType, RequireFields<QuerytokensCreatedArgs, 'id' | 'subgraphError'>>;
  tokensCreateds?: Resolver<Array<ResolversTypes['TokensCreated']>, ParentType, ContextType, RequireFields<QuerytokensCreatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  tokensRedeemed?: Resolver<Maybe<ResolversTypes['TokensRedeemed']>, ParentType, ContextType, RequireFields<QuerytokensRedeemedArgs, 'id' | 'subgraphError'>>;
  tokensRedeemeds?: Resolver<Array<ResolversTypes['TokensRedeemed']>, ParentType, ContextType, RequireFields<QuerytokensRedeemedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  tokensSettled?: Resolver<Maybe<ResolversTypes['TokensSettled']>, ParentType, ContextType, RequireFields<QuerytokensSettledArgs, 'id' | 'subgraphError'>>;
  tokensSettleds?: Resolver<Array<ResolversTypes['TokensSettled']>, ParentType, ContextType, RequireFields<QuerytokensSettledsArgs, 'skip' | 'first' | 'subgraphError'>>;
  tokensSold?: Resolver<Maybe<ResolversTypes['TokensSold']>, ParentType, ContextType, RequireFields<QuerytokensSoldArgs, 'id' | 'subgraphError'>>;
  tokensSolds?: Resolver<Array<ResolversTypes['TokensSold']>, ParentType, ContextType, RequireFields<QuerytokensSoldsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  marketAsserted?: SubscriptionResolver<Maybe<ResolversTypes['MarketAsserted']>, "marketAsserted", ParentType, ContextType, RequireFields<SubscriptionmarketAssertedArgs, 'id' | 'subgraphError'>>;
  marketAsserteds?: SubscriptionResolver<Array<ResolversTypes['MarketAsserted']>, "marketAsserteds", ParentType, ContextType, RequireFields<SubscriptionmarketAssertedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  marketInitialized?: SubscriptionResolver<Maybe<ResolversTypes['MarketInitialized']>, "marketInitialized", ParentType, ContextType, RequireFields<SubscriptionmarketInitializedArgs, 'id' | 'subgraphError'>>;
  marketInitializeds?: SubscriptionResolver<Array<ResolversTypes['MarketInitialized']>, "marketInitializeds", ParentType, ContextType, RequireFields<SubscriptionmarketInitializedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  marketResolved?: SubscriptionResolver<Maybe<ResolversTypes['MarketResolved']>, "marketResolved", ParentType, ContextType, RequireFields<SubscriptionmarketResolvedArgs, 'id' | 'subgraphError'>>;
  marketResolveds?: SubscriptionResolver<Array<ResolversTypes['MarketResolved']>, "marketResolveds", ParentType, ContextType, RequireFields<SubscriptionmarketResolvedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  tokensBought?: SubscriptionResolver<Maybe<ResolversTypes['TokensBought']>, "tokensBought", ParentType, ContextType, RequireFields<SubscriptiontokensBoughtArgs, 'id' | 'subgraphError'>>;
  tokensBoughts?: SubscriptionResolver<Array<ResolversTypes['TokensBought']>, "tokensBoughts", ParentType, ContextType, RequireFields<SubscriptiontokensBoughtsArgs, 'skip' | 'first' | 'subgraphError'>>;
  tokensCreated?: SubscriptionResolver<Maybe<ResolversTypes['TokensCreated']>, "tokensCreated", ParentType, ContextType, RequireFields<SubscriptiontokensCreatedArgs, 'id' | 'subgraphError'>>;
  tokensCreateds?: SubscriptionResolver<Array<ResolversTypes['TokensCreated']>, "tokensCreateds", ParentType, ContextType, RequireFields<SubscriptiontokensCreatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  tokensRedeemed?: SubscriptionResolver<Maybe<ResolversTypes['TokensRedeemed']>, "tokensRedeemed", ParentType, ContextType, RequireFields<SubscriptiontokensRedeemedArgs, 'id' | 'subgraphError'>>;
  tokensRedeemeds?: SubscriptionResolver<Array<ResolversTypes['TokensRedeemed']>, "tokensRedeemeds", ParentType, ContextType, RequireFields<SubscriptiontokensRedeemedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  tokensSettled?: SubscriptionResolver<Maybe<ResolversTypes['TokensSettled']>, "tokensSettled", ParentType, ContextType, RequireFields<SubscriptiontokensSettledArgs, 'id' | 'subgraphError'>>;
  tokensSettleds?: SubscriptionResolver<Array<ResolversTypes['TokensSettled']>, "tokensSettleds", ParentType, ContextType, RequireFields<SubscriptiontokensSettledsArgs, 'skip' | 'first' | 'subgraphError'>>;
  tokensSold?: SubscriptionResolver<Maybe<ResolversTypes['TokensSold']>, "tokensSold", ParentType, ContextType, RequireFields<SubscriptiontokensSoldArgs, 'id' | 'subgraphError'>>;
  tokensSolds?: SubscriptionResolver<Array<ResolversTypes['TokensSold']>, "tokensSolds", ParentType, ContextType, RequireFields<SubscriptiontokensSoldsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type TokensBoughtResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TokensBought'] = ResolversParentTypes['TokensBought']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  marketId?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  currencyAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  outcomeTokensBought?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TokensCreatedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TokensCreated'] = ResolversParentTypes['TokensCreated']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  marketId?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokensCreated?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TokensRedeemedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TokensRedeemed'] = ResolversParentTypes['TokensRedeemed']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  marketId?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokensRedeemed?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TokensSettledResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TokensSettled'] = ResolversParentTypes['TokensSettled']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  marketId?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  payout?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  outcome1Tokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  outcome2Tokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TokensSoldResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TokensSold'] = ResolversParentTypes['TokensSold']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  marketId?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  currencyAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  outcomeTokensSold?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  parentHash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  Int8?: GraphQLScalarType;
  MarketAsserted?: MarketAssertedResolvers<ContextType>;
  MarketInitialized?: MarketInitializedResolvers<ContextType>;
  MarketResolved?: MarketResolvedResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  TokensBought?: TokensBoughtResolvers<ContextType>;
  TokensCreated?: TokensCreatedResolvers<ContextType>;
  TokensRedeemed?: TokensRedeemedResolvers<ContextType>;
  TokensSettled?: TokensSettledResolvers<ContextType>;
  TokensSold?: TokensSoldResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = PredictXTypes.Context & BaseMeshContext;


const baseDir = pathModule.join(typeof __dirname === 'string' ? __dirname : '/', '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/predict-x/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const predictXTransforms = [];
const additionalTypeDefs = [] as any[];
const predictXHandler = new GraphqlHandler({
              name: "predict-x",
              config: {"endpoint":"https://api.studio.thegraph.com/query/94980/predict-x-webhook/0.0.2"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("predict-x"),
              logger: logger.child("predict-x"),
              importFn,
            });
sources[0] = {
          name: 'predict-x',
          handler: predictXHandler,
          transforms: predictXTransforms
        }
additionalEnvelopPlugins[0] = await UsePollingLive({
          ...({
  "defaultInterval": 1000,
  "includes": [
    "MarketInitialized",
    "MarketResolved",
    "TokensBought",
    "TokensSold"
  ]
}),
          logger: logger.child("pollingLive"),
          cache,
          pubsub,
          baseDir,
          importFn,
        })
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export const pollingInterval = null;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    if (pollingInterval) {
      setInterval(() => {
        getMeshOptions()
        .then(meshOptions => getMesh(meshOptions))
        .then(newMesh =>
          meshInstance$.then(oldMesh => {
            oldMesh.destroy()
            meshInstance$ = Promise.resolve(newMesh)
          })
        ).catch(err => {
          console.error("Mesh polling failed so the existing version will be used:", err);
        });
      }, pollingInterval)
    }
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));