import { from, ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/link-context";
import { Config } from "./config/env";
import { FirebaseApp } from "./vendor/firebase";

export const AuthorizationHeader = "Authorization";
export const AuthBearer = "Bearer";

const getIdToken = () => FirebaseApp().auth().currentUser
  ? FirebaseApp().auth().currentUser.getIdToken()
  : Promise.resolve(null);

const authLink = setContext((_, { headers }) => getIdToken()
  .then((token) => ({
    headers: {
      [AuthorizationHeader]: token ? `${AuthBearer} ${token}` : undefined,
      ...headers
    }
  })));

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
