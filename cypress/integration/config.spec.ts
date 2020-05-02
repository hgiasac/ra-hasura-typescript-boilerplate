process.env = Cypress.env();
import { Config } from "../../src/shared/config";

it("load config", () => {
  const DATA_SCHEME = "http";
  const DATA_DOMAIN = Cypress.env("DATA_DOMAIN");
  const WS_SCHEME = "ws";

  expect(Config.httpDataHost).eq(`${DATA_SCHEME}://${DATA_DOMAIN}/v1/graphql`);
  expect(Config.wsDataHost).eq(`${WS_SCHEME}://${DATA_DOMAIN}/v1/graphql`);
});
