import { gql, FetchPolicy } from "@apollo/client";
import { AuthProvider } from "ra-core";
import { authGQLClient } from "./ApolloClient";
import { HasuraRole, Maybe } from "./types";
import { FirebaseApp } from "./vendor/firebase";

export const XHasuraAdminSecret = "X-Hasura-Admin-Secret";
export type UserID = string;

export interface IAuthUser {
  id: UserID;
  token: string;
  email: string;
  firstName: string;
  lastName: string;
  role: HasuraRole;
}

export async function getProfile(fetchPolicy: FetchPolicy): Promise<Maybe<IAuthUser>> {

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
    fetchPolicy,
  }).then(({ data }) => data.me as IAuthUser[]);

  return results.length ? results[0] : null;
}

const checkAuth = () => FirebaseApp().auth()
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
      console.log(`[Network error]: ${networkError}`);
    }

    if (graphQLErrors && graphQLErrors[0].extensions.code === "validation-failed") {
      // check unauthorized error
      return checkAuth();
    }

    return Promise.resolve();
  },
  getPermissions: () => Promise.reject("Unknown method"),
};
