import { from, ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { XHasuraAdminSecret } from "./AuthProvder";
import { Config } from "./config/env";

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }) => {
    console.log("headers");

    return ({
      headers: {
        [XHasuraAdminSecret]: Config.adminSecret,
        ...headers
      }
    });
  });

  return forward(operation);
});

const httpLink = from([
  authLink,
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
