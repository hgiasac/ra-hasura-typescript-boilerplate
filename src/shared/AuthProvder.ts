import { fetchUtils } from "ra-core/lib/dataProvider";
import { AuthProvider } from "react-admin";
export const AuthorizationHeader = "Authorization";
export const XHasuraAdminSecret = "X-Hasura-Admin-Secret";

export type FetchResponse = {
  readonly status: number
  readonly headers: Headers
  readonly body: string
  readonly json: any
};

export const httpClient = (url: string, options: any = {}): Promise<FetchResponse> => {
  if (!options.headers) {
    // eslint-disable-next-line functional/immutable-data
    options.headers = new Headers({
      Accept: "application/json"
    });
  }
  // add your own headers here
  // options.headers.set(AuthenticationHeader, "Bearer xxxxx");
  options.headers.set(XHasuraAdminSecret, process.env.HASURA_GRAPHQL_ADMIN_SECRET);

  return fetchUtils.fetchJson(url, options);
};

export const authProvider: AuthProvider = {
  login: ({ username }) => {
    localStorage.setItem("username", username);

    // accept all username/password combinations
    return Promise.resolve();
  },
  logout: () => {
    localStorage.removeItem("username");

    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: () =>
    localStorage.getItem("username") ? Promise.resolve() : Promise.reject(),
  getPermissions: () => Promise.reject("Unknown method")
};
