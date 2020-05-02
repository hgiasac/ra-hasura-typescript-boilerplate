import * as React from "react";
import { mount } from "cypress-react-unit-test";

const Hello = (): JSX.Element => (
  <span>{"Hello World!"}</span>
);

describe("HelloWorld component", () => {
  it("works", () => {
    mount(<Hello />);
    // now use standard Cypress commands
    cy.contains("Hello World!").should("be.visible");
  });
});
