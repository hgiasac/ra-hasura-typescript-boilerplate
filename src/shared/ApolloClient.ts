import { from, ApolloClient, ApolloLink, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { OperationDefinitionNode } from "graphql";
import { WebSocketLink } from "@apollo/client/link/ws";
import { Config } from "./config";

export const XHasuraClientName = "hasura-client-name";

export const AuthorizationHeader = "Authorization";
export const AuthBearer = "Bearer";

const getIdToken = (): string => localStorage.getItem(Config.sessionToken);

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }) => {
    const token = getIdToken();

    return {
      headers: {
        ...headers,
        ...(token ? { [AuthorizationHeader]: `${AuthBearer} ${token}` } : {})
      }
    };
  });

  return forward(operation);
});

const splitLink = (http: ApolloLink, ws: WebSocketLink): ApolloLink => split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query) as OperationDefinitionNode;

    return kind === "OperationDefinition" && operation === "subscription";
  },
  ws,
  http
);

const httpLink = from([
  authLink,
  // errorLink,
  new HttpLink({
    uri: Config.httpDataHost,
    headers: {
      [XHasuraClientName]: Config.hasuraClientName
    }
  })
]);

const wsLink = new WebSocketLink({
  uri: Config.wsDataHost,
  options: {
    reconnect: true,
    connectionParams: () => ({
      headers: {
        [AuthorizationHeader]: getIdToken(),
        [XHasuraClientName]: Config.hasuraClientName
      }
    }),
    lazy: true,
    connectionCallback: (error) => {
      console.error("connection error: ", error);
    }
  }
});

const commonApolloOptions = {
  version: Config.version
};

export const authGQLClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink(httpLink, wsLink),
  ...commonApolloOptions
});

export const gqlClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: Config.httpDataHost
  }),
  ...commonApolloOptions
});
