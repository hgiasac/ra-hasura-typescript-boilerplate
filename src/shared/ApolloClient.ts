import { from, ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { Config } from "./config/env";

export const AuthorizationHeader = "Authorization";
export const AuthBearer = "Bearer";

const getIdToken = () => localStorage.getItem(Config.sessionToken);

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }) => {
    const token = getIdToken();

    return {
      headers: {
        [AuthorizationHeader]: token ? `${AuthBearer} ${token}` : undefined,
        ...headers
      }
    };
  });

  return forward(operation);
});

const httpLink = from([
  authLink,
  // errorLink,
  new HttpLink({
    uri: Config.dataHost,
  }),
]);

export const authGQLClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
});

export const gqlClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: Config.dataHost,
  }),
});
