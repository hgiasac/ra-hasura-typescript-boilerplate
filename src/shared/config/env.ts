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
  firebase: {
    apiKey: assertEnv(process.env.FIREBASE_API_KEY, "FIREBASE_API_KEY"),
    authDomain: assertEnv(process.env.FIREBASE_AUTH_DOMAIN, "FIREBASE_AUTH_DOMAIN"),
    databaseURL: assertEnv(process.env.FIREBASE_DATABASE_URL, "FIREBASE_DATABASE_URL"),
    projectId: assertEnv(process.env.FIREBASE_PROJECT_ID, "FIREBASE_PROJECT_ID"),
    storageBucket: assertEnv(process.env.FIREBASE_STORAGE_BUCKET, "FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: assertEnv(process.env.FIREBASE_MESSAGING_SENDER_ID, "FIREBASE_MESSAGING_SENDER_ID"),
    appId: assertEnv(process.env.FIREBASE_APP_ID, "FIREBASE_APP_ID"),
    measurementId: assertEnv(process.env.FIREBASE_MEASUREMENT_ID, "FIREBASE_MEASUREMENT_ID"),
  }
};
