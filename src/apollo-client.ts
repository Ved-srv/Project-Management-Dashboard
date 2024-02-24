// src/apollo-client.ts
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// Define the type for the environment variable or any configuration you might use for the URI
const GRAPHQL_ENDPOINT: string = "https://api.crm.refine.dev/graphql"; // Replace with your actual GraphQL endpoint or use an environment variable

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
