import { from, ApolloClient, ApolloLink, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { OperationDefinitionNode } from "graphql";
import { WebSocketLink } from "@apollo/link-ws";
import { XHasuraAdminSecret } from "./AuthProvder";
import { Config } from "./config";
import { setContext } from "@apollo/link-context";
import { FirebaseApp } from "./vendor/firebase";
export const XHasuraClientName = "hasura-client-name";

export const AuthorizationHeader = "Authorization";
export const AuthBearer = "Bearer";

const getIdToken = (): Promise<string> => FirebaseApp().auth().currentUser
  ? FirebaseApp().auth().currentUser.getIdToken()
  : Promise.resolve(null);
const getBearerToken = (token: string): string =>
  token ? `${AuthBearer} ${token}` : null;

const authLink = setContext((_, { headers }) => getIdToken()
  .then((token) => ({
    headers: {
      [AuthorizationHeader]: getBearerToken(token),
      ...headers
    }
  })));

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
    connectionParams: () => getIdToken()
      .then((token) => ({
        headers: {
          [XHasuraAdminSecret]: getBearerToken(token),
          [XHasuraClientName]: Config.hasuraClientName
        }
      })),
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
