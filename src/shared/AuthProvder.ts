import { gql, FetchPolicy } from "@apollo/client";
import { AuthProvider } from "ra-core";
import { authGQLClient } from "./ApolloClient";
import { HasuraRole, Maybe } from "./types";
import { FirebaseApp } from "./vendor/firebase";

export const XHasuraAdminSecret = "X-Hasura-Admin-Secret";
export type UserID = string;

export type AuthUser = {
  readonly id: UserID
  readonly token: string
  readonly email: string
  readonly firstName: string
  readonly lastName: string
  readonly role: HasuraRole
};

export async function getProfile(fetchPolicy: FetchPolicy): Promise<Maybe<AuthUser>> {

  const query = gql`
    query getProfile {
      me {
        id
        email
        firstName
        lastName
        role
      }
    }
  `;

  const results = await authGQLClient.query({
    query,
    fetchPolicy
  }).then(({ data }) => data.me as readonly AuthUser[]);

  return results.length ? results[0] : null;
}

const checkAuth = (): Promise<void> => FirebaseApp().auth()
  .currentUser ? Promise.resolve() : Promise.reject();

export const authProvider: AuthProvider = {
  checkAuth,
  login: async ({ username, password }) => {

    await FirebaseApp().auth()
      .signInWithEmailAndPassword(username, password);

    const user = await getProfile("network-only");

    if (!user) {
      await FirebaseApp().auth().signOut();
      throw new Error("User doesn't exist");
    }

    return authGQLClient.resetStore()
      .then(() => user);
  },
  logout: () => authGQLClient.resetStore()
    .then(() => FirebaseApp().auth().signOut()),
  checkError: ({ graphQLErrors, networkError }) => {

    if (networkError) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.log(`[Network error]: ${networkError}`);
    }

    if (graphQLErrors && graphQLErrors[0].extensions.code === "validation-failed") {
      // check unauthorized error
      return checkAuth();
    }

    return Promise.resolve();
  },
  getPermissions: () => Promise.reject("Unknown method")
};
