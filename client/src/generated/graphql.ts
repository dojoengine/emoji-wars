import { GraphQLClient } from 'graphql-request';
// import { GraphQLClientRequestHeaders } from 'graphql-request';
import { print } from 'graphql'
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

export type GraphQLClientRequestHeaders = Headers | string[][] | Record<string, string>

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  ContractAddress: { input: any; output: any; }
  Cursor: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  felt252: { input: any; output: any; }
  u8: { input: any; output: any; }
  u32: { input: any; output: any; }
  u64: { input: any; output: any; }
};

export type Count = {
  __typename?: 'Count';
  count?: Maybe<Scalars['u64']['output']>;
  emoji_type?: Maybe<Scalars['u8']['output']>;
  entity?: Maybe<Entity>;
};

export type CountConnection = {
  __typename?: 'CountConnection';
  edges?: Maybe<Array<Maybe<CountEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type CountEdge = {
  __typename?: 'CountEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Count>;
};

export type CountOrder = {
  direction: OrderDirection;
  field: CountOrderField;
};

export enum CountOrderField {
  Count = 'COUNT',
  EmojiType = 'EMOJI_TYPE'
}

export type CountWhereInput = {
  count?: InputMaybe<Scalars['u64']['input']>;
  countEQ?: InputMaybe<Scalars['u64']['input']>;
  countGT?: InputMaybe<Scalars['u64']['input']>;
  countGTE?: InputMaybe<Scalars['u64']['input']>;
  countLT?: InputMaybe<Scalars['u64']['input']>;
  countLTE?: InputMaybe<Scalars['u64']['input']>;
  countNEQ?: InputMaybe<Scalars['u64']['input']>;
  emoji_type?: InputMaybe<Scalars['u8']['input']>;
  emoji_typeEQ?: InputMaybe<Scalars['u8']['input']>;
  emoji_typeGT?: InputMaybe<Scalars['u8']['input']>;
  emoji_typeGTE?: InputMaybe<Scalars['u8']['input']>;
  emoji_typeLT?: InputMaybe<Scalars['u8']['input']>;
  emoji_typeLTE?: InputMaybe<Scalars['u8']['input']>;
  emoji_typeNEQ?: InputMaybe<Scalars['u8']['input']>;
};

export type Emoji = {
  __typename?: 'Emoji';
  emoji_type?: Maybe<Scalars['u8']['output']>;
  entity?: Maybe<Entity>;
  x?: Maybe<Scalars['u32']['output']>;
  y?: Maybe<Scalars['u32']['output']>;
};

export type EmojiConnection = {
  __typename?: 'EmojiConnection';
  edges?: Maybe<Array<Maybe<EmojiEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type EmojiEdge = {
  __typename?: 'EmojiEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Emoji>;
};

export type EmojiOrder = {
  direction: OrderDirection;
  field: EmojiOrderField;
};

export enum EmojiOrderField {
  EmojiType = 'EMOJI_TYPE',
  X = 'X',
  Y = 'Y'
}

export type EmojiTimeOut = {
  __typename?: 'EmojiTimeOut';
  emoji_type?: Maybe<Scalars['u8']['output']>;
  entity?: Maybe<Entity>;
  time?: Maybe<Scalars['u64']['output']>;
};

export type EmojiTimeOutConnection = {
  __typename?: 'EmojiTimeOutConnection';
  edges?: Maybe<Array<Maybe<EmojiTimeOutEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type EmojiTimeOutEdge = {
  __typename?: 'EmojiTimeOutEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<EmojiTimeOut>;
};

export type EmojiTimeOutOrder = {
  direction: OrderDirection;
  field: EmojiTimeOutOrderField;
};

export enum EmojiTimeOutOrderField {
  EmojiType = 'EMOJI_TYPE',
  Time = 'TIME'
}

export type EmojiTimeOutWhereInput = {
  emoji_type?: InputMaybe<Scalars['u8']['input']>;
  emoji_typeEQ?: InputMaybe<Scalars['u8']['input']>;
  emoji_typeGT?: InputMaybe<Scalars['u8']['input']>;
  emoji_typeGTE?: InputMaybe<Scalars['u8']['input']>;
  emoji_typeLT?: InputMaybe<Scalars['u8']['input']>;
  emoji_typeLTE?: InputMaybe<Scalars['u8']['input']>;
  emoji_typeNEQ?: InputMaybe<Scalars['u8']['input']>;
  time?: InputMaybe<Scalars['u64']['input']>;
  timeEQ?: InputMaybe<Scalars['u64']['input']>;
  timeGT?: InputMaybe<Scalars['u64']['input']>;
  timeGTE?: InputMaybe<Scalars['u64']['input']>;
  timeLT?: InputMaybe<Scalars['u64']['input']>;
  timeLTE?: InputMaybe<Scalars['u64']['input']>;
  timeNEQ?: InputMaybe<Scalars['u64']['input']>;
};

export type EmojiWhereInput = {
  emoji_type?: InputMaybe<Scalars['u8']['input']>;
  emoji_typeEQ?: InputMaybe<Scalars['u8']['input']>;
  emoji_typeGT?: InputMaybe<Scalars['u8']['input']>;
  emoji_typeGTE?: InputMaybe<Scalars['u8']['input']>;
  emoji_typeLT?: InputMaybe<Scalars['u8']['input']>;
  emoji_typeLTE?: InputMaybe<Scalars['u8']['input']>;
  emoji_typeNEQ?: InputMaybe<Scalars['u8']['input']>;
  x?: InputMaybe<Scalars['u32']['input']>;
  xEQ?: InputMaybe<Scalars['u32']['input']>;
  xGT?: InputMaybe<Scalars['u32']['input']>;
  xGTE?: InputMaybe<Scalars['u32']['input']>;
  xLT?: InputMaybe<Scalars['u32']['input']>;
  xLTE?: InputMaybe<Scalars['u32']['input']>;
  xNEQ?: InputMaybe<Scalars['u32']['input']>;
  y?: InputMaybe<Scalars['u32']['input']>;
  yEQ?: InputMaybe<Scalars['u32']['input']>;
  yGT?: InputMaybe<Scalars['u32']['input']>;
  yGTE?: InputMaybe<Scalars['u32']['input']>;
  yLT?: InputMaybe<Scalars['u32']['input']>;
  yLTE?: InputMaybe<Scalars['u32']['input']>;
  yNEQ?: InputMaybe<Scalars['u32']['input']>;
};

export type Entity = {
  __typename?: 'Entity';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  event_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  model_names?: Maybe<Scalars['String']['output']>;
  models?: Maybe<Array<Maybe<ModelUnion>>>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type EntityConnection = {
  __typename?: 'EntityConnection';
  edges?: Maybe<Array<Maybe<EntityEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type EntityEdge = {
  __typename?: 'EntityEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Entity>;
};

export type Event = {
  __typename?: 'Event';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id?: Maybe<Scalars['ID']['output']>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  systemCall: SystemCall;
  transaction_hash?: Maybe<Scalars['String']['output']>;
};

export type EventConnection = {
  __typename?: 'EventConnection';
  edges?: Maybe<Array<Maybe<EventEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type EventEdge = {
  __typename?: 'EventEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Event>;
};

export type Metadata = {
  __typename?: 'Metadata';
  id?: Maybe<Scalars['ID']['output']>;
  uri?: Maybe<Scalars['String']['output']>;
};

export type MetadataConnection = {
  __typename?: 'MetadataConnection';
  edges?: Maybe<Array<Maybe<MetadataEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type MetadataEdge = {
  __typename?: 'MetadataEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Metadata>;
};

export type Model = {
  __typename?: 'Model';
  class_hash?: Maybe<Scalars['felt252']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  transaction_hash?: Maybe<Scalars['felt252']['output']>;
};

export type ModelConnection = {
  __typename?: 'ModelConnection';
  edges?: Maybe<Array<Maybe<ModelEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type ModelEdge = {
  __typename?: 'ModelEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Model>;
};

export type ModelUnion = Count | Emoji | EmojiTimeOut | Owner | Position | TimeOut;

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Owner = {
  __typename?: 'Owner';
  entity?: Maybe<Entity>;
  player?: Maybe<Scalars['ContractAddress']['output']>;
  x?: Maybe<Scalars['u32']['output']>;
  y?: Maybe<Scalars['u32']['output']>;
};

export type OwnerConnection = {
  __typename?: 'OwnerConnection';
  edges?: Maybe<Array<Maybe<OwnerEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type OwnerEdge = {
  __typename?: 'OwnerEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Owner>;
};

export type OwnerOrder = {
  direction: OrderDirection;
  field: OwnerOrderField;
};

export enum OwnerOrderField {
  Player = 'PLAYER',
  X = 'X',
  Y = 'Y'
}

export type OwnerWhereInput = {
  player?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  x?: InputMaybe<Scalars['u32']['input']>;
  xEQ?: InputMaybe<Scalars['u32']['input']>;
  xGT?: InputMaybe<Scalars['u32']['input']>;
  xGTE?: InputMaybe<Scalars['u32']['input']>;
  xLT?: InputMaybe<Scalars['u32']['input']>;
  xLTE?: InputMaybe<Scalars['u32']['input']>;
  xNEQ?: InputMaybe<Scalars['u32']['input']>;
  y?: InputMaybe<Scalars['u32']['input']>;
  yEQ?: InputMaybe<Scalars['u32']['input']>;
  yGT?: InputMaybe<Scalars['u32']['input']>;
  yGTE?: InputMaybe<Scalars['u32']['input']>;
  yLT?: InputMaybe<Scalars['u32']['input']>;
  yLTE?: InputMaybe<Scalars['u32']['input']>;
  yNEQ?: InputMaybe<Scalars['u32']['input']>;
};

export type Position = {
  __typename?: 'Position';
  entity?: Maybe<Entity>;
  vec?: Maybe<Vec2>;
  x?: Maybe<Scalars['u32']['output']>;
  y?: Maybe<Scalars['u32']['output']>;
};

export type PositionConnection = {
  __typename?: 'PositionConnection';
  edges?: Maybe<Array<Maybe<PositionEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type PositionEdge = {
  __typename?: 'PositionEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Position>;
};

export type PositionOrder = {
  direction: OrderDirection;
  field: PositionOrderField;
};

export enum PositionOrderField {
  Vec = 'VEC',
  X = 'X',
  Y = 'Y'
}

export type PositionWhereInput = {
  x?: InputMaybe<Scalars['u32']['input']>;
  xEQ?: InputMaybe<Scalars['u32']['input']>;
  xGT?: InputMaybe<Scalars['u32']['input']>;
  xGTE?: InputMaybe<Scalars['u32']['input']>;
  xLT?: InputMaybe<Scalars['u32']['input']>;
  xLTE?: InputMaybe<Scalars['u32']['input']>;
  xNEQ?: InputMaybe<Scalars['u32']['input']>;
  y?: InputMaybe<Scalars['u32']['input']>;
  yEQ?: InputMaybe<Scalars['u32']['input']>;
  yGT?: InputMaybe<Scalars['u32']['input']>;
  yGTE?: InputMaybe<Scalars['u32']['input']>;
  yLT?: InputMaybe<Scalars['u32']['input']>;
  yLTE?: InputMaybe<Scalars['u32']['input']>;
  yNEQ?: InputMaybe<Scalars['u32']['input']>;
};

export type Query = {
  __typename?: 'Query';
  countModels?: Maybe<CountConnection>;
  emojiModels?: Maybe<EmojiConnection>;
  emojitimeoutModels?: Maybe<EmojiTimeOutConnection>;
  entities?: Maybe<EntityConnection>;
  entity: Entity;
  events?: Maybe<EventConnection>;
  metadata: Metadata;
  metadatas?: Maybe<MetadataConnection>;
  model: Model;
  models?: Maybe<ModelConnection>;
  ownerModels?: Maybe<OwnerConnection>;
  positionModels?: Maybe<PositionConnection>;
  system: System;
  systemCall: SystemCall;
  systemCalls?: Maybe<SystemCallConnection>;
  systems?: Maybe<SystemConnection>;
  timeoutModels?: Maybe<TimeOutConnection>;
};


export type QueryCountModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<CountOrder>;
  where?: InputMaybe<CountWhereInput>;
};


export type QueryEmojiModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<EmojiOrder>;
  where?: InputMaybe<EmojiWhereInput>;
};


export type QueryEmojitimeoutModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<EmojiTimeOutOrder>;
  where?: InputMaybe<EmojiTimeOutWhereInput>;
};


export type QueryEntitiesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryEntityArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMetadataArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMetadatasArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryModelArgs = {
  id: Scalars['ID']['input'];
};


export type QueryModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryOwnerModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OwnerOrder>;
  where?: InputMaybe<OwnerWhereInput>;
};


export type QueryPositionModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<PositionOrder>;
  where?: InputMaybe<PositionWhereInput>;
};


export type QuerySystemArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySystemCallArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySystemCallsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySystemsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTimeoutModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<TimeOutOrder>;
  where?: InputMaybe<TimeOutWhereInput>;
};

export type Subscription = {
  __typename?: 'Subscription';
  entityUpdated: Entity;
  modelRegistered: Model;
};


export type SubscriptionEntityUpdatedArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type SubscriptionModelRegisteredArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type System = {
  __typename?: 'System';
  class_hash?: Maybe<Scalars['felt252']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  systemCalls: Array<SystemCall>;
  transaction_hash?: Maybe<Scalars['felt252']['output']>;
};

export type SystemCall = {
  __typename?: 'SystemCall';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  system: System;
  system_id?: Maybe<Scalars['ID']['output']>;
  transaction_hash?: Maybe<Scalars['String']['output']>;
};

export type SystemCallConnection = {
  __typename?: 'SystemCallConnection';
  edges?: Maybe<Array<Maybe<SystemCallEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type SystemCallEdge = {
  __typename?: 'SystemCallEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<SystemCall>;
};

export type SystemConnection = {
  __typename?: 'SystemConnection';
  edges?: Maybe<Array<Maybe<SystemEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type SystemEdge = {
  __typename?: 'SystemEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<System>;
};

export type TimeOut = {
  __typename?: 'TimeOut';
  entity?: Maybe<Entity>;
  time?: Maybe<Scalars['u64']['output']>;
  x?: Maybe<Scalars['u32']['output']>;
  y?: Maybe<Scalars['u32']['output']>;
};

export type TimeOutConnection = {
  __typename?: 'TimeOutConnection';
  edges?: Maybe<Array<Maybe<TimeOutEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type TimeOutEdge = {
  __typename?: 'TimeOutEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<TimeOut>;
};

export type TimeOutOrder = {
  direction: OrderDirection;
  field: TimeOutOrderField;
};

export enum TimeOutOrderField {
  Time = 'TIME',
  X = 'X',
  Y = 'Y'
}

export type TimeOutWhereInput = {
  time?: InputMaybe<Scalars['u64']['input']>;
  timeEQ?: InputMaybe<Scalars['u64']['input']>;
  timeGT?: InputMaybe<Scalars['u64']['input']>;
  timeGTE?: InputMaybe<Scalars['u64']['input']>;
  timeLT?: InputMaybe<Scalars['u64']['input']>;
  timeLTE?: InputMaybe<Scalars['u64']['input']>;
  timeNEQ?: InputMaybe<Scalars['u64']['input']>;
  x?: InputMaybe<Scalars['u32']['input']>;
  xEQ?: InputMaybe<Scalars['u32']['input']>;
  xGT?: InputMaybe<Scalars['u32']['input']>;
  xGTE?: InputMaybe<Scalars['u32']['input']>;
  xLT?: InputMaybe<Scalars['u32']['input']>;
  xLTE?: InputMaybe<Scalars['u32']['input']>;
  xNEQ?: InputMaybe<Scalars['u32']['input']>;
  y?: InputMaybe<Scalars['u32']['input']>;
  yEQ?: InputMaybe<Scalars['u32']['input']>;
  yGT?: InputMaybe<Scalars['u32']['input']>;
  yGTE?: InputMaybe<Scalars['u32']['input']>;
  yLT?: InputMaybe<Scalars['u32']['input']>;
  yLTE?: InputMaybe<Scalars['u32']['input']>;
  yNEQ?: InputMaybe<Scalars['u32']['input']>;
};

export type Vec2 = {
  __typename?: 'Vec2';
  x?: Maybe<Scalars['u32']['output']>;
  y?: Maybe<Scalars['u32']['output']>;
};

export type GetEntitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEntitiesQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, models?: Array<{ __typename: 'Count' } | { __typename: 'Emoji', emoji_type?: any | null } | { __typename: 'EmojiTimeOut' } | { __typename: 'Owner' } | { __typename: 'Position', vec?: { __typename?: 'Vec2', x?: any | null, y?: any | null } | null } | { __typename: 'TimeOut', time?: any | null } | null> | null } | null } | null> | null } | null };


export const GetEntitiesDocument = gql`
    query getEntities {
  entities(keys: ["%"], limit: 100) {
    edges {
      node {
        keys
        models {
          __typename
          ... on Position {
            vec {
              x
              y
            }
          }
          ... on Emoji {
            emoji_type
          }
          ... on TimeOut {
            time
          }
        }
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?: Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const GetEntitiesDocumentString = print(GetEntitiesDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getEntities(variables?: GetEntitiesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetEntitiesQuery; extensions?: any; headers: any; status: number; }> {
      return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetEntitiesQuery>(GetEntitiesDocumentString, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'getEntities', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;