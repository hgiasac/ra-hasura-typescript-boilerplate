function assertEnv(value: string, key: string): string {

  if (!value) {
    throw new Error(`Environment ${key} doesn't exist`);
  }

  return value;
}

const DATA_SCHEME = process.env.DATA_SCHEME || "http";
const DATA_DOMAIN = assertEnv(process.env.DATA_DOMAIN, "DATA_DOMAIN");
const WS_SCHEME = DATA_SCHEME === "https" ? "wss" : "ws";

export const Config = {
  httpDataHost: `${DATA_SCHEME}://${DATA_DOMAIN}/v1/graphql`,
  wsDataHost: `${WS_SCHEME}://${DATA_DOMAIN}/v1/graphql`,
  sessionToken: assertEnv(process.env.HASURA_CLIENT_NAME, "HASURA_CLIENT_NAME"),
  hasuraClientName: assertEnv(process.env.HASURA_CLIENT_NAME, "HASURA_CLIENT_NAME"),
  version: process.env.VERSION || "1.0.0",
  debug: process.env.NODE_ENV !== "production"
};
