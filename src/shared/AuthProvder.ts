import { gql, FetchPolicy } from "@apollo/client";
import { AuthProvider } from "ra-core";
import { authGQLClient, gqlClient } from "./ApolloClient";
import { Config } from "./config/env";
import { HasuraRole, Maybe } from "./types";

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

const checkAuth = async () => {
  if (!localStorage.getItem(Config.sessionToken)) {
    return Promise.reject();
  }

  return getProfile("network-only")
    .then((user) => user ? Promise.resolve() : Promise.reject());
};

export const authProvider: AuthProvider = {
  checkAuth,
  login: async ({ username, password }) => {

    const mutation = gql`
      mutation login($email: String!, $password: String!) {
        login(data: {email: $email, password: $password}) {
          id
          token
          firstName
          lastName
          email
          role
        }
      }
    `;

    const result = await gqlClient.mutate({
      mutation,
      variables: {
        password,
        email: username,
      }
    }).then(({ data }) => data.login as IAuthUser);

    localStorage.setItem(Config.sessionToken, result.token);

    await authGQLClient.resetStore();

    // accept all username/password combinations
    return Promise.resolve(result);
  },
  logout: () => {
    localStorage.removeItem(Config.sessionToken);

    // reset apollo store 
    return authGQLClient.resetStore()
      .then(() => Promise.resolve());
  },
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
