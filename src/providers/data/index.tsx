// we are going to set our data provider here from scratch using the @refinedev/nestjs-query library.
// this will allow us to use a GraphQL API as our data source instead of directly querying against a database.
// this will allow us to use GraphQL queries and mutations in a type safe manner.

import graphqlDataProvider, {
  GraphQLClient,
  liveProvider as graphqlLiveProvider,
} from "@refinedev/nestjs-query";
import { fetchWrapper } from "./fetch-wrapper";
import { createClient } from "graphql-ws";

// coming from refine team
export const API_BASE_URL = "https://api.crm.refine.dev";
export const API_URL = `${API_BASE_URL}/graphql`; // the API url should be the graphql endpoint of the api base url, so use template string and append /graphql, so now this is our real graphql api endpoint.
export const WS_URL = "wss://api.crm.refine.dev/graphql"; //web socket url.

// graphql client which is going to make data requests from the graphql API
export const client = new GraphQLClient(API_URL, {
  fetch: (url: string, options: RequestInit) => {
    try {
      return fetchWrapper(url, options);
    } catch (error) {
      return Promise.reject(error as Error);
    }
  },
});

// Implementing a websocket that is going to listen to the changes that are going to happen through the graphQL API

export const wsClient =
  typeof window !== "undefined" // meaning if we are on the web browser
    ? createClient({
        url: WS_URL,
        connectionParams: () => {
          const accessToken = localStorage.getItem("access_token");
          return {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          };
        },
      })
    : undefined; //undefined if we are not within the browser

// creating a dataProvider to make requests to the graphQL API
export const dataProvider = graphqlDataProvider(client); // a function that takes the graphql client and returns a dataProvider for refine to use
export const liveProvider = wsClient
  ? graphqlLiveProvider(wsClient)
  : undefined; // making a liveProvider that makes subscriptions to the graphql API
