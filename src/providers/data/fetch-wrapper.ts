import { access } from "fs";
import { GraphQLFormattedError } from "graphql";

// our own type of error object
type Error = {
  message: string;
  statusCode: string;
};

// Creating our own custom fetch function which will be acting as a middleware, because it will be happening before or on top of every fetch request we make.
const customFetch = async (url: string, options: RequestInit) => {
  const accessToken = localStorage.getItem("access_token");
  const headers = options.headers as Record<string, string>; // getting the headers from the options object
  return await fetch(url, {
    // return the fetch request with the authorization headers
    ...options,
    headers: {
      ...headers,
      Authorization: headers?.Authorization || `Bearer ${accessToken}`,
      "Content-Type": "application/json",

      "Apollo-Require-Preflight": "true", // to avoid CORSE errors we are going to use apollo, apollo is a graphql client used in frontend to make requests from the graphql API
    },
  });
};

// custom error handling function
const getGraphQLErrors = (
  body: Record<"errors", GraphQLFormattedError[]> | undefined
): Error | null => {
  if (!body) {
    return {
      message: "Unknown error",
      statusCode: "INTERNAL_SERVER_ERROR",
    };
  }

  if ("errors" in body) {
    const errors = body?.errors;
    const messages = errors?.map((error) => error?.message)?.join(", "); // Join messages with a separator for clarity
    const code = errors?.[0].extensions?.code; // Assume code is a string or undefined

    return {
      message: messages || JSON.stringify(errors),
      statusCode: code ? code.toString() : "500", // Ensure statusCode is a string
    };
  }
  return null;
};

// wrapping our both custom functions we made above(customFetch and getGraphQLErrors)
export const fetchWrapper = async (url: string, options: RequestInit) => {
  const response = await customFetch(url, options);

  const responseClone = response.clone(); //having a response clone will allow us to process the response in various ways, bcs the first response is consumed
  const body = await responseClone.json(); //now for eg we can get the body  // we aslo need to await this bcs its returning a promise.

  const error = getGraphQLErrors(body); // and we can also get the errors

  if (error) {
    throw error;
  }

  return response;
};
