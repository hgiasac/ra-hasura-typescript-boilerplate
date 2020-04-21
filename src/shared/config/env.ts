function assertEnv(value: string, key: string): string {

  if (!value) {
    throw new Error(`Environment ${key} doesn't exist`)
  }

  return value;
}

const DATA_SCHEME = process.env.DATA_SCHEME || "http";
const DATA_DOMAIN = assertEnv(process.env.DATA_DOMAIN, "DATA_DOMAIN");

export const Config = {
  dataHost: `${DATA_SCHEME}://${DATA_DOMAIN}/v1/graphql`,
  adminSecret: assertEnv(process.env.HASURA_GRAPHQL_ADMIN_SECRET, "HASURA_GRAPHQL_ADMIN_SECRET"),
  sessionToken: assertEnv(process.env.SESSION_TOKEN, "SESSION_TOKEN"),
};
