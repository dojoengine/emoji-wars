import { useMemo, useState } from "react";
import { GraphQLClient } from "graphql-request";
import { Components } from "@latticexyz/recs";
import { useDojo } from "../DojoContext";
import { setComponentsFromGraphQLEntities } from "@dojoengine/utils";

export enum FetchStatus {
    Idle = "idle",
    Loading = "loading",
    Success = "success",
    Error = "error",
}

const client = new GraphQLClient(import.meta.env.VITE_PUBLIC_TORII!);

type Entity = {
    __typename?: "Entity";
    keys?: string | null | undefined;
    models?: any | null[];
};

type getEntitiesQuery = {
    entities: {
        total_count: number;
        edges: {
            cursor: string;
            node: Entity;
        }[];
    };
};

const OFFSET = 100;
const COMPONENT_INTERVAL = 37;

export const useSyncWorld = (): { loading: boolean; progress: number } => {
    // Added async since await is used inside
    const {
        setup: { components, network: { contractComponents }, },

    } = useDojo();

    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useMemo((): any => {
        const syncData = async () => {
            try {
                const componentNames = Object.keys(components);
                for (let i = 0; i < componentNames.length; i += COMPONENT_INTERVAL) {
                    let loops = 0;
                    if (componentNames.slice(i, i + COMPONENT_INTERVAL).length === 0) {
                        break;
                    }
                    let modelsQueryBuilder = "";

                    for (const componentName of componentNames.slice(i, i + COMPONENT_INTERVAL)) {
                        const component = (components as Components)[componentName];
                        const fields = Object.keys(component.schema).join(",");
                        modelsQueryBuilder += `... on ${componentName} {
                        __typename
                            ${fields}
                        }`;
                    }

                    let shouldContinue = true;

                    let cursor: string | undefined;
                    while (shouldContinue) {
                        const queryBuilder = `
                            query SyncWorld {
                                entities: entities(keys:["%"] ${cursor ? `after: "${cursor}"` : ""} first: ${OFFSET}) {
                                total_count
                                edges {
                                    cursor
                                    node {
                                    keys
                                    id
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
                                        ... on Count {
                                          count
                                        }
                                        ... on EmojiTimeOut {
                                            time
                                        }
                                    }
                                    }
                                }
                                }
                    }`;

                        const { entities }: getEntitiesQuery = await client.request(queryBuilder);

                        // Update the progress
                        const processedCount = OFFSET * loops; // OFFSET multiplied by how many loops so far
                        const newProgress = Math.min((processedCount / entities.total_count) * 100, 100); // Convert it to percentage
                        setProgress(newProgress);

                        if (entities.edges.length < OFFSET) {
                            shouldContinue = false;
                        } else {
                            cursor = entities.edges[entities.edges.length - 1].cursor;
                        }

                        setComponentsFromGraphQLEntities(contractComponents, entities.edges);

                        loops += 1;
                    }
                }
            } catch (error) {
                console.log({ syncError: error });
            } finally {
                setLoading(false);
            }
        };
        syncData();
    }, []);

    return {
        loading,
        progress,
    };
};