import { GraphQLClient, gql } from "graphql-request";
import { createClient } from "graphql-ws";
import { Components } from "@latticexyz/recs";
import { BehaviorSubject, Observable } from "rxjs";
import { setComponentFromGraphQLEntityTemp } from "../utils";

type EntityUpdated = {
    id: string[];
    keys: string[];
    model_names: string;
};

type EntityQuery = {
    entity: Entity;
};

type Entity = {
    __typename?: "Entity";
    keys?: string[] | null | undefined;
    models?: any | null[];
};

export type UpdatedEntity = {
    entityKeys: string[];
    model_names: string[];
};

type GetLatestEntitiesQuery = {
    entities: {
        edges: {
            node: Entity & { model_names: string };
        }[];
    };
};

export async function createEntitySubscription(contractComponents: Components): Promise<Observable<UpdatedEntity[]>> {
    const { VITE_PUBLIC_TORII, VITE_PUBLIC_TORII_WS } = import.meta.env;
    const wsClient = createClient({ url: VITE_PUBLIC_TORII_WS });
    const client = new GraphQLClient(VITE_PUBLIC_TORII);

    const lastUpdate$ = new BehaviorSubject<UpdatedEntity[]>([]);

    wsClient.subscribe(
        {
            query: gql`
        subscription {
          entityUpdated {
            id
            keys
            model_names
          }
        }
      `,
        },
        {
            next: ({ data }) => {
                try {
                    const entityUpdated = data?.entityUpdated as EntityUpdated;
                    const componentNames = entityUpdated.model_names.split(",");
                    queryEntityInfoById(entityUpdated.id, componentNames, client, contractComponents).then((entityInfo) => {
                        const { entity } = entityInfo as EntityQuery;
                        setComponentFromGraphQLEntityTemp(contractComponents, entity)
                    });
                } catch (error) {
                    console.log({ error });
                }
            },
            error: (error) => console.log({ error }),
            complete: () => console.log("complete"),
        },
    );
    return lastUpdate$;
}

/**
 * Creates a graphql query for a list of components
 *
 * @param components
 * @param componentNames
 * @returns
 */
const createComponentQueries = (components: Components): string => {
    let componentQueries = "";
    for (const componentName in components) {
        const component = components[componentName];
        const fragment = generateGraphQLFragmentForComponent(component);

        componentQueries += fragment;
    }

    return componentQueries;
};

function generateGraphQLFragmentForComponent(component: any): string {
    function getFieldsForObject(obj: any): string {
        return Object.keys(obj).map(key => {
            if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                return `${key} {
            ${getFieldsForObject(obj[key])}
          }`;
            }
            return key;
        }).join("\n");
    }

    const fields = getFieldsForObject(component.schema);
    return `... on ${component.metadata.name} {
      __typename
      ${fields}
    }`;
}

/**
 * Checks if an entity update is relevant for the UI
 *
 * @param componentNames
 * @returns
 */

const isEntityUpdate = (componentNames: string[]) => {
    // create realm
    if (["Realm", "Owner", "EntityMetadata", "Position"].every((element) => componentNames.includes(element)))
        return true;
    // create resource
    else if (componentNames.length === 1 && componentNames[0] === "Resource") return true;
    else if (["Trade", "Status"].every((element) => componentNames.includes(element))) return true;
    else return false;
};

/**
 * Fetches initial data from the graphql endpoint in order to have a history of events when the UI is loaded
 * @param contractComponents components from the contract
 * @param client graphql client
 * @param max max number of entities to fetch
 * @returns a list of entities with their keys and component names
 */

export const getInitialData = async (
    contractComponents: Components,
    client: GraphQLClient,
    max?: number,
): Promise<UpdatedEntity[]> => {

    const componentQueries = createComponentQueries(contractComponents);

    const rawIntitialData: GetLatestEntitiesQuery = await client.request(gql`
      query latestEntities {
        entities(first: ${max || 100}) {
          edges {
            node {
              __typename
              keys
              componentNames
              components {
                __typename
                ${componentQueries}
              }
            }
          }
        }
      }
    `);

    const initialData = rawIntitialData.entities.edges
        .map((edge) => {
            const componentNames = edge.node.model_names.split(",");

            if (isEntityUpdate(componentNames)) {
                return {
                    entityKeys: edge.node.keys,
                    model_names: edge.node.model_names.split(","),
                };
            }
        })
        .filter(Boolean) as UpdatedEntity[];

    return initialData;
};

// make query to fetch component values (temporary, will be fixed soon in torii)
const queryEntityInfoById = async (
    id: string[],
    componentNames: string[],
    client: GraphQLClient,
    contractComponents: Components,
): Promise<any> => {
    const componentQueries = createComponentQueries(contractComponents);

    // Construct the query with the GraphQL variables syntax
    const query = gql`
      query EntityQuery($id: [String!]!) {
          entity(id: $id) {
              id
              keys
              __typename
              models {
                  __typename
                  ${componentQueries}
              }
          }
      }
  `;

    // Return the result of the query. Note that we're passing the variables in a separate object.
    return client.request(query, { id });
};